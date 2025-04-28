import TelegramClient from '../../gramjs/client/TelegramClient';
import { Account } from '../@types/Account';
import { getAccountById, updateAccountById } from '../db/accounts';
import { getTimeString, sleep } from '../helpers/helpers';
import { sendToMainBot } from '../helpers/sendToMainBot';
import { clearAuthorizations } from '../methods/account/clearAuthorizations';
import { updateStatus } from '../methods/account/updateStatus';
import { clearAllTrash } from '../methods/messages/clearAllTrash';
import { pingDelayDisconnect } from '../methods/requests/pingDelayDisconnect';
import { handleUpdate } from '../methods/update/handleUpdate';
import { accountSetup } from './accountSetup';
import { automaticCheck } from './automaticCheck';
import { initClient } from './client';
import { parser } from './parser';

const isCheckMethods = (account: Account) => {
  if (!account.checkDate) {
    return true;
  }

  const days =
    (new Date().getTime() - new Date(account.checkDate).getTime()) / 86400000;

  return days >= 1;
};

export const starter = async (ID: string) => {
  const startTime = performance.now();

  let account: Account | null = null;
  let client: TelegramClient | null = null;
  let errored = false;

  const accountByID = await getAccountById(ID);

  try {
    const randomI = Math.floor(Math.random() * 20) + 10;

    console.warn({
      accountId: ID,
      prefix: 'GLOBAL_METRICS_PARSER',
      message: `💥 LOG IN ${ID} 💥`,
      paylod: { count: randomI },
    });

    const { dcId, nextApiId } = accountByID;
    if (!accountByID || !dcId || !nextApiId) {
      throw new Error('NOT_ENOUGH_PARAMS');
    }

    account = accountByID as Account;
    client = await initClient(
      { ...account, prefix: 'GLOBAL_METRICS_PARSER', apiId: nextApiId || 2040 },
      true,
      (update) => handleUpdate(client, ID, true, update),
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

        if (++updateCounter % 10 === 0) {
          await pingDelayDisconnect(client);
        }

        setTimeout(updateLoop, 20000);
      } catch (err: any) {
        errored = err.message;
      }
    };
    setTimeout(updateLoop, 20000);

    await clearAuthorizations(client);

    let timer;
    const timeout = new Promise(
      (_, rej) =>
        (timer = setTimeout(
          () => rej(new Error(`ITERATION_TIMEOUT_EXITED`)),
          900000
        ))
    );

    await Promise.race([
      (async () => {
        (async () => {
          while (true) {
            if (errored) {
              throw new Error(errored);
            }
            await sleep(1000);
          }
        })();

        if (isCheckMethods(account)) {
          await accountSetup(client, account);
          await clearAllTrash(client);
          await automaticCheck(client, account);
          await updateAccountById(ID, {
            checkDate: new Date(),
          });
        }

        await parser(ID, client);

        await sleep(60000);
      })(),
      timeout,
    ]);

    clearTimeout(timer);

    client._endTime = Number(performance.now() - startTime).toFixed(0);
  } catch (e: any) {
    console.error({
      accountId: ID,
      prefix: 'GLOBAL_METRICS_PARSER',
      message: `MAIN_ERROR (${e.message})`,
    });

    if (
      [
        'USER_DEACTIVATED_BAN',
        'AUTH_KEY_UNREGISTERED',
        'AUTH_KEY_INVALID',
        'USER_DEACTIVATED',
        'SESSION_REVOKED',
        'SESSION_EXPIRED',
        'AUTH_KEY_PERM_EMPTY',
        'SESSION_PASSWORD_NEEDED',
        'AUTH_KEY_DUPLICATED',
      ].includes(e.message)
    ) {
      await client?.destroy();

      await updateAccountById(ID, {
        banned: true,
        reason: e.message,
        bannedDate: new Date(),
      });
      await sendToMainBot(
        `💀 BAN: ${e.message} 💀
ID: ${ID}`
      );
    } else {
      await sendToMainBot(
        `** UNKNOWN_ERROR **
ID: ${ID}
Error: ${e.message}`
      );
    }
  }

  console.warn({
    accountId: ID,
    prefix: 'GLOBAL_METRICS_PARSER',
    message: `💥 EXIT FROM ${ID} (${getTimeString(startTime)}) 💥`,
  });

  return client;
};
