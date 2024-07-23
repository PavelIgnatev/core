import { blue } from "colors/safe";

import GramJs from "../../common/gramjs/tl/api";

export const setOffline = async (
  client: any,
  accountId: string,
  offline: boolean
) => {
  console.log(
    `[${accountId}] Set account status to`, blue(offline ? "offline" : "online")
  );

  const result = await client.invoke(
    new GramJs.account.UpdateStatus({
      offline,
    })
  );

  return result;
};
