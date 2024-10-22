import { yellow } from 'colors/safe';

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
  console.log(`[${accountId}] Initialize module`, yellow('AUTO REPLY'));

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

    const recipientFull = await getFullUser(client, accountId, id, accessHash);
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
    const hasQuestion =
      stage === 1 && addedQuestion
        ? addedQuestion
        : stage === 2 && secondAddedQuestion
          ? secondAddedQuestion
          : '';

    const replyMessage = await makeRequestGpt(
      accountId,
      [
        {
          role: 'system',
          content: `You are "${meName}" (role assistant, man, male), acting as "${aiRole}". Fully adopt this identity as a real person whose task is to deeply engage the interlocutor in the context of the YOUR_COMPANY_DESCRIPTION. You "${meName}" (role assistant, man, male) have initiated the conversation with the user (role: user), intending to immerse them into the context of YOUR_COMPANY_DESCRIPTION.

Your chat interlocutor is a user (role user). You are conversing within the Telegram messenger. It is important to note that neither you nor the interlocutor know each other and have not met in real life. The interlocutor doesn't know you or the context of your message. ${
            stage === 1
              ? `Be concise and don't reveal all the details at once.`
              : ''
          }${
            stage === 2
              ? `Do not repeat information you've already shared. Provide new insights based on the conversation.`
              : ''
          }${
            stage >= 2 && goal
              ? `*As assistant "${meName}" (role assistant, man, male) ${goal}*`
              : ''
          }
Current date and time: ${getDateNow()}

## GUIDELINES FOR RESPONSE${
            stage <= 2
              ? `\n- You must always start your response with a brief acknowledgment of the user's last message. This acknowledgment is mandatory and should be minimal, without building your response around it.`
              : ''
          }${
            hasQuestion
              ? `\n- Qualitatively integrate the following question at the end of your answer: “${generateRandomString(hasQuestion)}”. Do not add any other questions.`
              : '\n- Conclude your response with a relevant, open-ended question to engage the user further.'
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
- Do not use generic greetings like "Hello" or "Hi".
- Do not use the interlocutor name or any form of personal address under any circumstances.           
- Use the company description to craft your response, highlighting relevant points for the user.
- Focus on providing value based on the company's offerings.
- Avoid making assumptions about the user's profession or activities.

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
      stage <= 2 ? 3 : 1,
      stage === 1,
      dialogGroupId
    );

    await sendToFormBot(`**** AUTO REPLY MESSAGE (${language}) ****
ID: ${accountId}
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

    await saveRecipient(accountId, recipientFull, dialog, messages, 'update');
  }

  for (const dialog of pingDialogs) {
    const { id, accessHash, messages, groupId: dialogGroupId } = dialog;

    const groupId = await getGroupId(dialogGroupId);
    const recipientFull = await getFullUser(client, accountId, id, accessHash);
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
${pingMessage}`);

    await saveRecipient(accountId, recipientFull, dialog, messages, 'update', {
      ping: true,
    });
  }

  for (const dialog of manualControlDialogs) {
    const { id, accessHash, messages, managerMessage } = dialog;

    const recipientFull = await getFullUser(client, accountId, id, accessHash);
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
