import BigInt from 'big-integer';

import { invokeRequest } from '../../common/gramjs';
import TelegramClient from '../../common/gramjs/client/TelegramClient';
import GramJs from '../../common/gramjs/tl/api';

export const resolvePhone = async (client: TelegramClient, phone: string) => {
  const userByPhone = await invokeRequest(
    client,
    new GramJs.contacts.ResolvePhone({
      phone,
    }),
    { shouldIgnoreErrors: true }
  );

  if (userByPhone) {
    return userByPhone;
  }

  const result = await invokeRequest(
    client,
    new GramJs.contacts.ImportContacts({
      contacts: [
        new GramJs.InputPhoneContact({
          clientId: BigInt(1),
          phone,
          firstName: phone,
          lastName: '',
        }),
      ],
    })
  );

  if (
    result instanceof GramJs.contacts.ImportedContacts &&
    result.users.length
  ) {
    return result;
  }

  return null;
};
