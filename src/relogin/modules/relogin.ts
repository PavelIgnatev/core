import BigInt from 'big-integer';

import { TelegramClient } from '../../gramjs';
import GramJs from '../../gramjs/tl/api';
import {
  LoginCodeHandler,
  LoginCodeResult,
  TelegramLoginUpdate,
} from '../@types/Telegram';
import { getAccountById, updateAccountById } from '../db/accounts';
import { sendToMainBot } from '../helpers/sendToMainBot';
import { clearAuthorizations } from '../methods/account/clearAuthorizations';
import { setup2FA } from '../methods/account/setup2FA';
import { deleteHistory } from '../methods/messages/deleteHistory';
import { getMe } from '../methods/users/getMe';
import { initClient } from '../modules/client';
import { invokeRequest } from './invokeRequest';

const API_PAIRS: Record<number, string> = {
  4: '014b35b6184100b085b0d0572f9b5103',
  5: '1c5c96d5edd401b1ed40db3fb5633e2d',
  6: 'eb06d4abfb49dc3eeb1aeb98ae0f581e',
  8: '7245de8e747a0d6fbe11f7cc14fcc0bb',
  9: '3975f648bb682ee889f35483bc618d1c',
  2040: 'b18441a1ff607e10a989891a5462e627',
  2496: '8da85b0d5bfe62527e5b244c209159c3',
  2834: '68875f756c9b437a8b916ca3de215815',
  2899: '36722c72256a24c1225de00eb6a1ca74',
  10840: '33c45224029d59cb3ad0c16134215aeb',
  16623: '8c9dbfe58437d1739540f5d53c72ae4b',
  17349: '344583e45741c457fe1862106095a5eb',
  21724: '3e0cb5efcd52300aec5994fdfc5bdc16',
  94575: 'a3406de8d171bb422bb6ddf3bbd800e2',
  611335: 'd524b414d21f4d37f08684c1df41ac9c',
};

const createLoginCodeHandler = (): LoginCodeHandler => {
  let resolveRef: ((code: string) => void) | null = null;

  const promise = new Promise<string>((resolve) => {
    resolveRef = resolve;
  });

  const handleUpdate = (update: TelegramLoginUpdate) => {
    const isServiceMessage =
      (update.className === 'UpdateShortMessage' ||
        update.className === 'UpdateNewMessage') &&
      String(update.userId) === '777000';

    if (!isServiceMessage || !update.message) return;

    const numbers = update.message.match(/\d+/g);
    const code = numbers?.find((num) => num.length === 5);

    if (code && resolveRef) {
      resolveRef(code);
    }
  };

  return { promise, handleUpdate };
};

const requestLoginCode = async (
  client: TelegramClient,
  phoneNumber: string,
  codePromise: Promise<string>,
  currentApiId: number
): Promise<LoginCodeResult> => {
  const apiHash = API_PAIRS[currentApiId];
  if (!apiHash) {
    await sendToMainBot(`⚠️ API_HASH_NOT_FOUND ⚠️
ACCOUNT_ID: ${client._accountId}
ERROR: API_HASH_NOT_FOUND`);
    currentApiId = 2040;
  }

  try {
    const sendCodeResponse = await invokeRequest(
      client,
      new GramJs.auth.SendCode({
        phoneNumber,
        apiId: 611335,
        apiHash: API_PAIRS[611335],
        settings: new GramJs.CodeSettings(),
      })
    );

    const isValidResponse =
      sendCodeResponse &&
      sendCodeResponse instanceof GramJs.auth.SentCode &&
      sendCodeResponse.type instanceof GramJs.auth.SentCodeTypeApp &&
      typeof sendCodeResponse.phoneCodeHash === 'string';

    if (!isValidResponse) {
      return {
        error: 'SENT_CODE_ERROR',
      };
    }

    const { phoneCodeHash } = sendCodeResponse;

    try {
      const code = await Promise.race([
        codePromise,
        new Promise<never>((_, reject) => {
          setTimeout(() => reject(new Error('CODE_TIMEOUT')), 30000);
        }),
      ]);

      return {
        code,
        phoneCodeHash,
      };
    } catch (error) {
      return {
        error: 'CODE_TIMEOUT',
        phoneCodeHash,
      };
    }
  } catch (error) {
    return {
      error: String(error),
    };
  }
};

export const relogin = async (ID: string) => {
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
      message: `💥 RE-LOGIN ${ID} INIT 💥`,
    });

    const loginCodeHandler = createLoginCodeHandler();
    const client = await initClient(
      { ...account, prefix, empty: false },
      (update) => {
        loginCodeHandler.handleUpdate(update);
      },
      (error) => sendToMainBot(error)
    );
    clients.push(client);

    const currentApiId = await clearAuthorizations(client);
    if (!currentApiId) {
      throw Error('CURRENT_API_ID_NOT_FOUND');
    }

    await setup2FA(client, account);

    const { id, phone: phoneNumber } = await getMe(client, ID);

    const isExists = await getAccountById(id);
    if (isExists) {
      await updateAccountById(ID, {
        banned: true,
        reason: 'ACCOUNT_ALREADY_EXISTS',
        bannedDate: new Date(),
      });
      throw new Error('ACCOUNT_ALREADY_EXISTS');
    }

    const clientReLogin = await initClient(
      {
        accountId: id,
        prefix,
        dcId: account.dcId,
        empty: true,
      },
      () => {},
      (error) => sendToMainBot(error)
    );
    clients.push(clientReLogin);

    const codeResult = await requestLoginCode(
      clientReLogin,
      phoneNumber,
      loginCodeHandler.promise,
      currentApiId
    );

    if (codeResult.error) {
      throw Error(codeResult.error);
    }
    if (!codeResult.code || !codeResult.phoneCodeHash) {
      throw Error('CODE_ERROR');
    }

    const signIn = await invokeRequest(
      clientReLogin,
      new GramJs.auth.SignIn({
        phoneNumber,
        phoneCodeHash: codeResult.phoneCodeHash,
        phoneCode: codeResult.code,
      })
    );

    if (!signIn || signIn instanceof GramJs.auth.AuthorizationSignUpRequired) {
      throw Error('SIGN_IN_ERROR');
    }

    const sessionData = clientReLogin.session.getSessionData();
    const { keys, mainDcId } = sessionData;
    if (!keys || !Object.keys(keys) || !mainDcId || !keys[mainDcId]) {
      throw Error('SESSION_DATA_ERROR');
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
    await updateAccountById(ID, {
      workedOut: true,
      error: null,
      reloginDate: new Date(),
    });
    await deleteHistory(
      client,
      new GramJs.InputPeerUser({
        userId: BigInt(777000),
        accessHash: BigInt(0),
      }),
      true
    );
    await invokeRequest(client, new GramJs.auth.LogOut());

    console.warn({
      accountId: ID,
      prefix,
      message: `💥 RE-LOGIN ${ID} EXIT 💥`,
      payload: { nextId: id },
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
      message: `💥 RE-LOGIN ${ID} EXIT 💥`,
    });

    await updateAccountById(ID, {
      error: error.message,
      reloginAttemptDate: new Date(),
    });
    await sendToMainBot(
      `⚠️ RELOGIN_ERROR ⚠️
ACCOUNT_ID: ${ID}
ERROR: ${error.message}`
    );

    return clients;
  }
};
