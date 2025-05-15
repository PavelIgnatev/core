import fs from 'fs';
import path from 'path';

import { initClient } from '../_client';
import GramJs from '../../gramjs/tl/api';
import { getAccountById } from '../db/accounts';
import { sleep } from '../helpers/helpers';
import { sendToMainBot } from '../helpers/sendToMainBot';
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

export const getClient = async (
  dcId: number,
  nextApiId: number,
  accountId: string
): Promise<any> => {
  const client = await initClient(
    {
      dcId,
      nextApiId,
      accountId,
    },
    () => {},
    (e) => sendToMainBot(e),
    true
  );

  const sessionData = client.session.getSessionData();
  const { keys, mainDcId } = sessionData;

  if (keys[mainDcId]) {
    fs.promises
      .appendFile(
        path.resolve(process.cwd(), 'keys.txt'),
        `${keys[mainDcId]}:${mainDcId}\n`
      )
      .catch(() => {});
  }

  return client;
};

async function sendCodeRequest(
  client: any,
  apiId: number,
  apiHash: string,
  phoneNumber: string
) {
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

    return { error: false };
  } catch (error: any) {
    return { error };
  }
}

export const abuseLogin = async (accountId: string) => {
  await sleep(Math.random() * 29 * 60 * 1000);

  const { dcId, nextApiId, phone } = await getAccountById(accountId);

  if (!phone || !nextApiId) {
    return {
      connectCounts: 0,
      connectErrorCounts: 0,
      disconnectCounts: 0,
      reconnectCounts: 0,
    };
  }

  const apiHash = API_PAIRS[nextApiId];

  if (!apiHash) {
    await sendToMainBot(`💀 API_HASH_NOT_FOUND 💀
ID: ${accountId}
API_ID: ${nextApiId}`);
    return {
      connectCounts: 0,
      connectErrorCounts: 0,
      disconnectCounts: 0,
      reconnectCounts: 0,
    };
  }

  let totalConnectCounts = 0;
  let totalConnectErrorCounts = 0;
  let totalDisconnectCounts = 0;
  let totalReconnectCounts = 0;

  let client = await getClient(dcId, nextApiId, accountId);

  const runLoginRequests = async () => {
    while (true) {
      try {
        const result = await sendCodeRequest(client, nextApiId, apiHash, phone);

        if (client.getConnectionStats) {
          const stats = client.getConnectionStats();
          totalConnectCounts += stats.connectCounts || 0;
          totalConnectErrorCounts += stats.connectErrorCounts || 0;
          totalDisconnectCounts += stats.disconnectCounts || 0;
          totalReconnectCounts += stats.reconnectCounts || 0;
        }

        if (!result.error) {
          continue;
        }

        await client.destroy();

        const reason = result.error.message;

        if (reason.includes('seconds is required (caused by auth.SendCode)')) {
          const secondsMatch = reason.match(/\d+/);

          if (secondsMatch) {
            const seconds = parseInt(secondsMatch[0], 10);

            if (seconds > 29 * 60) {
              break;
            }

            if (!(seconds > 290 && seconds < 310)) {
              await sleep(seconds * 1000);
            }

            client = await getClient(dcId, nextApiId, accountId);
          }
        } else if (reason === 'PHONE_PASSWORD_FLOOD') {
          break;
        } else {
          await sendToMainBot(`💀 ABUSE_LOGIN_ERROR 💀
ID: ${accountId}
REASON: ${reason}`);
          break;
        }
      } catch (error: any) {
        await client.destroy();
        await sendToMainBot(`💀 ABUSE_LOGIN_GLOBAL_ERROR 💀
ID: ${accountId}
REASON: ${error.message}`);
        break;
      }
    }
  };

  const MAX_EXECUTION_TIME_MS = 29 * 60 * 1000;
  const TIMEOUT_ERROR = 'TIMEOUT_EXCEEDED';

  try {
    await Promise.race([
      runLoginRequests(),
      new Promise((_, reject) => {
        setTimeout(() => {
          reject(new Error(TIMEOUT_ERROR));
        }, MAX_EXECUTION_TIME_MS);
      }),
    ]);
  } catch (error: any) {
    await client.destroy();

    if (error.message === TIMEOUT_ERROR) {
      await sendToMainBot(`⏱️ ABUSE_LOGIN_TIMEOUT ⏱️
ID: ${accountId}`);
    } else {
      await sendToMainBot(`💀 ABUSE_LOGIN_UNEXPECTED_ERROR 💀
ID: ${accountId}
REASON: ${error.message}`);
    }
  }

  return {
    connectCounts: totalConnectCounts,
    connectErrorCounts: totalConnectErrorCounts,
    disconnectCounts: totalDisconnectCounts,
    reconnectCounts: totalReconnectCounts,
  };
};
