import BigInt from "big-integer";

import GramJs from "../../telegram/tl/api";
import { invokeRequest } from "../../telegram";

export const getMessages = async (
  userId: string,
  accessHash: string,
  minId?: number
) => {
  const { messages } = await invokeRequest(
    new GramJs.messages.GetHistory({
      peer: new GramJs.InputPeerUser({
        userId: BigInt(userId),
        accessHash: BigInt(accessHash),
      }),

      minId,
    })
  );

  return messages;
};
