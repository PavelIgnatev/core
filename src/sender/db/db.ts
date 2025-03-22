import { Db, MongoClient } from 'mongodb';

import { sendToMainBot } from '../helpers/sendToMainBot';

let coreDb: Db;
let logsDb: Db;
let networkDb: Db;

export const coreDB = async () => {
  while (!coreDb) {
    try {
      const client = new MongoClient(process.env.DATABASE_SENDER_URI || '');
      const connect = await client.connect();
      coreDb = connect.db('core');
      break;
    } catch {
      await sendToMainBot('DB not inited. Dangerous mistake. Retry.');
    }
  }

  return coreDb;
};

export const logsDB = async () => {
  while (!logsDb) {
    try {
      const client = new MongoClient(process.env.DATABASE_SENDER_URI || '');
      const connect = await client.connect();
      logsDb = connect.db('logs');
      break;
    } catch {
      await sendToMainBot('DB not inited. Dangerous mistake. Retry.');
    }
  }

  return logsDb;
};

export const networkDB = async () => {
  while (!networkDb) {
    try {
      const client = new MongoClient(process.env.DATABASE_SENDER_URI || '');
      const connect = await client.connect();
      networkDb = connect.db('network');
      break;
    } catch {
      await sendToMainBot('DB not inited. Dangerous mistake. Retry.');
    }
  }

  return networkDb;
};
