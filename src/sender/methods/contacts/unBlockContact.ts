import TelegramClient from '../../../gramjs/client/TelegramClient';
import GramJs from '../../../gramjs/tl/api';
import { invokeRequest } from '../../modules/invokeRequest';

export const unBlockContact = async (
  client: TelegramClient,
  peer: GramJs.TypeInputPeer
) => {
  try {
    return await invokeRequest(
      client,
      new GramJs.contacts.Unblock({ id: peer })
    );
  } catch {}
};
