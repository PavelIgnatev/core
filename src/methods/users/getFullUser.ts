import BigInt from "big-integer";

import GramJs from "../../telegram/tl/api";
import { invokeRequest } from "../../telegram";

export const getFullUser = async (userId: string, accessHash: string) => {
  if (!userId || !accessHash) {
    return null;
  }

  const userFull = await invokeRequest(
    new GramJs.users.GetFullUser({
      id: new GramJs.InputPeerUser({
        userId: BigInt(userId),
        accessHash: BigInt(accessHash),
      }),
    })
  );

  return userFull;
};
