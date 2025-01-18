import { exec as childExec } from 'child_process';

import 'dotenv/config';
import './helpers/setConsole.log';

import util from 'util';

import { Account } from './@types/Account';
import { clearAuthorizations } from './common/gramjs/client/auth';
import TelegramClient from './common/gramjs/client/TelegramClient';
import { getAccountById, getAccounts, updateAccountById } from './db/accounts';
import {
  endSender,
  errorSender,
  getTimeString,
  iterationErrors,
  peerFloods,
  phoneSearchError,
  reconnectErrors,
  sleep,
  startSender,
} from './helpers/helpers';
import { sendToMainBot } from './helpers/sendToMainBot';
import { updateStatus } from './methods/account/updateStatus';
import { handleUpdate } from './methods/update/handleUpdate';
import { getMe } from './methods/users/getMe';
import { accountSetup } from './modules/accountSetup';
import { automaticCheck } from './modules/automaticCheck';
import { autoResponse } from './modules/autoResponse';
import { autoSender } from './modules/autoSender';
import { initClient } from './modules/initClient';

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
  let account: Account | null = null;
  let client: TelegramClient | null = null;
  let errored = false;

  try {
    const accountByID = await getAccountById(ID);

    const {
      dcId,
      platform,
      userAgent,
      setuped = false,
      id: tgId,
      firstName,
    } = accountByID;

    if (![dcId, platform, userAgent].every(Boolean)) {
      throw new Error('NOT_ENOUGH_PARAMS');
    }

    account = accountByID;

    client = await initClient(account, ID, (update: any) =>
      handleUpdate(ID, update, () => (isAutoResponse = true))
    );

    if (!client) {
      throw new Error('CLIENT_NOT_INITED');
    }

    setOnlineInterval = setInterval(async () => {
      try {
        if (
          !client?._sender ||
          !client._sender._user_connected ||
          client._sender.isReconnecting ||
          errored
        ) {
          return;
        }

        const timeoutPromise = new Promise((_, reject) => {
          setTimeout(() => {
            reject(new Error('RECONNECT'));
          }, 10000);
        });

        await Promise.race([updateStatus(client, false), timeoutPromise]);
      } catch (error: any) {
        if (error.message === 'RECONNECT') {
          console.warn({
            accountId: ID,
            message: 'RECONNECT_DUE_TO_SET_OFFLINE',
          });
          reconnectErrors[ID] = (reconnectErrors[ID] || 0) + 1;
          client?._sender?.reconnect();
        } else {
          errored = error.message;
        }
      }
    }, 10000);

    await sleep(30000);
    await clearAuthorizations(client);
    const tgFirstName = await accountSetup(client, account, setuped, firstName);
    const meId = await getMe(client, ID, tgId);
    const randomI = Math.floor(Math.random() * 30);

    console.log({
      accountId: ID,
      message: `Random number: ${randomI}`,
    });

    let i = -1;
    while (true) {
      if (errored) {
        throw new Error(errored);
      }

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
          if (isAutoResponse && !account.fucker) {
            isAutoResponse = false;
            await autoResponse(client, ID, meId, tgFirstName);
          }

          if (i === randomI) {
            await automaticCheck(client, ID);
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
      message: new Error(`MAIN_ERROR: ${e.message}`),
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
      await sendToMainBot(`** AUTH KEY DUPLICATED **
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

  if (setOnlineInterval) {
    clearInterval(setOnlineInterval);
  }

  if (client) {
    await client.destroy();
  }

  console.log({
    accountId: ID,
    message: `💥 EXIT FROM ${ID} (${getTimeString(startTime)}) 💥`,
  });
};

getAccounts().then(async (accounts) => {
  console.log({ message: '💥 ITERATION INIT 💥' });
  const startTime = performance.now();

  accounts.forEach((accountId: string) => {
    promises.push(main(accountId));
  });
  // 447828819872-2026165-en

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
    console.log({
      message: `💥 ITERATION DONE (${getTimeString(startTime)}) 💥`,
      peerFloods,
      reconnectErrors,
      iterationErrors,
      phoneSearchError,
    });
    await sendToMainBot(`💥 ITERATION DONE (${getTimeString(startTime)}) 💥
ИНИЦИИРОВАНО ОТПРАВОК: ${Object.keys(startSender).length}
ПОДТВЕРЖДЕНО ОТПРАВОК: ${Object.keys(endSender).length}
КОЛИЧЕСТВО ОШИБОК: ${Object.keys(errorSender).length}
КОЛИЧЕСТВО PEER FLOOD: ${Object.keys(peerFloods).length}
КОЛИЧЕСТВО STABLE RESULT ERRORS: ${Object.keys(phoneSearchError).length}
КОЛИЧЕСТВО RECONNECT ERRORS: ${Object.keys(reconnectErrors).length}
КОЛИЧЕСТВО ITERATION ERRORS: ${Object.keys(iterationErrors).length}`);
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
