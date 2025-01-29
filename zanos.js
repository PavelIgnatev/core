const { MongoClient } = require('mongodb');

let db;

const DB = async () => {
  while (!db) {
    try {
      const client = new MongoClient(
        'mongodb://gen_user:35B%3DR9GTC%5Cq.Xv@82.97.255.185:27017/core?authSource=admin&directConnection=true'
      );
      const connect = await client.connect();
      db = connect.db('fucker');
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

const accountsString = ``;

//
//
//
//
//
//  .map((e) => `${e[`dc${e.dcId}`]}:${e.dcId}`)
// .join('\n'))
const accounts = accountsString
  .split('\n')
  .filter(Boolean)
  .map((a) => {
    const s = a.split(':');

    return { authKey: s[0], dcId: s[1] };
  });

const zanos = async () => {
  try {
    for (const account of accounts) {
      const username = account.authKey.slice(0, 32);
      console.log(username)

      const data = {
        accountId: username,
        dcId: Number(account.dcId),
        prefix: 'test-ru'
      };

      data[`dc${account.dcId}`] = account.authKey;
      await insertAccount(data);
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
