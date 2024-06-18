import { sleep } from "../../helpers/sleep";

export const getFullAccount = async (accId: string) => {
  while (true) {
    try {
      const response = await fetch(
        `${process.env.BACKEND_URL}/accounts/${accId}`
      );

      if (!response.ok) {
        throw new Error(
          `Failed to retrieve account data for account #${accId}`
        );
      }

      const data = await response.json();
      return data;
    } catch (error: any) {
      console.error(`Get Account Date: ${error.message}`);

      await sleep(3000);
    }
  }
};
