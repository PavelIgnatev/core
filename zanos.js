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

const accountsString = `14eabbcd7dfb0e6e9275a80d0e2f6f113c21d3f116fe2264c98bbcf65494892cf887d7f5ccce895d2f819112139d59b345f879e73898f7f87f30adfaf049ff1780596d355dde237f1654f62d93adae7fc304a49bdab6da54a288bab8fcab397a0776c492bdc3d463f5406fb1e1931d4438d168484d6d79de27c81ce2ab162f2efad81eb473ec0aae233306c32fb5d0c9fd000947f2aaabb630eab59b415cf4b85245793d92d30b260281450fcc51605b0f0dead0797b9f0e56a43060f88147f0f6271876fbed5af87ee42201037e396656cfa56009ca8d46e8a6984eacdc81190229536d06920d850735b2bef0420a1a91926d1dfa548d32a7ac37244164f6ae:2`;


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

      const data = {
        accountId: username,
        dcId: Number(account.dcId),
        prefix,
      };

      data[`dc${account.dcId}`] = account.authKey;
      // await insertAccount(data);
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
