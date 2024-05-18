import GramJs from "../gramjs/tl/api";

import { Account } from "../@types/Account";

import { checkSpamBlock } from "./checkSpamBlock";

import { sendMessage } from "../methods/messages/sendMessage";
import { editFolder } from "../methods/folders/editFolder";
import { getRecipient } from "../methods/recipients/getRecipient";
import { saveRecipient } from "../methods/recipients/saveRecipient";
import { resolveUsername } from "../methods/users/resolveUsername";
import { resolvePhone } from "../methods/users/resolvePhone";
import { getFullUser } from "../methods/users/getFullUser";
import { updateAiAccount } from "../methods/accounts/updateAiAccount";
import { muteNotification } from "../methods/notifications/muteNotification";

export const generateRandomTime = () => {
  const minTime = 3600000 * 0.1;
  const maxTime = 3600000 * 1;

  const randomTime =
    Math.floor(Math.random() * (maxTime - minTime + 1)) + minTime;
  const currentTime = new Date();
  const futureTime = new Date(currentTime.getTime() + randomTime);
  return futureTime;
};

export const autoSender = async (
  client: any,
  account: Account,
  meId: string
) => {
  try {
    if (!account.remainingTime) {
      const remainingTime = generateRandomTime();
      await updateAiAccount(account.accountId, {
        remainingTime,
      });
      console.log(
        `Remaing time not defined, new remaining time - ${remainingTime}`
      );
      return;
    }

    const currentTime = new Date();
    let remainingTime = new Date(account.remainingTime || currentTime);

    if (currentTime >= remainingTime) {
      const spamBlockDate = await checkSpamBlock(client, account.accountId);
      if (spamBlockDate) {
        return;
      }

      try {
        const recipient = await getRecipient(account.accountId);
        console.log("Generated data to send:", recipient);
        console.log(
          `Start sending messages to user ${recipient.recipientUsername}`
        );

        const resolveMethod = recipient.recipientUsername.includes("+")
          ? resolvePhone
          : resolveUsername;
        const userByUsername = await resolveMethod(
          client,
          recipient.recipientUsername
        );
        const { id: userId, accessHash } = userByUsername?.users?.[0] ?? {};
        const recipientFull = await getFullUser(client, userId, accessHash);

        if (
          !userId ||
          !accessHash ||
          !recipientFull ||
          !(userByUsername?.users?.[0] instanceof GramJs.User)
        ) {
          console.error(
            `Chat with username ${recipient.recipientUsername}:${userId} not resolved`
          );
          return;
        }

        const { self, deleted, bot, support } = userByUsername.users[0];
        if (self || deleted || bot || support) {
          return;
        }

        const sentFirstMessage = await sendMessage(
          client,
          userId,
          accessHash,
          recipient.firstMessage,
          account.accountId
        );
        const sentSecondMessage = await sendMessage(
          client,
          userId,
          accessHash,
          recipient.secondMessage,
          account.accountId
        );
        console.log(
          `Sending messages to user ${recipient.recipientUsername}:${userId} was successful!`
        );
        await editFolder(client, userId, accessHash, 1);
        await muteNotification(client, userId, accessHash, 2147483647);
        console.log(
          `Added a chat with user ${recipient.recipientUsername}:${userId} to the archive and muted`
        );

        await saveRecipient(
          account.accountId,
          recipientFull,
          recipient,
          [
            {
              id: sentFirstMessage.id,
              text: recipient.firstMessage,
              fromId: String(meId),
              date: Math.round(Date.now() / 1000),
            },
            {
              id: sentSecondMessage.id,
              text: recipient.secondMessage,
              fromId: String(meId),
              date: Math.round(Date.now() / 1000),
            },
          ],
          "create"
        );
      } catch (error) {
        console.log(`Error when sending a message to a user: ${error}`);
      }
      return;
    }

    console.log(
      `AUTO SENDER: The next message to be sent will be ${remainingTime}`
    );
  } catch (error) {
    console.error(`Auto sender error: ${error}`);
  }
};
