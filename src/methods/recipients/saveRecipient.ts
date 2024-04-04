import GramJs from "../../telegram/tl/api";

import { Dialogue } from "../../@types/Dialogue";

export const saveRecipient = async (
  meId: string,
  accountId: string,
  recipient: GramJs.users.UserFull,
  recipientDb: Dialogue,
  messages: { id: number; text: string; fromId: string; date: number }[]
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
    meId: String(meId),
    recipientId: String(recipientId),
    recipientUsername: (username || recipientUsername || "").toLowerCase(),
    recipientTitle: `${firstName} ${lastName}`.trim(),
    recipientBio: about,
    recipientPhone: phone || recipientPhone || null,
    messages: messages,
  };

  console.log("Data before saving:", data);

  try {
    const response = await fetch(`${process.env.BACKEND_URL}/recipient`, {
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
