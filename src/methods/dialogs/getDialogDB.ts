import { sleep } from "../../helpers/sleep";

export const getDialogDB = async (accountId: string, recipientId: string) => {
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
        return [];
      }
    } catch (error: any) {
      console.log(`Get Dialogs Error: ${error.message}`);

      await sleep(3000);
    }
  }
};
