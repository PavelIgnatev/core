import { exec as childExec } from 'child_process';

import 'dotenv/config';
import './helpers/setConsole.log';

import util from 'util';

import { Account } from './@types/Account';
import { initClient } from './common/gramjs';
import TelegramClient from './common/gramjs/client/TelegramClient';
import { getAccountById, getAccounts, updateAccountById } from './db/accounts';
import {
  aiRetryError,
  allTimings,
  endSender,
  errorSender,
  getTimeString,
  getTimeStringByTime,
  peerFloods,
  phoneSearchError,
  sleep,
  startSender,
} from './helpers/helpers';
import { sendToMainBot } from './helpers/sendToMainBot';
import { clearAuthorizations } from './methods/account/clearAuthorizations';
import { updateStatus } from './methods/account/updateStatus';
import { handleUpdate } from './methods/update/handleUpdate';
import { getMe } from './methods/users/getMe';
import { accountSetup } from './modules/accountSetup';
import { automaticCheck } from './modules/automaticCheck';
import { autoResponse } from './modules/autoResponse';
import { autoSender } from './modules/autoSender';

const exec = util.promisify(childExec);
const promises: Promise<any>[] = [];
const accountsInWork: Record<string, number> = {};

const main = async (ID: string) => {
  const startTime = performance.now();

  let isAutoResponse = true;
  let account: Account | null = null;
  let client: TelegramClient | null = null;
  let errored = false;

  try {
    const randomI = Math.floor(Math.random() * 30);
    const accountByID = await getAccountById(ID);

    console.log({
      accountId: ID,
      message: `💥 LOG IN ${ID} 💥`,
      paylod: { count: randomI },
    });

    const { dcId, id: tgId, firstName, setuped = false } = accountByID;

    if (!dcId) {
      throw new Error('NOT_ENOUGH_PARAMS');
    }

    account = accountByID;
    client = await initClient(
      account,
      (update) => handleUpdate(ID, update, () => (isAutoResponse = true)),
      (error) => sendToMainBot(error)
    );

    if (!client) {
      throw new Error('CLIENT_NOT_INITED');
    }

    setInterval(async () => {
      try {
        if (
          !client?._sender ||
          !client._sender._user_connected ||
          client._sender.isReconnecting ||
          client._sender.userDisconnected ||
          errored
        ) {
          return;
        }

        await updateStatus(client, false);
      } catch (error: any) {
        errored = error.message;
      }
    }, 10000);

    await updateStatus(client, false);
    await clearAuthorizations(client);
    const tgFirstName = await accountSetup(client, account, setuped, firstName);
    const meId = await getMe(client, ID, tgId);

    let i = -1;
    while (true) {
      if (errored) {
        throw new Error(errored);
      }

      i += 1;
      accountsInWork[ID] = i;

      if (i === 30) {
        client._endTime = Number(performance.now() - startTime).toFixed(0);
      }

      if (Object.values(accountsInWork).every((n) => n >= 30)) {
        break;
      }

      let timer;
      const timeout = new Promise(
        (_, rej) =>
          (timer = setTimeout(
            () => rej(new Error(`ITERATION_TIMEOUT_EXITED: ${i}`)),
            900000
          ))
      );

      await Promise.race([
        (async () => {
          if (isAutoResponse && !account.fucker) {
            isAutoResponse = false;
            await autoResponse(client, ID, meId, tgFirstName);
          }

          if (i === randomI) {
            await automaticCheck(client, account);
            await autoSender(client, ID, meId);
          }
          await sleep(60000);
        })(),
        timeout,
      ]);

      clearTimeout(timer);
    }
  } catch (e: any) {
    console.error({
      accountId: ID,
      message: `MAIN_ERROR (${e.message})`,
    });

    if (e.message.includes('GLOBAL_ERROR')) {
    } else if (e.message.includes('STOPPED_ERROR')) {
      await updateAccountById(ID, {
        stopped: true,
      });
    } else if (e.message.includes('AUTH_KEY_DUPLICATED')) {
      await updateAccountById(ID, {
        banned: true,
        reason: 'AUTH_KEY_DUPLICATED',
      });
      await sendToMainBot(`💀 AUTH_KEY_DUPLICATED 💀
ID: ${ID}`);

      if (!account?.fucker) {
        await exec('pm2 kill');
      }
    } else if (
      [
        'USER_DEACTIVATED_BAN',
        'AUTH_KEY_UNREGISTERED',
        'AUTH_KEY_INVALID',
        'USER_DEACTIVATED',
        'SESSION_REVOKED',
        'SESSION_EXPIRED',
        'AUTH_KEY_PERM_EMPTY',
        'SESSION_PASSWORD_NEEDED',
      ].includes(e.message)
    ) {
      await updateAccountById(ID, {
        banned: true,
        reason: e.message,
      });
      await sendToMainBot(
        `** BAN ACCOUNT **
ID: ${ID};
Error: ${e.message}`
      );
    } else {
      await sendToMainBot(
        `** UNKNOWN_ERROR **
ID: ${ID};
Error: ${e.message}`
      );
    }
  }

  delete accountsInWork[ID];

  console.log({
    accountId: ID,
    message: `💥 EXIT FROM ${ID} (${getTimeString(startTime)}) 💥`,
  });

  return client;
};

getAccounts().then(async (accounts) => {
  console.log({ message: '💥 ITERATION INIT 💥' });
  const startTime = performance.now();

  // accounts.forEach((accountId: string) => {
  promises.push(main('54a60768d2371c75c52599feeb07db7b-prefix-fucker'));
  // });
  // 447828819872-2026165-en

  const interval = setInterval(() => {
    console.log({
      message: `ITERATION IN PROGRESS (${Object.keys(accountsInWork).length})`,
      accountsInWork,
    });
  }, 60000);

  Promise.all(promises).then(async (clients) => {
    const ps = clients.filter(Boolean);
    const senders = ps.map((p) => p._sender);
    const initTimings = ps.map((p) => ({
      id: p._accountId,
      value: Number(p._initTime),
    }));
    const endTimings = ps.map((p) => ({
      id: p._accountId,
      value: Number(p._endTime),
    }));
    const midInitTimings = Math.floor(
      initTimings.reduce((acc, num) => acc + num.value, 0) / initTimings.length
    );
    const maxInitTiming = initTimings.reduce((max, current) =>
      current.value > max.value ? current : max
    );

    const midEndTimings = Math.floor(
      endTimings.reduce((acc, num) => acc + num.value, 0) / endTimings.length
    );
    const maxEndTiming = endTimings.reduce((max, current) =>
      current.value > max.value ? current : max
    );

    const connectCounts = senders.map((s) => ({
      id: s._accountId,
      value: s._connectCounts,
    }));
    const totalConnectCounts = connectCounts.reduce(
      (acc, num) => acc + num.value,
      0
    );
    const midConnectCounts = (
      totalConnectCounts / connectCounts.length
    ).toFixed(2);
    const maxConnectCounts = connectCounts.reduce((max, current) =>
      current.value > max.value ? current : max
    );

    const reconnectCounts = senders.map((s) => ({
      id: s._accountId,
      value: s._reconnectCounts,
    }));
    const totalReconnectCounts = reconnectCounts.reduce(
      (acc, num) => acc + num.value,
      0
    );
    const midReconnectCounts = (
      totalReconnectCounts / reconnectCounts.length
    ).toFixed(2);
    const maxReconnectCounts = reconnectCounts.reduce((max, current) =>
      current.value > max.value ? current : max
    );

    const disconnectCounts = senders.map((s) => ({
      id: s._accountId,
      value: s._disconnectCounts,
    }));
    const totalDisconnectCounts = disconnectCounts.reduce(
      (acc, num) => acc + num.value,
      0
    );
    const midDisconnectCounts = (
      totalDisconnectCounts / disconnectCounts.length
    ).toFixed(2);
    const maxDisconnectCounts = disconnectCounts.reduce((max, current) =>
      current.value > max.value ? current : max
    );

    const connectErrorCounts = senders.map((s) => ({
      id: s._accountId,
      value: s._connectErrorCounts,
    }));
    const totalConnectErrorCounts = connectErrorCounts.reduce(
      (acc, num) => acc + num.value,
      0
    );
    const midConnectErrorCounts = (
      totalConnectErrorCounts / connectErrorCounts.length
    ).toFixed(2);
    const maxConnectErrorCounts = connectErrorCounts.reduce((max, current) =>
      current.value > max.value ? current : max
    );

    console.log({
      message: `💥 ITERATION DONE (${getTimeString(startTime)}) 💥`,
      initTimings,
      endTimings,
      connectCounts,
      reconnectCounts,
      disconnectCounts,
      connectErrorCounts,
    });

    await sendToMainBot(`💥 ITERATION DONE (${getTimeString(startTime)}) 💥

* АККАУНТЫ * 
В РАБОТЕ: ${promises.length} ${promises.length !== promises.filter(Boolean).length ? `(${promises.filter(Boolean).length})` : ''}
СРЕДНЕЕ ВРЕМЯ ЗАПУСКА: ${getTimeStringByTime(midInitTimings)} (max: ${getTimeStringByTime(maxInitTiming.value)})
СРЕДНЕЕ ВРЕМЯ РАБОТЫ: ${getTimeStringByTime(midEndTimings)} (max: ${getTimeStringByTime(maxEndTiming.value)})

* СТАБИЛЬНОСТЬ *
RESPONSE_TIME: ${getTimeStringByTime(
      Number(allTimings.reduce((acc, num) => acc + num, 0) / allTimings.length)
    )}
CONNECT: ${totalConnectCounts} (mid: ${midConnectCounts}, max: ${maxConnectCounts.value})
RECONNECT: ${totalReconnectCounts} (mid: ${midReconnectCounts}, max: ${maxReconnectCounts.value})
DISCONNECT: ${totalDisconnectCounts} (mid: ${midDisconnectCounts}, max: ${maxDisconnectCounts.value})
NETWORK_ERRORS: ${totalConnectErrorCounts} (mid: ${midConnectErrorCounts}, max: ${maxConnectErrorCounts.value})

* ОТПРАВКИ *
ИНИЦИИРОВАНО: ${Object.keys(startSender).length}
ПОДТВЕРЖДЕНО: ${Object.keys(endSender).length}
ОШИБОК: ${Object.keys(errorSender).length} ${Object.keys(peerFloods).length > 0 ? `(PEER_FLOOD: ${Object.keys(peerFloods).length})` : ''}
БЛОКИРОВКА ПОИСКА ПО НОМЕРУ: ${Object.keys(phoneSearchError).length}${
      Object.keys(aiRetryError).length > 0
        ? `\n\n* ИИ *
${Object.keys(aiRetryError)
  .map((r) => `${r}: ${aiRetryError[r]}`)
  .join('\n')}`
        : ''
    }
`);
    clearInterval(interval);
    await sleep(10000);
    process.exit(1);
  });
});

process.on('uncaughtException', async (err) => {
  await sendToMainBot(`**** UNCAUGHT_EXCEPTION ****
Error: ${err.message}`);
  process.exit(1);
});

process.on('unhandledRejection', async (reason, promise) => {
  await sendToMainBot(`**** UNHANDLED_REJECTION ****
Reason: ${reason}
Promise: ${JSON.stringify(promise)}`);
  process.exit(1);
});
