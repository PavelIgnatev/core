import TelegramClient from '../../../gramjs/client/TelegramClient';
import GramJs from '../../../gramjs/tl/api';
import { invokeRequest } from '../../modules/invokeRequest';

export const deleteContacts = async (
  client: TelegramClient,
  users: GramJs.InputPeerUser[]
) => {
  await invokeRequest(
    client,
    new GramJs.contacts.DeleteContacts({ id: users })
  );
};
