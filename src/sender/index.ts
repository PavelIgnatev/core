import { exec as childExec } from 'child_process';

import 'dotenv/config';
import './helpers/setConsole.log';

import util from 'util';

import { getAccounts } from './db/accounts';
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
import { main } from './main.js';

const exec = util.promisify(childExec);
const promises: Promise<any>[] = [];
const accountsInWork: Record<string, number> = {};

getAccounts().then(async (accounts) => {
  console.log({ message: '💥 ITERATION INIT 💥' });
  const startTime = performance.now();

  accounts.slice(0, 200).forEach((accountId: string) => {
    promises.push(main(accountId, accountsInWork, exec));
  });

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
