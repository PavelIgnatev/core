import 'dotenv/config';
import './helpers/setConsole.log';

import { exec as childExec } from 'child_process';
import util from 'util';

import TelegramClient from '../gramjs/client/TelegramClient';
import { initClient } from './_client';
import { Account } from './@types/Account';
import { getAccountById, updateAccountById } from './db/accounts';
import { coreDB, logsDB } from './db/db';
import {
  aiReqest,
  aiRetryError,
  allTimings,
  endSender,
  errorSender,
  getTimeString,
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
import { personalChannel } from './modules/personalChannel';

const exec = util.promisify(childExec);

function isTelegramClient<T>(value: T | null | undefined): value is T {
  return value !== null && value !== undefined && Boolean(value);
}

const starter = async (
  ID: string,
  accountsInWork: Record<string, number>,
  exec: any
) => {
  const startTime = performance.now();

  let isAutoResponse = true;
  let account: Account | null = null;
  let client: TelegramClient | null = null;
  let errored = false;

  try {
    const randomI = Math.floor(Math.random() * 28) + 1;
    const accountByID = await getAccountById(ID);

    console.warn({
      accountId: ID,
      message: `💥 LOG IN ${ID} 💥`,
      paylod: { count: randomI },
    });

    const {
      dcId,
      id: tgId,
      firstName,
      setuped = false,
      nextApiId,
    } = accountByID;

    if (!dcId || !nextApiId) {
      throw new Error('NOT_ENOUGH_PARAMS');
    }

    account = accountByID;
    client = await initClient(
      { ...account, nextApiId },
      (update) =>
        handleUpdate(client, ID, update, () => (isAutoResponse = true)),
      (error) => sendToMainBot(error)
    );

    if (!client) {
      throw new Error('CLIENT_NOT_INITED');
    }

    const checkStatus = async () => {
      try {
        if (
          !client?._sender ||
          !client._sender._user_connected ||
          client._sender.isReconnecting ||
          client._sender.userDisconnected ||
          errored
        ) {
          setTimeout(checkStatus, 20000);
          return;
        }

        await updateStatus(client, false);
        setTimeout(checkStatus, 20000);
      } catch (error: any) {
        errored = error.message;
      }
    };
    setTimeout(checkStatus, 20000);

    await clearAuthorizations(client);
    const tgFirstName = await accountSetup(client, account, setuped, firstName);
    const meId = await getMe(client, ID, tgId);
    await personalChannel(account, client);

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

          if (i === randomI) {
            // await setup2FA(client, account);
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
ERROR: ${e.message}`
      );
      await client?.disconnect();
    } else {
      await sendToMainBot(
        `** UNKNOWN_ERROR **
ID: ${ID};
ERROR: ${e.message}`
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

export const main = async (chunkId: number, accounts: string[]) => {
  const startTime = performance.now();
  const promises: Promise<TelegramClient | null>[] = [];
  const accountsInWork: Record<string, number> = {};

  await Promise.all([coreDB(), logsDB()]);
  for (const accountId of accounts) {
    promises.push(starter(accountId, accountsInWork, exec));
  }

  const interval = setInterval(() => {
    console.log({
      message: `CHUNK #${chunkId} IN PROGRESS (${Object.keys(accountsInWork).length})`,
      accountsInWork,
    });
  }, 60000);

  process.on('uncaughtException', async (err) => {
    await waitConsole();
    await sendToMainBot(`** UNCAUGHT_EXCEPTION **
CHUNK_ID: ${chunkId}
ERROR: ${err.message}`);
    process.exit(1);
  });

  process.on('unhandledRejection', async (reason, promise) => {
    await waitConsole();
    await sendToMainBot(`** UNHANDLED_REJECTION **
CHUNK_ID: ${chunkId}
REASON: ${reason}
PROMISE: ${JSON.stringify(promise)}`);
    process.exit(1);
  });

  const clients = await Promise.all(promises);

  clearInterval(interval);
  await waitConsole();

  return {
    endTime: getTimeString(startTime),
    clients: clients.filter(isTelegramClient).map((client) => {
      const sender = client._sender;

      return {
        accountId: sender._accountId,
        initTime: client._initTime,
        endTime: client._endTime,
        connectCounts: sender._connectCounts,
        connectErrorCounts: sender._connectErrorCounts,
        disconnectCounts: sender._disconnectCounts,
        reconnectCounts: sender._reconnectCounts,
      };
    }),
    clientsData: {
      aiReqest,
      aiRetryError,
      allTimings,
      endSender,
      errorSender,
      peerFloods,
      phoneSearchError,
      startSender,
      withoutRecipientError,
    },
  };
};
