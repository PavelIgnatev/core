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

const accounts = [{
  "_id": {
    "$oid": "6655a238f6c612cb5f71944e"
  },
  "accountId": "1716302377-support-new-100",
  "dc1": "57eaef8844b61c01d7d91fdcb2bac0c86ec6fab7d3b7cc50951e089f6bf9e976501ad27447c86c3b3f9c9c5732bcfd25ccc9a29ff815a63789531581524b9c628126a85b5c01261e3d2d31ab77e779cb6fd7a0a66abe761bb94070be24bdf37f7e6a8c084e10f1bcd962261da043c01a48694cc8c4def068eb8fd646795ffbd82e60ea1479958fb07266e0eaceeda35723817b6ddb2034e26f943261504de4dedc6712c067cadd4205656532fae5491f4171783ed9a14efe90c0f1df89cf1a06d37ce3f30f405a9d7fc31fd7661d54d2ff9f08b743dd08084a1a18c8d0ee14d9ec14a1d53f0eddd9c6b010a6729f9f2c0fbfee0adabe69f20daa8f94fdaf9e6e",
  "dc2": "aa54e346784b7fc1c637e98cb930f143e0c039cb0fc4dec6d1c1f863f3ee5b9095b8019da125c17326be068ab7af478031265cbd3173cb87904f6f15ab32ed6c7a47d3906b805b49851c8aa2c0f059bf32a42df7bf7b49c28e01f60919968b7471436146ce587a90f9120ced9d6fc3636c86a4aa3b2db7d9a67aaa8a3008fa873a8c9b2ec70438f4695d06f937afe751935f51e289536573264251409e6d681cc4b9415cbfe866e180eafcadea9b72c0ae11dda2dc3a365b3c31519bac8dd7e00b2703857a702b551ab3f76c9b5ecc9d76c26c341c1c2c59caa914cd18851dc3e0ee654ab94aac7a0577cb457dac56082cec80ce0b18e9a9fbd6c31870119242",
  "dc3": "81c0ab4876f1da7b7cabd9c587a31f55d98b8b2affd1a700371a292df0c3b97c34a204aff9bdb4bc3baaa97e1f749c67db3cb6a2d646cf7c07425300ed966fac3fbc04889e91d47ed018609dd21172ee7c9dc36cd893d3f014fd7adf855d6ef8f4b8f12d1b44f31400520be613ab26a724e503884e7dab1a47a49573a5ae37066e87c4124635a138f793ee7c3478e03e08ed8711e98f501b27c11e9da0856530e1b102476d88531a24c345cf39f4d434d2efe9be0a08f9a9623b3b1e3415b11c4789642620c8a92b8e2ae03f32ad489f9cc981fd278dfd9b259fadde50b702ae3934de4264ab17962ef43d17e3722275b56e62702cb43476d4bad9dc11a53545",
  "dc4": "08fcd81d81fb2e5e9f6fd55efe83eb02ec7e364002abb2083b1136170d99d20ccffa148222b50a7508c3608c0b2ca18b9bd4f1d1e3e1ea731a7f1281a89d2b6cf6040d87da8b38c573a436d1deb070f6bb4a09f062ec8ed8d471b1c28bb06eb54f70d951a8d5f1c7ba09a86ec934251fed2dbc960c829f61b1c0afd28ef3ca3e90bf368c947856109c0b94f2b66e2cbc3d20969e49a7d9dd86b9bd9fb1ffed802c18f62acf102df653e37270b0a22e0afd2fc9969872d7fdaa803d9106c321a477edb429c61e09dcb0b63d9625e04ef04fc31b72651ea7f35d178711b754d0e4dacdeb5f272e983d06bb228742ab06655ac2354127db8979522d59dc602aeceb",
  "dcId": 2,
  "banned": false,
  "dateUpdated": {
    "$date": "2025-04-12T13:02:13.620Z"
  },
  "reason": null,
  "firstName": "Gennady",
  "lastName": "Smirnov",
  "messageCount": 225,
  "username": "smirnov_flexible",
  "id": "6832285200",
  "remainingTime": {
    "$date": "2025-04-11T16:20:49.140Z"
  },
  "spamInitDate": null,
  "historySpamBlocks": [
    {
      "spamBlockDate": {
        "$date": "2024-12-12T13:07:00.000Z"
      },
      "spamBlockDays": 12
    },
    {
      "spamBlockDate": {
        "$date": "2024-12-16T21:45:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2024-12-26T08:20:00.000Z"
      },
      "spamBlockDays": 7
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-11T07:42:00.000Z"
      },
      "spamBlockDays": 30
    },
    {
      "spamBlockDate": {
        "$date": "2025-01-24T14:28:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-01-30T05:48:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-03T10:28:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-12T05:36:00.000Z"
      },
      "spamBlockDays": 7
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-14T14:07:00.000Z"
      },
      "spamBlockDays": 30
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-19T10:50:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-19T18:07:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-23T05:25:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-04T07:37:00.000Z"
      },
      "spamBlockDays": 7
    },
    {
      "spamBlockDate": {
        "$date": "2025-04-04T12:15:00.000Z"
      },
      "spamBlockDays": 30
    },
    {
      "spamBlockDate": {
        "$date": "2025-04-03T08:11:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-04-10T07:23:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-04-11T09:23:00.000Z"
      },
      "spamBlockDays": 1
    }
  ],
  "nextApiId": 2496,
  "twoFa": false,
  "twoFaDate": {
    "$date": "2025-04-10T12:58:27.972Z"
  },
  "automaticCheckDate": {
    "$date": "2025-04-12T13:02:13.620Z"
  },
  "lazyCheckDate": {
    "$date": "2025-04-12T09:13:11.272Z"
  }
},
{
  "_id": {
    "$oid": "6655a23cf6c612cb5f7198fb"
  },
  "accountId": "1716283797-115-support-new",
  "dc1": "c0bd273e11952b4d462ac2175677ae0d9bbfb3f61ce514ec9ade42bba607979a0b6dbe7b29eeaf8e08fd70d03f1098515f3a1d7d0df217dd612127d5975ef825c82facf13dc6a08841bd57ac57e05fb3f9c6f202987e98f0e1efaa971a576eb06052a36517d83cac643dee87dbc26bf21e7bdd836718303ebc6f4b4cd91f77f91d0064cf6fd89ecfdc5f5f153dd639ed42765c7c9ade0d1ca228265994b89ffeebb75a1b215bbf77d672673833e982302c2434dcc380f2106a770fbd58773bf57924464356b311ee85b7f745fcf490b25508ba4377eb178ac7e95413c60b485be1d27dad9a64865b8f4804babb2fe8173be4869e78ccf8679b552379aea68dbe",
  "dc2": "1191de77f0c25413738af0a1dfe5aeb06cbc31fd63c572cb2cde698e4e16767760cba64224e287adeb3cb5f04ceb6fef7c038b5254d3435e79aa3ffcaa2349dc8b8a027d0c66932c750bed16bc981c3f03fea1260667041261c57fb72e2ca2abcbb829ca9dd609cd240e7514665a883141e307baea2e1b9727b174318141c4564e057f04eb771019efd96acbc083d57c418eb141e13deda800c60e07cfc99ce5c71784aeef27542ccdf87fd36d257cc45a7d3f210f69b3bc5f8a33e67940e815aa6114ba258a3eea3f1b3f39abffd0364d081cc425920a3f8a9921601f3099f2b34928e5018e1cd194af5103dd7342d425354744720e7f99e27630828778140f",
  "dcId": 2,
  "banned": false,
  "dateUpdated": {
    "$date": "2025-04-12T13:08:25.232Z"
  },
  "reason": null,
  "firstName": "Maksim",
  "lastName": "Kashirin",
  "messageCount": 693,
  "username": "kashirin_large",
  "id": "6836091091",
  "remainingTime": {
    "$date": "2025-04-11T16:22:32.342Z"
  },
  "spamInitDate": null,
  "historySpamBlocks": [
    {
      "spamBlockDate": {
        "$date": "2024-12-02T07:06:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2024-12-11T05:31:00.000Z"
      },
      "spamBlockDays": 7
    },
    {
      "spamBlockDate": {
        "$date": "2025-01-16T17:06:00.000Z"
      },
      "spamBlockDays": 30
    },
    {
      "spamBlockDate": {
        "$date": "2025-01-26T08:23:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-08T20:50:00.000Z"
      },
      "spamBlockDays": 7
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-07T07:42:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-15T05:51:00.000Z"
      },
      "spamBlockDays": 7
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-12T10:26:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-18T17:46:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-20T12:27:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-23T21:02:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-25T11:43:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-28T12:04:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-10T15:12:00.000Z"
      },
      "spamBlockDays": 7
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-08T14:34:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-16T11:42:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-18T08:51:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-20T08:57:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-24T05:32:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-31T06:50:00.000Z"
      },
      "spamBlockDays": 7
    },
    {
      "spamBlockDate": {
        "$date": "2025-05-02T05:01:00.000Z"
      },
      "spamBlockDays": 30
    },
    {
      "spamBlockDate": {
        "$date": "2025-04-05T15:09:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-04-14T11:52:00.000Z"
      },
      "spamBlockDays": 7
    },
    {
      "spamBlockDate": {
        "$date": "2025-04-10T10:28:00.000Z"
      },
      "spamBlockDays": 1
    }
  ],
  "nextApiId": 2496,
  "twoFa": false,
  "twoFaDate": {
    "$date": "2025-04-10T12:58:29.684Z"
  },
  "automaticCheckDate": {
    "$date": "2025-04-12T13:08:25.232Z"
  },
  "lazyCheckDate": {
    "$date": "2025-04-12T10:59:51.712Z"
  }
},
{
  "_id": {
    "$oid": "6655a23ff6c612cb5f719ac9"
  },
  "accountId": "1716286892-115-support-new",
  "dc1": "1e9c0feb3ce9f18d7516348cca2c533fd7d155a72174229fffe84d2c5435567a4c3ece6d7f4ef23647444d27a2540befed133aebcd740bd593095eee4c077fb32682f4f5adb51af171cc48a28ec142ecbcfa269faf32591f4694b24a772b9075323bbd5b4e6080e76a121b5cf1fbf0ba12d382ce987a009e2fdffb9222138b38c55842364ad41da37090a2d59392fe51dc038e103d96a6dd20f7bf7fdb262f25d61bafaa187505c605e2f109a6c07bbc225e2758471bd50a79d0174a863134fa7d0646eb9ac4ed21834d81999154a96584809945ed4e74f68188d1dabc724b71173a1860ab6ca00b6522cf6d19b076c7c7e77ea1c55db19379319b559a855e07",
  "dc2": "74e9b1ce0c272fb7f12ea761ac4ed60681e330631653a5673d758847e1c8baba9eda989eb870d64fea19bf17959c93b0eeb5f4ec81931b6485b1d2f78b421100f6b9689d2a336261e489796d86f59cc0f4415527eaa6dfe9dc1aad90d75fce38bfe07e8f0635b4c696b8e043bbbacf1ee3c07ca7819140b5106680f4e6407dd7a2e3a5a09f923caa9217fd6cfbe963673d1c3f857320ba21c31a320325ab13a27adc8b09b0de703778ff2a5c5b13373e450d988cb331cd5c8774add889545f9eeeb5536a84b35b39055a149600d90d76bb186e2f73451003ec7ab34b4bcdbf9d759478bbf26b1569289a30779731b71445664ba5dc6bd714547207af2084af94",
  "dcId": 2,
  "banned": false,
  "dateUpdated": {
    "$date": "2025-04-12T12:17:21.569Z"
  },
  "reason": null,
  "firstName": "Arthur",
  "lastName": "Gorbunov",
  "messageCount": 684,
  "username": "gorbunov_invisible",
  "id": "7048395585",
  "remainingTime": {
    "$date": "2025-04-10T14:47:12.814Z"
  },
  "spamInitDate": null,
  "historySpamBlocks": [
    {
      "spamBlockDate": {
        "$date": "2024-12-05T06:38:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2024-12-16T07:40:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2024-12-18T06:41:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2024-12-27T06:08:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-01-03T09:00:00.000Z"
      },
      "spamBlockDays": 7
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-09T09:11:00.000Z"
      },
      "spamBlockDays": 30
    },
    {
      "spamBlockDate": {
        "$date": "2025-01-25T14:28:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-01-30T09:32:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-01-30T08:07:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-04T06:30:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-12T08:02:00.000Z"
      },
      "spamBlockDays": 7
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-08T11:22:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-14T05:17:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-15T09:13:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-20T08:15:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-27T11:27:00.000Z"
      },
      "spamBlockDays": 7
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-25T06:20:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-01T11:22:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-11T09:08:00.000Z"
      },
      "spamBlockDays": 7
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-06T12:16:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-10T10:37:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-17T14:15:00.000Z"
      },
      "spamBlockDays": 7
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-12T08:23:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-16T10:22:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-27T11:22:00.000Z"
      },
      "spamBlockDays": 7
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-25T06:41:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-28T11:48:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-04-01T12:40:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-04-04T13:07:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-04-14T12:53:00.000Z"
      },
      "spamBlockDays": 7
    },
    {
      "spamBlockDate": {
        "$date": "2025-04-11T16:57:00.000Z"
      },
      "spamBlockDays": 1
    }
  ],
  "nextApiId": 2496,
  "twoFa": false,
  "twoFaDate": {
    "$date": "2025-04-10T12:18:04.442Z"
  },
  "automaticCheckDate": {
    "$date": "2025-04-12T12:17:21.569Z"
  },
  "lazyCheckDate": {
    "$date": "2025-04-12T10:58:44.896Z"
  }
},
{
  "_id": {
    "$oid": "6655a23ff6c612cb5f719b18"
  },
  "accountId": "1716288359-115-support-new",
  "dc1": "82cfd4c48113cae207482e0eadd7aff348d44d08296c34031f14e2293292b399b2f922c56954112c270ff52437aefcffd82a656574190d7aee1c41fd3635585889dfcbeb598d8002298090e75017beeaffec343355690514007632865b3f7a2c6125be99c512f96e2d90a5dbe8487929bee746eebd2e39be8a7a6c108bc4ebce416661f9195152eae2c3f250d9840ddb1d787785bd5d7f27dca3e9074989daff0f30fe20e5cd298b5f42cee19ddc35869c665373bf3014e3fdcd414285d2398348d91d6174be46776ad1651a7ed828d4de0c3e3a6de344de04df0c25c3b6f9beb45b75362736c8071a032e65f02c54926f9da72a7b706fd36080835e51e5c2b2",
  "dc2": "42643525c03ca63a46db3b7f5326a183bbc87007720b77f5ead06acae9b42cdbd107a8ae6e28a0fc4da743d406029cc9a15a457f2325ad63f2ac85f37d109f76001798d9522ebbbd4d5444532062c2df2478804553f54288fda64aa69c628f3d6303c4f6cec234cee72a2cc7504bd0e6653af546c343dca858582ac786e61957fd805e22884d6d1275308f351c1f9ae0f765f6e0d75374b98eaa317ddd85245297f590f055bfb7c017da33fb815067f0d5833b747756a9ee59e26b96ce2249641f3959c8c176f645dad947d147b25ac44dd958829e4900e0adf0bb2e5b38d0977065929e8bec813239b4d5559f2981b0c0f9e687e35b68b84c801e32b02cff4c",
  "dc3": "1a7b9e34e9f2a5e01a4d3db9308249c50f46038a67064248fa2da53f7604ce2641aa10edbb3655b897cc8f19bd50272d51399031e2e6b634383436e54e20b8759bffb55ae75cb8e1db8a9ac92c2faa85951b8fb3cc556a25f0cb1be750fd963fe9da946eb39750e0d1815c1ac813e4e630403251c21cec456ce16d65a1391169c50fe75616929fed21462563fcd6d628c26d5682f8ccb4170fd1e930dbc2bb67b242686fe9cb71864ca95d98ff56b967918813fbce8c2a9efcd4c68d52aa412dd57c925afe7c67fe5f3c83e60ac559ccfa1f3b836adc9a73c2ab77930bfb38090307038df5cc611aeb8b296711fdbe258680832e2bb2240d5b55f39de003bbc3",
  "dc4": "4f4803143e0837b338486117381aaebf3464eabbfb4eb4482f592ca0a8ca7ee4c28bd852ae63c65c92570edc5b0c299ea1d887f37dec8e8082abaf156843bf19655bac5c9d77ceeab9fe6b6e7ce7cb10eee3564447373072a8530e7099b6b15bec590f2afbea6ff243fbb8a99d91af227ea989cf70508b6c9388c21bf8cf220293c4deaf9ca239ccf6490948f3dc759b9d0cb8e0aded0f37354ed7830d6938daf81b5f6e64ea7da07f7af00e174915ed7f4ba9d0e664737d71cb50e85549d54043921d016a2f46b105e166c8b76b4b1e52fe988c5c84853907e075543b3cc067dfefd3f66f7f0198e85a1a75616f5f5ba0d0d564b78f81a08c2317d79ae52b69",
  "dcId": 2,
  "banned": false,
  "dateUpdated": {
    "$date": "2025-04-12T13:04:27.603Z"
  },
  "reason": null,
  "firstName": "Matvey",
  "lastName": "Petrov",
  "messageCount": 716,
  "username": "petrov_helpless",
  "id": "6940054365",
  "remainingTime": {
    "$date": "2025-04-11T14:50:26.045Z"
  },
  "spamInitDate": null,
  "historySpamBlocks": [
    {
      "spamBlockDate": {
        "$date": "2024-12-01T11:19:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2024-12-06T12:47:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2024-12-26T00:02:00.000Z"
      },
      "spamBlockDays": 7
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-18T14:50:00.000Z"
      },
      "spamBlockDays": 30
    },
    {
      "spamBlockDate": {
        "$date": "2025-01-21T09:59:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-01-24T12:56:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-06T19:54:00.000Z"
      },
      "spamBlockDays": 7
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-09T07:46:00.000Z"
      },
      "spamBlockDays": 30
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-13T09:00:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-14T12:56:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-21T10:38:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-27T08:27:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-03T10:41:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-13T07:18:00.000Z"
      },
      "spamBlockDays": 7
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-14T11:28:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-19T12:43:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-27T09:40:00.000Z"
      },
      "spamBlockDays": 7
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-23T13:43:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-27T11:50:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-30T16:43:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-04-07T13:25:00.000Z"
      },
      "spamBlockDays": 7
    },
    {
      "spamBlockDate": {
        "$date": "2025-04-02T11:36:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-04-13T12:38:00.000Z"
      },
      "spamBlockDays": 3
    }
  ],
  "nextApiId": 2496,
  "twoFa": false,
  "twoFaDate": {
    "$date": "2025-04-10T11:29:28.271Z"
  },
  "automaticCheckDate": {
    "$date": "2025-04-12T13:04:27.603Z"
  },
  "lazyCheckDate": {
    "$date": "2025-04-12T09:59:25.262Z"
  }
},
{
  "_id": {
    "$oid": "6655a240f6c612cb5f719b8a"
  },
  "accountId": "1716288772-115-support-new",
  "dc1": "5ad3831a1e4bac80b52a9dcebdb82b0fa0219d78286514b8ff0d6c31f861b8d12b4a15b8cc56e7416d7e42587fbd99ee5bff3d5afcde62803ac4f90fceacc98c3516550c401c71580283018290bb935d173894db3dd78475090a6a03e3e9db5150a95f57c8ab62666c6f0f33dca92f3c46085cbe4a69816484e539c1a36cec6025898d2ac168f57680818d0d113ed2ed953bbb0a0c6bc083707f7c1c0b1493b159506416418d532eb42a9fd2c9b28151fcad8de5071ed61a63dee73070fc0de388616f9c3b415fee9424bedf0af73ecb5b79bf4044643d4c2a77036de725fb9e3ee7937443512c8af7de0406641a10fefe4da9adee07b18af96b9a0a15092f5a",
  "dc2": "2890a6db5e4d96e3af9515e776699c30b94153a6328cc2b8fbe98efee67731d8cabe1a99ccfb6d580fb787f937c8c9ce09abe0839c1e12396ce616fa9f8936f9d479cf2a5d14248b53fb0c087a2ed56b1d415b9f8925e6f8c5ff5b0ef59d23b8b5bd699600b03b88d2f5bf9d88ada7e5b6e35f541501f50efb94d108f0f11df0cc6eb01e9dc2596ef69adc071cc03206a34236ab10004d60c6cb32ebc2593bfce41218bed6934263f90007676407ead48ecf543e4a458fdb346c4601526d83c26ff0184a218826d989d39f06a03482a200254ad816036dffd1899da134c909a4183864f3d444e69703d488beacfdc86f1101f55b534f103a9ccc6c3700d66c38",
  "dc3": "19f8642c4abc9db9ed27c79607629763a5e3f0467b4e0395af8a07779aa029028621c7e53c79c9a1fca0d8c4f703a7e2e0b204450beaf7166ab575732c10c1ba0f89f46c2d066bc2b3f55c64f428d1b034a3116ff4f990d4b766388649deb71a28f656b89baf603dee21d3631300733f527745c8e81514c0844180b6d98202180478e66259ce13113992d0ed46a87b882acd7c181a6448ade42d3346fe6db0c9651cbedf62be5a12b61e2a06f4134adffbcbb8466d365f28e7c295b52f0a7fb7c656ea428a56ae5fd20ccf65f6f8083dc74254bde30781f31c599986c0490beb30c37a45a90f69dd362a51239671b445daaf91baaee8b512be856d271e78a5a8",
  "dc4": "70daf40c0cc27a0c86785b3e1c7d0399d4b0b3aecd8efa25e365e163834cac211c892d227dc772cd0d25c4c65f35ae6399581db9d37f215f77794458f1fe1cf77a58131a8cecef83c4599eaada1bf7ebf191cf3220bca821b3f9acac948823570febdae2679824d245610cf7e5339a88f8af326f3d45eaa47009dc3cf28d176c4e88fbfdd9013ac4dd32b2834aefb7df30cfb641ef7f1173df555063170fe1e97db4a2a161ded87a30e7fa1a1f23e54a53baea272cfb3ff1d623c18c0281ff6bcf0bf9cd57c4a513a509bb9b612fe3d1085e68bbd57a2695ddaf056db6ae7141039b556efb16f1343c4fb7353ae3d15219569ad62e150dd6e87692934db11c1f",
  "dcId": 2,
  "banned": false,
  "dateUpdated": {
    "$date": "2025-04-12T12:21:21.487Z"
  },
  "reason": null,
  "firstName": "Nikolai",
  "lastName": "Zhukov",
  "messageCount": 295,
  "username": "zhukov_icy",
  "id": "7101196596",
  "remainingTime": {
    "$date": "2025-04-12T07:02:59.430Z"
  },
  "spamInitDate": null,
  "historySpamBlocks": [
    {
      "spamBlockDate": {
        "$date": "2024-12-19T13:38:00.000Z"
      },
      "spamBlockDays": 19
    },
    {
      "spamBlockDate": {
        "$date": "2025-01-19T08:10:00.000Z"
      },
      "spamBlockDays": 30
    },
    {
      "spamBlockDate": {
        "$date": "2025-01-27T06:26:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-05T07:31:00.000Z"
      },
      "spamBlockDays": 7
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-08T08:15:00.000Z"
      },
      "spamBlockDays": 30
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-20T05:23:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-21T10:17:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-27T12:11:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-27T11:28:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-03T12:24:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-10T12:57:00.000Z"
      },
      "spamBlockDays": 7
    },
    {
      "spamBlockDate": {
        "$date": "2025-04-10T11:33:00.000Z"
      },
      "spamBlockDays": 30
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-29T12:56:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-04-03T23:10:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-04-10T17:19:00.000Z"
      },
      "spamBlockDays": 1
    }
  ],
  "nextApiId": 2496,
  "twoFa": false,
  "twoFaDate": {
    "$date": "2025-04-10T12:58:20.812Z"
  },
  "automaticCheckDate": {
    "$date": "2025-04-12T12:21:21.487Z"
  },
  "lazyCheckDate": {
    "$date": "2025-04-12T10:17:23.703Z"
  }
},
{
  "_id": {
    "$oid": "6655a240f6c612cb5f719ba2"
  },
  "accountId": "1716288795-115-support-new",
  "dc1": "63416ed6b0df1df92e4235cbcd9908c7f605e8332a6ad71b165c041e87d4b644a39d096db1a5621589f3fe3c821cff83eb84482cb1317fddd097d60feee104cc15bae79c23451bf80a2179d5952d9ffd9729d2fe56daafce3e3db63b24204277a073b34db72501b3b7b16987c478dabae46b9839520ff55c2428ed45ffc02b2c0310d61299e8c4ea8116f4e7de445bbdd10d93839ade64a00f284a6dba4969d6247320316ff9daac6de24311e146d12ea141fc9ec5acd5dc7558f4b8aa05536397204dd9ee83b3e55ae2e54bb8979b36392d3aad54c8c55896f0c3b3d0df32c2c0fecd336912825fb7c916bdf17a0e8d89237eab49a882c9ed07a7eef8400f99",
  "dc2": "194fb4e63038c6796f7217ad6c7e6f2183cf53fd6ca154b4028cf12a861fd190b48b4fd629aae2b2c2b95d979bbdb32978819ce484b8d69bacc6d3d7ce3e5b2b8d1377de958036cac55b463ccefc6b79509edcd31f7f9efc9a4b033e5cac0637b4389d5db056eeddbae5d651d1d6da99c0ce21952375701c22ad2087df5104971e285fe766a7fe3fcb4d1ae1b91c1bbe705df7fc0be4eee5ed52453ebc1ff89b64602e5f28f953ac29af1a3ba6d28ddffec72599e3797e674943841d86c86fc3c66855b4647a337a534d6d11292c8c824323802bf4aca44854e71110509ec6a6f5c9be7baea62b9640b3bc78ca1503e47b3cbcca8bd0749cbe2f1ccf55e07f99",
  "dcId": 2,
  "banned": false,
  "dateUpdated": {
    "$date": "2025-04-12T12:21:21.650Z"
  },
  "reason": null,
  "firstName": "Petr",
  "lastName": "Tikhonov",
  "messageCount": 621,
  "username": "tikhonov_unexpected",
  "id": "7079393372",
  "remainingTime": {
    "$date": "2025-04-11T09:05:08.314Z"
  },
  "spamInitDate": null,
  "historySpamBlocks": [
    {
      "spamBlockDate": {
        "$date": "2024-12-08T12:18:00.000Z"
      },
      "spamBlockDays": 7
    },
    {
      "spamBlockDate": {
        "$date": "2025-01-08T11:15:00.000Z"
      },
      "spamBlockDays": 30
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-11T12:18:00.000Z"
      },
      "spamBlockDays": 30
    },
    {
      "spamBlockDate": {
        "$date": "2025-01-20T12:32:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-01-28T08:48:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-01-28T07:44:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-01-31T13:44:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-01-31T06:40:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-07T05:05:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-13T05:20:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-22T05:28:00.000Z"
      },
      "spamBlockDays": 7
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-27T11:09:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-07T11:18:00.000Z"
      },
      "spamBlockDays": 7
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-06T07:55:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-08T09:51:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-13T14:14:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-14T11:59:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-20T09:01:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-20T08:17:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-21T09:49:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-24T13:19:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-04-01T12:57:00.000Z"
      },
      "spamBlockDays": 7
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-27T20:55:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-31T10:23:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-04-07T14:38:00.000Z"
      },
      "spamBlockDays": 7
    },
    {
      "spamBlockDate": {
        "$date": "2025-04-12T07:05:00.000Z"
      },
      "spamBlockDays": 1
    }
  ],
  "nextApiId": 2496,
  "twoFa": false,
  "twoFaDate": {
    "$date": "2025-04-10T11:29:28.221Z"
  },
  "automaticCheckDate": {
    "$date": "2025-04-12T12:21:21.650Z"
  },
  "lazyCheckDate": {
    "$date": "2025-04-12T10:11:25.124Z"
  }
},
{
  "_id": {
    "$oid": "6655a241f6c612cb5f719bfa"
  },
  "accountId": "1716290204-115-support-new",
  "dc1": "c19b2a420e685fea1e96fd295fe837b00317f4d6bfbc21cf439509578687d8fa286ce3a4731943d9004de095e72fa69f63b71cc3d2ae9b6a3edb64897c76e727fff54201eccd6f08e4c5efa68bd33a1e970b40d08c8fb91c92a134d82ff4f295a8a0a793cd06c0ef25578f61d33cb33b7d0fad4effd0a7622d0f47cd6ab766a38dec891b758fa54b5071b3438536a293e6e56532ce55261ec6880bd52018ff0d20ae0232349d14dbf09f5c0f2ccec08c6c503e03638c058dae60a0b9965ba5dc0f60e9a6f39405b12d4ae6d9c8879677a13e11564e4f3c5a74c9c1ee97e72dfdcdb63bfcc600112272c5df2ee46f0afe172a54b750c670f793051c31d653de1a",
  "dc2": "659e8a1218fa69df298e6c80f4cc305d6bf449b0d62d4c55956dd6b1a959c09d12fa7f5616b0e49f49d72196ed5b1d32b9fa1cc2a68f5392f9d4d8908b7058ad8b1d53f9c6fa2299ca2ff2add5a7d71b93cb91e76978550b4394d19f1c4ee144784e7b7afc11543d795d04b97c1c017caf01414fc6d51e8326498764421374ea4047a7499710f29ded6001188d33dfda2240267aff75677592129ed2b47c29ce45671de1ba1a8597357e39047838e2e81cf3a4e5aa5dbcd475901d555ce06b3973b0c5cbd1a0aa3730bdf44d2b4e1f4c9e7c8b4a4098c3a0ec872d46f8a5ec1cb893e93accc901f246ee99c1e2b685e23bb2a6ea381081006a3ec7bade278ff2",
  "dcId": 2,
  "banned": false,
  "dateUpdated": {
    "$date": "2025-04-12T13:01:24.393Z"
  },
  "reason": null,
  "firstName": "Stepan",
  "lastName": "Efimov",
  "messageCount": 666,
  "username": "efimov_willowy",
  "id": "7172761869",
  "remainingTime": {
    "$date": "2025-04-11T10:16:28.207Z"
  },
  "spamInitDate": null,
  "historySpamBlocks": [
    {
      "spamBlockDate": {
        "$date": "2024-12-14T19:38:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2024-12-19T09:46:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2024-12-23T18:25:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2024-12-29T05:18:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-01-19T12:10:00.000Z"
      },
      "spamBlockDays": 7
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-18T12:23:00.000Z"
      },
      "spamBlockDays": 30
    },
    {
      "spamBlockDate": {
        "$date": "2025-01-21T05:33:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-01-23T13:17:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-01-24T08:20:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-01-25T08:55:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-01-29T19:03:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-03T13:56:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-06T14:21:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-14T05:48:00.000Z"
      },
      "spamBlockDays": 7
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-19T08:10:00.000Z"
      },
      "spamBlockDays": 30
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-12T08:22:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-18T05:40:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-25T11:11:00.000Z"
      },
      "spamBlockDays": 7
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-20T12:10:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-25T09:15:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-26T07:17:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-29T13:16:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-29T11:52:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-04-03T08:27:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-04-18T08:18:00.000Z"
      },
      "spamBlockDays": 7
    }
  ],
  "nextApiId": 2496,
  "twoFa": false,
  "twoFaDate": {
    "$date": "2025-04-10T11:28:59.654Z"
  },
  "automaticCheckDate": {
    "$date": "2025-04-12T13:01:24.392Z"
  },
  "lazyCheckDate": {
    "$date": "2025-04-12T10:04:24.970Z"
  }
},
{
  "_id": {
    "$oid": "6655a242f6c612cb5f719d09"
  },
  "accountId": "1716293376-115-support-new",
  "dc1": "9cf9f1733c390b9406e346931443a069878e6be5d8e990dd1b5e2c6b3d954a6366b8d08181f3cb3b14d121d08377073873e8fae0769e5e14470dd3656bdf602297f360feea95cc58c6acdcb3af0bc6ae62ddb27469729e42ae81c067405894f61b5ab2e9cfb15f2893b955ae0a3d46b488d9384d2e6e3c647dbfeb1da92283bd87eb462cfc7148f8ef4f7d9065c19510b5a6ee0d922d1158dea8ea4bab1dace06d7b8c1cd696a40470e1f892b5fb0969762f034476a0c5a9c4bf7e2abbd32ac210fcb600cd51966d4a60091418d18cb450a38e821651db6cb645d88a6e0498da096293e9e13848d270c9c59c88e0232193863d262468f835834306a617ed3418",
  "dc2": "7c700eab7ad5256d78f9efb5423b2f970527b8d7bd200ade407dd7cb210771bdaa66079481c3424944c9f51fb71d07fa5a8a1e84ff71a66077b5ba95d46d59ee5337bdb2bb59c106f7dcb506133957384e1954f0aa85dc633912ccd36949f31de73919915d8502a454bd4e126458582404ffbd8f79ebdfa88dac244ef583e62893229ede735979f17d929a687af9168d05004655dc440147660bfed3df36d98a72e466c737014f2489a7dcb4b8e7da11ed0d5ec0f37ec646c251bee598e76a918a563603a0a1b78a57504c098a65d833093b4ff58446dc89c666f972517c53273e0ea16e2545e1012cb6de081a3ac32a827ddb74cc2c74c848960ddc8e7feb89",
  "dcId": 2,
  "banned": false,
  "dateUpdated": {
    "$date": "2025-04-12T12:23:22.798Z"
  },
  "reason": null,
  "firstName": "Vladimir",
  "lastName": "Mironov",
  "messageCount": 455,
  "username": "mironov_unique",
  "id": "6947790125",
  "remainingTime": {
    "$date": "2025-04-11T12:20:50.251Z"
  },
  "spamInitDate": null,
  "historySpamBlocks": [
    {
      "spamBlockDate": {
        "$date": "2024-12-04T12:47:00.000Z"
      },
      "spamBlockDays": 4
    },
    {
      "spamBlockDate": {
        "$date": "2025-01-04T10:34:00.000Z"
      },
      "spamBlockDays": 30
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-11T10:09:00.000Z"
      },
      "spamBlockDays": 30
    },
    {
      "spamBlockDate": {
        "$date": "2025-01-20T11:34:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-01-27T07:43:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-01-25T14:43:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-01-30T12:37:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-01-31T06:32:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-03T07:19:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-03T14:40:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-07T16:09:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-17T13:14:00.000Z"
      },
      "spamBlockDays": 7
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-12T06:59:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-15T07:08:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-16T10:05:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-19T08:11:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-23T08:28:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-05T08:36:00.000Z"
      },
      "spamBlockDays": 7
    },
    {
      "spamBlockDate": {
        "$date": "2025-04-04T12:03:00.000Z"
      },
      "spamBlockDays": 30
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-08T12:22:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-16T07:32:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-19T15:35:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-24T13:56:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-04-02T08:41:00.000Z"
      },
      "spamBlockDays": 7
    },
    {
      "spamBlockDate": {
        "$date": "2025-04-01T13:46:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-04-03T05:36:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-04-06T09:50:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-04-14T07:19:00.000Z"
      },
      "spamBlockDays": 7
    },
    {
      "spamBlockDate": {
        "$date": "2025-04-12T10:23:00.000Z"
      },
      "spamBlockDays": 1
    }
  ],
  "nextApiId": 2496,
  "twoFa": false,
  "twoFaDate": {
    "$date": "2025-04-10T12:17:55.859Z"
  },
  "automaticCheckDate": {
    "$date": "2025-04-12T12:23:22.798Z"
  },
  "lazyCheckDate": {
    "$date": "2025-04-12T10:57:52.586Z"
  }
},
{
  "_id": {
    "$oid": "6655a244f6c612cb5f719e2e"
  },
  "accountId": "+79304762131-115-support-new",
  "dc1": "6503ee906b7ade35187f0cb5183eb2d218fff3ea011d5760ea4d617b88b024ae6d4ed23ea8d3f13ab4ec22a38f1b9ed6eb21b1914a605b29404ba3ff71744d9548a274cddecf99e4196fc71e0fb742b77968bab8604929fac0589ddf8f3cb417b325d3f81f1ead19f0ba78c8f139b73c00f18757e7f96b44f5fe68cb8ed18af1f347a7c8c951beeda9c13ffac911c62dfda5abbafb4fdc778d6f1880f91c6e1c42da5e09a1626a1646031acfa3b53b5d35510ce1f6a13bf2c6ff455ca301e3e240de872174c9685f83c403ab0d0501f40428dd6bc6c9fffbee7a511c6960df442b020ebfbb7b774fc5dcbab043ac537ed59ce0878c40b700541109e4b737c771",
  "dc2": "aeb4715a7415bc8f0a5ef7aadc36463a9a4e817a1378f6cd55491304938188b7bf4e99fc4a2a7b06a50e1c8b70733f8d93a92be34d2aa03421818bf0069f740dafdb0b683f53b8d0b1e035c7cf802b2fd4d769adab6138f2a833ea3124db2540a823a485f80f61420452a4c4fbb93efb471f4dd91b5cbb274416c15377290539f267401c77e88c305cf4684688e9b3c9283c71ea374197c8dcba343281170bb9c3f752e601c6ea5e16915e8c12011736389399fbcd5721eec9c7ad3e1f6af9dbb55985bc5b15d712ceb8c36f1d04dc42408178ec9233b2d6cde8a72d0602fc85ff7b452719726cdc19cb281bdb6e67035dcf9d87b1a646f1cc37ed83d80552e7",
  "dcId": 2,
  "banned": false,
  "dateUpdated": {
    "$date": "2025-04-12T12:40:22.038Z"
  },
  "reason": null,
  "firstName": "Artem",
  "lastName": "Semenov",
  "messageCount": 279,
  "username": "semenov_comparable",
  "id": "6545904505",
  "remainingTime": {
    "$date": "2025-04-07T13:51:19.274Z"
  },
  "spamInitDate": null,
  "historySpamBlocks": [
    {
      "spamBlockDate": {
        "$date": "2024-12-04T14:24:00.000Z"
      },
      "spamBlockDays": 4
    },
    {
      "spamBlockDate": {
        "$date": "2025-01-05T07:17:00.000Z"
      },
      "spamBlockDays": 30
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-14T22:07:00.000Z"
      },
      "spamBlockDays": 30
    },
    {
      "spamBlockDate": {
        "$date": "2025-01-21T12:20:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-01-26T16:27:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-03T13:31:00.000Z"
      },
      "spamBlockDays": 7
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-07T05:53:00.000Z"
      },
      "spamBlockDays": 30
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-21T10:08:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-27T07:22:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-07T02:08:00.000Z"
      },
      "spamBlockDays": 7
    },
    {
      "spamBlockDate": {
        "$date": "2025-04-07T05:45:00.000Z"
      },
      "spamBlockDays": 30
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-22T11:25:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-29T13:16:00.000Z"
      },
      "spamBlockDays": 7
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-28T06:30:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-04-04T10:15:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-04-14T19:52:00.000Z"
      },
      "spamBlockDays": 7
    }
  ],
  "nextApiId": 2496,
  "twoFa": false,
  "twoFaDate": {
    "$date": "2025-04-10T14:32:18.967Z"
  },
  "automaticCheckDate": {
    "$date": "2025-04-12T12:40:22.037Z"
  },
  "lazyCheckDate": {
    "$date": "2025-04-12T11:32:52.529Z"
  }
},
{
  "_id": {
    "$oid": "6655a244f6c612cb5f719e6a"
  },
  "accountId": "+79319672383-115-support-new",
  "dc1": "7a00fb187afdb0c63ca03981e6d7d25b28ac0e69b972b36a2208601d9418bb802073d32e4469141a4ed9532bda44c107d94b63ea5004fd40c99b6cfc5c4b386fe6248aebcc028636d8e37ae0d2e074e2b8bcd9e0db676296db05d72f14dd124147a21b4ed1d993a93e9feb25833dd8e16cd953722572bea1a2ea00d6618534a8dcf7c642c3a64daf63948b088a52ecd7e1f31905377f9a0ffa122d8a7785146703a086607a43d1b37087b5e97825121f5cf3f0b238097e0a0d501a81d71c2dec1e1d7bbde0bbad045193c740ef49249272c0fc50ac91484172dfc8c8b559d7367c24d91fbb7e44957674d4d991bfec4337ac02f365e850f66265aa19831d1764",
  "dc2": "2e7ec34de2edb81a01d21f6ef9e7d4b1471365b48138d5f2443383bf620265dfa30b60a8afa65e5817f849a6ce1e700c7c6a16e55b854ccfb9b1628810bbc758ff150ed26881f68892f9e54e9d4d742bccf821b55e548ffaaa267031cc8df1d0cee2a7774235567ad826a0db82136253fabc4f1c7797fa48ddb730c5290bb19ac9d1f6fa97c8b925caed6f5a456e956a1f6d8acf99c11c06e2a5fbc7dd7f6a209e5206e39c7c092ea474c8329089fb399ec7eaf3478981a9f27d097524442f149660ff4deaf13c3257a0924dbf339cfb580d52e59869885e9ee0aece3ab816285cf2f6b9a57ea05292c4db41ef283828c9704cd19727d6eb80dbf5a1555549e4",
  "dcId": 2,
  "banned": false,
  "dateUpdated": {
    "$date": "2025-04-12T12:15:20.638Z"
  },
  "reason": null,
  "firstName": "Matvey",
  "lastName": "Zakharov",
  "messageCount": 709,
  "username": "zakharov_precise",
  "id": "6921061205",
  "remainingTime": {
    "$date": "2025-04-12T07:16:02.140Z"
  },
  "spamInitDate": null,
  "historySpamBlocks": [
    {
      "spamBlockDate": {
        "$date": "2024-12-07T06:03:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2024-12-21T10:43:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-01-13T07:36:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-01-16T08:08:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-01-20T14:34:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-01-26T14:12:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-01-30T13:07:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-01-31T11:17:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-04T08:56:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-12T06:20:00.000Z"
      },
      "spamBlockDays": 7
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-06T13:01:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-10T10:11:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-15T05:59:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-04T12:53:00.000Z"
      },
      "spamBlockDays": 7
    },
    {
      "spamBlockDate": {
        "$date": "2025-04-06T12:00:00.000Z"
      },
      "spamBlockDays": 30
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-20T12:54:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-21T09:30:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-24T14:47:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-04-03T07:24:00.000Z"
      },
      "spamBlockDays": 7
    },
    {
      "spamBlockDate": {
        "$date": "2025-04-01T12:44:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-04-05T06:32:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-04-17T14:21:00.000Z"
      },
      "spamBlockDays": 7
    }
  ],
  "nextApiId": 2496,
  "twoFa": false,
  "twoFaDate": {
    "$date": "2025-04-10T13:49:27.858Z"
  },
  "automaticCheckDate": {
    "$date": "2025-04-12T12:15:20.638Z"
  },
  "lazyCheckDate": {
    "$date": "2025-04-12T09:54:24.663Z"
  }
},
{
  "_id": {
    "$oid": "6655a245f6c612cb5f719f28"
  },
  "accountId": "1716476934-160-support-new",
  "dc1": "a0cec1b942a257375d4000d5591b810b5a7012c12e71d84163010c2f7eb6c064148cd32525e44f9329408014a4e090b6ff4c651a9a2f1f514b6060706844e7bc42648c4a6465ce5762f3c45aec27655f25c7079930aa30f7dd10ea1d4ebd332bb80eb1d7fdc0378bd3978d32efffa4f1f68c1390530e1d6f227d88f7eafabb11808ac1250294195d560e536453f340eb4e91a6e4c40e7a5509d7c5ecf8da94d7e72b67b7a51aa9316c4d97e6673a19bba2782692335a4a5acc5a3f62c7060dcce7c0bd9ed3137a061f9c14d1f1707b9399adc0c76e0436d7fc41a92919405b5f438dbba3bcdf3832524f67b30e0b7f93fc06beca90557c5411f6e06ae5ee78a0",
  "dc2": "5315c44062b8de1195b0a7476437a35c4601c8e56a4a5d3908e4da3150f8aeb64f7d35aa6fdb75d2e0f9adeff9014087fe263164d2a31d15de35f3df10dad72da707d6e7af84670c836b1b5eb072bb8f6bce93e47528a7fb7219602c170c14408911added83ec7d9c3bac0d692618bcefd8edd83d627ee49488a1603b8c0afea25589a416f127c2022962f89cb262693b43ec96dcb91a704a9a0e95e4c36213f652ec648d2d1121d354d0ab74fbd5417a9c7a322b7ff46eeb423ed4e29d86279e89d61de78e6bc42d711212e734a0358843ab9c23d9a058171431a800eba7adee70f4b264822f9dd29f74ee8880f049e9040171dadd29bb778b39a6485dab92c",
  "dcId": 2,
  "banned": false,
  "dateUpdated": {
    "$date": "2025-04-12T12:27:22.758Z"
  },
  "reason": null,
  "firstName": "Anton",
  "lastName": "Malyutin",
  "messageCount": 703,
  "username": "malyutin_accessible",
  "id": "6675532340",
  "remainingTime": {
    "$date": "2025-04-11T15:31:44.599Z"
  },
  "spamInitDate": null,
  "historySpamBlocks": [
    {
      "spamBlockDate": {
        "$date": "2025-01-13T10:08:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-09T12:40:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-25T02:12:00.000Z"
      },
      "spamBlockDays": 7
    },
    {
      "spamBlockDate": {
        "$date": "2025-04-06T07:20:00.000Z"
      },
      "spamBlockDays": 30
    },
    {
      "spamBlockDate": {
        "$date": "2025-04-08T08:30:00.000Z"
      },
      "spamBlockDays": 1
    }
  ],
  "nextApiId": 2496,
  "twoFa": false,
  "twoFaDate": {
    "$date": "2025-04-10T12:58:05.470Z"
  },
  "automaticCheckDate": {
    "$date": "2025-04-12T12:27:22.758Z"
  },
  "lazyCheckDate": {
    "$date": "2025-04-12T11:47:54.121Z"
  }
},
{
  "_id": {
    "$oid": "6655a246f6c612cb5f719fb8"
  },
  "accountId": "1716479237-160-support-new",
  "dc1": "8b41d5e58470d4f8a80bb9ec11f43d5ed82cd399fd6a7686e834b995cfc9cb666c364182749537c501705eed214eb9b1acc5bbde0c420410bfa72e01430759f2b77b38ac6f3f349efb31fa7f47f6ef64e8c2ab929287f674e1d3cf62f477eedb46008311fb772a11dbc091347659191d44f8cc696968d43c35780043ebb135ff24cf88d4cb57dff4ea99fc9f283f78e3a92b6fd076a8d4196b54bc017e388b377639416d2cfb34349a7e9829acd38ffd36449fe750ca81404efa03a48eb1eaa9a9dc5a22043ba0e6356f1f78f467c82bfed89c7df78c0c5bab3d0e5cab75313a317d7080205c97246a062dc70812fa01263d5e9ed19083391d3182df53eb8dd9",
  "dc2": "1b102fa7320dc9d5b8865c07c593a51b7c74c0b0c9592a30b811e0d88b608de928b1fc85a5f8cc389cbb3fa3d88e08a362d9a14efefdaa049e0537546d9eb21e96505f7ce0ee88aa12dbd01564c659927809c20799671e02ab07d0cf19c34bf096da8fa758e05269bccc42a9e609df1d6b177cefa2fd4f19b31e043702dcfdf98e6d0445aa6a4f51eb4e090c728d4ca662ff1d31213452adcdf2be76023c1279a17002d4561cb731580a9aae63a1e9666aa4a9c893e4d460cbdb1828b42593e64a37a6fb638806c0918bca0161b3dbcf7b7a37cc9d7ce0664c6538d55ce2999fdcf10eca51777178a369d9d8210f724020af32356e1cec6af0aebea9e20e7845",
  "dcId": 2,
  "banned": false,
  "dateUpdated": {
    "$date": "2025-04-12T12:28:21.113Z"
  },
  "reason": null,
  "firstName": "Artur",
  "lastName": "Tomilov",
  "messageCount": 266,
  "username": "tomilov_tart",
  "id": "7071549441",
  "remainingTime": {
    "$date": "2025-04-12T07:18:07.675Z"
  },
  "spamInitDate": null,
  "historySpamBlocks": [
    {
      "spamBlockDate": {
        "$date": "2024-12-05T07:06:00.000Z"
      },
      "spamBlockDays": 4
    },
    {
      "spamBlockDate": {
        "$date": "2024-12-12T05:50:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2024-12-17T07:22:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2024-12-20T14:51:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2024-12-30T20:43:00.000Z"
      },
      "spamBlockDays": 7
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-14T05:40:00.000Z"
      },
      "spamBlockDays": 30
    },
    {
      "spamBlockDate": {
        "$date": "2025-01-21T11:24:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-01-21T16:16:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-01-26T08:19:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-03T16:37:00.000Z"
      },
      "spamBlockDays": 7
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-03T11:17:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-04T10:57:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-08T08:14:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-06T19:51:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-10T10:22:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-14T14:15:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-15T07:07:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-21T00:16:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-28T11:21:00.000Z"
      },
      "spamBlockDays": 7
    },
    {
      "spamBlockDate": {
        "$date": "2025-04-05T07:37:00.000Z"
      },
      "spamBlockDays": 30
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-07T13:49:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-08T08:39:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-13T21:46:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-26T10:30:00.000Z"
      },
      "spamBlockDays": 7
    },
    {
      "spamBlockDate": {
        "$date": "2025-04-27T03:03:00.000Z"
      },
      "spamBlockDays": 30
    },
    {
      "spamBlockDate": {
        "$date": "2025-04-03T11:51:00.000Z"
      },
      "spamBlockDays": 1
    }
  ],
  "nextApiId": 2496,
  "twoFa": false,
  "twoFaDate": {
    "$date": "2025-04-10T11:29:03.274Z"
  },
  "automaticCheckDate": {
    "$date": "2025-04-12T12:28:21.113Z"
  },
  "lazyCheckDate": {
    "$date": "2025-04-12T09:26:11.490Z"
  }
},
{
  "_id": {
    "$oid": "6655a246f6c612cb5f719fc4"
  },
  "accountId": "1716479246-160-support-new",
  "dc1": "9bf672e77a9152f8dc22d821a229a06cc8c2c61115fe6e597f3134fbc20c0c1b2d603cc8e1cd95be4b4a691127d5a7935f3b8c0df72a6434fcb5d4900678f90abafe3174bdb49696c93e88a579216e89c69c9f42dd2df76ac750682f131b6994afc450a5ddbd9a5cbe2783dcb8bf62f6a4555a57d2a5236c69011881195e2e18818abd0a3bc3ce68c4c0c19c1ae8f76708ba73a697863adc10cbeda9e8af2a7f9e2b52916f96df7ae928513dd0254db5753bc2ca65064715a5399b6d607f0b1ae9b91fe55367a34b36a52c99b5ac8a4a59e1bcf6fb2f518a1d6266264dd0cfa63c6e5377a8c9d248bb3807f7ca9708efc4301eb72549a23415d05288887312d0",
  "dc2": "14d3eb61ff46d1245f5bf3e7706f19addca752f04156e92ec4eb548b3146d05bd96229ce95a4edf8d3532a7c56f00c28cd7cd39691d76b7ab15abe1e6fc114e8b59fefde2ccd6b9adaae9b26605286d5cdfefe2d88eb736ab89aad50d2ee45f93293e853241bf033e507585dcd7036256655a941761cea3f8119499afbf71c741c3ce66ef3f2930f71798d2e98c3970ac497667ea225d6b86e054174dfcac395ea65667965a0dc277ebdd680d3afea30508ee8b6ab9d52f0341b427fab4cf5610327d6a40da306987736860a16cfacf682dc75473fe438186bc2c2ebb4fb01b8549ca0d900933d154dbe950372c9cd16df52aa1271652bb0480d769af21179f5",
  "dcId": 2,
  "banned": false,
  "dateUpdated": {
    "$date": "2025-04-12T12:20:22.822Z"
  },
  "reason": null,
  "firstName": "Viktor",
  "lastName": "Tkachev",
  "messageCount": 692,
  "username": "tkachev_delicate",
  "id": "6602732914",
  "remainingTime": {
    "$date": "2025-04-11T14:18:38.083Z"
  },
  "spamInitDate": null,
  "historySpamBlocks": [
    {
      "spamBlockDate": {
        "$date": "2024-12-06T14:20:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2024-12-23T06:41:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-07T05:47:00.000Z"
      },
      "spamBlockDays": 7
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-10T22:01:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-27T09:54:00.000Z"
      },
      "spamBlockDays": 7
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-21T14:32:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-27T07:26:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-07T10:32:00.000Z"
      },
      "spamBlockDays": 7
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-06T11:26:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-14T09:00:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-14T03:02:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-18T05:36:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-25T12:49:00.000Z"
      },
      "spamBlockDays": 7
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-24T09:27:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-25T14:19:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-30T14:12:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-04-18T12:21:00.000Z"
      },
      "spamBlockDays": 7
    }
  ],
  "nextApiId": 2496,
  "twoFa": false,
  "twoFaDate": {
    "$date": "2025-04-10T11:29:10.240Z"
  },
  "automaticCheckDate": {
    "$date": "2025-04-12T12:20:22.822Z"
  },
  "lazyCheckDate": {
    "$date": "2025-04-12T09:21:11.454Z"
  }
},
{
  "_id": {
    "$oid": "6655a247f6c612cb5f71a041"
  },
  "accountId": "1716479361-160-support-new",
  "dc1": "43f49bc54f2c8133d20a57c47a91fff48d1a8f863971e97638acab4341519ad0711560250c55d8ccf6a64e81d0c0020e72c06039edcb9369059cc232740ab19dc14f1a543c5ec4b5e8327003abd925fcf402d6cc901da8b2857ab7566eea001d4edc0919833ac8d21c7e4ccb4e90583122c721572067dea011a6b9d23a971c02ee39e0d4b8bfb579ffe927be4b26a98f4cd1b8f69012e1175da017d7d35f23d31b884adcb491bcc8184d1c28e606ca54a2d7b723a01a47980c33f4903d3c2ce4a0666fd4529f5fc63635da8ad154eddaaf6b4def0f2ab8592b64c0a9f6dfa544fd8e79588e1816d1b4f1bc0f1414a631374d97f6c0a122e363305f174bf89661",
  "dc2": "541b8fb7b359cd010faf36c1a08963df8d432677ff15dd351bea8c1458244a68778df3a467877afb8a88273d92c616a5dca80b4a058824f1226e8e377f801820f874efb3323fc1d3ca3bdc740ad1a3bc778e506c2db358dbb5ac3a98b1b75cc3db35390e1d986dd46efa5919aa6ccf200bc0f768dca275e006efeb5be8c5df59eb912d83742098a84c8f772e4e08aadbbae952dbcbd5a9c7e4c10aa46c012ced4a5f0176b182406444c51b6adf226d5a50e5439491f9b36f8091f7081cace5da7049a10ac18b9c4fd7793207dff926ba5e5ceb9db3ae9241ec2aa03176feb2b4484ce52032429ea61a5b92adc34b3ceb25c80a7333cb277897e35dc3436736b7",
  "dc3": "81d48f04a05a17a27f681d2df5755275103e955e66d376b7192706b8e0fb45034eeafcd1f48d02c9b7cb108d96aabad686edffa6e25b058d1162784f6f2e4f40125ff98090c5805c708c4cab03bdbe9ba1f92c2d3c3f09ce9f0bb574f618a8e813e69a4b95a2908ded595aef0491a1721b32dde0590699c9400ad6b843714f14dcd08eac4f39a8698a85de181b0f3a49f36f562e42aaa74172d788202204d094b91ce397ed701360e94a89eef07580dce986b7a51c5d1f773012fc71f3a5db422fc3fb991b43fad6fbe3bbf5f439614c5cbda141b7b11be04097764c8d3f4bdfaf0d447784bad5540dd682ae6d5a16db0f0cf1ca9f5fe64b74c177355fb67af3",
  "dcId": 2,
  "banned": false,
  "dateUpdated": {
    "$date": "2025-04-12T12:35:22.850Z"
  },
  "reason": null,
  "firstName": "Leonid",
  "lastName": "Pakhomov",
  "messageCount": 496,
  "username": "pakhomov_wooden",
  "id": "7088018722",
  "remainingTime": {
    "$date": "2025-04-11T15:33:00.501Z"
  },
  "spamInitDate": null,
  "historySpamBlocks": [
    {
      "spamBlockDate": {
        "$date": "2024-12-22T13:06:00.000Z"
      },
      "spamBlockDays": 22
    },
    {
      "spamBlockDate": {
        "$date": "2025-01-24T13:35:00.000Z"
      },
      "spamBlockDays": 30
    },
    {
      "spamBlockDate": {
        "$date": "2025-01-23T14:08:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-01-25T08:18:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-01-28T12:17:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-05T07:39:00.000Z"
      },
      "spamBlockDays": 7
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-02T10:09:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-06T06:56:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-14T12:24:00.000Z"
      },
      "spamBlockDays": 7
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-23T07:50:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-02T13:29:00.000Z"
      },
      "spamBlockDays": 7
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-26T14:18:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-02T12:29:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-13T07:07:00.000Z"
      },
      "spamBlockDays": 7
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-08T09:05:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-13T09:30:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-13T07:19:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-17T10:05:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-25T13:40:00.000Z"
      },
      "spamBlockDays": 7
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-25T09:09:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-28T09:24:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-04-04T13:32:00.000Z"
      },
      "spamBlockDays": 7
    },
    {
      "spamBlockDate": {
        "$date": "2025-05-10T09:48:00.000Z"
      },
      "spamBlockDays": 30
    }
  ],
  "nextApiId": 2496,
  "twoFa": false,
  "twoFaDate": {
    "$date": "2025-04-10T11:29:03.259Z"
  },
  "automaticCheckDate": {
    "$date": "2025-04-12T12:35:22.850Z"
  },
  "lazyCheckDate": {
    "$date": "2025-04-12T09:25:11.452Z"
  }
},
{
  "_id": {
    "$oid": "6655a247f6c612cb5f71a0a8"
  },
  "accountId": "1716480548-160-support-new",
  "dc1": "56077891093cf75070fb3cdc7c37ff7c9c0bc7bf30c347c3c277e2ea8fc45061e80258115319a1ce0cbef1df7f3c4e75e59a04ea33f3b199a5d22872f38cab0481e411ba5f95d03140ad305235493f5c53c46b8409a241158bb893f75b9da523f639a5a6b5e30d66c0c3ceb1e8b8ccd4df81863dc463231113a4ab606acbf665c56ca6bd72437fc4671a312e79badbd2d96f7bfea1644a86115cb0371c562b38a4ba0bdd0bad72a65d1e48bd3795c9d2755995b8c9cb525eec068afea86e523e42e493fc13179acc24e3866235fdc955aac7c883ebff5c620f8da7f23afe335927f5b0ddd5cc3fba13441266d8e792473a086e6209e2804ef01e097c0d4fa238",
  "dc2": "7885a2ed581d0d66f8984c8b88dad8cdbad0596067d940035ac0f7227efa5f2c011e2e4caa113eda08be0765d02e4b54abc7503bddda229853093f328fcc63ae522ef0f81f6b5799795c6772cc43ad75efc80673f27cb7fbfafa28ccca144325d4d83618670998c097721e8dce207a26de5b5a772ed72049dc01d8d943140727b6e245f5f692b26323e888a1dbf389b36d60a6a3e9854f8017d7d62cb7639bedbe753810d75596a8825663627656461b9b47f16632bd0092a23bd076dd21c53ca2b7300b19ddade7edae3e3e5b3fb7cc63a487d2a6e9cb295e5f98f3c3fdc79d9cc2406fd1e70b1e97ae0847504c2aaa52bc2be83129cc281646e2d520ba7a05",
  "dc3": "8a551bd329c5f9d4de5f5787eea74641c18684c147b0be69a2325da5287de9ab0a0d97506f20ca3eb580e7ce95e318bf8c52dbafb3c00b64f2140622bf65e78f0a958e52981b58e9d1572a06d504edbbba285ab0c526aacd63efe38d658e9b3041ef10eba8d697581788fc84b208a08403d025a812af003ec68b40d6afaf2c7fa0cb3e6cd4d31c07734b59b19df5fc8431c8f6a91fc0fd858117ae7f8255bb58a5ebacf413688ea2d16e8ddb7b28627c179a244d458a73d52453ba3d103c58acaf414750a166bf7179b07bc8ab410af5e02fd2d1e326d501098dca529457b674523e5911fb625dbff82d1f40e6c9be86e0c9c5ceb24f7b02ceecaf413163b3c4",
  "dcId": 2,
  "banned": false,
  "dateUpdated": {
    "$date": "2025-04-12T13:02:28.588Z"
  },
  "reason": null,
  "firstName": "Viktor",
  "lastName": "Ermakov",
  "messageCount": 478,
  "username": "ermakov_aesthetic",
  "id": "6446791854",
  "remainingTime": {
    "$date": "2025-04-11T16:44:55.149Z"
  },
  "spamInitDate": null,
  "historySpamBlocks": [
    {
      "spamBlockDate": {
        "$date": "2024-12-04T06:45:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-01-03T10:20:00.000Z"
      },
      "spamBlockDays": 30
    },
    {
      "spamBlockDate": {
        "$date": "2025-01-13T11:19:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-01-27T14:57:00.000Z"
      },
      "spamBlockDays": 7
    },
    {
      "spamBlockDate": {
        "$date": "2025-01-24T14:08:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-01-25T10:36:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-01-26T07:20:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-01-27T11:06:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-01-31T12:14:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-02T05:12:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-05T13:49:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-14T16:05:00.000Z"
      },
      "spamBlockDays": 7
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-12T09:50:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-15T14:18:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-24T08:41:00.000Z"
      },
      "spamBlockDays": 7
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-19T14:52:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-20T12:50:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-24T09:18:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-25T12:23:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-01T13:32:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-10T12:55:00.000Z"
      },
      "spamBlockDays": 7
    },
    {
      "spamBlockDate": {
        "$date": "2025-04-10T07:50:00.000Z"
      },
      "spamBlockDays": 30
    }
  ],
  "nextApiId": 2496,
  "twoFa": false,
  "twoFaDate": {
    "$date": "2025-04-10T11:29:15.313Z"
  },
  "automaticCheckDate": {
    "$date": "2025-04-12T13:02:28.588Z"
  },
  "lazyCheckDate": {
    "$date": "2025-04-12T09:02:11.516Z"
  }
},
{
  "_id": {
    "$oid": "6655a248f6c612cb5f71a190"
  },
  "accountId": "1716482434-160-support-new",
  "dc1": "c274d60c5d234c806cda834f67fb557bb840184427327897e30eeb3e22630d74607a167e2fa5eb82629d0dd8412af848e2ebca8054d66fb0fe703796906d3af33713b2210da1ad85e65d9e8d0ee520e32faa686a9b7af25b32d036944d9e0c2b937171fd3fc7f6e2d9faa8806a8119416f7fa6681029820be14882a88383f243581d1c5dbae4a84f18998330c5aac27ebb742f4d3d0f10a2910c981477b1efba1872a6e33326b977a2fd51acd908f09f7e37a47c4e7ec6b11512f429efb4db4895f29ae82a313b1df01919249f9b320f54631fb81cb726be99a563b4267c8efcc0b80187bef043fbd2aeb08d96a9e37200f3540d813098b7d8d30ee972200d69",
  "dc2": "11bcf637415b0c40a5da6cadc92af750763b699f35c1af429c36ccfb21f7f80fc13d7787c35d70b074a8be7ecd2d290009837d7075e873b688bc169d809275ce4166e3e1a885ad17235eeb1eb1a6ea2f4b92c4a2df1c60acfe761cdc42420a5239f5c637be90b696d3e4cfacaef0e3d45033ec05e008d74d47ad506350164ad036fef462dbf385278a0e4a9b423ccde243f843ff66422e9549a6f24621118583f406f7c3f601092d4bad37581f682f6ca003020536a37200918e92380324787b40bb46e77f620e9c0e8d4afb49ab2b8d5106b11944497a44c298478e5eb48745723888e9f5482127314d16511dfdc4e6cc371d3c10c08f875a12db51e4563a29",
  "dcId": 2,
  "banned": false,
  "dateUpdated": {
    "$date": "2025-04-12T12:59:10.395Z"
  },
  "reason": null,
  "firstName": "Valeriy",
  "lastName": "Shevchuk",
  "messageCount": 759,
  "username": "shevchuk_spare",
  "id": "7118779552",
  "remainingTime": {
    "$date": "2025-04-12T07:02:14.904Z"
  },
  "spamInitDate": null,
  "historySpamBlocks": [
    {
      "spamBlockDate": {
        "$date": "2024-12-05T14:57:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2024-12-10T12:31:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-01-17T13:16:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-01-30T08:08:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-02T10:06:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-01T11:38:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-14T09:40:00.000Z"
      },
      "spamBlockDays": 3
    }
  ],
  "nextApiId": 2496,
  "twoFa": false,
  "twoFaDate": {
    "$date": "2025-04-10T11:29:15.388Z"
  },
  "automaticCheckDate": {
    "$date": "2025-04-12T12:59:10.395Z"
  },
  "lazyCheckDate": {
    "$date": "2025-04-12T10:03:04.621Z"
  }
},
{
  "_id": {
    "$oid": "6655a24bf6c612cb5f71a35a"
  },
  "accountId": "1716487764-160-support-new",
  "dc1": "3119cdb3aa04d6ab3969375ba4c3c7e50c7821333430a7a20dc7001a96628f0e5786f16bdbf1a3947b47b68db7191b0e08ed7f9f3d4d2ccc72d11cfa1d950e1618d235f348e62744216523c425722b7f5393c2466d17655ac51dc6af1c613a5e3afdd2375dc766509941440ad25ad51adc105a9815edc9ae34d2b26153d77fefc6f85f9116f77f7d312c27bd86a737731bbf252375fe6f5bc5f804f7152c127d50cba12757bccf8d6326fa1d3861e464db67e3fc368d2c7526f582674d59e069e79a0811e9a63360c1d180097bdfd766f175678fc02ff2b2f7515d36de11ca39d7d19c496af5b1dafcf5cddca93e73effed242462d325a683d6ffdb837601367",
  "dc2": "0dd78edae43680dd11d9cb81831f9f14e03b3cb199a1728eeb8c10a421ee052ac636b7f9a4ee8ff02956be83dd7f6aebefcbb9c70c9c78e7d9733de6d30de9db77aec415d0ba5994e94aa24d46ee35f2a3632dfaf0eac9c2038200f9b9fc1d07b5d40864ef97a9cba6f1cf7564ba8f3fadcd688d0f02a223fcd81b5c1172d151d2e350456eda33faccf2094eeee266d5f0bef9252198d4f87691744e859da96a388215d49da050343233fc469b250f6b9b73e18b2da0fcd78f32e5508ca69721d56ddd5b01f188516d1fcbf05dad15aef68f7879a1b189f4818ca97901d50060abb405cdba008e9a7628cdd1e5e889b110d0f91cf54784a9ea90af9aa2f9b890",
  "dcId": 2,
  "banned": false,
  "dateUpdated": {
    "$date": "2025-04-12T12:59:15.489Z"
  },
  "reason": null,
  "firstName": "Igor",
  "lastName": "Mozharov",
  "messageCount": 242,
  "username": "mozharov_hollow",
  "id": "6375167314",
  "remainingTime": {
    "$date": "2025-04-11T15:29:29.162Z"
  },
  "spamInitDate": null,
  "historySpamBlocks": [
    {
      "spamBlockDate": {
        "$date": "2024-12-14T05:47:00.000Z"
      },
      "spamBlockDays": 13
    },
    {
      "spamBlockDate": {
        "$date": "2025-01-13T12:33:00.000Z"
      },
      "spamBlockDays": 30
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-22T11:49:00.000Z"
      },
      "spamBlockDays": 30
    },
    {
      "spamBlockDate": {
        "$date": "2025-01-28T11:50:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-01T07:50:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-01-31T06:39:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-04T10:12:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-07T10:47:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-14T18:14:00.000Z"
      },
      "spamBlockDays": 7
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-22T13:25:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-06T09:51:00.000Z"
      },
      "spamBlockDays": 7
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-28T15:26:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-08T09:35:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-08T12:17:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-13T13:00:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-26T12:06:00.000Z"
      },
      "spamBlockDays": 7
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-22T07:53:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-24T06:44:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-26T08:07:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-29T14:50:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-04-01T13:16:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-04-05T14:59:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-04-10T10:14:00.000Z"
      },
      "spamBlockDays": 1
    }
  ],
  "nextApiId": 2496,
  "twoFa": false,
  "twoFaDate": {
    "$date": "2025-04-10T12:58:11.284Z"
  },
  "automaticCheckDate": {
    "$date": "2025-04-12T12:59:15.489Z"
  },
  "lazyCheckDate": {
    "$date": "2025-04-12T10:47:02.494Z"
  }
},
{
  "_id": {
    "$oid": "6655a24bf6c612cb5f71a396"
  },
  "accountId": "1716490846-160-support-new",
  "dc1": "29d0e2449a4664896cbd626933b52de9fcda47738f99e3e5c60082d7b1921996edfaf07938a448d11aeebef97b131073a0cb7ea9bd24d4dd320a5370544800b6d507f550178bad670a788fbe988561bea81a3beb1f9c42757ebde82a72f251717e56504ae3adf8daad1a64154241e5f0b74c80f0a3c71d714ae5ff991941e2887aa6499ba963868edcf00eaf2b48ad2fd4bb4528c374ee3c7fec88f9814231162015b5e766f07c39613466fe908c368203cfb33bee85e4a308d4ab579505fe994e6807604dcf5611a380cd6c14cde6771d5d41003fd0407af45b79ee235f34c74cbd3aaaebfbe7d330e5f8ad18633337751eeb05026575056a2e03def0049ad4",
  "dc2": "a8c80cc9a6261a43744bbcfaf530892f6ec3a00104e007e4fa6f2af975acb8d02c79a81624e2373aba5589b024ea7bde54816ab552b7f99f199471d3131222ea19cdb0c804abe9323f95f5fd13e17d55ff207837314d4616327f19f94968333be03bf2a55935c38deb4fe28c496daefc26c96e8e409211862551be9738a397c013b75018012d5d07106bcfc947902adf19a3d69ce6dc74cd12b997a88026e6372e52dd2e72242b454f3faa94307ba5545184899083afa266d7061e29525129014e382d6dc75cfbfe68e392480768b0892ea1e58703b8210e4a66711b6f8d073948b955102ba48b653a0edcbe61e8ad39580e50bb217f50b071096b6bd6dd0317",
  "dcId": 2,
  "banned": false,
  "dateUpdated": {
    "$date": "2025-04-12T12:57:00.071Z"
  },
  "reason": null,
  "firstName": "Alexey",
  "lastName": "Ermakov",
  "messageCount": 525,
  "username": "ermakov_hostile",
  "id": "6904717342",
  "remainingTime": {
    "$date": "2025-04-12T07:01:21.798Z"
  },
  "spamInitDate": null,
  "historySpamBlocks": [
    {
      "spamBlockDate": {
        "$date": "2024-12-09T15:08:00.000Z"
      },
      "spamBlockDays": 9
    },
    {
      "spamBlockDate": {
        "$date": "2025-01-09T12:21:00.000Z"
      },
      "spamBlockDays": 30
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-11T07:56:00.000Z"
      },
      "spamBlockDays": 30
    },
    {
      "spamBlockDate": {
        "$date": "2025-01-20T14:01:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-01-27T13:10:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-01-31T15:10:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-01-29T19:23:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-01-31T09:08:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-03T21:34:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-05T09:46:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-06T05:23:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-07T08:42:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-07T18:15:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-14T07:56:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-22T09:16:00.000Z"
      },
      "spamBlockDays": 7
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-19T14:25:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-22T11:47:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-27T11:42:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-02T17:27:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-10T10:09:00.000Z"
      },
      "spamBlockDays": 7
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-08T10:19:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-11T10:28:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-14T03:51:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-17T05:44:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-18T08:14:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-19T09:32:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-20T09:39:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-24T08:31:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-24T08:19:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-04-03T14:27:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-04-08T12:05:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-04-11T06:04:00.000Z"
      },
      "spamBlockDays": 1
    }
  ],
  "nextApiId": 2496,
  "twoFa": false,
  "twoFaDate": {
    "$date": "2025-04-10T12:58:22.986Z"
  },
  "automaticCheckDate": {
    "$date": "2025-04-12T12:57:00.071Z"
  },
  "lazyCheckDate": {
    "$date": "2025-04-12T09:58:56.910Z"
  }
},
{
  "_id": {
    "$oid": "6655a24bf6c612cb5f71a3ab"
  },
  "accountId": "1716490854-160-support-new",
  "dc1": "3e557dba05c40aa2c4e4b347200a6dfe9c3c422cf80781a1346036435589d271eb9ba8d7c12db48478306365ec77a31c051666ee8d4a4d7dacdf4da6968f8ff54f55c47920d94160521ffe22bcff1bb6c5b32e05a9100cac5dcee55d3363f7194e19c7333be89fb3477fef1bd812c223d10e5c773800c0555ec3700ffce44d33e0a54b539def3691340dcd818986e6a9eddda12f44a77b4301a13e87b848dc9aab0b43d2fda7cf9ece0063f324bc1ca5eefa37083aa06e7252d9d397b151587740b27e6f94ca4636e60f607c3afc6bec7aba93240973a1ffbe85dd60d96802126a9f3e72dcb0561e0c0c9fcc2dba00aa79a28fe233312f2d1087f58d9e2da93f",
  "dc2": "1ef1b94eafe96269ba0cb97ccfd053aa7dfd8bcd3fb27cc1572925b7f7910a620874ecf379b8e822b8efcc35f9c8498f1baf28c552e78e87231b9766b2a9328d2ee5393ef3a43f10dbe50bfe9ce75631dc77508abcc0059b2e8a2fd38a44f69db03b176c24553897c146b81b59a3faedd5ff1c194fdb382821d333783b39a983e394e4b863ec3c8eec4c93576f79d702718b7a1c864c01273106c2e9d29cf56ff718cfe5dbb0a16daa14c08e598ced670719974b756eea48222239d4fbc84485701af67b86c131649a3e27748f641d5db8e6d061767546478f8e9a23d0e231656b06953e3bd71db785143dfd0d4a487b50e6eb74e391454b04cc43612692a55d",
  "dc3": "7cbc52082f11d63a9706b869b8abe1ab94e485afddfd4a502cd22e70695124813c2d7219220950114d3664dfbf921b3c010953d1356f528b659471cd28bb0e284978c9e1b2d16012d88e53d27139f60be4d7b5bf06854032fe759393cfb04b1139d82c428381a1fcc946eadfce73bbbad82e33444efdbd688dbf74a1dd88b8e10d9d8a57847f0231b84fb176871811d94b3fbc78492d22917cb7e2e3bb44f353ba246c7ae5bb9cf83829260f7998e4200c40afa2926340df3aa5ba9293ef01ef1af9c4efd73192064cca64790cb592853dcba4a8ffbee67706b8ebc145218d44df388396eb2cbdd330be499ecfd9563f9e183c716ab26614c9b2d21ccfc0408a",
  "dc4": "b94f8b6bdfffddb6452ca1c39ca130920ab60be50691f799c28e02c6e22bf76c878bd0b35d141d2dc539ddce724830faf6315c00b015395077b4531a60567febd9ef933a741d010e661c5bb0b4afea250b73d092eeb28c74ad751f61f9aa02e2e884e82681e807be9fcadfab97457168382de10bbdeb331850bf74d5105bafbb05bbdc94e75acc1b20304040993648e1dd29520f72aa59d3cd812d5e5bb99df4b60a708ecb9244aaf0dc31421c19ed25aba2c0e72448210ffd748d9876be8bf173e8b4a093f52d3abd573eadbbbd4c82239e9f80f73b3047717426a865d01cf4bf42d5a44fa86acea442fdd1b9100eb9f3302da632221dc4f9b3e4792b64d56e",
  "dcId": 2,
  "banned": false,
  "dateUpdated": {
    "$date": "2025-04-12T13:04:13.093Z"
  },
  "reason": null,
  "firstName": "Fedor",
  "lastName": "Anisimov",
  "messageCount": 474,
  "username": "anisimov_early",
  "id": "7190735155",
  "remainingTime": {
    "$date": "2025-04-11T16:10:56.087Z"
  },
  "spamInitDate": null,
  "historySpamBlocks": [
    {
      "spamBlockDate": {
        "$date": "2024-12-14T14:35:00.000Z"
      },
      "spamBlockDays": 14
    },
    {
      "spamBlockDate": {
        "$date": "2025-01-16T08:40:00.000Z"
      },
      "spamBlockDays": 30
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-21T11:20:00.000Z"
      },
      "spamBlockDays": 30
    },
    {
      "spamBlockDate": {
        "$date": "2025-01-24T15:50:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-01-30T14:58:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-07T14:02:00.000Z"
      },
      "spamBlockDays": 7
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-13T13:50:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-26T05:16:00.000Z"
      },
      "spamBlockDays": 7
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-21T15:06:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-27T12:40:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-07T07:13:00.000Z"
      },
      "spamBlockDays": 7
    },
    {
      "spamBlockDate": {
        "$date": "2025-04-08T13:38:00.000Z"
      },
      "spamBlockDays": 30
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-13T18:19:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-15T07:35:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-20T08:58:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-19T13:09:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-20T11:54:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-21T10:46:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-26T07:51:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-04-02T22:09:00.000Z"
      },
      "spamBlockDays": 7
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-29T17:20:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-04-13T09:40:00.000Z"
      },
      "spamBlockDays": 3
    }
  ],
  "nextApiId": 2496,
  "twoFa": false,
  "twoFaDate": {
    "$date": "2025-04-10T13:49:41.205Z"
  },
  "automaticCheckDate": {
    "$date": "2025-04-12T13:04:13.093Z"
  },
  "lazyCheckDate": {
    "$date": "2025-04-12T11:32:51.937Z"
  }
},
{
  "_id": {
    "$oid": "6655a24bf6c612cb5f71a3e0"
  },
  "accountId": "1716490894-160-support-new",
  "dc1": "8535603ff0017e7bb31531dc163eeec645d619372037085208bbb7e755e54e423fdf131c7e56aa5d791e8560484f3b403973b38f3c398ff0afa873dbe11730d037c6025b3bbb7980143dbb6a673807f7c40bb8c862b187bd7663208723b384fb87f84c2a7128e161d565b77b6e30871dc3290495e697575c77349a4d290bee8dda9500dad43f8ea0dd6e500746d1e3d345c5f33c6a55b6a17819276702de27b30633dd0de59e1cbe7139dac048dba61227e64ad5071386f40e88de70961f09d134804823ebd84108bbc03efe1d20e787144722100a0a9d7d5ec2fd0d020c389b53526ad317c15d21b562e9cfbcf044cd2a23ae2507dc4a294674e6837cb65296",
  "dc2": "9e6a8ee9aa798b54bb56a2fb407787cfded84489c0a6d7db465ff380effee82834994ce92a1fe8368460e677b583eb79dd49c540e98fabb0631cb71ced71dc9183805782063886b9e9c004084bba88db6ba104e5f01822cf4c8262a208c326406126c2ff83b6f36b60e3cc21df8e411eac28759cf014c420b8b312cf5ba863f703da0c18450e2f73fbde0c3f3b78e013cc8ae57ab3ca99dfa51899d3ea9a7dbdb457d79362ce2f1b6982005ff1ae69ad786fa77094f7c932cfe88e9d1ba667ab0fd7e487d223f8a3fad1a8b5529c27eac61c4648ead30d771c66ac06727fda79f85b0ee9d26dce7712d622443e34db82ebb6abb646e37ef6004e3d049c6269a7",
  "dcId": 2,
  "banned": false,
  "dateUpdated": {
    "$date": "2025-04-12T12:27:45.857Z"
  },
  "reason": null,
  "firstName": "Egor",
  "lastName": "Belov",
  "messageCount": 319,
  "username": "belov_awake",
  "id": "7179894180",
  "remainingTime": {
    "$date": "2025-04-11T14:55:35.591Z"
  },
  "spamInitDate": null,
  "historySpamBlocks": [
    {
      "spamBlockDate": {
        "$date": "2024-12-28T05:59:00.000Z"
      },
      "spamBlockDays": 27
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-11T13:15:00.000Z"
      },
      "spamBlockDays": 30
    },
    {
      "spamBlockDate": {
        "$date": "2025-01-23T11:25:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-01-26T13:59:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-01-25T06:11:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-01-25T14:19:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-01T08:10:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-02T07:10:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-04T10:06:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-04T16:16:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-06T14:26:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-08T19:52:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-10T12:10:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-13T08:58:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-22T08:20:00.000Z"
      },
      "spamBlockDays": 7
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-20T08:51:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-24T11:53:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-04T05:31:00.000Z"
      },
      "spamBlockDays": 7
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-28T11:27:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-06T12:23:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-14T14:55:00.000Z"
      },
      "spamBlockDays": 7
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-11T06:54:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-12T07:20:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-12T14:22:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-21T14:37:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-21T07:33:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-24T15:18:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-04-02T11:07:00.000Z"
      },
      "spamBlockDays": 7
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-28T14:25:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-04-03T05:47:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-04-13T07:36:00.000Z"
      },
      "spamBlockDays": 3
    }
  ],
  "nextApiId": 2496,
  "twoFa": false,
  "twoFaDate": {
    "$date": "2025-04-10T10:49:55.663Z"
  },
  "automaticCheckDate": {
    "$date": "2025-04-12T12:27:45.857Z"
  },
  "lazyCheckDate": {
    "$date": "2025-04-12T10:03:04.436Z"
  }
},
{
  "_id": {
    "$oid": "6655a24cf6c612cb5f71a4af"
  },
  "accountId": "1716493816-160-support-new",
  "dc1": "977af1148b39605276ee7cfb4dd3ac7fbf2110012ab99f02fbb4b1c6dbd704b360258dc2bd747475c6fe7d036c30c8cb76e6583f3a77d22597e4a78ed5ae08300420017be0168a9fa0d4c96f5c294fcbb89a81a65dfdfedfeba449f0bad7427a848c9cf218c27d58c3f8afd4ab7611f6facbe90c817bafd29df238b8ad2b66139c7d84969d092bab8bcd8b0843c270706896c85611d18a1c8a10d8350c0c17c3383ff760589dc81fd17997a8619f093cab07339efa52883a4dfe5de31feb709b837ec104ea0c73834576acf44acca3a5f7339e5d1275c1d5bbc872c688288b9a02ab4c9539f2328bde8815877b78455d91bcb612fd808785b2bb6371a6bb0e79",
  "dc2": "3326d6acfd7e6d91fe8aa5e884c612aa618aff9d5eb134977ee4472b4d4705ac118c3be2893af662b7743acb365ce758efb800918b54ff5ebc156ff67aaba90e118f5397f98a6ff921ad6d6af23c9e53976647ef86abae41947f3257020fe9749b8fccfc325fc8d4ae2771e4dd21658518b0a8295f10d1764103c9d158b1778c7427192f8f7938866e63ef9e319f871bb23e92b3e5d65085153addce68c6d5725cb23d0e27205e7e2bea3fac7769199c8c7aa7f803bd6b5f59e08504bcf48af79b1a0c632c72566c5dcd0de5deebbf839a66a536bc8854e052937ee7cf738b8f334611d95e4531477915a445723beb9838cc5dbf443b2faadf4df428373cedc6",
  "dcId": 2,
  "banned": false,
  "dateUpdated": {
    "$date": "2025-04-12T13:08:17.043Z"
  },
  "reason": null,
  "firstName": "Ivan",
  "lastName": "Lebedev",
  "messageCount": 223,
  "username": "lebedev_evolutionary",
  "id": "6889117267",
  "remainingTime": {
    "$date": "2025-04-11T16:58:25.289Z"
  },
  "spamInitDate": null,
  "historySpamBlocks": [
    {
      "spamBlockDate": {
        "$date": "2024-12-10T12:40:00.000Z"
      },
      "spamBlockDays": 10
    },
    {
      "spamBlockDate": {
        "$date": "2025-01-10T09:03:00.000Z"
      },
      "spamBlockDays": 30
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-11T12:20:00.000Z"
      },
      "spamBlockDays": 30
    },
    {
      "spamBlockDate": {
        "$date": "2025-01-24T16:40:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-01-25T17:34:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-01-26T09:38:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-01T14:31:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-01-31T07:13:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-01T07:33:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-04T08:24:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-05T08:13:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-06T09:16:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-10T09:19:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-09T07:27:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-13T12:20:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-12T07:20:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-20T06:46:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-20T06:04:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-23T09:41:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-28T12:57:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-10T09:09:00.000Z"
      },
      "spamBlockDays": 7
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-06T07:59:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-10T07:14:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-11T10:28:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-13T08:45:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-16T09:01:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-27T08:09:00.000Z"
      },
      "spamBlockDays": 7
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-22T19:42:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-26T07:14:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-29T14:54:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-04-02T08:29:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-04-14T15:09:00.000Z"
      },
      "spamBlockDays": 3
    }
  ],
  "nextApiId": 2496,
  "twoFa": false,
  "twoFaDate": {
    "$date": "2025-04-10T12:58:22.979Z"
  },
  "automaticCheckDate": {
    "$date": "2025-04-12T13:08:17.043Z"
  },
  "lazyCheckDate": {
    "$date": "2025-04-12T10:15:21.259Z"
  }
},
{
  "_id": {
    "$oid": "6655a24df6c612cb5f71a537"
  },
  "accountId": "1716494955-160-support-new",
  "dc1": "8d6586aa05ba88ffb0ac3cb85ca153ed2a585d21a520f954a2df2cf50b9582e86659b3f9a7c98b046f8005eed1b943f1dd8c1fbe1355921a42e97230df2c1cecdaa6b6517218d9ec979cec051499291ac8c4bd85d87857e8dd6442a54286c3b0135205d0955150487aa70734c482a6452e56df318800debf1df846f03b208798b7466063428f33e12b2ef6111152a47e0d102aa4576b3f1b59683d8cc1e0911f51f433dde58bd433c56e50acaa0ac341a2cbce3fb099bd5175bd6fb995d25b61d75278cf8c34f354146bf6e8115f1630ec0bf57a6b755d3743ec72d50d752699eb1a8ec5342e6eaaa1c2ca090afdfe761cfa880405a2cc5e40debac67e21fed5",
  "dc2": "969661faf83c34743badc1556f4b6350338c2b48e2460c7abe4c0d63725768bc3ba4fe2cb19b289e1d06fc102f476f2faf3c491b5f9e231767e6ce975ee82502a3bcacfbcc19ca8f4d27895a75a0452a410b3379ed6016a4be839f7627908c3ac8bd16fc2ecfafb5a5ec83ba677d3796111b0f7c858135a113b1707194d4846b2dff39600b3e26db0ecb9a3ea12289230ed56f4dc8c2ac66ed1c7b38e0e0d506ff0c1b81c4d4a94e69aeb6d60838d150bfe8b92d07c0076ff5b0572a3b08f48e2123015d6e44cf268f9e34742237f97873dad1387f40009eb903688e8c2d0ee434f4c49d7ac573518efbe5d18560ba568f308f8493d18977cd0fa62ccd009eba",
  "dc3": "7c11819b02dbd05120cb605f1449aa340966d3cf2a5d6b319f0bd244bac4b3fcddd5b597dcc59aaf04c7278a1b9963f8ebd700c6e8b1d124a3c3f6985bceb8493bdaef7bac96063c9a932d2e1f0cf3ef30ef92ead7d82528ee94fa679f749e2542393991d7895a96504219301ecd4785600a035859b046fa0d6dd08027d5a190a754008e2cd1e1659f0955f64e590cde6beda65726ba84484df2c275e63c950f500ee14abbb44a8bd68757d8d5362483b411bd1501344b0598de5eb260feb18d62c2fd74d81183b64eb1d0421b863e41bd5d48f4aa55dbe41077ac6e26f61342705bf3c9819e723070b20554f521b57a0a73121704a6ebbdaa60d049eaf80de0",
  "dc4": "979963c5bb8a6cf0eef7b864724527efef039ece63b50591f3f790061057a67275d0bff8a13d5f4d9dcbb7ae80d6d96651b1f57f92f8212ae101b4a2e78a95124bb5d150932c9209b25bd7d6fe0f0b01f82e578fa2424737c46e04b7100088d8fe5df557d6767e044e0d0f6c325dc69a6618f5de83b24b0f5cc65b6060203be54e4b0d9b66ae84462f5a3d7dd21d58000671b2483f34ab4751fa4020ab381862208fe02ad0f54a5ff11da16f2082e88f0331eca1ce76c426056d47d0744d4ac8f2794fc9da2f68d6dd37747471636fed36e4fb623266f8b0b3690260fbc8ebfd963fef4a1f43f30d341bdb57dcc276495cc27efc6ad8c5b713b701c97761d2a3",
  "dcId": 2,
  "banned": false,
  "dateUpdated": {
    "$date": "2025-04-12T13:08:17.286Z"
  },
  "reason": null,
  "firstName": "Aleksey",
  "lastName": "Malyutin",
  "messageCount": 298,
  "username": "malyutin_innocent",
  "id": "7063897550",
  "remainingTime": {
    "$date": "2025-04-11T15:15:42.025Z"
  },
  "spamInitDate": null,
  "historySpamBlocks": [
    {
      "spamBlockDate": {
        "$date": "2024-12-09T12:17:00.000Z"
      },
      "spamBlockDays": 9
    },
    {
      "spamBlockDate": {
        "$date": "2025-01-09T09:35:00.000Z"
      },
      "spamBlockDays": 30
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-10T01:22:00.000Z"
      },
      "spamBlockDays": 30
    },
    {
      "spamBlockDate": {
        "$date": "2025-01-24T14:48:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-01-29T07:20:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-02T08:47:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-10T10:12:00.000Z"
      },
      "spamBlockDays": 7
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-06T11:02:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-10T07:39:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-11T10:02:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-15T07:59:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-26T07:35:00.000Z"
      },
      "spamBlockDays": 7
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-28T11:27:00.000Z"
      },
      "spamBlockDays": 30
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-06T12:12:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-10T11:36:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-18T09:20:00.000Z"
      },
      "spamBlockDays": 7
    },
    {
      "spamBlockDate": {
        "$date": "2025-04-17T13:38:00.000Z"
      },
      "spamBlockDays": 30
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-23T14:25:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-26T15:56:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-04-03T11:17:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-04-03T07:59:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-04-10T11:48:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-04-11T12:43:00.000Z"
      },
      "spamBlockDays": 1
    }
  ],
  "nextApiId": 2496,
  "twoFa": false,
  "twoFaDate": {
    "$date": "2025-04-10T12:58:23.677Z"
  },
  "automaticCheckDate": {
    "$date": "2025-04-12T13:08:17.286Z"
  },
  "lazyCheckDate": {
    "$date": "2025-04-12T11:43:54.313Z"
  }
},
{
  "_id": {
    "$oid": "6655a24ff6c612cb5f71a675"
  },
  "accountId": "+79304762155-160-support-new",
  "dc1": "47e5794c00e76895e88078a7239e93d1a6083ec8aa410f85d5f55e71ea9c2f9bd6cb5aa96c92adddd35cbc785f7cafe5cf5cf370757a692315a91e0cee16a5bd5e61c7732e11fead67d05bb3e824b5d42fa0e4ef1818331a79cfd0e4818202dd0b8d51e76b24d4d3052815343fb5fac04c6aa165238dee12538dcc843045a8c106c388881e76924b307b12aba68d27e67f553c0df3b9931a2ad898a152b67aa55e54571c553a878cb260ca7d85df8ac8019bf54712864930ac5300752c52f9ef9f3b266f19867d768ee2a5d1cd520ffa8002d2f9c1b1d7f4691e4870fee30829f07e45a38bb8e07429386f7e548407b21354d3775492ef47593b526ef637632f",
  "dc2": "9c59cbb675d84fe638c8b03c1ee14d8b834140a0d05d588563d45dfc21f35ae4e080efa3f6fb5b2b863bf3c6b0e77e82451dfa37e7d2a0d55c69f5f09a38464ab2b804fa92cc41d80e578c6e8d2c1dfc739e8438a3562645116d2c839d3d28b2f20c43c1a5895ea073b0d099279872c7485730ea99231afb57ec7be9c0d99263100438aaf3ca976de93a8d58b18d62900a8b194c5839866c8ec5f08817d21988e763b4498dc1a48e3b9f285e5bc6284480f06e02d103656201e4bc62b84a2f3a496084c251143cfffd2a1335d5e81e073595db1c0f954849ae1a653c9de23a568e521003029c12d4cac201856658256be7569cfc55932e0354d52745fbab7325",
  "dcId": 2,
  "banned": false,
  "dateUpdated": {
    "$date": "2025-04-12T12:34:43.320Z"
  },
  "reason": null,
  "firstName": "Dmitriy",
  "lastName": "Nesterov",
  "messageCount": 271,
  "username": "nesterov_victorious",
  "id": "7011594617",
  "remainingTime": {
    "$date": "2025-04-09T12:27:20.148Z"
  },
  "spamInitDate": null,
  "historySpamBlocks": [
    {
      "spamBlockDate": {
        "$date": "2024-12-20T09:28:00.000Z"
      },
      "spamBlockDays": 20
    },
    {
      "spamBlockDate": {
        "$date": "2025-01-19T12:17:00.000Z"
      },
      "spamBlockDays": 30
    },
    {
      "spamBlockDate": {
        "$date": "2025-01-20T11:20:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-01-26T08:53:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-02T11:08:00.000Z"
      },
      "spamBlockDays": 7
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-05T05:03:00.000Z"
      },
      "spamBlockDays": 30
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-13T06:29:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-16T17:29:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-25T14:34:00.000Z"
      },
      "spamBlockDays": 7
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-28T12:27:00.000Z"
      },
      "spamBlockDays": 30
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-12T13:40:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-15T23:30:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-25T11:27:00.000Z"
      },
      "spamBlockDays": 7
    },
    {
      "spamBlockDate": {
        "$date": "2025-04-24T14:11:00.000Z"
      },
      "spamBlockDays": 30
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-27T13:50:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-31T10:28:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-04-12T10:42:00.000Z"
      },
      "spamBlockDays": 3
    }
  ],
  "nextApiId": 2496,
  "twoFa": false,
  "twoFaDate": {
    "$date": "2025-04-10T12:58:22.977Z"
  },
  "automaticCheckDate": {
    "$date": "2025-04-12T12:34:43.320Z"
  },
  "lazyCheckDate": {
    "$date": "2025-04-12T10:47:03.295Z"
  }
},
{
  "_id": {
    "$oid": "6655a24ff6c612cb5f71a694"
  },
  "accountId": "+79304762166-160-support-new",
  "dc1": "c20ef0633be86e7be5c9339d4f4838e0de860097ec87e750236dc62fb293f56dfcae501c8c6753db413c8cca40a5f7fa1c20b40e920855a0eaacfbddcc2884c0bccc5bc45b72169b69b8375e94fd69749c2522a8fbc859fba30b4538baec5dec33fdb2953f3b51783df27f96e950960d57c95f621d357e041cb6f8ba5e7260c6ac22cc28950cad67585acb85f44c39a4107a7c2954b382451d05218b9b4a3ef6b2382823f531c551825205ffe0f19ed91f34ee06eb476c9fc547f2d7e6c81f11110a737cced0930b152f0d609f88f1367b969ba434620217f66ec3bb69db9947ec5394ec004ba66af152a2b38691e36a0f482b725b28222106b60e76346f80e3",
  "dc2": "102654228fd605861d31b55afe9f85db6dd52178476c44c3ed87501cb737992a89788e0ba55abcb61a6ea65882c1bb2b174b13ed27946a8f597faac032080af3a1f71e4c0e013e57890071f3e61a04644a2b90917e261548a6500864d7a612470e0d9dc024fede4c56da9a8bcffce7a0eccced0279d15a739f0c8c003be3f397046e0862874ec466735531447c48fdedc44d1f5b1f33b1582e869d4c33814b08e519dcf01dd562dfe520a7c06ecc543d86be13197945009a98f089a04504f29d3809de9c318852e8edd3ef686d1ff405240cb289546a7b0cf7e657f1293fbb9a5bb08c0b87dc331f80822f6549950b38dfbef86aec50516a856f126fefc9378c",
  "dcId": 2,
  "banned": false,
  "dateUpdated": {
    "$date": "2025-04-12T13:07:17.334Z"
  },
  "reason": null,
  "firstName": "Roman",
  "lastName": "Efimov",
  "messageCount": 314,
  "username": "efimov_fatal",
  "id": "7000491022",
  "remainingTime": {
    "$date": "2025-04-09T12:35:17.116Z"
  },
  "spamInitDate": null,
  "historySpamBlocks": [
    {
      "spamBlockDate": {
        "$date": "2024-12-18T05:50:00.000Z"
      },
      "spamBlockDays": 17
    },
    {
      "spamBlockDate": {
        "$date": "2025-01-17T06:27:00.000Z"
      },
      "spamBlockDays": 30
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-21T11:25:00.000Z"
      },
      "spamBlockDays": 30
    },
    {
      "spamBlockDate": {
        "$date": "2025-01-26T15:26:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-03T12:29:00.000Z"
      },
      "spamBlockDays": 7
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-04T09:12:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-07T05:49:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-08T11:09:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-10T09:10:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-15T08:02:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-18T07:42:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-19T15:14:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-24T12:16:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-05T15:15:00.000Z"
      },
      "spamBlockDays": 7
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-06T16:13:00.000Z"
      },
      "spamBlockDays": 7
    },
    {
      "spamBlockDate": {
        "$date": "2025-04-20T09:39:00.000Z"
      },
      "spamBlockDays": 30
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-26T14:38:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-29T09:43:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-04-05T09:25:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-04-12T10:53:00.000Z"
      },
      "spamBlockDays": 3
    }
  ],
  "nextApiId": 2496,
  "twoFa": false,
  "twoFaDate": {
    "$date": "2025-04-10T12:18:22.717Z"
  },
  "automaticCheckDate": {
    "$date": "2025-04-12T13:07:17.334Z"
  },
  "lazyCheckDate": {
    "$date": "2025-04-12T10:49:56.086Z"
  }
},
{
  "_id": {
    "$oid": "665b281f0f6f6d945b56ab7e"
  },
  "accountId": "1716920468-support-484",
  "dc1": "b1a2a6bc68b53a9884b1d895b5e9603a8f49982a332d52012fc198260f3c9c54813529d7f5d33854867e71bce50b48b1189cba3e16d4abe9d1d118e978b2d50578834ad3554ac00da0f3cc0308ed5f0ef2fee093673549209b1591003e606915333d687103872ae9e6e53e2a85becadaf9d41d5126b3c1acf764889124820bc3e3d53c91d16507b36f5faa04d4f217fd911e403786ad9e8528952c1b508c5171fa126cdf0e1ebafa8e9d6ac0fa957b7753675e678ddb6766705367fc0ba6e3c1cdec8e5908f006891e662efb442f51da910e93344a64d7d689c8d7993a5cf3b99c19e8006aa4bd52fa3b678b8f424a731b0e01e54be411d215e3397a55d107e6",
  "dc2": "5c7ecd995e554e88ceaa25ef20e738e0696d61003f3c93f963211a3fb0fa96bb3391259dce88854092510c205b271530305555fc6a61fc9b222b1865245e17da7e5b0574865dc0d6b5edde2c339461d90c70cf9bfaeaf868a821f92136f24e8dcee4b3930fbb77006d7c4d88ab332453007cc0f8492b0046d539393ff06cec02a8a4e3f1f4005eda3ae7e0ad20e48a54c3e3495d4c6541158d9536b3974993b2a8b7dd6185eba934fdf5b30b35f4c10f38e1a01b7f3288b88bd4a4be3e7acbc8573270f4ff1b8f46fad8783074463806dc22cee958d61dbeea49561ebab50f430c82223fde54406efe278df38fa8f2b42ce88889cf81c678d8e41846571dfdaf",
  "dc3": "4346a70dc2b3e93b52dca17c8f06dff6f0642a3597f21fd0c9faf8ea219546f26e1017a4b6fe49473329e218742157ba57858c5611fecb2e59ad3e01cbcdc7bfdf1cde5fa0c5e86eb6c8a97d7fb6396d43f11eff885e90af405f2450434701a2762a322ad28efd210a02fbc96e2f479d00b886ad6f3ac608522dfbe96cc976d2b09e7be1ebdf0a4212504c176f61e92e47284243e75be9e8dbbc310dd1c5ae0235f659bcb6ac7e1e166ba7e30af63b8707b81515a78bc9a0901197efb2bfede9e9c2a49444d8dd36efc83a980359a9e714c62820c81634d192ccc22d08497d3bf6257877746dfbbc0520955d488ef65e0023895340ec1f4d87713b5235332b4e",
  "dcId": 2,
  "banned": false,
  "dateUpdated": {
    "$date": "2025-04-12T13:06:17.074Z"
  },
  "reason": null,
  "firstName": "Maksim",
  "lastName": "Bogdanov",
  "messageCount": 262,
  "username": "bogdanov_narrow",
  "id": "7254535596",
  "remainingTime": {
    "$date": "2025-04-11T16:57:09.967Z"
  },
  "spamInitDate": null,
  "historySpamBlocks": [
    {
      "spamBlockDate": "INFINITY",
      "spamBlockDays": 0
    },
    {
      "spamBlockDate": {
        "$date": "2025-01-31T11:07:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-03T11:51:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-10T07:23:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-28T07:33:00.000Z"
      },
      "spamBlockDays": 3
    }
  ],
  "nextApiId": 2496,
  "twoFa": false,
  "twoFaDate": {
    "$date": "2025-04-10T11:29:24.029Z"
  },
  "automaticCheckDate": {
    "$date": "2025-04-12T13:06:17.074Z"
  },
  "lazyCheckDate": {
    "$date": "2025-04-12T09:28:22.932Z"
  }
},
{
  "_id": {
    "$oid": "66dee200f856541e1b71c722"
  },
  "accountId": "132-support-500-last-9-sep",
  "dc1": "c3d85b808c6ae8347d1de3797fe2f1ff77b15287ca42564a29e110422d046fafb8182525fc01d985454ea603f933d22603b76a36ca8a3636ed17a0e31fb2a8b51b89dadaa56ad0049c8621ab19b125a1504ad45a5f5105892ee39372358b71da1247664e975a79e6b3d5be826725029d26192a310a35e734a01ac48e691532ee48499b6b118cf6986d85d9e41265d3e887ebb75ec0548fe37cd24eee63eb4df390419d1729452612bca87832454fd540de9ebfb621b5356a7bce979af10484256f21e06d144c2b468fa09139a2922bc1f021b8758f9dc9b53bab066d11f2b5456b3af2de475eec0cac94961286a14bc452953596596d035a56b97cc1c9b2b7df",
  "dc2": "a32d5a6547c3db9e430f75743ebcb917e6daece01c277caa2a198f008b42a1c32ee01167fe391f39b83444a929ead9e168f2044c4596c351b788565702381607a47578052bcedbfc11182719322a336d4690058060eed0072a3aae11563bb217d1ab6820f229332432a04e13d3a020771a7645bb79c447256d6b273328b38fc7a35a175be2617d76a143a56176551af860d72d75cd2196d10b67f3a9f935c7537a8804df3644e726e5ef9c86a4cb2173dd199895b59b39a0d2998437cad4ee8808c1be955dfb6e7a45279cd7beab2bc2263ea1019dc749054bea26b10641bf265453c324e32cb18cc280e1a5a6d2b45b32495a2a3d711c05ca8dd0c036e25e13",
  "dcId": 2,
  "banned": false,
  "dateUpdated": {
    "$date": "2025-04-12T13:01:17.477Z"
  },
  "firstName": "Nikolai",
  "lastName": "Loginov",
  "messageCount": 387,
  "username": "loginov_inland",
  "id": "7283906483",
  "remainingTime": {
    "$date": "2025-04-12T07:18:27.017Z"
  },
  "spamInitDate": null,
  "historySpamBlocks": [
    {
      "spamBlockDate": {
        "$date": "2024-12-04T14:45:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2024-12-12T09:25:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2024-12-13T10:38:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2024-12-20T05:09:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2024-12-19T06:32:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2024-12-23T08:21:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2024-12-30T16:26:00.000Z"
      },
      "spamBlockDays": 7
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-16T07:49:00.000Z"
      },
      "spamBlockDays": 30
    },
    {
      "spamBlockDate": {
        "$date": "2025-01-21T05:54:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-01-23T14:13:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-01-26T14:36:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-01-29T07:26:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-02T11:23:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-10T14:16:00.000Z"
      },
      "spamBlockDays": 7
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-14T13:53:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-21T10:02:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-20T07:52:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-25T05:53:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-05T13:15:00.000Z"
      },
      "spamBlockDays": 7
    },
    {
      "spamBlockDate": {
        "$date": "2025-04-05T08:41:00.000Z"
      },
      "spamBlockDays": 30
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-11T13:14:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-16T13:04:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-25T14:51:00.000Z"
      },
      "spamBlockDays": 7
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-22T06:31:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-27T06:57:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-04-03T07:38:00.000Z"
      },
      "spamBlockDays": 7
    },
    {
      "spamBlockDate": {
        "$date": "2025-05-10T11:53:00.000Z"
      },
      "spamBlockDays": 30
    }
  ],
  "nextApiId": 2496,
  "twoFa": false,
  "twoFaDate": {
    "$date": "2025-04-10T12:57:51.780Z"
  },
  "automaticCheckDate": {
    "$date": "2025-04-12T13:01:17.476Z"
  },
  "lazyCheckDate": {
    "$date": "2025-04-12T11:44:52.390Z"
  }
},
{
  "_id": {
    "$oid": "66dee200f856541e1b71c734"
  },
  "accountId": "141-support-500-last-9-sep",
  "dc1": "078c8f8dd0b22516d05215c312239a0f4f854a049482118d275d56ff81b629d2a8bf8e37c126493bc9250193f7448f7c15a7d23fa659591efde0a03e9697c67e89702f820482106b89fdf6a8d4cfcfe140141170cbc3b87213f7fe395f54a5af15e172248e6cc89952c3867c4a3a6b8a439d502e4f18895314fcd85b2bdbf1cc7bfeb2ed60929dc7f112a4e72a4f020a5628af044396ff75359597b709d76fff2957cf5afc7209ae4e12d4e66e2bf04bb7a0e658d690edd8d8047afb215e19faa75d1afc4947df0304557c4885930b180b16a608f82ccdb3f8e0336e6fc216927146229f9d9d62269a6eab2d3c08aded71a2e8c3a2fdb715a6f860f40eeec2be",
  "dc2": "5339df01b14c363b36b5260fa414fdc7ece2e5d5655399c967d22d178c70721a5d9bb3507a99a1f05a7fc64707542d4c3ce1c6bf8972353de8fa38d7f018b2fba20527d285b3615879a3282a74045b12b1adbfdef53345f4d4de191d139ebd5b407426ad730033a0634333b7649b8d363fdcbcb5137c631f16dcdf560619b947ee1e98fcafcfcb1c0d5a89b37028b1a73f81459ebaa01dd398b2b6635d2a99500064596bebd8620b70a9e59f201a80c43dec22000a6835ffb11a3a75be46ac7c462af331dc568b4551b1d8b0c834da70b08db5b5e97c9bf7b0cabc8be9faefb16e94e73e0061db349742a2e3576106707e53d4d38c84354b298843062e607274",
  "dcId": 2,
  "banned": false,
  "dateUpdated": {
    "$date": "2025-04-12T12:40:38.050Z"
  },
  "firstName": "Ruslan",
  "lastName": "Khokhlov",
  "messageCount": 344,
  "username": "khokhlov_homeless",
  "id": "7236806689",
  "remainingTime": {
    "$date": "2025-04-11T14:44:45.683Z"
  },
  "spamInitDate": null,
  "historySpamBlocks": [
    {
      "spamBlockDate": {
        "$date": "2024-12-20T14:33:00.000Z"
      },
      "spamBlockDays": 7
    },
    {
      "spamBlockDate": {
        "$date": "2025-01-19T15:02:00.000Z"
      },
      "spamBlockDays": 30
    },
    {
      "spamBlockDate": {
        "$date": "2025-01-20T08:58:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-01-23T11:18:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-01-25T06:42:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-01-28T14:35:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-01T10:22:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-09T06:18:00.000Z"
      },
      "spamBlockDays": 7
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-12T13:20:00.000Z"
      },
      "spamBlockDays": 30
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-13T12:45:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-16T13:49:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-27T09:37:00.000Z"
      },
      "spamBlockDays": 7
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-29T12:35:00.000Z"
      },
      "spamBlockDays": 30
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-05T15:31:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-13T07:11:00.000Z"
      },
      "spamBlockDays": 7
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-08T12:56:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-13T15:12:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-24T07:16:00.000Z"
      },
      "spamBlockDays": 7
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-20T11:13:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-27T09:55:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-04-07T12:10:00.000Z"
      },
      "spamBlockDays": 7
    }
  ],
  "nextApiId": 2496,
  "twoFa": false,
  "twoFaDate": {
    "$date": "2025-04-10T11:29:00.018Z"
  },
  "automaticCheckDate": {
    "$date": "2025-04-12T12:40:38.050Z"
  },
  "lazyCheckDate": {
    "$date": "2025-04-12T11:44:36.178Z"
  }
},
{
  "_id": {
    "$oid": "66dee200f856541e1b71c738"
  },
  "accountId": "143-support-500-last-9-sep",
  "dc1": "892028dd9dc9456406fae012b9e99b80968301a5e9dfd7c46a0bd26b1e9453ffd1f442c67c756c98cef76cce0c8e2f9f0616e277a036cb2ef864215e729cb69a434435ae22a5574a1b9a34e4af6ea69f6532f6b350ed997fa620769f95409c5923470220dd6476ed5526d62fbc7304498de0f30d80755ecbd9b41290e2d4220826c5200111a01261662b08a254a7e87fd3a9019b428f1350a1c642cb1521bd3c42c2e0ce2dd08e1d824710f6e80e1023eeac5ae06c219b5c01f41d89ecc3d0ab1203edd369a4ce4c347624eb14da0e1c2be75bcf0172582f08a23db7fdfd67c6b3132e14be5ec5d1e18dffb27288bc83dd7f3c15ab0ef98d29de6047432e7c84",
  "dc2": "6f7bdd9826faeecd9cb83f7904055a6a37e54de8ab102b440ab4c1073f99d078e54812d5068403806e2d4b9471978a89099de54b430f65decf988d10fa0a618cb8bfcf35c1b9a81ca7970bd0feea4b0ee88d643d5f71a05edb451099bbcc31f856a62dfe976245fd3f70ce7665b6fa41a464bc4c9a7e15d4f36629cf2b680e2ac0ffaf78d76a747cceda2382095362d9283be931c6e56acaf9ad32cbcc16d0d7c0f0a47fb27c9ada0ee392c76fa5b5d7298086516b3f77fb62dfd5048e338f9689d4413541d09409173a411dbe84201a7d20807ebce84a9211184f16de6952de496e5be1997a133746555d85133901da2d0ab51d0387626a919cb6cfb69391dd",
  "dc3": "bbb4bc9602990bb9579354b9d7d2832da207ade8d3ca52150bc3f17a20e3e0a9b567e8d9ea72d59f3b08c427d53b36166a864f3293e8c34e9f11eb0febb6dac7edcd697b477cf62e3a8604a516a2553640800b96706a83b882c14a296305ee79d0f176b4a17d29b28dee1f118c77fee9837d8e144b20cab494d68d29eccfb31bd79ead7938a9f78cfeacfcfe811749aac6b190a34113119e5331871c576891ec9e699ebebbfe64053880c1f93612028955fa506a2cb3c806a5d7f2c8f0181fc6681e48976333a182e775c6bc0e5bb81de7f1af913b4dc31f75dbebf532a6f2a18e907ae83cf3adf075e2131f6cfafc9c40a53ffb1a5fc562e6e4f37333e66264",
  "dcId": 2,
  "banned": false,
  "dateUpdated": {
    "$date": "2025-04-12T12:59:09.985Z"
  },
  "firstName": "Dmitry",
  "lastName": "Mironov",
  "messageCount": 399,
  "username": "mironov_due",
  "id": "7211110975",
  "remainingTime": {
    "$date": "2025-04-11T15:33:50.114Z"
  },
  "spamInitDate": null,
  "historySpamBlocks": [
    {
      "spamBlockDate": {
        "$date": "2024-12-15T10:31:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2024-12-21T17:19:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2024-12-30T03:28:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-01-18T13:13:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-03T10:53:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-08T08:20:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-17T10:02:00.000Z"
      },
      "spamBlockDays": 7
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-22T13:57:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-06T10:51:00.000Z"
      },
      "spamBlockDays": 7
    },
    {
      "spamBlockDate": {
        "$date": "2025-04-05T11:09:00.000Z"
      },
      "spamBlockDays": 30
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-08T10:15:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-13T10:38:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-21T05:42:00.000Z"
      },
      "spamBlockDays": 7
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-18T07:08:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-21T14:35:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-04-01T16:42:00.000Z"
      },
      "spamBlockDays": 7
    },
    {
      "spamBlockDate": {
        "$date": "2025-04-05T14:48:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-04-18T13:34:00.000Z"
      },
      "spamBlockDays": 7
    }
  ],
  "nextApiId": 2496,
  "twoFa": false,
  "twoFaDate": {
    "$date": "2025-04-10T11:28:56.810Z"
  },
  "automaticCheckDate": {
    "$date": "2025-04-12T12:59:09.985Z"
  },
  "lazyCheckDate": {
    "$date": "2025-04-12T11:59:22.254Z"
  }
},
{
  "_id": {
    "$oid": "66dee201f856541e1b71c752"
  },
  "accountId": "153-support-500-last-9-sep",
  "dc1": "19b176ab6f7098484411b3d6b411167c599e40109d572b56182bcaa8581d2bb978a30b56dbd0a5520732d9d395b75f720e2bccf3e21a07a286f5ba004a2719915d816645f4245bcec59f4c3a9f68817f90e5df6405eb9a4cf37e04e867b185cf75779cdc286d15bcc5356cbe9c48a3e0b93f2834e856969121ff7ea1b80f4045a6eb108da865fc9b69029b20a2d5729d25a954f8a4be6163351fc958dac94ad9a1a38f5e5f0b6c9502ea8d7cba490196c39cd9b4f04825f46b4874b5a7dac372cda55a21a564d6325393ed37f93ef527071e8fb1a0dc8bbb458fa5e2c6b501e7269ef084b3d302197ba374ae106eda449509ab0b6998c26098d4641f1d3416b1",
  "dc2": "aad683e3149e5e88a247a3079e962d87148474e6248369ffdc45b82b8ffafcf62f6137d3951ba8ec5af8416f4b7c5d5e269b50e06e6bdc0bd43a1bc4d5a4e409cb862177676ef413c0277929d12ca5a296608a77a0787e5143b79eda89f6add752acf6a044a543c707625ea8a960173d0e3c45d42a2b890c40464e64065ad749b4603b12363d1b25fdd4e786faa107c155a8f7f9293b7186dd675007836105473bad2760e82055551fa8f4be2a23f86e95a38c278c0548acce707634b97540c8dd78fc74db9b38d77a616d9ba6dce5c519a301e15cac1d8c41620cb529f993a1c8f3f623766db267cc3060a80a1157818b58d0da09e25c8163399f87dd8517ce",
  "dcId": 2,
  "banned": false,
  "dateUpdated": {
    "$date": "2025-04-12T13:08:13.398Z"
  },
  "firstName": "Andrew",
  "lastName": "Rudakov",
  "messageCount": 238,
  "username": "rudakov_distinct",
  "id": "7337705308",
  "remainingTime": {
    "$date": "2025-04-11T10:51:41.839Z"
  },
  "spamInitDate": null,
  "historySpamBlocks": [
    {
      "spamBlockDate": {
        "$date": "2024-12-07T06:30:00.000Z"
      },
      "spamBlockDays": 6
    },
    {
      "spamBlockDate": {
        "$date": "2025-01-10T10:50:00.000Z"
      },
      "spamBlockDays": 30
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-15T05:51:00.000Z"
      },
      "spamBlockDays": 30
    },
    {
      "spamBlockDate": {
        "$date": "2025-01-23T13:23:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-01-26T14:55:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-04T05:54:00.000Z"
      },
      "spamBlockDays": 7
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-04T07:29:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-07T11:13:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-06T16:21:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-12T13:38:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-15T12:52:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-19T12:41:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-20T12:31:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-28T07:27:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-27T12:36:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-03T08:13:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-12T07:55:00.000Z"
      },
      "spamBlockDays": 7
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-15T05:25:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-21T13:41:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-29T08:12:00.000Z"
      },
      "spamBlockDays": 7
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-26T07:37:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-29T12:57:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-04-08T10:06:00.000Z"
      },
      "spamBlockDays": 7
    },
    {
      "spamBlockDate": {
        "$date": "2025-04-08T20:22:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-04-14T10:40:00.000Z"
      },
      "spamBlockDays": 3
    }
  ],
  "nextApiId": 2496,
  "twoFa": false,
  "twoFaDate": {
    "$date": "2025-04-10T13:49:26.900Z"
  },
  "automaticCheckDate": {
    "$date": "2025-04-12T13:08:13.398Z"
  },
  "lazyCheckDate": {
    "$date": "2025-04-12T11:00:07.359Z"
  }
},
{
  "_id": {
    "$oid": "66dee202f856541e1b71c76c"
  },
  "accountId": "163-support-500-last-9-sep",
  "dc1": "30a262b8ad827192286b160e7b16c2961c758c95aeba0c0ce9b3fcf997e9c76fc10f66620555e24b701ef654fb63b227f3b21f345d9939c1e25cad84dae487658a0f2d7a0cd7f411bca4dff4505975adc35d9366286269320dacadb4970b94b71d80364da9c8f1c23dd56186138266e39d6a30c0c0550dc27f1a8158a61b4c59efd0708e17ab65eb2432b32c9a1606b7c7be0f29d5543fa1276592d83c4f27edcddc95668895f40afdcc0b026014b571675a64adec148329754b619f7e051f7b944c3dc9dda05f5da27ea8079a3d9ac91a1b0bb826b754b8d7f1fb7f96ebc55de03b2bcefccebe6f8da04d4ef38648adb2d396a579481805677a3bb03094a1aa",
  "dc2": "73d93a8e5cfb1099d65e9285f1f8fa342b527d984aeb373a12315f3bd9ac782afdd4d8c4b8218553e3e37a91aac1155fbe9f555e4876cdaf560e5b9ef752c5d9d349f665893b2a81be8dbe7094cfb9384e2a7e2d05b40c538bbcd860a3fa768975321655488f63901f4736ae1dc92944eb9ee75d8e93f1d20a46b5a0e261ba0e3069fc3bd9f1b362cde3ce389d7b88f64776d0107cbd10971dfa9606e5ea3a796c1cb5836d772421379f5cecdee7a955a78e62c0a0f3672c20be9987b5cbd5593859f3766e48044a6f7f99bf3037a42ad7fb0fad3fac8e768a46adc9b82d764bb35d42a3c37cff42366aa11b816dc92d359fc550582a59ddcbbf0f249575b1d9",
  "dcId": 2,
  "banned": false,
  "dateUpdated": {
    "$date": "2025-04-12T13:00:17.506Z"
  },
  "firstName": "Victor",
  "lastName": "Eroshkin",
  "messageCount": 315,
  "username": "eroshkin_parental",
  "id": "6995587948",
  "remainingTime": {
    "$date": "2025-04-11T15:14:40.767Z"
  },
  "spamInitDate": null,
  "historySpamBlocks": [
    {
      "spamBlockDate": {
        "$date": "2024-12-21T09:47:00.000Z"
      },
      "spamBlockDays": 7
    },
    {
      "spamBlockDate": {
        "$date": "2025-01-22T05:54:00.000Z"
      },
      "spamBlockDays": 30
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-23T22:00:00.000Z"
      },
      "spamBlockDays": 30
    },
    {
      "spamBlockDate": {
        "$date": "2025-01-27T14:16:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-01-31T09:57:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-08T22:23:00.000Z"
      },
      "spamBlockDays": 7
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-06T13:01:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-10T12:42:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-16T08:10:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-20T11:19:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-23T15:06:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-04T08:18:00.000Z"
      },
      "spamBlockDays": 7
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-05T08:43:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-08T13:35:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-09T08:34:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-14T08:16:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-25T10:32:00.000Z"
      },
      "spamBlockDays": 7
    },
    {
      "spamBlockDate": {
        "$date": "2025-04-25T12:40:00.000Z"
      },
      "spamBlockDays": 30
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-29T11:19:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-04-03T09:41:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-04-14T12:08:00.000Z"
      },
      "spamBlockDays": 7
    },
    {
      "spamBlockDate": {
        "$date": "2025-04-11T10:10:00.000Z"
      },
      "spamBlockDays": 1
    }
  ],
  "nextApiId": 2496,
  "twoFa": false,
  "twoFaDate": {
    "$date": "2025-04-10T13:49:27.066Z"
  },
  "automaticCheckDate": {
    "$date": "2025-04-12T13:00:17.506Z"
  },
  "lazyCheckDate": {
    "$date": "2025-04-12T10:18:21.583Z"
  }
},
{
  "_id": {
    "$oid": "66dee203f856541e1b71c77e"
  },
  "accountId": "171-support-500-last-9-sep",
  "dc1": "06c241e0686b1c143d310c95b35f04de6293cdfa54460fdf66c1a1363af8a85e5a9852fe418e73bf4481e6bb9fe7c718f08ecd8529846857280c86db7c48b1eb5251daa00eb4b013ac59fc9ee87e0bd96d88937a5bea25340bddc1176774da86aa14d1a61708a13c9b8db2ca3f0a610f8f5cc5af274c2cddb6137276eacd2d3c3301fc8b0dd0ad1608342ed01b09683d089877d4137177b68866f5f4ab7cb14e9ac795150378d7079950da8e62c3c42894a4f83369893627e6230dfda0a3a2eef5ea8a7af2c7d66bf6f3b76baef73fbbab970253adc367e709a9c4fb8ebea838c8427c1b0c85f7f27f2ab290f39f141d21d785e17d9d9636b7ebbbb8503772ec",
  "dc2": "a5b17816b8064001c9616949beeb27211be4d4ecd8686e627f0f3cc85f49ee7ce01c864a529126ad65d1c97b9b99bf860f29d556e8671d908b0335d4c3cf72079a9ffc8165a474c42011948300d998f0d0afe6339a3ef8f48300635a4064a7177d4a5cfdcb9b1dc67368d2b11c52e3e58e2bd409ff97300e61ecd3ad5365fe186a39abb51e4ac50e85392e724bb2ee31fb0106dd9c2ebd71977ce4f3ad7dbcf78c127e2ef0a836a763b527ef555c6d29068430a31d57e4e96e99f351f3780e77a3f4e8f5a3445e0d2c19bdf3841ec070fb439a7a8ec1456e37734a32016dae2e38e854f743d374acb407a21744e2da91283c3ed5eb61ca65ac87b92e89260dc1",
  "dc3": "bebafe1d3b971f9511dc68a3ec854e57659a3c00ddd63c61de4d11cd41d9ac54da87bb7995162df1c291682d0f20da727404e565675ab84ebab9ca9c13ad2dfad732e29d4e15643f739d6c4cc8d47af7dd35c0af23612fb8136273696d577a3d6d8b16a85dafb3149a0ab6ac4e1e193be4d73c5d816ff347df2bb651a0c1bb27b04575912150da707cb4204183e0f552d96e255ede2a633b35385f592b5e3a983e84aa0b17291ba8cbcd2c52d777f102070ee3e105a39471c26df05ac55d4ac7934650dfd6f4e2349f725596c9780afa7ebe0637cc61c0ac3de344472f68682ca7655ce1589139d84a5198508ee65fc818af5c47b0d96ac4415ca532f468b750",
  "dc4": "12aafec226122718108cbc5dfef7302e0c9684bb6dbf9045a416a9b539484f32beef3b38a06af050fc9116bd955486da235db4145e432bb8566a2cd204bcbf85075d94540614209e6203ebb59ba232d6e641dc2f03fd485a4e9b753b5c6fed467166baae5cafab309731247ebe9c061d31311e3380aa1d518c5be7ed4cfddc33dce222f952df7dc7f7521517bd2beb3669372a79285acec89b9daeac9d0c2b0df98bd4eb68b2cbe1ffb4d21d419caedaf7c5fe53a92e861a9a79e0beed418ddd2bd213993e9c8aec3b37991b27f6851068ee949cf74c551de480ecb6211c32ce8443f4157403c2fda9b92c75edb0423f51e7b8a192dbb77577a33f3832799d11",
  "dcId": 2,
  "banned": false,
  "dateUpdated": {
    "$date": "2025-04-12T12:15:38.059Z"
  },
  "firstName": "Stepan",
  "lastName": "Kuzmin",
  "messageCount": 354,
  "username": "kuzmin_strong",
  "id": "6336652135",
  "remainingTime": {
    "$date": "2025-04-11T16:23:08.918Z"
  },
  "spamInitDate": null,
  "historySpamBlocks": [
    {
      "spamBlockDate": {
        "$date": "2024-12-07T08:06:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2024-12-12T11:23:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2024-12-29T12:06:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-01-17T09:31:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-01-24T09:08:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-03T18:29:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-12T11:01:00.000Z"
      },
      "spamBlockDays": 7
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-15T18:27:00.000Z"
      },
      "spamBlockDays": 30
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-22T05:53:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-03T07:14:00.000Z"
      },
      "spamBlockDays": 7
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-28T14:42:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-05T16:03:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-13T13:45:00.000Z"
      },
      "spamBlockDays": 7
    },
    {
      "spamBlockDate": {
        "$date": "2025-04-13T05:23:00.000Z"
      },
      "spamBlockDays": 30
    },
    {
      "spamBlockDate": {
        "$date": "2025-04-01T09:41:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-04-04T10:39:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-04-17T10:47:00.000Z"
      },
      "spamBlockDays": 7
    }
  ],
  "nextApiId": 2496,
  "twoFa": false,
  "twoFaDate": {
    "$date": "2025-04-10T12:58:02.218Z"
  },
  "automaticCheckDate": {
    "$date": "2025-04-12T12:15:38.059Z"
  },
  "lazyCheckDate": {
    "$date": "2025-04-12T11:34:53.171Z"
  }
},
{
  "_id": {
    "$oid": "66dee204f856541e1b71c791"
  },
  "accountId": "1722290723-support-500-last-9-sep",
  "dc1": "2b816780e8cc6ef944cbe7f605bd2dec34d49f91dc2c334112bc7dc08535fba9ab56d91fe38686744ee7301a0ce424f0c3eb29c74eeb0c271bba419ef9449846c90e08fbfa7c5d68ff025b7f550f9a95af78df37b48bd21e6d0fd9c2e5370f89788d501bb7a7424871b7f7d54829c877571570d219c0b1ade4e4daf559ee173f94b86f997d987c990d262eb63efd4b8e091f4e507f620b0c0df84fa2ee0fbc9b4c14acd2b1ef8aa0798b23d2d3d2b0c1b7511c2ce3c139af4d01db016e9a0a904c54f4300df256c58486367422a8fbbfec4c55a3ade9ebcc7623487dc193bc3ffc0f9142686d30fa3bc0a79754acb504659a3be1932317390e57fb00f76d562e",
  "dc2": "4f0a57d3f1f05151b7ca9ed1754a10d216032a3d064cfbe38470bd3b3baa4e6f97997f5787142bf276ee0add09454d4f32195968bb8e8e80a5f2a86761297586652d78c429c1abf29461142bffeddee646ab6b556eade2579776aad02a57fb4f1461bdae43cdef27e814eb3a7c72b1a8b1587f892c536ee2526ec105582338db53d6530252d8026d03d2f575307305bdd9639869580b713bdeae233187609d6c302fe9831875b84059c7e40a3fb51c0470d5af45dd7cafe1ff8d4dd41fdf27ad7e748b41f896cabee6c71db45fff7afe35739e34e43f69ee4ee83c70409af4ac805c347b9d8fe003ea6448d8923faaa583bd8d45d6546c6db15914041309619f",
  "dcId": 2,
  "banned": false,
  "dateUpdated": {
    "$date": "2025-04-12T12:57:19.608Z"
  },
  "firstName": "Victor",
  "lastName": "Gavrilov",
  "messageCount": 451,
  "username": "gavrilov_cheerful",
  "id": "7340016453",
  "remainingTime": {
    "$date": "2025-04-11T16:17:53.952Z"
  },
  "spamInitDate": null,
  "historySpamBlocks": [
    {
      "spamBlockDate": {
        "$date": "2024-12-01T12:14:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2024-12-14T08:28:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2024-12-24T14:26:00.000Z"
      },
      "spamBlockDays": 7
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-03T08:08:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-05T13:07:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-13T06:51:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-27T08:22:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-13T05:41:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-26T13:32:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-04-05T15:23:00.000Z"
      },
      "spamBlockDays": 3
    }
  ],
  "nextApiId": 2496,
  "twoFa": false,
  "twoFaDate": {
    "$date": "2025-04-10T11:28:56.836Z"
  },
  "automaticCheckDate": {
    "$date": "2025-04-12T12:57:19.608Z"
  },
  "lazyCheckDate": {
    "$date": "2025-04-12T09:53:21.679Z"
  }
},
{
  "_id": {
    "$oid": "66dee204f856541e1b71c798"
  },
  "accountId": "1722290771-support-500-last-9-sep",
  "dc1": "916d7e9a328b9cb5d865cf416a318347d82b18e365ef1daecdad7922e8af79e162c7ed7990802d1978509d1bea296ef4a233d0178c71386fa5cb34888426eabc24e6a2957f017ea2622b7c9fb3a6b3c9665b8a243e0758cabae96dc2c619cbecda0c13f47a2fbcdda369ef5626ced82b4e88b5f014109c37cbbc588c542e893b6c8b19d908234f680fe6a0f4e65a080a1a1525fadc7b3871239ff1253ba005dbc88321553c539bbb2aaa29486ead1fbb14c55e5e3955de0860ecc8222863fc7af902f0a4b8e91c83be18d751a52dee0037d1a5319f06f7b2b34351d0317528ce808868252deb52d491391706fe0d8363a8292db973a33eef02554e1ab8c29416",
  "dc2": "b5a247978b2cdb0e842cdedfc1413e7ae67a1dab28cf4c7075b2f9c45191004225e914a5651024142eb532708ea5c0bf11deddda0325c52fbdc8ae95a2affd18daabe4493c0da24a7659b680addb246521208f72bdfcb02666209f0a57fef5e6d2676af92493263db372945c89044712267ca5990221030debf2d1b74ddd2f04cff34a765a240c5e8a09fb774c69c709ed489cd9ab41ddd9f27d482ecd9cf404e2b7a7bee19f8987b18dea515eca74f00e5e0c3fa70b93644f13589ebee18d17bd25d9b7a74b4f4579c69f00a7f8aa457ccb24392162ab866b544ca8516f5f1b9c633f56045e5b3f01d7751f65015b0db70de33a23b418990dff5b36f7a2b916",
  "dcId": 2,
  "banned": false,
  "dateUpdated": {
    "$date": "2025-04-12T13:03:15.040Z"
  },
  "firstName": "Nikolay",
  "lastName": "Zaitsev",
  "messageCount": 223,
  "username": "zaitsev_electric",
  "id": "6960798782",
  "remainingTime": {
    "$date": "2025-04-09T09:48:00.282Z"
  },
  "spamInitDate": null,
  "historySpamBlocks": [
    {
      "spamBlockDate": {
        "$date": "2024-12-23T15:40:00.000Z"
      },
      "spamBlockDays": 23
    },
    {
      "spamBlockDate": {
        "$date": "2025-01-23T12:11:00.000Z"
      },
      "spamBlockDays": 30
    },
    {
      "spamBlockDate": {
        "$date": "2025-01-20T13:18:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-01-25T11:31:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-01-25T14:37:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-01-28T06:06:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-01-31T14:16:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-01-30T12:12:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-01-31T08:41:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-03T12:30:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-04T16:11:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-09T07:23:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-07T14:57:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-08T09:45:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-13T06:16:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-20T10:08:00.000Z"
      },
      "spamBlockDays": 7
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-21T05:18:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-27T07:28:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-06T09:34:00.000Z"
      },
      "spamBlockDays": 7
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-08T07:14:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-11T09:01:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-12T08:53:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-13T08:29:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-16T12:28:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-25T09:03:00.000Z"
      },
      "spamBlockDays": 7
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-21T10:50:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-26T16:23:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-04-01T09:03:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-04-03T06:39:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-04-12T07:50:00.000Z"
      },
      "spamBlockDays": 3
    }
  ],
  "nextApiId": 2496,
  "twoFa": false,
  "twoFaDate": {
    "$date": "2025-04-10T12:58:05.835Z"
  },
  "automaticCheckDate": {
    "$date": "2025-04-12T13:03:15.040Z"
  },
  "lazyCheckDate": {
    "$date": "2025-04-12T09:52:17.969Z"
  }
},
{
  "_id": {
    "$oid": "66dee204f856541e1b71c79a"
  },
  "accountId": "1722290785-support-500-last-9-sep",
  "dc1": "5292e1f70753aa8d71299885815ca24ed2a2f5a46e5e2728d53d677f61b9bdf0f7cdb8bbeaaadd35d3002d383ba232d99926c7dff6702f911a80b2f5fe27950fecc1a6ee5b65228d91ca9a32b55ff2df3150517423044e0ff704c1c79124a850d5ffb7db707662131ef780ad3b898cec13734382a3c430f0cf8c82f3e750704abebdadb0de5486560f9ce4b547f914a9ee1025145ae8d5ecfe0b391ff1918d27a9f235f707dc5ef32361157fa6d3a8c1bbfd3cbf9fcc8ec6ae69f2a4fee670d5d26efef65b518658bc1c2a2107b2b6a794b8874c7be68286cb7b439d459c58cb67312c16367316c8784b86c7f699eae9a42ad012b14244847ae2139b98586a45",
  "dc2": "988c94a28e9906517eb129795f9c0d9c9917a600e030dcc0e8df098dc85ab2e9b2bfe24dd34d75191c4ffe848ad1eb6d02dfc1e0887e23a4af34db53f3c5f36e8b1705474e3016e624f590b11be1b771b06906d12cfcaceeaa3d12136c50b61352aab7540127720c547be102ecc2f146fbd0ec8851776550459296ec65b02dc2d902f266a909df5f882edbe0fadb887d9d546f25cae96a6a5648cf0bd2abeaf4662cc8cd1f22c8b2a78d75dff7e1cffdda2c25a37fbfe19c189dad90586f52b12c7cb2254e179e8f89efe7bd4390feafe4dbe8cb498f639d7ae4d802c6938395819cc2c6a1bf5b44dc5de09bb5bbd111205e0bca3a3b6c02b0b53857fd61f3eb",
  "dc3": "1a821544ed900345c86be1297ad4789ae583bac83da2b08eeca2a2fad12845ab9ea06056c7b39433662d4b09b72ff0fde732cca2c73cee6bba2952c41cb8dad65a24583f07c7c0e073790d3e09bd7396b5e5d4af22aaaef17bae776c0677cb424e17469fca57cdd1f1530e3c4abdc26ffe0795ab524b606bfe3f565c08e8abad98fb34e8602fa0d6a6f68717fd38e680362211a692587f9229542f76845c4621e6912361388e8b21fc0560d9cfcc5133e3c747e53c41f77dea1776053fd016822887143c5afae05841800327d12eef1d6d95b30b39f7a755d20c627373b9d0ba0ebbb324bdbe8ff4e2694b360d52af9f07696fc3e12f207af17c964b7167f0d3",
  "dc4": "03b1b87339afb73c7cc7a126a268cf4d0c022c00b15c9e2dc1764e7d830ff43a9abc0b146e2f9459613c8a028b85f66f30bdaf0cec7a282ed0837c029b310622527a2d559c89fea4c405599a2d6bfffb1b65eac5db4862a70db3f300a0f9cfb52b09989eb636b2bf3736be70760ba819692fece1b51bac4c2866985da7e5658f18b83882fec7a400939d14c1b4bebb9491f5023be7088ddb98e73dd06a7a0b21075002f8240911e776b4873de687a859b57ccff8ff98db54471cb0bf852365b1c34e83f69437d2796df58a5c0e29f08d0bf8ddc6337c09d37f0acdb202063c0898df11d79e2b3b0db289cb8b032c10f5e7b1edb39aae1df12e8075e565a42457",
  "dcId": 2,
  "banned": false,
  "dateUpdated": {
    "$date": "2025-04-12T12:59:17.483Z"
  },
  "firstName": "Viktor",
  "lastName": "Zakharov",
  "messageCount": 412,
  "username": "zakharov_psychiatric",
  "id": "6419332348",
  "remainingTime": {
    "$date": "2025-04-11T13:02:27.329Z"
  },
  "spamInitDate": null,
  "historySpamBlocks": [
    {
      "spamBlockDate": {
        "$date": "2024-12-05T07:01:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2024-12-16T05:42:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2024-12-19T11:16:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2024-12-23T12:07:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2024-12-26T18:24:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-01T06:21:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-28T09:37:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-11T09:42:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-14T11:17:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-18T14:23:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-20T18:04:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-24T06:27:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-31T08:17:00.000Z"
      },
      "spamBlockDays": 7
    },
    {
      "spamBlockDate": {
        "$date": "2025-04-01T07:15:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-04-02T18:47:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-04-13T09:22:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-04-12T11:25:00.000Z"
      },
      "spamBlockDays": 1
    }
  ],
  "nextApiId": 2496,
  "twoFa": false,
  "twoFaDate": {
    "$date": "2025-04-10T11:29:13.990Z"
  },
  "automaticCheckDate": {
    "$date": "2025-04-12T12:59:17.483Z"
  },
  "lazyCheckDate": {
    "$date": "2025-04-12T10:05:22.008Z"
  }
},
{
  "_id": {
    "$oid": "66dee205f856541e1b71c7ae"
  },
  "accountId": "1722297050-support-500-last-9-sep",
  "dc1": "201ca2b452db1b8ec1d4f955103a6d8525a8ef68f679fc20fd00aacd6a8e52bad6d292e4e205c505f15894f753afc3da579c473ac7507c005f8b47e319edcd5dbfe551b50b795f749ae572d6839db834b0475cc26c09d7cd7fbb49d45d8c7671d2b0f063fe83bd9f32ed4277f0387a49b90f02aa292f8cedf4caf044df80d891a73c9a7b8ee913a57a8bed7d18dff0c1e92f0f770c2943663725b7d9be7064a6cd3277a4a9cce273162b2ba3375ee52e67d8f10f29611848a8bf16075eeca9fccd70c8726e13af7c80c46e87ad0ea3fc213728f1db6f240a8a8b3f61335a3e83cbd0cf20a30c7bac1255794c63480941deaed8d69f01cd79765d330275b1292d",
  "dc2": "71a2cce7b11adaf1ed1f67d1169f9dbf819bddde8f5943a143a829a48f50b4e11ef79e622258771f389471ea96e0eec8eca8f076bcbfa04ba24e04a9c6291c3fc9d002ed52b8c5007fc73e3c5b9ebe889e39cf26b48bc4698b8990585395c686ee7f4f7ea3fa0d3508836de9f1e011488b90789bea71ece8eb347e8954630e9df7bbedff2944bf8f54b681782841ca03f4bfbe8de9aa456f5274c565f01ef40b67fd46261c18a2eddda11645cf4d91f7a955d8c10ca18ecb3fe3109210466425217a613381452788c91a41caa5ee638eb8cf501c6844090b4d4909955f8a68657c3376768d28b2f3153fa052e2d22d89c19be2278805efd35c8e93a884388ea5",
  "dc3": "9e4771c70fe57bf7e45511f328e9110cb59e78a08a2469c8fd73953fa0e1917d003609414a010b5ad1349eed8f4e72fe4a5567f8f7d7d1e155581ba5ad582ec7d195fc5f7ce35fd73aff1cdad444716312c658ee9b6cf9a83e685a0954aeafb154edf5f82d06b2683742fd569a7c54200e32c76547214d4b17555c54b91e1bc4915255e3ecd0978d28f018b33c7fc506a643caf50c278c3607bb5eb142c399fa805c4256128ce8f546547a90d17c75f2dc18c179ef0291ac3ae257b25e7e2866521f56849270a1f9111df8cfb38382a82f4943f11edb6a63ab0caa71d1960b14e1f9962c125c20be05a96fbc26b8da424b65e22a7b1f72ea1572257eec0d97cb",
  "dc4": "6d1da30dee53147c3a5fd9a6a13a8d360dcf09ce53d5268bec924910ec655b09bfd6036442104cef26413aea2b2ede1ff9baca30ad5213b5ac1ab33c3604159e2f9e361d111cdf76420ec237dabc6c66e3747bcf4fd8247d30cdbbebf0ded87eb47030a244a8896d16d6aec7df858b3668ec5f2d538596c3c1783d51b3967ee293a439b3087d1a59e1f7604bf215db8b5432007aecfe15942d979afdaf76cd40fd223f8adea03eaf5095cc79923d70d93e73a58685c25f34ff17e75973dac1ea6e801f17b3c44ab83a175662f31e55973314fc702bbf9a8c737c6b2f3a4f9caf46d5b4b2ddb8bf9b2135b5dd16869eb9f4d39c808910cbecce6d886c0fd67f80",
  "dcId": 2,
  "banned": false,
  "dateUpdated": {
    "$date": "2025-04-12T13:01:19.622Z"
  },
  "firstName": "Viktor",
  "lastName": "Zhdanov",
  "messageCount": 402,
  "username": "zhdanov_tense",
  "id": "7337037249",
  "remainingTime": {
    "$date": "2025-04-09T12:32:42.200Z"
  },
  "spamInitDate": null,
  "historySpamBlocks": [
    {
      "spamBlockDate": {
        "$date": "2024-12-10T08:34:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2024-12-13T12:45:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2024-12-21T07:32:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2024-12-30T06:28:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-01-20T15:00:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-01-29T11:11:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-07T05:08:00.000Z"
      },
      "spamBlockDays": 7
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-02T13:19:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-06T14:36:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-15T05:27:00.000Z"
      },
      "spamBlockDays": 7
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-16T05:08:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-19T12:48:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-21T12:30:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-27T08:54:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-11T07:28:00.000Z"
      },
      "spamBlockDays": 7
    },
    {
      "spamBlockDate": {
        "$date": "2025-04-10T15:32:00.000Z"
      },
      "spamBlockDays": 30
    },
    {
      "spamBlockDate": {
        "$date": "2025-04-09T09:01:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-04-12T10:45:00.000Z"
      },
      "spamBlockDays": 3
    }
  ],
  "nextApiId": 2496,
  "twoFa": false,
  "twoFaDate": {
    "$date": "2025-04-10T11:29:05.275Z"
  },
  "automaticCheckDate": {
    "$date": "2025-04-12T13:01:19.622Z"
  },
  "lazyCheckDate": {
    "$date": "2025-04-12T10:43:02.065Z"
  }
},
{
  "_id": {
    "$oid": "66dee205f856541e1b71c7be"
  },
  "accountId": "1722384056-support-500-last-9-sep",
  "dc1": "a8d31492d6e370f01334777d9249268869807390f6a85c99b7b16cba64c51bf5e52f029455d253c87dc5bb416df4574f76f08c4fdf9afcfae9e35adafda1d91ef0c3f0dd29e84cdc309d258fa9cac96ebc45e99954c1b2174105c63e9cddb2697f0ecaabe886cf2a6f74a32238802f68a0b52522b51220f2fdb6b50f15179922ca44988bf0b431132485e33bff169dcb9210b0c97cce3b90a11520e5401eec021a1d86c2b5f29950bd0260be3fdd874a11a79b582a7700cea56bf9e944d0fada9a4385913304f40b4701ea83d76511239be02ef9dcd1c9009945fe0a42ca99ce8ab452b1e6f6d89c7603d400b438096a62c9288413c8f125d3b19bf3dd9be880",
  "dc2": "8b08bffc0f19fea3168f6170eb2f6fc7626020efa53d10fb4bf7cdd0db4117f9a9799d6b2b38a5976d98910d516e2c56ea25c0fda8bd3f030304b1da9554cd65e7f9bcf5929057332729841730343cb9c5939b82ec38ad48db34e34893c8c78cc0e78c3f198c38a54bae13fd4b3d153c58df58de53cd7d68aebe4c8dcd3dc04f25d34fa3a006329c41f2cf77f17a6ca5cd38d0ca9f6bcb399ced2214033955a77d755a2893c61b6a382e317d6266ce7b7408895e84ac830f8f55615a4ac7dfc11314c2bcf48882918ba431a1a5cb4d6a09d3344e8d71675b78c313a2db240bd493e415147ecd7167138bb27588a2a5b765fcc13390fb356abecef669f4009f10",
  "dc3": "a58bf79c0a36620045d6da8762c2d7f828f9257ada29f761e29bf004e4111519a709fc27e7d69d5f9e643fe04ba1be451f071fcc87fa89452ed47a6686f0ccb7aa02fc084106207d86cd1b69f2105b674233f1c6071f18a348ff96621152f1904c35d7528b523aa48cd2af70baec0e307d44003b4d42e9d750e4497d84c0938a618528aafb58515f97b735bc902760bb6c9d1ae325d1a1e5a72c5c48d56771f3cfbb7c6c31711bd101e9b7bebdf211eff9c2f205a71fc2ce1dc9848726b1ead4db680148109ec12fb27043cd5f8374ccb8d3be5b3572a48b36cf49cda131ecdd79f936f2225b0399fe2fd69b36b73e3e7d91332cf9db7d8221ffe2d74e6a68f5",
  "dcId": 2,
  "banned": false,
  "dateUpdated": {
    "$date": "2025-04-12T12:40:53.990Z"
  },
  "firstName": "Nikolay",
  "lastName": "Golubev",
  "messageCount": 459,
  "username": "golubev_confidential",
  "id": "7250376101",
  "remainingTime": {
    "$date": "2025-04-11T16:56:49.506Z"
  },
  "spamInitDate": null,
  "historySpamBlocks": [
    {
      "spamBlockDate": {
        "$date": "2024-12-08T12:41:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2024-12-08T20:00:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2024-12-27T05:42:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-01-28T10:10:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-03T06:04:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": "INFINITY",
      "spamBlockDays": 0
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-14T09:57:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-21T06:02:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-27T07:50:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-21T12:51:00.000Z"
      },
      "spamBlockDays": 3
    }
  ],
  "nextApiId": 2496,
  "twoFa": false,
  "twoFaDate": {
    "$date": "2025-04-10T10:02:11.691Z"
  },
  "automaticCheckDate": {
    "$date": "2025-04-12T12:40:53.990Z"
  },
  "lazyCheckDate": {
    "$date": "2025-04-12T10:12:22.196Z"
  }
},
{
  "_id": {
    "$oid": "66dee206f856541e1b71c7c9"
  },
  "accountId": "1722384183-support-500-last-9-sep",
  "dc1": "8b61c101a26efb35c7b3b8f926b61f505a490f447be78bb5621742104482f443ed7d16be9fe5437c7603966380956c9f9ac51e75ffded2c4e194396f3ef7481ac18b988979bdaa19326e7824f0d365d0b3d26efed156cc8b9ae975d8b91d2ced01d7933da8916a9d583b6d2357c85e347a4c934a770fdfe53c211c50bfd3407b75377a1b1a01bed08b975f1cd533fce123826e1e45c6c56840394520dff789330108cc751eca819a1a59fb09e121913c37dfc30f93ebd04d37b9ef759ac275bdcdf0cd23d2121c7a91ef0ed2d996bc93167653561cfcaf7b9df755f2be68c565445bc26e45ca84d417f05b505d8d18acccb9e330c3a84befa1a6a99da1719523",
  "dc2": "aae535154047d9ce885615aef9b29d2b2168edc9eb00d67c5aa40c1fcff8496ddb64d73b76ec0cd51ac4690638121ba8859213cadfa0ced2e5684b00c2384692340fc7e54244b00df5ca8fd5d77010739175d3d0bd1591fc260a8b7ccea919548d2f7de82247dbfd1f3a9dc057b03e2086c6cdd23deff535b395b5b5618219d909b48cd7e2a0295140298a27e1c2b2b2d66b8da6826f01cbf5e7536f0df92496c5bd1b62afe5458b12b356a0890ed0440b6fd26dd1645ffa4fef6b09d518af742435d95b0098daf312bfdbf643c545192c3042a654caa3975667578d7a4a1d5e6d001aee41052ef9145697251e2f8ff41686d14f5136050af091488fdefefb39",
  "dcId": 2,
  "banned": false,
  "dateUpdated": {
    "$date": "2025-04-12T12:22:52.849Z"
  },
  "firstName": "Timofey",
  "lastName": "Ilin",
  "messageCount": 492,
  "username": "ilin_pretty",
  "id": "7116632505",
  "remainingTime": {
    "$date": "2025-04-11T16:59:13.717Z"
  },
  "spamInitDate": null,
  "historySpamBlocks": [
    {
      "spamBlockDate": {
        "$date": "2024-12-28T11:32:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-01-20T13:58:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-06T19:36:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-13T12:44:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-26T14:19:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-10T12:28:00.000Z"
      },
      "spamBlockDays": 3
    }
  ],
  "nextApiId": 2496,
  "twoFa": false,
  "twoFaDate": {
    "$date": "2025-04-10T12:58:05.937Z"
  },
  "automaticCheckDate": {
    "$date": "2025-04-12T12:22:52.849Z"
  },
  "lazyCheckDate": {
    "$date": "2025-04-12T10:49:09.332Z"
  }
},
{
  "_id": {
    "$oid": "66dee206f856541e1b71c7dc"
  },
  "accountId": "1722384326-support-500-last-9-sep",
  "dc1": "23b4299005638fe218404d34b5bda0320f7a884310404914235eb0539aba090f2031f67c93b141b06a776a1e8dcca2b14e5d4e9d5e971b63bd56161fce6b16afb100ccadb1de61cb76f7076d3c363e69549343b02af3645d1216434bc51df78659160275d9d29178447ca8d84a6eab2354a0bac1b07102541b3b8d1323af8c72b7ad54784c1f779acef2b4f0b0a96508520a5aa562119662a45d529fd20c43db88d1f73381d084005812e0338f3d1832bd34ad7c51ad9645c6ef9ba33eaa832146eb4dcd3de07d243f8942e71a8ca5c601fe0090014f2616e895ba92f012dfa687a48d7047f3c2d8895c798a516cf1af47328bc5da94a4e4255cf0a40f2058e6",
  "dc2": "3e7995640525de1a55a2cc47ac7b37efbc5af93cc10c7531468398d5213972f07347baaf48aab5a1710472065cb2c94e78f18aa93ca4efacf787871944100b8dd8dd9fdbebcda462524cae219679e64a3b721a57fb16a70646485f5af6cc088fcbd77896ff1be1beb24d2a72cfcf92313ee080eb53b4569af68774ec369fbb796a451d64bb48b914e320d0d9771bd70d6135e4944abe20c1f9b670b6e4aeaf4448f821a3f0ac64dcf7d9ca7a5d72cf8726d16232945055e40c6b49475b901195bfa17d26ed32c5989a57193ed8a1f45380fc18c43a0401d1de499e59ad876aba977dc449262d48d8e7da4e44963289ffbc7e1d73130f6fc8c5e2bd66026f570a",
  "dcId": 2,
  "banned": false,
  "dateUpdated": {
    "$date": "2025-04-12T12:21:46.095Z"
  },
  "firstName": "Arthur",
  "lastName": "Erokhin",
  "messageCount": 517,
  "username": "erokhin_cheerful",
  "id": "7324728900",
  "remainingTime": {
    "$date": "2025-04-11T16:53:42.721Z"
  },
  "spamInitDate": null,
  "historySpamBlocks": [
    {
      "spamBlockDate": {
        "$date": "2024-12-10T07:14:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2024-12-23T12:35:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-02T20:49:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-06T13:05:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-11T05:18:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-13T07:10:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-30T13:09:00.000Z"
      },
      "spamBlockDays": 3
    }
  ],
  "nextApiId": 2496,
  "twoFa": false,
  "twoFaDate": {
    "$date": "2025-04-10T15:51:20.196Z"
  },
  "automaticCheckDate": {
    "$date": "2025-04-12T12:21:46.095Z"
  },
  "lazyCheckDate": {
    "$date": "2025-04-12T10:59:07.081Z"
  }
},
{
  "_id": {
    "$oid": "66dee207f856541e1b71c7ee"
  },
  "accountId": "1722384411-support-500-last-9-sep",
  "dc1": "679a421005c927d9ee210c5b27cba4bf46843a71078987e10d4b76f71c3cac5018ba642bbd8c861495c61a343916df7b062b09a20928eaf9e0c11e424a65b5cda8312ee0dbe41b4b6ef45897e7f03b6b05ddfce54e6022613974c17ddffe5fc045d5f6723500b76482be2315dda30be852a99fd240efb61ecc10adc2aabd7ef4bc93a1328ebdcd3aad36c643f745cdfd956f45c631e7f58e28092a69300246768abdddeda924ae8f9ff30b6db46c7a4c98e018eee04510fca389b194ebc7fe34692d8bbe0054c15ea57faa1214510a7730aef7e3d441728f6c899d966bc30c8bacfc16ed4b02e98dc095f61c8dc6a80bc779dfd594bee72db18f3deb8fcf2e80",
  "dc2": "53a4552b889c484d65652665878332eb343cedd22e996b61d3e41c62781b078dbbfc1080edfef5ba59ad243384d7b3e912dbacd4e3d526e305fab5557a963223114939b221dc3a42006d8f29b35adacd3871db45597f4fcbf5506445d7fe927a7f13b0662f79d579c83ddff125cfb3c33af0ee071efaa98692a0979da7e115deb31c39f4bf472ad391df2b25a37407d448eb3c2d53b370a8f55c93ca59d1a95f6a212c0efc6edc0bdc38326bcf624dafa6cf63db2cfb77138c16ed91d518a843309e89a125edd9101a5c5e6854fd15fd7b2d037bb2b1cf4c00955c690c906d7f7500823a1fb9f4f6e9b1e36a962e84e1fbc338ac2b6dea184272463d775bf7cf",
  "dcId": 2,
  "banned": false,
  "dateUpdated": {
    "$date": "2025-04-12T12:22:46.028Z"
  },
  "firstName": "Arthur",
  "lastName": "Erokhin",
  "messageCount": 283,
  "username": "erokhin_bumpy",
  "id": "7026764422",
  "remainingTime": {
    "$date": "2025-04-11T14:51:18.620Z"
  },
  "spamInitDate": null,
  "historySpamBlocks": [
    {
      "spamBlockDate": {
        "$date": "2024-12-05T14:19:00.000Z"
      },
      "spamBlockDays": 5
    },
    {
      "spamBlockDate": {
        "$date": "2025-01-09T15:01:00.000Z"
      },
      "spamBlockDays": 30
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-11T12:13:00.000Z"
      },
      "spamBlockDays": 30
    },
    {
      "spamBlockDate": {
        "$date": "2025-01-23T11:20:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-01-27T08:21:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-03T14:53:00.000Z"
      },
      "spamBlockDays": 7
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-06T05:18:00.000Z"
      },
      "spamBlockDays": 30
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-06T09:21:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-09T09:37:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-09T09:50:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-15T11:11:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-14T07:50:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-20T06:47:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-22T12:24:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-28T08:05:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-26T12:46:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-02T07:09:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-01T12:46:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-07T12:18:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-07T08:09:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-10T08:56:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-17T18:11:00.000Z"
      },
      "spamBlockDays": 7
    },
    {
      "spamBlockDate": {
        "$date": "2025-04-17T13:59:00.000Z"
      },
      "spamBlockDays": 30
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-21T09:46:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-24T14:27:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-04-02T14:19:00.000Z"
      },
      "spamBlockDays": 7
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-29T14:26:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-04-03T20:55:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-04-08T12:09:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-04-11T12:43:00.000Z"
      },
      "spamBlockDays": 1
    }
  ],
  "nextApiId": 2496,
  "twoFa": false,
  "twoFaDate": {
    "$date": "2025-04-10T11:28:57.964Z"
  },
  "automaticCheckDate": {
    "$date": "2025-04-12T12:22:46.028Z"
  },
  "lazyCheckDate": {
    "$date": "2025-04-12T11:47:51.933Z"
  }
},
{
  "_id": {
    "$oid": "66dee208f856541e1b71c809"
  },
  "accountId": "1722384628-support-500-last-9-sep",
  "dc1": "1a230c79310597c0f92ed667ef0f1273fb325d5b29abd3223ba4bacb031c16489f5b1b32c1cca244c424b260c52d831dd09e7d5692de2a2f9e91e87cc32e668b849b0e455524cf197c9de2123e0276f8a27ea13074c77f42a1a3ebbbf08a381c9d272c2a0155563b2fa702a35d7984471d26d47dbf1f5c44baa6b2e169c8d24e8ae4625b562a70298347a6e3eacbda6120ae369c2be200192da60246402c64bd3c601c1c43ee69a8d9fcb83c3b4db8fd7c16821eb2cf24138885fd45ad126ca3a2066da45cb53de0d41180cb53bc684b3e29f57f72c28886313d6ce29da9e43f82f8268ba1808d9c83880bd12db34e5c1110b83aa4f6c8e04b0aa6d0d7bfa52c",
  "dc2": "5be7ed7f9f1fb9e100250782ad3459ceff31dc5538b1e5836a429a9df458220d6332d0b48578c96c439c72493808835233a2d51d46d0ae1a386f9273228c80f58dfbc5602c5f01d947c2e930c9f39d61b5d0e54ae6dc28ace4f21f57e545260fc0d794566db11d068a3ad602ebef64333e1698587e35a18e262be4f00b5a4fbfaa130c49f9f662d845ccb61a44334d3f6eb45b70a1e7ab350292c36274fd49123a933321ec7fd19c65a38621c626ae649846d16ad0786fd0609bb8f0b2c4389befbff34658cdd90265d24554547565285619167799dd69665ebd3e46530bda3cf180b994046356d0a781b77486283ba6b3f323ceae35708453f29bc321b93949",
  "dcId": 2,
  "banned": false,
  "dateUpdated": {
    "$date": "2025-04-12T12:22:53.705Z"
  },
  "firstName": "Vladimir",
  "lastName": "Martynov",
  "messageCount": 395,
  "username": "martynov_armed",
  "id": "7205486907",
  "remainingTime": {
    "$date": "2025-04-11T15:17:34.424Z"
  },
  "spamInitDate": null,
  "historySpamBlocks": [
    {
      "spamBlockDate": {
        "$date": "2024-12-09T14:56:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2024-12-12T14:21:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2024-12-19T01:45:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2024-12-23T13:35:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-01-29T14:12:00.000Z"
      },
      "spamBlockDays": 7
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-05T11:48:00.000Z"
      },
      "spamBlockDays": 30
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-14T07:41:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-21T06:09:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-21T06:58:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-27T06:36:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-12T12:51:00.000Z"
      },
      "spamBlockDays": 7
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-07T14:36:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-09T06:19:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-11T13:27:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-12T06:17:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-15T08:52:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-14T19:01:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-21T11:21:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-20T16:12:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-24T08:57:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-23T14:44:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-27T12:33:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-26T14:11:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-28T13:08:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-04-03T10:55:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-04-16T08:10:00.000Z"
      },
      "spamBlockDays": 7
    },
    {
      "spamBlockDate": {
        "$date": "2025-04-12T13:20:00.000Z"
      },
      "spamBlockDays": 1
    }
  ],
  "nextApiId": 2496,
  "twoFa": false,
  "twoFaDate": {
    "$date": "2025-04-10T12:17:59.820Z"
  },
  "automaticCheckDate": {
    "$date": "2025-04-12T12:22:53.705Z"
  },
  "lazyCheckDate": {
    "$date": "2025-04-12T09:13:26.694Z"
  }
},
{
  "_id": {
    "$oid": "66dee209f856541e1b71c822"
  },
  "accountId": "1722397415-support-500-last-9-sep",
  "dc1": "0ba8efb271a2df3ab0a0e54c47798ad6186b1b89b11dd2fe4fcbed1f12306dff3ad83efce142964dc0a9a43db6adddea4bd9fdcdb0fddd2570457fae00499604c84041f35d4d5592ddb900dd1da73ac170dd33379fe4a5ab536e9ddb58335b087376cf777ace3157b0add6f42de3f903988483b91538b85fe36be437b5ca9d644e7a9ef39ce5ea8a58dee4f497e8111ff1201f78d11ed97d35cab3d7113b2f8a6eba8774481ffc7510d42cb324ddd33c316ece23f4f187b3456dd8bde03bedc7998ad5448ad44c846594bd0414560cbdfa75090ca1f64a038dc4c23e2c3c8a0856b49d391b4af71cd83688423dfcc44a3bc08044476d84ba5123a04f1f772dee",
  "dc2": "5b5333f9db0fbc81b05df6000f5a2303a1c237c45e8503a8b4b3e6df0dc42b54bed113af582c42056b9645485eb332e5b0d0de7076d15cbb87a38c69e8aa615fd6e1e2c1f1856eb3b96e7c515564c3f56c68e174f7f1c9d3ff80af82898dee6a0ac9d28dc6c30bb25780be0863c486ada57a5f7aec746ae374a9b7beb2a22d981c945935caf78916a10d22f43b3c6a01098ce9de37adea7f87b5f0799aba9a9ba018a92faa62aef7034c95a71b8b39b196f23f3cb3c373e7e4dd1e66caeb68a62a5540645fbbb3e7c76293894d55a7dd9b38d0a1cdea51b718bb594471f782ea9cd09602484ed5d503a539baf3e4eb27157c92e2deddbcbcffdcb5070ad26577",
  "dcId": 2,
  "banned": false,
  "dateUpdated": {
    "$date": "2025-04-12T12:23:46.081Z"
  },
  "firstName": "Maksim",
  "lastName": "Orlov",
  "messageCount": 328,
  "username": "orlov_diverse",
  "id": "7235814007",
  "remainingTime": {
    "$date": "2025-04-11T13:02:51.614Z"
  },
  "spamInitDate": null,
  "historySpamBlocks": [
    {
      "spamBlockDate": {
        "$date": "2024-12-02T13:41:00.000Z"
      },
      "spamBlockDays": 2
    },
    {
      "spamBlockDate": {
        "$date": "2024-12-10T08:14:00.000Z"
      },
      "spamBlockDays": 7
    },
    {
      "spamBlockDate": {
        "$date": "2025-01-11T09:13:00.000Z"
      },
      "spamBlockDays": 30
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-11T17:02:00.000Z"
      },
      "spamBlockDays": 30
    },
    {
      "spamBlockDate": {
        "$date": "2025-01-24T10:07:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-01-24T15:25:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-01-30T09:53:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-01-31T08:47:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-04T08:16:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-13T11:01:00.000Z"
      },
      "spamBlockDays": 7
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-08T08:01:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-13T12:21:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-12T12:36:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-15T17:22:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-18T10:58:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-19T11:01:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-22T05:48:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-27T09:40:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-07T08:08:00.000Z"
      },
      "spamBlockDays": 7
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-08T10:13:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-15T10:44:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-25T14:21:00.000Z"
      },
      "spamBlockDays": 7
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-20T07:37:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-24T09:35:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-04-01T11:06:00.000Z"
      },
      "spamBlockDays": 7
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-29T13:06:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-04-03T09:49:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-04-02T16:16:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-04-03T08:08:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-04-14T11:15:00.000Z"
      },
      "spamBlockDays": 3
    }
  ],
  "nextApiId": 2496,
  "twoFa": false,
  "twoFaDate": {
    "$date": "2025-04-10T12:18:17.945Z"
  },
  "automaticCheckDate": {
    "$date": "2025-04-12T12:23:46.081Z"
  },
  "lazyCheckDate": {
    "$date": "2025-04-12T11:41:53.515Z"
  }
},
{
  "_id": {
    "$oid": "66dee209f856541e1b71c829"
  },
  "accountId": "1722397491-support-500-last-9-sep",
  "dc1": "bdd74f3507abcc3c733a0a8994a3c0249ba76ccb59c4d174cd685e3ad2d3e3be597002791a07154fba7f6255c12f843e78e9649f1f2d746a3ffbb78b8b7b4d469992fc8d110a5fe369e3681b6990026f18fc9d634c6bbbe862475f3c9a5eeb4f07d8623bae778029ece4786e825f294d1fb8450cba92e3e00916035d08e29c5303be9bdeddea0800be87f27bed6184b009352acd8d183affdc8f014e23fefdbcef16d49db391073c9bd2f48fd9f4682fc7cf00f475e4d4b2042d464c52a15dff11e476d3c92dfcb8f7921367d508117cb6edf88eb430f879c00a499fbcacf7321f1ac5bdcc6400c35f2f8447a6806959fa41322ce23aeaba5f7621475950d285",
  "dc2": "2c035d6689c5f8fedfa4ff5d93e596a2534b5ff6b8b43ed6b80636b8a99d8a5cd3abd8d79b22ad5d66815c80d7205c34313ac79564f0f9ffbbaac519ff58dcc6c80a6602d786f934dc3d30c1d9b3512b1f74ceb02bd94fa3dc8841e9b0fa5c2c9b661651b4b0504db34e0496b8be3b8b0f9c5655473f065bc9fbb16c1bc7761f98de4ce03818cad4a973ac9bfe97d3f7f2d7881b02bdf96351971bd59bae2705e97375162b3497255aa335e3e87ffca11d3628280a7beb693c8cbbd5c3b8688e244560bdeb7b8d7a5c9282439e504152f9755dd77a0c5c89b5b0027ebbfe6e06c59fb66a196a93af53aafc1088d7e52d1021b40951dc93d673cc512125fa0b68",
  "dcId": 2,
  "banned": false,
  "dateUpdated": {
    "$date": "2025-04-12T13:04:17.502Z"
  },
  "firstName": "Vadim",
  "lastName": "Medvedev",
  "messageCount": 488,
  "username": "medvedev_willing",
  "id": "7297777196",
  "remainingTime": {
    "$date": "2025-04-11T14:18:13.829Z"
  },
  "spamInitDate": null,
  "historySpamBlocks": [
    {
      "spamBlockDate": {
        "$date": "2024-12-01T07:42:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2024-12-05T06:44:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2024-12-08T09:49:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2024-12-20T08:24:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2024-12-28T08:00:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-01-24T01:34:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-01-30T14:05:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-07T08:03:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-13T06:13:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-27T06:54:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-07T10:54:00.000Z"
      },
      "spamBlockDays": 3
    }
  ],
  "nextApiId": 2496,
  "twoFa": false,
  "twoFaDate": {
    "$date": "2025-04-10T12:58:08.216Z"
  },
  "automaticCheckDate": {
    "$date": "2025-04-12T13:04:17.502Z"
  },
  "lazyCheckDate": {
    "$date": "2025-04-12T10:33:08.632Z"
  }
},
{
  "_id": {
    "$oid": "66dee209f856541e1b71c82d"
  },
  "accountId": "1722397519-support-500-last-9-sep",
  "dc1": "731bed9bb3d63f2a55415631f3393be9c8fddd46ac67caf371452a7b9fbbe87403c0c821e7583d805f4a5a0699bf956d05748b2938d54863e3718a3896837b02f8da23173d21412c61990648e7f04c434d8325ddbd8a95e898cf81a0bb7d6ef2540f4232335cebe5589da41c1fe2d14700a64e6dbeb4187cbf6129cb7665bd5d61b27da4d7c116a40ef704164d9a82f72066aed6634153d6962cb0f2a2776aadf4078345aa12e513a744ee34e5af7d93610648511c5389e04b219499534d52c447e1c7d56d8bb2fc2602f8156548fc6d7000d82a660837dc9347c90a7fca1798ff8d067d0605c902579b16057e22e48a5f4b3c702456bf93111382c71ef94c71",
  "dc2": "3adc957914f9a0bd5a3f64fb8caef9a6376a88e81df2d23beeec54299181f315d9b5773f3fc8108f68ce70ce56551957aca2761d6c949055c8b1f562fb6d6b25a5af6a1dc40df197f3a852d6ff00aa4a731326a12948abcde0dffefc055865324af549f52162549d3d0cfb950ca4ccf8ce42cf47ad461f27999452951f135dfb2f935750c504a10f6f5d74e01339c93231cf18ba72fec0a6123170c086d4f49a9271ea844bfaec1da1ed3aa0b268997d680ea7b800a858e5c8cb53f38ced2e4c09466587975b6f4b606c35b3dda2683660dbd1bfb2028c8fd1ece3030cbb2b3518b91ae1857e95f49d1b8f171081585881945ef45e0948a84e655a55cd40bddc",
  "dcId": 2,
  "banned": false,
  "dateUpdated": {
    "$date": "2025-04-12T12:36:54.685Z"
  },
  "firstName": "Dmitry",
  "lastName": "Shishkin",
  "messageCount": 534,
  "username": "shishkin_moderate",
  "id": "7101011427",
  "remainingTime": {
    "$date": "2025-04-11T16:46:45.866Z"
  },
  "spamInitDate": null,
  "historySpamBlocks": [
    {
      "spamBlockDate": {
        "$date": "2024-12-02T07:21:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-01-24T12:23:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-01-28T17:14:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-11T07:29:00.000Z"
      },
      "spamBlockDays": 7
    }
  ],
  "nextApiId": 2496,
  "twoFa": false,
  "twoFaDate": {
    "$date": "2025-04-10T14:32:13.190Z"
  },
  "automaticCheckDate": {
    "$date": "2025-04-12T12:36:54.685Z"
  },
  "lazyCheckDate": {
    "$date": "2025-04-12T10:17:55.356Z"
  }
},
{
  "_id": {
    "$oid": "66dee20af856541e1b71c840"
  },
  "accountId": "1722397649-support-500-last-9-sep",
  "dc1": "9be4dc1fbd6993ee72178ff54793ac9d61c44e94f434524c2d5181faadfcf049c74076bef3dd709ef29817d25db943f6cb53451318ae8bb11c20729c8fdf0ee834bb6cfea1649277f697b1150c5753bb71829eb2ef2bf456f4c668316ae5c901da552ef33d6c725d3b577700672d5a0e40df99895e2847d7a7b35cec100fbb98a2e2c7e8dbb6bf07902120217b1693a1ddb7ddd7e4e52545519bd76297b39ca636fed7dbe22c944e1d0ce633751c2646a06eafc2797665b7b323af077c7d5a10dd031146756fdacd9ef93a7a48e32bc4d883c3321dfae684bf8212d97476e4e9a3e3f0247dd2412dc8665b496b2a9b3bc44eda35590dde1660d50ea7383c40be",
  "dc2": "43cabe6657d950e504b3534d145e17ba384fc3e55be2877f292ff498e65be0b6651198214d1b47c6d8951ea3d5e66929cc9974c75eb24c023079cdc6c1c9ea2aad1c11f0a975b513f29024d4815ac8325261ddaaf7e1292734dc801aed1e44ccedf024317c613e6b5ae2ffc7caef66ca5e04f2692cb112eaa679eacf01b7e8c24817243f655465ae2cebd27c327de3327cc0cb8a4b3480b8ba3d2165cf93e578281f70b030c64ca45deb33ad4b312080c26bbe9ef62c5b5384fd3b45512945449f7bbc9fa3de7ea168869b7be43894ca85e0e3b7769a6f4c9c72397ff728fd6db20ad0cce63fbe505f249f658c3123af6f57c76bfb05f5211953a441a188243e",
  "dcId": 2,
  "banned": false,
  "dateUpdated": {
    "$date": "2025-04-12T13:09:22.354Z"
  },
  "firstName": "Oleg",
  "lastName": "Efimov",
  "messageCount": 506,
  "username": "efimov_radical",
  "id": "7333628559",
  "remainingTime": {
    "$date": "2025-04-11T16:17:57.909Z"
  },
  "spamInitDate": null,
  "historySpamBlocks": [
    {
      "spamBlockDate": {
        "$date": "2024-12-22T07:32:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2024-12-28T08:22:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-01-23T11:53:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-07T13:08:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-16T09:35:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-27T14:13:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-13T11:47:00.000Z"
      },
      "spamBlockDays": 7
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-14T13:24:00.000Z"
      },
      "spamBlockDays": 3
    }
  ],
  "nextApiId": 2496,
  "twoFa": false,
  "twoFaDate": {
    "$date": "2025-04-10T11:29:13.989Z"
  },
  "automaticCheckDate": {
    "$date": "2025-04-12T13:09:22.354Z"
  },
  "lazyCheckDate": {
    "$date": "2025-04-12T10:59:57.627Z"
  }
},
{
  "_id": {
    "$oid": "66dee20af856541e1b71c84b"
  },
  "accountId": "1722397683-support-500-last-9-sep",
  "dc1": "42c1c919123aeb0b08b6a6884b62c62a489c7565ce876950590e279b9d36f32d4b09b2f5fe52e1baf8cfb39cfb31443683c3a1cefab143d6e1cb073727542cc615af1e9ea4074faa68ed7c86ed99ba204e83e9c3b531015a38d2963cf596b791a0ef9108623840a70345f2d9600a2719ce15c12a026b6804c449ce05a902aa0911acddefaaf3045930ddf1dffe762b744c86c3cb97cfd06e9060b86a8f5667f621f668e01a7d91fadb1cdf6cbc75bc0d76f5df08515c31c76549c34737eb369869dbf8281cb56e005a607d86609575dc2cf2a39d673e36d53b40b03b6671bd5af89175da8d64f6c61da913db957b02e736abfab682aee6270ac290642ced33e5",
  "dc2": "8d393ab8acd2c64b2a31b376eb747371b569413150f593f326806dcd6d16a08f96602af6b0517c22da798698d0c70022410069efed87e1a46418b97dda3556372505ac29b344fdf47fb3f7104d67b0d9b853659a772ed7dff1d24434386a085ade7177359afa7005cd38e1de9216eebb947e39ba94fc913353c6836aa717b1439c22fd99abccc1ce671abeceee59a2a3ee5228c641c3fc0e9fb703ddc33d7135281502da183641643968e3795bd515a9425bdc8bd8394f6c9ba49ec7c7aed56fc31ef90745bb2845bb1c0df273ab1130d559e6742f0221aec318891815692d4d42c3877769bf2041546dbbb8e449fb7f71b274a8fbb858becff6c3530925cbce",
  "dcId": 2,
  "banned": false,
  "dateUpdated": {
    "$date": "2025-04-12T12:33:33.890Z"
  },
  "firstName": "Timofey",
  "lastName": "Anisimov",
  "messageCount": 358,
  "username": "anisimov_flying",
  "id": "7288521243",
  "remainingTime": {
    "$date": "2025-04-11T14:39:43.673Z"
  },
  "spamInitDate": null,
  "historySpamBlocks": [
    {
      "spamBlockDate": {
        "$date": "2024-12-05T08:09:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2024-12-09T15:49:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2024-12-18T20:25:00.000Z"
      },
      "spamBlockDays": 7
    },
    {
      "spamBlockDate": {
        "$date": "2025-01-22T07:25:00.000Z"
      },
      "spamBlockDays": 30
    },
    {
      "spamBlockDate": {
        "$date": "2025-01-20T12:04:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-01-22T08:13:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-01-25T11:47:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-01-25T06:29:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-01-28T07:55:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-01-29T13:16:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-02T20:17:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-13T14:00:00.000Z"
      },
      "spamBlockDays": 7
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-15T13:57:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-19T17:40:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-23T05:26:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-03T11:43:00.000Z"
      },
      "spamBlockDays": 7
    },
    {
      "spamBlockDate": {
        "$date": "2025-04-04T11:04:00.000Z"
      },
      "spamBlockDays": 30
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-08T14:46:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-14T11:38:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-18T07:07:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-24T13:21:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-04-02T10:09:00.000Z"
      },
      "spamBlockDays": 7
    }
  ],
  "nextApiId": 2496,
  "twoFa": false,
  "twoFaDate": {
    "$date": "2025-04-10T12:18:01.131Z"
  },
  "automaticCheckDate": {
    "$date": "2025-04-12T12:33:33.890Z"
  },
  "lazyCheckDate": {
    "$date": "2025-04-12T11:35:23.475Z"
  }
},
{
  "_id": {
    "$oid": "66dee20bf856541e1b71c878"
  },
  "accountId": "1722768558-support-500-last-9-sep",
  "dc1": "0b7fc21396f254bcedbf71a38ab2ee905d789718624388b84af7c51c337299ce844b40c42a07d8d92a2d7e0aa17f20693dadecee3528074d5fc8e60ddba44a6ffa273d67857e82dc3f97989c7fadccbe6b7e2fc3bf47f06bd6a40284dcf28005a8e7ad577e449e1c7c0038c75e526897a8c74aa0bd3258d6c2d5f6988def8eac2e6c56e1f680b7ea2e0876a3975b30e3c082edce8f7f34502bdf39d4b566e34fb115b28088df7c8405a2aa2bae8ba287e18aa33ed273d37c513444fb899609fe0c747725ba58ca2a34c2d9235a655e9c800200204f08eb0e72fd366baec1f05c90ea7de3cb35e9ffb2ae92029517ff2a505d9d42165843c943c592db9f618a4c",
  "dc2": "038e48d9c09ed0a3e4d25b6886116f7c41ad33c48a43bb43c5b766a20361b5b4347564fb95a7d1a932d6d4150d4e31569511c7ed763d79372de8c8cbe2279aed734f0756ba809504c74ddcad6d8c9937e1c00d8a19fd95a105a7909b42a56843696930a9a90230455f62706497920ec42b936de0e7e85e04dae6e4ae358ca51b92bbc0d04f29b4656aba86f8ac5695ed47b26a39cd861b474e6d54ad1dd67bcf8b1c63ceb565275dc51a840d58855c5a0f720b9d81bf71b6f4535993ae9db6f59b40f9ae2116adbc27efe5585dba0efd983c76c6103b9849ab16a15cd576519286f6f8b879538fb3061ce47b1e74b8eb4ea891f892b0a8abc904d5e60bf3de0e",
  "dc3": "4b36d7f5ced2b7bcf6d1e0201f38b1c8288225f18e6c16a53f4f3bbed41a9533dd5c7ccc59f149b34bd546d0491952b06c5ce197138f11c2548f5b45b8ac90d0d87f93417f146255faaee5b29ce4362904254228388d126666f7cb5b34187b4d2d2c4af92d6902eb94f6c14a0cc584c5b68b13a33aeb9d20a15f95317760e831727b306e4663ca053c0f30f5a964b5244a49a7c5d3c6af78147d85e5065b959fe31d373988e0c224151730bcadc806f325c8ae777e1b30bbe011cc2c63a3c257d16c585a67be6994b912d6a65a16f0fd182f0298012cfad9b5ae6bc0d38d180be0fd3d64cd04833f1eb2d269a2163c06fe33887194c7b322372eaebc0e1b549e",
  "dcId": 2,
  "banned": false,
  "dateUpdated": {
    "$date": "2025-04-12T12:32:46.240Z"
  },
  "firstName": "Anton",
  "lastName": "Vasilyev",
  "messageCount": 421,
  "username": "vasilyev_good",
  "id": "7479956401",
  "remainingTime": {
    "$date": "2025-04-12T07:04:05.091Z"
  },
  "spamInitDate": null,
  "historySpamBlocks": [
    {
      "spamBlockDate": {
        "$date": "2024-12-02T05:35:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2024-12-05T08:47:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2024-12-16T14:04:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2024-12-19T20:56:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-01-15T12:38:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-01-29T13:43:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-10T00:04:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-15T10:40:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-27T09:55:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-02T10:46:00.000Z"
      },
      "spamBlockDays": 3
    }
  ],
  "nextApiId": 2496,
  "twoFa": false,
  "twoFaDate": {
    "$date": "2025-04-10T13:49:37.469Z"
  },
  "automaticCheckDate": {
    "$date": "2025-04-12T12:32:46.240Z"
  },
  "lazyCheckDate": {
    "$date": "2025-04-12T11:30:19.304Z"
  }
},
{
  "_id": {
    "$oid": "66dee20cf856541e1b71c885"
  },
  "accountId": "1722769841-support-500-last-9-sep",
  "dc1": "523726059f084fcb0f7f2011b0085a43eb476722d1032c1dfc342c86c606578dcff465a5fe4a6a75834bff208a11f866073847cc8303cdf871d08a6d9a56c0f7d7633230029aa4b54e2f91eda0594ba826d52ba7b4a333df34bd0ae322f601e412c3881a69bf0c8c3185b07ecb7873904f9469fa8e0e4ccb64db65e826e991c50f0c8be9d397a77edfae0cc160c389e320d51ac5b617e225af9e8624e27799e89a4c316b4a4ff1a470c100cd5b0546675ec7e708dacf06673d93cae50bb3b0a2ab4dc94912959f6e57e7f622978daae17c2118b2569338305395d41d1221142203420b8d40381baf41f0e219c2bc8b8c4b52188aa5491efe1ddf4f1b2d951e53",
  "dc2": "84643ad30ff56522fbc586e6dfd69cb32a20152c9bbcd9a081a625ab9565c3397045678ea276ab8bcfe4704092812648637a27b1fd647a1be373004866efc7b49bea31eb9fa5b02361e217b5979f58cc0953a38040f5b7074a589ca7343a6d0996ac5ad408fabd1ab14e8871ac8fe8d11c037f4875a1f2c4f96e46013550c9f7a08ef9a9ccfb5c02c5e635174782514a0928842dbb5f0e15ee3bbbb3e6c27a8573cf404f8349efd052c6710c91e2a3958144ceeb1c8941065f762f6cef9b558ac48b68c53766224bbd9644978dcea630fe0362bd5e5b08ef491fee2a9312c4f949e17d96a689e45c302e5d0594477fc4ec1a0f70ef147206fad26bcba6812280",
  "dcId": 2,
  "banned": false,
  "dateUpdated": {
    "$date": "2025-04-12T12:59:24.000Z"
  },
  "firstName": "Leonid",
  "lastName": "Lazarev",
  "messageCount": 459,
  "username": "lazarev_exact",
  "id": "7061189826",
  "remainingTime": {
    "$date": "2025-04-11T12:19:03.078Z"
  },
  "spamInitDate": null,
  "historySpamBlocks": [
    {
      "spamBlockDate": {
        "$date": "2025-01-21T09:59:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-01-23T11:30:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-01T10:02:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-04T05:22:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-17T09:59:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-19T11:06:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-20T09:15:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-23T15:36:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-03T11:13:00.000Z"
      },
      "spamBlockDays": 7
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-03T14:18:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-08T11:54:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-17T09:29:00.000Z"
      },
      "spamBlockDays": 7
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-11T13:35:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-16T05:23:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-20T12:52:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-22T06:28:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-26T06:45:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-04-02T13:36:00.000Z"
      },
      "spamBlockDays": 7
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-28T17:00:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-04-03T14:52:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-04-18T10:21:00.000Z"
      },
      "spamBlockDays": 7
    }
  ],
  "nextApiId": 2496,
  "twoFa": false,
  "twoFaDate": {
    "$date": "2025-04-10T11:29:05.400Z"
  },
  "automaticCheckDate": {
    "$date": "2025-04-12T12:59:24.000Z"
  },
  "lazyCheckDate": {
    "$date": "2025-04-12T11:50:28.174Z"
  }
},
{
  "_id": {
    "$oid": "66dee20df856541e1b71c89b"
  },
  "accountId": "1722770059-support-500-last-9-sep",
  "dc1": "6f6ab2232ab75a29117e3a4a8d7ef7eeb2805f0690381643ef14e125ca43f1d0bf603e0e5308b73d3deb5dc304839e6aaf2bec7eba094b9a303f14e2af14c013dd4ba3ec724d53b7ad7d85534860bb69e759a51df2d0cd04f1275cf66157ed0eda278f263420a4dcdec387d20633a467d65c16066eb90c2cf2f1eade97a1dfa6d9a7a11b49e5a1629e56f60894ae9a94ed3e1e19c36a576fd20c7a0657f8075d72edd516c56a597892eb1151126a50e9f9074316e97e49438955d2c09b2336e22c350635edbc648b6da0de523d967ad623e9d3765ef62e5d1650867b2af84d5d2311d0d3a1e99a6e20bb22aba7bc9a1af393f6419158fb4ab5041d4b880a42f4",
  "dc2": "0d41124b8f8430167693eebcb7de0234a0cd518e87638b04d3c8b6fe62a8e55afb5607aadf131e76ba3f9961ce3710e3b0c39748e325c05732669a867f52d89f2e2e462986406a01481300c5b856249179e509ec4e0b3ab25aaaf275a4708df2d3d83bc358ebc0d9cefeed147ecc63a403be57971b8e14ff0fe251afc97d5f41fb2b66c1694ed36210267e11aa21ca7d55396644087efe22259a8a88e2f4c4cf208301fa5f0e5793f628a4c7e91917ed250caa775ad910cabf191c517e04a45cb76a8047799cf2b84d72eaeeaacdcef566137276ce997faa8444fa2d7959c1e9f17599e4a955bfaf9abab40b839794e135f190e4c0f93a507e50df28461c827f",
  "dc3": "3236fdb2766e6fc16c5970d5e9f92b2d4863d52c46fb402232598de456a51b837ea32e26d2d9cdd35b005dad255f682ecbd2d5f948f8079a70bd4b46549b12383e0a9f58920c5a2dd7c5fe00bedbf9eea87d64cdbe2af8ce44bdce0cd0162f2f93d4407088dcbd9cd828806e703d3c7ab173579bedcf935dff2129bc8977daf25c4b0cfcc8eff4754b2e6d592d8089d770b3442b844a0952f24b33582e9751e642d420479ce85b8965c25468b9a797a0b5248fa1eb2e82feb6e5ffe5e8cff31c0d3fcd8528ac6a98fce979443c7e58a42269e121b381ff63738a591c6a31d6028f85ebc944646764ac09602ea764d4770377473105b933a90e716d0f03cc9687",
  "dcId": 2,
  "banned": false,
  "dateUpdated": {
    "$date": "2025-04-12T12:21:53.665Z"
  },
  "firstName": "Arthur",
  "lastName": "Tarasov",
  "messageCount": 335,
  "username": "tarasov_comprehensive",
  "id": "7274936969",
  "remainingTime": {
    "$date": "2025-04-09T11:48:23.593Z"
  },
  "spamInitDate": null,
  "historySpamBlocks": [
    {
      "spamBlockDate": {
        "$date": "2024-12-07T04:51:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2024-12-13T10:26:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2024-12-17T22:07:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2024-12-25T07:24:00.000Z"
      },
      "spamBlockDays": 7
    },
    {
      "spamBlockDate": {
        "$date": "2025-01-24T08:20:00.000Z"
      },
      "spamBlockDays": 30
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-23T08:38:00.000Z"
      },
      "spamBlockDays": 30
    },
    {
      "spamBlockDate": {
        "$date": "2025-01-31T12:07:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-03T18:57:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-11T14:44:00.000Z"
      },
      "spamBlockDays": 7
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-14T08:35:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-22T16:37:00.000Z"
      },
      "spamBlockDays": 7
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-19T07:56:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-25T09:56:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-01T05:44:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-11T11:00:00.000Z"
      },
      "spamBlockDays": 7
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-06T12:28:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-10T08:35:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-18T07:38:00.000Z"
      },
      "spamBlockDays": 7
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-13T13:05:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-20T10:27:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-24T06:32:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-04-01T13:50:00.000Z"
      },
      "spamBlockDays": 7
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-27T14:47:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-04-02T05:24:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-04-12T10:29:00.000Z"
      },
      "spamBlockDays": 3
    }
  ],
  "nextApiId": 2496,
  "twoFa": false,
  "twoFaDate": {
    "$date": "2025-04-10T12:58:12.212Z"
  },
  "automaticCheckDate": {
    "$date": "2025-04-12T12:21:53.665Z"
  },
  "lazyCheckDate": {
    "$date": "2025-04-12T09:12:07.144Z"
  }
},
{
  "_id": {
    "$oid": "66dee20df856541e1b71c89f"
  },
  "accountId": "1722770116-support-500-last-9-sep",
  "dc1": "79b876d9802e9666ef7f3f1bcce24ba6e4b664d51c1ade25fa525a832f085f2514c7d8367e88cd3bf66a124079cb009cc6fc5edcae671df94c07ffa659f9e75a6da8090b6e11f2542da80a816523ffde77d68adfe16527530677b6c2d82363203868cd7a5398d79ea786ff00e09554f06f7c1c8abf4a531dcf47759960d848fcbac15f66dcc240da95927c56e1e73fcff85b012937aaf305ce0b74a689cc504dc4ef0654ab91aa81ebf4c85547a7bc2a29790b28cc2f09df04759fe9c7ee9ab32d9904daddff5b35c58ce8c0500ee6319420425bf5d4ebd6913acb57a22b79cfd287ff4490ca7177062165b6822743f8f9f709dcb5bbef2c912f074e7bbdd81e",
  "dc2": "374fcfdb3ff71242cd8b9fbb2708455cbf3e6d2e12598631fc502c3b095eda33ee61f3d413dda99f576e820fcdc6a12aa6b2c9155aea8a8be023096c3ec24d56045edf7697719e5e389b7b1c58b30182923f54e66a1776fa148a2123a92bf5c44db9886792a5ad5d21e58f88d2b9d077fa1d92957f68c93a785c296c16fdfe28e0cc903bce13dd4c59ab91f93ee82cf8d547f6374044d471525ebdfa8babdf28c742152110b7cd86f6e5825485b400c6aa2404b7fb64de05cebb5c7abc50a4d579ee7662d5f22c9a9eb12c4651d2dc83153397f470d80e15190efd3b348eeb69e9e87556ca6463211cb00bc3b9cbd945ad8a974b558491d1cfad6f3ad077fa53",
  "dcId": 2,
  "banned": false,
  "dateUpdated": {
    "$date": "2025-04-12T13:00:22.011Z"
  },
  "firstName": "Boris",
  "lastName": "Frolov",
  "messageCount": 498,
  "username": "frolov_upper",
  "id": "7370834829",
  "remainingTime": {
    "$date": "2025-04-11T16:24:11.487Z"
  },
  "spamInitDate": null,
  "historySpamBlocks": [
    {
      "spamBlockDate": {
        "$date": "2024-12-01T12:44:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-01-20T12:56:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-01-25T11:18:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-01-30T04:32:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-09T17:18:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-20T06:53:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-01T11:51:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-06T08:40:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-07T11:01:00.000Z"
      },
      "spamBlockDays": 1
    }
  ],
  "nextApiId": 2496,
  "twoFa": false,
  "twoFaDate": {
    "$date": "2025-04-10T11:29:14.072Z"
  },
  "automaticCheckDate": {
    "$date": "2025-04-12T13:00:22.010Z"
  },
  "lazyCheckDate": {
    "$date": "2025-04-12T09:55:23.184Z"
  }
},
{
  "_id": {
    "$oid": "66dee20ef856541e1b71c8b7"
  },
  "accountId": "1722771356-support-500-last-9-sep",
  "dc1": "9b50ab421a13772a328750d72bd28ffdf46840e72df1b04a304cf7fa8629467907aece998df88c30a97bf118ae6f2432e34c3edda093b8a2c973199d14868f0032c5ef8afc25a01aa40fb6734a01512de1f21918a9faa90603e45dfbe34dfc109a76a70509b4529230a3a895819bff48cf324ccaafe7781d67d3ce3bcb5340921f632081d896c96d43f798629e314e3a266f061ae18467214e41f685e2fff913f3cce1ac841ab7eeafbce94c3c1ad711a454aef5aecade6c4c90241324abae9b64eb75e7113246f683b6141595d0ee91948414cb4c1b2811d2f75beac689436a59ca8967001a590a3e5deaca6aa4e8f0000836591f0fcb4e73ee81e20241dec9",
  "dc2": "6f9ca39ea7bd4cd71bd54579b294b5472da3d4f8ff0a9c7cdc6f1643bbc39ac291d1eb7725035708b07975dcc21efb3136bbc99852b6d1383d4fdce54f99cdd9ef5e223d75da664ff25230f8b86d6cdd54bc662904b7c309a1809bf1af069f4cbeafc7e1c87702433c6c47652e7372e82056752ef0e870f28530c65c56e5f6b553207c57cacd1b4ae32b8e7d4f94f7cbc6afa25fc7dd978620bd93258f581d4f7d8bc2d3736d3721b1eccc597ea0bc6209ffe9eac6a15c0874838c83e675365a391c0e7658601d5f655f814ff56050002a231ab2d82085034f5aa10d149c1e2fbf1736313aa7c9949c3c0e0e30e7bef3ce0497eaf4fe94a96aaebf05c96c12f5",
  "dc3": "72550510c0bb230a12b46e73efb92df75267e1c0832a6bc231cf51995fcd0cad87aa85d8d73beb3021be2bac31899a3d8d03f7d3211a26cf751929fe163c1abe1a896c4becb0e8bdfb7aab1abbae4a01dac3b5deea57a0a227f198bef0219b7d23cbb0985cc9a84d70fc680e8702d4368e9dd1e44e5c5bd2e8d57783872324a2b9d4bbacc25a3aae2a4abad0e4edf823918df932f095ea042d068aff007ec7c070ad18e45bb0550d3aafe4b3c95f8849d664e5c5746afdbfd4cd08be454cd75ebc1a4675009dc3dc9b388ddc251232ecb7d6b6350c8503e6fd04b6551ddcd1439f556c50dba5ad9f3e0e926fc88eca962b434072d4212ea776e6c4becb1a116c",
  "dcId": 2,
  "banned": false,
  "dateUpdated": {
    "$date": "2025-04-12T13:06:21.785Z"
  },
  "firstName": "Petr",
  "lastName": "Nikitin",
  "messageCount": 266,
  "username": "nikitin_prominent",
  "id": "7211774862",
  "remainingTime": {
    "$date": "2025-04-09T12:32:03.187Z"
  },
  "spamInitDate": null,
  "historySpamBlocks": [
    {
      "spamBlockDate": {
        "$date": "2024-12-27T09:53:00.000Z"
      },
      "spamBlockDays": 27
    },
    {
      "spamBlockDate": {
        "$date": "2024-12-28T12:39:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-01-15T12:46:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-01-29T15:05:00.000Z"
      },
      "spamBlockDays": 7
    },
    {
      "spamBlockDate": {
        "$date": "2025-01-25T08:48:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-01-29T11:41:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-01-31T05:29:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-03T13:40:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-11T15:31:00.000Z"
      },
      "spamBlockDays": 7
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-14T05:54:00.000Z"
      },
      "spamBlockDays": 30
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-19T13:17:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-22T06:25:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-28T09:33:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-11T19:14:00.000Z"
      },
      "spamBlockDays": 7
    },
    {
      "spamBlockDate": {
        "$date": "2025-04-11T05:53:00.000Z"
      },
      "spamBlockDays": 30
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-19T12:28:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-20T10:35:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-22T13:18:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-25T14:24:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-29T12:09:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-28T12:45:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-04-07T09:01:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-04-08T17:55:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-04-12T10:40:00.000Z"
      },
      "spamBlockDays": 3
    }
  ],
  "nextApiId": 2496,
  "twoFa": false,
  "twoFaDate": {
    "$date": "2025-04-10T10:02:24.756Z"
  },
  "automaticCheckDate": {
    "$date": "2025-04-12T13:06:21.785Z"
  },
  "lazyCheckDate": {
    "$date": "2025-04-12T10:56:49.818Z"
  }
},
{
  "_id": {
    "$oid": "66dee20ef856541e1b71c8ba"
  },
  "accountId": "1722771370-support-500-last-9-sep",
  "dc1": "92210fcabd805eb5ee9844abcdcf55b4c4bf0781629285df0898cd71688dc01b61179f45ea9e87d93e931f4dcc0f3fcd21334e91f94b31e26828ce3fb263de411e1e671ada421444950eeb48e39814acf8f6f0943eeaa050a316a75bb681097075c3cf5b450f59d8ef369521d97bfe395cce5e7cc00775262a19d9122fccf647e3949ba89c2ab7ec46f35e2393b9a3234c5db142aa1960f9c48b595c5e115dbe8d61ad605813c232be648568c077e679a5cb9be9069c216ff513053f356a422e8fd0a95f81e1f51b7c1cd51045ba4d57191141a8174e3d218acfab50433f8cfc21dd0d3f49f0cb5b8f304f8cacaf3d783f092c038367bf5f93d51bcacd9831e2",
  "dc2": "6eb1f9b7f6a90437aa2a3036dd8f941cd7dad060bbcad4d4ee120fa89b73573d841ffaec20f8eb79ae218c6ea4b981ba6ade1f0e60689fe1ddb14b8b5d44b3055f9e52a511f153934e607c45b87b16d7eace560886fcc4c30f6e1244d48afb0c4f62cdcbb72e0f1cb7409749b448e9a48415c7305ac40fdb3317e2ff56a14141b7a4f9f09377e0699b93b9a5d3784004045055cda9e21d5f600921eaae3b376650e0bef7da51f69483add8999dddded5f3d9861e64449aba2cea1a3e597587266bc64db02564d0f67c2985bf03c240184e00a19d7f0116435cca53692262b6978cf25bab920385280b84633110021ad984327a5a68198cc97ed0d4fa332a7ee7",
  "dcId": 2,
  "banned": false,
  "dateUpdated": {
    "$date": "2025-04-12T12:27:54.628Z"
  },
  "firstName": "Maksim",
  "lastName": "Andreev",
  "messageCount": 223,
  "username": "andreev_efficient",
  "id": "7205868867",
  "remainingTime": {
    "$date": "2025-04-11T16:48:52.270Z"
  },
  "spamInitDate": null,
  "historySpamBlocks": [
    {
      "spamBlockDate": {
        "$date": "2024-12-02T15:21:00.000Z"
      },
      "spamBlockDays": 2
    },
    {
      "spamBlockDate": {
        "$date": "2025-01-04T06:30:00.000Z"
      },
      "spamBlockDays": 30
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-08T13:29:00.000Z"
      },
      "spamBlockDays": 30
    },
    {
      "spamBlockDate": {
        "$date": "2025-01-20T15:37:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-01-22T13:57:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-01-24T08:30:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-01-29T04:17:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-01-30T07:19:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-02T08:17:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-09T14:43:00.000Z"
      },
      "spamBlockDays": 7
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-04T14:35:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-08T14:37:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-07T05:37:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-10T08:21:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-10T07:11:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-14T07:26:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-22T08:15:00.000Z"
      },
      "spamBlockDays": 7
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-19T14:18:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-24T05:29:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-05T07:02:00.000Z"
      },
      "spamBlockDays": 7
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-01T14:14:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-06T13:34:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-11T08:46:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-11T12:55:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-15T07:04:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-28T05:52:00.000Z"
      },
      "spamBlockDays": 7
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-25T09:51:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-29T12:15:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-04-01T08:54:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-04-03T11:42:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-04-11T10:05:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-04-11T14:44:00.000Z"
      },
      "spamBlockDays": 1
    }
  ],
  "nextApiId": 2496,
  "twoFa": false,
  "twoFaDate": {
    "$date": "2025-04-10T12:58:14.447Z"
  },
  "automaticCheckDate": {
    "$date": "2025-04-12T12:27:54.628Z"
  },
  "lazyCheckDate": {
    "$date": "2025-04-12T11:38:40.511Z"
  }
},
{
  "_id": {
    "$oid": "66dee20ef856541e1b71c8c3"
  },
  "accountId": "1722772258-support-500-last-9-sep",
  "dc1": "87b1f30cd717186f7a8db14ddea4079dfb677f91afecf80896886516be733e812b532fd542b68a30b2286fb502acd90be3b21e6f3645265c6c283475481790a40a1cd841978b6a7c78fbe61e5b60691bf3ddd293839a237e250db4b6ca0e6043b1402b738408080795b196bca0f1ca25cbb17492290f09208b6b8ef68b4bfecb150ba7a0e1bf487c637e0afbfe6d23c8056e6144cba9000701cdec8268790a974eec367ab113a513e234c6786187b2f358412d242cf835ae30f0a206b8dac55e5ceaebd9b231fef7f7aabea9e6462a54cfb4d7315eabca9fbca3641c0bdf2ca78b587863b0f4efd0eb60ae965ea526796cb3bc498f43c6588ba7b2ad9531a797",
  "dc2": "c01c23e62d9d9362c95f18f53a890fe5dac37589488960dcb2dde27577267341240946685937f0c7319f4c0cfa91b866f2b1bfd1c42b9ec113f69fbfdf2a607b240dd8737a1bba385458c0d151a714094277241cb0ee7cdc51fafcc9da45d857b2bae573a99ce4711f2f8250dd9ecc8082dc321ed33e64d975d7c9a421d3237fa294dab621cb792dfd85af49f29789391dc763f1fe8910dd7d1569736582741bfdce2169fd5209dd29cf3c81a2176f96062343106bb060c491e73cb60fcdb95e45bafcfd76f68d4e8ad112e402d2d9cf452ffecf8a74136e22f183ffaa71fe672f812c6dca7b00e9800fe86963861d43a6165e5a5fafa01e7e546a3c92d4bd29",
  "dcId": 2,
  "banned": false,
  "dateUpdated": {
    "$date": "2025-04-12T13:03:20.965Z"
  },
  "firstName": "Petr",
  "lastName": "Savin",
  "messageCount": 242,
  "username": "savin_missing",
  "id": "7021786088",
  "remainingTime": {
    "$date": "2025-04-11T11:27:00.506Z"
  },
  "spamInitDate": null,
  "historySpamBlocks": [
    {
      "spamBlockDate": {
        "$date": "2024-12-20T11:37:00.000Z"
      },
      "spamBlockDays": 20
    },
    {
      "spamBlockDate": {
        "$date": "2025-01-22T11:15:00.000Z"
      },
      "spamBlockDays": 30
    },
    {
      "spamBlockDate": {
        "$date": "2025-01-20T10:40:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-01-21T05:17:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-01-22T14:30:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-01-28T07:21:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-01-30T08:22:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-01-30T10:51:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-02T11:32:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-12T11:53:00.000Z"
      },
      "spamBlockDays": 7
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-13T15:09:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-17T07:49:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-25T05:50:00.000Z"
      },
      "spamBlockDays": 7
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-21T07:53:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-28T08:10:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-07T19:39:00.000Z"
      },
      "spamBlockDays": 7
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-06T11:41:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-07T09:44:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-10T11:22:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-19T08:34:00.000Z"
      },
      "spamBlockDays": 7
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-16T05:29:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-20T08:32:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-28T06:30:00.000Z"
      },
      "spamBlockDays": 7
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-28T14:05:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-04-01T10:21:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-04-05T21:11:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-04-12T10:19:00.000Z"
      },
      "spamBlockDays": 1
    }
  ],
  "nextApiId": 2496,
  "twoFa": false,
  "twoFaDate": {
    "$date": "2025-04-10T11:29:22.899Z"
  },
  "automaticCheckDate": {
    "$date": "2025-04-12T13:03:20.965Z"
  },
  "lazyCheckDate": {
    "$date": "2025-04-12T10:14:23.348Z"
  }
},
{
  "_id": {
    "$oid": "66dee20ff856541e1b71c8cb"
  },
  "accountId": "1722772284-support-500-last-9-sep",
  "dc1": "1bdae6a2cd8a39f28a4ec2dfe5612498ddd7b0d996201aa209e9a9952d6cd4bf59f171f65201942ce54540d0d4d457d6677d64129ce884ec187cbe2dbfdaeabada4660c462aff4c817d318a26bb3308e5a3c6b4068d54a47ef1c08ca03ec1ad156fb8e16585bc98e30a761c11ede3426d010739ff7889b3cbff97778933213dcef8b3dd3956c996d05a290bb8493e5d7f8e4da73e95b92f17f103c38eabd75247f32439b7b4114a80ff577cd6ec2784c459d6fcadf8ce762108a619ae5a485aaf181d4859e175ee00b2658faef32deb89096972e7545e9d4e8c5b523a62588047a3e1d90ba66cc79c52d5008edfd7fa531b0c2e9fc06ace41be0e77d36a05146",
  "dc2": "602ec5cce304d90d7381ff7adf3857ba3f9b29ca8273f05af93d5a4b738fd368bef03ec2852d22ed98823a695b94c06c384d79479aa34739c34c5831e8d80a627febb06fff26a6ad68d8b27734dd2887c5bf96c52d4df089d5c07957b3db851c2111bd8d990602399f198a9fd4b88176597d9baaa3c5c15ee6713b2483b95ec287ae3c50f209b23cdb1ec726b7b492b1d67f4657556fca59f2a352d223d1e8d17779ccd696340b8d1d4097c0683d30a09c6ab43c0966691902368597778aa3a2a6a4ca87c4b6d066c2ee92b7c371cdc38996c20574754dc09690e80807a48f96f8ae0ce29cbc9cd1d3fc7e4b688c09dc6d829490e76c150c350f23942893a151",
  "dcId": 2,
  "banned": false,
  "dateUpdated": {
    "$date": "2025-04-12T12:15:57.377Z"
  },
  "firstName": "Pavel",
  "lastName": "Fedorov",
  "messageCount": 469,
  "username": "fedorov_prickly",
  "id": "6639370717",
  "remainingTime": {
    "$date": "2025-04-09T12:31:35.093Z"
  },
  "spamInitDate": null,
  "historySpamBlocks": [
    {
      "spamBlockDate": {
        "$date": "2024-12-14T14:14:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-01-24T17:30:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-03T10:34:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-07T19:38:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-01T15:47:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-10T16:24:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-04-12T10:58:00.000Z"
      },
      "spamBlockDays": 3
    }
  ],
  "nextApiId": 2496,
  "twoFa": false,
  "twoFaDate": {
    "$date": "2025-04-10T12:58:12.750Z"
  },
  "automaticCheckDate": {
    "$date": "2025-04-12T12:15:57.377Z"
  },
  "lazyCheckDate": {
    "$date": "2025-04-12T10:14:28.815Z"
  }
},
{
  "_id": {
    "$oid": "66dee210f856541e1b71c8eb"
  },
  "accountId": "1722776049-support-500-last-9-sep",
  "dc1": "5c00760c33d6e44d1ffbf436911d0f904049758af0a435de08db90da0b0a73507c728886e4e5127f172bf30e5015ae592f9c3391494dfc05985deb786f52baa22906505c6b614e38b668e1ca4dc9488fd65f270bc48dc548017800f79494f6cf7c378c25bfdd355a747cb9da15ea11ff5c95a1dd171621f16a6de29157d9cf017c85dead9c3ab9dfea73dfb59162b4f989f09fe13f7309d8af37b6ccd7ba8cf071e10d0875d4479588d3c691c97855b4853254655c1eb3e9c4e83b0ed5e0ad72ad8f9a62913cedd3adfd92650578ba858716709e97ca521be6458a231df977c27bf5354733f12d61b05087a9d89dce11fe2a674ba4a784250ce1b268c787d71d",
  "dc2": "a3cf561d15bd81934ff7bec4cdcb3d9fe48f150b767c7c96315956429fbc63b5e9e95a0184981bbcd9049741d07f5b3c6350b5497ac103e161f44646e1423d3c6701b73fa2ae4f33971a5e2885415ba4cd0d188dee96eae933b3763473b343cd3f5865086aeeffc80fcef1d7a63c1f206ea0e86fcfe66d3399327f99de6507c031425c01a48dc9ce10146a43450f00e234f4da2721c80de2a81d20777d70f24a7a43ad233c552ba4ca71a415d1720b21a910b10b592dff31bb96d2898448da0331d48f688a0bbb640c263ad54584bc4595ef5a06420a93f910ce24ec467e046663108e3e21ccd97b75ac04adaedc5ea83b6dda8c53fd0a4dffe9ffa8d16c423c",
  "dc3": "ad2fab74ce5ff3998d9927724f3af0def645a4111e40455b24b079a33c79617f20858988945f18a19e5e06715fc4900384bbc001f074bce1d979519ab35475b9da687008c6f824c60e057ccc0ddd2e61d194258d8608e645dd48707181810dd9b574e11481bb7c02316efbdd1e52b2cd8680307a6c25bbba17a259b55305341cb62dc28ebd1d4cc6cdd700ad1b5cba76c73d2495cb05996967f04034f01fa84dea4fe8ba0d7ee0329cb286e1ecc3272eae46218425114fa5a9f4fb38d438f55f30655d97aefa32cc12edda30b8e8a37327f52910c28159e3259438209a894ed8bb5b009e6bb61131501f0a4b46a88bc8fc638339f7465455786c1f6694f09df0",
  "dcId": 2,
  "banned": false,
  "dateUpdated": {
    "$date": "2025-04-12T12:28:58.573Z"
  },
  "firstName": "Alexey",
  "lastName": "Karpov",
  "messageCount": 510,
  "username": "karpov_marine",
  "id": "7091278204",
  "remainingTime": {
    "$date": "2025-04-11T14:43:27.367Z"
  },
  "spamInitDate": null,
  "historySpamBlocks": [
    {
      "spamBlockDate": {
        "$date": "2024-12-16T10:49:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2024-12-17T04:32:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2024-12-23T06:08:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2024-12-25T15:35:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-01-13T13:16:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-01-30T10:06:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-09T13:18:00.000Z"
      },
      "spamBlockDays": 7
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-04T07:37:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-13T18:41:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-04-03T14:20:00.000Z"
      },
      "spamBlockDays": 1
    }
  ],
  "nextApiId": 2496,
  "twoFa": false,
  "twoFaDate": {
    "$date": "2025-04-10T12:58:12.767Z"
  },
  "automaticCheckDate": {
    "$date": "2025-04-12T12:28:58.573Z"
  },
  "lazyCheckDate": {
    "$date": "2025-04-12T11:47:47.077Z"
  }
},
{
  "_id": {
    "$oid": "66dee210f856541e1b71c8f3"
  },
  "accountId": "1722776106-support-500-last-9-sep",
  "dc1": "0598730c95eeb13f870d518bf7c29f0221e7b9db01869f36bf36593751ab4dc263fec1d6e9ee5a2b6e5f3b9c5910631067330c79abba14534c908f3239ebe6d66a0aa57494b08485989e3aac65a1c5aea5aa94476df248c1e990d1ef8e162e089a7eb44061a7bbb4627da56c70f74492fbebe1b627c5ddafb7d516b18027c25248532782f2553ec9b290c9d903e0698a9f8a3e0a4d2d54c60c503cf29db1b29dc73d811bd6cea6804091908964ef97de93accc64e61fd523e8bb9110a2a1b3568e4005ae4ba8174ef893d47450a7b6b86da6512d1a1b5129289bc5076e3c5c9fff8917f38c93e9965be82f8bf0cb6c539135d6f335098050b1073423e6a567c2",
  "dc2": "403e976803d16dc9167c6059622c2091e28bf6fb5c499fdb69b9137bebfd4784e32f06e287464b022247479332c0c56bfb96e9a5976c1ef783c0a86d9cf3c761af0f5fd29f3b86c6a06507ee386572850e38fd0213c349d395a562df9a19a5f4dbfdaa1961b481d7e351ce151919acd620697ada6a60d7911e5fa7bbbcfa5fcb8419849d735f2e1cfffbc1ffed62161a18aaaebdb4cc880951eef4687563eb4d820700a749bcf1738a3feecd9efd2030247246ca0f791455927b0d5460318430ed86ed26cee58bb89a5300225871708be8d4a7016af7149e89501df0318cdd769259445efa47b0160f4e4f2c8465a5080842ced679c56b74ec2e548e96654f89",
  "dc3": "ba181e5d7b90b1a41d935cb3984f97288b8a2169609cdf039898d207852124959ccdf20f1bbc2a333eeb5fc9525a22e0fca21d6d958df8a01b9517d4530db8c6b7a01ddece2dd80e125226b9f8c68a9bdf28c1d9c5472388fc7aabb52b27b178d0d4c017e3de259b2bf371cf0c0ffe40b3c15daa7ecfbdab37de959c4f33b8222aa048fe4e3a849626e5c78cd4bb146e9bc5ffe77ec24b38d16af37a8c72cb68e1f9a338e80a0c55147c4814983c6f2e95b6ca26a5c1a0b029d555a1e281a99a449851b275478602210b96529fb9180dda3b8c29143a196827ee0b8661ddf48c9d242a468631154f7ac56173b417bea28e718574ad8e4500b7c4ef1eee15596e",
  "dcId": 2,
  "banned": false,
  "dateUpdated": {
    "$date": "2025-04-12T12:37:00.869Z"
  },
  "firstName": "Mikhail",
  "lastName": "Romanov",
  "messageCount": 310,
  "username": "romanov_successive",
  "id": "7386828752",
  "remainingTime": {
    "$date": "2025-04-11T12:05:36.292Z"
  },
  "spamInitDate": null,
  "historySpamBlocks": [
    {
      "spamBlockDate": {
        "$date": "2024-12-22T06:08:00.000Z"
      },
      "spamBlockDays": 21
    },
    {
      "spamBlockDate": {
        "$date": "2025-01-24T12:18:00.000Z"
      },
      "spamBlockDays": 30
    },
    {
      "spamBlockDate": {
        "$date": "2025-01-24T12:02:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-01-31T09:37:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-01-30T14:24:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-07T08:05:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-05T12:14:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-09T13:08:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-11T12:18:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-12T09:36:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-23T05:40:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-21T11:18:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-24T14:22:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-03T15:02:00.000Z"
      },
      "spamBlockDays": 7
    },
    {
      "spamBlockDate": {
        "$date": "2025-04-04T12:37:00.000Z"
      },
      "spamBlockDays": 30
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-10T15:25:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-18T06:36:00.000Z"
      },
      "spamBlockDays": 7
    },
    {
      "spamBlockDate": {
        "$date": "2025-04-17T17:24:00.000Z"
      },
      "spamBlockDays": 30
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-24T12:15:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-28T05:07:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-28T13:27:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-04-02T05:22:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-04-07T09:00:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-04-09T18:44:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-04-14T10:11:00.000Z"
      },
      "spamBlockDays": 3
    }
  ],
  "nextApiId": 2496,
  "twoFa": false,
  "twoFaDate": {
    "$date": "2025-04-10T12:58:14.436Z"
  },
  "automaticCheckDate": {
    "$date": "2025-04-12T12:37:00.869Z"
  },
  "lazyCheckDate": {
    "$date": "2025-04-12T10:07:10.041Z"
  }
},
{
  "_id": {
    "$oid": "66dee210f856541e1b71c8fd"
  },
  "accountId": "1722777109-support-500-last-9-sep",
  "dc1": "9f12be6eb39ef4b6f23a5aeb4083b49f7f190f6d0967ec49f784290df37692311a792ee0c652f57fd91a088c4e5e974a9090a8018160e91610aeeec27eb87c3d7ccdd4722629905388cfc7e20e33fa7dc31251ad9df1f679e9baeaf3a55ebf3f41a7ae70544245b1424a58384c9ef2e4d4065761bbb6c231e76cb2446f56845b2f4d5c38cc79fee361a95360d08f5306f10b803baff4b58e045a50667f067d697b1112172ccdacd132fe9e8f0cb64a0768750fa8764b9f508b9a03d3f56e12455ccd3478c4ade30bf4e65e9e4a0a5a3ed50a167f8a0c6f837323b7e04ff57cc716f2a8051af674fd9baf6055aa7617bb8dc1c209c1f7c6b3db8282b417720a3e",
  "dc2": "0b84c3200eb9bd6f01b2b0ffe07d3b696297f50a6c8ce7314cdbefe38666cf12990477edec8fcf8b75ae98f42124816a9fcbc839f01d74b92c43c2c0d535b305671c487bac86370fad59610132d29c780fb54ae147a7a07a0cb54e0a10d1f4c5a6badebd6d99623f68933c41d1c399e1c2ca176793080cc7707c2bd0b43f04a1a49f288536ece9f52693b87e8ae59f9ff43304c2653211569eb2f57bc83dd5a84885f71ad8bf73e2557b5a2ec7fc2f593f3220fdc6918761e565f71069d2cd9ffece4a76d51395e2c0d407457abcd5b6ec12cf93b8f151c0e56817815bd2be2eb2f3c18e83a4ad500a03eec21dd5cb805fc66ab42d804b17003db3c46ddb9143",
  "dc3": "94ad889c2b0dee6fd5dca4a032e3fc233916467fac2bc7ddecd0a1160e74c865054c7a76847f5d85c5deec61c020e65c882a21232a2c4b33e730be545db5e3bd3eb5190438cf77e25f3c046db148e62141951b3a72983d57ab87720bc91dc527ab7a046efa4c0384335a5f74d1a9eb9837790da3f3f5f85ae519fdaf6da799e2b5dcf5faef63e83ee367802915693da6ed6e5c551357ee63ca76856e9dca9e1c78b515bf24b42b30f6b117a927c022477b2b9fc6c3aee26f2d4f0f1d10300dab8c6b43464ee1d28bfd774f838ee9cc34d778fe3d13fd8a09281fe0b93effd997e33121862f27d92e5a9a164d3a036e1eb918900ddf488e988ef00360a360809a",
  "dcId": 2,
  "banned": false,
  "dateUpdated": {
    "$date": "2025-04-12T12:37:58.887Z"
  },
  "firstName": "Timofey",
  "lastName": "Volkov",
  "messageCount": 401,
  "username": "volkov_defiant",
  "id": "7425673811",
  "remainingTime": {
    "$date": "2025-04-11T15:19:14.092Z"
  },
  "spamInitDate": null,
  "historySpamBlocks": [
    {
      "spamBlockDate": {
        "$date": "2024-12-01T09:54:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2024-12-19T14:42:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2024-12-23T10:19:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2024-12-31T11:53:00.000Z"
      },
      "spamBlockDays": 7
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-08T09:55:00.000Z"
      },
      "spamBlockDays": 30
    },
    {
      "spamBlockDate": {
        "$date": "2025-01-25T05:36:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-01-29T12:59:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-06T11:19:00.000Z"
      },
      "spamBlockDays": 7
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-03T12:03:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-07T11:54:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-07T13:27:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-13T14:12:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-26T08:52:00.000Z"
      },
      "spamBlockDays": 7
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-22T06:51:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-28T15:57:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-10T10:17:00.000Z"
      },
      "spamBlockDays": 7
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-06T12:09:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-11T09:37:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-10T12:03:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-14T15:04:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-28T11:50:00.000Z"
      },
      "spamBlockDays": 7
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-26T18:52:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-31T13:22:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-04-09T05:22:00.000Z"
      },
      "spamBlockDays": 7
    },
    {
      "spamBlockDate": {
        "$date": "2025-04-08T13:23:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-04-13T09:45:00.000Z"
      },
      "spamBlockDays": 3
    }
  ],
  "nextApiId": 2496,
  "twoFa": false,
  "twoFaDate": {
    "$date": "2025-04-10T12:57:57.928Z"
  },
  "automaticCheckDate": {
    "$date": "2025-04-12T12:37:58.887Z"
  },
  "lazyCheckDate": {
    "$date": "2025-04-12T10:14:29.642Z"
  }
},
{
  "_id": {
    "$oid": "66dee211f856541e1b71c8ff"
  },
  "accountId": "1722777138-support-500-last-9-sep",
  "dc1": "04970e44a2b5ef83e940c2591f7ff3e3ed3d981fea21e4bcdf2159c99cc49b25f932be1c66b2b06152539d0b6c9a969a828b87c435b8be2ae5a65af03e0a1d108f56b61f711d3ea1851ccaf1294b815bc5aee459b19b7fe904b0cc421786cc54ec614abd3d2dde9e092d195f85cf23a1e36df1bfc94784ab563884f8cf9bb8a47928ce0d99a4d6b34933fe490c988b163cf7f32d42135802b1c8dfc8e91e479697f3da3a6ad4a856848493d65d4cc7df9cd7c847c9e75ebb3e7cd05b11040168f363dd822ec8516a3e9c1c47faa79d66184a2bbc090ee791cb050e1315232b16c011ea5dc85245f0e8acaf11e387f30d09116383a1905b0053ecd417d3564191",
  "dc2": "18430a70b8ac3de7f8b0a9201f630bde06bdb2219f69daa36daae454082bd8136e537f7d3ef12c8d55a1fafa090840d7fcc1f45aff376462ab0173db477a456d97b90e0c0061990a353d46ac8ddaaa4c629d00f25a36e1c049f2c6632ee498d39b6fcc81fb1a0e90f0b00a4d8b2b68a82f4810d51f977d781ba26e7843c8ec3279a351372264bb1efcfba19e206d6cde3070db1908a6da23f05dff8011db3fc6b8804e9b58d95a740b01e16940d16e120b46db378eb406dac35b68353cb4249648dc9aadcd7452ee4d5aee718994145420eda53f43ef7485530a880ea0c3c93668f19df8c0c15a239cf453e3aec089642b666222abac52a6a72b19fbd3246c67",
  "dc3": "7096185a2e9c650e6e5788668a9a6a9fb540d134e875e9334aa648f10e4d7f269f71643789a3de4525bb1a46d6d4e44f0230e8fe4ec615a6c883cb3cc911979b8587d2296c4b1d942bb0b3fb3ebee4deabb19950ba4bed959ef926a590844a7896a7815eadeb97aa042bf691e6ca3cbcd98213970b81f957abe322da00548f07b216f878cb7de738321730a2851e0eb6accb8b6d22c68d0e286b2e9b9d8eaa180905830a6fbb99ba43430e99e438fc9fadaf180df69a0bba9c737c1465f5c7a516c56e61ed89e5ef8cb4dc0f03d2253904bd6602b6b090331202584af99be49f6ad03b83bf52b3271cd34a0097bb376da5182a6f23ad6d023ccf0b097a8e4c91",
  "dcId": 2,
  "banned": false,
  "dateUpdated": {
    "$date": "2025-04-12T12:17:47.264Z"
  },
  "firstName": "Arthur",
  "lastName": "Zhdanov",
  "messageCount": 378,
  "username": "zhdanov_noble",
  "id": "7425389639",
  "remainingTime": {
    "$date": "2025-04-11T09:07:24.233Z"
  },
  "spamInitDate": null,
  "historySpamBlocks": [
    {
      "spamBlockDate": {
        "$date": "2024-12-05T05:20:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2024-12-21T07:37:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2024-12-29T20:43:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-01-24T11:34:00.000Z"
      },
      "spamBlockDays": 7
    },
    {
      "spamBlockDate": {
        "$date": "2025-01-21T12:36:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-01-25T14:44:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-03T12:14:00.000Z"
      },
      "spamBlockDays": 7
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-07T05:34:00.000Z"
      },
      "spamBlockDays": 30
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-19T06:04:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-22T07:07:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-20T11:54:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-23T12:25:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-27T18:11:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-03T12:29:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-10T12:55:00.000Z"
      },
      "spamBlockDays": 7
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-07T09:28:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-11T08:25:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-19T10:46:00.000Z"
      },
      "spamBlockDays": 7
    },
    {
      "spamBlockDate": {
        "$date": "2025-04-18T14:21:00.000Z"
      },
      "spamBlockDays": 30
    },
    {
      "spamBlockDate": {
        "$date": "2025-04-12T07:08:00.000Z"
      },
      "spamBlockDays": 1
    }
  ],
  "nextApiId": 2496,
  "twoFa": false,
  "twoFaDate": {
    "$date": "2025-04-10T12:17:56.662Z"
  },
  "automaticCheckDate": {
    "$date": "2025-04-12T12:17:47.264Z"
  },
  "lazyCheckDate": {
    "$date": "2025-04-12T11:00:01.498Z"
  }
},
{
  "_id": {
    "$oid": "66dee212f856541e1b71c929"
  },
  "accountId": "1722779712-support-500-last-9-sep",
  "dc1": "1e9673da8df1c63391a4a697b874fb48e3099a5fae22f38562b13c8093b755412e07de49fd9f033bc46d8081e6cd43dbbfc32669ef3bedf3c1267204bba58a96d1c3a7131ae40ea9f22e64402ee1679602fc292a416ef896a30c85242192c07ba6f32b9f47d74a4a57f67620fee6886856ac5b0cf2ac0d4f7f1a9bdcbb53158d9c6258348a513b7d3406366fb1ab5e4dd83e158ebcc5bb370db3b0c457232b617fa3a274fb291bae243a54b7b6c1159207d6d7ba326180bbd04fc3b69e528d0879cf64a6ade29198424abbbf3c4f38730148d917b82a9592969078a400800fadb67107d4b6279705a897ce48a80a0aa894d2a205beba8c91bab12671263161c6",
  "dc2": "54b0969d474a7964eec45b57ab6596c118ef6302359ff9638e153aec105de7ae99754472f0be2a486c057d9c86a92bdd1a09809290e2dcfa1c192dcaae0246de0023f86ee43cb53dac25c78c7201637de82bf2f243e16c6084ae8810393426387e2bd9cef9cfa00a794c58d7a2cde8f2fb7422824674d81c707df37591f75d935b425af79150293b37d12f7d9aee87c769062f0c021af0b6900a330972e5de9b62e9c2ef14835465e260a828e76c1cde488dd2b11e47ce581c2d5d0e0169f978778059685fcb5d247377d893ea135384cc7c94a4c2fd916769618aed46554f0dec53fb561edd8e419cab2c70868c2d0b36df7cf0e8875276cd3add3ff96f4bf4",
  "dcId": 2,
  "banned": false,
  "dateUpdated": {
    "$date": "2025-04-12T12:34:56.847Z"
  },
  "firstName": "Boris",
  "lastName": "Ignatov",
  "messageCount": 457,
  "username": "ignatov_bitter",
  "id": "7132231540",
  "remainingTime": {
    "$date": "2025-04-11T11:23:13.340Z"
  },
  "spamInitDate": null,
  "historySpamBlocks": [
    {
      "spamBlockDate": {
        "$date": "2024-12-06T08:04:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2024-12-17T11:35:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-01-27T05:38:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-04T17:05:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-06T08:21:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-15T11:36:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-21T06:13:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-02T18:38:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-13T14:00:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-16T14:05:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-19T10:01:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-24T11:07:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-04-01T09:39:00.000Z"
      },
      "spamBlockDays": 7
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-28T15:54:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-04-01T13:10:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-04-03T14:39:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-04-11T05:05:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-04-10T10:48:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-04-13T11:06:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-04-12T09:32:00.000Z"
      },
      "spamBlockDays": 1
    }
  ],
  "nextApiId": 2496,
  "twoFa": false,
  "twoFaDate": {
    "$date": "2025-04-10T14:32:12.818Z"
  },
  "automaticCheckDate": {
    "$date": "2025-04-12T12:34:56.847Z"
  },
  "lazyCheckDate": {
    "$date": "2025-04-12T10:59:04.409Z"
  }
},
{
  "_id": {
    "$oid": "66dee212f856541e1b71c92d"
  },
  "accountId": "1722779735-support-500-last-9-sep",
  "dc1": "a806af12889f26908371e06b596a5c57b568003230188a4e02f0f9ba09ff0fdd8eebfd85ab028af94fa77d95007038eb5ddf6052a0f7679d322426372878e8773eeaab85fa930e8d9ec44cbea3ddf13f4bec1596b469317678e927df5d753c34e39ee276e5d872f3e7035d1a7b99090bd27e7e640e2cba587e6541586e4bdf8510beaa57a478ad48ec2a71e44721332c0f1296623e7fc9e308b7838c9e4acd171a7d356a53bec39a77bd2d2cf85e6edf7f112a7c94d9faccca10e998c910d31ebbd6cc04960aa67fed5f866aad6515284ac5e46746cf1d9231fd30e12f438938c102be29ed53d7cc50b7fad35765f093722856f318daadae9aefa03c1320ebdb",
  "dc2": "643292f8e7fdada709b645948221ed0488d8d875b15fc25ea37bb3c863f200b82b427db844d06c6476daccb7d6d9ca0fd373cbb5059b1c10d4deeaeaac207d45321d948737eee17d974f1c8e6a3db55c2a06628083407c05873a4346cc73cce18ea0c535177a1ae0988d64b2e7a9ae47a0201025a7cc8ddf3063978d7806f651158eaf3dd88a2d1a591647604e2341db90df7c35a61fb41491ce21b63b55d17d1d2549205f79cf846765f0e094e2da3b428afd419ad08c38db7e2835353e39edf46c1374012e5a552886b314cb430aa2f55ffef82e2af948eecab69517c6500f45bbd42d6187f777669aaffc2896c0fbfffb97e9b9a5632ff911afdda38588f0",
  "dc3": "9c4d2a928e4409bfe3728dc5f0eb39735106fd827013bfed6dde939f465cfb7fdb1604cce75e4f6d8ca147a9aac82d04fb575c2c9e6fe5c63b9d767b6753847f0c2e0dde891256f49c2b51ffa40b19296141f0c257fda158e9cfec7cf8d33b58b7fee930cdab26eb5d8d6955f9cf79414ca793757c2a7b46a2bc3c45e3d60bbde6c34c604ed6ed1160ea4e00d011ba633180a3206667abc67da44f9bc9d5154ac44e7c74db0249ff51584bcacfcc8a8460c97dd8fc05ff9e3ec7029af18d8faed39457f59d2ecdd27b1ddb20a2f716a9ed15d27bf58f251ef77d25e3716b3e93b75d822151335ed00c0175f9994ddb0a864cc7a95de104bff1598f36ba70ad80",
  "dc4": "13bf7a3b748d96bf514a22905ec44fee2fd6e142c0b34f414f05f9f13ae45bbef47d435828e55bb0662d8098fdd59d4cfacb8f56a7281fe5020cd19b7d200cccaf0ad8438b65a49f607b485a9d45e642ccd5450faaaae4ea539f834c1f53b920a6bd40d000ac7bead13e86222fac9bdaed90fb983d68b36f44f78df73fe43d1fd278dcb61ea3345cd05ed797b823b6962ca4eb9d5b58816a69652ac7e21197a56a20e079d882269d757db49ae54df05a13b85bdc74eded0b4175c404a0193dece3e6c84b34237593f90357a42a617b8beca50a780f5227c74aa1b947cf0c2034fb8c4f4634c97f4fd3e35923f8d1f9ca2510f3a416551962fad188e471596786",
  "dc5": "bf8644491206b4dfea5a08bb706299121d83b8fac8536c27ed19e85f375b962cbea22230e0b871585330f6b745e9a9ad7dc44171d6f6ae87c516a072d1b1a5fdaf479f3a8328bcc58fd6e11b29237167042b953e0a4cba683c88fac748695d767314c11b766bc76528274bdc9249e6efbf3770bee88c89da7bafc9d52749c9e76d54ecaaa483a84b3b30141261c08c95800bdae633875857141e71f86baa7972e41eecbdcbb822c96a6ab72b559f7b6a0681f14be4c1328cb9c3030738c961323702373aafbe9726386f85d1d03fd44ef85d54ecda6683ced4f1e157b994773398070359f7b1f991e02600f5382e48cb59fc07b856fc3e5e3f909261125b4334",
  "dcId": 2,
  "banned": false,
  "dateUpdated": {
    "$date": "2025-04-12T12:57:23.800Z"
  },
  "firstName": "Dmitriy",
  "lastName": "Kiselev",
  "messageCount": 405,
  "username": "kiselev_strong",
  "id": "7372219998",
  "remainingTime": {
    "$date": "2025-04-12T07:03:16.560Z"
  },
  "spamInitDate": null,
  "historySpamBlocks": [
    {
      "spamBlockDate": {
        "$date": "2024-12-06T20:56:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2024-12-23T12:28:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-01-17T10:44:00.000Z"
      },
      "spamBlockDays": 7
    },
    {
      "spamBlockDate": {
        "$date": "2025-01-31T06:43:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-05T11:30:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-09T11:46:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-20T13:42:00.000Z"
      },
      "spamBlockDays": 7
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-19T06:14:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-19T14:33:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-21T07:46:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-28T07:38:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-28T08:59:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-06T12:17:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-15T07:40:00.000Z"
      },
      "spamBlockDays": 7
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-10T12:07:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-14T13:28:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-24T07:02:00.000Z"
      },
      "spamBlockDays": 7
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-22T09:31:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-28T02:05:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-04-04T06:21:00.000Z"
      },
      "spamBlockDays": 7
    },
    {
      "spamBlockDate": {
        "$date": "2025-05-10T10:17:00.000Z"
      },
      "spamBlockDays": 30
    }
  ],
  "nextApiId": 2496,
  "twoFa": false,
  "twoFaDate": {
    "$date": "2025-04-10T11:29:18.866Z"
  },
  "automaticCheckDate": {
    "$date": "2025-04-12T12:57:23.800Z"
  },
  "lazyCheckDate": {
    "$date": "2025-04-12T10:42:59.384Z"
  }
},
{
  "_id": {
    "$oid": "66dee213f856541e1b71c933"
  },
  "accountId": "1722780597-support-500-last-9-sep",
  "dc1": "06962a5f61b3d449b0eed4ad1b6fcdc6f0034292a477fca57aa7f4bbf8fae4d5b0fa7854b58accaeecc8f7bdfab9b8a32faea5776719f2dc8eebcd9b07865738515f0b6010b2a6aef83920e7218ba949cc8d3aee0fc26f1e184c67225e822e428b48f140361a5a7f43e6fb98398607b79df02e1f540fe8edf2f0b292636ff50e8cd5da8a7a69931c8f0a08b4fae04ccb0e90eb2c61147a64fcd0f12cb2af531939aca43e0a66494e036715c8cb385895685518fb2125f2c47cfe2aa33fb5dd4c5093fe61089c018a70c96cec313a45bcda6569984f3cf8c43c02e774414bc4a09537d7eab2dce3df258c6c47edc874a36c56fe20872775cb9fe09e26cdcfbb26",
  "dc2": "5ae0a4893de1b3ddc8c2cf7974a403e5aa185a6604c974ce3b194bfb4b5fcc3a7d9b3f426b3ec28efe4684f4ce7c5f758962202173d9f7cd76e779d075aa1546e8ae7a2107cbeff2e05a71af6c3d2c83938427656cdcea4931fce89d2111e12aec3e056c0ed04f191bc69c498a73c2c2ad8151b7da256c50125182d3e9d8e83d4276a64b40ddd3c1b2516021456ef17083ae8b8c25876192df9c70c7d2f83e0c4469202c5475d8d917097fd38c066c6fbc98e667d9cbcd6b23a70174167c87266cb3ee1d22f30f071707cc5e7d1ded20428b4665c77e466798c265117b901cfe73732a155bb6c58bee6646c1408a5f84aef83ea4dc9f22b9380021df305df51c",
  "dc3": "5c849772e07668512799593dbd5399776eca70b7659ece9a23c6586add777ebdc99dcdb1a70c9afb5606f2fa3adfb29267e4e51f7822d96226a4ff8c2686a9c5fdfc83199f58b4b8d426bc3b39e488046f19de8ad60893060343f590317f8ede9e752f666be7596bd1df81d279a03c9761aa4ff601d65075a8bb08bd820455f31bc5af195eee9c3da8b4f34d276534f8a7229c3d31edc4b25ae637984e9ddad854a4def3dd0457da0547177a3595f6cc12bd28513e4d9b5a75a9e82072a21f4f9b36a0dec49e47aaac2c2465459752d73c51de4b438eda5d5bf6d0c31148cbb52b590cb460589e052819c482722be7496c4a3c3f87be32f268cccc81e44a98d6",
  "dcId": 2,
  "banned": false,
  "dateUpdated": {
    "$date": "2025-04-12T12:31:00.614Z"
  },
  "firstName": "Anton",
  "lastName": "Korolev",
  "messageCount": 441,
  "username": "korolev_mammoth",
  "id": "7451271785",
  "remainingTime": {
    "$date": "2025-04-11T14:50:59.074Z"
  },
  "spamInitDate": null,
  "historySpamBlocks": [
    {
      "spamBlockDate": {
        "$date": "2024-12-02T13:33:00.000Z"
      },
      "spamBlockDays": 2
    },
    {
      "spamBlockDate": {
        "$date": "2024-12-06T12:32:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2024-12-23T08:12:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2024-12-28T09:55:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-10T16:20:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-13T10:38:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-16T13:37:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-14T08:49:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-04-02T14:51:00.000Z"
      },
      "spamBlockDays": 7
    }
  ],
  "nextApiId": 2496,
  "twoFa": false,
  "twoFaDate": {
    "$date": "2025-04-10T10:02:09.206Z"
  },
  "automaticCheckDate": {
    "$date": "2025-04-12T12:31:00.614Z"
  },
  "lazyCheckDate": {
    "$date": "2025-04-12T11:47:40.468Z"
  }
},
{
  "_id": {
    "$oid": "66dee213f856541e1b71c937"
  },
  "accountId": "1722780651-support-500-last-9-sep",
  "dc1": "36cfdedf8a6b3fc119696b05f0263992e01331e82b6a37e58f4f1fddf450a14f70865207beb349180db95fe7a84bf45293b96e81d141fba9f9767028908bc0f98ba771b6ca3ec45b809dc543eb29058501d569a48281c0158c07c11b6efd92750c765f1f5fdb6149d55e9965f148be16e35c5d26fe89a13863fbeca06724ea78ac097ca1b99868a5ddd2cd302b9b17bbddaabbaee960f7c5f35ff9395c29a55625f31a4e3a979f23d793c69766e3856f97b6e838b4f892c290e245a2460f98a92d5af04ce4d343c47b73ce464a030e0f97fdc9979e6fd3901bb79a2b3e06dd08a497794d1463f358bc00bd653b842546667232f0c097f77309a1ac8472800269",
  "dc2": "279e837f9ed5377fc79317a844cc1e9227990d863aeeae52c719f9303b46776b11d7d891ce3885a79358146aeda32f5be5e3946445e8213a98ab770dd06b7c668d9b5feabc79b5a686d7a4e573da73e0bde99f94131999ffbe7b58ba69e36384d78476f7ce1b9ed140186f6b3afafbaac933fa13337bb14a69a5a67fdd429d1e74ed73e9ccd7848f161913b3006bcb4d8f179836d9b979caad854a18f24f303c94850d481126bfc9a78021e3cafb5981837b17b0ee03e61814e5d962086900dc0b8544b3c6bac90695ee1543a8560c9b31138b6376bb9ee37b0590296756802e7600774980c34e52ad1780487c051075a225d09f41030337e18ac41321360bf9",
  "dcId": 2,
  "banned": false,
  "dateUpdated": {
    "$date": "2025-04-12T12:22:00.565Z"
  },
  "firstName": "Boris",
  "lastName": "Novikov",
  "messageCount": 474,
  "username": "novikov_continuing",
  "id": "7277331596",
  "remainingTime": {
    "$date": "2025-04-11T15:24:52.718Z"
  },
  "spamInitDate": null,
  "historySpamBlocks": [
    {
      "spamBlockDate": {
        "$date": "2024-12-05T17:53:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2024-12-16T18:57:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-11T10:41:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-23T07:55:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-04-05T06:41:00.000Z"
      },
      "spamBlockDays": 3
    }
  ],
  "nextApiId": 2496,
  "twoFa": false,
  "twoFaDate": {
    "$date": "2025-04-10T10:02:09.096Z"
  },
  "automaticCheckDate": {
    "$date": "2025-04-12T12:22:00.565Z"
  },
  "lazyCheckDate": {
    "$date": "2025-04-12T10:06:32.304Z"
  }
},
{
  "_id": {
    "$oid": "66dee214f856541e1b71c958"
  },
  "accountId": "1722781965-support-500-last-9-sep",
  "dc1": "60d6b1faaab4b0d2aa4be55ae64cfe1c95c0092bd8a6c4e565665fd41073ede94951239695995abddf734e8ab33cb88f7e81d342a8b0446f887a1e25763f8e6195505910a386a9eaae1fbb7ea90763a465be7ad42394814e18e40d6914b30012b4b24beb4b8fe39442feb88960f7672d832d3c2fbe2c45299d72eec43f31a9603a2a5ca3c4b8a8c35af3be5ce04bd0026d8de6897a93acfe17dad211e3a1c1eb2bc8f25f33ae6e3263077646842ac78ba89fe64dd7fb3bc7e5feda1578bc4cc7ffba2bac31c45ffce0dd434a8136976aa98b6c07b6411dd3192fc56b8dcc590cdcfa9886d4d632f75e1a9cbeeb0a8b15631137e7b5ce4d4e24aa725e544926a9",
  "dc2": "bceee24f6e7def5b70bd0db4f4be83e8323d3b1691167041b5fdb4f18f05a0b30361bf2449b829f4a079d5cdd0bbb56dbbcc5fb73149ea7898e696da2d960015f03951d572980c64d37603f12659269cc1a77ea7906b02ff07d5165bccaa0692c9c60fd076d56717eb915314b7bb52720fe038a70208d173d4b9d89beb857ae101f781a3714f3a6250fdee2b2f582ea3cff3c5fb5467efd5a21ff311ccbd7be0ee31a442bb71611a78b4bd044fd9b5f2d6349beaad0cffc3cd83770fe00d5dd9278f65ec45797644e7f54e242daf204ed4cf6a5d3ca62ad3ec7463f728f1da876abf5d3c5d14095b963d76b223d71e436276ada8a3f305d68cdf70917b7157ea",
  "dcId": 2,
  "banned": false,
  "dateUpdated": {
    "$date": "2025-04-12T13:02:29.813Z"
  },
  "firstName": "Aleksey",
  "lastName": "Demidov",
  "messageCount": 505,
  "username": "demidov_definite",
  "id": "7272265851",
  "remainingTime": {
    "$date": "2025-04-12T07:02:09.550Z"
  },
  "spamInitDate": null,
  "historySpamBlocks": [
    {
      "spamBlockDate": {
        "$date": "2024-12-28T20:20:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-01-13T10:53:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-01-28T07:52:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-03T11:03:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-04T06:20:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-15T05:27:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-23T10:00:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-26T19:40:00.000Z"
      },
      "spamBlockDays": 1
    }
  ],
  "nextApiId": 2496,
  "twoFa": false,
  "twoFaDate": {
    "$date": "2025-04-10T12:58:08.302Z"
  },
  "automaticCheckDate": {
    "$date": "2025-04-12T13:02:29.813Z"
  },
  "lazyCheckDate": {
    "$date": "2025-04-12T09:18:10.538Z"
  }
},
{
  "_id": {
    "$oid": "66dee214f856541e1b71c95d"
  },
  "accountId": "1722781982-support-500-last-9-sep",
  "dc1": "4d276eda54e36999ea07ff9c430c47e3db3219d8a1cd13f78e39e937af14b57d709936d5e605e072d5127416fdcf0aa89571581e49e3a5e81b2f984d6e171107a35c67068b72344630faf5f40bd78041704fc6e6275a3d5a110745c5f18ec2da55b4e8b33ce2eb71963d825360fa99a5fc9118a4b2ffdfe07c248775966d4be9aa58b7a3983ed5cb81709231a0ccc50a98f594fe76d12ee20ee0b759e102cea136c7e817b0e788c7ec72e9523cbb1f93b5e108af6a56f00b83a8d6db8a128e2b9e3dbb4f819ad5a8637205377dfef0306cbbf6b84b0e2a584b477a85c16e2ada59a590ea78aa2cdeb66761194f047196bd8fa61a13690b6ab515207185a5981e",
  "dc2": "b27590892f27ff9579c56c40d47b3d32971b4a6eafc81d2414eac4232e9adacafc21f16098ab81dfff9ed8358e1f1f595223026de04afff9ffb60fa344ded090d711cf0169c3afe7399f394d172196baca757712a60e3300aad4e71b5218612d46c6910780e0f7ce68c6d1a19bbe148fa005aa7178271c15868cc04fd537ecd4a7e4c8c80102e06a57aa5c5883b2d7f45f6cd1977e88eae24791cc5362cf50339cd6b1df9cb5f0f3253c2f223cf4f16622a7d95ac34122f1ff98fc9b75efc390b50b30b069a98d50d69ce69d8c661f11f208e797583c896c0eddaf3108047aeccd6c7046c282e3f555c3dce3a5db171a6d37a8f107b86968f0d62aa3a6962192",
  "dc3": "bc032854dbdebd244173ed202992ba663bbb20a8d2e6a892c83a7dd1c001192bfdd984e2afaafe2fa9d2d7590c0bdd40406fd5c1ad93d0fe087a72b54361c1dc2b3fbfc65ceedde5112ce9133007675f680b403492e60f91125e6db38c390707f0c8895db6b4fc3f92d36aaad02a50cd69ef3fc911f7c1c632b1c92ea0ac5d1ed68d0a8bc1c55a6cdf903929cb4fe562d1156e1b25fca85f5dfa8489eb8b51691e10c10b53ff525527f7baf7b7ae8ac9870c6d63278cdeaa8a68420eccbd54fbb4d33515275c0e1d100c426b29dd54af8d049198be8fe72e3c731ba0c6906c3cd6084ceb511b8f44f6dbbc1c7b807dc1d894c9df3e9f9be57726f9d66260d7cf",
  "dcId": 2,
  "banned": false,
  "dateUpdated": {
    "$date": "2025-04-12T12:15:00.359Z"
  },
  "firstName": "Nikolay",
  "lastName": "Romanov",
  "messageCount": 244,
  "username": "romanov_historic",
  "id": "7317531978",
  "remainingTime": {
    "$date": "2025-04-09T12:37:00.481Z"
  },
  "spamInitDate": null,
  "historySpamBlocks": [
    {
      "spamBlockDate": {
        "$date": "2024-12-18T06:49:00.000Z"
      },
      "spamBlockDays": 17
    },
    {
      "spamBlockDate": {
        "$date": "2025-01-18T08:45:00.000Z"
      },
      "spamBlockDays": 30
    },
    {
      "spamBlockDate": {
        "$date": "2025-01-20T08:34:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-01-23T11:56:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-01-25T12:56:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-01-28T12:04:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-01-31T07:44:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-02T09:18:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-05T14:51:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-13T05:25:00.000Z"
      },
      "spamBlockDays": 7
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-10T14:57:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-15T07:46:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-25T10:50:00.000Z"
      },
      "spamBlockDays": 7
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-21T19:06:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-06T07:47:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-14T10:15:00.000Z"
      },
      "spamBlockDays": 7
    },
    {
      "spamBlockDate": {
        "$date": "2025-04-13T13:17:00.000Z"
      },
      "spamBlockDays": 30
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-22T14:47:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-26T14:04:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-28T15:43:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-04-03T14:04:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-04-12T11:29:00.000Z"
      },
      "spamBlockDays": 3
    }
  ],
  "nextApiId": 2496,
  "twoFa": false,
  "twoFaDate": {
    "$date": "2025-04-10T12:18:01.351Z"
  },
  "automaticCheckDate": {
    "$date": "2025-04-12T12:15:00.358Z"
  },
  "lazyCheckDate": {
    "$date": "2025-04-12T09:59:29.880Z"
  }
},
{
  "_id": {
    "$oid": "66dee214f856541e1b71c960"
  },
  "accountId": "1722781999-support-500-last-9-sep",
  "dc1": "0820b10ca51788fef6f7d118d465adc5fe345a9e5e769d93e535e01a6921caccda257ceadae96ba011ed7425f27641544f928a1fa952615bbbe8891405a5e66e588ea5fe4c5ff85918eabe1e839908956b25c8667f52293973f22c8344cf59f8ddd064b7ee8b4a96386fe685e29851991299b8e3fadc28edbf940c42e9474e0b073d266267556391bdd49daf61f92b5f83df435b8b2a4d12d8818fb6f05e26dcdeef0012a917899d2a7e25141169b675966c537e87719117b2c1951ab16fcddcbaa5c9089c9afb4afe34567708c4cf17d9a14df71a43e4d85b5d35693322fbcbe427802ff30e2ec95d40bdc905cbd9caad88a7cc2f02d3f78893603c8353891d",
  "dc2": "50a2e69088dccc72933879dd6afab5fe4d759509d14f5ab27c5a66cad3c849323754f4de5da1bfb17819a81914f92d4a226544fee73fc4f1dc7018746291b9b4fb8ccf13310f02e8dd7195da2e1b6560e3cd584070ca31305b467b1e3405d20c9e169a114bbad1e1c91d9cb658eec668084427565aad61063dc3445f2d900ad72267600ce7604878d76da209284853c824748d5b787d8512d3fed30aa1626bd78a00ee2789e1c67eb1d1ca5e630e1e4bf7f7ecb6b9144b8d1325493c9b624ccd093140d9de2f74b6a4a1215412289cfdd8959a182bfd7d4898bf5a98d09325cb6f99c8866ac6193d6fc462648119d20290acb4dc62780ba825db833fb06c3416",
  "dcId": 2,
  "banned": false,
  "dateUpdated": {
    "$date": "2025-04-12T12:31:00.416Z"
  },
  "firstName": "Mikhail",
  "lastName": "Simonov",
  "messageCount": 465,
  "username": "simonov_cute",
  "id": "7273832414",
  "remainingTime": {
    "$date": "2025-04-11T16:24:05.392Z"
  },
  "spamInitDate": null,
  "historySpamBlocks": [
    {
      "spamBlockDate": {
        "$date": "2024-12-15T08:05:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2024-12-15T10:53:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-06T06:42:00.000Z"
      },
      "spamBlockDays": 7
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-03T18:02:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-04T05:09:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-08T17:28:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-13T09:43:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-16T15:32:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-21T14:20:00.000Z"
      },
      "spamBlockDays": 3
    }
  ],
  "nextApiId": 2496,
  "twoFa": false,
  "twoFaDate": {
    "$date": "2025-04-10T12:58:02.573Z"
  },
  "automaticCheckDate": {
    "$date": "2025-04-12T12:31:00.416Z"
  },
  "lazyCheckDate": {
    "$date": "2025-04-12T09:18:10.611Z"
  }
},
{
  "_id": {
    "$oid": "66dee215f856541e1b71c97f"
  },
  "accountId": "1722784132-support-500-last-9-sep",
  "dc1": "24bc101979810aeaebc43deac4cd3a32f8279e22d08d007e98ea133a2625c0dcac3f4329264d40630360be6891b581e03b415b03649eac97f32270eb7dd28d87e7cfcd5660b15b5b9ac6930a83cb5b28d5739bb536bc47e8a351ec75e444ea92bc9cfeae1c4a90f09d755c39bbb867df066ced865a3ef65dc054507dff0d7510d08f948b81999f265c26e6e1ce454f146b4dbc45e3616f6bb7794116feb603d06ae7841ed87019acd4059f5428a55cf79f5bf8f9afcf477ef782b142398905d0d9ed59fa62ebcf862943674541ca10e2c2dc53aef3949373a1705b02503da3aeec3e40c0abb7780ff5db2aec774210734e1c0edc4510e98967a4076269b0506f",
  "dc2": "67521c9196d6ab0e6da26efc750507686d22d8d26ce3f7e98aa20514208eb4b01b95ee339f213dfd82e11a4a781e6dba2b5317684efd9565bfecfe430b3c0627ccf463c865a84681faadba3681ec88cf4f660e6a7e6dcd829d1cf43b8fcee77aea9696cfb5be6b70febf02affe26e4f38c4e8c734c78850e1dc1033c793ead9636ead493c6805e720cdce71911c835159048fe5051f4b9910c0e586fcad6754016651d87b871b3f5b18663fc37439423707a8a588c2285ea8931cbc3baab71822cf3d50dca464403b814fdf4e4273b20ec7332eb4571b1748eb5a2ab004c18eca1b3225e370edff03f67bedfd567f6e7d40086848a9af311dd38e86884c49ce7",
  "dcId": 2,
  "banned": false,
  "dateUpdated": {
    "$date": "2025-04-12T12:28:56.769Z"
  },
  "firstName": "Anton",
  "lastName": "Korolev",
  "messageCount": 489,
  "username": "korolev_sensible",
  "id": "7245223202",
  "remainingTime": {
    "$date": "2025-04-10T14:39:20.160Z"
  },
  "spamInitDate": null,
  "historySpamBlocks": [
    {
      "spamBlockDate": {
        "$date": "2024-12-02T05:23:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2024-12-06T11:07:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-01-13T14:57:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-16T05:10:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-04-09T07:35:00.000Z"
      },
      "spamBlockDays": 7
    },
    {
      "spamBlockDate": {
        "$date": "2025-04-08T12:07:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-04-14T03:53:00.000Z"
      },
      "spamBlockDays": 3
    }
  ],
  "nextApiId": 2496,
  "twoFa": false,
  "twoFaDate": {
    "$date": "2025-04-10T14:32:19.904Z"
  },
  "automaticCheckDate": {
    "$date": "2025-04-12T12:28:56.769Z"
  },
  "lazyCheckDate": {
    "$date": "2025-04-12T11:57:46.064Z"
  }
},
{
  "_id": {
    "$oid": "66dee216f856541e1b71c987"
  },
  "accountId": "1722785059-support-500-last-9-sep",
  "dc1": "6605f413b4c96e54341eafd9bc6657210b625a01ee9b5787a884045767b3bd3ce997a1366fc3b9fb387abf062caae4ee58fbaa867fd3692a5fa63c175ed845b82007d28892ad8bac7e97c5eaa3277611fb9cd373d5a35af9db4a76f825bc4b923a6487041f8b072251497cced52339b26e7817633b162d17334cc22a8bf93f3db80fa01fc1be0405946d8c329edaddc92ff0e7ee8eabd199d0e1dc1234f41ed12d578dba8019a9714a82c74a19c780c18d6903783d952ebae6b725f54d181cdd4e7c31d6d46f02892e46c8f85c21a9f0ba8f6477c2b9f5a568ede7b8cc65f5611b86941471ace7fb1bb52db10a6c1316489e1a820b978eb920e0e116bc6458b1",
  "dc2": "51111adcabe88f7e62aa734e96393241f4d65b25e16a415d7f3d433c3c19df7cf514d204726c450184de3e81122fa795c16c73b531e8f8ab111869974ac1fe366ca5a981a8d893be0c51d0c8cb30a16a676c411a3ba97cd80cc980411608c8f32c2bae9b64b2afd0084232a89fc0c2ca51d6f9da48f01f45f57ae2033ca5f3fa9cd996eafae16f45511f1d8ea322dd8dae026a054e4494ab8f491ad4242ee5c4cdda102a87d2a40b63184886ee12b71282610bd335eabfba7e2c9188c5addfb78d89d17ac02a1ceca8683574912d3df90de3e17bd824ddc3ac06f1ca14d66e99aea52e85eb88be4d01accbc10471c6359f750556648a832a8cda47f173708f1d",
  "dcId": 2,
  "banned": false,
  "dateUpdated": {
    "$date": "2025-04-12T12:37:00.447Z"
  },
  "firstName": "Grigory",
  "lastName": "Filatov",
  "messageCount": 518,
  "username": "filatov_magnificent",
  "id": "7380276077",
  "remainingTime": {
    "$date": "2025-04-11T16:15:02.939Z"
  },
  "spamInitDate": null,
  "historySpamBlocks": [
    {
      "spamBlockDate": {
        "$date": "2024-12-19T08:21:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-16T09:38:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-23T11:31:00.000Z"
      },
      "spamBlockDays": 3
    }
  ],
  "nextApiId": 2496,
  "twoFa": false,
  "twoFaDate": {
    "$date": "2025-04-10T12:58:02.562Z"
  },
  "automaticCheckDate": {
    "$date": "2025-04-12T12:37:00.447Z"
  },
  "lazyCheckDate": {
    "$date": "2025-04-12T11:57:46.237Z"
  }
},
{
  "_id": {
    "$oid": "66dee216f856541e1b71c997"
  },
  "accountId": "1722785145-support-500-last-9-sep",
  "dc1": "85eb2cc78b8a4f432012c9fe5baa176215825bb4359131a19668d6454ef0318548cbd7530b4c1a29053853757da08e3ecfbc5dba87a2eda0b289aab4469c448dd1112b667555cd08abc163594a64ac804948238eecbbe378a14f4e3efb08b28a015d6e1fcd31c3d9c4b427c6d2e76df784ef68a35dd83939e3c81d75082a6dcbbfc499171e310211a3955b2f06f99c5c76d0ff395abf0fe502f31b8fcd7ca7944f46c1f5e7d544553c8240b3cab5c12945d315753823597dd204a89fffd6b6d5de480688a28572238b5e695051f3fd02b5e7a6668159833f6c46404559fa1d11a05bfaf265d0d95862a9ab52663c93dc7883ca72fb25bcc1452dd858f2b5e722",
  "dc2": "3fa7208ed6784fe353674af85fafccdecb8ca6ca6a25865be233acd31dfb300391db40230e5c1714afc543e258f088a776e5f391a88f35d483d6590088966b8270437a19a960db60169c378ae4187f498b662dceb4b9821812a74b3c25e54f19d890eb4844c571aa23cdf8940e284099312a407074e4fe74d20b20c7e9ae270570ddaa7dd1452813c6622065e63bfc01f34dbdb15f2ba02741d0e631409ae354fe8659fad8357cb412404a5518fb84c9d631e5e18ec3f397c6b53ed057b0ac75c03917a06eaf97572ee073f21acbd883bb13cdd37fd1b01203c7083aa924c2c13a5686170e22f9807e59988b080912c51ba16aff63488b8b255c4979b20e8e36",
  "dcId": 2,
  "banned": false,
  "dateUpdated": {
    "$date": "2025-04-12T12:15:00.300Z"
  },
  "firstName": "Gennady",
  "lastName": "Sobolev",
  "messageCount": 445,
  "username": "sobolev_absolute",
  "id": "6933000423",
  "remainingTime": {
    "$date": "2025-04-11T14:54:39.843Z"
  },
  "spamInitDate": null,
  "historySpamBlocks": [
    {
      "spamBlockDate": {
        "$date": "2024-12-01T08:34:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2024-12-09T15:45:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2024-12-15T17:30:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2024-12-21T11:23:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2024-12-28T07:15:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-01-17T22:05:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-01-20T14:24:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-02T14:17:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-16T07:29:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-09T13:54:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-31T05:30:00.000Z"
      },
      "spamBlockDays": 7
    },
    {
      "spamBlockDate": {
        "$date": "2025-04-03T06:33:00.000Z"
      },
      "spamBlockDays": 1
    }
  ],
  "nextApiId": 2496,
  "twoFa": false,
  "twoFaDate": {
    "$date": "2025-04-10T12:17:58.954Z"
  },
  "automaticCheckDate": {
    "$date": "2025-04-12T12:15:00.300Z"
  },
  "lazyCheckDate": {
    "$date": "2025-04-12T09:58:33.916Z"
  }
},
{
  "_id": {
    "$oid": "66dee217f856541e1b71c9a0"
  },
  "accountId": "1722786312-support-500-last-9-sep",
  "dc1": "079cd4178ee9f1c4905e5623ffd1bd6ca0f85ba29308bfd8f15ac6cb1990f2e8887524af75d219d79cba9318c6c46eb630e3ea761681dde73bf28053c3b4e3ad4a5aeb2a906cf91d3013f56dfa009e84bba6c54c4a573fe61a9bcb7d02850ea22eed750415b53538cad9d9103e41c79a2f9e6927190aa502580cc94ed537bd8eb3ca0339e8f7d84051e062cdf1343ead7e9a92838131d2dbcc40e39b6645d1897681f8089a6a38e5cfa10a06f4bba4f12ab8a7cafaa2aeae8d363d950477773baac344c7b9f4b43a80e4d6c724bbdf40a6734589a89e2190534763839ef52d9be94c1bc08ac1d8a3c185355ba6769b91d96adeff5602455ac38999f07338daac",
  "dc2": "8cee8a6d16b1d6bcf40ca58e449463bce550c226cf1282b87ef72285257f1ce116dce1a9f9c1d2aa08f9bafdc899c0b391bdd1bb3318313073bdb2ee69c520b20523064002414d17899546ffa9aff79a63537f06b1b505d73f79b2fabd1613d1466c7455f761226264bc0c55f2c3297c2ff5b71caa85cc2ad7aced2e48a68230a42974893bfe4b6e1dc93fe25996de6e0322b48c9ede4ed3a3233ad6b4812e89a4bc4a1907fc39ff9769c48f7aa0d8b21f133209ac0e73694ceec181cb08d8810a6aae6bb7b873ff67936c1bc881647328c49c53d20857edf674d00d1ea12504d5b4db3efb5069ad2d9897336aba1ddf180f76c71cefc3dbd28631e54fd9bee2",
  "dcId": 2,
  "banned": false,
  "dateUpdated": {
    "$date": "2025-04-12T12:40:00.514Z"
  },
  "firstName": "Victor",
  "lastName": "Melnikov",
  "messageCount": 516,
  "username": "melnikov_unable",
  "id": "7212711737",
  "remainingTime": {
    "$date": "2025-04-11T16:23:20.780Z"
  },
  "spamInitDate": null,
  "historySpamBlocks": [
    {
      "spamBlockDate": {
        "$date": "2024-12-11T10:42:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2024-12-17T15:21:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2024-12-28T20:18:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-01-01T12:44:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-01-20T08:11:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-01-23T12:20:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-01-25T12:24:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-21T12:33:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-04-18T14:24:00.000Z"
      },
      "spamBlockDays": 7
    }
  ],
  "nextApiId": 2496,
  "twoFa": false,
  "twoFaDate": {
    "$date": "2025-04-10T11:29:18.650Z"
  },
  "automaticCheckDate": {
    "$date": "2025-04-12T12:40:00.514Z"
  },
  "lazyCheckDate": {
    "$date": "2025-04-12T10:58:06.314Z"
  }
},
{
  "_id": {
    "$oid": "66dee217f856541e1b71c9a2"
  },
  "accountId": "1722786321-support-500-last-9-sep",
  "dc1": "9bdf2fb6bb44714110170c38065e972a6b07a0716e24b1f500090070dec8c29a70e6f870d6474571ab8ad205d5e26062d8c8b13849bed7a090c548a19c6a8614b5bb0bc0cb7d3e1402cdf60bd7b4dd220a7e0f050966cf50ce3bbf8fe4f41c4768678450925714a1015d62c2f8954d25e1f512625299ce07e3b0360b3fdbc733f39d99cfde1fdf9411d9ecf1fbb7837766a8bb292d2ffff4724b71a7dd3554083c2aed27c13c5fd26a725e2fda0ee2ee6376e4fb992f5e1ebe5689c63eb6c1afe8c972acf660434e93be2d7db76191b72fdc2041edab542d809e930066c0b226af3150c46bcaae7728071840c05497708bf1b1a0e70c6f53db7a4a9a999382fa",
  "dc2": "156892cc7f82b3e704de30867ea77f098d7b88137fe00354f142919d34978869aa3f701aac28a757ca55a8e9d987f675da8d6a564aff124e6bebd26047ad7008a79fc59f20647f4e1ee3ba5a59e087b65f54fa82e6b9472fdaf2aec347b02f6f7a372ba9a9d424b3f6a44f284e9dc9a12b59a529fe7a3fa9469057d28cbb5717dd65c6ddb78abb320e3e25053cd8d2cf84223c71b957818e4d900fc5861c62dfe2c5c63d9c65eb44134eafa4c5661745f3eef12d707bbf21f701d18df40111899855b760021ee3b960c514a176437e2ef5c5293c839d9a46ba29e4f338c5c34914e1884e1fdcaa8c428423e3c32e0d3556d3b530e904e9bfb5f04cb08de745eb",
  "dc3": "05a1b790cacf22c79053bc681d5b1c75900133df96787dd8fd1ee2997291e592735d32daf008824b6bde2254b2d453c44b469e30842f41692fabe617b3e4be8936519168b3ce1fc5f082710f123ac211abcd145cdca944a09647612520e597ab9472594230d31fd5bb82e02aa538fbda63cdc1e4966baed50e7f7d7ed4f0158b56159a6ce206656262de2883e3ed09e352fe0ff0bc6990581969b0f0bc8336e7a226d3424a656c61e7ff0e33eae03157ac28afac6492bcccc55f70288d321fba87d5fade553d5d4cc38149efc64d24de3b013d0e43836d796699fec44679f8a74eb9ea38f34ab28fc8336c90de4fa7f53baf2146095d45519dd1e8be6abf4d4e",
  "dc4": "1b1e5623d84c886cb317fb9343aac0930c2c41e9b0d2974aa4f1c419f22ec3b62e8ea5cb4badaa9c5ad0a5c6b35c9ee1d3192d22c5c9110bf3e531d5593e929dcb3f4b08c4364613f415be5c09073c7a17c4dc120cfe9903ff65f2dcf59e6a8e8d4e22adfeaced93d641c118c020c459de4538d9a1d4a583f9de8d3cb1887cfbd64e590ec51367078c56290ee2256520c930a2a5f36c234f3d47635c06ce697c9118bfcae71a0fb138e623a384a353fd31a721bed95fcb6735ee5f5fc64c5e4bb35099ce46b71840abb1bddb6f42e8cf4b1533455ca5d936660b98c7ec0b447b5442f58470ca81da0d6d9bec36c610b660f1897a5b123a3f51b8bace551a1419",
  "dcId": 2,
  "banned": false,
  "dateUpdated": {
    "$date": "2025-04-12T12:16:00.305Z"
  },
  "firstName": "Artur",
  "lastName": "Malyutin",
  "messageCount": 266,
  "username": "malyutin_confused",
  "id": "7117399703",
  "remainingTime": {
    "$date": "2025-04-11T14:55:59.365Z"
  },
  "spamInitDate": null,
  "historySpamBlocks": [
    {
      "spamBlockDate": {
        "$date": "2024-12-03T14:34:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-01-04T05:46:00.000Z"
      },
      "spamBlockDays": 30
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-09T11:29:00.000Z"
      },
      "spamBlockDays": 30
    },
    {
      "spamBlockDate": {
        "$date": "2025-01-21T12:41:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-01-25T14:14:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-03T14:34:00.000Z"
      },
      "spamBlockDays": 7
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-09T07:08:00.000Z"
      },
      "spamBlockDays": 30
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-06T14:20:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-13T06:34:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-12T10:34:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-16T20:10:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-15T05:23:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-20T08:47:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-19T16:00:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-21T09:01:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-25T09:56:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-29T07:42:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-30T10:38:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-30T16:10:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-04-07T09:09:00.000Z"
      },
      "spamBlockDays": 7
    },
    {
      "spamBlockDate": {
        "$date": "2025-05-10T11:41:00.000Z"
      },
      "spamBlockDays": 30
    }
  ],
  "nextApiId": 2496,
  "twoFa": false,
  "twoFaDate": {
    "$date": "2025-04-10T12:58:02.280Z"
  },
  "automaticCheckDate": {
    "$date": "2025-04-12T12:16:00.305Z"
  },
  "lazyCheckDate": {
    "$date": "2025-04-12T09:52:31.562Z"
  }
},
{
  "_id": {
    "$oid": "66dee217f856541e1b71c9a6"
  },
  "accountId": "1722786560-support-500-last-9-sep",
  "dc1": "1d530e0c9e7b025580727c6432c31c44515763a111f2e85b474526dffe479c5285e1d1eea2ceaf82af9072d7cecb81b734e72a86e078fa8d260202af820fc4d85610125021408fc634dfb0addfc475b4f70b6a228a3bf7ef6035fd732c9b83bf6cc6f66b6bbdb2c8b382698ba5f5efd1b287712c221a35a65b995edb31e8c5e6aa6d919df5775a375793d99e66a177e2d0c8dc85bc9016636673b0180b90763884963eeed3cdec0784cd1fc7e22e4e183183c05d204006eb18cb23ccc7abff96eddd480d3a7d1e1be3f1f82f019b84544b19e9ea43203cfbbf2f105ce1d64deab4ec25e394099c13be1df52b15a94141758e00111f4373fc507c80972f11d7ce",
  "dc2": "258b907194a0bc12d049b6fc93e06834481dcaf9a86914e9e07ec20f62db5301743762c33df85a91caa74026ec88177b3e7d65c9d58e400e557e087f1503d4c3047aed3da2c889625786f071ffe9cae62003204b18f8b9a66359d4ae7c942848c015f3c65fff293f30df1a686a005b14362ecb9d26b777018305d5f1b841a1d0c1eebbc07485bbf5cb38cdd4f628dacffddc6e09def2ec138af3d9ed4674411802c8600c7372b4bcd1fde925cf7ab8d0f945bf2bde952d5fc42fad3db980eebb6a5e77262bddb93e5a25b74f9b7b3b09625a9fd817dd8041dae5d9915a1734097409c265ba83797171462516918203f31ba5873759d76bfc3e6681f606d6cf2f",
  "dcId": 2,
  "banned": false,
  "dateUpdated": {
    "$date": "2025-04-12T12:57:29.913Z"
  },
  "firstName": "Andrew",
  "lastName": "Ilin",
  "messageCount": 362,
  "username": "ilin_eligible",
  "id": "7306470585",
  "remainingTime": {
    "$date": "2025-04-11T16:24:48.884Z"
  },
  "spamInitDate": null,
  "historySpamBlocks": [
    {
      "spamBlockDate": {
        "$date": "2024-12-04T12:45:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2024-12-13T22:55:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2024-12-21T06:27:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2024-12-28T14:40:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-01-29T09:58:00.000Z"
      },
      "spamBlockDays": 7
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-02T14:29:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-06T05:29:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-13T10:08:00.000Z"
      },
      "spamBlockDays": 7
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-12T15:27:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-17T12:38:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-26T05:50:00.000Z"
      },
      "spamBlockDays": 7
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-28T09:08:00.000Z"
      },
      "spamBlockDays": 30
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-28T05:24:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-04-03T07:50:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-04-14T11:59:00.000Z"
      },
      "spamBlockDays": 7
    }
  ],
  "nextApiId": 2496,
  "twoFa": false,
  "twoFaDate": {
    "$date": "2025-04-10T12:18:00.524Z"
  },
  "automaticCheckDate": {
    "$date": "2025-04-12T12:57:29.913Z"
  },
  "lazyCheckDate": {
    "$date": "2025-04-12T10:50:07.508Z"
  }
},
{
  "_id": {
    "$oid": "66dee219f856541e1b71c9e3"
  },
  "accountId": "1722788927-support-500-last-9-sep",
  "dc1": "092b4f2aec9b53dbf5f3bb6ac1b07c0d27a71d66a1041b42167ac63c93c9ebc51761e2f9e959e1122ee2266e00248368aba5c66ccdd556d7afb8e6fc6b2851ae7ae753b3934d62ce4efbc5f053bcca626ba386fa32010eb0e588994fd04d48ba687ea6e96b19016e499b590d4726df4ffa5a2e600335449190443ccc7c87d48b7785d3797ee6cf18c29f534000c0d8cbea9bdebfc600a61ce486df7c617aaf903c4cf2a6510223a9b9d97a35ad633393335c3b5d0a2d83e80c06183a5f39326ecc0e9f6a515732d37a8453d59f9575b33794778a18c6db9a7b4d626ab3719b0435a66c34029119da9570b2c26ea408701813fa6cf72b87c209046af05a67506d",
  "dc2": "898df55add4768441ae634681c266df4093a0a06c5d71467a23e590f38f149a3e9d14772e0c3e50c8b132ff5a5a2f024aa3b29fa07ff2e1bc0e2a1632a9eaa10b70442ab6b061d0e08579c78aaa7ec48789f5b8595acd337759839764433ef818771352a816245793a1d87e46a34d0a7edb60686e4f6c56b3c9bde89ffd3d416a1c2c14c90bf864c208af8533d944d2e4a11d893014bc31c0b42775272911606f5034f0839d4ca6e0d112fb370b12a18f52351ea7826c54ffbc42310ad180f8a01943eadb44ea86ec12d4d9f1f90a2feca288519641f2d68a828b586048ae5dfee84b2ad5c8ecb74a78befb86e9d9788709affa77c85eb144f049249e7270839",
  "dcId": 2,
  "banned": false,
  "dateUpdated": {
    "$date": "2025-04-12T13:00:29.317Z"
  },
  "firstName": "Mikhail",
  "lastName": "Samoylov",
  "messageCount": 246,
  "username": "samoylov_robust",
  "id": "7467057953",
  "remainingTime": {
    "$date": "2025-04-11T16:51:36.126Z"
  },
  "spamInitDate": null,
  "historySpamBlocks": [
    {
      "spamBlockDate": {
        "$date": "2024-12-14T10:30:00.000Z"
      },
      "spamBlockDays": 14
    },
    {
      "spamBlockDate": {
        "$date": "2025-01-13T11:09:00.000Z"
      },
      "spamBlockDays": 30
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-19T05:19:00.000Z"
      },
      "spamBlockDays": 30
    },
    {
      "spamBlockDate": {
        "$date": "2025-01-23T14:38:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-01-27T05:22:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-04T19:56:00.000Z"
      },
      "spamBlockDays": 7
    },
    {
      "spamBlockDate": {
        "$date": "2025-01-31T06:48:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-04T12:53:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-04T14:09:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-05T08:21:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-08T14:08:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-06T23:28:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-10T09:16:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-17T09:37:00.000Z"
      },
      "spamBlockDays": 7
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-13T13:53:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-15T09:37:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-16T12:25:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-21T08:24:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-28T09:20:00.000Z"
      },
      "spamBlockDays": 7
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-25T05:49:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-05T09:03:00.000Z"
      },
      "spamBlockDays": 7
    },
    {
      "spamBlockDate": {
        "$date": "2025-04-05T11:38:00.000Z"
      },
      "spamBlockDays": 30
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-08T09:06:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-11T10:50:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-11T06:31:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-15T11:20:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-26T11:53:00.000Z"
      },
      "spamBlockDays": 7
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-22T13:11:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-29T09:54:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-04-08T09:57:00.000Z"
      },
      "spamBlockDays": 7
    },
    {
      "spamBlockDate": {
        "$date": "2025-04-03T12:24:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-04-08T11:53:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-04-10T10:56:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-04-14T15:09:00.000Z"
      },
      "spamBlockDays": 3
    }
  ],
  "nextApiId": 2496,
  "twoFa": false,
  "twoFaDate": {
    "$date": "2025-04-10T12:58:11.710Z"
  },
  "automaticCheckDate": {
    "$date": "2025-04-12T13:00:29.317Z"
  },
  "lazyCheckDate": {
    "$date": "2025-04-12T09:17:06.020Z"
  }
},
{
  "_id": {
    "$oid": "66dee219f856541e1b71c9e8"
  },
  "accountId": "1722788944-support-500-last-9-sep",
  "dc1": "7bacc0319d4763dfa5e0aaed2744e647cf1b3bd0a6a3aa211c3ca32b420427512f14de5ad4aab65cfb2471a1781a4046d0e9d1bd85475c73e08ee4d49afd3edc8f3eb5926c1a1208c2e1f1dd3793eafb4d54209aae9e80b052282a33addeef68016b9285b0e03f782e04d0032f795adfa39657543784d25bf362ebed86aca578fa04561eb57ecff2bf86b4b981a3d6dd55b19eaed44ada06c921bd4f91b042c8183d9adbc020e6a785d79611167ef512c8115981af1d77156565c891888c2909cf8cbdffe381fc2d1abcbacd345ccd3d91ab52862060c80e710b4d880447eb945548216c1f25a25760d75beedf4213907cd5f5f1bd73f088b2fbd8ba74062a40",
  "dc2": "76902e20220d2330673d22d6f675d30240cec4a0ea4977c1173a23f032ffca6dc9b4f06ccb5510fb2ec6ddbe7cebc3a0bec3b48c55a259d3308a2d60cc99baaef2f9c5a35e1b7eb7e5c97eb3fc688d6de735989bf1be0ee476101df9169aff9fe114c985ae05e2747a3c19bb59e94655e3d52eca724764b4bf74f671228558cc1edb1b99a21de5298bd7e476609d58ed9de3860b9682336b85a37a3f6d7462231528c78bb853e0fa3214d488ec69a73661c34ddaae1a43dc8e205d78e80260ca9b08a38000d96a739841d6ec2458894b5f7735c43d2f4b31fbf01dbc4a229a0761debd92193eac5a5f97c1a02d772076b225b1f11df84e7883481b82c3c82489",
  "dc3": "0ec0e96fc58ae0d40fbdd9641d4c8c1760b3db2ab1e36e8239f8836f32b6c02d6e4a2d09a9f6e68d8419392ecfe81af8ef972a6e526a0a3ad130f1fb1c086a28f1a077d9a3c64dfcd0d101edac4ec1eab869bd60bdb031f27b2aeeb45ca6e120fd4f3f5569f87885e3f9c9ffa137d87d81ff8d6d2f54907a94ffdd4d57ca6a1f909c0f7458cfc76f536025e110c905314cad73d862764a21d194a25670c88d24399ff22e63dea28c7109628116ca405f3e4c841dad5b010229e84abf80479a0dd2175ddb586ba3a539435aa324ff13527e40a0b4c33b95a73370c0f0a7746281142b794fb710b9e92bd927efcc2d25eb75172812491aff14315eff7443f51e1d",
  "dcId": 2,
  "banned": false,
  "dateUpdated": {
    "$date": "2025-04-12T12:32:57.122Z"
  },
  "firstName": "Artur",
  "lastName": "Markov",
  "messageCount": 430,
  "username": "markov_innovative",
  "id": "7233958748",
  "remainingTime": {
    "$date": "2025-04-11T15:13:06.143Z"
  },
  "spamInitDate": null,
  "historySpamBlocks": [
    {
      "spamBlockDate": {
        "$date": "2024-12-04T08:34:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2024-12-27T09:36:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-01-25T10:30:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-01T09:58:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-06T07:51:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-07T16:06:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-13T14:10:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-12T07:04:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-15T12:22:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-17T08:15:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-25T08:57:00.000Z"
      },
      "spamBlockDays": 7
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-21T23:18:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-01T09:10:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-14T07:59:00.000Z"
      },
      "spamBlockDays": 7
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-12T07:25:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-13T08:55:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-14T10:29:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-24T08:18:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-22T12:31:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-28T16:28:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-29T11:47:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-04-05T10:45:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-04-12T13:17:00.000Z"
      },
      "spamBlockDays": 1
    }
  ],
  "nextApiId": 2496,
  "twoFa": false,
  "twoFaDate": {
    "$date": "2025-04-10T10:50:17.118Z"
  },
  "automaticCheckDate": {
    "$date": "2025-04-12T12:32:57.122Z"
  },
  "lazyCheckDate": {
    "$date": "2025-04-12T09:53:34.175Z"
  }
},
{
  "_id": {
    "$oid": "66dee219f856541e1b71c9f8"
  },
  "accountId": "1722789215-support-500-last-9-sep",
  "dc1": "07b564d538665b936b91b9ebb003c4fdf2d30cf00be1110fb5b00729122837345ddc310190e58f07309d8897461d4c62686bdff214d66c20206d4fd9fdf2140212a895e57ef56de22dc9154428f71f579037d28afa165339b7e30c9e4f42cdae2542793394d0633ab3e909ddb02e4abfc6f1774ecd3a7b0facd9bf1e583dab280b9c0a51faf7995d4e6c2b8a8803ec728e029796285c23e3e494c9fae8481be0d56359de16092cc954c932d2955cbd194cccd88c1db4134ba30742c971dd1a20ae8a23135d16915851779585a185a0b5d0b0764a7d56d5d196d217b08b8fb7b0e57c664bffd0a784a0222faa2dad5a5c69f477e9478768770d3073653b0acdd7",
  "dc2": "08c03a8b736082ba4db605d87d1a16c59cddf997c981135e3963bf15fca5ba49faf8267021632adbbf8c7157f25b4589d87511d46c4511ad091a06e7e604be93b08bde91ff625f58523aaaa3e033d0ade1ee43462f84d69e35ce569879a31d6bf422138d9fb7c5138e59f1965ac3a205c5971791768f791c84e142817046f32fd2415402fb0ac059a4dd977196d4eba52d03eb751187e4396b072130017074058148c78d707a1c4828762c94780fe1fbde5e4541f0812cdd0fffcaea44487fb7c32c4a9b510ee104888a3813c84e6d03592cbdc1490663a96678c569e15ec1e060977611a9f00db18a9d6b7e3d0340e713dc45660abe2c9047c55f8f70cbfb00",
  "dcId": 2,
  "banned": false,
  "dateUpdated": {
    "$date": "2025-04-12T12:32:00.750Z"
  },
  "firstName": "Artur",
  "lastName": "Kazmin",
  "messageCount": 473,
  "username": "kazmin_good",
  "id": "7324378574",
  "remainingTime": {
    "$date": "2025-04-11T16:50:03.465Z"
  },
  "spamInitDate": null,
  "historySpamBlocks": [
    {
      "spamBlockDate": {
        "$date": "2024-12-07T18:09:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2024-12-20T07:36:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2024-12-27T12:13:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-01-31T11:00:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-02T15:41:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-07T16:32:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-12T05:28:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-17T11:28:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-07T13:38:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-24T11:29:00.000Z"
      },
      "spamBlockDays": 3
    }
  ],
  "nextApiId": 2496,
  "twoFa": false,
  "twoFaDate": {
    "$date": "2025-04-10T14:32:22.778Z"
  },
  "automaticCheckDate": {
    "$date": "2025-04-12T12:32:00.750Z"
  },
  "lazyCheckDate": {
    "$date": "2025-04-12T10:40:07.176Z"
  }
},
{
  "_id": {
    "$oid": "66dee21af856541e1b71ca12"
  },
  "accountId": "1722791791-support-500-last-9-sep",
  "dc1": "6bbd076219c45c3970a7b8a176e28fc43f1ea731b03519515f33dc1875fb7a5cc9e1d5bee024e69805dba797b6500df6ae116603d85d8826b808a38454fdf838e5062d5e6bc6e17533a9d3094771fb76289029a808781909f22abd51717705e11d486ea8ad72293d3b0c169c2522d5a264083e15c77df22a920403b599f2ea5a1dd575e0025938fafa14ae44cc4044269cd821ffd8fadc802daa9b07c02933811a7ada1437df20bd39e16c4e58a473b37b51addb7cc965a825d64ea36998400aa80824c46392b7486cb6b8b002b1ff220410cfb57641527aea41729de1ae8f928c3cd678c82c12e01301819639953ef0b623cf853b6e1c4972572b958596a3a4",
  "dc2": "7552ceac279170d13f32772b013d6c4f77952cdc6e09e5c3496ec6157a1b8ca42140a75d584e3bf3fdabc20b687188829153609f8e91079516ea1dfa5d63baed7f4cc5d220bdbda3bc6d83d2841eda24964d869815912a1aeb109ac8f3d430e8df67347096d002cb8bdd399ff6d7e74fef515e9c482402fdeefec86b4cf908ca01ebebbf11ed9f52f883468ee412e6e97a01babdf29fa62408eb3396492c32cca5960a134bb1656a3f9f730112f8c48d1a481801ab97f37f20677ebda987603ff249aff902446d534ad83a7b4d66ee352a68d2be73d265d24b0184852378941f8c95cbdfdc8af133152996a23a6569601df7089f332ab89419b3ba3cdc1df0b4",
  "dc3": "65d0ad4acd379024e5b9407fb6bbd41eed6ffceca5d17cb177449562cb1b15ab87b342605318f37f1452f78d3d7756d76a05d67a4a9d2d4a06ded092c2c71f76a8bb848c35fe57dd245c2e79d60b074a9f447a6bc6ad08edbe73fcae39ba7dc880f3e39b5bab7188ec2d12020115e71af2159f711d92f7eab2cac8c9f9981bb352779a7e78ba2a021ffe27744d3f9e622b2a69dc4b5461ddc2b5407bce95a9dc1deb6e09316eb5938fe2c1d1a699a2d628db701446e67e85f61fa5158a1cf267f6537f42e7855f3b0bd6f4d0b0087411487357a2c592922e8b809a0606aa6c8bc782f840bc6b7d75ae1a6744ba36f719a0e04fa1fcb90900f6a9ab75b3b96714",
  "dc4": "0e137970f36cd306967d848f5fc8cfb794a3204c8a9adf110ed8705f53fc08b1342d44de58781b873e1802cc632362d7cb90149ce64ed7931162dfa8c8318065373dcc883141cce2f8d13088b81a590bf0b3243eab65020b650fb61f99a092452a8ca8291f5ed0cf99b29ade7cc79887c67ad26660df016c0f597d646237eef286f0a0706c6a1e6dc0394da7d65e92b6fc5d7fe2608702c263bb2704003e5b253e0a5e997fded38284fef6ff36a0a0e40776375fb878852a6e197a1e264996463433dfe9e6c11c1baccf1cb24dfefb7bbb192f7ea63725eea4066a7f4ce7d99720eb035175825cacba3d3e3cec6ae40f7ed8869b406afadc69bf4e0f3388f355",
  "dcId": 2,
  "banned": false,
  "dateUpdated": {
    "$date": "2025-04-12T13:08:29.856Z"
  },
  "firstName": "Kirill",
  "lastName": "Mishin",
  "messageCount": 367,
  "username": "mishin_secure",
  "id": "7329934403",
  "remainingTime": {
    "$date": "2025-04-09T11:46:40.841Z"
  },
  "spamInitDate": null,
  "historySpamBlocks": [
    {
      "spamBlockDate": {
        "$date": "2024-12-11T12:51:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2024-12-19T06:37:00.000Z"
      },
      "spamBlockDays": 7
    },
    {
      "spamBlockDate": {
        "$date": "2025-01-18T08:17:00.000Z"
      },
      "spamBlockDays": 30
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-21T10:10:00.000Z"
      },
      "spamBlockDays": 30
    },
    {
      "spamBlockDate": {
        "$date": "2025-01-25T08:46:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-01-30T12:45:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-09T00:42:00.000Z"
      },
      "spamBlockDays": 7
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-03T17:52:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-07T06:12:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-07T05:27:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-10T08:37:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-14T09:56:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-25T08:09:00.000Z"
      },
      "spamBlockDays": 7
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-20T08:38:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-21T09:04:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-24T12:04:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-27T05:41:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-28T09:44:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-03T17:25:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-05T10:44:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-21T09:44:00.000Z"
      },
      "spamBlockDays": 7
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-19T12:06:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-22T14:50:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-27T14:41:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-04-03T10:12:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-04-09T08:59:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-04-12T10:20:00.000Z"
      },
      "spamBlockDays": 3
    }
  ],
  "nextApiId": 2496,
  "twoFa": false,
  "twoFaDate": {
    "$date": "2025-04-10T12:58:11.743Z"
  },
  "automaticCheckDate": {
    "$date": "2025-04-12T13:08:29.855Z"
  },
  "lazyCheckDate": {
    "$date": "2025-04-12T10:43:06.231Z"
  }
},
{
  "_id": {
    "$oid": "66dee21af856541e1b71ca17"
  },
  "accountId": "1722791809-support-500-last-9-sep",
  "dc1": "634ad9db5b01f2c39bcf62b840be8b398f14740e8cd939b424e6b6dc7c74e199581cdd62a967ce509f4c85d85519902503fe9e6a3c198f538ddb88eee732ead3f3a0199d97f4038a8f7786fac56f9991bee66af9f8cac3cb922fe7b332964973a88255a9711a4193c4c2044a27e863c2759fc06e753e5a46ebab9d3da76dfb0336ed80f1f2cd289e320a106fa0ff398f98c804bde10f393f9e7641d7090196783e776c30897892913de7d0724cceee41b3cccfa656d518cea3b91e0bad4531fde4d9e8b372b240b7edef77561f5c7548f5b35ca6ccfc7bd647e2d6267d4300bf6957bcdab0e03d538a5f70be9ddf58ef2c1997107b3018442e22afc985f07f13",
  "dc2": "b5eb800301edd9f365b7e638c5bd4a81bc58fb26f59505325de06b971f3aacb60858e31dca1d1bd1d000c8f39ce9c335583b13cb3c4c4ba9a9a74cfb0716f0d5b89d9307180a3eb87dfdf7ea0c7d38c7f08b3912a708baac6ab74bbc67bd204260640c1242c991e92739746a4fc0dbdf9e6d8346c16adc8356208c59e882551ab9e26c43e5da5369d4104b74b99321883505414703f1fdf33ee6f90643302fd69da1c92c4dfa5276404f53aee3f8b1f3771a0b63c96c72bf7dab12e6efa52dbf00e5c465f1785dbba38a541bc69d24ab391f2da9534215652d62029f2f54392fc4f09d792c6bfb24426bc24d82b4cc7d67be77c0c196a2ac89acfd437fb3dea0",
  "dc3": "92478e018feeab17513666b32b489be4bbbb24e55f823fd7e1e51d4b756b39dd854bd91e43521d6782ace9b47fabc6471ab7df91738995c1cf8ff4bd24d39cc7e5d1ba9a81f0d030d5f4e356e27b565968756c6ecaf5279a3117df0efe36f56b3770ef9d30f87b701a4b3887146f4a719fbc4bc0f47d9063f3d315e6e6509c70ef95d89b34cec679a13117e6d37b67c975f088a86fcd1a6ca527d250d6e333fa93114da68c62c9379dfdf6b6947beff9fdbe1a35b97b02217b883f94894b1ed2aef32106b45cbf712c222070f8d6de8615c0af29d4460707e79c649c3991337bfe4f443b5ac97a0c06628d399cb83e47d9d27cdd3cb692f399d5f100470e1b2e",
  "dcId": 2,
  "banned": false,
  "dateUpdated": {
    "$date": "2025-04-12T12:31:00.458Z"
  },
  "firstName": "Egor",
  "lastName": "Zhukov",
  "messageCount": 373,
  "username": "zhukov_legislative",
  "id": "6570355948",
  "remainingTime": {
    "$date": "2025-04-11T09:31:15.249Z"
  },
  "spamInitDate": null,
  "historySpamBlocks": [
    {
      "spamBlockDate": {
        "$date": "2024-12-18T11:11:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2024-12-28T09:37:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-01-19T10:40:00.000Z"
      },
      "spamBlockDays": 7
    },
    {
      "spamBlockDate": {
        "$date": "2025-01-24T16:01:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-01-30T12:17:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-01-29T11:28:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-01-30T15:29:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-03T08:07:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-04T16:24:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-16T07:40:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-26T08:58:00.000Z"
      },
      "spamBlockDays": 7
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-29T07:13:00.000Z"
      },
      "spamBlockDays": 30
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-06T13:31:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-07T09:39:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-13T07:33:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-20T10:05:00.000Z"
      },
      "spamBlockDays": 7
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-15T07:46:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-21T09:14:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-19T13:53:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-24T07:29:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-31T12:40:00.000Z"
      },
      "spamBlockDays": 7
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-27T14:12:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-30T14:36:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-29T12:14:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-04-03T14:23:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-04-16T14:49:00.000Z"
      },
      "spamBlockDays": 7
    },
    {
      "spamBlockDate": {
        "$date": "2025-04-12T07:35:00.000Z"
      },
      "spamBlockDays": 1
    }
  ],
  "nextApiId": 2496,
  "twoFa": false,
  "twoFaDate": {
    "$date": "2025-04-10T12:58:11.750Z"
  },
  "automaticCheckDate": {
    "$date": "2025-04-12T12:31:00.458Z"
  },
  "lazyCheckDate": {
    "$date": "2025-04-12T11:00:08.258Z"
  }
},
{
  "_id": {
    "$oid": "66dee21bf856541e1b71ca22"
  },
  "accountId": "1722792707-support-500-last-9-sep",
  "dc1": "24b71ed46ebaca4af8bc3a67533aa796646977e8dd39059c8a0f6dbcc013c8c95bd7164f107180e7af889fe14459f04a715a8cdd18fd843c6a0b1bf01881d26ee4be22bccfccc0331073f5460f1a08d266d5b52faf3c232d70df2c4230e6b1c06a3554fcd45d1579ac12070f3c89db5bf101ddd0e999d21bf10d62912d0bc8a094e55d72cb74db798191e96aede73b005e7fd7945ba20277263fbf7db9c9766086bcb336a14d3328e774fe520f703386dcc1956dbf71556aa665d86d5804e3e8013877824976f33a57af299e4becb85c9efb18960607f03e966da3dc2ced6bf7eecac94bd93e218e24be49b00ede2a5d459a824321bee4e5a5d03480c20362d1",
  "dc2": "be1d15a5d3a02bda44b576028719a268b734928259241f83592fb5600d93712ea74b344c1f95608cfeb14b2f34dc0a3ff0b0184fd672776a3d9544aff353448413dc21c5f31478a943dc0ae4cc8b27d2cb9b7fc7d335f53a864e16e0954d2c290717cfdffcf3b7c00e556a2b338c429dda34d370a3d819cc97997848cf487fe60d95e509e9559691ea5d7bceebe8ab401862b5e890781bd0751ca2796700b54b6de095ab19ed556be266791662e88bca97cd8f4f433af32f18da7625384f509c63eafe0f733a29c44a1befbd1044761cc258bfe3003f83ad2c8c3057e9f3a0f0b6e0dee4112f6990fee715d454fb0c58d1092fe31cbe7d0ba5a2f4b86cc63a77",
  "dcId": 2,
  "banned": false,
  "dateUpdated": {
    "$date": "2025-04-12T12:38:00.367Z"
  },
  "firstName": "Denis",
  "lastName": "Soloviev",
  "messageCount": 480,
  "username": "soloviev_verbal",
  "id": "6915299835",
  "remainingTime": {
    "$date": "2025-04-11T15:30:30.490Z"
  },
  "spamInitDate": null,
  "historySpamBlocks": [
    {
      "spamBlockDate": {
        "$date": "2025-01-20T12:03:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-01T05:30:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-04T12:29:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-04T13:07:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-10T07:16:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-15T08:27:00.000Z"
      },
      "spamBlockDays": 7
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-23T10:22:00.000Z"
      },
      "spamBlockDays": 3
    }
  ],
  "nextApiId": 2496,
  "twoFa": false,
  "twoFaDate": {
    "$date": "2025-04-10T11:29:30.008Z"
  },
  "automaticCheckDate": {
    "$date": "2025-04-12T12:38:00.367Z"
  },
  "lazyCheckDate": {
    "$date": "2025-04-12T10:53:04.246Z"
  }
},
{
  "_id": {
    "$oid": "66dee21bf856541e1b71ca24"
  },
  "accountId": "1722792747-support-500-last-9-sep",
  "dc1": "09e49bef29c06d237d1a36702c114cb5b4ab9cc3af1cdc990243a1530b2ac415bc7b1c04a6dddbc66b97e8b1bc0dff8ac70a165df36ca249e1a79570add822debd4b972747fabc4ccd93a00a95d55c4aa8f36be11b727569cbc4c53d308cf7e15ee8910e0aa5a8dda61370ddb9e6f0e85e0fbea4943f0060a28e8bf90e97dde394d303a88f5bf0bfa99c929e5fb2bd919dace6436ade857cf797b601cd0eff0f98a71b42cb005242ecaa7e99a4130265f0ec6c74a35d4ed5d1667176125e30403c57ea61323bc4d7c5b653e7f7dab6201b4035e3896ae27a7cd1bab012453fe6b5e3298aa4a4eaffb7c5a261b9f9a20cb84e31315c7bf6f91fee081e6ef11862",
  "dc2": "bfa7fec014743df2d86d7c79fb9ca033fab83ff59507f40d985976ecd13b1a84e9a6f07cfa209b6a1e24619b79c8d8753de6c776c72177e621ca57d9a9008cba3cf504df3ec46fc87fff45fb3ceb9bdd14bb10dbf4a0b04cd4b8044e5ef1bd4b956922250dee38410aa5e92f7609ff9f294236c54b002f33914aa5bda4924e31920cf430fad596429ad601af36082a0ca477192ec04700e262e8e5fa662bc5264707ff105ce9ed6f2b955b4c773e19dd44fe2ee2fd059790fa61397c1db954af51a5bf36321f6c613ccac55789e0ced8b8f44e3d59d8dc983c6fdc8ed403b9e125a0e6190860db5064e79325cc4b66c132f4a970bb525a6eec1f947765630575",
  "dcId": 2,
  "banned": false,
  "dateUpdated": {
    "$date": "2025-04-12T13:05:29.942Z"
  },
  "firstName": "Viktor",
  "lastName": "Andreev",
  "messageCount": 537,
  "username": "andreev_expected",
  "id": "7389065280",
  "remainingTime": {
    "$date": "2025-04-11T16:04:04.960Z"
  },
  "spamInitDate": null,
  "historySpamBlocks": [
    {
      "spamBlockDate": {
        "$date": "2024-12-09T06:35:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2024-12-21T07:56:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-06T13:15:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-07T10:10:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-11T05:28:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-27T12:20:00.000Z"
      },
      "spamBlockDays": 7
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-26T16:37:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-15T06:07:00.000Z"
      },
      "spamBlockDays": 1
    }
  ],
  "nextApiId": 2496,
  "twoFa": false,
  "twoFaDate": {
    "$date": "2025-04-10T11:29:16.816Z"
  },
  "automaticCheckDate": {
    "$date": "2025-04-12T13:05:29.942Z"
  },
  "lazyCheckDate": {
    "$date": "2025-04-12T11:33:46.336Z"
  }
},
{
  "_id": {
    "$oid": "66dee21bf856541e1b71ca30"
  },
  "accountId": "1722793849-support-500-last-9-sep",
  "dc1": "babdfddaf62a4e4ab46ab3e785440094a758e468377c861d28fe8324e90c7c57d8316f32b5d097f0724a871adf17b5e6525604d0bd18f4f53a6ec2d3780aa4fc3ab7c6f6c9acc2946edb3e15523a801589664092aeaeb8f239a7a485e389dc22ea42d8dbd2dabb7cd5ffb454f5c764cf20a4e8cf78039e3f01485786cde51546f9f7d0ac6b2d2cb422484e52e24cfede368b36363cca4d4450d66b407d122a454c70570a77d25f8f7544fb61a5be7c4174ead71e38980121e8de9a9d6adef6e09fc13bfb4219cc9ebb48d2544a93b58d60cd45b69758e3c061c0a78d02604b40b0c92c10c293954766ca46644c24d9239706d208a9e9be46c35638ef0d1718e1",
  "dc2": "bed6e2b21a2266ad8fe179ef6b8840b09bf4358699de351c0b7aaa6ddda186ac5b2acc08f17af9f3965eff947b058b9fffda4eac7676153fc5a95587fbf24cf26427306252c5799150b8c51f1fd5751dce625268dc4cadae97694a68157987d16d221392ed9e4b481eb85efc18c6039c52b2ce1252fc330db2e5fb3c9e38f989cd92496488b8aeb50e44ffb791c0ae0e188a2c21f84b501d9a64f71c12cd029cb2aaa67b1a410e4d53793ed919bdbcb6a15bd820c31a24f8f4743d1a37a1792e3a1908c8d734c00d2a021f307c7560f88e9bd9240447318a4217997a449e8cec800de6738a13237b2333ee0cc3c22a81c683c961e3fba79a4f135950458b4ed0",
  "dcId": 2,
  "banned": false,
  "dateUpdated": {
    "$date": "2025-04-12T12:16:00.485Z"
  },
  "firstName": "Aleksey",
  "lastName": "Khokhlov",
  "messageCount": 447,
  "username": "khokhlov_political",
  "id": "7222696778",
  "remainingTime": {
    "$date": "2025-04-11T14:46:10.991Z"
  },
  "spamInitDate": null,
  "historySpamBlocks": [
    {
      "spamBlockDate": {
        "$date": "2025-01-13T16:25:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-01-27T15:16:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-06T10:07:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-15T08:30:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-27T07:32:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-02T12:20:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-04-09T11:16:00.000Z"
      },
      "spamBlockDays": 7
    }
  ],
  "nextApiId": 2496,
  "twoFa": false,
  "twoFaDate": {
    "$date": "2025-04-10T13:49:41.657Z"
  },
  "automaticCheckDate": {
    "$date": "2025-04-12T12:16:00.485Z"
  },
  "lazyCheckDate": {
    "$date": "2025-04-12T09:27:10.456Z"
  }
},
{
  "_id": {
    "$oid": "66dee21cf856541e1b71ca40"
  },
  "accountId": "1722795040-support-500-last-9-sep",
  "dc1": "354854ddcd97b14b4fc9f34cfe344099d4384d8f6228f3ae37725c4762005fa6e8533514ee548faf4e2161e934ae866607c53373c393497b1489d8eaf79bd2c04ec4cd18a07932f7531037c7defde85a83e102f8d33ebea9274bb761fa3a97c67d39614a6217f2a5676652a8ddf51d765e20ea0e2ef189fba5bbd23aa097a623e4193e36fa18f7149d63d43aec12af0ee91827a98ddb50f08f983321c7b61dac42af0e405ecf4b04124af165bddd7be434c7621e9acad6a633a4337c15c1d7e9269fb41b0a82fa92d2d0cc578205a1cf0968190f826267136174bbf4b63750842e576af449fab6472cfd4d9816931dd052d53c1afe755a75054c24adbdadb9e9",
  "dc2": "a0fedb6c90a5afff86463b2809bdac6369c83577bf7061e58c028cea148e22c3bad61207a30bdd50787830bdc0f92a58fc90f2fc97604a87901900a1b78058c7fe025a82ef255f74caa036c63ac1f3ebb7afe0419a343ae3e94c4d9f34ed63a350d21e538ddcb7c1bee8d4b1657da3557e4b406b871f42ebe3c263ea04609c8f3b757ed296569d5869353f79162ec1a13a86abb4f41927276525448aba6ae6a03225f4e254920e3355f471544fbf3b7b4be77b5365d797b48e09bef26127735a81f8fb69fdbc93cfb0f64ed445648ddd26235ee4997952072a3bb4919c4496a8da90a0b9c486b1afd70cef03980302ef6bd8b4063cf82ff2ecfb3fc279df1f95",
  "dcId": 2,
  "banned": false,
  "dateUpdated": {
    "$date": "2025-04-12T13:04:03.201Z"
  },
  "firstName": "Maksim",
  "lastName": "Tikhonov",
  "messageCount": 410,
  "username": "tikhonov_azure",
  "id": "7398785517",
  "remainingTime": {
    "$date": "2025-04-11T16:23:30.831Z"
  },
  "spamInitDate": null,
  "historySpamBlocks": [
    {
      "spamBlockDate": {
        "$date": "2024-12-09T08:15:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2024-12-29T05:15:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-01-20T11:39:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-04T10:26:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-08T08:12:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-21T05:46:00.000Z"
      },
      "spamBlockDays": 7
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-30T11:17:00.000Z"
      },
      "spamBlockDays": 30
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-06T13:46:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-10T14:39:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-18T06:04:00.000Z"
      },
      "spamBlockDays": 7
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-12T18:33:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-16T05:13:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-26T11:40:00.000Z"
      },
      "spamBlockDays": 7
    },
    {
      "spamBlockDate": {
        "$date": "2025-04-26T15:41:00.000Z"
      },
      "spamBlockDays": 30
    },
    {
      "spamBlockDate": {
        "$date": "2025-04-04T10:04:00.000Z"
      },
      "spamBlockDays": 1
    }
  ],
  "nextApiId": 2496,
  "twoFa": false,
  "twoFaDate": {
    "$date": "2025-04-10T12:58:16.231Z"
  },
  "automaticCheckDate": {
    "$date": "2025-04-12T13:04:03.200Z"
  },
  "lazyCheckDate": {
    "$date": "2025-04-12T09:56:55.115Z"
  }
},
{
  "_id": {
    "$oid": "66dee234f856541e1b71cac4"
  },
  "accountId": "1722796228-support-500-last-9-sep",
  "dc1": "8de6c9a912605bd6c2ac5345fecc608590117f8819a6a02d731438de277a6a8510d42bea8d38ee2f1c07e495f9f5a4e25d50c2b42f71bb66e5eb4f5924b7915160513756ac01ed51da7fe4c33a6ca216792858808ceb84a8e105da83bdf863b12af9069d926dd8b68b37e52d528656e7a1b820ec7e36b6e6e493dc6ad61ba0c46dc20c544d9ef9bbb82c7117c20deaefa445771bdb6bb2efe94b3f25dda79b340bb0f42c0277ff26976555e72223f78aa10aa1be4c8f4aa0d40ff00faf09dee9c662fa0021279d5406234f98da5169bb6d2722815f1f37ae9cf038a5343d6a982ee2fe8c7664616efda1ec96cb160cee9700d6d8cde01e674d1a11b4df27354a",
  "dc2": "2a3ac3fbc7b4cfe12cb741dd6e319b40a467a6f791d5b6db0a7be8cfb593e6776f980c8b84d22f6cacc8a243397100ca6a6e4278ffaa7eb396426b261c6d299bf45de53533d185abb5b5274765866fcaad641e55b1d0ad1b9cef6aaf200816e9e0aa5ac66540b0a629e8e319387cd48704d51480ca3a519c1baa790a9221ea5c0d9f4333a410f8323991735546f74f5094e1a9fdcfc04342aabf5dda098597d13c67f8130dfec155a41a3498ae7cdb99faca9e5e58d2d2112a8edbe0fec107b04d04b2f2c5e11a051e4a6fda585b900c50a2302446bf3acfd5ae1c0444f11a6633fb64b1034f28534a7e099565d0e580a27339b5d32651cab0b37a8f73be481c",
  "dcId": 2,
  "banned": false,
  "dateUpdated": {
    "$date": "2025-04-12T13:05:03.768Z"
  },
  "firstName": "Maksim",
  "lastName": "Rostov",
  "messageCount": 497,
  "username": "rostov_blank",
  "id": "7329584623",
  "remainingTime": {
    "$date": "2025-04-11T15:57:55.283Z"
  },
  "spamInitDate": null,
  "historySpamBlocks": [
    {
      "spamBlockDate": {
        "$date": "2024-12-01T08:03:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2024-12-07T11:46:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2024-12-13T08:15:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2024-12-25T12:29:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-06T05:19:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-24T13:00:00.000Z"
      },
      "spamBlockDays": 3
    }
  ],
  "nextApiId": 2496,
  "twoFa": false,
  "twoFaDate": {
    "$date": "2025-04-10T13:49:42.461Z"
  },
  "automaticCheckDate": {
    "$date": "2025-04-12T13:05:03.768Z"
  },
  "lazyCheckDate": {
    "$date": "2025-04-12T10:10:06.398Z"
  }
},
{
  "_id": {
    "$oid": "66dee235f856541e1b71cae4"
  },
  "accountId": "180-support-500-last-9-sep",
  "dc1": "5971c0e74df7c480f7740fce40079b276088813ddf34acda04bc77766626faad27030cd763ecca22c79d11b91186f30ec3b344ebaafab313ba9f95d602b59a96530e0b3d6f5615ff2218f65d0b8d8293ef28707d38d6db17d455c23dd9d66e53c4a5d215ab4c2e52f9c9a5df01a36553d484d407a42067f971878843fbad7368f41c190f5531a9446162c013f1a3e7c7cdafce6d1ffc131fd74e63c12de94f29695e87eba8bfa303742f78605028e78df91e9171605dda483e1116700115f21f9a11c4de226c0d7fd384b12331811b4e51edc0053a224c3a1530dbef4f45f64a06660ebdc1034b2e0805da93ab97384edeb1f556c38bbfa43fe45c837c46b01a",
  "dc2": "44a1e7ff96cdb216acf2741cc2dec5f19dda2f2d34cc61ff5f3b56dff23678a6b69d533a5cdfdf83f7d831aaa64ce223df684f992b89a4a69a5137abb70e1394f18b075cd7bb33b821b9dda41446ff11b96ad3a1cf2e137b71a1e837352925477999f4bbc75567190aefdc264a382fa572b4988078b0ff58f40f234356076042d4c2f16c151a9ba2a18eb017da57d124c824c7d9825052b0af8c97b7b92cdcceeb5a4e95987c896472490aac0312c48bcea1239f7c73d13839572b96bc65732ce450a81851c679625e206611dd173c3b4374af64879e9c8c79c26c6707f328d0b9eccb09e26fbe36528bc7e42e8dc57883370ea564be6a623febdc7bc053754b",
  "dc3": "3a129a1e369e318a029a4a47a2e2e11fea4d0c3d38fe1fae8fe702ac579f09e6dde2d65bebc041a6f219d4e217e9f6c980daffff3a2f2ce186332800d26c87735071659d0c78eaf3356cd26ac1343443d7e46eff272d558c6b8cfb9b5484e9ac15c8efd360e2325927be17ffe5385d4f22de592aba8a89f60036d17bfaa8ae34a8a61be61cfa9c3eca346eadfd42b2b10ec9077e947c8a9acc3e0de57837310eb69522aad25c8129fb6c11dce5bdd9f24b727cf1685011fae9191fdff0319d8f3a129aa0cfc8d7755ac291e66588b2b8251174bcbec4cef9c24fc94f24658f418a4200685ea14948f65793b2dc0088765ecba650448ebaa81d9a2620bc01e818",
  "dcId": 2,
  "banned": false,
  "dateUpdated": {
    "$date": "2025-04-12T12:21:51.059Z"
  },
  "firstName": "Victor",
  "lastName": "Samoylov",
  "messageCount": 231,
  "username": "samoylov_particular",
  "id": "7387360313",
  "remainingTime": {
    "$date": "2025-04-11T16:56:12.756Z"
  },
  "spamInitDate": null,
  "historySpamBlocks": [
    {
      "spamBlockDate": {
        "$date": "2024-12-05T10:05:00.000Z"
      },
      "spamBlockDays": 5
    },
    {
      "spamBlockDate": {
        "$date": "2025-01-04T11:09:00.000Z"
      },
      "spamBlockDays": 30
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-11T09:50:00.000Z"
      },
      "spamBlockDays": 30
    },
    {
      "spamBlockDate": {
        "$date": "2025-01-23T11:19:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-01-27T02:29:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-01-25T14:50:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-01-30T07:08:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-01-29T09:48:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-01-30T08:07:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-02T09:15:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-09T12:05:00.000Z"
      },
      "spamBlockDays": 7
    },
    {
      "spamBlockDate": "INFINITY",
      "spamBlockDays": 0
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-08T13:57:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-14T01:43:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-20T07:20:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-22T02:55:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-27T09:45:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-26T06:04:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-01T12:15:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-11T19:17:00.000Z"
      },
      "spamBlockDays": 7
    },
    {
      "spamBlockDate": {
        "$date": "2025-04-11T06:55:00.000Z"
      },
      "spamBlockDays": 30
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-14T13:10:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-20T07:21:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-20T16:52:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-21T07:06:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-29T14:42:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-04-01T11:03:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-04-02T10:21:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-04-12T09:29:00.000Z"
      },
      "spamBlockDays": 3
    }
  ],
  "nextApiId": 2496,
  "twoFa": false,
  "twoFaDate": {
    "$date": "2025-04-10T12:58:33.266Z"
  },
  "automaticCheckDate": {
    "$date": "2025-04-12T12:21:51.059Z"
  },
  "lazyCheckDate": {
    "$date": "2025-04-12T10:41:30.153Z"
  }
},
{
  "_id": {
    "$oid": "66dee235f856541e1b71cae8"
  },
  "accountId": "181-support-500-last-9-sep",
  "dc1": "61ca6a813202cf52673497e7c5865b7edb50146ae9c49a61ba475f54ff25f89684f6fa7619f9879ea2ed4b3a8b34b6e3d7f6ea1152c929bdf77931ab5d96c7e904e98b83a5c59354295c569ec664fa66e1658b574d2a5872156d47326fae220f815c63d19ee1afc07a5b3aa4afa27eb3aab00b231c91d2bf24cc12d1c9a26a8c936d84c5275b4dfb625294ee0a8f3fd8563e324cb84023b2a8992720587b97755b3152f4127e41e6c692c78e40a9d09580f3de90acc8173376a8def93b04a7852365685bd30c97b0941f7ad8c99ee716ddce3447e3160ac78a31ae5b66f6121517b1ba34241dc6a8209d85aae8b8ac98c866ac4a2ffd05c259b13d3bafc0f0fe",
  "dc2": "56bb97da3000aaae4342cd7605591363f31ec4ecd809cba85080206c62308c916c709219ea403e3133da27f77e3de5b66015bedb8c09249d8cd84c0a4ba34879d3b0e664fa8fc555f8643a41d46295e8491e42c5b74d7bac98f02afed2626a58320ee8756677dd651ef468ce76b2cf116dc426dbe7ec72c574f08f4f882fecb5df8b1c8141d56ea74a569be1097ab4167669b44ad481fe0256a3c4330cc4da71bf2bc8da1654f19d9e6130981d984d97eae581051e5c3d15a054853bbee7726eb60b7fcac77a0b828dd1fea2e3dce8ed8ff996b890775b1276a7141ed858cd72c6b715f3f008915f0d597da60206f46302a80fa1113eb62aced32884d904e5c9",
  "dcId": 2,
  "banned": false,
  "dateUpdated": {
    "$date": "2025-04-12T12:27:01.742Z"
  },
  "firstName": "Nikolai",
  "lastName": "Demidov",
  "messageCount": 300,
  "username": "demidov_unemployed",
  "id": "7416441188",
  "remainingTime": {
    "$date": "2025-04-09T12:40:31.148Z"
  },
  "spamInitDate": null,
  "historySpamBlocks": [
    {
      "spamBlockDate": {
        "$date": "2024-12-02T05:39:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2024-12-07T11:02:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2024-12-15T10:30:00.000Z"
      },
      "spamBlockDays": 7
    },
    {
      "spamBlockDate": {
        "$date": "2025-01-15T07:23:00.000Z"
      },
      "spamBlockDays": 30
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-18T14:16:00.000Z"
      },
      "spamBlockDays": 30
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-01T04:59:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-08T07:25:00.000Z"
      },
      "spamBlockDays": 7
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-04T05:37:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-08T07:39:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-15T09:56:00.000Z"
      },
      "spamBlockDays": 7
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-13T05:56:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-16T12:12:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-25T08:24:00.000Z"
      },
      "spamBlockDays": 7
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-26T14:08:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-03T05:56:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-10T09:39:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-18T10:52:00.000Z"
      },
      "spamBlockDays": 7
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-14T15:28:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-20T07:22:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-19T15:30:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-24T09:57:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-24T12:12:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-29T05:56:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-28T06:29:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-31T09:04:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-04-01T09:28:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-04-04T10:05:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-04-12T10:49:00.000Z"
      },
      "spamBlockDays": 3
    }
  ],
  "nextApiId": 2496,
  "twoFa": false,
  "twoFaDate": {
    "$date": "2025-04-10T12:58:33.409Z"
  },
  "automaticCheckDate": {
    "$date": "2025-04-12T12:27:01.742Z"
  },
  "lazyCheckDate": {
    "$date": "2025-04-12T12:27:01.310Z"
  }
},
{
  "_id": {
    "$oid": "66dee236f856541e1b71caf2"
  },
  "accountId": "185-support-500-last-9-sep",
  "dc1": "0a1b2d88d3d6488cfabf08971c8f861d805233cee1efdbfd75fee3fcade97072a077f2fd321236339e27c57876a18ba34748ecd58c247f13b7740919d0986c77c465be0b56729e13f72d2eec7f24e936cbf639afcac35a5bf0d688841e71868ffedf6c7be0eb63ae98eed75e70714ab45bf2e0dff789c67ab885d7cd51f42c2b6de0de3b8e5351139405f1020fc212071f9b1ff61bf2d10ff0c2ca464c36ab339a47ef6b5a685b66312560f589442afd61788d4a9d1efc52692d16b8388e4b91c4b935230b584f69337533ffc429e557fa0240c1ca5950b0b407b2b5c102c33a3ecdcaa5c458ae47567716fc2ad64eb00907310e8eca67b35163575503df2587",
  "dc2": "b3d466b62c6e221351bb1bc60e29939c0492e8c8df8b038a7489f4eaa11870c12731a578de34802744469af8061343ff73d048459502ca5df36a57ec04a9090de2310d850b53f5c621fa92ffe075dd68585107f2dcc1ff011a572d852d15d11b11eefeed6881507038581ec767398a66ba4c4f7e9a3ee264c068ebf325580da7454afbd3a2729df196b1516759f053a1eafdbe1d9b01d04f9e837fd4470cf120e2f17eb127668e29f5c056414bdca4d48882846161fa252b4122d886e698e029bb8a14e2a4bd2e45a0b26cd4db130a5225c789f4d0322e5218f63da182a4415d7abf90d7d655ea08ebf4fe4025cc7634d5c3027f0fe95bc490b72155d08fac38",
  "dcId": 2,
  "banned": false,
  "dateUpdated": {
    "$date": "2025-04-12T12:59:03.001Z"
  },
  "firstName": "Valeriy",
  "lastName": "Morozov",
  "messageCount": 542,
  "username": "morozov_wrong",
  "id": "7441274208",
  "remainingTime": {
    "$date": "2025-04-11T15:19:13.822Z"
  },
  "spamInitDate": null,
  "historySpamBlocks": [
    {
      "spamBlockDate": {
        "$date": "2024-12-04T11:54:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2024-12-29T09:03:00.000Z"
      },
      "spamBlockDays": 3
    }
  ],
  "nextApiId": 2496,
  "twoFa": false,
  "twoFaDate": {
    "$date": "2025-04-10T12:58:34.724Z"
  },
  "automaticCheckDate": {
    "$date": "2025-04-12T12:59:03.001Z"
  },
  "lazyCheckDate": {
    "$date": "2025-04-12T09:16:04.769Z"
  }
},
{
  "_id": {
    "$oid": "66dee238f856541e1b71cb36"
  },
  "accountId": "264-support-500-last-9-sep",
  "dc1": "849b2c29d1506d1e93c58f3ff926f5ee4b08f06d3c875e2f908400268de3b5d386f014b7cc51d51e0393c6739f75d30821857fac5269444eecbefe8b8fc6f6fab69ce4663e933845c242842a3f48dff807db55cc3fa8d826893aae13c7ccd866a1428d001fa575bad16c4122dad6dd689a78c4c29a8ad19fb3f13bfb7e57d3989ada811aa6c7c8ac4d3b2122365478ece065c9675bbcd0422381dccbc61ded7a82253e52a988671dd41441884ae8fa93d2e6d7f8f91cc3c99bfbfd0137b3f1c50a50c10874c78dd4ebd3c230e95858753faa71f5e401a01a6e07d4c879465385d8b7cc87bb7e5d3fc2cfa3fe18ce37c076f9fd2e881ce2f2ff35a9623d91ea18",
  "dc2": "2871c61c3911b965ae2ec883b18a752de9d1e02f115173e70565cb1b1abbe053651e62b59cdd6391b64facde37db903ae51442b19cf64c36ca9c4a0c77fec21933bb97733c8ddbd5f6130777080cf5496e78d6cbef0a2035f39752c4a9516673079a4a26c14b0d22599198dbe8e9a2107f5e1cd958ab004f1b03c4663d1a6d9faea3f1ebb17b4c2b9c905ec0d4f6a5051a91ecc63d17b89634df77e7514cf6e7c5e53590e2f63d3a18a9548759d3f8bfb4f9d8173f1b8b1e9ef23c864d411d342b6ce6b086c274a0b9e61512dd0f7922d3d9a9ed554570619abe751c1ee6a4adb51ec12df8d17516cdb71097d2a58c78868f8e324332b5cabc180871b45ccf6d",
  "dcId": 2,
  "banned": false,
  "dateUpdated": {
    "$date": "2025-04-12T12:59:10.060Z"
  },
  "firstName": "Victor",
  "lastName": "Borisov",
  "messageCount": 431,
  "username": "borisov_surprising",
  "id": "7275974953",
  "remainingTime": {
    "$date": "2025-04-11T16:56:31.614Z"
  },
  "spamInitDate": null,
  "historySpamBlocks": [
    {
      "spamBlockDate": {
        "$date": "2024-12-17T13:39:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2024-12-24T19:40:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-01-23T15:19:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-01-30T17:26:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-05T15:50:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-08T10:27:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-09T09:53:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-12T05:10:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-13T06:14:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-17T10:03:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-27T09:18:00.000Z"
      },
      "spamBlockDays": 7
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-29T12:39:00.000Z"
      },
      "spamBlockDays": 30
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-12T07:24:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-15T06:35:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-04-01T09:20:00.000Z"
      },
      "spamBlockDays": 7
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-28T14:45:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-04-03T13:31:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-04-10T10:20:00.000Z"
      },
      "spamBlockDays": 1
    }
  ],
  "nextApiId": 2496,
  "twoFa": false,
  "twoFaDate": {
    "$date": "2025-04-10T10:50:16.965Z"
  },
  "automaticCheckDate": {
    "$date": "2025-04-12T12:59:10.060Z"
  },
  "lazyCheckDate": {
    "$date": "2025-04-12T10:45:28.289Z"
  }
},
{
  "_id": {
    "$oid": "66dee239f856541e1b71cb45"
  },
  "accountId": "269-support-500-last-9-sep",
  "dc1": "591c514976093e77649b843818ba38c312444b398ac8ebd992109ded6142b757c96ba7c4416f574abe50c64df86124e8e2efd1e6ea2436eaea00f761685cbd2305532b60812ca5f5e1afdea373ce7c9915972709d55e1b5be5dcd4597480eca514bc69196bc48470ab6a8e5b7ac574368aabeac3f243f55417dc8fc5d52e2ab3b239bfcc4f18b3c450e9338f9695653d5f9ce295ea9091b06e44472fe8f705e3138cb6eb6f5f7640bcf38a61bc9a009cfc13c803fb778b68bb3e94388d4aa1af74ff0349366df546b7b14757fffdb901bd97c2be02ae8243f2279ff31d0c1e5c86e662f9e98cbdbe45fe68db2d8f5b89a0fbb8d6db2d877c3664a60b68b173a6",
  "dc2": "7a95fd906eed4e58bdba5d5dae6e1daa912d08c98b45515cd404f5576defc4f8b0db7bc19432223df40eaddfe3708b370b8e0af430582ab55751e21f046b19bea65aabf030ea2ae113641c9e01441614c66f2dd1882101485a16809f214a930b8bf83ec5b8b254ca964e5f4b1de6a514d3df6f7363ab8f2fbb672904535991dc6a54c4f4d128da2f4b15c42c218aea6cb15f3e91bf9eeada735352cfc816309c065aee2a1ddcba5a141c033c736a4ad0059428d22a862fee3f84b7f55a9f01ba3f477a82822a9bc5c4c87aded2b98ce3dd1c671b3b84de3837095cd120513a9e92b345b719cb94b5981274aeac8dc0c0e7198895fb59d1c351973dba3ab29d2d",
  "dcId": 2,
  "banned": false,
  "dateUpdated": {
    "$date": "2025-04-12T12:16:09.624Z"
  },
  "firstName": "Vladimir",
  "lastName": "Frolov",
  "messageCount": 451,
  "username": "frolov_unacceptable",
  "id": "7432889109",
  "remainingTime": {
    "$date": "2025-04-11T14:48:56.832Z"
  },
  "spamInitDate": null,
  "historySpamBlocks": [
    {
      "spamBlockDate": {
        "$date": "2024-12-09T09:13:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2024-12-16T07:52:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2024-12-17T09:13:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2024-12-24T19:22:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2024-12-29T07:45:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-01-25T12:56:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-01-31T13:15:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-26T13:01:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-01T13:18:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-10T09:57:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-21T11:59:00.000Z"
      },
      "spamBlockDays": 3
    }
  ],
  "nextApiId": 2496,
  "twoFa": false,
  "twoFaDate": {
    "$date": "2025-04-10T12:18:09.458Z"
  },
  "automaticCheckDate": {
    "$date": "2025-04-12T12:16:09.624Z"
  },
  "lazyCheckDate": {
    "$date": "2025-04-12T11:46:48.015Z"
  }
},
{
  "_id": {
    "$oid": "66dee239f856541e1b71cb51"
  },
  "accountId": "274-support-500-last-9-sep",
  "dc1": "84a8367997b597c6df21d9405b551787ddfd2115f39b3feb8579a9c4589206509b687c5ad48f68f1db9fb6913a7ae2d19ff8e6c696e049f998c18ad53c21af03198c1e84265bdf1597c75f9029078032d3762ace1f729992dfb86a84126833af6a39b589c61c842bd20157bf0a55e04533883ce48c38fd948a1b2c9deb68c5220a69c97b4c615f4e4bbc57f5b98e227b6cc7c2e3bb0b743014180ef1979cccf7eea72018285629f9a4c2f6c3a9ad67751c6ac0cc1d142d4ba2c2e389ac4acf156e7dd0d50798451b3b0ac041b63e5d53a0712af9a3b5b519ed9bc2af070578ef1bf4235e54628b4132451dc101784363e6da431f0c9e69a6aed0ab72d9ca354f",
  "dc2": "8f74a7259669a41cd6242efeaf49d39badfa99c05f5e191a646bc17bb86d063393364762610a4657028d15c151e5fa073dea8abc46b67e9b3eda397437b6c4eb52f8236e5a951eed6ec368f515c09ec76a3c9885a36127a35fffd0e0e2c5a9d3e665665748a4100d8a733d364040bbea67b77e39ba18b07c71bd7c62bdc51e42d7614cec6fb0208dc61db3b5b5c563d0d4fb0cc9b6b3f6ba88dc1c470a4d400995fba7e3a06d820a18d66cc64af8d5532432df70f9a0cf38685afcee0b19e3734dc81a1828c085b4bd5b9a17c0c105e95525d119fe0d618cedba9c20e225d5467ee1e21c1753dab02e0cbd6948051d1fc3d9c35f1f11a75afaef14861095f8aa",
  "dc3": "77ee081919dd6b1e3b925e642afbb51540b543708d54c3ad12e88d46d97fa76ece2141837c2505d367dd0adef84b4f7280e346fce7564740df84f953d1a4413e45bc497c6c365e32ddf4d0b08e3fd2dd824b6e4495d8e0f729c591fc9e54ea8b2ea579fb3b56d2a7b8b0701dad833dd3c7251294cdcccbca5fa4426bc66d2efeca084803b1b7aefb18e9906340986902235b6f25cdcff3b2505faffd4b8cdc4639fbb748d8ea29fbd6a2e38c924a74858676bc39c24af26cd2246d0d7558c193a287494140856389052a3f34174759498997554ba8fa1cfb2c274031ece5fec5b459e9256dea5f3cbf92ff2a1cf91cd3a08425b49707af62e7a0352526cb2e56",
  "dcId": 2,
  "banned": false,
  "dateUpdated": {
    "$date": "2025-04-12T12:28:09.690Z"
  },
  "firstName": "Pavel",
  "lastName": "Terekhov",
  "messageCount": 447,
  "username": "terekhov_repulsive",
  "id": "7440378886",
  "remainingTime": {
    "$date": "2025-04-11T16:20:10.630Z"
  },
  "spamInitDate": null,
  "historySpamBlocks": [
    {
      "spamBlockDate": {
        "$date": "2024-12-18T12:56:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2024-12-29T11:40:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-01-18T08:04:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-17T13:18:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-28T12:58:00.000Z"
      },
      "spamBlockDays": 7
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-25T09:35:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-02T09:42:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-06T07:40:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-13T23:39:00.000Z"
      },
      "spamBlockDays": 7
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-12T14:28:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-16T06:35:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-25T18:21:00.000Z"
      },
      "spamBlockDays": 7
    },
    {
      "spamBlockDate": {
        "$date": "2025-04-25T21:30:00.000Z"
      },
      "spamBlockDays": 30
    },
    {
      "spamBlockDate": {
        "$date": "2025-04-03T12:49:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-04-12T15:13:00.000Z"
      },
      "spamBlockDays": 3
    }
  ],
  "nextApiId": 2496,
  "twoFa": false,
  "twoFaDate": {
    "$date": "2025-04-10T12:18:08.564Z"
  },
  "automaticCheckDate": {
    "$date": "2025-04-12T12:28:09.690Z"
  },
  "lazyCheckDate": {
    "$date": "2025-04-12T09:19:00.313Z"
  }
},
{
  "_id": {
    "$oid": "66dee23af856541e1b71cb65"
  },
  "accountId": "284-support-500-last-9-sep",
  "dc1": "c501afcb00805eba8f253aecd4770016840b8d9cac8e002fe544a1a7f2c74686cf8f89469c6af9e1380910f0c3f6d288f8baa13b50975dc5bc4b5a0130a2632ab065f9912b117da7e8945c94dfff03dd66456ef79be20645e871f2861b089c69e58fd55dacdc6daebf66872a1d7f2be7f273c8fe6e42b949386fbf372cdc749cbdfbb9ac491d3a07adcef4b3e9006f8fa4e3893cb7f8f4d881976b7496567d149c8abf9c9a53ee5ac396aa9239e4f0f26276db60629d26dac5f238a70796da6d244705bc9badb4cc326eb0f66d6eccc20b2d11b2c155dc8a525d6d76ad76c4c290acd51c927a215cc7f4a296a94558ba4ff3db0013097afe9a7476822a14c684",
  "dc2": "49fd39e2aa96de05850d02f19e3b161d8c4814b0fb7b27ebbb1f7e454f3a2212c4eed25178684b3b0fce17ddba0002b79e2d5f5334e9c973b1c250bcb58bef7d2648d19727135510f9cdf5209bcfad45a174871c3e7e2d3f6990bacf1549949c1f4d19fccb7ab45aa30ce8b08232f06b2fbfb55995884ada29d81e50c5f8b2f6707576a778d47171238fdf79054ee1689133bd97878a4fd78bd17a9fd652804b17ef91e7923d797cdb9f1d1315a6db808a5a3846dd43bc2bb300e50b238bb889acf6d04257cbf8856c0bbd6c9c169ca2172885f593b6fd41f07355a1887ba362c23221a60966d96ab8a55e3bdb60498b2187d379ce5fb15501ddc62e69b47bbb",
  "dc3": "11fd661dcad42987d0913f15cadaeaab26f4425a6835242e1556c0f693388f4856224b413449de469bd8a7ab6754c0e9011fa875b94111db2997cf6a1e1fffb024d841c87796af7d938bdbbd0c37801de003c3644c5a8429793d51bae6e7d117f55b004e2d3ae605afec83eb962f177f2f95b6f13d564a12ad5fc7027317825d385adb22c856c3c59810c8a17f1db9a660965c955a96abbbb6e215845b77bcd9352e3fc15b1c499bbd4cf5125207d49a2341a729b469ad18bddbbcacf71a20a1e13def8487b1d0b9d412389293cd9c31ddc1fd56ace3810a2b0f7906651367bd042732a4c72bf99ad65284b01633fff404da27e31fdac9600c355d44e541ce8f",
  "dcId": 2,
  "banned": false,
  "dateUpdated": {
    "$date": "2025-04-12T13:01:09.516Z"
  },
  "firstName": "Andrew",
  "lastName": "Sidorov",
  "messageCount": 345,
  "username": "sidorov_wandering",
  "id": "7411303325",
  "remainingTime": {
    "$date": "2025-04-12T07:01:43.391Z"
  },
  "spamInitDate": null,
  "historySpamBlocks": [
    {
      "spamBlockDate": {
        "$date": "2024-12-08T12:52:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2024-12-10T20:25:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2024-12-15T19:06:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2024-12-19T20:09:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-01-13T12:45:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-01-23T11:40:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-04T09:49:00.000Z"
      },
      "spamBlockDays": 7
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-07T08:41:00.000Z"
      },
      "spamBlockDays": 30
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-10T11:44:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-14T09:40:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-13T14:14:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-17T08:57:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-16T06:29:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-21T12:25:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-03T11:03:00.000Z"
      },
      "spamBlockDays": 7
    },
    {
      "spamBlockDate": {
        "$date": "2025-04-04T15:08:00.000Z"
      },
      "spamBlockDays": 30
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-12T14:36:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-13T13:40:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-17T12:59:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-26T09:59:00.000Z"
      },
      "spamBlockDays": 7
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-22T15:02:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-30T06:49:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-29T18:54:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-04-03T14:12:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-04-14T08:24:00.000Z"
      },
      "spamBlockDays": 7
    }
  ],
  "nextApiId": 2496,
  "twoFa": false,
  "twoFaDate": {
    "$date": "2025-04-10T12:18:09.275Z"
  },
  "automaticCheckDate": {
    "$date": "2025-04-12T13:01:09.516Z"
  },
  "lazyCheckDate": {
    "$date": "2025-04-12T09:57:03.457Z"
  }
},
{
  "_id": {
    "$oid": "66dee23bf856541e1b71cb77"
  },
  "accountId": "295-support-500-last-9-sep",
  "dc1": "88a0eec8413cffff07f5aa55a04650efd3f391cc8da19274cee2ec0f905120696f4253ef41b3ba60a015ecc9acacc266720ddf1eed60cdcdfafdc09bb6c8d963df733e6de9ebeef79fd315ccd7381f7ace27e604b476733c1fab1371a764186f48ab53b9f41f10cac3014ad87f27d6adcbc759b87a9d64b37206344ec837183533cf19a6f49e6cf085632d1967b1a3473a2bd9acdba3f931e91c37a3422b3651b456026bd7fbd11b97487c87d61d8031a1901a75aafdf106b1c6f96eac5cb3767b140a2652be5bd324afe0051c05c318f44b1a1e945c1845ff9e78517001172f2f2e303b95d65f329539f0e5b217dbec7facab58a6a08d2d22cead43e1b253a1",
  "dc2": "9037e0dc47714e03a5df145ee23709ba00b024146f5436b14daa013ceac9f837e98d37a7f5d670bebe89747350fd3b38ad4579ac950bc53ddfd38ff2cb7ddc65f6f31480ee86e1d50bd268a21be5ce95013c462903aa3ed963cf3c6549d2aee52694badae9d95d25107ee4d6830617d37dfbf8df1be105cd2b6c3175d833fbe30f8f796d848ccba0594182de448022a5f4b2ce73994f687d4fd98ec1c5cf2f574eb01d623427a35c8173067b514728f9ae9dbe744e5ba970d8e08308a561e5940df82c8021efbd355c7b606a3379aaff9257b31e938167ab635df94f41c04bf372d67674815519e9c9dcfba88d3a821b820aa801caf9352bf2ec4449bb779a83",
  "dcId": 2,
  "banned": false,
  "dateUpdated": {
    "$date": "2025-04-12T13:08:17.819Z"
  },
  "firstName": "Vitaly",
  "lastName": "Mozharov",
  "messageCount": 517,
  "username": "mozharov_favourite",
  "id": "6686881355",
  "remainingTime": {
    "$date": "2025-04-11T16:52:11.387Z"
  },
  "spamInitDate": null,
  "historySpamBlocks": [
    {
      "spamBlockDate": {
        "$date": "2024-12-25T18:16:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2024-12-29T07:03:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-01-29T09:09:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-11T06:17:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-22T07:26:00.000Z"
      },
      "spamBlockDays": 3
    }
  ],
  "nextApiId": 2496,
  "twoFa": false,
  "twoFaDate": {
    "$date": "2025-04-10T12:17:51.667Z"
  },
  "automaticCheckDate": {
    "$date": "2025-04-12T13:08:17.819Z"
  },
  "lazyCheckDate": {
    "$date": "2025-04-12T09:16:05.629Z"
  }
},
{
  "_id": {
    "$oid": "66dee23df856541e1b71cba5"
  },
  "accountId": "+79123964724-support-500-last-9-sep",
  "dc1": "bd802c6bbdae521e13a869f842adfd1def374cd7c5fb2e7814aa3145c10f530467976abdb4af70b5ebbdf73f2ccf2b45555d9fbd8aa0e461a2bffeb38a89c9cfc038df488dae7090744deaef2665d26d8a4224a8b8f7621e7aa385194e2be61f8006e6047c8fcb12b93f405589a2452fbac820ed6c8056f3bfff3b5be21f688b45dabbd7cd97856f2a62f2cd2d82d355c860150a1a25478645bce5e40de769c3beda8fa8a822172131bb5cdcd4c26142616c780b8b9990245680b8cd55e1e17b79d56b4eb9c423c9e349a80f4a13dbf4917c1a3cd01a4993f79fe28ea65ee93ca2cfb4344bf26fb11024ec9db22cb2e016e1c8bfed6b9ade2f9b76f5663387dc",
  "dc2": "19f3325039ef8af8bb89806661ec9cf1a15283a6bd61b99af8b2b26669a836f0d2df3c64a43d10ff0db3755576706df52cac8af38819b06b8a36c1d6a298f0feca1e72da4cc49c6a4ccb0a110e09f5400b1d80d5eda7c64598b6ea711c9b13833559a266e4d3c933f3efa7b97ad476c714abf3e9659b5c8117c9ef267ecbad1336a0542075f1473ea0d175e87b7111aeded57a5b7bd57a7537a6e361578b047ae110a1704a79c2d76f0c954ee9483a4f36318c3cdb2760990d612c0297d8a31e7f39771a8bfc7ef90e7f2ae82c6c4387f5650cb7cac038257725c28f3ded67fa3d513afd5cff025d9709fad0ef3ae6624409059cbccf98639d6b23bb8c6ffdfe",
  "dc3": "0b92c79450e50cca2ac15746c92a9dd42a85c8528bcd7d895a3bda3d79de0c4741d1f7fb47815a6b900662a843c8e386813ba50fdb042f2bb8ab6918e0525966e97112d1ea2a09aa88abcffd31587955df34812d5a2729e4260e79127e0ea1593ad62fee2fd87985a656b9ab5bab210f8c17c4931dfe86a22530d4f98e499692752cdd159800c22a022a24f059686f982414bb2baca92e2bab53dac19a18015e55c990ac03a1487bad620353d8139bf72851d1a18387451d0ca65075036e75ead142f6c6a219667ebeaaeecb3ca66aaab00e09a3d17cd512a9f70c0608ed1bacb7e95fa879788280099aab189fe4e03a704606c08fcfe87c2e7428a1d1d58ebd",
  "dcId": 2,
  "banned": false,
  "dateUpdated": {
    "$date": "2025-04-12T12:40:17.178Z"
  },
  "firstName": "Victor",
  "lastName": "Ilin",
  "messageCount": 515,
  "username": "ilin_evolutionary",
  "id": "7386395777",
  "remainingTime": {
    "$date": "2025-04-11T14:19:18.126Z"
  },
  "spamInitDate": null,
  "historySpamBlocks": [
    {
      "spamBlockDate": {
        "$date": "2024-12-01T11:07:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2024-12-09T05:29:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2024-12-11T15:12:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2024-12-13T13:03:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-01T19:46:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-09T12:38:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-14T16:26:00.000Z"
      },
      "spamBlockDays": 1
    }
  ],
  "nextApiId": 2496,
  "twoFa": false,
  "twoFaDate": {
    "$date": "2025-04-10T12:17:52.358Z"
  },
  "automaticCheckDate": {
    "$date": "2025-04-12T12:40:17.178Z"
  },
  "lazyCheckDate": {
    "$date": "2025-04-12T09:19:11.583Z"
  }
},
{
  "_id": {
    "$oid": "66dee23df856541e1b71cbab"
  },
  "accountId": "+79123964833-support-500-last-9-sep",
  "dc1": "79ee53f862a7fffd3fd4d5adf5cd313d226d84257a6c7d586f3ee6218fae0cec8229bb0b77fa0a5339dc856f9bfa815ce02ce6d98ffb3d452926c0638e50cfca1e330f90fada2c5e911eeb2abd8ec93c71bceabb977046d19aaaceb045f2ab47aa9909e363dc06a209766abd10c56b4d138314caf0e5f536494b52d1ea5d982c67bc462d6b9f59c6c92a2a89be2714b1dab7c0c7ffe3489e374fec1f91947439b01391d77b029198a92f8e08de4f3f4949a11047eabcea3a5f417ca0e8e2e94cfed01fcd7846a042b70b8e76f5d9ed44c0e4cf2775574339c6907c9be6b79a72fe5707c8f8c96897fbf2ff3675cd4cd256c97742169a2ccb497c0517a3580313",
  "dc2": "a5a393c8c9d01e3e0103ad2f4c9413da71884b673c88c0695000ac69086b0a9284a0e9e57669e786610a4a12f1770047adb8bb1f94398315886def487b9f7482b9072aa1d9322bbf2d5e02090da693d4c461629ce7dabc09184309e1c91a423fc739bd190c4e9d7249559208618189f8ed23d2eae14f22f39ef2c37bf8f9dcf4cf14d231c0fee0d86ddd041045b57e64dbd6d49328f90b3f8dff3037b033f0bdd91100df73d2838e905aa411701ebdb5bd9a532a8f0303aa6391d4feb0932724e9fd173fd970433c7b2ce9eb428d21f062f71ada5e5b222ae0ef08dfe5ec6aacc6f52581ad1cbf94c0c8a70ee176bc5e3fbdf46db7e945a98b03c43c18bf0a60",
  "dc3": "9d59293c2756838be40ddb8597325d26ea54332c9644e79775b5e0692d992bdbb2dd2fb9ecc643dba4c2d42759cb62e15fbe79874967fd8cf9267795d76ad7e4d4f337613b1384e5edc81f1fd0d50873634aed425481a1b9516c572c39f6581ac66e03453ab3380a761a5a8ef1d6b216b560959fc008aa829d779416e4533f8fc0f74de847e3c9232af9c29cb219a0c7a374d5f07c91998c6a8775bf8bf96517b0cd062253ab1c023c9042333a418bdfe20fc882b1637d0bdf444ffd01cff88b30fce9e06507754fb48c386408c46ca5efedb5295868d0caedbe328dc180b0e33201494f240cacc08f65876822ebc11d8cbe1f3836bae112963274b35763801f",
  "dc4": "a20d3dedd95eb6c0cc6f404f54ba20324172aead091c7e04781d1d141ca3655ba45ea9fae5a416d0c09597f3c734dd28ba71fa0195ced580fb61f6cc385f1f89218454ef44b40b7e6bdeaf28fa3a2c9ead7a1999d15ea5a36a5ab142fc37bdf17e92fc1a6c03091c1f92a8f04fdae282b967346cb4f970fc9e1754f6480404f525bbe17d9212e1a9fb7b392167e8afe324acead319f29d5c2208603aab54e6561d0757a936bb2e533ee51f42c4ea7df7663b556650259932dcce98f4f398422480440b0c792015a679a1f5c3997dc29ad0dedfacde47483a598e833f4d7b8f5d3ecc43d09a2011ae785567c8c9dd2ab63aca1a7991ab9d77ac04802bfcfb7aef",
  "dc5": "84c6ea94829c49ddd77d36e4b7133c6f57c2b44689636fd87380e19de6e4dbaba37a2c92f7f8d52903ec8e1ad3035762fc8ca56341e755759cf512921375b25f04a77b981f71ca0572741f3459f2876a17ce20f2be7f0a18fbbef180eade9d3bdf6ecc5c0ea76310e23aad77d3f010188814c23e61dfeff714d60219712defe50638655e18891f79149a9b65e7f63fd4cfdff8c39a6e8c98973574c591697b171f295ac479f526433b48fc8db0e66b8b92760ba77cc2202986df960b2c9ecefa2faad32d4a4514fb54dd7916d25a2e1fb0c2d2184edd9f216bda935eaa71de44c5b1c04c658f35b7bc506d50a3c52554c43cc631ebb1f060f2b3ac6592645dfe",
  "dcId": 2,
  "banned": false,
  "dateUpdated": {
    "$date": "2025-04-12T12:14:04.844Z"
  },
  "firstName": "Gennady",
  "lastName": "Nikitin",
  "messageCount": 379,
  "username": "nikitin_stuck",
  "id": "6533640410",
  "remainingTime": {
    "$date": "2025-04-09T11:48:35.108Z"
  },
  "spamInitDate": null,
  "historySpamBlocks": [
    {
      "spamBlockDate": {
        "$date": "2024-12-09T08:00:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2024-12-13T08:07:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-01-16T10:58:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-01-22T10:28:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-01-23T13:49:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-01-24T14:25:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-01-30T00:39:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-07T07:57:00.000Z"
      },
      "spamBlockDays": 7
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-09T13:53:00.000Z"
      },
      "spamBlockDays": 30
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-07T11:56:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-11T08:15:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-18T11:43:00.000Z"
      },
      "spamBlockDays": 7
    },
    {
      "spamBlockDate": {
        "$date": "2025-04-19T08:48:00.000Z"
      },
      "spamBlockDays": 30
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-25T14:34:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-29T15:30:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-04-02T05:37:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-04-12T09:55:00.000Z"
      },
      "spamBlockDays": 3
    }
  ],
  "nextApiId": 2496,
  "twoFa": false,
  "twoFaDate": {
    "$date": "2025-04-10T12:57:52.806Z"
  },
  "automaticCheckDate": {
    "$date": "2025-04-12T12:14:04.843Z"
  },
  "lazyCheckDate": {
    "$date": "2025-04-12T09:24:12.044Z"
  }
},
{
  "_id": {
    "$oid": "66dee23df856541e1b71cbb3"
  },
  "accountId": "+79123964933-support-500-last-9-sep",
  "dc1": "7a40c3ed178ea1587c1fa42a9a5838afad8c2f2668eee6d0047e1d39644ab9ae921f28ef7ac7442156ab6f767ad6aa4a08e5d9c9fc62e5c56cf91229d0060224f12a37805aa9c5458a31b7ba94f7a15b01812afa4689468793e104afbc2eeb0e622e1ceaadd4b9f575bc3df3c8a576641724af37a14c3fae96ef6971fc9f49362b0348cfb3113275c5d303117eb4e7389d3a9497a1b3a4f1002125c5fdc4f2f5271448bdd9c8ced5f381ba9519388fe5ca0fee2e2497eda78d2509a1927a93c22b2cda840024f334f02ba4407cd6a7c517fa9a9d5ae340df310811d082f03a189ae49ebff20fd8cff23266c88870e4b24a5b67d3f8033a63588c7c90bccb35b9",
  "dc2": "bce3e44d7730c2d35694f8e60d42fb2ae5b14bc4bc3088154ffd3a249b66dc78cb01434887827f21475e31a9140362eb68f594c0ce42082ab137302384ce0c88982d872d1368d9261a25e9e0ea7f598770d5a3dd33a7f7a37a442fec7e5295da035f32900a93d79a795cd87f54b7851e941ea102934203fc872b96bc5f8b69d67bec0866f20224525fed954c53588a8b52ca286fbfad498f31e06e019138fd07df0e6e97a5bb8c85bf1b597eeb86baa40a4c0fe00531c45127a9288d0312a435039f0d03f4e97882a34a24cc5ddd14adaee3b2258e65786b63e2a335f2e7f9b041afd6a6a2bd87d3fc17e0ef2e8aff35ac6b076c9d093f65989b2245cd28ce70",
  "dc3": "215b20a53b9fe3dd96bb63c96642ced4e21b29ec3471d523569f42e6f4d03b2f6879ef5f57c888944b01fd02997753dad11b8d5c706ea2d5c3aadb7912198e8a08b9af57fbf903c20fe47459f6e80c1fbf78b069f3479e8b127b1df7f4ccac3cfd7f9393bdc5166a87d0f02846f012fd8175a15d1cc30b2059c4cfc80a7bd291a0be7c5592a7996b36e9baee8a81b80afa6e6a64ed06de9f7ec69da4da5f72c2f9ef498f8c81cc6cc9ca5f62f2d96883a8168b7841ab3ca4e3fea72e4ce564a8c4c3a8f3ac52ea0687a41df336bb24b8b622b4a03dfec4f5f24c36f11a400d9fdde11557a815790b62f65a1fc481bd0a6d6dd86ab9632bd0980e83bf619a3754",
  "dc4": "b6ff46eec66f7ad8fb413e0c0181f5751676c84d2bcaf1611f44b2d3e4245ab45bf0520092b14ebfad3aad8d2ffc91f504bbe41498752603ca8fd6353f7124db8ccb0d8626b067bc7302e441f048f74538bb6aa5d2518f0574689b4d0e21563f24334652215a1524f855511f7a1827629b47d26fbab967c84c0d41f33508eff1cd56f7f4e7f0a019899c2b526962b2854c397818b17181218e3e54160b53fca2ad93d6c3acbfa8bf5d9a1a8051708f44b9890fc4a91df374018514daa96a65fb522fce7065e298ced86794df8b75edf9e91171d3e16af4b551fd7e143c14a149e0864ab9d3c3eed34493e32459442db5bd496eb51f37f924ba8628610bc71b1d",
  "dcId": 2,
  "banned": false,
  "dateUpdated": {
    "$date": "2025-04-12T12:20:09.219Z"
  },
  "firstName": "Stepan",
  "lastName": "Abramov",
  "messageCount": 242,
  "username": "abramov_known",
  "id": "7267478893",
  "remainingTime": {
    "$date": "2025-04-09T11:51:04.492Z"
  },
  "spamInitDate": null,
  "historySpamBlocks": [
    {
      "spamBlockDate": {
        "$date": "2024-12-03T09:26:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-01-02T09:46:00.000Z"
      },
      "spamBlockDays": 30
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-11T10:31:00.000Z"
      },
      "spamBlockDays": 30
    },
    {
      "spamBlockDate": "INFINITY",
      "spamBlockDays": 0
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-11T06:19:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-14T14:30:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-21T16:44:00.000Z"
      },
      "spamBlockDays": 7
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-20T07:20:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-24T06:05:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-31T09:52:00.000Z"
      },
      "spamBlockDays": 7
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-28T12:55:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-04-03T11:36:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-04-02T11:45:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-04-12T09:58:00.000Z"
      },
      "spamBlockDays": 3
    }
  ],
  "nextApiId": 2496,
  "twoFa": false,
  "twoFaDate": {
    "$date": "2025-04-10T10:02:10.604Z"
  },
  "automaticCheckDate": {
    "$date": "2025-04-12T12:20:09.219Z"
  },
  "lazyCheckDate": {
    "$date": "2025-04-12T10:36:44.089Z"
  }
},
{
  "_id": {
    "$oid": "66dee24ff856541e1b71cc1f"
  },
  "accountId": "+79526730004-support-500-last-9-sep",
  "dc1": "b0c681b1f0cbdd6e6d6575e1f4bddd9490e59d7ffcacf1642a2efb9040d41c5a6207122d660382fb6eff8dc6032d424175d039806ae1f89eb0a15c0183f063f0ebc27617dec336ec52c6609ba225d9373a5a952a84cd773dc3e0ac3379f93c9bdd0fcb7573f076a8214d0177b50299781bb712c166e0d0c7f7c86e20fbaad86a58ed564e99d88164b5240128435d5d7ffeedd752cb6db33546e013f0ad7d12e717533b7b810534f26c304986cc6faeb64dfe3f0cb5820c5f38ed263aeee78bed9078a92b3a86ae4a979a56c2b4a327b8f402955411fe7a48dfb7860cf3a531598d701f155a9c0a6700c10fc804f4c68dfa56837d09e3fb78a89e382d4d7065be",
  "dc2": "5650d72908b6cf3e599d8b885915b6b1c7dbab281025ef5692ed109267f0f9ae1f46a86cdc270c8dbfdc7e1e7fbb41d28f88a8bb7fb136d2997508e82a85fcb74aca0ec2b44d4e2c0b33b04adf596568cbb716da6e76158e91db4b40b28241f49961164849a7e0abcbd585beaa3098643d1fd7548b3a411ec16297a1a58e651189523300f21b2a8ab5b756dd6d28d41d0efd6ac80bff86d545afb83724f979ca11d867ae12eadf71c0d45ad0eb998af8049d2a5a501396adfc18f376596d2464bf6eb179071addc6be3dd90a8713f83f2c97955308cb2f894b0ce13fe878280c2d02ff6fb534123dc395c5e0f0fd8400c53c0334486fd78ff5c8a9215cea878f",
  "dc3": "24e0aafc153dd8db1f8025e0433e558b028c32746daa804f259f24d5ebc9e61767b7d20d5b9037748a32d793be22244222d39bc2f97b223617c71722d88889425c637434fac07edf352984c7f12addd0a0252f0a6c1bdb5808db548772965f0a474f012f63f3bf6b71fd37eb8e7b102c07f6668facd4a4a653f55c0e1dee8a72346c9bd5266e8b0d1b28e0915a395fbdad5a98595c15f8e3094d744fb5fb2eccc81722202dcd41951755d4d127aef3ad6309d7a26acfa10d56dcbd58e11809470d73c1b8527f50d99491cfaf6db09faf63c4beebaf545183d154488141abeb8a33c14c0ccb2fd2524963e722fe782b059abfd5a8d92d54b4b08e2cc39d27dda7",
  "dcId": 2,
  "banned": false,
  "dateUpdated": {
    "$date": "2025-04-12T13:06:13.546Z"
  },
  "firstName": "Ivan",
  "lastName": "Antonov",
  "messageCount": 318,
  "username": "antonov_valuable",
  "id": "7318105767",
  "remainingTime": {
    "$date": "2025-04-11T14:49:18.913Z"
  },
  "spamInitDate": null,
  "historySpamBlocks": [
    {
      "spamBlockDate": {
        "$date": "2024-12-01T13:20:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2024-12-12T16:07:00.000Z"
      },
      "spamBlockDays": 7
    },
    {
      "spamBlockDate": {
        "$date": "2025-01-17T05:43:00.000Z"
      },
      "spamBlockDays": 30
    },
    {
      "spamBlockDate": {
        "$date": "2025-01-23T09:23:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-03T09:56:00.000Z"
      },
      "spamBlockDays": 7
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-05T14:15:00.000Z"
      },
      "spamBlockDays": 30
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-18T08:22:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-19T10:58:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-20T07:21:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-21T06:44:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-27T09:20:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-10T18:43:00.000Z"
      },
      "spamBlockDays": 7
    },
    {
      "spamBlockDate": {
        "$date": "2025-04-12T11:25:00.000Z"
      },
      "spamBlockDays": 30
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-14T14:33:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-21T13:38:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-04-03T05:22:00.000Z"
      },
      "spamBlockDays": 7
    },
    {
      "spamBlockDate": {
        "$date": "2025-04-02T12:02:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-04-10T09:50:00.000Z"
      },
      "spamBlockDays": 1
    }
  ],
  "nextApiId": 2496,
  "twoFa": false,
  "twoFaDate": {
    "$date": "2025-04-10T11:29:32.762Z"
  },
  "automaticCheckDate": {
    "$date": "2025-04-12T13:06:13.546Z"
  },
  "lazyCheckDate": {
    "$date": "2025-04-12T10:53:45.267Z"
  }
},
{
  "_id": {
    "$oid": "66dee250f856541e1b71cc3c"
  },
  "accountId": "+79829419315-support-500-last-9-sep",
  "dc1": "ba929b202f6c1c0d8b9555f2f968f56b40d2353e4736b01abfc5ddd5cfe454ee05f00311e0257cfcee9be64fb11fdb71f92d5f48476175f0399922c12b18d4fa63e6d4e314aa2d325698805a4f9be2998d5125db270303e4d5d8286f5325ec49950ec43b0a7c23c35ef633b536e767ab7b49ba063bbfb85ed3ec3488f4b0f018f1d369f64ba787b4295dbce1bc4f780a1d15b7a1144eaea3716487dd6b59fcf4c33ea181974ea27bcddef40da2a26f4fd87a4dadc25638110afea22e4bd5d06dab5db1df0b22cabe2bbf3a9fb5db90dc66b73eb5531b9e663e61da309f90a26330fc27f7d9d3a95161a2ec3b798cb0692ad165c271d885af8677f5fbe104276c",
  "dc2": "1cc186d224be10d1c507a24871568f8442a7f46b97568be10c771b0b2ae43bac06cab2b5bdb3ef3d3137862e3de19862a637093ef2d20867436fbfc4e42e5dbefc9ba9fb7d1fc45062e0a27290963ff25a2ec87400babe2bf1f7d8e50f22bc3935fab6e764ba4c40d80addf6d63f55ae4aae7db8015d3293ac79633c345883937a4bd20ead16a8cda23c4b4b2fd06437181dd6d0370475912b6068dce616ed4964543f99037c49db95074ef38a4ec66f941a712f3a32511455465a151cd3e4a0c7dfe5b4b860bc8c3ad569ed0ff7f957025ae207a121f7975ef74523f19f7f7847941951104d595eb1369092ef45b3d3974eff2ad9f96ee110a0e971ab528879",
  "dc3": "6d7b10de1a4b8fc510f1051f27c4b16b403b1403236fd71776e6b0c56421674cdd563351d93be7ae80654e200f1fe40ffe0f53fff178a63b11dc95bc5d421d49327843f1a9b145ec166a0d95b8072314df02df150198532a94ed0cb3683cd766ee70aff39783288772dd92b0732810339809cd73bd41b780974205cea87d821c56e527d2f97eb4b9840e826909e5f2599a10bdb36d5e3e4d106449e89e5de1050bf91e69183d349373fe27c23b1fa5ebdc931e8da91cba3a89a4919e2dce7fd7e1a4a485774b5d430fe6e4a8b1819600691e3dd4f2101787401953f8a5c783a454ac3910dc385dfe477b77b6171762114978c6320c702435b4730159696d790d",
  "dc4": "07f75daaf7d848a298ec42635d351abca31c449bd87f8d462344e3e3969b7f2a19ef4107ef7500780be05f0e9d5bdbfe4e938f6d2e589c72f94251bb59190244e4fec682e3acd57ffe47fbbe701b73fe576e4617b1f0726801433b85e7a0acb2905e7a15bce838c896ca01f269c955daa032d924e89ce5ad79373f4e9a4964282c6436aee49de0af24c376b86c863164960c112c8fd26b13b804f9d61a5445d0b9442edeba047c66486016ee11f369521a863f9137240f2f0ff089290e0504446d0b4947ca9fca069f0145e7d81da70a5d6194cd994635b364e67f618feda78ec6ae9f3516fa43ad9417ef2a990434cd466a7842df0281332b57b3e99f8b0ba7",
  "dcId": 2,
  "banned": false,
  "dateUpdated": {
    "$date": "2025-04-12T12:59:03.733Z"
  },
  "firstName": "Oleg",
  "lastName": "Zubkov",
  "messageCount": 285,
  "username": "zubkov_stiff",
  "id": "6346477268",
  "remainingTime": {
    "$date": "2025-04-12T07:18:24.288Z"
  },
  "spamInitDate": null,
  "historySpamBlocks": [
    {
      "spamBlockDate": {
        "$date": "2024-12-05T10:54:00.000Z"
      },
      "spamBlockDays": 5
    },
    {
      "spamBlockDate": {
        "$date": "2024-12-08T20:10:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2024-12-15T13:48:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2024-12-22T21:36:00.000Z"
      },
      "spamBlockDays": 7
    },
    {
      "spamBlockDate": {
        "$date": "2025-01-22T11:48:00.000Z"
      },
      "spamBlockDays": 30
    },
    {
      "spamBlockDate": {
        "$date": "2025-01-20T07:55:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-01-21T14:19:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-01-23T11:45:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-01-26T19:00:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-03T10:11:00.000Z"
      },
      "spamBlockDays": 7
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-06T07:34:00.000Z"
      },
      "spamBlockDays": 30
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-14T09:38:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-20T12:28:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-19T06:29:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-22T10:45:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-03T13:26:00.000Z"
      },
      "spamBlockDays": 7
    },
    {
      "spamBlockDate": {
        "$date": "2025-04-03T11:19:00.000Z"
      },
      "spamBlockDays": 30
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-06T13:31:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-10T15:01:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-18T14:10:00.000Z"
      },
      "spamBlockDays": 7
    },
    {
      "spamBlockDate": {
        "$date": "2025-04-18T11:50:00.000Z"
      },
      "spamBlockDays": 30
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-22T05:49:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-25T08:01:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-04-01T13:17:00.000Z"
      },
      "spamBlockDays": 7
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-27T14:18:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-04-04T08:42:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-04-11T12:19:00.000Z"
      },
      "spamBlockDays": 1
    }
  ],
  "nextApiId": 2496,
  "twoFa": false,
  "twoFaDate": {
    "$date": "2025-04-10T12:58:07.486Z"
  },
  "automaticCheckDate": {
    "$date": "2025-04-12T12:59:03.733Z"
  },
  "lazyCheckDate": {
    "$date": "2025-04-12T09:22:11.930Z"
  }
},
{
  "_id": {
    "$oid": "66dee250f856541e1b71cc4b"
  },
  "accountId": "+79829787736-support-500-last-9-sep",
  "dc1": "26bada109f02c4d3c33538928967055c04f1afa213867a8bd245cad793addfae9e4f191401d343846c2b714863f8711dfcbd3b62d636d2eb9ebdf99ce6c8017d3b1425f002784470f4fe8b091a68c502e0268023661c8c82d3f819e9eb5d7fdbd1785e23306d70f2552e420b3631a389ac66a696f0d660cd168465d0018c6be4608104a14139dbb48847131ce1cdda2a9d08e380f0d7c5d905f46ee9f028c6a928170ca3bcfc715add59a11ac447ef43a4a473b4e46ea3f1b4c1297c17048817ab7e422d0ad8c8044a5db9bf466420f6e4a914955f4720a848f92131a308f756e6deb9961b943b77d3ac7084e005138023ec059fe55a1890bf452a0a8b03900c",
  "dc2": "b33390eafd0d8d7eee49cbbaf565245e0906feacb07a54bc3ca29d11daee1f11e175274fc63670725f3644422b09d64252c24300d6fd0c0b4df5adf0f5ab1fce9f0f1634eb1e609a2e50e109a9ce1e1ff814798340687ece6db68e380912db1bb2849750ee8ba202e2fe1e3b279e8f82ef648ab57f2c33bf30a897afb34dc2f5bf5de77b9fcaa8df214272eeb839f50fcccdcdc5c973c6155697af5d22f046c3c3b7a5cef0f706bf1624143bb724d45bab6866851bd3cf3bb57a1161bf13934ca95fd1a69b33f1c67d5fa20b400584aa17349c9a861733cbbfc3e18590c73300987885b9f84c1c9f68e490ff6a4c4637d7174aae0c70e67214332e05db0413e7",
  "dc3": "9d96513980949be874aa6ef6b6aa49e37005091c619c2392a640e771e07716fe0b990f97d1237403255c969acc286ae80f52e9df7963889a1f2647db008ca330b4a87c097f746c46721cf79aeedd320c7cc761ca276a7785e9d15cbfb0193210c737303156f7f3e1a7c3df6961d83fce172bbedfdc80b88410197b9c4ab7e17a8e39ebfd6bd4b7d9687a70312143fe881e72288e25264c39034ef337a0dca31d090076ace431c127518fddecc4dd470e0af098218659973548d6f3c9aad78f79b59015dfe2a150e3f7f48829ae5eeb963be70c3d376547d092a5114b07e423b20097c484befb09d11f2550490d6889ee371f88778ec0e6d937074736df935112",
  "dcId": 2,
  "banned": false,
  "dateUpdated": {
    "$date": "2025-04-12T12:41:16.955Z"
  },
  "firstName": "Anton",
  "lastName": "Rostov",
  "messageCount": 459,
  "username": "rostov_optimistic",
  "id": "7470944112",
  "remainingTime": {
    "$date": "2025-04-11T16:20:21.793Z"
  },
  "spamInitDate": null,
  "historySpamBlocks": [
    {
      "spamBlockDate": {
        "$date": "2024-12-02T07:59:00.000Z"
      },
      "spamBlockDays": 2
    },
    {
      "spamBlockDate": {
        "$date": "2024-12-07T11:19:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2024-12-21T13:28:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-01-18T13:55:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-01-25T21:33:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-03T08:28:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-06T09:04:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-10T12:53:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-02T15:01:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-17T07:51:00.000Z"
      },
      "spamBlockDays": 3
    }
  ],
  "nextApiId": 2496,
  "twoFa": false,
  "twoFaDate": {
    "$date": "2025-04-10T10:02:12.472Z"
  },
  "automaticCheckDate": {
    "$date": "2025-04-12T12:41:16.955Z"
  },
  "lazyCheckDate": {
    "$date": "2025-04-12T10:44:48.509Z"
  }
},
{
  "_id": {
    "$oid": "66dee251f856541e1b71cc60"
  },
  "accountId": "+79829899385-support-500-last-9-sep",
  "dc1": "6db54e45d1f74d9c47794fa2e79e6316ee24dd48e2d77bc72817302ce6a7c1f2fa284d1af4938caa6a017bcc9cdcfd9ac099c4b05ce6111617599009c1388a314c9e3ab0dea808372fd00ff8c03d3a9e9ea47174d8a562660e4daca208c214c6f4b587f401ea9083059bcd434684eef3b0adc365498af1c6ced25b12eccf7fb87bf3b745f3f596ffdc77e909c02b4c204acdb54f4496c3abe503f4f125162451c7cd93b27677245bb98bac89810542fddd24d327133b4557c111eecb8abf5bbec5c4e8d5be38e1d47960cc95ee6c0fc20835ee7ed0d19342ba94f6c7c87c3cdd7a88edffde99e22b6d5107ce46e13d800313e87c15cf9dc4b8e0cef3448c602d",
  "dc2": "3fc633305abb6b503ad45f4a50b66c144c4d51c000b1479d1498d30a2e79ad2a59e97aedce7f6c137b38b1a64f4634fa81a43666565c04ee2eb677318a1b58f7b27d619ca1fd0a80a7db8a62d2855320ff32a8d581a8205fb01cb3f1f9137c39f7439f1cfc66b0c1e801c5e6c91a5b7a97cd5740cf7db65849c9ff608cda14ed3ce94d5aeefb4cec3e301b4180f8a6f84f3cbe1448387efd4ca0434730b6abd376b4d0bf02efc042922c17d741df25b5317657ebac869f3d01811c2670911943aeee4b317aeecb80c24a8967cfb9a703188b7ce6491c434bfa0194fbe6803893716902a101f485a175011e6414a3347500de72e3d4fa941a624af0648951b69d",
  "dc3": "212ae02be551b641496a111f84e8080de6a5d00896ba1a597b90cdb2912f3d3f6d528a30a8f6c559d4015a03b380c1b947f79d757050ab495e9025204b12d93b0dcc08d8475acb7fa354c1d2bdf9d44d8342ae6f75d67f9101e38df2f4483d8eff2082da65ded15af7a161b820ad182cb031114ee9892ad0fc63294fa88fbc008057602b742ce3c317139bf43e146bc241c64c1028aff20cb743f53b707618fed44f66b6b4405aff76dff6bacd29b5a0d55b2626a4fd0d2f6af221c34210fef8f8aba5a481d44fafb9040fa13fe772d16be7ab9bb23652336456acb0dc493dc3e95c1244429b21031429ce29560956651c708289aa76e0ddf3cf54c4a14caafe",
  "dc4": "39f3e1a77097c31784fb4a12c90fc52f08c803db8c7bb5bec3aac0f562e0fcf83bca84836b246e35edcc0e7ad9a22d65667036fe87959eda114d23489069ec36d77fa7d758da2fad488da7895d7c0bd6f00589fe0dc9c49e6d607bbdddaf8b590e12c33812b925468265588b717abf85f0326f87b1fb08ec757a14452e269e62a6c335382702121da3ca0a6396258a9941101991a943508a67e885e0dc5547eec388a1fdc88294769113eada474f61d1c25836f37d7415465f18bfc1098591833b64b0eb74f832c730b40303240e86e381f0203eb61810dd60e3a4e61368de2f512a401cd5fff2e55000a0e2b749f97bdaf96ce31ef76ff69a131a8043182fef",
  "dcId": 2,
  "banned": false,
  "dateUpdated": {
    "$date": "2025-04-12T12:40:17.190Z"
  },
  "firstName": "Alexey",
  "lastName": "Petrov",
  "messageCount": 411,
  "username": "petrov_loud",
  "id": "7310773843",
  "remainingTime": {
    "$date": "2025-04-11T15:24:55.721Z"
  },
  "spamInitDate": null,
  "historySpamBlocks": [
    {
      "spamBlockDate": {
        "$date": "2024-12-12T07:07:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2024-12-24T08:20:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-01-15T13:17:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-01-17T10:40:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-01-21T06:06:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-01-26T08:50:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-01-28T14:31:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-04T10:57:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-17T07:39:00.000Z"
      },
      "spamBlockDays": 7
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-14T19:48:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-19T22:54:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-20T14:26:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-24T09:55:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-26T09:04:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-06T09:58:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-14T14:49:00.000Z"
      },
      "spamBlockDays": 7
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-13T08:14:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-16T09:53:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-24T07:07:00.000Z"
      },
      "spamBlockDays": 7
    },
    {
      "spamBlockDate": {
        "$date": "2025-04-23T14:41:00.000Z"
      },
      "spamBlockDays": 30
    },
    {
      "spamBlockDate": {
        "$date": "2025-04-11T08:08:00.000Z"
      },
      "spamBlockDays": 1
    }
  ],
  "nextApiId": 2496,
  "twoFa": false,
  "twoFaDate": {
    "$date": "2025-04-10T12:58:07.487Z"
  },
  "automaticCheckDate": {
    "$date": "2025-04-12T12:40:17.189Z"
  },
  "lazyCheckDate": {
    "$date": "2025-04-12T10:16:16.493Z"
  }
},
{
  "_id": {
    "$oid": "66dee252f856541e1b71cc70"
  },
  "accountId": "+79923019247-support-500-last-9-sep",
  "dc1": "a3d8f8f2772453a809e89f008a40b64289ca466d0ffc90a09260d8cb46c9cd916356ca0e7cf852ea130afedad0fd7d176f00ff055f09d2f20580cdf2f3a4f60a405b4933830e43c9f8b804a9737caa0401d4c662caeda504390728f07f86370fcf2dabe7cbfda81236bd845a4684fadf26e1bde3b3680fabcce7cab9f2c013819768178163a1dd770ce5b6b30621994f94b626c5d4f94f72b61e5faedeb549a77a2acca3552054b6c69d764fcb4933545ed98c107c94026ea9f96a59c137483f17cf07c8ebf429f2e296fcfc2e09fb099a4c3410101eba987117657a160a53b326742259e36bff777d51de89f2c35672ca53e6d523d66ca377c8c910b16b774b",
  "dc2": "0cfe52898c8503377b8f3cc5b61b7510e3f1e12b312b60b5793874eb3d40c53584f13d76adc6065af05a40e8751343a7b67adb1f192896a06ad56e7bc5a0d7b36f6068ffa9601290099aca8e434474506b748c9a04216adbbd886006cfce4d8925f1acdc599eae82a42c040dc03b38d30a838e723ba9f5d67eb97ded3f51d73afc62af14546931b0b22e1e58265b6cf78c9d707ae8b1172d3e4b47e34099db412f9a93b78f21edfa3aa0e68d4a26280c36e022217c4f500186ae9d1c644fcd2dd1a6f9cc63041b6e263f218fcbf2a06832e1052b5e16a1b422eeb8e456ae3b9f7f4a1356764f203f3f46d6c5b37674d2be21d1c861d36203e70d44985f039698",
  "dcId": 2,
  "banned": false,
  "dateUpdated": {
    "$date": "2025-04-12T13:04:19.084Z"
  },
  "firstName": "Pavel",
  "lastName": "Panfilov",
  "messageCount": 428,
  "username": "panfilov_boiling",
  "id": "6892592953",
  "remainingTime": {
    "$date": "2025-04-11T09:07:34.298Z"
  },
  "spamInitDate": null,
  "historySpamBlocks": [
    {
      "spamBlockDate": {
        "$date": "2024-12-06T07:49:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2024-12-10T14:46:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2024-12-29T14:35:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-01-18T11:08:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-10T15:06:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-22T10:46:00.000Z"
      },
      "spamBlockDays": 7
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-19T10:45:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-21T05:20:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-24T12:20:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-04T07:36:00.000Z"
      },
      "spamBlockDays": 7
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-26T19:58:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-02T07:51:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-11T08:40:00.000Z"
      },
      "spamBlockDays": 7
    },
    {
      "spamBlockDate": {
        "$date": "2025-04-11T05:03:00.000Z"
      },
      "spamBlockDays": 30
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-22T21:09:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-26T13:44:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-04-14T12:54:00.000Z"
      },
      "spamBlockDays": 7
    },
    {
      "spamBlockDate": {
        "$date": "2025-04-12T07:08:00.000Z"
      },
      "spamBlockDays": 1
    }
  ],
  "nextApiId": 2496,
  "twoFa": false,
  "twoFaDate": {
    "$date": "2025-04-10T12:58:09.187Z"
  },
  "automaticCheckDate": {
    "$date": "2025-04-12T13:04:19.084Z"
  },
  "lazyCheckDate": {
    "$date": "2025-04-12T10:47:48.953Z"
  }
},
{
  "_id": {
    "$oid": "66dee252f856541e1b71cc81"
  },
  "accountId": "+79923061611-support-500-last-9-sep",
  "dc1": "6d3552ad8a8e7a06b195becfe7efad45a4a6d99d73ffbca49005578646b5cc728328d05e7ce25786aa3a6f9df76a5348d0b688f89ca36377b3ed045bbf5a6a6fc32564721123b488fa5b7653a9aae7d85eeb015564a2ceb9bb59d9f18d5cefc544d5e7e038aec3b365de70c9b4cc2347d563413ff969296383dcdbcafccd74ee74c62f916b496bbeb94bf15b27f8d6eb9720d7aa876262ffbfd9573dd3479f94fdf55b01e6f828325cfa8cf1ac1e913a3e1e0b530d0facee007f612f35d681a8438ab38d982602021fd20389116e4d2d9ff55e7bc7176b61ef260ec1290e8c76e4e2abab892e3d5b37b199792e2b2d1c69fe738fa1c6ac4c27ace6bd6980c743",
  "dc2": "7822ce557d3e47077927c020d7671aac3b05d80c94b1a2cc55ba8c8c00a127df82eb960c478ba25a3fec8cc8b688d538bad7f883683a900f58a0256cb7e735039438c0a76b70dba04ae78ceaf6fa687c04b4dc851cff73f6441ba317f6278e2a1c524f3175a9e437a256d86565ddc0523b48ba76a36661545afc6f92e4dc5979b80f73e0afbbf66c1205435beb3e6063bc7afd66d7fa08f87a9d490b16e6e672b4e625e08efc85a2e5b5afec9a495bb95cb8aa0a443e5b43cf0e18c4321f22017a14512edd778ac3f08be593d7a0f5ea501fca94d27432d3e01e00130302b1cd67394e72c2a628b0f1df92e00aff75b7aea70cda1eb9a0b0cc8294ee41f0fe6c",
  "dc3": "5d0dbdf47ce1537977590b0895fd773075f401685ece00cef64956b27ac0ebd81c8e3e701dcfb021e1aeb5d8340c0b12ddeb4bd35ee0d59ea3b35edcfb35ae622a26a45593fc988f586ab8600bd4579690e8f590bd562a75361eb51b68bf569fee2b5c1dc99f1851dd3687b51bf42b71000741a3067fc86c7fc88c733afa96540c743690f2fea23e2dbe153c8d363e62282f938bf10aff12a05d2fdc9544b2e7f89bfa82f3e21c909351306569a4f760f09dead6167b0f198914c83146d02dfc423f7c9ce4ff2cde631d35e8f368afc59dd07b2111c821a400844a2b1acd9760eeb86195d755cc38cbaada8a1d761f15e5ddeb0481f44ed8abb74a6c768dd8d4",
  "dcId": 2,
  "banned": false,
  "dateUpdated": {
    "$date": "2025-04-12T12:38:13.450Z"
  },
  "firstName": "Artem",
  "lastName": "Bulanov",
  "messageCount": 507,
  "username": "bulanov_gleaming",
  "id": "7202051818",
  "remainingTime": {
    "$date": "2025-04-11T16:15:50.893Z"
  },
  "spamInitDate": null,
  "historySpamBlocks": [
    {
      "spamBlockDate": {
        "$date": "2024-12-06T07:22:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2024-12-10T08:54:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2024-12-21T07:44:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-01-30T10:22:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-03T12:59:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-14T18:12:00.000Z"
      },
      "spamBlockDays": 3
    }
  ],
  "nextApiId": 2496,
  "twoFa": false,
  "twoFaDate": {
    "$date": "2025-04-10T12:58:09.190Z"
  },
  "automaticCheckDate": {
    "$date": "2025-04-12T12:38:13.450Z"
  },
  "lazyCheckDate": {
    "$date": "2025-04-12T10:44:47.538Z"
  }
},
{
  "_id": {
    "$oid": "66dee255f856541e1b71ccd0"
  },
  "accountId": "1722973118-support-298-last-9-sep",
  "dc1": "3b15bf39c1ffe4873de38aa9ebad6ff366c4fd7e8797784167604d067e0379675e9925359995fa049f99a62756a0cafb059041f8aaaba93aca4a19d9b43be998e8000acd179c37b13c15ee047b486858b678ce121cbc8326292afd24e0ed51e3aaf98c6b5b44de6f20f579d3d241b668fe04e3017ace74e2e7153158b78268f67fd92831b59a5d6e4b7636539532ac65792c61ada800efaee5a4533a7b684bd0b1df630e441dc9ec4df8450868d74487431a33dc1fc2ecd6730a8681287f0c9e449ca8caabf5007dfc4bdf75104a12b62bd623a9d1e5626db3d3c483843da3fcf9a2c0b31f63c124150bb37b64d754bfea9f2f2a88537f841eb55b540e8e42c1",
  "dc2": "3448b15b98d2597818caf369fecb3c908abee181a22aa16dcfdaf06fbedd7e82ecafaa40aec9f2c31a4c97c0860159f678bca57ecdcf2dbe2a8662b8d3d5150c547277ad5702a10a8463f24d98f09283181d49b9a8c49218bdc036b78d29a161cd5a97c2cbba9d47c855fca2c7a0df233f0ceee612b6a2bd854f7de5f1e691703d35e7e35c494e10940b2e8f4d36549ec559055a242e0a1c438b24c1f0f186699d72787a04a558a0b0f9b990ce138d5705387958585577531838d110f5605aac5528f7706bfd7758a1c2b367ac4f4d9ab516335493856004f3a4fa3311b17f11eb62f2aa5e87962c82c772372bf75b3795f7bb0d4edea4d29029e5b181b5964f",
  "dc3": "26b9b489f07a510e3bc50ffb1b389a80bc6f3019f4156dc522671dc300fa9d3913423e08eef7b831bc7cef624446447b6889188248cf9ad321e8aee1ab75c4b20dcdaeea8d9b26170c0594f8085c4a004259259544467c6e6b9fd0a1cfd38ebb069f6e3105cca8f734182ca79119860700a7787d9b0d2672014f1968ee46f4d937515ac74064293ff4f179a16d680bdba146cb5d34ceeba5c3cec7a1ca049684603e39beb512f15e7b145b2b77ff0144f4f447660d3ddf77b326a6f48b9238acd8170d4f091363c6483be2d1ab47ba265295915ec0ffabed9f9613df26b5cef3b8fa5af822191430a210378931f12d57d532809a248f3ae6737a05ce57286f53",
  "dcId": 2,
  "banned": false,
  "dateUpdated": {
    "$date": "2025-04-12T12:33:09.326Z"
  },
  "firstName": "Sergey",
  "lastName": "Bulanov",
  "messageCount": 518,
  "username": "bulanov_azure",
  "id": "7233981545",
  "remainingTime": {
    "$date": "2025-04-11T16:47:11.078Z"
  },
  "spamInitDate": null,
  "historySpamBlocks": [
    {
      "spamBlockDate": {
        "$date": "2024-12-05T07:21:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2024-12-07T21:09:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-01-17T11:35:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-02T08:32:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-24T07:13:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-07T10:30:00.000Z"
      },
      "spamBlockDays": 7
    },
    {
      "spamBlockDate": {
        "$date": "2025-04-05T07:50:00.000Z"
      },
      "spamBlockDays": 3
    }
  ],
  "nextApiId": 2496,
  "twoFa": false,
  "twoFaDate": {
    "$date": "2025-04-10T12:58:09.526Z"
  },
  "automaticCheckDate": {
    "$date": "2025-04-12T12:33:09.326Z"
  },
  "lazyCheckDate": {
    "$date": "2025-04-12T11:43:50.376Z"
  }
},
{
  "_id": {
    "$oid": "66dee255f856541e1b71cce9"
  },
  "accountId": "1723055892-support-298-last-9-sep",
  "dc1": "21407043db5263968bfaef267b41674104e903917fa2a594ea8228d91c21a351f7aea33bc9bce96cb4553a02ae8ea9d1e1f3b29488795e2a7b67ba18034481b361c781d14f909d8ec7d9759c18c51fd5e821c86de8cc268b9c688cd30d76b9242d54c330aab999541d589eee8305f5e9d9c2613ed8870104f4b8bea8e826b1d389d87d3a78038fbb85d5ca046cddd82b94acf7219cec3e6328a72e333d506469744ab4bdbc75aa0e0e69eee6083eed3ce53fc30e3bcb155be0d0b850a52d0b88142f4767c35486e695255c1b55012698a66f06de349a69351947cc7de447695b710a6f1d5b32814ac4448383e8adcb783eaf57e82c57201932ae78c09527691b",
  "dc2": "7ed18d546c24e3d54a8edcf45be43543273973f224aeecb60a997a65952270f565aa00d3639edeedf5f211a0e77f5bb572c0261fc4b07f4c3a046fb16993d96eb84badb1e5e4fc93ec45235587bec9db391687d004a5df757173ad59e838f8e22f1336f15a70f22f9a4ef3cc23bda9fa3a3a2ff628bef6b1a23d2bd61003d344f7e6e635d8c48f51bf8290b51f105addec112a2b1ec08a60f26e4d11d334077c0132388d390d628de7283924228b83432f4ea3062cae70ca71a42cabe92070a08cb251b33024f37726f811ef098d996e0b94a4a94d6ad1c24894f045c97c93c63c577925cf27cb96db4d36e13ba846807b6de26f58ce15ef576d77d9927b4e83",
  "dc3": "77b86d5862cb1086a2536d05dc87faf71bc7c54a1eeeefa7bf4d5c0140eee370c334fb94920c9139b91a0b679dd9df474872c28f995703638919be81bce30e6dbb47429fec86e592dde9ab13ce990fa8920ffdbd41255e216125140f6c97e2bc8d949760f3fd906bd622bd5e855836b31316b43111c3824b0d076f3d255e19e89df49a2b3e79b4b02dde53d6f5ad27ea585aef31e3580df94759dca41b7e241198c54dff03213a23c1b5c2e7a8580b7ddf7c14edf7ed3a45317fc1d427b4f2348a747487068fbfacfd6b4d293300660ec47df462e42a2b20b62da88b95bb0aef0e3768fdb2f3eded3369d908ecba69964d1f0cf70cb8dcb623df0844f84344b5",
  "dc4": "b03d6e21fcbb0f5a8b2b499707675a9863cf93a57617343a2708518f0f18808460d35b1be16c93d7858f5728f798b2564bb3a0f8170f179cc8c56b259a6a62ac97ccbdceafd39ff9d19050c96ee562fc58ec5c1b116124d4a16a5db44ea5c10644c62ffcd5292c16f1e15d853c8b6cfff1a1233d977d4a796e030bd41c906ecf99f0f4272ece8e58e5e690f56fa9ff9764d741b9ac20f86a97fb6248bcce082c98160f38c802f3558a009caa417f8734bc33d89ae9785e11ac30fc6f9b006d0d7ed5ae0f018664c35a542b70d63c33f03f00a335b934257e9e5bf48871d694f333075db18722e8e99c9f321209d82ce4f922ead74de719dc0c4dcc648711c566",
  "dcId": 2,
  "banned": false,
  "dateUpdated": {
    "$date": "2025-04-12T13:08:16.385Z"
  },
  "firstName": "Dmitriy",
  "lastName": "Fedorov",
  "messageCount": 293,
  "username": "fedorov_ethnic",
  "id": "7060198579",
  "remainingTime": {
    "$date": "2025-04-11T14:57:21.698Z"
  },
  "spamInitDate": null,
  "historySpamBlocks": [
    {
      "spamBlockDate": {
        "$date": "2025-01-01T15:03:00.000Z"
      },
      "spamBlockDays": 30
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-08T09:01:00.000Z"
      },
      "spamBlockDays": 30
    },
    {
      "spamBlockDate": {
        "$date": "2025-01-29T08:41:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-05T10:25:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-07T08:10:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-15T19:38:00.000Z"
      },
      "spamBlockDays": 7
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-15T14:35:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-19T03:56:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-19T10:21:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-20T10:31:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-23T10:57:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-26T14:12:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-01T14:28:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-11T06:36:00.000Z"
      },
      "spamBlockDays": 7
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-06T12:44:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-10T14:42:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-11T14:48:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-21T12:14:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-31T08:01:00.000Z"
      },
      "spamBlockDays": 7
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-28T06:55:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-31T08:21:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-04-08T11:39:00.000Z"
      },
      "spamBlockDays": 7
    },
    {
      "spamBlockDate": {
        "$date": "2025-04-08T20:02:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-04-13T12:34:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-04-12T12:57:00.000Z"
      },
      "spamBlockDays": 1
    }
  ],
  "nextApiId": 2496,
  "twoFa": false,
  "twoFaDate": {
    "$date": "2025-04-10T10:02:12.206Z"
  },
  "automaticCheckDate": {
    "$date": "2025-04-12T13:08:16.385Z"
  },
  "lazyCheckDate": {
    "$date": "2025-04-12T11:36:46.909Z"
  }
},
{
  "_id": {
    "$oid": "66dee256f856541e1b71cd02"
  },
  "accountId": "1723063742-support-298-last-9-sep",
  "dc1": "592d6b63641934fe3348e02f2877d41a105d1a3c30fa6fda075ee11b3f747ab36b9ca1c2cd6101aac89f157e26da6f0c1c65db3e97a12f2ba77b51e931c7d7ec7d74313e6282e0bd128ca8b5b6b3b87d25627dac87aa9c1ab43a53294a7872b7fc84366216b9a9e16beb79c8d006cfdc48ff909b0c78157e644f2223c8092b8ad5aaed1c9c89c17f282690d8d9aae1f5799f049d4fb4e079b3bf46f8cd94448c28f6abd6ca0a791d020a6969cb46673550ec4369c012e23acbef14f5929ffe33c6fb8cf3ae22c7db5875551d51b51b02332813616152d30064134437f24bb614facf452a7eb3d72d808f2a9b75a4560cd884f8833949090d79aa7d8c655d2952",
  "dc2": "b9739abc6a038fae4ebb129c6dc1ef813203a7a83c7f2ff23f338677ae4a911891a302c5bea0fbb23547783f488fae8fad025cd3f9ca2e9c5c856b5c69bb50801d269d3298c1f637f6234b09135ea8df921f0a97f6e9c1529287550eb09c15d9b18cd1ee516a58238efec58e600ccad2557a62d4ac83620ec0741bd815fd46f710e810a211c84187b4d31868bd96d2b41cfd2b3fbd8361bb595161c73ba28b49fe621d51cb5eb92ba8465829671445f4718a64ed4833b0e63abbe2b99bdd55d0bc391e103b84d77431cf7be6bd6cef19c53f9b8598df3756ac99cd64ccfdae62693acd4b0bf1017e1c503a7b39dbd2f69719d12a41e2dff515c6346392bc1826",
  "dc3": "766efb1630731e007bdcf2ffa9b15642ff16b6597fed747053d5e9573d8d4dc50b1dd54e32212a59a7b6631ae8189de645160355f0e6a96769a0863fdff7327765905f22beeec6a5e43f98a3d58ba2e47f1376171d7a5c4f96cec88b42051feaa757cff6f7c314117e7e6cf7eef36107dfa780c8ae4fc2d4a8f0b3e66f206000161b201b5ffac6a8ce742517f95dcaf25b987d6f736f68098a2854712d739de86d1a58f9f07bda5740dd2d5dce7244ec8193e57b8007d00935fa40d12ef3ddf2ba0c40db14306a27c725244fe6674a47ddef20556252d1b52650c5bfe92a183b56c65f5b1fd89c4175d9ce40b9a8ab6c02fa8666fbd51d62bb96246035410131",
  "dc4": "3bd4d0a94ccfca5f658e213f06aadeed853d7a512f8dbaaa72caf9998712edd2113918e7702ee4e3f7d1cd0d6acb59816828f232ec97a7dd5979be72cf819a552559609ebde791e410dda63ce8a8aca202fd3004d2bef9135218184403b591512466f4dfd04a42e34aecf1e9d612741839fd593aa6fd00400172dc2e9c5aae64fa2958cdc3fed9ca2a9cde86cd8f589a679406d5e2597f85568a243adb3984dfa65fa30877b029c198182152f2e6f913ac819508db910768839ca064cba7a6eec662223c4a0a7a5fc8a75f8fe6a18460c432e643a87cbbfb8cb0c10bd93a6606c245d3e63a312e1600093fdcc73c43ea760ed072bc98bcf4b64d5ec2df468bb8",
  "dcId": 2,
  "banned": false,
  "dateUpdated": {
    "$date": "2025-04-12T12:57:16.297Z"
  },
  "firstName": "Sergey",
  "lastName": "Borisov",
  "messageCount": 402,
  "username": "borisov_yodelling",
  "id": "7479661655",
  "remainingTime": {
    "$date": "2025-04-11T16:12:19.207Z"
  },
  "spamInitDate": null,
  "historySpamBlocks": [
    {
      "spamBlockDate": {
        "$date": "2024-12-02T16:29:00.000Z"
      },
      "spamBlockDays": 2
    },
    {
      "spamBlockDate": {
        "$date": "2024-12-09T10:19:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2024-12-19T07:43:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-01-13T17:34:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-01-20T20:21:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-01-25T14:47:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-01-28T14:37:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-10T18:10:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-27T08:41:00.000Z"
      },
      "spamBlockDays": 7
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-21T13:41:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-27T12:42:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-07T05:23:00.000Z"
      },
      "spamBlockDays": 7
    },
    {
      "spamBlockDate": {
        "$date": "2025-04-06T06:50:00.000Z"
      },
      "spamBlockDays": 30
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-14T15:21:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-21T15:50:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-27T12:37:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-04-03T11:58:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-04-11T06:17:00.000Z"
      },
      "spamBlockDays": 1
    }
  ],
  "nextApiId": 2496,
  "twoFa": false,
  "twoFaDate": {
    "$date": "2025-04-10T12:58:03.116Z"
  },
  "automaticCheckDate": {
    "$date": "2025-04-12T12:57:16.297Z"
  },
  "lazyCheckDate": {
    "$date": "2025-04-12T11:45:45.607Z"
  }
},
{
  "_id": {
    "$oid": "66dee257f856541e1b71cd14"
  },
  "accountId": "1723132775-support-298-last-9-sep",
  "dc1": "3e29d80b97b6d5742131dcc01624c1020c55a16ead29c2cecb292e869a14d21d7ba12aa766ec69fefa9580a71e62f1977690622217797622589f3ec2fddfa26d67e2aa4db812d28964ec4faf8060ebfbe2fd523dc7491eaab096031932f74ba10f62adf54ecda06edf1af447ff49fed01ab3fe4432e066ede78451aa80fc18a6c72f6d114fe3c15b98273df5fa6e511e6e4df9fb101a9dc9b92a5ac5eef22b051c22c07c818690314b95dd9559149a950165b61f425eed018964da4c6ff4c45a4e20bcc3f959100f2b5aff6755dc7282caa6f2afbc199d55799daf570f1feb2321fab6bf9e8339da44caee9b8e4cf90f80df502bd99d36d01aad9c475a33efbd",
  "dc2": "c36cff50249a7e508e3463a0a96598e84d2312bc340abf8fde3140f3a1ac8c7ec1f06d3c919eed03e4f56030dd56906e61fbc1f6e2e6cc6ae60eae8d7bf991d434f5f8730f3b94d2ee478afb823e3e402eebc4ab60e77a2c3c993e02f8e5837f02a4d2a2a36f51f588fecd838492235eea7a2ed2434a608ded9482481efc34c337be716cee665f8fce8441d5d803e706bc357291a6793606eda70305d9c5c0bd6e6fed5a3d9e3cecc34ca6f62ac7523b6535f1d4ea197799820189d6fc5359806aa512c85dba039f7d554f27fdc14c2769ce2495d0ab452c10290f8e73092e97d31fbdd665b1a4e495ab67c1ff5deb7a71a58f5f7acfd9753a5d2cdd2c655fac",
  "dc3": "0262093be7a2e710681f7d4035cbe75902ec63b0eefee4a43bfc3902e46eef48b37d3684a4ee5024bb9e6362b0ef00c684adb9ee4f72b3e7e531a7ad2b5adef3a11a8a6e994a16d9c795b9afd481124fdf674824ea7efbc3ce5a56faf8d666a4de2dea3be7348b889c275153945b6e82a3d00201e5ff3c24c01120816375526014574675d9688117411ef9b1c5355729c3add4000a64df6bfa9b29b0aeb0347b69b50d12b2607ba5b3f9c1fa140f96d6ab7a97517c5528fcb2a1434b9a4ece4ef5982ba5be280555e723ba4e32dab2bb2816fac66f4f2200ed618ee4106d292d0430e36f6b76cea148107aa7dde5545e7c7243d29a39c064c4ed68f0853cfa80",
  "dc4": "0ea235ff3c6f9df97e7268129d8ca092dc2bd58123e3999eb63d3bb0540286e624ad463e935fa26cc2622e5464dedf2872b317c2df6387422075a2d47e4ca9229ad0b51fe1f30661e8e979022545bd58c0e250b1df39b5557c71ad45c2d5c566cd97333f8aad2480e508c90deee3583b068bccd57c9cc86ae74063b013b8401680bb1dfa8a02f2361a039af96428d55e660b8fa3e1a562712fd856a29e40919bf1af8804e188fe77bb9081e60b89ba5ec6d52cf2c1aa906e8318f1b1cd9ef15597e3f188de63b551f5d9fc556955ed64aade317aaa6df15bf23f835a6e4ae53dc5697d3cbab82dfb0394da4ee8ef9ebaecb11bcc8e44dd4257fc57cb4b726f3d",
  "dcId": 2,
  "banned": false,
  "dateUpdated": {
    "$date": "2025-04-12T12:28:10.104Z"
  },
  "firstName": "Maksim",
  "lastName": "Zubarev",
  "messageCount": 324,
  "username": "zubarev_smooth",
  "id": "7352097564",
  "remainingTime": {
    "$date": "2025-04-11T16:18:19.401Z"
  },
  "spamInitDate": null,
  "historySpamBlocks": [
    {
      "spamBlockDate": {
        "$date": "2024-12-08T10:48:00.000Z"
      },
      "spamBlockDays": 7
    },
    {
      "spamBlockDate": {
        "$date": "2025-01-10T16:58:00.000Z"
      },
      "spamBlockDays": 30
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-11T07:19:00.000Z"
      },
      "spamBlockDays": 30
    },
    {
      "spamBlockDate": {
        "$date": "2025-01-21T10:37:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-01-27T07:44:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-01-29T07:58:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-01-29T12:51:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-02T06:57:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-01T07:37:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-06T05:13:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-07T14:42:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-11T05:17:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-12T12:32:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-16T13:25:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-25T10:49:00.000Z"
      },
      "spamBlockDays": 7
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-20T10:52:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-22T15:26:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-27T15:39:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-12T14:25:00.000Z"
      },
      "spamBlockDays": 7
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-06T23:53:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-08T14:41:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-16T06:39:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-26T14:36:00.000Z"
      },
      "spamBlockDays": 7
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-25T12:44:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-29T08:55:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-28T09:37:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-31T10:25:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-04-07T21:12:00.000Z"
      },
      "spamBlockDays": 7
    },
    {
      "spamBlockDate": {
        "$date": "2025-04-11T14:03:00.000Z"
      },
      "spamBlockDays": 1
    }
  ],
  "nextApiId": 2496,
  "twoFa": false,
  "twoFaDate": {
    "$date": "2025-04-10T12:18:01.217Z"
  },
  "automaticCheckDate": {
    "$date": "2025-04-12T12:28:10.104Z"
  },
  "lazyCheckDate": {
    "$date": "2025-04-12T11:57:45.464Z"
  }
},
{
  "_id": {
    "$oid": "66dee25af856541e1b71cd4f"
  },
  "accountId": "1723147483-support-298-last-9-sep",
  "dc1": "9a189dd2c60b63ec4e404798f3b500d4251babcfdeb6655a8f7492e0bdb87aca6e0c990141441ba5e57956a92f39bdc7b00f24827acc09dceb588db2e9bd7d3cd4039ee0fdbea88a761898fdbc76109653a58ae0c8e98d2a7476b4d5858b659428f4a6e1a64547f3dcb0da874b458f01773b81acff707e18a270c298f076a72c8e2d97eac1485a6583b7559ba8cc11d3e8c69ace7aa4ecf2773df64eea17711004e40a1662511cb5a34f164317585c397d1f7fd44a5f59752886e22ff4ec9ddfbf6765443b93e0bcb0d947ee37a2ff6dff50d12efd2e42ddef985a8fa4636a6a6a8439f3dce923a12e9d903571dbdcdf1283882bb9a9ed89867ad9956a7428ba",
  "dc2": "678cefa011f9089e125ca1f4494177b5c2ea210c0bf4e9523c9a96b37a6f3e11d3f71657eb03461e73f49f1a86e60bb4a72ec72cc3ac95500aae5c42fd5d7afce5b399a5e94b64cacdd014040ca959bf77246c045c6eecb418c916de834833c0246490cb11b1e030eacdf0cb78f1f2b5c37a4eff517cf33cecf7713a72a35b1a657118ad2ad67e2cd83fbafcc2b771762fda4fc34d5bd2e55e2a22ebe6e035cf417d1377a4ceb336f0c1b9e21f58ef6e9f2b6c6c7b114e1fd89b176e84356e761649c5597fb335300c11bb125b7a4a203e7644a1d11fd52001311b121f64635e8fde01f7f9bba18ef97f33f7558f345b8890082472ce52cb203fdc75fea700c5",
  "dc3": "9c04a2963cd6c1c65f34212cdda88e464e7642caa5f93df01ff0d6b8024de73568ac1142443391495ce0a4d48b1d5caa0bceb25b776bafde64bdbbd31f40ca092f3e372a9d64128842149f1f786106bf53fd8128fe0a6047694ec964a24123878e14f0b8c56cbec07f97d7f1f868ed8db833f6b7b31f0476fedc4bf9431ee8062f2e74f459eab62eb4c8a3b4eeb78375d56b73ff5741897c09358b66d1c9830bce82447bfdc2184f014e1305060932fb3fafc7bfc59895b03eed2ef229c62debe2c01412550e16455b9f02b2101796fb617b413ecaff095e1b8e95224d5a9767db13a9bfefab205a3d0c3be409d7beaa61fb6312d543f6f9f80a13823774542a",
  "dcId": 2,
  "banned": false,
  "dateUpdated": {
    "$date": "2025-04-12T13:04:13.252Z"
  },
  "firstName": "Boris",
  "lastName": "Malakhov",
  "messageCount": 468,
  "username": "malakhov_decisive",
  "id": "6754082585",
  "remainingTime": {
    "$date": "2025-04-09T12:34:45.495Z"
  },
  "spamInitDate": null,
  "historySpamBlocks": [
    {
      "spamBlockDate": {
        "$date": "2024-12-05T09:58:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2024-12-09T14:02:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-03T08:22:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-09T12:29:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-26T07:47:00.000Z"
      },
      "spamBlockDays": 7
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-21T07:51:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-24T14:06:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-03T14:26:00.000Z"
      },
      "spamBlockDays": 7
    },
    {
      "spamBlockDate": {
        "$date": "2025-04-04T10:00:00.000Z"
      },
      "spamBlockDays": 30
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-07T09:53:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-10T12:55:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-11T16:56:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-12T08:45:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-13T09:06:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-16T09:13:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-20T11:59:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-24T09:54:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-04-02T11:29:00.000Z"
      },
      "spamBlockDays": 7
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-28T11:55:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-04-02T11:31:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-04-15T05:10:00.000Z"
      },
      "spamBlockDays": 7
    },
    {
      "spamBlockDate": {
        "$date": "2025-04-12T11:08:00.000Z"
      },
      "spamBlockDays": 3
    }
  ],
  "nextApiId": 2496,
  "twoFa": false,
  "twoFaDate": {
    "$date": "2025-04-10T11:29:40.858Z"
  },
  "automaticCheckDate": {
    "$date": "2025-04-12T13:04:13.252Z"
  },
  "lazyCheckDate": {
    "$date": "2025-04-12T11:41:46.790Z"
  }
},
{
  "_id": {
    "$oid": "66dee25af856541e1b71cd5c"
  },
  "accountId": "1723149626-support-298-last-9-sep",
  "dc1": "92949d6c3b4afa06935a223bfcfe46aee3cf61a8ec994ed171f95617ac778091b958774027f4db925889aff5b368242593e3ae95f0b1412356ae5f147a8e32ee97249eb414cd0bec856b559f492c54db30551e5bae8c58c1a6ff55f6a0c87dda4e94957351a35825603fe051c9c1644c1a216e898c4e318167ad1131be0811703c7eebd2222a84e190951f4cf7fa757b1aee155432740beddae8c844d3ad488c0cba0fe9ded6c5f8082173ce5f60f43f8e90cd695fb9f852c87f577f3ed4e7f2fcd9d96a6b7fa693241a77bbcf44349d73b44b763d64f5d9694fd807fa2faae2aac268d65410d56d34d307f9069f4645a5e02df9a32eb34dddd0a5fc4f1d38a5",
  "dc2": "622203726414a6509b26d0b3f86f6dbd7a798a14baa9b2b4dc6d26f64f1b8965383bcdedc3331d7622f0af011daa862ad26a1169bb4610f93f1909bcd55428f5f1fbfc21e4804bccbb82174c9d46940c5080663d0df890e8f2092ac1866cff51955558e44d00ad3de95b2f897b58141820f225e1c9ea4de8b6dbfb7dc2f716f76de2b3bc2d83ce650e3ece4eeb221029bafb5475a4f3b5adc5ecc58e88f2ba155d61b005635dc7b30197dbf0f21fc0672d9688dd2ffdf62f0bf9a0e0c2e97131634df00e824cc5310986e53f69f070d76664668a8cec5d07f742f50d66a191c9983ef26b7fdbcfa7abd62a7d81bb83f6e9b6feb8a418d37e4796b5f55d53d224",
  "dc3": "69c7a22ed0dc874b1f50d399fd34a43ce3f4f4e8880651326ca2bbd759b53898503d027b7e7332a56f7201d82f5f979d156cc92e93e214e4d02b21397aed522833ae9caf9683229bc98baeb4197cbc7c0d632f4dee41c81211203fbbacff171fd691c0d1dd17ff9fa1c701931841c241877965b93698a222508595f9a2f89d82fe5287088c259b980e36584347a37e6bff006aaa1832f84684fb94d925998a72546eddaf67fe12f2bde78578fbb85fad04b33b6908dd86ed72632355aa2e5f3a47507c085780b396b4825072519e7c73f650ab525835ca2790d91e1fa956f52ccbd00315d5d02b841aaea5528ebb8eb1a9248ad83d51aa66669a55e573874cfc",
  "dc4": "4e2f1513fa3432c654f493bd4448c916dd7a532c28df8cdb634e6b0539dc34de5a37eee86c727eded4cfc62721fd54bef7067dc0764ec823d010e62398fc704ef6f8f8ac682206c97cd5030038965c06bb055077680db181a5902b285f991fa82e7a21588775f6b5da1514918aeeca7c1f6ed0efb6d32451d2cc1c69ff28898010e3e10ed9d01a8aa6d4c3684198b4300100ca7f6829624f00580bdfc2bbbdf398491403b10e98adb7f38d22ea7b41b797c33de18acec87343d53616e0af84454736aaea3ed1b7cd9c5c15b8f3f07a2722012ac85c85778ddd2a4121004ccf25890efe844ae2144a5f9493d21d4c7ab3d7cd35c04ed6123b7aa1938861ee576e",
  "dc5": "a35e036252653415fac73ba356e348059f0f591b9350130204ead9b634e356f724f6617ae23c78824e01244b3b4d3293c858121e48b533d9f03b8abc1d84da5e94ccad06aef985eb980b3fd7a6f70fc7ed71013ce53488744729686f521c87eb682ece90b99a3f00a4f70f3353922fcae46f1cbe85b8d428c4ca6db028edcad36a5796f9073af0c0cade6c569d46495d520b8e18714aa7b9ddf02a7d4d5ea0a31b0863b219448a6dae63903413b424e613feda8d924dd76866084ac31462cd868b70c9b71816e292a6a210855e3d3daf90fe5c36eb375360bd906439fff4372e85067f341ce92a477c13582257ba10095193f3e9b5c57cc81628d87cd56c44cd",
  "dcId": 2,
  "banned": false,
  "dateUpdated": {
    "$date": "2025-04-12T13:08:19.546Z"
  },
  "firstName": "Vladimir",
  "lastName": "Anisimov",
  "messageCount": 404,
  "username": "anisimov_yappy",
  "id": "6803433679",
  "remainingTime": {
    "$date": "2025-04-11T14:41:41.358Z"
  },
  "spamInitDate": null,
  "historySpamBlocks": [
    {
      "spamBlockDate": {
        "$date": "2024-12-21T07:57:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2024-12-26T08:52:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2024-12-30T06:58:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-01-18T12:08:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-01-24T10:54:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-04T07:31:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-10T14:54:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-25T12:51:00.000Z"
      },
      "spamBlockDays": 7
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-28T13:19:00.000Z"
      },
      "spamBlockDays": 30
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-29T13:05:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-04-04T05:41:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-04-15T10:05:00.000Z"
      },
      "spamBlockDays": 7
    },
    {
      "spamBlockDate": {
        "$date": "2025-04-11T12:34:00.000Z"
      },
      "spamBlockDays": 1
    }
  ],
  "nextApiId": 2496,
  "twoFa": false,
  "twoFaDate": {
    "$date": "2025-04-10T11:29:41.475Z"
  },
  "automaticCheckDate": {
    "$date": "2025-04-12T13:08:19.546Z"
  },
  "lazyCheckDate": {
    "$date": "2025-04-12T11:41:51.369Z"
  }
},
{
  "_id": {
    "$oid": "66dee25bf856541e1b71cd69"
  },
  "accountId": "1723219097-support-298-last-9-sep",
  "dc1": "4898ee9f98f84d06be2b0bf7a7ba6bb94909bde02133558ea6ce77c09078547d52622aa9fc7e6beefe4f9e816860c9c27235e8afe6d5af878a75d8ea2837dacb0cbafab834ff4a4272584b106a56e18d7281b3331349106cc02c845037b22fbd9cb047ea66a7a38b4db5a6bdb01d079be54d95d165be1d747253849b65e0a81b481a7fdc5c55eafeba5a917680078f45c1416450f69f18618707829202cb3f25489ffee5d931edb8d311b3830f685ccfcff5f2965eee4bec2f383a9df0ff3a35c4e4d30f4924b3439b69bf99dd76a94710922311ab0ec2d43b71933b1e2fdd2120f5074de0e2e77c565427598953586faf38d95eaca1f90a1aa87768adb927e1",
  "dc2": "0f175f6cc97a58c74f0f5600db63dcc0aa8480ed9be34c273dce3d4ffb1711cc9d66492e402750cfc0bad18cd382d27edda86c1893e00e02cb1681b700c3f47b9665adeb8f230cccf9802e9c62b2201cce31c58d5a3a34441172f7baf53eff23565cb321d4d0866dfd7d36fbabfa3f396e08e367494bc9e59ba10d4e257d1dd7c2ad43fdbe7cfcbef68c0628cb3428d5640ee5a1a64552b883b9820af5084e07341dbba8faffb2e5d630beec82afea7a077477735892134c7fc9155d5f84fcb296d081fcb0df287aeaf176deb0f0b162471e1b7fe446b7616f0a99322ac41ff4631b66d117b2ab2e303f790a01a9c9c04fc0682625647ba15ac9bdb4bf05cd40",
  "dc3": "6509b0ef66164a12e371c154c8dde1cd2046084ae1da79053f54c93a5f2e010032a9b231fb7bde07a5a7ec513afa495e9d51984645428493d08d83da5ee133ce79ab9cb1082ea3d164fc45ae4ec2f9a05fd667db812d1dfe052adcf1cdd9ce9252294e8751b1b385d86e7584fc7af02b0add81dec922b9ad54e3241bf84710c77cea52f1bea5e28c847709f75ae21a867eb1a361653fc5481b6ff211e934d1f0e5d12cd0c3f48a83205950ec5e9b695ba9d0a36f061c32e73d4b156159b3e8d026f6fbe5654d60b2f354434112aa0bf4b6a91e490ed4bfc4dd209af934845885fe760b8fb3463272bc097d347fd83752a889414970c701890319e27fbad12d6b",
  "dcId": 2,
  "banned": false,
  "dateUpdated": {
    "$date": "2025-04-12T13:07:19.695Z"
  },
  "firstName": "Igor",
  "lastName": "Shevchuk",
  "messageCount": 486,
  "username": "shevchuk_husky",
  "id": "7005461475",
  "remainingTime": {
    "$date": "2025-04-12T07:04:35.521Z"
  },
  "spamInitDate": null,
  "historySpamBlocks": [
    {
      "spamBlockDate": {
        "$date": "2024-12-21T11:40:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-01-30T11:08:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": "INFINITY",
      "spamBlockDays": 0
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-05T16:22:00.000Z"
      },
      "spamBlockDays": 3
    }
  ],
  "nextApiId": 2496,
  "twoFa": false,
  "twoFaDate": {
    "$date": "2025-04-10T12:18:05.268Z"
  },
  "automaticCheckDate": {
    "$date": "2025-04-12T13:07:19.694Z"
  },
  "lazyCheckDate": {
    "$date": "2025-04-12T09:28:09.161Z"
  }
},
{
  "_id": {
    "$oid": "66dee25ef856541e1b71cdb0"
  },
  "accountId": "1723229537-support-298-last-9-sep",
  "dc1": "8af354046f441e7b16bfe6892d7bdd7a1978b7459e280d74064c6d153f6ff8dfb5e7a59e986604363c69d22dc495d3a3bb69a80e0c1a14b3f92f096360532d5062bd32f5fb3f6118ab002d232978ba9748b6f20baedf778a80c224236150fc5c237aaf43997a7180cd84e627b21154ef5878637893519f0812db10cceedf65cc19a5b789121aab83a13c45acde710bc1c1fc77d667e2622b6cb6d5bb895fd3f2b7de333f204fd585ae7896efd15b095406b58e6ba88d7350ef588313efcc7ee5cff909ca2391dede52111acf8c2225bdbf165617cb6cf29951469b1063034f273aa97bd6355f61670927d37e07bc571fe083065df545feaa064c184f69cc653f",
  "dc2": "781d23aa98418aa4ef18be50c3626e1fc6cbbcde0fcedce89c178a81f39a1fd4b9141d6e0d5d0904fc864e9643d41c1267530a7df1c4a6e26d1cbc252a136e64f7f07f17e99015e801e90757f89f3304c5be0634d84027d2f37cfcb939cc312260fa9126b51af56c9db00ad6f820df50c212b8da39844f102bc051a0026ebc403238c417aa8644e20ee67d30f4e0e63a5b4ab0c8783c7d39fcdbaffca6bead674ecd00fa53bf0d27dd9259edcf6176e32802ded0f940ced7a19dfcae52eb09e884978a7ff301647d5affca9a3760baecda444dd2f8d482590ce619913a92d8ffcacfb7c8f692984ecdbe7e160553ee56075df53d25d08faaeb49a6100d8d3a14",
  "dc3": "992498f5422c02d35fe2fe4af147026ba91fe45f10337e3cab24c7e43eabc1fda94a0bcdb39be925ffa41d0c161afb63defd1d9a5812b261140eb0846bb1dcc189d1a4638dd13a49338bddf253a5f11f297332165895879037ec3088a7ffff0d8556382ca73691f40383b539fa578cf9ad94e472eef3c9190cb3672293da01f3bf1daec7672c2bcc67c5ed67672108a7eeadc8671c888e0a4e16e3342a2c93ebb8cfdc7e41f812ce9c6d0a0a35ff5b555308ec0d692eb37c264db569661898d06be255dd555b5eebcf5047c93a98a5690f2f5443d31282fc00818833dec8123b05652737db2d5e8cdb6730adce9e76d8bacb33b4e2456c3c1ae1ca2930e4f24c",
  "dc4": "b9eb7bb1d4779ce9009bc12bdfa832284a6258900cc83c45b26fb854aaad24e17cc77005a0a74fff907f3a176464ce3f43d2f6be3e7319b2af868be345391428f545ccf2738bae7c5d887822961f77b2244f5c37bfe5b89cbd7104da07da7bbfdef408c5163ecec02b24fdc018236e0e35d05572ab5029f115f7e1857710ed954d615472d18eac8ce3c8510dccfea81978489bc18d97853c6977f72df29dd48fe5318b6e3b7f0053be593f2507875e6629676c554bd63dd7d1d9dcb35daf59be79b9cf65c08800eb748478c59b7e6a1c27b4f6be93b9d7495c0bb4e1fefaba5c9767e4710b5cb0d74cef31973eb2d8ea1a4969708d1e5bc0e4680c2197a28912",
  "dc5": "44bba80d479edf226c97a9860020db4301c6654f03d4bbe41902f0b20946769c59074b7978fab2177ce2226ddb3fd4c52997d2a908d5cb4dd3e66872c49e27357f2cc0e9b14a99f06f1820e95edcb006352b6578c6b2bc113c30e2c6605a927af6041dd231daf44bb48c89fddd87ca1d1c4df235732b745f534c38155eb60ec60b98a903966b6c9377d4b9bcb95a325d3efde3a7a91bd26f36dc6a51271cdcd32844eef59fa54de263e5544c027146c6b9e242aba21bbea4b7d7cf840418a77df8be2c1edf215d00489bce8c5740c20f88891a58024a482f00793d90cfb504a7b5e18242cb2ed1a513ff6a0b87cd98913ed0b7d00eef3dcd7bd6aa242a4f0ff7",
  "dcId": 2,
  "banned": false,
  "dateUpdated": {
    "$date": "2025-04-12T12:28:17.421Z"
  },
  "firstName": "Ivan",
  "lastName": "Shumilov",
  "messageCount": 353,
  "username": "shumilov_fluttering",
  "id": "6387040108",
  "remainingTime": {
    "$date": "2025-04-11T15:28:05.410Z"
  },
  "spamInitDate": null,
  "historySpamBlocks": [
    {
      "spamBlockDate": {
        "$date": "2024-12-06T02:09:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2024-12-14T11:07:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2024-12-23T07:42:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2024-12-25T13:11:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-01-18T09:47:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-01-29T12:18:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-08T07:26:00.000Z"
      },
      "spamBlockDays": 7
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-03T11:08:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-03T20:45:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-07T05:43:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-14T10:26:00.000Z"
      },
      "spamBlockDays": 7
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-16T14:09:00.000Z"
      },
      "spamBlockDays": 30
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-16T16:03:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-22T09:30:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-21T13:43:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-01T13:06:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-11T10:54:00.000Z"
      },
      "spamBlockDays": 7
    },
    {
      "spamBlockDate": {
        "$date": "2025-04-10T12:14:00.000Z"
      },
      "spamBlockDays": 30
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-15T07:18:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-20T07:37:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-19T10:17:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-22T10:43:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-26T10:37:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-28T08:05:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-31T10:27:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-04-08T07:53:00.000Z"
      },
      "spamBlockDays": 7
    },
    {
      "spamBlockDate": {
        "$date": "2025-04-11T10:35:00.000Z"
      },
      "spamBlockDays": 1
    }
  ],
  "nextApiId": 2496,
  "twoFa": false,
  "twoFaDate": {
    "$date": "2025-04-10T12:58:17.245Z"
  },
  "automaticCheckDate": {
    "$date": "2025-04-12T12:28:17.421Z"
  },
  "lazyCheckDate": {
    "$date": "2025-04-12T10:17:13.775Z"
  }
},
{
  "_id": {
    "$oid": "66dee261f856541e1b71ce0c"
  },
  "accountId": "206-support-298-last-9-sep",
  "dc1": "7d665c5c8194c56d625d67ca7f1b2718a8960013d3fa70fa4e5f10732137e591b537de56efa83528ce2119dc00e2e282199bd71bc30fd8b007a35f9d410356958816abca0cc7f6a2c93eabb86d7ce7a9bb4ce573819bcbdd1d4d05882295733d9434e40862b7a111392f24f19a964e2460be2eeac717c5d019542ae79c6b2bfede3102189a1931e3c402f18a881524399a1203c5fd397733ab7984dee16080a085565807bd9511bcb6405be97554bb67497a80ef501bbc6d033ace2cbb5559f8fb5c24972a76c0894a85a81c430195f275fde6f5e2323a57d69ce1e30e1dabd10f111f3e483b694bd290a496f68df00176c7c4848d396c6a6a3dccf70ff41638",
  "dc2": "2214061bbbd94e430811b4f5866945e767df62dc23e84003dacce692e432dbda94f2e6135fc28db0599c364f0f4fd76ed469882ff669c696ac63f126835aad55b6d0aea1e9dd93d52eed0d2ea84fab8f58bb4a6eb78a21bcd6578e887a51996e7994489188c9ef5578a173a7a977ef2a426f46dd63f9c6f49327a5f11dde20f0d309e3ec8a664b457df16aa3f1b8dbe427cc21b655a426373a304ae7b206131e432f68abf6c999b4ec82610376f2588fc6a3fedfe180f5648db67b0c09fe2355315e7b31ffcb9297b5a7d11411a56ee8d21ad981df3b8cc733652e521becede3a390ba76d56241fc024b3538d8da6d765c50bf5900ee31ac000a3a2c95e029cc",
  "dc3": "568b63a9e912cc9bcedbd5a38cd4835ed0b84747a51d06cdf7d8dca70de6554979dcdb6697edd3f651b9157474f1bae34d2c291b4c148f4c568d22cc8539ead4f0c6cc0c8821c4783ab977d8c00015f58d3fcbb71b2c79e9a39c39a62912de9910758ef73cb5d8373ddfa7ce5cd0dc9bcd15e17559aad093aa15c61cef2a87531b468504af35a2bb581547792e5c0872c7a5797ba6d2a9d5b644864272a706ae51ec01ab7e90ea11e4e2b1972026afcb657a7435647a7fbd0e3a254c80ad325786e33e78d397b9ed2d39e7912b236ed7b6253844fd210edcfbb8a1641f0a089688a72137ac44f40ed177e54917ebdf753bb9584f5cb5521b3711a49ee055e3ce",
  "dc4": "7c95e5d6d255e9fc2e7e3217866c4de4d30b36e7068162625833aa672ebac1275a1c5393c5c55ef40532e503b8ca1555660699448cd472f1c5cee1662cdf9a628165f80e0630d8069320abbff37c218d7df2ee23b12d6b8a0a92c5e2fb0ffd5b9e6953db2a2edf08aabf2c900690aabb66f761b986e53d1c3e49e516ce9812e9dc4990f81b706fd3765e0116eee7cd7f1200df7afda395875452343fd2758ebebe5ae98ebcd27d5bcffb220c6e35ed50df7093d17f7f3dd92113420548969c1a0fc86a233f39581d1bb67a0fdcd3364f6ffe4d29b8402d24f22a6876df0ee774332e50d2c712e2f8e6550426e59179a6f8e1880a3ba06c0d57069fe611de8501",
  "dc5": "51529dbf15b5e485081bbfa7251b5ca5000853db90d1a6ad03bf1d7fd7b8d1964dbdeb90e5907660c97744889dd1e959dc3c620f391b00b16b03d3d96efd10ff4a9b19b6d79f0cc55d0fae42a425d0dbb0304feca1f06693b988a072b98e254f1503b6b0e7f7e468039e1282cb3138a69a2e36a1969192ae2aeeaa4490544b3f083663089cf35def1548400a02549ffaa50bb42010bb7539e64444c75a062cea24525ff7e706de3d6e35dc100b459439f908b9a61bd7a8a1c2cfd19d745004edd5bef48d61a6f3a2b111ccb571c9d4563f5e45fde86ca4d39b15a72a47122e9599a2c2a7ac0f9205b6b7ed8accc8bbe5f49293439212a7cd1399934b1c10454f",
  "dcId": 2,
  "banned": false,
  "dateUpdated": {
    "$date": "2025-04-12T13:05:46.865Z"
  },
  "firstName": "Timofey",
  "lastName": "Shirokov",
  "messageCount": 433,
  "username": "shirokov_striking",
  "id": "7499773379",
  "remainingTime": {
    "$date": "2025-04-11T16:47:20.742Z"
  },
  "spamInitDate": null,
  "historySpamBlocks": [
    {
      "spamBlockDate": {
        "$date": "2024-12-12T16:18:00.000Z"
      },
      "spamBlockDays": 7
    },
    {
      "spamBlockDate": {
        "$date": "2025-01-23T08:37:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-03T09:24:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-06T05:37:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-09T08:27:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-02T12:07:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-12T17:24:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-13T10:41:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-16T11:54:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-26T10:28:00.000Z"
      },
      "spamBlockDays": 7
    },
    {
      "spamBlockDate": {
        "$date": "2025-04-26T07:24:00.000Z"
      },
      "spamBlockDays": 30
    },
    {
      "spamBlockDate": {
        "$date": "2025-04-01T16:35:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-04-05T15:20:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-04-08T15:27:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-04-13T07:38:00.000Z"
      },
      "spamBlockDays": 3
    }
  ],
  "nextApiId": 2496,
  "twoFa": false,
  "twoFaDate": {
    "$date": "2025-04-10T11:29:13.958Z"
  },
  "automaticCheckDate": {
    "$date": "2025-04-12T13:05:46.865Z"
  },
  "lazyCheckDate": {
    "$date": "2025-04-12T10:54:21.327Z"
  }
},
{
  "_id": {
    "$oid": "66dee261f856541e1b71ce17"
  },
  "accountId": "209-support-298-last-9-sep",
  "dc1": "99410921a5ec5787f719d732bff7cd5c4566fe6a3114e93cdd9416262dc8283590d37ef66dbf8ecb4fa893a8217a9346e8c88c0c1bae0e2dfb00823ea6b3a7ee089c6ef04207c6c632594dbb599b17775a96865cefc9724375cc1a6bda7e7bfdf1808460b4452b471e35fa63936bc457f80d5d98b5dbeeea9b52aa1376b5fa6e26ef695e3b168d71b7f7ba2447de9b2f9d8af13cf0ff3d7b9e0c0ad02daa06dbe9fae9f40a3acbe3aa98f82febe1c9050dfc8875a597bbbd6cfd88593d0c8096d4248988300f13b203e0f1a9d15160c9cd94860944b2b15d5e4a7e116c28f53f02f3f4de3184d560d733ce26d52bf55fd5d7bce7cc7262290fdbe822ad620537",
  "dc2": "7e1c65b8ce66af42afc798483362144005b658acc380d36038aa63760a0f7b5d16ed9717ce39b2b4b06d73d2f54d9c246c9c6b8b8756600c533b7c137cc19e0dc8e97d9841c3440cbae3f6e6bbe06c40d65598862fcadc2e8704fbc9c1f3870d6b72d1668cde7d937b6ced66365c706d574138a102e397f68d6072378e9fe38f716122398df21a69dd4ee2e75f98a0e7564f794acfaec64d3a8f5f401447c57187e70bf182b5998bde0a411da567903cf45e7602292f1675aca37f77bd9a738120f58b634ee3445cd43b538599f1bbfb88ccd0d844e40a82ced6217ee682d7d49e09eade43d686eaf2bc78c2e6e9945b3466ff11a66dafbe252b7cdc198cdcd7",
  "dc3": "5a305e215b2084c68eb3deb4af625b50f96a855185268b49156a72d040fd71abb0cefd6f1b8406faf63172b3c2c13a11ffe4b840f74f4c23e1c3ad42cbc14abaab0e327552a123b1d50b1adc2ae61fb79608d07fa74ffe5e41cbb38927772c6824a628a9705ce1decae72195c4c8def3a7ea4e1eceddcc691835e54907fd512a494e8b4ab3514483115db4f5b9bf7f6e1ac78a104f84ba55f9eba8220d2723dfdc29230a4ecde8a892acbbad6b813672e03d7fcf74b89ea80ecd0fafb95f7bd8450378012d1f862ad80c34cf466a2f7aaa6c8617ca63cf830d064a5d6631763053230075320223947e3d9d10caafa407cafe2eaf449117ab0f2784315b8a2ce7",
  "dc4": "48424191ceb7cb0a6e4188b5b49c63d6e5c699b4a09150d2de80c90a3f9fe84bb3cbbfb1fe42c63ae8a34c5504df2913f860dd102b2a02b020f56172ebb0e19c4b8cb69f3ad7735d743711c25c8895bfd7cab3c1457cf14c6878644fa37650ac329959baf7237cbe8e0d4b50b62c02b98ced5ae00b2dfd663d9467698b7bfbe9bd4354f33c8182d03310cf1b64f41c61933929cb8448b57a1bccaadf6996df99ed8658c13ab2d6dca5e6a6823ac2800978430fdda391fae14538ec5950ff2a9c101019faac65ca87a2110675dc0ab90fb4f633722ddd002dc85b9804eae0ebcb5f550b69347afd214a9c9c39e78fa98681095a2cd7c8c4557202040cca57dec4",
  "dcId": 2,
  "banned": false,
  "dateUpdated": {
    "$date": "2025-04-12T12:59:56.434Z"
  },
  "firstName": "Grigory",
  "lastName": "Denisov",
  "messageCount": 326,
  "username": "denisov_real",
  "id": "7486392100",
  "remainingTime": {
    "$date": "2025-04-09T12:31:35.961Z"
  },
  "spamInitDate": null,
  "historySpamBlocks": [
    {
      "spamBlockDate": {
        "$date": "2024-12-11T22:17:00.000Z"
      },
      "spamBlockDays": 7
    },
    {
      "spamBlockDate": {
        "$date": "2025-01-11T12:34:00.000Z"
      },
      "spamBlockDays": 30
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-12T13:59:00.000Z"
      },
      "spamBlockDays": 30
    },
    {
      "spamBlockDate": {
        "$date": "2025-01-21T08:45:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-01-24T11:44:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-01-24T08:37:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-01-25T07:22:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-01-26T06:47:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-01-29T08:54:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-01-29T09:50:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-06T14:31:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-14T12:58:00.000Z"
      },
      "spamBlockDays": 7
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-13T19:23:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-17T12:07:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-19T10:41:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-20T12:28:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-25T09:22:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-07T07:58:00.000Z"
      },
      "spamBlockDays": 7
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-06T12:37:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-11T14:10:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-19T14:36:00.000Z"
      },
      "spamBlockDays": 7
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-26T12:23:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-31T09:23:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-04-07T09:37:00.000Z"
      },
      "spamBlockDays": 7
    },
    {
      "spamBlockDate": {
        "$date": "2025-04-08T14:05:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-04-12T11:14:00.000Z"
      },
      "spamBlockDays": 3
    }
  ],
  "nextApiId": 2496,
  "twoFa": false,
  "twoFaDate": {
    "$date": "2025-04-10T12:58:17.238Z"
  },
  "automaticCheckDate": {
    "$date": "2025-04-12T12:59:56.434Z"
  },
  "lazyCheckDate": {
    "$date": "2025-04-12T09:26:52.502Z"
  }
},
{
  "_id": {
    "$oid": "66dee263f856541e1b71ce4a"
  },
  "accountId": "233-support-298-last-9-sep",
  "dc1": "7555314af5c14fa47ffa2f7745e473169604e4ad718b2042b00ed02c45e1e160904db6bdf8cd90925bf9943a57e0491a040a4eb121643c4ff022e20529424fc9b7f522a51bdeffcd1062a20ec311552de469104e64335b20d1cc02722296ddb74056f79d9ba51951870e36bea976c797218a699c48ee542e35c372b12e5243cc6338f7709c5d0a4d074541ece487576595219a35bf918f0249bb2d9d1e66ca20d88bb9b7dfd4f8778298e064ffe7c49e95989b4c6f824d896b849b88e0c75870d3f5c94111368b4dd852200e46e3808adaaaa2c786146ca2c9b2c466884fbeb450c55358619642003a8655a489a2ec869deb74c6d7f2cfa87b96d594391ff4bd",
  "dc2": "642a854b8604f482b0cb7fe5c7c533003ceb2240b41112a984e4cb870593dc2aeb7408a05881332a3ae8441a920ad328b6b615c3f831533a0bb9d05f2dc753df051898e591357f81b841e4c721853bc0d979932bc72ed35d50238269d307eb108474c0d25433b4b4a2272f2dd9d3e466a2cc5847a20804c506eae23149466f94e031ed4c7ed233a9bd09e99a9f22d428547e9b6018b0add5ca51a53e833bf8bdcd3163b1ef1941f0fa3ba1158645e8688659a7a8339a423998131c9dd51ad6fc43f8a279ce2eabea3499ab0d00d9b0dafa06e3cead57af421a59e61e2cceedb81be9d7dfaa8bfeb9aeccbc450c3afd5254b83054892be5167b769628e98439e9",
  "dc3": "ab88b16b652c65d48d2769b56773a4d6ed33de461efa32f873a7985ce88537e78987a54d4e849a438ab8bb3141248103cde8425315f682ef1347849e343e4e5e194aee79bf4f6e0256f96f3dd7976c5db0ded7983787cee9dd1d51604bb37c731b6c5ebb7509d09cdced89a861290d6dc72c11fcd1d1311b1ecab35ec6e7e8f962f0002a053cacab30869e1b6557f0c54a640d5ac3cf291bdf880dcb7e81450cec8bdea9c2a11e7afdf9f6651fd974fe1f71083d43cc112cc498eef555dcbd37a8c9a15b36395a235cf672600fdb7c83e81296ebd60cbd64039e181c415b7dae582ba4c4787d0aaf5119f2b886dce311f2bffe0a2c322c19bc44c21c3b359e99",
  "dc4": "043bd9597c06184373b7941da59c223fee32349cd6d71cc7b505f3067f1a906f3d1bd1878a9747dd9e81cff25fd7e3fcb7c3b89556b15d10c5c6893da3f0610af712078d507b6a67da9df5784387225964c2e7e50b822796e5601b9a71f220badaff43b0a3a6fff6639602ed1e67c673f253fc666831d5ab606dee99ee2d3c4b171c0244cf12376437ef4e7fbdf96105756f6066e14ae9d00e590b6aa31952a3fb132d1038029144ce253e1e7fc667ba33028638871a51876ac3a4da0028577539ce28b2d54e811ee8a1b6fdfa68ca41b17e4c19c96c97c9bd859ee7d1852398698166c7fb130e71d1411f4aef8aa0d59e4fe6cd7e88a0fd02152c432892883d",
  "dc5": "359db12b60280c83aafe2929d5ec0d437780d96cd4cd7c9124d499f1ed6338a81c0aa29554ca81fcf9ca8a04893836e39620f2706c45c4297b25459cb1279297eaed1c1d6aa1ca5678e2806dcdbd8c3643fed82855ad57145818d4c37a2b030d94b9dbe1512ed4f3e35b297d90bd1945e0f485e4167fe57ec09985fcc386296f6eb8b0a35d9a2cd02e352ffe20c3bf4e377eecd389b5253224463057e96f3a42513ad181cd5f55461df771f33ef3bbfea00eca933b82f2ca70f8aa3e7f499f755538c7942f6d3da3c1c5a816a7544d7bb97b5e4db1cc6f3068a491879b537ae4f7800e0e6c4079e2587ff4758350978daa4afc56fc864a18b79e47555de3b8cd",
  "dcId": 2,
  "banned": false,
  "dateUpdated": {
    "$date": "2025-04-12T12:57:06.006Z"
  },
  "firstName": "Valeriy",
  "lastName": "Osipov",
  "messageCount": 349,
  "username": "osipov_ideological",
  "id": "7324965558",
  "remainingTime": {
    "$date": "2025-04-11T16:19:03.122Z"
  },
  "spamInitDate": null,
  "historySpamBlocks": [
    {
      "spamBlockDate": {
        "$date": "2024-12-02T12:57:00.000Z"
      },
      "spamBlockDays": 2
    },
    {
      "spamBlockDate": {
        "$date": "2024-12-21T07:46:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2024-12-22T09:04:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2024-12-24T05:37:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2024-12-29T05:45:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-01-19T11:05:00.000Z"
      },
      "spamBlockDays": 7
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-19T14:42:00.000Z"
      },
      "spamBlockDays": 30
    },
    {
      "spamBlockDate": {
        "$date": "2025-01-23T13:50:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-01-27T11:05:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-01-29T10:02:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-03T05:46:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-10T11:20:00.000Z"
      },
      "spamBlockDays": 7
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-13T11:56:00.000Z"
      },
      "spamBlockDays": 30
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-14T08:46:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-17T20:05:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-25T10:07:00.000Z"
      },
      "spamBlockDays": 7
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-22T12:40:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-27T08:50:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-06T13:34:00.000Z"
      },
      "spamBlockDays": 7
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-05T04:44:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-08T07:56:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-15T15:39:00.000Z"
      },
      "spamBlockDays": 7
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-14T09:31:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-21T17:26:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-29T21:53:00.000Z"
      },
      "spamBlockDays": 7
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-27T13:29:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-30T14:11:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-29T11:11:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-04-04T08:36:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-04-09T05:44:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-04-13T13:59:00.000Z"
      },
      "spamBlockDays": 3
    }
  ],
  "nextApiId": 2496,
  "twoFa": false,
  "twoFaDate": {
    "$date": "2025-04-10T12:58:19.471Z"
  },
  "automaticCheckDate": {
    "$date": "2025-04-12T12:57:06.006Z"
  },
  "lazyCheckDate": {
    "$date": "2025-04-12T10:40:26.017Z"
  }
},
{
  "_id": {
    "$oid": "66dee266f856541e1b71ce8e"
  },
  "accountId": "263-support-298-last-9-sep",
  "dc1": "32e14ee05c7a56cb64ba7d0c62c43df2cb32cbcfd75c980ae992abb196cfdef9879baf85a4ff0739ec6913b0ab8b484d063c93465fa75d8b3ef918adbe659e7a27ab066111d1983213b1c944f313fa5e59fe3050ba4f6ce6433a4b845988eb51717948571afcbaccc89ea8ad3c1dd4ea10809d5c2f5929ad3827c858ac58981b00b2edd627936118337ec6790d37c6a013f3fd797327b89f4f5466ba664b06424fa2b842a7fe5d631200656e80cc81f1a99ed9de4d188dd245a927368e13537bf25b56b5c621c7da0ebd62f39a840fecd5605adc964c188d81c13f2f15a1b65bc307fcc79517775f49ab82007442ba5825c915f194b9f7cefd31d5f29edd8044",
  "dc2": "8becd29884916c707ef22948d803564d3c837d3de90a1dc924b3fdd6b36ab270c8ae531eefa234787bc7eefe71fcd46eb979c2fd8b932e799416ae69fa77e89aee6b96788a169cc14e5bb76b29fc218b51a21981573fbcc72e3562b9d68ffc2bb808def7fc415cf9d8f004060d48574cdb37f69fbf4c8512b80c8086b64d82acaab19a7bb2c37c8eb326577626c2483fbf51276e6cb60151255e34abe29bfd456db57da2eb14418110698fe69cc9f984ab7548cb1104666086c9f69abfc3fca470b42a5627d6aa5efe03e9d08ace8b1bc5210c83a5db0687158b22760ba30ca6ef3d6cda1c86b1c7f000ee042c9d02d530ea38c3da6911ecbe2456df3a21ecf4",
  "dc3": "6aaf8c7858d83c3a262c19a88c9eda99bf8289e3677d8eeeafd814329e738c97243119b3f4c63a82b3104cbd3a56d6f95bdcf7e0e7a1886183d9b49d480b9e21bca38e0b42aaf3e201059fd3ac53f5f10d47fcb5fe167be9b0ded268c2e567daeadcd8597a874ffc283bc51d2fb1ff514ba72df0daa8bd742708a4a53a52013dc0ce642992be8a49a35074de220c44fa68bf7d3d7263069f05a6e87ef52629b6a569ef3cddf37f70a198cbf19469b12f60397306a9f2711201879e7a29a10c77c574fe65ad9e89e6f163a9f480f9cd06cd469ec279350d1d1078380598f1fef158ee3cb7ba3352aaa7b3dff0bf323461ae48880846bacca273ad0a80b8d53638",
  "dc4": "323c9e19b536ad186fbdba47157935317eac8df3fa1bdef889cfa4d6ca274c14025ca0e92d3c3ee7018be72b1f140372a89611153bbdc6a59af63ccfc98752c3d1cd3ee9c553cad6bc0a5d54c82db5031175505ed60ba5916d1ab9c9c487bb5adf5b1ae23df7387ecd0e0ff64f85f0b59c02dc729640579add56303e6eda0f33eb810d22d8a4102069cd396f023094117ef5b7d6711d902d63ac93168ccf74dd1e77b722f333bd5708029714bdecc4d1c1958bd96dc95397c1f298086dfa4a42757b7b69ed41763ce08eb5e2177d7aded54208162fc52e7ed074748eae7e88ee0e2851e3502b5d1e9f2c0d3a6d395d04e3e118ace3939b26a28c3293f808ae22",
  "dcId": 2,
  "banned": false,
  "dateUpdated": {
    "$date": "2025-04-12T12:38:43.924Z"
  },
  "firstName": "Mikhail",
  "lastName": "Puchkov",
  "messageCount": 274,
  "username": "puchkov_thin",
  "id": "7080381634",
  "remainingTime": {
    "$date": "2025-04-11T14:54:17.667Z"
  },
  "spamInitDate": null,
  "historySpamBlocks": [
    {
      "spamBlockDate": {
        "$date": "2024-12-02T07:41:00.000Z"
      },
      "spamBlockDays": 2
    },
    {
      "spamBlockDate": {
        "$date": "2024-12-03T16:52:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2024-12-07T08:20:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2024-12-16T09:28:00.000Z"
      },
      "spamBlockDays": 7
    },
    {
      "spamBlockDate": {
        "$date": "2025-01-15T12:51:00.000Z"
      },
      "spamBlockDays": 30
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-18T08:05:00.000Z"
      },
      "spamBlockDays": 30
    },
    {
      "spamBlockDate": {
        "$date": "2025-01-25T07:24:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-01-28T07:33:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-01-26T11:12:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-01-30T10:11:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-06T17:12:00.000Z"
      },
      "spamBlockDays": 7
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-09T05:36:00.000Z"
      },
      "spamBlockDays": 30
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-12T20:38:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-16T09:47:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-19T11:12:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-23T05:09:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-03T10:06:00.000Z"
      },
      "spamBlockDays": 7
    },
    {
      "spamBlockDate": {
        "$date": "2025-04-03T16:58:00.000Z"
      },
      "spamBlockDays": 30
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-12T05:17:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-15T08:03:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-19T09:02:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-23T08:44:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-22T15:33:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-28T05:26:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-28T08:37:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-04-03T11:18:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-04-11T06:16:00.000Z"
      },
      "spamBlockDays": 7
    }
  ],
  "nextApiId": 2496,
  "twoFa": false,
  "twoFaDate": {
    "$date": "2025-04-10T12:17:51.248Z"
  },
  "automaticCheckDate": {
    "$date": "2025-04-12T12:38:43.924Z"
  },
  "lazyCheckDate": {
    "$date": "2025-04-12T10:17:23.609Z"
  }
},
{
  "_id": {
    "$oid": "66dee267f856541e1b71cead"
  },
  "accountId": "278-support-298-last-9-sep",
  "dc1": "930ca370e5f492146dc94db8638440ae90db6377a8178132dd718fb2a2921494e133e4c633a47a9fa052aaface54d0ee940b402745db5d0635e074136f112f0fefa07e11eeb7f2b46e1d8a4f469f49940b763569f07180e417f8a1b550bb155dfb500c95f539f4a324536adaaa1164d3b503f166ef7985deebad65430b1c960cb96ef2ab0d1a99da9c0606752adebc9975f719e7f0db2f3d8d350f15a7cc641d93b1dea2f65d74f180fe3e97c5a41acc8530a6745392e37f9c352a283d361b8df917807aa74febe0f3c74652cb21f9ccb282e50db05ffa87bf2e8f00ead1098a25453eba2e4bcb2d9681a5fe389b7d98b528883c40cdb60e7a6a90d7c62b23e2",
  "dc2": "79f782a396c315d804d2c1b752c2ef39246a39850919f0016678fb5d2623ec9eebfb3d3c0646d6a12e32bfb1282e0d1d3b779d9ec911b5d200bb3ecfb423291ca5f672291b299e22ddcd3762ddebe9a3a6700071edb86b0da789c0189b72426c81f67629b84b9ce43b227605e34e1654e1123f954aa36b5fcbd0a8733a408bf45478a8a83758db3a06bffa5ee440b367acacaf2eae07cb73070342de61112a8ed5b075a81bdcd1086e9723e618e2976196e3571765363bf5122a61131e3c8e5caeb1c50e2c74e33726215281e2aacce7f9c66de343247e039ec1bf9106610f0143b1fd7821d03897a001cc1e427d063d63fc292e9e23bc391e9446ac4d3fd874",
  "dc3": "03e31682306621a842a90c20565302efe1a0898537ae764eb86c7f05a692183122c2c36af00e415239eb4d4c7f68a8b8edf5f8f5b528d75bc25db67d0c7f21021a21b4885b95e12fb23340dbc2ec34a8aac89b5a5cb5cd292f4291cd6a39ce5060f3cd65e33d544359c46b4758bbcf07f99aca80efdb9016ba9511346af505c1b171c65560d56dfb5f82f21a4d401c7611809358059a7caa6fc6fa4be26ab93e3469dd1fad90a8bb6ac43c7b75e522a64c38ef3ac86c2247b95a57b1e5528b30005b16711382b9315f7e57a3dee92816762b0652b461313dd0c17219f7fbc3ad1d5b715ce9c9b2950acae6c08b4a4e39eb98dbb68bdccb998b3ed7131007f401",
  "dc4": "981d6859ee34350f657127d9385faf29a111719552761350fd0dd50557f911d21bcf4a3d6935c5e7756f3c1eb0df8bbfa41bb8f9ce8e8f3a5cf3e6bf3d40029e95a36a587bf0c0c078bf4cd0e7072bf80a5039991452992e80c61996811815deb401f3772a0c30a334a02890043334d20bbb89b66d6badac5d327d9d1b4865474e92a3a43b4c98a19a1f4a31ec33f51336bc29b6a899e981e62a96b428fded0a38f2f2cae30c6789ed520dfe7798f54877829ea8484acbc7142794164e90255073451f92d0052231e008133047f71b0f18bed03e1d757fe73452b990f8bbc3f0b76be2f236d09918af4f8022c45b7752086a65b0b27a9beabf1554e0f3f097cf",
  "dcId": 2,
  "banned": false,
  "dateUpdated": {
    "$date": "2025-04-12T12:31:37.622Z"
  },
  "firstName": "Victor",
  "lastName": "Tomilov",
  "messageCount": 454,
  "username": "tomilov_brown",
  "id": "7388334068",
  "remainingTime": {
    "$date": "2025-04-11T16:58:38.405Z"
  },
  "spamInitDate": null,
  "historySpamBlocks": [
    {
      "spamBlockDate": {
        "$date": "2024-12-09T03:30:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2024-12-15T06:58:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-01-15T07:14:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-03T12:21:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-01T09:17:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-06T09:50:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-08T09:45:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-12T19:34:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-20T14:12:00.000Z"
      },
      "spamBlockDays": 7
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-19T10:57:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-21T12:51:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-25T08:11:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-04-02T11:59:00.000Z"
      },
      "spamBlockDays": 7
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-28T21:12:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-04-03T07:27:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-04-15T10:55:00.000Z"
      },
      "spamBlockDays": 7
    },
    {
      "spamBlockDate": {
        "$date": "2025-04-11T06:03:00.000Z"
      },
      "spamBlockDays": 1
    }
  ],
  "nextApiId": 2496,
  "twoFa": false,
  "twoFaDate": {
    "$date": "2025-04-10T11:29:22.675Z"
  },
  "automaticCheckDate": {
    "$date": "2025-04-12T12:31:37.622Z"
  },
  "lazyCheckDate": {
    "$date": "2025-04-12T09:54:18.105Z"
  }
},
{
  "_id": {
    "$oid": "66dee26af856541e1b71cf0b"
  },
  "accountId": "+79044918394-support-4988-9-sep",
  "dc1": "1a49be96159eb7f10a0cbdd3f78a0f45c508285e70f32024cf2631d9fffaec8081fcfc9ac110b49095e28f7640c2dba63ea2b4bca700fa3d90a5ae949b615c31501a489aa34ad51683dd94a4317f15215b6e83b9bcb13cf377da3b80cad4bf14cc7de2b34fdb962a7e896114bb96fab3d8fd7e64e7155a63bc560ce26502895f3df3a0054f5d110ed81169bb6ab86847010a4282cab28a04b5e6ae4cc47000ceb1a44ad89a10df84e469728a63049545c2203ff18017ac1a46fb4b2ee6661d126bd38ff5e5298f9c023f989028f478f76c7ca4b66995052f19dcd79a2a41a2e52ffab2770a3fb59650fc0366dfac86e17a3e61c85d1de97b754cd6b5a276283e",
  "dc2": "319260d1edb6fe27a7ada342f1f64ec93c288f4407d7379b0b36eeb7d05a09a3397cc0948ae5f69425d4cbdbb58bd687eec5973c1e1e6c83be68887549acdd145e439d63ece06a12e33702dad56291606a8fdd9658f0fa743a4178b2dad61b0890468625bd9b5cb53b5dbf278a34fa9e2f7675b5d13cd9889659470bcde5af421a3834d8f7b5d054005962d23c771cbdf4c5a72fdf0780692bc19ec661978a99f916582a29495fa42d2098fe61b5c0df74c90c1533f34204c4c2704e27205c679d362d0e2e1e044c0eacbb660221744675606473bc212b97f0d8a2861e2bcf38e82fc9dc5c191abc2fca06c11c97fe8d2dcb1863e8fe1e5a93831684236629eb",
  "dc3": "4ed87591e412105074820cf6145f0767c161a14dd57acf0ec7306e1d695f05b9fa1b169defa16d7edb7ee46ab5fb97e15e22a6644ad800cfffe36abde1931a78d869c341d4f6b200874e71704074c7c62e39d6554b13057e40a4a36f152e7651ba134f9e13c1f72f09ee1ff56480852208b6c0288afb71fa4e83d31d31ef8c403b65b97e4662358eaeb1427d23cd223c7a8c11dfecdf7f9a0ba028f632f9899d863f195a68972b04f134b202d64a7afcd1e9ad4ae136b6ec42a21fab28aa598033ee4cddfe1fc2dcef55364ba8a91cfa0d286bc6c1e8dbdb174969b7d61c91ff33c82ea92faa6e1803c8c1286ccd2ac7d86e6e5c3e0945bd518fd626b9406eb8",
  "dc4": "37b28d7b12f0018cce45b0411cfc02881118d61eab03ff3187bb8eb1bfeee74576654bfdf4d000fbb66150736031dc2d742393d2064ce6c20dc61945204096248b06a0ed76d8c6d142113b4cbd81c7cd8982404ee9f7e658b0e2a38b051c37bc79b1c8ff45223082156b0705a9cb75a8c42eae0dbc5db6dcd2f25dcaccf40273d8cda426c07e8fa405f9907d4dd552a8dff1b54123b7c5cc773eeb7f0a14855726950ef66db0e554f7601fbf6e93e0855db03a72e0d0ba5fc42628662c02a3945bf256ce71d3a9c777beace49ae8015de641ae005597b94be791d6c0d82cf86be46e09d102019093fb1b1425871224e01ad87d1f388d14fc91b0b5883c3e209e",
  "dc5": "77dba5f283961d4bf58305505e349153bb9d83fd3d3c304a308a236ba12e19215c7eec9d25b2219aa63f8866850a6d213aa4f65a05366ae1410fab088170ddf6a0245bf2e80b1eacf6ce2f3f5c1258e60b263f9d2894b8a4162a73a9a792fbf7fffb96e765dd1e1a86d0a3cc674e8f4bd4a3f17d027804dd1fbb2660a8bacbeea77f460f2112ab1e3863bea2066f10741b2d467a1dbc90512a8aa5596d52b313e0db556207d8052e1ec3b5743a007c8a3c2461f833d5c29d98a8d6262eb3be2845b6ab24a1a055887b2f14a54a68660ca354bb63e9958c53f21f64ff3b5b1d11596977d1aaa7087c57fe316f18f88de454b10f58597e79d3359ca3bc547a829a",
  "dcId": 2,
  "banned": false,
  "dateUpdated": {
    "$date": "2025-04-12T12:38:44.059Z"
  },
  "firstName": "Grigory",
  "lastName": "Zubanov",
  "messageCount": 412,
  "username": "zubanov_bad",
  "id": "7475732807",
  "remainingTime": {
    "$date": "2025-04-11T16:19:24.620Z"
  },
  "spamInitDate": null,
  "historySpamBlocks": [
    {
      "spamBlockDate": {
        "$date": "2024-12-08T17:03:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2024-12-20T07:00:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2024-12-21T08:46:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2024-12-30T14:41:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-01-20T18:08:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-01-21T05:02:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-01-25T10:53:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-01-24T14:56:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-01-28T05:53:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-04T13:38:00.000Z"
      },
      "spamBlockDays": 7
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-07T08:21:00.000Z"
      },
      "spamBlockDays": 30
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-11T17:57:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-13T09:21:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-19T08:23:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-22T12:40:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-28T11:21:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-10T10:06:00.000Z"
      },
      "spamBlockDays": 7
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-13T13:25:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-21T14:37:00.000Z"
      },
      "spamBlockDays": 7
    },
    {
      "spamBlockDate": {
        "$date": "2025-04-23T05:03:00.000Z"
      },
      "spamBlockDays": 30
    },
    {
      "spamBlockDate": {
        "$date": "2025-04-02T09:57:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-04-03T09:56:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-04-11T07:11:00.000Z"
      },
      "spamBlockDays": 3
    }
  ],
  "nextApiId": 2496,
  "twoFa": false,
  "twoFaDate": {
    "$date": "2025-04-10T12:58:31.332Z"
  },
  "automaticCheckDate": {
    "$date": "2025-04-12T12:38:44.059Z"
  },
  "lazyCheckDate": {
    "$date": "2025-04-12T09:22:00.707Z"
  }
},
{
  "_id": {
    "$oid": "66dee26bf856541e1b71cf28"
  },
  "accountId": "+79526730121-support-4988-9-sep",
  "dc1": "a974ce19d91f51ac8d80f919c1120c4f2928e094621b594043d23769baf8edaf034ccb6a3ae9d9d9d60aff4bd63b0a9548a208e41057f622833f1bea16082d74398be0ab408dfa25e8e26dd04f48ebc6c6d3fac0eb9a9a4ff062045989f73637be0f2f2e9cd4e19fc77012061f0b6fb06ad44d0b83daa8c03e62a028c5e2c497c19b7f9610a05119d7168f72f336d030a516bd1ca0ed7eb01fa94b936d3508f14410161ff9c2e4ec5b1f6316d73bdd1a77a9cc95854477ddb7dfd0ca6e7f56f2a7dd02adc25d716049551fb45cd1c2bc68147294c13ab603f53619d9f1258ea1fb6940428ea1c1afe1546b7e5bfa3601709d926cee6a029eb2dd47b9eaecc6ae",
  "dc2": "21a70597c6f08b4fb856b2cc7f5f9482ffda939e0f029c723f483d7a5f2d7ea5e5fbbf797d06a4cee51fbc16bb6357936f9a316777d2359d0a3701a839bbb6cc20928187c32c3dab1c4ac6fe9915b62d7e8e2609f7de1f1dc3821cd36486a4680eff58f3be05cd27bb6a25516815f0863614f35184194dac783fc9b0b6905231bb72486e02a13d93f6301fb06e2e052fd5cbd9f32057e76c51fe3b02a612cc078689729988ff2e6f59f4fce0d92c4dbbc0350ce9ddd5518bd1bb95edef2d60e336ea589dcc7fe85be431227abdb5122cdcfdb215ef1ac4a7216d3f358e90786f86beed10ee665a75e87d6a7d896a67fa48d82a176397cea8f4f54c879389634a",
  "dc3": "58e1832cf6f1554abbb17e52329c62350a2f3f43a1537805f200fca391c7fa28466e26b8c10593c63346b30f02d818c2525ce73d64e200c166791f5b229f38bf10f99950fa5834322e0c4fe854fb8428b11c06348e7def187030b8b8c54109e3e8a713b8e93f5952099f4a07d043640fbde1a02af8fa540a2eb410c9888786b663633ed7d22dc88221fa4acc367c19e7c1627dd2eb6042ef0c0335cf18fbc4ce013be6580363b1af88bf250361c60366ae5aed676cd5c1269c42d9108977eb3bf8393b63d280b68061dabbf0df7d47a26fb6e2e2d75632efb3fb38b95ae8b70c2b378e4a969a32859da7a760533d0689e24bf0c01d15a37662f87d6e0dc393fe",
  "dc4": "c0bf8c41adeaf5e1332d8516131ef904916bfb25d4bc94e90150e69e4d6b454e5e23f77743ff58a6e255f5a59b41bbfbb0d51ed0a3d3624a20418c592adbbe0e2460e3f126e9571d93664841434714f112665e58df2ea9800c8dd24315791eafea4d9242ace14a5438a828b54caf17ce7309e9a63ce45433df6c7fa9ceefcd26d76e5bbea35588f30644d20bae29512662a8ee9e12734ee3d462907ef8f99e3d8476ad696d3242e6601971b74d668fa25a547adefa6689dbdeb9e03a0c82bdcb9de2751298c9dfec6c1b2937f5f534f1dae7df7cf3c117a1efa51e0fb056b1aca9ab1ee98fc92cc6ca6ba536f9b45a2e3c4838f4fee91441c5e576420b276656",
  "dc5": "29ad7d35f8d716bbb9aeced85f83e461e7af12670decbe25ce15e7e34a1cc08efb2d294dcd395b8f7b979e2b38cb3548897b8a03f964efa38990dae7471c1097b20678532aad1f3c3b5e07f509ff5b414cc43f4daf977d5f95dd64fd149272d79949932d7b700829d982af90aa4efefd44991af01e4e60c4c8f52494fce9510cd881080a51749fb0a962cf8f9f80c0560c913de4906793b9e020cb803b86ca803bc36ac15c580219f2d696390ab49f4d88702c9e4bcb8f544dcd99386e1531b25d781f9e33d138c450884f1eba599628d77594662238e3e7a5095e5003d1e2940fcb56926e73eb3f929c740cb8373a6eb3fed9ee2a20d413d7975f3bea7ff1c2",
  "dcId": 2,
  "banned": false,
  "dateUpdated": {
    "$date": "2025-04-12T13:07:07.067Z"
  },
  "firstName": "Dmitry",
  "lastName": "Shishkin",
  "messageCount": 443,
  "username": "shishkin_vulnerable",
  "id": "7175038281",
  "remainingTime": {
    "$date": "2025-04-09T11:53:08.978Z"
  },
  "spamInitDate": null,
  "historySpamBlocks": [
    {
      "spamBlockDate": {
        "$date": "2024-12-11T14:38:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-09T13:37:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-06T10:15:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-13T14:22:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-24T12:06:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-04-12T10:01:00.000Z"
      },
      "spamBlockDays": 3
    }
  ],
  "nextApiId": 2496,
  "twoFa": false,
  "twoFaDate": {
    "$date": "2025-04-10T12:58:31.740Z"
  },
  "automaticCheckDate": {
    "$date": "2025-04-12T13:07:07.067Z"
  },
  "lazyCheckDate": {
    "$date": "2025-04-12T09:27:47.657Z"
  }
},
{
  "_id": {
    "$oid": "66dee26cf856541e1b71cf36"
  },
  "accountId": "+79526733672-support-4988-9-sep",
  "dc1": "2f3ba57c008a1314f84987dee93f875100c4ad04ab1d4be605c31b59d6f411a79b1cc1b34a217c62704654fa25a67539a2287f1f19631cbba599ed2d3a79caf081b7d483afb6ed64906edaa2dd7ba1569617190cb4de31df448294c917ee5402aa35cffdd4aed978bfa62dbc88d62cfa8f3e2199394bf7d54092aaebad00dfb8c6179d0b95dca4e11f9caabd1143a83dc7344af9c58f068e6266a31d67bea05b1cc5cd5ebe3039c914a79b6ffa600b3f3696ec9d171d043014f6b81d2af16726060ff1562fb71c2064b452c405463718d06e7e35a76f3e471bd13eb59b52b2c33e7800d6bd58e83570af231e3cbd82ae3b7ee4089750c8f78b09732127261af6",
  "dc2": "6ee093bf045cbcc854f62669db1c02b0f1df1002966dbe868026b195f718f3073b8dae6c06dc369393004189f9957dd7185211cfa5dc5426f12df86aec449a729027cb68b5c05ceabcfd0780ab807b25f6ebac1d392a3dc553711e0779538c301963d7630039e67e680e55c4d25b507e3629b79083f0b8be9533c7e74fd8c102e9cf04df9267ba50a65009d9496e892a1a7e2bc1692e89bf4787fda9dd9dea14b7592f8d0f6336a747452d4a0d2a5d3d5969677fcdaa0bb11c43a96b7b4b6dbf9333fdbb803d50c849914dd684475d383ddb867e08aa310d377114911e91094599b8c3254c031d548eb3da847ebf7affaddee88673c16b2ae7121de5487c9939",
  "dc3": "6fd414d9c3e916b4b77d3647c35d5db257172b411fc981df3c058a982d2fd436747c242a84c5d1c24902a366b515801958e370ae284def66e192914dcf9a0440cd5f24ba6d8f9595d2238080a763234c264026746535c736f7ee28810449f94a995e0c02711ef4ac04f552250e400d30945e9454176252e0f4c04be67bcfe87832de5da2effcc50cbc393c91caa2795f2e127d6e8cf3064c66b8d4b9348ddeb5d56dcbfa17c1aa353f467db3a18da5ad945121e93d4814f8d6f51da0f603ad9d19a47d9563f0d1e72324b7f858558dcbbad4b903ffb917bcc5816b108c66e5fac25d542c917c31e13744181a902f1c06360497aff27e66279b51f5565efd2534",
  "dc4": "994d5dd96737cf3963b469bc6c68c107ec63da3b0e2ecf6d71fe4180b1eee16fa82befe002baa3fd3121379004168d17f5b53422a4cc1f32b5140ac9763b0bbddb8c1e79e6908de175f99d4d49cd0a2dcdfa3b92de199876ba431cde3eecf46a38db9396579e88d6617fc697537cd60a006fd37461cc75132b6f70d53fce35b1ca3901f2e267a94efd5610b27c55e4e9167a37cd9284128d8ce1d2f87bd63effbf4af6c2138ece40e42bcdfb3d2742bf4b5fd5fd9e4a5ca33d67dfc08f3392031b7ae3733a36a37d5be86450e6d8c09a56363f8c20ee7dc5b516666c99ec3021dbf9a236910c2120bb8d263527674125db77f84302bb81c25edd63d8f0de680a",
  "dcId": 2,
  "banned": false,
  "dateUpdated": {
    "$date": "2025-04-12T12:59:57.771Z"
  },
  "firstName": "Artur",
  "lastName": "Nikolaev",
  "messageCount": 397,
  "username": "nikolaev_constant",
  "id": "7263870021",
  "remainingTime": {
    "$date": "2025-04-12T07:03:56.863Z"
  },
  "spamInitDate": null,
  "historySpamBlocks": [
    {
      "spamBlockDate": {
        "$date": "2024-12-01T11:54:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2024-12-07T16:05:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2024-12-13T10:33:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2024-12-25T09:55:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2024-12-30T12:00:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-01-15T10:26:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-01-24T10:58:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-01-31T12:03:00.000Z"
      },
      "spamBlockDays": 7
    },
    {
      "spamBlockDate": {
        "$date": "2025-01-27T11:36:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-01-30T18:19:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-08T05:54:00.000Z"
      },
      "spamBlockDays": 7
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-21T12:04:00.000Z"
      },
      "spamBlockDays": 30
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-22T17:55:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-04T05:23:00.000Z"
      },
      "spamBlockDays": 7
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-27T08:41:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-02T17:30:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-10T10:27:00.000Z"
      },
      "spamBlockDays": 7
    },
    {
      "spamBlockDate": {
        "$date": "2025-04-10T11:30:00.000Z"
      },
      "spamBlockDays": 30
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-27T13:54:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-29T06:48:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-04-02T13:23:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-04-13T10:07:00.000Z"
      },
      "spamBlockDays": 3
    }
  ],
  "nextApiId": 2496,
  "twoFa": false,
  "twoFaDate": {
    "$date": "2025-04-10T10:02:26.821Z"
  },
  "automaticCheckDate": {
    "$date": "2025-04-12T12:59:57.771Z"
  },
  "lazyCheckDate": {
    "$date": "2025-04-12T12:27:49.902Z"
  }
},
{
  "_id": {
    "$oid": "66dee26df856541e1b71cf57"
  },
  "accountId": "+79923044808-support-4988-9-sep",
  "dc1": "380a76e2ee5c0738405643f4229e4e92d75809099a945d387d811b813d164ce4d1b34aa4ffbf9b615f726d96cdc9a5bace7dc769354cfbdd19a894a7581247b49cc5c8fa2cb4fa7165b242bb18b7ef9950f4ac61ac3b3a5a06be83b2b8c1c3f01de1ead7d88c92e48d06ff0fcd2768c7d093e0ba645795a280997dd349519fefdc8d4d3de3dda44d2dfe24fa1e59609dfd54bff257c2f0610b7bbacaa2eeada67a5358a6c0dbf12767e74e3220fda2f53313701e84c62f7c293cf4b11890fac8d2be11a8f2df50f9405ba370b0a4f481f805f77e8dd87e9eb94e85a272dc7930016e223b890b6d5997c8ef31c4b3dca084b676f0c45a2d199eab4a450072e546",
  "dc2": "9cb82ee1802ca17371958a3d745e5e0bd822916b29aec29db65cd13ade3b2ef076a6f880f5bdbbcde2d59d5693370ee5d32397fd3d84d1f59fffaf48e8b7d61d7433b0302973969b3892ace66721d88a05c5728d1521e87bf709c5358661b88e9f4eb230871f1d9daa462b5e35b4b7be7f85a1c552694b127e185936b75b351b8fbc847e3df66eab274a64a745dd20736abfe0651c090472a7666c775f81889a1513942dc9c75081a856aaaa915755d0eec24770cbdb3f301dada580e31d3bce7e31383324f34ad47d1ee79c69d87040936887107605ba805f870e60b503d064c75703e7c9d9943969d69ca195e4c0042240d4f2909fda02b901f97bd90d9375",
  "dc3": "bb6bbd798ed11cf5b5e212508ebc995d873e4777b65871e3877584dd0a29fed4dd2c2c7d934cd080b03d6cbad49264c53aed7a6623ef7302af9a755938d37d06a2a5d5a81be44dd43ad2addb1ec14d570733df0e6a1c924a9847bc47f360f35a1c92854e8fac0488e0c7a28ec946963d113ded70a68910136ae0d3560ed25a6f0aa418d1c22098a0a91bc6ff92ee87752a784122b8a5055900feef25853f56a78e89efe63e41a6a975a05f0232c173ba96dc38e793a3d850498d1bfd93b2745229158ec8aad3d9afacbdde2b5379fbe1a02afeeb50c081815f048fdd8a8fa97c369e545b212d1c820f27ab981747f2a17c26c252834244adb90cec173bf44f02",
  "dc4": "bd5c887910aa4fd7a49873664de31b1dce6010942c12c4f6ca29149385514a7af575e7f1f150a4d956b60a24fe601ed370268105e37721917cc15309f444c246e4020d64ddffc19de941916954ec18b7033baf08392d3ca565cfe1a4bf7b476fb8fe1d38f951aab584380b5e687243c402e1c7ebd5737c0c68920e77d18c5ac51d6f4d48e815431eb686dd6a1af0cbe6933e813b087a6384e1205cd6ab699e170e054f5b7dea9116b8d7f4ea8f15743a9eefafcc35a344a48b3325067fe27ca25062eb12e7afbbb83a78453363fad1351b57731856951fed6f0a312e56bc63b835fe13221ca0ae73d1c2d5365e62cebb918fd5b3059efd80558ffef2d3969f17",
  "dcId": 2,
  "banned": false,
  "dateUpdated": {
    "$date": "2025-04-12T12:36:44.077Z"
  },
  "firstName": "Stepan",
  "lastName": "Zubkov",
  "messageCount": 365,
  "username": "zubkov_miserable",
  "id": "7257483104",
  "remainingTime": {
    "$date": "2025-04-11T16:48:41.590Z"
  },
  "spamInitDate": null,
  "historySpamBlocks": [
    {
      "spamBlockDate": {
        "$date": "2024-12-01T10:20:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2024-12-14T15:28:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2024-12-24T07:52:00.000Z"
      },
      "spamBlockDays": 7
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-15T14:22:00.000Z"
      },
      "spamBlockDays": 30
    },
    {
      "spamBlockDate": {
        "$date": "2025-01-21T21:11:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-01-24T10:21:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-01-28T10:04:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-04T15:06:00.000Z"
      },
      "spamBlockDays": 7
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-09T15:20:00.000Z"
      },
      "spamBlockDays": 30
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-13T06:37:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-15T10:28:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-25T05:54:00.000Z"
      },
      "spamBlockDays": 7
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-20T05:55:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-27T13:54:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-02T15:25:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-10T07:41:00.000Z"
      },
      "spamBlockDays": 7
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-05T10:42:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-09T05:04:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-17T15:28:00.000Z"
      },
      "spamBlockDays": 7
    },
    {
      "spamBlockDate": {
        "$date": "2025-04-18T08:54:00.000Z"
      },
      "spamBlockDays": 30
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-27T23:22:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-04-01T09:33:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-04-02T12:51:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-04-10T15:19:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-04-18T16:56:00.000Z"
      },
      "spamBlockDays": 7
    }
  ],
  "nextApiId": 2496,
  "twoFa": false,
  "twoFaDate": {
    "$date": "2025-04-10T12:58:34.121Z"
  },
  "automaticCheckDate": {
    "$date": "2025-04-12T12:36:44.077Z"
  },
  "lazyCheckDate": {
    "$date": "2025-04-12T10:58:50.250Z"
  }
},
{
  "_id": {
    "$oid": "66dee26df856541e1b71cf59"
  },
  "accountId": "+79923052683-support-4988-9-sep",
  "dc1": "a8da341a81ac4878c25334e545b102c5d8f178e8bc463df65782a4191fd1e445f0e64c6a0c6864b0f47d9f0a58246ffe0b0162ab3edaa7fd574fd6dae5789986ecfed26995574a0f446f8e85b418ed8210bf37724ec012c2847dde1e496e8a354dee897bc3ee858ba92ceed8a105be0f7b3ecc2eae195707040c632ee888c8adf6ffc9f03d2230db2eaa98dead6b0f24a28c8792affe6b2c017bbac5a7535eb5a8222b4eecb97cfc33c224d7222f47e0ece400f358c9f9e43c4a2da9214786c6000f92eb77a4fc887bd09f7d0d5a9b873cc88a3b6d51eaf4f7349184d1f4444c57ff0b137c7a100fe9da83649ae91fd2bf709dbc5ed3a0de05de778d12b3b47b",
  "dc2": "acb40206be4f4fa410b98b1c0d56d4486184e1126cc91081220ef2e0810fa2922d67f1c633180526e643d3abc49430b097019be22bd01fd425aa7e3a243028807321fa8c8d85912a2f93a559d2119f34bec2e17efba879f413a3e792bd8ac6f78b199ff4eaba3aa86f27741b3195af78948e181384b523b1a9f101f4c89e387a9cbd6cbd116a8fe8e76836db0ad7b1e4a01d2d2e41ef5fc627cdf69251fb9a52d2f8be99d1f4378a67f735a4c7ef6f7ea03fab11736a0ec1a0a7a4df27defd36e4c26250eb6c6f5814fa0052c6bc8ab889e8c46fe8b914a2fbdbbfc8ead8842213983072dea45fbc81edda2c2507afbd1385fcbd910a39604ee799548b1ed4a0",
  "dc3": "29d9d79147d1e491cad2c644463ebc958ceb9a917446c905dbebbeb7b3e36b96a09dc88a055c98a6c89f8137a14a164bd6bcdc7f48913572a589af1b0324f3357a42dc2353a0e17714146f9d4d11408b03a62972db28e2075a11d60b0d4b29830936840e7afa6f965bd3934d6956425748c1e86d0412a79155e8f437a9a4332e7492c15d687bbf15473c621bfd5531d5a959b9927c3148d5be66677082c0b7466f440e424c76bfaac462de9cb2d9147233420a7f7e7d34a531831c55a66d1dcf0b84297c7157f3870184d44a213ace580bad0dd0c50eb7e11fa54e5fadbd6f6702edb4dd214902290333d1ae068902659d7f4b49859fdfe9af3a14f854d01976",
  "dc4": "3f5db669594f8256212941aa796131703a230f01ae36a25d71077ff5caa2a3a471cc828f8bc68e18213d5369429cfb3d7fe6db1b8e913c54266af0d4800b758de5651f28f7331cb3681658cdc5dc205e058d9f2a7ba989a64bd6da67a691a1d607d4b1140ef7e6e92b798d7e199c3bfb4a4bea9fd14fea59cffed27a336eb47619f542e571d210ddfd28f7d67d5145dc1ed6211ea38325949bd68adb715861c373fdd03dcad430630515a6605dce28aab6cd7a2965a24ab488294b45c3d012ebce4acab8c7bb2f465eda81cacc272d7e7d0c003a036c91b0ca5e9c89ccbc66b885796e8b7f445844a34ce495671e87150a2340f36e114252e0ccf60db91ab4a5",
  "dcId": 2,
  "banned": false,
  "dateUpdated": {
    "$date": "2025-04-12T13:05:01.887Z"
  },
  "firstName": "Vitaliy",
  "lastName": "Belov",
  "messageCount": 285,
  "username": "belov_straight",
  "id": "7412297387",
  "remainingTime": {
    "$date": "2025-03-27T13:40:46.352Z"
  },
  "spamInitDate": null,
  "historySpamBlocks": [
    {
      "spamBlockDate": {
        "$date": "2024-12-26T14:59:00.000Z"
      },
      "spamBlockDays": 26
    },
    {
      "spamBlockDate": {
        "$date": "2024-12-29T00:16:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-01-12T08:33:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-01-26T15:21:00.000Z"
      },
      "spamBlockDays": 7
    },
    {
      "spamBlockDate": {
        "$date": "2025-01-21T12:18:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-01-25T14:55:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-01-25T06:37:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-01-31T14:39:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-01-31T06:23:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-04T05:57:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-08T12:01:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-10T13:05:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-15T10:02:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-26T16:32:00.000Z"
      },
      "spamBlockDays": 7
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-21T12:41:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-27T08:55:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-07T09:02:00.000Z"
      },
      "spamBlockDays": 7
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-04T12:47:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-05T21:16:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-09T12:56:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-18T00:38:00.000Z"
      },
      "spamBlockDays": 7
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-14T07:37:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-26T14:00:00.000Z"
      },
      "spamBlockDays": 7
    },
    {
      "spamBlockDate": {
        "$date": "2025-04-26T11:58:00.000Z"
      },
      "spamBlockDays": 30
    }
  ],
  "nextApiId": 2496,
  "twoFa": false,
  "twoFaDate": {
    "$date": "2025-04-10T12:58:38.193Z"
  },
  "automaticCheckDate": {
    "$date": "2025-04-12T13:05:01.887Z"
  },
  "lazyCheckDate": {
    "$date": "2025-04-12T09:22:54.224Z"
  }
},
{
  "_id": {
    "$oid": "66dee272f856541e1b71cfd9"
  },
  "accountId": "156-7-september-9-sep",
  "dc1": "aba4f721892218f6125153cc72e406f3b4aa770c1c8fd0d812a23d902e94b8ce98f462acee60211f45568de5a1c332adc0c8efc888bb6027d1a6a51bb0f39b54b12e18cf08fbae703624b68ab8780486a483bb4577cf4744e3e3c57fe2f2535b1a0df1935451bbdf0a6b7f44a7eb0f38a502b2c0f85f0def058b5761ec6baba07bf715a177d7f79fe46017b387a1bc91d281b6d18942945866c8151cfb00b937236e0a60110a7cfad4ef45e698407e663b489f7db87ed9b349ec2a5977628ffd96e4477a78c42b63c922a2d2bcfdd54dedd15b0719555b6610a1402e6cbc77d2cad131ec4819a70ec74838d43a9830f212b8d906cf1c925fe7a8a58926c78c17",
  "dc2": "7d5ed4c46db35e757d19d31cc2b3d13de4c12fa5a91788ab5fad6daf7fe2b603d272618e80ffb3e227b48f4ecf1799b893422770f861dd6a762df2c632622ac3e91c218ae82544de07d4116b00b31c1445be1bda927bd0bdc909ef6d3018bb740c62d0651b2cd653b5250796d526d341a288dc4ef9126b5d6036137e125751d2be3f455e0065b06ab198e457c65a784d6d2c854939611d903d7985a3a79f491d74c3c58ecf223d6cb7e9a9490f204f2f0a849bfef5e79cdeaa05f0dddfc146390ad0069686ad2ab5e16493154276ca7821b3aea77b62467704521ecc7678ba3eac8661a2bd54de2b2387d210d852cc4441db7259afefae7102d7d818736b5136",
  "dc3": "95c16da57085661d4a88dd32449a9180b2520a9cd5bea3a8709a7f0cea79759dd8db2bffdb43db1e09965c3eea08f1c1deeab5bafa726f21f81ebd6bbefe8b4f04df9c2c08ecf2fb849d8f98b829ed77a2db7baa632e2904ed7290676d679003355d30d232df4772795561dc03d5878d74cc0bdd1679e962e7c2d26f7774fbe91ad20c7657e7fb9366d61750055ddf1355e6e84b922bda36691e7b94e5a97cbb5944d33ae7ac95fbccce46032a2956e85c606d5db0d289ab7db31a43f3f697601e1bf6274d77b3c41eb89bf07cc9b6efe2220b4df56872ada7fa5159d29332cc52322fbdd23b6a846fd687d1aad18a0ccc76eb53cbd429416f6581d3566eb591",
  "dc4": "b3efb31f0a75d292985da162c80fcd6641f23f2d0cebe6ef29b177cce39d46a92bc77438735d6d457548efcb62538f2d0613e6bd9753dda028a91efddc73fd690b05691fe4e6edc4aac1e3e73a071e6150bea3078083f0ac6132908ca76edd809a8b87d65add2d518712c0ea463628967207a7dfedf25b47caf5d5ddf878a7691d875f9b9ae673386a5cc1711c55bbd62326de4e9e34e80d0c25edc5782a1a1eab6f715d284c8656fcbe0770c0f5c763202a364410e4700d2c7b87aa2073fb98d8c402ed283dc824c4b69452884791d5552ba363d2f2dd5c50bba42ab7297b5d7f2839359bfb512ba9f26484841b1866f76ce06170ab4fe93f9c70bfa8a09f2e",
  "dcId": 2,
  "banned": false,
  "dateUpdated": {
    "$date": "2025-04-12T13:04:06.913Z"
  },
  "firstName": "Mikhail",
  "lastName": "Gorshkov",
  "messageCount": 491,
  "username": "gorshkov_rapid",
  "id": "7475926014",
  "remainingTime": {
    "$date": "2025-04-11T15:33:52.873Z"
  },
  "spamInitDate": null,
  "historySpamBlocks": [
    {
      "spamBlockDate": {
        "$date": "2024-12-07T06:25:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2024-12-12T10:36:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2024-12-26T08:00:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-01-15T08:23:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-01-25T06:04:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-01-29T11:42:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-08T04:41:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-13T07:23:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-24T14:33:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-04-11T08:32:00.000Z"
      },
      "spamBlockDays": 1
    }
  ],
  "nextApiId": 2496,
  "twoFa": false,
  "twoFaDate": {
    "$date": "2025-04-10T12:58:06.245Z"
  },
  "automaticCheckDate": {
    "$date": "2025-04-12T13:04:06.912Z"
  },
  "lazyCheckDate": {
    "$date": "2025-04-12T10:04:10.651Z"
  }
},
{
  "_id": {
    "$oid": "66dee273f856541e1b71cff1"
  },
  "accountId": "168-7-september-9-sep",
  "dc1": "417ac5f6997d4b6b719a7e5352b464d2b5a3be4d40ed10f49482639229a4638b2481feec431735b030bd82b3a00377bebec95945afb0b796c6c26477aafaf13acb522267a1370034a45fb945dcc983050ed54b73875b5975690428b7e0381e24e4776c1cfeeb24a0c57887261ec7acbebc193ea205d4a136fbe6ab7feb6757d11f6466202e8a03bba13bc22a6b27b348f9071948365b8c313d71c1295721e9ffb60eb635a71b4aaa73a6c7e27543f8076452102544d507bf1e4fb84353f2de616377d5b069dc9419ed9e251cacdc102887e5e6297e816beee3e5fabdec549ff8a8b2e49b8f08d01e1527fa33fe6a0e46df3091af4fd0d3f328e05b5e90b408ed",
  "dc2": "1e89126f4f82a8abdc9fc0bebee01ab870273ea58f8ed291a676c72e67bc4210043e48b7ea0b22c79402d94ab3339b416a72c7287b91d97919b8a46bc61b5584551fb95dad77ce03afabad5c54c07b024ba4178178f60650e7c393b71af8c6dd0639ccf00988191ddffc2d5ddb3d6210167f74a30d793e9223c100af1205bb7170c5e153e6ef834781911c94d971773312511d055d969ead792fe6c51524ac08b7799c563df8a86f43d22eb16536304cfe91c720a3904ca77a9609d7dd721fd6f19e33b8c4ba9683e44fd9f4c47e25eb22270c83234420785fe6eed043df10b11dd9a073bc0059735fe5524655ed644ab5849828a627fd3f98ce869987dd594b",
  "dc3": "48ba236df91e3ab9a923d65fe099c932612f76d91785c6f05537f7c1ebf80a8eb76dfaacbb96faba70b2f2ba8ff2bb46291ad7bea1d23fe04c3adc311d371de54c66198e8b578cc9b9f9fba2387dcd256e454ad63e730810cc3f8955d45eaa2c36bdf01fc134bfc0d7ba0fdd1165e2f0d0b20a308c5b48c3fb784e124bd8ce943f6ef72c4d7c9ad568579465f4fb83f8fd417f10f38380a7b73a11e5323e3d11fccf6ee5aacaacada20237cb6c476ef7588d40aaf3f3d0a61f4186850d271d0dc64cfcbcc132c3196da1bf3146678e94a3bd671cdce7a90c4883857667de07d41170c58fc46e18f8a95ac549fa5205c7961d0b26230ca051d7705ded88dac5ab",
  "dc4": "96f7b775460aa37d24f355af0600aa1320d6c97d147758324cf231061cffc1be1d007eb27df0559d416beeb8a74e0d1c312b2f21a7cef0db4aa6c1b94d96105612b3b297d30f83d77ef129acf91897715e65767ab0249d6789fa5944b34f72f7af4ea32c52fe39f97c357a99b69c3767ab2e16052c2b5cd0f3b9d209b4f61d883b76ab44b44ee08d00f73784f1e3dfc26a55aaaa24115dacbd07d69f66dfe031555bea9ae096984724630028ae9a05c269864ba9fe707c90a9f1f5e15418e123c780c376cee8eec8a092575254c02cf6e7621ec75ac655c2b103542a497d95b57cf2c56ea03e8de414dab616289019192dc1cb7b126809826c0f6a9704f95173",
  "dc5": "03f724bf0ec038e8487c6fa694bc047862d0303bdc39cbc6f3e2ed6a7741d79e257d2ca0239b8d7c68ba8aa89eb36c06ecf007da0cd6109cee66640b602673e6ce1b622a3550e9ee178abe789678d8c62a75b4e991fba9e71be3e7200ff8b2abd7f4cd53e793c81c7c7e42f083bceefa55364a8dcb1d6eca57795bdfbdad597a76b47d5e03ff40930564061ec3bb95a23ea77db6e4a896321228ef54caaf3569a2e8118131787e35762a39b2462a3cb3e88aefd1cf98291cbf3db5c5bdf212f4d59757a6b6a3cfdff46782c28b0731f9751cceb0936233db236cdb6d4a1bbe001dcbbd0f72d5d13b551f0301d7feafbb5f9335ffb1eb61f039cb21bea8f37a1e",
  "dcId": 2,
  "banned": false,
  "dateUpdated": {
    "$date": "2025-04-12T12:58:06.802Z"
  },
  "firstName": "Vladimir",
  "lastName": "Dubrovin",
  "messageCount": 244,
  "username": "dubrovin_prominent",
  "id": "7189454119",
  "remainingTime": {
    "$date": "2025-04-11T16:56:38.527Z"
  },
  "spamInitDate": null,
  "historySpamBlocks": [
    {
      "spamBlockDate": {
        "$date": "2024-12-27T16:50:00.000Z"
      },
      "spamBlockDays": 27
    },
    {
      "spamBlockDate": {
        "$date": "2025-01-13T08:16:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-01-23T12:08:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-01-23T14:31:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-01-31T10:05:00.000Z"
      },
      "spamBlockDays": 7
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-01T08:41:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-05T11:33:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-17T16:33:00.000Z"
      },
      "spamBlockDays": 7
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-18T10:49:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-19T11:17:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-20T09:45:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-23T12:34:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-26T05:58:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-01T16:14:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-10T14:43:00.000Z"
      },
      "spamBlockDays": 7
    },
    {
      "spamBlockDate": {
        "$date": "2025-04-09T20:28:00.000Z"
      },
      "spamBlockDays": 30
    },
    {
      "spamBlockDate": {
        "$date": "2025-04-11T11:54:00.000Z"
      },
      "spamBlockDays": 1
    }
  ],
  "nextApiId": 2496,
  "twoFa": false,
  "twoFaDate": {
    "$date": "2025-04-10T12:17:48.323Z"
  },
  "automaticCheckDate": {
    "$date": "2025-04-12T12:58:06.802Z"
  },
  "lazyCheckDate": {
    "$date": "2025-04-12T11:47:36.679Z"
  }
},
{
  "_id": {
    "$oid": "66dee275f856541e1b71d028"
  },
  "accountId": "1723853125-7-september-9-sep",
  "dc1": "30c372cc2480515301bf56ceedeed345733a49086f2ebcf2a4c4b5bd291ccdce645b540c8866111227748d6801cb5b9f965ccdf42ad839818a1da9c0d67817362e097842cf1ed77bfc5962dd64742258a3a9cb98a81dd2da6f0d1664444beb91a6ae122bd5d1bc24b0dd4d5d715664ca5fed346569de9e35f75c5a53ba2c6c569447649171b449b08f8e9b2c7520b368d632af3f91f2a1be5cbfbd6b51ca408a0bb59699514836e9aec28e70b808980e5e7a8b918322fb4de571c344bfc8b84e876fc9fda730f02608fe4ac0c3573b36ad096d6608c43acb1c405fccc8858dd9e9f6f7e2d7fe189ad8706e4bc41667a2ae2df23b60281bcf418007b87c36adc3",
  "dc2": "886f9f7e67c6405c4f843011a889cdb9897ec19a1582555a376ff3be3de5bbfc26647e535375012f5bc792181e794f48afa391c7191d5a5b026752c38ab1338edb6562f853496d19ba528497599cbe869559c04d8b46519f813a8f851d0545fb754ed955b295a91b67c5deb667269c908584768fd43eb8f8b6defdec35a62ccf24dca759601a5238f259d9cae30124e130fca8a21faaba53371a5abf799948ccced9142d2c26bebddc543a30d9fe76929a2947e12b1865569ff5d9b35101d78cb26c04445c5f74dc7156e5e5e434ea1259d8631fce5fb8130cd16a85f8ee3b5f2130172819c5c84aabd7511d74d540f266cbdc4672479f28b69329d81aa85acd",
  "dc3": "5a5f67afdc2e1f02897e2c02734abc2c41e807ef7680aba9b0e28873ec0a70d565acddf74b2ac357fd350ffcbcc17f4b02af95679133df05aa314b008abbc3c1e1a66eaf55428c8998ba85cfbfa01dc75b4ce90047043c63ad9713f4a282860bad0b8a4d33cf50bb1d9f3661f92f8f3bbf762ac4c8ad1b8b1bf2556e7e91b77ff2f6815350e7d4dfdcf719704ee5d72e1d4567cd2ffc1dc1207b357420ead6ba7ecc7a722892715556297fb543aadb3c4b4d1595abebb4c6718f161cba2f834456363b69876c711eb61e369e1ac3271feb9034e6bbfdf32d059eaf8520a7b4ca111b4ba93524368d906346ccbb70ef5879caf41637d861f1e1743d97bdd61661",
  "dc4": "8ad913a7f063a5e0e809ae21c925864b373334aeeaa9a4eeedcb64eed14147008c8ca950f2a1d1898071c9879541e2cabf71d273ee8118290b619ea3ce8e4a5556aa53c7e247e9ba4052ad524070bddd53063b5b3b7aa681a69f3e6c3df19afcf10cd0c8f5aaf89042999833e597916c6ba6854a2650f5872ef05ec672074f5b7f7fa56ea52a3df219b7777555988626fda59a5661e85c636429e2cdacfa24eecb2cfcb97883bdb532028b39ee38dc95812f471cf4416676b1352b69031601bdfc1d11030255b20d347a3777a14523cb5eff6123910fc90e9fa44391881af04ee845c82b67211300da47947ba01da3547d42427489ba724f94681764e8d6870d",
  "dcId": 2,
  "banned": false,
  "dateUpdated": {
    "$date": "2025-04-12T12:30:44.409Z"
  },
  "firstName": "Artem",
  "lastName": "Ermakov",
  "messageCount": 389,
  "username": "ermakov_noisy",
  "id": "7215558459",
  "remainingTime": {
    "$date": "2025-04-07T11:41:04.493Z"
  },
  "spamInitDate": null,
  "historySpamBlocks": [
    {
      "spamBlockDate": {
        "$date": "2024-12-08T08:57:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2024-12-12T15:15:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2024-12-29T06:55:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-01-24T13:03:00.000Z"
      },
      "spamBlockDays": 7
    },
    {
      "spamBlockDate": {
        "$date": "2025-01-20T13:20:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-01-24T11:56:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-01-25T09:24:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-01-29T08:40:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-01-31T06:34:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-03T07:40:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-10T08:45:00.000Z"
      },
      "spamBlockDays": 7
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-14T17:46:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-24T11:10:00.000Z"
      },
      "spamBlockDays": 7
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-19T11:14:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-21T05:56:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-21T10:15:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-24T12:49:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-26T12:14:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-02T09:26:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-10T09:44:00.000Z"
      },
      "spamBlockDays": 7
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-08T09:53:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-13T12:58:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-21T07:53:00.000Z"
      },
      "spamBlockDays": 7
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-22T14:07:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-28T05:21:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-04-04T09:33:00.000Z"
      },
      "spamBlockDays": 7
    },
    {
      "spamBlockDate": {
        "$date": "2025-05-07T09:41:00.000Z"
      },
      "spamBlockDays": 30
    }
  ],
  "nextApiId": 2496,
  "twoFa": false,
  "twoFaDate": {
    "$date": "2025-04-10T12:18:00.130Z"
  },
  "automaticCheckDate": {
    "$date": "2025-04-12T12:30:44.409Z"
  },
  "lazyCheckDate": {
    "$date": "2025-04-12T10:16:08.416Z"
  }
},
{
  "_id": {
    "$oid": "66dee27af856541e1b71d0a6"
  },
  "accountId": "1723900875-7-september-9-sep",
  "dc1": "709962d3baf46c5df40481a86e0e576edbfa676c40da8c79a43fb69201a8b51902e54643ca10dadf6041d9949efba54022afaa6ae2a605217f6c570b4eaafe3d88f1b55f37d518abeeea6f0370a6914a011cc39ec97baf52546931192463ba05c5ab273b75a0e44b4b33fdad78a3cd99aa629cb1ce66b215b823e267fad1294e08fdfb7276d5363a11af7269e219d3d89faadbf7b0efd4620756f10e1d64b63a09bfeebaba3a1c6bc89007777f65af290319cc747c989470982520a2e44fb878316ec218139f3781aaa3354c698687b95e7b05d418ba47ecf51db7873b9dfbb5dfe6c78fa977e254d569e660362fd4351a9ccb26e71dba4013164fa6ed1647fd",
  "dc2": "22824ea4040c1905d751f57f68cbac07288b3625d15e6b6dfc5994f2ebf3ac16a94b11d49752ed9e541dcae9e511e7147671a8eb06cd816df44fc67efb83b3f67ee5c2a875e720c23a3a39a4d6f6580d4c4623ca0bf7567aa52c3f88e8551add7c7ce3ca8ee07d46ad81a13cfbaa087df91b6413727581635a486b6e7ed842fd08ede55fa7aa340e40a3d86c82ef3578d071b3d92c966c8aa9bbaec05bfa79a700dc4a60299cdfb6b89065327b0f7f76d702b93ef70a5e67dd837ec1f2d416934b320f88158233038148729d7b9dec65d228f94986e7d2d07a0fbb6c534a54c6b2f9acb7dc1cfc11da105faa6dd33fec424c95dfcc8867a81bb745226049d900",
  "dc3": "afc95f2f60d27ceb7e167d106e1e5eb1b49941d429d555d37ae80fb3c33f0933da750401772f1fc8c4c1a8ea0cea009ee6a8d31b3164e326107111442a9919fa1502cdc9fceeaacc7c0ebf2ee483bfc3fef6287d3a70e88571e9fdcf8078ea4c6615ba10dcd478dd45176c5189b93c2982618aaa2d00f01fe7e9de149b761104e064e42b169f4d2bef7bf2c16acfddbff6af104b045120af7a976c8a12380d90c38199bb3fe08065461184e9e39b70d99b6b041684666d12adc3e2db4e9c948abc2cf84a3231b975101b71e01fa4b1c10cdd0ef39810e70e3aa29cd127248dc2fed4dee24606155067a9e0220c8b6e895f4b8cf4608508c9437605b71c5a32a0",
  "dc4": "697156ed308d075ea64b49d2475354f20d776ae8332ca19ad0e09b306f72488f2cbfbcf44386938ee73ef56fe25d1fe1640b0a33c5a1d840b80289216f48cbdd7af52ae898191175467858a6aadd20f0c241922a189c18f81cb46f328a4742d4b6da981a974c29b838ab0c23d33c92acaf5f22950e6fe5e1af6d56e7122916bc3b32f7ebb50593d7ad3d5e99acbf5273c3c38cdcc5bf5c2b58c885f43d5b2950fe8e6935f57212262753bc6c795c33d2d981e82e108a6eb7531234f9144f6cb3f5416b802f89daf99a48d8de37979233bb8a621d00372c209de928d164786797aa10e7ceb80b6e11e6898d328ee1ae2e3b66b314503226891e00a8b4b5ac91d9",
  "dc5": "a4fafdd264efb331ecc7f32c73a9de8da0faa2773ad8e5657f3f48f6d3a8555d52f3440eda5c4ba60532e42130e7bd66111949d397bca7679f4acf2f847503f56c62995af77256d66fca99ef61f5c3855e4d5f16538453d418a6ddbe92331f3be53f065be1aac92a1546a35655c1afeb67387a489e118a8bea44c320a49fef965029a9a517a3b805aea32a051e519c8aa7b468d84022ea31362e80a96a6f7bfb31ebe81d7ed6587f21a7877263882a210b8a2c71c3212db64f8f4e146cb7c9f43a8b77be150c5411b907596d83225042cdde8f2ecb58dfc6d4c2138aa1900b75933bc9efc4a80106f517465abbf359afbcc0f12570219917a8b2d047679c093f",
  "dcId": 2,
  "banned": false,
  "dateUpdated": {
    "$date": "2025-04-12T12:28:38.476Z"
  },
  "firstName": "Viktor",
  "lastName": "Kozlov",
  "messageCount": 500,
  "username": "kozlov_fluffy",
  "id": "7461133632",
  "remainingTime": {
    "$date": "2025-04-11T15:34:23.423Z"
  },
  "spamInitDate": null,
  "historySpamBlocks": [
    {
      "spamBlockDate": {
        "$date": "2024-12-09T10:43:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2024-12-19T15:47:00.000Z"
      },
      "spamBlockDays": 7
    },
    {
      "spamBlockDate": {
        "$date": "2025-01-23T05:43:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-04T10:03:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-15T11:07:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-04-04T10:39:00.000Z"
      },
      "spamBlockDays": 7
    },
    {
      "spamBlockDate": {
        "$date": "2025-04-02T16:47:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-04-11T06:42:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-04-11T13:31:00.000Z"
      },
      "spamBlockDays": 1
    }
  ],
  "nextApiId": 2496,
  "twoFa": false,
  "twoFaDate": {
    "$date": "2025-04-10T12:58:12.186Z"
  },
  "automaticCheckDate": {
    "$date": "2025-04-12T12:28:38.476Z"
  },
  "lazyCheckDate": {
    "$date": "2025-04-12T10:16:29.331Z"
  }
},
{
  "_id": {
    "$oid": "66dee27ef856541e1b71d103"
  },
  "accountId": "1723991599-7-september-9-sep",
  "dc1": "98549a656709fec5bb2a47ce0e0f592ac8dc64749f6aaccd39f4834f104e73675142b180ce0a5ac326fd1c11db9a9f1fc064b0a38c775d67a5be53e004bae892ff4af5fbe7c6032814d768ada7d58f35a022b6afba4a29449895f040b0044f13c20f3d56b58c13e70d2b36aba8dc6b7245f501e7eb9b489b159c3f92b5168d73d6f4b291658e3064a76fefd3b05bce8710d69340f805b52f8d8430b326dd8309983459a3dffc9f42139f80360d41e3b3755f7ff686a382973987d5cdec5f922d3e20cb191da8060ab601e6a1d3320c094b2fdf9afece4b16be4bfccc9c5530354cfab43208a7dc0573303e46ad46e03e2fabc0d85376c21d940ef0486b56c381",
  "dc2": "2442f4df9dc3cf25649cd928bfc6eb48e3ca33c58c2102bafcd877ca5615338569d73f63fd0c9bc3ca84c49fb9794d57953092ed418c0724d1d298d67fe73b17c695e7e2ed358c510c889d6c3f6857e439ce2e783adf9b04b20f0d3766798b368321ecf150b846d4dab37698c5678dd39475361251610b065a014f6586a95996e1e33ab86515671af3c27b213e0a6226ce9a0b4ec058e27a76f52065ddaa8b4a171047c6c913e8eb6c6d5c1a053ab1354c72f3bfe567606b03008c59185d4a81d2f0e92f504b8351268c6c856f381b2d977c2f8cc8a8a7337bd843beaf2d3bb44105d0a3de6cdc031de51cf25977ff498555dcae22df143957bfe48b225b9045",
  "dc3": "a35e0746784d35bf1e55b65fdf0c18190cec4962c0187b35a117d7cf1aaaa65da380021af24e42d8ba152cd20ba3131fdc7ce3a7e666cb262fd20f95de1e3d12ad2a103fea4b0ca9014428d9102e5981a27d60b3dabbb746788a8378fd59d0227a09483c7431dc56eb47f5e0d82efe71c75e6282d6c22afd93e481287f9f1f21030dd0898e2fdccaa7a2124ce40b94a7ee4bae0f993431d758427388cd7deb5abfc446e92552659721669b9fce45cb8c8c4a2e5b265334f424b2f0b5176b9d1a24f4700ccb46ce2fdc8f506f906ef7ab83dbee227d48dd1dd65b5c83c116b0aa86d0be26beb99013ad3f709d4936d3ed1d26eba1f428d5897a5d3f774d6d90ff",
  "dc4": "a514bf107bf5982336f7c08426cf310a50831672d3fc68fd73b257c892efe3083f4281be52dc869c5789a992fec4ce68e7e61c378c9e04a5c1836e7acfa10f33a39b7fd54e137d7eac9b4dcac84d50db146e1f8ecebd97f54ebe207177635d7744995217ecbd1a2c8a0f3320e00a7470895bf1c5015a94ce88f247f38ba5e25c21455a7fd012791b26bf2ed603e8fbe50370d88c854cc023c7c86bdf5238f833485b15bd72fcfbf68e1b18adc351193c78d777325fa926738497e6a113127fd0831f7148254ab82fd73cec3e5ac06ee666664ffaf774f5b6c97594914a42f8f1fe2981ae8e48295f0649345e6f68a2e4d3ada97c8ff16e2753a7d4d844333bdf",
  "dc5": "220c91eb6788ab5cca7e46984387821baad46413bd7e47fe5883c3921670a7154d25646b06bd06881bd8f87a44f78aeef5bca279f91fe2c0e8e517502304f3e2fdbf34f5afb7d6d8e531d014b667debe04f9baade21f4dbf7e3125f68c20973bf54ad4bb7d6722a065551278c6a25fb96921e488e513fdf0704709e71dd6f201e40b74de544eed9dd9d5e6cd1117f3c385a13e8084cc0c6161ccfecaf241d35e891a58bb55e7eb67cad52c5014993e6a05a41d3d123c451c35c3d5583f47dd582fe9add9ac3fe915c5b56ba65dca01bd1e6bfde27703d671aa57601538c46ae0e822243a4164d755a8271d3cf1618e052eee4af2b0c0d6af7b4cff23a5e616b5",
  "dcId": 2,
  "banned": false,
  "dateUpdated": {
    "$date": "2025-04-12T12:29:45.948Z"
  },
  "firstName": "Artur",
  "lastName": "Nechayev",
  "messageCount": 273,
  "username": "nechayev_mobile",
  "id": "6826111405",
  "remainingTime": {
    "$date": "2025-04-11T16:03:12.029Z"
  },
  "spamInitDate": null,
  "historySpamBlocks": [
    {
      "spamBlockDate": {
        "$date": "2024-12-05T08:50:00.000Z"
      },
      "spamBlockDays": 5
    },
    {
      "spamBlockDate": {
        "$date": "2025-01-05T11:11:00.000Z"
      },
      "spamBlockDays": 30
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-13T12:44:00.000Z"
      },
      "spamBlockDays": 30
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-14T06:45:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-20T10:40:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-22T10:17:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-03T16:14:00.000Z"
      },
      "spamBlockDays": 7
    },
    {
      "spamBlockDate": {
        "$date": "2025-04-04T09:55:00.000Z"
      },
      "spamBlockDays": 30
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-11T06:53:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-11T11:37:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-16T05:19:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-31T10:04:00.000Z"
      },
      "spamBlockDays": 7
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-29T13:09:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-04-03T22:00:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-04-11T11:06:00.000Z"
      },
      "spamBlockDays": 7
    },
    {
      "spamBlockDate": {
        "$date": "2025-04-09T05:14:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-04-13T14:22:00.000Z"
      },
      "spamBlockDays": 3
    }
  ],
  "nextApiId": 2496,
  "twoFa": false,
  "twoFaDate": {
    "$date": "2025-04-10T11:29:39.058Z"
  },
  "automaticCheckDate": {
    "$date": "2025-04-12T12:29:45.948Z"
  },
  "lazyCheckDate": {
    "$date": "2025-04-12T10:33:51.351Z"
  }
},
{
  "_id": {
    "$oid": "66dee284f856541e1b71d1bf"
  },
  "accountId": "1724603551-7-september-9-sep",
  "dc1": "9fd28f3691508c99d3a443b7fbbe3ae234576832852569b7902be58877890a14145cbee9e99129c24ad320fd0a7f9063b87565a816740f9c36a6232527980f04a9ac32f76d17c023bdec0fa9958419753b8f3682d68a0165ef033fab7f94a380819abc2b6765cf2b592a25f0920b0fc7de39cef8870968edaab67b6d1e7b1adb0983ed89bfc3fc7bb38181a4f9d377795ff6eaf4c857c463cf8c5b56312584e393761a618b2939d954df52711305137e0f78024edd0fb6daa28a59f028649294d8d41246d5de1415b903d1a4236ef30d836c66d0b1f16e4b3b6fe6be73d5e58b548b8c5ca6883c575dcd60d15862c6f68df899dcbe9942a672248b1e113214a8",
  "dc2": "b61033db5861448fe2c46a41c1569cab56b69a55cde8907e789c3e6e14ffbaafa10c8bcb5cf2a588100936e16e8e74406f19364e86dcdf706df480d39b2c51d2183a36bf109ca08f900d4442362b57256e2645bd7e669fafb8e499bac3e5e52f3ddf4d5836ca72d3dbf801f968249fc5b46c960e0c2af7f1dedf67fbfe31e4b6d3fb550ed9f4d7f822d047e988ec28fe2948fbc9c66266aa2a7709983d5d3b7ccac31b26f7580bfafc6fe773f267421eb5a7b5bc0c166b988f9f92cbb29d4c19f70b4933438b49a9c28c81576cc67eae567d3e7a7304f26628a01048b1d07fad57304fdc28438bca2df4d3f9f80a687cb841856f2142196999359543b9ed4797",
  "dc3": "10c99267aaa4fc073ea081b3800cee3a12dce8625df7a30841fce9d57c3451df7fdd9ff4b069473551bf5631adfaf35f1d3a2d83be24b2192b10aad19513d0d0ad4a5d1361dfb10a8f83dcb271c93e61f0cc9ea8c5c19712e1517d42e65a2f794188d66aff8cb9e198f2ef3cab6c7cead3295a45d630f1f43d082b41f75946972684f19c278c59216b3436a634393dd7791c518011145cf1917993c842086dab94d9f1e79c969d42eb5a2b3514059525ab89876ec7eddfd849cb8b9b1998d450a27b63abfdefc227b6433a2929c425b2f4d2e537a8bde97638fafce968c835d36eae491cb3895130623c8b35c4c4345125cdc50fe74e949f051ea295c82adb0c",
  "dc4": "b16d723ddb61182a78a6d56fe761c15edfde61a7bd0ae444d0eccb7d7839276bb04ee2bb727b2061f03e44e9e54558d8bf335d2a60bdfae05142decde3ddb4aa2d58e0ace5979e7f8b1716ce7411515e18661a3dd6dfc8b4cb9be57c61a6c9ab112f6f440947de3b52f463ff9c95e8d9e47ee5fa6755bb8c10cbb36c1916f59ec7a6e669f90e7470410366b77ad1ab039afc0780aa8a843963d9ad825f8527e782c4a59d9ef82ff3edc60c54baf32564f9abc0063e4c9a76f379481368948610a9b4b7e3784c765566cdd9c3cac8ceeec51a6d611d7bf641a53c4e2c139fdb1a8980160563daa56c6b8bbadd2ca7911ec27192f264cc6e0dd0c64697d01eb836",
  "dcId": 2,
  "banned": false,
  "dateUpdated": {
    "$date": "2025-04-12T13:08:21.615Z"
  },
  "firstName": "Viktor",
  "lastName": "Osipov",
  "messageCount": 314,
  "username": "osipov_distinct",
  "id": "6616366938",
  "remainingTime": {
    "$date": "2025-04-10T16:09:53.426Z"
  },
  "spamInitDate": null,
  "historySpamBlocks": [
    {
      "spamBlockDate": {
        "$date": "2024-12-14T15:09:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-01-01T13:02:00.000Z"
      },
      "spamBlockDays": 7
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-11T09:47:00.000Z"
      },
      "spamBlockDays": 30
    },
    {
      "spamBlockDate": {
        "$date": "2025-01-24T19:52:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-01-25T07:49:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-01-30T10:05:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-07T10:04:00.000Z"
      },
      "spamBlockDays": 7
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-07T08:52:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-13T07:48:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-12T14:25:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-13T12:26:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-21T09:06:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-21T14:40:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-28T10:11:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-07T13:59:00.000Z"
      },
      "spamBlockDays": 7
    },
    {
      "spamBlockDate": {
        "$date": "2025-04-06T15:34:00.000Z"
      },
      "spamBlockDays": 30
    },
    {
      "spamBlockDate": {
        "$date": "2025-04-02T05:46:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-04-11T05:09:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-04-11T14:11:00.000Z"
      },
      "spamBlockDays": 1
    }
  ],
  "nextApiId": 2496,
  "twoFa": false,
  "twoFaDate": {
    "$date": "2025-04-10T10:01:58.453Z"
  },
  "automaticCheckDate": {
    "$date": "2025-04-12T13:08:21.615Z"
  },
  "lazyCheckDate": {
    "$date": "2025-04-12T10:40:52.251Z"
  }
},
{
  "_id": {
    "$oid": "66dee287f856541e1b71d203"
  },
  "accountId": "1724657133-7-september-9-sep",
  "dc1": "1d9a4af38d7ddca401d5cf2729721401302cdd5550531763817f80df080820b4c3588db8f40ec32e005fa2f914c2d832d118a2789c31cee24f25ad1476abbdd463103f71b2934a05c65fee26016ef40dcf9e8adcc2dc6702d919f578970b8ae39ff7d1d1c65ac33c335378f59bd648c3e2d5766dd0a4204d5b063537cdeb2acdce1b8df4380b0e079f61730ec79bc4b783272c9dac455a87c30c2b8eefdc3ee315de15d4b457e773fe7e20a11428a59494a6ab001c7a88819556528f861eae1294c5b022bc39e1ba685bedcd7ba5f3ef6e451e30c000184d1835b65a4739d4da8ca48c7f0e9ca34012b9e17d3e72fc8792e2b23b4cae3b622aa4aec73baad988",
  "dc2": "546cee707e9d13f318d6dbc83b26accfb31db66aab01e5e8745e0b39777cf5983bc1e3439d1c0478985da6ec3de736b838aa0ae8183f5c4fcb4bc3964f9e062636aaa560ebfed350f98556f934da632c15f6645c4d1391482cdf5462038909e99eebce97011da89d1a1ee29c5fc392091139b5d6074e00bce5504952ce39f6c0ce4000dac8d9ac8c84e577f1fd35c92fa2b90012cabab06bdabae511e0caf9b99f6321ec2c9e4269dffd55c502849f53746542aff682f44de1568b5499931ecf64fca534a2ad20f3b331b852fb15adf3a3f5f31779e584c73a4814a7b38ef2241b713c5f57dd1503e63f2236dcc828dfe06e72341bda397b0bb663136788d924",
  "dc3": "58a442ac1daf2cdffd482e5b53107abcc000b8a979399831a3559ae4c6b7204f095702bd2e76701b078e21b8f3cfd3cf46e9816e31457212c92195a0201c723236e44887d76aeb564bdeb6883f8623c8324293f042f96af96a3a53f1f38f65a85df4627ddbbe02d2bfd899d48e30935cdde38010be3606d5c505120a0e042a207ddfc75c41a5d5e170bd316383d0a6d40638c2a0810b8c4082ae801d7c1eedb48d6f11737d651dfa683e889cad36730dae764de376839c0aa7d3db5d5fce56a3c2f930523ebfea1a8e0ea083542570fc30c224d5d97fa30a8f654ce7ca39041ec0dd847e81752085bf43e09b4715d4c7730b5dc787d2490490e369d010a8c3cf",
  "dc4": "2849d6e0447a667d758ee7fc72ceadf9ce2fc5d13b5b1685e754c9c939dbd65c3d5cc69c7daa022bcc2ee029ec88787d887f3d5ae2f4f3e59dae64ed06e80fcbf4c945146baae3e97e7aad5629bdb822b31937164f6f8334c11457de86be7f93fde031edf9b73115dd0a7f890e6c683f31e5b4bad5ee283e21027c16f8d6a536c535c929d8442dba9c4b419861de2b3f810ba83a44458b567b5c9ca40946d371b123954dca89cb11eaf2efde8e6560660daf021666db9a3177320731dc412bc20833e3e103ebde5dd1d50e09df8d5060d94142c3897bcf78e303c61b8dbb1ef0fb09501d9882992bc173c7f042f7548b8cfe9be7bff941361880d56d8b480594",
  "dc5": "90ffbcfedcbfadc47764ae412aeb7c4d845f5b0415d50ff250fe97e6f22a2f8c8007302b50cf153c876ed76279afa7d4a65632658ce6b4175904aface7fad741b9b602f6b862168c62e9296b4a9a156014a390e902ee3f343cd8ccc14342022f07d2f167ee43898afc5e636d9f87813158625699b4d29e8b042e466f1d9c40ad88cde90be7738542c39c1d5515dc631c03615e2ddea4e7f57413e89a59c73567e223dafd40eeb4f2b17c58bb363e31b33d1edeb1c99bb934ffe4f03d58d952e3480d6075b060b2387c7675c7fdadbe0f2af0cf8a84001f73c6c6c874b1ed5313becec757e7134973b4b61db4341427c6cc6aa0df5a73b05a5776b652efcc07ab",
  "dcId": 2,
  "banned": false,
  "dateUpdated": {
    "$date": "2025-04-12T13:09:17.315Z"
  },
  "firstName": "Mikhail",
  "lastName": "Belov",
  "messageCount": 368,
  "username": "belov_passing",
  "id": "7528186554",
  "remainingTime": {
    "$date": "2025-04-11T15:37:30.359Z"
  },
  "spamInitDate": null,
  "historySpamBlocks": [
    {
      "spamBlockDate": {
        "$date": "2024-12-02T07:15:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2024-12-19T12:23:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2024-12-31T08:39:00.000Z"
      },
      "spamBlockDays": 7
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-14T10:21:00.000Z"
      },
      "spamBlockDays": 30
    },
    {
      "spamBlockDate": {
        "$date": "2025-01-25T09:29:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-01T13:17:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-09T18:01:00.000Z"
      },
      "spamBlockDays": 7
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-12T07:15:00.000Z"
      },
      "spamBlockDays": 30
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-13T11:17:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-20T13:47:00.000Z"
      },
      "spamBlockDays": 7
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-20T08:41:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-23T11:15:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-25T09:25:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-28T10:30:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-12T13:08:00.000Z"
      },
      "spamBlockDays": 7
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-10T12:07:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-13T13:04:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-20T13:16:00.000Z"
      },
      "spamBlockDays": 7
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-26T07:01:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-30T04:33:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-04-02T05:28:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-04-10T07:04:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-04-11T13:10:00.000Z"
      },
      "spamBlockDays": 1
    }
  ],
  "nextApiId": 2496,
  "twoFa": false,
  "twoFaDate": {
    "$date": "2025-04-10T11:29:15.436Z"
  },
  "automaticCheckDate": {
    "$date": "2025-04-12T13:09:17.315Z"
  },
  "lazyCheckDate": {
    "$date": "2025-04-12T12:23:10.312Z"
  }
},
{
  "_id": {
    "$oid": "66dee289f856541e1b71d24e"
  },
  "accountId": "195-7-september-9-sep",
  "dc1": "b2deb9ef9aa70e5b0d6ba391c040a78e468b735e5328635e894d326a9b886f1364046daf0fa796e994dd619617e54d6a06a8495f4ad6ea7a6e7749f24bb906f2af80298aaf1920f69f2a6f81f2f35f2bb8f2f615e2ff761c1b35022ec0df92963ad57a7b605425fbe36d56a170cc9d5a8f0324d8c0b16f74e6ccce89697d05437dc1c4ee1afcf0eb1dad540ceb4c40059aa8b0cd76f75c089289696d073fb780e60b424dcf7ec2ade7c46b7572bc624292a3fdc470b4f6dd4e33f2235f2b7229b63dead6dcf6136f410d595f2610c36d33cdef88d5cbb72c8211ea531532f67d488856dc45a7ae481d4f1ac6cab3c07629c4a7f80d766a784df8d1d6db258bda",
  "dc2": "8d2afc0abfff1d23d160d5ced5124907b4578612de4af685a83ece97bcb19a3ebded48017435c457eb5924673facd6aa8f6e6cb10b090ee06e56151536ee7a4c8ea6bdd86ee036dff750b068f05fd6ce62bc154d071eeb797f004652c2dacc1b46c5afcdeb9f0930d6b61caa302d461643e12a272da85ec8a2e18b5354def766f9125157a177bc3d3ac437255742d080d8535ffd7e37c40580a5acedcdc39acd2f78b1b4703d5d7ad2ed2908bad6557d64d5c6b0036c67c02c2202e7400d4cbb0f7a19b5df38b67205d2642aa694bfc03215476d185de902aa7fd3d8cfb28e331185b17f8e93b2da879487b5dc0fa927407c88746662b236a28baf5dedf9ac73",
  "dc3": "a63acdaacc150c5c3fe3435eff9a757ea2bb03f6fad36293f16b9f08d7e80866568e1e49e8f384758d2c3a37de71d36def40b766dd930f39f1fba0a17ff654ab29def399e515f39dcae2aedece4650cabffe40250dadddc9700e415319e30520a98bc3981e16aef36ee11d1ffdf40ee2d2e568aa78ef42f20b3ebc1211a313b71bc79417381df40cec0d2f8da3312b8290fe90e98bc2ebb97a8842d59726302a760ae3bf186a2dd6e3a1426f736ccab36de49a24c016b9bb82b790d5fcbee2f3fb8ebdaea59cee73244ef26e1e8609144a3c8505c97be0da06df55712de11c43d3622f664e021aa3470340fc3643790a6ab33421fa63dd90bb729cf263d638cc",
  "dc4": "37808d20edccfe29a4d4fb4ded003db4c2ecef2f5360376937aee93fe02e0976474a2b8e5088c988650f0395ac3f2e13d4f0eff686b504217fe4d9fcb29e13356e6241ea93ddd30af7d01de1f34dab26706eaf6f08d26790d547470d2b845a49da01925b9569034350c5ee52cb48e8cd2407d5f9af32726dd4ff523c0356c000bad24fb4d20eb69c08b1d519d9346fe535bf4f894b1535c9d3d2dbabaf49963d807f54739a71f67c57c8bcb7293cc022f7a0fc46cf909174ac0edccb10d0bfb6158386cebe5bfac0534ce44cb781e2eea0ae6a964cac9498569a0870ad27cb596c64a86dcd1825fd5626acdd338766f00b956f50b99fd4fff0faffb828133eb1",
  "dcId": 2,
  "banned": false,
  "dateUpdated": {
    "$date": "2025-04-12T12:25:06.881Z"
  },
  "firstName": "Artur",
  "lastName": "Potapov",
  "messageCount": 378,
  "username": "potapov_faint",
  "id": "6797420745",
  "remainingTime": {
    "$date": "2025-04-11T16:20:17.481Z"
  },
  "spamInitDate": null,
  "historySpamBlocks": [
    {
      "spamBlockDate": {
        "$date": "2024-12-13T15:15:00.000Z"
      },
      "spamBlockDays": 7
    },
    {
      "spamBlockDate": {
        "$date": "2024-12-21T07:32:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2024-12-30T06:11:00.000Z"
      },
      "spamBlockDays": 7
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-08T15:22:00.000Z"
      },
      "spamBlockDays": 30
    },
    {
      "spamBlockDate": {
        "$date": "2025-01-30T09:47:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-02T10:48:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-04T15:08:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-05T07:52:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-08T08:33:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-16T11:39:00.000Z"
      },
      "spamBlockDays": 7
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-16T11:46:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-25T14:28:00.000Z"
      },
      "spamBlockDays": 7
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-28T09:34:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-01T08:51:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-05T21:27:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-07T08:58:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-12T13:23:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-13T07:03:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-20T13:35:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-19T14:36:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-20T13:21:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-25T13:42:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-04-02T05:42:00.000Z"
      },
      "spamBlockDays": 7
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-28T05:50:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-31T10:33:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-04-01T07:33:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-04-01T14:44:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-04-05T05:56:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-04-09T09:24:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-04-13T10:57:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-04-12T19:09:00.000Z"
      },
      "spamBlockDays": 1
    }
  ],
  "nextApiId": 2496,
  "twoFa": false,
  "twoFaDate": {
    "$date": "2025-04-10T11:28:59.481Z"
  },
  "automaticCheckDate": {
    "$date": "2025-04-12T12:25:06.881Z"
  },
  "lazyCheckDate": {
    "$date": "2025-04-12T11:38:45.905Z"
  }
},
{
  "_id": {
    "$oid": "66dee28cf856541e1b71d292"
  },
  "accountId": "221-7-september-9-sep",
  "dc1": "701f50e23ac8b5093bdb121a50efd0af695fbeeb3e2d0f278563222f79317354a33be035394b376615e4ca62398f5a97dd0995bb35d6cea69647abff4acc1c01ac280564a919c880892ec3c61943521646036a92fa978079d12be418476a41e2e884df24cea65dd30468cd3c72c8c036e3ee5f728c7913fa31fddf2adbfd60d9c9570cc192e70922926b4df5e546ae240ce91b3b4141cbbc4bb51eab3f4225f129ba3c3d29faf03865145453959e2fde038e05d711a87db00a91f40b5682f61af4483f6dc67e789e41deaf044337ce9392392ed0bb2ee965f8bac747076fcc9f6e79cf0471359625ad2f1fa6708298ce873d899a8f6e7753e4fafe4061c11375",
  "dc2": "3cc792ed35feaf78ddda096efacb4cbe30a0955dfe10ba1cae297de8b9f4ef91f40a236316c4b6ada106dcc60a41ad4721d614753cf47fec7af385d66d697741405e73cde0d4c44798af472e4c00d3e802f97db98d90ef7b2031e8c97d3c0a944e3f13c2b7070344203eadc6a3349b031440a5e54381e9e11d1b71f49206c6bfce8dd5b28de1fa187fe924966f39a6579e66426ff9529f1f49d3907400cccc8798bca95ef4337f9ee2ce11df9e51fbd30b3e178bc085327b0c22c95a3b31c0ffc0d9adec572df20759aa99d0efd1f454884317720beb0ed0d60643e5833bc08d190370f7916bc15b93c7be4f920ff82215b92e0f3839cb894c9949c8e7e8ee33",
  "dc3": "bba39ce2df9059e3c6991d34719fbc45adec410211e784bd09c8a06b7edbc15fbe59639a0b0ba86a7ec9a0f0b9b1d8353e760391826bd78b5215c6d10c96e7fa282d4848b0b868d18a0184205fcc03d4ccf819a3f34561fb1d2ed0e0d8b6ba2c48aba4c238c19635ce10a488fc6420b41df9561a9a074a82cc2873a18154223468178ee11b5f15e6442a1d19a47168583d993e6963ad6004e262b0935517f11d314e975028fc76d5ed33df4d630f9df4c1618044fdcffef2ae4b931fb3516b72a65b9cc4cacfe8c0aa997e9839dfe7bf9573389f02fc6e17ac55e0e8c8b8a2a394d182bf522e86cb5773b8e0d064de08350b64fe8456281fc0f2988dc3496672",
  "dc4": "852a7640c811c3bdd43374bbffca806c90262e6294768add155200efca78a9a41861ee1f8503be5c532ab5a4d45d839784bd08f6a4b47b9c510de5de48ba509bff4fc6d975f7e5bfa921986ecdd584c02f607ad41498e3812d5054b4ff429819ac280daa3b1981404f65cada4a597e71420cae24f28e80907f0dc55aa7b082bef84efbd03462fa7051a6fabd1fe24dcc1b8bf3f2fe1bfcf1927bd349cedf384af36fb2d5330f94a40c35699a3127a6d14e265cec634323a66f42c5f0ac5fda2a961fc63df100facea3ef270057e9b91e7a967b3e75db2adb28775f05d1110754e7c1e4c5c7f445b9cb93e851b6271c8a6dd200082cef71bf3ee70f0cb9bccb69",
  "dcId": 2,
  "banned": false,
  "dateUpdated": {
    "$date": "2025-04-12T12:26:04.399Z"
  },
  "firstName": "Timofey",
  "lastName": "Morozov",
  "messageCount": 406,
  "username": "morozov_visiting",
  "id": "7082558681",
  "remainingTime": {
    "$date": "2025-04-11T14:14:33.437Z"
  },
  "spamInitDate": null,
  "historySpamBlocks": [
    {
      "spamBlockDate": {
        "$date": "2024-12-05T13:01:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2024-12-18T08:27:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2024-12-22T10:09:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-01-15T06:05:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-01-19T11:11:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-01-23T14:01:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-01-24T11:46:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-01-30T12:27:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-01T12:44:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-09T10:50:00.000Z"
      },
      "spamBlockDays": 7
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-04T14:17:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-12T11:50:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-13T07:06:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-14T09:01:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-15T15:18:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-22T05:38:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-03T10:31:00.000Z"
      },
      "spamBlockDays": 7
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-04T10:31:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-05T09:22:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-09T08:48:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-10T12:07:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-11T06:43:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-13T11:24:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-14T05:57:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-14T09:35:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-18T05:29:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-18T07:19:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-20T10:36:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-29T14:38:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-04-01T13:29:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-04-03T11:43:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-04-13T10:54:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-04-12T12:17:00.000Z"
      },
      "spamBlockDays": 1
    }
  ],
  "nextApiId": 2496,
  "twoFa": false,
  "twoFaDate": {
    "$date": "2025-04-10T12:58:22.645Z"
  },
  "automaticCheckDate": {
    "$date": "2025-04-12T12:26:04.399Z"
  },
  "lazyCheckDate": {
    "$date": "2025-04-12T10:14:33.514Z"
  }
},
{
  "_id": {
    "$oid": "66dee28df856541e1b71d2be"
  },
  "accountId": "259-7-september-9-sep",
  "dc1": "5ae79db4d67367ba12fc887d9fff34185ddaaf48166807f4b15201fd3ab61685c8926ff73cc085dee9cda1797eebfb7bc5d2bf02b886eda9827bdd5d59a7479fcaef2bba0dc66bc20bdb1495f2009a2b177dfc380c8bf86d6ca4cb4b8cbed8e537fb6c60fdd12b20af51ba6c7442a375e58c889b04fbc008e52d532a76f3d3cd23367126ff3d24410b1eb36a5504c3278d553971da8196cc28fa0c94f9cbdd093220326f32f8b4cb22a7b6b55cdfc528aa8e22769434282a640ed2f68d6e5eae0a096f4f406fa70b4ff258de753c04c7c1822d820547954e4ce9fea416e0ad13989bfda193aef1e531de97710957611f53bc29426f39eb7cb27d00e62e7609b4",
  "dc2": "c5251444ad1922128c3355ef88a53e5edef334b048459d8479ea5e7385db8506e65b32f09dcb686557be3803e32c9c770c1be9a81de03182fa9378f1117b8f4449f19540a0b192ecdd9b65f7a95f7e6b444c2b3acaaccf0636e6e9dec03f69c43d0efbc83d27f8e5f90295a58d2916da6eaadde18a64d070812d7eaef2fae7c2778409099788cc889538382a2790709e34d74ca6eaf5955ad8c9dac562d3084ad88b467e5669a04c6c5fb5bd494be2e8d64ca4b9e5a44b4bd74ea344899e4bb22f30d3343b210d7a31289c0158a7b471e812c2b4368f9f8e61322810da9b2eee240f89f716ed50c7f6537162d9df5e849a61bb4f5c1e306e517ff58f2712cffe",
  "dc3": "11b3ab0326074d6c2d8fcad9c729bdcfb6c4d6f04facdeeb1817e1ad5b92038a44324f518cb57f815e6e47772eb2bd9e10c72dfe5364312c554d16d73b73e0e34b37cd0b884c57a05a5505efa52391c752cd68fad9a55d3eed73629aa80ef174c5d0434199f5698b3b239897fb61c2eae801b69ebaa4b6e32698e2b3b16c400c459056a7ab1f972a2e16b92f7fe7000562afdd39e6c5989f763b8c87c32ec443bcc51c0bd3c59f1144f28200eae1da45ba8eaf5462f58529bf7ab0be472ba57146c1fc01a3bb67d7d70622be82f6652656aac113b0f21424205e6c56a69496da158f9ea90193ebec58e393ee569bd78a318d9f1bb8cf85038047766445e09bf3",
  "dc4": "2fd45a8eea0479bd0f8207c1c3adad40f988fdcd352a07f2affd1924839900647d5af825b9f9cac048bd5d4f1e567abfd84b142529c2376edbae0814b40fcb713671160213b9e5de67fb32e2fae129a50fb697317655358a40d0e94a8ab4bfeb7be67b49dca6d723a1f887af980309ce006556c5b6da11325f3cd0944b2cd1fb723affabf225f7952b23b00ba46d00d1acf7b466629901edd8816f10c58f11131597273b84b6233dcf361e3209a5654ab809a110629d6ab799b9eb131a9247809239aa8ed2304b9296f8e8fcb133788ad52bb53bc635d1c0c0e5063d6369c0529bf9d42533763a1824f310d87a98eed1e3227365e9a75803cf2f0ce8fc6b6cf2",
  "dcId": 2,
  "banned": false,
  "dateUpdated": {
    "$date": "2025-04-12T12:19:31.038Z"
  },
  "firstName": "Ivan",
  "lastName": "Denisov",
  "messageCount": 513,
  "username": "denisov_dead",
  "id": "7516889492",
  "remainingTime": {
    "$date": "2025-04-12T07:02:45.799Z"
  },
  "spamInitDate": null,
  "historySpamBlocks": [
    {
      "spamBlockDate": {
        "$date": "2025-01-18T09:50:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-01T15:02:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-04T15:02:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-11T11:15:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-23T05:55:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-02T06:27:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-15T08:49:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-04-11T10:33:00.000Z"
      },
      "spamBlockDays": 1
    }
  ],
  "nextApiId": 2496,
  "twoFa": false,
  "twoFaDate": {
    "$date": "2025-04-10T11:29:15.569Z"
  },
  "automaticCheckDate": {
    "$date": "2025-04-12T12:19:31.038Z"
  },
  "lazyCheckDate": {
    "$date": "2025-04-12T11:46:51.832Z"
  }
},
{
  "_id": {
    "$oid": "66dee28ef856541e1b71d2c5"
  },
  "accountId": "262-7-september-9-sep",
  "dc1": "abacedb0f6ac9685c1700e7fc71b74b3a67fe5939c18c23048d36e1450d42dbead663f5be1aa9f706cfd899930655e7bfe8b4cc03d6083b6fbadb9a388d5cc7b4d9d5a6d7e47233ccfbfd58f1d5c000f5c81335261d276b3687526fdb34e5b10fada7a8936252179856ef11883663271cb0ef4cbcac4a5fefb260e2c0e4f105d6c26891874d455223da572d93d4f0b96f0e8a50c420cccea35a56f61cf3bdc372ab53da6fd37f390fb91e95dd2276db7ad287ef645519ecfa393b485cfb205d47980fcbd7696c9caabdc01ae1098d482528cdeb98ad90cccbab2b784baeefbb7d86e5e0c33a8d3455783b1f030ebe10a5b6f4df60b10c6422300a4ff8bb74a28",
  "dc2": "34cfda32b12bcf930ba3b104921d43dea8952bff05d96e40805d7a15b93c8b8b593beb82a950a27b6c440ad7f75a13de59d7e0492a6e35d7877f8e7cd641d9f832b1e7f33963091502a2a7143c1997fc93f254937860c564be201a91861ec570626d05b549f873464675f89c7819d2b1eac4e233b821f20a19adccdf4848f8a812d78f87f0bce89d15cfbfbd5278270ce68b0228b48c5c2ae2551c3bc1e87d3f16f5e72999b7b178d50cb31a62dae73967a4e245645c8e433012bd68fd0c0330f63f0054c087254a3e9a211eefef043d1133bbaf80ee4d90cb21502bb9194e669063a47c7d4b77f8c785dd42fe129e82638c8a3bf5f599fbcf4d594d32b9296d",
  "dc3": "2b8113c58cdcb35e1c1105270b0486019ce2f00532e16964025189ff5b3169780c7c9a57ad5b111421b6fe2bfcf36fb8a6c4a27e23f5e83ea29e0d5ab269c83aa4d8b9b0f02938e5a8563896ec650d627566a00d70193c6c8cef4753f797fec0b761714f6f67f81c2af07ca61474a2c92607b235e082eb0f09bc079567a92de4651a93c5ae3503d4514d44b9b406edd562e906bb9f2eb7ea0bb0f01116514242ebaf938f151cf65c28a401fed93548fdae3c5e6b02cc9c4f527c30b83757a8d68abc0f25c2eef084d399b19a06f1aa476bb02b9ce0dbee1107faece5af0a62a1599ce785a5b9ee8f104653e2d205404d04ed76daf360f552f90079d71cc8436a",
  "dc4": "57f87971bb2c2a771b950a7c667c805b60c38085fdb9530f5ec727f8e1354c495e56af0a5b9327e378c015380546b4a0e06632a05ba383e19d874100f589f17645d5523a786fc9981d05abc2142a9757471b3e5ff4aa85bdb129168e70a62cccf762c147a152adeaf052316ba9c1c790410a45e0208ddbadf5a6efa369ea641af04160b83c86907b090e6be2b2ac246b50c89696748a1ca7e94f9509cb7e71e9fe8d85333b26281cc2c1f4132c14a7328218c8f9310a67dd0ebe5814637f9c8803d1250d3c455a56299eed66ebe824af71060a3769a62993eb62e485fd71a48a2ed1f83f60b108ef0fa5e27ebe1690bbe7748fb407137af0427e721508965832",
  "dc5": "231928a0437c15efc0dfdbcba7fdf3549d4bb5cda4c31ea7590654a65350e100761a879b978277b0b52e96966c4906cc82dadef2160b926427842359c46823964054f2a14dc8aaf3a969f19781d903cfdefb8c09498f6fbc49d2001945ead6a67fe70fab88a5a20bb3239a85f989f68d31ac777327200ab21a207c56e8b1475c606878c2f1cdb4c485f728db687ff3d00a61dd4aa4e4786bfa5550df6a6536e616b4841e9bdc271cefd25c468d70fada92a0a5b9d8bf47cf0c622ec138ec42b58220a8c04389da2182c03939d1d8e0abf9927c34befd65f489c16dc3ea6e64da0a814c42a723502e6fc381ff273ee1422ccec40ebb85af9532f8ecbec138f50e",
  "dcId": 2,
  "banned": false,
  "dateUpdated": {
    "$date": "2025-04-12T12:37:04.548Z"
  },
  "firstName": "Igor",
  "lastName": "Frolov",
  "messageCount": 399,
  "username": "frolov_multiple",
  "id": "7320551474",
  "remainingTime": {
    "$date": "2025-04-11T14:55:43.745Z"
  },
  "spamInitDate": null,
  "historySpamBlocks": [
    {
      "spamBlockDate": {
        "$date": "2024-12-16T21:42:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2024-12-21T11:55:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2024-12-25T08:25:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2024-12-30T07:44:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2024-12-28T16:55:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-01-27T08:30:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-01-29T08:15:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-01-30T10:48:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-03T08:40:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-11T07:51:00.000Z"
      },
      "spamBlockDays": 7
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-07T06:26:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-10T13:02:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-11T15:28:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-17T10:21:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-27T07:00:00.000Z"
      },
      "spamBlockDays": 7
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-25T09:33:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-03T05:22:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-07T18:15:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-15T16:28:00.000Z"
      },
      "spamBlockDays": 7
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-22T13:10:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-04-01T06:07:00.000Z"
      },
      "spamBlockDays": 7
    },
    {
      "spamBlockDate": {
        "$date": "2025-05-02T08:35:00.000Z"
      },
      "spamBlockDays": 30
    },
    {
      "spamBlockDate": {
        "$date": "2025-04-11T10:13:00.000Z"
      },
      "spamBlockDays": 1
    }
  ],
  "nextApiId": 2496,
  "twoFa": false,
  "twoFaDate": {
    "$date": "2025-04-10T11:29:19.599Z"
  },
  "automaticCheckDate": {
    "$date": "2025-04-12T12:37:04.548Z"
  },
  "lazyCheckDate": {
    "$date": "2025-04-12T09:28:05.448Z"
  }
},
{
  "_id": {
    "$oid": "66dee291f856541e1b71d338"
  },
  "accountId": "303-7-september-9-sep",
  "dc1": "70bbc92eba7c2eb5351137a9d21ca24e85e4d0be01cee36b032b8cb47ac0a81606eff4707ec4eac01f0b1900baa8015a75013f303c87fdf3f48b4054e5ae642966eb5d728983e80c33bbb8a4b6ecae7c8d9874cfd6bae098ea89d7c3781e03369259b641fb7228cc9f6976f94c5e7991521014040f491d0b343a971032e20df9a91567f766eb7d60188953b9dab5dc162672be6d41dd002249a00cfc9f585fd28b982bb4b3366d2dc67269df2ee76d270fc99ee3b5273bd7b17086c0b29cf38d0e5ea1742e24c0e0ba745cd807097afc95e2aaed2c4a5a16760928b2abb5cb13d8921f55a53ce1e10516867914c9079bc9b60ab44f6e1e1a91681fbef347373c",
  "dc2": "38923bd6ff83a577214c3b8b88a52fb236372d78809b79c864de508fd49599a782b17dce6458059cf0d36ea43f0f66f0484d9fc95cc05fd9726ab007e85e64f14f7643c81dd14e32f99e3a97104c2d7b99faacc02b48fa89a1956554388e939a236a24e44802913c55e5cff79b42ba5261d9e872a5ae65f61578af9d67cbc5297c9fc2d71309c722997b583ab68df010f2801c528512380637b31ad786c455ea3ccd89779d2d82946ebb5492697177d79ebf039dfc3fc22a1de7427d5ce4791385a0c0f77a4fdfebd0a88de530f8c10a9791dd15a8e250df18cf28a40db3cac8a2c5e4c55d6e7949764351f0618a5329aa2f5984f6e3177d78b5065693a11e1b",
  "dc3": "716388feef24e5f924c61a6f08442a02627c2bbb920eb983994273193af958536e288bbfe83d272cecda3905432842c53b1bc1c99c7124b7992a850bbb00c621a8596599709f134313fbf28a1d6f5dba729238fbd543b4e511f5c98742dc4bfded089624a3f0f836c56897ae8d46ded8edc97577deeb9e584d1f54e84980e79f29d67bd8c2c9c127d79608eafaf87455ef5f840a33801410efdf29aed3b740578d2785b8aa1fd1b4fa020ea83b91310c3683a8519914227952cd93a7efdb20cb0000bd8be606dbe7077a4480dc38e2b4dc5e92e962447f234fb88dbbec07ba01a36e5c31dc14b56c3496d29512135f7a752fb68ca4d14b24a92634813aec77e7",
  "dc4": "470f54236b4657b59b01006b3d2e03dddec041af4a9749c1fe34ae893ad231eeb42b8433668b3f25b95e4db03f8fadec4e5e19fdffe879f96193e743804a1fb3a7730cac51b75ac21ad29912a8b09d8cb90d1b477b906295b2f943d1907f41f34952bb0eba15e492eb2bd7f33b2f30ec8ca9fcfbdc401b543f928951b8a5aac591591a35a94aef4603bd9a87181c4d1caa6af26abb87b365d0d0aa99ad7c5d5ac283055e3ce11a0d91d1172ba6c117711e883ebd94248c8a82512000d03cfdf32358402c2d5b66eb602575b60379c98fad148bcf78c8303cc65aaa10022d1d9caffeb80f3a375ad8fd87c8216c41c8022229173cea570ce7de1526cdad72f5d5",
  "dcId": 2,
  "banned": false,
  "dateUpdated": {
    "$date": "2025-04-12T13:00:24.779Z"
  },
  "firstName": "Andrew",
  "lastName": "Anisimov",
  "messageCount": 362,
  "username": "anisimov_fluffy",
  "id": "7256556193",
  "remainingTime": {
    "$date": "2025-04-12T07:05:10.579Z"
  },
  "spamInitDate": null,
  "historySpamBlocks": [
    {
      "spamBlockDate": {
        "$date": "2024-12-01T08:08:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2024-12-07T14:04:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-01-18T13:04:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-01T08:01:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": "INFINITY",
      "spamBlockDays": 0
    },
    {
      "spamBlockDate": {
        "$date": "2025-04-11T14:07:00.000Z"
      },
      "spamBlockDays": 1
    }
  ],
  "nextApiId": 2496,
  "twoFa": false,
  "twoFaDate": {
    "$date": "2025-04-10T11:29:19.123Z"
  },
  "automaticCheckDate": {
    "$date": "2025-04-12T13:00:24.778Z"
  },
  "lazyCheckDate": {
    "$date": "2025-04-12T09:56:17.472Z"
  }
},
{
  "_id": {
    "$oid": "66dee292f856541e1b71d349"
  },
  "accountId": "4567654321-7-september-9-sep",
  "dc1": "296c58453737150f4b890f17756ee2fd70af1a538414d64f2b25edc270443b2ec5efa37065254f6e993479f158916d805bed6a4a0aa8fddb852dbd641bd5ba0e15d952d3df3bb32483bc00f0330a7dfc94257be0df1623df4a7db47312b90d4e9163c50487c8b21dec0759eab5d3a131b36fab2032a56c6a26c46fd6bdbf07d18410eedec4b58ab821e1e882338c76dd52398db27935b2eb2bbca9008521e9735416444f22e026406701d3bcc7d04a3d60f0179e5d1f47b0e3c569dc5cadc8853de97b94b619599d3614e0471ae7bb8d3607932c91dceeb08f97e89f3f1f0b9fa153244fbaaac4eee1d9173ca4a45bebc358a7c6227e69ce6b7b4092d7023701",
  "dc2": "a0bba834b85c785b22855d7b5e6248cdf30908adfd469f3ec1b9b93e1e0e2126c84d1ea92e4811a2a66fb46529c14aa968c73f5d4b3afffd0f48a76f8bd62534fca73d015a9b1216955786d869ddd2b4787f00a04b843a2e7213870b00e4cc9c4450e6f90ec840edba7d0e2965c2540bd2b08b36b602c4eef445b9748e9e409c254c8d58d9c106c71bd5790aa104cd876f95d5645f38d30f1c090af58dc3352a371b5aa075c926c0ac77738480a5c5ae8581003b697827cb7b177583123eb844c19c4d8b0a33f3b4ada7e0b5d0d06f72f452a6e5cd276be1a220eb070ca0d8ddce8f1ca84a050b072ec1a58caeba1f8261b24a41426cbc288133b0bf61c9c92a",
  "dc3": "bcd53d38f323341407664fd790f8c75bb5c9a644cc7e8fdc4c64b96b9dd8aa591dd576dc95dd70e373a63c5b2b727c54158990ee2bacf237b7b66d0d5c51dc2b2309c054f2a10704427cd8df24ee9e11eb1c407027e2e472ff240169a6a7bedbb3b185e7cf71e43a1e51947f004a502e3ea9b85d35b09f4a069d8ae250018ba2751dc59cfabcf9b0e6c8c1445b47308301bc8eb48858a67248763a8301b6277ed85e7f973201bf34c6b278373e1cf017a572672502369e8742e360a05c1bb8556933f4fa01b151551d1c6bd256e20a39cf2f9cd9dbe1d13e1dd4f2d2c25de1a0e69da75ba5c970375e7728966d119d979d2c212c9b32d1b8d719f3184f46fc4a",
  "dc4": "208cd5ff5a4058db454581eac3881335829a3bffc1203bed928fd7abc4417cdd05a5104a0c14a2b06f3b444fd2d9b547f5e1f83d8beba63a4bd06a70ab8166d9e9653ef8ddbc610cb004a383a912956474b3556be73e4a68e61b5e87c15c943e8145b92fcb2c1055a9495c77b6d92088db9d7189f76536ea582731e73d6cad9e74de1439f9e6c65eacc26808f2d96fcad1adc22a187647f773fb22e5f1c5198d678628248a1989e9b2ab9349addee7106283dc1716249730f44109b3e8fbf28f495e8f98803264a51e8c88715a7c4996c837baa81dc58658589d3e680a0a7559b1e1ccc669f1041daa02a0d8e745834b4150b4a2a9f0989b47e946304b98b5a5",
  "dcId": 2,
  "banned": false,
  "dateUpdated": {
    "$date": "2025-04-12T12:40:04.749Z"
  },
  "firstName": "Dmitry",
  "lastName": "Naumov",
  "messageCount": 501,
  "username": "naumov_linear",
  "id": "7073856799",
  "remainingTime": {
    "$date": "2025-04-11T16:58:15.470Z"
  },
  "spamInitDate": null,
  "historySpamBlocks": [
    {
      "spamBlockDate": {
        "$date": "2024-12-20T07:58:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2024-12-30T22:23:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-01-23T08:53:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-01-28T12:10:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-01-31T15:57:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-03T07:19:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-11T09:53:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-02T07:24:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-22T11:49:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-27T14:51:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-31T12:59:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-04-01T08:53:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-04-04T15:03:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-04-11T14:32:00.000Z"
      },
      "spamBlockDays": 1
    }
  ],
  "nextApiId": 2496,
  "twoFa": false,
  "twoFaDate": {
    "$date": "2025-04-10T11:29:27.266Z"
  },
  "automaticCheckDate": {
    "$date": "2025-04-12T12:40:04.749Z"
  },
  "lazyCheckDate": {
    "$date": "2025-04-12T09:22:08.443Z"
  }
},
{
  "_id": {
    "$oid": "675c1b981042f5bc5b9423a3"
  },
  "accountId": "189-rus-tatiana-13-dec",
  "dc1": "8f8bec0b5d84189cb17312be07813a4cb0213e7972eb1d631c15962426a7c877d4da33611309acc1e3405d80290d0a385b6adf3dca60f980213660efd292c3484b2f94f6e4eeedca985e2eaead7a8c82d6ce797971f5f13b0e1f96d1719103c473a09bcd4b86d0d9e000463579b4689f86ced15fda3d5226dfd473e2c0deb55ad49ec94399648cc30c496130a3d9d702991d5d269c63bb20e3d70585806c0f4ca7804aad71bfa2b0dc71cf979d70c2b769721bfdecb16818e1a4ca08d050bbaba13641c50f52f13ac66b8cc1af0a64b20bed50a14975480eb254c2197a52c3d7e8fd4872262720c41a55f2651f01982dc4e519f0c5071b3931d802f087177036",
  "dc2": "1a8794aa91c39cb63e2fd291af0217be2e9feb1db47c6613f7331489ec1bfd1f3e30827ed832a77d6e568344b67813c9a44bcc477562608f58983ab3489b66184e4d8dc45e4874eae0f14088863ecc74dbc04256d77240b4cd0c33f8d15f0435ee6182f86e3ef9d9f3badb1c810929016e9e36d505f3cddb3bf99183cd7318060650680870c00bccd2f4c55e0e3044c12f236a878a52df2d5793338d86a23d860e06c775f8e7de41670f8b9f7f58d316c87dc9d7b899d1e38d3da59b8d062b95327195c835ef0aec6d7a9ead43479d6a1e7b8fce24d63762ccb376637b59d0df4a906ac57350c41cb5c35e424ebead195a0eda2fe3e85b5f1db1ca59d300a718",
  "dc3": "47b6414162d1f1899771fd35f3a418a29446f942df22614f9c4074d76ce9afab8f5702249815227838d771009b5b035199ed872bc4d6fb0e5cef4e1bea907910f6fc2cda69f585c473f9293383346926300f259bd25cd0580877d311924eeca9dcdb55c7d9c598ddd3b3d28b45ea8954024eb51e42889abf4123043bb9d915df2af96975124cbba16a825fdf1a3bb38a8cb0637caa9768e35db8111e976983d165d9d6e672238c46d06f53e514da7c1a51520ecb4c02365ac43faccd6d5b7f6412c88702772911d9596571041a226a6a55c71d2ace5153852d04c892bf0da536e7ace7d1e00d85d1cc4a8def6a215ef2af6ce9d3fd7ee7b94ba8ea48d764a658",
  "dc4": "98fede67e5991e2b975fe7ae010d490dd98f3635e8f6e417ca4f8bc78fb014430dfa19a95f3a01c9d9dd769419954bd06c629cb763a0e7361b8d5b3020891b7e05ffbf3c9589975ed1b82e026624ae2597fb3bba65cd9ac4507fd8f98a9b4683da19eeff5c7132fe1f0de4bb36bad80481a1d6421bcab71def92c4121eb72ca875c9fb7934fbfdb57d52bae754f871f2f5f0895baf9ebe6692b6faecb3a2c9352134aced819b76033afe0c48af8429afde1b357b86ce2be65377c3b647bd2213159dd7e8aae2a69f28befaeb1855ff043c3e70f7f71fcecd11a781a4952dc187f691480d2dedd94daacf70eb24f7b8ca720ebe9d73806925590530a90bc2f6d6",
  "dc5": "9a8a830bff0fc8bffa13a4b219ba876241210990f9d0845e901ab1776169559c1caa280658468b351e43c80d96cd19a4ea9332f959b875bff9e977977b6c8b266915f8274fce5ad30b1bbab43a2b975fa5d8f80828d0679fefc47aef1871b1b207654b728594ae622879bd85beb8da751a1dc49ce1862d74c9ee6c9f27a9cfc66640ebfac43a5ba446f6c48f87c37062c4def7d517f5172e57579319d6cf93fee3c616b7b24ee7467bd00adfd81e006148fc010e8aa02705c1bc917a7feb6f5a2c4a0c2a6ac8ba216a21adb7aa8d8a0741dea66a0331925199f7cb030c9554a683eec150fd40fdb398adbba08d2b9618e42e4aaa20a0711a1f8a423fcd0824fc",
  "dcId": 2,
  "banned": false,
  "dateUpdated": {
    "$date": "2025-04-12T12:15:09.255Z"
  },
  "firstName": "Aleksey",
  "lastName": "Osipov",
  "messageCount": 225,
  "username": "osipov_few",
  "id": "7549625317",
  "historySpamBlocks": [
    {
      "spamBlockDate": "INFINITY",
      "spamBlockDays": 0
    },
    {
      "spamBlockDate": {
        "$date": "2024-12-17T12:26:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2024-12-23T12:22:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-01-23T15:06:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-01-31T07:24:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-07T05:22:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-08T14:35:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-12T13:37:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-29T14:27:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-04-11T07:15:00.000Z"
      },
      "spamBlockDays": 1
    }
  ],
  "remainingTime": {
    "$date": "2025-04-11T14:31:21.359Z"
  },
  "nextApiId": 2496,
  "twoFa": false,
  "twoFaDate": {
    "$date": "2025-04-10T12:58:26.044Z"
  },
  "automaticCheckDate": {
    "$date": "2025-04-12T12:15:09.255Z"
  },
  "lazyCheckDate": {
    "$date": "2025-04-12T10:54:35.004Z"
  }
},
{
  "_id": {
    "$oid": "675c1b991042f5bc5b9423a9"
  },
  "accountId": "191-rus-tatiana-13-dec",
  "dc1": "b15ed41903ee6a19bfd1f8e7008488a5cbbd9b304bacb66ce2357e4cf6ac79bc0a24f8ad547a2a50188ec20d57a210599b75e04145ed3d4b71c3a829dd3bf26f57ae8f8d5aa7bed60859dc54d9120356f1bca808df48c627578316f4eb322dfd5d5b1457c791b55794202943a1113e794e04263d6a621764ed67e2466258328918989c6e5fa4db3b44448d211f410b8e72836051ab350555e0e9935044efee94043167ef9699d609b256157fa784499df874f4fd87cd4930251626ea30ece6cda6502b840055891992fd45a663637d7893c7799227d1cf798c4f693441b389a66a8ff3d719fe85a38819ed0d63ebef7833f7fd09329ce5feddc598a4415734fe",
  "dc2": "77a2b3455635668a750a83e4b008199ce97f3a393eabf378924c1f6aa7f47495d8f867ee839578f42f336889d74110699565b49a7d401aa03ba76d7c3e4b7215253395de8045472ca96522d1abc84dc92d2f06a311090d5cf2c5bafadd20c423a00eba3e014e09603f0ecc99b4c7d352faaf26daabaf32eb79db6e2219d637e4654e3843bb9bf4cf5faab5e8c695ae8ea772d7f3a833f5ecb82a7e56e3d5ef2a45c5b66a3c703faadeb47b5f34a7b4094631daa0c3fcc68687aea24d85aa92de5a2b2f850eb909a1636f6b8f99779c1008a7ec1567ce695e6cecebcf80fe941599818420a27d8be21af0212ee29873cb5dd564f617d3e97398dc6dd6a48020a2",
  "dc3": "918960b16aede0c2072401444fc7ca21ded550d5e7f3c41ad7747ede3dee1fa05beccd50b8a40301ddbe8ab75e530eaab57d08436df7d93e1320e716122566f458e4f7881c4c4d67786ccebbb5064f6f200fa09eebdcb1692c6a1689951ff5af8e447d2927ab4b26089ae6aa4dd07699dda5fd06d4c316d4289a7aab98a7ab8e49eb16b28f9e1c2a6c2a76e03563e10a97ccf8a66843e8250aed196d0eb811942dd36bf379bae50a19aa4335cbd0cee6c7435c4e34c38c9e36ee823d63474d8d042665a211fd22cfd1b310e3ec2ef54b7ffd4805096882c4272ae2c6fd8a385ec0da6b98401c390aca036afda4ac5587ca65bc9d68c107f75d5327e1221dcd97",
  "dc4": "7cb3c5756a55decb39fee8fd4f2cebee677b814d7bf7fd8e6996db61e640e150eeeda42bb3983e05d7c60aff8edb93208ca07005102c10b65ded1c15e02723226122c15b2bf0ee13f72479c5f491bb1a0deec1a78fa96629df5316d157fd004a06f8417ba03bce2eedacd875ef27295363e3de01631525ef4978d7fcd4bec7f3c53b32892ff97fd3c1d4fe0afc7b1f3e2790097636a7d28d4785ea058c9593140b3500d0b3d78b7efb8575bfa14c235a217b7888a619be577ec6efad6c6abadf2b1feb1931be16df21589e949ec114796f119208080e79a6fd2f9d81dd9a3144bb565757f6f48aa65ad1a8599bac75ff680a840363a81f19125c142defca1dce",
  "dc5": "85bd0134705fe4fbd10766a6e5a339870c21d43db8ebd0a679589a9acd9c8096558004830038ab072a5aa38c28e45c14e037e78354801ca00fdedc0203fa655d4cd5571e7bedd9511d3ba3f5a6b860f872ca8b690ee79d2a1a10ac0ad2d2ae5c5f5048cee2b150a4fb83510711d13da4c896c8aab75bf7a3290273639e85e0ed57023dc838cbf9c7e0051a549746fea9423e76296280e8c39f4a0bd6a712a10a2f59fa46f0b60c309981f4369e20aaaaf4a0278c7c150e01b70149eabc3d26a4db9bd2f018a63f733a93a790e946c10ac654c3ac4e1a2fed5f65202e6f8e016965e0f7a2a78560b2979daeb2f2b1eba8ea591a30ced0810576eec494f0053445",
  "dcId": 2,
  "banned": false,
  "dateUpdated": {
    "$date": "2025-04-12T13:06:18.021Z"
  },
  "firstName": "Igor",
  "lastName": "Tkachev",
  "messageCount": 235,
  "username": "tkachev_absent",
  "id": "7337511984",
  "historySpamBlocks": [
    {
      "spamBlockDate": "INFINITY",
      "spamBlockDays": 0
    },
    {
      "spamBlockDate": {
        "$date": "2024-12-25T12:58:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-01T07:44:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-07T07:11:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-02T13:31:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-06T11:12:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-21T09:19:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-27T07:41:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-04-12T07:54:00.000Z"
      },
      "spamBlockDays": 3
    }
  ],
  "remainingTime": {
    "$date": "2025-04-09T09:48:08.328Z"
  },
  "nextApiId": 2496,
  "twoFa": false,
  "twoFaDate": {
    "$date": "2025-04-10T11:29:44.479Z"
  },
  "automaticCheckDate": {
    "$date": "2025-04-12T13:06:18.021Z"
  },
  "lazyCheckDate": {
    "$date": "2025-04-12T09:21:08.341Z"
  }
},
{
  "_id": {
    "$oid": "662774c5bc2f422065683ad7"
  },
  "accountId": "afec3bbd-3c48-47ba-bf40-acb8333947e2-25906019-uk-test-50",
  "dc1": "bbeb3a91029671711fad71f7ff17b9cbe4aac8a7fb061c80cd9adde19323db000810dda3f620ce72eb7b0d68058eb72150b33b52eb574254246295c9edf2b3237d1e7e1bdee4d17fdd14beb8bda2171f35777f9289b6c58aac494bef17b03bada09943b361cf57749f2a2948a3947af364dbd25bc018c7205dd1e60e8cbb8b526d16dadece9162d8f334ff7c18b8179d20f8fedbf4b674ca799a3006c52d92d4805a225f13c2711c26895de43f200af4f25df5ea2a29b1b33315ce36401c36f0c012e845356bac0a23f545c720f82a69c6694607f23eb67cfaa03df9eb94c696fe05abd694069349df2e5263048ee25b6fbe645b5447dc369086b4565f761f7d",
  "dc2": "60392ae34e542896139aeb8f227722cadf5aa6e5c96c260663759270d4f462439824f4d5940f64068568261a7901004361d46ab50800d14bd6beabd0af543040be44c830e669f79ba4bbb992ba662183fc8217ec4a62586d27640807f86506617b561b2b197c545ef2188bd4df566d0fde28261a418741ead4360feaa00fbc108db714c920a003e3775b297dca6ba1f43b4e720fc891d2b840a172391f72e54420ab7583140867866637ba97616c8d2f9401e69f199811d49990faf79adc722d2283ad411462bc5dedf9578966268427f2f42298c25ebf812aaa49eabfcd7d7ab42c984e4a1fe06a9f767c75d54eaf47a557d9b230fbac744f4c00789f369d54",
  "dc3": "44ec680b81907bd549c0faccce3428efbad37c176dcbf1d329309f5726c25a5bff1f1b5e3f0a0a4958ce81a4f96cf1164ac69b80e249934aeb62f1e2217f51e4504e2c8290635f5e323911f40c70735d018c99e56af891399db579ecf3fcdfb9716e3db1ec77000c91eae368e42fdcd753995d1f8d86f23834d6774892b7363c949f38b92b1a1ace9e4b20e9c6759d6c237c3bbc2893ffff10793d9bbe4e37e60173d68b4147507f0c1bed2f25679cea0e0f846578d8fb0833b50b9a4fb3f235bb3a051ad6e4cb0752ef8bd92d43a081777023b34ae0c76631cbc92eb8f9d53580605c1ee0ae2c2dc0ad36d34f708eb381c38c6553355756d1e3eac81607fd12",
  "dc4": "18c8f39926c6fff8c347a0fdf52906327458a7144f35279924a220d4058118e4c24b9bd3047efd61cb0e2d9b983732d232a2010a4c19c893b206db89f10d3c0d13ed674acbb591b9aa86deadddb378497f80deb81b7794db107bf4045b54fe9157a984ac207573a89f7ad319978d42a9845818cb29f975438def1383c1e4ae79788518c0b11c251c74334f2c3bb269b4a7838f6b7c17b51bb8c23a9d492139c56ac1ef59ea846b1799513505cb0c4630b8c8d2d025e69adff5ee5f53c065542242e100c135fd42f9717d58d036ac6e48481615879d0dee23b5c73e869723859fb559d63440776b8e123bebe50367f65c137e4cb80958132070fcafe2be78a476",
  "dc5": "a28bfceee40589d858948e8893f817a5547c3336ec26c55e18378e2bb222d036d04af5df76c82d9658c3d3dde36fad33b4b9b39406cc55ad5842ebb0019ebdc08372639b563e07196613dc3636c0256d031646a4c0d31e66820f9557e04d7927701a1abdf5bd587c40af6fcb30f50fb5fd6a73847b9f13e71ba6b8b7477074e1892441b94b671bd07c7dcb078948de92254c73e73d496df3ff10fd6f41e17d9de617ab87006d43b1d9c356c96232ce7be248225b07c6b5f48ff5a915a6dbed0f94973164e22c05c63b478c9f9982d15ada9f8e3526eea0b6f4229016938f9801552217a3764ff65b11b6e6989230fe3c6ff414dc1e38c82909771ba18233f6ca",
  "dcId": 2,
  "dateUpdated": {
    "$date": "2025-04-12T12:28:14.872Z"
  },
  "banned": false,
  "firstName": "Anton",
  "lastName": "Chugunov",
  "messageCount": 372,
  "username": "chugunov_elderly",
  "reason": null,
  "stopped": false,
  "id": "5615208579",
  "remainingTime": {
    "$date": "2025-04-11T14:31:12.588Z"
  },
  "spamInitDate": null,
  "historySpamBlocks": [
    {
      "spamBlockDate": {
        "$date": "2024-12-21T12:24:00.000Z"
      },
      "spamBlockDays": 21
    },
    {
      "spamBlockDate": {
        "$date": "2025-01-22T09:58:00.000Z"
      },
      "spamBlockDays": 30
    },
    {
      "spamBlockDate": {
        "$date": "2025-01-25T08:00:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-06T10:52:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-15T07:38:00.000Z"
      },
      "spamBlockDays": 7
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-15T05:14:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-26T05:05:00.000Z"
      },
      "spamBlockDays": 7
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-20T13:48:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-24T12:33:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-03T13:06:00.000Z"
      },
      "spamBlockDays": 7
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-28T12:08:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-08T05:52:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-08T14:52:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-17T05:23:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-24T09:57:00.000Z"
      },
      "spamBlockDays": 7
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-23T05:01:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-25T07:27:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-28T13:27:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-04-07T10:39:00.000Z"
      },
      "spamBlockDays": 7
    },
    {
      "spamBlockDate": {
        "$date": "2025-05-08T08:11:00.000Z"
      },
      "spamBlockDays": 30
    },
    {
      "spamBlockDate": {
        "$date": "2025-04-13T02:13:00.000Z"
      },
      "spamBlockDays": 1
    }
  ],
  "nextApiId": 2496,
  "twoFa": false,
  "twoFaDate": {
    "$date": "2025-04-10T12:17:50.884Z"
  },
  "automaticCheckDate": {
    "$date": "2025-04-12T12:28:14.871Z"
  },
  "lazyCheckDate": {
    "$date": "2025-04-12T10:13:13.252Z"
  }
},
{
  "_id": {
    "$oid": "662bd520bc2f422065c5f099"
  },
  "accountId": "1713902110-rus-support",
  "dc1": "34aa57edda985b1e075d3055f73086cce66f39ca9ed72b696c6e445ca43293957392d0f1a42b26eaba8d5953efd798d3f999695a4c9689a85c32f419ba6e8ea3d04bfe5a8232b93f5aef5fad061f502bba89ae7b17ca3332740968b8fd12a51265f9b945aa93c98d133959d9b17f39aa6021f52db5a76b7bcab7561435960b8f974531a93469c1829bf3614cf661adf5f264d6e8d8e614abc4d3211383fdf072cd4065e8a942e031a1039a882c794534f19235d493f174d9c4de40b03174bab31fac96d6587d03c5d805c2e4cf6e20546cef28a8ec0ffe36b6e704016c0143d3f02d1eb8b8aff66fea256c5fed01e20cf52f6eddf1888eb1fa107b2a4fb421b1",
  "dc2": "53d219b4e52a558d6fc1fcf0a9260ce883ee975f97b7a806ebeb11a8cc342cb5d9ff639bfb375dca3e5d55c0152ec6595632c81ef280749841e3100d9150bb6ca94f877b9eb171d3f410624a080cf82852995c0659fc0251aeb6d2f93fc5af731e34bdf645890f91d818c1a677c3f1c953bb0f22c13ad00e90955679bcbf5305fa9d0f69fe89d3cffca2149a42701c77a177b86005ed24f78dd897d5f6ecdb6b473b7cdcdbbc0ef524eddd7299d49f7ef78d59717e7338ffa8b5aff2cf1fb3a6b2eccf189fe477e7f86c6debdf35f98c0e677b50dba9622e1fa366a741cdac39b74afd53ac81c619d0f5c23a993ea9e03856441bd3437b3e20b96c156a20e84b",
  "dc3": "886fa3371965681169472fa301f782070c2f4d06984b718ac92cf08fe0fe32c1695c5dfed4b8aa379573ecaf2fd7379a900ed59625838f0acdcbe5a834aa7d31416de5dc0e5d70721f22976d5f674b1769aaeb6f1ddea9d63784116d4de5652b784bf487f0e704ee4158ffb555e8e515382b8d9e18a6d3665b4d12da428f758d0d4300aa8b1ed4dd48e6fabd8928600deadbcd797961acd683f7a7acbe83bd36f7387223e31b819c4d232e1ce84b6cac38799da7867ea3d39865e6ebb0064c44830d8a80cde4a4956782f15a0dc3d17a076b74c58d621f0451922cabcbeaa3ca638e9a15d205501376d890b8ace948508b59d429ac384ee911cac58d51f32b86",
  "dcId": 2,
  "dateUpdated": {
    "$date": "2025-04-12T13:04:08.922Z"
  },
  "banned": false,
  "firstName": "Timofey",
  "lastName": "Ivanov",
  "messageCount": 386,
  "username": "ivanov_blush",
  "reason": null,
  "stopped": false,
  "id": "7098763398",
  "remainingTime": {
    "$date": "2025-04-11T16:18:35.359Z"
  },
  "spamInitDate": null,
  "historySpamBlocks": [
    {
      "spamBlockDate": {
        "$date": "2024-12-10T10:40:00.000Z"
      },
      "spamBlockDays": 10
    },
    {
      "spamBlockDate": {
        "$date": "2025-01-10T10:56:00.000Z"
      },
      "spamBlockDays": 30
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-11T09:37:00.000Z"
      },
      "spamBlockDays": 30
    },
    {
      "spamBlockDate": {
        "$date": "2025-01-22T10:52:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-01-23T09:21:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-01-23T12:27:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-01-24T15:07:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-01-31T00:47:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-01-29T08:02:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-02T06:47:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-09T06:59:00.000Z"
      },
      "spamBlockDays": 7
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-05T11:27:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-10T05:42:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-09T05:04:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-11T12:11:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-12T05:27:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-15T06:36:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-13T13:49:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-16T17:52:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-18T08:26:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-19T11:12:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-20T15:02:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-24T09:41:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-25T10:48:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-28T07:31:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-07T07:52:00.000Z"
      },
      "spamBlockDays": 7
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-04T10:09:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-05T08:46:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-05T17:49:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-09T08:54:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-04-02T01:46:00.000Z"
      },
      "spamBlockDays": 7
    },
    {
      "spamBlockDate": {
        "$date": "2025-05-10T14:00:00.000Z"
      },
      "spamBlockDays": 30
    }
  ],
  "nextApiId": 2496,
  "twoFa": false,
  "twoFaDate": {
    "$date": "2025-04-10T10:01:46.129Z"
  },
  "automaticCheckDate": {
    "$date": "2025-04-12T13:04:08.922Z"
  },
  "lazyCheckDate": {
    "$date": "2025-04-12T10:12:58.640Z"
  }
},
{
  "_id": {
    "$oid": "662bd521bc2f422065c5f177"
  },
  "accountId": "1713861275-rus-support",
  "dc1": "69f2f1bef118a726b9ff061aea6e23969fc130713c60f9551f294f8d3f084d31365d41ac5db5de118aa538e7646908bd5b004d772d9126307b06adf6ebf964e0dadd44dd60d543b9772a2a12258120287304e3461a70f8b9414e5c382cb019efa8a87486ee7fbfff6f8a03050bad541c0fb699e1b6554fadf5ffa2552f61992316000787b106d2d44b36250c8067fccf3eb5882111dd798a74b2c1b5dcddcb8f64216a9818d5ac2a12b99af9bb5b1b4992964e2a8ba61f2c33a197ca9496abf1b5e215c977279f375bf09421c46504ba73170bddfce13e6c25e7c7a7fe8d67f9ebbda6d78088d0d7d82d1a25c5abe7312263e9382469ba5f8c600c710ba31474",
  "dc2": "3f92e811a911ff0441cbe00f222f90f56f31eba2a4c6bb4ce1037350e58f139bb53f648462ba8f535128f55f942cea234f3cc9d330caddefa130680b8c20e65dab91522681abdec9a66eb4fdccf047136acbb65bd8ee500f8b897719b683ba3099115ae802a41c29c95622bdca54fa99a4b62805c558a55af721b10d89239593193364df1bbabcfef34e43b694da3616f9f50ee1f10e9503805a28918b1b3120c83bbb5a34d0a00bbbad06fb8460ee4a12b650ba03b158dfc9216ad01330706495aa3c94e12de6ccf987a423cb4c6f692dee8d7652b4f270d99b842387d7f842c8366f815b7b727433808a499164ad6672eb66a5ee206d046fcfefa3f39df5da",
  "dc3": "39221f8e04e3307cea8c877614078602e83250f204e802e32d239984eeed94d2fc75217e3a695721dad0ce6b50954eb9ec517a059e6e81e477227be30a341848b8dee57b24f174e456f8d3c6c9a68a2f0f05301defcb6f8e51f90db65fb808c61581fb99e10c47f08f5bae66271f4faa316e54f1c2da252553021eff99970dade4ffa7e608c5eb2e5d86388d4e38a7a73387404fb139fb18db15bdfcb5b283a2f6e8c62b942be5123fb9f238c6c82171878ba03601081196d9f02f4275c65f34088d8797def8de070a8bcceb785742159d8752b2d2e991b924c3357b87091cfb5d6739b374a1ea6207fbc222fffc2167ce24ac7b1b4348380b2463ede92d7565",
  "dc4": "55348364dc2e9181e1bd0da4ca305b977684ab411487f53769a9acd45790a55ae4b31c4a334ee9ce5e1d9209c18e20281905f1b2f6b60e2a1dd54b8d5d8f0030f9a14f267fe40b7a7bfa1c95ef991fd3f660393710a370e1e280f881fbe2d9aab591f29acc0e86b4fbad1af5643abef70ed9b89a7a7774932fad30c7b7aaaa7037f289cb5657aab4a14c1f618ba6b0c4606e09deae5f163437cf4a2e3a2a0d393f0b36651fa751d4d57d9052fe2d7e94f9503e8121eae77d3c47285cb698c525e78e67e58c34bbb22c7ea20d5f7fcb8715df932fa1b726659dcaa20787f3b5058845e89936b6431f70f44655d0b59f44425b13bc2af4e3ae404f808ca71922a6",
  "dcId": 2,
  "dateUpdated": {
    "$date": "2025-04-12T12:14:06.280Z"
  },
  "banned": false,
  "firstName": "Kirill",
  "lastName": "Makarov",
  "messageCount": 263,
  "username": "makarov_practical",
  "reason": null,
  "stopped": false,
  "id": "7000604865",
  "remainingTime": {
    "$date": "2025-04-11T16:43:29.566Z"
  },
  "spamInitDate": null,
  "historySpamBlocks": [
    {
      "spamBlockDate": "INFINITY",
      "spamBlockDays": 0
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-03T15:55:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-25T06:08:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-10T09:31:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-18T07:32:00.000Z"
      },
      "spamBlockDays": 7
    },
    {
      "spamBlockDate": {
        "$date": "2025-05-01T08:31:00.000Z"
      },
      "spamBlockDays": 30
    },
    {
      "spamBlockDate": {
        "$date": "2025-04-11T05:48:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-04-14T13:24:00.000Z"
      },
      "spamBlockDays": 3
    }
  ],
  "nextApiId": 2496,
  "twoFa": false,
  "twoFaDate": {
    "$date": "2025-04-10T11:29:21.380Z"
  },
  "automaticCheckDate": {
    "$date": "2025-04-12T12:14:06.280Z"
  },
  "lazyCheckDate": {
    "$date": "2025-04-12T10:08:23.771Z"
  }
},
{
  "_id": {
    "$oid": "662bd522bc2f422065c5f23e"
  },
  "accountId": "1713884412-rus-support",
  "dc1": "1dc58d131e63c266b02b584431cff09b8a7214c601555dd488313263ff803ebdd54aa0016ba6519eb8c400442669821836335b1914ad6187cd9fcda1a24c1a8d30f02359fd748ab21bd7142a6bcc4b416043788db7805c401ef9dd5732d88b218acb0837cb431c9ae7881dfe115700c1d6236687ef570482a50f9b15083a08697123867c2ccbceb17755b10aa97c28b65af9c48ed5f7f89165bd06516b7ded81ad13b14f746c9958ef1a483a584dee2656d982b49bee4efa22ca5fb3b037dcf95983bd07abaca7056453608b0577553caf9446cd09d52f386ea3e13548982891046ef5b0e5a0a6597bf2bb1fc2c7577ed508a5bede1f0ecbf7c48149e705e188",
  "dc2": "74dddc0db04324ebf4614c0cac926a98263f5c9687e7091b6802bf9077b7984ba5a59c14f7378322068de84915d5fcfbe1b4fc2199f7defa0d56b6a2632a03fafea161c8c5713c5e67e0af996cbae8df4be2dcd55df2a7f62bd25e37f0f2504384aa8cefbdba6284a380b578fdcb71b9a38d3d22326e577e53a9499673f0db092c809ba5d0687dd1d5f70ff4399cc3912a5e29fa5de05f6310839d300fe430f9149774578b2d81c5297fd0ffac33b1881f6d1b74f3a378f06bea05bf490611b822ecb6a774888bb106bec9b9fd89757e3b666aebf6bfc25f9a68ca941e86e29c0ef83f8d2940fe21738523fdda05f091dd2ee5f479186d80d6d720e315513bb0",
  "dc3": "a17291731af0c631deb4e85f715d5d4fc8c545457fd82039c97df42c704cfef719666dc2790d4eb619fa45bb95b53f73b76b5e67d6c27db3f1035f5bdc8cc2cc768d004124241b9eb40440f01931cf90aa1c8022f41c1060b81e873e6513a16cff219da12955cfb9db76769c24b7a02abed9bfa46cf241748a765219407efdf5e036386994ebc35ad6d55a41fc976182c371a4f209e73afa20ee5c62eda05caeef6c09721788ca35d1711388d9da1119c649d592bfd2b2f7f1db0a6f819c3e0f2d886e4f112615fb40a4050944d5b7118b5b47f6174dd6a503ed65127b5854bc89ec69499c0b32458dc0cf7bb4b9906391fe36519c23cab5c40a35d9c5821c83",
  "dc4": "c445c7e7d1e614eceeecdca8a1859ca2d8424cbfbe4838d7c2212dbc517a40257114ac13bac9a8a2bc4bda85d2149fe1a22a5eadf142a78ae431794718cde01f0e4407a98108c0782b6982524d4f1e0bd533cf6310279eaf4f302d49a78cba63ef22eb69d728f5b56a08ba40146dc68221e67f329581559a2eedec4419561186c2eda85ed9e98d60d02f0e94bc0d91538a721fb2afc6eea4763c738d736dce2936fb2376c286fdb16c5b3cf78890d4ab4085a06108a2c7cbec01429d704736cfffeeb36258c5ed4f516e8d1144b6cbc24a2531b2fd585cb4c8e30b21228a158ee05a8e4cffe7227b3053a125980eb61ce8e202d330019e4000cff64a0fc890fe",
  "dcId": 2,
  "dateUpdated": {
    "$date": "2025-04-12T12:58:13.954Z"
  },
  "banned": false,
  "firstName": "Alexey",
  "lastName": "Soloviev",
  "messageCount": 259,
  "username": "soloviev_ruling",
  "reason": null,
  "stopped": false,
  "id": "6829248779",
  "remainingTime": {
    "$date": "2025-04-12T07:00:11.065Z"
  },
  "spamInitDate": null,
  "historySpamBlocks": [
    {
      "spamBlockDate": {
        "$date": "2024-12-21T14:37:00.000Z"
      },
      "spamBlockDays": 21
    },
    {
      "spamBlockDate": {
        "$date": "2025-01-22T12:29:00.000Z"
      },
      "spamBlockDays": 30
    },
    {
      "spamBlockDate": {
        "$date": "2025-01-21T10:46:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-01-22T13:27:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-01-24T09:52:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-01-25T05:15:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-01-27T10:56:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-04T05:04:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-04T10:19:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": "INFINITY",
      "spamBlockDays": 0
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-13T13:15:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-14T09:27:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-16T09:25:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-18T20:06:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-23T10:38:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-03T12:51:00.000Z"
      },
      "spamBlockDays": 7
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-01T11:29:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-09T14:34:00.000Z"
      },
      "spamBlockDays": 7
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-05T06:34:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-07T09:02:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-08T14:38:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-11T08:19:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-13T13:38:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-20T13:53:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-21T18:56:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-22T13:47:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-31T12:38:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-04-08T12:12:00.000Z"
      },
      "spamBlockDays": 7
    },
    {
      "spamBlockDate": {
        "$date": "2025-04-08T11:55:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-04-10T10:43:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-04-13T12:41:00.000Z"
      },
      "spamBlockDays": 3
    }
  ],
  "nextApiId": 2496,
  "twoFa": false,
  "twoFaDate": {
    "$date": "2025-04-10T12:17:55.052Z"
  },
  "automaticCheckDate": {
    "$date": "2025-04-12T12:58:13.954Z"
  },
  "lazyCheckDate": {
    "$date": "2025-04-12T11:47:49.256Z"
  }
},
{
  "_id": {
    "$oid": "662bd523bc2f422065c5f2ac"
  },
  "accountId": "1713884519-rus-support",
  "dc1": "753739ae4a51a5a41933d95fce0ca9f9fc7ca679a21a7f4974c6adcd239c93269aa675afbb06ca3c9eb73d337206e14403bfd30dbf88ba2b4315b18e8a24b5f5839740b9ea43d41e46c60d6652055174cbf3096c3d045fbbabf76af65edcdc0458433e9ad0fe9ceca113945a35be64a58d51531e651de4169d142be2e15b36a9df5beb0c2d8af9d6eee45376c71f256708b9f78a45fbfbe214b168d68ab1e1f74d4bbea405074e86b646cc9d8acbd7de66efb14a602d3db093729741656da96d7ff7cce580850a4317bac455d3b4ecd3b5c0bee80dc3f2f57d164fce76e6b65d4dfd63f7f0cff7c3f56f2c24b1d4652c42d4cfd86b8ac4c4578b2654152c6249",
  "dc2": "7c1915e8eb418420857fc1f92ee5b182808735a89b96d1e296f1429d9140b2539027c1bd0c4f98711827c230560a6d56bb1ed78b648aec6c53b1ee43161f9eebab59a9faf97e27b4fbe57b1d56c58e5f45ae4358bc0d4012ab06cd7c5fdc94f232bf712623b61eb4bdaff231e901ce141402246395976000b6f34afa63ed3260a1b0148d636f6691bb0de8f19b9009e829bf5c6504b7aceccc40238515d7a56e19490e0019bf42028831225019b1b969a8dc3be0539b7767e740cfce52f371f9b573c87f439bbfb71c6e45b2a9dab7544df4589bc3bf3d85806066401ecc2a28bcfd583610ac63e173fe18111e3ad897b13cb7afbe22e8bf2af8e645f59a9741",
  "dc3": "3173f7b95b6447f4a5e240c44d4c009999581a3a77543effb0af835cd8ef133e415d5d88d86e34a6e16f6e726cbab7aaaf030cbfcc38e0b81b96e257e1971506eed0a07f8418cfc9280d6cf3bba133eb31bfd6a71a1d4e4c69053748c3cb8eb171c2855c54ed4510fcd5c529a4962bcce83d9fea1f505fe8bef11f5f3e3c915275d45d0dbe1c52d0c50108f9930faf59ceb89bc168c601ff3e478148caf21e5eae59a368243590221a372c2b91c607eb4260665193a43cd481cc0290ae6ee6e269157301c59de72bc700ad31d2d4ceafb2da6c4544afabb3690f4d0d0bdaccad7d99bd5c55ec05db7b634be1c7a3705dbbde456d0f7aafe0f5636a55e62342d7",
  "dc4": "1e8529ed334caa3d5caaeee838feba8b1d90b73d1a557bf08d543277aa36fa38b79d7581a2bf21a4398a4d0104b5d1235258ea21f8b3c48fc1deffdc21211cf894a25871cf2fe8d0c5ead1cbafada734d5f0ebed7f8377149fef1f6b0a74f4728ffbcf838283825b5263ce74e18b7ef7b4b588bf2d87311f22a9b8939aaa7ce8d9138826aa94768f0e42cffdd8e23acc99a0cd8115fcc9402b972b45dc3fbb0ac9daac1f0be0be2c348878fa25f6e6ae87152bc9fbde899209b5ec36df253b2352c851dcaa8021bdbc066ea7c81e8c1e969cb525e9d4dc422e56c11f0231d6b255e3eb9942d60e19a53d2244050aa18e117165f25dcc2b108f991ca0cb391d2a",
  "dc5": "09bb0193b79e45e98ef6dd6786b97e7642efc6b2d972368ec3037abfd82c02d3e3c31c48a9f6c16f9f2579a1805d162ec9107a9c8a41b2f08483e09060797ae8133a4cc9b354d2cb3e92094fcbeb46213097e18db626d48b2704421fac8788a69a089502c50f9d0e8cf92779b3a1810f20b1eae63f1d550348a7456f2e7ad4abb5db6bd9ac1cf717411cdea2135a8eaf5532abf3f50a2fd69c1a82a61242579d81e6326e83ad397a2ceec1bd752aaed2edc7c183300ef8542f8f3f825d3484c4764795c353f1816ae068f41c9f38b56468017f714bd7185eb95906b74846e3088743b23dd0d4b518a11fe2af53c981659a5b503fc70daaa6d7c164b2e8a0153b",
  "dcId": 2,
  "dateUpdated": {
    "$date": "2025-04-12T12:30:14.789Z"
  },
  "banned": false,
  "firstName": "Egor",
  "lastName": "Zakharov",
  "messageCount": 246,
  "username": "zakharov_powerful",
  "reason": null,
  "stopped": false,
  "id": "7068226172",
  "remainingTime": {
    "$date": "2025-04-12T07:04:17.648Z"
  },
  "spamInitDate": null,
  "historySpamBlocks": [
    {
      "spamBlockDate": {
        "$date": "2024-12-25T10:01:00.000Z"
      },
      "spamBlockDays": 25
    },
    {
      "spamBlockDate": {
        "$date": "2025-01-24T13:26:00.000Z"
      },
      "spamBlockDays": 30
    },
    {
      "spamBlockDate": {
        "$date": "2025-01-20T09:05:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-01-24T12:36:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-01-25T13:44:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-01-30T17:03:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-07T08:16:00.000Z"
      },
      "spamBlockDays": 7
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-11T12:08:00.000Z"
      },
      "spamBlockDays": 30
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-12T03:23:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-20T12:23:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-27T15:37:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-07T06:12:00.000Z"
      },
      "spamBlockDays": 7
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-09T06:25:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-11T13:58:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-14T14:25:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-22T05:40:00.000Z"
      },
      "spamBlockDays": 7
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-19T11:12:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-26T05:48:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-29T09:55:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-04-11T13:06:00.000Z"
      },
      "spamBlockDays": 1
    }
  ],
  "nextApiId": 2496,
  "twoFa": false,
  "twoFaDate": {
    "$date": "2025-04-10T13:49:26.019Z"
  },
  "automaticCheckDate": {
    "$date": "2025-04-12T12:30:14.789Z"
  },
  "lazyCheckDate": {
    "$date": "2025-04-12T11:50:49.292Z"
  }
},
{
  "_id": {
    "$oid": "662bd523bc2f422065c5f2f2"
  },
  "accountId": "1713884611-rus-support",
  "dc1": "540bc02d927f685266b0286cffdceddd26af3419e9ad07b1441c8874ce5be8b639b38748220c3fe19c0b0902c618da9c8beec3aba805e1720a18da5125fc73437eb784b5b3e5ad43aea9e8c99a5fc1322de7b4802a8fe4f66593473247bdf82dc36d78e0b3a66939c46922079b536d81609bdd2411b64ad35fd38ae3049ec49f2450400ea11e3b5fe7f1702c554c13d97b2b1fb7f66cb5ef9e34c6d22a4d050c803db0bdbe9f76b1db367ef0225464942251f83f77b2e591da747490e00c267a8eb2fe9f357c1acead9bac8bf2838979759278cd8f8fa089334e86fc86ad06257ad08477b387080aa79d6ef83e231cafbe44b08c917de74143dd874b796d79e1",
  "dc2": "3c910e5377ffe14399245d029a74a098c8ecbc50ed50ad61837955c1af0d54e76e007ea0d1a522c2d8d184545076848762c021953547fc97421e91be8851c174975e9642b3ba1b185a05be86275f3731487c8a913cedbf54da9dbd4f33a641a84388677d84359dac1a19a9e8324618ba1ceee68bedfa13906681280d90c099126fa0833b7d6e435c637d7825ddea7e01ff641e990218d80c7f6625e20f8442761c9d7a99aa46e8cafea513e6f225ec31203d8f0dbd1822669ead23c15323a28cfa27c4dfda23f99ded0e559287aa9416961c88b1b2f64a1317ee0ad23580d92c22ddd8a4fe254412b54e6bb5706600a66af9e9b3fed92bcaa9e84b08d304f4f5",
  "dcId": 2,
  "dateUpdated": {
    "$date": "2025-04-12T12:21:14.798Z"
  },
  "banned": false,
  "firstName": "Vadim",
  "lastName": "Ermakov",
  "messageCount": 709,
  "username": "ermakov_standard",
  "reason": null,
  "stopped": false,
  "id": "7085817362",
  "remainingTime": {
    "$date": "2025-04-12T07:18:01.313Z"
  },
  "spamInitDate": null,
  "historySpamBlocks": [
    {
      "spamBlockDate": {
        "$date": "2024-12-09T14:59:00.000Z"
      },
      "spamBlockDays": 7
    },
    {
      "spamBlockDate": {
        "$date": "2025-01-10T13:42:00.000Z"
      },
      "spamBlockDays": 30
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-11T09:42:00.000Z"
      },
      "spamBlockDays": 30
    },
    {
      "spamBlockDate": {
        "$date": "2025-01-20T12:39:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-01-25T11:45:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-04T08:09:00.000Z"
      },
      "spamBlockDays": 7
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-02T13:20:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-05T14:04:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-14T07:59:00.000Z"
      },
      "spamBlockDays": 7
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-17T05:43:00.000Z"
      },
      "spamBlockDays": 30
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-20T15:49:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-27T10:02:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-27T13:34:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-06T13:59:00.000Z"
      },
      "spamBlockDays": 7
    },
    {
      "spamBlockDate": {
        "$date": "2025-04-06T12:33:00.000Z"
      },
      "spamBlockDays": 30
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-20T07:23:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-21T07:37:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-24T11:46:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-31T15:53:00.000Z"
      },
      "spamBlockDays": 7
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-29T06:18:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-04-02T05:31:00.000Z"
      },
      "spamBlockDays": 1
    }
  ],
  "nextApiId": 2496,
  "twoFa": false,
  "twoFaDate": {
    "$date": "2025-04-10T11:29:21.384Z"
  },
  "automaticCheckDate": {
    "$date": "2025-04-12T12:21:14.798Z"
  },
  "lazyCheckDate": {
    "$date": "2025-04-12T11:52:40.792Z"
  }
},
{
  "_id": {
    "$oid": "662bd524bc2f422065c5f342"
  },
  "accountId": "1713884725-rus-support",
  "dc1": "580255a589a207bfae527c5ed183dbed3a96fbad411ade140b34300b787ebdc820885f67b927614e7bed9c2fb70f3be3f6a446d3ff61c824a6d23b205fa466c324f725d7cb11264f21841bad443856cded7a2490a7bd9af7dae8107e29b787e284e10dc66565a4f15b98aa78381127eec0709f10ab25eb80dd420affce8940f5a029464d6fac76bc509f15aaeb2ff876f9264cd2683f34c26dd2a35a29e1a7d8a062286cbcd140b1b370b59ebb5fbcdf322ca48bd1fcd7a4a5b8fad1189c69796c68edf6bfb09360d4d3b698957f37ddc3ed04d65abda3f84a5acf94a89af8ec9e697252eec5c123fed8d0c0e2342d34b1ff93d2b0cc2d494ff675b384a4cc95",
  "dc2": "5bc119c00bbcb81558541f51c28efe47c32e5d263760c4aa42e3b48371d8d2b031c39811c5c34d6aa814a07fac779936a40b7463fd645a961e6b6ab4fb2fa3ca040f5d2f1a3b6cf42baf65603605228e1d5edaee3b91198c61a7d52f0d06da3f8b6c267807da132c269250e74a97d252f65a571de327668c7f325f6f75526233dd772174c9bfe0afd66663737a3006f53d851290728836071581f9565c10d928e8f96fb34494b42b25a7313316f580ab5adc40ab15f683fe5b8bee04efd27f79f702e7217ce9ac618540d4eb77f266e249396a894f98c8339ddf799e0c7b9e5aa7f6bcf1af8a5f3a546047721f51de1e1b46caaf5a201669f76c5b15bbb789ef",
  "dc3": "3541850bc082da2312032fe09255992f5d04947d6e8b1d359e33f4510710df6561f4c7b4d4e19a2b7a345fefbf67d46f12656660409109edbd1c5a5035f9e521dbc6a4a53ac7553a05d2f6d3f4351da5871c6fd66372cedd0abd5eaf039f9cd081708a539948745876e2e1bb46703d18f04955e8cc96866788a49a0daa25fd7b9073ab245c8aac3460810905de07daabf862af67674e8897eabd2055a1d56b35b5a1e65d8e87d22424aa0d9d95fd2ce2fe792103c27b7f403322a5b42d1079481f7d2a96cd81f666d1423ef18173e035e1824a9f92392b02e68e0b4f89422495a9518cb1db677447705bf0e4aa04baf389f50891952089988e3e205b66e52c5a",
  "dc4": "aa85d3722ce6ce81eeced4768fa46a148d6dd5218f897f07134ea78a25a882b9f802974266dc679b0c5a6d0a2df40a2aecd3defcc3babcdf179f84508b7f99d7bd77a696229574cba8850b2e25b9a6665c45a87210224a8f9adc62d615c8705163f25f725c64e48ee4dd5a372a2fe21aea601057fa3d89951d1ecea0fb542d70b7cc6b697c3316cf9dd54a663b5bd49c0e7d4e073b5be98186df98ee1422ba0ad9b1a4bddd1260dc3c1ad465c5b25bf9e75c3dab71a9d478aaaf99f8629ef971380bc715f38f05de14b0c4a5872c9ad11f171edbe02006a23412f1a6d8c7d85cd2b0a3cd1f4db697c5f4dcb1b289e105f8724da030257916b57cf25457750547",
  "dc5": "bdf3666f299298c248ce39f519610d1838a8eff54417b40e130417908701e972920d98220a1bed1120c4a75e87e89cab08ff8d9b4443e0e4be98078afab93ab62ce364e724688a9903e6e379594fdf8f6c19e52dde6face1917bd4279f38363c4e9e9aa39409e1e80caa42dcdc1e13e2aee6bc76b3ba848378c25e38c20d999bd702f3b47d36397ad69a204f6e3cd7a239a891ea919e38b78500877dc05f0387bec050fa35e495ab5a503f383a196e06bc4ff706569e576396c56e1532f48684bb618aaaaeafc8f551f0e790ae159a8cd8b12981dd851cd6bbfbd407a206e4b1f424f044347ddb8b2f0ecfebdfe5c47f3decc179f5dfeec10e808cb229493e14",
  "dcId": 2,
  "dateUpdated": {
    "$date": "2025-04-12T13:03:13.843Z"
  },
  "banned": false,
  "firstName": "Ivan",
  "lastName": "Semenov",
  "messageCount": 228,
  "username": "semenov_patient",
  "reason": null,
  "stopped": false,
  "id": "6961293729",
  "remainingTime": {
    "$date": "2025-04-08T07:06:00.312Z"
  },
  "spamInitDate": null,
  "historySpamBlocks": [
    {
      "spamBlockDate": {
        "$date": "2025-01-02T07:26:00.000Z"
      },
      "spamBlockDays": 30
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-11T09:40:00.000Z"
      },
      "spamBlockDays": 30
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-19T07:34:00.000Z"
      },
      "spamBlockDays": 30
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-19T10:22:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-24T08:23:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-24T12:31:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-25T09:39:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-01T06:15:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-10T10:36:00.000Z"
      },
      "spamBlockDays": 7
    },
    {
      "spamBlockDate": {
        "$date": "2025-04-10T07:30:00.000Z"
      },
      "spamBlockDays": 30
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-22T07:17:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-27T14:26:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-28T14:50:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-04-05T07:07:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-04-15T05:11:00.000Z"
      },
      "spamBlockDays": 7
    }
  ],
  "nextApiId": 2496,
  "twoFa": false,
  "twoFaDate": {
    "$date": "2025-04-10T12:58:10.499Z"
  },
  "automaticCheckDate": {
    "$date": "2025-04-12T13:03:13.843Z"
  },
  "lazyCheckDate": {
    "$date": "2025-04-12T10:13:13.614Z"
  }
},
{
  "_id": {
    "$oid": "662bd526bc2f422065c5f490"
  },
  "accountId": "113084648-rus-support-after-zelenka",
  "dc1": "2f824d35fabea5bdb71b1218a653b67b717f85c5268370a21d8f19552ccf81f46ed71918b678a680274d6a2ce6c1ced26bdb6bef1c67f4742e44750000fd5a44e2a7a93426113275e137491ff492aaafdcf73b31d7a428a88810c3304518c83febc92af7509fab6034c4199e6f7920c4b743bd2b7bf8a6ddd5e674f83a07a3db65a342a3860df3f6b24c55223dbd145d69bcb4865e8b33da8e9aa71e96ac3003c34fc28c5f33849e83960d0ce01eba8efab02ab55eee8dd44777a2b4be5bfa4143c1b6aae1fafba3e73b67d5d18081543a2a07175fb4d2daa4ab865ee9a57a6ca5fcb8e63ef5086aa247645f3fd00e556729562bad449d240a0dd18540e0cbc2",
  "dc2": "a73d3d1d364a210572320e2e3ab22c87f82ff0c36c01f3f3123aa6f54229abbbf7ccf7266d39a3243f9cc3e32060a772a86fc6e9efd5cda9f9849287e56ca29f238929fe439b490ab879426e51c2a5342ac94bd69475f5573e7d4eb6136f5e92de56031205aa3ac526faf62549d948f8cdbac1e1f242468b5fcbc7a240e561d4e757d1bf0cdbeaa89afd00bb5d12a973d04390c5af62242e00a48a989cad89e125c57711b5412d23495c794d65917fd006ac97fd9c6455278027550bfdc0309308ee64c41320e40ba6a560f3a14d34fc17ca2101495ce6f61697da1963cc4217652edaf11f466a89bc2201652c09b99055417db7e79ce31d1bb4773483fa7d9d",
  "dc3": "7b454d3713b11fd60d71756ecb98c1ce5644f321b0155f8172aa1b44efeeb1fd96a6fa66eaa9400cf668e1454bc22caeda6176bcba98d27cf5190bee0328e357f976dc24fc64ab4032937d1bf981dc50d2a0e3d55c41a897fd9bc3faab3ea5b2b5fb6c6a0d145842bc7b0cad39f24c4f44bf307a44427abe50a7314e73d09dee3ac21099aa8aac6fb1b4d5802436e64587a723432d17b62ae6b5b13683048f1b3c5be8b4f457a537056e053fedbb688df9ce13a3a90173916ba73e37e560461bd5abf79a58ea1b8aa8630d23da07e39fce2c37d8e6f0c377872b13a7fb97a50fb3c24a1a3d50de835b7b4e132231474f5a1c7900d74a15f656ff1af17f6a2aad",
  "dc4": "7193229ce8ab4c69b852b2aa21987eea1b6f8d1c12cdf440bf6e53440f2b5ba81fde0105c599f098352cd15602fedba872e61cc2a17984a50169c35f4660ffd0e7764bc4106be5a589184e8b9802a75edabdadf461be67dc0af8807168575a6ff82774bd824f84e058a322a837f5486db48bc0432578ca85fd43582568fb7e9ac510041250b23929dc4d4bebe2cb31368f6ab6509efa3f7762c9108233a8cf91595b6df137ce3256848ee1bbe9c2a01c00df94573c7d1f02be06b5150122e4aa694b6e624ecc0fa498b340571b861ddeb5a73e47a796544b1d5a7cc9392d8e0703aa8a724ad223944220b12468d5c442de49da27cd88614f90a494f841836828",
  "dcId": 2,
  "dateUpdated": {
    "$date": "2025-04-12T12:27:21.343Z"
  },
  "banned": false,
  "firstName": "Denis",
  "lastName": "Belov",
  "messageCount": 522,
  "username": "belov_great",
  "reason": null,
  "stopped": false,
  "id": "6718665164",
  "remainingTime": {
    "$date": "2025-04-11T16:23:34.937Z"
  },
  "spamInitDate": null,
  "historySpamBlocks": [
    {
      "spamBlockDate": {
        "$date": "2024-12-13T14:19:00.000Z"
      },
      "spamBlockDays": 13
    },
    {
      "spamBlockDate": {
        "$date": "2025-01-18T05:17:00.000Z"
      },
      "spamBlockDays": 30
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-19T05:16:00.000Z"
      },
      "spamBlockDays": 30
    },
    {
      "spamBlockDate": {
        "$date": "2025-01-24T08:37:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-01-31T07:20:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-03T12:34:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-07T08:14:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-16T11:58:00.000Z"
      },
      "spamBlockDays": 7
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-12T06:00:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-17T08:04:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-26T06:36:00.000Z"
      },
      "spamBlockDays": 7
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-20T15:18:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-24T06:48:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-25T13:33:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-03T10:49:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-11T11:35:00.000Z"
      },
      "spamBlockDays": 7
    },
    {
      "spamBlockDate": {
        "$date": "2025-04-10T12:08:00.000Z"
      },
      "spamBlockDays": 30
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-21T11:26:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-25T16:25:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-30T11:45:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-04-07T06:11:00.000Z"
      },
      "spamBlockDays": 7
    },
    {
      "spamBlockDate": {
        "$date": "2025-05-07T16:28:00.000Z"
      },
      "spamBlockDays": 30
    },
    {
      "spamBlockDate": {
        "$date": "2025-04-11T09:32:00.000Z"
      },
      "spamBlockDays": 1
    }
  ],
  "nextApiId": 2496,
  "twoFa": false,
  "twoFaDate": {
    "$date": "2025-04-10T12:58:20.901Z"
  },
  "automaticCheckDate": {
    "$date": "2025-04-12T12:27:21.343Z"
  },
  "lazyCheckDate": {
    "$date": "2025-04-12T10:09:13.115Z"
  }
},
{
  "_id": {
    "$oid": "662bd526bc2f422065c5f4ca"
  },
  "accountId": "113084674-rus-support-after-zelenka",
  "dc1": "5c402284094651b44515c1f783fe0a89196991dca38ad7a3ab65dd18d3b9aa88a60402904730f17d79e1c008d41afb16536526669bea2bf57d2d0f571df810c5cf166ce084408050f73afef99dec201ffcb0d5b6f034a3671edcf5f1feab391ae096f0209b7c84c583565379e28d12fd0cb580fce049780763c6ddc5f0a065637e6ea19b80ad83f44e6f354e66d76496129e53173dd13ffefae019ba353e4638eb32abacb99a2eb88b94356adf9f283f395d64c75d818a7e0dfb6b85d17c813f3678a7d4b610786488d02d2cdf166a2fc3c96e94ed808470fead9dbe7109d30c4fd94d96c2ce36133a348027de24df8da4870994dc89714e56ba491306269dc4",
  "dc2": "a7469e4bc5fe956a0aeab8a546a8f890a88f7eaaaddd25415df2ed2deed0317db345b3567f856459868fab8bd4d60854b86081903459adac3bb8e0b98989bf096929642541ac221cae47afd57099b2e22177a2be792d6bd416eeefe26d982bf35d1f9d839530e6efddee53d3cc2e0349b9b2c4ab5cd1a09dbda505a731184c3bf0de9a97abb766f6dc0ee3388de67d7022973869b1578694f9ae1c0789890c711c2feb544911560aebe347c710cb8d88b6d3023f81559a43e718d68c5a38478320374d033db12686b4ae1fbd4f09b17747e9d7ed2eb6ec668569b78aee396e9d826e6a6fe324f19239e16fde7a374ffdd535d33184baff5cc4fdb6d6ad8c8b65",
  "dc3": "82fa8813d568bf798d70daa70a6e43683658e83989ef188a1495f399e8eab355031ed75bde731d808b9989bcda4bc51461218b01307fe79641829580559a36e118968f2b1f1d6f6012f3864baca11e42024cc9e20c0447ef224bf41e390b8487ea4a5e97c3f8744cc56c324f56bfb63870683656f63ec8e8775b495efe0a167d3df962f5a0c9808a388e1d34b3ea7ff34ac565bc7cbe495d2f49178b3460eea8b670bc05383ef23dce986aafa5d2a5f1f590b16d6f909d37eace44d9adb9c9f074dd41e58b2b32058815cb42db0692b10cd1a8d74a32f2d0f4222bbfeccac1e6d4eef3dad9d4c62aad02a0bea7bc3c45112f02265aee2a8f034c65e025124b0e",
  "dc4": "70ce271710c3722618da1a8fb958d6c15eeb51d685025002d271674fc745a8f48a735951a960858ea84239acb15e54712ceff559cfe194c68bcf941f7fa75e1f493704f55fdd39e95cf49d0a8beb4dd991897020f250d8d078e61c260534a88039ff2adbd83f574780ba0e69fbc16e11fb7c27e2bd59d66e9152f92c034d4bd3d76b451e412e462da749b0e2d4d00a4021eacb2846ac4262a5edbc87c3c428628eefc3f7bdfe5e15c3961175d703ced0e8ac1527e8e63fbc7d207aaad8a1d23c2e8b3786b14845c5223f536772571a135b5f89fc179e12622b93e2bb079ad026b407d29a45180d8f401c4ee1d887dc525c62ddee9122b512ebab88b2375c4b45",
  "dcId": 2,
  "dateUpdated": {
    "$date": "2025-04-12T13:06:08.856Z"
  },
  "banned": false,
  "firstName": "Andrew",
  "lastName": "Rudakov",
  "messageCount": 468,
  "username": "rudakov_vulnerable",
  "reason": null,
  "stopped": false,
  "id": "6317181635",
  "remainingTime": {
    "$date": "2025-04-11T13:55:25.924Z"
  },
  "spamInitDate": null,
  "historySpamBlocks": [
    {
      "spamBlockDate": {
        "$date": "2024-12-25T06:28:00.000Z"
      },
      "spamBlockDays": 24
    },
    {
      "spamBlockDate": {
        "$date": "2025-01-24T10:26:00.000Z"
      },
      "spamBlockDays": 30
    },
    {
      "spamBlockDate": {
        "$date": "2025-01-28T15:20:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-01T14:37:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-10T09:53:00.000Z"
      },
      "spamBlockDays": 7
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-04T14:15:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-06T09:48:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-09T19:24:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-10T03:37:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-18T09:06:00.000Z"
      },
      "spamBlockDays": 7
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-15T07:22:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-22T13:20:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-03T20:10:00.000Z"
      },
      "spamBlockDays": 7
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-07T07:21:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-10T11:23:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-12T14:35:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-13T11:02:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-21T10:03:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-31T03:56:00.000Z"
      },
      "spamBlockDays": 7
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-26T10:08:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-29T10:45:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-04-02T12:46:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-04-10T12:10:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-04-09T10:12:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-04-13T11:25:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-04-12T12:29:00.000Z"
      },
      "spamBlockDays": 1
    }
  ],
  "nextApiId": 2496,
  "twoFa": false,
  "twoFaDate": {
    "$date": "2025-04-10T12:17:52.928Z"
  },
  "automaticCheckDate": {
    "$date": "2025-04-12T13:06:08.856Z"
  },
  "lazyCheckDate": {
    "$date": "2025-04-12T11:48:40.741Z"
  }
},
{
  "_id": {
    "$oid": "662bd527bc2f422065c5f52f"
  },
  "accountId": "113084710-rus-support-after-zelenka",
  "dc1": "2e68f219a5f4b6310bf5de49dacffd5956d3a6c3fa20325163ffae8b59d0c979e11779f322572507ca0d891400cb54ce361ed011ecda3b41f4c8cdc3246ef0b07f5923f604e91c6a527a56b7fcaeb50cd3b85b63779c9a446733913836fce147352300d385d39da7ecac6a948eaec4c3c4c364545430188d1d26d1e4680e85baea0f1d94a35f72ac46eb9ae941b48f940ec05cd0f8b3dd8b36b428302b0941016d4046dd11a145ce535955fe05ad94d1b649a06ee877ff8ea5d84629d5c9456d6ee8cca9abb180e65bbc2efe600861d60022c1e6a0a6ac4de1ee523505edcc081cbb5a68aa885902f9ab9c5c267cb3170b718be41a5cf7a43575d0ad6d9b7781",
  "dc2": "30efe408119b9dac15df4f78aa8e8a91a9129caf990c8c837087c1b4d63d33009b2fe6265a0eb0b20525a9eaf69ea33ca7bcb5f339380d497cccc16632cab6be843143500ca5ceffd4b2200205f37d66f1c8f4ef6257faba196224ca76a28749d42a7cf08a9f2fe08882c80b541c281dbb4f5cd46d5c3734600cc054e94e55343be974dbc0661267d32e31e473187e792c6e75419dab997add83575b9d2a58c196350828bb0cc5276978d07e7dce208fbc2cc62464d29a6b7c2ced29b7455d873cf1fc10263cc8d303ed8f5b51fa6627f43ba411d7a4db20a939dfff9dddc63a68f4a6c0c4cea3c3d764494a67e3a130dcb3a50317666f5f624a1f41f56cc4c6",
  "dc3": "40a3c3dd306b96c75fce673086a9181af05717a2bfe99a74b9017ec406e2631abc2704d7fec447fd9b1388e52eee41b50a42186ca617089124efba567c1685572ade7a60d24903d398560630d440dcbbf9dfe369ca2deb89c6aabb52807d8ec4aa1248e7cacaacfe3649d3e57565b17d5018b02811c9e5833f2b6c1e8271e7007881182aab78414b16150923ba1814eedb7d802aad54111db5b657e54c2b57a55db16bbb13b4746a3e5aa01c3bb0829ec7727ab4b5cad80f2030edfcd8fab672e5563ddee23a69b038cad4c6dd1570bd1b92e42796b693f033430c0537120c7b4c7855186b65fab02dcfd7c5480e67925ebeecb8093c1ec93ec09779eee0c65e",
  "dcId": 2,
  "dateUpdated": {
    "$date": "2025-04-12T12:57:20.653Z"
  },
  "banned": false,
  "firstName": "Timofey",
  "lastName": "Filatov",
  "messageCount": 221,
  "username": "filatov_dramatic",
  "reason": null,
  "stopped": false,
  "id": "7055502961",
  "remainingTime": {
    "$date": "2025-04-11T11:39:10.900Z"
  },
  "spamInitDate": null,
  "historySpamBlocks": [
    {
      "spamBlockDate": {
        "$date": "2024-12-16T05:49:00.000Z"
      },
      "spamBlockDays": 15
    },
    {
      "spamBlockDate": {
        "$date": "2025-01-16T05:08:00.000Z"
      },
      "spamBlockDays": 30
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-22T19:33:00.000Z"
      },
      "spamBlockDays": 30
    },
    {
      "spamBlockDate": {
        "$date": "2025-01-25T02:10:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-01-29T10:45:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-05T12:51:00.000Z"
      },
      "spamBlockDays": 7
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-07T17:12:00.000Z"
      },
      "spamBlockDays": 30
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-12T12:18:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-21T12:59:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-20T08:02:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-24T11:02:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-05T08:30:00.000Z"
      },
      "spamBlockDays": 7
    },
    {
      "spamBlockDate": {
        "$date": "2025-04-04T09:51:00.000Z"
      },
      "spamBlockDays": 30
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-12T08:37:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-16T12:09:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-22T11:16:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-30T06:20:00.000Z"
      },
      "spamBlockDays": 7
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-27T16:33:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-04-12T10:50:00.000Z"
      },
      "spamBlockDays": 1
    }
  ],
  "nextApiId": 2496,
  "twoFa": false,
  "twoFaDate": {
    "$date": "2025-04-10T12:17:52.991Z"
  },
  "automaticCheckDate": {
    "$date": "2025-04-12T12:57:20.653Z"
  },
  "lazyCheckDate": {
    "$date": "2025-04-12T10:10:19.483Z"
  }
},
{
  "_id": {
    "$oid": "663547a4bc2f422065b73ea7"
  },
  "accountId": "+79963863783-2026166-usa",
  "dc1": "49ee069d9fb5e00754bf7f9ee6a43056bf490e76e3809390f4e1283a3aa2252cf057112f256c813751249ac4efd3350b7cfbe475695c36fa441b4dac250811d65897c564870d988d1b711fc60e2b71ea864a60940e3ad83dcfd5014e1409978fd1f108ade2bfdc4556ecd2395af9514e8d5c29374fbd0a1f25f96249b6e12a52d35fcb72e29dd65dbd25474ef34075d2d4374f77591bf1ee1250cb0b8bb89c48ad5e64c314cb617c5524434bc79b83ab840ee1138b3ebb58d5b27e7de8a90bc6679496bf3977e20a611a4c1196ca1b95742950806c8e29428f65d2badf3c97842227a0d70006433c1c6511bb8314e1537efcfe4bbdd55fe693833842d3330870",
  "dc2": "0193a7e4910667792fffd778ce7139dea88ac56289a1a6a9180a0193abfafcf3bdf5b18efb4021bea5bbf6eab3b27c49d9f257b386ae2c9d388fd4e29dc126572787c7222a182e54cfcb531d7b905772f4a72995cf41193c8eda606cad7ecfab93a4ab1e0edb1a1d8ac957c2535961afbea9f7325ad59bb822447b35397a56fb1e8d797bf7cbfdb20fc5565d9c1b74fcbf90b3e81e50b455a3b0c224b4c667732f0a45e7a351356fa8c377dd561ff40f7b1420368156ed0491132a88b455b7c3f40a8d4a637447892b374b67ac2a9a8ffb5a2cb34018301ca9f625f81baac016db0b1bfbfc43b5eec27ba17e4bec8d5bff2c9dc63deb651653f7ccd3622e4cc9",
  "dc3": "4322137477059dca9ea8a70ffaa96ebe8bdf8054d8a69e24fb1b412585f13ce7614ac33ecc56189b270f9de5f47c9caddae3add81d534137b06b201737f556366547fe943b012f4782d8cae235daae9d62d521e9d0c1ecad9f345045bc3429d31d0229ff3d19f30a4619d5e16743f8003c92070fb269aa28a93f419f95758a2e3b4a576e4aeca8679f1adeae188f39d288df8ee13406b945e545432c3a371e45c89bc2fa519153c1a8e7258d1cf07d33a3d96a93c9c5d73944c8ff61c59b0ba3490d136aa9f753a64ed30a855b1971865400526a0cb45b3a6200f08d4e815ab6613c06625cff2157a0074d01d37d62e708034d0d83c7c294b619e54ad1afa1b5",
  "dcId": 2,
  "banned": false,
  "dateUpdated": {
    "$date": "2025-04-12T12:59:17.211Z"
  },
  "reason": null,
  "stopped": false,
  "firstName": "Dmitriy",
  "lastName": "Agapov",
  "messageCount": 735,
  "username": "agapov_wealthy",
  "id": "7169261323",
  "remainingTime": {
    "$date": "2025-04-12T07:18:10.375Z"
  },
  "spamInitDate": null,
  "historySpamBlocks": [
    {
      "spamBlockDate": {
        "$date": "2024-12-15T08:19:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2024-12-20T12:24:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2024-12-27T13:45:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-01-27T14:00:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-06T13:52:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-10T19:15:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-13T06:04:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-28T07:51:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-04-07T09:31:00.000Z"
      },
      "spamBlockDays": 7
    },
    {
      "spamBlockDate": {
        "$date": "2025-04-02T05:21:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-04-04T16:23:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-04-10T12:59:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-04-11T10:31:00.000Z"
      },
      "spamBlockDays": 1
    }
  ],
  "nextApiId": 2496,
  "twoFa": false,
  "twoFaDate": {
    "$date": "2025-04-10T13:49:37.565Z"
  },
  "automaticCheckDate": {
    "$date": "2025-04-12T12:59:17.211Z"
  },
  "lazyCheckDate": {
    "$date": "2025-04-12T10:15:23.808Z"
  }
},
{
  "_id": {
    "$oid": "6655a238f6c612cb5f71940f"
  },
  "accountId": "1716299423-support-new-100",
  "dc1": "4d3b19706d2de79c272327e3836545d79ade3accaac09e4dfb7ed51c2067dae08700e7be34e0ddc06125efbc8dfd4ed490f380846fee0435a7eabc7984b3fe066edb89aa4b18db0dbb560fef5cd060bfac5b5dcabc83060524ce3bbbcd902f637620dd0a560283dfbc27223e93fa19b8c1fe671077ed12b0e03e5b5b2be3e2d9cf82b77084031c7b3c9e473f8456c02fef19e079e3ef3a0d35f986ec389a418b8fc31ad3acdc43aeec072df8a9403ca18a0fa10b9b889b95779e9a7db0126d36605a27f3600905008f2e53526576dad7746190647dbf298b4cb60f34c7a749febf1809b9d874d3aad3b238ed3dfdb8a3fa81ed318a69b19a6849ff4d85955f9b",
  "dc2": "66851405964fd7111f7a112395752dcbcccd67fb8d0a1b9c25ac143e5bfcc2689e239c2d539ab4b3a6cc1fd7081d5595526f24bc7631d404ad925bd6eb8769eaa3849217bc6afb0a141471850d2cdcf0a92a70681408b68e11e1737b559356528e17654519c9ee6ac00a99bdac08769fb22dd430f9c8112cb0b896f931d7ee56a597116bde22d507d7196d5fdf089d1329ada80a8eb91c039602c69e0d29285996b7c37fd1f0c8d0242af3faeb0fef749bd227c4edbbcc96403ea523b4bf8e3175ed5ed1eeff70e76ed4fb171db23f3a5675bf242bd8c97fa64b2a10c8baba2ddab3bf110d192fd3f9f4703619c7bffb9342a8648461cecc9f786162e5ab132f",
  "dcId": 2,
  "banned": false,
  "dateUpdated": {
    "$date": "2025-04-12T13:08:24.620Z"
  },
  "reason": null,
  "firstName": "Ivan",
  "lastName": "Terekhov",
  "messageCount": 404,
  "username": "terekhov_verbal",
  "id": "6706700320",
  "remainingTime": {
    "$date": "2025-04-11T14:43:40.131Z"
  },
  "spamInitDate": null,
  "historySpamBlocks": [
    {
      "spamBlockDate": {
        "$date": "2024-12-01T09:21:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2024-12-08T10:24:00.000Z"
      },
      "spamBlockDays": 7
    },
    {
      "spamBlockDate": {
        "$date": "2025-01-09T12:19:00.000Z"
      },
      "spamBlockDays": 30
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-11T08:51:00.000Z"
      },
      "spamBlockDays": 30
    },
    {
      "spamBlockDate": {
        "$date": "2025-01-22T11:37:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-01-25T12:26:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-03T15:08:00.000Z"
      },
      "spamBlockDays": 7
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-09T08:06:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-11T08:59:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-16T10:22:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-24T06:06:00.000Z"
      },
      "spamBlockDays": 7
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-19T10:00:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-21T11:43:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-23T20:51:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-05T06:42:00.000Z"
      },
      "spamBlockDays": 7
    },
    {
      "spamBlockDate": {
        "$date": "2025-04-10T12:14:00.000Z"
      },
      "spamBlockDays": 30
    },
    {
      "spamBlockDate": {
        "$date": "2025-04-09T10:36:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-04-13T11:57:00.000Z"
      },
      "spamBlockDays": 3
    }
  ],
  "nextApiId": 2496,
  "twoFa": false,
  "twoFaDate": {
    "$date": "2025-04-10T12:58:20.792Z"
  },
  "automaticCheckDate": {
    "$date": "2025-04-12T13:08:24.620Z"
  },
  "stopped": false,
  "lazyCheckDate": {
    "$date": "2025-04-12T11:35:52.547Z"
  }
},
{
  "_id": {
    "$oid": "6655a23af6c612cb5f71971a"
  },
  "accountId": "1716304890-support-new-100",
  "dc1": "3d97f0c121251e324d16373a52f8d3571e75aa1006480263a6df6a5c666feebfa820a60c2ca0d46e4763475f69908cfdb08a2717f25e2513f1335bd2aa416b1700430a7d121b9e9afd781856a4f9deed636e3708e8d5abf377eb16536949be854f62c5108ccd29eba68fe4eabd7b82ac3fbc611d7db30b0490a5a87abbb9c2be6b1c32b3bfd6625619bda63157f6248382b166ec5a76d743ff7f839243db91130555c4f9db904162f7576a165e2dae39bbb8ad0ca70bab2d974c0f3aae700420dcec9e65adfb1778d6f8cce75cd51669c8db52556b5eb550e4969e3004310b273c4f24a83fbb72d212d7a296e9763f6942c158749a1d928c4818e49cb4179acd",
  "dc2": "1fbfb43536d1d1849fb0fb1b8248f33771b80dabf4eb3cff50623b24a1be929b4337865755e77a34c1f84e7f0df233dce651ba0d929b344183939e53900bfdef375b758808d4e1e582e3fefbb02f1678f38a3aa32c9eafa5813ad188f28ef0131b7548bc9732053fed7924ebeae4dc1b2bd11061c3c5c45386dcd2a70258cc40cbbe3de221a693cb56fea9828a0af74159f39aa91390879017369b4e001d01cf0703039b8befbcffbb8bf1fb71f96083f83d8fef68fdc46226addb81654ec92555197962d86be371fb5cc9a6cf4a92271cdcf63eda6821c8694650da7b64d4554d1e0cd0c57d67731b2c8876289f196a4d0311331383831e0347915b3217f5d5",
  "dc3": "07e5dff8a4b857f0c86146c622b8ebe90efe7c142a3e6b9bffc81cc6d316b4319699d166b7be3b5b469fdab0457446e4c7385427c164eaa92f54753f0a7b0976d4290fc98b354dec8af079be33d587964a993abe030e0684084335794bd8b7fb51a043bfb557107a27c5825a4326923af8d7a1f230f2439828df955db388cbde6076dd47507088878e15e32cb4591af47989b82ab38f5353063112e5f04eb1aa93a9ea98e3858ca1a45af3e1a171315ba6f4a44dcc16fe30e68295e1373542e894934f3535c841c485cb5f511c686653cff6559ecb4b69ba20a499747893db893ad3ac360dc98b837fa54c313beda150b387d91d3cdb0027c5ce0f9095487c22",
  "dc4": "275a11f2d362d280f35f0d2960e21c3504d7126368e9585ec20a4b18acef607aed218cc7da0a2d8579261a4572b21fe10c64b2a57193842ed14b643b93ded54a0e94c1654b3d37d55b3e4ca440e53e579de6eb3a8a37ef639fefb0a0cbed130af28ca06bae84a69acafc638e51c6d93f836baeb94fd7d5a24ae424d25afef5e9d7682f674a37a8cdcfcdb39c312ae445f61670da262a295320ae2e680a820c1122b53781b8627612b06c752f3dc760efac30c2554f17eb8d180b52abcb049357b9bacbb6d3274429af81deefc9e6bc0293ded4abff8b2b9d07b6d8b421f96fd8f3371a2b1d57a65dba68426192fc324335f8a93a116f82d1d4fd7dec36c0f01d",
  "dc5": "4b2b1eeb3256178aa38a4e780a43d3a7fac096dfa54e8c7557ebe69a60ad6865da6db916946737d1132531ab14f491eb0fedc8b4c55fc07bece6b5ca0f061b202f2be790181f5854abefb2521eda649a5d14927308787ac14309b74ed70b28bf0e88171fc0279f383ac7686fcaea2c4192be918a85186ff6cd91910fab1165c77b730a73b120f17ac0f4d1477a1dab165ffeb4ffbee554d9f8da802a3ca3de9e5382d2b8130a54991d1b707beb101b417bc618a0e51191e4c61df067447841e0e2611108394a4884106a6e41df20e2edf2a86170cfa889ebcea490e636db8f9269987cd71316c1e61a8b037bc84bdd107bfd14d44ec9e52635c48233934384c6",
  "dcId": 2,
  "banned": false,
  "dateUpdated": {
    "$date": "2025-04-12T12:58:26.196Z"
  },
  "reason": null,
  "firstName": "Georgiy",
  "lastName": "Soloviev",
  "messageCount": 443,
  "username": "soloviev_united",
  "id": "6572602219",
  "remainingTime": {
    "$date": "2025-04-12T07:19:20.084Z"
  },
  "spamInitDate": null,
  "historySpamBlocks": [
    {
      "spamBlockDate": {
        "$date": "2024-12-28T08:42:00.000Z"
      },
      "spamBlockDays": 28
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-11T10:18:00.000Z"
      },
      "spamBlockDays": 30
    },
    {
      "spamBlockDate": {
        "$date": "2025-01-21T09:52:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-01-21T12:58:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-01-27T12:05:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-04T08:00:00.000Z"
      },
      "spamBlockDays": 7
    },
    {
      "spamBlockDate": {
        "$date": "2025-01-31T09:47:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-04T13:09:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-12T08:03:00.000Z"
      },
      "spamBlockDays": 7
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-12T12:26:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-22T07:31:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-05T06:54:00.000Z"
      },
      "spamBlockDays": 7
    },
    {
      "spamBlockDate": {
        "$date": "2025-04-04T15:40:00.000Z"
      },
      "spamBlockDays": 30
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-07T08:49:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-15T08:48:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-25T13:37:00.000Z"
      },
      "spamBlockDays": 7
    },
    {
      "spamBlockDate": {
        "$date": "2025-04-25T09:50:00.000Z"
      },
      "spamBlockDays": 30
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-29T02:08:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-04-07T16:12:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-04-09T18:30:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-04-11T09:43:00.000Z"
      },
      "spamBlockDays": 1
    }
  ],
  "nextApiId": 2496,
  "twoFa": false,
  "stopped": false,
  "twoFaDate": {
    "$date": "2025-04-10T12:58:31.553Z"
  },
  "automaticCheckDate": {
    "$date": "2025-04-12T12:58:26.195Z"
  },
  "lazyCheckDate": {
    "$date": "2025-04-12T10:50:38.556Z"
  }
},
{
  "_id": {
    "$oid": "6655a23af6c612cb5f71974a"
  },
  "accountId": "1716304925-support-new-100",
  "dc1": "0a0f0c954bd92457cd15ce3c9f189f5469ee4103b8b1c670cfd91a3be7a7014fa0dcc3adfd91ab024366c9254342226613888314b0ca23030254a5d24be7e9487ee1e790a035527fbd0d6d079507e9bba3080abe4e980023136253d2ff68853c95c4cd07acd98912c617cd52baa325738afb81c95658b96493e9f51b247df9354d5aaa9fe5c2f5f4ed652dd4b96ab285e9887c74fb7603ff9f4b61b4e8d7562c84cc22241739f4b06a4fae19328c3227e90c92b5e2821292865ba5d8e54d01a11aa68fed899b8261919d473df6c94f706881ec1674feb54fe1c52bb257d2718c62c535875607e07e7b4ebdd829d89b43b1d562acd519c5e1e66c973ec2305176",
  "dc2": "5e5ed14895e7ee850396654045084e4eeeb82e596f93eaf6ad3ecbfc4b1f673683bcc68cf4d3cd5ce40fdfea5fb3701aa65f43434cd04c5ef2ea0efd2ed4109b87940c8df465da0d98c41085ac6a365f8afa71bfb6dc2c7b4eee3d2a1feca8c6a767185b3698c3b5eda1b6d97bba9dcc05677014bda02cdb8bea1627c5dfaf0b008343e045bd005678376b2137600e93345dbdd3c5da67dc4e93f04484374a141bd56eeab5a10b3790371afd092b48eb92378de47ea56f999886467a7ade5089f1419be8ddae15c0a5828e61c36b3b86e35357a615ae098b0b5471eb117738da4220d15fef2d13b40fd77ceceb3eaab1380fa20d20239284784c19c1ed021473",
  "dc3": "c7130634568eb2cb85a5dda99a9745ce15235eb88994d071d43cdecdd1ff7345f650806e3b0a857bb2b21b4708f9317fbccded58fce61a9d87037323433f7e117826fc382fe241eaa896083fa10480fe72d70e5f2bc471d4e439bb12c3d95dff29f9d03cda0286f8f96cbb43718f186634fbf962d14dd072d9961bffc07a187728f842677935c518125b313b597666dd93a6d08a692d983fe93723f79759d834e7227fe76bc295e494b12f89e6fb22ec8868ebd813d55bbb2272c6147d9b1fa2e0ec67b7168e956267e2bfaea5ec51ff2ba3a5c41bd1971838aa8ed521e4f7d2ef5cc903e391d409993245ef1de286883a69894af718a2e756b1c703068a756e",
  "dc4": "6ffefd374ec58fdf46c5fb9ba1e3aa49c34c8230048a076cdbd49bc7a484763061b188ac3e53981ffa7693aae209872bd267ee035a0542227f9c1252fc04ebb7cfd4dc84ad3bbb3806c2f7fc981bd3287ef88da5ac6c6ae4bdbda2dafb8591c62e9b2279443fc095f330009c427c0e31c076844637c1c69b42796c592cfdb453d5cfcd0ab9a72901863d9edbd52f23a60906498ad86e0d735c1fe04f866661dde6a0c91ceec0337ad33b6624f384c9885c9285b34f96839eb2873ae5ea2b372863055edd4bdba8886c55d1cf9d5267623637b9a57cecad003f16e45c40d7c06d1bdc7c5e1e5e108ebc1c04930b0ea70bb9b2e33b0566fbb0071631afb9a97e39",
  "dcId": 2,
  "banned": false,
  "dateUpdated": {
    "$date": "2025-04-12T12:31:20.877Z"
  },
  "reason": null,
  "firstName": "Victor",
  "lastName": "Kiselev",
  "messageCount": 513,
  "username": "kiselev_persistent",
  "id": "7013435602",
  "remainingTime": {
    "$date": "2025-04-11T16:59:52.132Z"
  },
  "stopped": false,
  "spamInitDate": null,
  "historySpamBlocks": [
    {
      "spamBlockDate": {
        "$date": "2024-12-10T10:36:00.000Z"
      },
      "spamBlockDays": 10
    },
    {
      "spamBlockDate": {
        "$date": "2025-01-09T11:33:00.000Z"
      },
      "spamBlockDays": 30
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-09T11:57:00.000Z"
      },
      "spamBlockDays": 30
    },
    {
      "spamBlockDate": {
        "$date": "2025-01-21T05:52:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-01-25T07:30:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-01-28T08:42:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-05T15:28:00.000Z"
      },
      "spamBlockDays": 7
    },
    {
      "spamBlockDate": {
        "$date": "2025-01-31T09:33:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-03T10:00:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-06T05:09:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-09T07:28:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-17T08:10:00.000Z"
      },
      "spamBlockDays": 7
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-12T11:19:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-17T13:03:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-20T05:04:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-24T09:39:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-28T07:36:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-07T12:44:00.000Z"
      },
      "spamBlockDays": 7
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-11T13:43:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-14T14:26:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-14T07:56:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-18T11:15:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-21T15:29:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-04-01T13:21:00.000Z"
      },
      "spamBlockDays": 7
    },
    {
      "spamBlockDate": {
        "$date": "2025-05-03T12:47:00.000Z"
      },
      "spamBlockDays": 30
    },
    {
      "spamBlockDate": {
        "$date": "2025-04-11T07:15:00.000Z"
      },
      "spamBlockDays": 1
    }
  ],
  "nextApiId": 2496,
  "twoFa": false,
  "twoFaDate": {
    "$date": "2025-04-10T11:29:28.265Z"
  },
  "automaticCheckDate": {
    "$date": "2025-04-12T12:31:20.877Z"
  },
  "lazyCheckDate": {
    "$date": "2025-04-12T10:36:38.476Z"
  }
},
{
  "_id": {
    "$oid": "6655a23bf6c612cb5f719808"
  },
  "accountId": "1716307966-support-new-100",
  "dc1": "09750bd998c002acf69817e1e1374a4a0a311204f9eb2717ae4a3015458469befbdfe2b1f0f57a920cc11a949404cae0ee83d6223a19dfa08e1940b619002c052194bec05180007668003c48f6223cd817205504a3202a845f3df0df2b2ff1934e039a03de33fd8cd2a168e66bf220effa6c4bbace0dea8043e7e5686b826ad9da3bd04c37e7f3800bd44bbe0a67d1d66bc0f11c4a2276b4a5f855386c4ca1346404353e246ec0ef7bb05f2fb885e30470b49817979507cc16a92e13b3184001d31f7849cf2a760dd9ab2b8ce58680b53943ece164fce260804989d898f944cc4c909778ab112efecafe73cb1e8db086f6d37194e0eb77e028551b7c1e8856af",
  "dc2": "6785b248e5205e57ad6db22a08062364df74f7eed8d74109b19ccaf94839cd39b9e660693ec77fda1c253798c825fb3620184da873c61eccc0d7f859235a1a91fcbac2c18c33b42d77322af44a842d5b5fcc8a5fbdab566fdbef6953a3eb3a41c285128d34866fc2e8537ba50c12b863281980b1e46e013d6292d1c06dc92f295e01957c527cd797680a211dc23e38026b7e6a0e2dac159c11b3a65d3c174e0cb3acaf31dc46e09523668ad87a3a43c40419998937ed7d1aedfffa1cee48b05c09fb5be8a77058a20a3acdb7d96002421845b898a5b55941a6fe13f699c3c15d3b714094dd2f0b46b258a373ddc95010eee9c2adcd390926f3425db1920b8dad",
  "dc3": "4fcfd03f68b54df21afdd550b14e2b608172185cd2e9bdf99be05b36c8e6544505215a127b8f3a309861d7a116ec26b48bb388a807d148e466dc40812efc9e55b3d3d87e57b900202be4e270dee0c36b1c6236567f2303ee1117ab997ae1a576f651ca43758c6b07f42d8e3e16990b7686666738bcab7848485d744e3e8edcf2cd56e336a73cfef1b230171e3c706b2bb15d66be4c3570055fa4eb08234c127f557c9b9f9b76d8828b6e8b7abe4a80ec15e84a9d0ba8c2f80eb8ea3a450379ac3282b2753d0c89e20f91c97ca2d2a5bbf972a874e8c4601ec4a2f389c9c254d9b6054779fac6673911fddf8c886d69b55e01ee6a4410b1e368c41f112c17d878",
  "dc4": "1fc893ba8b8bbfba6c46bd9e8c28cae2a4963a822e4556811f4c147b658d81370027fcfcd82cd3d7479abd979841b255cfbbd768240163f3132a86bacda2edb317bcdab3509d448e4a01d19c61c3fd089a7e57b32719458997211cccc53af9b98b494d71a5be8c0ac6380c964c2d0356d33a6fec0ed8895affd66ec09153c4dedcb864fd2b0bc0a04f2c84c916d6653e15d250588bb2b6e32b7e640b3295d65d492306b8ede161ea324055de9b4d50e21525cb5665473838fdb51aea181781f94eac690dff84e73b0dd6a6b98891cd9e07881cc2923e6530f3cfcce40c4ee1d2406b7827ca9d21ab9d767c83dc9068d32f96b779b8ff5e5d0f57df70b4a36b2a",
  "dcId": 2,
  "banned": false,
  "dateUpdated": {
    "$date": "2025-04-12T12:22:21.486Z"
  },
  "reason": null,
  "firstName": "Timofey",
  "lastName": "Larionov",
  "messageCount": 229,
  "username": "larionov_remote",
  "id": "6533242116",
  "remainingTime": {
    "$date": "2025-04-10T16:41:07.916Z"
  },
  "spamInitDate": null,
  "historySpamBlocks": [
    {
      "spamBlockDate": {
        "$date": "2024-12-16T06:34:00.000Z"
      },
      "spamBlockDays": 15
    },
    {
      "spamBlockDate": {
        "$date": "2025-01-15T13:41:00.000Z"
      },
      "spamBlockDays": 30
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-19T05:27:00.000Z"
      },
      "spamBlockDays": 30
    },
    {
      "spamBlockDate": {
        "$date": "2025-01-23T12:24:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-01-25T07:47:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-01-25T14:36:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-01-27T10:35:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-01-28T12:32:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-01T05:56:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-01-31T13:33:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-03T14:32:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-11T07:23:00.000Z"
      },
      "spamBlockDays": 7
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-13T12:39:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-14T11:48:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-27T09:24:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-28T09:57:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-06T10:40:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-05T10:46:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-07T11:20:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-14T06:13:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-12T14:51:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-13T19:51:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-14T05:48:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-19T09:54:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-22T11:52:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-22T14:46:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-24T01:04:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-27T07:01:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-04-03T09:08:00.000Z"
      },
      "spamBlockDays": 7
    },
    {
      "spamBlockDate": {
        "$date": "2025-04-01T14:00:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-04-12T10:48:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-04-11T14:53:00.000Z"
      },
      "spamBlockDays": 1
    }
  ],
  "nextApiId": 2496,
  "twoFa": false,
  "stopped": false,
  "twoFaDate": {
    "$date": "2025-04-10T12:58:29.636Z"
  },
  "automaticCheckDate": {
    "$date": "2025-04-12T12:22:21.486Z"
  },
  "lazyCheckDate": {
    "$date": "2025-04-12T10:52:49.910Z"
  }
},
{
  "_id": {
    "$oid": "6655a23bf6c612cb5f719813"
  },
  "accountId": "1716307975-support-new-100",
  "dc1": "465f3ad94a7c91be49dd26746c94c0644f8378cca1f961b87e7f4fa5783d71302263d3bf50c82c2ad40abfa20343c8de7900367871fab65db950c235c6f5f6e22effb19073aa46e8ed7250706c40ba1f566d473e24694977da1183d77d91f55536236c3ab84c72647e24e1b4972c2afabf7fa5d1e1439524e80acd8a2ea6f79771dca1368557775e391ef91df6429062d6c0a8af2c2b048959aba6e01e78a2a0cbb892684f247b38aacd18eda2593c29018a13bd198465dc94965b74f69d5b4e6524a8bc5c8f563739c00269c75a7125d739322f30c0858d7d36d9e189d4907d491755d9bc8230226425f911045baff89de36063859ce87cbb4c5c0767f2b83c",
  "dc2": "01665b95fa0d02c1d6a3851d4caddbb766187eff9c4ca82e04f94c9d973167cfcd85967b7e6b8aefcf4ca6e4823cdc57231aa009ecec35f25841179601feacb6f0ad1be84a4f1ef3ac2227222cb9d9ec8f52ea47b67b89dbeae2f1348c12bbf10f005d2bfd64f53f32543c5eaad4d23e12f557910ea4cab3b11cda5dc0bec3762622db20ffcfb252a0ce7d0b8f92d5feb2267596e420c3268454665ccee3ea94c6fb7ee2728b712ca465a3b254e4138f0d9f67fb7c83e5584620df377d0d4c23651791797219eecdae9413908e1f70e085948eae0aa4780e420d00d216c9ffbfdba4703c0368180b2f3f4f678545e1757622c08efae598a332a0e928f70b06fb",
  "dc3": "65e56faef9d2062ff86683fb886e3413fbf34efef61c71b48d09f19a25990b461f1cbfe309f5b16b8941e4a828239f181b44fd9b6adeddff77c4a285d930ea7c4cb5ae19eb5ae99d233757634318d5d7b191141b7f08154d89f1a6cd9f10684692d5161a8a91b9c37933c90f48e918978a7de38e7263fc83ffbab8cd43fde4b18473f44f1387d3a591e5751465604044e368e8a9ac6cfcd152a4516c6da2b6e7f1e687742f9adcce6b61d22a632710ca0442dfcf21173208f6510d2a8c312fee10ace5afb59fba0d7787d579a912c0a9adf317b2d66d122834fe63a738fe21e10b495c88aa4d17d8c4dbecc7e21ad9e9125104bfa7122253084b1fd88e037b87",
  "dcId": 2,
  "banned": false,
  "dateUpdated": {
    "$date": "2025-04-12T12:40:18.732Z"
  },
  "reason": null,
  "firstName": "Vadim",
  "lastName": "Novikov",
  "messageCount": 586,
  "username": "novikov_surviving",
  "id": "6453944412",
  "remainingTime": {
    "$date": "2025-04-11T16:44:49.858Z"
  },
  "spamInitDate": null,
  "historySpamBlocks": [
    {
      "spamBlockDate": {
        "$date": "2024-12-12T12:54:00.000Z"
      },
      "spamBlockDays": 12
    },
    {
      "spamBlockDate": {
        "$date": "2024-12-16T10:12:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2024-12-23T12:31:00.000Z"
      },
      "spamBlockDays": 7
    },
    {
      "spamBlockDate": {
        "$date": "2025-01-22T13:15:00.000Z"
      },
      "spamBlockDays": 30
    },
    {
      "spamBlockDate": {
        "$date": "2025-01-20T11:14:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-01-21T07:50:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-01-22T13:54:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-01-26T11:35:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-01-24T15:11:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-02T06:30:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-01T09:42:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-06T14:12:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-05T07:03:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-09T12:30:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-08T15:01:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-13T12:44:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-12T07:03:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-18T08:14:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-18T12:15:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-21T15:44:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-22T08:33:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-27T08:12:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-26T07:15:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-02T13:50:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-12T12:03:00.000Z"
      },
      "spamBlockDays": 7
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-07T09:28:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-16T19:33:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-25T13:45:00.000Z"
      },
      "spamBlockDays": 7
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-24T09:44:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-29T12:04:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-04-09T11:08:00.000Z"
      },
      "spamBlockDays": 7
    },
    {
      "spamBlockDate": {
        "$date": "2025-04-05T06:51:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-04-11T09:57:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-04-11T11:33:00.000Z"
      },
      "spamBlockDays": 1
    }
  ],
  "nextApiId": 2496,
  "twoFa": false,
  "twoFaDate": {
    "$date": "2025-04-10T11:29:28.730Z"
  },
  "automaticCheckDate": {
    "$date": "2025-04-12T12:40:18.732Z"
  },
  "stopped": false,
  "lazyCheckDate": {
    "$date": "2025-04-12T10:46:52.628Z"
  }
},
{
  "_id": {
    "$oid": "6655a23bf6c612cb5f71981e"
  },
  "accountId": "1716308000-support-new-100",
  "dc1": "06b3c6a887aa23dd0a7b67c108fdb7049664afdab6be00ca19f5c849cc22706104857b7a48904576cfa8deab4757fb3601dcfc5edef63ba93f8d8e53f267e25ec75cccc03c3c12c5e63b86286ba80cc569155b8568bacb71fdfa4a6a488c9a8516bd31879b72011afd60015eea5d91d3d8be9fb98a240bc2d0706b6ee352bef3f07dce6eef148359f10549f7641f48ea5f13c05bb16220e728ecd01090284fdd068d103f5a2e7edd0b0eb166001c7e3f2845ef20412d6765a962727247142980d02e6d318276df4468e00846547a3bff54be46863b9880ad9f58e8a50d31e216aa2fe843f6ee0252d0356b9d3e2b7174410aee623bc65fe7e0b3f1301503c9bb",
  "dc2": "1a30694f6b2caaf02e2e010c2795af38dc37fe9fb2b160694a1a0b470884542c8cb7f450a2fdc41283982e5279b981e1d075b64c851d9f0350a5f6ef7c8638c166528c0eca77e06449fe0cfe5ad1f6d9243763d4bd99ae6e9151ea5125e31cc8276c9a5c652f39f518bf6eab2af8523945e4fd260eac5a80076f6cf58a958608ab44fa4991f04bd827beee4f5c2f9f31073a42461e50ebd11a35bc5ca3acb445fef39c3ff3724aa9a63fec0434acd54a64bd291b1bfb8e0c8352351891d127bd3a34b1220969b46789bf87a9955be8dcbb82ad0ab5e11cce2ec4199af37f7ff3a3cda07ea9e9de895553166ecefa490f2b2d7aaa357a7e006c140ebd4a6f7023",
  "dc3": "bca6c08457bdd86a41184dcfb451651a446a5c83f31086a9ea365ce5639f3d272bf1d94b61b0cb7c1796a37a3c04e49cd62d9110deaba45b0aa422e20fefee7dc48c9982ff119bad281ee889aa1cf3fca1e4e6fb9717a197dfe8e50855c742f55af0833fa1a596094cfae75f85780c9f104f2ac08c2fd3910ff33b06adfd1a5833310847a75826c9fa0bd107a3599f7a7cdc0fb58538b13f91ee7d973d3d245bf56e6ce5af1ea7b4290d8aee842c76ba7b1fd00b24ad2a77cdeadc6f899cc78da3f547fb8934050767efbf1d35a4609b855030286c154595c395a66e45acf946d955dd81e78d9ca143cd19d87ce8cafe82ca4e0e0b9cb375b6c2d9bbe1a41991",
  "dc4": "b13dce51601a0e7b46a994576331b3eb1deef86b647d99cf51584eeee3b7bedfaa0649a7dba6c80900cb61fa3e43a3cc02bce3eadc271724c2f2c421514f51a6ed067010eba235186be7de2c5d72aaec78449e66ae8cf6a6ba0679d35f560ddad7cae8f8ddc3da344afa47ac022c6f2a3ad9f590c9d010d74c722aaa41b594981cdf38ef645f2d37af159ef9603be9e50221a899efc5148f67a84a406df8a65bde7c7ce8b3493b59250ae2a4f78ff7c718d073e727ffb34b526200c81976b74ab86ae70e5cf989e4caf95b5bc32ed2fa0446c8753c062461ba51ef70bf1f0dd553271a34d75be6094cd176003f8ccae2c89859ab17b343bf5a04a59a1cf739f0",
  "dcId": 2,
  "banned": false,
  "dateUpdated": {
    "$date": "2025-04-12T12:58:20.924Z"
  },
  "reason": null,
  "firstName": "Leonid",
  "lastName": "Zubanov",
  "messageCount": 235,
  "username": "zubanov_helpless",
  "id": "6779922415",
  "stopped": false,
  "remainingTime": {
    "$date": "2025-04-09T12:03:42.402Z"
  },
  "spamInitDate": null,
  "historySpamBlocks": [
    {
      "spamBlockDate": {
        "$date": "2024-12-03T03:17:00.000Z"
      },
      "spamBlockDays": 2
    },
    {
      "spamBlockDate": {
        "$date": "2025-01-02T10:16:00.000Z"
      },
      "spamBlockDays": 30
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-09T11:00:00.000Z"
      },
      "spamBlockDays": 30
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-11T10:01:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-15T08:56:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-14T07:35:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-21T09:56:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-22T12:59:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-05T10:09:00.000Z"
      },
      "spamBlockDays": 7
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-06T23:11:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-09T07:53:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-17T08:10:00.000Z"
      },
      "spamBlockDays": 7
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-18T10:32:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-22T03:14:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-30T15:50:00.000Z"
      },
      "spamBlockDays": 7
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-27T14:06:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-31T08:45:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-04-08T08:58:00.000Z"
      },
      "spamBlockDays": 7
    },
    {
      "spamBlockDate": {
        "$date": "2025-04-03T15:46:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-04-12T11:25:00.000Z"
      },
      "spamBlockDays": 3
    }
  ],
  "nextApiId": 2496,
  "twoFa": false,
  "twoFaDate": {
    "$date": "2025-04-10T12:58:28.109Z"
  },
  "automaticCheckDate": {
    "$date": "2025-04-12T12:58:20.924Z"
  },
  "lazyCheckDate": {
    "$date": "2025-04-12T10:03:17.047Z"
  }
},
{
  "_id": {
    "$oid": "6655a23ff6c612cb5f719ad4"
  },
  "accountId": "1716286901-115-support-new",
  "dc1": "992a8d9e2ff6ff727cc67101f37b655d1f02dea1bb4b6fafe0165100f345f15aeacc7fd71c0fa7d3cb0f91dc75d1d38814c566af2953bf8175e57aadbe6f7cbd04975f5071874a0c7dfbba4ac3e0e18e6039b7cd8178feb5e8487fc3beed3818fd8f7c62a4874a87bdff73ed18338fdab0b1871e25bb786f14c93d6aadaa7fd4ab510098b3e085789a1bc5f81219a85fa70d68d8e17a7d7f5b9f744ff8922d4425f97f7941059275a2a3dfd7ca7a1f2b873743fe0a55a7cf446c7a98d447b031a0743d0baf71c40b7f0cd74b7580661f4149aeef03b1af312c587d9a926960b0084aea4568a93ac938c3fc88de27dce081d264110ac568c8fdd1670ec9ee3c80",
  "dc2": "12497f4c2d93b7db83a12dd078ad68e1ed177b27c643502cc309857b5af826ee205d657f7a08fc2754a6e16bbbaa2d48b37dd399acdd8fc6a00319c79aaa3b95a1006c79d68bc5c26f560a1b00f23895d285af9dfde209205216742e88db0aa9483438c6c34fe53f4153ed4f43ba3418b036c336ffe87a8d0f9c8d4be893662a6270aa4acc63c9ed5ab014c620ca303f1ac3aedeab53765e05f06ef01ef3bfb5ebd75d0d6c170a4baf1a9a20a8d3ef937048aac1dc20e1947eab4ab07d3476be6042923f3a76682e92532239a0d01bf18f3271e709a638426cab00357f27060911710c7bf5876cf9be951d7c4791f2cdb82b948cff7abc4a26e2c3b1e24bbdc7",
  "dc3": "5651f813ba84d4cf30913ce45721c3523fc5ec96bc4a3e97c815e2d1f58a4aa6673d2f418d9a53bd3f0771551645a7d962f8ded800cf8616c43c6a2cd7e66c6a953843b655ece886bf095f82eb73e2627766f0b9fe23e2efec5cab16b6fd9e7fc1f41319629dbaeae4a7d7243a9c71b703d3cfd0175232521707b3864c3ca258242fcf1cc68d528c96f584cd7c22fb19ee0ad379c92c2561caad13b349ec5bcbb1c80aad52665e18bf9c95908f778ab50acd170e47d194028183eeb3731986773e28204ecfd4c3976aa106c2e536da4f1fd73f080488fee6f8299ece443bda19c2857fdcb48716284e88d58242ba9f95c40943a9f5ba7382d488a66ba0542ebe",
  "dcId": 2,
  "banned": false,
  "dateUpdated": {
    "$date": "2025-04-12T13:04:28.495Z"
  },
  "reason": null,
  "firstName": "Victor",
  "lastName": "Romanov",
  "messageCount": 283,
  "username": "romanov_passing",
  "id": "6432562866",
  "stopped": false,
  "remainingTime": {
    "$date": "2025-04-11T14:47:26.477Z"
  },
  "spamInitDate": null,
  "historySpamBlocks": [
    {
      "spamBlockDate": {
        "$date": "2024-12-15T07:09:00.000Z"
      },
      "spamBlockDays": 14
    },
    {
      "spamBlockDate": {
        "$date": "2024-12-19T14:43:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2024-12-27T07:35:00.000Z"
      },
      "spamBlockDays": 7
    },
    {
      "spamBlockDate": {
        "$date": "2025-01-27T11:21:00.000Z"
      },
      "spamBlockDays": 30
    },
    {
      "spamBlockDate": {
        "$date": "2025-01-22T07:37:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-01-27T11:54:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-03T12:43:00.000Z"
      },
      "spamBlockDays": 7
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-01T08:05:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-04T10:38:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-11T14:15:00.000Z"
      },
      "spamBlockDays": 7
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-16T09:00:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-14T17:19:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-20T06:08:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-19T08:50:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-27T09:15:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-01T06:18:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-11T12:15:00.000Z"
      },
      "spamBlockDays": 7
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-08T09:55:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-08T14:41:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-13T13:17:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-26T11:13:00.000Z"
      },
      "spamBlockDays": 7
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-22T11:28:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-25T18:00:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-29T06:11:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-27T14:00:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-30T14:43:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-04-07T14:53:00.000Z"
      },
      "spamBlockDays": 7
    },
    {
      "spamBlockDate": {
        "$date": "2025-04-12T13:36:00.000Z"
      },
      "spamBlockDays": 1
    }
  ],
  "nextApiId": 2496,
  "twoFa": false,
  "twoFaDate": {
    "$date": "2025-04-10T10:01:58.330Z"
  },
  "automaticCheckDate": {
    "$date": "2025-04-12T13:04:28.495Z"
  },
  "lazyCheckDate": {
    "$date": "2025-04-12T09:23:08.552Z"
  }
},
{
  "_id": {
    "$oid": "6655a240f6c612cb5f719b52"
  },
  "accountId": "1716288441-115-support-new",
  "dc1": "5104deb305034b95c6088cfdf0a35a084b2d560b53b62598e4b035536803f7be211486deda872d3a9cafc96fd32459d61553b6868112cb9255541e80ade218f0fa6c69227ed834437d2be5a9c07949482d201141f5fc56e60b0f9f2b2732af812683ce96225ab3c23a314b6167c5f6f0635c47f00decf839e242e2e1e0db9818545a2d1b2714412db7ff76d6c51eef1e3d43f4576e04d25f932d413f13704e4d257e6542104e50b3f624d9e87195b1c561ff958d1199bf797959b0efb87a102f656fb15d81b76297ef3c6bb77ad1a371ade8b04eda5c3d7175d83ee162ed15d2a4565efb8d9177927c3b4689816dc7a81361568858f1ffa28ce93f0c298576ea",
  "dc2": "963cfbeb69d578433918d1909c7407724560ee40f5229a8ca6e46f4447b5a3fd976546bf1477737333810dc1a5ed16162e5f8a3a9038585059846ba815410d99010d0f83ad3000bd3e28703f2effedd1105977b1b01f5b3c1104ec7ff29f09f313effebd9e6aa013d3c394b0753a0e0ff94870ede2e9d91e78f24d4d4a28295080e6e7fc0fbaf774eee13d2fa32cf5908e6dcffc96d029ec028dadbb3fad85693c90eaabb420fa197826c87de2ed5c3e919fac14ad6984c9328c94df94d2736c09ee6aa44616fd59819b059bcbf460485d7c89c10194b2f403b3c1cf2e62f66bfe01f38488eec6a5df34ab6362ede5cbcf9d65017e1313096b1e04301f1da946",
  "dcId": 2,
  "banned": false,
  "dateUpdated": {
    "$date": "2025-04-12T13:03:27.480Z"
  },
  "reason": null,
  "firstName": "Pavel",
  "lastName": "Popov",
  "messageCount": 533,
  "username": "popov_fond",
  "id": "7081288239",
  "remainingTime": {
    "$date": "2025-04-11T14:54:15.019Z"
  },
  "spamInitDate": null,
  "historySpamBlocks": [
    {
      "spamBlockDate": {
        "$date": "2024-12-11T05:58:00.000Z"
      },
      "spamBlockDays": 10
    },
    {
      "spamBlockDate": {
        "$date": "2025-01-10T10:47:00.000Z"
      },
      "spamBlockDays": 30
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-12T10:35:00.000Z"
      },
      "spamBlockDays": 30
    },
    {
      "spamBlockDate": {
        "$date": "2025-01-27T13:32:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-01T07:49:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-09T12:10:00.000Z"
      },
      "spamBlockDays": 7
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-10T06:33:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-13T09:57:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-21T10:57:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-20T07:45:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-24T21:13:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-01T09:09:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-11T10:52:00.000Z"
      },
      "spamBlockDays": 7
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-06T13:45:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-07T07:32:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-10T08:58:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-17T14:01:00.000Z"
      },
      "spamBlockDays": 7
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-12T05:58:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-14T05:14:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-17T10:01:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-25T09:42:00.000Z"
      },
      "spamBlockDays": 7
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-22T12:18:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-25T09:33:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-29T12:23:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-28T12:13:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-04-05T07:57:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-04-11T06:19:00.000Z"
      },
      "spamBlockDays": 1
    }
  ],
  "nextApiId": 2496,
  "twoFa": false,
  "stopped": false,
  "twoFaDate": {
    "$date": "2025-04-10T11:29:04.359Z"
  },
  "automaticCheckDate": {
    "$date": "2025-04-12T13:03:27.480Z"
  },
  "lazyCheckDate": {
    "$date": "2025-04-12T10:58:45.609Z"
  }
},
{
  "_id": {
    "$oid": "6655a241f6c612cb5f719c05"
  },
  "accountId": "1716290212-115-support-new",
  "dc1": "1211e946032ed45f944ed0e28377c12f995760876508ebc627dab6d57c6efe17e1f64ce5a489486e3c01a8e218d5bf19eed3881d6ce7990d309ec7434db5f3eb02c372ce37b0f2657f45e053fa4f43276bd001e1a9678818f8969aaab76333a43ee5bea071062d208acd9c7a504b75d4a712b39715c9f041f51bac5c6ce635a689a9cb628699e5895be4167ad5d25289b030900d4aa2c995052a704453ca8d9ad28684a961ecee9984a055a451011658fbee06d78ef79f086a6528e79c0acee695dd84a36883a3df7f48c9363f7314f5e519f64d06aa15e1e38defa9ac2f325e13c808a86de49ef3291ef69bbed1c297ba2a5b19ca729c5fc69bf1710300e0af",
  "dc2": "392c852e6be8bb2e4105862e5af76beec7e714d5f6e751651eb69e7a29d4a4c2f12075b1ecefa2741b7ce8af2ddf24e1f6e015447895f7e415d881d91a3bd730f3301b52b4d843da23c6c7ec8d6f33ad43c91b8af33cf245d7cde04dec9a635ac554bf2217157d3cceee45d3a8adec93ab972d8f15d4e4b19212c3b71c2ea25396a0dbf196900cef122b225aa6fed886df93825631d14bdd228ccb4d0eb17be7a87a4b28b87935b53d9ca2c6072a3486c15ca9e3727ab7d93601feb963a235a7beb77cf5ec38aa0c6877fe8dd76c9a1576341a9332973a205b7a06c7bf135b48398052903fafcdc4308c999000998047f756158f48a6c662312b04941d85daa7",
  "dcId": 2,
  "banned": false,
  "dateUpdated": {
    "$date": "2025-04-12T13:06:30.776Z"
  },
  "reason": null,
  "firstName": "Fedor",
  "lastName": "Naumov",
  "messageCount": 770,
  "username": "naumov_crimson",
  "stopped": false,
  "id": "7042757151",
  "remainingTime": {
    "$date": "2025-04-11T16:46:55.703Z"
  },
  "spamInitDate": null,
  "historySpamBlocks": [
    {
      "spamBlockDate": {
        "$date": "2024-12-01T11:30:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2024-12-21T09:31:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-03T23:00:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-12T08:05:00.000Z"
      },
      "spamBlockDays": 7
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-26T17:28:00.000Z"
      },
      "spamBlockDays": 3
    }
  ],
  "nextApiId": 2496,
  "twoFa": false,
  "twoFaDate": {
    "$date": "2025-04-10T12:17:48.065Z"
  },
  "automaticCheckDate": {
    "$date": "2025-04-12T13:06:30.776Z"
  },
  "lazyCheckDate": {
    "$date": "2025-04-12T11:42:50.298Z"
  }
},
{
  "_id": {
    "$oid": "6655a241f6c612cb5f719c31"
  },
  "accountId": "1716290280-115-support-new",
  "dc1": "394328358885abfa9c8afd93761a49e668c52047c94472c26a558d9064a35abd0607b83951b4a121938b769c393534a9c57c636c00dadb685e18b1e2ae1aa061b3d832da163aab5e83462a7c73e81ce7e68b9cae575175e021c7a5065db65a76adf15af7d236923fea0d820ea64424a9715ebceff3e51bec91258a2ef488bfd02e3ee082b471f5a558eeb3f315dc0f96a404d40d686bc9ea2f59f2688fbb7696597c56176f5d8a537c84b8619e988529191d549775a2cdbafbfdaf750e0f0987a22c8d2a8a70c044ab870ae72c41873ca240bccb8dd3f2e4b4d8ea359504d8644198188bcbc8fde277fe98d526293ac33fcd75791b03be2b4c95ac1fa490246d",
  "dc2": "846548bf756df5dba888a24641e21b6a27bb1cff3e7a5b51b94f4efa0284a4226a4f38094dabcb2b06738c6d9129178c4d32cc617e3d4fb3cabb2af60f7e7716bf36ba9b9fc01df728ee3afbad243d31c92c58c85864abe587a7bc7721357a09e9a1b46f29731c966c2a4357659dde039a4cd0a96869479c54688ba2ae65c6156db827edd65cd59127ac3ab18a058a39d86266bcd2d1d03ddd5b76b804c61324f6ba79bab61d42fc1236cfebfa0ddbf76ad76ab52b0df38e48d84c65619f3e55dd0ad2f0dcb193115379b269f7fe1cd1328f41bd514c4be066b79035c2e2e79f0e70f3044248184d04aaa3bf44f1030fb5f9be3f7e5b84765268d562cc35dab2",
  "dc3": "2057b9427f1d4a4a7b9e055fbbc1ea9aec84532574765f5d31a517b153baa60d5153eced73c1780eab9d1546087ceaf374c01381e5e497af83f7e1d6ec94fdbe2f46e0e6b0e1caaa13fa9b5fc1b85ff0d428c0ad249f338bd0a57658712a61d12b71bd92f90f36396984c238b11f087cc93d7012bfae31ef9221f68ec9c65167ebbd6a3f35ee159c771297db3a49fb3de9919783940a8c705cb7e908e72214d50a0b87af17bb87f4f8ef5b38c2ca56e46795b0fd4f1293546d79ccff2c9cc54d45ec74b13737703c6c2e2fff88d5efc2e4c8764d3d717c06e9ad65e9b5c50d93ab1cd4b0dfe4efc2179ab9e5ad98ba99004144f15355aed63342cf91e4ae1912",
  "dcId": 2,
  "banned": false,
  "dateUpdated": {
    "$date": "2025-04-12T12:25:21.082Z"
  },
  "reason": null,
  "firstName": "Vadim",
  "lastName": "Panfilov",
  "messageCount": 516,
  "username": "panfilov_petite",
  "id": "6731426584",
  "remainingTime": {
    "$date": "2025-04-12T07:16:38.699Z"
  },
  "spamInitDate": null,
  "historySpamBlocks": [
    {
      "spamBlockDate": {
        "$date": "2024-12-31T22:12:00.000Z"
      },
      "spamBlockDays": 30
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-11T11:52:00.000Z"
      },
      "spamBlockDays": 30
    },
    {
      "spamBlockDate": {
        "$date": "2025-01-23T13:47:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-01-25T13:03:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-01-26T10:33:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-01T10:15:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-10T07:47:00.000Z"
      },
      "spamBlockDays": 7
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-05T09:28:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-09T11:05:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-09T10:15:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-13T12:45:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-13T09:04:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-14T05:11:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-17T14:11:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-25T07:17:00.000Z"
      },
      "spamBlockDays": 7
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-25T14:53:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-01T09:13:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-28T05:37:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-05T11:41:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-08T12:10:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-12T12:07:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-14T08:51:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-26T10:33:00.000Z"
      },
      "spamBlockDays": 7
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-25T07:40:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-28T10:16:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-27T05:55:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-30T13:34:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-04-01T10:00:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-04-02T13:08:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-04-04T07:38:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-04-10T06:45:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-04-17T08:04:00.000Z"
      },
      "spamBlockDays": 7
    }
  ],
  "nextApiId": 2496,
  "twoFa": false,
  "stopped": false,
  "twoFaDate": {
    "$date": "2025-04-10T12:58:10.497Z"
  },
  "automaticCheckDate": {
    "$date": "2025-04-12T12:25:21.082Z"
  },
  "lazyCheckDate": {
    "$date": "2025-04-12T10:09:25.583Z"
  }
},
{
  "_id": {
    "$oid": "6655a241f6c612cb5f719c7d"
  },
  "accountId": "1716291488-115-support-new",
  "dc1": "8315d5ec638ab7687ad58a1ee4f137a6613953e50fe229732fceef4ca03f140b0a3f028bd14532e98a02da1a8729922ab63baa12f6cab6f75333d4cb6282b84533a5620ced168fdc3909c208cbabddc631ebb56793a5dae15091bfca9a2a984f69ca93d0b5795c16bb2ec24fb792ecfc9d03dc53aab996bd4e7ca3b366f71c5c9aa678209182f1a1ec8c6d185befe8ef06bf4529600b63b94847c17a901d2460e94a0c719e195b6f5452923a32e87e9b226c79772b69fae8ee036224d1225375f9ac92931358bb7c595a34363fdc3acc252b381de37ccb4865958fbce666bbd44bb7f829e77e337dcc8e42b31e344c11049bd9443cf2777b64cc70c21327894a",
  "dc2": "5ecbd4b2df271238ce46f8e83224accf3f0193bb88445bd7775728807bec0d40bf5eaf00e6c06ff4be31515febb5bf03cd81958375566c33c7dc804712c24a92cc0fc5d142110c2c58251dcb689dfe66e0c60f517d6dce4c4d15a17de86532e5209d4c1c4f58191fbb32b5ef3072f2d5ac2950ec4131710bed7a761da72eedbca289652a270ac960b5e091d2bcc1d8c13b16aef333ebf90e05b30f61414c4b89e53dfe24e09651f21d75a537fecd44ddd79bcd2035a4a7db012cc0062ad12d77179dffb5940bc7453e783eed66a6992cefe42efadb9630bed9fabed30872ba1c660352f76bf94ecb3354469add31deb4fcb50334b0e7d036daed8e2dedf4d842",
  "dcId": 2,
  "banned": false,
  "dateUpdated": {
    "$date": "2025-04-12T12:36:20.607Z"
  },
  "reason": null,
  "firstName": "Stepan",
  "lastName": "Bulanov",
  "messageCount": 229,
  "username": "bulanov_spare",
  "stopped": false,
  "id": "7168899505",
  "remainingTime": {
    "$date": "2025-04-12T07:17:03.920Z"
  },
  "spamInitDate": null,
  "historySpamBlocks": [
    {
      "spamBlockDate": "INFINITY",
      "spamBlockDays": 0
    }
  ],
  "nextApiId": 2496,
  "twoFa": false,
  "twoFaDate": {
    "$date": "2025-04-10T12:58:06.772Z"
  },
  "automaticCheckDate": {
    "$date": "2025-04-12T12:36:20.607Z"
  },
  "lazyCheckDate": {
    "$date": "2025-04-12T10:10:21.304Z"
  }
},
{
  "_id": {
    "$oid": "6655a242f6c612cb5f719d3f"
  },
  "accountId": "1716293448-115-support-new",
  "dc1": "1e2376c880b28079733bf73d8761a871d3facf0ff10b1e3d8bc159ca618cf36ac6c422250e50d16e76357929364629e0a24c016546435856101d20a5f0b250a691472ddf1b076ac59ca43dbb4012fed0a6e0a7de452c01fb3893a7f92863c9ba0e378d8c08fce856133ed44e33d1c799090bdcc50c628c78f0865f1806595c24c03945fbabbe58dafae1ec5d5d5dfe92529d13ddf769a4ab91b7da37a37847362579c86dd75646ae9268bd9e831c1efbbfed8fced551e8086249709928e3ff617ab7b2968ff2d1954c47af5221dd1ab47197b5e8e755b8726c96eca30ac545c084cd1fcfcd2ea84a3f1cf4734ebcf141d78df671c60d627c0a5da3ff720ae237",
  "dc2": "abc07943d418a491d0492f37100702624bcbd19d2e0cb5ad7202b0a7749045ae3d07dd5ebb2d4236c0365e27b33d0812f00147ea3810985d6144ea5aeeefbcbdf98beefb86ebbcf813e75d8508a4768b25f96f97649f2d42e97bde2448ea2dcc5a773951ff1a26b80454703edaf4b734887647941f87cacf3dad02f958e9e5360f00c8a755ee6bac2b9d372ee6d3bf9f12b49428ef6727056bd5b6ee073dee47e0905eae794545aebd61c3dc70978b4dfff17f80b329e5eb580c0a573c2451f24cb221658631590ed51978e9d6fa6c46d357fa7f2b6e1ae8d6628851e7bd354eb3ab0e9f459635f02303f59b8dec406c74794b907b9158e4c4fd635d6999ad13",
  "dc3": "1b970f75568c1bbc2467bd9d580f63c50a1177d6420bc9f99114f90a66f6778e2826ce1dd4bb0abaabccba9c32e6bc35d281b9701379d5b5600c590f0f3c19a6e973ce98d2207e19d0b1b7cfc00853e742bb2912fd1aeaf2fb7f177bb017162827a269fe1a19c34db8e9a7ca58d76cfeda7c31c44be19919242c2f3742ce8ceb10442d8f635374ab2c788eacddf786ea178d7c8a70f4b3ea190fc25169cdd5b5452e30ffb559a57cf03edf78c13dc1135d4e6e2c6502b7946560ba036ce0ea93ded128f53b871b33f18ced12b43da6f48afef10cb60d2e53766fd86f5e059069af8060f4add0eb11137e546af30d72fd58a5df199bb3319028c3fb2aa05c343a",
  "dc4": "19f74c85969225f40d032b86c2670b08c38c0082c72c07f08bc46405c54ba21b10ebc2bf2039cf6cb67ef1cee454fdccfb5ac6fa5d223a386ecfca2cd1b87fd7a07bcf1f3c4e230b9201c7b8793ffbbaee98045cdc536f0e786aef6b0e628feae43a1ee1a8cb64e9816a8e3f4c63ecfba9cd246626ebe012df6f4ce33bc28d0991c83a18d60ac2386c305ed40bde0f974d5883ba533f71f210150f04561981aa74bbe1059bf29883fbd98588743d25dcce8a1f248c90bad1ba13101e5c1cf28ec29e0667ba839c89ddc83a0a6ee008d09064581ae913b25ecafd700ad9a418198b9f1ad8ad81ac69f146cd7f32024cc793955758d248df132ad8af39286b50a1",
  "dcId": 2,
  "banned": false,
  "dateUpdated": {
    "$date": "2025-04-12T12:15:21.259Z"
  },
  "reason": null,
  "firstName": "Georgiy",
  "lastName": "Simonov",
  "messageCount": 360,
  "username": "simonov_zesty",
  "stopped": false,
  "id": "7145501770",
  "remainingTime": {
    "$date": "2025-04-11T10:35:14.831Z"
  },
  "spamInitDate": null,
  "historySpamBlocks": [
    {
      "spamBlockDate": {
        "$date": "2024-12-21T03:37:00.000Z"
      },
      "spamBlockDays": 20
    },
    {
      "spamBlockDate": {
        "$date": "2025-01-23T21:34:00.000Z"
      },
      "spamBlockDays": 30
    },
    {
      "spamBlockDate": {
        "$date": "2025-01-20T14:05:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-01-26T09:21:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-01-27T10:46:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-01T07:48:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-03T10:40:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-12T15:36:00.000Z"
      },
      "spamBlockDays": 7
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-07T06:42:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-12T11:41:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-11T05:56:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-15T13:34:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-26T09:17:00.000Z"
      },
      "spamBlockDays": 7
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-28T09:58:00.000Z"
      },
      "spamBlockDays": 30
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-28T14:20:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-07T11:43:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-15T08:09:00.000Z"
      },
      "spamBlockDays": 7
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-12T23:50:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-15T13:14:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-21T14:11:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-20T11:12:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-24T19:45:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-04-01T05:53:00.000Z"
      },
      "spamBlockDays": 7
    },
    {
      "spamBlockDate": {
        "$date": "2025-04-01T15:17:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-04-05T08:17:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-04-17T08:17:00.000Z"
      },
      "spamBlockDays": 7
    },
    {
      "spamBlockDate": {
        "$date": "2025-04-12T09:51:00.000Z"
      },
      "spamBlockDays": 1
    }
  ],
  "nextApiId": 2496,
  "twoFa": false,
  "twoFaDate": {
    "$date": "2025-04-10T13:49:27.864Z"
  },
  "automaticCheckDate": {
    "$date": "2025-04-12T12:15:21.258Z"
  },
  "lazyCheckDate": {
    "$date": "2025-04-12T10:37:52.836Z"
  }
},
{
  "_id": {
    "$oid": "6655a244f6c612cb5f719e5f"
  },
  "accountId": "+79319672378-115-support-new",
  "dc1": "40c4f44bbac064b6f93f1b27d6116c528297cf4951bbd7142c3bf794020e205e2d022e76674627684172fa923bbb138d0db52c0407a78ccdf168b452c1d46f27406c69e1f08a211dd67f15e6f5e7b673e1935d323051e347969cd8e550542b05c1b16aa3f62c30e1dbe0a56bdd0f50c4b8902fd458fc22fc599700dd68c3d0330dd41b690de4b86ec93902d6ce2781a2a65ad4b6d53ca49581741ad142b3b1f50afe2b5649591e3fdd8062c9234a03de2d83c35d50ccf1d6b0d67433e14254788ee369cbc1645572e0983b7527525ae21330b1b74eb83ab672a09bab382f1f55b403be027b68f9cf80a17455e2bef8d1acc32a869d7395cdc845b84cdecf689b",
  "dc2": "74206e31531e22c77dd6e3db91e5f5fa3ea838a5c9d5593d67d62c9c4605901373e2c6f8cc9b0304461ac6ab8d4706f41eb6b60421e52e9c415da612be64676708d2359d8256426210757f6d998afcab4a05483aa078b43087eb90a5a874678cd6cac7f11b2935a0f40cbef2008141d579d749da07e2c9ddad87c78fa8ebb798af3cdacd6d1df1b1abf431e4a654a7fd5f82c97893d8d7be21bbc0a48da024aa94f5ae3a95eb93a71f44937fcd0c20b15fdaab88bbe05beb19d52aae9ba2583add1ff553256ec686155fc4c849186932213186b1a77d831df1cebb359389946235a598a3a8e7fa1add14cf8466eacd80194d6c51196fb82a8498bf111952b826",
  "dc3": "a23ecdb133cdddb28ba8ce4900cedc65d3c1bedb9174c374a08a9be8b360ade0b8c42a94d7398fa3f27d8004234fd83f6c9705f7f2482b94a9b14004abb480269fafad6706b5a0f386fa5c53b5c9a06c7ad748d2f9b63b613521b656201ad76f773f0f64e365181fd7e308a858f419cf302c026e88f180b348faf68880fcdd3d50035c64681fd885a1d9b236016571d93f11ed333545d609d8a0223d3fb012e0a3b961639df193c52c92b93bd297728a5c36f305c38414559e6ce54bc90f023fb08daf3bf10fda0ead985a8e0f677970fce84e8cf9f9a266ed3b042e56cc4eec29629a9440dc5da313e5b1f6312c8c8b326cd3258a371151cd503cf4f37f54f0",
  "dcId": 2,
  "banned": false,
  "dateUpdated": {
    "$date": "2025-04-12T13:08:28.419Z"
  },
  "reason": null,
  "firstName": "Georgiy",
  "lastName": "Rusanov",
  "messageCount": 517,
  "username": "rusanov_abstract",
  "id": "7017686139",
  "remainingTime": {
    "$date": "2025-04-11T12:08:00.934Z"
  },
  "spamInitDate": null,
  "historySpamBlocks": [
    {
      "spamBlockDate": {
        "$date": "2024-12-03T05:32:00.000Z"
      },
      "spamBlockDays": 2
    },
    {
      "spamBlockDate": {
        "$date": "2024-12-07T13:31:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2024-12-17T13:09:00.000Z"
      },
      "spamBlockDays": 7
    },
    {
      "spamBlockDate": {
        "$date": "2025-01-17T08:45:00.000Z"
      },
      "spamBlockDays": 30
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-18T21:14:00.000Z"
      },
      "spamBlockDays": 30
    },
    {
      "spamBlockDate": {
        "$date": "2025-01-23T11:27:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-01-23T15:34:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-01-27T10:08:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-06T10:27:00.000Z"
      },
      "spamBlockDays": 7
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-03T12:11:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-04T07:05:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-08T14:39:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-17T12:30:00.000Z"
      },
      "spamBlockDays": 7
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-21T20:13:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-06T07:09:00.000Z"
      },
      "spamBlockDays": 7
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-28T12:46:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-03T14:03:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-08T14:10:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-19T08:56:00.000Z"
      },
      "spamBlockDays": 7
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-15T07:19:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-20T07:21:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-22T08:30:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-29T13:41:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-04-01T11:06:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-04-05T08:51:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-04-16T10:38:00.000Z"
      },
      "spamBlockDays": 7
    },
    {
      "spamBlockDate": {
        "$date": "2025-04-12T12:04:00.000Z"
      },
      "spamBlockDays": 1
    }
  ],
  "nextApiId": 2496,
  "twoFa": false,
  "twoFaDate": {
    "$date": "2025-04-10T11:29:16.462Z"
  },
  "automaticCheckDate": {
    "$date": "2025-04-12T13:08:28.419Z"
  },
  "stopped": false,
  "lazyCheckDate": {
    "$date": "2025-04-12T10:52:51.086Z"
  }
},
{
  "_id": {
    "$oid": "6655a245f6c612cb5f719ed8"
  },
  "accountId": "1716470547-160-support-new",
  "dc1": "9cee20d524ddd789703c115b185816d4c27c2e46b85a3ec7d17c44943906beadd3f3594895e16d5785f3ca8e9cd7462119b3d7fbcd341b1bfa1c2362a2157175ee598a13a39f7c59880b2ccf17833aff22a36a76573c54d421454071bb26d27bd2e71b25c902e3b01bdac84ac0ebac2b7bfa864bcfcc49ccaab7e80d8938531f8b211887e1ffe932ca62406bdddca6cc6a88318e7221f8b495c33b165ba7c5e6aca61e6a8993229869cb998e02b1f5075e0fecf3d023abb49c385abef52a157ad309ba08eadb69ca6e2309e0958d2073329fbee53edbdcb0ada7bd06e74399c461ff889deb1256b7b9cde68ca3227c5e94dc13b700635b28ca76eb175cd0d02d",
  "dc2": "876c894d891031ad8ce9316a79896f6e38155c2627d2a245af217ab47c3ab49514254499470f15429fe425330a2924db5e38d6262b696e1bef22c9f299322b7c4ee7e3dc8d5122cf547ca37dc4c0c5eb6dbfac27c6c1addec9b27a2abcbdaabeb7898cac93f005620d8fdfcf439b3eae8ab1827df17579beded1c3415893121505ab8c31107b30704e2ad11dedfd9eff10286af1e8daed5ff4fb7916be0d4c29a09bcef1e0aefdc2b8f05f9360c3f020b1c29bf5faed8958d5150c3c766b6e8f6c07414bc413074f70efa2488a2a1f22e51ba595f2b84eff0ea5f09402c6b33e024db3776be8d294325504bb82d6641cced8dc2f87b92465b2173b1ce94206ea",
  "dcId": 2,
  "banned": false,
  "dateUpdated": {
    "$date": "2025-04-12T13:09:28.513Z"
  },
  "reason": null,
  "firstName": "Timofey",
  "lastName": "Kashirin",
  "messageCount": 347,
  "username": "kashirin_international",
  "id": "6624816986",
  "remainingTime": {
    "$date": "2025-04-11T14:18:08.287Z"
  },
  "spamInitDate": null,
  "historySpamBlocks": [
    {
      "spamBlockDate": {
        "$date": "2024-12-27T09:15:00.000Z"
      },
      "spamBlockDays": 27
    },
    {
      "spamBlockDate": {
        "$date": "2025-01-27T11:24:00.000Z"
      },
      "spamBlockDays": 30
    },
    {
      "spamBlockDate": {
        "$date": "2025-01-21T07:06:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-01-21T12:06:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-01-23T07:34:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-01-23T11:14:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-01-24T10:21:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-01-25T19:48:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-01-30T15:24:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-09T06:07:00.000Z"
      },
      "spamBlockDays": 7
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-12T06:18:00.000Z"
      },
      "spamBlockDays": 30
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-17T06:11:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-27T05:21:00.000Z"
      },
      "spamBlockDays": 7
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-22T11:35:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-27T07:33:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-28T18:56:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-04T10:28:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-09T08:45:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-15T08:14:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-21T16:41:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-30T06:20:00.000Z"
      },
      "spamBlockDays": 7
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-26T11:59:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-30T06:05:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-04-05T12:10:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-04-15T05:48:00.000Z"
      },
      "spamBlockDays": 7
    },
    {
      "spamBlockDate": {
        "$date": "2025-04-10T10:38:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-04-14T13:17:00.000Z"
      },
      "spamBlockDays": 3
    }
  ],
  "nextApiId": 2496,
  "twoFa": false,
  "stopped": false,
  "twoFaDate": {
    "$date": "2025-04-10T11:29:12.693Z"
  },
  "automaticCheckDate": {
    "$date": "2025-04-12T13:09:28.513Z"
  },
  "lazyCheckDate": {
    "$date": "2025-04-12T10:16:22.512Z"
  }
},
{
  "_id": {
    "$oid": "6655a246f6c612cb5f719fad"
  },
  "accountId": "1716477045-160-support-new",
  "dc1": "4a9031546881f0f8584d4459e6e6231c548191527e5c8c7642d75cf2e66e52b6c8443de9200f0909be517aa1a3ca518f079e1b6b0695b4022991207a64e6007e890f4ed5633b3e67d632b00b919be882c0b4c7a82594407f47a52c0656aa7e84cbdd12ea853b43f8af197bf7f4755683b8e4fd88cf6f99d1388ec9442461cba49bec4638788d973fba11f5910b077bb4ce5a4c672b0da081fdf6912b375df4692fc8f68919a4c2b343805c81824276bbdcadacaccc83e5ca0a235322d721707586418fdcf94a37d2ac7363f2645ed93330422211a60655e0f83b3e39d505eecc4eda4a4a09b564dd7a98e4a26c373ff7422b09c3d11705c78da56e4937641039",
  "dc2": "06b259d30b5a55001b236fd6f2784b1de624264c7baac825a60fc66ce9b86c281f8ad64422e7336d5b34079bda28a49c0b8d5a52b342d17a0b81bc393bd1b310b01f0b69750b5532323f02c25b0f682a94db2c6172efd5487fe941e4f78f249ec45a8b5e7e69009f25d84c73fac5634703a529cdc437bb405d3c7ffe8bf9aa1e0f7de4de00053c53ecf9fde9f2047959263dab775bd839df206abb704e28e30b6dd3cc2843626f440c46414cfc7c31f08b125bfdc78b3bc8df88a6ab6f18f88de76f0cffe33878bbb69512f5a6f3355e27c8daec19a48fd7fd2c83d17bfb482996c1c8762a065524faaaf09094ffdd6b8ebc4fb88db7d2957a0a4f5f32b47d2f",
  "dcId": 2,
  "banned": false,
  "dateUpdated": {
    "$date": "2025-04-12T12:22:22.729Z"
  },
  "reason": null,
  "firstName": "Dmitriy",
  "lastName": "Kozlov",
  "messageCount": 351,
  "username": "kozlov_given",
  "id": "6460395189",
  "stopped": false,
  "spamInitDate": null,
  "remainingTime": {
    "$date": "2025-04-11T14:43:47.133Z"
  },
  "historySpamBlocks": [
    {
      "spamBlockDate": {
        "$date": "2024-12-02T19:00:00.000Z"
      },
      "spamBlockDays": 2
    },
    {
      "spamBlockDate": {
        "$date": "2025-01-02T08:09:00.000Z"
      },
      "spamBlockDays": 30
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-11T10:09:00.000Z"
      },
      "spamBlockDays": 30
    },
    {
      "spamBlockDate": {
        "$date": "2025-01-20T12:52:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-01-21T07:38:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-01-26T20:34:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-01-26T06:44:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-01-28T13:05:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-01-30T07:59:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-01-31T08:52:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-06T05:40:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-09T06:51:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-18T12:26:00.000Z"
      },
      "spamBlockDays": 7
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-16T07:14:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-26T10:02:00.000Z"
      },
      "spamBlockDays": 7
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-25T08:21:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-28T08:56:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-13T09:23:00.000Z"
      },
      "spamBlockDays": 7
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-11T07:59:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-12T04:59:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-13T08:42:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-16T19:14:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-25T16:15:00.000Z"
      },
      "spamBlockDays": 7
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-21T09:43:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-24T10:08:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-04-01T07:10:00.000Z"
      },
      "spamBlockDays": 7
    },
    {
      "spamBlockDate": {
        "$date": "2025-05-02T10:58:00.000Z"
      },
      "spamBlockDays": 30
    },
    {
      "spamBlockDate": {
        "$date": "2025-04-10T07:59:00.000Z"
      },
      "spamBlockDays": 1
    }
  ],
  "nextApiId": 2496,
  "twoFa": false,
  "twoFaDate": {
    "$date": "2025-04-10T12:58:05.474Z"
  },
  "automaticCheckDate": {
    "$date": "2025-04-12T12:22:22.728Z"
  },
  "lazyCheckDate": {
    "$date": "2025-04-12T11:34:49.115Z"
  }
},
{
  "_id": {
    "$oid": "6655a248f6c612cb5f71a17a"
  },
  "accountId": "1716482387-160-support-new",
  "dc1": "92dd4f13e83c41f5ff9e13d7e2d8fa7dc0549661ee9a5b3cb87e34836268de6bcd2b20c24767b90eef74d922ab52597ac3bfe44c4c175726691fa7402423a73228258457fa32fc16f4b4c4b41c4273b5f3c1b12300353e7fe8c522735783f4a2d581c9099321dd3b3710fffecc148745742d5ea338ecab3dd642a20f58c60be6743247b1e3faeac363ce8724b6889ba65e767fc5495cd5a8a179c72d34d25fe5e13d0e06c99f0f0a4229879937dd9c82517d942eeef80b691e226d21dd78cb48a0c5bda85f63b023c68005197dd5e15b3bcfc31c03817c9f821fe7f4f34dd12a7570651375433b214cee37df88eb8c569e5cb50c29615bf7b762d718bc9962d2",
  "dc2": "a8d1a3f0bd139ebd90eecbd67adeb06825b80ab0cdd8e1132e1bdb698a288bc7f3edabd80d81831f19d948e3844b6713786caa6b4986824345dc0ac22d6d0256ffb733ad12e2935cf7072fe04df6426cf908ecf1b33e219cc0aa40bc972924b649395635c4df94a9de8931085fdbd4e83b4167f3485f85d38aac7b7b6b2bdef4c85efa3cfd363c0f47dd40b359e859830d46f5efab1f13b247f9bec693563f08516a3e6a04baf9995b8edaad099093bb2529a67e11c43c1fad31abb909c8aeaa061483c18b12889d4a3a824906fcb0a6da1c3385e50cc604cab67ae55a9fa42f3d6d417a14846b639a519e1752a0f9e84ba31685f319c1099b6912795a1c2512",
  "dcId": 2,
  "banned": false,
  "dateUpdated": {
    "$date": "2025-04-12T13:01:12.775Z"
  },
  "reason": null,
  "firstName": "Igor",
  "lastName": "Morozov",
  "messageCount": 686,
  "username": "morozov_profitable",
  "id": "7179588822",
  "remainingTime": {
    "$date": "2025-04-11T10:17:11.713Z"
  },
  "spamInitDate": null,
  "stopped": false,
  "historySpamBlocks": [
    {
      "spamBlockDate": {
        "$date": "2024-12-06T03:05:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2024-12-15T15:11:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2024-12-23T12:31:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-01-19T06:28:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-01-25T10:31:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-01-30T10:06:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-10T05:33:00.000Z"
      },
      "spamBlockDays": 7
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-17T16:04:00.000Z"
      },
      "spamBlockDays": 30
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-20T06:15:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-23T07:31:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-07T05:43:00.000Z"
      },
      "spamBlockDays": 7
    },
    {
      "spamBlockDate": {
        "$date": "2025-04-09T08:17:00.000Z"
      },
      "spamBlockDays": 30
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-12T09:51:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-14T10:53:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-18T16:37:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-20T13:56:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-30T14:00:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-04-02T13:48:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-04-11T10:05:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-04-12T08:22:00.000Z"
      },
      "spamBlockDays": 1
    }
  ],
  "nextApiId": 2496,
  "twoFa": false,
  "twoFaDate": {
    "$date": "2025-04-10T11:29:14.918Z"
  },
  "automaticCheckDate": {
    "$date": "2025-04-12T13:01:12.775Z"
  },
  "lazyCheckDate": {
    "$date": "2025-04-12T11:42:40.904Z"
  }
},
{
  "_id": {
    "$oid": "6655a249f6c612cb5f71a1ed"
  },
  "accountId": "1716484329-160-support-new",
  "dc1": "322c2fe08a0c7abdbf9ca096ca6443631bfdbabacb0d70945a6095bf603eaa31686c276bc98161f19ff650d08c6249d2aaf39641d891ccdcb72b242a884d1845931787a18887859d8e975ec62c8dc7ded0ffcf53743f6bf1a6c08c90d61b120ba6b767490a85b255850dc3b860d5afac8322a4cb0beffc41b9e0d0ee6547e0e8140b32cd53c6df142c2756bbbb32cb160e50e8d964114a64d241640bbe0d04b2d1fd8dc6d1ba851194455943c25378c95a37c682abf191de059120faf38bbd8b4f1a3181bce9c20d223a9e7362428266a3b891027a4c95e8b3ad2a7157168727a3655c3e7560ff202c75622d476719ed0de49884226760405180ce335051ea1a",
  "dc2": "448235a447dd22e2b87b5030dafa00860cc1b3004dbc10be7bc43125eafec9d3b9c694fb73d14d0fb349d23e6e3e5363f982c0900f499d4cc78c1990fbf165deddc7641fae505f15a0900e8f58f924c5bf6c286c8cee6eb118b64e29ef6db45fb90387593cf40bbd2dbb44cae97dfc4e03574298b84de25226463aa5a575e79be052e80a9be05976430e68adfb2eee19caae35018a60bd9afd745f502e797587994a214bd4423cdb3f71521339deb4628153780ab844a73e2e7c0b52f4fb363c412262a5d83ec73d85bfb518f15f3552048a79a8e8d26f23e1c5b7ff2679d70a3bac93dea4b07758b5bdeeb0beaca909e3986ee14c36b118bdd56a3a7420af7a",
  "dcId": 2,
  "banned": false,
  "dateUpdated": {
    "$date": "2025-04-12T12:30:36.293Z"
  },
  "reason": null,
  "firstName": "Denis",
  "lastName": "Alekseev",
  "messageCount": 542,
  "username": "alekseev_electronic",
  "id": "7067276982",
  "remainingTime": {
    "$date": "2025-04-11T16:15:23.432Z"
  },
  "spamInitDate": null,
  "historySpamBlocks": [
    {
      "spamBlockDate": {
        "$date": "2024-12-01T11:29:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2024-12-10T08:31:00.000Z"
      },
      "spamBlockDays": 7
    },
    {
      "spamBlockDate": {
        "$date": "2024-12-15T07:19:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2024-12-24T07:45:00.000Z"
      },
      "spamBlockDays": 7
    },
    {
      "spamBlockDate": {
        "$date": "2025-01-23T10:51:00.000Z"
      },
      "spamBlockDays": 30
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-22T16:28:00.000Z"
      },
      "spamBlockDays": 30
    },
    {
      "spamBlockDate": {
        "$date": "2025-01-25T07:33:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-01-28T08:40:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-01-31T11:35:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-13T06:24:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-12T05:43:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-16T05:57:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-16T05:26:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-28T07:36:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-27T17:10:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-12T06:28:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-10T13:21:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-12T06:54:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-15T07:46:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-14T07:43:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-19T01:55:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-21T13:15:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-22T14:22:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-30T07:38:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-04-07T14:33:00.000Z"
      },
      "spamBlockDays": 7
    },
    {
      "spamBlockDate": {
        "$date": "2025-05-09T08:05:00.000Z"
      },
      "spamBlockDays": 30
    }
  ],
  "nextApiId": 2496,
  "twoFa": false,
  "twoFaDate": {
    "$date": "2025-04-10T12:58:16.127Z"
  },
  "automaticCheckDate": {
    "$date": "2025-04-12T12:30:36.293Z"
  },
  "stopped": false,
  "lazyCheckDate": {
    "$date": "2025-04-12T09:16:05.469Z"
  }
},
{
  "_id": {
    "$oid": "6655a24bf6c612cb5f71a3d1"
  },
  "accountId": "1716490885-160-support-new",
  "dc1": "7a4f721bfa890c123a02bb968dca5640a88bb4d55393e5a42aef45e8ff6c1e96fe4e53c4278b40ed442f8d32e983e531f5b1817a7397645ce1a4ca993a08fe21584dbdfbdc031947ebc1465204e343c4ce2c10e3b0ec75c1af76756ac3eff1ac6f7015b5ad0797a32f9c2bce32df4b439bc251871e89253364479f2466e8d2a01b6a74c713a3be5028469cb5abf94169dd05277bec1a2fa4f8323cbfc2a4bded0843210012bbc100a13b13a0f5d92105cfc169f46fd432bce1e3bd4a5d6b2ec5d80e116f671e325edeec0fcb69f1f0c40dbb1c668a102b544ae7c2a567fdf5bf517c484e94777352ee2f435e590985c79d21db94dd95c0417443028d1d4599c9",
  "dc2": "17cd9d63913358f05ec96702b773263f6e8faed451122b159101eef3abebbf2dc5ce10a219a3582cb528f9d9090f2672344c0928608ad254a1a9c382fe651858908b8af39129cbf2caf6c42ea929a16cb93efa2b3eb067ad22dac44430821b4ff07e14da6c54497c68c4243663b567a8ff4082945894e20946e5fb3c70a4ac70efe3a1f0a2b009faca7ec69debb8e904665ad2dfec12209f8802fd8731c6e846383005c773bb8cb07b3066be61c853a05fbd90e1d42cc4a9151bed983a77ad094e2f804170ce95060f41e5a8c8f2b56e97b17c657a5af81aad10249a489cb536928fd7fed5608bd89e0e72c6e0a1f80244bbc1be0eae0cd225447b35bb8da8e4",
  "dcId": 2,
  "banned": false,
  "dateUpdated": {
    "$date": "2025-04-12T13:09:04.442Z"
  },
  "reason": null,
  "firstName": "Igor",
  "lastName": "Glazunov",
  "messageCount": 512,
  "username": "glazunov_interim",
  "id": "6794198545",
  "stopped": false,
  "remainingTime": {
    "$date": "2025-04-11T12:55:56.028Z"
  },
  "spamInitDate": null,
  "historySpamBlocks": [
    {
      "spamBlockDate": {
        "$date": "2024-12-07T08:42:00.000Z"
      },
      "spamBlockDays": 7
    },
    {
      "spamBlockDate": {
        "$date": "2025-01-10T05:30:00.000Z"
      },
      "spamBlockDays": 30
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-13T06:28:00.000Z"
      },
      "spamBlockDays": 30
    },
    {
      "spamBlockDate": {
        "$date": "2025-01-24T11:44:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-01-29T11:31:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-01-31T10:05:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-08T13:56:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-08T23:23:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-19T15:07:00.000Z"
      },
      "spamBlockDays": 7
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-22T05:17:00.000Z"
      },
      "spamBlockDays": 30
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-25T09:12:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-01T13:06:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-11T11:31:00.000Z"
      },
      "spamBlockDays": 7
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-12T12:42:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-16T11:25:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-22T11:03:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-26T09:04:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-04-02T11:52:00.000Z"
      },
      "spamBlockDays": 7
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-28T05:27:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-31T10:20:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-04-01T15:19:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-04-11T08:10:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-04-18T11:13:00.000Z"
      },
      "spamBlockDays": 7
    }
  ],
  "nextApiId": 2496,
  "twoFa": false,
  "twoFaDate": {
    "$date": "2025-04-10T12:58:22.240Z"
  },
  "automaticCheckDate": {
    "$date": "2025-04-12T13:09:04.442Z"
  },
  "lazyCheckDate": {
    "$date": "2025-04-12T11:33:54.314Z"
  }
},
{
  "_id": {
    "$oid": "6655a24cf6c612cb5f71a429"
  },
  "accountId": "1716492179-160-support-new",
  "dc1": "352421cf1abbea2b01db63b88b6c13cb06a15c6c7c5d8152cb33adc22a9bf4904c99427a533d454151ec59d7580a26368400903f32687f927a2d9746291cfef4df06903185c3a78ed31fbf52c5b548834670739c31ffd913cfc0a39162806b22de6457441d0f6c81d66322ec0f8c5dfebc5686723cecbb489b8940f49bad7a691de3800abacebdea44ee4ea9e391ed1101f52ba60dc882080d29a24708b3569a56be377ab175ae633eb4b696ece75ea5a85cb3c498998cc5ce85511c78fea4c3a707bb91c60144e72ce3c32e611417b68d2e58dddaa27b17f31fb23f7f55e4a8a482532a4961ebe73d07d628c75fa062be7ac6d521ed758f8dd66503f2a5f6e6",
  "dc2": "0ea47a27d162059c360a2d6b364e524cc77c5c6efdf4a11eab9338333215bb9e682eca01c5c67fc8595c9547ce35cc5f25dc96828f30a60a46dd022a4b0b52495c87515d85a1d3f33e1c041b07378427cff0d88655dbe1ef2ef41ffe8697d25ecd0d9ad95850374825ceac799824b88fd89cfbd12faa113eab111ba4fb429a6368a2e13becee8130dd4df65e62b0de2b761928a94fb0caafe3906fbff83890b4bd5cff2c8c7487253da51d86975b006b9073b281bbd72d39c59d4938ab9f1531b7ec9d5d58404b34f1dd316b2dbf6f0df022eacda9f1ff8ac5bf147a2db6cd5eee96c1031082b0c4bda83fed6e98d80ee2a389baebbb8e9b1cb800e153b8da59",
  "dcId": 2,
  "banned": false,
  "dateUpdated": {
    "$date": "2025-04-12T13:07:16.875Z"
  },
  "reason": null,
  "firstName": "Stepan",
  "lastName": "Puchkov",
  "messageCount": 300,
  "username": "puchkov_big",
  "stopped": false,
  "id": "7071795587",
  "remainingTime": {
    "$date": "2025-04-11T11:18:24.008Z"
  },
  "spamInitDate": null,
  "historySpamBlocks": [
    {
      "spamBlockDate": {
        "$date": "2024-12-29T09:38:00.000Z"
      },
      "spamBlockDays": 29
    },
    {
      "spamBlockDate": {
        "$date": "2025-01-13T07:36:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-01-22T15:08:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-01-21T08:20:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-01-22T11:13:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-01-26T11:36:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-03T11:57:00.000Z"
      },
      "spamBlockDays": 7
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-07T09:08:00.000Z"
      },
      "spamBlockDays": 30
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-13T10:58:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-14T14:31:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-20T09:24:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-20T08:47:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-26T13:21:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-06T10:56:00.000Z"
      },
      "spamBlockDays": 7
    },
    {
      "spamBlockDate": {
        "$date": "2025-04-07T10:42:00.000Z"
      },
      "spamBlockDays": 30
    },
    {
      "spamBlockDate": {
        "$date": "2025-05-09T09:53:00.000Z"
      },
      "spamBlockDays": 30
    },
    {
      "spamBlockDate": {
        "$date": "2025-04-12T09:59:00.000Z"
      },
      "spamBlockDays": 1
    }
  ],
  "nextApiId": 2496,
  "twoFa": false,
  "twoFaDate": {
    "$date": "2025-04-10T10:49:55.989Z"
  },
  "automaticCheckDate": {
    "$date": "2025-04-12T13:07:16.875Z"
  },
  "lazyCheckDate": {
    "$date": "2025-04-12T10:59:00.793Z"
  }
},
{
  "_id": {
    "$oid": "6655a24cf6c612cb5f71a47a"
  },
  "accountId": "1716492256-160-support-new",
  "dc1": "3dbf649c792debfd776c2ae8a0151ffeea81c1421d3760e669372d9eb71253bb035a53d8846a89ffb27c7a9074b6c5d3fad9b598b5af05d9e3addb310e7ef075af8458cb4fb14a565c484d010c0829567e0ea875c3d023287bce36bcd1cf78bd80c59f43279b54be35c0a555110ea334357c336d2df999f9c976b12ebf702440f96b8ceccc5dc0b30f492d81ab6eed5af11f514b45ccc2a89ebaf6409810079c84d4ca8c491c4e4c97bf114ad4a38550f5052919bdbc545b98da76fd7fa94bd6656be9324cee89e0b7bb478c7b525a44fcc210561ab605441a2352fd04aab688f35797bd47a714dae44abe435cf32e4b79bde2c088448757207a3f58147b61af",
  "dc2": "b2a68ca4b6bec6dc9ee0f45a0de31c40a7736b37ef965d0b39135a579ac673b08dc2161207537979e1f926a3cc92c57c8c740a1cd2549695b2b94a88a5649e09524aacede74f7adb07e6702cfa31efa368d262d322fdde36f5c65b78d4b1e392aba0f223a953f88aa3558d5e0586add8158f403ac95756deea2de91bc7acbcfc3146b92755bc0f99dc9d40f70d3bd7f2db4e80a5c9d97247d3127543fd677bdf708ed2bca489e96483752d9a18da9a74b5992a849ae12e9a47293e7f02d780b0b29703ab0443eb292e500c2e09736d649dc0fbb0ebc3d65755e0de487b81654aaeacbe631023ab14fc6d41391ef4cd64d72b5a94479c14cc38885fb141586493",
  "dc3": "945352823e362889faaad37e9aaba28502ae914e6e55e82ee725bf993a41d04f58a3a0d6be754a6b6c0f0adf206e76584f2d0702bc8c3c29f4a37efec787aed3af00d624bfc3d9e4db4a12ca7960b130afd9e34ebf757f8727cf160116428205af69a8023379ea1df7974682c6850354922580670885c2e5e73e50226e9e22608f2887c475bf5c4cc8d904f5e01db62f4ba71971a321cee7be458e8a53e535059e00ea2f7331e1f0fdd5749e1f5b260518571b10ba4eb889722a8084406d4e0cf91334473e8d45ddfb080e25f524eae1218713ffcee7a8dbe51692d06d744759541c4a86848f189875b592fcb3e27ff43398283385ec96da5c82a48310d200a0",
  "dc4": "181ab359d42df24efb8cb628dd05f1fa781647ff6b9bf00bc1d1195e7f4e7ce0c43a5acb6b5fd8edafa77bff2f4deebff1119cddfc7cc72b043f0c4aeb739bf2bd0bfa2504dd5699a4a00cf3ab77e6be8c38ab9f4399dc358121e008a534671575cac648c71b2c1fcb341b163d70c13d45c1ffdc9343108e74c15e42261ca51d754d41d07ba76848057b35285e69f127bc2c040929894d55f5093d88455858e4cdb5f3a6980d5df80de2885997c79fe0cdeecfea9d8e131899abc78b8eeb92fa3173a22b2a8faa8fccbffb4cf3a552183480059a164c185bd9570605de562fb78fe83ff0281158a1b13e3a27ce8aace83a1c951945823f734dce2ae2fdfe5733",
  "dcId": 2,
  "banned": false,
  "dateUpdated": {
    "$date": "2025-04-12T13:08:17.435Z"
  },
  "reason": null,
  "firstName": "Leonid",
  "lastName": "Chugunov",
  "messageCount": 286,
  "username": "chugunov_satisfied",
  "id": "7086434582",
  "remainingTime": {
    "$date": "2025-04-11T12:18:01.887Z"
  },
  "spamInitDate": null,
  "historySpamBlocks": [
    {
      "spamBlockDate": {
        "$date": "2024-12-12T12:38:00.000Z"
      },
      "spamBlockDays": 12
    },
    {
      "spamBlockDate": {
        "$date": "2025-01-12T09:40:00.000Z"
      },
      "spamBlockDays": 30
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-19T15:15:00.000Z"
      },
      "spamBlockDays": 30
    },
    {
      "spamBlockDate": {
        "$date": "2025-01-24T08:12:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-05T10:19:00.000Z"
      },
      "spamBlockDays": 7
    },
    {
      "spamBlockDate": {
        "$date": "2025-01-30T13:26:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-02T14:09:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-10T10:38:00.000Z"
      },
      "spamBlockDays": 7
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-09T12:22:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-19T13:45:00.000Z"
      },
      "spamBlockDays": 7
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-18T11:28:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-22T19:48:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-03T07:47:00.000Z"
      },
      "spamBlockDays": 7
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-06T11:12:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-06T14:51:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-14T11:32:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-24T11:10:00.000Z"
      },
      "spamBlockDays": 7
    },
    {
      "spamBlockDate": {
        "$date": "2025-04-25T07:58:00.000Z"
      },
      "spamBlockDays": 30
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-28T11:03:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-30T12:00:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-04-07T14:02:00.000Z"
      },
      "spamBlockDays": 7
    },
    {
      "spamBlockDate": {
        "$date": "2025-05-10T07:12:00.000Z"
      },
      "spamBlockDays": 30
    },
    {
      "spamBlockDate": {
        "$date": "2025-04-12T10:21:00.000Z"
      },
      "spamBlockDays": 1
    }
  ],
  "nextApiId": 2496,
  "twoFa": false,
  "twoFaDate": {
    "$date": "2025-04-10T12:58:22.676Z"
  },
  "automaticCheckDate": {
    "$date": "2025-04-12T13:08:17.435Z"
  },
  "stopped": false,
  "lazyCheckDate": {
    "$date": "2025-04-12T11:41:35.996Z"
  }
},
{
  "_id": {
    "$oid": "6655a24df6c612cb5f71a55f"
  },
  "accountId": "1716494998-160-support-new",
  "dc1": "5b8caa6150e24975f6e725e7f4fd4e8e8e322b079d9ec15923ecf25b6c98bef34d06aa1f216024064c6045347d78cb78ff99434711f0a6fa37c42ab4c9058757a362843278971662cd36372fe8d500eaee924b70a0ad08bb6bdf37cb67526ba848178b1533b4419a47f31f20485043245f9d809d027209f051935f75e7c0aadcc66d36527c362db4599dfaf2125d277eec8e32cf36dd99342ab5845c52dd28fc49b1fcdfb43fb2293d5e64bac9399a05ece7ebf8ec57ace5fd66dccae8231da71ac0eb27b19a23e5e39d42a6a2aed8ccc0b90cf39dd608bdcb2c4f2a175a29fe65996771e74eafda58296f127fc8b0245043a7d001c651f8c6cc205280442aa1",
  "dc2": "418d937f01a743a7f0082affbe86def920d48c75f7ddc1da36707b4fdbda4e6b7c9651d232bf660cb2950df004223d9082a727a8e45697c507dee413f69b4608a1ead62bac14e82be82fb985d3aaa828add25ad5c0aae90b046dda59d74577804f79ca9f52e3207e4f6e3be8b9599f34c72a762419f94b9378a0ec6f2e94ad3bc0be6c22954b0322a9b77da9a34f4ff310f9ed3fd78c14cb1fb540dd05067b45c7417df76c43016c9bee017aa1d0d16f68c282a3dfe98781d28d533e41ca164965f2ef8c546631ab4b0630b9b6a345d634be35652270fadef243fbac2fb95298a117490f70f7a24d64bc53690e2d5765e1a873c29ad96792c010e4f36d4caac0",
  "dcId": 2,
  "banned": false,
  "dateUpdated": {
    "$date": "2025-04-12T12:36:38.229Z"
  },
  "reason": null,
  "firstName": "Fedor",
  "lastName": "Kiselev",
  "messageCount": 401,
  "username": "kiselev_marvellous",
  "id": "7054304625",
  "remainingTime": {
    "$date": "2025-04-11T11:19:55.982Z"
  },
  "spamInitDate": null,
  "historySpamBlocks": [
    {
      "spamBlockDate": {
        "$date": "2024-12-05T12:23:00.000Z"
      },
      "spamBlockDays": 5
    },
    {
      "spamBlockDate": {
        "$date": "2025-01-05T06:06:00.000Z"
      },
      "spamBlockDays": 30
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-11T13:36:00.000Z"
      },
      "spamBlockDays": 30
    },
    {
      "spamBlockDate": {
        "$date": "2025-01-21T06:20:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-01-23T14:24:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-01-26T14:42:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-01-25T16:48:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-01-28T13:58:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-01-31T14:17:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-01T06:29:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-03T19:46:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-08T08:27:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-08T09:36:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-12T12:31:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-16T10:23:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-21T09:21:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-22T17:23:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-25T05:20:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-27T14:18:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-11T13:10:00.000Z"
      },
      "spamBlockDays": 7
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-06T19:39:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-10T13:51:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-12T08:33:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-13T07:26:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-16T09:24:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-27T11:20:00.000Z"
      },
      "spamBlockDays": 7
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-22T13:11:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-29T15:37:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-04-07T11:15:00.000Z"
      },
      "spamBlockDays": 7
    },
    {
      "spamBlockDate": {
        "$date": "2025-04-03T08:50:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-04-06T10:15:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-04-12T09:22:00.000Z"
      },
      "spamBlockDays": 1
    }
  ],
  "nextApiId": 2496,
  "twoFa": false,
  "twoFaDate": {
    "$date": "2025-04-10T12:58:22.950Z"
  },
  "automaticCheckDate": {
    "$date": "2025-04-12T12:36:38.229Z"
  },
  "stopped": false,
  "lazyCheckDate": {
    "$date": "2025-04-12T10:02:23.128Z"
  }
},
{
  "_id": {
    "$oid": "6655a24ef6c612cb5f71a5e4"
  },
  "accountId": "1716495717-160-support-new",
  "dc1": "4ee90edc17c3a448e23ae8c7ffa90c2ab93c339c4503430c839efd0e7e678ddb071e655185b19fd14816c5fef12cc70989dbf908ffc41b8647a1c8da6273bce41031dc0736f7b5fbb5436181064da245a4f9fcd0211a90a0e6d9db57fe5ec58531d40351f17221ae0aff8a971b43024b97cb97cb16c65867b4a23b334ebb24dee5ee19ccf825b458403fee318c048ca8a00e56bdd9dcf2138b269c69e9063d5c184f28f73f10ec2b9ce13450eaafed9c6a2feef9f98ea8f41e6f5d8a479434d828c11d54aa36596712f6111ec3e2bd5f7a35f57e594c6d8158d6215df403338e4e945073374993e12269d24d71f17d3371ad06b5f6efa1d2aa05e80474352bbc",
  "dc2": "0f83c6197ebdd376d90c16539e6bf5cbfba1a63ccdebf1b7358d9b6c9b7d378a22313a4e5ad99fd632241cfe63fa52a146d800a4c5273f7d1ad6c674ec68bb0fd05500154493c958008e190fae43fd056a007b9a366b1c7ca2f62728d19e80e4b91ed7c8e669c97f2b78dbe617864f36fc9cd06e3e4de0c215ed2bfccf2dfde3c1a4547dd14f1d39876129ddaa67ce304a413397662cb7b4759ac68243aaffda7ad5826fab39488682c5b7410a74526f16c2fd243d1c21f27d9fa9ce8a1377eaf45509b5e343c0db7a8d04d81f429f686140086f2505208d5b1b95064a40ce80ee30c4c343c9321b99b2bf0d8f043c917df31eec5a18f6023e9a7b95cbccbefa",
  "dcId": 2,
  "banned": false,
  "dateUpdated": {
    "$date": "2025-04-12T13:03:09.950Z"
  },
  "reason": null,
  "firstName": "Timofey",
  "lastName": "Tsyganov",
  "messageCount": 671,
  "username": "tsyganov_particular",
  "id": "7109419021",
  "stopped": false,
  "remainingTime": {
    "$date": "2025-04-11T16:12:28.392Z"
  },
  "spamInitDate": null,
  "historySpamBlocks": [
    {
      "spamBlockDate": {
        "$date": "2024-12-04T10:42:00.000Z"
      },
      "spamBlockDays": 4
    },
    {
      "spamBlockDate": {
        "$date": "2025-01-03T11:17:00.000Z"
      },
      "spamBlockDays": 30
    },
    {
      "spamBlockDate": {
        "$date": "2025-01-16T11:33:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-01-20T16:28:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-01-26T15:03:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-01-25T05:25:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-01-29T08:09:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-01T11:35:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-02T10:02:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-04T15:33:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-05T04:41:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-17T11:40:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-19T03:55:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-22T07:08:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-22T14:42:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-28T07:20:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-28T02:43:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-03T07:11:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-07T11:42:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-15T05:46:00.000Z"
      },
      "spamBlockDays": 7
    },
    {
      "spamBlockDate": {
        "$date": "2025-04-17T12:21:00.000Z"
      },
      "spamBlockDays": 30
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-21T09:42:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-29T10:10:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-04-08T07:30:00.000Z"
      },
      "spamBlockDays": 7
    }
  ],
  "nextApiId": 2496,
  "twoFa": false,
  "twoFaDate": {
    "$date": "2025-04-10T12:58:21.947Z"
  },
  "automaticCheckDate": {
    "$date": "2025-04-12T13:03:09.950Z"
  },
  "lazyCheckDate": {
    "$date": "2025-04-12T10:18:21.401Z"
  }
},
{
  "_id": {
    "$oid": "6655a24ef6c612cb5f71a5f2"
  },
  "accountId": "1716495725-160-support-new",
  "dc1": "acf51375eb18a09ed92b0c8d74cceec492289a9478597612a5f00c608763ca95a43f5952571c5fcd6d632c36a8f8ef1a4e1d0ff6a9a2c2ab6000cdd9338bff0904aa1d7c5cff294e3e736a5276b9352fdcd9478b69cc32407d86ad578fecad53fb67bcc52a480210fd0051ad2ddf3101b53478e32e24871f345d0b89231f098be6944fc7c44983fea6f8e7633f4053a215d6cdf645bd02c98e01646492ef8d82f29c25e5ab0ee004a8656ad0dc815c4dc5d496c87a64bada9d96e66ccdde4f8425d9679cad7eba077f26f428ad1c1f36cdc89c03cd684736e5b5302482b4af675b1f6f38af0c09f9e4a6e6c59f813ac0970401e417a8cbfddd33a708e9cfa572",
  "dc2": "a36f212ac6171aa8127f37b3cb5e997f4d9c5604cf1965e9126e8146b6877689ecc17277d10769c8e3c7a90ca3e1a4f2d409866ad1d26d00a8510c8e6cd148e8304cf613c08df9d4d2a9a9916ae28bd772c52a58f499afc0e78dccb7ba3ca797f0d3f6858b2cdb01522345adfa2697d52f5525702f4c70c959cb5fd66161c21abe0b4486fbf13610cf1300553652d47681e3f8032be11a28ea05ced8abe0bdb6492e1a79a2f78162f6083f652c85f87db5de3c7c033888f2a40993b32d8326dcec081be8438c4b2349964307339caa78579fa83d9eed79d62e803ebfc811fda7372b62b218ef1c59fd48dab0a323635957bf3be73ce572cfc116bafea9a462dd",
  "dc3": "1996d1cadbe9fee56ab2809a37895827819cedc00bc1c36f66fa23d9a74ece67a7cf27b86bc1408470acc1f996770ad46d040234471e989ea1231283a91e473a5fc18022f0426b9519644192fe985f425021feebddeda78aaaeb2a7580f9be55f5278d1c9e1d3b38203633d1596e450b2d228fa97b244c97c1545309a52af388701068dc0122753d02bef6d3df124acbbd339c45115b7ef799546bb2b45599ffcdcf9c826a024b447ec1664ff61cd576ec3f1c4f202de992a5c3f011e1313d7ae8c87af909d2560c9d6e649655b39113589ba6bb22131a55f00b03b9ab4e4882c0dafef27254c88135b793de04ea75b14b2e9ac9e4c0225f416705edbd4f9feb",
  "dc4": "9b387ad338707e1420cc32ae13d0bd97cac5b8738b30579798a736d0929b40c86ab258c239d7e35e03ccd19c6bce48f72fb5c5b42a51879cd4623aa6e01dac4537c8239dafb79e0f39f25ee852dabaac24726dd26688fb846154014b098d33f173554721d79416654ebc88dea0a00b9b53d30e41c28de02cfc4a68399086b9625849ad753d60005007e5eeaf19d2caaee092747e16e6a7f1f8c60e7ce190d8bea44839c3ddcf2c3f100499334d6dc3837cc65b43fad4997e6d181c01cb841f470ef338484f4e53d7db526c5a8fb91a11a9a331ad03204af1d0fe3f45887c2410a34f3282936551f5a6eafca6291bdd52db3e6f0c5b53ffafb5a90a79e3ddb053",
  "dcId": 2,
  "banned": false,
  "dateUpdated": {
    "$date": "2025-04-12T12:32:42.784Z"
  },
  "reason": null,
  "firstName": "Stepan",
  "lastName": "Orlov",
  "messageCount": 317,
  "username": "orlov_gradual",
  "id": "6859625004",
  "stopped": false,
  "remainingTime": {
    "$date": "2025-04-09T11:45:43.777Z"
  },
  "spamInitDate": null,
  "historySpamBlocks": [
    {
      "spamBlockDate": {
        "$date": "2024-12-07T17:45:00.000Z"
      },
      "spamBlockDays": 7
    },
    {
      "spamBlockDate": {
        "$date": "2025-01-11T05:36:00.000Z"
      },
      "spamBlockDays": 30
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-11T07:46:00.000Z"
      },
      "spamBlockDays": 30
    },
    {
      "spamBlockDate": {
        "$date": "2025-01-21T07:06:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-01-25T11:20:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-01-25T07:57:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-01-28T08:32:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-04T11:18:00.000Z"
      },
      "spamBlockDays": 7
    },
    {
      "spamBlockDate": {
        "$date": "2025-01-31T08:50:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-04T09:57:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-13T11:14:00.000Z"
      },
      "spamBlockDays": 7
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-12T19:48:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-18T06:47:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-20T10:03:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-20T08:45:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-25T05:22:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-26T11:26:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-02T09:20:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-12T11:20:00.000Z"
      },
      "spamBlockDays": 7
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-08T07:09:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-09T05:08:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-14T07:23:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-14T09:15:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-15T05:56:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-21T15:13:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-29T09:22:00.000Z"
      },
      "spamBlockDays": 7
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-27T13:30:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-31T12:14:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-04-02T05:32:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-04-05T11:21:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-04-09T04:12:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-04-12T09:59:00.000Z"
      },
      "spamBlockDays": 3
    }
  ],
  "nextApiId": 2496,
  "twoFa": false,
  "twoFaDate": {
    "$date": "2025-04-10T12:18:10.516Z"
  },
  "automaticCheckDate": {
    "$date": "2025-04-12T12:32:42.784Z"
  },
  "lazyCheckDate": {
    "$date": "2025-04-12T10:55:52.238Z"
  }
},
{
  "_id": {
    "$oid": "6655a24ef6c612cb5f71a621"
  },
  "accountId": "1716495756-160-support-new",
  "dc1": "3195a32bd645f0eacba4baf882e31acccb513d6d25b90688b601c7694c528971026b3fc30428b0573854c560e1d13c967c43eeb08d15436e4dfb216c4dc6b53dcec9fd7ba0463d51f5bde0708f412b351b836f3f10f5495c11d02deadf997175acf86a34afe23a8cc57b803600f893af6177a550e03ffb12043626e008274e749c7d97401eb0b6070b6ba1c8e0b0b04750da30f3993eab6b29ff697d23738e7cdd57dd4d8b789d7e61173159cd46e46807045c861d37b6d290d78ffd661f4e0b544f73c5c8a36de06b8ef2c1db68d5707a5483a4af4805ed5a93e61313b7b2b7f71ff9c0872e2c5e4522dbfdb033cf0ffd2d1541d677c0e20d5593cc15d4e034",
  "dc2": "5b1fdf20d79123c1aabfe945313c17c70e1dc00ca88d419fd2d0ca3c532bfced1a6fa3a27c6fa11c58349b6b6c8fdd2fa2e31ad3f03e0a6e9215f97557e9f0527f0a1991fdc500d6afe1874a5213f7bd6613679da08c961f955e8d423437f4b9042cca52fecb12f54c8605757466c80e0564bd49f493b29849bfb2e73b5dcfa80b2a31079c7bff861f7ce8e8144e38a24b7e514dd8136cd796a7382f4e2a7c8ae11b93f7f6b543258a82ebdc09a14dfd587e01f8f9d50d52288bf1734d746b5b9a4e933e5203a63ca799cd324213df27d91f3b48006f13555264ed70dd765e1cbd8b18454ab2fe58a8d8600bb40452ef5a632c488345d3955c0c1edde686c128",
  "dcId": 2,
  "banned": false,
  "dateUpdated": {
    "$date": "2025-04-12T12:27:53.810Z"
  },
  "reason": null,
  "firstName": "Pavel",
  "lastName": "Bogdanov",
  "messageCount": 741,
  "username": "bogdanov_zoophagous",
  "stopped": false,
  "id": "7186120232",
  "remainingTime": {
    "$date": "2025-04-11T16:52:57.558Z"
  },
  "spamInitDate": null,
  "historySpamBlocks": [
    {
      "spamBlockDate": {
        "$date": "2024-12-07T11:01:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2024-12-29T13:52:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-01-17T10:29:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-01-24T16:16:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-01-30T08:13:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-11T07:38:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-24T06:34:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-02T10:08:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-06T10:06:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-24T07:28:00.000Z"
      },
      "spamBlockDays": 3
    }
  ],
  "nextApiId": 2496,
  "twoFa": false,
  "twoFaDate": {
    "$date": "2025-04-10T10:50:04.471Z"
  },
  "automaticCheckDate": {
    "$date": "2025-04-12T12:27:53.810Z"
  },
  "lazyCheckDate": {
    "$date": "2025-04-12T11:50:52.118Z"
  }
},
{
  "_id": {
    "$oid": "6655a24ff6c612cb5f71a6c2"
  },
  "accountId": "+79304762264-160-support-new",
  "dc1": "4d8d1d131a8c5c0486bc35c0d40ca29580c1fa420d800bfb429ba7abcab9e178d2a08e388cf4f90a12117ff2d0bfe8ddb5b2d3a5e8153009607ca0cca3eedad5246a2caebed637056d70025418ba56381b69b224834d4ed51f350b6e5d4bbc0a5f27dd65253ad6f0b5fc75ece7909a2c606ac323ed7cc7c9507dbf4a728dce9a5933279564e0fd444b28d5464eab24c74d5d221534922ba07f89754c9456d00ccfbc9fe68fdecc12417781ac7ca7aa170678c00b177878bc922e6d8423d02454482b0f3442765d815fa5480bf5463497dcf2896b73c336ec85c7a7188be59c0c91cda6075b7389ae4284541a2265d89b743fd6061d956d7c49bc33fad0a55f7c",
  "dc2": "afe2e5dfcefe93950b44182a0c526a728325b628c25a8f6eaeb0e8b2c2d3c5409743d15f90e361be36d22575b69ffc604b8f0968867e415b18f9ec95afc4305d60e0d1d96cfa1decaecb6e55804296056b0dae94c1f0cf7089e8b51859a0482cf15a5a16184b370ebfc6712fb230e4ef2be2b5b27e28db4063ced13d0bb75a22df8fc6efcd93fa666ddfebb0754a0cccc5bf5c248e8bb1ceb62e3c8277bf1366abec384fab262ce126b60eddd0c7cd9fd0bd7469524154e52e216da77dbac93e58062b6404e7dc2e7ff4e047908c2392ae64d135788cdbd8e9a71497d10a81fb6b637607a5bf57563000dbffb2ea0189f16e976d75786f50f2ac88239f0be3de",
  "dc3": "a93e50177c560b988600aae7509c16d9a15a1b9ad0575f3f98c55a175a263fed20beaea77d64d424cf41a248ec3e3bd61467777f85e0b91f8f0015974329d61814b39530555abd8dd94c97fb2135115fd67a0d0a76813e62c3b3a2d96a17815155d65176a1e10c9c57e2569cde92ecc9339ae7a13ef1211a1c48064b6340456684bca1da55d502a895c7296b47a89a16f631f3c1452632d80c5fe6c9062382c7393e0b762e864fb2e8137d98e01e8bda10694527f2440c36155ec755b295f12b0ef939dad5fad4b6caed6ef6687d7b3c6b08ee03ce5bde8615b3f32695e7df07f7ef9ac1942193e379f2b5437d1cc0404284b86ced4fdefd8a618152a3042e35",
  "dc4": "bdfc3a1468f1f0a0a399ba96c7098944df690e0e45f4a6bb66862e0f6ab4b242f32e0f89d2cfb30b3fb53da6c8cb3bbc1aa0423947115db85c90df3a21d6ee748e3d64c8260c5f730c543a1bd98cad988962ef67ccc8100ddfec30d0a6fac42d54d10272882442d901dcefc913a11456ddd8d62c9ff376f7eb71088f1b722a7b13c9ab5c851f972bf98d17ff0496e69b920ee96d6d690730e807de0f5bb037a2b226421bc0f64629f9c1c126027f6f6afbdce6bae63148e5b357cbfae535432425be3a4371975d909facb3271bfb6232f4d94c6b8f976e7cc65bbe9fd63b31e166502d5fec18e30917976e4ab97ae3a719eb837368baba6a2ab1a7100c987842",
  "dcId": 2,
  "banned": false,
  "dateUpdated": {
    "$date": "2025-04-12T13:08:17.029Z"
  },
  "reason": null,
  "firstName": "Dmitriy",
  "lastName": "Bukin",
  "messageCount": 542,
  "username": "bukin_sufficient",
  "id": "7121009910",
  "remainingTime": {
    "$date": "2025-04-11T11:22:23.256Z"
  },
  "spamInitDate": null,
  "historySpamBlocks": [
    {
      "spamBlockDate": {
        "$date": "2024-12-02T23:51:00.000Z"
      },
      "spamBlockDays": 2
    },
    {
      "spamBlockDate": {
        "$date": "2025-01-02T08:12:00.000Z"
      },
      "spamBlockDays": 30
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-11T19:02:00.000Z"
      },
      "spamBlockDays": 30
    },
    {
      "spamBlockDate": {
        "$date": "2025-01-21T03:35:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-01-21T12:46:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-01-26T10:54:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-03T12:19:00.000Z"
      },
      "spamBlockDays": 7
    },
    {
      "spamBlockDate": {
        "$date": "2025-01-31T14:08:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-04T12:13:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-17T12:39:00.000Z"
      },
      "spamBlockDays": 7
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-12T11:15:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-13T10:40:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-17T07:26:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-18T13:23:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-22T07:17:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-08T07:06:00.000Z"
      },
      "spamBlockDays": 7
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-04T09:58:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-09T01:15:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-09T16:40:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-12T06:32:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-17T12:52:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-28T12:06:00.000Z"
      },
      "spamBlockDays": 7
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-26T11:02:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-31T13:48:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-04-04T21:10:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-04-14T14:07:00.000Z"
      },
      "spamBlockDays": 7
    },
    {
      "spamBlockDate": {
        "$date": "2025-04-12T09:27:00.000Z"
      },
      "spamBlockDays": 1
    }
  ],
  "nextApiId": 2496,
  "twoFa": false,
  "twoFaDate": {
    "$date": "2025-04-10T10:50:00.064Z"
  },
  "automaticCheckDate": {
    "$date": "2025-04-12T13:08:17.029Z"
  },
  "stopped": false,
  "lazyCheckDate": {
    "$date": "2025-04-12T10:50:00.849Z"
  }
},
{
  "_id": {
    "$oid": "6655a24ff6c612cb5f71a6e2"
  },
  "accountId": "+79319672620-160-support-new",
  "dc1": "53db80434b5e471b2531a383650aea90dbae3784e71f3a54538a9bff4c8db88e86054318d830a8632f60ef48a1f61cca3baefef25f086ffb9ceb07b1f8136cb7939e38e9a2d3b3fe2c5035f8dd1dd31eeab7a5abd7b0b6e44bc2df570bc84efe82d0b57ac64f6a328fa24417691d05b0d93b627ca8155a89f43e140a6ee6ddfc31d74301f22e0ac04dab92777bc43ad56de8eb3fd5b5fb4627312c2d0cc2acb872f5d91f4696254b2af95f175af76bc7d994e2194b5d54ce14d9fe3c4371b9fc627145e85c3967239b9e55fe68198931dd35ea85dfe6175941340c889b77d179c5d879cb6598454d9efb1227e74ca7743291c6290e0c92e2a93519dedf20df25",
  "dc2": "69333ef70a259262c6f6bc01cb8619c7d2313a1a9088ac3b35c17d980a555a647c11f6ef2a231a28c02141788f2db5c20c5022488563022e2b059c0e068ce27ba4ebe66263cbe71aeffc91fcd487b5ed16ee3edef41ba06ac61461daa55ea568f54c9a765dc31ae0262984679567dabf2d4dfdc1de9364147971b796826c5361c80b8bd42bd7bf70649a7d465b9136f7fe756c31d306f85b3ebf149fcfdf2b28df467594b46b07aeb770141842fdf1645b2c5fd6eba06a9794f31a1860754d3cf50b7117788c8ab2d6ef8f78c449e095ca49a5deb5e905fc55ea947efa62d16dd0d93cfff086ba1d0585c3a3aa150a4324cf4006688cc145344d8354d5735e5e",
  "dc3": "07b94b113358fc474e6c9a80528c74fd21acee74e7b9f300fb8549656805586b540b7aad58e76c9682bab74951d14c4c766667a4ab7595d481658a390ee9ac57e9b269ee58bea88263ce0ff6fd75ad4d4b29b1e9a5d85e4b78a8af60ae58af7b3a80c9e12219f6990ee393f53f9949e257e75fd7da5a5132a21f3f745d1cab043218a05868f808a30b66000d2500aa7a7a1a12c4845564085b73d1085b1c9c56c63b0ef2745d0f58d53c5743f8ba32e1f2e1706d00ee623a2f1cfbbf7046d211a7503b4c711a130e0688edfb789d39ff23343015c4ac36aa884b1623f58b6c1e57296f16224a6cd57b3eb06aec010e96c669ba243cf62c2297dea5a347bbd1e1",
  "dcId": 2,
  "banned": false,
  "dateUpdated": {
    "$date": "2025-04-12T13:08:17.131Z"
  },
  "reason": null,
  "firstName": "Arthur",
  "lastName": "Rudakov",
  "messageCount": 408,
  "username": "rudakov_delicious",
  "id": "6842135075",
  "stopped": false,
  "remainingTime": {
    "$date": "2025-04-11T16:09:59.433Z"
  },
  "spamInitDate": null,
  "historySpamBlocks": [
    {
      "spamBlockDate": {
        "$date": "2024-12-05T08:51:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2024-12-12T22:47:00.000Z"
      },
      "spamBlockDays": 7
    },
    {
      "spamBlockDate": {
        "$date": "2025-01-13T13:29:00.000Z"
      },
      "spamBlockDays": 30
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-18T10:27:00.000Z"
      },
      "spamBlockDays": 30
    },
    {
      "spamBlockDate": {
        "$date": "2025-01-30T08:45:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-01-31T07:33:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-03T13:12:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-10T14:12:00.000Z"
      },
      "spamBlockDays": 7
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-08T05:55:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-13T10:15:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-15T08:07:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-20T10:51:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-19T10:04:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-20T05:30:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-23T07:58:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-25T07:17:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-01T15:23:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-09T14:21:00.000Z"
      },
      "spamBlockDays": 7
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-06T11:14:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-09T11:23:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-17T13:02:00.000Z"
      },
      "spamBlockDays": 7
    },
    {
      "spamBlockDate": {
        "$date": "2025-04-18T08:17:00.000Z"
      },
      "spamBlockDays": 30
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-27T14:57:00.000Z"
      },
      "spamBlockDays": 1
    }
  ],
  "nextApiId": 2496,
  "twoFa": false,
  "twoFaDate": {
    "$date": "2025-04-10T12:18:10.533Z"
  },
  "automaticCheckDate": {
    "$date": "2025-04-12T13:08:17.131Z"
  },
  "lazyCheckDate": {
    "$date": "2025-04-12T11:37:51.963Z"
  }
},
{
  "_id": {
    "$oid": "6655a24ff6c612cb5f71a6f5"
  },
  "accountId": "+79319672725-160-support-new",
  "dc1": "30861751dfcbc1dc6a7419d4e7870cc57203f5102998a4ed61240c1b35a0f54cff4db31d2de1f964a9a69640d68fbf6b0f14f05151c6e3a10b34ce41345b6899511df058079492dde580693d6395dfb4bc4e05b30fff392d782c72622f4ead1a357501c92825164df3e58402a5b31b6d1156492bd41146067f4799000041e638d833efdc56505a5697a0b700dd1f78a1944032bc39a5bb9888738268ea0b4763a0182c8dba060e8239f2fc551a78ad18c3cb29f6384f7498e6c0c11840bc38d10aa4e6f7288e9e8331969f553b80f2a22152f15f107b857d8bb950be3e9562c522e02a29627858e666e2ec3561e901c33618d16308905fcaaa88093fea0d316a",
  "dc2": "a21ad79628237b579cc4717ed8f117e1fb15b18d34fc5e0fad5e4335b7886120c186872f21ca38c39c57fe5a6cc7ad41407de76e9d9342d8436a2f9c2ac4c2b6e06b7b74f85bc22e0d39980370bc08a1ec1a1c8c5844a31e656b19fd5b103296055dc6bb57653ff69e1ba0b9301a94bc51b8eabe7cc69ae22a7013780b5a694e8262b4cb404505b4a2cea712fffc660c7449df36cc95cfbb3b8ca0945d321c50f72b8c8e1038c7ac440f5e891d5038c7f1da16cf48ff671114943cd10d94c851fe65e706826f031eee0a3de3a2401cf6c181079fcd48a96ef992a5367f5d7d6717a3cca838d0a47ecd9e47e72fc02ccbee8a214a57388fbba312832516ac6218",
  "dc3": "9e23bf9da22031220ba18e297470ab5d0c6faf0e10efa99f2f1566150307eaa4d1388d3e0f787aa0dca30a6560f4b8e4db041b2349e91b4d17eb3d5ec7297ddee292f17fb1945dbe3246a32536a4798e9246867aba202706e50b87917a0dbed19c5b64dc24170ca0e6eadef82461c14ac86c53c625ebf8dde9896808a85f98bba1a0818e68b924b5bd567b4a4017c42a25c473011205b78620547aa86a12829c11967734f65933a912b699f7b12cb019a3ddef22faa5c23335696afbabafa10662a7dc1b21a4b9c598a71ad26a05e694a7080358733e31795a0dcffd1cccf6b7b6956dd48ccfc820cdd1f1d31bc5522528c7a2c2cfe5766f960edb87877a493b",
  "dcId": 2,
  "banned": false,
  "dateUpdated": {
    "$date": "2025-04-12T12:40:54.141Z"
  },
  "reason": null,
  "firstName": "Gennady",
  "lastName": "Maksimov",
  "messageCount": 712,
  "username": "maksimov_subsequent",
  "id": "7002033331",
  "remainingTime": {
    "$date": "2025-04-11T15:30:49.049Z"
  },
  "spamInitDate": null,
  "historySpamBlocks": [
    {
      "spamBlockDate": {
        "$date": "2024-12-09T06:30:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2024-12-13T14:23:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-01-20T15:46:00.000Z"
      },
      "spamBlockDays": 7
    },
    {
      "spamBlockDate": {
        "$date": "2025-01-31T12:43:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-09T08:12:00.000Z"
      },
      "spamBlockDays": 7
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-08T20:50:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-13T08:04:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-13T11:43:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-14T12:54:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-22T15:08:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-25T15:14:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-01T20:38:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-11T08:39:00.000Z"
      },
      "spamBlockDays": 7
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-06T11:07:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-13T15:05:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-22T05:36:00.000Z"
      },
      "spamBlockDays": 7
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-19T11:53:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-25T13:38:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-25T21:17:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-30T11:53:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-04-01T11:55:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-04-04T14:42:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-04-08T12:42:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-04-13T06:09:00.000Z"
      },
      "spamBlockDays": 3
    }
  ],
  "nextApiId": 2496,
  "twoFa": false,
  "twoFaDate": {
    "$date": "2025-04-10T11:29:22.504Z"
  },
  "automaticCheckDate": {
    "$date": "2025-04-12T12:40:54.141Z"
  },
  "stopped": false,
  "lazyCheckDate": {
    "$date": "2025-04-12T11:55:49.474Z"
  }
},
{
  "_id": {
    "$oid": "665b281e0f6f6d945b56ab5a"
  },
  "accountId": "1716920431-support-484",
  "dc1": "1f4173976dda0e39a2901d8e71d28c9d3b779c572fb9896ac64c0486036add65c900765120f5276068dd9b0a5b172d3ba2dd9b6e99aba90bbd8c7789f0330d4fbf4d162ac5ca5b0e168d423634e69d53fe1a6d7d1eb0e5e2c93994dfe043f047f557bb38edb48ea5fcb86ef613eeea02e1cdf101c2b5eb7741185d121397662faa050eb1ea64558acf5e3f7483870e5a201ac4afb8adc769a0dff1f8bbee5ccbbc5ddea4a1643e7af12e795ab26c5a824dbecca099c3ffedaa959baf9725d49057e9643059082fc850c1690e4d1dab9a78d8b235fdb29406308134691e25ce259ed5d523f3dfb433a2f42774454736d8195776016188c2d1a4b3935ebb8c3685",
  "dc2": "99ccddc0f3f60fa94dc96863165aae69e2775ee729b0082ef605057501bb7c03b7aec04dbfb0319e24ab97bfebccd7709133a5b0e44dcb2e4d3cba2a9ffd2408a355d17fc04db9c4e34762985bd4db38e3315c6b0e63c7285fdf25f36bd2232d63ef6be1e0896357f6b5eaebcb2a6966fc769709b67af06f26abfdc4424322e346900b45ebd428433b5008b9f88cf7046ca7fdb1ea97ad27ce4e2c7eab6eb4a9f24c85fc97b62dd9afa11a29a984ed00ff21926bf31c124a9f44d73d68b4e09394fe51102ad854166b988ea7a9ffc964fa727b6f352bbb7cdc5426302462c63c83db23e74f3e0f61ca4ad92475fd9fde76d56ea7e059f665b9825ffdf6fed846",
  "dc3": "0a1b14d4a9fd693006f1f1d474a1c28971593632580bec48d24cb0da6c056fe69da61b2394c3a83ed489b42e1af573e19024bf1f115faf8350920d9dfc0b3ba37180b7636a42ef559ba248d97d00a87d70e9123c6d4dbcbadcb33d0dcae7039151fd8d28319de5ea3019615c0f9b71172ec2f75603a2a9baff5ab1847be13b2590d0f9599eda4fd55f673d9a2a0b2a6b696b3b129eb427850584f6d3b659709946950a4073c915abfdeb35984aa8f484b76f171f50af11489aea6fbe63e4a1cf51a7da175dc7d01159eba9e86b23410c7a438ef9085a5ca50184098b686a4e09b5420fd82d1f8c4732982fc229498ae40dad312146022b3dcc0ba4c2c1f88ff5",
  "dc4": "c718fac665ef7b49ad00559d01b79ba27a7a878f4ae027e3a2e7e7e32ca217336137075fb12b2a9cd2952e21518294a53fabbbd3a478ec7c5b06688c321fb405a9b3b183693ce55c3889048f98c4ee0f637aad6b7353d67027f37eedb378bf783e5bc85f10e3ca32cfeb97c804a7002ebe04c377aba9b9cf572e793559102766b01413b7e781f06c4abcfd6bfd1cdb3fbaa409ca22cdfb619222f3fec49023c217378d1fd0fadbb1855a7ad78a4b4b45d1e5944fea7c98a9acf1abbf9df47a80bad993fabd36f4bbfde89d33425d8ee0452ce77fecb4947046962b8575074384bb7fe0958f16118b3783e884d470394018f032907da3f656073e93f5a8c308fc",
  "dc5": "07c9510e4ed0baf953794140b8d44245c598b6defc71bf1a447df7ca7b6fea9dcc27185543a79a9e9e46bcbc55f92e49486c2e0dcc7c482d9bbb7250b27c15e557e74bbc1dcca21e7010ec5d3a56518e1f7b2083b28a5f59ac68354a5b4a8007a3f29c7ea47ef0637edd17390b62e9329bb0fca1a33fae72b216f1427f3505cde4a429d526defb0314fc0d8742582601015d929488dd1e582052a4fea16b60e795a272122ea1fce6648a21202ba3805da59cc4a0d6e88ff51f30e0458bf8fabdac713efce0333e63c588d4819c5777c8e20920c1af43e78f9cb76e3d8848ee75145aa73662160585ae6d0afd6496fac853c22e68083e5a1af96888a17654c4c7",
  "dcId": 2,
  "banned": false,
  "dateUpdated": {
    "$date": "2025-04-12T12:59:17.464Z"
  },
  "reason": null,
  "firstName": "Nikolay",
  "lastName": "Sysoev",
  "messageCount": 371,
  "username": "sysoev_fluffy",
  "id": "6463255624",
  "stopped": false,
  "remainingTime": {
    "$date": "2025-04-11T15:17:58.617Z"
  },
  "spamInitDate": null,
  "historySpamBlocks": [
    {
      "spamBlockDate": {
        "$date": "2024-12-31T08:58:00.000Z"
      },
      "spamBlockDays": 30
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-11T15:33:00.000Z"
      },
      "spamBlockDays": 30
    },
    {
      "spamBlockDate": "INFINITY",
      "spamBlockDays": 0
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-12T07:02:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-12T12:15:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-16T08:12:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-21T11:27:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-30T15:24:00.000Z"
      },
      "spamBlockDays": 7
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-28T05:27:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-31T06:49:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-04-01T06:27:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-04-02T10:19:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-04-05T11:04:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-04-14T11:56:00.000Z"
      },
      "spamBlockDays": 7
    },
    {
      "spamBlockDate": {
        "$date": "2025-04-11T08:01:00.000Z"
      },
      "spamBlockDays": 1
    }
  ],
  "nextApiId": 2496,
  "twoFa": false,
  "twoFaDate": {
    "$date": "2025-04-10T12:18:12.274Z"
  },
  "automaticCheckDate": {
    "$date": "2025-04-12T12:59:17.464Z"
  },
  "lazyCheckDate": {
    "$date": "2025-04-12T08:46:04.029Z"
  }
},
{
  "_id": {
    "$oid": "665b281e0f6f6d945b56ab72"
  },
  "accountId": "1716920459-support-484",
  "dc1": "bcd48ee66376734ed84441a31ef0408598d3d6f54b71f61472b0d944f1773455bac776d30543820ae55a44f9d4986588ba42c3632e8d2fcbf035822ccb6560dd3cba6432ef5f949c169d82aeda5163c0652360763470a6774182e87bccf525194c099608b8d79665073203228e31618092e8ae5f11545561c83aa12f2d8f4da93965adec297b929f39684f0b75189b54758616db42097ea50afec529614a24f2dffd592305d5b6b7f2224541f2bf9ce86f6b96312b24cb57c06f70d56d300ed71e6e80f41f069c22edde2e03c4f8bdae62dacfcb64fe0e1fcf0497a5bb76eaf963e6cd9e5792448105e958cad675b39b5cbfb0f175ebb1cede1c32977ab4af56",
  "dc2": "82619ae7dcacada1cf30daf2b9a7199481e03581cd7a094ca03a673052696b75a6e991df4fade63ee762622ad9744bd469a7984d61281fe589ff05ebac1cf65e55c02292b04eecb51950acc12226ae6f9050717fbfbd4f217d6fa607fa9db861e435292cc67f56a2d071af3b6fdb004b1c67064d47c0598a38e72d64f68bf0f3d00ffaba60cb79282bf6b9f5a3cc29a6bec1041dffdf7cd0e18062570dc3a465818e4e83df35b2bdda8b622749f47d5b6463d8f1e4bbcc1ed89a8efbc38f00af1029557546c6f690afa0c551c8ceea674a16887ff61998d5c9db95a02803c3c1502bcba4203da3f988214ac1e343d8d4fd0ee787aad8c2c4c030aaca19d970bb",
  "dc3": "50b4093fe4c0689ce51ae7282626f860dd9b4fb9a4207f77ab60249839ab2e751d0c259681bcd8ba946fbf74e4573e4e27f7595af4a86058725ed33e6289aee6fa1619824c721892917bed80597699fe05c32ec853c42446bcd91b26b740f1d29a8324188ce819c6a44a8d9b2cd70962467310a82f3ecb2daaec5b427d1d40b113c1560bf1b21c4fc3baf365302f59a7b98b3fc827cfa3609d809eff40693d6a7f6297cd8622be9d2e31efa051f5ca4916565d27e2d6cc58971a9a267aed93e9eafb21e59291575724c66b2f3f6bbd27b19a80d9c1d388724cc772c0a8f221136a306820b1814bbb214d8a84622d12f75e9b132391b4a26d96dba7bd5472d45b",
  "dc4": "02ad9811ce2ba58343b6abf663a18ca752e5c4c96e54544a22fffb4d6876518078edbcb1977b6b540f721bfb877987432f87a0cc90ec7076058163a3703e1f812d57229fbd328ceee73741483ff819b1306679a09063c2931715f5dd8b9c2a5298eb8157360f384262fb8fd07c025336e8d6d0c10d278716d57fdb8b6f0faef9cbb69d9ef15d9036802ad44414dd5cc5448de78b093dbed4c6338f255c71969c960d099a30fc634676873eb66d7e595baa23ccc05b34a060a2953884a25d762de2420a082314cb3599ee85341cc1e207097553c6482eefce0e0ac0fc5aa3c7ad17925bb7a26a147a64ccffbf76978cccc3c9756fef4681d99732a73b4738de17",
  "dcId": 2,
  "banned": false,
  "dateUpdated": {
    "$date": "2025-04-12T12:30:53.746Z"
  },
  "reason": null,
  "firstName": "Pavel",
  "lastName": "Lazarev",
  "messageCount": 305,
  "username": "lazarev_hostile",
  "id": "6269225729",
  "stopped": false,
  "spamInitDate": null,
  "remainingTime": {
    "$date": "2025-04-11T16:01:26.965Z"
  },
  "historySpamBlocks": [
    {
      "spamBlockDate": {
        "$date": "2024-12-15T12:21:00.000Z"
      },
      "spamBlockDays": 15
    },
    {
      "spamBlockDate": {
        "$date": "2025-01-15T07:37:00.000Z"
      },
      "spamBlockDays": 30
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-19T12:34:00.000Z"
      },
      "spamBlockDays": 30
    },
    {
      "spamBlockDate": {
        "$date": "2025-01-23T14:56:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-01-27T10:22:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-01-26T07:35:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-01-28T14:30:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-01-30T14:46:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-03T14:28:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-03T14:02:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-07T18:14:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-06T11:01:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-09T12:22:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-11T11:28:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-15T06:15:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-19T05:47:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-23T19:00:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-03T07:18:00.000Z"
      },
      "spamBlockDays": 7
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-04T08:57:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-05T09:16:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-10T15:18:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-10T12:17:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-11T08:29:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-14T13:05:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-20T15:54:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-28T11:35:00.000Z"
      },
      "spamBlockDays": 7
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-26T10:42:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-04-01T09:50:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-04-06T16:24:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-04-17T13:54:00.000Z"
      },
      "spamBlockDays": 7
    }
  ],
  "nextApiId": 2496,
  "twoFa": false,
  "twoFaDate": {
    "$date": "2025-04-10T11:29:24.062Z"
  },
  "automaticCheckDate": {
    "$date": "2025-04-12T12:30:53.746Z"
  },
  "lazyCheckDate": {
    "$date": "2025-04-12T09:22:26.501Z"
  }
},
{
  "_id": {
    "$oid": "665b28530f6f6d945b56c48a"
  },
  "accountId": "1716917736-support-484",
  "dc1": "a1e94df8c5465b8502a20dbb2eeaea75147fa999b0e0de875b2ae98846b4497ffbfe28e49260398a78388bef5527ca0708b74033c07a90f72e670b4ef29f9f64ab865e0ce39639b9bf9dc889bc4ebe115f07c0cc300c29973b4fdea2b274e5415e1170b51a172451be96f5679c000a45e70a38977056a9b3e3715a8ebece16781c784445b0c8002b3408c8735ba625f87344fd0fe88e2b21d13d3c4613e3d67aef61eebf93571f5df1390ae7a809332955d24d7ca3ed9acbfc79a9d46698a68fae2aa24e687038300a0b943b9964c98a2b65f8af8b74803cf425e0f1ce809345c2c63b6ae7c6457dd9890a8f473e71a35ab3c57aa89b78574e0b06eee46926a5",
  "dc2": "382d3e519653b2b06ad8354614375b450fc3e80e55f8b18d172125064fdd05c3f5ee4ab95bd17f020b99fd1764855e28b0073d3fd84df2d4ffecfb06fd9c8b53dd8d5f35d939105b7425bcaaf647b29a15f2e4bdb44f553d1b46db14da576f89d5d21b1bdc31df87586e5de789daa9408c83ebd019add148dc9e32f2c15edc4afec815b8c2523926291fbfdd701a07110d52131b2cf1713bc508476a2ac392ae02888ed53f3d74ce2e30abfce1dd86617e2f2b6a2a7951fd4c56c321301616a1110132a4662fb7990d2a5a7b72b24bb05161be621bf774d71d9c090df5f2b8376ea6de22b71a63db65f0adbe0e128d0698a0432e31e339609f293843d451cee8",
  "dcId": 2,
  "banned": false,
  "dateUpdated": {
    "$date": "2025-04-12T12:33:47.638Z"
  },
  "reason": null,
  "firstName": "Dmitry",
  "lastName": "Panfilov",
  "messageCount": 421,
  "username": "panfilov_genuine",
  "id": "7434754027",
  "remainingTime": {
    "$date": "2025-04-11T09:36:05.195Z"
  },
  "spamInitDate": null,
  "historySpamBlocks": [
    {
      "spamBlockDate": {
        "$date": "2024-12-15T09:31:00.000Z"
      },
      "spamBlockDays": 15
    },
    {
      "spamBlockDate": {
        "$date": "2025-01-22T07:51:00.000Z"
      },
      "spamBlockDays": 30
    },
    {
      "spamBlockDate": {
        "$date": "2025-01-20T15:18:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-01-25T19:42:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-01-28T13:24:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-01-30T06:04:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-01-30T14:23:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-02T16:30:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-06T08:23:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-05T12:48:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-09T06:30:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-07T15:48:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-11T06:16:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-18T07:04:00.000Z"
      },
      "spamBlockDays": 7
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-12T12:55:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-18T05:55:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-21T12:22:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-24T12:23:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-25T09:09:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-04T15:26:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-06T19:47:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-10T14:28:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-18T11:25:00.000Z"
      },
      "spamBlockDays": 7
    },
    {
      "spamBlockDate": {
        "$date": "2025-04-24T10:16:00.000Z"
      },
      "spamBlockDays": 30
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-29T11:03:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-31T21:39:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-04-06T11:35:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-04-08T12:29:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-04-13T06:16:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-04-12T07:36:00.000Z"
      },
      "spamBlockDays": 1
    }
  ],
  "nextApiId": 2496,
  "twoFa": false,
  "twoFaDate": {
    "$date": "2025-04-10T11:29:23.896Z"
  },
  "automaticCheckDate": {
    "$date": "2025-04-12T12:33:47.638Z"
  },
  "stopped": false,
  "lazyCheckDate": {
    "$date": "2025-04-12T09:28:17.614Z"
  }
},
{
  "_id": {
    "$oid": "66a4dc889252ef9fe41c3c1d"
  },
  "accountId": "1721770968-support-520-23jul",
  "dc1": "c28ed87439dac1e63d60453365b9fd1948ff4e36da8de964e35bf47ba99b8d92419ce359f82245f720f77a8ff9419136fdb37816ad93cd3f673e066ba64693c93b3a290caa153d9f7e38d0e01632de03a45b49528f1765a36e6dd839b83e442926ab151e8764598902dfc6e2fe315a93165f79f3bc4d08b2ba1c68ce05c837bac731e5ec25e8259d5acaa76a4148cf11dcd3a094e557dd5164baf11aa98e370351718ecd81ace7c18ac857ffde9e559909d30befa37d0cf8107168f6cbb630947152b50ad669a07337c08ab8b1a946cfec477078847d52c7811f441269ef6dec01acc1e1e1ead61002e4b1e1641d8422c2731e4d7500c4e49786091f95449201",
  "dc2": "4be72cfbcf59a9e2d92c49e6002d8227b8297fd39e1a348901b0af0d4aec66b48de65367a0a8b7d2dedf62a0bfbcfa3f616531e255a9d809e763b6853363e40362e218ebf4f0f6b1e5243fa2266e45951e41310eda55acab6866206f490532b4c716030b8e891834925cfea3f4bb9ee8e4f5951db1fea3223df08cdeb7d0df59306c8dfa17dc978f4f39473f489c9919d4e1aafa88627c4056b709cec96fb66eb5fd5e44d7c1c58aa459fe28c7867d74dc3b651086cdc9de699333852427329bce5f311cc9725ce6cb33a70edd16b79d6b21609e507db5dd1d7cd53245c3240a24bc489b5cd7619ab12b33e8f1d07c1f3c4d9d0c4e3df514ceddb86eecdbbba0",
  "dc3": "64921dea0d420ef9eff96b0889b6e2ce2de7f0ef64e69ad49ff6eee06636df4686fda646774cfb6c5bed96e31250d8b959fdfb5447a7d30102d8d19f51dca3e4d759159b6b1be8b38171b187b826e90f1a74100312ce3e47a8d03d14dba0128182a6bb08bb8a5e8477f4f712840013160818d0f8c22f94a85deb80e72c91a91db6371e02c81f89f3e6408c2afee771b425fc51d4bcab72ef6ad2de64bef36aeae45984f89ca5771c60903cc52c482b1070301d873b468b4e84584c0fbcc71e7b31681f1c789a7d141dd70397e974017283365dc252c9e3d951fde30596f11c3f414762365fed0b3865d13e0f7a0b17f215b82debc307dad69d64112a0c432027",
  "dcId": 2,
  "banned": false,
  "dateUpdated": {
    "$date": "2025-04-12T13:05:17.536Z"
  },
  "firstName": "Kirill",
  "lastName": "Zubanov",
  "messageCount": 452,
  "username": "zubanov_amaranth",
  "id": "1703741424",
  "stopped": false,
  "remainingTime": {
    "$date": "2025-04-11T14:57:07.863Z"
  },
  "spamInitDate": null,
  "historySpamBlocks": [
    {
      "spamBlockDate": {
        "$date": "2024-12-16T10:05:00.000Z"
      },
      "spamBlockDays": 16
    },
    {
      "spamBlockDate": {
        "$date": "2024-12-20T09:00:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-01-20T10:10:00.000Z"
      },
      "spamBlockDays": 7
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-23T07:34:00.000Z"
      },
      "spamBlockDays": 30
    },
    {
      "spamBlockDate": {
        "$date": "2025-01-29T08:22:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-02T12:00:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-01T14:57:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-05T12:33:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-13T05:54:00.000Z"
      },
      "spamBlockDays": 7
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-08T23:38:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-13T08:22:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-16T11:18:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-26T12:53:00.000Z"
      },
      "spamBlockDays": 7
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-29T11:50:00.000Z"
      },
      "spamBlockDays": 30
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-08T14:45:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-06T19:44:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-08T09:43:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-11T06:33:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-11T11:17:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-14T12:33:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-15T10:01:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-20T13:35:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-28T08:36:00.000Z"
      },
      "spamBlockDays": 7
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-28T08:40:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-31T09:29:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-04-01T13:23:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-04-04T17:05:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-04-15T10:03:00.000Z"
      },
      "spamBlockDays": 7
    }
  ],
  "nextApiId": 2496,
  "twoFa": false,
  "twoFaDate": {
    "$date": "2025-04-10T11:29:00.033Z"
  },
  "automaticCheckDate": {
    "$date": "2025-04-12T13:05:17.536Z"
  },
  "lazyCheckDate": {
    "$date": "2025-04-12T11:30:50.658Z"
  }
},
{
  "_id": {
    "$oid": "66dee201f856541e1b71c73c"
  },
  "accountId": "145-support-500-last-9-sep",
  "dc1": "82eefb8d1c4f77df6f58b4da5b54cdd0a8eed61eaa611b2292a13db27c685648df2906e525ba50c73a1d47c66950724c5fb12a464b319a078beb0761a8b4cdabfc104c614f6db0c173f2e75aee1e69e59102c974366ee687f8360dbaea2e1a579512f378333146f9e35fcc040b468ca62b330633cfc0d1bf45634b7dae87e6377ffca984c6531b0c1e05eb224b053a710e645105c591651d845283d788aa2238549e89002ffa8b8747324db59b5530b37eb2b1feb32e118a7b8d7ca3967cee8489db18b300726ddcb82e38148e8785a6622a6c8c02123be89635975a37ca0f2ab3c11ad9d419344f0b20cd6398672dff0cc8a3a5980a027ae0e2a1ac3785d2fb",
  "dc2": "b06133d4d65554177cd914a735311f20bed8fdeaa56e58af8cb8ccab819f1f604860396b34858a6b47f9a0018da5b734aa906e9f960465c36b4f94630ce028b95a0ff9769919f9354274b6660c316d23139ba91c3b62cfd0cae939e83564b949036b011464551c2e45807645e640f59912c068f4a2207e2581fde71f5c1bfadb7bc34e85a38d74b1e6ce7cc653f3f3613168dbb5dedc7178948bab9fd1da805cc64227dadc7fc6e316d0819eaaac33a13d41d92455a15eb558b3e505a8691145b95fabd3b2175b6f948c84e5c0f76e526abe38595627211b0b2784325dc8f765a5be9ad1f2dc47ba22cb78fffa21a86f82ba3bfea62972c0de0c6eb59d229ece",
  "dc3": "0bdec3d6f5f465609837a2af6bf542ef37c04a90a7ce89b11d291e74a2e2ffec4927f1a11352d84507e8b88dc22430698b151a89bc594ce136f31a501bf0c527f88f4d6942755ffb3881e367d5edb4b951fc379bdd6ba48f11cf007860fe95aa9bd97b2b5f69cecf3b504e9908fa998b28dcbe7b3e60a750a6b267eef8a8a784a5ab9bb913a74727c1ce7e6e73ec851f83ce873b1f607ce0822eecc9cc1a7b074a02696a4e8f13a6d61ff3a606aeddd23919fa8ce8d49f72b40191babbfcf0c1c90490a93aa739784ec8632bba0521e4226b450881e0b01c38ac795236a369d222e7bd88224d61fdf1836478bb569a21535289e36abfdff65b563e7e77aac397",
  "dcId": 2,
  "banned": false,
  "dateUpdated": {
    "$date": "2025-04-12T13:09:15.240Z"
  },
  "firstName": "Denis",
  "lastName": "Belov",
  "messageCount": 455,
  "username": "belov_managerial",
  "id": "7341434014",
  "remainingTime": {
    "$date": "2025-04-11T16:42:50.180Z"
  },
  "spamInitDate": null,
  "historySpamBlocks": [
    {
      "spamBlockDate": {
        "$date": "2024-12-06T12:45:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2024-12-15T09:44:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2024-12-24T10:06:00.000Z"
      },
      "spamBlockDays": 7
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-01T12:08:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": "INFINITY",
      "spamBlockDays": 0
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-04T14:11:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-13T08:51:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-03T05:43:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-11T12:43:00.000Z"
      },
      "spamBlockDays": 3
    }
  ],
  "nextApiId": 2496,
  "twoFa": false,
  "twoFaDate": {
    "$date": "2025-04-10T12:57:53.070Z"
  },
  "automaticCheckDate": {
    "$date": "2025-04-12T13:09:15.240Z"
  },
  "stopped": false,
  "lazyCheckDate": {
    "$date": "2025-04-12T11:37:53.595Z"
  }
},
{
  "_id": {
    "$oid": "66dee201f856541e1b71c74e"
  },
  "accountId": "151-support-500-last-9-sep",
  "dc1": "352ed496fab32dbd8c2d644b6c238d117428ac92b8ca793c926f22801d4b18518d958a67d87980269ad4827d7edc72805de881b6fbc2217df0e0ef5f681b4d57d6353321e23a45001fcb182ecde84dc4f199d541e4fb3588e7d629ef8dc13a66681df68a395b5f1a7a007001e39a811509107bba7985f857278f079e3609c5bad02223133996d9b3c9414af5ca00fcb118e02dcfe6e88ca8ed04d3e22a57393ee15af63a971646a1e01649c7dbc9729da84c08865043b9eaafc4ce4414e9c8d1173c354ff9cd85751dacf8a4c58acd6f84bd944a33d7b1ffab5380f344d3ea633abb78fcdcebc943227eed434604c752bf70b102f14b548eadc8319f35dbafc8",
  "dc2": "bdfcb50fd0221684d7dcb802f2a0aa83f255e18e5dab1e249ec38dc63c4ba046e147599a86fb447b7c9c19db89a8839f37833950ba89014e63e7bda2dfad63177c00426a8c2f04f3a5b597ad72a720824f25e8bbe3e73219b0d0178bd8d9609db6299042e90e80a5826cc1fdb13e08f27409c91b96d90fda2efa69d59edc6353e0bb2fa69ba4000f33899a177444d7b98d32e6535037b5eb9d0af2711e6ba57bfa3e92a06b5c2a024f5bb00e234744c000fb697a85d92d2f1411e2fb08da822e2c731dcad5c0bb012fe866304251ffa2b1c19a90a1416b526d7727007ae5bf4f7e18f3dad0d7942143d6126680ed70f190c631155e1c9034bfeb8a47ad6cbdeb",
  "dc3": "6b1554cb51177fa9e7d736c37a269b5044f88c9aa75913c0de75fdd633255d74c0c72c38417914bcb4bc12aedb0c70be726e02693110c596031f191680698276ebbe0ff3c9be78a2494c20a3ba9ebb24a77d437776c9405ceb543bdfef9776dd0630d68a82a566fcc4cf81849ce226846805d2ab0531236b3188f9146d59d85cc98ab4d690c47f7f4dca6506434cb2aa84bcd744aa6e0a787370fb0fa10c033142df6b044c3bd1025054d7bc601dd223907ea23dc05ed410f257073245d6e49d0aaa8227ef85e26a0a713dc08994c385830ba1dd55385a829d1e8bda4b7b6efcd75876835dd1f228a8a11afb6297e51fa65be501fec78f2dc5c2fc0ab5375c2c",
  "dcId": 2,
  "banned": false,
  "dateUpdated": {
    "$date": "2025-04-12T12:37:53.757Z"
  },
  "firstName": "Vitaliy",
  "lastName": "Rostov",
  "messageCount": 452,
  "username": "rostov_wasteful",
  "id": "7264175860",
  "remainingTime": {
    "$date": "2025-04-10T14:49:34.282Z"
  },
  "spamInitDate": null,
  "historySpamBlocks": [
    {
      "spamBlockDate": {
        "$date": "2025-02-10T13:33:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-14T09:47:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-19T08:33:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-24T06:56:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-03T11:08:00.000Z"
      },
      "spamBlockDays": 7
    },
    {
      "spamBlockDate": {
        "$date": "2025-04-03T13:04:00.000Z"
      },
      "spamBlockDays": 30
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-09T06:00:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-13T06:54:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-12T10:51:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-15T14:42:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-24T08:52:00.000Z"
      },
      "spamBlockDays": 7
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-19T11:14:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-20T19:01:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-25T13:11:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-04-01T15:15:00.000Z"
      },
      "spamBlockDays": 7
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-28T11:41:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-04-04T10:19:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-04-05T06:49:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-04-11T09:10:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-04-11T15:25:00.000Z"
      },
      "spamBlockDays": 1
    }
  ],
  "nextApiId": 2496,
  "twoFa": false,
  "twoFaDate": {
    "$date": "2025-04-10T12:17:51.767Z"
  },
  "automaticCheckDate": {
    "$date": "2025-04-12T12:37:53.757Z"
  },
  "stopped": false,
  "lazyCheckDate": {
    "$date": "2025-04-12T10:03:22.027Z"
  }
},
{
  "_id": {
    "$oid": "66dee203f856541e1b71c775"
  },
  "accountId": "167-support-500-last-9-sep",
  "dc1": "0dc0b2ba0b34f56677a08bffe4cdef5dc739172d58b77ec5d69346ac50ba7b8b8733fc14273ed62beeec21bd7cf2acb868eb65039320d829f3577690c9884a31535ed8d699028cd7afc14320c39072167997e4a31dd8ffef959d1bb39ac1d980f23cf92083cd2cafa51a4bb4e53cfd0790af852f6a2c6183d8fece601dbcfc2ac5582f56750e08ffeea8e075a714ba281248e5b796880d560e22927f7f3b88ac12f4a1a4a1358212058ba473d258eba3870f196576766cbeb6bb2049ed2dcedbcefde1c5a1ecb2af20545854b1d5e4da544329051e1a72d97979383a5314f6c10278458a1d060e485540acf77772ece12b59d109bce74e401002658a57794236",
  "dc2": "41f1066604897fa0ec2b3ed05306d7a85203980a19783e1ef70e64844620529fb68284e40b729f111803821234b22914a0733318bfa9f14bbb374d64ff5cf1456bcf4a0371a6b49776f0f3c416e464334be494d5003e15ad64129b89c6866c19581ba88db446ebb9021073e197631865b57c5ebc02c9addf73d448be39667f2d0ece40302f6aa0219a59a55120af2cce366517e82cff97dd3fc8977bbaaaf1b81a17ee69acb934a01f3d0c94a9ec088e15f8c054f800a68db2d6eb9aba3065dbc785e5078e775db3f046cbd776e95d7a37b24f715bc02e42358e04faffa8b623959f2d7189b007b8f0c7238ecef2abc0db80d2301b07ebb028eb5edefc369720",
  "dc3": "3825520467103fe46753f5229f39ad6bdc72c99541858a72e420960f3dca177ed45426b90288f3c7035bc4f97d3464d6c5ab42bd5a6f904836ede006fd685686dcfdb7b13e2fe7a63dbefec4b803c097b7d949fa98c9786fe503681ee5abe4b0c1715e24e627a6a23badab8214a75ec4b939c875975338992f553c7e3cd4eb16db94d6982123a5a5d336d3d191d24990d26ce6129edf49ef7dfa9c064df6da7d29388ca946d8eedc182ecc3385949c48eb7388a9c58298990eca202a6003f69d4dfdcbacb939b2cacd85cc0ecdf58a2b29badc2e2769786942ed631f71af1dcc623146e33333618d5522905bc6e4a5df5e150dec71ec35aedecc7c389ad628f1",
  "dcId": 2,
  "banned": false,
  "dateUpdated": {
    "$date": "2025-04-12T12:21:55.267Z"
  },
  "firstName": "Matvey",
  "lastName": "Popov",
  "messageCount": 489,
  "username": "popov_pink",
  "id": "7077064502",
  "remainingTime": {
    "$date": "2025-04-10T16:40:48.633Z"
  },
  "spamInitDate": null,
  "historySpamBlocks": [
    {
      "spamBlockDate": {
        "$date": "2024-12-02T13:37:00.000Z"
      },
      "spamBlockDays": 2
    },
    {
      "spamBlockDate": {
        "$date": "2024-12-08T07:58:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-01-20T14:59:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-01T05:37:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-13T12:40:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-03T08:32:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-04-07T14:48:00.000Z"
      },
      "spamBlockDays": 7
    },
    {
      "spamBlockDate": {
        "$date": "2025-05-10T14:48:00.000Z"
      },
      "spamBlockDays": 30
    }
  ],
  "nextApiId": 2496,
  "twoFa": false,
  "twoFaDate": {
    "$date": "2025-04-10T12:57:57.488Z"
  },
  "automaticCheckDate": {
    "$date": "2025-04-12T12:21:55.267Z"
  },
  "stopped": false,
  "lazyCheckDate": {
    "$date": "2025-04-12T10:58:37.685Z"
  }
},
{
  "_id": {
    "$oid": "66dee203f856541e1b71c780"
  },
  "accountId": "172-support-500-last-9-sep",
  "dc1": "9d6e8316aba52314046be786e0b7f754163a097c0238480af642401feb06d19656a71a25ed51cc5c3dd51eaa2bdd70e7cd9eaf1d0736e6b6433106c0db9be277d479450d263a0ecb5bdc861dd38bd645f552e690ac0f25679223459ab18bfa2e0065d6030b3eaa87f7639ceca1af0bab539e77fbaf743cfb609595314a85e47438c1f06ad5f615e8556ff939b65544cbd0ee48fd312f3ceb368b8fd30e5baa9d7130897d4324195b7b38d2998c17f59c01a26bc3f8ae8c818a0d9aa9edc08e1e639f3a3fe644350c6bb322b8c03b2b47f760914e2a366c763dd5f1e9ad21135ed219f324c4cb2f9bfd8e809c7d651fbe075c140d1b490a4c06ccbb729de1e964",
  "dc2": "3454a769b07cb8de8a2e738a667c4983286a254f6f43fb161e061765e0ca436d450ea5150cf4272cfbab29a40a31e4aae494364cd41bffbf68315aa6704d00e5874d5d6b10daa39e2c41dd555035ab4a21e1c63b5d48b703dfa8e45879c9ac69a6afaa5bd9a6e06a61980fcf77d63f01e912414df1d8096bf66373ec009e7d5ffedda750c254e6145f9267de2f75e25a22c2ce8797775e9defa59dde9650ebe360dbd0356b2208f7e4f52d46747ecf8429aece75dacf30972c625702ebff82478ad16f0067a73b2545ccfe6a7f7c56a12957512b1a6d1ff52148d446f048c4079f43e5a8501ed22f6110292c6fd6411a59144efcc33a6e2f1771cbfe23259573",
  "dcId": 2,
  "banned": false,
  "dateUpdated": {
    "$date": "2025-04-12T13:01:15.059Z"
  },
  "firstName": "Roman",
  "lastName": "Ermakov",
  "messageCount": 443,
  "username": "ermakov_abstract",
  "id": "7205094290",
  "remainingTime": {
    "$date": "2025-04-11T09:34:39.266Z"
  },
  "spamInitDate": null,
  "stopped": false,
  "historySpamBlocks": [
    {
      "spamBlockDate": {
        "$date": "2024-12-08T14:53:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-04T09:09:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-11T10:35:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-19T07:40:00.000Z"
      },
      "spamBlockDays": 7
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-18T15:15:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-27T09:15:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-02T12:19:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-12T11:15:00.000Z"
      },
      "spamBlockDays": 7
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-09T08:00:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-16T16:21:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-15T15:36:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-20T13:27:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-25T07:50:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-30T07:56:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-04-07T10:19:00.000Z"
      },
      "spamBlockDays": 7
    },
    {
      "spamBlockDate": {
        "$date": "2025-05-08T06:40:00.000Z"
      },
      "spamBlockDays": 30
    },
    {
      "spamBlockDate": {
        "$date": "2025-04-12T07:56:00.000Z"
      },
      "spamBlockDays": 1
    }
  ],
  "nextApiId": 2496,
  "twoFa": false,
  "twoFaDate": {
    "$date": "2025-04-10T12:58:07.022Z"
  },
  "automaticCheckDate": {
    "$date": "2025-04-12T13:01:15.059Z"
  },
  "lazyCheckDate": {
    "$date": "2025-04-12T11:47:53.387Z"
  }
},
{
  "_id": {
    "$oid": "66dee203f856541e1b71c784"
  },
  "accountId": "1722290638-support-500-last-9-sep",
  "dc1": "c46bad8892ee644eaf1cfa0706e26a059a740bc7df1f4091e0f90b49858a73f06e8198d4888a4747286c34a524ee721b6883fb5be452e45b9a3fd63d75dabc9b8e4758df56b5cabe070cfacf5b3a868d323b986c24e59840f5b59a852b4870a4b4af263f3d3ced13019371bc9220ba9a080635920ca5c638b1a2e2d23fe9b5f84e025b07293ee292047d13e61deac39f681e90c07fc16cc25f92db2488ab062a4192f81bdddc1db44e521a5590388600e4e038dfffce195bcea6b9112e6395151b3c817d3865992d9a232291e644d37bfbe4e9eb02e91c6c2698719a14ed5bdb6183267c35c954332391eb838102b4ec49f1ed511061e63d10368ed9a37690af",
  "dc2": "3a621ff3a2d7331d0b957ddc4fab4f93863746172719725273d497e02f7652dec6a19d7472972a32583703b95e3f869caec7149c97e9ff2b1d3bdbee9426deabe4c016f54b2df2bd382479c7affaf7f5baff31dc9065b8d81ad01e1ac6b6a3c70e23848d82f021b665b1b1d89a33b285622071d1484b4a733234d0b2e40742e99eb6e80e9f942b59056299a525193eb328b36ed791d73c238339bf5b27c7377fa1774e94616345d63576b577e888dc0ed8f8745279163dcdeb862c0cfb34c24e69bcb97133281d11a1fbd6baed4eb51ae28eaa4e6993fe308b16682c607ef2f22b543c8359fcb0828d0119e6c8cdb06be1b432b92bfd2f2d24dda72507e2201c",
  "dc3": "0a19f02af051abe8bd35fc2e593303358c5d5a697f47de0efe01314a8a2f9f2c6babe0bc7590b0f5877f3d02ec6e5509d0c70177108ad565f4254f549b6ee02023e18bc62e6868791608c4b26a70a15467c6fb0e04428539ac74bac764c4c347706d947f8f2533a56b7c049cd66c6aae3b556df0b36f3b4a439d8bfb5bdb3db5f50bca6f6d6146ee4fed618f9aab0deda83060466f206fed14bca941d0a953f32a1cb718dab3be59594d4beffb97338461dff6061a9c76b90c9de2bfaf6eea20c69ce49a579f912efc45abb9048d167cb556a42ded654636df8617b0f9ac34651e3045fd91e1667c6958c8c2496231656045ae504cc08b738943304ae9074bff",
  "dcId": 2,
  "banned": false,
  "dateUpdated": {
    "$date": "2025-04-12T13:09:17.482Z"
  },
  "firstName": "Fedor",
  "lastName": "Sobolev",
  "messageCount": 266,
  "username": "sobolev_great",
  "id": "6629444737",
  "remainingTime": {
    "$date": "2025-04-08T08:42:04.397Z"
  },
  "spamInitDate": null,
  "historySpamBlocks": [
    {
      "spamBlockDate": {
        "$date": "2024-12-11T07:21:00.000Z"
      },
      "spamBlockDays": 10
    },
    {
      "spamBlockDate": {
        "$date": "2025-01-10T07:48:00.000Z"
      },
      "spamBlockDays": 30
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-12T12:05:00.000Z"
      },
      "spamBlockDays": 30
    },
    {
      "spamBlockDate": {
        "$date": "2025-01-20T09:02:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-01-24T18:15:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-01-27T10:36:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-01-28T10:39:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-01-29T05:37:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-01-30T10:31:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-01-31T03:32:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-01T04:29:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-03T12:10:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-06T15:01:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-07T07:48:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-10T21:23:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-18T13:47:00.000Z"
      },
      "spamBlockDays": 7
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-22T07:43:00.000Z"
      },
      "spamBlockDays": 30
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-25T10:20:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-27T06:18:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-02T09:02:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-06T10:08:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-07T15:35:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-13T15:52:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-12T05:05:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-12T10:51:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-15T13:50:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-18T13:29:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-21T19:17:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-21T09:00:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-28T08:21:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-04-01T07:16:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-04-05T12:10:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-04-15T08:11:00.000Z"
      },
      "spamBlockDays": 7
    }
  ],
  "nextApiId": 2496,
  "twoFa": false,
  "twoFaDate": {
    "$date": "2025-04-10T11:29:08.243Z"
  },
  "automaticCheckDate": {
    "$date": "2025-04-12T13:09:17.481Z"
  },
  "stopped": false,
  "lazyCheckDate": {
    "$date": "2025-04-12T09:28:19.288Z"
  }
},
{
  "_id": {
    "$oid": "66dee203f856541e1b71c786"
  },
  "accountId": "1722290653-support-500-last-9-sep",
  "dc1": "a89a8f4345b5985e6d8e2c09175fabab13ef240f97eea558a803a1786962703fea0bc59471acf1bd9fa590c21e9fb3dc0fcd081dbd26c176a9ad1b98cb39273e81dbc9c5843807cc16c20680fe6f1422080c57355c22179db9a4b61f665339acf77e34d2bf5633ffba84c9c9b51a9dc45406f447165fb40d4c8a7af20df774fa61d1adb8ec3f7d6b4b30dc59a0c46d868db60bd19b32fd92f29abdf66784bbb446f85a46506fa7f9b955db11ad9fd33ccdad63290ed20d420c4979501e3c83b391bbbe93da1ed5d026eb735f7898cc9631f6f4870fe3a053f3927fb35761f0960baee74b3e925609f94683134cfca0a17d602361156e9e1d9264b31841ed2727",
  "dc2": "78710123def0634b6b40b2219e399b8a435bde239ba3418baf95ec65234a8c0a6941208cd2eb4422bb2b68c0824a4e12bf637e3ef747648f00cccb0c011d87b3dcea8f86789d5709a3794d1b6967dc03a9334ee00427a96eff27fca22c1f70cfeb1025d1ff2dc4a70a9c61c7780f4b75e1b2f00d05d0d3f46e09e7fdd0a788bc722c0bf209d66c75387621a42bd41c9068df3706b747a664199f0eb7a2576c321b51c0ecf4e1ffb35e49f55ffa9c121230956433f259149e396a6227a6e1930c1de47e2bd5027ae0038cde5519c2e0bcc91e163731e82238ed7f91c724e5719381cec5dc8f26c54d833629342fdc785fd5897280b41d6d90a4b0b5cbb4f3ce16",
  "dcId": 2,
  "banned": false,
  "dateUpdated": {
    "$date": "2025-04-12T12:58:17.706Z"
  },
  "firstName": "Petr",
  "lastName": "Ilin",
  "messageCount": 420,
  "username": "ilin_optimistic",
  "id": "6675005969",
  "remainingTime": {
    "$date": "2025-04-11T09:09:11.144Z"
  },
  "spamInitDate": null,
  "historySpamBlocks": [
    {
      "spamBlockDate": {
        "$date": "2024-12-01T10:24:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2024-12-08T06:13:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2024-12-12T03:00:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-01-31T10:28:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-12T12:10:00.000Z"
      },
      "spamBlockDays": 7
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-07T06:10:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-10T09:31:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-11T12:27:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-15T11:38:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-25T05:57:00.000Z"
      },
      "spamBlockDays": 7
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-21T16:15:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-01T13:07:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-11T06:31:00.000Z"
      },
      "spamBlockDays": 7
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-07T15:00:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-11T09:17:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-12T11:14:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-13T16:01:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-17T10:14:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-27T13:25:00.000Z"
      },
      "spamBlockDays": 7
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-24T08:15:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-31T12:46:00.000Z"
      },
      "spamBlockDays": 7
    },
    {
      "spamBlockDate": {
        "$date": "2025-04-02T07:54:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-04-10T11:57:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-04-12T07:10:00.000Z"
      },
      "spamBlockDays": 1
    }
  ],
  "nextApiId": 2496,
  "twoFa": false,
  "twoFaDate": {
    "$date": "2025-04-10T12:58:06.949Z"
  },
  "automaticCheckDate": {
    "$date": "2025-04-12T12:58:17.705Z"
  },
  "stopped": false,
  "lazyCheckDate": {
    "$date": "2025-04-12T11:00:09.557Z"
  }
},
{
  "_id": {
    "$oid": "66dee204f856541e1b71c796"
  },
  "accountId": "1722290751-support-500-last-9-sep",
  "dc1": "77934a00bbdf682094aba41d5fb39294b6d38ccc7a50a6a1f90b9f623375802c584e5b4f5e179e8208cc56412c0c1f78dc07c6636ea013aed33fb0978cdb835e10ffe381cecdd055ae3978c48b5b7148ac69da2673a828be481de8413ff996b77e9da534e3058fea2c0020d4d010c65de7a250ff78cbe3a97f3b5208481ef19955736a7533514631a79ce92d5eddfe0bfcf8ae260096ffcdb20c09afbd63d06866a1a665a35ad0d7a8c33d3358bfd4f22a7cbdae58ef566e3f2ae6e947fe22ac20a1e5cac9a8e07a938b0a96394df046490f2865ce677af4ec760c078a7a06959da3a05c5f54aa3f2d691c45db4f588e35c785744875de296a51870266198604",
  "dc2": "c3126af1a0d6478545f88774150f6978d325f0ad5c1065315476f67c5ee70d98097dee07cb4b89f3895c8cb6730a5eea787e5aa2e8a83fe14802d50580a8ac09879437d90ca8458c304c05e62e01299bdeb703aeccbef1a72758653d1d4b554b60fe4fc1a9c576bd26edc3df935c091e6701464e5f81447c0bf954f5903333cb035381584384882006b90c8f9fd4ca42edfd9d4f20fafbaf83c35cb532b8fd189bbb0bc61c2c45cde70dffc7ccd9944459fee5ab95048bc90a9fd6e77bac5b80f1d1e432b9ac616ba051175a5b2197977e9d94e0424e91afad77542b9fa9f3224b44379d41ac96aad542c478fd0642172ba604bef8e419550f9ddd4a6be7661f",
  "dcId": 2,
  "banned": false,
  "dateUpdated": {
    "$date": "2025-04-12T12:26:53.648Z"
  },
  "firstName": "Timofey",
  "lastName": "Shirokov",
  "messageCount": 475,
  "username": "shirokov_superb",
  "id": "7204541054",
  "remainingTime": {
    "$date": "2025-04-11T15:34:38.080Z"
  },
  "spamInitDate": null,
  "historySpamBlocks": [
    {
      "spamBlockDate": {
        "$date": "2024-12-07T13:30:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2024-12-24T07:30:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-10T06:59:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-11T08:04:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-12T13:43:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-16T05:34:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-20T08:46:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-19T11:08:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-22T02:20:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-22T13:15:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-28T08:30:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-01T10:15:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-06T07:25:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-07T07:29:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-10T10:58:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-18T09:07:00.000Z"
      },
      "spamBlockDays": 7
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-13T13:04:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-14T10:05:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-19T14:49:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-27T12:13:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-28T10:27:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-04-04T07:28:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-04-14T12:09:00.000Z"
      },
      "spamBlockDays": 7
    },
    {
      "spamBlockDate": {
        "$date": "2025-04-12T13:36:00.000Z"
      },
      "spamBlockDays": 1
    }
  ],
  "nextApiId": 2496,
  "twoFa": false,
  "twoFaDate": {
    "$date": "2025-04-10T11:28:59.924Z"
  },
  "automaticCheckDate": {
    "$date": "2025-04-12T12:26:53.648Z"
  },
  "stopped": false,
  "lazyCheckDate": {
    "$date": "2025-04-12T10:14:18.283Z"
  }
},
{
  "_id": {
    "$oid": "66dee204f856541e1b71c7a4"
  },
  "accountId": "1722290841-support-500-last-9-sep",
  "dc1": "132cb1e8c27116412a415abd5e2e1f792514ef03c35f370dffb3167ff443741037ff18b20f8dadedaa7b1b1d25e2aae034b5aabec1a579d0bb1c0e477747c46a39cc27a5a4485dae194d22b022a93fb0be639695ef723d9b030bd572b4217907378c5531dd003434979fa4d5096b2eb4df98ce84fb166f6a4b3016e412901b57683457ad62163150a767c1933f7a7015ad09ac9c91ce49eedb2504b200d585facccb4159783708c2d094d2c5b76391d9cd98f32613a38df964d2fd9fce24cf5cd4b3793a716abc49eddd17f69bca3a537bbe188616b36fa81fd85bee73a80518de3b3b221f469a45a504f24afb5d43df49b77be9e998ca98cf208d17076dffb3",
  "dc2": "11d87cce2d5bc1c4242c638c02e191e922a6d026b24301e9a0a7ad46dba6fa7973f7dfc20bac92322f518a5de8a07d596a103206704af848e615633fb072b1191f99e4a04d5a0ca310cdf361f599ca5c165bd86b99e75007b3a0219d499c5248ac0651b4fb07bf99871069a675f21d70048ee351b1cdfa5834db5c56c4e6e3950563a8a23636ba5f3d91246df33ace1dbbdb1ed03023da75d5b1fcb884077a8f69d46e43c5b0c5a44f441435528027eeaeba7424527f9d181d9d7adf948e237ce9b407986d6eeadd9110a7b4f4a584f2bb191dda246778aa26e78121ba5a34ebdf7438a603701911f4e99a012299ca2ac822f101f55d1ecb5b1941c66f6af6b1",
  "dcId": 2,
  "banned": false,
  "dateUpdated": {
    "$date": "2025-04-12T13:05:19.506Z"
  },
  "firstName": "Boris",
  "lastName": "Baranov",
  "messageCount": 433,
  "username": "baranov_smooth",
  "id": "7002279553",
  "remainingTime": {
    "$date": "2025-04-11T14:46:01.779Z"
  },
  "spamInitDate": null,
  "historySpamBlocks": [
    {
      "spamBlockDate": {
        "$date": "2024-12-06T12:42:00.000Z"
      },
      "spamBlockDays": 6
    },
    {
      "spamBlockDate": {
        "$date": "2024-12-16T05:23:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2024-12-28T10:30:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-01-25T14:07:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-01-30T13:11:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-01-31T11:16:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-02T07:43:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-05T12:44:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-13T08:04:00.000Z"
      },
      "spamBlockDays": 7
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-16T11:51:00.000Z"
      },
      "spamBlockDays": 30
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-19T12:50:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-20T13:43:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-24T06:35:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-06T09:50:00.000Z"
      },
      "spamBlockDays": 7
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-09T08:03:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-11T09:27:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-17T14:59:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-19T14:17:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-29T06:02:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-04-09T12:58:00.000Z"
      },
      "spamBlockDays": 7
    },
    {
      "spamBlockDate": {
        "$date": "2025-04-09T10:18:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-04-14T12:51:00.000Z"
      },
      "spamBlockDays": 3
    }
  ],
  "nextApiId": 2496,
  "twoFa": false,
  "twoFaDate": {
    "$date": "2025-04-10T10:02:09.205Z"
  },
  "automaticCheckDate": {
    "$date": "2025-04-12T13:05:19.506Z"
  },
  "stopped": false,
  "lazyCheckDate": {
    "$date": "2025-04-12T10:18:20.414Z"
  }
},
{
  "_id": {
    "$oid": "66dee211f856541e1b71c905"
  },
  "accountId": "1722777554-support-500-last-9-sep",
  "dc1": "b133a18e0938061eeec0755f0199e9a4d54eb3db7a8a5665376ccb76aa97cd6f56b5b2703577c374dda1bf63cd23be42bb735ef27c854e49c63e8a487743c19b445a45cb1b7ed631b55c2d0f96bcdf0baee9d8d3b29f49a5c8ec231ceb27fa680e8c4016f15bffcfbb42b16088a2814ef0b3e42f09040c2ba16e5156bce1297d6fa8aca4bf80080f2bcbeacd25d81e5444a0180471d35edd6bdfb75ef2ea31cd17ba5c7b67439dc017086fdef085a83510bb06551dbda739b33957dd8d9fb4386bdbda40d758ffb0d8850b2e97c3fc3dfaba7af3e327c652c547971f8d147be910458f906ed623fb532417298d1633cea1b911152077ed05a19ebbd73cd1f815",
  "dc2": "98666cb7df75ac344d187f2c5c1d590fbf6aaf2e6bfffa74d4880b4d3c8bcdd28973198da69fc5bfd496d2116279ad3a9525af32790f0c3b425da2461dffc52e447449c237e465184d8af7e5472ab5a64e785e54d9f94e4108465aa2cf3a2676793e0c5690afab67c29cbf7658267ab46905dcf09df5b312777c5b84976914c7e9a50833f66d1e386b4069b55fccc666013a120644c5d6e5420ff28cac9a76bb70cf2e9ac1841ca1cbf5a56bec0aa318646760e6f652fd3100004df505ae6e85a9573777b502d6e2647eba8b0c22e1c0ac7b97d7b812093b5461bf1b72dc0a4d970a8d4ba3ee095eb1345a49bcee094e7090e23c697ae7a8b5dd54a8096650f0",
  "dc3": "87ea83db22d9f48c927db9f00fcda591999d9992f715f0143e725be60d8fff942ef8cbdb0488bb090683acc03087669bad2e7663d11b4697796c62f7e1fb83d2c15839d9f69f5d3b41003157686fbcf774c1ed10247e59274627070abb58301b186ef5e38f1ba426ee180cf8d59ea5742c86c4b2d10a628165a823223570cd6f7fe9cc294b6d8e544b0ac53433ec5f0ff73fc7c089ac172dd230e89fa169cbd9789d4f19f9bfbe5d0a749a9568b50ca24ae20c3d9103b76153cd2fbbd5e6f6ba14f3a3aa8a8ef99f42c48e6e87fda01317069876ff2396cae2755f9f588fb5663c77c2b2f87a6b274e78bc57e9fc3ff7027dbc318a327445c01b32fd963fbebc",
  "dc4": "226cbb8e498576c57cd6db6326d40fbcd74120297ef95c8a1168d602fe360965df31d615305db3082a6da23cfb914574675a62a65977e89b10ac67b20c861f66b27aa981571e55ba391cde8fb1177cf31589758bac16407a5af7dc015edd37825666917ea25731ad29b64560b6778740030008a92cb4e8fe9b00d56ff5916fb540122f9fc95483682802ff6774fce5cabfa9cd5034e07a3fab56075c60d1210a5dad8420d91f11867b56a1d3765178d9292333606639f4e4b3a6a54a532e743074444c12d53bb18be0f629f3b59aa89ff822960427f120fa8b681e812cec1f1836b134f214b0c1577b252d895b16fe6fbd8ed813ff7008dae918f80f00a6c3e9",
  "dc5": "400ae4b9e7880ae81b1b94245eafe2c96b155c5e1cd0d59c5cc8537f952df5b30af7059acc6fb5c58410e4e404aaba51659bd1e3cbbb688e4e7c95720329c15595e9039e1c72d5edae528ce5f110a733ddd4d008eebd2bd575465c3a9e07b4198a44ed0779a6cd8d0a4e3d265f5639839023c812f891ac14783cf7d5097258201c0e542ade3d482f205f4d5ed7fdb0ac21cba48c8b1e2332dff507663b053d6a155dfec03144b707242b780bfd3e1e4ed74cb926af8cc8c7dabafbc168e495cb3d32f11342b1d8366a7421e18436f1add82f2783008904476d0b4f8ef4beb92bf24afce5ae31cbfc3b692eea03ec21995532cafa3d28d58d3aac38c0c5223b27",
  "dcId": 2,
  "banned": false,
  "dateUpdated": {
    "$date": "2025-04-12T12:30:00.803Z"
  },
  "firstName": "Denis",
  "lastName": "Abramov",
  "messageCount": 403,
  "username": "abramov_naked",
  "id": "7212838477",
  "remainingTime": {
    "$date": "2025-04-11T08:43:36.216Z"
  },
  "spamInitDate": null,
  "historySpamBlocks": [
    {
      "spamBlockDate": {
        "$date": "2024-12-06T12:31:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2024-12-09T16:23:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2024-12-11T12:10:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2024-12-16T14:32:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2024-12-18T14:02:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-01-14T08:51:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-01-30T09:55:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-03T05:21:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-03T07:33:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-17T08:48:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-21T10:56:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-15T07:41:00.000Z"
      },
      "spamBlockDays": 7
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-11T08:12:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-10T11:04:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-13T11:39:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-21T07:34:00.000Z"
      },
      "spamBlockDays": 7
    },
    {
      "spamBlockDate": {
        "$date": "2025-04-22T13:30:00.000Z"
      },
      "spamBlockDays": 30
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-29T15:51:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-04-04T17:43:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-04-17T06:04:00.000Z"
      },
      "spamBlockDays": 7
    },
    {
      "spamBlockDate": {
        "$date": "2025-04-12T08:47:00.000Z"
      },
      "spamBlockDays": 1
    }
  ],
  "nextApiId": 2496,
  "twoFa": false,
  "twoFaDate": {
    "$date": "2025-04-10T12:58:04.700Z"
  },
  "automaticCheckDate": {
    "$date": "2025-04-12T12:30:00.802Z"
  },
  "stopped": false,
  "lazyCheckDate": {
    "$date": "2025-04-12T10:38:51.290Z"
  }
},
{
  "_id": {
    "$oid": "66dee213f856541e1b71c944"
  },
  "accountId": "1722780864-support-500-last-9-sep",
  "dc1": "6af5d68a2a79013ddeff7f2d635c7b069daff23f3f7ec9563ae0ff713205a4b48be846291c2369a3c4ae6f99a70e3017aa6162b98ec81b19b05687f833bb64e703a9f0b853c1e3108bfbc59568561868ba4faa5c44ee70b2bff9c0bf3c5d8a4c32393bc679c2baf495f2e99092c083bb1cf0060d3cd8466fa32d9def242886c80b61c503b0bd810483fd8918573c5912e78647e2c67b9616950457669ee34d38ce74af6063c5d08f4ea86966f4af929de7501c6d05ff757f313eacc04ac988e9ac6a9cd5bbed41b42106bc44684917388d4d4d67010e966736e5681328493454010c35b9a86d114a9ca3e8b35194283703b8c565d7faa9f0d9dc8135000e4493",
  "dc2": "79a34dde8d01514d9b64cdedcf98bbf267c14f06cc04d0d470b5f1c6b4ffccfaf34a42e6a8db1ff22d3549de39c42d3b0ed5b742675bb35fb2efbd05ddfe6b4e26d073c2737fac4d780b71b7bf7e46704c8685c8350e66e3f4b65eb0779a7d57e404dc63aef777f947e69eca514c2b3070b62c6ca0170296db2a9b8253fbb274b4caf9b3221851302eee21280304fb91cf2275aa45c5767ef1b78380fc87a87b51cd03fc73970ea9902cf69dec7128e37b926949cbd62793ba810c9ccbc2eb3a0cd5a249470b77d67965b33407238a5e504d1b3b6ab98a177dd379bfdde9286c62d0af42a7f12162d30777273830672c2955a9fc266186d47a2ed16ae1e4f36e",
  "dcId": 2,
  "banned": false,
  "dateUpdated": {
    "$date": "2025-04-12T12:23:00.404Z"
  },
  "firstName": "Victor",
  "lastName": "Timofeev",
  "messageCount": 339,
  "username": "timofeev_flying",
  "id": "7240084212",
  "remainingTime": {
    "$date": "2025-04-11T16:17:23.474Z"
  },
  "spamInitDate": null,
  "historySpamBlocks": [
    {
      "spamBlockDate": {
        "$date": "2024-12-04T12:05:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2024-12-14T08:41:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2024-12-25T07:18:00.000Z"
      },
      "spamBlockDays": 7
    },
    {
      "spamBlockDate": {
        "$date": "2025-01-24T10:55:00.000Z"
      },
      "spamBlockDays": 30
    },
    {
      "spamBlockDate": {
        "$date": "2025-01-25T14:20:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-01-30T15:01:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-07T14:40:00.000Z"
      },
      "spamBlockDays": 7
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-10T06:46:00.000Z"
      },
      "spamBlockDays": 30
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-12T09:33:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-14T14:18:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-18T07:36:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-25T12:12:00.000Z"
      },
      "spamBlockDays": 7
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-28T08:52:00.000Z"
      },
      "spamBlockDays": 30
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-11T08:15:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-12T10:48:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-15T11:31:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-25T08:01:00.000Z"
      },
      "spamBlockDays": 7
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-21T09:26:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-24T11:24:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-27T12:38:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-27T11:26:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-31T07:31:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-04-08T09:56:00.000Z"
      },
      "spamBlockDays": 7
    }
  ],
  "nextApiId": 2496,
  "twoFa": false,
  "twoFaDate": {
    "$date": "2025-04-10T12:58:05.499Z"
  },
  "automaticCheckDate": {
    "$date": "2025-04-12T12:23:00.404Z"
  },
  "stopped": false,
  "lazyCheckDate": {
    "$date": "2025-04-12T11:46:46.099Z"
  }
},
{
  "_id": {
    "$oid": "66dee215f856541e1b71c976"
  },
  "accountId": "1722784097-support-500-last-9-sep",
  "dc1": "1968ab4fe4187ebff06020dfdf778e6d74d47216cdbc874152f7451e1330087836a835cc83a7daee1e312fbb4959bcdfcbb54912352d0fb1fa2c65249151554ee4be4dbcf2bad6ee2967fbb10b7194e50cf4df50e1bcefd5cbef423de8a9ec686b76ef4283e5adcf2406aab7cc05d808c303e42b9cb6a3b1f6221fdb43bf98fb64daf7c63baf1815177363e27418ea8635f2cee7f3206c2987f1b3397b66f58633a1e77d4fcbae23428b12e1dc2bfa14b9da40c1b2cff9d6fcd466525626669be96ca60e8fc6e7d5eb5e2b60cdc9ce652dc7d5deb6f7e106f5ff9a8ed730ad2ad58dc48af1513a63446f3be0bb431c8adfa68f2024d2549011c4755fa25bd48c",
  "dc2": "8946cbdaf84a228c30e9f9b9e728ae7b243e47d6c161ff24f014cc0176738812c61debb08fe381ae3e324a06686924c3f3dfb06598030ca86caa1392908009371a76469e8e1dfd92d2257db08455b997e43998265af4f5e2011d9381067dd0c03288eb20a62463694ee791b7527905a031d11aeea47c3de6a67247abff091c907ef10cf427f6abf5ccede735366a4890e84b8a1e495271d07b13a7bf9d466dbff25cbc8c60ff65cdb72391142dc03b837048e23b3c94d9ef094873b17a8f0d9a9b9622caefe4ba0a14f16d80c2636b8fe9a02a68b050f61b3e61dfd6990168f375a756f72f3c56e8fff188f1a506dbaa72e3799da4c56db867c1f5aec878341c",
  "dcId": 2,
  "banned": false,
  "dateUpdated": {
    "$date": "2025-04-12T13:05:26.743Z"
  },
  "firstName": "Egor",
  "lastName": "Tarasov",
  "messageCount": 453,
  "username": "tarasov_welcome",
  "id": "7255044232",
  "remainingTime": {
    "$date": "2025-04-11T09:40:54.041Z"
  },
  "spamInitDate": null,
  "historySpamBlocks": [
    {
      "spamBlockDate": {
        "$date": "2024-12-08T06:05:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-07T06:36:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-25T07:46:00.000Z"
      },
      "spamBlockDays": 7
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-27T05:44:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-02T14:33:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-14T09:39:00.000Z"
      },
      "spamBlockDays": 7
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-12T07:39:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-13T08:33:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-16T14:03:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-24T07:31:00.000Z"
      },
      "spamBlockDays": 7
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-22T09:58:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-28T05:04:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-28T14:03:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-04-01T12:19:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-04-05T06:46:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-04-16T16:05:00.000Z"
      },
      "spamBlockDays": 7
    },
    {
      "spamBlockDate": {
        "$date": "2025-04-12T07:52:00.000Z"
      },
      "spamBlockDays": 1
    }
  ],
  "nextApiId": 2496,
  "twoFa": false,
  "twoFaDate": {
    "$date": "2025-04-10T10:01:58.723Z"
  },
  "automaticCheckDate": {
    "$date": "2025-04-12T13:05:26.743Z"
  },
  "stopped": false,
  "lazyCheckDate": {
    "$date": "2025-04-12T11:41:46.016Z"
  }
},
{
  "_id": {
    "$oid": "66dee215f856541e1b71c97c"
  },
  "accountId": "1722784123-support-500-last-9-sep",
  "dc1": "5f739f44faca5ebe80903d22f31e8c2fc129e552463595ba70bb9b293f960e8ebac9aa25034d19b17c88b4d0320dab25565060fabae82caccc9cf4d579894b0f148865f257137f7af4c40cf59707608ecf4e22f2a592b3f05b7604ec1fc07fcead51abd8069762f473034336c4aac9313e69ea45f113c6d2f2c889b9c53c8fdf18532e221419415a513a38039c61e8168886ebbcde730a36468822ed849605b17c66bb51553ca19edf9ab4d4846fccd02c6c67233362ace25f240b9c198eb61b88dfb7058545aac74cfd523c7f9cbfc9ff150f7fee4a575eba0bdba743fbbda065216af26aea3a5c41d6fb9545ac8c407a91af3f516f1768d7fca068906e1417",
  "dc2": "0c705fc3209fb67a3444429cbee6b4a0335a75316e24c53907a77aa23e8a6b9571415bc8ad916a96edab7b4018853d5da7f2e33156f06ab759caf670494bdb1999d5053d891ac00140c1cc3cb809ac656e3b4cdd3aa09e90c457b2933e60030f13e6f79fa12323b9b9a99997329c23a1181fceb8f1966087208eca5dc26fd8718ca561e522ba0cff546fd2bd19b00fd178071fc43d4fde90c9f2c80872c9713295a795eb394b938c830d55c8f0197d94c73c39c81baef568448c15f7a81a47c514ed2ad8a3391da1a6a27a67e9fa174e265d57c098df2ce5ea41674462534cb303ff1000c6ae08562e110efdb2084f517d449de5e9671adba7746463dd96bfdd",
  "dcId": 2,
  "banned": false,
  "dateUpdated": {
    "$date": "2025-04-12T12:28:53.264Z"
  },
  "firstName": "Mikhail",
  "lastName": "Bogdanov",
  "messageCount": 484,
  "username": "bogdanov_coastal",
  "id": "7204640513",
  "remainingTime": {
    "$date": "2025-04-11T14:56:51.317Z"
  },
  "spamInitDate": null,
  "historySpamBlocks": [
    {
      "spamBlockDate": {
        "$date": "2024-12-06T10:47:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2024-12-26T16:52:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-01-20T14:04:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-01-30T10:42:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-13T12:37:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-26T03:54:00.000Z"
      },
      "spamBlockDays": 3
    }
  ],
  "nextApiId": 2496,
  "twoFa": false,
  "twoFaDate": {
    "$date": "2025-04-10T12:58:08.342Z"
  },
  "automaticCheckDate": {
    "$date": "2025-04-12T12:28:53.264Z"
  },
  "stopped": false,
  "lazyCheckDate": {
    "$date": "2025-04-12T10:54:59.792Z"
  }
},
{
  "_id": {
    "$oid": "66dee217f856541e1b71c9b4"
  },
  "accountId": "1722787305-support-500-last-9-sep",
  "dc1": "a01eb6c3451004d2b97f311ae173fea921e7fa94906bea1d80601fb4689852303e21cb930056833c233d8c69f7fad4586053ed5a30586a0c4a2137b8d81898c84fdff6b3dea40e6557ba96a2d9fa92887615d6009e635b13a7b5a529d1c454fe8513e4a1699b81b3c5a4cd90377849622e57d294f5eacab51f8868295326f8f449bf35c3689de4a806ae5d8d7bfa7cf3a9de76079f0314a7e8b49d5360d8a3236413e312aff2b10bde090db19da8a7d91aa77fcfd7bb779c06a59a58be93a12de77071a8117df419251049944ed6198eaa23bdb5aef5476f1b06eef890a6e5e69f97ef56a114a63533c06525f65bec3f47e3f53b4e5a6960d3332fd15038af23",
  "dc2": "027bba9ee7d586ddcea6aa098ee191cb64a6096aa8e88d5a214aa413ee6140a333f3b4e201ba8b834dfad9a0ff3dc77962f8a8c82df39dc431b25d99ab19c63eea0eca82ce1e5a822e0da293dfaecde8ce988bfae28ed387944c3df49d82a32e0dabffec9050a00d94725e3b3c32cfb9ad99ccb4bdbcb9569289eab9f333b6a6141851c3223387f63c58679ae963ef2d14f8dd5c7d8b05ffe41d4f9a6e4950f8885a1145b2f5c2a7786b74312aab009f74ef2431d1a3bbe2b823568eed2c47f6d1db1adc91bd40fc8a79fea6e1f86b60937c72001f05fadf7f24c0754adb12691b50c834ca58578a05c8762ae0796da90768dfb7b5c7f6a788be42fdc3da0bc8",
  "dcId": 2,
  "banned": false,
  "dateUpdated": {
    "$date": "2025-04-12T12:58:29.130Z"
  },
  "firstName": "Roman",
  "lastName": "Grishin",
  "messageCount": 320,
  "username": "grishin_fun",
  "id": "6710280644",
  "remainingTime": {
    "$date": "2025-04-11T09:07:14.815Z"
  },
  "spamInitDate": null,
  "historySpamBlocks": [
    {
      "spamBlockDate": {
        "$date": "2024-12-06T07:02:00.000Z"
      },
      "spamBlockDays": 5
    },
    {
      "spamBlockDate": {
        "$date": "2024-12-12T10:10:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2024-12-19T10:19:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2024-12-27T05:59:00.000Z"
      },
      "spamBlockDays": 7
    },
    {
      "spamBlockDate": {
        "$date": "2024-12-28T16:27:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-01-15T09:20:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-01-24T11:06:00.000Z"
      },
      "spamBlockDays": 7
    },
    {
      "spamBlockDate": {
        "$date": "2025-01-20T08:10:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-01-22T11:54:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-01-25T12:27:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-01-25T08:02:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-01-28T13:05:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-02T13:04:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-01T21:12:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-05T15:10:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-04T16:16:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-08T07:28:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-08T10:04:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-14T04:32:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-22T15:31:00.000Z"
      },
      "spamBlockDays": 7
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-20T07:48:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-24T15:20:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-04T05:27:00.000Z"
      },
      "spamBlockDays": 7
    },
    {
      "spamBlockDate": {
        "$date": "2025-04-04T18:41:00.000Z"
      },
      "spamBlockDays": 30
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-19T15:20:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-24T05:43:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-04-03T14:02:00.000Z"
      },
      "spamBlockDays": 7
    },
    {
      "spamBlockDate": {
        "$date": "2025-04-02T07:41:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-04-03T21:44:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-04-08T10:38:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-04-16T10:52:00.000Z"
      },
      "spamBlockDays": 7
    },
    {
      "spamBlockDate": {
        "$date": "2025-04-12T08:17:00.000Z"
      },
      "spamBlockDays": 1
    }
  ],
  "nextApiId": 2496,
  "twoFa": false,
  "twoFaDate": {
    "$date": "2025-04-10T12:18:00.570Z"
  },
  "automaticCheckDate": {
    "$date": "2025-04-12T12:58:29.130Z"
  },
  "stopped": false,
  "lazyCheckDate": {
    "$date": "2025-04-12T10:09:32.051Z"
  }
},
{
  "_id": {
    "$oid": "66dee218f856541e1b71c9ce"
  },
  "accountId": "1722788158-support-500-last-9-sep",
  "dc1": "0e362a598a86c31de4c898533cb28904b091ce48692a3c58e95260dfcbad9816bf9255a881a11c0a89ec6093f34d35830dffde0e852be9c311b9e0950ad98d7056aeaa75108b213605a268316a83622fbd3021c793552f18f74f8f35d666765fb6a1cb7401829d372c0edbc55c67b6efcbcf1be2e8074be1948a9fd38590b393e106c6f5f713b46334974adbf22aece011fade1bcf9662d7b1604784d6d830e067cf585053cae30103c758de7bbc33d98a9736629dfdce4fb15b30445b87a5c0c600ca26c104c594e6ead2faa7346ab1eb1855ddea19feafe06beedd9740123d24b0e9640e2b8c4c531851b50140a5db79627baacd3496bd05d05dec83b4d567",
  "dc2": "c4ab73892e628768c4dbf2e6dd6eb18eadd6bb3f9b823725aabc771c6e63fb0339e3b8bce9d1b5c023ce2e3c26032b13d1109f22dc2c4c9c5859e8a09a5fad3ca8282ef363d53e8d41359e4428962a07cf4edd841dee43a827fd596f80547b4490b828da741d27c4efd16cff27790ba99cc370a07eb44c2c43ae55b2a5c1fa8c3d2a2b8e7e3d0c67609bd36f09a9a9bd7ed5162dbc177588b96ddc1c5939c3d7caa0d872e3a66856df238b6c29008b22fdb489acdd238bf69c2cabf453687455881a4b811728f42b6dfc6ffbf23ebe59ee9333c98baa89232371031b07a56268b95552de18a21ebb7066052fa5a15ab9833dc140149cecffa8f01029aeeb0792",
  "dc3": "c30f2952e6b502993485c10bd64695e3a41ed568fd49ac392fe7f9d6d83a91aa145eca98bc9c7e214c3d3cb18b7cdf3ec32716d1143087349438cc099046f50eb167dcdadcc08ca86915ed32cb11c629e9e24dfff6f9e2a08e2b927edc3b898abfa6a75daaace82861878beef7ef684a04ea995ece762bb0f3d90673971cebcc3350354b4c9ebd6c23a7a7e54a4b60652751ae535438e3202d45495f0f631033e474e30ae350ccba1bb96918947594d9df5c79d9e01b8db9eedede2f57b7a88ac88ac9e042214202790821105308f134f9a0677e9420dcad16c73a5bc199eca1b49b52d3d9aff713889bb93d8b95bc316dbe97cc3a34b954d4cd941ec7ca508b",
  "dc4": "3e5b95392b7fde66be0b52541e9d1587ffa00f9b92fed27c5f9f2e38294f7176d4fac5d61a30a83ceeb83a15849458f0f5effda9545c3ca9265354ad919ae19bba5ce962b0dae78dd7f9c5c456333b45053954f4f9c7842008240995d3f76da4f77a327b0835e2b7dab5b59a3b4991f99a6cdafb7f650834d29147442be2be814ac1a07cb0c46d61076712e708afd68071af5e876e4463f8f78d244d8cd7baadf87088c036fec9189479f4ee23439f91430b76fbce6fb49da0a485f4fb86a99804151e80b17b3b2ffeedc9e59fa19bb04ab73389a6b88c402cd5975b5e1e08d03eaf623e0c6db92470abf6210f62126edafd5d550f179d0459b714efacb86db2",
  "dcId": 2,
  "banned": false,
  "dateUpdated": {
    "$date": "2025-04-12T13:00:29.738Z"
  },
  "firstName": "Ruslan",
  "lastName": "Korneev",
  "messageCount": 412,
  "username": "korneev_causal",
  "id": "6871043277",
  "remainingTime": {
    "$date": "2025-04-12T07:18:07.598Z"
  },
  "spamInitDate": null,
  "historySpamBlocks": [
    {
      "spamBlockDate": {
        "$date": "2025-01-23T11:53:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-07T17:29:00.000Z"
      },
      "spamBlockDays": 7
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-07T10:17:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-10T10:53:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-13T13:36:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-02T06:24:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-10T10:35:00.000Z"
      },
      "spamBlockDays": 7
    },
    {
      "spamBlockDate": {
        "$date": "2025-04-09T21:02:00.000Z"
      },
      "spamBlockDays": 30
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-14T14:30:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-17T21:25:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-25T15:43:00.000Z"
      },
      "spamBlockDays": 7
    },
    {
      "spamBlockDate": {
        "$date": "2025-04-27T09:20:00.000Z"
      },
      "spamBlockDays": 30
    },
    {
      "spamBlockDate": {
        "$date": "2025-04-02T08:49:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-04-05T12:22:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-04-14T11:52:00.000Z"
      },
      "spamBlockDays": 7
    },
    {
      "spamBlockDate": {
        "$date": "2025-04-11T09:25:00.000Z"
      },
      "spamBlockDays": 1
    }
  ],
  "nextApiId": 2496,
  "twoFa": false,
  "twoFaDate": {
    "$date": "2025-04-10T11:29:23.001Z"
  },
  "automaticCheckDate": {
    "$date": "2025-04-12T13:00:29.738Z"
  },
  "stopped": false,
  "lazyCheckDate": {
    "$date": "2025-04-12T09:23:10.436Z"
  }
},
{
  "_id": {
    "$oid": "66dee218f856541e1b71c9e0"
  },
  "accountId": "1722788919-support-500-last-9-sep",
  "dc1": "bda2dc25168334418f46849f3b6997e69fa1693a6a77be4029e85c3adab185e6ea2abed1d8ab23e5b960422adbbf40ed1e9f412a1d0972eab4f1e4a66a82bce60cd2242838210bc3c4212b5400ce1ffd1acc81fe97aa1adcf0fc77b92b7791b5349d3c360cdc5cce3129a84864a83af0c4802d4495b528b3782855def66568f1a0e0e1f2cbcc50902304b6259a304da8e66af24386ab48b33d26c0463d6b0fcee91f3bed05036b8d8aea1d2bf8b81b289a70980a32b2e577a65cb22487fadfd334fc36fe3b1402daef3c92ffd1f192be8da7c21fd8a248e3f72771afe71dc66d8d78484fdb9d30618eb6e32c1c85c10e0ae99fb52bb4fa2ae9dd6755dd6c3d54",
  "dc2": "6ad16636ef21c49ede0d821b762332db27136ab978d8585cb3372dd824984108e7b21b6467932057343a2fb385c8621ea29714a55c5abb3a142ae7968c86a2de5436ef665eccce4eac6a1ee296551c45d81f7db986a9d0ca29ccd64541006b2fb1a8a94b552dd01a1fbbe47a2550d306f24448937d2191bd1501ab24a9717273a03767964b590657bc07147e7813e79797981291e67aed508f077d120d7b243582608bbe7db3d4ab301aa652bf31af8280b8cc950143bcde9e73db38f9fe5428d217b036d12247aa50884c875b09ba6a8e8698bc34213f7c57635fb6148300ed75fbb9eb81d904d575264bdfa12e010e91330af1788e0861d2e5c6d4bedb1412",
  "dc3": "80d2ece1ededc888763d08c9cd8ecaa40e2425b9d3c0613ec3e52763132d4e104b18d94fee8b309cc36afe88dc54ca8597a4258495622f765523e58ad285a473c33edcc4ed238d8a68d61cc186f754484ea11059d86aad087fdc051a83725c080ba42407140d578e22ac445b195e8ddeaec384437893e169eb27e19ea448cd999aaf35b42027f6ee773c755f35af108dc8805654472ad171e351431fc99ba18a1a864b8b678faffa4495b0bd9f85dbaa67e0a19469ddb7279327d8d618b8c93ac043041f79d7dc6850fa67701c47c3d0c9fd8b65acb3daa3abc9b7760d5c6477d96e553c3e2bcf0bf7f039f6086f0f3494baa08f862287f716d885e8c7ac1542",
  "dcId": 2,
  "banned": false,
  "dateUpdated": {
    "$date": "2025-04-12T13:08:29.784Z"
  },
  "firstName": "Denis",
  "lastName": "Zaitsev",
  "messageCount": 433,
  "username": "zaitsev_ministerial",
  "id": "7424632501",
  "remainingTime": {
    "$date": "2025-04-12T07:00:40.718Z"
  },
  "spamInitDate": null,
  "historySpamBlocks": [
    {
      "spamBlockDate": {
        "$date": "2024-12-06T06:49:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2024-12-12T08:40:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2024-12-18T15:12:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-01-24T14:49:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-07T12:22:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-16T17:47:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-16T19:56:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-06T14:34:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-17T06:51:00.000Z"
      },
      "spamBlockDays": 7
    },
    {
      "spamBlockDate": {
        "$date": "2025-05-01T19:34:00.000Z"
      },
      "spamBlockDays": 30
    }
  ],
  "nextApiId": 2496,
  "twoFa": false,
  "twoFaDate": {
    "$date": "2025-04-10T11:29:14.967Z"
  },
  "automaticCheckDate": {
    "$date": "2025-04-12T13:08:29.784Z"
  },
  "stopped": false,
  "lazyCheckDate": {
    "$date": "2025-04-12T10:36:07.471Z"
  }
},
{
  "_id": {
    "$oid": "66dee237f856541e1b71cb10"
  },
  "accountId": "250-support-500-last-9-sep",
  "dc1": "818db124c38e7e2140b27ce44ab9f885e99d77d4622f6042b39ce3c234e3429f28469e764d1288c92b353f54d261744acf28bb6c90de0b0000169cd08fdbd9bead1f6173737e75aeddeee990e43371c772f1dabedcec9e4761625690696483e11104bb3c01fc2ac536aa1299c4a78438b16a702b09b0809808cba83b11718e7585e6163ebb46b5786f360749ab6c6be8e0119902b072a744cf3de6e9fc021a9843de525962c1fd20b324d4a023b5aaf52876fac0b4f53338f0082e018b6f07a34c719d76a31311bba2d8d97a1a8785380fb280ed4dfb83304baffb92024748f9ec708c7bf7155cca910be6e509090b04f07b2421d36d067db0ad29c8bdffd051",
  "dc2": "2a2b601e35ef6c1cbcba5e81d55ea0a09a1e0320dc0329239e7c92b3d8ed2fc1b4c02a13c5c5620edd2fc80c18f8a6d03138b4dd84c4967aef352b6d95317fc6efe61f12196f15d2b6cf4c6854e64aa50cf0c20521318fda5b4faae9e9485349e9ed6ec6ce5299d6008e757e98dcd0f9190581bcfcc359a61ea8bdaffcadaee2fbce67c314b9e59a1e2787ef38adcd8f4f765378546786c3189750c610be69d31ea2c6827bc4585a5fb0871b6dce182b2a4cfecc2e9ef7c7c444374aa3b478a57a2f2574186dc7bcda895b053999fa3b48c7cc97b6fedc86cafcc6659ed09ab9d9f0a91fe5eacbf236f8b7ccfd0c476ae5e9a4f663c2ec8f7dd276b4bbd54df1",
  "dcId": 2,
  "banned": false,
  "dateUpdated": {
    "$date": "2025-04-12T13:08:14.628Z"
  },
  "firstName": "Egor",
  "lastName": "Panfilov",
  "messageCount": 436,
  "username": "panfilov_literary",
  "id": "6850046657",
  "remainingTime": {
    "$date": "2025-04-10T16:42:27.646Z"
  },
  "spamInitDate": null,
  "stopped": false,
  "historySpamBlocks": [
    {
      "spamBlockDate": {
        "$date": "2024-12-20T08:00:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2024-12-29T12:58:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-01-24T22:29:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-01T07:28:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-10T14:37:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-17T13:43:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-17T06:59:00.000Z"
      },
      "spamBlockDays": 7
    },
    {
      "spamBlockDate": {
        "$date": "2025-04-25T09:52:00.000Z"
      },
      "spamBlockDays": 30
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-29T10:34:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-04-01T08:47:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-04-04T14:32:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-04-11T16:49:00.000Z"
      },
      "spamBlockDays": 1
    }
  ],
  "nextApiId": 2496,
  "twoFa": false,
  "twoFaDate": {
    "$date": "2025-04-10T10:50:26.860Z"
  },
  "automaticCheckDate": {
    "$date": "2025-04-12T13:08:14.628Z"
  },
  "lazyCheckDate": {
    "$date": "2025-04-12T10:46:28.658Z"
  }
},
{
  "_id": {
    "$oid": "66dee238f856541e1b71cb26"
  },
  "accountId": "258-support-500-last-9-sep",
  "dc1": "15884fd9631058c12a4d0dfd5a35b9a4e2a86e4fc3c2fd9cf6b8738c17754b4961fd24fc6f57d9395c43639fb17c681e42574c16e679db1893b7bbb1cde2e4e1260d4c805dd09db8a3706bcdfeacd201e89428a8b001f92f35c99795c8645af56628b664b2d9d50cc150bbba7724352bf827634fbd9980a12d572ed67e75b02314ab82df0a83b0416902647a6f533b23b7d37a004a37e266dd374381cffff242c03b9c264d8c4aec397383620df513ab6c63b554fe7ecd49dbc647b42dbac1ae4babb4d44586b1caff60fdd0b19c39e4e37564e1d76c4b1a292271b46034469e90931f9689cdbe482a74e8c36ee28998a5d77849f29ba33814ad8f576133fda8",
  "dc2": "20eb1e075d77353306e71d20155dd5bd051b522eeff318ddb5fa24b66eaccf75c40b5963470dc344d2532dd6295715148c603f40fad890579e5b03de95a88bcd0a8daa38138093868c7ad5b98c5762c62df6afdd2e5970f5143cfc8f1b0085a6ec1f47172942bccd67c903841817337cd36c996906f76906804cbec642e3a45cadc8a4573b80c91896365e714e4d3524d1a558fef41596156623809c3150d7838e7d29a050123a9fe1ab882fdf43496e8a4fe5e95edf7223686f2cf4b325ef59e683cd483582971152f402df5d7fbdcfbc85893983ff842bbac4cd8afcc43bf3cda318f64064f2af8f5d0f10e10bbda46b644ee6964c72cfaab5688ccd994229",
  "dc3": "80d364e7be15f896cf5a0500c0b67d9c687eafd4f03601ff0b7748ef33ab6a5a5fa082c568c5b8730ac6d776dbfeda0bb05084fb883b717a5a57ded85f236d6f4fb9025ffee35dba007509b0026d8d811d75be79c7e5dba2b896cac5c202acb16e6ce66eb328ec489031fa3c0cfca06c7791bb3088513d6214f994319822cd103f2983c08b083b39099df09b0c38e899ce058a9c1cb78d72915058b46bc6e5c064c9d94558e680561d2d8a51a0b899187e88d9e1ea2ac7c00b617b3d3705ae06d85adcd280308e9f2db264d41dbed066793398ca2d6af470d70103453064379adc144d6e91074819f8a201f20321c30c455bd7cc5125445b0d2d0140825cde11",
  "dc4": "aaff391aef94f2e248ff1b32719c63cdbc98f82201286919057d4a2e8ff2e2c0258da7013b698b413232c1b55f4dfb23208855e32ef9bbbf92f0d67eb36410fbbab2d45f5b0d31a1efa2445a80d3d1f13a0162f1ac440f21e3329dd39fa5a765f97d495fb6afa0d3e378762cc1086f9417f977687e887f4188aea4e705cab41fb2a9d98b3abe4d5f20e61cf2f7e084737b6caf0dc6bcdb9b82334dce8b837bd92ddd7c609eb4c7b519365d1fff42f8dd8a7ba2837494d3ae9f25820c8a6ea734f211496748c3c8ab9d42082eaa23724cb0b385a4b2e8ada56a39569a2409d4bc46067d1e79a8ad8864b9135f41989b3e5f367de40a54580354f8d726de1f443d",
  "dcId": 2,
  "banned": false,
  "dateUpdated": {
    "$date": "2025-04-12T12:16:04.932Z"
  },
  "firstName": "Vitaly",
  "lastName": "Ignatov",
  "messageCount": 398,
  "username": "ignatov_exceptional",
  "id": "7004239146",
  "remainingTime": {
    "$date": "2025-04-11T14:31:58.113Z"
  },
  "spamInitDate": null,
  "stopped": false,
  "historySpamBlocks": [
    {
      "spamBlockDate": {
        "$date": "2024-12-08T11:29:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2024-12-17T11:58:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2024-12-22T12:17:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-04T10:33:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-07T11:36:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-15T06:46:00.000Z"
      },
      "spamBlockDays": 7
    },
    {
      "spamBlockDate": {
        "$date": "2025-04-18T07:34:00.000Z"
      },
      "spamBlockDays": 30
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-24T17:04:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-28T09:18:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-28T13:56:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-04-03T08:55:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-04-10T10:13:00.000Z"
      },
      "spamBlockDays": 7
    },
    {
      "spamBlockDate": {
        "$date": "2025-04-08T11:54:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-04-13T07:11:00.000Z"
      },
      "spamBlockDays": 3
    }
  ],
  "nextApiId": 2496,
  "twoFa": false,
  "twoFaDate": {
    "$date": "2025-04-10T12:18:08.550Z"
  },
  "automaticCheckDate": {
    "$date": "2025-04-12T12:16:04.932Z"
  },
  "lazyCheckDate": {
    "$date": "2025-04-12T10:50:39.727Z"
  }
},
{
  "_id": {
    "$oid": "66dee251f856541e1b71cc63"
  },
  "accountId": "+79829899519-support-500-last-9-sep",
  "dc1": "5efa92b939acd259dca50d3a87a784edf7c471ff95508348fd8763c7428b3f4621306e3a05290718776cb29fef79ddd2a10247f3dae635903dcb35b4ed3e0f8e3b57a806d5e59220afc74da5adb03177313f1e7df8a1b88d0cdb82a8ec6800a73938e2fd4534c81a90dff18b144327ac12e1ba313692b3be90ca0773753816b58e2c51d08aa2493169f9241be45c3a715e51cdf54bff5d9875733157bab99d744d253f52417a29b8efe3c88fc1dbd04550041a3e8354462ba3fccd34e3d2c198c3184bf64fb7dd654d5ad9794e57247c452407b6ec3b35b8aed71a28448d73de75c51d8137b3c5a93a24316fb74dcebef84f1ff78a124028466163df70324e0d",
  "dc2": "13bf960974909097c30e85ec438ef2d03f316f0d9b83a2e7b363654b8d03bb1ee7c923212df4cab851676c37f06c63bce884cea6b7d35cea64308e798dcad243ef2f0920fa319f99f4cced1504a70aa8fb8f4931552a91407dd697bddc29afb7b75aa3c44e6374d40c14b1e5eee1dbb8fd96f84b26383aee0595611a597447a6da666edf5174cbcbe251a1403ff046a72360bca70443d99a95a845d24c125ed20dbe863903fc7520c4d7e874bfc008c63e535c78247877937f0a42d3bec9422e6aae68d2a3738ff586d48ad667cb1b069b3fe778d92d3cf1827272ca1c03616fdcb2ec1ae197fde2b02c504368b4c0b1a85dc073350bec46dde80f7ec6d4ca3d",
  "dc3": "227683843c19a8eea5a00dd796739adde4fe56a029f4bae309cd279866ee0d67caae26886c4baed8773c8124c23c7e1e52263156e6a9f48f12c44805523b563351e7e1d2abde733b76c396c86de8e188112b34ec106acd71c8caef88eb525bd7e273b6b6bd0e00bab235b8936183b88ab3e89557b8a18fa2ce6bbf63d3b224e95bbb1c1e9ae411fffdab3366fee8f9e4eb3de2a19c388e57d64e8fcd84cdd28a7873b0049bd27464da34c14c2e8c10a06f05316f4a81e916a969c5fd7d2451f345e15f842ae542cbfdbd17523c4e6ac3744f26df7784eb57e2e35cb440d2a69dcb511cd35d872a8116c9c32199e2903fec8c62ae86f5b6ff945b8ae8383f5574",
  "dcId": 2,
  "banned": false,
  "dateUpdated": {
    "$date": "2025-04-12T13:01:13.443Z"
  },
  "firstName": "Alexey",
  "lastName": "Sidorov",
  "messageCount": 466,
  "username": "sidorov_tense",
  "id": "7204106761",
  "remainingTime": {
    "$date": "2025-04-12T07:16:34.237Z"
  },
  "spamInitDate": null,
  "stopped": false,
  "historySpamBlocks": [
    {
      "spamBlockDate": {
        "$date": "2025-02-06T08:42:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-24T10:49:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-25T10:07:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-06T14:05:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-14T09:50:00.000Z"
      },
      "spamBlockDays": 7
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-08T15:46:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-13T06:47:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-20T14:34:00.000Z"
      },
      "spamBlockDays": 7
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-17T08:04:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-21T15:40:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-04-02T09:17:00.000Z"
      },
      "spamBlockDays": 7
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-29T07:32:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-04-01T07:34:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-04-05T10:07:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-04-16T08:12:00.000Z"
      },
      "spamBlockDays": 7
    }
  ],
  "nextApiId": 2496,
  "twoFa": false,
  "twoFaDate": {
    "$date": "2025-04-10T10:02:13.096Z"
  },
  "automaticCheckDate": {
    "$date": "2025-04-12T13:01:13.443Z"
  },
  "lazyCheckDate": {
    "$date": "2025-04-12T08:40:07.107Z"
  }
},
{
  "_id": {
    "$oid": "66dee252f856541e1b71cc7d"
  },
  "accountId": "+79923053552-support-500-last-9-sep",
  "dc1": "54eedc1064475901a75f642194b5487b690593a7bb58213239d44ac438a6ea94307132bc271382f01b502f0c94afef0590fb698fbcb718cd2d9e20d93b2cf031b37cefb17a4ff8fd14f732196b8cc23a2525cd677ec968df27300c7e4fd556f41082b313bf21d302f4a336ed70663cc82cec758271a38f94119654e7fe118288d6d77e570523e2e618123004b165c30358ef8343fc62d0467962efca3e98285cca3c47b448d521129cdfae1308fba92b85a71151d74c45f80b5f4fb515fb197e7b207bd92d2014955f09d7ccd582ea37839d0a7960515ac89f15941ee9ff12f5bebdd5fd7e43d19b6ffd57e7f7ea88c01b942392669a2540ddc3ff8eff9f7a78",
  "dc2": "35b2300b166f0746d286af99e19dcf5f8d058e59b06af4f20649dcce95067c5609dae8ef8b330757d65e8411989f16691b228f23bf35ae1fdcc357fdeb21579f0215a53d6838494f81af1edaad4a6f7e1dbe1ed4309b9a1fcf241283618bef3e40731ed6d11d6bc32f7a1e200f685c59e525f6c904eee501945f60f3f9754f5178722f2142862d4e7abda9961a8f1793e19310e00ffcb7b6b5825ca28224afd5da709ae3739d8d66aebda326a117e24622f7fb5a44743017dcb590583fcdb221651e446fbb018cf15b0a0bae588cc2d6f0d4102bfb18d06d4e8bad69ea05c11126dc8dbe72d93dd8edb2805858e4a2258a551ff3505af7adef0c8041869d398d",
  "dc3": "0a05dd677bd04988ee3d003c3956533afca8a8b2df8fd0228ea181ab7c7b4c64ee088f3e8ca8f5db6dbcb937caec6d2b0fd86ff0cefbac95d741ae088a766c432df6388066fdd3b002212dcba570e646523fec5ba759a4175a1bf1a20f8a7e1898d5b9305872a2cc469b7829e4abfc8af9d6187ac273bce1487ed7942597fb15fc8a1d8ba531ba3dbc910762f766b58c2a4961ac2928b7b7222b371794f1f337458accbbb7240c9b40cc4282b5f47a8f4321dd374ba255de8602f0925f9a733a248fbe034247123ec622374f30b89cb64da51ea00957f7b9897ed99e31f26baba0d7a6c266a07d05900faf63b8f8e121546c1c073a82dee135c3d36c64ab01af",
  "dcId": 2,
  "banned": false,
  "dateUpdated": {
    "$date": "2025-04-12T12:22:17.168Z"
  },
  "firstName": "Arthur",
  "lastName": "Gorshkov",
  "messageCount": 320,
  "username": "gorshkov_premier",
  "id": "7040803798",
  "remainingTime": {
    "$date": "2025-04-11T09:37:05.741Z"
  },
  "spamInitDate": null,
  "historySpamBlocks": [
    {
      "spamBlockDate": {
        "$date": "2024-12-16T05:54:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2024-12-19T15:33:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2024-12-27T10:18:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-01-13T12:37:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-01-20T11:42:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-01-20T15:12:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-01-24T12:06:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-01-31T12:12:00.000Z"
      },
      "spamBlockDays": 7
    },
    {
      "spamBlockDate": {
        "$date": "2025-01-25T14:36:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-01-31T05:59:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-07T16:08:00.000Z"
      },
      "spamBlockDays": 7
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-14T20:22:00.000Z"
      },
      "spamBlockDays": 30
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-20T11:01:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-24T11:03:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-03T19:10:00.000Z"
      },
      "spamBlockDays": 7
    },
    {
      "spamBlockDate": {
        "$date": "2025-04-03T11:46:00.000Z"
      },
      "spamBlockDays": 30
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-19T09:27:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-22T20:59:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-27T12:39:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-04-04T08:31:00.000Z"
      },
      "spamBlockDays": 7
    },
    {
      "spamBlockDate": {
        "$date": "2025-04-01T08:53:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-04-05T08:56:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-04-08T12:07:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-04-12T10:11:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-04-12T07:40:00.000Z"
      },
      "spamBlockDays": 1
    }
  ],
  "nextApiId": 2496,
  "twoFa": false,
  "twoFaDate": {
    "$date": "2025-04-10T12:17:52.114Z"
  },
  "automaticCheckDate": {
    "$date": "2025-04-12T12:22:17.168Z"
  },
  "stopped": false,
  "lazyCheckDate": {
    "$date": "2025-04-12T10:40:42.559Z"
  }
},
{
  "_id": {
    "$oid": "66dee256f856541e1b71ccf2"
  },
  "accountId": "1723055946-support-298-last-9-sep",
  "dc1": "327937594ab0ffe04a4874afd5d4677212cbdb2e45b86a559861fe609a0912f1d52fe8a72a6a2f02876d777787fa66151a6631fbac26dcba02ba4aa10cb69585984302b5201b86a0c5a78b5e000cda58bfa154cacea927e471a38e571ef812313b12a3e96ab81f6552d8d71f37c928eeeb92ed735b080325f5e9061dabdf4ea7fad65bf4a299f8f10addf4160d53fee88e72ffafcef218ad5f60764d2155814aef1e219e33d2d93d4378fb2ce6175a0333c97dedfd79cb07d3387b4ded56fa8e8313b1222c24b7a03bb04554ec0a797455c24210f071f9bb60f478eb4d3212f4ea5ed42a752047e483e386b5c89aaaee60b6f9552da9db0994a42e39b6eacc01",
  "dc2": "a0a2e04b85144e747c10fe7ab607e64601bc439fd794382a1916592ea8a10ed06654e94d9bd00e6ae5ba2195edc0ed218c75eed8e2fb778a0079f3d14b232d6602f57a521e075f488b0cf0d0a89f57402100843cb8b275a9674dad754289b57ac10d86514d8c227c79ac667574f6dd4839bca028f39e9af232f54aeffc51a04f6b46082e8ee807818a36fb37e3ad967a4d17a31f150e391ad4eb8cb227a85434209906b92452b75e0080a927062c12c3fc27ea65466b6b0b96e26fc189b6772193d9c1f726dc2e77af683ae8e2a1c715afdd8bd2b37763c39167bfb548af1e9e2441d80fc907cefb85e3be2eb1083da594c6d65189b468567af8649279039309",
  "dc3": "570ac75e13eab1276528806025c1d50921f89bee2a4a227115e46621345edc0e7fdc9737fd02f765bc2d3e47cb5177b0c7fceb5dcd5dea69efff642ea1c28b89c36c471ce18d07a02fececdcdfddb6005293ec4a2b41e8331c539d67422ceb01b2a7cd968c6d200fb8c2b5b9fe8ea47b8c7d88482548080c5f388d796759fb9085c0bf063b5ef7619e301d105c313da7d7f0ebf12a67f460ce5da8735fa92bad858707aef83e21bfa90a2de508691dcff260de1e9efad37bed76a94be78232ff8b5b2b21f9ae9e2df3664a39e3f2845efdc365f60b4ae2ace39fe37e13ed74416dbd730f27022a503f88057949a26da40e3171b8c6586b01e39b112e6ebf38cb",
  "dc4": "23f95597e36076ef68d216f649424812517c85b1f501c4450f6c58976888f0d7bc3b0c414b227313d6fb6a71f4b5aadc26eb199c1fd3dca0174cab83af525fd3a0039ce5a547e28560ee250bbba67d5146251252b0545b8d0b1c132147fc2fe4dc85683f00af06fd2dda8ecd3397f30092700a3505df74b63347587ef439bac2ca59a6005df6c4c47cd8401bb6cb4d405c8aa2cdee9d7b094f8df31e9c440e8570a16ed947a3835a7afcfa505456cfe7c7a1c0f8360526389e074bb525afc09994fb94749e37f2f27aa7b6b51b4bc9b3aa5dd684a1be80fe97a252af5c2a990ff04651b15242439967e4bc94fbd25bcbc30c46ada4b42cce57e582cc2b7fe924",
  "dcId": 2,
  "banned": false,
  "dateUpdated": {
    "$date": "2025-04-12T13:07:09.270Z"
  },
  "firstName": "Maksim",
  "lastName": "Kalinin",
  "messageCount": 267,
  "username": "kalinin_technical",
  "id": "6794691282",
  "remainingTime": {
    "$date": "2025-04-11T15:36:26.876Z"
  },
  "spamInitDate": null,
  "historySpamBlocks": [
    {
      "spamBlockDate": {
        "$date": "2024-12-06T14:37:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2024-12-18T07:04:00.000Z"
      },
      "spamBlockDays": 7
    },
    {
      "spamBlockDate": {
        "$date": "2025-01-17T10:32:00.000Z"
      },
      "spamBlockDays": 30
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-20T10:59:00.000Z"
      },
      "spamBlockDays": 30
    },
    {
      "spamBlockDate": {
        "$date": "2025-01-28T11:50:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-01-29T06:31:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-02T09:42:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-10T07:21:00.000Z"
      },
      "spamBlockDays": 7
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-12T13:33:00.000Z"
      },
      "spamBlockDays": 30
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-20T02:16:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-23T05:37:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-02T14:30:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-09T11:20:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-16T14:20:00.000Z"
      },
      "spamBlockDays": 7
    },
    {
      "spamBlockDate": {
        "$date": "2025-04-21T05:11:00.000Z"
      },
      "spamBlockDays": 30
    },
    {
      "spamBlockDate": {
        "$date": "2025-04-11T13:30:00.000Z"
      },
      "spamBlockDays": 1
    }
  ],
  "nextApiId": 2496,
  "twoFa": false,
  "twoFaDate": {
    "$date": "2025-04-10T10:02:16.350Z"
  },
  "automaticCheckDate": {
    "$date": "2025-04-12T13:07:09.270Z"
  },
  "stopped": false,
  "lazyCheckDate": {
    "$date": "2025-04-12T10:16:55.383Z"
  }
},
{
  "_id": {
    "$oid": "66dee256f856541e1b71cd05"
  },
  "accountId": "1723063756-support-298-last-9-sep",
  "dc1": "c6dd6550a7d6f367775986c3dbf15fc652393d893d3523fb2b34d8ccb5f5bd6253b6ca88f095bc9feb9c07d4278cad75bc9c9a10f124151fb4507d2fa7844ccd4e2c48e7d907d6228bf3d6d7f4bd2d851150762c06ea73aaae46e3659a0006ab0cd6e8838f081dfb0df533c6ccb03b5af2ec08aa0d007af7ce2ce7092682dcb4e67ecd86047fe14c08ddda66e16ed4104b6c9209c235d76f4bf47bfdfcc719b590d1bf389bf849d1ac935d81a534ab0ef2d5973c1dcbb3f0aac74293f71cc8dee9616bec84817007df25c4f9552c8a7f933651f55e72c8ae9c119d0dccea3e5f231533703e532cbfd67667bce5786d510b2ae5da6cb21e20c4bbc88f8e5c03ec",
  "dc2": "c446725e42265f96b299f80ba18de7bd110671b62bc0d314a377c8b94c2d2890ff26a676b27e53ff2a53556c35e0f654d33c9bea6754feaf125247f9d32b6009c66e29687fd862658eff00fe1da6e0e014a9a974e9db660d697c4532d362add2c9371f7ad9bea45412a6e9091efacccfc19c6f2e54917a0601dc8514ac6833f9b14ea6a7d38e1bf5a88cdcf29618315e96fd3f5bd63b8cc50144a736beda77d1fcadd577525fd008d8b6637456ca78c92711ada54fcb2cce7efa489dfae141d0831a5d46b36b25663aa44a09e022b78992375df68341596e0ae25b242d7887452d3f0918f0d9efae4682162771614fe4c884431a69b036ce063c6fabf6814d0e",
  "dc3": "b07642e53bf39f7e04fe63b656c650316100722b60c17276016924b42c473a843e6869aa6c66191b5787f1d14e4fb29312d998978e62b80fda9603aa3f17defc1fb90a0a3895192f8ac9ac54562a6003da4e6feb6be1b70c74409115d1d09fed83b4fa52439bb4d9d827445f754d0d76b0984a590bac584e49bbbd4ea9dfb4e47666f42e926377ff5f9b0c5b7ef78dabe6c9696e3cd6fd4ac7618f176af32649223310fda856ff985b38f8428bdab2cfdac32a75e921e1649feff4bc71cbbc4d341275ea75a99a8b7fd92d55cbca9bc2152aaf298fbeae5d65115ec422ab8468df0461a7576ac4bd4d1b75b57f8eb5fb577ef48c167aa598011e3c0523f34048",
  "dc4": "b084d93481a2f7766806e53044e4f1c8d13e7361b2d5e671af3b0555cd33675bf7431d579d9f63bf2c341c9e7c565a90d52f946e758f922941d4506fc21637b1df395f54ddca2537f122e25ee4e97ba747db51564fca45526f1eda4aa2e0f8bae7d80220713335bbbd1a176aa375a8c0f59d1f9e26411574d594887dce083474fbe8fe2b071a0cebb30ae740ef05d73c93d24f40afa52af15d6eb7eec16565275bd8f1ac97c4200a7128b5a61ff8489ea94b3e68629bae44d58b2f5f0b81344622b31814d9c3f978a90b1d956344a4235dcdbaa1cfd0a33d8d4a3fcc896254138ab7fb813e29d2122ea26510b4ebacb7b9397541e18b46c57d86a05fae7c55b2",
  "dc5": "08ff3ffed188d44e4a5cb6db8f42b0d93f7e06402a6222431fb84108818ccee4c569a57c75b5bfb055da20f5484580be55866c40d95df1c20d6623b01512f3683e06cb8682847f95d97de6b2a1e0acfa757ca30d381cd70bb3b9c85fa849eb874d92cf4fffbf131fa8cb13ff6c0d150a062bd0b8287f425c77bdd574073afea28c60200e2d76134c2bf5ccae14534f62a3714258bb11d937a950bbbe0048a7108407b0ec3446ca31220fc00ef9dfc31f9548e05908e63d5ea72bb8cad961ae5acdcf5c3797e2d813de93334f9ad15c6a84076a726cc0f9e66b3ee6fcce0ee1c82c73327fd9cf867ac4c04e591d2d849eebfe792c15cd0a36831e1865796d0e25",
  "dcId": 2,
  "banned": false,
  "dateUpdated": {
    "$date": "2025-04-12T13:01:19.149Z"
  },
  "firstName": "Ivan",
  "lastName": "Malyutin",
  "messageCount": 292,
  "username": "malyutin_fellow",
  "id": "7248211525",
  "remainingTime": {
    "$date": "2025-04-10T15:05:51.652Z"
  },
  "spamInitDate": null,
  "historySpamBlocks": [
    {
      "spamBlockDate": {
        "$date": "2024-12-10T07:21:00.000Z"
      },
      "spamBlockDays": 7
    },
    {
      "spamBlockDate": {
        "$date": "2025-01-16T12:13:00.000Z"
      },
      "spamBlockDays": 30
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-21T14:18:00.000Z"
      },
      "spamBlockDays": 30
    },
    {
      "spamBlockDate": {
        "$date": "2025-01-25T19:01:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-02T11:59:00.000Z"
      },
      "spamBlockDays": 7
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-02T08:40:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-05T10:43:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-13T12:07:00.000Z"
      },
      "spamBlockDays": 7
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-13T13:05:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-22T21:29:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-03T07:35:00.000Z"
      },
      "spamBlockDays": 7
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-26T09:04:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-02T18:07:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-10T13:32:00.000Z"
      },
      "spamBlockDays": 7
    },
    {
      "spamBlockDate": {
        "$date": "2025-04-12T15:43:00.000Z"
      },
      "spamBlockDays": 30
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-24T12:07:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-04-01T12:48:00.000Z"
      },
      "spamBlockDays": 7
    },
    {
      "spamBlockDate": {
        "$date": "2025-05-03T09:52:00.000Z"
      },
      "spamBlockDays": 30
    },
    {
      "spamBlockDate": {
        "$date": "2025-04-10T13:02:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-04-13T13:19:00.000Z"
      },
      "spamBlockDays": 3
    }
  ],
  "nextApiId": 2496,
  "twoFa": false,
  "twoFaDate": {
    "$date": "2025-04-10T12:18:04.227Z"
  },
  "automaticCheckDate": {
    "$date": "2025-04-12T13:01:19.149Z"
  },
  "stopped": false,
  "lazyCheckDate": {
    "$date": "2025-04-12T12:37:20.139Z"
  }
},
{
  "_id": {
    "$oid": "66dee259f856541e1b71cd41"
  },
  "accountId": "1723143909-support-298-last-9-sep",
  "dc1": "0d9196367fec58b1d1d02865039434de9079ef8b81d134d1143c25a214a212cc6189ec537ca3ff3e4f5902a6713dbb90954724988d6f5bd2bda3fd5e4fe0e99b1fd1504898e831d45f7b11eb08d57aafa232d8394f89c058b670d109efcf286a985bd54b45bcb3bf1adb6b7bb371f20ff4cbdb4341b00931b6bfd1c7c18bbd037c73bcce09dead235d2e18973b244b88647507e10c3b85be607e87c3d5f9f971d56f5fc66a29eb495073ae2feac13667ee9c4ce0d8245d0ff93d66bb86296e8b2ed0295973b4ee50d8b1f37fae6e5a9f850d863eb1735b4868626d7f5d298de0b0b9a483da79e2a42c61008478023d94c5c3d45b72e547c5fdcf5d556d0d915a",
  "dc2": "b06d4b8b13a2018b1182f6ea83758439606416d13c5109959784f6f1f9f3d9297b81a4f826c9a2470fd7efaed4479099735138754ec16165e3b3d18f3e343a91ed1eb6579b0704f71a718cd317b562c52e8aa82344da592380d3d14523940fc693fa1b63f67ce69ba3d57347f10ea20d320503b0246bd4218ad47e68555a5683c7e6486c0fa7e2dacaaed35f56e9fa56e03c4ab6676f567f2ebc3481d80e4bda9df6b1939bb353203cd551d755ad7facd98dddd4ed22ebcacbef2d084264b8dd4255116fc20599dfdb1dc8cb81bf91d6493ade1eed00c13032ab194ace9c19519b4cb0405f4db7d12e2d816751bd302f0bc6f10cc9efe8985438f500c858e481",
  "dc3": "56f11c56a4de7f24c80ede41cd76e7d64d042903f8501fc353dafb2c2f429509af245dca1230d8f7c88a62109f970ab2a26035c01d9fc3f2dc98118c2b2884b43254d2c539270b7554d8d01d3697830d4ffd2ca9eebc60f337ab96f7b2205567a378934f70b219b1ac41c6556fb1ceb0853cd2e182a8634498194201d88f485d83aa8b7265fb13cff1a791c91662fae92a72a0d8af7190ff87fec9d86b49efb397950edb4e595ad673aba51381e4d2cda6113ea151b07a9f8502ab8d1d1432d255ec667602258a17b746f8a1c3a231ce6c2e8c0a636ad9bebc1fae14ddd555d6f1cfe09702171b45f06e2e6d0bfff08f67160564d9adef20155bc5af3fcb4547",
  "dcId": 2,
  "banned": false,
  "dateUpdated": {
    "$date": "2025-04-12T12:14:17.346Z"
  },
  "firstName": "Viktor",
  "lastName": "Shishkin",
  "messageCount": 351,
  "username": "shishkin_territorial",
  "id": "7250030453",
  "remainingTime": {
    "$date": "2025-04-11T15:37:08.130Z"
  },
  "spamInitDate": null,
  "historySpamBlocks": [
    {
      "spamBlockDate": {
        "$date": "2024-12-02T16:54:00.000Z"
      },
      "spamBlockDays": 2
    },
    {
      "spamBlockDate": {
        "$date": "2024-12-11T13:35:00.000Z"
      },
      "spamBlockDays": 7
    },
    {
      "spamBlockDate": {
        "$date": "2025-01-10T14:08:00.000Z"
      },
      "spamBlockDays": 30
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-11T15:53:00.000Z"
      },
      "spamBlockDays": 30
    },
    {
      "spamBlockDate": {
        "$date": "2025-01-28T18:36:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-01T06:50:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-05T13:22:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-09T18:31:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-17T05:38:00.000Z"
      },
      "spamBlockDays": 7
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-20T11:54:00.000Z"
      },
      "spamBlockDays": 30
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-20T06:15:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-21T05:34:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-27T12:00:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-07T13:34:00.000Z"
      },
      "spamBlockDays": 7
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-08T16:00:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-14T07:39:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-13T08:54:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-18T05:41:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-25T14:40:00.000Z"
      },
      "spamBlockDays": 7
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-27T06:40:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-30T11:56:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-04-10T12:17:00.000Z"
      },
      "spamBlockDays": 7
    }
  ],
  "nextApiId": 2496,
  "twoFa": false,
  "twoFaDate": {
    "$date": "2025-04-10T12:18:03.459Z"
  },
  "automaticCheckDate": {
    "$date": "2025-04-12T12:14:17.346Z"
  },
  "stopped": false,
  "lazyCheckDate": {
    "$date": "2025-04-12T10:42:48.638Z"
  }
},
{
  "_id": {
    "$oid": "66dee25ef856541e1b71cdb8"
  },
  "accountId": "1723229585-support-298-last-9-sep",
  "dc1": "69ada3d1ae226996732be663e3bb299a5de6f10ee23122b568808b50d46661f4af3ff90bb58ca148d9ebb7b7fc8cd903df582f6b669eac382dc0204ae5b25ef8eb09e929070b3b62b16bed66f864dccdb41f815d6860dd24b9e9cf9a94af7de6e09e24b28a8e25cf8b3e80cc9ac09d914e49001b6b23d441f364caf24fe5e790cb82aea187af5a9211a96142f3c81b2fcb8ce2aafc9628b5d2f18153dfe68395fb0e25d801aedc6d54c234cb4d5b030c9b11e7dd6793c4cb98c487f6a59b22aef940495c6adfc2147d7c20ee7772229b9709192bdc310d1ce02b47aaf534b0cd14eb94b9bb66dbc6dedca20b78f1f11cbaa9b76cacbfe648f99d9458c137999c",
  "dc2": "0218d220f0d66471533345646ded09fc7679e410c95c9220dc8dc1ebb5dc9b97e072739c008b10b2ad87ee9da36770f4c61843b094049cdba54ee7325f02bdcfc99b14a8253a1b1a5974451d2d19809baa6744b0d4c2ff2f0c07acac2d6b81b582da867d3277bfedc48a3df925047176a14e30f93d0bad148b572bf0cfd9f34d277f20a03cc5f8900e2c07b5bba826cdb0d493cb700b9d21fad6e8d3603e48e562c9046c9d538c081863307afa0ffe87fbc7470c8486e6b37fe6dccae9554a0880c7f42cda92aaae9522fe042b492070ea18e54d4b3c42a0ef86c0e610dfcee2fbc0b175aae426dacf0d2535c1d5ce0fdd87fc61804543d6c276a39e211b3b24",
  "dc3": "75dc0d2c7a1a535857bfe384552ee4e18e4d4c89b543b9e7cefef91725d60d4d26d6cd8881c658b07029d0b9dffbe1860225754831abd688ddc36f9df653ba1a80fc5959242bebd14bf6758378d4f2b0c5a874037acdaa25d64de5c351c6a393b8eef8aea45f2291ccddbd0a5333235f26f2323896193bb7fbb8cbb7831a6d74af61fe4ad9052e283f1fc4bcab80dabaed15e3561eb2c253e0f21a33bd76fc7eafa12ca2cfca5b87fa0f8f28bdedd37189b6e63dcd776f894455965b49addb711de4f03472acc3b4bdfa34452485f8c1b33d3e7403132a7c3be5620f77d5b65fe1b1f8101b5a2c60be56688b8cd34b0907d7524903a15eed3c934cb6c6ca40ca",
  "dc4": "242d6fda9ab9cc3805eab3665fb348072eabb252d4981bab387bc537ffe54c9875bd5361591093da59212c055df8e8bfff12eaad166b35127d9e1a81e59010f623aead20d01d3104aa898b1241d0d86ccf86a78b26253dc9e2b7551187775794cfdccebd845803f8e8ab89c687389cd419be3149659b795874fdee05cf2d0944beba8b810adaa354a3fd1d33e5bafa41bcb96758258f4471554360cc8103c41341166d74586e93e8585bac043f101623cd260012692bea793703af9dcf2eabf79c41740325b2bbfabc10d508228dcf9d14495e663a22890ccfa89cf0a88da7389b7b810f36db1f01186315d8c0f1aa99b66814a82f140c4f8864103975387e5a",
  "dc5": "b3a628b7abe5b3c605b4f81930dd9335580a643b8b8fb54bf86e25e55c9613892b54767c509905f6095d0262b5f4ae5e8635736c5ed2889b3d79a1f9beec8e459c9bb2df5d8e14b62510565d5b0b5e2a1ee559fd25f68ad20506324df8eaef1538e395d7e1dd2005725dc1d5f5c10bb4522b7a1fdfc7c731f6e155ae21c03a44cac9f4d91c5714151ebae3c50f9114643ff813d1a421fb31bfad9aba13e7b28bfa1a2e7f53ff404aaba5b1a1c3dea84b3a32fd760c02152d0ac9ac148d5748b0bc7a37f246cf881fede5ffe8f7e57391b85665368f3d75dc843d4492841f699a84e31466f54ebfd4e4dcaae0ac8c858691a9d89fd89f5b1e93db7e375fb0c976",
  "dcId": 2,
  "banned": false,
  "dateUpdated": {
    "$date": "2025-04-12T12:59:19.401Z"
  },
  "firstName": "Alexey",
  "lastName": "Nikitin",
  "messageCount": 441,
  "username": "nikitin_stupid",
  "id": "7143962704",
  "remainingTime": {
    "$date": "2025-04-11T14:51:13.971Z"
  },
  "spamInitDate": null,
  "historySpamBlocks": [
    {
      "spamBlockDate": {
        "$date": "2024-12-02T13:29:00.000Z"
      },
      "spamBlockDays": 2
    },
    {
      "spamBlockDate": {
        "$date": "2024-12-17T12:54:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2024-12-23T05:22:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-01-16T08:11:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-15T10:24:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-14T07:58:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-09T08:08:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-21T16:09:00.000Z"
      },
      "spamBlockDays": 7
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-19T05:41:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-27T05:18:00.000Z"
      },
      "spamBlockDays": 7
    },
    {
      "spamBlockDate": {
        "$date": "2025-04-26T10:25:00.000Z"
      },
      "spamBlockDays": 30
    },
    {
      "spamBlockDate": {
        "$date": "2025-04-01T11:57:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-04-02T13:48:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-04-05T11:41:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-04-15T07:21:00.000Z"
      },
      "spamBlockDays": 7
    },
    {
      "spamBlockDate": {
        "$date": "2025-04-11T10:05:00.000Z"
      },
      "spamBlockDays": 1
    }
  ],
  "nextApiId": 2496,
  "twoFa": false,
  "twoFaDate": {
    "$date": "2025-04-10T12:58:11.278Z"
  },
  "automaticCheckDate": {
    "$date": "2025-04-12T12:59:19.401Z"
  },
  "stopped": false,
  "lazyCheckDate": {
    "$date": "2025-04-12T11:34:50.272Z"
  }
},
{
  "_id": {
    "$oid": "66dee25ef856541e1b71cdc3"
  },
  "accountId": "1723230746-support-298-last-9-sep",
  "dc1": "1143217065aa3143bb163db76086ee883dfca2d5460884ba6bdae7f88e2dd76323ee81922cc518527003463fab7f1b8c38a9e1750ed1140b088961eca31ca88ba7d81e5b180c82625bb2a5be983b6c96675b1472897df2838592b660dbc168e083442bb014886c930b0781699a1ec5c1da323fc0a44b8a94b915f22d16dbbd0465d59728a825b057481fd062f8119fd5c91a8a26897eeb4f8308d115da1135328f0f60c7ccad33537bc547ed92a9a9691aa5d0249ddda17df65ada347c87d6607be69d42402a6a5904fb3f13377188407491d8030ca22b22dfddec2f69f5a93fa9e2787c4ecede6d759b86782afc36d4ccad2eaddf54477e586e809134358411",
  "dc2": "bb0b1c1d5d0658b9a0f0bdb8bd0822098cfeda0dbe4ce59f974fbc0bbab56448aa9d3f2751a33d8029ce850dd7279aadf8913ec0131e3744c4a121c43f712040f143bdb442f4f1a511b24dd498f31e6e0bd678ed2cb12a134c59349e68a708973c995c77f0d0cdea21d62f8cd217b26170b8755a271a42b011cca2c44b1d6c44883504904d55e80972adfe8ca7b0555a705c5b96362ba60abb35344c7f04ca4c1d6a4884c4ba84267470fea5f7400770288d0ee439c66e6fb5f7bc736f5d8a55fa452fd7fc1e89a777dd8cb90f792b09cd35e211458636168b564f6e8f28f5a41cfcb174b10501925fb39ef31f97e1dda16be74ee14cdb9a5e07b7c4cdfb7436",
  "dc3": "891450f40a03fb0631f9b3a2876ad4895cedd6ecdd64ee1048152eef1f8114042fc240282593adb442fa51585c923df39b4d2de7e3c7886d9797d1b7fbc32c7905319bfad69fbe75b0fbc43e3ce7e59bbe36befa8ecc6dbeedd1b566982c2d4a24133508e97608377a26cfc0c8ac44fbc656af388543a443205235f52cd0f0693a000a2b21b5ee74cc1a01840aa8512c8ca71affa334b0f1ee050f050e3ef6aec413acee6b7a90c3f8953ee70c75e5b8b004489467d28836aa8e81c7c6f738ae7c9b891a675f2e027fd3bb6fbce28313f4b0fb399972f954dc9d65317d5d416cf49bc6ca74f5249034d20b941cb3179c91bade481147be9af19070c28d8a0441",
  "dc4": "93e65d5ce4f92cd68ab7bd1f35a45c24d8a529668ccd09208bb42aa6edb9be07ff5233830c3f913ad27d9a43e09dd7f848dc196e9c3775c62bff8e043afe89e8b15109afe82abc0fe5f4b359d93bf5e7d5b100612d09ae287de4d7d6b77e0d976a2cee345597410df2dec0f3cb604655148deb61db0e43c74711cdd74dc29430b30eb5d3d4698740b57556735276d8a06a35b93a23bc8ef2b4086490948a769556b80f6ca1edc1e8eb2dc4e50aeba9774e7c7fffdcb99bcdc5c9f95659ea6edaef287317fe18f0846b01fb3d4f77e87197e1ba069d5225259c0eda44b98404b5088d7d21c8631d47c8e64dc2c0e7b51955a8d4d3add60634c49c75c38cbe4bdf",
  "dc5": "b87e0be2122e7c01bf2d82e2ae64e46935710e4f3924b7feae5beb18064eddfc3fe3532f6be9a8a0a1a2dbc9aa8a5749d51c8a779bc5c7689858a3c05bbc97d2ed5e2a0fca4f5b47dc82fa1a814270aa15a1bc8648d75c6795d3da9b32ea06eae8a20628bd7b5f935c62e21e17dd180d6710ac6a65f3817d33d56fdc0819d37d6af0b753d8bca321ca919549a7c880914bdc439da62ee5ea650db07ca36198f9a91b90cd7990cbe8b77e52e97d3953e99ecc4aec29501a919141c3bbd7c5718e48639c400fc5d6961756ec5ccd652d983dbcf36963ab18163b57b4ac26b8336d8818b83ee145365d604d9aac26a5ab2b4384e725333be8626bb7a35a82081043",
  "dcId": 2,
  "banned": false,
  "dateUpdated": {
    "$date": "2025-04-12T12:21:17.615Z"
  },
  "firstName": "Artur",
  "lastName": "Pavlov",
  "messageCount": 376,
  "username": "pavlov_logical",
  "id": "7356746195",
  "remainingTime": {
    "$date": "2025-04-11T15:37:30.704Z"
  },
  "spamInitDate": null,
  "stopped": false,
  "historySpamBlocks": [
    {
      "spamBlockDate": {
        "$date": "2024-12-17T05:33:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-01-13T11:33:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-01-26T10:48:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-03T12:43:00.000Z"
      },
      "spamBlockDays": 7
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-05T14:15:00.000Z"
      },
      "spamBlockDays": 30
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-13T07:50:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-17T12:13:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-25T12:21:00.000Z"
      },
      "spamBlockDays": 7
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-27T20:41:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-03T14:09:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-11T11:36:00.000Z"
      },
      "spamBlockDays": 7
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-08T09:57:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-12T12:32:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-20T13:17:00.000Z"
      },
      "spamBlockDays": 7
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-18T20:49:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-22T11:39:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-22T14:27:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-26T14:00:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-28T07:38:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-04-05T02:36:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-04-11T08:03:00.000Z"
      },
      "spamBlockDays": 1
    }
  ],
  "nextApiId": 2496,
  "twoFa": false,
  "twoFaDate": {
    "$date": "2025-04-10T12:18:19.337Z"
  },
  "automaticCheckDate": {
    "$date": "2025-04-12T12:21:17.615Z"
  },
  "lazyCheckDate": {
    "$date": "2025-04-12T10:49:46.176Z"
  }
},
{
  "_id": {
    "$oid": "66dee25ef856541e1b71cdc5"
  },
  "accountId": "1723230754-support-298-last-9-sep",
  "dc1": "209f505f15ce1776ff70ba1369cc29cba8075b847727e937aa530e051f0b3e88f1f618b4c85a6ebf0b279bc2b36dd09449cb362694c96b1996849347787e0a2782c9fc057bcd59ece17f29d3539181e33a15a8d0f68f4483395e98e895d2c540461f54d64d14f1fa5af69a10e096947f8dbdab50ef8cb8acf771a031dafae161253d1b686c97d90e97e6a8bd9f4b4b4ad20a8a1d53bdead875d482b82e5fdf6b313caf7c7252ef8325519218c059aca7594416f7efaa9e22bd96ae3d5c156a5f8323bcc8aabbfd3b1e79ea35b243550b55bf1ed1201d09bf7d9826f357bcd7a681c06f94ea0434370197da0ca5dee6f03cf143b878bd297d4b99ea2c7bca07c1",
  "dc2": "ab3ca6b58ef9d1f309f43f172d5341092ad83474161404b7190274b6764325910d1502ca4e4ec6a83f7fabf952818777d4a018968687c7e75918da972ac5b256d4f51f34e2214b63d6b0147ea928fcce622637d1806bef8cf9b1d6fd6c810800f158d7839b1901fe36ccfd87051095b6863069040d03b1eb887ae047db55cf39ad2e4fa78514a4c4d00428c887b6cb9bf06d85262bec447e24bea3df1ab0c543c847cf410ec9be71157b684b88b4833e88549e34986791e1abafd2f97b8f38e8728d43060f31e4d24ba7bcc86798c3fab307087eb430bdd11c1dba56e771bfb79cfbc53dfcef2a3897516d5f95eed0a56762b5405ba2ead747262ce2099afb92",
  "dc3": "82a36b1cf6f7ef3abc27b94f6b5473d19f5d280990263bb36abac62b4355841dda9eec826b1fc169e225427a8d87304472dbb5753e209d814b74c728a467981a04eb9be051271bd14e3824beba7844b6f770ed7d458fd75cdb7b38c871b3a8f53c1658675da9657246ce6d1616ebce1d954d38d4276f5a37056382737fc7b8da271e12b8c3139c1004c9dfc1e7503a5f17acb7ece53a9f4abbf07aaeb08271364586fbf2b51a9c578526caf1913de1a495418aab5ac43a430cbe8dc98808034aa1fe2fb0fe9846a42b84f7dd09d74a87a3c9e6ee7ad86f7342d45efd7908ce749df821341e5437f57ed74fb7f6bfde5cadc38f6680ebcd56f92eb0a260d3bdfb",
  "dc4": "878c50befc16c836b0f4091da3beef42e77903e53255365ddef0965397ba1f200e71cef9f95d7b4fc7de42e2d3b1f139abdff6c160795ede1f61b2f5b59803cd1342a09acbf1a793b83d11616e1260230e93b452edbfca5a6b00bda6972e8f408a01ff862250a0b22867957498e963539648fdcd4291a3251c4958ce895f48d2a75ee50daa283fd6d9cffb9a3691a8a1197f6bf1012eea6aecbbd86b09b52c094031f046352cc9ee1d4453eda22c9e252d10b74f0ddfb7ed0b8e3463f51b581645e910d0a95b355ff7d8b7ac44a8baa7e77d51e9fda830bde40b7edc8b34a264ae14ff8c0413097ca8100799ffebd96efe3bd6eaa8d356f256251b2a0b8cf2df",
  "dcId": 2,
  "banned": false,
  "dateUpdated": {
    "$date": "2025-04-12T13:00:19.075Z"
  },
  "firstName": "Mikhail",
  "lastName": "Lobanov",
  "messageCount": 486,
  "username": "lobanov_sapphire",
  "id": "6755763621",
  "remainingTime": {
    "$date": "2025-04-12T07:16:16.258Z"
  },
  "spamInitDate": null,
  "historySpamBlocks": [
    {
      "spamBlockDate": {
        "$date": "2025-01-23T12:48:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-01T14:33:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-14T12:07:00.000Z"
      },
      "spamBlockDays": 7
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-11T12:57:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-16T07:48:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-15T12:09:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-19T18:44:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-21T15:57:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-01T10:38:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-13T09:08:00.000Z"
      },
      "spamBlockDays": 7
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-08T22:53:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-11T13:33:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-13T10:55:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-14T08:03:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-18T11:13:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-23T09:34:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-22T10:48:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-25T07:55:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-29T08:54:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-29T09:12:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-04-01T08:59:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-04-06T05:59:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-04-05T06:15:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-04-13T13:00:00.000Z"
      },
      "spamBlockDays": 3
    }
  ],
  "nextApiId": 2496,
  "twoFa": false,
  "twoFaDate": {
    "$date": "2025-04-10T12:58:11.264Z"
  },
  "automaticCheckDate": {
    "$date": "2025-04-12T13:00:19.074Z"
  },
  "stopped": false,
  "lazyCheckDate": {
    "$date": "2025-04-12T10:35:48.559Z"
  }
},
{
  "_id": {
    "$oid": "66dee264f856541e1b71ce56"
  },
  "accountId": "238-support-298-last-9-sep",
  "dc1": "5cdbadec8e67c495edeb64eeb285f00621ae2c77330f82bdafc03d89603101763597bbaa5a48c7016918dca47a8ffc59c94d2cf53f6af990612a86f2f06f169b6e82a9032c06c7308fb5f2221beb1db0048eb62505a2c4eaf0b6c7b7278465492a7ea9ee611faaff6519fc5172fdd6bc451f6b5d6d7e0646db81a9530ac6cf238179fed1d5a36693dd23a8e54bf44d707368296fdb85f2adca138b191138e897461f0c0ff6ff2ae78073b10c3679315490fb1c3a9095d1146be5a784a40bf224bfadae713b8163ec97d2808ebd5ff29e94f8a0b57f570e6f162c54a32a09445aa3300330adf3025a514440891821b01a23826e8868dfff7b260bd3ab1e19711a",
  "dc2": "b49acfe0d6e46666fc0762b6372cdd5e7b50ca10dcfa23b02ee017a53f9389208f8a42dbc938d6e4e7d0a7c6f918be44da49d002812f17b932d5ef60579dc9262b789a160781fab7f5a0f8f8292ef06c0cf9432bb8af1d4ab89b07b504dadbbd33f58c3cec5e2277fea3cb98f8da402c10f9a80ac8677f078d059840c82051318f60131d0e62de2628b7579188fc90889cd0d39414f5c75b7dce3e93432afeddc9d5eb71b5577759bc4005fab88a979fcdd7a7823de36c758972abf479c9e5578d13866d0fd86d98da7c248d6d33d1e81af65d7eb197b83af99fcaa0514c247984237a149d61f09d4939b92dd52aad6a924d180656cb6faa5d3e03786a217a81",
  "dc3": "464c263251fec4edce638f00904eb3521cb52b8e27df8b595266f1dc79353f05bd70e350132500e0d7fcfb5fc767a733a35f5149e7f287173bf8cefd6f4121259d129e3ab22f9c7dca57d2d0a0b00689af9dd93b7eb41ae9f49a15ba8c0b8e36f1529c7e1c8c2a2a5784ab286210b8531ed13721b1028b50a6d9ebacb9bc4399691a0dbb166cf72896c79857daaf72458e4ce72ba97d8739d5fddc4e2b7e200cd6bd4d93f663b1828eeb40c3c02ba5809ebfef5f9eddd76c079b9cd812ea6713e91453dd3a10006a39008b9c5ec333a33684c064985bcedc4f2cc226d4a6ca4c02054e7ea5dd5bd1571840891a3f03472ba812d8a01fde6321219155d4e26585",
  "dcId": 2,
  "banned": false,
  "dateUpdated": {
    "$date": "2025-04-12T12:28:43.933Z"
  },
  "firstName": "Grigory",
  "lastName": "Melnikov",
  "messageCount": 460,
  "username": "melnikov_enormous",
  "id": "6852083402",
  "remainingTime": {
    "$date": "2025-04-11T15:17:47.026Z"
  },
  "spamInitDate": null,
  "historySpamBlocks": [
    {
      "spamBlockDate": {
        "$date": "2024-12-30T05:25:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-01-20T21:44:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-19T08:25:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-22T11:03:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-15T02:15:00.000Z"
      },
      "spamBlockDays": 7
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-10T10:53:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-13T12:52:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-25T11:34:00.000Z"
      },
      "spamBlockDays": 7
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-20T15:10:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-24T14:25:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-04-03T11:56:00.000Z"
      },
      "spamBlockDays": 7
    },
    {
      "spamBlockDate": {
        "$date": "2025-04-02T12:29:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-04-06T08:02:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-04-11T08:04:00.000Z"
      },
      "spamBlockDays": 1
    }
  ],
  "nextApiId": 2496,
  "twoFa": false,
  "twoFaDate": {
    "$date": "2025-04-10T12:58:25.607Z"
  },
  "automaticCheckDate": {
    "$date": "2025-04-12T12:28:43.932Z"
  },
  "stopped": false,
  "lazyCheckDate": {
    "$date": "2025-04-12T09:03:52.965Z"
  }
},
{
  "_id": {
    "$oid": "66dee26bf856541e1b71cf26"
  },
  "accountId": "+79526729334-support-4988-9-sep",
  "dc1": "559750d2680196dddd575d0dfac3bd693d78cbd87160d2de5e6674d173c16555f85c7ac31a38caf99420fde47769d057fa1178b7fe41b16c32048611950d9d1f29b0496c9ebd5d5e3db668a241d06b7e2c67d0907a70d5f433c0520a2ff6f6c4c3db69970ade4887eb846fb6bd60c97e196263bb270e033284bddead89d8f82ae72e7edd08fffe5365053b965dec9607009d7a7c2a081281ccc1c27b8b4f9a4d0563cf05a57450a7d6bdb00c78a9a0f618a07e55214d69e7d95267a82bb86c8599ba59c7f627d8570da5ee36a31aeaea6152bbe0f8e126a057c8957349170d9af0e68721c01a5729a1d171f163e8bb2f9092af69f6bd52bc85c9f8eabe946a68",
  "dc2": "05eda10bb4a34fc8768b37ba8422934b9c8e70cbd53824e5bcd342dcf73516b763d4379474dc5e6ed822d7f00dda992f022397d34aa1f95c4795e3462ca60849cb95e4843accb14b502d8ce4ee6101442a40035d4950c15c8e84357762f9fe91d6216c95770de3d9eee1296f12642c29915b182c5a246df3084c62bd6cde92dff6fe6a38aebfe85c8878871f418f1b52ce38d57e3446deb4e5725799f5500efec706384093f9b8b93d8da399673c94a2da10aacbe1b007321ce0c2ac825e68a313c7048d5f1d25df60b87a67cc8d46897603beab97b336697886c3b6522fc1a1a94144b358f95f44a3ebeadbf561ff8cf6bc0df2619067e2ef67d648533c19ac",
  "dc3": "150aba819346894d3bcb003aee8553fc8435c4166dfb8b91c7ad1457b2b5902d35985e0e477c7de0eeebef02ff85c471f197b657bef7de30c8b89b628978716a8060eb5bfe8417475ac603a6ad65dc5ccc64a12a64226d12a29569edecd1ee24720758e0f673f48263dd2fb93c27bc407e245bc7f6f15d94de2b096aba2494b9ba844ae914068f84a942210be5ef6306b01393a8ce036bf187d9c226ec5838e6e351a96a33952e01ae96fa9c72a477e7f8098db9ff817cad3e026d62608e73452e61192cbc0b4fa071f86a37e0a0b2b9883fcc9c63670731081673564284348e84f2bb4d85582af473cd444749581e721896b68df05d0ab8698b203baa758b3c",
  "dc4": "66fdf4536632ea0cc573be28c1e79c9f27c5317766d2b81c1822375675eea5fe032fd9d5ec41216bbf15b1f3d127679cfb6da2282ffb7218a271a94997e1d4cb8c8caf8d73617e62f661177bbac710531d70fb8cd85687d87cfc034109ef62253b6111949194e7f5d5c281095af362947c83a23ac4a72d67fd9002571124d918907c87ccacc4b57d1bfc3e1cc44f22c4450e5ed67cc79114588360ff495984469ea412ce23dec3e313d9d3766842a378d77ab47617d73dc3f7d113ae43921a736b1336186c75fbd69b5f1a89006b216e5e423dafd7509aa988f2f8862a01de27a326a3536a20e3f2e7e92bfb4929b69e0d0e51c27c578af63da48afabe0bc1a9",
  "dc5": "4512c119b97b788ec44a12a3b96ab64d55bfc53dd9228d2f086081b9b575f9d3aea58e35f50468bf078c738a0f4eb60964bf23dd99a6e11d7de2d7d8a75f886e3d4f79e43ec235b8bbe2fdd2282c22f4f226248a39ff934546a4e587196dc08d9a49f4bcf6d17735ca5bd22e2f1b5ea9632f95888c45b79c6dc6b591fd575de7d88f5f239f371db1cfbf3fe3cc5b40dac635c5d4ddf9f25312ad9a373436b109813caf3220dcc3ebd4c678d39b60f2c178de3a7e78797dc203304da2f999798a538b29d494933670d27638851456663a1e8fe4450cdd7be72ef9d9f7f8cc6876ccf4f20a18efb32fdf6828c3a1f478592a932ff071a3eb958df46da25b488a0e",
  "dcId": 2,
  "banned": false,
  "dateUpdated": {
    "$date": "2025-04-12T13:02:57.802Z"
  },
  "firstName": "Vadim",
  "lastName": "Zaitsev",
  "messageCount": 250,
  "username": "zaitsev_residential",
  "id": "7271315898",
  "remainingTime": {
    "$date": "2025-04-10T14:50:35.346Z"
  },
  "spamInitDate": null,
  "historySpamBlocks": [
    {
      "spamBlockDate": {
        "$date": "2024-12-05T09:02:00.000Z"
      },
      "spamBlockDays": 5
    },
    {
      "spamBlockDate": {
        "$date": "2025-01-04T10:11:00.000Z"
      },
      "spamBlockDays": 30
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-09T13:04:00.000Z"
      },
      "spamBlockDays": 30
    },
    {
      "spamBlockDate": {
        "$date": "2025-01-20T09:17:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-01-25T18:45:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-01-27T10:44:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-01T07:10:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-01-31T13:42:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-03T08:36:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-10T11:50:00.000Z"
      },
      "spamBlockDays": 7
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-09T09:34:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-15T06:07:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-14T15:05:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-23T11:01:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-25T07:25:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-01T07:53:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-12T09:53:00.000Z"
      },
      "spamBlockDays": 7
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-07T08:57:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-11T08:10:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-15T07:46:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-20T11:08:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-19T11:26:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-21T07:30:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-26T14:19:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-29T18:50:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-04-03T09:50:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-04-02T13:27:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-04-06T11:46:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-04-10T07:48:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-04-13T14:26:00.000Z"
      },
      "spamBlockDays": 3
    }
  ],
  "nextApiId": 2496,
  "twoFa": false,
  "twoFaDate": {
    "$date": "2025-04-10T12:58:35.118Z"
  },
  "automaticCheckDate": {
    "$date": "2025-04-12T13:02:57.802Z"
  },
  "stopped": false,
  "lazyCheckDate": {
    "$date": "2025-04-12T12:36:47.365Z"
  }
},
{
  "_id": {
    "$oid": "66dee26df856541e1b71cf4e"
  },
  "accountId": "+79923044124-support-4988-9-sep",
  "dc1": "05ad30f4105c53af55384f213fd0bcb24b97b980e73fe43c7a2c4e3f82e560c77046a2384ffde0a4b5e293913a853357762cbff546cb8a43b1acc528767c805e05b3e1bb8aa857a80626effdfa9da636ff4dddb7f6321426a58ac09d9261f9c2e87b5eb8f9bacf8e9a647266311ab13629db857f0e04ef464fde8fe5ac73e6dcf83bfcb18a54206efdffa144048462910225411d412a071911c0b3c12abd964dfca6ea5ba963faeb8bb8d1667aebd8fb54031012e7c91c468cedcebda0b803ef4d0c1efa656cbcd77f20b3bb160141e7b351ab1c1ef052d6d0fbf7cb8d8d832510fb360acf865b23445f070387a2e7849f5a13b50062cd5b5c405fb2baef0e06",
  "dc2": "9e754c7a0d179f52493e0a573a6c0b5c4d8b50df197dc59a4f038d705aa1ee48b7f2641a5ba61012db163d7b5cbfbc7dce8d3eb1f1808058acf1e00292b4b61e56f31fe75d42dc42e25dac90908f864101c4fe7f7b3bc9764abce75b7e0378918e5f5a537a3c7df7b5948f532dcf0e27b3ec9926211f30c7d6efd09c4114eb1412f0b1f57542b5fedd28f2bce961511788def97caad13b0add7721803176a211a93fafafc4bc3d22c4b4c1e6fe850cfbacaee7f283c639618a41c064862c8f063664d503c62728d4f6b6c33a055854f9c8d1fd63bd3b60053fd2ab75c3e6dc7f7a5e5d5602ecf4d1a23ab5b236cfc7c2546b3de1679422b4ca9ae6e8a7a1aec6",
  "dc3": "03780158c024c05eb586ef44f5f43ab053bb4a8027f20da9d318e694bb87adbd5e366cff540320b2b00b031568572e21bdaee647b7ccbec7a63ae0c90c582d204d58e0a25031631ab164b85d2b3af29ad22126f629581769228315f0e673a5d23dac8943578098704408d440350f7aaadbf25c8df7c597d39105c24b806e274767a8f4c21a26abb2aff7fe8190c492a52e9e84a41a8b72de195e9e0275b09d9a63bc4822330a726f088404e362292565f73d5bb5e7803fc8bd1f73ebe89514599d259e660ed17eb6d863a35f56f7b4fb1904a828287796db082836894d22dc67a4207cfcfb2a44bf2f22da3dd0e17cf5b141b569b35933cf7cca89063aed4ec1",
  "dc4": "1cfd15718bfe2a0466cda36a5ef783cd1c84f89ce1cff3bbefa1b58eb6d32b1a2bf65a0489813a49a4505dcb7d156a7d8dda79309bd2f9b6d61fccaf6168a7aa97af64278b3b8cf8bc3c0a899e4ea4265db58a6577e6ec43242dc7f5e08cffe5a4442d2d159e1dd59b67c71bd70c43de1582ef949527522c6686a752a5428b21571e0b85c086d82604681be98751e01f5a782f01dd2fa6738042001672a8483bc89e0d31c66d60998214868bac94fe639ef9c7b8eb271292a2937be346497eaf98a99269d06625341f0932252f6139b0666fcd82bee42b927e4489bc996ba19144553a1022beb1d6bd0d3267cf52a25a1e99d7d53f804d91084cae157e926f8b",
  "dcId": 2,
  "banned": false,
  "dateUpdated": {
    "$date": "2025-04-12T13:01:56.341Z"
  },
  "firstName": "Anton",
  "lastName": "Loginov",
  "messageCount": 403,
  "username": "loginov_favourite",
  "id": "7454829036",
  "remainingTime": {
    "$date": "2025-04-11T16:51:54.594Z"
  },
  "spamInitDate": null,
  "historySpamBlocks": [
    {
      "spamBlockDate": {
        "$date": "2024-12-12T12:39:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2024-12-21T07:57:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2024-12-28T05:13:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-01-23T05:52:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-05T10:01:00.000Z"
      },
      "spamBlockDays": 7
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-08T12:42:00.000Z"
      },
      "spamBlockDays": 30
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-21T10:11:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-27T11:01:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-26T18:28:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-28T21:06:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-11T06:37:00.000Z"
      },
      "spamBlockDays": 7
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-08T07:49:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-13T11:52:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-26T10:30:00.000Z"
      },
      "spamBlockDays": 7
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-21T07:20:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-25T22:12:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-04-03T13:39:00.000Z"
      },
      "spamBlockDays": 7
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-29T17:06:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-04-03T19:39:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-04-17T09:10:00.000Z"
      },
      "spamBlockDays": 7
    }
  ],
  "nextApiId": 2496,
  "twoFa": false,
  "twoFaDate": {
    "$date": "2025-04-10T12:58:00.812Z"
  },
  "automaticCheckDate": {
    "$date": "2025-04-12T13:01:56.341Z"
  },
  "stopped": false,
  "lazyCheckDate": {
    "$date": "2025-04-12T11:56:46.945Z"
  }
},
{
  "_id": {
    "$oid": "66dee271f856541e1b71cfb1"
  },
  "accountId": "129-7-september-9-sep",
  "dc1": "86d75c9e8732ff9a016971b8272a19905d7fe16776dc16a3334103617426cb9f371b67deeaa80386fd709b808a9620d350c45e9bfae5aa4ef9fb7b2e931864e44cdf7e68b55bf689a3bf8acdd8826446523c0ab5f6400d1f03bdc9607880b791358174f586b48d4b6b35275e2e0fb497d0cdb944fdba34b15521a3e4626a9c06264c6444d4a095634ec47b7d4b0eadb3a61e86304635285e3d48f060a9aa35572e24ef304ea6623c160fc078553bd109b4ffa162b55c55baa8b5f6b7e540d99c1d08029126198e7a773b1042f77974455446b35c8cab364aa828190fa3637b56590b15b94e00465cdae377044b9210070336b3d06cef6ca3b7b34fce6144c37b",
  "dc2": "730a8c84149fb00b2b20bf789c420abd2e206f4e051a13edac994d71eec80c0c4fe2c9446569b56c0b3cb22a4df1a0ca7ad37c223d3149fb90983b13de30e0352a74622f1670d2a2dfc33fa27d0276e7515af172ddc710ee8e52aae63be9e8c66865693c4d546830c7dc58b76263bf252cd8797b72f2a886cb996c30fbf853db5ee6234b2cf205805ee3cd87f00d3924bdc207d0c86557b63f8d4734eb13db9bfbe134de7a1bfe84ae525925695572973be07e897b5e01985a9802516c433e8681378d9562efaba868bb226d3d9bcdc60edfed14bce4efe4896f640ac84a7996381dc6a728d503a54a1aba6221b595122960b159aa86ff9bac916efe65bab24d",
  "dc3": "782c686381ee46577e42c59f1d2f0f9173f1ee330778e09e730fa51556cf81d5bbeb0aca769f3b390af2722f138d65a1862fc396048b1c3f2492afc7a3353e443fae8773e6ae5b8fe76f15d4738cf5e7903a1ea51472b09b244b2d977c6acaa341388e4fec441b00037acfec84c2127367c6f7323234125957b765003403ab94e36282bee17d723417429e21077c5e0e30aff5216222f2de9868ffd3f084ec5609e987e147c1d7bd337a9a8a79d09c929e8d579eab3dbf4ec004f312f4d86e49f22c911717f80b73633a7eb55351ec14a7dd3984ae4e8c4c40a8c78a85d1b183f401a32b27c2de101b7da2cbc2dc866e0e2de331ed50fa43135a2401797695d4",
  "dc4": "1db680c8071a82a0d2969592813c0b21def7f96368c1c3decd12653c4a671390064669f2ca038349869fec1fe18dceae92dde6e56a0642917e15bc6b742bf9664a2858ae8bf907b10849456d81c38af4abcd4353d10214fb44ef44c2a2642c04348560d5e35533dd7790fdf107eb30f644f035b4cf1038525ca76349fdf393243db433db573173aad568bd71a5afbc9561283bd1fd6919dc85be36eeceffd7e0d031408998872146d78f6290dfbcf90127fb27e62243565c07bbde783558ad1ae6d123ff1c385c8365ba03b466124eb4bf16fe362b74a45594dfd6632e3f8723a510c0644567d21e5ecfb6c490e36f14ee65c10a603d4c4c5b061e5647efae14",
  "dcId": 2,
  "banned": false,
  "dateUpdated": {
    "$date": "2025-04-12T12:33:32.119Z"
  },
  "firstName": "Fedor",
  "lastName": "Kashirin",
  "messageCount": 243,
  "username": "kashirin_double",
  "id": "7398990205",
  "remainingTime": {
    "$date": "2025-04-09T09:47:29.958Z"
  },
  "spamInitDate": null,
  "historySpamBlocks": [
    {
      "spamBlockDate": {
        "$date": "2024-12-14T05:40:00.000Z"
      },
      "spamBlockDays": 13
    },
    {
      "spamBlockDate": {
        "$date": "2025-01-14T06:40:00.000Z"
      },
      "spamBlockDays": 30
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-19T06:15:00.000Z"
      },
      "spamBlockDays": 30
    },
    {
      "spamBlockDate": {
        "$date": "2025-01-29T07:08:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-02T10:20:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-02T10:56:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-02T12:36:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-07T08:19:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-07T17:00:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-15T09:49:00.000Z"
      },
      "spamBlockDays": 7
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-16T10:01:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-24T06:03:00.000Z"
      },
      "spamBlockDays": 7
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-19T11:04:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-21T09:33:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-22T09:24:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-27T08:39:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-06T09:27:00.000Z"
      },
      "spamBlockDays": 7
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-06T07:49:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-10T14:30:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-18T05:01:00.000Z"
      },
      "spamBlockDays": 7
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-12T12:59:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-15T13:10:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-25T12:29:00.000Z"
      },
      "spamBlockDays": 7
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-23T05:09:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-26T08:15:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-30T14:05:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-04-01T06:41:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-04-04T07:31:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-04-12T07:54:00.000Z"
      },
      "spamBlockDays": 3
    }
  ],
  "nextApiId": 2496,
  "twoFa": false,
  "twoFaDate": {
    "$date": "2025-04-10T10:02:01.902Z"
  },
  "automaticCheckDate": {
    "$date": "2025-04-12T12:33:32.119Z"
  },
  "stopped": false,
  "lazyCheckDate": {
    "$date": "2025-04-12T11:39:48.589Z"
  }
},
{
  "_id": {
    "$oid": "66dee274f856541e1b71d005"
  },
  "accountId": "1723852834-7-september-9-sep",
  "dc1": "43aa9798e7b967d1131eac59f69ee8518a69c5462357a8137a65ebb6ab53ed2f0795592e21e62187d75a1ade3d617223adc2df5d9b360a88b3593f77332bf38f715fd77dfa88f34cb7a23a2c3bff6792e26b33ee1d5f9d7aee854cc64fea8c4fe894e5b6505ec7e81d941f9ffbf9fc1c2fb059957a98a08a78ff8f8cc8b46b35a9ed91dd59c2310e41dc67cbf421eecfc606af797a65c6051f6f700ea4f39443796bb5925faf3581043978cbb8f62f9c8d7a27eb52bcfe53f0468f0ef4b99857cfa288851d70e29cce7b998d4cddbd6755ba794d520677fa6036e4b19fac0abb0a2758c94cb8f87047ede579025b1a0cb63615d07ddf08deccf25d2d2b126de5",
  "dc2": "131c2a961b7e955377fa7f118c04e5d02e53eae8456c74b8544ae21eaa5efa258ab83e67d6f53080b927ac41c863fe77d275050d9498f85b112fdc25b7059e7c7f500bae01b249fa7383644289d187cd56034c583e6c0747162557a73e9a4b7812ccf462c878a408726f70b443b5b6764253eab94685ef3daf23b874a9b8a1b6e5d560594387fa65728b1b8cf357297ef1bf3fd9994ce1b4bab63e8bc4ac7aca407bd743a4d85b09a9d2feb715f653dc95dacdc7422596795478edefacfa01f619ef645dc9b21dcfebcbe894040b37363aab64d3cb082ed478ac9a47e05df0c32678064e84b89529f35e5b54a2d331d798bfe87e35382020d502dbef53138d38",
  "dc3": "536f024e03e19c2370f20bb05d97f8e3fa9ee606d554cba476ac59f8e07f33d64f98d2c84f5429dd2c7dbe7ed43679c9b89dc108b9d06bba8f482ac345623e7b63395ddf181f76bd3b5274ca0cbfe5e1bf1847ad0f501d764bacffbfdcea147bcb58cf1c4a03d4e9a0cf9f22a1c0503c32ef5f913d9920c6d1aeda1fffce85d6ecf1e07d92ee8dbe2ccec5b977647c736bccee4633eada6135d4e7f00f237bf9f4fb420e340e9f2f3c01648b126b00ba8b060f7a70c49825a187e6d921aef2cc3f7a1b6d78ab4f2035fd7a4f86230f65e5d1c99682673f186dbf35398fbf30ffc3bfbe71efcf0b8b17c07c3b0286b2d7c9d1aa672e03d5fd2c5c98ead3677d37",
  "dc4": "845f9be7f9542f9c527ef7cb88fa4c2c9a765292eff2852656347f5649daeaaf84b2e3495f12f2c8fe1e39842e83a0e04afb26579b315ae1f79625504389589ee9f79bc04235329e4390ae5eb9c6c8d41c56058c346ba6d90cf91271239682349b51e2e1bb5261888e254fbeefb1ac2405bbd7c89ff5d08c5c1d032a14a8563561f3ad99fd3c922318368c4ceb167b95bd583e7fd75bc7ad8b074da65d8edb21d711d112e99553d19682d88e5845c0acadb6902114b46e8c950cf79957d69865f01b81200e399a16f81597c105dd90ef401edc3ecee52e5b0998dd289ea41d955adaf2d6e6e4b063e1305920a4d02afc83a0371ae704f4582f19aaaf82c3dcab",
  "dcId": 2,
  "banned": false,
  "dateUpdated": {
    "$date": "2025-04-12T13:08:00.653Z"
  },
  "firstName": "Egor",
  "lastName": "Korneyev",
  "messageCount": 388,
  "username": "korneyev_impressive",
  "id": "7439235932",
  "remainingTime": {
    "$date": "2025-04-11T16:04:59.643Z"
  },
  "spamInitDate": null,
  "historySpamBlocks": [
    {
      "spamBlockDate": {
        "$date": "2024-12-19T15:22:00.000Z"
      },
      "spamBlockDays": 7
    },
    {
      "spamBlockDate": {
        "$date": "2025-01-13T08:40:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-01-23T06:27:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-01-24T08:47:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-02T22:03:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-18T09:55:00.000Z"
      },
      "spamBlockDays": 7
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-20T09:00:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-27T10:01:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-11T08:52:00.000Z"
      },
      "spamBlockDays": 7
    },
    {
      "spamBlockDate": {
        "$date": "2025-04-11T11:38:00.000Z"
      },
      "spamBlockDays": 30
    }
  ],
  "nextApiId": 2496,
  "twoFa": false,
  "twoFaDate": {
    "$date": "2025-04-10T12:58:01.002Z"
  },
  "automaticCheckDate": {
    "$date": "2025-04-12T13:08:00.653Z"
  },
  "stopped": false,
  "lazyCheckDate": {
    "$date": "2025-04-12T11:49:47.039Z"
  }
},
{
  "_id": {
    "$oid": "66dee277f856541e1b71d060"
  },
  "accountId": "1723853682-7-september-9-sep",
  "dc1": "a2c244e1ecaf7e7b6696e65cfe0f49bb823c62a701e4d48761618dcf819ccd10aafbd0d10f85a50d5b8a4d53dd5a7420f367d7a75e4ac790e14e9e2e97586a141dd92e493900c919c9abc5528eaaac0667413db4d5e8eea98444add2ce80cadf81742eea279e5dda43ff50370c623538c2ead457083b34a385b58604d4e33751d0db866872d2bd1e73183a507cf0e061f942f3bfaa388bb1b1cf5ad63bf16fa971e507fdd20d4db68222baa61e8c33bc03e0fd825522db901aa0c5dd4c68fbb93cc84452142b759c7d7223894d44d9059873d1b2cf1880b44793d669709f644f2b4d44f81dfcfe7960673549319937c8bde3da607947206bbdfc722b33099462",
  "dc2": "82d37a29888baf7cbad6ab63ef86808bf6742e910f2dd43d53fc5ea98e479c170f6a6938f54e51bbd9a5115cd60ac5e842a7073886dac2aaf94c19853678744c4bb22e378424a5555425b690f15babd69397b5ed6d82a4bbd9990035f86fb947aa7e4ce37a071ef4d9e663831329133de5e03476950f713a540a5bd81776780d82607fe63daee3941f5b8297b770aaf6ffd906af55e1b1152035ee9bff3bb22b46bf74c69d351ab11b8810c18fdc1925331da410574ad3efeeac4ceb5d432c39ae2fc07822a68a7e7a5f3f439380e8c0a48c1f947ae401dfabcab95bb45e473088a2407cfe40e75ee465f2e1123608fc0c2369602e31e5eb040e77f7db1d28bd",
  "dc3": "32e24a5510d9b8807b5f975e894a570a7a429e1afb3218998ea79a8343174cc586fbdae233f6a806d1dcce709999bcf13642d4f9c44f11eaa43b115a781aba66aa18961ce04f974d8d5384218b9bf4f7232cd640e840d174521ec44072dee1b40e9d179f758dc1f6e531d2c12143fe080b7ed90d78baebb0c57ffee64423b83c1560e39fd0919421a66b7167a74ebe9f1bd9c944065c3970a851072076f4944df2adf51d129fc1fb70a743fdad56bf786f17a4f477bdfae26145e21ea102f9ad1f7d4931fe9a1b6973650899c287e5b41108e15c9262e5d740ff137c93b1cb59e9bb048df18512fe63e97c3d7d63f6084bf91a836f60fb36c785186b5e28d317",
  "dc4": "aca636502377ee5fcccaaf774db66d00e1c408c05ece8aab326107993a837e381b8a859465f959d8ffb71e12f91560749259bd17966924d414d581788ad30b9284089fa05c36e90363fc55528ef4f3dee134c9c7e73e96b4e9c73020de51509193a487738d93acde972e61859171a7ad7d26e5de86ed1e95430bec168b7e7f80146e664ff8a02693d1e41ab8e562b383bad03b040ffbacb507a80d7946ae8a37728a418b5fe45eb7afbd671f09ba10a6bb3afc5a18af63363f3b8b8936590b209a3db1e28c1f41c55d063c7a916ccb0c7404ebfa714522204b921e7154d5a13c96366354bdd217fca9f21a8221e9f5bc9895a272ecb4bdccba82e7245c5510b9",
  "dc5": "c01d9d13b04466fb0869d2777b8b24cb062558dc81145c7e046ce5080c46792b107a840905014113b2f77772c3f659cee5de46f5c1a34b59cc927d10b7407c294a55d19164513f2660e2217c5a067589b1f3bfd5588e951a04bc44c2ef93bcf836878354c7ba0230ef90501459030416cc56011a51b779c4f2ae51e46ece1c07fb39c932586bc56c8f0b452a98eef203f397279a84cf8982e459005c62aaf19b82142fdfc58f36dce19995aa565f6a37a6c18ffc3bb3b269e190da2ddf157c088e744655dd6d01ee9f1d42edc608493097414684d19afa518eb201c003d4def6005c73f17019b9e8340583b579958053c5079d3fbc6e616c0d7f3ab9db6df473",
  "dcId": 2,
  "banned": false,
  "dateUpdated": {
    "$date": "2025-04-12T12:14:44.028Z"
  },
  "firstName": "Victor",
  "lastName": "Korolev",
  "messageCount": 446,
  "username": "korolev_unaware",
  "id": "7256992716",
  "remainingTime": {
    "$date": "2025-04-11T16:56:10.454Z"
  },
  "spamInitDate": null,
  "historySpamBlocks": [
    {
      "spamBlockDate": {
        "$date": "2024-12-12T10:32:00.000Z"
      },
      "spamBlockDays": 7
    },
    {
      "spamBlockDate": {
        "$date": "2024-12-18T08:11:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-01-13T08:25:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-01-24T09:08:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-10T08:05:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-28T10:09:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-19T12:59:00.000Z"
      },
      "spamBlockDays": 7
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-27T10:09:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-04-04T12:55:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-04-15T07:26:00.000Z"
      },
      "spamBlockDays": 7
    }
  ],
  "nextApiId": 2496,
  "twoFa": false,
  "twoFaDate": {
    "$date": "2025-04-10T11:29:34.668Z"
  },
  "automaticCheckDate": {
    "$date": "2025-04-12T12:14:44.028Z"
  },
  "stopped": false,
  "lazyCheckDate": {
    "$date": "2025-04-12T11:56:36.717Z"
  }
},
{
  "_id": {
    "$oid": "66dee286f856541e1b71d1f5"
  },
  "accountId": "1724603779-7-september-9-sep",
  "dc1": "0578f460f684c8d5a4c272d7359943451aa62f9e2b46d0d6998b7ca18495ae31ff5476c135a12db9ef00cb62a75f9831f5eecec9c9d372c47bc3a4016bbcbb55e4f81893f4b31e5702d9d983c608c80a6914026a3803e482d5e74cd301beb6c04ecbd63e29aecdae1c9b5be4e82b42af9c613861ce2a703b1daafcdf77b9dc7e6ac2084f4a5fe2df5d0a4c312b36663cd3310e9ba463d261a27d8b5cee45816f687161c6c6b588d5921096780538586b7f5fbe46822b6367430f19440e6f35121f963174a834563f86a025712b9dbbc362b8f1ec3913aad52ab8d4c2496b8a8d9e2269b17fe8289250fb589b665843c84e81b1f7a608851c3999ff3a500b0cf3",
  "dc2": "0f71c3bab5e60f54a79ebdf0923ab78075ed0e265aa72ab3b487ccd924744606957247a4aca953da37d340470dfa8d4538beb5e01f752b42bc90f18af5dc9e7008a8ec81bdb8270561909ea0dcfdbcd499e4f78ab09eae55b8d5c04a72e9f7ac7b3f4b3fc228c83041ae3b7704457870e971a9ae37807a9ed5e832e75fdca2a4cea7a3d3bde3089cbd1bdff84f327b30c8f2fb7ff4d7837d0c2f4c35b62c31e25b669815be486e29de4c8a2f0068a31d43f0371b8ca47b7b022ab7642fbbc0c35a946a13aa3bb9eaadac2a25574536ad1befea519cf33c68810d52687abd335071aca61884b45e25bd34f465596f2127971cce0492d0ec875b289e2b768a75f2",
  "dc3": "2969d1df468d9f3c8866fef4d1656f2779ecf1dd413beb530cdd2e47708786159f25d3c3c18f8271d7eb5e2bac6c7430385c9555c16eb24a2c5b220be3e47182a00cad933b3f1b9a0fdfcc5f9b761500ee4256021a2dd2deca02510e7dbd90cbb3bd1774f76c9c8466faa602332d253e2e747f8b0236cc00ab290495e8ff2243084f158109b69b413e58ffe0ec6d19b619c5e58aeec1c85ecfd1a67fa0097390050d8f04d318f93e40ba543ba0b2f326bf56956ea9380fa176a3cb9e86134b4cccad42e2a3ad06a1e7bf341c4bf504068c2d214e04e1b440e4f1d96d45829e38f2a02b1e440abf5ea14fd4529b72d3e374501fc548316b2744b1cff7061b2505",
  "dc4": "59a68cb9fa55d5f7432f01133bcc4b956646bfeb04f66a5fb85b30a8075b2e9bf38d9ad105d69c66175cd836fc4a660e45a1aef068b4db38e783b2ad0904af470c135a07d59fcc0c1b9ab13e58be179c1a3aae0734cdcdd03543f724c8aed7815f80f24d2eaa63b7fcc0b2e69f05116e0eb3e73451084492b32f77e7114d48e9b356faaec66afb13267c92ec085ebe62304dd6613de0ff63cd4146e8ffe2c90abb8e7beff6b1b61665f55f326b95a218b191015c885e581c2106238dcbed58da2173b00fbf49092a080c94d9910aa898e7fed6d19a2fb5a617b73842585e5059499f5b526309f19a3e84064aac0f6d00ebe6b8bac3ae714b2b1a6ca1ea86fc2e",
  "dcId": 2,
  "banned": false,
  "dateUpdated": {
    "$date": "2025-04-12T12:23:58.459Z"
  },
  "firstName": "Alexey",
  "lastName": "Demidov",
  "messageCount": 440,
  "username": "demidov_light",
  "id": "7310275693",
  "remainingTime": {
    "$date": "2025-04-09T12:41:50.599Z"
  },
  "spamInitDate": null,
  "historySpamBlocks": [
    {
      "spamBlockDate": {
        "$date": "2024-12-07T10:36:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2024-12-19T12:34:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2024-12-25T05:42:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-01-23T13:59:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-07T07:47:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-19T09:12:00.000Z"
      },
      "spamBlockDays": 7
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-14T05:34:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-18T08:31:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-19T11:37:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-20T07:57:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-21T12:21:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-28T14:07:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-10T12:01:00.000Z"
      },
      "spamBlockDays": 7
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-08T12:02:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-13T11:37:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-13T15:06:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-17T07:29:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-26T17:36:00.000Z"
      },
      "spamBlockDays": 7
    },
    {
      "spamBlockDate": {
        "$date": "2025-04-30T10:21:00.000Z"
      },
      "spamBlockDays": 30
    },
    {
      "spamBlockDate": {
        "$date": "2025-04-03T09:34:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-04-12T11:08:00.000Z"
      },
      "spamBlockDays": 3
    }
  ],
  "nextApiId": 2496,
  "twoFa": false,
  "twoFaDate": {
    "$date": "2025-04-10T12:58:14.488Z"
  },
  "automaticCheckDate": {
    "$date": "2025-04-12T12:23:58.459Z"
  },
  "stopped": false,
  "lazyCheckDate": {
    "$date": "2025-04-12T09:28:08.911Z"
  }
},
{
  "_id": {
    "$oid": "66dee28cf856541e1b71d290"
  },
  "accountId": "220-7-september-9-sep",
  "dc1": "ad4b68681c327b20bb23d9e24c2a2946be68367cf5705e9ace43d9e6325a13080c943a20a90881ba6263e7d8a21e8a314d7d953df909264e01968f86c43afdc14fbef35900a02db1f1c3b96b6002f54d1dc50ed991371b22fa955e330210fdd5ad19b1beb922c49ff6eb30e47d401adeb0f2204d5e54f061c02b00e4ec8d69224bf3dd86a4cddcbd3c02f06e2b83d7db683c9f63206e8904d59e283f7cf1f6abe1cc2664be79c0f77ed89992b54ae337ffd1faeb3548d5c7e1c9c4f339699c7eef1ad9364a6071bef5b5e91a0fdfe83d4ea5dfdadbd719bd46f8a05626071ebf1898607bc09a156f14bb7cddcb6962de5ef912fbf55dc236080486b4343bd69d",
  "dc2": "603da3ffcb4a58924bb84cb6cb810e4be62a3ad7ab645d7a8fbd4a65d87f7f26ee563371580c064e1cadbf06b7593aec7bdf7e7e6a3ca536f5413c787b1f9181081fac7cf4713bf9fc23aff40db130c50a94c872649e2e76218e7f0974c07da72d9fcee4f1a79bf1f53b76bbed898fe855d1cfb8cbe4ea5001c3265e639d9a06ff582368954926e329cd879ce47f9d9dc3f4292404a62f000422c2ee7835d32294b332dd4631685026b977737e5cb8f23225b9a11b70815088a651822f04b0150c6a8ee9af83a02562f152657e28010e298262f55bc044d0618fab37837041a2184941f84ac1468c9ebb00820c8334a3025c2f26ec66140c048728c7e9aabeb2",
  "dc3": "0e86339d951e47b21e3890a3835c1a7487c71f4b977f0da44a421021ae3eb8790b6b51cfba31352672ca2dd99fad34202af1518048ac84ddffbff85f2dca2080d4dbae886e7229125de3bcd8bce8d2240c0a2cb592c1ef0b51bee852d905297ceacf8654998487b296940bed189163afc33b65b8e421a95f8bd802c0627963381096aa52791c8f515bba02924e17abc810f2fe52b689912d8316df2c41e6e34c5948047b23ca81e5cc985770bab0b3417f8727b4bf2114677f801de660ae1e9662701f7bf99ed16221eec2160bc5c7929246d9ba9aa09a0fcb2f8de26a87801839457706f76399795c947336eddaf96e0cd9ee47ce81001d3718eba847448cc6",
  "dc4": "a716aa598cf210cc1bfd754b47200ceab58d12f6d6103c65810fceda30ae8852c639670ccc2a96d9db44a17c3135ddc3f0fb5bd8e8a4509c8da3831396d37e490bbc6f04fc46c56129ed262dfa32269cc4f75e556e2f6b055d534ac639b544095db394fd6ed5dea66b8d09ee9743d2077de94486d174e2b5306e0ff24f4693b1a39ac3d56b9867d9041cd5c5745f45c8e314626ceedcf3e603d1a473b03cca49fa78ca06f9cd55860efde3c815b95e75b0c35fd12e2a6b9463c061d8e10a0797fb38953985b06b81d19f4ca91f76836e3371e223971fe53bd26a9b501875df90d2935b2384f7a409acc4ae48ed7f74b91666fe04f65e69bfbd4e6599cb20fe5d",
  "dc5": "578464a1487719e7c499e34d1f244722b3efe8732a2e956e4619b42bcadf2f46d77c43dccd2369b54e458ad737c205faf1058936c73a93ec823183baa3d875659ec4f5a8bb1ddd052fbb6f2bbe0ee581d0aa7290561b7dd4f7687e9f3dddbd6735820807b74bb3e562bafab9aaea1845523b1ab30df68acb880e743b0116046530957bc4a8eb47966922ae8a9ed664a821efaddd6295176e02e29593882f76c1616cc799623dd978700e378ab5627e8494c3e0bd85903531052095c4b391b27936b49fc8d786a201df91b93f617d9234c0782386d42e807d48aba7fbe90ce96d3adc9c286333d3787253370222755f07018a3fdf022678a8c00f9553da0d76ce",
  "dcId": 2,
  "banned": false,
  "dateUpdated": {
    "$date": "2025-04-12T12:33:04.558Z"
  },
  "firstName": "Arthur",
  "lastName": "Simonov",
  "messageCount": 244,
  "username": "simonov_registered",
  "id": "7116592531",
  "remainingTime": {
    "$date": "2025-04-11T14:54:07.882Z"
  },
  "spamInitDate": null,
  "historySpamBlocks": [
    {
      "spamBlockDate": {
        "$date": "2024-12-15T18:15:00.000Z"
      },
      "spamBlockDays": 15
    },
    {
      "spamBlockDate": {
        "$date": "2025-01-15T05:11:00.000Z"
      },
      "spamBlockDays": 30
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-19T12:51:00.000Z"
      },
      "spamBlockDays": 30
    },
    {
      "spamBlockDate": {
        "$date": "2025-01-23T14:51:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-01-24T09:10:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-01-28T17:35:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-05T17:48:00.000Z"
      },
      "spamBlockDays": 7
    },
    {
      "spamBlockDate": {
        "$date": "2025-01-31T06:47:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-03T14:59:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-11T05:05:00.000Z"
      },
      "spamBlockDays": 7
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-07T07:04:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-14T09:19:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-28T08:41:00.000Z"
      },
      "spamBlockDays": 7
    },
    {
      "spamBlockDate": {
        "$date": "2025-04-02T14:56:00.000Z"
      },
      "spamBlockDays": 30
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-13T08:37:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-16T14:47:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-19T12:31:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-20T14:41:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-25T06:46:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-04-02T11:58:00.000Z"
      },
      "spamBlockDays": 7
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-28T12:06:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-04-03T06:10:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-04-02T10:17:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-04-05T14:45:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-04-11T07:22:00.000Z"
      },
      "spamBlockDays": 1
    }
  ],
  "nextApiId": 2496,
  "twoFa": false,
  "twoFaDate": {
    "$date": "2025-04-10T12:58:33.886Z"
  },
  "automaticCheckDate": {
    "$date": "2025-04-12T12:33:04.558Z"
  },
  "stopped": false,
  "lazyCheckDate": {
    "$date": "2025-04-12T10:01:24.090Z"
  }
},
{
  "_id": {
    "$oid": "6655a245f6c612cb5f719f5e"
  },
  "accountId": "1716476969-160-support-new",
  "dc1": "1a917ff12d9320339c2a1a423099a6c095d08326d0e90301a6c603ce4fb5f038e0874c305ffcbb335238a2f44cddc94d34b59469ac8f887ac6bcb8821e7e9613d1fade5127f464a15df43934cda2c8b4a473d5f884691d8de1ea4ca0f39b2695933859d50bd4136e32037fee7800bcf3f82785068082af1f35a28adb048b0f027fff5b80e7c60d45007dc7ae9fb638996f88000a1bce1358f514034df5ca9edfbec427d241eecf0fbd57234b037d713de351cf7dea01fa31dc34741ac3329871fe0bc18ffd9d4d63c54a3adc255dfcacbe848ccffb43bb731aad79047fd6c3683049a623e585410aa52647f169063b0bd207b57e1cd20b2283bcc4ca0cffeee1",
  "dc2": "065c7dc2420d249e29ce54ea047f5aa3a97a137cb9453ae4eeda48e1fbe59708f4681f3a5f707c90592a8fded46ab4d8228cc31fcdf1c87debe348491b3529a11b22af82306a30ea434215abc04bc08d85572ef90173750970b9fec3f9e6c0829a4ea1a0075dbee6991a757bc7024d1aa251442aaa07116dd4aaff9568bf90b2202e78ca49803c3cca47c4e24044ee12fb094468f42bf1f51a4fef8b860ff4226d1016411bd3d526037d824074b4099c7b8729c8a9f9fa791baf8bcc3ecd5664541f85b747c89b36eccfcae12a3b9983bd1fed3c4fba313c12ddda9fa150a8400eb028687c2b1c7703ef2a3645d8c62d4bac701e54233b51b3b7b4fba88a9626",
  "dcId": 2,
  "banned": false,
  "dateUpdated": {
    "$date": "2025-04-10T13:28:41.650Z"
  },
  "reason": null,
  "firstName": "Timofey",
  "lastName": "Serov",
  "messageCount": 257,
  "username": "serov_funny",
  "stopped": true,
  "id": "6711037440",
  "remainingTime": {
    "$date": "2025-04-08T11:55:39.500Z"
  },
  "spamInitDate": null,
  "historySpamBlocks": [
    {
      "spamBlockDate": {
        "$date": "2024-12-05T07:44:00.000Z"
      },
      "spamBlockDays": 5
    },
    {
      "spamBlockDate": {
        "$date": "2025-01-04T08:32:00.000Z"
      },
      "spamBlockDays": 30
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-12T06:26:00.000Z"
      },
      "spamBlockDays": 30
    },
    {
      "spamBlockDate": {
        "$date": "2025-01-23T14:44:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-01-25T17:07:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-03T14:39:00.000Z"
      },
      "spamBlockDays": 7
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-01T19:36:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-06T03:36:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-05T13:02:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-08T13:47:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-08T05:32:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-14T07:15:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-16T14:43:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-28T05:06:00.000Z"
      },
      "spamBlockDays": 7
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-26T06:44:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-01T12:15:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-05T08:59:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-07T07:45:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-08T09:48:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-13T18:04:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-13T10:39:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-21T13:49:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-19T23:09:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-22T09:36:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-27T06:39:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-28T13:13:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-31T14:25:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-04-03T11:22:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-04-04T08:27:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-04-04T18:36:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-04-10T05:29:00.000Z"
      },
      "spamBlockDays": 1
    }
  ],
  "nextApiId": 2496,
  "twoFa": false,
  "twoFaDate": {
    "$date": "2025-04-10T13:07:08.118Z"
  },
  "automaticCheckDate": {
    "$date": "2025-04-10T13:28:41.650Z"
  },
  "lazyCheckDate": {
    "$date": "2025-04-10T13:28:38.590Z"
  },
  "personalChannelDate": {
    "$date": "2025-04-10T13:15:20.797Z"
  }
}].slice(100)

const zanos = async () => {
  try {
    console.log(accounts.length);

    for (const account of accounts) {
      const { dcId, id, nextApiId } = account;

      if (!dcId || !id || !nextApiId) {
        console.log('NO_DATA', account);
        return;
      }

      if (!account[`dc${account.dcId}`]) {
        console.log('NO_DC', account);
        return;
      }

      const data = {
        accountId: `${id}-prefix-bls`,
        dcId,
        nextApiId,
      };

      data[`dc${account.dcId}`] = account[`dc${account.dcId}`];

      console.log(id, data);
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
