export const getRandomAiAccount = async (accountId: string) => {
  try {
    const response = await fetch(
      `${process.env.BACKEND_URL}/accounts/${accountId}/random`
    );

    if (!response.ok) {
      throw new Error("Failed to retrieve random account data");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    return null;
  }
};
