export const getAccountsIds = async () => {
  try {
    const response = await fetch(`${process.env.BACKEND_URL}/accounts/ids`);
    if (!response.ok) {
      throw new Error(`Failed to retrieve accounts: ${response.statusText}`);
    }
    const accounts = await response.json();
    console.log(accounts);
    return accounts;
  } catch (error) {
    console.error(`Failed to retrieve accounts: ${error}`);
    return [];
  }
};
