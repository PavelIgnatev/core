import BigInt from "big-integer";

import { blue, red, yellow } from "colors/safe";

import GramJs from "../common/gramjs/tl/api";

import { checkSpamBlock } from "./checkSpamBlock";

import { updateAccountById } from "../db/accounts";

import { generateRandomString } from "../helpers/generateRandomString";
import { sendToBot } from "../helpers/sendToBot";

import { sendMessage } from "../methods/messages/sendMessage";
import { editFolder } from "../methods/folders/editFolder";
import { getRecipient } from "../methods/recipients/getRecipient";
import { saveRecipient } from "./saveRecipient";
import { resolvePhone } from "../methods/contacts/resolvePhone";
import { getFullUser } from "../methods/users/getFullUser";
import { muteNotification } from "../methods/account/muteNotification";
import { updateFailedMessage } from "../db/messages";
import TelegramClient from "../common/gramjs/client/TelegramClient";
import { resolveUsername } from "../methods/contacts/resolveUsername";

const removeSpaces = (str: string) => {
  return str.replace(/\s+/g, "").toLowerCase();
};

export const generateRandomTime = () => {
  const minTime = 360000;
  const maxTime = 3600000;

  const randomTime =
    Math.floor(Math.random() * (maxTime - minTime + 1)) + minTime;
  const currentTime = new Date();
  const futureTime = new Date(currentTime.getTime() + randomTime);
  return futureTime;
};

export const resolveUser = async (
  client: TelegramClient,
  accountId: string,
  recipient: Record<string, string | number>
) => {
  const resolveMethod = String(recipient.username).includes("+")
    ? resolvePhone
    : resolveUsername;
  const userByUsername = await resolveMethod(
    client,
    accountId,
    String(recipient.username)
  );
  const { id: userId, accessHash } = userByUsername?.users?.[0] ?? {};
  const recipientFull = await getFullUser(
    client,
    accountId,
    userId,
    accessHash
  );

  if (
    !userId ||
    !accessHash ||
    !recipientFull ||
    !(userByUsername?.users?.[0] instanceof GramJs.User)
  ) {
    console.log(
      red(
        `[${accountId}] Chat with username ${recipient.username}:${userId} not resolved`
      )
    );

    await updateFailedMessage(String(recipient.username));
    return;
  }

  return recipientFull;
};

export const autoSender = async (
  client: any,
  accountId: string,
  tgAccountId: string,
  tgRmainingTime: string | null
) => {
  console.log(`[${accountId}] Initialize module`, yellow("AUTO SENDER"));

  if (!tgRmainingTime) {
    const remainingTime = generateRandomTime();
    await updateAccountById(accountId, {
      remainingTime,
    });

    console.log(
      `[${accountId}] Remaining time not defined, new remaining time:`,
      blue(String(remainingTime))
    );

    return;
  }

  const currentTime = new Date();
  let remainingTime = new Date(tgRmainingTime || currentTime);

  if (currentTime >= remainingTime) {
    const spamBlockDate = await checkSpamBlock(client, accountId);
    if (spamBlockDate) {
      return;
    }

    const recipient = await getRecipient(accountId);

    try {
      const recipientFull = await resolveUser(client, accountId, recipient);

      const {
        id,
        accessHash,
        self,
        deleted,
        bot,
        support,
        contactRequirePremium,
        botBusiness,
      } = recipientFull.users[0];
      if (self) {
        return;
      }
      if (deleted || bot || support || contactRequirePremium || botBusiness) {
        await updateFailedMessage(recipient.username);

        return;
      }

      const firstMessage = generateRandomString(recipient.firstMessagePrompt);
      const secondMessage = generateRandomString(recipient.secondMessagePrompt);
      const sentFirstMessage = await sendMessage(
        client,
        id,
        accessHash,
        firstMessage,
        accountId
      );
      const sentSecondMessage = await sendMessage(
        client,
        id,
        accessHash,
        secondMessage,
        accountId
      );

      await editFolder(client, accountId, id, accessHash, 1);
      await muteNotification(client, accountId, id, accessHash, 2147483647);
      const allHistory = await client.invoke(
        new GramJs.messages.GetHistory({
          peer: new GramJs.InputPeerUser({
            userId: BigInt(id),
            accessHash: BigInt(accessHash),
          }),
        })
      );
      const messages = (allHistory.messages || [])
        .filter((m: GramJs.Message) => m.className === "Message")
        .reverse();
      const isSame =
        messages.length === 2 &&
        removeSpaces(messages[0].message) === removeSpaces(firstMessage) &&
        removeSpaces(messages[1].message) === removeSpaces(secondMessage);
      const fullRecipient = await resolveUser(client, accountId, recipient);
      const fullUser = fullRecipient.users[0];
      const isBlocked =
        messages.length === 0 ||
        !fullUser.status ||
        fullUser.status instanceof GramJs.UserStatusEmpty;

      if (!isBlocked && !isSame) {
        await sendToBot(`!!!ОТПРАВКА НЕ БЫЛА ЯВНО ЗАФИКСИРОВАНА!!!
Group ID: ${recipient.groupId}
Account ID: ${accountId}
User ID: ${id}
First Message: ${firstMessage}
Second Message: ${secondMessage}
Messages: ${JSON.stringify(messages)}
Real first message: ${messages?.[0]?.message}
Real second message: ${messages?.[1]?.message}`);
      }

      await saveRecipient(
        accountId,
        recipientFull,
        recipient,
        [
          {
            id: sentFirstMessage.id || Math.floor(Math.random() * 9e5) + 1e5,
            text: firstMessage,
            fromId: String(tgAccountId),
            date: Math.round(Date.now() / 1000),
          },
          {
            id:
              sentSecondMessage.id ||
              (sentSecondMessage.id
                ? sentSecondMessage.id + 1
                : Math.floor(Math.random() * 9e5) + 1e5),
            text: secondMessage,
            fromId: String(tgAccountId),
            date: Math.round(Date.now() / 1000),
          },
        ],
        "create"
      );
    } catch (e: any) {
      if (
        ![
          "PEER_FLOOD",
          "PHONE_NOT_OCCUPIED",
          "USERNAME_NOT_OCCUPIED",
          "USERNAME_INVALID",
        ].includes(e.message)
      ) {
        await sendToBot(`Username: ${recipient.username}; Error: ${e.message}`);
      }

      if (!e.message.includes("PEER_FLOOD")) {
        await updateFailedMessage(recipient.username);
      }

      throw new Error("Global Error");
    }
  } else {
    console.log(
      `[${accountId}] Next message can be sent after`,
      blue(String(remainingTime.toLocaleString()))
    );
  }
};
