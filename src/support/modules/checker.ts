import TelegramClient from '../../gramjs/client/TelegramClient';
import { Account } from '../@types/Account';
import { getAccountById, updateAccountById } from '../db/accounts';
import { getTimeString, sleep } from '../helpers/helpers';
import { sendToMainBot } from '../helpers/sendToMainBot';
import { clearAuthorizations } from '../methods/account/clearAuthorizations';
import { setup2FA } from '../methods/account/setup2FA';
import { updateStatus } from '../methods/account/updateStatus';
import { handleUpdate } from '../methods/update/handleUpdate';
import { accountSetup } from './accountSetup';
import { automaticCheck } from './automaticCheck';
import { checkSpamBlock } from './checkSpamBlock';
import { initClient } from './client';

export const checker = async (
  ID: string,
  accountsInWork: Record<string, number>
) => {
  const startTime = performance.now();

  let account: Account | null = null;
  let client: TelegramClient | null = null;
  let errored = false;

  try {
    const randomI = Math.floor(Math.random() * 20) + 10;
    const accountByID = await getAccountById(ID);

    console.warn({
      accountId: ID,
      message: `💥 LOG IN ${ID} 💥`,
      paylod: { count: randomI },
    });

    const { dcId, setuped = false } = accountByID;
    if (!dcId) {
      throw new Error('NOT_ENOUGH_PARAMS');
    }

    account = accountByID;
    client = await initClient(
      { ...account, empty: false },
      (update) => handleUpdate(client, ID, true, update),
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
    await accountSetup(client, account, setuped);

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
          if (i === 0) {
            await automaticCheck(client, account);
          }

          if (i === randomI) {
            await clearAuthorizations(client);
            await automaticCheck(client, account);
            await checkSpamBlock(client, account);
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
      await updateAccountById(ID, {
        banned: true,
        reason: e.message,
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

  delete accountsInWork[ID];

  console.warn({
    accountId: ID,
    message: `💥 EXIT FROM ${ID} (${getTimeString(startTime)}) 💥`,
  });

  return client;
};
