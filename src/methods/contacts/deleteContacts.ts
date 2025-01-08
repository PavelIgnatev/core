import { invokeRequest } from '../../common/gramjs';
import TelegramClient from '../../common/gramjs/client/TelegramClient';
import GramJs from '../../common/gramjs/tl/api';

export const deleteContacts = async (
  client: TelegramClient,
  users: GramJs.InputPeerUser[]
) => {
  await invokeRequest(
    client,
    new GramJs.contacts.DeleteContacts({ id: users })
  );
};
