import TelegramClient from '../../../gramjs/client/TelegramClient';
import GramJs from '../../../gramjs/tl/api';
import { invokeRequest } from '../../modules/invokeRequest';

export const togglePin = async (
  client: TelegramClient,
  peer: GramJs.TypeInputDialogPeer,
  pinned: true | undefined
) => {
  await invokeRequest(
    client,
    new GramJs.messages.ToggleDialogPin({ peer, pinned })
  );
};
