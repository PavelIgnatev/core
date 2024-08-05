import BigInt from 'big-integer';
import { blue } from 'colors/safe';

import GramJs from '../../common/gramjs/tl/api';

export const getFullUser = async (
  client: any,
  accountId: string,
  userId: string,
  accessHash: string
) => {
  if (!userId || !accessHash) {
    return null;
  }

  console.log(
    `[${accountId}] Get full user information by ${blue(
      `${userId}:${accessHash}`
    )}`
  );

  const userFull = await client.invoke(
    new GramJs.users.GetFullUser({
      id: new GramJs.InputPeerUser({
        userId: BigInt(userId),
        accessHash: BigInt(accessHash),
      }),
    })
  );

  return userFull;
};
