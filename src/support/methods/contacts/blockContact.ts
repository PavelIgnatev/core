import TelegramClient from '../../../gramjs/client/TelegramClient';
import GramJs from '../../../gramjs/tl/api';
import { invokeRequest } from '../../modules/invokeRequest';

export const blockContact = async (
  client: TelegramClient,
  peer: GramJs.TypeInputPeer
) => {
  await invokeRequest(client, new GramJs.contacts.Block({ id: peer }), {
    shouldIgnoreErrors: true,
  });
};
