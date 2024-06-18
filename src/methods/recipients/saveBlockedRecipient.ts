const blockedData = {
  blocked: true,
  stopped: true,
  viewed: false,
  managerMessage: null,
  status: "mini-update",
};

export const saveBlockedRecipient = async (
  accountId: string,
  recipientId: string,
  reason: string
) => {
  console.log("Data before saving:", blockedData);

  while (true) {
    try {
      const response = await fetch(`${process.env.RECIPIENT_URL}`, {
        method: "POST",
        body: JSON.stringify({
          accountId,
          recipientId,
          reason,
          ...blockedData,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        console.log(
          `Saved information about the user ${accountId}:${recipientId} in the database!`
        );
        return
      } else {
        console.log(
          `Information about the user ${accountId}:${recipientId} was not saved in the database, status code: ${response.status}!`
        );
      }
    } catch (error) {
      console.error("Error occurred while saving recipient (0):", error);
    }
  }
};
