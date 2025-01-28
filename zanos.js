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

const accountsString = `8fd15c751108f66ef2b7d8d88aefb47e7fb0920be8cefc18b8c725aca033de9b41e3d77d8ce096ca73ed9c8b983badae109d9ffe3099615f84b31ce2fd078b7ae062a66030094aa551bf5737b7171b490f5ff542caa314a63d8f37c342ee4ef7b41904adf3c1ee637de54eff9f16eaf9fde81a6c769ceb22d0d8938402bfd0decfb6ad19684a04d7525e0590292c8a68419ac64fc64b205b8e61a18cb1bb9d0ff02535ddb8727fa65cb2e86b826dab4be31d559050f58bf679d7fc1961dfa25ac75a1da87c4cd5810ae4ac119e728deecd99e76fdcc4cd49f3328ade45c4a0071b390374d1c706f71c841082459719d8a83d0e6955ab1534eac072f30b8de010:2
9a464afa90d9aacc501a9be7439d1a47c27ee5c282630513aa71fa470c4e28bcebfc8cc08740680fe675a5f34aee212c06d5c37510dd1d6831beeae5691360841b05dbee885e68d04ad27595e5f05bf92dbc165de1c349032f5575b190fa886ead313020ab53681fd52b7194d541c369556da1b84300d3233487458019c9b47bc2c621b6764affa7d3d3e0d45b67589c8ec04a1c2ce1a52724e905d7a6b7aae934a01eff1ff88329fbb08dcd0f9319d856351d11ba743248a484fb68b30c2247e8695af574629751a4d5fec6cfd517d92a5814fe55078bc300a6c8fbb1a9c00202baa04fed34607088cdce7279511aec2550e829bad80aeb8f4f8e3977d151d7:2
4fdaf0a4ef4d36aac9288ad43fc91e0d526ceca291dfd21ed4ee64170ee549f99113f9b06b6528cf0bce1af494c7555844084e1254b8bfb7ec863d4f8c9eeb2fcf88343d9c2781df8d9094abe7250fb32d73af20c47b1fc918006f3e4cea2396b63692dcacc57d597b4d339f23fa3de672cb86b874b3b34d320c77e7185f62ef537c0bf8a61decc64d16097d652f894094e27fc4ea47a79df6a2dafbc78d84853f24f0894c6afd145243bfde8917d519bc2f7bcb9edb7f4eac1789fc2101c5236040a3cd4412a25396b0147ef5b2eec4364d72240f2aa06747fe55d1c743a0d6013f8a22ef771afc88a8ee26639758a0e24303213b66c125633d6edd92bcbe2d:2`;

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
