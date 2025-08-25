import { TelegramClient } from '../../gramjs';
import { getAccountById, updateAccountById } from '../db/accounts';
import { sleep } from '../helpers/helpers';
import { sendToMainBot } from '../helpers/sendToMainBot';
import { clearAuthorizations } from '../methods/account/clearAuthorizations';
import { updateStatus } from '../methods/account/updateStatus';
import { pingDelayDisconnect } from '../methods/requests/pingDelayDisconnect';
import { handleUpdate } from '../methods/update/handleUpdate';
import { initClient } from '../modules/client';

export const recheck = async (ID: string) => {
  const clients: TelegramClient[] = [];
  const account = await getAccountById(ID);
  if (!account) {
    await sendToMainBot(`⚠️ ACCOUNT_NOT_FOUND (ID: ${ID}) ⚠️`);
    return [];
  }

  const { prefix, nextApiId, dcId } = account;
  if (!dcId || !nextApiId) {
    throw new Error('NOT_ENOUGH_PARAMS');
  }

  try {
    console.warn({
      accountId: ID,
      prefix,
      message: `💥 RE-CHECK ${ID} INIT 💥`,
    });
    const client = await initClient(
      { ...account, prefix, empty: false, apiId: nextApiId },
      (update) => handleUpdate(client, ID, update),
      (error) => sendToMainBot(error)
    );
    clients.push(client);

    let errored: string | null = null;
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

    await sleep(10000);

    if (errored) {
      throw new Error(errored);
    }

    const currentRecheckDates = account.recheckDates || [];
    const newRecheckDates = [...currentRecheckDates, new Date()];
    await updateAccountById(ID, {
      recheckDates: newRecheckDates,
      ...(newRecheckDates.length >= 3 ? { stable: true } : {}),
    });

    return clients;
  } catch (error: any) {
    if (
      [
        'USER_DEACTIVATED_BAN',
        'AUTH_KEY_UNREGISTERED',
        'AUTH_KEY_INVALID',
        'USER_DEACTIVATED',
        'SESSION_REVOKED',
        'SESSION_EXPIRED',
        'AUTH_KEY_DUPLICATED',
        'AUTH_KEY_PERM_EMPTY',
        'SESSION_PASSWORD_NEEDED',
      ].includes(error.message)
    ) {
      for (const client of clients) {
        await client.destroy();
      }

      await updateAccountById(ID, {
        banned: true,
        reason: error.message,
        bannedDate: new Date(),
      });
    }

    console.error({
      accountId: ID,
      prefix,
      message: `[${error.message}]`,
    });
    console.warn({
      accountId: ID,
      prefix,
      message: `💥 RE-CHECK ${ID} EXIT 💥`,
    });

    await sendToMainBot(
      `⚠️ RECHECK_ERROR ⚠️
ACCOUNT_ID: ${ID}
ERROR: ${error.message}`
    );

    return clients;
  }
};
