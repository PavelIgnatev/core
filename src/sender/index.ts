import 'dotenv/config';
import './helpers/setConsole.log';

import { Worker } from 'worker_threads';

import { getAccountCreationDate } from './db/accounts';
import { coreDB, logsDB } from './db/db';
import { resetAllPFields } from './db/groupIdUsers';
import { makeMetricsAll } from './helpers/makeMetricsAll';
import { sendToMainBot } from './helpers/sendToMainBot';

type WorkerMessageError = {
  type: 'error';
  error: string;
  chunkId: number;
  isFrozen: boolean
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
    errorSender: Record<string, number>;
    peerFloods: Record<string, number>;
    phoneSearchError: Record<string, number>;
    startSender: Record<string, number>;
    withoutRecipientError: Record<string, number>;
    messageStats?: Record<string, { single: boolean; double: boolean }>;
  };
  endTime: string;
  chunkId: number;
  isFrozen: boolean;
};

type WorkerMessage = WorkerMessageSuccess | WorkerMessageError;

const WORKER_TIMEOUT_MS = 90 * 60 * 1000;

const createWorker = (chunkId: number, accountIds: string[]) => {
  return new Promise<WorkerMessage>((resolve) => {
    const isFrozen = accountIds.some(accountId => accountId.includes('frozen'));

    const worker = new Worker(
      `
const { workerData, parentPort } = require('worker_threads');
const { main } = require('./src/sender/_main.js');

async function run() {
  try {
    const { clients, clientsData, endTime } = await main(workerData.chunkId, workerData.accountIds);
    parentPort.postMessage({ 
      type: 'success',
      clients,
      clientsData,
      endTime,
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
        isFrozen
      });
    }, WORKER_TIMEOUT_MS);

    worker.on('message', (message: WorkerMessage) => {
      clearTimeout(timeoutId);
      resolve({ ...message, isFrozen });
    });

    worker.on('error', (error) => {
      clearTimeout(timeoutId);
      resolve({
        type: 'error',
        error: error.message,
        chunkId,
        isFrozen
      });
    });

    worker.on('exit', (code) => {
      clearTimeout(timeoutId);
      if (code !== 0) {
        resolve({
          type: 'error',
          error: `WORKER_STOPPED_WITH_CODE_${code}`,
          chunkId,
          isFrozen
        });
      }
    });
  });
};

const main = async () => {
  await Promise.all([coreDB(), logsDB()]);

  await resetAllPFields();

  const appStartTime = Date.now();

  const chunks = await getAccountCreationDate();

  console.log({
    message: '💥 ITERATION INIT 💥',
    totalChunks: chunks.length,
    frozenChunks: chunks.filter(c => c.isFrozen).length,
    regularChunks: chunks.filter(c => !c.isFrozen).length,
  });

  // // 7564095141-prefix-aisender
  const workers = [
    createWorker(0, ['8077205791-prefix-frozen']),
  ];

  // const workers = chunks.map((chunk, i) => createWorker(i + 1, chunk.accountIds));
  const promises = await Promise.all(workers);

  const successPromises = [];
  for (const promise of promises) {
    if (promise.type === 'error') {
      const chunkType = promise.isFrozen ? 'FROZEN' : 'REGULAR';
      await sendToMainBot(`** WORKER_ERROR (${chunkType}) **
ERROR: ${promise.error}
CHUNK_ID: ${promise.chunkId}`);
    } else {
      successPromises.push({
        chunkId: promise.chunkId,
        clients: promise.clients,
        clientsData: promise.clientsData,
        endTime: promise.endTime,
        isFrozen: promise.isFrozen,
      });
    }
  }

  if (successPromises.length > 0) {
    await makeMetricsAll(successPromises, appStartTime);
  }

  process.exit(1);
};

main();
