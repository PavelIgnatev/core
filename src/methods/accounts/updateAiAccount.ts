import { sleep } from "../../helpers/sleep";

export const updateAiAccount = async (
  accountId: string,
  updatedData: Record<string, unknown>
) => {
  while (true) {
    try {
      const response = await fetch(
        `${process.env.BACKEND_URL}/accounts/${accountId}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedData),
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      return;
    } catch (error: any) {
      console.log(`Update Ai Account: ${error.message}`);

      await sleep(3000);
    }
  }
};
