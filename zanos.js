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

const accountsString = `6d0ef3be443438561ad17684791d99d6d25416d158c89cbc9dc429243c44b07cfc035860c9794d4b616ee898ab01d4a2392c06406eea78fda0925e039d610fc4ff91dc3827a03b3f0bf99b826b514efa663724328e4704095a75be4194c3040694734b25ec007f2e4ebb76f5942c772f583fc45701e566204b10ac2521a8b1581843464363b17f7499ecfd2c501c036cca21cf6284a374a537756ff754dc07da08a6134a35d9ccf44641166c542a43391b2a9c889358769b5f100eea29243d3968fb62cad4bd2633b791f7001ecb8c521f594ac9507475f55c0416780b6d3ca1b7e7df7d411cde9dd0ecb4fb7ac62376aad6f1982469b701e1f1accc69fc6ad4:2
1854e8c4e6fbdbde4ee88905f181ade466cb256910a3d61a72e2b80ab4130106d0e27fba80070050f083177a40d6b54f8c95fa71b58e3add539bb96cddb27dcc484ff39670840b2c514f8c4570aa138b676d99844eecacfc28445a141c68a2e65e901296c86827cbb9b12908654292d3a78fca88d5d800d4ea43ba884114db988c807257cfd6f7bb89d1f80a61278bd8b8510bb5c23aed872a58bbc346f1711bd13ea44d86257331e856c3986574d24c494ddf9f75ebe768e0c329b556a385f17149190c4fb125ac68d82067222d591074b0a2bab1ff80478a4af6be06e108cb2514b7902b1ce991b8a532b18b6d3f99ed87a67f14653df7b3da675e3f46df22:2
00f1a2b67b7ce2f409a7fa25598a99d4f8f8c1a297670295a4fd95949fb8bd1af0854253e2bc00e838ec3b6f77ff55182023e87d9847c15455b6a0b240facd328ef7fc4158d03e080b5d909d4693bef511a5c572313bd8348aa21d141794c28a1fb55e09df826437c702e71723948e59f16e201f958c2df1acea9b68411bef619ca2f8328ec0120a22ec5e64e718a7586c1864f436daba0e3637b242d3f217410548f764f9bc6c317089fe39d3e4921768eedfdfe60a72e55f0c04e10e5d5ba68657e6295fb056a55a75cc03ae15b18c9f4c210434d68a5b2ddf6a0d6dae33a71fd04f8989c5315c809b918e55977135f76a3e7f870b35a90e307921195daf50:2
2f5b2b6a2c72718042fe208cfe16ab8c4c3dd11c38d178628270c2508e1dd3ed4b386bb3015b53e4ce435be763ef8e399048bb84a6912439aabff78119ebec7571ecdb398f7b705f93888835dd12d075a4169da04e698b99cb936b72fd97b605f0fb40a7514db9512bfd0bb6404ca64fc4c7fedb6bc50c7e7d013ced42fd755e1c86515b98f8c9e2490ce4cde9ac959ff9eb7c44e249b073e0a2b6795f8e25115b2e62ed56cc294f6d275480cbe217f181d97b5dcccdd5c1777f9e9892830791ece89db3e925306467176e0c0959eeb370f68745a195b35db04870fc268eed726c3fd5d955fb7bbe58b6d440dc88956032da6decf8e04524fb481685b2702a41:2`;


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
        prefix: 'test-ru',
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
