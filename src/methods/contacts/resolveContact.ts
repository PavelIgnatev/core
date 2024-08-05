import { resolvePhone } from './resolvePhone';
import { resolveUsername } from './resolveUsername';
import TelegramClient from '../../common/gramjs/client/TelegramClient';
import GramJs from '../../common/gramjs/tl/api';
import { updateFailedMessage } from '../../db/messages';
import { getFullUser } from '../users/getFullUser';

export const resolveContact = async (
  client: TelegramClient,
  accountId: string,
  username: string
) => {
  const resolveMethod = username.includes('+') ? resolvePhone : resolveUsername;
  const userByUsername = await resolveMethod(client, accountId, username);
  const { id: userId, accessHash } = userByUsername?.users?.[0] ?? {};
  const recipientFull = await getFullUser(
    client,
    accountId,
    userId,
    accessHash
  );

  if (
    !userId ||
    !accessHash ||
    !recipientFull ||
    !(userByUsername?.users?.[0] instanceof GramJs.User)
  ) {
    await updateFailedMessage(username);
    throw new Error('USERNAME_INVALID');
  }

  return recipientFull;
};
