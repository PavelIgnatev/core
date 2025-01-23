import { BigInteger } from 'big-integer';

import TelegramClient from '../../../gramjs/client/TelegramClient';
import GramJs from '../../../gramjs/tl/api';
import { getFullUser } from '../users/getFullUser';
import { resolvePhone } from './resolvePhone';
import { resolveUsername } from './resolveUsername';

export const resolveContact = async (
  client: TelegramClient,
  contact: string
) => {
  const resolveMethod = contact.includes('+') ? resolvePhone : resolveUsername;
  const resolvedContact = await resolveMethod(client, contact);

  if (!resolvedContact) {
    throw new Error('CONTACT_NOT_RESOLVED');
  }

  if (!resolvedContact.users.length) {
    throw new Error('CONTACT_USERS_LENGTH');
  }

  if (resolvedContact.users[0] instanceof GramJs.UserEmpty) {
    throw new Error('CONTACT_USER_EMPTY');
  }

  if (!resolvedContact.users[0].accessHash) {
    throw new Error('ACCESS_HASH_NOT_FOUND');
  }

  const { id: userId, accessHash } = resolvedContact.users[0];
  const fullUser = await getFullUser(
    client,
    String(userId),
    String(accessHash)
  );

  if (
    !fullUser ||
    !fullUser.users.length ||
    fullUser.users[0] instanceof GramJs.UserEmpty ||
    !fullUser.users[0].accessHash
  ) {
    throw new Error('USER_NOT_FOUND');
  }

  return {
    fullContact: fullUser,
    contact: fullUser.users[0] as GramJs.User & {
      accessHash: BigInteger;
    },
  };
};
