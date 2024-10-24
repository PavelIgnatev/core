import { Account } from '../@types/Account';
import { init } from '../common/gramjs';
import TelegramClient from '../common/gramjs/client/TelegramClient';
import { updateAccountById } from '../db/accounts';

export const initClient = async (
  account: Account,
  accountId: string,
  onUpdate: any
): Promise<TelegramClient> => {
  try {
    const timeoutPromise = new Promise((_, reject) => {
      setTimeout(() => {
        reject(new Error('TIMEOUT_ERROR'));
      }, 90000);
    });

    const client = await Promise.race([
      init(account, accountId, onUpdate),
      timeoutPromise,
    ]);

    if (!client) {
      throw new Error('Global Error (client not inited)');
    }

    return client as TelegramClient;
  } catch (e: any) {
    if (e.message === 'TIMEOUT_ERROR') {
      console.error({
        accountId,
        message: new Error(`Timeout error. Retrying init client...`),
      });
      return await initClient(account, accountId, onUpdate);
    }

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
      ].includes(e.message)
    ) {
      console.error({
        accountId,
        message: new Error(e.message),
      });

      await updateAccountById(account.accountId, {
        banned: true,
        reason: e.message,
      });
      throw new Error(e.message);
    }

    throw new Error(e.message);
  }
};
