import TelegramClient from '../../gramjs/client/TelegramClient';
import { Account } from '../@types/Account';
import { getAccountById, updateAccountById } from '../db/accounts';
import { getTimeString, sleep } from '../helpers/helpers';
import { sendToMainBot } from '../helpers/sendToMainBot';
import { clearAuthorizations } from '../methods/account/clearAuthorizations';
import { setup2FA } from '../methods/account/setup2FA';
import { updateStatus } from '../methods/account/updateStatus';
import { clearAllTrash } from '../methods/messages/clearAllTrash';
import { handleUpdate } from '../methods/update/handleUpdate';
import { accountSetup } from './accountSetup';
import { automaticCheck } from './automaticCheck';
import { checkSpamBlock } from './checkSpamBlock';
import { initClient } from './client';

const isCheckMethods = (account: Account) => {
  if (!account.checkDate) {
    return true;
  }

  const days =
    (new Date().getTime() - new Date(account.checkDate).getTime()) / 86400000;

  return days >= 1;
};

export const checker = async (
  ID: string,
  accountsInWork: Record<string, number>
) => {
  const startTime = performance.now();

  let account: Account | null = null;
  let client: TelegramClient | null = null;
  let errored = false;

  const accountByID = await getAccountById(ID);
  const { prefix } = accountByID;

  if (!prefix) {
    await sendToMainBot(`PREFIX_NOT_DEFINED: ${ID}`);
    return;
  }

  try {
    const randomI = Math.floor(Math.random() * 20) + 10;

    console.warn({
      accountId: ID,
      prefix,
      message: `💥 LOG IN ${ID} 💥`,
      paylod: { count: randomI },
    });

    const { dcId, setuped = false, nextApiId } = accountByID;
    if (!dcId || !nextApiId) {
      throw new Error('NOT_ENOUGH_PARAMS');
    }

    account = accountByID;
    client = await initClient(
      { ...account, prefix, apiId: nextApiId || 2040 },
      true,
      (update) => handleUpdate(client, ID, true, update),
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
            await clearAuthorizations(client);

            if (isCheckMethods(account)) {
              await setup2FA(client, account);
              await accountSetup(client, account, setuped);
              await clearAllTrash(client);
              await updateAccountById(ID, {
                checkDate: new Date(),
              });
            }

            await checkSpamBlock(client, account);
          }

          if (i === randomI) {
            await automaticCheck(client, account);
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
      prefix,
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

  delete accountsInWork[ID];

  console.warn({
    accountId: ID,
    prefix,
    message: `💥 EXIT FROM ${ID} (${getTimeString(startTime)}) 💥`,
  });

  return client;
};
