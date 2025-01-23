import BigInt from 'big-integer';

import TelegramClient from '../../../gramjs/client/TelegramClient';
import GramJs from '../../../gramjs/tl/api';
import { invokeRequest } from '../../modules/invokeRequest';

export const readHistory = async (
  client: TelegramClient,
  id: string,
  accessHash: string,
  maxId: number
) => {
  await invokeRequest(
    client,
    new GramJs.messages.ReadHistory({
      peer: new GramJs.InputPeerUser({
        userId: BigInt(id),
        accessHash: BigInt(accessHash),
      }),
      maxId,
    })
  );
};
