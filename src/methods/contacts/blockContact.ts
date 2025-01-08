import { invokeRequest } from '../../common/gramjs';
import TelegramClient from '../../common/gramjs/client/TelegramClient';
import GramJs from '../../common/gramjs/tl/api';

export const blockContact = async (
  client: TelegramClient,
  peer: GramJs.TypeInputPeer
) => {
  await invokeRequest(client, new GramJs.contacts.Block({ id: peer }));
};
