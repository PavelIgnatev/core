import BigInt from 'big-integer';

import { invokeRequest } from '../../common/gramjs';
import TelegramClient from '../../common/gramjs/client/TelegramClient';
import GramJs from '../../common/gramjs/tl/api';

export const getFullUser = async (
  client: TelegramClient,
  userId: string,
  accessHash: string
) => {
  const fullUser = await invokeRequest(
    client,
    new GramJs.users.GetFullUser({
      id: new GramJs.InputPeerUser({
        userId: BigInt(userId),
        accessHash: BigInt(accessHash),
      }),
    })
  );

  return fullUser;
};
