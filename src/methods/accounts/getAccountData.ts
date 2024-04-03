export const getAccountData = async (accId: string) => {
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
    } catch (error) {
      console.error(error);
      await new Promise((res) => setTimeout(res, 1500));
    }
  }
};
