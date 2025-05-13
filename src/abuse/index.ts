import 'dotenv/config';

import { Worker } from 'worker_threads';

import { getAccountCreationDate } from './db/accounts';
import { coreDB, logsDB } from './db/db';
import { sleep } from './helpers/helpers';
import { makeMetricsAll } from './helpers/makeMetricsAll';
import { sendToMainBot } from './helpers/sendToMainBot';

type WorkerMessageError = {
  type: 'error';
  error: string;
  chunkId: number;
};

type WorkerMessageSuccess = {
  type: 'success';
  chunkId: number;
  endTime: string;
  clients: Array<{
    accountId: string;
    endTime: string;
    connectCounts: number;
    connectErrorCounts: number;
    disconnectCounts: number;
    reconnectCounts: number;
    metrics: {
      sent: number;
      received: number;
      sentSize: number;
      receivedSize: number;
    };
  }>;
  timings: {
    allTimings: number[];
  };
};

type WorkerMessage = WorkerMessageSuccess | WorkerMessageError;

const WORKER_TIMEOUT_MS = 90 * 60 * 1000;

const createWorker = (chunkId: number, accountIds: string[]) => {
  return new Promise<WorkerMessage>((resolve) => {
    const worker = new Worker(
      `
const { workerData, parentPort } = require('worker_threads');
const { main } = require('./src/abuse/_main.js');

async function run() {
  try {
    const result = await main(workerData.chunkId, workerData.accountIds);
    parentPort.postMessage({ 
      type: 'success',
      ...result,
      chunkId: workerData.chunkId,
    });
  } catch (error) {
    parentPort.postMessage({ 
      type: 'error',
      error: error.message,
      chunkId: workerData.chunkId
    });
  }
}
run();`,
      {
        eval: true,
        workerData: { chunkId, accountIds },
      }
    );

    const timeoutId = setTimeout(() => {
      resolve({
        type: 'error',
        error: `WORKER_TIMEOUT_ERROR`,
        chunkId,
      });
    }, WORKER_TIMEOUT_MS);

    worker.on('message', (message: WorkerMessage) => {
      clearTimeout(timeoutId);
      resolve(message);
    });

    worker.on('error', (error) => {
      clearTimeout(timeoutId);
      resolve({
        type: 'error',
        error: error.message,
        chunkId,
      });
    });

    worker.on('exit', (code) => {
      clearTimeout(timeoutId);
      if (code !== 0) {
        resolve({
          type: 'error',
          error: `WORKER_STOPPED_WITH_CODE_${code}`,
          chunkId,
        });
      }
    });
  });
};

const main = async () => {
  await Promise.all([coreDB(), logsDB()]);

  const appStartTime = Date.now();

  const chunks = await getAccountCreationDate();
  console.log({
    message: '💥 ABUSE LOGIN INIT 💥',
  });

  // Раскомментируйте для отладки на отдельном аккаунте
  // const workers = [
  //   createWorker(0, ['ACCOUNT_ID']),
  // ];

  const workers = chunks.map((chunk, i) => createWorker(i + 1, chunk));
  const promises = await Promise.all(workers);

  const successPromises = [];
  for (const promise of promises) {
    if (promise.type === 'error') {
      await sendToMainBot(`** ABUSE WORKER_ERROR **
ERROR: ${promise.error}
CHUNK_ID: ${promise.chunkId}`);
    } else {
      successPromises.push(promise);
    }
  }

  if (successPromises.length > 0) {
    await makeMetricsAll(successPromises, appStartTime);
  }
};

const _main = async () => {
  await Promise.all([main(), sleep(30 * 60 * 1000)]);

  process.exit(0);
};

_main();
