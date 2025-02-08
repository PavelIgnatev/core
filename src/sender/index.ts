import { exec as childExec } from 'child_process';

import 'dotenv/config';
import './helpers/setConsole.log';

import util from 'util';

import TelegramClient from '../gramjs/client/TelegramClient';
import { Account } from './@types/Account';
import { initClient } from './client';
import { getAccountById, getAccounts, updateAccountById } from './db/accounts';
import {
  aiReqest,
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
  withoutRecipientError,
} from './helpers/helpers';
import { sendToMainBot } from './helpers/sendToMainBot';
import { waitConsole } from './helpers/setConsole.log';
import { clearAuthorizations } from './methods/account/clearAuthorizations';
import { setup2FA } from './methods/account/setup2FA';
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

    console.warn({
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
      (update) =>
        handleUpdate(client, ID, update, () => (isAutoResponse = true)),
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
    await setup2FA(client, account);
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
          if (isAutoResponse) {
            isAutoResponse = false;
            await autoResponse(client, ID, meId, tgFirstName);
          }

          // if (i === randomI) {
            await automaticCheck(client, account);
            await autoSender(client, ID, meId);
          // }
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

      await exec('pm2 kill');
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

  console.warn({
    accountId: ID,
    message: `💥 EXIT FROM ${ID} (${getTimeString(startTime)}) 💥`,
  });

  return client;
};

getAccounts().then(async (accounts) => {
  console.log({ message: '💥 ITERATION INIT 💥' });
  const startTime = performance.now();

  // accounts.forEach((accountId: string) => {
    promises.push(main("183-7-september-9-sep"));
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
REQUEST_COUNT: ${allTimings.length}
RESPONSE_TIME: ${Number(
      (
        allTimings.reduce((acc, num) => acc + num, 0) /
        allTimings.length /
        1000
      ).toFixed(2)
    )}ms
CONNECT: ${totalConnectCounts} (mid: ${midConnectCounts}, max: ${maxConnectCounts.value})
RECONNECT: ${totalReconnectCounts} (mid: ${midReconnectCounts}, max: ${maxReconnectCounts.value})
DISCONNECT: ${totalDisconnectCounts} (mid: ${midDisconnectCounts}, max: ${maxDisconnectCounts.value})
NETWORK_ERRORS: ${totalConnectErrorCounts} (mid: ${midConnectErrorCounts}, max: ${maxConnectErrorCounts.value})

* ОТПРАВКИ *
ИНИЦИИРОВАНО: ${Object.keys(startSender).length}
ПОДТВЕРЖДЕНО: ${Object.keys(endSender).length}
ОШИБОК: ${Object.keys(errorSender).length} ${Object.keys(peerFloods).length > 0 ? `(PEER_FLOOD: ${Object.keys(peerFloods).length}, WITHOUT_RECIPIENT: ${Object.keys(withoutRecipientError).length})` : ''}
БЛОКИРОВКА ПОИСКА ПО НОМЕРУ: ${Object.keys(phoneSearchError).length}${
      Object.keys(aiReqest).length > 0
        ? `\n\n* ИИ *
${Object.keys(aiReqest)
  .map((r) => `${r}: ${aiReqest[r]} requests, ${aiRetryError[r] || 0} errors`)
  .join('\n')}`
        : ''
    }
`);
    clearInterval(interval);
    await waitConsole();
    process.exit(1);
  });
});

process.on('uncaughtException', async (err) => {
  await waitConsole();
  await sendToMainBot(`**** UNCAUGHT_EXCEPTION ****
Error: ${err.message}`);
  process.exit(1);
});

process.on('unhandledRejection', async (reason, promise) => {
  await waitConsole();
  await sendToMainBot(`**** UNHANDLED_REJECTION ****
Reason: ${reason}
Promise: ${JSON.stringify(promise)}`);
  process.exit(1);
});
