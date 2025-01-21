import { invokeRequest } from '../../modules/invokeRequest';
import TelegramClient from '../../common/gramjs/client/TelegramClient';
import GramJs from '../../common/gramjs/tl/api';

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
