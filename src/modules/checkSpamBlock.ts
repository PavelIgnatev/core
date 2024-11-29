import { Account } from '../@types/Account';
import { updateAccountById } from '../db/accounts';
import { getBlockedDialogues } from '../db/dialogues';
import { sendToSpamBot } from '../helpers/sendToSpamBot';
import { resolveUsername } from '../methods/contacts/resolveUsername';
import { getMessages } from '../methods/messages/getMessages';
import { sendMessage } from '../methods/messages/sendMessage';

function formatDateToUTC(date: Date) {
  const utcDate = new Date(date);
  return `${utcDate.getUTCFullYear()}-${String(utcDate.getUTCMonth() + 1).padStart(2, '0')}-${String(
    utcDate.getUTCDate()
  ).padStart(
    2,
    '0'
  )} ${String(utcDate.getUTCHours()).padStart(2, '0')}:${String(
    utcDate.getUTCMinutes()
  ).padStart(2, '0')}`;
}

export const checkSpamBlock = async (client: any, account: Account) => {
  const { accountId, spamBlockDate: tgSpamBlockDate } = account;
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

  if (!tgSpamBlockDate) {
    const { latest, latest2 } = await getBlockedDialogues(accountId);

    const mappedLatest = latest
      .map((l) => {
        const { messages, groupId, recipientId } = l;

        if (!messages || messages.length === 0) {
          return '';
        }

        const history = messages
          .map((message: any) => {
            if (String(message.fromId) === String(recipientId)) {
              return null;
            }
            const messageDate = Number(message.date + '000');
            if (isNaN(messageDate)) {
              console.warn(`Invalid message date: ${message.date}`);
              return '';
            }

            return `${formatDateToUTC(new Date(messageDate))}: ${message.text}`;
          })
          .filter(Boolean)
          .join('\n');

        return `-----------------
{"groupId": "${groupId}", "recipientId": "${recipientId}"}
${history}`;
      })
      .join('\n');

    const mappedLatest2 = latest2
      .map((l) => {
        const { messages, groupId, recipientId } = l;

        if (!messages || messages.length === 0) {
          return '';
        }

        const history = messages
          .map((message: any) => {
            if (String(message.fromId) === String(recipientId)) {
              return null;
            }

            const messageDate = Number(message.date + '000');
            if (isNaN(messageDate)) {
              console.warn(`Invalid message date: ${message.date}`);
              return '';
            }

            return `${formatDateToUTC(new Date(messageDate))}: ${message.text}`;
          })
          .filter(Boolean)
          .join('\n');

        return `-----------------
{"groupId": "${groupId}", "recipientId": "${recipientId}"}
${history}`;
      })
      .join('\n');

    await sendToSpamBot(`❗❗ NEW SPAMBLOCK ❗❗
-----------------
ID: ${accountId}
SPAMBLOCK DATE: ${untilDateMatch ? formatDateToUTC(nextSpamBlockDay) : 'INFINITY'}
-----------------
❗ ПОСЛЕДНИЕ 3 СПАМ-БЛОКИРОВКИ (по date) ❗
${mappedLatest2}
-----------------
❗ ПОСЛЕДНИЕ 3 СПАМ-БЛОКИРОВКИ (по dateUpdated) ❗
${mappedLatest}`);
  }
  
  await updateAccountById(accountId, {
    remainingTime: untilDateMatch ? nextSpamBlockDay : nextDay,
    spamBlockDate: untilDateMatch ? nextSpamBlockDay : 'INFINITY',
    spamInitDate: new Date(),
  });

  return true;
};
