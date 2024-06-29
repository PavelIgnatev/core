import GramJs from "../common/gramjs/tl/api";

import { Dialogue } from "../@types/Dialogue";

import { getCombinedMessages } from "../helpers/getCombinedMessages";
import { sleep } from "../helpers/sleep";

import { updateDialogue } from "../db/dialogues";
import { incrementMessageCount, updateAccountById } from "../db/accounts";
import { incrementCurrentCount } from "../db/groupId";

export const saveRecipient = async (
  accountId: string,
  recipient: GramJs.users.UserFull,
  recipientDb: Dialogue & { username?: string },
  messages: { id: number; text: string; fromId: string; date: number }[],
  status: "create" | "update",
  addedData: Record<string, unknown> = {}
) => {
  const {
    id: recipientId,
    phone,
    username,
    firstName,
    lastName = "",
  } = recipient["users"][0] as GramJs.User;
  const {
    fullUser: { about },
  } = recipient;

  const {
    groupId,
    recipientUsername,
    username: varSecondUsername,
    recipientPhone,
  } = recipientDb;

  const data = {
    groupId,
    accountId,
    recipientId: String(recipientId),
    recipientUsername: (
      username ||
      recipientUsername ||
      varSecondUsername ||
      ""
    ).toLowerCase(),
    recipientTitle: `${firstName} ${lastName}`.trim(),
    recipientBio: about || "",
    recipientPhone: phone || recipientPhone || null,
    messages: messages,
    step: getCombinedMessages(messages).length,
    ...addedData,
  };

  console.log("Data before saving:", data);

  while (true) {
    try {
      await updateDialogue(data);
      await updateAccountById(accountId, {
        remainingTime: new Date(new Date().getTime() + 21600000),
      });

      if (status === "create") {
        await incrementMessageCount(accountId);
        await incrementCurrentCount(groupId);
      }
      break;
    } catch (error: any) {
      console.error(
        "Error occurred while saving recipient (2):",
        error.message
      );

      await sleep(3000);
    }
  }
};
