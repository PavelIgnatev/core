import { Account } from '../@types/Account';
import TelegramClient from '../common/gramjs/client/TelegramClient';
import GramJs from '../common/gramjs/tl/api';
import { updateAccountById } from '../db/accounts';
import { sleep } from '../helpers/helpers';
import { sendToMainBot } from '../helpers/sendToMainBot';
import { resolveUsername } from '../methods/contacts/resolveUsername';
import { getHistory } from '../methods/messages/getHistory';
import { sendMessage } from '../methods/messages/sendMessage';

export const checkSpamBlock = async (
  client: TelegramClient,
  account: Account
) => {
  const {
    accountId,
    spamBlockDate: dbSpamBlockDate,
    spamBlockInitDate,
    historySpamBlocks = [],
  } = account;

  const result = await resolveUsername(client, 'spambot');

  if (
    !result ||
    !result.users.length ||
    !(result.users[0] instanceof GramJs.User)
  ) {
    throw new Error('SPAMBOT_NOT_FOUND');
  }

  const { id: userId, accessHash, username } = result.users[0];
  if (!accessHash || !username || username !== 'SpamBot') {
    throw new Error('SPAMBOT_NOT_FOUND');
  }

  const sentMessage = await sendMessage(
    client,
    String(userId),
    String(accessHash),
    '/start',
    accountId,
    false
  );

  if (!sentMessage?.id) {
    throw new Error('SPAMBOT_ID_NOT_FOUND');
  }

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
      spamBlockInitDate: null,
      spamBlockDays: null,
    });
    return false;
  }

  const match = message.match(/until\s(.*)\./);
  const spamBlockDate = match ? match[1].replace('UTC', '').trim() : 'INFINITY';
  const spamBlockDateUTC = new Date(spamBlockDate + 'Z');

  if (
    !spamBlockInitDate ||
    !dbSpamBlockDate ||
    (dbSpamBlockDate === 'INFINITY' && spamBlockDate !== 'INFINITY') ||
    (dbSpamBlockDate !== 'INFINITY' && spamBlockDate === 'INFINITY') ||
    (dbSpamBlockDate !== 'INFINITY' &&
      dbSpamBlockDate.getTime() !== spamBlockDateUTC.getTime())
  ) {
    let spamBlockDays = 0;
    if (spamBlockDate !== 'INFINITY') {
      const timeDiff = spamBlockDateUTC.getTime() - new Date().getTime();
      spamBlockDays = Math.ceil(timeDiff / (1000 * 3600 * 24));
    } else {
      await sendToMainBot(`** CHECK SPAM BLOCK: SPAM BLOCK DATE IS INFINITY **
ACCOUNT_ID: ${accountId}
SPAM_BLOCK_DATE: ${spamBlockDate}
DB_SPAM_BLOCK_DATE: ${dbSpamBlockDate}
SPAM_BLOCK_INIT_DATE: ${spamBlockInitDate}`);
    }

    const updateData: Record<string, unknown> = {
      spamBlockDate: match ? spamBlockDateUTC : 'INFINITY',
      spamBlockDays,
    };
    if (!spamBlockInitDate) {
      updateData['spamBlockInitDate'] = new Date();
    }
    updateData['historySpamBlocks'] = [
      ...(historySpamBlocks || []),
      {
        spamBlockDate: match ? spamBlockDateUTC : 'INFINITY',
        spamBlockDays,
      },
    ];

    await updateAccountById(accountId, updateData);
  }

  return true;
};
