export const getGroupId = async (groupId: string) => {
  while (true) {
    try {
      const response = await fetch(
        `${process.env.BACKEND_URL}/groupId/${groupId}`
      );

      if (!response.ok) {
        throw new Error(`Failed to retrieve data for groupId #${groupId}`);
      }

      const data = await response.json();
      return data;
    } catch (error: any) {
      console.log(`Get GroupId Error: ${error.message}`);

      await new Promise((res) => setTimeout(res, 1500));
    }
  }
};
