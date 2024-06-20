import { makeRequestComplete } from "../helpers/makeRequestComplete";
import { makeRequestGpt } from "../helpers/makeRequestGpt";
import { generateRandomString } from "../helpers/generateRandomString";
import { converterName } from "../helpers/converterName";
import { getCombinedMessages } from "../helpers/getCombinedMessages";

import { sendMessage } from "../methods/messages/sendMessage";
import { getGroupId } from "../methods/groupId/getGroupId";
import { saveRecipient } from "../methods/recipients/saveRecipient";
import { getFullUser } from "../methods/users/getFullUser";
import { getDialogs } from "../methods/dialogs/getDialogs";
import { saveBlockedRecipient } from "../methods/recipients/saveBlockedRecipient";
import { getDateNow } from "../helpers/getDateNow";
import { sendToFormBot } from "../helpers/sendToFormBot";

const gptRequestWrapper = async (
  language: string,
  message: string,
  dialogGroupId: string,
  accountId: string,
  addedContextString = ""
) => {
  return await makeRequestGpt(
    `## CONTEXT
${addedContextString}
Today's date is ${getDateNow()}.

## STYLE GUIDE
Avoid including unnecessary greetings and third-party characters like: [],{},{},|,<>,(),* and etc. The resulting response language should be consistent with the original message. RESPONSE LANGUAGE: ${language}.

## INSTRUCTIONS
I need you to rephrase the message while keeping its original meaning, structure, and number of characters. Ensure that the resulting message remains the same length as the original and conveys the same message in a unique way. RESPONSE LANGUAGE: ${language}.`,
    message,
    dialogGroupId,
    accountId
  );
};

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
      lastName = "",
      language = "RUSSIAN",
    } = dialog;

    const meName =
      language === "RUSSIAN" ? converterName(tgFirstName) : tgFirstName;

    const groupId = await getGroupId(dialogGroupId);
    const combinedMessages = getCombinedMessages(messages);

    const chatHistory = messages
      .map((m: { id: number; text: string; fromId: string; date: number }) => ({
        role: m.fromId === String(id) ? "USER" : "CHATBOT",
        message: m.text,
      }))
      .slice(-30);

    const currentStage = combinedMessages.filter(
      (m) => m.fromId === String(id)
    ).length;
    const userName = `${firstName} ${lastName}`
      .trim()
      .replace(/[^a-zA-Zа-яА-Я0-9\s]/g, "");

    if (currentStage > 25) {
      console.log(`MAXIMUM STAGE in ${accountId}:${id}`);
      await saveBlockedRecipient(accountId, id, "dialogs-max-stage");
      continue;
    }

    const recipientFull = await getFullUser(client, id, accessHash);
    if (!recipientFull) {
      console.error(`Chat with username ${id} not resolved`);
      await saveBlockedRecipient(accountId, id, "dialogs-not-resolved");
      continue;
    }

    const {
      offer: {
        aiRole = "",
        companyDescription = "",
        addedInformation = "",
        goal = "",
        part = "",
        addedQuestion = "",
        secondAddedQuestion = "",
        styleGuide = "",
      },
    } = groupId || { offer: {} };

    let promptGoal = "";
    if (currentStage === 1) {
      promptGoal = `Reply to the last message "${userName}" (ROLE USER).`;
    }
    if (currentStage >= 2) {
      promptGoal = `Reply to the last message "${userName}" (ROLE USER). ${goal}.`;
    }

    const wresponseMessage = await makeRequestComplete(
      `
## CONTEXT
You are "${meName}" (man, male, male gender, ROLE PERSON, REAL PERSON). You are ${aiRole}. You (${meName}) have previously initiated a conversation with the interlocutor "${userName}" (ROLE USER) in the messenger Telegram. The contact of the interlocutor "${userName}" (ROLE USER) was found in one of Telegram chat rooms, the exact information in which one is not available. Today's date is ${getDateNow()};

## STYLE GUIDE
${styleGuide}. RESPONSE LANGUAGE: ${language}.

## INSTRUCTIONS
${promptGoal}`,
      [
        {
          title: "YOUR_COMPANY_DESCRIPTION",
          text: companyDescription,
        },
        {
          title: "YOUR_COMPANY_ADDED_INFORMATION",
          text: addedInformation,
        },
      ],
      currentStage === 1,
      currentStage <= 2,
      currentStage <= 2 ? 2 : 1,
      currentStage === 2 ? part : null,
      chatHistory,
      dialogGroupId,
      accountId
    );
    const responseMessage = await gptRequestWrapper(
      language,
      wresponseMessage,
      dialogGroupId,
      accountId,
      `You are "${meName}" (man, male, male gender, ROLE PERSON, REAL PERSON).`
    );

    await sendToFormBot(`**** AUTO RESPONSE MESSAGE ****
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

    if (currentStage === 1 && addedQuestion) {
      const genQuestion = generateRandomString(addedQuestion);
      const question = await gptRequestWrapper(
        language,
        genQuestion,
        dialogGroupId,
        accountId,
        `You are "${meName}" (man, male, male gender, ROLE PERSON, REAL PERSON).`
      );
      await sendToFormBot(`**** FIRST ADDED QUESTION ****
ДО: ${genQuestion}
ПОСЛЕ: ${question}`);
      const sentAddedQuestion = await sendMessage(
        client,
        id,
        accessHash,
        question,
        accountId
      );
      messages.push({
        id: sentAddedQuestion.id,
        text: question,
        fromId: tgAccountId,
        date: Math.round(Date.now() / 1000),
      });
    }

    if (currentStage === 2 && secondAddedQuestion) {
      const genQuestion = generateRandomString(secondAddedQuestion);
      const question = await gptRequestWrapper(
        language,
        genQuestion,
        dialogGroupId,
        accountId,
        `You are "${meName}" (man, male, male gender, ROLE PERSON, REAL PERSON).`
      );
      await sendToFormBot(`**** SECOND ADDED QUESTION ****
ДО: ${genQuestion}
ПОСЛЕ: ${question}`);
      const sentSecondAddedQuestion = await sendMessage(
        client,
        id,
        accessHash,
        question,
        accountId
      );
      messages.push({
        id: sentSecondAddedQuestion.id,
        text: question,
        fromId: tgAccountId,
        date: Math.round(Date.now() / 1000),
      });
    }

    await saveRecipient(accountId, recipientFull, dialog, messages, "update");
  }

  for (const dialog of pingDialogs) {
    const {
      id,
      accessHash,
      messages,
      groupId: dialogGroupId,
      language = "RUSSIAN",
    } = dialog;

    const recipientFull = await getFullUser(client, id, accessHash);
    if (!recipientFull) {
      console.error(`Chat with username ${id} not resolved`);
      await saveBlockedRecipient(accountId, id, "ping-not-resolved");
      continue;
    }

    const {
      firstName = "",
      lastName = "",
      username = "",
    } = recipientFull?.users?.[0] || {};

    const chatHistory = messages
      .map((m: { id: number; text: string; fromId: string; date: number }) => ({
        role: m.fromId === String(id) ? "USER" : "CHATBOT",
        message: m.text,
      }))
      .slice(-15) as Array<{ role: "USER" | "CHATBOT"; message: string }>;
    const userName = `${firstName} ${lastName}`
      .trim()
      .replace(/[^a-zA-Zа-яА-Я0-9\s]/g, "");
    const genPingMessage = await makeRequestGpt(
      `You are a reminder message generator for users with the USER role. Your task is to create a short and clear reminder message for the USER role conversation partner based on the information in their USER DATA. The message should convey that you are waiting for an answer to the last question and that it is very important to you. If possible, address the interlocutor by name, use the name only if it is a proper name and it actually exists in ${language}. LANGUAGE RESPONSE: ${language}. Only ${language}.`,
      `## STYLE GUIDE
Maximum length of reminder message 100 characters

## USER DATA
USER: ${userName}, ${username};
Today's date is ${getDateNow()};
      
## DIALOG
${chatHistory.map((chat) => `${chat.role}: ${chat.message}`).join("\n")}`,
      dialogGroupId,
      accountId
    );
    const pingMessage = await gptRequestWrapper(
      language,
      genPingMessage,
      dialogGroupId,
      accountId
    );
    await sendToFormBot(`**** PING MESSAGE ****
ДО: ${genPingMessage}
ПОСЛЕ: ${pingMessage}`);

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

    await saveRecipient(accountId, recipientFull, dialog, messages, "update", {
      ping: true,
    });
  }

  for (const dialog of manualControlDialogs) {
    const { id, accessHash, messages, managerMessage } = dialog;

    const recipientFull = await getFullUser(client, id, accessHash);
    if (!recipientFull) {
      console.error(`Chat with username ${id} not resolved`);
      await saveBlockedRecipient(
        accountId,
        id,
        "manual-control-dialogs-not-resolved"
      );
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

    await saveRecipient(accountId, recipientFull, dialog, messages, "update", {
      managerMessage: null,
      viewed: false,
    });
  }
};
