import TelegramClient from '../gramjs/client/TelegramClient';
import CallbackSession from '../gramjs/sessions/CallbackSession';
import GramJs from '../gramjs/tl/api';

async function init(
  account: {
    accountId: string;
    empty: boolean;

    dcId?: number;
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
  const { dcId, dc1, dc2, dc3, dc4, dc5, empty } = account;
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
  const session = empty
    ? new CallbackSession(undefined, () => {})
    : new CallbackSession(sessionData, () => {}, true);

  const client = new TelegramClient(
    session,
    2040,
    'Desktop',
    'Windows 11',
    '5.4.1 x64',
    'en',
    'tdesktop',
    'en',
    account.accountId,
    onError
  );

  if (!client) {
    throw new Error('CLIENT_NOT_INITED');
  }

  await client.start();
  client._initTime = Number(performance.now() - startTime).toFixed(0);

  console.warn({
    accountId: account.accountId,
    message: `[CLIENT_STARTED]`,
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
    empty: boolean;

    dcId?: number;
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
