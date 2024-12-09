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
  const {
    accountId,
    spamBlockDate: tgSpamBlockDate,
    spamBlockInitDate,
    historySpamBlocks = [],
  } = account;
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
    accountId,
    false
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
      spamBlockInitDate: null,
      spamBlockDays: null,
    });
    return false;
  }

  const untilDateMatch = message.match(/until\s(.*)\./);
  const spamBlockDate = untilDateMatch
    ? untilDateMatch[1].replace('UTC', '').trim()
    : 'INFINITY';
  const nextSpamBlockDay = new Date(spamBlockDate + 'Z');

  if (
    !spamBlockInitDate ||
    !tgSpamBlockDate ||
    (tgSpamBlockDate === 'INFINITY' && spamBlockDate !== 'INFINITY') ||
    (tgSpamBlockDate !== 'INFINITY' && spamBlockDate === 'INFINITY') ||
    (tgSpamBlockDate !== 'INFINITY' &&
      tgSpamBlockDate.getTime() !== nextSpamBlockDay.getTime())
  ) {
    const latest = await getBlockedDialogues(accountId);
    const mappedLatest = latest
      .map((l, index) => {
        const { messages, groupId, recipientId, dateAutomaticCheck } = l;

        if (index === 0) {
          const history = messages
            .reverse()
            .map((message: any) => {
              if (String(message.fromId) === String(recipientId)) {
                return null;
              }

              return `${formatDateToUTC(new Date(Number((message.date || 0) + '000')))}: ${message.text}`;
            })
            .filter(Boolean)
            .join('\n');

          return `-----------------
{"groupId": "${groupId}", "recipientId": "${recipientId}"}
DETECT BLOCKED DATE: ${formatDateToUTC(new Date(dateAutomaticCheck))}
${history}`;
        }

        return messages && messages.length
          ? `-----------------
{"groupId": "${groupId}", "recipientId": "${recipientId}"}
DETECT BLOCKED DATE: ${formatDateToUTC(new Date(dateAutomaticCheck))}
LAST MESSAGE DATE: ${formatDateToUTC(new Date(Number((messages[messages.length - 1]?.date || 0) + '000')))}`
          : '';
      })
      .join('\n');

    let spamBlockDays = 0;
    if (spamBlockDate !== 'INFINITY') {
      const timeDiff = nextSpamBlockDay.getTime() - new Date().getTime();
      spamBlockDays = Math.ceil(timeDiff / (1000 * 3600 * 24));
    }

    await sendToSpamBot(`❗ ${!spamBlockInitDate ? 'NEW' : 'UPDATE'} SPAMBLOCK ❗
-----------------
ID: ${accountId}
SPAMBLOCK DATE: ${untilDateMatch ? formatDateToUTC(nextSpamBlockDay) : 'INFINITY'}
SPAMBLOCK DAYS: ${spamBlockDays === 0 ? 'INFINITY' : `${spamBlockDays} day(s)`}
-----------------
❗ ПОСЛЕДНИЕ ${latest.length} БЛОКИРОВОК ❗
${mappedLatest}`);

    const updateData: any = {
      spamBlockDate: untilDateMatch ? nextSpamBlockDay : 'INFINITY',
      spamBlockDays,
    };
    if (!spamBlockInitDate) {
      updateData['spamBlockInitDate'] = new Date();
    }
    updateData['historySpamBlocks'] = [
      ...(historySpamBlocks || []),
      {
        spamBlockDate: untilDateMatch ? nextSpamBlockDay : 'INFINITY',
        spamBlockDays,
      },
    ];

    await updateAccountById(accountId, updateData);
  }

  return true;
};
