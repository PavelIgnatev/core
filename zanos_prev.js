const fs = require('fs');
const path = require('path');
const { MongoClient } = require('mongodb');

let db;

const DB = async () => {
  while (!db) {
    try {
      const client = new MongoClient(
        'mongodb://gen_user:35B%3DR9GTC%5Cq.Xv@82.97.255.185:27017/core?authSource=admin&directConnection=true'
      );
      const connect = await client.connect();
      db = connect.db('core');
      break;
    } catch {}
  }

  return db;
};

const getAccountCollection = async () => {
  return (await DB()).collection('accounts');
};

const insertAccount = async (account) => {
  const accountCollection = await getAccountCollection();

  await accountCollection.updateOne(
    { accountId: account.accountId },
    { $set: account },
    { upsert: true }
  );
};

const zanos = async () => {
  const outputFolderPath = './accs';

  try {
    const files = await fs.promises.readdir(outputFolderPath);
    for (const file of files) {
      const filePath = path.join(outputFolderPath, file);
      const fileContent = await fs.promises.readFile(filePath, 'utf-8');
      const regex =
        /(localStorage|navigtor|username):\s*([\s\S]*?)(?=(localStorage|navigtor|username:|$))/g;
      let match;

      const extractedData = {};

      while ((match = regex.exec(fileContent)) !== null) {
        const key = match[1];
        const value = match[2].trim().split('\n')[0];
        extractedData[key] = value;
      }

      const {
        dc,
        dc1_auth_key,
        dc2_auth_key,
        dc3_auth_key,
        dc4_auth_key,
        dc5_auth_key,
      } = JSON.parse(extractedData.localStorage);

      const data = {
        accountId: `${extractedData.username.replace('-england-247', '')}-prefix-adult`,
        dcId: Number(dc),
        nextApiId: 2496,
      };
    //   if (dc1_auth_key) {
    //     data['dc1'] = JSON.parse(dc1_auth_key);
    //   }
      if (dc2_auth_key) {
        data['dc2'] = JSON.parse(dc2_auth_key);
      }
    //   if (dc3_auth_key) {
    //     data['dc3'] = JSON.parse(dc3_auth_key);
    //   }
    //   if (dc4_auth_key) {
    //     data['dc4'] = JSON.parse(dc4_auth_key);
    //   }
    //   if (dc5_auth_key) {
    //     data['dc5'] = JSON.parse(dc5_auth_key);
    //   }

      console.log(data);
      // console.log(data);
    //   await insertAccount(data);
    }
    console.log('VSE');
  } catch (error) {
    console.error('Ошибка при обработке файлов:', error);
  }
};

// Вызываем функцию zanos
zanos().catch((error) => {
  console.error('Ошибка в функции zanos:', error);
});
