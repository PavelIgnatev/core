import 'dotenv/config';
import util from 'util';

import { exec as childExec } from 'child_process';

import TelegramClient from './common/gramjs/client/TelegramClient';
import { clearAuthorizations } from './common/gramjs/client/auth';

import { getAccountById, getAccounts, updateAccountById } from './db/accounts';

import { initClient } from './helpers/initClient';
import { sendToBot } from './helpers/sendToBot';
import { sleep } from './helpers/sleep';

import { setOffline } from './methods/account/setOffline';
import { usersMe } from './methods/users/usersMe';
import { accountSetup } from './modules/accountSetup';
import { autoResponse } from './modules/autoResponse';
import { autoSender } from './modules/autoSender';
import { handleUpdate } from './modules/handleUpdate';
import { automaticCheck } from './modules/automaticCheck';

import {
  endSender,
  errorSender,
  iterationErrors,
  peerFloods,
  reconnectErrors,
  startSender,
} from './helpers/global';

import './helpers/setConsole.log';

const exec = util.promisify(childExec);
const promises: Promise<any>[] = [];
const accountsInWork: Record<string, number> = {};

const main = async (ID: string) => {
  const startTime = performance.now();
  console.log({
    accountId: ID,
    message: `💥 LOG IN ${ID} 💥`,
  });

  let isAutoResponse = true;
  let setOnlineInterval: any = null;
  let client: TelegramClient | null = null;

  try {
    const account = await getAccountById(ID);
    if (!account) {
      throw new Error('Account not defined');
    }

    const {
      dcId,
      platform,
      userAgent,
      setuped = false,
      id: tgId,
      firstName,
    } = account;

    if (![dcId, platform, userAgent].every(Boolean)) {
      throw new Error('Insufficient number of parameters to start');
    }

    client = await initClient(account, ID, (update: any) =>
      handleUpdate(client, ID, update, () => (isAutoResponse = true))
    );

    setOnlineInterval = setInterval(async () => {
      try {
        if (
          !client?._sender._user_connected ||
          client?._sender?.isReconnecting
        ) {
          return;
        }

        const timeoutPromise = new Promise((_, reject) => {
          setTimeout(() => {
            reject(new Error());
          }, 10000);
        });

        await Promise.race([setOffline(client, false), timeoutPromise]);
      } catch (error: any) {
        console.warn({
          accountId: ID,
          message: 'Reconnect due to set offline',
        });
        reconnectErrors[ID] = (reconnectErrors[ID] || 0) + 1;

        client?._sender?.reconnect();
      }
    }, 10000);

    await new Promise((res) => setTimeout(res, 30000));
    await clearAuthorizations(client);
    const tgFirstName = await accountSetup(client, ID, setuped, firstName);
    const tgAccountId = await usersMe(client, ID, tgId);
    const randomI = Math.floor(Math.random() * 30);

    console.log({
      accountId: ID,
      message: `Random number: ${randomI}`,
    });

    let i = -1;
    while (true) {
      i += 1;
      accountsInWork[ID] = i;

      if (Object.values(accountsInWork).every((n) => n >= 30)) {
        break;
      }

      let timer;
      const timeout = new Promise(
        (_, rej) =>
          (timer = setTimeout(
            () =>
              rej(
                new Error(`Iteration [${i + 1}] took longer than 15 minutes`)
              ),
            900000
          ))
      );

      await Promise.race([
        (async () => {
          if (isAutoResponse) {
            isAutoResponse = false;
            await autoResponse(client, ID, tgAccountId, tgFirstName);
          }

          if (i === randomI) {
            await automaticCheck(client, ID);
            await autoSender(client, ID, tgAccountId);
          }
          await new Promise((res) => setTimeout(res, 60000));
        })(),
        timeout,
      ]);

      clearTimeout(timer);
    }
  } catch (e: any) {
    console.error({
      accountId: ID,
      message: new Error(`Main error: ${e.message}`),
    });

    if (e.message.includes('GLOBAL_ERROR')) {
      console.error({
        accountId: ID,
        message: new Error(e.message),
      });
    } else if (e.message.includes('STOPPED_ERROR')) {
      await updateAccountById(ID, {
        stopped: true,
      });
    } else if (e.message.includes('AUTH_KEY_DUPLICATED')) {
      await updateAccountById(ID, {
        banned: true,
        reason: 'AUTH_KEY_DUPLICATED',
      });
      await sendToBot(`!!!AUTH_KEY_DUPLICATED!!! ID: ${ID}`);
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
      await sendToBot(`!!!БАН АККАУНТА!!! ID: ${ID}; Error: ${e.message}`);
    } else {
      await sendToBot(
        `!!!НЕИЗВЕСТНАЯ ОШИБКА!!! ID: ${ID}; Error: ${e.message}`
      );
    }
  }

  delete accountsInWork[ID];

  if (setOnlineInterval) {
    clearInterval(setOnlineInterval);
  }

  if (client) {
    await client.destroy();
  }

  const time = Math.round((performance.now() - startTime) / 1000);
  const minutes = Math.floor(time / 60);
  const seconds = time % 60;

  let timeString;
  if (minutes > 0) {
    timeString = `${minutes}m ${seconds}s`;
  } else {
    timeString = `${seconds}s`;
  }

  console.log({
    accountId: ID,
    message: `💥 EXIT FROM ${ID} (${timeString}) 💥`,
  });
};

getAccounts().then(async (accounts) => {
  console.log({ message: '💥 ITERATION INIT 💥' });
  const startTime = performance.now();
  accounts.forEach((accountId: string) => {
    promises.push(main(accountId));
  });
  //447828819872-2026165-en

  const interval = setInterval(() => {
    console.log({
      message: `ITERATION IN PROGRESS (${Object.keys(accountsInWork).length})`,
      accountsInWork,
      peerFloods,
      reconnectErrors,
      iterationErrors,
    });
  }, 60000);

  // уйти от promise all
  Promise.all(promises).then(async () => {
    const time = Math.round((performance.now() - startTime) / 1000);
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;

    let timeString;
    if (minutes > 0) {
      timeString = `${minutes}m ${seconds}s`;
    } else {
      timeString = `${seconds}s`;
    }

    console.log({
      message: `💥 ITERATION DONE (${timeString}) 💥`,
      peerFloods,
      reconnectErrors,
      iterationErrors,
    });
    await sendToBot(`💥 ITERATION DONE (${timeString}) 💥
ИНИЦИИРОВАНО ОТПРАВОК: ${Object.keys(startSender).length}
ПОДТВЕРЖДЕНО ОТПРАВОК: ${Object.keys(endSender).length}
КОЛИЧЕСТВО ОШИБОК: ${Object.keys(errorSender).length}
КОЛИЧЕСТВО PEER FLOOD: ${Object.keys(peerFloods).length}
КОЛИЧЕСТВО RECONNECT ERRORS: ${Object.keys(reconnectErrors).length}
КОЛИЧЕСТВО ITERATION ERRORS: ${Object.keys(iterationErrors).length}`);
    clearInterval(interval);
    await sleep(10000);
    process.exit(1);
  });
});

process.on('uncaughtException', async (err) => {
  await sendToBot(`**** UncaughtException ****
Error: ${err.message}`);
  console.error({ message: `**** UncaughtException ****`, erorr: err });
  process.exit(1);
});

process.on('unhandledRejection', async (reason, promise) => {
  await sendToBot(`**** UnhandledRejection ****
Reason: ${reason}
Promise: ${JSON.stringify(promise)}`);
  console.error({ message: `**** UnhandledRejection ****`, reason, promise });
  process.exit(1);
});
