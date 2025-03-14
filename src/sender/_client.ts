import UserAgent from 'user-agents';

import TelegramClient from '../gramjs/client/TelegramClient';
import CallbackSession from '../gramjs/sessions/CallbackSession';
import GramJs from '../gramjs/tl/api';

async function init(
  account: {
    accountId: string;
    nextApiId: number;

    dcId: number;
    dc1?: string;
    dc2?: string;
    dc3?: string;
    dc4?: string;
    dc5?: string;
  },
  onUpdate: (update: any) => void,
  onError: (error: any) => void
) {
  const startTime = performance.now();
  const { dcId, dc1, dc2, dc3, dc4, dc5, nextApiId } = account;
  const keys: Record<string, string> = {};

  if (dc1) keys['1'] = dc1;
  if (dc2) keys['2'] = dc2;
  if (dc3) keys['3'] = dc3;
  if (dc4) keys['4'] = dc4;
  if (dc5) keys['5'] = dc5;

  const sessionData = {
    mainDcId: Number(dcId),
    keys,
    hashes: {},
  };
  const session = new CallbackSession(sessionData, () => {}, true);
  const userAgent = new UserAgent();
  const { userAgent: userAgentString, platform } = userAgent.data;

  const client =
    nextApiId === 2496
      ? new TelegramClient(
          session,
          2496,
          userAgentString,
          platform,
          `${Math.floor(Math.random() * 10)}.${Math.floor(
            Math.random() * 10
          )}.${Math.floor(Math.random() * 10)} A`,
          'en',
          'en',
          'en',
          account.accountId,
          '',
          null,
          'http://csyk3lwrZAB8r396Vd-dc-ANY:O52cprX1XXZ65Wy@gw.thunderproxy.net:5959',
          onError
        )
      : new TelegramClient(
          session,
          nextApiId,
          'Desktop',
          'Windows 11',
          '6.8.2 x64',
          'en',
          'en',
          'en',
          account.accountId,
          '',
          null,
          'http://csyk3lwrZAB8r396Vd-dc-ANY:O52cprX1XXZ65Wy@gw.thunderproxy.net:5959',
          onError
        );

  if (!client) {
    throw new Error('CLIENT_NOT_INITED');
  }

  await client.start();
  client._initTime = Number(performance.now() - startTime).toFixed(0);

  console.warn({
    accountId: account.accountId,
    message: `[CLIENT_STARTED (${nextApiId})]`,
    payload: {
      initTime: `${client._initTime}ms`,
    },
  });

  client.addEventHandler(
    (update: any) => {
      if (!(update instanceof GramJs.UpdatesTooLong)) {
        const updates = 'updates' in update ? update.updates : [update];
        updates.forEach(async (update: any) => {
          onUpdate(update);
        });
      }
    },
    {
      build: (update: object) => update,
    }
  );

  return client;
}

export const initClient = async (
  account: {
    accountId: string;
    nextApiId: number;

    dcId: number;
    dc1?: string;
    dc2?: string;
    dc3?: string;
    dc4?: string;
    dc5?: string;
  },
  onUpdate: (update: any) => void,
  onError: (update: any) => void
): Promise<TelegramClient> => {
  try {
    const timeoutPromise = new Promise((_, reject) => {
      setTimeout(() => {
        reject(new Error('TIMEOUT_ERROR'));
      }, 90000);
    });

    const client = await Promise.race([
      init(account, onUpdate, onError),
      timeoutPromise,
    ]);

    if (!client) {
      throw new Error('GLOBAL_ERROR');
    }

    return client as TelegramClient;
  } catch (e: any) {
    if (e.message === 'TIMEOUT_ERROR') {
      console.warn({
        accountId: account.accountId,
        message: '[CLIENT_TIMEOUT_RECONNECT]',
      });
      return await initClient(account, onUpdate, onError);
    }

    throw new Error(e.message);
  }
};
