import 'dotenv/config';

import { coreDB, logsDB } from './db/db';
import { allTimings, getTimeString } from './helpers/helpers';
import { getMetricsByAccountId } from './helpers/metrics';
import { sendToMainBot } from './helpers/sendToMainBot';
import { abuseLogin } from './modules/abuseLogin';
import { sleep } from '../gramjs/Helpers';

const starter = async (accountId: string) => {
  const startTime = performance.now();

  console.log({
    accountId,
    message: `💥 ABUSE LOGIN START FOR ${accountId} 💥`,
  });

  try {
    await sleep(Math.random() * 30 * 60 * 1000);
    const connectionStats = await abuseLogin(accountId);

    return {
      accountId,
      endTime: getTimeString(startTime),
      connectCounts: connectionStats?.connectCounts || 0,
      connectErrorCounts: connectionStats?.connectErrorCounts || 0,
      disconnectCounts: connectionStats?.disconnectCounts || 0,
      reconnectCounts: connectionStats?.reconnectCounts || 0,
      metrics: getMetricsByAccountId(accountId)?.traffic || {
        sent: 0,
        received: 0,
        sentSize: 0,
        receivedSize: 0,
      },
    };
  } catch (error: any) {
    console.error({
      accountId,
      message: `ABUSE LOGIN ERROR: ${error.message}`,
    });
    throw error;
  }
};

export const main = async (chunkId: number, accountIds: string[]) => {
  const startTime = performance.now();
  const promises: Promise<any>[] = [];

  await Promise.all([coreDB(), logsDB()]);

  for (const accountId of accountIds) {
    promises.push(starter(accountId));
  }

  process.on('uncaughtException', async (err) => {
    await sendToMainBot(`** UNCAUGHT_EXCEPTION **
CHUNK_ID: ${chunkId}
ERROR: ${err.message}`);
    process.exit(1);
  });

  process.on('unhandledRejection', async (reason, promise) => {
    await sendToMainBot(`** UNHANDLED_REJECTION **
CHUNK_ID: ${chunkId}
REASON: ${reason}
PROMISE: ${JSON.stringify(promise)}`);
    process.exit(1);
  });

  const clients = await Promise.all(promises);


  return {
    chunkId,
    endTime: getTimeString(startTime),
    clients: clients.map((client) => ({
      accountId: client.accountId,
      endTime: client.endTime,
      connectCounts: client.connectCounts || 0,
      connectErrorCounts: client.connectErrorCounts || 0,
      disconnectCounts: client.disconnectCounts || 0,
      reconnectCounts: client.reconnectCounts || 0,
      metrics: client.metrics || {
        sent: 0,
        received: 0,
        sentSize: 0,
        receivedSize: 0,
      },
    })),
    timings: {
      allTimings,
    },
  };
};
