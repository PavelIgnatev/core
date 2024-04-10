export const getDialogFromDb = async (
  accountId: string,
  recipientId: string
) => {
  while (true) {
    try {
      const response = await fetch(
        `${process.env.BACKEND_URL}/dialogues/${accountId}/${recipientId}`
      );
      if (!response.ok) {
        throw new Error(
          `Failed to retrieve dialog data for account #${accountId}/${recipientId}`
        );
      }

      try {
        const data = await response.json();

        return data;
      } catch {
        return null;
      }
    } catch (error) {
      console.error(error);
      await new Promise((res) => setTimeout(res, 1500));
    }
  }
};
