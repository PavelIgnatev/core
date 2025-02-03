import { TelegramClient } from '../../gramjs';
import { getAccountById, updateAccountById } from '../db/accounts';
import { sleep } from '../helpers/helpers';
import { sendToMainBot } from '../helpers/sendToMainBot';
import { clearAuthorizations } from '../methods/account/clearAuthorizations';
import { updateStatus } from '../methods/account/updateStatus';
import { handleUpdate } from '../methods/update/handleUpdate';
import { initClient } from '../modules/client';

export const recheck = async (ID: string) => {
  const clients: TelegramClient[] = [];
  const account = await getAccountById(ID);
  if (!account) {
    await sendToMainBot(`⚠️ ACCOUNT_NOT_FOUND (ID: ${ID}) ⚠️`);
    return [];
  }

  const { prefix } = account;

  try {
    console.warn({
      accountId: ID,
      prefix,
      message: `💥 RE-CHECK ${ID} INIT 💥`,
    });
    const client = await initClient(
      { ...account, prefix, empty: false, apiId: 2040 },
      (update) => handleUpdate(client, ID, update),
      (error) => sendToMainBot(error)
    );
    clients.push(client);

    let errored: string | null = null;
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

    await clearAuthorizations(client);

    await sleep(180000);

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
