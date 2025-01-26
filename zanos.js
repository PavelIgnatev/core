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

const accountsString = `2571f90ec9a1096da752a3f0e7d3142676ab385a518ed05ea480b261a6ef7950cf48960c5e5656c97ca96160c9fc339ca30db6dd9d701f4cc1e79e4e6de13f454f6d3dbe6f43a90a96ee9633d9406177d85cebcd77f828b82d481705be637f35f981bba3b9adcd1c18c08ed1979b96c379aa722506d53048d75c024fe9f4c3d57f34b11b42ebef24d1480609a75fa149a8790572f85bf6070d43889f6658368915fef29737ee408924532ec3fd3f136455b9900cfc9820551270a8f41218015d5ae798dc745df8105f680cd166f78e4713802d0783153a004674cec6447f17f155c42f40a536e92d4394058631153fc626c9168a45b43da86b2b22b676dd2c2c:2
354d61b94201be4802b579048c58e76c34b52c4ec447d87661354eacc13bcc6ec46f246369258ef76e86dc1559acfdcfca01218036de024ca681af1bb27d25e8063e73a7c8e86c3b0a11546d5a7505c524e755547391b0da514ecaaa39160c133bff4e2ef4f10f3a01aa145ba88b1498b9b9deef6e6e987debccba50891339e6f3e0644ff4a74a4673bcb0899764249d0f0f53bb38e656a413476bac37e0aeee09bac01f65384a5a146985925a79a6b63205176a5dfd52388e985e9a94f57c97de602fec1a12eaaab1e93dc1e1a7e88da2fa22b45f6da61731e4b266e006c742fe0b54d15324b41bc25b588d2f5d7f8a53aee0eb6d4d9f22419ee25cd3f9c38b:2
b4bcbe372abbfcdc297d45fd09b9d22d6b1d815938410f7d152078bcdec55b5b24d51da0f5cd67f4a544fe0946834f4ffb85d780bb8e22bee5f8bb23b98920150359534aab2bad61873232b983ce81b01d76e93ca7f8ea29f6a8bca6bc0f566098326d258d8b51887f36f3ac5427867fa96db7f36faffd25ec039caa0dc12e3ed19ba3d49b9990e87025debd29689750a3da4b222f59171c254c81dfd3be23f22795378385df31744f3cb2db9242487628906ba3bc96ce665d19905dc0d67bc7de8fe14b19a3421dde5c3257d5e5fde91e9bdd8be647b6965be94ef698ab06bda6aba0532516d90f90c5e200b38ef113801a739e1212190bf81a49ec4fde9b80:2
7246fd73e7dc456c1022d9603274963c946b437cbb3d2bd30083219190ffa1ef1d4b78cea99b938a73e174f02d145013d4fe97049967789fc18df3e3591ba7696aa16166d0a29be66f9046844b6d889a847a89900e3e960d34c00958ac95ccd4383537514524cabe8f26678fac6b703e5e65f448c276fa75f72fd2b99e4d7cd1b924fbb40a840407b3eedf468074e553f82eb380b3d06d3b6dae02ac01c643080c879f0543d907962f33fba23652d5ae2489f304484859e79a2c8e789a5e9ef3b1be3f49aa5647b950b67b865391f2ba8ac4cdece6ef2e369da3a3ea974239b1c47d3a199c8a1d7dfa17826b5299495208751b9253ab380f4b01703a31b75999:2`;


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
