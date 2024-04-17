import GramJs from "../telegram/tl/api";

import { getUnreadDialogs } from "../methods/dialogs/getUnreadDialogs";
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
  const unreadDialogs = await getUnreadDialogs(client, account);

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

    const currentStage = combinedMessages.filter(
      (m) => m.fromId === String(id)
    ).length;
    const userName = `${firstName} ${lastName}`
      .trim()
      .replace(/[^a-zA-Zа-яА-Я0-9\s]/g, "");
    const meName = converterName(meFirstName);

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
      },
    } = groupId || { offer: {} };

    let promptGoal = "";
    if (currentStage > 1) {
      promptGoal = `ЦЕЛЬ ДЛЯ '${meName}': ответить на последнее сообщениe пользователя '${userName}' c обязательным акцентом на привлечение внимания '${userName}' к предложению из 'ОПИСАНИЕ ПРЕДЛОЖЕНИЯ'.`;
    }
    if (currentStage === 2) {
      promptGoal = `ЦЕЛЬ ДЛЯ '${meName}': ответить на последнее сообщениe пользователя '${userName}'. ${goal}`;
    }

    const responseMessage = await makeRequestComplete(
      `
ТВОЕ ИМЯ: ${meName};
РОЛЬ '${meName}': ${aiRole};
ОПИСАНИЕ ПРЕДЛОЖЕНИЯ: ${companyDescription};
'''${promptGoal}'''
${combinedMessages
  .map((m) => `# ${m.fromId === String(id) ? userName : meName}: ${m.text}`)
  .join("\n")
  .slice(-4000)}
# ${meName}:`,
      currentStage === 1,
      true,
      currentStage <= 2 ? 2 : 1,
      currentStage === 2 ? part : null
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

    await saveRecipient(account.accountId, recipientFull, dialog, messages);
  }
};
