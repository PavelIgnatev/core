import { updateAccountById } from '../db/accounts';
import { resolveUsername } from '../methods/contacts/resolveUsername';
import { getMessages } from '../methods/messages/getMessages';
import { sendMessage } from '../methods/messages/sendMessage';

export const checkSpamBlock = async (client: any, accountId: string) => {
  const result = await resolveUsername(client, 'spambot');

  const { id: userId, accessHash, username } = result?.users?.[0] ?? {};

  if (!userId || !accessHash || username !== 'SpamBot') {
    console.error({
      accountId,
      message: new Error('Chat with SpamBot not defined'),
    });

    return true;
  }

  const sentMessage = await sendMessage(
    client,
    userId,
    accessHash,
    '/start',
    accountId
  );

  const { id: maxId } = sentMessage;

  if (!maxId) {
    console.error({
      accountId,
      message: new Error('MaxId from SpamBot not defined'),
    });
    return true;
  }

  await new Promise((res) => setTimeout(res, 5000));
  const messages = await getMessages(client, userId, accessHash, maxId);
  if (!messages?.[0]) {
    console.error({
      accountId,
      message: new Error('Messages from SpamBot not defined'),
    });
    return true;
  }

  const { message } = messages[0];

  if (message.includes('no limits are currently applied')) {
    console.log({
      accountId,
      message: 'Account is spamblock-free',
    });

    await updateAccountById(accountId, {
      spamBlockDate: null,
      spamInitDate: null,
    });
    return false;
  }

  const untilDateMatch = message.match(/until\s(.*)\./);

  const spamBlockDate = untilDateMatch
    ? untilDateMatch[1].replace('UTC', '')
    : 'INFINITY';

  const nextSpamBlockDay = new Date(spamBlockDate + 'Z');
  const currentDate = new Date();
  const nextDay = new Date(currentDate);
  nextDay.setDate(currentDate.getDate() + 1);

  await updateAccountById(accountId, {
    remainingTime: untilDateMatch ? nextSpamBlockDay : nextDay,
    spamBlockDate: untilDateMatch ? nextSpamBlockDay : 'INFINITY',
    spamInitDate: new Date(),
  });

  console.log({
    accountId,
    message: `Account has a spamblock to ${String(untilDateMatch ? nextSpamBlockDay.toLocaleString('en-US', { timeZone: 'UTC' }) : 'INFINITY')}`,
  });

  return true;
};
