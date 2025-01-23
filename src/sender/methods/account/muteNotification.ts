import BigInt from 'big-integer';

import TelegramClient from '../../../gramjs/client/TelegramClient';
import GramJs from '../../../gramjs/tl/api';
import { invokeRequest } from '../../modules/invokeRequest';

export const muteNotification = async (
  client: TelegramClient,
  id: string,
  accessHash: string,
  muteUntil: number = 2147483647
) => {
  const muteInvoke = await invokeRequest(
    client,
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
