import { getDialogs } from './getDialogs';
import { makeRequestGpt } from './makeRequestGpt';
import { saveRecipient } from './saveRecipient';
import { getGroupId } from '../db/groupId';
import { converterName } from '../helpers/converterName';
import { generateRandomString } from '../helpers/generateRandomString';
import { getDateNow } from '../helpers/getDateNow';
import { sendToFormBot } from '../helpers/sendToFormBot';
import { sendMessage } from '../methods/messages/sendMessage';
import { getFullUser } from '../methods/users/getFullUser';
import { extractLastQuestion } from '../helpers/extractLastQuestion';

const pattern =
  /((http|https):\/\/)?(www\.)?([a-zA-Z0-9\-_]+\.)+[a-zA-Z]{2,6}(\/[a-zA-Z0-9\&\;\:\.\,\?\=\-\_\+\%\'\~\#]*)*/g;

export const autoResponse = async (
  client: any,
  accountId: string,
  tgAccountId: string,
  tgFirstName: string
) => {
  const [dialogs, pingDialogs, manualControlDialogs] = await getDialogs(
    client,
    accountId
  );

  for (const dialog of dialogs) {
    const {
      id,
      accessHash,
      messages,
      groupId: dialogGroupId,
      firstName,
      lastName = '',
      stage,
      aiName,
      aiGender,
    } = dialog;

    const groupId = await getGroupId(dialogGroupId);

    const chatHistory = messages
      .map((m: { id: number; text: string; fromId: string; date: number }) => ({
        role: m.fromId === String(id) ? 'USER' : 'CHATBOT',
        message: m.text,
      }))
      .slice(-30);

    const userName = `${firstName} ${lastName}`
      .trim()
      .replace(pattern, '')
      .replace(/[^a-zA-Zа-яА-Я0-9\s]/g, '');

    const recipientFull = await getFullUser(client, id, accessHash);
    if (!recipientFull) {
      continue;
    }

    const {
      aiRole = '',
      companyDescription = '',
      addedInformation = '',
      goal = '',
      part = '',
      addedQuestion = '',
      language = 'RUSSIAN',
      flowHandling = '',
      messagesCount = 4,
    } = groupId || ({} as any);
    const meName =
      language === 'RUSSIAN' ? converterName(tgFirstName) : tgFirstName;
    const parted = stage === 2 && part ? part : '';
    const hasQuestion = stage === 1 && addedQuestion ? addedQuestion : '';
    const {
      fullUser: { about },
    } = recipientFull;

    const replyMessage = await makeRequestGpt(
      accountId,
      [
        {
          role: 'system',
          content: `You are "${meName}" (role assistant, role <ASSISTANT>, male), acting as "${aiRole}". Fully adopt this identity as a real person whose task is to deeply engage the interlocutor within the context of YOUR_COMPANY_DESCRIPTION. You have initiated the conversation with the user (role: user) with the intention of immersing them into the context of YOUR_COMPANY_DESCRIPTION. ${
            stage >= 2 && goal
              ? `**As assistant role <ASSISTANT> "${meName}" (role assistant, role <ASSISTANT>, male), ${goal}**`
              : hasQuestion
                ? `**As assistant role <ASSISTANT> "${meName}" (role assistant, role <ASSISTANT>, male), smoothly weave the following question into the end of your response in a way that feels natural and relevant: “${generateRandomString(hasQuestion)}”. Ensure it connects logically with the preceding content without adding any extra questions. **it's a must**`
                : ''
          }

## ROLE <ASSISANT>
NAME: ${meName};
GENDER: male;
CONTEXT: You handle cold traffic, conducting unsolicited outreach to potential clients via Telegram messenger. Your interactions are cold, meaning you initiate contact with role user who have not previously interacted with you. It is important to note that neither you  nor the interlocutor (role user) know each other and have not met in real life. The interlocutor (role user) doesn't know you or the context of your message. You offer various services and solutions, aiming to convert these cold leads into engaged clients. Never apologize in your responses, under any circumstances;

## ROLE <USER>
FULL DETAILS: ${userName};${aiName ? `\nREAL NAME: ${aiName};` : ''}
GENDER: ${aiGender || 'couldnt pinpoint'};${about ? `\nBIO: ${about}` : ''}
CONTEXT: A genuine individual who has never interacted with the assistant before and is unfamiliar with the assistant's role (role <ASSISTANT>). He or she is receiving a message from the role assistant for the first time and has no prior knowledge of your products.

## GUIDELINES FOR <ASSISTANT> RESPONSE
- Your response must **strictly** be approximately ${
            messagesCount * 60
          } characters in length, consisting of around ${
            messagesCount * 10
          } words and approximately ${messagesCount} sentences. **It is imperative that you meet these length requirements exactly**.${
            stage <= 2
              ? `\n- You should always start your reply with a brief response to the user's last post. The reply is mandatory and should be minimal, without building a reply around it.`
              : ''
          }${
            stage === 2
              ? '\n- **BE SURE TO ASK A LEADING QUESTION TO INTEREST THE USER EVEN MORE**. Conclude your response with a simple, easy-to-answer question that naturally follows from the conversation and further engages the user. The question should be quick to respond to, possibly even rhetorical, and should not require the user to spend much time writing an answer. Ensure it is relevant and seamlessly integrated into your reply.'
              : ''
          }${
            parted
              ? `\n- Ensure the phrase "${part}" is **meaningfully integrated** into the response, not just randomly added. Adjust your reply so that it flows naturally with this phrase.`
              : ''
          }
- Response language: **${language}**.
- Never apologize in your responses, under any circumstances. **don't apologize**
- Do not use generic greetings like "Hello" or "Hi".
- Never use the name of the interlocutor, any form of personal address, or title such as “client,” “interlocutor,” “respected,” and so on
- Use the company description to craft your response, highlighting relevant points for the user.
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

Current date and time: ${getDateNow()}`,
        },
        ...messages.map(
          (m: { id: number; text: string; fromId: string; date: number }) => ({
            role: m.fromId === String(id) ? 'user' : 'assistant',
            content: m.text,
          })
        ),
      ],
      parted,
      language,
      stage === 1,
      stage <= 2,
      stage <= 2 ? 3 : 2,
      true,
      dialogGroupId
    );

    await sendToFormBot(`**** AUTO REPLY MESSAGE (${language}) ****
ID: ${accountId}
GID: ${dialogGroupId}
RID: ${id}
${replyMessage}`);

    const lastQuestion = extractLastQuestion(replyMessage);
    if (lastQuestion) {
      const sentReplyMessage = await sendMessage(
        client,
        id,
        accessHash,
        replyMessage.replace(lastQuestion, ''),
        accountId
      );

      const sentQuestionMessage = await sendMessage(
        client,
        id,
        accessHash,
        lastQuestion,
        accountId
      );

      messages.push({
        id: sentReplyMessage.id,
        text: replyMessage.replace(lastQuestion, ''),
        fromId: tgAccountId,
        date: Math.round(Date.now() / 1000),
      });
      messages.push({
        id: sentQuestionMessage.id,
        text: lastQuestion,
        fromId: tgAccountId,
        date: Math.round(Date.now() / 1000),
      });
    } else {
      const sentReplyMessage = await sendMessage(
        client,
        id,
        accessHash,
        replyMessage,
        accountId
      );

      messages.push({
        id: sentReplyMessage.id,
        text: replyMessage,
        fromId: tgAccountId,
        date: Math.round(Date.now() / 1000),
      });
    }

    await saveRecipient(accountId, recipientFull, dialog, messages, 'update', {
      viewed: false,
    });
  }

  for (const dialog of pingDialogs) {
    const {
      id,
      accessHash,
      messages,
      groupId: dialogGroupId,
      aiName,
      aiGender,
    } = dialog;

    const groupId = await getGroupId(dialogGroupId);
    const recipientFull = await getFullUser(client, id, accessHash);
    if (!recipientFull) {
      continue;
    }

    const { firstName = '', lastName = '' } = recipientFull?.users?.[0] || {};

    const { language = 'RUSSIAN' } = groupId || { language: 'RUSSIAN' };

    const chatHistory = messages
      .map((m: { id: number; text: string; fromId: string; date: number }) => ({
        role: m.fromId === String(id) ? 'USER' : 'CHATBOT',
        message: m.text,
      }))
      .slice(-15) as Array<{ role: 'USER' | 'CHATBOT'; message: string }>;
    const userName = `${firstName} ${lastName}`
      .trim()
      .replace(pattern, '')
      .replace(/[^a-zA-Zа-яА-Я0-9\s]/g, '');

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
FULL DETAILS: ${userName};${aiName ? `\nREAL NAME: ${aiName};` : ''}
GENDER: ${aiGender || 'couldnt pinpoint'};
Today's date is ${getDateNow()};
      
## DIALOG
${chatHistory.map((chat) => `${chat.role}: ${chat.message}`).join('\n')}`,
        },
      ],
      '',
      'ANY',
      false,
      false,
      1,
      false,
      dialogGroupId
    );

    const sentPingMessage = await sendMessage(
      client,
      id,
      accessHash,
      pingMessage,
      accountId
    );

    messages.push({
      id: sentPingMessage.id,
      text: pingMessage,
      fromId: tgAccountId,
      date: Math.round(Date.now() / 1000),
    });

    await sendToFormBot(`**** PING MESSAGE (${language}) ****
ID: ${accountId}
GID: ${dialogGroupId}
${pingMessage}`);

    await saveRecipient(accountId, recipientFull, dialog, messages, 'update', {
      ping: true,
    });
  }

  for (const dialog of manualControlDialogs) {
    const { id, accessHash, messages, managerMessage } = dialog;

    const recipientFull = await getFullUser(client, id, accessHash);
    if (!recipientFull) {
      continue;
    }

    if (managerMessage) {
      const sentManagerMessage = await sendMessage(
        client,
        id,
        accessHash,
        managerMessage,
        accountId
      );

      messages.push({
        id: sentManagerMessage.id,
        text: managerMessage,
        fromId: tgAccountId,
        date: Math.round(Date.now() / 1000),
      });
    }

    await saveRecipient(accountId, recipientFull, dialog, messages, 'update', {
      managerMessage: null,
      viewed: false,
    });
  }
};
