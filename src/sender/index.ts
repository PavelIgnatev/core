import 'dotenv/config';

import { Worker } from 'worker_threads';

import { getAccountCreationDate } from './db/accounts';
import { sendToMainBot } from './helpers/sendToMainBot';

interface WorkerMessage {
  type: 'success' | 'error';
  error?: string;
  accountIds?: string[];
}

const WORKER_TIMEOUT_MS = 45 * 60 * 1000;

const createWorker = (accountIds: string[]) => {
  return new Promise<WorkerMessage>((resolve) => {
    const worker = new Worker(
      `
      const { workerData, parentPort } = require('worker_threads');
      const { main } = require('./src/sender/_main.js');

      async function run() {
        try {
          await main(workerData.accountIds);
          parentPort.postMessage({ 
            type: 'success',
            accountIds: workerData.accountIds 
          });
        } catch (error) {
          parentPort.postMessage({ 
            type: 'error',
            error: error.message,
            accountIds: workerData.accountIds
          });
        }
      }

      run();
    `,
      {
        eval: true,
        workerData: { accountIds },
      }
    );

    const timeoutId = setTimeout(() => {
      resolve({
        type: 'error',
        error: `Worker timeout after ${WORKER_TIMEOUT_MS / 1000 / 60} minutes`,
        accountIds,
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
        accountIds,
      });
    });

    worker.on('exit', (code) => {
      clearTimeout(timeoutId);
      if (code !== 0) {
        resolve({
          type: 'error',
          error: `Worker stopped with exit code ${code}`,
          accountIds,
        });
      }
    });
  });
};

const main = async () => {
  const accountChunks = await getAccountCreationDate();

  const workers = [
    createWorker(accountChunks[0].slice(0, 50)),
    createWorker(accountChunks[1].slice(0, 50)),
    createWorker(accountChunks[2].slice(0, 50)),
    createWorker(accountChunks[3].slice(0, 50)),
    createWorker(accountChunks[4].slice(0, 50)),
    createWorker(accountChunks[5].slice(0, 50)),


  ];

  const promises = await Promise.all(workers);

  for (const promise of promises) {
    if (promise.type === 'error') {
      await sendToMainBot(`** WORKER_ERROR **
ERROR: ${promise.error}
ACCOUNTS: ||${promise.accountIds?.[0]}||${promise.accountIds?.[promise.accountIds.length - 1]}||`);
    }
  }
  process.exit(1);
};

main();
