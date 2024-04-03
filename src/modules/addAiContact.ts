import { Account } from "../@types/Account";

import { resolveUsername } from "../methods/users/resolveUsername";
import { getRandomAiAccount } from "../methods/accounts/getRandomAiAccount";
import { updateAiAccount } from "../methods/accounts/updateAiAccount";
import { updateContact } from "../methods/contacts/updateContact";

export const addAiContact = async (account: Account) => {
  try {
    const aiContactCount = account.aiContactCount || 0;
    if (aiContactCount > 100) {
      return;
    }

    const currentTime = new Date();
    let aiRemainingTime = new Date(account.aiRemainingTime || currentTime);

    if (currentTime >= aiRemainingTime) {
      try {
        const { username } = await getRandomAiAccount(account.accountId);
        const userByUsername = await resolveUsername(username);
        const {
          id: userId,
          accessHash,
          firstName: userFirstName,
          lastName: userLastName,
          phone: userPhone,
        } = userByUsername?.users?.[0] ?? {};

        if (!userId || !accessHash) {
          console.error(
            `AI: Chat with username ${username}:${userId} not resolved`
          );
          return;
        }

        await updateContact(
          userId,
          accessHash,
          userFirstName,
          userLastName,
          userPhone
        );
        console.log(`AI: Added user ${username}:${userId} to the contact`);

        const currentTime = new Date();
        const futureTime = new Date(
          currentTime.getTime() +
            Math.floor(Math.random() * (3600000 * 2 - 7200000 + 1)) +
            3600000
        );
        await updateAiAccount(account.accountId, {
          aiContactCount: aiContactCount + 1,
          aiRemainingTime: String(futureTime),
        });
      } catch (error) {
        console.log(`Error when sending a message to a user: ${error}`);
      }
      return;
    }

    console.log(
      `ADD AI CONTACT: The next addition of a random bot to contacts will be in ${aiRemainingTime}`
    );
  } catch (error) {
    console.error(`Auto sender error: ${error}`);
  }
};
