import BigInt from "big-integer";

import GramJs from "../../telegram/tl/api";
import { invokeRequest } from "../../telegram";

export const sendMessage = async (
  userId: string,
  accessHash: string,
  message: string
) => {
  const sentMessage = await invokeRequest(
    new GramJs.messages.SendMessage({
      message,
      clearDraft: true,
      peer: new GramJs.InputPeerUser({
        userId: BigInt(userId),
        accessHash: BigInt(accessHash),
      }),
      randomId: BigInt(Math.floor(Math.random() * 10 ** 10) + 10 ** 10),
    })
  );

  return sentMessage
};
