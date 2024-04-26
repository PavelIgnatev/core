import BigInt from "big-integer";

import GramJs from "../../gramjs/tl/api";

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

  return userFull;
};
