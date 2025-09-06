import TelegramClient from '../../gramjs/client/TelegramClient';
import { Account } from '../@types/Account';
import { updateAutomaticDialogue } from '../db/dialogues';
import { getGroupId } from '../db/groupId';
import { addLead } from '../google-crm/oauth-sheets';
import { converterName } from '../helpers/converterName';
import { extractLastQuestion } from '../helpers/extractLastQuestion';
import { generateRandomString } from '../helpers/generateRandomString';
import { sendToErrorGenerateBot } from '../helpers/sendToErrorGenerateBot';
import { sendToFormBot } from '../helpers/sendToFormBot';
import { sendToGoogleCrmBot } from '../helpers/sendToGoogleCrmBot';
import { sendToMainBot } from '../helpers/sendToMainBot';
import { getAutoResponse } from '../llm/getAutoResponse';
import { getDialogueAnalysis } from '../llm/getDialogueAnalysis';
import { getPing } from '../llm/getPing';
import { llmRestoreLinks } from '../llm/utils/llmLink';
import { sendMessage } from '../methods/messages/sendMessage';
import { saveRecipient } from '../methods/recipient/saveRecipient';
import { getFullUser } from '../methods/users/getFullUser';
import { crmSender } from './crmSender';
import { getClassifiedDialogs } from './getClassifiedDialogs';

export const autoResponse = async (
  client: TelegramClient,
  account: Account,
  meId: string,
  meName: string
) => {
  const { accountId, personalChannel } = account;

  const [dialogs, pingDialogs, manualDialogs] = await getClassifiedDialogs(
    client,
    accountId,
    meId
  );

  for (const dialog of dialogs) {
    const {
      step,
      messages,
      aiStatus,
      aiReason,
      aiThink,
      recipientId,
      recipientAccessHash,
      recipientPhone,
      recipientUsername,
      recipientTitle,
      groupId: dialogGroupId,
    } = dialog;

    try {
      const groupId = await getGroupId(dialogGroupId);
      if (!groupId) {
        continue;
      }

      const recipientFull = await getFullUser(
        client,
        recipientId,
        recipientAccessHash
      );
      if (!recipientFull) {
        continue;
      }

      const {
        fullUser: { about },
      } = recipientFull;
      const {
        _id: _groupId,
        goal,
        part,
        aiRole,
        language,
        flowHandling,
        messagesCount,
        addedQuestion,
        secondMessagePrompt,
        leadDefinition,
        leadGoal,
        addedInformation,
        companyDescription,
        googleTableCrmId,
      } = groupId;

      const dialogue = messages.map(
        (m) =>
          ({
            role: m.fromId === String(recipientId) ? 'user' : 'assistant',
            content: m.text,
          }) as { role: 'user' | 'assistant'; content: string }
      );

      const stage = Math.ceil(step / 2);
      const myGender = accountId.includes('female') ? 'female' : 'male';
      const myName = language === 'RUSSIAN' ? converterName(meName) : meName;

      let analysis = null;
      let analysisThink = null;
      if (stage > 1 && aiStatus !== 'lead' && aiStatus !== 'negative') {
        const { analysisResult, responseThink } = await getDialogueAnalysis(
          {
            companyName: dialogGroupId,
            leadDefinition,
            language,
          },
          {
            llmParams: {
              model: 'command-a-reasoning-08-2025',
              temperature: 0.1,
              k: 1,
              messages: dialogue,
            },
            onLogger: (type, data) =>
              console.log({
                accountId,
                message: `[${type}]`,
                payload: { data },
              }),
          }
        );
        analysis = analysisResult;
        analysisThink = responseThink;

        await sendToFormBot(`[ANALYSIS_RESULT]
GID: ${accountId}
RID: ${recipientId}
STATUS: ${analysisResult.status}
REASON: ${analysisResult.reason}`);
      }
      const isLead = aiStatus === 'lead' || analysis?.status === 'lead';

      const autoResponse = await getAutoResponse(
        {
          aiRole,
          aiAnalysis: isLead || stage === 1 ? '' : analysis?.reason || '',
          goal,
          part,
          language,
          leadGoal,
          flowHandling,
          addedQuestion,
          messagesCount,
          addedInformation,
          companyDescription,
          meName: myName,
          meGender: myGender,
          companyName: dialogGroupId,
          firstQuestion: secondMessagePrompt,
          userAbout: about || null,
        },
        {
          options: {
            isLead,
          },
          llmParams: {
            model: 'command-a-03-2025',
            k: 30,
            temperature: 1,
            presence_penalty: 0.8,
            p: 0.95,
            messages: dialogue,
          },
          onThrow: (error) =>
            sendToErrorGenerateBot(
              `${error}\nGROUP ID: ${dialogGroupId}\nACCOUNT ID: ${accountId}`
            ),
          onLogger: (type, data) =>
            console.log({
              accountId,
              message: `[${type}]`,
              payload: { data },
            }),
        }
      );

      const { mainText, question } = extractLastQuestion(autoResponse.text);

      const restoredMainText = llmRestoreLinks(
        {
          ...autoResponse,
          text: mainText,
        },
        personalChannel
      ).replace(/\\n/g, '\n');

      const sentMainText = await sendMessage(
        client,
        recipientId,
        recipientAccessHash,
        restoredMainText,
        accountId,
        true,
        true
      );

      messages.push({
        id: sentMainText.id,
        text: restoredMainText.replace(/\n/g, '\\n'),
        fromId: meId,
        date: Math.round(Date.now() / 1000),
      });

      if (question) {
        const restoredQuestion = llmRestoreLinks(
          {
            ...autoResponse,
            text: question,
          },
          personalChannel
        ).replace(/\\n/g, '\n');

        const sentRestoredText = await sendMessage(
          client,
          recipientId,
          recipientAccessHash,
          restoredQuestion,
          accountId,
          false,
          true
        );

        messages.push({
          id: sentRestoredText.id,
          text: restoredQuestion.replace(/\n/g, '\n'),
          fromId: meId,
          date: Math.round(Date.now() / 1000),
        });
      }

      if (stage > 1 && aiStatus !== 'lead' && analysis?.status === 'lead') {
        if (googleTableCrmId) {
          try {
            await addLead(googleTableCrmId, {
              groupId: String(_groupId),
              recipientId,
              aiReason: analysis.reason,
              recipientTitle,
              recipientUsername,
              recipientPhone,
              dateUpdated: new Date(),
            });
            await sendToGoogleCrmBot(
              `[ADD_LEAD_OK]
GID: ${dialogGroupId}
ACCOUNT ID: ${accountId}
DATA: ${JSON.stringify({
                groupId: _groupId,
                recipientId,
                aiReason: analysis.reason,
                recipientTitle,
                recipientUsername,
                recipientPhone,
                dateUpdated: new Date(),
              })}`
            );
          } catch (error: any) {
            await sendToGoogleCrmBot(
              `[ADD_LEAD_ERROR]
GID: ${dialogGroupId}
ACCOUNT ID: ${accountId}
ERROR: ${error.message}`
            );
          }
        }
        await crmSender(dialogGroupId, recipientId, analysis.reason, messages);
      }

      await sendToFormBot(`**** AUTO REPLY MESSAGE (${language}) ****
ID: ${accountId}
GID: ${dialogGroupId}
RID: ${recipientId}
${llmRestoreLinks(autoResponse, personalChannel)}`);

      await saveRecipient(
        account,
        recipientId,
        recipientAccessHash,
        recipientFull,
        dialog,
        messages,
        'update',
        {
          viewed: false,
          aiStatus: analysis?.status || aiStatus,
          aiReason: analysis?.reason || aiReason,
          aiThink: analysisThink || aiThink,
        }
      );
    } catch (error: any) {
      if (error.message.includes('ALLOW_PAYMENT_REQUIRED')) {
        await updateAutomaticDialogue(
          accountId,
          recipientId,
          'automatic:allow-payment-required'
        );

        throw new Error('ALLOW_PAYMENT_REQUIRED');
      }

      await sendToMainBot(`💀 AUTO RESPONSE ERROR (${accountId}) 💀
ID: ${accountId}
RID: ${recipientId}
ERROR: ${error.message}`);
      throw new Error(error.message);
    }
  }

  for (const dialog of pingDialogs) {
    const {
      recipientId,
      recipientAccessHash,
      messages,
      groupId: dialogGroupId,
      aiReason,
      aiStatus,
    } = dialog;

    if (accountId.includes('prefix')) {
      return;
    }

    try {
      const groupId = await getGroupId(dialogGroupId);
      if (!groupId) {
        continue;
      }

      const recipientFull = await getFullUser(
        client,
        recipientId,
        recipientAccessHash
      );
      if (!recipientFull) {
        continue;
      }

      const { language: gLanguage, addedInformation } = groupId;
      const language = gLanguage || 'RUSSIAN';

      const dialogue = messages.map(
        (m) =>
          ({
            role: m.fromId === String(recipientId) ? 'user' : 'assistant',
            content: m.text,
          }) as { role: 'user' | 'assistant'; content: string }
      );

      const pingMessage = await getPing(
        {
          language,
          addedInformation: addedInformation || '',
          dialogueAnalysis:
            aiStatus &&
            aiReason &&
            aiStatus !== 'negative' &&
            aiStatus !== 'lead'
              ? aiReason
              : '',
        },
        {
          options: {},
          llmParams: {
            model: 'command-a-03-2025',
            k: 30,
            temperature: 1,
            presence_penalty: 0.8,
            p: 0.95,
            messages: dialogue,
          },
          onThrow: (error) =>
            sendToErrorGenerateBot(
              `${error}\nGROUP ID: ${dialogGroupId}\nACCOUNT ID: ${accountId}`
            ),
          onLogger: (type, data) => {
            console.log({
              accountId,
              message: `[${type}]`,
              payload: { data },
            });
          },
        }
      );

      const sentPingMessage = await sendMessage(
        client,
        recipientId,
        recipientAccessHash,
        pingMessage,
        accountId,
        true,
        true
      );

      messages.push({
        id: sentPingMessage.id,
        text: pingMessage,
        fromId: meId,
        date: Math.round(Date.now() / 1000),
      });

      await sendToFormBot(`**** PING MESSAGE (${language}) ****
ID: ${accountId}
GID: ${dialogGroupId}
${pingMessage}`);

      await saveRecipient(
        account,
        recipientId,
        recipientAccessHash,
        recipientFull,
        dialog,
        messages,
        'update',
        {
          ping: true,
        }
      );
    } catch (error: any) {
      if (error.message.includes('ALLOW_PAYMENT_REQUIRED')) {
        await updateAutomaticDialogue(
          accountId,
          recipientId,
          'automatic:allow-payment-required'
        );

        throw new Error('ALLOW_PAYMENT_REQUIRED');
      }

      await sendToMainBot(`💀 PING ERROR (${accountId}) 💀
ID: ${accountId}
RID: ${recipientId}
ERROR: ${error.message}`);
      throw new Error(error.message);
    }
  }

  for (const dialog of manualDialogs) {
    const { recipientId, recipientAccessHash, messages, managerMessage } =
      dialog;

    try {
      const recipientFull = await getFullUser(
        client,
        recipientId,
        recipientAccessHash
      );
      if (!recipientFull) {
        continue;
      }

      if (managerMessage) {
        const nativeManagerMessage = generateRandomString(
          managerMessage
        ).replace(/\$link/g, `t.me/${personalChannel}`);

        const sentManagerMessage = await sendMessage(
          client,
          recipientId,
          recipientAccessHash,
          nativeManagerMessage,
          accountId,
          false,
          true
        );

        messages.push({
          id: sentManagerMessage.id,
          text: nativeManagerMessage,
          fromId: meId,
          date: Math.round(Date.now() / 1000),
        });
      }

      await saveRecipient(
        account,
        recipientId,
        recipientAccessHash,
        recipientFull,
        dialog,
        messages,
        'update',
        {
          managerMessage: null,
          viewed: false,
        }
      );
    } catch (error: any) {
      if (error.message.includes('ALLOW_PAYMENT_REQUIRED')) {
        await updateAutomaticDialogue(
          accountId,
          recipientId,
          'automatic:allow-payment-required'
        );

        throw new Error('ALLOW_PAYMENT_REQUIRED');
      }

      await sendToMainBot(`💀 MANUAL ERROR (${accountId}) 💀
ID: ${accountId}
RID: ${recipientId}
ERROR: ${error.message}`);
      throw new Error(error.message);
    }
  }
};
