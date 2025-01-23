import BigInt from 'big-integer';

import TelegramClient from '../../../gramjs/client/TelegramClient';
import GramJs from '../../../gramjs/tl/api';
import { invokeRequest } from '../../modules/invokeRequest';

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
