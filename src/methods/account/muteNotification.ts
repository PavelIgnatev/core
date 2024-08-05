import BigInt from 'big-integer';
import { blue } from 'colors/safe';

import GramJs from '../../common/gramjs/tl/api';

export const muteNotification = async (
  client: any,
  accountId: string,
  id: string,
  accessHash: string,
  muteUntil: number = 2147483647
) => {
  console.log(
    `[${accountId}] Mute notifications in account ${blue(
      `${id}:${accessHash}`
    )}`
  );

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
