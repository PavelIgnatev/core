export const saveErrorRecipient = async (username: string) => {
  try {
    const response = await fetch(`${process.env.RECIPIENT_URL}`, {
      method: "POST",
      body: JSON.stringify({ username, status: "error" }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.ok) {
      console.log(
        `Saved error information about the user ${username} in the database!`
      );
    } else {
      console.log(
        `Error Information about the user ${username} was not saved in the database, status code: ${response.status}!`
      );
    }
  } catch (error) {
    console.error("Error occurred while saving recipient:", error);
  }
};
