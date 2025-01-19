import { Account } from '../../@types/Account';
import { sendToMainBot } from '../../helpers/sendToMainBot';
import TelegramClient from './client/TelegramClient';
import CallbackSession from './sessions/CallbackSession';
import GramJs from './tl/api';

export async function init(
  accountData: Account,
  accountId: string,
  onUpdate: any
) {
  const { dcId, dc1, dc2, dc3, dc4, dc5, platform, userAgent } = accountData;
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
  const session = new CallbackSession(sessionData, () => {});

  const client = new TelegramClient(session, 2496, {
    deviceModel: userAgent,
    systemVersion: platform,
    accountId,
  });

  if (!client) {
    throw new Error('Client not inited');
  }

  await client.start();

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

type InvokeRequestParams = {
  shouldIgnoreErrors?: boolean;
};

export async function invokeRequest<T extends GramJs.AnyRequest>(
  client: TelegramClient,
  request: T,
  params: InvokeRequestParams = {}
) {
  const { shouldIgnoreErrors } = params;

  try {
    const response = await client.invoke(request);
    if (request.className !== 'account.UpdateStatus') {
      console.log({
        accountId: client._accountId,
        message: `[${request.className}]`,
        payload: {
          request: JSON.parse(JSON.stringify(request)),
        },
      });
    }

    return response;
  } catch (err: any) {
    console.error({
      accountId: client._accountId,
      message: `[${request.className}]`,
      payload: {
        request: JSON.parse(JSON.stringify(request)),
        error: err.message,
      },
    });

    if (
      [
        'USER_DEACTIVATED_BAN',
        'AUTH_KEY_UNREGISTERED',
        'AUTH_KEY_INVALID',
        'USER_DEACTIVATED',
        'SESSION_REVOKED',
        'SESSION_EXPIRED',
        'AUTH_KEY_PERM_EMPTY',
        'SESSION_PASSWORD_NEEDED',
      ].includes(err.message)
    ) {
      throw new Error(err.message);
    }
    if (shouldIgnoreErrors) return undefined;

    if (err.message !== 'PEER_FLOOD') {
      await sendToMainBot(`💀 REQUEST ERROR (${request.className}) 💀
ID: ${client._accountId}
ERROR: ${err.message}
REQUEST: ${JSON.stringify(request)}`);
    }

    throw new Error(err.message);
  }
}
