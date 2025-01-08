import BigInt from 'big-integer';

import { invokeRequest } from '../../common/gramjs';
import TelegramClient from '../../common/gramjs/client/TelegramClient';
import GramJs from '../../common/gramjs/tl/api';

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
