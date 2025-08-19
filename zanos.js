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
    "$oid": "683b23d53770b19a277f42fc"
  },
  "accountId": "1010753567-prefix-elba",
  "dc5": "7057f147ddc1b3f9eab94ab378c5942d9afc67b9f95a445502f6d058c03d700f3a90a6a77a4eb3fef0cfb4e86c7f8bf7e46558469a531e9c19ea4deb42ab4e797b36fc75ef72b953b9f2a6fa23fd30135481fa4ab043ee789ac05500b7f7bfbedff9d6dbb772a504b70260acaca30951cbae5eed838b8262b7a2f1090ece5c90ecd7d9c4b7955e6619f909f568a4fa9ca8c6e107d37c427be18ea2289a275235e8ef234430a6d8701e5fb79744b8f4a5337b267cce5d016b0fdf2a179cc5a7375fc1ddb21bd23b5a861e5fa0236c873969583aa0086904e5f664837ff806e5cf1d67ae03d7d91363b1fd8566bbd29a1a666b742ccab74ca8ca3699c9819dd277",
  "dcId": 5,
  "nextApiId": 2040,
  "dateUpdated": {
    "$date": "2025-08-19T10:12:19.639Z"
  },
  "twoFa": false,
  "twoFaDate": {
    "$date": "2025-08-18T00:42:29.441Z"
  },
  "phone": "+6287736322904",
  "banned": false,
  "firstName": "Valeriy",
  "id": "1010753567",
  "lastName": "Frolov",
  "messageCount": 12,
  "username": "frolov_hushed",
  "personalChannel": "aFllAwaL4yCTzmXM",
  "personalChannelDate": {
    "$date": "2025-05-31T16:33:16.040Z"
  },
  "lazyCheckDate": {
    "$date": "2025-08-19T00:37:48.164Z"
  },
  "automaticCheckDate": {
    "$date": "2025-08-19T10:12:19.639Z"
  },
  "remainingTime": {
    "$date": "2025-08-09T13:30:29.480Z"
  }
},
{
  "_id": {
    "$oid": "680b946a461801f5996016b4"
  },
  "accountId": "1031154154-prefix-female-dmp1",
  "dc1": "16662ffa59e9e79733b0a6d799cfb44c24165d57e17da3f7c4bb2440a1cae39548355415e0aa5c035f3ea0394a82b166c9b0d8ebb52e99cd747876cb151d121b19b9fc74e857bd73a8e34832fe88f3a5efb946829e67896cf256a5287145bdb8c9856e9b4bbfb80d00d36c74276c6572cc5b62c548e6eab1395c362b61264001f22e65b636ec375a0b67762811f1d3e41985e26c7c40cda28de5b32f1d23a479e5249d9a94353317962bfa38700f21e6d0cb371aa8a66fda910ce43fba00970e288db8e892a3ccb4cc54cadf7fef54fba80a72d8a0be491dec0f7a643ff708558b496672e0b2b8ef6c269558f754c7671905e39beb995892481ea4c421b7d95e",
  "dcId": 1,
  "nextApiId": 2040,
  "dateUpdated": {
    "$date": "2025-08-19T10:24:43.133Z"
  },
  "twoFa": false,
  "twoFaDate": {
    "$date": "2025-08-18T10:47:59.410Z"
  },
  "phone": "+573208312164",
  "banned": false,
  "firstName": "Olga",
  "id": "1031154154",
  "lastName": "Sysoeva",
  "messageCount": 47,
  "personalChannel": "qAEBSFXOSX4qNhpf",
  "personalChannelDate": {
    "$date": "2025-04-25T14:30:50.157Z"
  },
  "lazyCheckDate": {
    "$date": "2025-08-18T21:27:06.479Z"
  },
  "automaticCheckDate": {
    "$date": "2025-08-19T10:24:43.132Z"
  },
  "username": "sysoeva_present",
  "remainingTime": {
    "$date": "2025-08-19T00:09:05.389Z"
  }
},
{
  "_id": {
    "$oid": "683b23d43770b19a277f42cd"
  },
  "accountId": "1041991479-prefix-elba",
  "dc5": "69a83183a1b8774b4d86dc0a4c4ae151d8978ff5a19bf714870de6507c93ff69f659d80d6b5e39a86aff97ac83e7a21452af104c4523e15f8c3817293b53a09dd6287b732648cf9b2bd3129128398061b2b2bbaff7d2de46bc580ebc36e3c466849dd9d10254a668c317992c68c969868584b7e9c9b6b63573aba7c50c37c2b22185e768a72bfa546703602bac656de61d5c8369c77aa98b3918d4f35b1819581273d49f24a60766ae6d5aa611437663d646e8ee8c330cc939d5b5717f91c2f92d0a8c96ca739d9b102952b9d5acfca650d5db0e66132be882a6af395e89b79ffb4e5cde879863aec9cbda494e27608eb48c180094bbd637f246b60155a312f8",
  "dcId": 5,
  "nextApiId": 2040,
  "dateUpdated": {
    "$date": "2025-08-19T10:21:19.627Z"
  },
  "twoFa": false,
  "twoFaDate": {
    "$date": "2025-08-18T00:42:29.437Z"
  },
  "phone": "+6282331012779",
  "banned": false,
  "firstName": "Nikolai",
  "id": "1041991479",
  "lastName": "Pakhomov",
  "messageCount": 12,
  "username": "pakhomov_psychiatric",
  "personalChannel": "rqVLjh3RWuxWPkjV",
  "personalChannelDate": {
    "$date": "2025-05-31T16:33:07.873Z"
  },
  "lazyCheckDate": {
    "$date": "2025-08-18T13:39:13.540Z"
  },
  "automaticCheckDate": {
    "$date": "2025-08-19T10:21:19.627Z"
  },
  "remainingTime": {
    "$date": "2025-08-11T11:02:42.436Z"
  },
  "historySpamBlocks": [
    {
      "spamBlockDate": {
        "$date": "2025-08-12T09:10:00.000Z"
      },
      "spamBlockDays": 1
    }
  ]
},
{
  "_id": {
    "$oid": "680b946b461801f5996016f4"
  },
  "accountId": "1051793522-prefix-female-dmp1",
  "dc1": "c052c04d9f57c7382aeb96ddbacb28a12e10153c10aa479f8d19e1b8a382254e12e43fffe48f178d9e4e174902b27558ffb541be1d7d0f0672df544a9a44df0e81eae164408e39d2e9643577937e969a0bf2ec0e943655b85e41544851feecdf5d89a553867405687906c2a603de646533a7a5e4d9a9770e6984489232ca853540e687c89cb39c973255d969daffd81d5c23026a321109154961fea10e71d7b898e47d792fcf37f374b31929e69a5680f0225d5574008ef099a25ce1e7a2e1993fa48d94efa0ab650b5d74978087cd96deb4eafdd979c37b2050fa50f97e3c02fd2b433948645395a89ffe7c3bfc6961b050b8bf5dd36ae06e5639548df7cf63",
  "dcId": 1,
  "nextApiId": 2040,
  "dateUpdated": {
    "$date": "2025-08-19T10:34:44.543Z"
  },
  "twoFa": false,
  "twoFaDate": {
    "$date": "2025-08-18T10:48:00.248Z"
  },
  "phone": "+529514233454",
  "banned": false,
  "firstName": "Anfisa",
  "id": "1051793522",
  "lastName": "Nikolaeva",
  "messageCount": 114,
  "personalChannel": "XSbrT6rIGldayZdX",
  "personalChannelDate": {
    "$date": "2025-04-25T14:30:48.165Z"
  },
  "lazyCheckDate": {
    "$date": "2025-08-18T18:37:30.731Z"
  },
  "automaticCheckDate": {
    "$date": "2025-08-19T10:34:44.543Z"
  },
  "username": "nikolaeva_biological",
  "remainingTime": {
    "$date": "2025-08-19T05:20:00.234Z"
  }
},
{
  "_id": {
    "$oid": "680b9469461801f599601616"
  },
  "accountId": "1052694583-prefix-female-dmp1",
  "dc1": "76462fff0d8da1a8f94b827966d99c9978da29efd0e566429122b97ac8896feb375a337f6d1851afa0891be5ef34cfe9d111bc0cf4c037b23f122a848e272fd03ac7fb7a8dc299176ca3d8f38f6a12fd28cf5f1a72b018b9096505431cce4c426ecbfc44a31d61bd0f4ea3693d1cae3f1ee86193d37bb3470084c5dc858c55ace888f7186309775198cf2925d490f54518a53c002eaf0506576d5e993501cfa9af6be8f7ced8e22f9be137733f82a5a9fedbec17974dda12f7d2e81b2c3a65401e5a87a5060eaa53fecb628df00b82b31cb593ced74aad0d03b9817010bb58ca2cd0039f843a054002680cc9b18382fcc25c74c97d037d09b28fd1ac5f86947f",
  "dcId": 1,
  "nextApiId": 2496,
  "dateUpdated": {
    "$date": "2025-08-19T10:25:43.325Z"
  },
  "twoFa": false,
  "twoFaDate": {
    "$date": "2025-08-18T10:47:55.337Z"
  },
  "phone": "+573135547770",
  "banned": false,
  "firstName": "Inna",
  "id": "1052694583",
  "lastName": "Filatova",
  "messageCount": 47,
  "personalChannel": "ZPXLastTOdlOKHk9",
  "personalChannelDate": {
    "$date": "2025-04-25T14:33:02.023Z"
  },
  "lazyCheckDate": {
    "$date": "2025-08-18T20:04:28.217Z"
  },
  "automaticCheckDate": {
    "$date": "2025-08-19T10:25:43.325Z"
  },
  "username": "filatova_top",
  "remainingTime": {
    "$date": "2025-08-19T04:36:18.650Z"
  }
},
{
  "_id": {
    "$oid": "680b946c461801f599601745"
  },
  "accountId": "1095974076-prefix-female-dmp1",
  "dc1": "a62846181992aa81b5d9c72512992f0393bfc382da0ed6bb46d3691ca07402364b8a2521e8116604f15d7aaeafcf881e705a94c9c8eba776bb6ca1464353fe53456df27789257a31c0a24cc87d794eeff782472ac95cbf7adbcf2a222c7cb660174d579952617365992bd168a25ff1d85d5b1ba2d95292124ccf7f8d9eea401b6347630e43310fc5b43c4f1fe1af26ca963ab78d5d11e82350c811c9cf0b8f3f8fd32a604ac6722d28f5a53a7a7075849e281972633092f735351a4f88d42fcbfe0744c648e2d70e89e8c237b9357ff32e2e9c32a481ea7c35b55ea1cf605f868945114b90850072ed0f23d3998e73663cad154c4cbf4f861713bd419777f028",
  "dcId": 1,
  "nextApiId": 2040,
  "dateUpdated": {
    "$date": "2025-08-19T10:20:43.526Z"
  },
  "twoFa": false,
  "twoFaDate": {
    "$date": "2025-08-18T10:48:00.280Z"
  },
  "phone": "+5521986101270",
  "banned": false,
  "firstName": "Anastasia",
  "id": "1095974076",
  "lastName": "Kozlova",
  "messageCount": 124,
  "personalChannel": "aANoZioOFjulb1eW",
  "personalChannelDate": {
    "$date": "2025-04-25T14:34:42.687Z"
  },
  "lazyCheckDate": {
    "$date": "2025-08-18T18:40:29.320Z"
  },
  "automaticCheckDate": {
    "$date": "2025-08-19T10:20:43.526Z"
  },
  "username": "kozlova_tropical",
  "remainingTime": {
    "$date": "2025-08-16T11:01:37.099Z"
  },
  "historySpamBlocks": [
    {
      "spamBlockDate": {
        "$date": "2025-07-03T12:14:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-08-13T12:29:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-08-19T10:48:00.000Z"
      },
      "spamBlockDays": 3
    }
  ]
},
{
  "_id": {
    "$oid": "680b9468461801f5996015cd"
  },
  "accountId": "1118644667-prefix-female-dmp1",
  "dc1": "11d8a0e08f01992e3da2331997c4cbde9034384b14c59d96e9cb0a34dcbdf4e292ed9028a5b74b34f2066ed5558ebcb08e8e743aa66f5644998853956ff83289d9cb0cb1a19409bc8dfd5e78414a1e827e9d804d860b6fe3e1af8293446d251e5e2ddcaaf15671b93d959b73a982ffb14ad482548b3c8f3d84dd726bc0a03d266fb6a09d7409fd99a42155d4a72d2b9e8e402e47a7ab16f1962a10959d4c7e955c8189ccdf04ebc6083b5a7f2c53e0313d546e4427f63fc432cd4b36a5c72973c6006f2559576c72339b9b2e73219af17e8e0a72ec79a457bdd64ae2cfb3107f377c3218bc4ef7bf0f64420e117c00cb2748107baf84f4ef2670a0acbd1d1e10",
  "dcId": 1,
  "nextApiId": 2496,
  "dateUpdated": {
    "$date": "2025-08-19T10:39:42.605Z"
  },
  "twoFa": false,
  "twoFaDate": {
    "$date": "2025-08-18T10:47:57.352Z"
  },
  "phone": "+573185339671",
  "banned": false,
  "firstName": "Albina",
  "id": "1118644667",
  "lastName": "Osipova",
  "messageCount": 47,
  "personalChannel": "F0gSErslYzxFRwRM",
  "personalChannelDate": {
    "$date": "2025-04-25T14:31:00.484Z"
  },
  "lazyCheckDate": {
    "$date": "2025-08-18T22:06:29.705Z"
  },
  "automaticCheckDate": {
    "$date": "2025-08-19T10:39:42.605Z"
  },
  "username": "osipova_original",
  "remainingTime": {
    "$date": "2025-08-19T05:29:19.940Z"
  }
},
{
  "_id": {
    "$oid": "683b23d73770b19a277f437f"
  },
  "accountId": "1158913815-prefix-elba",
  "dc5": "b3bfebdd73e3e8b93be06b54031efe9c368260d632ea3296d6bc5d285c46cf4d6052b05b59e035399932aeb8e93a4b94600df46a83ef6dd5278c01675d155266ec626d942c06935b74012d177bceaf1de6d19bf81eaf4ea8b4f9c8816f1b3decc645adfcd5fa4beea4fc1af709c04b44c5a6efc35389763fb734369eb1de1a24abc0f9b29331c1a045b569821f8c6cd987ff14339a78b04fd0e57a1d49c1535cfad747d6520bbacac1f62a4ff80a443eabe096e594567c726cc7aa44b792a92fee6a164c8433293af05b6cb77085d7ca849fcfa2818cb511dc713e08e6eb454f09e8dbc79dfdce3572c16146686a7c1ac8d6953fa94acc45850c5ee08b3f5172",
  "dcId": 5,
  "nextApiId": 2040,
  "dateUpdated": {
    "$date": "2025-08-19T10:37:24.090Z"
  },
  "twoFa": false,
  "twoFaDate": {
    "$date": "2025-08-18T00:42:33.799Z"
  },
  "phone": "+6289662121307",
  "banned": false,
  "firstName": "Nikolay",
  "id": "1158913815",
  "lastName": "Kazmin",
  "messageCount": 11,
  "username": "kazmin_unable",
  "personalChannel": "GqEow2GJWLegZsMS",
  "personalChannelDate": {
    "$date": "2025-05-31T16:33:19.945Z"
  },
  "lazyCheckDate": {
    "$date": "2025-08-19T02:41:02.007Z"
  },
  "automaticCheckDate": {
    "$date": "2025-08-19T10:37:24.090Z"
  },
  "remainingTime": {
    "$date": "2025-08-09T13:11:23.477Z"
  }
},
{
  "_id": {
    "$oid": "680b946d461801f59960175d"
  },
  "accountId": "1159125526-prefix-female-dmp1",
  "dc1": "7bc850efc29c924a2e403c99ebd1c9371002d65a64418fdd3de7d25d9e0c94e7c4267189582d2b0fb53674051b1c30846f5fa5143db83196702abfbced5810d8af71baf90e034a9ed7636ef770e792e3a0ab67133dab49878ff5324cb21f258e679cd5a08dd5f90769218945195e21f1629754531585a38e990dc68a3138af4c1d21b6be2539f0f4598fa591706f8d036d12b81ed1ec1e20ba368aaeee663b237b4e6d81a2b0f03a0a9d84075cc05f11b83f1a4a8df8a169f3420d428d1d674ae5c0684c3860c1dead94052b2de9e7aa578e5fe9baeb69e1d00f777a46453133e38b3e1e67cfe61a60d2e9438f737b958fd38d932ae76b47a9bab39ebd9f60e7",
  "dcId": 1,
  "nextApiId": 2496,
  "dateUpdated": {
    "$date": "2025-08-19T10:35:43.547Z"
  },
  "twoFa": false,
  "twoFaDate": {
    "$date": "2025-08-18T10:48:00.267Z"
  },
  "phone": "+573108197763",
  "banned": false,
  "firstName": "Maria",
  "id": "1159125526",
  "lastName": "Anisimova",
  "messageCount": 49,
  "personalChannel": "DwFUsGHn5OuBuwTr",
  "personalChannelDate": {
    "$date": "2025-04-25T14:32:05.642Z"
  },
  "lazyCheckDate": {
    "$date": "2025-08-18T18:39:33.434Z"
  },
  "automaticCheckDate": {
    "$date": "2025-08-19T10:35:43.547Z"
  },
  "username": "anisimova_fun",
  "remainingTime": {
    "$date": "2025-08-19T07:38:12.656Z"
  }
},
{
  "_id": {
    "$oid": "6810c3b3461801f5990b97d9"
  },
  "accountId": "1200554264-prefix-elba",
  "dc4": "474f032269b585443ed539d54468f736bc4f8e049002dba91b13d2101bc35f36db54856fecb884293a138aa8ebb83862a86724de55a92ba3af38a35067dda33ffaecd068e590429f812fb2fa9db9d9683001325745a0cddf94dff3a7dfeb73df4c773979c4750cb391fc511e3ef4b90e09fe8a8c8743e69f05ba28c66cccc94028295a9d426eaebaea0d6c633a4d7bfd0b1210f5c5024641045d4001dcae8e7a016781a51473b72485b8bc4144014970c630f809a18d6a0ffedcaa7b8146f932ff7a44e4e5c78ad39e08979fc83b386f0ea54a3187928dd88de3b3311f5e2172079432256113a4e259bef5e847c328c80c8177b442ad04de6da2791c4ff94aad",
  "dcId": 4,
  "nextApiId": 2040,
  "dateUpdated": {
    "$date": "2025-08-19T10:38:33.724Z"
  },
  "twoFa": false,
  "twoFaDate": {
    "$date": "2025-08-19T02:19:53.922Z"
  },
  "phone": "+201211197768",
  "banned": false,
  "firstName": "Egor",
  "id": "1200554264",
  "lastName": "Andreev",
  "messageCount": 30,
  "username": "andreev_yelping",
  "lazyCheckDate": {
    "$date": "2025-08-18T13:22:58.902Z"
  },
  "automaticCheckDate": {
    "$date": "2025-08-19T10:38:33.723Z"
  },
  "personalChannel": "GNmfCPpLu0nhMIMy",
  "personalChannelDate": {
    "$date": "2025-04-29T13:13:32.554Z"
  },
  "remainingTime": {
    "$date": "2025-08-11T11:05:32.887Z"
  },
  "historySpamBlocks": [
    {
      "spamBlockDate": {
        "$date": "2025-05-30T11:53:00.000Z"
      },
      "spamBlockDays": 1
    }
  ]
},
{
  "_id": {
    "$oid": "683b23d13770b19a277f41a5"
  },
  "accountId": "1219765004-prefix-elba",
  "dc5": "088d31d26a1388663197bdfef03d1ee3ff303b2785c6dcbcf02cd46ac94cf498bb875811293847e0fc39ed9c8dff5117d86fcf5b067b38c9bcf5e74d46b74182cb76709511d979d43a4e4b11e778f4deb9f1b3856a668042835bdd5b437ef98726fd6fe6eae4c67e0a8c8c94f5a61f92be5ff70a053ffe710a6d9a2bb4dd0637c626312941c9b83002fb8f2f0de75beab0468f9b6ef53b0cebf1702286a0fe7492aa0ca0c88a9f40da7d927aecbaa882ea10bad5eebe67ca89bbd45f972cd5e8288008af0024af0f90684dc5696ab38f284b228bb897e8d807a61387873ad2a9e62fd28b29bfee02dd15d4e82bc53c617e5056de291f0c6d1c0611237d8895da",
  "dcId": 5,
  "nextApiId": 2040,
  "dateUpdated": {
    "$date": "2025-08-19T10:39:29.951Z"
  },
  "twoFa": false,
  "twoFaDate": {
    "$date": "2025-08-18T00:42:29.345Z"
  },
  "phone": "+601126657391",
  "banned": false,
  "firstName": "Ilya",
  "id": "1219765004",
  "lastName": "Dubrovin",
  "messageCount": 13,
  "username": "dubrovin_tiny",
  "personalChannel": "XTFnnVCbrHHNMYM0",
  "personalChannelDate": {
    "$date": "2025-05-31T16:30:30.726Z"
  },
  "lazyCheckDate": {
    "$date": "2025-08-18T23:00:03.115Z"
  },
  "automaticCheckDate": {
    "$date": "2025-08-19T10:39:29.951Z"
  },
  "remainingTime": {
    "$date": "2025-08-09T13:10:36.486Z"
  }
},
{
  "_id": {
    "$oid": "680b9470461801f599601844"
  },
  "accountId": "1221444784-prefix-female-dmp1",
  "dc1": "8ab55d07407a922f786504e539251dd40060efad7d386e5cb28c53b6a02cb87a22199108a5dd9e233d1a707f6790655b9067771b49cb136c462055b0f63b70d6783d9b97fa127b48d5bc90285b3e3df2c650d7f9564490fe127dd38fc2f0b1e0d4fe84c6620d2f7bd91c49c49b77cc7b1e72107222a802ffb4cc1b3ca964c47a98268ba9b2506159b63c7b680709cd2bcc682b119fc7f9d07419833015c50aabbda49381e56829182474233a2ee45bcda257d1f4650f0ebbc1cc2146e2447df42e3adb138fd1446dc4ff4d9c8484dd3c63096d0ab34c0b7b8319970e76b049c959e2770a0d4b7d4a7f2887c647413905abf4f62b742e62acadf7ef3808c6e11e",
  "dcId": 1,
  "nextApiId": 2496,
  "dateUpdated": {
    "$date": "2025-08-19T10:19:43.904Z"
  },
  "twoFa": false,
  "twoFaDate": {
    "$date": "2025-08-18T10:48:07.873Z"
  },
  "phone": "+541125630710",
  "banned": false,
  "firstName": "Nina",
  "id": "1221444784",
  "lastName": "Demidova",
  "messageCount": 123,
  "personalChannel": "Zd2DNGXKIKdzHhvo",
  "personalChannelDate": {
    "$date": "2025-04-25T14:33:16.906Z"
  },
  "lazyCheckDate": {
    "$date": "2025-08-18T21:16:08.573Z"
  },
  "automaticCheckDate": {
    "$date": "2025-08-19T10:19:43.904Z"
  },
  "username": "demidova_thorough",
  "remainingTime": {
    "$date": "2025-08-17T02:07:20.561Z"
  },
  "historySpamBlocks": [
    {
      "spamBlockDate": {
        "$date": "2025-08-11T18:19:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-08-15T08:37:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-08-20T01:46:00.000Z"
      },
      "spamBlockDays": 3
    }
  ],
  "spamBlockDate": {
    "$date": "2025-08-20T01:46:00.000Z"
  },
  "spamBlockDays": 3,
  "spamBlockInitDate": {
    "$date": "2025-08-17T02:19:41.783Z"
  }
},
{
  "_id": {
    "$oid": "680b946a461801f5996016c1"
  },
  "accountId": "1233655534-prefix-female-dmp1",
  "dc1": "3c6301d17449f1be4f0ef4f66641f9c871fd71e54c5ba963e72fb985ad53c865585058cd03af3f21df6038746647eb1df7d75b63d5bb48739d3a2d7dfef561fe38b3d205970cb416abfcadbab7e1c0d5b5ab5d1ee7bed784fbafac486196da837a2d47a649321a4dda82b82ca09280e69d2b643b4b10162daba3243b44ba467bb45279ebd58f68010b1315b7e61334ecc85eddc4d4b72779ad1394ce2483364d10d4be32f54fadb6a4b5e13fcd049868aacee1c5b89e9ced72b276e3bccbdb02a9d23937c2a29615ad1a960ab8bf9fd6b99320788419814935b0d40ac0ab57a8b27eecbfa67da34b83d54119ca00dc87712101d7f94dc44adb50e8954c982c43",
  "dcId": 1,
  "nextApiId": 2040,
  "dateUpdated": {
    "$date": "2025-08-19T10:25:43.124Z"
  },
  "twoFa": false,
  "twoFaDate": {
    "$date": "2025-08-18T10:47:58.973Z"
  },
  "phone": "+524641021087",
  "banned": false,
  "firstName": "Yana",
  "id": "1233655534",
  "lastName": "Bukina",
  "messageCount": 72,
  "personalChannel": "nuAAG8kqGXYAgjPo",
  "personalChannelDate": {
    "$date": "2025-04-25T14:33:14.185Z"
  },
  "lazyCheckDate": {
    "$date": "2025-08-18T20:02:23.788Z"
  },
  "automaticCheckDate": {
    "$date": "2025-08-19T10:25:43.124Z"
  },
  "username": "bukina_interior",
  "remainingTime": {
    "$date": "2025-08-16T14:30:10.968Z"
  },
  "historySpamBlocks": [
    {
      "spamBlockDate": {
        "$date": "2025-04-28T11:53:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-05-04T10:38:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-05-04T05:06:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-06-28T11:27:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-07-08T09:39:00.000Z"
      },
      "spamBlockDays": 7
    },
    {
      "spamBlockDate": {
        "$date": "2025-09-07T06:45:00.000Z"
      },
      "spamBlockDays": 30
    },
    {
      "spamBlockDate": {
        "$date": "2025-08-09T19:25:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-08-14T04:28:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-08-13T20:04:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-08-15T21:49:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-08-19T12:56:00.000Z"
      },
      "spamBlockDays": 3
    }
  ],
  "spamBlockDate": {
    "$date": "2025-08-19T12:56:00.000Z"
  },
  "spamBlockDays": 3,
  "spamBlockInitDate": {
    "$date": "2025-08-16T13:10:19.711Z"
  }
},
{
  "_id": {
    "$oid": "685f07473770b19a27ab1f5c"
  },
  "accountId": "1235518337-prefix-female-gidrovell",
  "dc1": "ac159ce04c4222193dc6a0735399225ad5b81e40af78072c5e65f90afb73df3aa746c7437ce31ac4edb9dabb2db0e62df4af838f2e08d0b693d98ffc8de66a166421f0a1e3e717adad958f9f209087ecf17fc14e11fe2935906787b4e28ca7aa760f285bac8bebff6acac11ea38055036586f168e451ce38e7444ae8b1ffe15af96e7c576cdffdbaa1aa00f685ba73f66b7e141d0d6a77f0fc28b8baca4240161c1a6c5ad2952cbf6a23775213a9f3578b83edf385fb498bc7b96a0d3f791f1c3272b5d114c402f6dc9202692dbf2f4edbd7b67255b0ba6dbb065cf97977ca32aadc82b50d080fb7585150a5b42b124093dc9a641c202c1ec6b79336910b8c4c",
  "dcId": 1,
  "nextApiId": 2040,
  "dateUpdated": {
    "$date": "2025-08-19T10:13:41.505Z"
  },
  "twoFa": false,
  "twoFaDate": {
    "$date": "2025-08-18T10:47:33.738Z"
  },
  "phone": "+542604301829",
  "banned": false,
  "firstName": "Ekaterina",
  "id": "1235518337",
  "lastName": "Belova",
  "messageCount": 33,
  "username": "belova_chilly",
  "personalChannelDate": {
    "$date": "2025-08-16T21:17:20.426Z"
  },
  "personalChannelError": "CHANNEL_NOT_FOUND",
  "lazyCheckDate": {
    "$date": "2025-08-18T19:45:39.028Z"
  },
  "automaticCheckDate": {
    "$date": "2025-08-19T10:13:41.505Z"
  },
  "remainingTime": {
    "$date": "2025-08-11T12:05:22.524Z"
  }
},
{
  "_id": {
    "$oid": "685f07483770b19a27ab1f88"
  },
  "accountId": "1236001242-prefix-female-gidrovell",
  "dc1": "120acffe5edcaa49b9e0763d7084f4f4a60ba3271c6d3b25ec652efc7885ce1d59c3a73c127387e6f8815c816bc4d4d38bd6e296c3c3c3f593668c6781739efc4e2762c828f304350b32cfa9ed1d4a977fcc1486bb6296bc38c961edb5bf3481abf27d081aaf4ba496f6f937eb54d66683b1209b0e4eb30966461de67cf979339024e664d089144d6483e7f8dea930e8e3e98ccfbe25c8a9b72f64b457b3c3e066e82e4223512ef4d5a60236dc0cf527ab1c4e8a9e231e2c42c76fe80659e52ded8b56081d163c73c978241fc0b9dcbc7f6b8fdc1803e6700dffb26bbb0030e275f4fc669903ee1b74be2026f0eb07048745cb5626456a4ae14b449d01e96297",
  "dcId": 1,
  "nextApiId": 2040,
  "dateUpdated": {
    "$date": "2025-08-19T10:37:42.101Z"
  },
  "twoFa": false,
  "twoFaDate": {
    "$date": "2025-08-18T10:47:37.282Z"
  },
  "phone": "+543517727226",
  "banned": false,
  "firstName": "Alisa",
  "id": "1236001242",
  "lastName": "Baranova",
  "messageCount": 22,
  "username": "baranova_historical",
  "personalChannelDate": {
    "$date": "2025-08-16T21:17:22.181Z"
  },
  "personalChannelError": "CHANNEL_NOT_FOUND",
  "lazyCheckDate": {
    "$date": "2025-08-18T22:01:36.255Z"
  },
  "automaticCheckDate": {
    "$date": "2025-08-19T10:37:42.101Z"
  },
  "remainingTime": {
    "$date": "2025-07-30T10:07:54.721Z"
  },
  "historySpamBlocks": [
    {
      "spamBlockDate": {
        "$date": "2025-08-01T08:52:00.000Z"
      },
      "spamBlockDays": 30
    },
    {
      "spamBlockDate": {
        "$date": "2025-07-20T08:37:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-08-02T11:07:00.000Z"
      },
      "spamBlockDays": 3
    }
  ]
},
{
  "_id": {
    "$oid": "683b23d63770b19a277f434c"
  },
  "accountId": "1268129007-prefix-elba",
  "dc5": "069465905382cf5f20cc3bc8f9e77a249c7fd0b45df2173c01b3686b72f769398e3f72fc3d8202f4baa094df3498b9c5606ab985bb2e0abb39d75348c123ca863dd66ed525332dabc2152fb6278273187ed0e38ae03ed58f1e1d16d282f38012ff4ab6be38501a83618f381a93a0dc02957c3cff102ae81d4ad3e3eea38145a75043ebb014691e46bec4bb46c89852d3169117b924118da459ed3cfd3c3d231a4a0c4c708a14df4362bfcaabe089cb86a2fe8bc41384d39b989d136a6f49ebb06e317875893d7afa7f4f17ed708af596655d5a5f277bd181af7ef053c6c6121ddc1e16eab718e4d0f8f81999d8a1aaba52f5bfa0b13a54d9167ed4b6c4703615",
  "dcId": 5,
  "nextApiId": 2040,
  "dateUpdated": {
    "$date": "2025-08-19T10:33:24.033Z"
  },
  "twoFa": false,
  "twoFaDate": {
    "$date": "2025-08-18T00:42:29.376Z"
  },
  "phone": "+62887433184333",
  "banned": false,
  "firstName": "Vadim",
  "id": "1268129007",
  "lastName": "Sidorov",
  "messageCount": 13,
  "username": "sidorov_fun",
  "personalChannel": "prdSZKTKZEJg6TbL",
  "personalChannelDate": {
    "$date": "2025-05-31T16:35:10.449Z"
  },
  "lazyCheckDate": {
    "$date": "2025-08-19T00:40:51.402Z"
  },
  "automaticCheckDate": {
    "$date": "2025-08-19T10:33:24.033Z"
  },
  "remainingTime": {
    "$date": "2025-08-11T21:02:27.748Z"
  }
},
{
  "_id": {
    "$oid": "680b946a461801f5996016be"
  },
  "accountId": "1296013001-prefix-female-dmp1",
  "dc1": "8011806b96235db3a35f5d78238b34043567c12c73031b8196800f2302efe78d13e7292eba8ec3843154bb799613d3fe69397eeeb7cf042cf646dd7c28905045d2559496d8904a60c59c2d8bf7178b5ad6e578dfc4c3211e81112bdcd42ff828b71bf9c1394926b335cbb4304961f4d709a4df8e42de19b813557d45d9ab5b7f38bbf2c6e5bfb6af888293adc70a92151a4cb9a0956413d29734a701375f1bbed3ade7cfc212ce00f05f8d09c82b5242a3093d0a0083f9adbf7f385b632f87a34bd55d171a859a651eee1fabb57118bbe09627636db99f25f645ef3f7e0b96b74f0460c9fa74a97594a777200e4dcb4358a471f2b76ac842d519c6a7c45972e0",
  "dcId": 1,
  "nextApiId": 2040,
  "dateUpdated": {
    "$date": "2025-08-19T10:30:43.116Z"
  },
  "twoFa": false,
  "twoFaDate": {
    "$date": "2025-08-18T10:47:57.237Z"
  },
  "phone": "+573194913981",
  "banned": false,
  "firstName": "Mira",
  "id": "1296013001",
  "lastName": "Denisova",
  "messageCount": 40,
  "personalChannel": "xkbzrdfziwzmx1nh",
  "personalChannelDate": {
    "$date": "2025-04-25T14:30:59.601Z"
  },
  "lazyCheckDate": {
    "$date": "2025-08-18T19:02:20.441Z"
  },
  "automaticCheckDate": {
    "$date": "2025-08-19T10:30:43.116Z"
  },
  "username": "denisova_inner",
  "remainingTime": {
    "$date": "2025-08-19T06:47:01.218Z"
  }
},
{
  "_id": {
    "$oid": "683b23d43770b19a277f4282"
  },
  "accountId": "1296612396-prefix-elba",
  "dc5": "9654b012a80a66a8632f794f8f5178a26a63343689e835d4df4b54561bc67585c4e16f671417cfab49e622e54350d528b078c6667a747447c472e43cffa78ecc425d985807288cb3b7acfd351431d30603f74c31aab64c14b5dcb950933a44bcb06a0da2bf172b9bdc9d68c46726dfe745f20b7427a69f89ed869aa7af4df2b27bb7f38936f200a2b20f09f92a98ae449948a531aac23f14ac081ea9b7d67ff0fd39b4cb581029e242287bc3af37e97e842ec41aeee383c20aa8bf21c88d6e10befc00fcc8fc035991e7cdb4461935a3ef20deac2eff273f12ce36dd553b9335d989e453d509a2267cdd898019d5f40f5e60757d016eb75dd65c704bb840362d",
  "dcId": 5,
  "nextApiId": 2040,
  "dateUpdated": {
    "$date": "2025-08-19T10:16:24.069Z"
  },
  "twoFa": false,
  "twoFaDate": {
    "$date": "2025-08-18T00:42:30.863Z"
  },
  "phone": "+6285365380103",
  "banned": false,
  "firstName": "Maksim",
  "id": "1296612396",
  "lastName": "Petrov",
  "messageCount": 13,
  "username": "petrov_other",
  "personalChannel": "PPhd4PCnNRWCwnbp",
  "personalChannelDate": {
    "$date": "2025-05-31T16:35:31.574Z"
  },
  "lazyCheckDate": {
    "$date": "2025-08-19T03:47:27.537Z"
  },
  "automaticCheckDate": {
    "$date": "2025-08-19T10:16:24.069Z"
  },
  "remainingTime": {
    "$date": "2025-08-11T11:05:16.285Z"
  }
},
{
  "_id": {
    "$oid": "683b23db3770b19a277f44e0"
  },
  "accountId": "1313243398-prefix-elba",
  "dc5": "c1666c4ada1d7de8f6899e2cc89f04207de2c613eb13726634f1bc700f77094c1742ec806d6f211653ae38c6fdecf203014621f6fdc40ccff32583c18464c2c73bcd9d7913cc8f9c8b834b308c2b869372865815e9fb198cae0b0aa459eb8f27543a25a9201d72bf11808813733d94f6f5d1be22fc741ccec37ad3e15efd6b69a2fc1b7dabb5f316c9e7cf74baa6a12aacd7cc9efd995104831f36423f82de36c1effd65e27a853400f50643e110002340e1da1c32295ec5beabb8a1e591198772994243d8f3d904f17625d7660a466a93ca4a7ec3e25aaf647113b8efa574d5e6c45a964898517f3353540a38d0806f1c744304f2254f89dd4af85ba10d48bd",
  "dcId": 5,
  "nextApiId": 2040,
  "dateUpdated": {
    "$date": "2025-08-19T10:22:23.210Z"
  },
  "twoFa": false,
  "twoFaDate": {
    "$date": "2025-08-18T00:42:42.443Z"
  },
  "phone": "+6289515534403",
  "banned": false,
  "firstName": "Sergey",
  "id": "1313243398",
  "lastName": "Morozov",
  "messageCount": 10,
  "username": "morozov_general",
  "personalChannel": "ObRqljVDMlQWLDJ2",
  "personalChannelDate": {
    "$date": "2025-05-31T16:33:44.589Z"
  },
  "lazyCheckDate": {
    "$date": "2025-08-19T04:05:37.191Z"
  },
  "automaticCheckDate": {
    "$date": "2025-08-19T10:22:23.210Z"
  },
  "remainingTime": {
    "$date": "2025-08-11T16:26:17.237Z"
  }
},
{
  "_id": {
    "$oid": "685f074a3770b19a27ab20a9"
  },
  "accountId": "1327498071-prefix-female-gidrovell",
  "dc1": "8de50180451afa4ab3c05c29b0a260c9ec8acddad443a799feaaa592385e45596d611425706b906289ebe1b9b01c9a5039615ab2e8aed717d1c365600ba690816bcbfaeb5206af8835aa64448d76fc32ace06131bb38f107e97f753010b058580be1162f80bfe4b270a67bf999f2b884ca75674a199dc1aefe1ebd0206bab4b6a658cbb6e16582379653416954cb6d558edc299f81c861ebec28c34c89742e38c5ddfe6acc969e2a642fb10d2883639669c0f3efd2833d64e6c20edfe55e8b9605da963b7079be9b977aee4d44055a6f5e349746bdc0b6e3368967a97e505cd3ee14536dc9b0595815695d1adca0a553048e2e63d9e871d902bb73308396146e",
  "dcId": 1,
  "nextApiId": 2040,
  "dateUpdated": {
    "$date": "2025-08-19T10:17:08.502Z"
  },
  "twoFa": false,
  "twoFaDate": {
    "$date": "2025-08-18T10:47:53.046Z"
  },
  "phone": "+543541565052",
  "banned": false,
  "firstName": "Polina",
  "id": "1327498071",
  "lastName": "Egorova",
  "messageCount": 28,
  "username": "egorova_soviet",
  "personalChannelDate": {
    "$date": "2025-08-16T21:17:17.942Z"
  },
  "personalChannelError": "CHANNEL_NOT_FOUND",
  "lazyCheckDate": {
    "$date": "2025-08-18T23:01:47.612Z"
  },
  "automaticCheckDate": {
    "$date": "2025-08-19T10:17:08.502Z"
  },
  "remainingTime": {
    "$date": "2025-08-06T14:14:35.198Z"
  },
  "historySpamBlocks": [
    {
      "spamBlockDate": "INFINITY",
      "spamBlockDays": 0
    }
  ]
},
{
  "_id": {
    "$oid": "685f07473770b19a27ab1f52"
  },
  "accountId": "1345177293-prefix-female-gidrovell",
  "dc1": "145d83f3b2a8d5bae54ea18e73f1fc344689b8af162b03604d1a31923d44f8603b447af3054d731571eebd54821ee2556178098b9175da51c2bed582d33ba8c214b6ef1a1201cebd5de7d17e810e3ac9a751d6e85616fb45730f627fcd9e40afdc748cac8f3c1a652835e52daf56526aacdb0e4da81e026453e78bb03cf701f41ba98567b9627c95523aa0c0e1dcef171266f6e29bcad8ce48e62dac0128fff335d4bcf1297428e6d33da9c71e0555dc6a609a20f5b6a4f2bd5d7d1e05af4314fa3df6159bbf5c06d12493c9c2782a22e5243beaca071cbc5ec0da6aef8741a71c75219bc58623753dddd9d34bdc6d70385b24d6c1e740e85008591949e29659",
  "dcId": 1,
  "nextApiId": 2040,
  "dateUpdated": {
    "$date": "2025-08-19T10:22:42.353Z"
  },
  "twoFa": false,
  "twoFaDate": {
    "$date": "2025-08-18T10:47:36.487Z"
  },
  "phone": "+542613820875",
  "banned": false,
  "firstName": "Inna",
  "id": "1345177293",
  "lastName": "Bogdanova",
  "messageCount": 35,
  "username": "bogdanova_simple",
  "personalChannelDate": {
    "$date": "2025-08-16T21:17:22.006Z"
  },
  "personalChannelError": "CHANNEL_NOT_FOUND",
  "lazyCheckDate": {
    "$date": "2025-08-18T18:46:11.183Z"
  },
  "automaticCheckDate": {
    "$date": "2025-08-19T10:22:42.353Z"
  },
  "remainingTime": {
    "$date": "2025-08-06T14:14:43.956Z"
  },
  "historySpamBlocks": [
    {
      "spamBlockDate": "INFINITY",
      "spamBlockDays": 0
    }
  ]
},
{
  "_id": {
    "$oid": "680b9471461801f59960184f"
  },
  "accountId": "1386045197-prefix-female-dmp1",
  "dc1": "31bcf45004d32f71ee0afa556767eab4a896239c6aa6050934814a49391f15d2405bb4f54538506067001510930622b6860092810e92444e312d09daea8db2bb5a0351292fc22ee303a869b24db065d730456e5a0cb1e161c700bfbf34feec1cc948815a8b54f065164e5b272ad89acb932dd47d460d03d2de554df8d09d9fd52ef919749c5ee5ab5e16b9ffd2eb5c5291b55539b11f669929e41d521d14a8a72a8509bcf4d757a66b95dd62a792fcd5fdcbfdaac09631fe66291f1b1e204fcb9a292ea571e53f57770fadc320c0caf4ced46a1a1b5729dc27be080135587435b53a032c6860ecdfb213946ef466159a07112adfd97c08d63f7b299ff6ad97ef",
  "dcId": 1,
  "nextApiId": 2496,
  "dateUpdated": {
    "$date": "2025-08-19T10:26:44.816Z"
  },
  "twoFa": false,
  "twoFaDate": {
    "$date": "2025-08-18T10:48:07.900Z"
  },
  "phone": "+541136545176",
  "banned": false,
  "firstName": "Valeria",
  "id": "1386045197",
  "lastName": "Bogdanova",
  "messageCount": 69,
  "personalChannel": "pumIcNXFCfRtPXX5",
  "personalChannelDate": {
    "$date": "2025-04-25T14:32:52.084Z"
  },
  "lazyCheckDate": {
    "$date": "2025-08-18T22:51:59.597Z"
  },
  "automaticCheckDate": {
    "$date": "2025-08-19T10:26:44.816Z"
  },
  "username": "bogdanova_rigid",
  "remainingTime": {
    "$date": "2025-08-17T09:47:43.503Z"
  },
  "historySpamBlocks": [
    {
      "spamBlockDate": {
        "$date": "2025-04-28T10:16:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-05-05T10:14:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-06-26T16:22:00.000Z"
      },
      "spamBlockDays": 7
    },
    {
      "spamBlockDate": {
        "$date": "2025-07-31T12:07:00.000Z"
      },
      "spamBlockDays": 30
    },
    {
      "spamBlockDate": {
        "$date": "2025-07-03T15:27:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-07-06T16:03:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-07-19T18:47:00.000Z"
      },
      "spamBlockDays": 7
    },
    {
      "spamBlockDate": {
        "$date": "2025-08-10T18:32:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-08-15T08:15:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-08-15T02:03:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-08-17T07:11:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-08-20T08:23:00.000Z"
      },
      "spamBlockDays": 3
    }
  ],
  "spamBlockDate": {
    "$date": "2025-08-20T08:23:00.000Z"
  },
  "spamBlockDays": 3,
  "spamBlockInitDate": {
    "$date": "2025-08-17T09:01:13.085Z"
  },
  "spamBlockReasons": [
    {
      "reason": "Ive always followed the rules, never spammed or done anything suspicious. I need to message my team for work, and this restriction is making it tough. My familys even getting worried, so Id really appreciate it if you could lift this restriction and let me get back to coordinating with my colleagues.",
      "date": {
        "$date": "2025-08-17T18:00:38.559Z"
      }
    },
    {
      "reason": "I have not violated any community standards, yet Im restricted to messaging only mutual contacts. This hinders my small business operations, as I need to communicate with customers and suppliers outside my contact list. As a result, people cannot reach me, impacting my business negatively.",
      "date": {
        "$date": "2025-08-18T11:12:58.677Z"
      }
    },
    {
      "reason": "I have never engaged in mass messaging or any prohibited activities, yet my account is restricted to messaging only mutual contacts. This limitation prevents me from providing essential customer support, as I can no longer reach important contacts who need assistance. I am deeply concerned about the impact this has on my ability to help those who rely on my services.",
      "date": {
        "$date": "2025-08-18T15:51:30.281Z"
      }
    }
  ]
},
{
  "_id": {
    "$oid": "683b23e03770b19a277f4690"
  },
  "accountId": "1418110336-prefix-elba",
  "dc4": "19a5067f947562289cafce0992c838586293533570f8ddb2d152fd5120f6e07a4ab00d9668e15ca7579492569952130b03960e2a5958e8c46f817dc5426954c1d7d9d5274d548d7609c709b4d1e1acf30803b83ac78e24a004f7684c130e36f0b7df36f084e3c00eb2672c5a3e58253458100e92b60f368a3c276ff93ac6783c61d4661a5aa775ccbaf9906c522019077f501a3aeb2c797a6b9a5805d2a0701d89f011041c505de74ec29a01015cb0d4840c1c03b6b91faf564a306c6802c2c413b0a1d15f57de2dc092d31b30df7174d790326758cae1e59a737b8fbd96638fd0f0226d3f2ffe7052048cd6988a3c3d791b558280b0161750cb9346fb0bbfce",
  "dcId": 4,
  "nextApiId": 2040,
  "dateUpdated": {
    "$date": "2025-08-19T10:38:25.329Z"
  },
  "twoFa": false,
  "twoFaDate": {
    "$date": "2025-08-18T00:42:33.968Z"
  },
  "phone": "+201552187794",
  "banned": false,
  "firstName": "Andrew",
  "id": "1418110336",
  "lastName": "Karpov",
  "messageCount": 6,
  "username": "karpov_small",
  "personalChannel": "CFh8nLcRzGJvmHvH",
  "personalChannelDate": {
    "$date": "2025-05-31T16:32:11.997Z"
  },
  "lazyCheckDate": {
    "$date": "2025-08-18T14:18:07.260Z"
  },
  "automaticCheckDate": {
    "$date": "2025-08-19T10:38:25.329Z"
  },
  "remainingTime": {
    "$date": "2025-08-11T19:29:55.969Z"
  }
},
{
  "_id": {
    "$oid": "683b23d03770b19a277f416c"
  },
  "accountId": "1442732725-prefix-elba",
  "dc5": "6b66f4e44a11e033e0b969805d52945465058102e198d3a550102122def9ff4a6d9caafdd15530e717056eae44efe61d4c0ad0f6f835b8eed984dc3393d2d7a35be72d5fe41ab56fc47ba48b7c04e784691e5b4ae7e385975dc62d2f4709e0131d3218371fc56a96ad31b4cb72c69f45d21ea6f14de0a3ecbf4edecb7c6e200225cff82939a939b1c0128fb90d4c40911f67bf13fecef26c8efd94561508b55cc2b26821b32dd9f9d2fa7f98e72c8174dab0bcf1f658116fb6cdaa5b6b34fd0990f9e7900e7d3c29c656a861dfaac5065fa28aff5e26aaf999cd89c48ff5baee24e0c9f60ab7051aed91dcda3788d1381af8c496f35b635986b5c3a67aac5915",
  "dcId": 5,
  "nextApiId": 2040,
  "dateUpdated": {
    "$date": "2025-08-19T10:31:38.051Z"
  },
  "twoFa": false,
  "twoFaDate": {
    "$date": "2025-08-18T00:42:25.541Z"
  },
  "phone": "+601117693243",
  "banned": false,
  "firstName": "Ruslan",
  "id": "1442732725",
  "lastName": "Kashirin",
  "messageCount": 12,
  "username": "kashirin_yelping",
  "personalChannel": "pjfsjn1KXVxSozZl",
  "personalChannelDate": {
    "$date": "2025-05-31T16:31:50.283Z"
  },
  "lazyCheckDate": {
    "$date": "2025-08-18T14:41:29.925Z"
  },
  "automaticCheckDate": {
    "$date": "2025-08-19T10:31:38.051Z"
  },
  "remainingTime": {
    "$date": "2025-08-11T21:01:24.604Z"
  }
},
{
  "_id": {
    "$oid": "680b9474461801f599601969"
  },
  "accountId": "1449249369-prefix-female-dmp1",
  "dc1": "2cfd88f88d4527007b1d5423f5b9fdcb2c89f9f3170d557cb1145d74d31edec2444cc2d694f38fc5748d168193444d34e8d0b46bb370a786bac43e0eb8e7aec4ffe5953ada4b4f186efc1677e1838d76adc3e60844462d334597443ed9c31a4555934fda06bd39e566478b66266b6c2e5bd7baf6995ecae034a8ed79d8283ca5fc1a4ec9dd1fa330850cc7415cb153bd6fe47b505b1c3c751a18019ef825960d9f904def9e458e6b073c10eac32f2de67edf615c3c1f740c4b1325c06574ecce40f68203e014e7f2c7334d231b5e542cc09345a9093e3ad034502ec55a912cad343912c353934b3181b2ede8ddb8917d258eff3faa9258922d5ea92076709d43",
  "dcId": 1,
  "nextApiId": 2496,
  "dateUpdated": {
    "$date": "2025-08-19T10:30:28.918Z"
  },
  "twoFa": false,
  "twoFaDate": {
    "$date": "2025-08-18T10:48:01.581Z"
  },
  "phone": "+541154959586",
  "banned": false,
  "firstName": "Alla",
  "id": "1449249369",
  "lastName": "Semenova",
  "messageCount": 142,
  "personalChannel": "o5JoUcrgUYngNQIf",
  "personalChannelDate": {
    "$date": "2025-04-25T14:34:09.334Z"
  },
  "lazyCheckDate": {
    "$date": "2025-08-18T22:56:54.941Z"
  },
  "automaticCheckDate": {
    "$date": "2025-08-19T10:30:28.918Z"
  },
  "username": "semenova_musical",
  "remainingTime": {
    "$date": "2025-08-19T11:09:53.383Z"
  }
},
{
  "_id": {
    "$oid": "685f074f3770b19a27ab222e"
  },
  "accountId": "1463841054-prefix-female-gidrovell",
  "dc1": "648b394eef9a051c1b6629c0cc7fe159b33674ffdfb2065a2ba89fdd8fe455c90fe9061d5287928089b17b1c1c1b694d539f8515adf591aaaf3fda657e11b753ca57b5ca078bc46425a567d70fecaf6392457c5b3d9065c05175970476bd80b066d8b58f458a4f11b1354c391f2910add4659119bd6dc21b40c6aa730b2dd4f355ee9d59d33982c8a4f7aa97baf62826a9875a26d4c780aba9926a234bca9c78aeb3d2a92b9ad5a16a1794020dd921893e75b34744e8266691026f4e3465519b256ce0458de54adeecce0bd1e577216b159395ce930f3d071c97f466f073a35e46ca0d05cf3aeb0d9f0ae0666f2c9264f75d444ea65cb630da1b52c27c543b95",
  "dcId": 1,
  "nextApiId": 2040,
  "dateUpdated": {
    "$date": "2025-08-19T10:14:30.935Z"
  },
  "phone": "+529811381877",
  "banned": false,
  "firstName": "Galina",
  "id": "1463841054",
  "lastName": "Lebedeva",
  "messageCount": 31,
  "username": "lebedeva_inclined",
  "personalChannelDate": {
    "$date": "2025-08-16T21:17:23.235Z"
  },
  "personalChannelError": "CHANNEL_NOT_FOUND",
  "lazyCheckDate": {
    "$date": "2025-08-18T22:17:28.982Z"
  },
  "automaticCheckDate": {
    "$date": "2025-08-19T10:14:30.935Z"
  },
  "remainingTime": {
    "$date": "2025-08-11T12:05:32.675Z"
  },
  "historySpamBlocks": [
    {
      "spamBlockDate": "INFINITY",
      "spamBlockDays": 0
    }
  ]
},
{
  "_id": {
    "$oid": "680b946b461801f599601719"
  },
  "accountId": "1476179533-prefix-female-dmp1",
  "dc1": "09e8512fd1a74e3a4e9e82b8eac832c884dc67e12dc9556d229d7878afc246f2a8dfacdf476f62b76a578c60164a32610cfb575bff1cbc2e00e9569581d3402dbe1e2568281bba2b4a7948e4c8d3c68fe33c358d9fc7306ec84879d0e4ab0d463cedc41ca8a3fe267d883a070182a034622778c928003a84e9a138cb12e0db83f726fe614ea3518c2b7d26754026234ced1a0527df98f977362f1ee5ba41c9072c090b1ce0bb8949f605d7ec40e996723d13e786055b3c9eb69e01d1bc5d7b185ede8f5e76ba18c422c89db50c8a426163831216e83cdf5540023a46ced3f5d27fb7bbeb94afb5dedc6e74381e05678dc13f19f1cdc69f4e0ebb7a8d1f9a1ba6",
  "dcId": 1,
  "nextApiId": 2496,
  "dateUpdated": {
    "$date": "2025-08-19T10:17:43.543Z"
  },
  "twoFa": false,
  "twoFaDate": {
    "$date": "2025-08-18T10:48:04.074Z"
  },
  "phone": "+541124647368",
  "banned": false,
  "firstName": "Elena",
  "id": "1476179533",
  "lastName": "Voronina",
  "messageCount": 120,
  "personalChannel": "VCxCcedarBg3irZk",
  "personalChannelDate": {
    "$date": "2025-04-25T14:34:18.322Z"
  },
  "lazyCheckDate": {
    "$date": "2025-08-18T16:09:33.566Z"
  },
  "automaticCheckDate": {
    "$date": "2025-08-19T10:17:43.543Z"
  },
  "username": "voronina_innocent",
  "remainingTime": {
    "$date": "2025-08-19T02:54:15.237Z"
  },
  "historySpamBlocks": [
    {
      "spamBlockDate": {
        "$date": "2025-08-16T08:32:00.000Z"
      },
      "spamBlockDays": 3
    }
  ]
},
{
  "_id": {
    "$oid": "685f07463770b19a27ab1f27"
  },
  "accountId": "1502166594-prefix-female-gidrovell",
  "dc1": "3bb562cd9a51c4de5c8d75de505ca2677fb4bf97f290274656d14b21dd3796067b8c38c4281ce8a84a16e79db44daa3205681988fc283525c20743811223a55c6f75116675a6aa939888972204a1ee19ffbf0fe5fc662cab9d01e3714add5bf3c4ff61e739b8b1cd01225d38cfc62173877870d05e6ca3d372cf5b3aec3b36c6c91af49345073c50fd7dd24420d2e90dcacb06c3f5be85241bd2594939cfc64825a7ad115809ca4e6aba777cd726805ca4813572a7d3f4a08b0b827994b23bdec96f270f0d2e0c3cc483fcb1f125f54ac6f8793694fa3a891cdd395ddafde01c4176f55a22cf3baa19f5f8fef1ce0ebc987f8f308c3c5e88db2906ea994312a7",
  "dcId": 1,
  "nextApiId": 2040,
  "dateUpdated": {
    "$date": "2025-08-19T10:22:42.289Z"
  },
  "twoFa": false,
  "twoFaDate": {
    "$date": "2025-08-18T10:47:31.288Z"
  },
  "phone": "+542616619598",
  "banned": false,
  "firstName": "Tatiana",
  "id": "1502166594",
  "lastName": "Tikhonova",
  "messageCount": 30,
  "username": "tikhonova_qualified",
  "personalChannelDate": {
    "$date": "2025-08-16T21:17:23.714Z"
  },
  "personalChannelError": "CHANNEL_NOT_FOUND",
  "lazyCheckDate": {
    "$date": "2025-08-18T21:37:05.795Z"
  },
  "automaticCheckDate": {
    "$date": "2025-08-19T10:22:42.288Z"
  },
  "remainingTime": {
    "$date": "2025-08-06T14:22:46.818Z"
  }
},
{
  "_id": {
    "$oid": "685f07483770b19a27ab1fd3"
  },
  "accountId": "1527312297-prefix-female-gidrovell",
  "dc1": "5e1f4a45621a3e6ac07b93812649fe77050de093511a5ebef9bcf97f0839537ab18823df500d3d9f89ddc49fd4f81b9b2d46a067be25e7e1790f3cd53a9e206f89f1f9319813833ee5cf079dae3176bd62c80be4ddf6b03d408afdb738620fb3163c2d52f0ef475ad69780a4294a4824301b85316b544e9e8cb3e005197d4b8f5a0be5c88d0e88af65b6c81fc921200ffdeac4488d3cead8322b1e740ee6795ad22a66a80cc1af3613cb82dd5b972350d971f24405105204b4856c2a7cae643784846911a987bc5e786c36a29ff7d45804eaecb7a533e08328b28d013914188126becf5065f2c09cc581cb3772c0f595e142940e6cba0416dc5022b3876db8e7",
  "dcId": 1,
  "nextApiId": 2040,
  "dateUpdated": {
    "$date": "2025-08-19T10:27:43.737Z"
  },
  "phone": "+541137585431",
  "banned": false,
  "firstName": "Raisa",
  "id": "1527312297",
  "lastName": "Borisova",
  "messageCount": 31,
  "username": "borisova_amethyst",
  "personalChannelDate": {
    "$date": "2025-08-16T21:17:26.174Z"
  },
  "personalChannelError": "CHANNEL_NOT_FOUND",
  "lazyCheckDate": {
    "$date": "2025-08-18T22:22:35.511Z"
  },
  "automaticCheckDate": {
    "$date": "2025-08-19T10:27:43.737Z"
  },
  "remainingTime": {
    "$date": "2025-08-11T12:36:51.137Z"
  }
},
{
  "_id": {
    "$oid": "680b9468461801f5996015d6"
  },
  "accountId": "1556858598-prefix-female-dmp1",
  "dc1": "ac6ceb6ddb513996de076b343d243f7e2156949d8cd42c9320c9ddc773279a64140297492ea06562c04f4fe472f2c0cbeb3aa912fb930fba71329dba2aebf79f6101dac0dea948f54616a8b4d20429a802941fe2a55b87f1f6b4c9eaa23d409e8234da70838ff0bb8c900c6ad16799f27441158bbd29462dd21660ad010f776abdc612d8dad298111d260650203dd7453d9b206d8e60499a3f46082bea3f5b0d35eab7b683a199de11a04dcb134cfe22d3b211b4f97eca7fd7c47de677218859de23dc6625b7fa62b8eb517d93b8e06690467b40545cc60f86b21f297bfa890b7c5c7ecf2063406457a5d8844fb622fdabf5b6c9e7530250e275debe4c9aeace",
  "dcId": 1,
  "nextApiId": 2040,
  "dateUpdated": {
    "$date": "2025-08-19T10:30:44.094Z"
  },
  "twoFa": false,
  "twoFaDate": {
    "$date": "2025-08-18T10:47:53.667Z"
  },
  "phone": "+523324972638",
  "banned": false,
  "firstName": "Marina",
  "id": "1556858598",
  "lastName": "Ilyina",
  "messageCount": 135,
  "personalChannel": "Oudnip9mRDbQQkOn",
  "personalChannelDate": {
    "$date": "2025-04-25T14:30:37.659Z"
  },
  "lazyCheckDate": {
    "$date": "2025-08-18T21:20:00.399Z"
  },
  "automaticCheckDate": {
    "$date": "2025-08-19T10:30:44.094Z"
  },
  "username": "ilyina_dangerous",
  "remainingTime": {
    "$date": "2025-08-19T07:41:01.525Z"
  }
},
{
  "_id": {
    "$oid": "680b9467461801f5996015a1"
  },
  "accountId": "1564386429-prefix-female-dmp1",
  "dc1": "3e1b2ed4e83b798f67f137a1db151edb2ea217a61d3e72e276a2827ca416d0093eea5fe63cbe6e7981540fc2af8d98e4902abbfdbf3cc8fcbd9373b2271d49006bab2973a4da94d238dbe6249d0760b4bb9a6bb2cb9776f8ba739a47c5d9e7fc37cc7142eeefd2de219843fae1560d25dfca8375f329bfd3ffc2b94495060aea59727be7e2f4f71316738869a28df822feba0a11faad6bf0489aa64442671ae9999cf8511f6aaf661c9ed7d664d143214d17e9b18131f63a854f0d60b22a17b323fb8f3a3f40ec51748c0cbfb1a97012abb621c58c10b8e86a017948eb5c73987a92e7b658ba00a23ddf62693538ffc72ad61e739bea1ce02c10a856e5311777",
  "dcId": 1,
  "nextApiId": 2040,
  "dateUpdated": {
    "$date": "2025-08-19T10:33:42.621Z"
  },
  "twoFa": false,
  "twoFaDate": {
    "$date": "2025-08-18T10:47:58.990Z"
  },
  "phone": "+541135744477",
  "banned": false,
  "firstName": "Albina",
  "id": "1564386429",
  "lastName": "Vikhrova",
  "messageCount": 108,
  "personalChannel": "vKNjFQFYKmdjigF9",
  "personalChannelDate": {
    "$date": "2025-04-25T14:33:35.465Z"
  },
  "lazyCheckDate": {
    "$date": "2025-08-18T14:01:02.834Z"
  },
  "automaticCheckDate": {
    "$date": "2025-08-19T10:33:42.621Z"
  },
  "username": "vikhrova_artistic",
  "remainingTime": {
    "$date": "2025-08-16T15:52:20.782Z"
  },
  "historySpamBlocks": [
    {
      "spamBlockDate": {
        "$date": "2025-08-09T05:57:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-08-15T12:50:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-08-23T14:05:00.000Z"
      },
      "spamBlockDays": 7
    }
  ],
  "spamBlockDate": {
    "$date": "2025-08-23T14:05:00.000Z"
  },
  "spamBlockDays": 7,
  "spamBlockInitDate": {
    "$date": "2025-08-16T14:16:11.635Z"
  }
},
{
  "_id": {
    "$oid": "680b9467461801f59960157b"
  },
  "accountId": "1572482584-prefix-female-dmp1",
  "dc1": "9929a4e50c128189a605886392d676c5bf301e037faf5d80b080cf638c7dbd7b9b3f66d82818c3e139ffceaf555fd4cd629a78a7116d75e7cc5b6cdd7909af45fbd5368d378028ab237a7b6e78b6b6da7b40baab0d0572975e7726060d5c9a27ba3c7362098498ef3f8a934a482a422bbc551d60a55efffc0f7732aa6210e53221973c650b43af9d3275fb9df073e3ff7022ee28a7dd0ba35c39134fd4a7b973fee3d60f7bad492cc778c2e4610481a249a3694be468dd694c002c7f8bc7ef21294c77de45a23c437a88fc6333205a9d3b1b0edf02502ec703cee894699fb658981e2e495abcf8f42b0744f4ed0a2524a20802d0b4aa47ff7fad3e95a75d6dcf",
  "dcId": 1,
  "nextApiId": 2040,
  "dateUpdated": {
    "$date": "2025-08-19T10:33:44.637Z"
  },
  "twoFa": false,
  "twoFaDate": {
    "$date": "2025-08-18T10:47:54.602Z"
  },
  "phone": "+542945657545",
  "banned": false,
  "firstName": "Elena",
  "id": "1572482584",
  "lastName": "Dorofeeva",
  "messageCount": 141,
  "personalChannel": "aEypyEmTt5wUYGDP",
  "personalChannelDate": {
    "$date": "2025-04-25T14:33:33.936Z"
  },
  "lazyCheckDate": {
    "$date": "2025-08-18T16:51:13.741Z"
  },
  "automaticCheckDate": {
    "$date": "2025-08-19T10:33:44.637Z"
  },
  "username": "dorofeeva_fluffy",
  "remainingTime": {
    "$date": "2025-08-19T05:30:47.927Z"
  }
},
{
  "_id": {
    "$oid": "685f07493770b19a27ab1fe2"
  },
  "accountId": "1598567875-prefix-female-gidrovell",
  "dc1": "9b0eb7b7a59a54c624aacf8c342ca3f54206b9a5647416c0bcc4dc6c27a9a68629381252ef4c930f3a5d4e1ec449979d26acc058808d8dfee2a5459070ffc1ab415d18800626d20a8aae694ba3e1491a1d00bfb5243be5c290e87c09710c5fe376b087831f6063c1c3f5f1b70c43a2a74c6b3094442254c258e6e5dd274d4a45c31849a6db54bf1de9c28e2c15539311e7fedb411d33e64968f4458a2143bea4c435fa4929c28c6ba1b743ad3b804d5858997cffb945859b6ec37c82208283865d4f18dfbdfcafa57753d356e67d3fa61895905bb8b6939b23ca3804eee428d992eb65a2e9bffa91780bde914e297163e4419e857d09f4e0ed8f5fd79055e830",
  "dcId": 1,
  "nextApiId": 2040,
  "dateUpdated": {
    "$date": "2025-08-19T10:39:44.669Z"
  },
  "twoFa": false,
  "twoFaDate": {
    "$date": "2025-08-12T11:28:50.377Z"
  },
  "phone": "+542615155028",
  "banned": false,
  "firstName": "Anfisa",
  "id": "1598567875",
  "lastName": "Bukina",
  "messageCount": 28,
  "username": "bukina_disappointed",
  "personalChannelDate": {
    "$date": "2025-08-16T21:17:26.067Z"
  },
  "personalChannelError": "CHANNEL_NOT_FOUND",
  "lazyCheckDate": {
    "$date": "2025-08-18T22:13:35.416Z"
  },
  "automaticCheckDate": {
    "$date": "2025-08-19T10:39:44.669Z"
  },
  "remainingTime": {
    "$date": "2025-08-11T12:06:14.703Z"
  }
},
{
  "_id": {
    "$oid": "683b23d23770b19a277f4204"
  },
  "accountId": "1645580690-prefix-elba",
  "dc5": "c0098e84f465f315f91653a7686cdee0e3ed774eb927182d25f89c74b07ed7c0c92880cb50fa45b88e70ae7d2fff0198ebbcdccdb3afcfb41b4cafed1322288f1fbd31b9a4b69f59f25792bccb9f8e92d2694bc89811b507e66ce3050f0caf7bc34d4eecb105dee2302f27ca015e4eb43632a56283cd428978cffce53ba1a78ba74e199e18ef854de40609922f82b446c069d868c9184d3e7964a74b8a486c0b29d1d73e97d68e59d9795d063c25ff7ea112a159cff883fff2bbefdb2a6007f90fee5a70df92d48f4d0527a97ee39ff8998a0405594b9d57f4b9aee80379cdccddd7d8c7b7c5d6ba880b3d70528476919eecbc2a952eadb8310c6580b819e343",
  "dcId": 5,
  "nextApiId": 2040,
  "dateUpdated": {
    "$date": "2025-08-19T10:28:38.023Z"
  },
  "twoFa": false,
  "twoFaDate": {
    "$date": "2025-08-18T00:42:27.943Z"
  },
  "phone": "+8613450469976",
  "banned": false,
  "firstName": "Viktor",
  "id": "1645580690",
  "lastName": "Erokhin",
  "messageCount": 12,
  "username": "erokhin_tender",
  "personalChannel": "JkXjSxv6zjZnkHAV",
  "personalChannelDate": {
    "$date": "2025-05-31T16:30:30.300Z"
  },
  "lazyCheckDate": {
    "$date": "2025-08-19T00:52:43.101Z"
  },
  "automaticCheckDate": {
    "$date": "2025-08-19T10:28:38.023Z"
  },
  "remainingTime": {
    "$date": "2025-08-09T15:04:01.323Z"
  },
  "historySpamBlocks": [
    {
      "spamBlockDate": {
        "$date": "2025-08-08T17:30:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": "INFINITY",
      "spamBlockDays": 0
    }
  ]
},
{
  "_id": {
    "$oid": "685f074b3770b19a27ab20de"
  },
  "accountId": "1720874305-prefix-female-gidrovell",
  "dc1": "1d0aecaf814a2c04d5815aaa9615f82ba1f05d5742ebd0d4b46bdd5815649c8f8cf302bf2fc8e5198a70788d797b188f55d60d14157f3ee28bfc8aeee4e13b53520a7965028d68d074ea2333bcdf67adf9fb4d398c78c6e717d140977e3a35b0537df3c6c6ac39cb69c0bcf12878976b9b2ce3d5fa22104aa686a5216da53ac504c0b17cd376e330ae76877aa41e51cc4325013d47873a2de8b116385a31f3c0e73924936ae9b974b7c1663abd9aa47a5879810373c2916f9d3e2372a959eae40f0af65adf8ebee8ef88913631d660e4925f56979141b4ad7cd1d6310d97eb2a8bd75d6511d6696e349ff786a4f087ebe8f8d46cdb14a473a1bcbc68eba673e7",
  "dcId": 1,
  "nextApiId": 2040,
  "dateUpdated": {
    "$date": "2025-08-19T10:27:15.065Z"
  },
  "twoFa": false,
  "twoFaDate": {
    "$date": "2025-08-18T10:47:55.697Z"
  },
  "phone": "+541124571753",
  "banned": false,
  "firstName": "Albina",
  "id": "1720874305",
  "lastName": "Sinitsyna",
  "messageCount": 23,
  "username": "sinitsyna_handsome",
  "personalChannelDate": {
    "$date": "2025-08-16T21:17:19.099Z"
  },
  "personalChannelError": "CHANNEL_NOT_FOUND",
  "lazyCheckDate": {
    "$date": "2025-08-18T21:41:08.004Z"
  },
  "automaticCheckDate": {
    "$date": "2025-08-19T10:27:15.065Z"
  },
  "historySpamBlocks": [
    {
      "spamBlockDate": "INFINITY",
      "spamBlockDays": 0
    },
    {
      "spamBlockDate": {
        "$date": "2025-08-08T19:54:00.000Z"
      },
      "spamBlockDays": 30
    },
    {
      "spamBlockDate": {
        "$date": "2025-07-20T06:34:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-07-25T10:50:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-07-26T10:47:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-08-03T10:30:00.000Z"
      },
      "spamBlockDays": 3
    }
  ],
  "remainingTime": {
    "$date": "2025-08-11T12:07:06.300Z"
  }
},
{
  "_id": {
    "$oid": "683b23d53770b19a277f4317"
  },
  "accountId": "1733138391-prefix-elba",
  "dc5": "c4d117f264d4c72d98693ba9dceabc68e1ce289d27aff913f02dadfca905d9175262f117f73b1c1001efe3f3ca04429ed2038ad7450515aaa5b8fd7036bfab01b74898eeb448725855044a05609c35d4441ed5b31ffe2cea5ae4de2618d8f37eb957be6aaee1bb73969184f61423ac8901e9b89432989cd9606fad9b185dc35eee1100046123833df9592b56029fb87348aaff193859fdd47ce8c994977be20f736274991543ba607f0ff759f9f799add784ca19edfc49f6041087a69efc39dcf2421259184b01e9d00ed24df2c02cfc31e40d1b55fc4043516aa6edf1f0150514f323b5e3c78126371d08b49de53c714067ee9fc81efaabb13a25df3136c0ec",
  "dcId": 5,
  "nextApiId": 2040,
  "dateUpdated": {
    "$date": "2025-08-19T10:15:19.716Z"
  },
  "twoFa": false,
  "twoFaDate": {
    "$date": "2025-08-18T00:42:29.181Z"
  },
  "phone": "+6285159566160",
  "banned": false,
  "firstName": "Denis",
  "id": "1733138391",
  "lastName": "Malyutin",
  "messageCount": 10,
  "username": "malyutin_orange",
  "personalChannel": "EOMrM8RcwnZEbjVF",
  "personalChannelDate": {
    "$date": "2025-05-31T16:31:44.606Z"
  },
  "lazyCheckDate": {
    "$date": "2025-08-18T15:04:12.562Z"
  },
  "automaticCheckDate": {
    "$date": "2025-08-19T10:15:19.716Z"
  },
  "remainingTime": {
    "$date": "2025-08-09T12:32:15.175Z"
  }
},
{
  "_id": {
    "$oid": "6810c3b1461801f5990b9762"
  },
  "accountId": "1734450482-prefix-elba",
  "dc1": "bd16f316e5d7bd55a29bb451003fb6c05efd4bdd5b59bb1dc4d0fcc40a63ada132fd92da3886cbd19bf1c04fdb7aa6480520391b1be73e6fd64ca88f945d76cfe7d0828be13f7f5c65af336b7fc918233a87fea0b86df09a63997f2d21a213c016914527dfbc3f8a8fe80c7a02a6696ffa7a1b985e988b34b812faa419205a4be2b2b1d5c59faa888bb972c974fb04d56e5ede6f723ab63ed0e14ee945ec520b69303cc230138d2806890882d8b37763783fa76c9a5a95bb18ff932c9f96b04ea45fa9209f1ec251afe94509749438d6acbe758c8f11e4827de41a0f2a537211181b9794581f1f1c23e747b333a7c19782ac96ac804c167a312b7ffb8465cf10",
  "dcId": 1,
  "nextApiId": 2040,
  "dateUpdated": {
    "$date": "2025-08-19T10:18:31.717Z"
  },
  "twoFa": false,
  "twoFaDate": {
    "$date": "2025-08-19T02:19:53.926Z"
  },
  "phone": "+573142753823",
  "banned": false,
  "firstName": "Andrew",
  "id": "1734450482",
  "lastName": "Kazmin",
  "messageCount": 31,
  "username": "kazmin_peculiar",
  "personalChannel": "yQIEhmzQF4faxeHn",
  "personalChannelDate": {
    "$date": "2025-04-29T13:14:20.662Z"
  },
  "lazyCheckDate": {
    "$date": "2025-08-18T17:55:34.677Z"
  },
  "automaticCheckDate": {
    "$date": "2025-08-19T10:18:31.717Z"
  },
  "remainingTime": {
    "$date": "2025-08-11T11:03:36.621Z"
  },
  "historySpamBlocks": [
    {
      "spamBlockDate": {
        "$date": "2025-05-18T06:54:00.000Z"
      },
      "spamBlockDays": 1
    }
  ]
},
{
  "_id": {
    "$oid": "680b9469461801f599601611"
  },
  "accountId": "1742898054-prefix-female-dmp1",
  "dc1": "024efc57f9a8bcf7e80129b6c832c28dd392e5db8679f3b01fe1cfea09320a74f8b8a40571dd22a646b196740aa61d1035a2491ae27022f847432096d62dd323ec136662cfe7c2ee61944780853844ca91526d7a86bf88a5cae165002d70ac2a6da6644df9648b92b1949af371786afce645e6325f3824501cb05311d47be9f52311eb39f3e3d5d06c8f1afdab7efaabdd00343b929ba5c77e341bbdebe9a9348d7980176d77d02896ee4ee2bede515337de0959352a1846183f57f52b3661ccf46806fbe92357c61b4f9b7380fb8090ec11226a7136290a9bba66fae77d01ca351d45bc410f8baf22ea4c85626f10d08ee4ac5416dfbae2036e470460a4e960",
  "dcId": 1,
  "nextApiId": 2040,
  "dateUpdated": {
    "$date": "2025-08-19T10:17:43.130Z"
  },
  "twoFa": false,
  "twoFaDate": {
    "$date": "2025-08-18T10:47:57.265Z"
  },
  "phone": "+573196327007",
  "banned": false,
  "firstName": "Rita",
  "id": "1742898054",
  "lastName": "Kozlova",
  "messageCount": 44,
  "personalChannel": "sF8tRuJTrHGGNQdr",
  "personalChannelDate": {
    "$date": "2025-04-25T14:31:12.129Z"
  },
  "lazyCheckDate": {
    "$date": "2025-08-18T15:33:26.422Z"
  },
  "automaticCheckDate": {
    "$date": "2025-08-19T10:17:43.130Z"
  },
  "username": "kozlova_powerful",
  "remainingTime": {
    "$date": "2025-08-19T02:37:40.366Z"
  }
},
{
  "_id": {
    "$oid": "685f07493770b19a27ab1ff3"
  },
  "accountId": "1757536135-prefix-female-gidrovell",
  "dc1": "747375c68ce41358284ecb0bc71d629788d9f1af0f5f9a828459973264e7cfb15f6bb394afbbb9bfd77985ff42d46ddb4d7ad6dc4d35dbb58c2a2b1f57f5feb728855295a9895dcaeca64ecffc3bbd015850741f846102049488fecb6ad2a67b0fda77c9fa213cdc77ee48c153bfd7b750266b0a1ca27c9b474de81dfd9cfc1481e50a4be9442cd82b266c546cd695ee8dd6d7b384cff4c76fd9299db3e5c92f93ce663a621a6d409ff4862c0074de63e024bff2695b8a7ffa7a8b5a45ce291b7c96d20411cdd3f908ddcd87093b64ab398ebbc384b184adffccda71e75842bf2ef955bc13864c662b6da3ba8716325a879c1f2d606ad04685c1408ab6e7790f",
  "dcId": 1,
  "nextApiId": 2040,
  "dateUpdated": {
    "$date": "2025-08-19T10:26:42.792Z"
  },
  "twoFa": false,
  "twoFaDate": {
    "$date": "2025-08-18T10:47:42.721Z"
  },
  "phone": "+541165419509",
  "banned": false,
  "firstName": "Vera",
  "id": "1757536135",
  "lastName": "Koroleva",
  "messageCount": 27,
  "username": "koroleva_protective",
  "personalChannelDate": {
    "$date": "2025-08-16T21:17:22.008Z"
  },
  "personalChannelError": "CHANNEL_NOT_FOUND",
  "lazyCheckDate": {
    "$date": "2025-08-18T22:23:37.306Z"
  },
  "automaticCheckDate": {
    "$date": "2025-08-19T10:26:42.792Z"
  },
  "remainingTime": {
    "$date": "2025-08-07T16:35:53.939Z"
  },
  "historySpamBlocks": [
    {
      "spamBlockDate": "INFINITY",
      "spamBlockDays": 0
    }
  ]
},
{
  "_id": {
    "$oid": "685f07513770b19a27ab2276"
  },
  "accountId": "1760665579-prefix-female-gidrovell",
  "dc1": "bde9a40b93bb1bda0858937dd91b75c82c70b02007675e9e7aaf117254919225f8ff0e5c5c03590ae8580bc073e6fb3a4bc117c15fd89c494dc1a3f7630fc8414c748e05517fb03b9d896abd181edb9fa91288aab01272df243d8c879c17919734d58e05eacf0fc09b71eb4c7ad87161008d14d3b7f31ee608de33126b9b19b01d8b3832d2ebbd56130ab447173e1654789f84f03ad64a17fc1e3669695360a1487cc08d87cebca4bc157d333332bcc98479e3ace668168cd3d9ee2d7dd712bc1e083066ed2ed35776a7cc20886cb7289383e4536480f438f7d5a3387177fdff87fb94004c574070a3f7ec514b4956d1fb770d9b144663dcaa0e9fdce6685208",
  "dcId": 1,
  "nextApiId": 2040,
  "dateUpdated": {
    "$date": "2025-08-19T10:21:27.941Z"
  },
  "twoFa": false,
  "twoFaDate": {
    "$date": "2025-08-18T10:47:39.600Z"
  },
  "phone": "+528129189572",
  "banned": false,
  "firstName": "Alisa",
  "id": "1760665579",
  "lastName": "Lapshina",
  "messageCount": 27,
  "username": "lapshina_opposite",
  "personalChannelDate": {
    "$date": "2025-08-16T21:17:15.188Z"
  },
  "personalChannelError": "CHANNEL_NOT_FOUND",
  "lazyCheckDate": {
    "$date": "2025-08-18T21:42:12.631Z"
  },
  "automaticCheckDate": {
    "$date": "2025-08-19T10:21:27.941Z"
  },
  "remainingTime": {
    "$date": "2025-08-11T12:34:45.176Z"
  }
},
{
  "_id": {
    "$oid": "685f074a3770b19a27ab2075"
  },
  "accountId": "1818113720-prefix-female-gidrovell",
  "dc1": "95e464cffa997e620fd30f60e3b39342c5cdfdfa01b3e9b081a7c6de3c8d616484df068d575222e8339a947987ab16d8047a15ab8b8e0af224eea64e6688e951172918c638514ef0cc29ec50631867ac1a2b814c5efe6cb97df48ae0db34f7b3cc87036014eb072604b6c1e5cce89518fd0d4fb09c10341e674c7d6337165538f4fbebbcac8f6704d15fb095d4b5ff2b86288c3e6e5157e3d9a5207d19079a35018ce2d95028e4f1c8585bd7b9c5883cd931c3b55e28110967eab7215233c1952e47016b0325813268050b8ed6b5ba8d6072f8a27e680823cfcdfbbe9deae8cf2183a8504edde1d010638759d746d74846d92e0ccfe8af0795de476d4e311cc3",
  "dcId": 1,
  "nextApiId": 2040,
  "dateUpdated": {
    "$date": "2025-08-19T10:31:42.706Z"
  },
  "twoFa": false,
  "twoFaDate": {
    "$date": "2025-08-18T10:47:49.659Z"
  },
  "phone": "+542645421294",
  "banned": false,
  "firstName": "Anna",
  "id": "1818113720",
  "lastName": "Denisova",
  "messageCount": 30,
  "username": "denisova_friendly",
  "personalChannelDate": {
    "$date": "2025-08-16T21:17:09.376Z"
  },
  "personalChannelError": "CHANNEL_NOT_FOUND",
  "lazyCheckDate": {
    "$date": "2025-08-18T20:47:52.284Z"
  },
  "automaticCheckDate": {
    "$date": "2025-08-19T10:31:42.706Z"
  },
  "remainingTime": {
    "$date": "2025-08-11T12:05:31.390Z"
  }
},
{
  "_id": {
    "$oid": "680b9472461801f5996018ae"
  },
  "accountId": "1845882186-prefix-female-dmp1",
  "dc1": "42601520e95fb2ae7a0c228fb579bf9a58cd83e13a07e7a27708202e9a0b69f807949b69b0845f61c9364afd4f18ebdf143b34b8fb76c92070609a19c6c67dcf10cfa8ab09a4356b4ea92311ff559b6ba4828ecf8fdbb3c286d940f121c9a81d2423d09b34600ab44b5994f0da822ab40a2aad0be517c837fa7a4be6e40d948b5147b3f8cb04acdb93506ad751b6428fd5ec2eda57440cd0a8f05b734bd89d01a77c2f750f0e57634ba774fde16d35e98167e0631ba71314603be289fd24ffd939af94ed3a500343329c71ed984428a18fb0b167a0e6edd139277d0157ffe7070a9464d7ad7bd4e470b265fd999739049500bd70157fcc3ea0fef785007cd0b0",
  "dcId": 1,
  "nextApiId": 2496,
  "dateUpdated": {
    "$date": "2025-08-19T10:39:11.470Z"
  },
  "twoFa": false,
  "twoFaDate": {
    "$date": "2025-08-18T10:47:58.778Z"
  },
  "phone": "+541123716567",
  "banned": false,
  "firstName": "Polina",
  "id": "1845882186",
  "lastName": "Vasilyeva",
  "messageCount": 99,
  "personalChannel": "tHCbyWQipVZFf1JU",
  "personalChannelDate": {
    "$date": "2025-04-25T14:33:55.094Z"
  },
  "lazyCheckDate": {
    "$date": "2025-08-18T15:44:28.432Z"
  },
  "automaticCheckDate": {
    "$date": "2025-08-19T10:37:44.192Z"
  },
  "username": "vasilyeva_prepared",
  "remainingTime": {
    "$date": "2025-08-17T18:46:12.222Z"
  },
  "historySpamBlocks": [
    {
      "spamBlockDate": {
        "$date": "2025-05-02T07:41:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-06-29T03:56:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-07-03T03:03:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-07-03T10:38:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-07-03T13:15:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-07-03T22:33:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-07-09T04:22:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-07-09T19:58:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-08-11T04:19:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-08-18T19:38:00.000Z"
      },
      "spamBlockDays": 7
    },
    {
      "spamBlockDate": {
        "$date": "2025-08-15T05:12:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-08-16T06:20:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-08-17T02:01:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-08-21T00:23:00.000Z"
      },
      "spamBlockDays": 3
    }
  ],
  "spamBlockReasons": [
    {
      "reason": "I have never violated Telegrams terms of service or sent unsolicited messages. Despite this, Im restricted to messaging only mutual contacts. This limitation makes it impossible to reach important contacts, hindering my ability to communicate effectively.",
      "date": {
        "$date": "2025-08-18T01:10:32.868Z"
      }
    },
    {
      "reason": "Ive always used my account responsibly, without any violations. The messaging restrictions are preventing me from coordinating volunteer work and community activities with people outside my mutual contacts. Deals are falling through, and its hindering my ability to organize and communicate effectively.",
      "date": {
        "$date": "2025-08-18T21:35:27.438Z"
      }
    },
    {
      "reason": "I have not violated any community standards, yet Im restricted to messaging only mutual contacts. This limitation severely impacts my professional communication, as I cannot reach important contacts. I request the removal of this restriction to restore full functionality for work purposes.",
      "date": {
        "$date": "2025-08-19T10:39:11.470Z"
      }
    }
  ],
  "spamBlockDate": {
    "$date": "2025-08-21T00:23:00.000Z"
  },
  "spamBlockDays": 3,
  "spamBlockInitDate": {
    "$date": "2025-08-18T01:10:32.871Z"
  }
},
{
  "_id": {
    "$oid": "680b9471461801f599601878"
  },
  "accountId": "1913969902-prefix-female-dmp1",
  "dc1": "3f81a5bd5b6637906526c953eaa78ac1f807ebf6626b0087fec9837e0f60f70fe6559723d7382cb70b56c44aa89e76847069726484c730e20f141e67424ba1bc1d6d436244be4aec3b91c62155c1ec68b7e89b4b75ce9f4f2ace6280db1a837a73ab9c296415ca00c9c81116cbec941f410ed4b47e32b409ef38b681427f4f1703e985010dd683eaebccab08be7bff748ca762494fff39d01f026e95c1ba7763d52da72550dc0fec3e88818edd404b85e1685e1d6117e66aaaa39c762c1dbaaa4ab4698b9644a58326276a3587713269b20b20a1b55737e379b2830c08336dfea4f12688366ac5096097008cb2f2b457a49a97799185e89486970fb003368937",
  "dcId": 1,
  "nextApiId": 2496,
  "dateUpdated": {
    "$date": "2025-08-19T10:22:44.064Z"
  },
  "twoFa": false,
  "twoFaDate": {
    "$date": "2025-08-18T10:48:07.912Z"
  },
  "phone": "+541159439953",
  "banned": false,
  "firstName": "Mira",
  "id": "1913969902",
  "lastName": "Tarasova",
  "messageCount": 137,
  "personalChannel": "EmgoTWPhRjclpP4E",
  "personalChannelDate": {
    "$date": "2025-04-25T14:32:29.916Z"
  },
  "lazyCheckDate": {
    "$date": "2025-08-18T14:51:32.941Z"
  },
  "automaticCheckDate": {
    "$date": "2025-08-19T10:22:44.064Z"
  },
  "username": "tarasova_appropriate",
  "remainingTime": {
    "$date": "2025-08-19T03:45:14.090Z"
  },
  "historySpamBlocks": [
    {
      "spamBlockDate": {
        "$date": "2025-04-28T05:17:00.000Z"
      },
      "spamBlockDays": 1
    }
  ]
},
{
  "_id": {
    "$oid": "685f074b3770b19a27ab20f0"
  },
  "accountId": "1915864526-prefix-female-gidrovell",
  "dc1": "48ce09910c01b6efa606a47c9dce90cbf885c58e0908262b3cb75ddb0c0f1dbf77e3607ea65bef2ae26ae17e87ef78dac8f15dbfdf383ea29aa401a8a7b867d9c30bc302806e459a96dda15e4af3620e0d5f768d2268dfdf66468bf0e8039d6b44ff262dbbdfc280125035fa942625752271ef53e96c84c5d00389bbfa1da5a22e314a81618ac1c24006482cda5554e67e5ffb2cb3cf1635a5e0ea66ddf1d6e5f2871369f9dd70fd2c22eaf921b634ebbbf58f0da6ec0b904b198e3d4ccf4366a2f4627d636322712296dac90bfc2a1def585e587c26b309b455ccedbc9eb001654f19ecf3e5f5290a02729584b2101a113c6af178376f0eb127328eb4f77504",
  "dcId": 1,
  "nextApiId": 2040,
  "dateUpdated": {
    "$date": "2025-08-19T10:35:16.618Z"
  },
  "twoFa": false,
  "twoFaDate": {
    "$date": "2025-08-18T10:47:55.647Z"
  },
  "phone": "+542964573863",
  "banned": false,
  "firstName": "Marina",
  "id": "1915864526",
  "lastName": "Karpova",
  "messageCount": 26,
  "username": "karpova_presidential",
  "personalChannelDate": {
    "$date": "2025-08-16T21:17:17.939Z"
  },
  "personalChannelError": "CHANNEL_NOT_FOUND",
  "lazyCheckDate": {
    "$date": "2025-08-18T21:24:15.017Z"
  },
  "automaticCheckDate": {
    "$date": "2025-08-19T10:35:16.618Z"
  },
  "remainingTime": {
    "$date": "2025-08-05T14:01:24.407Z"
  }
},
{
  "_id": {
    "$oid": "685f07513770b19a27ab227e"
  },
  "accountId": "1945486043-prefix-female-gidrovell",
  "dc1": "8f4122793a2e46638e52e4fd2eeb6812b905451fc5aff07db1240328da9c1462c5f271f2a46026282263fbebf6bcd58f0a99d73357d05bb756686c4af3c82ad685fe2714791162ce04e52313e84284868359d0031e9347c0c5a790b72e8b409113de468a183763305f4819a1ff532e9e0de06578b9121f894736bfca8ecbedb9da1fa020587f85a40721eb1b9e5661aaf1321e404e82e2be6648379f17571785bc2f57e633b04e1d8c118cd9368f753f98f55fffa626969bb40579c16c324a63f81f978b45eb0569738bd2892093085c186568e817503d863fb1932aeb89488011e5f2b0f48d3b2addb722f37be090b4c2077b6964944616aa4eb6c6ef28334d",
  "dcId": 1,
  "nextApiId": 2040,
  "dateUpdated": {
    "$date": "2025-08-19T10:34:27.896Z"
  },
  "twoFa": false,
  "twoFaDate": {
    "$date": "2025-08-18T10:47:43.711Z"
  },
  "phone": "+525538906958",
  "banned": false,
  "firstName": "Nina",
  "id": "1945486043",
  "lastName": "Sidorova",
  "messageCount": 25,
  "username": "sidorova_racial",
  "personalChannelDate": {
    "$date": "2025-08-16T21:17:15.190Z"
  },
  "personalChannelError": "CHANNEL_NOT_FOUND",
  "lazyCheckDate": {
    "$date": "2025-08-18T19:23:46.183Z"
  },
  "automaticCheckDate": {
    "$date": "2025-08-19T10:34:27.896Z"
  },
  "remainingTime": {
    "$date": "2025-08-06T14:16:35.096Z"
  }
},
{
  "_id": {
    "$oid": "680b946a461801f599601672"
  },
  "accountId": "1951666056-prefix-female-dmp1",
  "dc1": "24551baf08dec1f698faa80a748250c627b47986106c7c17049efb91ea1f184a00dfdf973d009408c58e2f1e620ec981d61641e99442a00f7ffa3d8a8a79cdf22ca678bdbea73bfc7bc941bb98179391bd455a7281ae8f041ce6452f79cb109b5864ba2ef231b75625e3388461079839dec618126947157f47ed1a3958da9e04913c6b3a4d107cfde62294f3917d76790402282b06d769361a1dcc7ca41d09d058c055b9fde42bbc7865a38becef5e6ef201922f9f121b055c8931dc7d7005dc1c8bc2a44bbea5ecaf00a1b0e3b4144fe9b4b9377724395099b82576de42b7388d3ebe1ec55d7da7f4d40fefd47cd006da6a67884ce34a0d5db00c1f14f1f8a3",
  "dcId": 1,
  "nextApiId": 2040,
  "dateUpdated": {
    "$date": "2025-08-19T10:29:43.232Z"
  },
  "twoFa": false,
  "twoFaDate": {
    "$date": "2025-08-18T10:47:57.249Z"
  },
  "phone": "+529514134669",
  "banned": false,
  "firstName": "Olga",
  "id": "1951666056",
  "lastName": "Naumova",
  "messageCount": 136,
  "personalChannel": "mcGbAy6QOrxCjigU",
  "personalChannelDate": {
    "$date": "2025-04-25T14:33:09.991Z"
  },
  "lazyCheckDate": {
    "$date": "2025-08-18T15:30:27.695Z"
  },
  "automaticCheckDate": {
    "$date": "2025-08-19T10:29:43.232Z"
  },
  "username": "naumova_faithful",
  "remainingTime": {
    "$date": "2025-08-19T04:33:30.671Z"
  },
  "historySpamBlocks": [
    {
      "spamBlockDate": {
        "$date": "2025-07-03T17:40:00.000Z"
      },
      "spamBlockDays": 1
    }
  ]
},
{
  "_id": {
    "$oid": "680b9474461801f59960195c"
  },
  "accountId": "1966111337-prefix-female-dmp1",
  "dc1": "b88433f6ffdf42eaedbe2c695eb34961953e7495441431109654dd394bef5c5fe284a8052937a290c1fd58cc1c06c9328f9e839cf3bec05535ead1e62d18cbdcf5bd32fb5afafb7cf72009800a66aa231d465126d2942285eee800a24a5b2ef4ed697875b050f4e468c3b29e107d287295669321661f416922ec20149cd353a7fdcd831fafca5b3b073fd9752870bf758a2fdc5af05732f87a357652072323ee0b881f2fefa7e01597a3830c8fb74651ec4526751c9687ae352870b71ea927a93dda6775c331d7845f343244b36708a0233258187427884dd7396ed5c5be42fcce5dbf86df3cf26a2b8577e4dea87841b3ae189462e067cfc0bf7656ff3fe8f2",
  "dcId": 1,
  "nextApiId": 2496,
  "dateUpdated": {
    "$date": "2025-08-19T10:32:34.486Z"
  },
  "twoFa": false,
  "twoFaDate": {
    "$date": "2025-08-18T10:48:01.656Z"
  },
  "phone": "+573042176941",
  "banned": false,
  "firstName": "Valeria",
  "id": "1966111337",
  "lastName": "Sidorova",
  "messageCount": 46,
  "personalChannel": "hUqqpmuy5UMgrLxU",
  "personalChannelDate": {
    "$date": "2025-04-25T14:32:06.902Z"
  },
  "lazyCheckDate": {
    "$date": "2025-08-18T18:34:21.577Z"
  },
  "automaticCheckDate": {
    "$date": "2025-08-19T10:32:34.486Z"
  },
  "username": "sidorova_mobile",
  "remainingTime": {
    "$date": "2025-08-19T02:33:15.147Z"
  }
},
{
  "_id": {
    "$oid": "680b946e461801f5996017b4"
  },
  "accountId": "1977161609-prefix-female-dmp1",
  "dc1": "8408a51cce38c0c418bd31802add8b85820e14b1cb7b12f99fd261efab87265bf8aff8bd303f21916a25808f3b7e1cd162df93921871a8a69e37cf727c17dd4d88c580dd11dc7c9f39e5c85783bd78940b3487f5dc6f4caa8a8a6bdd04f55d0828a1916fa8720bf2585fb6849a3efe0dacbac1d1886ad06f719bc764a25823302b8b7748f1bfd499bcf6def1fcfd93adb7795bb34c53cab5de4aa1767ef67d946382f00ccca5b0d003edd560b3b93610d315fb846a4630d89efa3d33929dbb8cf9cfc9d0c2dd46f1acfbf765d41535b9eba3cb29a6047d02c49ffe5a808f373e3fb171adffc9588fc1886ad8a621a83e497a60f8f8921115b119904444d1af50",
  "dcId": 1,
  "nextApiId": 2496,
  "dateUpdated": {
    "$date": "2025-08-19T10:34:43.870Z"
  },
  "twoFa": false,
  "twoFaDate": {
    "$date": "2025-08-18T10:48:05.937Z"
  },
  "phone": "+541128369144",
  "banned": false,
  "firstName": "Arina",
  "id": "1977161609",
  "lastName": "Efimova",
  "messageCount": 45,
  "personalChannelDate": {
    "$date": "2025-05-03T20:17:24.683Z"
  },
  "lazyCheckDate": {
    "$date": "2025-08-18T23:40:22.971Z"
  },
  "automaticCheckDate": {
    "$date": "2025-08-19T10:34:43.870Z"
  },
  "username": "efimova_lively",
  "remainingTime": {
    "$date": "2025-08-19T04:41:40.307Z"
  },
  "personalChannel": "dRrpKy9aSLKdqzFZ",
  "historySpamBlocks": [
    {
      "spamBlockDate": {
        "$date": "2025-06-22T13:59:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-07-08T09:40:00.000Z"
      },
      "spamBlockDays": 7
    },
    {
      "spamBlockDate": {
        "$date": "2025-07-03T12:39:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-07-06T12:44:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-08-15T06:18:00.000Z"
      },
      "spamBlockDays": 7
    },
    {
      "spamBlockDate": {
        "$date": "2025-08-11T19:59:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-08-16T06:47:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-08-23T11:57:00.000Z"
      },
      "spamBlockDays": 7
    }
  ]
},
{
  "_id": {
    "$oid": "683b23d63770b19a277f4344"
  },
  "accountId": "1983152220-prefix-elba",
  "dc5": "56ad0faa57ba3caf6d7c66d098712218f3d0bf3a6bd082765b0ee83d43d55146c50221b47b86fe6e5ec8e6793f08a1ba91df7f7397b3773ebe3849625b67fbcea53d42cdb087708c4ed7190ab5277ff90b68728bfbbb0eb9f973fdad43cb2366c021286354f30f9f0ce4ee929902bcb14758b8f74069aaab1346cdf1c735cb3111dca72a3dbdfefb216fcaf1dda62aa13c4b35d66f4e8d51116fcbeac17755863cd7ea010041f0d76ee489ca2e5b942bc6c881128b0260c9d544a0d337a5fffbe7aaee8a4d4c10c624cb6236195b65d5b4a756490f50f171e211ce9d460615f16bcc36ba33badd3dd826e67850a42edd608b0ff17c5fc5623619527015412d80",
  "dcId": 5,
  "nextApiId": 2040,
  "dateUpdated": {
    "$date": "2025-08-19T10:30:30.793Z"
  },
  "phone": "+6282111700959",
  "banned": false,
  "firstName": "Andrew",
  "id": "1983152220",
  "lastName": "Novikov",
  "messageCount": 14,
  "username": "novikov_close",
  "personalChannel": "hpb9SaZyveImaxSP",
  "personalChannelDate": {
    "$date": "2025-05-31T16:32:55.917Z"
  },
  "lazyCheckDate": {
    "$date": "2025-08-19T00:01:24.563Z"
  },
  "automaticCheckDate": {
    "$date": "2025-08-19T10:30:30.793Z"
  },
  "remainingTime": {
    "$date": "2025-08-11T16:27:09.736Z"
  }
},
{
  "_id": {
    "$oid": "685f074c3770b19a27ab2110"
  },
  "accountId": "2002976849-prefix-female-gidrovell",
  "dc1": "1954f88c3de4ce045b01b74755c5f39d539455b89fa9987343df0c75736bea7bb48e3baf65c8a512ee0f8c191219508a965fd3d987f8bec6a7681658cf38ae64c642aef9b6a88b313c99cfd5b24330cbf6f63add44263ea015a41fa222e4ddb0f3c5e0850cd9a025c263c5da6ebc3361f68bdda7bc26dd1018352cf038f1d03f036b17438f6816bd2141bfcc6a9777d746a28223661261536fe2afc7c81644d0971c9981b319aaefa26ac9aa52cedd268afff4fdf73c33d3fdc0fdb767dfdd42a896ff6efaaf54d55939c77a03ea6e315532cd286c553e49596eb4f900697d03fc0e253aa9d5d71bc29c6d5e0f9540f07e837f719f42ab70fc7b7c4a14f75dbb",
  "dcId": 1,
  "nextApiId": 2040,
  "dateUpdated": {
    "$date": "2025-08-19T10:28:18.208Z"
  },
  "twoFa": false,
  "twoFaDate": {
    "$date": "2025-08-18T10:47:56.953Z"
  },
  "phone": "+543435520897",
  "banned": false,
  "firstName": "Galina",
  "id": "2002976849",
  "lastName": "Loginova",
  "messageCount": 24,
  "username": "loginova_curved",
  "personalChannelDate": {
    "$date": "2025-08-16T21:17:17.740Z"
  },
  "personalChannelError": "CHANNEL_NOT_FOUND",
  "lazyCheckDate": {
    "$date": "2025-08-19T01:09:23.781Z"
  },
  "automaticCheckDate": {
    "$date": "2025-08-19T10:28:18.208Z"
  },
  "remainingTime": {
    "$date": "2025-08-05T18:30:37.441Z"
  },
  "historySpamBlocks": [
    {
      "spamBlockDate": {
        "$date": "2025-08-01T10:00:00.000Z"
      },
      "spamBlockDays": 30
    },
    {
      "spamBlockDate": {
        "$date": "2025-07-16T04:22:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-07-17T15:12:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-07-19T07:22:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-07-31T06:40:00.000Z"
      },
      "spamBlockDays": 3
    }
  ]
},
{
  "_id": {
    "$oid": "685f074d3770b19a27ab2183"
  },
  "accountId": "2006447281-prefix-female-gidrovell",
  "dc1": "159f6e958b1a2f0027378d5712502d48244a45000398f700a5ea39ffe2d3054f7ce7acdbed1f5375615f92f7050e77fe136ece0211a5f78332dcf73df7c4794262951d743110240490e2ef5b68f986abf414651384667b71be52c6db0c803ec5e3754c0bec1445f42d761de8b023d51a594b76c3ceff7270b06d4b8d18428b99ab1f1d4ac4de9dab83223396ac716bb7f76bf55b4c27c0bfabe7652eeeb615460983953ff0c8c67b17fa3f112273a4e94f048f50b76cf88916d4a0893a88f526db168430336fcb067105437a2e2c0ef3ef5fc3093c18ce8df4c921726b3bf635c941a79261aa9a2a87d1c3c201fe99850e6a4054d0355575a20e46014670852e",
  "dcId": 1,
  "nextApiId": 2040,
  "dateUpdated": {
    "$date": "2025-08-19T10:17:27.724Z"
  },
  "twoFa": false,
  "twoFaDate": {
    "$date": "2025-08-18T10:47:56.946Z"
  },
  "phone": "+525542588753",
  "banned": false,
  "firstName": "Olga",
  "id": "2006447281",
  "lastName": "Rusanova",
  "messageCount": 30,
  "username": "rusanova_yearling",
  "personalChannelDate": {
    "$date": "2025-08-16T21:17:20.033Z"
  },
  "personalChannelError": "CHANNEL_NOT_FOUND",
  "lazyCheckDate": {
    "$date": "2025-08-18T21:31:11.141Z"
  },
  "automaticCheckDate": {
    "$date": "2025-08-19T10:17:27.724Z"
  },
  "remainingTime": {
    "$date": "2025-08-11T12:29:00.264Z"
  },
  "historySpamBlocks": [
    {
      "spamBlockDate": {
        "$date": "2025-07-07T08:20:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-07-09T07:20:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-07-22T06:28:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-07-25T10:42:00.000Z"
      },
      "spamBlockDays": 1
    }
  ]
},
{
  "_id": {
    "$oid": "680b9467461801f599601586"
  },
  "accountId": "2008249926-prefix-female-dmp1",
  "dc1": "16a40688f5d0f94f6188af19e6795994fcc9d00c0847b41f9731e70d22d10ab95a6e8c2c7c417972bca2f996f94124d7adbd11fb670b377614181b3ba639e476c8f1da7eb8fd4c884faa7bde05c93ed6abbf47689d70a6d50e7d863791db1432da34b5dde474e327c6ed8904b0aae02705cac6aba9e6de4b6d96a9d68251bdaf469347f74c9538c01fb98fadc3ca5070a1189c330d2098f95cc55b270a5514fd4f8b0043e46e5e1616cee945e08d8716496913d3aa2b7f1b61d98b4cd51d5e585a416f6db818b1eb60f5f5601e5f95313becdcd4419a980280fef9ffe451a7b208fd4eeebc253cd8a47d342904442d165d66269c6987c621b5129ff2ca52b283",
  "dcId": 1,
  "nextApiId": 2040,
  "dateUpdated": {
    "$date": "2025-08-19T10:27:43.671Z"
  },
  "twoFa": false,
  "twoFaDate": {
    "$date": "2025-08-18T10:47:55.332Z"
  },
  "phone": "+523112341721",
  "banned": false,
  "firstName": "Yana",
  "id": "2008249926",
  "lastName": "Ustinova",
  "messageCount": 146,
  "personalChannel": "YGnYBwAB1UEbXRUk",
  "personalChannelDate": {
    "$date": "2025-04-25T14:32:44.513Z"
  },
  "lazyCheckDate": {
    "$date": "2025-08-18T21:38:01.073Z"
  },
  "automaticCheckDate": {
    "$date": "2025-08-19T10:27:43.671Z"
  },
  "username": "ustinova_local",
  "remainingTime": {
    "$date": "2025-08-19T09:17:31.520Z"
  },
  "historySpamBlocks": [
    {
      "spamBlockDate": {
        "$date": "2025-05-05T14:44:00.000Z"
      },
      "spamBlockDays": 1
    }
  ]
},
{
  "_id": {
    "$oid": "683b23e53770b19a277f47c0"
  },
  "accountId": "2014695697-prefix-elba",
  "dc1": "8712fdd9c4339a02365777cd71d1d633a7e0c33ddc7a62e3f55699dfe61c48fc6b130848263269f6869e16c74845fef7609e4ca368f5ab1f0602c47adda8dffe99dc53068bce62b19449514e098bd6f6e81030611059dca5f1aa21ba5fc5e9134853d4481a0f5efa09e98106a4008fd0327f339d89d6453400990ba9b37f8d09576f8c24ca9ee043243a08bef9915635a5532d78c043555a04d44e08032285008687ddd853217397c5cbec58735b32d47c9126dc5c29ba24d544031e318a28eda0dd0f9f53119c25369b95c35d65a1a4af0948af46b56efd6fc59e8cbb43c97f1ef890b1c1b2b1fad9a0c64fe6e8af0e348293447f2cc6e463eb9795e40f1ee0",
  "dcId": 1,
  "nextApiId": 2040,
  "dateUpdated": {
    "$date": "2025-08-19T10:27:23.220Z"
  },
  "twoFa": false,
  "twoFaDate": {
    "$date": "2025-08-18T00:42:30.014Z"
  },
  "phone": "+524271045498",
  "banned": false,
  "firstName": "Anton",
  "id": "2014695697",
  "lastName": "Larionov",
  "messageCount": 9,
  "username": "larionov_toxic",
  "personalChannel": "XKbgwubNxOuH4eBp",
  "personalChannelDate": {
    "$date": "2025-05-31T16:33:40.966Z"
  },
  "lazyCheckDate": {
    "$date": "2025-08-18T14:03:02.591Z"
  },
  "automaticCheckDate": {
    "$date": "2025-08-19T10:27:23.220Z"
  },
  "remainingTime": {
    "$date": "2025-08-09T12:45:47.707Z"
  }
},
{
  "_id": {
    "$oid": "685f074e3770b19a27ab21c1"
  },
  "accountId": "2027965511-prefix-female-gidrovell",
  "dc1": "605d2732df1216ac5bb62592aaa83da05ad256f38d7fc2b908de9c66bc39cc47e8c936774e229cd132aaa7a019ff35628241fd361fd6081383754b71f51d2a9317cc28bac0cdc34d6bf70f463cdab1da8cf60182223188eff51cd97082acb5378fcc6a4b832635b270045b9b9047001253f9b8b41c8d0cda13c3b69532fca2e43fd63e3f11033ab8fa10d727b35e56653ee3da3ddf7a1d47561d1bcbaef8c832ee01e30912245af53611786cd7f6efbd9b52f90eeb347a00a0391f26d5ee79dccbbe32da999feac869e7b32d0ca1fd83001d26a5b253069865b9764c510a81b7aed850e9492667674f5c1893c64fd2afd1b851402f31ed82c1de4eafc967f844",
  "dcId": 1,
  "nextApiId": 2040,
  "dateUpdated": {
    "$date": "2025-08-19T10:13:25.315Z"
  },
  "twoFa": false,
  "twoFaDate": {
    "$date": "2025-08-18T10:47:58.867Z"
  },
  "phone": "+527471223549",
  "banned": false,
  "firstName": "Svetlana",
  "id": "2027965511",
  "lastName": "Popova",
  "messageCount": 26,
  "username": "popova_puzzled",
  "personalChannelDate": {
    "$date": "2025-08-16T21:17:16.837Z"
  },
  "personalChannelError": "CHANNEL_NOT_FOUND",
  "lazyCheckDate": {
    "$date": "2025-08-18T19:04:16.739Z"
  },
  "automaticCheckDate": {
    "$date": "2025-08-19T10:13:25.315Z"
  },
  "remainingTime": {
    "$date": "2025-08-11T12:36:34.644Z"
  }
},
{
  "_id": {
    "$oid": "680b9474461801f59960199d"
  },
  "accountId": "2029138257-prefix-female-dmp1",
  "dc1": "0b6bc8bf495897faa59d9901abf57aaaf29716b49cee946a4f71019859b78b4d6ca215b4197ab644105d80008c5cdd23708466c99adb8aa0ae405b05a7dc6cbd74c5c47547dfa16f4fc782fbcac224079bf227274f0f3ffbaa746a9da6e32d54e20a0d7713a443c384404bdf6c74f1d80fe60871e07f20463e1a5b3ec4c8b526519b7957bc9ed30d0ee4808106b8922ae87a04082322ee7d164de44f53defad09ee18ad8dda09d4afc49d96d2d8be0cb5d0b7fd60a3acaa8b9a97be45cd85727c054cfa37827adc526c35c0893febd44ea0e587be9ae791c08390b609a0e7ce73036274c1d359b1d58a2d6d732a4a06cd1797516d405027c557eb4935db9a94a",
  "dcId": 1,
  "nextApiId": 2496,
  "dateUpdated": {
    "$date": "2025-08-19T10:36:28.987Z"
  },
  "twoFa": false,
  "twoFaDate": {
    "$date": "2025-08-18T10:48:01.023Z"
  },
  "phone": "+541140608813",
  "banned": false,
  "firstName": "Albina",
  "id": "2029138257",
  "lastName": "Grishina",
  "messageCount": 136,
  "personalChannel": "b6fgpklRsaSNMpAI",
  "personalChannelDate": {
    "$date": "2025-04-25T14:30:11.027Z"
  },
  "lazyCheckDate": {
    "$date": "2025-08-18T22:18:58.408Z"
  },
  "automaticCheckDate": {
    "$date": "2025-08-19T10:36:28.987Z"
  },
  "username": "grishina_xenophobic",
  "remainingTime": {
    "$date": "2025-08-19T08:19:42.448Z"
  },
  "historySpamBlocks": [
    {
      "spamBlockDate": {
        "$date": "2025-08-18T15:07:00.000Z"
      },
      "spamBlockDays": 1
    }
  ]
},
{
  "_id": {
    "$oid": "680b946b461801f5996016f7"
  },
  "accountId": "2032856343-prefix-female-dmp1",
  "dc1": "7e839f11797085c97919af135f44c6b652e2eba025dee58df5153ebaddf0d2f0c23919a7f7dd920c8faa8394ec598b6508f3877cdc248642616ff5928cebaf6b1be748f9d739fee0827a49ce0172dd9518fa2b9728f26ea249c8f5348faca2d5324329ecfa8aed9488456d27111239db591df8a38724f6f67ed1bcaed505975563fa02a248c37c896200009911ca1a467633bf7336a0718cc66a608715184c12421d3f18fd791e131e3c139392577d2bc6d911e9ba08e34d15da59b857b32851c1091f41cef97ef6aa6628e39d48293bf61d1227f506e22c547033c1ed0e53a42e0a3e17854b7fee4a422984e401177ca7a1dc734012f9ddfc72f78bd6335d0f",
  "dcId": 1,
  "nextApiId": 2496,
  "dateUpdated": {
    "$date": "2025-08-19T10:16:44.915Z"
  },
  "twoFa": false,
  "twoFaDate": {
    "$date": "2025-08-18T10:47:57.760Z"
  },
  "phone": "+525583650090",
  "banned": false,
  "firstName": "Alla",
  "id": "2032856343",
  "lastName": "Ustinova",
  "messageCount": 145,
  "personalChannel": "hjnQrGLBqj9NFCoi",
  "personalChannelDate": {
    "$date": "2025-04-25T14:34:16.965Z"
  },
  "lazyCheckDate": {
    "$date": "2025-08-18T14:05:06.183Z"
  },
  "automaticCheckDate": {
    "$date": "2025-08-19T10:16:44.915Z"
  },
  "username": "ustinova_mobile",
  "remainingTime": {
    "$date": "2025-08-19T10:08:28.629Z"
  }
},
{
  "_id": {
    "$oid": "685f074d3770b19a27ab218d"
  },
  "accountId": "2033349435-prefix-female-gidrovell",
  "dc1": "8faa047074e29922661c49aaeae4de3bf6571fc21efc13837058903cecfdabddc8bff8e958b7f43006c008e069df60fcb17b8e5c52d29c9b858f7f690b522d78d19131cc7b86918ff72a6a21821691f882a578a952a899ee37e7f3279249cda52a4a4cb4932a6173a0e5f4e4e50d5b687c6e33b43fcbe88651e93143c6693188c668df46db19489852fc392bb64c80f183e54432a7f2fef380d61a699aad68a04137b7e68bf9c2edd72f6e3aff50641f8c2fcb5555cd9a2408a5e31f5339c5b51542725a939bc5c8e0df4179079ec52b72e660b33d70203a006728be7b1b301ec5f27f8e5bffc22e83350f9be8622d1c9d53d6ef3ca94280aa08279e2a3e7dee",
  "dcId": 1,
  "nextApiId": 2040,
  "dateUpdated": {
    "$date": "2025-08-19T10:39:27.723Z"
  },
  "twoFa": false,
  "twoFaDate": {
    "$date": "2025-08-18T10:47:56.623Z"
  },
  "phone": "+529511641128",
  "banned": false,
  "firstName": "Valeria",
  "id": "2033349435",
  "lastName": "Kiseleva",
  "messageCount": 28,
  "username": "kiseleva_relaxed",
  "personalChannelDate": {
    "$date": "2025-08-16T21:17:17.010Z"
  },
  "personalChannelError": "CHANNEL_NOT_FOUND",
  "lazyCheckDate": {
    "$date": "2025-08-18T22:27:27.799Z"
  },
  "automaticCheckDate": {
    "$date": "2025-08-19T10:39:27.722Z"
  },
  "remainingTime": {
    "$date": "2025-08-06T14:11:52.346Z"
  }
},
{
  "_id": {
    "$oid": "685f07493770b19a27ab1fed"
  },
  "accountId": "2059339868-prefix-female-gidrovell",
  "dc1": "3de85356991cd9188bc519438d93925ca7999d70dfb286ef8fca6814c79bc628bb1638b9d5eb9058601cd3cdca4b87e4467d2c8f6be5031c52088109fadc3cc8f056d5d235c06acfa4bee9a2aa6828ff2a301bc00f08b794869b2b10c5dc190767462268a8f1e8d81e212a516d4b91a7baeb61c89ac41d5fb86baca219ffd3d3ffa59b90d97d8654ce0907aabe4094180b98d111f35645ca0874beb3ee07c32f862e5e1599efa4b26459bee6dc2b39f886ac6ec15ef1359984d76936849de68a7a0d8a28a5b16c7694e77912e6fae7c582b8d903541dc8a54b56e770ed84e30fc9b3016d8b4ff8a858256958af6386bf59412fac0f69445bd7e8d2e1f2615590",
  "dcId": 1,
  "nextApiId": 2040,
  "dateUpdated": {
    "$date": "2025-08-19T10:35:42.820Z"
  },
  "twoFa": false,
  "twoFaDate": {
    "$date": "2025-08-18T10:47:42.761Z"
  },
  "phone": "+542615787867",
  "banned": false,
  "firstName": "Tatiana",
  "id": "2059339868",
  "lastName": "Soboleva",
  "messageCount": 24,
  "username": "soboleva_liberal",
  "personalChannelDate": {
    "$date": "2025-08-16T21:17:24.367Z"
  },
  "personalChannelError": "CHANNEL_NOT_FOUND",
  "lazyCheckDate": {
    "$date": "2025-08-18T22:19:35.587Z"
  },
  "automaticCheckDate": {
    "$date": "2025-08-19T10:35:42.820Z"
  },
  "remainingTime": {
    "$date": "2025-08-05T18:30:09.416Z"
  },
  "historySpamBlocks": [
    {
      "spamBlockDate": {
        "$date": "2025-07-15T07:43:00.000Z"
      },
      "spamBlockDays": 7
    },
    {
      "spamBlockDate": {
        "$date": "2025-07-23T09:55:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-07-31T09:04:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-08-04T07:05:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-08-13T14:59:00.000Z"
      },
      "spamBlockDays": 7
    }
  ]
},
{
  "_id": {
    "$oid": "6810c3af461801f5990b969c"
  },
  "accountId": "2063871133-prefix-elba",
  "dc1": "7ec570ca5518fe9627881b4ceaff3f10587af6060db883eb5ceb83fbc0886e8797fa1e768994c668468bae9913b15738100036ab200bc2ff96bde1d05b81346cd8f0cf26dca13ddce694fcdc147d1ec1457c12b2ebea7210cab3c8fa47b35524b915008c249b337b893ec4503fe4c43c3e054cc8eaef50b042a0838f9e88a8c290a2433bc461afc23d9a54c2ddbf636b08d7534f42423d237fd2947d02cbece729abe7fc23466fba146bcda628fb63cadc5d3ab9f80d46eda2ddca9b7f2849ab98c1859862581d0fe9cfe15b76eced53c61078599997fb8e23e50c7d24066dd97884b611b305dc63c93ceb9b6413f6b5d99ba256cd2ef07c32379bd27f35134c",
  "dcId": 1,
  "nextApiId": 2040,
  "dateUpdated": {
    "$date": "2025-08-19T10:28:33.749Z"
  },
  "twoFa": false,
  "twoFaDate": {
    "$date": "2025-08-19T02:19:50.206Z"
  },
  "phone": "+573126794188",
  "banned": false,
  "firstName": "Georgiy",
  "id": "2063871133",
  "lastName": "Savin",
  "messageCount": 31,
  "username": "savin_awful",
  "personalChannel": "G7bpHiaXTrHovHKQ",
  "personalChannelDate": {
    "$date": "2025-04-29T13:13:31.237Z"
  },
  "lazyCheckDate": {
    "$date": "2025-08-18T16:14:19.380Z"
  },
  "automaticCheckDate": {
    "$date": "2025-08-19T10:28:33.749Z"
  },
  "remainingTime": {
    "$date": "2025-08-09T10:10:48.669Z"
  }
},
{
  "_id": {
    "$oid": "683b23ea3770b19a277f4945"
  },
  "accountId": "2082369735-prefix-elba",
  "dc1": "030a9922c20dbf56aeb34554f91808c22b0420f0b7bd68733a2dea9c748ca8ccbe6e60e269614b05647a5c9bb2c2f34e0ab4c68286a44bb3db29bf3367f69d632b56f93057a300fa4a8cb5377616bf20c637ad363874fcf24733b5b4c3dfc12d2c428c4308c70aece75e0b7b423921fac2a75741735de55a25ee4e528f95c83b59f02c36cbed59cc995bff9d662eb62591f798ad17730a524be70d976b9e4f76cc4f45267fb1e9a9f44a7c97ce2dd6e1c0a9e60efa377fa73908f99bcc3a0da6b7119834f7ef0b4cefd5d5cc7c28b5b1b758115f30007dd045b068ec922dae63745af0d7be7b2bc2a00977d6d41bf1ae3ca87506662933c65b59243128c2853f",
  "dcId": 1,
  "nextApiId": 2040,
  "dateUpdated": {
    "$date": "2025-08-19T10:25:27.709Z"
  },
  "twoFa": false,
  "twoFaDate": {
    "$date": "2025-08-18T00:42:10.829Z"
  },
  "phone": "+56936211449",
  "banned": false,
  "firstName": "Maksim",
  "id": "2082369735",
  "lastName": "Vikhrov",
  "messageCount": 4,
  "username": "vikhrov_modern",
  "personalChannel": "Rwcj0WskhMPGTukk",
  "personalChannelDate": {
    "$date": "2025-05-31T16:35:27.434Z"
  },
  "lazyCheckDate": {
    "$date": "2025-08-18T18:26:22.003Z"
  },
  "automaticCheckDate": {
    "$date": "2025-08-19T10:25:27.709Z"
  },
  "remainingTime": {
    "$date": "2025-08-11T11:03:55.858Z"
  }
},
{
  "_id": {
    "$oid": "680b946a461801f59960165a"
  },
  "accountId": "2102017338-prefix-female-dmp1",
  "dc1": "4bb2e963e98587c2cd86d091952defe6c728b22bc9e0691e8ace1c83adeac975b745a07ab3354a1695e98629f5969792fbf1d947dc008cb7064673822ad1a3c450a202d78c3b46b6ee5aa5054ea9ed52921c3263aa85327e20102fff2d473f83cde4944bf919c1535cc0cb7312549710bf728749a74c7d2189c120f50a3172c05007a1eb605883cc032574943817641a16781f3fa55ac682c3ff1495551c57136201c2263a38bfaac080453558949e0bea16a98cdf7f5246d5cb413667908077be08f232ace9fc66e869eac393599d618221c6afb4663f1942155a5390732a064cdca25471aca5ea795ecde70d051bd7a8fbc8fd1163f7dd6fc2c1f5ec13ac93",
  "dcId": 1,
  "nextApiId": 2040,
  "dateUpdated": {
    "$date": "2025-08-19T10:26:42.336Z"
  },
  "twoFa": false,
  "twoFaDate": {
    "$date": "2025-08-18T10:47:57.256Z"
  },
  "phone": "+573123859250",
  "banned": false,
  "firstName": "Liza",
  "id": "2102017338",
  "lastName": "Ustinova",
  "messageCount": 46,
  "personalChannel": "WJBt9VRuvZWFzlrJ",
  "personalChannelDate": {
    "$date": "2025-04-25T14:34:49.773Z"
  },
  "lazyCheckDate": {
    "$date": "2025-08-18T14:09:48.135Z"
  },
  "automaticCheckDate": {
    "$date": "2025-08-19T10:26:42.336Z"
  },
  "username": "ustinova_red",
  "remainingTime": {
    "$date": "2025-08-19T04:29:35.171Z"
  }
},
{
  "_id": {
    "$oid": "680b946b461801f59960170f"
  },
  "accountId": "2128382675-prefix-female-dmp1",
  "dc1": "4af7b3cc45826477ff1571402b234adcd1bb7092b23f34c641fa971ceb7ad689b656997c68f686ba1b337c6a9bb52a04f4f4c90344813ea5cfc381a049b5dc2b41fc3f00805f5300fadc1d0aa8c5111392dccd051d6a1e01c6e8214bb3af53027a54d46c788be6950d53d572e181cabf2540f4f819c15a6ee056892a58b4786bc05a2d079b235388ca1c92ddf48fbe8c3e6856a11353abb00b34c2c1fb244538428eb6c3b14433dfc59b1fc0a01974ebbde257f064855181d89c1eff8ab81d0799d3371bb9c1adfe036467dfb210fea3df6c5c0fb4f481b7a2c8b84f80d0577e76c332167f4940e4c31e4619085dc3f458f3ab074fea0299d6476afad18ce829",
  "dcId": 1,
  "nextApiId": 2496,
  "dateUpdated": {
    "$date": "2025-08-19T10:37:44.655Z"
  },
  "twoFa": false,
  "twoFaDate": {
    "$date": "2025-08-18T10:48:06.028Z"
  },
  "phone": "+542302458537",
  "banned": false,
  "firstName": "Mira",
  "id": "2128382675",
  "lastName": "Agapova",
  "messageCount": 139,
  "personalChannel": "XwAufo7ujXnfxahi",
  "personalChannelDate": {
    "$date": "2025-04-25T14:30:38.442Z"
  },
  "lazyCheckDate": {
    "$date": "2025-08-18T20:47:52.591Z"
  },
  "automaticCheckDate": {
    "$date": "2025-08-19T10:37:44.655Z"
  },
  "username": "agapova_yummy",
  "remainingTime": {
    "$date": "2025-08-19T09:06:25.294Z"
  },
  "historySpamBlocks": [
    {
      "spamBlockDate": {
        "$date": "2025-08-17T16:13:00.000Z"
      },
      "spamBlockDays": 1
    }
  ]
},
{
  "_id": {
    "$oid": "685f07463770b19a27ab1f38"
  },
  "accountId": "2138826450-prefix-female-gidrovell",
  "dc1": "22183c06e1a4424192ee090ca15ea9186c9b1bb4fe72f0aac4979375bcac74bc60635dedbd033e235d4a3fa7de58b1bdf7da6b92e0b5f08dcc9e3dac2eb5d027757f2557b793f3623f3de73e4cb7a5fd58e84406d37d7c10646f45f3eba1a97a90e97ae0ddb24a1385198287f3d8da6fd8d1d1bc85a60a036a19f68829c10b491f955843796a5abde6ef8f18c91db36392c7bf2534740ed22e7ac7960c52579e43aa7324cdebabdddf70d223dbd0ad3729fb382b34240448497647fb6bbf50072983363508ab3481d22d7d05b6c6535f408a82895dc151eb2505c805324bfacf323bfae4abc4e8938a8bde437108af980ccbb655427f417e9335791eaf025ad3",
  "dcId": 1,
  "nextApiId": 2040,
  "dateUpdated": {
    "$date": "2025-08-19T10:20:41.933Z"
  },
  "twoFa": false,
  "twoFaDate": {
    "$date": "2025-08-18T10:47:32.084Z"
  },
  "phone": "+543644136123",
  "banned": false,
  "firstName": "Svetlana",
  "id": "2138826450",
  "lastName": "Agapova",
  "messageCount": 31,
  "username": "agapova_inappropriate",
  "personalChannelDate": {
    "$date": "2025-08-16T21:17:21.094Z"
  },
  "personalChannelError": "CHANNEL_NOT_FOUND",
  "lazyCheckDate": {
    "$date": "2025-08-18T18:40:15.356Z"
  },
  "automaticCheckDate": {
    "$date": "2025-08-19T10:20:41.933Z"
  },
  "remainingTime": {
    "$date": "2025-08-11T12:08:33.359Z"
  }
},
{
  "_id": {
    "$oid": "685f074f3770b19a27ab21f6"
  },
  "accountId": "5001607811-prefix-female-gidrovell",
  "dc1": "2d4fe4c65204f68d7b9c321367f0a306e3a3a9c03964e7fe9b6682c3596fa9001bd9c786f98de39be663eeaef311542e48b3e678b22d07fc1e1bb3295d3f3d31f1fccbbb6d9710ca8218aa5d0787ec93bfb60f941222fd065dfc6214828074a53a81ac0624d5953ed6357cd94029d503d496887f122af8b99378f67bf12d973a17056eb8a0a11ab25d49d32fd3b8e08ceddc1a71c02a47e6081456aa1c5ffbd024636d02a264e7a8296cc395cbc3726ddd12cb5baa1935d514415c462810c14b0400fdae8c65b80b46f20e129faef8c1313a09b93a44735daf0341d3a7ec6265e6ba15c8cbb3ead1ece8543ef05b7bdfb295a7f8df741f42f98e53b1dea7d56c",
  "dcId": 1,
  "nextApiId": 2040,
  "dateUpdated": {
    "$date": "2025-08-19T10:36:28.760Z"
  },
  "twoFa": false,
  "twoFaDate": {
    "$date": "2025-08-18T10:48:00.182Z"
  },
  "phone": "+525624741764",
  "banned": false,
  "firstName": "Alisa",
  "id": "5001607811",
  "lastName": "Gorbunova",
  "messageCount": 27,
  "username": "gorbunova_hissing",
  "personalChannelDate": {
    "$date": "2025-08-16T21:17:20.211Z"
  },
  "personalChannelError": "CHANNEL_NOT_FOUND",
  "lazyCheckDate": {
    "$date": "2025-08-18T20:47:54.337Z"
  },
  "automaticCheckDate": {
    "$date": "2025-08-19T10:36:28.760Z"
  },
  "remainingTime": {
    "$date": "2025-08-11T12:06:50.712Z"
  }
},
{
  "_id": {
    "$oid": "680b946a461801f5996016d0"
  },
  "accountId": "5014411350-prefix-female-dmp1",
  "dc1": "57b7e41871df63d1eff3323ee4f569c9b75bbea3f439a0b9f1b285a0a77263c8f6167a66348f45a05396b2b93347021c0a64323751806cbd25f06b81f870fef7e2df273c4646c449b9be31e0b3ad578bc986a8ab85272b34ddf2f7c3fea9c62e77d2f2fceb4b6df0c10ab55d20de6f5239448603cb2698f68d04e82360614c53713e0ce5c13bea2f0a436c7b11eefd119f8490fb2318235808dd764f0f116d7c0d65db8716ca38155a0e63ca275151865058e41f9b3fc8d21c57bd4307238b0e608778770df1332a9764fc0c380f615ba114be6f00e7b60c9b3fba72d99f5f2ad20be82a4447eab3d3fb5d3697a0d622548affb10f7f17040fa493f598f5ad51",
  "dcId": 1,
  "nextApiId": 2040,
  "dateUpdated": {
    "$date": "2025-08-19T10:29:43.380Z"
  },
  "twoFa": false,
  "twoFaDate": {
    "$date": "2025-08-18T10:47:58.967Z"
  },
  "phone": "+522222050686",
  "banned": false,
  "firstName": "Elena",
  "id": "5014411350",
  "lastName": "Gorbunova",
  "messageCount": 138,
  "personalChannel": "LNqEb7oFhiNhxSTA",
  "personalChannelDate": {
    "$date": "2025-04-25T14:30:11.015Z"
  },
  "lazyCheckDate": {
    "$date": "2025-08-18T14:13:05.571Z"
  },
  "automaticCheckDate": {
    "$date": "2025-08-19T10:29:43.380Z"
  },
  "username": "gorbunova_troubled",
  "remainingTime": {
    "$date": "2025-08-19T06:24:52.235Z"
  },
  "historySpamBlocks": [
    {
      "spamBlockDate": {
        "$date": "2025-08-13T08:43:00.000Z"
      },
      "spamBlockDays": 1
    }
  ]
},
{
  "_id": {
    "$oid": "680b946f461801f599601817"
  },
  "accountId": "5024962639-prefix-female-dmp1",
  "dc1": "13d84909c0cfc6d4adc41b6b860cace63fb071bd7244afc5009dab551a650a052de5da1d2cc2252203069edb9c959cefc5ff55ec8d03542c45bb52ba69b7e49ec5d87f0d4ae6d130e399f30b55999d05774db9d3799270d8e0e4f73b4584de8c7b839b09ba62b60ac4172c25da16cbc49f8269f4358a2d7cc747fd4a4276983b606eda898248744ee80d66081a8edb1e2ae76f544e1db21d257870cfd93a251d611574f27207b605272f652393a34b781d5e39816ff49997435d3eee7edd2870f0e6c48ac33c9dcd2ab2d07beeb2ae7eedbe9ae44f78fdb430724b2e02ef6aedba2ddc80c3d3cbf6401f53cb4dcea1947ab64611736d67f5249f4d9bcc6fbec4",
  "dcId": 1,
  "nextApiId": 2496,
  "dateUpdated": {
    "$date": "2025-08-19T10:28:44.735Z"
  },
  "twoFa": false,
  "twoFaDate": {
    "$date": "2025-08-12T05:03:38.240Z"
  },
  "phone": "+543516774489",
  "banned": false,
  "firstName": "Sofia",
  "id": "5024962639",
  "lastName": "Koroleva",
  "messageCount": 137,
  "personalChannel": "uxfxibBzretSOl8W",
  "personalChannelDate": {
    "$date": "2025-04-25T14:33:30.225Z"
  },
  "lazyCheckDate": {
    "$date": "2025-08-18T22:11:34.677Z"
  },
  "automaticCheckDate": {
    "$date": "2025-08-19T10:28:44.735Z"
  },
  "username": "koroleva_vocational",
  "remainingTime": {
    "$date": "2025-08-19T11:01:31.543Z"
  }
},
{
  "_id": {
    "$oid": "685f07503770b19a27ab2258"
  },
  "accountId": "5054404218-prefix-female-gidrovell",
  "dc1": "711c99788490eadba982e4a6d8f258fffd1d4d24cf2b5fbc86ca3269935f78725baf52d78699f483bb7e7ff2977434fab5213598486489b108bbd8d371e129e5303041c4a1d1efffff26d89bb5a0dc662f8c0dcdf79981e2e784e17a84b600070806c98edca169647d93bee440dfd4fb209e842949e1ee051d8900585bebe8708092d1f9599100cdc74bc9ff2941190b8411aae8a4af64860d7827fe21ca171ca3894a4286aa6e53aa082d8f73f2942c577a99daf72687f13acaa74c9eef306fa8bb78bf94404dee8d2c3566aba0384a70c2ca31dd81f7209b6da480f8c2bf00218a228ad70b377331d2973f2f50d8b4301c3f168e249cf273196a8c114c64be",
  "dcId": 1,
  "nextApiId": 2040,
  "dateUpdated": {
    "$date": "2025-08-19T10:38:28.969Z"
  },
  "twoFa": false,
  "twoFaDate": {
    "$date": "2025-08-18T10:48:02.602Z"
  },
  "phone": "+529979777120",
  "banned": false,
  "firstName": "Valeria",
  "id": "5054404218",
  "lastName": "Agapova",
  "messageCount": 29,
  "username": "agapova_flaky",
  "personalChannelDate": {
    "$date": "2025-08-16T21:17:20.230Z"
  },
  "personalChannelError": "CHANNEL_NOT_FOUND",
  "lazyCheckDate": {
    "$date": "2025-08-18T18:45:29.054Z"
  },
  "automaticCheckDate": {
    "$date": "2025-08-19T10:38:28.969Z"
  },
  "remainingTime": {
    "$date": "2025-08-11T12:31:35.370Z"
  }
},
{
  "_id": {
    "$oid": "685f074d3770b19a27ab21b5"
  },
  "accountId": "5057980093-prefix-female-gidrovell",
  "dc1": "9cc345860a1020eef7437ecfc548f6706c556493587f34cf686ad1364a916731c3d2f154f6010efe1034f500be99609f63c02bd3c457892d99d1a2e49ceafaae6bf2c0f357713080f6590c43b6bc4e51309408a0f13175ca6d88798152619d07a7f299032d2e195124876a66f419a1d3b73b77e2683f520addc097e62618484f11be68196ed9763a52dc8e9b50192406309fd2aa791bf9711bedf557a0bb972916e52a74ac2dfcee282ab6dd9f19933f73c18a4f241d702bf7e5ecb9b16eab58ab30abf4ff7d92533f529ead917be59fd92689ada3f1f821571a86b8bdc037f9e18282a9936af97de03f079998e6fccb422ee19bdb1d001e7e02221028631c7a",
  "dcId": 1,
  "nextApiId": 2040,
  "dateUpdated": {
    "$date": "2025-08-19T10:27:25.337Z"
  },
  "twoFa": false,
  "twoFaDate": {
    "$date": "2025-08-18T10:47:58.188Z"
  },
  "phone": "+524811012125",
  "banned": false,
  "firstName": "Evgenia",
  "id": "5057980093",
  "lastName": "Tkacheva",
  "messageCount": 32,
  "username": "tkacheva_intense",
  "personalChannelDate": {
    "$date": "2025-08-16T21:17:20.211Z"
  },
  "personalChannelError": "CHANNEL_NOT_FOUND",
  "lazyCheckDate": {
    "$date": "2025-08-18T20:07:38.588Z"
  },
  "automaticCheckDate": {
    "$date": "2025-08-19T10:27:25.337Z"
  },
  "remainingTime": {
    "$date": "2025-08-11T12:05:31.334Z"
  }
},
{
  "_id": {
    "$oid": "683b23eb3770b19a277f4988"
  },
  "accountId": "5059742358-prefix-elba",
  "dc1": "9ee70970d79d806c2c362f212c2f1b2c3150f4b33e6ccf45ee6c3cf7d3e3c9a909ffc1f67ecac80c7d7c8f774dad9b28a0de000667fb0a11e8a0182ac30d09825b173bb518beed33717ada48af4019b7fb1663871e9923fff8b7172844fbd248dd4c7f70ff3f35afd5d521ea411753a7d231f8b2c9c145d6f96895290a29ed73f0cca969cc6421f44594d34a3cfb5d25f3602ca0beb8bb87d6de576ea607b40dc68c940dde11becc71a248a6d3817ef048f4fe48d234c14b0ec3ed7c5b13b38804a389c8e50cba7f557c79f74bb89f3ea01633604b44f5044f2c3fa93d88e09e48d8c32193f0962ccc439f81ff7b9dacba18782d5b1a543ee406f7ac4cfef131",
  "dcId": 1,
  "nextApiId": 2040,
  "dateUpdated": {
    "$date": "2025-08-19T10:16:17.732Z"
  },
  "twoFa": false,
  "twoFaDate": {
    "$date": "2025-08-18T00:42:12.812Z"
  },
  "phone": "+573053981986",
  "banned": false,
  "firstName": "Georgiy",
  "id": "5059742358",
  "lastName": "Andreev",
  "messageCount": 5,
  "username": "andreev_disastrous",
  "personalChannel": "Hhg7vVziSDHnMdBG",
  "personalChannelDate": {
    "$date": "2025-05-31T16:33:00.366Z"
  },
  "lazyCheckDate": {
    "$date": "2025-08-19T00:30:42.601Z"
  },
  "automaticCheckDate": {
    "$date": "2025-08-19T10:16:17.732Z"
  },
  "remainingTime": {
    "$date": "2025-08-09T10:17:53.235Z"
  }
},
{
  "_id": {
    "$oid": "680b9467461801f59960157f"
  },
  "accountId": "5075913153-prefix-female-dmp1",
  "dc1": "32407df8dfbca58edf015e8157fdbc4be8996c5de66a595eee4d3d89475efb24add8ad60d6e171e6d25fa30d6790e285617a27dea961d6bb1ab22c81e871e0e9f39102e280bbae7cd5c5b7008197b6bf07d471e101e4769c9e56c402371cc77b9d936567f67b6e2a551f221d5547919e8f0f7e125309b4191e833e9b1a8b479cab53c9ae2aa0e608093eab7a3cfa5cc1a5743a8d896d65dd9ce128d761cad37533e01f9c445648cee8a046484b72ed81e0f7900388b7776065b2259e6ccab8d75930c0d1b662e1a99316390908a2d5174e1d58fe191f1c53dec9e3023079dbcf5586dae933b737da1f5febd863c84b7e634c80c6a91f82984e8c8aab1d47b373",
  "dcId": 1,
  "nextApiId": 2040,
  "dateUpdated": {
    "$date": "2025-08-19T10:37:43.738Z"
  },
  "twoFa": false,
  "twoFaDate": {
    "$date": "2025-08-18T10:47:57.268Z"
  },
  "phone": "+573128945392",
  "banned": false,
  "firstName": "Nina",
  "id": "5075913153",
  "lastName": "Kalinina",
  "messageCount": 42,
  "personalChannel": "GbUsDPGHDh8XxNLK",
  "personalChannelDate": {
    "$date": "2025-04-25T14:32:13.614Z"
  },
  "lazyCheckDate": {
    "$date": "2025-08-18T22:03:35.702Z"
  },
  "automaticCheckDate": {
    "$date": "2025-08-19T10:37:43.738Z"
  },
  "username": "kalinina_only",
  "remainingTime": {
    "$date": "2025-08-19T02:55:29.159Z"
  }
},
{
  "_id": {
    "$oid": "680b946f461801f5996017cc"
  },
  "accountId": "5077886829-prefix-female-dmp1",
  "dc1": "989070de091611878285e8c35587955a51bafd91a7edc35d5790ff7158b0d198e1406fd8a468eb9fbc0cb667552bb0905730702e4d8d6c8bc061ef225405e601f81152baca7c0ee78e882d37cd817505a9e9305b7e35f4165be648bd1dd78acaffda39ff29f1199c50e5e6d1722090df616dbe56ce0090628d70bb8c433b9b40fe557b6e52febb4eb09635a3f31657e47853f5a5620ae1db846b9121d0e6f4606acc4e754143516abd1f6a2bf38013103b1b53a38192b4e29e76108e39c4aaa668738c9437a009f4040f34b9387e754b5f71068f407f1f2889bde1dcfa6c29b3ac668b8439182790a1f6a4e6ee18a9a3b0b3dd87094a4c16de02d91e24b0e074",
  "dcId": 1,
  "nextApiId": 2496,
  "dateUpdated": {
    "$date": "2025-08-19T10:35:44.475Z"
  },
  "twoFa": false,
  "twoFaDate": {
    "$date": "2025-08-18T10:48:05.940Z"
  },
  "phone": "+543825571006",
  "banned": false,
  "firstName": "Nina",
  "id": "5077886829",
  "lastName": "Chugunova",
  "messageCount": 45,
  "personalChannelDate": {
    "$date": "2025-05-03T20:18:36.262Z"
  },
  "lazyCheckDate": {
    "$date": "2025-08-18T16:28:29.562Z"
  },
  "automaticCheckDate": {
    "$date": "2025-08-19T10:35:44.475Z"
  },
  "username": "chugunova_quixotic",
  "remainingTime": {
    "$date": "2025-08-19T06:21:50.580Z"
  },
  "historySpamBlocks": [
    {
      "spamBlockDate": {
        "$date": "2025-05-03T14:26:00.000Z"
      },
      "spamBlockDays": 7
    },
    {
      "spamBlockDate": {
        "$date": "2025-05-01T09:03:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-05-05T08:12:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-06-26T14:12:00.000Z"
      },
      "spamBlockDays": 7
    },
    {
      "spamBlockDate": {
        "$date": "2025-07-31T09:54:00.000Z"
      },
      "spamBlockDays": 30
    },
    {
      "spamBlockDate": {
        "$date": "2025-09-08T08:20:00.000Z"
      },
      "spamBlockDays": 30
    },
    {
      "spamBlockDate": {
        "$date": "2025-08-11T18:03:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-08-14T18:26:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-08-21T18:46:00.000Z"
      },
      "spamBlockDays": 7
    },
    {
      "spamBlockDate": {
        "$date": "2025-08-20T05:35:00.000Z"
      },
      "spamBlockDays": 1
    }
  ],
  "personalChannel": "T1yUDnGqKhNqNFaE",
  "spamBlockReasons": [
    {
      "reason": "Ive never spammed or done anything sketchy, but the messaging restrictions are making it hard to communicate with non-mutual contacts for important business deals. My familys worried about the impact on my work, and Im stuck trying to figure out how to move forward with my projects. I just need to be able to message people for work.",
      "date": {
        "$date": "2025-08-19T05:58:03.228Z"
      }
    }
  ],
  "spamBlockDate": {
    "$date": "2025-08-20T05:35:00.000Z"
  },
  "spamBlockDays": 1,
  "spamBlockInitDate": {
    "$date": "2025-08-19T05:58:03.232Z"
  }
},
{
  "_id": {
    "$oid": "685f07473770b19a27ab1f7f"
  },
  "accountId": "5080103892-prefix-female-gidrovell",
  "dc1": "95754f69c61b82805705d73467e26d8d60cf3205a04ecb1e6064d07e165636eba07c553fb62a1f7d45be3714c2da5f4eb3152ced20b3061163bf70be67069b29aa9202aefa4c92120ba2ba9edd06e7bd463fb66cbb48d725f4e2e3051c218aa27634e5dfd13bcb0118dd86c8316899d146b6dbb5b3f0a2458221664ebcc3a584cf550e3fb8d78282bc2765fa56b1202b167e8fe299c0e3295ca9a833726ddac450f0834f989888a020f5bbf2da4252beda26739db8147d8fd8beea3195e2a3375d6fc425da7a8551f5fcf87024400eaec443dc162a456999c8b3d8fdb7c6782519cbc066d39e2b363bb0f9d4706a06af9937f4ea86f223f945413565893e8ae9",
  "dcId": 1,
  "nextApiId": 2040,
  "dateUpdated": {
    "$date": "2025-08-19T10:12:41.496Z"
  },
  "twoFa": false,
  "twoFaDate": {
    "$date": "2025-08-18T10:47:33.739Z"
  },
  "phone": "+541131337816",
  "banned": false,
  "firstName": "Svetlana",
  "id": "5080103892",
  "lastName": "Solovieva",
  "messageCount": 31,
  "username": "solovieva_protestant",
  "personalChannelDate": {
    "$date": "2025-08-16T21:17:21.309Z"
  },
  "personalChannelError": "CHANNEL_NOT_FOUND",
  "lazyCheckDate": {
    "$date": "2025-08-18T21:42:07.092Z"
  },
  "automaticCheckDate": {
    "$date": "2025-08-19T10:12:41.495Z"
  },
  "remainingTime": {
    "$date": "2025-08-05T14:04:34.617Z"
  }
},
{
  "_id": {
    "$oid": "683b23d33770b19a277f422a"
  },
  "accountId": "5120157647-prefix-elba",
  "dc5": "229b9ea33759e65b41be7790bce8cc939ba646a2777ff28ebd9cbfeeb1dbf6a694627a58760f31b01705efdc9ef2ebf96345273789a0eea9ae2a297813a52247755dede8b1bfecfd6b8588be8e6df8a64afe659266a93cc33438a6c16f0fb760c9e0d1d867a9de67a6d8458590d01020bf29acf8473a90723f4146fd7aedae6839be345ebb79f30620112a5e16c2286a96814a225d1951e45c9831726d8173f0cc30b76bf2e25bf29d54c9695bc240c59ae116be23aae276ff39f65692de5ef6de2db38f406dda28c92d1524ba1db4ac872eeddc8a3dedcc4f1e8ef76827e7c2155907fc57486d0b8cc9d5f56ee5d9733413d593285ec35df0f3c86f7b4acb38",
  "dcId": 5,
  "nextApiId": 2040,
  "dateUpdated": {
    "$date": "2025-08-19T10:28:19.699Z"
  },
  "twoFa": false,
  "twoFaDate": {
    "$date": "2025-08-18T00:42:29.401Z"
  },
  "phone": "+6281945777799",
  "banned": false,
  "firstName": "Maksim",
  "id": "5120157647",
  "lastName": "Osipov",
  "messageCount": 10,
  "username": "osipov_medieval",
  "personalChannel": "m4ggyuEflgSwuuNd",
  "personalChannelDate": {
    "$date": "2025-05-31T16:36:06.245Z"
  },
  "lazyCheckDate": {
    "$date": "2025-08-18T23:54:16.460Z"
  },
  "automaticCheckDate": {
    "$date": "2025-08-19T10:28:19.699Z"
  },
  "remainingTime": {
    "$date": "2025-08-09T13:08:28.511Z"
  }
},
{
  "_id": {
    "$oid": "680b9467461801f599601582"
  },
  "accountId": "5130966209-prefix-female-dmp1",
  "dc1": "83c6676e254062cdcfc4a86a2a8d629700e5cfa3020eea26aad9ebc1b7fb068a38a9d8b9d8ede5ffacf741ae9167fe104ab396827c84fc597d309fdf4f546f1139e9d55010944353de0494b10ecd8c15f28e1a522185c0c18a60b31f5096828165079ba5e2cbe73e475c0dfc439f5d4a97ed875eebb8368215b60d005e11e0547fefb3f69c3dc318a962d5d6c797f672f6d1fe234afb852a01969ec020d156b24ac214f6b71f513a6b860f082d7b3d4b0fec8af6390998616b59929b0ed9b2bf15b6d3607d231f7f9f59dd9e369895255aaa6c8b7831514ab1a39f8900795f2d91eb8509d57f5beefeb8203ad0d628fa9f19ba204b673ab733f42cdd810ee699",
  "dcId": 1,
  "nextApiId": 2040,
  "dateUpdated": {
    "$date": "2025-08-19T10:24:39.904Z"
  },
  "twoFa": false,
  "twoFaDate": {
    "$date": "2025-08-18T10:47:53.669Z"
  },
  "phone": "+573107936632",
  "banned": false,
  "firstName": "Maria",
  "id": "5130966209",
  "lastName": "Nesterova",
  "messageCount": 46,
  "personalChannel": "Qk8yjvatmooiPAUx",
  "personalChannelDate": {
    "$date": "2025-04-25T14:32:16.254Z"
  },
  "lazyCheckDate": {
    "$date": "2025-08-18T17:55:06.817Z"
  },
  "automaticCheckDate": {
    "$date": "2025-08-19T10:24:39.904Z"
  },
  "username": "nesterova_dying",
  "remainingTime": {
    "$date": "2025-08-19T02:32:38.748Z"
  }
},
{
  "_id": {
    "$oid": "680b946b461801f599601711"
  },
  "accountId": "5133409350-prefix-female-dmp1",
  "dc1": "57e1e0349b2b6342f1db5026d6856c228ef18fda32e3d77aee940344e6836e069a2ac740b9452f889e70c113731f63f330da49e0ca08981d459a4449fcd10106bab5af63a33f36b1c09d83e7b5dc86dfdd593608eaf5918848f3280d24ddde2218deaa6eb7ef55398461c62a5d99eedd6fcb2a3b95135db946bc647d946409118d9c6c9148a64a76f84f95a412182e68ba9d8084cac4c68eaf5611f992e858e52f2f8f037692e818af6e32dd31fb7f026f9164c53398bd42db39c48915923f45ac7fb81815ed90e67667004e3af75e82b75b0f8f55a6065c0f3efb271cd30458388e50453fe60aa8babba34a2ac8136ebb9507ff511df4e08128d6159259924d",
  "dcId": 1,
  "nextApiId": 2040,
  "dateUpdated": {
    "$date": "2025-08-19T10:18:42.668Z"
  },
  "twoFa": false,
  "twoFaDate": {
    "$date": "2025-08-18T10:48:07.871Z"
  },
  "phone": "+56936353637",
  "banned": false,
  "firstName": "Alisa",
  "id": "5133409350",
  "lastName": "Sinitsyna",
  "messageCount": 38,
  "personalChannel": "LjcPYqyRM1QIAIwq",
  "personalChannelDate": {
    "$date": "2025-04-25T14:30:24.509Z"
  },
  "lazyCheckDate": {
    "$date": "2025-08-19T00:20:59.329Z"
  },
  "automaticCheckDate": {
    "$date": "2025-08-19T10:18:42.668Z"
  },
  "username": "sinitsyna_vast",
  "historySpamBlocks": [
    {
      "spamBlockDate": "INFINITY",
      "spamBlockDays": 0
    },
    {
      "spamBlockDate": "INFINITY",
      "spamBlockDays": 0
    },
    {
      "spamBlockDate": {
        "$date": "2025-05-06T06:35:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-06-29T01:00:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-07-03T08:19:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-07-05T12:17:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-08-09T05:34:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-08-09T16:43:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-08-13T18:35:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-08-14T05:13:00.000Z"
      },
      "spamBlockDays": 1
    }
  ],
  "remainingTime": {
    "$date": "2025-08-19T00:28:06.462Z"
  }
},
{
  "_id": {
    "$oid": "680b9468461801f5996015c9"
  },
  "accountId": "5189066259-prefix-female-dmp1",
  "dc1": "369c6df3a18ccc250cab7df9c9e2a89df7cabb2a103a1c0759c56a13ab3f6bdd567d5d389d991f46bcdb760d2a1458461b2ea63e3c955533d3b0122db9bb7bfdaa7236d6b810c143c124bd1fea9afea5b1ff5c55c167ea378f1b54a5a2efc10db59b793f243bb9080235722242aa72eb843771c4fa8250877ba939748f0938061c1783e4aaded6fc1f81f4033b4307ae94b327672fca3b2e431ec896a01129d506b32173fa51a36b8cba69402a406814d9ad5dc9e360801f516e7793ce782b9c0aa27ace1cc1a417d093d1304a7d36c73ea019712cf52954eddb469609d3eaa9a7ca64488aa2137f7fab85b6d917638163cacdbe8082635a6e055fa852ed2cac",
  "dcId": 1,
  "nextApiId": 2040,
  "dateUpdated": {
    "$date": "2025-08-19T10:30:42.579Z"
  },
  "twoFa": false,
  "twoFaDate": {
    "$date": "2025-08-18T10:47:57.266Z"
  },
  "phone": "+529614422824",
  "banned": false,
  "firstName": "Arina",
  "id": "5189066259",
  "lastName": "Trofimova",
  "messageCount": 139,
  "personalChannel": "GZWQcjvLCMo3Zykc",
  "personalChannelDate": {
    "$date": "2025-04-25T14:34:44.725Z"
  },
  "lazyCheckDate": {
    "$date": "2025-08-18T21:42:10.137Z"
  },
  "automaticCheckDate": {
    "$date": "2025-08-19T10:30:42.579Z"
  },
  "username": "trofimova_obvious",
  "remainingTime": {
    "$date": "2025-08-19T07:07:57.683Z"
  }
},
{
  "_id": {
    "$oid": "680b946d461801f59960175f"
  },
  "accountId": "5208395302-prefix-female-dmp1",
  "dc1": "4a2a6c988a4f5c768c5295d47b1dd441673aacfe922912de7a1ceccc53c9120a2fb60299ddecf8d7b1a59b76ed18788211dc14ee7fc55d839b6468b61fa1cc5f70e6e7877314f6d329ad185068988f32ca7da25f3b9e8580afc5fead92597c0af111d6bd2a6a9004fbfd8e9eb25d1a0044f802b328899d3caa55f78bd85af77f7e8b4e5653e1c4679f1808f7d11b964c2a45548ef0fd9dd3fc3c6209295bac893fec86b175e389b3e532e3c5379e9cb9e05428e6e97b32c23fef5de281f1b47008fe655d6154793305600a1cb7decf11868679ab94b1a2d21c750bfb510030581de84bc48757f3b5de0584d035d96f9c61548ba4b22b05fb1bef620310dff140",
  "dcId": 1,
  "nextApiId": 2496,
  "dateUpdated": {
    "$date": "2025-08-19T10:16:44.933Z"
  },
  "twoFa": false,
  "twoFaDate": {
    "$date": "2025-08-18T10:48:03.121Z"
  },
  "phone": "+543496653951",
  "banned": false,
  "firstName": "Kira",
  "id": "5208395302",
  "lastName": "Makarova",
  "messageCount": 141,
  "personalChannel": "BopaBzAIJF7fvFWu",
  "personalChannelDate": {
    "$date": "2025-04-25T14:34:45.152Z"
  },
  "lazyCheckDate": {
    "$date": "2025-08-18T21:23:12.315Z"
  },
  "automaticCheckDate": {
    "$date": "2025-08-19T10:16:44.933Z"
  },
  "username": "makarova_causal",
  "remainingTime": {
    "$date": "2025-08-19T05:14:00.499Z"
  },
  "historySpamBlocks": [
    {
      "spamBlockDate": {
        "$date": "2025-07-03T13:39:00.000Z"
      },
      "spamBlockDays": 1
    }
  ]
},
{
  "_id": {
    "$oid": "680b9475461801f5996019c8"
  },
  "accountId": "5211559262-prefix-female-dmp1",
  "dc1": "7fa92f3370f19f953e28b5eb14e38eb2ee68c39ecaa847fd19dc4aed9f78c65dd6586a05c261de0b4287a87ef961c95ad494795efbd21ef5c4e6dcb9452dc2e4906f3716a1141cc148ac3fb367b43b1de604e59123966a15db1d080a6055e279a89cd39cdf175e21ddb71795cf5b703f718801b1d48e459e4bfcbb1e66485bda3e91d22affa7f9dce9edec5e9dd6264fd70fabbf4ae649f667f31a2ce9c00f495efa5d34b0c33b4c0d6d21b99c8843ac809c78153b4db851cd886214c85cf2f9d126da6473e7ce1e28c80641664f6ce9a14ebfdda96393d77a9074cd5e4fdfe9902b7f72061712d2252b3631667f60a87965d8b65a878c4a3cce3574e007d757",
  "dcId": 1,
  "nextApiId": 2496,
  "dateUpdated": {
    "$date": "2025-08-19T10:39:41.928Z"
  },
  "twoFa": false,
  "twoFaDate": {
    "$date": "2025-08-18T10:48:01.459Z"
  },
  "phone": "+543886679879",
  "banned": false,
  "firstName": "Elena",
  "id": "5211559262",
  "lastName": "Agapova",
  "messageCount": 134,
  "personalChannel": "pGTBtZDdUIC7misK",
  "personalChannelDate": {
    "$date": "2025-04-25T14:34:32.089Z"
  },
  "lazyCheckDate": {
    "$date": "2025-08-18T14:16:55.589Z"
  },
  "automaticCheckDate": {
    "$date": "2025-08-19T10:39:41.928Z"
  },
  "username": "agapova_cheap",
  "remainingTime": {
    "$date": "2025-08-19T04:40:31.404Z"
  },
  "historySpamBlocks": [
    {
      "spamBlockDate": {
        "$date": "2025-08-16T11:19:00.000Z"
      },
      "spamBlockDays": 1
    }
  ]
},
{
  "_id": {
    "$oid": "685f074d3770b19a27ab217f"
  },
  "accountId": "5216997253-prefix-female-gidrovell",
  "dc1": "b6110ec52c75b1ff92b72dc7cb89575bb1b8cfbe1bf8ec3dd069b5bc40c830546570ce8f5a5b9b9426efbad59c23b63621929bbf262ea740f5c365d052200225c157b4d2e6a615eac1505ebf2d654df25400b51092235b04da2029d2516f04c838935d7c0425b37697e328656d866b503fa7124ff7ef788bea5b519b0fdc49b2a7624e2262250a987fc211927af6fe994f83b2650475cec7bceb4a88262fdcf723468e98fb5d3b1e990b66b057ff8f56ad60d3fa8725355d8844daeb7aac473c99fbef40c31229f153b540ec7a419242528842a55da7f79241e9878fb9179d77630513f1fc80fe89b145520a81e01bc739ccaa5a8e1114d00806d5ac926cf8fd",
  "dcId": 1,
  "nextApiId": 2040,
  "dateUpdated": {
    "$date": "2025-08-19T10:35:19.455Z"
  },
  "twoFa": false,
  "twoFaDate": {
    "$date": "2025-08-18T10:47:56.625Z"
  },
  "phone": "+525527435523",
  "banned": false,
  "firstName": "Polina",
  "id": "5216997253",
  "lastName": "Novikova",
  "messageCount": 27,
  "username": "novikova_furious",
  "personalChannelDate": {
    "$date": "2025-08-16T21:17:17.220Z"
  },
  "personalChannelError": "CHANNEL_NOT_FOUND",
  "lazyCheckDate": {
    "$date": "2025-08-18T20:08:32.788Z"
  },
  "automaticCheckDate": {
    "$date": "2025-08-19T10:35:19.455Z"
  },
  "remainingTime": {
    "$date": "2025-08-11T12:31:59.798Z"
  }
},
{
  "_id": {
    "$oid": "683b23d53770b19a277f4304"
  },
  "accountId": "5222421732-prefix-elba",
  "dc5": "924590c70fb5d8d2089790c8d302aff2af5fd32e0adf4330c4ba97ad436c08422454dfd49bc32a05a1dd691d02148bca7499ab440b85cb0632838ef8d9fe0f74def74c35ac603bd4a609a95013fc67cdfe0f3fc44e378a7e9d1014127011cbef7b7f850030838e1534fd0ec68d086d97bfdf3a25b4752e9aedc3ef9881644c9fac9e59e00a55b8c579610fa0324b6e874278824737a673509cd1bb62c709fb89e667e139a8d8ae87573353265a90dab5c74fc1220ec85a72a2e0bf3e927bfe80ab72c8aa0e459bbaa19294aa6fbb037f9f72a7f921715318d9f514c360ae8ee3ddefa97a3597e5c99bbf3102aab3325a064042f479b7332413493f5a9badf177",
  "dcId": 5,
  "nextApiId": 2040,
  "dateUpdated": {
    "$date": "2025-08-19T10:27:26.326Z"
  },
  "twoFa": false,
  "twoFaDate": {
    "$date": "2025-08-18T00:42:26.795Z"
  },
  "phone": "+6285747040696",
  "banned": false,
  "firstName": "Artur",
  "id": "5222421732",
  "lastName": "Samoylov",
  "messageCount": 13,
  "username": "samoylov_defiant",
  "personalChannel": "AvApSVBCuLlSZZ0t",
  "personalChannelDate": {
    "$date": "2025-05-31T16:35:44.465Z"
  },
  "lazyCheckDate": {
    "$date": "2025-08-18T14:27:11.665Z"
  },
  "automaticCheckDate": {
    "$date": "2025-08-19T10:27:26.326Z"
  },
  "remainingTime": {
    "$date": "2025-08-11T11:03:28.995Z"
  }
},
{
  "_id": {
    "$oid": "683b23d93770b19a277f441a"
  },
  "accountId": "5226270102-prefix-elba",
  "dc5": "c24f98b940b01fef6fc5c172a58e56cc686484a492c046fc34471a4827b03802a7dcd70f39e2e189db88a7c5d3e0fed234743911d4cd1f74b85862a98355b20122a3fc4d7fd81d5577a59f5d7a8b415089bcca4b965e14a7617014f8238340442c2d234c6927e3cb30b96c54e06d13e8666e8e3a4295237a98c798aed12d2f0159744847378cb709527ad4c4382ed9376d67ddab02074efd0873c0b688d55dd6bc882f2f45048e42593d7e76fad9341a9af7de3ead751062fda01c84395e6c8f4c39213a8b49cca8f764c3077437e5e03292451708fee52bf5943742d8f09e60b93e373fd3f84b8290cdd4d0161b8af1e7427d044785f2648748d7f2568ab78e",
  "dcId": 5,
  "nextApiId": 2040,
  "dateUpdated": {
    "$date": "2025-08-19T10:36:23.367Z"
  },
  "twoFa": false,
  "twoFaDate": {
    "$date": "2025-08-18T00:42:31.470Z"
  },
  "phone": "+6281910746039",
  "banned": false,
  "firstName": "Petr",
  "id": "5226270102",
  "lastName": "Smirnov",
  "messageCount": 15,
  "username": "smirnov_delighted",
  "personalChannel": "hrpHeLm2RwQcKoMg",
  "personalChannelDate": {
    "$date": "2025-05-31T16:32:17.127Z"
  },
  "lazyCheckDate": {
    "$date": "2025-08-18T22:00:27.259Z"
  },
  "automaticCheckDate": {
    "$date": "2025-08-19T10:36:23.367Z"
  },
  "remainingTime": {
    "$date": "2025-08-11T21:02:34.796Z"
  }
},
{
  "_id": {
    "$oid": "680b946d461801f599601778"
  },
  "accountId": "5236103454-prefix-female-dmp1",
  "dc1": "10ca2502cc6d66d878a2091116f5ff6280f09b8ca1f984f496368c6cbd5bdb83c28d55a9df83d2a791c282c7f583a41347c823c9015dc4be87dd0a3991976f96c381fb41b05bf9c6e79342018f7f6473d0384927056a079108eba2c04d47ca7d88352cb42b1b428770180a0ce6420d5be3a2a8da142c3ee6f901910c264395ec5e3e9d19e2ecb2f697d4243c7c2afbca490191fee9a106292fde5bd133d82fdd62b9adadf4ca80b565e6211d41cfbb1a6e1aab961dd91ea2435cd5963362b8f13d8465d3107f29634755ec0a85824d8ca5d6cf16cf7398d893d5adef904ea1fa6db615cfff46cf1fa778c023e2804a9c16bd1471bd3e0c859a2ede556f586e29",
  "dcId": 1,
  "nextApiId": 2496,
  "dateUpdated": {
    "$date": "2025-08-19T10:26:43.585Z"
  },
  "twoFa": false,
  "twoFaDate": {
    "$date": "2025-08-18T10:48:03.131Z"
  },
  "phone": "+573042542441",
  "banned": false,
  "firstName": "Anfisa",
  "id": "5236103454",
  "lastName": "Efimova",
  "messageCount": 47,
  "personalChannel": "qRGlHPulz7yIySqn",
  "personalChannelDate": {
    "$date": "2025-04-25T14:34:06.853Z"
  },
  "lazyCheckDate": {
    "$date": "2025-08-18T21:22:07.486Z"
  },
  "automaticCheckDate": {
    "$date": "2025-08-19T10:26:43.585Z"
  },
  "username": "efimova_marked",
  "remainingTime": {
    "$date": "2025-08-19T02:40:25.179Z"
  }
},
{
  "_id": {
    "$oid": "683b23e63770b19a277f4830"
  },
  "accountId": "5238240324-prefix-elba",
  "dc1": "5ab55754e9e03e946cc3d3702fe964e45ccc93c39ad07a6358cc3d74aa1234bb7dc4569864d6fac3bc6ff6df2aea44ed3fb919d0cbcb14a45b3369c9c5320e1c7f30d07aacbd97ac317765c940106e0b920b1603672423d342f272f2a949f87b8e8f860235f67525b811df5fa36fde0d180b8099c4416d4bf96a4d7b7ac89a290f9fa8f72bb26b3564a855bda99ea8164f7e37569b151211949d6b205f385c6a79a4561aa762d2ddefde619735f61daa89e33c3baaba7dbf1f730001b5873489d80e23c5b2db7229924412da56280e182674e50df2f7d8abc1263c66f6500091e596c1cd23739b9b3253dfbe21c7df32996aec700d1fb653e787c5d2aca6747c",
  "dcId": 1,
  "nextApiId": 2040,
  "dateUpdated": {
    "$date": "2025-08-19T10:25:28.985Z"
  },
  "twoFa": false,
  "twoFaDate": {
    "$date": "2025-08-18T00:42:33.713Z"
  },
  "phone": "+524251331553",
  "banned": false,
  "firstName": "Dmitry",
  "id": "5238240324",
  "lastName": "Nechayev",
  "messageCount": 9,
  "username": "nechayev_intense",
  "personalChannel": "hjvgliSG7VubTqok",
  "personalChannelDate": {
    "$date": "2025-05-31T16:34:59.055Z"
  },
  "lazyCheckDate": {
    "$date": "2025-08-18T18:46:29.497Z"
  },
  "automaticCheckDate": {
    "$date": "2025-08-19T10:25:28.985Z"
  },
  "remainingTime": {
    "$date": "2025-08-09T12:17:39.007Z"
  }
},
{
  "_id": {
    "$oid": "680b946b461801f599601713"
  },
  "accountId": "5242999650-prefix-female-dmp1",
  "dc1": "0fd32efdc08702710d89add95768d09207357ea6572619702b241e0f2386e7df1cb78aa0c4b0d2abf32240d0e8461c1de37ddfa1b9e7c364cc6b6228fa85a6c0c54c205d947051c504cac37fe113d310df77cd47bd232005f296397e8827c33b9f5c1912766168fc9e67ed9c28ecf8f8f47df8500175cec569fc94c455b8a989428825ebabd3493dd1c320fdf194d37859c1ddab680528d9f6c6378d8da23bf9f5d4088908a78981d3d5885606b54c5b07489b1e8a89d35f3694cac372c2292aaa59a2897c3e578d1572adef6c1c68cab52c8a97f5a026f16cb5c2d2f0c98114010f9f871073a1af80cd1c04fa28047c2991c9a838d7da0d2aab2df7cce2278d",
  "dcId": 1,
  "nextApiId": 2496,
  "dateUpdated": {
    "$date": "2025-08-19T10:23:42.601Z"
  },
  "twoFa": false,
  "twoFaDate": {
    "$date": "2025-08-18T10:48:06.016Z"
  },
  "phone": "+5518997674463",
  "banned": false,
  "firstName": "Darina",
  "id": "5242999650",
  "lastName": "Nechayeva",
  "messageCount": 77,
  "personalChannel": "rpzWLDyomoH5mmnL",
  "personalChannelDate": {
    "$date": "2025-04-25T14:33:22.558Z"
  },
  "lazyCheckDate": {
    "$date": "2025-08-18T21:19:08.435Z"
  },
  "automaticCheckDate": {
    "$date": "2025-08-19T10:23:42.601Z"
  },
  "username": "nechayeva_tremendous",
  "remainingTime": {
    "$date": "2025-08-15T05:34:47.818Z"
  },
  "historySpamBlocks": [
    {
      "spamBlockDate": {
        "$date": "2025-04-29T14:21:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-05-09T05:43:00.000Z"
      },
      "spamBlockDays": 7
    },
    {
      "spamBlockDate": {
        "$date": "2025-05-07T05:07:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": "INFINITY",
      "spamBlockDays": 0
    },
    {
      "spamBlockDate": {
        "$date": "2025-06-28T11:42:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-07-02T09:57:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-07-03T06:08:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-07-04T04:21:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-07-09T04:55:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-08-15T16:06:00.000Z"
      },
      "spamBlockDays": 7
    },
    {
      "spamBlockDate": {
        "$date": "2025-08-10T06:59:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-08-13T11:10:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-08-22T03:59:00.000Z"
      },
      "spamBlockDays": 7
    }
  ],
  "spamBlockReasons": [
    {
      "reason": "Ive always followed the rules and never sent any unwanted messages. Right now, I can only message mutual contacts, but I need to talk to others to organize volunteer work and community events. Because of this, Im missing out on important opportunities, and deals are falling through.",
      "date": {
        "$date": "2025-08-15T04:17:59.570Z"
      }
    },
    {
      "reason": "Ive never violated Telegrams terms or sent unsolicited messages, yet Im restricted to messaging only mutual contacts. This limitation makes it impossible to reach important people, affecting my ability to communicate effectively. I hope this issue can be resolved promptly.",
      "date": {
        "$date": "2025-08-16T21:54:40.819Z"
      }
    }
  ],
  "spamBlockDate": {
    "$date": "2025-08-22T03:59:00.000Z"
  },
  "spamBlockDays": 7,
  "spamBlockInitDate": {
    "$date": "2025-08-15T04:17:59.574Z"
  }
},
{
  "_id": {
    "$oid": "683b23d53770b19a277f42f6"
  },
  "accountId": "5260000278-prefix-elba",
  "dc5": "695fc8fd116a7bd0e570d81de3819a09b7d9620c67cc232610f3ca79e7f5fa6f6d2d9f7c2d5ffa7148cbe2a4769de71ab1e914ba41db3209ca99489082a95192f90f39feef020f7905a990c0ec908bc6f53a95744871c28b7381334363a84d2e9497669f92c16349527c726dd95239a261bfa6eb293d1c0ad033c1efd85020599fd2511a476e3bb48db889255cce6d392fb4b476261fd904a8c8e97b191700579079b61bdb7b901cacb82cf6fb92ac19b3da5f339fba0be742f6c4b048291d5d0a3ae0b06b6539de523744cdc1504aee75dbd758bfb0662156d5c05c5024d260206c25f6440cd6ed30775192c49f108d3941e308a4bc4baf7c55e221f682d730",
  "dcId": 5,
  "nextApiId": 2040,
  "dateUpdated": {
    "$date": "2025-08-19T10:30:25.977Z"
  },
  "twoFa": false,
  "twoFaDate": {
    "$date": "2025-08-18T00:42:26.412Z"
  },
  "phone": "+628117179293",
  "banned": false,
  "firstName": "Vadim",
  "id": "5260000278",
  "lastName": "Trofimov",
  "messageCount": 13,
  "username": "trofimov_slippery",
  "personalChannel": "PM4tPnfprXtETKUF",
  "personalChannelDate": {
    "$date": "2025-05-31T16:32:14.896Z"
  },
  "lazyCheckDate": {
    "$date": "2025-08-18T22:52:05.058Z"
  },
  "automaticCheckDate": {
    "$date": "2025-08-19T10:30:25.977Z"
  },
  "remainingTime": {
    "$date": "2025-08-09T12:57:22.002Z"
  }
},
{
  "_id": {
    "$oid": "680b946f461801f5996017f7"
  },
  "accountId": "5263177399-prefix-female-dmp1",
  "dc1": "48981e4745075241e56da4c22abfda655f6138863f9f73b45dba9270d02d5dc50a9bb55e92ce1c63ae279a97d32a8ab7aff029889f2c0598f2363a57ae4159f575291c1a1fc918040d51c133dd65f7bae55ad7d45ded04b2b85999a5cd1d046d77d687765ee402bab223a9b0cc16858d6fef2c144f14a7855508986f7027cad99dc659abbbdfd932573a2b3556752617c8f4cb6076a0dc03b17e092d0beb611fda28dc604cdabae1e1aeb6454c2ff2d8915ae8086519d7e0dd9858ca4ca516200f0828e8efdb26303afd2ab802f44f3b255fa547df5e5ee485733ff61d3c4b480de8c49ee529f20bc47722ab9cd08a2431f9fea657caecd2da455656f42e7d23",
  "dcId": 1,
  "nextApiId": 2496,
  "dateUpdated": {
    "$date": "2025-08-19T10:16:43.773Z"
  },
  "twoFa": false,
  "twoFaDate": {
    "$date": "2025-08-18T10:48:07.874Z"
  },
  "phone": "+542216134034",
  "banned": false,
  "firstName": "Olga",
  "id": "5263177399",
  "lastName": "Bukina",
  "messageCount": 136,
  "personalChannel": "sbZVlhNg0EArVnfO",
  "personalChannelDate": {
    "$date": "2025-04-25T14:34:29.631Z"
  },
  "lazyCheckDate": {
    "$date": "2025-08-18T19:07:22.027Z"
  },
  "automaticCheckDate": {
    "$date": "2025-08-19T10:16:43.773Z"
  },
  "username": "bukina_vertical",
  "remainingTime": {
    "$date": "2025-08-19T01:49:53.061Z"
  },
  "historySpamBlocks": [
    {
      "spamBlockDate": {
        "$date": "2025-04-29T12:49:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-08-20T07:42:00.000Z"
      },
      "spamBlockDays": 1
    }
  ],
  "spamBlockReasons": [
    {
      "reason": "Ive always followed community guidelines, so Im confused about the messaging restrictions. Its affecting my work since I cant reach non-mutual contacts for urgent business deals. My projects are on hold until this is resolved.",
      "date": {
        "$date": "2025-08-19T07:49:16.257Z"
      }
    },
    {
      "reason": "Ive never sent spam or done anything suspicious on Telegram. Because of the messaging restrictions, people cant reach me. Id appreciate it if you could lift these restrictions so I can use the app normally again.",
      "date": {
        "$date": "2025-08-19T09:04:55.087Z"
      }
    }
  ],
  "spamBlockDate": {
    "$date": "2025-08-20T07:42:00.000Z"
  },
  "spamBlockDays": 1,
  "spamBlockInitDate": {
    "$date": "2025-08-19T07:49:16.262Z"
  }
},
{
  "_id": {
    "$oid": "680b946f461801f5996017dd"
  },
  "accountId": "5270568307-prefix-female-dmp1",
  "dc1": "5c6a0dc8d434afeb1240f21af520678dd2886d5a9dfb193558212c2686806e3da6562de4ff92e0c2656c7efdc35cbbf48784dc1cfe5562ba252b1ea2ce75dcf571c741b2f8ab4cc1d38b489fe338610a2e5147584c74868f6bb02ce21b9ffb7d200f92c6cbe24e5803827faeae58dafc455960c342e2f94673c634b4ec9a0d4578c74c2e6f11e5d28ea686f658d4f539c1711858fae5928020d0b2d5d958d1f1646dc80f44a5dd3ae313d9001fe90027d89e88608e08575e45cd67486b91de56977635372fc0ef523d064c215781a7c62af6cf45d8e24b659f682af8948876f9529bcc09e0623d8342f1409aeb8db7b2ddbe550e54960c09bd57b9f229b6fbd4",
  "dcId": 1,
  "nextApiId": 2496,
  "dateUpdated": {
    "$date": "2025-08-19T10:29:45.556Z"
  },
  "twoFa": false,
  "twoFaDate": {
    "$date": "2025-08-18T10:48:05.924Z"
  },
  "phone": "+523317753059",
  "banned": false,
  "firstName": "Arina",
  "id": "5270568307",
  "lastName": "Potapova",
  "messageCount": 143,
  "personalChannel": "ijePUD0FfZiRwSXN",
  "personalChannelDate": {
    "$date": "2025-04-25T14:32:46.630Z"
  },
  "lazyCheckDate": {
    "$date": "2025-08-18T18:33:36.314Z"
  },
  "automaticCheckDate": {
    "$date": "2025-08-19T10:29:45.556Z"
  },
  "username": "potapova_nice",
  "remainingTime": {
    "$date": "2025-08-19T06:24:37.906Z"
  }
},
{
  "_id": {
    "$oid": "680b946c461801f599601723"
  },
  "accountId": "5355305157-prefix-female-dmp1",
  "dc1": "ae673584027dc251524a7ad2d85f110be3a4be2a2749ff38626d1bcfe654a24647e38bd7b615e65bbbbfdabf16c6a40ead4f7670842bb89441a972c2d4e8899e62769031c7ee17675c5185ffa37ca60f65e223197f9da027fbff2c8bbacb0cfb4a974f945eb51a9b8bbf21bba3251078092d603516bc4ab47b427cb9eb659b84227970f63531ce8947e1f31ffe5159ce7f54eb38cdffa4811202493b3ccb74a5569f7ec08d37b7b26c8ec288c91c03a43ab5725fe73a55cfa3ffea52920e6d7ca46f21c4abcc3f656d9a0ab1f460019e3138f777874136795501b13d103b3230ffe2382f90c5f76254dea6868f7fc95c643e42c8c11f27b8753407d076e4f9cd",
  "dcId": 1,
  "nextApiId": 2496,
  "dateUpdated": {
    "$date": "2025-08-19T10:15:45.040Z"
  },
  "twoFa": false,
  "twoFaDate": {
    "$date": "2025-08-18T10:47:58.955Z"
  },
  "phone": "+543815104443",
  "banned": false,
  "firstName": "Inna",
  "id": "5355305157",
  "lastName": "Sinitsyna",
  "messageCount": 137,
  "personalChannel": "eNLMKe7YKScjTfEN",
  "personalChannelDate": {
    "$date": "2025-04-25T14:29:56.698Z"
  },
  "lazyCheckDate": {
    "$date": "2025-08-18T22:27:34.389Z"
  },
  "automaticCheckDate": {
    "$date": "2025-08-19T10:15:45.040Z"
  },
  "username": "sinitsyna_whole",
  "remainingTime": {
    "$date": "2025-08-19T11:01:54.312Z"
  },
  "historySpamBlocks": [
    {
      "spamBlockDate": {
        "$date": "2025-07-06T23:51:00.000Z"
      },
      "spamBlockDays": 1
    }
  ]
},
{
  "_id": {
    "$oid": "683b23db3770b19a277f44af"
  },
  "accountId": "5379562898-prefix-elba",
  "dc5": "7f6b0b0c35da2a6eccd67a231afa24d1f24e325d82ac759f1f2931b9ffa3bea0f7c6011ca3631ab2b440134d54c9312f4333861c8bd7dd5f4ecab114e211ee1518d448d92dce2df1d18581d2b9ba1803b20d1dc08bd0285b1ba354fad7ac4ba4757f915dfd8c54fe38e9268ea1793fec63126598bafca7ed868713eaf70a6c7ed487630083b6f5b6db09d24de782d5bf84aa9ffcb47fa8bcd24c4aeedab4b6e73b7b582ce031ae6c3c120a3ddfb97c07918b59dda5a7a3e81b580b90b1d277e36644cd77e6d57d1f42a205f3b2376d83310080bf90d7bbb40f5b6350c9525d51ed56d4e7e8b9532aaac284d386628d4911e9931ced8a07f4d365f5dd0bccf260",
  "dcId": 5,
  "nextApiId": 2040,
  "dateUpdated": {
    "$date": "2025-08-19T10:20:29.626Z"
  },
  "twoFa": false,
  "twoFaDate": {
    "$date": "2025-08-18T00:42:33.776Z"
  },
  "phone": "+6285654044922",
  "banned": false,
  "firstName": "Mikhail",
  "id": "5379562898",
  "lastName": "Simonov",
  "messageCount": 15,
  "username": "simonov_resonant",
  "personalChannel": "ckBxhTjZxQdUP7cR",
  "personalChannelDate": {
    "$date": "2025-05-31T16:33:34.998Z"
  },
  "lazyCheckDate": {
    "$date": "2025-08-19T00:36:50.520Z"
  },
  "automaticCheckDate": {
    "$date": "2025-08-19T10:20:29.626Z"
  },
  "remainingTime": {
    "$date": "2025-08-11T16:24:00.578Z"
  }
},
{
  "_id": {
    "$oid": "685f074b3770b19a27ab20c6"
  },
  "accountId": "5384931268-prefix-female-gidrovell",
  "dc1": "bde0be810c697ec91331771e616f423f46764666073d79e998b3184b25cdfa16e552570ecfc1c74de7195514f2cd3718f48e20cf692486373d636548e3b9cc7778027f9620c8636b6323fd0e126631a8f46dbc140310883a792d7e17995d6fe4dcb1fabecd2a4b6e26f17d514c3c7234220419496a25302460cc96ec9192527c2763db78ba73f7fbd3793ce2afa63cff53626455d1e7e935ecb5fcf69bce33e265b04b517e1182de4b167d6ec35959ed6a77e44f1785f2748b01c3a4b45dc2a78ba2dce80a23716c557a5498e5be0e01230dbfe1b5aebde7b9c6932a7eac991d8869f4a42c4921a87ab9e2fd9f241e3fd020b8186bcf7553b205a6295699589b",
  "dcId": 1,
  "nextApiId": 2040,
  "dateUpdated": {
    "$date": "2025-08-19T10:39:12.738Z"
  },
  "twoFa": false,
  "twoFaDate": {
    "$date": "2025-08-18T10:47:53.691Z"
  },
  "phone": "+541123980173",
  "banned": false,
  "firstName": "Marina",
  "id": "5384931268",
  "lastName": "Belova",
  "messageCount": 25,
  "username": "belova_wild",
  "personalChannelDate": {
    "$date": "2025-08-16T21:17:20.035Z"
  },
  "personalChannelError": "CHANNEL_NOT_FOUND",
  "lazyCheckDate": {
    "$date": "2025-08-18T21:33:10.329Z"
  },
  "automaticCheckDate": {
    "$date": "2025-08-19T10:39:12.738Z"
  },
  "remainingTime": {
    "$date": "2025-08-06T14:20:36.509Z"
  }
},
{
  "_id": {
    "$oid": "685f074c3770b19a27ab2102"
  },
  "accountId": "5411959068-prefix-female-gidrovell",
  "dc1": "4d3f2629f2116eacdc2c75d420f6f4ba0370ada3a7fcbdd49d6d070609584f39d9126f2a724975a4198556a2e24e4b876d77d2dabb2cefdd6a6c3bea552a85ebe7e6cd4340f3fb41e6101d449be22a37548ff3f74ff678eb029c12da7aafd5d91f11deb06c0bc74a8dba103f91143c02383ff29736b0184e230f015306c9340270c65d10aa1ee08c5c81f6ab1ddeb127862214fc1d188b72e437f9f5c2725eee2bd6350ba68ce46a12c9c6b312bfbd0a6ff5ba1a2c69574d900dde09c0d10aca5990c8d80635b1be51746cb5fa8422eb7370a89c22bcb747d067ba0e5329827d9311bf9975808aef087025c63b5563be5be078e20d135442714e471927f8bc09",
  "dcId": 1,
  "nextApiId": 2040,
  "dateUpdated": {
    "$date": "2025-08-19T10:21:25.309Z"
  },
  "twoFa": false,
  "twoFaDate": {
    "$date": "2025-08-18T10:47:55.642Z"
  },
  "phone": "+541132901669",
  "banned": false,
  "firstName": "Anna",
  "id": "5411959068",
  "lastName": "Kalinina",
  "messageCount": 28,
  "username": "kalinina_noble",
  "personalChannelDate": {
    "$date": "2025-08-16T21:17:17.743Z"
  },
  "personalChannelError": "CHANNEL_NOT_FOUND",
  "lazyCheckDate": {
    "$date": "2025-08-18T22:10:24.976Z"
  },
  "automaticCheckDate": {
    "$date": "2025-08-19T10:21:25.309Z"
  },
  "remainingTime": {
    "$date": "2025-08-11T12:07:46.603Z"
  }
},
{
  "_id": {
    "$oid": "680b9468461801f5996015c4"
  },
  "accountId": "5432052552-prefix-female-dmp1",
  "dc1": "5c743fc4c5c01006406e274888851e5a9ab419d7eaeade6587b00c6158883c8c8201031b843d8a582a379966c3962f46a088ee85db4b537384716e9148e4aa7e6e92b60225027ec2bf2c53f8b10209c704c9908a94ac5ecb7af32ac5f3245dab1f4c3d73ee535b8314940cf6bdb17fc5f97450a9a3e29de74ce3214bcf13a0004b11a21e3aee564f7df3bbb3c0754f844a656c7d6799a511af2c54a64002b845c7432d33ad12d38dd0a3ea38f5e5f88fa1a2379f127f67f2280330c40744aec9b712bbb5fe4a4bdee17cf6fdd838d23711a0780f3a635900d808e3f8dae18a139afa5fae3c3959ba2f4413c09cb9ac002e6d919624592b1dec9040c10e36a019",
  "dcId": 1,
  "nextApiId": 2040,
  "dateUpdated": {
    "$date": "2025-08-19T10:16:40.447Z"
  },
  "twoFa": false,
  "twoFaDate": {
    "$date": "2025-08-18T10:47:55.335Z"
  },
  "phone": "+573206061097",
  "banned": false,
  "firstName": "Irina",
  "id": "5432052552",
  "lastName": "Kalinina",
  "messageCount": 47,
  "personalChannel": "BNwQgZcISZ3wPhSw",
  "personalChannelDate": {
    "$date": "2025-04-25T14:31:15.018Z"
  },
  "lazyCheckDate": {
    "$date": "2025-08-18T14:46:36.506Z"
  },
  "automaticCheckDate": {
    "$date": "2025-08-19T10:16:40.447Z"
  },
  "username": "kalinina_involved",
  "remainingTime": {
    "$date": "2025-08-19T06:37:08.484Z"
  }
},
{
  "_id": {
    "$oid": "685f07473770b19a27ab1f58"
  },
  "accountId": "5432092960-prefix-female-gidrovell",
  "dc1": "7ad620baa17f42e22c911513f32bc6525f52bb5ec8a6f2a54303a16bdcc4027499b610368c2570ce0605610950dd41661a85838c85d0aa92a2caa67715392653fc7c9f8904742154375d2be5b77b2bd0fa125d6ab6cc94574bff4b082399e21dc7a46d988d7b0ffe8e723bc1138f2035ab419e557c7306f7ee0dcaf48629fcce163bbf051221a320d38d9893898a36e7093d1b960a8e96f5fa262ea6ebd7ae6573410ca003c5c04c2f731697a70528e54906b80d3252ece9d843ff5582209129ed09c2ffeb8576f5c851cbdbd984204dfdaf9cf3da4252a617906280e770a921a2341a54495ec16b1dbcf7c53624f352c7ad7b4f1722ddd991d2abb4e245d33c",
  "dcId": 1,
  "nextApiId": 2040,
  "dateUpdated": {
    "$date": "2025-08-19T10:27:41.480Z"
  },
  "twoFa": false,
  "twoFaDate": {
    "$date": "2025-08-18T10:47:33.741Z"
  },
  "phone": "+541134213446",
  "banned": false,
  "firstName": "Arina",
  "id": "5432092960",
  "lastName": "Shishkina",
  "messageCount": 26,
  "username": "shishkina_disturbing",
  "personalChannelDate": {
    "$date": "2025-08-16T21:17:20.422Z"
  },
  "personalChannelError": "CHANNEL_NOT_FOUND",
  "lazyCheckDate": {
    "$date": "2025-08-18T21:42:08.320Z"
  },
  "automaticCheckDate": {
    "$date": "2025-08-19T10:27:41.480Z"
  },
  "remainingTime": {
    "$date": "2025-08-07T16:35:41.636Z"
  }
},
{
  "_id": {
    "$oid": "680b9469461801f59960164c"
  },
  "accountId": "5448573746-prefix-female-dmp1",
  "dc1": "a1f48526d0f8edd328b76cef5edbba8d3d650b3ba85c5e392538942298209a355a900b30cb8bb0a0cdc776ea2734695a30109f2bd1e33e916b1c6235740f6806a5055738d590f87e30280ea9222839480fca281e0eec92888aaf6313f273b79e19c462950d650f8d66adb0de1cf5cf74497ff39a26b09c49f569f68012c7fd6068b78a7cb326139630cabaf3219b5b6d3f800ea5227c194c2e2e609f206dfa61e8a49ef7a28b82eaa849ec00fa7540c71f469f12c29f79d8a813ec7b8cb7ccfbf6c2dab1a609bb0e1d599d6d89e9991c2ac40c30260cd0b539224de1c4368074b47d2b2cb6a405591600c3b18fe3f24700a6d1ec03b2211ac6dcb4f89edae201",
  "dcId": 1,
  "nextApiId": 2040,
  "dateUpdated": {
    "$date": "2025-08-19T10:12:42.299Z"
  },
  "twoFa": false,
  "twoFaDate": {
    "$date": "2025-08-18T10:47:55.340Z"
  },
  "phone": "+524445348181",
  "banned": false,
  "firstName": "Arina",
  "id": "5448573746",
  "lastName": "Semenova",
  "messageCount": 128,
  "personalChannel": "aC4hrIFvpgFbREct",
  "personalChannelDate": {
    "$date": "2025-04-25T14:31:40.513Z"
  },
  "lazyCheckDate": {
    "$date": "2025-08-19T00:00:16.899Z"
  },
  "automaticCheckDate": {
    "$date": "2025-08-19T10:12:42.299Z"
  },
  "username": "semenova_only",
  "remainingTime": {
    "$date": "2025-08-17T09:28:50.836Z"
  },
  "historySpamBlocks": [
    {
      "spamBlockDate": {
        "$date": "2025-08-16T12:34:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-08-17T07:08:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-08-20T07:34:00.000Z"
      },
      "spamBlockDays": 3
    }
  ],
  "spamBlockDate": {
    "$date": "2025-08-20T07:34:00.000Z"
  },
  "spamBlockDays": 3,
  "spamBlockInitDate": {
    "$date": "2025-08-17T08:11:28.412Z"
  },
  "spamBlockReasons": [
    {
      "reason": "Ive always adhered to community guidelines, yet Im restricted to messaging only mutual contacts. This limitation is hindering my ability to communicate with key individuals outside this circle, causing my projects to suffer and potentially fail. I urge you to reconsider and lift this restriction, allowing me to reconnect with vital contacts.",
      "date": {
        "$date": "2025-08-17T14:01:11.272Z"
      }
    },
    {
      "reason": "Ive always used my account responsibly, never had any issues or violations. Now I cant message people unless we have mutual contacts, which means some important people are just unreachable. Itd be great if you could lift this restriction so I can actually talk to everyone I need to.",
      "date": {
        "$date": "2025-08-17T15:41:03.204Z"
      }
    },
    {
      "reason": "Ive always played by the rules and never spammed anyone, but the messaging restrictions are making it tough to connect with new business contacts. Its frustrating because Ive got time-sensitive deals and projects that rely on reaching these non-mutual contacts. I need to be able to message them directly to keep things moving.",
      "date": {
        "$date": "2025-08-18T10:58:14.045Z"
      }
    },
    {
      "reason": "Ive always followed community guidelines, yet Im restricted to messaging only mutual contacts. This limitation severely impacts my small business, making it impossible to reach essential customers and suppliers. I hope for a resolution that allows me to reconnect and continue my work.",
      "date": {
        "$date": "2025-08-18T19:27:24.850Z"
      }
    }
  ]
},
{
  "_id": {
    "$oid": "683b23e63770b19a277f4847"
  },
  "accountId": "5449905228-prefix-elba",
  "dc2": "b3fe2a8aed8eb310edc16a32266c67db060949b7d8eec5c23e2dd32971e2cbd3c72411bc4f2d2d0ab42154ad6188364a5067ce3b7e0f6c0c8f941bc46c4539534d1b2f5e05779b1708609f55d17dca562c672a75e2d70f0315e6f41c5c891e4637556568e38621fa098c60fce29f0ad92c982935a90ed94b4603730e64b2b115a640e588124aadcb5bb995586f62fb47bb3e31af41473a3126cfc3aa4fcf082f86740320fa1ba9c7495209fff94b06425074dfb7740e192a9393b86e552deef542d35538c092c4a61c0858eda17ece9855228f5d8b657197e3b51541f3359aa4b6cca70be7ec824bdb9553a57e5e3b4f86bcdbe3ededfa420c4b085c1a605a6d",
  "dcId": 2,
  "nextApiId": 2040,
  "dateUpdated": {
    "$date": "2025-08-19T10:32:25.221Z"
  },
  "twoFa": false,
  "twoFaDate": {
    "$date": "2025-08-18T00:42:33.712Z"
  },
  "phone": "+996700090929",
  "banned": false,
  "firstName": "Oleg",
  "id": "5449905228",
  "lastName": "Zyuzin",
  "messageCount": 24,
  "username": "zyuzin_ripe",
  "personalChannel": "dXeAC7fJIoNHvNqq",
  "personalChannelDate": {
    "$date": "2025-05-31T16:34:23.132Z"
  },
  "lazyCheckDate": {
    "$date": "2025-08-18T13:17:12.040Z"
  },
  "automaticCheckDate": {
    "$date": "2025-08-19T10:32:25.221Z"
  },
  "remainingTime": {
    "$date": "2025-08-11T16:23:46.774Z"
  }
},
{
  "_id": {
    "$oid": "685f07503770b19a27ab2249"
  },
  "accountId": "5498900425-prefix-female-gidrovell",
  "dc1": "3c7da9937e8c2c728dbbee4f1d33b6c72fc137416878cbd4f37b54bde93a05a16e20e0671be0664040bb8614b4c8ecad8ac6d2c0a371f738769cfc108cfe45c14e6cc9033e15781ad5477d493241dd7fc3f3864a3265e06ab0fffb09934fb4a65a5117a9197232f2f25b2cc38714374622fa4f6e132156842cca95a3abe06616b31941cd93c2d991d723dafa3d505c293a5591ed6690dc3457cbfba23f4afb45801e40b7eaea9428634dfefd0451062d4874f8afd134904ca5e1f346213f9a5d9063cc0f7454e2b9d545a2008de5707c52fc4c4c622e4f63e356f4cf3e3ad45fd7fcece9755b2389d6595b3e6b99c2e2de3097ffa9f8f05ac18427490b09734b",
  "dcId": 1,
  "nextApiId": 2040,
  "dateUpdated": {
    "$date": "2025-08-19T10:38:29.093Z"
  },
  "twoFa": false,
  "twoFaDate": {
    "$date": "2025-08-18T10:48:04.229Z"
  },
  "phone": "+525511412004",
  "banned": false,
  "firstName": "Anna",
  "id": "5498900425",
  "lastName": "Denisova",
  "messageCount": 27,
  "username": "denisova_adverse",
  "personalChannelDate": {
    "$date": "2025-08-16T21:17:23.370Z"
  },
  "personalChannelError": "CHANNEL_NOT_FOUND",
  "lazyCheckDate": {
    "$date": "2025-08-18T19:48:37.030Z"
  },
  "automaticCheckDate": {
    "$date": "2025-08-19T10:38:29.093Z"
  },
  "remainingTime": {
    "$date": "2025-08-01T11:16:48.139Z"
  }
},
{
  "_id": {
    "$oid": "683b23d63770b19a277f435d"
  },
  "accountId": "5536838095-prefix-elba",
  "dc5": "9e4717eb0a6f0fe7dd063fa2535792e63e3d3ae083349d7d9cd3dfef3c470225e4e60ccbbd8693ee70b7f44dcb342b671f296c727498a4175161fc150913cfd67babed6c6d30fa811a5af8bbf62caffac6a4c22895bf33f8d72b43d3b9897f049af9f3dc1d2c7f47f0664506c6d97de8b31dc39365d6e39990aff9243a56d5ea34bbc77424593d6b747cb99247798d6280e7d7cca1bc4401ca49e3a1607925a57862d38aa93e69f8880c4c4dda482e0fb9dba3c8dc51bd5e707cc2c1ce9c2f4874b822590366c9117acc9db7068ef136995c36041007263f628597a730516d2625b6ab4b5eb83f5169a488598cdfae06070377827457e92a6a0098ae79a08381",
  "dcId": 5,
  "nextApiId": 2040,
  "dateUpdated": {
    "$date": "2025-08-19T10:18:19.547Z"
  },
  "twoFa": false,
  "twoFaDate": {
    "$date": "2025-08-18T00:42:29.347Z"
  },
  "phone": "+6282217445988",
  "banned": false,
  "firstName": "Maksim",
  "id": "5536838095",
  "lastName": "Agapov",
  "messageCount": 14,
  "username": "agapov_disabled",
  "personalChannel": "deWvpyTHcOTYp8Oc",
  "personalChannelDate": {
    "$date": "2025-05-31T16:31:49.775Z"
  },
  "lazyCheckDate": {
    "$date": "2025-08-18T23:02:05.211Z"
  },
  "automaticCheckDate": {
    "$date": "2025-08-19T10:18:19.547Z"
  },
  "remainingTime": {
    "$date": "2025-08-11T16:26:23.673Z"
  }
},
{
  "_id": {
    "$oid": "685f074a3770b19a27ab201f"
  },
  "accountId": "5542424529-prefix-female-gidrovell",
  "dc1": "477d3a09ef27635479f4257300e46b72997a4e31d10dc450a5ad8e5a30734d086f3129a51d8a4218b1044b6918c0ebfa396429a15553e3d61f279f8deb63c7b8a01da0b5b3b3adc055dffdf035b350d244773a55ec947df2a93b5e76de34df0923138ca512089d36a2590eb50ac038ec43cd76a1c50b1160a08443ea046ecbe2de05973bba789c33da3ea8b84cdaefef2c053dafb8d718f03d20803d17c372d2d69d3bab554252ffe7a2996f888a7de6c2a8109c8f8e7d1350f06fd27d25ab00bcc3b1defaa74869713efc610260c42edcf470631832d3b2b3bfbbec7bdaca1c23d20ffcd3f80d781f6d5d66ad33698934bae89feefe34c8633055e6de60d861",
  "dcId": 1,
  "nextApiId": 2040,
  "dateUpdated": {
    "$date": "2025-08-19T10:29:42.847Z"
  },
  "twoFa": false,
  "twoFaDate": {
    "$date": "2025-08-18T10:47:40.799Z"
  },
  "phone": "+542993269232",
  "banned": false,
  "firstName": "Svetlana",
  "id": "5542424529",
  "lastName": "Terekhova",
  "messageCount": 27,
  "username": "terekhova_aggressive",
  "personalChannelDate": {
    "$date": "2025-08-16T21:17:23.713Z"
  },
  "personalChannelError": "CHANNEL_NOT_FOUND",
  "lazyCheckDate": {
    "$date": "2025-08-18T19:16:00.114Z"
  },
  "automaticCheckDate": {
    "$date": "2025-08-19T10:29:42.847Z"
  },
  "remainingTime": {
    "$date": "2025-08-05T13:55:53.295Z"
  }
},
{
  "_id": {
    "$oid": "680b9469461801f599601609"
  },
  "accountId": "5581759996-prefix-female-dmp1",
  "dc1": "51bb2181af499a860ea962d8f9e879ec5b31166d5213ee5bddcbbf0d46806b8093f042e97593573a4f560d05262fe9f7d7721cde3aaf86f2324a5fb5f41ad127d06adc19baef3fbbe7269656465e640f72a27ac3a2aa9985f9c3e824cb4fc9a908c604701a8b37454145d67fa1e2e939add3ca054505186bdbe43dfb6485a3a6a2b8556ca1f10d56dcbeb662b491ecf75d2372e31779a14cfc5995f5e9417697969e03c56ac9608f6f08c00fc736185a8f67a13e753db635f22501755237b44f191955683b73369338cdde3106c55e7c6c87afe857d562f2927e54a4e625c160a97889daae5945ab43ff6ea4edf1801a8d63537222b68ef19935e576780cbe97",
  "dcId": 1,
  "nextApiId": 2040,
  "dateUpdated": {
    "$date": "2025-08-19T10:39:42.592Z"
  },
  "twoFa": false,
  "twoFaDate": {
    "$date": "2025-08-18T10:47:55.428Z"
  },
  "phone": "+573108263080",
  "banned": false,
  "firstName": "Inna",
  "id": "5581759996",
  "lastName": "Mozharova",
  "messageCount": 46,
  "personalChannel": "CX7vYGiGsCZlPozv",
  "personalChannelDate": {
    "$date": "2025-04-25T14:34:01.169Z"
  },
  "lazyCheckDate": {
    "$date": "2025-08-18T22:47:53.557Z"
  },
  "automaticCheckDate": {
    "$date": "2025-08-19T10:39:42.592Z"
  },
  "username": "mozharova_lazy",
  "remainingTime": {
    "$date": "2025-08-19T11:12:03.872Z"
  },
  "historySpamBlocks": [
    {
      "spamBlockDate": "INFINITY",
      "spamBlockDays": 0
    }
  ]
},
{
  "_id": {
    "$oid": "680b946b461801f5996016dc"
  },
  "accountId": "5584746381-prefix-female-dmp1",
  "dc1": "629b2fcbec0c7365550055a128b3e2303795596753e4f86fd50cfd56aeb2c62622dbaf9699f75bbb9f6a165d54623e3afe4fea6d33dd8f2148a28b2c7faaa7da5a1fba45cc1ff8e9cb488338c9a1c0e7c9c4f680ad366603ae24bad4ebd1df55bda7ceddabafd8b2414579cdceaaf64b2df8c0e238acbe0f62e68f22c9f1bc43e79c4d57a6d182c465141d7cf802517aa07ee8d7be285b343fbb12b87956cf0f64334d65bbded2009830b60c111b90a9196805fe778828980cf2f0818bb7d89c501c2005c118f86d7a8db245f76a10fcf024ccea3233b12054e7367a516152f1382c20c2c6bdf54585cb8b7fee8ddffa7346531bc788ac865098957eb59f3965",
  "dcId": 1,
  "nextApiId": 2040,
  "dateUpdated": {
    "$date": "2025-08-19T10:16:43.141Z"
  },
  "twoFa": false,
  "twoFaDate": {
    "$date": "2025-08-18T10:47:57.253Z"
  },
  "phone": "+573013109047",
  "banned": false,
  "firstName": "Sofia",
  "id": "5584746381",
  "lastName": "Zhdanova",
  "messageCount": 46,
  "personalChannel": "aID2gyFLuqfKrOHW",
  "personalChannelDate": {
    "$date": "2025-04-25T14:32:28.793Z"
  },
  "lazyCheckDate": {
    "$date": "2025-08-19T00:17:57.471Z"
  },
  "automaticCheckDate": {
    "$date": "2025-08-19T10:16:43.141Z"
  },
  "username": "zhdanova_stuck",
  "remainingTime": {
    "$date": "2025-08-19T03:04:58.514Z"
  }
},
{
  "_id": {
    "$oid": "685f074f3770b19a27ab2201"
  },
  "accountId": "5587056178-prefix-female-gidrovell",
  "dc1": "389bb076b71a3a1f779924660c2c9bc502ae51441c0cbb870cb91f86dd18c7ecf48685a329853c62b418ce6397a2d6582ce826477f980ea53568269ad1f22110058a546c53508e2924f8df3a52fe9f98d1ef57d519086637209b3053848bd8c871de69dd3af7fc43b36ea8f366869c5f171562c81ac916392a9ad8efc39db37a50f474e2d5b00e6937019be14022bb62120a2a6234224630894074c886cf08c8db76749938b615bd3b132387db6c22128803e3f8bfae90a766381951b9009a23d6894a5e80e392959c356468f3b11d98ad2f5d50308aa5fd27adb6a280fb68883d050045097d03f0db626a51e8009a807096eea1c0640c152716d92ea382c817",
  "dcId": 1,
  "nextApiId": 2040,
  "dateUpdated": {
    "$date": "2025-08-19T10:30:23.786Z"
  },
  "twoFa": false,
  "twoFaDate": {
    "$date": "2025-08-18T10:48:02.606Z"
  },
  "phone": "+529612634068",
  "banned": false,
  "firstName": "Marina",
  "id": "5587056178",
  "lastName": "Erokhina",
  "messageCount": 30,
  "username": "erokhina_outdoor",
  "personalChannelDate": {
    "$date": "2025-08-16T21:17:20.027Z"
  },
  "personalChannelError": "CHANNEL_NOT_FOUND",
  "lazyCheckDate": {
    "$date": "2025-08-18T20:24:54.471Z"
  },
  "automaticCheckDate": {
    "$date": "2025-08-19T10:30:23.786Z"
  },
  "remainingTime": {
    "$date": "2025-08-11T12:31:51.077Z"
  }
},
{
  "_id": {
    "$oid": "680b946b461801f5996016e6"
  },
  "accountId": "5611886501-prefix-female-dmp1",
  "dc1": "5181a4d41d1bf2bcc137db50a27b01afa792517ff0ad3d419bce6e1ae11aae55500b3de7b077958ccf79d72c47701aa15a9b8a6156e639fdd7ee50cd113d5869ef7bb75be48eeaa09dba31ac6f00c1fac174e25edb75e6d3fb538ee6bd6e82bdc75467c85352cc97d7670a9cc4b5d09d1407f0c7289316f92991704c7db61d01ddb159623edf60b7c9a2ac2e24acac107df3d80c6fe6118484dd5afb071bd0a6e2f4db6b9faec873fdafb6dfa9913391e0e661dde16ed6cacf43747f07217264eeb78277eb98891ee3e0886f6d83d39ee1e4ad97985deb4efbf16330db0a8784e89f924f7d3c7418199a1c5975c70d4b1b93e26e938a6acf307dc11ddd3628cb",
  "dcId": 1,
  "nextApiId": 2040,
  "dateUpdated": {
    "$date": "2025-08-19T10:25:43.399Z"
  },
  "twoFa": false,
  "twoFaDate": {
    "$date": "2025-08-18T10:47:59.488Z"
  },
  "phone": "+573008934687",
  "banned": false,
  "firstName": "Anastasia",
  "id": "5611886501",
  "lastName": "Alekseeva",
  "messageCount": 45,
  "personalChannel": "NYtgGWhczcI8yNiA",
  "personalChannelDate": {
    "$date": "2025-04-25T14:33:16.038Z"
  },
  "lazyCheckDate": {
    "$date": "2025-08-18T19:58:25.887Z"
  },
  "automaticCheckDate": {
    "$date": "2025-08-19T10:25:43.399Z"
  },
  "username": "alekseeva_magnetic",
  "remainingTime": {
    "$date": "2025-08-19T09:52:03.516Z"
  },
  "historySpamBlocks": [
    {
      "spamBlockDate": {
        "$date": "2025-07-07T06:47:00.000Z"
      },
      "spamBlockDays": 1
    }
  ]
},
{
  "_id": {
    "$oid": "680b946d461801f599601787"
  },
  "accountId": "5624000062-prefix-female-dmp1",
  "dc1": "0a03b77137e29c05127fb104f32b1aefdf036eff611b27599443f2f1bba99af560a4c84aa51d7afca62f533f5069932b074653851fb9f6bb023d553b954106072597f543ebd4789e97e4cfe9889741269e3ff7c91d460c604df74c8c9ea2366831c85b3c9e13f0179d82d53bb2900c5d1b7211e678188fde129dd36396da97dd34c6d8c662e72d4a56771229ee2d4d2973220f802b9962be70619d1e1b2e967730986cc06b0d4b5566d894fda339fa2b5f745a5476d9966aa52f00da0b8814fba059b95b24f9998963d3bb631d62965011dffa7664b796c3a65e83cb2b48b3e465c10a78ae80fcf97b609675378c56a6913a61753440c534986b7db7af005ad8",
  "dcId": 1,
  "nextApiId": 2496,
  "dateUpdated": {
    "$date": "2025-08-19T10:14:43.867Z"
  },
  "twoFa": false,
  "twoFaDate": {
    "$date": "2025-08-18T10:48:03.135Z"
  },
  "phone": "+541140575268",
  "banned": false,
  "firstName": "Vera",
  "id": "5624000062",
  "lastName": "Shumilova",
  "messageCount": 135,
  "personalChannel": "ADCyrWIIUTp0MYGf",
  "personalChannelDate": {
    "$date": "2025-04-25T14:32:30.154Z"
  },
  "lazyCheckDate": {
    "$date": "2025-08-18T14:48:32.967Z"
  },
  "automaticCheckDate": {
    "$date": "2025-08-19T10:14:43.867Z"
  },
  "username": "shumilova_junior",
  "remainingTime": {
    "$date": "2025-08-19T05:56:43.941Z"
  }
},
{
  "_id": {
    "$oid": "685f074d3770b19a27ab2198"
  },
  "accountId": "5624016951-prefix-female-gidrovell",
  "dc1": "2c1a8fa20666c2155a3f36f88c8a0db14a51528139ebc5b7ebfae34eec57423e7d943f0eb085ecded2b7cfdb9e1521cd3352be678d239bddc8b2483666d9dd2cd05934a73eb4b4a15897420bbfa36b0abec56f502e599911cbccf5a3d7311d556981196c9f4abcddaacb1453729ce5b180c8a05a606baea1df3c08fd101049f19b111739052a84adf37b259ccd03d1cb689ede29822e2dc55e508f1b474873b5418d3868e26e57818ae44a7a520e119a8a13b98894533d6c59888f0bfed162c5f69220dfcd9322db4961be862302ca80d9d14e1bde5bd8073270eb6abfb7b1d5664fb03f6d555732068661fe40c66bed4ae337251407a101649660c2c07e6ea8",
  "dcId": 1,
  "nextApiId": 2040,
  "dateUpdated": {
    "$date": "2025-08-19T10:35:28.759Z"
  },
  "twoFa": false,
  "twoFaDate": {
    "$date": "2025-08-18T10:47:56.706Z"
  },
  "phone": "+525515691884",
  "banned": false,
  "firstName": "Alla",
  "id": "5624016951",
  "lastName": "Kazmina",
  "messageCount": 27,
  "username": "kazmina_xenial",
  "personalChannelDate": {
    "$date": "2025-08-16T21:17:20.277Z"
  },
  "personalChannelError": "CHANNEL_NOT_FOUND",
  "lazyCheckDate": {
    "$date": "2025-08-18T17:39:31.963Z"
  },
  "automaticCheckDate": {
    "$date": "2025-08-19T10:35:28.759Z"
  },
  "remainingTime": {
    "$date": "2025-08-06T14:14:22.511Z"
  }
},
{
  "_id": {
    "$oid": "685f074a3770b19a27ab2081"
  },
  "accountId": "5646999868-prefix-female-gidrovell",
  "dc1": "87b2eb4812f912abe4df48878e91f8391bcf530b344f7a0f063500e5e0ac77163ac5b8d94459288edb678553734db5088f273e72759bdeac15cebee3055867b3197921f94c18ca3de1fe612f800fe43352bbe35c66939cc66f2ddcf003a5c8e3445e4fa60da0ebc8d9314c0d257d7184d5603e32ba45e0d43de3da110c532c9ecd04810693b9737c75a4829d573d7fa968b957deb63d61ee9ed0ef6c73f9e3861df34d050697e940a8f27262f6d5a416ea05a3165bdf4b1edc662d01ed53a655e90831c25a175f5ef152bf616098e923314376fcfcdd8fa13f8ae4c9b13c3e95a053e7ecc45c5615914712f7bc4b5d78ebaac201a6981655677343c5a39a8b5a",
  "dcId": 1,
  "nextApiId": 2040,
  "dateUpdated": {
    "$date": "2025-08-19T10:21:43.410Z"
  },
  "twoFa": false,
  "twoFaDate": {
    "$date": "2025-08-18T10:47:51.229Z"
  },
  "phone": "+542478442650",
  "banned": false,
  "firstName": "Mira",
  "id": "5646999868",
  "lastName": "Glazunova",
  "messageCount": 28,
  "username": "glazunova_imperial",
  "personalChannelDate": {
    "$date": "2025-08-16T21:17:20.213Z"
  },
  "personalChannelError": "CHANNEL_NOT_FOUND",
  "lazyCheckDate": {
    "$date": "2025-08-18T19:22:06.750Z"
  },
  "automaticCheckDate": {
    "$date": "2025-08-19T10:21:43.410Z"
  },
  "remainingTime": {
    "$date": "2025-08-11T12:37:34.454Z"
  }
},
{
  "_id": {
    "$oid": "683b23d03770b19a277f4125"
  },
  "accountId": "5651133745-prefix-elba",
  "dc5": "2be15a387ca975b6f44aa862a9d9615c0c8f6f338a5a59658efeae5d3d70b4ca6e7f8b687228c01ba16b470d356cfc5fac5e8122171847d8ff37cdc4f083f4cc490a0b3167cdc96fcb5c39fdbe8734ad57c041ed80df3b76d8515763e7683c50d6e0b3703391d2a833264c6252aecb18843cd5c5ee4612d3200a36db58bc4af8083c031b16f61338e795b11da5670e23393c2e30f543c5367b683b20ee3b5ea9b048bf33ccac84893330b0f616e283de610a8fcb28d853b10fff08d2fd83217bb262cc299b62931ea8f70acee190dbac01ec038ba1f4e76d84e71b1eba37d0588d0c6b3b340d2295473c0ab4790438929518ef63caa5e9291a3c03116f2d6162",
  "dcId": 5,
  "nextApiId": 2040,
  "dateUpdated": {
    "$date": "2025-08-19T10:14:36.287Z"
  },
  "twoFa": false,
  "twoFaDate": {
    "$date": "2025-08-18T00:42:21.100Z"
  },
  "phone": "+639390038861",
  "banned": false,
  "firstName": "Mikhail",
  "id": "5651133745",
  "lastName": "Naumov",
  "messageCount": 4,
  "username": "naumov_complete",
  "personalChannel": "TLFPUYsDGthg2IBz",
  "personalChannelDate": {
    "$date": "2025-05-31T16:32:31.319Z"
  },
  "lazyCheckDate": {
    "$date": "2025-08-19T01:03:31.609Z"
  },
  "automaticCheckDate": {
    "$date": "2025-08-19T10:14:36.287Z"
  },
  "remainingTime": {
    "$date": "2025-08-09T10:21:22.882Z"
  }
},
{
  "_id": {
    "$oid": "685f07483770b19a27ab1f86"
  },
  "accountId": "5670360184-prefix-female-gidrovell",
  "dc1": "c6b8d21fb9c768734c7a9356c361069bf7bcba06d83a06cd23b66ff677b74a5cb28f1714b1df47aa5d216dd7896461595b2b65e3d242f6bfdc0e58c3bcceba38e6c03a88515ec898811cfe80b8a9b5ba591e5dbb00971014f09cb3d9799480596f61fd68b9c5ce117002f6c2dd8e616c29edf034b8745bc7ff9e44399bfefad772a87210df379dd0e3989d20884fab8452962b4f271c3a1e705950e8d46f75ae93b1eaf27eb6973c3ea155112f694d1be0091de48bdd435d92099912a8f8ae7a846982b3a6bbaa4fc1b164aac1eb63375562817a674a6ef3738bb936a4c2b359d5da249b4c27793b389be35fd2ca40f89f64cf0549d4bd00a4a551ac98125841",
  "dcId": 1,
  "nextApiId": 2040,
  "dateUpdated": {
    "$date": "2025-08-19T10:19:42.656Z"
  },
  "twoFa": false,
  "twoFaDate": {
    "$date": "2025-08-18T10:47:37.266Z"
  },
  "phone": "+542664989064",
  "banned": false,
  "firstName": "Evgenia",
  "id": "5670360184",
  "lastName": "Larionova",
  "messageCount": 33,
  "username": "larionova_shaky",
  "personalChannelDate": {
    "$date": "2025-08-16T21:17:22.177Z"
  },
  "personalChannelError": "CHANNEL_NOT_FOUND",
  "lazyCheckDate": {
    "$date": "2025-08-18T23:40:23.153Z"
  },
  "automaticCheckDate": {
    "$date": "2025-08-19T10:19:42.656Z"
  },
  "remainingTime": {
    "$date": "2025-08-06T14:20:35.732Z"
  }
},
{
  "_id": {
    "$oid": "683b23d63770b19a277f433d"
  },
  "accountId": "5674639482-prefix-elba",
  "dc5": "03b991048243e0eb59ff8c3b0e75685233d05c2087cf939e01b2cd9632a789a246fb181d5ad88f554202c16da600cbb26a14d278d8b68aa3f44e70aea43efe278b8ce2476b7a6c465b8d21bdeeb24b9e43de7ec0c65a65ae2904502d80ca9c4308b6ec547f145cb0e04cb2fbec9e7b09f20b7ebbf55d24777605bd4004c277e7d6ff4384a6b26b6d67d12f2a4b07405bf7ee66e76c35a73c128267364091a0f0ac4fe28bbad3e0002b30377b9bb42b514e2f8b1e818cb0b1655bc5879f835831d3324890ac33afbc7fc0f3a9a8b1528902258cd859b494f9f88225dbcd1579d3d171efe696fc48ac15673760a61193912c3b61f3ecec298a2e8cd83c81754cf8",
  "dcId": 5,
  "nextApiId": 2040,
  "dateUpdated": {
    "$date": "2025-08-19T10:26:24.048Z"
  },
  "twoFa": false,
  "twoFaDate": {
    "$date": "2025-08-18T00:42:30.060Z"
  },
  "phone": "+6282188799417",
  "banned": false,
  "firstName": "Stepan",
  "id": "5674639482",
  "lastName": "Efimov",
  "messageCount": 12,
  "username": "efimov_dreadful",
  "personalChannel": "oKcY8UPqDWZVbaiK",
  "personalChannelDate": {
    "$date": "2025-05-31T16:34:27.780Z"
  },
  "lazyCheckDate": {
    "$date": "2025-08-18T22:42:05.293Z"
  },
  "automaticCheckDate": {
    "$date": "2025-08-19T10:26:24.048Z"
  },
  "remainingTime": {
    "$date": "2025-08-11T11:06:02.034Z"
  }
},
{
  "_id": {
    "$oid": "685f07483770b19a27ab1f84"
  },
  "accountId": "5681312820-prefix-female-gidrovell",
  "dc1": "792e5d6416f4d7356ea7a898cabb652f33f06a4bb72875e3c493d9a0b3e308766073f1e8fe6076ac428bb520273559c016a5caea6d216f90f690038542d80ff1811659f5c7145f99bd893cd8f0b6efd860e66e986b7cc212280f90522ba21917b69a863ec7035cad16f5a1dd7780ca1d4a81df4bd9e514fe6754d6aa347c46b9a0cba09df76356a5e7317c35bb3522799f44b5992ecbe0c17d04ec2467acf0888fb7309b20f8f1701fddcf74e20392c7d9e15ca7a4d09f5e1313bcb4141f387a32f27569e1f506bf26f13993f24173d523032c18b81ae4acb30b73b753cf0daad551d30045bee8e17ed1c4f10ef1e5f1bccae6b91d2b75f7edddeb90dd068582",
  "dcId": 1,
  "nextApiId": 2040,
  "dateUpdated": {
    "$date": "2025-08-19T10:24:41.499Z"
  },
  "twoFa": false,
  "twoFaDate": {
    "$date": "2025-08-18T10:47:37.284Z"
  },
  "phone": "+543549528010",
  "banned": false,
  "firstName": "Svetlana",
  "id": "5681312820",
  "lastName": "Chirkova",
  "messageCount": 29,
  "username": "chirkova_fascinating",
  "personalChannelDate": {
    "$date": "2025-08-16T21:17:23.717Z"
  },
  "personalChannelError": "CHANNEL_NOT_FOUND",
  "lazyCheckDate": {
    "$date": "2025-08-18T21:16:06.136Z"
  },
  "automaticCheckDate": {
    "$date": "2025-08-19T10:24:41.499Z"
  },
  "remainingTime": {
    "$date": "2025-08-11T12:27:07.909Z"
  },
  "historySpamBlocks": [
    {
      "spamBlockDate": {
        "$date": "2025-08-01T06:46:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-08-04T09:29:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-08-13T12:19:00.000Z"
      },
      "spamBlockDays": 7
    }
  ]
},
{
  "_id": {
    "$oid": "685f074e3770b19a27ab21f2"
  },
  "accountId": "5687577937-prefix-female-gidrovell",
  "dc1": "c69fab75f872ab8550bea5700930028439a131c426916ef7c558c43513ec736692c4228d2c1c673518cd7f2cdd3c577690252eed54d25f7a1a48fa252930e6ad38a8023e14603db765ec837f74674bbb2371f54ab1c6b9ec4be0cc09aa5d60481eb790979006233140c895ed666d3aaf632b5635eb4794bfa1133c179d9ef090ae14a747f9fa56e9a2b7fda10e4c54c88a64d417f87570db0d0a53f6c18a0576691ab88f25e978d7516a37ae6db0b8e06636cc732ac7a87a0bc41aefa47f0dac27b67b3c7c71807e13abb1fbb2ba8b69262131429c5dce9afbe37f5e46f1331f3d5b08dbfb851e7c184085200954a4c73e1145583a824984276563be690c43f7",
  "dcId": 1,
  "nextApiId": 2040,
  "dateUpdated": {
    "$date": "2025-08-19T10:28:28.760Z"
  },
  "twoFa": false,
  "twoFaDate": {
    "$date": "2025-08-18T10:48:01.443Z"
  },
  "phone": "+529995511667",
  "banned": false,
  "firstName": "Lubov",
  "id": "5687577937",
  "lastName": "Nechayeva",
  "messageCount": 28,
  "username": "nechayeva_robust",
  "personalChannelDate": {
    "$date": "2025-08-16T21:17:17.218Z"
  },
  "personalChannelError": "CHANNEL_NOT_FOUND",
  "lazyCheckDate": {
    "$date": "2025-08-18T20:48:55.592Z"
  },
  "automaticCheckDate": {
    "$date": "2025-08-19T10:28:28.760Z"
  },
  "remainingTime": {
    "$date": "2025-08-06T14:12:38.728Z"
  }
},
{
  "_id": {
    "$oid": "680b9472461801f5996018c6"
  },
  "accountId": "5694622413-prefix-female-dmp1",
  "dc1": "483943a0c50f49cdb7923139f57e9ce0a4d5cbbefd935cfda227fa09078695f74e527801b64206c161f2eb55cde618d719c4ada48f6ed0cc555f9c8d7baf773883bd18acccbc81c8b5f31c3a757ebf49879ecf6a671e0dda4b94810cca5da7cec2c2100f79a3c853dc22ebb2e64eb9a4b9e57d677496fffc8c7e291e590a5d5809101f8825d9dc335b4fd8b7cd20df689dbc230fd1d42769e083f4a659c74373955b1ea539b9a899ebbc836bcc3a75b24546738575e1c696aec20d7669b207cb8e60e605ff07068915cf237e354d9d79826e475678fdffcec74dceeeba715373dd3c8b0e5e01ecafe4a014427e4ea9d87e7b46380c03eacb72d5b40058bfec21",
  "dcId": 1,
  "nextApiId": 2496,
  "dateUpdated": {
    "$date": "2025-08-19T10:36:44.474Z"
  },
  "twoFa": false,
  "twoFaDate": {
    "$date": "2025-08-18T10:47:58.906Z"
  },
  "phone": "+542267444641",
  "banned": false,
  "firstName": "Yana",
  "id": "5694622413",
  "lastName": "Dorofeeva",
  "messageCount": 131,
  "personalChannel": "LuQJtbyfprTVC5PJ",
  "personalChannelDate": {
    "$date": "2025-04-25T14:29:58.241Z"
  },
  "lazyCheckDate": {
    "$date": "2025-08-18T20:04:21.870Z"
  },
  "automaticCheckDate": {
    "$date": "2025-08-19T10:36:44.474Z"
  },
  "username": "dorofeeva_correct",
  "remainingTime": {
    "$date": "2025-08-19T05:04:34.333Z"
  },
  "historySpamBlocks": [
    {
      "spamBlockDate": "INFINITY",
      "spamBlockDays": 0
    }
  ]
},
{
  "_id": {
    "$oid": "680b946d461801f59960178e"
  },
  "accountId": "5701995611-prefix-female-dmp1",
  "dc1": "0d026b4010b8d28a3b11a719b19b6f7dc39f9e3478901c654b55afac30be2f7e64b898095ccd8b8b7c54a0387b345a8531a068651280c4aeefab4e2ee9c441cbb245e8855beaa8fcf063fc601bf8de19d37a3daedf3c40ba3c6c4788c01568af3090b214e63490d387dddaf29ce7b1fe72455952806f0169d7d26f1a9f2c62ed030b4e0eb40a3927caba69fbfae85498ea653e5892b1d77523b3505310ce91549718c1634c7c66335b99489ab5b639ffc0a438d0adaacec96621e8b0bfe27c72b9b3c0fb7a6e2ccee2811f200392c8adfff808f76cd41ebaf8b5315a63a1607f4a50fef026f47ac039f41d22249e0afac2967c678d2703ef54bcdbef980cde0f",
  "dcId": 1,
  "nextApiId": 2496,
  "dateUpdated": {
    "$date": "2025-08-19T10:22:43.827Z"
  },
  "twoFa": false,
  "twoFaDate": {
    "$date": "2025-08-18T10:48:03.132Z"
  },
  "phone": "+573229498333",
  "banned": false,
  "firstName": "Rita",
  "id": "5701995611",
  "lastName": "Shishkina",
  "messageCount": 42,
  "personalChannel": "OrEckqMvUccmgyn7",
  "personalChannelDate": {
    "$date": "2025-04-25T14:35:16.157Z"
  },
  "lazyCheckDate": {
    "$date": "2025-08-18T18:41:33.898Z"
  },
  "automaticCheckDate": {
    "$date": "2025-08-19T10:22:43.827Z"
  },
  "username": "shishkina_blushing",
  "remainingTime": {
    "$date": "2025-08-19T10:42:56.373Z"
  },
  "historySpamBlocks": [
    {
      "spamBlockDate": {
        "$date": "2025-07-02T11:07:00.000Z"
      },
      "spamBlockDays": 7
    },
    {
      "spamBlockDate": {
        "$date": "2025-07-04T12:13:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-07-08T03:19:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-08-17T06:01:00.000Z"
      },
      "spamBlockDays": 7
    },
    {
      "spamBlockDate": {
        "$date": "2025-08-12T07:46:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-08-15T05:33:00.000Z"
      },
      "spamBlockDays": 1
    }
  ]
},
{
  "_id": {
    "$oid": "680b9474461801f5996019bc"
  },
  "accountId": "5703036853-prefix-female-dmp1",
  "dc1": "ad182f47634e909f67f2c884e128caecd556e9528f5b29ad43f0854782057bb602379cc43a6a099a0f855c35e8de5567329e350650e62a37dafad37613211400762930cde0fa6726ec7f33316db1f7e224469875404c5daa90cc242883a318221e504795692d765a604b887361fbbc4f50134e949fd6934e9d5a68011dbb4ac336cd53ad228451ea10a99dde56b86801ebbdcd49c46c599c6e7bf9d882a92a91791095635c08c24096042e69ad50dad7c5dda3648e41b773455ebcd9657c450cc18b502c3caa47c9c3db69cbe78e85606d2923c7e7fc9d5030e2fd1e357796ac944ce914f5f4e10e6c09af2a482a5a16bdd782335d9a02dfcdfe338c7a85e85a",
  "dcId": 1,
  "nextApiId": 2496,
  "dateUpdated": {
    "$date": "2025-08-19T10:26:41.392Z"
  },
  "twoFa": false,
  "twoFaDate": {
    "$date": "2025-08-18T10:48:04.400Z"
  },
  "phone": "+528110616602",
  "banned": false,
  "firstName": "Kira",
  "id": "5703036853",
  "lastName": "Shishkina",
  "messageCount": 146,
  "personalChannel": "PPRbqHHQNeiMQY3O",
  "personalChannelDate": {
    "$date": "2025-04-25T14:34:09.386Z"
  },
  "lazyCheckDate": {
    "$date": "2025-08-18T15:02:30.924Z"
  },
  "automaticCheckDate": {
    "$date": "2025-08-19T10:26:41.392Z"
  },
  "username": "shishkina_imaginative",
  "remainingTime": {
    "$date": "2025-08-19T08:23:51.714Z"
  }
},
{
  "_id": {
    "$oid": "683b23dc3770b19a277f4500"
  },
  "accountId": "5705708226-prefix-elba",
  "dc5": "0ba4ca998f62f81d3e772c18e204a0486568cde321fa3a4f75bada58d4ae562992757c941bdba9a3ece999134d629f304fd81c4becbd44d341a7b5457ece6478c72f80d0b7eb4cc3fa8b0d5de9a3a356cdd9716f4512a21510fd66520f8978175166c347231520967172e0c0b1c814df4135b0b7add673b71638e28766e8f2df7737490d3d12830ae2e9e86434728fbcf0418b64c98550dcc26b30f0c010ad0f55efdc546fb40254cdfb5cff9e5a6bc26bddfc98a04fade59d49778c62b331827160260ef8061e67469135526872252e377e8eb2e08f4be3f038860ce71258f1ce00fab5803673eda76776cfaab85a4c854efdeac8bedc15b8826e61d785e27a",
  "dcId": 5,
  "nextApiId": 2040,
  "dateUpdated": {
    "$date": "2025-08-19T10:31:24.049Z"
  },
  "twoFa": false,
  "twoFaDate": {
    "$date": "2025-08-18T00:42:38.280Z"
  },
  "phone": "+6289669440576",
  "banned": false,
  "firstName": "Nikolay",
  "id": "5705708226",
  "lastName": "Zubanov",
  "messageCount": 11,
  "username": "zubanov_shallow",
  "personalChannel": "IfKcmphIuXbvM1NN",
  "personalChannelDate": {
    "$date": "2025-05-31T16:34:48.790Z"
  },
  "lazyCheckDate": {
    "$date": "2025-08-18T21:35:07.218Z"
  },
  "automaticCheckDate": {
    "$date": "2025-08-19T10:31:24.049Z"
  },
  "remainingTime": {
    "$date": "2025-08-09T12:19:16.918Z"
  }
},
{
  "_id": {
    "$oid": "683b23d63770b19a277f4360"
  },
  "accountId": "5707011483-prefix-elba",
  "dc5": "b1c67b60cb5c446f2baeece246c4208922d02a112d8c1cd01e83f57cbb7d600fedd963077e48a524ead28572f523d140bdd33d7d02aa0ccbed357ab47c2c754a9404adc48ef8b73f4286fad71972fb15bdd10ed498a618c684c2b7b85690a8853847d430b82a78f15aca4802a1f8dd3a7ba97e4942b60cfc511e9db9c20013c6aec1da7b39082808cc548815e6af1066d7418d2f46a51d4c957e4a43987f10f07567e6ce1ee11270fed3b48647769675df5b24b3f16cbc39154db540b2b2512578bdaa09da01d31faa46a69845e842120c9827f6daec0707129d507fb372e6d35e0f1e5394754eb31ba78b3a380ecc74d8dd64212106a17dfa718bced7c9d9be",
  "dcId": 5,
  "nextApiId": 2040,
  "dateUpdated": {
    "$date": "2025-08-19T10:25:25.333Z"
  },
  "twoFa": false,
  "twoFaDate": {
    "$date": "2025-08-18T00:42:27.944Z"
  },
  "phone": "+62882006904901",
  "banned": false,
  "firstName": "Vadim",
  "id": "5707011483",
  "lastName": "Grishin",
  "messageCount": 15,
  "username": "grishin_amazing",
  "personalChannel": "csmaQjkjXRKc4vsv",
  "personalChannelDate": {
    "$date": "2025-05-31T16:33:25.290Z"
  },
  "lazyCheckDate": {
    "$date": "2025-08-18T15:33:12.582Z"
  },
  "automaticCheckDate": {
    "$date": "2025-08-19T10:25:25.332Z"
  },
  "remainingTime": {
    "$date": "2025-08-11T16:25:32.334Z"
  }
},
{
  "_id": {
    "$oid": "685f074c3770b19a27ab20ff"
  },
  "accountId": "5719461200-prefix-female-gidrovell",
  "dc1": "46fc9464cd1c827302eb77c235d057e0e0fdf316598409918eb4f38cb5ccac4a26d7810f5a3e7695d54a80f9fd264028fa07b9e3dbaa727e7dcdcd60a806e3a2abc784792d0ecd87da3282d93628a1d1090bec9f6b74b837f804b9fa346612664c0c4b496d69a3a65883b20df84eb7792d9895091a89a5055e4bef0570ec3f9b6e084caf29f24bf80762faefc5e8c5ddd71f4c45be97c01f803e5f9969bde2c85ff8a5484449ced6fc6184cdc1552f7ec6d0c8afeacacb1bbd6086228ff7e1b86e9f28decde217f2e50994c270d6b33a7cbb2f03752e7e3599b162ada48b91039afd2557c06fda5c8390551520ae55cb28767b651e7bdccf322a723c03bd89ba",
  "dcId": 1,
  "nextApiId": 2040,
  "dateUpdated": {
    "$date": "2025-08-19T10:29:19.448Z"
  },
  "twoFa": false,
  "twoFaDate": {
    "$date": "2025-08-18T10:47:55.652Z"
  },
  "phone": "+542644421080",
  "banned": false,
  "firstName": "Elena",
  "id": "5719461200",
  "lastName": "Egorova",
  "messageCount": 19,
  "username": "egorova_shiny",
  "personalChannelDate": {
    "$date": "2025-08-16T21:17:20.034Z"
  },
  "personalChannelError": "CHANNEL_NOT_FOUND",
  "lazyCheckDate": {
    "$date": "2025-08-18T19:53:30.506Z"
  },
  "automaticCheckDate": {
    "$date": "2025-08-19T10:29:19.448Z"
  },
  "remainingTime": {
    "$date": "2025-08-06T14:06:58.899Z"
  }
},
{
  "_id": {
    "$oid": "6810c3ac461801f5990b9580"
  },
  "accountId": "5726831121-prefix-elba",
  "dc1": "2cce1e2fd650059de9f02ab59380e05bbff219570b64d93e86cf3ebeb02b71b036dd075fbf0891717eb58ed6be0854d44363135bcc0036f893f15850481396f100c12a8f3904c4fdd5d97c3803495558b30cab9ed7e958fb346b56420ca95d454fcbd5dca3587dc1134869bd401ed8f0a675488a7e8afc498ce3cf94f8babdf764d814fb9d70f9467243f7fe7c67659b3387dae3f6b6387ccb144ed603a42f9a6e769d501415d2700ba375b33f318a9efea653e62ca2faef8809fcbabde751d0402b3808b98031a2c4670efd468b3168efea10b65dc8c4b729642d89f89b46dd55c2ff685d61a3e2f41460c0288682cb908020728ad472beafcb96d30647c09d",
  "dcId": 1,
  "nextApiId": 2040,
  "dateUpdated": {
    "$date": "2025-08-19T10:22:31.728Z"
  },
  "twoFa": false,
  "twoFaDate": {
    "$date": "2025-08-19T04:18:23.523Z"
  },
  "phone": "+573006218140",
  "banned": false,
  "firstName": "Nikolai",
  "id": "5726831121",
  "lastName": "Rusanov",
  "messageCount": 31,
  "username": "rusanov_hollow",
  "personalChannel": "uSYTO6lbYHZkzlai",
  "personalChannelDate": {
    "$date": "2025-04-29T13:15:36.281Z"
  },
  "lazyCheckDate": {
    "$date": "2025-08-18T17:54:39.276Z"
  },
  "automaticCheckDate": {
    "$date": "2025-08-19T10:22:31.728Z"
  },
  "remainingTime": {
    "$date": "2025-08-09T11:02:25.122Z"
  },
  "historySpamBlocks": [
    {
      "spamBlockDate": "INFINITY",
      "spamBlockDays": 0
    }
  ]
},
{
  "_id": {
    "$oid": "685f074e3770b19a27ab21da"
  },
  "accountId": "5728174310-prefix-female-gidrovell",
  "dc1": "2f4ffeb5c5976a973ed0e1e612be1a647ea23e2aaff379d1b24d75071b510ad029b6bf79544405c77863f7686703aa34736ac75bac324bf51ea5d9d3eeec16f3cf9b0ca9aad7d928db3309e04072aa17a1e810c0309ffd5cdd6c1d7d83847881d6f5690bc18b235f3ce8af06f955e96731a7602c31a7fc95644288e1debbe546eea71ef83b49e28f7c4d695383dcf5669adb03ab5614a0beeda542258401a94ec9cbc65a40be65e54c227d93cdac86924605428b7ce99c9082196104cf80204f2ee8044d2756377ce75d03bb6a1d57a919ff6bfe92f6d719d6520480f8d30a4bee907b5218dea59a65cca49ef7b2117823d5d47a701b108ee4145ab3934ca89b",
  "dcId": 1,
  "nextApiId": 2040,
  "dateUpdated": {
    "$date": "2025-08-19T10:16:25.310Z"
  },
  "twoFa": false,
  "twoFaDate": {
    "$date": "2025-08-18T10:47:58.530Z"
  },
  "phone": "+523921014810",
  "banned": false,
  "firstName": "Raisa",
  "id": "5728174310",
  "lastName": "Eroshkina",
  "messageCount": 26,
  "username": "eroshkina_colorful",
  "personalChannelDate": {
    "$date": "2025-08-16T21:17:16.823Z"
  },
  "personalChannelError": "CHANNEL_NOT_FOUND",
  "lazyCheckDate": {
    "$date": "2025-08-18T19:24:19.104Z"
  },
  "automaticCheckDate": {
    "$date": "2025-08-19T10:16:25.310Z"
  },
  "remainingTime": {
    "$date": "2025-08-11T12:08:51.406Z"
  }
},
{
  "_id": {
    "$oid": "680b9469461801f599601618"
  },
  "accountId": "5772170803-prefix-female-dmp1",
  "dc1": "c46c78e231613b4fa966b1afe030d8a59b6a99d8ab1b6dd719e204fad1acf94443ed6271ad1119d980017f8d57fc61d1889f59d273b9711a5b663a3fe6148bacea523c4a2677255aa1c2adfd6c872d6b925ba788a253204e0cb0eb104983e1593003567498a1d12aa6d630aa8f90f8f1fab24a07252c2b5b8bdbd557dbeef80302d0b6139b1f3f33657141b596a8483021bc3927a245443acc05fd04236254ced4709c14e10b4161c4da1843e1755a8ec2c43154ebb7ee1397d60ce0b08c3747124254ae9e20310357082d27035a4b1c4b2f1ff08084d5e09d96b10af4b40f9004f00e7d30a056669b78e3cb9537435cd4bf1233113491545c7cffd64bef6c18",
  "dcId": 1,
  "nextApiId": 2040,
  "dateUpdated": {
    "$date": "2025-08-19T10:13:40.439Z"
  },
  "twoFa": false,
  "twoFaDate": {
    "$date": "2025-08-18T10:47:58.989Z"
  },
  "phone": "+573168613553",
  "banned": false,
  "firstName": "Alla",
  "id": "5772170803",
  "lastName": "Dorofeeva",
  "messageCount": 48,
  "personalChannel": "F6vvfkCBtwedrCOa",
  "personalChannelDate": {
    "$date": "2025-04-25T14:34:33.753Z"
  },
  "lazyCheckDate": {
    "$date": "2025-08-18T20:32:52.649Z"
  },
  "automaticCheckDate": {
    "$date": "2025-08-19T10:13:40.439Z"
  },
  "username": "dorofeeva_neutral",
  "remainingTime": {
    "$date": "2025-08-19T01:57:30.425Z"
  }
},
{
  "_id": {
    "$oid": "683b23e73770b19a277f4856"
  },
  "accountId": "5790354196-prefix-elba",
  "dc1": "8845b6ea387ea75e029e59b4c89994c288d3e783096c3d9d294dcc8831871c7c9f0a59bedc00a6f347f7a296127aa36b5839204074fec36e6726f3ce4890def1f6aa9a89e9e27c605ef39c1943212a7a6caaa490d0a0a7b0d1dd938b517e8693bb4d77c8faf1a5287e41ab3564b85a3239de6e81d4517fa9b984cf8dfc9eca5db7cad0b0ba4e1b6b9fa7b8adc8de8fe6fa35bc392580067ba3b2ca81b57fb1c3e810a57aeffea15e6e5e5b6f49a2b1532da30c03ef577daf423cc14eebbed59f72166c16a542f3c7afcbbad3d0bf1499ef65b4d3313a022251e6f22d32d16d1ef80f79228880224e237ae7f839cc03548fcbcc91454a7b4ded71b2ecb480c1e9",
  "dcId": 1,
  "nextApiId": 2040,
  "dateUpdated": {
    "$date": "2025-08-19T10:20:31.220Z"
  },
  "phone": "+573209079693",
  "banned": false,
  "firstName": "Anton",
  "id": "5790354196",
  "lastName": "Orlov",
  "messageCount": 5,
  "username": "orlov_primary",
  "personalChannel": "zqzZciUWQeVS0rsk",
  "personalChannelDate": {
    "$date": "2025-05-31T16:35:58.146Z"
  },
  "lazyCheckDate": {
    "$date": "2025-08-19T00:31:55.378Z"
  },
  "automaticCheckDate": {
    "$date": "2025-08-19T10:20:31.220Z"
  },
  "remainingTime": {
    "$date": "2025-08-11T10:57:24.851Z"
  }
},
{
  "_id": {
    "$oid": "683b23da3770b19a277f445f"
  },
  "accountId": "5796997269-prefix-elba",
  "dc5": "823cce9ca37592b162c8b6de1e548c5d8c5e39c48249ef3fe7104c97a7e3177664759090f94f55aef56beec2dc2b3d46d2d0736aab32839de5c6b31933f4b2857b66cf7a56ab61be1a08666fa613aadb084ffdd313b33e432f00382caead6972f9f4b1f9a8d3a6a183afabb3bd2e591d98abb78a0f094fee36b231440136d52c7ca6e2edf52ac02b57e141b82c7617dedb269511dcf228e246b4e9e7e1f134ed0f6ffa98dcc91d091542c209522024c7862217c780ffdce47fd4e6a4339680ff7915dd2772f6ebd45b48fa250136a8149455d667e64170e1cb50cd2290ed12aa4863475307d450a76ea10c59c46b1377a46961547bd5e4bb8c6112110452220d",
  "dcId": 5,
  "nextApiId": 2040,
  "dateUpdated": {
    "$date": "2025-08-19T10:15:29.808Z"
  },
  "twoFa": false,
  "twoFaDate": {
    "$date": "2025-08-18T00:42:33.793Z"
  },
  "phone": "+6281996436178",
  "banned": false,
  "firstName": "Grigory",
  "id": "5796997269",
  "lastName": "Mironov",
  "messageCount": 11,
  "username": "mironov_ambitious",
  "personalChannel": "kYIOlvNxADbYhn2X",
  "personalChannelDate": {
    "$date": "2025-05-31T16:33:13.277Z"
  },
  "lazyCheckDate": {
    "$date": "2025-08-18T20:35:41.871Z"
  },
  "automaticCheckDate": {
    "$date": "2025-08-19T10:15:29.808Z"
  },
  "remainingTime": {
    "$date": "2025-08-11T19:29:57.382Z"
  }
},
{
  "_id": {
    "$oid": "680b9469461801f59960161a"
  },
  "accountId": "5804178279-prefix-female-dmp1",
  "dc1": "663845ca6c6eb187d3a52dc4e782408510e8fc61a3c01bce1c098cd954ed067b9534604d54d2e377e3e1bc8aa667de62805fd72afc1c1e45ba24b6eba6e00ff960fa25e5123bd960035c22a28321ec2b8e8f58b13e13ceec8fe8e5d39a2eaa27cc695c69d04b3166d03730d9dfe65946b0690b0cf27cbe6b4aeaf1e32dc80916cdad96d31d0d4173bce4aa8a95fcd226b8c4e13e59aabee66db99e89ed7b2629ef555a95d919efb012e1ff8f5bf7173089e86c0802aaa6dbff851963bc3723b6a165e5701ed3d5c13e749a3be13550ee5aafaa84a1717171807bffa3e40e1dd9f6fcc2349bcfae84b94d86c8385bab20a838301fb0f63a71e0cfde4e282e6177",
  "dcId": 1,
  "nextApiId": 2496,
  "dateUpdated": {
    "$date": "2025-08-19T10:35:42.238Z"
  },
  "twoFa": false,
  "twoFaDate": {
    "$date": "2025-08-18T10:48:00.245Z"
  },
  "phone": "+573052147612",
  "banned": false,
  "firstName": "Inna",
  "id": "5804178279",
  "lastName": "Galitsyna",
  "messageCount": 31,
  "personalChannel": "oskLWKeFDiiz3bHv",
  "personalChannelDate": {
    "$date": "2025-04-25T14:30:18.502Z"
  },
  "lazyCheckDate": {
    "$date": "2025-08-18T14:03:41.675Z"
  },
  "automaticCheckDate": {
    "$date": "2025-08-19T10:35:42.238Z"
  },
  "username": "galitsyna_young",
  "remainingTime": {
    "$date": "2025-08-18T15:32:14.664Z"
  },
  "historySpamBlocks": [
    {
      "spamBlockDate": {
        "$date": "2025-04-29T07:12:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-07-09T06:54:00.000Z"
      },
      "spamBlockDays": 7
    },
    {
      "spamBlockDate": {
        "$date": "2025-07-03T12:35:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-07-06T13:52:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-07-13T14:28:00.000Z"
      },
      "spamBlockDays": 7
    },
    {
      "spamBlockDate": {
        "$date": "2025-08-11T08:16:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-08-14T08:21:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-08-25T13:35:00.000Z"
      },
      "spamBlockDays": 7
    }
  ],
  "spamBlockReasons": [
    {
      "reason": "Ive always used my account responsibly, adhering to all guidelines, and never had any violations. However, the current messaging restrictions prevent me from contacting essential individuals outside my mutual contacts, which has stalled my work. I kindly request lifting these restrictions to restore my ability to communicate effectively.",
      "date": {
        "$date": "2025-08-18T14:06:03.933Z"
      }
    }
  ],
  "spamBlockDate": {
    "$date": "2025-08-25T13:35:00.000Z"
  },
  "spamBlockDays": 7,
  "spamBlockInitDate": {
    "$date": "2025-08-18T14:06:03.939Z"
  }
},
{
  "_id": {
    "$oid": "680b9467461801f599601596"
  },
  "accountId": "5810429991-prefix-female-dmp1",
  "dc1": "103bdc3a3ab65b80c6c62086c088a5d21b5ec047d511ed733da2c43e07c7de670e45dc0545aa824357f5cf18c1f8652833885fc068fe5fb02420eb49d2982aa7cd53b6a62b5596f821f200ec8b2cef1acd5af500c1d9efaab4265b53c20840124cb904a2ef8576fa04fd534e276dfc37354f70660c4724ba0c531f7cedbb808c3a5670234513d404273370825b0b4cd2a0c93514bfdb3bffe16bd78b2c970d59eed0f05bb1d470a9cafc69aa8aa515b1a7731fbe3b049f552ef407a206a07a37299b3f1aed201d3307e0da89e27bdd0abc0bf3bef10e0a854a2b3e93e590a5546bc777e1decdd9fd23cea272b2444c767494b8d0af723e86e702a3e86c375fa4",
  "dcId": 1,
  "nextApiId": 2040,
  "dateUpdated": {
    "$date": "2025-08-19T10:30:42.313Z"
  },
  "twoFa": false,
  "twoFaDate": {
    "$date": "2025-08-18T10:47:53.430Z"
  },
  "phone": "+527271095691",
  "banned": false,
  "firstName": "Evgenia",
  "id": "5810429991",
  "lastName": "Malyutina",
  "messageCount": 51,
  "personalChannel": "I0wHazbFtabKpeHi",
  "personalChannelDate": {
    "$date": "2025-04-25T14:32:13.252Z"
  },
  "lazyCheckDate": {
    "$date": "2025-08-18T22:23:32.606Z"
  },
  "automaticCheckDate": {
    "$date": "2025-08-19T10:30:42.313Z"
  },
  "username": "malyutina_thirsty",
  "remainingTime": {
    "$date": "2025-08-19T11:09:45.216Z"
  },
  "historySpamBlocks": [
    {
      "spamBlockDate": {
        "$date": "2025-05-01T11:13:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-05-05T05:42:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-05-12T09:29:00.000Z"
      },
      "spamBlockDays": 7
    },
    {
      "spamBlockDate": {
        "$date": "2025-07-20T05:55:00.000Z"
      },
      "spamBlockDays": 30
    },
    {
      "spamBlockDate": {
        "$date": "2025-08-11T17:55:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-08-14T18:27:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-08-15T18:56:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-08-19T08:00:00.000Z"
      },
      "spamBlockDays": 3
    }
  ]
},
{
  "_id": {
    "$oid": "685f074d3770b19a27ab21a7"
  },
  "accountId": "5820731799-prefix-female-gidrovell",
  "dc1": "7798b38c43a4b1d389dfa9350a443c7eaef1b561ba9edafa013da09443183134414f7a3f9a75e91b50d3a95d56e6764899ed4a9d736b2c01da950015a29e08104022b2e99da3bcbe1f6fc47381f5123959052a93180241c1ecd6a588d8a11f2dbcf98e6ca5a6fdcce6ac9a83e250cad5109de3a429ab35311506a01457a0acf806b64e86c8803d3adb7e7f3ea3b59f3dc3fc0b9772813633682275229c000af7ffff1d80964fc52fe9edf229eb3f6806568def429b6a0b1d02e9b7fd7d74fd6fbbb78dcb5e256380a5c6c6d6bad4adb53920ae00b11b1c635421e6c609310c465f6e383f50a74bb1d64be2e54e20a50f9fa7d2fdc885e21aae453c7f40932816",
  "dcId": 1,
  "nextApiId": 2040,
  "dateUpdated": {
    "$date": "2025-08-19T10:22:18.194Z"
  },
  "twoFa": false,
  "twoFaDate": {
    "$date": "2025-08-18T10:47:58.528Z"
  },
  "phone": "+525591390474",
  "banned": false,
  "firstName": "Valeria",
  "id": "5820731799",
  "lastName": "Larionova",
  "messageCount": 19,
  "username": "larionova_zany",
  "personalChannelDate": {
    "$date": "2025-08-16T21:17:20.210Z"
  },
  "personalChannelError": "CHANNEL_NOT_FOUND",
  "lazyCheckDate": {
    "$date": "2025-08-18T20:45:56.540Z"
  },
  "automaticCheckDate": {
    "$date": "2025-08-19T10:22:18.194Z"
  },
  "remainingTime": {
    "$date": "2025-08-06T14:18:19.844Z"
  },
  "historySpamBlocks": [
    {
      "spamBlockDate": {
        "$date": "2025-07-27T08:04:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-08-06T06:38:00.000Z"
      },
      "spamBlockDays": 7
    },
    {
      "spamBlockDate": {
        "$date": "2025-09-05T13:21:00.000Z"
      },
      "spamBlockDays": 30
    }
  ]
},
{
  "_id": {
    "$oid": "685f074f3770b19a27ab2216"
  },
  "accountId": "5821919778-prefix-female-gidrovell",
  "dc1": "56f6f4649762ad8d9464ec6c1abbbb43933302a34ad6dbd24e9f4cf3934c81a9dba37f3579e7c11c7d3151b465d0e4e4aecdeef259547ece4b0dfc5c80df1fb5574c0123517506c58bed7a78ffe7a89a786b37589ba45f54810f33e5de6550449fb7621a0b2155866dd0469704d8efa05ebba588cf58e08d04fcc601877119ed6f5bf2c2e2e61046a53671082302aba05ea7a35b65786e9954f56fe997043136e2f2cae0b60af80445db2cd9d6245ea64b1a2f8cca76add85bd724962922250f0291955eafe7c50b6423061728dd4643770ef9a7590ffde8251fa8616d0e593f0beecff40aa4261773595b73cfc8b666005a3d35a41e723055d4679f9a621f23",
  "dcId": 1,
  "nextApiId": 2040,
  "dateUpdated": {
    "$date": "2025-08-19T10:38:23.773Z"
  },
  "twoFa": false,
  "twoFaDate": {
    "$date": "2025-08-18T10:48:02.749Z"
  },
  "phone": "+526144765828",
  "banned": false,
  "firstName": "Yulia",
  "id": "5821919778",
  "lastName": "Egorova",
  "messageCount": 27,
  "username": "egorova_clear",
  "personalChannelDate": {
    "$date": "2025-08-16T21:17:17.009Z"
  },
  "personalChannelError": "CHANNEL_NOT_FOUND",
  "lazyCheckDate": {
    "$date": "2025-08-18T19:24:18.290Z"
  },
  "automaticCheckDate": {
    "$date": "2025-08-19T10:38:23.773Z"
  },
  "remainingTime": {
    "$date": "2025-08-11T12:35:52.072Z"
  }
},
{
  "_id": {
    "$oid": "683b23da3770b19a277f4482"
  },
  "accountId": "5826145763-prefix-elba",
  "dc5": "6e385508080c7b1182c53f6d6e44f36f855dff10f282aa2d18bbf4e8d910eb24fa45019a0a83f05fe17801637d5644ddb13b55cbbbdf612fafa57e88b4f0701ba01ea08b91a165f9a04abc465ec02b2ed0999724688a4e1313ab16f09c26921a88b10667d7a45c3b051b12a83920774f9a0d3453c621a84950e3efb235d8566772d52a17f7b259bd2895ce552107366894ad7f915f3254450f5cb722298b4f1c4d10df23595395a6ccb620717a9f0d08965201963893d0ce942481bdcad79080f294f568c3446639e62dc9521c0187e52fb9498d4c8ed90de92684761101c28232aa55ae3a6b9bfdfa4ee2b605d4253946c1e21687d16aae45277704bbcc10cf",
  "dcId": 5,
  "nextApiId": 2040,
  "dateUpdated": {
    "$date": "2025-08-19T10:14:23.420Z"
  },
  "twoFa": false,
  "twoFaDate": {
    "$date": "2025-08-18T00:42:33.778Z"
  },
  "phone": "+6285782995410",
  "banned": false,
  "firstName": "Leonid",
  "id": "5826145763",
  "lastName": "Pakhomov",
  "messageCount": 13,
  "username": "pakhomov_vitreous",
  "personalChannel": "givZsnbKGqaXlXL6",
  "personalChannelDate": {
    "$date": "2025-05-31T16:32:05.565Z"
  },
  "lazyCheckDate": {
    "$date": "2025-08-18T14:50:21.986Z"
  },
  "automaticCheckDate": {
    "$date": "2025-08-19T10:14:23.420Z"
  },
  "remainingTime": {
    "$date": "2025-08-11T10:58:31.502Z"
  }
},
{
  "_id": {
    "$oid": "685f07503770b19a27ab225a"
  },
  "accountId": "5854002370-prefix-female-gidrovell",
  "dc1": "7eaef328a75f33d68fc4e3c2df20c63bcb5662b141311e22a8cd91af8f149cf2b2758593639fc22fc2110fe47f0c46f1ec449e7cbc1a57d44e921859aa769c0c7a5043e7d1e5e19356b53f833e6f45fcee6db66219a3236f5b41df44c2fe7f896e3385cfc57b8ba7ad086ea9be9b3ff2e2c65893bdc0c43da434782b2c03bf4b99dbb44fd32e2150845903dddc551b8b5e28edc6b94e267da00eeb26678beb02f2d8cbeb019f26840894377d19d0dc2b27bf5754296cb842a0d78f0521cb7ae4369d604dfa1312caf39d29d0c390c0dc5132ca855eb4d56d83baab2d127f655a078cb2470e4bc4f47db3e34e92ab642ffc7fc2b409796f69ae7a34eb3232e8c3",
  "dcId": 1,
  "nextApiId": 2040,
  "dateUpdated": {
    "$date": "2025-08-19T10:38:30.454Z"
  },
  "twoFa": false,
  "twoFaDate": {
    "$date": "2025-08-18T10:48:08.403Z"
  },
  "phone": "+525538120596",
  "banned": false,
  "firstName": "Kira",
  "id": "5854002370",
  "lastName": "Semenova",
  "messageCount": 28,
  "username": "semenova_voiceless",
  "personalChannelDate": {
    "$date": "2025-08-16T21:17:15.191Z"
  },
  "personalChannelError": "CHANNEL_NOT_FOUND",
  "lazyCheckDate": {
    "$date": "2025-08-18T19:23:19.813Z"
  },
  "automaticCheckDate": {
    "$date": "2025-08-19T10:38:30.454Z"
  },
  "remainingTime": {
    "$date": "2025-08-06T14:12:41.730Z"
  }
},
{
  "_id": {
    "$oid": "685f07483770b19a27ab1fa1"
  },
  "accountId": "5856245557-prefix-female-gidrovell",
  "dc1": "6aa6ac8e3669c24df71d771ce683f5308ba6c4e2f08791dcf2dc69df999e92429fe32f56120fb7b7a773d1dbb256a5ce780030783c2634fa7369cbdc03050abc312c3fe47ff40b697cb22437331029e67465bad709ed4204ded9c0cebcae98b48b44a27edbe3112994b2846d72c29401e804ca0023044e2c45b6664ba0946ece4ef45eb43a1ed14c24ad405979b2e7f88d0f9a45f4e9e2bf6c83b93acb5d4761cb0a97f80a023b71106989765157737068517dd65c66b316e967c38edf86b00d284071b9521bdb7cc2a672a448f4080d3e0a62fb2da5d33bb7a8e298743feeff1517ce3b9fa2ca2ad5f77751d154e5b2342db51c745a520f228be7eb9acbcb9b",
  "dcId": 1,
  "nextApiId": 2040,
  "dateUpdated": {
    "$date": "2025-08-19T10:33:42.667Z"
  },
  "twoFa": false,
  "twoFaDate": {
    "$date": "2025-08-18T10:47:40.832Z"
  },
  "phone": "+543854720744",
  "banned": false,
  "firstName": "Sofia",
  "id": "5856245557",
  "lastName": "Maksimova",
  "messageCount": 27,
  "username": "maksimova_lime",
  "personalChannelDate": {
    "$date": "2025-08-16T21:17:22.176Z"
  },
  "personalChannelError": "CHANNEL_NOT_FOUND",
  "lazyCheckDate": {
    "$date": "2025-08-18T22:42:37.925Z"
  },
  "automaticCheckDate": {
    "$date": "2025-08-19T10:33:42.667Z"
  },
  "remainingTime": {
    "$date": "2025-08-11T12:27:35.787Z"
  }
},
{
  "_id": {
    "$oid": "680b9468461801f599601604"
  },
  "accountId": "5857147421-prefix-female-dmp1",
  "dc1": "0c8579737a2717413e1c3d8ed9fc337d3e9532ca93febb7e5c10182ce9f24fe20c984067c1cee51aa29c592b501f90475ca57f24e4406c0707dcc02d203ef2fa00bff83a80f601f0df25b54845b1875fc7f5494e73cc398775fa7d69d34f367b51bbecd6d6ecba25989bffc83c23218cc30c753adf50b003ff33995031251817ed277ee0d8cd0daea7b46e66b27f493f7c23d2bd813bf64d090cc23f8e4598b89b08f35001b2a3c368fad7a25ee9ae9c8de7b0c157473264ef5c7fd728c41ba021922311a819a6dcb4a05b569c2966542a59115070637e47354fb611443efe0960ecc80bed7367eab0a9c3a4cfa8ad39b3028e1f1ef61c80050487d2bc85d084",
  "dcId": 1,
  "nextApiId": 2496,
  "dateUpdated": {
    "$date": "2025-08-19T10:20:44.517Z"
  },
  "twoFa": false,
  "twoFaDate": {
    "$date": "2025-08-18T10:47:58.971Z"
  },
  "phone": "+543533458418",
  "banned": false,
  "firstName": "Irina",
  "id": "5857147421",
  "lastName": "Shirokova",
  "messageCount": 137,
  "personalChannel": "FUhrfnnCD7HZTrNH",
  "personalChannelDate": {
    "$date": "2025-04-25T14:33:48.032Z"
  },
  "lazyCheckDate": {
    "$date": "2025-08-18T21:35:07.849Z"
  },
  "automaticCheckDate": {
    "$date": "2025-08-19T10:20:44.517Z"
  },
  "username": "shirokova_rolling",
  "remainingTime": {
    "$date": "2025-08-19T06:42:00.865Z"
  }
},
{
  "_id": {
    "$oid": "683b23eb3770b19a277f4996"
  },
  "accountId": "5861385755-prefix-elba",
  "dc1": "b0bee21e036fef0fe9052ef2d196d60349a2e8b42b23a431e03a6ca2e20c328f2a35a2fff1824840d02d5a65c596f29279408c8608299471ec55daac4576607fb47a5c369bd94a74f838d39b30c0656a44e3cf5fa94d52acad81a96ca95e20718e6d8ffcd90183d2532c701dd889b87e86bf707e93efe4e9669b13271ddbeaee147a4b06348ba1026fa81197884a02cfec39beafb5b6dd2d34269d2c1851d6b04ecbd83adafa0939e35b6f14ec9dd4e7853865e350a054e3f946ba33ac3b98e22e74676421986a97757a4ba56581d30730a8ec11753ec1264399be48a5ee5aac52c2c9f4ea749b507b0d9c032c0b88d5221692283c310a270eb6c56bc6c2ca0f",
  "dcId": 1,
  "nextApiId": 2040,
  "dateUpdated": {
    "$date": "2025-08-19T10:25:35.716Z"
  },
  "phone": "+573219365948",
  "banned": false,
  "firstName": "Artem",
  "id": "5861385755",
  "lastName": "Trofimov",
  "messageCount": 5,
  "username": "trofimov_attractive",
  "personalChannel": "clUW5VdkiFhNIaKC",
  "personalChannelDate": {
    "$date": "2025-05-31T16:31:47.367Z"
  },
  "lazyCheckDate": {
    "$date": "2025-08-18T21:38:10.354Z"
  },
  "automaticCheckDate": {
    "$date": "2025-08-19T10:25:35.716Z"
  },
  "remainingTime": {
    "$date": "2025-08-11T11:04:41.942Z"
  }
},
{
  "_id": {
    "$oid": "680b9475461801f5996019d3"
  },
  "accountId": "5862506064-prefix-female-dmp1",
  "dc1": "8d67e2558e98b7dc26fd8d8486ca2079a16cff17e646d3df072c074b762d64a43dd83a7714766ab69c6a514ac5aa04eb63ff41564257198f51f39f386a9e3e66c930f52d6e017822be836792a306918132933cb9aedf03342fb24e8eb3a6d9550fca8d5b4bedaac9e8c1d8b12333c7f76791662df8788243c0fe836944e0a6a3c96e4c55dc24d0872d1fc4dca2d74b7241527c15e3698f8c635ee6b2cb5325d0667a9a87cb94612e6f6f0ed5b8714a7975e2454c2b76ba792a762e5c987eb67651e087f25289537f6227b9c8d0048a3725ca68a100b701a26a03d98cbbbd6e3b15e461e73b5169f2e76f6e14133f7fe49f01d784b9f9d95f3c1cf896a0eae50d",
  "dcId": 1,
  "nextApiId": 2496,
  "dateUpdated": {
    "$date": "2025-08-19T10:22:33.483Z"
  },
  "twoFa": false,
  "twoFaDate": {
    "$date": "2025-08-18T10:48:09.096Z"
  },
  "phone": "+541165848021",
  "banned": false,
  "firstName": "Evgenia",
  "id": "5862506064",
  "lastName": "Ivanova",
  "messageCount": 100,
  "personalChannel": "KrFzqM8lzglyMjnj",
  "personalChannelDate": {
    "$date": "2025-04-25T14:29:42.954Z"
  },
  "lazyCheckDate": {
    "$date": "2025-08-18T14:51:22.102Z"
  },
  "automaticCheckDate": {
    "$date": "2025-08-19T10:22:33.483Z"
  },
  "username": "ivanova_fuchsia",
  "remainingTime": {
    "$date": "2025-08-16T11:29:42.525Z"
  },
  "historySpamBlocks": [
    {
      "spamBlockDate": {
        "$date": "2025-08-11T18:36:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-08-12T14:53:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-08-15T18:10:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-08-15T18:25:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-08-19T10:50:00.000Z"
      },
      "spamBlockDays": 3
    }
  ],
  "spamBlockDate": {
    "$date": "2025-08-19T10:50:00.000Z"
  },
  "spamBlockDays": 3,
  "spamBlockInitDate": {
    "$date": "2025-08-16T11:05:08.102Z"
  },
  "spamBlockReasons": [
    {
      "reason": "Ive never violated any rules, spammed, or engaged in suspicious activities on my account. The messaging restriction to mutual contacts only is severely impacting my professional communication and causing projects to fail. I request the restriction be lifted to allow me to continue my work.",
      "date": {
        "$date": "2025-08-16T21:39:01.397Z"
      }
    }
  ]
},
{
  "_id": {
    "$oid": "680b9472461801f5996018e6"
  },
  "accountId": "5879824382-prefix-female-dmp1",
  "dc1": "63dce88dd667432fcc522857aaf8022418f071b680ef67f19e408cbec18ee984463978101c0bcc34c9faeff9b9720b45b4ff2e66415fb5d56b7dea150d3b83fdc201bf892a6f95bb0e802474d39005732246bec1776cf1dce9ee001e6fb53e861a0f98c4382f8f0b954e9717bdf54a0a2921c8e6ef1d65b5c066aece249de4ee39f3db5b954e30631f3f54df2d8c33263a444a2a12fff88bf475326a184969a5335d58b9e8218633b17d4806823fad13238d183f9da6143300a047496c7a3bec5bd1170a6fbfe8acdd4e5683b6849ca4d33973495f0e8b0135f681e6c5d1bbf760f05f1683c49ebda0e21e70ad0fe8bb712843a88ba965673e673595fee3b6e7",
  "dcId": 1,
  "nextApiId": 2496,
  "dateUpdated": {
    "$date": "2025-08-19T10:18:39.864Z"
  },
  "twoFa": false,
  "twoFaDate": {
    "$date": "2025-06-25T00:20:29.886Z"
  },
  "phone": "+541178878743",
  "banned": false,
  "firstName": "Vera",
  "id": "5879824382",
  "lastName": "Agapova",
  "messageCount": 146,
  "personalChannel": "D5bnnCfaJTROucDT",
  "personalChannelDate": {
    "$date": "2025-04-25T14:32:24.540Z"
  },
  "lazyCheckDate": {
    "$date": "2025-08-18T18:33:26.691Z"
  },
  "automaticCheckDate": {
    "$date": "2025-08-19T10:18:39.864Z"
  },
  "username": "agapova_autonomous",
  "remainingTime": {
    "$date": "2025-08-19T08:03:57.413Z"
  }
},
{
  "_id": {
    "$oid": "685f074a3770b19a27ab2065"
  },
  "accountId": "5884613514-prefix-female-gidrovell",
  "dc1": "1c89f97560973568435f9ec182937b62ad7734117bc2909ae2f689cee11e08c6dfb891037d3b4687905113876578b52790d669f5835aa1d6fe9eb6240313c12b715a7ee1a809da62b7d3126d566cb2a6150849154990c88e75520a6b91b8bb967f0983ae126e35358c679a68cef530a0fa565c426eeeca10d26f82ed1cf49cf28c2f5946b80f7b61959857bb66140e60434b2339bd41e5db788e9f4375874275ab8088dfdf4a90000548ad10a630777d5296cdfa1ead014b4ede08aef735a168f11a60084419ec6b81585fd4ada51d5b4483ea5d2a978cc3b3eb96b28da5a04743bba0c638d750dd52b4809eb3f5036861324425a9bcb7d7f102ddc684e969fb",
  "dcId": 1,
  "nextApiId": 2040,
  "dateUpdated": {
    "$date": "2025-08-19T10:18:42.770Z"
  },
  "twoFa": false,
  "twoFaDate": {
    "$date": "2025-08-18T10:47:53.011Z"
  },
  "phone": "+543764372815",
  "banned": false,
  "firstName": "Maria",
  "id": "5884613514",
  "lastName": "Tsyganova",
  "messageCount": 25,
  "username": "tsyganova_common",
  "personalChannelDate": {
    "$date": "2025-08-16T21:17:14.994Z"
  },
  "personalChannelError": "CHANNEL_NOT_FOUND",
  "lazyCheckDate": {
    "$date": "2025-08-18T22:22:21.649Z"
  },
  "automaticCheckDate": {
    "$date": "2025-08-19T10:18:42.770Z"
  },
  "remainingTime": {
    "$date": "2025-08-11T12:30:28.667Z"
  }
},
{
  "_id": {
    "$oid": "685f07463770b19a27ab1f45"
  },
  "accountId": "5889169892-prefix-female-gidrovell",
  "dc1": "8a9a6c3ad096e11b19fd4b1e9b7737c32c318f1068c5c654a0bbb93cb42803ec270a0fecb9622b9410f01a26b344e88193703fdd5cbeae7a3a8e103c474b54edf844d5bdf0228b5d73f41038773e73c6001255780c7d187fbf048f261dcd2c50d3f0f74756fb421332d08e7521f31be4d23fc5e853121af29ecd42f6b6bf2a01078e7f9483af6770db2fbe331c5e84432e7a78fb75a065dff5d1a2e18c4bf65c0490c7de0a05eebd5b2b15fa065a43a7e8c954c85df89af5c69a9e7fb8b5fceff3c9db204f4484c03852154d4eafae2798de3199b64d085ef2a0e668721e70149394c66ba8d0c5911180d3f4cbe75256a35d862920295f194d309c35a68d268f",
  "dcId": 1,
  "nextApiId": 2040,
  "dateUpdated": {
    "$date": "2025-08-19T10:20:42.786Z"
  },
  "twoFa": false,
  "twoFaDate": {
    "$date": "2025-08-18T10:47:33.760Z"
  },
  "phone": "+541166863306",
  "banned": false,
  "firstName": "Valeria",
  "id": "5889169892",
  "lastName": "Borisova",
  "messageCount": 33,
  "username": "borisova_super",
  "personalChannelDate": {
    "$date": "2025-08-16T21:17:21.830Z"
  },
  "personalChannelError": "CHANNEL_NOT_FOUND",
  "lazyCheckDate": {
    "$date": "2025-08-18T20:02:39.672Z"
  },
  "automaticCheckDate": {
    "$date": "2025-08-19T10:20:42.786Z"
  },
  "remainingTime": {
    "$date": "2025-08-11T12:08:23.311Z"
  }
},
{
  "_id": {
    "$oid": "683b23d73770b19a277f4394"
  },
  "accountId": "5898872894-prefix-elba",
  "dc5": "2f87eb03b36c817379f2463d360c24b8a96293fecd5908c6cf7349aa4a40beb47fed172e4edabb78e6ecfc0dfc684f400e17b27ab2c7825dc08ab28a54cd8393d16c3fa8d57adcfb8790a6339390a94699610da1fd5e6a40bc0b433822a86b0bc95889f6411ca8391cf43725809b15bd01e3db0e6652bee30bf7eda3a9f0a86bb48f1b54fc5935094369d2566822754fd89f79c58f4d8da51f80e8111b78bf33ba03e33ae76fb193f514400549bbbc2d33814e0861ea1dad9b7cbba3003d2627f1596703d5ed9382d120b0be3a7f81449cb6941279c418da93be5932ee038aa9b5aae6e7dfff7c6bf2e9e277bd2a9db7bbbd4eaff051fab8ab4d6f51a4516d2f",
  "dcId": 5,
  "nextApiId": 2040,
  "dateUpdated": {
    "$date": "2025-08-19T10:13:23.975Z"
  },
  "twoFa": false,
  "twoFaDate": {
    "$date": "2025-08-18T00:42:30.838Z"
  },
  "phone": "+6289676192697",
  "banned": false,
  "firstName": "Vitaly",
  "id": "5898872894",
  "lastName": "Ermakov",
  "messageCount": 9,
  "username": "ermakov_electoral",
  "personalChannel": "VfhzmuAM6pyRIcDx",
  "personalChannelDate": {
    "$date": "2025-05-31T16:36:00.724Z"
  },
  "lazyCheckDate": {
    "$date": "2025-08-18T14:08:04.268Z"
  },
  "automaticCheckDate": {
    "$date": "2025-08-19T10:13:23.975Z"
  },
  "remainingTime": {
    "$date": "2025-08-09T11:03:41.875Z"
  },
  "historySpamBlocks": [
    {
      "spamBlockDate": {
        "$date": "2025-08-10T09:31:00.000Z"
      },
      "spamBlockDays": 1
    }
  ]
},
{
  "_id": {
    "$oid": "680b9473461801f599601932"
  },
  "accountId": "5908165846-prefix-female-dmp1",
  "dc1": "73dc6c1f7c0cd1de81b22c8a2e21514b3caf3c16e687e8ddb6887aa5e3c3ce4e94b061389894cf4ed64766c759675df621bb5211a1b7a7b74d80ffd621a54ed69e0d2bfaffc2b1421dd568ea61a3464ba089d34792557a611eb42880906f6da37f23df8a13b47a689af7839cb4e69544c153dc43525dfab1f2b80855e16f710fe4ebc2141baa5b12123fcb3eb190b280580d1a86b992b5878400893fb3de7d2ec80d7a90eed8060f6c187925b27e450eef8c623a309abbef8acac0b338787fb41728351f5354d158ff3255bdf42628c2bdec3e60dc815e4fc7452a8516741ff103faac353f2ea9a012b01ebec2003bf82f084a0772c5411f40e63c0d69479434",
  "dcId": 1,
  "nextApiId": 2496,
  "dateUpdated": {
    "$date": "2025-08-19T10:38:39.220Z"
  },
  "twoFa": false,
  "twoFaDate": {
    "$date": "2025-08-18T10:48:00.118Z"
  },
  "phone": "+541171132129",
  "banned": false,
  "firstName": "Ekaterina",
  "id": "5908165846",
  "lastName": "Nikitina",
  "messageCount": 137,
  "personalChannel": "TvHBRdZn2fXwqVUW",
  "personalChannelDate": {
    "$date": "2025-04-25T14:32:14.300Z"
  },
  "lazyCheckDate": {
    "$date": "2025-08-18T19:01:04.921Z"
  },
  "automaticCheckDate": {
    "$date": "2025-08-19T10:38:39.220Z"
  },
  "username": "nikitina_olympic",
  "remainingTime": {
    "$date": "2025-08-19T05:11:48.363Z"
  },
  "historySpamBlocks": [
    {
      "spamBlockDate": {
        "$date": "2025-05-06T11:22:00.000Z"
      },
      "spamBlockDays": 1
    }
  ]
},
{
  "_id": {
    "$oid": "685f074b3770b19a27ab20ca"
  },
  "accountId": "5916288872-prefix-female-gidrovell",
  "dc1": "304f2c2d2c78e74d234968129dd47461bbeeea05be232911612a1d5f805d72520b65043bebf7ebe63916a196667423f5401a8e6f4e528c741ab3b26ca97a8448b3bc217ce9a3ab54565e9fec21b1d54b6a96754ff06dd8ab2a3e7821cfeae64f999c59f007283db0f844f5eabc581b47776e06befd096a5bd5ee9fc95c93d0f7f1eaf0fec125903b3d72b3ed2859ef148dbea6ad6cf927a0669b307d8784fcb2cdfaf8680ebc0d3e502bf35036cec6f0aa4df84c6aa05d949fdb22daf7acb1a0b800097e616a0fed698f8eb517ae1ac01d8c2b96d6432ec8f9c9ff1c0d09c260f8be190ce88ecc99c52bf177f1ad981e5252b1b68a1e126bfcfd77204b023995",
  "dcId": 1,
  "nextApiId": 2040,
  "dateUpdated": {
    "$date": "2025-08-19T10:13:22.315Z"
  },
  "twoFa": false,
  "twoFaDate": {
    "$date": "2025-08-18T10:47:55.950Z"
  },
  "phone": "+542281356157",
  "banned": false,
  "firstName": "Maria",
  "id": "5916288872",
  "lastName": "Zaytseva",
  "messageCount": 26,
  "username": "zaytseva_gold",
  "personalChannelDate": {
    "$date": "2025-08-16T21:17:20.219Z"
  },
  "personalChannelError": "CHANNEL_NOT_FOUND",
  "lazyCheckDate": {
    "$date": "2025-08-18T22:12:24.903Z"
  },
  "automaticCheckDate": {
    "$date": "2025-08-19T10:13:22.315Z"
  },
  "remainingTime": {
    "$date": "2025-08-11T12:31:01.596Z"
  },
  "historySpamBlocks": [
    {
      "spamBlockDate": {
        "$date": "2025-07-29T06:46:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-08-08T17:38:00.000Z"
      },
      "spamBlockDays": 3
    }
  ]
},
{
  "_id": {
    "$oid": "683b23d43770b19a277f42b3"
  },
  "accountId": "5922283031-prefix-elba",
  "dc5": "3cf5d4febd9c4456f210e44af01aeef34486a85c4ea4fe82fd652bb2ad1f03c85a827eb1ff6f615938483f2c4b33d4e3bfd4c2eede9b288cc51d097a33128a0d0975ee6dfd5bd7a941d6404b328ad2ab4329799a4dda972e8dc33484134cdd925afcd5ba8298de22ad7724f0b4c8a52b77536b9db31d49de2cf19236834e3837bdc99b7b9faab566fe1cfc915f3cf1f55cbf43a967c9e9a44391e61d043c739c10ada02bc1471688714ab0d9a9320b8f72e0784d235aae6cf7d3cd0cb274e352233a721be08a0d3b2592a7a1955dbe1f70fcc5c5ad5dc23b7d2fbe56f47b37a99dbedd639ddfebf8ff937c329cde7820e501e7b6fd69216ddcaf3c1c66bf294d",
  "dcId": 5,
  "nextApiId": 2040,
  "dateUpdated": {
    "$date": "2025-08-19T10:14:19.821Z"
  },
  "twoFa": false,
  "twoFaDate": {
    "$date": "2025-08-18T00:42:31.420Z"
  },
  "phone": "+6281231863986",
  "banned": false,
  "firstName": "Pavel",
  "id": "5922283031",
  "lastName": "Serov",
  "messageCount": 13,
  "username": "serov_purring",
  "personalChannel": "ab3nuuuQJVNLklLy",
  "personalChannelDate": {
    "$date": "2025-05-31T16:35:10.145Z"
  },
  "lazyCheckDate": {
    "$date": "2025-08-18T18:33:25.049Z"
  },
  "automaticCheckDate": {
    "$date": "2025-08-19T10:14:19.821Z"
  },
  "remainingTime": {
    "$date": "2025-08-09T12:30:51.388Z"
  }
},
{
  "_id": {
    "$oid": "680b9467461801f599601577"
  },
  "accountId": "5924608241-prefix-female-dmp1",
  "dc1": "8b7bfb73e96b9218e09251d19b9d601d1c8cf256cc82c821ade4bb1a1c9ad9ee638703578979afb5702c66952a61c2b74e78d085cd512676319cceca6297415af463a2672a264dfda798f6ec524532c6958269bd14e8cee28d0a1dba1d5d700b8811868f5de5aa8b546b2216be7246c2078ecebe35b1ee48d7c6fe1e4a6f55cc7769369caa558276c75b6b095f8fe90c6fbdc436291166a34f9b8a7d8876e687bf03dce0bc6d35eb80dc6a26ab109b83bc2b84a00a99d9e334ab7a9f507b9e12d4e695a347c8708a0e6dc6101278d5f06ca76b0ebf9bcbe5db0e2cb5c3bbf192a4c4d94adb6cd36e3cb1500ded8c873278b1f133929b0925f735861a9e07d03f",
  "dcId": 1,
  "nextApiId": 2040,
  "dateUpdated": {
    "$date": "2025-08-19T10:34:45.364Z"
  },
  "twoFa": false,
  "twoFaDate": {
    "$date": "2025-04-25T14:00:30.135Z"
  },
  "phone": "+527712015628",
  "banned": false,
  "firstName": "Tatiana",
  "id": "5924608241",
  "lastName": "Panfilova",
  "messageCount": 142,
  "personalChannel": "yBavdUOyDMwsx9fI",
  "personalChannelDate": {
    "$date": "2025-04-25T14:33:34.160Z"
  },
  "lazyCheckDate": {
    "$date": "2025-08-18T20:35:56.783Z"
  },
  "automaticCheckDate": {
    "$date": "2025-08-19T10:34:45.364Z"
  },
  "username": "panfilova_confused",
  "remainingTime": {
    "$date": "2025-08-18T20:38:39.037Z"
  },
  "spamBlockReasons": [
    {
      "reason": "Ive never broken any rules or spammed anyone on Telegram. Because of the messaging restrictions, I cant reach important contacts who dont know about my account yet. This has stalled my work, and Id appreciate it if the restrictions could be lifted.",
      "date": {
        "$date": "2025-08-18T19:26:54.325Z"
      }
    }
  ],
  "historySpamBlocks": [
    {
      "spamBlockDate": {
        "$date": "2025-08-19T19:23:00.000Z"
      },
      "spamBlockDays": 1
    }
  ],
  "spamBlockDate": {
    "$date": "2025-08-19T19:23:00.000Z"
  },
  "spamBlockDays": 1,
  "spamBlockInitDate": {
    "$date": "2025-08-18T19:26:54.330Z"
  }
},
{
  "_id": {
    "$oid": "680b946e461801f5996017a2"
  },
  "accountId": "5925087031-prefix-female-dmp1",
  "dc1": "a5cc066ef812c9a6526e88385e191b7f3ee34b8c60a7d7aa1170bac5cef06a5abbc0c270093b26a66d331fad482821fb1b826448e8bbae588195f74024d9f6e447441fd39b1d9b1328231c421c40e70a24d989443353dce3ef1035a2acd84e2341c07c2892d2172e80bfbf5fe43eba323c1f28237cc9ead0a99fb1728509aadb23b8e955b381184b2426ad586b759539f03d70762f75ccee0a3d3391b0c0f371fa097c59069db99b864a3bd357134900f184556db3d31dbc26719aaba32f2c8cb1babc3521dd699b9f92fc007c64df0614c9cc577233ea30c546c82befd425da91910b6d30dd9cf3e016c543655627b0c50f5e2d8110acb30646f9fbd783a040",
  "dcId": 1,
  "nextApiId": 2496,
  "dateUpdated": {
    "$date": "2025-08-19T10:33:44.581Z"
  },
  "twoFa": false,
  "twoFaDate": {
    "$date": "2025-08-18T10:48:05.939Z"
  },
  "phone": "+56964275440",
  "banned": false,
  "firstName": "Anna",
  "id": "5925087031",
  "lastName": "Filatova",
  "messageCount": 43,
  "personalChannel": "BzVCwn9bGDTepIVM",
  "personalChannelDate": {
    "$date": "2025-04-25T14:33:34.129Z"
  },
  "lazyCheckDate": {
    "$date": "2025-08-18T17:06:14.701Z"
  },
  "automaticCheckDate": {
    "$date": "2025-08-19T10:33:44.581Z"
  },
  "username": "filatova_due",
  "remainingTime": {
    "$date": "2025-08-19T04:39:38.221Z"
  }
},
{
  "_id": {
    "$oid": "680b946e461801f5996017bb"
  },
  "accountId": "5925231430-prefix-female-dmp1",
  "dc1": "1737b3ff241fd78b81d410f3fef105638f60319cfe1f130bc3707dbcd59cbc68739a73332165d65bde1c24ec3b213382b00a73777c45de61d9fd6de6196c8dccaa8331aa60acc40d12c42cd7d6bd0f537195931b625f9e96d3fe577ab080177ecdc90a374d428a3aa27f346f7f2de3b930b0b1375676a39184096c93f5b197c39aa33c7a1d6a6897f6eff386c22c1cf375af23382dc4b5321f09061c369a05c472c24043c140d450e7ccb8cca8bff71c576a05864f89f65b544aae0067a1f180f2fa01ccc5989abaadfde88552ee8d1cf51412643e7f994f1269cf1e21dfe8c5a3ddec6fc818d8a9e6bb15fdcef7367fdb69fc4a0d2cc24dabcacc2857046350",
  "dcId": 1,
  "nextApiId": 2496,
  "dateUpdated": {
    "$date": "2025-08-19T10:31:44.453Z"
  },
  "phone": "+573143189689",
  "banned": false,
  "firstName": "Anastasia",
  "id": "5925231430",
  "lastName": "Bulanova",
  "messageCount": 47,
  "personalChannel": "ZSjGDYoZTTQdQp1h",
  "personalChannelDate": {
    "$date": "2025-04-25T14:33:32.843Z"
  },
  "lazyCheckDate": {
    "$date": "2025-08-19T04:01:53.371Z"
  },
  "automaticCheckDate": {
    "$date": "2025-08-19T10:31:44.453Z"
  },
  "username": "bulanova_criminal",
  "remainingTime": {
    "$date": "2025-08-18T23:39:06.313Z"
  },
  "twoFaDate": {
    "$date": "2025-08-12T11:28:58.748Z"
  }
},
{
  "_id": {
    "$oid": "685f07463770b19a27ab1f2e"
  },
  "accountId": "5937363109-prefix-female-gidrovell",
  "dc1": "311eb0c7422ed298354c7aaa521250402da00db3fa0cf961fc4f74164d681cc14c72f7f1e08e9c1240af4b241bd57cfab0a187c68515664a1719832259187796dc63613bd01b3dae21fd2cf668654b0e686cf02ec258ea7989cbc896663e36c363b903154ea58027f0e8ee123dc326f61c85d059a1524790c267c7363d32da6964b10b2998d39e05b71770b55108f86059a86eb949aa7e5a58378fae50825777624204b72ac93876801b860d72aca1021b830a21432eb1d86c79f456256656ea9497cf13ced165feb6cd96902a87baf91dac99c6265d047fe30177c83c25c30f6f7a45741f94a26a33177abe2dbb92f19c4fedfe1bc3ee995906631effd92341",
  "dcId": 1,
  "nextApiId": 2040,
  "dateUpdated": {
    "$date": "2025-08-19T10:25:41.585Z"
  },
  "twoFa": false,
  "twoFaDate": {
    "$date": "2025-08-18T10:47:33.762Z"
  },
  "phone": "+541123201936",
  "banned": false,
  "firstName": "Irina",
  "id": "5937363109",
  "lastName": "Morozova",
  "messageCount": 26,
  "username": "morozova_rotten",
  "personalChannelDate": {
    "$date": "2025-08-16T21:17:20.422Z"
  },
  "personalChannelError": "CHANNEL_NOT_FOUND",
  "lazyCheckDate": {
    "$date": "2025-08-18T22:05:33.638Z"
  },
  "automaticCheckDate": {
    "$date": "2025-08-19T10:25:41.585Z"
  },
  "remainingTime": {
    "$date": "2025-08-11T12:36:56.210Z"
  }
},
{
  "_id": {
    "$oid": "685f074c3770b19a27ab212c"
  },
  "accountId": "5940070306-prefix-female-gidrovell",
  "dc1": "0fc41beda13902c96eb89f913e14b0c66557371f0f04760f6ad04a615c4b4c89cb7ee073034767006afaa6918e6db65b466f3ae0f16d7efad257b61b3f1fa94af1a47f35908a65e08f38261127d8d103a3aa12d16c8b4ecec5d0e1303764fb224e499a955febcd9f54a2931e52ed515a9f134dfb5103afbd5845c5e9ac01f91c873202c3b38eac024b5862bbe5d90fc091d30f7079185fc8b708770189c698d7890d9f36bc4bb3e4efe76fe8cd66afc78cec8a12389fb85c1dfe51c6d2847a37b8b8fc97fe6eab77151f5170eed85399dc7d972c97f4de806d8ea61ff001272175dcb0961fdae45f388f8cf7f648399a3ff114b18c87729bacde3978ace84a82",
  "dcId": 1,
  "nextApiId": 2040,
  "dateUpdated": {
    "$date": "2025-08-19T10:28:18.208Z"
  },
  "twoFa": false,
  "twoFaDate": {
    "$date": "2025-08-18T10:47:56.683Z"
  },
  "phone": "+541166480255",
  "banned": false,
  "firstName": "Anastasia",
  "id": "5940070306",
  "lastName": "Semenova",
  "messageCount": 35,
  "username": "semenova_implicit",
  "personalChannelDate": {
    "$date": "2025-08-16T21:17:19.951Z"
  },
  "personalChannelError": "CHANNEL_NOT_FOUND",
  "lazyCheckDate": {
    "$date": "2025-08-18T20:30:52.853Z"
  },
  "automaticCheckDate": {
    "$date": "2025-08-19T10:28:18.208Z"
  },
  "remainingTime": {
    "$date": "2025-08-11T12:08:04.145Z"
  },
  "historySpamBlocks": [
    {
      "spamBlockDate": {
        "$date": "2025-08-02T14:12:00.000Z"
      },
      "spamBlockDays": 1
    }
  ]
},
{
  "_id": {
    "$oid": "685f07493770b19a27ab2013"
  },
  "accountId": "5950993271-prefix-female-gidrovell",
  "dc1": "a2ebf9ce2a68cdbc0e542ddc344699300283c1c53c56d0e101a8de963a3f65a5480f60b525ba647c2da937efeabcb89f1084017a736462b58a0db9606d16c389488525496457560efaac3b47fa4c73a5cbb4a9efa56ea79b1930a6e5620590a18e485839c2ea4e190afd082dac71dba85a7825a2c28316110d0fb07d5b5017e443c8017f496e5b83a2a73dd358a04b80743c08bb5917c5062f33d908c9a980edba42d4c5a40c07e64b68bfcc8d337bbe8cb67579492cb93e322ac6fb2778fbeca9c2e8ad1d06cb456f67274ba3243298b3db0dc172824cb7da3fe6a906223ada82b995bca1ff69703740162d9438a733d63eda4115f50270828ac57982146ea0",
  "dcId": 1,
  "nextApiId": 2040,
  "dateUpdated": {
    "$date": "2025-08-19T10:29:42.759Z"
  },
  "twoFa": false,
  "twoFaDate": {
    "$date": "2025-08-18T10:47:42.339Z"
  },
  "phone": "+541125207281",
  "banned": false,
  "firstName": "Inna",
  "id": "5950993271",
  "lastName": "Samoylova",
  "messageCount": 28,
  "username": "samoylova_injured",
  "personalChannelDate": {
    "$date": "2025-08-16T21:17:23.716Z"
  },
  "personalChannelError": "CHANNEL_NOT_FOUND",
  "lazyCheckDate": {
    "$date": "2025-08-18T21:28:06.922Z"
  },
  "automaticCheckDate": {
    "$date": "2025-08-19T10:29:42.759Z"
  },
  "remainingTime": {
    "$date": "2025-08-11T12:30:30.113Z"
  }
},
{
  "_id": {
    "$oid": "683b23eb3770b19a277f4982"
  },
  "accountId": "5951095270-prefix-elba",
  "dc1": "a63b6082069847b5e1b1b73de611f705dfeb4c68f635336a13b30595465d58ecf6502d2e6870e09dd5438352ab99b671a242ab46142f00602346f121d460a1fcfeaaa8cc7f7bcadb8c199961144809ef4f4e2b3f976cbd9387f0bfdd7bdfad3ac04796b553d9f8d89dd91fc522ca699b44ec5230fcb41fc27edc69ea0daef7c57150b6e15ecdcf45e2a99adaf04bb39b9211b1f6bf90be19859571964e343b71408da26b1a17890dd7686ade055b4879b37a4ff0319932a9ab74514687dfb909651aa4bafeadddfbdd90b0a808746f25ee1fb07b07ddb74238358dc589206487eb5614b52899d2cc52dc30bcfecc784771ad21221f6b59a603cb6a38c6f4ac7f",
  "dcId": 1,
  "nextApiId": 2040,
  "dateUpdated": {
    "$date": "2025-08-19T10:19:33.892Z"
  },
  "twoFa": false,
  "twoFaDate": {
    "$date": "2025-08-12T13:06:41.225Z"
  },
  "phone": "+573156333581",
  "banned": false,
  "firstName": "Artem",
  "id": "5951095270",
  "lastName": "Zhukov",
  "messageCount": 5,
  "username": "zhukov_classical",
  "personalChannel": "ybbN5ijUkVVcDDwb",
  "personalChannelDate": {
    "$date": "2025-05-31T16:35:32.753Z"
  },
  "lazyCheckDate": {
    "$date": "2025-08-19T00:31:41.899Z"
  },
  "automaticCheckDate": {
    "$date": "2025-08-19T10:19:33.892Z"
  },
  "remainingTime": {
    "$date": "2025-08-11T10:58:17.744Z"
  }
},
{
  "_id": {
    "$oid": "683b23db3770b19a277f44ce"
  },
  "accountId": "5951637637-prefix-elba",
  "dc5": "911dbfd1c5c2146a93a2f97825f03536074377b3b691ea553dbb95da8add3957629b1265ac048b792c475a83c8a781fefff99ecafefdf82f988b1b75cf22c5b4e3c6f36410bb56a0e1701e8232132b1ffaf22b836f78ec74c029a054baaebe0ebdcc9e9f86c3a7896dc16b76766069b008929726c504c385337e2649a34f899397a92848908b918625346273fe0c2b90058f9137b8b5a7adbfb6ef668b11a51569f96e63d350854ee171efbaca2b270135112688ed129478ac101e9c5b0252c145e950a1676c91144bca670e4dee8debd9aa442e180a37c326e1bf907fb1bc2d1cb8e9f8e7a30d634c158d46e004adc0c536ed1cc33e16d962ca5776cb1f33c4",
  "dcId": 5,
  "nextApiId": 2040,
  "dateUpdated": {
    "$date": "2025-08-19T10:33:24.122Z"
  },
  "twoFa": false,
  "twoFaDate": {
    "$date": "2025-08-18T00:42:30.864Z"
  },
  "phone": "+6289505668736",
  "banned": false,
  "firstName": "Egor",
  "id": "5951637637",
  "lastName": "Romanov",
  "messageCount": 14,
  "username": "romanov_secure",
  "personalChannel": "QVYSIbIT0pHvHLvD",
  "personalChannelDate": {
    "$date": "2025-05-31T16:33:37.463Z"
  },
  "lazyCheckDate": {
    "$date": "2025-08-18T18:28:24.602Z"
  },
  "automaticCheckDate": {
    "$date": "2025-08-19T10:33:24.122Z"
  },
  "remainingTime": {
    "$date": "2025-08-11T16:21:21.849Z"
  }
},
{
  "_id": {
    "$oid": "685f074b3770b19a27ab20e7"
  },
  "accountId": "5964129102-prefix-female-gidrovell",
  "dc1": "3f8bfcfb5ee6ef67b371f6d6d79c97d9979e6c0f67abdf6663a6f115486aa507d7d204f80642f4075ec90511835f5ecd2b3ffb5a8c2182f3d32715c02defe7ced2d734fb3650937e47336934ec615af9551bf42ce5ab9473c2b0de8204533337597430cc490ef49a3b80680e74cdc69c31a9abc1c4809a3c55d9084b173f190cf62bb55296542153e88592092894e1f3389e290ab3575f2558ab9b3adf73ced04bdd8c1cfd55c5196388c89c1f3940c64cc5309249ecef042765316b3389a9422fe694cc0277c93bac79d42a95314b32ed0b527f699b6405266b817861be00772d45659c26c1842079f1da536b75e238b0a92368bc9b00c22aebf368115addeb",
  "dcId": 1,
  "nextApiId": 2040,
  "dateUpdated": {
    "$date": "2025-08-19T10:21:16.864Z"
  },
  "twoFa": false,
  "twoFaDate": {
    "$date": "2025-08-18T10:47:56.707Z"
  },
  "phone": "+542364534350",
  "banned": false,
  "firstName": "Elena",
  "id": "5964129102",
  "lastName": "Belova",
  "messageCount": 34,
  "username": "belova_romantic",
  "personalChannelDate": {
    "$date": "2025-08-16T21:17:17.759Z"
  },
  "personalChannelError": "CHANNEL_NOT_FOUND",
  "lazyCheckDate": {
    "$date": "2025-08-18T22:21:24.415Z"
  },
  "automaticCheckDate": {
    "$date": "2025-08-19T10:21:16.864Z"
  },
  "remainingTime": {
    "$date": "2025-08-11T12:05:37.493Z"
  }
},
{
  "_id": {
    "$oid": "680b946f461801f5996017ca"
  },
  "accountId": "5969957888-prefix-female-dmp1",
  "dc1": "375b3f146b516abd7b84a95cdd56402b73f499c35c7d3553f392f3e782acc950649b4596c59cc57f18b21866a820dce895ea1e428c513dc235c916d6d935448dca6884b915691c7a9f5032563c1e5b50a59ae85cb8094b2c302d56d40214a8910af28886aa5d9339c7431c0c12b68e0741f59c7759888eea4190b8dd5f066efcc8a880c609e60a7cb956e54887614bfcdd1100b1826c3905970fca74692e7574c45db3ccfccd8793697ac39cfae4e3a51d398814ef5208ae889f698a66ee33a22401403222db696bb05233268f0ce5597adcdcc18ae6d8de88e6c9d41a7b828db23050a59ac5e70f0d3662c6244dca3a2865492b20530fcec02f8a2aaf967542",
  "dcId": 1,
  "nextApiId": 2040,
  "dateUpdated": {
    "$date": "2025-08-19T10:17:43.749Z"
  },
  "twoFa": false,
  "twoFaDate": {
    "$date": "2025-08-18T10:48:05.927Z"
  },
  "phone": "+573165516050",
  "banned": false,
  "firstName": "Lubov",
  "id": "5969957888",
  "lastName": "Terekhova",
  "messageCount": 47,
  "personalChannel": "FvXP7mXZHydTcFIn",
  "personalChannelDate": {
    "$date": "2025-04-25T14:34:35.400Z"
  },
  "lazyCheckDate": {
    "$date": "2025-08-18T13:29:59.203Z"
  },
  "automaticCheckDate": {
    "$date": "2025-08-19T10:17:43.749Z"
  },
  "username": "terekhova_zany",
  "remainingTime": {
    "$date": "2025-08-19T02:35:23.932Z"
  }
},
{
  "_id": {
    "$oid": "685f074f3770b19a27ab21fb"
  },
  "accountId": "5973173077-prefix-female-gidrovell",
  "dc1": "87d4511ba84c758c2a8bf2855c2e2ec6b9bf2e8a05208e7fafbc452c548dc9e2418f2a97ac1f5b328e859397236dae01ef0925d01405130c7f418a42124fd6073eb59da6a82b183cc8b2fdc17edbb2945572d943aee167c26ad271ca7df2ebe90aed2b2bf4508baba25d23e5f79527a51dc7493a2c8e2eae6f59a6e847b03ac9608ccc09e07f0f0cd4d09d0898c6bf37a845f11581d4bee50d8d761cf4d25842c6b5bdcd5ebee51c7d11f35e8c5134c7fdd2d822fa715b2a54bb678c1b926cd733f88fc9c8c8c91dd7fb99c56386b38b8236a9e85fe603910333b334257be0f4320c0a5a1541f213cd78f1ac4990daa618457038807de371309446e40066d737",
  "dcId": 1,
  "nextApiId": 2040,
  "dateUpdated": {
    "$date": "2025-08-19T10:28:27.975Z"
  },
  "twoFa": false,
  "twoFaDate": {
    "$date": "2025-08-18T10:47:58.146Z"
  },
  "phone": "+529581430651",
  "banned": false,
  "firstName": "Arina",
  "id": "5973173077",
  "lastName": "Ignatova",
  "messageCount": 14,
  "username": "ignatova_faint",
  "personalChannelDate": {
    "$date": "2025-08-16T21:17:20.220Z"
  },
  "personalChannelError": "CHANNEL_NOT_FOUND",
  "lazyCheckDate": {
    "$date": "2025-08-19T00:00:28.311Z"
  },
  "automaticCheckDate": {
    "$date": "2025-08-19T10:28:27.975Z"
  },
  "remainingTime": {
    "$date": "2025-08-06T14:09:46.118Z"
  },
  "historySpamBlocks": [
    {
      "spamBlockDate": {
        "$date": "2025-07-05T08:06:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-07-09T11:35:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-07-25T10:28:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-08-01T11:17:00.000Z"
      },
      "spamBlockDays": 7
    },
    {
      "spamBlockDate": {
        "$date": "2025-09-05T12:39:00.000Z"
      },
      "spamBlockDays": 30
    }
  ]
},
{
  "_id": {
    "$oid": "680b946f461801f5996017d5"
  },
  "accountId": "5978081724-prefix-female-dmp1",
  "dc1": "6ee086709b112092a841a354dfee9694abf081b317af5b2dc5c9c6df3555561abd501d48570c15dbbc13a56218e74bc55aff7594077cf431b38139418f204e86ff8b50d37e0a8ed835a5758ef1d53713f65bb0520ee1dbbc1e31580e23749db3ae9e9370cb025f305b243ec5ce5ec0b712eff599faa6a11c529d26f025b1b8f87fd4d3bf1b82dd4cc6f01e99762fc179a726204ffc05b8046e3d080a6f6a1fd80998f571403589dfe3b4ac8c383eabed5d9e5218d2f257c8cec91ac715c7f426e3401e4badd27e39edbe7cf7173e2a8b91c6d24afffcb77540cddb61207fcda9d4bf4224c8d963d1e85dc0447291895f70b2e46da6d4775596fc1a719d81598e",
  "dcId": 1,
  "nextApiId": 2040,
  "dateUpdated": {
    "$date": "2025-08-19T10:34:44.509Z"
  },
  "twoFa": false,
  "twoFaDate": {
    "$date": "2025-08-18T10:48:07.877Z"
  },
  "phone": "+5592985231948",
  "banned": false,
  "firstName": "Rita",
  "id": "5978081724",
  "lastName": "Romanova",
  "messageCount": 136,
  "personalChannel": "PsUtLdL7mYgJLMJn",
  "personalChannelDate": {
    "$date": "2025-04-25T14:32:04.725Z"
  },
  "lazyCheckDate": {
    "$date": "2025-08-19T02:01:05.862Z"
  },
  "automaticCheckDate": {
    "$date": "2025-08-19T10:34:44.509Z"
  },
  "username": "romanova_recent",
  "remainingTime": {
    "$date": "2025-08-19T07:15:34.457Z"
  },
  "historySpamBlocks": [
    {
      "spamBlockDate": {
        "$date": "2025-04-28T18:58:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-08-18T14:48:00.000Z"
      },
      "spamBlockDays": 1
    }
  ]
},
{
  "_id": {
    "$oid": "680b9469461801f59960161d"
  },
  "accountId": "5983078677-prefix-female-dmp1",
  "dc1": "bdb089faea0ece0c825e0a1dbed57ee293b9b8192c0386779dde8e9a8bde70308c47410bb29682bc247c42c41b4133f4c423c26738dbbeb77c07116189ccfaa79b6f74489780680ea68e3c3d7fabc9c4db560f021e7892f10757f7f1ae63a50b1c5154e6b4c7316ef679616df792ef6d3d3714506656ca7497587f660ea12ae198cd49b4d93c8f6f3d54fd24dd6294298acaff78dc9304df17fcd06890535765715a6556e5a057b4fec0487b421199f1011c02fd7bfb07a8daaf9d76b8c599d5adeec800db687b719e286446e97f03ac27b344b4e7aef5364a3463c7421f7736f473311725984394ab65e586ad8c73937c734e42bd076ba29a534cd27dcf8727",
  "dcId": 1,
  "nextApiId": 2040,
  "dateUpdated": {
    "$date": "2025-08-19T10:21:44.300Z"
  },
  "twoFa": false,
  "twoFaDate": {
    "$date": "2025-08-18T10:47:58.984Z"
  },
  "phone": "+543573446833",
  "banned": false,
  "firstName": "Anfisa",
  "id": "5983078677",
  "lastName": "Kozlova",
  "messageCount": 138,
  "personalChannel": "aVUczlYfWuYWsQ3b",
  "personalChannelDate": {
    "$date": "2025-04-25T14:33:33.014Z"
  },
  "lazyCheckDate": {
    "$date": "2025-08-18T21:32:59.157Z"
  },
  "automaticCheckDate": {
    "$date": "2025-08-19T10:21:44.300Z"
  },
  "username": "kozlova_unexpected",
  "remainingTime": {
    "$date": "2025-08-19T08:25:06.204Z"
  },
  "historySpamBlocks": [
    {
      "spamBlockDate": {
        "$date": "2025-05-02T07:29:00.000Z"
      },
      "spamBlockDays": 1
    }
  ]
},
{
  "_id": {
    "$oid": "680b946a461801f599601660"
  },
  "accountId": "6005290363-prefix-female-dmp1",
  "dc1": "41a0165aa599ccf29cdfd90dacf8f9d3d1ed5e9846d54a6283cb7582cb2e73bf502fdb0ff8ddd81d757a48fff280c3d0b9f6eede3866d1251950e2be58cbf656a926e02ef87fd40140a77aeae81402955247d40d6d1069d5edec579303abe34f12c1ef211f3e2472a46654a440722f81a2cf349e613aeeb5c712d9d1ecb0c76500c11c75aa79ac7b88188e37ff5e693ba7368183951dba0c924581db5b33c05576dfa868b58de443b9691af9840effa96f5abe7cd042b4c64225761e06200dea28959995da029b414a504029d1829a2269a0f14a9a02984c2f4938019f57bab4655deed187bd0e39e472596ce7e6f4b6db4150f7cff1ded0e2d38ff9038f66af",
  "dcId": 1,
  "nextApiId": 2496,
  "dateUpdated": {
    "$date": "2025-08-19T10:26:44.097Z"
  },
  "twoFa": false,
  "twoFaDate": {
    "$date": "2025-08-18T10:48:00.257Z"
  },
  "phone": "+5512996250839",
  "banned": false,
  "firstName": "Galina",
  "id": "6005290363",
  "lastName": "Antonova",
  "messageCount": 149,
  "personalChannel": "GtjUVvvFoHfMSwD1",
  "personalChannelDate": {
    "$date": "2025-04-25T14:34:21.431Z"
  },
  "lazyCheckDate": {
    "$date": "2025-08-18T20:02:24.115Z"
  },
  "automaticCheckDate": {
    "$date": "2025-08-19T10:26:44.097Z"
  },
  "username": "antonova_socialist",
  "remainingTime": {
    "$date": "2025-08-19T09:10:00.489Z"
  },
  "historySpamBlocks": [
    {
      "spamBlockDate": {
        "$date": "2025-04-28T10:18:00.000Z"
      },
      "spamBlockDays": 1
    }
  ]
},
{
  "_id": {
    "$oid": "685f07503770b19a27ab2254"
  },
  "accountId": "6017511572-prefix-female-gidrovell",
  "dc1": "822ac8438be41895f6734d42b46314f4ef09a6fb4a429c1240c88a8a311e7f746a213e701c324482e5b50cbd26aa23149e203735bac5e6632b2abdfc3af73dfb890020d35ac210d28736d88c16ffa564bf02b274d332ca46cf9b58e21b83f65976d0dc04a0f87947763dcbf6c519c3ea78e0b6f9d447f75a9161d69f404c8bfb22183cef4b92b9f67b78a8435576f17d886cfb6410fdb4e578117693014931b3c80c81ca05bb569c9017ecc28580d8ab10cc251aa18dc711528bcffd8e2ccae15938eb852367de4e2a66ad1df6b7b3a776eacb87292233bf67b6e6bddda474f3c75f33ff7b1320d3d5aecc766e4b66bf3fc3c15f41c1e6f0196e493cf8168efc",
  "dcId": 1,
  "nextApiId": 2040,
  "dateUpdated": {
    "$date": "2025-08-19T10:39:30.936Z"
  },
  "twoFa": false,
  "twoFaDate": {
    "$date": "2025-08-18T10:48:02.600Z"
  },
  "phone": "+529811318933",
  "banned": false,
  "firstName": "Rita",
  "id": "6017511572",
  "lastName": "Orlova",
  "messageCount": 29,
  "username": "orlova_amaranth",
  "personalChannelDate": {
    "$date": "2025-08-16T21:17:16.808Z"
  },
  "personalChannelError": "CHANNEL_NOT_FOUND",
  "lazyCheckDate": {
    "$date": "2025-08-18T22:02:27.485Z"
  },
  "automaticCheckDate": {
    "$date": "2025-08-19T10:39:30.936Z"
  },
  "remainingTime": {
    "$date": "2025-08-11T12:29:59.186Z"
  }
},
{
  "_id": {
    "$oid": "685f074f3770b19a27ab2218"
  },
  "accountId": "6023045521-prefix-female-gidrovell",
  "dc1": "0a2dbee62ecb1da5955dc1569a70cc7abb220a9188b8f8b33c82b2c4daabb260fbf0179c2a7cf36e406fdcc46dc78ff151f5d9c55324c1aef956a4ec99c53c01f79d6587bcf58edd321c62dfa392f3cb2db6aef02be16ced206de92e9ee3b7420dfefe88721c53504d778ece199ee6f7feb3fe8fa6664049cf802eb21182d95a57b3b7f1e965412bbb049bdeb9367a17871797cfd4ea08c47ffe681f73c0916e41bc599247d20040735738e8f33dc25dd7697bbe562954e74bafeb416983e770cafeaafbb9450099fcb6d2e452cc230f1d29f04e304a6ecefbc089d8a7e208d2e35bd5610897cf79a77e54a32584cfd0046dae04ca0a5ecaa5aab15695c71cb6",
  "dcId": 1,
  "nextApiId": 2040,
  "dateUpdated": {
    "$date": "2025-08-19T10:29:29.834Z"
  },
  "twoFa": false,
  "twoFaDate": {
    "$date": "2025-08-18T10:48:06.973Z"
  },
  "phone": "+527295318191",
  "banned": false,
  "firstName": "Inna",
  "id": "6023045521",
  "lastName": "Sokolova",
  "messageCount": 34,
  "username": "sokolova_equal",
  "personalChannelDate": {
    "$date": "2025-08-16T21:17:17.219Z"
  },
  "personalChannelError": "CHANNEL_NOT_FOUND",
  "lazyCheckDate": {
    "$date": "2025-08-18T21:40:11.903Z"
  },
  "automaticCheckDate": {
    "$date": "2025-08-19T10:29:29.834Z"
  },
  "remainingTime": {
    "$date": "2025-08-11T12:25:40.666Z"
  }
},
{
  "_id": {
    "$oid": "683b23da3770b19a277f4449"
  },
  "accountId": "6023610511-prefix-elba",
  "dc5": "3b95e68f9d635ae2b445e332a9213049d86f0edcbfd541039e437483a858b305497508068d0f8fadd1a9a588ffba5e9b310bb5721f5fe9c9297fe018379ce664218a95f8af84bb3ccb367d8a8945f6a12f3c2dbf245d5a3a22c61678732579468bb3e563aa4f170544c0431d38c0979199d760c728efe196b123612e7049627cb685c778db528bd6be6da184ebd4d4cd78bfb1b1fcd13699751ebce02eccf51fa61d4dc657d66f1a105e6cd8de9356a452836f9c4a1172251fb16da4b0a08e54cb672cc0e8ca9d59cfc536a3244ab8ed20f375cb6416b516a3f76a9e763d1ab4b9c2c12b21aab1328e957c5cdb1d71ab48613ae8cf7f1f5550a0e6770050415e",
  "dcId": 5,
  "nextApiId": 2040,
  "dateUpdated": {
    "$date": "2025-08-19T10:20:30.914Z"
  },
  "twoFa": false,
  "twoFaDate": {
    "$date": "2025-08-18T00:42:33.777Z"
  },
  "phone": "+6289663707890",
  "banned": false,
  "firstName": "Viktor",
  "id": "6023610511",
  "lastName": "Lapshin",
  "messageCount": 12,
  "username": "lapshin_precious",
  "personalChannel": "X8WElyjmnKZtYdmL",
  "personalChannelDate": {
    "$date": "2025-05-31T16:31:02.379Z"
  },
  "lazyCheckDate": {
    "$date": "2025-08-18T22:21:28.382Z"
  },
  "automaticCheckDate": {
    "$date": "2025-08-19T10:20:30.914Z"
  },
  "remainingTime": {
    "$date": "2025-08-09T12:17:48.997Z"
  }
},
{
  "_id": {
    "$oid": "680b9468461801f5996015f9"
  },
  "accountId": "6031513704-prefix-female-dmp1",
  "dc1": "3ded72faaf27aa96cef73d5f44583efbc2b57afb8262ee3b6a7526d8e566e40957f8d7d296380f9808e290f3c15997151ca47dc9f19c5536a52ff4ed295e78a784b3e640c01bbbc1143bc5201ac56c854b0d50b8dc6b9ec155a46ee36c0e23ef7b3a65713611bb2a1999399141d6173a8cf20592d860457cd34e7f9ec9ca8328f488e046e964e9ce66a8a7654258c81a4f628672691f38eb813f87003c9e0f8e87481c347d7cd584fb4b9685570408847c7ca6ec896e075327cec3e16db22f7c030782db6462e36fece32ba7cd5d947ee51dffe1c096b8b5da041a25127dd2fbe88e8af3a83c3dcd82fa867ad1cd24382fbed552c1102375db8419195a2501b5",
  "dcId": 1,
  "nextApiId": 2496,
  "dateUpdated": {
    "$date": "2025-08-19T10:29:42.276Z"
  },
  "twoFa": false,
  "twoFaDate": {
    "$date": "2025-08-18T10:47:57.349Z"
  },
  "phone": "+573108789936",
  "banned": false,
  "firstName": "Galina",
  "id": "6031513704",
  "lastName": "Ignatova",
  "messageCount": 45,
  "personalChannel": "HDIuV8eZVpZQXvlf",
  "personalChannelDate": {
    "$date": "2025-04-25T14:34:00.415Z"
  },
  "lazyCheckDate": {
    "$date": "2025-08-18T21:42:08.657Z"
  },
  "automaticCheckDate": {
    "$date": "2025-08-19T10:29:42.276Z"
  },
  "username": "ignatova_collective",
  "remainingTime": {
    "$date": "2025-08-19T04:42:33.927Z"
  },
  "historySpamBlocks": [
    {
      "spamBlockDate": "INFINITY",
      "spamBlockDays": 0
    }
  ]
},
{
  "_id": {
    "$oid": "685f074a3770b19a27ab2024"
  },
  "accountId": "6033309263-prefix-female-gidrovell",
  "dc1": "151fc6f410aabd58ed4c83009f4e4aeaad4dc370cbef7cba304c4267043fc2c8a9dbd7ad2bf4316db0514af9c7d93c220a39e5ce6c41b08782e9b087366a43d804d04d96e867f21e3d6b5d621cf8b428b52387537506484a270de80cf824b14dfef5943e67999857ee6328e1be5e97cad9a66a720e020ccbfb9f2ab2aecadcbedb1ad87418d977c7b5bc565e728503470690f7f62addc85fbed9c29fc709fcc064017fdc73c278671ff02f0ab9eb742bbdde9f56a45822aea7d583dc65d95ef363feb5622a74b5d0b8881848cb1c512e9a32f9c3828a8cd3565b3cb06d79aa8a6ddd797c415a7e53767f94812fd0972ff0f958d31bdc01cb7ed1af070407bad6",
  "dcId": 1,
  "nextApiId": 2040,
  "dateUpdated": {
    "$date": "2025-08-19T10:19:43.262Z"
  },
  "twoFa": false,
  "twoFaDate": {
    "$date": "2025-08-18T10:47:42.762Z"
  },
  "phone": "+541131625402",
  "banned": false,
  "firstName": "Yana",
  "id": "6033309263",
  "lastName": "Gavrilova",
  "messageCount": 31,
  "username": "gavrilova_faithful",
  "personalChannelDate": {
    "$date": "2025-08-16T21:16:55.194Z"
  },
  "personalChannelError": "CHANNEL_NOT_FOUND",
  "lazyCheckDate": {
    "$date": "2025-08-18T22:00:35.672Z"
  },
  "automaticCheckDate": {
    "$date": "2025-08-19T10:19:43.262Z"
  },
  "remainingTime": {
    "$date": "2025-08-06T14:11:45.403Z"
  }
},
{
  "_id": {
    "$oid": "680b9473461801f59960193c"
  },
  "accountId": "6037873912-prefix-female-dmp1",
  "dc1": "2e9bcddc35ae69a97668aa3e24611cb7ddf9ab141a982a23b429f74cd20e81987e5754b8e272d9a37340acc93196c3c0456730566e383fb98519bf2121c6a2502036361160f491a80b01cef7e44998a8153de48e63e976b28b5f4f4b3990aa61022abb8caa027a580486b1aa24537537e3cf0b935ad97cd36e0e444aa3ef2fd3050c50bf13d4dad0a7ee158e1f1a90edb218ce9e52a8d54550ce7b80a4824b23abcee23a42904fd24bcb9469527e8cce6c573d7a6d5731fa0bf333a1f5c418c55c48fc922a243058052361dd7a6806e3cfc97e343a7121c3ad7fff7396c5cb829c6a455caa33132b24f45e0d8324151bae2d1316d22cfd81d36f3973a0e7a204",
  "dcId": 1,
  "nextApiId": 2496,
  "dateUpdated": {
    "$date": "2025-08-19T10:33:27.350Z"
  },
  "twoFa": false,
  "twoFaDate": {
    "$date": "2025-08-18T10:48:01.457Z"
  },
  "phone": "+541160176647",
  "banned": false,
  "firstName": "Alisa",
  "id": "6037873912",
  "lastName": "Belova",
  "messageCount": 114,
  "personalChannel": "SrvCm6QJxmeAjoUl",
  "personalChannelDate": {
    "$date": "2025-04-25T14:31:15.448Z"
  },
  "lazyCheckDate": {
    "$date": "2025-08-18T14:57:21.478Z"
  },
  "automaticCheckDate": {
    "$date": "2025-08-19T10:33:27.350Z"
  },
  "username": "belova_preliminary",
  "remainingTime": {
    "$date": "2025-08-19T09:47:51.107Z"
  },
  "historySpamBlocks": [
    {
      "spamBlockDate": {
        "$date": "2025-08-14T11:57:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-08-15T12:07:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-08-19T07:22:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-08-26T07:48:00.000Z"
      },
      "spamBlockDays": 7
    }
  ],
  "spamBlockDate": {
    "$date": "2025-08-26T07:48:00.000Z"
  },
  "spamBlockDays": 7,
  "spamBlockInitDate": {
    "$date": "2025-08-19T08:54:35.699Z"
  }
},
{
  "_id": {
    "$oid": "685f07493770b19a27ab2018"
  },
  "accountId": "6075368446-prefix-female-gidrovell",
  "dc1": "40bd76fb28ebb3f11d1fb0be49dbddf3f53a34f951288c2e9d5a58255f6bf6192f73b7c31c951bdd1b1156ee436310cf6d265a53bb413a8f4b2a83be51a22b0b4cbb5f052869f3415037e93072d48a8db5f990d9f9c5434d8f6cea50d25956225d5ddd8149bf25ad58ba2c4ed539629269377130033f69d995565c9c827d116d66fa6d2fcd506baba4732facc29c73e0b5d1190534bdd3ab2cf53686149b43c4628de46b62c85858410c842d9aeac0c2e5b1d2390cc01349af7420d0be8b01983e03ed5f6472181d15935c240ecdf22daa0b24d31495dd644f77c5e5c44e79571e9670abdf3852363826e716828e2b5257230e0b5028f59604e1d25e4aacf3f6",
  "dcId": 1,
  "nextApiId": 2040,
  "dateUpdated": {
    "$date": "2025-08-19T10:17:43.078Z"
  },
  "twoFa": false,
  "twoFaDate": {
    "$date": "2025-08-18T10:47:40.800Z"
  },
  "phone": "+543873437419",
  "banned": false,
  "firstName": "Olga",
  "id": "6075368446",
  "lastName": "Suvorova",
  "messageCount": 31,
  "username": "suvorova_chocolate",
  "personalChannelDate": {
    "$date": "2025-08-16T21:17:23.720Z"
  },
  "personalChannelError": "CHANNEL_NOT_FOUND",
  "lazyCheckDate": {
    "$date": "2025-08-18T22:16:35.064Z"
  },
  "automaticCheckDate": {
    "$date": "2025-08-19T10:17:43.078Z"
  },
  "remainingTime": {
    "$date": "2025-08-11T12:28:40.737Z"
  }
},
{
  "_id": {
    "$oid": "685f07463770b19a27ab1f1a"
  },
  "accountId": "6093723099-prefix-female-gidrovell",
  "dc1": "73c2520883981a95051c13cd3dc67228c910d7830cc2705147b4bb9238fbabb7e12459aaa74fc20803747902466ea9823465b8be6da52d8b157057ea1eb3eff6a6060551a1a0cca97bb9cd07f2d24a3881c2adfc4fa0cbd3bd0327b0570865cd572af1b7a7aab119ee22ba2a625e0b19163924d201283761776d94c6ebf4fb607cb30d26de84ca6e7b2d423044ddb0b7275fcacf49c6744ed1fc4c948d3bdc57e2dbd2a2f7a8fcb46323eed403fec8bfd7c52e8a06f367b8b12f8fba721d3e41bb24105ec2a53235ef67694984d4133d09c2055181247646373ac8de6560c8936197e31ba710fc896c529463e7ab93ea2d90dc588fc3c679de514f72f3b46e0e",
  "dcId": 1,
  "nextApiId": 2040,
  "dateUpdated": {
    "$date": "2025-08-19T10:33:41.503Z"
  },
  "twoFa": false,
  "twoFaDate": {
    "$date": "2025-08-18T10:47:31.341Z"
  },
  "phone": "+541133990146",
  "banned": false,
  "firstName": "Rita",
  "id": "6093723099",
  "lastName": "Khokhlova",
  "messageCount": 28,
  "username": "khokhlova_scarlet",
  "personalChannelDate": {
    "$date": "2025-08-16T21:17:20.428Z"
  },
  "personalChannelError": "CHANNEL_NOT_FOUND",
  "lazyCheckDate": {
    "$date": "2025-08-18T17:56:18.453Z"
  },
  "automaticCheckDate": {
    "$date": "2025-08-19T10:33:41.503Z"
  },
  "remainingTime": {
    "$date": "2025-08-11T12:28:18.962Z"
  }
},
{
  "_id": {
    "$oid": "685f074b3770b19a27ab20e4"
  },
  "accountId": "6099761860-prefix-female-gidrovell",
  "dc1": "3020ca0b1b698acd0cf0b9e8ecf082a8536ed66d0dd879b1630029c676549c0213c976ab45e5e53aa8e68e4a42094767a3fb7ff27afeb6538a0e1a5b36e0bee24f2757b46d6ac75bd2084114e25e969dabaaeebb90828ab75f86d01e7847763bdbc2ecf711f9509dfff76add4c20df7eb1ddab3c41dde9d5734917891d0b262423e4431f3d4bf7fdb159dc1d86ba186559e140898c0adef5fc678ce80f9a73ceee75101e725723c7cec30cff603ef144c9d8f42020b6b457f0769e84a24f0b1c7db3c4795ef56aef5fcc6f6cfb88f3b88089bd806415055b95df794899447f11c44c4478e7227952fffdad00fe15f8e72d77f668a0b5f87e7725c0467cb6a30e",
  "dcId": 1,
  "nextApiId": 2040,
  "dateUpdated": {
    "$date": "2025-08-19T10:28:14.878Z"
  },
  "twoFa": false,
  "twoFaDate": {
    "$date": "2025-08-18T10:47:56.976Z"
  },
  "phone": "+543773498193",
  "banned": false,
  "firstName": "Svetlana",
  "id": "6099761860",
  "lastName": "Voronina",
  "messageCount": 27,
  "username": "voronina_just",
  "personalChannelDate": {
    "$date": "2025-08-16T21:17:21.283Z"
  },
  "personalChannelError": "CHANNEL_NOT_FOUND",
  "lazyCheckDate": {
    "$date": "2025-08-18T21:22:07.978Z"
  },
  "automaticCheckDate": {
    "$date": "2025-08-19T10:28:14.878Z"
  },
  "remainingTime": {
    "$date": "2025-08-07T16:35:39.293Z"
  },
  "historySpamBlocks": [
    {
      "spamBlockDate": "INFINITY",
      "spamBlockDays": 0
    },
    {
      "spamBlockDate": "INFINITY",
      "spamBlockDays": 0
    }
  ]
},
{
  "_id": {
    "$oid": "685f07503770b19a27ab2236"
  },
  "accountId": "6106060446-prefix-female-gidrovell",
  "dc1": "9fb64a27a965ed4f81add0e04625222db8b510706ac1f5ae3d11bf52a7f18c824353dd0371742074f9807e5414375c0e807960da628ad758b722721e7060768a46ed6203f7e4ab99a75fdb45f97a2d3cfde91d9600af09be3b15b73f68cd2bd8ba8ae3d709d841dcf6ca3a9fab0b8949ab4a3eb2c374b53cc9e1133eb8fe85388871b462fe126f7502d3bdb3a68775a53974a63879ec4e3e9f2f334dcfb1e1b6925020053f489031b7cc34c6c8fda93f1d062c8e00e686c0a06f4dec33c0f9968193505b7cc7c8b0e81cea92e88f2ee87e7e49846fc8fa5d2c514119d2c4348e62557ce7740cd5a361d776873a9950bd512d183fedff39203eb6957e9b8e0277",
  "dcId": 1,
  "nextApiId": 2040,
  "dateUpdated": {
    "$date": "2025-08-19T10:13:27.744Z"
  },
  "twoFa": false,
  "twoFaDate": {
    "$date": "2025-08-18T10:48:00.889Z"
  },
  "phone": "+525540734957",
  "banned": false,
  "firstName": "Margarita",
  "id": "6106060446",
  "lastName": "Zaytseva",
  "messageCount": 26,
  "username": "zaytseva_puny",
  "personalChannelDate": {
    "$date": "2025-08-16T21:17:20.230Z"
  },
  "personalChannelError": "CHANNEL_NOT_FOUND",
  "lazyCheckDate": {
    "$date": "2025-08-18T19:47:39.214Z"
  },
  "automaticCheckDate": {
    "$date": "2025-08-19T10:13:27.744Z"
  },
  "historySpamBlocks": [
    {
      "spamBlockDate": "INFINITY",
      "spamBlockDays": 0
    }
  ],
  "remainingTime": {
    "$date": "2025-08-06T14:11:10.494Z"
  }
},
{
  "_id": {
    "$oid": "685f074c3770b19a27ab212a"
  },
  "accountId": "6110116552-prefix-female-gidrovell",
  "dc1": "3eae68996cf90b3acf0b341878c00d7fd0a8311a9a83c736d25d0140e79c83124748722d899b420bd92aa30903e8098f5cbac65386b166ae2ad370064673616e0642dc662cf40b883bd93c86e8d1895e4295df103653d585fed6a517fb2c7d2a18c06666544be2392a351c80fcbd847f325f8311f037ed2c2f4c0e7e830567129a9b06a1865cdeee6b08532d30509f44015ecd83081ee828d671d25b243b789dc36378f91be909715ec46542f4ea64971d095d2a1549651397ce3fece35b99615a670fba1836bc5076f1c61e3d95ce933c0f4409cb94e4bad3c46e2feaff5465fc07505c069fa33b06ef7aa82e5957fd3cfb2c18b30c7b87185ed39286c547f8",
  "dcId": 1,
  "nextApiId": 2040,
  "dateUpdated": {
    "$date": "2025-08-19T10:38:18.684Z"
  },
  "twoFa": false,
  "twoFaDate": {
    "$date": "2025-08-18T10:47:58.878Z"
  },
  "phone": "+542614605936",
  "banned": false,
  "firstName": "Liza",
  "id": "6110116552",
  "lastName": "Ivanova",
  "messageCount": 29,
  "username": "ivanova_impossible",
  "personalChannelDate": {
    "$date": "2025-08-16T21:17:17.754Z"
  },
  "personalChannelError": "CHANNEL_NOT_FOUND",
  "lazyCheckDate": {
    "$date": "2025-08-18T21:30:09.391Z"
  },
  "automaticCheckDate": {
    "$date": "2025-08-19T10:38:18.684Z"
  },
  "remainingTime": {
    "$date": "2025-08-11T12:34:19.954Z"
  },
  "historySpamBlocks": [
    {
      "spamBlockDate": {
        "$date": "2025-07-31T06:51:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-08-02T09:53:00.000Z"
      },
      "spamBlockDays": 1
    }
  ]
},
{
  "_id": {
    "$oid": "680b946d461801f59960176f"
  },
  "accountId": "6114785290-prefix-female-dmp1",
  "dc1": "91ff01730fd2025b9176691844bdf0bda6a7a420f5600f055a28d5cf4a75f05e093bc92f0daed80a992c380838f0099f19fb47439dac7cb730650254a8b62d6699350bf14104db5ffae332d07674e378f2e78a020dff1f3db4f935018a2348436c69c4de148d768aa680abecf8ef29a4b3ee0be6a1b341d5e9efb74e3941c15a0997a44fe69f947db85208c17019f0ef5d21377190ad41f1b6b152adcd2aba521a678d515a8975ed9b88c821f72c8c3e8f978fe3a4facb4ef64d8e2cf456d39237d1ed01f7bd2caff59d4e7491548968b79da469764e9b2c536404cb4484667f97ead5b3148f3123807d6c03ef89a8c5420270202d7918d00051184b02f35f07",
  "dcId": 1,
  "nextApiId": 2496,
  "dateUpdated": {
    "$date": "2025-08-19T10:33:43.290Z"
  },
  "twoFa": false,
  "twoFaDate": {
    "$date": "2025-08-18T10:48:03.116Z"
  },
  "phone": "+541128971011",
  "banned": false,
  "firstName": "Lubov",
  "id": "6114785290",
  "lastName": "Shishkina",
  "messageCount": 131,
  "personalChannel": "fbF4VPhGkTflSdYI",
  "personalChannelDate": {
    "$date": "2025-04-25T14:32:43.187Z"
  },
  "lazyCheckDate": {
    "$date": "2025-08-18T22:17:37.959Z"
  },
  "automaticCheckDate": {
    "$date": "2025-08-19T10:33:43.290Z"
  },
  "username": "shishkina_charming",
  "remainingTime": {
    "$date": "2025-08-19T05:53:57.567Z"
  },
  "historySpamBlocks": [
    {
      "spamBlockDate": {
        "$date": "2025-05-01T10:53:00.000Z"
      },
      "spamBlockDays": 1
    }
  ]
},
{
  "_id": {
    "$oid": "683b23d03770b19a277f4129"
  },
  "accountId": "6139222950-prefix-elba",
  "dc5": "b61bb979e3b0bb20f0d8d38433e31350c92f927eb3f8182dc6d03e72613aa84ad0aec872a2826d08ec96734b4ffae59810b0199e8d308800e934de522d97a12b98d1adbc2bfc7667be251f8b5a9b3de3cbd4afa1bdf7c93b376a7bc8bc80d8ac8a19f9716345c7dc8d12c66465951517efcb30d2959186c206c503ec5f4357034b01b1785e1e2bc527e5c67e779bdcec86ccfa792a4a17b3888c1182ad6ab7031890949bb85958622dab4d1243b2b6350b1137aeded2b794e05d1075517e75775a26b6a051d71e7138ecb642399631a3e7e0de8e7f798686a014b35821bf30fe25f941c47b3a60a4fcd1f64e1340d68ad5eda7b1386afad1d17c938edaae5b20",
  "dcId": 5,
  "nextApiId": 2040,
  "dateUpdated": {
    "$date": "2025-08-19T10:22:32.485Z"
  },
  "twoFa": false,
  "twoFaDate": {
    "$date": "2025-08-18T00:42:30.084Z"
  },
  "phone": "+639293767353",
  "banned": false,
  "firstName": "Roman",
  "id": "6139222950",
  "lastName": "Glazunov",
  "messageCount": 4,
  "username": "glazunov_manual",
  "personalChannel": "e0BlaFBbDZORoRuG",
  "personalChannelDate": {
    "$date": "2025-05-31T16:33:38.920Z"
  },
  "lazyCheckDate": {
    "$date": "2025-08-19T01:36:53.711Z"
  },
  "automaticCheckDate": {
    "$date": "2025-08-19T10:22:32.485Z"
  },
  "remainingTime": {
    "$date": "2025-08-11T11:00:30.943Z"
  }
},
{
  "_id": {
    "$oid": "680b9470461801f599601821"
  },
  "accountId": "6146880955-prefix-female-dmp1",
  "dc1": "bef78e9a8572cbcacd4ac016a155553df7b5b763df0f0fdb12a85db721e814bf87b8e2e1a0800a5cc5db3ed1e1577dff7aede2e8b866924ab0ed1ad9f8bf12db9a96d274afd35d51d39438cd3a7aecc8748f517b9a139fda94a1dd1d0083601886a403f83becf7286523fbd0173302a09e2500537d0b7bf1b5a3069f9101177c7756ca8a2832240ded13ab40f1f9ff29e2d7000df6e8ef134ff0d668c6a493b18de3f47e4111c8070797f800c1c3adbb7d3d8a726ff8b6a8976d6030a9e2fa6d604603b8f33ee0fcbfaebf88a47b26757c244a4bdb996a60e8d9715a400636fd5e67898362f286962b71d75da58601f7a39c00010ff01d219ddacf975ad6de09",
  "dcId": 1,
  "nextApiId": 2496,
  "dateUpdated": {
    "$date": "2025-08-19T10:35:45.607Z"
  },
  "twoFa": false,
  "twoFaDate": {
    "$date": "2025-08-18T10:48:07.869Z"
  },
  "phone": "+542212240721",
  "banned": false,
  "firstName": "Evgenia",
  "id": "6146880955",
  "lastName": "Osipova",
  "messageCount": 140,
  "personalChannel": "wSIkJfMw9ZHRgCCQ",
  "personalChannelDate": {
    "$date": "2025-04-25T14:34:00.766Z"
  },
  "lazyCheckDate": {
    "$date": "2025-08-18T19:52:31.279Z"
  },
  "automaticCheckDate": {
    "$date": "2025-08-19T10:35:45.607Z"
  },
  "username": "osipova_beautiful",
  "remainingTime": {
    "$date": "2025-08-19T11:01:24.339Z"
  },
  "historySpamBlocks": [
    {
      "spamBlockDate": {
        "$date": "2025-05-03T09:38:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-08-16T11:14:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-08-17T06:04:00.000Z"
      },
      "spamBlockDays": 1
    }
  ]
},
{
  "_id": {
    "$oid": "685f074c3770b19a27ab20f5"
  },
  "accountId": "6150936516-prefix-female-gidrovell",
  "dc1": "763499bd8ee2af1bf3ca98bc76e179dc5b550d6c2d7dbbdbcafc40f1185de595b54ea738e64c397b08a3a7df1adbffcc9d730ee65d6ecee7d59757d42d7b8ff97c4834afab199b7fcf4152788621f6d8a2b99fbfa4d313507e9916bbe2675e5eb6c7b9719682e5fc936eaad34eaf2a74af36c2c82fe5d3226888ffb0d03c7ff019a52dec8d75ee53335a874923bb64f415826d39008f93069626d3710532a1316f9ab075092d0765390b35e3cac53a093b2003c9368eb102e278b0406c97c98da9bf532853b182b2a82832dfbe59c95c7c97e264b0082fa675aa32131224f2741980dd0c80af2690711d51be14b667398718d7b35b414b7177a4622bd1a2cc7d",
  "dcId": 1,
  "nextApiId": 2040,
  "dateUpdated": {
    "$date": "2025-08-19T10:38:22.506Z"
  },
  "twoFa": false,
  "twoFaDate": {
    "$date": "2025-08-18T10:47:55.646Z"
  },
  "phone": "+543884855980",
  "banned": false,
  "firstName": "Anna",
  "id": "6150936516",
  "lastName": "Efimova",
  "messageCount": 29,
  "username": "efimova_united",
  "personalChannelDate": {
    "$date": "2025-08-16T21:17:17.758Z"
  },
  "personalChannelError": "CHANNEL_NOT_FOUND",
  "lazyCheckDate": {
    "$date": "2025-08-18T20:00:35.618Z"
  },
  "automaticCheckDate": {
    "$date": "2025-08-19T10:38:22.506Z"
  },
  "remainingTime": {
    "$date": "2025-08-11T12:05:33.318Z"
  }
},
{
  "_id": {
    "$oid": "683b23e93770b19a277f4932"
  },
  "accountId": "6157426382-prefix-elba",
  "dc1": "329c544411a2da379702ed5d87c15c5ec14d664a8f48e6a8598a4a21a33fa5a0fab3eff85259f51f1aa6979f43745f1950f803bc77437f8b7f536aad2d1c281df192ac8b2899d6f754dbaaf7f67dfd4dc31ed093b772ca81337d7aeb1a5f6971952f45765ef5e7987a2f4dcf668abdb7734506046883bbb5786e2b7a0bae5733c0baa36b25578202e1c884a39a5ba9fe14311fa788f57b992390b5b9d748ff9058e2033a7bb76f7775f3e3dd9053f7840d309d1fa119b7cffd016f826df865ca281930f8f12c8a545dbc14f1490cd66c24d8f5a418775a2f670076104148937f83f83e13a9a2b5bd97acbddee11acdb1885dd1e55fe36a5bc992a8d3c9b1a365",
  "dcId": 1,
  "nextApiId": 2040,
  "dateUpdated": {
    "$date": "2025-08-19T10:19:26.750Z"
  },
  "twoFa": false,
  "twoFaDate": {
    "$date": "2025-08-18T00:42:33.703Z"
  },
  "phone": "+543434156255",
  "banned": false,
  "firstName": "Boris",
  "id": "6157426382",
  "lastName": "Sobolev",
  "messageCount": 13,
  "username": "sobolev_developed",
  "personalChannel": "IIXxkwLuJzXvV5fq",
  "personalChannelDate": {
    "$date": "2025-05-31T16:31:38.591Z"
  },
  "lazyCheckDate": {
    "$date": "2025-08-18T23:46:20.879Z"
  },
  "automaticCheckDate": {
    "$date": "2025-08-19T10:19:26.750Z"
  },
  "remainingTime": {
    "$date": "2025-08-11T21:01:33.156Z"
  },
  "historySpamBlocks": [
    {
      "spamBlockDate": {
        "$date": "2025-06-03T16:47:00.000Z"
      },
      "spamBlockDays": 3
    }
  ]
},
{
  "_id": {
    "$oid": "680b9468461801f5996015fe"
  },
  "accountId": "6158513729-prefix-female-dmp1",
  "dc1": "bcc8dc60c4ec534f9127bb4b1f9bf55bbe4d116dcb1ce92b49d7c5c1ecd0652e4021f8a0dcb7e08b3db777f2c45efae7677654ffd6635aa9039727fb4f115ba48a698a3daad6ce6091eab504d0942af955210062bf224ea3578eaebe1dbf94091d5788e3e9569508fd102de21caeae2d067f699b4e77a5d26cb585c7d155d21ce325961f89208b404392ccc81aabe11d6b8c7554d943e262fe72fe279728ff3cb2419da895ee3e4da6b8b8a09aa919b25c7b2c44ac40900a6b2df727237b24921ba616c7687317f74b40c6dd687a913771bc1169531f0ba634293f95879f681e6a2357d388d1aec606a62f5abb1082d7a467f44bbe63ed6239db52c512e1b7be",
  "dcId": 1,
  "nextApiId": 2496,
  "dateUpdated": {
    "$date": "2025-08-19T10:32:43.914Z"
  },
  "twoFa": false,
  "twoFaDate": {
    "$date": "2025-08-18T10:47:57.269Z"
  },
  "phone": "+573015119849",
  "banned": false,
  "firstName": "Polina",
  "id": "6158513729",
  "lastName": "Ustinova",
  "messageCount": 46,
  "personalChannel": "SJsxf2dzOxeWRkpN",
  "personalChannelDate": {
    "$date": "2025-04-25T14:30:08.233Z"
  },
  "lazyCheckDate": {
    "$date": "2025-08-18T21:27:10.567Z"
  },
  "automaticCheckDate": {
    "$date": "2025-08-19T10:32:43.914Z"
  },
  "username": "ustinova_organisational",
  "remainingTime": {
    "$date": "2025-08-19T02:33:11.775Z"
  }
},
{
  "_id": {
    "$oid": "680ebc55461801f599f38a55"
  },
  "accountId": "6164127960-prefix-bls",
  "dc4": "5f6864f33022053350dc18be977ef1756fb6b2f2e2e63df41fefade20237d7ec29ba3482f35a12386fe7ad90166b46a0d5f8655c46fe0d4cedcc3b878857263badd3bba14c89d19181cb42c87f9008451b973c0cbd96fb2b2c1c8ae98c000cbfd4af61818f2a70d06a904bb71eccfddae446daffaec62b8749f8107fa8de17b7a8ea81545489d83de7b1e96ab9edf2cdebe201d0664276e3f7fc72d2aa481a238750cace2305230df64ccad809b96fe9ba15e808e5d86559313acfe007f2fa24843837314a7a2c0923d1010b4d00ed55b44c84be09f69efa65289044e51a3f63dfaf2e933c5120220de3a3f484d82ec382bf28826690664c6170d98e5b16efc8",
  "dcId": 4,
  "nextApiId": 2040,
  "dateUpdated": {
    "$date": "2025-08-19T10:28:35.426Z"
  },
  "twoFa": false,
  "twoFaDate": {
    "$date": "2025-08-17T20:15:25.898Z"
  },
  "phone": "+201020192252",
  "banned": false,
  "firstName": "Pavel",
  "id": "6164127960",
  "lastName": "Sidorov",
  "messageCount": 7,
  "username": "sidorov_colorful",
  "personalChannelDate": {
    "$date": "2025-05-23T07:58:41.610Z"
  },
  "lazyCheckDate": {
    "$date": "2025-08-18T14:25:47.117Z"
  },
  "automaticCheckDate": {
    "$date": "2025-08-19T10:28:35.426Z"
  },
  "personalChannel": "cUfawkMLbar0GUlt",
  "remainingTime": {
    "$date": "2025-05-28T09:11:09.153Z"
  }
},
{
  "_id": {
    "$oid": "680b9468461801f5996015b0"
  },
  "accountId": "6181131556-prefix-female-dmp1",
  "dc1": "b8c0959285ea9c8043c6027e17620dd2f89e0117d4613a148268ab447a2bb28e4bbdedcfe6d8a41e6d030cdb6ed0dfac270b6e947d88caafde1e98f27ad24cceaa71eefd6641f821af372d1aeeff27f4f5e9f6397245c5385ea793fc54d739cb9456ff7cd4941f6ac4140f971a70fd8d4b8b013723085d1b2190adfd62a252dea55d2078d778b8cd267235e6e6872c6cfe8044a62eec51837143a4f7a1bff56a40c71afec97511fbf48acaaf4b76d791c9a21a8d2af12ac36617fbdff0dcbb912e59fd35fae56f20fbb5faa971aa1d463bdaf93fa2d263312ce9315ee3af62b858e0510f795235c3a76bb62ee65a2106e5ffe2ec8ee3cbbd3aec065ded563ccd",
  "dcId": 1,
  "nextApiId": 2040,
  "dateUpdated": {
    "$date": "2025-08-19T10:17:42.474Z"
  },
  "twoFa": false,
  "twoFaDate": {
    "$date": "2025-08-18T10:47:53.653Z"
  },
  "phone": "+541140856405",
  "banned": false,
  "firstName": "Lubov",
  "id": "6181131556",
  "lastName": "Savina",
  "messageCount": 114,
  "personalChannel": "FPpbDY2JDWkJHjhA",
  "personalChannelDate": {
    "$date": "2025-04-25T14:32:48.454Z"
  },
  "lazyCheckDate": {
    "$date": "2025-08-18T19:02:10.285Z"
  },
  "automaticCheckDate": {
    "$date": "2025-08-19T10:17:42.474Z"
  },
  "username": "savina_attractive",
  "remainingTime": {
    "$date": "2025-08-16T15:58:09.224Z"
  },
  "historySpamBlocks": [
    {
      "spamBlockDate": {
        "$date": "2025-06-27T00:06:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-07-08T03:36:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-07-06T10:52:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-07-09T14:02:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-08-10T05:51:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-08-19T15:53:00.000Z"
      },
      "spamBlockDays": 3
    }
  ],
  "spamBlockReasons": [
    {
      "reason": "Ive always followed your guidelines and never spammed anyone. Now I can only message mutual contacts, but many of my clients dont know about my account. This restriction is hurting my business, and I urgently need to reach them.",
      "date": {
        "$date": "2025-08-16T16:06:44.213Z"
      }
    },
    {
      "reason": "Ive never engaged in any suspicious activity or violated Telegrams rules. The current messaging restrictions are severely impacting my work, as Im unable to contact non-mutual connections, many of whom are unaware of my account and need to be reached urgently for important matters. Lifting these restrictions would allow me to resume normal communication and continue my work without hindrance.",
      "date": {
        "$date": "2025-08-16T20:46:07.847Z"
      }
    },
    {
      "reason": "Ive never broken any rules or engaged in suspicious activity on Telegram. Because of the messaging restrictions, I cant reach important contacts who dont know my account, and my work is at a standstill. Id appreciate it if these restrictions could be lifted so I can get back to business.",
      "date": {
        "$date": "2025-08-17T14:01:12.860Z"
      }
    },
    {
      "reason": "I have not violated any platform rules or engaged in unwanted messaging. The current messaging restrictions prevent me from reaching important contacts who are not mutual, causing me to lose clients. I request that these restrictions be lifted to allow me to continue my professional communications.",
      "date": {
        "$date": "2025-08-18T11:16:18.036Z"
      }
    },
    {
      "reason": "I have never violated any rules or spammed, yet my messaging is restricted to mutual contacts only. This limitation is severely hindering my ability to communicate with my team, causing my business operations to come to a standstill. I kindly request that this restriction be lifted so I can resume my work without further delay.",
      "date": {
        "$date": "2025-08-18T14:20:53.147Z"
      }
    },
    {
      "reason": "Ive always respected Telegrams rules and never spammed anyone, but the messaging restrictions are really holding me back. Ive got important business deals and projects that need immediate communication with non-mutual contacts. My familys worried about the impact this is having on my work.",
      "date": {
        "$date": "2025-08-18T20:48:00.556Z"
      }
    }
  ],
  "spamBlockDate": {
    "$date": "2025-08-19T15:53:00.000Z"
  },
  "spamBlockDays": 3,
  "spamBlockInitDate": {
    "$date": "2025-08-16T16:06:44.217Z"
  }
},
{
  "_id": {
    "$oid": "685f07483770b19a27ab1f95"
  },
  "accountId": "6183547200-prefix-female-gidrovell",
  "dc1": "4ac187095df1a419920734f58ac9b9fb79fc06a47b60487356e16be013ad9f6f626a2a4784d26664aeb7ccf7df9b6dc9fa969587538d81bc3ea10e3aff4bdbe2b2e51f725c8d46661464ff6c8ae78c196c6b5056a688daf1578d0684b87767b971400592b0d9f4a02102d1a6bc54112af5845be38d608183559edb105648b6713b6d7664a4f9f4187c19f8146172db23e88a8f07bf0d6387f7ae2453dab723f0a10d903422d12d7ed2346dc62b0cb75f09bc3ddc73445e849819af1bc23ff18e6b6c3b7d1d321861fac743c4cc77c8309cb39f8d4243476a72a17b194d00098420f603f1f42bd7214b021bd3fd14258e5d4cb6d59fed27a4b3ad33e8923b0c8d",
  "dcId": 1,
  "nextApiId": 2040,
  "dateUpdated": {
    "$date": "2025-08-19T10:32:42.268Z"
  },
  "twoFa": false,
  "twoFaDate": {
    "$date": "2025-08-18T10:47:42.875Z"
  },
  "phone": "+543704383347",
  "banned": false,
  "firstName": "Kira",
  "id": "6183547200",
  "lastName": "Panfilova",
  "messageCount": 29,
  "username": "panfilova_social",
  "personalChannelDate": {
    "$date": "2025-08-16T21:17:22.006Z"
  },
  "personalChannelError": "CHANNEL_NOT_FOUND",
  "lazyCheckDate": {
    "$date": "2025-08-19T00:03:23.260Z"
  },
  "automaticCheckDate": {
    "$date": "2025-08-19T10:32:42.268Z"
  },
  "remainingTime": {
    "$date": "2025-08-11T12:35:48.262Z"
  }
},
{
  "_id": {
    "$oid": "685f07463770b19a27ab1f1c"
  },
  "accountId": "6211735254-prefix-female-gidrovell",
  "dc1": "16db3e09678afa4c2175cd6cc1d5e96511e94ec98bb2ec2c74361b5d5caa7170806339f1eea90fcdc4e56e5ceb3457623d70ad432281937eb04f070be96bc9fdfeccbbfa6817e3454feea447e706da7498a2db85165028ae713cc657941fb8c79386c6fbd6d743212afea001a77bb593c7afb1038184b0e3ff1c03226636cbd7907f4c79b13d18b8f9e2c1450d3a663f1f3fe97d74314aaa981165829164d990cecef1ee5ec5438d4e42e03e5e9a94c1e6656c6af1077134b2adbc53dd069e3a989ccbd3397e01647b604fe602c8d597300783214c9b6f35adc83310fbfc77450dfb668f314f95f22aec9ed8d901b98d201273c0742a7f5f17b3d11a0e34453b",
  "dcId": 1,
  "nextApiId": 2040,
  "dateUpdated": {
    "$date": "2025-08-19T10:30:42.673Z"
  },
  "twoFa": false,
  "twoFaDate": {
    "$date": "2025-08-18T10:47:32.085Z"
  },
  "phone": "+543549430606",
  "banned": false,
  "firstName": "Olga",
  "id": "6211735254",
  "lastName": "Terekhova",
  "messageCount": 27,
  "username": "terekhova_impressive",
  "personalChannelDate": {
    "$date": "2025-08-16T21:17:22.018Z"
  },
  "personalChannelError": "CHANNEL_NOT_FOUND",
  "lazyCheckDate": {
    "$date": "2025-08-18T22:13:35.542Z"
  },
  "automaticCheckDate": {
    "$date": "2025-08-19T10:30:42.673Z"
  },
  "remainingTime": {
    "$date": "2025-08-11T12:07:56.576Z"
  }
},
{
  "_id": {
    "$oid": "685f074f3770b19a27ab2205"
  },
  "accountId": "6212131421-prefix-female-gidrovell",
  "dc1": "a9184dafb51dcfe7225f2863271ac22d1c6df4fd52a770e50b9da48d89a36d721299c03a7efd1ccbd36f80d63d4023c0407b4e8c77fe8add051a628eb06732034f84d6b66562955053de43894a082842fb634420545d1365dc9d6982d2d6b6b10e80947dcb9ff9dd0b09e29c7f6c60001de03704fb683678d643fd4444850315adb6b6cbaef70a6d1a8ece9785cd747226eb3a6f04c25c333a90bd087d85ddccd9e35097876058720c83f20d102cce47c9ee473e0715aa7b731c95fb463900359699dcd015e4c31f16f004c360ba219cf5e06bbe2db01dac9a74aa72d230b2de58972e37ef440f64e5a79e4ce53a588be51aa6ff927abb8857c8ff3c2e414920",
  "dcId": 1,
  "nextApiId": 2040,
  "dateUpdated": {
    "$date": "2025-08-19T10:30:30.018Z"
  },
  "twoFa": false,
  "twoFaDate": {
    "$date": "2025-08-18T10:48:01.432Z"
  },
  "phone": "+529221091212",
  "banned": false,
  "firstName": "Ekaterina",
  "id": "6212131421",
  "lastName": "Anisimova",
  "messageCount": 25,
  "username": "anisimova_accepted",
  "personalChannelDate": {
    "$date": "2025-08-16T21:17:19.709Z"
  },
  "personalChannelError": "CHANNEL_NOT_FOUND",
  "lazyCheckDate": {
    "$date": "2025-08-18T20:06:36.227Z"
  },
  "automaticCheckDate": {
    "$date": "2025-08-19T10:30:30.018Z"
  },
  "remainingTime": {
    "$date": "2025-08-05T13:57:43.732Z"
  },
  "historySpamBlocks": [
    {
      "spamBlockDate": {
        "$date": "2025-07-26T11:25:00.000Z"
      },
      "spamBlockDays": 1
    }
  ]
},
{
  "_id": {
    "$oid": "683b23d73770b19a277f436c"
  },
  "accountId": "6226759361-prefix-elba",
  "dc5": "95f052d9347a7118fcc77faeb6ad2ea17ce7045f9695c0a7248d3c05b682f6fefb37654fd9e5861fa7cdd85bfb19c47b835e3d61b6e2d057746ef8b646b3cf69dafcffb84c3c89639c694cf18968cc8952be92df1c7a5f5e05598bc68f5916caec838d7d97d634d9d89d62ac11a4bcc64bab3e6bf6f0e7c15b7c2fa01bc3919529779bbb879cff980388e0335f66a79b5b96c6ee064d3dd504e2aabf502f41781c7b9598ec47668409513f9704e3681bee59cf72ccb6b4de805871a1da30cb1e4042fde96109279a9f74680e4fa6a16b390e579d3d0075dceebf68d0e0efd3ebb8c6b92a94b4a5b2638867b82325e908fad8a28fc582c0f76f0c92705c083069",
  "dcId": 5,
  "nextApiId": 2040,
  "dateUpdated": {
    "$date": "2025-08-19T10:36:24.148Z"
  },
  "twoFa": false,
  "twoFaDate": {
    "$date": "2025-08-18T00:42:29.155Z"
  },
  "phone": "+6288983119077",
  "banned": false,
  "firstName": "Leonid",
  "id": "6226759361",
  "lastName": "Alekseev",
  "messageCount": 14,
  "username": "alekseev_constitutional",
  "personalChannel": "gtqCuDLOvZVboBV9",
  "personalChannelDate": {
    "$date": "2025-05-31T16:31:43.456Z"
  },
  "lazyCheckDate": {
    "$date": "2025-08-19T01:16:42.988Z"
  },
  "automaticCheckDate": {
    "$date": "2025-08-19T10:36:24.148Z"
  },
  "remainingTime": {
    "$date": "2025-08-11T16:22:29.154Z"
  }
},
{
  "_id": {
    "$oid": "685f07463770b19a27ab1f43"
  },
  "accountId": "6239877683-prefix-female-gidrovell",
  "dc1": "39b6a9846a84cda07a6416aeaffacbb701378a62ff5854495f2895e6d276816bc57edd7b127d2006083269e9faa06078d4fc64fbc4251ca5cc4a20f2c19295efbe49b098503f43d75e1a20c5abd270f8f8aa788c7dcc932fee5352669e51aedad82b20b98e8a3c31c532825e7779080400f942935ae66c513a59c12be722d05909bd80aac0ef42a4590248281f094b600496efafccacc65c73d23a17517a255efd1f91937ad4b21bf4ff317636deadec74263cfbd7dea5e0063810ade4a5934a97c300a374971453e5a8fac30ea953f1d6162bda231f4b8addfe3f0abedef66e054e97a43a5d59191b243c29f36b31eafefccb64da4306c438e26fa62df19c5f",
  "dcId": 1,
  "nextApiId": 2040,
  "dateUpdated": {
    "$date": "2025-08-19T10:37:41.482Z"
  },
  "twoFa": false,
  "twoFaDate": {
    "$date": "2025-08-18T10:47:41.110Z"
  },
  "phone": "+543837499539",
  "banned": false,
  "firstName": "Sofia",
  "id": "6239877683",
  "lastName": "Popova",
  "messageCount": 27,
  "username": "popova_legal",
  "personalChannelDate": {
    "$date": "2025-08-16T21:17:22.248Z"
  },
  "personalChannelError": "CHANNEL_NOT_FOUND",
  "lazyCheckDate": {
    "$date": "2025-08-18T22:54:35.181Z"
  },
  "automaticCheckDate": {
    "$date": "2025-08-19T10:37:41.482Z"
  },
  "remainingTime": {
    "$date": "2025-08-05T14:05:17.371Z"
  }
},
{
  "_id": {
    "$oid": "683b23d73770b19a277f439f"
  },
  "accountId": "6252153115-prefix-elba",
  "dc5": "8bf529c2eff4791b1def20c4dc3e0519a37440df8a1c64251234bab0937ed5d3d49ab26027e11d9b74fdd68f7c4606ee05c9494073bd010338fd3bbbc6f46f373ce97934edf24283909f92b5ff92b711af153701b627bfbf84a0e12925f465c6eb976467fca435f7c09bec9ce576f196f9d5305bda244d846312a97b9482a39849ea97eb9fb4c21eabe107650252de6008af10f30bd51af102afd09507bdb963bf286a9550d0213b0789d09f70a565ca2e5342bf154528caf25ef2a028704fd50d6cda92694bcb2a293a2a0b258721c2e8ab10801618362777503025eea1e3d2cd76d1c514fe7bc4fb47adc8a26ebb96e5905a4389ef9a79ac5606b6b1270c72",
  "dcId": 5,
  "nextApiId": 2040,
  "dateUpdated": {
    "$date": "2025-08-19T10:17:24.073Z"
  },
  "twoFa": false,
  "twoFaDate": {
    "$date": "2025-08-18T00:42:31.421Z"
  },
  "phone": "+6289524681411",
  "banned": false,
  "firstName": "Nikolay",
  "id": "6252153115",
  "lastName": "Nesterov",
  "messageCount": 10,
  "username": "nesterov_novel",
  "personalChannel": "cvgjizKPzWTrEpd1",
  "personalChannelDate": {
    "$date": "2025-05-31T16:32:22.363Z"
  },
  "lazyCheckDate": {
    "$date": "2025-08-19T02:43:00.374Z"
  },
  "automaticCheckDate": {
    "$date": "2025-08-19T10:17:24.073Z"
  },
  "remainingTime": {
    "$date": "2025-08-09T12:25:37.905Z"
  }
},
{
  "_id": {
    "$oid": "680b9470461801f59960184c"
  },
  "accountId": "6252763870-prefix-female-dmp1",
  "dc1": "06bf8d74eb84d437597001d31b47ff47931e53558066f73a4b3b63bf531e3a145a9513f7811e954f58c59a7993bb2ecfb801bdf519a0c1a751b999b4a8be15143e83c46fad897614fcdabe693fbcb0b8a946c2a885fd3824ff28d016a1ddc5e4e1b3fce75167b11b606ae94b52eaf495f84a9fa9a3489648f88770960bfa077e1c1f75aa667859aa534babaa107bc084db63b98c3cee5dd48b989ee9393368cab76234bd873ff61a6048b2bdf61913fd3405ff3eb7026ba85c693e0ad9ac5f31bfe2e6dec20d8b97a0a0625fff242885513ad94bc39f9444e52ef43c3573926c16a5cc1523f4c94b9b6df5f567e3e10f4337015ef6e26643425318a06149b5de",
  "dcId": 1,
  "nextApiId": 2496,
  "dateUpdated": {
    "$date": "2025-08-19T10:33:43.595Z"
  },
  "twoFa": false,
  "twoFaDate": {
    "$date": "2025-08-18T10:48:07.944Z"
  },
  "phone": "+573133692145",
  "banned": false,
  "firstName": "Galina",
  "id": "6252763870",
  "lastName": "Chugunova",
  "messageCount": 47,
  "personalChannel": "wxrSeoYHLHx1uMyE",
  "personalChannelDate": {
    "$date": "2025-04-25T14:33:41.748Z"
  },
  "lazyCheckDate": {
    "$date": "2025-08-18T15:50:29.485Z"
  },
  "automaticCheckDate": {
    "$date": "2025-08-19T10:33:43.595Z"
  },
  "username": "chugunova_azure",
  "remainingTime": {
    "$date": "2025-08-19T07:11:19.362Z"
  }
},
{
  "_id": {
    "$oid": "680b946e461801f5996017c5"
  },
  "accountId": "6260886718-prefix-female-dmp1",
  "dc1": "16b3c6e290275ec698b2d05f0056ae9c2f281f9383137ca7023592500a1b227b4a5f373fe63cbba47eaab341e56f9d2837151b09fd5054640ee8074d90b3a6ea3daf667973c886185da867b99ab143de758e384b5da20ee2335be90be7def21359a59af5c54ef93f4a0cd3a4dd1c294a4a3aa65afad68366637e1afe2fd8d40538ce48802c5e500bb0f2625048db006fc4d71b19c761b1ce856a1739e1cc996b7c6ce2d2a45cbb56273d2e0cc265fdb006a90ee5a2b04a1ffb10dc40776f10efb07540d8794ba7dea6862a73c8a5ad870138307a31c871d13d2f08c0ceedafb32197030f522c37139bcc0f6027c44571de2c5b32be6ae192c57b7cd87a858bb4",
  "dcId": 1,
  "nextApiId": 2496,
  "dateUpdated": {
    "$date": "2025-08-19T10:19:43.774Z"
  },
  "twoFa": false,
  "twoFaDate": {
    "$date": "2025-08-18T10:48:12.373Z"
  },
  "phone": "+573153979716",
  "banned": false,
  "firstName": "Liza",
  "id": "6260886718",
  "lastName": "Baranova",
  "messageCount": 47,
  "personalChannel": "FXmXOQlZlmhmH7JD",
  "personalChannelDate": {
    "$date": "2025-04-25T14:34:50.838Z"
  },
  "lazyCheckDate": {
    "$date": "2025-08-18T19:19:21.691Z"
  },
  "automaticCheckDate": {
    "$date": "2025-08-19T10:19:43.774Z"
  },
  "username": "baranova_depressed",
  "remainingTime": {
    "$date": "2025-08-19T10:42:46.811Z"
  }
},
{
  "_id": {
    "$oid": "680b9471461801f599601897"
  },
  "accountId": "6263877609-prefix-female-dmp1",
  "dc1": "4ff9e9f07572ae9ea69b41e80eaa4cc13cefd85c1fa39ed264c5d6ba6f0a85c5b8a7b70b454938ffc6e3049af3619ff6f0ae3bdd86809a11f65df6a301d833318d639d6fbe17e707ee37f4f666128ab18c50bba96e2682fc915735cc358f00a61b4c70442a6e7a443d3b2ab3dd20346615d8aad0c5ca4fa1de65b72f6dbae0ffee6223852382b5ededda3fa0ffbfe94ba139052d652f4d2ec0e17ec8d7df36d32a084f3c042aa3f226eed06e3db3fd05e9fec20d26a9e3568aab62a870f7caa12ac9a6e617c173622bb8ff16f748878fbd4fce8b99e0b209d774c28f1b3047c04faadc35c1de421fbe0282c1b66080565b2fd9a6d371b99f9d3bfe55b8314b5e",
  "dcId": 1,
  "nextApiId": 2496,
  "dateUpdated": {
    "$date": "2025-08-19T10:32:44.129Z"
  },
  "twoFa": false,
  "twoFaDate": {
    "$date": "2025-08-18T10:48:07.866Z"
  },
  "phone": "+541166215271",
  "banned": false,
  "firstName": "Olga",
  "id": "6263877609",
  "lastName": "Popova",
  "messageCount": 142,
  "personalChannel": "bJPTlrsfJrFv2QPU",
  "personalChannelDate": {
    "$date": "2025-04-25T14:32:25.389Z"
  },
  "lazyCheckDate": {
    "$date": "2025-08-18T14:16:08.172Z"
  },
  "automaticCheckDate": {
    "$date": "2025-08-19T10:32:44.129Z"
  },
  "username": "popova_crimson",
  "remainingTime": {
    "$date": "2025-08-19T05:45:33.220Z"
  }
},
{
  "_id": {
    "$oid": "680b946b461801f599601715"
  },
  "accountId": "6294745749-prefix-female-dmp1",
  "dc1": "8cd62cc52496f6b07c997d324e965447d2eec6c3c5d080dede66ff165e7a8d0b447df9b735800742a849737340184f43307a2a6a83a3f15e9dbd3be427588d8ed7ea9a6a9264ba13fce42120c56fb700ac433cbf1264e1174f0cf2c10809b032eefd1819b9e6be9cbad4194d2105e56048623fe2fdf2f0fef9df3867c701eb224d228d46e0b1a4335522ce59ca7d6527aa63c902a10690f0ef3b9f03177892c58580cbd488ff7ad8019d135891771b1a45f3b6d6d282171f66700e1298ed49665bdbef00eb3b437d058300b5388b9d513e5183849834a91c8ab195a1ccbc0c6722819e7a3ec2b0f411c507d5e15229cdba9106cb73cb22a99dd566007882dfe4",
  "dcId": 1,
  "nextApiId": 2040,
  "dateUpdated": {
    "$date": "2025-08-19T10:39:44.567Z"
  },
  "twoFa": false,
  "twoFaDate": {
    "$date": "2025-08-18T10:47:58.966Z"
  },
  "phone": "+522461883359",
  "banned": false,
  "firstName": "Yulia",
  "id": "6294745749",
  "lastName": "Romanova",
  "messageCount": 136,
  "personalChannel": "uYvjuroc3bWMdAGo",
  "personalChannelDate": {
    "$date": "2025-04-25T14:31:41.023Z"
  },
  "lazyCheckDate": {
    "$date": "2025-08-18T19:26:21.517Z"
  },
  "automaticCheckDate": {
    "$date": "2025-08-19T10:39:44.567Z"
  },
  "username": "romanova_occupational",
  "remainingTime": {
    "$date": "2025-08-19T09:11:59.562Z"
  },
  "historySpamBlocks": [
    {
      "spamBlockDate": {
        "$date": "2025-05-01T12:37:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": "INFINITY",
      "spamBlockDays": 0
    }
  ]
},
{
  "_id": {
    "$oid": "680b946d461801f599601751"
  },
  "accountId": "6297603167-prefix-female-dmp1",
  "dc1": "34ec03920d71228762cb35d9c408a6adeda718e2e5051b9a690fa1085766cbf07d0b65237bf7c9fc0b1410c5b72dbb53cef07bbe10df4790660d719cd5be1eda2f36ca41bf539f92fed3b1859085670646673867f1efb6fbfef419c4a4663151ef903a05592338a4dbcbadb13d1c9bdd18e1056583b8eb8799032874869b6df4a8cea20cab02eb7ec696af465627405a9b09a600b67b5d70be34ad119c4e34a119c9535d7ea10b59c54c89dbf2df0daa6c4e0bed6d77189ee98da82572bb66c91212366ca5fe51920bbc34b308f26de696bb4555be65a8b2b8581756a89e4548251a59090655554bfef208f79e76b6d137b7e1cd91fda658deffb214c5ff562e",
  "dcId": 1,
  "nextApiId": 2496,
  "dateUpdated": {
    "$date": "2025-08-19T10:27:44.279Z"
  },
  "twoFa": false,
  "twoFaDate": {
    "$date": "2025-08-18T10:48:06.026Z"
  },
  "phone": "+543517713395",
  "banned": false,
  "firstName": "Galina",
  "id": "6297603167",
  "lastName": "Shirokova",
  "messageCount": 143,
  "personalChannel": "PRgECx5cHYrEfhQz",
  "personalChannelDate": {
    "$date": "2025-04-25T14:32:08.741Z"
  },
  "lazyCheckDate": {
    "$date": "2025-08-18T22:03:34.070Z"
  },
  "automaticCheckDate": {
    "$date": "2025-08-19T10:27:44.279Z"
  },
  "username": "shirokova_straightforward",
  "remainingTime": {
    "$date": "2025-08-19T01:51:29.670Z"
  }
},
{
  "_id": {
    "$oid": "683b23d93770b19a277f4425"
  },
  "accountId": "6304571777-prefix-elba",
  "dc5": "30a7913a485200ec5c6d0b2e22fa2b7ab56aa1701d46a60efeebebce93dcb9989bbbda358513d54c0d5b90af914e383806b820938c00be23fbd55923c62303d85832d101fd70d81d09e8dc949e8f53055c74b517e5842397779e6369325c49db930f1879bf0f82b607b255e5f0c64b7e8b19f76c63e3e338d292a6133a019282bfbc0d4b43f7f9eff9d504aed3a52a653a6e88c595ee946b18f64ac66a47c3523337db7cffc7bd18fbe2543f9e0e4384ab3de6cd23f1654e77d556d05e4d7e9197e8e2a965ea1d431cc8111cd7abcc552fb818b44c2aa9268c094e56fb3c1773c1bc4b8798f64fa16a585581abeca702e125c2e55a202ce6b35c28987a91739c",
  "dcId": 5,
  "nextApiId": 2040,
  "dateUpdated": {
    "$date": "2025-08-19T10:14:23.331Z"
  },
  "twoFa": false,
  "twoFaDate": {
    "$date": "2025-08-18T00:42:33.798Z"
  },
  "phone": "+6289618517919",
  "banned": false,
  "firstName": "Vitaly",
  "id": "6304571777",
  "lastName": "Shubin",
  "messageCount": 14,
  "username": "shubin_melted",
  "personalChannel": "NRkbFRi4oheVlISp",
  "personalChannelDate": {
    "$date": "2025-05-31T16:36:05.771Z"
  },
  "lazyCheckDate": {
    "$date": "2025-08-18T13:35:12.361Z"
  },
  "automaticCheckDate": {
    "$date": "2025-08-19T10:14:23.331Z"
  },
  "remainingTime": {
    "$date": "2025-08-11T16:20:10.542Z"
  }
},
{
  "_id": {
    "$oid": "683b23db3770b19a277f44e9"
  },
  "accountId": "6311384650-prefix-elba",
  "dc5": "521d9ed5e5a6e53303d7bee57f92df6f78728d7f2e3999ee3b542cd4ece19fe43e141d10440411196fa26f60b376675346702a4c397e8e109036bf0332daaa043fc80b85637351aa8dc59aeb255eda0eca249e7c666c6c8edd04033eee0aff798457a781b66e9863c2b80bbb4fb4cd2e956fc7062e89b8dee5fde9e33a2fb4de335b981a03a46796261a8207ea131f85f332b8aa2489cb51ecb2869de68a6a73bdbe96fb5e5a32612ba123d46ab4b8052594bbb4fda1aa9084f38e60be457c88e9bbad30d4352e36aad3b017831183f731f60139763b8e6d8d2da9b97440b6dd404c770fe1ceb12dd1d50047b15eb3208968ffcee3873db59334d2ad06d80de0",
  "dcId": 5,
  "nextApiId": 2040,
  "dateUpdated": {
    "$date": "2025-08-19T10:22:24.050Z"
  },
  "twoFa": false,
  "twoFaDate": {
    "$date": "2025-08-18T00:42:38.273Z"
  },
  "phone": "+6285397470750",
  "banned": false,
  "firstName": "Ivan",
  "id": "6311384650",
  "lastName": "Zaytsev",
  "messageCount": 15,
  "username": "zaytsev_alleged",
  "personalChannel": "QpSZdmSGPTz8UJxk",
  "personalChannelDate": {
    "$date": "2025-05-31T16:33:36.086Z"
  },
  "lazyCheckDate": {
    "$date": "2025-08-19T00:29:53.698Z"
  },
  "automaticCheckDate": {
    "$date": "2025-08-19T10:22:24.049Z"
  },
  "remainingTime": {
    "$date": "2025-08-11T19:27:56.515Z"
  }
},
{
  "_id": {
    "$oid": "680b946f461801f5996017d2"
  },
  "accountId": "6319396273-prefix-female-dmp1",
  "dc1": "8c16f59930ddb4f366725cd070dce24ecb6e75d363df80b870e1ce51aa093331f5b76d65aca321f7933d04fff0e8ff164eb26314170c0e5d42a57e0fd99f79bd51736c9cbccd31e4b4669cb77aa8c087c4f13c34c43b750ef10a48259d17feb0cfa00b7ad19be884106a9966574cab3ef8d7ae44cd434131a9952ae8d63408a15d2fb902ce3819accaaf8a390648bb770f0e7ffdfb1e3f568a1a2c0db834014e4e6d170d861f77cd0807664b6fab21670e0e721a7ff2a28537d14e3dad501a82a7f2bcec16e3496429e0c2318345f3b1bbdb261718c990dd3e8d80e01202e66da873dbdd2cb862a7a36c272794cfe966abf76b9287f03318c24c468f1afa0917",
  "dcId": 1,
  "nextApiId": 2496,
  "dateUpdated": {
    "$date": "2025-08-19T10:23:43.648Z"
  },
  "twoFa": false,
  "twoFaDate": {
    "$date": "2025-08-18T10:48:05.909Z"
  },
  "phone": "+543417071820",
  "banned": false,
  "firstName": "Valeria",
  "id": "6319396273",
  "lastName": "Abramova",
  "messageCount": 138,
  "personalChannel": "JvUflpG5leCKrDGs",
  "personalChannelDate": {
    "$date": "2025-04-25T14:33:23.817Z"
  },
  "lazyCheckDate": {
    "$date": "2025-08-18T22:23:34.131Z"
  },
  "automaticCheckDate": {
    "$date": "2025-08-19T10:23:43.648Z"
  },
  "username": "abramova_apparent",
  "remainingTime": {
    "$date": "2025-08-19T05:26:16.784Z"
  }
},
{
  "_id": {
    "$oid": "680ebc50461801f599f388a8"
  },
  "accountId": "6321514633-prefix-bls",
  "dc4": "bd0ec6a58fb0693b808bc021730ecedf7342dc1ad2169bdb24fcfadbb28295255cc68165dea23d42099ab704a22ddab41dca0e1e9d0d076075d749ad4e4be839a0375003099d396aa218c810d2cbbdba6a11b50c1d7f60ed6b179465748943cbacee5bd9368edc91fff38c77753b8a86f6d08e5a80c3dec60599fa34cb83263c72cb049652d7cd34a7a71e9ebf89e69f53ac849ad5882420e9af0b7f49db9dd24abb17906ea75e7c087d2272eba4f1af96a4a69d70a02673c3433ac71ed4a41f8689ff0f4cab7ae2c99c38022a72cfa3a84224e64d30938a46b95cee5ca64e77fd6149d8a8d8044eea236ed62b3d5fe8cd780db8144aa11fc2b036f90cc6e044",
  "dcId": 4,
  "nextApiId": 2040,
  "dateUpdated": {
    "$date": "2025-08-19T10:18:24.759Z"
  },
  "twoFa": false,
  "twoFaDate": {
    "$date": "2025-08-17T20:15:27.843Z"
  },
  "phone": "+201220024084",
  "banned": false,
  "firstName": "Igor",
  "id": "6321514633",
  "lastName": "Vlasov",
  "messageCount": 9,
  "username": "vlasov_statistical",
  "personalChannelDate": {
    "$date": "2025-05-23T08:01:12.267Z"
  },
  "lazyCheckDate": {
    "$date": "2025-08-18T14:04:07.736Z"
  },
  "automaticCheckDate": {
    "$date": "2025-08-19T10:18:24.759Z"
  },
  "personalChannel": "RikrQ3gQgYpqClWS",
  "remainingTime": {
    "$date": "2025-05-28T09:21:06.675Z"
  }
},
{
  "_id": {
    "$oid": "680b9473461801f599601900"
  },
  "accountId": "6335440180-prefix-female-dmp1",
  "dc1": "c3b2ef4e94690bb60213d3ae5a00a2924c45bdda28c4e25357f6466fc66332f90ce126431577c5547bc5c8d1dca3b2eef0362e0ffd4d6be936fce8492c2c3f614a2d662935e1c0dfd3e88e72fa318fd2556ea7c91e8127d9c1b7d4faa69e83e1a76d69b63957592004eaf9f983194153575beb0f8eeb6c3d9bd90822c52bd923ea9e9c67b28c6a9fb5806e6da239e4f7a4af49d4a9f28d0f43d375984ffb3c4b10bd7a7fdbd128db74308fe5397df0ceee6bf8b2c30e1d5148fb14a08faf3087f8d794f1928486e5e83a3c8f3b418201fb30b1584f699be7d0d76c25a35d304812013a2dfd7cc9d67dae4e888281d8cde77ee6d15f3c699242486ca51e6ab0e1",
  "dcId": 1,
  "nextApiId": 2496,
  "dateUpdated": {
    "$date": "2025-08-19T10:19:31.990Z"
  },
  "twoFa": false,
  "twoFaDate": {
    "$date": "2025-08-18T10:48:01.455Z"
  },
  "phone": "+541136615692",
  "banned": false,
  "firstName": "Vera",
  "id": "6335440180",
  "lastName": "Ignatova",
  "messageCount": 102,
  "personalChannel": "kJvd9yeBNAiyPOUm",
  "personalChannelDate": {
    "$date": "2025-04-25T14:30:52.194Z"
  },
  "lazyCheckDate": {
    "$date": "2025-08-18T21:18:01.846Z"
  },
  "automaticCheckDate": {
    "$date": "2025-08-19T10:19:31.990Z"
  },
  "username": "ignatova_ruling",
  "remainingTime": {
    "$date": "2025-08-18T13:16:35.340Z"
  },
  "historySpamBlocks": [
    {
      "spamBlockDate": {
        "$date": "2025-06-26T11:15:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-07-09T04:45:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-08-10T18:08:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-08-13T21:01:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-08-13T06:11:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-08-17T07:30:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-08-25T11:19:00.000Z"
      },
      "spamBlockDays": 7
    }
  ],
  "spamBlockReasons": [
    {
      "reason": "Ive always used my account properly, without any violations. Now, I can only message mutual contacts, which means I cant reach important business contacts and clients. This restriction is really affecting my work and Id appreciate it if we could find a way to lift it.",
      "date": {
        "$date": "2025-08-18T11:53:30.715Z"
      }
    },
    {
      "reason": "Ive never sent spam or done anything suspicious on Telegram, but now Im stuck only being able to message mutual contacts. This is a real problem since I run a small business and need to reach customers and suppliers who arent in my contacts. Because of this restriction, Im losing deals and its hurting my business.",
      "date": {
        "$date": "2025-08-18T14:19:21.312Z"
      }
    },
    {
      "reason": "Ive always followed Telegrams rules, never engaging in any suspicious activity. Despite this, Im unable to message anyone beyond mutual contacts, which is preventing me from reaching my family and close friends in urgent situations. This restriction is causing unnecessary distress and difficulty in maintaining important connections.",
      "date": {
        "$date": "2025-08-18T18:44:05.251Z"
      }
    }
  ],
  "spamBlockDate": {
    "$date": "2025-08-25T11:19:00.000Z"
  },
  "spamBlockDays": 7,
  "spamBlockInitDate": {
    "$date": "2025-08-18T11:53:30.722Z"
  }
},
{
  "_id": {
    "$oid": "680b946c461801f59960172b"
  },
  "accountId": "6351296990-prefix-female-dmp1",
  "dc1": "78d005143333aa3a3453c9cdea981500c5a6358546cc8f9529092faef6a01b3a829bda1d093ccccf7bb5d1c09b7e8c2cfd5814b7e6e3533bb6fc5f7d37193c142a57f6ccf6c815cf4fe8a650720a181fe1c4820a406ee01532b87e2e45a9e3968536fde8eaf05e864f8c57229243b639b34e852faa2c10b1e885beaa42472c8190a6ce826e89edb07d45186168f263112b795b67c0d0bb47b7d0e10b79bf15b62b497471838c52d91e2e89e6ce6580bb2871f242cc92409e81c90eaf16c51addc14268a4c55f6f2abd22345edbb6dbf6f1bd041cd7ea63a339e0f31568ba9877a6e1143a04f99e84783f2d101712868397b2bc3045600b365b216cdf8d2432fd",
  "dcId": 1,
  "nextApiId": 2496,
  "dateUpdated": {
    "$date": "2025-08-19T10:29:43.554Z"
  },
  "twoFa": false,
  "twoFaDate": {
    "$date": "2025-08-18T10:47:58.951Z"
  },
  "phone": "+573104442520",
  "banned": false,
  "firstName": "Galina",
  "id": "6351296990",
  "lastName": "Naumova",
  "messageCount": 47,
  "personalChannel": "tLFYRnNNngKYw6gt",
  "personalChannelDate": {
    "$date": "2025-04-25T14:31:30.282Z"
  },
  "lazyCheckDate": {
    "$date": "2025-08-18T15:52:27.808Z"
  },
  "automaticCheckDate": {
    "$date": "2025-08-19T10:29:43.554Z"
  },
  "username": "naumova_fluttering",
  "remainingTime": {
    "$date": "2025-08-19T02:54:05.247Z"
  }
},
{
  "_id": {
    "$oid": "683b23d33770b19a277f424d"
  },
  "accountId": "6363815682-prefix-elba",
  "dc5": "203501b896da4b733bef50a07e5db0a0241369ec327c6ade1ad3cb585730a73ec8eeae06fade8ee3ae3814a8f8e0aa1d0da01d25d94b810d87b6d89d29919d8beaceb21dd80103d41820363454e90462eb7d9534e171ad82c618f4a21a788deead5e68ce724b82ec409e5b910288942955213325a642e3e24c8fc7d6e7590146f1cd1955377005d05723f84e822768948dba405810aa251eb59b89df3a8f56bd6640c7945aa2a7e245b3ac474c7a02ec41578e149c63090e1c8067392666e10e550cbb7ae186dce99d63d4de30b8e2689708f16d503fbd2a54b763d5a92b953a05fcb143791604dd1b572297f48c53233f2675972b6df5454b2821add7af8668",
  "dcId": 5,
  "nextApiId": 2040,
  "dateUpdated": {
    "$date": "2025-08-19T10:36:19.761Z"
  },
  "twoFa": false,
  "twoFaDate": {
    "$date": "2025-08-18T00:42:26.796Z"
  },
  "phone": "+6287720966132",
  "banned": false,
  "firstName": "Georgiy",
  "id": "6363815682",
  "lastName": "Rusanov",
  "messageCount": 11,
  "username": "rusanov_easy",
  "personalChannel": "sU8keVRSbFkoodAF",
  "personalChannelDate": {
    "$date": "2025-05-31T16:34:01.537Z"
  },
  "lazyCheckDate": {
    "$date": "2025-08-19T00:55:32.776Z"
  },
  "automaticCheckDate": {
    "$date": "2025-08-19T10:36:19.761Z"
  },
  "remainingTime": {
    "$date": "2025-08-09T13:06:06.477Z"
  }
},
{
  "_id": {
    "$oid": "680b946e461801f59960179d"
  },
  "accountId": "6369307109-prefix-female-dmp1",
  "dc1": "9fb3c965165defb52f47a068db7683c67baa8859a6f9401666f63a553450bcc765f39fccbe5a71eeed907f508b0fe722e646d9854f0094accf8d3333ff0e2e09c3bce8069eb6cea98defdb40caabada39f0011cd88b21062e00f1774f9a14f9cb1c43af1f9c0bb1886ad879ff8f3898a668b83b100138a1cf5314ea6402a9c627060c8d504bb9ed55e2c2d1f96c67ec49cae2524b0f3254aab510d7af4f6ab88f7819856f1a2b35d793723295171ec09902a24df3ac6b1fc608f44ee8e75ecc79471a2710848ded4a3919564e3753297df1937d68949f8db2bb082814e8f58a408daa2b546f842b25b410829621d8481f91141f47d7b6f20bfb6129fde01210d",
  "dcId": 1,
  "nextApiId": 2496,
  "dateUpdated": {
    "$date": "2025-08-19T10:34:43.594Z"
  },
  "twoFa": false,
  "twoFaDate": {
    "$date": "2025-08-18T10:48:03.105Z"
  },
  "phone": "+573013393509",
  "banned": false,
  "firstName": "Raisa",
  "id": "6369307109",
  "lastName": "Nechayeva",
  "messageCount": 45,
  "personalChannel": "aK0blZYrJRtoXMfj",
  "personalChannelDate": {
    "$date": "2025-04-25T14:31:15.396Z"
  },
  "lazyCheckDate": {
    "$date": "2025-08-18T19:10:21.436Z"
  },
  "automaticCheckDate": {
    "$date": "2025-08-19T10:34:43.594Z"
  },
  "username": "nechayeva_healthy",
  "remainingTime": {
    "$date": "2025-08-19T03:40:34.394Z"
  },
  "historySpamBlocks": [
    {
      "spamBlockDate": {
        "$date": "2025-05-05T12:16:00.000Z"
      },
      "spamBlockDays": 1
    }
  ]
},
{
  "_id": {
    "$oid": "683b23e93770b19a277f492b"
  },
  "accountId": "6370511927-prefix-elba",
  "dc1": "a2e563a4be9ff811c8577cb88fb3bbe766d7937f889fd2c927be195c6b796d673191e3059074e568723628f5ea214db0b640e24bc298478fda54d72de275e446f668f2a929b092d7210db45dc5809fc03b4797fcb87bcb1699e9289814fdfd3abe896230aa050580a039655533f4a5aaf1cf9586b21efce5d8f9227a74ca3acd8c7ddab2b40b21b278bc3eb425e2874ad227af002181aed65321740949c211a0b64b1e04ecba293bf7f9b58c95aab58a55e8fb0d4a0498aba69c8d453b23c94500496afb314a8ecb54c89bfbd51521dd59abe9881b2eeebdc5978699d685d6ff891089bb7af433ae2cc6c5c8fdb53ded22d85b493db4e6667f0b1a62d1a7a366",
  "dcId": 1,
  "nextApiId": 2040,
  "dateUpdated": {
    "$date": "2025-08-19T10:16:26.785Z"
  },
  "twoFa": false,
  "twoFaDate": {
    "$date": "2025-08-18T00:42:33.704Z"
  },
  "phone": "+573112019713",
  "banned": false,
  "firstName": "Timofey",
  "id": "6370511927",
  "lastName": "Popov",
  "messageCount": 4,
  "username": "popov_managerial",
  "personalChannel": "fjrZFknjRVWJuuV2",
  "personalChannelDate": {
    "$date": "2025-05-31T16:35:36.191Z"
  },
  "lazyCheckDate": {
    "$date": "2025-08-19T01:06:41.922Z"
  },
  "automaticCheckDate": {
    "$date": "2025-08-19T10:16:26.785Z"
  },
  "remainingTime": {
    "$date": "2025-08-09T10:12:22.980Z"
  }
},
{
  "_id": {
    "$oid": "680b9472461801f5996018a3"
  },
  "accountId": "6371238484-prefix-female-dmp1",
  "dc1": "85a7ea99bc60cf0750390d2b8660fa331d62f10194daa741fa05088deeada5c2398bdb66d37c1d12abc4669aa9b275301bb92db0ccdb1e6e60608392f10210c9ef3ff90e521ff36fa50630b1cc19d500fb262fec78ea6364869c8675d287dca4a2d2686958b24ad372ec4bdcefc3bcfeff1801222fe5a2f5df276fe9415bbf8ec12eb26b4c7b535066a037d0018b3bbe746d872d51e99d63fe8b3d95177090c0fe980beb0ea3d674f7d47ed296c3c9ee5eee658532b42b9a984f6e2bde6559987f8018254a283907ff10891356386bf29d1cc56fd801263de31e3db3ce5942c58cea77c2907b074d4ceb42a0a207adf017375cca1b794cd11e760e1378031d4f",
  "dcId": 1,
  "nextApiId": 2496,
  "dateUpdated": {
    "$date": "2025-08-19T10:22:44.938Z"
  },
  "twoFa": false,
  "twoFaDate": {
    "$date": "2025-08-18T10:48:15.872Z"
  },
  "phone": "+541126753539",
  "banned": false,
  "firstName": "Svetlana",
  "id": "6371238484",
  "lastName": "Chugunova",
  "messageCount": 140,
  "personalChannel": "ydsP3UQNrfCEOoIm",
  "personalChannelDate": {
    "$date": "2025-04-25T14:32:46.891Z"
  },
  "lazyCheckDate": {
    "$date": "2025-08-18T22:14:38.073Z"
  },
  "automaticCheckDate": {
    "$date": "2025-08-19T10:22:44.938Z"
  },
  "username": "chugunova_ideal",
  "remainingTime": {
    "$date": "2025-08-19T06:00:55.794Z"
  }
},
{
  "_id": {
    "$oid": "683b23ea3770b19a277f493a"
  },
  "accountId": "6387059324-prefix-elba",
  "dc1": "21e0eab05f46b5faf774c0b197ce7bdcca18117ffff079f66c64ee8717929e076619fc4511516248dcee46bed3ddd5a11930eb7c36d9a9e65dbab617d0e902cbbf0f49ba363833fedcbda77d553caba2c67194ae038912ffd1af03c7649fba399afa60b075f223063f9ae2901a2d5dede6c59781fd570a5e3637df47e32da2aa2b435d8fefc06f7e5e64eefd016b5029c0e4871ef730f11fc979222d6b9a2ed5c6b1b8a7d164ab29a132988ffe3295fbfba6fbdedc03edb5828c9d6b795073512bc4c29f77283896ea67990be2736c7e82b311a5a823f263979a92c8ea13d1128731e943c384ed7b72008a4393b9300f027c4b57fd308d03be4f15c8107e38d7",
  "dcId": 1,
  "nextApiId": 2040,
  "dateUpdated": {
    "$date": "2025-08-19T10:34:30.133Z"
  },
  "twoFa": false,
  "twoFaDate": {
    "$date": "2025-08-18T00:42:12.870Z"
  },
  "phone": "+573001770739",
  "banned": false,
  "firstName": "Nikolai",
  "id": "6387059324",
  "lastName": "Alekseev",
  "messageCount": 5,
  "username": "alekseev_quixotic",
  "personalChannel": "g7FfhvebPMKqFEjN",
  "personalChannelDate": {
    "$date": "2025-05-31T16:31:25.755Z"
  },
  "lazyCheckDate": {
    "$date": "2025-08-18T18:03:09.155Z"
  },
  "automaticCheckDate": {
    "$date": "2025-08-19T10:34:30.133Z"
  },
  "remainingTime": {
    "$date": "2025-08-11T19:27:44.248Z"
  }
},
{
  "_id": {
    "$oid": "685f07503770b19a27ab223c"
  },
  "accountId": "6392941479-prefix-female-gidrovell",
  "dc1": "9b7051686b5d18ff4e914888b623f29dd92626c214260ff38fb5635d19c177df075852143c8dd63287fd2403a8dce4e2ca38394f6ecfe8bed3ebd73296d1ea8204fa268d03e3368be7768676114f0dc32e2be48dbc5f8b86b122b48f40eb7280c4016fd9bb1e40984281e47d589739a40e845f7cc0f4dddad15fc33323f7840f9278898f4a81bf8ad9e6644e3c41124353028b51871cdffa1baab476ca08a1548d7ae919878ee484dfffea4527199cfe6d10fdbaf549c3e146f6e9b11d443f0cffd930d22b7d39772098edc441473789d066c60fe55084f05ec710d6e218949a7fe6fd9efd3a7fc25a44976ce51dc263ec1e923757c41b7930b94b9944f3f301",
  "dcId": 1,
  "nextApiId": 2040,
  "dateUpdated": {
    "$date": "2025-08-19T10:17:27.733Z"
  },
  "twoFa": false,
  "twoFaDate": {
    "$date": "2025-08-18T10:48:00.887Z"
  },
  "phone": "+522214045629",
  "banned": false,
  "firstName": "Inna",
  "id": "6392941479",
  "lastName": "Abramova",
  "messageCount": 31,
  "username": "abramova_misty",
  "personalChannelDate": {
    "$date": "2025-08-16T21:17:20.029Z"
  },
  "personalChannelError": "CHANNEL_NOT_FOUND",
  "lazyCheckDate": {
    "$date": "2025-08-18T19:55:36.908Z"
  },
  "automaticCheckDate": {
    "$date": "2025-08-19T10:17:27.733Z"
  },
  "remainingTime": {
    "$date": "2025-08-05T14:09:22.956Z"
  }
},
{
  "_id": {
    "$oid": "683b23da3770b19a277f4445"
  },
  "accountId": "6398842095-prefix-elba",
  "dc5": "144760495e9b311573165a55b679da2fda7d1ee203e025e7039d399a79bde584705fcfaddcfe62a53da5fac3286e795c6db1420129230ebc5a5bdb329f376552e48287292ce839d25c70ccd884e72acde024c83a1fc32118b6972b2ad41bdbc25f782f473c8d624bb23453fcad450156365ebc4ccd68d53b42318ee87253db07554a06f6149e887b948bae5b78780c96c43ea81a574ab9dc789e15721f67eb6e1b9cd0c216faa2ef882803e6846f9ec7539c4010f789a46ec1d67878b8158a292aa9369ae29f1eda4c079e1f99cfeb73ef1b9589bb49ed21d861bbb5f85962b88eea2ccc94647b5b617a2c6446952a2036bd12ab5658049ea16096bcb17b8dce",
  "dcId": 5,
  "nextApiId": 2040,
  "dateUpdated": {
    "$date": "2025-08-19T10:24:23.419Z"
  },
  "twoFa": false,
  "twoFaDate": {
    "$date": "2025-08-18T00:42:33.766Z"
  },
  "phone": "+6281336555775",
  "banned": false,
  "firstName": "Denis",
  "id": "6398842095",
  "lastName": "Martynov",
  "messageCount": 13,
  "username": "martynov_single",
  "personalChannel": "vUxucuB4KadhVWum",
  "personalChannelDate": {
    "$date": "2025-05-31T16:34:06.792Z"
  },
  "lazyCheckDate": {
    "$date": "2025-08-18T14:16:11.101Z"
  },
  "automaticCheckDate": {
    "$date": "2025-08-19T10:24:23.419Z"
  },
  "remainingTime": {
    "$date": "2025-08-09T12:24:49.517Z"
  }
},
{
  "_id": {
    "$oid": "683b23dc3770b19a277f4510"
  },
  "accountId": "6404837504-prefix-elba",
  "dc5": "3c55a75840cbc279b2589096a3f36685d0c22ab4bd4a64c15bbe80bac506a4eab207daaa51afbd8a6474026864560771d318d0f7041ae750041544277c05ad00a1b0c9fd9744573431c3b10d038aab36615ac95796e61123b2b9e8ede3e1f288edb0be032ab6fefbf1286fc6973f443bc27022fa626c5a4a6058414250514bc40d004d1ff008b686cf61b84f0a1b80fe276687ec1008ed8a21aeda87fb709e4664408c0448427911187c52464c75202f54b98126ea38e9fd2ca2a8239dfb241d7be09c4e436cb5bde750bd52e93e0b4296ca51cfb6675415ca0c37ea6d304d2c933c4c413f02321943dbd7dc22c10531ece3dfc80f1714db78b9c6c2d9e01df9",
  "dcId": 5,
  "nextApiId": 2040,
  "dateUpdated": {
    "$date": "2025-08-19T10:28:24.056Z"
  },
  "twoFa": false,
  "twoFaDate": {
    "$date": "2025-08-18T00:42:33.715Z"
  },
  "phone": "+6287749047642",
  "banned": false,
  "firstName": "Vitaliy",
  "id": "6404837504",
  "lastName": "Makarov",
  "messageCount": 10,
  "username": "makarov_northern",
  "personalChannel": "RKOeWTfzHQEdCgz3",
  "personalChannelDate": {
    "$date": "2025-05-31T16:31:28.671Z"
  },
  "lazyCheckDate": {
    "$date": "2025-08-18T14:52:19.962Z"
  },
  "automaticCheckDate": {
    "$date": "2025-08-19T10:28:24.056Z"
  },
  "remainingTime": {
    "$date": "2025-08-09T12:52:17.939Z"
  }
},
{
  "_id": {
    "$oid": "685f07483770b19a27ab1f91"
  },
  "accountId": "6413365763-prefix-female-gidrovell",
  "dc1": "7c6eb51d0c53e3b3d992037701056ac9bb08d14e9e815c37d90b3b0326006655debdac6e34f823951b6a369cd0e74d9a4833ce064457d421022ef7672d3d872736c3c0b871436750dc368c190cba8ed0d8cc30e2c7e8f85ce048b6f9e3d2c00fd83193fe039039d6e5c95a8a5b6fd252ba8bc497cb3fe8f4d31ce88498936111a0e9a68a0e55fd45ab0d5b3cb610aca97871081148df6e967ed5aeaad0727a3601073690f1c4c33be15499d32345769c5446bd8f0eceb6f55d06bbe1fd8df18642cd6e565414da2948e3874963cdac96571dd7dbcdd6ca7ae6f566a4d604f5edb202dfb04e3effce2edf28e6f10e79f7ba0efdb8f84775cd802f5f88b193913a",
  "dcId": 1,
  "nextApiId": 2040,
  "dateUpdated": {
    "$date": "2025-08-19T10:19:43.571Z"
  },
  "twoFa": false,
  "twoFaDate": {
    "$date": "2025-08-18T10:47:38.646Z"
  },
  "phone": "+542923644095",
  "banned": false,
  "firstName": "Raisa",
  "id": "6413365763",
  "lastName": "Samoylova",
  "messageCount": 27,
  "username": "samoylova_mysterious",
  "personalChannelDate": {
    "$date": "2025-08-16T21:17:22.011Z"
  },
  "personalChannelError": "CHANNEL_NOT_FOUND",
  "lazyCheckDate": {
    "$date": "2025-08-18T18:45:11.546Z"
  },
  "automaticCheckDate": {
    "$date": "2025-08-19T10:19:43.571Z"
  },
  "remainingTime": {
    "$date": "2025-08-11T12:09:05.809Z"
  }
},
{
  "_id": {
    "$oid": "680b9472461801f5996018ef"
  },
  "accountId": "6414422098-prefix-female-dmp1",
  "dc1": "04a850533144c2f720b16e1ed77aa154df2c9b85af453705894209b34258efe2fb17900f3264367706b09637f175c52c2765a9bd1e33911ee1b7ae3464e36c415676d7a2338b36093085bbaafb56f6359882a0ceec8376e4b83767bd3de33d7795b65fcda27fc60f6a9b666c78a9a47027b47c69ea9122768eadf4c4e0d768d64c16ca623a26216355ef5f96be2e13fb7595fb46b4bd319207a8c6f9c8a60232f94b1702ac4e0346263ee42942c9309b06dc06ce6ecd44c8bb1dfa5cc88b58ead74c26a52d1ea400d7eb1623f9ad2534113d81f894c5e3de79eb60d01f32481f811d163e1550d88f6bf01c4c73b48ca91d2de77dd71238afd6d4caeccc301144",
  "dcId": 1,
  "nextApiId": 2496,
  "dateUpdated": {
    "$date": "2025-08-19T10:40:41.184Z"
  },
  "twoFa": false,
  "twoFaDate": {
    "$date": "2025-08-18T10:47:58.910Z"
  },
  "phone": "+543834060039",
  "banned": false,
  "firstName": "Svetlana",
  "id": "6414422098",
  "lastName": "Belova",
  "messageCount": 123,
  "personalChannel": "qpvVcTBAnYj0MhNf",
  "personalChannelDate": {
    "$date": "2025-04-25T14:32:55.501Z"
  },
  "lazyCheckDate": {
    "$date": "2025-08-18T18:43:14.220Z"
  },
  "automaticCheckDate": {
    "$date": "2025-08-19T10:40:41.184Z"
  },
  "username": "belova_inappropriate",
  "remainingTime": {
    "$date": "2025-08-19T11:39:04.832Z"
  },
  "historySpamBlocks": [
    {
      "spamBlockDate": {
        "$date": "2025-04-28T15:52:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-05-05T15:50:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-07-09T02:55:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-08-20T07:48:00.000Z"
      },
      "spamBlockDays": 7
    },
    {
      "spamBlockDate": {
        "$date": "2025-08-15T10:33:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-08-15T15:51:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-08-16T19:12:00.000Z"
      },
      "spamBlockDays": 1
    }
  ]
},
{
  "_id": {
    "$oid": "685f074a3770b19a27ab206f"
  },
  "accountId": "6416425072-prefix-female-gidrovell",
  "dc1": "64f915fe7605d5b1214014f7d836c7cc0ddfa3525ccec0deefa5a53ef198bcfc2b8fa08d3cd68890361f5b341baf93525dbd15d627d89e3d166b055d851be51a84a25b9cd07d99cfd88c1607e51a3c7019ea658834417ace5a95ae12181f15f4f1bab2a5bd41471202a0fe9d518b70ce0e3dedaba8779e9e3fe0f5fe8f2c36305827c0a6747a1a0ad100a1464fe5f6c9f45fe927d0a29e5bbdce7e27ef7bb40f7dfc8e9d6e7e30b4f46dee7c0440d9a4b654d93483262048bfe986d01148b410dcd39026736973ab47fb07433c7567455554826f906961d53ab47343d8a358f8beca10e3c0f21eb673060b20640ac8777179ba7b571a638b0bd8e90f031707bf",
  "dcId": 1,
  "nextApiId": 2040,
  "dateUpdated": {
    "$date": "2025-08-19T10:12:42.696Z"
  },
  "twoFa": false,
  "twoFaDate": {
    "$date": "2025-08-18T10:47:53.045Z"
  },
  "phone": "+541151580392",
  "banned": false,
  "firstName": "Kira",
  "id": "6416425072",
  "lastName": "Trofimova",
  "messageCount": 26,
  "username": "trofimova_novel",
  "personalChannelDate": {
    "$date": "2025-08-16T21:17:09.061Z"
  },
  "personalChannelError": "CHANNEL_NOT_FOUND",
  "lazyCheckDate": {
    "$date": "2025-08-18T19:43:23.710Z"
  },
  "automaticCheckDate": {
    "$date": "2025-08-19T10:12:42.696Z"
  },
  "remainingTime": {
    "$date": "2025-08-06T14:18:47.186Z"
  }
},
{
  "_id": {
    "$oid": "680b9470461801f599601838"
  },
  "accountId": "6418926342-prefix-female-dmp1",
  "dc1": "07d9711a725cc4274e7b64e4c6a6921661b8658eac28b5f6377c9486053820a0ae7fd59bd79111ad8ba5ffe5ba76baece036ac083ab31ac814b5e7167094c01aba8c5c1fb84dbf0a122c9d107b501f30f171bc9f091ea6af3f9314bb609f3ddbedc121201981daf9d3d8d4b408168e6b5e5c24fbf6e300626572495536197cca36200b238b96a3ae913798b65b0f4a7fa5ac0d48462092c11df226493661ca87583af3be552df65a665ae5abc1becd9254b022906b28b190b1653ce40b77da74f4126b287437110e32611623813721d3079819b4d1901b60f75189f23fa81599f1a6003c04b5e0909dddc91a33ddd939e3b2c650d5e7e88daee8874911512aa9",
  "dcId": 1,
  "nextApiId": 2496,
  "dateUpdated": {
    "$date": "2025-08-19T10:13:43.732Z"
  },
  "twoFa": false,
  "twoFaDate": {
    "$date": "2025-08-18T10:48:07.876Z"
  },
  "phone": "+573246470142",
  "banned": false,
  "firstName": "Albina",
  "id": "6418926342",
  "lastName": "Baranova",
  "messageCount": 48,
  "personalChannel": "oCu7ljIZOmpmZefT",
  "personalChannelDate": {
    "$date": "2025-04-25T14:31:22.784Z"
  },
  "lazyCheckDate": {
    "$date": "2025-08-18T22:19:34.431Z"
  },
  "automaticCheckDate": {
    "$date": "2025-08-19T10:13:43.732Z"
  },
  "username": "baranova_identical",
  "remainingTime": {
    "$date": "2025-08-18T23:21:48.471Z"
  }
},
{
  "_id": {
    "$oid": "685f07503770b19a27ab2264"
  },
  "accountId": "6421502705-prefix-female-gidrovell",
  "dc1": "aa543ea22a3d43c03bdf3c0bac7d64ea23cb2ddb7220ab66941c1f8caf112f56ec0643f71edd1af26abb6e68037c730005401f57e7ae3d4478333988c07052f7687c727d0be701de9d16579b93d601ca77205cb9ddaccd515401a66c24e4625011fda6943c218fd933dd71bfb11e56d27b5ff3f624faa6e9b4e3c773b96a7cf974d1f3e3481e44f480b747b958a0441ab762eacefb910bba11539776d08024796727234cf77f1dda1b4ed99060874526eb6c91481bfdc42ca65c473973a8e5ad6f987f629fe2f5996e76563e9c40eb13eaa6cbe2a3f5178b15466ca98b5f1fad2b1f8811531862b7d5ab307370a47b61a9c9b7f9354c7c476ec2409d755aafab",
  "dcId": 1,
  "nextApiId": 2040,
  "dateUpdated": {
    "$date": "2025-08-19T10:13:28.994Z"
  },
  "twoFa": false,
  "twoFaDate": {
    "$date": "2025-08-18T10:47:41.182Z"
  },
  "phone": "+526863878048",
  "banned": false,
  "firstName": "Galina",
  "id": "6421502705",
  "lastName": "Alekseeva",
  "messageCount": 31,
  "username": "alekseeva_improved",
  "personalChannelDate": {
    "$date": "2025-08-16T21:17:15.189Z"
  },
  "personalChannelError": "CHANNEL_NOT_FOUND",
  "lazyCheckDate": {
    "$date": "2025-08-18T20:48:19.679Z"
  },
  "automaticCheckDate": {
    "$date": "2025-08-19T10:13:28.994Z"
  },
  "historySpamBlocks": [
    {
      "spamBlockDate": "INFINITY",
      "spamBlockDays": 0
    }
  ],
  "remainingTime": {
    "$date": "2025-08-11T12:32:58.703Z"
  }
},
{
  "_id": {
    "$oid": "683b23d83770b19a277f43bc"
  },
  "accountId": "6423543482-prefix-elba",
  "dc5": "b52c81cd43d53b8c1943bda51ca5e028d3bc3e0be2c9489fbf4ffc7694f1368ba5747ee4b80300f19f4e4e4088fec522e3364647dbd0b77fe748b268c996138a4cf60a44755aefab5b9010770426748d8b3612faaf1c1529e1476b02642a16d2fc75aa4f3876861b803d771f75f83c92ab3f04cdbde01a2a8166ae8763a96aaa4da414c745084bf5358899b6d362cdffb4e14784927b7423d0d1d2c371e2fcfba30e28ce3ff517a6d234ca7f6edbd3d357170aadc1b732b40c701f6ed3bae6948a17f042971e34653529665281f7bbdaf3908fbcb17636da3abc70c36a5a0982158013df481b42eb95e11a6e821b43d2e00fb9740248540ed17b589085096ba5",
  "dcId": 5,
  "nextApiId": 2040,
  "dateUpdated": {
    "$date": "2025-08-19T10:30:23.391Z"
  },
  "twoFa": false,
  "twoFaDate": {
    "$date": "2025-08-18T00:42:31.417Z"
  },
  "phone": "+6283120890774",
  "banned": false,
  "firstName": "Sergey",
  "id": "6423543482",
  "lastName": "Tomilov",
  "messageCount": 8,
  "username": "tomilov_official",
  "personalChannel": "IIWkAONfXRBqjNx8",
  "personalChannelDate": {
    "$date": "2025-05-31T16:33:02.529Z"
  },
  "lazyCheckDate": {
    "$date": "2025-08-18T23:57:21.813Z"
  },
  "automaticCheckDate": {
    "$date": "2025-08-19T10:30:23.391Z"
  },
  "remainingTime": {
    "$date": "2025-08-09T12:07:36.257Z"
  }
},
{
  "_id": {
    "$oid": "680b9470461801f599601849"
  },
  "accountId": "6432059703-prefix-female-dmp1",
  "dc1": "b39ae1fca821cc9c1431ff938cab16f5513102c4df0e1005313bf3b93b55b8ed3c81c18b8d765c306d63c7b1a1e1fac4fe819fdec4bbbd9f105f678d9c164180ec34a617fd4357f740af3fed6dc264ba74908e70d2cca257dd8a0d016988bde29e73dbce39ceb1dfa9a042fef1bbf3f852248e34a705f1dcff05f6170004e909448878011d4c1da299d817749bf580d718f3a8ea8678297fa93d34749e0e357ee48b4036d70377051536daa3008a8677143915c301fcca3709405a3a18e3d576b47587bb4c38e47e5cf47f8a75d4a81b5786696bb1868e822f8fad9131effc5d6550a5d2ea3d01c9b707ce25c5831dc80433e1bef423b7e3a6c2bb3e6eeb6649",
  "dcId": 1,
  "nextApiId": 2496,
  "dateUpdated": {
    "$date": "2025-08-19T10:39:45.085Z"
  },
  "twoFa": false,
  "twoFaDate": {
    "$date": "2025-08-18T10:48:07.856Z"
  },
  "phone": "+573102187031",
  "banned": false,
  "firstName": "Lubov",
  "id": "6432059703",
  "lastName": "Ilyina",
  "messageCount": 49,
  "personalChannel": "zUNOMyneEcJEH1qp",
  "personalChannelDate": {
    "$date": "2025-04-25T14:32:34.970Z"
  },
  "lazyCheckDate": {
    "$date": "2025-08-18T15:05:31.719Z"
  },
  "automaticCheckDate": {
    "$date": "2025-08-19T10:39:45.085Z"
  },
  "username": "ilyina_residential",
  "remainingTime": {
    "$date": "2025-08-19T03:17:20.615Z"
  }
},
{
  "_id": {
    "$oid": "685f07473770b19a27ab1f70"
  },
  "accountId": "6436168234-prefix-female-gidrovell",
  "dc1": "6d30a1460b583ee252840524275bdbc761bd94822f98750962cfce4599b1e430db359e30fac8e55ed5d44f8a08ccbe566bb4c0c455ea16b83ebf689e597d2cad2c8472dbe9f40fa76dfbceb708dbe936e11f99c3eb2b52c3c6acfe0573e4dfe26932e64093a0ea3fc145aad3ff169d15a4912b29e1614a59e7548fa0c33d1add09a762ae60dc414f11c157844d33bdb4689890f5491e0a58b9c106124312266b5a8cfb0617bb9630c97bdd9594f0ab49ba023c5d78f2b96b564bacbb58667f2018a5b1c30a25ee035a31422e97d7601dc5529ff3a9817fbcb9e198d97a8492e78bf72db3c3d0d51b7081c5ac9046004d10716e16f0e4a7a554e3fc60ddfc1905",
  "dcId": 1,
  "nextApiId": 2040,
  "dateUpdated": {
    "$date": "2025-08-19T10:38:41.470Z"
  },
  "twoFa": false,
  "twoFaDate": {
    "$date": "2025-08-18T10:47:40.173Z"
  },
  "phone": "+543424624793",
  "banned": false,
  "firstName": "Margarita",
  "id": "6436168234",
  "lastName": "Panfilova",
  "messageCount": 33,
  "username": "panfilova_responsible",
  "personalChannelDate": {
    "$date": "2025-08-16T21:17:21.829Z"
  },
  "personalChannelError": "CHANNEL_NOT_FOUND",
  "lazyCheckDate": {
    "$date": "2025-08-18T21:35:05.297Z"
  },
  "automaticCheckDate": {
    "$date": "2025-08-19T10:38:41.470Z"
  },
  "remainingTime": {
    "$date": "2025-08-11T12:29:56.083Z"
  },
  "historySpamBlocks": [
    {
      "spamBlockDate": {
        "$date": "2025-08-06T12:09:00.000Z"
      },
      "spamBlockDays": 1
    }
  ]
},
{
  "_id": {
    "$oid": "683b23d93770b19a277f4410"
  },
  "accountId": "6442396609-prefix-elba",
  "dc5": "1e1c58345289c49000e0349c874373463d2dad5c2f9bf664d7a50ec2bfd35342fa4b1581290a1a5fd71ad4b5cef08ca5028049dae99745d68de4a353a0ccccaff01a490c6632bfe11f50373b2171a2b931017c62888cff9f086ceed3ecc95cbdb855524b41818aba617b31c40525751d473796611a6f549ad4bdf8e7377775109a1839fd3fed9a65dbd824c9d1edd3b05d5be050513d7f6a12b83513016cd92e58c27d66643930793faa5dd930c4cb55193c0cb9d6ce7129faa76b081da6453d75904972f5dcb10c5b82cf22c544d3aa09fb1ac2f67d2b6fa8e4cef90a0adec0141836ed71383f117d939098011e796e151b8cb330bb9a7d9ab9c4bfed0ee0dd",
  "dcId": 5,
  "nextApiId": 2040,
  "dateUpdated": {
    "$date": "2025-08-19T10:24:23.386Z"
  },
  "twoFa": false,
  "twoFaDate": {
    "$date": "2025-08-18T00:42:31.470Z"
  },
  "phone": "+6282262576456",
  "banned": false,
  "firstName": "Stepan",
  "id": "6442396609",
  "lastName": "Grishin",
  "messageCount": 13,
  "username": "grishin_rainy",
  "personalChannel": "dgycCX0JpEdzTwds",
  "personalChannelDate": {
    "$date": "2025-05-31T16:32:58.965Z"
  },
  "lazyCheckDate": {
    "$date": "2025-08-19T01:04:43.878Z"
  },
  "automaticCheckDate": {
    "$date": "2025-08-19T10:24:23.386Z"
  },
  "remainingTime": {
    "$date": "2025-08-11T19:29:30.025Z"
  },
  "historySpamBlocks": [
    {
      "spamBlockDate": {
        "$date": "2025-08-08T14:39:00.000Z"
      },
      "spamBlockDays": 1
    }
  ]
},
{
  "_id": {
    "$oid": "683b23e73770b19a277f4860"
  },
  "accountId": "6444472261-prefix-elba",
  "dc1": "bb86d889df90e7c1a61d7c78925f74a2e93a21e9c6a2202f9783961ae07d5f17a4c1f963a66108736a63fc22fa65d65f05df2f7ebe5667132f0c10373b488220ceb4b8bc475cc0299c5b545de5681d98a2b930101da84607fe3345bfc5b1f247590e29cd1b2a5aca238645233d094495b9fcac90f5760f4f51029582629478b4334d5060b071970c3aba8e7b3cbb1c921136fc3544dd43f15ab5b0d382f6ecbd9d758d0f7d9087a7f9630e2f020cb5fd859e1731fd6eab581d116b962f6b725a647a81fc0bd931e6d46e287777e78ea70084a63445546d28eebff246c56633c700ff4964f582e23ba8c5f2e49a305013a2061836c399396541777a9855dfeb20",
  "dcId": 1,
  "nextApiId": 2040,
  "dateUpdated": {
    "$date": "2025-08-19T10:21:29.018Z"
  },
  "twoFa": false,
  "twoFaDate": {
    "$date": "2025-08-18T00:42:30.013Z"
  },
  "phone": "+573146315637",
  "banned": false,
  "firstName": "Vadim",
  "id": "6444472261",
  "lastName": "Korneev",
  "messageCount": 5,
  "username": "korneev_only",
  "personalChannel": "EqtaAzgWqr8MKgyi",
  "personalChannelDate": {
    "$date": "2025-05-31T16:32:58.919Z"
  },
  "lazyCheckDate": {
    "$date": "2025-08-18T14:01:06.345Z"
  },
  "automaticCheckDate": {
    "$date": "2025-08-19T10:21:29.018Z"
  },
  "remainingTime": {
    "$date": "2025-08-11T10:58:07.628Z"
  }
},
{
  "_id": {
    "$oid": "685f074d3770b19a27ab2194"
  },
  "accountId": "6453772023-prefix-female-gidrovell",
  "dc1": "732405a21522292854c7863e80790d4342c01290f3be58eb256cbbee47ef45d4f01cf07f9937b9d40bc71fe82f6258aad24b2bd157e04af85717884db76ce5149d80fd14851321234c4cf2161d1f36a375f7bfdbb0130d02d595675f6dec4bf2be166b7f979e72f1216ebe3892d97d17d0d23ff44a2e537af0dd70b9d90a3d80bb906ff792d3e3d690136cba442797c01aa123ca71322496a5053a2d76de8551f1293f094034f8225b3b0ac8bbe6749a668f1e683feda3696c7f44c05a078de503d11c667578114371d522070bce6653bbd28d7a808849bf2e474d9efc7723e5ae2269945f5e3ff35a5da5bff560462a624ecc30af232b5914da2810ca22175a",
  "dcId": 1,
  "nextApiId": 2040,
  "dateUpdated": {
    "$date": "2025-08-19T10:39:29.096Z"
  },
  "twoFa": false,
  "twoFaDate": {
    "$date": "2025-08-18T10:47:58.870Z"
  },
  "phone": "+529931683172",
  "banned": false,
  "firstName": "Mira",
  "id": "6453772023",
  "lastName": "Shubina",
  "messageCount": 31,
  "username": "shubina_magic",
  "personalChannelDate": {
    "$date": "2025-08-16T21:17:20.031Z"
  },
  "personalChannelError": "CHANNEL_NOT_FOUND",
  "lazyCheckDate": {
    "$date": "2025-08-18T20:49:55.094Z"
  },
  "automaticCheckDate": {
    "$date": "2025-08-19T10:39:29.096Z"
  },
  "historySpamBlocks": [
    {
      "spamBlockDate": "INFINITY",
      "spamBlockDays": 0
    }
  ],
  "remainingTime": {
    "$date": "2025-08-11T12:34:13.257Z"
  }
},
{
  "_id": {
    "$oid": "685f074a3770b19a27ab209f"
  },
  "accountId": "6469701429-prefix-female-gidrovell",
  "dc1": "566acb1144b4b39c307b196a4c320df6f57e90e9a5d0e15302b0a7d02f1ce070921553843c9c04d74275d893db776076f7a41364bc5a1d4e8d1fd1121984a5f58dc20948bf428490f39190af33626173ba430cd0a4363d83212d086dcacec45f8d311fa166e5119a36288646ef02e9c61ddc4d1e5d949e25c2e36b383fbc87f3434c201c84010c0513f55bdbf7f161fc0ab80713e4800d6eed8ab5131bb0fae74c8f28ad628c31416a05e728b2827af90e7915ac0deeecc1f746f9159dbfb7d541986093be01104f8fcb99e447066d19a184432a26806623d4485534e2c02531a6d1863d2941d678f9c78f4cca8b1dc08beef78049604b03d95981f4d4e29c51",
  "dcId": 1,
  "nextApiId": 2040,
  "dateUpdated": {
    "$date": "2025-08-19T10:37:11.049Z"
  },
  "twoFa": false,
  "twoFaDate": {
    "$date": "2025-08-18T10:47:51.635Z"
  },
  "phone": "+541136963615",
  "banned": false,
  "firstName": "Nina",
  "id": "6469701429",
  "lastName": "Abramova",
  "messageCount": 23,
  "username": "abramova_existing",
  "personalChannelDate": {
    "$date": "2025-08-16T21:17:20.217Z"
  },
  "personalChannelError": "CHANNEL_NOT_FOUND",
  "lazyCheckDate": {
    "$date": "2025-08-18T20:01:39.096Z"
  },
  "automaticCheckDate": {
    "$date": "2025-08-19T10:37:11.048Z"
  },
  "remainingTime": {
    "$date": "2025-08-11T12:28:31.138Z"
  }
},
{
  "_id": {
    "$oid": "685f074c3770b19a27ab212e"
  },
  "accountId": "6486515306-prefix-female-gidrovell",
  "dc1": "66631a3fa89c5715237638aed91210174498c943913f168c1f9df869ccb3bf1cb0a94162d719fef058f0b8dc7351e67e32b559972cc0c78ec4b7982de50b28cf2a8a1bf99e4857311dc0ed7613cf45749bcc77e3e826707c26ef5c1226caeadfcff8115dbb6bee8b403da3a1dfdb0866a1fd23a1b08d4ecddbe264b41f3b06556b6ee4e045745a5f56839c47b4c117c6f09f36c8259bbbadd3895c755e4cd98ad44ec1117df309d4419185c22056b484e72f8fad73a3e9a97c8eadd39717e96645236ba08c519b4393a0af49da380793a812a8769fbc90e90e5c91b83ab55ce3a7082f3d1f0a72bd802be45c5b1d43803087cb35da9bb65d2445b3a005142d3d",
  "dcId": 1,
  "nextApiId": 2040,
  "dateUpdated": {
    "$date": "2025-08-19T10:23:22.254Z"
  },
  "twoFa": false,
  "twoFaDate": {
    "$date": "2025-08-18T10:47:56.686Z"
  },
  "phone": "+543754461201",
  "banned": false,
  "firstName": "Yulia",
  "id": "6486515306",
  "lastName": "Ustinova",
  "messageCount": 25,
  "username": "ustinova_gay",
  "personalChannelDate": {
    "$date": "2025-08-16T21:17:20.281Z"
  },
  "personalChannelError": "CHANNEL_NOT_FOUND",
  "lazyCheckDate": {
    "$date": "2025-08-18T21:17:11.971Z"
  },
  "automaticCheckDate": {
    "$date": "2025-08-19T10:23:22.254Z"
  },
  "historySpamBlocks": [
    {
      "spamBlockDate": "INFINITY",
      "spamBlockDays": 0
    }
  ],
  "remainingTime": {
    "$date": "2025-08-11T12:34:20.489Z"
  }
},
{
  "_id": {
    "$oid": "685f074f3770b19a27ab2203"
  },
  "accountId": "6489397572-prefix-female-gidrovell",
  "dc1": "c6f34f87227a2d78b06d0a95f745bec1bf92c4756ea599b1485c0c3ab92f154d40b170c4996d4b284fb84322b3296c9d7e22ee09f5295fd14776a8e379597dac114b047abc45f7e1246d6f63a3fd9d0c8b99f4207b414d706366dc9b0856c6a0fe8692c9818b498fe2afbeeff9caf8916a88533a47dfda481c40edbb29e92337997dabebe5dbb94e00bcc2124655d1dc714461a9c4b24b0646f90b5a3c0c80ff8256df4f289e4bf08e4842fee5e8f886f0f1347326439dd6ba33a841cdfa18d765f25887143e60ffb40a16387b6e1df268a62d90eecf0d870b6111a64821d4f966d535a70312c201524160017c938a7894b58e137071859783801b618ed6ec4e",
  "dcId": 1,
  "nextApiId": 2040,
  "dateUpdated": {
    "$date": "2025-08-19T10:13:29.217Z"
  },
  "twoFa": false,
  "twoFaDate": {
    "$date": "2025-08-18T10:48:04.061Z"
  },
  "phone": "+526143779242",
  "banned": false,
  "firstName": "Maria",
  "id": "6489397572",
  "lastName": "Borisova",
  "messageCount": 12,
  "username": "borisova_orange",
  "personalChannelDate": {
    "$date": "2025-08-16T21:17:20.835Z"
  },
  "personalChannelError": "CHANNEL_NOT_FOUND",
  "lazyCheckDate": {
    "$date": "2025-08-18T20:40:54.286Z"
  },
  "automaticCheckDate": {
    "$date": "2025-08-19T10:13:29.217Z"
  },
  "remainingTime": {
    "$date": "2025-08-05T14:09:38.729Z"
  },
  "historySpamBlocks": [
    {
      "spamBlockDate": {
        "$date": "2025-07-23T17:52:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-08-01T11:38:00.000Z"
      },
      "spamBlockDays": 7
    }
  ]
},
{
  "_id": {
    "$oid": "680b9469461801f599601646"
  },
  "accountId": "6504078223-prefix-female-dmp1",
  "dc1": "1b6374c42d7c5fe05a1ac307a8518f83795d94a88e0ab4027c08852ed794adf3c3ab8fc16ef63800308dbd23b819602a3bb03ec7437dc1522a727fc427f30bf6f58c8769432af3e242403b56a04689febc85c1efd959040a0e72e031fd6448dd1eea357e165fed42d0278ad8ac63cff71a455edd5467230e8c511b31905c8e810ff62d180d2b6fdc5a9a0f7b243171e76ead8dbace6239be02b1d19332f7fcedd8e64b4e088ef35beae5c90b686b00b677753442ff4df153e9c51bed0823e87a336b1b096837cf767e334c55c34ea945fb7ed82a117653b429c5b725860da7e04f1758f8400c56569cb4249582ca1f34def2b9e596fbbe04b8a1f9b68c4e5231",
  "dcId": 1,
  "nextApiId": 2496,
  "dateUpdated": {
    "$date": "2025-08-19T10:22:42.665Z"
  },
  "twoFa": false,
  "twoFaDate": {
    "$date": "2025-08-18T10:47:55.336Z"
  },
  "phone": "+523861267766",
  "banned": false,
  "firstName": "Kira",
  "id": "6504078223",
  "lastName": "Solovieva",
  "messageCount": 135,
  "personalChannel": "gXnIudMprkiJcV7j",
  "personalChannelDate": {
    "$date": "2025-04-25T14:30:44.988Z"
  },
  "lazyCheckDate": {
    "$date": "2025-08-18T14:22:51.051Z"
  },
  "automaticCheckDate": {
    "$date": "2025-08-19T10:22:42.665Z"
  },
  "username": "solovieva_spiritual",
  "remainingTime": {
    "$date": "2025-08-19T04:30:09.351Z"
  },
  "historySpamBlocks": [
    {
      "spamBlockDate": {
        "$date": "2025-07-04T05:13:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-07-04T13:32:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-08-16T09:08:00.000Z"
      },
      "spamBlockDays": 1
    }
  ]
},
{
  "_id": {
    "$oid": "683b23d93770b19a277f4432"
  },
  "accountId": "6512964096-prefix-elba",
  "dc5": "2c7716c13281a6baf366dff9c64a6ca7bb6e8e7aeaa4aae3cb42cbeedb43231055f9ae0c749815893ce7e08f776c7918441dcbe1030d9a78197cff19edb7cb4ea8946291bef8b5e1ee77d9ce464be3ff61bdae0b384408531f948f261a0f64f90825a3886658a2dd865a90a2b149724071a202139decc69b2073f7779701ca234781d458d7e6fb9561ac6289b2d3fb2ea5e3b654573f47135bcf24f0b7120375a4996f3745cbf1469a5d8c62db152131917df2491dcd7823373c2eb3cb78a38fe3f9e748410c2c9b7e38368e6f1e73a094942fbb25e8bce6524faa8c9854189bfdbc8a96c78a19613622cd8df037edf3dec7bf382e6a7f82863f60d12d432622",
  "dcId": 5,
  "nextApiId": 2040,
  "dateUpdated": {
    "$date": "2025-08-19T10:38:23.428Z"
  },
  "twoFa": false,
  "twoFaDate": {
    "$date": "2025-08-18T00:42:30.839Z"
  },
  "phone": "+6285259141877",
  "banned": false,
  "firstName": "Anton",
  "id": "6512964096",
  "lastName": "Glazunov",
  "messageCount": 13,
  "username": "glazunov_zestful",
  "personalChannel": "ADUOAkwui7PVLxTC",
  "personalChannelDate": {
    "$date": "2025-05-31T16:36:04.312Z"
  },
  "lazyCheckDate": {
    "$date": "2025-08-18T15:31:15.068Z"
  },
  "automaticCheckDate": {
    "$date": "2025-08-19T10:38:23.428Z"
  },
  "remainingTime": {
    "$date": "2025-08-11T19:29:18.675Z"
  }
},
{
  "_id": {
    "$oid": "680b9471461801f599601865"
  },
  "accountId": "6514892505-prefix-female-dmp1",
  "dc1": "63637ffad8b18d7f3c8ba00fea6a86d9c03b7ab3657ffaa0ed227a9d6f37d6829fb3b586b78cd0607986188236eca256365c3d0f5ce97bf86d6064695c563a3126782efdd53164c9c8858f03c5d3ec18ccc9fc42f05a931a4f677221de1b2bb3ea76b4c3afdbfc89b28c7932349a57b16baf7871fa60e2b87d63b1befe1792e9ee743248aefb086efdc57cb5414c9a83b01727f9feb5b946ac6204f17d9edffe0a8a1225d6f9ab7cc165067fa14b7d64e3ec7cb19604f9e61093382e0b37e78413584546c4c210400886e002a629a594c10a8dfd469d1963d636cb8d6360e0d920fd97a3eaa95b1facff40d1e8a8629f25543a04d0e1d6baa79ef3e6b530b469",
  "dcId": 1,
  "nextApiId": 2496,
  "dateUpdated": {
    "$date": "2025-08-19T10:16:44.837Z"
  },
  "twoFa": false,
  "twoFaDate": {
    "$date": "2025-08-18T10:48:07.878Z"
  },
  "phone": "+543415010402",
  "banned": false,
  "firstName": "Ekaterina",
  "id": "6514892505",
  "lastName": "Maksimova",
  "messageCount": 140,
  "personalChannel": "YaDso1VOBRUSUURH",
  "personalChannelDate": {
    "$date": "2025-04-25T14:33:23.476Z"
  },
  "lazyCheckDate": {
    "$date": "2025-08-18T14:00:07.043Z"
  },
  "automaticCheckDate": {
    "$date": "2025-08-19T10:16:44.837Z"
  },
  "username": "maksimova_wee",
  "remainingTime": {
    "$date": "2025-08-19T05:46:44.452Z"
  }
},
{
  "_id": {
    "$oid": "683b23d93770b19a277f4409"
  },
  "accountId": "6522022955-prefix-elba",
  "dc5": "7c6eabdecbb2f0fcc7b6f3b5b7945d35a93d4afc5f21622389c9a9e7f121e3571c356ae30a6514aa5b64c8ad41eb91d133e8bbe695866609e5ed4b62eca44d0a1106239a2e619a43c6b355e8239842c8c0af0fd32dcdc8a36dec300505b212ef101d3ce06d1050ecca02ed47bb9449ccb048868544ffd24ae653326f28518d6d0cf0918a58c596db5eea695549eb8c4ea1ed005f9c9d3aa13ae04be8c8a92361dc8d1fc94a6f734c36700f727e8566ead9c5861f9bfcb5b93bcec5ef676b878253f1f1a0a5b72d94725a9539d725246f5b6d7141608b635ac6cb274d9fdf44d1d41915ba34cb67a134e5e1fd23599971e6ae747efc59b98f9ba105f11b2880d0",
  "dcId": 5,
  "nextApiId": 2040,
  "dateUpdated": {
    "$date": "2025-08-19T10:13:26.693Z"
  },
  "twoFa": false,
  "twoFaDate": {
    "$date": "2025-08-18T00:42:31.422Z"
  },
  "phone": "+6283873567791",
  "banned": false,
  "firstName": "Victor",
  "id": "6522022955",
  "lastName": "Lobanov",
  "messageCount": 9,
  "username": "lobanov_coral",
  "personalChannel": "fWzdVB6AkzKGpSmh",
  "personalChannelDate": {
    "$date": "2025-05-31T16:32:12.430Z"
  },
  "lazyCheckDate": {
    "$date": "2025-08-19T03:14:50.838Z"
  },
  "automaticCheckDate": {
    "$date": "2025-08-19T10:13:26.693Z"
  },
  "remainingTime": {
    "$date": "2025-08-09T13:06:07.530Z"
  },
  "historySpamBlocks": [
    {
      "spamBlockDate": {
        "$date": "2025-06-03T10:25:00.000Z"
      },
      "spamBlockDays": 1
    }
  ]
},
{
  "_id": {
    "$oid": "685f074d3770b19a27ab2189"
  },
  "accountId": "6522458595-prefix-female-gidrovell",
  "dc1": "3e975f4882aade062730d894d4d3689b00b6742d4b0b051ae8747d770381326d24a22c6771be25651e2135bd1b77d3202593c5da386a57c333bcdc5d60c42794d5144bd3f0bbe5182da9d9ce14fdd8613fafecc0bb13b7a32f4536bfaedc7a581b744465cd1ed3b40e2fd7084c24c824c4f3fe8a180989d698cf80b86a0e32b525e3b8fee0a2e24bc6157a30ca61aac21b1aeaddda53e73aa23e3d892f141be7076a3cff7cadd99e554643f5a33c70f58c7ee07e4f5564575007cb1f6f6763771322552e62279f84e91eecd110f57e9c59b1cd06dbb4aff25f8590d61e56b98512a21cdf757236ead1f21f1cd67e587798b1d5c79425f4454fadb8dd5a28eae3",
  "dcId": 1,
  "nextApiId": 2040,
  "dateUpdated": {
    "$date": "2025-08-19T10:22:25.516Z"
  },
  "twoFa": false,
  "twoFaDate": {
    "$date": "2025-08-18T10:47:56.945Z"
  },
  "phone": "+522212779256",
  "banned": false,
  "firstName": "Anna",
  "id": "6522458595",
  "lastName": "Zhdanova",
  "messageCount": 23,
  "username": "zhdanova_raw",
  "personalChannelDate": {
    "$date": "2025-08-16T21:17:20.033Z"
  },
  "personalChannelError": "CHANNEL_NOT_FOUND",
  "lazyCheckDate": {
    "$date": "2025-08-18T17:58:31.090Z"
  },
  "automaticCheckDate": {
    "$date": "2025-08-19T10:22:25.515Z"
  },
  "remainingTime": {
    "$date": "2025-08-11T12:06:06.677Z"
  }
},
{
  "_id": {
    "$oid": "680b946a461801f59960169c"
  },
  "accountId": "6525769764-prefix-female-dmp1",
  "dc1": "81e7c9168542dbee0c727017736342c60ea66fe331baa4f9d14e856616d613360038e92bead5272689871aa35236592c9562dec3b475acbafc640685d3277380775cbeece96792a9325a71bdb4c3933b3ea586e00092215d09498c7ab5bd3650436b22a601fe0f3105756ed67c23da1ce85b11c6322d0af329ff832577f9a69f354e5b5649922422424426375b96394b15c32bdb8ee31724479a6709a1922fac53979e0ecada8c563897e3e38dbace1f97ef5b7948579df6c80e383aa62754f95e44b843033c566f5dc34145a91e1c9927a0a781063523b548e452e6086aa577f947f889044711e5e29dc8380f062e7d6793e0c3395694288002490781d513d2",
  "dcId": 1,
  "nextApiId": 2040,
  "dateUpdated": {
    "$date": "2025-08-19T10:38:42.579Z"
  },
  "twoFa": false,
  "twoFaDate": {
    "$date": "2025-08-18T10:47:59.409Z"
  },
  "phone": "+573005757332",
  "banned": false,
  "firstName": "Albina",
  "id": "6525769764",
  "lastName": "Tsyganova",
  "messageCount": 47,
  "personalChannel": "lPHUKNkJuNjzra6E",
  "personalChannelDate": {
    "$date": "2025-04-25T14:34:25.470Z"
  },
  "lazyCheckDate": {
    "$date": "2025-08-18T23:42:12.524Z"
  },
  "automaticCheckDate": {
    "$date": "2025-08-19T10:38:42.579Z"
  },
  "username": "tsyganova_solid",
  "remainingTime": {
    "$date": "2025-08-19T02:36:12.700Z"
  }
},
{
  "_id": {
    "$oid": "685f074c3770b19a27ab2128"
  },
  "accountId": "6531664534-prefix-female-gidrovell",
  "dc1": "09beb129d498a9a53392b255070cb34ad62ad97c41c2d28293728f2aff6b2ff3fd05ed588a8081150dc7c37dc25b0b2fa788a09ea0dfc36e83b5fa017c08b4d580e74505fd6c4265f1ee1db3675e76d99ef5415feb00f6d69528e2b169d55e1960be18828f6f449a225118be44dcd4e32062329a965232412f05f630538bd2fa6bac9961d5705c7055338f4c2a256d7238e582c567a785f7ade51bd4b98bfa93ae7edeab5b8cd62ab6dae385ffcd01c1341b1d8249d20a0e674c719699b5c5b33c5c67b1cb7003676b589f9512051e7bc03dffbbb5853f93ce752da3aee988b1849a73bc3c5b92790258b9d927b7ce4b9b1f62ff311438131bc3c0a0b6d4ed1a",
  "dcId": 1,
  "nextApiId": 2040,
  "dateUpdated": {
    "$date": "2025-08-19T10:29:29.422Z"
  },
  "twoFa": false,
  "twoFaDate": {
    "$date": "2025-08-18T10:48:02.746Z"
  },
  "phone": "+543416172892",
  "banned": false,
  "firstName": "Raisa",
  "id": "6531664534",
  "lastName": "Vasilyeva",
  "messageCount": 23,
  "username": "vasilyeva_urgent",
  "personalChannelDate": {
    "$date": "2025-08-16T21:17:21.282Z"
  },
  "personalChannelError": "CHANNEL_NOT_FOUND",
  "lazyCheckDate": {
    "$date": "2025-08-18T23:48:23.747Z"
  },
  "automaticCheckDate": {
    "$date": "2025-08-19T10:29:29.422Z"
  },
  "remainingTime": {
    "$date": "2025-08-06T14:13:11.322Z"
  },
  "stopped": false
},
{
  "_id": {
    "$oid": "685f07473770b19a27ab1f66"
  },
  "accountId": "6537447237-prefix-female-gidrovell",
  "dc1": "8bd16528532942221bf487a5d802d87dab12d1553a096dc3606eba34e4e5333cfa0c6c5b882d05082227c1707cb5048120ba6a68fe1731caecf69e2dd88c4ec674ad8bbc6ff6b73fdec40625ecaf1ff3c91185b6aaaa03d3fcad33789133793de898393c7aa826568a250562dca21c621d69d593c7bfb3fb7144ca560299a008bef430fe896ba4fdf308b0573e67f734f4398ed0821af40615bc6d1c68a8dec3b40091369a9064baf7b61d7fffc843a04ad9191e9aabe0730959a97f460a6b46d0222e83b4f8734ac86368137f4f4527c85c335de8fbe268caa306b61765c645bec7639cfe89a9657c8e2c7869685bf2c662b86958096421709c27c6fbc1d0ea",
  "dcId": 1,
  "nextApiId": 2040,
  "dateUpdated": {
    "$date": "2025-08-19T10:35:41.567Z"
  },
  "twoFa": false,
  "twoFaDate": {
    "$date": "2025-08-18T10:47:38.654Z"
  },
  "phone": "+542325410539",
  "banned": false,
  "firstName": "Mira",
  "id": "6537447237",
  "lastName": "Dorofeeva",
  "messageCount": 31,
  "username": "dorofeeva_visible",
  "personalChannelDate": {
    "$date": "2025-08-16T21:17:22.004Z"
  },
  "personalChannelError": "CHANNEL_NOT_FOUND",
  "lazyCheckDate": {
    "$date": "2025-08-18T20:00:42.416Z"
  },
  "automaticCheckDate": {
    "$date": "2025-08-19T10:35:41.567Z"
  },
  "remainingTime": {
    "$date": "2025-08-11T12:32:08.386Z"
  }
},
{
  "_id": {
    "$oid": "685f074b3770b19a27ab20c3"
  },
  "accountId": "6538305221-prefix-female-gidrovell",
  "dc1": "36fa2eff370d875863c4d9123d824339830df568338a58fb434e0a9aa0a2f53c884bcfa95382cb1941a6ef65a3bafdbd9d0dc480792aecc524061a485ddae5be50194aa0de21fa9ecd9fc1326a5ee97b9f675696629060d234fdd71dd3bc2f0beeb63048f727911fb0e665d36e3cc7c55130a17666839ed38aa69ac15a09742d41bac72f9d0bff4bea851750210c25b210a9b5ac2a00af04d1059e462c50742ba9dbc9798d2be30b702ad98f784de7ae49b1f3b8dd17adf4e232fa0a71e8c201168205695a83f628c8fea8916a430fc247dcc9940d5e03ab208d0f9f31cb172d4f20276a85c94b2c799eeea165e975ab1122925347671377f7cd0374c02d52e5",
  "dcId": 1,
  "nextApiId": 2040,
  "dateUpdated": {
    "$date": "2025-08-19T10:29:25.504Z"
  },
  "twoFa": false,
  "twoFaDate": {
    "$date": "2025-08-18T10:47:55.665Z"
  },
  "phone": "+542926520113",
  "banned": false,
  "firstName": "Anastasia",
  "id": "6538305221",
  "lastName": "Loginova",
  "messageCount": 29,
  "username": "loginova_open",
  "personalChannelDate": {
    "$date": "2025-08-16T21:17:14.996Z"
  },
  "personalChannelError": "CHANNEL_NOT_FOUND",
  "lazyCheckDate": {
    "$date": "2025-08-18T22:53:52.901Z"
  },
  "automaticCheckDate": {
    "$date": "2025-08-19T10:29:25.504Z"
  },
  "remainingTime": {
    "$date": "2025-08-07T16:35:45.217Z"
  },
  "stopped": false
},
{
  "_id": {
    "$oid": "685f07483770b19a27ab1f81"
  },
  "accountId": "6539053486-prefix-female-gidrovell",
  "dc1": "873716d69302e819f3b99529f69532e450a807f16b8aa7219aa68dbfbadb0eb5d83026b7ec1b1e8c942e7e6deaf614fa4bf0d480b38c187d69b6755be715bf09a6fef4a390dcb630a78065aa84879fa46210fe2f41a430ecd6669eaf7185a11098b50ebc1b5f10f647525e123456389b2acf3834040af46928d8fe2c07c08801ac43b249e344063ed660bd52e287f76196d0b89d4fd88df19209530bbb455ad03d400ee4d9c688567f4797cc5dd082362620065c3e9619e153decf90340d4e329d5cb2c5fb98a0720751e00573643700a70389857a0799c4a6103af459f1e31f494a0f24a5fe25f0185a88cc63961eea615b8775234188a1392458c4899f32ee",
  "dcId": 1,
  "nextApiId": 2040,
  "dateUpdated": {
    "$date": "2025-08-19T10:18:42.365Z"
  },
  "twoFa": false,
  "twoFaDate": {
    "$date": "2025-08-18T10:47:33.745Z"
  },
  "phone": "+543888310542",
  "banned": false,
  "firstName": "Liza",
  "id": "6539053486",
  "lastName": "Volkova",
  "messageCount": 25,
  "username": "volkova_zygomorphic",
  "personalChannelDate": {
    "$date": "2025-08-16T21:17:23.718Z"
  },
  "personalChannelError": "CHANNEL_NOT_FOUND",
  "lazyCheckDate": {
    "$date": "2025-08-18T19:45:38.664Z"
  },
  "automaticCheckDate": {
    "$date": "2025-08-19T10:18:42.365Z"
  },
  "remainingTime": {
    "$date": "2025-08-11T12:31:32.516Z"
  },
  "historySpamBlocks": [
    {
      "spamBlockDate": {
        "$date": "2025-08-05T07:21:00.000Z"
      },
      "spamBlockDays": 1
    }
  ]
},
{
  "_id": {
    "$oid": "683b23e43770b19a277f4746"
  },
  "accountId": "6539249825-prefix-elba",
  "dc5": "c02e01559703d32b353a595dc020c1dcc2b1a8790e5b8b6194c93ec1ae6133e1503e833a4836566df0bed0bd39c8ca1ce287e0b2e6a4773ece077dfb16b8311c3c9946303c028db71d3423bd4ee168fd2956dedef0923679eb0533067738654bc762fe96bb767f8adfb54cc5acd63dea308929ed72fcaeb4eb3bb565d7d6ffb117fc29ed77109a626d72f31d6e4e5972052065218a387f70382b03fcf42a65c4716876740ced28644207ada003dfff372ec694caf88ef1407a0c24120df3c42918997b97fedf9b2deafe647e0d0cd6d96f35f8cd0b7d32bf2187922c073d710cb68715893805e67eedf2bb78c7c19e8fe70b5b682552b01cf89849f3b18dd530",
  "dcId": 5,
  "nextApiId": 2040,
  "dateUpdated": {
    "$date": "2025-08-19T10:21:29.938Z"
  },
  "twoFa": false,
  "twoFaDate": {
    "$date": "2025-07-12T20:31:08.763Z"
  },
  "phone": "+6283179856308",
  "banned": false,
  "firstName": "Valeriy",
  "id": "6539249825",
  "lastName": "Egorov",
  "messageCount": 13,
  "username": "egorov_friendly",
  "personalChannel": "LpsOmwSpV6XSvlos",
  "personalChannelDate": {
    "$date": "2025-05-31T16:33:21.438Z"
  },
  "lazyCheckDate": {
    "$date": "2025-08-18T15:03:23.380Z"
  },
  "automaticCheckDate": {
    "$date": "2025-08-19T10:21:29.938Z"
  },
  "remainingTime": {
    "$date": "2025-08-11T10:59:21.310Z"
  }
},
{
  "_id": {
    "$oid": "685f07503770b19a27ab2232"
  },
  "accountId": "6541191911-prefix-female-gidrovell",
  "dc1": "b6450141fcebfebaf2384ca2f976f483a6e4333519db5901171576d4117e9da532d59a79d4270ad482c656009e446bd7c7ca85cd62ba9cc48b8f7b501c33f74d0b779784ad587742481ce7ccee76be6bd11c5259fddee7c2bb407698820875fdeed5a964aec336d5dcd65960a6efb8426155713173bb5b18e94b5ce0a64302fec5e537d4430698c8362238d4b4c2e7d06ee2cbccb14193be9aa2ccd0ccbabf5eb279978bc73f0d42d56877be93ca2901c12401335a1c1ddcf4161ee63a52be4a3eabf252c30ef2d56f3b5b8962fce5ac61d08918903c68ff5e8b5b10be9ae961fe700129a8e933e93f002716c8ad5cc006c85cb5b5eb2616e28709a196e09d2b",
  "dcId": 1,
  "nextApiId": 2040,
  "dateUpdated": {
    "$date": "2025-08-19T10:24:29.952Z"
  },
  "twoFa": false,
  "twoFaDate": {
    "$date": "2025-08-18T10:48:01.415Z"
  },
  "phone": "+526391851351",
  "banned": false,
  "firstName": "Yana",
  "id": "6541191911",
  "lastName": "Malyutina",
  "messageCount": 24,
  "username": "malyutina_available",
  "personalChannelDate": {
    "$date": "2025-08-16T21:17:19.729Z"
  },
  "personalChannelError": "CHANNEL_NOT_FOUND",
  "lazyCheckDate": {
    "$date": "2025-08-19T00:25:42.571Z"
  },
  "automaticCheckDate": {
    "$date": "2025-08-19T10:24:29.952Z"
  },
  "remainingTime": {
    "$date": "2025-08-11T12:06:57.254Z"
  },
  "historySpamBlocks": [
    {
      "spamBlockDate": {
        "$date": "2025-08-14T13:49:00.000Z"
      },
      "spamBlockDays": 3
    }
  ]
},
{
  "_id": {
    "$oid": "685f074a3770b19a27ab2083"
  },
  "accountId": "6550557363-prefix-female-gidrovell",
  "dc1": "c6abcb29042394aad76ce6abc557051c42dd22498407918972a5a77ce8c0ed347a02fe1b5ef383fccadd282e0b9522d25500247b083cb9d530a939b0d5986402bfcf068b4148c5b192ba9210e988772543b62b9eab6960465d1a3250907d23b8344e21db04d57183c8d00ecd3cd20a45b4f36989714ca7184c250a74327314baf029df1c430cc3be8b079427f2c5f07f110c2002f8bb09be4a15374aa8dc77941b30c2505a1460c29d3e8505376ba0d8893acb8e920cfe869521c5bfe19646b18e9993e6b3a305b5fd97cbc648290c273d7e5c3038c49494138f728583695c6e5ae69cffaf1f57b717a2fb3ef1941c2be29ee6b54649eed568080aaa90c65a17",
  "dcId": 1,
  "nextApiId": 2040,
  "dateUpdated": {
    "$date": "2025-08-19T10:33:08.662Z"
  },
  "twoFa": false,
  "twoFaDate": {
    "$date": "2025-08-18T10:47:55.698Z"
  },
  "phone": "+543853058618",
  "banned": false,
  "firstName": "Svetlana",
  "id": "6550557363",
  "lastName": "Borisova",
  "messageCount": 22,
  "username": "borisova_tender",
  "personalChannelDate": {
    "$date": "2025-08-16T21:17:14.741Z"
  },
  "personalChannelError": "CHANNEL_NOT_FOUND",
  "lazyCheckDate": {
    "$date": "2025-08-18T22:46:52.005Z"
  },
  "automaticCheckDate": {
    "$date": "2025-08-19T10:33:08.662Z"
  },
  "remainingTime": {
    "$date": "2025-08-01T11:24:11.068Z"
  }
},
{
  "_id": {
    "$oid": "680b9469461801f59960163d"
  },
  "accountId": "6554298452-prefix-female-dmp1",
  "dc1": "27964a933e77454c6c780adae16c7bdf0cded91621aef52d3df3ea3ff2a785b06a0cc9b65dc972d9c991954068f544f6d9c00c7d67f098843220d343d9e04afc0f47c05b3b71689b6ef99720b66963e8ca8cfcca38ceb5a588ba4b8e241f8b16ae66ede2b6b1bb3c6846bb468717ceb4c5352d030c142008eef2024079e36db2da393149a17888a4f8a7f5a784a2da87bc8692d3a09d2bebcdd39f3aa54fa33f7d08019a2d496a02e8768d3882a9a1f559191dfcc371f77cee76c11072a6db46f27cf1a21096a9adfb0b818f3d073a1536d6ab2b8c4d8817f6a69f2ece635a24fcac7259055f2cc80dd7429df30291c2b6e5e3de2531091a32ad176a19fd28e1",
  "dcId": 1,
  "nextApiId": 2496,
  "dateUpdated": {
    "$date": "2025-08-19T10:15:44.114Z"
  },
  "twoFa": false,
  "twoFaDate": {
    "$date": "2025-08-18T10:47:55.333Z"
  },
  "phone": "+542644439430",
  "banned": false,
  "firstName": "Anastasia",
  "id": "6554298452",
  "lastName": "Kostina",
  "messageCount": 128,
  "personalChannel": "nkCdZZenXymKCkf4",
  "personalChannelDate": {
    "$date": "2025-04-25T14:34:45.283Z"
  },
  "lazyCheckDate": {
    "$date": "2025-08-18T22:11:33.217Z"
  },
  "automaticCheckDate": {
    "$date": "2025-08-19T10:15:44.114Z"
  },
  "username": "kostina_dynamic",
  "remainingTime": {
    "$date": "2025-08-19T09:21:59.675Z"
  },
  "historySpamBlocks": [
    {
      "spamBlockDate": {
        "$date": "2025-08-17T06:18:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-08-21T04:44:00.000Z"
      },
      "spamBlockDays": 3
    }
  ]
},
{
  "_id": {
    "$oid": "685f07503770b19a27ab2273"
  },
  "accountId": "6556954516-prefix-female-gidrovell",
  "dc1": "844052685b3a98c3ebacfff69fea89242f7670943d613cd7e35c3012e3eb09285d131c07d689d3ee4723b383307d70066623b21d7e1acbac46b78526953144435113b1329957e22d517a11e44eacf9e8439d4745b06794f35174fa1af1b0c41a3ee3db7fed1699c12941b146931aaaebb78fd6d93a29c3842e589b51d2268a11f0022127c45c98c3de832fa3a1ee48cbb7b3da9ebf398be3e571e42bd40f1eb74562b997e1c1c97239c6759ce872439428b9766b53a82b6f19cbc3dac2772b37d25683f7a47e34c596f9bec5235a843a363e59b3591d9697cf141b992edd067294662c75b4bdbd7b1c8840310d9dea1eecf2cb3e9be8f7ba13d192240fc451af",
  "dcId": 1,
  "nextApiId": 2040,
  "dateUpdated": {
    "$date": "2025-08-19T10:34:27.920Z"
  },
  "twoFa": false,
  "twoFaDate": {
    "$date": "2025-08-18T10:47:43.760Z"
  },
  "phone": "+524771071429",
  "banned": false,
  "firstName": "Kira",
  "id": "6556954516",
  "lastName": "Ermakova",
  "messageCount": 27,
  "username": "ermakova_potential",
  "personalChannelDate": {
    "$date": "2025-08-16T21:17:17.191Z"
  },
  "personalChannelError": "CHANNEL_NOT_FOUND",
  "lazyCheckDate": {
    "$date": "2025-08-18T20:46:24.568Z"
  },
  "automaticCheckDate": {
    "$date": "2025-08-19T10:34:27.920Z"
  },
  "remainingTime": {
    "$date": "2025-08-11T12:05:31.791Z"
  }
},
{
  "_id": {
    "$oid": "680ebc54461801f599f38a04"
  },
  "accountId": "6563353270-prefix-bls",
  "dc4": "75ed30cc6433395f9d196cceceedda09843380fab20470389ea5c375b086ca0e63cca24f13f7f0223882848c44670900bbf08f34141a4b331fc21d65b17578d00c49e889c766a6d33b88d0d254df6509c8705819187aef41291444e9f2d1ccabd6cd8e53303e24d58409234ab078e51ca62c1e572bfabbbad268ea9eb3a5e08693d58630e9bc92fbc12e9733c10013e1a547f68aea86c866fadc9c0d09709d71cd465b4554fc9153de51ce0d6b86779acd987c0d26ad0ec2f3652bcf4f529b57c20995d9e6ddcc69972491b8d6e19133170f6d61c788cd82908c98e6d91d38405d2233c96558e22e29b2e67671e09b851d18a6c6caefa97fdc10e7cf7a3819e1",
  "dcId": 4,
  "nextApiId": 2040,
  "dateUpdated": {
    "$date": "2025-08-19T10:34:29.796Z"
  },
  "twoFa": false,
  "twoFaDate": {
    "$date": "2025-08-17T20:15:22.736Z"
  },
  "phone": "+201212152711",
  "banned": false,
  "firstName": "Kirill",
  "id": "6563353270",
  "lastName": "Ignatov",
  "messageCount": 11,
  "username": "ignatov_inappropriate",
  "personalChannelDate": {
    "$date": "2025-05-23T07:59:43.823Z"
  },
  "lazyCheckDate": {
    "$date": "2025-08-18T13:41:01.126Z"
  },
  "automaticCheckDate": {
    "$date": "2025-08-19T10:34:29.796Z"
  },
  "personalChannel": "sSqCFLrIEmdw9lfD",
  "remainingTime": {
    "$date": "2025-05-28T09:56:21.584Z"
  }
},
{
  "_id": {
    "$oid": "683b23d93770b19a277f43e6"
  },
  "accountId": "6570469624-prefix-elba",
  "dc5": "130892590ca3b022103236923e7b7bcaa249402050bb0623568262c61f61b041107a0f8e3de0e6aacdc028fb7eb5c5493fd899a38fd00789b66be267b5da123fabd7e3279bd295cb048f045e8e6ddd9b0dbab26b44ace454d805b1cfa599842df6442b5ea4318c94b2d8bcf440dc21d63e19fbc4b8f3ad1a2d2cd37425c3ec9f02cc4012807045ff2d16c22b154ea0e3ee736a0223711da00adaf653ef03d30721ac02538388a027d1e2f9fd8b6035663af5923bef07fcfe57cbc0aa4a796d5df907f75dbe8ec75fec268915fd23fee0ce2c76bd75f1de35252c9fcea04c5c41a05d50be3edb26ed395a0fd2ae4175e5e54e0c88555d2c62365adf01f6ffe9e5",
  "dcId": 5,
  "nextApiId": 2040,
  "dateUpdated": {
    "$date": "2025-08-19T10:15:24.025Z"
  },
  "twoFa": false,
  "twoFaDate": {
    "$date": "2025-08-18T00:42:30.056Z"
  },
  "phone": "+6289528812946",
  "banned": false,
  "firstName": "Petr",
  "id": "6570469624",
  "lastName": "Trifonov",
  "messageCount": 11,
  "username": "trifonov_zygomorphic",
  "personalChannel": "UouaSciK2cGGIavf",
  "personalChannelDate": {
    "$date": "2025-05-31T16:33:39.807Z"
  },
  "lazyCheckDate": {
    "$date": "2025-08-18T15:35:14.865Z"
  },
  "automaticCheckDate": {
    "$date": "2025-08-19T10:15:24.025Z"
  },
  "remainingTime": {
    "$date": "2025-08-09T12:31:36.264Z"
  }
},
{
  "_id": {
    "$oid": "680b9472461801f5996018d9"
  },
  "accountId": "6571702614-prefix-female-dmp1",
  "dc1": "1f80a5c0f125157d7b870b588babe26c663854443ad7db2ff17379f4e3e7ad4d48d19ff2f3450988c339ac2870fcba065e7d4d7fe9b0080eabbc90db752600912f3737b4c46dbeeab5208f55865e908e82fa24197c6d56f3cfd51be2db8b4d42337e526392422c5729c91519366f5d391276e489624a0f426be6883334dd94a9cdb04c3a686c08de7f8f2fe0d05b3cc3fdbc1f65837edc76b3f02c3e60d3e681c311716ecc72d98fc2e4080acd52584693deb542573023e21bcfd171d21d388d5e6719692a6ee02381e567295cbfcfeae7d6dfdfea4952272ed8cfc1df74a6eda0217fc56d7017092a2a9f90fa8f5a626c54a5ef26e039fc85a92f3c2d2d87d4",
  "dcId": 1,
  "nextApiId": 2496,
  "dateUpdated": {
    "$date": "2025-08-19T10:20:27.549Z"
  },
  "twoFa": false,
  "twoFaDate": {
    "$date": "2025-08-18T10:48:00.103Z"
  },
  "phone": "+543517032010",
  "banned": false,
  "firstName": "Darina",
  "id": "6571702614",
  "lastName": "Morozova",
  "messageCount": 138,
  "personalChannel": "qn4ZDsfKnlxbpGsy",
  "personalChannelDate": {
    "$date": "2025-04-25T14:31:23.500Z"
  },
  "lazyCheckDate": {
    "$date": "2025-08-18T19:56:27.631Z"
  },
  "automaticCheckDate": {
    "$date": "2025-08-19T10:20:27.549Z"
  },
  "username": "morozova_international",
  "remainingTime": {
    "$date": "2025-08-19T07:47:43.122Z"
  },
  "historySpamBlocks": [
    {
      "spamBlockDate": {
        "$date": "2025-05-05T14:13:00.000Z"
      },
      "spamBlockDays": 1
    }
  ]
},
{
  "_id": {
    "$oid": "680b9474461801f5996019be"
  },
  "accountId": "6591961824-prefix-female-dmp1",
  "dc1": "5db6e439e6e69d7a0ace9607eb7e9cb68026d79a2655092de00aa689b63e757bcf75c61f1d602b5f3251b12eee67964ff29b14e212bad40b531aaa94388486fae47baa3456909cb78ace478ceba06bd11b60d6625da1279a91eae3706ee191dd313add2d96e46371a3bdb3d3ff1d8c6ab9a2d423e87bc50e80648e9c53887a25bd129f5ba33016bd35f24c285fe9a4137feed94cb1bfd22e44abdd59edc9f559cbbb192f0919f95baa96dae6abe6408de14955a1d9663622ee71707c6cbf0e768e73a3d3cccaaffa6ebe1b2dedc9f12180ef7a2a0e4fdb0bcaabe7f9ddde1db486a927660c83dc5882a1898cac52ceb58f1ada11fabf703c86cd63e2e3833c00",
  "dcId": 1,
  "nextApiId": 2496,
  "dateUpdated": {
    "$date": "2025-08-19T10:26:35.859Z"
  },
  "twoFa": false,
  "twoFaDate": {
    "$date": "2025-08-18T10:48:01.462Z"
  },
  "phone": "+543515592665",
  "banned": false,
  "firstName": "Ekaterina",
  "id": "6591961824",
  "lastName": "Shirokova",
  "messageCount": 146,
  "personalChannel": "kBFFtqiIPLFj2xdB",
  "personalChannelDate": {
    "$date": "2025-04-25T14:31:48.314Z"
  },
  "lazyCheckDate": {
    "$date": "2025-08-18T14:56:26.200Z"
  },
  "automaticCheckDate": {
    "$date": "2025-08-19T10:26:35.859Z"
  },
  "username": "shirokova_embarrassed",
  "remainingTime": {
    "$date": "2025-08-19T06:06:37.243Z"
  }
},
{
  "_id": {
    "$oid": "683b23d73770b19a277f437b"
  },
  "accountId": "6593748107-prefix-elba",
  "dc5": "609e7abf89be9708db92ed9dfdbbe8f26bb6535e7160fa5f8f4487f77427c927dcbce801fe045329840bca10585d7e4cd796932f41e3d63bf8355b22da88a86bb38aaf81e1e0362e423d3892932702ad3dbdf3e81bed3297efd55ac0be8eb61a6ec65e0d45c612980512449572c43f113762757758b108f7fbcc943a1d52f64203dba064c4c523fc090220cc3939d56228504e3d65c5c3902e83658bfcd51c1ea7d7a40675495b5d23249f642365577b8cb41d4a53b4d7b25233b9e4993b9a392607f13f8be51725485fd63394d770ad5d887f03da7bbc1668b8caa4efc914b55c824554ab27f664186c4c54fd2eaea5cd9f39965037615a5cfdef900fb1f2ab",
  "dcId": 5,
  "nextApiId": 2040,
  "dateUpdated": {
    "$date": "2025-08-19T10:37:19.893Z"
  },
  "twoFa": false,
  "twoFaDate": {
    "$date": "2025-08-18T00:42:33.799Z"
  },
  "phone": "+6281285479957",
  "banned": false,
  "firstName": "Matvey",
  "id": "6593748107",
  "lastName": "Martynov",
  "messageCount": 14,
  "username": "martynov_decent",
  "personalChannel": "GIhySsfS2uVrpuxo",
  "personalChannelDate": {
    "$date": "2025-05-31T16:33:25.997Z"
  },
  "lazyCheckDate": {
    "$date": "2025-08-19T00:23:50.814Z"
  },
  "automaticCheckDate": {
    "$date": "2025-08-19T10:37:19.893Z"
  },
  "remainingTime": {
    "$date": "2025-08-11T19:27:45.813Z"
  }
},
{
  "_id": {
    "$oid": "683b23db3770b19a277f44f5"
  },
  "accountId": "6598424361-prefix-elba",
  "dc5": "54a07a84e05508e6252eee223b4b41a35e39949a5ce288d2eb3a037c5bc9076d3a6936a29c6e414af939c8b9cc76293ce18c0cd8423f9a9a8d3f3ce3f8cd2e7db5dde1a774b236f82eadbcb4781fed5f5ad29f3284a24a2e6ed90c0f7e4e90af45e13231fdbc3da071085aabfa6cc6e3743f09f7416f9b8dcfba3fcd8cf61ace247b01a98133070538a8be2be26b85eb6528ad3ed9b3cfd329ab70bbd260cce4a43c0822104df2ada79e0ef51c986a3b3711676395304cd686570b7e3787fe5e09d115fd72c613dd169adf0efff03e1e315665c1ec0f4a79fbd3125f185a7fd4cab3fb628126f4fb535239f41c10947a2a39c8f0113f27b5810a806e1ff31c75",
  "dcId": 5,
  "nextApiId": 2040,
  "dateUpdated": {
    "$date": "2025-08-19T10:30:23.392Z"
  },
  "twoFa": false,
  "twoFaDate": {
    "$date": "2025-08-18T00:42:33.777Z"
  },
  "phone": "+6289686687087",
  "banned": false,
  "firstName": "Igor",
  "id": "6598424361",
  "lastName": "Kozlov",
  "messageCount": 12,
  "username": "kozlov_healthy",
  "personalChannel": "yiGFHitNnnDZUi2a",
  "personalChannelDate": {
    "$date": "2025-05-31T16:32:31.846Z"
  },
  "lazyCheckDate": {
    "$date": "2025-08-18T15:28:14.063Z"
  },
  "automaticCheckDate": {
    "$date": "2025-08-19T10:30:23.392Z"
  },
  "remainingTime": {
    "$date": "2025-08-11T11:03:58.605Z"
  }
},
{
  "_id": {
    "$oid": "683b23ec3770b19a277f49a0"
  },
  "accountId": "6604381836-prefix-elba",
  "dc1": "376437830e1ece328198318eea9a78bf3811766efb5ca621bcaf933185e4290340251a7ce8e236cdb92b365dd65536e1ba520731a73bf995c4a6d36ee17722211bcbda70effe0dd05c993f3e8f9f26860ffed755045fe4e75862a9ea8179cbbe267071d693749cfdbccaecb7333d38d3073e54dcc4d5433bbd2c2ed4a38cac2e8d064208548cf0ac0f2d33ff72f528bf47e036909807f1060f71903321f580cf4dccccc08f2f45e8e931d19516a5fa9408e64b152cd58520a67b9beb52f6628f9349cea2229b47467b9f5a7ab9484dd7732a199473b400139ad47a9fb0188b93f52112adf2921a3f34dddd18fe9bb5fb41a82707fee8924cc5f086c08bdc68a8",
  "dcId": 1,
  "nextApiId": 2040,
  "dateUpdated": {
    "$date": "2025-08-19T10:26:20.414Z"
  },
  "twoFa": false,
  "twoFaDate": {
    "$date": "2025-08-18T00:42:12.865Z"
  },
  "phone": "+56934442855",
  "banned": false,
  "firstName": "Petr",
  "id": "6604381836",
  "lastName": "Shevchuk",
  "messageCount": 3,
  "username": "shevchuk_inevitable",
  "personalChannel": "wsWZHtY2OYPUeQIs",
  "personalChannelDate": {
    "$date": "2025-05-31T16:32:35.135Z"
  },
  "lazyCheckDate": {
    "$date": "2025-08-18T23:48:20.028Z"
  },
  "automaticCheckDate": {
    "$date": "2025-08-19T10:26:20.414Z"
  },
  "remainingTime": {
    "$date": "2025-08-09T10:23:22.060Z"
  }
},
{
  "_id": {
    "$oid": "683b23d43770b19a277f4292"
  },
  "accountId": "6609262778-prefix-elba",
  "dc5": "156d044eaf48ce405ccfbf221f3a42b5122876359141f71d1bfe298b9610c277be2cba3e52298d3449e3c3fe479654de444e1518e21511b082124c1f4c034d374c3a96cd67278a51452d41d6640f29038eb71d5b62b8161ebb8294e4bab896ffce59f7e41dc61a87e205e2172d7ea749c8efa97eeba17a839620449bf8d5fd0bdf1e2705d2e53b31ae0010adc6edad85d95ee903b00e70312779cf1e60807d401a9c09483329df911583c36d6cd02b2f0c53461b5f2b79e23c216692850575025114ad28c05c8d010eb1884e0456f089cc548cc7d6efff8c0895d927e59f7217c5d27147fa90023f3840a128942d7a0efacd859eb45922c064e16869ce75187d",
  "dcId": 5,
  "nextApiId": 2040,
  "dateUpdated": {
    "$date": "2025-08-19T10:23:26.301Z"
  },
  "twoFa": false,
  "twoFaDate": {
    "$date": "2025-08-18T00:42:29.342Z"
  },
  "phone": "+6287736069001",
  "banned": false,
  "firstName": "Georgiy",
  "id": "6609262778",
  "lastName": "Golubev",
  "messageCount": 13,
  "username": "golubev_gastric",
  "personalChannel": "RgIgoz2aGPKulHrc",
  "personalChannelDate": {
    "$date": "2025-05-31T16:35:28.065Z"
  },
  "lazyCheckDate": {
    "$date": "2025-08-19T00:04:20.999Z"
  },
  "automaticCheckDate": {
    "$date": "2025-08-19T10:23:26.301Z"
  },
  "remainingTime": {
    "$date": "2025-08-09T12:15:54.117Z"
  }
},
{
  "_id": {
    "$oid": "680b946d461801f599601754"
  },
  "accountId": "6621302232-prefix-female-dmp1",
  "dc1": "7acf1d0724bfed9c4809d519bfdf5a472efbdbd92c8a749b550ec95bb0db54ea82a59346770115233e6ac04a41e254caa76fbf03a506912ead4ca296978c60178e8ab38f3376daf96d57d92045135714f3cf94ebe3908c0a7eb38949145d647e4f2a5edea282bf0cd4cf9bc4894f49787c7315a6caaac65faf9afb9d0d3098f7ee9582924214d08d21183b83954281867e974bbf2f301d1cac9de0344be356210fae2655528c38351f229b05264a197ed54237068cb3ae6c005d658224e013aa6eed5b467010de802906db62164895314f6c0af1a033a6b25ec7887a689d25667da07acdeff056c4bf1c5e20f64f9a01bf9d7430e75fc27af93c8f89e578071e",
  "dcId": 1,
  "nextApiId": 2496,
  "dateUpdated": {
    "$date": "2025-08-19T10:24:44.582Z"
  },
  "twoFa": false,
  "twoFaDate": {
    "$date": "2025-08-18T10:47:59.335Z"
  },
  "phone": "+522412796954",
  "banned": false,
  "firstName": "Evgenia",
  "id": "6621302232",
  "lastName": "Romanova",
  "messageCount": 146,
  "personalChannelDate": {
    "$date": "2025-05-03T20:14:38.229Z"
  },
  "lazyCheckDate": {
    "$date": "2025-08-18T16:29:33.498Z"
  },
  "automaticCheckDate": {
    "$date": "2025-08-19T10:24:44.582Z"
  },
  "username": "romanova_promising",
  "remainingTime": {
    "$date": "2025-08-19T09:02:38.300Z"
  },
  "personalChannel": "wtcmlqgUomrot9kL",
  "historySpamBlocks": [
    {
      "spamBlockDate": {
        "$date": "2025-07-03T13:23:00.000Z"
      },
      "spamBlockDays": 1
    }
  ]
},
{
  "_id": {
    "$oid": "680b946a461801f5996016ad"
  },
  "accountId": "6638899959-prefix-female-dmp1",
  "dc1": "c6d80e2401e9410ff051b598f2995ee4ff8677cfb259f36732e3f3e65d047e3471d2dd4581014d9824caaa2e0971b1522feb5fc1bbb8e3e8f521aecfe803c84d24090263ee6f742e23aeef38d06f1f0bb6dc4654f97f19cc0355609c84546c8c97bb5517b5f3bbf36ac01ddd15343358180754a3afe70623cd895f6673ff60036d9b4158549bfc67e4ceb20136d877f5cffa181458d4dd8076bddfe5ffa8abed7fd73cd2a62cc56b08a559952d6d44bbddfb3b059af4e4151c992786de4506b44057129fb27717f7049b0a33b72c20f3bfb9c460cccd7a66d57cb3aaf5d79e9da96223b7d8c69f2ef3a875e6159de1229366d8e9d62cdfa9b4ca8bfa7ab9f365",
  "dcId": 1,
  "nextApiId": 2040,
  "dateUpdated": {
    "$date": "2025-08-19T10:35:43.345Z"
  },
  "twoFa": false,
  "twoFaDate": {
    "$date": "2025-08-18T10:47:59.489Z"
  },
  "phone": "+526242408892",
  "banned": false,
  "firstName": "Daria",
  "id": "6638899959",
  "lastName": "Loginova",
  "messageCount": 141,
  "personalChannel": "xkauAWgGBlj8KNWH",
  "personalChannelDate": {
    "$date": "2025-04-25T14:31:34.573Z"
  },
  "lazyCheckDate": {
    "$date": "2025-08-18T19:10:19.959Z"
  },
  "automaticCheckDate": {
    "$date": "2025-08-19T10:35:43.345Z"
  },
  "username": "loginova_purple",
  "remainingTime": {
    "$date": "2025-08-19T06:44:59.297Z"
  },
  "historySpamBlocks": [
    {
      "spamBlockDate": {
        "$date": "2025-05-03T09:54:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-05-06T11:17:00.000Z"
      },
      "spamBlockDays": 1
    }
  ]
},
{
  "_id": {
    "$oid": "685f07463770b19a27ab1f32"
  },
  "accountId": "6644193055-prefix-female-gidrovell",
  "dc1": "7c484652abdbd9f0caebaa54bc5578d6f6decce7dad542294900be381172ab5c44d199ae6978311e97adaba30a042a680905d04ba4db6c39a30bf31a19b078a86a40403bd55ad179ad70f73b26b3190d66090b9f556602f572b8de06dbd2b105831dd50f4df766c169efb3a6296e275cf711fa671126e06c937b5276b300b1fc98c91b1c51d79f8b009d4ebdb3f8c7b6261a4d4c37321c22dc31a213358436990a7899a190d6c0991a60bad5097975699c912fd970e1e784354fa8b4297677b0f03f6cffd248a6c3835ddbdfc4a9506a52ddd88f551a9238c9b482dbf5466cdb2a080b63822d1f3ca3f44fb4e8178f842b51165beef85600a364c705b40e7d0e",
  "dcId": 1,
  "nextApiId": 2040,
  "dateUpdated": {
    "$date": "2025-08-19T10:22:42.353Z"
  },
  "twoFa": false,
  "twoFaDate": {
    "$date": "2025-08-18T10:47:32.083Z"
  },
  "phone": "+543704816123",
  "banned": false,
  "firstName": "Svetlana",
  "id": "6644193055",
  "lastName": "Grishina",
  "messageCount": 26,
  "username": "grishina_front",
  "personalChannelDate": {
    "$date": "2025-08-16T21:17:20.421Z"
  },
  "personalChannelError": "CHANNEL_NOT_FOUND",
  "lazyCheckDate": {
    "$date": "2025-08-18T21:23:07.061Z"
  },
  "automaticCheckDate": {
    "$date": "2025-08-19T10:22:42.353Z"
  },
  "remainingTime": {
    "$date": "2025-08-01T11:14:21.246Z"
  }
},
{
  "_id": {
    "$oid": "685f074c3770b19a27ab2124"
  },
  "accountId": "6644469191-prefix-female-gidrovell",
  "dc1": "3c7e24edc5cef40e79853d5e5a2acb35590b9aa1c9875f6a608e4c9202b177eb7d08e7f770848992250dbe352843367951edb8ffe6e28b6f90fb583fcce9c6580b0e97d313ee955df1e877cb90294e2c0705a72d0de8c7e89c23218b6af0623fcf59d5f1fa4d12b29369877229ce5cb65df767903d944930e28dd19b3bfb265e30323fa72ad1c40dc82fc05f85254f80125918caa68d354cda38e75a69a99be6b863f94ffb4d15f4375fc8e886673fa3791746e74b87e986506d7f87eed5dfd564a1122d498851ceb905b29c34adc5ecdd3773523deaa67d729ab131038eb7f55cb07570389c56a3c14009328f2538311eb4a9133bf09e9fe0786ce841862738",
  "dcId": 1,
  "nextApiId": 2040,
  "dateUpdated": {
    "$date": "2025-08-19T10:18:22.286Z"
  },
  "twoFa": false,
  "twoFaDate": {
    "$date": "2025-08-18T10:47:56.680Z"
  },
  "phone": "+542974086827",
  "banned": false,
  "firstName": "Elena",
  "id": "6644469191",
  "lastName": "Vikhrova",
  "messageCount": 32,
  "username": "vikhrova_vicarious",
  "personalChannelDate": {
    "$date": "2025-08-16T21:17:20.279Z"
  },
  "personalChannelError": "CHANNEL_NOT_FOUND",
  "lazyCheckDate": {
    "$date": "2025-08-18T21:24:09.228Z"
  },
  "automaticCheckDate": {
    "$date": "2025-08-19T10:18:22.286Z"
  },
  "remainingTime": {
    "$date": "2025-08-05T18:30:31.826Z"
  }
},
{
  "_id": {
    "$oid": "683b23d73770b19a277f4385"
  },
  "accountId": "6662168564-prefix-elba",
  "dc5": "94505b4b2089593307eda80d2ade5342d0e982e2f5870b1fbd3b2011288686d2cc30400a94affeabded16e4e8a3d725b5d234f313f7f2765981884b4888ae88b34d0df2f8e8d4e5ba0c97d764115e15cafec1f68ea162542e94b745a00c821d58731a69b73dfff981a262023c14a68a7681f02d71cc43e13d2d517b4b46ffd81658e1d451f0f4e0a0c24a381d2d5770ede269fd3337279231ad2243f793cc6bdbc433304ad4356433cc805e0ee06b2c0cc429f5eb2e9ab04780d8a0745d8e6dff769031dfcce2873a150e9b49ecb945b309dc6d6b78a323d3a5fafd333a69b35638d9ab45f2841425d5523669666b37f1e066798335b8baf272c33efb148279f",
  "dcId": 5,
  "nextApiId": 2040,
  "dateUpdated": {
    "$date": "2025-08-19T10:18:24.271Z"
  },
  "twoFa": false,
  "twoFaDate": {
    "$date": "2025-08-18T00:42:27.945Z"
  },
  "phone": "+6281317186380",
  "banned": false,
  "firstName": "Leonid",
  "id": "6662168564",
  "lastName": "Zaytsev",
  "messageCount": 11,
  "username": "zaytsev_educational",
  "personalChannel": "ZQqOhMEcAHBPH9NT",
  "personalChannelDate": {
    "$date": "2025-05-31T16:30:22.296Z"
  },
  "lazyCheckDate": {
    "$date": "2025-08-18T21:32:09.668Z"
  },
  "automaticCheckDate": {
    "$date": "2025-08-19T10:18:24.271Z"
  },
  "remainingTime": {
    "$date": "2025-08-09T13:54:48.278Z"
  },
  "historySpamBlocks": [
    {
      "spamBlockDate": "INFINITY",
      "spamBlockDays": 0
    },
    {
      "spamBlockDate": {
        "$date": "2025-08-10T08:13:00.000Z"
      },
      "spamBlockDays": 1
    }
  ]
},
{
  "_id": {
    "$oid": "683b23ea3770b19a277f496e"
  },
  "accountId": "6666977432-prefix-elba",
  "dc1": "4e1d369122cc6adfc86f1e7b2216691a841677fd9aadfd519916f49017fd2d249892bc438aa7991d91c3c0eebcd3d312a22b0d3d1fc0dc20848439cf2037e9de5015ac93f6d6866f207e34b1b42be86595bdfee6400247aec2ab817f4c8c03f8c3016300f0afbb616095a47d6e21863692f948055668eac041d5a1914fa2fead9d7e4b77ecce9de534872ebc0f714a38ea4d5d8b4ce5abe4a584ce5604ac7cb927e70d7843e3da9140632dcd3bd87b4f4ec737868087bf13a15ddad84e7482ffbd34a878acb4e85c063fbf94e835dc6ced51b402414c880bf467ec449ca1a3d25f4d11a83570eecf812d49f3fa74e4e7fd26fc5a60d32f0246ddf29a740341c0",
  "dcId": 1,
  "nextApiId": 2040,
  "dateUpdated": {
    "$date": "2025-08-19T10:21:12.628Z"
  },
  "twoFa": false,
  "twoFaDate": {
    "$date": "2025-08-18T00:42:20.088Z"
  },
  "phone": "+541165308637",
  "banned": false,
  "firstName": "Leonid",
  "id": "6666977432",
  "lastName": "Kiselev",
  "messageCount": 11,
  "username": "kiselev_sudden",
  "personalChannel": "tJbgzqE5wCBOkKas",
  "personalChannelDate": {
    "$date": "2025-05-31T16:33:33.034Z"
  },
  "lazyCheckDate": {
    "$date": "2025-08-18T14:56:51.288Z"
  },
  "automaticCheckDate": {
    "$date": "2025-08-19T10:21:12.628Z"
  },
  "remainingTime": {
    "$date": "2025-08-09T12:29:15.764Z"
  }
},
{
  "_id": {
    "$oid": "685f074b3770b19a27ab20cc"
  },
  "accountId": "6671081032-prefix-female-gidrovell",
  "dc1": "5d59d73f70c96013ff4cfd5da7383c63b62212e6cf5d0a6da53ca100e71b93218e1308d3b6e54f9aeb7df4c6a7c2f4ac1b621c518f4ad3f53e3bc9eeda7f5aee97fc3bb9e332d2547365fdd86232fd44d0ace18596ba1c15160cf485e0d8c35c33334d35077ab6cc7c556ce153df993d572cdafbc37c7275ba898f1a3b3362f1d7f50fca9d7e1f0966f9c3c1d14f36b6f23b4565ef4bf2c64dfb47294c57546998004dfafeb31e0ee3d4f305d1288b216726557e4409ba8dd82f9327093a9d9ec8d7ddee5fccf99f3a0a03bc73c0eba891f3f0c5c885edf2e225e3864f2729de75055182c37f5f4fffa06d2a36fe513243f780b82eca6865ecbc92d8f5fc804c",
  "dcId": 1,
  "nextApiId": 2040,
  "dateUpdated": {
    "$date": "2025-08-19T10:13:16.800Z"
  },
  "twoFa": false,
  "twoFaDate": {
    "$date": "2025-08-18T10:47:53.916Z"
  },
  "phone": "+541158993726",
  "banned": false,
  "firstName": "Anna",
  "id": "6671081032",
  "lastName": "Sokolova",
  "messageCount": 20,
  "username": "sokolova_working",
  "personalChannelDate": {
    "$date": "2025-08-16T21:17:14.761Z"
  },
  "personalChannelError": "CHANNEL_NOT_FOUND",
  "lazyCheckDate": {
    "$date": "2025-08-18T22:18:19.735Z"
  },
  "automaticCheckDate": {
    "$date": "2025-08-19T10:13:16.800Z"
  },
  "remainingTime": {
    "$date": "2025-08-06T14:20:59.816Z"
  },
  "historySpamBlocks": [
    {
      "spamBlockDate": {
        "$date": "2025-07-05T09:32:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-07-04T08:32:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-07-09T07:33:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-07-28T11:10:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-08-06T06:28:00.000Z"
      },
      "spamBlockDays": 7
    },
    {
      "spamBlockDate": {
        "$date": "2025-08-07T13:03:00.000Z"
      },
      "spamBlockDays": 1
    }
  ]
},
{
  "_id": {
    "$oid": "680b946c461801f59960174d"
  },
  "accountId": "6673209430-prefix-female-dmp1",
  "dc1": "5b449b83534c46208d8ea5e8eeda941407b920a18e4f3be5e4b139a7ece902ae7bc6fc9b78c52125a3b14017bb4c5197d299ede01e92bb451f92264bec4a8aaaf3c90a3435ca58afb529c4ca2f2f9bd588cff6e888488c4a5ca35941fe0ef3bfe9203b6b8bf997df788579cd727d0f4f2865e1d5d3aa55217b07728673bd3317a2bb1f341909c951cb8fc4edb21adcd93c57f5acb36fcd4caaaf6390b5b559347ba4c4f52e73a1b7e7cd00f6a1aeec99c3e7150f52e3be8b873b7bada95bc2b21d62bc26d6d78bbacbe7e6d2f4266fefb3255bd9d39776c4a0e282af8c36140d7d2d9f64365d3186b43a923a9f5d9adb96c97d0337bc8702d8c56321e49535fb",
  "dcId": 1,
  "nextApiId": 2496,
  "dateUpdated": {
    "$date": "2025-08-19T10:38:43.308Z"
  },
  "twoFa": false,
  "twoFaDate": {
    "$date": "2025-08-18T10:47:58.927Z"
  },
  "phone": "+573162322189",
  "banned": false,
  "firstName": "Marina",
  "id": "6673209430",
  "lastName": "Ilyina",
  "messageCount": 47,
  "personalChannel": "zOPmdYlYz5mvNIqY",
  "personalChannelDate": {
    "$date": "2025-04-25T14:30:27.725Z"
  },
  "lazyCheckDate": {
    "$date": "2025-08-18T19:27:22.826Z"
  },
  "automaticCheckDate": {
    "$date": "2025-08-19T10:38:43.308Z"
  },
  "username": "ilyina_planned",
  "remainingTime": {
    "$date": "2025-08-19T03:14:50.883Z"
  }
},
{
  "_id": {
    "$oid": "683b23e63770b19a277f483d"
  },
  "accountId": "6681175364-prefix-elba",
  "dc2": "5b28bdafd2f991bc49989bcf43b797376c6ff60da540e7dd458ba9c420ba9f8126c6ae1eae417579631278f4bc1f0167ddc686c58575fe506c0f2605f887a43f75cc162cb8896f3890142e9a09c2b915497c169305c47796e71abdb0e573adf264e5cc1154d75809b2ab69be97462584bac795ece0fc240bd740454a8fb0177c70bd327aa316ea1f40262215d2baf89a46786e25e06c1e9ddf56ca3523cbef4634e0a757afa258357ebebfea50dca002f90a373e8477d3ea5609ff678bd86921e03356d1905623ff9e20c4430055cc5186cce6ceeab97f2794c7e54c07822c2775729e99f9b8e4a02ffe9ba66dc55cff9a72f4f7d9f3544a8bb24fca34d423e9",
  "dcId": 2,
  "nextApiId": 2040,
  "dateUpdated": {
    "$date": "2025-08-19T10:33:23.213Z"
  },
  "twoFa": false,
  "twoFaDate": {
    "$date": "2025-08-18T00:42:33.765Z"
  },
  "phone": "+998886371883",
  "banned": false,
  "firstName": "Egor",
  "id": "6681175364",
  "lastName": "Zubanov",
  "messageCount": 20,
  "username": "zubanov_concrete",
  "personalChannel": "BbpnoJHdD8gTzxru",
  "personalChannelDate": {
    "$date": "2025-05-31T16:32:51.444Z"
  },
  "lazyCheckDate": {
    "$date": "2025-08-19T00:04:21.618Z"
  },
  "automaticCheckDate": {
    "$date": "2025-08-19T10:33:23.213Z"
  },
  "remainingTime": {
    "$date": "2025-08-09T14:39:38.580Z"
  }
},
{
  "_id": {
    "$oid": "680b946c461801f59960173d"
  },
  "accountId": "6687379425-prefix-female-dmp1",
  "dc1": "2c475420a37cdfdb2a2b2f6788e36582f07b69dcfa39e74a9eaf8dea58cf415afd08848e774610f5be4feea41c0e002fb7970b2174b6f47f0f47d22e456e245743eba57cfa9b99643b306771b81a9d3201ddee4d53513cd69f2ee23d76648be1775c5a00ee8ab2ba5955c8f3d431dfc3784f94a81e3a3779e14290b260dc604f2be1e136dc70e6b80b561c1aaed811ea524812f9dfce2172047eec9f1571ca5ef830c93b348db900a33e0cee51b46078675f0ce425a7005eae2384421d7d62e5f278913fedacec881617fb3210fc5e87795893b04caf145555c94019937eef41a14b51672a288e2f33683ece1a7d2fbcee67bce1202b851742a3bea25723ccdd",
  "dcId": 1,
  "nextApiId": 2496,
  "dateUpdated": {
    "$date": "2025-08-19T10:25:44.125Z"
  },
  "twoFa": false,
  "twoFaDate": {
    "$date": "2025-08-18T10:47:58.926Z"
  },
  "phone": "+541128699011",
  "banned": false,
  "firstName": "Vera",
  "id": "6687379425",
  "lastName": "Loginova",
  "messageCount": 138,
  "personalChannel": "vDzHrXzEr7GpsXPw",
  "personalChannelDate": {
    "$date": "2025-04-25T14:34:52.679Z"
  },
  "lazyCheckDate": {
    "$date": "2025-08-18T22:19:35.323Z"
  },
  "automaticCheckDate": {
    "$date": "2025-08-19T10:25:44.125Z"
  },
  "username": "loginova_drab",
  "remainingTime": {
    "$date": "2025-08-19T09:56:34.664Z"
  }
},
{
  "_id": {
    "$oid": "683b23db3770b19a277f44c1"
  },
  "accountId": "6690193981-prefix-elba",
  "dc5": "c5f0a7f4e4ddb9550e18631a39c8643c94cd370e3c33e311a30bae7cd26a47bf5251bf1079b82a887e32bf919434c1e3888cb1fc1d27d1381dafe55e69134a8e2637be120f1f1edce30c06db4495289c6bb6899936242fff487d294b419f21ca67aed4bbd7807cc46959e1d5e85d95eb48973d5a91038a1a3e0fc06a5f2166135db2ce5ebd15cb3e01288535a53312894d1a759b73fabd954ff211f00066780eecf2748cb2d59191417efd2ae20e7fd07ac5dc77f3b2b6a008b1c9833649145667ed7ed78942883b898df23046e6a76341ff313b1775d4ca6d65c7cfb48731bd9790e696309cff13755cadef370544267cc577fd40eff0b83c43b95f2b2a503b",
  "dcId": 5,
  "nextApiId": 2040,
  "dateUpdated": {
    "$date": "2025-08-19T10:27:24.099Z"
  },
  "twoFa": false,
  "twoFaDate": {
    "$date": "2025-08-18T00:42:30.836Z"
  },
  "phone": "+6285697477488",
  "banned": false,
  "firstName": "Denis",
  "id": "6690193981",
  "lastName": "Tomilov",
  "messageCount": 11,
  "username": "tomilov_toxic",
  "personalChannel": "dlEyzSntXBa4Ggsj",
  "personalChannelDate": {
    "$date": "2025-05-31T16:33:54.424Z"
  },
  "lazyCheckDate": {
    "$date": "2025-08-19T03:10:51.655Z"
  },
  "automaticCheckDate": {
    "$date": "2025-08-19T10:27:24.099Z"
  },
  "remainingTime": {
    "$date": "2025-08-09T12:23:15.304Z"
  }
},
{
  "_id": {
    "$oid": "685f074e3770b19a27ab21b7"
  },
  "accountId": "6695567291-prefix-female-gidrovell",
  "dc1": "7ba8ab869292300ec67c97b6bede7b5a1d46876ed32a14cc860b641029388c7dcde7846aa7ad0958a294cf12b24d989d2c53147a78e918f607e26cb9f7322d737eec08f9ca0f6c93070911d01e66af341d87d4eef5273a51e855ffd4390841e0b1620c0ad78f7f4d5ef4f80d027de462e3cfb09bbb8bf742db082b17c55f0ce41d60222d03cc1e9bf7c0e515d08290f2a2e2768f4c4646612b85e48343ccf2d2c6d9dfd98c7ec4f970a11ba8fdd757f018c680abae7774c391a88ddd3c2096f5fc1c1e215d0a1918178ff58ca74d5e5a7065159d683f2e6475500fd7a8ffb36f49237293289dd4925b8a8b32008b1293dddcd5564ba80e1c8f003969967f6df3",
  "dcId": 1,
  "nextApiId": 2040,
  "dateUpdated": {
    "$date": "2025-08-19T10:21:22.243Z"
  },
  "twoFa": false,
  "twoFaDate": {
    "$date": "2025-08-18T10:47:58.190Z"
  },
  "phone": "+525525411947",
  "banned": false,
  "firstName": "Polina",
  "id": "6695567291",
  "lastName": "Terekhova",
  "messageCount": 33,
  "username": "terekhova_moral",
  "personalChannelDate": {
    "$date": "2025-08-16T21:17:17.220Z"
  },
  "personalChannelError": "CHANNEL_NOT_FOUND",
  "lazyCheckDate": {
    "$date": "2025-08-18T20:01:39.453Z"
  },
  "automaticCheckDate": {
    "$date": "2025-08-19T10:21:22.243Z"
  },
  "remainingTime": {
    "$date": "2025-08-06T14:21:01.732Z"
  },
  "historySpamBlocks": [
    {
      "spamBlockDate": {
        "$date": "2025-07-29T09:06:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": "INFINITY",
      "spamBlockDays": 0
    }
  ]
},
{
  "_id": {
    "$oid": "685f07503770b19a27ab223a"
  },
  "accountId": "6704802060-prefix-female-gidrovell",
  "dc1": "a4be6fe8636deee2841bc30e759a3a87ef04f741564ec456304f0117a344e60587b6461dbf869fe15eb562e90f34130ebd5ecc9657b98aa5d51570fce48d3340e316b9d9d0bc408adb734ea85fd261953c1cfa70a8927d27b58c9adcc4969c925e509261ddc3b07bb84a36d488830712e5f976fa2c6550db305c1771695d63da110d4a602c11b8c8244ed72646de03f27c794d177c2058bd276695f0dd5951df5a20bba346bcf9b0f3d1fbb9c3909e9c7d0c789ff0bf030714db7204c006a68cd84cc788d2124ee1a90f21b86258f9e846a2fdc2da90ced7b53685e432f13fdd952c4ec5c25b66ee9b19ae6d817df888b075ce13b88c5aa98058a50a22b2296c",
  "dcId": 1,
  "nextApiId": 2040,
  "dateUpdated": {
    "$date": "2025-08-19T10:18:30.603Z"
  },
  "twoFa": false,
  "twoFaDate": {
    "$date": "2025-08-03T00:33:24.408Z"
  },
  "phone": "+529633124078",
  "banned": false,
  "firstName": "Rita",
  "id": "6704802060",
  "lastName": "Lazareva",
  "messageCount": 27,
  "username": "lazareva_intact",
  "personalChannelDate": {
    "$date": "2025-08-16T21:17:22.732Z"
  },
  "personalChannelError": "CHANNEL_NOT_FOUND",
  "lazyCheckDate": {
    "$date": "2025-08-18T22:20:34.397Z"
  },
  "automaticCheckDate": {
    "$date": "2025-08-19T10:18:30.603Z"
  },
  "remainingTime": {
    "$date": "2025-08-11T12:29:19.336Z"
  }
},
{
  "_id": {
    "$oid": "6810c3b3461801f5990b97d7"
  },
  "accountId": "6704818265-prefix-elba",
  "dc1": "27b24e125f9e7ac007018b80ae0859dcf553ee4d90fe9c874feddf652c25023a6bff766ea3715a0550e8cb41923239dfee75faa3251c96ab50fede93916e2d96035649103717d27193c97e3648d51ba268a63acad30e9603aaf8d24daf15d0a1217a634f7805699cfa67dee5e343605216319f16a3fc67a668f07cf52ace00283b7032c0042df4ca1ef98b69c53afddf44a5c5eca13fada98330468108a18d83dd2d13e169399a26ab555feeccdd0a185fc5d470d5607d34c62ae27fe8dd594aacd9fe7d2afdfd71227ef4fb7c06c9dde671b55f97bb9fd9ee04b80bacc778a0f84ae287326da64faa4ac388dde222c6cd24d176480bc6410a49d79f984813b0",
  "dcId": 1,
  "nextApiId": 2040,
  "dateUpdated": {
    "$date": "2025-08-19T10:15:35.960Z"
  },
  "twoFa": false,
  "twoFaDate": {
    "$date": "2025-08-19T02:19:50.239Z"
  },
  "phone": "+573045513934",
  "banned": false,
  "firstName": "Roman",
  "id": "6704818265",
  "lastName": "Suvorov",
  "messageCount": 32,
  "username": "suvorov_sudden",
  "personalChannel": "XoKaeBYoBk7Ynxhh",
  "personalChannelDate": {
    "$date": "2025-04-29T13:14:55.820Z"
  },
  "lazyCheckDate": {
    "$date": "2025-08-18T19:13:46.293Z"
  },
  "automaticCheckDate": {
    "$date": "2025-08-19T10:15:35.960Z"
  },
  "remainingTime": {
    "$date": "2025-08-09T10:19:44.435Z"
  }
},
{
  "_id": {
    "$oid": "680b9472461801f5996018c9"
  },
  "accountId": "6716491937-prefix-female-dmp1",
  "dc1": "087dd5de8fc2ab3e435444ef80849d2715b17500b7b3b3f58d07e6a538b2439d7b418390d122ddfa6db7f10f50d6851309b3309f50681cdc02aaf5d103c3b9d2fdb0a8807fa37ada149bfe32633272be17932439f415d8e91cc413fd57819a7daa0e1cf3cfb3e68c68a3b9bad3666b7a41ef31aad177abb375dfd99e95fb035b8f3201bb64043186eec8d695bd5d1efb95564dd8a333af1f9a987f626add1ae2c52a42cc748e89d55ee041edaa070d29ccd36e2eef7a7e4fcf2cc2e80a12785731860abb624607165b70e37c3e4ea149ed5ba74ddb4423d7f6103fa48d057ca5cc8711ede74e635c985dc6318816c369fb76b5ceec25da032af61cb88d1f07c6",
  "dcId": 1,
  "nextApiId": 2496,
  "dateUpdated": {
    "$date": "2025-08-19T10:33:38.671Z"
  },
  "twoFa": false,
  "twoFaDate": {
    "$date": "2025-08-18T10:48:00.111Z"
  },
  "phone": "+543541642633",
  "banned": false,
  "firstName": "Vera",
  "id": "6716491937",
  "lastName": "Ustinova",
  "messageCount": 142,
  "personalChannel": "pAWcuEDldPvMZME2",
  "personalChannelDate": {
    "$date": "2025-04-25T14:30:02.705Z"
  },
  "lazyCheckDate": {
    "$date": "2025-08-18T14:01:59.989Z"
  },
  "automaticCheckDate": {
    "$date": "2025-08-19T10:33:38.671Z"
  },
  "username": "ustinova_thundering",
  "remainingTime": {
    "$date": "2025-08-19T05:47:09.877Z"
  },
  "historySpamBlocks": [
    {
      "spamBlockDate": {
        "$date": "2025-08-20T05:03:00.000Z"
      },
      "spamBlockDays": 1
    }
  ],
  "spamBlockDate": {
    "$date": "2025-08-20T05:03:00.000Z"
  },
  "spamBlockDays": 1,
  "spamBlockInitDate": {
    "$date": "2025-08-19T05:11:30.901Z"
  }
},
{
  "_id": {
    "$oid": "685f07493770b19a27ab1ffc"
  },
  "accountId": "6723514982-prefix-female-gidrovell",
  "dc1": "8846f0c0bc6e522269fd96d11d71256f87f0c2f5d787fc142f91be82bfcb371fbfec6b9deedd017392cf7debb29360e2f50330e32dc714caa22ff8f8dea1403c5d0b34746470102be8a7a758c6a0250853a03ac1e351b79d360da81ffbb9a7a01ed88615dfac8e345053b9a30f6ee9a99fd0120b0f37e4c3aea350625f3367329d819ff3c285e01cca4c0c40a6f7136c62ed4fda0494821e427cc398c5f0a8aa30f1370c8723178cae0f261efa5660e9a1eec53f3c55f1b5bd9adbeee496f66728b393ab796eebd440a58d4e300e0e6ba3988408de0351e83b0a8865f2d6a8028d341caac1d407333310cabdc3148502849a1ede2f3ef60f09fd42e12b2df536",
  "dcId": 1,
  "nextApiId": 2040,
  "dateUpdated": {
    "$date": "2025-08-19T10:38:42.638Z"
  },
  "twoFa": false,
  "twoFaDate": {
    "$date": "2025-08-18T10:47:42.740Z"
  },
  "phone": "+541132939371",
  "banned": false,
  "firstName": "Lubov",
  "id": "6723514982",
  "lastName": "Solovieva",
  "messageCount": 26,
  "username": "solovieva_coastal",
  "personalChannelDate": {
    "$date": "2025-08-16T21:17:22.008Z"
  },
  "personalChannelError": "CHANNEL_NOT_FOUND",
  "lazyCheckDate": {
    "$date": "2025-08-18T19:53:38.647Z"
  },
  "automaticCheckDate": {
    "$date": "2025-08-19T10:38:42.638Z"
  },
  "remainingTime": {
    "$date": "2025-08-11T12:32:47.195Z"
  }
},
{
  "_id": {
    "$oid": "680b9472461801f5996018e9"
  },
  "accountId": "6726249879-prefix-female-dmp1",
  "dc1": "3a597ddb96c0208cca0affcda6b30e4a5044bd58957c9add0d4ed494447d35379a5522d3a06f5b7986a72856486301d015962c39fe4ef6a9ae4671c9e28ea6f297572877b10453b302c8b0c59ea9dcd7b4e1e6643f0a602d33e87e1967b9adf390f2bbf4a8975e34ec79a6ee0deb2139ad46a774def94f0f2ae853eb3b2618352a4e086017c32bf6fdc0e7a8ed28212505236064cd5dc5a20ef933dec7cd0d7d999f3e061c45142f59ca223420ce1e5060aa613b91f9ba61dd4d4e4510e5fdb41f2912f9e6265fd8d334f24da847acc974c99dd3be39b613fc4b8f36cec465f4b0faa4ded970868caae04426210739cf61705a58ffdd5e233a63824dff459b2b",
  "dcId": 1,
  "nextApiId": 2496,
  "dateUpdated": {
    "$date": "2025-08-19T10:35:28.530Z"
  },
  "twoFa": false,
  "twoFaDate": {
    "$date": "2025-08-18T10:48:03.992Z"
  },
  "phone": "+541157342481",
  "banned": false,
  "firstName": "Polina",
  "id": "6726249879",
  "lastName": "Alekseeva",
  "messageCount": 113,
  "personalChannel": "ZEsQFfWLCVEEm7Ro",
  "personalChannelDate": {
    "$date": "2025-04-25T14:31:36.324Z"
  },
  "lazyCheckDate": {
    "$date": "2025-08-18T23:06:39.226Z"
  },
  "automaticCheckDate": {
    "$date": "2025-08-19T10:35:28.530Z"
  },
  "username": "alekseeva_poised",
  "remainingTime": {
    "$date": "2025-08-19T11:03:08.899Z"
  },
  "historySpamBlocks": [
    {
      "spamBlockDate": "INFINITY",
      "spamBlockDays": 0
    },
    {
      "spamBlockDate": {
        "$date": "2025-08-13T01:01:00.000Z"
      },
      "spamBlockDays": 1
    }
  ]
},
{
  "_id": {
    "$oid": "680b9468461801f5996015b2"
  },
  "accountId": "6728307199-prefix-female-dmp1",
  "dc1": "0e8ac24d6b0a77f646905640b05bee52d7fb94f583205366b4f82f670a535f09cfe69d9120cdc9ba516b8acaecf96a1a5d4b2ad8eabf01d010d53fdafef0f89136c08985b1de8fd53b9a51734dcf66c0a85162ad632d496a7ad2d8f2d222ba2830ccdf7adf9e86b89b9c899647950dff117785bf064fca31f809cd915e20800fc857b8279cb519be6b6b61a1fc090d94240e4bdb369dae7c6c647a8a907ed57b319e96430e51e550ae2e557911f1a4b77e64831e3d89b44749ef5539e90a39b3eaf60140279b47c632ccbb648826ea7faa5773e66a2561370ad4d4afbed3f2343d87a612aaa2c64e639c5fc6279f3421c3fa0c568e87d8974fa45840a5973d24",
  "dcId": 1,
  "nextApiId": 2496,
  "dateUpdated": {
    "$date": "2025-08-19T10:15:44.541Z"
  },
  "twoFa": false,
  "twoFaDate": {
    "$date": "2025-08-18T10:47:54.606Z"
  },
  "phone": "+573117463811",
  "banned": false,
  "firstName": "Rita",
  "id": "6728307199",
  "lastName": "Mozharova",
  "messageCount": 40,
  "personalChannel": "JqeQWvCoyVBAa2Nq",
  "personalChannelDate": {
    "$date": "2025-04-25T14:31:58.438Z"
  },
  "lazyCheckDate": {
    "$date": "2025-08-18T19:42:01.719Z"
  },
  "automaticCheckDate": {
    "$date": "2025-08-19T10:15:44.541Z"
  },
  "username": "mozharova_jittery",
  "remainingTime": {
    "$date": "2025-08-19T07:11:06.195Z"
  },
  "historySpamBlocks": [
    {
      "spamBlockDate": {
        "$date": "2025-08-14T09:23:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-08-18T15:41:00.000Z"
      },
      "spamBlockDays": 3
    }
  ]
},
{
  "_id": {
    "$oid": "685f07493770b19a27ab1ff1"
  },
  "accountId": "6732669049-prefix-female-gidrovell",
  "dc1": "ab6c7dfdd6cb7b8b0de9863a1b6fcde802904ca742961eafb7432ebc5dc6c98b8f00492458363fe88d32ad64888a48f0e3e75ff5c531322bd7540faef81c74499a8c879357dd02293ab6a90930d8218dfa567a6df002ed7b12960c67a70abcf6d5583d7ea7c18ebf9ec150f0efe04ecf2defadb258725e250bfc95931f0342f9ad1a3daf9cf3338cedbb3d5eb9d7bde8837134fee9ed0ae4ae00e231533e3661ffa6f5fa1f44f1c5ca456a3d4d257dc0c3a9b39a4c2d4ce4a19540a3a7092219e214f5c65e6084bf91bf0485694c9eb4f1938f9be61a0446e2b4c55f2de3dfd85923402cdbb8b70b4e0f4ba8ac13a7beece722718cc1acb6f7213c354046ca52",
  "dcId": 1,
  "nextApiId": 2040,
  "dateUpdated": {
    "$date": "2025-08-19T10:15:42.545Z"
  },
  "twoFa": false,
  "twoFaDate": {
    "$date": "2025-08-18T10:47:40.798Z"
  },
  "phone": "+542617048329",
  "banned": false,
  "firstName": "Irina",
  "id": "6732669049",
  "lastName": "Makarova",
  "messageCount": 36,
  "username": "makarova_shallow",
  "personalChannelDate": {
    "$date": "2025-08-16T21:17:22.009Z"
  },
  "personalChannelError": "CHANNEL_NOT_FOUND",
  "lazyCheckDate": {
    "$date": "2025-08-18T20:04:39.544Z"
  },
  "automaticCheckDate": {
    "$date": "2025-08-19T10:15:42.545Z"
  },
  "remainingTime": {
    "$date": "2025-08-11T12:29:48.806Z"
  }
},
{
  "_id": {
    "$oid": "680b946e461801f5996017b1"
  },
  "accountId": "6735310833-prefix-female-dmp1",
  "dc1": "bc90249a93c50597c4f335d159ab75013455d147a0e486759fe44959744f8eeb0f9635315e1d528437fd43a2cecd84459cf4aa93cbcc033f30bf0b22b486c725538e055e4286fda03802be78d54bd6c12817ae97ecc76044f73e5a625d80f94eeced192f0ad2c51d7b667b61d04eb9fb7738597e2e279a91df791e56ae96d07d1346d0f884b22268413b499578c47767e64a23662744798d45091f3148a7e956e264eeaca640faa9a4f13e3064c2a05178c170d7d8786788173bc4a4e1f554593e1cc486bfa5152c30d8e834b9cd54a571724e3671b5efd4abc7d6193e4803a8e220491323a5635cb926ebea179af392c27c3746e63861ffac50db81b0ce0a04",
  "dcId": 1,
  "nextApiId": 2496,
  "dateUpdated": {
    "$date": "2025-08-19T10:16:44.899Z"
  },
  "twoFa": false,
  "twoFaDate": {
    "$date": "2025-08-18T10:48:03.106Z"
  },
  "phone": "+573183094875",
  "banned": false,
  "firstName": "Nina",
  "id": "6735310833",
  "lastName": "Popova",
  "messageCount": 48,
  "personalChannel": "TacLQPm7oXUZHlNk",
  "personalChannelDate": {
    "$date": "2025-04-25T14:33:46.409Z"
  },
  "lazyCheckDate": {
    "$date": "2025-08-18T21:24:10.211Z"
  },
  "automaticCheckDate": {
    "$date": "2025-08-19T10:16:44.899Z"
  },
  "username": "popova_ethnic",
  "remainingTime": {
    "$date": "2025-08-19T02:25:43.110Z"
  }
},
{
  "_id": {
    "$oid": "685f07503770b19a27ab2238"
  },
  "accountId": "6742122398-prefix-female-gidrovell",
  "dc1": "511c5cf1a0b909e672ba1d07ccad696cd351b8ccc9102a7b313edab94b261aa8f3b7ffca537aae12dd388aa2ada32011539c74e06816740beabb0f4abc72063f7fea16657e302c72093388139695d480bda4253abd2a38604c532bbbcc2fdc0db05d72470797f27f2cddf18775024ea052b8f90de5bdf9e14530858036b8b7f2c7f5549a254244b4db111036579b997ed3e678a0af4a0787ac4362937bb1c94c028ada38cddc6a3dbb513e2568fb98453de0e967265e91c8cc7910b8a5b3b694ee97ffdd222ccf1f1673995bb728d57a9576c550e2a84cbf636cb30f95c45575a67669320775136b89ac362d41ae1d37c778ecf752b59542713fa079450c8390",
  "dcId": 1,
  "nextApiId": 2040,
  "dateUpdated": {
    "$date": "2025-08-19T10:30:27.752Z"
  },
  "twoFa": false,
  "twoFaDate": {
    "$date": "2025-08-18T10:48:01.408Z"
  },
  "phone": "+526671973983",
  "banned": false,
  "firstName": "Lubov",
  "id": "6742122398",
  "lastName": "Maksimova",
  "messageCount": 32,
  "username": "maksimova_surprising",
  "personalChannelDate": {
    "$date": "2025-08-16T21:17:16.835Z"
  },
  "personalChannelError": "CHANNEL_NOT_FOUND",
  "lazyCheckDate": {
    "$date": "2025-08-18T22:02:27.545Z"
  },
  "automaticCheckDate": {
    "$date": "2025-08-19T10:30:27.752Z"
  },
  "remainingTime": {
    "$date": "2025-08-06T14:12:37.083Z"
  }
},
{
  "_id": {
    "$oid": "685f074c3770b19a27ab211b"
  },
  "accountId": "6745488551-prefix-female-gidrovell",
  "dc1": "8ab1007e4e25f9ccf7dc86eb6da95caf2f6ba74ebd22c1a56808fa7724a89d44a6b076e1ab947521c11d2485008c4442a53215e2dae1a000f444688f8a201e3de23f4d976e073174a726a3ba1f76531481acb655956905d15a2c1d8312905e38e1059511d9389c90f39461a78ad360c24fff4cd9aac273236f2c57c077045f1ea115111da3a9b29bbcaa8c141b9b4befcae285e1fe6c9f81dd7ae70cd16ce5813f285f89a0be04bd56d710473cf093be9622285e8c309a8990d9277abba1d5ce7102f2f98279ad97c814bdf1cb2cccc640efcf4ac0c6e2b3c293f6fe67e73ed88784c70afb869f91d0da617e9797f206c0aab1c643e7ec5b1cac2f81b203206c",
  "dcId": 1,
  "nextApiId": 2040,
  "dateUpdated": {
    "$date": "2025-08-19T10:24:18.206Z"
  },
  "twoFa": false,
  "twoFaDate": {
    "$date": "2025-08-18T15:25:56.950Z"
  },
  "phone": "+543447551865",
  "banned": false,
  "firstName": "Olga",
  "id": "6745488551",
  "lastName": "Melnikova",
  "messageCount": 29,
  "username": "melnikova_unsightly",
  "personalChannelDate": {
    "$date": "2025-08-16T21:17:17.218Z"
  },
  "personalChannelError": "CHANNEL_NOT_FOUND",
  "lazyCheckDate": {
    "$date": "2025-08-19T00:00:27.335Z"
  },
  "automaticCheckDate": {
    "$date": "2025-08-19T10:24:18.206Z"
  },
  "remainingTime": {
    "$date": "2025-08-06T14:18:10.832Z"
  },
  "stopped": false
},
{
  "_id": {
    "$oid": "685f07493770b19a27ab1fef"
  },
  "accountId": "6757836416-prefix-female-gidrovell",
  "dc1": "4b506182ddc3eb5e2881c4eb4be249664a4e9a974e6e7fab42d109fd7896c21046b531f7b876c33fbfd26e5bf7bf7f26bd2fc8227759ecf9043bce804cac3e309829de451228bad9f3216dae40d0cf712b135812bdd4834bfc95eeb7f4a165922093b3458082ab772392b8cccd972cc2d224e2ca98e366b77b0ec1048ad57e0f0135a20313f62ff6e0f931ed685fd2ea3708572f06445be5072a6c5230f790a4ebe43311911a79163e445ce4b853e5811d88a15b6b72333ad66c09bc523706be09fefd024313d33e079590f5cd024b2d96df5153c51cd9d480395b691ad868fe05b22afb5f26d06c35293e0255de8ef83737b68e70c67bce09ebf1e5690f089d",
  "dcId": 1,
  "nextApiId": 2040,
  "dateUpdated": {
    "$date": "2025-08-19T10:37:42.753Z"
  },
  "twoFa": false,
  "twoFaDate": {
    "$date": "2025-08-18T10:47:40.800Z"
  },
  "phone": "+542215760414",
  "banned": false,
  "firstName": "Darina",
  "id": "6757836416",
  "lastName": "Mironova",
  "messageCount": 29,
  "username": "mironova_soft",
  "personalChannelDate": {
    "$date": "2025-08-16T21:17:24.477Z"
  },
  "personalChannelError": "CHANNEL_NOT_FOUND",
  "lazyCheckDate": {
    "$date": "2025-08-18T20:43:57.158Z"
  },
  "automaticCheckDate": {
    "$date": "2025-08-19T10:37:42.753Z"
  },
  "historySpamBlocks": [
    {
      "spamBlockDate": "INFINITY",
      "spamBlockDays": 0
    }
  ],
  "remainingTime": {
    "$date": "2025-08-11T12:26:15.228Z"
  }
},
{
  "_id": {
    "$oid": "680b9474461801f5996019b6"
  },
  "accountId": "6759890341-prefix-female-dmp1",
  "dc1": "7c2db6afa8a240b73f444699de1f39ca986ded58fc8c88a0998c1c441056773a14413baad7ac98ab652d0f7ffe50a1b8addc591729f76903b8b2273fd62487e44587014135f7a0590b1dd9e37700bfea6c6e4f7bab77a94a1e5550f5a1f9b0e1882e02d3c8b041387507c25c6911d72eb50896af9d608f6b593cf9dc1fb0513f9637e90fade7bc2c5569899dfa9b9d4a85faf03532cf3b84d1b04974e96a3d6a232f99f80ac8b447e4308db9915ab11a14f8095718f8d946e86cb575bafcf67c486c4dd1f8ef82e9994bd2d16a26551f852f64764caa27da3ec27643a3635d873f8e8d981adf1af3e8ec6c43c33d48c6e93140ec43ddaa6a935b7384a2058f02",
  "dcId": 1,
  "nextApiId": 2496,
  "dateUpdated": {
    "$date": "2025-08-19T10:34:28.863Z"
  },
  "twoFa": false,
  "twoFaDate": {
    "$date": "2025-08-18T10:48:00.113Z"
  },
  "phone": "+56938954649",
  "banned": false,
  "firstName": "Albina",
  "id": "6759890341",
  "lastName": "Dubrovina",
  "messageCount": 47,
  "personalChannel": "BEuVpbfQmywvU9dq",
  "personalChannelDate": {
    "$date": "2025-04-25T14:33:50.235Z"
  },
  "lazyCheckDate": {
    "$date": "2025-08-18T19:47:32.464Z"
  },
  "automaticCheckDate": {
    "$date": "2025-08-19T10:34:28.863Z"
  },
  "username": "dubrovina_gleaming",
  "remainingTime": {
    "$date": "2025-08-19T03:14:08.228Z"
  }
},
{
  "_id": {
    "$oid": "680b9468461801f5996015be"
  },
  "accountId": "6772250084-prefix-female-dmp1",
  "dc1": "1e379a20776ff5cd52e0f9c0080b31f542f4f2541025e40177e7d54809865ab42cff85343330b7eaf5ac287e6bf9ed2ba180bb3f06b1e0505a20963e97da1f0580e4afdc67f69898336a1ae4121c5479f2a857f8f483fcf98e38cf4d036f3bad67bc98b838600c0b0529219777bb7f60e5bd4f612cbcd103ea270bf4793fb980ded9c7cd7e7208cb22ea140347f287f6c57cac4b5b3baefd7f612772f7eecbe482ccf6f13f3e3f0f758f6b64fe12585f2f355b79eeab1ee35c0e6b07370a88c779dca2e3c072dcc4a7fd4c96a908052ae5d28130685d0b9d3236a3dd0acb1cecd10f3f1df2ad693fc1ba975c939fd74fe24cbafa144770ccd0063d2a69c26926",
  "dcId": 1,
  "nextApiId": 2496,
  "dateUpdated": {
    "$date": "2025-08-19T10:20:40.495Z"
  },
  "twoFa": false,
  "twoFaDate": {
    "$date": "2025-08-18T10:47:53.627Z"
  },
  "phone": "+525532643603",
  "banned": false,
  "firstName": "Yana",
  "id": "6772250084",
  "lastName": "Vasilyeva",
  "messageCount": 144,
  "personalChannel": "rvimoV6VksQQpKpf",
  "personalChannelDate": {
    "$date": "2025-04-25T14:33:19.696Z"
  },
  "lazyCheckDate": {
    "$date": "2025-08-18T17:43:04.614Z"
  },
  "automaticCheckDate": {
    "$date": "2025-08-19T10:20:40.495Z"
  },
  "username": "vasilyeva_holy",
  "remainingTime": {
    "$date": "2025-08-19T05:58:43.913Z"
  }
},
{
  "_id": {
    "$oid": "683b23db3770b19a277f44a0"
  },
  "accountId": "6774598956-prefix-elba",
  "dc5": "a45938accd8948979d2fb74f35405dc89378d1e707a2c7b93b026cf48baab8bb0e819ed2e92d90a12f1dead64f9b04e001d2fc24b4fdac4c42790dcaa85f5b2f44bb45cebb3f0c15717a1b73e7785698c1b797a2ecb602ae7882e4cefc32868f897af3615ac255b92a9003e486ff58fc00e3b7e8325c271652e780d9595d5166b02cb3b00032f238a6430b43bd5a1995edd77ebd76e08e7127879d29bc9ddc87a705beeedd16160329758b753760104816b9d406ac398eb0f6fea782c548d7e94f9c4d7d85e54eb2b20032b9936804da54449a0b7addf5f58899e779f09de5737bcf329e81d1f163c3d8d6d79ddaaa869d838df13f61ce4749952ef90036e6d9",
  "dcId": 5,
  "nextApiId": 2040,
  "dateUpdated": {
    "$date": "2025-08-19T10:16:26.870Z"
  },
  "twoFa": false,
  "twoFaDate": {
    "$date": "2025-08-18T00:42:38.266Z"
  },
  "phone": "+6282115822847",
  "banned": false,
  "firstName": "Vitaly",
  "id": "6774598956",
  "lastName": "Alekseev",
  "messageCount": 13,
  "username": "alekseev_dutch",
  "personalChannel": "IZzbaQbIfVUVlXU1",
  "personalChannelDate": {
    "$date": "2025-05-31T16:32:01.697Z"
  },
  "lazyCheckDate": {
    "$date": "2025-08-19T02:32:01.503Z"
  },
  "automaticCheckDate": {
    "$date": "2025-08-19T10:16:26.870Z"
  },
  "remainingTime": {
    "$date": "2025-08-11T11:02:50.510Z"
  }
},
{
  "_id": {
    "$oid": "683b23eb3770b19a277f4985"
  },
  "accountId": "6777465974-prefix-elba",
  "dc1": "53012a657a227062ce9dd3dfb744b42a171a4d4d5c1304b7371f2dd31ff55bf095b7347c8eafe63b00a9bb156311ea18941aee57a39105e51c88139a44628e883c84d5cbabd8bfb6d174d75977219706cb6bb2d16d26c1973c3b48fc26fa9ca29e97953b9d6b4bc465ad09211ff88fd952925572ffcb9bffba5b402a417dc0d3c6d8f028f0ffd8f85f3ca0c7eb348310c720ad87d6e3782d0260ef2deb94ed6e5e337e6226f9b98de610e53f6d55239f739512867fda0538dc738bb85083e8434a7b564b7a0c1f2b072b63b4c56cd1f35768f9e12e8a91f8fd9f2ee10796b9a01bb222161784d2486565f900e11e6847e90db97cc8396c3c5f6349ed04b6e865",
  "dcId": 1,
  "nextApiId": 2040,
  "dateUpdated": {
    "$date": "2025-08-19T10:18:20.457Z"
  },
  "twoFa": false,
  "twoFaDate": {
    "$date": "2025-08-18T00:42:12.871Z"
  },
  "phone": "+529515256461",
  "banned": false,
  "firstName": "Boris",
  "id": "6777465974",
  "lastName": "Ignatov",
  "messageCount": 12,
  "username": "ignatov_exuberant",
  "personalChannel": "ha2itCHhfdOJhZeW",
  "personalChannelDate": {
    "$date": "2025-05-31T16:31:26.074Z"
  },
  "lazyCheckDate": {
    "$date": "2025-08-18T14:13:18.148Z"
  },
  "automaticCheckDate": {
    "$date": "2025-08-19T10:18:20.457Z"
  },
  "remainingTime": {
    "$date": "2025-08-11T16:27:35.585Z"
  }
},
{
  "_id": {
    "$oid": "685f07503770b19a27ab225c"
  },
  "accountId": "6778757284-prefix-female-gidrovell",
  "dc1": "c698c44d2159db20d4de68c9db554c4dfa2425f9a5163b582d68651cf3e2fda97cc2c559be318153ca9e37e033ff8c91ce3d2e6afc4e68814c73142c553c38f5ac08637632998e65ffe54f6a363249d843d98c3d6c9fdb339e3475e0d29d96a8a6dd5a29b535378ae412ccb63720e7be71eff8dc01519d8048cf717cf6d50a14cc77362e46b84f7da51cafe467114c3191a56608d00cbb44eb622afb2c08889709d2ddf78a6e410e8a7626836fa48fa40ddfbc14e91be7550eee155063c8df3805bf48dba175e0d734ac359657a65cc29d6cc8c5affc2c2def01b55276d85641df8f74516e82a0433763fb08d9f481a67e8e19f0617369cce870df4eac4d47f3",
  "dcId": 1,
  "nextApiId": 2040,
  "dateUpdated": {
    "$date": "2025-08-19T10:12:27.891Z"
  },
  "twoFa": false,
  "twoFaDate": {
    "$date": "2025-08-18T10:47:39.517Z"
  },
  "phone": "+523841009094",
  "banned": false,
  "firstName": "Sofia",
  "id": "6778757284",
  "lastName": "Nechayeva",
  "messageCount": 29,
  "username": "nechayeva_ultimate",
  "personalChannelDate": {
    "$date": "2025-08-16T21:17:15.190Z"
  },
  "personalChannelError": "CHANNEL_NOT_FOUND",
  "lazyCheckDate": {
    "$date": "2025-08-18T22:27:28.744Z"
  },
  "automaticCheckDate": {
    "$date": "2025-08-19T10:12:27.891Z"
  },
  "remainingTime": {
    "$date": "2025-08-11T12:36:00.395Z"
  },
  "historySpamBlocks": [
    {
      "spamBlockDate": {
        "$date": "2025-08-05T06:52:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-08-12T12:36:00.000Z"
      },
      "spamBlockDays": 1
    }
  ]
},
{
  "_id": {
    "$oid": "685f074d3770b19a27ab213b"
  },
  "accountId": "6778940989-prefix-female-gidrovell",
  "dc1": "70314c89254f99eb550ded99a9b40a70ef6dd7eb004e70a1adb4947dcfc5dcb5858d948794a9f727670c3be57e9e4888ee8e6724374261dec1797090b621612c46c7e56ccd5510f3039503aec3cdcecd10f33d9132852b915e5a9db4de43b6e21ac917a93de553493ab795d1b7275239eae1eb3372861d368ba49fccfb766c2fd400523bd611c26c3339aea59cd9263947211160bbdfa0f1ccf444730f02b23255006e020e16359b9bf5721be696519f22330a1f1722c3dc163c56c355017262185c1e60d2801f7aadec07fa6c188bd9dbf8add3a104c126b9750e8bc7abca850ff5b76ba2b673e156cbf2ca0a9aacd4d470c5580635dc965df85dd1f4b05840",
  "dcId": 1,
  "nextApiId": 2040,
  "dateUpdated": {
    "$date": "2025-08-19T10:27:29.892Z"
  },
  "twoFa": false,
  "twoFaDate": {
    "$date": "2025-08-18T10:47:56.981Z"
  },
  "phone": "+525532300159",
  "banned": false,
  "firstName": "Irina",
  "id": "6778940989",
  "lastName": "Korneyeva",
  "messageCount": 22,
  "username": "korneyeva_thorough",
  "personalChannelDate": {
    "$date": "2025-08-16T21:17:14.996Z"
  },
  "personalChannelError": "CHANNEL_NOT_FOUND",
  "lazyCheckDate": {
    "$date": "2025-08-18T20:42:54.179Z"
  },
  "automaticCheckDate": {
    "$date": "2025-08-19T10:27:29.892Z"
  },
  "remainingTime": {
    "$date": "2025-08-05T14:05:05.659Z"
  }
},
{
  "_id": {
    "$oid": "683b23da3770b19a277f4440"
  },
  "accountId": "6779242056-prefix-elba",
  "dc5": "411855184d1621b733a52b625541dc18b10cd920025e4e2b3a8ef2899a731db817bfcc77708e0fc1c8090e468a8b408f54b4705155a2dd428cb0a934cac592add69ca72bebfdd651f4cd7ac03c1494f812e22aed378b55348e25cc9a0a8f8dea4eaa6bbbf5f136027e660924dc971744eeb999713bae8717bdd904a4adbd3dd4e6c79b0c07c19863c8df2daddde3afc351506f2d46c8b970299e4f76919174e3394b518633f77ce3bfa280f8f1af9a06508af3137c085d8ed2f99f6051d073d046790fba8d6d53efe70399bfbc72fffd6c087390b43f3c007983926736cf4900af6ccc8628b6ea1b3457171d804ca2a2ed95ba3cb5ab2d06f4b685fcfd765c74",
  "dcId": 5,
  "nextApiId": 2040,
  "dateUpdated": {
    "$date": "2025-08-19T10:21:31.165Z"
  },
  "twoFa": false,
  "twoFaDate": {
    "$date": "2025-08-11T23:51:12.016Z"
  },
  "phone": "+6283826030600",
  "banned": false,
  "firstName": "Ivan",
  "id": "6779242056",
  "lastName": "Panfilov",
  "messageCount": 10,
  "username": "panfilov_gray",
  "personalChannel": "gQkaULd0aIrNmMEH",
  "personalChannelDate": {
    "$date": "2025-05-31T16:35:59.853Z"
  },
  "lazyCheckDate": {
    "$date": "2025-08-19T01:09:46.303Z"
  },
  "automaticCheckDate": {
    "$date": "2025-08-19T10:21:31.165Z"
  },
  "remainingTime": {
    "$date": "2025-08-11T16:25:35.530Z"
  }
},
{
  "_id": {
    "$oid": "680b946c461801f599601749"
  },
  "accountId": "6783446723-prefix-female-dmp1",
  "dc1": "3ae2794f0b82b22bce356b7f10dc16b8b07feeb0a742324b5be7d9396ee3e549c4a7c7ce87827ddd48c1379dabf3adf077f9dbf1581b4626a3fc83a4ddd3acaf49e437a68566e5bc44a490642ebc24aa9838ec6417aceb728952b670323754f1d936fed6bae3b19cbff29e259b4cd739ea8f78282bd28553cddefe86790b418131e864d3d79201451639f7adbb66121cea031f8b7d3a0d1a1710f77afb0d16728b16f1b4835b29c6daa0c7305943f064a54d7fb4d09a8abcd47559f045e3bad57c7532d0f37f47fcef01791000c882a8f93e48e5f7a79a39f4b9b78a709b91beb51accb3ec29a3ee8e8b8c9e9a66fdf278ccc89c3e573c1102b63de05fde9187",
  "dcId": 1,
  "nextApiId": 2496,
  "dateUpdated": {
    "$date": "2025-08-19T10:17:43.598Z"
  },
  "twoFa": false,
  "twoFaDate": {
    "$date": "2025-08-18T10:47:59.333Z"
  },
  "phone": "+524451102097",
  "banned": false,
  "firstName": "Albina",
  "id": "6783446723",
  "lastName": "Romanova",
  "messageCount": 142,
  "personalChannel": "dmvLQ2afIGJsWpjk",
  "personalChannelDate": {
    "$date": "2025-04-25T14:32:57.620Z"
  },
  "lazyCheckDate": {
    "$date": "2025-08-18T22:47:56.929Z"
  },
  "automaticCheckDate": {
    "$date": "2025-08-19T10:17:43.598Z"
  },
  "username": "romanova_ytterbic",
  "remainingTime": {
    "$date": "2025-08-19T04:36:12.809Z"
  }
},
{
  "_id": {
    "$oid": "683b23eb3770b19a277f4972"
  },
  "accountId": "6787626274-prefix-elba",
  "dc1": "3615ebf70d2de1e32a36f488bd157457516bc1fdb2889e5a64c948e4417269514271074932443242e5e23c8bb35d669f519ef590fb4d8ac8ad2a1b297357a95d99fe0cb3381c4a063d5a12ecafc55aeb2ca49d230f54529e40cf1569a059ed669ed1e15a408636a88e1964e8d4dd4bda035794ea80503172bc1ac212c233d11031b1fa7890933a73282229739cddadd1880702ad3ffab49261a6b71cf3f19c6e5a6d187e7feaf858dee2ea269fba65ed9179de585ba1d3d9a64705a153df2ac65181002d902d906823b80108c8097959399be04a37792c8163f578dbc59c24f3cfb382425f1a7b79d902a6c913f4449ec8f9a9b0e7fba82ba5982b06c6bfacd9",
  "dcId": 1,
  "nextApiId": 2040,
  "dateUpdated": {
    "$date": "2025-08-19T10:25:20.488Z"
  },
  "twoFa": false,
  "twoFaDate": {
    "$date": "2025-08-18T00:42:12.338Z"
  },
  "phone": "+541124090225",
  "banned": false,
  "firstName": "Valeriy",
  "id": "6787626274",
  "lastName": "Voronin",
  "messageCount": 13,
  "username": "voronin_dual",
  "personalChannel": "nkAFvKynk8WENhkk",
  "personalChannelDate": {
    "$date": "2025-05-31T16:34:07.921Z"
  },
  "lazyCheckDate": {
    "$date": "2025-08-18T14:46:50.751Z"
  },
  "automaticCheckDate": {
    "$date": "2025-08-19T10:25:20.488Z"
  },
  "remainingTime": {
    "$date": "2025-08-09T12:50:55.263Z"
  }
},
{
  "_id": {
    "$oid": "680b946b461801f59960171b"
  },
  "accountId": "6790244454-prefix-female-dmp1",
  "dc1": "57ef2da10e4b4d4743c5593478f3d09e07c060a9c76ac63703cf3f679fe739fe80556ccf293636c4559e9897b7c197499f22604f9c0ed8ee574286f15540a06ecc2c458718b72eefa906696b1db2279b0f94ac20cb930dd1145b13b36da1aa24e8a5e2f0711457c5000182409db42b6db4f2bb423e8fb918cb90402f9f5e80be09b0c765f65c98add68b71807c410e60e89da725459b1c72115fcd2a23a3ddd7b6f10723023e3a48df7beba13809f6627789c37d6b221a4220e28aaaf7cc12e538aa7d8f83543dcd442c199d8899253ca3ec2ed5cd69fa63e2f78d9c57f0aaf9133d27d3e6c82bc37d523d39ee21e50c161a2159ca637217b06053a067a25419",
  "dcId": 1,
  "nextApiId": 2496,
  "dateUpdated": {
    "$date": "2025-08-19T10:20:43.330Z"
  },
  "twoFa": false,
  "twoFaDate": {
    "$date": "2025-08-18T10:47:58.931Z"
  },
  "phone": "+541178958048",
  "banned": false,
  "firstName": "Anfisa",
  "id": "6790244454",
  "lastName": "Sokolova",
  "messageCount": 89,
  "personalChannel": "DTPlM9GtpJDvVLaz",
  "personalChannelDate": {
    "$date": "2025-04-25T14:30:51.222Z"
  },
  "lazyCheckDate": {
    "$date": "2025-08-18T21:35:11.376Z"
  },
  "automaticCheckDate": {
    "$date": "2025-08-19T10:20:43.330Z"
  },
  "username": "sokolova_managerial",
  "remainingTime": {
    "$date": "2025-08-19T10:01:07.025Z"
  },
  "historySpamBlocks": [
    {
      "spamBlockDate": {
        "$date": "2025-04-28T12:35:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-05-03T21:02:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-05-11T12:58:00.000Z"
      },
      "spamBlockDays": 7
    },
    {
      "spamBlockDate": {
        "$date": "2025-06-20T15:06:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-07-05T11:57:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-07-04T19:12:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-07-08T07:53:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-08-15T16:33:00.000Z"
      },
      "spamBlockDays": 7
    },
    {
      "spamBlockDate": {
        "$date": "2025-08-10T07:33:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-08-13T07:57:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-08-15T05:49:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-08-18T00:36:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-08-19T05:07:00.000Z"
      },
      "spamBlockDays": 1
    }
  ]
},
{
  "_id": {
    "$oid": "683b23ee3770b19a277f4af5"
  },
  "accountId": "6796128256-prefix-elba",
  "dc4": "40882759aea01dc7351c7bc94f54a41578a5ee51d84b2953c8e36d4437068e34c97c9a72b03d00c21b1f375868dff47a4c643518797ed8715ed584edc2928088f2145b1aee909a4f041ed0da484ff2c2fb462303a3956ec3019ae90dcc5d70c5f9be44eaac0db3ba1ce7f6f898f9cbce30a4109a182454098b7216473e796c7768812aac5e176a9fecfe4738180c1578decacde3a958f367daf24e15dbb27e99f5ab5b63272030c4b20e165ff1c2f89674c7b295667e5c9de27865ded38139f968d6449c6d18601cf68d185fc5283f8afcc304804988c49d5786961464e0a25392848c249a05f1f36f7e918df7879b1b732668477cb873584b75df46302a52bc",
  "dcId": 4,
  "nextApiId": 2040,
  "dateUpdated": {
    "$date": "2025-08-19T10:31:35.586Z"
  },
  "phone": "+989371750547",
  "banned": false,
  "firstName": "Ilya",
  "id": "6796128256",
  "lastName": "Morozov",
  "messageCount": 11,
  "username": "morozov_tender",
  "personalChannel": "EBOyLp6qloQaNmnq",
  "personalChannelDate": {
    "$date": "2025-05-31T16:33:09.000Z"
  },
  "lazyCheckDate": {
    "$date": "2025-08-18T14:57:14.702Z"
  },
  "automaticCheckDate": {
    "$date": "2025-08-19T10:31:35.586Z"
  },
  "remainingTime": {
    "$date": "2025-08-09T13:11:18.793Z"
  }
},
{
  "_id": {
    "$oid": "680b9474461801f599601995"
  },
  "accountId": "6804321901-prefix-female-dmp1",
  "dc1": "06476e33b28535417aa152aa1e2a3d97310c97a33d921ecf7094377d359ffdb094c0b090c0c1b01b7c6c40a4c698f91b6ee9ad19d8e8fa3a462df66fd92d0abd7d1e7935b188c35547693a17daa6009cce3ddf2ac52efbfda8d8478d0b0f6e0165ade4888c25faaa6af71cf5bf4f1b9bdbe224f10b06467e5b65e41a69fbc00d93a13d1e7702033826cacb65deab32d2473c1596edaa6676581476d1ccdb190c4608fad1346849ff346e7c0e5b668f966610bb0d689c3e145ea143e571d6c7a9500c0d0b5d8fd9f69c83c36c49a04ad7f04bab619e0584771d872d6444a6b389cb36a9fe93f6e60ebc1c82d6dae71f45a8c45d96c96f64a904940525f534a059",
  "dcId": 1,
  "nextApiId": 2496,
  "dateUpdated": {
    "$date": "2025-08-19T10:20:30.740Z"
  },
  "twoFa": false,
  "twoFaDate": {
    "$date": "2025-08-18T10:48:10.573Z"
  },
  "phone": "+543416029038",
  "banned": false,
  "firstName": "Margarita",
  "id": "6804321901",
  "lastName": "Ermakova",
  "messageCount": 138,
  "personalChannel": "AjJanvi1wkAjNsZu",
  "personalChannelDate": {
    "$date": "2025-04-25T14:33:06.630Z"
  },
  "lazyCheckDate": {
    "$date": "2025-08-18T21:37:04.793Z"
  },
  "automaticCheckDate": {
    "$date": "2025-08-19T10:20:30.740Z"
  },
  "username": "ermakova_emerald",
  "remainingTime": {
    "$date": "2025-08-19T09:26:04.484Z"
  },
  "historySpamBlocks": [
    {
      "spamBlockDate": "INFINITY",
      "spamBlockDays": 0
    }
  ]
},
{
  "_id": {
    "$oid": "685f074c3770b19a27ab2112"
  },
  "accountId": "6807146945-prefix-female-gidrovell",
  "dc1": "14e3a13907f09b0b85e282abcdde4cbd148b7b32d695d2e556677edfb3f42f69bde36a1f3123d018ee1ff905194bd4a89ea8054be6e33dd7ad07015cf47978e4e0dde0682c63a42e5a5516249cdbb1f73a7a7d7eee8f7e024d44012796f6d41f851152ebcb5cfd5350c0b0a214614e9c665a101f1b4a5bbbd19a4b9b97bb041675607b337ef8bec4d376b0f6dbbe928f83e3319ecc65f6027ee23705bb0a1bb86db2917072c3f55dd807237e63f19b26af397045a2b119b6d175cbbfb53c1cd76bfa828ab778dcf35c7eec90bcf06e496371d5bda36e2da46c2d76ef9d33ec2086e12d4d3945c18bf400131828385434b0aee8737e8580edf4a84ee89bde2aa1",
  "dcId": 1,
  "nextApiId": 2040,
  "dateUpdated": {
    "$date": "2025-08-19T10:17:30.624Z"
  },
  "twoFa": false,
  "twoFaDate": {
    "$date": "2025-07-09T22:32:18.588Z"
  },
  "phone": "+541130875212",
  "banned": false,
  "firstName": "Polina",
  "id": "6807146945",
  "lastName": "Morozova",
  "messageCount": 30,
  "username": "morozova_creepy",
  "personalChannelDate": {
    "$date": "2025-08-16T21:17:22.730Z"
  },
  "personalChannelError": "CHANNEL_NOT_FOUND",
  "lazyCheckDate": {
    "$date": "2025-08-18T19:56:39.369Z"
  },
  "automaticCheckDate": {
    "$date": "2025-08-19T10:17:30.624Z"
  },
  "remainingTime": {
    "$date": "2025-08-11T12:26:26.313Z"
  },
  "historySpamBlocks": [
    {
      "spamBlockDate": {
        "$date": "2025-08-07T12:21:00.000Z"
      },
      "spamBlockDays": 30
    },
    {
      "spamBlockDate": {
        "$date": "2025-07-21T11:03:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-07-26T05:38:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-07-27T10:56:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-07-31T07:12:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-08-14T14:23:00.000Z"
      },
      "spamBlockDays": 3
    }
  ]
},
{
  "_id": {
    "$oid": "683b23d23770b19a277f4211"
  },
  "accountId": "6815841241-prefix-elba",
  "dc5": "0d5c48963f72c84c192e7961bf573d4f03de48bbbb844755d1401353e046712426c4ddd36a50c58ba60f86699ad185d8a87fa27130b1d1d1b44694f8a0d126d5a6e3c8b13ca78d7b281b5ce07afc2f38a766fe401432aa7f9bb3d18ab79ad94535bbb72427d517ce930088ab1231f839914572e3c01953fccf255382b4f6a5aa3a76f5c12f257eb1fa15b0ddfb245cc67862871a2b51f5e51f0332807433e540c237f748c8dee2db614c24e7dabfec43d88b1760bb8ef053b8076c91a1b467d469bced89c596c42c2688bb1ba41a4093051cbb52be5767704ed0c346a8ce2c5e34f05445af40e0012b1e6178a5e8c5dd3060d901d2624a76ad0488ce3fed2554",
  "dcId": 5,
  "nextApiId": 2040,
  "dateUpdated": {
    "$date": "2025-08-19T10:16:38.083Z"
  },
  "twoFa": false,
  "twoFaDate": {
    "$date": "2025-08-18T00:42:29.156Z"
  },
  "phone": "+639282867663",
  "banned": false,
  "firstName": "Dmitriy",
  "id": "6815841241",
  "lastName": "Zaytsev",
  "messageCount": 6,
  "username": "zaytsev_natural",
  "personalChannel": "CXd7ViWanUSqEAfJ",
  "personalChannelDate": {
    "$date": "2025-05-31T16:33:16.797Z"
  },
  "lazyCheckDate": {
    "$date": "2025-08-19T01:41:40.977Z"
  },
  "automaticCheckDate": {
    "$date": "2025-08-19T10:16:38.083Z"
  },
  "remainingTime": {
    "$date": "2025-08-11T16:21:15.009Z"
  }
},
{
  "_id": {
    "$oid": "680b9470461801f59960181f"
  },
  "accountId": "6831571940-prefix-female-dmp1",
  "dc1": "97b923a7581097e4b4f060c24bb83231e239d9438956077d811f8b073b4ae8fdf509b0f1da7a5484b43406e4617f7da73644e57ce06163714f3dc3431634fdb24a6b661155035c95b05ed0cc9e1029004e26e681aa0061bf3032916a5b33eaf6211eb672f5a7a7c9c9bbb8580ac3e475aefcb19af8d9df54ec40f08a8494eaaac697694b9df6cd43b7481690f6fe1bbd25d777323b0801c1909045eb467ada367df8046835ae7fb83eef29635becbdd8f09a1b88ad0dfa65b622c4a8e0f826b6800e6d90c4b3ca5af2241af720745a846d16e7dbae9c12305d070bb04390db548d236b8a0dae717fe5a0407af22c06934b0b24769f511fe91b63ced9e1dc86c5",
  "dcId": 1,
  "nextApiId": 2496,
  "dateUpdated": {
    "$date": "2025-08-19T10:31:44.532Z"
  },
  "twoFa": false,
  "twoFaDate": {
    "$date": "2025-08-18T10:48:05.908Z"
  },
  "phone": "+542262224269",
  "banned": false,
  "firstName": "Anna",
  "id": "6831571940",
  "lastName": "Glazunova",
  "messageCount": 98,
  "personalChannel": "wdJ8qPPpcgPydrZE",
  "personalChannelDate": {
    "$date": "2025-04-25T14:34:10.387Z"
  },
  "lazyCheckDate": {
    "$date": "2025-08-18T17:43:19.401Z"
  },
  "automaticCheckDate": {
    "$date": "2025-08-19T10:31:44.532Z"
  },
  "username": "glazunova_prominent",
  "remainingTime": {
    "$date": "2025-08-18T18:54:55.225Z"
  },
  "historySpamBlocks": [
    {
      "spamBlockDate": {
        "$date": "2025-07-02T09:57:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-07-06T10:31:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-08-15T07:03:00.000Z"
      },
      "spamBlockDays": 7
    },
    {
      "spamBlockDate": {
        "$date": "2025-08-11T15:35:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-08-12T13:30:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-08-15T16:00:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-08-17T16:14:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-08-18T05:14:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-08-18T16:46:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-08-21T17:00:00.000Z"
      },
      "spamBlockDays": 3
    }
  ],
  "spamBlockDate": {
    "$date": "2025-08-21T17:00:00.000Z"
  },
  "spamBlockDays": 3,
  "spamBlockInitDate": {
    "$date": "2025-08-18T17:44:12.290Z"
  }
},
{
  "_id": {
    "$oid": "680b946d461801f59960175a"
  },
  "accountId": "6833589999-prefix-female-dmp1",
  "dc1": "0bb0e516d961170515241c50320e7cd4f61b4485ff2f5f890986e5f69a115ec39a3594a19fc74fbe87a85cb068f76a4d2b6b1794309c5b17447193cc7ba226da491861467c6a4c5ab886376747cb5246bc8058ac6927fed8c0fb56b312a58595d33c2536389afdf70267260650f6075852a186567bf1bf8e39fab84d316dcc1e7c55015b28a0d28471c0b986ff95daa32e368458da14a240e193e6f215d64964bc28f818ad022dae88c708323d78693d83ebf6c159ab796ac39357dc95691d96d4a7f0698caf24957e0053743b86554cf41d8711267f8e8bcb3c8ff7526aa1640990bfbd81211125776f046b7fd1e38ad46c36402b478b41aff48be605241f75",
  "dcId": 1,
  "nextApiId": 2496,
  "dateUpdated": {
    "$date": "2025-08-19T10:22:44.972Z"
  },
  "twoFa": false,
  "twoFaDate": {
    "$date": "2025-08-18T10:48:00.279Z"
  },
  "phone": "+543476620046",
  "banned": false,
  "firstName": "Rita",
  "id": "6833589999",
  "lastName": "Nikolaeva",
  "messageCount": 133,
  "personalChannel": "eP8ukrPVcRtvGykH",
  "personalChannelDate": {
    "$date": "2025-04-25T14:30:52.702Z"
  },
  "lazyCheckDate": {
    "$date": "2025-08-18T21:39:07.632Z"
  },
  "automaticCheckDate": {
    "$date": "2025-08-19T10:22:44.972Z"
  },
  "username": "nikolaeva_dutch",
  "remainingTime": {
    "$date": "2025-08-19T08:32:34.102Z"
  },
  "historySpamBlocks": [
    {
      "spamBlockDate": {
        "$date": "2025-05-02T12:28:00.000Z"
      },
      "spamBlockDays": 1
    }
  ]
},
{
  "_id": {
    "$oid": "685f074a3770b19a27ab207f"
  },
  "accountId": "6836785910-prefix-female-gidrovell",
  "dc1": "594bcda64eb776d9ade1b7fe99a13de8860bd2fb43ec7f522166387f4acde0bca888ae1bb288a0069d81c58a8803cf64521a0e6dc782b67fd4995334f74d38fc8b90aec7b8d859191e8e5561839af24153982d003205cf0d3c5210bdeb715148d0c45323f5997342a3319bf94ad96dfd717e5f0b0562aab498bfab5db907bed921d6d105ee879100e83474c833d551af1b8d6bc81f8c0456e4fdfdfb1934fdb8d1e8f40b10a9f8c86236fa113c98e3a75e5b39c5da6c72c6c40672614077db995af82d4cb8fc635c482b73131e84a9e53ea243f1d1d39bf8469f01ec733f36666089af2e2b86ca41ab1c32a5a6ede1267706bfa8a48637a6f0d8248d4827e0d7",
  "dcId": 1,
  "nextApiId": 2040,
  "dateUpdated": {
    "$date": "2025-08-19T10:39:43.017Z"
  },
  "twoFa": false,
  "twoFaDate": {
    "$date": "2025-08-18T10:47:51.223Z"
  },
  "phone": "+542983543781",
  "banned": false,
  "firstName": "Daria",
  "id": "6836785910",
  "lastName": "Kalinina",
  "messageCount": 24,
  "username": "kalinina_eldest",
  "personalChannelDate": {
    "$date": "2025-08-16T21:17:14.997Z"
  },
  "personalChannelError": "CHANNEL_NOT_FOUND",
  "lazyCheckDate": {
    "$date": "2025-08-18T22:18:16.756Z"
  },
  "automaticCheckDate": {
    "$date": "2025-08-19T10:39:43.017Z"
  },
  "remainingTime": {
    "$date": "2025-08-11T12:33:58.790Z"
  }
},
{
  "_id": {
    "$oid": "680b946e461801f5996017bd"
  },
  "accountId": "6842991657-prefix-female-dmp1",
  "dc1": "6d77ebaa116ff62e931159638dfa155ba9637771d2dd8115cac6239a47d15cf28f64863887952fa94d93361a8d90617ec1a85f2f36668d1ee6d18b5bc8850b50c84e16c376e4fe6cda18a132666bd887168c1406a84dca3175874b4c6992fa6f763e36bbb3903a5a2a72077ff6b3720fb9c1344325e4e8217f449c3a2d27a065a0bb2d67b1bb385127182a1094117abc0f787fecc3108da460ea8e2bf414c0e57514e1f2adac4b6189a1394cb8664e01bafa052cb37aa6a7ca2a2510c6f469408f2b9dab94c554bc5a027f3f4abfda813441d3f012dbea3418f9246b87d6c783815ba69af207cef3917373a4911511bb856f6cf0205938baee8a04ee43b5daa7",
  "dcId": 1,
  "nextApiId": 2496,
  "dateUpdated": {
    "$date": "2025-08-19T10:28:43.575Z"
  },
  "twoFa": false,
  "twoFaDate": {
    "$date": "2025-08-18T10:48:03.102Z"
  },
  "phone": "+573145955648",
  "banned": false,
  "firstName": "Raisa",
  "id": "6842991657",
  "lastName": "Ilyina",
  "messageCount": 47,
  "personalChannel": "kmDQk8xeThQpMrwv",
  "personalChannelDate": {
    "$date": "2025-04-25T14:31:31.176Z"
  },
  "lazyCheckDate": {
    "$date": "2025-08-18T15:54:28.312Z"
  },
  "automaticCheckDate": {
    "$date": "2025-08-19T10:28:43.575Z"
  },
  "username": "ilyina_zygomorphic",
  "remainingTime": {
    "$date": "2025-08-19T03:48:57.393Z"
  }
},
{
  "_id": {
    "$oid": "683b23e73770b19a277f486a"
  },
  "accountId": "6849367394-prefix-elba",
  "dc1": "b5664833b71bd87aecc4c25769311d7a0b3c66f993ee753d1147668bafc52d833566f18e035acc8a174e9a6623560be65d23750b2f9e0a813d59cd4b856cecb5767466d86f17280be6761c3aefcbabb5dec06b40ec9cf8871c30841a5e5ff4981660b97ead25657513c321e2b7494b9d7dc401d19981e7fc0d8b6eef715e7c43dc84161f1808b965e9aad05122fb43c31111f73766b1212e1881a956ad90c82ca28461107d005e014013db0991372c4f06159609d0fd854c564e95b466b15b0501f8097de183dbdbf178f2e2c8f870cc7995b319e6805140781268ae670cbd86729a03f164e806f75a1cae6ec8066340033817c92bca4b4e8b8d0be5ee135651",
  "dcId": 1,
  "nextApiId": 2040,
  "dateUpdated": {
    "$date": "2025-08-19T10:14:30.641Z"
  },
  "phone": "+573238227268",
  "banned": false,
  "firstName": "Georgiy",
  "id": "6849367394",
  "lastName": "Zubkov",
  "messageCount": 4,
  "username": "zubkov_rural",
  "personalChannel": "qNCjhcZsjv9RrLCO",
  "personalChannelDate": {
    "$date": "2025-05-31T16:34:43.855Z"
  },
  "lazyCheckDate": {
    "$date": "2025-08-19T01:07:46.064Z"
  },
  "automaticCheckDate": {
    "$date": "2025-08-19T10:14:30.641Z"
  },
  "remainingTime": {
    "$date": "2025-08-09T10:20:53.193Z"
  }
},
{
  "_id": {
    "$oid": "680b9472461801f5996018bc"
  },
  "accountId": "6855886360-prefix-female-dmp1",
  "dc1": "73340f862d02b788e47c23b2ae5af18e6333de6a568f37ace1c7f00892cf6900fc2704b0a4be5eb2e7188f9ace2d35636c9e160d589eba908340c8e9f269b99e4eda7e074361f7df7dff53016cd4af4b3bb2497100d95e54bff61d3964275bc99699de1d7dd38bc1e15d66029302c0431de457391c2cf33f07a35cf0140a62c5e5da8895fb766a459f2ae99bc2989889baae8afbcb900c49b653756ba024b7154b7bb47fc9a140dcba207ce04229aeb963e1630980d04b0403a5e9d6f1ffd9a7e5e38b3d7c5946dab46287d0bd916ef2ffa5c8377a02645ff48b776a5fa5860357d6559dee2f0ad2e84973adbd8d1bac269b91e3709d4456955a80702d18b7e3",
  "dcId": 1,
  "nextApiId": 2496,
  "dateUpdated": {
    "$date": "2025-08-19T10:26:44.524Z"
  },
  "twoFa": false,
  "twoFaDate": {
    "$date": "2025-05-20T11:13:16.778Z"
  },
  "phone": "+543777207164",
  "banned": false,
  "firstName": "Irina",
  "id": "6855886360",
  "lastName": "Malyutina",
  "messageCount": 113,
  "personalChannel": "NscdMy1ywmyuQIGA",
  "personalChannelDate": {
    "$date": "2025-04-25T14:30:15.368Z"
  },
  "lazyCheckDate": {
    "$date": "2025-08-18T21:19:13.474Z"
  },
  "automaticCheckDate": {
    "$date": "2025-08-19T10:26:44.524Z"
  },
  "username": "malyutina_dizzy",
  "historySpamBlocks": [
    {
      "spamBlockDate": "INFINITY",
      "spamBlockDays": 0
    },
    {
      "spamBlockDate": "INFINITY",
      "spamBlockDays": 0
    }
  ],
  "remainingTime": {
    "$date": "2025-08-19T08:40:58.500Z"
  }
},
{
  "_id": {
    "$oid": "680b9472461801f5996018c1"
  },
  "accountId": "6867148885-prefix-female-dmp1",
  "dc1": "5bf36e0bb231417a6a511137cc894e614caf486d77760df4fe0146e82b6b12152ffbfcb95e11f9f4f645d8f0a80fcae63541a0acd94ca0d0058ef4ed82eb0a9cd9b91ae76463da29a38b7bc104e590961f71e5e22512c9e06f5cdde0c0d33e58e74823a4c7960959b7944eb06ef21d8be7618d35e664f1be8ffe1c64434774f1700b921e1d4927b4900ac0ecf1fdeb961e2affea607ea82bcf1052cebc1c69b4ef843a0b680a7d14e646096b967588c114a0f089345189f22a9d3fed9412604dc7d8e3c0dc935380233fe3cd0ef94363c16e0af6c6fddcd726fe16d0ec74ddc9d5b4c613556b6fc28b930937d917f161a0f1fbbbf10d63bb6c3aac8a1ad8275c",
  "dcId": 1,
  "nextApiId": 2496,
  "dateUpdated": {
    "$date": "2025-08-19T10:34:44.170Z"
  },
  "twoFa": false,
  "twoFaDate": {
    "$date": "2025-08-18T10:47:59.977Z"
  },
  "phone": "+542657710105",
  "banned": false,
  "firstName": "Arina",
  "id": "6867148885",
  "lastName": "Melnikova",
  "messageCount": 115,
  "personalChannel": "GvwIRiEmVJrTV7WV",
  "personalChannelDate": {
    "$date": "2025-04-25T14:33:33.132Z"
  },
  "lazyCheckDate": {
    "$date": "2025-08-18T16:14:14.021Z"
  },
  "automaticCheckDate": {
    "$date": "2025-08-19T10:34:44.170Z"
  },
  "username": "melnikova_inclined",
  "remainingTime": {
    "$date": "2025-08-17T06:54:55.373Z"
  },
  "historySpamBlocks": [
    {
      "spamBlockDate": {
        "$date": "2025-08-10T18:55:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-08-13T03:05:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-08-18T05:51:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-08-17T04:54:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-08-20T07:18:00.000Z"
      },
      "spamBlockDays": 3
    }
  ],
  "spamBlockDate": {
    "$date": "2025-08-20T07:18:00.000Z"
  },
  "spamBlockDays": 3,
  "spamBlockInitDate": {
    "$date": "2025-08-17T07:42:58.662Z"
  }
},
{
  "_id": {
    "$oid": "685f074c3770b19a27ab2114"
  },
  "accountId": "6874867460-prefix-female-gidrovell",
  "dc1": "8003f1aa9473981dc134a2aa749fb14bfee2ba7ec681f54eb7bb82b510185b9ebd3b2fb0819d3d72057f5ec556fe83c0c38a88b009cf4b6f5a9c28e42c123e66c47068a28426b1f77d310321b4bb6799e5cf858af3e45c705446b8252521cac3ec996fcd73ebd3dedc3877afecdae20829e41b0e0726f2c4fcc0db240191114f9438fe54da582d16a7481ae860e41385d2ca5bd29194095be596dd2f933f5f240aae481dc7721f06ad79480adb9bc5ce159715b58a055af7e451544175f9c1b09fafc6df40a7ff3451417a786cbd2ef8f3515526cb7785d718baf9fdc71cdb28bccc42597996e71c1386e3d852ef64926e7addda05d5facdb64ce1fe6648b6ba",
  "dcId": 1,
  "nextApiId": 2040,
  "dateUpdated": {
    "$date": "2025-08-19T10:12:22.712Z"
  },
  "twoFa": false,
  "twoFaDate": {
    "$date": "2025-08-18T10:47:56.609Z"
  },
  "phone": "+541128554971",
  "banned": false,
  "firstName": "Sofia",
  "id": "6874867460",
  "lastName": "Anisimova",
  "messageCount": 25,
  "username": "anisimova_global",
  "personalChannelDate": {
    "$date": "2025-08-16T21:17:19.947Z"
  },
  "personalChannelError": "CHANNEL_NOT_FOUND",
  "lazyCheckDate": {
    "$date": "2025-08-18T22:07:23.715Z"
  },
  "automaticCheckDate": {
    "$date": "2025-08-19T10:12:22.712Z"
  },
  "remainingTime": {
    "$date": "2025-08-11T12:35:15.316Z"
  },
  "historySpamBlocks": [
    {
      "spamBlockDate": {
        "$date": "2025-07-29T10:00:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-08-02T07:13:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-08-18T12:01:00.000Z"
      },
      "spamBlockDays": 7
    }
  ]
},
{
  "_id": {
    "$oid": "685f07483770b19a27ab1f8a"
  },
  "accountId": "6887201786-prefix-female-gidrovell",
  "dc1": "c1805edf39435445a1f8e1320e9904ec8769eb12d183effcf4e62dd1ab6fc838b38be0fc088a6be0ee30c2d2c5cef4ed6c55bb6e4f02e934c73a06ba080d7a1a66f235e10b642093405f4027fbb2d94802b0d5e27a91a56e08c4b108badf551e801e4b93e4861486bd5422f04b5d5047a82e7e5d30e0aa902c3dd4091abc5b565dd31db483f58b2f2ea7477fe53626382dedb434be6b52e29232efcd870d5a332d7f363b6e95f7c4a032d54978fe35994731cbf8a2b38bbfc575a682145f73acdb76b68adf26ef02156b0d1def879709d2e4b0518c1f80dbe777c3c6072fe327aae503575f09a89ef1d913102d8c11ce22c51dee28dfdd03a96a49e018c82eb8",
  "dcId": 1,
  "nextApiId": 2040,
  "dateUpdated": {
    "$date": "2025-08-19T10:20:42.235Z"
  },
  "twoFa": false,
  "twoFaDate": {
    "$date": "2025-08-18T10:47:37.252Z"
  },
  "phone": "+542236965167",
  "banned": false,
  "firstName": "Valeria",
  "id": "6887201786",
  "lastName": "Ignatova",
  "messageCount": 29,
  "username": "ignatova_lovely",
  "personalChannelDate": {
    "$date": "2025-08-16T21:17:23.715Z"
  },
  "personalChannelError": "CHANNEL_NOT_FOUND",
  "lazyCheckDate": {
    "$date": "2025-08-18T22:53:36.615Z"
  },
  "automaticCheckDate": {
    "$date": "2025-08-19T10:20:42.235Z"
  },
  "remainingTime": {
    "$date": "2025-08-06T14:15:03.996Z"
  }
},
{
  "_id": {
    "$oid": "685f074b3770b19a27ab20e0"
  },
  "accountId": "6892104509-prefix-female-gidrovell",
  "dc1": "ba47bfeb45245053053336480a61571e27fff1dce8a0d81a5bbe6bec368339f11baf28bb7a5fde786589d3344a4d75ab42a477b0a893eb9eb45477be274775cd955e18bbb756b9f421e49c2c5a8fcd3398836863f4090c8ee3eea7321a9e8f7c4b79928690b3d04a6d0b8a52143f5a17d1453792991fb2fc521d8f45804e332c83df93b5f462a86c0eaa97658748c59f655dfb630337f7151c4fbb3942ebd5cab28bed1534ac44c0431f24e57afbdbe5657a07b30ce420385c154596421ce073da1cc95a50074a69250b145d576f5ed6b58986cc0a26b85d2a94759a8a84b7304e3dd757ace8831407a225f958636de2d259629e88fcae5e2db3be7a621efb17",
  "dcId": 1,
  "nextApiId": 2040,
  "dateUpdated": {
    "$date": "2025-08-19T10:17:22.278Z"
  },
  "twoFa": false,
  "twoFaDate": {
    "$date": "2025-08-18T10:47:55.655Z"
  },
  "phone": "+541164972730",
  "banned": false,
  "firstName": "Rita",
  "id": "6892104509",
  "lastName": "Shevchukova",
  "messageCount": 33,
  "username": "shevchukova_inherent",
  "personalChannelDate": {
    "$date": "2025-08-16T21:17:14.997Z"
  },
  "personalChannelError": "CHANNEL_NOT_FOUND",
  "lazyCheckDate": {
    "$date": "2025-08-18T22:18:28.862Z"
  },
  "automaticCheckDate": {
    "$date": "2025-08-19T10:17:22.278Z"
  },
  "remainingTime": {
    "$date": "2025-08-11T12:34:42.975Z"
  }
},
{
  "_id": {
    "$oid": "6810c3b4461801f5990b980a"
  },
  "accountId": "6902489361-prefix-elba",
  "dc1": "6205793222e0e4fa19a4f6258c473fcf9b421f5f1b0b53af0f8de4e0e94c2fa33568057eab80e38ea5a165705f83cad6e52de1b4c35aa79648c81f1cabddfede461526078441d2934ca11dc4b4d4f44469878c9a7c84e250b879a3ad338103ecdb9635449a466f9376a07ec62a85f0b031c9a02ebd3e3bd9d6944ce117744a9f26b4e93e24f4483c543a336bf0ae8a35abc392f9515b0469de8d903787ccea2ef89df8d8c1f1c6805cd7b728a659d41da903c6a7a9fa957166e6d2dba7d46961f8ce2e1445f72ff4443f321129968e9cf9a514fd0e3846363c14c5dbdbb0a606318254c56e604ba57a44bd6f15c260c33775e3853fa1484e4c07c0b13ae2842f",
  "dcId": 1,
  "nextApiId": 2040,
  "dateUpdated": {
    "$date": "2025-08-19T10:24:35.369Z"
  },
  "twoFa": false,
  "twoFaDate": {
    "$date": "2025-08-19T02:19:50.337Z"
  },
  "phone": "+573008932590",
  "banned": false,
  "firstName": "Ivan",
  "id": "6902489361",
  "lastName": "Volkov",
  "messageCount": 30,
  "username": "volkov_fellow",
  "personalChannel": "uoqdJ5NYdJNxZqUH",
  "personalChannelDate": {
    "$date": "2025-04-29T13:15:57.397Z"
  },
  "lazyCheckDate": {
    "$date": "2025-08-18T21:27:08.172Z"
  },
  "automaticCheckDate": {
    "$date": "2025-08-19T10:24:35.369Z"
  },
  "remainingTime": {
    "$date": "2025-08-11T16:22:01.611Z"
  },
  "historySpamBlocks": [
    {
      "spamBlockDate": {
        "$date": "2025-05-27T07:53:00.000Z"
      },
      "spamBlockDays": 1
    }
  ]
},
{
  "_id": {
    "$oid": "683b23d83770b19a277f43c7"
  },
  "accountId": "6907127779-prefix-elba",
  "dc5": "a2044c4f8034a281f49696e20bb95bbd7b87ac8ee751989bdf360f4e84a6cd3fa77642bb585c021221eb8bf6cae1bb5bbde27e3400aac1c2b852ff8d86acecf3b235722970c9552b6564f82acf0912c3dc5d1cc85669935990eb07b15397dd6e7d8cb358e1b3cdc6f195f643ee98536b402c32bc64693fbdcf587994424d83222056bc7a2f95bb2c494b6be43042fc4784fee8cfce43ed679fab3b4dbcdf7e1c09988db1092a6fce8d3b44b7dc82190704cf47bdd9ab6590a7fc9da56f5d538f70431097612fe40d2aa97e9a2961016ce558f3e6e441b11659ec7ff9b8721182b4542a9371408a634cb65affbd9db8fc842973f8689cf016b11da0f02f8e8a47",
  "dcId": 5,
  "nextApiId": 2040,
  "dateUpdated": {
    "$date": "2025-08-19T10:35:25.348Z"
  },
  "twoFa": false,
  "twoFaDate": {
    "$date": "2025-08-18T00:42:38.272Z"
  },
  "phone": "+6283136031073",
  "banned": false,
  "firstName": "Dmitry",
  "id": "6907127779",
  "lastName": "Efimov",
  "messageCount": 13,
  "username": "efimov_crooked",
  "personalChannel": "jfOaQmsA7zXTOyAJ",
  "personalChannelDate": {
    "$date": "2025-05-31T16:35:42.979Z"
  },
  "lazyCheckDate": {
    "$date": "2025-08-19T00:00:16.619Z"
  },
  "automaticCheckDate": {
    "$date": "2025-08-19T10:35:25.348Z"
  },
  "remainingTime": {
    "$date": "2025-08-11T16:26:00.206Z"
  }
},
{
  "_id": {
    "$oid": "683b23e93770b19a277f4906"
  },
  "accountId": "6909632800-prefix-elba",
  "dc1": "85b6527e270473031fb31550b04e3f0d9a13971636ada9a2590b2fd6dfc610930d306789c14ac8c07789bc5dc13bfe4c4fddcb3aa74736c5f11db0c8404da1e1d42d3caaa83c06f9122c1d395e2b9de1f410771fe97732f32d6167fe641366de310701219647a9e5ca777dfe25096a7e7319cc7058d1eee1e5cbfc62f538137df3bc0144947b4004887f03038bf1ab8dc9af8c6b1af70127d4c4399adf75538992de23303b9d8e3b871d86a66f3dacfeacb953fee9daa6f20daea29029d3e40af1af983662a6805016d9b075ea4b1ab89eb55d4964d917106c064faaeef9a82efe573ee4401951456de45cfeafb21faa445b3551b60639854cc1ff6d5e4ddc90",
  "dcId": 1,
  "nextApiId": 2040,
  "dateUpdated": {
    "$date": "2025-08-19T10:20:23.125Z"
  },
  "twoFa": false,
  "twoFaDate": {
    "$date": "2025-08-18T00:42:32.289Z"
  },
  "phone": "+573122168540",
  "banned": false,
  "firstName": "Vitaly",
  "id": "6909632800",
  "lastName": "Malakhov",
  "messageCount": 5,
  "username": "malakhov_managerial",
  "personalChannel": "gAboxQQDAT0LPHwR",
  "personalChannelDate": {
    "$date": "2025-05-31T16:33:48.475Z"
  },
  "lazyCheckDate": {
    "$date": "2025-08-18T23:05:03.722Z"
  },
  "automaticCheckDate": {
    "$date": "2025-08-19T10:20:23.125Z"
  },
  "remainingTime": {
    "$date": "2025-08-11T11:05:21.636Z"
  }
},
{
  "_id": {
    "$oid": "683b23d93770b19a277f43f3"
  },
  "accountId": "6917375959-prefix-elba",
  "dc5": "5312798fbc16839a32f13d9babde91fce7337dcc32ccaa2ffa0964ab5594c0776737444f2983ee7d1fb54d8dcefa89cc4dbe4ac4928232f3fc91df8fb39cc83200db81fa46578b4cc7946b02ac4083b4ed76963e18f7e9181ad4d083d32d6d06eb0d66d199a5ea3e6027544b7dce263642a690e90f7e2914ed7cf45c3d1f27b99467eebff5cafb1c25566c666454271dc62efb73883ac0e46aeeb6df66d9ec40b420e73c112fe0a11b680bc98fb6dd39e91c760c3d8d4c6615b3baaf48d04f1e547a4fa788e8b9273f78ab54c846ccedb0a28f2215bc38aaed09133ef7a8d11d1b5b1ee14d4157406350207fa52abbba0f54c3becac1aac659f552bb1867e672",
  "dcId": 5,
  "nextApiId": 2040,
  "dateUpdated": {
    "$date": "2025-08-19T10:35:23.354Z"
  },
  "twoFa": false,
  "twoFaDate": {
    "$date": "2025-08-18T00:42:30.058Z"
  },
  "phone": "+6289605982070",
  "banned": false,
  "firstName": "Grigory",
  "id": "6917375959",
  "lastName": "Ermakov",
  "messageCount": 12,
  "username": "ermakov_married",
  "personalChannel": "ItFo8VhLOhhhPIdp",
  "personalChannelDate": {
    "$date": "2025-05-31T16:33:25.432Z"
  },
  "lazyCheckDate": {
    "$date": "2025-08-19T00:34:55.608Z"
  },
  "automaticCheckDate": {
    "$date": "2025-08-19T10:35:23.353Z"
  },
  "remainingTime": {
    "$date": "2025-08-09T13:32:59.009Z"
  }
},
{
  "_id": {
    "$oid": "680b9469461801f599601653"
  },
  "accountId": "6926402721-prefix-female-dmp1",
  "dc1": "75c863188cbba5005d0d6de22104ddd90b69e015fb330089168dde07dec60caeaad6e0af372043a5c856e4f59bfac80e1399d6901b02c4ea20b4513b8a9f0595a5a4e799b848514cf0a0d765b139ad90c946968bca2dcfbeb01d8c7aa44c0b4df695bc3b18d5f87536a546c34647aff3b680d6c6b211c71a93853e857513f4a13ac06cb1df43a401a4ce6f28488c49b67dd890014a6e58aaff1fd95fbabdda87711c2f17e00d60590a052fbbd0350ab93f6fb2b81fcae6ca8a8cacf514189a33f08829aac6ef79bad7958888f257f4d75cd831711851ca6ac3e1c212a2127b8fe968ad605d0d91ba44fbe00a24f724ebe32dfec3aced45ca129fed8a085ed5ab",
  "dcId": 1,
  "nextApiId": 2496,
  "dateUpdated": {
    "$date": "2025-08-19T10:27:43.583Z"
  },
  "twoFa": false,
  "twoFaDate": {
    "$date": "2025-08-18T10:47:55.331Z"
  },
  "phone": "+573133813899",
  "banned": false,
  "firstName": "Nina",
  "id": "6926402721",
  "lastName": "Martynova",
  "messageCount": 40,
  "personalChannel": "hLNlNuYQVwrPaEr2",
  "personalChannelDate": {
    "$date": "2025-04-25T14:31:53.130Z"
  },
  "lazyCheckDate": {
    "$date": "2025-08-18T22:13:31.145Z"
  },
  "automaticCheckDate": {
    "$date": "2025-08-19T10:27:43.583Z"
  },
  "username": "martynova_unexpected",
  "remainingTime": {
    "$date": "2025-08-19T04:39:49.379Z"
  },
  "historySpamBlocks": [
    {
      "spamBlockDate": {
        "$date": "2025-08-11T08:06:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-08-17T13:19:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-08-24T14:16:00.000Z"
      },
      "spamBlockDays": 7
    }
  ]
},
{
  "_id": {
    "$oid": "6810c3b5461801f5990b984e"
  },
  "accountId": "6934879744-prefix-elba",
  "dc4": "024fa18d6d25cbb2b1b3fa7adc9c1a4bef9174db63a1b242d80fa1963ecc31fa342e0fe232511bcab27d5973cd53a88833b346f2abd7a1055dd599f596f05ef3bde8e128e24ddc7e69b6e1605213d03e14a69e563c667a3431fa1f3fb1bfcd9f4204e662f26d0e3f28240178c0d11618db3286c13a0121afb23d3de4e8d4a66a4b3aa744a5f2e25d71402134aff42a147bf6fc33d9b4698b82f521c7df970a82864df44071d199ec9de297f3421476cdbed6709e981ecd5c5254f035c6877d864d2ffbda60e1d39499a7426551877587a650026f11c91888c25a93524e03d33be8bb81b2f52ef47d9782dba4fa93071d75ef90aedeed23eca5780877c2503c7e",
  "dcId": 4,
  "nextApiId": 2040,
  "dateUpdated": {
    "$date": "2025-08-19T10:16:35.378Z"
  },
  "twoFa": false,
  "twoFaDate": {
    "$date": "2025-08-19T02:19:53.886Z"
  },
  "phone": "+201091958532",
  "banned": false,
  "firstName": "Timofey",
  "id": "6934879744",
  "lastName": "Zubarev",
  "messageCount": 31,
  "username": "zubarev_marine",
  "personalChannel": "EcQI7VSgQOcGsjFe",
  "personalChannelDate": {
    "$date": "2025-04-29T13:13:26.489Z"
  },
  "lazyCheckDate": {
    "$date": "2025-08-18T14:19:59.174Z"
  },
  "automaticCheckDate": {
    "$date": "2025-08-19T10:16:35.378Z"
  },
  "remainingTime": {
    "$date": "2025-08-11T11:02:44.051Z"
  },
  "historySpamBlocks": [
    {
      "spamBlockDate": {
        "$date": "2025-05-30T05:58:00.000Z"
      },
      "spamBlockDays": 1
    }
  ]
},
{
  "_id": {
    "$oid": "683b23eb3770b19a277f497d"
  },
  "accountId": "6938249846-prefix-elba",
  "dc1": "ac129bd9ce088f3d1f3f253c676e43cb09de695dcf53a76cff98e999cfa87168d587ece9091e65cb649bb78dec1ed9ba342f06b5efd413b5302fb6335ab50a250f96f14c769f9b6dcbd402ae35af59591a36d673f7084372a95722cf074bdafb2fda44a87fe6d52753dacec3a9169c64049b5070706ce85dcf0e626a0229e6cc8c307c1004c4c364d9ca71d5d98b4ba7cb82905d29c990a7b7f859e6b050b2b24ab7aee1b5701d8f6384473e23c028c671824795fc83b0521fb4b00452d2198a793d7159a43724c3bdf0a79dba3e6493d0fd1697dce944162ee128d453a941ad38edcd1b8c064807304a6536c335f21d7f305d15b43bfed81fbd9b35e4aa9394",
  "dcId": 1,
  "nextApiId": 2040,
  "dateUpdated": {
    "$date": "2025-08-19T10:39:35.828Z"
  },
  "phone": "+541149277182",
  "banned": false,
  "firstName": "Roman",
  "id": "6938249846",
  "lastName": "Shubin",
  "messageCount": 13,
  "username": "shubin_formal",
  "personalChannel": "pqZuVDA4zZVQaZee",
  "personalChannelDate": {
    "$date": "2025-05-31T16:31:45.620Z"
  },
  "lazyCheckDate": {
    "$date": "2025-08-18T22:22:39.806Z"
  },
  "automaticCheckDate": {
    "$date": "2025-08-19T10:39:35.828Z"
  },
  "remainingTime": {
    "$date": "2025-08-11T10:59:04.402Z"
  }
},
{
  "_id": {
    "$oid": "685f074c3770b19a27ab2104"
  },
  "accountId": "6952302265-prefix-female-gidrovell",
  "dc1": "5647df35ca4e38dd67572261e0bb096d5b462469a61a209574674975df40fdfc8e25b4f770389b4245056f8e63443c22086445f67b0ba0be77970839d4b21af0d426f67c97cca6fe9652318d0e1e6d1ba76b24bae24ab0c7750ccbbc8b444e3277814342b8a02523bf58325282a698767f31cf7123abfabacc16d964416568ffaac4b9c5c387a808e4785e5ff7c722cf598eec276af75a5caac8a6a13bbab164eb87be35a37964cf5dbbdbc25ce87bbe26ef6235241625286cf9d59100c83f432a1c19d6b86a794f2edc123e1f1e1b6ccffcd8bfd30691b2def6ac22882366f3b37ef138896321a84a382802db84416b8a8687fb65b3b7be290ac5ad4570af78",
  "dcId": 1,
  "nextApiId": 2040,
  "dateUpdated": {
    "$date": "2025-08-19T10:15:16.560Z"
  },
  "twoFa": false,
  "twoFaDate": {
    "$date": "2025-08-18T10:47:55.949Z"
  },
  "phone": "+542284374367",
  "banned": false,
  "firstName": "Yana",
  "id": "6952302265",
  "lastName": "Samoylova",
  "messageCount": 32,
  "username": "samoylova_rational",
  "personalChannelDate": {
    "$date": "2025-08-16T21:17:17.963Z"
  },
  "personalChannelError": "CHANNEL_NOT_FOUND",
  "lazyCheckDate": {
    "$date": "2025-08-18T20:25:51.155Z"
  },
  "automaticCheckDate": {
    "$date": "2025-08-19T10:15:16.560Z"
  },
  "remainingTime": {
    "$date": "2025-08-11T12:09:07.388Z"
  }
},
{
  "_id": {
    "$oid": "685f07473770b19a27ab1f7a"
  },
  "accountId": "6958460672-prefix-female-gidrovell",
  "dc1": "3ab31fa34f9738f3eecedb3a663c4d9129140c6674879f4ee858ba26032604dc067f955b7f7abe54efc276b71587d63dd7060e8bbddfcc42a55964c635bd2c91c85a96c6262d8f7f07a8efab89ff8999f4dcccd0920bf78a16de455682bbf2126bf93d4f5c15651865dd98e9966c1a750be7ad13bc277137f9597be3ab8c0117f9fff89400ab001307f439843b592db16e4d3b5edd37c3009e2e02b530761e832506d76c828e842409c830fe5bf2522de5ef6827e87a5d73bc11c27ed8c4166d602b454651fd5dc007ab837ee0a513cd2ee04b8dbab677e1a3b3ba16f3c2e46a75100fa0b904fd3764fc9a0529be173618fe6d2412aa257593767b9e30c66d10",
  "dcId": 1,
  "nextApiId": 2040,
  "dateUpdated": {
    "$date": "2025-08-19T10:26:42.213Z"
  },
  "twoFa": false,
  "twoFaDate": {
    "$date": "2025-08-18T10:47:41.096Z"
  },
  "phone": "+541166662406",
  "banned": false,
  "firstName": "Inna",
  "id": "6958460672",
  "lastName": "Galitsyna",
  "messageCount": 32,
  "username": "galitsyna_excessive",
  "personalChannelDate": {
    "$date": "2025-08-16T21:17:20.420Z"
  },
  "personalChannelError": "CHANNEL_NOT_FOUND",
  "lazyCheckDate": {
    "$date": "2025-08-18T22:27:35.337Z"
  },
  "automaticCheckDate": {
    "$date": "2025-08-19T10:26:42.213Z"
  },
  "remainingTime": {
    "$date": "2025-08-11T12:30:51.936Z"
  }
},
{
  "_id": {
    "$oid": "685f074c3770b19a27ab210e"
  },
  "accountId": "6964606233-prefix-female-gidrovell",
  "dc1": "06fb183f2edfba07863da8076a05ad366529ed35390f55fe80c693cb9e30ad2c923635f46bf328ed9efaa4a12b43bc8de358677ecadb8de0b94a4a78bc1f21023888938303d9747884b1a3f9dddd4edd1034039d369b041ee95f95250cca668fe60300343eda1c33f20cc23df6af8ba54f3b5f52e495bd5799d2dcc83c5b5687a9a7bbb82fc847f72fedb268d0a00c27db2f4af7ee536c23141b301bcbcb658fb4856685fd98c9d0e57bb9608c48434e54f9efdef372614ac1074b6e6933cb3fb89616f38833dabfa484d11c24b72811bee6f19554dc25abaa41e0477f8702746142eb6989adb60ae920e56cd4b14cd565598880ee66fd63059ee9fee03b1f14",
  "dcId": 1,
  "nextApiId": 2040,
  "dateUpdated": {
    "$date": "2025-08-19T10:13:22.489Z"
  },
  "twoFa": false,
  "twoFaDate": {
    "$date": "2025-08-18T10:47:55.645Z"
  },
  "phone": "+542622238195",
  "banned": false,
  "firstName": "Irina",
  "id": "6964606233",
  "lastName": "Sinitsyna",
  "messageCount": 30,
  "username": "sinitsyna_inner",
  "personalChannelDate": {
    "$date": "2025-08-16T21:17:19.727Z"
  },
  "personalChannelError": "CHANNEL_NOT_FOUND",
  "lazyCheckDate": {
    "$date": "2025-08-18T21:27:11.564Z"
  },
  "automaticCheckDate": {
    "$date": "2025-08-19T10:13:22.489Z"
  },
  "remainingTime": {
    "$date": "2025-08-11T12:06:51.119Z"
  },
  "historySpamBlocks": [
    {
      "spamBlockDate": {
        "$date": "2025-08-05T07:42:00.000Z"
      },
      "spamBlockDays": 1
    }
  ]
},
{
  "_id": {
    "$oid": "680b946c461801f599601743"
  },
  "accountId": "6966420117-prefix-female-dmp1",
  "dc1": "695250764ad5a2768e7941b024c59a96dfaaaa7b14a6f90cc66807cb5ab65c9d5f03382187d6f42d1b43ce7c554c278ef45a95e2b816a88e93a5b6dbce4986e946e163b5430df26cda950648f83f8e03ab181b1b6a4fffa34d5fca504d6d7b7478e9dd9a6fe624827a0eafa0506f91efb8bae616560acc6126f167a30357748f8da7ab41d7e86aa936b89bb48ffb228e5cdf56333d3a04cb0cb3b25d026a691eaf54e28d6feb500a5b3989b2585c377004aed817c8086687ee4e6731a11749ba42d36ba26ff9cbb371712efa97e577bd0983239693c6167f892b510ea957926c1d731f661beb9ccc9bf62e0a99f3c75c70ec61b2c6e98142028718faef1e2cba",
  "dcId": 1,
  "nextApiId": 2496,
  "dateUpdated": {
    "$date": "2025-08-19T10:17:43.578Z"
  },
  "twoFa": false,
  "twoFaDate": {
    "$date": "2025-08-18T10:47:58.956Z"
  },
  "phone": "+573193166849",
  "banned": false,
  "firstName": "Olga",
  "id": "6966420117",
  "lastName": "Timofeeva",
  "messageCount": 44,
  "personalChannel": "tmnvBSkOJA0zomDc",
  "personalChannelDate": {
    "$date": "2025-04-25T14:31:53.403Z"
  },
  "lazyCheckDate": {
    "$date": "2025-08-18T19:42:19.605Z"
  },
  "automaticCheckDate": {
    "$date": "2025-08-19T10:17:43.578Z"
  },
  "username": "timofeeva_zealous",
  "remainingTime": {
    "$date": "2025-08-19T06:28:22.296Z"
  }
},
{
  "_id": {
    "$oid": "685f07493770b19a27ab200b"
  },
  "accountId": "6971945700-prefix-female-gidrovell",
  "dc1": "0beffdf9159bea458f7d52e3d4cc5fdcde2493fd336639612d3e84af385fcaab1d1ca26fb5330d457b08e2bcdb9376dcabc66b1f152cbfcd91f85606cbf267e20b0c99657b89f16880ead8ca8480813a14cc3f265582b8ed4340bdce3ee81c832f69a162621d3cd101aced692ca5bb016b8c5c0b2c7ab5af2da37b3b471272ff6b7b0d1898417ad1cc8fd0124ce23d7df56fd7411662714c0797f33421d8703ac0edc1a3e4b41b9c49050fd68eb5f6fa046667a951a04781e469777112cd76755a32a4a235e2d7ff775b0bb998ad2b424ae022d960de85339f6931479b4a44b6791bbec3da23fb770ab30f58e21b7486bcace1ac06c35fe749390e6587b44e8e",
  "dcId": 1,
  "nextApiId": 2040,
  "dateUpdated": {
    "$date": "2025-08-19T10:20:42.740Z"
  },
  "twoFa": false,
  "twoFaDate": {
    "$date": "2025-08-18T10:47:42.741Z"
  },
  "phone": "+543516618604",
  "banned": false,
  "firstName": "Rita",
  "id": "6971945700",
  "lastName": "Vasilyeva",
  "messageCount": 30,
  "username": "vasilyeva_desirable",
  "personalChannelDate": {
    "$date": "2025-08-16T21:17:24.366Z"
  },
  "personalChannelError": "CHANNEL_NOT_FOUND",
  "lazyCheckDate": {
    "$date": "2025-08-18T22:47:37.335Z"
  },
  "automaticCheckDate": {
    "$date": "2025-08-19T10:20:42.740Z"
  },
  "remainingTime": {
    "$date": "2025-08-11T12:35:02.136Z"
  }
},
{
  "_id": {
    "$oid": "680b9471461801f599601853"
  },
  "accountId": "6993867496-prefix-female-dmp1",
  "dc1": "65b3e2ac0c13a02ff52b42df3e2f5a68d14ffbc3b6260517cd80253e820cfd878e20b9cbd6a2d52b433a963c552223e76bc701f95db1f106f2ba71b6dd009a5eaaa65c8621cbbfbe002fe21aeb76cdc06271c64afddec9a28dfeff72803e77251b7cd78ef8cb477d656a8bed18fe7680e0988777851525265b58a504ce7a2d68686c48cd39342130590e08cc0bd13903dcf4a629686524286e70fb1030f2b37a673315cbb065d68e40f98c400c62e2c29ca8742b78ac9004decd4bba45e50234ae20e702b0385ef5514d6abfd65de96cda98a83727dfd9e40d4e0b271961a46c0afe4e19a635b04a9677dbd59235eff03a3dfe3ae3fcc03d356d10123c4ab7ca",
  "dcId": 1,
  "nextApiId": 2496,
  "dateUpdated": {
    "$date": "2025-08-19T10:24:44.164Z"
  },
  "twoFa": false,
  "twoFaDate": {
    "$date": "2025-08-18T10:48:07.872Z"
  },
  "phone": "+525653879584",
  "banned": false,
  "firstName": "Vera",
  "id": "6993867496",
  "lastName": "Tarasova",
  "messageCount": 143,
  "personalChannel": "YOLkybk5GmMrCqtI",
  "personalChannelDate": {
    "$date": "2025-04-25T14:32:11.445Z"
  },
  "lazyCheckDate": {
    "$date": "2025-08-18T22:52:56.911Z"
  },
  "automaticCheckDate": {
    "$date": "2025-08-19T10:24:44.164Z"
  },
  "username": "tarasova_soviet",
  "remainingTime": {
    "$date": "2025-08-19T05:04:11.938Z"
  }
},
{
  "_id": {
    "$oid": "683b23e63770b19a277f4819"
  },
  "accountId": "7011053271-prefix-elba",
  "dc2": "6188aa43ad1b8361fd4f89e63a7e1f9a196c4b608017f599e23ba8b9a1f12e53c52dd9e274c08824d0eda9be0855af32e8eb82d5dac65765c50a5efd21c9fbc669fea317821c389478a80adfcffad77d6c9000fece697f108c569c848b7bda171f75afeb0868d99281f00cccfac39570646b1c9cd1d529e87c2f3e40348c23199584b038c05fce8046225f3724d453a195d0cdbbe0515827bc44c4290d6805a4afb521bae4b5a325555cd1977178c74d93a8ee69bbc58d9dc2ca91c80c10b1e3ed870320f6db55390e2f0737e9df5534aea0ecd038c922e88de47e85439c04655434e536636ad7e4683f9aca5ac0c6d43b335709d2b9ab0f7c5016b01e78829e",
  "dcId": 2,
  "nextApiId": 2040,
  "dateUpdated": {
    "$date": "2025-08-19T10:23:23.187Z"
  },
  "twoFa": false,
  "twoFaDate": {
    "$date": "2025-08-18T00:42:36.352Z"
  },
  "phone": "+994707304666",
  "banned": false,
  "firstName": "Mikhail",
  "id": "7011053271",
  "lastName": "Shumilov",
  "messageCount": 23,
  "username": "shumilov_liberal",
  "personalChannel": "dirSCicqzvqguDX9",
  "personalChannelDate": {
    "$date": "2025-05-31T16:34:22.637Z"
  },
  "lazyCheckDate": {
    "$date": "2025-08-18T22:43:05.613Z"
  },
  "automaticCheckDate": {
    "$date": "2025-08-19T10:23:23.187Z"
  },
  "remainingTime": {
    "$date": "2025-08-11T16:26:58.297Z"
  }
},
{
  "_id": {
    "$oid": "680b946f461801f59960181b"
  },
  "accountId": "7018078040-prefix-female-dmp1",
  "dc1": "901d651259596b5e0ed7bc3281f6baae98d7d01af70d8e924655844114424277b46c36771a922cb900089961740305fbc68358603c8901c0aa7b3e3217a0a6b96e5ebdca418095eaad37bef62c39687a6b32318118cb4e96b36d731c961c46d8ab2ce1ccdb80ad23aa8483a06eb163e9b026a6077bdcee010bc72de6089a7e06ab965646dd6327ddb607dc3d8c37a5bd29a7b1a7411536028fcdf09517a19bbc7f0481293b572750c769c8e489d25529197987afd6feef2bda6756cc99078c371dbe11f25cb20c7707d039d8aaa1afe95f8964da5243f88346afc865ef060c1bdb7c308a4f6ce975774de977d0c6cb033ff28dcad70527a12ce8638a2045e88b",
  "dcId": 1,
  "nextApiId": 2496,
  "dateUpdated": {
    "$date": "2025-08-19T10:19:44.462Z"
  },
  "twoFa": false,
  "twoFaDate": {
    "$date": "2025-08-18T10:48:07.868Z"
  },
  "phone": "+541162789780",
  "banned": false,
  "firstName": "Olga",
  "id": "7018078040",
  "lastName": "Martynova",
  "messageCount": 139,
  "personalChannel": "KacHDzwp3zDDyzhc",
  "personalChannelDate": {
    "$date": "2025-04-25T14:33:22.496Z"
  },
  "lazyCheckDate": {
    "$date": "2025-08-18T14:22:07.054Z"
  },
  "automaticCheckDate": {
    "$date": "2025-08-19T10:19:44.462Z"
  },
  "username": "martynova_mutual",
  "remainingTime": {
    "$date": "2025-08-19T09:04:41.761Z"
  }
},
{
  "_id": {
    "$oid": "680b946c461801f59960174f"
  },
  "accountId": "7029949007-prefix-female-dmp1",
  "dc1": "a048040639f4a97c7b0ae748140d7a42753ca40e51effc1ff450d04d324e6d22d672caf1e1cd353463e9f3bcec800a18ca3f2885c5312b97d15799733df70f7904f0e2cd0d012d5a2997411a7aeafce125da9635546956559683d7a1681d557a350d2b3afdd77a4f3f32f4fb83e15da4080ba99b6a94cba27377597974c1ca274dc51d718bc707e257002af5a206ae124ee1086180a61fc90289af415f073d10e2977263221ffa0134822ec2d662e273ac849a9e32afccb9d8778b08fef53674dada12dfd62b6b79f45c4b809f5ba992faa28c7165c5f64d896a69d5dfa79c62011541c3fee1b1f1f33f25a60cd47903bce65f2afd64a7b55d8780a9da347fe5",
  "dcId": 1,
  "nextApiId": 2496,
  "dateUpdated": {
    "$date": "2025-08-19T10:26:44.904Z"
  },
  "twoFa": false,
  "twoFaDate": {
    "$date": "2025-08-18T10:47:58.958Z"
  },
  "phone": "+573044680427",
  "banned": false,
  "firstName": "Marina",
  "id": "7029949007",
  "lastName": "Markova",
  "messageCount": 46,
  "personalChannel": "pZZCdC9LOYxKfyhv",
  "personalChannelDate": {
    "$date": "2025-04-25T14:32:06.958Z"
  },
  "lazyCheckDate": {
    "$date": "2025-08-18T14:05:52.480Z"
  },
  "automaticCheckDate": {
    "$date": "2025-08-19T10:26:44.904Z"
  },
  "username": "markova_marxist",
  "remainingTime": {
    "$date": "2025-08-19T06:25:48.977Z"
  },
  "historySpamBlocks": [
    {
      "spamBlockDate": "INFINITY",
      "spamBlockDays": 0
    }
  ]
},
{
  "_id": {
    "$oid": "680b946c461801f59960172d"
  },
  "accountId": "7035009506-prefix-female-dmp1",
  "dc1": "a295fcd0dd160529c24effca50955bba61d24346e0fb519757bda980060f17ad88e2603ae01cecef74fd0421fc2c8dc3e8766e434ea1b7fc3d24d5993b07797fa41602de1c06698c6de2e94892bbe2a13d671ffdc9c571bc0f6fe7cbd0539d135fa672edf7c4a84e91f549a4a2dffd82c7a3156f8a038963c0c012970b3867b1963a3efeb7b1b7aa97210568476fe35e298c027d54f0df15a0ecea10d0d8fccbb9997687b0f7d53fb07bac60c9ce50fac8abb34034fd732f597d8f9cbf1314a411c20a02c1b608e00a5e979b035587c480a0a51252ff491d519452a46405dab0d8bb5a8f9447407104815374f17d8e1d3cae62789efda6a3701d6f5fce2f39d5",
  "dcId": 1,
  "nextApiId": 2496,
  "dateUpdated": {
    "$date": "2025-08-19T10:29:42.997Z"
  },
  "twoFa": false,
  "twoFaDate": {
    "$date": "2025-08-18T10:47:59.342Z"
  },
  "phone": "+541171184644",
  "banned": false,
  "firstName": "Alisa",
  "id": "7035009506",
  "lastName": "Lazareva",
  "messageCount": 91,
  "personalChannel": "Bkbtnk8ZRiBuslkO",
  "personalChannelDate": {
    "$date": "2025-04-25T14:34:28.272Z"
  },
  "lazyCheckDate": {
    "$date": "2025-08-18T14:47:31.849Z"
  },
  "automaticCheckDate": {
    "$date": "2025-08-19T10:29:42.997Z"
  },
  "username": "lazareva_empirical",
  "remainingTime": {
    "$date": "2025-08-19T11:11:27.700Z"
  },
  "historySpamBlocks": [
    {
      "spamBlockDate": {
        "$date": "2025-06-21T09:48:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-07-08T05:49:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-07-06T18:24:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-08-11T06:26:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-08-09T16:43:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-08-13T18:44:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-08-21T04:11:00.000Z"
      },
      "spamBlockDays": 7
    },
    {
      "spamBlockDate": {
        "$date": "2025-08-16T05:38:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-08-19T08:17:00.000Z"
      },
      "spamBlockDays": 3
    }
  ]
},
{
  "_id": {
    "$oid": "685f07513770b19a27ab2278"
  },
  "accountId": "7067801473-prefix-female-gidrovell",
  "dc1": "5a83cd953dea9fbe6a93e3f6bf11ab72de1c874ef8f5e1871345d7addb12008375287c4d1532b560de0992d4f42b5511f030136687a5fbe40169977eed14645fa82dbd8a754c908c54140ea3dae19e1570886c341188fdd3fbd09d736b96ce53faf0b5659b3c57e59b2c0abfb7dc4c2277d81ce06b1487982dad288f80c276bdfd6377d1baadf58e9602483bd1b00a7e3cac3c3206de9d537c4338783c71b9ccaeef0cb896fbd4b7dad157651b9b414b1b009fb2ba6c0e2ec86f15606f0d12c4308180e98d2810447ae265b3bab7b140c5592ee74b6921896f50afacee4239e4c33e176997b66b815e2878aca01b72d403d2acf9f63c0389456ff2914e078ce2",
  "dcId": 1,
  "nextApiId": 2040,
  "dateUpdated": {
    "$date": "2025-08-19T10:31:29.014Z"
  },
  "twoFa": false,
  "twoFaDate": {
    "$date": "2025-08-18T10:47:39.587Z"
  },
  "phone": "+523328312327",
  "banned": false,
  "firstName": "Evgenia",
  "id": "7067801473",
  "lastName": "Eroshkina",
  "messageCount": 28,
  "username": "eroshkina_marginal",
  "personalChannelDate": {
    "$date": "2025-08-16T21:17:17.190Z"
  },
  "personalChannelError": "CHANNEL_NOT_FOUND",
  "lazyCheckDate": {
    "$date": "2025-08-18T20:48:24.249Z"
  },
  "automaticCheckDate": {
    "$date": "2025-08-19T10:31:29.014Z"
  },
  "remainingTime": {
    "$date": "2025-08-05T13:58:11.846Z"
  }
},
{
  "_id": {
    "$oid": "685f07483770b19a27ab1fd9"
  },
  "accountId": "7096500829-prefix-female-gidrovell",
  "dc1": "19d217e14b695f29c401aa1b7850818e3925ee29ba6ca562e4518d81d5aa950b468b839fa92335e8a7c90c6e615ab3ec7fd3dd9e73391c89442003eb56a804cc72bad020981f88592e85ddb96bc20a5182e414b5b17548346c3186984a07c513e4b37a8fe779e650fa6d06de40714c95fb08707ca20895dc180e60de7ba18a19f3f7ac89a56e310ddf4abd4fd879753fe7b467d23341f97478175a6ab590d84966bca313db74b91efeeafb3672edf3ed7a6d75a3ac8ab12fd6e276dc1fe706e7cec2c80480922ee1b032e59e1464e3914e456749f78fae6ed09a5007ba95b4fccec893d0ee0857bb6fef8ad9ea4f672d9b9c0d46e3abf8cb6b8bd13ecce8974f",
  "dcId": 1,
  "nextApiId": 2040,
  "dateUpdated": {
    "$date": "2025-08-19T10:31:42.780Z"
  },
  "twoFa": false,
  "twoFaDate": {
    "$date": "2025-08-18T10:47:40.802Z"
  },
  "phone": "+541132374250",
  "banned": false,
  "firstName": "Maria",
  "id": "7096500829",
  "lastName": "Alekseeva",
  "messageCount": 29,
  "username": "alekseeva_gray",
  "personalChannelDate": {
    "$date": "2025-08-16T21:17:24.165Z"
  },
  "personalChannelError": "CHANNEL_NOT_FOUND",
  "lazyCheckDate": {
    "$date": "2025-08-18T18:35:14.660Z"
  },
  "automaticCheckDate": {
    "$date": "2025-08-19T10:31:42.780Z"
  },
  "remainingTime": {
    "$date": "2025-08-11T12:05:32.349Z"
  }
},
{
  "_id": {
    "$oid": "683b23e73770b19a277f4890"
  },
  "accountId": "7098223726-prefix-elba",
  "dc1": "85f7f36230472363ac12bac37c05965ac7dee0016cb662dd623c611f864fb7b7b8c861f3e3f0341840daed445cdcb28809c6335fd62fa2974f52fc70f2818067b3365841caf7d6a181ef09da6d7c9710c84103867815666124546a2c2af72714523239c823373c5c31567f8889e96f5c70201d96ab1f4d2ec686bc17b6fcb9b2c84764ba5ba93b469642698458d7f6be7edb9bf9bc7313a7e6c527e1d68dbf76bcebe263f19a9a385cdf13410494bdbb8a4233b9f58e56a9a80f211164a85546e558f3767f5ffad96c615d793e137e14f16d7b6dca5cc139776708224beda8a84dbb4d6f747174d17268bee008b909116ec8ee2f6c09c5f0daa70c08eea1bd5e",
  "dcId": 1,
  "nextApiId": 2040,
  "dateUpdated": {
    "$date": "2025-08-19T10:28:23.135Z"
  },
  "twoFa": false,
  "twoFaDate": {
    "$date": "2025-08-18T00:42:41.209Z"
  },
  "phone": "+573106741485",
  "banned": false,
  "firstName": "Timofey",
  "id": "7098223726",
  "lastName": "Kozlov",
  "messageCount": 5,
  "username": "kozlov_tame",
  "personalChannel": "LekzZwfrNc2MbKOy",
  "personalChannelDate": {
    "$date": "2025-05-31T16:34:32.922Z"
  },
  "lazyCheckDate": {
    "$date": "2025-08-18T22:21:29.590Z"
  },
  "automaticCheckDate": {
    "$date": "2025-08-19T10:28:23.135Z"
  },
  "remainingTime": {
    "$date": "2025-08-11T11:01:23.183Z"
  }
},
{
  "_id": {
    "$oid": "683b23d73770b19a277f4374"
  },
  "accountId": "7104762188-prefix-elba",
  "dc5": "1cc4b6ac537aaca4ec16388735f0789342800d6dffd589528f2b0b7b95004ac9a03148947b5c624f4499f3e28f15b111866e3dab5afa5435c8f027646f6444d1b2f00f0a0ea897f04de9fb33ac86a3d1332ddeb21e9e4fc8617a9d98455ef0c18a30903b5d111a4ad8bd50d1172d6e0a75190872f23eeabd21402b651044d57cd071e98b1f89a103e704cee82eb2b15bda13744c4efd1a3fb8e86dbd625eb1a670cf6c57e7aafda44dd44fcdb9c3ad47b3d30775da65e917de10842f3403ac3115d2024c7e54b454d060a3fe6e6e9ccb7f7502eadb38416c1783bae3f85d83a9c7948168d9bfb73ec3d524accf1a81d7f3b25b64a054d57a2b64c51402974743",
  "dcId": 5,
  "nextApiId": 2040,
  "dateUpdated": {
    "$date": "2025-08-19T10:18:24.036Z"
  },
  "twoFa": false,
  "twoFaDate": {
    "$date": "2025-08-18T00:42:29.153Z"
  },
  "phone": "+6281234508740",
  "banned": false,
  "firstName": "Stepan",
  "id": "7104762188",
  "lastName": "Nikitin",
  "messageCount": 13,
  "username": "nikitin_fun",
  "personalChannel": "mQrib7GUqtbdbhAv",
  "personalChannelDate": {
    "$date": "2025-05-31T16:33:13.745Z"
  },
  "lazyCheckDate": {
    "$date": "2025-08-18T16:27:14.905Z"
  },
  "automaticCheckDate": {
    "$date": "2025-08-19T10:18:24.036Z"
  },
  "remainingTime": {
    "$date": "2025-08-11T16:24:10.238Z"
  }
},
{
  "_id": {
    "$oid": "685f074f3770b19a27ab2214"
  },
  "accountId": "7131765454-prefix-female-gidrovell",
  "dc1": "b103e22a8f0371a39fea990de822692a97d3425b85edd261d45d1476ba3bbc9bf84951c61ad270d285ba024987d1c5d1de4329b33658e1c0e1395e564604e5c52fe3ef20c8117f78bb2abc96ceb3e17151f7c812b567cafbb13d6a3f5c1efb85a632ef134d59305407ef386bc513d1c2246ae7fc3d5d0fa99ec4053b41d424f8b0d93d7d565fae496f12926d8741ec61dccecc358b744fac945615eac0d083c5403bf7b4a4b340aa8424b2d6e32b24fdf4828d80410fedf1a10299491e9da8ee440987f3d81cb5d414eaee2d22689c5bb3a6e0366bc6b29eb5b77ebe5eb56305fc0c48b327a5380f360220595c6165b560d2ceca25109632c5f75b2ec306fc05",
  "dcId": 1,
  "nextApiId": 2040,
  "dateUpdated": {
    "$date": "2025-08-19T10:12:27.766Z"
  },
  "twoFa": false,
  "twoFaDate": {
    "$date": "2025-08-18T10:48:06.962Z"
  },
  "phone": "+529141403687",
  "banned": false,
  "firstName": "Olga",
  "id": "7131765454",
  "lastName": "Morozova",
  "messageCount": 22,
  "username": "morozova_difficult",
  "personalChannelDate": {
    "$date": "2025-08-16T21:17:20.308Z"
  },
  "personalChannelError": "CHANNEL_NOT_FOUND",
  "lazyCheckDate": {
    "$date": "2025-08-18T18:29:28.622Z"
  },
  "automaticCheckDate": {
    "$date": "2025-08-19T10:12:27.766Z"
  },
  "remainingTime": {
    "$date": "2025-08-06T14:13:12.488Z"
  }
},
{
  "_id": {
    "$oid": "680b9471461801f59960186d"
  },
  "accountId": "7138926942-prefix-female-dmp1",
  "dc1": "434f3a131e5b10a6d2824fa31fc23d18e313571d2611522f952614f4665d35b92bc3aef498dc1a149070636582a1ce029fee1a167dd8787b848dcc942f26251c21bb0c48aebd509d69e038f290c537b29424f8514e9f3bf417e1979cc6360e98c90e11fdbd92dbee2a0eeec2a52ac262f01ea5f76c0136ab7c423426708082859695dd3d1a13f783503f9647ec24cd6f62f5cb51b0e694fecea9a516a574fccf5ae1723b40bb48f2909284716f2d6101c59077178e66ef2d42518ee8a8147ff06f9eb167519cf4fb980b25a2b042cf6654a96111b49d3e849470868d97d94d080096f8cd526c6a637901433d56d1aec2e6728c1ddb7abe4c421fd49a11c0decc",
  "dcId": 1,
  "nextApiId": 2496,
  "dateUpdated": {
    "$date": "2025-08-19T10:25:44.194Z"
  },
  "twoFa": false,
  "twoFaDate": {
    "$date": "2025-08-18T10:48:05.926Z"
  },
  "phone": "+541134826510",
  "banned": false,
  "firstName": "Margarita",
  "id": "7138926942",
  "lastName": "Mozharova",
  "messageCount": 139,
  "personalChannel": "eocNzUxLD9oRwbui",
  "personalChannelDate": {
    "$date": "2025-04-25T14:33:23.659Z"
  },
  "lazyCheckDate": {
    "$date": "2025-08-18T14:23:05.228Z"
  },
  "automaticCheckDate": {
    "$date": "2025-08-19T10:25:44.194Z"
  },
  "username": "mozharova_innocent",
  "remainingTime": {
    "$date": "2025-08-19T04:44:27.709Z"
  },
  "historySpamBlocks": [
    {
      "spamBlockDate": {
        "$date": "2025-04-28T15:11:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-06-21T10:41:00.000Z"
      },
      "spamBlockDays": 1
    }
  ]
},
{
  "_id": {
    "$oid": "685f07503770b19a27ab223e"
  },
  "accountId": "7145555852-prefix-female-gidrovell",
  "dc1": "62e2592d59d2422ee33e3c0bbb1d21295a286beb367efc64c1abfdecb88ee8b14cda605de25b18564ba83c068484670b3d52f96f88334934517e4266185e446cb3ec0d98128293a3bf10e0dedd45bc2103dd31f92ab5bed95fbe504237dcc825a680e79a861c66839898fc51a92d94b77fe5e8972eaaf4941062ed70ec69df3a7c7995ae899784b62d92bb0858836413b05f293d00f53788ee2550d977dbc5469c594260110b1d6768b575550f7da5acbe4be540665cea8c8f96317eb770b4a0387f2b56c21f386b8d2d91a59909f99b00495cad333ca7e66b814d58fd3cf11c07a5959ab42478078f3eb5b172b160ac61cf938b4b57e13c7921042b832f7307",
  "dcId": 1,
  "nextApiId": 2040,
  "dateUpdated": {
    "$date": "2025-08-19T10:14:27.808Z"
  },
  "twoFa": false,
  "twoFaDate": {
    "$date": "2025-08-18T10:48:01.384Z"
  },
  "phone": "+528714713870",
  "banned": false,
  "firstName": "Darina",
  "id": "7145555852",
  "lastName": "Semenova",
  "messageCount": 35,
  "username": "semenova_red",
  "personalChannelDate": {
    "$date": "2025-08-16T21:17:20.220Z"
  },
  "personalChannelError": "CHANNEL_NOT_FOUND",
  "lazyCheckDate": {
    "$date": "2025-08-18T22:21:29.058Z"
  },
  "automaticCheckDate": {
    "$date": "2025-08-19T10:14:27.808Z"
  },
  "remainingTime": {
    "$date": "2025-08-11T12:33:39.884Z"
  }
},
{
  "_id": {
    "$oid": "685f07493770b19a27ab1ffa"
  },
  "accountId": "7175447912-prefix-female-gidrovell",
  "dc1": "7033b48c5a485881f92ff60313d62102e46ce1a3c3c45569d825883e66913bcd91cbcfc09a4e7bb814941cca5a9b564aeb3ebb04f472d89d5e0d3f15ea458d4432e802f6cf36de2eb96a1da7434f19a764aac6886d2ef75a0a4b4a88ed1de29b945ecddee573c0d6188e28be7ddaccc00005b467f3b9a267893f248a2a4f13f966d97369c8d69307ba691979b88abf2a2468234424cfa1ee33b008338f7bb6739518353a3007945ef027fa175c48a14b86653453812bd9061c6cf4e78d15a4d1d296f203698f493c8289e68ebbe5faeaa0618f84e47631be89d5df03d03b60f44f695ad1dcd49d6e98d1ca66b115c649f45f7191975231cd8926274437fa1371",
  "dcId": 1,
  "nextApiId": 2040,
  "dateUpdated": {
    "$date": "2025-08-19T10:22:42.611Z"
  },
  "twoFa": false,
  "twoFaDate": {
    "$date": "2025-08-18T10:47:42.714Z"
  },
  "phone": "+543794551624",
  "banned": false,
  "firstName": "Olga",
  "id": "7175447912",
  "lastName": "Efimova",
  "messageCount": 24,
  "username": "efimova_silver",
  "personalChannelDate": {
    "$date": "2025-08-16T21:17:22.009Z"
  },
  "personalChannelError": "CHANNEL_NOT_FOUND",
  "lazyCheckDate": {
    "$date": "2025-08-18T21:20:07.121Z"
  },
  "automaticCheckDate": {
    "$date": "2025-08-19T10:22:42.611Z"
  },
  "remainingTime": {
    "$date": "2025-08-01T11:24:08.421Z"
  }
},
{
  "_id": {
    "$oid": "685f074a3770b19a27ab202c"
  },
  "accountId": "7178037748-prefix-female-gidrovell",
  "dc1": "5474c563afe8b067080dc741d7f0374fc1e4a3167e4c179cd2acb9c6dfa3fb31cfc51daddccbf72dfa4d97955e0c8c74f971da7707a40c057d6ec36c263a2bbfe0fd5805724ab6371e4a4b707d6868f6d8f554a864b61d5cc9907310d494e09bd524c29ff79b28387a3d53cdae8cfff0ecb28811c6a24a24c8052e1e2298ed0d37f91f08fd02c585bf7b9793ac4539e774531faed775886205046d88ffe2a5f6478abb781517c25616c9a14bed430252d634047e3cff92bf6fd084c5d2847f9404f77518485a8c1a8a8145dc190dd32c89df2fe73cf5cbc4fcff572752480a51700de6af855c9fb6f9ef9cd4554214f5011e00cac621dbb2fceb77cd2114d2b7",
  "dcId": 1,
  "nextApiId": 2040,
  "dateUpdated": {
    "$date": "2025-08-19T10:28:43.406Z"
  },
  "twoFa": false,
  "twoFaDate": {
    "$date": "2025-08-18T10:47:51.225Z"
  },
  "phone": "+541168592438",
  "banned": false,
  "firstName": "Evgenia",
  "id": "7178037748",
  "lastName": "Dorofeeva",
  "messageCount": 29,
  "username": "dorofeeva_bloody",
  "personalChannelDate": {
    "$date": "2025-08-16T21:17:04.957Z"
  },
  "personalChannelError": "CHANNEL_NOT_FOUND",
  "lazyCheckDate": {
    "$date": "2025-08-18T19:45:40.066Z"
  },
  "automaticCheckDate": {
    "$date": "2025-08-19T10:28:43.406Z"
  },
  "remainingTime": {
    "$date": "2025-08-11T12:27:00.344Z"
  }
},
{
  "_id": {
    "$oid": "685f074e3770b19a27ab21c9"
  },
  "accountId": "7185075318-prefix-female-gidrovell",
  "dc1": "c1621b823a6fd5e7d1ae46090c2b71641ecbd1d9eb3b7c88bf6784224d2fe7122133f90ac0955e16a7d23d22223ec7ef0e826668b8926658fed63f5f480a75b9ca1608080d3148ab4bda8d4d1db09a059c4656461b02092cb2fc0b92cb5bb0fd1c2d6a6d52068a1c53dc99e0ffae9d6a0415cbcaa4ab7373df36588b60014b0b48c8261aa88df44bdd4453689a877e8b3fb1633b8759ea2dac89e8b93a8778f11715d19a5ae841e918c9aca403143941093f4d73c954acedc10b49cfb44ed40a086e426bf6c138777608013d5a02a06b104adfd22212c8d7869f80f9f71b9fffb50bf667b26a9ea5f28f967df19917f05b3bff617280db5c4e886a0a4c6eba76",
  "dcId": 1,
  "nextApiId": 2040,
  "dateUpdated": {
    "$date": "2025-08-19T10:26:23.841Z"
  },
  "twoFa": false,
  "twoFaDate": {
    "$date": "2025-08-18T10:47:56.705Z"
  },
  "phone": "+525574964164",
  "banned": false,
  "firstName": "Svetlana",
  "id": "7185075318",
  "lastName": "Lazareva",
  "messageCount": 29,
  "username": "lazareva_public",
  "personalChannelDate": {
    "$date": "2025-08-16T21:17:20.016Z"
  },
  "personalChannelError": "CHANNEL_NOT_FOUND",
  "lazyCheckDate": {
    "$date": "2025-08-18T21:28:11.599Z"
  },
  "automaticCheckDate": {
    "$date": "2025-08-19T10:26:23.841Z"
  },
  "remainingTime": {
    "$date": "2025-08-11T12:06:02.833Z"
  },
  "historySpamBlocks": [
    {
      "spamBlockDate": {
        "$date": "2025-08-12T10:29:00.000Z"
      },
      "spamBlockDays": 1
    }
  ]
},
{
  "_id": {
    "$oid": "685f07473770b19a27ab1f5e"
  },
  "accountId": "7190176768-prefix-female-gidrovell",
  "dc1": "30a74b5da9e79c474d3964e51cc796b3f928f0026d10c35566c7bf25770e16d05787c3d56871e6ab768e9f53e44a85eb19b497acda95c6bd5cfed7a52003e670df1ba41268fad4ac857b9741bcd9d3db14a38165c74eb54aae7d5c53bef8f2a429bdc9ffa03439274cc1f7738d7c802faf0fc6959be8db64853e8be076839e2a2538401c0de38494aec66606a062c1ca9466b237387eae30aa21442bdbcf4d86910d3857f3010283f8a83c9677d2e6f33061e5bb4151ac75ac6042106b8e3682b955b28ccf275bd460a6664ca090f71cc788819f1b674a25892fa40a240ed9be091cf014364a7bbd5511d07f3ae95aa2f70bfe0a97552fb36363d963518bf98b",
  "dcId": 1,
  "nextApiId": 2040,
  "dateUpdated": {
    "$date": "2025-08-19T10:34:42.342Z"
  },
  "twoFa": false,
  "twoFaDate": {
    "$date": "2025-08-18T10:47:40.154Z"
  },
  "phone": "+543775416048",
  "banned": false,
  "firstName": "Evgenia",
  "id": "7190176768",
  "lastName": "Lapshina",
  "messageCount": 31,
  "username": "lapshina_content",
  "personalChannelDate": {
    "$date": "2025-08-16T21:17:21.828Z"
  },
  "personalChannelError": "CHANNEL_NOT_FOUND",
  "lazyCheckDate": {
    "$date": "2025-08-18T22:01:35.682Z"
  },
  "automaticCheckDate": {
    "$date": "2025-08-19T10:34:42.342Z"
  },
  "remainingTime": {
    "$date": "2025-08-11T12:29:15.908Z"
  }
},
{
  "_id": {
    "$oid": "685f07503770b19a27ab2252"
  },
  "accountId": "7203197366-prefix-female-gidrovell",
  "dc1": "bd78868acda3462c800e28dd93b61bae163579d0fed7f01cce3b5c3280994d70aa45ef9ca52b4eb60c6bcf8164758d9c09af7d7327da52fb4dc42c490371eefeebc27df617042da664af39b3b20b1743bc27e4c70dad9c0e3db4e620c7bcda5ddc9162973cb526e113bec2da202dded9ac96d62d2c5180c68bf0eb746a3c3dc00adb6bc1602e6d606b87533867de7b41cc88182f9de58b79cdc0a0429f89a557a65818e1c94ae3725f161590993ea69a7adf261749d08eb217695ed61b7689a95dca54a95661be216e10a608a6859ba757ae124b1ed0999b6c8f201b38f7fb45f1cc6d45b7d5664eb1b859f2c48ff9109d8da3edfdd77408b5988b0560c015eb",
  "dcId": 1,
  "nextApiId": 2040,
  "dateUpdated": {
    "$date": "2025-08-19T10:37:29.017Z"
  },
  "twoFa": false,
  "twoFaDate": {
    "$date": "2025-08-18T10:48:04.062Z"
  },
  "phone": "+525527949709",
  "banned": false,
  "firstName": "Arina",
  "id": "7203197366",
  "lastName": "Smirnova",
  "messageCount": 32,
  "username": "smirnova_filthy",
  "personalChannelDate": {
    "$date": "2025-08-16T21:17:19.953Z"
  },
  "personalChannelError": "CHANNEL_NOT_FOUND",
  "lazyCheckDate": {
    "$date": "2025-08-18T19:01:17.557Z"
  },
  "automaticCheckDate": {
    "$date": "2025-08-19T10:37:29.017Z"
  },
  "remainingTime": {
    "$date": "2025-08-11T12:08:40.625Z"
  }
},
{
  "_id": {
    "$oid": "685f074e3770b19a27ab21ea"
  },
  "accountId": "7229709512-prefix-female-gidrovell",
  "dc1": "82622f2b80f445de555d0c3fc10b140c37f25b2f48b9d00395bb581794f122d51be4c81bb151202185c57fde7ad629d46b8df21766b56466cda248b30db7fba0eb75a29de0f35db4dfc406082c3e65b905b8a7bba3cfb879917f2b0c0c0db973aa010240404f0b874fa6b531ddfb58ff5233561f9cd3eef3b1d95c900990b48a0a5befd8aced0ea3d970a3b8421c4056d620b006497a6a66557131fff7a6af6abe685b9e37837c141878bc95a5beca449866a61cdc88ea975ffdf88dd5a9b7b62a1a1b4e8460a9e1cdb7c3f83799d396851a14b8398ca1602f7851d5672df270420acda4580a28fc71b5df3e8aedaed8218c5f14cba259b46bce9230d6d9738e",
  "dcId": 1,
  "nextApiId": 2040,
  "dateUpdated": {
    "$date": "2025-08-19T10:15:29.068Z"
  },
  "twoFa": false,
  "twoFaDate": {
    "$date": "2025-08-18T10:48:02.653Z"
  },
  "phone": "+526462475174",
  "banned": false,
  "firstName": "Raisa",
  "id": "7229709512",
  "lastName": "Lobanova",
  "messageCount": 28,
  "username": "lobanova_key",
  "personalChannelDate": {
    "$date": "2025-08-16T21:17:16.825Z"
  },
  "personalChannelError": "CHANNEL_NOT_FOUND",
  "lazyCheckDate": {
    "$date": "2025-08-18T23:52:23.115Z"
  },
  "automaticCheckDate": {
    "$date": "2025-08-19T10:15:29.068Z"
  },
  "remainingTime": {
    "$date": "2025-08-11T12:06:59.440Z"
  }
},
{
  "_id": {
    "$oid": "685f074f3770b19a27ab2210"
  },
  "accountId": "7231063206-prefix-female-gidrovell",
  "dc1": "6a58c453757c14b81190fe0bfb1fc41ffa179b2af3ff87b14cc57a5047a5bb4d7dda31efc8a4ff679b6bca63d432a048def3de084551a350b5f59dde41a766c8c21a4eb992a878a802e139da02f7d46aa5c0ba6f4fadf017d7116639f4cd440514006dc17f0868ff73232ddeca3537c60fb9c6a19ac285e884eb790dee5a278312bcea5223e2558cd070ec318c734a28d80f7b14f758e504a61baf007a9984dda0751026b698a9fe674ab127554b885b877fc8c92a9c84c6c774626c372e21069b5b6ad4b395b895d83477074367c3954dc44fd5de7f268211151c0376373d831517cffdce66c29962f7ff2f547667400681bef353b4201fbb58e49a5ee5b3bb",
  "dcId": 1,
  "nextApiId": 2040,
  "dateUpdated": {
    "$date": "2025-08-19T10:29:25.248Z"
  },
  "twoFa": false,
  "twoFaDate": {
    "$date": "2025-08-18T10:48:06.972Z"
  },
  "phone": "+529993250994",
  "banned": false,
  "firstName": "Liza",
  "id": "7231063206",
  "lastName": "Petrova",
  "messageCount": 32,
  "username": "petrova_elated",
  "personalChannelDate": {
    "$date": "2025-08-16T21:17:17.010Z"
  },
  "personalChannelError": "CHANNEL_NOT_FOUND",
  "lazyCheckDate": {
    "$date": "2025-08-18T21:26:12.108Z"
  },
  "automaticCheckDate": {
    "$date": "2025-08-19T10:29:25.248Z"
  },
  "remainingTime": {
    "$date": "2025-08-11T12:36:36.705Z"
  }
},
{
  "_id": {
    "$oid": "685f074e3770b19a27ab21f4"
  },
  "accountId": "7239779767-prefix-female-gidrovell",
  "dc1": "850799adb44aa764b72b52dc43c51ed62228329c2c5824b8e7f26a7d502395dfc392b0dacdcc1479bfa01568cd846712893c7c910daf36eceb8632356807e3bc53647b58cc76f4dcb4c26fb494a8fbd62323bd86824193141268a0af6c39586124e7d842c65a5aa91dcfb274991d5e6fc9a2df8ce5b9ef72708ea6b1934c9e0e6caa2a0719f6be1a341bfcc6fb10f72739f94bf95747a2b727a4a7a8e51f61701f911c2abbea2fd6d08d84b8df3f85beabe49253136a4f0741f8052782f87d4e5776f316590cf725fbda20d1f490fc947f3f4681c1c375530902a84a49a0d9e7bd29afc4656ade46f5d04be39f8bafee17c14eaef8d9a51ea7aacb2c4e62bbf7",
  "dcId": 1,
  "nextApiId": 2040,
  "dateUpdated": {
    "$date": "2025-08-19T10:15:27.929Z"
  },
  "twoFa": false,
  "twoFaDate": {
    "$date": "2025-08-18T10:48:00.109Z"
  },
  "phone": "+523337049447",
  "banned": false,
  "firstName": "Ekaterina",
  "id": "7239779767",
  "lastName": "Kazmina",
  "messageCount": 27,
  "username": "kazmina_bad",
  "personalChannelDate": {
    "$date": "2025-08-16T21:17:20.280Z"
  },
  "personalChannelError": "CHANNEL_NOT_FOUND",
  "lazyCheckDate": {
    "$date": "2025-08-18T21:19:12.433Z"
  },
  "automaticCheckDate": {
    "$date": "2025-08-19T10:15:27.929Z"
  },
  "remainingTime": {
    "$date": "2025-08-11T12:37:07.141Z"
  }
},
{
  "_id": {
    "$oid": "685f07503770b19a27ab224b"
  },
  "accountId": "7240987599-prefix-female-gidrovell",
  "dc1": "8a76252dee2b90de16d087d50926e1691847b6af18d228357190f03d41963a75427f809a4240fc02dfce3376a1e89004d5fc6d45f603fce0fde22204b90bcf9e1570f88fbf4ed1bcfbb7b12b6e18df2c494c8d8efa3f4371e4b3072af25fe295bff2bfbc2b6b00f34541715f67b1a143eba2054d59662f38384df11761699b63494dead787c2dfadd2a972d6f868c8a25202596a1e9fc7d0ba3a4c514a2b3cc9c55c10d076e8623c716c024fe285d1519875721d78745fd2e342eaab3bfb49dc04c6f3c08ef1c404d91e6ebe7445d6abfe6253ff52f88d3394dd9721e092ec1da7b6a889ba3a33d56dd6f46e38ed85de555713c3b2fe5e6cb58eade5020f8e63",
  "dcId": 1,
  "nextApiId": 2040,
  "dateUpdated": {
    "$date": "2025-08-19T10:38:29.159Z"
  },
  "twoFa": false,
  "twoFaDate": {
    "$date": "2025-08-18T10:48:02.651Z"
  },
  "phone": "+524121895320",
  "banned": false,
  "firstName": "Valeria",
  "id": "7240987599",
  "lastName": "Lazareva",
  "messageCount": 29,
  "username": "lazareva_superior",
  "personalChannelDate": {
    "$date": "2025-08-16T21:17:17.741Z"
  },
  "personalChannelError": "CHANNEL_NOT_FOUND",
  "lazyCheckDate": {
    "$date": "2025-08-18T21:32:12.897Z"
  },
  "automaticCheckDate": {
    "$date": "2025-08-19T10:38:29.159Z"
  },
  "remainingTime": {
    "$date": "2025-08-11T12:33:00.475Z"
  }
},
{
  "_id": {
    "$oid": "685f07503770b19a27ab2244"
  },
  "accountId": "7293991818-prefix-female-gidrovell",
  "dc1": "2e4eb7297a35677f0f0bb0e93ca5aed967163506fa6af462314a19ac227ad999d18e421f1c3d9d398df9942710d0239084883f0a335c2f3a615eddc08fe221373671710e8c15ee3a74ddd5b8e241a1fc60025fe0d13020731ffa021f6d01aad85d33f747ec828bafd8834d5fac6f2f3dac532deac1dec97daf4c97bf6d04e774b0dc242f50ce0ab44848fa88839a181c5e3c38366e2b53894aa720caac2a034124fcb1a8f1639526e88755004d83bfc414067350cfe4263a32580e2b44387fb50e951a5fdc6b7314b4432db41c2d3b194a16db0c1a2eb8cdac4ddb1aaea64636ca5a804d90692a60a97e42dcb6f4404ba88209fb4c3ec302259fbe582d598ce4",
  "dcId": 1,
  "nextApiId": 2040,
  "dateUpdated": {
    "$date": "2025-08-19T10:18:30.387Z"
  },
  "twoFa": false,
  "twoFaDate": {
    "$date": "2025-08-18T10:48:02.736Z"
  },
  "phone": "+527298744747",
  "banned": false,
  "firstName": "Darina",
  "id": "7293991818",
  "lastName": "Karpova",
  "messageCount": 29,
  "username": "karpova_left",
  "personalChannelDate": {
    "$date": "2025-08-16T21:17:21.920Z"
  },
  "personalChannelError": "CHANNEL_NOT_FOUND",
  "lazyCheckDate": {
    "$date": "2025-08-19T00:00:28.143Z"
  },
  "automaticCheckDate": {
    "$date": "2025-08-19T10:18:30.387Z"
  },
  "remainingTime": {
    "$date": "2025-08-11T12:07:22.217Z"
  }
},
{
  "_id": {
    "$oid": "680ebc53461801f599f3899a"
  },
  "accountId": "7304477312-prefix-bls",
  "dc4": "20eb25714e5f1cf3eaaf6e702a790821ec8648348976954336b0b2494bbeebbf58fc675bbb7082b50d805372b319c21e66d8f9d118b556dcebdfcffe16516d6e772a96b224dd69ab23085cef4b0b5d953ba0b3296f27a5b5e3338fc7daac0a21f30fa4f9536c2dea5063145f3e00debe76535b533085b61f2475d61e010c4beaeea4debc67639b0deb3dcb7ccc77eca7330d7d5b2b007a5aeb5fc41fbf3428830b4f440cca1d3eae8ed6c5cb15f2363efefc8a7df6d6f190d6c71c603903336a092b729b2e75e5749bf92bdcb5ec7e11e153ecf83fbb1faf15076a5c5c260e895d2e58beb2170f94b58bfce25defc60bf11c642f93cd573ca3a05b3c72085b72",
  "dcId": 4,
  "nextApiId": 2040,
  "dateUpdated": {
    "$date": "2025-08-19T10:25:33.325Z"
  },
  "twoFa": false,
  "twoFaDate": {
    "$date": "2025-08-17T20:15:25.784Z"
  },
  "phone": "+201113937994",
  "banned": false,
  "firstName": "Boris",
  "id": "7304477312",
  "lastName": "Sokolov",
  "messageCount": 7,
  "username": "sokolov_magnetic",
  "personalChannelDate": {
    "$date": "2025-05-23T07:59:36.664Z"
  },
  "lazyCheckDate": {
    "$date": "2025-08-18T15:01:11.419Z"
  },
  "automaticCheckDate": {
    "$date": "2025-08-19T10:25:33.325Z"
  },
  "personalChannel": "RdRIfhlqTxt1tRTN",
  "remainingTime": {
    "$date": "2025-05-28T08:57:16.552Z"
  }
},
{
  "_id": {
    "$oid": "680b946e461801f5996017c1"
  },
  "accountId": "7327588953-prefix-female-dmp1",
  "dc1": "1ad7a455da52077e3ef9befb54aeefef0c59b9d66be9962fe7e17eee109fd418795e885faa38ed53d8d07233d8e06034c63c9cfbdb98dc4e2d72a532e485f7409f54dab63f3ed335f57e2b5dde7271929d176d59510ac21acfafbc3b9c50359b23ecf96aa5252c31959ade7ed7fbe08d8918b71f3c90fbdfcd3f735380baaec9ab4a4a8374b97539cee0b18e147c912571a1d2e474fc68837484c4f310c1efc52baab22fa3e249c4f9ef388db158cfb32aaf0dee27ebe2b73d0247217ab62b47d237c7822aa22b61bbd55f4eb75872437adbd866ee790feac062a464d3ff0b406e6940ec068035a7ed4ce3b616c3333aecf480da628b6a8e4340d25b229e8007",
  "dcId": 1,
  "nextApiId": 2496,
  "dateUpdated": {
    "$date": "2025-08-19T10:12:43.557Z"
  },
  "twoFa": false,
  "twoFaDate": {
    "$date": "2025-08-18T10:48:09.275Z"
  },
  "phone": "+56928361989",
  "banned": false,
  "firstName": "Inna",
  "id": "7327588953",
  "lastName": "Andreeva",
  "messageCount": 47,
  "personalChannel": "QTAtnCc7DrJUuRZB",
  "personalChannelDate": {
    "$date": "2025-04-25T14:34:22.743Z"
  },
  "lazyCheckDate": {
    "$date": "2025-08-18T20:05:28.732Z"
  },
  "automaticCheckDate": {
    "$date": "2025-08-19T10:12:43.557Z"
  },
  "username": "andreeva_light",
  "remainingTime": {
    "$date": "2025-08-19T02:37:26.742Z"
  }
},
{
  "_id": {
    "$oid": "685f074b3770b19a27ab20e2"
  },
  "accountId": "7347485454-prefix-female-gidrovell",
  "dc1": "455cfa7c0227e784b6d72897f040fe0876dbe5f460e443a2896268ae50fd7ff6ccf76fb763b46d77c11e32fcaf546814517d5caa18becfa15ddc9381882a2cdeb758db1693716e0b9ea59f9ef9910c5a2250cff329904911b0f9cb8cb430ec322ddd06657893c6cedd416e1d039a9302afbc152277b77acdaa3ad2f12d0cdff697410a815039551ca3aa983b06fc6f1bd5ac445be60db3948f78331b57ef9a160f798259b0cb252306db6106f39906639c9695b4f911bc7d9b7df5c52724ceeeb84ec58a1305dcff9a36548b455ed9e956d11c36ff52894a909415c0285336b75cc60e1ebe45f9df6cf1b0e68ddf3c4bd1bdf041fc668a2e18e1033f8b3c1ec5",
  "dcId": 1,
  "nextApiId": 2040,
  "dateUpdated": {
    "$date": "2025-08-19T10:23:14.975Z"
  },
  "twoFa": false,
  "twoFaDate": {
    "$date": "2025-08-18T10:47:56.006Z"
  },
  "phone": "+541122693162",
  "banned": false,
  "firstName": "Inna",
  "id": "7347485454",
  "lastName": "Shirokova",
  "messageCount": 30,
  "username": "shirokova_aquamarine",
  "personalChannelDate": {
    "$date": "2025-08-16T21:17:19.728Z"
  },
  "personalChannelError": "CHANNEL_NOT_FOUND",
  "lazyCheckDate": {
    "$date": "2025-08-18T19:09:20.011Z"
  },
  "automaticCheckDate": {
    "$date": "2025-08-19T10:23:14.975Z"
  },
  "remainingTime": {
    "$date": "2025-08-11T12:32:22.232Z"
  }
},
{
  "_id": {
    "$oid": "680b946a461801f59960167e"
  },
  "accountId": "7365578005-prefix-female-dmp1",
  "dc1": "67f65b5550afe80dbc6915c2068a26d9058a874dc8c154220c7f9e10df16d1b5cb635f5e1d19b0f0892bbd58fdb67891ada6d4ecc81b0a0853d6e95a5f8d5135eeeddaadee5c984b975c7e26a11dd57615ec4c6ced7c96c1b736152bc9ca78d397376b17ab020249b018ac5eac8cc2ebbaaa0c89a1a171401aa66a8b3ae86fe3adf8e62db76a51ee037686b004625611fdfbafdbe0a2aeb8bb9f84e163bd5afbf7c86fe721ff84cabc287c8af1565d10cf8390674b2649a75f73623c9ad3bf3ae55e21edeb0a92c97919f803170362fe65ece35fe593dfe8c6ea5c47bf714fc4a1be0179309512d5280207cbf8cfabc44f2bf893190e896d2dcef860058ab538",
  "dcId": 1,
  "nextApiId": 2496,
  "dateUpdated": {
    "$date": "2025-08-19T10:20:44.848Z"
  },
  "twoFa": false,
  "twoFaDate": {
    "$date": "2025-08-18T10:47:57.263Z"
  },
  "phone": "+5594992014784",
  "banned": false,
  "firstName": "Yana",
  "id": "7365578005",
  "lastName": "Medvedeva",
  "messageCount": 114,
  "personalChannel": "BAOjjszVciXoYau0",
  "personalChannelDate": {
    "$date": "2025-04-25T14:30:19.981Z"
  },
  "lazyCheckDate": {
    "$date": "2025-08-19T01:49:05.555Z"
  },
  "automaticCheckDate": {
    "$date": "2025-08-19T10:20:44.848Z"
  },
  "username": "medvedeva_environmental",
  "remainingTime": {
    "$date": "2025-08-19T02:24:21.023Z"
  },
  "historySpamBlocks": [
    {
      "spamBlockDate": {
        "$date": "2025-04-30T09:37:00.000Z"
      },
      "spamBlockDays": 3
    }
  ]
},
{
  "_id": {
    "$oid": "683b23ea3770b19a277f494f"
  },
  "accountId": "7369136300-prefix-elba",
  "dc1": "62dfdb37297f055cec4ab6745aa26b46ec361d7d63cbddbb7b8f036f55ed5dfaef7e2071fde106ff8ee7699b63e601fc46e25b2ca9fa8acb662847729d8cc59b1d6e11eda989e0ac02f95aa06d4bc54cba42c88fc9c88e3b78a8ff551a26ea87c33256e02a9f5f8869f95cb644e201d34afc3d25473fca0af1b0dddd83ab8ef795269f1f2f72f4eb79d926325c4128d81049396e10a4afdda5152c8cc05a10c7bfbf8b1bdbb4c39609224c2ae8cc86ede8ec2a782d46badb241ac3dd9dfb498ed80634a3fbd23e99c732b0aab116e9a848c2fe2ffeffd674547543b7c91607db946812606a66cdf4322c0a61a12221ccddf698dfd6a340b5e8a318761b61e543",
  "dcId": 1,
  "nextApiId": 2040,
  "dateUpdated": {
    "$date": "2025-08-19T10:32:29.833Z"
  },
  "twoFa": false,
  "twoFaDate": {
    "$date": "2025-08-18T00:42:10.872Z"
  },
  "phone": "+573228600843",
  "banned": false,
  "firstName": "Nikolay",
  "id": "7369136300",
  "lastName": "Zhukov",
  "messageCount": 4,
  "username": "zhukov_lost",
  "personalChannel": "c0lLWOUuBlyPTwpq",
  "personalChannelDate": {
    "$date": "2025-05-31T16:36:18.526Z"
  },
  "lazyCheckDate": {
    "$date": "2025-08-18T23:43:20.005Z"
  },
  "automaticCheckDate": {
    "$date": "2025-08-19T10:32:29.833Z"
  },
  "remainingTime": {
    "$date": "2025-08-09T10:08:35.413Z"
  }
},
{
  "_id": {
    "$oid": "685f074c3770b19a27ab20fb"
  },
  "accountId": "7370242003-prefix-female-gidrovell",
  "dc1": "4a1de47fc2b296f5ec22b57d9c87eb38cd081fa6d48195d9844af355b4048a2cc7d6b68bfcb723e7b6bfcdb4b6c6b7e7ba91e9fc5a3a8a8f81a77e3b2e07c00517c2e2e4393b8c53ca0babe792cb38c6f54c91e8ec73e4ac3a8c4daa4ec8c45f8dcc13ef26324d40298372c47cc2f103bf8a67537bfe99f8d2c505f6fec3ddd6af11f52698c8145ad9506194b6cdfba2b2e0cc19d61ed0dbbd9e200f21b3f8ab813ec66ba3a4f43b94e5ff63d06a3d0ebb54919aa44beb1061f707249d46341d3ab13a95f4d7cd1116b5611398bdc1c976b2800c5528f72e5bb0d5b367cdc6aaa6cb15ff6e6e2be69c8d84ec687b841d68505347b2487b9d8540648f9f49a7f8",
  "dcId": 1,
  "nextApiId": 2040,
  "dateUpdated": {
    "$date": "2025-08-19T10:33:22.298Z"
  },
  "twoFa": false,
  "twoFaDate": {
    "$date": "2025-08-18T10:47:55.656Z"
  },
  "phone": "+541123037085",
  "banned": false,
  "firstName": "Raisa",
  "id": "7370242003",
  "lastName": "Loginova",
  "messageCount": 28,
  "username": "loginova_combined",
  "personalChannelDate": {
    "$date": "2025-08-16T21:17:17.232Z"
  },
  "personalChannelError": "CHANNEL_NOT_FOUND",
  "lazyCheckDate": {
    "$date": "2025-08-18T22:25:24.436Z"
  },
  "automaticCheckDate": {
    "$date": "2025-08-19T10:33:22.298Z"
  },
  "remainingTime": {
    "$date": "2025-08-11T12:37:35.469Z"
  },
  "historySpamBlocks": [
    {
      "spamBlockDate": {
        "$date": "2025-07-05T07:51:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-07-09T07:39:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-07-23T11:03:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-07-29T06:45:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-07-29T09:05:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-08-02T10:09:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-08-02T07:42:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-08-11T05:22:00.000Z"
      },
      "spamBlockDays": 3
    }
  ]
},
{
  "_id": {
    "$oid": "683b23e83770b19a277f48df"
  },
  "accountId": "7370907036-prefix-elba",
  "dc1": "855a0f379e9603f35718eb1e6d430e2294dfaafc55494d6006f43fb17a0c2c2cd8bc1093ee03d9992f13a45bba86822d25b00e18b66fb6039765230b21698b8e10895ab02805c20b1f23109046c24db101f5dd71a01eba7b3f29ae8e729a0268f6e124fa616d7d56eb856fc5123c64d0513af45356fb6cb5ce40733a7dda43de76f28b1b8c0a756ed0eb5aaaf0b9d75ae573cf167016cb67c9b64d17517251098f0a5321f75a83cbd642d234aaccb1760506492be355c8dbf1e0a56c4ea152e5ea3785ca61a6f0b6664ce2503a2388b939c24849c8a44bba36d61b3cf3e7583a0db36805ec8d4fd295e04fd00bf36c8573870a54781824100b53c177c5fdd90a",
  "dcId": 1,
  "nextApiId": 2040,
  "dateUpdated": {
    "$date": "2025-08-19T10:12:27.829Z"
  },
  "twoFa": false,
  "twoFaDate": {
    "$date": "2025-08-18T00:42:33.714Z"
  },
  "phone": "+573202363760",
  "banned": false,
  "firstName": "Mikhail",
  "id": "7370907036",
  "lastName": "Chugunov",
  "messageCount": 6,
  "username": "chugunov_expensive",
  "personalChannel": "SLQqIkwojPL5rMxy",
  "personalChannelDate": {
    "$date": "2025-05-31T16:35:51.070Z"
  },
  "lazyCheckDate": {
    "$date": "2025-08-18T23:08:04.633Z"
  },
  "automaticCheckDate": {
    "$date": "2025-08-19T10:12:27.829Z"
  },
  "remainingTime": {
    "$date": "2025-08-11T11:03:01.577Z"
  }
},
{
  "_id": {
    "$oid": "685f074c3770b19a27ab2116"
  },
  "accountId": "7371638042-prefix-female-gidrovell",
  "dc1": "173e5b21b56943e60f6de27913068dd7a27ec7ed1fc6222fd1bd2a0fddcce58a057b59a51e71b4256b6f657217a337f58624939e7ab85a583c0576e397c5603f39600a821cbc23288f71fc652ce26d3263970a6a60d652a9eb75fe010d871d6575540a673fd4d805c5e53b7f817f748bd1f0f83c6493efe5f6135b31e6463ac087f2808aefbe6b72ed9f3f2d54502c486041b45cd1f2f0704df32c4f646eb9f95c3c02910a5ae907aa79430c824f9ffcf1181b17c4fe8039652acbaafe9cd506acc47802813e0cd40ab2fd9e19c311bc6d078a82fa43e1c0400e639cdbe150966af7d39f7692efec2516a517b9c417228744b1c2cffdeb554a59016ff5283c0d",
  "dcId": 1,
  "nextApiId": 2040,
  "dateUpdated": {
    "$date": "2025-08-19T10:34:26.420Z"
  },
  "twoFa": false,
  "twoFaDate": {
    "$date": "2025-08-18T10:47:55.630Z"
  },
  "phone": "+541138867567",
  "banned": false,
  "firstName": "Olga",
  "id": "7371638042",
  "lastName": "Kashirina",
  "messageCount": 23,
  "username": "kashirina_rolling",
  "personalChannelDate": {
    "$date": "2025-08-16T21:17:19.728Z"
  },
  "personalChannelError": "CHANNEL_NOT_FOUND",
  "lazyCheckDate": {
    "$date": "2025-08-18T19:50:35.819Z"
  },
  "automaticCheckDate": {
    "$date": "2025-08-19T10:34:26.420Z"
  },
  "remainingTime": {
    "$date": "2025-08-05T14:11:20.147Z"
  },
  "historySpamBlocks": [
    {
      "spamBlockDate": {
        "$date": "2025-08-02T06:10:00.000Z"
      },
      "spamBlockDays": 3
    }
  ]
},
{
  "_id": {
    "$oid": "685f07493770b19a27ab2005"
  },
  "accountId": "7373503097-prefix-female-gidrovell",
  "dc1": "5b06eaaaeb0fea38bb5fa62b639270ee3bf382d54b1733dcea62333abe15f3996cffa485d4ded554b2985da72fc730b6b81ecd0016e7d6628c9ec20bdcf507be36a169fa71bdb91734b604778e125de3715b748f06df1c3802168def6cd19a8b40ccdd41ec0c4ebe84264bec57d09e0177482d3633936dde90aeebb5c8309f5188727f3199b9c0987458844740b1ae11e8dbe27fbe7d24edeb9dd000c529082bf507ea612559ac525f723a59b215cd46e64bebc088637c7265dfeddd537c4566d67a80826a653896af26bfb4b389d16a4e7e36e875e05c5980b36c94959d865567db106a3593c576d76338213305791ae24cd2d4019df07447d1fe4ccfab19f0",
  "dcId": 1,
  "nextApiId": 2040,
  "dateUpdated": {
    "$date": "2025-08-19T10:17:42.720Z"
  },
  "twoFa": false,
  "twoFaDate": {
    "$date": "2025-08-18T10:47:41.029Z"
  },
  "phone": "+542477685089",
  "banned": false,
  "firstName": "Yana",
  "id": "7373503097",
  "lastName": "Pavlova",
  "messageCount": 24,
  "username": "pavlova_costly",
  "personalChannelDate": {
    "$date": "2025-08-16T21:17:23.712Z"
  },
  "personalChannelError": "CHANNEL_NOT_FOUND",
  "lazyCheckDate": {
    "$date": "2025-08-18T19:16:00.705Z"
  },
  "automaticCheckDate": {
    "$date": "2025-08-19T10:17:42.720Z"
  },
  "remainingTime": {
    "$date": "2025-08-11T12:06:13.538Z"
  }
},
{
  "_id": {
    "$oid": "683b23e53770b19a277f479f"
  },
  "accountId": "7375280733-prefix-elba",
  "dc1": "5581aee1241b47d32d0c869534d6eb8a0ca36381b5b865c6bfaea52dc6299bff11fd218e8c7d9fe12aa888ff77a74bb8d6adf9d0a5c9ee7b2bf30bf905df6301211a1e4748e699abce5bed80ba5d3789995d2b64a3352acecfae8caac09a89151f36d0b1c760fa7d5e5e5105ec9bc3e5240dcb64890b9d8f0f68e45b0067a72d0c9cbf8b7c434eb2dfcd03deeab6cdfd8141ce25aeaf8eaeb00d6c2d5c1c35788154b22ec5136e55a336366f70bcf8c16131478aae7ffb77dcb737e819be9d293c96cbad0ba96cc71b6bbf74f064e174e715f5b895d2b3cadf68612fcab4ab594dfc66b547bc6e05902d5a2f69e9797f701f32d487388341d8bd5aa0c838f602",
  "dcId": 1,
  "nextApiId": 2040,
  "dateUpdated": {
    "$date": "2025-08-19T10:27:25.659Z"
  },
  "twoFa": false,
  "twoFaDate": {
    "$date": "2025-08-18T00:42:30.032Z"
  },
  "phone": "+573229394297",
  "banned": false,
  "firstName": "Kirill",
  "id": "7375280733",
  "lastName": "Frolov",
  "messageCount": 4,
  "username": "frolov_novel",
  "personalChannel": "UKbcwzQHQ3jyAmDx",
  "personalChannelDate": {
    "$date": "2025-05-31T16:36:02.511Z"
  },
  "lazyCheckDate": {
    "$date": "2025-08-18T17:52:08.492Z"
  },
  "automaticCheckDate": {
    "$date": "2025-08-19T10:27:25.659Z"
  },
  "remainingTime": {
    "$date": "2025-08-09T10:46:37.188Z"
  }
},
{
  "_id": {
    "$oid": "685f074b3770b19a27ab20ec"
  },
  "accountId": "7376822963-prefix-female-gidrovell",
  "dc1": "69431a5981c740a915765b0dc4b9660ea4e19db0e6a8ad90c70caa9f89e3b4dffdd40a79b9b158a0e47f1f0e268714b99745ac71ee69edac4e5f1bcf088df1ae426cb53f0dbe17fd2a4d18b943d181a082d640482a764c92a6867b759493ef0f177b9b4982a2d32407a406deb1fa382273630e03d64f6956bac6ab16c0394d07ebc4135de72fcf9cfed214e2762570c34b692418443929811ca0141a7aaa87b15cee8e87abe87c0ddbdec707462aa7a8f408306dbb73250f6ec0fbe59db2785b0a218749629129022556414cdf803db9d8f8d75c0be9af4e8e8ec9b1e07ecc6b98a28c2c73d3141b33a8ec872f6e7bc14cbca68fe32183d7c4f13592f88ebc6b",
  "dcId": 1,
  "nextApiId": 2040,
  "dateUpdated": {
    "$date": "2025-08-19T10:19:22.478Z"
  },
  "twoFa": false,
  "twoFaDate": {
    "$date": "2025-08-18T10:47:53.669Z"
  },
  "phone": "+543644290103",
  "banned": false,
  "firstName": "Anastasia",
  "id": "7376822963",
  "lastName": "Voronina",
  "messageCount": 31,
  "username": "voronina_controversial",
  "personalChannelDate": {
    "$date": "2025-08-16T21:17:17.762Z"
  },
  "personalChannelError": "CHANNEL_NOT_FOUND",
  "lazyCheckDate": {
    "$date": "2025-08-18T21:28:09.454Z"
  },
  "automaticCheckDate": {
    "$date": "2025-08-19T10:19:22.478Z"
  },
  "remainingTime": {
    "$date": "2025-08-07T16:35:41.059Z"
  },
  "historySpamBlocks": [
    {
      "spamBlockDate": "INFINITY",
      "spamBlockDays": 0
    }
  ]
},
{
  "_id": {
    "$oid": "685f074a3770b19a27ab20af"
  },
  "accountId": "7394121281-prefix-female-gidrovell",
  "dc1": "1db0bae6e556198876cf3b1601a7ae2f2828dc38421138fb76bbe95b7315ec84bc2dedb85d86521d75669c4035f8272faa568c7ccd556f270a3ce115e47f5b75cfcebf925da9b429e1f7023a0d624b5e0970d661486611664dcee2ef22447ccfdcda555d88b206a9885241ef9f885954bd193698100ceb628abee3388f57ad0ace7e972fbb8e3eb07464709dece4c1fb736b7936621c79f09db96c816b61caf40cf938d52a0f019c2e73bb48fdea8e177bd3c65899b082c0113d53d0d405ae4c1b52a58e111360749de849821d9b0ad5a344f421d4709856c73c5a53fb9138709428e62982335cd6bb16ae4df09c71d7a980c668a20605c32ebd07f98064ec3b",
  "dcId": 1,
  "nextApiId": 2040,
  "dateUpdated": {
    "$date": "2025-08-19T10:12:15.072Z"
  },
  "twoFa": false,
  "twoFaDate": {
    "$date": "2025-08-18T10:47:53.926Z"
  },
  "phone": "+543476352547",
  "banned": false,
  "firstName": "Evgenia",
  "id": "7394121281",
  "lastName": "Tarasova",
  "messageCount": 30,
  "username": "tarasova_different",
  "personalChannelDate": {
    "$date": "2025-08-16T21:17:17.221Z"
  },
  "personalChannelError": "CHANNEL_NOT_FOUND",
  "lazyCheckDate": {
    "$date": "2025-08-18T23:02:47.267Z"
  },
  "automaticCheckDate": {
    "$date": "2025-08-19T10:12:15.072Z"
  },
  "remainingTime": {
    "$date": "2025-08-11T12:32:58.923Z"
  }
},
{
  "_id": {
    "$oid": "685f074d3770b19a27ab219a"
  },
  "accountId": "7400597678-prefix-female-gidrovell",
  "dc1": "416deba60eb2da77b66c92d8a956ba8728da9fbf97d822f6e9d388cc8a062ac4c3be0f8f325832c9488c20a29f59be6ed168b60ba30086c3aacd3721a9e9d53461639204eb7f386888b89cfc69b69a6f5682c1595d9a50ecc9bf965b8cbbe743357748035f82929d60d1e08ea30f95db2801294248901b5c77b51b8464261cec7c654f4d3b7087a952d901193e6106a5f4f19b34527af4ed5ecd8a6f2da6fb09d69b295fb0debd25b5dd972ca4d216f14f6b5a5fcc18bbcec7765db441404d61b89215817dda430abbe92540d97bd3f29f1926f059bb888a6207aaa438f7f2b845b3751ea7ddc90a87ea33f1c53ac63927877852e4c028fc91066624d2d3b2b2",
  "dcId": 1,
  "nextApiId": 2040,
  "dateUpdated": {
    "$date": "2025-08-19T10:12:23.840Z"
  },
  "twoFa": false,
  "twoFaDate": {
    "$date": "2025-08-18T10:47:56.687Z"
  },
  "phone": "+522225574038",
  "banned": false,
  "firstName": "Darina",
  "id": "7400597678",
  "lastName": "Sinitsyna",
  "messageCount": 25,
  "username": "sinitsyna_alleged",
  "personalChannelDate": {
    "$date": "2025-08-16T21:17:17.222Z"
  },
  "personalChannelError": "CHANNEL_NOT_FOUND",
  "lazyCheckDate": {
    "$date": "2025-08-18T20:23:54.085Z"
  },
  "automaticCheckDate": {
    "$date": "2025-08-19T10:12:23.840Z"
  },
  "remainingTime": {
    "$date": "2025-08-06T14:20:48.882Z"
  }
},
{
  "_id": {
    "$oid": "685f074d3770b19a27ab21b1"
  },
  "accountId": "7427637922-prefix-female-gidrovell",
  "dc1": "1501545479a00deb80e0ad095586e6f1bc07d486798c7f36ce9f2dbed91fa096743ec55067bcd23d35d2b0e7abf32e9f72c030c267d2918efd5ef88633242313354216b4ef6afc3541a7dbf92a8f16394dbaae7a9442a2d9409e4361a8d1535a3d058ebac06fa644c7ad37c97ffe6ab44685f71238d39ff3e5ad34fa940c010dc9ecc165a463b9cb21ed377b80ebb7dfdbf5b96a11708b01a924477914bece1e0d97b3b4806c5a0e9f55c4b26b5b5628f4f4c8fe6aab22601bedc3f3300d43ecbbfa661e83043b53bea18f806119a5d5c1e3a6f763cee056711191defae75271fd1ddba60d90d09eba999230f68af1f8bafe37a2b265fd96e75bc95cc39e2ea5",
  "dcId": 1,
  "nextApiId": 2040,
  "dateUpdated": {
    "$date": "2025-08-19T10:33:19.475Z"
  },
  "twoFa": false,
  "twoFaDate": {
    "$date": "2025-08-18T10:47:56.547Z"
  },
  "phone": "+525536786991",
  "banned": false,
  "firstName": "Evgenia",
  "id": "7427637922",
  "lastName": "Tikhonova",
  "messageCount": 25,
  "username": "tikhonova_flexible",
  "personalChannelDate": {
    "$date": "2025-08-16T21:17:16.824Z"
  },
  "personalChannelError": "CHANNEL_NOT_FOUND",
  "lazyCheckDate": {
    "$date": "2025-08-18T20:35:57.821Z"
  },
  "automaticCheckDate": {
    "$date": "2025-08-19T10:33:19.475Z"
  },
  "remainingTime": {
    "$date": "2025-08-06T14:11:16.754Z"
  },
  "historySpamBlocks": [
    {
      "spamBlockDate": {
        "$date": "2025-08-05T06:50:00.000Z"
      },
      "spamBlockDays": 1
    }
  ]
},
{
  "_id": {
    "$oid": "685f074b3770b19a27ab20bb"
  },
  "accountId": "7427730152-prefix-female-gidrovell",
  "dc1": "60d8a83b6d2e6159d5bcf9f0b1b2f78aab956ba5c3d3a6a7ed7e234f16e6b5d38cc3ef8c636e43db48f0b9331097a21605d13e022643e8df1959d8d3344aae8ac402c22d5a15c37bf3b2720427d542d63c31bbd79b74551478ef20b09cf269c3a799ef89ddacd43e8e6d0545ec9b4904de65c29e29b2267c79dceab03f2b2c57a333a78af9fa3f80c64d33d665fc815219882bb684bd5df84838a15c8858f386ceee31f431340d7f56a7bbde61a20d8aae58d384c5074225e2e120d718c73ca4afa5d85176a8256927acf8b0b000fdb7be9987e90e9e503f2ed6adaf47bcc05bd51a898228f293df1cee808a318afbe7284ee53a02f3d7cc8c099f81a8342346",
  "dcId": 1,
  "nextApiId": 2040,
  "dateUpdated": {
    "$date": "2025-08-19T10:16:22.327Z"
  },
  "twoFa": false,
  "twoFaDate": {
    "$date": "2025-08-18T10:47:51.636Z"
  },
  "phone": "+542994062335",
  "banned": false,
  "firstName": "Anfisa",
  "id": "7427730152",
  "lastName": "Voronina",
  "messageCount": 34,
  "username": "voronina_mechanical",
  "personalChannelDate": {
    "$date": "2025-08-16T21:17:17.763Z"
  },
  "personalChannelError": "CHANNEL_NOT_FOUND",
  "lazyCheckDate": {
    "$date": "2025-08-18T19:55:31.282Z"
  },
  "automaticCheckDate": {
    "$date": "2025-08-19T10:16:22.327Z"
  },
  "historySpamBlocks": [
    {
      "spamBlockDate": "INFINITY",
      "spamBlockDays": 0
    }
  ],
  "remainingTime": {
    "$date": "2025-08-11T12:09:09.117Z"
  }
},
{
  "_id": {
    "$oid": "680ebc57461801f599f38b51"
  },
  "accountId": "7428311312-prefix-bls",
  "dc4": "489dc84a8df6c5845c07833d2dfad4958744be35d17e30ea90d05659296e37bad8be4b4981d976ae9df222f4b2d1dab511409ca4beb8dd134951dc576a2b3d3b4087f940624083b89fc5c9621b74f7414cb1a177695466bdc273d2727b4db7389d2bd4d7d8bc4581129dedb3b3dc968f7d7873bd50573a9aa840155b0e52d397967445b38ccf859c37b2790c8f96a9eb3aafd299ae13c5feca897e0bcf4268406cf4970bf5b3d91ddc21f23869509b1b9285a7727ba3b08994c38bafde5eda1045a2433b4116ec615c562b5c3df0fc66098639b67f58e469205d3b52e233b26e61f5157d8bacc54129abc5d1f1f18f5f10beed761015f9c3b07104c26d19dd85",
  "dcId": 4,
  "nextApiId": 2040,
  "dateUpdated": {
    "$date": "2025-08-19T10:30:28.665Z"
  },
  "twoFa": false,
  "twoFaDate": {
    "$date": "2025-08-17T20:15:27.954Z"
  },
  "phone": "+201281703872",
  "banned": false,
  "firstName": "Gennady",
  "id": "7428311312",
  "lastName": "Tkachev",
  "messageCount": 7,
  "username": "tkachev_fat",
  "personalChannelDate": {
    "$date": "2025-05-23T07:59:51.635Z"
  },
  "lazyCheckDate": {
    "$date": "2025-08-18T14:52:26.609Z"
  },
  "automaticCheckDate": {
    "$date": "2025-08-19T10:30:28.665Z"
  },
  "personalChannel": "EtNnUuq4QcEyyMKA",
  "remainingTime": {
    "$date": "2025-05-28T10:04:57.752Z"
  }
},
{
  "_id": {
    "$oid": "685f07473770b19a27ab1f74"
  },
  "accountId": "7471864627-prefix-female-gidrovell",
  "dc1": "c55948df88dac0d2890dd9b5c61c2dc2eab9b4932c0cefa650fa5d8977741860e4dbae73c19c2e058334a841b090d1806b30bc1c50f3ee8919321d2b4fc5a0402dbdca74a7ada539c23a51dac2dcbe33439c8532e89f97607f16e6b1235560ddc94dc9ccf2ebbdfd0e575be255c6b36964f0611be508c9035028fa0559ec9c9609961644a0deec8e4e139f1aac2b7edc51d7fe7219eb2519aa1a13ea88a8226dfd1d7d478a0fad36359d2ce646edc4c0421b7f290c526c99df5b51dc28123da1c0533713ebde378a72867f5b3b6af281a34cfb90f7e05552142ca54d9b9dfacad0250956050bb1b6c639bf29320d2020351223860156e44df24bce4bd213f5a8",
  "dcId": 1,
  "nextApiId": 2040,
  "dateUpdated": {
    "$date": "2025-08-19T10:30:41.577Z"
  },
  "twoFa": false,
  "twoFaDate": {
    "$date": "2025-08-18T10:47:33.737Z"
  },
  "phone": "+542214544328",
  "banned": false,
  "firstName": "Anastasia",
  "id": "7471864627",
  "lastName": "Solovieva",
  "messageCount": 29,
  "username": "solovieva_rear",
  "personalChannelDate": {
    "$date": "2025-08-16T21:17:22.247Z"
  },
  "personalChannelError": "CHANNEL_NOT_FOUND",
  "lazyCheckDate": {
    "$date": "2025-08-18T20:02:43.344Z"
  },
  "automaticCheckDate": {
    "$date": "2025-08-19T10:30:41.577Z"
  },
  "remainingTime": {
    "$date": "2025-08-11T12:28:49.218Z"
  }
},
{
  "_id": {
    "$oid": "685f07473770b19a27ab1f62"
  },
  "accountId": "7477327581-prefix-female-gidrovell",
  "dc1": "56055baa87067f5dc66ee45e248924f05768d8af6df8039c95ef3c646ae2bc9fdf4a8c3f45ca74d9c149a72fa8af0350488e530527ebfe2c1e92920cef8fe97eea90144695b1d1d55cd2e30664356ab9331cb8593f33973962cf34586e1bacbe8e7d1538d713ee990a680088482c28f30b562a771947c25e733f11ad0a1148f6456bd90620617d6081a5443290bf73fafab5e5ad6150a404f6747bb3c53e0c8d98330ac2c283f48252e00ac5c9e1b449d43309da83297d4ad7319ef4acaed142df87f8288f32ba9cb4d257ede6c5a79b0e4c5c0065901728c802f09840b2f54bd8a5aab1373c8a7b9d86454205f0d4bb6271c13ec65e653ebba13f1ac58be6d9",
  "dcId": 1,
  "nextApiId": 2040,
  "dateUpdated": {
    "$date": "2025-08-19T10:30:42.318Z"
  },
  "twoFa": false,
  "twoFaDate": {
    "$date": "2025-08-18T10:47:33.743Z"
  },
  "phone": "+542804575915",
  "banned": false,
  "firstName": "Evgenia",
  "id": "7477327581",
  "lastName": "Shirokova",
  "messageCount": 25,
  "username": "shirokova_afraid",
  "personalChannelDate": {
    "$date": "2025-08-16T21:17:21.308Z"
  },
  "personalChannelError": "CHANNEL_NOT_FOUND",
  "lazyCheckDate": {
    "$date": "2025-08-18T21:37:04.017Z"
  },
  "automaticCheckDate": {
    "$date": "2025-08-19T10:30:42.318Z"
  },
  "remainingTime": {
    "$date": "2025-08-06T14:15:28.387Z"
  }
},
{
  "_id": {
    "$oid": "685f07513770b19a27ab227c"
  },
  "accountId": "7477585413-prefix-female-gidrovell",
  "dc1": "90a06961ddb470e8cc6da46cb656c42ba69ecba301c957e9045956a67ebbcfc05bf811e6ac07681147745bc0d849d31b0eeaacb984acef657296a0eb08d7f40d513f076cad158cbbdd42430ebddb7ab13ded5e1be4559aa04d72cf3a04fd1c3cbda68392038dd565fc2765dd55fdb6c3038c9737140703bc6b16ae0c104ba2b85322ca05bbcde779e0ae8635c7546ad7731d65e7a7a213c61a8516ccd9ca2a598d5fe57753f9fb116b9230b58959b958cd1bf1064a6c04c5f5d2117a998c80605ed365970e464523f73ea9eaae2289187900d83e3194ea2e60f6a22e61679904335430c01fad45fde465214dfcd7cc897bbc1a28e079c0d7e2fe02d2eb023354",
  "dcId": 1,
  "nextApiId": 2040,
  "dateUpdated": {
    "$date": "2025-08-19T10:36:27.900Z"
  },
  "twoFa": false,
  "twoFaDate": {
    "$date": "2025-08-18T10:47:41.999Z"
  },
  "phone": "+526567564455",
  "banned": false,
  "firstName": "Alla",
  "id": "7477585413",
  "lastName": "Zaytseva",
  "messageCount": 30,
  "username": "zaytseva_extensive",
  "personalChannelDate": {
    "$date": "2025-08-16T21:17:15.187Z"
  },
  "personalChannelError": "CHANNEL_NOT_FOUND",
  "lazyCheckDate": {
    "$date": "2025-08-18T22:55:53.740Z"
  },
  "automaticCheckDate": {
    "$date": "2025-08-19T10:36:27.899Z"
  },
  "historySpamBlocks": [
    {
      "spamBlockDate": "INFINITY",
      "spamBlockDays": 0
    }
  ],
  "remainingTime": {
    "$date": "2025-08-06T14:12:41.044Z"
  }
},
{
  "_id": {
    "$oid": "680b946c461801f599601747"
  },
  "accountId": "7478670974-prefix-female-dmp1",
  "dc1": "51fec35278f8ba4fa7fba55361fad15ee131e9e65397ca0d466a53aec4d2e49ea12c83fff9a55fcd5f087b987fa08990ea79a82046032b7759d111eca0139b3a50daac0e8b9c20fc8e6562ac4d261e3a6108bd167e3ae05893c943e1b1a7fe037d93ca7e0f0df4e2199b22f1b939346d9f510506feeb0617c7a59963893f832d073a7693c633350a9d4ecbaf8a3aeee838e187f0959b57e344a1960723331d86b152b1e7a42bface96b808cf58f029ded9791df30b40efcbbf22e4798e3fb194b94c726a64e8ca163cf6b638af104df09192fa41dffd206af9a5fe40f0a9c283b5ea7aae45916ec0f62ab45254c8f831d7d4484aa07ab4940a4e3d6e55c4ca8c",
  "dcId": 1,
  "nextApiId": 2496,
  "dateUpdated": {
    "$date": "2025-08-19T10:24:43.757Z"
  },
  "twoFa": false,
  "twoFaDate": {
    "$date": "2025-08-18T10:48:03.134Z"
  },
  "phone": "+56934855103",
  "banned": false,
  "firstName": "Anfisa",
  "id": "7478670974",
  "lastName": "Gromova",
  "messageCount": 46,
  "personalChannel": "KhrESkKEGabl5lqP",
  "personalChannelDate": {
    "$date": "2025-04-25T14:31:23.354Z"
  },
  "lazyCheckDate": {
    "$date": "2025-08-18T15:48:27.599Z"
  },
  "automaticCheckDate": {
    "$date": "2025-08-19T10:24:43.757Z"
  },
  "username": "gromova_gold",
  "remainingTime": {
    "$date": "2025-08-19T00:16:43.104Z"
  }
},
{
  "_id": {
    "$oid": "685f074f3770b19a27ab2207"
  },
  "accountId": "7507993644-prefix-female-gidrovell",
  "dc1": "753a7bd530c01a914693adb12264761538bf6c52a191b2f27406c8359e89057e87f5b530cb2a9a4e826954841dc4309eafe11acdc49bfda292c59cbef10acf946a6934c4a992f12864ac562de080fa04daddb31096a62e3d43ccf70925aa4e6e65468c43e4ddf4ee57ebbec2f26c5b2bb8ef428bc3e8d1bc6a2dedb83e57857aab02bb43fee69663dc3e701dfdb35629b0c1cf70b2deb350a7986a4cd702853c877b8de34aacc24392a6439e37540f926d1db7050ff2b019f54c85b4052c8a39b3c01386b0974706b20da65482b8caf2ed4c042d012c09e8c4cc81963a074aa357239c6924ce9614c5cda80ff2bd06aad9aee30bfb81c5aba60398dcede78d7d",
  "dcId": 1,
  "nextApiId": 2040,
  "dateUpdated": {
    "$date": "2025-08-19T10:37:29.095Z"
  },
  "twoFa": false,
  "twoFaDate": {
    "$date": "2025-08-18T10:48:08.440Z"
  },
  "phone": "+529951028116",
  "banned": false,
  "firstName": "Liza",
  "id": "7507993644",
  "lastName": "Semenova",
  "messageCount": 26,
  "username": "semenova_striking",
  "personalChannelDate": {
    "$date": "2025-08-16T21:17:20.030Z"
  },
  "personalChannelError": "CHANNEL_NOT_FOUND",
  "lazyCheckDate": {
    "$date": "2025-08-18T20:02:36.909Z"
  },
  "automaticCheckDate": {
    "$date": "2025-08-19T10:37:29.095Z"
  },
  "remainingTime": {
    "$date": "2025-08-11T12:08:26.338Z"
  }
},
{
  "_id": {
    "$oid": "685f07503770b19a27ab2256"
  },
  "accountId": "7512349990-prefix-female-gidrovell",
  "dc1": "c716adf4deed33d1586d7f09a3cda27e576ffcaccc8773c55497b65a627dafe63fe6b591a56ec42ad45d1119e1d047d923f57feb0c06173ab8e1d69a79b32b87ea43e8703c385a9394a0eb0d5550a7f01658e77fab1179dad05d5da8c3cb57ead39a7995d01c23c3f2f14d1e6e9ca469e10577862f6b71c9ab466457b84cccdf57861722e52095f604ef9332877a82cfb5216ba693714c4f949d02a0353bec5fa9e7a6330385c5e264de815d37e7654fe2e20b219cf98ae6d039984c74d4a9764f2f8d00bff30bffc41d9aecbb31624803bfcd2873dc44fe152ac264a19ab9a671fd3bbdd62eb22baa410b7d550f2cf9e72d7a9285b14f9389cc7e4b5f025199",
  "dcId": 1,
  "nextApiId": 2040,
  "dateUpdated": {
    "$date": "2025-08-19T10:13:30.210Z"
  },
  "twoFa": false,
  "twoFaDate": {
    "$date": "2025-08-18T10:48:02.610Z"
  },
  "phone": "+522221923949",
  "banned": false,
  "firstName": "Irina",
  "id": "7512349990",
  "lastName": "Shumilova",
  "messageCount": 27,
  "username": "shumilova_superior",
  "personalChannelDate": {
    "$date": "2025-08-16T21:17:20.030Z"
  },
  "personalChannelError": "CHANNEL_NOT_FOUND",
  "lazyCheckDate": {
    "$date": "2025-08-18T22:49:52.443Z"
  },
  "automaticCheckDate": {
    "$date": "2025-08-19T10:13:30.210Z"
  },
  "remainingTime": {
    "$date": "2025-08-11T12:06:24.334Z"
  }
},
{
  "_id": {
    "$oid": "685f074e3770b19a27ab21cf"
  },
  "accountId": "7512889685-prefix-female-gidrovell",
  "dc1": "8aa11ca3fc135146c37b0d983fd3f949f0a007630e516df84bf6748ebf9f5fb2dc4dbd31a09e7e4f2640f7cb00bc9a43cf95e9c112813a462cb03488d55e6d71af992ac1f8ffaffd19b93c85b05d2edf05cf7249b67f930aee6829b150c513bf1515ff6f3a11b232d7a03e786bba361783d7077747af84c4807730b28525fdaf7ad997811c959bc51d771b4ecb1a972e11a75fc73f41f3817bf01ce9e1687d4cbe86be62235b5e0a0ee745a6e12bca128bd922eb0ffe417c32d885ebbf23e2fd37df9a0385fce460751b4e7bf6d853822505a7a8da33aba07518cec1da11075ba32d8fa0276a0ea50667a7d022ff1fa64809518924f28b257a5834034ee599a5",
  "dcId": 1,
  "nextApiId": 2040,
  "dateUpdated": {
    "$date": "2025-08-19T10:35:23.773Z"
  },
  "twoFa": false,
  "twoFaDate": {
    "$date": "2025-08-18T10:47:56.546Z"
  },
  "phone": "+525614344871",
  "banned": false,
  "firstName": "Alla",
  "id": "7512889685",
  "lastName": "Filatova",
  "messageCount": 24,
  "username": "filatova_inherent",
  "personalChannelDate": {
    "$date": "2025-08-16T21:17:20.209Z"
  },
  "personalChannelError": "CHANNEL_NOT_FOUND",
  "lazyCheckDate": {
    "$date": "2025-08-18T23:05:49.130Z"
  },
  "automaticCheckDate": {
    "$date": "2025-08-19T10:35:23.773Z"
  },
  "remainingTime": {
    "$date": "2025-08-06T14:08:53.894Z"
  }
},
{
  "_id": {
    "$oid": "685f07493770b19a27ab2007"
  },
  "accountId": "7518170003-prefix-female-gidrovell",
  "dc1": "650bbc713663effaa8701b84ed39c54a5e359febbdb1c452141749559459f502bd9112c32a966e1bb11a678ba5ba74df5045cc1ef6f97a6a2ef14e35773a8e46660c85d9c02242ae08a44fc4c5dd23059796ba2887b59343668cea5a4abca1a73f673f2e48cf92946cfbe452be9bcf5b75aa44e20321a23068a9abc4b1f9c91d8387bc099654629d96676b11d955077daf1fd2e29cb2c9a860c3694c6b0e5ce679be57eed084f7b9c2c5deb98ac0b3a3bf0759dc48fa78adaed009d06df515bda8918f672671a6fe476e11a821f3aac3e0e48454528cce1d51bbc89a84d89097490e55a3ed2ff7a068dfa9f8ffa09a448b5be4e432d39e82d31fcec08cd614f1",
  "dcId": 1,
  "nextApiId": 2040,
  "dateUpdated": {
    "$date": "2025-08-19T10:33:42.559Z"
  },
  "twoFa": false,
  "twoFaDate": {
    "$date": "2025-08-18T10:47:47.152Z"
  },
  "phone": "+543804100158",
  "banned": false,
  "firstName": "Evgenia",
  "id": "7518170003",
  "lastName": "Mironova",
  "messageCount": 31,
  "username": "mironova_cheap",
  "personalChannelDate": {
    "$date": "2025-08-16T21:17:23.609Z"
  },
  "personalChannelError": "CHANNEL_NOT_FOUND",
  "lazyCheckDate": {
    "$date": "2025-08-18T22:16:36.088Z"
  },
  "automaticCheckDate": {
    "$date": "2025-08-19T10:33:42.559Z"
  },
  "remainingTime": {
    "$date": "2025-08-06T14:09:34.310Z"
  },
  "historySpamBlocks": [
    {
      "spamBlockDate": {
        "$date": "2025-07-09T07:28:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-08-09T13:42:00.000Z"
      },
      "spamBlockDays": 3
    }
  ]
},
{
  "_id": {
    "$oid": "683b23e53770b19a277f47bc"
  },
  "accountId": "7593088039-prefix-elba",
  "dc1": "435db66ff66aa6a63d7d9d1ec71aceeeace0e0e217fe18cc8260d33f3c7c25f004befa38e24ff3c3d62d4642b65108a96eee19e01f8150415818e8a47ad19a686c87890eff2fc09482f05111cdf3875a30e52ae5cd57c676ae16a86ee8150c8f1f3d948588f1aa4317bd256853854f5d7bf170fb3bcf0f6ba995d4a3cb5ae67bddce5bf8ac940a36a7d1c5164daa9aa50cb67fa079b4b584e1d6247406b861f4554c6bcbf4e305d9074fd04e2d9fe019e721cde005218475a6c257fdea03db26d19ca80d8547a7d85e84148645781cf7d493bbc25628a73bab17f2ef62a5053f622a4eb145ca4cbb2e8a10dd2a6fb75ea935aae32acbf7a803d58187a6ba1445",
  "dcId": 1,
  "nextApiId": 2040,
  "dateUpdated": {
    "$date": "2025-08-19T10:17:23.200Z"
  },
  "twoFa": false,
  "twoFaDate": {
    "$date": "2025-08-18T00:42:38.250Z"
  },
  "phone": "+573143857314",
  "banned": false,
  "firstName": "Dmitriy",
  "id": "7593088039",
  "lastName": "Nikitin",
  "messageCount": 4,
  "username": "nikitin_able",
  "personalChannel": "DMzIcaI0qVWhiwpE",
  "personalChannelDate": {
    "$date": "2025-05-31T16:32:08.159Z"
  },
  "lazyCheckDate": {
    "$date": "2025-08-18T23:39:19.848Z"
  },
  "automaticCheckDate": {
    "$date": "2025-08-19T10:17:23.200Z"
  },
  "remainingTime": {
    "$date": "2025-08-09T10:21:29.578Z"
  }
},
{
  "_id": {
    "$oid": "680ebc55461801f599f38b13"
  },
  "accountId": "7595492772-prefix-bls",
  "dc4": "753b584ae7bd72e51afab00ab266516618d7d6a0458a97cd581824842b2526b0fc826bb2e2c2459f5ca019114d849bf227f67bb67290f5a6c89977c0723f73aa4a775e4e26e80d9d53aadbd213b4468fe2a4f06f8c12143c1e84ea93caf871c10c3b3e1c20fab2db2f4ad1482a14af075572f9d9aaee5a03b80bad1923147f19e97730b0498d091e8ae51d3ed3382ce884f760f58b1896412f3e7e2d598926099debc5c33a3c5641a0aa1f86e96005149245b51beaa65e4ec51605d0d0fc9d1a9dd7fe163e3b8c284bf78d680620671945480fbad76c11817d08e83d6dcbbd602617d6371151deb80b5c7196f5a098a529afbaed3e02dbff6f591507766c4c52",
  "dcId": 4,
  "nextApiId": 2040,
  "dateUpdated": {
    "$date": "2025-08-19T10:20:24.752Z"
  },
  "twoFa": false,
  "twoFaDate": {
    "$date": "2025-08-17T20:15:25.897Z"
  },
  "phone": "+201279210364",
  "banned": false,
  "firstName": "Nikolay",
  "id": "7595492772",
  "lastName": "Markov",
  "messageCount": 10,
  "username": "markov_reluctant",
  "personalChannelDate": {
    "$date": "2025-05-23T08:03:28.226Z"
  },
  "lazyCheckDate": {
    "$date": "2025-08-18T15:50:25.334Z"
  },
  "automaticCheckDate": {
    "$date": "2025-08-19T10:20:24.752Z"
  },
  "personalChannel": "JNwcAD3uljonhuGz",
  "remainingTime": {
    "$date": "2025-05-28T09:24:04.491Z"
  }
},
{
  "_id": {
    "$oid": "683b23e63770b19a277f480c"
  },
  "accountId": "7647100170-prefix-elba",
  "dc2": "81eb3a04ade0f0ddd04989985be9c57dbbba0fe08592c9e69bfb1a3a3de643fb71c5212fa835133a95aea650461467db062df28871f21273f7de95e9cf8a1e35581ddba995ee1ada9a1d728b0567a23556b52e6a3c109481853204413e809c06997d864d3570d94587057aba3b29e5dcc5d21afd51c42ed10a11d7e5e469cf09acc9a78cd62743bc067859f1d9b86192b725793a5a7cc16c94b077a32cc2da8c3813f43e3883fc3a170bd93f60a8ff8d17e866fe8dbc66c1626b33fee9e35daddfdfc59113abd79b5d33155f126ca6b4dee878b104e7528d804f851a34e04a1e8c6822684c91ad2c4b16eddf16bbb5a3e86ef957ffa677d6eb4acc1e9d5097ff",
  "dcId": 2,
  "nextApiId": 2040,
  "dateUpdated": {
    "$date": "2025-08-19T10:33:19.044Z"
  },
  "twoFa": false,
  "twoFaDate": {
    "$date": "2025-08-18T00:42:29.984Z"
  },
  "phone": "+998919262624",
  "banned": false,
  "firstName": "Vitaliy",
  "id": "7647100170",
  "lastName": "Belov",
  "messageCount": 22,
  "username": "belov_static",
  "personalChannel": "qXlKCQ3MgKTVHJXS",
  "personalChannelDate": {
    "$date": "2025-05-31T16:34:19.051Z"
  },
  "lazyCheckDate": {
    "$date": "2025-08-18T22:25:27.390Z"
  },
  "automaticCheckDate": {
    "$date": "2025-08-19T10:33:19.043Z"
  },
  "remainingTime": {
    "$date": "2025-08-09T14:39:37.035Z"
  }
},
{
  "_id": {
    "$oid": "683b23e83770b19a277f48ac"
  },
  "accountId": "7670611960-prefix-elba",
  "dc1": "31547a1e87a0d7e5cf211f26d6977d7347795dee91d47e2d889c2bbefda26a2ce8a3cc8baf5fd06dfc8d19fbe09c2e70b665a835d0f17a1ccc02b719e92d4d1ea1f055ec6b7e6b531745b0b2051b0f324031b210280822e0abbf8806134e5138cb8a80d328a9c15d7d2d02b23bf0bdac1cb5e19afe9da2e466d493084e1f21104c8275313e422d5016b5e202108d0b66fa8d4007de40adff5aff4684878eae7f51707182f008b908fff1123533cb5a2129ac71cc3e2eefbe1164161e1edbe27b5426eb29ee1324a92c09f2438378ea38e86c67c904f83f10b3aeea25998320dd4a1ef9317a61d62669f65c4ab2141c6fdf16c8c6fd759bac64e3508d8aed787b",
  "dcId": 1,
  "nextApiId": 2040,
  "dateUpdated": {
    "$date": "2025-08-19T10:15:23.319Z"
  },
  "twoFa": false,
  "twoFaDate": {
    "$date": "2025-08-18T00:42:33.707Z"
  },
  "phone": "+573245399932",
  "banned": false,
  "firstName": "Fedor",
  "id": "7670611960",
  "lastName": "Kozlov",
  "messageCount": 6,
  "username": "kozlov_overwhelming",
  "personalChannel": "MtxkTVD0nznrETIW",
  "personalChannelDate": {
    "$date": "2025-05-31T16:31:34.678Z"
  },
  "lazyCheckDate": {
    "$date": "2025-08-19T03:16:47.883Z"
  },
  "automaticCheckDate": {
    "$date": "2025-08-19T10:15:23.319Z"
  },
  "remainingTime": {
    "$date": "2025-08-11T19:29:54.236Z"
  }
},
{
  "_id": {
    "$oid": "685f074a3770b19a27ab2085"
  },
  "accountId": "7710774774-prefix-female-gidrovell",
  "dc1": "18d0cd454595b9d005be61aff32a0ece793c826a140c170c08b78a53cf7e4c499afdba417c176c339d3adfb67bc8a2c0ad210aa205415c1423f586c90a11ea8d610b0c0307bc890c856f60fe76b9ac06f36ac5b0936265f517b05991fd3dd1599e9bf12f0ae7fe6430ab341ae0125e94c9e4719d47b050794e75b1a79f1cebb4a50a77bb01138cba0d2082bfb17757f70e05f23cd1532453c7c62fbd68d096e63c94b02e18206a6182648d55424dcdc8a0dbc598eae456190c7e8dbcfc570b382a03e9bcef992f9984816c173b792c834167dd7fab6f5e7ffa8eca5094b2fa06700c56defadcff96ce1f7c2ab91e82ba8e28502d7674a0c79b12bc2af3df2550",
  "dcId": 1,
  "nextApiId": 2040,
  "dateUpdated": {
    "$date": "2025-08-19T10:29:16.668Z"
  },
  "twoFa": false,
  "twoFaDate": {
    "$date": "2025-08-18T10:47:51.230Z"
  },
  "phone": "+543624379907",
  "banned": false,
  "firstName": "Maria",
  "id": "7710774774",
  "lastName": "Ermakova",
  "messageCount": 29,
  "username": "ermakova_plum",
  "personalChannelDate": {
    "$date": "2025-08-16T21:17:17.764Z"
  },
  "personalChannelError": "CHANNEL_NOT_FOUND",
  "lazyCheckDate": {
    "$date": "2025-08-18T23:37:15.161Z"
  },
  "automaticCheckDate": {
    "$date": "2025-08-19T10:29:16.667Z"
  },
  "remainingTime": {
    "$date": "2025-08-05T13:55:37.510Z"
  }
},
{
  "_id": {
    "$oid": "683b23e53770b19a277f47e6"
  },
  "accountId": "7720412067-prefix-elba",
  "dc2": "5eb0707d1c78a06c2ee3ef318987a132ba22d9085d3957fa85999a00241c325e0b692d5a1300a57f8297cc46502a20851befb3587a33bed29caf43273bdfaad76a305e106a7f5f047db056342107817b2a890ec2bc8e5715357c04b7892edf7144ae462df26a24e130f4d8f3021a84c2e5be80d7b57c8f9e21e0d6a9ef25ba22d23973d839640528c261763f3a472170ccefe7241a410e43d920097f4f6eddfcb5b13a482007f45764d8dc54b373692d0a2ef8f57bc38bbe8834487a275b40372a5f553d0d4eea434b42efddccb4965e642188e1d8d63ec38d847f86a1b326e0f425089fd2dce8dbce18d4ddbbd12cae177975b602c2739a8dc540e5f33e3b03",
  "dcId": 2,
  "nextApiId": 2040,
  "dateUpdated": {
    "$date": "2025-08-19T10:36:22.572Z"
  },
  "twoFa": false,
  "twoFaDate": {
    "$date": "2025-08-18T00:42:45.046Z"
  },
  "phone": "+998930021766",
  "banned": false,
  "firstName": "Egor",
  "id": "7720412067",
  "lastName": "Loginov",
  "messageCount": 24,
  "username": "loginov_disciplinary",
  "personalChannel": "bCvWw6vlLGOkBsOn",
  "personalChannelDate": {
    "$date": "2025-05-31T16:32:57.632Z"
  },
  "lazyCheckDate": {
    "$date": "2025-08-18T20:37:34.282Z"
  },
  "automaticCheckDate": {
    "$date": "2025-08-19T10:36:22.572Z"
  },
  "remainingTime": {
    "$date": "2025-08-09T15:14:26.772Z"
  }
},
{
  "_id": {
    "$oid": "685f074f3770b19a27ab2223"
  },
  "accountId": "7723867875-prefix-female-gidrovell",
  "dc1": "7d76a9bb420620dd133db3c6989edbd711c4661bb60ad976eb5c9a22f972cc39c6fc6475ac4ce193df30f24bc947b6e7e71785ca132584b6a8ae1ca18155fa7cab9d6b2e13dceba11caec0c8923faaa31d87b715cc23862f856a77048ebf0dc320db4890dab99447dac967d788e164b685f337c2c53d1d4ed55420d1b8035d86ba4c8ffa1f101dcce30fbaa6b228878284d76117d06cc40a1a6b8c9d072a1ed6e8492b6996010f21bc2dbe585359489940da526b3e8f89c01862ba7a5c5b8a8ac395fa4999907d82872bf14cc91c56beaca3f88df4d7306b44ac68ab00e3e48b61749381cd0f511c97179257ab5f5982dd322075dd052a018afb77f4a846e694",
  "dcId": 1,
  "nextApiId": 2040,
  "dateUpdated": {
    "$date": "2025-08-19T10:12:30.890Z"
  },
  "twoFa": false,
  "twoFaDate": {
    "$date": "2025-08-18T10:48:00.110Z"
  },
  "phone": "+524438923627",
  "banned": false,
  "firstName": "Anfisa",
  "id": "7723867875",
  "lastName": "Shumilova",
  "messageCount": 28,
  "username": "shumilova_drunk",
  "personalChannelDate": {
    "$date": "2025-08-16T21:17:20.032Z"
  },
  "personalChannelError": "CHANNEL_NOT_FOUND",
  "lazyCheckDate": {
    "$date": "2025-08-18T19:22:17.879Z"
  },
  "automaticCheckDate": {
    "$date": "2025-08-19T10:12:30.890Z"
  },
  "remainingTime": {
    "$date": "2025-08-11T12:25:38.662Z"
  }
},
{
  "_id": {
    "$oid": "6810c3b4461801f5990b9804"
  },
  "accountId": "7842218648-prefix-elba",
  "dc4": "37b01f6f9ac09e2529272c8d1997e87122943ad09c67d20d5470a087634b582f44ac7eb62451f11a3837a7885d0db0990ecc3759182ea5d45ef8bffd644f7c36f66692fc30aa4718e46aca5e1834241ac2989da7df23c7a09c5dc2fcce3dab0bf47d9187ec9e0744fd3bb7366cb4492416ef1e66438203103b36845866fa73c92371f81030ef34a111810bfa4676dd1bca1e32633acb231b534635f2a1bf085b71cb84bc49e492518772be162d9bb740f509441ad3b95f018fa9cc7ca71943c21c751daf1241d87f38d3213b1b675326a5e5072a86717fb5b78b6231ffeacf65e8b32049fe02456f45311001ac430ca9605160f7f79e2fc4734f0a6856aa4ef6",
  "dcId": 4,
  "nextApiId": 2040,
  "dateUpdated": {
    "$date": "2025-08-19T10:15:29.787Z"
  },
  "twoFa": false,
  "twoFaDate": {
    "$date": "2025-08-19T02:19:50.347Z"
  },
  "phone": "+201033677563",
  "banned": false,
  "firstName": "Ruslan",
  "id": "7842218648",
  "lastName": "Egorov",
  "messageCount": 31,
  "username": "egorov_selfish",
  "personalChannel": "ub4GbImBUAXcuNab",
  "personalChannelDate": {
    "$date": "2025-04-29T13:15:57.435Z"
  },
  "lazyCheckDate": {
    "$date": "2025-08-18T14:10:08.311Z"
  },
  "automaticCheckDate": {
    "$date": "2025-08-19T10:15:29.787Z"
  },
  "remainingTime": {
    "$date": "2025-08-09T10:13:53.192Z"
  },
  "historySpamBlocks": [
    {
      "spamBlockDate": {
        "$date": "2025-05-30T18:10:00.000Z"
      },
      "spamBlockDays": 1
    }
  ]
},
{
  "_id": {
    "$oid": "683b23e73770b19a277f4875"
  },
  "accountId": "7882869631-prefix-elba",
  "dc1": "391a654b9acb6cc6802ea2796ec9968263f3648c99a2d092141160a1d1a99201a9713995718420111f20ad8007d02856abcbd701105e054ff678a611b90f78d71aa641f7a39df97c64fe569cf812241d6c924d4e5060acb9920d0cd4fd78bdaff86e0e2a97811cdc6090b8d9c65567f1299f85d17a30a7cb4e83f899ffdf22a5e92f118ded0a465cc792847f30c58e8627a31df012497b3d4975a3f9a04d344d4da7a8325291b4e1c7a6979ff01fe519bc39395872923100fea9e766dbb8d4c98d54bbb0665245855a80c367b1d45c74d0f2a262901f7b894a04d16a73130382a87a43fa9b7bfd8d5cd98b6de0513f2c40d50c5b0aa1a62448c807a5766f6ecb",
  "dcId": 1,
  "nextApiId": 2040,
  "dateUpdated": {
    "$date": "2025-08-19T10:18:26.627Z"
  },
  "twoFa": false,
  "twoFaDate": {
    "$date": "2025-08-18T00:42:30.046Z"
  },
  "phone": "+573245505749",
  "banned": false,
  "firstName": "Victor",
  "id": "7882869631",
  "lastName": "Zyuzin",
  "messageCount": 5,
  "username": "zyuzin_simple",
  "personalChannel": "QlXHJRPt8iUoJTzX",
  "personalChannelDate": {
    "$date": "2025-05-31T16:33:42.935Z"
  },
  "lazyCheckDate": {
    "$date": "2025-08-18T20:43:41.427Z"
  },
  "automaticCheckDate": {
    "$date": "2025-08-19T10:18:26.627Z"
  },
  "remainingTime": {
    "$date": "2025-08-11T16:27:25.343Z"
  }
},
{
  "_id": {
    "$oid": "683b23e83770b19a277f48d1"
  },
  "accountId": "7911691018-prefix-elba",
  "dc1": "9d3705513ae5b55bf44d549260d3e5dbb7e4111f4e629e5c664599d14f5e1ec2f776c61ba66c65ea28c3116c83634f53a1ff085ee74e6e0c19c33496bea21972e9cd5da3b1eb45d79f74243193529becb0df45bbd20f2f2e2c7956bcf001548cf5933f7a6f9319c9373362d73fa614ebdb759b5960afaa45b8bd67ee670d12b608e3cfa9df43f8674fbb66f13d0130174a6e538343424a1df1fe71f556e410cb8beada85fa788ecbc7e9c1ca0c9eada1776b3311e780cae49baaa218b04774d2bd2625089f19380bf86cb8e4a1478cddfd6a00408fcb9ac5d2144fbf441e7a761e317ef08efa827f7347130e599b0157cc9c6881f9470735128b1439570bbeab",
  "dcId": 1,
  "nextApiId": 2040,
  "dateUpdated": {
    "$date": "2025-08-19T10:27:26.620Z"
  },
  "twoFa": false,
  "twoFaDate": {
    "$date": "2025-08-18T00:42:33.705Z"
  },
  "phone": "+573138145659",
  "banned": false,
  "firstName": "Boris",
  "id": "7911691018",
  "lastName": "Ziminov",
  "messageCount": 4,
  "username": "ziminov_live",
  "personalChannelDate": {
    "$date": "2025-05-31T23:15:07.592Z"
  },
  "lazyCheckDate": {
    "$date": "2025-08-19T00:04:22.507Z"
  },
  "automaticCheckDate": {
    "$date": "2025-08-19T10:27:26.620Z"
  },
  "remainingTime": {
    "$date": "2025-08-09T10:23:18.657Z"
  },
  "personalChannel": "joorZqi4pgcyGPHS"
},
{
  "_id": {
    "$oid": "680ebc55461801f599f38a7a"
  },
  "accountId": "8049768664-prefix-bls",
  "dc4": "036283bf46212721e2312b016f671c7ed4cabc91177cb38659b27f158b84626d8e9eccd215a56799315e01bf6966833ac448f228a9fed712c61086cd9d20e94fb0afcd3001f00c057a291b6f64dadf7b66d9eec2710bc95ca26b137084e6a954a07a78520fdbbb8f5bb906029ba1be1bd6c39faa595cc3d0d5e9fef7fcb040b86f29552e4dd9db5d7aeeaa2933df69d5d5b426534909edccb8e66466a26e508cc84f8c9bc35081d0c815dd82077786d454e117c7b11cb9f054c5860aa26d2221b96e8910aa5b306e9c0f89c65c7a73cbadec47138c87ad3f82336c867e921b516ca98fb15e4c3c2369f5d8dd7e96253ad19b1d31b5b6b9208132204cae8a6b69",
  "dcId": 4,
  "nextApiId": 2040,
  "dateUpdated": {
    "$date": "2025-08-19T10:13:34.509Z"
  },
  "twoFa": false,
  "twoFaDate": {
    "$date": "2025-08-17T20:15:25.785Z"
  },
  "phone": "+201032913127",
  "banned": false,
  "firstName": "Alexey",
  "id": "8049768664",
  "lastName": "Simonov",
  "messageCount": 7,
  "username": "simonov_adverse",
  "personalChannelDate": {
    "$date": "2025-05-23T08:00:00.968Z"
  },
  "lazyCheckDate": {
    "$date": "2025-08-19T00:19:00.248Z"
  },
  "automaticCheckDate": {
    "$date": "2025-08-19T10:13:34.509Z"
  },
  "personalChannel": "Z8BNxnsxABRJSdie",
  "remainingTime": {
    "$date": "2025-05-28T09:23:25.121Z"
  }
}]

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
        accountId: `${id}-prefix-second-female-phone-wellside`,
        dcId,
        nextApiId,
        reason: null,
        banned: false,
        username: null
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
