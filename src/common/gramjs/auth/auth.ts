import Api from '../tl/api';
import TelegramClient from './TelegramClient';

export interface UserAuthParams {
  phoneNumber: string | (() => Promise<string>);
  webAuthTokenFailed: () => void;
  phoneCode: (isCodeViaApp?: boolean) => Promise<string>;
  password: (hint?: string, noReset?: boolean) => Promise<string>;
  firstAndLastNames: () => Promise<[string, string?]>;
  qrCode: (qrCode: { token: Buffer; expires: number }) => Promise<void>;
  onError: (err: Error) => void;
  forceSMS?: boolean;
  initialMethod?: 'phoneNumber' | 'qrCode';
  shouldThrowIfUnauthorized?: boolean;
  webAuthToken?: string;
  mockScenario?: string;
}

export async function signInUser(client: TelegramClient) {
  try {
    // console.log(client)

    // // console.log(client)
    // console.log(sendResult);

    // if (!(sendResult instanceof Api.auth.SentCode)) {
    //   throw Error('Unexpected SentCodeSuccess');
    // }

    // if (!(sendResult.type instanceof Api.auth.SentCodeTypeApp)) {
    //   throw Error('Unexpected SentCodeSuccess');
    // }

    // const { phoneCodeHash } = sendResult;

    // if (typeof phoneCodeHash !== 'string') {
    //   throw new Error('Failed to retrieve phone code hash');
    // }
    // console.log(sendResult);

    try {
      const sendResult = await client.invoke(
        new Api.auth.SendCode({
          phoneNumber: '+77058226192',
          apiId: 2496,
          apiHash: '8da85b0d5bfe62527e5b244c209159c3',
          settings: new Api.CodeSettings(),
        })
      );
      console.log(sendResult, '1');

    } catch {
      const sendResult = await client.invoke(
        new Api.auth.SendCode({
          phoneNumber: '+77058226192',
          apiId: 2496,
          apiHash: '8da85b0d5bfe62527e5b244c209159c3',
          settings: new Api.CodeSettings(),
        })
      );
      console.log(sendResult, '2');
    }

    // const result = await client.invoke(
    //   new Api.auth.SignIn({
    //     phoneNumber: '+77058226192',
    //     phoneCodeHash: '54d4b4d468f6e2a400',
    //     phoneCode: '17468',
    //   })
    // );

    // console.log(result);
    // const sendResult = await client.invoke(
    //   new Api.auth.ImportWebTokenAuthorization({
    //     //@ts-ignore
    //     webAuthToken: result.futureAuthToken,
    //     apiId: 2496,
    //     apiHash: '8da85b0d5bfe62527e5b244c209159c3',
    //   })
    // );

    // console.log(sendResult)
  } catch (err: any) {}

  return;

  let phoneCode;
  let isRegistrationRequired = false;
  let termsOfService;

  // eslint-disable-next-line no-constant-condition
  while (1) {
    try {
      try {
        phoneCode = '12345'; // phone code
      } catch (err: any) {
        // This is the support for changing phone number from the phone code screen.
        if (err.message === 'RESTART_AUTH') {
          // restarrt
        }
      }

      if (!phoneCode) {
        throw new Error('Code is empty');
      }

      // May raise PhoneCodeEmptyError, PhoneCodeExpiredError,
      // PhoneCodeHashEmptyError or PhoneCodeInvalidError.
      const result = await client.invoke(
        new Api.auth.SignIn({
          phoneNumber,
          phoneCodeHash,
          phoneCode,
        })
      );

      if (result instanceof Api.auth.AuthorizationSignUpRequired) {
        isRegistrationRequired = true;
        termsOfService = result.termsOfService;
        break;
      }

      return result.user;
    } catch (err: any) {
      if (err.message === 'SESSION_PASSWORD_NEEDED') {
        //SESSION_PASSWORD_NEEDED
      } else {
        // error
      }
    }
  }

  //   if (isRegistrationRequired) {
  //     // eslint-disable-next-line no-constant-condition
  //     while (1) {
  //       try {
  //         const [firstName, lastName] = await authParams.firstAndLastNames();
  //         if (!firstName) {
  //           throw new Error('First name is required');
  //         }

  //         const { user } = (await client.invoke(
  //           new Api.auth.SignUp({
  //             phoneNumber,
  //             phoneCodeHash,
  //             firstName,
  //             lastName,
  //           })
  //         )) as Api.auth.Authorization;

  //         if (termsOfService) {
  //           // This is a violation of Telegram rules: the user should be presented with and accept TOS.
  //           await client.invoke(
  //             new Api.help.AcceptTermsOfService({ id: termsOfService.id })
  //           );
  //         }

  //         return user;
  //       } catch (err: any) {
  //         authParams.onError(err);
  //       }
  //     }
  //   }
}

async function sendCode(
  client: TelegramClient,
  phoneNumber: string,
  forceSMS = false
): Promise<{
  phoneCodeHash: string;
  isCodeViaApp: boolean;
}> {
  try {
    console.log('z nene');

    const sendResult = await client.invoke(
      new Api.auth.SendCode({
        phoneNumber: '+77058226192',
        apiId: 2496,
        apiHash: '8da85b0d5bfe62527e5b244c209159c3',
        settings: new Api.CodeSettings(),
      })
    );
    console.log(sendResult);

    if (!(sendResult instanceof Api.auth.SentCode)) {
      throw Error('Unexpected SentCodeSuccess');
    }

    // If we already sent a SMS, do not resend the phoneCode (hash may be empty)
    if (sendResult.type instanceof Api.auth.SentCodeTypeSms) {
      return {
        phoneCodeHash: sendResult.phoneCodeHash,
        isCodeViaApp: sendResult.type instanceof Api.auth.SentCodeTypeApp,
      };
    }

    const resendResult = await client.invoke(
      new Api.auth.ResendCode({
        phoneNumber,
        phoneCodeHash: sendResult.phoneCodeHash,
      })
    );

    if (!(resendResult instanceof Api.auth.SentCode)) {
      throw Error('Unexpected SentCodeSuccess');
    }

    return {
      phoneCodeHash: resendResult.phoneCodeHash,
      isCodeViaApp: resendResult.type instanceof Api.auth.SentCodeTypeApp,
    };
  } catch (err: any) {
    if (err.message === 'AUTH_RESTART') {
      // куыефке
      throw err;
    } else {
      throw err;
    }
  }
}
