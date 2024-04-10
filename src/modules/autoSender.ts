import GramJs from "../telegram/tl/api";

import { Account } from "../@types/Account";

import { checkSpamBlock } from "./checkSpamBlock";

import { sendMessage } from "../methods/messages/sendMessage";
import { editFolder } from "../methods/folders/editFolder";
import { getRecipient } from "../methods/recipients/getRecipient";
import { saveRecipient } from "../methods/recipients/saveRecipient";
import { resolveUsername } from "../methods/users/resolveUsername";
import { resolvePhone } from "../methods/users/resolvePhone";
import { getFullUser } from "../methods/users/getFullUser";

export const autoSender = async (account: Account, meId: string) => {
  try {
    const currentTime = new Date();
    let remainingTime = new Date(account.remainingTime || currentTime);

    if (currentTime >= remainingTime) {
      const spamBlockDate = await checkSpamBlock(account.accountId);
      if (spamBlockDate) {
        return;
      }

      try {
        const recipient = await getRecipient();
        console.log("Generated data to send:", recipient);
        console.log(
          `Start sending messages to user ${recipient.recipientUsername}`
        );

        const resolveMethod = recipient.recipientUsername.includes("+")
          ? resolvePhone
          : resolveUsername;
        const userByUsername = await resolveMethod(recipient.recipientUsername);
        const { id: userId, accessHash } = userByUsername?.users?.[0] ?? {};
        const recipientFull = await getFullUser(userId, accessHash);

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

        const sentFirstMessage = await sendMessage(
          userId,
          accessHash,
          recipient.firstMessage,
          account.accountId
        );
        const sentSecondMessage = await sendMessage(
          userId,
          accessHash,
          recipient.secondMessage,
          account.accountId
        );
        console.log(
          `Sending messages to user ${recipient.recipientUsername}:${userId} was successful!`
        );
        await editFolder(userId, accessHash, 1);
        console.log(
          `Added a chat with user ${recipient.recipientUsername}:${userId} to the archive`
        );

        await saveRecipient(account.accountId, recipientFull, recipient, [
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
        ]);
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
