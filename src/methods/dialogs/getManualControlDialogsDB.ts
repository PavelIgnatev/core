import { sleep } from "../../helpers/sleep";

export const getManualControlDialogsDB = async (accountId: string) => {
  while (true) {
    try {
      const response = await fetch(
        `${process.env.BACKEND_URL}/dialogues/manual-control/${accountId}`
      );
      if (!response.ok) {
        throw new Error(
          `Failed to retrieve manual control dialogs data for account #${accountId}`
        );
      }

      try {
        const data = await response.json();

        return data;
      } catch {
        return [];
      }
    } catch (error: any) {
      console.log(`Get Manul Dialogs Error: ${error.message}`);

      await sleep(3000);
    }
  }
};
