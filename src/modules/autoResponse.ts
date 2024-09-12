import { yellow } from 'colors/safe';

import { getDialogs } from './getDialogs';
import { makeRequestComplete } from './makeRequestComplete';
import { makeRequestGpt } from './makeRequestGpt';
import { saveRecipient } from './saveRecipient';
import { getGroupId } from '../db/groupId';
import { converterName } from '../helpers/converterName';
import { generateRandomString } from '../helpers/generateRandomString';
import { getDateNow } from '../helpers/getDateNow';
import { sendToFormBot } from '../helpers/sendToFormBot';
import { sendMessage } from '../methods/messages/sendMessage';
import { getFullUser } from '../methods/users/getFullUser';

const gptRequestWrapper = async (
  language: string,
  message: string,
  dialogGroupId: string,
  accountId: string,
  meName: string,
  part: string | null
) => {
  const result = await makeRequestGpt(
    `## CLARIFICATION CONTEXT
You are **${meName}** (man).

## CLARIFICATION GUIDELINES
- Ensure the reply is in **${language}**.
- The original meaning must be **completely** preserved, without any deviation.
- Use the formal "You" when addressing others to maintain a respectful tone in communication;

## CLARIFICATION INSTRUCTIONS
Clarify the text within quotes (***) while following the **CLARIFICATION GUIDELINES**. Preserve the original meaning, structure, and number of sentences. Use only **${language}**. Ensure the text remains distinct, but similar to the original, with an emphasis on clarity. Avoid excessive rephrasing and ensure precision without adding extra words or phrases.`,
    `TEXT TO CLARIFY: ***${message}***`,
    dialogGroupId,
    accountId,
    part
  );

  return result;
};

export const autoResponse = async (
  client: any,
  accountId: string,
  tgAccountId: string,
  tgFirstName: string
) => {
  console.log(`[${accountId}] Initialize module`, yellow('AUTO reply'));

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
      styleGuide = '',
      language = 'RUSSIAN',
      flowHandling = '',
    } = groupId || ({} as any);
    const meName =
      language === 'RUSSIAN' ? converterName(tgFirstName) : tgFirstName;
    const parted = stage === 2 && part ? part : null;
    const wreplyMessage = await makeRequestComplete(
      `## REPLY CONTEXT
You **${meName}**, take on the identity of **${aiRole}**.
Your conversation partner **${userName}** (role: USER) is the person you started chatting with on Telegram. While specific details about where you met are not available, it is important to note that **${userName}** is a real person. The conversation is private and the focus is on creating a natural and engaging interaction. The current date is **${getDateNow()}**.

## REPLY GUIDELINES${
        part
          ? `\n- **Include part** of the conversation from **${part}** in your reply (!!IMPORTANT!!);`
          : ''
      }${
        stage <= 2
          ? `\n- **Minimum 2 messages (100 characters) in REPLY**\n- **Do not ask questions under any circumstances**. The text should contain only affirmative sentences;`
          : ''
      }
- **Do not** use unnecessary greetings or filler phrases ([], {}, <> and etc);
- Follow the style guide: **${styleGuide}**;
- Ensure the reply is in **${language}**;

## REPLY INSTRUCTIONS
${
  parted ? `**!!REPLY WITH ${parted}, MAKE IT APPROPRIATE!!** ` : ''
}!!REPLY to the last message from **${userName}** (role: USER) while following the ***REPLY GUIDELINES***. ${
        stage >= 2 ? `***${goal}***` : ''
      }!!`,
      [
        {
          title: 'YOUR_COMPANY_DESCRIPTION',
          text: companyDescription || '',
        },
        {
          title: 'YOUR_COMMON_FLOW_HANDLING',
          text: flowHandling || '',
        },
        {
          title: 'YOUR_COMPANY_ADDED_INFORMATION',
          text: addedInformation || '',
        },
      ],
      stage === 1,
      stage <= 2,
      stage <= 2 ? 2 : 1,
      parted,
      chatHistory,
      dialogGroupId,
      accountId
    );
    const replyMessage = await gptRequestWrapper(
      language,
      wreplyMessage,
      dialogGroupId,
      accountId,
      meName,
      parted
    );

    await sendToFormBot(`**** AUTO reply MESSAGE (${language}) ****
ДО: ${wreplyMessage}
ПОСЛЕ: ${replyMessage}`);
    const sentreplyMessage = await sendMessage(
      client,
      id,
      accessHash,
      replyMessage,
      accountId
    );

    messages.push({
      id: sentreplyMessage.id,
      text: replyMessage,
      fromId: tgAccountId,
      date: Math.round(Date.now() / 1000),
    });

    if (stage === 1 && addedQuestion) {
      const genQuestion = generateRandomString(addedQuestion);
      const genAddedQuestion = await gptRequestWrapper(
        language,
        genQuestion,
        dialogGroupId,
        accountId,
        meName,
        null
      );

      const sentAddedQuestion = await sendMessage(
        client,
        id,
        accessHash,
        genAddedQuestion,
        accountId
      );
      messages.push({
        id: sentAddedQuestion.id,
        text: genAddedQuestion,
        fromId: tgAccountId,
        date: Math.round(Date.now() / 1000),
      });

      await sendToFormBot(`**** FIRST ADDED MESSAGE (${language}) ****
ДО: ${genQuestion}
ПОСЛЕ: ${genAddedQuestion}`);
    }

    if (stage === 2 && secondAddedQuestion) {
      const genQuestion = generateRandomString(secondAddedQuestion);
      const genAddedQuestion = await gptRequestWrapper(
        language,
        genQuestion,
        dialogGroupId,
        accountId,
        meName,
        null
      );
      const sentSecondAddedQuestion = await sendMessage(
        client,
        id,
        accessHash,
        genAddedQuestion,
        accountId
      );

      messages.push({
        id: sentSecondAddedQuestion.id,
        text: genAddedQuestion,
        fromId: tgAccountId,
        date: Math.round(Date.now() / 1000),
      });

      await sendToFormBot(`**** SECOND ADDED MESSAGE (${language}) ****
ДО: ${genQuestion}
ПОСЛЕ: ${genAddedQuestion}`);
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
      dialogGroupId,
      accountId,
      null
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
