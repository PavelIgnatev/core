import { red, yellow } from 'colors/safe';

import GramJs from '../common/gramjs/tl/api';

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
  addedContextString: string = '',
  part: string = ''
) => {
  const result = await makeRequestGpt(
    `## CONTEXT
${addedContextString}
Today's date is ${getDateNow()}.

## STYLE GUIDE
${addedContextString}
Avoid including unnecessary greetings and third-party characters like: [],{},{},|,<>,(),* and etc. The resulting response language should be consistent with the original message. RESPONSE LANGUAGE: ${language}.

## INSTRUCTIONS
I need you to paraphrase a message (which is inside '''') while maintaining its original meaning, structure, and character count. Make sure the resulting message is the same length as the original, and conveys the same thought in a unique but similar way to the original message. RESPONSE LANGUAGE: ${language}. Make sure that the result does not contain any words other than ${language} (except for proper names).`,
    `A message where the wording needs to be changed: ''''${message}''''`,
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
  console.log(`[${accountId}] Initialize module`, yellow('AUTO RESPONSE'));

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
    } = groupId || ({} as any);
    const meName =
      language === 'RUSSIAN' ? converterName(tgFirstName) : tgFirstName;

    let promptGoal = '';
    if (stage === 1) {
      promptGoal = `!!!!Reply to the last message "${userName}" (ROLE USER).!!!!`;
    }
    if (stage >= 2) {
      promptGoal = `!!!!Reply to the last message "${userName}" (ROLE USER). ${goal}.!!!!`;
    }

    const parted = stage === 2 && part ? part : null;
    const wresponseMessage = await makeRequestComplete(
      `
## CONTEXT
You are "${meName}" (man, male, male gender, ROLE PERSON, REAL PERSON). You are ${aiRole}. You (${meName}) have previously initiated a conversation with the interlocutor "${userName}" (ROLE USER) in the messenger Telegram. The contact of the interlocutor "${userName}" (ROLE USER) was found in one of Telegram chat rooms, the exact information in which one is not available. Today's date is ${getDateNow()};

## STYLE GUIDE
${styleGuide}. Avoid including unnecessary greetings and third-party characters like: [],{},{},|,<>,(),* and etc. RESPONSE LANGUAGE: ${language}.

## INSTRUCTIONS
${promptGoal} ${
        parted
          ? `!!!!A mandatory part that should definitely be in the answer: ${part}!!!!`
          : ''
      }`,
      [
        {
          title: 'YOUR_COMPANY_DESCRIPTION',
          text: companyDescription,
        },
        {
          title: 'YOUR_COMPANY_ADDED_INFORMATION',
          text: addedInformation,
        },
      ],
      stage === 1,
      stage <= 2,
      stage <= 2 ? 2 : 1,
      stage === 2 ? part : null,
      chatHistory,
      dialogGroupId,
      accountId
    );
    const responseMessage = await gptRequestWrapper(
      language,
      wresponseMessage,
      dialogGroupId,
      accountId,
      `You are "${meName}" (man, male, male gender, ROLE PERSON, REAL PERSON).`,
      stage === 2 ? part : null
    );

    await sendToFormBot(`**** AUTO RESPONSE MESSAGE (${language}) ****
ДО: ${wresponseMessage}
ПОСЛЕ: ${responseMessage}`);
    const sentResponseMessage = await sendMessage(
      client,
      id,
      accessHash,
      responseMessage,
      accountId
    );

    messages.push({
      id: sentResponseMessage.id,
      text: responseMessage,
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
        `You are "${meName}" (person, male, male gender, PERSON ROLE, REAL PERSON). !!!!Use 'YOU' when addressing the person you are talking to because their gender is unknown!!!!`
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
        `You are "${meName}" (person, male, male gender, PERSON ROLE, REAL PERSON). !!!!Use 'YOU' when addressing the person you are talking to because their gender is unknown!!!!`
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

    const { language = "RUSSIAN" } = groupId || { language: 'RUSSIAN' };

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
      `You are a reminder message generator for users with the USER role. Your task is to create a short and clear reminder message for the USER role conversation partner based on the information in their USER DATA. The message should convey that you are waiting for an answer to the last question and that it is very important to you. If possible, address the interlocutor by name, use the name only if it is a proper name and it actually exists in ${language}. LANGUAGE RESPONSE: ${language}. Only ${language}.`,
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
