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

type Message = { id: number; text: string; fromId: string; date: number };

const getCombinedMessages = (messages: Message[]) => {
  const combinedMessages = [];
  for (let i = 0; i < messages.length; i++) {
    const curr = { ...messages[i] };
    if (combinedMessages.length > 0) {
      const lastItem = combinedMessages[combinedMessages.length - 1];
      if (lastItem.fromId === curr.fromId) {
        lastItem.text += "." + curr.text;
      } else {
        combinedMessages.push(curr);
      }
    } else {
      combinedMessages.push(curr);
    }
  }
  return combinedMessages;
};

export const autoResponse = async (
  client: any,
  account: Account,
  meFullUser: GramJs.User
) => {
  const [unreadDialogs, pingedDialogs] = await getDialogs(client, account);

  for (const dialog of unreadDialogs) {
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
      .slice(-9);
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
      promptGoal = `Ответить на последнее сообщениe пользователя '${userName}', с акцентом, направленным на привлечение внимания '${userName}' к описанному выше предложению.`;
    }
    if (currentStage >= 2) {
      promptGoal = `Ответить на последнее сообщениe пользователя '${userName}'. ${goal}`;
    }

    const responseMessage = await makeRequestComplete(
      `
## Context
Вы - '${meName}' (мужчина). Вы ранее инициировали общение с собеседником '${userName}' в мессенджере Telegram с целью предложить услугу компании, сотрудником которой вы являетесь. Вы - ${aiRole}. ${companyDescription}. Контакт собеседника '${userName}' был найден в одном из чатов Telegram, точной информации в каком именно нету.;
## Style Guide
${styleGuide}

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

  // for (const dialog of pingedDialogs) {
  //   const { id, accessHash, messages, groupId: dialogGroupId } = dialog;
  //   const groupId = await getGroupId(dialogGroupId);
  //   const combinedMessages = getCombinedMessages(messages);

  //   const currentStage = combinedMessages.filter(
  //     (m) => m.fromId === String(id)
  //   ).length;

  //   // if (currentStage !== 2) {
  //   //   continue;
  //   // }

  //   const recipientFull = await getFullUser(client, id, accessHash);
  //   if (!recipientFull) {
  //     console.error(`Chat with username ${id} not resolved`);
  //     return;
  //   }

  //   const {
  //     offer: { ping = "хуеглот епта" },
  //   } = groupId || { offer: {} };

  //   const sentPingMessage = await sendMessage(
  //     client,
  //     id,
  //     accessHash,
  //     ping,
  //     account.accountId
  //   );

  //   messages.push({
  //     id: sentPingMessage.id,
  //     text: ping,
  //     fromId: String(meFullUser.id),
  //     date: Math.round(Date.now() / 1000),
  //   });

  //   await saveRecipient(
  //     account.accountId,
  //     recipientFull,
  //     dialog,
  //     messages,
  //     "update"
  //   );
  // }
};
