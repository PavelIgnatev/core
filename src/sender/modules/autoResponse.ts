import TelegramClient from '../../gramjs/client/TelegramClient';
import { Account } from '../@types/Account';
import { updateAutomaticDialogue } from '../db/dialogues';
import { getGroupId } from '../db/groupId';
import { addLead } from '../google-crm/oauth-sheets';
import { converterName } from '../helpers/converterName';
import { extractLastQuestion } from '../helpers/extractLastQuestion';
import { generateRandomString } from '../helpers/generateRandomString';
import { getDateNow } from '../helpers/helpers';
import { makeRequestGpt } from '../helpers/makeRequestGpt';
import { sendToErrorGenerateBot } from '../helpers/sendToErrorGenerateBot';
import { sendToFormBot } from '../helpers/sendToFormBot';
import { sendToGoogleCrmBot } from '../helpers/sendToGoogleCrmBot';
import { sendToMainBot } from '../helpers/sendToMainBot';
import { getAutoResponse } from '../llm/getAutoResponse';
import { getDialogueAnalysis } from '../llm/getDialogueAnalysis';
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
      recipientId,
      recipientAccessHash,
      recipientPhone,
      recipientUsername,
      recipientTitle,
      groupId: dialogGroupId,
      aiName: recipientName,
      aiGender: recipientGender,
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

      // const {
      //   fullUser: { about },
      // } = recipientFull;
      const {
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
      if (stage > 1 && aiStatus !== 'lead') {
        analysis = await getDialogueAnalysis(
          {
            companyName: dialogGroupId,
            leadDefinition,
            language,
          },
          {
            llmParams: {
              model: 'command-a-03-2025',
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

        await sendToFormBot(`[ANALYSIS_RESULT]
GID: ${accountId}
RID: ${recipientId}
STATUS: ${analysis.status}
LEAD_DEFINITION: ${leadDefinition}
REASON: ${analysis.reason}`);
      }

      const autoResponse = await getAutoResponse(
        {
          aiRole,
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
          userName: recipientName || 'UNKNOWN_NAME',
          userGender: recipientGender || 'UNKNOWN_GENDER',
        },
        {
          options: {
            isLead: aiStatus === 'lead' || analysis?.status === 'lead',
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
              groupId: dialogGroupId,
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
                groupId: dialogGroupId,
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
      aiName,
      aiGender,
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

      const { language: gLanguage } = groupId;
      const language = gLanguage || 'RUSSIAN';

      const pingMessage = await makeRequestGpt(
        accountId,
        [
          {
            role: 'system',
            content: `You are a reminder message generator for users with the USER role. Your task is to create a short and clear reminder message for the USER role conversation partner based on the information in their USER DATA. The message should convey that you are waiting for an answer to the last question and that it is very important to you. If possible, address the interlocutor by name, use the name only if it is a proper name and it actually exists in ${language}. LANGUAGE reply: ${language}. Only ${language}.`,
          },
          {
            role: 'user',
            content: `## STYLE GUIDE
Maximum length of reminder message 100 characters

## USER DATA
${aiName ? `\nNAME: ${aiName};\nGENDER: ${aiGender}` : ''}
Today's date is ${getDateNow()};
      
## DIALOG
${messages
  .map((m) => ({
    role: m.fromId === String(recipientId) ? 'USER' : 'CHATBOT',
    message: m.text,
  }))
  .slice(-15)
  .map((chat) => `${chat.role}: ${chat.message}`)
  .join('\n')}`,
          },
        ],
        '',
        'ANY',
        false,
        false,
        1,
        false,
        dialogGroupId,
        { k: 30, temperature: 1, presence_penalty: 0.8, p: 0.95 }
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
