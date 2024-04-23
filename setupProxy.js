const getAccountsIds = async () => {
  try {
    const response = await fetch(`http://localhost:5050/accounts/ids`);
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

const getProxy = async (accountId) => {
    while (true) {
      try {
        const response = await fetch(
          `http://localhost:5050/proxy/${accountId}`
        );
        const proxy = await response.json();
  
        if (
          proxy &&
          proxy?.server &&
          proxy?.port &&
          proxy?.login &&
          proxy?.password
        ) {
          return proxy;
        } else {
          console.log("Proxy for account not found");
          await new Promise((res) => setTimeout(res, 10000));
        }
      } catch (error) {
        console.log(`Proxy Error: ${error}`);
        await new Promise((res) => setTimeout(res, 1500));
      }
    }
  };
  

(async () => {
  const ids = await getAccountsIds()

  for(const id of ids) {

    const proxy = await getProxy(id)
    console.log(proxy)
  }
})();
