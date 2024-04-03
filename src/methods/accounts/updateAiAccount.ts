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
    } catch (error) {
      console.log(`Update Ai Account: ${error}`);
      await new Promise((res) => setTimeout(res, 1500));
    }
  }
};
