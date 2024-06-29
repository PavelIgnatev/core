import BigInt from "big-integer";

import GramJs from "../../common/gramjs/tl/api";

export const muteNotification = async (
  client: any,
  id: string,
  accessHash: string,
  muteUntil: number = 2147483647
) => {
  const muteInvoke = await client.invoke(
    new GramJs.account.UpdateNotifySettings({
      peer: new GramJs.InputNotifyPeer({
        peer: new GramJs.InputPeerUser({
          userId: BigInt(id),
          accessHash: BigInt(accessHash),
        }),
      }),
      settings: new GramJs.InputPeerNotifySettings({ muteUntil }),
    })
  );

  return muteInvoke;
};
