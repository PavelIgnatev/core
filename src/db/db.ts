import { MongoClient, Db } from 'mongodb';

import { sendToBot } from '../helpers/sendToBot';

let db: Db;
let db2: Db;

export const DB = async () => {
  while (!db) {
    try {
      console.log('Start 1', process.env.DATABASE_URI)
      const client = new MongoClient(process.env.DATABASE_URI || '');
      console.log('Start 1', client)

      const connect = await client.connect();
      console.log('Start 1', connect)

      db = connect.db('core');

      console.log('Start 1', db)

      break;
    } catch {
      await sendToBot('DB not inited. Dangerous mistake. Retry.');
    }
  }

  return db;
};


export const DB2 = async () => {
  while (!db2) {
    try {
      console.log('Start 2', process.env.DATABASE_URI2)

      const client = new MongoClient(process.env.DATABASE_URI2 || '');
      console.log('Start 2', client)

      const connect = await client.connect();
      db2 = connect.db('core');
      break;
    } catch {
      await sendToBot('DB2 not inited. Dangerous mistake. Retry.');
    }
  }

  return db2;
};
