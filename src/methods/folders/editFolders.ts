import { invokeRequest } from '../../common/gramjs';
import TelegramClient from '../../common/gramjs/client/TelegramClient';
import GramJs from '../../common/gramjs/tl/api';

export const editFolders = async (
  client: TelegramClient,
  folderPeers: GramJs.InputFolderPeer[]
) => {
  await invokeRequest(
    client,
    new GramJs.folders.EditPeerFolders({ folderPeers })
  );
};
