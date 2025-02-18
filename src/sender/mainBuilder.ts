import TelegramClient from '../gramjs/client/TelegramClient';
import { Account } from './@types/Account';
import { initClient } from './client';
import { getAccountById, updateAccountById } from './db/accounts';
import { getTimeString, sleep } from './helpers/helpers';
import { sendToMainBot } from './helpers/sendToMainBot';
import { clearAuthorizations } from './methods/account/clearAuthorizations';
import { setup2FA } from './methods/account/setup2FA';
import { updateStatus } from './methods/account/updateStatus';
import { handleUpdate } from './methods/update/handleUpdate';
import { getMe } from './methods/users/getMe';
import { accountSetup } from './modules/accountSetup';
import { automaticCheck } from './modules/automaticCheck';
import { autoResponse } from './modules/autoResponse';
import { autoSender } from './modules/autoSender';

const main = async (
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
    const randomI = Math.floor(Math.random() * 30);
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

    // let i = -1;
    // while (true) {
    //   if (errored) {
    //     throw new Error(errored);
    //   }

    //   i += 1;
    //   accountsInWork[ID] = i;

    //   if (i === 30) {
    //     client._endTime = Number(performance.now() - startTime).toFixed(0);
    //   }

    //   if (Object.values(accountsInWork).every((n) => n >= 30)) {
    //     break;
    //   }

    //   let timer;
    //   const timeout = new Promise(
    //     (_, rej) =>
    //       (timer = setTimeout(
    //         () => rej(new Error(`ITERATION_TIMEOUT_EXITED: ${i}`)),
    //         900000
    //       ))
    //   );

    //   await Promise.race([
    //     (async () => {
    //       if (isAutoResponse) {
    //         isAutoResponse = false;
    //         await autoResponse(client, ID, meId, tgFirstName);
    //       }

    //       if (i === randomI) {
    //         await setup2FA(client, account);
    //         await automaticCheck(client, account);
    //         await autoSender(client, ID, meId);
    //       }
    //       await sleep(60000);
    //     })(),
    //     timeout,
    //   ]);

    //   clearTimeout(timer);
    // }
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
      await client?.disconnect();
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

export { main };
