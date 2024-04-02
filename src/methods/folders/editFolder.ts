import BigInt from "big-integer";

import GramJs from "../../telegram/tl/api";
import { invokeRequest } from "../../telegram";

export const editFolder = async (
  userId: string,
  accessHash: string,
  folderId: number
) => {
  await invokeRequest(
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
