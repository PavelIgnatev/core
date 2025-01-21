import BigInt from 'big-integer';

import { invokeRequest } from '../../modules/invokeRequest';
import TelegramClient from '../../common/gramjs/client/TelegramClient';
import GramJs from '../../common/gramjs/tl/api';

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
