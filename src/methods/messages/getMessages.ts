import BigInt from "big-integer";
import { blue } from "colors/safe";

import GramJs from "../../common/gramjs/tl/api";

export const getMessages = async (
  client: any,
  accountId: string,
  userId: string,
  accessHash: string,
  minId?: number
) => {
  console.log(
    `[${accountId}] Get history by`,
    blue(`${userId}:${accessHash}`),
    "with",
    blue(`minimumId=${minId}`)
  );

  const { messages } = await client.invoke(
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
