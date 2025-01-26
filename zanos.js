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

const accountsString =  `a0cd52725004da17055fa60504c39b813c55b428e66769a2dc8c7ac991e4448ced5309bc95e4108b767f039ab857d825f9210bc0cc18681ecbea6409cca7626d3f61647cc9d76af3d4364d47e0bae8c49a8701f33f6d3e6abd4b06aac70f7f1ed64a981423a47208785f03c803713de45ae27d1623e7ae90e9b3872773813e3b37bf755b87c70ecd0bed03b54548b4571ba164a14ca6d966bd27588900a50d4e016054c345a037d6d41d31dcad33934662efdd81a436a75c7bf24baa9cf18862259758886d8738b6135e77298fdd85a80c6def167586a0301afbf17d11f15a82b6e0e8d62456062460d9cf130bebbe75e5d020d8079761275e6fc84c0cbe43bb:2
6903d606aa4efd026601b6d7ce3f65e89fe34f0378488468b57adf4c834108e7f46e5d89ebdedf8f9e29c40439769402a30cd10622c6edde3ebd1b9a4155c750294e431021f7abafcddc8ef1073e42b51644df26d76e774f579fdbf84b32d8225aaee18c1f4e44b0f9e63c3d5f6ec376088caf459e4d9937377538e77af16cce55ac018ea68e9e6740ad6a6fb125dadf2e03eac1b54f1badc9921531db4f4adc331e207a2bf6c8c8b3f550269dfab9aa7b1f2ce5743efa7760ac8054c93981ff6ccb9acfb35cccd9fe4e9ecac2309fae23ff08d6fcc482375e027f15bb436e5ea8038d3b5e59b68809ee8edf37f3f631a6e7130275212d4a9cf1a01bfdc452b0:2
91f2ad976089b9058e5aa78e84c97f5d96dcf29906e02c9177bfb117ec16cc859e1ae40855863b1e79d872928935dc1e3ab79be4c5600b98ceee7e908358840a541adcdbd28945c48d85d894df7da10124a32c50970c3cec0313ddc61fd2f247d4e9da32d6d7ce77c033c0dde194f61d90f15d60a8cf7bec33f0d7f8ec2e59983db03770c76211a28951f65360ae7398abc3388af9165d5d46642bedc1b0a4aede322fdd38417f48d060b26b06ad8e940a0f24c6c68fdafd70e25682712e8d8e58931d0e913d6b54279aaed5cc23c1765e534102089bbb1e8296908eb077914ffff20f93de98bceb7f2a1118642a84b0149fb56431ab9a8e1771f0d28094c65c:2`
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
        prefix: 'test-govna',
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
