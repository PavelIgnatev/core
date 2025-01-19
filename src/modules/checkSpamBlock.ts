import { Account } from '../@types/Account';
import TelegramClient from '../common/gramjs/client/TelegramClient';
import GramJs from '../common/gramjs/tl/api';
import { updateAccountById } from '../db/accounts';
import { getSpamBotReason } from '../helpers/getSpamBotReason';
import { sleep } from '../helpers/helpers';
import { sendToMainBot } from '../helpers/sendToMainBot';
import { resolveUsername } from '../methods/contacts/resolveUsername';
import { unBlockContact } from '../methods/contacts/unBlockContact';
import { getHistory } from '../methods/messages/getHistory';
import { sendMessage } from '../methods/messages/sendMessage';

const fileComplaint = async (
  client: TelegramClient,
  userId: string,
  accessHash: string,
  accountId: string
) => {
  //Submit a complaint
  //No, I’ll never do any of this!
  //Hello! I’m Telegram’s official Spam Info Bot. I can help you find out if your account was limited. I’ll also explain why this happens and what you can do to regain the full functionality. Send /start to launch me.
  const mm = await sendMessage(
    client,
    userId,
    accessHash,
    'This is a mistake',
    accountId,
    false,
    false
  );
  await sleep(5000);
  const m = await getHistory(client, userId, accessHash, mm.id);
  if (
    !m?.[0] ||
    !(
      m?.[0].message.includes('you like to submit a complaint') ||
      m?.[0].message.includes('already submitted') ||
      m?.[0].message.includes('use buttons to communicate with me') ||
      m?.[0].message.includes('regain the full functionality')
    )
  ) {
    throw new Error('SPAMBOT_MISTAKE_MESSAGE_NOT_FOUND');
  }

  if (
    m[0].message.includes('already submitted') ||
    m[0].message.includes('use buttons to communicate with me') ||
    m[0].message.includes('regain the full functionality')
  ) {
    return;
  }

  const yy = await sendMessage(
    client,
    userId,
    accessHash,
    'Yes',
    accountId,
    false,
    false
  );
  await sleep(5000);
  const y = await getHistory(client, userId, accessHash, yy.id);
  if (!y?.[0] || !y?.[0].message.includes('Did you ever do any of this')) {
    throw new Error('SPAMBOT_YES_MESSAGE_NOT_FOUND');
  }

  const nn = await sendMessage(
    client,
    userId,
    accessHash,
    'No! Never did that!',
    accountId,
    false,
    false
  );
  await sleep(5000);
  const n = await getHistory(client, userId, accessHash, nn.id);

  if (!n?.[0] || !n?.[0].message.includes('what went wrong')) {
    throw new Error('SPAMBOT_NO_MESSAGE_NOT_FOUND');
  }

  const reason = await getSpamBotReason(accountId);
  const rr = await sendMessage(
    client,
    userId,
    accessHash,
    reason,
    accountId,
    false,
    false
  );
  await sleep(5000);
  const r = await getHistory(client, userId, accessHash, rr.id);
  if (!r?.[0] || !r?.[0].message.includes('successfully submitted')) {
    throw new Error('SPAMBOT_SUCCESS_MESSAGE_NOT_FOUND');
  }
};

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
      spamBlockInitDate: null,
      spamBlockDays: null,
    });
    return false;
  }

  await fileComplaint(client, String(userId), String(accessHash), accountId);

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
      if ((historySpamBlocks || []).length) {
        await sendToMainBot(`** CHECK SPAM BLOCK: SPAM BLOCK DATE IS INFINITY **
ACCOUNT_ID: ${accountId}
SPAM_BLOCK_DATE: ${spamBlockDate}
DB_SPAM_BLOCK_DATE: ${dbSpamBlockDate}
SPAM_BLOCK_INIT_DATE: ${spamBlockInitDate}`);
      }
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
