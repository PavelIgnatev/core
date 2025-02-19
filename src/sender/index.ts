import 'dotenv/config';
import './helpers/setConsole.log';

import { Worker } from 'worker_threads';

import { getAccountCreationDate } from './db/accounts';
import { coreDB, logsDB } from './db/db';
import { makeMetrics } from './helpers/makeMetrics';
import { sendToMainBot } from './helpers/sendToMainBot';

type WorkerMessageError = {
  type: 'error';
  error: string;
  chunkId: number;
};

type WorkerMessageSuccess = {
  type: 'success';
  clients: {
    accountId: string;
    initTime: number;
    endTime: number;
    connectCounts: number;
    connectErrorCounts: number;
    disconnectCounts: number;
    reconnectCounts: number;
  }[];
  clientsData: {
    aiReqest: Record<string, number>;
    aiRetryError: Record<string, number>;
    allTimings: Array<number>;
    endSender: Record<string, number>;
    errorSender: Record<string, number>;
    peerFloods: Record<string, number>;
    phoneSearchError: Record<string, number>;
    startSender: Record<string, number>;
    withoutRecipientError: Record<string, number>;
  };
  startTime: number;
  chunkId: number;
};

type WorkerMessage = WorkerMessageSuccess | WorkerMessageError;

const WORKER_TIMEOUT_MS = 60 * 60 * 1000;

const createWorker = (chunkId: number, accountIds: string[]) => {
  return new Promise<WorkerMessage>((resolve) => {
    const worker = new Worker(
      `
const { workerData, parentPort } = require('worker_threads');
const { main } = require('./src/sender/_main.js');

async function run() {
  try {
    const { clients, clientsData, startTime } = await main(workerData.chunkId, workerData.accountIds);
    parentPort.postMessage({ 
      type: 'success',
      clients,
      clientsData,
      startTime,
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

  const chunks = await getAccountCreationDate();
  console.log({
    message: '💥 ITERATION INIT 💥',
  });

  // const workers = [createWorker(0, ['1716295652-support-new-100'])];
  const workers = chunks.map((chunk, index) => createWorker(index + 1, chunk));
  const promises = await Promise.all(workers);

  for (const promise of promises) {
    if (promise.type === 'error') {
      await sendToMainBot(`** WORKER_ERROR **
ERROR: ${promise.error}
CHUNK_ID: ${promise.chunkId}`);
    } else {
      await makeMetrics(
        promise.chunkId,
        promise.clients,
        promise.clientsData,
        promise.startTime
      );
    }
  }

  process.exit(1);
};

main();
