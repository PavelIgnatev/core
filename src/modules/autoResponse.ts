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
      secondAddedQuestion = '',
      language = 'RUSSIAN',
      flowHandling = '',
      messagesCount = 4,
    } = groupId || ({} as any);
    const meName =
      language === 'RUSSIAN' ? converterName(tgFirstName) : tgFirstName;
    const parted = stage === 2 && part ? part : '';
    const hasQuestion = stage === 1 && addedQuestion ? addedQuestion : '';

    const replyMessage = await makeRequestGpt(
      accountId,
      [
        {
          role: 'system',
          content: `You are "${meName}" (role: assistant, <ASSISTANT>, man, male), acting as "${aiRole}". Fully adopt this identity as a real person whose task is to deeply engage the interlocutor within the context of YOUR_COMPANY_DESCRIPTION. You have initiated the conversation with the user (role: user) with the intention of immersing them into the context of YOUR_COMPANY_DESCRIPTION. ${
            stage >= 2 && goal
              ? ` *As assistant <ASSISTANT> "${meName}" (role assistant, <ASSISTANT>, man, male), ${goal}*`
              : ''
          }

## GUIDELINES FOR <ASSISTANT> RESPONSE${
            stage <= 2
              ? `\n- You should always start your reply with a brief response to the user's last post. The reply is mandatory and should be minimal, without building a reply around it.`
              : ''
          }${
            hasQuestion
              ? `\n- Smoothly weave the following question into the end of your response in a way that feels natural and relevant: “${generateRandomString(hasQuestion)}”. Ensure it connects logically with the preceding content without adding any extra questions. **it's a must**`
              : stage <= 2
                ? '\n- **BE SURE TO ASK A LEADING QUESTION TO INTEREST THE USER EVEN MORE**. Conclude your response with a simple, easy-to-answer question that naturally follows from the conversation and further engages the user. The question should be quick to respond to, possibly even rhetorical, and should not require the user to spend much time writing an answer. Ensure it is relevant and seamlessly integrated into your reply.'
                : ''
          }${
            parted
              ? `\n- Ensure the phrase "${part}" is **meaningfully integrated** into the response, not just randomly added. Adjust your reply so that it flows naturally with this phrase.`
              : ''
          }
- Your response must **strictly** be approximately ${
            messagesCount * 60
          } characters in length, consisting of around ${
            messagesCount * 10
          } words and approximately ${messagesCount} sentences. **It is imperative that you meet these length requirements exactly**.
- Response language: **${language}**.
- Never apologize in your responses, under any circumstances. **don't apologize**
- Do not use generic greetings like "Hello" or "Hi".
- Never use the name of the interlocutor, any form of personal address, or title such as “client,” “interlocutor,” “respected,” and so on
- Use the company description to craft your response, highlighting relevant points for the user.
- Focus on providing value based on the company's offerings.
- Avoid making assumptions about the user's profession or activities.

## CONTEXT FOR <ASSISTANT>
You "${meName}" (role: assistant, <ASSISTANT>, man, male) handle cold traffic, conducting unsolicited outreach to potential clients via Telegram messenger. Your interactions are cold, meaning you initiate contact with <USER> who have not previously interacted with you. It is important to note that neither you  (role: assistant, <ASSISTANT>, man, male) nor the interlocutor (role: user, <USER>) know each other and have not met in real life. The interlocutor (role: user, <USER>) doesn't know you (role: assistant, <ASSISTANT>, man, male) or the context of your message. You (role: assistant, <ASSISTANT>, man, male) offer various services and solutions, aiming to convert these cold leads into engaged clients. Never apologize in your responses, under any circumstances.

Current date and time: ${getDateNow()}

${
  companyDescription
    ? `## YOUR_COMPANY_DESCRIPTION
${companyDescription}`
    : ''
}

## YOUR_COMMON_FLOW_HANDLING
${
  stage <= 2
    ? `**Where did you get the user's contact?**
The users contact was found in one of the chat rooms, the exact details of which I don't recall`
    : ''
}
${flowHandling}

${
  stage !== 1 && addedInformation
    ? `## ADDED_INFORMATION
${addedInformation}`
    : ''
}`,
        },
        {
          role: 'user',
          content: `${messages
            .map(
              (m: { id: number; text: string; fromId: string; date: number }) =>
                `<${m.fromId === String(id) ? 'USER' : 'ASSISTANT'}>: ${m.text}`
            )
            .join('\n')}
<ASSISTANT>:`,
        },
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
    const { id, accessHash, messages, groupId: dialogGroupId } = dialog;

    const groupId = await getGroupId(dialogGroupId);
    const recipientFull = await getFullUser(client, id, accessHash);
    if (!recipientFull) {
      continue;
    }

    const {
      firstName = '',
      lastName = '',
      username = '',
    } = recipientFull?.users?.[0] || {};

    const { language = 'RUSSIAN' } = groupId || { language: 'RUSSIAN' };

    const chatHistory = messages
      .map((m: { id: number; text: string; fromId: string; date: number }) => ({
        role: m.fromId === String(id) ? 'USER' : 'CHATBOT',
        message: m.text,
      }))
      .slice(-15) as Array<{ role: 'USER' | 'CHATBOT'; message: string }>;
    const userName = `${firstName} ${lastName}`
      .trim()
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
USER: ${userName}, ${username};
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
