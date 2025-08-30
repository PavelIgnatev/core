import 'dotenv/config';
import './helpers/setConsole.log';

import { exec as childExec } from 'child_process';
import util from 'util';

import TelegramClient from '../gramjs/client/TelegramClient';
import { initClient } from './_client';
import { Account } from './@types/Account';
import {
  getAccountById,
  insertFrozenAccount,
  updateAccountById,
} from './db/accounts';
import { coreDB, logsDB } from './db/db';
import {
  aiReqest,
  aiRetryError,
  allTimings,
  errorSender,
  getTimeString,
  messageStats,
  peerFloods,
  phoneSearchError,
  sleep,
  startSender,
  withoutRecipientError,
} from './helpers/helpers';
import { isTelegramClient } from './helpers/isTelegramClient';
import { getMetricsByAccountId } from './helpers/metrics';
import { sendToMainBot } from './helpers/sendToMainBot';
import { waitConsole } from './helpers/setConsole.log';
import { clearAuthorizations } from './methods/account/clearAuthorizations';
import { updateStatus } from './methods/account/updateStatus';
import { pingDelayDisconnect } from './methods/requests/pingDelayDisconnect';
import { handleUpdate } from './methods/update/handleUpdate';
import { accountSetup } from './modules/accountSetup';
import { automaticCheck } from './modules/automaticCheck';
import { autoResponse } from './modules/autoResponse';
import { autoSender } from './modules/autoSender';
import { personalChannel } from './modules/personalChannel';
import { setup2FA } from './modules/setup2FA';

const exec = util.promisify(childExec);

const starter = async (
  ID: string,
  accountsInWork: Record<string, number>,
  exec: any
) => {
  const startTime = performance.now();
  const isFrozen = ID.includes('frozen');

  let errored: string | boolean = false;
  let isAutoResponse = true;
  let account: Account | null = null;
  let client: TelegramClient | null = null;

  try {
    const randomI = Math.floor(Math.random() * 28) + 1;
    const accountByID = await getAccountById(ID);

    console.warn({
      accountId: ID,
      message: `💥 LOG IN ${ID} 💥`,
      paylod: { count: randomI },
    });

    const { dcId, nextApiId } = accountByID;

    if (!dcId || !nextApiId) {
      throw new Error('NOT_ENOUGH_PARAMS');
    } else {
      account = accountByID;
    }

    client = await initClient(
      { ...account, nextApiId },
      (update) =>
        handleUpdate(
          client,
          ID,
          update,
          () => (isAutoResponse = true),
          (error) => (errored = error)
        ),
      (error) => sendToMainBot(error)
    );

    if (!client) {
      throw new Error('CLIENT_NOT_INITED');
    }

    let updateCounter = 0;
    const updateLoop = async () => {
      try {
        if (
          !client ||
          !client._sender ||
          client._destryed ||
          client._isReconnecting ||
          errored
        ) {
          setTimeout(updateLoop, 20000);
          return;
        }

        await updateStatus(client, false);

        if (updateCounter % 10 === 0) {
          await pingDelayDisconnect(client);
        }
        updateCounter += 1;

        setTimeout(updateLoop, 20000);
      } catch (err: any) {
        await sendToMainBot(`** UPDATE_LOOP_ERROR **
ID: ${ID};
ERROR: ${err.message}`);
        errored = err.message;
      }
    };
    setTimeout(updateLoop, 20000);

    const [meName, meId] = await accountSetup(client, account, isFrozen);

    if (isFrozen) {
      client._endTime = Number(performance.now() - startTime).toFixed(0);
      return client
    }

    await clearAuthorizations(client);
    await setup2FA(client, account);
    // await personalChannel(account, client);

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
            await autoResponse(client, account, meId, meName);
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

    if (
      e.message.includes('GLOBAL_ERROR') ||
      e.message.includes('No workers running') ||
      e.message.includes('ANALYSIS_ERROR')
    ) {
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
    } else if (e.message.includes('ACCOUNT_FROZEN')) {
      if (ID.includes('frozen')) {
        await sendToMainBot(`ACCOUNT_FROZEN_FROM_ITERATION_NOT_CORRECTED
ID: ${ID}`);
      } else if (!account) {
        await sendToMainBot(`ACCOUNT_NOT_FOUND_FOR_RECREATE
ID: ${ID}`);
      } else {
        const { id, _id, ...frozenAccout } = account;

        try {
          await updateAccountById(ID, {
            banned: true,
            reason: 'ACCOUNT_FROZEN',
          });
          await insertFrozenAccount({
            ...(frozenAccout as Account),
            id,
            accountId: `${id}-prefix-frozen`,
          });
        } catch (error) {
          await sendToMainBot(`ACCOUNT_NOT_FOUND_FOR_RECREATE
ID: ${ID}`);
        }
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
ERROR: ${e.message}`
      );
      await client?.destroy();
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
  const isFrozen = accounts.some(accountId => accountId.includes('frozen'));

  await Promise.all([coreDB(), logsDB()]);
  for (const accountId of accounts) {
    promises.push(starter(accountId, accountsInWork, exec));
  }

  const interval = setInterval(() => {
    console.log({
      message: `${isFrozen ? 'FROZEN' : 'REGULAR'} CHUNK #${chunkId} IN PROGRESS (${Object.keys(accountsInWork).length})`,
      accountsInWork,
    });
  }, 60000);

  process.on('uncaughtException', async (err) => {
    await waitConsole();
    console.log({
      message: 'UNCAUGHT_EXCEPTION',
      payload: {
        chunkId,
        error: err.message,
      },
    });
    await sendToMainBot(`** UNCAUGHT_EXCEPTION **
CHUNK_ID: ${chunkId}
ERROR: ${err.message}`);
    process.exit(1);
  });

  process.on('unhandledRejection', async (reason, promise) => {
    await waitConsole();
    console.log({
      message: 'UNHANDLED_REJECTION',
      payload: {
        chunkId,
        reason,
        promise,
      },
    });
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
      const stats = client.getConnectionStats();
      const clientMetrics = getMetricsByAccountId(client._accountId);

      return {
        accountId: client._accountId,
        initTime: client._initTime,
        endTime: client._endTime,
        metrics: clientMetrics?.traffic || {
          sent: 0,
          received: 0,
          sentSize: 0,
          receivedSize: 0,
        },
        ...stats,
      };
    }),
    clientsData: {
      aiReqest,
      aiRetryError,
      allTimings,
      errorSender,
      peerFloods,
      phoneSearchError,
      startSender,
      messageStats,
      withoutRecipientError,
    },
  };
};
