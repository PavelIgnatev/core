import { Db, MongoClient } from 'mongodb';

import { sendToMainBot } from '../helpers/sendToMainBot';

let db: Db;

export const DB = async () => {
  while (!db) {
    try {
      const client = new MongoClient(process.env.DATABASE_URI || '');
      const connect = await client.connect();
      db = connect.db('fucker');
      break;
    } catch {
      await sendToMainBot('DB not inited. Dangerous mistake. Retry.');
    }
  }

  return db;
};
