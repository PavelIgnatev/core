export const saveMiniRecipient = async (
  accountId: string,
  recipientId: string,
  data: Record<string, unknown> = {}
) => {
  console.log("Data before saving:", data);

  try {
    const response = await fetch(`${process.env.RECIPIENT_URL}`, {
      method: "POST",
      body: JSON.stringify({ accountId, recipientId, ...data }),
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
