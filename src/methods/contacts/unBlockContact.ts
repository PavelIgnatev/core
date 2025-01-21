import { invokeRequest } from '../../modules/invokeRequest';
import TelegramClient from '../../common/gramjs/client/TelegramClient';
import GramJs from '../../common/gramjs/tl/api';

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
