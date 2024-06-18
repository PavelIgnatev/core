import { sleep } from "../../helpers/sleep";

export const getPingDialogsDB = async (accountId: string) => {
  while (true) {
    try {
      const response = await fetch(
        `${process.env.BACKEND_URL}/dialogues/ping/${accountId}`
      );
      if (!response.ok) {
        throw new Error(
          `Failed to retrieve ping dialogs data for account #${accountId}`
        );
      }

      try {
        const data = await response.json();

        return data;
      } catch {
        return [];
      }
    } catch (error: any) {
      console.log(`Get Ping Dialogs Error: ${error.message}`);

      await sleep(3000);
    }
  }
};
