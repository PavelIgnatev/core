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
import { saveErrorRecipient } from "../methods/recipients/saveErrorRecipient";
import { generateRandomString } from "../helpers/generateRandomString";
import { sendToBot } from "../helpers/sendToBot";

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

    const recipient = await getRecipient(account.accountId);
    let recipientUserId;
    console.log("User data before writing:", recipient);
    console.log(`Start sending messages to user ${recipient.username}`);

    try {
      const resolveMethod = recipient.username.includes("+")
        ? resolvePhone
        : resolveUsername;
      const userByUsername = await resolveMethod(client, recipient.username);
      const { id: userId, accessHash } = userByUsername?.users?.[0] ?? {};
      const recipientFull = await getFullUser(client, userId, accessHash);

      if (
        !userId ||
        !accessHash ||
        !recipientFull ||
        !(userByUsername?.users?.[0] instanceof GramJs.User)
      ) {
        console.error(
          `Chat with username ${recipient.username}:${userId} not resolved`
        );

        await saveErrorRecipient(recipient.username);
        return;
      }

      recipientUserId = userId;

      const {
        self,
        deleted,
        bot,
        support,
        contactRequirePremium,
        botBusiness,
      } = userByUsername.users[0];
      if (self) {
        return;
      }
      if (deleted || bot || support || contactRequirePremium || botBusiness) {
        await saveErrorRecipient(recipient.username);

        return;
      }

      const firstMessage = generateRandomString(
        recipient.offer.firstMessagePrompt
      );
      const secondMessage = generateRandomString(
        recipient.offer.secondMessagePrompt
      );
      console.log(
        `First Message: ${firstMessage}; Second Message: ${secondMessage}`
      );
      const sentFirstMessage = await sendMessage(
        client,
        userId,
        accessHash,
        firstMessage,
        account.accountId
      );
      const sentSecondMessage = await sendMessage(
        client,
        userId,
        accessHash,
        secondMessage,
        account.accountId
      );
      console.log(
        `Sending messages to user ${recipient.username}:${userId} was successful!`
      );
      await editFolder(client, userId, accessHash, 1);
      await muteNotification(client, userId, accessHash, 2147483647);
      console.log(
        `Added a chat with user ${recipient.username}:${userId} to the archive and muted`
      );
      await saveRecipient(
        account.accountId,
        recipientFull,
        recipient,
        [
          {
            id: sentFirstMessage.id || Math.floor(Math.random() * 9e5) + 1e5,
            text: firstMessage,
            fromId: String(meId),
            date: Math.round(Date.now() / 1000),
          },
          {
            id:
              sentSecondMessage.id ||
              (sentSecondMessage.id
                ? sentSecondMessage.id + 1
                : Math.floor(Math.random() * 9e5) + 1e5),
            text: secondMessage,
            fromId: String(meId),
            date: Math.round(Date.now() / 1000),
          },
        ],
        "create"
      );
    } catch (e: any) {
      if (e.message !== "PEER_FLOOD") {
        await sendToBot(
          `Username: ${recipient.username}; UserId: ${recipientUserId}; Error: ${e.message}`
        );

        await saveErrorRecipient(recipient.username);
      }

      throw new Error("Global Error");
    }
  }

  console.log(
    `AUTO SENDER: The next message to be sent will be ${remainingTime}`
  );
};
