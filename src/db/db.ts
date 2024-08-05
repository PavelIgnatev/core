import { MongoClient, Db } from 'mongodb';

import { sendToBot } from '../helpers/sendToBot';

let db: Db;

export const DB = async () => {
  while (!db) {
    try {
      const client = new MongoClient(process.env.DATABASE_URI || '');
      const connect = await client.connect();
      db = connect.db('core');
      break;
    } catch {
      await sendToBot('DB not inited. Dangerous mistake. Retry.');
    }
  }

  return db;
};
