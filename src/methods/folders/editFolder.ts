import BigInt from "big-integer";
import { blue } from "colors/safe";

import GramJs from "../../common/gramjs/tl/api";

export const editFolder = async (
  client: any,
  accountId: string,
  userId: string,
  accessHash: string,
  folderId: number
) => {
  console.log(
    `[${accountId}] Edit folder account by ${blue(
      `${userId}:${accessHash}`
    )} to ${blue(`#folder${folderId}`)}`
  );

  await client.invoke(
    new GramJs.folders.EditPeerFolders({
      folderPeers: [
        new GramJs.InputFolderPeer({
          peer: new GramJs.InputPeerUser({
            userId: BigInt(userId),
            accessHash: BigInt(accessHash),
          }),
          folderId,
        }),
      ],
    })
  );
};
