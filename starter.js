require('dotenv/config');

const util = require('util');
const { exec: childExec } = require('child_process');
const { MongoClient } = require('mongodb');

const exec = util.promisify(childExec);

let db;

const DB = async () => {
  while (!db) {
    try {
      const client = new MongoClient(process.env.DATABASE_URI || '');
      const connect = await client.connect();
      db = connect.db('core');
      break;
    } catch {
      console.log('DB not inited. Dangerous mistake. Retry.');
    }
  }

  return db;
};

const getAccountCollection = async () => {
  return (await DB()).collection('accounts');
};

const getTotalAccounts = async () => {
  const accountCollection = await getAccountCollection();

  const totalAccounts = await accountCollection.countDocuments();

  return totalAccounts;
};

const starter = async () => {
  await exec('pm2 kill');
  await exec(
    'cd ~/th && pm2 start npm --name "recipient" -- run start && cd ~/core'
  );

  let start = 0;
  let end = 100;

  const accountCounts = await getTotalAccounts();
  const step = Math.ceil(accountCounts / 100);

  for (let i = 0; i < step; i += 1) {
    console.log(`${start}:${end}`);
    await exec(
      `START=${start} END=${end} pm2 start out.js --name "${start}:${end}"`
    );

    start += 100;
    end += 100;
  }

  process.exit(-1)
};

starter();
