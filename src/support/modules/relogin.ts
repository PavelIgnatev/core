import { TelegramClient } from '../../gramjs';
import GramJs from '../../gramjs/tl/api';
import { getAccountById, updateAccountById } from '../db/accounts';
import { sleep } from '../helpers/helpers';
import { sendToMainBot } from '../helpers/sendToMainBot';
import { clearAuthorizations } from '../methods/account/clearAuthorizations';
import { setup2FA } from '../methods/account/setup2FA';
import { handleUpdate } from '../methods/update/handleUpdate';
import { getMe } from '../methods/users/getMe';
import { initClient } from '../modules/client';
import { invokeRequest } from './invokeRequest';

interface CodePromise {
  promise: Promise<string>;
  resolve: (code: string) => void;
}

export const relogin = async (ID: string) => {
  const createCodePromise = (): CodePromise => {
    let resolveRef: (code: string) => void;
    const promise = new Promise<string>((resolve) => {
      resolveRef = resolve;
    });
    return { promise, resolve: resolveRef! };
  };

  const codePromise = createCodePromise();

  const handleUpdateWithCode = (update: any) => {
    if (
      (update.className === 'UpdateShortMessage' ||
        update.className === 'UpdateNewMessage') &&
      String(update.userId) === '777000' &&
      (update.message?.includes('Login code:') ||
        update.message?.includes('Код для входа в Telegram:') ||
        update.message?.includes('Код для входу'))
    ) {
      const code = update.message.match(
        /(?:Login code: |Код для входа в Telegram: |Код для входу[^:]*: )(\d+)/
      )?.[1];
      if (code) {
        codePromise.resolve(code);
      }
    }
  };

  const clients: TelegramClient[] = [];

  try {
    const account = await getAccountById(ID);
    const { prefix } = account;

    if (!prefix) {
      throw new Error('PREFIX_NOT_DEFINED');
    }

    console.warn({
      accountId: ID,
      message: `💥 LOG IN FOR RELOGIN ${ID} 💥`,
    });

    const client = await initClient(
      { ...account, empty: false },
      (update) => {
        handleUpdate(null, ID, false, update);
        handleUpdateWithCode(update);
      },
      (error) => sendToMainBot(error)
    );

    await clearAuthorizations(client);
    const twoFa = await setup2FA(client, account);
    if (twoFa) {
      console.error({
        accountId: ID,
        message: `[ACCOUNT_HAVE_2FA]`,
      });
      return [client];
    }

    const { id, phone: phoneNumber } = await getMe(client, ID);

    const clientReLogin = await initClient(
      {
        accountId: id,
        dcId: account.dcId,
        empty: true,
      },
      (update) => handleUpdate(null, id, false, update),
      (error) => sendToMainBot(error)
    );
    clients.push(clientReLogin);

    await clientReLogin.start();

    //2496
    //8da85b0d5bfe62527e5b244c209159c3
    const sendCode = await invokeRequest(
      clientReLogin,
      new GramJs.auth.SendCode({
        phoneNumber,
        apiId: 2040,
        apiHash: 'b18441a1ff607e10a989891a5462e627',
        settings: new GramJs.CodeSettings(),
      })
    );

    if (
      !sendCode ||
      !(sendCode instanceof GramJs.auth.SentCode) ||
      !(sendCode.type instanceof GramJs.auth.SentCodeTypeApp) ||
      typeof sendCode.phoneCodeHash !== 'string'
    ) {
      console.error({
        accountId: id,
        message: `[SENT_CODE_ERROR]`,
        payload: sendCode,
      });
      throw Error('SENT_CODE_ERROR');
    }

    const { phoneCodeHash } = sendCode;

    let phoneCode: string;
    try {
      phoneCode = await Promise.race([
        codePromise.promise,
        new Promise<never>((_, reject) => {
          setTimeout(() => reject(new Error('CODE_TIMEOUT')), 10000);
        }),
      ]);
    } catch (error) {
      console.error({
        accountId: id,
        message: `[CODE_TIMEOUT]`,
        payload: error,
      });
      throw error;
    }

    const signIn = await invokeRequest(
      clientReLogin,
      new GramJs.auth.SignIn({
        phoneNumber,
        phoneCodeHash,
        phoneCode,
      })
    );

    if (!signIn || signIn instanceof GramJs.auth.AuthorizationSignUpRequired) {
      console.error({
        accountId: id,
        message: `[SIGN_IN_ERROR]`,
        payload: signIn,
      });
      throw Error('SIGN_IN_ERROR');
    }

    const sessionData = clientReLogin.session.getSessionData();
    const { keys, mainDcId } = sessionData;
    if (!keys || !Object.keys(keys) || !mainDcId || !keys[mainDcId]) {
      console.error({
        accountId: id,
        message: `[KEYS_EMPTY_ERROR]`,
        payload: sessionData,
      });
      throw Error('KEYS_EMPTY_ERROR');
    }

    const data: Record<string, any> = {
      accountId: id,
      parentAccountId: ID,
      phone: phoneNumber,
      dcId: Number(mainDcId),
      prefix,
    };
    data[`dc${mainDcId}`] = keys[mainDcId];

    await updateAccountById(id, data);
    await updateAccountById(ID, { workedOut: true });
    await invokeRequest(client, new GramJs.auth.LogOut());

    await sleep(2000);
    await clearAuthorizations(clientReLogin);

    return [client, clientReLogin];
  } catch (error) {
    await sendToMainBot(
      `⚠️ RELOGIN_ERROR ⚠️
ACCOUNT_ID: ${ID}
ERROR: ${error}`
    );

    return clients;
  }
};
