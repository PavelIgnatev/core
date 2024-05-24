import GramJs from "../../gramjs/tl/api";

import { Dialogue } from "../../@types/Dialogue";
import { getCombinedMessages } from "../../helpers/getCombinedMessages";

export const saveRecipient = async (
  accountId: string,
  recipient: GramJs.users.UserFull,
  recipientDb: Dialogue,
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

  const { groupId, recipientUsername, recipientPhone } = recipientDb;

  const data = {
    groupId,
    accountId,
    recipientId: String(recipientId),
    recipientUsername: (username || recipientUsername || "").toLowerCase(),
    recipientTitle: `${firstName} ${lastName}`.trim(),
    recipientBio: about,
    recipientPhone: phone || recipientPhone || null,
    messages: messages,
    step: getCombinedMessages(messages).length,
    status,
    ...addedData,
  };

  console.log("Data before saving:", data);

  try {
    const response = await fetch(`${process.env.RECIPIENT_URL}`, {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.ok) {
      console.log(
        `Saved information about the user ${data.recipientUsername} in the database!`
      );
    } else {
      console.log(
        `Information about the user ${data.recipientUsername} was not saved in the database, status code: ${response.status}!`
      );
    }
  } catch (error) {
    console.error("Error occurred while saving recipient:", error);
  }
};
