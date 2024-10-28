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

import './helpers/setConsole.log';

const exec = util.promisify(childExec);
const promises: Promise<any>[] = [];
const accountsInWork: Record<string, number> = {};

const main = async (ID: string) => {
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
        console.error({
          accountId: ID,
          message: new Error('Reconnect due to set offline'),
        });

        client?._sender?.reconnect();
      }
    }, 10000);

    await new Promise((res) => setTimeout(res, 30000));
    await clearAuthorizations(client);
    const tgFirstName = await accountSetup(client, ID, setuped, firstName);
    const tgAccountId = await usersMe(client, ID, tgId);
    const randomI = Math.floor(Math.random() * 26);

    for (let i = 0; i < 30; i++) {
      accountsInWork[ID] = i + 1;

      let timer;
      const timeout = new Promise(
        (_, rej) =>
          (timer = setTimeout(
            () =>
              rej(
                new Error(`Iteration [${i + 1}] took longer than 30 minutes.`)
              ),
            1800000
          ))
      );

      await Promise.race([
        (async () => {
          if (isAutoResponse) {
            isAutoResponse = false;
            await autoResponse(client, ID, tgAccountId, tgFirstName);
          }

          if (i === randomI) {
            await autoSender(client, ID, tgAccountId);
          }
          await new Promise((res) => setTimeout(res, 60000));
        })(),
        timeout,
      ]);

      timer;
    }
  } catch (e: any) {
    console.error({
      accountId: ID,
      message: new Error(`Main error: ${e.message}`),
    });

    if (e.message.includes('AUTH_KEY_DUPLICATED')) {
      await updateAccountById(ID, {
        banned: true,
        reason: 'AUTH_KEY_DUPLICATED',
      });
      await sendToBot(`!!!AUTH_KEY_DUPLICATED!!! ID: ${ID}`);
      await exec('pm2 kill');
    } else if (e.message.includes('Global Error')) {
      console.error({
        accountId: ID,
        message: new Error(`Stop Account: ${e.message}`),
      });
    } else if (e.message.includes('Stopped')) {
      await updateAccountById(ID, {
        stopped: true,
      });
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
};

getAccounts().then(async (accounts) => {
  console.log({ message: 'ITERATION INIT' });
  const startTime = performance.now();
  // accounts.forEach((accountId: string) => {
  promises.push(main('112834976-rus-support'));
  // });

  const interval = setInterval(() => {
    console.log({
      message: accountsInWork,
      count: Object.keys(accountsInWork).length,
    });
  }, 60000);

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

    await sendToBot(`💥 ITERATION DONE (${timeString}) 💥`);
    clearInterval(interval);
    await sleep(30000);
    console.log({ message: 'ITERATION DONE' });
    process.exit(1);
  });
});

process.on('uncaughtException', async (err) => {
  await sendToBot(`**** UncaughtException ****
Error: ${err.message}`);
  process.exit(1);
});

process.on('unhandledRejection', async (reason, promise) => {
  console.log(reason, promise);
  await sendToBot(`**** UnhandledRejection ****
Reason: ${reason}
Promise: ${promise}`);
  process.exit(1);
});
