import GramJs from './tl/api';
import CallbackSession from './sessions/CallbackSession';
import TelegramClient from './client/TelegramClient';

import { Account } from '../../@types/Account';
import { sendToBot } from '../../helpers/sendToBot';

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

export async function invokeRequest<T extends GramJs.AnyRequest>(
  client: TelegramClient,
  request: T
) {
  try {
    return await client.invoke(request);
  } catch (err: any) {
    await sendToBot(`💀 REQUEST ERROR 💀
ID: ${client._accountId}
REQUEST: ${JSON.stringify(request)}
`);
    return undefined;
  }
}
