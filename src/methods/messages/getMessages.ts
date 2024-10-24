import BigInt from 'big-integer';

import GramJs from '../../common/gramjs/tl/api';

export const getMessages = async (
  client: any,
  userId: string,
  accessHash: string,
  minId?: number
) => {
  const allHistory = await client.invoke(
    new GramJs.messages.GetHistory({
      peer: new GramJs.InputPeerUser({
        userId: BigInt(userId),
        accessHash: BigInt(accessHash),
      }),

      minId,
    })
  );

  return (allHistory.messages || []).filter(
    (m: GramJs.Message) => m.className === 'Message'
  );
};
