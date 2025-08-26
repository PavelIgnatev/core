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
    "$oid": "680a1478461801f599984674"
  },
  "accountId": "1318642590-prefix-ukraine-documents",
  "dc2": "80acf657d1d2c7d7ca9ee8bc4a494776a4aeaa60dde736894400ff78d4003967a12ff4dd2785b3bcb1440def75480efbd7902321195daab7c86c1e3ebe37a50f13d544844be30b0816d78549f85f2026192d8e347e263ef51b2a15fb24a4f75d22b0a90d0379a003be2a7d1b78eab99f2a31e568eca1b3d4d7c9023787962375feac837523dca9b7edb3311b6ba32f42a496ef6cdb524d3c8553378e51ff8769fa02208571c7ed00c5cf686b0b9c690c52b5c2284ceaff96feafe2caf868e18984ca0e026ab4323c51abf2714f378686b61bee9527fd5552cb2a865535f270dbf11339ddbe0750a179f9a7262d836b92dd7cb07dec6d1ba1536a1618c9838912",
  "dcId": 2,
  "nextApiId": 2040,
  "dateUpdated": {
    "$date": "2025-08-26T07:48:52.309Z"
  },
  "twoFa": false,
  "twoFaDate": {
    "$date": "2025-08-23T10:13:33.607Z"
  },
  "phone": "+380932243753",
  "banned": false,
  "firstName": "Egor",
  "id": "1318642590",
  "lastName": null,
  "messageCount": 24,
  "username": "documents_in_Ukraine_17",
  "personalChannelDate": {
    "$date": "2025-08-26T03:24:24.960Z"
  },
  "personalChannelError": "CHANNEL_NOT_FOUND",
  "lazyCheckDate": {
    "$date": "2025-08-25T16:57:01.445Z"
  },
  "automaticCheckDate": {
    "$date": "2025-08-26T07:48:52.309Z"
  },
  "remainingTime": {
    "$date": "2025-06-19T01:19:11.673Z"
  },
  "historySpamBlocks": [
    {
      "spamBlockDate": {
        "$date": "2025-04-30T07:26:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-05-04T09:52:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-05-08T11:14:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-05-19T20:47:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-05-23T00:40:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-06-25T23:23:00.000Z"
      },
      "spamBlockDays": 7
    }
  ]
},
{
  "_id": {
    "$oid": "680a1478461801f599984676"
  },
  "accountId": "6107552868-prefix-ukraine-documents",
  "dc2": "b4c2cb52f6d3ecab10078659d378905bf4435e909b7afae7d667df10755ca30efc99c1f16780208ec67de25d5cccf1bb23328e01342214df8b42706e8f7cc3bbaed02cf048edcc9b3df83022a044e0e8aec2ff9b76a4d77d18811841dc2b2236f0b188c24d7914c97a2366eb236bdc83941a0e2e630c7228dafdeb33763c60a52d257d4a365ac6a94f59bf9a501e24730b3e7b0c58c5acb8741a450fd59240b3b4a661c3fe486ec949eb5cdfaf0eefc8ecee02b7917fd0177017d41bddeb5a45aa73e3b81d270ce81bda1715dfa4080db3ca2ac3d6d0d187923ae86d11d19b0db1c4e5f3faf832aecab0c3dd49f28f069e8277c078bc7f6d2077e26b1aa1d4aa",
  "dcId": 2,
  "nextApiId": 2040,
  "dateUpdated": {
    "$date": "2025-08-26T08:16:19.033Z"
  },
  "twoFa": false,
  "twoFaDate": {
    "$date": "2025-08-23T10:13:28.428Z"
  },
  "phone": "+380673951828",
  "banned": false,
  "firstName": "Ilya",
  "id": "6107552868",
  "lastName": null,
  "messageCount": 32,
  "username": "documents_in_Ukraine_8097",
  "personalChannelDate": {
    "$date": "2025-08-26T03:22:41.812Z"
  },
  "personalChannelError": "CHANNEL_NOT_FOUND",
  "lazyCheckDate": {
    "$date": "2025-08-25T18:02:20.430Z"
  },
  "automaticCheckDate": {
    "$date": "2025-08-26T08:16:19.033Z"
  },
  "remainingTime": {
    "$date": "2025-06-19T01:46:00.725Z"
  },
  "historySpamBlocks": [
    {
      "spamBlockDate": {
        "$date": "2025-04-27T09:50:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-04-30T07:18:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-06-20T06:28:00.000Z"
      },
      "spamBlockDays": 1
    }
  ]
},
{
  "_id": {
    "$oid": "680a1478461801f59998467f"
  },
  "accountId": "1614395302-prefix-ukraine-documents",
  "dc2": "137cad94193da9ef2fe7738a5345609de8f50d7ef47ae13e4822c9a296c05da75937dfcd0d82561628022cbc2847d3a8e34f47e933231e123a2a7caf2d9175f251d2d52e678b9d3e7d256bf24e0db5358d417a116bc6032cd7e67436c49e0343a4e408ddf6bc63b5ac3b1aa3e5edac195f6185659542c36f301990aad335ddf9a2c7f72fe7e5ea24406261d614f97748cb21b5b94bdf0f0ba6947d89ff7febb5ad251e1a5c2a929d93581d7cc6e9a97c2c6dccf63aa10409187ad631074bdc7f78ca44eae04da7a4c20024ac4559202994986d022918dec9b3fe62a98b1e27a002c003fb3baa48dd7a2acdb45b30ba27d575932fa1b85c48b487533124bacc95",
  "dcId": 2,
  "nextApiId": 2040,
  "dateUpdated": {
    "$date": "2025-08-26T08:19:13.897Z"
  },
  "twoFa": false,
  "twoFaDate": {
    "$date": "2025-08-23T10:13:33.443Z"
  },
  "phone": "+380986021851",
  "banned": false,
  "firstName": "Sergey",
  "id": "1614395302",
  "lastName": null,
  "messageCount": 38,
  "username": "documents_in_Ukraine_9963",
  "personalChannelDate": {
    "$date": "2025-08-26T03:24:29.321Z"
  },
  "personalChannelError": "CHANNEL_NOT_FOUND",
  "lazyCheckDate": {
    "$date": "2025-08-26T02:13:13.883Z"
  },
  "automaticCheckDate": {
    "$date": "2025-08-26T08:19:13.897Z"
  },
  "remainingTime": {
    "$date": "2025-06-19T16:26:10.654Z"
  },
  "historySpamBlocks": [
    {
      "spamBlockDate": {
        "$date": "2025-04-27T08:21:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-04-30T12:54:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-05-04T06:41:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-05-14T18:39:00.000Z"
      },
      "spamBlockDays": 7
    },
    {
      "spamBlockDate": {
        "$date": "2025-06-19T17:34:00.000Z"
      },
      "spamBlockDays": 30
    },
    {
      "spamBlockDate": {
        "$date": "2025-06-20T14:26:00.000Z"
      },
      "spamBlockDays": 1
    }
  ]
},
{
  "_id": {
    "$oid": "680a1478461801f599984685"
  },
  "accountId": "7507895166-prefix-ukraine-documents",
  "dc2": "c711a0d5ea8c794eda28746954e218d6a11f48eaa9aabec0fe87d32b078e18d73b60e5a6e03bf1f473ea3a543266db7663c82fa3c6dc5a2328342ee9736a2f6fa91c70a24f170d2a039d511285bdc247a9387999b409bf553e8c266169f88287ada95f16f1156439a80ccddad5a4f74aa69caf162de31906ff3651bddf0ed4c06cbda2ab8a1b704f4a6a8885a00a3a3ede96d83a27a20170583775c51008810272e53e401787aa3957e636241964c389508880aae03b297ed0d43272060405d51c80c405ebf249affbe97b72f30231119b0d8243ed6424adb02559b402eae81a0bab34744a281a68101a5991dd5c0e557d8fa6165320ad98c80158ffbdbfa56f",
  "dcId": 2,
  "nextApiId": 2496,
  "dateUpdated": {
    "$date": "2025-08-26T07:48:55.954Z"
  },
  "twoFa": false,
  "twoFaDate": {
    "$date": "2025-05-30T17:06:15.063Z"
  },
  "phone": "+380982337604",
  "banned": false,
  "firstName": "Dmitry",
  "id": "7507895166",
  "lastName": null,
  "messageCount": 37,
  "username": "documents_in_Ukraine_7587",
  "personalChannelDate": {
    "$date": "2025-08-26T03:24:38.219Z"
  },
  "personalChannelError": "CHANNEL_NOT_FOUND",
  "lazyCheckDate": {
    "$date": "2025-08-25T16:18:28.992Z"
  },
  "automaticCheckDate": {
    "$date": "2025-08-26T07:48:55.953Z"
  },
  "historySpamBlocks": [
    {
      "spamBlockDate": "INFINITY",
      "spamBlockDays": 0
    }
  ],
  "remainingTime": {
    "$date": "2025-06-19T15:19:49.556Z"
  }
},
{
  "_id": {
    "$oid": "680a1478461801f59998468b"
  },
  "accountId": "7496220827-prefix-ukraine-documents",
  "dc2": "5644d6fca39c6a755dacdb30dab3e905fd7a144859330824cd1c04a320696c39c9735bf2be78a640dda4ee078961951211374a41279e83a72065641730bfc7def3b073de46022fe5c484627a7499963b1d2f5e9f229a5d2b1736fbf3830f88c62a4d66d0f2c131b7709423f9c6575519dff8ffcdba7b6e5d947fe6347023f9db6ba8929cc2e8640d5f8c28dbe953002fb96958591490dcf936cbfdd87dc2d40849996fa5afa7c9acbbe4a3a7e56ed30ab0de71d61c1fe47e1c8c57d07d09a909067d5c441350241bde0b666ec8ebc57183c200fbaf1ec8d859c263d55b4f9136d47d4d8cf02a6bf911c83e93516de8f3755b7062050a3b67c0321afc284aa91e",
  "dcId": 2,
  "nextApiId": 2040,
  "dateUpdated": {
    "$date": "2025-08-26T08:08:13.074Z"
  },
  "twoFa": false,
  "twoFaDate": {
    "$date": "2025-08-23T10:13:30.048Z"
  },
  "phone": "+380966948780",
  "banned": false,
  "firstName": "Valeriy",
  "id": "7496220827",
  "lastName": null,
  "messageCount": 19,
  "username": "documents_in_Ukraine_6417",
  "personalChannelDate": {
    "$date": "2025-08-26T03:24:31.068Z"
  },
  "personalChannelError": "CHANNEL_NOT_FOUND",
  "lazyCheckDate": {
    "$date": "2025-08-25T23:33:11.667Z"
  },
  "automaticCheckDate": {
    "$date": "2025-08-26T08:08:13.074Z"
  },
  "historySpamBlocks": [
    {
      "spamBlockDate": {
        "$date": "2025-04-24T18:33:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-04-29T09:12:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-04-30T13:31:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-05-04T08:17:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-05-15T05:48:00.000Z"
      },
      "spamBlockDays": 7
    },
    {
      "spamBlockDate": {
        "$date": "2025-05-19T13:32:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-05-20T13:59:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-06-21T19:14:00.000Z"
      },
      "spamBlockDays": 3
    }
  ],
  "remainingTime": {
    "$date": "2025-06-18T21:13:59.753Z"
  }
},
{
  "_id": {
    "$oid": "680a1479461801f59998468f"
  },
  "accountId": "7166781386-prefix-ukraine-documents",
  "dc2": "28684abf2914ad5c6341711042e33d3fdfa426eab9adfaa2c37e75fe3945f284e75b8c949abf43e92326a62d9247c2e423ea6fe34017e4b6ffc2f836833b11e9d1a9837739c86281e3daa77935ab8cdbaf395cd723b2432c6e49b4cdc3d5096fbb7d22e1668e1e655670f5ada42622233e89d7f7e2054b94cc2e0e3dd2a449c5818f8f03a8e2cbe0ae01d8b0df0605b8988a5d963764cfe8f19db6ae081ae04b0d157bc5099af1decd36561f81d641fe4ed2c206050c8c6fc6596cdd73c8387b0c084490709dd95989212a40ab15852de576cf23706b1e9a0540514b2b4459d196f6362d4176e4be9e0d43b966d359a32e01104b837f2dec6d932636454143e1",
  "dcId": 2,
  "nextApiId": 2496,
  "dateUpdated": {
    "$date": "2025-08-26T08:12:13.180Z"
  },
  "twoFa": false,
  "twoFaDate": {
    "$date": "2025-08-23T10:13:36.457Z"
  },
  "phone": "+380983693823",
  "banned": false,
  "firstName": "Nikolay",
  "id": "7166781386",
  "lastName": null,
  "messageCount": 25,
  "username": "documents_in_Ukraine_4718",
  "personalChannelDate": {
    "$date": "2025-08-26T03:24:34.078Z"
  },
  "personalChannelError": "CHANNEL_NOT_FOUND",
  "lazyCheckDate": {
    "$date": "2025-08-26T01:40:28.588Z"
  },
  "automaticCheckDate": {
    "$date": "2025-08-26T08:12:13.180Z"
  },
  "historySpamBlocks": [
    {
      "spamBlockDate": {
        "$date": "2025-04-27T05:55:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-05-06T06:22:00.000Z"
      },
      "spamBlockDays": 7
    },
    {
      "spamBlockDate": {
        "$date": "2025-06-06T13:50:00.000Z"
      },
      "spamBlockDays": 30
    },
    {
      "spamBlockDate": {
        "$date": "2025-05-20T09:24:00.000Z"
      },
      "spamBlockDays": 1
    }
  ],
  "remainingTime": {
    "$date": "2025-06-19T16:05:00.137Z"
  }
},
{
  "_id": {
    "$oid": "680a1479461801f5999846a3"
  },
  "accountId": "7270077297-prefix-ukraine-documents",
  "dc2": "724e83bf993f1536292693ec9c99e87a8b233de75e0f398fc43f205fc1317a5b585ca7b27dd77337174c3c7e849d3df2dc5e2ef0e5e12e7ac971ac77d78373cd64414b5df79e2fe8ea4ac566072ea307279644546a754d9f2f9943a3f06030797de6f0b1c1226e50b7e7bc8decaf047b80405e2990acc6edf7f9fc796fd967d9dec3193df282cb9959bb128afd0b3648fd95d8ee0482cb3a5efcd97fb54ed41fd682f9df9f3d2c7f22d8b66371f3894d84678424ec1edafecd9356c4cf4eb3210f8b3d0b2d93797878f4eb2b2a76715f5888189ad59e5258bd3b7ba7d4edf9a3eec49aba51ba80568a4957534b372d9e59fe7fdcfb9cb4f2f0f97b3d44ce2e55",
  "dcId": 2,
  "nextApiId": 2496,
  "dateUpdated": {
    "$date": "2025-08-26T08:13:26.847Z"
  },
  "phone": "+380997197374",
  "banned": false,
  "firstName": "Viktor",
  "id": "7270077297",
  "lastName": null,
  "messageCount": 47,
  "username": "documents_in_Ukraine_3612",
  "personalChannelDate": {
    "$date": "2025-08-26T03:24:36.659Z"
  },
  "personalChannelError": "CHANNEL_NOT_FOUND",
  "lazyCheckDate": {
    "$date": "2025-08-25T17:09:15.869Z"
  },
  "automaticCheckDate": {
    "$date": "2025-08-26T08:13:26.847Z"
  },
  "remainingTime": {
    "$date": "2025-06-19T16:29:22.671Z"
  }
},
{
  "_id": {
    "$oid": "680a1479461801f5999846b0"
  },
  "accountId": "7992561572-prefix-ukraine-documents",
  "dc2": "4e35e92c61e99d58fcac9cbdc7ea5fc160d4cb922f6d0be163ea3b55bbefa0b440f749e6248ec0e41df483e823863843358f3984289740daccc474429eb6f1936d07ed1616469f983340e77ff7f016e61daa0b7a498d4962b55306a30b6ee4a51ea4a479d36538fdd3e7e59922c65b48765c0a7343c43028a9edf1a8f3ecbe79888aa61d1ca543d3771b08ba11dc1866f664fa1ba974ff3ebcdfc562fcb53c967ce10f0a494e7a9dabdaf3626c6c35f2926432d5e70821e33a3bd21f3768ffc73490ba19fb5311e55b4546c1662d8f0f53518a481696483e727751670dc477165a9873987a51bf8ed53c6363e1ba48399f876227cf7e3c6518b8c96e22d3b600",
  "dcId": 2,
  "nextApiId": 2496,
  "dateUpdated": {
    "$date": "2025-08-26T08:21:26.342Z"
  },
  "phone": "+380996250951",
  "banned": false,
  "firstName": "Igor",
  "id": "7992561572",
  "lastName": null,
  "messageCount": 0,
  "username": "documents_in_Ukraine_1971",
  "personalChannelDate": {
    "$date": "2025-08-26T03:24:38.221Z"
  },
  "personalChannelError": "CHANNEL_NOT_FOUND",
  "lazyCheckDate": {
    "$date": "2025-08-26T00:13:50.189Z"
  },
  "automaticCheckDate": {
    "$date": "2025-08-26T08:21:26.342Z"
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
    "$date": "2025-04-24T11:18:54.079Z"
  },
  "spamBlockReasons": [
    {
      "reason": "I recently lost the ability to message anyone outside of my contacts list, which prevents me from communicating with important work contacts. I havent done anything wrong and believe this is a mistake. Please restore my messaging functionality as soon as possible.",
      "date": {
        "$date": "2025-04-28T10:35:17.924Z"
      }
    },
    {
      "reason": "My account has been incorrectly flagged, preventing me from messaging non-mutual contacts. I havent violated any rules and never sent spam. Please restore my full messaging access.",
      "date": {
        "$date": "2025-04-29T13:13:33.781Z"
      }
    },
    {
      "reason": "My account has been incorrectly flagged for sending messages, despite my clean record. Please review and restore my messaging function, as this was an error. Thanks.",
      "date": {
        "$date": "2025-04-29T20:21:41.190Z"
      }
    },
    {
      "reason": "I can only message mutual contacts, which limits my ability to communicate with important people. I believe this restriction is a mistake as I havent engaged in any suspicious activities. Please review my account and restore my messaging capabilities.",
      "date": {
        "$date": "2025-05-04T08:34:24.027Z"
      }
    },
    {
      "reason": "I believe my account has been mistakenly limited to sending messages only to mutual contacts. I havent spammed or violated any rules, and my account is in good standing. Please review and restore my ability to message freely.",
      "date": {
        "$date": "2025-05-04T19:38:47.554Z"
      }
    },
    {
      "reason": "I recently noticed that my accounts messaging capabilities are limited to mutual contacts only. I believe this restriction is a mistake, as Ive always followed the rules and never engaged in spam or any suspicious behavior. Please review my account activity and lift this limitation, allowing me to message all users again.",
      "date": {
        "$date": "2025-05-04T21:09:55.749Z"
      }
    },
    {
      "reason": "My accounts messaging capability seems to be limited, allowing me only to message mutual contacts. Ive never spammed or violated any rules, so this restriction feels like a mistake. Please review my account activity and lift this limitation, as Ive always used Telegram responsibly.",
      "date": {
        "$date": "2025-05-09T15:40:28.763Z"
      }
    },
    {
      "reason": "My accounts messaging capabilities are currently limited, preventing me from reaching all my contacts. I believe this restriction was a mistake, as Ive not engaged in any suspicious activities. Please restore my ability to send messages to all contacts, as this is essential for my communication needs.",
      "date": {
        "$date": "2025-05-11T14:44:58.780Z"
      }
    },
    {
      "reason": "My accounts messaging ability is limited, allowing me to only contact mutual connections. I believe this restriction was a mistake, as Ive never participated in any suspicious activities. Please review my accounts history and lift this limitation, enabling me to communicate with all users again.",
      "date": {
        "$date": "2025-05-16T18:57:53.567Z"
      }
    },
    {
      "reason": "My accounts messaging capabilities seem to be limited, allowing me to message only mutual contacts. Ive always followed the rules, and this restriction feels like a mistake. Please review my account; I havent spammed or violated any policies, and Id appreciate having my full messaging access restored.",
      "date": {
        "$date": "2025-05-19T08:05:36.485Z"
      }
    },
    {
      "reason": "My ability to send messages has been limited, and I can only reach mutual contacts. I believe this restriction was a mistake as I havent engaged in any suspicious activities. Please review my account and lift this limitation so I can contact all my connections.",
      "date": {
        "$date": "2025-05-26T08:47:13.291Z"
      }
    },
    {
      "reason": "I have never engaged in any suspicious activity or violated Telegrams rules. Due to the messaging restrictions, Im unable to communicate with my team, which is severely impacting my work—deals are slipping away. I kindly request that these restrictions be lifted so I can continue my professional responsibilities without further disruption.",
      "date": {
        "$date": "2025-06-26T14:34:27.425Z"
      }
    },
    {
      "reason": "I havent violated any rules or sent unwanted messages, yet Im restricted to messaging only mutual contacts. Many of my important contacts dont know Im on Telegram, and I urgently need to reach them. My business is stuck because of this limitation.",
      "date": {
        "$date": "2025-07-02T15:56:54.207Z"
      }
    },
    {
      "reason": "Ive always used my account properly without any violations. Now, with messaging restrictions, I cant contact family and close friends urgently, and my projects are failing. Please lift these restrictions so I can communicate freely again.",
      "date": {
        "$date": "2025-07-07T23:16:27.884Z"
      }
    },
    {
      "reason": "I have never engaged in any violations or spam activities, yet Im restricted to messaging only mutual contacts. This limitation is distressing as it prevents me from reaching important individuals outside my mutual contacts, leaving my family worried about our ability to communicate effectively. I hope this restriction can be lifted soon.",
      "date": {
        "$date": "2025-07-12T05:26:51.474Z"
      }
    },
    {
      "reason": "Ive always followed the rules and never spammed anyone, but now I cant message people outside my mutual contacts. This restriction is costing me clients because I cant reach out to potential leads. It would be great if this limitation could be lifted so I can keep my business going.",
      "date": {
        "$date": "2025-07-12T09:02:53.092Z"
      }
    },
    {
      "reason": "Ive always used my account responsibly, adhering to all guidelines, yet Im now restricted to messaging only mutual contacts. This limitation stalls my volunteer coordination and community efforts, which rely on reaching a broader network. I hope for a swift resolution to resume my important work.",
      "date": {
        "$date": "2025-07-12T12:04:57.868Z"
      }
    },
    {
      "reason": "Ive always kept my account in line with the rules, no issues at all. Now, this messaging limit is hurting my work and my familys worried since I rely on Telegram for professional communication. Id really appreciate it if you could lift this restriction.",
      "date": {
        "$date": "2025-07-15T14:18:09.501Z"
      }
    },
    {
      "reason": "Ive never spammed or done anything shady on here, but this messaging limit is killing my customer support game. I cant even help folks who need it because theyre not in my contacts. My projects are taking a hit, and Im worried Ill lose clients over this.",
      "date": {
        "$date": "2025-07-22T14:43:09.510Z"
      }
    },
    {
      "reason": "Ive never broken any rules, but the messaging restrictions are making it hard for me to coordinate volunteer work and community activities with people outside my contacts. This is causing me to lose touch with potential clients and impacting my ability to organize events. Id appreciate it if the restrictions could be lifted so I can continue my work without any hurdles.",
      "date": {
        "$date": "2025-07-26T00:12:30.406Z"
      }
    },
    {
      "reason": "Ive always used my account responsibly, without any violations. The messaging restrictions are impacting my small business, as I cant contact customers and suppliers who arent mutual contacts. My familys worried about the effects on our livelihood.",
      "date": {
        "$date": "2025-08-02T01:06:07.841Z"
      }
    },
    {
      "reason": "Ive always followed the rules and never engaged in any suspicious activity, but the messaging restrictions are causing me to lose clients. I need to reach my contacts urgently, but many of them dont know about my account, and the restrictions are making it impossible. This is affecting my business, and Id appreciate it if we could find a solution.",
      "date": {
        "$date": "2025-08-06T09:33:19.719Z"
      }
    },
    {
      "reason": "Ive never violated Telegrams rules, spammed, or engaged in suspicious activities. The messaging restriction prevents people from reaching me, as I provide customer support services. Lifting this restriction would allow me to continue assisting those who need help.",
      "date": {
        "$date": "2025-08-13T09:58:47.173Z"
      }
    },
    {
      "reason": "Ive never gone against Telegrams terms or community guidelines, but now I can only message mutual contacts. This restriction is costing me clients and hurting my business. Id appreciate it if you could lift this limit so I can keep using Telegram effectively.",
      "date": {
        "$date": "2025-08-13T17:16:28.420Z"
      }
    },
    {
      "reason": "Ive never sent spam or engaged in suspicious activities, yet Im restricted to messaging only mutual contacts. This limitation prevents me from reaching important people outside my current network, and my family is increasingly worried about the disconnect. Please consider lifting this restriction so I can reconnect and ease their concerns.",
      "date": {
        "$date": "2025-08-16T21:12:58.438Z"
      }
    },
    {
      "reason": "Ive never done any mass messaging or spamming, and I always follow the rules. But right now, I cant message some of my contacts because we dont have mutual connections, and its causing me to lose business opportunities. Id appreciate it if you could lift the restriction so I can reach out to my contacts and save my deals.",
      "date": {
        "$date": "2025-08-23T22:12:21.062Z"
      }
    }
  ]
},
{
  "_id": {
    "$oid": "680a1479461801f5999846b4"
  },
  "accountId": "7575904438-prefix-ukraine-documents",
  "dc2": "139967e6fd9cf545d4f13e86dd11e5683dd118d01d36636a0d838dcfe705f438453194765513a75db36b559aaaf2930973de1a7a4dcffa2bef49d7f31d12d3f29d9eda303c37aed511c39c0c07d5386992a541132aef22532e11ff3a2d7fef0e4794682a759dd6d0263194eceea24ab1e81a0016b27b0ae5ff184456ae068040952ef26d0dd1a014819b806e7cb01f5bd2219dcf744f6ce5d67dc1003186f4c88902104b10f49d17dfb0c3bcf4f15a516026b1b92405e208dd7400eec71a85bae6c755daccf38ed01ea3cfb60d6d05d5791fa8373cf0b748ffc891c902833dc6c7b4fca4a0b0175c32d163ab6650173ef6ef4c47045f889433829a49f8746bee",
  "dcId": 2,
  "nextApiId": 2040,
  "dateUpdated": {
    "$date": "2025-08-26T08:17:22.345Z"
  },
  "twoFa": false,
  "twoFaDate": {
    "$date": "2025-08-23T10:13:30.045Z"
  },
  "phone": "+380687959649",
  "banned": false,
  "firstName": "Vitaly",
  "id": "7575904438",
  "lastName": null,
  "messageCount": 45,
  "username": "documents_in_Ukraine_7907",
  "personalChannelDate": {
    "$date": "2025-08-26T03:24:27.074Z"
  },
  "personalChannelError": "CHANNEL_NOT_FOUND",
  "lazyCheckDate": {
    "$date": "2025-08-25T23:43:16.018Z"
  },
  "automaticCheckDate": {
    "$date": "2025-08-26T08:17:22.345Z"
  },
  "remainingTime": {
    "$date": "2025-06-19T15:04:44.953Z"
  }
},
{
  "_id": {
    "$oid": "680a1479461801f5999846b9"
  },
  "accountId": "7825791342-prefix-ukraine-documents",
  "dc2": "6efedb486e9fdcd7ca450809df2839ff0bb8b5462f99018d4c37844ed6c8ce7ec8b7a46043caf9231129448973b09212377220b656d42cbf69c45c9860c5494f7df3c77fc5dbf06a0a322644064502b2be014010344b58789a4a5180fa65bd702ed1a8d419caa6b653ee8f1602034a85d03967722a0cbea1c845114aca7da75f5c8dbf90cac57a88555f634c364a89a7789145776dc5763ecb43a95c403256a01b1aa382416aa647499700cd08769b216950a5d7d6afb0c248aff25ec72ed134caaf4fb8a8cd4c0432b088cef9a661b8214f28b7904a6059ed6543d7006aa080b34ca6182786ccf7cc3504643c5a2b0c3ebe9592d132fdfb3f305ad9982fa57c",
  "dcId": 2,
  "nextApiId": 2040,
  "dateUpdated": {
    "$date": "2025-08-26T08:16:26.571Z"
  },
  "phone": "+380930715990",
  "banned": false,
  "firstName": "Grigory",
  "id": "7825791342",
  "lastName": null,
  "messageCount": 37,
  "username": "documents_in_Ukraine_8510",
  "personalChannelDate": {
    "$date": "2025-08-26T03:24:38.579Z"
  },
  "personalChannelError": "CHANNEL_NOT_FOUND",
  "lazyCheckDate": {
    "$date": "2025-08-25T22:41:45.634Z"
  },
  "automaticCheckDate": {
    "$date": "2025-08-26T08:16:26.571Z"
  },
  "remainingTime": {
    "$date": "2025-06-19T14:03:07.827Z"
  },
  "historySpamBlocks": [
    {
      "spamBlockDate": {
        "$date": "2025-04-27T09:30:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-05-21T09:55:00.000Z"
      },
      "spamBlockDays": 1
    }
  ]
},
{
  "_id": {
    "$oid": "680a1479461801f5999846c2"
  },
  "accountId": "7670966919-prefix-ukraine-documents",
  "dc2": "be33fa2d3d3d594fd92b73714ef4bac036ea2eb34e8434538d2d5f251a176722dce35043f947ef0c334642ea4b2873d55c4dbd093e9c2fcd5f32f1c724857e132f2f9db549884d9781c2344948cfe56f07a76900cc6a3b2cccbcb471c158ab665c740f70c7a5d098ace67a13e97b062cd3e3fd5490a2d4b20d7eb2fe71a7a930724ebe5b04c9390b53366255d500cb2eeefc1d61cf0b1e6bbcccd1d8220075f9c66291840586b7751e4b4407fe200a2944eb56d65111b5030a34f3e9f60661b956f0324970ebbc1c192bdd63340eed0f519778406ff23ad4531dcb78bb6242c59567a1de4a0415be1a338f4a0c08a57df75e9a6be4238ada24293e38c735e0b1",
  "dcId": 2,
  "nextApiId": 2496,
  "dateUpdated": {
    "$date": "2025-08-26T07:57:52.589Z"
  },
  "twoFa": false,
  "twoFaDate": {
    "$date": "2025-08-23T10:13:33.504Z"
  },
  "phone": "+380932500857",
  "banned": false,
  "firstName": "Vitaliy",
  "id": "7670966919",
  "lastName": null,
  "messageCount": 40,
  "username": "documents_in_Ukraine_2200",
  "personalChannelDate": {
    "$date": "2025-08-26T03:24:31.741Z"
  },
  "personalChannelError": "CHANNEL_NOT_FOUND",
  "lazyCheckDate": {
    "$date": "2025-08-25T18:01:23.803Z"
  },
  "automaticCheckDate": {
    "$date": "2025-08-26T07:57:52.589Z"
  },
  "remainingTime": {
    "$date": "2025-06-19T09:39:34.399Z"
  },
  "historySpamBlocks": [
    {
      "spamBlockDate": {
        "$date": "2025-06-20T07:45:00.000Z"
      },
      "spamBlockDays": 1
    }
  ]
},
{
  "_id": {
    "$oid": "680a1479461801f5999846ca"
  },
  "accountId": "7407029442-prefix-ukraine-documents",
  "dc2": "96e7250905cf2a56ed4336fcdb81a6655e738972e93807df207ba1df2788313612156c57d281f32f349118b5f1dd8eebde8f688763bdd9b6941b829b4431b186c078c84d36da951bede8c3f5c3d601eab644f9af407a36848e307ce91ac018e66ad932ac94a279a42391a9b35224986e9608984912f64972d3d94f3372f71c1936d126e97ff23958ca03355a9fa885be27783d1e2c0a9755a651e18c7e08b9ba7d199a325a5964c3f42041e913e0a250bd3535ef831182e5a81090181c0b1e7658b747f0f73db2a285fb93f9aa0b21eebfa90cd2fd94092348594dbc605ffb8df541371b0e2d592c9d62ae7f14a209826690be2a337d800353c00df8403cd52e",
  "dcId": 2,
  "nextApiId": 2496,
  "dateUpdated": {
    "$date": "2025-08-26T08:22:16.937Z"
  },
  "twoFa": false,
  "twoFaDate": {
    "$date": "2025-08-23T10:13:30.045Z"
  },
  "phone": "+380989774418",
  "banned": false,
  "firstName": "Maksim",
  "id": "7407029442",
  "lastName": null,
  "messageCount": 30,
  "username": "documents_in_Ukraine_6131",
  "personalChannelDate": {
    "$date": "2025-08-26T03:24:29.321Z"
  },
  "personalChannelError": "CHANNEL_NOT_FOUND",
  "lazyCheckDate": {
    "$date": "2025-08-25T19:17:08.879Z"
  },
  "automaticCheckDate": {
    "$date": "2025-08-26T08:22:16.937Z"
  },
  "remainingTime": {
    "$date": "2025-06-18T10:44:50.260Z"
  },
  "historySpamBlocks": [
    {
      "spamBlockDate": {
        "$date": "2025-05-02T09:52:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-05-21T19:56:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-06-25T08:48:00.000Z"
      },
      "spamBlockDays": 7
    }
  ]
},
{
  "_id": {
    "$oid": "680a1479461801f5999846d9"
  },
  "accountId": "7960758214-prefix-ukraine-documents",
  "dc2": "432b7aaf73ec5519fe73c80ce8142b7cd608bd94992b44cba63963e626b1ed8137cd8a17d147886a42283b14ddf918bead0a6adfcf2c463d436f741011467295f0cbfd7b09963d86ddd739541f01c2dcdf758eb772b0734efee142f18b708b606ab6c6aae40706893ce8ff2fbca6a3fbf60ed40f77d9e8ef51f67e5b4b01942f25593690236a01b7f72aa13367316bac2fff456abec5f39c7029f503d779e1d1938f8ab74c1ccf21587089e80b856f1140c4536677d9d59c1969ed4146f67e83ecfd9f9bb199d9e767f793cdd89b0d6f8965a3a9e1b404b89274e92f67bb10be62be6abca340ed21cce72e980e046e27c7433cd89727e0f4e79f74205d96efa2",
  "dcId": 2,
  "nextApiId": 2040,
  "dateUpdated": {
    "$date": "2025-08-26T08:14:22.885Z"
  },
  "twoFa": false,
  "twoFaDate": {
    "$date": "2025-08-23T10:13:27.305Z"
  },
  "phone": "+380991215985",
  "banned": false,
  "firstName": "Igor",
  "id": "7960758214",
  "lastName": null,
  "messageCount": 44,
  "username": "documents_in_Ukraine_6790",
  "personalChannelDate": {
    "$date": "2025-08-26T03:22:44.006Z"
  },
  "personalChannelError": "CHANNEL_NOT_FOUND",
  "lazyCheckDate": {
    "$date": "2025-08-26T05:30:17.307Z"
  },
  "automaticCheckDate": {
    "$date": "2025-08-26T08:14:22.885Z"
  },
  "historySpamBlocks": [
    {
      "spamBlockDate": {
        "$date": "2025-04-24T13:18:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-05-08T10:41:00.000Z"
      },
      "spamBlockDays": 1
    }
  ],
  "remainingTime": {
    "$date": "2025-06-19T14:35:27.571Z"
  }
},
{
  "_id": {
    "$oid": "680a1479461801f5999846ee"
  },
  "accountId": "6752270822-prefix-ukraine-documents",
  "dc2": "84f8546210e31604f164c203f3128de7d4422223297c1433a7618cdb8a82ef41751c3be38c3fb90b30cfcad9ce9dbe01b14e132e575c5cae951ea183a1298ca828307f39757753328d11a55df68e1e8e3d81fcf6c9f0f54f95fac5bff846ae5f118033e0eceb1fcf7ab03b2a7280f586a249cd5813bacef12b68ac6b25587c963724c6dfc7587434f01b9403f5b30216449e5a8e8b44f1df47e485e4ef24d2dabff07bf2e64ecb70f27f94b96bffb4e081335ceb74a0cb4e7e9914f977f3917b039d269a04275e70eeaf1bcee2985fd135557d68728f7575a984be8e5c3653056314b15515c9287f47bc0fe332f7fb0077fde26db2e4dc78e13c90eeaea27775",
  "dcId": 2,
  "nextApiId": 2040,
  "dateUpdated": {
    "$date": "2025-08-26T07:16:14.646Z"
  },
  "twoFa": false,
  "twoFaDate": {
    "$date": "2025-08-23T10:13:41.167Z"
  },
  "phone": "+380502390210",
  "banned": false,
  "firstName": "Artem",
  "id": "6752270822",
  "lastName": null,
  "messageCount": 47,
  "username": "documents_in_Ukraine_9927",
  "personalChannelDate": {
    "$date": "2025-08-26T03:22:39.595Z"
  },
  "personalChannelError": "CHANNEL_NOT_FOUND",
  "lazyCheckDate": {
    "$date": "2025-08-26T00:06:42.845Z"
  },
  "automaticCheckDate": {
    "$date": "2025-08-26T07:16:14.646Z"
  },
  "remainingTime": {
    "$date": "2025-06-19T14:32:56.019Z"
  },
  "historySpamBlocks": [
    {
      "spamBlockDate": {
        "$date": "2025-04-30T12:04:00.000Z"
      },
      "spamBlockDays": 1
    }
  ]
},
{
  "_id": {
    "$oid": "680a1479461801f599984714"
  },
  "accountId": "8187632939-prefix-ukraine-documents",
  "dc2": "ae1e896324cdc2ad963a8048a3ded25320b10d3e43c32a42e7b329323f2192eab6603f464272e3a0153007c67d79285b4f123a962fae681daa6970c51214d81f83e0e6d7533f56cb017da777da46157799b1e3633e12bd7923128d812666badd227488b14826ca27fc3805dc1b210a450dbe5dfb67c45cae6bd4bd8c7a4ce9eb8d292298d43e686e30b591d25d3ce396596ae10a4284e435f87d2e0d0c9c7b7a06c2d6c2bacaa8b7a8030b5bf7dd2ac327067e829754fd700fb0eb8f2889e17828d56eedd1a3c85123392cbef2e8ce43446e4ceb99da2c4322e57ed6be069b4be6c744389e649296166a8cf60acddb1b5f548aee8ff04f393e0bfa6e23e0c179",
  "dcId": 2,
  "nextApiId": 2040,
  "dateUpdated": {
    "$date": "2025-08-26T07:57:55.765Z"
  },
  "phone": "+380688691391",
  "banned": false,
  "firstName": "Sergey",
  "id": "8187632939",
  "lastName": null,
  "messageCount": 35,
  "username": "documents_in_Ukraine_7428",
  "personalChannelDate": {
    "$date": "2025-08-26T03:24:38.265Z"
  },
  "personalChannelError": "CHANNEL_NOT_FOUND",
  "lazyCheckDate": {
    "$date": "2025-08-25T23:28:25.704Z"
  },
  "automaticCheckDate": {
    "$date": "2025-08-26T07:57:55.765Z"
  },
  "remainingTime": {
    "$date": "2025-06-19T13:51:09.244Z"
  },
  "historySpamBlocks": [
    {
      "spamBlockDate": {
        "$date": "2025-04-27T17:55:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-05-19T16:35:00.000Z"
      },
      "spamBlockDays": 1
    }
  ]
},
{
  "_id": {
    "$oid": "680a1479461801f59998471d"
  },
  "accountId": "6528436900-prefix-ukraine-documents",
  "dc2": "9a030cf625f16780103f28a1210710a8e7c967d3af93159e47c95c6f8d4c392594bb1a1d4a7cdfa224ee0d1366abf4dc87e18487f08389eb4a8fc064b0976064435cab5641f36bcc2d5ced28a35006cbc7a99f823a8917736fabd7dd275f427825b0bc511c7c97df57e72036604f0c6e17e9c97ce9dd8ec888f28f098aa8ee44207f044f0dd3df24b2a2db01f00f609b0c6ec00dc46e3d32f67508483f744b5d8d342879bc18913d72957b0791de72f051e898284bdf85f21329ea99f163b97bbac58cf77fb7dc912cfbcdf3e5ce1feb48e771c1d170e1308b018719e068cde000e5f5df4485aa26546ba4fc534b83cccde2dcbcef150be61bd133a5e4f74de2",
  "dcId": 2,
  "nextApiId": 2040,
  "dateUpdated": {
    "$date": "2025-08-26T07:17:09.850Z"
  },
  "twoFa": false,
  "twoFaDate": {
    "$date": "2025-08-23T10:13:33.503Z"
  },
  "phone": "+380962968690",
  "banned": false,
  "firstName": "Artem",
  "id": "6528436900",
  "lastName": null,
  "messageCount": 47,
  "username": "documents_in_Ukraine_8815",
  "personalChannelDate": {
    "$date": "2025-08-26T03:24:30.556Z"
  },
  "personalChannelError": "CHANNEL_NOT_FOUND",
  "lazyCheckDate": {
    "$date": "2025-08-25T23:30:16.430Z"
  },
  "automaticCheckDate": {
    "$date": "2025-08-26T07:17:09.850Z"
  },
  "remainingTime": {
    "$date": "2025-06-19T13:54:09.072Z"
  },
  "historySpamBlocks": [
    {
      "spamBlockDate": {
        "$date": "2025-04-28T09:45:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-05-22T13:49:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-05-20T17:04:00.000Z"
      },
      "spamBlockDays": 1
    }
  ]
},
{
  "_id": {
    "$oid": "680a147a461801f599984735"
  },
  "accountId": "7968301801-prefix-ukraine-documents",
  "dc2": "b1e17e72e10a9ade88836773c54b5593bcfc50779a037414299415df7d2e864bf09477c00413e081b75a10dd7ae9fe1922615545da15240b7e8a46d5b615f731ad5bdd4e02306ff6be723a3e1777cd60106258c6fe31c9f174eb46fc372fe3ade17fcb1525fce92f6bbffb633da0f74a9bbdac34dc5d1b58e25b5716fb7faf85c33b07985fda6311c0446af11775a407dafbdfb608358bedd6d34260f37f418925a7504f700a20240e441c450912956538ece18cd9c4cf70e16984b8ac2b509db2b2d64dd0c627db4feb76c78add3252966fa0aa1928da75c0215c60d67ee65252cdfd23af4b5df94ac0874bba9e6c8db904018c276ad420e1fbf13f1084c837",
  "dcId": 2,
  "nextApiId": 611335,
  "dateUpdated": {
    "$date": "2025-08-26T08:18:18.549Z"
  },
  "twoFa": false,
  "twoFaDate": {
    "$date": "2025-08-23T10:13:36.548Z"
  },
  "phone": "+380664452946",
  "banned": false,
  "firstName": "Oleg",
  "id": "7968301801",
  "lastName": null,
  "messageCount": 48,
  "username": "documents_in_Ukraine_7507",
  "personalChannelDate": {
    "$date": "2025-08-26T03:24:31.370Z"
  },
  "personalChannelError": "CHANNEL_NOT_FOUND",
  "lazyCheckDate": {
    "$date": "2025-08-25T17:08:03.972Z"
  },
  "automaticCheckDate": {
    "$date": "2025-08-26T08:18:18.549Z"
  },
  "remainingTime": {
    "$date": "2025-06-19T14:00:48.451Z"
  },
  "historySpamBlocks": [
    {
      "spamBlockDate": {
        "$date": "2025-04-30T11:18:00.000Z"
      },
      "spamBlockDays": 1
    }
  ]
},
{
  "_id": {
    "$oid": "680a147a461801f599984739"
  },
  "accountId": "6354159545-prefix-ukraine-documents",
  "dc2": "987dbf92101f15125d63f0b1a83004bb86e1575fb8847b4cb0a921cd9813db3e588b5e4bf811f6b4f51baa056878e9df85f176fc82f4dda5a21e88e4cf91b06df2bd490788fff49a237b4dab892066c8c15faee7c3de2eabf248867e89cd8c580d1d5328fbc56964c3b3ac3fdc079f4833d6ed5adfd689b181c376a00707a219fe8749859d16abc7caa0d935bcacd1a17e68b30006641a346c2bab61f9586b0a0353c995655d58bf2b851c76ce05e74222a4275b6e98843c7346d5cc26e7971d7ccd982992686f4797857250a6d3c0419abf0f8fee15dafe1756a21f91abbf5ee9f05724dbf019f1d2c752f616991c3db5900fa2fdd8f9dc0e8be1fc5b0d0670",
  "dcId": 2,
  "nextApiId": 2496,
  "dateUpdated": {
    "$date": "2025-08-26T08:21:22.433Z"
  },
  "twoFa": false,
  "twoFaDate": {
    "$date": "2025-08-23T10:13:33.501Z"
  },
  "phone": "+380506749597",
  "banned": false,
  "firstName": "Boris",
  "id": "6354159545",
  "lastName": null,
  "messageCount": 51,
  "username": "documents_in_Ukraine_1782",
  "personalChannelDate": {
    "$date": "2025-08-26T03:24:31.371Z"
  },
  "personalChannelError": "CHANNEL_NOT_FOUND",
  "lazyCheckDate": {
    "$date": "2025-08-25T16:57:55.670Z"
  },
  "automaticCheckDate": {
    "$date": "2025-08-26T08:21:22.433Z"
  },
  "remainingTime": {
    "$date": "2025-06-19T14:34:18.562Z"
  },
  "historySpamBlocks": [
    {
      "spamBlockDate": {
        "$date": "2025-06-24T07:31:00.000Z"
      },
      "spamBlockDays": 1
    }
  ]
},
{
  "_id": {
    "$oid": "680a147a461801f59998473e"
  },
  "accountId": "7916677542-prefix-ukraine-documents",
  "dc2": "8e64b0119a0c2d438677a1b52c05871012fd2c7bf6e80ca706acd9995b6c3974e6768adf4d637d6db7a8f2f4e65db781c43ec8d2cba9fd272550f40576bad90a77990c3aeaf04fea690355faf17bb5a14a99759deae1fb68bcf9de84b10804581788efaf4559d49dfa2d8f7baee44335c2f2823c635ccecf695f9363c70556b97c9020940d94c5799655d1e099e665e5ccdccb6ebba5a7879d79e60f3821b888e5e66d8365166a22e7920d9c8c7bfc34a46b2496a5056740e688c2fdfdb9056c711bebbf0440b3dec12c344f6709118f952436937e7c6398d900cc94652fbb891d214b288e98a61352d8e392b82e300189ed937067578e24a4fdaf4b858e4c25",
  "dcId": 2,
  "nextApiId": 2496,
  "dateUpdated": {
    "$date": "2025-08-26T08:19:25.236Z"
  },
  "twoFa": false,
  "twoFaDate": {
    "$date": "2025-08-23T10:13:30.007Z"
  },
  "phone": "+380962646858",
  "banned": false,
  "firstName": "Fedor",
  "id": "7916677542",
  "lastName": null,
  "messageCount": 46,
  "username": "documents_in_Ukraine_2324",
  "personalChannelDate": {
    "$date": "2025-08-26T03:24:31.748Z"
  },
  "personalChannelError": "CHANNEL_NOT_FOUND",
  "lazyCheckDate": {
    "$date": "2025-08-25T17:40:23.811Z"
  },
  "automaticCheckDate": {
    "$date": "2025-08-26T08:19:25.235Z"
  },
  "remainingTime": {
    "$date": "2025-06-19T14:02:45.958Z"
  }
},
{
  "_id": {
    "$oid": "680a147a461801f599984742"
  },
  "accountId": "7319865561-prefix-ukraine-documents",
  "dc2": "5b0197c9cb5dfe3d4afb09c4a8d0253eaf7ea113dd481a94512e7e69e235b3ce7927be6fd148cf8ee14675688add1f32c88e0cd0692893c0bdf4cd81d72e0653fa3fd3e499fe6bbb1a2c3af7dd0b8f5de4faabe79d39f38e3ff973fa11c172031cfbf0b89771d3c8d243bcb6d53aec3d5adad84af917901ec8b64d19f38a108996c1df64e37e7c68ecbb71ee7d1ac4e49ab2b36d0941e398acfbc4b14afb7cf1e7a01f2284c0bbed584c954e15fce54a6a35dbab91b47709e9fd5eefee201e6d066e05114e2b48d8061ff026ff4b5d08cdecd871d3d0a79dc36d4df73fc47f6d8a91ba1f692d8ea7ccdc131f210a3b854d853e0f719d1ba8b70007d6a7a30ddd",
  "dcId": 2,
  "nextApiId": 2496,
  "dateUpdated": {
    "$date": "2025-08-26T08:20:21.864Z"
  },
  "twoFa": false,
  "twoFaDate": {
    "$date": "2025-08-23T10:13:33.442Z"
  },
  "phone": "+380961088458",
  "banned": false,
  "firstName": "Artem",
  "id": "7319865561",
  "lastName": null,
  "messageCount": 47,
  "username": "documents_in_Ukraine_1447",
  "personalChannelDate": {
    "$date": "2025-08-26T03:24:29.326Z"
  },
  "personalChannelError": "CHANNEL_NOT_FOUND",
  "lazyCheckDate": {
    "$date": "2025-08-25T22:53:44.211Z"
  },
  "automaticCheckDate": {
    "$date": "2025-08-26T08:20:21.864Z"
  },
  "remainingTime": {
    "$date": "2025-06-19T14:30:38.620Z"
  }
},
{
  "_id": {
    "$oid": "680a147a461801f599984749"
  },
  "accountId": "7883868375-prefix-ukraine-documents",
  "dc2": "90c550772b74a2520b947fc94d2de57e64a534182a86f6e3211181e8c01022ce5cbf0e0629a990101ec9f0ac11f39d5b328336ed6b54afd2d6cf585809b3366101d351a9abe64d7197f3e70eb4e8d44e1a7384c76b0e963e06f0a780084f80313e97c011f8206a3ca9ad4f8251003363e50276c56d980266282cddb84951fc5c158403ad6b4b66d884e16e5dc2591786ab76a1d3420d1b7cba03175d31729f0b565e1bfb609463fd042d2d6e3077f1607dd14cd077a1ffb3870c0882afa824f02c2448a8dd81706d8980623c2eda04f9e3e147488f6b524e67f772d3283db2b1b8a3ae650615228fd4588b7a485b344cd5a7bb4a610b9654f65a10117d80e056",
  "dcId": 2,
  "nextApiId": 2496,
  "dateUpdated": {
    "$date": "2025-08-26T08:10:21.951Z"
  },
  "twoFa": false,
  "twoFaDate": {
    "$date": "2025-08-23T10:13:36.372Z"
  },
  "phone": "+380639567043",
  "banned": false,
  "firstName": "Denis",
  "id": "7883868375",
  "lastName": null,
  "messageCount": 48,
  "username": "documents_in_Ukraine_9469",
  "personalChannelDate": {
    "$date": "2025-08-26T03:24:36.658Z"
  },
  "personalChannelError": "CHANNEL_NOT_FOUND",
  "lazyCheckDate": {
    "$date": "2025-08-25T16:55:04.610Z"
  },
  "automaticCheckDate": {
    "$date": "2025-08-26T08:10:21.951Z"
  },
  "remainingTime": {
    "$date": "2025-06-19T14:41:03.805Z"
  }
},
{
  "_id": {
    "$oid": "680a147a461801f59998474c"
  },
  "accountId": "6922500616-prefix-ukraine-documents",
  "dc2": "5eceaf50faa51abb1e1aaa53576faa384dc583b40e01a91af5d7c3268bfe41354fb89e538fe0bdc8f2b92a315d7d121496a918962128f7fe756561ce1f68c55fa6c492a450e6dc926ead16a10f664369169c032e54951141ec5f226b0d4d8c30f426f5d77d5c063d04177632f5767b056e894629d91a9ac1d185ab65bc426218dda1d141973915b9912be7113c3b3bdcd712b1330bb00ec2ceb0168742a9af7a4990df06eb89e7b7010a7af4348cdcd88daff7c481745ba6983686daddb9143d48bc7ae2bd397b7820e437dd6576d68b25f0a80fe2c6234b3bfa209bf5c1ae7e63c8097b65071fa5273659e4dcdb799019a7a2d39f39bbe34fd20c6eb92e6d0b",
  "dcId": 2,
  "nextApiId": 2040,
  "dateUpdated": {
    "$date": "2025-08-26T07:52:52.526Z"
  },
  "twoFa": false,
  "twoFaDate": {
    "$date": "2025-08-23T10:13:36.853Z"
  },
  "phone": "+380983809473",
  "banned": false,
  "firstName": "Nikolay",
  "id": "6922500616",
  "lastName": null,
  "messageCount": 42,
  "username": "documents_in_Ukraine_8148",
  "personalChannelDate": {
    "$date": "2025-08-26T03:24:32.428Z"
  },
  "personalChannelError": "CHANNEL_NOT_FOUND",
  "lazyCheckDate": {
    "$date": "2025-08-25T17:53:21.678Z"
  },
  "automaticCheckDate": {
    "$date": "2025-08-26T07:52:52.526Z"
  },
  "remainingTime": {
    "$date": "2025-06-19T15:59:59.400Z"
  },
  "historySpamBlocks": [
    {
      "spamBlockDate": {
        "$date": "2025-04-27T14:30:00.000Z"
      },
      "spamBlockDays": 1
    },
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
        "$date": "2025-05-20T12:22:00.000Z"
      },
      "spamBlockDays": 1
    }
  ]
},
{
  "_id": {
    "$oid": "680a147a461801f59998474f"
  },
  "accountId": "7268783417-prefix-ukraine-documents",
  "dc2": "5a816105060e1c9443fddc204c7869f72b15d937b05b0d33b8aab4dc65822e99d3b6873d1044297e673a8a9fe030e647e751663604c4606e6af4e7dcc0eecaab941f54bf06294d4b9ea2925d8a20f0f909fe7c1430ff690359382e80cb2317375932e321560be5e8a4bf96971cc9c6cb9d0811bf065a6f8ba772cb6994bc1e1440a0e7e153d84e59f2255e3fad38378e4a576339c6e4e20803871b110dc7cfb79b69338cbcd232bc383fc536b1d40c83b4ce4363aa9b1ff7626d08e5413024555aae711752a6ede83a7ce0471079d9ea58575b80cd3a3ce0df82132426a260560ef2b30bc819b22f34c803669aca8aa4b72b0ee1f2bc618d369d5a3991ad8809",
  "dcId": 2,
  "nextApiId": 611335,
  "dateUpdated": {
    "$date": "2025-08-26T08:15:24.333Z"
  },
  "twoFa": false,
  "twoFaDate": {
    "$date": "2025-08-23T10:13:31.229Z"
  },
  "phone": "+380988960503",
  "banned": false,
  "firstName": "Victor",
  "id": "7268783417",
  "lastName": null,
  "messageCount": 45,
  "username": "documents_in_Ukraine_2113",
  "personalChannelDate": {
    "$date": "2025-08-26T03:22:39.539Z"
  },
  "personalChannelError": "CHANNEL_NOT_FOUND",
  "lazyCheckDate": {
    "$date": "2025-08-26T00:31:43.843Z"
  },
  "automaticCheckDate": {
    "$date": "2025-08-26T08:15:24.333Z"
  },
  "remainingTime": {
    "$date": "2025-06-19T16:29:34.101Z"
  },
  "historySpamBlocks": [
    {
      "spamBlockDate": {
        "$date": "2025-05-22T18:07:00.000Z"
      },
      "spamBlockDays": 3
    }
  ]
},
{
  "_id": {
    "$oid": "680a147a461801f599984751"
  },
  "accountId": "1384899324-prefix-ukraine-documents",
  "dc2": "487922930ee9c83ae615852b64b543f28169c63d787a47c29dcd434f64567625ce7b637f408b87566a38fd8df166391b8e2d88bc99ed132fc140d3261e991053b04a010af5f960d5fa00da7f6067dfe407e4e580a464e80a52dabb250759d6380d44e0bd6ba61e3e8f225f1b834f05096559a758fb75997c5ff7b257c82ed3cf4c5fc71601f22da5a1829585a42685e693615eff40a814e63d03e812ead1b6a52fdd0046f18493e8d448427c9b5543a10164c3f8e6403d184af70d0df6d787ea362effcc878318dc13734f12ddcb0ae2f1c7bcaaff2135f722b82e10d17e22927e4d6478cfdf2c7a15c5a853ec277f70f2c0907a0118ea61e3b1dbde1f176cf4",
  "dcId": 2,
  "nextApiId": 2496,
  "dateUpdated": {
    "$date": "2025-08-26T08:16:24.444Z"
  },
  "twoFa": false,
  "twoFaDate": {
    "$date": "2025-08-23T10:13:36.437Z"
  },
  "phone": "+380968006527",
  "banned": false,
  "firstName": "Matvey",
  "id": "1384899324",
  "lastName": null,
  "messageCount": 39,
  "username": "documents_in_Ukraine_8849",
  "personalChannelDate": {
    "$date": "2025-08-26T03:22:39.538Z"
  },
  "personalChannelError": "CHANNEL_NOT_FOUND",
  "lazyCheckDate": {
    "$date": "2025-08-25T17:43:21.012Z"
  },
  "automaticCheckDate": {
    "$date": "2025-08-26T08:16:24.444Z"
  },
  "remainingTime": {
    "$date": "2025-06-19T09:52:31.595Z"
  },
  "historySpamBlocks": [
    {
      "spamBlockDate": {
        "$date": "2025-05-03T19:20:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-06-20T09:44:00.000Z"
      },
      "spamBlockDays": 1
    }
  ]
},
{
  "_id": {
    "$oid": "680a147a461801f599984758"
  },
  "accountId": "7737241746-prefix-ukraine-documents",
  "dc2": "c2e02408bbd32729365920259c859651c7e2f060723fa24632bafc927471ee8b2c6d9387b43d25b18a6efdacdff4144836311899fdc08a7ee86df18367607d9b4c803ac31e681eed7e63e4ce578a27b74c49e2abebf08a7499274277b032531888035c9210b7f4ef2a64d1c2240aceb927a1a46abf4f328c90771e20a6bc8511240d111d76bec096453a0c6ad7861c8f5eac375e0889ce8de2b493296fb2daaf66e082faa44e59d607f9c1465149ed02352a95b3c7e97602e93ea607fc90019c65686a59f72b79f11a485bbe8645a2b3a2cea63875ff86cef85b1eb05dd81599bc77686234559a0624717ecb5ece80855b669fc6c091b0e9e8b8d23a2a87df25",
  "dcId": 2,
  "nextApiId": 2496,
  "dateUpdated": {
    "$date": "2025-08-26T07:24:11.536Z"
  },
  "twoFa": false,
  "twoFaDate": {
    "$date": "2025-08-23T10:13:36.423Z"
  },
  "phone": "+380509448847",
  "banned": false,
  "firstName": "Petr",
  "id": "7737241746",
  "lastName": "",
  "messageCount": 45,
  "username": "documents_in_Ukraine_9188",
  "personalChannelDate": {
    "$date": "2025-08-26T03:22:39.536Z"
  },
  "personalChannelError": "CHANNEL_NOT_FOUND",
  "lazyCheckDate": {
    "$date": "2025-08-26T01:41:37.626Z"
  },
  "automaticCheckDate": {
    "$date": "2025-08-26T07:24:11.536Z"
  },
  "remainingTime": {
    "$date": "2025-06-19T11:53:42.677Z"
  },
  "historySpamBlocks": [
    {
      "spamBlockDate": {
        "$date": "2025-04-30T13:46:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-05-05T10:04:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-06-20T10:14:00.000Z"
      },
      "spamBlockDays": 1
    }
  ]
},
{
  "_id": {
    "$oid": "680a147a461801f599984768"
  },
  "accountId": "2059719378-prefix-ukraine-documents",
  "dc2": "63d9f46f08a9dcfd1a554573b9ae7d54dfdd7886395e268f229dbd4f1753442cc4029b7e192b669816c3fd80706b2b6b7bba0865ef2378b75f4b1f3fe39e1934ab28ccb2a52b31a389d4c382f6e22644c76d6fdface9277b68bff9a09a99373fd8c9a110e7461a48bb4e39f377e62f025f246e70eaefc02e9771c3892c6897a8aa6e5d07e697b255b4c4067b02c45cccd2d613c6e8f3b85f1d8dda551e9aeeb24025967e3b54360fd934a6f551d9e5727b90dbe92cc4c4db37ab1d32618beed2799bf03a3c11e4863f1965d0cadc8af236fa487fd37b1c77f25617f9cbb6969872b7fc914cd2470ca25ae534e3f8639f226b86237e8913b65510f1696067dbce",
  "dcId": 2,
  "nextApiId": 2040,
  "dateUpdated": {
    "$date": "2025-08-26T08:05:25.034Z"
  },
  "twoFa": false,
  "twoFaDate": {
    "$date": "2025-08-23T10:13:33.502Z"
  },
  "phone": "+380934586231",
  "banned": false,
  "firstName": "Georgiy",
  "id": "2059719378",
  "lastName": null,
  "messageCount": 23,
  "username": "documents_in_Ukraine_2438",
  "personalChannelDate": {
    "$date": "2025-08-26T03:24:35.747Z"
  },
  "personalChannelError": "CHANNEL_NOT_FOUND",
  "lazyCheckDate": {
    "$date": "2025-08-25T23:51:36.403Z"
  },
  "automaticCheckDate": {
    "$date": "2025-08-26T08:05:25.034Z"
  },
  "remainingTime": {
    "$date": "2025-06-18T08:42:07.152Z"
  },
  "historySpamBlocks": [
    {
      "spamBlockDate": {
        "$date": "2025-04-28T08:01:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-05-02T13:05:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-05-02T12:13:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-05-11T06:20:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-05-18T07:27:00.000Z"
      },
      "spamBlockDays": 7
    },
    {
      "spamBlockDate": {
        "$date": "2025-05-19T19:53:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-06-21T07:14:00.000Z"
      },
      "spamBlockDays": 3
    }
  ]
},
{
  "_id": {
    "$oid": "680a147a461801f59998476a"
  },
  "accountId": "8051098523-prefix-ukraine-documents",
  "dc2": "094731db146287bcfa2f359af332ca19df923eaa31a9a73ea5fbc25bbaa54a3a1ac6cc3745ff7b0b50233ffa88823d47c85300fa3d9d951872c05844815043ac1d857991f6c40213d46b16026bed1f6d5eb386d2b37c6fefd55f9cae0f696e3b2c41a9b9119713bf2200237cdee3159b2926216723be69769437f39a3968a276cd0912671a9c2f92c74157c5e890d9d09aae3c63aa0f56542b6204262544584e400f4a23b25313fd5dd9fa6779995b9d3d6db2524598bece30bebbc2889e60027eca869fd201b4a70324507b89e9899666e53387944447690d5b6ffe4f7d7c76563f7af8e7db7278abd8d800c6f449601565b5b1a6ac619ce55d4e780f15dcbe",
  "dcId": 2,
  "nextApiId": 2496,
  "dateUpdated": {
    "$date": "2025-08-26T08:20:26.085Z"
  },
  "twoFa": false,
  "twoFaDate": {
    "$date": "2025-08-23T10:13:43.518Z"
  },
  "phone": "+380681275657",
  "banned": false,
  "firstName": "Oleg",
  "id": "8051098523",
  "lastName": null,
  "messageCount": 40,
  "username": "documents_in_Ukraine_3154",
  "personalChannelDate": {
    "$date": "2025-08-26T03:24:31.726Z"
  },
  "personalChannelError": "CHANNEL_NOT_FOUND",
  "lazyCheckDate": {
    "$date": "2025-08-25T22:54:45.377Z"
  },
  "automaticCheckDate": {
    "$date": "2025-08-26T08:20:26.085Z"
  },
  "remainingTime": {
    "$date": "2025-06-19T15:59:58.213Z"
  },
  "historySpamBlocks": [
    {
      "spamBlockDate": {
        "$date": "2025-06-21T06:08:00.000Z"
      },
      "spamBlockDays": 1
    }
  ]
},
{
  "_id": {
    "$oid": "680a147a461801f59998476c"
  },
  "accountId": "7705704567-prefix-ukraine-documents",
  "dc2": "5ac837706e3a656141e14162f85b00c752b8d3f0e84f5f2a6c71950f48750355dc686465e8ab346d7b95bf5b445024377a3fc3ca052a4bd142d8cb1e5bb002bca488012ed6efd43378d4d9ce928fe6c691e13d619d2916c19b44a30b297f9c33761f9669e423723edba227d5b45cc2377a2d0ca078b4b890182b94c5cececd5fc7dfda00e0140edf808e35c3c13112c66d0fd1ef4e820b2797101df032295218868567f319bffa21ee81194c40fa72773f032ea15a132c2ecdc4325726a16ad57e5524457968a58d7866ef5c8705d771194c57f93fedf1d533469b20d22618e8dbec4751fcaf755b77212d508ca3020652951d0f38e76e78a83f37a0c0a02d2e",
  "dcId": 2,
  "nextApiId": 2496,
  "dateUpdated": {
    "$date": "2025-08-26T07:48:52.536Z"
  },
  "twoFa": false,
  "twoFaDate": {
    "$date": "2025-08-23T10:13:36.877Z"
  },
  "phone": "+380962468767",
  "banned": false,
  "firstName": "Egor",
  "id": "7705704567",
  "lastName": "",
  "messageCount": 45,
  "username": "documents_in_Ukraine_2079",
  "personalChannelDate": {
    "$date": "2025-08-26T03:22:41.015Z"
  },
  "personalChannelError": "CHANNEL_NOT_FOUND",
  "lazyCheckDate": {
    "$date": "2025-08-25T17:54:21.254Z"
  },
  "automaticCheckDate": {
    "$date": "2025-08-26T07:48:52.536Z"
  },
  "remainingTime": {
    "$date": "2025-06-19T15:54:35.371Z"
  }
},
{
  "_id": {
    "$oid": "680a147a461801f59998476e"
  },
  "accountId": "8006426447-prefix-ukraine-documents",
  "dc2": "90e6a7929c763cfd12d80903c7bb927340b7ccb34d90b617c2ddbc0b90ddbffd97252e6d4b64a2294793645255faf5e583a626e544e9b9f64e8cffccc80366f828f2832acf6a66f54058bd76d4ce0004feabaca230c7c92acd65f069716af98df25135309e585e8a107ac6528010fc03158103e098d1325d8d0ad5ee69e7b00b775e6e412bdb2d2f2749faa8067de6b7384c0b2b425a2009b2c045bce5ba278fb131f876800def6165b0ee02614f26f5895ffd11c2371cf9f737bc23e9a08d89c1b91646c718d137a5fb7602cf0fc311775df82ddc2fe28197e0a98d9545c278dc96af822e756860a5624dc7191cc95d77923ce6580eb4087c20058c738cc57d",
  "dcId": 2,
  "nextApiId": 2496,
  "dateUpdated": {
    "$date": "2025-08-26T07:52:52.429Z"
  },
  "twoFa": false,
  "twoFaDate": {
    "$date": "2025-08-23T10:13:32.868Z"
  },
  "phone": "+380725016597",
  "banned": false,
  "firstName": "Artem",
  "id": "8006426447",
  "lastName": null,
  "messageCount": 41,
  "username": "documents_in_Ukraine_4284",
  "personalChannelDate": {
    "$date": "2025-08-26T03:22:39.593Z"
  },
  "personalChannelError": "CHANNEL_NOT_FOUND",
  "lazyCheckDate": {
    "$date": "2025-08-25T23:04:39.797Z"
  },
  "automaticCheckDate": {
    "$date": "2025-08-26T07:52:52.429Z"
  },
  "remainingTime": {
    "$date": "2025-06-19T16:06:12.644Z"
  },
  "historySpamBlocks": [
    {
      "spamBlockDate": {
        "$date": "2025-05-08T10:48:00.000Z"
      },
      "spamBlockDays": 1
    }
  ]
},
{
  "_id": {
    "$oid": "680a147a461801f599984775"
  },
  "accountId": "6180650257-prefix-ukraine-documents",
  "dc2": "3f0c59ef8b5ca4a501f6d5a63952e0d5a3b6f08a80f0a7d545639a16b6d0cae15a2de707fa98c977c88e535a54cce1b8f044b9afd76c626710958c67038faf46b27c45706d74ac06315bdfb44ab83a7d96a3d52243e0e38814fdef812f537c0ac780beef54be6075a28a4beb8287b7b3d5b003c2cc8650e805d4c7108fb75253d2c3540816d86a5981ec947b2ea2ae59b086707bf3ac9d3bfa0180653d852cd1d1ef660f8e9629d25c9e12fd95c025933665a1681df28bb92a1013ad777287096c9dba5aaa35d83349ad9e53c614179f646f6401357e1b5db1622f6896a875f422abbb913062a4dc8b27cdb1d2068ad50590464fe505da0a28d0e8e25dae7da0",
  "dcId": 2,
  "nextApiId": 2496,
  "dateUpdated": {
    "$date": "2025-08-26T08:06:22.791Z"
  },
  "twoFa": false,
  "twoFaDate": {
    "$date": "2025-08-23T10:13:31.234Z"
  },
  "phone": "+380985956596",
  "banned": false,
  "firstName": "Denis",
  "id": "6180650257",
  "lastName": null,
  "messageCount": 47,
  "username": "documents_in_Ukraine_5713",
  "personalChannelDate": {
    "$date": "2025-08-26T03:22:39.539Z"
  },
  "personalChannelError": "CHANNEL_NOT_FOUND",
  "lazyCheckDate": {
    "$date": "2025-08-25T22:55:39.892Z"
  },
  "automaticCheckDate": {
    "$date": "2025-08-26T08:06:22.791Z"
  },
  "remainingTime": {
    "$date": "2025-06-19T14:38:49.269Z"
  }
},
{
  "_id": {
    "$oid": "680a147b461801f59998477b"
  },
  "accountId": "7184006237-prefix-ukraine-documents",
  "dc2": "4aa91522777b6e4018a65c132c3866138a734e5227f42456a8004c1d851a6860af0b71765dc60c4021aeb3f8b874b6a2653600986b5e35dd666d661a3c1a276aec5a4fffe785d2d0472bd8cb42d99b6e2df763fa2a1f58f63a77fdb373de331b1f8265ef3443ad98188f44a8395cc225300e32f06ec6e72e12272e4758e689d87776f77fe189d2b518992e8f1cd22e40f5d2ef33094fc62bfed0d86c62b208a6a5ad9504aad65b32ec7c1729dc5a87f2fa6c01127f6faba97463d283465bc2142c86df7dd8d8b9c4843406cc1bf3883836ece9231c4c9866362fdeab2f32b089d574494b813c5c2e0c38b23e0bf0fab75c81b17ab36dbf08ce01774a03f3039e",
  "dcId": 2,
  "nextApiId": 2496,
  "dateUpdated": {
    "$date": "2025-08-26T07:56:53.958Z"
  },
  "twoFa": false,
  "twoFaDate": {
    "$date": "2025-08-23T10:13:36.876Z"
  },
  "phone": "+380933549804",
  "banned": false,
  "firstName": "Dmitry",
  "id": "7184006237",
  "lastName": null,
  "messageCount": 44,
  "username": "documents_in_Ukraine_1397",
  "personalChannelDate": {
    "$date": "2025-08-26T03:24:27.050Z"
  },
  "personalChannelError": "CHANNEL_NOT_FOUND",
  "lazyCheckDate": {
    "$date": "2025-08-25T15:46:42.962Z"
  },
  "automaticCheckDate": {
    "$date": "2025-08-26T07:56:53.958Z"
  },
  "remainingTime": {
    "$date": "2025-06-19T14:41:50.511Z"
  },
  "historySpamBlocks": [
    {
      "spamBlockDate": {
        "$date": "2025-04-30T12:01:00.000Z"
      },
      "spamBlockDays": 1
    }
  ]
},
{
  "_id": {
    "$oid": "680a147b461801f59998477d"
  },
  "accountId": "7203756966-prefix-ukraine-documents",
  "dc2": "28b8086db4bfbcf5479ed852b76ea628739765b8546a79a7bf93f0f8f02045140d3d2634a77d65c15fb77c2930b8a3feb814efc2dd139115e4278d2cdd81f7783eb4dad755b5824c449b6aed6bd36847cd656d5ac0b114fac39d1db8d1c822dc2ec490244d2bacdf9c8654833ec1ef45beb388c1fb96cab75c74d2f046c92413edd650749840d17bf5f9cc1aff589befacc6534efac3d5ab7c51594dd33dcfbc41071639a48a27532ba477d0df37155846684caf7344976549c11d7a4ecd552cca098d575c75cd32aa115c7a189b98414dad075908c4172a2c57152137914da5c43c28162cae168c714eea820f2d0e7e5e66b056cc66ab9cd5ec76337e5bb1c5",
  "dcId": 2,
  "nextApiId": 2496,
  "dateUpdated": {
    "$date": "2025-08-26T08:17:22.879Z"
  },
  "twoFa": false,
  "twoFaDate": {
    "$date": "2025-08-23T10:13:31.232Z"
  },
  "phone": "+380686005681",
  "banned": false,
  "firstName": "Gennady",
  "id": "7203756966",
  "lastName": null,
  "messageCount": 23,
  "username": "documents_in_Ukraine_1415",
  "personalChannelDate": {
    "$date": "2025-08-26T03:24:31.740Z"
  },
  "personalChannelError": "CHANNEL_NOT_FOUND",
  "lazyCheckDate": {
    "$date": "2025-08-25T21:46:42.286Z"
  },
  "automaticCheckDate": {
    "$date": "2025-08-26T08:17:22.879Z"
  },
  "remainingTime": {
    "$date": "2025-06-18T08:07:57.373Z"
  },
  "historySpamBlocks": [
    {
      "spamBlockDate": {
        "$date": "2025-04-28T09:53:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-05-03T11:16:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-05-14T11:15:00.000Z"
      },
      "spamBlockDays": 7
    },
    {
      "spamBlockDate": {
        "$date": "2025-05-19T19:40:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-05-23T07:26:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-06-14T13:24:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-06-21T06:40:00.000Z"
      },
      "spamBlockDays": 3
    }
  ]
},
{
  "_id": {
    "$oid": "680a147b461801f59998478c"
  },
  "accountId": "7295543714-prefix-ukraine-documents",
  "dc2": "03e48901cbedf2ce91219e5732782dcd71f62b76def736c03904291800c5976d444090074392e5aaa4506b5a8a4457c7a31fd494eea39dccf84b2d2b342187e4ec1ed4161f769869af182e23db7418a72316c06c21b2ba8f5a2d9d28f8f81a8e8f73ca1e28f12eb1c597b6deb578792f947c9b200cf95aca966a4abe6f6d04e3db2e60fe4cf2b7df7df5bb37162e579a774421f56e596a5734ecb97c8332bbc7d5d00758d006a05fa24a35661e2b162707bb36551bfb0faf66abf7a4864e12b3fad0ce507ac177822772f2724eb7706589abfd8a3822e47f11d3977a1eaa1bec260555ce35ab5d8ef0d5b8f9d10f8ba2d38f816274e4fb5288a066144075bbfa",
  "dcId": 2,
  "nextApiId": 2496,
  "dateUpdated": {
    "$date": "2025-08-26T08:16:20.211Z"
  },
  "twoFa": false,
  "twoFaDate": {
    "$date": "2025-08-23T10:13:33.454Z"
  },
  "phone": "+380635979162",
  "banned": false,
  "firstName": "Vitaly",
  "id": "7295543714",
  "lastName": null,
  "messageCount": 34,
  "username": "documents_in_Ukraine_3722",
  "personalChannelDate": {
    "$date": "2025-08-26T03:24:31.395Z"
  },
  "personalChannelError": "CHANNEL_NOT_FOUND",
  "lazyCheckDate": {
    "$date": "2025-08-25T17:49:20.909Z"
  },
  "automaticCheckDate": {
    "$date": "2025-08-26T08:16:20.211Z"
  },
  "remainingTime": {
    "$date": "2025-06-19T09:30:21.148Z"
  },
  "historySpamBlocks": [
    {
      "spamBlockDate": {
        "$date": "2025-05-22T09:16:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-06-26T09:30:00.000Z"
      },
      "spamBlockDays": 7
    }
  ]
},
{
  "_id": {
    "$oid": "680a147b461801f59998479e"
  },
  "accountId": "6640377596-prefix-ukraine-documents",
  "dc2": "b96d741ddc660391c88d836e2ece8b518178c1a07604d74db777211515e974c7636b8072bbdab7f46b95d19fb17d52844dedd527c383401b05e5a207d983128e822f0afbcb00d2ede8c76aa651783beae319c581e15f16a0ae263ae7c58f8c6dc54adf3c8f91b19bc2f2c11c8bbe6bf22f78ced05dbd6d69b5fb9ea4059b8327c79193641a42307797bf60a69579177e462c8e9298775084232fbdcc8442820e11d695d23156d4e9101836a8cbf6a0e5e970cbfdd9535eded64544606a7f59fc0639f4ea3537a4125ba42a37778ea95d6629c2736e266f3acea925d79f2e3cda88f7bf196c7460de8dfd223dffaf00589739eed428f3e09f074b4c5647e7bf3c",
  "dcId": 2,
  "nextApiId": 2496,
  "dateUpdated": {
    "$date": "2025-08-26T08:11:22.605Z"
  },
  "twoFa": false,
  "twoFaDate": {
    "$date": "2025-08-23T10:13:36.373Z"
  },
  "phone": "+380958922158",
  "banned": false,
  "firstName": "Grigory",
  "id": "6640377596",
  "lastName": null,
  "messageCount": 48,
  "username": "documents_in_Ukraine_6540",
  "personalChannelDate": {
    "$date": "2025-08-26T03:24:31.395Z"
  },
  "personalChannelError": "CHANNEL_NOT_FOUND",
  "lazyCheckDate": {
    "$date": "2025-08-25T23:42:15.009Z"
  },
  "automaticCheckDate": {
    "$date": "2025-08-26T08:11:22.605Z"
  },
  "remainingTime": {
    "$date": "2025-06-19T15:51:25.570Z"
  }
},
{
  "_id": {
    "$oid": "680a147b461801f5999847a6"
  },
  "accountId": "7535805471-prefix-ukraine-documents",
  "dc2": "5fe6b875ab63cae1fc61cfb13cdf03bfd86a5f5ab8aa2f0826d3a0325dc80ef39cf009c7c58d66b54106540590d854edc3343f16b24dfa0eaa22796d586c14f53dc948269744a880e67851940b01cb599db01298945abc8f63ad82908f3108a991fe0451ef91e5005107a8fdb146f5861b57254b1edeef49bed8d0f0e261179270df1c3b27be5f6db417264ca2a71ff183979a73cc16117db4b6072e91ed976ae09b44fd600799d5738703a30a9bd632f8705a416b5ade635fb26f603c6da521375e19662ebd2aabe34c473334e89455a498217c7e145b279ce2df9d3bd20f12c74e8b64c594514939376876a5f56fcae92f03158f8a38c8c1bcf7279d4fb6b9",
  "dcId": 2,
  "nextApiId": 2496,
  "dateUpdated": {
    "$date": "2025-08-26T08:21:20.312Z"
  },
  "twoFa": false,
  "twoFaDate": {
    "$date": "2025-08-23T10:13:44.038Z"
  },
  "phone": "+380662935951",
  "banned": false,
  "firstName": "Pavel",
  "id": "7535805471",
  "lastName": "",
  "messageCount": 30,
  "username": "documents_in_Ukraine_1572",
  "personalChannelDate": {
    "$date": "2025-08-26T03:22:39.594Z"
  },
  "personalChannelError": "CHANNEL_NOT_FOUND",
  "lazyCheckDate": {
    "$date": "2025-08-25T19:13:08.781Z"
  },
  "automaticCheckDate": {
    "$date": "2025-08-26T08:21:20.311Z"
  },
  "remainingTime": {
    "$date": "2025-06-18T08:55:40.244Z"
  },
  "historySpamBlocks": [
    {
      "spamBlockDate": {
        "$date": "2025-05-04T09:41:00.000Z"
      },
      "spamBlockDays": 7
    },
    {
      "spamBlockDate": {
        "$date": "2025-04-30T07:02:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-05-05T06:53:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-05-15T11:24:00.000Z"
      },
      "spamBlockDays": 7
    },
    {
      "spamBlockDate": {
        "$date": "2025-05-21T09:18:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-06-21T06:57:00.000Z"
      },
      "spamBlockDays": 3
    }
  ]
},
{
  "_id": {
    "$oid": "680a147b461801f5999847a9"
  },
  "accountId": "7918305389-prefix-ukraine-documents",
  "dc2": "5fc1b764df0893c6f9a6c679c770319cff68d65a4fe2e3d2a850d6917098ae2f76cfc3e9cbf279344ebcc67fb15a1fde9b46563194545d1a864f7e90680f15a1f074e1d85091dbefa2b1491dd7b842df4c705b3b6ac5248f7b9adc31de431b8222fa8a97ffc13a06a22d98974d99db17418eaaf24311ba2c193c05f3aad7f25ea95448eee9c3976cc6e784bdfa621ab7c1e0c6918c47b2e595a69baa8271308966c3a1fd07632b862471302d6861c1897347a4ad7c50f8d6c62e88b7b140d66a7d91473208c1a07ac9c336c64947b5f148547832d46936f477cb55b4f9bd617d5b459816800bd2d632efd284f97e6f7743c67fba042e7a6856404e6fc6a87870",
  "dcId": 2,
  "nextApiId": 2496,
  "dateUpdated": {
    "$date": "2025-08-26T08:01:52.695Z"
  },
  "twoFa": false,
  "twoFaDate": {
    "$date": "2025-08-23T10:13:44.041Z"
  },
  "phone": "+380635392703",
  "banned": false,
  "firstName": "Maksim",
  "id": "7918305389",
  "lastName": null,
  "messageCount": 47,
  "username": "documents_in_Ukraine_5252",
  "personalChannelDate": {
    "$date": "2025-08-26T03:22:41.463Z"
  },
  "personalChannelError": "CHANNEL_NOT_FOUND",
  "lazyCheckDate": {
    "$date": "2025-08-25T17:57:24.046Z"
  },
  "automaticCheckDate": {
    "$date": "2025-08-26T08:01:52.695Z"
  },
  "remainingTime": {
    "$date": "2025-06-19T14:05:42.848Z"
  }
},
{
  "_id": {
    "$oid": "680a147b461801f5999847ab"
  },
  "accountId": "7677132102-prefix-ukraine-documents",
  "dc2": "25e9432a64a730f515ec41ab593e364be90344d48e5058452d28569d133bd9fb41136b8c37214f870c597a6315ac8900146c2c7217793cf42c52f7f6a12dc1ca1823610da71a032e1c6f719a972ce744f178d43302f3f1e6490b123564486f889f672e3c226092d7b1d2c5e9df6d9f2955fab947f0b429d7e21acc85df4615b17001b059818df65f35f484350db1351ed617024bc827b98f979d01992ca24397102d5ae6b57d18998c8ee54c68d3664af995ae73619f52a9b00cdead861e4deb46ef737a6241667f6a03d8dc9fcac31210fd0fce6608a7511a888eac73ae2fb6ab743f684f3fd2fdbd38ee74b7c61c0ad942335460693e67ac04de5bd0b6e916",
  "dcId": 2,
  "nextApiId": 2496,
  "dateUpdated": {
    "$date": "2025-08-26T08:05:26.054Z"
  },
  "twoFa": false,
  "twoFaDate": {
    "$date": "2025-08-23T10:13:44.037Z"
  },
  "phone": "+380637087407",
  "banned": false,
  "firstName": "Maksim",
  "id": "7677132102",
  "lastName": "",
  "messageCount": 37,
  "username": "documents_in_Ukraine_9429",
  "personalChannelDate": {
    "$date": "2025-08-26T03:22:41.464Z"
  },
  "personalChannelError": "CHANNEL_NOT_FOUND",
  "lazyCheckDate": {
    "$date": "2025-08-26T00:05:42.054Z"
  },
  "automaticCheckDate": {
    "$date": "2025-08-26T08:05:26.054Z"
  },
  "remainingTime": {
    "$date": "2025-06-19T11:57:54.535Z"
  },
  "historySpamBlocks": [
    {
      "spamBlockDate": {
        "$date": "2025-05-04T13:06:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-05-20T00:02:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-06-20T10:19:00.000Z"
      },
      "spamBlockDays": 1
    }
  ]
},
{
  "_id": {
    "$oid": "680a147b461801f5999847ae"
  },
  "accountId": "6897127591-prefix-ukraine-documents",
  "dc2": "97473b5e0e37d35a1c02aeef741d934c2ea05a408cfb81e63654de788c37c3fb29dd8bd62937a4a93f4c73eff22dc3f707eb441f46f06e006bc571a026af22c21b64d62538ad5afa151fd04bb755dea1da0b55845e63b54ec2aca5c45568e70cb27dd221ef5daa8f1aeb59293523866960faf534b320f077fa8e12ff77b1710f8da10e53ded5ba43a3a2db0e698bec5aaf87662249ae57e22e5686eb1071c04433b55cabd2f350dc8fedbea08659dae1160468b9ba8bd36d905593cb4ecd71f8e4b7185516ac470730db3c2d93b89730983aea327ddb855b989d7e8b5644fe3e50f629f9c89fb3b0cc722a1f90c4a8006ee7b86603dce1616bbea7e8ae652512",
  "dcId": 2,
  "nextApiId": 2496,
  "dateUpdated": {
    "$date": "2025-08-26T08:14:27.791Z"
  },
  "phone": "+380956653600",
  "banned": false,
  "firstName": "Leonid",
  "id": "6897127591",
  "lastName": null,
  "messageCount": 36,
  "username": "documents_in_Ukraine_7005",
  "personalChannelDate": {
    "$date": "2025-08-26T03:24:38.218Z"
  },
  "personalChannelError": "CHANNEL_NOT_FOUND",
  "lazyCheckDate": {
    "$date": "2025-08-26T01:49:45.991Z"
  },
  "automaticCheckDate": {
    "$date": "2025-08-26T08:14:27.791Z"
  },
  "remainingTime": {
    "$date": "2025-06-19T14:38:04.016Z"
  },
  "historySpamBlocks": [
    {
      "spamBlockDate": {
        "$date": "2025-05-08T10:32:00.000Z"
      },
      "spamBlockDays": 1
    }
  ]
},
{
  "_id": {
    "$oid": "680a147b461801f5999847b1"
  },
  "accountId": "7116618172-prefix-ukraine-documents",
  "dc2": "710dd7f60b89265a8bb2e81e23f61971349e8968242e6ee573fa5367a13ef1386ed31c6822c80b187eed554a5fbcf8df1e594c966be3052b8bf40caa62d9f38bab0423d72aac680425cd4d86f30cc9815f2a16967c0af7f6cd9f32aa20e099e1ef8e7a474cfbe52ec459a58cc6cc202e8961b0ab1853161267c10e373b56233c9150d066cdb41858f5b7121e103be66752c9590178694ccaa8e632fd3e13a0586eb77740dd248e19bffe2ab474350db5a2674d344edb0563b3f4fdb884f71870e4a0f59d782238e3a02ef2fe57b70a75817ff08682db7a0ce3d77fe9d513d792ead7124d78003cb97acd37b72f42112390007274c0c24f3f44eb21f06f641cef",
  "dcId": 2,
  "nextApiId": 2040,
  "dateUpdated": {
    "$date": "2025-08-26T08:08:24.254Z"
  },
  "twoFa": false,
  "twoFaDate": {
    "$date": "2025-08-23T10:13:44.320Z"
  },
  "phone": "+380508477427",
  "banned": false,
  "firstName": "Maksim",
  "id": "7116618172",
  "lastName": null,
  "messageCount": 41,
  "username": "documents_in_Ukraine_5523",
  "personalChannelDate": {
    "$date": "2025-08-26T03:24:34.078Z"
  },
  "personalChannelError": "CHANNEL_NOT_FOUND",
  "lazyCheckDate": {
    "$date": "2025-08-25T16:56:05.039Z"
  },
  "automaticCheckDate": {
    "$date": "2025-08-26T08:08:24.254Z"
  },
  "remainingTime": {
    "$date": "2025-06-19T16:28:40.130Z"
  },
  "historySpamBlocks": [
    {
      "spamBlockDate": {
        "$date": "2025-05-20T17:13:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-05-20T18:21:00.000Z"
      },
      "spamBlockDays": 1
    }
  ]
},
{
  "_id": {
    "$oid": "680a147b461801f5999847b3"
  },
  "accountId": "7579823289-prefix-ukraine-documents",
  "dc2": "1194fd0c4bd5276daa0ae57e18ce0f6a02a172dc2a9df62b29062748b354958f783a0fed117fed4caa2aa5dee1b5c06fe9b8128313ea17fbeefe5f180a51c139d313d425d99949174024c23f8e5eba243deb3c5e5c971e7adece98918f00a71663df785bb8062fa6cc33e0dc7bede10cf2947ba2495c45246d24c7df28e9ed75c2080845980af587b6741dc4fa5428f463eff12c4ae657ce05d717e1d10a41ce0cb4cf1c62a74447c9565da7a6d2f383f6bd54fc7257fbad2c4edea10d10658d4e3957c46a95446e24992056e1992fb6740ced0e956cfd2ae6d50c3149e1d15ebd0d34cc9e09c94fd98c8a6d53ec401761f21eed147e8fe095692a4863905c0a",
  "dcId": 2,
  "nextApiId": 2496,
  "dateUpdated": {
    "$date": "2025-08-26T07:22:09.748Z"
  },
  "twoFa": false,
  "twoFaDate": {
    "$date": "2025-08-23T10:13:31.230Z"
  },
  "phone": "+380681272906",
  "banned": false,
  "firstName": "Vitaly",
  "id": "7579823289",
  "lastName": null,
  "messageCount": 46,
  "username": "documents_in_Ukraine_5062",
  "personalChannelDate": {
    "$date": "2025-08-26T03:22:37.172Z"
  },
  "personalChannelError": "CHANNEL_NOT_FOUND",
  "lazyCheckDate": {
    "$date": "2025-08-25T16:55:10.738Z"
  },
  "automaticCheckDate": {
    "$date": "2025-08-26T07:22:09.748Z"
  },
  "remainingTime": {
    "$date": "2025-06-19T15:45:27.178Z"
  }
},
{
  "_id": {
    "$oid": "680a147b461801f5999847b5"
  },
  "accountId": "7100064813-prefix-ukraine-documents",
  "dc2": "794a1f78841faaf2f8d2050a9bd8ac738aef183f4f70d5a7c319a47e315bde214805b00539054be3c68b977e04b0e66c96286884dba7c2ccd3a5e556b443e1140e9d9f8d614b77e10d4ad26251672ea4b62cffe8228c592fd3d7f4a920c210c0f00999ea9f43a27bc38fa0836981cddbb6d29b87c8dc2b327fe385704feba5a5c321c76ee1eefd76051b7f83ca2a8f5b2c4257ade78c57bea1fe8b60774cf1da3291830b393cd29f82bdeabadba6a5fdb44302c61ff06b9a8d170e47c674df6baf0a0b18dc444ff13aae004558e13f0b03f65d714dc70368638a0fa981e5b0f4ddf06b9a4841bfae1a37e0d2d0bd1564e16f55e43b9cec5f1ed332ea6c125fe0",
  "dcId": 2,
  "nextApiId": 2496,
  "dateUpdated": {
    "$date": "2025-08-26T07:57:54.503Z"
  },
  "twoFa": false,
  "twoFaDate": {
    "$date": "2025-08-23T10:13:36.421Z"
  },
  "phone": "+380687773915",
  "banned": false,
  "firstName": "Roman",
  "id": "7100064813",
  "lastName": "",
  "messageCount": 43,
  "username": "documents_in_Ukraine_3902",
  "personalChannelDate": {
    "$date": "2025-08-26T03:24:35.746Z"
  },
  "personalChannelError": "CHANNEL_NOT_FOUND",
  "lazyCheckDate": {
    "$date": "2025-08-25T17:02:05.087Z"
  },
  "automaticCheckDate": {
    "$date": "2025-08-26T07:57:54.503Z"
  },
  "remainingTime": {
    "$date": "2025-06-19T16:00:42.771Z"
  },
  "historySpamBlocks": [
    {
      "spamBlockDate": {
        "$date": "2025-04-27T11:21:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-05-20T17:13:00.000Z"
      },
      "spamBlockDays": 1
    }
  ]
},
{
  "_id": {
    "$oid": "680a147b461801f5999847b7"
  },
  "accountId": "6882348555-prefix-ukraine-documents",
  "dc2": "6a97c49fd9caa3975e3f393c2c59c086e23c09b5ec56d8e3e08262ffe391337196f7cf44ca13b87e797fcd27db957b6a07ea9f043a957666f426465d3c2443b655dcc30f5bbe0bf317fdfe5160d711a9a1be8132b628ee4fcc29207eba1a8b61386cd6d8580db3ce2bae8332cb9aa0211c0c4e432fb772d55d036bc95d0d272c134d049bc280e29af81a60385be1d572f98fdc1659fc5655208cde333f5dc1eab89dc3cf0f1d199388a9081a7208308fb92fae5bc225a56d4a6f2b898fc2f399ae59068c7234d467c80ec4c094f31cd48b25f5e2b0aa12e2f260a0338ab86ddb2c3bb31196587488cc87cdae590387c6a4baf9508ce223fbc144596cb52b4bb9",
  "dcId": 2,
  "nextApiId": 611335,
  "dateUpdated": {
    "$date": "2025-08-26T07:47:53.346Z"
  },
  "twoFa": false,
  "twoFaDate": {
    "$date": "2025-08-23T10:13:44.004Z"
  },
  "phone": "+380970802139",
  "banned": false,
  "firstName": "Dmitry",
  "id": "6882348555",
  "lastName": null,
  "messageCount": 19,
  "username": "documents_in_Ukraine_3414",
  "personalChannelDate": {
    "$date": "2025-08-26T03:22:37.164Z"
  },
  "personalChannelError": "CHANNEL_NOT_FOUND",
  "lazyCheckDate": {
    "$date": "2025-08-25T18:25:04.532Z"
  },
  "automaticCheckDate": {
    "$date": "2025-08-26T07:47:53.346Z"
  },
  "remainingTime": {
    "$date": "2025-06-18T11:35:59.103Z"
  },
  "historySpamBlocks": [
    {
      "spamBlockDate": {
        "$date": "2025-05-02T07:01:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-05-09T08:29:00.000Z"
      },
      "spamBlockDays": 7
    },
    {
      "spamBlockDate": {
        "$date": "2025-05-19T15:05:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-06-21T09:36:00.000Z"
      },
      "spamBlockDays": 3
    }
  ]
},
{
  "_id": {
    "$oid": "680a147b461801f5999847bc"
  },
  "accountId": "7355998540-prefix-ukraine-documents",
  "dc2": "1a4bfb17194f9d9995157209dcbe00467d4cd95bf499e0b8a03f16eb60053d1b1dc7ccb5250d35ffd73b181e213679d1e6e60f205a404442a69c25b57db242982e55fff9c71414d80ddd9165c6109caf1db4dcb99f966b32fed9aa322a6729a97bd358531a72983119cc1813c8984fb358dfc009ed8bdf0e08e916b203a736bd871ee71859cf36b60d863d169884e1ef5996072543d9c307562e75a16ec8bf15459b673b8dc7217c21f5f9642e1d02fd349e32b3d3ddd897649ec84b631a57aa05edf92dfed07b2128d595adb9307fa38e069672183f44f7ae22d64c98bb270be6cb5d8a4dccc52334e8ebb30cad46185aa6148a53c31868f143f16ac83cc1ae",
  "dcId": 2,
  "nextApiId": 2496,
  "dateUpdated": {
    "$date": "2025-08-26T08:06:22.071Z"
  },
  "twoFa": false,
  "twoFaDate": {
    "$date": "2025-08-23T10:13:44.321Z"
  },
  "phone": "+380938411523",
  "banned": false,
  "firstName": "Aleksey",
  "id": "7355998540",
  "lastName": null,
  "messageCount": 25,
  "username": "documents_in_Ukraine_1291",
  "personalChannelDate": {
    "$date": "2025-08-26T03:24:29.325Z"
  },
  "personalChannelError": "CHANNEL_NOT_FOUND",
  "lazyCheckDate": {
    "$date": "2025-08-25T17:49:31.007Z"
  },
  "automaticCheckDate": {
    "$date": "2025-08-26T08:06:22.071Z"
  },
  "remainingTime": {
    "$date": "2025-06-19T01:01:58.283Z"
  },
  "historySpamBlocks": [
    {
      "spamBlockDate": {
        "$date": "2025-04-30T07:07:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-05-04T07:56:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-05-25T16:18:00.000Z"
      },
      "spamBlockDays": 7
    },
    {
      "spamBlockDate": {
        "$date": "2025-05-20T20:27:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-06-21T23:06:00.000Z"
      },
      "spamBlockDays": 3
    }
  ]
},
{
  "_id": {
    "$oid": "680a147b461801f5999847c3"
  },
  "accountId": "7245359470-prefix-ukraine-documents",
  "dc2": "3e08cbcd921f0ec8f1c17e17a82b56ca76df5a13fbb8eb467211ad701fbfc21279a822f75920bc3a9a5cfbd4834b218a9002053b933fcfbe19a51f03e695946ce635daae1bd61638de8281b23b3f656de67b5a56d301a3300729a651790ecb6bb35e3147f2a6eb11781ca4386231005fe6eab1ddab4a2071e5a26741f21f87fffc48ce3688a5d136042d10e96d5f1ef057428932a6479620a28768a04e4355de57b368c53001fd8dbcf20804344ccab2fa251381d1c6ed02e73f9821e35553d1d3a491499bd483e7b10380d1f73ddccea451ff881c05dca00ab2a95b988d8a6fd533baa0cdd79cbf0acd674225807010fb40b6017be623e95ddeac69da2a2501",
  "dcId": 2,
  "nextApiId": 2496,
  "dateUpdated": {
    "$date": "2025-08-26T08:05:22.168Z"
  },
  "twoFa": false,
  "twoFaDate": {
    "$date": "2025-08-23T10:13:36.365Z"
  },
  "phone": "+380664408978",
  "banned": false,
  "firstName": "Aleksey",
  "id": "7245359470",
  "lastName": null,
  "messageCount": 47,
  "username": "documents_in_Ukraine_2282",
  "personalChannelDate": {
    "$date": "2025-08-26T03:24:39.179Z"
  },
  "personalChannelError": "CHANNEL_NOT_FOUND",
  "lazyCheckDate": {
    "$date": "2025-08-25T18:42:02.243Z"
  },
  "automaticCheckDate": {
    "$date": "2025-08-26T08:05:22.167Z"
  },
  "remainingTime": {
    "$date": "2025-06-19T15:52:03.290Z"
  },
  "historySpamBlocks": [
    {
      "spamBlockDate": {
        "$date": "2025-05-20T11:41:00.000Z"
      },
      "spamBlockDays": 1
    }
  ]
},
{
  "_id": {
    "$oid": "680a147b461801f5999847c6"
  },
  "accountId": "7740092917-prefix-ukraine-documents",
  "dc2": "73bef11b45ce636a0e5171cd3d5a9949ae1813e1cd5a6c983654bb25ba4b0d0ecda2ba1a8ce08c0cb384d5ed7f13ff44f5d73ebf398aea9b37ab177470a1ebe7cb4f767c67ed100c0c28489557c8effe5e12b7d3e2a1ec5e078b02a00ffcb79544a3e31becc998b3feb1af389bdbeb1588007c39d8c3a3bc3fb967ece2934f3a2cf3a163a08bdcbcf68d5b672471596a8a03f8abc599a020a50100a279f3c4d81761d329db90c57fc01c2a9e3f6f27a4c0a0946ec8cdf6ea894c11d05e84aed2ca86ad9e86e01d7806dfee9e08072d72998cb44ac33cf8bbd05bc9969ee5aed971ca2e15d4553cd85f21b3b72e93fc308e6842464b9d3cae545f64478efa8903",
  "dcId": 2,
  "nextApiId": 2496,
  "dateUpdated": {
    "$date": "2025-08-26T08:15:24.162Z"
  },
  "twoFa": false,
  "twoFaDate": {
    "$date": "2025-08-23T10:13:41.246Z"
  },
  "phone": "+380935101171",
  "banned": false,
  "firstName": "Boris",
  "id": "7740092917",
  "lastName": null,
  "messageCount": 44,
  "username": "documents_in_Ukraine_2718",
  "personalChannelDate": {
    "$date": "2025-08-26T03:24:31.394Z"
  },
  "personalChannelError": "CHANNEL_NOT_FOUND",
  "lazyCheckDate": {
    "$date": "2025-08-25T17:48:20.353Z"
  },
  "automaticCheckDate": {
    "$date": "2025-08-26T08:15:24.161Z"
  },
  "remainingTime": {
    "$date": "2025-06-19T14:44:55.314Z"
  }
},
{
  "_id": {
    "$oid": "680a147b461801f5999847c9"
  },
  "accountId": "6252942680-prefix-ukraine-documents",
  "dc2": "ae8e9ac55a2567c1144f81a550e5260c07905c076476f54a3e04fe0aa9232bfe07e57b464e62bd9cae11837bbadc36d2fa94aae73af849f818fe191c82a38f25f49d1cd35efdee83f5e02dcb4694ddec0b57b933df798f7ad4065285dd8bbe1d9f72761078e3f85928530f45adb85910d402bd768f6960bd1d086cd0cf46239f0199f5f3f95884c97a9ff11d46544d764086f39ad02eb3868022d3493bb5d2e9aa9f9891a9b359b53ce2cdcfe28a440a74f8fb97f1ab912a9c24acc3bea478f2592d66126ee86c657c8182514aa8253d643f366a284795cb3e93a6d269c507b547f52bfb462cf46662e4456549d5dd5f8a914851ac8f8aac6066154a27f5b022",
  "dcId": 2,
  "nextApiId": 2496,
  "dateUpdated": {
    "$date": "2025-08-26T08:17:22.114Z"
  },
  "twoFa": false,
  "twoFaDate": {
    "$date": "2025-08-23T10:13:41.258Z"
  },
  "phone": "+380660486227",
  "banned": false,
  "firstName": "Nikolay",
  "id": "6252942680",
  "lastName": null,
  "messageCount": 44,
  "username": "documents_in_Ukraine_8690",
  "personalChannelDate": {
    "$date": "2025-08-26T03:24:32.556Z"
  },
  "personalChannelError": "CHANNEL_NOT_FOUND",
  "lazyCheckDate": {
    "$date": "2025-08-26T02:17:15.269Z"
  },
  "automaticCheckDate": {
    "$date": "2025-08-26T08:17:22.114Z"
  },
  "remainingTime": {
    "$date": "2025-06-19T11:34:52.379Z"
  },
  "historySpamBlocks": [
    {
      "spamBlockDate": {
        "$date": "2025-05-08T12:47:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-06-20T09:49:00.000Z"
      },
      "spamBlockDays": 1
    }
  ]
},
{
  "_id": {
    "$oid": "680a147c461801f5999847da"
  },
  "accountId": "5275144688-prefix-ukraine-documents",
  "dc2": "2e2f42c4e2566a52ae2493bcc4b4bc4177960a7339eeeaaab1aaa8eabea61079d0d020eae89c033ab2345cadb999e405673fc0c67ded5797b8ff6be2841d2815c3171a325c3bf0cc6a59c632f0e4d64db2ffd45419e17a289afb76aea1a906e367f5285adee4ec836ea2a2a33a0313e3a12968593341b347c5f8103e72e61d1d611abef1076161c5cacc61f661f5ebf0f34e34179804d63f218e97d3a616e0628d3f2e6e1562f112cf7c2b4f790f46aae58d962abcc9760b9631851313c963461088c0a091fb1fdd40da7c6164aa41d741a7f9fc28b202fe7c202d348d379dbe49d34f6eeb8952e4478f63d87c62ed034d341848230b83ec6f67d7175a9ff526",
  "dcId": 2,
  "nextApiId": 611335,
  "dateUpdated": {
    "$date": "2025-08-26T08:07:25.247Z"
  },
  "twoFa": false,
  "twoFaDate": {
    "$date": "2025-08-23T10:13:44.035Z"
  },
  "phone": "+380977210164",
  "banned": false,
  "firstName": "Maksim",
  "id": "5275144688",
  "lastName": null,
  "messageCount": 45,
  "username": "documents_in_Ukraine_3538",
  "personalChannelDate": {
    "$date": "2025-08-26T03:24:29.325Z"
  },
  "personalChannelError": "CHANNEL_NOT_FOUND",
  "lazyCheckDate": {
    "$date": "2025-08-25T17:10:04.604Z"
  },
  "automaticCheckDate": {
    "$date": "2025-08-26T08:07:25.246Z"
  },
  "remainingTime": {
    "$date": "2025-06-19T16:02:16.718Z"
  },
  "historySpamBlocks": [
    {
      "spamBlockDate": {
        "$date": "2025-04-30T08:22:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-05-10T09:02:00.000Z"
      },
      "spamBlockDays": 7
    },
    {
      "spamBlockDate": {
        "$date": "2025-05-20T10:56:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-06-23T12:05:00.000Z"
      },
      "spamBlockDays": 3
    }
  ]
},
{
  "_id": {
    "$oid": "680a147c461801f5999847df"
  },
  "accountId": "7319370169-prefix-ukraine-documents",
  "dc2": "237a84bf43503895d839d2f1ee74d75aa21c9414564957f51f40cd4f15d00fc586d27cb6c0b2cfc0a7cc6067941d413f762bac582e7fedd3d25ccba963cc5e7a251b70c70b103b8911e97765ce9dddfd1aa2a2e18b2f1a466c4bf3a5d80e346f0160a40619eab97d39f7ab45eacfbe2046615573840c69f0b16829d4d2b7cae64462c6c3aa73691c5a9a3449339ca4f66c6190183ae280a95aa2785e56f03d036aeff0644bc00789ddd2f2d1b99d9273dd818bbf96f4b4b1924ec4bb6710667027f4441cc1c5a8575e8a99334ca532b76d50db1bd0cfae42d12bc203e0d7ad7947b4a887c9f43eca56405264389fbcc1a8f6d4b955a1fc204852f29c2044032a",
  "dcId": 2,
  "nextApiId": 611335,
  "dateUpdated": {
    "$date": "2025-08-26T07:55:54.404Z"
  },
  "twoFa": false,
  "twoFaDate": {
    "$date": "2025-08-23T10:13:41.284Z"
  },
  "phone": "+380637054106",
  "banned": false,
  "firstName": "Andrew",
  "id": "7319370169",
  "lastName": null,
  "messageCount": 26,
  "username": "documents_in_Ukraine_1059",
  "personalChannelDate": {
    "$date": "2025-08-26T03:24:32.427Z"
  },
  "personalChannelError": "CHANNEL_NOT_FOUND",
  "lazyCheckDate": {
    "$date": "2025-08-26T00:12:50.020Z"
  },
  "automaticCheckDate": {
    "$date": "2025-08-26T07:55:54.404Z"
  },
  "remainingTime": {
    "$date": "2025-06-18T12:23:20.277Z"
  },
  "historySpamBlocks": [
    {
      "spamBlockDate": {
        "$date": "2025-04-30T06:56:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-05-04T09:35:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-05-27T02:03:00.000Z"
      },
      "spamBlockDays": 7
    },
    {
      "spamBlockDate": {
        "$date": "2025-07-18T14:21:00.000Z"
      },
      "spamBlockDays": 30
    }
  ]
},
{
  "_id": {
    "$oid": "680a147c461801f5999847f1"
  },
  "accountId": "8126726461-prefix-ukraine-documents",
  "dc2": "71c0f066891476d99a0ac6b388fab472b9cb08e5198dd7ae22ebd6d1a8b72f199346b444ff393c31e271b71f13a4f8ceb283db701d2cae53dcab0ca5875cc59005c73e0074ff5c310b4c88465de733e639a42505cbe82a2495cfd38061f7f2a63888c6ff748e86eef87b486f5177a330713b587e545394d96efce6a293b2b24e570a6f50b19b1a7d32ead5f1735d497642069a62173f2ec57d392e8a6ba29ddc80576f5c707956714095eea1ce9fdae415d4ca0c0771be1973740a33e216ef547c7905276d05cf308b277bc24c2bdac9f750fe3b66c2c648098176117433fbfe33725f0e5d397e7fc32e007998b6b8ccad67d5124d3a55824f603a795fdad299",
  "dcId": 2,
  "nextApiId": 2040,
  "dateUpdated": {
    "$date": "2025-08-26T07:56:55.461Z"
  },
  "phone": "+380505935310",
  "banned": false,
  "firstName": "Anton",
  "id": "8126726461",
  "lastName": "",
  "messageCount": 33,
  "username": "documents_in_Ukraine_2858",
  "personalChannelDate": {
    "$date": "2025-08-26T03:24:38.432Z"
  },
  "personalChannelError": "CHANNEL_NOT_FOUND",
  "lazyCheckDate": {
    "$date": "2025-08-25T15:26:44.692Z"
  },
  "automaticCheckDate": {
    "$date": "2025-08-26T07:56:55.461Z"
  },
  "remainingTime": {
    "$date": "2025-06-19T03:03:17.487Z"
  },
  "historySpamBlocks": [
    {
      "spamBlockDate": {
        "$date": "2025-05-20T11:32:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-06-20T03:31:00.000Z"
      },
      "spamBlockDays": 1
    }
  ]
},
{
  "_id": {
    "$oid": "680a147c461801f5999847f5"
  },
  "accountId": "7848717515-prefix-ukraine-documents",
  "dc2": "9f0cef29f1e4c99542cc1c435f286ba009d2e6aad3da7324925d40ed0ffb624d435b50026b807627264ffe00683ff31a5a08d7fb320ef7a373182d61e4a4b9dc0202765704d4c8d21f0b81171f5df1c32a594bbe7ef691121cc7c9bb5e6a02b9e4bda669f12da140743744c7babead699d281ba1211e9d7dac537c75101f83145eae5e4156aa3d09185e75dba6faab1e973fdfb7b697a12ba53f8c0c87b1f28f10d8354188113e51bac14c4b697361b74386ff9b466ac9e731da0c9e8ab5c32ae13a10f0fd68d4bc0e5c3ff2081836e9c24b48ced67bc8980e9d05dd0ad2b265f5ba40658f51f0a3700d301c877c8df6591faa490ec1818f02dd382470b94f27",
  "dcId": 2,
  "nextApiId": 2496,
  "dateUpdated": {
    "$date": "2025-08-26T08:12:24.930Z"
  },
  "twoFa": false,
  "twoFaDate": {
    "$date": "2025-08-23T10:13:36.366Z"
  },
  "phone": "+380972534557",
  "banned": false,
  "firstName": "Pavel",
  "id": "7848717515",
  "lastName": "",
  "messageCount": 42,
  "username": "documents_in_Ukraine_5740",
  "personalChannelDate": {
    "$date": "2025-08-26T03:24:32.428Z"
  },
  "personalChannelError": "CHANNEL_NOT_FOUND",
  "lazyCheckDate": {
    "$date": "2025-08-26T01:25:40.910Z"
  },
  "automaticCheckDate": {
    "$date": "2025-08-26T08:12:24.930Z"
  },
  "remainingTime": {
    "$date": "2025-06-19T14:32:40.659Z"
  }
},
{
  "_id": {
    "$oid": "680a147c461801f5999847f7"
  },
  "accountId": "6087139307-prefix-ukraine-documents",
  "dc2": "c3561748da867f8200e73ed5c30df2ff30ef3f2af40a8dbbd03bb39ef4058058999e47b056f136afc5ebe9d52ebaa2761529085734cc8d126885bc59ae1751a20b2e1d7da8a440dd81bb82ebba353ecff3891d14a3c7087d1be3c2517e414a2aed38952533a6ff5921347cc787241c61b2a28a88db0e20a5e7f97d0cf69b35a4dff8409775d0e32954eee34f7ef10a9f3fbefcd4b0dddb6c9023dd3cec358346f8b1438ec185d3891adbd2e3da2eff9220b1043c6d77d53dee6661a64a0dab3e8b0d37ef82dbdd0780a2a8f3dbfef6d2b655f1c84baebe773f581c93a94e9b0e6ee6e2cf412fee6a40af0e151a04e5c9300ce559a52488cfcc2c2ba57dd51114",
  "dcId": 2,
  "nextApiId": 611335,
  "dateUpdated": {
    "$date": "2025-08-26T07:50:54.438Z"
  },
  "twoFa": false,
  "twoFaDate": {
    "$date": "2025-08-23T10:13:36.364Z"
  },
  "phone": "+380964052137",
  "banned": false,
  "firstName": "Sergey",
  "id": "6087139307",
  "lastName": "",
  "messageCount": 31,
  "username": "documents_in_Ukraine_9045",
  "personalChannelDate": {
    "$date": "2025-08-26T03:24:34.071Z"
  },
  "personalChannelError": "CHANNEL_NOT_FOUND",
  "lazyCheckDate": {
    "$date": "2025-08-25T16:28:19.161Z"
  },
  "automaticCheckDate": {
    "$date": "2025-08-26T07:50:54.438Z"
  },
  "remainingTime": {
    "$date": "2025-06-19T14:01:26.547Z"
  },
  "historySpamBlocks": [
    {
      "spamBlockDate": {
        "$date": "2025-04-29T14:35:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-05-02T07:33:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-05-22T09:21:00.000Z"
      },
      "spamBlockDays": 3
    }
  ]
},
{
  "_id": {
    "$oid": "680a147c461801f5999847fb"
  },
  "accountId": "8112148386-prefix-ukraine-documents",
  "dc2": "4a4e4733a65133c93c69e1e72cce129d50b1e687d1e081efafe6c429788769dac60b3129b726268a6b4e26ddb32b68f7479e66ba86bad9cda13402fe1437a381f0cc3144701ccf4f31367b27eda10b78c806b8a63187775a12ed14b167ae5d3a0eb7039762706ece1c62d737effd9127e1762c2263278d77d3e6d717198cd37907571c01d8cc8fb1b243cc7513e21979fa337e514bc55072cf87b5ea1b741c7941fa25656a43f709b452ddcb75dffc14d3003dcfefbb39c4a5dac3181657e9ce9ae60dc36020479c4b7cd84153f7a9f2fa06e7cceaa7027a4899d5f1c94d2f7ab5591d455c4f31f4eb5b641b801c28d974d181415676af15c627b68d2311a7e4",
  "dcId": 2,
  "nextApiId": 2496,
  "dateUpdated": {
    "$date": "2025-08-26T07:57:52.423Z"
  },
  "twoFa": false,
  "twoFaDate": {
    "$date": "2025-08-23T10:13:44.033Z"
  },
  "phone": "+380977966182",
  "banned": false,
  "firstName": "Stepan",
  "id": "8112148386",
  "lastName": null,
  "messageCount": 38,
  "username": "documents_in_Ukraine_2777",
  "personalChannelDate": {
    "$date": "2025-08-26T03:24:35.766Z"
  },
  "personalChannelError": "CHANNEL_NOT_FOUND",
  "lazyCheckDate": {
    "$date": "2025-08-26T01:35:41.450Z"
  },
  "automaticCheckDate": {
    "$date": "2025-08-26T07:57:52.423Z"
  },
  "remainingTime": {
    "$date": "2025-06-19T16:33:49.879Z"
  },
  "historySpamBlocks": [
    {
      "spamBlockDate": {
        "$date": "2025-05-10T08:23:00.000Z"
      },
      "spamBlockDays": 3
    }
  ]
},
{
  "_id": {
    "$oid": "680a147c461801f599984801"
  },
  "accountId": "6771329695-prefix-ukraine-documents",
  "dc2": "a62b1b604b69cdc3308ff5a5fc968c32fce9a1cdf38f6458fa17cc9545e09af8cc07ba5977a9cbdfd87d5522692a8587b132346bc44faaddefe59aea1e42245fe2b396058f273b62da62ed0d88b103b56c9bdaa7f4ccb221cd0f342f1277adfdd2d0a9d68f72fd6e27af7d04d06adf847229e38dd87e14242bd11809194afd8dde039b29d2dcc8f1e4f5bddbc93b1a3238da1b1bb18c1398397f616a0b0ce5aaadf1d03104aaec3c198b58af44db266f9aa60c9f29f02f9e4f01ddfdcaae768ef9ce6864199c01031a2f95e7da9d63b5d21ff1af8543184c008a992313f8619a7ea2365aa516130e2e6e97e5ef67f20e6ce1f687db35ae0488ef407f290e4f8e",
  "dcId": 2,
  "nextApiId": 2040,
  "dateUpdated": {
    "$date": "2025-08-26T07:57:54.392Z"
  },
  "twoFa": false,
  "twoFaDate": {
    "$date": "2025-08-23T10:13:41.285Z"
  },
  "phone": "+380991365400",
  "banned": false,
  "firstName": "Arthur",
  "id": "6771329695",
  "lastName": "",
  "messageCount": 44,
  "username": "documents_in_Ukraine_1118",
  "personalChannelDate": {
    "$date": "2025-08-26T03:24:31.394Z"
  },
  "personalChannelError": "CHANNEL_NOT_FOUND",
  "lazyCheckDate": {
    "$date": "2025-08-25T17:55:28.297Z"
  },
  "automaticCheckDate": {
    "$date": "2025-08-26T07:57:54.392Z"
  },
  "remainingTime": {
    "$date": "2025-06-19T13:54:20.498Z"
  },
  "historySpamBlocks": [
    {
      "spamBlockDate": {
        "$date": "2025-04-28T05:18:00.000Z"
      },
      "spamBlockDays": 1
    }
  ]
},
{
  "_id": {
    "$oid": "680a147c461801f59998481d"
  },
  "accountId": "5570343727-prefix-ukraine-documents",
  "dc2": "4eb4be57ece8b0ac2fc9962364e61ef10875a5626e01701ea693487cd91fcc7b771d4a0c71e58dd09d5d4d6d317904820d5fafe936f384b1fc882f17827067b4b82764f9e564fec28773cfba9f4fae5e593e8b15042dbfcba61010ac4982a7115c286be5d9f6900ab5d0d75e02168ee39390b4be6de92c002e5d4cd8f016ee0e05b644aeb2cd2a837d67004947852d7abf917f4bb3a868ca9dcc8677dd3b6420615a5622c099268d2d0b26199a8ff673b820d15da9aaa826d793735483c649e3b600e451e5d6063ac63e93df7a1f0cc7147f80c7986369cb3e30925b6a1a205d5ed8828d17eb4b6f727e1527414502ddda7af0c82f4495691d980917d18fea4f",
  "dcId": 2,
  "nextApiId": 2040,
  "dateUpdated": {
    "$date": "2025-08-26T08:09:25.713Z"
  },
  "twoFa": false,
  "twoFaDate": {
    "$date": "2025-08-23T10:13:41.247Z"
  },
  "phone": "+380974044219",
  "banned": false,
  "firstName": "Oleg",
  "id": "5570343727",
  "lastName": null,
  "messageCount": 26,
  "username": "documents_in_Ukraine_8741",
  "personalChannelDate": {
    "$date": "2025-08-26T03:24:32.426Z"
  },
  "personalChannelError": "CHANNEL_NOT_FOUND",
  "lazyCheckDate": {
    "$date": "2025-08-25T15:45:43.169Z"
  },
  "automaticCheckDate": {
    "$date": "2025-08-26T08:09:25.713Z"
  },
  "remainingTime": {
    "$date": "2025-06-18T13:03:01.241Z"
  },
  "historySpamBlocks": [
    {
      "spamBlockDate": {
        "$date": "2025-04-30T06:47:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-05-04T12:59:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-05-15T06:20:00.000Z"
      },
      "spamBlockDays": 7
    },
    {
      "spamBlockDate": {
        "$date": "2025-05-20T14:52:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-06-21T11:03:00.000Z"
      },
      "spamBlockDays": 3
    }
  ]
},
{
  "_id": {
    "$oid": "680a147c461801f599984820"
  },
  "accountId": "6179319047-prefix-ukraine-documents",
  "dc2": "af3aca3351b04b13e81d1e8075c44c434fd1f65f2ac252875e32ead142caeb13a5757712acf331b30cc143c4c69d3d87ffbec6d7541df520ab832932a77bfd131abef6f3bbcc7814df0c98b9e0ac381b968d509a2209fb365c3b40f18421c7ebf80efda9adc2ff03710f0277c91d21a53aabb04425cf250d4c3b698e3048af1d85345408eca3e9ce1748c546784509b1f9569c1ab46210a3333355b9a1551292caf43b55ce69cbfc9eeed8d5244bdc47021daf1cbbd36f0bbd90f019d266e46ff5176d4a18c1060c1e3ed05f555c6549ae6060a4097eb2dd68bb28db842f85fef1f4f04e3d6ee81d6e86cfa9815bbd40686ce5085809f432025eb2179e7611d7",
  "dcId": 2,
  "nextApiId": 2040,
  "dateUpdated": {
    "$date": "2025-08-26T07:58:53.450Z"
  },
  "twoFa": false,
  "twoFaDate": {
    "$date": "2025-08-23T10:13:36.367Z"
  },
  "phone": "+380973307653",
  "banned": false,
  "firstName": "Gennady",
  "id": "6179319047",
  "lastName": null,
  "messageCount": 18,
  "username": "documents_in_Ukraine_1461",
  "personalChannelDate": {
    "$date": "2025-08-26T03:24:32.563Z"
  },
  "personalChannelError": "CHANNEL_NOT_FOUND",
  "lazyCheckDate": {
    "$date": "2025-08-25T23:29:26.891Z"
  },
  "automaticCheckDate": {
    "$date": "2025-08-26T07:58:53.450Z"
  },
  "historySpamBlocks": [
    {
      "spamBlockDate": {
        "$date": "2025-04-24T14:56:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-04-29T09:13:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-04-30T10:01:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-05-04T06:38:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-05-10T13:34:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-06-20T13:38:00.000Z"
      },
      "spamBlockDays": 7
    }
  ],
  "remainingTime": {
    "$date": "2025-06-13T15:20:00.357Z"
  }
},
{
  "_id": {
    "$oid": "680a147d461801f599984823"
  },
  "accountId": "1659345357-prefix-ukraine-documents",
  "dc2": "b0b276b24feda6c6c9fd5e21135463e9d0603b9f08f725bc22868e9202bd48e4e8b57741dc530facb8462b0d75bc21af9c972a55ab824a63e03733e16e71bdf69c88c72d93fc8f1bbed09f0a0cee15c3538061f4cf9cfaf2c3c0ed9d5cc483127a7b8565aab9623e45f67cf43dd4bdce9e6b5daa4b9ea97fa142e25d0737844c630e6df9593b99e2539b9c9654fac88a7a94559b5d1b47eb98c25ce87afe50179388b9c6e537e61ca55cb59d17e2388b7f0a07dad0c543a39f3e82e537934973fc589b15f8fdfc7f4204d4f6da4ddd03de53684e6de685620fb0623524617f16d71cd121e4125344dc10de6834b4bafec2019f8145a0b4401852b578f7b81d83",
  "dcId": 2,
  "nextApiId": 2040,
  "dateUpdated": {
    "$date": "2025-08-26T07:56:53.228Z"
  },
  "twoFa": false,
  "twoFaDate": {
    "$date": "2025-08-23T10:13:41.248Z"
  },
  "phone": "+380688940902",
  "banned": false,
  "firstName": "Dmitry",
  "id": "1659345357",
  "lastName": null,
  "messageCount": 46,
  "username": "documents_in_Ukraine_5341",
  "personalChannelDate": {
    "$date": "2025-08-26T03:24:34.689Z"
  },
  "personalChannelError": "CHANNEL_NOT_FOUND",
  "lazyCheckDate": {
    "$date": "2025-08-25T22:59:46.429Z"
  },
  "automaticCheckDate": {
    "$date": "2025-08-26T07:56:53.228Z"
  },
  "remainingTime": {
    "$date": "2025-06-19T16:05:08.524Z"
  }
},
{
  "_id": {
    "$oid": "680a147d461801f599984828"
  },
  "accountId": "5737159558-prefix-ukraine-documents",
  "dc2": "59f64455db9936de1269404b04a3625106658ed7a4aca811431d5f4cec3aa8bd9316b9ddf57bd4cd51ead1ea8357314948a3220af5f2d45a0b1e46c6a17e2afc5e9725daed253762ead701a7d095c30fa6bf685172eae67d90a43520b4696e44dba4b26684af84b69743e12eae72a9cd31c612c13fc5e2ff46cb3eda3d529812c7eadde650e0a3a135bdfd0d9c4acd81d30ace86fd6b069be38e8b43f87b3d6d6c1d508094b9c9fbf704a7c82a6fa8282a37d4a511f4f1c659ff71063ab86ad15b689df9541b1aaaeb7ce18038c5da270d5b1bf3dd9e216e3b95a746234d49fb893c793e3bbb92ef38ca46d8f6a4e6be8b0e1810d25fd0d6db094348986c9f0f",
  "dcId": 2,
  "nextApiId": 2040,
  "dateUpdated": {
    "$date": "2025-08-26T08:17:28.292Z"
  },
  "phone": "+380963039854",
  "banned": false,
  "firstName": "Artur",
  "id": "5737159558",
  "lastName": null,
  "messageCount": 40,
  "username": "documents_in_Ukraine_5621",
  "personalChannelDate": {
    "$date": "2025-08-26T03:24:38.397Z"
  },
  "personalChannelError": "CHANNEL_NOT_FOUND",
  "lazyCheckDate": {
    "$date": "2025-08-25T16:27:29.968Z"
  },
  "automaticCheckDate": {
    "$date": "2025-08-26T08:17:28.292Z"
  },
  "remainingTime": {
    "$date": "2025-06-19T09:29:54.483Z"
  },
  "historySpamBlocks": [
    {
      "spamBlockDate": {
        "$date": "2025-06-20T07:42:00.000Z"
      },
      "spamBlockDays": 1
    }
  ]
},
{
  "_id": {
    "$oid": "680a147d461801f59998482a"
  },
  "accountId": "6447254649-prefix-ukraine-documents",
  "dc2": "2f2eb68b24b27129316775912a82f506e02661b81a560a06355b4b08743470aecd3a0e9516973d94d142a419d333c2c07115e2c9d165680da499b5628747e2287a8bbbe61bb22763801b4be5fe54aa940ddc9e9393082e8a7d351e93b864f7a3dde9c4d463684b3b7432fd53dfc0caecdca7274365d15cbd5abc83a4ab69802b493923aae25ec5f0f608193e80b02439754fbfeaf76b064860f973427daba9995b95a3de74e903f722acde8020f0a1209de1c173237625a22a4b5689cf346050ec707e677341f97cd7df6bb57ca02bfb89619b4ba8b2de53b76401d4fdc34d53ac4b7f3a4a515201660ae242ca655db5dd7e5cafd635926f1c7bfab20568f2a5",
  "dcId": 2,
  "nextApiId": 2040,
  "dateUpdated": {
    "$date": "2025-08-26T07:53:56.967Z"
  },
  "twoFa": false,
  "twoFaDate": {
    "$date": "2025-06-20T19:40:26.252Z"
  },
  "phone": "+380669085401",
  "banned": false,
  "firstName": "Matvey",
  "id": "6447254649",
  "lastName": null,
  "messageCount": 48,
  "username": "documents_in_Ukraine_1819",
  "personalChannelDate": {
    "$date": "2025-08-26T03:24:38.215Z"
  },
  "personalChannelError": "CHANNEL_NOT_FOUND",
  "lazyCheckDate": {
    "$date": "2025-08-25T22:27:28.246Z"
  },
  "automaticCheckDate": {
    "$date": "2025-08-26T07:53:56.967Z"
  },
  "remainingTime": {
    "$date": "2025-06-19T14:32:02.724Z"
  }
},
{
  "_id": {
    "$oid": "680a147d461801f59998482c"
  },
  "accountId": "7165245950-prefix-ukraine-documents",
  "dc2": "958afacc6b0b4d44c22a98f515d0bf16ac83cfe599ce4bc08077bac2012f8765c16c9ee14d763e49ac4e3e5f254f93f2a6c7e79262841fd69327922c2f28942ded76ad6e3213639fa24db7017a0059e50bde21d99fec585bd779d11d29d486e319f5cf924a029d706dbdaceaabd0cd3ea14429c342eb91c5ea10eed7b9a3d2ac1c643d063c044979b893977e1ee540f86b35b730ade4f4f65ef4741302dce25a19d9074e14e3d46aa1d2e933f15ea67437100dd8d106c4573d1aa5d4892bfc167ce734b1517bb69e555b6bc69e0544fab2e072cfed4d1dbca193b4c0179a2684cea1776869a1c71a6475086758c7352dceb471b08ed249b9c80691941cc126ec",
  "dcId": 2,
  "nextApiId": 2496,
  "dateUpdated": {
    "$date": "2025-08-26T07:16:12.413Z"
  },
  "twoFa": false,
  "twoFaDate": {
    "$date": "2025-08-23T10:13:46.068Z"
  },
  "phone": "+380689724667",
  "banned": false,
  "firstName": "Viktor",
  "id": "7165245950",
  "lastName": null,
  "messageCount": 31,
  "username": "documents_in_Ukraine_9442",
  "personalChannelDate": {
    "$date": "2025-08-26T03:24:31.375Z"
  },
  "personalChannelError": "CHANNEL_NOT_FOUND",
  "lazyCheckDate": {
    "$date": "2025-08-26T05:29:17.877Z"
  },
  "automaticCheckDate": {
    "$date": "2025-08-26T07:16:12.413Z"
  },
  "historySpamBlocks": [
    {
      "spamBlockDate": "INFINITY",
      "spamBlockDays": 0
    }
  ],
  "remainingTime": {
    "$date": "2025-06-19T15:25:40.894Z"
  }
},
{
  "_id": {
    "$oid": "680a147d461801f59998482f"
  },
  "accountId": "5684983534-prefix-ukraine-documents",
  "dc2": "1567439b6c7f5d752959ab1c739c5a7018d4fa64675f04beda57a5782f61f93f53257c05ce1a8abe4c5c1a857586258b888a3fa2a0f3b813ae97c2608110ba714f22a4a50d5e5dbc4d200fe7296e086e2ca4deb143c5cc31af3ebb6397bc04feb1b7d783bae8b509a254118aabf0571db4d34109807a69459bc64783177ffd543375315a76a3106b6d7a6154e028d74e2b408bb6c1d462813ea5cd3ae45bb85e974e2557d26f1615695427d216e6b90845dbe14e21f5c6890a5b6246bbd9c8040422ff24687b3376a241bdce01679093c9b8930f9bf8f4fa1a31382c278c0447d3d9906b3b81e747b130e428d3812f39c7dee174954f8e6a7ec934b796519db8",
  "dcId": 2,
  "nextApiId": 2496,
  "dateUpdated": {
    "$date": "2025-08-26T07:46:52.365Z"
  },
  "twoFa": false,
  "twoFaDate": {
    "$date": "2025-08-23T10:13:43.532Z"
  },
  "phone": "+380990914152",
  "banned": false,
  "firstName": "Valeriy",
  "id": "5684983534",
  "lastName": null,
  "messageCount": 0,
  "username": "documents_in_Ukraine_9397",
  "personalChannelDate": {
    "$date": "2025-08-26T03:24:35.994Z"
  },
  "personalChannelError": "CHANNEL_NOT_FOUND",
  "lazyCheckDate": {
    "$date": "2025-08-26T00:15:49.382Z"
  },
  "automaticCheckDate": {
    "$date": "2025-08-26T07:46:52.365Z"
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
    "$date": "2025-04-24T11:24:25.935Z"
  },
  "spamBlockReasons": [
    {
      "reason": "Ive been mistakenly limited in reaching out to certain contacts, causing unnecessary communication barriers. I havent done anything wrong and would appreciate getting back full messaging capabilities. Please review my case.",
      "date": {
        "$date": "2025-04-28T10:37:43.052Z"
      }
    },
    {
      "reason": "My ability to communicate has been limited, yet Ive not engaged in any spamming or violated any rules. Please restore my messaging function, as I believe it was restricted by mistake.",
      "date": {
        "$date": "2025-04-29T12:56:46.086Z"
      }
    },
    {
      "reason": "I cant message new contacts, which limits my communication. I believe this is an error, as I havent done anything suspicious. Please restore full messaging access.",
      "date": {
        "$date": "2025-04-29T19:56:48.608Z"
      }
    },
    {
      "reason": "My account is currently limited to messaging mutual contacts only, despite no spam or violations on my part. I believe this restriction is a mistake as Ive followed all guidelines. Please review my account activity and lift this limitation, allowing me to message all users again.",
      "date": {
        "$date": "2025-05-04T08:23:25.005Z"
      }
    },
    {
      "reason": "My accounts messaging capability seems limited, allowing only mutual contact communication. I believe this restriction is a mistake as Ive followed all guidelines and havent engaged in any suspicious behavior. Please review and restore full messaging access.",
      "date": {
        "$date": "2025-05-04T19:27:25.778Z"
      }
    },
    {
      "reason": "I recently noticed that I can only message mutual contacts, which is limiting my ability to reach all my contacts. I believe this restriction was a mistake as I havent engaged in any suspicious activities. Please review my account and lift this limitation so I can communicate with everyone again.",
      "date": {
        "$date": "2025-05-04T21:09:00.573Z"
      }
    },
    {
      "reason": "My account is currently limited to messaging mutual contacts only. I believe this restriction was a mistake, as I havent engaged in any suspicious activity. I urgently need to send work messages, so I kindly request the restoration of my full messaging capabilities.",
      "date": {
        "$date": "2025-05-05T16:34:22.254Z"
      }
    },
    {
      "reason": "I havent spammed or violated any rules, but my accounts messaging is limited to mutual contacts only. This restriction seems like a mistake since Ive been a responsible user. Please review my account activity and lift this restriction, allowing me to message all users again.",
      "date": {
        "$date": "2025-05-09T15:35:53.954Z"
      }
    },
    {
      "reason": "I recently noticed a limitation on my account, preventing me from messaging non-mutual contacts. I believe this restriction was a mistake, as Ive always used Telegram responsibly and havent violated any guidelines. Please review my account activity and lift this restriction, allowing me to communicate freely again.",
      "date": {
        "$date": "2025-05-11T09:20:01.820Z"
      }
    },
    {
      "reason": "My accounts messaging capabilities are currently limited, preventing me from reaching all my contacts. I believe this restriction is a mistake, as Ive never engaged in any suspicious or harmful activities on Telegram. Please review my account and lift this limitation so I can communicate with my contacts without restrictions.",
      "date": {
        "$date": "2025-05-11T14:59:40.665Z"
      }
    },
    {
      "reason": "My accounts messaging capabilities seem limited, allowing me to only contact mutual friends. Ive never spammed or violated any rules, so this restriction feels like a mistake. Please review my account activity and lift this limitation, as Ive always used Telegram responsibly.",
      "date": {
        "$date": "2025-05-18T15:36:59.666Z"
      }
    },
    {
      "reason": "My accounts messaging capability is limited to mutual contacts, despite no spam or policy violations on my part. I believe this restriction is a mistake and request its removal, as Ive always adhered to Telegrams guidelines. Please review my account activity, which will confirm my compliance.",
      "date": {
        "$date": "2025-05-19T08:05:09.785Z"
      }
    },
    {
      "reason": "My account is currently limited to messaging mutual contacts only, which is preventing me from communicating with important contacts. I believe this restriction was applied mistakenly, as I have not engaged in any suspicious or harmful activities on the platform. Please review my account and lift this limitation so I can use Telegrams messaging features as intended.",
      "date": {
        "$date": "2025-05-23T20:16:52.847Z"
      }
    },
    {
      "reason": "I havent violated any community standards, but Im restricted to messaging only mutual contacts. This limitation is causing me to lose business opportunities, as I cant reach all my contacts who arent yet aware of my account. I need the restriction lifted to prevent further damage to my professional dealings.",
      "date": {
        "$date": "2025-06-26T14:34:51.185Z"
      }
    },
    {
      "reason": "Ive always adhered to Telegrams guidelines, never engaging in spam or any behavior that could be deemed inappropriate. Yet, I find myself restricted to messaging only mutual contacts, which is deeply concerning. This limitation has caused unnecessary worry for my family, who rely on Telegram to stay connected with me.",
      "date": {
        "$date": "2025-07-03T14:38:31.066Z"
      }
    },
    {
      "reason": "Ive always followed the rules, never engaging in any suspicious activity. Due to the messaging restrictions, Im unable to contact family and close friends, which is causing urgent deals to fall through. This is affecting my personal and professional life, and Im concerned about the long-term consequences.",
      "date": {
        "$date": "2025-07-07T23:04:56.738Z"
      }
    },
    {
      "reason": "I have not violated any terms of service or engaged in spamming activities on Telegram. Despite this, I am restricted to messaging only mutual contacts, which is impacting my ability to communicate effectively. As a result, I am losing business opportunities, and deals are falling through.",
      "date": {
        "$date": "2025-07-08T13:33:07.093Z"
      }
    },
    {
      "reason": "Ive always stuck to Telegrams rules and never spammed anyone. Because of the messaging restrictions, I cant reach key people outside my mutual contacts, and its messing up my projects. Id appreciate it if you could lift these limits so I can get back on track.",
      "date": {
        "$date": "2025-07-12T05:18:28.043Z"
      }
    },
    {
      "reason": "Ive never violated Telegrams rules or sent unwanted messages. The current messaging restrictions prevent people from contacting me, which is impacting my ability to communicate for important business deals and projects. I request that these restrictions be lifted to allow communication with non-mutual contacts.",
      "date": {
        "$date": "2025-07-12T09:12:06.327Z"
      }
    },
    {
      "reason": "Ive always followed the rules and never been involved in anything suspicious. Right now, I cant message some important contacts because they dont know my account yet, and its causing some serious issues. Id really appreciate it if the messaging restrictions could be lifted so I can reach out to them.",
      "date": {
        "$date": "2025-07-12T12:19:32.816Z"
      }
    },
    {
      "reason": "Ive always followed the rules and never engaged in any suspicious activity. The messaging restrictions are really impacting my work, as I cant reach important professional contacts who arent mutual friends. Id appreciate it if you could lift these restrictions so I can continue using Telegram for my business communication.",
      "date": {
        "$date": "2025-07-14T19:50:21.960Z"
      }
    },
    {
      "reason": "Ive always used my account responsibly, with no violations, and Im facing a tough situation. I need to message my family and close friends urgently, but the restrictions are preventing that. This is affecting my personal life and causing deals to fall through, which is really stressful.",
      "date": {
        "$date": "2025-07-15T14:19:25.927Z"
      }
    },
    {
      "reason": "Ive never spammed or violated any rules, but my account is restricted to messaging only mutual contacts. This limitation has halted my business operations, preventing me from reaching new clients and growing my network. Id appreciate a review of my account to lift these restrictions.",
      "date": {
        "$date": "2025-07-17T21:11:07.445Z"
      }
    },
    {
      "reason": "Ive always used my account properly, without any issues. But now, I can only message mutual contacts, which stops me from helping customers who need support. This restriction is holding up my work and Id appreciate it if it could be lifted.",
      "date": {
        "$date": "2025-07-24T22:07:31.132Z"
      }
    },
    {
      "reason": "Ive always followed Telegrams rules and never sent unwanted messages, but now I can only message mutual contacts. This restriction is affecting my business as I cant reach important clients, and my familys worried since they cant get in touch either. Itd be a huge help if these restrictions could be lifted.",
      "date": {
        "$date": "2025-07-26T00:12:12.080Z"
      }
    },
    {
      "reason": "I have not violated any platform rules or engaged in unwanted messaging, yet my account is restricted to mutual contacts only. This severely impacts my professional communication, as I rely on Telegram for work purposes. My work is stalled due to this restriction, and I request that it be lifted to allow me to continue my professional activities. (Note: I edited the last sentence to fit the character limit, while keeping the meaning intact. )Edited version (289 characters): Ive followed all platform rules and never sent unwanted messages, but my account is limited to mutual contacts. This restriction halts my professional communication, which relies heavily on Telegram. My work is stalled, and I need this restriction lifted to continue my professional activities.",
      "date": {
        "$date": "2025-07-27T23:16:24.795Z"
      }
    },
    {
      "reason": "Ive always used my account properly, without any violations of Telegrams terms. Despite this, Im restricted to messaging only mutual contacts. This limitation is causing business deals to fall through, impacting my ability to communicate effectively.",
      "date": {
        "$date": "2025-07-29T19:13:57.081Z"
      }
    },
    {
      "reason": "Ive always followed the rules, never engaging in any suspicious activity, yet Im restricted to messaging only mutual contacts. This limitation is causing me to lose clients as I cant communicate with essential medical professionals and emergency contacts. Im worried about the impact on my work and well-being.",
      "date": {
        "$date": "2025-07-30T11:47:01.318Z"
      }
    },
    {
      "reason": "Ive always followed the rules and never messaged anyone without reason. Because of the restriction, I cant reach my contacts who dont know my account, and its costing me clients. I need to message all my contacts to keep my business running.",
      "date": {
        "$date": "2025-08-05T18:02:11.320Z"
      }
    },
    {
      "reason": "Ive always used my account professionally and without violations. The messaging restrictions prevent me from reaching important contacts, which severely impacts my work. I kindly request a review to lift these restrictions, as they hinder my ability to communicate effectively.",
      "date": {
        "$date": "2025-08-06T09:33:48.945Z"
      }
    },
    {
      "reason": "Ive always followed the rules and never sent unsolicited messages, but now I can only message mutual contacts. This restriction is hurting my customer support work, and deals are falling through because I cant reach people who need help. Id appreciate it if you could lift this restriction so I can keep helping my customers.",
      "date": {
        "$date": "2025-08-07T10:51:59.122Z"
      }
    },
    {
      "reason": "I havent violated any community standards, but my account is restricted to messaging only mutual contacts. This limitation prevents me from coordinating essential volunteer work and community activities with people outside my network. I request lifting this restriction to restore full functionality.",
      "date": {
        "$date": "2025-08-14T12:12:26.882Z"
      }
    },
    {
      "reason": "Ive never gone against the terms of service or community guidelines, but the messaging restrictions are causing issues since I need to reach out to medical professionals and emergency contacts who arent mutual contacts. Because of this, important deals are falling through, and its affecting my ability to communicate effectively. Id appreciate it if these restrictions could be lifted so I can get back to normal.",
      "date": {
        "$date": "2025-08-21T12:39:42.823Z"
      }
    }
  ]
},
{
  "_id": {
    "$oid": "680a147d461801f599984839"
  },
  "accountId": "5473489200-prefix-ukraine-documents",
  "dc2": "4040f8c578a7c2a9741c697eff66825c2c9e437e9b51a22d9f8f5b20dfa0c123c9e7047f49b61d36aa5a2b0beac55ca89607c564e78f1fdc454bb038acd92483c0f2a1245a85688513eeb53867cc6ca17e435e69eecaa6ca09708fb61c8cea6d9a7cb966f12d403fa88899d8a5de3c83e1752156cb19354ee6e23b9c8f33c897841fd9d1cfef2a90a20ccac897890dec4340c8a32c2b9b4dceab11d0eb2ea064e04690a34deaa84f8f0f677cbca76879cb22806b632a41b1ecea99362f93aaedc808875404b97567a6c0ca389d32dc1cac8395299a5b2f8ee03878777da2a65d50357579b48f81676fedbc5fe51da18260243d93978682bfaafc2fd8b80d3e3d",
  "dcId": 2,
  "nextApiId": 2040,
  "dateUpdated": {
    "$date": "2025-08-26T08:12:25.272Z"
  },
  "twoFa": false,
  "twoFaDate": {
    "$date": "2025-08-23T10:13:44.297Z"
  },
  "phone": "+380936671450",
  "banned": false,
  "firstName": "Boris",
  "id": "5473489200",
  "lastName": null,
  "messageCount": 21,
  "username": "documents_in_Ukraine_2678",
  "personalChannelDate": {
    "$date": "2025-08-26T03:24:32.424Z"
  },
  "personalChannelError": "CHANNEL_NOT_FOUND",
  "lazyCheckDate": {
    "$date": "2025-08-25T17:56:26.479Z"
  },
  "automaticCheckDate": {
    "$date": "2025-08-26T08:12:25.272Z"
  },
  "remainingTime": {
    "$date": "2025-06-19T14:35:20.637Z"
  },
  "historySpamBlocks": [
    {
      "spamBlockDate": {
        "$date": "2025-04-27T10:47:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-05-02T06:34:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-05-09T10:36:00.000Z"
      },
      "spamBlockDays": 7
    },
    {
      "spamBlockDate": {
        "$date": "2025-06-17T13:38:00.000Z"
      },
      "spamBlockDays": 30
    },
    {
      "spamBlockDate": {
        "$date": "2025-07-19T17:20:00.000Z"
      },
      "spamBlockDays": 30
    }
  ]
},
{
  "_id": {
    "$oid": "680a147d461801f59998483d"
  },
  "accountId": "7587473962-prefix-ukraine-documents",
  "dc2": "9b550d4ea10f37cc4279852ae86a53e14c6de98c5038ad90d0b8a284f6e2db3873ef5be3582ac9bf4a8ce115286fd965b718a67cfe943216f8c0b34de87afaaaf2a3a5a79565d2b794de75b92f030a8ca62d4234eb6ff06db98f8f27cdf4da895973a65ba3acaf89b1af8ddb522a9238d0bce51bac1b1fdac7b1252445a70a82d638d34bf101570129b9a796eded93ca5f402f364028023e303201423bfaae31a3ac93781eeeb0172eb3edbe50b6d9932c96ebe3948c14b0663f702598e0c12c62655aaae1ce18a703290544e2555c670074db7329027b3584884aaa672f2ee339d47038cdd76ac7a86dcbdc11461000f6137ff04ee3a453ba34d8e117f56005",
  "dcId": 2,
  "nextApiId": 2496,
  "dateUpdated": {
    "$date": "2025-08-26T08:08:24.962Z"
  },
  "twoFa": false,
  "twoFaDate": {
    "$date": "2025-08-23T10:13:44.042Z"
  },
  "phone": "+380936013477",
  "banned": false,
  "firstName": "Ruslan",
  "id": "7587473962",
  "lastName": null,
  "messageCount": 41,
  "username": "documents_in_Ukraine_1204",
  "personalChannelDate": {
    "$date": "2025-08-26T03:24:31.393Z"
  },
  "personalChannelError": "CHANNEL_NOT_FOUND",
  "lazyCheckDate": {
    "$date": "2025-08-25T18:51:02.625Z"
  },
  "automaticCheckDate": {
    "$date": "2025-08-26T08:08:24.962Z"
  },
  "historySpamBlocks": [
    {
      "spamBlockDate": {
        "$date": "2025-05-24T09:39:00.000Z"
      },
      "spamBlockDays": 30
    },
    {
      "spamBlockDate": "INFINITY",
      "spamBlockDays": 0
    }
  ],
  "remainingTime": {
    "$date": "2025-06-19T16:30:57.430Z"
  }
},
{
  "_id": {
    "$oid": "680a147d461801f59998483f"
  },
  "accountId": "8058012128-prefix-ukraine-documents",
  "dc2": "66b8fca3a20d1380e7abb5843d4c8efc14fbed361f06f27f418444b51ed4e9f6dde73820a2764885a178ef85a9396dc6d37b187d1d330f50eaae00922d7d111e9e18fd89e594fbfad0d085c778573112d2e0ac3526ee1f1a2c7f842476c604216a59cc8f3a462f7969a1c5dcda2249e164a0f5c555b7062a021082014da1004aab0a303a262755db0a8cc87184e27d679c75bf4d4c3515582c9645a92cf3548b38779e1bf184b9b4cfa8a44e9d93f1b2389099e10051c26744b49478015e452b03547d4493964103574409272f8b1d1be62fe511738b7e7befc0b07341eb838ba891840d911a0b6307034ba3ea9e0ec8b6cb14cca07665bd78d25fbb647efd36",
  "dcId": 2,
  "nextApiId": 2496,
  "dateUpdated": {
    "$date": "2025-08-26T08:08:26.556Z"
  },
  "twoFa": false,
  "twoFaDate": {
    "$date": "2025-08-23T10:13:36.369Z"
  },
  "phone": "+380963517535",
  "banned": false,
  "firstName": "Sergey",
  "id": "8058012128",
  "lastName": null,
  "messageCount": 22,
  "username": "documents_in_Ukraine_7234",
  "personalChannelDate": {
    "$date": "2025-08-26T03:24:35.995Z"
  },
  "personalChannelError": "CHANNEL_NOT_FOUND",
  "lazyCheckDate": {
    "$date": "2025-08-26T02:04:17.817Z"
  },
  "automaticCheckDate": {
    "$date": "2025-08-26T08:08:26.556Z"
  },
  "historySpamBlocks": [
    {
      "spamBlockDate": {
        "$date": "2025-04-25T08:46:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-05-04T10:00:00.000Z"
      },
      "spamBlockDays": 7
    },
    {
      "spamBlockDate": {
        "$date": "2025-05-08T11:51:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-05-19T14:00:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-05-22T18:07:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-06-19T07:06:00.000Z"
      },
      "spamBlockDays": 1
    }
  ],
  "remainingTime": {
    "$date": "2025-06-19T15:13:31.587Z"
  }
},
{
  "_id": {
    "$oid": "680a147d461801f599984841"
  },
  "accountId": "7356040739-prefix-ukraine-documents",
  "dc2": "92279b2d18dda373329676d4a8f6cb14dc6015368807d1f9a916a4fb2ecf5c0c6c00103140a757a666565ae6a99e5c7269d4bf206c445af0c948076a767a096d9dde1111fab26fd258ea3ecba7d42ed4dd3fae0d226f4ea63594e2ee5da1f664ce2be05c66934e5fe1743859ce58749083b49ef33dd2305474f5acd8963a2d1242929addd57be3caa3eafaf98e5ab57efc3a6c9c29a27619036ab11932be5598d78828a9b540e23da0d9c19819e2520321d3435da513cabba93dc6a003fa563511f10644f8ee35ad6ce649030264f39b9be98b3f265f02c939d98858e62160dce506a7c51212653802c57bad7b9a28eb935f4cb2c37c974914727be72cec7672",
  "dcId": 2,
  "nextApiId": 2496,
  "dateUpdated": {
    "$date": "2025-08-26T08:21:24.178Z"
  },
  "twoFa": false,
  "twoFaDate": {
    "$date": "2025-08-23T10:13:44.806Z"
  },
  "phone": "+380634335908",
  "banned": false,
  "firstName": "Vitaliy",
  "id": "7356040739",
  "lastName": null,
  "messageCount": 40,
  "username": "documents_in_Ukraine_875",
  "personalChannelDate": {
    "$date": "2025-08-26T03:24:35.993Z"
  },
  "personalChannelError": "CHANNEL_NOT_FOUND",
  "lazyCheckDate": {
    "$date": "2025-08-25T18:38:04.737Z"
  },
  "automaticCheckDate": {
    "$date": "2025-08-26T08:21:24.177Z"
  },
  "historySpamBlocks": [
    {
      "spamBlockDate": {
        "$date": "2025-04-25T10:11:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-05-20T19:00:00.000Z"
      },
      "spamBlockDays": 1
    }
  ],
  "remainingTime": {
    "$date": "2025-06-19T15:57:49.591Z"
  }
},
{
  "_id": {
    "$oid": "680a147d461801f599984843"
  },
  "accountId": "7799661198-prefix-ukraine-documents",
  "dc2": "54994c4fc36c30942a86c40264e8c0002723aff4231f7b6c40eea8cecc821989c6c8d5ae1bbd045399a5ff2c71856d11167fdc5867349ea6e2d07ae6dd95387fa7b158f2d97323c0795e882f445b3ad09934dec39ba8e9fe1ac46f5a3db332db7b6d1813bbc57e09117af98f6709e505bd1940588e4d6fbf0d578485212908936d2040a688f39b804b6f13363e286193bb3d3dfb3a297f51b0d64827754dc61cc8ab19d437a2ffe4d241b861146174112351d96806f8ac5775cfee622c98a31f3115a27df3fad00ed6aeded6f3d9e35b411517a51771987112f8ee53912c7d4587d543a5acd4ca6db794eb36c2220999a972d723090c29ab23cc4affa9b6d53e",
  "dcId": 2,
  "nextApiId": 2496,
  "dateUpdated": {
    "$date": "2025-08-26T07:13:14.127Z"
  },
  "twoFa": false,
  "twoFaDate": {
    "$date": "2025-08-23T10:13:41.246Z"
  },
  "phone": "+380966395582",
  "banned": false,
  "firstName": "Victor",
  "id": "7799661198",
  "lastName": null,
  "messageCount": 19,
  "username": "documents_in_Ukraine_167",
  "personalChannelDate": {
    "$date": "2025-08-26T03:22:41.458Z"
  },
  "personalChannelError": "CHANNEL_NOT_FOUND",
  "lazyCheckDate": {
    "$date": "2025-08-25T16:50:06.197Z"
  },
  "automaticCheckDate": {
    "$date": "2025-08-26T07:13:14.127Z"
  },
  "historySpamBlocks": [
    {
      "spamBlockDate": "INFINITY",
      "spamBlockDays": 0
    },
    {
      "spamBlockDate": {
        "$date": "2025-05-19T22:34:00.000Z"
      },
      "spamBlockDays": 1
    }
  ],
  "remainingTime": {
    "$date": "2025-06-19T15:47:45.997Z"
  }
},
{
  "_id": {
    "$oid": "680a147d461801f599984852"
  },
  "accountId": "7537755826-prefix-ukraine-documents",
  "dc2": "b5e60a8288fb56139269ad42bf67b2276315bc6d0579ee5de44a705b6ea725d95f6bc5646dd264cf5c871fc19dd1e9b2bd220b8cf52bc055e0a62d3c980afb0a6d470735b002da0388a5739e5276559814b6b9378dff6f26b39ef9a228e6cb1b530ee4b1a6c48e95a73f36c3611209b84a83a351e2bf9853ae7159266504995784de5c91946568c57436e90cfe33c2cea7f2c53a1bbf7a65e95cdc3a79ee5c1745051e46e482ff49349dacd594a532e8de5f6c0ada530dbb1d4e896dea26b8234e5521e227066c491b0e10195b4017165fe6a8b67fbe5e39dd7e068376dc9dc31a13e33d3585ec71c68f8769ba583e30cff37170c5e3bf54448a6269047aeb74",
  "dcId": 2,
  "nextApiId": 2040,
  "dateUpdated": {
    "$date": "2025-08-26T07:07:13.255Z"
  },
  "twoFa": false,
  "twoFaDate": {
    "$date": "2025-08-23T10:14:00.315Z"
  },
  "phone": "+380992487697",
  "banned": false,
  "firstName": "Anton",
  "id": "7537755826",
  "lastName": null,
  "messageCount": 44,
  "username": "documents_in_Ukraine_6276",
  "personalChannelDate": {
    "$date": "2025-08-26T03:24:35.772Z"
  },
  "personalChannelError": "CHANNEL_NOT_FOUND",
  "lazyCheckDate": {
    "$date": "2025-08-25T16:54:06.675Z"
  },
  "automaticCheckDate": {
    "$date": "2025-08-26T07:07:13.255Z"
  },
  "historySpamBlocks": [
    {
      "spamBlockDate": {
        "$date": "2025-04-25T12:37:00.000Z"
      },
      "spamBlockDays": 2
    }
  ],
  "remainingTime": {
    "$date": "2025-06-19T15:23:26.942Z"
  }
},
{
  "_id": {
    "$oid": "680a147d461801f599984854"
  },
  "accountId": "6252055161-prefix-ukraine-documents",
  "dc2": "239db52460d61b95d14a764adb481fb6139bd4684deb6d4417b66f05551e947ec7c7b701ebd352bdc076313aff6ab8f4bf72ba13af703d6e71b807b4d751f6ab77ce3368d5aaa1c2991669e791fac00e07ae210f12ac38210740f07a24998472b632a3f693df4fa5f4d9c1449ce50b0d73fea74a50af7611fa270ea524c226f5badede919c4cf3508d56cc02d37ff89e7b61f9a8cb18fce43465fc2e8cbcfdc49b1ab7eca2426d38a1471e14dfdac070ebfcfa29d0d3743e31d02086e77323f3bee9d5dec230f452112701ae97f839735f8bf4583c8ee2f6a7e61860aad1ef53f6ca3fee7a22809b528a632fecb34f88356fea2a75b9cdc71614f264466b0482",
  "dcId": 2,
  "nextApiId": 2040,
  "dateUpdated": {
    "$date": "2025-08-26T07:44:54.546Z"
  },
  "twoFa": false,
  "twoFaDate": {
    "$date": "2025-08-23T10:13:43.524Z"
  },
  "phone": "+380935692305",
  "banned": false,
  "firstName": "Gennady",
  "id": "6252055161",
  "lastName": null,
  "messageCount": 15,
  "username": "documents_in_Ukraine_7386",
  "personalChannelDate": {
    "$date": "2025-08-26T03:24:31.370Z"
  },
  "personalChannelError": "CHANNEL_NOT_FOUND",
  "lazyCheckDate": {
    "$date": "2025-08-25T21:27:46.145Z"
  },
  "automaticCheckDate": {
    "$date": "2025-08-26T07:44:54.546Z"
  },
  "historySpamBlocks": [
    {
      "spamBlockDate": {
        "$date": "2025-04-30T07:52:00.000Z"
      },
      "spamBlockDays": 6
    },
    {
      "spamBlockDate": {
        "$date": "2025-05-31T10:43:00.000Z"
      },
      "spamBlockDays": 30
    },
    {
      "spamBlockDate": {
        "$date": "2025-05-19T13:34:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-05-20T21:12:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-06-21T13:14:00.000Z"
      },
      "spamBlockDays": 3
    }
  ],
  "remainingTime": {
    "$date": "2025-06-18T15:12:43.252Z"
  }
},
{
  "_id": {
    "$oid": "680a147d461801f599984858"
  },
  "accountId": "6785024984-prefix-ukraine-documents",
  "dc2": "36118c0fad21256fe23172a2bba3b462e47ee28810684b485c326dd7dad9ef2bde8f646cd1dcb16f069d661666093428c75fd6237a31a635e972cc9f292eed9ea97c65a2afc1744b460f9782dcbca360450f34cd780d7c118d818f3ea3897da4b57870b82b039e7fb2176fc4d85ea4c6b4d1e4bcabfc005473d96065435f4c1e1dd57d2b5a5cd6a694aa65909477b6126084600457cc2f22fc83b5494b4d9921e467e486f00d6b50cb6d81aa5f4957b501c4a410bce9be8830c667c4ff247b8f2ae07927a221bc919fdb186b9b0a967b24fe43efc26fafae2034a9e1c4ba66b1e3da76171ab777a936628c9ad9293954af363b8d4e302665f56a66b315bce826",
  "dcId": 2,
  "nextApiId": 2040,
  "dateUpdated": {
    "$date": "2025-08-26T08:10:24.845Z"
  },
  "twoFa": false,
  "twoFaDate": {
    "$date": "2025-08-23T10:13:41.106Z"
  },
  "phone": "+380967338919",
  "banned": false,
  "firstName": "Alexey",
  "id": "6785024984",
  "lastName": null,
  "messageCount": 21,
  "username": "documents_in_Ukraine_8697",
  "personalChannelDate": {
    "$date": "2025-08-26T03:24:34.690Z"
  },
  "personalChannelError": "CHANNEL_NOT_FOUND",
  "lazyCheckDate": {
    "$date": "2025-08-25T16:15:31.502Z"
  },
  "automaticCheckDate": {
    "$date": "2025-08-26T08:10:24.845Z"
  },
  "remainingTime": {
    "$date": "2025-06-19T15:23:34.337Z"
  },
  "historySpamBlocks": [
    {
      "spamBlockDate": {
        "$date": "2025-05-06T08:04:00.000Z"
      },
      "spamBlockDays": 7
    },
    {
      "spamBlockDate": {
        "$date": "2025-06-17T13:18:00.000Z"
      },
      "spamBlockDays": 30
    },
    {
      "spamBlockDate": {
        "$date": "2025-06-19T06:41:00.000Z"
      },
      "spamBlockDays": 1
    }
  ]
},
{
  "_id": {
    "$oid": "680a147d461801f59998485a"
  },
  "accountId": "7907047237-prefix-ukraine-documents",
  "dc2": "373cbfd79b7b28cfe30e7e2a4873e2591db5ac47496a80c1d95c96785ed81e4e6fecc9fa2defa2ea861e9723adc9fb53c59716eae0f3130fa05764eadd7b701d2d0cc4948a3ed7c57790c012e62556c135216f7c9cabfad498c39d5c21e1a7def007d409c579b4f40328159e7b83bf848dba0babc2f5fb0b5658dfc149855cd925c0e86f4f4ac945822c640179a22626f55bf3200cf3278a6d538e9117269df2a7643887d73c3f836dcafa668357cc5649e57572fdfcb2b5f25ce9183352ad4964049778ae336c77818c30b030281f7e29ab16ec9e131b9760514ad37d1468cf5fcd29506651e5210e2c343ce5396cc26c920d5f350d9de1672ffa7cbf18f8c8",
  "dcId": 2,
  "nextApiId": 2496,
  "dateUpdated": {
    "$date": "2025-08-26T07:23:12.316Z"
  },
  "twoFa": false,
  "twoFaDate": {
    "$date": "2025-08-23T10:13:44.038Z"
  },
  "phone": "+380984648347",
  "banned": false,
  "firstName": "Nikolay",
  "id": "7907047237",
  "lastName": "",
  "messageCount": 9,
  "username": "documents_in_Ukraine_9302",
  "personalChannelDate": {
    "$date": "2025-08-26T03:24:32.427Z"
  },
  "personalChannelError": "CHANNEL_NOT_FOUND",
  "lazyCheckDate": {
    "$date": "2025-08-25T17:43:24.062Z"
  },
  "automaticCheckDate": {
    "$date": "2025-08-26T07:23:12.316Z"
  },
  "historySpamBlocks": [
    {
      "spamBlockDate": "INFINITY",
      "spamBlockDays": 0
    },
    {
      "spamBlockDate": {
        "$date": "2025-06-19T10:30:00.000Z"
      },
      "spamBlockDays": 1
    }
  ],
  "remainingTime": {
    "$date": "2025-06-19T15:13:14.796Z"
  }
},
{
  "_id": {
    "$oid": "680a147d461801f599984863"
  },
  "accountId": "8001859366-prefix-ukraine-documents",
  "dc2": "50b0270fa455b149ba9fbbff0558be7fa7c022a7cdc77f13ee7f917e60f6ae69d4833d63022b00a68df53c058b7b5c6781d717dc872c82ca8de983f6f41527bafa6b0b9933cc4b1fe70f007492943ed5047aab55e56c14f45d2faede545004a8d1ab303fc3b9831a0233e690dc6fd221e22b980867941c662f15180132f0c03a37c5bf058b449b69083bd9ca1e527b5ded433d802dbf3508f345ef7752d7f823db0da6acc60f35f617a3a6e7f7a4ea38d2a4b65f367a2d562e52ec4c1cfc2da4f2f74011087e67a09e7e87e833a2fdc2f901998ad747760ece642cc948adeec5a0552be46be266cf0fe8fafaf293bce0112f4b82ee93a7220309c28019332dac",
  "dcId": 2,
  "nextApiId": 2040,
  "dateUpdated": {
    "$date": "2025-08-26T07:45:55.862Z"
  },
  "phone": "+380983896770",
  "banned": false,
  "firstName": "Vitaly",
  "id": "8001859366",
  "lastName": null,
  "messageCount": 45,
  "username": "documents_in_Ukraine_5227",
  "personalChannelDate": {
    "$date": "2025-08-26T03:24:39.178Z"
  },
  "personalChannelError": "CHANNEL_NOT_FOUND",
  "lazyCheckDate": {
    "$date": "2025-08-25T17:56:29.792Z"
  },
  "automaticCheckDate": {
    "$date": "2025-08-26T07:45:55.861Z"
  },
  "remainingTime": {
    "$date": "2025-06-19T13:57:23.868Z"
  }
},
{
  "_id": {
    "$oid": "680a147e461801f59998486d"
  },
  "accountId": "7014054507-prefix-ukraine-documents",
  "dc2": "8485bf289c8a9f289a460dc9a86528104b1f3f2e027c8f2f8181b42b733a5b47b1cec4b0984522ce95681da0a76ac5fd90a3518e3863bbdd4c4e4d809238b352119ed6df1b769a0ba91a4c891292e4b532be089419208690ac4a5bb0e67068b4594f97f92ea1fd4a9f2ab8c80da7c0100bc16db19508561fdae51997cfd5a0c2cd331006d11d4972ae271027d119e12c76e3ae1941f3b6f9ef72d742d2d19b63882e32b00baf11da16e34279328dd3a4660c2fd618e15133193f01c7b28acd59801db8574f1e527f139b36de0f7fddbdbb9be890d1eedf5905a3d8eb6c90906788e07ac9fa858baddaf22641307b8da87303981a39503f5f54a79185f483c42e",
  "dcId": 2,
  "nextApiId": 2040,
  "dateUpdated": {
    "$date": "2025-08-26T08:12:25.520Z"
  },
  "twoFa": false,
  "twoFaDate": {
    "$date": "2025-08-23T10:13:44.039Z"
  },
  "phone": "+380663394098",
  "banned": false,
  "firstName": "Petr",
  "id": "7014054507",
  "lastName": "",
  "messageCount": 0,
  "username": "documents_in_Ukraine_7717",
  "personalChannelDate": {
    "$date": "2025-08-26T03:24:36.571Z"
  },
  "personalChannelError": "CHANNEL_NOT_FOUND",
  "lazyCheckDate": {
    "$date": "2025-08-26T01:40:40.390Z"
  },
  "automaticCheckDate": {
    "$date": "2025-08-26T08:12:25.520Z"
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
    "$oid": "680a147e461801f599984878"
  },
  "accountId": "5707529498-prefix-ukraine-documents",
  "dc2": "b2cd76ff715553a68b9473d72e66a608d7ce54fa0933560d6673d9b484bf2d58157bb466ad207065091349fc9cf9ffd7e44c3f7260fba623b08e7929e54561bebf9365c5c5b783aeea849ef6a7f0ef0e3bb2dbd6cd00e78f218c20f8729f367cb5c28703563c6bdbcc1408cb043fc4c54e0b0d1cb64627c5dfcf89fb23658816964b9ce45900964fc766ac3ec2b61664ad32eb5034fdfeb11a8ad117149027930b3259a69f8d25417a4f2618e6d1321da8f55c09ad734420cc39309e384cd459cabf718c48cc80b9bc13e859ba0b918799a5ecfb569cdd5e3de1b87f912c1660c73a4520ed2a90c9fa4ae46cfcff9e1c72a8eba7c82816832343f0cf2e13054f",
  "dcId": 2,
  "nextApiId": 2040,
  "dateUpdated": {
    "$date": "2025-08-26T08:19:26.619Z"
  },
  "twoFa": false,
  "twoFaDate": {
    "$date": "2025-08-23T10:13:44.805Z"
  },
  "phone": "+380672698725",
  "banned": false,
  "firstName": "Fedor",
  "id": "5707529498",
  "lastName": null,
  "messageCount": 27,
  "username": "documents_in_Ukraine_1061",
  "personalChannelDate": {
    "$date": "2025-08-26T03:24:35.995Z"
  },
  "personalChannelError": "CHANNEL_NOT_FOUND",
  "lazyCheckDate": {
    "$date": "2025-08-25T19:27:09.455Z"
  },
  "automaticCheckDate": {
    "$date": "2025-08-26T08:19:26.619Z"
  },
  "historySpamBlocks": [
    {
      "spamBlockDate": "INFINITY",
      "spamBlockDays": 0
    },
    {
      "spamBlockDate": {
        "$date": "2025-05-08T07:59:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-06-19T11:30:00.000Z"
      },
      "spamBlockDays": 1
    }
  ],
  "remainingTime": {
    "$date": "2025-06-19T13:54:12.676Z"
  }
},
{
  "_id": {
    "$oid": "680a147e461801f59998488a"
  },
  "accountId": "7889529566-prefix-ukraine-documents",
  "dc2": "69a078a51db43ddce773f4dfb80c3cc3edd1ea640e2e9e6da9edfd3b1b78a10328cb666f4f59fbd814ab9629a20ea5624e9d9f00407258e1814198860421dc6fc08e1d2625c69b68ecf90afacdac95c231427341e734cae6b51a93767ed4ac78b6ad521235c00a84b928d3e9e571901b3ddb7567e8e8a9bf858c0147ba9556ae1151dcd5c394c80c246d6c94c458885112079e7d7d39d81f443d3d0bf48df2385bc61235d3bc7f52150812a83d65b68a5644d24e1c58e4f285ff996808b9a55a2c856a4224065937111988395ed8c0ef5af503208195f272f384a41efb0c1fdbb8eff6d3f1a77540ff21544b1186b946a8ea1f6f20f40f119d1f95548832e9da",
  "dcId": 2,
  "nextApiId": 2496,
  "dateUpdated": {
    "$date": "2025-08-26T08:15:25.132Z"
  },
  "twoFa": false,
  "twoFaDate": {
    "$date": "2025-08-23T10:13:39.900Z"
  },
  "phone": "+380966631125",
  "banned": false,
  "firstName": "Arthur",
  "id": "7889529566",
  "lastName": null,
  "messageCount": 25,
  "username": "documents_in_Ukraine_4322",
  "personalChannelDate": {
    "$date": "2025-08-26T03:24:32.425Z"
  },
  "personalChannelError": "CHANNEL_NOT_FOUND",
  "lazyCheckDate": {
    "$date": "2025-08-25T19:29:08.222Z"
  },
  "automaticCheckDate": {
    "$date": "2025-08-26T08:15:25.132Z"
  },
  "historySpamBlocks": [
    {
      "spamBlockDate": {
        "$date": "2025-04-25T09:49:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-04-29T08:43:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-04-30T09:18:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-05-10T10:24:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-05-20T14:52:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-06-19T11:40:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-06-22T12:02:00.000Z"
      },
      "spamBlockDays": 3
    }
  ],
  "remainingTime": {
    "$date": "2025-06-19T13:58:50.783Z"
  }
},
{
  "_id": {
    "$oid": "680a147e461801f59998488f"
  },
  "accountId": "7905126816-prefix-ukraine-documents",
  "dc2": "21159a17f884d3474902a97197bc82c1ab1a86b1591b561f341db72eae6cf907d5e8d72a4a15b7f67d6ed393358f266de3e4c17b11edfedf7cad9a0cf866d2f7a4dfadee16d91bfc0e314ff12129a226658f30a8062fe05c95675173f30af039e247d81d600dfbc0f1356bd1aea49b673a23075f03bc361b62ea0be32f00930edfeacc1724d180b12d603ecb00dd1df0cc9d5137fc760bb74407d659932ee01c231a6cef3d411d0c9a476cbc6763150573a9d87a7cc291ce4b5df3599e74da5927cdab432d1edab40ba9c064ddfb27e21ccfb56e0ad8d0804e4dad7f0608339a9e6964091826ddb7a4ff57a814273877892da1d48f635bf76a385400317f79aa",
  "dcId": 2,
  "nextApiId": 2496,
  "dateUpdated": {
    "$date": "2025-08-26T08:07:26.441Z"
  },
  "twoFa": false,
  "twoFaDate": {
    "$date": "2025-08-23T10:13:44.806Z"
  },
  "phone": "+380979626488",
  "banned": false,
  "firstName": "Leonid",
  "id": "7905126816",
  "lastName": null,
  "messageCount": 0,
  "username": "documents_in_Ukraine_1139",
  "personalChannelDate": {
    "$date": "2025-08-26T03:24:34.690Z"
  },
  "personalChannelError": "CHANNEL_NOT_FOUND",
  "lazyCheckDate": {
    "$date": "2025-08-26T01:42:44.450Z"
  },
  "automaticCheckDate": {
    "$date": "2025-08-26T08:07:26.441Z"
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
    "$oid": "680a147e461801f599984893"
  },
  "accountId": "7614952677-prefix-ukraine-documents",
  "dc2": "11207d3ceb8ca1cbd88932ec2bc0d6dbdabd45ee4be0870ac02ef157cbd2e3484c0db755109f379da8c1845100ac070774e05ac5afa75f25c2631f50079d54e897e6dd485d6c0ec031af21b3757233234c4b06eaed1171942b7060cb1e937bedf9fc633701ef77aa93be3a68b9a264588032bd424993bbbd88c6af0d973ec223923432451b9f7c9321a3c3eeae448bc8b822f296563c60e1b9962c4d3c6dcca1399de46abc45989d30c6200353914bdd8dfef6fc8a82a492a3a35905c07939f7d9d71a693614a2e1dedc78cf3f4b3a20f2844b9897fb8dc59d862b75e3d2c19941dcae0aa831c68cabc901d518afbeaba693a5ccf47619f62940a5dcf3ef399d",
  "dcId": 2,
  "nextApiId": 611335,
  "dateUpdated": {
    "$date": "2025-08-26T08:21:25.739Z"
  },
  "twoFa": false,
  "twoFaDate": {
    "$date": "2025-08-23T10:13:25.455Z"
  },
  "phone": "+380689671069",
  "banned": false,
  "firstName": "Vadim",
  "id": "7614952677",
  "lastName": null,
  "messageCount": 0,
  "username": "documents_in_Ukraine_3512",
  "personalChannelDate": {
    "$date": "2025-08-26T03:24:35.774Z"
  },
  "personalChannelError": "CHANNEL_NOT_FOUND",
  "lazyCheckDate": {
    "$date": "2025-08-25T17:54:24.268Z"
  },
  "automaticCheckDate": {
    "$date": "2025-08-26T08:21:25.739Z"
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
    "$oid": "680a147e461801f599984895"
  },
  "accountId": "6769965973-prefix-ukraine-documents",
  "dc2": "7b6aed3d8abcfef0da6ba8bb0b61c20f3f9034f1b187e1cb80112157874b0cf7fc37b2df90cfcb0ef44d8e49e4f346a1101c50ffb998ad0974a8ddeb98ea8666e60c5b417e75596a42cbdf5031417c1ddd3c0a8626b40d5467020203536d648ab92f9d31f688b5248d30d91a3d3f5682b35abfda7913836c5d31b98a6b3832f3010beb5e210af0352aeb5f20d42459edb718e02e5370ef91c8ee2a25dd8291f2770cd4271f6d920ba081377888b2896bca12113563a031cde6211b7f5ca7f5a288325b9b3fda0b64d2b1fffb4b71d441344f5213ecbb9ea1b34cc785ed3b784176014367110875bc3d20bc497ed9fc48852034ffb3dd1fdb40b279c1cffd88e2",
  "dcId": 2,
  "nextApiId": 2496,
  "dateUpdated": {
    "$date": "2025-08-26T08:11:49.929Z"
  },
  "twoFa": false,
  "twoFaDate": {
    "$date": "2025-08-23T10:13:29.149Z"
  },
  "phone": "+380982242770",
  "banned": false,
  "firstName": "Roman",
  "id": "6769965973",
  "lastName": "",
  "messageCount": 29,
  "username": "documents_in_Ukraine_4827",
  "personalChannelDate": {
    "$date": "2025-08-26T03:24:34.298Z"
  },
  "personalChannelError": "CHANNEL_NOT_FOUND",
  "lazyCheckDate": {
    "$date": "2025-08-26T05:49:09.988Z"
  },
  "automaticCheckDate": {
    "$date": "2025-08-26T08:11:49.929Z"
  },
  "remainingTime": {
    "$date": "2025-06-19T14:47:38.335Z"
  },
  "historySpamBlocks": [
    {
      "spamBlockDate": {
        "$date": "2025-04-27T17:38:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-05-02T08:53:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-05-06T15:04:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-05-11T08:31:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-05-19T19:57:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-06-14T13:28:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-06-19T09:20:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-06-26T15:47:00.000Z"
      },
      "spamBlockDays": 1
    }
  ]
},
{
  "_id": {
    "$oid": "680a147e461801f599984897"
  },
  "accountId": "5904887375-prefix-ukraine-documents",
  "dc2": "47eb52b2230204cd665c5f5397c3ecd9de521305d9adb51e39a853df1497e2bd5671effd24d283ccf1fb6388d70dcf4ba6790c9e291fb9bbde8b3e4f953bbe8887ef34c95e1a51991e8b4e3af1fb3ca4d06ae16279c07399cf82b91a88a293d575076e315c2bee0818176f05d29d7f6583017fc34036cf39d4c01cf3253f73233841a2e85e659f4492ec08ddb50bd2139f60ba862efa0903ced0f8168c8169ca5f53169a51346c371964dd31fd591bb527acd59a06a02e405d32a7b4e238d2b244fbd42547ca7f4542b58119395ab040a2cd5f0c2f9f1f436cf0c111d67fa46e57545ab455723651202665bfe6e5794ca6c3834aa808bcb6b3339453d31d9e1c",
  "dcId": 2,
  "nextApiId": 2496,
  "dateUpdated": {
    "$date": "2025-08-26T08:06:08.689Z"
  },
  "twoFa": false,
  "twoFaDate": {
    "$date": "2025-07-05T21:44:40.191Z"
  },
  "phone": "+380666482181",
  "banned": false,
  "firstName": "Gennady",
  "id": "5904887375",
  "lastName": "",
  "messageCount": 40,
  "username": "documents_in_Ukraine_5747",
  "personalChannelDate": {
    "$date": "2025-08-26T03:28:10.635Z"
  },
  "personalChannelError": "CHANNEL_NOT_FOUND",
  "lazyCheckDate": {
    "$date": "2025-08-25T16:59:11.896Z"
  },
  "automaticCheckDate": {
    "$date": "2025-08-26T08:06:08.688Z"
  },
  "remainingTime": {
    "$date": "2025-06-19T14:03:24.847Z"
  },
  "historySpamBlocks": [
    {
      "spamBlockDate": {
        "$date": "2025-04-28T13:21:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-05-03T07:20:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-06-20T12:10:00.000Z"
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
    "$oid": "680a147e461801f5999848a2"
  },
  "accountId": "6311611001-prefix-ukraine-documents",
  "dc2": "3ec2128640e48dabe6f4f7a531c7040202f732803d095479a4734a67dc526a47e11908f6188366bc082a9b3cd7d94786458413ee583c571457be37dbdeea5f9fe6c87a77f0aff51ef7d23655fd05d8f23bc0c86cdb4d2054d7eb565dc07acdec3e500a1fdbd15c8cdce76c781e45878a73e19e2e4f2bab0d8d29ae7e8c1b1406d67a7f33987b161e64b58e0259202570c2c2bb68afe959206ab9870cfd3b80095bd4fd0c9807a22b9ba922b981f3f651fd5ccb9aaf215e80d2161f8fe904a9bb6e8a1b773a57259fc802faf439604c92f7b923afd404660c26055c809961d5a8cd4990b48a7fe3738cdee40d90d21d774ef6cb7ba48a314d3f3331b18104fc81",
  "dcId": 2,
  "nextApiId": 2040,
  "dateUpdated": {
    "$date": "2025-08-26T08:11:50.842Z"
  },
  "twoFa": false,
  "twoFaDate": {
    "$date": "2025-08-23T10:13:29.140Z"
  },
  "phone": "+380980108716",
  "banned": false,
  "firstName": "Vadim",
  "id": "6311611001",
  "lastName": null,
  "messageCount": 19,
  "username": "documents_in_Ukraine_3454",
  "personalChannelDate": {
    "$date": "2025-08-26T03:24:40.296Z"
  },
  "personalChannelError": "CHANNEL_NOT_FOUND",
  "lazyCheckDate": {
    "$date": "2025-08-26T01:42:37.591Z"
  },
  "automaticCheckDate": {
    "$date": "2025-08-26T08:11:50.842Z"
  },
  "historySpamBlocks": [
    {
      "spamBlockDate": "INFINITY",
      "spamBlockDays": 0
    }
  ],
  "remainingTime": {
    "$date": "2025-06-19T15:50:44.045Z"
  }
},
{
  "_id": {
    "$oid": "680a147e461801f5999848b2"
  },
  "accountId": "8017535472-prefix-ukraine-documents",
  "dc2": "6246dd20c1edab399e0bd3c3ee05cf85eed7b5ca74afea2ee2be4fbc6ca0da6b168c2742f11dfb0022a69cfdc4f4bc929f55d6cd14857a2bca16ec7aa135892820ec65cc1b5ef1de6b6683384574496cbca25b17491cc11d67dae50906534e8b2b39f57d5e5c02549b3c0ad1719db31828cb6101dbb49ae2d4eaed2ffc11b974cdfaf87e18e29452bfe93ea561c11a594158e5bb053ff306f120a79da89e16b67a5f274527c1a654cbf1ce00f3f4592826d1b061b8cde080026de121a6d6eca2dd09ed507a55cb516f8fdcc1bce545edb6effa679de4a6c4fabeb92efad7d0ad06a2f5f08a4e8744500975e5e6a38ed635828b5998df43ad27f735e6cf777edd",
  "dcId": 2,
  "nextApiId": 2496,
  "dateUpdated": {
    "$date": "2025-08-26T08:08:50.766Z"
  },
  "twoFa": false,
  "twoFaDate": {
    "$date": "2025-08-23T10:13:29.419Z"
  },
  "phone": "+380931412878",
  "banned": false,
  "firstName": "Andrew",
  "id": "8017535472",
  "lastName": null,
  "messageCount": 31,
  "username": "documents_in_Ukraine_1758",
  "personalChannelDate": {
    "$date": "2025-08-26T03:24:37.220Z"
  },
  "personalChannelError": "CHANNEL_NOT_FOUND",
  "lazyCheckDate": {
    "$date": "2025-08-25T17:55:27.410Z"
  },
  "automaticCheckDate": {
    "$date": "2025-08-26T08:08:50.766Z"
  },
  "historySpamBlocks": [
    {
      "spamBlockDate": "INFINITY",
      "spamBlockDays": 0
    },
    {
      "spamBlockDate": {
        "$date": "2025-04-30T11:24:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": "INFINITY",
      "spamBlockDays": 0
    },
    {
      "spamBlockDate": {
        "$date": "2025-06-22T04:46:00.000Z"
      },
      "spamBlockDays": 3
    }
  ],
  "remainingTime": {
    "$date": "2025-06-19T01:20:45.344Z"
  }
},
{
  "_id": {
    "$oid": "680a147e461801f5999848b5"
  },
  "accountId": "8135571826-prefix-ukraine-documents",
  "dc2": "7df5749c79f851fa0ec2164708f297f7f7134dc7957c0ce36ca306956a454b1ed8823357e7b97bb25ee1082a2b993e98d40a8f000571ee806bf6e4aaae68289e9a48fb24c508c4fc96c5f4413c33a9bb29cd07c6305470a25678e79fd91a952a0913c6a6ff76ef7c3135f3832dc9fef805abb929c89185c9e991aafd0ccb152c6af5050b4f6e3f63fd21b9a595a0666944ceaaff0d1b6cd40ee28933469089dd7613cadbb2391b810b3120a47875e524ed57e0938275acd47361fc694afb1ec4d83b078d142f3729c6df3b1f77da9b2860365b891057c8547fff4334aff7d9e4820779a4af57328afdfbb509c5c1560e0bc5fc17129c101582f4a4a7c6223eee",
  "dcId": 2,
  "nextApiId": 611335,
  "dateUpdated": {
    "$date": "2025-08-26T07:53:23.131Z"
  },
  "twoFa": false,
  "twoFaDate": {
    "$date": "2025-08-23T10:13:31.120Z"
  },
  "phone": "+380970361344",
  "banned": false,
  "firstName": "Victor",
  "id": "8135571826",
  "lastName": "",
  "messageCount": 0,
  "username": "documents_in_Ukraine_3145",
  "personalChannelDate": {
    "$date": "2025-08-26T03:24:37.219Z"
  },
  "personalChannelError": "CHANNEL_NOT_FOUND",
  "lazyCheckDate": {
    "$date": "2025-08-25T16:27:24.511Z"
  },
  "automaticCheckDate": {
    "$date": "2025-08-26T07:53:23.131Z"
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
    "$oid": "680a147e461801f5999848b7"
  },
  "accountId": "7998388439-prefix-ukraine-documents",
  "dc2": "bcffd2c7082d481dbb2616c65bbe2aeb16610e85797bf5e26432dd8b4f5ec3c9735080f24dfe4fbf004d972e8da0a2578fc64bafec33571aee91080dc69e56ecbb18b5bde01817c334dca0b5b5a48677965d45b5887500776b7b9dd74971ab83aa4691289de57a6cf6a2fbe156eb12999a498a29577a4221036d5e472cfda253a1252fc42d79d1e21443eca289bdf4bf03dccd4d717b3f5322c4efc86b0c3275e8cdf92a0fd889144645db8c9128d1d449469da0f46a0af60dbc8c4460505ab8be28c2a0082456b9a7d885ecc0b2b0f65e48c6f2ce77a4fea6be1239f2d267fef385077a91a6eb54041c6cd36b8c8b7b56ee7680b5f8824eed02cbb4ad25da57",
  "dcId": 2,
  "nextApiId": 611335,
  "dateUpdated": {
    "$date": "2025-08-26T08:19:49.843Z"
  },
  "twoFa": false,
  "twoFaDate": {
    "$date": "2025-08-23T10:13:36.402Z"
  },
  "phone": "+380978833725",
  "banned": false,
  "firstName": "Andrew",
  "id": "7998388439",
  "lastName": null,
  "messageCount": 0,
  "username": "documents_in_Ukraine_3622",
  "personalChannelDate": {
    "$date": "2025-08-26T03:24:34.296Z"
  },
  "personalChannelError": "CHANNEL_NOT_FOUND",
  "lazyCheckDate": {
    "$date": "2025-08-25T23:52:30.656Z"
  },
  "automaticCheckDate": {
    "$date": "2025-08-26T08:19:49.843Z"
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
    "$oid": "680a147e461801f5999848bd"
  },
  "accountId": "7735335105-prefix-ukraine-documents",
  "dc2": "63c6de93b9c89a1613fb1b5551e9769fbe563e7727e1427cdaf00ce0c159d3df54087a64483bcb9d90ea20665a24a1742a32fb89e474fed54a75e8cf042c09274de13b26521cd4f18752c3bd57e6fd22c150f2a0933558218927fb225e08bec246eee80f016b674280f3487e70d8c3b86b9e7a32ae76247f2b6e0ada3a20ba9efd6ec91ff10eb491f192fcc20c476ca5c10a50590af7ae76be2579ae8edc5bbc41617dd62ef0e60ac0cc097c724848586a643cd1acd0d92577864db5a035a8da2edfcffcc8f81da9738aa01b94e6aba264158adf3ff458adc71c02bc931c79b47a9867315428eb7387fbab9b2b254704808122f118ebd1dad0dbe683b08c8b9e",
  "dcId": 2,
  "nextApiId": 611335,
  "dateUpdated": {
    "$date": "2025-08-26T08:17:52.407Z"
  },
  "twoFa": false,
  "twoFaDate": {
    "$date": "2025-08-23T10:13:31.093Z"
  },
  "phone": "+380991915658",
  "banned": false,
  "firstName": "Sergey",
  "id": "7735335105",
  "lastName": null,
  "messageCount": 0,
  "username": "documents_in_Ukraine_1650",
  "personalChannelDate": {
    "$date": "2025-08-26T03:26:24.993Z"
  },
  "personalChannelError": "CHANNEL_NOT_FOUND",
  "lazyCheckDate": {
    "$date": "2025-08-25T18:33:53.265Z"
  },
  "automaticCheckDate": {
    "$date": "2025-08-26T08:17:52.407Z"
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
    "$oid": "680a147e461801f5999848c6"
  },
  "accountId": "6628822591-prefix-ukraine-documents",
  "dc2": "a0ca377dc5b4094775f71a7bf2d54ce342acfaf00219e720684aac37edc58006f4ef24ed6d5afc0113e6e3610faa7b031a351869773416a8d825bb9a6fabb820e5dc6acd42883ed321fbbea05003bf5545df23e9e922ff200f2b11ec14246a9478c1f00a9d3005b9279b917be1e92657adc7c2c679c07c55d101f1d791b32f0bb227e0ee2411206b658677f65ae4d8bf43a059a197b77e0cdfad86f9ff6113998178fa27026211ffda4fad328cb810caa7dcbc265693ca377c809f44d73da1be7849562e19bffa8de5f048e47e2c9e919ba19ec72e0ad0348a8343446f9368f46bcac2df7dc57c30c033dd8a71d78c6a56c66a1d71efb53dc3df1dc1f58fbc4d",
  "dcId": 2,
  "nextApiId": 2496,
  "dateUpdated": {
    "$date": "2025-08-26T08:18:52.037Z"
  },
  "twoFa": false,
  "twoFaDate": {
    "$date": "2025-08-23T10:13:29.150Z"
  },
  "phone": "+380980030818",
  "banned": false,
  "firstName": "Sergey",
  "id": "6628822591",
  "lastName": null,
  "messageCount": 0,
  "username": "documents_in_Ukraine_450",
  "personalChannelDate": {
    "$date": "2025-08-26T03:26:28.796Z"
  },
  "personalChannelError": "CHANNEL_NOT_FOUND",
  "lazyCheckDate": {
    "$date": "2025-08-25T19:13:50.856Z"
  },
  "automaticCheckDate": {
    "$date": "2025-08-26T08:18:52.037Z"
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
    "$date": "2025-04-24T11:09:43.721Z"
  },
  "spamBlockReasons": [
    {
      "reason": "Im unable to send messages on my account, despite no violations. Please restore this function, as I believe my account was restricted by mistake. I havent engaged in any harmful behavior.",
      "date": {
        "$date": "2025-04-28T10:34:26.449Z"
      }
    },
    {
      "reason": "I recently noticed I cant send messages to non-mutual contacts, despite following Telegrams rules. Id like to get my full messaging access back, as this restriction seems like an error. Kindly review my account status.",
      "date": {
        "$date": "2025-04-29T12:55:34.626Z"
      }
    },
    {
      "reason": "Im unable to message anyone outside my contact list, despite following Telegrams guidelines. This seems to be an error, as Ive never been involved in any suspicious activities or violations. Kindly review and restore my full messaging capabilities.",
      "date": {
        "$date": "2025-04-29T20:14:15.998Z"
      }
    },
    {
      "reason": "I need to send a work message urgently, but my accounts messaging is limited to mutual contacts only. I believe this restriction is a mistake as I havent violated any rules or engaged in suspicious behavior. Please restore my full messaging capabilities immediately.",
      "date": {
        "$date": "2025-05-04T08:13:24.073Z"
      }
    },
    {
      "reason": "I believe my accounts messaging capabilities were mistakenly limited. Ive never engaged in any suspicious behavior, and this restriction hinders my communication with important contacts. Please review my account activity and restore my ability to send messages freely.",
      "date": {
        "$date": "2025-05-04T19:34:42.126Z"
      }
    },
    {
      "reason": "I recently noticed that my accounts messaging capabilities are limited to mutual contacts only. I believe this restriction is a mistake as I have not violated any rules or engaged in spamming activities. I kindly request a review and restoration of my full messaging privileges, as my account remains active and I have not received any prior warnings.",
      "date": {
        "$date": "2025-05-09T15:25:29.574Z"
      }
    },
    {
      "reason": "I cant send messages to non-mutual contacts, which is blocking important communication. I believe this restriction was a mistake as Ive not engaged in any suspicious activity. Please review my account and lift this limitation so I can use Telegram as intended.",
      "date": {
        "$date": "2025-05-16T15:30:12.169Z"
      }
    },
    {
      "reason": "My accounts messaging ability is limited to mutual contacts only, which is causing issues as I need to reach important people. I believe this restriction was a mistake since Ive never engaged in any suspicious behavior on Telegram. Please restore my full messaging capabilities, as this limitation is not a suspension and doesnt reflect my accounts usual activity.",
      "date": {
        "$date": "2025-05-19T08:19:40.385Z"
      }
    },
    {
      "reason": "My account is currently limited to sending messages only to mutual contacts, despite no spamming or violations on my part. I believe this restriction was applied mistakenly, as I havent engaged in any suspicious activities. Please review and lift this limitation, allowing me to message all users again.",
      "date": {
        "$date": "2025-05-26T08:37:47.876Z"
      }
    },
    {
      "reason": "Ive never violated any terms or guidelines, yet my messaging is restricted to mutual contacts only. This means my family and close friends cant reach me in urgent situations, which is causing a lot of worry and inconvenience. I kindly ask for a review of my account to lift these restrictions and restore my ability to communicate freely.",
      "date": {
        "$date": "2025-06-26T14:41:02.962Z"
      }
    },
    {
      "reason": "Ive always used my account responsibly, without any violations, and now Im restricted to messaging only mutual contacts. This limitation is hindering my ability to coordinate volunteer work and community activities with people outside my network, causing projects to stall and fail. As a result, valuable initiatives are suffering, and Im deeply concerned about the consequences for our community.",
      "date": {
        "$date": "2025-07-02T15:55:54.555Z"
      }
    },
    {
      "reason": "I have never sent spam or engaged in suspicious activities. The messaging restriction limits me to mutual contacts only, which stalls my work as a customer support provider, preventing me from assisting those in need. I request this restriction be lifted to restore my ability to provide essential services.",
      "date": {
        "$date": "2025-07-09T16:28:48.498Z"
      }
    },
    {
      "reason": "Ive never broken any rules or sent unwanted messages. Because of the messaging restrictions, people who need help cant reach me. I provide customer support, so this limitation really impacts my ability to assist others.",
      "date": {
        "$date": "2025-07-12T05:12:01.900Z"
      }
    },
    {
      "reason": "I have never sent spam or engaged in suspicious activities, yet Im restricted to messaging only mutual contacts. This limitation severely impacts my small business, as I cant reach customers and suppliers who arent in my mutual contacts. As a result, people cant get in touch with me, which is affecting my ability to operate and maintain relationships.",
      "date": {
        "$date": "2025-07-12T08:51:33.832Z"
      }
    },
    {
      "reason": "Ive always followed the rules, never spammed, and kept my account clean. Because of the messaging restrictions, I cant reach non-mutual contacts, which is holding up important business deals and projects. Lifting this restriction would let me get back to work without any issues.",
      "date": {
        "$date": "2025-07-12T12:18:03.191Z"
      }
    },
    {
      "reason": "I have never engaged in suspicious activity or violated any rules. Due to the current messaging restrictions, people who need customer support cannot reach me. Lifting this restriction would allow me to continue providing essential assistance to those in need.",
      "date": {
        "$date": "2025-07-15T14:45:05.472Z"
      }
    },
    {
      "reason": "Ive never broken any community guidelines, but now I cant message anyone outside my mutual contacts. This restriction means I cant reach some important people, and my family is worried because they cant get in touch with me easily. Please lift this restriction so I can stay connected.",
      "date": {
        "$date": "2025-07-17T20:11:07.621Z"
      }
    },
    {
      "reason": "Ive never sent spam or done anything suspicious, but now Im stuck with this messaging restriction. My business relies on quick communication with new contacts, and this limitation is holding me back. I need to connect with non-mutual contacts to keep things moving.",
      "date": {
        "$date": "2025-07-24T20:32:58.583Z"
      }
    },
    {
      "reason": "Ive never sent spam or done anything sketchy, but now I cant message anyone who isnt a mutual contact. This is a huge problem because I need to reach medical professionals and emergency contacts, and my familys really worried about me not being able to get help if I need it. Id appreciate it if you could lift the restriction so I can stay in touch with the people I need to.",
      "date": {
        "$date": "2025-07-25T23:57:50.088Z"
      }
    },
    {
      "reason": "Ive never been involved in any suspicious activity or broken any rules, so Im not sure why my messaging is restricted. This has left me unable to contact my team, which has brought my work to a standstill. I need to be able to message my mutual contacts to get things moving again.",
      "date": {
        "$date": "2025-07-31T20:16:01.242Z"
      }
    },
    {
      "reason": "Ive always followed Telegrams rules and never spammed anyone. The messaging restrictions are making it hard for me to coordinate volunteer work and community activities with people outside my mutual contacts. Because of this, my projects are struggling and might fail.",
      "date": {
        "$date": "2025-08-06T09:31:22.229Z"
      }
    },
    {
      "reason": "Ive always used my account responsibly and never violated any rules. This messaging restriction is really impacting my work since I cant message anyone unless we have mutual contacts. Because of this, people cant reach me, and its causing issues for my professional communication.",
      "date": {
        "$date": "2025-08-07T10:54:33.431Z"
      }
    },
    {
      "reason": "Ive always followed the rules, never spammed or done anything suspicious, but the messaging restrictions are hurting my small business. I cant reach customers and suppliers who arent mutual contacts, which means people cant get in touch with me either. This is affecting my ability to run my business and communicate with those who need me.",
      "date": {
        "$date": "2025-08-14T11:24:40.198Z"
      }
    },
    {
      "reason": "Ive always used my account responsibly, without any violations. The messaging restrictions are now hindering my business, as I need to communicate with non-mutual contacts for important deals and projects. My work is stuck, and Id appreciate it if these restrictions could be lifted.",
      "date": {
        "$date": "2025-08-16T21:35:28.711Z"
      }
    },
    {
      "reason": "Ive always followed the rules and never engaged in any suspicious activity on Telegram. Because of the messaging restrictions, people cant reach me, and I cant message my contacts who dont know about my account yet. I need to urgently get in touch with them for important matters.",
      "date": {
        "$date": "2025-08-23T22:21:29.918Z"
      }
    }
  ]
}]

const zanos = async () => {
  try {
    console.log(accounts.length);
    // return
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
        accountId: `${id}-prefix-aisender-infobiz`,
        dcId,
        nextApiId,
        reason: null,
        banned: false,
        username: null
      };

      data[`dc${account.dcId}`] = account[`dc${account.dcId}`];

      console.log(`${account[`dc${account.dcId}`]}:${account.dcId}`);
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
