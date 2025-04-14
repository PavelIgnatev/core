import { logsDB } from '../db/db';
import { sleep } from './helpers';
import { sendToMainBot } from './sendToMainBot';

const { log } = require('console');

let lastLogTime = Date.now();
const activePromises: Promise<any>[] = [];

const getNextLogTime = () => {
  const now = new Date();

  if (now.getTime() <= lastLogTime) {
    now.setMilliseconds(new Date(lastLogTime).getMilliseconds() + 1);
  }

  lastLogTime = now.getTime();
  return now.toISOString();
};

const insertLog = async (data: any) => {
  for (let i = 0; i < 5; i++) {
    try {
      const database = await logsDB();
      log(JSON.stringify(data));
      await database.collection('logs').insertOne(data);
      return;
    } catch {
      if (i === 4) throw new Error('SAVE_LOG_CRITICAL_ERROR');

      await sleep(1000 * (i + 1));
    }
  }
};

const mongoLog = async (level: string, ...args: any[]) => {
  const promise = (async () => {
    try {
      if (typeof args[0] !== 'object') {
        throw new Error('LOG_NOT_OBJECT');
      }

      if (!args[0].message) {
        throw new Error('LOG_NOT_HAVE_MESSAGE');
      }

      if (!args[0].prefix) {
        throw new Error('LOG_NOT_HAVE_PREFIX');
      }

      const timestamp = getNextLogTime();
      const metadata = { ...args[0], timestamp: new Date(timestamp) };
      const message = metadata.message;
      delete metadata.message;

      await insertLog({
        timestamp: new Date(timestamp),
        level,
        message,
        metadata,
      });
    } catch (e: any) {
      await sendToMainBot(`🚨 ${e.message} 🚨
ERROR: ${JSON.stringify(args[0])}`);
    }
  })();

  activePromises.push(promise);
  promise.finally(() => {
    const index = activePromises.indexOf(promise);
    if (index > -1) {
      activePromises.splice(index, 1);
    }
  });

  return promise;
};

export const waitConsole = () => Promise.all(activePromises);

if (process.env.DEV !== 'true') {
  console.log = async (...args: any[]) => {
    await mongoLog('info', ...args);
  };

  console.error = async (...args: any[]) => {
    await mongoLog('error', ...args);
  };

  console.warn = async (...args: any[]) => {
    await mongoLog('warn', ...args);
  };
}
