import { bootstrap } from "global-agent";

export const getProxy = async (accountId: string) => {
  while (true) {
    try {
      const response = await fetch(
        `${process.env.BACKEND_URL}/proxy/${accountId}`
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
    }
  }
};

export const setupProxy = async (accountId: string) => {
  const { server, port, login, password } = await getProxy(accountId);

  process.env.GLOBAL_AGENT_HTTP_PROXY = `http://${login}:${password}@${server}:${port}`;

  bootstrap();
};
