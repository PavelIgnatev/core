import BigInt from 'big-integer';

import TelegramClient from '../../../gramjs/client/TelegramClient';
import GramJs from '../../../gramjs/tl/api';
import { invokeRequest } from '../../modules/invokeRequest';

export const getContacts = async (client: TelegramClient) => {
  const contacts = await invokeRequest(
    client,
    new GramJs.contacts.GetContacts({ hash: BigInt('0') })
  );

  if (!contacts || contacts instanceof GramJs.contacts.ContactsNotModified) {
    return null;
  }

  return contacts;
};
