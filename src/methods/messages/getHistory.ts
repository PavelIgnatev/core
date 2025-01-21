import BigInt from 'big-integer';

import { invokeRequest } from '../../modules/invokeRequest';
import TelegramClient from '../../common/gramjs/client/TelegramClient';
import GramJs from '../../common/gramjs/tl/api';

export const getHistory = async (
  client: TelegramClient,
  userId: string,
  accessHash: string,
  minId?: number
) => {
  const history = await invokeRequest(
    client,
    new GramJs.messages.GetHistory({
      peer: new GramJs.InputPeerUser({
        userId: BigInt(userId),
        accessHash: BigInt(accessHash),
      }),

      minId,
    })
  );

  if (!history || history instanceof GramJs.messages.MessagesNotModified) {
    return [];
  }

  return history.messages.filter((m) => m instanceof GramJs.Message);
};
