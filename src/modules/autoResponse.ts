import GramJs from "../gramjs/tl/api";

import { getDialogs } from "../methods/dialogs/getDialogs";
import { Account } from "../@types/Account";

import { makeRequestComplete } from "../helpers/makeRequestComplete";
import { generateRandomString } from "../helpers/generateRandomString";
import { converterName } from "../helpers/converterName";

import { sendMessage } from "../methods/messages/sendMessage";
import { getGroupId } from "../methods/groupId/getGroupId";
import { saveRecipient } from "../methods/recipients/saveRecipient";
import { getFullUser } from "../methods/users/getFullUser";
import { getCombinedMessages } from "../helpers/getCombinedMessages";
import { sendToBot } from "../helpers/sendToBot";
import { makeRequestGpt } from "../helpers/makeRequestGpt";

export const autoResponse = async (
  client: any,
  account: Account,
  meFullUser: GramJs.User
) => {
  const [dialogs, pingDialogs] = await getDialogs(client, account);

  for (const dialog of dialogs) {
    const { firstName: meFirstName = "" } = meFullUser;
    const {
      id,
      accessHash,
      messages,
      groupId: dialogGroupId,
      firstName,
      lastName = "",
    } = dialog;

    const groupId = await getGroupId(dialogGroupId);
    const combinedMessages = getCombinedMessages(messages);

    const chatHistory = messages
      .map((m: { id: number; text: string; fromId: string; date: number }) => ({
        role: m.fromId === String(id) ? "USER" : "CHATBOT",
        message: m.text,
      }))
      .slice(-15);
    const currentStage = combinedMessages.filter(
      (m) => m.fromId === String(id)
    ).length;
    const userName = `${firstName} ${lastName}`
      .trim()
      .replace(/[^a-zA-Zа-яА-Я0-9\s]/g, "");
    const meName = converterName(meFirstName);

    if (currentStage > 15) {
      console.log(`MAXIMUM STAGE in ${account.accountId}:${id}`);
      continue;
    }

    const recipientFull = await getFullUser(client, id, accessHash);
    if (!recipientFull) {
      console.error(`Chat with username ${id} not resolved`);
      return;
    }

    const {
      offer: {
        aiRole = "",
        companyDescription = "",
        goal = "",
        part = "",
        addedQuestion = "",
        secondAddedQuestion = "",
        styleGuide = "",
      },
    } = groupId || { offer: {} };

    let promptGoal = "";
    if (currentStage === 1) {
      promptGoal = `Reply to the latest post by USER '${userName}', with an emphasis aimed at drawing '${userName}'s attention to the sentence described above`;
    }
    if (currentStage >= 2) {
      promptGoal = `Reply to the last post by USER '${userName}'. ${goal}`;
    }

    const responseMessage = await makeRequestComplete(
      `
## Context
You are '${meName}' (male). You have previously initiated a conversation with the interlocutor '${userName}' in Telegram messenger to offer a service to the company you are an employee of. You are ${aiRole}. ${companyDescription}. The contact of the interlocutor '${userName}' was found in one of the Telegram chat rooms, the exact information about which chat room is not available;

## Style Guide
${styleGuide}. Response Language - Russian.

## Task
${promptGoal}`,
      currentStage === 1,
      currentStage <= 2,
      currentStage <= 2 ? 2 : 1,
      currentStage === 2 ? part : null,
      chatHistory,
      groupId,
      account.accountId
    );
    const sentResponseMessage = await sendMessage(
      client,
      id,
      accessHash,
      responseMessage,
      account.accountId
    );

    messages.push({
      id: sentResponseMessage.id,
      text: responseMessage,
      fromId: String(meFullUser.id),
      date: Math.round(Date.now() / 1000),
    });

    if (currentStage === 1 && addedQuestion) {
      const question = generateRandomString(addedQuestion);
      const sentAddedQuestion = await sendMessage(
        client,
        id,
        accessHash,
        question,
        account.accountId
      );
      messages.push({
        id: sentAddedQuestion.id,
        text: question,
        fromId: String(meFullUser.id),
        date: Math.round(Date.now() / 1000),
      });
    }

    if (currentStage === 2 && secondAddedQuestion) {
      const question = generateRandomString(secondAddedQuestion);
      const sentSecondAddedQuestion = await sendMessage(
        client,
        id,
        accessHash,
        question,
        account.accountId
      );
      messages.push({
        id: sentSecondAddedQuestion.id,
        text: question,
        fromId: String(meFullUser.id),
        date: Math.round(Date.now() / 1000),
      });
    }

    await saveRecipient(
      account.accountId,
      recipientFull,
      dialog,
      messages,
      "update"
    );
  }

  for (const dialog of pingDialogs) {
    const { id, accessHash, messages, groupId: dialogGroupId } = dialog;

    const recipientFull = await getFullUser(client, id, accessHash);
    if (!recipientFull) {
      console.error(`Chat with username ${id} not resolved, maybe banned`);
      return;
    }
    const {
      firstName = "",
      lastName = "",
      username = "",
    } = recipientFull?.users?.[0] || {};
    const { about = "" } = recipientFull.fullUser;

    const chatHistory = messages
      .map((m: { id: number; text: string; fromId: string; date: number }) => ({
        role: m.fromId === String(id) ? "USER" : "CHATBOT",
        message: m.text,
      }))
      .slice(-15) as Array<{ role: "USER" | "CHATBOT"; message: string }>;
    const pingMessage = await makeRequestGpt(
      `## CONTEXT
Данные о собеседнике: ${firstName} ${lastName}, ${about}, ${username}
      
## DIALOG
${chatHistory.map((chat) => `${chat.role}: ${chat.message}`).join("\n")}


## TASK
Сгенерировать короткое и четкое сообщение-напоминание для собеседника USER с информацией о том, что ты очень ждешь ответа на последниий вопрос, для тебя это очень важно. Обратись к собеседнику по имени (на русском) в случае, если его можно будет получить из данных о собеседнике.`,
      dialogGroupId,
      account.accountId
    );

    const sentPingMessage = await sendMessage(
      client,
      id,
      accessHash,
      pingMessage,
      account.accountId
    );

    messages.push({
      id: sentPingMessage.id,
      text: pingMessage,
      fromId: String(meFullUser.id),
      date: Math.round(Date.now() / 1000),
    });

    await saveRecipient(
      account.accountId,
      recipientFull,
      dialog,
      messages,
      "update",
      { ping: true }
    );

    await sendToBot(`Отправил пинг для ${id}: ${pingMessage}`);
  }
};
