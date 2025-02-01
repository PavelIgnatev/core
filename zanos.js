const { MongoClient } = require('mongodb');

let db;

const DB = async () => {
  while (!db) {
    try {
      const client = new MongoClient(
        'mongodb://gen_user:%5C%7Dc%3C%24q%3C3j8O_%26g@193.108.115.154:27017/core?authSource=admin&directConnection=true'
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

const accountsString = `0917618ce29a9e65e5f68077acf672aca052b41b9201f8fe77153bb2cbbf4f2cbe6264e427768ee2cd44d2b534323945fae1f776284dac462f044ff48d43be891de353a23b77a0977093d586436cd9103d002259947171ed8ea590501c9a41beafb5a29cc0d06b885c8cf1062b0791d774ace0123455bbdd6c3e0f0ef77a2cda3c7a532a656186daf290d51039a232cfe856cf2c410287fe9f0c3503e96c7f57561cca42339e4382b70a5f8407eace444d2943ddb6b8f15d33e989cbf8e47ecde988ed9a8ffd2652ead90a23faad905a9e0c4931af5a54ca45814500a00ba4b7d8d46cae51d15af70f47c06caefc8a9211f9d5bfca085c4ece5ae7377cc779d2:2
0caf4d8ea539ba02c46f471763a2183501237ed713e72a61dfbfaef2b242b002ad78167bbdb5ff21f6f291862835908938e9180158769dfe9f8365bf0d8b07ddb88d664722253473d51f37d6840a9ce96ba38c57a8f387a79391606d1b955f65cf7087c5746dc952ace9ea013f9ba90b10b401e137f782307172f45b17c2debba7757114079155ff9c970ada0c0aeed5157c7483e6406b175e0d005c27daa4a41396fd48a67b44b9226acec4bbf87635b62241efd0b1faf36ab6d5007a08bb4230bcabe569f57c36a2adbe99eed742df4d8b3bd1ab579dcd78b03bb1ace7214a39a8356e7ab60df9093cc98d2c8a90047a8eaf36e15813f9c4187f1d73270134:2
aa3ad12f6b6f34a3cd9dfaa6b7595f55ae47b575f9609497ce7f38ec990d640c3e83378ed93ab95fc9f1daef69e27f9aeeaa8acecc6dba70aede94d60bc864a71bb519d78e675dc5df19dce874b73b42895d0c71083c56f656d711c9fb1d6bab58d91e8819409fd91bc30921bb8d75d92d9a321d8dbfff1bc7446127da4d21149a7edf894bfa9c264966533ba6c2a32a6de44fb6dda260597d15763a52c5a374172f47ad810f4b8bc61808f294c3926ff8fd4a6a69c197e53248708cc7410b785411b74c3ce69acc07557906b6c93bfaec45fe7b2efc83c5d5d5bea262039411a64465c9a6ca967cd3ff44abe359d98e50304966dbeb0535878542b604caef25:2
2898edcf9debe1418da1892736962532983118e3b30bf6f4645c070177c52d0f6fc2be747ec1f9f2a5d2d5add4a1dded7a7c3d80bd3395a9feb503cb41deee8e9f99770b9022b5334a840422a1d5d354c7aed1b62e2150951e2862b3e6f26302092ddb1a3c7cf259855c986e3ae2f28b096e61491ec9b5e28240188e1f9ac4d202cb59f12c1233497820c845bfc2afca5c555033fea7c93220a27381a3b2c228dfe416785cdecd3a2a8ccde0b8ff49680a5b4c94c65a1d43cafc2e2de78bd60d09931d6ae8730ed0f3f0c63ead5f20570f12414c4c854214a92ac668ae2667d077c5b2db3d97723bd48497230400fef6fdffaa977e46454f299cde2c28e786e0:2
c3cd8af5cff1adfaad2e9019d0aaeab564a7d830d9f4030eb84631f34733455160afe04e6b4f636e1aa6ac82ca0bcfb8a4e55b724addad62e19c203e74e23ffc139282e05e3753ff9e4cfd4c8fd1757fb56511b24ff49ca0f91c22f66c336cdeaa847be180ab0ae1ae2d08aa50d82fc0d989e5dc19d31f17470863f1c776d80122b5750153a69b220a6a85ec3296a2bc536700b1aef97e2647fd166e3c5200eb555f60f0cec61f5cdb9aad76bd93726bc2a881058d7ca4acc666c0b0da5912d440b303fb726393a5a612aa82ce786b770a526e8a73b952ce3efd5f98ce6700aaea38b3e5b06360f6369b7b18c7096cdea1fde013b3fab71766950ae5e4f6073d:2
516d52f3967697733d1f7a602bc722631447c48c36306207a9143e90c4928a7f384737e7a5cb755182feba65dbc151e98ac5dcea2cf23ae4df196afd2768fc27d289a5993a8d2b6f6ef99fa7950db334159346d38cbd442c81833a6e68316e8df29feb3b9d9a4e78450a88ddf46522fb40f70a94b15b1e003251e116b1419706f51a5e73f538320fd628673050b09f773f08557262dc33484510a1597058b2ec4f0ef767e902817255a9b9f2bf6066585a7d7a0247e959734e8c4ca8606247253af3c9b9e1e9f0afd83e5b1b6bea323ea03419fdffb26bca666ea6b1172352b7fd04f2f769df271184d09803ad6a0101981bfa2f9a6526b857bb6151d0c02c34:2
28c0286945c319789870cae5b705b3aa237ad9b1918b4dcf02c3ccaff26fdac24b87903e02c1a726c7e017410463ea8c9ca96c6532433a4129da15127ff3ee822865b74f7bed3a43aff8353582591690b27c4c54e335f7ab2ea4640a6cff1456beb1961b99c003b49fc6cae7d8b9ab75e1dd34f435b8e4bf882ce96b7f2f545235ed9d58ccfcd850beddf7319aca28ef6dba393d989504415c345e25e06d6d03b8cbde5da697da6fde895ad1d1dc6c21bdab335f0f11b69cdb8efb5a84758722b801270e40414df691c1dc203768c71ecfdceecdce3b7e37ad091d73cf7b9c1458dcda54aa0225e4ef5eaab43365a1fa39c25e499757bdc088d1dbb279a113e8:2`;

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
      console.log(username);

      const data = {
        accountId: username,
        dcId: Number(account.dcId),
        prefix: 'web2',
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
