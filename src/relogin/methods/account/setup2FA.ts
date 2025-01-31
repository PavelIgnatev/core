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

    throw new Error('ACCOUNT_HAVE_2FA');
  } catch (e: any) {
    if (e.message === 'PASSWORD_EMPTY') {
      await updateAccountById(client._accountId, {
        twoFa: false,
      });
      return;
    }

    throw new Error(e.message);
  }
};
