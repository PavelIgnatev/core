import BigInt from 'big-integer';

import GramJs from '../../common/gramjs/tl/api';
import { sendToBot } from '../../helpers/sendToBot';

export const getFullUser = async (
  client: any,
  userId: string,
  accessHash: string
) => {
  if (!userId || !accessHash) {
    return null;
  }

  const userFull = await client.invoke(
    new GramJs.users.GetFullUser({
      id: new GramJs.InputPeerUser({
        userId: BigInt(userId),
        accessHash: BigInt(accessHash),
      }),
    })
  );

  if (!userFull) {
    await sendToBot(`** USER FULL NOT DEFINED **
ID: ${userId}
RID: ${accessHash}`);
  }

  return userFull;
};
