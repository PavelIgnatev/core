import BigInt from 'big-integer';

import GramJs from '../../common/gramjs/tl/api';

export const deleteMessages = async (
  client: any,
  userId: string,
  accessHash: string
) => {
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
