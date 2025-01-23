import BigInt from 'big-integer';

import TelegramClient from '../../../gramjs/client/TelegramClient';
import GramJs from '../../../gramjs/tl/api';
import { invokeRequest } from '../../modules/invokeRequest';

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
