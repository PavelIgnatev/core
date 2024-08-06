import { blue, red, yellow } from 'colors/safe';

import { updateAccountById } from '../db/accounts';
import { resolveUsername } from '../methods/contacts/resolveUsername';
import { getMessages } from '../methods/messages/getMessages';
import { sendMessage } from '../methods/messages/sendMessage';

export const checkSpamBlock = async (client: any, accountId: string) => {
  console.log(
    `[${accountId}] Initialize sub module`,
    yellow('CHECK SPAMBLOCK')
  );

  const result = await resolveUsername(client, accountId, 'spambot');

  const { id: userId, accessHash, username } = result?.users?.[0] ?? {};

  if (!userId || !accessHash || username !== 'SpamBot') {
    console.log(red(`[${accountId}] Chat with SpamBot not defined`));
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
    console.log(red(`[${accountId}] MaxId from SpamBot not defined`));
    return true;
  }

  await new Promise((res) => setTimeout(res, 5000));
  const messages = await getMessages(
    client,
    accountId,
    userId,
    accessHash,
    maxId
  );
  if (!messages?.[0]) {
    console.log(red(`[${accountId}] Messages from SpamBot not defined`));
    return true;
  }

  const { message } = messages[0];

  if (message.includes('no limits are currently applied')) {
    console.log(`[${accountId}] Account is spamblock-free`);
    await updateAccountById(accountId, {
      spamBlockDate: null,
    });
    return false;
  }

  const untilDateMatch = message.match(/until\s(.*)\./);

  const spamBlockDate = untilDateMatch
    ? untilDateMatch[1].replace('UTC', '')
    : 'INFINITY';

  const currentDate = new Date();
  const nextDay = new Date(currentDate);

  nextDay.setDate(currentDate.getDate() + 1);

  await updateAccountById(accountId, {
    remainingTime: String(nextDay),
    spamBlockDate,
  });

  console.log(
    `[${accountId}] Account has a spamblock to ${blue(String(spamBlockDate))}`
  );

  return spamBlockDate;
};
