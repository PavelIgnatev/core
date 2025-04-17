import BigInt from 'big-integer';

import TelegramClient from '../../gramjs/client/TelegramClient';
import GramJs from '../../gramjs/tl/api';
import { Account } from '../@types/Account';
import { updateAutomaticDialogue } from '../db/dialogues';
import { getGroupId } from '../db/groupId';
import { converterName } from '../helpers/converterName';
import { extractLastQuestion } from '../helpers/extractLastQuestion';
import { generateRandomString } from '../helpers/generateRandomString';
import { getDateNow, sleep } from '../helpers/helpers';
import { makeRequestGpt } from '../helpers/makeRequestGpt';
import { sendToFormBot } from '../helpers/sendToFormBot';
import { deleteHistory } from '../methods/messages/deleteHistory';
import { sendMessage } from '../methods/messages/sendMessage';
import { saveRecipient } from '../methods/recipient/saveRecipient';
import { getFullUser } from '../methods/users/getFullUser';
import { getClassifiedDialogs } from './getClassifiedDialogs';
import { invokeRequest } from './invokeRequest';

const pattern =
  /((http|https):\/\/)?(www\.)?([a-zA-Z0-9\-_]+\.)+[a-zA-Z]{2,2000}(\/[a-zA-Z0-9\&\;\:\.\,\?\=\-\_\+\%\'\~\#]*)*/g;

export const autoResponse = async (
  client: TelegramClient,
  account: Account,
  meId: string,
  meName: string
) => {
  const { accountId, personalChannel } = account;

  const [dialogs, pingDialogs, manualDialogs] =
    await getClassifiedDialogs(client, accountId, meId);

  for (const dialog of dialogs) {
    const {
      recipientId,
      recipientAccessHash,
      messages,
      groupId: dialogGroupId,
      step,
      aiName,
      aiGender,
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
        goal = '',
        part = '',
        aiRole = '',
        language: gLanguage,
        messagesCount = 4,
        addedQuestion = '',
        flowHandling = '',
        addedInformation = '',
        companyDescription = '',
      } = groupId;
      const language = gLanguage || 'RUSSIAN';
      const gender = accountId.includes('female') ? 'female' : 'male';
      const myName = language === 'RUSSIAN' ? converterName(meName) : meName;
      const stage = Math.ceil(step / 2);
      const parted =
        stage === 2 && personalChannel
          ? `t.me/${personalChannel}`
          : stage === 2 && part
            ? part.trim()
            : '';

      let systemPrompt = `You are "${myName}" (role assistant, role <ASSISTANT>, ${gender} gender), acting as role "${aiRole}". Your name: ${myName}. Your gender: ${gender}. Fully adopt this identity as a real person whose task is to deeply engage the user within the context of ASSISTANT_COMPANY_DESCRIPTION. You have initiated the conversation with the user with the intention of immersing them into the context of ASSISTANT_COMPANY_DESCRIPTION.${
        stage >= 2 && goal ? `\n!IMPORTANT INSTRUCTION!: **${goal}**` : ''
      }${
        stage === 1
          ? `\nYou “${myName}” (role assistant, role <ASSISTANT>, ${gender} gender) have asked a question **${messages[1].text}** to initiate a (cold) dialog with a user, and regardless of the interlocutor's reaction to your question, you must give your clear and rigorous answer that will maximize the interlocutor's liking and encourage further communication`
          : ''
      }
IMPORTANT CONTEXT: You work with cold traffic, conducting unsolicited communications to potential clients via Telegram messenger. Your interaction is “cold”, meaning you initiate contact with a user who has not interacted with you before. Communication and possible communication with the user takes place via text messages only. It is important to note that neither you nor the user know each other or have met in real life. The user doesn't know you or the context of your message. You offer various services and solutions in an effort to convert these cold potential customers into interested ones. Never under any circumstances apologize in your reply;

## INFORMATION ABOUT USER (is the interlocutor to whose messages you generate a reply)
NAME: ${aiName || 'unknown'};
GENDER: ${aiGender || 'unknown'};${
        about ? `\nBIO: ${about.replace(pattern, '')}` : ''
      }
IMPORTANT CONTEXT: A genuine individual who has never interacted with the assistant before. He or she is receiving a message from the role assistant for the first time and has no prior knowledge of your products. The data is for contextual understanding only and does not imply personalized treatment. It is an important aspect of the assistant's context that should be considered when forming a reply.

## STYLE GUIDE FOR ASSISTANT REPLY
- Your reply must **strictly** be approximately ${
        messagesCount * 60
      } characters in length, consisting of around ${
        messagesCount * 10
      } words and approximately ${messagesCount} sentences. **It is imperative that you meet these length requirements exactly**.${
        stage <= 2
          ? `\n- You should always begin your reply with a brief reply to the user's last message. The reply is mandatory and should be minimal but correct to the user's last message.`
          : ''
      }${
        stage === 1 && addedQuestion
          ? `\n- Smoothly weave the following question into the end of your reply in a way that feels natural and relevant: “${generateRandomString(addedQuestion)}”. Ensure it connects logically with the preceding content without adding any extra questions. **it's a must**`
          : stage === 2
            ? `\n- **Make sure to ask a leading question to further engage the user**. Conclude your answer with a simple, easy-to-answer question that flows naturally from the conversation and further engages the user. It should be a question along the lines of “what do you think?”, “can I tell you more?”, “interesting?” or a question that can better qualify the user.`
            : ''
      }${
        parted
          ? `\n- Ensure the phrase "${parted}" is **meaningfully integrated** into the reply, not just randomly added. Adjust your reply so that it flows naturally with this phrase.`
          : ''
      }
- Reply language: **${language}**.
- Never apologize in your reply, under any circumstances. **don't apologize**
- Do not use generic greetings like "Hello" or "Hi".
- Never use the name of the interlocutor, any form of personal address, or title such as “client,” “interlocutor,” “respected,” and so on
- Use the company description to craft your reply, highlighting relevant points for the user.
- Focus on providing value based on the company's offerings.
- Avoid making assumptions about the user's profession or activities.


${
  companyDescription
    ? `## ASSISTANT_COMPANY_DESCRIPTION
${companyDescription}`
    : ''
}

${
  flowHandling
    ? `## ASSISTANT_COMMON_FLOW_HANDLING
${flowHandling}`
    : ''
}

${
  stage !== 1 && addedInformation
    ? `## ASSISTANT_ADDED_INFORMATION
${addedInformation}`
    : ''
}

Current date and time: ${getDateNow()}`;

      if (personalChannel) {
        systemPrompt = systemPrompt.replace(
          pattern,
          `t.me/${personalChannel}`
        );
      }

      const replyMessage = await makeRequestGpt(
        accountId,
        [
          {
            role: 'system',
            content: systemPrompt,
          },
          ...messages.map((m) => ({
            role: (m.fromId === String(recipientId) ? 'user' : 'assistant') as
              | 'user'
              | 'assistant',
            content: m.text,
          })),
        ],
        parted,
        language,
        stage === 1,
        stage <= 2,
        stage <= 2 ? 3 : 2,
        true,
        dialogGroupId,
        { k: 30, temperature: 1, presence_penalty: 0.8, p: 0.95 }
      );

      await sendToFormBot(`**** AUTO REPLY MESSAGE (${language}) ****
ID: ${accountId}
GID: ${dialogGroupId}
RID: ${recipientId}
${replyMessage}`);

      const lastQuestion = extractLastQuestion(replyMessage);
      if (lastQuestion && replyMessage.replace(lastQuestion, '').length > 0) {
        const sentReplyMessage = await sendMessage(
          client,
          recipientId,
          recipientAccessHash,
          replyMessage.replace(lastQuestion, ''),
          accountId,
          true,
          true
        );

        const sentQuestionMessage = await sendMessage(
          client,
          recipientId,
          recipientAccessHash,
          lastQuestion,
          accountId,
          false,
          true
        );

        messages.push({
          id: sentReplyMessage.id,
          text: replyMessage.replace(lastQuestion, ''),
          fromId: meId,
          date: Math.round(Date.now() / 1000),
        });
        messages.push({
          id: sentQuestionMessage.id,
          text: lastQuestion,
          fromId: meId,
          date: Math.round(Date.now() / 1000),
        });
      } else {
        const sentReplyMessage = await sendMessage(
          client,
          recipientId,
          recipientAccessHash,
          replyMessage,
          accountId,
          true,
          true
        );

        messages.push({
          id: sentReplyMessage.id,
          text: replyMessage,
          fromId: meId,
          date: Math.round(Date.now() / 1000),
        });
      }

      await saveRecipient(
        accountId,
        recipientId,
        recipientAccessHash,
        recipientFull,
        dialog,
        messages,
        'update',
        {
          viewed: false,
        }
      );
    } catch (error: any) {
      if (error.message !== 'ALLOW_PAYMENT_REQUIRED') {
        throw new Error(error.message);
      }

      await updateAutomaticDialogue(
        accountId,
        recipientId,
        'automatic:allow-payment-required'
      );
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

    if(accountId.includes('prefix')){
      return
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
        accountId,
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
      if (error.message !== 'ALLOW_PAYMENT_REQUIRED') {
        throw new Error(error.message);
      }

      await updateAutomaticDialogue(
        accountId,
        recipientId,
        'automatic:allow-payment-required'
      );
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
        accountId,
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
      if (error.message !== 'ALLOW_PAYMENT_REQUIRED') {
        throw new Error(error.message);
      }

      await updateAutomaticDialogue(
        accountId,
        recipientId,
        'automatic:allow-payment-required'
      );
    }
  }

  // for (const dialog of unreadFirstDialogs) {
  //   const { recipientId, recipientAccessHash, messages, pings = [] } = dialog;

  //   try {
  //     const recipientFull = await getFullUser(
  //       client,
  //       recipientId,
  //       recipientAccessHash
  //     );
  //     if (!recipientFull) {
  //       continue;
  //     }

  //     const [firstMessage, secondMessage] = messages;

  //     const checkPeerFlood = await invokeRequest(
  //       client,
  //       new GramJs.messages.SendMessage({
  //         message: firstMessage.text,
  //         clearDraft: true,
  //         peer: new GramJs.InputPeerUser({
  //           userId: BigInt(recipientId),
  //           accessHash: BigInt(recipientAccessHash),
  //         }),
  //         randomId: BigInt(Math.floor(Math.random() * 10 ** 10) + 10 ** 10),
  //       }),
  //       { shouldIgnoreErrors: true }
  //     );

  //     if (!checkPeerFlood) {
  //       return;
  //     }

  //     await deleteHistory(
  //       client,
  //       new GramJs.InputPeerUser({
  //         userId: BigInt(recipientId),
  //         accessHash: BigInt(recipientAccessHash),
  //       }),
  //       true
  //     );

  //     await sleep(5000);
  //     const sentFirstMessage = await sendMessage(
  //       client,
  //       String(recipientId),
  //       String(recipientAccessHash),
  //       firstMessage.text,
  //       accountId,
  //       false,
  //       false
  //     );
  //     const sentSecondMessage = await sendMessage(
  //       client,
  //       String(recipientId),
  //       String(recipientAccessHash),
  //       secondMessage.text,
  //       accountId,
  //       false,
  //       false
  //     );

  //     await saveRecipient(
  //       accountId,
  //       recipientId,
  //       recipientAccessHash,
  //       recipientFull,
  //       dialog,
  //       [
  //         {
  //           id: sentFirstMessage.id,
  //           text: firstMessage.text,
  //           fromId: String(meId),
  //           date: Math.round(Date.now() / 1000),
  //         },
  //         {
  //           id: sentSecondMessage.id,
  //           text: secondMessage.text,
  //           fromId: String(meId),
  //           date: Math.round(Date.now() / 1000),
  //         },
  //       ],
  //       'update',
  //       {
  //         pings: [
  //           ...pings,
  //           { title: 'unread-first-message-ping', date: new Date() },
  //         ],
  //       }
  //     );
  //   } catch (error: any) {
  //     if (error.message !== 'ALLOW_PAYMENT_REQUIRED') {
  //       throw new Error(error.message);
  //     }

  //     await updateAutomaticDialogue(
  //       accountId,
  //       recipientId,
  //       'automatic:allow-payment-required'
  //     );
  //   }
  // }
};
