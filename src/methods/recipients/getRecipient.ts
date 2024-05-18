export const getRecipient = async (accountId: string) => {
  while (true) {
    try {
      const response = await fetch(`${process.env.BACKEND_URL}/recipient`);
      const user = await response.json();

      console.log(
        `GET RECIPIENT: user data before writing: ${JSON.stringify(user)}`
      );

      if (
        user?.firstMessage &&
        user?.secondMessage &&
        user?.recipientUsername &&
        user?.groupId
      ) {
        return user;
      }
    } catch (error) {
      console.log(`Recipient User Error (${accountId}): ${error}`);
      await new Promise((res) => setTimeout(res, 1500));
    }
  }
};
