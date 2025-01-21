import BigInt from 'big-integer';

import { invokeRequest } from '../../modules/invokeRequest';
import TelegramClient from '../../common/gramjs/client/TelegramClient';
import GramJs from '../../common/gramjs/tl/api';

export const editFolder = async (
  client: TelegramClient,
  userId: string,
  accessHash: string,
  folderId: number
) => {
  await invokeRequest(
    client,
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
