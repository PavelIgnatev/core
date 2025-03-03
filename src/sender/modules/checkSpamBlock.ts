import TelegramClient from '../../gramjs/client/TelegramClient';
import GramJs from '../../gramjs/tl/api';
import { Account } from '../@types/Account';
import { updateAccountById } from '../db/accounts';
import { getSpamBotReason } from '../helpers/getSpamBotReason';
import { sleep } from '../helpers/helpers';
import { sendToMainBot } from '../helpers/sendToMainBot';
import { resolveUsername } from '../methods/contacts/resolveUsername';
import { unBlockContact } from '../methods/contacts/unBlockContact';
import { deleteHistory } from '../methods/messages/deleteHistory';
import { getHistory } from '../methods/messages/getHistory';
import { sendMessage } from '../methods/messages/sendMessage';

const fileComplaint = async (
  client: TelegramClient,
  userId: string,
  accessHash: string,
  accountId: string,
  replyMarkup: GramJs.TypeReplyMarkup | undefined
) => {
  if (!replyMarkup || !(replyMarkup instanceof GramJs.ReplyKeyboardMarkup)) {
    return;
  }

  let buttons: string[] = [];
  replyMarkup.rows.forEach((row) =>
    row.buttons.forEach((button) => buttons.push(button.text))
  );

  if (buttons.includes('Submit a complaint')) {
    const s1 = await sendMessage(
      client,
      userId,
      accessHash,
      'Submit a complaint',
      accountId,
      false,
      false
    );
    await sleep(5000);
    const h1 = await getHistory(client, userId, accessHash, s1.id);
    const m1 = h1[0]?.message;

    if (m1?.includes('already submitted')) {
      return;
    }
    if (!m1 || !m1.includes('you going to do anything like that?')) {
      throw new Error('SPAMBOT_MESSAGE_NOT_FOUND');
    }

    const s2 = await sendMessage(
      client,
      userId,
      accessHash,
      'No, I’ll never do any of this!',
      accountId,
      false,
      false
    );
    await sleep(5000);
    const h2 = await getHistory(client, userId, accessHash, s2.id);
    const m2 = h2[0]?.message;

    if (!m2 || !m2.includes('think your account was limited')) {
      throw new Error('SPAMBOT_MESSAGE_NOT_FOUND');
    }

    const reason = await getSpamBotReason(accountId);
    const s3 = await sendMessage(
      client,
      userId,
      accessHash,
      reason,
      accountId,
      false,
      false
    );
    await sleep(5000);
    const h3 = await getHistory(client, userId, accessHash, s3.id);
    const m3 = h3[0]?.message;

    if (!m3 || !m3.includes('successfully submitted')) {
      throw new Error('SPAMBOT_MESSAGE_NOT_FOUND');
    }
  } else if (buttons.includes('This is a mistake')) {
    const s1 = await sendMessage(
      client,
      userId,
      accessHash,
      'This is a mistake',
      accountId,
      false,
      false
    );
    await sleep(5000);
    const h1 = await getHistory(client, userId, accessHash, s1.id);
    const m1 = h1[0]?.message;

    if (m1?.includes('already submitted')) {
      return;
    }
    if (!m1 || !m1.includes('you like to submit a complaint')) {
      throw new Error('SPAMBOT_MESSAGE_NOT_FOUND');
    }

    const s2 = await sendMessage(
      client,
      userId,
      accessHash,
      'Yes',
      accountId,
      false,
      false
    );
    await sleep(5000);
    const h2 = await getHistory(client, userId, accessHash, s2.id);
    const m2 = h2[0]?.message;

    if (!m2 || !m2.includes('you ever do any of this')) {
      throw new Error('SPAMBOT_MESSAGE_NOT_FOUND');
    }

    const s3 = await sendMessage(
      client,
      userId,
      accessHash,
      'No! Never did that!',
      accountId,
      false,
      false
    );
    await sleep(5000);
    const h3 = await getHistory(client, userId, accessHash, s3.id);
    const m3 = h3[0]?.message;

    if (!m3 || !m3.includes('what went wrong')) {
      throw new Error('SPAMBOT_MESSAGE_NOT_FOUND');
    }

    const reason = await getSpamBotReason(accountId);
    const s4 = await sendMessage(
      client,
      userId,
      accessHash,
      reason,
      accountId,
      false,
      false
    );
    await sleep(5000);
    const h4 = await getHistory(client, userId, accessHash, s4.id);
    const m4 = h4[0]?.message;

    if (!m4 || !m4.includes('successfully submitted')) {
      throw new Error('SPAMBOT_MESSAGE_NOT_FOUND');
    }
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
    messageCount = 0,
  } = account;

  await new Promise((r) =>
    setTimeout(r, (Math.floor(Math.random() * 60) + 1) * 1000)
  );

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

  const { message, replyMarkup } = messages[0];

  if (message.includes('no limits are currently applied')) {
    await updateAccountById(accountId, {
      spamBlockDate: null,
      spamBlockInitDate: null,
      spamBlockDays: null,
    });
    await deleteHistory(
      client,
      new GramJs.InputPeerUser({
        userId,
        accessHash,
      }),
      true
    );
    return false;
  }

  await fileComplaint(
    client,
    String(userId),
    String(accessHash),
    accountId,
    replyMarkup
  );

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
      if (messageCount) {
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

  await deleteHistory(
    client,
    new GramJs.InputPeerUser({
      userId,
      accessHash,
    }),
    true
  );
  return true;
};
