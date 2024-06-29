import BigInt from "big-integer";

import GramJs from "../../common/gramjs/tl/api";

export const editFolder = async (
  client: any,
  userId: string,
  accessHash: string,
  folderId: number
) => {
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
