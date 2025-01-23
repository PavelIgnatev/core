import TelegramClient from '../../../gramjs/client/TelegramClient';
import GramJs from '../../../gramjs/tl/api';
import { invokeRequest } from '../../modules/invokeRequest';

export const editFolders = async (
  client: TelegramClient,
  folderPeers: GramJs.InputFolderPeer[]
) => {
  await invokeRequest(
    client,
    new GramJs.folders.EditPeerFolders({ folderPeers })
  );
};
