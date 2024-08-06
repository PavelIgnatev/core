import BigInt from 'big-integer';
import { blue } from 'colors/safe';

import GramJs from '../../common/gramjs/tl/api';

export const deleteMessages = async (
  client: any,
  accountId: string,
  userId: string,
  accessHash: string
) => {
  console.log(
    `[${accountId}] Delete messages by`,
    blue(`${userId}:${accessHash}`)
  );

  await client.invoke(
    new GramJs.messages.DeleteHistory({
      peer: new GramJs.InputPeerUser({
        userId: BigInt(userId),
        accessHash: BigInt(accessHash),
      }),
      revoke: true,
    })
  );
};
