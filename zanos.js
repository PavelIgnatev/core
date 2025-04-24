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
    "$oid": "679d8382c1627816399679c3"
  },
  "accountId": "1318642590",
  "dc2": "80acf657d1d2c7d7ca9ee8bc4a494776a4aeaa60dde736894400ff78d4003967a12ff4dd2785b3bcb1440def75480efbd7902321195daab7c86c1e3ebe37a50f13d544844be30b0816d78549f85f2026192d8e347e263ef51b2a15fb24a4f75d22b0a90d0379a003be2a7d1b78eab99f2a31e568eca1b3d4d7c9023787962375feac837523dca9b7edb3311b6ba32f42a496ef6cdb524d3c8553378e51ff8769fa02208571c7ed00c5cf686b0b9c690c52b5c2284ceaff96feafe2caf868e18984ca0e026ab4323c51abf2714f378686b61bee9527fd5552cb2a865535f270dbf11339ddbe0750a179f9a7262d836b92dd7cb07dec6d1ba1536a1618c9838912",
  "dcId": 2,
  "dateUpdated": {
    "$date": "2025-04-24T10:22:00.055Z"
  },
  "banned": false,
  "firstName": "Mikhail",
  "lastName": "Sysoev",
  "messageCount": 156,
  "username": "sysoev_asleep",
  "id": "1318642590",
  "remainingTime": {
    "$date": "2025-04-24T12:22:00.055Z"
  },
  "historySpamBlocks": [
    {
      "spamBlockDate": {
        "$date": "2025-02-08T05:48:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-17T15:33:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-18T09:35:00.000Z"
      },
      "spamBlockDays": 7
    },
    {
      "spamBlockDate": {
        "$date": "2025-04-23T14:04:00.000Z"
      },
      "spamBlockDays": 30
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-27T13:47:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-31T10:34:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-04-17T10:09:00.000Z"
      },
      "spamBlockDays": 7
    },
    {
      "spamBlockDate": {
        "$date": "2025-04-12T12:17:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-04-19T07:56:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-04-18T09:40:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-04-24T10:12:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-04-23T21:41:00.000Z"
      },
      "spamBlockDays": 1
    }
  ],
  "nextApiId": 2040,
  "twoFa": false,
  "twoFaDate": {
    "$date": "2025-04-22T14:59:07.745Z"
  },
  "automaticCheckDate": {
    "$date": "2025-04-24T10:21:05.348Z"
  },
  "lazyCheckDate": {
    "$date": "2025-04-23T23:08:28.520Z"
  },
  "phone": "+380932243753"
},
{
  "_id": {
    "$oid": "679d8382c162781639967ac9"
  },
  "accountId": "6107552868",
  "dc2": "b4c2cb52f6d3ecab10078659d378905bf4435e909b7afae7d667df10755ca30efc99c1f16780208ec67de25d5cccf1bb23328e01342214df8b42706e8f7cc3bbaed02cf048edcc9b3df83022a044e0e8aec2ff9b76a4d77d18811841dc2b2236f0b188c24d7914c97a2366eb236bdc83941a0e2e630c7228dafdeb33763c60a52d257d4a365ac6a94f59bf9a501e24730b3e7b0c58c5acb8741a450fd59240b3b4a661c3fe486ec949eb5cdfaf0eefc8ecee02b7917fd0177017d41bddeb5a45aa73e3b81d270ce81bda1715dfa4080db3ca2ac3d6d0d187923ae86d11d19b0db1c4e5f3faf832aecab0c3dd49f28f069e8277c078bc7f6d2077e26b1aa1d4aa",
  "dcId": 2,
  "dateUpdated": {
    "$date": "2025-04-24T10:14:42.729Z"
  },
  "banned": false,
  "firstName": "Leonid",
  "lastName": "Trifonov",
  "messageCount": 66,
  "username": "trifonov_yammering",
  "id": "6107552868",
  "historySpamBlocks": [
    {
      "spamBlockDate": "INFINITY",
      "spamBlockDays": 0
    }
  ],
  "nextApiId": 2040,
  "twoFa": false,
  "twoFaDate": {
    "$date": "2025-04-22T14:22:24.562Z"
  },
  "automaticCheckDate": {
    "$date": "2025-04-24T10:14:07.600Z"
  },
  "remainingTime": {
    "$date": "2025-04-24T12:14:42.728Z"
  },
  "lazyCheckDate": {
    "$date": "2025-04-23T22:58:30.603Z"
  },
  "phone": "+380673951828"
},
{
  "_id": {
    "$oid": "67a935a3f5fa1dc494bbe8d2"
  },
  "accountId": "1614395302-prefix-aisender",
  "dc2": "137cad94193da9ef2fe7738a5345609de8f50d7ef47ae13e4822c9a296c05da75937dfcd0d82561628022cbc2847d3a8e34f47e933231e123a2a7caf2d9175f251d2d52e678b9d3e7d256bf24e0db5358d417a116bc6032cd7e67436c49e0343a4e408ddf6bc63b5ac3b1aa3e5edac195f6185659542c36f301990aad335ddf9a2c7f72fe7e5ea24406261d614f97748cb21b5b94bdf0f0ba6947d89ff7febb5ad251e1a5c2a929d93581d7cc6e9a97c2c6dccf63aa10409187ad631074bdc7f78ca44eae04da7a4c20024ac4559202994986d022918dec9b3fe62a98b1e27a002c003fb3baa48dd7a2acdb45b30ba27d575932fa1b85c48b487533124bacc95",
  "dcId": 2,
  "nextApiId": 2040,
  "dateUpdated": {
    "$date": "2025-04-24T10:09:06.173Z"
  },
  "banned": false,
  "firstName": "Ivan",
  "lastName": "Romanov",
  "messageCount": 175,
  "id": "1614395302",
  "remainingTime": {
    "$date": "2025-04-24T11:37:35.037Z"
  },
  "historySpamBlocks": [
    {
      "spamBlockDate": {
        "$date": "2025-02-14T09:03:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-17T10:57:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-22T08:03:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-17T07:45:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-21T19:10:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-28T08:23:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-29T06:28:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-31T15:07:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-04-04T16:49:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-04-12T06:26:00.000Z"
      },
      "spamBlockDays": 7
    },
    {
      "spamBlockDate": {
        "$date": "2025-05-13T05:22:00.000Z"
      },
      "spamBlockDays": 30
    }
  ],
  "twoFa": false,
  "twoFaDate": {
    "$date": "2025-04-22T15:17:07.274Z"
  },
  "automaticCheckDate": {
    "$date": "2025-04-24T10:09:06.173Z"
  },
  "lazyCheckDate": {
    "$date": "2025-04-23T23:04:30.676Z"
  },
  "personalChannel": "MzBmyPmwx0xuycMe",
  "personalChannelDate": {
    "$date": "2025-04-21T10:56:39.119Z"
  },
  "username": "romanov_worried",
  "phone": "+380986021851"
},
{
  "_id": {
    "$oid": "67a935c7f5fa1dc494bbecff"
  },
  "accountId": "7507895166-prefix-aisender",
  "dc2": "c711a0d5ea8c794eda28746954e218d6a11f48eaa9aabec0fe87d32b078e18d73b60e5a6e03bf1f473ea3a543266db7663c82fa3c6dc5a2328342ee9736a2f6fa91c70a24f170d2a039d511285bdc247a9387999b409bf553e8c266169f88287ada95f16f1156439a80ccddad5a4f74aa69caf162de31906ff3651bddf0ed4c06cbda2ab8a1b704f4a6a8885a00a3a3ede96d83a27a20170583775c51008810272e53e401787aa3957e636241964c389508880aae03b297ed0d43272060405d51c80c405ebf249affbe97b72f30231119b0d8243ed6424adb02559b402eae81a0bab34744a281a68101a5991dd5c0e557d8fa6165320ad98c80158ffbdbfa56f",
  "dcId": 2,
  "nextApiId": 2496,
  "dateUpdated": {
    "$date": "2025-04-24T10:11:05.989Z"
  },
  "banned": false,
  "firstName": "Vitaliy",
  "lastName": "Korolev",
  "messageCount": 238,
  "id": "7507895166",
  "remainingTime": {
    "$date": "2025-04-16T09:05:02.968Z"
  },
  "twoFa": false,
  "historySpamBlocks": [
    {
      "spamBlockDate": {
        "$date": "2025-02-21T12:38:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-27T14:07:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-27T15:08:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": "INFINITY",
      "spamBlockDays": 0
    }
  ],
  "twoFaDate": {
    "$date": "2025-04-22T14:22:26.500Z"
  },
  "automaticCheckDate": {
    "$date": "2025-04-24T10:11:05.989Z"
  },
  "lazyCheckDate": {
    "$date": "2025-04-23T14:11:50.237Z"
  },
  "spamBlockReasons": [
    {
      "reason": "My account has been unfairly limited, preventing me from reaching crucial contacts. I havent done anything wrong or dodgy, so Id like my messaging function back. Please review and restore access.",
      "date": {
        "$date": "2025-04-16T13:00:56.290Z"
      }
    },
    {
      "reason": "Id like to report an issue with my account. It seems I cant send messages to anyone except mutual contacts, despite following all rules. Please review my case and restore full messaging access.",
      "date": {
        "$date": "2025-04-17T20:00:28.208Z"
      }
    },
    {
      "reason": "Im confident that my accounts message-sending function was disabled mistakenly. Ive never been involved in any suspicious behavior. Please restore this feature as soon as possible.",
      "date": {
        "$date": "2025-04-19T10:43:10.197Z"
      }
    },
    {
      "reason": "Im unable to message anyone outside my contacts due to an apparent error. I havent violated any rules and request my full messaging capabilities be restored. Thanks for looking into this.",
      "date": {
        "$date": "2025-04-20T16:10:21.988Z"
      }
    },
    {
      "reason": "My accounts functionality needs to be restored so I can reach non-mutual contacts. I believe this limitation was a mistake as I havent done anything wrong. Id appreciate your prompt review.",
      "date": {
        "$date": "2025-04-21T12:05:37.993Z"
      }
    },
    {
      "reason": "I recently encountered an issue with my account. It seems my messaging function has been unexpectedly limited, despite my clean activity record. Please restore this functionality as soon as possible, as its crucial for my work.",
      "date": {
        "$date": "2025-04-21T22:16:36.022Z"
      }
    },
    {
      "reason": "I am unable to message people outside of my mutual contacts, preventing me from reaching important connections. I believe this is a mistake, as I havent done anything wrong or suspicious. Please restore my messaging function.",
      "date": {
        "$date": "2025-04-22T17:13:48.988Z"
      }
    },
    {
      "reason": "My account should be able to message anyone, not just mutual contacts. I havent done anything wrong, so this limit seems unfair. Please review and adjust the settings accordingly.",
      "date": {
        "$date": "2025-04-22T18:35:49.400Z"
      }
    }
  ],
  "spamBlockDate": "INFINITY",
  "spamBlockDays": 0,
  "spamBlockInitDate": {
    "$date": "2025-04-16T13:00:56.418Z"
  },
  "personalChannelDate": {
    "$date": "2025-04-24T06:04:56.387Z"
  },
  "personalChannelError": "USER_RESTRICTED",
  "username": "korolev_ancient",
  "phone": "+380982337604"
},
{
  "_id": {
    "$oid": "67a935cdf5fa1dc494bbede2"
  },
  "accountId": "7496220827-prefix-aisender",
  "dc2": "5644d6fca39c6a755dacdb30dab3e905fd7a144859330824cd1c04a320696c39c9735bf2be78a640dda4ee078961951211374a41279e83a72065641730bfc7def3b073de46022fe5c484627a7499963b1d2f5e9f229a5d2b1736fbf3830f88c62a4d66d0f2c131b7709423f9c6575519dff8ffcdba7b6e5d947fe6347023f9db6ba8929cc2e8640d5f8c28dbe953002fb96958591490dcf936cbfdd87dc2d40849996fa5afa7c9acbbe4a3a7e56ed30ab0de71d61c1fe47e1c8c57d07d09a909067d5c441350241bde0b666ec8ebc57183c200fbaf1ec8d859c263d55b4f9136d47d4d8cf02a6bf911c83e93516de8f3755b7062050a3b67c0321afc284aa91e",
  "dcId": 2,
  "nextApiId": 2040,
  "dateUpdated": {
    "$date": "2025-04-24T10:25:10.220Z"
  },
  "banned": false,
  "firstName": "Vadim",
  "lastName": "Rusanov",
  "messageCount": 85,
  "id": "7496220827",
  "remainingTime": {
    "$date": "2025-04-22T12:23:40.131Z"
  },
  "historySpamBlocks": [
    {
      "spamBlockDate": {
        "$date": "2025-02-12T10:41:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-19T12:41:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-03T10:58:00.000Z"
      },
      "spamBlockDays": 7
    },
    {
      "spamBlockDate": {
        "$date": "2025-04-05T16:08:00.000Z"
      },
      "spamBlockDays": 30
    },
    {
      "spamBlockDate": {
        "$date": "2025-04-05T15:01:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-04-09T07:48:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-04-09T10:07:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-04-12T12:20:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-04-11T05:28:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-04-15T10:19:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-04-29T11:07:00.000Z"
      },
      "spamBlockDays": 7
    },
    {
      "spamBlockDate": {
        "$date": "2025-04-24T18:33:00.000Z"
      },
      "spamBlockDays": 1
    }
  ],
  "twoFa": false,
  "twoFaDate": {
    "$date": "2025-04-22T12:54:30.819Z"
  },
  "automaticCheckDate": {
    "$date": "2025-04-24T10:25:10.220Z"
  },
  "lazyCheckDate": {
    "$date": "2025-04-23T23:10:33.531Z"
  },
  "personalChannel": "WiWx0vTCPpBKfIJC",
  "personalChannelDate": {
    "$date": "2025-04-21T10:57:25.763Z"
  },
  "username": "rusanov_associated",
  "phone": "+380966948780",
  "spamBlockDate": {
    "$date": "2025-04-24T18:33:00.000Z"
  },
  "spamBlockDays": 1,
  "spamBlockInitDate": {
    "$date": "2025-04-23T18:37:07.092Z"
  }
},
{
  "_id": {
    "$oid": "67a9379cf5fa1dc494bc3a08"
  },
  "accountId": "7166781386",
  "dc2": "28684abf2914ad5c6341711042e33d3fdfa426eab9adfaa2c37e75fe3945f284e75b8c949abf43e92326a62d9247c2e423ea6fe34017e4b6ffc2f836833b11e9d1a9837739c86281e3daa77935ab8cdbaf395cd723b2432c6e49b4cdc3d5096fbb7d22e1668e1e655670f5ada42622233e89d7f7e2054b94cc2e0e3dd2a449c5818f8f03a8e2cbe0ae01d8b0df0605b8988a5d963764cfe8f19db6ae081ae04b0d157bc5099af1decd36561f81d641fe4ed2c206050c8c6fc6596cdd73c8387b0c084490709dd95989212a40ab15852de576cf23706b1e9a0540514b2b4459d196f6362d4176e4be9e0d43b966d359a32e01104b837f2dec6d932636454143e1",
  "dcId": 2,
  "nextApiId": 2496,
  "dateUpdated": {
    "$date": "2025-04-24T10:10:09.890Z"
  },
  "banned": false,
  "firstName": "Dmitriy",
  "lastName": "Smirnov",
  "messageCount": 98,
  "username": "smirnov_occasional",
  "id": "7166781386",
  "remainingTime": {
    "$date": "2025-04-24T07:55:06.696Z"
  },
  "historySpamBlocks": [
    {
      "spamBlockDate": {
        "$date": "2025-02-15T10:13:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-24T10:48:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-04T19:10:00.000Z"
      },
      "spamBlockDays": 7
    },
    {
      "spamBlockDate": {
        "$date": "2025-04-04T12:01:00.000Z"
      },
      "spamBlockDays": 30
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-13T10:54:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-17T05:53:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-21T11:56:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-23T06:58:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-25T15:18:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-30T08:11:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-29T09:39:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-04-03T09:28:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-04-17T09:36:00.000Z"
      },
      "spamBlockDays": 7
    },
    {
      "spamBlockDate": {
        "$date": "2025-04-23T18:52:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-04-27T05:55:00.000Z"
      },
      "spamBlockDays": 3
    }
  ],
  "twoFa": false,
  "twoFaDate": {
    "$date": "2025-04-22T12:54:17.496Z"
  },
  "automaticCheckDate": {
    "$date": "2025-04-24T10:10:09.890Z"
  },
  "lazyCheckDate": {
    "$date": "2025-04-23T22:21:44.985Z"
  },
  "phone": "+380983693823",
  "spamBlockDate": {
    "$date": "2025-04-27T05:55:00.000Z"
  },
  "spamBlockDays": 3,
  "spamBlockInitDate": {
    "$date": "2025-04-24T06:20:55.074Z"
  }
},
{
  "_id": {
    "$oid": "67a9379df5fa1dc494bc3a19"
  },
  "accountId": "7270077297",
  "dc2": "724e83bf993f1536292693ec9c99e87a8b233de75e0f398fc43f205fc1317a5b585ca7b27dd77337174c3c7e849d3df2dc5e2ef0e5e12e7ac971ac77d78373cd64414b5df79e2fe8ea4ac566072ea307279644546a754d9f2f9943a3f06030797de6f0b1c1226e50b7e7bc8decaf047b80405e2990acc6edf7f9fc796fd967d9dec3193df282cb9959bb128afd0b3648fd95d8ee0482cb3a5efcd97fb54ed41fd682f9df9f3d2c7f22d8b66371f3894d84678424ec1edafecd9356c4cf4eb3210f8b3d0b2d93797878f4eb2b2a76715f5888189ad59e5258bd3b7ba7d4edf9a3eec49aba51ba80568a4957534b372d9e59fe7fdcfb9cb4f2f0f97b3d44ce2e55",
  "dcId": 2,
  "nextApiId": 2496,
  "dateUpdated": {
    "$date": "2025-04-24T10:22:33.610Z"
  },
  "banned": false,
  "firstName": "Oleg",
  "lastName": "Volkov",
  "messageCount": 142,
  "username": "volkov_quixotic",
  "id": "7270077297",
  "historySpamBlocks": [
    {
      "spamBlockDate": "INFINITY",
      "spamBlockDays": 0
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-24T11:32:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-28T06:10:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-30T08:18:00.000Z"
      },
      "spamBlockDays": 3
    }
  ],
  "twoFa": false,
  "remainingTime": {
    "$date": "2025-04-24T12:22:33.610Z"
  },
  "twoFaDate": {
    "$date": "2025-03-08T07:13:12.410Z"
  },
  "automaticCheckDate": {
    "$date": "2025-04-24T10:22:13.996Z"
  },
  "lazyCheckDate": {
    "$date": "2025-04-23T22:25:48.909Z"
  },
  "phone": "+380997197374"
},
{
  "_id": {
    "$oid": "67a9379df5fa1dc494bc3a31"
  },
  "accountId": "7992561572",
  "dc2": "4e35e92c61e99d58fcac9cbdc7ea5fc160d4cb922f6d0be163ea3b55bbefa0b440f749e6248ec0e41df483e823863843358f3984289740daccc474429eb6f1936d07ed1616469f983340e77ff7f016e61daa0b7a498d4962b55306a30b6ee4a51ea4a479d36538fdd3e7e59922c65b48765c0a7343c43028a9edf1a8f3ecbe79888aa61d1ca543d3771b08ba11dc1866f664fa1ba974ff3ebcdfc562fcb53c967ce10f0a494e7a9dabdaf3626c6c35f2926432d5e70821e33a3bd21f3768ffc73490ba19fb5311e55b4546c1662d8f0f53518a481696483e727751670dc477165a9873987a51bf8ed53c6363e1ba48399f876227cf7e3c6518b8c96e22d3b600",
  "dcId": 2,
  "nextApiId": 2496,
  "dateUpdated": {
    "$date": "2025-04-24T10:13:13.978Z"
  },
  "banned": false,
  "firstName": "Vitaliy",
  "lastName": "Makarov",
  "messageCount": 0,
  "username": "makarov_shaky",
  "id": "7992561572",
  "historySpamBlocks": [
    {
      "spamBlockDate": "INFINITY",
      "spamBlockDays": 0
    }
  ],
  "spamBlockDate": "INFINITY",
  "spamBlockDays": 0,
  "spamBlockInitDate": {
    "$date": "2025-02-09T23:50:44.206Z"
  },
  "twoFa": false,
  "twoFaDate": {
    "$date": "2025-03-05T07:31:02.974Z"
  },
  "automaticCheckDate": {
    "$date": "2025-04-24T10:13:13.978Z"
  },
  "spamBlockReasons": [
    {
      "reason": "My accounts current state hinders my communication with essential contacts, causing major inconvenience. Having never broken any rules, I request lifting this apparent mistake. Kindly restore my full messaging capabilities ASAP.",
      "date": {
        "$date": "2025-03-19T21:01:15.940Z"
      }
    },
    {
      "reason": "Im reaching out to resolve an issue with my account. I believe my messaging capability was mistakenly limited, as Ive not violated any policies. Kindly review and restore my full messaging access.",
      "date": {
        "$date": "2025-03-25T13:20:39.681Z"
      }
    },
    {
      "reason": "Im experiencing an issue with my accounts messaging function. Im unable to message anyone except mutual contacts, which is inconvenient as I need to reach non-mutual important individuals. I believe this restriction is a mistake.",
      "date": {
        "$date": "2025-03-25T16:28:35.343Z"
      }
    },
    {
      "reason": "I need to message new contacts for work, but I cant due to an apparent error. I havent violated any rules, so please restore my messaging functionality.",
      "date": {
        "$date": "2025-03-27T13:17:28.123Z"
      }
    },
    {
      "reason": "I recently lost access to full messaging features despite never breaking any rules. Please review this decision, as it might be a mistake. Id appreciate getting my messaging function back.",
      "date": {
        "$date": "2025-03-27T19:16:12.078Z"
      }
    },
    {
      "reason": "My accounts current messaging restrictions are likely a mistake. Ive done nothing wrong and need full access to work. Please restore my ability to message all contacts.",
      "date": {
        "$date": "2025-04-06T16:37:45.268Z"
      }
    },
    {
      "reason": "I believe my messaging function was mistakenly limited. I need full access now to complete urgent work tasks. Please review and restore my accounts capabilities.",
      "date": {
        "$date": "2025-04-08T17:17:00.879Z"
      }
    },
    {
      "reason": "My accounts messaging feature seems limited despite no policy violations. I need to message someone for work ASAP, so please restore full access quickly. An error perhaps?",
      "date": {
        "$date": "2025-04-09T12:19:22.376Z"
      }
    },
    {
      "reason": "I need to regain full messaging access on my account. I believe this restriction is a mistake, as I havent violated any rules. Please review my case.",
      "date": {
        "$date": "2025-04-10T16:11:55.233Z"
      }
    },
    {
      "reason": "My accounts message function needs to be restored. I didnt break any rules, but I cant contact important people now. Please fix this mistake.",
      "date": {
        "$date": "2025-04-12T15:17:30.518Z"
      }
    },
    {
      "reason": "I believe my accounts messaging function has been limited due to an error. I havent violated any rules and want to ensure this is resolved quickly. Please review and restore full access.",
      "date": {
        "$date": "2025-04-16T07:05:15.571Z"
      }
    },
    {
      "reason": "My account has been incorrectly limited, preventing me from messaging non-mutual contacts. Ive done nothing to trigger this, so please restore full access.",
      "date": {
        "$date": "2025-04-16T10:17:11.782Z"
      }
    },
    {
      "reason": "Id like to regain access to messaging features on my account as soon as possible. I believe this limitation was a mistake, as Ive never broken any rules. Kindly review and restore my full functionality.",
      "date": {
        "$date": "2025-04-16T13:03:56.482Z"
      }
    },
    {
      "reason": "My account has been incorrectly limited to sending messages only to mutual contacts. This issue should be resolved as I havent done anything against the rules. Please restore my full messaging capabilities.",
      "date": {
        "$date": "2025-04-17T19:59:26.965Z"
      }
    },
    {
      "reason": "I believe my accounts messaging function has been limited due to a mistake. I havent violated any rules and wish to regain full access to messaging. Kindly review this issue and restore my ability to message freely.",
      "date": {
        "$date": "2025-04-19T10:41:44.027Z"
      }
    },
    {
      "reason": "Id like to regain full messaging access for my account. The current restriction seems to be a mistake, as I havent violated any rules. Please review my case.",
      "date": {
        "$date": "2025-04-20T16:17:33.269Z"
      }
    },
    {
      "reason": "I cant message anyone outside my contacts, which is affecting my work. Ive done nothing wrong and believe this is a mistake. Please restore my full messaging capabilities ASAP.",
      "date": {
        "$date": "2025-04-21T22:14:57.865Z"
      }
    },
    {
      "reason": "Im unable to message non-mutual contacts due to an apparent error. I request the restoration of full messaging functionality as soon as possible. My work depends on it.",
      "date": {
        "$date": "2025-04-22T18:27:19.924Z"
      }
    }
  ],
  "lazyCheckDate": {
    "$date": "2025-04-23T22:49:33.469Z"
  },
  "phone": "+380996250951"
},
{
  "_id": {
    "$oid": "67a937a1f5fa1dc494bc3a88"
  },
  "accountId": "7575904438",
  "dc2": "139967e6fd9cf545d4f13e86dd11e5683dd118d01d36636a0d838dcfe705f438453194765513a75db36b559aaaf2930973de1a7a4dcffa2bef49d7f31d12d3f29d9eda303c37aed511c39c0c07d5386992a541132aef22532e11ff3a2d7fef0e4794682a759dd6d0263194eceea24ab1e81a0016b27b0ae5ff184456ae068040952ef26d0dd1a014819b806e7cb01f5bd2219dcf744f6ce5d67dc1003186f4c88902104b10f49d17dfb0c3bcf4f15a516026b1b92405e208dd7400eec71a85bae6c755daccf38ed01ea3cfb60d6d05d5791fa8373cf0b748ffc891c902833dc6c7b4fca4a0b0175c32d163ab6650173ef6ef4c47045f889433829a49f8746bee",
  "dcId": 2,
  "nextApiId": 2040,
  "dateUpdated": {
    "$date": "2025-04-24T10:17:00.950Z"
  },
  "banned": false,
  "firstName": "Fedor",
  "lastName": "Morozov",
  "messageCount": 74,
  "username": "morozov_symbolic",
  "id": "7575904438",
  "historySpamBlocks": [
    {
      "spamBlockDate": "INFINITY",
      "spamBlockDays": 0
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-22T11:55:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-04-25T14:47:00.000Z"
      },
      "spamBlockDays": 3
    }
  ],
  "twoFa": false,
  "twoFaDate": {
    "$date": "2025-04-22T14:58:52.985Z"
  },
  "automaticCheckDate": {
    "$date": "2025-04-24T10:17:00.950Z"
  },
  "remainingTime": {
    "$date": "2025-04-24T10:30:20.911Z"
  },
  "lazyCheckDate": {
    "$date": "2025-04-23T13:54:45.865Z"
  },
  "phone": "+380687959649"
},
{
  "_id": {
    "$oid": "67a937a1f5fa1dc494bc3a8c"
  },
  "accountId": "7825791342",
  "dc2": "6efedb486e9fdcd7ca450809df2839ff0bb8b5462f99018d4c37844ed6c8ce7ec8b7a46043caf9231129448973b09212377220b656d42cbf69c45c9860c5494f7df3c77fc5dbf06a0a322644064502b2be014010344b58789a4a5180fa65bd702ed1a8d419caa6b653ee8f1602034a85d03967722a0cbea1c845114aca7da75f5c8dbf90cac57a88555f634c364a89a7789145776dc5763ecb43a95c403256a01b1aa382416aa647499700cd08769b216950a5d7d6afb0c248aff25ec72ed134caaf4fb8a8cd4c0432b088cef9a661b8214f28b7904a6059ed6543d7006aa080b34ca6182786ccf7cc3504643c5a2b0c3ebe9592d132fdfb3f305ad9982fa57c",
  "dcId": 2,
  "nextApiId": 2040,
  "dateUpdated": {
    "$date": "2025-04-24T10:02:14.164Z"
  },
  "banned": false,
  "firstName": "Nikolay",
  "lastName": "Mishin",
  "messageCount": 175,
  "username": "mishin_artificial",
  "id": "7825791342",
  "remainingTime": {
    "$date": "2025-04-24T10:30:23.445Z"
  },
  "historySpamBlocks": [
    {
      "spamBlockDate": {
        "$date": "2025-02-16T05:56:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-24T14:32:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-04-19T13:39:00.000Z"
      },
      "spamBlockDays": 1
    }
  ],
  "twoFa": false,
  "automaticCheckDate": {
    "$date": "2025-04-24T10:02:14.164Z"
  },
  "lazyCheckDate": {
    "$date": "2025-04-23T23:08:36.097Z"
  },
  "phone": "+380930715990"
},
{
  "_id": {
    "$oid": "67a937a9f5fa1dc494bc3b7e"
  },
  "accountId": "6434836414",
  "dc2": "b5bb951a01c745ca1c115b6ff9804c072fe918cd3a283289c563563258d6dc8c53d21ecedd41bdaccc5d3b6a0e876e4bd62011a7a3348dd21c41410ade4b46bbbc57e52b07067a98dff077d75e1f7fdb9f0b044fbecd976b81775a716ebbebb8865ad2aef2cc8ebb09f142b77162c096a0121500319a80bcfadd0f4d0f45f0eacffeef4779d9ebcf1572c51af30f9ac039209f7c97127a5bd890f531acc9b430477296ee91396a3a75b5098aebaead62e5f2997502b8a29401bed8f77999c04b326376e1dcc2db585f0642304f1b82d75f58c4cf34d59b1b83d035e7a53edffb322978bf5495b7813ddd88e19fd0c13ebc1ca0813fad14cf0c35c63068bf2f97",
  "dcId": 2,
  "nextApiId": 2040,
  "dateUpdated": {
    "$date": "2025-04-24T10:17:11.691Z"
  },
  "banned": false,
  "firstName": "Artem",
  "lastName": "Kalinin",
  "messageCount": 135,
  "username": "kalinin_crooked",
  "id": "6434836414",
  "remainingTime": {
    "$date": "2025-04-23T16:49:30.341Z"
  },
  "twoFa": false,
  "historySpamBlocks": [
    {
      "spamBlockDate": {
        "$date": "2025-03-01T12:07:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-09T11:46:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-17T06:45:00.000Z"
      },
      "spamBlockDays": 7
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-12T07:38:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-15T11:01:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-15T12:32:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-24T13:12:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-04-01T09:45:00.000Z"
      },
      "spamBlockDays": 7
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-27T12:39:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-30T13:26:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-04-01T06:11:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-04-04T06:59:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-04-02T21:18:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-04-12T07:47:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-04-12T07:57:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-04-18T17:09:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-04-29T05:12:00.000Z"
      },
      "spamBlockDays": 7
    },
    {
      "spamBlockDate": {
        "$date": "2025-04-24T14:54:00.000Z"
      },
      "spamBlockDays": 1
    }
  ],
  "twoFaDate": {
    "$date": "2025-04-22T15:17:00.449Z"
  },
  "automaticCheckDate": {
    "$date": "2025-04-24T10:17:11.691Z"
  },
  "lazyCheckDate": {
    "$date": "2025-04-23T22:23:50.036Z"
  },
  "phone": "+380962508940",
  "spamBlockDate": {
    "$date": "2025-04-24T14:54:00.000Z"
  },
  "spamBlockDays": 1,
  "spamBlockInitDate": {
    "$date": "2025-04-23T15:36:27.406Z"
  }
},
{
  "_id": {
    "$oid": "67a937b4f5fa1dc494bc3d7a"
  },
  "accountId": "7670966919",
  "dc2": "be33fa2d3d3d594fd92b73714ef4bac036ea2eb34e8434538d2d5f251a176722dce35043f947ef0c334642ea4b2873d55c4dbd093e9c2fcd5f32f1c724857e132f2f9db549884d9781c2344948cfe56f07a76900cc6a3b2cccbcb471c158ab665c740f70c7a5d098ace67a13e97b062cd3e3fd5490a2d4b20d7eb2fe71a7a930724ebe5b04c9390b53366255d500cb2eeefc1d61cf0b1e6bbcccd1d8220075f9c66291840586b7751e4b4407fe200a2944eb56d65111b5030a34f3e9f60661b956f0324970ebbc1c192bdd63340eed0f519778406ff23ad4531dcb78bb6242c59567a1de4a0415be1a338f4a0c08a57df75e9a6be4238ada24293e38c735e0b1",
  "dcId": 2,
  "nextApiId": 2496,
  "dateUpdated": {
    "$date": "2025-04-24T10:05:42.715Z"
  },
  "banned": false,
  "firstName": "Georgiy",
  "lastName": "Bukin",
  "messageCount": 154,
  "username": "bukin_estimated",
  "id": "7670966919",
  "historySpamBlocks": [
    {
      "spamBlockDate": "INFINITY",
      "spamBlockDays": 0
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-29T13:52:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-04-21T10:50:00.000Z"
      },
      "spamBlockDays": 3
    }
  ],
  "remainingTime": {
    "$date": "2025-04-24T12:05:42.714Z"
  },
  "twoFa": false,
  "twoFaDate": {
    "$date": "2025-04-22T14:22:28.168Z"
  },
  "automaticCheckDate": {
    "$date": "2025-04-24T10:05:16.456Z"
  },
  "lazyCheckDate": {
    "$date": "2025-04-23T22:30:49.829Z"
  },
  "phone": "+380932500857"
},
{
  "_id": {
    "$oid": "67a937b9f5fa1dc494bc3f9f"
  },
  "accountId": "7407029442",
  "dc2": "96e7250905cf2a56ed4336fcdb81a6655e738972e93807df207ba1df2788313612156c57d281f32f349118b5f1dd8eebde8f688763bdd9b6941b829b4431b186c078c84d36da951bede8c3f5c3d601eab644f9af407a36848e307ce91ac018e66ad932ac94a279a42391a9b35224986e9608984912f64972d3d94f3372f71c1936d126e97ff23958ca03355a9fa885be27783d1e2c0a9755a651e18c7e08b9ba7d199a325a5964c3f42041e913e0a250bd3535ef831182e5a81090181c0b1e7658b747f0f73db2a285fb93f9aa0b21eebfa90cd2fd94092348594dbc605ffb8df541371b0e2d592c9d62ae7f14a209826690be2a337d800353c00df8403cd52e",
  "dcId": 2,
  "nextApiId": 2496,
  "dateUpdated": {
    "$date": "2025-04-24T10:19:31.124Z"
  },
  "banned": false,
  "firstName": "Denis",
  "lastName": "Makarov",
  "messageCount": 184,
  "username": "makarov_leading",
  "id": "7407029442",
  "remainingTime": {
    "$date": "2025-04-24T12:19:31.124Z"
  },
  "historySpamBlocks": [
    {
      "spamBlockDate": {
        "$date": "2025-02-11T13:47:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-02T05:35:00.000Z"
      },
      "spamBlockDays": 3
    }
  ],
  "twoFa": false,
  "twoFaDate": {
    "$date": "2025-04-22T14:22:28.165Z"
  },
  "automaticCheckDate": {
    "$date": "2025-04-24T10:19:10.383Z"
  },
  "lazyCheckDate": {
    "$date": "2025-04-23T22:32:51.064Z"
  },
  "phone": "+380989774418"
},
{
  "_id": {
    "$oid": "67be710df5fa1dc49479ce41"
  },
  "accountId": "7960758214",
  "dc2": "432b7aaf73ec5519fe73c80ce8142b7cd608bd94992b44cba63963e626b1ed8137cd8a17d147886a42283b14ddf918bead0a6adfcf2c463d436f741011467295f0cbfd7b09963d86ddd739541f01c2dcdf758eb772b0734efee142f18b708b606ab6c6aae40706893ce8ff2fbca6a3fbf60ed40f77d9e8ef51f67e5b4b01942f25593690236a01b7f72aa13367316bac2fff456abec5f39c7029f503d779e1d1938f8ab74c1ccf21587089e80b856f1140c4536677d9d59c1969ed4146f67e83ecfd9f9bb199d9e767f793cdd89b0d6f8965a3a9e1b404b89274e92f67bb10be62be6abca340ed21cce72e980e046e27c7433cd89727e0f4e79f74205d96efa2",
  "dcId": 2,
  "nextApiId": 2040,
  "banned": false,
  "dateUpdated": {
    "$date": "2025-04-24T10:16:04.370Z"
  },
  "firstName": "Matvey",
  "lastName": "Pakhomov",
  "messageCount": 130,
  "username": "pakhomov_successive",
  "id": "7960758214",
  "remainingTime": {
    "$date": "2025-04-23T15:09:49.110Z"
  },
  "automaticCheckDate": {
    "$date": "2025-04-24T10:16:04.370Z"
  },
  "historySpamBlocks": [
    {
      "spamBlockDate": {
        "$date": "2025-03-10T07:18:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-04-24T13:18:00.000Z"
      },
      "spamBlockDays": 1
    }
  ],
  "twoFa": false,
  "twoFaDate": {
    "$date": "2025-04-22T16:47:13.295Z"
  },
  "lazyCheckDate": {
    "$date": "2025-04-23T22:50:24.396Z"
  },
  "phone": "+380991215985",
  "spamBlockReasons": [
    {
      "reason": "Id like to regain access to message anyone on Telegram, as Ive been blocked from doing so recently. Ive never violated any rules, so this must be a mistake. Please review and fix this issue promptly.",
      "date": {
        "$date": "2025-04-23T14:05:59.858Z"
      }
    }
  ],
  "spamBlockDate": {
    "$date": "2025-04-24T13:18:00.000Z"
  },
  "spamBlockDays": 1,
  "spamBlockInitDate": {
    "$date": "2025-04-23T14:05:59.862Z"
  }
},
{
  "_id": {
    "$oid": "67be7127f5fa1dc49479d51c"
  },
  "accountId": "6752270822",
  "dc2": "84f8546210e31604f164c203f3128de7d4422223297c1433a7618cdb8a82ef41751c3be38c3fb90b30cfcad9ce9dbe01b14e132e575c5cae951ea183a1298ca828307f39757753328d11a55df68e1e8e3d81fcf6c9f0f54f95fac5bff846ae5f118033e0eceb1fcf7ab03b2a7280f586a249cd5813bacef12b68ac6b25587c963724c6dfc7587434f01b9403f5b30216449e5a8e8b44f1df47e485e4ef24d2dabff07bf2e64ecb70f27f94b96bffb4e081335ceb74a0cb4e7e9914f977f3917b039d269a04275e70eeaf1bcee2985fd135557d68728f7575a984be8e5c3653056314b15515c9287f47bc0fe332f7fb0077fde26db2e4dc78e13c90eeaea27775",
  "dcId": 2,
  "nextApiId": 2040,
  "banned": false,
  "dateUpdated": {
    "$date": "2025-04-24T10:11:08.143Z"
  },
  "firstName": "Egor",
  "lastName": "Voronin",
  "messageCount": 118,
  "username": "voronin_ministerial",
  "id": "6752270822",
  "twoFa": false,
  "remainingTime": {
    "$date": "2025-04-24T11:46:10.205Z"
  },
  "twoFaDate": {
    "$date": "2025-04-22T16:47:05.289Z"
  },
  "automaticCheckDate": {
    "$date": "2025-04-24T10:11:08.142Z"
  },
  "historySpamBlocks": [
    {
      "spamBlockDate": {
        "$date": "2025-03-13T19:26:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-04-12T11:17:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-04-22T12:57:00.000Z"
      },
      "spamBlockDays": 1
    }
  ],
  "lazyCheckDate": {
    "$date": "2025-04-23T22:51:25.721Z"
  },
  "phone": "+380502390210"
},
{
  "_id": {
    "$oid": "67be7127f5fa1dc49479d51f"
  },
  "accountId": "8187632939",
  "dc2": "ae1e896324cdc2ad963a8048a3ded25320b10d3e43c32a42e7b329323f2192eab6603f464272e3a0153007c67d79285b4f123a962fae681daa6970c51214d81f83e0e6d7533f56cb017da777da46157799b1e3633e12bd7923128d812666badd227488b14826ca27fc3805dc1b210a450dbe5dfb67c45cae6bd4bd8c7a4ce9eb8d292298d43e686e30b591d25d3ce396596ae10a4284e435f87d2e0d0c9c7b7a06c2d6c2bacaa8b7a8030b5bf7dd2ac327067e829754fd700fb0eb8f2889e17828d56eedd1a3c85123392cbef2e8ce43446e4ceb99da2c4322e57ed6be069b4be6c744389e649296166a8cf60acddb1b5f548aee8ff04f393e0bfa6e23e0c179",
  "dcId": 2,
  "nextApiId": 2040,
  "banned": false,
  "dateUpdated": {
    "$date": "2025-04-24T10:11:07.595Z"
  },
  "firstName": "Artur",
  "lastName": "Shumilov",
  "messageCount": 124,
  "username": "shumilov_spontaneous",
  "id": "8187632939",
  "remainingTime": {
    "$date": "2025-04-24T11:29:45.817Z"
  },
  "historySpamBlocks": [
    {
      "spamBlockDate": {
        "$date": "2025-03-03T10:41:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-03T14:35:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-04-24T09:10:00.000Z"
      },
      "spamBlockDays": 3
    }
  ],
  "automaticCheckDate": {
    "$date": "2025-04-24T10:11:07.595Z"
  },
  "lazyCheckDate": {
    "$date": "2025-04-23T22:51:32.035Z"
  },
  "phone": "+380688691391"
},
{
  "_id": {
    "$oid": "67be713bf5fa1dc49479da54"
  },
  "accountId": "6528436900",
  "dc2": "9a030cf625f16780103f28a1210710a8e7c967d3af93159e47c95c6f8d4c392594bb1a1d4a7cdfa224ee0d1366abf4dc87e18487f08389eb4a8fc064b0976064435cab5641f36bcc2d5ced28a35006cbc7a99f823a8917736fabd7dd275f427825b0bc511c7c97df57e72036604f0c6e17e9c97ce9dd8ec888f28f098aa8ee44207f044f0dd3df24b2a2db01f00f609b0c6ec00dc46e3d32f67508483f744b5d8d342879bc18913d72957b0791de72f051e898284bdf85f21329ea99f163b97bbac58cf77fb7dc912cfbcdf3e5ce1feb48e771c1d170e1308b018719e068cde000e5f5df4485aa26546ba4fc534b83cccde2dcbcef150be61bd133a5e4f74de2",
  "dcId": 2,
  "nextApiId": 2040,
  "banned": false,
  "dateUpdated": {
    "$date": "2025-04-24T10:18:58.874Z"
  },
  "firstName": "Anton",
  "lastName": "Malakhov",
  "messageCount": 130,
  "username": "malakhov_horizontal",
  "id": "6528436900",
  "twoFa": false,
  "remainingTime": {
    "$date": "2025-04-24T11:39:40.602Z"
  },
  "twoFaDate": {
    "$date": "2025-04-22T16:47:03.490Z"
  },
  "automaticCheckDate": {
    "$date": "2025-04-24T10:18:58.873Z"
  },
  "historySpamBlocks": [
    {
      "spamBlockDate": {
        "$date": "2025-03-08T13:13:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-30T13:47:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-04-08T07:56:00.000Z"
      },
      "spamBlockDays": 7
    },
    {
      "spamBlockDate": {
        "$date": "2025-04-18T14:56:00.000Z"
      },
      "spamBlockDays": 3
    }
  ],
  "lazyCheckDate": {
    "$date": "2025-04-23T23:22:27.878Z"
  },
  "phone": "+380962968690"
},
{
  "_id": {
    "$oid": "67cadd3cf5fa1dc494e51fe9"
  },
  "accountId": "7943613185-prefix-support",
  "dc1": "56567ab97fd7e11ae9e89b0b3cfdf360718c53f1c30246c3e59af54bb1c4402aa6e24fabdc213b356ea219b049fb67794653be7efe7dddfeaba788178e1334cf24d933da700404c58f96e33f63860acc977a2b04af9a21304239da8487d5d03603be178cfdf51b8566ef38a648d45c7036bdbd9ca7559a8db7b216d6ac0e3031095fdd7ce7fc0ba3c494ad8994f2ae28f56cb8e3494c4a5b419037b474b00dca1aca9aa21fbb27df0ed01d7be1373474ae1ffe04cfff16cab728e0f2ea5df3d820d2016ee4c0960bc19a1e5ca63fb3df6b1c5465556cbe82abe33bb88499253ce3d07876f35f8337a983c13aa17f400743ce278e6f07e13040a644002839680a",
  "dcId": 1,
  "nextApiId": 2496,
  "dateUpdated": {
    "$date": "2025-04-24T10:14:05.743Z"
  },
  "personalChannelDate": {
    "$date": "2025-04-24T06:04:51.204Z"
  },
  "personalChannelError": "CHANNEL_NOT_FOUND",
  "id": "7943613185",
  "banned": false,
  "firstName": "Vitaliy",
  "lastName": "Zaytsev",
  "messageCount": 0,
  "twoFa": false,
  "twoFaDate": {
    "$date": "2025-04-21T21:47:53.123Z"
  },
  "automaticCheckDate": {
    "$date": "2025-04-24T10:14:05.743Z"
  },
  "lazyCheckDate": {
    "$date": "2025-04-23T22:16:53.070Z"
  },
  "username": "zaytsev_powerful",
  "phone": "+526675723801"
},
{
  "_id": {
    "$oid": "67ee8540f5fa1dc494ff5aa4"
  },
  "accountId": "7093002056-prefix-female-quiz",
  "dc1": "71b435df57f995b9fc4b98ef1eabcaa3f86cd5a66d8546b048d605f547ccd2a857135a3510bfe1d6d8ab4471a53bbd5bb96b7da6df94d2919a175328b5be8d2dc31a1c56596b149af223d04041be1cd87af4b934cb79d1e35b5f3309ae655c00598ddb88ca465230246ec294058b10fc2b7e38290bc363aaa02ecb382404c0f6c34918b705e491021ef6236b5905f95f3a5c379cad96919ca09d95f31b138cc95343813b873963f904239460fbc0eab0300ba83173d4347f4a351f18abb25057ae52adbcd592f9efa2b1d3247675d44df5b9cfa56574d96999318e44b8cf6852e66960403dae6d009bbea836ad1ddf716659194dccb0a1584e585e15cc40e7db",
  "dcId": 1,
  "nextApiId": 2496,
  "dateUpdated": {
    "$date": "2025-04-24T10:03:00.574Z"
  },
  "banned": false,
  "firstName": "Albina",
  "id": "7093002056",
  "lastName": "Panfilova",
  "messageCount": 4,
  "twoFa": false,
  "twoFaDate": {
    "$date": "2025-04-21T21:47:46.641Z"
  },
  "automaticCheckDate": {
    "$date": "2025-04-24T10:03:00.574Z"
  },
  "remainingTime": {
    "$date": "2025-04-09T09:58:54.679Z"
  },
  "personalChannelDate": {
    "$date": "2025-04-24T06:04:43.388Z"
  },
  "personalChannelError": "CHANNEL_NOT_FOUND",
  "lazyCheckDate": {
    "$date": "2025-04-23T23:31:22.904Z"
  },
  "username": "panfilova_provincial",
  "phone": "+527291528380"
},
{
  "_id": {
    "$oid": "67ee8548f5fa1dc494ff5c54"
  },
  "accountId": "7409571709-prefix-female-quiz",
  "dc1": "546a1c19ddc96e58acd09cb2506334e0e912097f8bb7786614d646beda5228cc255f0a598df05fb0b641d6e770d6a131c466a4f41b1f32afbdba61ab7a9675d7f130c64d30302921378d2f8418293011780b0ba1d2185abb4cb9bb1d0241d0f2233660a49ef76ceaca6c92775ef6b708322e500e08ee80e9b1678b1f3656932c8a1f2309b79d4adcfa797ea59ea387ea880c8a24531d9e4312fbeb253e855a9dc19b7603acb669b5c7e60501eef9ac54496229853f9fa22b59cb731fa9cce6b43d23f5fe17432d9fb1244d8dcd1f77ae00d8fabfde0cae26dda2d5dd2b18142f28891443eabd16974ebf93366c531b148981180a383d0da461a4dfaff591077e",
  "dcId": 1,
  "nextApiId": 2496,
  "dateUpdated": {
    "$date": "2025-04-24T10:16:56.176Z"
  },
  "banned": false,
  "firstName": "Albina",
  "id": "7409571709",
  "lastName": "Mozharova",
  "messageCount": 3,
  "twoFa": false,
  "twoFaDate": {
    "$date": "2025-04-21T21:48:03.271Z"
  },
  "automaticCheckDate": {
    "$date": "2025-04-24T10:16:56.176Z"
  },
  "remainingTime": {
    "$date": "2025-04-09T10:10:20.132Z"
  },
  "personalChannelDate": {
    "$date": "2025-04-24T06:04:51.626Z"
  },
  "personalChannelError": "CHANNEL_NOT_FOUND",
  "lazyCheckDate": {
    "$date": "2025-04-23T22:08:49.560Z"
  },
  "username": "mozharova_homely",
  "phone": "+543804919322"
},
{
  "_id": {
    "$oid": "67ee8549f5fa1dc494ff5c73"
  },
  "accountId": "5429901707-prefix-female-quiz",
  "dc1": "44e6860b3c36cf384a609c01e035d60008016a404ff45ea0e44055c640a7c2e929bc96b6d4bfe7a420cabc8edbd6b20f89e34c6c0a358e942b54022623ff9ce8ccfbfc13cc596f4edfbfe0c543c8d3bf2236c290c30d168dd6212c741fceff781c7f3d6be12bd9272166a3ecd96af42885c70c58b81ec16eecd3f8a673929c22099344a40d0743d16647a332c182c7050be5d9c32154e70fff7f54ec1b9d9d2624dca6c9c6c21a716b1b7a2040638c6d9a0754e67f767b6c4ba2e4dc57fd5eab179d1c644bf5947eaf05da00ea4466fca641c2f23accd00c82757b64ab5eb6470a794f29cfee3b6be365a40a237e6d6f32d6995278a4c7880b96c6643847bce5",
  "dcId": 1,
  "nextApiId": 2496,
  "dateUpdated": {
    "$date": "2025-04-24T10:23:56.309Z"
  },
  "banned": false,
  "firstName": "Margarita",
  "id": "5429901707",
  "lastName": "Soboleva",
  "messageCount": 4,
  "twoFa": false,
  "twoFaDate": {
    "$date": "2025-04-21T21:47:59.045Z"
  },
  "automaticCheckDate": {
    "$date": "2025-04-24T10:23:56.309Z"
  },
  "remainingTime": {
    "$date": "2025-04-09T10:06:00.051Z"
  },
  "personalChannelDate": {
    "$date": "2025-04-24T06:04:53.179Z"
  },
  "personalChannelError": "CHANNEL_NOT_FOUND",
  "lazyCheckDate": {
    "$date": "2025-04-23T22:22:54.143Z"
  },
  "username": "soboleva_teal",
  "phone": "+543804209490"
},
{
  "_id": {
    "$oid": "67eeb6b1461801f5995cb0b3"
  },
  "accountId": "7788995591-prefix-female-million",
  "dc1": "c54d77516ae6b8b3db47b8139dbc62bbefdd71eac34414f2fd0bfeb8b908fc1e6c3722af5ba1546d9b0a7bd429c68fdae2c01dfc5e166d7f04728bbf849b5bf45c48304bfe8f3c2bebb052bd186b189e8635b41f4e3788aa291e92d92de235be848aa8bab9c04cc2c692e106656dd793ea13359da0071a9cf806e00149cce3698baddd7554c66a7ec3bebb5d05d420b4813bd02c9bd89c6fe13d6cb12ffde986b673138f73e77cf48bb643f63f5b2d6e00592a1510c19b464d9c802f57ec5e74420b4aef13cd9dd6bd68994f9ca88bf1ef3f1a3bc590723d9bb6bb54499ed0b89c0fba1777e53b795dffafc68d68926eb6b4ebde05a4d7afb2e9d3a99281d337",
  "dcId": 1,
  "nextApiId": 2496,
  "dateUpdated": {
    "$date": "2025-04-24T10:09:57.379Z"
  },
  "twoFa": false,
  "twoFaDate": {
    "$date": "2025-04-21T21:47:53.563Z"
  },
  "banned": false,
  "firstName": "Svetlana",
  "id": "7788995591",
  "lastName": "Soboleva",
  "messageCount": 4,
  "personalChannel": "yd9JdfwWYWvNaWRO",
  "personalChannelDate": {
    "$date": "2025-04-03T18:20:58.549Z"
  },
  "automaticCheckDate": {
    "$date": "2025-04-24T10:09:57.379Z"
  },
  "lazyCheckDate": {
    "$date": "2025-04-23T23:05:25.903Z"
  },
  "remainingTime": {
    "$date": "2025-04-15T07:18:31.242Z"
  },
  "username": "soboleva_thirsty",
  "phone": "+525539138074"
},
{
  "_id": {
    "$oid": "67eeba1b461801f5995cffc6"
  },
  "accountId": "7968301801-prefix-female-million",
  "dc2": "b1e17e72e10a9ade88836773c54b5593bcfc50779a037414299415df7d2e864bf09477c00413e081b75a10dd7ae9fe1922615545da15240b7e8a46d5b615f731ad5bdd4e02306ff6be723a3e1777cd60106258c6fe31c9f174eb46fc372fe3ade17fcb1525fce92f6bbffb633da0f74a9bbdac34dc5d1b58e25b5716fb7faf85c33b07985fda6311c0446af11775a407dafbdfb608358bedd6d34260f37f418925a7504f700a20240e441c450912956538ece18cd9c4cf70e16984b8ac2b509db2b2d64dd0c627db4feb76c78add3252966fa0aa1928da75c0215c60d67ee65252cdfd23af4b5df94ac0874bba9e6c8db904018c276ad420e1fbf13f1084c837",
  "dcId": 2,
  "nextApiId": 611335,
  "dateUpdated": {
    "$date": "2025-04-24T10:03:49.096Z"
  },
  "twoFa": false,
  "twoFaDate": {
    "$date": "2025-04-21T21:47:51.609Z"
  },
  "banned": false,
  "firstName": "Lubov",
  "id": "7968301801",
  "lastName": "Tomilova",
  "messageCount": 3,
  "personalChannel": "AqivOGC9sSwYFtnR",
  "personalChannelDate": {
    "$date": "2025-04-03T18:21:31.236Z"
  },
  "automaticCheckDate": {
    "$date": "2025-04-24T10:03:49.096Z"
  },
  "lazyCheckDate": {
    "$date": "2025-04-23T23:41:22.712Z"
  },
  "remainingTime": {
    "$date": "2025-04-15T07:18:26.387Z"
  },
  "username": "tomilova_thick",
  "phone": "+380664452946"
},
{
  "_id": {
    "$oid": "67eeba1c461801f5995cffd7"
  },
  "accountId": "6354159545-prefix-female-million",
  "dc2": "987dbf92101f15125d63f0b1a83004bb86e1575fb8847b4cb0a921cd9813db3e588b5e4bf811f6b4f51baa056878e9df85f176fc82f4dda5a21e88e4cf91b06df2bd490788fff49a237b4dab892066c8c15faee7c3de2eabf248867e89cd8c580d1d5328fbc56964c3b3ac3fdc079f4833d6ed5adfd689b181c376a00707a219fe8749859d16abc7caa0d935bcacd1a17e68b30006641a346c2bab61f9586b0a0353c995655d58bf2b851c76ce05e74222a4275b6e98843c7346d5cc26e7971d7ccd982992686f4797857250a6d3c0419abf0f8fee15dafe1756a21f91abbf5ee9f05724dbf019f1d2c752f616991c3db5900fa2fdd8f9dc0e8be1fc5b0d0670",
  "dcId": 2,
  "nextApiId": 2496,
  "dateUpdated": {
    "$date": "2025-04-24T10:05:48.849Z"
  },
  "twoFa": false,
  "twoFaDate": {
    "$date": "2025-04-21T21:47:48.741Z"
  },
  "banned": false,
  "firstName": "Alisa",
  "id": "6354159545",
  "lastName": "Baranova",
  "messageCount": 2,
  "personalChannel": "DVLOSHXGQhURY1Im",
  "personalChannelDate": {
    "$date": "2025-04-03T18:21:27.880Z"
  },
  "automaticCheckDate": {
    "$date": "2025-04-24T10:05:48.849Z"
  },
  "lazyCheckDate": {
    "$date": "2025-04-23T23:07:21.538Z"
  },
  "remainingTime": {
    "$date": "2025-04-14T14:12:01.163Z"
  },
  "username": "baranova_historical",
  "phone": "+380506749597"
},
{
  "_id": {
    "$oid": "67eeba1d461801f5995d0004"
  },
  "accountId": "7756089236-prefix-female-million",
  "dc2": "aae7daf4ded04cb92343f5099fbab4698ccd1817c8fd49e7426e8226cdee47c43d5dfc68c133722d735ded3813711787032b6b1c19fa326d718aa54811679df52fe8f0d14df49388f56c945d65d63f2df021d5c3ba0ffda0013db0167e720cd5f4dc83aa607910ecea4a848850319cf1156efd700b0587edf9df9fd4ca3b80e5faf89736e462e8938ddde203e97b7cf10e0c1b2ae8ecf8d179cb848f3274aef159acf826b9bbca89806d5bc09ec5cf5f7de9ee8529ac98951f1dd5e43f7bbf314efe59ec0bc5f492bdd244b1d2c15502514d3d41495581d08c3d35ab28d19545af283c45b902edb57adef3ffba07bc32a5a2427aeaf4436667ff81fd457165b8",
  "dcId": 2,
  "nextApiId": 611335,
  "dateUpdated": {
    "$date": "2025-04-24T10:02:54.838Z"
  },
  "twoFa": false,
  "twoFaDate": {
    "$date": "2025-04-21T21:47:53.881Z"
  },
  "personalChannelDate": {
    "$date": "2025-04-24T06:04:55.645Z"
  },
  "personalChannelError": "USER_RESTRICTED",
  "banned": false,
  "firstName": "Anastasia",
  "id": "7756089236",
  "lastName": "Borisova",
  "messageCount": 0,
  "personalChannel": null,
  "automaticCheckDate": {
    "$date": "2025-04-24T10:02:54.837Z"
  },
  "historySpamBlocks": [
    {
      "spamBlockDate": "INFINITY",
      "spamBlockDays": 0
    }
  ],
  "spamBlockDate": "INFINITY",
  "spamBlockDays": 0,
  "spamBlockInitDate": {
    "$date": "2025-04-03T17:13:57.136Z"
  },
  "lazyCheckDate": {
    "$date": "2025-04-23T23:11:21.023Z"
  },
  "spamBlockReasons": [
    {
      "reason": "I need to regain full access to messaging on my account. I havent done anything wrong or suspicious and believe this restriction is a mistake. Please review and correct this error.",
      "date": {
        "$date": "2025-04-08T17:18:57.650Z"
      }
    },
    {
      "reason": "My Telegram account has been mistakenly restricted. Ive never engaged in any malicious activity and request that you restore my full messaging capabilities. Kindly review this matter and reverse the error.",
      "date": {
        "$date": "2025-04-08T18:35:57.144Z"
      }
    },
    {
      "reason": "I believe my accounts messaging functionality was limited by mistake. There has been no suspicious activity from my side. Please review this issue.",
      "date": {
        "$date": "2025-04-09T12:21:28.529Z"
      }
    },
    {
      "reason": "Ive been blocked from messaging non-mutual contacts, despite no rule-breaking behavior. Id appreciate restoring my full messaging function, as its essential for connecting with important people. Please review my account activity.",
      "date": {
        "$date": "2025-04-09T20:02:30.909Z"
      }
    },
    {
      "reason": "Im unable to message new contacts due to an apparent error. Ive not violated any rules or engaged in suspicious activity. Please restore my messaging permissions.",
      "date": {
        "$date": "2025-04-12T15:07:04.386Z"
      }
    },
    {
      "reason": "My messaging function is unfairly restricted, as Ive never spammed or violated any rules. Please review this and restore my full access.",
      "date": {
        "$date": "2025-04-13T15:43:25.929Z"
      }
    },
    {
      "reason": "Ive been mistakenly limited in messaging, affecting my urgent outreach. My activities are harmless, so I request full messaging access. Kindly review and restore.",
      "date": {
        "$date": "2025-04-14T12:22:02.942Z"
      }
    },
    {
      "reason": "I recently noticed a sudden change in my messaging capabilities on Telegram. My messages are limited to mutual contacts only, even though I havent violated any rules. Please review and restore my full messaging functionality.",
      "date": {
        "$date": "2025-04-16T06:54:10.656Z"
      }
    },
    {
      "reason": "Ive been unfairly prevented from messaging certain users, despite following all guidelines. This issue needs urgent attention as I need to reach out to crucial contacts for important matters. Please review and restore my full messaging capabilities.",
      "date": {
        "$date": "2025-04-16T13:02:20.193Z"
      }
    },
    {
      "reason": "Ive been unfairly limited in reaching out to new contacts, despite never breaking any rules. Please restore my full messaging functionality, as this error disrupts my important communication. Id appreciate a quick fix.",
      "date": {
        "$date": "2025-04-17T20:10:38.710Z"
      }
    },
    {
      "reason": "I believe my messaging rights were revoked mistakenly, as I never spammed or violated any rules. Kindly review my case and restore my full access.",
      "date": {
        "$date": "2025-04-19T10:34:44.772Z"
      }
    },
    {
      "reason": "I believe my account has been wrongly flagged. I have always followed community guidelines and have no history of violating rules. Please restore my messaging function so I can resume work communication.",
      "date": {
        "$date": "2025-04-20T12:31:04.700Z"
      }
    },
    {
      "reason": "Ive been unfairly restricted from using Telegrams messaging feature, even though I havent violated any rules. I request that you reinstate my full access, as this action was likely an error. Thanks for your help.",
      "date": {
        "$date": "2025-04-20T16:33:04.767Z"
      }
    },
    {
      "reason": "My accounts message functionality is limited, affecting my ability to communicate. Ive done nothing wrong and believe this is an error. Please restore full access.",
      "date": {
        "$date": "2025-04-21T12:03:03.449Z"
      }
    },
    {
      "reason": "I recently encountered an issue with my Telegram account. Despite being an active and responsible user, Im unable to message non-mutual contacts, limiting my work communication. Please resolve this error soon.",
      "date": {
        "$date": "2025-04-21T22:40:54.724Z"
      }
    },
    {
      "reason": "Im unable to message non-mutual contacts, which is limiting my ability to communicate. I havent violated any rules and would like to get this issue fixed. Please restore my messaging functions.",
      "date": {
        "$date": "2025-04-22T17:03:25.651Z"
      }
    },
    {
      "reason": "My account is incorrectly limited, preventing me from messaging vital contacts. I havent done anything wrong and believe this was a mistake. Please restore my messaging function so I can communicate freely again.",
      "date": {
        "$date": "2025-04-22T18:33:51.828Z"
      }
    }
  ],
  "username": "borisova_yawning",
  "phone": "+380660832560"
},
{
  "_id": {
    "$oid": "67eeba1d461801f5995d0029"
  },
  "accountId": "7916677542-prefix-female-million",
  "dc2": "8e64b0119a0c2d438677a1b52c05871012fd2c7bf6e80ca706acd9995b6c3974e6768adf4d637d6db7a8f2f4e65db781c43ec8d2cba9fd272550f40576bad90a77990c3aeaf04fea690355faf17bb5a14a99759deae1fb68bcf9de84b10804581788efaf4559d49dfa2d8f7baee44335c2f2823c635ccecf695f9363c70556b97c9020940d94c5799655d1e099e665e5ccdccb6ebba5a7879d79e60f3821b888e5e66d8365166a22e7920d9c8c7bfc34a46b2496a5056740e688c2fdfdb9056c711bebbf0440b3dec12c344f6709118f952436937e7c6398d900cc94652fbb891d214b288e98a61352d8e392b82e300189ed937067578e24a4fdaf4b858e4c25",
  "dcId": 2,
  "nextApiId": 2496,
  "dateUpdated": {
    "$date": "2025-04-24T10:20:53.893Z"
  },
  "twoFa": false,
  "twoFaDate": {
    "$date": "2025-04-21T21:47:52.872Z"
  },
  "banned": false,
  "firstName": "Albina",
  "id": "7916677542",
  "lastName": "Vasilyeva",
  "messageCount": 3,
  "personalChannel": "yF4MduNurABQRNXm",
  "personalChannelDate": {
    "$date": "2025-04-04T00:51:36.909Z"
  },
  "automaticCheckDate": {
    "$date": "2025-04-24T10:20:53.893Z"
  },
  "lazyCheckDate": {
    "$date": "2025-04-23T22:49:20.648Z"
  },
  "remainingTime": {
    "$date": "2025-04-15T07:14:08.782Z"
  },
  "username": "vasilyeva_zonal",
  "phone": "+380962646858"
},
{
  "_id": {
    "$oid": "67eeba1e461801f5995d0043"
  },
  "accountId": "7319865561-prefix-female-million",
  "dc2": "5b0197c9cb5dfe3d4afb09c4a8d0253eaf7ea113dd481a94512e7e69e235b3ce7927be6fd148cf8ee14675688add1f32c88e0cd0692893c0bdf4cd81d72e0653fa3fd3e499fe6bbb1a2c3af7dd0b8f5de4faabe79d39f38e3ff973fa11c172031cfbf0b89771d3c8d243bcb6d53aec3d5adad84af917901ec8b64d19f38a108996c1df64e37e7c68ecbb71ee7d1ac4e49ab2b36d0941e398acfbc4b14afb7cf1e7a01f2284c0bbed584c954e15fce54a6a35dbab91b47709e9fd5eefee201e6d066e05114e2b48d8061ff026ff4b5d08cdecd871d3d0a79dc36d4df73fc47f6d8a91ba1f692d8ea7ccdc131f210a3b854d853e0f719d1ba8b70007d6a7a30ddd",
  "dcId": 2,
  "nextApiId": 2496,
  "dateUpdated": {
    "$date": "2025-04-24T09:59:59.217Z"
  },
  "twoFa": false,
  "twoFaDate": {
    "$date": "2025-04-21T21:47:56.987Z"
  },
  "banned": false,
  "firstName": "Vera",
  "id": "7319865561",
  "lastName": "Glazunova",
  "messageCount": 4,
  "personalChannel": "giVBusf8vaYdxXjQ",
  "personalChannelDate": {
    "$date": "2025-04-03T18:17:03.100Z"
  },
  "automaticCheckDate": {
    "$date": "2025-04-24T09:59:59.217Z"
  },
  "lazyCheckDate": {
    "$date": "2025-04-23T22:55:19.079Z"
  },
  "remainingTime": {
    "$date": "2025-04-15T07:15:01.613Z"
  },
  "username": "glazunova_damaged",
  "phone": "+380961088458"
},
{
  "_id": {
    "$oid": "67eeba1f461801f5995d0077"
  },
  "accountId": "7883868375-prefix-female-million",
  "dc2": "90c550772b74a2520b947fc94d2de57e64a534182a86f6e3211181e8c01022ce5cbf0e0629a990101ec9f0ac11f39d5b328336ed6b54afd2d6cf585809b3366101d351a9abe64d7197f3e70eb4e8d44e1a7384c76b0e963e06f0a780084f80313e97c011f8206a3ca9ad4f8251003363e50276c56d980266282cddb84951fc5c158403ad6b4b66d884e16e5dc2591786ab76a1d3420d1b7cba03175d31729f0b565e1bfb609463fd042d2d6e3077f1607dd14cd077a1ffb3870c0882afa824f02c2448a8dd81706d8980623c2eda04f9e3e147488f6b524e67f772d3283db2b1b8a3ae650615228fd4588b7a485b344cd5a7bb4a610b9654f65a10117d80e056",
  "dcId": 2,
  "nextApiId": 2496,
  "dateUpdated": {
    "$date": "2025-04-24T09:59:54.638Z"
  },
  "twoFa": false,
  "twoFaDate": {
    "$date": "2025-04-21T21:48:00.382Z"
  },
  "banned": false,
  "firstName": "Margarita",
  "id": "7883868375",
  "lastName": "Demidova",
  "messageCount": 4,
  "personalChannel": "WxbxbC9rOBTxTGvd",
  "personalChannelDate": {
    "$date": "2025-04-03T18:21:04.943Z"
  },
  "automaticCheckDate": {
    "$date": "2025-04-24T09:59:54.637Z"
  },
  "lazyCheckDate": {
    "$date": "2025-04-23T23:09:14.721Z"
  },
  "remainingTime": {
    "$date": "2025-04-14T16:20:36.086Z"
  },
  "username": "demidova_technical",
  "phone": "+380639567043"
},
{
  "_id": {
    "$oid": "67eeba1f461801f5995d0088"
  },
  "accountId": "6922500616-prefix-female-million",
  "dc2": "5eceaf50faa51abb1e1aaa53576faa384dc583b40e01a91af5d7c3268bfe41354fb89e538fe0bdc8f2b92a315d7d121496a918962128f7fe756561ce1f68c55fa6c492a450e6dc926ead16a10f664369169c032e54951141ec5f226b0d4d8c30f426f5d77d5c063d04177632f5767b056e894629d91a9ac1d185ab65bc426218dda1d141973915b9912be7113c3b3bdcd712b1330bb00ec2ceb0168742a9af7a4990df06eb89e7b7010a7af4348cdcd88daff7c481745ba6983686daddb9143d48bc7ae2bd397b7820e437dd6576d68b25f0a80fe2c6234b3bfa209bf5c1ae7e63c8097b65071fa5273659e4dcdb799019a7a2d39f39bbe34fd20c6eb92e6d0b",
  "dcId": 2,
  "nextApiId": 2040,
  "dateUpdated": {
    "$date": "2025-04-24T10:25:58.823Z"
  },
  "twoFa": false,
  "twoFaDate": {
    "$date": "2025-04-21T21:48:00.419Z"
  },
  "banned": false,
  "firstName": "Mira",
  "id": "6922500616",
  "lastName": "Abramova",
  "messageCount": 3,
  "personalChannel": "XYgXjEeESPkVmH4n",
  "personalChannelDate": {
    "$date": "2025-04-03T18:19:01.713Z"
  },
  "automaticCheckDate": {
    "$date": "2025-04-24T10:25:58.823Z"
  },
  "lazyCheckDate": {
    "$date": "2025-04-23T22:27:58.272Z"
  },
  "remainingTime": {
    "$date": "2025-04-15T07:02:25.107Z"
  },
  "username": "abramova_amber",
  "phone": "+380983809473"
},
{
  "_id": {
    "$oid": "67eeba1f461801f5995d008f"
  },
  "accountId": "7268783417-prefix-female-million",
  "dc2": "5a816105060e1c9443fddc204c7869f72b15d937b05b0d33b8aab4dc65822e99d3b6873d1044297e673a8a9fe030e647e751663604c4606e6af4e7dcc0eecaab941f54bf06294d4b9ea2925d8a20f0f909fe7c1430ff690359382e80cb2317375932e321560be5e8a4bf96971cc9c6cb9d0811bf065a6f8ba772cb6994bc1e1440a0e7e153d84e59f2255e3fad38378e4a576339c6e4e20803871b110dc7cfb79b69338cbcd232bc383fc536b1d40c83b4ce4363aa9b1ff7626d08e5413024555aae711752a6ede83a7ce0471079d9ea58575b80cd3a3ce0df82132426a260560ef2b30bc819b22f34c803669aca8aa4b72b0ee1f2bc618d369d5a3991ad8809",
  "dcId": 2,
  "nextApiId": 611335,
  "dateUpdated": {
    "$date": "2025-04-24T10:00:00.544Z"
  },
  "twoFa": false,
  "twoFaDate": {
    "$date": "2025-04-21T21:48:00.413Z"
  },
  "banned": false,
  "firstName": "Darina",
  "id": "7268783417",
  "lastName": "Gavrilova",
  "messageCount": 4,
  "personalChannel": "tRCBLPcmuJOm9skV",
  "personalChannelDate": {
    "$date": "2025-04-04T00:50:44.410Z"
  },
  "automaticCheckDate": {
    "$date": "2025-04-24T10:00:00.544Z"
  },
  "lazyCheckDate": {
    "$date": "2025-04-23T22:32:58.239Z"
  },
  "remainingTime": {
    "$date": "2025-04-15T07:17:13.813Z"
  },
  "username": "gavrilova_youngest",
  "phone": "+380988960503"
},
{
  "_id": {
    "$oid": "67eeba1f461801f5995d0098"
  },
  "accountId": "1384899324-prefix-female-million",
  "dc2": "487922930ee9c83ae615852b64b543f28169c63d787a47c29dcd434f64567625ce7b637f408b87566a38fd8df166391b8e2d88bc99ed132fc140d3261e991053b04a010af5f960d5fa00da7f6067dfe407e4e580a464e80a52dabb250759d6380d44e0bd6ba61e3e8f225f1b834f05096559a758fb75997c5ff7b257c82ed3cf4c5fc71601f22da5a1829585a42685e693615eff40a814e63d03e812ead1b6a52fdd0046f18493e8d448427c9b5543a10164c3f8e6403d184af70d0df6d787ea362effcc878318dc13734f12ddcb0ae2f1c7bcaaff2135f722b82e10d17e22927e4d6478cfdf2c7a15c5a853ec277f70f2c0907a0118ea61e3b1dbde1f176cf4",
  "dcId": 2,
  "nextApiId": 2496,
  "dateUpdated": {
    "$date": "2025-04-24T10:16:59.223Z"
  },
  "twoFa": false,
  "twoFaDate": {
    "$date": "2025-04-21T21:48:00.412Z"
  },
  "banned": false,
  "firstName": "Daria",
  "id": "1384899324",
  "lastName": "Trofimova",
  "messageCount": 2,
  "personalChannel": "nLLkdtRWRtee4Sjq",
  "personalChannelDate": {
    "$date": "2025-04-03T18:19:11.299Z"
  },
  "automaticCheckDate": {
    "$date": "2025-04-24T10:16:59.223Z"
  },
  "lazyCheckDate": {
    "$date": "2025-04-23T22:30:58.119Z"
  },
  "remainingTime": {
    "$date": "2025-04-14T14:46:11.073Z"
  },
  "username": "trofimova_positive",
  "phone": "+380968006527"
},
{
  "_id": {
    "$oid": "67eeba20461801f5995d0108"
  },
  "accountId": "5836476514-prefix-female-million",
  "dc2": "7bcf1560b4f7d3e3327c3d8aee607283e80a41bb37d62c0f03989732affddc015c73252e304d13979cb84e9f59d8f32b8004820f48118cfac0cc77b34efbb9f790ed63cc319491d5c9594a365176eb7c012699675911b4b96e903ea31ad4074d353381d8db6194b61276f35597dda5b406a3cfabad44b82cd0b53c07e6c1cd042e11837050c751d04faa79e7742e2c4a6c4021ac97696b62b066ace4d83b7e323abd405077ff1fc994c6b94d68d91246da008abd66dd919387e48e2de49ab162d2d5c38abec26e8f9e557aebe6eaac3a15d0f35d5171cb7bc2049ee9937a57ab0a3a314bb0516ac8398c67a3754d3b57556c2da595cbbd25af80e5f40bc51a31",
  "dcId": 2,
  "nextApiId": 2496,
  "dateUpdated": {
    "$date": "2025-04-24T10:15:00.591Z"
  },
  "twoFa": false,
  "twoFaDate": {
    "$date": "2025-04-21T21:48:02.367Z"
  },
  "banned": false,
  "firstName": "Yana",
  "id": "5836476514",
  "lastName": "Mishina",
  "messageCount": 2,
  "personalChannel": "fZblgEK1KKWSUIvi",
  "personalChannelDate": {
    "$date": "2025-04-03T18:19:08.265Z"
  },
  "automaticCheckDate": {
    "$date": "2025-04-24T10:15:00.591Z"
  },
  "lazyCheckDate": {
    "$date": "2025-04-23T22:23:56.002Z"
  },
  "remainingTime": {
    "$date": "2025-04-14T14:27:54.605Z"
  },
  "username": "mishina_local",
  "phone": "+380977347505"
},
{
  "_id": {
    "$oid": "67eeba21461801f5995d0129"
  },
  "accountId": "7737241746-prefix-female-million",
  "dc2": "c2e02408bbd32729365920259c859651c7e2f060723fa24632bafc927471ee8b2c6d9387b43d25b18a6efdacdff4144836311899fdc08a7ee86df18367607d9b4c803ac31e681eed7e63e4ce578a27b74c49e2abebf08a7499274277b032531888035c9210b7f4ef2a64d1c2240aceb927a1a46abf4f328c90771e20a6bc8511240d111d76bec096453a0c6ad7861c8f5eac375e0889ce8de2b493296fb2daaf66e082faa44e59d607f9c1465149ed02352a95b3c7e97602e93ea607fc90019c65686a59f72b79f11a485bbe8645a2b3a2cea63875ff86cef85b1eb05dd81599bc77686234559a0624717ecb5ece80855b669fc6c091b0e9e8b8d23a2a87df25",
  "dcId": 2,
  "nextApiId": 2496,
  "dateUpdated": {
    "$date": "2025-04-24T10:15:59.120Z"
  },
  "twoFa": false,
  "twoFaDate": {
    "$date": "2025-04-21T21:47:44.884Z"
  },
  "banned": false,
  "firstName": "Kira",
  "id": "7737241746",
  "lastName": "Borisova",
  "messageCount": 3,
  "personalChannel": "oqcHXgE0lsbDCBRq",
  "personalChannelDate": {
    "$date": "2025-04-03T18:22:16.533Z"
  },
  "automaticCheckDate": {
    "$date": "2025-04-24T10:15:59.120Z"
  },
  "lazyCheckDate": {
    "$date": "2025-04-23T23:02:28.500Z"
  },
  "remainingTime": {
    "$date": "2025-04-15T07:18:58.427Z"
  },
  "username": "borisova_dependent",
  "phone": "+380509448847"
},
{
  "_id": {
    "$oid": "67eeba21461801f5995d0131"
  },
  "accountId": "2059719378-prefix-female-million",
  "dc2": "63d9f46f08a9dcfd1a554573b9ae7d54dfdd7886395e268f229dbd4f1753442cc4029b7e192b669816c3fd80706b2b6b7bba0865ef2378b75f4b1f3fe39e1934ab28ccb2a52b31a389d4c382f6e22644c76d6fdface9277b68bff9a09a99373fd8c9a110e7461a48bb4e39f377e62f025f246e70eaefc02e9771c3892c6897a8aa6e5d07e697b255b4c4067b02c45cccd2d613c6e8f3b85f1d8dda551e9aeeb24025967e3b54360fd934a6f551d9e5727b90dbe92cc4c4db37ab1d32618beed2799bf03a3c11e4863f1965d0cadc8af236fa487fd37b1c77f25617f9cbb6969872b7fc914cd2470ca25ae534e3f8639f226b86237e8913b65510f1696067dbce",
  "dcId": 2,
  "nextApiId": 2040,
  "dateUpdated": {
    "$date": "2025-04-24T10:26:00.495Z"
  },
  "twoFa": false,
  "twoFaDate": {
    "$date": "2025-04-21T21:47:44.848Z"
  },
  "banned": false,
  "firstName": "Irina",
  "id": "2059719378",
  "lastName": "Kostina",
  "messageCount": 2,
  "personalChannel": "WGeogPikK5nSLLCh",
  "personalChannelDate": {
    "$date": "2025-04-04T00:46:58.696Z"
  },
  "automaticCheckDate": {
    "$date": "2025-04-24T10:26:00.495Z"
  },
  "lazyCheckDate": {
    "$date": "2025-04-23T22:22:58.629Z"
  },
  "remainingTime": {
    "$date": "2025-04-14T14:18:49.831Z"
  },
  "historySpamBlocks": [
    {
      "spamBlockDate": {
        "$date": "2025-05-14T14:10:00.000Z"
      },
      "spamBlockDays": 30
    }
  ],
  "username": "kostina_asleep",
  "phone": "+380934586231"
},
{
  "_id": {
    "$oid": "67eeba22461801f5995d0180"
  },
  "accountId": "8051098523-prefix-female-million",
  "dc2": "094731db146287bcfa2f359af332ca19df923eaa31a9a73ea5fbc25bbaa54a3a1ac6cc3745ff7b0b50233ffa88823d47c85300fa3d9d951872c05844815043ac1d857991f6c40213d46b16026bed1f6d5eb386d2b37c6fefd55f9cae0f696e3b2c41a9b9119713bf2200237cdee3159b2926216723be69769437f39a3968a276cd0912671a9c2f92c74157c5e890d9d09aae3c63aa0f56542b6204262544584e400f4a23b25313fd5dd9fa6779995b9d3d6db2524598bece30bebbc2889e60027eca869fd201b4a70324507b89e9899666e53387944447690d5b6ffe4f7d7c76563f7af8e7db7278abd8d800c6f449601565b5b1a6ac619ce55d4e780f15dcbe",
  "dcId": 2,
  "nextApiId": 2496,
  "dateUpdated": {
    "$date": "2025-04-24T10:02:09.213Z"
  },
  "twoFa": false,
  "twoFaDate": {
    "$date": "2025-04-21T21:47:49.075Z"
  },
  "banned": false,
  "firstName": "Valeria",
  "id": "8051098523",
  "lastName": "Shubina",
  "messageCount": 3,
  "personalChannel": "liLapyxZZszaXp1G",
  "personalChannelDate": {
    "$date": "2025-04-04T00:48:03.529Z"
  },
  "automaticCheckDate": {
    "$date": "2025-04-24T10:02:09.213Z"
  },
  "lazyCheckDate": {
    "$date": "2025-04-23T22:29:45.453Z"
  },
  "remainingTime": {
    "$date": "2025-04-14T15:03:30.671Z"
  },
  "username": "shubina_cooperative",
  "phone": "+380681275657"
},
{
  "_id": {
    "$oid": "67eeba23461801f5995d01a5"
  },
  "accountId": "7705704567-prefix-female-million",
  "dc2": "5ac837706e3a656141e14162f85b00c752b8d3f0e84f5f2a6c71950f48750355dc686465e8ab346d7b95bf5b445024377a3fc3ca052a4bd142d8cb1e5bb002bca488012ed6efd43378d4d9ce928fe6c691e13d619d2916c19b44a30b297f9c33761f9669e423723edba227d5b45cc2377a2d0ca078b4b890182b94c5cececd5fc7dfda00e0140edf808e35c3c13112c66d0fd1ef4e820b2797101df032295218868567f319bffa21ee81194c40fa72773f032ea15a132c2ecdc4325726a16ad57e5524457968a58d7866ef5c8705d771194c57f93fedf1d533469b20d22618e8dbec4751fcaf755b77212d508ca3020652951d0f38e76e78a83f37a0c0a02d2e",
  "dcId": 2,
  "nextApiId": 2496,
  "dateUpdated": {
    "$date": "2025-04-24T10:23:09.259Z"
  },
  "twoFa": false,
  "twoFaDate": {
    "$date": "2025-04-21T21:47:53.335Z"
  },
  "banned": false,
  "firstName": "Mira",
  "id": "7705704567",
  "lastName": "Lazareva",
  "messageCount": 2,
  "personalChannel": "yNCbLipi2GlSYKCi",
  "personalChannelDate": {
    "$date": "2025-04-04T00:47:27.660Z"
  },
  "automaticCheckDate": {
    "$date": "2025-04-24T10:23:09.259Z"
  },
  "lazyCheckDate": {
    "$date": "2025-04-23T22:20:40.024Z"
  },
  "remainingTime": {
    "$date": "2025-04-14T14:23:45.571Z"
  },
  "username": "lazareva_faint",
  "phone": "+380962468767"
},
{
  "_id": {
    "$oid": "67eeba25461801f5995d021f"
  },
  "accountId": "8006426447-prefix-female-million",
  "dc2": "90e6a7929c763cfd12d80903c7bb927340b7ccb34d90b617c2ddbc0b90ddbffd97252e6d4b64a2294793645255faf5e583a626e544e9b9f64e8cffccc80366f828f2832acf6a66f54058bd76d4ce0004feabaca230c7c92acd65f069716af98df25135309e585e8a107ac6528010fc03158103e098d1325d8d0ad5ee69e7b00b775e6e412bdb2d2f2749faa8067de6b7384c0b2b425a2009b2c045bce5ba278fb131f876800def6165b0ee02614f26f5895ffd11c2371cf9f737bc23e9a08d89c1b91646c718d137a5fb7602cf0fc311775df82ddc2fe28197e0a98d9545c278dc96af822e756860a5624dc7191cc95d77923ce6580eb4087c20058c738cc57d",
  "dcId": 2,
  "nextApiId": 2496,
  "dateUpdated": {
    "$date": "2025-04-24T10:24:07.907Z"
  },
  "twoFa": false,
  "twoFaDate": {
    "$date": "2025-04-21T21:47:57.123Z"
  },
  "banned": false,
  "firstName": "Nina",
  "id": "8006426447",
  "lastName": "Timofeeva",
  "messageCount": 4,
  "personalChannel": "HSq0oDfmOHosyTOD",
  "personalChannelDate": {
    "$date": "2025-04-04T00:47:31.786Z"
  },
  "automaticCheckDate": {
    "$date": "2025-04-24T10:24:07.907Z"
  },
  "lazyCheckDate": {
    "$date": "2025-04-23T22:07:38.939Z"
  },
  "remainingTime": {
    "$date": "2025-04-14T16:23:46.958Z"
  },
  "username": "timofeeva_junior",
  "phone": "+380725016597"
},
{
  "_id": {
    "$oid": "67eeba25461801f5995d0223"
  },
  "accountId": "6180650257-prefix-female-million",
  "dc2": "3f0c59ef8b5ca4a501f6d5a63952e0d5a3b6f08a80f0a7d545639a16b6d0cae15a2de707fa98c977c88e535a54cce1b8f044b9afd76c626710958c67038faf46b27c45706d74ac06315bdfb44ab83a7d96a3d52243e0e38814fdef812f537c0ac780beef54be6075a28a4beb8287b7b3d5b003c2cc8650e805d4c7108fb75253d2c3540816d86a5981ec947b2ea2ae59b086707bf3ac9d3bfa0180653d852cd1d1ef660f8e9629d25c9e12fd95c025933665a1681df28bb92a1013ad777287096c9dba5aaa35d83349ad9e53c614179f646f6401357e1b5db1622f6896a875f422abbb913062a4dc8b27cdb1d2068ad50590464fe505da0a28d0e8e25dae7da0",
  "dcId": 2,
  "nextApiId": 2496,
  "dateUpdated": {
    "$date": "2025-04-24T10:15:09.609Z"
  },
  "twoFa": false,
  "twoFaDate": {
    "$date": "2025-04-21T21:47:56.637Z"
  },
  "banned": false,
  "firstName": "Anastasia",
  "id": "6180650257",
  "lastName": "Nesterova",
  "messageCount": 4,
  "personalChannel": "wkfgkRL1ejqhenru",
  "personalChannelDate": {
    "$date": "2025-04-03T18:19:46.643Z"
  },
  "automaticCheckDate": {
    "$date": "2025-04-24T10:15:09.608Z"
  },
  "lazyCheckDate": {
    "$date": "2025-04-23T22:34:46.955Z"
  },
  "remainingTime": {
    "$date": "2025-04-15T07:14:18.664Z"
  },
  "username": "nesterova_willing",
  "phone": "+380985956596"
},
{
  "_id": {
    "$oid": "67eeba25461801f5995d022f"
  },
  "accountId": "5859151517-prefix-female-million",
  "dc2": "5ae698b480a7dec6064bcbfb305a0146b63bfa15116f772a9907f55cebda48d5fb44fb3f4deac7f0674abfe2caf0766e69bdb5892cbb372631d2bcb6f2b1f30b73699104feb0b47a2c052d0d3c333f0ff91fc2f3208ab6f4a87a8b240ea264e2465892b89bccddb52bc6af99d9aaad4708ae2d89e2092137d51c56b68af3c5abb7db25e7960b2841366d147ae5fbf40def5055186ef04d5a1b7b6353d6198c4cf03e1b0e03ec21d1392d0f1406743cc7dbe454501f793736661bfdf012cababf6489f76665c9813777540d2542f9c99cd74a1159652f792e529399ce5569b67db8b94217b82ce5fa95642329f3a80f42d21e89126d412d89033fbd737c1aedab",
  "dcId": 2,
  "nextApiId": 2496,
  "dateUpdated": {
    "$date": "2025-04-24T10:08:10.025Z"
  },
  "twoFa": false,
  "twoFaDate": {
    "$date": "2025-04-21T21:47:56.685Z"
  },
  "banned": false,
  "firstName": "Yulia",
  "id": "5859151517",
  "lastName": "Shumilova",
  "messageCount": 3,
  "personalChannel": "wzsKGqiYg7TxDzNp",
  "personalChannelDate": {
    "$date": "2025-04-03T18:19:59.939Z"
  },
  "automaticCheckDate": {
    "$date": "2025-04-24T10:08:10.025Z"
  },
  "lazyCheckDate": {
    "$date": "2025-04-23T22:08:35.122Z"
  },
  "remainingTime": {
    "$date": "2025-04-14T14:19:10.335Z"
  },
  "username": "shumilova_accurate",
  "phone": "+380685496432"
},
{
  "_id": {
    "$oid": "67eebaa0461801f5995d0763"
  },
  "accountId": "7184006237-prefix-female-million",
  "dc2": "4aa91522777b6e4018a65c132c3866138a734e5227f42456a8004c1d851a6860af0b71765dc60c4021aeb3f8b874b6a2653600986b5e35dd666d661a3c1a276aec5a4fffe785d2d0472bd8cb42d99b6e2df763fa2a1f58f63a77fdb373de331b1f8265ef3443ad98188f44a8395cc225300e32f06ec6e72e12272e4758e689d87776f77fe189d2b518992e8f1cd22e40f5d2ef33094fc62bfed0d86c62b208a6a5ad9504aad65b32ec7c1729dc5a87f2fa6c01127f6faba97463d283465bc2142c86df7dd8d8b9c4843406cc1bf3883836ece9231c4c9866362fdeab2f32b089d574494b813c5c2e0c38b23e0bf0fab75c81b17ab36dbf08ce01774a03f3039e",
  "dcId": 2,
  "nextApiId": 2496,
  "dateUpdated": {
    "$date": "2025-04-24T09:59:09.768Z"
  },
  "twoFa": false,
  "twoFaDate": {
    "$date": "2025-04-21T21:47:56.635Z"
  },
  "banned": false,
  "firstName": "Lubov",
  "id": "7184006237",
  "lastName": "Solovieva",
  "messageCount": 3,
  "personalChannel": "KUxFCDfWzq0HWGFk",
  "personalChannelDate": {
    "$date": "2025-04-04T00:48:04.739Z"
  },
  "automaticCheckDate": {
    "$date": "2025-04-24T09:59:09.768Z"
  },
  "lazyCheckDate": {
    "$date": "2025-04-23T22:18:46.816Z"
  },
  "remainingTime": {
    "$date": "2025-04-14T14:19:07.796Z"
  },
  "username": "solovieva_desperate",
  "phone": "+380933549804"
},
{
  "_id": {
    "$oid": "67eebaa0461801f5995d0769"
  },
  "accountId": "7203756966-prefix-female-million",
  "dc2": "28b8086db4bfbcf5479ed852b76ea628739765b8546a79a7bf93f0f8f02045140d3d2634a77d65c15fb77c2930b8a3feb814efc2dd139115e4278d2cdd81f7783eb4dad755b5824c449b6aed6bd36847cd656d5ac0b114fac39d1db8d1c822dc2ec490244d2bacdf9c8654833ec1ef45beb388c1fb96cab75c74d2f046c92413edd650749840d17bf5f9cc1aff589befacc6534efac3d5ab7c51594dd33dcfbc41071639a48a27532ba477d0df37155846684caf7344976549c11d7a4ecd552cca098d575c75cd32aa115c7a189b98414dad075908c4172a2c57152137914da5c43c28162cae168c714eea820f2d0e7e5e66b056cc66ab9cd5ec76337e5bb1c5",
  "dcId": 2,
  "nextApiId": 2496,
  "dateUpdated": {
    "$date": "2025-04-24T10:08:08.375Z"
  },
  "twoFa": false,
  "twoFaDate": {
    "$date": "2025-04-21T21:47:41.364Z"
  },
  "banned": false,
  "firstName": "Anna",
  "id": "7203756966",
  "lastName": "Lobanova",
  "messageCount": 3,
  "personalChannel": "TMuPzShQGIHeW3Rk",
  "personalChannelDate": {
    "$date": "2025-04-04T00:48:27.536Z"
  },
  "automaticCheckDate": {
    "$date": "2025-04-24T10:08:08.375Z"
  },
  "lazyCheckDate": {
    "$date": "2025-04-23T23:08:28.917Z"
  },
  "remainingTime": {
    "$date": "2025-04-15T07:14:29.615Z"
  },
  "historySpamBlocks": [
    {
      "spamBlockDate": {
        "$date": "2025-04-10T18:12:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-04-16T05:14:00.000Z"
      },
      "spamBlockDays": 1
    }
  ],
  "username": "lobanova_serious",
  "phone": "+380686005681"
},
{
  "_id": {
    "$oid": "67eebaa0461801f5995d0772"
  },
  "accountId": "6549336977-prefix-female-million",
  "dc2": "1a80ba58ac234e7e36a2545bc57b3650ebfa517e532cf219df05792fcfdf19a49292e9ca4a6ea591a156459864454647a4ced83d46fd3e1062973c7083cea24afd9ed974e3a29570d95bd143ba093a63cce4facf10de76f7c0d3935a4bf472d82087e228cdeee0011ae2ace92350a6c9ad73d4044528ae1551360278e38f9f7d2389fbcfb5f4e88e535f87e919262a9c1d61142d242ae1dfc2a6ad31acd019df68792f91b0a45a08ea599df562dff1a0cf17d5c751d1e083c79003c5c23cb2cf7c57348a6268b8fdffe5e805169d1cb872e187767d5cba0d4b05cbe017159e10c0d730075714dff84a51b5128dbf7c4a1e82463b6031ab36332ffdd1a1e42e6d",
  "dcId": 2,
  "nextApiId": 611335,
  "dateUpdated": {
    "$date": "2025-04-24T10:23:09.725Z"
  },
  "twoFa": false,
  "twoFaDate": {
    "$date": "2025-04-21T21:47:38.580Z"
  },
  "banned": false,
  "firstName": "Maria",
  "id": "6549336977",
  "lastName": "Ermakova",
  "messageCount": 2,
  "personalChannel": "vAUxsRwmlZWCJN1n",
  "personalChannelDate": {
    "$date": "2025-04-04T00:47:49.080Z"
  },
  "automaticCheckDate": {
    "$date": "2025-04-24T10:23:09.725Z"
  },
  "lazyCheckDate": {
    "$date": "2025-04-23T22:50:33.504Z"
  },
  "remainingTime": {
    "$date": "2025-04-14T14:22:40.836Z"
  },
  "username": "ermakova_drab",
  "phone": "+380685149089"
},
{
  "_id": {
    "$oid": "67eebaa0461801f5995d077e"
  },
  "accountId": "7295543714-prefix-female-million",
  "dc2": "03e48901cbedf2ce91219e5732782dcd71f62b76def736c03904291800c5976d444090074392e5aaa4506b5a8a4457c7a31fd494eea39dccf84b2d2b342187e4ec1ed4161f769869af182e23db7418a72316c06c21b2ba8f5a2d9d28f8f81a8e8f73ca1e28f12eb1c597b6deb578792f947c9b200cf95aca966a4abe6f6d04e3db2e60fe4cf2b7df7df5bb37162e579a774421f56e596a5734ecb97c8332bbc7d5d00758d006a05fa24a35661e2b162707bb36551bfb0faf66abf7a4864e12b3fad0ce507ac177822772f2724eb7706589abfd8a3822e47f11d3977a1eaa1bec260555ce35ab5d8ef0d5b8f9d10f8ba2d38f816274e4fb5288a066144075bbfa",
  "dcId": 2,
  "nextApiId": 2496,
  "dateUpdated": {
    "$date": "2025-04-24T10:21:07.852Z"
  },
  "twoFa": false,
  "twoFaDate": {
    "$date": "2025-04-21T21:47:41.468Z"
  },
  "banned": false,
  "firstName": "Polina",
  "id": "7295543714",
  "lastName": "Agapova",
  "messageCount": 2,
  "personalChannel": "C6wjDMQhIKqbSecg",
  "personalChannelDate": {
    "$date": "2025-04-04T00:50:33.536Z"
  },
  "automaticCheckDate": {
    "$date": "2025-04-24T10:21:07.852Z"
  },
  "lazyCheckDate": {
    "$date": "2025-04-23T23:39:25.138Z"
  },
  "remainingTime": {
    "$date": "2025-04-14T14:30:36.137Z"
  },
  "username": "agapova_correct",
  "phone": "+380635979162"
},
{
  "_id": {
    "$oid": "67eebaa1461801f5995d078e"
  },
  "accountId": "6640377596-prefix-female-million",
  "dc2": "b96d741ddc660391c88d836e2ece8b518178c1a07604d74db777211515e974c7636b8072bbdab7f46b95d19fb17d52844dedd527c383401b05e5a207d983128e822f0afbcb00d2ede8c76aa651783beae319c581e15f16a0ae263ae7c58f8c6dc54adf3c8f91b19bc2f2c11c8bbe6bf22f78ced05dbd6d69b5fb9ea4059b8327c79193641a42307797bf60a69579177e462c8e9298775084232fbdcc8442820e11d695d23156d4e9101836a8cbf6a0e5e970cbfdd9535eded64544606a7f59fc0639f4ea3537a4125ba42a37778ea95d6629c2736e266f3acea925d79f2e3cda88f7bf196c7460de8dfd223dffaf00589739eed428f3e09f074b4c5647e7bf3c",
  "dcId": 2,
  "nextApiId": 2496,
  "dateUpdated": {
    "$date": "2025-04-24T10:11:53.600Z"
  },
  "twoFa": false,
  "twoFaDate": {
    "$date": "2025-04-21T21:47:41.369Z"
  },
  "banned": false,
  "firstName": "Valeria",
  "id": "6640377596",
  "lastName": "Bogdanova",
  "messageCount": 2,
  "personalChannel": "XFuTFdxj7qLHJUqM",
  "personalChannelDate": {
    "$date": "2025-04-03T18:18:13.700Z"
  },
  "automaticCheckDate": {
    "$date": "2025-04-24T10:11:53.600Z"
  },
  "lazyCheckDate": {
    "$date": "2025-04-23T22:47:14.500Z"
  },
  "remainingTime": {
    "$date": "2025-04-14T14:31:35.878Z"
  },
  "username": "bogdanova_crooked",
  "phone": "+380958922158"
},
{
  "_id": {
    "$oid": "67eebaa1461801f5995d0790"
  },
  "accountId": "7535805471-prefix-female-million",
  "dc2": "5fe6b875ab63cae1fc61cfb13cdf03bfd86a5f5ab8aa2f0826d3a0325dc80ef39cf009c7c58d66b54106540590d854edc3343f16b24dfa0eaa22796d586c14f53dc948269744a880e67851940b01cb599db01298945abc8f63ad82908f3108a991fe0451ef91e5005107a8fdb146f5861b57254b1edeef49bed8d0f0e261179270df1c3b27be5f6db417264ca2a71ff183979a73cc16117db4b6072e91ed976ae09b44fd600799d5738703a30a9bd632f8705a416b5ade635fb26f603c6da521375e19662ebd2aabe34c473334e89455a498217c7e145b279ce2df9d3bd20f12c74e8b64c594514939376876a5f56fcae92f03158f8a38c8c1bcf7279d4fb6b9",
  "dcId": 2,
  "nextApiId": 2496,
  "dateUpdated": {
    "$date": "2025-04-24T10:10:59.897Z"
  },
  "twoFa": false,
  "twoFaDate": {
    "$date": "2025-04-21T21:47:43.758Z"
  },
  "banned": false,
  "firstName": "Anfisa",
  "id": "7535805471",
  "lastName": "Golubeva",
  "messageCount": 2,
  "personalChannel": "DTgtpRA0mkWRwpCq",
  "personalChannelDate": {
    "$date": "2025-04-03T18:21:41.421Z"
  },
  "automaticCheckDate": {
    "$date": "2025-04-24T10:10:59.897Z"
  },
  "lazyCheckDate": {
    "$date": "2025-04-23T22:44:25.238Z"
  },
  "remainingTime": {
    "$date": "2025-04-14T14:49:37.197Z"
  },
  "historySpamBlocks": [
    {
      "spamBlockDate": {
        "$date": "2025-04-08T14:16:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-04-17T12:52:00.000Z"
      },
      "spamBlockDays": 3
    }
  ],
  "username": "golubeva_fatal",
  "phone": "+380662935951"
},
{
  "_id": {
    "$oid": "67eebaa1461801f5995d0796"
  },
  "accountId": "7918305389-prefix-female-million",
  "dc2": "5fc1b764df0893c6f9a6c679c770319cff68d65a4fe2e3d2a850d6917098ae2f76cfc3e9cbf279344ebcc67fb15a1fde9b46563194545d1a864f7e90680f15a1f074e1d85091dbefa2b1491dd7b842df4c705b3b6ac5248f7b9adc31de431b8222fa8a97ffc13a06a22d98974d99db17418eaaf24311ba2c193c05f3aad7f25ea95448eee9c3976cc6e784bdfa621ab7c1e0c6918c47b2e595a69baa8271308966c3a1fd07632b862471302d6861c1897347a4ad7c50f8d6c62e88b7b140d66a7d91473208c1a07ac9c336c64947b5f148547832d46936f477cb55b4f9bd617d5b459816800bd2d632efd284f97e6f7743c67fba042e7a6856404e6fc6a87870",
  "dcId": 2,
  "nextApiId": 2496,
  "dateUpdated": {
    "$date": "2025-04-24T10:22:59.142Z"
  },
  "twoFa": false,
  "twoFaDate": {
    "$date": "2025-04-21T21:47:43.740Z"
  },
  "banned": false,
  "firstName": "Nina",
  "id": "7918305389",
  "lastName": "Sysoeva",
  "messageCount": 4,
  "personalChannel": "suQSU2IfMOrxRdxr",
  "personalChannelDate": {
    "$date": "2025-04-03T18:19:57.929Z"
  },
  "automaticCheckDate": {
    "$date": "2025-04-24T10:22:59.142Z"
  },
  "lazyCheckDate": {
    "$date": "2025-04-24T00:15:43.125Z"
  },
  "remainingTime": {
    "$date": "2025-04-15T07:17:29.178Z"
  },
  "username": "sysoeva_fascinating",
  "phone": "+380635392703"
},
{
  "_id": {
    "$oid": "67eebaa1461801f5995d0798"
  },
  "accountId": "7677132102-prefix-female-million",
  "dc2": "25e9432a64a730f515ec41ab593e364be90344d48e5058452d28569d133bd9fb41136b8c37214f870c597a6315ac8900146c2c7217793cf42c52f7f6a12dc1ca1823610da71a032e1c6f719a972ce744f178d43302f3f1e6490b123564486f889f672e3c226092d7b1d2c5e9df6d9f2955fab947f0b429d7e21acc85df4615b17001b059818df65f35f484350db1351ed617024bc827b98f979d01992ca24397102d5ae6b57d18998c8ee54c68d3664af995ae73619f52a9b00cdead861e4deb46ef737a6241667f6a03d8dc9fcac31210fd0fce6608a7511a888eac73ae2fb6ab743f684f3fd2fdbd38ee74b7c61c0ad942335460693e67ac04de5bd0b6e916",
  "dcId": 2,
  "nextApiId": 2496,
  "dateUpdated": {
    "$date": "2025-04-24T10:01:59.870Z"
  },
  "twoFa": false,
  "twoFaDate": {
    "$date": "2025-04-21T21:47:46.150Z"
  },
  "banned": false,
  "firstName": "Margarita",
  "id": "7677132102",
  "lastName": "Larionova",
  "messageCount": 3,
  "personalChannel": "rKru4wnuingKOSWS",
  "personalChannelDate": {
    "$date": "2025-04-03T18:18:42.246Z"
  },
  "automaticCheckDate": {
    "$date": "2025-04-24T10:01:59.870Z"
  },
  "lazyCheckDate": {
    "$date": "2025-04-23T22:11:43.560Z"
  },
  "remainingTime": {
    "$date": "2025-04-14T14:29:35.801Z"
  },
  "username": "larionova_promising",
  "phone": "+380637087407"
},
{
  "_id": {
    "$oid": "67eebaa1461801f5995d07b3"
  },
  "accountId": "6897127591-prefix-female-million",
  "dc2": "97473b5e0e37d35a1c02aeef741d934c2ea05a408cfb81e63654de788c37c3fb29dd8bd62937a4a93f4c73eff22dc3f707eb441f46f06e006bc571a026af22c21b64d62538ad5afa151fd04bb755dea1da0b55845e63b54ec2aca5c45568e70cb27dd221ef5daa8f1aeb59293523866960faf534b320f077fa8e12ff77b1710f8da10e53ded5ba43a3a2db0e698bec5aaf87662249ae57e22e5686eb1071c04433b55cabd2f350dc8fedbea08659dae1160468b9ba8bd36d905593cb4ecd71f8e4b7185516ac470730db3c2d93b89730983aea327ddb855b989d7e8b5644fe3e50f629f9c89fb3b0cc722a1f90c4a8006ee7b86603dce1616bbea7e8ae652512",
  "dcId": 2,
  "nextApiId": 2496,
  "banned": false,
  "dateUpdated": {
    "$date": "2025-04-24T10:10:08.313Z"
  },
  "firstName": "Galina",
  "id": "6897127591",
  "lastName": "Kuzmina",
  "messageCount": 2,
  "personalChannel": "reLIGjXCysLGmx7N",
  "personalChannelDate": {
    "$date": "2025-04-04T00:46:41.898Z"
  },
  "automaticCheckDate": {
    "$date": "2025-04-24T10:10:08.313Z"
  },
  "lazyCheckDate": {
    "$date": "2025-04-23T23:08:33.461Z"
  },
  "remainingTime": {
    "$date": "2025-04-14T15:09:24.950Z"
  },
  "username": "kuzmina_definite",
  "phone": "+380956653600"
},
{
  "_id": {
    "$oid": "67eebaa2461801f5995d0808"
  },
  "accountId": "7116618172-prefix-female-million",
  "dc2": "710dd7f60b89265a8bb2e81e23f61971349e8968242e6ee573fa5367a13ef1386ed31c6822c80b187eed554a5fbcf8df1e594c966be3052b8bf40caa62d9f38bab0423d72aac680425cd4d86f30cc9815f2a16967c0af7f6cd9f32aa20e099e1ef8e7a474cfbe52ec459a58cc6cc202e8961b0ab1853161267c10e373b56233c9150d066cdb41858f5b7121e103be66752c9590178694ccaa8e632fd3e13a0586eb77740dd248e19bffe2ab474350db5a2674d344edb0563b3f4fdb884f71870e4a0f59d782238e3a02ef2fe57b70a75817ff08682db7a0ce3d77fe9d513d792ead7124d78003cb97acd37b72f42112390007274c0c24f3f44eb21f06f641cef",
  "dcId": 2,
  "nextApiId": 2040,
  "dateUpdated": {
    "$date": "2025-04-24T10:04:57.309Z"
  },
  "twoFa": false,
  "twoFaDate": {
    "$date": "2025-04-21T21:47:43.735Z"
  },
  "banned": false,
  "firstName": "Raisa",
  "id": "7116618172",
  "lastName": "Filatova",
  "messageCount": 3,
  "personalChannel": "PePxmJxEIRzat2Un",
  "personalChannelDate": {
    "$date": "2025-04-04T00:49:37.093Z"
  },
  "automaticCheckDate": {
    "$date": "2025-04-24T10:04:57.309Z"
  },
  "lazyCheckDate": {
    "$date": "2025-04-23T23:28:24.209Z"
  },
  "remainingTime": {
    "$date": "2025-04-15T07:02:32.960Z"
  },
  "username": "filatova_expensive",
  "phone": "+380508477427"
},
{
  "_id": {
    "$oid": "67eebaa2461801f5995d080f"
  },
  "accountId": "7579823289-prefix-female-million",
  "dc2": "1194fd0c4bd5276daa0ae57e18ce0f6a02a172dc2a9df62b29062748b354958f783a0fed117fed4caa2aa5dee1b5c06fe9b8128313ea17fbeefe5f180a51c139d313d425d99949174024c23f8e5eba243deb3c5e5c971e7adece98918f00a71663df785bb8062fa6cc33e0dc7bede10cf2947ba2495c45246d24c7df28e9ed75c2080845980af587b6741dc4fa5428f463eff12c4ae657ce05d717e1d10a41ce0cb4cf1c62a74447c9565da7a6d2f383f6bd54fc7257fbad2c4edea10d10658d4e3957c46a95446e24992056e1992fb6740ced0e956cfd2ae6d50c3149e1d15ebd0d34cc9e09c94fd98c8a6d53ec401761f21eed147e8fe095692a4863905c0a",
  "dcId": 2,
  "nextApiId": 2496,
  "dateUpdated": {
    "$date": "2025-04-24T10:11:00.748Z"
  },
  "twoFa": false,
  "twoFaDate": {
    "$date": "2025-04-21T21:47:43.756Z"
  },
  "banned": false,
  "firstName": "Svetlana",
  "id": "7579823289",
  "lastName": "Lebedeva",
  "messageCount": 2,
  "personalChannel": "JYFcSRhWt3YTeFAn",
  "personalChannelDate": {
    "$date": "2025-04-03T18:20:29.283Z"
  },
  "automaticCheckDate": {
    "$date": "2025-04-24T10:11:00.748Z"
  },
  "lazyCheckDate": {
    "$date": "2025-04-23T22:54:29.376Z"
  },
  "remainingTime": {
    "$date": "2025-04-14T14:08:41.682Z"
  },
  "username": "lebedeva_hissing",
  "phone": "+380681272906"
},
{
  "_id": {
    "$oid": "67eebaa2461801f5995d081b"
  },
  "accountId": "7100064813-prefix-female-million",
  "dc2": "794a1f78841faaf2f8d2050a9bd8ac738aef183f4f70d5a7c319a47e315bde214805b00539054be3c68b977e04b0e66c96286884dba7c2ccd3a5e556b443e1140e9d9f8d614b77e10d4ad26251672ea4b62cffe8228c592fd3d7f4a920c210c0f00999ea9f43a27bc38fa0836981cddbb6d29b87c8dc2b327fe385704feba5a5c321c76ee1eefd76051b7f83ca2a8f5b2c4257ade78c57bea1fe8b60774cf1da3291830b393cd29f82bdeabadba6a5fdb44302c61ff06b9a8d170e47c674df6baf0a0b18dc444ff13aae004558e13f0b03f65d714dc70368638a0fa981e5b0f4ddf06b9a4841bfae1a37e0d2d0bd1564e16f55e43b9cec5f1ed332ea6c125fe0",
  "dcId": 2,
  "nextApiId": 2496,
  "dateUpdated": {
    "$date": "2025-04-24T10:10:03.494Z"
  },
  "twoFa": false,
  "twoFaDate": {
    "$date": "2025-04-21T21:47:45.764Z"
  },
  "banned": false,
  "firstName": "Maria",
  "id": "7100064813",
  "lastName": "Shirokova",
  "messageCount": 3,
  "personalChannelDate": {
    "$date": "2025-04-09T12:40:01.432Z"
  },
  "automaticCheckDate": {
    "$date": "2025-04-24T10:10:03.494Z"
  },
  "lazyCheckDate": {
    "$date": "2025-04-23T23:43:19.260Z"
  },
  "remainingTime": {
    "$date": "2025-04-14T14:15:40.175Z"
  },
  "personalChannel": "OYFCpwwho7LvNfgr",
  "username": "shirokova_continued",
  "phone": "+380687773915"
},
{
  "_id": {
    "$oid": "67eebaa2461801f5995d081e"
  },
  "accountId": "6882348555-prefix-female-million",
  "dc2": "6a97c49fd9caa3975e3f393c2c59c086e23c09b5ec56d8e3e08262ffe391337196f7cf44ca13b87e797fcd27db957b6a07ea9f043a957666f426465d3c2443b655dcc30f5bbe0bf317fdfe5160d711a9a1be8132b628ee4fcc29207eba1a8b61386cd6d8580db3ce2bae8332cb9aa0211c0c4e432fb772d55d036bc95d0d272c134d049bc280e29af81a60385be1d572f98fdc1659fc5655208cde333f5dc1eab89dc3cf0f1d199388a9081a7208308fb92fae5bc225a56d4a6f2b898fc2f399ae59068c7234d467c80ec4c094f31cd48b25f5e2b0aa12e2f260a0338ab86ddb2c3bb31196587488cc87cdae590387c6a4baf9508ce223fbc144596cb52b4bb9",
  "dcId": 2,
  "nextApiId": 611335,
  "dateUpdated": {
    "$date": "2025-04-24T10:07:59.304Z"
  },
  "twoFa": false,
  "twoFaDate": {
    "$date": "2025-04-21T21:47:46.145Z"
  },
  "banned": false,
  "firstName": "Liza",
  "id": "6882348555",
  "lastName": "Gromova",
  "messageCount": 3,
  "personalChannel": "cYKDde4nLuiwpCGs",
  "personalChannelDate": {
    "$date": "2025-04-04T00:49:37.373Z"
  },
  "automaticCheckDate": {
    "$date": "2025-04-24T10:07:59.304Z"
  },
  "lazyCheckDate": {
    "$date": "2025-04-23T22:31:55.656Z"
  },
  "remainingTime": {
    "$date": "2025-04-15T07:17:33.526Z"
  },
  "historySpamBlocks": [
    {
      "spamBlockDate": {
        "$date": "2025-04-16T05:19:00.000Z"
      },
      "spamBlockDays": 1
    }
  ],
  "username": "gromova_visible",
  "phone": "+380970802139"
},
{
  "_id": {
    "$oid": "67eebb39461801f5995d0e60"
  },
  "accountId": "7355998540-prefix-female-betting",
  "dc2": "1a4bfb17194f9d9995157209dcbe00467d4cd95bf499e0b8a03f16eb60053d1b1dc7ccb5250d35ffd73b181e213679d1e6e60f205a404442a69c25b57db242982e55fff9c71414d80ddd9165c6109caf1db4dcb99f966b32fed9aa322a6729a97bd358531a72983119cc1813c8984fb358dfc009ed8bdf0e08e916b203a736bd871ee71859cf36b60d863d169884e1ef5996072543d9c307562e75a16ec8bf15459b673b8dc7217c21f5f9642e1d02fd349e32b3d3ddd897649ec84b631a57aa05edf92dfed07b2128d595adb9307fa38e069672183f44f7ae22d64c98bb270be6cb5d8a4dccc52334e8ebb30cad46185aa6148a53c31868f143f16ac83cc1ae",
  "dcId": 2,
  "nextApiId": 2496,
  "dateUpdated": {
    "$date": "2025-04-24T10:19:59.589Z"
  },
  "twoFa": false,
  "twoFaDate": {
    "$date": "2025-04-21T21:47:50.559Z"
  },
  "banned": false,
  "messageCount": 3,
  "personalChannel": "hGNt1ATCjMXBUEuM",
  "personalChannelDate": {
    "$date": "2025-04-04T00:51:19.861Z"
  },
  "automaticCheckDate": {
    "$date": "2025-04-24T10:19:59.589Z"
  },
  "firstName": "Tatiana",
  "id": "7355998540",
  "lastName": "Zaytseva",
  "remainingTime": {
    "$date": "2025-04-08T11:55:12.184Z"
  },
  "lazyCheckDate": {
    "$date": "2025-04-23T22:58:29.374Z"
  },
  "historySpamBlocks": [
    {
      "spamBlockDate": {
        "$date": "2025-05-08T09:56:00.000Z"
      },
      "spamBlockDays": 30
    }
  ],
  "username": "zaytseva_religious",
  "phone": "+380938411523"
},
{
  "_id": {
    "$oid": "67eebb39461801f5995d0e6d"
  },
  "accountId": "7863676522-prefix-female-betting",
  "dc2": "0d3c58298b9508e393bc8e9a49df1ed0fd362fcece9e876cfc9d69af15bda00c4e27a6abe7fdbe59fcc060c7dd814a24494f95acbd320546206508d61b46eafe105e8518eab0c5f447f6e15e74d4c096cc431028e8b99081c9b5e9a27a632d1f5426f0526f651cd41249f59c87422f1807dd5bb5f8b1e17afe37bb5978914c4ca0986a9c01ccd79eb2ed646a58beea72b1de97f0fa3260c67eb9560aa89e669249a6c951257568804ca021a34c97c38d195663ef0712b40cf5bb1088053dd3eb2a0b17e8d58b7ce6e105365d668a62c7e4108603c746dccdeeadeec14fe1f606065f50b2c4862a8c1dfcf63dcb696429957df917f18c9c81752a145575382932",
  "dcId": 2,
  "nextApiId": 2496,
  "dateUpdated": {
    "$date": "2025-04-24T10:12:03.533Z"
  },
  "twoFa": false,
  "twoFaDate": {
    "$date": "2025-04-21T21:47:45.784Z"
  },
  "banned": false,
  "messageCount": 5,
  "personalChannel": "ZzwPuqWimsed4Owq",
  "firstName": "Darina",
  "id": "7863676522",
  "lastName": "Larionova",
  "personalChannelDate": {
    "$date": "2025-04-03T18:20:48.879Z"
  },
  "automaticCheckDate": {
    "$date": "2025-04-24T10:12:03.533Z"
  },
  "remainingTime": {
    "$date": "2025-04-11T08:46:02.357Z"
  },
  "lazyCheckDate": {
    "$date": "2025-04-23T22:21:55.834Z"
  },
  "historySpamBlocks": [
    {
      "spamBlockDate": {
        "$date": "2025-04-07T11:57:00.000Z"
      },
      "spamBlockDays": 1
    }
  ],
  "username": "larionova_only",
  "phone": "+380500727021"
},
{
  "_id": {
    "$oid": "67eebb39461801f5995d0e7e"
  },
  "accountId": "7245359470-prefix-female-betting",
  "dc2": "3e08cbcd921f0ec8f1c17e17a82b56ca76df5a13fbb8eb467211ad701fbfc21279a822f75920bc3a9a5cfbd4834b218a9002053b933fcfbe19a51f03e695946ce635daae1bd61638de8281b23b3f656de67b5a56d301a3300729a651790ecb6bb35e3147f2a6eb11781ca4386231005fe6eab1ddab4a2071e5a26741f21f87fffc48ce3688a5d136042d10e96d5f1ef057428932a6479620a28768a04e4355de57b368c53001fd8dbcf20804344ccab2fa251381d1c6ed02e73f9821e35553d1d3a491499bd483e7b10380d1f73ddccea451ff881c05dca00ab2a95b988d8a6fd533baa0cdd79cbf0acd674225807010fb40b6017be623e95ddeac69da2a2501",
  "dcId": 2,
  "nextApiId": 2496,
  "dateUpdated": {
    "$date": "2025-04-24T10:18:00.923Z"
  },
  "twoFa": false,
  "twoFaDate": {
    "$date": "2025-04-21T21:47:47.365Z"
  },
  "banned": false,
  "messageCount": 1,
  "personalChannel": "ToyOntQu2upZFknv",
  "personalChannelDate": {
    "$date": "2025-04-04T00:48:32.272Z"
  },
  "firstName": "Liza",
  "id": "7245359470",
  "lastName": "Loginova",
  "automaticCheckDate": {
    "$date": "2025-04-24T10:18:00.923Z"
  },
  "lazyCheckDate": {
    "$date": "2025-04-23T22:51:30.435Z"
  },
  "remainingTime": {
    "$date": "2025-04-08T09:33:17.239Z"
  },
  "username": "loginova_clear",
  "phone": "+380664408978"
},
{
  "_id": {
    "$oid": "67eebb39461801f5995d0e8b"
  },
  "accountId": "7740092917-prefix-female-betting",
  "dc2": "73bef11b45ce636a0e5171cd3d5a9949ae1813e1cd5a6c983654bb25ba4b0d0ecda2ba1a8ce08c0cb384d5ed7f13ff44f5d73ebf398aea9b37ab177470a1ebe7cb4f767c67ed100c0c28489557c8effe5e12b7d3e2a1ec5e078b02a00ffcb79544a3e31becc998b3feb1af389bdbeb1588007c39d8c3a3bc3fb967ece2934f3a2cf3a163a08bdcbcf68d5b672471596a8a03f8abc599a020a50100a279f3c4d81761d329db90c57fc01c2a9e3f6f27a4c0a0946ec8cdf6ea894c11d05e84aed2ca86ad9e86e01d7806dfee9e08072d72998cb44ac33cf8bbd05bc9969ee5aed971ca2e15d4553cd85f21b3b72e93fc308e6842464b9d3cae545f64478efa8903",
  "dcId": 2,
  "nextApiId": 2496,
  "dateUpdated": {
    "$date": "2025-04-24T10:24:03.475Z"
  },
  "twoFa": false,
  "twoFaDate": {
    "$date": "2025-04-21T21:47:51.317Z"
  },
  "banned": false,
  "messageCount": 4,
  "personalChannel": "WsjWyPsQqNbpgz5U",
  "personalChannelDate": {
    "$date": "2025-04-04T00:50:11.211Z"
  },
  "firstName": "Anastasia",
  "id": "7740092917",
  "lastName": "Ignatova",
  "automaticCheckDate": {
    "$date": "2025-04-24T10:24:03.475Z"
  },
  "remainingTime": {
    "$date": "2025-04-10T13:48:43.793Z"
  },
  "lazyCheckDate": {
    "$date": "2025-04-23T22:59:30.616Z"
  },
  "username": "ignatova_mass",
  "phone": "+380935101171"
},
{
  "_id": {
    "$oid": "67eebb39461801f5995d0eb8"
  },
  "accountId": "6252942680-prefix-female-betting",
  "dc2": "ae8e9ac55a2567c1144f81a550e5260c07905c076476f54a3e04fe0aa9232bfe07e57b464e62bd9cae11837bbadc36d2fa94aae73af849f818fe191c82a38f25f49d1cd35efdee83f5e02dcb4694ddec0b57b933df798f7ad4065285dd8bbe1d9f72761078e3f85928530f45adb85910d402bd768f6960bd1d086cd0cf46239f0199f5f3f95884c97a9ff11d46544d764086f39ad02eb3868022d3493bb5d2e9aa9f9891a9b359b53ce2cdcfe28a440a74f8fb97f1ab912a9c24acc3bea478f2592d66126ee86c657c8182514aa8253d643f366a284795cb3e93a6d269c507b547f52bfb462cf46662e4456549d5dd5f8a914851ac8f8aac6066154a27f5b022",
  "dcId": 2,
  "nextApiId": 2496,
  "dateUpdated": {
    "$date": "2025-04-24T10:25:03.524Z"
  },
  "twoFa": false,
  "twoFaDate": {
    "$date": "2025-04-21T21:47:44.939Z"
  },
  "banned": false,
  "messageCount": 5,
  "personalChannel": "mv0luRxaWWmtGyWN",
  "firstName": "Irina",
  "id": "6252942680",
  "lastName": "Borisova",
  "personalChannelDate": {
    "$date": "2025-04-03T18:20:28.368Z"
  },
  "automaticCheckDate": {
    "$date": "2025-04-24T10:25:03.524Z"
  },
  "remainingTime": {
    "$date": "2025-04-11T08:48:37.141Z"
  },
  "lazyCheckDate": {
    "$date": "2025-04-23T23:02:30.877Z"
  },
  "username": "borisova_marked",
  "phone": "+380660486227"
},
{
  "_id": {
    "$oid": "67eebb3d461801f5995d0f44"
  },
  "accountId": "7077661045-prefix-female-betting",
  "dc4": "72951c4de3c00c29f2554e4686ca5bc8eb436a3d3e31ca49d0e1926994d9e2374b3e157bb6239fa5fecb7278b917152bb874d2e875382f7580674c050b71de2ee01541f2f7ef5be1fd2b5c8b0380a21b4119ab5f99e9e8310dd994b99594d61e8ed658c92c7e1a02bcc472fc0e8e502de77d417a4b66e38ec918aeb24c9044ec10cf51da25e2fa86cb524c98ee957e652291a4a4481344c72f1ddf79671b1533a99d09bdc35e9cc115f171d60c503754498636a094b76edbf715d500fd4e29a7dbecfe9940aceb4b530fec737cbfdbfce480ec16212a0a6f088984ed5131f86a70556348d2a45ff9e2424c2087c8420bddfe1439f3d662994eaf6cf7386ede46",
  "dcId": 4,
  "nextApiId": 2040,
  "dateUpdated": {
    "$date": "2025-04-24T10:04:58.718Z"
  },
  "twoFa": false,
  "twoFaDate": {
    "$date": "2025-04-21T21:47:57.378Z"
  },
  "banned": false,
  "messageCount": 3,
  "personalChannel": "Dbo5gdzFHudDKhrr",
  "firstName": "Evgenia",
  "id": "7077661045",
  "lastName": "Trofimova",
  "personalChannelDate": {
    "$date": "2025-04-03T18:22:34.018Z"
  },
  "automaticCheckDate": {
    "$date": "2025-04-24T10:04:58.718Z"
  },
  "remainingTime": {
    "$date": "2025-04-10T09:11:32.067Z"
  },
  "lazyCheckDate": {
    "$date": "2025-04-23T22:22:49.551Z"
  },
  "username": "trofimova_modern",
  "phone": "+966538088067"
},
{
  "_id": {
    "$oid": "67eebb45461801f5995d1111"
  },
  "accountId": "1080722476-prefix-female-betting",
  "dc4": "6f748cbbaa915a21d15cb79425e0331259ec2d9b19f7b81657af7df6ab584a1e71e6d0beb1ea10e902d97f6dcba1805c8449c28ab5f8cac7b4c7a847193ca007d9f20c0bdbff2687f9b987ff9b416fc90ac62e0eeec16e34f2d54b1f1718fd70f11d778dce490ac16156eb715f44778928398cb4c14e1652dc91871852a8676100204ebe38b1d17f57edd8dd971f59f582b00bc56c80c3933b3f69dd94d4636583fbf04930ec975bece35bacd8afaf309d8b5b78a68aac2e48ef6ae62d33ab03f871e21edbb4eab523775595445a8746c0345b563363e6fcc03b80c8f5ba5c8d8328cc699119675aeac9dadb56ec190fe096dfe2dc55b4e3352bd9b080f419b8",
  "dcId": 4,
  "nextApiId": 2040,
  "dateUpdated": {
    "$date": "2025-04-24T09:59:05.971Z"
  },
  "twoFa": false,
  "twoFaDate": {
    "$date": "2025-04-21T21:47:47.919Z"
  },
  "banned": false,
  "messageCount": 4,
  "personalChannel": "qeFGNkwXekpzd0GM",
  "personalChannelDate": {
    "$date": "2025-04-04T00:49:45.826Z"
  },
  "automaticCheckDate": {
    "$date": "2025-04-24T09:59:05.971Z"
  },
  "firstName": "Polina",
  "id": "1080722476",
  "lastName": "Loginova",
  "remainingTime": {
    "$date": "2025-04-11T08:48:21.092Z"
  },
  "lazyCheckDate": {
    "$date": "2025-04-23T23:27:23.370Z"
  },
  "username": "loginova_naked",
  "phone": "+201002738092"
},
{
  "_id": {
    "$oid": "67eebba2461801f5995d1b51"
  },
  "accountId": "1174083228",
  "dc4": "4cf7cfab9e21d0caf5a6af7cdcae51f90138bce1bb9bc4f4b84389bd34678f7cb3eecd73965adf29591c912ac357e1bf401fd2a4fc6a1c85b36036e7626969a571c61e748705203988bf67d0eb50dab3a98a56df2110f3b0fc51b0ec14ec98c54b4706562a325c91409d66e9d43b3a8ee3ee5303ba45ab3335deb04bdb8e13f0849a31100deeae2cf8b37d25fd3b1ff77ef0bdbca0899c5b6491c3a10bbdfde1609247736631c183e44e039926cc2ccea644307f8bbf5363f9480e391784ac94ccea52c82d0f05cfe4f030956e728ca32684775599121a2af4a5e39ff287df90568e6bfc8cadda98b9234e4e2b3d03858ddd0a3db613a33bc04d19aff4a27ad8",
  "dcId": 4,
  "nextApiId": 2040,
  "dateUpdated": {
    "$date": "2025-04-24T10:02:54.347Z"
  },
  "twoFa": false,
  "twoFaDate": {
    "$date": "2025-04-21T21:47:58.113Z"
  },
  "banned": false,
  "firstName": "Roman",
  "id": "1174083228",
  "lastName": "Serov",
  "messageCount": 17,
  "personalChannel": null,
  "username": "serov_variable",
  "automaticCheckDate": {
    "$date": "2025-04-24T10:02:54.347Z"
  },
  "remainingTime": {
    "$date": "2025-04-24T07:36:20.633Z"
  },
  "lazyCheckDate": {
    "$date": "2025-04-23T23:33:27.549Z"
  },
  "historySpamBlocks": [
    {
      "spamBlockDate": {
        "$date": "2025-04-13T08:54:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-04-12T08:55:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-04-19T08:32:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-04-18T10:49:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-04-22T05:38:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-04-23T06:45:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-04-27T06:09:00.000Z"
      },
      "spamBlockDays": 3
    }
  ],
  "phone": "+966554733380",
  "spamBlockDate": {
    "$date": "2025-04-27T06:09:00.000Z"
  },
  "spamBlockDays": 3,
  "spamBlockInitDate": {
    "$date": "2025-04-24T06:22:40.762Z"
  }
},
{
  "_id": {
    "$oid": "67eebbce461801f5995d2445"
  },
  "accountId": "7337760525",
  "dc2": "3dd02afca8c0b8b085b7cdb2712ddda45de0e6b1cc0c3bba1ced70f457ea6aaed621e3c17eae37a9cf319d2399d57ddd494f209cb11d1f11c6b623fec831fa108af8c4d70cb9a4c55f120c8f09a01d3696c73b6f8e4621d6c4ae7d8b36c2c07d913eb1dc62018f2165b81b0df4c34584c12462ad18baa1bda11a6fd1ea8d06ccffa52186d6276b11951953d83afadcd9dcadc09e852485b4b35d6d2176ba11eb218f4775e798058027ec86090b9d1f1f7a52fb6c1ef3c78320975b4ade0b468c48b2f2abe553b17ab4f81d2a40ab05d26dd68e373e980ee1cb0f045b05f645a5cec71992900d41db92dea4e8fd7846fc9146a221da02aea9208dc27970c597ec",
  "dcId": 2,
  "nextApiId": 611335,
  "dateUpdated": {
    "$date": "2025-04-24T10:17:58.832Z"
  },
  "twoFa": false,
  "twoFaDate": {
    "$date": "2025-04-21T21:47:42.012Z"
  },
  "banned": false,
  "firstName": "Viktor",
  "id": "7337760525",
  "lastName": "Anisimov",
  "messageCount": 25,
  "personalChannel": null,
  "username": "anisimov_modern",
  "automaticCheckDate": {
    "$date": "2025-04-24T10:16:57.431Z"
  },
  "historySpamBlocks": [
    {
      "spamBlockDate": "INFINITY",
      "spamBlockDays": 0
    },
    {
      "spamBlockDate": {
        "$date": "2025-04-24T13:12:00.000Z"
      },
      "spamBlockDays": 3
    }
  ],
  "lazyCheckDate": {
    "$date": "2025-04-23T22:11:58.518Z"
  },
  "remainingTime": {
    "$date": "2025-04-24T12:17:58.832Z"
  },
  "phone": "+380683403316"
},
{
  "_id": {
    "$oid": "68035cb1461801f5999300f5"
  },
  "accountId": "5275144688-prefix-female-wellside",
  "dc2": "2e2f42c4e2566a52ae2493bcc4b4bc4177960a7339eeeaaab1aaa8eabea61079d0d020eae89c033ab2345cadb999e405673fc0c67ded5797b8ff6be2841d2815c3171a325c3bf0cc6a59c632f0e4d64db2ffd45419e17a289afb76aea1a906e367f5285adee4ec836ea2a2a33a0313e3a12968593341b347c5f8103e72e61d1d611abef1076161c5cacc61f661f5ebf0f34e34179804d63f218e97d3a616e0628d3f2e6e1562f112cf7c2b4f790f46aae58d962abcc9760b9631851313c963461088c0a091fb1fdd40da7c6164aa41d741a7f9fc28b202fe7c202d348d379dbe49d34f6eeb8952e4478f63d87c62ed034d341848230b83ec6f67d7175a9ff526",
  "dcId": 2,
  "nextApiId": 611335,
  "dateUpdated": {
    "$date": "2025-04-24T09:58:59.073Z"
  },
  "twoFa": false,
  "twoFaDate": {
    "$date": "2025-04-22T09:55:16.261Z"
  },
  "banned": false,
  "firstName": "Liza",
  "id": "5275144688",
  "lastName": "Kostina",
  "messageCount": 0,
  "personalChannelDate": {
    "$date": "2025-04-24T06:04:44.374Z"
  },
  "personalChannelError": "CHANNEL_NOT_FOUND",
  "lazyCheckDate": {
    "$date": "2025-04-23T13:22:19.606Z"
  },
  "automaticCheckDate": {
    "$date": "2025-04-24T09:58:59.073Z"
  },
  "username": "wellside7952",
  "phone": "+380977210164"
},
{
  "_id": {
    "$oid": "68035cb1461801f599930120"
  },
  "accountId": "7504166730-prefix-female-wellside",
  "dc2": "3cc2e0c4059150c84f7eeef697e10c49aabb0f6436aa5c6133468040af4e3411b2efce80a61fd007c30193470b02d6b98543431e8373da2589737d1846127d3e1224e3964f549fe3facfef25050ef1f3a1ad090d3262e0c1b66b14e031de004912132dcf62d848c0a5eb4d230fc4f04c63292b076dc92d09cfe917f9f32be6cbe52ad303d701b41334468f1399b4b118c5cecbd7b61bc19f518597142f1562ffe1ee38de4641a293dd74c1301db57da33ecb699333344cbed85a0ec73c3df8880294cfc3abedc8546810d530b2ca7cd81cf98dd1ae776172393e59263a8033322b0957f98dc9af91398da8321dd76349844f270dc463bb26de7a37deeffb1283",
  "dcId": 2,
  "nextApiId": 2496,
  "dateUpdated": {
    "$date": "2025-04-24T10:19:58.127Z"
  },
  "twoFa": false,
  "twoFaDate": {
    "$date": "2025-04-22T09:55:19.601Z"
  },
  "banned": false,
  "firstName": "Svetlana",
  "id": "7504166730",
  "lastName": "Malyutina",
  "messageCount": 0,
  "personalChannelDate": {
    "$date": "2025-04-24T06:04:48.019Z"
  },
  "personalChannelError": "CHANNEL_NOT_FOUND",
  "lazyCheckDate": {
    "$date": "2025-04-23T13:33:21.831Z"
  },
  "automaticCheckDate": {
    "$date": "2025-04-24T10:19:58.127Z"
  },
  "username": "wellside6247",
  "phone": "+79223808718"
},
{
  "_id": {
    "$oid": "68035cb5461801f59993020d"
  },
  "accountId": "7319370169-prefix-female-wellside",
  "dc2": "237a84bf43503895d839d2f1ee74d75aa21c9414564957f51f40cd4f15d00fc586d27cb6c0b2cfc0a7cc6067941d413f762bac582e7fedd3d25ccba963cc5e7a251b70c70b103b8911e97765ce9dddfd1aa2a2e18b2f1a466c4bf3a5d80e346f0160a40619eab97d39f7ab45eacfbe2046615573840c69f0b16829d4d2b7cae64462c6c3aa73691c5a9a3449339ca4f66c6190183ae280a95aa2785e56f03d036aeff0644bc00789ddd2f2d1b99d9273dd818bbf96f4b4b1924ec4bb6710667027f4441cc1c5a8575e8a99334ca532b76d50db1bd0cfae42d12bc203e0d7ad7947b4a887c9f43eca56405264389fbcc1a8f6d4b955a1fc204852f29c2044032a",
  "dcId": 2,
  "nextApiId": 611335,
  "dateUpdated": {
    "$date": "2025-04-24T10:02:58.111Z"
  },
  "twoFa": false,
  "twoFaDate": {
    "$date": "2025-04-22T09:55:11.113Z"
  },
  "banned": false,
  "firstName": "Ekaterina",
  "id": "7319370169",
  "lastName": "Zaitseva",
  "messageCount": 0,
  "personalChannelDate": {
    "$date": "2025-04-24T06:04:39.258Z"
  },
  "personalChannelError": "CHANNEL_NOT_FOUND",
  "lazyCheckDate": {
    "$date": "2025-04-23T12:53:03.314Z"
  },
  "automaticCheckDate": {
    "$date": "2025-04-24T10:02:58.111Z"
  },
  "username": "wellside1610",
  "phone": "+380637054106"
},
{
  "_id": {
    "$oid": "68035cb5461801f599930242"
  },
  "accountId": "6685253656-prefix-female-wellside",
  "dc1": "3ebf329e8e4763bce4607fe6fa3bcd38692a6d3347eec961939a4be461c27a3185653147486afe4f7a22fd06e51595fdb04d42d4f9464576ad67bc832bf3f9511069012fe0364e0a7d41f03d56144e055c48e5d95606d808ee8c3190f922efcf2385696185c280c699bd079949621798d27f7a3f8ced9987a570ad8c594795c0f03323cc4f4ee08d3d3589d146a7a0fe6e76f975005957ef115c14ddef66ff24b9cc84b9a66dc08d59a76f54ef15321db14f6d535a17bfa527648031c7bdc7e1444720efac49dff2d56e2ccfeba586186aeeccc11479cf99d247bafb6cf04743b6aa99e647dd2cd1c8e740d5463c575d448118287e0cc6fe34b3c7041567ad1d",
  "dcId": 1,
  "nextApiId": 2496,
  "dateUpdated": {
    "$date": "2025-04-24T10:25:56.084Z"
  },
  "twoFa": false,
  "twoFaDate": {
    "$date": "2025-04-22T09:55:10.819Z"
  },
  "banned": false,
  "firstName": "Anna",
  "id": "6685253656",
  "lastName": "Eroshkina",
  "messageCount": 0,
  "personalChannelDate": {
    "$date": "2025-04-24T06:04:33.114Z"
  },
  "personalChannelError": "CHANNEL_NOT_FOUND",
  "lazyCheckDate": {
    "$date": "2025-04-23T13:28:28.019Z"
  },
  "automaticCheckDate": {
    "$date": "2025-04-24T10:25:56.084Z"
  },
  "username": "wellside1075",
  "phone": "+543804694062"
},
{
  "_id": {
    "$oid": "68035cbc461801f599930496"
  },
  "accountId": "7649871375-prefix-female-wellside",
  "dc1": "11ee3dd1303d4cb6fa4a3134142d11bc18f068e9e9c5013e40486d6d83c9e4c8c1e12c26106e3cc7fac30bc13f755361158485f08f85262e947f309f103a025dceb9573af21da8d647fb1106b2e1cfd8507ac060ee9104026943cd9fc75fd12d21ded48401522753d07283d240b7be156cb140615bd9c75605dcfe2098a4dc1ba7a7b20f85664ea181dae8b6d571b8e594c63153dd366bcb14d640d867dffdf41130eca6bdc9a4a8fcce57db5ce796b12cdd9b633eafbcad3f7e8c93cdbe5db307e51e98d813a8e0a747af4e408032106bc9016b06a042545334909f969678a3fdd77b32f3d5d2f6aaedc314b6a7c6dbb2b3c9a3019dbe263edbc97f1b488730",
  "dcId": 1,
  "nextApiId": 2496,
  "dateUpdated": {
    "$date": "2025-04-24T10:08:10.885Z"
  },
  "twoFa": false,
  "twoFaDate": {
    "$date": "2025-04-22T09:55:08.058Z"
  },
  "banned": false,
  "firstName": "Maria",
  "id": "7649871375",
  "lastName": "Kozlova",
  "messageCount": 0,
  "personalChannelDate": {
    "$date": "2025-04-24T06:04:51.587Z"
  },
  "personalChannelError": "CHANNEL_NOT_FOUND",
  "lazyCheckDate": {
    "$date": "2025-04-23T14:08:51.212Z"
  },
  "automaticCheckDate": {
    "$date": "2025-04-24T10:08:10.885Z"
  },
  "username": "wellside374",
  "phone": "+543804172217"
},
{
  "_id": {
    "$oid": "68035cbf461801f5999305ac"
  },
  "accountId": "5594642635-prefix-female-wellside",
  "dc1": "35adac9f8dee2bb904855b0178e4194b211b5ac03bfd319badb235de607c3f9e05012d0fdd8c26224ed6919f230aea4e7f85b3e843cda65e204cff3e8ef56395990f92b776fd73f3e4244011b56c0c5142a25ded08b60b66729a1a0b8da4b5ca38e81386a2e20336bd8b20305d4f10b98fb9f166c8538633ee908030105ed5523bc2975150c4df592aabaf4412e9dd9121be3f60350503af4267a13da1c1c4bad433ef5be680648379f3b579583cbf9372f7dc1dd90918e53fa8b98c84d686c84379df33b1f509e651f5899082bbe1d6fdc0a8ea6951527f90a740586d9b68412851e6b95fe375898b46e1489d45d088b4686873576d5eb7d298a8a4404b3656",
  "dcId": 1,
  "nextApiId": 2496,
  "dateUpdated": {
    "$date": "2025-04-24T10:24:54.584Z"
  },
  "twoFa": false,
  "twoFaDate": {
    "$date": "2025-04-22T09:55:14.574Z"
  },
  "banned": false,
  "firstName": "Polina",
  "id": "5594642635",
  "lastName": "Kostina",
  "messageCount": 0,
  "personalChannelDate": {
    "$date": "2025-04-24T06:04:44.116Z"
  },
  "personalChannelError": "CHANNEL_NOT_FOUND",
  "lazyCheckDate": {
    "$date": "2025-04-23T14:01:41.204Z"
  },
  "automaticCheckDate": {
    "$date": "2025-04-24T10:24:54.584Z"
  },
  "username": "wellside5082",
  "phone": "+541139438094"
},
{
  "_id": {
    "$oid": "6806bfd7461801f599f0c139"
  },
  "accountId": "7652394153-prefix-female-stomcenter",
  "dc1": "10b425367f5db2bdaf136a5757118fe22e3e83fc9e91d31755f5b365cfcb42f3c4316248922ca5981a29b9046ea87390d715433e1255e0089fea831ab550d7d08fc0689256b378d4e453f4f89e73577ec7b6a1858bd3d3730cf8515ac86879958adaf5d84056adea3a1838124273b881a08bc04325c92581697a1cfe69835713e2dc5c46e2e398620912cbb3db9de7085b09c557e18fd9d91450834bd4212f12e16f034abe344c7c02dd2b57a95ce98a90fb4dad39a62c7ea37da52757a5021985a3def88fb22d3c190f34bf7f2782ec48ec5edd5df9d2b5456993b84259f911226db81e225a95a531f5d172e84604620ba965c50e152ca5a67193246b76dd2b",
  "dcId": 1,
  "nextApiId": 2040,
  "dateUpdated": {
    "$date": "2025-04-24T10:11:01.690Z"
  },
  "twoFa": false,
  "twoFaDate": {
    "$date": "2025-04-21T22:05:14.046Z"
  },
  "banned": false,
  "firstName": "Anfisa",
  "id": "7652394153",
  "lastName": "Galitsyna",
  "messageCount": 0,
  "personalChannel": "jmpntZwdgWcxj8St",
  "personalChannelDate": {
    "$date": "2025-04-21T22:08:12.907Z"
  },
  "lazyCheckDate": {
    "$date": "2025-04-23T23:01:21.934Z"
  },
  "automaticCheckDate": {
    "$date": "2025-04-24T10:11:01.690Z"
  },
  "username": "galitsyna_overseas",
  "phone": "+528441338050"
},
{
  "_id": {
    "$oid": "6806bfd8461801f599f0c18e"
  },
  "accountId": "8126726461-prefix-female-stomcenter",
  "dc2": "71c0f066891476d99a0ac6b388fab472b9cb08e5198dd7ae22ebd6d1a8b72f199346b444ff393c31e271b71f13a4f8ceb283db701d2cae53dcab0ca5875cc59005c73e0074ff5c310b4c88465de733e639a42505cbe82a2495cfd38061f7f2a63888c6ff748e86eef87b486f5177a330713b587e545394d96efce6a293b2b24e570a6f50b19b1a7d32ead5f1735d497642069a62173f2ec57d392e8a6ba29ddc80576f5c707956714095eea1ce9fdae415d4ca0c0771be1973740a33e216ef547c7905276d05cf308b277bc24c2bdac9f750fe3b66c2c648098176117433fbfe33725f0e5d397e7fc32e007998b6b8ccad67d5124d3a55824f603a795fdad299",
  "dcId": 2,
  "nextApiId": 2040,
  "banned": false,
  "dateUpdated": {
    "$date": "2025-04-24T09:59:11.057Z"
  },
  "firstName": "Inna",
  "id": "8126726461",
  "lastName": "Belova",
  "messageCount": 1,
  "personalChannel": "DQtUAbCisLp9qThq",
  "personalChannelDate": {
    "$date": "2025-04-21T22:08:21.654Z"
  },
  "lazyCheckDate": {
    "$date": "2025-04-23T23:31:27.162Z"
  },
  "automaticCheckDate": {
    "$date": "2025-04-24T09:59:11.057Z"
  },
  "remainingTime": {
    "$date": "2025-04-22T15:43:37.940Z"
  },
  "username": "belova_damp",
  "phone": "+380505935310"
},
{
  "_id": {
    "$oid": "6806bfd8461801f599f0c207"
  },
  "accountId": "7848717515-prefix-female-stomcenter",
  "dc2": "9f0cef29f1e4c99542cc1c435f286ba009d2e6aad3da7324925d40ed0ffb624d435b50026b807627264ffe00683ff31a5a08d7fb320ef7a373182d61e4a4b9dc0202765704d4c8d21f0b81171f5df1c32a594bbe7ef691121cc7c9bb5e6a02b9e4bda669f12da140743744c7babead699d281ba1211e9d7dac537c75101f83145eae5e4156aa3d09185e75dba6faab1e973fdfb7b697a12ba53f8c0c87b1f28f10d8354188113e51bac14c4b697361b74386ff9b466ac9e731da0c9e8ab5c32ae13a10f0fd68d4bc0e5c3ff2081836e9c24b48ced67bc8980e9d05dd0ad2b265f5ba40658f51f0a3700d301c877c8df6591faa490ec1818f02dd382470b94f27",
  "dcId": 2,
  "nextApiId": 2496,
  "dateUpdated": {
    "$date": "2025-04-24T10:18:05.607Z"
  },
  "twoFa": false,
  "twoFaDate": {
    "$date": "2025-04-21T22:05:14.227Z"
  },
  "banned": false,
  "firstName": "Anna",
  "id": "7848717515",
  "lastName": "Kostina",
  "messageCount": 1,
  "personalChannel": "SQvZfzIT2xsMQgps",
  "personalChannelDate": {
    "$date": "2025-04-21T22:08:17.122Z"
  },
  "lazyCheckDate": {
    "$date": "2025-04-23T23:43:22.745Z"
  },
  "automaticCheckDate": {
    "$date": "2025-04-24T10:18:05.607Z"
  },
  "remainingTime": {
    "$date": "2025-04-22T15:44:34.336Z"
  },
  "username": "kostina_essential",
  "phone": "+380972534557"
},
{
  "_id": {
    "$oid": "6806bfd9461801f599f0c2e8"
  },
  "accountId": "6087139307-prefix-female-stomcenter",
  "dc2": "c3561748da867f8200e73ed5c30df2ff30ef3f2af40a8dbbd03bb39ef4058058999e47b056f136afc5ebe9d52ebaa2761529085734cc8d126885bc59ae1751a20b2e1d7da8a440dd81bb82ebba353ecff3891d14a3c7087d1be3c2517e414a2aed38952533a6ff5921347cc787241c61b2a28a88db0e20a5e7f97d0cf69b35a4dff8409775d0e32954eee34f7ef10a9f3fbefcd4b0dddb6c9023dd3cec358346f8b1438ec185d3891adbd2e3da2eff9220b1043c6d77d53dee6661a64a0dab3e8b0d37ef82dbdd0780a2a8f3dbfef6d2b655f1c84baebe773f581c93a94e9b0e6ee6e2cf412fee6a40af0e151a04e5c9300ce559a52488cfcc2c2ba57dd51114",
  "dcId": 2,
  "nextApiId": 611335,
  "dateUpdated": {
    "$date": "2025-04-24T10:24:00.231Z"
  },
  "twoFa": false,
  "twoFaDate": {
    "$date": "2025-04-21T22:05:17.448Z"
  },
  "banned": false,
  "firstName": "Daria",
  "id": "6087139307",
  "lastName": "Romanova",
  "messageCount": 1,
  "personalChannel": "FnriUJMHe8XgWHNu",
  "personalChannelDate": {
    "$date": "2025-04-21T22:08:18.374Z"
  },
  "lazyCheckDate": {
    "$date": "2025-04-23T22:52:20.932Z"
  },
  "automaticCheckDate": {
    "$date": "2025-04-24T10:24:00.231Z"
  },
  "remainingTime": {
    "$date": "2025-04-22T16:00:50.853Z"
  },
  "username": "romanova_lively",
  "phone": "+380964052137"
},
{
  "_id": {
    "$oid": "6806bfda461801f599f0c40b"
  },
  "accountId": "8112148386-prefix-female-stomcenter",
  "dc2": "4a4e4733a65133c93c69e1e72cce129d50b1e687d1e081efafe6c429788769dac60b3129b726268a6b4e26ddb32b68f7479e66ba86bad9cda13402fe1437a381f0cc3144701ccf4f31367b27eda10b78c806b8a63187775a12ed14b167ae5d3a0eb7039762706ece1c62d737effd9127e1762c2263278d77d3e6d717198cd37907571c01d8cc8fb1b243cc7513e21979fa337e514bc55072cf87b5ea1b741c7941fa25656a43f709b452ddcb75dffc14d3003dcfefbb39c4a5dac3181657e9ce9ae60dc36020479c4b7cd84153f7a9f2fa06e7cceaa7027a4899d5f1c94d2f7ab5591d455c4f31f4eb5b641b801c28d974d181415676af15c627b68d2311a7e4",
  "dcId": 2,
  "nextApiId": 2496,
  "dateUpdated": {
    "$date": "2025-04-24T10:16:10.611Z"
  },
  "twoFa": false,
  "twoFaDate": {
    "$date": "2025-04-21T22:05:14.017Z"
  },
  "banned": false,
  "firstName": "Darina",
  "id": "8112148386",
  "lastName": "Gromova",
  "messageCount": 1,
  "personalChannel": "SKkeagP7VSVzWuzo",
  "personalChannelDate": {
    "$date": "2025-04-21T22:07:57.785Z"
  },
  "lazyCheckDate": {
    "$date": "2025-04-23T23:08:29.199Z"
  },
  "automaticCheckDate": {
    "$date": "2025-04-24T10:16:10.611Z"
  },
  "remainingTime": {
    "$date": "2025-04-22T15:49:34.726Z"
  },
  "username": "gromova_spotty",
  "phone": "+380977966182"
},
{
  "_id": {
    "$oid": "6806bfda461801f599f0c427"
  },
  "accountId": "6771329695-prefix-female-stomcenter",
  "dc2": "a62b1b604b69cdc3308ff5a5fc968c32fce9a1cdf38f6458fa17cc9545e09af8cc07ba5977a9cbdfd87d5522692a8587b132346bc44faaddefe59aea1e42245fe2b396058f273b62da62ed0d88b103b56c9bdaa7f4ccb221cd0f342f1277adfdd2d0a9d68f72fd6e27af7d04d06adf847229e38dd87e14242bd11809194afd8dde039b29d2dcc8f1e4f5bddbc93b1a3238da1b1bb18c1398397f616a0b0ce5aaadf1d03104aaec3c198b58af44db266f9aa60c9f29f02f9e4f01ddfdcaae768ef9ce6864199c01031a2f95e7da9d63b5d21ff1af8543184c008a992313f8619a7ea2365aa516130e2e6e97e5ef67f20e6ce1f687db35ae0488ef407f290e4f8e",
  "dcId": 2,
  "nextApiId": 2040,
  "dateUpdated": {
    "$date": "2025-04-24T10:20:06.376Z"
  },
  "twoFa": false,
  "twoFaDate": {
    "$date": "2025-04-21T22:05:21.168Z"
  },
  "banned": false,
  "firstName": "Galina",
  "id": "6771329695",
  "lastName": "Dorofeeva",
  "messageCount": 1,
  "personalChannel": "PtrpKNt1KQsmxeoP",
  "personalChannelDate": {
    "$date": "2025-04-21T22:08:18.028Z"
  },
  "lazyCheckDate": {
    "$date": "2025-04-23T23:10:24.595Z"
  },
  "automaticCheckDate": {
    "$date": "2025-04-24T10:20:06.376Z"
  },
  "remainingTime": {
    "$date": "2025-04-22T16:24:21.677Z"
  },
  "username": "dorofeeva_large",
  "phone": "+380991365400"
},
{
  "_id": {
    "$oid": "6806bfdd461801f599f0c697"
  },
  "accountId": "5713562689-prefix-female-stomcenter",
  "dc1": "591b29851a0769306755d848b42ccf490d1e5dafb1a9c6124ed42e00125a21f4278d38f7d5c62bd6835769d8bdb165080d8cb6cfdb6eb8d27deb7d2b066572a160c6878bf5957e1c476ed5cf7108ada6c3c45886c492eec4899e42b5aa454ceb8a6982650e2019f77acbe54c07001ffa19113a1c9102ff8bbd9bb82f6e82529727cd9b6224a37548cadda8f8bd826ec95d232ea6fc259ea44700d901727b8ab8cfcea1602210313e72577ea85823cde8dd7071504665de7a7e06690003a8b5163ee4134c997cec1662566ee297d83a9a902009639db774791f7a406efb03d2d5899df708fd337f2c8f66831f452f3da7241e4974ad3795cccbe677336b2cad91",
  "dcId": 1,
  "nextApiId": 2496,
  "dateUpdated": {
    "$date": "2025-04-24T10:15:05.084Z"
  },
  "twoFa": false,
  "twoFaDate": {
    "$date": "2025-04-21T22:05:24.194Z"
  },
  "banned": false,
  "firstName": "Marina",
  "id": "5713562689",
  "lastName": "Tkacheva",
  "messageCount": 1,
  "personalChannel": "crCteCLboyCz1cBe",
  "personalChannelDate": {
    "$date": "2025-04-21T22:08:15.476Z"
  },
  "lazyCheckDate": {
    "$date": "2025-04-23T22:28:37.294Z"
  },
  "automaticCheckDate": {
    "$date": "2025-04-24T10:15:05.084Z"
  },
  "remainingTime": {
    "$date": "2025-04-22T15:46:54.004Z"
  },
  "username": "tkacheva_realistic",
  "phone": "+541125380865"
},
{
  "_id": {
    "$oid": "6806bfde461801f599f0c759"
  },
  "accountId": "7906531937-prefix-female-stomcenter",
  "dc2": "82346204cc77bad85f5b3d9132844a0717ddf7500dfda5b5695f58df1437f1f0cc3c072c8a31d23481aa0eded59699269b03509028608e04c2a13a22e2ca5d3be91de57d6c303ff0a5c9c1fcc2002e8fe7a84b97ca62998cf9b3e180a3ed437c389f894e5771f98d4c2adb0efec49bb0013ea3dd753aa99f440183b714d0ef299df3fe185dd4daba5e105e2c12e074ceb8b5733df1c5e9f59150d02b8dec41ac90fc74b7ec694659ea7bcbb63485ffbe0ab88515880df0668cf02508b0f0daa9bc5fba78d897867d90186ed8ff8658ee6c7debe5f37157f0a315e8439a5d54ddacab95f05e7b01ddf6ba11feff0ccef7d65f42cd6fb02440f56a5a4dd234a89f",
  "dcId": 2,
  "nextApiId": 2496,
  "dateUpdated": {
    "$date": "2025-04-24T10:01:06.219Z"
  },
  "twoFa": false,
  "twoFaDate": {
    "$date": "2025-04-21T22:05:28.599Z"
  },
  "banned": false,
  "firstName": "Galina",
  "id": "7906531937",
  "lastName": "Golubeva",
  "messageCount": 0,
  "personalChannelDate": {
    "$date": "2025-04-24T06:04:44.429Z"
  },
  "personalChannelError": "USER_RESTRICTED",
  "lazyCheckDate": {
    "$date": "2025-04-23T23:02:21.184Z"
  },
  "automaticCheckDate": {
    "$date": "2025-04-24T10:01:06.219Z"
  },
  "spamBlockReasons": [
    {
      "reason": "My account was wrongly limited, preventing me from messaging new contacts. I havent broken any rules or spammed. Please restore full messaging functionality.",
      "date": {
        "$date": "2025-04-21T22:43:03.347Z"
      }
    },
    {
      "reason": "Im unable to message non-mutual contacts, which is limiting my communication. I havent violated any rules, so please restore full messaging access. I hope this issue can be resolved soon.",
      "date": {
        "$date": "2025-04-22T17:02:15.062Z"
      }
    },
    {
      "reason": "I believe my recent loss of messaging rights was a mistake. Ive done nothing to violate policies and need full access to communicate with key contacts. Please restore my messaging abilities.",
      "date": {
        "$date": "2025-04-22T18:18:07.896Z"
      }
    }
  ],
  "historySpamBlocks": [
    {
      "spamBlockDate": "INFINITY",
      "spamBlockDays": 0
    }
  ],
  "spamBlockDate": "INFINITY",
  "spamBlockDays": 0,
  "spamBlockInitDate": {
    "$date": "2025-04-21T22:43:03.351Z"
  },
  "username": "golubeva_wealthy",
  "phone": "+380963781474"
},
{
  "_id": {
    "$oid": "66dee20cf856541e1b71c880"
  },
  "accountId": "1722768654-support-500-last-9-sep",
  "dc1": "0c5858635556ae1e227ec2c3a23752dd7b30b8ce96d8a61f65f6dd5bcf8e9cdc0f1631e638fdbe8e45b7410ed1de119b22d528d024341a1899ae83eceabab5c27d7744c151c1e4c1038d5017105731122a2ed10f8c03dec785e1b9c17b804877ffb325bbd24b7ebbaad837e4813a818fc965894f4a53535c01bc65ce910a4b0c15c5785406a700a5da8533027116b0c63b8cc1eac0835b5ee03624fc9b2587c8fbb23a40202026203855695e6c6687f7df55ebb6776b032ddf69fac022ed95dc2ea53259189c584bbebc76c7b390691701f5efb40d12d077ef7e6f5bb56bc6f65835e43cb27e0479d8e5b1768911d36e576e9bc7b974593173a33b0b7b30281e",
  "dc2": "7ecd9431ef01d9d478a41916a86d4d1fd92b1c5d76787c5d2bfbb2a1d3c17101b80ca565fbd04d45ac934b405694530519c907620794091a933c53a1d283891f8b3d478f7e2375c8a8cb87d45ce47d2d80b3543c228332bb326b8de424eaee176e16a6a24bd47ca18fe9c83dda44d8044eedccf2937a3b3d37006ad9756f7708a5018512cbd3bb831c7ab430a983c9f2b6142c90cc887bc040e1f5eb795dae2a0b5c75878f0f621443faf757172386c063b0a3c54ebb12ce0827110b18dccdfd8069b697468725e760fe1453050285332682f692f8239f0cfeaa2d3f21829aba87ea9479f15928b825855ec281880c37eccc49b577e54bc8f188e3002ae6e3ab",
  "dc3": "9aa3a9a4b1f9a8fee6fd7be343a2eceb0f955699f029207e6700a3ae635be20ca1ee33861587c2565c5e8c4d6a123b3b8e06105f246e3d501719bbf45e221303af35fc539561d7dc52915b7111f40b2fc5a1ad18ea777f36d0401d6375046043dc059a752095f50ef484b50cdffa1cfd379036344a18cdebbfcbe1314256ed7c3e3e5bdcd193e41d7d323af4d5ae66b711e5c336354c985b3c201cd08ae8fe32296f5ecdd1cfaa4eef4e2b9a8f2a692c16c243b253ec0748f1a53593aba9f7f02434e714aea805dfca92963a266127bfda203fe61da05086dba91c0eee353993521dc87d5b0e1eac3bef4f01277236f5c51afceebcf4086db006380e057023d8",
  "dcId": 2,
  "banned": false,
  "dateUpdated": {
    "$date": "2025-04-24T10:14:03.742Z"
  },
  "firstName": "Grigory",
  "lastName": "Smirnov",
  "messageCount": 138,
  "username": "smirnov_sorry",
  "id": "7226658755",
  "remainingTime": {
    "$date": "2025-04-22T07:53:21.616Z"
  },
  "spamInitDate": null,
  "historySpamBlocks": [
    {
      "spamBlockDate": {
        "$date": "2024-12-08T14:55:00.000Z"
      },
      "spamBlockDays": 8
    },
    {
      "spamBlockDate": {
        "$date": "2025-01-09T14:44:00.000Z"
      },
      "spamBlockDays": 30
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-09T11:37:00.000Z"
      },
      "spamBlockDays": 30
    },
    {
      "spamBlockDate": {
        "$date": "2025-01-26T07:03:00.000Z"
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
        "$date": "2025-02-07T08:14:00.000Z"
      },
      "spamBlockDays": 7
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-09T16:00:00.000Z"
      },
      "spamBlockDays": 30
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-15T20:35:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-20T12:35:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-20T12:49:00.000Z"
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
        "$date": "2025-02-27T07:59:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-06T13:23:00.000Z"
      },
      "spamBlockDays": 7
    },
    {
      "spamBlockDate": {
        "$date": "2025-04-07T08:26:00.000Z"
      },
      "spamBlockDays": 30
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-20T13:20:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-27T06:44:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-04-03T13:47:00.000Z"
      },
      "spamBlockDays": 7
    },
    {
      "spamBlockDate": {
        "$date": "2025-05-08T05:11:00.000Z"
      },
      "spamBlockDays": 30
    },
    {
      "spamBlockDate": {
        "$date": "2025-04-15T09:45:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-04-18T10:19:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-04-19T13:47:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-04-25T06:00:00.000Z"
      },
      "spamBlockDays": 3
    }
  ],
  "nextApiId": 2496,
  "twoFa": false,
  "twoFaDate": {
    "$date": "2025-04-22T12:54:24.602Z"
  },
  "automaticCheckDate": {
    "$date": "2025-04-24T10:14:03.742Z"
  },
  "lazyCheckDate": {
    "$date": "2025-04-23T13:25:22.423Z"
  },
  "stopped": false,
  "spamBlockReasons": [
    {
      "reason": "Id like to regain full messaging capabilities for my account. My recent inability to message non-mutual contacts was likely an error, as Ive never violated any rules. Im certain theres been a misunderstanding.",
      "date": {
        "$date": "2025-04-22T06:15:30.479Z"
      }
    },
    {
      "reason": "My account has been incorrectly limited in its messaging capabilities. I request its restoration, as I need to contact non-mutuals urgently. Please consider my clean record.",
      "date": {
        "$date": "2025-04-22T18:25:57.184Z"
      }
    }
  ],
  "spamBlockDate": {
    "$date": "2025-04-25T06:00:00.000Z"
  },
  "spamBlockDays": 3,
  "spamBlockInitDate": {
    "$date": "2025-04-22T06:15:30.483Z"
  },
  "phone": "+79526730380"
},
{
  "_id": {
    "$oid": "679d8382c16278163996792f"
  },
  "accountId": "5570343727",
  "dc2": "4eb4be57ece8b0ac2fc9962364e61ef10875a5626e01701ea693487cd91fcc7b771d4a0c71e58dd09d5d4d6d317904820d5fafe936f384b1fc882f17827067b4b82764f9e564fec28773cfba9f4fae5e593e8b15042dbfcba61010ac4982a7115c286be5d9f6900ab5d0d75e02168ee39390b4be6de92c002e5d4cd8f016ee0e05b644aeb2cd2a837d67004947852d7abf917f4bb3a868ca9dcc8677dd3b6420615a5622c099268d2d0b26199a8ff673b820d15da9aaa826d793735483c649e3b600e451e5d6063ac63e93df7a1f0cc7147f80c7986369cb3e30925b6a1a205d5ed8828d17eb4b6f727e1527414502ddda7af0c82f4495691d980917d18fea4f",
  "dcId": 2,
  "dateUpdated": {
    "$date": "2025-04-24T10:10:21.349Z"
  },
  "banned": false,
  "firstName": "Egor",
  "lastName": "Voronin",
  "messageCount": 172,
  "username": "voronin_implicit",
  "id": "5570343727",
  "historySpamBlocks": [
    {
      "spamBlockDate": "INFINITY",
      "spamBlockDays": 0
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-12T05:30:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-16T13:01:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-24T06:27:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-05T13:08:00.000Z"
      },
      "spamBlockDays": 7
    }
  ],
  "remainingTime": {
    "$date": "2025-04-24T12:10:21.348Z"
  },
  "nextApiId": 2040,
  "twoFa": false,
  "twoFaDate": {
    "$date": "2025-04-22T12:54:13.171Z"
  },
  "automaticCheckDate": {
    "$date": "2025-04-24T10:10:01.936Z"
  },
  "lazyCheckDate": {
    "$date": "2025-04-23T22:29:46.527Z"
  },
  "stopped": false,
  "phone": "+380974044219"
},
{
  "_id": {
    "$oid": "679d8382c162781639967944"
  },
  "accountId": "6179319047",
  "dc2": "af3aca3351b04b13e81d1e8075c44c434fd1f65f2ac252875e32ead142caeb13a5757712acf331b30cc143c4c69d3d87ffbec6d7541df520ab832932a77bfd131abef6f3bbcc7814df0c98b9e0ac381b968d509a2209fb365c3b40f18421c7ebf80efda9adc2ff03710f0277c91d21a53aabb04425cf250d4c3b698e3048af1d85345408eca3e9ce1748c546784509b1f9569c1ab46210a3333355b9a1551292caf43b55ce69cbfc9eeed8d5244bdc47021daf1cbbd36f0bbd90f019d266e46ff5176d4a18c1060c1e3ed05f555c6549ae6060a4097eb2dd68bb28db842f85fef1f4f04e3d6ee81d6e86cfa9815bbd40686ce5085809f432025eb2179e7611d7",
  "dcId": 2,
  "dateUpdated": {
    "$date": "2025-04-24T10:15:07.624Z"
  },
  "banned": false,
  "firstName": "Kirill",
  "lastName": "Nikolaev",
  "messageCount": 143,
  "username": "nikolaev_crowded",
  "id": "6179319047",
  "remainingTime": {
    "$date": "2025-04-23T16:52:25.555Z"
  },
  "historySpamBlocks": [
    {
      "spamBlockDate": {
        "$date": "2025-02-04T11:51:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-22T15:12:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-06T13:10:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-25T13:00:00.000Z"
      },
      "spamBlockDays": 7
    },
    {
      "spamBlockDate": {
        "$date": "2025-05-01T16:56:00.000Z"
      },
      "spamBlockDays": 30
    },
    {
      "spamBlockDate": {
        "$date": "2025-04-03T12:39:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-04-10T12:00:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-04-10T10:18:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-04-18T04:17:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-04-18T09:02:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-04-21T14:26:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-04-29T13:20:00.000Z"
      },
      "spamBlockDays": 7
    },
    {
      "spamBlockDate": {
        "$date": "2025-04-24T14:56:00.000Z"
      },
      "spamBlockDays": 1
    }
  ],
  "nextApiId": 2040,
  "twoFa": false,
  "twoFaDate": {
    "$date": "2025-04-22T14:22:07.940Z"
  },
  "automaticCheckDate": {
    "$date": "2025-04-24T10:15:07.624Z"
  },
  "lazyCheckDate": {
    "$date": "2025-04-23T22:50:27.917Z"
  },
  "stopped": false,
  "phone": "+380973307653",
  "spamBlockDate": {
    "$date": "2025-04-24T14:56:00.000Z"
  },
  "spamBlockDays": 1,
  "spamBlockInitDate": {
    "$date": "2025-04-23T15:23:32.146Z"
  }
},
{
  "_id": {
    "$oid": "679d8382c16278163996794f"
  },
  "accountId": "1659345357",
  "dc2": "b0b276b24feda6c6c9fd5e21135463e9d0603b9f08f725bc22868e9202bd48e4e8b57741dc530facb8462b0d75bc21af9c972a55ab824a63e03733e16e71bdf69c88c72d93fc8f1bbed09f0a0cee15c3538061f4cf9cfaf2c3c0ed9d5cc483127a7b8565aab9623e45f67cf43dd4bdce9e6b5daa4b9ea97fa142e25d0737844c630e6df9593b99e2539b9c9654fac88a7a94559b5d1b47eb98c25ce87afe50179388b9c6e537e61ca55cb59d17e2388b7f0a07dad0c543a39f3e82e537934973fc589b15f8fdfc7f4204d4f6da4ddd03de53684e6de685620fb0623524617f16d71cd121e4125344dc10de6834b4bafec2019f8145a0b4401852b578f7b81d83",
  "dcId": 2,
  "dateUpdated": {
    "$date": "2025-04-24T10:23:18.046Z"
  },
  "banned": false,
  "firstName": "Victor",
  "lastName": "Zakharov",
  "messageCount": 42,
  "username": "zakharov_head",
  "id": "1659345357",
  "historySpamBlocks": [
    {
      "spamBlockDate": "INFINITY",
      "spamBlockDays": 0
    }
  ],
  "nextApiId": 2040,
  "twoFa": false,
  "twoFaDate": {
    "$date": "2025-04-22T11:26:49.855Z"
  },
  "automaticCheckDate": {
    "$date": "2025-04-24T10:22:07.982Z"
  },
  "lazyCheckDate": {
    "$date": "2025-04-23T22:24:45.169Z"
  },
  "remainingTime": {
    "$date": "2025-04-24T12:23:18.045Z"
  },
  "stopped": false,
  "phone": "+380688940902"
},
{
  "_id": {
    "$oid": "679d8a3cc162781639967ccd"
  },
  "accountId": "6795662329",
  "dc1": "1c7d61f2ab772554300c09a19f20632b793402031ab9cf0756383d3f277286e3955e4acea45242e8d0594c9bd20710737f70d0d08ad1591ea11ae3e87032987cd209ab01e0d67bb56338e5bf337e16c6d94dd9271213ebbc0a39226d7b2262fb50a735f89fca57f865b2821f1dd9640bcb94928dd5f0118f6b11fe49e14670db24a3591d697676ce8ec913d7c6065d300c3dcc8e28f18421c192819a57cd162fdc3b8c2897a7d18bcaf842489df6c613d3d713d2004a5128b0bb4436a36a39d0e086f3dfbad44901cdf70311c9d298a47e66f1285bd79214afe9f388a029cad0f1c324b22e9421f4f11f858d309829a5971880d214e31adea4694707a9c36046",
  "dcId": 1,
  "dateUpdated": {
    "$date": "2025-04-24T10:21:04.341Z"
  },
  "banned": false,
  "firstName": "Pavel",
  "lastName": "Pavlov",
  "messageCount": 100,
  "username": "pavlov_surprised",
  "id": "6795662329",
  "remainingTime": {
    "$date": "2025-04-24T11:01:17.567Z"
  },
  "historySpamBlocks": [
    {
      "spamBlockDate": {
        "$date": "2025-02-07T07:11:00.000Z"
      },
      "spamBlockDays": 3
    }
  ],
  "nextApiId": 2040,
  "twoFa": false,
  "twoFaDate": {
    "$date": "2025-04-22T12:54:26.245Z"
  },
  "automaticCheckDate": {
    "$date": "2025-04-24T10:21:04.341Z"
  },
  "lazyCheckDate": {
    "$date": "2025-04-23T22:45:27.497Z"
  },
  "stopped": false,
  "phone": "+50493380470"
},
{
  "_id": {
    "$oid": "67a9359df5fa1dc494bbe697"
  },
  "accountId": "5737159558-prefix-aisender",
  "dc2": "59f64455db9936de1269404b04a3625106658ed7a4aca811431d5f4cec3aa8bd9316b9ddf57bd4cd51ead1ea8357314948a3220af5f2d45a0b1e46c6a17e2afc5e9725daed253762ead701a7d095c30fa6bf685172eae67d90a43520b4696e44dba4b26684af84b69743e12eae72a9cd31c612c13fc5e2ff46cb3eda3d529812c7eadde650e0a3a135bdfd0d9c4acd81d30ace86fd6b069be38e8b43f87b3d6d6c1d508094b9c9fbf704a7c82a6fa8282a37d4a511f4f1c659ff71063ab86ad15b689df9541b1aaaeb7ce18038c5da270d5b1bf3dd9e216e3b95a746234d49fb893c793e3bbb92ef38ca46d8f6a4e6be8b0e1810d25fd0d6db094348986c9f0f",
  "dcId": 2,
  "nextApiId": 2040,
  "dateUpdated": {
    "$date": "2025-04-24T10:24:12.387Z"
  },
  "banned": false,
  "firstName": "Ruslan",
  "lastName": "Kalinin",
  "messageCount": 237,
  "id": "5737159558",
  "remainingTime": {
    "$date": "2025-04-24T11:40:34.470Z"
  },
  "historySpamBlocks": [
    {
      "spamBlockDate": {
        "$date": "2025-02-15T07:58:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-21T10:51:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-04T07:40:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-04-02T10:03:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-04-10T15:56:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-04-17T07:35:00.000Z"
      },
      "spamBlockDays": 1
    }
  ],
  "twoFa": false,
  "twoFaDate": {
    "$date": "2025-03-17T08:52:53.166Z"
  },
  "automaticCheckDate": {
    "$date": "2025-04-24T10:24:12.387Z"
  },
  "lazyCheckDate": {
    "$date": "2025-04-23T22:58:31.274Z"
  },
  "stopped": false,
  "personalChannel": "iIoTgMycwodoBAF0",
  "personalChannelDate": {
    "$date": "2025-04-21T10:55:59.830Z"
  },
  "username": "kalinin_democratic",
  "phone": "+380963039854"
},
{
  "_id": {
    "$oid": "67a935a4f5fa1dc494bbe8e8"
  },
  "accountId": "6447254649-prefix-aisender",
  "dc2": "2f2eb68b24b27129316775912a82f506e02661b81a560a06355b4b08743470aecd3a0e9516973d94d142a419d333c2c07115e2c9d165680da499b5628747e2287a8bbbe61bb22763801b4be5fe54aa940ddc9e9393082e8a7d351e93b864f7a3dde9c4d463684b3b7432fd53dfc0caecdca7274365d15cbd5abc83a4ab69802b493923aae25ec5f0f608193e80b02439754fbfeaf76b064860f973427daba9995b95a3de74e903f722acde8020f0a1209de1c173237625a22a4b5689cf346050ec707e677341f97cd7df6bb57ca02bfb89619b4ba8b2de53b76401d4fdc34d53ac4b7f3a4a515201660ae242ca655db5dd7e5cafd635926f1c7bfab20568f2a5",
  "dcId": 2,
  "nextApiId": 2040,
  "dateUpdated": {
    "$date": "2025-04-24T10:12:08.989Z"
  },
  "banned": false,
  "firstName": "Ilya",
  "lastName": "Savin",
  "messageCount": 238,
  "id": "6447254649",
  "remainingTime": {
    "$date": "2025-04-24T11:25:29.332Z"
  },
  "historySpamBlocks": [
    {
      "spamBlockDate": {
        "$date": "2025-02-13T13:45:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-28T08:51:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-15T11:48:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-28T15:25:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-04-10T05:56:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-04-12T16:09:00.000Z"
      },
      "spamBlockDays": 1
    }
  ],
  "twoFa": false,
  "twoFaDate": {
    "$date": "2025-04-22T13:39:47.572Z"
  },
  "automaticCheckDate": {
    "$date": "2025-04-24T10:12:08.989Z"
  },
  "lazyCheckDate": {
    "$date": "2025-04-23T22:20:40.150Z"
  },
  "stopped": false,
  "personalChannel": "yvlVoePSP5grebEy",
  "personalChannelDate": {
    "$date": "2025-04-21T10:57:30.964Z"
  },
  "username": "savin_gastric",
  "phone": "+380669085401"
},
{
  "_id": {
    "$oid": "67a935c6f5fa1dc494bbecd1"
  },
  "accountId": "7165245950-prefix-aisender",
  "dc2": "958afacc6b0b4d44c22a98f515d0bf16ac83cfe599ce4bc08077bac2012f8765c16c9ee14d763e49ac4e3e5f254f93f2a6c7e79262841fd69327922c2f28942ded76ad6e3213639fa24db7017a0059e50bde21d99fec585bd779d11d29d486e319f5cf924a029d706dbdaceaabd0cd3ea14429c342eb91c5ea10eed7b9a3d2ac1c643d063c044979b893977e1ee540f86b35b730ade4f4f65ef4741302dce25a19d9074e14e3d46aa1d2e933f15ea67437100dd8d106c4573d1aa5d4892bfc167ce734b1517bb69e555b6bc69e0544fab2e072cfed4d1dbca193b4c0179a2684cea1776869a1c71a6475086758c7352dceb471b08ed249b9c80691941cc126ec",
  "dcId": 2,
  "nextApiId": 2496,
  "dateUpdated": {
    "$date": "2025-04-24T09:59:08.891Z"
  },
  "banned": false,
  "firstName": "Ruslan",
  "lastName": "Sokolov",
  "messageCount": 0,
  "id": "7165245950",
  "historySpamBlocks": [
    {
      "spamBlockDate": "INFINITY",
      "spamBlockDays": 0
    }
  ],
  "spamBlockDate": "INFINITY",
  "spamBlockDays": 0,
  "spamBlockInitDate": {
    "$date": "2025-02-09T23:50:47.746Z"
  },
  "twoFa": false,
  "twoFaDate": {
    "$date": "2025-04-22T14:58:53.424Z"
  },
  "automaticCheckDate": {
    "$date": "2025-04-24T09:59:08.891Z"
  },
  "spamBlockReasons": [
    {
      "reason": "My account is experiencing issues with messaging functionality, which is preventing me from reaching all my contacts. I believe this is a mistake as Ive not violated any rules. Please restore my full access.",
      "date": {
        "$date": "2025-03-18T11:28:03.424Z"
      }
    },
    {
      "reason": "I believe my account has been mistakenly limited due to an error. I cant send messages unless I have mutual contacts, which is inconvenient for reaching important people. Please restore my full messaging capabilities.",
      "date": {
        "$date": "2025-03-18T19:43:57.452Z"
      }
    },
    {
      "reason": "Im unable to contact non-mutual users, despite following community guidelines. This restriction is a mistake and needs urgent removal so I can message for work. Please fix this error.",
      "date": {
        "$date": "2025-03-18T21:14:27.953Z"
      }
    },
    {
      "reason": "Im unable to message new contacts due to an error, despite never engaging in any spam or violations. Id like my full messaging capabilities restored. Thank you.",
      "date": {
        "$date": "2025-03-19T11:30:53.502Z"
      }
    },
    {
      "reason": "Ive been a long-time active user with a clean record, so Im confident my account was mistakenly flagged. I need to send a crucial work-related message ASAP; please help me regain full access. Thanks for understanding.",
      "date": {
        "$date": "2025-03-19T14:17:12.711Z"
      }
    },
    {
      "reason": "Ive been mistakenly flagged for sending messages, preventing me from reaching all my contacts. I havent done anything wrong and need this fixed ASAP. Thanks for looking into it.",
      "date": {
        "$date": "2025-03-19T20:10:19.444Z"
      }
    },
    {
      "reason": "I cant message all my contacts, even though I havent done anything wrong. This is an error, as I need to reach people urgently. Please review and restore my full messaging capabilities.",
      "date": {
        "$date": "2025-03-20T06:33:05.903Z"
      }
    },
    {
      "reason": "I believe my messaging capabilities were limited by mistake. I didnt break any rules or spam others. Kindly review my case and restore my accounts full functionality.",
      "date": {
        "$date": "2025-03-20T09:02:06.694Z"
      }
    },
    {
      "reason": "My account needs its full messaging functionality back ASAP. Theres been a mistake – I didnt break any rules. Please review my case and restore my access to reach all contacts.",
      "date": {
        "$date": "2025-03-21T07:48:20.500Z"
      }
    },
    {
      "reason": "Im experiencing an issue with messaging on my account. Recently, Ive been unable to contact important non-mutual connections, which is impacting my work. Kindly review my case and restore full messaging functionality.",
      "date": {
        "$date": "2025-03-25T16:08:48.424Z"
      }
    },
    {
      "reason": "Id like my messaging feature back ASAP. Im missing out on important work conversations due to this unexpected issue. Ive been a responsible user with no violations, so please review and fix this.",
      "date": {
        "$date": "2025-03-25T21:14:25.653Z"
      }
    },
    {
      "reason": "My account is currently limited to messaging mutual contacts, which is affecting my ability to communicate with essential connections. I havent been involved in any questionable activity, so I believe this restriction might be a mistake. Please restore full messaging functionality.",
      "date": {
        "$date": "2025-03-27T11:48:30.785Z"
      }
    },
    {
      "reason": "Ive recently been unable to send messages to non-mutual contacts, which is affecting my work. I believe this is an error, as I havent violated any rules. Please review and restore my full messaging capabilities.",
      "date": {
        "$date": "2025-03-27T18:54:03.814Z"
      }
    },
    {
      "reason": "Im unable to message new contacts due to an apparent error. My account hasnt violated any rules, and Id like to get back to normal messaging soon. Could you review my case?",
      "date": {
        "$date": "2025-03-28T08:24:02.568Z"
      }
    },
    {
      "reason": "I want to resolve this issue ASAP. Ive done nothing wrong, and my inability to contact certain users disrupts my workflow. I need full access to resume my activities.",
      "date": {
        "$date": "2025-04-03T18:58:23.016Z"
      }
    },
    {
      "reason": "Im reaching out to clarify that my account has been mistakenly limited in its messaging capabilities. Id appreciate it being reinstated so I can get back to my job ASAP.",
      "date": {
        "$date": "2025-04-03T20:14:02.153Z"
      }
    },
    {
      "reason": "Id like to regain my full messaging capabilities, as Im currently unable to message non-mutual contacts. Ive never violated any rules and believe this limitation is a mistake. Please review my case and restore my access.",
      "date": {
        "$date": "2025-04-06T16:40:08.934Z"
      }
    },
    {
      "reason": "Id like to resolve an issue with my Telegram account. Recently, Ive been unable to message non-mutual contacts, which limits my communication. Please review my account, as I believe this restriction is an error.",
      "date": {
        "$date": "2025-04-08T17:15:42.416Z"
      }
    },
    {
      "reason": "Id like to regain full access to messaging on my account. Im currently unable to reach essential contacts due to an error, as I havent violated any policies. Kindly review my case and restore my messaging rights.",
      "date": {
        "$date": "2025-04-09T12:24:32.403Z"
      }
    },
    {
      "reason": "Id like to regain full messaging access to my account. Im sure theres been a mistake, as Ive followed all guidelines and havent done anything wrong. I urgently need to message some colleagues for work.",
      "date": {
        "$date": "2025-04-10T16:05:21.790Z"
      }
    },
    {
      "reason": "Im unable to message new contacts due to an unexpected limitation on my account. Id like to get this fixed as Ive done nothing against the rules. Please review and restore my messaging access.",
      "date": {
        "$date": "2025-04-12T15:00:00.178Z"
      }
    },
    {
      "reason": "My accounts current status is unfair and unwarranted. Ive done nothing wrong and Im sure its a mistake. Please let me message anyone freely again.",
      "date": {
        "$date": "2025-04-14T12:26:24.747Z"
      }
    },
    {
      "reason": "Im reaching out about my accounts messaging functionality. It seems to be restricted despite my clean record and no policy violations. Please review and restore my full access.",
      "date": {
        "$date": "2025-04-16T06:41:10.678Z"
      }
    },
    {
      "reason": "For non-suspicious reasons, Im sure. I havent violated any policies or done anything suspicious, yet Im restricted from messaging.",
      "date": {
        "$date": "2025-04-16T12:59:13.151Z"
      }
    },
    {
      "reason": "Id like my messaging function fully restored. I believe this limitation is a mistake as Ive not violated any rules. I need access to communicate with non-mutual contacts for essential purposes.",
      "date": {
        "$date": "2025-04-17T19:54:34.432Z"
      }
    },
    {
      "reason": "Ive been unfairly limited from messaging new contacts. I havent violated any rules and dont engage in spam or suspicious activities. Please review and restore my full messaging access.",
      "date": {
        "$date": "2025-04-19T10:45:54.547Z"
      }
    },
    {
      "reason": "Im unable to message non-mutual contacts, even though my account is active. I believe this is an error, as Ive not violated any rules. Please restore my full messaging capabilities.",
      "date": {
        "$date": "2025-04-20T12:14:27.939Z"
      }
    },
    {
      "reason": "Ive been incorrectly limited in messaging people who arent mutual contacts. My work depends on this function. Please restore full messaging access ASAP.",
      "date": {
        "$date": "2025-04-20T16:24:40.667Z"
      }
    },
    {
      "reason": "My account has been mistakenly limited, preventing me from messaging important contacts. I havent done anything wrong and believe this action was taken in error. Please restore my full messaging capabilities.",
      "date": {
        "$date": "2025-04-20T17:42:44.251Z"
      }
    },
    {
      "reason": "I believe my account has been incorrectly flagged, limiting my messaging capabilities. Please review my case as Ive never violated any rules and wish to continue using Telegram without restrictions.",
      "date": {
        "$date": "2025-04-21T11:57:51.577Z"
      }
    },
    {
      "reason": "Id like to get my message functionality back, since I never broke any rules. I need to be able to contact people who arent mutuals. Please review.",
      "date": {
        "$date": "2025-04-21T22:33:58.468Z"
      }
    },
    {
      "reason": "My messaging capabilities are limited, and I believe this is a mistake. Ive not violated any rules and need full access to reach contacts outside my mutual list urgently. Please restore my accounts functionality.",
      "date": {
        "$date": "2025-04-22T16:54:45.287Z"
      }
    },
    {
      "reason": "Im unable to reach crucial contacts due to a sudden block on messaging non-mutuals. My activity is clean, so this restriction is likely an error. Please restore full access ASAP.",
      "date": {
        "$date": "2025-04-22T18:26:00.716Z"
      }
    }
  ],
  "stopped": false,
  "lazyCheckDate": {
    "$date": "2025-04-23T23:07:32.293Z"
  },
  "personalChannelDate": {
    "$date": "2025-04-24T06:04:56.390Z"
  },
  "personalChannelError": "USER_RESTRICTED",
  "username": "sokolov_residential",
  "phone": "+380689724667"
},
{
  "_id": {
    "$oid": "67a935d1f5fa1dc494bbeebe"
  },
  "accountId": "5684983534-prefix-aisender",
  "dc2": "1567439b6c7f5d752959ab1c739c5a7018d4fa64675f04beda57a5782f61f93f53257c05ce1a8abe4c5c1a857586258b888a3fa2a0f3b813ae97c2608110ba714f22a4a50d5e5dbc4d200fe7296e086e2ca4deb143c5cc31af3ebb6397bc04feb1b7d783bae8b509a254118aabf0571db4d34109807a69459bc64783177ffd543375315a76a3106b6d7a6154e028d74e2b408bb6c1d462813ea5cd3ae45bb85e974e2557d26f1615695427d216e6b90845dbe14e21f5c6890a5b6246bbd9c8040422ff24687b3376a241bdce01679093c9b8930f9bf8f4fa1a31382c278c0447d3d9906b3b81e747b130e428d3812f39c7dee174954f8e6a7ec934b796519db8",
  "dcId": 2,
  "nextApiId": 2496,
  "dateUpdated": {
    "$date": "2025-04-24T10:11:10.011Z"
  },
  "banned": false,
  "firstName": "Maksim",
  "lastName": "Nesterov",
  "messageCount": 0,
  "id": "5684983534",
  "historySpamBlocks": [
    {
      "spamBlockDate": "INFINITY",
      "spamBlockDays": 0
    }
  ],
  "spamBlockDate": "INFINITY",
  "spamBlockDays": 0,
  "spamBlockInitDate": {
    "$date": "2025-02-09T23:57:47.331Z"
  },
  "twoFa": false,
  "twoFaDate": {
    "$date": "2025-04-22T14:59:07.451Z"
  },
  "automaticCheckDate": {
    "$date": "2025-04-24T10:11:10.011Z"
  },
  "spamBlockReasons": [
    {
      "reason": "I recently experienced an issue where my account was incorrectly limited, preventing me from messaging new contacts. I believe this was a mistake as I havent broken any rules. Please restore my full messaging capabilities.",
      "date": {
        "$date": "2025-03-18T19:42:09.881Z"
      }
    },
    {
      "reason": "Im unable to message new contacts due to an error, despite having a clean record. Please restore my messaging function, as Ive never engaged in any suspicious activities or violations.",
      "date": {
        "$date": "2025-03-19T14:06:00.080Z"
      }
    },
    {
      "reason": "I want to clarify that my recent inability to message new contacts is a mistake. Ive never spammed anyone and always follow the rules. Kindly review my case and restore my full messaging access.",
      "date": {
        "$date": "2025-03-19T20:06:28.800Z"
      }
    },
    {
      "reason": "Im confident that the recent action limiting my messaging capabilities is an error. My account activity demonstrates no rule violations, and Ive never sent spam. Kindly review and restore my full messaging access.",
      "date": {
        "$date": "2025-03-19T21:15:48.616Z"
      }
    },
    {
      "reason": "Ive been mistakenly blocked from reaching new contacts via direct messages, hindering crucial communication. Despite not breaking any rules, I cant message people I need to reach. Please restore my full messaging capabilities.",
      "date": {
        "$date": "2025-03-20T06:28:43.120Z"
      }
    },
    {
      "reason": "I need to communicate with non-mutual contacts for important matters. My account seems to be mistakenly limited, as Ive not been involved in any suspicious activity. Kindly review and restore full messaging functionality.",
      "date": {
        "$date": "2025-03-20T08:59:50.532Z"
      }
    },
    {
      "reason": "I believe my account has been incorrectly flagged. Ive never spammed or violated any rules, so please restore my messaging function. Lets resolve this issue promptly.",
      "date": {
        "$date": "2025-03-21T07:26:04.955Z"
      }
    },
    {
      "reason": "Ive been locked out of messaging on Telegram, even though I havent done anything wrong. Please restore my access so I can contact those who arent mutuals. Thanks.",
      "date": {
        "$date": "2025-03-25T16:15:22.243Z"
      }
    },
    {
      "reason": "My accounts message functionality needs fixing, as Im sure its a mistake. Ive done nothing wrong, yet I can only text shared contacts.",
      "date": {
        "$date": "2025-03-27T11:53:44.283Z"
      }
    },
    {
      "reason": "My accounts messaging feature needs to be restored ASAP as I need to contact someone for work. I havent broken any rules and believe this was an error. Please lift the messaging restriction.",
      "date": {
        "$date": "2025-04-03T11:54:15.531Z"
      }
    },
    {
      "reason": "Ive been locked out of contacting many of my non-mutual friends, which is crucial for urgent communication. I believe this is an error, as I havent done anything against the rules. Please restore my full messaging access.",
      "date": {
        "$date": "2025-04-03T19:11:06.138Z"
      }
    },
    {
      "reason": "I need to regain full messaging access for work reasons. Im confident my account was wrongly limited, as Ive never violated any policies. Please review this issue promptly.",
      "date": {
        "$date": "2025-04-08T17:29:08.693Z"
      }
    },
    {
      "reason": "I am reaching out regarding my accounts messaging function, believing a mistake has occurred. Despite no violations, Im limited to contacting mutuals. Please review this error.",
      "date": {
        "$date": "2025-04-09T12:26:56.908Z"
      }
    },
    {
      "reason": "I need to regain full messaging access. Im blocked from reaching new contacts, but Ive done nothing wrong or suspicious. Kindly review my account activity and restore my rights.",
      "date": {
        "$date": "2025-04-12T15:17:56.471Z"
      }
    },
    {
      "reason": "Ive been unfairly limited in my messaging capabilities, unable to initiate conversations with new contacts. I assure you that my actions havent warranted such restrictions, and I request that you restore my full messaging access.",
      "date": {
        "$date": "2025-04-14T12:23:39.298Z"
      }
    },
    {
      "reason": "My account currently has limited messaging capabilities, affecting my ability to communicate with key contacts. I request message functionality restoration, as I believe my account was incorrectly flagged. Thanks for your understanding.",
      "date": {
        "$date": "2025-04-16T06:58:32.916Z"
      }
    },
    {
      "reason": "My account is currently unable to message non-mutual contacts, which is affecting my important communication needs. I havent done anything wrong and believe this restriction is a mistake. Please restore my full messaging access.",
      "date": {
        "$date": "2025-04-16T10:41:15.944Z"
      }
    },
    {
      "reason": "I believe my message functionality was mistakenly limited. I have not participated in any suspicious activity and request full messaging access. Please review and restore my accounts messaging capabilities.",
      "date": {
        "$date": "2025-04-16T13:12:12.361Z"
      }
    },
    {
      "reason": "Im unable to message some contacts, which is impacting my communication. I believe this is a mistake, as Ive followed all guidelines. Kindly review and restore full messaging access.",
      "date": {
        "$date": "2025-04-17T20:13:12.292Z"
      }
    },
    {
      "reason": "I believe my account has been incorrectly limited in its messaging capabilities. I havent broken any rules, and I need to contact people who arent mutuals ASAP. Please review this case.",
      "date": {
        "$date": "2025-04-19T10:36:22.089Z"
      }
    },
    {
      "reason": "Im unable to message users who arent mutual contacts, which limits my communication. I havent broken any rules and believe this restriction is a mistake. Please restore my full messaging capabilities.",
      "date": {
        "$date": "2025-04-20T16:31:32.539Z"
      }
    },
    {
      "reason": "My account was wrongly limited, preventing me from messaging non-mutual contacts. I havent violated any rules or engaged in spam, so I request that my full messaging capabilities be restored. Please review this error.",
      "date": {
        "$date": "2025-04-21T21:56:41.507Z"
      }
    },
    {
      "reason": "My accounts current limitations hinder my communication with non-mutual contacts, which is crucial at this time. I believe this restriction is a mistake as I havent violated any policies. Kindly restore my full messaging capabilities.",
      "date": {
        "$date": "2025-04-22T17:07:52.354Z"
      }
    }
  ],
  "stopped": false,
  "lazyCheckDate": {
    "$date": "2025-04-23T22:14:52.452Z"
  },
  "personalChannelDate": {
    "$date": "2025-04-24T06:04:53.316Z"
  },
  "personalChannelError": "USER_RESTRICTED",
  "username": "nesterov_electoral",
  "phone": "+380990914152"
},
{
  "_id": {
    "$oid": "67a935fff5fa1dc494bbf794"
  },
  "accountId": "7788653474-prefix-aisender",
  "dc2": "962bf7450f2c533a68c94258fac8fd8a458f1aad045dc95b921c30c85e805d3608d295016a74759eb15825176d5f01d4d4fe1d7dcd350fcfcbc3c30ad773e6994586a405959407af86063a1e9777b613b076a24bb0c0f04dbd791e8ddb7d904fd2f02fe2257b6a89f32181989d0236049728e19bcc4ec8f6c4dad7be15a45682fe36a7ab1737dc86c89ae1843f90e8125e6c8154909082f4927a5ad55a293dd3f6458641efd2a732244f85cb472d7047284875e2fc2025dbbec8af4b97a890b267be37a27558b930420d9b3a9699925708e27ccb6b10626072f2b84de95342a00236a8b1b6f032ba579eb7e17e3e06429a0d51a179a1863be4dd5e2407cf0974",
  "dcId": 2,
  "nextApiId": 2496,
  "dateUpdated": {
    "$date": "2025-04-24T10:16:11.299Z"
  },
  "banned": false,
  "firstName": "Matvey",
  "lastName": "Chirkov",
  "messageCount": 0,
  "id": "7788653474",
  "historySpamBlocks": [
    {
      "spamBlockDate": "INFINITY",
      "spamBlockDays": 0
    }
  ],
  "spamBlockDate": "INFINITY",
  "spamBlockDays": 0,
  "spamBlockInitDate": {
    "$date": "2025-02-10T00:03:52.441Z"
  },
  "twoFa": false,
  "twoFaDate": {
    "$date": "2025-04-22T12:54:28.669Z"
  },
  "automaticCheckDate": {
    "$date": "2025-04-24T10:16:11.299Z"
  },
  "spamBlockReasons": [
    {
      "reason": "I recently encountered a messaging issue on my account. Im certain I havent violated any rules, so please restore my full messaging functionality ASAP. I need to contact non-mutuals for work.",
      "date": {
        "$date": "2025-03-18T16:01:42.120Z"
      }
    },
    {
      "reason": "I cant message anyone except mutual contacts, which isnt fair since I havent broken any rules. Please restore my full messaging functionality.",
      "date": {
        "$date": "2025-03-18T18:23:33.957Z"
      }
    },
    {
      "reason": "Id like to regain full messaging access on my account. Theres been a mistake, as I havent broken any rules. Please review my case.",
      "date": {
        "$date": "2025-03-19T14:09:48.001Z"
      }
    },
    {
      "reason": "I need to send important work messages, but my account is currently limited. I havent broken any rules and think this might be a mistake. Please restore my full messaging access ASAP.",
      "date": {
        "$date": "2025-03-19T17:11:57.545Z"
      }
    },
    {
      "reason": "Im unable to reach non-mutual contacts due to an apparent error. Ive been an active and law-abiding user, so I kindly ask you to restore my messaging function. My urgent need to contact people outside my immediate network is time-sensitive.",
      "date": {
        "$date": "2025-03-19T18:29:19.944Z"
      }
    },
    {
      "reason": "I recently noticed that my account has been limited in its messaging capabilities, which is unexpected. I havent violated any rules, and this seems like a mistake. Please restore my full access.",
      "date": {
        "$date": "2025-03-19T20:00:54.414Z"
      }
    },
    {
      "reason": "I need to regain full messaging access. I didnt spam or violate any rules, so this limit seems unfair. Please review my case.",
      "date": {
        "$date": "2025-03-19T21:17:26.066Z"
      }
    },
    {
      "reason": "I recently encountered an issue with my accounts messaging functionality. Im certain I havent violated any rules, but now Im unable to reach new contacts, which hinders my work. Please fix this, so I can use the app normally.",
      "date": {
        "$date": "2025-03-19T22:30:17.847Z"
      }
    },
    {
      "reason": "Id like to regain full messaging access on my Telegram account. There must be a mistake—I havent violated any rules or engaged in suspicious activity. Please review.",
      "date": {
        "$date": "2025-03-21T17:56:49.965Z"
      }
    },
    {
      "reason": "Im unable to send messages to new contacts, despite never participating in any malicious activity. Id like to regain full access without restrictions, as there seems to be a mistake. Please review my case.",
      "date": {
        "$date": "2025-03-25T16:28:28.609Z"
      }
    },
    {
      "reason": "Id like to regain full messaging access, as I can currently only message mutual contacts. Ive done nothing wrong and need to urgently contact colleagues via Telegram. Please restore my full messaging capabilities.",
      "date": {
        "$date": "2025-03-31T16:24:51.329Z"
      }
    },
    {
      "reason": "Id like to request the removal of message-sending limitations on my account. Ive been incorrectly restricted, as I havent broken any rules or spammed anyone. Kindly review and restore my full messaging access.",
      "date": {
        "$date": "2025-04-03T19:09:56.649Z"
      }
    },
    {
      "reason": "Id like to clarify my messaging capabilities as soon as possible. I havent done anything wrong and need to send a work-related message immediately. Thanks for understanding.",
      "date": {
        "$date": "2025-04-06T16:37:39.142Z"
      }
    },
    {
      "reason": "I recently encountered an issue with my Telegram account, preventing me from sending messages freely. Despite following community guidelines, Im unable to message new contacts. Please restore full messaging functionality to my account.",
      "date": {
        "$date": "2025-04-07T13:45:33.981Z"
      }
    },
    {
      "reason": "My account seems to have been incorrectly flagged, as Im unable to message non-mutual contacts. Please restore my full messaging capabilities, as this issue hinders my communication with important connections.",
      "date": {
        "$date": "2025-04-08T17:31:09.653Z"
      }
    },
    {
      "reason": "I want to clarify that my recent messaging activity hasnt violated any rules. It seems theres been a mistake, as Im unable to send messages unless its to mutual contacts. Please help me restore full functionality.",
      "date": {
        "$date": "2025-04-09T12:13:37.907Z"
      }
    },
    {
      "reason": "I believe my message-sending function was restricted by mistake. I havent done anything wrong and need to contact people outside my network. Kindly restore my accounts full functionality.",
      "date": {
        "$date": "2025-04-09T13:39:37.162Z"
      }
    },
    {
      "reason": "I believe theres been a mistake. Im unable to message non-mutual contacts, even though Ive done nothing wrong. Please restore my full messaging capabilities ASAP.",
      "date": {
        "$date": "2025-04-12T15:08:18.622Z"
      }
    },
    {
      "reason": "I believe my accounts messaging function was mistakenly limited. I havent done anything wrong and need to urgently contact non-mutual work contacts. Please restore my access to messaging.",
      "date": {
        "$date": "2025-04-14T12:15:01.965Z"
      }
    },
    {
      "reason": "Im unable to message non-mutual contacts, which is causing urgent communication issues. My account hasnt been involved in any suspicious activity, and this messaging block seems like an error. Please restore full messaging functionality.",
      "date": {
        "$date": "2025-04-14T18:40:12.504Z"
      }
    },
    {
      "reason": "Id like my messaging function back. I cant message new contacts, although Ive done nothing wrong. Please review this limitation as it was likely a mistake.",
      "date": {
        "$date": "2025-04-16T06:42:24.686Z"
      }
    },
    {
      "reason": "I believe my messaging feature was wrongly limited. I have no record of inappropriate behavior and need to send important work messages ASAP. Please review and restore my full access.",
      "date": {
        "$date": "2025-04-16T13:11:28.949Z"
      }
    },
    {
      "reason": "Im unable to message new contacts due to an apparent error. I havent violated any policies or engaged in suspicious behavior. Kindly review and restore my messaging functionality.",
      "date": {
        "$date": "2025-04-16T16:52:12.799Z"
      }
    },
    {
      "reason": "I recently lost the ability to message new contacts, even though Ive followed the rules. I never spammed or violated any policies, so this change seems like an error. Please review my account and restore my full messaging capabilities.",
      "date": {
        "$date": "2025-04-17T20:08:52.979Z"
      }
    },
    {
      "reason": "Im unable to message non-mutual contacts, limiting my communication. I havent broken any rules and would like to regain full access soon. Kindly review my account status.",
      "date": {
        "$date": "2025-04-19T09:56:18.641Z"
      }
    },
    {
      "reason": "Im unable to message important contacts due to an error. I havent done anything wrong and would like to regain full access. Please review and restore my messaging function.",
      "date": {
        "$date": "2025-04-20T12:39:08.258Z"
      }
    },
    {
      "reason": "I recently lost the ability to message users outside my mutual contacts, preventing me from reaching essential connections. Id appreciate getting this fixed, as I believe its a mistake, and I havent done anything wrong. Thanks in advance for your help.",
      "date": {
        "$date": "2025-04-20T16:23:44.848Z"
      }
    },
    {
      "reason": "My account is experiencing issues with sending messages, impacting my ability to communicate freely. I havent violated any rules and request to restore full messaging functionality. Kindly review and rectify this matter promptly.",
      "date": {
        "$date": "2025-04-21T21:58:05.009Z"
      }
    },
    {
      "reason": "I need my messaging functionality back ASAP for a time-sensitive work matter. I believe this restriction is a mistake as Ive followed all guidelines. Please review and restore access.",
      "date": {
        "$date": "2025-04-22T16:55:58.138Z"
      }
    },
    {
      "reason": "Ive been unable to send messages to non-mutual contacts, which is affecting my work. Please review my account, as I believe this restriction is an error. Im an active, responsible user with no record of negative activity.",
      "date": {
        "$date": "2025-04-22T18:24:57.977Z"
      }
    }
  ],
  "stopped": false,
  "lazyCheckDate": {
    "$date": "2025-04-23T13:29:22.809Z"
  },
  "personalChannelDate": {
    "$date": "2025-04-24T06:04:56.265Z"
  },
  "personalChannelError": "USER_RESTRICTED",
  "username": "chirkov_uncomfortable",
  "phone": "+380978041037"
},
{
  "_id": {
    "$oid": "67a9379ff5fa1dc494bc3a57"
  },
  "accountId": "7989138606",
  "dc2": "13970bac036bcc8f4460d614794d19f272ff862ddcea351d315f7ccd91c8e5f7f0941fab4ed0a9c9773589086a587580bcc0be98bd54fc20b272d93ec0d763cc2bb3571f2a5eb19105001bc72872e2a275170d6b1af86354b929bdc4ad2b11adb50146dee535838f2bac366f2ca235532f7ee93343ab4f56f736ff6bdf3ee5634907a0cd641657163ecd38a86fbe07f75ef0a051e85c6d1d3966fcc6b45e6336de00b7b67b2765273ae70fee2594d038a91a2af6cc95d5d86e13ae03b01284e0065b9ae5f0ffc0cf8c1d91284b27431de35032060f44f63b3d6651ac2626cac5f48d366f12ea47a671a3af0ba9d037049efd4ad748c7a9bd345aa8567889215b",
  "dcId": 2,
  "nextApiId": 2040,
  "dateUpdated": {
    "$date": "2025-04-24T10:26:13.960Z"
  },
  "banned": false,
  "firstName": "Valeriy",
  "lastName": "Anisimov",
  "messageCount": 0,
  "username": "anisimov_correct",
  "id": "7989138606",
  "historySpamBlocks": [
    {
      "spamBlockDate": "INFINITY",
      "spamBlockDays": 0
    }
  ],
  "spamBlockDate": "INFINITY",
  "spamBlockDays": 0,
  "spamBlockInitDate": {
    "$date": "2025-02-09T23:42:38.644Z"
  },
  "twoFa": false,
  "automaticCheckDate": {
    "$date": "2025-04-24T10:26:13.960Z"
  },
  "spamBlockReasons": [
    {
      "reason": "I believe my accounts messaging function was mistakenly limited. I need to reach contacts urgently, so please restore full access. I havent done anything against the rules, and this issue is causing a lot of trouble.",
      "date": {
        "$date": "2025-03-18T12:19:52.360Z"
      }
    },
    {
      "reason": "Im experiencing an issue with my account regarding message delivery. My actions dont violate any policies, so I kindly request that you restore full messaging functionality. Please consider my case, as its affecting my ability to communicate effectively.",
      "date": {
        "$date": "2025-03-18T21:07:59.091Z"
      }
    },
    {
      "reason": "Ive been a long-time Telegram user and havent broken any rules, so its likely that my current issue is a mistake. I cant send messages to some contacts, which limits my communication. Please restore my full messaging capabilities.",
      "date": {
        "$date": "2025-03-19T11:26:34.553Z"
      }
    },
    {
      "reason": "Ive been unable to send messages due to restrictions, but I need to contact someone outside my network for work. I havent done anything wrong, so Id like to regain full access soon. Please review and resolve this issue promptly.",
      "date": {
        "$date": "2025-03-19T18:24:32.625Z"
      }
    },
    {
      "reason": "I cant message all my contacts, even though I havent done anything wrong. Please lift this restriction as soon as possible so I can get in touch with people who dont know my new number yet.",
      "date": {
        "$date": "2025-03-19T19:57:50.729Z"
      }
    },
    {
      "reason": "I believe theres been a mistake. My accounts messaging function has been unfairly affected, and I cant contact new users, which is crucial right now. Please review my case.",
      "date": {
        "$date": "2025-03-19T21:03:45.230Z"
      }
    },
    {
      "reason": "Im unable to communicate with vital contacts due to an apparent error. Ive never violated any rules and would appreciate having my full messaging capabilities restored. Please review and consider this issue urgently.",
      "date": {
        "$date": "2025-03-20T10:46:46.606Z"
      }
    },
    {
      "reason": "Im unable to message non-mutual contacts, despite being an active user with no violations. Kindly review and restore full messaging access soon.",
      "date": {
        "$date": "2025-03-21T17:58:39.461Z"
      }
    },
    {
      "reason": "Im facing an issue with my Telegram account, which I believe is an error. I cant send messages to non-mutual contacts, although I need to contact new potential clients for work, so this issue should be fixed as soon as possible. Please review my account activity, as Ive followed all the rules.",
      "date": {
        "$date": "2025-03-25T16:05:57.617Z"
      }
    },
    {
      "reason": "My accounts messaging function needs restoring. I cant message non-mutual contacts, which is an issue as I need to reach people who dont know my handle. Ive done nothing wrong and believe this is an error.",
      "date": {
        "$date": "2025-03-25T21:22:39.475Z"
      }
    },
    {
      "reason": "Id like my messaging capabilities back, please. I can only message mutuals, even though Ive followed the rules. A mistake was made, so I want it fixed.",
      "date": {
        "$date": "2025-03-27T11:32:25.407Z"
      }
    },
    {
      "reason": "I need to regain full access to messaging on my account. I believe this limitation is an error since Ive followed all guidelines and havent violated any rules. Kindly review and resolve this issue.",
      "date": {
        "$date": "2025-03-27T13:12:40.951Z"
      }
    },
    {
      "reason": "My accounts current messaging limitation prevents urgent communication with all my contacts. I request this be lifted as its an error; Ive not violated any policies. Kindly review and restore full access.",
      "date": {
        "$date": "2025-04-03T19:04:31.877Z"
      }
    },
    {
      "reason": "Im unable to message new contacts due to an apparent error, limiting my communication only to mutual connections. I havent violated any rules, so I kindly ask you to restore my full messaging capabilities.",
      "date": {
        "$date": "2025-04-08T17:24:23.405Z"
      }
    },
    {
      "reason": "Im unable to message new contacts due to an apparent error. Ive been mistakenly blocked from reaching out, even though Ive followed all the rules. Please review and restore this function.",
      "date": {
        "$date": "2025-04-08T18:36:07.123Z"
      }
    },
    {
      "reason": "Ive noticed a recent change in my accounts messaging capabilities, limiting my ability to connect with important contacts. As an active user with a clean record, I kindly request the full restoration of my messaging features.",
      "date": {
        "$date": "2025-04-09T12:25:07.524Z"
      }
    },
    {
      "reason": "Ive been unable to send messages freely due to an apparent error. I havent broken any rules, so please restore full messaging functionality to my account. Your assistance is appreciated.",
      "date": {
        "$date": "2025-04-10T18:43:09.405Z"
      }
    },
    {
      "reason": "Ive been locked out of messaging, but I havent broken any rules. Please restore my access so I can connect with everyone, not just mutuals.",
      "date": {
        "$date": "2025-04-12T15:08:03.659Z"
      }
    },
    {
      "reason": "Id like to resolve an issue with my Telegram accounts messaging feature. Im unable to send messages to non-mutual contacts, which is affecting my work. Please review my account, as I havent violated any rules.",
      "date": {
        "$date": "2025-04-14T18:38:40.016Z"
      }
    },
    {
      "reason": "Ive been unfairly limited to messaging mutual contacts, which affects my communication with essential connections. Im certain my account activity doesnt violate any rules, so Id like to get full messaging access back. Thanks for reviewing my request.",
      "date": {
        "$date": "2025-04-16T06:47:28.915Z"
      }
    },
    {
      "reason": "I want to send messages to non-mutual contacts but cant due to an apparent error. I havent violated any rules, so please review and restore this function.",
      "date": {
        "$date": "2025-04-16T10:27:21.136Z"
      }
    },
    {
      "reason": "I cant send messages to important contacts due to an error, I believe. Ive done nothing wrong, and I need to restore my messaging functions. Please review my case.",
      "date": {
        "$date": "2025-04-16T13:04:35.921Z"
      }
    },
    {
      "reason": "Id like to get back my full messaging functionality as soon as possible. A temporary restriction was likely issued in error, as I havent violated any rules. Please review my case urgently.",
      "date": {
        "$date": "2025-04-17T20:05:32.643Z"
      }
    },
    {
      "reason": "Im unable to message non-mutual contacts due to an apparent error. I havent broken any rules, so I kindly ask to restore my full messaging functionality.",
      "date": {
        "$date": "2025-04-19T10:30:21.440Z"
      }
    },
    {
      "reason": "I believe my messaging capabilities were restricted due to a mistake. I havent done anything wrong and need to reach some crucial contacts. Please restore my full messaging access.",
      "date": {
        "$date": "2025-04-20T12:34:36.265Z"
      }
    },
    {
      "reason": "I cant contact all my friends due to unexpected message-sending restrictions. I believe this is a mistake as Ive followed all guidelines. Kindly restore full access so I can communicate freely.",
      "date": {
        "$date": "2025-04-20T16:31:02.609Z"
      }
    },
    {
      "reason": "Id like to clarify my account status. Im sure I havent violated any rules, yet I cant send messages freely. I need this fixed ASAP for work communication.",
      "date": {
        "$date": "2025-04-21T12:01:36.029Z"
      }
    },
    {
      "reason": "I need to communicate with non-mutual contacts for work. I cant send messages to anyone but my mutuals, which isnt right. Please let me message everyone again; I havent done anything wrong.",
      "date": {
        "$date": "2025-04-21T21:57:38.361Z"
      }
    },
    {
      "reason": "Id like to report an error. My accounts messaging function is limited, affecting my urgent communication needs. Please review and restore full access.",
      "date": {
        "$date": "2025-04-22T17:14:10.551Z"
      }
    }
  ],
  "stopped": false,
  "lazyCheckDate": {
    "$date": "2025-04-23T22:28:50.350Z"
  },
  "phone": "+380951095146"
},
{
  "_id": {
    "$oid": "67a9379ff5fa1dc494bc3a61"
  },
  "accountId": "5473489200",
  "dc2": "4040f8c578a7c2a9741c697eff66825c2c9e437e9b51a22d9f8f5b20dfa0c123c9e7047f49b61d36aa5a2b0beac55ca89607c564e78f1fdc454bb038acd92483c0f2a1245a85688513eeb53867cc6ca17e435e69eecaa6ca09708fb61c8cea6d9a7cb966f12d403fa88899d8a5de3c83e1752156cb19354ee6e23b9c8f33c897841fd9d1cfef2a90a20ccac897890dec4340c8a32c2b9b4dceab11d0eb2ea064e04690a34deaa84f8f0f677cbca76879cb22806b632a41b1ecea99362f93aaedc808875404b97567a6c0ca389d32dc1cac8395299a5b2f8ee03878777da2a65d50357579b48f81676fedbc5fe51da18260243d93978682bfaafc2fd8b80d3e3d",
  "dcId": 2,
  "nextApiId": 2040,
  "dateUpdated": {
    "$date": "2025-04-24T10:04:00.857Z"
  },
  "banned": false,
  "firstName": "Pavel",
  "lastName": "Malakhov",
  "messageCount": 124,
  "username": "malakhov_closed",
  "id": "5473489200",
  "remainingTime": {
    "$date": "2025-04-24T11:47:10.455Z"
  },
  "historySpamBlocks": [
    {
      "spamBlockDate": {
        "$date": "2025-02-13T12:20:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-17T11:38:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-03T06:13:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-06T10:48:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-22T22:27:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-31T11:13:00.000Z"
      },
      "spamBlockDays": 7
    },
    {
      "spamBlockDate": {
        "$date": "2025-05-10T15:12:00.000Z"
      },
      "spamBlockDays": 30
    },
    {
      "spamBlockDate": {
        "$date": "2025-04-16T09:06:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-04-17T10:49:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-04-24T05:45:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-04-24T10:25:00.000Z"
      },
      "spamBlockDays": 1
    }
  ],
  "twoFa": false,
  "twoFaDate": {
    "$date": "2025-04-22T13:39:37.719Z"
  },
  "automaticCheckDate": {
    "$date": "2025-04-24T10:04:00.857Z"
  },
  "lazyCheckDate": {
    "$date": "2025-04-23T22:51:33.961Z"
  },
  "stopped": false,
  "phone": "+380936671450"
},
{
  "_id": {
    "$oid": "67a937aaf5fa1dc494bc3b9b"
  },
  "accountId": "7587473962",
  "dc2": "9b550d4ea10f37cc4279852ae86a53e14c6de98c5038ad90d0b8a284f6e2db3873ef5be3582ac9bf4a8ce115286fd965b718a67cfe943216f8c0b34de87afaaaf2a3a5a79565d2b794de75b92f030a8ca62d4234eb6ff06db98f8f27cdf4da895973a65ba3acaf89b1af8ddb522a9238d0bce51bac1b1fdac7b1252445a70a82d638d34bf101570129b9a796eded93ca5f402f364028023e303201423bfaae31a3ac93781eeeb0172eb3edbe50b6d9932c96ebe3948c14b0663f702598e0c12c62655aaae1ce18a703290544e2555c670074db7329027b3584884aaa672f2ee339d47038cdd76ac7a86dcbdc11461000f6137ff04ee3a453ba34d8e117f56005",
  "dcId": 2,
  "nextApiId": 2496,
  "dateUpdated": {
    "$date": "2025-04-24T10:19:38.861Z"
  },
  "banned": false,
  "firstName": "Artur",
  "lastName": "Lobanov",
  "messageCount": 150,
  "username": "lobanov_smooth",
  "id": "7587473962",
  "remainingTime": {
    "$date": "2025-04-24T11:33:40.170Z"
  },
  "twoFa": false,
  "historySpamBlocks": [
    {
      "spamBlockDate": {
        "$date": "2025-02-23T10:23:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-04-08T09:51:00.000Z"
      },
      "spamBlockDays": 7
    },
    {
      "spamBlockDate": {
        "$date": "2025-05-24T09:39:00.000Z"
      },
      "spamBlockDays": 30
    }
  ],
  "twoFaDate": {
    "$date": "2025-04-22T14:22:29.131Z"
  },
  "automaticCheckDate": {
    "$date": "2025-04-24T10:18:10.310Z"
  },
  "stopped": false,
  "lazyCheckDate": {
    "$date": "2025-04-23T23:09:34.558Z"
  },
  "phone": "+380936013477",
  "spamBlockReasons": [
    {
      "reason": "My account has been incorrectly flagged, preventing me from messaging new contacts. I didnt break any rules, so I need full messaging access back. Please review and restore my account.",
      "date": {
        "$date": "2025-04-24T10:19:38.856Z"
      }
    }
  ],
  "spamBlockDate": {
    "$date": "2025-05-24T09:39:00.000Z"
  },
  "spamBlockDays": 30,
  "spamBlockInitDate": {
    "$date": "2025-04-24T10:19:38.861Z"
  }
},
{
  "_id": {
    "$oid": "67a937c1f5fa1dc494bc4225"
  },
  "accountId": "8058012128",
  "dc2": "66b8fca3a20d1380e7abb5843d4c8efc14fbed361f06f27f418444b51ed4e9f6dde73820a2764885a178ef85a9396dc6d37b187d1d330f50eaae00922d7d111e9e18fd89e594fbfad0d085c778573112d2e0ac3526ee1f1a2c7f842476c604216a59cc8f3a462f7969a1c5dcda2249e164a0f5c555b7062a021082014da1004aab0a303a262755db0a8cc87184e27d679c75bf4d4c3515582c9645a92cf3548b38779e1bf184b9b4cfa8a44e9d93f1b2389099e10051c26744b49478015e452b03547d4493964103574409272f8b1d1be62fe511738b7e7befc0b07341eb838ba891840d911a0b6307034ba3ea9e0ec8b6cb14cca07665bd78d25fbb647efd36",
  "dcId": 2,
  "nextApiId": 2496,
  "dateUpdated": {
    "$date": "2025-04-24T10:10:13.124Z"
  },
  "banned": false,
  "firstName": "Petr",
  "lastName": "Tarasov",
  "messageCount": 135,
  "username": "tarasov_defeated",
  "id": "8058012128",
  "historySpamBlocks": [
    {
      "spamBlockDate": "INFINITY",
      "spamBlockDays": 0
    },
    {
      "spamBlockDate": {
        "$date": "2025-02-28T13:48:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-06T12:36:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-05T08:53:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-11T11:53:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-12T12:50:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-13T05:56:00.000Z"
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
        "$date": "2025-03-24T20:26:00.000Z"
      },
      "spamBlockDays": 7
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-20T10:56:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-24T08:26:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-04-01T12:32:00.000Z"
      },
      "spamBlockDays": 7
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-28T05:28:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-31T11:59:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-04-08T10:51:00.000Z"
      },
      "spamBlockDays": 7
    },
    {
      "spamBlockDate": {
        "$date": "2025-04-25T08:46:00.000Z"
      },
      "spamBlockDays": 3
    }
  ],
  "remainingTime": {
    "$date": "2025-04-22T09:58:24.784Z"
  },
  "twoFa": false,
  "twoFaDate": {
    "$date": "2025-04-22T12:54:14.613Z"
  },
  "automaticCheckDate": {
    "$date": "2025-04-24T10:10:13.124Z"
  },
  "stopped": false,
  "lazyCheckDate": {
    "$date": "2025-04-23T22:22:49.778Z"
  },
  "spamBlockReasons": [
    {
      "reason": "My account needs to regain its full functionality ASAP, as I have no access to some of my contacts otherwise. Ive not been involved in any malicious activity, so restoring my messaging capabilities would be reasonable. Please consider my request.",
      "date": {
        "$date": "2025-04-22T09:08:26.826Z"
      }
    },
    {
      "reason": "I believe my account has been unfairly limited, impacting my work. I have not violated any policies and request the restoration of full messaging capabilities. An urgent fix would be appreciated.",
      "date": {
        "$date": "2025-04-22T15:42:07.417Z"
      }
    },
    {
      "reason": "Id like to resolve an issue regarding my accounts messaging function. There must be a mistake, as Ive never violated any rules and have always followed community guidelines. Please review and restore my full messaging access.",
      "date": {
        "$date": "2025-04-22T17:09:11.373Z"
      }
    },
    {
      "reason": "I believe my accounts message function was mistakenly disabled. Ive not been involved in any violations or suspicious behavior, and I need to reach out to people beyond my contact list. Could you help me get this fixed?",
      "date": {
        "$date": "2025-04-22T18:21:12.839Z"
      }
    }
  ],
  "spamBlockDate": {
    "$date": "2025-04-25T08:46:00.000Z"
  },
  "spamBlockDays": 3,
  "spamBlockInitDate": {
    "$date": "2025-04-22T09:08:26.832Z"
  },
  "phone": "+380963517535"
},
{
  "_id": {
    "$oid": "67a937c2f5fa1dc494bc4286"
  },
  "accountId": "7356040739",
  "dc2": "92279b2d18dda373329676d4a8f6cb14dc6015368807d1f9a916a4fb2ecf5c0c6c00103140a757a666565ae6a99e5c7269d4bf206c445af0c948076a767a096d9dde1111fab26fd258ea3ecba7d42ed4dd3fae0d226f4ea63594e2ee5da1f664ce2be05c66934e5fe1743859ce58749083b49ef33dd2305474f5acd8963a2d1242929addd57be3caa3eafaf98e5ab57efc3a6c9c29a27619036ab11932be5598d78828a9b540e23da0d9c19819e2520321d3435da513cabba93dc6a003fa563511f10644f8ee35ad6ce649030264f39b9be98b3f265f02c939d98858e62160dce506a7c51212653802c57bad7b9a28eb935f4cb2c37c974914727be72cec7672",
  "dcId": 2,
  "nextApiId": 2496,
  "dateUpdated": {
    "$date": "2025-04-24T10:00:29.198Z"
  },
  "banned": false,
  "firstName": "Denis",
  "lastName": "Chirkov",
  "messageCount": 177,
  "username": "chirkov_senior",
  "id": "7356040739",
  "remainingTime": {
    "$date": "2025-04-24T12:00:29.198Z"
  },
  "twoFa": false,
  "historySpamBlocks": [
    {
      "spamBlockDate": {
        "$date": "2025-03-03T05:54:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-27T11:56:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-04-22T06:18:00.000Z"
      },
      "spamBlockDays": 3
    }
  ],
  "twoFaDate": {
    "$date": "2025-04-22T14:22:30.826Z"
  },
  "automaticCheckDate": {
    "$date": "2025-04-24T09:59:12.942Z"
  },
  "lazyCheckDate": {
    "$date": "2025-04-23T22:28:49.652Z"
  },
  "stopped": false,
  "phone": "+380634335908"
},
{
  "_id": {
    "$oid": "67a937c2f5fa1dc494bc4291"
  },
  "accountId": "7799661198",
  "dc2": "54994c4fc36c30942a86c40264e8c0002723aff4231f7b6c40eea8cecc821989c6c8d5ae1bbd045399a5ff2c71856d11167fdc5867349ea6e2d07ae6dd95387fa7b158f2d97323c0795e882f445b3ad09934dec39ba8e9fe1ac46f5a3db332db7b6d1813bbc57e09117af98f6709e505bd1940588e4d6fbf0d578485212908936d2040a688f39b804b6f13363e286193bb3d3dfb3a297f51b0d64827754dc61cc8ab19d437a2ffe4d241b861146174112351d96806f8ac5775cfee622c98a31f3115a27df3fad00ed6aeded6f3d9e35b411517a51771987112f8ee53912c7d4587d543a5acd4ca6db794eb36c2220999a972d723090c29ab23cc4affa9b6d53e",
  "dcId": 2,
  "nextApiId": 2496,
  "dateUpdated": {
    "$date": "2025-04-24T10:13:10.534Z"
  },
  "banned": false,
  "firstName": "Gennady",
  "lastName": "Chugunov",
  "messageCount": 0,
  "username": "chugunov_clumsy",
  "id": "7799661198",
  "historySpamBlocks": [
    {
      "spamBlockDate": "INFINITY",
      "spamBlockDays": 0
    }
  ],
  "spamBlockDate": "INFINITY",
  "spamBlockDays": 0,
  "spamBlockInitDate": {
    "$date": "2025-02-09T23:45:22.355Z"
  },
  "twoFa": false,
  "twoFaDate": {
    "$date": "2025-04-22T13:39:44.696Z"
  },
  "automaticCheckDate": {
    "$date": "2025-04-24T10:13:10.534Z"
  },
  "spamBlockReasons": [
    {
      "reason": "I recently lost the ability to message new contacts on Telegram, which is affecting my communication. I havent done anything wrong and would like this issue resolved, as it was likely a mistake. Please review my accounts status.",
      "date": {
        "$date": "2025-03-18T11:27:07.541Z"
      }
    },
    {
      "reason": "My accounts message functionality is currently limited, preventing me from reaching vital contacts. I believe this restriction is a mistake, as Ive never been involved in any questionable activity. Kindly review and restore my full messaging rights.",
      "date": {
        "$date": "2025-03-18T16:08:30.885Z"
      }
    },
    {
      "reason": "My messaging function has been limited despite following community guidelines. I dont know why this happened, as Ive sent no spam or violated any rules. Please review and restore my full messaging access.",
      "date": {
        "$date": "2025-03-19T06:27:50.119Z"
      }
    },
    {
      "reason": "I believe my account has been unfairly restricted due to a mistake. Ive followed all guidelines and havent violated any rules. Kindly review and restore my messaging access.",
      "date": {
        "$date": "2025-03-19T12:08:43.316Z"
      }
    },
    {
      "reason": "Ive recently noticed an issue with my account. Despite having no involvement in any negative behavior, I can only send messages to mutual contacts. Could you please fix this mistake?",
      "date": {
        "$date": "2025-03-19T14:13:37.111Z"
      }
    },
    {
      "reason": "Im unable to message all my contacts due to a possible system error. Ive never violated any policies and would like to regain full access. Kindly review my accounts status.",
      "date": {
        "$date": "2025-03-19T19:09:15.867Z"
      }
    },
    {
      "reason": "Id like my message-sending function back. Theres been a mistake; I havent done anything wrong. I need to send a work message ASAP.",
      "date": {
        "$date": "2025-03-19T20:01:14.116Z"
      }
    },
    {
      "reason": "Ive been a responsible user and havent violated any rules. My work depends on messaging anyone, so I kindly request you lift the restrictions. Lets fix this ASAP.",
      "date": {
        "$date": "2025-03-19T21:08:01.080Z"
      }
    },
    {
      "reason": "I want to clarify my recent messaging issue. I believe my accounts limitation was a mistake since Ive followed the rules and never spammed. Could you please review this?",
      "date": {
        "$date": "2025-03-20T06:23:02.277Z"
      }
    },
    {
      "reason": "Id like to report an issue with my Telegram account. Im unable to message anyone outside of my mutual contacts, which is hindering my communication. I havent violated any rules, so please review this error.",
      "date": {
        "$date": "2025-03-20T10:38:45.076Z"
      }
    },
    {
      "reason": "Ive been a responsible user, following all community guidelines. Please review my case and restore my messaging capabilities, as I believe this restriction is a mistake. My account has always been compliant.",
      "date": {
        "$date": "2025-03-21T07:33:26.943Z"
      }
    },
    {
      "reason": "Id like to restore full messaging functionality on my account. I havent violated any rules, and the current restriction seems like an error. Please review my case.",
      "date": {
        "$date": "2025-03-21T11:29:35.155Z"
      }
    },
    {
      "reason": "I believe my account has been unfairly restricted due to an error. I havent broken any rules and would like to regain full access to messaging. Please review my case.",
      "date": {
        "$date": "2025-03-25T13:02:37.742Z"
      }
    },
    {
      "reason": "I believe theres been a mistake. Im unable to reach crucial contacts due to messaging restrictions, despite not engaging in any malicious behavior. Kindly review and restore my full messaging capabilities.",
      "date": {
        "$date": "2025-03-25T16:16:44.146Z"
      }
    },
    {
      "reason": "I recently encountered a messaging restriction on my account, preventing me from reaching non-mutual contacts. I believe this is a mistake, as Ive followed all rules. Kindly review and restore my full messaging capabilities soon.",
      "date": {
        "$date": "2025-03-25T21:06:05.047Z"
      }
    },
    {
      "reason": "Im unable to message all my contacts, which is impacting my ability to communicate effectively. I believe this restriction is a mistake as I havent violated any policies. Please restore full messaging functionality.",
      "date": {
        "$date": "2025-03-27T11:33:19.094Z"
      }
    },
    {
      "reason": "Im unable to send messages to non-mutual contacts due to an error, which is impacting my work. Ive not broken any rules, so please restore my full messaging access ASAP. Thank you.",
      "date": {
        "$date": "2025-03-27T13:19:22.516Z"
      }
    },
    {
      "reason": "My messaging capabilities are limited, despite having no record of violations. This error must be a mistake, as Ive been a responsible user. Please review my case and restore my full access.",
      "date": {
        "$date": "2025-03-27T15:53:54.716Z"
      }
    },
    {
      "reason": "I believe my accounts recent limitation is an error. Ive followed all guidelines and havent engaged in any malicious behavior. Kindly review this issue, as I need full messaging access.",
      "date": {
        "$date": "2025-03-27T18:50:35.457Z"
      }
    },
    {
      "reason": "Ive been a long-time active user with no history of violations. Recently, I noticed that I can only message mutual contacts, which is a sudden change. Could you please review my case and restore full messaging functionality?",
      "date": {
        "$date": "2025-03-28T20:26:51.030Z"
      }
    },
    {
      "reason": "Id like to regain full messaging access. Ive done nothing wrong, and I believe my account was flagged mistakenly. I need to reach people outside my contacts.",
      "date": {
        "$date": "2025-03-29T14:20:47.203Z"
      }
    },
    {
      "reason": "Im unable to reach all my contacts, limiting my communication. I havent done anything wrong, and I believe this restriction is a mistake. Please restore my full messaging functionality.",
      "date": {
        "$date": "2025-03-29T16:16:49.907Z"
      }
    },
    {
      "reason": "Ive recently lost the ability to message non-mutual contacts, despite never breaking any rules. Please restore my full messaging rights; I need to reach important people.",
      "date": {
        "$date": "2025-03-31T15:20:22.810Z"
      }
    },
    {
      "reason": "I believe my messaging function was mistakenly disabled, as Ive never engaged in any suspicious behavior. Please restore my access so I can urgently reach a work contact.",
      "date": {
        "$date": "2025-04-03T19:15:36.962Z"
      }
    },
    {
      "reason": "My recent message-sending restriction seems unjustified. Ive done nothing wrong and need to reach non-mutual contacts for essential communication. Kindly restore my full messaging capabilities.",
      "date": {
        "$date": "2025-04-03T21:51:42.251Z"
      }
    },
    {
      "reason": "I recently lost access to messaging non-mutual contacts, despite not engaging in any suspicious behavior. Please restore this function, as I need to reach important connections.",
      "date": {
        "$date": "2025-04-06T16:41:05.165Z"
      }
    },
    {
      "reason": "My account has been mistakenly limited to sending messages only to mutual contacts. This issue prevents me from doing my job effectively, so Id appreciate you reviewing this situation as soon as possible. Please restore my full messaging capabilities.",
      "date": {
        "$date": "2025-04-08T17:30:45.336Z"
      }
    },
    {
      "reason": "My accounts messaging function is currently limited, affecting my ability to contact others. This restriction is likely an error, as I havent violated any rules. I request its removal.",
      "date": {
        "$date": "2025-04-08T18:38:35.582Z"
      }
    },
    {
      "reason": "I believe my account has been incorrectly flagged, preventing me from messaging non-mutual contacts. I need this issue resolved ASAP for work purposes. Please review my account activity and restore full messaging access.",
      "date": {
        "$date": "2025-04-08T21:27:07.814Z"
      }
    },
    {
      "reason": "Im unable to contact new users due to an apparent error, despite being fully compliant with your policies. Kindly restore my messaging functionality as soon as possible, as I need to communicate with clients for work.",
      "date": {
        "$date": "2025-04-09T12:16:18.628Z"
      }
    },
    {
      "reason": "Ive been using Telegram for a while without issues, but now Im unable to message some contacts, which is affecting my communication. This restriction seems unfair, as I havent broken any rules. I kindly request that you restore my full messaging capabilities.",
      "date": {
        "$date": "2025-04-09T13:34:20.484Z"
      }
    },
    {
      "reason": "Im unable to message new contacts due to an error. Ive never spammed or violated any rules, so please restore my full messaging capabilities. Id be grateful for your help.",
      "date": {
        "$date": "2025-04-09T16:02:39.628Z"
      }
    },
    {
      "reason": "Id like to regain full messaging capabilities as soon as possible, as I need to contact people crucial to my work. I believe this limitation was placed on my account by mistake, as I havent broken any rules. Thanks for looking into this issue.",
      "date": {
        "$date": "2025-04-09T17:45:27.240Z"
      }
    },
    {
      "reason": "I believe my account has been incorrectly flagged. I need to contact important non-mutual connections for work purposes, but Im currently unable to reach them. Could you please review this case?",
      "date": {
        "$date": "2025-04-10T17:09:57.774Z"
      }
    },
    {
      "reason": "I believe my accounts message function was restricted by mistake. I havent violated any rules and would like to regain full access. Kindly review my case.",
      "date": {
        "$date": "2025-04-12T15:07:12.736Z"
      }
    },
    {
      "reason": "My ability to communicate via Telegram has been unfairly limited. I havent broken any rules, so please restore my messaging function. I need it to stay in touch with those who dont have mutual contacts with me.",
      "date": {
        "$date": "2025-04-14T12:17:17.450Z"
      }
    },
    {
      "reason": "My account has been mistakenly limited from messaging. I require access to essential contacts, but the current restriction prevents me from doing so. Id like to get back to messaging ASAP.",
      "date": {
        "$date": "2025-04-14T14:53:22.917Z"
      }
    },
    {
      "reason": "Id like my messaging capabilities restored. Ive done nothing wrong and havent violated any rules. My account should be unrestricted so I can contact those who arent mutuals.",
      "date": {
        "$date": "2025-04-14T18:39:42.626Z"
      }
    },
    {
      "reason": "I cant message all my contacts due to an apparent error. I havent broken any rules, so please fix this ASAP. Thanks.",
      "date": {
        "$date": "2025-04-15T15:50:58.699Z"
      }
    },
    {
      "reason": "I recently encountered a messaging issue with my Telegram account. Im certain I havent violated any rules, and Id like to regain full messaging access as soon as possible. Please review my case promptly.",
      "date": {
        "$date": "2025-04-16T06:40:46.013Z"
      }
    },
    {
      "reason": "My accounts current limitation affects my ability to reach crucial contacts. I believe this restriction is a mistake, as Ive followed all guidelines. Please restore my messaging function.",
      "date": {
        "$date": "2025-04-16T12:59:23.877Z"
      }
    },
    {
      "reason": "Ive been wrongly limited from messaging all my contacts, despite following community guidelines. Please restore full access so I can reach out to all my network without delay.",
      "date": {
        "$date": "2025-04-17T14:52:31.220Z"
      }
    },
    {
      "reason": "I recently noticed a messaging issue with my account. Im unable to reach all my contacts, which is impacting my communication. Id appreciate a review, as I believe this restriction is a mistake.",
      "date": {
        "$date": "2025-04-17T20:08:26.965Z"
      }
    },
    {
      "reason": "I cant message new contacts due to an apparent error. I havent done anything wrong and need to urgently contact clients for work. Please restore my full messaging capabilities ASAP.",
      "date": {
        "$date": "2025-04-19T09:53:41.735Z"
      }
    },
    {
      "reason": "My account currently has a messaging block, preventing me from reaching out to new contacts. Im sure this is a mistake, as I havent broken any rules. Kindly review and restore full access.",
      "date": {
        "$date": "2025-04-20T12:33:03.822Z"
      }
    },
    {
      "reason": "Ive always followed community guidelines and never faced issues until now. Since I didnt receive any warnings, Im certain the restriction on messaging was an oversight. Please restore my full messaging capabilities.",
      "date": {
        "$date": "2025-04-20T16:10:53.877Z"
      }
    },
    {
      "reason": "My account has been incorrectly limited. I didnt violate any rules, so please lift these restrictions so I can message anyone again. Thanks for looking into this issue.",
      "date": {
        "$date": "2025-04-20T17:48:29.615Z"
      }
    },
    {
      "reason": "I request the restoration of full messaging functionality for my account. The current restrictions seem unjustified, as I havent violated any rules. Please consider my case.",
      "date": {
        "$date": "2025-04-21T22:49:02.563Z"
      }
    },
    {
      "reason": "Ive been mistakenly blocked from messaging non-mutual contacts. My account remains active, but I havent broken any rules, so please review this error. Lets get this fixed ASAP.",
      "date": {
        "$date": "2025-04-22T11:48:17.276Z"
      }
    },
    {
      "reason": "My account is unable to send messages, which is affecting my work. I believe this restriction is a mistake as Ive not violated any rules. Please restore my messaging function.",
      "date": {
        "$date": "2025-04-22T15:35:30.238Z"
      }
    },
    {
      "reason": "Id like to regain full messaging functionality. My account was likely limited by mistake, as I havent violated any rules. I need to reach essential contacts, so this issue is urgent.",
      "date": {
        "$date": "2025-04-22T17:10:49.499Z"
      }
    },
    {
      "reason": "Im unable to send messages to non-mutual contacts due to an apparent error. My account isnt suspended, and Ive never violated any rules. Please restore full messaging functionality as soon as possible, so I can handle urgent work tasks.",
      "date": {
        "$date": "2025-04-22T18:41:16.139Z"
      }
    },
    {
      "reason": "Id like to regain full messaging access on my account, as the current limitation hinders my communication with non-mutual contacts. This restriction seems to be a mistake, as Ive followed all guidelines.",
      "date": {
        "$date": "2025-04-22T20:13:18.743Z"
      }
    }
  ],
  "stopped": false,
  "lazyCheckDate": {
    "$date": "2025-04-23T23:23:23.486Z"
  },
  "phone": "+380966395582"
},
{
  "_id": {
    "$oid": "67be70d7f5fa1dc49479b682"
  },
  "accountId": "7701519640",
  "dc1": "b583dedbe2248527ae243974df8451c3558514bc1f10407d36ad202d6da5e5a10d0428ed75974e10a1cfbaa89cc3b9750b9fc2343de6aeeeee295219bbbf9e78b34e5dcb0324b0c8cb3460ce80ff9662cd03ddbff852207ee978055152787143aa37d2b3d62b903f114b1b9040b321d1dfbdfbae358f66f3b6a45ededf2865d3c13f7d450a51bc431aa59368ed24d9923f64f5e95d778461058150e185942823576dd0a057ceeca79b0752c898b893d2be4405c2adc4c74733fce35f39b93f141c0f74cf499e1cab5fa4e3bc631314ca1112f6efe1a05c0842bc748ab23bcedb1c94dd83d0044b34b9a80a86db3397263bad7f2b3fff2d67f23c723a3eaa5a98",
  "dcId": 1,
  "nextApiId": 2496,
  "banned": false,
  "dateUpdated": {
    "$date": "2025-04-24T10:22:14.094Z"
  },
  "firstName": "Pavel",
  "lastName": "Denisov",
  "messageCount": 110,
  "username": "denisov_bewildered",
  "id": "7701519640",
  "twoFa": false,
  "remainingTime": {
    "$date": "2025-04-24T11:33:32.526Z"
  },
  "twoFaDate": {
    "$date": "2025-04-22T16:46:58.718Z"
  },
  "automaticCheckDate": {
    "$date": "2025-04-24T10:22:14.094Z"
  },
  "historySpamBlocks": [
    {
      "spamBlockDate": {
        "$date": "2025-03-08T07:14:00.000Z"
      },
      "spamBlockDays": 1
    }
  ],
  "lazyCheckDate": {
    "$date": "2025-04-23T22:32:55.376Z"
  },
  "stopped": false,
  "phone": "+541140380487"
},
{
  "_id": {
    "$oid": "67be7127f5fa1dc49479d513"
  },
  "accountId": "7537755826",
  "dc2": "b5e60a8288fb56139269ad42bf67b2276315bc6d0579ee5de44a705b6ea725d95f6bc5646dd264cf5c871fc19dd1e9b2bd220b8cf52bc055e0a62d3c980afb0a6d470735b002da0388a5739e5276559814b6b9378dff6f26b39ef9a228e6cb1b530ee4b1a6c48e95a73f36c3611209b84a83a351e2bf9853ae7159266504995784de5c91946568c57436e90cfe33c2cea7f2c53a1bbf7a65e95cdc3a79ee5c1745051e46e482ff49349dacd594a532e8de5f6c0ada530dbb1d4e896dea26b8234e5521e227066c491b0e10195b4017165fe6a8b67fbe5e39dd7e068376dc9dc31a13e33d3585ec71c68f8769ba583e30cff37170c5e3bf54448a6269047aeb74",
  "dcId": 2,
  "nextApiId": 2040,
  "banned": false,
  "dateUpdated": {
    "$date": "2025-04-24T10:04:59.939Z"
  },
  "firstName": "Timofey",
  "lastName": "Romanov",
  "messageCount": 92,
  "username": "romanov_frail",
  "id": "7537755826",
  "twoFa": false,
  "remainingTime": {
    "$date": "2025-04-22T14:32:22.333Z"
  },
  "historySpamBlocks": [
    {
      "spamBlockDate": {
        "$date": "2025-03-02T16:15:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-10T09:54:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-15T15:28:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-04-20T09:26:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-04-25T12:37:00.000Z"
      },
      "spamBlockDays": 3
    }
  ],
  "twoFaDate": {
    "$date": "2025-04-22T16:47:02.776Z"
  },
  "automaticCheckDate": {
    "$date": "2025-04-24T10:04:59.939Z"
  },
  "lazyCheckDate": {
    "$date": "2025-04-23T22:23:54.031Z"
  },
  "stopped": false,
  "spamBlockReasons": [
    {
      "reason": "Im experiencing a messaging issue on my account. I can only communicate with mutual contacts, but I need to reach others too. Please review my case and restore full access.",
      "date": {
        "$date": "2025-04-22T13:16:56.579Z"
      }
    },
    {
      "reason": "Im unable to message new contacts due to an apparent mistake. Ive never spammed or violated any rules, so this block seems like an error. Kindly restore my messaging rights.",
      "date": {
        "$date": "2025-04-22T17:09:06.528Z"
      }
    },
    {
      "reason": "Ive been prevented from messaging users who arent mutual contacts. This isnt justified as I havent broken any rules. Please restore my full messaging functionality.",
      "date": {
        "$date": "2025-04-22T18:22:45.121Z"
      }
    }
  ],
  "spamBlockDate": {
    "$date": "2025-04-25T12:37:00.000Z"
  },
  "spamBlockDays": 3,
  "spamBlockInitDate": {
    "$date": "2025-04-22T13:16:56.586Z"
  },
  "phone": "+380992487697"
},
{
  "_id": {
    "$oid": "67be7129f5fa1dc49479d559"
  },
  "accountId": "6252055161",
  "dc2": "239db52460d61b95d14a764adb481fb6139bd4684deb6d4417b66f05551e947ec7c7b701ebd352bdc076313aff6ab8f4bf72ba13af703d6e71b807b4d751f6ab77ce3368d5aaa1c2991669e791fac00e07ae210f12ac38210740f07a24998472b632a3f693df4fa5f4d9c1449ce50b0d73fea74a50af7611fa270ea524c226f5badede919c4cf3508d56cc02d37ff89e7b61f9a8cb18fce43465fc2e8cbcfdc49b1ab7eca2426d38a1471e14dfdac070ebfcfa29d0d3743e31d02086e77323f3bee9d5dec230f452112701ae97f839735f8bf4583c8ee2f6a7e61860aad1ef53f6ca3fee7a22809b528a632fecb34f88356fea2a75b9cdc71614f264466b0482",
  "dcId": 2,
  "nextApiId": 2040,
  "banned": false,
  "dateUpdated": {
    "$date": "2025-04-24T10:05:03.285Z"
  },
  "firstName": "Dmitry",
  "lastName": "Tarasov",
  "messageCount": 65,
  "username": "tarasov_violet",
  "id": "6252055161",
  "twoFa": false,
  "remainingTime": {
    "$date": "2025-04-23T09:50:32.070Z"
  },
  "historySpamBlocks": [
    {
      "spamBlockDate": {
        "$date": "2025-02-28T09:26:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-04T02:11:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-12T10:26:00.000Z"
      },
      "spamBlockDays": 7
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-08T07:11:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-14T10:36:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-28T14:08:00.000Z"
      },
      "spamBlockDays": 7
    },
    {
      "spamBlockDate": {
        "$date": "2025-04-02T13:45:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-04-13T12:00:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-04-12T13:04:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-04-19T08:34:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-04-30T07:52:00.000Z"
      },
      "spamBlockDays": 7
    }
  ],
  "twoFaDate": {
    "$date": "2025-04-22T16:47:05.276Z"
  },
  "automaticCheckDate": {
    "$date": "2025-04-24T10:05:03.285Z"
  },
  "lazyCheckDate": {
    "$date": "2025-04-23T23:40:20.636Z"
  },
  "stopped": false,
  "phone": "+380935692305",
  "spamBlockReasons": [
    {
      "reason": "My accounts messaging functionality needs to be restored. I havent done anything wrong, and I think this was a mistake. Please reconsider this restriction so I can contact those who arent mutuals.",
      "date": {
        "$date": "2025-04-23T08:31:39.946Z"
      }
    }
  ],
  "spamBlockDate": {
    "$date": "2025-04-30T07:52:00.000Z"
  },
  "spamBlockDays": 7,
  "spamBlockInitDate": {
    "$date": "2025-04-23T08:31:39.950Z"
  }
},
{
  "_id": {
    "$oid": "67be712ef5fa1dc49479d65d"
  },
  "accountId": "6785024984",
  "dc2": "36118c0fad21256fe23172a2bba3b462e47ee28810684b485c326dd7dad9ef2bde8f646cd1dcb16f069d661666093428c75fd6237a31a635e972cc9f292eed9ea97c65a2afc1744b460f9782dcbca360450f34cd780d7c118d818f3ea3897da4b57870b82b039e7fb2176fc4d85ea4c6b4d1e4bcabfc005473d96065435f4c1e1dd57d2b5a5cd6a694aa65909477b6126084600457cc2f22fc83b5494b4d9921e467e486f00d6b50cb6d81aa5f4957b501c4a410bce9be8830c667c4ff247b8f2ae07927a221bc919fdb186b9b0a967b24fe43efc26fafae2034a9e1c4ba66b1e3da76171ab777a936628c9ad9293954af363b8d4e302665f56a66b315bce826",
  "dcId": 2,
  "nextApiId": 2040,
  "banned": false,
  "dateUpdated": {
    "$date": "2025-04-24T10:19:43.341Z"
  },
  "firstName": "Artem",
  "lastName": "Frolov",
  "messageCount": 98,
  "username": "frolov_pleasant",
  "id": "6785024984",
  "twoFa": false,
  "remainingTime": {
    "$date": "2025-04-24T12:19:43.340Z"
  },
  "twoFaDate": {
    "$date": "2025-04-22T16:47:04.363Z"
  },
  "automaticCheckDate": {
    "$date": "2025-04-24T10:19:04.845Z"
  },
  "historySpamBlocks": [
    {
      "spamBlockDate": {
        "$date": "2025-03-12T07:40:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-22T16:50:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-24T13:19:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-28T13:50:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-29T11:09:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-04-02T05:59:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-04-05T20:03:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": "INFINITY",
      "spamBlockDays": 0
    },
    {
      "spamBlockDate": {
        "$date": "2025-04-09T10:14:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-04-11T14:34:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-04-15T07:45:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-04-16T06:08:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-04-19T06:52:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-04-18T11:18:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-04-24T07:49:00.000Z"
      },
      "spamBlockDays": 3
    }
  ],
  "lazyCheckDate": {
    "$date": "2025-04-23T23:03:29.664Z"
  },
  "stopped": false,
  "phone": "+380967338919"
},
{
  "_id": {
    "$oid": "67be7136f5fa1dc49479d7e3"
  },
  "accountId": "7907047237",
  "dc2": "373cbfd79b7b28cfe30e7e2a4873e2591db5ac47496a80c1d95c96785ed81e4e6fecc9fa2defa2ea861e9723adc9fb53c59716eae0f3130fa05764eadd7b701d2d0cc4948a3ed7c57790c012e62556c135216f7c9cabfad498c39d5c21e1a7def007d409c579b4f40328159e7b83bf848dba0babc2f5fb0b5658dfc149855cd925c0e86f4f4ac945822c640179a22626f55bf3200cf3278a6d538e9117269df2a7643887d73c3f836dcafa668357cc5649e57572fdfcb2b5f25ce9183352ad4964049778ae336c77818c30b030281f7e29ab16ec9e131b9760514ad37d1468cf5fcd29506651e5210e2c343ce5396cc26c920d5f350d9de1672ffa7cbf18f8c8",
  "dcId": 2,
  "nextApiId": 2496,
  "banned": false,
  "dateUpdated": {
    "$date": "2025-04-24T09:59:07.989Z"
  },
  "firstName": "Artur",
  "lastName": "Egorov",
  "messageCount": 0,
  "username": "egorov_extra",
  "id": "7907047237",
  "twoFa": false,
  "historySpamBlocks": [
    {
      "spamBlockDate": "INFINITY",
      "spamBlockDays": 0
    }
  ],
  "spamBlockDate": "INFINITY",
  "spamBlockDays": 0,
  "spamBlockInitDate": {
    "$date": "2025-02-26T02:14:11.545Z"
  },
  "twoFaDate": {
    "$date": "2025-04-22T16:47:11.315Z"
  },
  "automaticCheckDate": {
    "$date": "2025-04-24T09:59:07.989Z"
  },
  "spamBlockReasons": [
    {
      "reason": "I believe my accounts messaging function has been limited due to an error. I havent violated any policies and would like to restore full access. Please review my case.",
      "date": {
        "$date": "2025-03-18T15:52:10.289Z"
      }
    },
    {
      "reason": "Im facing an issue where I cant send messages to non-mutual contacts, which is affecting my important communications. I believe this is an error as Ive not violated any rules. Please restore my full messaging functionality.",
      "date": {
        "$date": "2025-03-19T07:30:25.982Z"
      }
    },
    {
      "reason": "Im experiencing a messaging issue, affecting my ability to communicate. Id like to clarify that I havent violated any rules and believe this restriction is a mistake. Kindly review my accounts status.",
      "date": {
        "$date": "2025-03-19T11:21:50.995Z"
      }
    },
    {
      "reason": "I recently encountered an issue with my Telegram account regarding message delivery. Im sure this is a mistake, as I havent done anything against the rules. Please restore my full messaging access ASAP.",
      "date": {
        "$date": "2025-03-19T12:54:24.908Z"
      }
    },
    {
      "reason": "Im reaching out regarding my accounts recent change in messaging permissions. I havent broken any rules, so Im sure this was a mistake. Please restore my messaging functionality.",
      "date": {
        "$date": "2025-03-19T14:21:18.681Z"
      }
    },
    {
      "reason": "Id like to appeal the recent messaging block on my account. There must be a mistake, as I havent done anything wrong. Kindly review my case and restore full access.",
      "date": {
        "$date": "2025-03-19T20:15:44.788Z"
      }
    },
    {
      "reason": "I cant message anyone on Telegram except for mutual contacts, which is affecting my communication. I believe this is a mistake as Ive not broken any rules and have never sent spam. Kindly restore my full messaging functionality.",
      "date": {
        "$date": "2025-03-19T21:51:49.283Z"
      }
    },
    {
      "reason": "Id like to regain full messaging capabilities on my account. I believe my ability to message others has been wrongly limited, as I havent broken any rules. Please consider this and restore my messaging function.",
      "date": {
        "$date": "2025-03-21T06:25:48.088Z"
      }
    },
    {
      "reason": "Im unable to send messages to non-mutual contacts due to an apparent error. My account remains active with no violations, and I kindly request you lift this restriction. Please review and restore my messaging functionality.",
      "date": {
        "$date": "2025-03-21T09:44:50.774Z"
      }
    },
    {
      "reason": "Im reaching out about my accounts messaging function. Recently, Ive been unable to message certain contacts, even though there has been no violation of rules. Please restore my full access.",
      "date": {
        "$date": "2025-03-21T11:28:56.502Z"
      }
    },
    {
      "reason": "Ive noticed a messaging issue with my account, where I cant reach non-mutual contacts. This seems like a mistake since I havent done anything wrong, and I need access to important conversations. Please review and restore full messaging functionality.",
      "date": {
        "$date": "2025-03-21T19:24:42.066Z"
      }
    },
    {
      "reason": "My messaging feature is currently limited to mutual contacts, which seems to be an error. I havent violated any rules or engaged in spamming, so Id like to request restoring my full messaging capabilities. Thanks for understanding.",
      "date": {
        "$date": "2025-03-22T17:57:38.981Z"
      }
    },
    {
      "reason": "My account has been unfairly limited. Im unable to reach important contacts as I can only message mutuals. Please review and restore full messaging access ASAP.",
      "date": {
        "$date": "2025-03-25T12:59:21.885Z"
      }
    },
    {
      "reason": "I need to regain full messaging access. This temporary loss of function isnt my fault and doesnt match my activity. Urgent business need.",
      "date": {
        "$date": "2025-03-26T06:30:36.882Z"
      }
    },
    {
      "reason": "My account can only message mutual contacts, limiting my ability to reach all my connections. I request this capability be restored immediately, as Ive done nothing wrong to justify this action. Please review my accounts status.",
      "date": {
        "$date": "2025-03-26T17:11:15.702Z"
      }
    },
    {
      "reason": "Id like to get my messaging function back. I think theres been a mistake — I havent done anything wrong. Lets fix this.",
      "date": {
        "$date": "2025-03-27T11:50:27.974Z"
      }
    },
    {
      "reason": "Ive been blocked from messaging new contacts, even though Ive done nothing wrong. I need this fixed ASAP, as Im missing important work conversations. Please review and restore my full messaging access.",
      "date": {
        "$date": "2025-03-31T14:30:11.374Z"
      }
    },
    {
      "reason": "I believe my accounts message-sending function was limited due to a mistake. Ive not been involved in any questionable activity and am unable to contact essential connections. Please review this issue and restore my messaging rights.",
      "date": {
        "$date": "2025-04-03T19:00:36.119Z"
      }
    },
    {
      "reason": "I cant message new contacts due to an apparent mistake. I havent done anything wrong, so I want to regain full messaging access. Please review and fix this issue.",
      "date": {
        "$date": "2025-04-03T21:51:27.899Z"
      }
    },
    {
      "reason": "Id like to request a review of my Telegram accounts messaging function. Recently, Ive been unable to message important non-mutual contacts, which impacts my work. I havent violated any rules and would appreciate getting my full access back.",
      "date": {
        "$date": "2025-04-06T16:25:31.577Z"
      }
    },
    {
      "reason": "I need to restore my messaging function on Telegram. Im sure I havent done anything wrong, so this must be a mistake. Lets get it fixed soon.",
      "date": {
        "$date": "2025-04-06T20:07:30.223Z"
      }
    },
    {
      "reason": "Ive been falsely flagged for suspicious activity, but I havent broken any rules. I need to send urgent work messages, so please unlock my account ASAP.",
      "date": {
        "$date": "2025-04-07T14:25:14.385Z"
      }
    },
    {
      "reason": "I want to clarify that my accounts messaging function is currently limited to mutual contacts only. This issue needs urgent resolution, as I must contact people outside my immediate network. Please review and restore full access soon.",
      "date": {
        "$date": "2025-04-08T17:18:27.133Z"
      }
    },
    {
      "reason": "Id like to regain full messaging capabilities, as I believe my accounts current restrictions are a mistake. I havent broken any rules and have always acted responsibly. Please review my case.",
      "date": {
        "$date": "2025-04-08T18:38:23.393Z"
      }
    },
    {
      "reason": "I need my messaging function back. Theres been a mistake, and I havent done anything wrong. Please review and restore my access so I can contact everyone.",
      "date": {
        "$date": "2025-04-09T07:53:37.806Z"
      }
    },
    {
      "reason": "Im experiencing an issue with message delivery, affecting my ability to communicate with crucial contacts. This seems like an error, as I havent violated any rules. Please restore my full messaging functionality.",
      "date": {
        "$date": "2025-04-09T09:41:10.073Z"
      }
    },
    {
      "reason": "My account was mistakenly limited to sending messages only to mutual contacts. I didnt break any rules and havent been involved in any suspicious activity. Please restore my full messaging functionality.",
      "date": {
        "$date": "2025-04-09T12:28:23.373Z"
      }
    },
    {
      "reason": "Im unable to message non-mutual contacts due to what seems like an error. I havent done anything wrong or suspicious, so please restore my messaging function ASAP for important work communication.",
      "date": {
        "$date": "2025-04-09T16:07:26.986Z"
      }
    },
    {
      "reason": "Im unable to message anyone outside my mutual contacts due to an error, it seems. Ive done nothing to warrant this and need to urgently contact someone for work. Please restore my full messaging capabilities ASAP.",
      "date": {
        "$date": "2025-04-10T16:02:00.998Z"
      }
    },
    {
      "reason": "My accounts messaging function is limited, affecting my ability to communicate freely. I havent violated any rules and request that you lift this restriction, which I believe was a mistake. Please review and restore my messaging rights.",
      "date": {
        "$date": "2025-04-10T18:34:58.923Z"
      }
    },
    {
      "reason": "My account has been mistakenly restricted, preventing me from messaging essential contacts. I havent done anything wrong and ask for the ability to communicate freely to be restored ASAP. Please review and rectify.",
      "date": {
        "$date": "2025-04-12T15:03:04.117Z"
      }
    },
    {
      "reason": "Im reaching out regarding my accounts messaging functionality. I believe the current limitation is a mistake, as Ive not violated any policies. Please restore my access to messaging features so I can communicate with all contacts.",
      "date": {
        "$date": "2025-04-14T10:41:23.822Z"
      }
    },
    {
      "reason": "I cant message new contacts due to a potential error. I havent broken any rules. Please restore my full messaging capabilities.",
      "date": {
        "$date": "2025-04-14T12:09:43.218Z"
      }
    },
    {
      "reason": "Im facing an issue where I cant message all my contacts, which is affecting my communication. I believe this is an error as Ive followed all guidelines and havent engaged in any suspicious activity. Please review and restore full messaging access.",
      "date": {
        "$date": "2025-04-16T07:04:21.461Z"
      }
    },
    {
      "reason": "I am experiencing an issue with my Telegram accounts messaging function. Despite being an active user with no policy violations, Im unable to message new contacts, which seems like an error. Kindly review and resolve this.",
      "date": {
        "$date": "2025-04-16T10:27:16.810Z"
      }
    },
    {
      "reason": "Ive been falsely flagged and lost the ability to message new contacts despite being an innocent user. Kindly review my case and restore my messaging rights.",
      "date": {
        "$date": "2025-04-16T13:11:05.097Z"
      }
    },
    {
      "reason": "Ive been unexpectedly blocked from messaging non-mutual contacts, which is a mistake. Please restore my full messaging capabilities so I can reach all my important connections. I havent done anything wrong.",
      "date": {
        "$date": "2025-04-17T20:07:40.878Z"
      }
    },
    {
      "reason": "My account is unable to send messages, impacting my communication. I havent done anything wrong, so I kindly ask to fix this issue. I need full access to stay connected.",
      "date": {
        "$date": "2025-04-19T10:38:26.284Z"
      }
    },
    {
      "reason": "I need to regain full messaging access on my account, as I believe my recent restriction was a mistake. Ive never broken any rules and dont understand why this happened. Kindly review my case and restore my messaging function.",
      "date": {
        "$date": "2025-04-20T12:38:40.363Z"
      }
    },
    {
      "reason": "I recently lost the ability to message non-mutual contacts, which is affecting my important communications. I believe this was a mistake, as Ive never violated any rules. Kindly restore my full messaging access.",
      "date": {
        "$date": "2025-04-20T16:32:55.100Z"
      }
    },
    {
      "reason": "Id like to resolve an issue with my accounts messaging function. Recently, Ive been unable to message anyone outside of my mutual contacts, which is limiting my ability to communicate. I believe this is a mistake, as I havent violated any rules.",
      "date": {
        "$date": "2025-04-21T11:48:20.424Z"
      }
    },
    {
      "reason": "I recently encountered a strange issue with my account. It seems like a mistake has been made: I cant send messages to non-mutual contacts despite following all guidelines.",
      "date": {
        "$date": "2025-04-21T22:09:25.272Z"
      }
    },
    {
      "reason": "Im unable to message new contacts, despite following all guidelines. I havent broken any rules or engaged in suspicious activity. Please review and restore my full messaging capabilities.",
      "date": {
        "$date": "2025-04-22T17:09:14.943Z"
      }
    },
    {
      "reason": "I recently encountered an issue where Im unable to message some contacts. This seems like an error since I havent violated any rules. Please review and restore full messaging functionality.",
      "date": {
        "$date": "2025-04-22T18:23:49.650Z"
      }
    }
  ],
  "stopped": false,
  "lazyCheckDate": {
    "$date": "2025-04-23T23:30:24.029Z"
  },
  "phone": "+380984648347"
},
{
  "_id": {
    "$oid": "67be7141f5fa1dc49479dfd3"
  },
  "accountId": "8001859366",
  "dc2": "50b0270fa455b149ba9fbbff0558be7fa7c022a7cdc77f13ee7f917e60f6ae69d4833d63022b00a68df53c058b7b5c6781d717dc872c82ca8de983f6f41527bafa6b0b9933cc4b1fe70f007492943ed5047aab55e56c14f45d2faede545004a8d1ab303fc3b9831a0233e690dc6fd221e22b980867941c662f15180132f0c03a37c5bf058b449b69083bd9ca1e527b5ded433d802dbf3508f345ef7752d7f823db0da6acc60f35f617a3a6e7f7a4ea38d2a4b65f367a2d562e52ec4c1cfc2da4f2f74011087e67a09e7e87e833a2fdc2f901998ad747760ece642cc948adeec5a0552be46be266cf0fe8fafaf293bce0112f4b82ee93a7220309c28019332dac",
  "dcId": 2,
  "nextApiId": 2040,
  "banned": false,
  "dateUpdated": {
    "$date": "2025-04-24T10:01:11.766Z"
  },
  "firstName": "Dmitriy",
  "lastName": "Lobanov",
  "messageCount": 125,
  "username": "lobanov_fundamental",
  "id": "8001859366",
  "historySpamBlocks": [
    {
      "spamBlockDate": "INFINITY",
      "spamBlockDays": 0
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-13T10:45:00.000Z"
      },
      "spamBlockDays": 1
    }
  ],
  "automaticCheckDate": {
    "$date": "2025-04-24T10:01:11.766Z"
  },
  "remainingTime": {
    "$date": "2025-04-24T11:44:55.478Z"
  },
  "lazyCheckDate": {
    "$date": "2025-04-23T22:08:58.126Z"
  },
  "stopped": false,
  "phone": "+380983896770"
},
{
  "_id": {
    "$oid": "67be71adf5fa1dc4947a0ad5"
  },
  "accountId": "7014054507-prefix-aisender",
  "dc2": "8485bf289c8a9f289a460dc9a86528104b1f3f2e027c8f2f8181b42b733a5b47b1cec4b0984522ce95681da0a76ac5fd90a3518e3863bbdd4c4e4d809238b352119ed6df1b769a0ba91a4c891292e4b532be089419208690ac4a5bb0e67068b4594f97f92ea1fd4a9f2ab8c80da7c0100bc16db19508561fdae51997cfd5a0c2cd331006d11d4972ae271027d119e12c76e3ae1941f3b6f9ef72d742d2d19b63882e32b00baf11da16e34279328dd3a4660c2fd618e15133193f01c7b28acd59801db8574f1e527f139b36de0f7fddbdbb9be890d1eedf5905a3d8eb6c90906788e07ac9fa858baddaf22641307b8da87303981a39503f5f54a79185f483c42e",
  "dcId": 2,
  "nextApiId": 2040,
  "banned": false,
  "dateUpdated": {
    "$date": "2025-04-24T10:26:08.472Z"
  },
  "firstName": "Nikolai",
  "lastName": "Naumov",
  "messageCount": 0,
  "id": "7014054507",
  "twoFa": false,
  "historySpamBlocks": [
    {
      "spamBlockDate": "INFINITY",
      "spamBlockDays": 0
    }
  ],
  "spamBlockDate": "INFINITY",
  "spamBlockDays": 0,
  "spamBlockInitDate": {
    "$date": "2025-02-26T03:44:30.999Z"
  },
  "twoFaDate": {
    "$date": "2025-04-22T16:46:52.276Z"
  },
  "automaticCheckDate": {
    "$date": "2025-04-24T10:26:08.472Z"
  },
  "spamBlockReasons": [
    {
      "reason": "My messaging functionality needs to be fully restored. I can assure you that theres been no violation of community guidelines from my side, so this must be a mistake. I need to contact people who dont know about my account, and this issue is causing a lot of inconvenience.",
      "date": {
        "$date": "2025-03-19T19:57:21.250Z"
      }
    },
    {
      "reason": "Ive noticed an issue with my accounts messaging functionality. It seems like a mistake as I havent broken any rules, but I cant reach non-mutual contacts, causing me trouble. Please fix this ASAP.",
      "date": {
        "$date": "2025-03-19T20:58:56.035Z"
      }
    },
    {
      "reason": "My account has been mistakenly limited, impacting my ability to reach out. Ive never participated in any harmful behavior and ask for a quick review. Please restore full messaging access.",
      "date": {
        "$date": "2025-03-21T17:59:43.812Z"
      }
    },
    {
      "reason": "Id like my messaging function back. This is crucial for my work, but Im limited to chatting with mutuals right now. I havent broken any rules, so please consider this request.",
      "date": {
        "$date": "2025-03-26T06:39:25.626Z"
      }
    },
    {
      "reason": "I recently lost the ability to message all my contacts, which I believe is an error. I havent done anything wrong and would like to regain full messaging access. Please review my account activity to confirm my harmlessness.",
      "date": {
        "$date": "2025-03-27T11:35:39.171Z"
      }
    },
    {
      "reason": "I recently encountered a messaging issue, preventing me from reaching non-mutual contacts. Believing this to be an error, Im certain I havent violated any rules. Kindly restore my full messaging capabilities.",
      "date": {
        "$date": "2025-03-27T13:10:48.839Z"
      }
    },
    {
      "reason": "I need my messaging functionality back ASAP. I cant message people who arent mutual contacts, even though I havent done anything wrong. Please restore this feature so I can do my job.",
      "date": {
        "$date": "2025-03-28T20:32:37.358Z"
      }
    },
    {
      "reason": "Im unable to message new contacts due to an apparent mistake. I havent broken any rules, so I kindly ask for my full messaging access to be restored. Thanks for your time.",
      "date": {
        "$date": "2025-04-03T19:18:56.164Z"
      }
    },
    {
      "reason": "Id like to request the restoration of messaging functionality for my account. This restriction seems to be an error, as I havent violated any rules. Kindly review this issue and lift the messaging block.",
      "date": {
        "$date": "2025-04-08T17:19:30.462Z"
      }
    },
    {
      "reason": "I need to regain full messaging functionality. I havent broken any rules and am a genuine user. Please review my case.",
      "date": {
        "$date": "2025-04-09T09:51:38.754Z"
      }
    },
    {
      "reason": "Id like to report an issue with my Telegram accounts messaging function. Recently, Ive been unable to contact all my connections, which is limiting my ability to communicate effectively. Please review my account status as I believe this restriction is a mistake.",
      "date": {
        "$date": "2025-04-09T12:33:30.786Z"
      }
    },
    {
      "reason": "I believe my accounts recent inability to send messages to non-mutual contacts is an error. Ive done nothing to warrant this, and I need to communicate for work ASAP. Kindly restore my full messaging access.",
      "date": {
        "$date": "2025-04-14T10:50:31.270Z"
      }
    },
    {
      "reason": "I am unable to message important contacts due to a messaging block, which I believe is a mistake. My account has been unfairly limited despite my harmless activity. Please review this decision.",
      "date": {
        "$date": "2025-04-16T06:53:59.886Z"
      }
    },
    {
      "reason": "I believe my account has been incorrectly limited. I need to send important work messages immediately, so please restore full messaging functionality. Thank you.",
      "date": {
        "$date": "2025-04-16T10:47:12.150Z"
      }
    },
    {
      "reason": "My accounts message function needs to be fully reinstated soon. I didnt break any rules, so this block seems like a mistake. Access to important contacts is urgent.",
      "date": {
        "$date": "2025-04-16T13:09:09.882Z"
      }
    },
    {
      "reason": "I believe my recent messaging restrictions were mistakenly applied. Ive followed all guidelines and have no record of suspicious activity. Kindly review and restore my full messaging capabilities.",
      "date": {
        "$date": "2025-04-17T20:05:38.521Z"
      }
    },
    {
      "reason": "I want to reach out to important contacts, but a recent messaging restriction prevents this. Ive not done anything wrong and believe this is an error. Please restore my full messaging function.",
      "date": {
        "$date": "2025-04-20T16:11:40.729Z"
      }
    },
    {
      "reason": "I recently lost the ability to message non-mutual contacts, which is a mistake. My messaging should be fully restored, as Ive not done anything wrong or suspicious. Please review my account.",
      "date": {
        "$date": "2025-04-21T21:58:02.188Z"
      }
    },
    {
      "reason": "Id like to regain my full messaging functionality. The current restrictions seem to be a mistake, as Ive followed all guidelines. Kindly review my account activity.",
      "date": {
        "$date": "2025-04-22T17:04:34.167Z"
      }
    },
    {
      "reason": "I need to regain full messaging functionality, as my account has been incorrectly limited. I didnt break any rules, so please review this decision. Lets fix this.",
      "date": {
        "$date": "2025-04-22T18:37:29.260Z"
      }
    }
  ],
  "stopped": false,
  "lazyCheckDate": {
    "$date": "2025-04-23T22:22:00.213Z"
  },
  "personalChannelDate": {
    "$date": "2025-04-24T06:45:20.889Z"
  },
  "personalChannelError": "USER_RESTRICTED",
  "username": "naumov_alternative",
  "phone": "+380663394098"
},
{
  "_id": {
    "$oid": "67be71b3f5fa1dc4947a0d3b"
  },
  "accountId": "5707529498-prefix-aisender",
  "dc2": "b2cd76ff715553a68b9473d72e66a608d7ce54fa0933560d6673d9b484bf2d58157bb466ad207065091349fc9cf9ffd7e44c3f7260fba623b08e7929e54561bebf9365c5c5b783aeea849ef6a7f0ef0e3bb2dbd6cd00e78f218c20f8729f367cb5c28703563c6bdbcc1408cb043fc4c54e0b0d1cb64627c5dfcf89fb23658816964b9ce45900964fc766ac3ec2b61664ad32eb5034fdfeb11a8ad117149027930b3259a69f8d25417a4f2618e6d1321da8f55c09ad734420cc39309e384cd459cabf718c48cc80b9bc13e859ba0b918799a5ecfb569cdd5e3de1b87f912c1660c73a4520ed2a90c9fa4ae46cfcff9e1c72a8eba7c82816832343f0cf2e13054f",
  "dcId": 2,
  "nextApiId": 2040,
  "banned": false,
  "dateUpdated": {
    "$date": "2025-04-24T10:23:55.858Z"
  },
  "firstName": "Artur",
  "lastName": "Serov",
  "messageCount": 0,
  "id": "5707529498",
  "twoFa": false,
  "historySpamBlocks": [
    {
      "spamBlockDate": "INFINITY",
      "spamBlockDays": 0
    }
  ],
  "spamBlockDate": "INFINITY",
  "spamBlockDays": 0,
  "spamBlockInitDate": {
    "$date": "2025-02-26T02:10:12.896Z"
  },
  "twoFaDate": {
    "$date": "2025-04-22T16:46:57.252Z"
  },
  "automaticCheckDate": {
    "$date": "2025-04-24T10:23:55.858Z"
  },
  "spamBlockReasons": [
    {
      "reason": "Ive been wrongly limited from messaging users on Telegram. I didnt spam or break any rules, so this must be a mistake. Please lift this restriction.",
      "date": {
        "$date": "2025-03-18T18:20:54.452Z"
      }
    },
    {
      "reason": "I recently experienced an issue with my Telegram account where Im unable to message new contacts. Ive reviewed the rules and am confident Ive not violated any policies, nor engaged in any spamming activities. Id appreciate a review of this error.",
      "date": {
        "$date": "2025-03-19T14:01:50.045Z"
      }
    },
    {
      "reason": "Ive been unfairly blocked from messaging some contacts due to an apparent error. I havent done anything wrong and ask for this issue to be resolved immediately. Please restore my full messaging capabilities.",
      "date": {
        "$date": "2025-03-19T20:00:49.924Z"
      }
    },
    {
      "reason": "I believe my messaging capability has been mistakenly limited. Please restore full access, as I need to reach essential contacts that arent currently available. Your understanding is much appreciated.",
      "date": {
        "$date": "2025-03-20T10:46:42.176Z"
      }
    },
    {
      "reason": "My account has been unfairly impacted by recent changes, preventing me from messaging all contacts. I request this functionality be reinstated ASAP as its crucial for urgent communication. Im certain these restrictions were applied mistakenly.",
      "date": {
        "$date": "2025-03-26T06:31:24.839Z"
      }
    },
    {
      "reason": "I cant message non-mutual contacts due to an apparent error. Ive been a responsible user with no rule breaks, so Im confused. Please fix this, thanks.",
      "date": {
        "$date": "2025-03-27T13:18:18.000Z"
      }
    },
    {
      "reason": "Im unable to message new contacts, impacting my ability to communicate effectively. This restriction seems unfair, as I havent violated any rules. Kindly restore full messaging access.",
      "date": {
        "$date": "2025-04-03T19:14:51.624Z"
      }
    },
    {
      "reason": "I cant contact non-mutuals, limiting my reach. I believe this is an error, as Ive not broken any rules. Please restore full messaging access.",
      "date": {
        "$date": "2025-04-08T17:38:05.126Z"
      }
    },
    {
      "reason": "Ive been unfairly limited in reaching out to others on the platform. This might be a mistake, since Ive always followed the rules. Please restore my messaging function.",
      "date": {
        "$date": "2025-04-09T12:37:18.383Z"
      }
    },
    {
      "reason": "Im unable to message new contacts due to an apparent error. I havent violated any rules and want to ensure my account isnt flagged for suspicious activity. Please restore my full messaging capabilities.",
      "date": {
        "$date": "2025-04-14T10:50:19.772Z"
      }
    },
    {
      "reason": "I recently discovered I cant message all my contacts, which has caused me some inconvenience. I havent broken any rules, so Id like my messaging feature restored ASAP. Please consider this urgent request.",
      "date": {
        "$date": "2025-04-16T07:03:31.706Z"
      }
    },
    {
      "reason": "My account has been incorrectly flagged. Im unable to send work-related messages, causing issues for my job. Please review and restore my messaging function ASAP.",
      "date": {
        "$date": "2025-04-16T10:40:13.212Z"
      }
    },
    {
      "reason": "Id like to regain full messaging access for my account, believing it was mistakenly limited due to an error. I havent been involved in any questionable behavior. Urgent work communication is needed.",
      "date": {
        "$date": "2025-04-16T13:16:13.183Z"
      }
    },
    {
      "reason": "I recently encountered a messaging issue on my Telegram account, preventing me from contacting non-mutual friends. This restriction seems incorrect, as Ive caused no trouble. Please restore my full messaging capabilities.",
      "date": {
        "$date": "2025-04-17T20:05:10.068Z"
      }
    },
    {
      "reason": "My account is currently limited, preventing me from sending work-related messages, which is urgent. I believe this restriction is a mistake, as I havent done anything against the rules. Please review and restore my messaging capabilities.",
      "date": {
        "$date": "2025-04-19T10:26:30.578Z"
      }
    },
    {
      "reason": "Id like my messaging feature back. Im restricted from contacting non-mutuals, which is affecting my work. Please review my account—I havent broken any rules.",
      "date": {
        "$date": "2025-04-20T16:20:23.237Z"
      }
    },
    {
      "reason": "I want to clarify that my recent messaging restriction was likely a mistake. I havent broken any rules, and Im eager to resume normal communication. Please review and restore my accounts messaging functionality.",
      "date": {
        "$date": "2025-04-20T17:46:54.374Z"
      }
    },
    {
      "reason": "Im facing an issue with my Telegram account. I cant message new contacts, limiting my communication. Please review my accounts status, as I believe this restriction is a mistake.",
      "date": {
        "$date": "2025-04-21T22:11:56.938Z"
      }
    },
    {
      "reason": "Ive been unable to message important contacts due to unexpected restrictions. I believe this is an error as I havent engaged in any suspicious behavior. Please restore my full messaging capabilities.",
      "date": {
        "$date": "2025-04-22T17:03:03.109Z"
      }
    },
    {
      "reason": "Im unable to message non-mutual contacts, limiting my ability to connect with crucial individuals. This seems like an error, as Ive not been involved in any questionable behavior. Please review and restore my full messaging access.",
      "date": {
        "$date": "2025-04-22T18:40:17.751Z"
      }
    }
  ],
  "stopped": false,
  "lazyCheckDate": {
    "$date": "2025-04-23T23:47:14.814Z"
  },
  "personalChannelDate": {
    "$date": "2025-04-24T06:45:16.636Z"
  },
  "personalChannelError": "USER_RESTRICTED",
  "username": "serov_giant",
  "phone": "+380672698725"
},
{
  "_id": {
    "$oid": "67be71dff5fa1dc4947a22d7"
  },
  "accountId": "7698300283-prefix-aisender",
  "dc1": "389764200882e0cc5fa859d5c107e321c418e23d7cce0428ff7980df6a879c0923ce509a6f354ce82fe772cbec339ba83b1c2d0a99d7e11c4988579c05fcbf22cbdf8c9aa23e92ee6b9e79766e5cdcbd3b0f01ed4da3d205f5c2178ecb31e5ecde6489fb7a9d8cff77eaf9cdd4490d6861420eb65d6029ad31296d222903f05b29504467b0b68d93b8354eb59a9946c3fa44ab393a4597040678178af6127874edbafd60df454bfce96ba6a47023ff1bb09ee9c5c7a1ded7c02c3bcd879165c12695fc2d6ee2b0d67a08aa5747e65fc4879c0f200578d5069df77e88217a4a7e7f110458f2f827475eff9fa6471439cfaa8aa21a19b5c7458ec1e4c128a09a7a",
  "dcId": 1,
  "nextApiId": 2496,
  "banned": false,
  "dateUpdated": {
    "$date": "2025-04-24T10:21:06.212Z"
  },
  "firstName": "Artur",
  "lastName": "Dubrovin",
  "messageCount": 82,
  "id": "7698300283",
  "twoFa": false,
  "remainingTime": {
    "$date": "2025-04-22T12:11:50.122Z"
  },
  "twoFaDate": {
    "$date": "2025-04-22T16:47:06.666Z"
  },
  "automaticCheckDate": {
    "$date": "2025-04-24T10:21:06.212Z"
  },
  "historySpamBlocks": [
    {
      "spamBlockDate": {
        "$date": "2025-03-04T10:07:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-13T05:27:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-12T05:20:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-15T12:43:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-22T14:49:00.000Z"
      },
      "spamBlockDays": 7
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-24T09:34:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-27T13:15:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-29T19:34:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-04-02T06:32:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-04-14T09:51:00.000Z"
      },
      "spamBlockDays": 7
    },
    {
      "spamBlockDate": {
        "$date": "2025-04-09T10:53:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-04-12T12:25:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-04-21T05:29:00.000Z"
      },
      "spamBlockDays": 7
    },
    {
      "spamBlockDate": {
        "$date": "2025-04-22T05:19:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-04-25T12:29:00.000Z"
      },
      "spamBlockDays": 3
    }
  ],
  "lazyCheckDate": {
    "$date": "2025-04-23T23:46:24.349Z"
  },
  "stopped": false,
  "personalChannel": "ToOKvVqyExu2VWOF",
  "personalChannelDate": {
    "$date": "2025-04-21T10:58:57.145Z"
  },
  "spamBlockDate": {
    "$date": "2025-04-25T12:29:00.000Z"
  },
  "spamBlockDays": 3,
  "spamBlockInitDate": {
    "$date": "2025-04-22T12:29:54.346Z"
  },
  "username": "dubrovin_visual",
  "spamBlockReasons": [
    {
      "reason": "Ive been mistakenly limited in communicating via Telegram. Im not a spammer and have never broken any rules. Please restore my messaging function.",
      "date": {
        "$date": "2025-04-22T17:10:12.716Z"
      }
    }
  ],
  "phone": "+525638052164"
},
{
  "_id": {
    "$oid": "67be71f3f5fa1dc4947a26c7"
  },
  "accountId": "7889529566-prefix-aisender",
  "dc2": "69a078a51db43ddce773f4dfb80c3cc3edd1ea640e2e9e6da9edfd3b1b78a10328cb666f4f59fbd814ab9629a20ea5624e9d9f00407258e1814198860421dc6fc08e1d2625c69b68ecf90afacdac95c231427341e734cae6b51a93767ed4ac78b6ad521235c00a84b928d3e9e571901b3ddb7567e8e8a9bf858c0147ba9556ae1151dcd5c394c80c246d6c94c458885112079e7d7d39d81f443d3d0bf48df2385bc61235d3bc7f52150812a83d65b68a5644d24e1c58e4f285ff996808b9a55a2c856a4224065937111988395ed8c0ef5af503208195f272f384a41efb0c1fdbb8eff6d3f1a77540ff21544b1186b946a8ea1f6f20f40f119d1f95548832e9da",
  "dcId": 2,
  "nextApiId": 2496,
  "banned": false,
  "dateUpdated": {
    "$date": "2025-04-24T10:22:17.615Z"
  },
  "firstName": "Vitaly",
  "lastName": "Gromov",
  "messageCount": 140,
  "id": "7889529566",
  "twoFa": false,
  "historySpamBlocks": [
    {
      "spamBlockDate": "INFINITY",
      "spamBlockDays": 0
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-14T06:01:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-04-03T03:46:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-04-03T12:05:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-04-08T10:39:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-04-15T10:56:00.000Z"
      },
      "spamBlockDays": 7
    },
    {
      "spamBlockDate": {
        "$date": "2025-04-22T09:41:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-04-25T16:49:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-04-25T09:49:00.000Z"
      },
      "spamBlockDays": 1
    }
  ],
  "remainingTime": {
    "$date": "2025-04-24T11:48:17.750Z"
  },
  "twoFaDate": {
    "$date": "2025-04-22T16:47:06.615Z"
  },
  "automaticCheckDate": {
    "$date": "2025-04-24T10:21:08.397Z"
  },
  "lazyCheckDate": {
    "$date": "2025-04-23T22:49:36.448Z"
  },
  "stopped": false,
  "personalChannel": "ZRZ0WiRJLUthbiiL",
  "personalChannelDate": {
    "$date": "2025-04-21T10:57:02.968Z"
  },
  "username": "gromov_independent",
  "phone": "+380966631125",
  "spamBlockDate": {
    "$date": "2025-04-25T09:49:00.000Z"
  },
  "spamBlockDays": 1,
  "spamBlockInitDate": {
    "$date": "2025-04-24T10:22:17.615Z"
  }
},
{
  "_id": {
    "$oid": "67be71f3f5fa1dc4947a26ed"
  },
  "accountId": "7905126816-prefix-aisender",
  "dc2": "21159a17f884d3474902a97197bc82c1ab1a86b1591b561f341db72eae6cf907d5e8d72a4a15b7f67d6ed393358f266de3e4c17b11edfedf7cad9a0cf866d2f7a4dfadee16d91bfc0e314ff12129a226658f30a8062fe05c95675173f30af039e247d81d600dfbc0f1356bd1aea49b673a23075f03bc361b62ea0be32f00930edfeacc1724d180b12d603ecb00dd1df0cc9d5137fc760bb74407d659932ee01c231a6cef3d411d0c9a476cbc6763150573a9d87a7cc291ce4b5df3599e74da5927cdab432d1edab40ba9c064ddfb27e21ccfb56e0ad8d0804e4dad7f0608339a9e6964091826ddb7a4ff57a814273877892da1d48f635bf76a385400317f79aa",
  "dcId": 2,
  "nextApiId": 2496,
  "banned": false,
  "dateUpdated": {
    "$date": "2025-04-24T10:22:08.423Z"
  },
  "firstName": "Georgiy",
  "lastName": "Demidov",
  "messageCount": 0,
  "id": "7905126816",
  "twoFa": false,
  "historySpamBlocks": [
    {
      "spamBlockDate": "INFINITY",
      "spamBlockDays": 0
    }
  ],
  "spamBlockDate": "INFINITY",
  "spamBlockDays": 0,
  "spamBlockInitDate": {
    "$date": "2025-02-26T03:36:29.346Z"
  },
  "twoFaDate": {
    "$date": "2025-04-22T16:47:08.776Z"
  },
  "automaticCheckDate": {
    "$date": "2025-04-24T10:22:08.423Z"
  },
  "spamBlockReasons": [
    {
      "reason": "I need to communicate with non-mutual contacts for essential matters. I havent done anything wrong, so please restore my messaging function. I can provide more details if needed.",
      "date": {
        "$date": "2025-03-17T21:21:20.324Z"
      }
    },
    {
      "reason": "Im reaching out about my accounts message function. It seems theres been a mistake—I havent done anything wrong. Please restore my full messaging capabilities ASAP for important work communication.",
      "date": {
        "$date": "2025-03-18T16:08:22.233Z"
      }
    },
    {
      "reason": "Id like to report an issue with my accounts messaging function. I can only message mutual contacts, but I need to reach out to new connections for important discussions. I havent broken any rules, so this might be a mistake.",
      "date": {
        "$date": "2025-03-18T21:20:26.490Z"
      }
    },
    {
      "reason": "Ive been unfairly blocked from messaging new contacts despite never engaging in any harmful behavior. Please restore my full messaging capabilities. Id like to get my account working properly again.",
      "date": {
        "$date": "2025-03-19T09:07:56.708Z"
      }
    },
    {
      "reason": "Im unable to send messages to non-mutual contacts, even though my account is active. This temporary restriction seems like an error as I havent violated any rules. Id appreciate a quick review, as I need to contact some clients ASAP.",
      "date": {
        "$date": "2025-03-19T13:17:41.846Z"
      }
    },
    {
      "reason": "Ive been wrongly limited in my messaging capabilities on Telegram. Id like to get back full access to messaging. Please consider this request, as I have not violated any rules.",
      "date": {
        "$date": "2025-03-19T20:13:26.631Z"
      }
    },
    {
      "reason": "Ive been locked out of messaging non-mutual contacts despite not engaging in any suspicious behavior. Please restore full access, as its vital for me to reach out to essential connections.",
      "date": {
        "$date": "2025-03-19T21:52:31.823Z"
      }
    },
    {
      "reason": "Ive been locked out of messaging people outside my mutual contacts, but I need to reach important connections. This was likely a mistake, as I havent done anything wrong or suspicious. Please restore my full messaging capabilities.",
      "date": {
        "$date": "2025-03-20T10:47:34.957Z"
      }
    },
    {
      "reason": "Im experiencing a sudden issue with my Telegram account, as Im unable to message important contacts who arent mutual friends. I havent violated any rules, so Im sure this is a mistake and kindly ask for your assistance in restoring my messaging functionality.",
      "date": {
        "$date": "2025-03-20T21:44:00.913Z"
      }
    },
    {
      "reason": "I want to resolve an issue with my Telegram account. I believe a mistake has been made, as Im unable to message new contacts despite following all the rules. Please review.",
      "date": {
        "$date": "2025-03-21T06:20:29.136Z"
      }
    },
    {
      "reason": "I believe my accounts messaging function has been mistakenly limited. I want to clarify that I havent broken any rules and I need to contact non-mutual friends urgently. Kindly restore this feature soon.",
      "date": {
        "$date": "2025-03-25T13:01:03.006Z"
      }
    },
    {
      "reason": "My accounts messaging function is limited, preventing me from reaching key contacts. This seems like a mistake, as Ive done nothing against the rules. Could you please fix this?",
      "date": {
        "$date": "2025-03-26T06:21:12.527Z"
      }
    },
    {
      "reason": "I need to message new contacts for work, but Im limited to mutual chats. I believe this is a mistake, as Ive followed all rules. Kindly restore full messaging access.",
      "date": {
        "$date": "2025-03-27T13:21:36.823Z"
      }
    },
    {
      "reason": "I need to regain full messaging access. I believe my accounts current restrictions were applied mistakenly. Please review my case, as Ive followed all guidelines.",
      "date": {
        "$date": "2025-03-27T19:14:50.878Z"
      }
    },
    {
      "reason": "My accounts message functionality needs restoring. I didnt break any rules, so I think this happened by mistake. Please help me get back to chatting with everyone.",
      "date": {
        "$date": "2025-03-28T20:20:45.695Z"
      }
    },
    {
      "reason": "Id like to regain full messaging capabilities for my account. Ive been incorrectly limited to contacting only mutuals, hindering my ability to connect with important contacts. Please review this error.",
      "date": {
        "$date": "2025-03-29T11:37:26.275Z"
      }
    },
    {
      "reason": "I want to reach out to others without restrictions, which seems to be an error. I havent done anything wrong and ask for the fix of this issue.",
      "date": {
        "$date": "2025-04-03T19:10:36.820Z"
      }
    },
    {
      "reason": "I want to clarify that my recent message-sending restrictions were likely a mistake. Ive been a responsible user with no history of violations, so I hope you can lift these limits soon. Thanks for your understanding.",
      "date": {
        "$date": "2025-04-04T19:01:23.185Z"
      }
    },
    {
      "reason": "Ive been locked out of messaging, which affects my work. I didnt do anything wrong — theres been a mistake. Please fix this ASAP.",
      "date": {
        "$date": "2025-04-06T16:24:10.254Z"
      }
    },
    {
      "reason": "Im unable to message new contacts due to an apparent error, as Ive not violated any rules. Please restore my full messaging capabilities, considering my clean record.",
      "date": {
        "$date": "2025-04-08T17:18:41.791Z"
      }
    },
    {
      "reason": "My account has been unfairly limited, preventing me from contacting non-mutual users. I need to send urgent work messages and assure you Ive not violated any rules. Please review this error and restore my messaging function.",
      "date": {
        "$date": "2025-04-08T18:26:16.155Z"
      }
    },
    {
      "reason": "I want to reach out to all my contacts, but Im unable to message some of them due to a mistake. I havent done anything wrong, and I believe my accounts messaging function should be restored. Please review this error.",
      "date": {
        "$date": "2025-04-09T10:05:21.566Z"
      }
    },
    {
      "reason": "I request the lifting of message restrictions on my account, as I believe its an error. I havent engaged in any suspicious activity and need to contact non-mutual friends urgently. Kindly review this.",
      "date": {
        "$date": "2025-04-09T12:30:25.161Z"
      }
    },
    {
      "reason": "Ive been unable to send messages to non-mutual contacts due to an apparent error, despite following community guidelines. I need to urgently reach someone outside of my contacts for work-related matters. Please restore my messaging function.",
      "date": {
        "$date": "2025-04-09T20:03:22.058Z"
      }
    },
    {
      "reason": "Im unable to message people outside my contacts due to an apparent error. Please review my case and restore my full messaging capabilities, as I havent violated any rules. I need to reach important connections.",
      "date": {
        "$date": "2025-04-12T15:15:46.568Z"
      }
    },
    {
      "reason": "Im unable to message non-mutual contacts due to an apparent error. Please restore full messaging functionality to my account. I havent violated any rules.",
      "date": {
        "$date": "2025-04-12T21:34:29.225Z"
      }
    },
    {
      "reason": "I recently lost the ability to send messages to new contacts, although Ive followed all the rules. I didnt break any guidelines and never used my account for suspicious activities. Please restore my messaging function.",
      "date": {
        "$date": "2025-04-14T10:50:24.515Z"
      }
    },
    {
      "reason": "I cant send messages to new contacts, limiting my communication. This issue seems like a mistake, as Ive followed all guidelines. Please review and restore full messaging functionality.",
      "date": {
        "$date": "2025-04-14T12:32:17.618Z"
      }
    },
    {
      "reason": "Im unable to message non-mutual contacts due to what seems like an error. My account remains active, and Ive not been involved in any suspicious activity. Please restore full messaging access so I can resume urgent work communication.",
      "date": {
        "$date": "2025-04-16T06:51:00.269Z"
      }
    },
    {
      "reason": "Id like to regain full messaging functionality on my account, as I believe the current limitations were applied mistakenly. My activity doesnt involve any suspicious behavior, so I ask you to reconsider this issue.",
      "date": {
        "$date": "2025-04-16T10:44:58.143Z"
      }
    },
    {
      "reason": "My account has been mistakenly limited, preventing me from sending messages to non-mutual contacts. This issue needs urgent resolution as it impacts my work. Please reinstate full messaging functionality.",
      "date": {
        "$date": "2025-04-16T13:22:31.523Z"
      }
    },
    {
      "reason": "My account needs full messaging functionality. I believe the current restriction is a mistake as Ive not acted suspiciously. Please restore my access to connect with all contacts.",
      "date": {
        "$date": "2025-04-17T20:02:10.120Z"
      }
    },
    {
      "reason": "Ive been wrongly blocked from messaging non-mutual contacts, affecting my ability to communicate with essential connections. Please review my account and restore full messaging access, as I believe this restriction is an error. Ive never violated any rules.",
      "date": {
        "$date": "2025-04-19T10:43:12.125Z"
      }
    },
    {
      "reason": "Ive recently lost the ability to message anyone on Telegram except for mutual contacts, which is a huge issue for me. I havent done anything wrong and believe this was a mistake. Please restore my messaging function so I can communicate freely again.",
      "date": {
        "$date": "2025-04-20T10:55:59.052Z"
      }
    },
    {
      "reason": "Im experiencing an issue with my Telegram accounts messaging function. I havent violated any rules, so Id like to get my full access back. Kindly review my account activity and lift the restrictions.",
      "date": {
        "$date": "2025-04-20T16:34:20.833Z"
      }
    },
    {
      "reason": "I recently noticed that I cant send messages to non-mutual contacts, which is affecting my work. I believe this restriction is a mistake as I havent done anything against the rules. Please restore my full messaging capabilities ASAP.",
      "date": {
        "$date": "2025-04-20T17:45:11.379Z"
      }
    },
    {
      "reason": "Ive recently lost access to sending messages to everyone, which limits my ability to communicate with new business partners and greatly hinders my workflow. Could you please review my accounts status and help me resolve this issue ASAP?",
      "date": {
        "$date": "2025-04-21T11:51:52.313Z"
      }
    },
    {
      "reason": "Ive been a responsible user, following all guidelines. My accounts message function is limited, impacting my communication. Please restore my messaging capabilities so I can reach non-mutual contacts.",
      "date": {
        "$date": "2025-04-21T22:11:43.678Z"
      }
    },
    {
      "reason": "I believe my messaging function has been unfairly restricted, as Ive never spammed or violated any rules. Please review my account activity and restore my ability to message freely.",
      "date": {
        "$date": "2025-04-22T17:14:02.202Z"
      }
    },
    {
      "reason": "Ive recently lost the ability to message non-mutual contacts, limiting my communication. I believe this is a mistake, as I havent broken any rules. Please restore my messaging functions.",
      "date": {
        "$date": "2025-04-22T18:35:38.724Z"
      }
    }
  ],
  "stopped": false,
  "lazyCheckDate": {
    "$date": "2025-04-23T22:50:37.123Z"
  },
  "personalChannelDate": {
    "$date": "2025-04-24T06:04:56.037Z"
  },
  "personalChannelError": "USER_RESTRICTED",
  "username": "demidov_interesting",
  "phone": "+380979626488"
},
{
  "_id": {
    "$oid": "67be71f8f5fa1dc4947a281d"
  },
  "accountId": "7614952677-prefix-aisender",
  "dc2": "11207d3ceb8ca1cbd88932ec2bc0d6dbdabd45ee4be0870ac02ef157cbd2e3484c0db755109f379da8c1845100ac070774e05ac5afa75f25c2631f50079d54e897e6dd485d6c0ec031af21b3757233234c4b06eaed1171942b7060cb1e937bedf9fc633701ef77aa93be3a68b9a264588032bd424993bbbd88c6af0d973ec223923432451b9f7c9321a3c3eeae448bc8b822f296563c60e1b9962c4d3c6dcca1399de46abc45989d30c6200353914bdd8dfef6fc8a82a492a3a35905c07939f7d9d71a693614a2e1dedc78cf3f4b3a20f2844b9897fb8dc59d862b75e3d2c19941dcae0aa831c68cabc901d518afbeaba693a5ccf47619f62940a5dcf3ef399d",
  "dcId": 2,
  "nextApiId": 611335,
  "banned": false,
  "dateUpdated": {
    "$date": "2025-04-24T10:05:01.219Z"
  },
  "firstName": "Arthur",
  "lastName": "Simonov",
  "messageCount": 0,
  "id": "7614952677",
  "twoFa": false,
  "historySpamBlocks": [
    {
      "spamBlockDate": "INFINITY",
      "spamBlockDays": 0
    }
  ],
  "spamBlockDate": "INFINITY",
  "spamBlockDays": 0,
  "spamBlockInitDate": {
    "$date": "2025-02-26T02:17:14.135Z"
  },
  "twoFaDate": {
    "$date": "2025-04-22T16:47:08.537Z"
  },
  "automaticCheckDate": {
    "$date": "2025-04-24T10:05:01.219Z"
  },
  "spamBlockReasons": [
    {
      "reason": "I need my messaging function restored ASAP. Im facing a temporary block, despite following all guidelines, and its affecting my work. Please review my case, as this error disrupts my communication.",
      "date": {
        "$date": "2025-03-18T21:19:04.197Z"
      }
    },
    {
      "reason": "Id like to request a review of my accounts messaging functionality. I believe my account has been incorrectly flagged, as Ive followed all guidelines and have not violated any policies. I need full access to communicate with non-mutual contacts for urgent work matters.",
      "date": {
        "$date": "2025-03-19T11:29:47.281Z"
      }
    },
    {
      "reason": "I believe theres been a mistake. I havent broken any rules, yet Im now limited to messaging mutual contacts. Please restore my full messaging capabilities.",
      "date": {
        "$date": "2025-03-19T14:08:59.725Z"
      }
    },
    {
      "reason": "My IP address, 91. 198. 220. 234, is experiencing connection issues with Telegrams servers (ECONNREFUSED), limiting my messaging capabilities to mutual contacts only. I request urgent restoration of my full messaging functionality for work purposes, assuring you that I havent violated any rules.",
      "date": {
        "$date": "2025-03-19T19:57:07.753Z"
      }
    },
    {
      "reason": "My account seems to have been mistakenly flagged, limiting my messaging capabilities. I request you restore my access, as I need to reach important contacts outside my network. Thanks in advance for your help.",
      "date": {
        "$date": "2025-03-19T20:53:59.420Z"
      }
    },
    {
      "reason": "Im unable to contact non-mutual users, which is impacting my work. I believe this is a mistake, as Ive followed all rules. Please restore my full messaging access.",
      "date": {
        "$date": "2025-03-20T08:52:16.245Z"
      }
    },
    {
      "reason": "Im unable to message new contacts, affecting my work. My accounts message function needs restoring ASAP. Ive caused no issues and this block seems like an error.",
      "date": {
        "$date": "2025-03-24T14:34:32.224Z"
      }
    },
    {
      "reason": "My account has been incorrectly limited, preventing me from messaging non-mutual contacts. I havent broken any rules and would like to regain full access soon. Thanks for your understanding.",
      "date": {
        "$date": "2025-03-26T06:23:47.564Z"
      }
    },
    {
      "reason": "I cant message non-mutual contacts due to an apparent error. I havent done anything wrong. Please restore my full messaging access.",
      "date": {
        "$date": "2025-04-02T06:34:39.425Z"
      }
    },
    {
      "reason": "Im unable to message new contacts due to a potential error, which is affecting my work. I believe this restriction is unjustified as Ive not violated any policies. Please restore my full messaging capabilities.",
      "date": {
        "$date": "2025-04-03T17:13:24.798Z"
      }
    },
    {
      "reason": "I recently lost access to message sending on my account. I didnt engage in any negative behavior, so this change might be an error. Please restore my messaging function, as I need to reach important contacts.",
      "date": {
        "$date": "2025-04-08T17:25:37.750Z"
      }
    },
    {
      "reason": "Ive been unfairly blocked from messaging new contacts, despite following all guidelines. I request the removal of this restriction, as its preventing me from using the app as intended. Please review my case.",
      "date": {
        "$date": "2025-04-09T12:26:29.764Z"
      }
    },
    {
      "reason": "Im unable to message anyone except mutual contacts, despite not violating any rules. My account remains active, and I believe this issue occurred by mistake. Please restore full access.",
      "date": {
        "$date": "2025-04-09T16:12:00.620Z"
      }
    },
    {
      "reason": "I believe my account has been wrongly limited, as I havent broken any rules. Please review this decision and restore my messaging function—I need to contact new clients for work ASAP.",
      "date": {
        "$date": "2025-04-14T10:41:11.233Z"
      }
    },
    {
      "reason": "Ive always used Telegram responsibly and havent violated any rules. Please review my account status and restore full messaging functionality. Im unable to contact crucial connections without it.",
      "date": {
        "$date": "2025-04-16T06:45:41.450Z"
      }
    },
    {
      "reason": "My account has been incorrectly limited to messaging mutual contacts. I request to regain full messaging capabilities to connect with important contacts. Theres no reason for this limitation since I didnt violate any rules.",
      "date": {
        "$date": "2025-04-16T10:40:00.942Z"
      }
    },
    {
      "reason": "Ive noticed a recent change in my messaging capabilities, limiting my ability to connect with certain contacts. I believe this is a mistake, as Ive followed all guidelines and havent engaged in any inappropriate behavior. Kindly review my account status.",
      "date": {
        "$date": "2025-04-16T13:08:31.502Z"
      }
    },
    {
      "reason": "I believe my recent loss of messaging capabilities was a mistake. Ive done nothing wrong, and I urgently need to reach important contacts outside my network. Please restore my full messaging access.",
      "date": {
        "$date": "2025-04-17T20:18:20.854Z"
      }
    },
    {
      "reason": "Ive been using Telegram for years without any issues and am confused about my sudden inability to message new contacts. Please review my account activity and restore my messaging rights, as this error affects my ability to communicate with important people.",
      "date": {
        "$date": "2025-04-20T16:23:01.757Z"
      }
    },
    {
      "reason": "I need to message my contacts, but my account has been limited, preventing me from reaching them. This seems like a mistake as Ive followed all the rules. Please restore my messaging function.",
      "date": {
        "$date": "2025-04-21T21:52:19.141Z"
      }
    },
    {
      "reason": "I want to clarify that my accounts message-sending function is blocked. I havent done anything wrong, and this block was likely a mistake. Please review and restore my full messaging access.",
      "date": {
        "$date": "2025-04-22T17:19:08.940Z"
      }
    },
    {
      "reason": "Im experiencing an issue with my account, which appears to be restricted from sending messages to new contacts despite no apparent violation. Id appreciate a review, as this seems to be an error. Thanks in advance.",
      "date": {
        "$date": "2025-04-22T18:40:58.761Z"
      }
    }
  ],
  "lazyCheckDate": {
    "$date": "2025-04-23T22:31:53.965Z"
  },
  "stopped": false,
  "personalChannelDate": {
    "$date": "2025-04-24T06:04:56.062Z"
  },
  "personalChannelError": "USER_RESTRICTED",
  "username": "simonov_recent",
  "phone": "+380689671069"
},
{
  "_id": {
    "$oid": "67be71f9f5fa1dc4947a2839"
  },
  "accountId": "6769965973-prefix-aisender",
  "dc2": "7b6aed3d8abcfef0da6ba8bb0b61c20f3f9034f1b187e1cb80112157874b0cf7fc37b2df90cfcb0ef44d8e49e4f346a1101c50ffb998ad0974a8ddeb98ea8666e60c5b417e75596a42cbdf5031417c1ddd3c0a8626b40d5467020203536d648ab92f9d31f688b5248d30d91a3d3f5682b35abfda7913836c5d31b98a6b3832f3010beb5e210af0352aeb5f20d42459edb718e02e5370ef91c8ee2a25dd8291f2770cd4271f6d920ba081377888b2896bca12113563a031cde6211b7f5ca7f5a288325b9b3fda0b64d2b1fffb4b71d441344f5213ecbb9ea1b34cc785ed3b784176014367110875bc3d20bc497ed9fc48852034ffb3dd1fdb40b279c1cffd88e2",
  "dcId": 2,
  "nextApiId": 2496,
  "banned": false,
  "dateUpdated": {
    "$date": "2025-04-24T10:10:07.327Z"
  },
  "firstName": "Dmitriy",
  "lastName": "Panfilov",
  "messageCount": 107,
  "id": "6769965973",
  "twoFa": false,
  "historySpamBlocks": [
    {
      "spamBlockDate": "INFINITY",
      "spamBlockDays": 0
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-03T07:29:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-13T10:22:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-12T13:30:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-13T08:40:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-14T09:14:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-17T09:22:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-17T07:31:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-21T10:44:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-30T07:38:00.000Z"
      },
      "spamBlockDays": 7
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-25T05:08:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-28T09:27:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-30T05:27:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-04-03T05:46:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-04-02T16:55:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-04-07T12:39:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-04-15T11:45:00.000Z"
      },
      "spamBlockDays": 7
    },
    {
      "spamBlockDate": {
        "$date": "2025-04-11T16:08:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-04-15T08:09:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-04-16T12:02:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-04-22T08:21:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-04-25T11:25:00.000Z"
      },
      "spamBlockDays": 3
    }
  ],
  "remainingTime": {
    "$date": "2025-04-24T11:49:21.349Z"
  },
  "twoFaDate": {
    "$date": "2025-04-22T16:47:08.536Z"
  },
  "automaticCheckDate": {
    "$date": "2025-04-24T10:10:07.327Z"
  },
  "lazyCheckDate": {
    "$date": "2025-04-23T21:56:23.223Z"
  },
  "stopped": false,
  "personalChannel": "pxyFuBq9OFWlShnW",
  "personalChannelDate": {
    "$date": "2025-04-21T10:57:20.401Z"
  },
  "username": "panfilov_nuclear",
  "phone": "+380982242770"
},
{
  "_id": {
    "$oid": "67be71f9f5fa1dc4947a283e"
  },
  "accountId": "5904887375-prefix-aisender",
  "dc2": "47eb52b2230204cd665c5f5397c3ecd9de521305d9adb51e39a853df1497e2bd5671effd24d283ccf1fb6388d70dcf4ba6790c9e291fb9bbde8b3e4f953bbe8887ef34c95e1a51991e8b4e3af1fb3ca4d06ae16279c07399cf82b91a88a293d575076e315c2bee0818176f05d29d7f6583017fc34036cf39d4c01cf3253f73233841a2e85e659f4492ec08ddb50bd2139f60ba862efa0903ced0f8168c8169ca5f53169a51346c371964dd31fd591bb527acd59a06a02e405d32a7b4e238d2b244fbd42547ca7f4542b58119395ab040a2cd5f0c2f9f1f436cf0c111d67fa46e57545ab455723651202665bfe6e5794ca6c3834aa808bcb6b3339453d31d9e1c",
  "dcId": 2,
  "nextApiId": 2496,
  "banned": false,
  "dateUpdated": {
    "$date": "2025-04-24T10:03:08.593Z"
  },
  "firstName": "Arthur",
  "lastName": "Grishin",
  "messageCount": 30,
  "id": "5904887375",
  "twoFa": false,
  "historySpamBlocks": [
    {
      "spamBlockDate": "INFINITY",
      "spamBlockDays": 0
    },
    {
      "spamBlockDate": {
        "$date": "2025-04-13T08:08:00.000Z"
      },
      "spamBlockDays": 1
    }
  ],
  "twoFaDate": {
    "$date": "2025-04-22T16:47:08.541Z"
  },
  "automaticCheckDate": {
    "$date": "2025-04-24T10:03:08.593Z"
  },
  "stopped": false,
  "lazyCheckDate": {
    "$date": "2025-04-23T23:09:34.572Z"
  },
  "remainingTime": {
    "$date": "2025-04-24T11:49:29.560Z"
  },
  "personalChannel": "Ej3IrNSFSDeoZZWG",
  "personalChannelDate": {
    "$date": "2025-04-21T10:55:49.137Z"
  },
  "username": "grishin_indirect",
  "phone": "+380666482181"
},
{
  "_id": {
    "$oid": "67be71faf5fa1dc4947a2843"
  },
  "accountId": "6038569175-prefix-aisender",
  "dc2": "531ec95af7ee451479d81fd304ce651f166c8a58fd4715328ab640077552a57173521db2527470291e7342014d3a10a4a388bb8e63f4316cb7cfcb5c92a4f244147a015bd9da75fedd86cfa25ac5afadd2ec727b0e51e8582a734eaf903a944244332c3f847d9dbca34a2f09b19511d35bad0733efa9967feea54efeb5445a78070b7dbd381794428ca6dff89e8391651e337c05e0f7bba61b5d913f7c2beecb8071c03af2d15bb30ffa6b5048dd7edb39e8da2014be84e0f96bcdb91bdd77bf5215de9ea67b8d442b5e3eaf685de20b73066097e2ac6be3c7c1a9dcae91cd9330657c11a74116ed738c508000c7e8a1920a4220f910de40412d6e34ee437915",
  "dcId": 2,
  "nextApiId": 2496,
  "banned": false,
  "dateUpdated": {
    "$date": "2025-04-24T10:00:09.776Z"
  },
  "firstName": "Victor",
  "lastName": "Bukin",
  "messageCount": 79,
  "id": "6038569175",
  "remainingTime": {
    "$date": "2025-04-24T11:34:58.720Z"
  },
  "historySpamBlocks": [
    {
      "spamBlockDate": {
        "$date": "2025-03-01T20:05:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-05T11:26:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-05T15:03:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-09T11:14:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-07T14:04:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-11T08:57:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-12T17:44:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-16T12:55:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-24T04:48:00.000Z"
      },
      "spamBlockDays": 7
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-22T06:21:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-26T12:30:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-28T06:33:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-31T13:12:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-04-02T05:20:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-04-05T05:39:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-04-13T08:49:00.000Z"
      },
      "spamBlockDays": 7
    },
    {
      "spamBlockDate": {
        "$date": "2025-05-14T12:20:00.000Z"
      },
      "spamBlockDays": 30
    },
    {
      "spamBlockDate": {
        "$date": "2025-04-21T11:36:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-04-23T05:43:00.000Z"
      },
      "spamBlockDays": 1
    }
  ],
  "automaticCheckDate": {
    "$date": "2025-04-24T10:00:09.776Z"
  },
  "stopped": false,
  "lazyCheckDate": {
    "$date": "2025-04-23T22:45:37.716Z"
  },
  "personalChannel": "mcp3vKmfdBXwwPOC",
  "personalChannelDate": {
    "$date": "2025-04-21T10:58:23.371Z"
  },
  "username": "bukin_chemical",
  "phone": "+380680684802"
},
{
  "_id": {
    "$oid": "67be71fcf5fa1dc4947a29be"
  },
  "accountId": "6311611001-prefix-aisender",
  "dc2": "3ec2128640e48dabe6f4f7a531c7040202f732803d095479a4734a67dc526a47e11908f6188366bc082a9b3cd7d94786458413ee583c571457be37dbdeea5f9fe6c87a77f0aff51ef7d23655fd05d8f23bc0c86cdb4d2054d7eb565dc07acdec3e500a1fdbd15c8cdce76c781e45878a73e19e2e4f2bab0d8d29ae7e8c1b1406d67a7f33987b161e64b58e0259202570c2c2bb68afe959206ab9870cfd3b80095bd4fd0c9807a22b9ba922b981f3f651fd5ccb9aaf215e80d2161f8fe904a9bb6e8a1b773a57259fc802faf439604c92f7b923afd404660c26055c809961d5a8cd4990b48a7fe3738cdee40d90d21d774ef6cb7ba48a314d3f3331b18104fc81",
  "dcId": 2,
  "nextApiId": 2040,
  "banned": false,
  "dateUpdated": {
    "$date": "2025-04-24T10:17:07.377Z"
  },
  "firstName": "Boris",
  "lastName": "Sobolev",
  "messageCount": 0,
  "id": "6311611001",
  "twoFa": false,
  "historySpamBlocks": [
    {
      "spamBlockDate": "INFINITY",
      "spamBlockDays": 0
    }
  ],
  "spamBlockDate": "INFINITY",
  "spamBlockDays": 0,
  "spamBlockInitDate": {
    "$date": "2025-02-26T03:42:30.534Z"
  },
  "twoFaDate": {
    "$date": "2025-04-22T16:47:08.541Z"
  },
  "automaticCheckDate": {
    "$date": "2025-04-24T10:17:07.377Z"
  },
  "spamBlockReasons": [
    {
      "reason": "I recently experienced an issue with my Telegram account, where I can only message mutual contacts despite no violations. I believe this is an error, as Ive never engaged in any suspicious activity. Kindly review and restore my full messaging capabilities.",
      "date": {
        "$date": "2025-03-19T09:11:04.489Z"
      }
    },
    {
      "reason": "Id like to clarify my accounts messaging status. I can only message mutual contacts despite no violations. Please review this decision.",
      "date": {
        "$date": "2025-03-19T11:28:20.465Z"
      }
    },
    {
      "reason": "I believe my messaging restrictions were applied in error. I have not violated any policies and wish to reach my contacts without limitations. Kindly review my case and restore full access.",
      "date": {
        "$date": "2025-03-19T14:05:21.838Z"
      }
    },
    {
      "reason": "My account needs its messaging function restored. Im certain theres been a mistake, as I havent broken any rules. Its crucial for my job to get this fixed ASAP.",
      "date": {
        "$date": "2025-03-19T20:04:18.593Z"
      }
    },
    {
      "reason": "Ive noticed an unexpected change in my accounts messaging functionality. My work requires immediate access to full messaging capabilities. Please review my case and restore my messaging rights soon.",
      "date": {
        "$date": "2025-03-19T21:14:27.308Z"
      }
    },
    {
      "reason": "Id like to regain full messaging access on my account. I cant send messages to non-mutual contacts, but I need to contact them, which is why Im appealing this decision. Ive not done anything wrong and would appreciate getting my account back to normal.",
      "date": {
        "$date": "2025-03-20T09:47:02.909Z"
      }
    },
    {
      "reason": "Id like to regain full messaging functionality on my account. This feature was likely removed by mistake, as Ive not violated any policies. Please review my account status and restore my messaging abilities.",
      "date": {
        "$date": "2025-03-21T07:40:39.864Z"
      }
    },
    {
      "reason": "My messaging feature seems to be partially disabled. I believe this is a mistake, as Ive followed all the rules. Kindly restore my access so I can message anyone, not just mutuals.",
      "date": {
        "$date": "2025-03-22T10:07:22.364Z"
      }
    },
    {
      "reason": "Ive noticed a sudden change in my messaging capabilities on Telegram. My account seems to have been mistakenly limited, preventing me from reaching some contacts. Please restore full access, as Ive never violated any policies.",
      "date": {
        "$date": "2025-03-26T06:19:58.641Z"
      }
    },
    {
      "reason": "Id like to resolve an issue with my accounts messaging function. Despite my clean activity record, I cant message some contacts, which hinders my communication. Please review and restore full access.",
      "date": {
        "$date": "2025-03-27T11:48:54.304Z"
      }
    },
    {
      "reason": "Ive been a responsible user, and my accounts current status is an error. Please restore my full messaging functionality so I can contact non-mutual connections.",
      "date": {
        "$date": "2025-03-27T19:02:32.318Z"
      }
    },
    {
      "reason": "My accounts messaging function needs to be fully restored. I have been incorrectly limited to only messaging mutual contacts, which is affecting my important conversations. I havent done anything wrong, so please lift these restrictions.",
      "date": {
        "$date": "2025-04-03T17:31:46.233Z"
      }
    },
    {
      "reason": "Id like my messaging function back. Ive done nothing wrong and need to reach all my contacts, many of whom dont know about my account yet. Kindly review my request and restore my access.",
      "date": {
        "$date": "2025-04-04T19:16:38.265Z"
      }
    },
    {
      "reason": "My account has been incorrectly flagged, limiting my messaging. I havent broken any rules and theres been a mistake. Please restore my full access to messaging so I can reach essential contacts.",
      "date": {
        "$date": "2025-04-08T17:35:11.790Z"
      }
    },
    {
      "reason": "My recent messaging restrictions seem to be a mistake. I havent broken any rules, so I want to request access to send messages to all my contacts. I need to get in touch with some important people.",
      "date": {
        "$date": "2025-04-09T12:20:00.606Z"
      }
    },
    {
      "reason": "Id like to report a potential error regarding my accounts messaging function. Ive been unable to message non-mutual contacts, which affects my communication with important connections. Kindly review this issue, as I believe my account was wrongly flagged.",
      "date": {
        "$date": "2025-04-14T10:59:28.853Z"
      }
    },
    {
      "reason": "My account needs its messaging function fully restored ASAP. Ive been locked out of contacting new friends, which is urgent. No shady activity here.",
      "date": {
        "$date": "2025-04-16T07:01:17.532Z"
      }
    },
    {
      "reason": "I need to regain full messaging functionality as soon as possible, since its a work emergency. Im sure this restriction is a mistake, as Ive followed all the rules.",
      "date": {
        "$date": "2025-04-16T10:49:04.646Z"
      }
    },
    {
      "reason": "Im unable to message non-mutual contacts, which limits my communication. I believe this is an error, as Ive followed all guidelines. Please review my account activity and restore full messaging access.",
      "date": {
        "$date": "2025-04-16T13:26:23.352Z"
      }
    },
    {
      "reason": "Ive been using Telegram responsibly with no violations. I cant message everyone on my contact list, which is affecting my work. Please restore my messaging function.",
      "date": {
        "$date": "2025-04-16T16:40:49.030Z"
      }
    },
    {
      "reason": "Id like to resolve an issue regarding message sending on my account. My ability to communicate has been mistakenly limited, as I havent violated any policies. Kindly review and restore my full messaging capabilities.",
      "date": {
        "$date": "2025-04-17T20:04:04.971Z"
      }
    },
    {
      "reason": "Ive recently lost access to messaging other users. This error must be fixed immediately, as I need to contact someone about urgent work matters. Please reinstate my messaging function so I can reach out to non-mutual contacts.",
      "date": {
        "$date": "2025-04-19T10:44:43.347Z"
      }
    },
    {
      "reason": "Id like to regain full messaging access on my account, as I need to contact non-mutual work colleagues. I believe this restriction was a mistake, as Ive never violated any rules. Please review and restore my messaging function.",
      "date": {
        "$date": "2025-04-20T16:10:47.557Z"
      }
    },
    {
      "reason": "Im unable to message all my contacts due to an apparent error. My account is active, and Ive caused no disruption, so I ask that you restore full messaging access.",
      "date": {
        "$date": "2025-04-21T21:55:52.072Z"
      }
    },
    {
      "reason": "My account has been incorrectly flagged. Im certain I havent violated any rules and would like to resume messaging all users. Kindly review and restore full access.",
      "date": {
        "$date": "2025-04-22T17:11:06.887Z"
      }
    },
    {
      "reason": "Ive been unfairly blocked from messaging new contacts, hindering my ability to connect with others. I assure you, theres been no breach of guidelines. Please restore my full messaging functionality.",
      "date": {
        "$date": "2025-04-22T18:36:13.932Z"
      }
    }
  ],
  "lazyCheckDate": {
    "$date": "2025-04-23T22:18:54.036Z"
  },
  "stopped": false,
  "personalChannelDate": {
    "$date": "2025-04-24T06:04:56.677Z"
  },
  "personalChannelError": "USER_RESTRICTED",
  "username": "sobolev_huge",
  "phone": "+380980108716"
},
{
  "_id": {
    "$oid": "67eeba1c461801f5995cffcf"
  },
  "accountId": "8017535472-prefix-female-million",
  "dc2": "6246dd20c1edab399e0bd3c3ee05cf85eed7b5ca74afea2ee2be4fbc6ca0da6b168c2742f11dfb0022a69cfdc4f4bc929f55d6cd14857a2bca16ec7aa135892820ec65cc1b5ef1de6b6683384574496cbca25b17491cc11d67dae50906534e8b2b39f57d5e5c02549b3c0ad1719db31828cb6101dbb49ae2d4eaed2ffc11b974cdfaf87e18e29452bfe93ea561c11a594158e5bb053ff306f120a79da89e16b67a5f274527c1a654cbf1ce00f3f4592826d1b061b8cde080026de121a6d6eca2dd09ed507a55cb516f8fdcc1bce545edb6effa679de4a6c4fabeb92efad7d0ad06a2f5f08a4e8744500975e5e6a38ed635828b5998df43ad27f735e6cf777edd",
  "dcId": 2,
  "nextApiId": 2496,
  "dateUpdated": {
    "$date": "2025-04-24T10:17:47.593Z"
  },
  "twoFa": false,
  "twoFaDate": {
    "$date": "2025-04-21T21:47:50.750Z"
  },
  "personalChannelDate": {
    "$date": "2025-04-24T06:04:55.032Z"
  },
  "personalChannelError": "USER_RESTRICTED",
  "banned": false,
  "firstName": "Darina",
  "id": "8017535472",
  "lastName": "Trifonova",
  "messageCount": 0,
  "personalChannel": null,
  "automaticCheckDate": {
    "$date": "2025-04-24T10:17:47.593Z"
  },
  "spamBlockReasons": [
    {
      "reason": "I recently lost the ability to send messages to non-mutual contacts, impacting my work. As this seems like an error, I kindly request you restore my messaging function. Please consider my clean messaging history.",
      "date": {
        "$date": "2025-04-03T17:17:38.593Z"
      }
    },
    {
      "reason": "I need to communicate with new contacts for work purposes, but my accounts message function is limited. Please review and restore my full messaging capabilities, as I believe this restriction is a mistake.",
      "date": {
        "$date": "2025-04-05T20:30:30.892Z"
      }
    },
    {
      "reason": "My account seems to have limited messaging functionality, preventing me from contacting crucial non-mutual connections. I believe this is a mistake as I havent done anything wrong. Please restore my full messaging access.",
      "date": {
        "$date": "2025-04-06T16:29:36.866Z"
      }
    },
    {
      "reason": "Id like my messaging restored, as Im currently limited to contacting mutuals only. I havent done anything wrong, so this restriction seems unfair. Thanks for your help.",
      "date": {
        "$date": "2025-04-08T17:28:57.424Z"
      }
    },
    {
      "reason": "Id like to resolve an issue with my accounts messaging function. Despite not violating any rules, Im unable to message new contacts. Could you help fix this error?",
      "date": {
        "$date": "2025-04-08T19:20:28.176Z"
      }
    },
    {
      "reason": "Im unable to message new contacts, even though Ive not violated any rules or engaged in spam. Please restore full messaging functionality to my account, as this restriction was likely an error.",
      "date": {
        "$date": "2025-04-09T12:17:49.395Z"
      }
    },
    {
      "reason": "My accounts current limitations hinder vital communication with key contacts. I request a review, as I believe these restrictions were applied incorrectly. Im certain I havent been involved in any malicious or questionable activity.",
      "date": {
        "$date": "2025-04-09T15:59:35.080Z"
      }
    },
    {
      "reason": "My accounts messaging function needs restoration. Im sure this was an oversight since I havent done anything wrong. I require full access to reach important contacts.",
      "date": {
        "$date": "2025-04-10T18:39:50.954Z"
      }
    },
    {
      "reason": "Ive been locked out of messaging non-mutual contacts, which is a mistake. My account activity is clean, and Id like to continue using Telegram without limitations. Please restore my full access.",
      "date": {
        "$date": "2025-04-11T20:32:18.942Z"
      }
    },
    {
      "reason": "I cant message new contacts, affecting my work. I didnt break any rules and think this might be a mistake. Please fix this issue ASAP.",
      "date": {
        "$date": "2025-04-12T15:07:30.248Z"
      }
    },
    {
      "reason": "I need to regain full messaging functionality on my Telegram account. I havent broken any rules, and I believe my accounts current state is a mistake. Please review my case.",
      "date": {
        "$date": "2025-04-12T16:24:19.866Z"
      }
    },
    {
      "reason": "I recently noticed a limitation on my account regarding message delivery. This issue is preventing me from reaching some of my contacts, which is unexpected since I havent violated any rules. Could you please review this?",
      "date": {
        "$date": "2025-04-12T21:35:42.052Z"
      }
    },
    {
      "reason": "I need to regain full messaging capabilities on my account, which are currently limited to mutual contacts only. No violations were committed from my side.",
      "date": {
        "$date": "2025-04-14T10:43:31.118Z"
      }
    },
    {
      "reason": "I recently noticed a messaging issue on my Telegram account. I havent broken any rules and believe this limitation was applied mistakenly. Please review my case and restore full messaging access.",
      "date": {
        "$date": "2025-04-14T12:04:44.994Z"
      }
    },
    {
      "reason": "Im reaching out regarding my accounts recent messaging limitations. Despite being able to message mutual contacts, I cant initiate new conversations. This unexpected issue prevents me from contacting some essential people.",
      "date": {
        "$date": "2025-04-16T07:05:20.979Z"
      }
    },
    {
      "reason": "I believe my accounts messaging feature was mistakenly limited. I need full access to communicate with crucial contacts. Please review my account activity to confirm no violations occurred.",
      "date": {
        "$date": "2025-04-16T10:49:40.454Z"
      }
    },
    {
      "reason": "I believe my messaging function was mistakenly limited. Ive not been involved in any questionable behavior and wish to contact non-mutuals. Please reinstate my full messaging capabilities.",
      "date": {
        "$date": "2025-04-16T13:19:06.500Z"
      }
    },
    {
      "reason": "Ive been an active Telegram user without engaging in any suspicious behavior. Recently, Ive been unable to message certain important contacts, which has limited my communication. Kindly restore my full messaging access.",
      "date": {
        "$date": "2025-04-16T16:58:28.391Z"
      }
    },
    {
      "reason": "My accounts recent inability to send messages has impacted my work. I havent broken any rules, so this block seems like a mistake. Please restore full messaging rights ASAP.",
      "date": {
        "$date": "2025-04-17T20:08:30.855Z"
      }
    },
    {
      "reason": "My accounts functionality was limited by mistake. I havent broken any rules and never sent spam. Please restore my messaging capabilities.",
      "date": {
        "$date": "2025-04-19T10:44:52.272Z"
      }
    },
    {
      "reason": "Im unable to message non-mutual contacts, limiting my communication. Ive been falsely flagged, as I havent violated any rules. Please restore full messaging access.",
      "date": {
        "$date": "2025-04-20T16:25:46.111Z"
      }
    },
    {
      "reason": "I want to resolve an issue with my accounts messaging function. Im unable to reach some contacts, hindering my communication. Please review, as I believe this was a mistake.",
      "date": {
        "$date": "2025-04-20T17:37:34.237Z"
      }
    },
    {
      "reason": "Im unable to message non-mutual contacts, even though my account is active. I believe this is a mistake, as Ive followed all guidelines and never engaged in any inappropriate behavior. Please restore full messaging functionality.",
      "date": {
        "$date": "2025-04-21T22:09:49.927Z"
      }
    },
    {
      "reason": "Im unable to send messages to important contacts due to a potential mistake. Please restore my access to messaging functions.",
      "date": {
        "$date": "2025-04-22T15:43:30.502Z"
      }
    },
    {
      "reason": "I recently experienced a messaging restriction on my account, preventing me from contacting non-mutual friends. I believe this was a mistake, as Ive never violated any rules. Kindly review and restore my full messaging capabilities.",
      "date": {
        "$date": "2025-04-22T16:51:38.003Z"
      }
    },
    {
      "reason": "Ive been unfairly blocked from messaging non-mutual contacts, hindering my work. I need this fixed ASAP as Ive done nothing wrong. Kindly review and restore my full access.",
      "date": {
        "$date": "2025-04-22T18:23:21.084Z"
      }
    }
  ],
  "historySpamBlocks": [
    {
      "spamBlockDate": "INFINITY",
      "spamBlockDays": 0
    }
  ],
  "spamBlockDate": "INFINITY",
  "spamBlockDays": 0,
  "spamBlockInitDate": {
    "$date": "2025-04-03T17:17:38.598Z"
  },
  "lazyCheckDate": {
    "$date": "2025-04-23T22:25:44.966Z"
  },
  "stopped": false,
  "username": "trifonova_occasional",
  "phone": "+380931412878"
},
{
  "_id": {
    "$oid": "67eeba1d461801f5995d0021"
  },
  "accountId": "8135571826-prefix-female-million",
  "dc2": "7df5749c79f851fa0ec2164708f297f7f7134dc7957c0ce36ca306956a454b1ed8823357e7b97bb25ee1082a2b993e98d40a8f000571ee806bf6e4aaae68289e9a48fb24c508c4fc96c5f4413c33a9bb29cd07c6305470a25678e79fd91a952a0913c6a6ff76ef7c3135f3832dc9fef805abb929c89185c9e991aafd0ccb152c6af5050b4f6e3f63fd21b9a595a0666944ceaaff0d1b6cd40ee28933469089dd7613cadbb2391b810b3120a47875e524ed57e0938275acd47361fc694afb1ec4d83b078d142f3729c6df3b1f77da9b2860365b891057c8547fff4334aff7d9e4820779a4af57328afdfbb509c5c1560e0bc5fc17129c101582f4a4a7c6223eee",
  "dcId": 2,
  "nextApiId": 611335,
  "dateUpdated": {
    "$date": "2025-04-24T10:09:55.411Z"
  },
  "twoFa": false,
  "twoFaDate": {
    "$date": "2025-04-21T21:47:56.939Z"
  },
  "personalChannelDate": {
    "$date": "2025-04-24T06:04:56.341Z"
  },
  "personalChannelError": "USER_RESTRICTED",
  "banned": false,
  "firstName": "Liza",
  "id": "8135571826",
  "lastName": "Mozharova",
  "messageCount": 0,
  "personalChannel": null,
  "automaticCheckDate": {
    "$date": "2025-04-24T10:09:55.411Z"
  },
  "historySpamBlocks": [
    {
      "spamBlockDate": "INFINITY",
      "spamBlockDays": 0
    }
  ],
  "spamBlockDate": "INFINITY",
  "spamBlockDays": 0,
  "spamBlockInitDate": {
    "$date": "2025-04-03T17:31:27.826Z"
  },
  "spamBlockReasons": [
    {
      "reason": "I need to communicate with new clients for work, but my account seems to be temporarily limited. Ive not broken any rules and would like my messaging function restored ASAP. Please review and consider my request.",
      "date": {
        "$date": "2025-04-03T20:04:50.858Z"
      }
    },
    {
      "reason": "I need to message non-mutual contacts urgently. I havent done anything wrong and believe this limitation is a mistake. Please review and restore my full messaging capabilities.",
      "date": {
        "$date": "2025-04-08T17:29:02.497Z"
      }
    },
    {
      "reason": "I cant contact new potential clients due to message delivery restrictions, which I believe were applied mistakenly. Please restore my full messaging capabilities so I can reach all my business contacts.",
      "date": {
        "$date": "2025-04-09T12:18:09.334Z"
      }
    },
    {
      "reason": "I recently noticed I cant send messages to non-mutual contacts, which isnt right. My activity is harmless, so theres no reason for this issue. Please let me use this function again ASAP, as I need it for work.",
      "date": {
        "$date": "2025-04-14T10:49:01.667Z"
      }
    },
    {
      "reason": "I believe theres been a mistake regarding my accounts messaging capabilities. Ive done nothing to warrant this action, and its crucial I regain full access to communicate with all contacts. Please review and rectify this issue.",
      "date": {
        "$date": "2025-04-16T06:56:05.095Z"
      }
    },
    {
      "reason": "Ive been unfairly limited in communicating with others on Telegram. Despite being an honest user, Im unable to message non-mutual contacts, affecting my productivity. Please review and restore my full messaging capabilities.",
      "date": {
        "$date": "2025-04-16T13:05:29.537Z"
      }
    },
    {
      "reason": "I recently experienced an issue with message delivery. I cant reach essential contacts due to a sudden restriction, which I believe is a mistake. Please help restore full access.",
      "date": {
        "$date": "2025-04-17T20:03:32.211Z"
      }
    },
    {
      "reason": "Im unable to message new contacts due to an apparent error. I havent violated any rules or engaged in suspicious activity, so I kindly request that you restore my messaging permissions. Please review my accounts status.",
      "date": {
        "$date": "2025-04-19T10:24:08.329Z"
      }
    },
    {
      "reason": "My account is currently limited to messaging mutual contacts. I believe this is a mistake, as Ive not been involved in any suspicious activity. Please restore full messaging access so I can reach essential contacts.",
      "date": {
        "$date": "2025-04-20T12:39:19.472Z"
      }
    },
    {
      "reason": "I recently experienced an issue with my Telegram account regarding message sending functionality. I believe this restriction is a mistake, as I havent violated any rules. Kindly restore my messaging permissions ASAP for work reasons.",
      "date": {
        "$date": "2025-04-20T16:21:15.759Z"
      }
    },
    {
      "reason": "I believe my account has been incorrectly limited. Ive followed the rules and havent spammed anyone, so theres no reason for this issue. Please restore my full messaging functionality.",
      "date": {
        "$date": "2025-04-21T22:32:53.101Z"
      }
    },
    {
      "reason": "Im unable to message non-mutual contacts, despite no rule violations. I believe this is an error, as Ive never engaged in spam or suspicious activity. Please restore my full messaging access.",
      "date": {
        "$date": "2025-04-22T17:14:51.051Z"
      }
    }
  ],
  "lazyCheckDate": {
    "$date": "2025-04-23T23:27:24.550Z"
  },
  "stopped": false,
  "username": "mozharova_negative",
  "phone": "+380970361344"
},
{
  "_id": {
    "$oid": "67eeba1e461801f5995d003f"
  },
  "accountId": "7998388439-prefix-female-million",
  "dc2": "bcffd2c7082d481dbb2616c65bbe2aeb16610e85797bf5e26432dd8b4f5ec3c9735080f24dfe4fbf004d972e8da0a2578fc64bafec33571aee91080dc69e56ecbb18b5bde01817c334dca0b5b5a48677965d45b5887500776b7b9dd74971ab83aa4691289de57a6cf6a2fbe156eb12999a498a29577a4221036d5e472cfda253a1252fc42d79d1e21443eca289bdf4bf03dccd4d717b3f5322c4efc86b0c3275e8cdf92a0fd889144645db8c9128d1d449469da0f46a0af60dbc8c4460505ab8be28c2a0082456b9a7d885ecc0b2b0f65e48c6f2ce77a4fea6be1239f2d267fef385077a91a6eb54041c6cd36b8c8b7b56ee7680b5f8824eed02cbb4ad25da57",
  "dcId": 2,
  "nextApiId": 611335,
  "dateUpdated": {
    "$date": "2025-04-24T10:17:59.367Z"
  },
  "twoFa": false,
  "twoFaDate": {
    "$date": "2025-04-21T21:47:58.601Z"
  },
  "personalChannelDate": {
    "$date": "2025-04-24T06:04:55.654Z"
  },
  "personalChannelError": "USER_RESTRICTED",
  "banned": false,
  "firstName": "Sofia",
  "id": "7998388439",
  "lastName": "Eroshkina",
  "messageCount": 0,
  "personalChannel": null,
  "automaticCheckDate": {
    "$date": "2025-04-24T10:17:59.367Z"
  },
  "historySpamBlocks": [
    {
      "spamBlockDate": "INFINITY",
      "spamBlockDays": 0
    }
  ],
  "spamBlockDate": "INFINITY",
  "spamBlockDays": 0,
  "spamBlockInitDate": {
    "$date": "2025-04-03T17:35:38.302Z"
  },
  "spamBlockReasons": [
    {
      "reason": "I need to regain full messaging access. Ive done nothing wrong, and my account should be reviewed. Please consider restoring my messaging functionality.",
      "date": {
        "$date": "2025-04-04T21:18:58.228Z"
      }
    },
    {
      "reason": "Ive been mistakenly limited in messaging non-mutual contacts. Please restore my full messaging function ASAP—I need to send urgent work-related messages. Thanks for understanding.",
      "date": {
        "$date": "2025-04-08T17:15:43.780Z"
      }
    },
    {
      "reason": "I cant message new contacts due to a possible mistake. I havent broken any rules and Id like to get my messaging back. Lets fix this issue quickly.",
      "date": {
        "$date": "2025-04-09T12:26:05.194Z"
      }
    },
    {
      "reason": "I recently lost the ability to message non-mutual contacts on Telegram. Having reviewed my recent activity, I am confident I havent violated any rules. Please restore my full messaging capabilities.",
      "date": {
        "$date": "2025-04-12T15:02:12.928Z"
      }
    },
    {
      "reason": "My account has been incorrectly limited. I want to clarify that I havent done anything wrong, and my ability to message all contacts needs to be restored ASAP.",
      "date": {
        "$date": "2025-04-14T10:52:37.980Z"
      }
    },
    {
      "reason": "I believe my account has been unfairly restricted. I havent violated any rules, and I need my full messaging functionality back. Please review my case and restore my messaging access.",
      "date": {
        "$date": "2025-04-16T06:40:30.717Z"
      }
    },
    {
      "reason": "Ive been an active, responsible user with no history of violations. Recently, my messaging ability has been inexplicably limited, preventing me from reaching some important contacts. Please restore full messaging access.",
      "date": {
        "$date": "2025-04-16T13:05:22.455Z"
      }
    },
    {
      "reason": "I cant message non-mutual contacts, which is urgent. Ive not done anything against the rules, so I think this is a mistake. Please review and restore my messaging soon.",
      "date": {
        "$date": "2025-04-17T19:58:40.632Z"
      }
    },
    {
      "reason": "I believe my accounts messaging capabilities were limited due to an error. Ive caused no disruption and have always followed community guidelines. Please restore my full access to messaging.",
      "date": {
        "$date": "2025-04-19T10:35:39.620Z"
      }
    },
    {
      "reason": "Id like to request my messaging feature back. This limitation was likely a mistake, as I havent broken any rules. Please review and restore my full access.",
      "date": {
        "$date": "2025-04-20T16:33:10.252Z"
      }
    },
    {
      "reason": "Ive been unable to send messages to non-mutual contacts, which is impacting my experience. Please review my account as I believe this restriction is an error—Ive followed all guidelines.",
      "date": {
        "$date": "2025-04-21T22:00:01.228Z"
      }
    },
    {
      "reason": "My accounts functionality has been limited due to what I believe is an error. Ive never violated any rules, so please restore my messaging feature. This is important and urgent.",
      "date": {
        "$date": "2025-04-22T16:53:31.278Z"
      }
    }
  ],
  "lazyCheckDate": {
    "$date": "2025-04-23T23:09:22.268Z"
  },
  "stopped": false,
  "username": "eroshkina_dusty",
  "phone": "+380978833725"
},
{
  "_id": {
    "$oid": "67eebaa1461801f5995d07a4"
  },
  "accountId": "7735335105-prefix-female-million",
  "dc2": "63c6de93b9c89a1613fb1b5551e9769fbe563e7727e1427cdaf00ce0c159d3df54087a64483bcb9d90ea20665a24a1742a32fb89e474fed54a75e8cf042c09274de13b26521cd4f18752c3bd57e6fd22c150f2a0933558218927fb225e08bec246eee80f016b674280f3487e70d8c3b86b9e7a32ae76247f2b6e0ada3a20ba9efd6ec91ff10eb491f192fcc20c476ca5c10a50590af7ae76be2579ae8edc5bbc41617dd62ef0e60ac0cc097c724848586a643cd1acd0d92577864db5a035a8da2edfcffcc8f81da9738aa01b94e6aba264158adf3ff458adc71c02bc931c79b47a9867315428eb7387fbab9b2b254704808122f118ebd1dad0dbe683b08c8b9e",
  "dcId": 2,
  "nextApiId": 611335,
  "dateUpdated": {
    "$date": "2025-04-24T10:09:02.972Z"
  },
  "twoFa": false,
  "twoFaDate": {
    "$date": "2025-04-21T21:47:43.760Z"
  },
  "personalChannelDate": {
    "$date": "2025-04-24T06:04:55.276Z"
  },
  "personalChannelError": "USER_RESTRICTED",
  "banned": false,
  "firstName": "Valeria",
  "id": "7735335105",
  "lastName": "Simonova",
  "messageCount": 0,
  "personalChannel": null,
  "automaticCheckDate": {
    "$date": "2025-04-24T10:09:02.972Z"
  },
  "spamBlockReasons": [
    {
      "reason": "I cant message anyone except mutuals, limiting my ability to communicate with new contacts. Im sure this was a mistake, as Ive never broken any rules. Please fix this issue so I can reach out to others freely.",
      "date": {
        "$date": "2025-04-03T17:28:57.919Z"
      }
    },
    {
      "reason": "My accounts message functionality needs to be fully restored. Ive been wrongly limited, so I cant connect with essential contacts outside my network. Ive done nothing wrong.",
      "date": {
        "$date": "2025-04-08T17:27:59.281Z"
      }
    },
    {
      "reason": "My account was incorrectly flagged, preventing me from messaging non-mutual contacts. I assure you, I didnt break any rules. Kindly review and restore my messaging permissions.",
      "date": {
        "$date": "2025-04-09T12:34:50.227Z"
      }
    },
    {
      "reason": "Id like my messaging function restored. I cant reach essential contacts due to an apparent error, as I havent violated any policies. I hope for a quick resolution.",
      "date": {
        "$date": "2025-04-14T10:40:27.286Z"
      }
    },
    {
      "reason": "I believe my messaging function was limited due to a mistake. I havent broken any rules, and theres been no suspicious activity on my part. Kindly review my case and restore my full messaging capabilities.",
      "date": {
        "$date": "2025-04-16T06:45:47.785Z"
      }
    },
    {
      "reason": "My Telegram account is limited, preventing me from reaching crucial contacts. Im confident this is a mistake as Ive followed all rules. Please restore my messaging function.",
      "date": {
        "$date": "2025-04-16T10:16:56.045Z"
      }
    },
    {
      "reason": "Ive recently encountered an issue with my accounts messaging functionality. Despite my belief that I havent violated any policies, I can only message mutual contacts. This limitation is preventing me from reaching important connections. Kindly review and resolve this matter promptly.",
      "date": {
        "$date": "2025-04-16T13:22:30.555Z"
      }
    },
    {
      "reason": "Id like to regain full messaging access on my Telegram account. I believe my limited access is a mistake as Ive followed all guidelines. Kindly review and restore my messaging rights.",
      "date": {
        "$date": "2025-04-17T20:06:16.622Z"
      }
    },
    {
      "reason": "My recent inability to message anyone except mutual contacts has severely limited my communication. This seems unfair, as I havent done anything wrong or suspicious to warrant this change. Please restore my full messaging capabilities.",
      "date": {
        "$date": "2025-04-20T12:37:50.634Z"
      }
    },
    {
      "reason": "Im unable to message anyone except mutual contacts on Telegram, despite not violating any rules. Id appreciate having this issue fixed, as its preventing me from using the app fully.",
      "date": {
        "$date": "2025-04-20T16:33:48.038Z"
      }
    },
    {
      "reason": "I want to chat freely on Telegram again, as Ive done nothing wrong. I hope we can fix this soon. My account is ready to be fully active.",
      "date": {
        "$date": "2025-04-21T22:19:06.125Z"
      }
    },
    {
      "reason": "Im unable to send messages to non-mutual contacts due to a possible system error. I havent violated any rules, so please restore my messaging function ASAP for work purposes. Thanks for your help.",
      "date": {
        "$date": "2025-04-22T16:59:48.128Z"
      }
    }
  ],
  "historySpamBlocks": [
    {
      "spamBlockDate": "INFINITY",
      "spamBlockDays": 0
    }
  ],
  "spamBlockDate": "INFINITY",
  "spamBlockDays": 0,
  "spamBlockInitDate": {
    "$date": "2025-04-03T17:28:57.923Z"
  },
  "lazyCheckDate": {
    "$date": "2025-04-23T23:00:30.671Z"
  },
  "stopped": false,
  "username": "simonova_mixed",
  "phone": "+380991915658"
},
{
  "_id": {
    "$oid": "67eebbcb461801f5995d236f"
  },
  "accountId": "1717567217",
  "dc4": "bc7ff10132ee60df760ad5f70151cbf9748b68335e358beaa5dcc6506f59c0b41e7a9374e07cb52e747dbfbfe8da3e553569773a5f3e712307486b29a2ee6c28b2ee8f5e21546446cfa9611df79c97057dc188e9cc3a982ff3efb74d582c90cb78a23ae1d4531ea258ae596b2205027c7d6541f2205c8808c22b1f68dfedc04e9a3f0bb386bb02b3f78175d153ce858d372c9c897a27dc3e9f4d4bfb64e093bf51a11d308d324bbb288a6386c12715f75af86f4f665af672d18fd9e26047065d756f36be41b3d08e6d1ae89a186b236ae51fea2ac186c9970d87f9839658fb91fccdd4748125adaad49822fe08ddb5dfd793e0853d4f0721da4df718a825af2f",
  "dcId": 4,
  "nextApiId": 2040,
  "dateUpdated": {
    "$date": "2025-04-24T10:09:12.012Z"
  },
  "twoFa": false,
  "twoFaDate": {
    "$date": "2025-04-21T21:47:42.009Z"
  },
  "banned": false,
  "firstName": "Victor",
  "id": "1717567217",
  "lastName": "Alekseev",
  "messageCount": 33,
  "personalChannel": null,
  "username": "alekseev_national",
  "automaticCheckDate": {
    "$date": "2025-04-24T10:09:12.012Z"
  },
  "lazyCheckDate": {
    "$date": "2025-04-23T23:02:36.760Z"
  },
  "remainingTime": {
    "$date": "2025-04-24T10:20:42.529Z"
  },
  "stopped": false,
  "historySpamBlocks": [
    {
      "spamBlockDate": {
        "$date": "2025-04-23T18:39:00.000Z"
      },
      "spamBlockDays": 1
    }
  ],
  "phone": "+381603380036"
},
{
  "_id": {
    "$oid": "67eebbce461801f5995d242e"
  },
  "accountId": "7755065690",
  "dc2": "3b05e3914cb396b96ad3c9e8c0b3ad06bc36e736de7c37b50ab99fa2c49649b2461fb0b46246b4c7db828f22a24018672edeee2c2a03c8ff87bf70e6c76d0a228b483586aedc0834762101e0e46b16343554d33d4cf3affe17c4428da61fb75cda579e7fd6585bfafb3367b00afc4a9aeb5cf3ab360407e0b572e33d0e1f949d1138b1d1bec624b6c9d43025945136460185a543e5a3a8310241f0569398e03a7fe6294925cf7175cf5c4529791d668cdb65f322bcfe4a320b4df57a62df2b2765333c9d8ab9d1820abd8d34b12ba6d74aea353018483e8b63b8f89f75d4cec6b620c4dcd2dd886e246a712bdf4482426135e74f555e7fa1da27ee47ef0310b0",
  "dcId": 2,
  "nextApiId": 611335,
  "dateUpdated": {
    "$date": "2025-04-24T10:19:43.709Z"
  },
  "twoFa": false,
  "twoFaDate": {
    "$date": "2025-04-21T21:47:50.190Z"
  },
  "banned": false,
  "firstName": "Egor",
  "id": "7755065690",
  "lastName": "Potapov",
  "messageCount": 0,
  "personalChannel": null,
  "username": "potapov_unpleasant",
  "automaticCheckDate": {
    "$date": "2025-04-24T10:19:43.709Z"
  },
  "spamBlockReasons": [
    {
      "reason": "Im unable to message non-mutual contacts, limiting my communication. This seems like an error, as I havent broken any rules. Kindly review and restore my messaging access.",
      "date": {
        "$date": "2025-04-03T18:07:06.734Z"
      }
    },
    {
      "reason": "I recently experienced an issue with message delivery. Im certain my account has been restricted mistakenly, as Ive never violated any rules. Please review and restore full access.",
      "date": {
        "$date": "2025-04-04T19:17:43.314Z"
      }
    },
    {
      "reason": "My account has been wrongly limited. Ive done nothing to violate any rules, so please restore my messaging functions. Lets fix this quickly.",
      "date": {
        "$date": "2025-04-06T16:37:02.605Z"
      }
    },
    {
      "reason": "I want to clarify that my recent messaging restrictions were likely a mistake. Ive never been involved in any malicious or questionable behavior. Please restore my full messaging capabilities.",
      "date": {
        "$date": "2025-04-08T17:37:38.049Z"
      }
    },
    {
      "reason": "Ive noticed a strange issue with my accounts messaging feature. Im not sure why Im limited to contacting mutual friends, especially since Ive never done anything against the rules. Please fix this as soon as possible; I need to reach someone outside my contacts list for work reasons.",
      "date": {
        "$date": "2025-04-09T07:57:58.893Z"
      }
    },
    {
      "reason": "I recently experienced an issue with my Telegram accounts messaging function. It seems like an error since I didnt break any rules. Please restore my full access to ensure I can complete urgent work tasks.",
      "date": {
        "$date": "2025-04-09T12:38:23.833Z"
      }
    },
    {
      "reason": "I believe my accounts message-sending function was restricted due to a mistake. Ive not violated any rules and want to clarify the issue. Please restore my full messaging access.",
      "date": {
        "$date": "2025-04-12T15:04:13.290Z"
      }
    },
    {
      "reason": "My account has been mistakenly limited, preventing me from messaging new contacts. I havent violated any rules, and I ask for this issue to be resolved soon. Thanks for your help.",
      "date": {
        "$date": "2025-04-14T11:03:23.719Z"
      }
    },
    {
      "reason": "Ive been blocked from messaging non-mutual contacts despite not violating any rules. My actions have been harmless, so I kindly request my full messaging access back. Thanks for understanding.",
      "date": {
        "$date": "2025-04-14T18:22:10.468Z"
      }
    },
    {
      "reason": "I need to communicate with non-mutual contacts for important discussions. I believe the current message-sending restriction is an error, as Ive not violated any rules. Please review my account status.",
      "date": {
        "$date": "2025-04-16T06:58:42.357Z"
      }
    },
    {
      "reason": "Im facing an issue with message sending on Telegram. I can only contact mutual connections, but I need to reach others. Please restore full access.",
      "date": {
        "$date": "2025-04-16T10:26:19.661Z"
      }
    },
    {
      "reason": "I recently encountered a messaging issue, preventing me from reaching some of my contacts. This seems like an error as I havent broken any rules. Please restore my full messaging capabilities.",
      "date": {
        "$date": "2025-04-16T13:16:52.831Z"
      }
    },
    {
      "reason": "I cant message new contacts due to an apparent mistake. Ive been locked out for no reason — Ive never spammed or broken any rules. Please restore my messaging function.",
      "date": {
        "$date": "2025-04-17T19:56:26.053Z"
      }
    },
    {
      "reason": "Im experiencing an issue with my account. I need to send important work messages to non-mutual contacts, but cant due to a sudden restriction. Please look into this as soon as possible.",
      "date": {
        "$date": "2025-04-19T10:43:30.502Z"
      }
    },
    {
      "reason": "I recently noticed an issue with my messaging capabilities. Despite being an active user, Im now unable to message some contacts, which is impacting my experience. Please resolve this error.",
      "date": {
        "$date": "2025-04-20T12:33:20.288Z"
      }
    },
    {
      "reason": "I recently noticed a change in my messaging capabilities, allowing me to message only mutual contacts. I believe this is an error, as Ive not engaged in any questionable activity. Please restore my full messaging access.",
      "date": {
        "$date": "2025-04-20T16:18:05.422Z"
      }
    },
    {
      "reason": "I need to message non-mutual contacts for urgent work. My account isnt blocked, so I think this restriction was a mistake. Kindly review and restore my messaging rights.",
      "date": {
        "$date": "2025-04-21T12:10:13.425Z"
      }
    },
    {
      "reason": "Ive been unfairly restricted from reaching out to new contacts via messaging. I havent broken any rules and would like to regain full messaging access. Please review my case and restore my messaging function.",
      "date": {
        "$date": "2025-04-21T21:55:15.803Z"
      }
    },
    {
      "reason": "I want to regain full messaging access on my account. I havent done anything wrong, and this limitation is hindering my communication. Please review and restore my messaging rights.",
      "date": {
        "$date": "2025-04-22T15:46:03.190Z"
      }
    },
    {
      "reason": "My accounts messaging function has been unexpectedly limited. I need to reach non-mutual contacts immediately for work reasons. Id appreciate a review, as this must be an error.",
      "date": {
        "$date": "2025-04-22T16:58:45.985Z"
      }
    },
    {
      "reason": "Im unable to message new contacts due to an apparent error. Please review my account and restore full messaging capabilities, as I havent violated any policies. Thanks.",
      "date": {
        "$date": "2025-04-22T18:14:32.507Z"
      }
    }
  ],
  "historySpamBlocks": [
    {
      "spamBlockDate": "INFINITY",
      "spamBlockDays": 0
    }
  ],
  "spamBlockDate": "INFINITY",
  "spamBlockDays": 0,
  "spamBlockInitDate": {
    "$date": "2025-04-03T18:07:06.741Z"
  },
  "lazyCheckDate": {
    "$date": "2025-04-23T22:44:35.197Z"
  },
  "stopped": false,
  "phone": "+79538030316"
},
{
  "_id": {
    "$oid": "67eebbce461801f5995d2450"
  },
  "accountId": "6628822591",
  "dc2": "a0ca377dc5b4094775f71a7bf2d54ce342acfaf00219e720684aac37edc58006f4ef24ed6d5afc0113e6e3610faa7b031a351869773416a8d825bb9a6fabb820e5dc6acd42883ed321fbbea05003bf5545df23e9e922ff200f2b11ec14246a9478c1f00a9d3005b9279b917be1e92657adc7c2c679c07c55d101f1d791b32f0bb227e0ee2411206b658677f65ae4d8bf43a059a197b77e0cdfad86f9ff6113998178fa27026211ffda4fad328cb810caa7dcbc265693ca377c809f44d73da1be7849562e19bffa8de5f048e47e2c9e919ba19ec72e0ad0348a8343446f9368f46bcac2df7dc57c30c033dd8a71d78c6a56c66a1d71efb53dc3df1dc1f58fbc4d",
  "dcId": 2,
  "nextApiId": 2496,
  "dateUpdated": {
    "$date": "2025-04-24T09:59:55.537Z"
  },
  "twoFa": false,
  "twoFaDate": {
    "$date": "2025-04-21T21:47:52.260Z"
  },
  "banned": false,
  "firstName": "Grigory",
  "id": "6628822591",
  "lastName": "Markov",
  "messageCount": 0,
  "personalChannel": null,
  "username": "markov_coloured",
  "automaticCheckDate": {
    "$date": "2025-04-24T09:59:55.537Z"
  },
  "spamBlockReasons": [
    {
      "reason": "I need to regain full messaging functionality on my account. My messaging rights were likely revoked in error, as Ive been a responsible user with no malicious activity. Please review and restore my access.",
      "date": {
        "$date": "2025-04-03T18:10:54.977Z"
      }
    },
    {
      "reason": "I believe my accounts messaging function has been unfairly limited. I havent broken any rules and require full access to contact essential people. Kindly restore my ability to message everyone.",
      "date": {
        "$date": "2025-04-08T17:25:01.773Z"
      }
    },
    {
      "reason": "I recently lost access to sending messages on Telegram, even though I havent violated any rules. I kindly request that this function be restored, as the issue was likely an error. Thanks for your attention.",
      "date": {
        "$date": "2025-04-09T12:24:43.684Z"
      }
    },
    {
      "reason": "I recently lost the ability to send messages to non-mutual contacts, which affects my work. I believe this is an error, as Ive never violated any rules. Please restore my full messaging access ASAP.",
      "date": {
        "$date": "2025-04-14T10:43:20.931Z"
      }
    },
    {
      "reason": "Im unable to message new contacts due to a recent restriction, which I believe is a mistake. Ive not violated any rules, so Id appreciate getting this fixed. Please review my case.",
      "date": {
        "$date": "2025-04-16T06:54:37.440Z"
      }
    },
    {
      "reason": "I believe my accounts messaging function was limited due to an error. I havent done anything wrong, and I need to contact non-mutual connections for work. Kindly restore my access.",
      "date": {
        "$date": "2025-04-16T10:14:31.505Z"
      }
    },
    {
      "reason": "Im unable to send messages to non-mutual contacts, limiting my communication. This restriction seems unfair as Ive followed all guidelines and caused no issues. Please review and restore full messaging access.",
      "date": {
        "$date": "2025-04-16T13:20:37.534Z"
      }
    },
    {
      "reason": "Ive been incorrectly blocked from messaging non-mutual contacts. I havent broken any rules and never spammed. Please review and restore my full messaging functionality.",
      "date": {
        "$date": "2025-04-17T20:07:07.459Z"
      }
    },
    {
      "reason": "My account has been mistakenly limited, and I can no longer message important contacts. I havent done anything wrong and would like to regain full access. Please review this error.",
      "date": {
        "$date": "2025-04-19T10:41:17.249Z"
      }
    },
    {
      "reason": "My account is incorrectly limited in messaging functionality, affecting essential communication. Ive not been involved in any inappropriate behavior and ask for full access to be restored. Thanks for your prompt attention.",
      "date": {
        "$date": "2025-04-20T12:44:16.033Z"
      }
    },
    {
      "reason": "I believe my messaging function was limited due to a mistake. I havent violated any rules and have no recent suspicious activity. Please restore my full messaging access.",
      "date": {
        "$date": "2025-04-20T16:35:24.272Z"
      }
    },
    {
      "reason": "I believe my messaging function was limited by mistake. I havent broken any rules, and theres been no spamming or other misconduct on my part. Kindly review and restore my full messaging capabilities.",
      "date": {
        "$date": "2025-04-21T22:43:06.807Z"
      }
    }
  ],
  "historySpamBlocks": [
    {
      "spamBlockDate": "INFINITY",
      "spamBlockDays": 0
    }
  ],
  "spamBlockDate": "INFINITY",
  "spamBlockDays": 0,
  "spamBlockInitDate": {
    "$date": "2025-04-03T18:10:54.983Z"
  },
  "lazyCheckDate": {
    "$date": "2025-04-23T22:45:34.828Z"
  },
  "stopped": false,
  "phone": "+380980030818"
},
{
  "_id": {
    "$oid": "67eebbd0461801f5995d24ad"
  },
  "accountId": "6239700861",
  "dc4": "39af8a421401620c7b5ab946abfea1162431fc12b765b94ba6e9c54482f51dc70ac0a37194ed8e50f1fd2ba4e5388e63254876a4a2e03f993c304ea185253327e88f021391c7face9cc47efce6b0754d34def3502d81af82e992675268bd5954aa9844170ec7568caa8387577698b25d86d75590a23b05cfc9c846e89264511757ccedd16eaa263a899e51aef24a651e753a56eea3b7e90c796fbd9f682dacb8c40c343df7b6838a50f59bf3ae5bb2bcd83c4226486191c8a47f7c0cb3c04fe88f960f5e63fb208698ebe2364f0dbbf912058e6b6350789590916b355236bbf61bc9d83d4abad5a17d9484cf212713065f814a1d0235dbbe78a7efe7c6e8b0ac",
  "dcId": 4,
  "nextApiId": 2040,
  "dateUpdated": {
    "$date": "2025-04-24T10:08:55.269Z"
  },
  "twoFa": false,
  "twoFaDate": {
    "$date": "2025-04-21T21:47:52.247Z"
  },
  "banned": false,
  "firstName": "Ivan",
  "id": "6239700861",
  "lastName": "Kazmin",
  "messageCount": 0,
  "personalChannel": null,
  "username": "kazmin_wandering",
  "automaticCheckDate": {
    "$date": "2025-04-24T10:08:55.269Z"
  },
  "spamBlockReasons": [
    {
      "reason": "I need to restore full messaging functionality on my account. Im sure theres been a mistake, as I havent broken any rules or sent spam. Please review my case.",
      "date": {
        "$date": "2025-04-03T17:27:02.464Z"
      }
    },
    {
      "reason": "Id like to get my messaging function back ASAP. Its essential for my job. I dont think I did anything wrong—this must be a mistake.",
      "date": {
        "$date": "2025-04-08T17:39:54.084Z"
      }
    },
    {
      "reason": "Ive been blocked from messaging all my contacts, despite not breaking any rules. I need access to my full contact list ASAP, as I have urgent messages to deliver. Kindly review my account activity and restore my messaging function.",
      "date": {
        "$date": "2025-04-14T10:48:41.567Z"
      }
    },
    {
      "reason": "Im unable to message new contacts, even though my account is active. This error needs fixing ASAP as I need to reach colleagues. I did nothing wrong and want my messaging back.",
      "date": {
        "$date": "2025-04-14T12:31:45.029Z"
      }
    },
    {
      "reason": "My recent inability to message non-mutual contacts is an error. Ive never been involved in any questionable activity. Please restore my messaging functionality ASAP.",
      "date": {
        "$date": "2025-04-16T07:04:55.471Z"
      }
    },
    {
      "reason": "I believe my accounts message functionality was mistakenly limited, as Ive never violated any rules. Kindly restore my access so I can promptly send important work-related messages.",
      "date": {
        "$date": "2025-04-16T10:16:18.690Z"
      }
    },
    {
      "reason": "I recently discovered that I cant message certain contacts, which is odd since Ive never broken any rules. I believe this is a mistake, as Ive been an active, responsible user. Please restore my full messaging access.",
      "date": {
        "$date": "2025-04-16T13:22:09.734Z"
      }
    },
    {
      "reason": "I recently experienced an issue with my Telegram account, preventing me from sending messages to non-mutual contacts. This error likely occurred by mistake, as Ive followed all community guidelines. Id appreciate your assistance in resolving this.",
      "date": {
        "$date": "2025-04-17T20:14:21.226Z"
      }
    },
    {
      "reason": "I recently lost the ability to message non-mutual contacts, which is causing issues as I need to reach important connections. I believe this restriction is a mistake, as Ive not violated any rules. Please review and restore my full messaging functionality.",
      "date": {
        "$date": "2025-04-19T10:28:57.305Z"
      }
    },
    {
      "reason": "I believe my accounts messaging feature was disabled mistakenly. I havent done anything wrong and need it back ASAP for work. Please review and restore my full access.",
      "date": {
        "$date": "2025-04-20T12:39:49.920Z"
      }
    },
    {
      "reason": "Ive lost access to messaging. This wasnt caused by anything shady I did — a glitch maybe? I need to get back to messaging soon to contact my coworkers.",
      "date": {
        "$date": "2025-04-20T16:37:42.090Z"
      }
    },
    {
      "reason": "I need to send important work messages to non-mutual contacts immediately. I havent done anything wrong and believe this restriction is a mistake, so I kindly request it be lifted. Please consider my circumstances and act swiftly.",
      "date": {
        "$date": "2025-04-21T22:07:25.345Z"
      }
    },
    {
      "reason": "Id like my messaging function back. I cant do my job without it. Theres been a mistake; I havent done anything wrong.",
      "date": {
        "$date": "2025-04-22T17:16:32.274Z"
      }
    }
  ],
  "historySpamBlocks": [
    {
      "spamBlockDate": "INFINITY",
      "spamBlockDays": 0
    }
  ],
  "spamBlockDate": "INFINITY",
  "spamBlockDays": 0,
  "spamBlockInitDate": {
    "$date": "2025-04-03T17:27:02.470Z"
  },
  "lazyCheckDate": {
    "$date": "2025-04-23T22:28:58.456Z"
  },
  "stopped": false,
  "phone": "+23057338083"
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
        accountId: `${id}-prefix-ukraine-documents`,
        dcId,
        nextApiId,
      };

      data[`dc${account.dcId}`] = account[`dc${account.dcId}`];

      console.log(id, data);
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
