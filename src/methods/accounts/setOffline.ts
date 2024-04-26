import GramJs from "../../gramjs/tl/api";

export const setOffline = async (client: any, offline: boolean) => {
  const result = await client.invoke(
    new GramJs.account.UpdateStatus({
      offline,
    })
  );

  return result;
};
