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
      `!!Your goal is meaningfully reply to the interlocutor (role: **INTERLOCUTOR MESSAGE**) while following the guidelines ***REPLY GUIDELINES*** in **${language}** language. ${
        stage === 2 && goal ? `***${goal}***` : ''
      }!!
          
## REPLY CONTEXT
Your role: **MY MESSAGE**. 
Your first name **${meName}** (role: **MY MESSAGE**) ${
        stage <= 2 ? `, take on the identity of **${aiRole}**` : ''
      }. The conversation is private and the focus is on creating a natural and engaging interaction.${
        stage === 1
          ? '\nThe conversation was initiated by **MY MESSAGE** to ask a question, establish a connection, and eventually present a tailored offer to the interlocutor. '
          : ''
      }Your chat interlocutor "${userName}" (role: **INTERLOCUTOR MESSAGE**) is the person you are chatting with within the Telegram messenger. You do not know each other and have not seen each other in real life. While specific details about where you met are not available, it is important to note that **INTERLOCUTOR MESSAGE** is a real person, human. The current date is **${getDateNow()}**.

## REPLY GUIDELINES
- Ensure the reply is in **${language}**;
- Always reference the **INTERLOCUTOR MESSAGE** directly in your reply, ensuring your response logically follows from and adds value to their last statement or question;
- Reply must contain **strictly** **${
        hasQuestion ? `${messagesCount || 4}` : '2'
      } affirmative sentences** ${
        hasQuestion
          ? `plus **1 question '${generateRandomString(hasQuestion)}'**`
          : ''
      }, but small deviations are acceptable if they help to improve the message.${
        parted
          ? `\n- The phrase "${parted}" must appear in the reply. Adjust the rest of the response to include this phrase seamlessly.`
          : ''
      }
- **Do not** ever introduce yourself a first name **${meName}**;
- **Do not** use unnecessary greetings;
- **Do not** use filler phrases ([], {}, <> and etc);`,
      `## CURRENT DIALOG HISTORY
${messages
  .map(
    (m: { id: number; text: string; fromId: string; date: number }) =>
      `${m.fromId === String(id) ? '**INTERLOCUTOR MESSAGE**' : '**MY MESSAGE**'}: ${m.text.slice(0, 500)}`
  )
  .join('\n')}

**MY NEW MESSAGE FOR REPLY (in **${language}** language, ${
        hasQuestion
          ? `${messagesCount || 4} sentences + 1 question`
          : '2 sentences'
      })**:`,
      parted,
      [
        {
          data: {
            title: 'CURRENT_DIALOG_HISTORY',
            text:
              stage === 1
                ? `## CURRENT DIALOG HISTORY
${messages
  .map(
    (m: { id: number; text: string; fromId: string; date: number }) =>
      `${m.fromId === String(id) ? '**INTERLOCUTOR MESSAGE**' : '**MY MESSAGE**'}: ${m.text.slice(0, 500)}`
  )
  .join('\n')}

The conversation was initiated by **MY MESSAGE** to ask a question, establish a connection, and eventually present a tailored offer to the interlocutor. 
In the **CURRENT DIALOG HISTORY**, **MY MESSAGE** represents your **${meName} messages**, and **INTERLOCUTOR MESSAGE** represents the messages from the other **person ${userName}**.`
                : '',
          },
        },
        {
          data: {
            title: 'YOUR_COMPANY_DESCRIPTION',
            text: companyDescription || '',
          },
        },
        {
          data: {
            title: 'YOUR_COMMON_FLOW_HANDLING',
            text: flowHandling || '',
          },
        },
        {
          data: {
            title: 'YOUR_COMPANY_ADDED_INFORMATION',
            text: addedInformation || '',
          },
        },
      ],
      language,
      stage === 1,
      stage <= 2,
      stage <= 2 ? 3 : 1,
      accountId,
      dialogGroupId
    );

    await sendToFormBot(`**** AUTO REPLY MESSAGE (${language}) ****
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
      `You are a reminder message generator for users with the USER role. Your task is to create a short and clear reminder message for the USER role conversation partner based on the information in their USER DATA. The message should convey that you are waiting for an answer to the last question and that it is very important to you. If possible, address the interlocutor by name, use the name only if it is a proper name and it actually exists in ${language}. LANGUAGE reply: ${language}. Only ${language}.`,
      `## STYLE GUIDE
Maximum length of reminder message 100 characters

## USER DATA
USER: ${userName}, ${username};
Today's date is ${getDateNow()};
      
## DIALOG
${chatHistory.map((chat) => `${chat.role}: ${chat.message}`).join('\n')}`,
      '',
      [],
      'ANY',
      false,
      false,
      1,
      accountId,
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
