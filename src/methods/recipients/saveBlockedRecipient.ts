import { sendToBot } from "../../helpers/sendToBot";

const blockedData = {
  blocked: true,
  stopped: true,
  viewed: false,
  managerMessage: null,
  status: "mini-update",
};

export const saveBlockedRecipient = async (
  accountId: string,
  recipientId: string
) => {
  await sendToBot(
    `Блокировка пользователем (возможно и администратором) на аккаунте ${accountId}:${recipientId}`
  );

  console.log("Data before saving:", blockedData);

  try {
    const response = await fetch(`${process.env.RECIPIENT_URL}`, {
      method: "POST",
      body: JSON.stringify({ accountId, recipientId, ...blockedData }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.ok) {
      console.log(
        `Saved information about the user ${accountId}:${recipientId} in the database!`
      );
    } else {
      console.log(
        `Information about the user ${accountId}:${recipientId} was not saved in the database, status code: ${response.status}!`
      );
    }
  } catch (error) {
    console.error("Error occurred while saving recipient:", error);
  }
};
