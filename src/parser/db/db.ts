import { Db, MongoClient } from 'mongodb';

import { sendToMainBot } from '../helpers/sendToMainBot';

let coreDb: Db;
let logsDb: Db;

export const coreDB = async () => {
  while (!coreDb) {
    try {
      const client = new MongoClient(process.env.DATABASE_MAIN_URI || '');
      const connect = await client.connect();
      coreDb = connect.db('parser');
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
      const client = new MongoClient(process.env.DATABASE_MAIN_URI || '');
      const connect = await client.connect();
      logsDb = connect.db('parser_logs');
      break;
    } catch {
      await sendToMainBot('DB not inited. Dangerous mistake. Retry.');
    }
  }

  return logsDb;
};
