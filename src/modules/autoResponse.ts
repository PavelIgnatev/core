import GramJs from "../gramjs/tl/api";

import { Account } from "../@types/Account";

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

export const autoResponse = async (
  client: any,
  account: Account,
  meFullUser: GramJs.User
) => {
  const [dialogs, pingDialogs, manualControlDialogs] = await getDialogs(
    client,
    account
  );
  const { firstName: meFirstName = "" } = meFullUser;
  const meName = converterName(meFirstName);

  for (const dialog of dialogs) {
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
      promptGoal = `Ответить на последнее сообщениe пользователя '${userName}', с акцентом, направленным на привлечение внимания '${userName}' к описанному выше предложению.`;
    }
    if (currentStage >= 2) {
      promptGoal = `Ответить на последнее сообщениe пользователя '${userName}'. ${goal}`;
    }

    const responseMessage = await makeRequestComplete(
      `
## Context
Вы - '${meName}' (мужчина). Вы ранее инициировали общение с собеседником '${userName}' в мессенджере Telegram с целью предложить услугу компании, сотрудником которой вы являетесь. Вы - ${aiRole}. ${companyDescription}. Контакт собеседника '${userName}' был найден в одном из чатов Telegram, точной информации в каком именно нету.

## Style Guide
${styleGuide}.

## Task
${promptGoal}`,
      currentStage === 1,
      currentStage <= 2,
      currentStage <= 2 ? 2 : 1,
      currentStage === 2 ? part : null,
      chatHistory,
      dialogGroupId,
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
    const userName = `${firstName} ${lastName}`
      .trim()
      .replace(/[^a-zA-Zа-яА-Я0-9\s]/g, "");
    const pingMessage = await makeRequestGpt(
      `## CONTEXT
Данные о USER: ${userName}, ${about}, ${username}
      
## DIALOG
${chatHistory
  .map(
    (chat) =>
      `${chat.role} (${chat.role === "CHATBOT" ? meName : userName}): ${
        chat.message
      }`
  )
  .join("\n")}


## TASK
Сгенерировать короткое и четкое сообщение-напоминание для собеседника USER (${userName}) с информацией о том, что ты очень ждешь ответа на последниий вопрос, для тебя это очень важно. Обратись к собеседнику по имени (на русском) в случае, если его можно будет получить из данных о собеседнике.`,
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
  }

  for (const dialog of manualControlDialogs) {
    const { id, accessHash, messages, managerMessage } = dialog;

    const recipientFull = await getFullUser(client, id, accessHash);
    if (!recipientFull) {
      console.error(`Chat with username ${id} not resolved, maybe banned`);
      return;
    }

    if (managerMessage) {
      const sentManagerMessage = await sendMessage(
        client,
        id,
        accessHash,
        managerMessage,
        account.accountId
      );

      messages.push({
        id: sentManagerMessage.id,
        text: managerMessage,
        fromId: String(meFullUser.id),
        date: Math.round(Date.now() / 1000),
      });
    }

    await saveRecipient(
      account.accountId,
      recipientFull,
      dialog,
      messages,
      "update",
      { managerMessage: null, viewed: false }
    );
  }
};
