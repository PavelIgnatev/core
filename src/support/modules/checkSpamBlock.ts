import TelegramClient from '../../gramjs/client/TelegramClient';
import GramJs from '../../gramjs/tl/api';
import { Account } from '../@types/Account';
import { updateAccountById } from '../db/accounts';
import { sleep } from '../helpers/helpers';
import { resolveUsername } from '../methods/contacts/resolveUsername';
import { unBlockContact } from '../methods/contacts/unBlockContact';
import { getHistory } from '../methods/messages/getHistory';
import { sendMessage } from '../methods/messages/sendMessage';

export const checkSpamBlock = async (
  client: TelegramClient,
  account: Account
) => {
  const { accountId, spamBlockDate: dbSpamBlockDate } = account;

  const result = await resolveUsername(client, 'spambot');

  if (
    !result ||
    !result.users.length ||
    !(result.users[0] instanceof GramJs.User)
  ) {
    throw new Error('SPAMBOT_NOT_USER');
  }

  const { id: userId, accessHash, username } = result.users[0];
  if (!accessHash || !username || username !== 'SpamBot') {
    throw new Error('SPAMBOT_NOT_FOUND');
  }

  await unBlockContact(
    client,
    new GramJs.InputPeerUser({
      userId,
      accessHash,
    })
  );

  const sentMessage = await sendMessage(
    client,
    String(userId),
    String(accessHash),
    '/start',
    accountId,
    false,
    false
  );

  await sleep(5000);
  const messages = await getHistory(
    client,
    String(userId),
    String(accessHash),
    sentMessage.id
  );

  if (!messages[0]) {
    throw new Error('SPAMBOT_MESSAGES_NOT_FOUND');
  }

  const { message } = messages[0];

  if (message.includes('no limits are currently applied')) {
    await updateAccountById(accountId, {
      spamBlockDate: null,
    });
    return false;
  }

  // await fileComplaint(client, String(userId), String(accessHash), accountId);

  const match = message.match(/until\s(.*)\./);
  const spamBlockDate = match ? match[1].replace('UTC', '').trim() : 'INFINITY';
  const spamBlockDateUTC = new Date(spamBlockDate + 'Z');

  if (
    !dbSpamBlockDate ||
    (dbSpamBlockDate === 'INFINITY' && spamBlockDate !== 'INFINITY') ||
    (dbSpamBlockDate !== 'INFINITY' && spamBlockDate === 'INFINITY') ||
    (dbSpamBlockDate !== 'INFINITY' &&
      dbSpamBlockDate.getTime() !== spamBlockDateUTC.getTime())
  ) {
    await updateAccountById(accountId, {
      spamBlockDate: match ? spamBlockDateUTC : 'INFINITY',
    });
  }

  return true;
};
