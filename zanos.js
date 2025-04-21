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
    "$oid": "67dd2adaf5fa1dc49466c6bc"
  },
  "accountId": "6428866993-prefix-female-casino",
  "dc4": "b9b607bde0ce16b69bd2e2acf8fedf861fbdc7994509ec1d57b04ecdc9791787172cd9f783e676f6fd2d09f6a9b700cb54a03b60c722a5402515521ee044553a2ced69c443691da3347ac601706460ef01264b13a84862c0b84d8c1bd2f23c255d4c2bb1b8d15cd76f489fca1c135810a02fc736e5bb1a6c5168a15c497ed06fa3c4bd4c09422af2b150fe42791417fae1dc3e0ae023c9ff7b402c4c9385391d47c13c3f39cff46df7ae9b7cbf1563a9c733f46f4af0171ac09b24bb113a8e81ca66953868c97eae8c2f2fbc13db92733fa9d853c1b8b931411020235944d5baf25afe5d7e5cf0184b2c364dfc7f1b02c554356da2062b3fb387dc4887922ab5",
  "dcId": 4,
  "nextApiId": 2040,
  "dateUpdated": {
    "$date": "2025-04-21T13:19:23.235Z"
  },
  "banned": false,
  "firstName": "Inna",
  "id": "6428866993",
  "lastName": "Melnikova",
  "messageCount": 37,
  "automaticCheckDate": {
    "$date": "2025-04-21T13:19:23.235Z"
  },
  "remainingTime": {
    "$date": "2025-04-09T12:49:36.772Z"
  },
  "historySpamBlocks": [
    {
      "spamBlockDate": {
        "$date": "2025-03-29T08:22:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-04-14T12:15:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": "INFINITY",
      "spamBlockDays": 0
    }
  ],
  "personalChannel": "YmwShbJWRZWb6YAT",
  "personalChannelDate": {
    "$date": "2025-03-29T15:25:23.091Z"
  },
  "lazyCheckDate": {
    "$date": "2025-04-21T12:44:27.043Z"
  },
  "spamBlockReasons": [
    {
      "reason": "I cant access my full messaging functionality, which is crucial for my job. I havent broken any rules, so I believe this restriction is a mistake and should be lifted. Kindly review my account status.",
      "date": {
        "$date": "2025-04-18T13:29:57.373Z"
      }
    },
    {
      "reason": "Ive been blocked from messaging everyone except my contacts and want to get this feature back ASAP, as its crucial for my job. My messaging privileges were revoked by mistake; I havent done anything wrong.",
      "date": {
        "$date": "2025-04-19T10:35:49.122Z"
      }
    },
    {
      "reason": "My account is incorrectly limited in messaging. I havent done anything wrong or suspicious, so please review this. I need to message important contacts ASAP.",
      "date": {
        "$date": "2025-04-20T12:23:10.018Z"
      }
    },
    {
      "reason": "I recently experienced a strange block. I cant message some contacts, which is critical to my work. Id appreciate a quick review, as Ive never violated any rules.",
      "date": {
        "$date": "2025-04-20T16:35:38.478Z"
      }
    },
    {
      "reason": "My account is currently unable to send messages freely, impacting my communication with essential contacts. Im sure this is a mistake, as I havent done anything wrong or suspicious. Kindly restore my messaging functionality.",
      "date": {
        "$date": "2025-04-21T12:11:19.665Z"
      }
    }
  ],
  "spamBlockDate": "INFINITY",
  "spamBlockDays": 0,
  "spamBlockInitDate": {
    "$date": "2025-04-18T13:29:57.512Z"
  },
  "username": "melnikova_interim"
},
{
  "_id": {
    "$oid": "67dd2adbf5fa1dc49466c6bf"
  },
  "accountId": "7131018632-prefix-female-casino",
  "dc1": "8bae7918ca0997fb2653e5f730b78efa5f8d466d6b37bb83f09b012ba8a0b269bd5c1e7ce7a8e9aa2e913dbfbc5db005de66383ef150b679647f2d3dd1010efcd23ea0e17e7cc20d9f0eae75b4582fbd9913db0c4f7f3427ab12e49abe4089ab50d3bd7b5317085ae894cd5cef4a272608c2314cab922421b0b071dc31af1cb09712d23526c323a703abe5175161aba7d42fd9c21e395c1944a1fdb398ed268ec361b598e838ab9ea35bf595470538b9bffdfb9e8be7372f9846892455af0e58dc0e140177384a1e4d587092e25c00efe9c17bcf88539ee6a209e332c7ee8feac98f1e8cd18f9f48f6349155ba64be5a2c50fa5853ee1f342ee07fa6a8bcc6d3",
  "dcId": 1,
  "nextApiId": 2496,
  "dateUpdated": {
    "$date": "2025-04-21T13:15:20.565Z"
  },
  "banned": false,
  "firstName": "Valeria",
  "id": "7131018632",
  "lastName": "Trifonova",
  "messageCount": 32,
  "twoFa": false,
  "twoFaDate": {
    "$date": "2025-04-20T20:22:21.607Z"
  },
  "automaticCheckDate": {
    "$date": "2025-04-21T13:15:20.565Z"
  },
  "remainingTime": {
    "$date": "2025-04-21T12:45:12.774Z"
  },
  "personalChannel": "FTh9xCdLGbANWtMp",
  "personalChannelDate": {
    "$date": "2025-03-29T15:23:48.645Z"
  },
  "lazyCheckDate": {
    "$date": "2025-04-20T21:21:59.607Z"
  },
  "username": "trifonova_suitable"
},
{
  "_id": {
    "$oid": "67dd2adcf5fa1dc49466c6ca"
  },
  "accountId": "6013076696-prefix-female-casino",
  "dc4": "27011eb495431330a9c460b5e27a640f0edcfbe402cb0657fae3a79d59526f3aa6ffe7b72e7c000fad609ddd51cd1d600b264fb3f8b730c6a3f2c7d019f5b3434e5d91fdcd5c606e87ac930430b9a35f084cf25a8f209c1062fd73683a74e2ffc1bd20b1486139afd88a2eba69a4114968cef9d97bebe4120e98f7d6b37429db1fb5c496edfd3dcd02c7fe050a1f24e54afc60a5a916e75d03db2300f8a4e65d4256fe816f49dfc7dfeee72dba7ba94a1d19d6fa04f20aed8e46de3a73dbbfca3fcf9fae000f772675c084cf6fdc00dd1ffaa7a6cc51ad52b2f2a1cc5b50fe0fa7dd599074a223612b538b14f81a5011d682d0004fada00e3353e3647def88ae",
  "dcId": 4,
  "nextApiId": 2040,
  "dateUpdated": {
    "$date": "2025-04-21T21:55:07.332Z"
  },
  "banned": false,
  "firstName": "Inna",
  "id": "6013076696",
  "lastName": "Ilyina",
  "messageCount": 53,
  "twoFa": false,
  "twoFaDate": {
    "$date": "2025-04-20T20:22:22.101Z"
  },
  "automaticCheckDate": {
    "$date": "2025-04-21T21:55:07.332Z"
  },
  "remainingTime": {
    "$date": "2025-04-21T14:09:43.023Z"
  },
  "personalChannel": "EFWtam6uUBtRdChl",
  "personalChannelDate": {
    "$date": "2025-03-29T15:23:09.925Z"
  },
  "historySpamBlocks": [
    {
      "spamBlockDate": {
        "$date": "2025-04-02T14:25:00.000Z"
      },
      "spamBlockDays": 1
    }
  ],
  "lazyCheckDate": {
    "$date": "2025-04-21T21:55:06.943Z"
  },
  "username": "ilyina_romantic"
},
{
  "_id": {
    "$oid": "67dd2adcf5fa1dc49466c6cd"
  },
  "accountId": "1998507758-prefix-female-casino",
  "dc1": "9a8b2560ad6d711cb3195a33bb88bbbb67203e6b1f29adff30e9fe3d1babde207ed576dc8a02abf46ad71776357918d12968c3bb8388ff5d45788297d39b0932b812b6eb9f6d92716d1275fa61124613150f6284c1d447267cd92abae83755eca3658a5c8b1dd57a826485a4aa8a501ee37cc4d43bbb3c5e58303fb24627d13aa0de8b9f62ff3476ffa8705013ad83aed77e2389b1ea8a12413f022d81a3ec93f150d10195c88de49990f54922dbfedf4bc9109f8fe78501dfebe98560f1dfc0ea8dc5449fca12c0e0d131ececff0e56e63c296cdc644c6fe2948bfc4ca15a8f74d805f96c53c9fd57621caa0da5533ce10a121dc514cc08effff6042bfdf2ed",
  "dcId": 1,
  "nextApiId": 2496,
  "dateUpdated": {
    "$date": "2025-04-21T13:28:20.535Z"
  },
  "banned": false,
  "firstName": "Kira",
  "id": "1998507758",
  "lastName": "Pakhomova",
  "messageCount": 42,
  "twoFa": false,
  "twoFaDate": {
    "$date": "2025-04-20T16:06:57.971Z"
  },
  "automaticCheckDate": {
    "$date": "2025-04-21T13:28:20.535Z"
  },
  "remainingTime": {
    "$date": "2025-04-21T12:01:41.946Z"
  },
  "personalChannel": "TDQHpqI4oAcAiWWF",
  "personalChannelDate": {
    "$date": "2025-03-29T15:25:10.203Z"
  },
  "lazyCheckDate": {
    "$date": "2025-04-20T21:16:59.548Z"
  },
  "historySpamBlocks": [
    {
      "spamBlockDate": "INFINITY",
      "spamBlockDays": 0
    }
  ],
  "username": "pakhomova_pleasant"
},
{
  "_id": {
    "$oid": "67dd2addf5fa1dc49466c6d1"
  },
  "accountId": "6839340749-prefix-female-casino",
  "dc1": "8c5a883f8c436457dc41f166da5934e72bdc7bf7cb4e08bc4abc1dfe0e8bdccd9b88454331929ddde1cff514ff354876b8388a7df1c20806fff145c2545446b70adca1d7ba05370719b31a466e665309b79295991970dc5399e022fe9ba0e0f9c4980b71f8bce32d3a0ffae98d562b282c5522c54ac3b0c81d86eee4673bc0d475727de17e62314f40f8adf9f8a88f1bbeda82dcabad3a7e8a31bb910d5e6c9275070a2b4806332098eb725c8665b67eef9fe9eb2dc0d6a4eec766b8c5df18a461b62ced88d990cd7474e18f6a963f1fdcd8c2bda7de90cb49b616c7e7d2e2b829c44a615f3d8e7bcfc6840f01390093cb8508d94df222b00073831fc89b102e",
  "dcId": 1,
  "nextApiId": 2040,
  "dateUpdated": {
    "$date": "2025-04-21T13:08:20.058Z"
  },
  "banned": false,
  "firstName": "Marina",
  "id": "6839340749",
  "lastName": "Rusanova",
  "messageCount": 31,
  "twoFa": false,
  "twoFaDate": {
    "$date": "2025-04-20T20:22:19.357Z"
  },
  "automaticCheckDate": {
    "$date": "2025-04-21T13:08:20.058Z"
  },
  "remainingTime": {
    "$date": "2025-04-21T07:03:41.597Z"
  },
  "personalChannel": "sUcmEQgUFZLQnJ2E",
  "personalChannelDate": {
    "$date": "2025-03-29T15:24:48.481Z"
  },
  "lazyCheckDate": {
    "$date": "2025-04-20T21:15:46.852Z"
  },
  "username": "rusanova_romantic",
  "spamBlockReasons": [
    {
      "reason": "Id like my messaging function restored. Theres been a mistake—I havent broken any rules. Im limited to messaging mutual contacts, which isnt enough.",
      "date": {
        "$date": "2025-04-21T05:57:21.433Z"
      }
    }
  ],
  "historySpamBlocks": [
    {
      "spamBlockDate": {
        "$date": "2025-04-22T05:16:00.000Z"
      },
      "spamBlockDays": 1
    }
  ],
  "spamBlockDate": {
    "$date": "2025-04-22T05:16:00.000Z"
  },
  "spamBlockDays": 1,
  "spamBlockInitDate": {
    "$date": "2025-04-21T05:57:21.437Z"
  }
},
{
  "_id": {
    "$oid": "67dd2adef5fa1dc49466c6dd"
  },
  "accountId": "7166364285-prefix-female-casino",
  "dc1": "5357b3438aaa154196b07b7e3b373a22e64944c525296687359b9cf44fb937423652f34e87d56240c27ad946ea8abd36da5b0098c00cc673f3981869679ab7a562cd2efb77cba5d66641830ae2cb7c7b8d1448397c4c385d6181bf9d4e18097ab2fa7ae33ccf1ff17c535197a458c6f5f61ace9370e8673f425dfe66e5ed4b19725382a638a19d11d77cbc0554b1bb8402f12b0d1c0f702a4ff088e970292ae92ea30ee0210de12c0e5d849627a7a9be3b29a07c343d64da4ac839f7d703df5c650ed1299e5210aacf310cdfa5b5ced343de54d6873d4c8650793034508230c4e55c79d793ea86cb75ed78c592f269c13f423b07ad1e3b128d207fea185d8dd0",
  "dcId": 1,
  "nextApiId": 2496,
  "dateUpdated": {
    "$date": "2025-04-21T13:23:26.884Z"
  },
  "banned": false,
  "firstName": "Elena",
  "id": "7166364285",
  "lastName": "Shumilova",
  "messageCount": 38,
  "twoFa": false,
  "twoFaDate": {
    "$date": "2025-03-21T09:27:56.800Z"
  },
  "automaticCheckDate": {
    "$date": "2025-04-21T13:23:26.884Z"
  },
  "remainingTime": {
    "$date": "2025-04-21T11:49:05.412Z"
  },
  "personalChannel": "wAsTRzlbhUG9VNmn",
  "personalChannelDate": {
    "$date": "2025-03-29T15:23:22.837Z"
  },
  "historySpamBlocks": [
    {
      "spamBlockDate": {
        "$date": "2025-04-05T08:11:00.000Z"
      },
      "spamBlockDays": 1
    }
  ],
  "lazyCheckDate": {
    "$date": "2025-04-20T20:39:31.727Z"
  },
  "username": "shumilova_invisible"
},
{
  "_id": {
    "$oid": "67dd2adef5fa1dc49466c6df"
  },
  "accountId": "1163963417-prefix-female-casino",
  "dc1": "164507795114829d2117d65f7aea133db700038a711a4d493ccacc6dd375f2314a637d460cbaf8a521d820cb30045e29146926717726e70d926929743b77d12cefe751ef1c577c40f2628e9cfcbf9945516d4b28fe2bfe1644ede4b8eb6eb6df18a02763ad29350c347d1c3f7ba054746402db86e91d9399ffdd4c9bc8ed3cd1d4806f6cc1f42310142c248fef0f45d8285d77ee76d61ee1f623d193d0b3f890644ee19b79e384d3872e8d22c9c93f33f895e4fd5e2ae5d8fdf5920d924fb277a18ef950ae606f926f89610996836dfb4392958b78266412d052708718f89f969192b0c69562140465153b1bf0e62ddea35d9391fab764d3ee8603c1a988efa6",
  "dcId": 1,
  "nextApiId": 2040,
  "dateUpdated": {
    "$date": "2025-04-21T13:15:20.699Z"
  },
  "banned": false,
  "firstName": "Margarita",
  "id": "1163963417",
  "lastName": "Ilyina",
  "messageCount": 44,
  "twoFa": false,
  "twoFaDate": {
    "$date": "2025-04-20T20:22:19.356Z"
  },
  "automaticCheckDate": {
    "$date": "2025-04-21T13:15:20.699Z"
  },
  "remainingTime": {
    "$date": "2025-04-21T12:10:07.958Z"
  },
  "personalChannel": "mBLlbptOBJ7mpzBS",
  "personalChannelDate": {
    "$date": "2025-03-29T15:24:19.265Z"
  },
  "historySpamBlocks": [
    {
      "spamBlockDate": {
        "$date": "2025-04-01T07:52:00.000Z"
      },
      "spamBlockDays": 1
    }
  ],
  "lazyCheckDate": {
    "$date": "2025-04-20T20:43:30.342Z"
  },
  "username": "ilyina_classic"
},
{
  "_id": {
    "$oid": "67dd2adef5fa1dc49466c6e2"
  },
  "accountId": "7085268344-prefix-female-casino",
  "dc1": "5a35104b368b51afc3fcc730abb8772ed2f5f5b72b9789034f92cb92c3720703d339e9309696b39f1012fe1186a7cd5f4fb298e7c101f215feb3289dfad8b99a915a912d0e0c0147f1dd6c6f5cc60f76522046ceeb99efaef12b4dd489979e6a493acddc858d005604106c1018a9fe580d3e322024f638b86addbcdff547e73be2b0dc43263675a8acde069f17cf72996b68b1f34c28bdb648e7ab7dc5656b0ea91bbf7b2bcb1fb4fd47a375825a07854c08e22dcfa1aa0f21b4e7e255fb0f4bc61564917029fdc7652968fd9a61b8bb3a8fb78666b88a3ac53526722b3ed62c944fb452ded81271bcf38f58c1df7795534b00ffffa8a796fd82b39ed3223b72",
  "dcId": 1,
  "nextApiId": 2496,
  "dateUpdated": {
    "$date": "2025-04-21T13:05:22.089Z"
  },
  "banned": false,
  "firstName": "Rita",
  "id": "7085268344",
  "lastName": "Galitsyna",
  "messageCount": 42,
  "twoFa": false,
  "twoFaDate": {
    "$date": "2025-04-20T20:22:19.477Z"
  },
  "automaticCheckDate": {
    "$date": "2025-04-21T13:05:22.089Z"
  },
  "remainingTime": {
    "$date": "2025-04-21T12:54:51.147Z"
  },
  "personalChannel": "UwRfKBqp8vfnpaWh",
  "personalChannelDate": {
    "$date": "2025-03-29T15:25:24.018Z"
  },
  "lazyCheckDate": {
    "$date": "2025-04-20T21:05:46.274Z"
  },
  "username": "galitsyna_urban"
},
{
  "_id": {
    "$oid": "67dd2adff5fa1dc49466c6ea"
  },
  "accountId": "6830124654-prefix-female-casino",
  "dc1": "68623facc0a7400ecdbef1b471c1a0ff2b4557b384893012d509664c2e07c71ef540b28cf168a2622de8177195b226ecbaa6bb6a156c24344fd821d3ad65602153212756b774d5f9395bf151dc07a6a7bbef3b903a4c5f4b2eea597b1be9fbee038befab13ef527b1e17a9ca0712570dd2858c1d1a58b5c0653e81e7549ccc2120be1955a1c42b239422e55522faf3f512d36715899ee36f2d866928daf48e9082134a2df3901f7c845b256a65e4eceaa11503c9329e619896d0f0769bfe1f12bde589c0cefff4b3adfc7b3554667bf3512705122fd59e5b245749480eb349a78c8fb7c79c630938ce33bcf0f986fc2b8d22b89f722d9b9599ed665221819505",
  "dcId": 1,
  "nextApiId": 2040,
  "dateUpdated": {
    "$date": "2025-04-21T21:51:44.041Z"
  },
  "banned": false,
  "firstName": "Lubov",
  "id": "6830124654",
  "lastName": "Malakhova",
  "messageCount": 33,
  "twoFa": false,
  "twoFaDate": {
    "$date": "2025-04-20T16:06:55.056Z"
  },
  "automaticCheckDate": {
    "$date": "2025-04-21T21:51:44.041Z"
  },
  "historySpamBlocks": [
    {
      "spamBlockDate": "INFINITY",
      "spamBlockDays": 0
    }
  ],
  "remainingTime": {
    "$date": "2025-04-21T11:56:05.222Z"
  },
  "personalChannel": "NiZmyTMvFNN2rALH",
  "personalChannelDate": {
    "$date": "2025-03-29T15:25:49.899Z"
  },
  "lazyCheckDate": {
    "$date": "2025-04-21T21:51:43.808Z"
  },
  "username": "malakhova_comparable"
},
{
  "_id": {
    "$oid": "67dd2adff5fa1dc49466c6f1"
  },
  "accountId": "1978866635-prefix-female-casino",
  "dc1": "27697877af61e71b29ba499d1be27080bac100bf166fc0a813ebcf4e4025d89ada176f80b054983bc794acde049c3a29fccbcfad240724dd23671583b35a5f471ddd1fa88c86001dfb457b4b9ef5c07e9612289e480690f45bf3e7f985bb42125c034bc09be3dc9cfb0396e1d4e75331ee810791db0406609c5c7ca5b8ce7d80e930fb275220f83a47ebf69283959311fa3a7af48a1b6061972c5155f5d3c062d90a7ced6fdea3fc9c61c14e9badde962c077dc57d1193dbc6a785ab4695ef9d8ef949bdb53f6e6a8f73ea5d677a45ffc41a0eeaaf3c68848a4762fa551fbfbc25c01580dfb009f297db088a8288fcf1833d346e3a8f17efa2fff725d8a801bb",
  "dcId": 1,
  "nextApiId": 2040,
  "dateUpdated": {
    "$date": "2025-04-21T13:29:19.254Z"
  },
  "banned": false,
  "firstName": "Mira",
  "id": "1978866635",
  "lastName": "Tomilova",
  "messageCount": 15,
  "twoFa": false,
  "twoFaDate": {
    "$date": "2025-04-20T20:22:19.343Z"
  },
  "automaticCheckDate": {
    "$date": "2025-04-21T13:29:19.254Z"
  },
  "remainingTime": {
    "$date": "2025-04-21T07:48:05.243Z"
  },
  "personalChannel": "Pj5OoYVpxyJMJyZS",
  "personalChannelDate": {
    "$date": "2025-03-29T15:22:53.059Z"
  },
  "lazyCheckDate": {
    "$date": "2025-04-20T20:32:30.138Z"
  },
  "username": "tomilova_critical"
},
{
  "_id": {
    "$oid": "67dd2ae0f5fa1dc49466c6f7"
  },
  "accountId": "5983330059-prefix-female-casino",
  "dc1": "5ff250ec67920126578ac2259f22b3074967092b920263280f8f2f02fad231fec8bcc649893d3fb09bb932b95bec29fd3b7a20a4af7a2a02b90fce05222bacf51c477f5dafcb093068db3523565102c52888e039bf98ae8fbfc8d9398297cc9cdd1410ad7429b8425c8e3bbf3e024f1dce70f1fcea52c68347c093630fd42ba59b6bc456007f81497f0d1cdc67c3c0a319920273236af3e1691f64fe58b8b0a6c2334e0894fba2c87b0c934e6a6101ae999d41952e747978b80d31f9dff145969db946f1f05fa38112ad8f556b3cfa512dd9e148aef1847463fb721920b1d938f694d4324b2a4f9ae6378f22eed8d666088cd84d51df48e329d5fad9e8377040",
  "dcId": 1,
  "nextApiId": 2496,
  "dateUpdated": {
    "$date": "2025-04-21T13:19:19.394Z"
  },
  "banned": false,
  "firstName": "Tatiana",
  "id": "5983330059",
  "lastName": "Morozova",
  "messageCount": 35,
  "twoFa": false,
  "twoFaDate": {
    "$date": "2025-04-20T20:22:17.791Z"
  },
  "automaticCheckDate": {
    "$date": "2025-04-21T13:19:19.394Z"
  },
  "remainingTime": {
    "$date": "2025-04-21T12:09:43.409Z"
  },
  "personalChannel": "IVwfzzCi1wyHzxhj",
  "personalChannelDate": {
    "$date": "2025-03-29T15:23:23.780Z"
  },
  "lazyCheckDate": {
    "$date": "2025-04-20T21:02:46.311Z"
  },
  "username": "morozova_loose"
},
{
  "_id": {
    "$oid": "67dd2ae0f5fa1dc49466c6fa"
  },
  "accountId": "2002104720-prefix-female-casino",
  "dc4": "b1799d9a423a8466e09e5bcf57c6c84cd3b8859b861602fdf4139bc827a91fd58d1d54302b43d1cf4fe5d7c656d61e78905b2c00f2de29bc3aa6d6fc0f659487764c0672057efd7887e6d2b0c4d4f6364cfcb3ce121d9a61500e1e76bb67c56df797790b4a93e8ec1194e7c11dd383b0960371233e39fa9c7bb4159aae82d5218d6a17cce243f46d0b76f461b3a9c9aef25bb9d1db5167f56637f68b467254f98c1adf5750f87cab3c5768c49a51539922a35f9ce937cab0f973cd2112eba98cade7fc0c9c9fc1698487f09c9ad264f99416f64b340c093b3758beddc53ff5b0fc79e9201c23c83ca37a39e84f177617213c9ebd646be2c8e77b688320a8116d",
  "dcId": 4,
  "nextApiId": 2040,
  "dateUpdated": {
    "$date": "2025-04-21T13:19:05.929Z"
  },
  "banned": false,
  "firstName": "Albina",
  "id": "2002104720",
  "lastName": "Stepanova",
  "messageCount": 53,
  "twoFa": false,
  "twoFaDate": {
    "$date": "2025-04-20T16:06:55.230Z"
  },
  "automaticCheckDate": {
    "$date": "2025-04-21T13:19:05.929Z"
  },
  "remainingTime": {
    "$date": "2025-04-21T14:46:53.642Z"
  },
  "personalChannel": "qrlB5vAdWefwRtLH",
  "personalChannelDate": {
    "$date": "2025-03-29T15:26:21.460Z"
  },
  "lazyCheckDate": {
    "$date": "2025-04-20T20:48:33.354Z"
  },
  "historySpamBlocks": [
    {
      "spamBlockDate": {
        "$date": "2025-04-10T06:18:00.000Z"
      },
      "spamBlockDays": 1
    }
  ],
  "username": "stepanova_still"
},
{
  "_id": {
    "$oid": "67dd2ae1f5fa1dc49466c705"
  },
  "accountId": "6232313478-prefix-female-casino",
  "dc1": "1c04b644f941954f5f9c072c44aa641543b175e4ab8561d124063e0003a85f173b7de42509d2a73bc702e60d8a9c1424ffc368d632c1b791f6f8d507044d53ca411a283e34e003f2af5aab1179f36d904f9efa866816655e27e4fbbbc14bd242e8de8cbcdb9060ee58c73e95d7be7af1e2f2e505d22f851eaf7508695728bd88935a97fec544fea817d84314d2d0573cc78a9a09181602753e673337fbd486d0f61850e3dc181a2845095b59327913cc537e7a60cb144bd175a24f17aa1caad8bd5a6d7528e26d46842c682e67b4a2fab477291eb3fc87cd9b39b52630dd348f65faa620ad9724f99851be22cbec322561c55ea27f611a52846359a1b142bef8",
  "dcId": 1,
  "nextApiId": 2496,
  "dateUpdated": {
    "$date": "2025-04-21T21:54:20.712Z"
  },
  "banned": false,
  "firstName": "Elena",
  "id": "6232313478",
  "lastName": "Shevchukova",
  "messageCount": 26,
  "twoFa": false,
  "twoFaDate": {
    "$date": "2025-04-20T20:22:21.117Z"
  },
  "automaticCheckDate": {
    "$date": "2025-04-21T21:53:44.724Z"
  },
  "remainingTime": {
    "$date": "2025-04-21T15:32:07.425Z"
  },
  "personalChannel": "sFQEtnMsfM3tAHuC",
  "personalChannelDate": {
    "$date": "2025-03-29T15:25:58.354Z"
  },
  "historySpamBlocks": [
    {
      "spamBlockDate": {
        "$date": "2025-04-30T09:50:00.000Z"
      },
      "spamBlockDays": 30
    },
    {
      "spamBlockDate": {
        "$date": "2025-04-02T10:20:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-04-07T14:45:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-04-15T11:44:00.000Z"
      },
      "spamBlockDays": 7
    },
    {
      "spamBlockDate": {
        "$date": "2025-04-21T12:50:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-04-24T13:50:00.000Z"
      },
      "spamBlockDays": 3
    }
  ],
  "lazyCheckDate": {
    "$date": "2025-04-21T21:53:43.982Z"
  },
  "username": "shevchukova_inc",
  "spamBlockReasons": [
    {
      "reason": "Im unable to message new contacts due to an error. I believe my accounts message function has been wrongly restricted. Please restore this feature as soon as possible.",
      "date": {
        "$date": "2025-04-21T21:54:20.706Z"
      }
    }
  ],
  "spamBlockDate": {
    "$date": "2025-04-24T13:50:00.000Z"
  },
  "spamBlockDays": 3,
  "spamBlockInitDate": {
    "$date": "2025-04-21T21:54:20.711Z"
  }
},
{
  "_id": {
    "$oid": "67dd2ae1f5fa1dc49466c70b"
  },
  "accountId": "5960348171-prefix-female-casino",
  "dc1": "9555146f83453ef714591d2cff85e43c03a05c966cb62158e5e2ff04ad517b27d815a18271b32b4ded00ce01c56b9e67c7384f264ad92a9bf891119d7c42b31e965756af9088ec850ce516ae350e9598cd24bfbdba15bf344cbe0a5b5d97a97dd12a6fd0f2acddbfeead6a9f75aff410f59b4086c9413aee9deb81634784300b36da28d1991aaceffd36461aa7418c0ae80c16383921200d7cd76ff7ca830cb4a4b268a20a9908fc645987da54efd2c86520cbc15ea4fdd473429d2cdca385e5ff83103c494fde4127de42c531376db8a94aa5c13d7f8d76dd23fc7e91d6e3d342b041699f98b5bde360d0bcd4b68a0192604cf047a467917c49604e913e1d02",
  "dcId": 1,
  "nextApiId": 2040,
  "dateUpdated": {
    "$date": "2025-04-21T13:10:14.447Z"
  },
  "banned": false,
  "firstName": "Kira",
  "id": "5960348171",
  "lastName": "Kalinina",
  "messageCount": 19,
  "twoFa": false,
  "twoFaDate": {
    "$date": "2025-04-20T20:22:19.386Z"
  },
  "automaticCheckDate": {
    "$date": "2025-04-21T13:10:14.446Z"
  },
  "remainingTime": {
    "$date": "2025-04-21T07:45:39.343Z"
  },
  "personalChannel": "jHHcAMGhj4QTYrGx",
  "personalChannelDate": {
    "$date": "2025-03-29T15:24:43.231Z"
  },
  "lazyCheckDate": {
    "$date": "2025-04-20T20:35:30.283Z"
  },
  "username": "kalinina_chocolate"
},
{
  "_id": {
    "$oid": "67dd2ae1f5fa1dc49466c70f"
  },
  "accountId": "6179536385-prefix-female-casino",
  "dc1": "314c5b5cde83dc69d57ac08347c6695746981a5f6ea639fb59c78ed40923a85f6cc4ee19476ea4f815de4c4c3363dfada37b14019df64e95e87ce65664643a8b9cac322778bb4df9ce3186a1d93fbfcdf4416ca3fbb08cc41502dfac96f94a83b02fecd958e6a318ca7f22dfd4cef087a568376a5cb2723beef884c0678cd42e9ab1fc22c55938c4ae1923c87fef6a9a759de71f4f8faf9ae600c67b92bf36a43afa373f9914c3a661a35f9b12d446086e75edcf530d3b36fd9b2de1e56b9e8db80de755d877e752d25d6e625a0665284310ce9926d2b92ea364bec3a540f6d73fef4f5214c38a76b15ca331a82019394a5735e7c7a600ec1ee2d9d4d01d6093",
  "dcId": 1,
  "nextApiId": 2496,
  "dateUpdated": {
    "$date": "2025-04-21T13:31:23.855Z"
  },
  "banned": false,
  "firstName": "Arina",
  "id": "6179536385",
  "lastName": "Makarova",
  "messageCount": 34,
  "twoFa": false,
  "twoFaDate": {
    "$date": "2025-04-20T20:22:19.385Z"
  },
  "automaticCheckDate": {
    "$date": "2025-04-21T13:31:23.855Z"
  },
  "remainingTime": {
    "$date": "2025-04-21T14:09:15.895Z"
  },
  "historySpamBlocks": [
    {
      "spamBlockDate": {
        "$date": "2025-03-30T06:40:00.000Z"
      },
      "spamBlockDays": 1
    }
  ],
  "personalChannel": "H0mVUprEdeqxCLdh",
  "personalChannelDate": {
    "$date": "2025-03-29T15:25:25.628Z"
  },
  "lazyCheckDate": {
    "$date": "2025-04-20T20:47:30.323Z"
  },
  "username": "makarova_dear"
},
{
  "_id": {
    "$oid": "67dd2ae2f5fa1dc49466c712"
  },
  "accountId": "7873973940-prefix-female-casino",
  "dc1": "90f236688a873904207a21974b8e85d3b386065b51b9229831db600cc637388954246c30ae6d51c2b67a75ce0a31475c42fc7102fd84c7b23729b769c1be3eed4bc9859a8d19637efe89c916dda1aa2958f2d919a654ee7d7f304e0ce496484cba8322c8b02928dd85699ce94cbfd7b0dd62b627739c9063dd29f6ec5edb47259271b365e253dcd7d8445a04e75422d54c0887ba244a26c12974d4b532f77cc2d4003b18a1e65e5c7420eff8b88c35cc7ef9d671a200ded856d6c499feacbb5b49114eae3d9a62abd1a3ae1b93b57ffd52d291a79c04c8ae42b1d0fc716285890f325c96355c30acda5470a03283ef4d9ea4d6e2e0fdc1f96e0094c2792ada61",
  "dcId": 1,
  "nextApiId": 2496,
  "dateUpdated": {
    "$date": "2025-04-21T13:23:16.563Z"
  },
  "banned": false,
  "firstName": "Galina",
  "id": "7873973940",
  "lastName": "Rudakova",
  "messageCount": 42,
  "twoFa": false,
  "twoFaDate": {
    "$date": "2025-04-20T20:22:22.020Z"
  },
  "automaticCheckDate": {
    "$date": "2025-04-21T13:23:16.563Z"
  },
  "remainingTime": {
    "$date": "2025-04-21T11:19:11.964Z"
  },
  "personalChannel": "MDllsYEJg9QXQhhO",
  "personalChannelDate": {
    "$date": "2025-03-29T15:22:49.138Z"
  },
  "lazyCheckDate": {
    "$date": "2025-04-20T20:43:33.011Z"
  },
  "username": "rudakova_indigo"
},
{
  "_id": {
    "$oid": "67dd2ae2f5fa1dc49466c715"
  },
  "accountId": "7404821525-prefix-female-casino",
  "dc1": "b2a033d7979ce93b1d8a65d7cf622b1fa356ff3145b6d3cf237682872906876a11210fb7a608e6b7a78ee728109072781748389d98d34b5412c4989e22906212fc431b12776944c95c843f16b02cffec3088916235b2dd96cfeb0c7a9dd02af96b47110b8ad772859727c1072fe0fee6c6e0115df29e5ecd8bf8d4cb82bfc15d76eaf1fc89350017afe055da363fb11aa4bd80db8d8c61a6f1ed0c9464bab4568d550d6ec3d15fb8e129556993c2ae8117bae177a093ffbbe77be6e784772b244d042a994c489190fbc7e56ffdf7212f04cfa30d734fd92f4ad2ca3542dd6131937590a2957869bc74d79c5e88ffd254770ac09bb81fc1991f25f397a3a93370",
  "dcId": 1,
  "nextApiId": 2496,
  "dateUpdated": {
    "$date": "2025-04-21T13:09:19.215Z"
  },
  "banned": false,
  "firstName": "Yana",
  "id": "7404821525",
  "lastName": "Rusanova",
  "messageCount": 29,
  "twoFa": false,
  "twoFaDate": {
    "$date": "2025-04-20T16:06:58.275Z"
  },
  "automaticCheckDate": {
    "$date": "2025-04-21T13:09:19.215Z"
  },
  "remainingTime": {
    "$date": "2025-04-21T11:51:31.537Z"
  },
  "historySpamBlocks": [
    {
      "spamBlockDate": {
        "$date": "2025-03-29T18:00:00.000Z"
      },
      "spamBlockDays": 1
    }
  ],
  "personalChannel": "pURE8wlgDTHpxaaP",
  "personalChannelDate": {
    "$date": "2025-03-29T15:25:49.667Z"
  },
  "lazyCheckDate": {
    "$date": "2025-04-20T20:33:25.372Z"
  },
  "username": "rusanova_fundamental"
},
{
  "_id": {
    "$oid": "67dd2ae2f5fa1dc49466c719"
  },
  "accountId": "5354040394-prefix-female-casino",
  "dc1": "7df76fbc00640bd82a76ab34eabb781ecdc7450ba4f754a1a543d2ffd3595bb9f646c4da1db602b0a94c691d239ca0124c0e9208a92c2da40fc00c05f90b903d196fd311b969478292f8ebeca1f14fd86ed256de837fec276876bbfb5cea656dd9caeefba3152383bcbeb96e450ad9e00944159c780f8f7cc037ea59431ee7895d1f0b7b465a49ef056856bf2d1380bc27a334d2e799f6fed19b929d3c92d44ec5dd22f31ccaa6bd4d3455714094922b48bf3092a47660a9d9bfadaf779df9f165c85e3859cfb63e7d4db4e21c543074db7baf8e5833b66b38c18f518b987a8f3e57b35f0cd32b7f141a1dd5a5facf86161d0a25c8402f859387fe2babf6bbe1",
  "dcId": 1,
  "nextApiId": 2496,
  "dateUpdated": {
    "$date": "2025-04-21T21:55:50.713Z"
  },
  "banned": false,
  "firstName": "Mira",
  "id": "5354040394",
  "lastName": "Kostina",
  "messageCount": 42,
  "twoFa": false,
  "twoFaDate": {
    "$date": "2025-04-20T20:22:17.737Z"
  },
  "automaticCheckDate": {
    "$date": "2025-04-21T21:55:50.713Z"
  },
  "remainingTime": {
    "$date": "2025-04-21T12:02:12.998Z"
  },
  "personalChannel": "UmxCuqCKD8RYkgyE",
  "personalChannelDate": {
    "$date": "2025-03-29T15:24:21.256Z"
  },
  "lazyCheckDate": {
    "$date": "2025-04-21T21:55:50.418Z"
  },
  "username": "kostina_public"
},
{
  "_id": {
    "$oid": "67dd2ae3f5fa1dc49466c71e"
  },
  "accountId": "6343527578-prefix-female-casino",
  "dc2": "4aa68669016fcd9bfd547381591b6d5b419a6a6860296b79ec2d94b0e510c391edd5356152f12fb19f635932e89655dd765efa8f51c9311eea326acc054f8e0ac539920a11ccfdd7d134f9ec5af8a9633d21eab3943490af5433612b20fd322baa0f404102f5a13484c3ea2ed831197e2decc0832c7332a0150e82506de5545bb466448811a8d5d7b39b7d6e64478a9e174bec2cf024cf41ca238dc28aa9430ad7d4fcba1e84d475ee9a01b887446ddc6a6428d7659df8d21cdcdee063602e7c7cc5494f908c08a0a5740cc3ad28002a53e4b8c7d318346b9c95b8a591312ad05a158173db18c5d773f00999440da85c677fd973a6e119a1aad1bb193862dc43",
  "dcId": 2,
  "nextApiId": 2496,
  "dateUpdated": {
    "$date": "2025-04-21T13:07:23.311Z"
  },
  "banned": false,
  "firstName": "Maria",
  "id": "6343527578",
  "lastName": "Semenova",
  "messageCount": 55,
  "twoFa": false,
  "twoFaDate": {
    "$date": "2025-04-20T20:22:26.458Z"
  },
  "automaticCheckDate": {
    "$date": "2025-04-21T13:07:23.311Z"
  },
  "remainingTime": {
    "$date": "2025-04-21T07:02:29.434Z"
  },
  "personalChannel": "lUPnbdkHoBLKn0oB",
  "personalChannelDate": {
    "$date": "2025-03-29T15:23:59.633Z"
  },
  "lazyCheckDate": {
    "$date": "2025-04-20T21:00:38.235Z"
  },
  "historySpamBlocks": [
    {
      "spamBlockDate": "INFINITY",
      "spamBlockDays": 0
    },
    {
      "spamBlockDate": {
        "$date": "2025-04-22T05:58:00.000Z"
      },
      "spamBlockDays": 1
    }
  ],
  "username": "semenova_likely",
  "spamBlockReasons": [
    {
      "reason": "Im unable to message all my contacts due to an apparent error. I havent done anything against the rules, so Id appreciate regaining full access. Kindly review and restore my messaging rights.",
      "date": {
        "$date": "2025-04-21T06:23:07.050Z"
      }
    },
    {
      "reason": "I recently encountered an issue with my Telegram account. I cant send messages to non-mutual contacts, which limits my ability to communicate with others. This seems like an error as Ive not violated any rules.",
      "date": {
        "$date": "2025-04-21T11:58:11.389Z"
      }
    }
  ],
  "spamBlockDate": {
    "$date": "2025-04-22T05:58:00.000Z"
  },
  "spamBlockDays": 1,
  "spamBlockInitDate": {
    "$date": "2025-04-21T06:23:07.055Z"
  }
},
{
  "_id": {
    "$oid": "67dd2ae3f5fa1dc49466c727"
  },
  "accountId": "1819976615-prefix-female-casino",
  "dc1": "6e2bd6b38d6a44ee60b2124e167d7d861471f8b8aee398bd0db6a5dca5e9f8e35279d9ce6b20fcc173caefa8e4664312e08b9cc1e01c9b20c7cae7a0d38058aaf1f817da470fee36ae1055dcb1347b536f1ba1a8fe43b7a0e960ad46a923631e47c7ea99fc66283dd593e4f32e49f19e7f5e57506284323bda6218e9d015ee28e8d4001d2092dae2bccb5bc25dcd317f4b7400bbe9701a51ceb89430537b280c31fb71cd680096258d76d61b70b7fa8ec6e133b5ad561d108e0a45674e8e7e25e9a88d83b445edb540345b60d02c8c9ba36b3fd51c75c4a13f2e2579421c5318cc680d49c7de913f9c6a37028e71819cdf4f4b8a18187bda3be2e7909df8df57",
  "dcId": 1,
  "nextApiId": 2496,
  "dateUpdated": {
    "$date": "2025-04-21T21:51:55.002Z"
  },
  "banned": false,
  "firstName": "Evgenia",
  "id": "1819976615",
  "lastName": "Galitsyna",
  "messageCount": 35,
  "twoFa": false,
  "twoFaDate": {
    "$date": "2025-04-20T16:06:58.428Z"
  },
  "automaticCheckDate": {
    "$date": "2025-04-21T21:51:55.001Z"
  },
  "historySpamBlocks": [
    {
      "spamBlockDate": "INFINITY",
      "spamBlockDays": 0
    }
  ],
  "remainingTime": {
    "$date": "2025-04-21T12:06:54.397Z"
  },
  "personalChannel": "jHDHUq5TizXflRMO",
  "personalChannelDate": {
    "$date": "2025-03-29T15:22:59.617Z"
  },
  "lazyCheckDate": {
    "$date": "2025-04-21T21:51:54.689Z"
  },
  "username": "galitsyna_uptight"
},
{
  "_id": {
    "$oid": "67dd2ae3f5fa1dc49466c72c"
  },
  "accountId": "7442711544-prefix-female-casino",
  "dc1": "7f18a3779a2a82c5ecbb5de1670812290c6793d25eff6ef7c6ae044a014f034450832441c4cfc7fd70d89cb48fa6a3ae22ffbe9c249a150c203bf8ef2fe6bd68c46e70180b585f7bfb78baf2f0fc0b917aae184cd764a6e4113189f283cd49fb5ee6195990c262ecdcc19c847f9b7a1c1c6269473d09787d4b00ea42d46f8ab6c0f8cce5e99f8be3f779d31d4b6c62902237bfb8e6a12f70666a35b363439c501a11290314457c0a561e53c2d6b4fb2b6defa6dd2ebc5c969efc702a8cd2417221b57c323206ce173a9730bb868ae160f4fcb197f1edfd391582c276ad73e45c7c4c79fcf42874059f0fb0c31b72ead9bf7bded0fcd669f400c959bbee13cc6d",
  "dcId": 1,
  "nextApiId": 2040,
  "dateUpdated": {
    "$date": "2025-04-21T21:55:52.386Z"
  },
  "banned": false,
  "firstName": "Rita",
  "id": "7442711544",
  "lastName": "Vlasova",
  "messageCount": 33,
  "twoFa": false,
  "twoFaDate": {
    "$date": "2025-04-20T20:22:26.616Z"
  },
  "automaticCheckDate": {
    "$date": "2025-04-21T21:55:52.386Z"
  },
  "remainingTime": {
    "$date": "2025-04-21T11:56:46.621Z"
  },
  "personalChannel": "frUwGKFjGxsr6dki",
  "personalChannelDate": {
    "$date": "2025-03-29T15:23:33.847Z"
  },
  "historySpamBlocks": [
    {
      "spamBlockDate": {
        "$date": "2025-04-03T17:44:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-04-08T05:17:00.000Z"
      },
      "spamBlockDays": 1
    }
  ],
  "lazyCheckDate": {
    "$date": "2025-04-21T21:55:52.080Z"
  },
  "username": "vlasova_accepted"
},
{
  "_id": {
    "$oid": "67dd2ae4f5fa1dc49466c731"
  },
  "accountId": "7593699731-prefix-female-casino",
  "dc1": "27a48c02cffc5550367a59b515da284682f562a1da9b1419e8c54005676537aef470d300fbae2eced0beb8d66851f5dd87940e8525465a8a5264074f434fd0b26dbae01621ac21bcf4fb8153a2d73f754ac018d01e52c81435d72c3dd767267d4722c98c180d778b9f4187d3e767bedb89814b0d5061e0f934cfcd8fdcda4d139dbe8c7971dd6d4d59925dcc5be0ce100d318ee832f13127c2841eb482d8ddcf88d4566640dd06b6e67d1077e998f3c1c95cbe4e7a2a1c766eaea2df11d85503dd840b208aaa7b5adc85eb95939fe6083c0b22330b0eed1d4063c77198b7b5ae21bffa81a19dea7450e989ec32f1fa43c55c420a67dc90b11af07714694e61ef",
  "dcId": 1,
  "nextApiId": 2040,
  "dateUpdated": {
    "$date": "2025-04-21T21:52:22.496Z"
  },
  "banned": false,
  "firstName": "Liza",
  "id": "7593699731",
  "lastName": "Puchkova",
  "messageCount": 36,
  "twoFa": false,
  "twoFaDate": {
    "$date": "2025-04-20T16:06:58.408Z"
  },
  "automaticCheckDate": {
    "$date": "2025-04-21T21:52:22.496Z"
  },
  "remainingTime": {
    "$date": "2025-04-21T11:20:01.133Z"
  },
  "personalChannel": "MaAsq3GElFxmRyHo",
  "personalChannelDate": {
    "$date": "2025-03-29T15:25:54.437Z"
  },
  "lazyCheckDate": {
    "$date": "2025-04-21T21:52:21.352Z"
  },
  "username": "puchkova_unique"
},
{
  "_id": {
    "$oid": "67dd2ae4f5fa1dc49466c733"
  },
  "accountId": "5625983879-prefix-female-casino",
  "dc1": "97cd812af1a935f575d7171752a5f8acf34be5e2ed0461b0fc5f25fe1d27e896837746e7694aa52235ee0c92a91bc93d5c94b96d42fa9524aea14df024115c4bbd22bae14c705a764f39ef590a9c2d1d6c63b961a4d6297058c3054545aa2a8345318136ce7062770c893410a181af2bae3304d88097580d0b1ff521f343aca1d8191a53f40307ba22cfad7acb998ac0083f7daa39f22ef2082be335658dd98ca76aeaa4e6a193b1decfc771d5a8922cf93d33eebc3f3f2f3511289a6d430999c228ce6e18f9a76510063b6ae3b75135711dd213acda9e2dd78ccf4696ea751dde949293c399415f7af6693aeb38b02fe9bd15835e8a135a786c15e3be6850bb",
  "dcId": 1,
  "nextApiId": 2040,
  "dateUpdated": {
    "$date": "2025-04-21T13:27:27.671Z"
  },
  "banned": false,
  "firstName": "Kira",
  "id": "5625983879",
  "lastName": "Golubeva",
  "messageCount": 17,
  "twoFa": false,
  "twoFaDate": {
    "$date": "2025-04-17T19:50:14.277Z"
  },
  "automaticCheckDate": {
    "$date": "2025-04-21T13:27:27.671Z"
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
  ],
  "remainingTime": {
    "$date": "2025-04-21T07:10:00.990Z"
  },
  "personalChannel": "UuQtKALCY0LhXidK",
  "personalChannelDate": {
    "$date": "2025-03-29T15:24:59.001Z"
  },
  "lazyCheckDate": {
    "$date": "2025-04-20T20:50:37.376Z"
  },
  "username": "golubeva_urgent"
},
{
  "_id": {
    "$oid": "67dd2ae4f5fa1dc49466c735"
  },
  "accountId": "7635823972-prefix-female-casino",
  "dc1": "861963c1b9dc08a255629b43ebf080c2a3e17762e49bb5d2d36b696b1234651a8dde99f6870c527a77a2c00f69e1ec523bb0cc14a984e99c5babecd6481d586d0b5d567b47bc5f0c755e96b881e18f141d6f50bdfa550fcb695ad388933f8d71b4fbd086235d21f50316fc1ef6b32b14581dbd0ef5811e6918e352d06bb8930b3603b1f6ad1543f64025b39ed8b8cca235cd43a07392b7e5b0bad048dd5b98cdaf9aa2fc033f38dc35408f9f12abcdadf2a048770099b58ee2e6903411ba4e7d16d35b302971de918bd27b02ae11eb664b494d69dbc3e00703fc4fd5185d07c15f7fbb37eb600e0c6562d0034b5537bdb9e0d9bdee5bd7d8b13432658072217f",
  "dcId": 1,
  "nextApiId": 2040,
  "dateUpdated": {
    "$date": "2025-04-21T21:53:55.227Z"
  },
  "banned": false,
  "firstName": "Ekaterina",
  "id": "7635823972",
  "lastName": "Simonova",
  "messageCount": 36,
  "twoFa": false,
  "twoFaDate": {
    "$date": "2025-04-20T20:22:26.616Z"
  },
  "automaticCheckDate": {
    "$date": "2025-04-21T21:53:55.227Z"
  },
  "remainingTime": {
    "$date": "2025-04-21T11:58:50.920Z"
  },
  "personalChannel": "GCiCaNf1FMXiRyXu",
  "personalChannelDate": {
    "$date": "2025-03-29T15:23:06.390Z"
  },
  "historySpamBlocks": [
    {
      "spamBlockDate": {
        "$date": "2025-03-31T12:06:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-04-12T06:31:00.000Z"
      },
      "spamBlockDays": 1
    }
  ],
  "lazyCheckDate": {
    "$date": "2025-04-21T21:53:54.884Z"
  },
  "username": "simonova_sharp"
},
{
  "_id": {
    "$oid": "67dd2ae4f5fa1dc49466c737"
  },
  "accountId": "5184053380-prefix-female-casino",
  "dc1": "18c83bf5ab6a91b2fbc08ee9404b505d9a622b35993599db935c29581e59735559553b25a0cf2a97b9e00e6e275534ebbfb781bad45a58305feca6f905bf1cf990e36ae643f0c6a6b97ca01e22b7b03c17af25e98cebd01176d0e9851e0d21fe260d2892d80412c78601d985b2b2aab992f3ad49301f149b5a0cf41db8316f4fd81f76c56155966ffe7a6df1fd02f1b324817af680ca4abf8e6d17195d91f194a9b2775252d066d85e4035c486ebb7dd3b98a6b1ced182b12da50cfed12cba82c2e0e0c4e8d27a4b45ba4eadde895e757012ef4fe256dcb9c6b15c533ef5060c2f653d85d2533c24626c7b96c07bca8f34a21fe706ec8239e5b03cf0c4bfbe38",
  "dcId": 1,
  "nextApiId": 2496,
  "dateUpdated": {
    "$date": "2025-04-21T13:14:24.453Z"
  },
  "banned": false,
  "firstName": "Alisa",
  "id": "5184053380",
  "lastName": "Solovieva",
  "messageCount": 38,
  "twoFa": false,
  "twoFaDate": {
    "$date": "2025-04-20T20:22:21.994Z"
  },
  "automaticCheckDate": {
    "$date": "2025-04-21T13:14:24.453Z"
  },
  "remainingTime": {
    "$date": "2025-04-21T12:28:07.699Z"
  },
  "personalChannel": "ebVZBpbUvQ7yGiRR",
  "personalChannelDate": {
    "$date": "2025-03-29T15:27:26.394Z"
  },
  "lazyCheckDate": {
    "$date": "2025-04-20T21:05:46.582Z"
  },
  "historySpamBlocks": [
    {
      "spamBlockDate": {
        "$date": "2025-04-10T13:23:00.000Z"
      },
      "spamBlockDays": 1
    }
  ],
  "username": "solovieva_marvellous"
},
{
  "_id": {
    "$oid": "67dd2ae5f5fa1dc49466c73a"
  },
  "accountId": "5936720003-prefix-female-casino",
  "dc1": "50b2a3bd172316bb2e925308ea8cbaff2bfed322ba38ed446ae5f6fd69ceed1c47de4009d5e31226635f16af0a9f0b55fd73b3c92053adc4e1822b4d8e4c012e30a8981300d29ad8b0dba9e5efb2e37e281ad82ca6d913f17ec5d1cfe82bbdd5e3dc3e6dfec27a5c5543823c1a99d23b76e819f75174432f242d75cc15adee5faa0c814a3415c08844055e698fdce9b9606c8c560e64df0c74b0d3c9d73af6685e675523d2075092b4aa0ba39a6c0eb58ce7328d4f561f633bdb6cfa0628a05dd2f191ea7959313a81c0d0f8ecd2e2482e1900e35f4452f5aad19144421efdacef066c4119f30b2bf06767274e2a71e476599e2f9aa786ecc7dbb3a9e0f6cd34",
  "dcId": 1,
  "nextApiId": 2496,
  "dateUpdated": {
    "$date": "2025-04-21T13:11:21.962Z"
  },
  "banned": false,
  "firstName": "Elena",
  "id": "5936720003",
  "lastName": "Timofeeva",
  "messageCount": 28,
  "twoFa": false,
  "twoFaDate": {
    "$date": "2025-04-20T16:07:00.581Z"
  },
  "automaticCheckDate": {
    "$date": "2025-04-21T13:11:21.961Z"
  },
  "remainingTime": {
    "$date": "2025-04-21T12:36:55.877Z"
  },
  "historySpamBlocks": [
    {
      "spamBlockDate": {
        "$date": "2025-03-30T07:46:00.000Z"
      },
      "spamBlockDays": 1
    }
  ],
  "personalChannel": "bKlUyCbcv9QdCbut",
  "personalChannelDate": {
    "$date": "2025-03-29T15:25:55.931Z"
  },
  "lazyCheckDate": {
    "$date": "2025-04-20T20:40:30.393Z"
  },
  "username": "timofeeva_multiple"
},
{
  "_id": {
    "$oid": "67dd2ae6f5fa1dc49466c741"
  },
  "accountId": "6722495116-prefix-female-casino",
  "dc1": "93ad7cb2d8122b8f11c3db3820e6519f78782e6a956db5a26d33228547233f2b0b03cbcf6ddfeed04316d1578159fbaf13ba8797e039476fc23b8d6a4d8050b1c408174d7566b8cd9bd822322b166f87f1d29e225cd344ba90bb108c4d25c286e56e5eddf0d6ca39fe38a8dd28f55ae988c731722a3b78f7feafb3c60d34cb8c46a1a591044bfc824d912c620641f4674214ec0188197611064048d009c7ae855619eae7d07290692b7d545818e210965af6f4a8d69fe02ccd6d5e2a46566f0f1aee4aa1bf8d9aa247c2d7eb238fd1a9b37a6aceb890dc5b361e1046ce7222fcd51049cd4848daec692d1bf1b7d8330fa31401fbe52f75517d77d3e17d415e54",
  "dcId": 1,
  "nextApiId": 2040,
  "dateUpdated": {
    "$date": "2025-04-21T21:52:56.067Z"
  },
  "banned": false,
  "firstName": "Ekaterina",
  "id": "6722495116",
  "lastName": "Serova",
  "messageCount": 34,
  "twoFa": false,
  "twoFaDate": {
    "$date": "2025-04-20T20:22:25.431Z"
  },
  "automaticCheckDate": {
    "$date": "2025-04-21T21:52:56.067Z"
  },
  "remainingTime": {
    "$date": "2025-04-21T12:49:33.007Z"
  },
  "personalChannel": "JgjYGMwjc6kaWkgf",
  "personalChannelDate": {
    "$date": "2025-03-29T15:26:10.873Z"
  },
  "lazyCheckDate": {
    "$date": "2025-04-21T21:52:55.750Z"
  },
  "username": "serova_involved"
},
{
  "_id": {
    "$oid": "67dd2ae6f5fa1dc49466c746"
  },
  "accountId": "7279675947-prefix-female-casino",
  "dc1": "928f53a18658dd62338cf78a462813ffbfacd6457594d5785c7dfeffdb686da30593b29150a62641e31822d0ebba5278168f3542b6d3f1f7e88f4a1f53260a9674d890d947896bce70b1ca1e45c5da659bd1f3f8c55d3440348227ee19502d1c11e086b6d493d2417d328dc232ad4243fb70c51d444a8cf5c1c1e9c3c5427360d340c3f7a3f24735301eb65bbfba4b7a7b26e9a179d1dffaa58a7ab06ec01661cb391067e0a442f27223f008594f4016ce030d3715bba1274c4486941ba57bca182ab267b7bdb66310dfa769b554195fdeb63a9b4952ad46b0233ba10327d39e73af7ac02a372a4b20d1bbb1831f2dbfe1f143e5c5b47a5a9bab28863f12efca",
  "dcId": 1,
  "nextApiId": 2496,
  "dateUpdated": {
    "$date": "2025-04-21T21:55:51.962Z"
  },
  "banned": false,
  "firstName": "Darina",
  "id": "7279675947",
  "lastName": "Sidorova",
  "messageCount": 34,
  "twoFa": false,
  "twoFaDate": {
    "$date": "2025-04-20T20:22:19.339Z"
  },
  "automaticCheckDate": {
    "$date": "2025-04-21T21:55:51.962Z"
  },
  "remainingTime": {
    "$date": "2025-04-21T09:50:48.082Z"
  },
  "personalChannel": "m7tLpNpKbDThgSxF",
  "personalChannelDate": {
    "$date": "2025-03-29T15:26:15.763Z"
  },
  "lazyCheckDate": {
    "$date": "2025-04-21T21:55:51.667Z"
  },
  "username": "sidorova_coastal",
  "spamBlockReasons": [
    {
      "reason": "I need to communicate with non-mutual contacts for essential business matters, but my account currently prevents this. I believe this limitation was applied incorrectly, as Ive never violated any policies. Please review and restore my full messaging access.",
      "date": {
        "$date": "2025-04-21T08:33:27.195Z"
      }
    }
  ],
  "historySpamBlocks": [
    {
      "spamBlockDate": {
        "$date": "2025-04-22T08:00:00.000Z"
      },
      "spamBlockDays": 1
    }
  ],
  "spamBlockDate": {
    "$date": "2025-04-22T08:00:00.000Z"
  },
  "spamBlockDays": 1,
  "spamBlockInitDate": {
    "$date": "2025-04-21T08:33:27.201Z"
  }
},
{
  "_id": {
    "$oid": "67dd2ae7f5fa1dc49466c748"
  },
  "accountId": "7708548013-prefix-female-casino",
  "dc1": "754f7636ea8e23092118367d94083e8eb2a562f48c728b9343e585dfa11c9148e144937bdd04d27162659ccf8dcc6159ec0d0b6259182aaef1038833770fc8f8856516c531d3ccbf0a97d0f0eda4cd9bf6d33d50da81618cc2a5aaf3ef6727c574ea8f8e49a0ed2218bba97f745a91dc06187ea661f5159e4e84bf47f12da84c12ef7be403600d3c59541790f74f4db79245f60e2a609b5e619bdcc4b65f2c1aef0359da519c24f3eeb7f2183c32f9add515189e3bf5cee7c7dec1cc7ddfbad5831a243105adb04766345127d1eb02b1c4c236605a1ed8c4784dae2b3ff689e6a9ffa66b69e9c19b960568da1acac52525042e4811e690d5cb750e772fa20d57",
  "dcId": 1,
  "nextApiId": 2040,
  "dateUpdated": {
    "$date": "2025-04-21T21:51:55.963Z"
  },
  "banned": false,
  "firstName": "Marina",
  "id": "7708548013",
  "lastName": "Lebedeva",
  "messageCount": 31,
  "twoFa": false,
  "twoFaDate": {
    "$date": "2025-04-20T16:07:02.657Z"
  },
  "automaticCheckDate": {
    "$date": "2025-04-21T21:51:55.963Z"
  },
  "remainingTime": {
    "$date": "2025-04-21T11:52:52.050Z"
  },
  "personalChannel": "sIbCBbhORdMEKf4C",
  "personalChannelDate": {
    "$date": "2025-03-29T15:25:09.522Z"
  },
  "lazyCheckDate": {
    "$date": "2025-04-21T21:51:55.636Z"
  },
  "username": "lebedeva_gastric"
},
{
  "_id": {
    "$oid": "67dd2ae7f5fa1dc49466c74b"
  },
  "accountId": "5989515680-prefix-female-casino",
  "dc1": "3b929e5ef124207c1684d2ea815b4b4f0a662d4e9180e750e1746db5bd6f8d4f355217ca3b459aa2d0826cfa35072e33615c1a1e3237319cd6bfdd193e090e5e62c63235ebf205f5bc40539e9406a56d809435c52353ffd35d96036b406f755a697e14d4ebcc9711e4f68d9430b39769e7d3a9b2783854832864fa8ee30dc15f21c372cd45d49510245609c6303cb8dab8488990ec99b41920c065feb6eaa4307c6343749e7714d7ab2740e5caed335792cc9a94ab2c2521cf8f4f8034f728f813f8ab665e92c7382afd4b96d30b3ebc915f4732424f44e4e4f5d52d68c698a47b9274a2977df9e9308f05eddd4332d9782ac72f0b28041f6eb8381848a515d1",
  "dcId": 1,
  "nextApiId": 2496,
  "dateUpdated": {
    "$date": "2025-04-21T21:55:50.540Z"
  },
  "banned": false,
  "firstName": "Rita",
  "id": "5989515680",
  "lastName": "Bulanova",
  "messageCount": 43,
  "twoFa": false,
  "twoFaDate": {
    "$date": "2025-04-20T20:22:19.277Z"
  },
  "automaticCheckDate": {
    "$date": "2025-04-21T21:55:50.540Z"
  },
  "remainingTime": {
    "$date": "2025-04-21T12:28:04.049Z"
  },
  "personalChannel": "wo6WrChPVtFpgovc",
  "personalChannelDate": {
    "$date": "2025-03-29T15:22:48.902Z"
  },
  "historySpamBlocks": [
    {
      "spamBlockDate": {
        "$date": "2025-04-03T05:10:00.000Z"
      },
      "spamBlockDays": 1
    }
  ],
  "lazyCheckDate": {
    "$date": "2025-04-21T21:55:50.262Z"
  },
  "username": "bulanova_sticky"
},
{
  "_id": {
    "$oid": "67dd2ae7f5fa1dc49466c74d"
  },
  "accountId": "7864136775-prefix-female-casino",
  "dc1": "9d8379772a97e40d4e421b6238f61b405d38f43693d626f1096345f59b75569a96a686cd25d2aa81db4052ac2cbd3d7b8e8cb42957c4be1669a36f5c515e916a4124510e564a25a2f7fc204ddc08e288213466b3f7e7b8673351b95d31e9efa319c8f9085587a12cd39e3140f86ff6f9582cbc7093364ca479462bfcd3841bf3df32c1238e82e1014f1ce308df7897033aa138c17bdbdb3790bef6fa78020e7a7b727401d7d874a13a22fc111694ac5248178f4ee659d2fa10fb81eb9d6dd0ad9d044196b1a5a3795d508d51c37fde1895f6b21a27292c4a8d6a9872bdc82154f458e005b7d2d8e67550c31ab735656049019e924d5bb9bdf93d1b34496f32fe",
  "dcId": 1,
  "nextApiId": 2496,
  "dateUpdated": {
    "$date": "2025-04-21T13:19:21.969Z"
  },
  "banned": false,
  "firstName": "Darina",
  "id": "7864136775",
  "lastName": "Dubrovina",
  "messageCount": 33,
  "twoFa": false,
  "twoFaDate": {
    "$date": "2025-04-20T20:22:21.205Z"
  },
  "automaticCheckDate": {
    "$date": "2025-04-21T13:19:21.969Z"
  },
  "remainingTime": {
    "$date": "2025-04-21T11:10:29.710Z"
  },
  "personalChannel": "uvWSwDsyJSTtruz2",
  "personalChannelDate": {
    "$date": "2025-03-29T15:26:13.886Z"
  },
  "historySpamBlocks": [
    {
      "spamBlockDate": {
        "$date": "2025-04-01T08:52:00.000Z"
      },
      "spamBlockDays": 1
    }
  ],
  "lazyCheckDate": {
    "$date": "2025-04-20T21:23:48.613Z"
  },
  "username": "dubrovina_national"
},
{
  "_id": {
    "$oid": "67dd2ae7f5fa1dc49466c751"
  },
  "accountId": "7146016368-prefix-female-casino",
  "dc1": "306a1618828aff099cb931ba66879414d64a171596fb05493c05d000d826293b78f1d510979d2c5109940ea5fac4116c9ed4a8ddc04adc822507173fab732fd6f9278883613b45cbb18375778c1742a7b65cdc39eacef6bdca06cc6b13e755e6919032665c765b0b233d804d235053430db5e58905b340b4f46417ab2582201ee73b0a7a6e4c5503484bc47b358425e52b70c7c2338012e84e99a272882d77e21e450ebde6ab15213c726c8a57b133a0adfa758a090acac7e4854e1861d98729bb12f9bd4ef9205f042d987ce2cc96175770d7a19723e2aaabba59d41fe240e4c115c1bfd1cf108c3bb2cf7ba9d11257fd434aebdd8c73413acdd8087a337103",
  "dcId": 1,
  "nextApiId": 2040,
  "dateUpdated": {
    "$date": "2025-04-21T13:18:23.087Z"
  },
  "banned": false,
  "firstName": "Maria",
  "id": "7146016368",
  "lastName": "Popova",
  "messageCount": 40,
  "twoFa": false,
  "twoFaDate": {
    "$date": "2025-04-20T20:22:25.408Z"
  },
  "automaticCheckDate": {
    "$date": "2025-04-21T13:18:23.087Z"
  },
  "remainingTime": {
    "$date": "2025-04-21T11:52:59.697Z"
  },
  "historySpamBlocks": [
    {
      "spamBlockDate": {
        "$date": "2025-03-30T09:05:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-04-09T20:35:00.000Z"
      },
      "spamBlockDays": 1
    }
  ],
  "personalChannel": "drA0atASHiFPULQO",
  "personalChannelDate": {
    "$date": "2025-03-29T15:23:26.510Z"
  },
  "lazyCheckDate": {
    "$date": "2025-04-20T21:20:47.032Z"
  },
  "username": "popova_overwhelming"
},
{
  "_id": {
    "$oid": "67dd2ae8f5fa1dc49466c756"
  },
  "accountId": "6525052887-prefix-female-casino",
  "dc1": "36db45f69c8da269151296587c544cae60f2ed3dd63dd3c2d15efa228620c3ba7967acd8e8fdc0f8b9de6d8cfdf62fbed9937a5438175a109de1808a0526cb50bb1a04ac96545c83a5a995a96698bc62f4a3a9c7622b1d8bbfc9b000f089d0ef14b4659fcdb6b76be0c6126a8fa3c933e65bdb953e7bb4afec4fce57020a86160cd4aa53352357e34ebe0dd8880491e7bdc2354bc9058a22e59e5ef815ec9929ac1988385bd51f42c1010c051fad900f0d0002cf52f5788a7bb8c870c5c5db730a15fa1afaef2bb2d400e3b44fd6306f30c5d98e3d5fe5e975eafcbd01541249c207ecc7500dae72b58f1318bd68867430ff7869002cfe947d0aa847ef76800b",
  "dcId": 1,
  "nextApiId": 2496,
  "dateUpdated": {
    "$date": "2025-04-21T21:53:52.237Z"
  },
  "banned": false,
  "firstName": "Polina",
  "id": "6525052887",
  "lastName": "Zaitseva",
  "messageCount": 32,
  "twoFa": false,
  "twoFaDate": {
    "$date": "2025-04-20T20:22:21.118Z"
  },
  "automaticCheckDate": {
    "$date": "2025-04-21T21:53:52.237Z"
  },
  "remainingTime": {
    "$date": "2025-04-21T12:11:11.745Z"
  },
  "personalChannel": "tHBWS9TPrWCeGliN",
  "personalChannelDate": {
    "$date": "2025-03-29T15:23:23.214Z"
  },
  "lazyCheckDate": {
    "$date": "2025-04-21T21:53:51.929Z"
  },
  "username": "zaitseva_universal"
},
{
  "_id": {
    "$oid": "67dd2ae8f5fa1dc49466c75b"
  },
  "accountId": "1020169381-prefix-female-casino",
  "dc1": "3a5f4a459b1bdfe7c52fcd484657fb0ba052af9cb081c26cf7d56fd0e629231defaa6117ebb7cdfc1fde8512a8afcdefccfa818a9164854a1b51b0f43847e3067b247c59e83d28fc153cee18403d3de4090388b89e15b81b77453a27947e95656745d8d454764927a726fe7ccc208c3378384b5a9a80ed12861271a2ee3aded7f37d707aa4a234c1efc8b5690b444af0935f495368020bccd9249e000895afbdb022d026dff09c867eb9293690a68d6e608fa8bedfefe7de23357719e77372ef51465a3b06b27f1ae21ee3c71a0153d52c2d59479171afb7afef09afbd0b704bd5c9811c3f3ccf0676af84ea78fad54acd614b887673ceba1270f98aa2400ad1",
  "dcId": 1,
  "nextApiId": 2496,
  "dateUpdated": {
    "$date": "2025-04-21T13:24:24.454Z"
  },
  "banned": false,
  "firstName": "Alla",
  "id": "1020169381",
  "lastName": "Egorova",
  "messageCount": 34,
  "twoFa": false,
  "twoFaDate": {
    "$date": "2025-04-20T20:22:25.432Z"
  },
  "automaticCheckDate": {
    "$date": "2025-04-21T13:24:24.454Z"
  },
  "remainingTime": {
    "$date": "2025-04-21T12:45:57.780Z"
  },
  "personalChannel": "oPFXmPN2GQaojBFY",
  "personalChannelDate": {
    "$date": "2025-03-29T15:24:55.511Z"
  },
  "lazyCheckDate": {
    "$date": "2025-04-20T20:48:31.525Z"
  },
  "username": "egorova_old"
},
{
  "_id": {
    "$oid": "67dd2ae9f5fa1dc49466c760"
  },
  "accountId": "7188341420-prefix-female-casino",
  "dc1": "948960ccafb3f539d70f005769f9fd2e8de8aaed0cc605c72fe5da43885f301c00704f63c431cf6777ee5e7763f33d13df5a1ba29a3392aaaa6d03cae1fdd5134647a5590bcaca7da6ec6666f63fe323b49523557d883d4008176122cf324652faa9bb58ed5e15e092cbf1f4d7573f052946942385108e4c0e7c4a805b50f9634458242400c5df3eab3dee6c327781138073ddfc9d8500796e52c70f0701100d72fc8bd5c84fe897ed1a1e11cc0536570e5c587fa6d0ab1c43fe4b8c946c825bc1ac2c648b27ef99db9b2807492aa902543e334500cd26e0bbac65fbb3904a0304381ed1631b061336dec482850f0c7a54e679c275ae1699c0bbc2140cfd888d",
  "dcId": 1,
  "nextApiId": 2040,
  "dateUpdated": {
    "$date": "2025-04-21T13:22:23.081Z"
  },
  "banned": false,
  "firstName": "Arina",
  "id": "7188341420",
  "lastName": "Nesterova",
  "messageCount": 35,
  "twoFa": false,
  "twoFaDate": {
    "$date": "2025-04-20T16:06:58.498Z"
  },
  "automaticCheckDate": {
    "$date": "2025-04-21T13:22:23.081Z"
  },
  "remainingTime": {
    "$date": "2025-04-21T10:02:53.340Z"
  },
  "historySpamBlocks": [
    {
      "spamBlockDate": {
        "$date": "2025-03-30T10:32:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-04-08T09:56:00.000Z"
      },
      "spamBlockDays": 1
    }
  ],
  "personalChannelDate": {
    "$date": "2025-03-29T21:33:19.125Z"
  },
  "personalChannel": "kS0jzyanpfuqxQHq",
  "lazyCheckDate": {
    "$date": "2025-04-20T21:21:46.404Z"
  },
  "username": "nesterova_delightful"
},
{
  "_id": {
    "$oid": "67dd2ae9f5fa1dc49466c766"
  },
  "accountId": "5018133384-prefix-female-casino",
  "dc1": "275706d4676cd70de8ca606099c4728b4a8ccd64f40b0e91c351e9c83741c19ec280e94452e3616ec0a834f87bd8b732c0112a195d82713d18e4f6e2f1f3efb2d8fa9ba819b45e1b4bb02fcc88cfd1fa548257c2a3dc502a7d8c298160b73f22d72abfd1659f5d90e2e9bd98d793bf8dedf5fe724eec069bc9648c11dcfa78516aa428c7a34d6bbd8fd7403e395ed9dbf11030d08e48ba138b318ce13ee0508d63883c5ddbbdd1c31d63bc22b6c6994f576d98ac021b9bf1c2b01541405bb98696dd3579dd5eed51ea09ae4c39dbfd551a218c265d871dadfc9fd68d3a6ff1b2a30d4f1ce7373fb7e65148b917b741541cd85d78a96da23af84304bbdf6976d5",
  "dcId": 1,
  "nextApiId": 2040,
  "dateUpdated": {
    "$date": "2025-04-21T13:11:22.935Z"
  },
  "banned": false,
  "firstName": "Irina",
  "id": "5018133384",
  "lastName": "Alekseeva",
  "messageCount": 31,
  "automaticCheckDate": {
    "$date": "2025-04-21T13:11:22.935Z"
  },
  "historySpamBlocks": [
    {
      "spamBlockDate": "INFINITY",
      "spamBlockDays": 0
    },
    {
      "spamBlockDate": {
        "$date": "2025-04-08T08:54:00.000Z"
      },
      "spamBlockDays": 1
    }
  ],
  "twoFa": false,
  "twoFaDate": {
    "$date": "2025-04-19T15:50:55.000Z"
  },
  "remainingTime": {
    "$date": "2025-04-21T11:54:51.832Z"
  },
  "personalChannel": "RftIaRGsWbIUgZq7",
  "personalChannelDate": {
    "$date": "2025-03-29T15:23:23.976Z"
  },
  "lazyCheckDate": {
    "$date": "2025-04-20T21:01:47.073Z"
  },
  "username": "alekseeva_shared"
},
{
  "_id": {
    "$oid": "67dd2ae9f5fa1dc49466c76e"
  },
  "accountId": "7634602561-prefix-female-casino",
  "dc1": "2f59a151a9da0f99e4a1e1c32615daa85829eae00892ce255a8a239a15c74b526fe5c88ea2de38c3761f70a8e4a7705fe68bf34e30711c2c419f8c5907f1c5be2e67b294c29a3d8a6c6f4534fbb149412264c94524681bfdaf78f0dbc84620537090602c8dce3d3e2cbf8d40296a5985d042e7d4dea30713633a2d403df69daa4771b4637ba0f8e0f45df9ba6dbce9896c9aaa8aa8866391b0485aaebdce371c88e21d974d8c556a0a084d86ebc3844efcef6df9568f158b9556b5ef5212f9c54d92cdb1f93429c8a48d3676f8a7320dbcc746e3b63d9df074e38e06a9e2b7ac3498eb40e810f89dd882e63bdecdcf9e80449abe01163901e3e1ba921cdafbf2",
  "dcId": 1,
  "nextApiId": 2040,
  "dateUpdated": {
    "$date": "2025-04-21T13:23:25.084Z"
  },
  "banned": false,
  "firstName": "Darina",
  "id": "7634602561",
  "lastName": "Rostova",
  "messageCount": 32,
  "twoFa": false,
  "twoFaDate": {
    "$date": "2025-04-20T20:22:21.206Z"
  },
  "automaticCheckDate": {
    "$date": "2025-04-21T13:23:25.084Z"
  },
  "remainingTime": {
    "$date": "2025-04-21T12:09:28.411Z"
  },
  "personalChannel": "MOlXhrHTb6qhBUmA",
  "personalChannelDate": {
    "$date": "2025-03-29T15:22:35.220Z"
  },
  "lazyCheckDate": {
    "$date": "2025-04-20T20:36:31.047Z"
  },
  "username": "rostova_weekly"
},
{
  "_id": {
    "$oid": "67dd2aeaf5fa1dc49466c771"
  },
  "accountId": "6844657584-prefix-female-casino",
  "dc1": "12345c51687e49ebc04763df56f6892327c96e34928a72e229e0bc0c194e874f3bbee05141838918a057f595f40d722de98f86a78ae3edc3a2cb429985f105feaf854582b7b4185ca559d8adb681c68a714bcfcec69918ab5c314685754bb1cfdad0b2e78d1461c352c241c659e9628f16b2a742936a0ab9568ebb9188f609f06e6530d5a1217d8dbb3eb8decbac3f72846ba3856ca296e6d8c38ffc95f47dc295f3e781d340c2be17d84cf9906b20fd17236ec662714c3f8d88bf4038527eef8c35491aa7440f95c7785c81305acbe6572d13a698d43580451128cad7c6cb2735c919eb393b54b9adb80a21522c9b1bf23fd708ad1aaf5d112ea5ffb424ef70",
  "dcId": 1,
  "nextApiId": 2496,
  "dateUpdated": {
    "$date": "2025-04-21T13:18:24.438Z"
  },
  "banned": false,
  "firstName": "Vera",
  "id": "6844657584",
  "lastName": "Malyutina",
  "messageCount": 42,
  "twoFa": false,
  "twoFaDate": {
    "$date": "2025-04-20T20:22:21.330Z"
  },
  "automaticCheckDate": {
    "$date": "2025-04-21T13:18:24.438Z"
  },
  "remainingTime": {
    "$date": "2025-04-21T12:38:29.776Z"
  },
  "personalChannel": "CFUzfwaxVyQAB7Zj",
  "personalChannelDate": {
    "$date": "2025-03-29T15:26:48.327Z"
  },
  "lazyCheckDate": {
    "$date": "2025-04-20T21:22:49.272Z"
  },
  "username": "malyutina_weird"
},
{
  "_id": {
    "$oid": "67dd2aeaf5fa1dc49466c774"
  },
  "accountId": "5670756430-prefix-female-casino",
  "dc1": "610ad3e2bc7c714c5f6502f7f61225cd2577dc6d950261be7b26530b6ad320f7e85dbda4afa2f668471af98591ddf682bdcb203e0a07550fa9b35df59e4eb9b291bf51b5745e277e4cf6be8c9921aff9fcf87867c352fa55fde997627f7e0d1f0a0902f9634c6922eff2e7f95e4be0b7a0e1714fa27399fb62c30e52d35982a2a69fd094259529e2396baf4a06b507e60251f545baed46892a2e3ac06cf96b2368141abb0071f23eb8ec22cc46d1bc64eb1479ca905060bc112242dcfda163873327e233ef579c28bb5adfe6b784c00e927db13f177df5db265fa75d4cac79ae2ca82a37cfe382ab9d853a4e56a83f601429c6eb52088d771d287fb08e9e6b6f",
  "dcId": 1,
  "nextApiId": 2040,
  "dateUpdated": {
    "$date": "2025-04-21T21:55:55.238Z"
  },
  "banned": false,
  "firstName": "Anna",
  "id": "5670756430",
  "lastName": "Tomilova",
  "messageCount": 34,
  "twoFa": false,
  "twoFaDate": {
    "$date": "2025-04-20T20:22:25.053Z"
  },
  "automaticCheckDate": {
    "$date": "2025-04-21T21:55:55.238Z"
  },
  "remainingTime": {
    "$date": "2025-04-21T12:30:12.908Z"
  },
  "personalChannel": "HbyYTfegmRoNjG3d",
  "personalChannelDate": {
    "$date": "2025-03-29T15:27:30.889Z"
  },
  "lazyCheckDate": {
    "$date": "2025-04-21T21:55:54.915Z"
  },
  "username": "tomilova_complete"
},
{
  "_id": {
    "$oid": "67dd2aeaf5fa1dc49466c777"
  },
  "accountId": "6841757757-prefix-female-casino",
  "dc1": "a8baf153906aaecae5c5416568b2e958d25b712b781d5fd19b5c88c0fd8ab1703f1085322c37ad677a6925c0c3c8c32aa11be465ed0bcf7b03bc2f7c87d8bf7ecdaf5d4f667404d334e13e9011b1e7b43c307eebacc11590b308e7ac2702606ddee10a4eb9c22f8a1e919983e7dafbfea5abbea7e0de6723912ee9e253343b8be7e7ad6b11b4cd5a342e83623cf9c11215007605e9125034b17ab5edf7f729fa8f72c5336acdf7fcdccf6efd53e1910fd2fa741cccd49f78b12754590d128b87d4354a8064a1a359bc4382e5dc0bcc9cd62fc19f5085580d8ba824ffd419d1cc101d6909fee31f09f4cfd471dee8ed87fc8754521118348802c1fd9673057c2a",
  "dcId": 1,
  "nextApiId": 2496,
  "dateUpdated": {
    "$date": "2025-04-21T13:07:25.188Z"
  },
  "banned": false,
  "firstName": "Mira",
  "id": "6841757757",
  "lastName": "Soboleva",
  "messageCount": 33,
  "twoFa": false,
  "twoFaDate": {
    "$date": "2025-04-20T16:06:59.505Z"
  },
  "automaticCheckDate": {
    "$date": "2025-04-21T13:07:25.188Z"
  },
  "remainingTime": {
    "$date": "2025-04-21T07:14:13.253Z"
  },
  "historySpamBlocks": [
    {
      "spamBlockDate": {
        "$date": "2025-04-05T08:24:00.000Z"
      },
      "spamBlockDays": 7
    },
    {
      "spamBlockDate": {
        "$date": "2025-04-07T18:31:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-04-12T08:05:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": "INFINITY",
      "spamBlockDays": 0
    },
    {
      "spamBlockDate": {
        "$date": "2025-04-22T05:24:00.000Z"
      },
      "spamBlockDays": 1
    }
  ],
  "personalChannel": "zrm1lqXExkpfLTCS",
  "personalChannelDate": {
    "$date": "2025-03-29T15:24:26.054Z"
  },
  "lazyCheckDate": {
    "$date": "2025-04-20T21:00:49.357Z"
  },
  "username": "soboleva_convenient",
  "spamBlockReasons": [
    {
      "reason": "My recent inability to message non-mutual contacts is concerning. I need access to communicate with important people, so Id appreciate a review of this issue soon. I havent done anything wrong to warrant this.",
      "date": {
        "$date": "2025-04-21T05:54:14.108Z"
      }
    }
  ],
  "spamBlockDate": {
    "$date": "2025-04-22T05:24:00.000Z"
  },
  "spamBlockDays": 1,
  "spamBlockInitDate": {
    "$date": "2025-04-21T05:54:14.113Z"
  }
},
{
  "_id": {
    "$oid": "67dd2aeaf5fa1dc49466c77a"
  },
  "accountId": "6120374287-prefix-female-casino",
  "dc1": "2434989ea4554a468bd65aab501c521e14284a3973e6e7609995a14601e1f7dc3df041c37d64c32440b0ca94970c14a4be76745006989607b9b1bbad483760ec21d9b05e8a9a6ba97c4fd93d95db5999c2ed8343086b81489406f1d3b82b51e5e502d86963cafe722c31c8a73747f83ad92dcb90c8e5d75ad7e867b8d013c78c837dd0ed4a5fafb490aac147969212a70e074a9d40efaceacbb325c36497d1c4054e044451d16722a866b36b9c97af56cbb86c86dcefd48f90fac61c206fe32b701376eb1055b89dbc43533bbb21d0a91d8bd112998733314b256754a693c1e423612525123fc33d1be348a43d1619a94085ddb5619593513597ec86c6ee48d2",
  "dcId": 1,
  "nextApiId": 2040,
  "dateUpdated": {
    "$date": "2025-04-21T13:27:25.068Z"
  },
  "banned": false,
  "firstName": "Inna",
  "id": "6120374287",
  "lastName": "Serova",
  "messageCount": 37,
  "twoFa": false,
  "twoFaDate": {
    "$date": "2025-04-20T20:22:25.530Z"
  },
  "automaticCheckDate": {
    "$date": "2025-04-21T13:27:25.068Z"
  },
  "remainingTime": {
    "$date": "2025-04-21T12:02:20.863Z"
  },
  "personalChannelDate": {
    "$date": "2025-03-29T21:33:56.139Z"
  },
  "personalChannel": "uAFNPUXgTaHB7WAz",
  "lazyCheckDate": {
    "$date": "2025-04-20T21:11:49.212Z"
  },
  "username": "serova_hissing"
},
{
  "_id": {
    "$oid": "67dd2aebf5fa1dc49466c784"
  },
  "accountId": "7576981161-prefix-female-casino",
  "dc1": "50ffdfba9543755978a28a2f01dade360ec58653b553d94367bdf64bfd696339d3ed50064748faa3b73e40dedcddca5222b4dfebd36fae037d9f33a13feac7cfea3ff99007d467661d3889c069874384494d2dc77e041dc9de6dae98c92be9cb8ffa2b5c19df38c20665ceee30a79eb78d7fea7c66ed01eb354714ae1baa3044e7ff28136ba11bdc6efea8ac468ef01c1b6a3db7da13f6ff878d763bceefc3cc45b8845c490e073f2f8b44132dbddb312ba8b08ac641053a2131724e421abb0d751700d557876107fb1dfb62b95505387ea4e323db05401cc333cb6f8d33720620e61865350c6a348aab5e03f9e4d33349aa8832e6b71a03d7a0eb54378e70fb",
  "dcId": 1,
  "nextApiId": 2040,
  "dateUpdated": {
    "$date": "2025-04-21T21:52:57.820Z"
  },
  "banned": false,
  "firstName": "Polina",
  "id": "7576981161",
  "lastName": "Melnikova",
  "messageCount": 41,
  "twoFa": false,
  "twoFaDate": {
    "$date": "2025-04-20T16:06:59.672Z"
  },
  "automaticCheckDate": {
    "$date": "2025-04-21T21:52:57.820Z"
  },
  "remainingTime": {
    "$date": "2025-04-21T11:32:31.821Z"
  },
  "personalChannel": "RWUqJ4dhoEjRcANj",
  "personalChannelDate": {
    "$date": "2025-03-29T15:26:51.691Z"
  },
  "lazyCheckDate": {
    "$date": "2025-04-21T21:52:57.513Z"
  },
  "historySpamBlocks": [
    {
      "spamBlockDate": {
        "$date": "2025-04-07T11:45:00.000Z"
      },
      "spamBlockDays": 1
    }
  ],
  "username": "melnikova_decisive"
},
{
  "_id": {
    "$oid": "67dd2aebf5fa1dc49466c78d"
  },
  "accountId": "7268588683-prefix-female-casino",
  "dc1": "109c9d11d26f92b79e1d51de2e5c4037b6582a2a6a1f9d6d94a65c78b406eedfcd5d9a3a2f59eb61e6c717fd5fe51bb2ec6fe8d4c9ecf0d113641cdf755e643b901593be187beeea3f1e948b2b0067e02958d8abbfef0b38aae7b56cd300f00ec3401062f6a15e7204c319d3cc4b95095604551f11bafa1ff1da28ffcc1a7b5485767d4b7a52c74e5d26a1eab2f60eacc9dc9639085a0afecb7e032abd787b5cd731ff9b0f4d19d432a7083b4d790c64add17335745fa63df41fa2dcc0b583c6a5f3693b3d0fec203eed953ba9f04aa71f8b51b6e701f56fe9bd207c62c088f364a4c67dd0324c5b2db0192771e166d4c4f83bbd251fc246d148faae1083d11e",
  "dcId": 1,
  "nextApiId": 2496,
  "dateUpdated": {
    "$date": "2025-04-21T13:18:25.076Z"
  },
  "banned": false,
  "firstName": "Liza",
  "id": "7268588683",
  "lastName": "Petrova",
  "messageCount": 37,
  "twoFa": false,
  "twoFaDate": {
    "$date": "2025-04-20T20:22:19.278Z"
  },
  "automaticCheckDate": {
    "$date": "2025-04-21T13:18:25.076Z"
  },
  "remainingTime": {
    "$date": "2025-04-21T12:36:17.594Z"
  },
  "personalChannel": "thfyvvmBEc0dcLll",
  "personalChannelDate": {
    "$date": "2025-03-29T15:22:53.267Z"
  },
  "historySpamBlocks": [
    {
      "spamBlockDate": {
        "$date": "2025-04-04T07:15:00.000Z"
      },
      "spamBlockDays": 1
    }
  ],
  "lazyCheckDate": {
    "$date": "2025-04-20T21:08:51.294Z"
  },
  "username": "petrova_uptight"
},
{
  "_id": {
    "$oid": "67dd2aecf5fa1dc49466c791"
  },
  "accountId": "7538065092-prefix-female-casino",
  "dc1": "a5cc3b2d3be5854b37ff27a30a29b86cf5a78eb075b7e86a5d67e1be4e681084bb25b6c61bb6a68ff8e3f82a44d48aa865cf52de10bd89af4200180533f7b04be47104b9fa572d2349a50e4d68e68809a5c7997c78d122b8d4a1f86f8dd30c653cea09011c99e208c05a56bbaed3e06623d4e1bb17a13410b09b895727638e47c8dbd77d786e4334a00572a8a14b28f9130ff33c49c23a0f6b491cc2cabe9a952c2fea4b8071ac938059b53760a4b6ed74f224ee4bc139d903dae5f6465ac6bb1bb49180bab03ccc01d4a04beab0135c330141109c87e08a13a27c18a6fdbcc06b450061fa594b5ab824cd7d75d51f512a9ab05214bb7916a50555dae6581771",
  "dcId": 1,
  "nextApiId": 2040,
  "dateUpdated": {
    "$date": "2025-04-21T13:30:25.086Z"
  },
  "banned": false,
  "firstName": "Galina",
  "id": "7538065092",
  "lastName": "Popova",
  "messageCount": 34,
  "twoFa": false,
  "twoFaDate": {
    "$date": "2025-04-20T16:06:59.669Z"
  },
  "automaticCheckDate": {
    "$date": "2025-04-21T13:30:25.086Z"
  },
  "remainingTime": {
    "$date": "2025-04-21T12:11:21.794Z"
  },
  "personalChannel": "cYtUQLo9JfRnYBfV",
  "personalChannelDate": {
    "$date": "2025-03-29T15:26:17.002Z"
  },
  "lazyCheckDate": {
    "$date": "2025-04-20T21:06:49.307Z"
  },
  "username": "popova_innovative"
},
{
  "_id": {
    "$oid": "67dd2aecf5fa1dc49466c799"
  },
  "accountId": "6436400782-prefix-female-casino",
  "dc1": "1e61f30dae76087c58185abc60daf542263e31094bd2f5f2c761c9810278263d8f8d03eaa34a56afc07608cf542d3c91fe962f5bb84c3d68497aa15a11af24012290ac115d6dd5eedecac5ebbd870d4190844f973eebf1d1a5602d3f0143ad07dfc8193e476c0da1b39bfad4e1ee14ebb5f49497b1209fd0d4ee395e0cda6f869c1daf2e627a0ef8dcb0be761641cc16be069b1f534d262287bdcfc3a1e0c92237fcf13a2031d83cb0d80527f3ce9d70a37daef7a24c9b46eec5516d3ed34e2295d68344af6795ac85d6d12435809c765d080f7cb536ab4b598c52fd41b613ec8f4a67ba7b0e0e892da92d5790af9c13d2c2b834749c154b67b011acd038b1b8",
  "dcId": 1,
  "nextApiId": 2496,
  "dateUpdated": {
    "$date": "2025-04-21T13:30:26.516Z"
  },
  "banned": false,
  "firstName": "Evgenia",
  "id": "6436400782",
  "lastName": "Borisova",
  "messageCount": 17,
  "twoFa": false,
  "twoFaDate": {
    "$date": "2025-04-20T20:22:25.436Z"
  },
  "automaticCheckDate": {
    "$date": "2025-04-21T13:30:26.516Z"
  },
  "remainingTime": {
    "$date": "2025-04-21T07:15:13.581Z"
  },
  "personalChannel": "nlCnVrMhT4EJPHXm",
  "personalChannelDate": {
    "$date": "2025-03-29T15:23:28.508Z"
  },
  "historySpamBlocks": [
    {
      "spamBlockDate": {
        "$date": "2025-04-03T09:33:00.000Z"
      },
      "spamBlockDays": 1
    }
  ],
  "lazyCheckDate": {
    "$date": "2025-04-20T21:01:48.570Z"
  },
  "username": "borisova_nutritious"
},
{
  "_id": {
    "$oid": "67dd2aedf5fa1dc49466c79b"
  },
  "accountId": "7241758307-prefix-female-casino",
  "dc1": "9e398586639c5ac6ae62548e0fbc39a58745bb9a470d0d168e6fddc96e4003b99797e77dafa5abf48163b885e16fe5a754971dc675a2109eb603451689f688c9c1c4c9a2cb1794cd791ce2ff8e59f6585f7cfe96c3b0543255f7145a5b5a3fc4151e2e564234073a56d9da731ed5ebdf8e446ca9f600639c9ec473cd5020ba16fdd3cb72b2469169038ff394b45a912e2c02c1fb4ba091a2d5cef9965dd21d9878766fbdd994ced92b7809856cabf82d3b049ff50288f7bcad3aa704478e012531299ec0234cad5b6b1e793fbf2e709d64ac30978a8529157c6dc29b9abd2347521a43cfa13593ae5552cb17084e581aa4a57f0c659d4c4845ad7b77cecc85d2",
  "dcId": 1,
  "nextApiId": 2496,
  "dateUpdated": {
    "$date": "2025-04-21T21:52:10.038Z"
  },
  "banned": false,
  "firstName": "Alisa",
  "id": "7241758307",
  "lastName": "Puchkova",
  "messageCount": 15,
  "twoFa": false,
  "twoFaDate": {
    "$date": "2025-04-20T20:22:25.435Z"
  },
  "automaticCheckDate": {
    "$date": "2025-04-21T21:52:10.038Z"
  },
  "remainingTime": {
    "$date": "2025-04-21T07:04:29.969Z"
  },
  "personalChannel": "fvmLgNAKDDgrV7xK",
  "personalChannelDate": {
    "$date": "2025-03-29T15:26:26.794Z"
  },
  "lazyCheckDate": {
    "$date": "2025-04-21T21:52:09.793Z"
  },
  "username": "puchkova_jittery"
},
{
  "_id": {
    "$oid": "67dd2aedf5fa1dc49466c7a0"
  },
  "accountId": "1053188514-prefix-female-casino",
  "dc1": "a29f723c49faea7942623c7bc7ecdc3e74ae57f0e779958ce26d0e6ecc21b6728da557cf65628db7cc3b964bc3868a5c0ec3c224aafc687f2dc08c8e65a07958412867419736360e0c433010b64e2258ec2331e5f0195938503728050921b836518ff83eb83f0fe2049a71bc3221284bbe2fa456ddb12913f42afa0488cc7bfa3ac8f519b2c95a7c507324e303af5571ed8afd239d432452d9ca7d55cdd3d7d02f917bd4b8356cb7d4eeafad7ae82d4122f1fe9025809cd15b44622dbb240bb8285b53cec1aecf124b01e96d11e5ee4ce30c71632d802712bc3e91ca70b88a10846d5ae3c3ec74d44a6d9e2f7388c2ca60689376da3da39c17b55bac26ee156d",
  "dcId": 1,
  "nextApiId": 2040,
  "dateUpdated": {
    "$date": "2025-04-21T13:13:28.222Z"
  },
  "banned": false,
  "firstName": "Anna",
  "id": "1053188514",
  "lastName": "Borisova",
  "messageCount": 40,
  "automaticCheckDate": {
    "$date": "2025-04-21T13:13:28.222Z"
  },
  "remainingTime": {
    "$date": "2025-04-21T12:35:46.724Z"
  },
  "personalChannel": "ZvvZFxBEjZ8kvUFb",
  "personalChannelDate": {
    "$date": "2025-03-29T15:27:20.152Z"
  },
  "lazyCheckDate": {
    "$date": "2025-04-20T21:05:53.616Z"
  },
  "historySpamBlocks": [
    {
      "spamBlockDate": {
        "$date": "2025-04-09T18:08:00.000Z"
      },
      "spamBlockDays": 1
    }
  ],
  "username": "borisova_sound"
},
{
  "_id": {
    "$oid": "67dd2aeef5fa1dc49466c7a3"
  },
  "accountId": "6301926414-prefix-female-casino",
  "dc1": "aaeba966f5ce5e958962ee19ff6d942fbaee344a083bbfe7ee58736516ef8e749a5350d131f376dc351dfd68212c1c03568c66f5dbd6f521f190da8ed9c218673689fe1a62cc7958203f3fd272f802cad11330bc249f1051d49d7cdd64109a1a46afac475827c2f03728609e19f033d203c5938f1dcbba4bbaff9e29949749694b3b250ce547ad9b7a36fae9510380d5073f2359a9b3507c2406c0b2913e2dc22d3e09c42977581b7eaf8a8348c8e80578c1e139006de375caf5e9393775a159a0cb7fad175b4fa9f7921f8cf0d5e74e8f298552701285b2820e87171119c94b048ba3cad960e83088f35dec639d36d8aa9dccc25d09a97fcc4e24720d62ae41",
  "dcId": 1,
  "nextApiId": 2496,
  "dateUpdated": {
    "$date": "2025-04-21T21:50:28.458Z"
  },
  "banned": false,
  "firstName": "Evgenia",
  "id": "6301926414",
  "lastName": "Tomilova",
  "messageCount": 39,
  "twoFa": false,
  "twoFaDate": {
    "$date": "2025-04-20T16:06:57.510Z"
  },
  "automaticCheckDate": {
    "$date": "2025-04-21T21:49:51.332Z"
  },
  "remainingTime": {
    "$date": "2025-04-21T07:42:17.482Z"
  },
  "historySpamBlocks": [
    {
      "spamBlockDate": {
        "$date": "2025-03-29T10:13:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-04-22T05:50:00.000Z"
      },
      "spamBlockDays": 1
    }
  ],
  "personalChannel": "UPQ4AoOcXhfcUxEa",
  "personalChannelDate": {
    "$date": "2025-03-29T15:24:02.102Z"
  },
  "lazyCheckDate": {
    "$date": "2025-04-21T21:49:51.095Z"
  },
  "username": "tomilova_geographical",
  "spamBlockReasons": [
    {
      "reason": "My account has been incorrectly limited in messaging functionality. I have never violated any rules and ask that this issue be resolved, allowing me to message all contacts.",
      "date": {
        "$date": "2025-04-21T06:33:25.092Z"
      }
    },
    {
      "reason": "Id like to regain full messaging capabilities for my account, as the current restriction seems unjustified. I havent done anything to violate the platforms rules, so I hope this mistake can be rectified. Please review my case.",
      "date": {
        "$date": "2025-04-21T21:50:28.458Z"
      }
    }
  ],
  "spamBlockDate": {
    "$date": "2025-04-22T05:50:00.000Z"
  },
  "spamBlockDays": 1,
  "spamBlockInitDate": {
    "$date": "2025-04-21T06:33:25.096Z"
  }
},
{
  "_id": {
    "$oid": "67dd2aeef5fa1dc49466c7a8"
  },
  "accountId": "7377299417-prefix-female-casino",
  "dc1": "67ad1e4cf69143608b603303dd1fe3386a97ac2662668cdaf8494b1008f9c938525d2c94d0175bbf47b949e45d075377f334d9050b853a55b7edd98ab701a64d82187d0114b21d6f60ea45c88b7b400a00fbbec5165f5ac843801afc0a499b573994331cefb563409557ca0e7523dac9afb1bcdf9ae170701fa61a73d0e02042e630513ac3ff468b2fa60fd15fe24b801efe97c2069d7cd5ede7ce1c768a7d45ceaaf33fcb7b12f337a813af5eabcd65a2c964b69272263e6e7cd7de415a3d18b67fa2b0554b1c5682171ea8410d11713b7babf9b0aa342f67b07a3ef1233e453e6bc43894a6f0f1ac38daa469d9ce193aed154d9b4b7b675cae8c53cdcd9ed4",
  "dcId": 1,
  "nextApiId": 2496,
  "dateUpdated": {
    "$date": "2025-04-21T13:07:25.188Z"
  },
  "banned": false,
  "firstName": "Ekaterina",
  "id": "7377299417",
  "lastName": "Antonova",
  "messageCount": 33,
  "twoFa": false,
  "twoFaDate": {
    "$date": "2025-04-20T20:22:25.405Z"
  },
  "automaticCheckDate": {
    "$date": "2025-04-21T13:07:25.188Z"
  },
  "remainingTime": {
    "$date": "2025-04-21T12:52:52.150Z"
  },
  "historySpamBlocks": [
    {
      "spamBlockDate": {
        "$date": "2025-03-29T08:40:00.000Z"
      },
      "spamBlockDays": 1
    }
  ],
  "personalChannel": "lKmRpIGv4MdvDLpC",
  "personalChannelDate": {
    "$date": "2025-03-29T15:23:05.057Z"
  },
  "lazyCheckDate": {
    "$date": "2025-04-20T21:07:45.569Z"
  },
  "username": "antonova_due"
},
{
  "_id": {
    "$oid": "67dd2aeff5fa1dc49466c7b1"
  },
  "accountId": "6134539269-prefix-female-casino",
  "dc1": "ab7786f7fe88cea05f19885b631895e6a6d352855ac225624d1a41d504d8f3aac7aaf7e68a2b71941fee28e31f386f93121fc57080855f8f696529bba7f41fd9e671474022ff145c74c1c3df5154d1407efb07b5f0a2ff6d227e1ecf1118f98365ac4fa112d02d3bff6ffcebbca9d93bf558f94955fb25bac710ca35cfeb73c18399381368ddfe0b4811804d5ad461cb08c9634ee596612af973453560da4e450b30dd9eab939aedb9ce072434e7c1da39f4475cee5256dc91b8b58704bbf98c188027a74b1389a83a2b4c759b8584d4d1c88710816425d8cd368baf679513d63d94471fbe561a1e9b55fb8b0ffc7705c05a5725e586f769dbab480bf8d473b2",
  "dcId": 1,
  "nextApiId": 2040,
  "dateUpdated": {
    "$date": "2025-04-21T21:50:54.993Z"
  },
  "banned": false,
  "firstName": "Marina",
  "id": "6134539269",
  "lastName": "Pakhomova",
  "messageCount": 35,
  "twoFa": false,
  "twoFaDate": {
    "$date": "2025-04-20T20:22:24.332Z"
  },
  "automaticCheckDate": {
    "$date": "2025-04-21T21:50:54.992Z"
  },
  "remainingTime": {
    "$date": "2025-04-21T14:11:35.330Z"
  },
  "historySpamBlocks": [
    {
      "spamBlockDate": {
        "$date": "2025-03-30T08:05:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-31T09:26:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-04-02T12:18:00.000Z"
      },
      "spamBlockDays": 1
    }
  ],
  "personalChannel": "lRO1TWzRldFxCoqp",
  "personalChannelDate": {
    "$date": "2025-03-29T15:25:09.272Z"
  },
  "lazyCheckDate": {
    "$date": "2025-04-21T21:50:54.669Z"
  },
  "username": "pakhomova_definite"
},
{
  "_id": {
    "$oid": "67dd2aeff5fa1dc49466c7b3"
  },
  "accountId": "6339686235-prefix-female-casino",
  "dc1": "71886d4e88a8da7721da11e43b07237b02121b3f02fa42154d9171051f317f2c46dba89fbd8553fa514a3fe0068d5c9990bb25425d3930710bca9e4f2847cf56eae8997e61781349f4681ddd6c03a7f9dac083607a6968e87423318494e5bf735283c2f69d6a79c41af50f86ba50bb50854b2c2ab354aa65fba6df23c7883282e771dbb2a8e68444e1ef4b82d90ead1f5d8769ba76ca7f96861db591aa8ca9db17f19cf19e51656789df60d4d590ddf627ba325a05db7031ac5792324016088350191876968582f6c7237316e2e808a45f3e3787a36320489ef9ca39d3b584ce215dd802b93545acfb33cd6a794dd9cab24b1d31b9492dcc58b010f9642ee003",
  "dcId": 1,
  "nextApiId": 2496,
  "dateUpdated": {
    "$date": "2025-04-21T13:10:24.374Z"
  },
  "banned": false,
  "firstName": "Alla",
  "id": "6339686235",
  "lastName": "Kalinina",
  "messageCount": 32,
  "twoFa": false,
  "twoFaDate": {
    "$date": "2025-04-20T16:06:59.335Z"
  },
  "automaticCheckDate": {
    "$date": "2025-04-21T13:10:24.374Z"
  },
  "remainingTime": {
    "$date": "2025-04-21T12:06:27.183Z"
  },
  "personalChannel": "ZkDMwWhY1lioJglZ",
  "personalChannelDate": {
    "$date": "2025-03-29T15:25:49.748Z"
  },
  "lazyCheckDate": {
    "$date": "2025-04-20T21:10:45.711Z"
  },
  "username": "kalinina_representative"
},
{
  "_id": {
    "$oid": "67dd2af0f5fa1dc49466c7b9"
  },
  "accountId": "7386218077-prefix-female-casino",
  "dc1": "9c50b9c4cc3e628f42a986546ba730969d8ebbaecfa6f76c309fe3b4228f2971e5f334938739f1e76f1ddcaccd2ec36b110eec80334b656d4c7ca4f2fb22a03ff3de2940afac75b96d2f306177b8056f2feb192c2f5852facf6da98bdf54ab7419f08fe60be7d563083ccb9e2923a11974fb9df737968b220770ef5f05e19998df25f0c7a38faaf618940d905d4f5488d51067e5ffaf3a615043f16c342fc5def5cc7fbeb6ae1b8c7429c7f1b13ae5a5c27b5683d772e0ba8b638a041dc20876323f888ac631acf56a98c5ba9dc11630064c118c36493d60856d759142ae48dd7a765d36f330b21e34a70d5c3f4d5781d26aa0088be0cce67df1702e5ebdb513",
  "dcId": 1,
  "nextApiId": 2496,
  "dateUpdated": {
    "$date": "2025-04-21T13:13:25.219Z"
  },
  "banned": false,
  "firstName": "Anfisa",
  "id": "7386218077",
  "lastName": "Tikhonova",
  "messageCount": 40,
  "twoFa": false,
  "twoFaDate": {
    "$date": "2025-04-20T16:07:00.580Z"
  },
  "automaticCheckDate": {
    "$date": "2025-04-21T13:13:25.219Z"
  },
  "remainingTime": {
    "$date": "2025-04-21T12:01:22.049Z"
  },
  "historySpamBlocks": [
    {
      "spamBlockDate": {
        "$date": "2025-03-29T10:10:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-04-03T05:07:00.000Z"
      },
      "spamBlockDays": 1
    }
  ],
  "personalChannel": "fT1XktVMmQZzjyOs",
  "personalChannelDate": {
    "$date": "2025-03-29T15:26:13.459Z"
  },
  "lazyCheckDate": {
    "$date": "2025-04-20T21:19:51.381Z"
  },
  "username": "tikhonova_interested"
},
{
  "_id": {
    "$oid": "67dd2af0f5fa1dc49466c7bb"
  },
  "accountId": "7061747938-prefix-female-casino",
  "dc1": "1ec2f54d6a93672b1714c72f847a950c7d2349f13e002ab7fade8e86639d4696c76467c3661dd7a33311ab22e9a07ec90fd29d386372bddbe1e75be7e4c052bf19bd50c1849d12bec2f28d433959ba94888520746c3927b15450d48aa6d3ceca283a13e4ab847365ee5010333551fda9e203ed523bc7b48813143686bd5bebc681196037a1c456a4290f87c3c8edd93e07aecebbb5f60c3b4c652dccbb095c2e238a67b5cefda863ee15513f472786cdebdeb4a5b3f44f935e39906bcad0360a0ecd5f20a78ea258662188b05647286c2a1662e753491eb7f2be77faf02b46593425760d00cee60076cfbd857702142be3025fb0b50ee974e83a8ffd6d710774",
  "dcId": 1,
  "nextApiId": 2496,
  "dateUpdated": {
    "$date": "2025-04-21T21:49:56.165Z"
  },
  "banned": false,
  "firstName": "Marina",
  "id": "7061747938",
  "lastName": "Tikhonova",
  "messageCount": 34,
  "twoFa": false,
  "twoFaDate": {
    "$date": "2025-04-20T20:22:26.034Z"
  },
  "automaticCheckDate": {
    "$date": "2025-04-21T21:49:56.165Z"
  },
  "remainingTime": {
    "$date": "2025-04-21T14:10:08.089Z"
  },
  "personalChannel": "ZA2lYXLZBkHItVje",
  "personalChannelDate": {
    "$date": "2025-03-29T15:27:18.670Z"
  },
  "historySpamBlocks": [
    {
      "spamBlockDate": {
        "$date": "2025-04-04T05:20:00.000Z"
      },
      "spamBlockDays": 1
    }
  ],
  "lazyCheckDate": {
    "$date": "2025-04-21T21:49:55.699Z"
  },
  "username": "tikhonova_continuous"
},
{
  "_id": {
    "$oid": "67dd2af1f5fa1dc49466c7bd"
  },
  "accountId": "1320350888-prefix-female-casino",
  "dc1": "7e31068ab660062383ec3cb7a7ee9c2ea93ba48800ed5aaca0a71429fc13572fe0c40194c02a22e337967efcd4d493274e00452994971c64614dadf9ab6f80b0d10dada06cee0bfca516a356b69b1683f65c2f72062dedb18732d1f6aa33961b2fbb240222804e19d57435121e007ebbe4eababfbe8c3ca12c98b75995b505ccd578120c8deac6e9a3069d6faa5fd94edc595edda5604ee6073fb49586cefcfb4611352cc222359a3f1c8087891d8c5f44ca225074d974b05d13a20cff822d3a7943165c57d4ce5ec50c5f3b4881423245f646e1ce5c4bbd616568ba3e277904367bfc99a1cd3f81a219bb5d3be23409bd6e161efb4bd311d88c46fb9db9cf27",
  "dcId": 1,
  "nextApiId": 2040,
  "dateUpdated": {
    "$date": "2025-04-21T21:53:55.451Z"
  },
  "banned": false,
  "firstName": "Ekaterina",
  "id": "1320350888",
  "lastName": "Tikhonova",
  "messageCount": 34,
  "twoFa": false,
  "twoFaDate": {
    "$date": "2025-04-20T20:22:25.433Z"
  },
  "automaticCheckDate": {
    "$date": "2025-04-21T21:53:55.451Z"
  },
  "remainingTime": {
    "$date": "2025-04-21T13:47:50.959Z"
  },
  "personalChannel": "Qyv8BeJJJzAXGmps",
  "personalChannelDate": {
    "$date": "2025-03-29T15:25:59.754Z"
  },
  "lazyCheckDate": {
    "$date": "2025-04-21T21:53:55.134Z"
  },
  "username": "tikhonova_unfair"
},
{
  "_id": {
    "$oid": "67dd2af1f5fa1dc49466c7c0"
  },
  "accountId": "7914109443-prefix-female-casino",
  "dc1": "43a821e8db715a6f0b5e887df346a52fe766e4b9e82b19a09218cefbd8266a353547c03fc233ebcbf882f9c4d970b8ab4f87d064f08901c6bc35eb8cb9875e35339e7ce18ed830074a4598ad975f9f68ecdee805470b6b891945340aa63b4e912306ce589eb564c0d0434f678a9a94262b9d5339b099cb72cf09e831b11b80249d20e7a6c299e4f19238465f2ffc2707a786e82700a46b054ea562a21219714a4a1f67139f80cb09ab668dc5ec5b7e959a6b453c0d2dd4523309a42e2efde2aaed03b352ca0e3675ec84a4f2cc5b88b36eb42bd5a494bf349b9aabc223b84daa2e5769a2382092b85c27ff46b5ca7d326523b733fd8ed5f9be056a712066ca87",
  "dcId": 1,
  "nextApiId": 2040,
  "dateUpdated": {
    "$date": "2025-04-21T13:24:25.012Z"
  },
  "banned": false,
  "firstName": "Margarita",
  "id": "7914109443",
  "lastName": "Tarasova",
  "messageCount": 38,
  "twoFa": false,
  "twoFaDate": {
    "$date": "2025-04-20T20:22:26.227Z"
  },
  "automaticCheckDate": {
    "$date": "2025-04-21T13:24:25.012Z"
  },
  "remainingTime": {
    "$date": "2025-04-21T12:13:25.868Z"
  },
  "personalChannel": "GloNu3NNJBXoFwPe",
  "personalChannelDate": {
    "$date": "2025-03-29T15:25:49.692Z"
  },
  "lazyCheckDate": {
    "$date": "2025-04-20T20:59:52.445Z"
  },
  "username": "tarasova_immense"
},
{
  "_id": {
    "$oid": "67dd2af1f5fa1dc49466c7c2"
  },
  "accountId": "5272889004-prefix-female-casino",
  "dc1": "bfe0d6785e85fc3b2a9c83374623378869610d4ceece21fcddc6c881b6a8ef89f3889b0d128178d6e182cea77974b86ba514f895ea6e56f62b1d03b0a870b5b5e30cb9b9f3592d95191b84eaf3c561c12243298ac757acf9e52c91fd0d815af2f29c64ac49d63c62c58de4b967b0cd856b403da0f980c8b62dd7b03387e0aaf4c73b0adab0c0392d1db1723e14ce8b8eec42dc53050047d360bc1cda816f729f4c74c3caff12b7209350fccd755816ce08bcbf3d519fb1c3223d681025b8527bff9a311e7a85541d786284a738cd40e437ff31ca31cdafe3340a772d7cd513067b6ae55860a7e4899d2caa6a0501547d1527017bcce9050c4568aaef1cca23bd",
  "dcId": 1,
  "nextApiId": 2040,
  "dateUpdated": {
    "$date": "2025-04-21T21:51:59.202Z"
  },
  "banned": false,
  "firstName": "Liza",
  "id": "5272889004",
  "lastName": "Andreeva",
  "messageCount": 18,
  "twoFa": false,
  "twoFaDate": {
    "$date": "2025-04-05T13:14:13.314Z"
  },
  "automaticCheckDate": {
    "$date": "2025-04-21T21:51:59.202Z"
  },
  "remainingTime": {
    "$date": "2025-04-21T07:01:51.520Z"
  },
  "personalChannel": "JNlHpfllyInHT1wC",
  "personalChannelDate": {
    "$date": "2025-03-29T15:24:30.939Z"
  },
  "lazyCheckDate": {
    "$date": "2025-04-21T21:51:58.338Z"
  },
  "username": "andreeva_scarlet"
},
{
  "_id": {
    "$oid": "67dd2af1f5fa1dc49466c7c6"
  },
  "accountId": "5981312829-prefix-female-casino",
  "dc1": "162ab385600c0a675824847f60649e9b9db1adc6c4d6b41acc9fe0c0034a1ea50282113495572b71cedbee7d09b7525420462fb2f888dc9259a79453bfe9f949196a711f6dada6c5e63e427278adec40850a318366df891e4b5866d1511ff0259f3539908bd11088097b09df718b324c3161a9d89bc33d6a5c20dc33149f8220290751fb73d34b5754f6ffd867aa7b8edf159c95609c8fab76c2eccd98fbf94e9cf0b7a75c296c18361ec2828cec74f12aa7eac354bfa809ffae119d9912b971967d9b11b5325ae7b606f6235a729c8d5e68b7d89e0a27e33c9989c5de8fe552114e22f9a066c54041304bcba0b9936e9045792849d9a22d2bb0188ca6363c3b",
  "dcId": 1,
  "nextApiId": 2496,
  "dateUpdated": {
    "$date": "2025-04-21T21:52:55.201Z"
  },
  "banned": false,
  "firstName": "Sofia",
  "id": "5981312829",
  "lastName": "Lapshina",
  "messageCount": 33,
  "twoFa": false,
  "twoFaDate": {
    "$date": "2025-04-20T20:22:28.478Z"
  },
  "automaticCheckDate": {
    "$date": "2025-04-21T21:52:55.201Z"
  },
  "remainingTime": {
    "$date": "2025-04-21T12:01:12.069Z"
  },
  "personalChannel": "MtNUXlfnuuTCNAy4",
  "personalChannelDate": {
    "$date": "2025-03-29T15:24:25.279Z"
  },
  "lazyCheckDate": {
    "$date": "2025-04-21T21:52:54.884Z"
  },
  "historySpamBlocks": [
    {
      "spamBlockDate": {
        "$date": "2025-04-09T12:15:00.000Z"
      },
      "spamBlockDays": 1
    }
  ],
  "username": "lapshina_steep"
},
{
  "_id": {
    "$oid": "67dd2af2f5fa1dc49466c7c9"
  },
  "accountId": "5899502555-prefix-female-casino",
  "dc1": "5fa64f4b095db7847c3f93ca8171ae6946b4742d7c234c42539bdfb3b16773f5582ddca5d6409da3a945589c08d05b21a4d56952f569c75b5ee5336ff824b025d5b4df49575e6e52817bb8216430893df5967b8f825a69cebe253d3b1c80a1fa20f51cac253a41ed503c16c30acf3fd1a3e10d21f9e8aed3dce12a1be4291de007fce9927c4c588484228a890cf7b4d1f8bea76dccf93b07f642e0e9d79158682173fd2438a58a9a41fe59e3986fb0b8a525e918416f5d8c156d0a0c7cebfa35056e5ffc523ee278c8c09c2c1d812ee6e07ac305af222cabdcc45fd7c60b9fc8bbb432613a0544c8ebeeb80bca799986d2e0883e05e5055ba8135e875f32a640",
  "dcId": 1,
  "nextApiId": 2496,
  "dateUpdated": {
    "$date": "2025-04-21T13:25:27.094Z"
  },
  "banned": false,
  "firstName": "Liza",
  "id": "5899502555",
  "lastName": "Solovieva",
  "messageCount": 35,
  "twoFa": false,
  "twoFaDate": {
    "$date": "2025-04-20T20:22:26.231Z"
  },
  "automaticCheckDate": {
    "$date": "2025-04-21T13:25:27.094Z"
  },
  "remainingTime": {
    "$date": "2025-04-21T10:35:34.204Z"
  },
  "personalChannel": "Juvqdp5SQkqHBvqF",
  "personalChannelDate": {
    "$date": "2025-03-29T15:24:05.943Z"
  },
  "lazyCheckDate": {
    "$date": "2025-04-20T20:43:31.526Z"
  },
  "username": "solovieva_tasty"
},
{
  "_id": {
    "$oid": "67dd2af2f5fa1dc49466c7cb"
  },
  "accountId": "5827271380-prefix-female-casino",
  "dc1": "89139ad984da5e8874b0b49ea620b18013a10d7e9a6c4c128a4cab861986248868ed27d7cd24a9a59c83130a67692789dbeff03d7b2a59e574b5763b0be50fb24c2558fb2c1123adfd72c578a69e74fd45f9557194ebbcd85605027ec75e7d01a4e806842f147323b09bf3135193731ffa77abad9775137b3fc1283520c9a1dca664ec25c8d3ff5b6e757d5e2e8f1197b4f2baacdcde229c9a2aa9996b1f54378ff0bbdaceb16005befab20b690a3e7ffc07896cd706bcc37d2d8e0f7af025d5b756bad628faba2cd391a668078c8b026c5558f4625db9e0fcf09966230c049c632b8a348403ae1e2111d2199a2de118c59c8f42a7378d80ede1215ce98ac3ca",
  "dcId": 1,
  "nextApiId": 2040,
  "dateUpdated": {
    "$date": "2025-04-21T13:24:24.964Z"
  },
  "banned": false,
  "firstName": "Alla",
  "id": "5827271380",
  "lastName": "Morozova",
  "messageCount": 33,
  "twoFa": false,
  "twoFaDate": {
    "$date": "2025-04-20T16:07:02.226Z"
  },
  "automaticCheckDate": {
    "$date": "2025-04-21T13:24:24.964Z"
  },
  "remainingTime": {
    "$date": "2025-04-21T13:54:27.296Z"
  },
  "personalChannelDate": {
    "$date": "2025-03-29T21:34:53.871Z"
  },
  "personalChannel": "rtFQysR5JSEQXEfv",
  "lazyCheckDate": {
    "$date": "2025-04-20T21:15:50.540Z"
  },
  "historySpamBlocks": [
    {
      "spamBlockDate": {
        "$date": "2025-04-08T17:53:00.000Z"
      },
      "spamBlockDays": 1
    }
  ],
  "username": "morozova_international"
},
{
  "_id": {
    "$oid": "67dd2af2f5fa1dc49466c7ce"
  },
  "accountId": "6974514204-prefix-female-casino",
  "dc1": "78e2b84b7e0b2a43c1787b4cebdf0cac510f877f7ec371543b20d09aea51f9f3534c195ee123a32fda16477ebadcf23d1264b122740e9784d54d5acbd6df4377c6e88f4b565291ef45d2f32754fc126d42b320b6e74d4475d5f8ab421784d9f923818737966d6c609262c3464e31fe1b8e2680cfdf4dde40a494ade080b48e073bf88d77466c77500c6acd8e5e2ec54b818a6bb36c6a38d0a29d72045ec2114455b503b0e397da1e239c490ad6b7bfbaded59fc7e86a6316121b7516600ec94367a8ee6022c8b9cf0da34ceaa52555ae1043241f8c82bed8687a55fa95a63c2aa8ad85b4d5b5c3bf8a3ec267f1963beae590bd3fd3dd2d13cb138a16cd5e33c6",
  "dcId": 1,
  "nextApiId": 2040,
  "dateUpdated": {
    "$date": "2025-04-21T13:25:24.995Z"
  },
  "banned": false,
  "firstName": "Alisa",
  "id": "6974514204",
  "lastName": "Kazmina",
  "messageCount": 34,
  "twoFa": false,
  "twoFaDate": {
    "$date": "2025-04-20T20:22:26.313Z"
  },
  "automaticCheckDate": {
    "$date": "2025-04-21T13:24:25.376Z"
  },
  "remainingTime": {
    "$date": "2025-04-21T12:49:35.841Z"
  },
  "personalChannel": "vBKLjHCkMoBNbvk5",
  "personalChannelDate": {
    "$date": "2025-03-29T15:24:09.615Z"
  },
  "lazyCheckDate": {
    "$date": "2025-04-20T21:54:51.077Z"
  },
  "username": "kazmina_firm",
  "spamBlockReasons": [
    {
      "reason": "Im unable to message new contacts, although Ive followed Telegrams guidelines. Id appreciate a review of my account, as I believe the restriction is an error. Lets fix this together.",
      "date": {
        "$date": "2025-04-21T13:25:24.991Z"
      }
    }
  ],
  "historySpamBlocks": [
    {
      "spamBlockDate": {
        "$date": "2025-04-22T13:05:00.000Z"
      },
      "spamBlockDays": 1
    }
  ],
  "spamBlockDate": {
    "$date": "2025-04-22T13:05:00.000Z"
  },
  "spamBlockDays": 1,
  "spamBlockInitDate": {
    "$date": "2025-04-21T13:25:24.995Z"
  }
},
{
  "_id": {
    "$oid": "67dd2af3f5fa1dc49466c7d0"
  },
  "accountId": "6281122097-prefix-female-casino",
  "dc1": "7ae7967e72ac2eea472631013e26ee92a2bd0c574cb379258072f6d66584f677d2e75d216b472de537ec43086865cf0e2f327daa49483f47fccd86d1440a85e8d39587319f52d2c6b9ee14bab2652592d63a8f2b1bc281591a54375dd7d2fec1f3bb650b2219f275b26ede83dc81c27e26f11d078e8d6f259153d1fea3fd51fef2236f15d2fbb181259bcba3dfba547b67b86a805d2f0e44b2eddfcd70602d2a4ee3c239975ded0c46507b354b9c534c81bc2373b988c46445cc1d6cec0a4cd43cc9f07235efa316a52715b2a1daad32bf4cc00373d140849aa9c13db00d2225437270526d1a27cc028020f64263e0bfbed4622ab44530e3dfcd6c0009281f15",
  "dcId": 1,
  "nextApiId": 2040,
  "dateUpdated": {
    "$date": "2025-04-21T21:54:54.163Z"
  },
  "banned": false,
  "firstName": "Galina",
  "id": "6281122097",
  "lastName": "Bukina",
  "messageCount": 33,
  "twoFa": false,
  "twoFaDate": {
    "$date": "2025-04-20T16:06:59.822Z"
  },
  "automaticCheckDate": {
    "$date": "2025-04-21T21:54:54.163Z"
  },
  "historySpamBlocks": [
    {
      "spamBlockDate": "INFINITY",
      "spamBlockDays": 0
    },
    {
      "spamBlockDate": {
        "$date": "2025-04-03T10:39:00.000Z"
      },
      "spamBlockDays": 1
    }
  ],
  "remainingTime": {
    "$date": "2025-04-21T11:57:37.012Z"
  },
  "personalChannel": "wZGHTfEHq8XbccDd",
  "personalChannelDate": {
    "$date": "2025-03-29T15:27:21.792Z"
  },
  "lazyCheckDate": {
    "$date": "2025-04-21T21:54:53.910Z"
  },
  "username": "bukina_enthusiastic"
},
{
  "_id": {
    "$oid": "67dd2af3f5fa1dc49466c7dd"
  },
  "accountId": "7948520395-prefix-female-casino",
  "dc1": "19903e812ed961da67cdd4e72909edf0590bf537380df2d63cc9155ffc375f0d1ac374246608b8c31a2884410e1e6688145237f4e934d65bfe568f5dd76ce68bbeda031e6832fbdee3f9525e470b099fb23f842c35834a784b7776f5ae19a14443b848589a0b5d87d9ebf49bb6ad2a4aa870c446458afb0287bcc086bedd97bfd0b9d7a762169503e2c16153536da5ee4a15383956b24037fd3117dcfcb9e5067db9c1c1056706ea2fb22b7c898876740ebb784d9bd9353fdcd552a3732f1304640f1e1211c8ad408e773f64c205eed302d3d4552c25c4e8cc30290e4bda2f3877c01fd88436a2d0fb9a4d75059e89c2afa257013dadb042bc710a5613e88164",
  "dcId": 1,
  "nextApiId": 2496,
  "dateUpdated": {
    "$date": "2025-04-21T13:16:26.519Z"
  },
  "banned": false,
  "firstName": "Valeria",
  "id": "7948520395",
  "lastName": "Lobanova",
  "messageCount": 43,
  "twoFa": false,
  "twoFaDate": {
    "$date": "2025-04-20T20:22:28.300Z"
  },
  "automaticCheckDate": {
    "$date": "2025-04-21T13:16:26.519Z"
  },
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
        "$date": "2025-04-05T05:53:00.000Z"
      },
      "spamBlockDays": 1
    }
  ],
  "remainingTime": {
    "$date": "2025-04-21T12:30:14.634Z"
  },
  "personalChannel": "y1XRxvWwqmJYjqxM",
  "personalChannelDate": {
    "$date": "2025-03-29T15:24:18.306Z"
  },
  "lazyCheckDate": {
    "$date": "2025-04-20T21:09:48.415Z"
  },
  "username": "lobanova_nosy"
},
{
  "_id": {
    "$oid": "67dd2af3f5fa1dc49466c7e0"
  },
  "accountId": "7473330061-prefix-female-casino",
  "dc1": "a79dbcbc49d7537434d21e08570eff1a5c09bc037fd89e4559d3b18ec3670a082645a1bbd21514076ed81504cfa6b7ce5a0ffc9b8969531fef3efe8b5d1cafcfc906be52a78fd36cb9edbd6d54928cb1672b4edddbb2c07ce498525f5339c09f3d18d4a9f7514cf72be36f8c09525afd7286283099d0d8e7dcce9bd87a06986473a329e7d5b910c0fcdb199f3d6ac7bf740da3f8d39e34a69b52c5cd020b74eba56516018c2c696f0ff5daf3e0e7fb3e15322fbcf0021034431d64fe7989ae6dab4bd350209b1d4f0a9d446de2dfe8aa8c470ca490435ce6220c47fd9b206c77318c320441cd8dfb6de08faf8a4b1bce0be43f69f2eb8ccbd1fc2931c73a6c36",
  "dcId": 1,
  "nextApiId": 2040,
  "dateUpdated": {
    "$date": "2025-04-21T13:12:25.439Z"
  },
  "banned": false,
  "firstName": "Elena",
  "id": "7473330061",
  "lastName": "Bukina",
  "messageCount": 35,
  "twoFa": false,
  "twoFaDate": {
    "$date": "2025-04-20T20:22:26.230Z"
  },
  "automaticCheckDate": {
    "$date": "2025-04-21T13:12:25.439Z"
  },
  "remainingTime": {
    "$date": "2025-04-21T13:49:25.319Z"
  },
  "historySpamBlocks": [
    {
      "spamBlockDate": {
        "$date": "2025-03-30T07:28:00.000Z"
      },
      "spamBlockDays": 1
    }
  ],
  "personalChannel": "Vi7RAYVTCCmWZPHK",
  "personalChannelDate": {
    "$date": "2025-03-29T15:25:09.112Z"
  },
  "lazyCheckDate": {
    "$date": "2025-04-20T21:15:48.817Z"
  },
  "username": "bukina_witty"
},
{
  "_id": {
    "$oid": "67dd2af4f5fa1dc49466c7e2"
  },
  "accountId": "5699505512-prefix-female-casino",
  "dc1": "5a90b26d67ef6797cdcbdf63fcef04ad44cd83cb21f4c4f7805a948b34b52673b40e29840e76e2de0ae3ceb2636d0cf39248d460267fe7646e9d45e3f92b213292e17669faf3105b2e95942ba1c4055524446b89869d72aecd695f822657bf6741ff88af3145f0e4e9fd888a1ab7242fb2b023654525354392e54fc18989bb57e3eebfd455df7a993c1da141dcf50da91c50cf5ee3bf5cdc5938a2773df2a3221976513eb3121499601871ce3080316899dc18b64d2b36ad10e0b65e4a63722e2e0a7d0d70c9e5ca87baa6fed1b67549070cbab835f322a1948fadd5ea7619add429cf8e8f9313c9b3f2140fb6ff1a940664c66fdd4a9be74df3c978f8616cc0",
  "dcId": 1,
  "nextApiId": 2040,
  "dateUpdated": {
    "$date": "2025-04-21T13:27:26.521Z"
  },
  "banned": false,
  "firstName": "Anfisa",
  "id": "5699505512",
  "lastName": "Soboleva",
  "messageCount": 18,
  "twoFa": false,
  "twoFaDate": {
    "$date": "2025-04-20T20:22:26.139Z"
  },
  "automaticCheckDate": {
    "$date": "2025-04-21T13:27:26.521Z"
  },
  "remainingTime": {
    "$date": "2025-04-21T07:11:37.275Z"
  },
  "personalChannel": "fCfKC7slEHPDexEI",
  "personalChannelDate": {
    "$date": "2025-03-29T15:23:23.469Z"
  },
  "historySpamBlocks": [
    {
      "spamBlockDate": {
        "$date": "2025-04-01T12:48:00.000Z"
      },
      "spamBlockDays": 1
    }
  ],
  "lazyCheckDate": {
    "$date": "2025-04-20T21:02:50.997Z"
  },
  "username": "soboleva_unnecessary"
},
{
  "_id": {
    "$oid": "67dd2af4f5fa1dc49466c7e5"
  },
  "accountId": "6185918590-prefix-female-casino",
  "dc1": "5bff361e7dfeb254f71929def1bff6940bc841d223253fd68efd005a1fc4ad0927a2c97b9a4e5ce79850c3edc9ada69f2776d6f2d91751921fdce1955003e944d549d6e7748dc058c25e21cc043ab8bb12fdf368cf7a6fdbb1acd60f6ee6a4fb4553118387ed9c9499650abc9fdfd10be7b607bd69608c6f2ab35c10ce73bba0063c9754dc559d045ed88ab8654a2c4aed28547c6443d967fe6702e669b11831b28c100c2e4c91746e424f1f9ef742114a252e39215ba8c3a86e4e4d6ab1933d2c756dfe71b4d5af8438a3c130ae82b8a7affb36e1a8f31ad7a513644cdd9f3a76bef4ca26af9c43fc26a2c6944526d9dbe290dd498ddfd227a2b7317a098caa",
  "dcId": 1,
  "nextApiId": 2040,
  "dateUpdated": {
    "$date": "2025-04-21T21:52:51.173Z"
  },
  "banned": false,
  "firstName": "Tatiana",
  "id": "6185918590",
  "lastName": "Trifonova",
  "messageCount": 17,
  "twoFa": false,
  "twoFaDate": {
    "$date": "2025-04-20T20:22:26.312Z"
  },
  "automaticCheckDate": {
    "$date": "2025-04-21T21:52:51.173Z"
  },
  "remainingTime": {
    "$date": "2025-04-21T07:42:25.921Z"
  },
  "historySpamBlocks": [
    {
      "spamBlockDate": {
        "$date": "2025-03-29T11:00:00.000Z"
      },
      "spamBlockDays": 1
    }
  ],
  "personalChannel": "R6unrRNFOooxxqvq",
  "personalChannelDate": {
    "$date": "2025-03-29T15:23:38.287Z"
  },
  "lazyCheckDate": {
    "$date": "2025-04-21T21:52:50.911Z"
  },
  "username": "trifonova_nutty"
},
{
  "_id": {
    "$oid": "67dd2af4f5fa1dc49466c7eb"
  },
  "accountId": "5531294423-prefix-female-casino",
  "dc1": "0da09d241948ee4dda400acadb8df725d97505c3a0e5e42507379d882eb6d45e92768130b82f53e17215dc07004d22989f25abf7fed58d0253ac7e5897e5b02a84b19b0370ad654e05dde5e00418e01a43bd7c7388b913b053baff65243eede02b828387598a3828487737d5ce222fb830d71bf2902696fa7874f5a257bdf98dcd6a97a1876f0035feefeec9a3422e8e000504478fb71bfa6675c54e760ab4e8502840eb8a5936a1d33997361108fef1ae48d1635435bbab354877c4bb9aa55d25af1400d2ce23107ca86f14c9b14ff8c32104eef4007ef0db4ecab48ceb810dc0a474c6394b91113d441f963f435c45f64a681dddca89d5ffa81e25ceb63ce3",
  "dcId": 1,
  "nextApiId": 2496,
  "dateUpdated": {
    "$date": "2025-04-21T13:19:24.379Z"
  },
  "banned": false,
  "firstName": "Yulia",
  "id": "5531294423",
  "lastName": "Frolova",
  "messageCount": 44,
  "twoFa": false,
  "twoFaDate": {
    "$date": "2025-04-20T20:22:26.311Z"
  },
  "automaticCheckDate": {
    "$date": "2025-04-21T13:19:24.379Z"
  },
  "remainingTime": {
    "$date": "2025-04-21T12:06:47.337Z"
  },
  "personalChannelDate": {
    "$date": "2025-03-29T21:30:37.067Z"
  },
  "personalChannel": "xNQHQTJsLWn2lYHD",
  "lazyCheckDate": {
    "$date": "2025-04-20T21:05:50.434Z"
  },
  "historySpamBlocks": [
    {
      "spamBlockDate": {
        "$date": "2025-04-11T08:54:00.000Z"
      },
      "spamBlockDays": 1
    }
  ],
  "username": "frolova_entire"
},
{
  "_id": {
    "$oid": "67dd2af5f5fa1dc49466c7f1"
  },
  "accountId": "6376017103-prefix-female-casino",
  "dc1": "185fac7b223d7edf6e90903b6439208ead155ea8f6b033497296ebed9709d76499ea37798c238e746c127026f026a0924c0c03ec3413ae3de6550ecf4e79adc6db0961f34817799630b38372020c706a43c1690115ad10c531d4441514c6f66ce3f87bbadb416310225eeb57b9e57fa9f629191b202bcb1617dc9f63214214c07219beafd475f05c59c1919a395bc5a0ba24a99c933dc3bdf00d5cb1aefdf21493223cd6b935b882dea600708e83b15fb09ec595beade816788a9a4b5ec2e4a0436a94b0f800a531044b308985ab5fa46adc91a14dd351ccbc2f7ac4316af7082551bfa94593ed53de84e07a3a8f3051ce2fb250bfb85f0a493a8ae9b72cdc52",
  "dcId": 1,
  "nextApiId": 2496,
  "dateUpdated": {
    "$date": "2025-04-21T21:49:55.266Z"
  },
  "banned": false,
  "firstName": "Daria",
  "id": "6376017103",
  "lastName": "Loginova",
  "messageCount": 38,
  "twoFa": false,
  "twoFaDate": {
    "$date": "2025-04-20T16:07:02.022Z"
  },
  "automaticCheckDate": {
    "$date": "2025-04-21T21:49:55.266Z"
  },
  "remainingTime": {
    "$date": "2025-04-21T11:18:31.231Z"
  },
  "personalChannel": "LRkm9FteiJMpLkla",
  "personalChannelDate": {
    "$date": "2025-03-29T15:26:27.351Z"
  },
  "lazyCheckDate": {
    "$date": "2025-04-21T21:49:54.948Z"
  },
  "historySpamBlocks": [
    {
      "spamBlockDate": {
        "$date": "2025-04-06T07:40:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-04-06T20:09:00.000Z"
      },
      "spamBlockDays": 1
    }
  ],
  "username": "loginova_exact"
},
{
  "_id": {
    "$oid": "67dd2af5f5fa1dc49466c7f3"
  },
  "accountId": "7667801615-prefix-female-casino",
  "dc1": "098a3220a77b3343d57c44399a6b169062b2dc32567d609cdea4403a8ae31c340edce6b101740acd65e77bbed5c63ee61c0549caa495bd006851f4642d172121c0cf14d54b4d063cea8cb89b332964b1adc385bf832b0c524987fddb9ab8d455c733915e3df1d78070b5594368fe48ab78d8691b8b2393400e408e8325e6c16a34683dde3f39a87c9d89333e2e5eb513994aebb1b42273f32fcc81793f2acdad48384ea2c2cdfeba65678bac6557d38e56aa0137c67aa3835622b4f0085aced699eb39b4b5d3d1655bbc61c36c8a609dbc8c4db4b9c9eac9a7158014acb52060e5269cd713a3ce3ff78c17ed4c6aca81ded9fbd0096f9bbe7c4c6209b47c593a",
  "dcId": 1,
  "nextApiId": 2496,
  "dateUpdated": {
    "$date": "2025-04-21T13:15:25.340Z"
  },
  "banned": false,
  "firstName": "Elena",
  "id": "7667801615",
  "lastName": "Demidova",
  "messageCount": 40,
  "twoFa": false,
  "twoFaDate": {
    "$date": "2025-04-20T20:22:26.226Z"
  },
  "automaticCheckDate": {
    "$date": "2025-04-21T13:15:25.340Z"
  },
  "remainingTime": {
    "$date": "2025-04-21T11:48:16.490Z"
  },
  "personalChannel": "GxNCIbNdRD4qdnuw",
  "personalChannelDate": {
    "$date": "2025-03-29T15:26:51.408Z"
  },
  "historySpamBlocks": [
    {
      "spamBlockDate": {
        "$date": "2025-03-31T13:19:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-04-08T05:24:00.000Z"
      },
      "spamBlockDays": 1
    }
  ],
  "lazyCheckDate": {
    "$date": "2025-04-20T21:16:48.637Z"
  },
  "username": "demidova_loud"
},
{
  "_id": {
    "$oid": "67dd2af6f5fa1dc49466c7fe"
  },
  "accountId": "7533537744-prefix-female-casino",
  "dc4": "bd4e25031a1d655aee44802a91ee91df6df2e0729256ce8fb975dd296ca3ad2d2b3be9f6b7914c6889dfe0013e6107387bbf8e9ef9e78f4d5cd1ab9dfc2f3bcd3c9158165afc2505c39ae28e9b95a26f74f75d6c06a0891181a40556c9ad9cd03e0ad4f27949d67b01b27e77d951250a40a17f7ca7644a0aea995850028860127115f0651d46d04cef1f8f1d2dfa9ad7e1408d2d2127afa95dda3962bcddfbc297ec3c48a8041739f38d9cfdcb13aeba870d6e1c77df59c7f5526539ed4cb6e6e953dc0aa5b935fd5f4d7eea2ffb44910a12efa1d4539251240a205dc52ad8b36867cfb699344ab0a191268f4a0a9e88c4cc1cb51312d0a54189160b35156b4f",
  "dcId": 4,
  "nextApiId": 2040,
  "dateUpdated": {
    "$date": "2025-04-21T21:48:56.148Z"
  },
  "banned": false,
  "firstName": "Yulia",
  "id": "7533537744",
  "lastName": "Lobanova",
  "messageCount": 29,
  "twoFa": false,
  "twoFaDate": {
    "$date": "2025-04-20T16:07:03.372Z"
  },
  "automaticCheckDate": {
    "$date": "2025-04-21T21:48:56.148Z"
  },
  "remainingTime": {
    "$date": "2025-04-21T07:02:47.598Z"
  },
  "personalChannel": "BMJBtPdIgd6NymKc",
  "personalChannelDate": {
    "$date": "2025-03-29T15:22:42.921Z"
  },
  "lazyCheckDate": {
    "$date": "2025-04-21T21:48:55.751Z"
  },
  "historySpamBlocks": [
    {
      "spamBlockDate": {
        "$date": "2025-04-06T09:40:00.000Z"
      },
      "spamBlockDays": 1
    }
  ],
  "username": "lobanova_delicate"
},
{
  "_id": {
    "$oid": "67dd2af6f5fa1dc49466c800"
  },
  "accountId": "7700664826-prefix-female-casino",
  "dc1": "81778eddea09d03df7396dd7f9f8f834fee0fc35287b14d5eaa6ba61e4e7776b608873e4842446685c972a58a0a931b6046359653d59c28e1d6924484349fc8152ccbbff23d837e1c4b5e5dc034b25e42e388b96f24809184918c7822f1441ac30258f33c03977d74e2a43c6be37a3b843700f5cf57fa55d98069686d4e91032170fc88d4237e28a1a6668edea213aa4675c7b27c81d031eeed614d175fabf3c0bdcd2f1d49a84429afbf3b58261c452589fec410a0d2790a396de251f416175d4d3629d657947ce8836ba63ef5403e470719171f5f468ff9778166e0eb89863c02494172de818e76a0375aad0448db218748b1285823f4b297f3a3adb9c9290",
  "dcId": 1,
  "nextApiId": 2496,
  "dateUpdated": {
    "$date": "2025-04-21T13:28:26.624Z"
  },
  "banned": false,
  "firstName": "Sofia",
  "id": "7700664826",
  "lastName": "Fedorova",
  "messageCount": 43,
  "twoFa": false,
  "twoFaDate": {
    "$date": "2025-04-20T20:22:27.645Z"
  },
  "automaticCheckDate": {
    "$date": "2025-04-21T13:28:26.623Z"
  },
  "remainingTime": {
    "$date": "2025-04-21T12:07:26.771Z"
  },
  "personalChannel": "MXyaquTwyFN6HObP",
  "personalChannelDate": {
    "$date": "2025-03-29T15:22:18.927Z"
  },
  "lazyCheckDate": {
    "$date": "2025-04-20T20:28:31.083Z"
  },
  "username": "fedorova_alleged"
},
{
  "_id": {
    "$oid": "67dd2af7f5fa1dc49466c808"
  },
  "accountId": "5542907626-prefix-female-casino",
  "dc1": "b8b715e67e543e86a50070328e0014c31be3ade5d713496505e8483a644a3a576beb3cfdb58f216b6fe0e6bc558b94ce5e6c89421001501d46fec239afb5d4a6d9957833e84ec9df52daedeea5631bdc71fb2272522f801b26ef89a9cfde640c14556fe39ea68252b5d34f23f6175cbdaf55d018d2666b7d3652777b80d4bb3a03d872834f90f4c9ff044274e48634994277c5eb5b5137e0b3581cab3f76885d53ba7c53793a2630ad93f9cba7020809dc9c18686d9dfd303e2ca348cafd972eda3ed509e891bff306022553eb4b618ca3d3acb7f2cfe0fbd8aa8a8eaae8a9be9f0c34c7f7e4a9c605c1f120d13f31d4e9ced975364a3050fb036a5eb4b4e33a",
  "dcId": 1,
  "nextApiId": 2496,
  "dateUpdated": {
    "$date": "2025-04-21T21:51:54.577Z"
  },
  "banned": false,
  "firstName": "Valeria",
  "id": "5542907626",
  "lastName": "Demidova",
  "messageCount": 37,
  "twoFa": false,
  "twoFaDate": {
    "$date": "2025-04-20T16:07:02.018Z"
  },
  "automaticCheckDate": {
    "$date": "2025-04-21T21:51:54.577Z"
  },
  "remainingTime": {
    "$date": "2025-04-21T12:03:14.553Z"
  },
  "personalChannel": "ZHkDPMwlAdFPTFE7",
  "personalChannelDate": {
    "$date": "2025-03-29T15:27:24.368Z"
  },
  "historySpamBlocks": [
    {
      "spamBlockDate": {
        "$date": "2025-04-01T06:46:00.000Z"
      },
      "spamBlockDays": 1
    }
  ],
  "lazyCheckDate": {
    "$date": "2025-04-21T21:51:54.252Z"
  },
  "username": "demidova_inappropriate"
},
{
  "_id": {
    "$oid": "67dd2af7f5fa1dc49466c80b"
  },
  "accountId": "7195751598-prefix-female-casino",
  "dc1": "ba0c31144bcb7e2dddc8860b1244617006f0a192fcc240d9b341bd2db3ad4fbdf51d282d186bb1f7c57be7a10f69cf5fa61955cc9552bb2e3be466760d0e95e64d3dfa411de5aa3c0094b694d22595ed778bac18ec3b25c47b78d248f1c71eabfdb9d313f0341807bfe955ae4eb2e04f783835d2019efce3c55e51569763810bbd85a6e80bf61571ac7457220c77df0b8e4c4977fe7dbee08368bd48d4b2f94b021ff1c11a0357e34205efc124320c09d74c9e90044fe17f2a27742ccf0cdda4f4005071a5d845bcd000e0e3494a8a942e4807051c65b579135f59878305a295015136ead748bd57cc46e69d3c8dff42a8c107b6ba6680c2c25343ea52cc0b66",
  "dcId": 1,
  "nextApiId": 2496,
  "dateUpdated": {
    "$date": "2025-04-21T13:16:25.352Z"
  },
  "banned": false,
  "firstName": "Vera",
  "id": "7195751598",
  "lastName": "Nikitina",
  "messageCount": 33,
  "twoFa": false,
  "twoFaDate": {
    "$date": "2025-04-20T16:07:02.253Z"
  },
  "automaticCheckDate": {
    "$date": "2025-04-21T13:16:25.352Z"
  },
  "remainingTime": {
    "$date": "2025-04-21T12:07:32.960Z"
  },
  "personalChannel": "wsZNNKOVqTPs2XsL",
  "personalChannelDate": {
    "$date": "2025-03-29T15:26:51.417Z"
  },
  "lazyCheckDate": {
    "$date": "2025-04-20T20:59:48.531Z"
  },
  "username": "nikitina_neutral"
},
{
  "_id": {
    "$oid": "67dd2af7f5fa1dc49466c80d"
  },
  "accountId": "7955628056-prefix-female-casino",
  "dc1": "367687c66c669786cf4b7a210d6438be0e1996b2c54cbf18c59288b864d4358049c5d8c4709882a86686b8798a9931cbbde5109cb39aba8e9979bdc938827802fdb2d3a6abe2f84ba03ca86388471601083ebcb7eb7af7c462c5e1f259614a3023bb2d87166d86e3eebfcf33c5f3fc53985d264455ccff73082967e0e3cec4f5600235a44a06487e2a960cb0bdefb46c7012ad9669e7f79402ac08858d005a24df0d696430c7df6fb89a9d322655e468953641b6d5ad06c2f02bcceaa1a13506e1017b4fef9838e1f92ab90601912be3fc527da3ff9769c49bbd8f4482a9cc53bcc5aaca5c67dcd1b06493ebb640116051dd39597da03ff70b9037ee2457872b",
  "dcId": 1,
  "nextApiId": 2040,
  "dateUpdated": {
    "$date": "2025-04-21T13:15:23.183Z"
  },
  "banned": false,
  "firstName": "Arina",
  "id": "7955628056",
  "lastName": "Shishkina",
  "messageCount": 16,
  "twoFa": false,
  "twoFaDate": {
    "$date": "2025-04-20T16:07:02.210Z"
  },
  "automaticCheckDate": {
    "$date": "2025-04-21T13:15:23.183Z"
  },
  "remainingTime": {
    "$date": "2025-04-21T07:34:09.344Z"
  },
  "personalChannel": "mcrrcfJCmXNsJ8XW",
  "personalChannelDate": {
    "$date": "2025-03-29T15:25:47.206Z"
  },
  "lazyCheckDate": {
    "$date": "2025-04-20T21:01:50.940Z"
  },
  "username": "shishkina_clear"
},
{
  "_id": {
    "$oid": "67dd2af7f5fa1dc49466c810"
  },
  "accountId": "1798853170-prefix-female-casino",
  "dc4": "878a8c44fa07872f7993e5bbd0b223e84096af577bef0a0aa0b11c7d6e99a7695731a713548e7f9529b68877b3e75ca138dbe3e5095af4b8d7a3409b083228814f23208bd1710ec771670d3b24f83825709a1b3659042a49ce5455cdb9e35570406d505f2484f3b6024c8b48d4ecdac726d9f729f3b4c8393580c635a6be604f7d37fc2eaf63af4eb621b17c216c35b8792fc12fa03071f36cdc6e16cf2ecad9ddd6a2b35b739244eb95d4d76b6bf43d9f42a90cf1f7d165fc7d29dda9e6b48752421b16e73ced06015cc81fd9ac6abf164a56d510f32de5041f66ca989363a2e9a3a292010c30361c6748bf7f4212c3a5fcc28adbd72dcf6a2838d930086c42",
  "dcId": 4,
  "nextApiId": 2040,
  "dateUpdated": {
    "$date": "2025-04-21T13:08:27.727Z"
  },
  "banned": false,
  "firstName": "Yulia",
  "id": "1798853170",
  "lastName": "Petrova",
  "messageCount": 60,
  "twoFa": false,
  "twoFaDate": {
    "$date": "2025-04-20T20:22:26.440Z"
  },
  "automaticCheckDate": {
    "$date": "2025-04-21T13:08:27.727Z"
  },
  "remainingTime": {
    "$date": "2025-04-21T14:42:21.078Z"
  },
  "personalChannel": "SNG7oSQahIADWBiy",
  "personalChannelDate": {
    "$date": "2025-03-29T15:22:55.047Z"
  },
  "lazyCheckDate": {
    "$date": "2025-04-20T20:45:29.878Z"
  },
  "username": "petrova_internal"
},
{
  "_id": {
    "$oid": "67dd2af8f5fa1dc49466c812"
  },
  "accountId": "7703407336-prefix-female-casino",
  "dc1": "6d213ef5890bc5524247e0923853d9fc1477529fb31df18d77fe389369cd56b3d9d9ef29491a663a70f6f6f9afc980cb1c3b40d171c02f811d2d5ff8cd8cb4cf918f942d82321bc99b1b845745f4946f9e11962fb1743d808a35d719f26c728b8672fc5d6d428f02fd9e1b356de4005487b77bcef4f7045044024814985f7ea8e285b7c45348efa036bece0584191f6847f6bf23ca27933a5b1b596c4f3a5008bfeea3c2bcd1a373e52f9e2a57de97172f9c6981f758bfa842767ff14336e8cfc558742ad5cd9a4d200600d06b8e7548197f3b05c5c6159663d81b6619bba9ad0adc203d7267d547e145146fa45b6a736cb1aaef1d9db007ca25f631d97003c7",
  "dcId": 1,
  "nextApiId": 2496,
  "dateUpdated": {
    "$date": "2025-04-21T13:16:25.126Z"
  },
  "banned": false,
  "firstName": "Svetlana",
  "id": "7703407336",
  "lastName": "Zaitseva",
  "messageCount": 37,
  "twoFa": false,
  "twoFaDate": {
    "$date": "2025-04-20T20:22:26.148Z"
  },
  "automaticCheckDate": {
    "$date": "2025-04-21T13:16:25.126Z"
  },
  "remainingTime": {
    "$date": "2025-04-21T13:59:38.072Z"
  },
  "historySpamBlocks": [
    {
      "spamBlockDate": {
        "$date": "2025-03-29T08:11:00.000Z"
      },
      "spamBlockDays": 1
    }
  ],
  "personalChannel": "SA5uxZwTGhMMxbqE",
  "personalChannelDate": {
    "$date": "2025-03-29T15:26:17.560Z"
  },
  "lazyCheckDate": {
    "$date": "2025-04-20T21:08:50.751Z"
  },
  "username": "zaitseva_particular"
},
{
  "_id": {
    "$oid": "67dd2af8f5fa1dc49466c814"
  },
  "accountId": "1553860525-prefix-female-casino",
  "dc1": "55f6b5dc8c5d83464d32558e42ee2f082c56d01a5bda0f9fa431e9b5b411ef1bb5029d20d2c6487bc6ebaca97797c59d3988df922870f5ec97d1f115797284763b054ac1a71b889fbd07c6e147075e7a45d7f40d3e5a0acb790d0fa615a8055ac0165c0e2bdc24594b508d723e576681b17f4cf5bbaceee0735e433e44f25becf6eab65cc94603bcfb528569837c2beb8f333d9d2cf6d5a23ebb3da3c43fa9653da4611682c2dbede6e25b3b8029e8e3ca5eabaa9ed8e0d1685f2c52d77ce57aa999bc0eb458bd9bf7c675e1ba979ff8094e497503acc22509984662c7e81a26f886d8cbf5ebf7e8c4c23cc3e193e2293209e4d1f4116d1dd8ecbfb7bf042d9a",
  "dcId": 1,
  "nextApiId": 2040,
  "dateUpdated": {
    "$date": "2025-04-21T13:12:28.689Z"
  },
  "banned": false,
  "firstName": "Daria",
  "id": "1553860525",
  "lastName": "Shumilova",
  "messageCount": 38,
  "twoFa": false,
  "twoFaDate": {
    "$date": "2025-03-24T09:50:27.069Z"
  },
  "automaticCheckDate": {
    "$date": "2025-04-21T13:12:28.689Z"
  },
  "remainingTime": {
    "$date": "2025-04-21T12:36:10.557Z"
  },
  "personalChannel": "uu4tENfWnnyKGpHj",
  "personalChannelDate": {
    "$date": "2025-03-29T15:23:49.393Z"
  },
  "lazyCheckDate": {
    "$date": "2025-04-20T20:07:18.417Z"
  },
  "username": "shumilova_imaginative"
},
{
  "_id": {
    "$oid": "67dd2af9f5fa1dc49466c844"
  },
  "accountId": "5235607188-prefix-female-casino",
  "dc4": "2462e9f5c20b917d29a0253f2b84c29332d04ed8ba5359ac12750123e689ef25bc9ecec3a0c8e1ec67efe1650c67f1fcf70674f6adbab53b19b29ba590c0793a262ba71647c2271f6cd42771478a82a3d257cfc0a939e84309c047a030e6251ec333f5942dc0a59b6bfa1a4489b6915e3788aa1f637caa16f58263fd0d8f93048c2703c19c7b1f88ddcf548d06e675ebe24be45a28c97bf03aa7cea40007699e4d29b7be2613dbcb3c1e4ee31cb6a6532c901974b9f111bc04ac3ef6dd1bb0388455967f51fdb66d8b24472da533711c35ec0fb1551009d09eee37b54588930c5c1d60dca09f37da4d74ceb26aa9dcbe203c05fb489e6789fb4a27fe7249a38e",
  "dcId": 4,
  "nextApiId": 2040,
  "dateUpdated": {
    "$date": "2025-04-21T13:14:26.984Z"
  },
  "banned": false,
  "firstName": "Anfisa",
  "id": "5235607188",
  "lastName": "Osipova",
  "messageCount": 53,
  "twoFa": false,
  "twoFaDate": {
    "$date": "2025-04-20T16:07:03.368Z"
  },
  "automaticCheckDate": {
    "$date": "2025-04-21T13:14:26.984Z"
  },
  "remainingTime": {
    "$date": "2025-04-21T14:09:02.482Z"
  },
  "historySpamBlocks": [
    {
      "spamBlockDate": {
        "$date": "2025-03-30T11:33:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-04-07T15:27:00.000Z"
      },
      "spamBlockDays": 1
    }
  ],
  "personalChannel": "EgwnfdknQ3cuUhxd",
  "personalChannelDate": {
    "$date": "2025-03-29T15:24:18.936Z"
  },
  "lazyCheckDate": {
    "$date": "2025-04-20T21:20:52.125Z"
  },
  "username": "osipova_dying"
},
{
  "_id": {
    "$oid": "67dd2af9f5fa1dc49466c847"
  },
  "accountId": "5031825746-prefix-female-casino",
  "dc1": "5a48c0bf96b7e60dd28b6c566d609f8fbd0508a348b36a8cc62410fa099d9b7b3f168649684d1692b9d652a3a453b16dd37e54663007fd7665b74292e4c3bacc7ee7c0b6798edb646f008e182b84f55477c7bb885ca7b461a76cd03c9657d0da666e8056a8deaca6b859666c3dcc2c30d555f2b1135160f602570b8508025484240bd63b95405377c7a1b2dd408b03525a568a8134614ae3bf8a38717f967dd96c0f90ca197ea4201f1288ef3e5f82df571f3964e6cb83c130d1600d577b0db237150086a6b99fa65a4d1b03227c74b6dfa515a9af0e0636d69f05cf4cfd7c00ee2ee54792dad1bff6f2d6d51f03d09ced2871b54e37e7764812aba9028d4f1a",
  "dcId": 1,
  "nextApiId": 2040,
  "dateUpdated": {
    "$date": "2025-04-21T21:52:55.014Z"
  },
  "banned": false,
  "firstName": "Irina",
  "id": "5031825746",
  "lastName": "Nechayeva",
  "messageCount": 35,
  "twoFa": false,
  "twoFaDate": {
    "$date": "2025-04-20T20:22:26.176Z"
  },
  "automaticCheckDate": {
    "$date": "2025-04-21T21:52:55.014Z"
  },
  "remainingTime": {
    "$date": "2025-04-21T12:12:44.718Z"
  },
  "personalChannel": "TfZZRFtcUHh2nlok",
  "personalChannelDate": {
    "$date": "2025-03-29T15:23:37.564Z"
  },
  "lazyCheckDate": {
    "$date": "2025-04-21T21:52:54.711Z"
  },
  "username": "nechayeva_sparkling"
},
{
  "_id": {
    "$oid": "67dd2afaf5fa1dc49466c84e"
  },
  "accountId": "6726877379-prefix-female-casino",
  "dc1": "20c95c6ad07b2a9e6567250ab845d08df22eddff43ccf6ca6167f2a2ebfd371cd3e3fb52b2d3266f5d2b8ae0f804b18a0b0bb753e804b7cab3c3ea8992748b74548640dfe0b815b38251374e90ce97cae03f6bf314ae4a926c9ac74b1cdd4fcc64ad906d9746656359aa999fe8d611b06967535e4c8223822c62d0ca1773f4baa73643a05fc29c02c0226cc2e8206d05cbf07eb880ca148ad89f6e716e26e29f9013885772e4b6da3e8e20658a7abb9172258890ceaf7e9c37d7dac1a7dff656c73f80c473d181f136f9389cfd037d0678c95a8e80055ef242b977d3c491099e439ef8c75a3d36a871336db66d79100abc9bee139e1a506825ca45d89895338e",
  "dcId": 1,
  "nextApiId": 2496,
  "dateUpdated": {
    "$date": "2025-04-21T13:30:25.445Z"
  },
  "banned": false,
  "firstName": "Alla",
  "id": "6726877379",
  "lastName": "Loginova",
  "messageCount": 18,
  "twoFa": false,
  "twoFaDate": {
    "$date": "2025-04-20T20:22:26.161Z"
  },
  "automaticCheckDate": {
    "$date": "2025-04-21T13:30:25.445Z"
  },
  "remainingTime": {
    "$date": "2025-04-21T08:00:16.314Z"
  },
  "personalChannel": "tvFlota6lZbBjBoy",
  "personalChannelDate": {
    "$date": "2025-03-29T15:25:34.569Z"
  },
  "lazyCheckDate": {
    "$date": "2025-04-20T21:00:51.050Z"
  },
  "username": "loginova_useless"
},
{
  "_id": {
    "$oid": "67dd2afaf5fa1dc49466c851"
  },
  "accountId": "5860251190-prefix-female-casino",
  "dc1": "3d0e7ec387e7f7978c978f7e91828bdc733e06a27459597a475e217072fe9ac4a3e7241985df35c15439e74be024c83997839a356132176fca1ffe7d6b2dda8e9b725177b8817987e7611b700a83842383e6cf07707c11f31a6ea50b28119e5f6395a27bbabf8bcccc313decd9e4296a0cdaf8ae837e741502f023bb339e5f76ce406aaac30055a6ec7f12a35064f966dbead982e87b06ed394a07e367b958378f884d5684d2954bd89553e3b7f3698fe40ffc78baaf2c30e772cd426ce44e786625ab1584a2a56dff2becf25e5f8d7282c7f9b411cddbd04770ac49383c5bea93c7a8ab36c9a9177371936683a19f8b46175ea4881874de4f198b67bfabefcc",
  "dcId": 1,
  "nextApiId": 2040,
  "dateUpdated": {
    "$date": "2025-04-21T13:28:25.088Z"
  },
  "banned": false,
  "firstName": "Anna",
  "id": "5860251190",
  "lastName": "Popova",
  "messageCount": 20,
  "twoFa": false,
  "twoFaDate": {
    "$date": "2025-04-20T20:22:27.681Z"
  },
  "automaticCheckDate": {
    "$date": "2025-04-21T13:28:25.088Z"
  },
  "remainingTime": {
    "$date": "2025-04-21T07:56:46.283Z"
  },
  "personalChannel": "cERdGLFjeTasFH4F",
  "personalChannelDate": {
    "$date": "2025-03-29T15:25:29.548Z"
  },
  "lazyCheckDate": {
    "$date": "2025-04-20T20:32:31.700Z"
  },
  "username": "popova_domestic"
},
{
  "_id": {
    "$oid": "67dd2afbf5fa1dc49466c853"
  },
  "accountId": "5700903501-prefix-female-casino",
  "dc1": "5cf5f2847f6ba09de4311c722053e8941d9cfa9cf3e102ab7a6b2b14c3d7e0c11039d0750e035d17c0b3a36140dc08505f04a3ad3883bab8ed36c813f3568c664567bd4e573980761b504df38b38e88b1faeb41b2069b36fd873b90bd12d2c224e872b491831e43f5c3e16f7ed22f7297056bbc8fc45b6c09483537e29fa42b196e1870e4699d35c0d4921845f9410d8cfa199a96cd010f5550b41ceed7de7b7046e016c7ee534beae3d27bde12232ab0ccd02273a1582c6f78b1063a8d0a1150ff25a655355210cde173214480f45a73e13eb134a0db1d2be85933cff48abca32e1b89f97a02310747967e405008cf9bf17fbc3ee7cba717944b9693ba61cc7",
  "dcId": 1,
  "nextApiId": 2040,
  "dateUpdated": {
    "$date": "2025-04-21T13:16:25.099Z"
  },
  "banned": false,
  "firstName": "Rita",
  "id": "5700903501",
  "lastName": "Timofeeva",
  "messageCount": 29,
  "twoFa": false,
  "twoFaDate": {
    "$date": "2025-04-20T16:07:02.179Z"
  },
  "automaticCheckDate": {
    "$date": "2025-04-21T13:16:25.099Z"
  },
  "remainingTime": {
    "$date": "2025-04-21T12:10:54.296Z"
  },
  "historySpamBlocks": [
    {
      "spamBlockDate": {
        "$date": "2025-03-29T10:08:00.000Z"
      },
      "spamBlockDays": 1
    }
  ],
  "personalChannel": "c3UsBTFbTosXbnDc",
  "personalChannelDate": {
    "$date": "2025-03-29T15:26:13.357Z"
  },
  "lazyCheckDate": {
    "$date": "2025-04-20T21:15:50.950Z"
  },
  "username": "timofeeva_occupational"
},
{
  "_id": {
    "$oid": "67dd2afbf5fa1dc49466c856"
  },
  "accountId": "8188345703-prefix-female-casino",
  "dc1": "8080e04ffabf82e02135b86274631ee16d24701396bb1e0ee3d99c07b7aa334c26b983d16d6a25024284178868414fc256684e899bd819256bf1a88f7fda97ed64ab678655a40aed29d17a9b4d6756061626efcce52b60b5a3eb56e7d628f14627630b66ed1b900f41df10b3efb82915e0228249798144cb2fdc701c02c656bff2972d2fa366fecb269896608aa03f42da95e2ba4856e9bdb0337dc6f70893dc126725a277163f9091764c9b54bf86599986394c0189b7ff64aeb4ab382555c3dcedd6bb61094fc399da6bb678419659bd41d65ddda4235b8fa8068ed7e6daab65d842a4b34d0fd47e5d3507d44bb84962e6a7573fb6edc7f7e1fdc892ae6782",
  "dcId": 1,
  "nextApiId": 2496,
  "dateUpdated": {
    "$date": "2025-04-21T13:24:26.954Z"
  },
  "banned": false,
  "firstName": "Evgenia",
  "id": "8188345703",
  "lastName": "Ilyina",
  "messageCount": 43,
  "twoFa": false,
  "twoFaDate": {
    "$date": "2025-04-20T16:07:02.188Z"
  },
  "automaticCheckDate": {
    "$date": "2025-04-21T13:24:26.954Z"
  },
  "remainingTime": {
    "$date": "2025-04-21T12:11:06.102Z"
  },
  "personalChannel": "LPFfIByoIZrbe1MF",
  "personalChannelDate": {
    "$date": "2025-03-29T15:22:55.707Z"
  },
  "historySpamBlocks": [
    {
      "spamBlockDate": {
        "$date": "2025-04-03T08:13:00.000Z"
      },
      "spamBlockDays": 1
    }
  ],
  "lazyCheckDate": {
    "$date": "2025-04-20T20:43:31.318Z"
  },
  "username": "ilyina_detailed"
},
{
  "_id": {
    "$oid": "67dd2afbf5fa1dc49466c858"
  },
  "accountId": "6923928188-prefix-female-casino",
  "dc1": "3eb799c605f4d5c74f33bf2e109c4fd761fff4d72113b965fb52f9b5d746f060de40fb38003edf98b1a88cb68d439bb893621830670b4be294d4b9534199e41bd4a1c225cc8e22693317ab1355a2b4d617949a880b97fcb68ea15bc13a93018fb5023b4ef3bf02be9a685994c69457a1366e1360374fc155cc80e3e6ae27b5ed58f19869f32b89d66a283754151f72ee9c3efb2a09407fd660b6d0c44867c318ef0f9223b97810ccc5f6cc0262aaee50a76166097cad81a4c0e596f8a26a213a78eb87c3d50d5b10d6e33c6d37a8de3da82e8d1c7ec4b9a52ee93e00636ed34c78e291a07ff1605b0776853f67ebf163bf1b742c8c8a728674a4dea203d4d606",
  "dcId": 1,
  "nextApiId": 2040,
  "dateUpdated": {
    "$date": "2025-04-21T13:22:25.098Z"
  },
  "banned": false,
  "firstName": "Elena",
  "id": "6923928188",
  "lastName": "Terekhova",
  "messageCount": 33,
  "twoFa": false,
  "twoFaDate": {
    "$date": "2025-04-20T16:07:02.023Z"
  },
  "automaticCheckDate": {
    "$date": "2025-04-21T13:22:25.098Z"
  },
  "remainingTime": {
    "$date": "2025-04-21T09:14:42.636Z"
  },
  "personalChannel": "kVHXIc4RmVvlnOmv",
  "personalChannelDate": {
    "$date": "2025-03-29T15:22:28.855Z"
  },
  "historySpamBlocks": [
    {
      "spamBlockDate": {
        "$date": "2025-04-02T06:09:00.000Z"
      },
      "spamBlockDays": 1
    }
  ],
  "lazyCheckDate": {
    "$date": "2025-04-20T20:40:31.491Z"
  },
  "username": "terekhova_holy"
},
{
  "_id": {
    "$oid": "67dd2afbf5fa1dc49466c85b"
  },
  "accountId": "7057368316-prefix-female-casino",
  "dc1": "b9b5af518a7c50631a92b6cb37a167eb98b0085655b598ae2e5270cab896edeba5a546ceb8c9730ae6abd5dbc5dac24afbc5b6f467b3a4020f9388895674d06283b1022c0f7f7153ff660b49607ef8b2954b1eae551d83f77d404e258dca973782cb6a1ff710fa8633e90cbb4ba2b870bba158a16d8ba16fb3f49922777d2d97d5268e417f02a52af6107b43adb053d37965bc25b57571778163f7247ab412f5912d4499a516933b4b2a1ad8a5e46c711d789b8d39326162257a1b26e0df7fcfa1b171756e4f2977616b853c8306f1376fb6cbcf84f532e1db0706e620c47eac0645d7546ec60f92fcbcd5c9ce00db7fc033b10392ace497daf069bac104c7d3",
  "dcId": 1,
  "nextApiId": 2496,
  "dateUpdated": {
    "$date": "2025-04-21T13:23:26.547Z"
  },
  "banned": false,
  "firstName": "Ekaterina",
  "id": "7057368316",
  "lastName": "Dubrovina",
  "messageCount": 38,
  "twoFa": false,
  "twoFaDate": {
    "$date": "2025-04-20T20:22:27.678Z"
  },
  "automaticCheckDate": {
    "$date": "2025-04-21T13:23:26.547Z"
  },
  "remainingTime": {
    "$date": "2025-04-21T12:03:30.056Z"
  },
  "personalChannel": "xFTWi8HKcWypeTRy",
  "personalChannelDate": {
    "$date": "2025-03-29T15:26:14.651Z"
  },
  "lazyCheckDate": {
    "$date": "2025-04-20T20:44:31.835Z"
  },
  "username": "dubrovina_modest"
},
{
  "_id": {
    "$oid": "67dd2afcf5fa1dc49466c85e"
  },
  "accountId": "7166559925-prefix-female-casino",
  "dc1": "afa5956f0fd99882238dccfa0329207f72a9c5f8257127331729e0a6caabfdb853bf7cb534f6bd16f60780625d8ace5c79bc95ffdf258fdb14705d867c681893bc0c9722fcd4540dc37daed28c5bd20ec18b21cb43ef9a1ea81329cdc78fc8b7b121ea532ac167102ea717d71728a560c8762a754737c304125f3d8d3c9caeaa91e27d739d72f1b2828519648c4b81e2271ab90f407ca6dc9342ba448f3cafd237708e0855b5d03ed58cea947a14509ead0ea060fae8651fa9b12b0dd3e27809531fbed6cec3ee69eeb1d24a79f434cef0a4bf8f55cbf780dc837de72153a3ed837148899aee58e64b544fecc8f92e0773a3359131bfd294fa414c207b3d0ef0",
  "dcId": 1,
  "nextApiId": 2496,
  "dateUpdated": {
    "$date": "2025-04-21T21:48:55.332Z"
  },
  "banned": false,
  "firstName": "Tatiana",
  "id": "7166559925",
  "lastName": "Markova",
  "messageCount": 34,
  "twoFa": false,
  "twoFaDate": {
    "$date": "2025-04-20T16:07:02.067Z"
  },
  "automaticCheckDate": {
    "$date": "2025-04-21T21:48:55.332Z"
  },
  "remainingTime": {
    "$date": "2025-04-21T11:24:20.776Z"
  },
  "personalChannel": "PBN0oUimnMVyVWNR",
  "personalChannelDate": {
    "$date": "2025-03-29T15:27:22.228Z"
  },
  "lazyCheckDate": {
    "$date": "2025-04-21T21:48:54.957Z"
  },
  "username": "markova_shy"
},
{
  "_id": {
    "$oid": "67dd2afcf5fa1dc49466c861"
  },
  "accountId": "6535707730-prefix-female-casino",
  "dc1": "37fe2b8c5acd2f0b58c6f4f9d675e0554f3eca913592c2f19bdf3551edd81c074736e93563e7137c188347d92a405c7126c4782433b5457f819332ba9738f2f3b557292c4de268df39f87842d5f90712d214be592a354a6595b58e0aeebac3084af29f2d9916cfa4fe34dda203bd4f24875bb38bb192c8278cc37bb3176179a7d4e0725368e349dccc87b2cfa462ba38e0f11906a8046ea3649267ab31a4300fdc2ef1068a582d43a7299267e1eca75650821f16c0a3b01d10d555ee7077f53f93ca5046b04d7b804449221174318dbc3359d058ef443b66944170fbd7e126b328b8892f0b5de152c301124b41a1a448f28b1e2ee77d1159401bdc02dbc68353",
  "dcId": 1,
  "nextApiId": 2040,
  "dateUpdated": {
    "$date": "2025-04-21T13:20:26.845Z"
  },
  "banned": false,
  "firstName": "Lubov",
  "id": "6535707730",
  "lastName": "Lapshina",
  "messageCount": 43,
  "twoFa": false,
  "twoFaDate": {
    "$date": "2025-04-20T20:22:26.057Z"
  },
  "automaticCheckDate": {
    "$date": "2025-04-21T13:20:26.845Z"
  },
  "remainingTime": {
    "$date": "2025-04-21T12:37:58.155Z"
  },
  "personalChannel": "xxlN8bUJiQHKMWnT",
  "personalChannelDate": {
    "$date": "2025-03-29T15:23:48.982Z"
  },
  "historySpamBlocks": [
    {
      "spamBlockDate": {
        "$date": "2025-03-31T09:52:00.000Z"
      },
      "spamBlockDays": 1
    }
  ],
  "lazyCheckDate": {
    "$date": "2025-04-20T21:05:52.321Z"
  },
  "username": "lapshina_definite"
},
{
  "_id": {
    "$oid": "67dd2afcf5fa1dc49466c863"
  },
  "accountId": "7360012528-prefix-female-casino",
  "dc1": "4c88a5fb8a2851e0d0819ea5323b28e87abde3dd942cdcaf2574730f095e5fd5da77c271a5de513669a40567fedf4d998a051720cfca0e360ee31aca4c1c3f8039123a3845e47cc153252c451309e4250ce77e3c71f95547d65d4ef805bfd31855890b0cd5d9b24ade1089194ba9552b02612058dd5cd013f4c4c3c0bfc8067e332bc1b6032721394da919b4215fa58e21bc5a0a2e3d32eea5efdb9570cbed4313fc00bfdbbf9a5be9beedf1ef7a91ca7daa73892aebcde78ee04a0422937596b86e019c26c0bd26875203179d64bd4aeff46a5c7843bbbd1c2147018e502310041d191cffd523915df068f610fd95f40488dedfd33bf04e6b4ba65b9b6773e8",
  "dcId": 1,
  "nextApiId": 2496,
  "dateUpdated": {
    "$date": "2025-04-21T21:52:57.831Z"
  },
  "banned": false,
  "firstName": "Svetlana",
  "id": "7360012528",
  "lastName": "Volkova",
  "messageCount": 44,
  "twoFa": false,
  "twoFaDate": {
    "$date": "2025-04-20T20:22:27.703Z"
  },
  "automaticCheckDate": {
    "$date": "2025-04-21T21:52:57.831Z"
  },
  "remainingTime": {
    "$date": "2025-04-21T11:29:44.629Z"
  },
  "historySpamBlocks": [
    {
      "spamBlockDate": {
        "$date": "2025-03-29T10:56:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-04-11T11:21:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-04-20T14:24:00.000Z"
      },
      "spamBlockDays": 3
    }
  ],
  "personalChannel": "aP2mreBLJWJawONA",
  "personalChannelDate": {
    "$date": "2025-03-29T15:25:26.112Z"
  },
  "lazyCheckDate": {
    "$date": "2025-04-21T21:52:57.525Z"
  },
  "username": "volkova_integrated"
},
{
  "_id": {
    "$oid": "67dd2afcf5fa1dc49466c866"
  },
  "accountId": "1781314986-prefix-female-casino",
  "dc1": "ab265778c09f3326562a64cb0878888dda57ee149db8ff9821682c2baeb000ee817e22b176e041cb66319f3f8f6fa200a8d38b6cdd96decf3e1be4be1674a488dfbc04deb0a4d0fd40bb046cd8a68cdc5a8368c09b2311a91db013ba0716502dc875ac10533f59694378dac3c9e2893e3aae7bd64db8f2209354f5c630e150c087c066ba2723e79ac38d0ce16260efc67725876ac845e455f4d5fbf307e624d1215f3efef1fbc94dcd630e616c4b5e7872d1fdc569c9c2c07118039095828b58d4ea8231f83d06b8ebf1c7d6567ff9fc5beeb2752e7a1d81cf86b5385fa34b47eeb206d0853121cc7fef5b1c39716acdc7693e82891fd27409f2fce4eab9146d",
  "dcId": 1,
  "nextApiId": 2040,
  "dateUpdated": {
    "$date": "2025-04-21T13:10:26.847Z"
  },
  "banned": false,
  "firstName": "Lubov",
  "id": "1781314986",
  "lastName": "Baranova",
  "messageCount": 17,
  "twoFa": false,
  "twoFaDate": {
    "$date": "2025-04-20T20:22:27.680Z"
  },
  "automaticCheckDate": {
    "$date": "2025-04-21T13:10:26.847Z"
  },
  "remainingTime": {
    "$date": "2025-04-21T07:53:44.373Z"
  },
  "personalChannel": "wYWlOfv4SycjmeKr",
  "personalChannelDate": {
    "$date": "2025-03-29T15:26:47.662Z"
  },
  "lazyCheckDate": {
    "$date": "2025-04-20T21:19:52.315Z"
  },
  "username": "baranova_linguistic"
},
{
  "_id": {
    "$oid": "67dd2afdf5fa1dc49466c868"
  },
  "accountId": "6355335264-prefix-female-casino",
  "dc1": "5546b2cb9a565b62f4c899dd24d0d2adb5ecabd83de7c942aca774209ac8ea9023ab2d9d74901f65cd448cbc4d22d98bf3bc07e3a16b1ce5bec7da0c7ba1360c5023f5ffc2b94862ec23e04073c8cbbeef6b0890f526432beee5606f6ede154931f2389678fc782faf7c3351fa89e4a1b3000d0a52e12e17f983eabbb489a7e16e87d1cbe9030388d85209b1d64a1f655f2d3ba0f1ec4e154580afb108161ebf417d0b2a4a8d6954b1e7877c663b48bd5f71a216ee4c32f6b8079592a6d974aa5d795b6b5b5da1e642fed88280060a6e4ac326e3a97d9b06ecfd0501dbc84140ae7cf28803f942cac2d6ae6c06f5afc76bb8952c0080dfb954f2dbb97078e5de",
  "dcId": 1,
  "nextApiId": 2496,
  "dateUpdated": {
    "$date": "2025-04-21T13:16:25.338Z"
  },
  "banned": false,
  "firstName": "Anna",
  "id": "6355335264",
  "lastName": "Orlova",
  "messageCount": 29,
  "twoFa": false,
  "twoFaDate": {
    "$date": "2025-04-20T20:22:27.677Z"
  },
  "automaticCheckDate": {
    "$date": "2025-04-21T13:16:25.338Z"
  },
  "remainingTime": {
    "$date": "2025-04-21T12:00:23.444Z"
  },
  "personalChannel": "YtDVLvwG1bpOGDSP",
  "personalChannelDate": {
    "$date": "2025-03-29T15:23:03.514Z"
  },
  "lazyCheckDate": {
    "$date": "2025-04-20T20:57:52.356Z"
  },
  "username": "orlova_still"
},
{
  "_id": {
    "$oid": "67dd2afdf5fa1dc49466c871"
  },
  "accountId": "7773586544-prefix-female-casino",
  "dc1": "5bb869f8479b385fb031c36e4a4a358697b2bfb5f1329a18c6cb3ba2f7e9b97452e6da145ece90be2d651f6eb4fbeecccff79b8bb46779941b5b0a06e6a81e0f5fc17a67c4e8aeee4553cb86dc2353d1ac659fdeeb69c943874eeeae5dd2ca7f6e9bfd7a9b7907291aff7cd4bb9abb4e54b0178ece97af229b770199e85ab3ca7568bcd0edad3dbdb4c432d94fd396f00f069ccc60648f8458421494213ac0f376a09b9ac7bca416cdb0f056c4f42acbfcccf396698b62a843d7c6ffa5dd43609712555b33f1956fea4e3402d28f996772e36f35f3d8cd0c2f8973c855e4b5146381bfebea4f3b6604b687002ad09555c70eb61bb95c7970903ca271076eec51",
  "dcId": 1,
  "nextApiId": 2496,
  "dateUpdated": {
    "$date": "2025-04-21T21:48:54.009Z"
  },
  "banned": false,
  "firstName": "Tatiana",
  "id": "7773586544",
  "lastName": "Demidova",
  "messageCount": 38,
  "twoFa": false,
  "twoFaDate": {
    "$date": "2025-04-20T20:22:27.679Z"
  },
  "automaticCheckDate": {
    "$date": "2025-04-21T21:48:54.009Z"
  },
  "remainingTime": {
    "$date": "2025-04-21T11:51:54.231Z"
  },
  "personalChannel": "Zskm3EgwoFwuMgfu",
  "personalChannelDate": {
    "$date": "2025-03-29T15:25:49.440Z"
  },
  "historySpamBlocks": [
    {
      "spamBlockDate": {
        "$date": "2025-03-31T22:51:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-04-05T10:50:00.000Z"
      },
      "spamBlockDays": 1
    }
  ],
  "lazyCheckDate": {
    "$date": "2025-04-21T21:48:53.793Z"
  },
  "username": "demidova_illegal"
},
{
  "_id": {
    "$oid": "67dd2afdf5fa1dc49466c875"
  },
  "accountId": "7789402808-prefix-female-casino",
  "dc1": "3e1f9b2df8dcd6aed0a563b83bfbc4b7d7c29b28b89d4f7e33a59ef174ea73a62a5b9c0bd0466c6f6f5ffbe6f923a6e0ef2600b2ec8460d6082471069a9c7e41370541f878a255d40426a998ad9545f8eec675ab64afd09435614722c9bb60d2bdc777c02eff6384ddca5aea389a2781a76ed4632e818153b0ee11235da6dd845c0d2212d5af2148ce0ed51d1cb6f88754d98de4a559adcb6b5e6f8fc9e1ee242d2657841cc3514099b460f76c37577d29b053f5f2bad307e2ffda0b29eaab5dd7e2f9bff1bc37cb071fb7afc6c1f4286171cb187619902faa7038e13c220bb69db506f4195a47f2b7c6e0e2a0d8eedfe0c6f9e0191bd44d473a3035164a6e56",
  "dcId": 1,
  "nextApiId": 2040,
  "dateUpdated": {
    "$date": "2025-04-21T21:55:54.108Z"
  },
  "banned": false,
  "firstName": "Anfisa",
  "id": "7789402808",
  "lastName": "Chernova",
  "messageCount": 33,
  "twoFa": false,
  "twoFaDate": {
    "$date": "2025-04-20T20:22:26.149Z"
  },
  "automaticCheckDate": {
    "$date": "2025-04-21T21:55:54.108Z"
  },
  "remainingTime": {
    "$date": "2025-04-21T10:31:36.066Z"
  },
  "personalChannel": "YkFCCHfl0iqrquME",
  "personalChannelDate": {
    "$date": "2025-03-29T15:24:46.883Z"
  },
  "lazyCheckDate": {
    "$date": "2025-04-21T21:55:53.811Z"
  },
  "historySpamBlocks": [
    {
      "spamBlockDate": {
        "$date": "2025-04-11T05:23:00.000Z"
      },
      "spamBlockDays": 1
    }
  ],
  "username": "chernova_fuzzy"
},
{
  "_id": {
    "$oid": "67dd2afef5fa1dc49466c87f"
  },
  "accountId": "7068165129-prefix-female-casino",
  "dc1": "a232f1426fdc913defbef4788729652b3a0f20339afe0763e9d17d5b4e922d6995e035f0f1631b16f4679c3386e9772ac0d5860d3934247c04acda15b3b37b47276284a84880e4e7fd060866c8299f705a1ae2fc36487b66fb62cb2f5030265a18031b725e9a10684ffa23280f934b263d880206330427fffe6a7983af48b07804613babd39c55473590955b24d4f850748995ee02fbb4de71fd8c0d3c6a185af07a8d0a16b2c36f8b00e3e27c1a7c23c891cce3654dc405c145f614bf86501679f4ee3f6e9079b0f35a1c5029e8f36f6e42fa2e287409c9d8970025020a03a2b414584f8d803a4c6ed2f3bc05ee483ffbb1df7b8fa089d1f2d91fcbd05b357b",
  "dcId": 1,
  "nextApiId": 2496,
  "dateUpdated": {
    "$date": "2025-04-21T13:30:25.338Z"
  },
  "banned": false,
  "firstName": "Anastasia",
  "id": "7068165129",
  "lastName": "Melnikova",
  "messageCount": 37,
  "twoFa": false,
  "twoFaDate": {
    "$date": "2025-04-20T16:06:40.600Z"
  },
  "automaticCheckDate": {
    "$date": "2025-04-21T13:30:25.338Z"
  },
  "remainingTime": {
    "$date": "2025-04-21T12:14:10.069Z"
  },
  "personalChannel": "yPEXM6RtbrvFgbEf",
  "personalChannelDate": {
    "$date": "2025-03-29T15:26:36.951Z"
  },
  "lazyCheckDate": {
    "$date": "2025-04-20T20:36:31.333Z"
  },
  "username": "melnikova_used"
},
{
  "_id": {
    "$oid": "67dd2afff5fa1dc49466c883"
  },
  "accountId": "7593601398-prefix-female-casino",
  "dc1": "8ca4b1c517dd0bf3154d9344b979c9fd3c287adbeb014312488ffda5a76487e606447b1e54d5b1b9d5157108d14af68132d4e77c95f36eb5e8ee82a8ffc1ba575fe2d8ea9406e79403a90d79dd563b65d1cbc709384ab5dee591e54383eba5ecce313ab6998d109b1f961f537b0d7d83a0d5d8ca56bdd1003e370415592816648b079a9c0181afee6043e802d72db13e482cea5d7a4b09aa870622d1ceaa08749b53700b8098fb55b7ac4252f246fe8c551119e8a06644626d8b9edabb6f025426feab91dce639332d8634630a57071bbcfe8e7de1d6412c91520b2e300cd9a06959554793172d889351a338e9407458690392b327c6fc633de6504570c581d1",
  "dcId": 1,
  "nextApiId": 2496,
  "dateUpdated": {
    "$date": "2025-04-21T13:12:26.578Z"
  },
  "banned": false,
  "firstName": "Irina",
  "id": "7593601398",
  "lastName": "Lebedeva",
  "messageCount": 34,
  "twoFa": false,
  "twoFaDate": {
    "$date": "2025-04-20T20:22:16.799Z"
  },
  "automaticCheckDate": {
    "$date": "2025-04-21T13:12:26.578Z"
  },
  "remainingTime": {
    "$date": "2025-04-21T11:55:34.730Z"
  },
  "personalChannel": "c1RQNcMqvaFMPZdg",
  "personalChannelDate": {
    "$date": "2025-03-29T15:26:51.297Z"
  },
  "historySpamBlocks": [
    {
      "spamBlockDate": {
        "$date": "2025-04-05T12:29:00.000Z"
      },
      "spamBlockDays": 1
    }
  ],
  "lazyCheckDate": {
    "$date": "2025-04-20T20:45:26.550Z"
  },
  "username": "lebedeva_major"
},
{
  "_id": {
    "$oid": "67dd2afff5fa1dc49466c88e"
  },
  "accountId": "1684521581-prefix-female-casino",
  "dc1": "18a959971ab32da7b2382ab6911b506a95d4d681f8a9a9050adf9ef694811feff57b1e2eb59b566e3e2c1e82772e53624191a09cd3833d76123c6b69621ff0dc4ffb9a9528bac121e704564631ccecfd9fa9bfd2464f4130598b43a1779d70a54302bfa9ed058dd112b8a3ad3c94153a4db7f3c35b795178ce216d7605209b3dd70659ded58610b6a9639392944cfcb4cae31bd5c166529f1ac0cedc3dd2969f449f3227700d624e0f4e4c5eafa942a8c253bcbb649a4ff481633863c2a4b9758a86e766f1cec2267e311f1165fdcc0f6ebcbea7409f9412c77c7a38387362941e6dc6e197877a20cf75f415f2ad2122d60a719a7cbd360e6ccaa3e3ac5c3a68",
  "dcId": 1,
  "nextApiId": 2040,
  "dateUpdated": {
    "$date": "2025-04-21T13:26:08.251Z"
  },
  "banned": false,
  "firstName": "Sofia",
  "id": "1684521581",
  "lastName": "Volkova",
  "messageCount": 31,
  "twoFa": false,
  "twoFaDate": {
    "$date": "2025-04-20T20:22:16.796Z"
  },
  "automaticCheckDate": {
    "$date": "2025-04-21T13:25:20.540Z"
  },
  "remainingTime": {
    "$date": "2025-04-21T15:26:08.251Z"
  },
  "personalChannel": "QR4orahgHcWuAlgZ",
  "personalChannelDate": {
    "$date": "2025-03-29T15:22:54.831Z"
  },
  "lazyCheckDate": {
    "$date": "2025-04-20T20:42:26.318Z"
  },
  "historySpamBlocks": [
    {
      "spamBlockDate": {
        "$date": "2025-04-06T07:45:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-04-11T09:28:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-04-11T05:23:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-04-23T13:51:00.000Z"
      },
      "spamBlockDays": 3
    }
  ],
  "username": "volkova_super"
},
{
  "_id": {
    "$oid": "67dd2b00f5fa1dc49466c897"
  },
  "accountId": "6888265548-prefix-female-casino",
  "dc1": "2f07fd899569872f95741d2621898864663277a913e60889b0814150391eb024f74d345ac3d176cfbe687f9a1656bf0aa959b776debef831db6c55dd57b0ea9dba127e9a3b6a01f46a17c62ed2ee1e999295c5eaa4e91da80a2e084f8eefc1f6125982bd081952875b91c97e4c67564887fe8fb66ca98f3076ba9c6ef7ac07bf0627d1485c5090cb08e2ec1a2e19cbfad9c9b03e65c2ce355ee13aac61362cf4a18f06dffc7fa9c0f008dbe135dab62a1c02c7e89d92bbe3f479d6e7e295d57efff970eedb120727c4c710a2ed8bc60b7d2c5e851defa03058a3cc437b49c8d4955ad3bd44b25c2287aca11550b7649164ec52563c958c59dd5248649ae2bf7f",
  "dcId": 1,
  "nextApiId": 2496,
  "dateUpdated": {
    "$date": "2025-04-21T21:49:51.898Z"
  },
  "banned": false,
  "firstName": "Albina",
  "id": "6888265548",
  "lastName": "Shubina",
  "messageCount": 39,
  "twoFa": false,
  "twoFaDate": {
    "$date": "2025-04-20T20:22:18.806Z"
  },
  "automaticCheckDate": {
    "$date": "2025-04-21T21:49:51.898Z"
  },
  "remainingTime": {
    "$date": "2025-04-21T12:47:30.445Z"
  },
  "personalChannel": "usOpEVlXo2dwdxaI",
  "personalChannelDate": {
    "$date": "2025-03-29T15:26:15.628Z"
  },
  "lazyCheckDate": {
    "$date": "2025-04-21T21:49:51.669Z"
  },
  "historySpamBlocks": [
    {
      "spamBlockDate": {
        "$date": "2025-04-10T18:43:00.000Z"
      },
      "spamBlockDays": 1
    }
  ],
  "username": "shubina_urgent"
},
{
  "_id": {
    "$oid": "67dd2b00f5fa1dc49466c89a"
  },
  "accountId": "5350135376-prefix-female-casino",
  "dc1": "659e093ea066936d888673ec219f2dc0962bf8c4def797c421a5f37ffdb3b38b4054d80f493e802cc4296c28e010442b10e8d028ddd961b2b37b5959178381050cc7a40bbfdffe1dc12b58d05784322464e7589d2d18f77e7da275ace51acf4847a5a223459393ee09b7cdac3f371723e7e8c422554aa4615db66ce3b0c9807ec4ad25a899261367015ae64d5b2a00f61deb28bdf35109af1c322e8fb8aef347171500d5399b50d7e98c7e242e4f239659fe3a618d8c9c8a77fb37ad9f5614dabdfeff437f6b080889b2b29cab39ffdb0c8798e7b1aa707d8b26267c5811a5f96e74113a599f68339665cffe45349c9a2917cad8826deafe0a4c14fc0f72a6ee",
  "dcId": 1,
  "nextApiId": 2040,
  "dateUpdated": {
    "$date": "2025-04-21T13:12:20.870Z"
  },
  "banned": false,
  "firstName": "Inna",
  "id": "5350135376",
  "lastName": "Shishkina",
  "messageCount": 17,
  "twoFa": false,
  "twoFaDate": {
    "$date": "2025-04-20T16:06:41.922Z"
  },
  "automaticCheckDate": {
    "$date": "2025-04-21T13:12:20.870Z"
  },
  "remainingTime": {
    "$date": "2025-04-21T07:07:48.401Z"
  },
  "personalChannelDate": {
    "$date": "2025-03-30T04:04:22.477Z"
  },
  "personalChannel": "gSQnFvWlRiHlg5cJ",
  "lazyCheckDate": {
    "$date": "2025-04-20T21:11:42.616Z"
  },
  "username": "shishkina_liquid"
},
{
  "_id": {
    "$oid": "67dd2b01f5fa1dc49466c89c"
  },
  "accountId": "5098709693-prefix-female-casino",
  "dc1": "3e52d7dc2d383b650f99b0daeff380a82d5c72b2490098f9d638980094b972fd49a1aa19e6e8b8729fd546a0017f17790acdbd5fbe6d2af5fe334bad4d2ca149123c4ff93098f4092dc4bb8f9e5537c5e1811c48197db5422bcc40002c61963ae686281d7794a0101063cd9f760afc19cbd6188518f263464de985967b38e5359c8d331a4017e723f21557177ae167577bf3cfa4f8272017dc06b223626e4acd6abe1e86382ef130ede3ff043d9ff088bcf11112c3e2fe25693c57b3ff6d2a03fb4212fbdec0b2bf8e41010b7aaba5e5dc48f97b1e2f00693635aa38c7e6f1e6868ceacae704b73936b4280b464f9d08d487da577abb5c7de65ccdd6ee16dd76",
  "dcId": 1,
  "nextApiId": 2040,
  "dateUpdated": {
    "$date": "2025-04-21T13:22:29.694Z"
  },
  "banned": false,
  "firstName": "Nina",
  "id": "5098709693",
  "lastName": "Tkacheva",
  "messageCount": 21,
  "twoFa": false,
  "twoFaDate": {
    "$date": "2025-04-20T20:22:16.751Z"
  },
  "automaticCheckDate": {
    "$date": "2025-04-21T13:22:29.693Z"
  },
  "remainingTime": {
    "$date": "2025-04-21T07:00:13.019Z"
  },
  "personalChannel": "ASTBcx2sRSRcPRAB",
  "personalChannelDate": {
    "$date": "2025-03-29T15:26:28.320Z"
  },
  "historySpamBlocks": [
    {
      "spamBlockDate": {
        "$date": "2025-04-04T08:38:00.000Z"
      },
      "spamBlockDays": 1
    }
  ],
  "lazyCheckDate": {
    "$date": "2025-04-20T21:09:46.094Z"
  },
  "username": "tkacheva_related"
},
{
  "_id": {
    "$oid": "67dd2b01f5fa1dc49466c8a1"
  },
  "accountId": "5873066098-prefix-female-casino",
  "dc4": "6d221e6ff1e7fab9d49aee00ba3c2239f9a5468de23d744b9a8f4a7a83632618a172976047513253f6b74694881125d2a95166085bd5698853b6e03bc006db2608bee4b015a711d21de114a2e4138518f97538be433ef4a4e605482770f423cdc6fd0a1c211b39ca17073b56f22c9dea5034ff512d1b8424d363886616f1c55cf50dcbde8e72f65f8e87238d1dee585e43aa80f1bd14ac5467cdba62f6da23db7edd6b2a921bdaf87f619c9795011339abd6dd1ccde590c43b7a27fb2f36a144b5761f3303d81f91c4eb0ef3361d42b9ebda999e80b0d29226a0619c9eb6338fd9c13483f1663b3bd02141b857f6861870c93772695f187c89ed36dd44221a8f",
  "dcId": 4,
  "nextApiId": 2040,
  "dateUpdated": {
    "$date": "2025-04-21T13:12:57.318Z"
  },
  "banned": false,
  "firstName": "Sofia",
  "id": "5873066098",
  "lastName": "Ermakova",
  "messageCount": 55,
  "automaticCheckDate": {
    "$date": "2025-04-21T13:11:32.689Z"
  },
  "remainingTime": {
    "$date": "2025-04-21T14:39:41.077Z"
  },
  "personalChannel": "cAg2hLjpUkkGJphs",
  "personalChannelDate": {
    "$date": "2025-03-29T15:26:12.856Z"
  },
  "lazyCheckDate": {
    "$date": "2025-04-20T21:07:51.560Z"
  },
  "historySpamBlocks": [
    {
      "spamBlockDate": {
        "$date": "2025-04-10T07:53:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-04-24T12:41:00.000Z"
      },
      "spamBlockDays": 3
    }
  ],
  "username": "ermakova_wicked",
  "spamBlockReasons": [
    {
      "reason": "My account has been incorrectly limited. I require full messaging access for essential communication, which is currently not possible. Please review and restore my messaging capabilities.",
      "date": {
        "$date": "2025-04-21T13:12:57.313Z"
      }
    }
  ],
  "spamBlockDate": {
    "$date": "2025-04-24T12:41:00.000Z"
  },
  "spamBlockDays": 3,
  "spamBlockInitDate": {
    "$date": "2025-04-21T13:12:57.318Z"
  }
},
{
  "_id": {
    "$oid": "67dd2b02f5fa1dc49466c8a4"
  },
  "accountId": "6686496824-prefix-female-casino",
  "dc1": "9e662f261aebc9e2a020eb91c76d8fe3e2f8305e1c01b9e0b41d220dafa17710c32685ddca0b26ac661553fa3ce0c81228a2cbadf9d0db223af03b3ac895c27faeeb1571e8ee30168998f7533ae9c70d79269fff9b8c655e6d87769ff742697b41bccb147bd3e9f473c1123378957a74ef241b97edcc0a3f29cdbfcab1edfc64dc7a05b2074a92d14d8400798b9b904e922063d763fa9b0602aac6350ce047311c7b984c9c1c81d7f85124393fcb0401874477d85c1316d3e4c3e69cc9b75b71b40e0a885fa0d6c5a39aa0935a905e385670daa87eab4091db6c137ef3cb7d1574384bd0642c711b35f64af717b7294fb5ef21b4fc05ac253fd95ab554e3f059",
  "dcId": 1,
  "nextApiId": 2496,
  "dateUpdated": {
    "$date": "2025-04-21T13:11:26.571Z"
  },
  "banned": false,
  "firstName": "Elena",
  "id": "6686496824",
  "lastName": "Baranova",
  "messageCount": 37,
  "twoFa": false,
  "twoFaDate": {
    "$date": "2025-04-20T16:06:44.495Z"
  },
  "automaticCheckDate": {
    "$date": "2025-04-21T13:11:26.571Z"
  },
  "remainingTime": {
    "$date": "2025-04-21T12:14:06.975Z"
  },
  "personalChannel": "qZnwqww0ZGMCzgAI",
  "personalChannelDate": {
    "$date": "2025-03-29T15:26:27.378Z"
  },
  "lazyCheckDate": {
    "$date": "2025-04-20T21:51:44.080Z"
  },
  "username": "baranova_yearning"
},
{
  "_id": {
    "$oid": "67dd2b02f5fa1dc49466c8a6"
  },
  "accountId": "1741423952-prefix-female-casino",
  "dc5": "63520249100539c71c0f3db52f2f70042d8b7e093b9935fa6b4cdc06883cc821cfddcb356a89ea47fa6dd93e2380fdae3608a3ccf66ceaed0900208211dcb0bf6c05f187c1f16122e67fe5893f5eb0c524313db76a263b279a733e4bfa996aea208fb111c928105c7bbfff4a8e1e0dda786a1f51cef8c5fac4843458123955d9d39ea8f516c1b2ef459a0dde7fc04fa00033d0cb6ceb0011a7044ee74a6b6e1a1693efbbd2bcbd5bd9f767e378a91111f28dc1a89ab3e3f8ca8714f906a00a82ae7263fb753f0a446eff30bc6dab2cc973213246919b32d485cae55a143683d937a19b71ec6065fd139612a406cc2ba825600dae9d7bdab7eb87e1d99603a8e9",
  "dcId": 5,
  "nextApiId": 2040,
  "dateUpdated": {
    "$date": "2025-04-21T13:14:31.174Z"
  },
  "banned": false,
  "firstName": "Marina",
  "id": "1741423952",
  "lastName": "Chirkova",
  "messageCount": 62,
  "twoFa": false,
  "twoFaDate": {
    "$date": "2025-04-20T20:22:23.084Z"
  },
  "automaticCheckDate": {
    "$date": "2025-04-21T13:14:31.174Z"
  },
  "remainingTime": {
    "$date": "2025-04-21T14:41:51.361Z"
  },
  "personalChannel": "MEeWXhYyzlVRQP9j",
  "personalChannelDate": {
    "$date": "2025-03-29T15:26:34.490Z"
  },
  "lazyCheckDate": {
    "$date": "2025-04-20T21:03:53.184Z"
  },
  "username": "chirkova_detailed"
},
{
  "_id": {
    "$oid": "67dd2b02f5fa1dc49466c8a8"
  },
  "accountId": "5785806846-prefix-female-casino",
  "dc1": "0c9431023d71b28a55e2bb141796e5e6f17f0fa07b0c7cfb458ae5935553ba76a34c5fb1d32d8a2ea8d8260aa699b70fd4438335c31c906486c193cdaa93e9174f0ad200af4d7dbb1fdb0679ed8d40a12d580d75c37bcf2e350a688e779008ca7a92ff1c3e1fd6b0c4982a4011afdc841a86f2f789838cdde335a571329b7f44ea5300de5eb43f8836cd50dbf4b16e82534fbc9474bedc8f6db2de523ad01fb754bc49b217c9154dc679b79ea819b422b1be92e54cc82443e14ff91d1f8ae21d7cdaf41fb034f5502766c34b5c0d1e1add054ccf62e9c29c9366237b624c648fba10592db4b7f1a9de7835c552e8c9f64b965325d7cd04443f022d2b9e03ad63",
  "dcId": 1,
  "nextApiId": 2040,
  "dateUpdated": {
    "$date": "2025-04-21T13:09:31.506Z"
  },
  "banned": false,
  "firstName": "Polina",
  "id": "5785806846",
  "lastName": "Kiseleva",
  "messageCount": 37,
  "automaticCheckDate": {
    "$date": "2025-04-21T13:09:31.506Z"
  },
  "remainingTime": {
    "$date": "2025-04-21T12:39:34.874Z"
  },
  "personalChannel": "tNzqmrrHe1jtxcaZ",
  "personalChannelDate": {
    "$date": "2025-03-29T15:25:07.927Z"
  },
  "historySpamBlocks": [
    {
      "spamBlockDate": {
        "$date": "2025-04-01T10:54:00.000Z"
      },
      "spamBlockDays": 1
    }
  ],
  "lazyCheckDate": {
    "$date": "2025-04-20T20:26:31.454Z"
  },
  "username": "kiseleva_plum"
},
{
  "_id": {
    "$oid": "67dd2b03f5fa1dc49466c8b0"
  },
  "accountId": "7025004578-prefix-female-casino",
  "dc1": "8f59fb05f3fc4e7740226d2e786050684e0296a2234446e88db3f206735f5c1919d913b092400ddc5637222d3b78219c3d040a1a233a2f8ad2027cbcc1eed899b37d572adf90efc5c2b651477ec2256bb365a5c770e6c94d92796471b16e9e073ab63f764712ed3c460bac00cc8a0518cdf1e4f70d97fc61002319b1e595141b0cb9029e70238f58cb8efc9161f7cf32638587ca29750d74ba6ba27d7d50d225e02a52fd51028a5af45cd4fda59195d8a30715b8eb2e0c9665f657f1bfeb7c2f8cba88d76ce43b4c72de63170df1cd6730abffe34f9e27501b5ad9058b455ae9e22925d50e27e17901607b370e36a54256ff0aeaa7db2db95ca8f809ea4ab1d4",
  "dcId": 1,
  "nextApiId": 2496,
  "dateUpdated": {
    "$date": "2025-04-21T13:29:27.647Z"
  },
  "banned": false,
  "firstName": "Galina",
  "id": "7025004578",
  "lastName": "Lobanova",
  "messageCount": 30,
  "twoFa": false,
  "twoFaDate": {
    "$date": "2025-04-20T16:06:43.591Z"
  },
  "automaticCheckDate": {
    "$date": "2025-04-21T13:29:27.647Z"
  },
  "remainingTime": {
    "$date": "2025-04-21T12:10:46.381Z"
  },
  "personalChannel": "WNQkuyBpMqRXQ4tg",
  "personalChannelDate": {
    "$date": "2025-03-29T15:23:00.781Z"
  },
  "lazyCheckDate": {
    "$date": "2025-04-20T20:58:49.803Z"
  },
  "historySpamBlocks": [
    {
      "spamBlockDate": "INFINITY",
      "spamBlockDays": 0
    }
  ],
  "username": "lobanova_vivid"
},
{
  "_id": {
    "$oid": "67dd2b03f5fa1dc49466c8b2"
  },
  "accountId": "7702439947-prefix-female-casino",
  "dc1": "79cb9267c4cdd103e4b24ba7ff879cadb10a7486c2b763b56310885584adc4187e6f772c16656c03bc4363c8ce2dcd1666813976ef65fcefdc726ea40ef5981f8ef858acd08ca0ba05dec3639da46ea9e746a85e9280063f44ae0431604d1217326899e3ea212393f1b628c892822f849a8b0cf76334bd7d1e2b2119579957f27b8d035519e1412369dd9ef1bf8da2bd611b1d874bef2a1236ab026cbea6109f8b998fbab44776b4f5764e55049176d964992334ad5fcd0f7e1d3bd8fec50c072989ccdd7524e09e3e7395514e1857266652c7dad3dd92bf5370398ccb4f2d147de844a32687bf5194e1ce9105a4e427ab174a7749c2dd63e8b548ab5a1d8221",
  "dcId": 1,
  "nextApiId": 2040,
  "dateUpdated": {
    "$date": "2025-04-21T13:10:31.501Z"
  },
  "banned": false,
  "firstName": "Marina",
  "id": "7702439947",
  "lastName": "Belova",
  "messageCount": 32,
  "twoFa": false,
  "twoFaDate": {
    "$date": "2025-03-27T11:45:35.925Z"
  },
  "automaticCheckDate": {
    "$date": "2025-04-21T13:10:31.501Z"
  },
  "remainingTime": {
    "$date": "2025-04-21T11:55:22.232Z"
  },
  "personalChannel": "jG3VqiuoNUVRsEOD",
  "personalChannelDate": {
    "$date": "2025-03-29T15:23:12.713Z"
  },
  "historySpamBlocks": [
    {
      "spamBlockDate": {
        "$date": "2025-03-31T07:03:00.000Z"
      },
      "spamBlockDays": 1
    }
  ],
  "lazyCheckDate": {
    "$date": "2025-04-20T20:49:29.869Z"
  },
  "username": "belova_fast"
},
{
  "_id": {
    "$oid": "67dd2b04f5fa1dc49466c8b9"
  },
  "accountId": "7979095411-prefix-female-casino",
  "dc1": "c61650627c9934992680db7ac352205b090341d0d49d2b7e23ac66f9b0eee2e4150895e4158d6570bb2b6559b4be116412f3587873350ef3c49437548dbed924698c6cf6ee04498e586a48f6d0de6cb9937fbb7e8591451e285253d85472e6dad7e968ae2dcaf4bb4ff44b23507d76308d4396b9ea37f66bc783b2452315b9167e873e58090be8ab8e43e623863a3b0a3f2a7f9a728d4144f5f2f7c8463fe09dd5eb9a2a849314b201b3532a5200d11c8995cf87e4e23136d96b40d082a63a81645049153fd5d20c1f5603fb2b9052c4db6fea95d8f8176f596b852bee250b5b23dbe3ab3cb3fd4d87da7c2e7abc12b0e8e4a0271b5688d07f1c20377cf30084",
  "dcId": 1,
  "nextApiId": 2496,
  "dateUpdated": {
    "$date": "2025-04-21T13:17:26.356Z"
  },
  "banned": false,
  "firstName": "Arina",
  "id": "7979095411",
  "lastName": "Rudakova",
  "messageCount": 35,
  "twoFa": false,
  "twoFaDate": {
    "$date": "2025-04-20T20:22:23.083Z"
  },
  "automaticCheckDate": {
    "$date": "2025-04-21T13:17:26.356Z"
  },
  "remainingTime": {
    "$date": "2025-04-21T14:00:51.902Z"
  },
  "personalChannel": "pjbJBZQ3FtlnlKtX",
  "personalChannelDate": {
    "$date": "2025-03-29T15:27:19.200Z"
  },
  "lazyCheckDate": {
    "$date": "2025-04-20T21:17:48.936Z"
  },
  "username": "rudakova_unnecessary"
},
{
  "_id": {
    "$oid": "67dd2b04f5fa1dc49466c8be"
  },
  "accountId": "6558618316-prefix-female-casino",
  "dc1": "ae86857fa737c977079a226d5e4a1b3a8fcaa71e5fd50a9de48749ebf95982c693851f1cb736b4add4f0295dd84314b9bd633e90a95500534793680b99e60067d958aa8fedb9b44b7cd09c6bf0bac6e886d26d5475bf48c581c3ce590a8044868ced7b1057dba449d93823336332cf58f279145c8c7b5c792d35d81a45e5defd35c77d9182f4bb841bd4558b2ad0778b8f494c73253e940966ef51a4b5c669e2c8f2aeab16d89d1ebcaea9fe9c21143154980d80356e1b0566d7d6e4abd25060bbeefd10da63384e894abc5aea10a90e1526c7627b9bad0a106174eff367e298ada61d50d2d76f619825098f4c6f61dff666159db0e6d0a66dadfa95c5d62aac",
  "dcId": 1,
  "nextApiId": 2496,
  "dateUpdated": {
    "$date": "2025-04-21T13:07:24.371Z"
  },
  "banned": false,
  "firstName": "Valeria",
  "id": "6558618316",
  "lastName": "Sidorova",
  "messageCount": 35,
  "twoFa": false,
  "twoFaDate": {
    "$date": "2025-04-20T20:22:22.905Z"
  },
  "automaticCheckDate": {
    "$date": "2025-04-21T13:07:24.371Z"
  },
  "remainingTime": {
    "$date": "2025-04-21T09:11:37.767Z"
  },
  "personalChannel": "wzmbIo7qHADKJFvy",
  "personalChannelDate": {
    "$date": "2025-03-29T15:23:20.091Z"
  },
  "lazyCheckDate": {
    "$date": "2025-04-20T21:06:47.782Z"
  },
  "username": "sidorova_ltd"
},
{
  "_id": {
    "$oid": "67dd2b05f5fa1dc49466c8c0"
  },
  "accountId": "6528389442-prefix-female-casino",
  "dc1": "a051a4c89edcac9a83c2ea52e4547134bb5600375304c2de0b84b12c01ad065519c8851a8b956e9d2e9cb05dbb4614d24fc1fbb04ade5b40192ea1dad9263680f0275b7ee3ac9203d6787b57d5016d4d1396b49e61af39e61cbce55ce242c798bdd2852a10bcb723c05b0d4967b81fbfa8cc5629fd18e6dba82dff785abe45ed049d1f7aea4bbe1ed8ff92131c77b8b64e0ca1e99a7f160ccaa5f61e9103ae389a509321a649198011b8455a9f93992945b3435b0c13935ddf785c9373137f151af3a8940231199b0d9ee40af4974e806b68d11837a69fadbdf2c2f950c5ecb7a5fb3f32fb4ef9435bf2e4ccfd7f5dfdbfd346dc403a247fdf31f90bcd259f19",
  "dcId": 1,
  "nextApiId": 2496,
  "dateUpdated": {
    "$date": "2025-04-21T13:06:26.600Z"
  },
  "banned": false,
  "firstName": "Tatiana",
  "id": "6528389442",
  "lastName": "Nechayeva",
  "messageCount": 37,
  "twoFa": false,
  "twoFaDate": {
    "$date": "2025-04-20T20:22:21.440Z"
  },
  "automaticCheckDate": {
    "$date": "2025-04-21T13:06:26.600Z"
  },
  "remainingTime": {
    "$date": "2025-04-21T12:48:03.904Z"
  },
  "personalChannel": "CqVJmquqFGgbcA5H",
  "personalChannelDate": {
    "$date": "2025-03-29T15:24:10.116Z"
  },
  "lazyCheckDate": {
    "$date": "2025-04-20T20:59:42.155Z"
  },
  "username": "nechayeva_spotty"
},
{
  "_id": {
    "$oid": "67dd2b05f5fa1dc49466c8c5"
  },
  "accountId": "5411898526-prefix-female-casino",
  "dc1": "b80bad619bcecdaf4c386ffad3b37695b9fbf17da73aa64156e18803811ac525630d24c27ed102cef05ef3a134f736a5e4d356d12f4111f6331a1558f1f21fc17130b02a7072cd6489f7e997a374ea1a27e325f85ce1825eee12ca4d53d0bfa5c80d36ea2110a89110a38d5e1daca276f75460be2572966334051d67b9a47fee2a6e718cefe739bb6c2d7e75902c5cdbbf75fd8b6fb291eb0b8e27669d8fb9d2d1ed4e84f5a4fd4f15dcb1b7da28ee5d05d18e3ba4f91b35eb8c3ecdf1321e51bd24efe2de01b415068049f81e57508e98b310f50d0d049ca7e7adbe55133af7f540829f82ad4584e4d342578db74e7752b1599c6e449df6ab4423fd1b4fbce6",
  "dcId": 1,
  "nextApiId": 2040,
  "dateUpdated": {
    "$date": "2025-04-21T21:49:54.684Z"
  },
  "banned": false,
  "firstName": "Yulia",
  "id": "5411898526",
  "lastName": "Trifonova",
  "messageCount": 25,
  "twoFa": false,
  "twoFaDate": {
    "$date": "2025-04-20T20:22:21.880Z"
  },
  "automaticCheckDate": {
    "$date": "2025-04-21T21:49:54.684Z"
  },
  "remainingTime": {
    "$date": "2025-04-21T10:53:38.882Z"
  },
  "personalChannel": "kBbVxFRKnUxaL7Ro",
  "personalChannelDate": {
    "$date": "2025-03-29T15:25:49.586Z"
  },
  "historySpamBlocks": [
    {
      "spamBlockDate": {
        "$date": "2025-03-31T07:02:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-04-04T05:39:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-04-07T09:24:00.000Z"
      },
      "spamBlockDays": 3
    }
  ],
  "lazyCheckDate": {
    "$date": "2025-04-21T21:49:54.462Z"
  },
  "username": "trifonova_junior"
},
{
  "_id": {
    "$oid": "67dd2b06f5fa1dc49466c8cc"
  },
  "accountId": "6338963633-prefix-female-casino",
  "dc1": "9aa6ea927e4fa2519f54c8c2ed3b3b4d5ec49ed47040753d8a0cc5b3d0687bb3aaad738eebcfa8ff1bc7be17105a0aae2b66e03088dd1edbac9c3f5e1bea64c93144405b81c0f0a658d0fb7f48dad28321a39726e501cb89ecf5c059971547d38019b8028e8238f7bc544bba9585a5eb36f3fcbc1f9ddb61266b670a39f504d3dad80542426f5d55d5666ccc2816e638982385c413c9a533e9327ddef3872f8227e4a5e14f2f8e9127da4bb3317767530890c77d4afb1694d594fa760a354343e6d7fc4aeb79d300cfe19582a68b08982470389e27612fe5b0c6c111b50320c130754372fb608db2dffab78dd448ef246306f38e361da99a2e0a67ba7de3bb19",
  "dcId": 1,
  "nextApiId": 2040,
  "dateUpdated": {
    "$date": "2025-04-21T13:29:28.407Z"
  },
  "banned": false,
  "firstName": "Lubov",
  "id": "6338963633",
  "lastName": "Shevchukova",
  "messageCount": 43,
  "twoFa": false,
  "twoFaDate": {
    "$date": "2025-04-20T20:22:21.611Z"
  },
  "automaticCheckDate": {
    "$date": "2025-04-21T13:29:28.407Z"
  },
  "remainingTime": {
    "$date": "2025-04-21T14:49:42.174Z"
  },
  "personalChannel": "nVzwhdS9yuylgYIZ",
  "personalChannelDate": {
    "$date": "2025-03-29T15:22:34.390Z"
  },
  "historySpamBlocks": [
    {
      "spamBlockDate": "INFINITY",
      "spamBlockDays": 0
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-31T23:34:00.000Z"
      },
      "spamBlockDays": 1
    }
  ],
  "lazyCheckDate": {
    "$date": "2025-04-20T20:24:30.401Z"
  },
  "username": "shevchukova_real"
},
{
  "_id": {
    "$oid": "67dd2b06f5fa1dc49466c8ce"
  },
  "accountId": "6378026703-prefix-female-casino",
  "dc1": "1553a2952ccded9284b78928078be2ec54ca8cc7232e81bd5224d6b49d657e35515a2a97c5cacc16129710008d10ca45a4d39cd3d89e0803956fb99e8fcee5e13aac2da647500b3008abf519c18b11f9f3c8391e1ba62ea8bb33b0407efb5445e421c6b3511d0af5428e70d78fb14a275b0a0b46f6362e3be92e5f38609914d8089b93d788e73007ece562efb55917c07995f3f4ad3954957627f90078b9ccb152ae27a690d1b1bf3849f014a55c835106fe4e0fe68d8850b0b1060e50e41a3398b466734d2663859b08da5b757b4b1de9de95991d211fd36ba93db32074568cd07f3e9cf83bd550cb923905a73e59f44f38da8d943cd710f3246a1b52d090cd",
  "dcId": 1,
  "nextApiId": 2040,
  "dateUpdated": {
    "$date": "2025-04-21T13:29:27.200Z"
  },
  "banned": false,
  "firstName": "Galina",
  "id": "6378026703",
  "lastName": "Ustinova",
  "messageCount": 36,
  "twoFa": false,
  "twoFaDate": {
    "$date": "2025-04-20T20:22:19.134Z"
  },
  "automaticCheckDate": {
    "$date": "2025-04-21T13:29:27.200Z"
  },
  "remainingTime": {
    "$date": "2025-04-21T11:59:34.443Z"
  },
  "personalChannel": "bokHYWAK7KUTdiDg",
  "personalChannelDate": {
    "$date": "2025-03-29T15:25:10.354Z"
  },
  "historySpamBlocks": [
    {
      "spamBlockDate": {
        "$date": "2025-04-05T11:35:00.000Z"
      },
      "spamBlockDays": 1
    }
  ],
  "lazyCheckDate": {
    "$date": "2025-04-20T21:19:46.931Z"
  },
  "username": "ustinova_final"
},
{
  "_id": {
    "$oid": "67dd2b06f5fa1dc49466c8d3"
  },
  "accountId": "7073592617-prefix-female-casino",
  "dc1": "2f458aef81839f31476e63abfb94ff5ba36f53ac54de153854f38e430e9585cd4a552b182307630ac72a04ca005987b6482bd500591cf7fe0f70c45ed4efd6c7530e69d7ecd646e0758a665f8aa0643f8053c981bf051299e384d09fe99d51751c2b5fa5269fdbca4e55ad266299088197df6bd2b322ece0f7d3c603fc0dcb1ec0ad474d2ada7e4ea22f0dac5e6b304cb6b545074c12da8b657ef263fa22b7f09851a5a6c6fb11466a40300a6b2db1c8538bb8d3dea79093a85e88c8be59f12e2a594f34ccb86eb224461d7798974efc45889ca33e301d4acb561e954c0484be74ed302c60f39bd09ab205afa02e30e303b9662daa9030a5d65bfc39a9b19244",
  "dcId": 1,
  "nextApiId": 2496,
  "dateUpdated": {
    "$date": "2025-04-21T13:30:27.790Z"
  },
  "banned": false,
  "firstName": "Olga",
  "id": "7073592617",
  "lastName": "Gorshkova",
  "messageCount": 18,
  "twoFa": false,
  "twoFaDate": {
    "$date": "2025-04-20T20:22:21.100Z"
  },
  "automaticCheckDate": {
    "$date": "2025-04-21T13:30:27.790Z"
  },
  "remainingTime": {
    "$date": "2025-04-21T07:02:28.980Z"
  },
  "personalChannel": "INGZA6wiLhfcTRqj",
  "personalChannelDate": {
    "$date": "2025-03-29T15:24:44.023Z"
  },
  "lazyCheckDate": {
    "$date": "2025-04-20T20:35:29.342Z"
  },
  "username": "gorshkova_stingy"
},
{
  "_id": {
    "$oid": "67dd2b07f5fa1dc49466c8d5"
  },
  "accountId": "6368498096-prefix-female-casino",
  "dc1": "c4021917fd548d71d6e9f5634d744bea6d1d511840b5c6e2afde8ea27466fa1b84af5a55f186bbec8203aeeed17a13586327b21e1780bc014ef58c8008edee8ba4e7f708c9f5e03612cc44180fc3ddc94382b62f4d5fcc68aa6f75b33e41dfc74295b2909d7ed3145837496256047019d8b95d6ccae341a089f84a786c082dbe938559972feb2a1ebc53d7d0376668cb0d2c88c4a4f43433bd77a9e6e7e3aa68accbdad224c578bd6f3c0aab882207334a26984a512ee18c354bc2232aac42823a8e017f40e49d773d840743cbb38ebdf7adb0990dc72ff5613426bd4bf15e1be0f1de792be9bd65dfb71a6703828bd1fdb14fcc29da4bbe470bfd101b4e0902",
  "dcId": 1,
  "nextApiId": 2496,
  "dateUpdated": {
    "$date": "2025-04-21T21:53:54.941Z"
  },
  "banned": false,
  "firstName": "Irina",
  "id": "6368498096",
  "lastName": "Rusanova",
  "messageCount": 19,
  "twoFa": false,
  "twoFaDate": {
    "$date": "2025-04-20T20:22:21.120Z"
  },
  "automaticCheckDate": {
    "$date": "2025-04-21T21:53:54.941Z"
  },
  "remainingTime": {
    "$date": "2025-04-21T07:35:08.233Z"
  },
  "personalChannel": "rBvrXj9kwqjwsKGl",
  "personalChannelDate": {
    "$date": "2025-03-29T15:22:30.468Z"
  },
  "historySpamBlocks": [
    {
      "spamBlockDate": {
        "$date": "2025-04-05T05:21:00.000Z"
      },
      "spamBlockDays": 1
    }
  ],
  "lazyCheckDate": {
    "$date": "2025-04-21T21:53:54.642Z"
  },
  "username": "rusanova_amused"
},
{
  "_id": {
    "$oid": "67dd2b07f5fa1dc49466c8dd"
  },
  "accountId": "7009425909-prefix-female-casino",
  "dc1": "c25ec33f9c666738fe9b6f96816b858a264d00b7478b51aececd687ec9bd2a6772ecc868e46e31241e72120d83becab826a8f295484b8706aa560c7fdf443578e98243c0328d22c7194aa8ec6c61b592658a5443382c002f0c1b2aab2cb7461acc14fb2cf4f336e3d4a8d5706e1ccab12b0a4114a96cbc501a800e448ac3287bb3042bb687085697b59e3288cba3b9cc3f1cd5f6c4d909a3021f1c2f39f121a44c49e1bddaa18234f1546f2e5291ea1b54580e15d59de10231d7910afd56c1e644e4b56beea5a1de71e57ca79f0076c653c57968e1991250a9feaed447996da622db7c04d33652ebb9da2fd7afb4666d2aee71bfc6bfc88254e348428c2a408f",
  "dcId": 1,
  "nextApiId": 2496,
  "dateUpdated": {
    "$date": "2025-04-21T21:48:55.177Z"
  },
  "banned": false,
  "firstName": "Mira",
  "id": "7009425909",
  "lastName": "Gromova",
  "messageCount": 17,
  "twoFa": false,
  "twoFaDate": {
    "$date": "2025-04-20T16:06:43.840Z"
  },
  "automaticCheckDate": {
    "$date": "2025-04-21T21:48:55.177Z"
  },
  "remainingTime": {
    "$date": "2025-04-21T07:41:21.746Z"
  },
  "personalChannel": "FXlW4NxgBmnVaDEl",
  "personalChannelDate": {
    "$date": "2025-03-29T15:24:22.207Z"
  },
  "lazyCheckDate": {
    "$date": "2025-04-21T21:48:54.862Z"
  },
  "username": "gromova_crude"
},
{
  "_id": {
    "$oid": "67dd2b07f5fa1dc49466c8e2"
  },
  "accountId": "6083513530-prefix-female-casino",
  "dc1": "620c825eca17a9ea32c686541a8bd69689cadd538ae6e2308c06204010ed2269dff5bbe07723759b22e16cf84c9520fdb5c20e6a0db25104be02895713f8aeb6b394a968df8e17ec35e297c85d8d345bb542f2b63d0f9fea6b5baf8a3ad90668a5b043cd1f24f409bf1ec705401d21f8a7fd0f3e500492b1f2492e606119287bd66462021678b3efa2430b6c8139c640bbce4b484e1f1d642bd6e97559cec1bef45bafe17711aa128b533e0f58333452618472d41d6bbcb06105636f36acf239c226b9a0e4c05c769ddff4a213aea3254fff370a16ae167927eca6c640f7487ce3289451e35f031de981a7836ae5d2bf6ff7907fdf13046319d8d978c8416ba8",
  "dcId": 1,
  "nextApiId": 2040,
  "dateUpdated": {
    "$date": "2025-04-21T13:19:27.994Z"
  },
  "banned": false,
  "firstName": "Lubov",
  "id": "6083513530",
  "lastName": "Lobanova",
  "messageCount": 22,
  "twoFa": false,
  "twoFaDate": {
    "$date": "2025-04-20T20:22:21.619Z"
  },
  "automaticCheckDate": {
    "$date": "2025-04-21T13:19:27.994Z"
  },
  "remainingTime": {
    "$date": "2025-04-21T07:00:37.391Z"
  },
  "personalChannel": "CQjJnJiWdAFVT7vP",
  "personalChannelDate": {
    "$date": "2025-03-29T15:22:31.580Z"
  },
  "lazyCheckDate": {
    "$date": "2025-04-20T20:44:30.551Z"
  },
  "username": "lobanova_zealous"
},
{
  "_id": {
    "$oid": "67dd2b08f5fa1dc49466c8e5"
  },
  "accountId": "6052338324-prefix-female-casino",
  "dc1": "20e9ebf790169c486a0fb2a25a7aa29e60b2d771941f061714df1c84e4dca23d912269aea11277dd6570ce4a4244fdcf40c7c0b09bbbc9e9df55a400d6b8eab50820e14d34223047574cb749e21e124ee244f9cbceaaa4cce7091aafe692e269d6f2510b38e274231e5caded1c844e0e01089da8d8292cd77b4de347397b595a27980a7993dd956ae311c5922eb4a4bc6ff472343c493b5eb4abb53aece0eb988efabb6db995b3a44aa718f4f149a8126198d6c8ec5200910b0509edacca8cd6a776f8de0bf15f2ec93ffc21111de9f254829cfd0cced373755ab415f02194d14176d390455b377162fd0fadc71355395aa4dbf32632db571c354de046bd140e",
  "dcId": 1,
  "nextApiId": 2496,
  "dateUpdated": {
    "$date": "2025-04-21T13:22:28.713Z"
  },
  "banned": false,
  "firstName": "Nina",
  "id": "6052338324",
  "lastName": "Orlova",
  "messageCount": 19,
  "twoFa": false,
  "twoFaDate": {
    "$date": "2025-04-20T20:22:22.131Z"
  },
  "automaticCheckDate": {
    "$date": "2025-04-21T13:22:28.713Z"
  },
  "remainingTime": {
    "$date": "2025-04-21T07:11:09.982Z"
  },
  "historySpamBlocks": [
    {
      "spamBlockDate": {
        "$date": "2025-03-30T05:35:00.000Z"
      },
      "spamBlockDays": 1
    }
  ],
  "personalChannel": "zMimJJZwRzw9uDnW",
  "personalChannelDate": {
    "$date": "2025-03-29T15:24:41.334Z"
  },
  "lazyCheckDate": {
    "$date": "2025-04-20T21:04:49.245Z"
  },
  "username": "orlova_oral"
},
{
  "_id": {
    "$oid": "67dd2b08f5fa1dc49466c8e8"
  },
  "accountId": "5380721710-prefix-female-casino",
  "dc1": "42dab4dac75e5b567bdc1912bc43aaad187989d28df0089946f2779324fd028a91432df2efccad59e4fb934cc04a37a33d5c5dfddc54373be71bab6b40784f01aea0fc709c4468cda45f45d9e11b9fe5ccc4b3787ce4ccb58149eab6d870a427f72c5bab5629f00650dd1b56ed0af7645e009b666044a723d721b93aa498e86c7320c569de1191c34dd1717fe454a6f84bbf1bde63f701ea973624afb81e7dd5aaea90341973f2929edb8a285fad76461e91489ab2078706a970c01ab59d5aeac3b10eaf6697f69d106c9d35744155ed011181259fa5f6076a064ce0576047ebcd11b244446ea21b1e0196a0ed856b748cf1e855399f78d5ed4460790c1d0385",
  "dcId": 1,
  "nextApiId": 2040,
  "dateUpdated": {
    "$date": "2025-04-21T13:06:31.038Z"
  },
  "banned": false,
  "firstName": "Polina",
  "id": "5380721710",
  "lastName": "Eroshkina",
  "messageCount": 19,
  "twoFa": false,
  "twoFaDate": {
    "$date": "2025-04-05T10:19:51.280Z"
  },
  "automaticCheckDate": {
    "$date": "2025-04-21T13:06:31.038Z"
  },
  "remainingTime": {
    "$date": "2025-04-21T07:06:34.987Z"
  },
  "personalChannelDate": {
    "$date": "2025-03-29T21:33:50.862Z"
  },
  "personalChannel": "baizrsqdQK8rXVHb",
  "historySpamBlocks": [
    {
      "spamBlockDate": {
        "$date": "2025-04-05T10:31:00.000Z"
      },
      "spamBlockDays": 1
    }
  ],
  "lazyCheckDate": {
    "$date": "2025-04-20T20:44:31.395Z"
  },
  "username": "eroshkina_hon"
},
{
  "_id": {
    "$oid": "67dd2b08f5fa1dc49466c8eb"
  },
  "accountId": "5202105936-prefix-female-casino",
  "dc1": "abc4467d3303d6765cd1c3327a9565188acc7f4c2cafe5eaa93fbe803ca18afc0b643da13349e1b3e0ea342b0ef0b9018344e222c445d0861721a3acf27f105ae9b70e3fe4e807451e30cf1670e57fc9000809a7cdfb24bcf9f8afe889e47b4fe64a7217af2da0c3b2790bed3c92b883a968a79fe0dd4d3bb1b0ed25b6a2f5a2aaa088d4fd9e37531d891c9d997d89be23fea90144cde182ab88dd60223fa4ee4f7ee772ce558dc32ab73fecbeda019607d99f5b30b61ac7ddcab806b4f76b8faa3bd3adad0e8978ca5dbf60f1b23ae1473c422317d6c8b8397d54d7aa00fa17f3cffd1f783526db4083fd20fd48e33495b1ff85bd25d029d4cb59a180324cfc",
  "dcId": 1,
  "nextApiId": 2040,
  "dateUpdated": {
    "$date": "2025-04-21T21:55:57.373Z"
  },
  "banned": false,
  "firstName": "Galina",
  "id": "5202105936",
  "lastName": "Ilyina",
  "messageCount": 17,
  "twoFa": false,
  "twoFaDate": {
    "$date": "2025-04-20T16:06:44.411Z"
  },
  "automaticCheckDate": {
    "$date": "2025-04-21T21:55:57.372Z"
  },
  "remainingTime": {
    "$date": "2025-04-21T07:11:21.585Z"
  },
  "personalChannel": "SwX0WoSkFBrJmCqs",
  "personalChannelDate": {
    "$date": "2025-03-29T15:24:21.281Z"
  },
  "lazyCheckDate": {
    "$date": "2025-04-21T21:55:56.767Z"
  },
  "username": "ilyina_strong"
},
{
  "_id": {
    "$oid": "67dd2b08f5fa1dc49466c8ee"
  },
  "accountId": "6879212220-prefix-female-casino",
  "dc1": "03091c782ef32d16add74ecc923c8212a65f0e8de3b99f5aac9130fb24d88bcd84d756d150216b4451ac8165cb090f94ccd6f8ea4bf4701899f26bbdd6aabbfc463a98e12a93ff7d8a07eb5f436016dbf1e93d76f82c12b675ac64a89d8ae55579714e1acc31b5600798cc0f24f08735bd68088b8321b4c04dd356d848e110976b94c2aabe244b5ad26704703404eef877b6fc08b89bc6bd67fb2bd7048fe43dcdb096968426c3232b01dab370783ebe2fb227e1ac49490b5d5cd1fb8a03281f0fd1d8567874790f24bdba363ad29d709c322cfe0999a03fa94f9c0e4d3580482f09a9025bb230bc55f48a3efa0a8dd2db944fd296321503f5f15ae1303610a1",
  "dcId": 1,
  "nextApiId": 2040,
  "dateUpdated": {
    "$date": "2025-04-21T13:12:27.892Z"
  },
  "banned": false,
  "firstName": "Nina",
  "id": "6879212220",
  "lastName": "Volkova",
  "messageCount": 17,
  "twoFa": false,
  "twoFaDate": {
    "$date": "2025-04-20T20:22:20.988Z"
  },
  "automaticCheckDate": {
    "$date": "2025-04-21T13:12:27.892Z"
  },
  "remainingTime": {
    "$date": "2025-04-20T14:48:44.048Z"
  },
  "personalChannel": "iBuHQtDCecT5ighR",
  "personalChannelDate": {
    "$date": "2025-03-29T15:25:59.912Z"
  },
  "lazyCheckDate": {
    "$date": "2025-04-20T21:22:45.892Z"
  },
  "username": "volkova_quiet",
  "spamBlockReasons": [
    {
      "reason": "Id like to request the restoration of my messaging feature as I believe it was mistakenly restricted. Ive never been involved in any suspicious activity.",
      "date": {
        "$date": "2025-04-20T18:02:29.562Z"
      }
    }
  ],
  "historySpamBlocks": [
    {
      "spamBlockDate": {
        "$date": "2025-04-21T17:45:00.000Z"
      },
      "spamBlockDays": 1
    }
  ],
  "spamBlockDate": {
    "$date": "2025-04-21T17:45:00.000Z"
  },
  "spamBlockDays": 1,
  "spamBlockInitDate": {
    "$date": "2025-04-20T18:02:29.567Z"
  }
},
{
  "_id": {
    "$oid": "67dd2b09f5fa1dc49466c8f6"
  },
  "accountId": "6144693484-prefix-female-casino",
  "dc1": "679fc50bf1ff271464b65f2b01d1e5579ed1e41c83304c93ab005c48c34c403ce31bfe183ba1b16a44732363d8e216c299d0f73b9f1f2c092b4bd771c81e0e24a217832758b6bfa336fcf8228d66bd4de68d96045ae9259266597c33d53cf876a61ec609e027c1ad36439664292cb98d89dec00e86bdc4d2100eb4799308500afca3cbb93e1a17634a2f245bb51ca5154b39320bc02c189c00676c23ebc0eeff3dd7ef333e0f0b29a8a073487869305d844a162de323838e8b8e9d9c0b0e930323e0de6b8f30fd8b3c35c9bb09f2089bfa018f18dfa4fa33d355666213189c0587b0e3b77b9964753e29614fc8c667900952581561cea96cc661f2d548a1f249",
  "dcId": 1,
  "nextApiId": 2496,
  "dateUpdated": {
    "$date": "2025-04-21T13:27:30.267Z"
  },
  "banned": false,
  "firstName": "Elena",
  "id": "6144693484",
  "lastName": "Smirnova",
  "messageCount": 19,
  "twoFa": false,
  "twoFaDate": {
    "$date": "2025-04-20T20:22:21.992Z"
  },
  "automaticCheckDate": {
    "$date": "2025-04-21T13:27:30.267Z"
  },
  "remainingTime": {
    "$date": "2025-04-21T07:08:29.115Z"
  },
  "personalChannel": "RcCruVDkEV1wgugD",
  "personalChannelDate": {
    "$date": "2025-03-29T15:22:30.008Z"
  },
  "lazyCheckDate": {
    "$date": "2025-04-20T20:50:30.744Z"
  },
  "historySpamBlocks": [
    {
      "spamBlockDate": "INFINITY",
      "spamBlockDays": 0
    }
  ],
  "username": "smirnova_homeless"
},
{
  "_id": {
    "$oid": "67dd2b09f5fa1dc49466c8fc"
  },
  "accountId": "7006405815-prefix-female-casino",
  "dc1": "7fd858bcd3237271becadf012973e3fb40629b2c351f3a4bdb67a70dc7cc8502f94b2b5a9cb8f72682e40b68ac91ecdd68ac42ac3b6b6ed1f20271d77a123db89d66a7f7736cdc01a91b0917cc47bb4ad29a3c786fffd5d945ada163f8d0eaf890bc76895f3446af3a54a9980750223d76ab1f484701c80ecc5280e1e8b803803f1f0a064400a2b01605bc4366fbedb5af317232a06743e67e791b6540e92687925be90be0d6caec83bc6cd5cbf4afda3041e5e2ae0f508bbbb02c13b2651ba75f89b2853a87b6c68925b7a0b215d3fe1b8522e2e6f7d824ad1c3513a94f0d76c3306ee0e671b42e691edf3b52fa5c6d4fd322f7ecdc6ed8c5f821363e618848",
  "dcId": 1,
  "nextApiId": 2040,
  "dateUpdated": {
    "$date": "2025-04-21T13:23:28.439Z"
  },
  "banned": false,
  "firstName": "Alla",
  "id": "7006405815",
  "lastName": "Malakhova",
  "messageCount": 39,
  "twoFa": false,
  "twoFaDate": {
    "$date": "2025-04-20T16:06:43.801Z"
  },
  "automaticCheckDate": {
    "$date": "2025-04-21T13:23:28.439Z"
  },
  "remainingTime": {
    "$date": "2025-04-21T12:12:13.165Z"
  },
  "personalChannel": "jp1vfEHCmJoesjuS",
  "personalChannelDate": {
    "$date": "2025-03-29T15:23:53.327Z"
  },
  "lazyCheckDate": {
    "$date": "2025-04-20T20:25:28.609Z"
  },
  "username": "malakhova_interested"
},
{
  "_id": {
    "$oid": "67dd2b09f5fa1dc49466c900"
  },
  "accountId": "5533546911-prefix-female-casino",
  "dc1": "756f76bd75534c5975eb8dc95b269b8429bb9a65268dd1cfb534d767d860f938c9c258e2dec971dc840a2717650bfe28d62a3628a04e49bfdd1446932e12005f4cd1cc2b18d54f66aaac1b90bb78195b6e4ea3ff32a8b1a83443121289d739dd157745159cf7bf3baf4b91c0ab23ebc1f56c87226f2c3025578076b3bb0367ac87ddf9d61d2a81b633c9370dd13fc29b5a0eeb7471475b89bac8ace0a72673e8601a4885fbed9af17e8e59ff90a7334c97d4b2f7f3a162e9ce5c5d87018d3a752e07631eec36d1891ac24d6aaa905563099459ae65f380126fa7f6149e534d919db2c7428e591190a1d51a9ced3031215746512b64a9cab99fd43fbcf9d1c408",
  "dcId": 1,
  "nextApiId": 2040,
  "dateUpdated": {
    "$date": "2025-04-21T21:50:55.155Z"
  },
  "banned": false,
  "firstName": "Nina",
  "id": "5533546911",
  "lastName": "Dubrovina",
  "messageCount": 20,
  "twoFa": false,
  "twoFaDate": {
    "$date": "2025-04-20T16:06:43.313Z"
  },
  "automaticCheckDate": {
    "$date": "2025-04-21T21:50:55.155Z"
  },
  "remainingTime": {
    "$date": "2025-04-21T07:48:53.528Z"
  },
  "personalChannel": "jBdOACbV2GbbOXJF",
  "personalChannelDate": {
    "$date": "2025-03-29T15:23:23.712Z"
  },
  "lazyCheckDate": {
    "$date": "2025-04-21T21:50:54.874Z"
  },
  "username": "dubrovina_substantial"
},
{
  "_id": {
    "$oid": "67dd2b0af5fa1dc49466c906"
  },
  "accountId": "6827104286-prefix-female-casino",
  "dc1": "6f87678c3141c2128625a74b77a37ab6768906c315990cafe908983249c5ce9d3f4a0817598c618072c820d1fe9bbc07bfaafb8a707c8dddef80e9aeaf5746f80fc0304f74871cdb70ee5ef707e57d3a17d3384b902c3f8460b5672d0b33b57532e3db4552b48118e2c474beaafabf8e56a911a8459d0c8427f3bdd837fb80c1d2f80bced6d53c3a994fbed70c6ee979349f22f21aa8d67981053bb25c4993d4d74e0046601bfcfd19519c6d3c26a60a467a6f14802ac046e394cef22b3f1a1b45f6f95e54ef30a4c38ec464a0edec4f1b0c906d44f796dbbd7adae40e477ef3b9d1d32ec9cc788e2640d9a759d0872f20abf36dea673b88b47df08045db3941",
  "dcId": 1,
  "nextApiId": 2040,
  "dateUpdated": {
    "$date": "2025-04-21T13:21:27.909Z"
  },
  "banned": false,
  "firstName": "Galina",
  "id": "6827104286",
  "lastName": "Sidorova",
  "messageCount": 18,
  "twoFa": false,
  "twoFaDate": {
    "$date": "2025-04-20T20:22:22.102Z"
  },
  "automaticCheckDate": {
    "$date": "2025-04-21T13:21:27.909Z"
  },
  "remainingTime": {
    "$date": "2025-04-21T07:11:40.308Z"
  },
  "personalChannel": "XOLzCpzjHC0CeEti",
  "personalChannelDate": {
    "$date": "2025-03-29T15:25:50.578Z"
  },
  "lazyCheckDate": {
    "$date": "2025-04-20T20:39:30.617Z"
  },
  "username": "sidorova_lexical"
},
{
  "_id": {
    "$oid": "67dd2b0bf5fa1dc49466c90b"
  },
  "accountId": "7186753832-prefix-female-casino",
  "dc1": "316f702d041a587ed7f3495d6516733449c0e82e3a2588b1957d83fc92fed0805290d8c7f6f1fa4d0afc4d906017ba0a80d79d9d018d3a7f92ca1dc97e36f216dc29c000c03401a95b45d9c33548a629e981b6fef862f883927e252c3a7bea7547f526dcda4e8c42e0801fc56c087d64a195416b0e0cea80178f8c55577275299ff44eac6e335d48adfa3bd7ea193378125a94faf617eadd51588af1364a2db24200a43fe946b318fbb991e807df11b38a58879c0067d7f86606a57aa8bbca229302c8666073333b6eccfd4a7a1db0a84b213dd3bbd2c9286897e9ba403b3e45ed5ec3786901abdc3586ba334abb47b59a5fa17385a956b2dacbb93419470da4",
  "dcId": 1,
  "nextApiId": 2040,
  "dateUpdated": {
    "$date": "2025-04-21T13:09:27.562Z"
  },
  "banned": false,
  "firstName": "Sofia",
  "id": "7186753832",
  "lastName": "Ignatova",
  "messageCount": 31,
  "twoFa": false,
  "twoFaDate": {
    "$date": "2025-04-20T16:06:55.743Z"
  },
  "automaticCheckDate": {
    "$date": "2025-04-21T13:09:27.562Z"
  },
  "remainingTime": {
    "$date": "2025-04-21T12:11:15.588Z"
  },
  "personalChannel": "XZstGBeCC4CogHZs",
  "personalChannelDate": {
    "$date": "2025-03-29T15:25:47.147Z"
  },
  "lazyCheckDate": {
    "$date": "2025-04-20T21:13:51.410Z"
  },
  "username": "ignatova_curved"
},
{
  "_id": {
    "$oid": "67dd2b0bf5fa1dc49466c90e"
  },
  "accountId": "1928209772-prefix-female-casino",
  "dc4": "9ff18c1aaa12a964ef1ae8049afd1304af4e8c8dbd17e4f2c9e4c87ee09ab6d955998caf9f1e85a1b4d47e83f70181154b89c573a467aa1a69bd80063416aa9149e3c8f699516eab1d18e096ac9e90030301a60458226c3305d47be2683a562a1ab2e98fb5528222e532328c1b43b2014d51545bfb4ee60e4311efc1caa10aeb49a27b7ef1a4e280d8137dc6388a0486e718fb007f9ad84c5916ac96b3f5e3829c77c123bf3c114f8c6e0f27f3d30f03d5ad60f81a85d6424ff93b40c00568e44620b3fdee9c67cd68f51e883b64acff6ad61794194b9b8d04d30b1413b36e973eebd0e3361af966e8406534ea30bcc95207ddeaea00c4832badbe080350c691",
  "dcId": 4,
  "nextApiId": 2040,
  "dateUpdated": {
    "$date": "2025-04-21T13:22:28.079Z"
  },
  "banned": false,
  "firstName": "Galina",
  "id": "1928209772",
  "lastName": "Abramova",
  "messageCount": 36,
  "twoFa": false,
  "twoFaDate": {
    "$date": "2025-04-20T16:06:43.568Z"
  },
  "automaticCheckDate": {
    "$date": "2025-04-21T13:22:28.079Z"
  },
  "remainingTime": {
    "$date": "2025-04-21T07:47:17.165Z"
  },
  "personalChannel": "LOzxIuSqESQVCN6e",
  "personalChannelDate": {
    "$date": "2025-03-29T15:25:14.753Z"
  },
  "historySpamBlocks": [
    {
      "spamBlockDate": {
        "$date": "2025-04-04T12:47:00.000Z"
      },
      "spamBlockDays": 1
    }
  ],
  "lazyCheckDate": {
    "$date": "2025-04-20T21:49:45.020Z"
  },
  "username": "abramova_red"
},
{
  "_id": {
    "$oid": "67dd2b0bf5fa1dc49466c910"
  },
  "accountId": "6782264884-prefix-female-casino",
  "dc1": "2d2cc4e83971ef1a008e5cf275d924e85080ee663b24b7f383d8b93caf9ce8f74e671b3ad4799dfcfbba62ca93e83e0fd7ea33780e62ca96685e203671295c15beb3d1629dfee12938e602e724cba7f7bbfccaa92d3042a60018b848b46360c04bc27ee1c792b7f7c78167d23ad160f17c11ba43a050d586182265e6554740f0459549b52b9957794c2571be51c958be9a473993bb7d238567d483edf7570bb7b5249516db8745bfbd4c36eba489bf475bef7186cbb7a20bc7a0c400b779ad932562061c0d266eab169ccb97da54888ec277a80c93e99c95eccf6c8c90948cdd5d2ce707065a7e23d6b450446e37464f5f88de1133ede484c144c64853e188e9",
  "dcId": 1,
  "nextApiId": 2040,
  "dateUpdated": {
    "$date": "2025-04-21T13:26:28.436Z"
  },
  "banned": false,
  "firstName": "Ekaterina",
  "id": "6782264884",
  "lastName": "Kozlova",
  "messageCount": 32,
  "twoFa": false,
  "twoFaDate": {
    "$date": "2025-04-20T20:22:20.987Z"
  },
  "automaticCheckDate": {
    "$date": "2025-04-21T13:26:28.436Z"
  },
  "remainingTime": {
    "$date": "2025-04-21T07:37:40.419Z"
  },
  "personalChannel": "SAUgkP2xvDcxFJgO",
  "personalChannelDate": {
    "$date": "2025-03-29T15:27:00.387Z"
  },
  "lazyCheckDate": {
    "$date": "2025-04-20T21:23:48.770Z"
  },
  "username": "kozlova_yearning"
},
{
  "_id": {
    "$oid": "67dd2b0cf5fa1dc49466c913"
  },
  "accountId": "5080840401-prefix-female-casino",
  "dc1": "9ad3d98fbba34df81b2e34c2bbc7adaef17bb7362ef14ca7f428d6642972ae22110a84feacaf4eee05d82c2b503102ec0a75dd5a0aa9ebbc201ae0b2b5a866973b073102ec83e5eaadb50fdcd144eb7e7ba1917af79b04883eaf1f121a5a01ecd0e4f5c934d8af3ff4e17d6ef2554a6ff7ab87baa72fcc8df8abff0a014a75813c603f70ed63a66665e48a0ec66bd4842594e0c98d1f89f5f9223e150322bdd9981bdfdb7437b41f26e3a1b49a998b389ca7a2978fcf1b4e1f110b8e99c1e82116bfc7d7e0c3f301a519862c5e4f20a427f0f32858dae2d3c2ca4e31a5827a0e0ddd8c7d4b6bbd581ee196801521662daf44e2419d69df9676916832df4d78db",
  "dcId": 1,
  "nextApiId": 2040,
  "dateUpdated": {
    "$date": "2025-04-21T13:19:27.577Z"
  },
  "banned": false,
  "firstName": "Arina",
  "id": "5080840401",
  "lastName": "Zhdanova",
  "messageCount": 42,
  "twoFa": false,
  "twoFaDate": {
    "$date": "2025-04-20T20:22:20.985Z"
  },
  "automaticCheckDate": {
    "$date": "2025-04-21T13:19:27.577Z"
  },
  "remainingTime": {
    "$date": "2025-04-21T11:29:32.588Z"
  },
  "personalChannel": "zIQFIrds4kFRGOSf",
  "personalChannelDate": {
    "$date": "2025-03-29T15:26:35.790Z"
  },
  "lazyCheckDate": {
    "$date": "2025-04-20T21:08:49.972Z"
  },
  "username": "zhdanova_innovative"
},
{
  "_id": {
    "$oid": "67dd2b0cf5fa1dc49466c915"
  },
  "accountId": "6779542534-prefix-female-casino",
  "dc1": "373a83c3b4407f2ff10e01ca3be4b2ee4beaddb4473884a9f4c369b003cb8606da1bfc1f8308d7109e61035570e716ede1a89c02cd723d5e03ead72e1b6d666a1809dfd1e0b5af467481942828504f9b8b1115b2445cbba270aacd66e4c7498480a53c00dcbaf8ae053ff8fcde049e5a7de92ada1ed254f35cf4e1ec50a19b1bd2cb5a8bd71d65ab8d39b4736b11a06fee629a80cd75d32647c3964dce2ee5c4b8766be694d21e96f11daaca7b99d46ef7919e73d93daf72d74b2a4a28c20082faf1153986e6482f07b3d3981869eb4752022c943450212aeaedf0428384b9391ce2f616f367ad59811b7920234fb0701f8ebb886aca5ca76794447c7a76c086",
  "dcId": 1,
  "nextApiId": 2040,
  "dateUpdated": {
    "$date": "2025-04-21T13:05:27.884Z"
  },
  "banned": false,
  "firstName": "Rita",
  "id": "6779542534",
  "lastName": "Sokolova",
  "messageCount": 33,
  "twoFa": false,
  "twoFaDate": {
    "$date": "2025-04-20T16:06:47.386Z"
  },
  "automaticCheckDate": {
    "$date": "2025-04-21T13:05:27.884Z"
  },
  "remainingTime": {
    "$date": "2025-04-21T09:10:21.207Z"
  },
  "personalChannel": "lyevxaStTwVdwfp1",
  "personalChannelDate": {
    "$date": "2025-03-29T15:26:00.207Z"
  },
  "historySpamBlocks": [
    {
      "spamBlockDate": {
        "$date": "2025-04-01T05:39:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-04-22T07:48:00.000Z"
      },
      "spamBlockDays": 1
    }
  ],
  "lazyCheckDate": {
    "$date": "2025-04-20T20:28:26.300Z"
  },
  "username": "sokolova_nice",
  "spamBlockDate": {
    "$date": "2025-04-22T07:48:00.000Z"
  },
  "spamBlockDays": 1,
  "spamBlockInitDate": {
    "$date": "2025-04-21T08:53:04.802Z"
  }
},
{
  "_id": {
    "$oid": "67dd2b0cf5fa1dc49466c917"
  },
  "accountId": "5206062111-prefix-female-casino",
  "dc1": "952a03afc1f040d09bcc7170c71cdc0e92088486a2fc17a195538a1e24cf3ea4364e26f3e8ec61fc214a36606ce5e654c4d88484947f343a68caf705f8ef805d93f37da2745cdd0f0fbcc44e2b2d8058ead2b43415ef7ec0ab306945fa609b0b018a50dbd9927d4223fade02c598240c2dc120a5bab83810a7181d26d2bd377560b54f4a4f0106df30f9cd53ab369597b6fb68f06cbdf4632ea989bdb29fbabd7bf8fb5442eb76b60589daa3c094b9e84ea6b401266b923fd671326ea60740ce218b2334185179084127cf206e43362704e205421eb3992d8009ed53e9028ab97b1b9d15b2512b3507128bf4e2555ed1ff434735ddcc980e99361be397b3a1b9",
  "dcId": 1,
  "nextApiId": 2040,
  "dateUpdated": {
    "$date": "2025-04-21T13:07:27.903Z"
  },
  "banned": false,
  "firstName": "Daria",
  "id": "5206062111",
  "lastName": "Borisova",
  "messageCount": 37,
  "twoFa": false,
  "twoFaDate": {
    "$date": "2025-04-20T20:22:21.438Z"
  },
  "automaticCheckDate": {
    "$date": "2025-04-21T13:07:27.902Z"
  },
  "remainingTime": {
    "$date": "2025-04-21T10:51:33.003Z"
  },
  "historySpamBlocks": [
    {
      "spamBlockDate": {
        "$date": "2025-03-30T11:35:00.000Z"
      },
      "spamBlockDays": 1
    }
  ],
  "personalChannel": "shbbpMEWRWdFCi6N",
  "personalChannelDate": {
    "$date": "2025-03-29T15:23:05.664Z"
  },
  "lazyCheckDate": {
    "$date": "2025-04-20T20:36:30.387Z"
  },
  "username": "borisova_payable"
},
{
  "_id": {
    "$oid": "67dd2b0cf5fa1dc49466c919"
  },
  "accountId": "6183012939-prefix-female-casino",
  "dc1": "19c470bb07221efa327da3d9354fdc312c816eae03f06d0fe408c652934498182c5e261dcbb4cf68ba0fc720d8e1cd1c371f6cbe7ba2a7afc4071e2060accfd34aa62a352dfcc5b4fadf102c37873e6403f7830d4033b95ed2185bbf1228938ec81058a407b076a92645e7df4f148177efaaf132ea47c735117c98db10ec8a5ab61f93a2f1aa4090cdadac5fb430553b2a44a769da2c5384d6572a2d76873b8ccc7c3658a917a0b7f6d015d33f1c4c7b14982f22f17d4179666dec34e7f7268d7d92bebc54b1ff749342bedfd25af801d6ae2f6844a837c7a92caa72dbae718d5394129b097a415291c87b8dd9e7347b5f601a1f1a2717537f77cec65dc6317b",
  "dcId": 1,
  "nextApiId": 2040,
  "dateUpdated": {
    "$date": "2025-04-21T21:50:00.308Z"
  },
  "banned": false,
  "firstName": "Inna",
  "id": "6183012939",
  "lastName": "Baranova",
  "messageCount": 15,
  "twoFa": false,
  "twoFaDate": {
    "$date": "2025-04-20T20:22:21.285Z"
  },
  "automaticCheckDate": {
    "$date": "2025-04-21T21:50:00.308Z"
  },
  "remainingTime": {
    "$date": "2025-04-21T11:23:56.345Z"
  },
  "personalChannel": "vh1bDbOrtMlRCUkL",
  "personalChannelDate": {
    "$date": "2025-03-29T15:23:23.011Z"
  },
  "historySpamBlocks": [
    {
      "spamBlockDate": {
        "$date": "2025-04-05T19:21:00.000Z"
      },
      "spamBlockDays": 7
    },
    {
      "spamBlockDate": {
        "$date": "2025-04-09T05:26:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-04-10T08:09:00.000Z"
      },
      "spamBlockDays": 1
    }
  ],
  "lazyCheckDate": {
    "$date": "2025-04-21T21:49:59.999Z"
  },
  "username": "baranova_remaining"
},
{
  "_id": {
    "$oid": "67dd2b0df5fa1dc49466c91b"
  },
  "accountId": "7847263907-prefix-female-casino",
  "dc1": "8863f0d8a054568b00cc5162c2a6446271c5d7888d610b679a2eb91dd672abbcd3fcc40656d2c3370343759ebb53caea324223b78425f5b4f685db17c02b6d37d647c3b2e13d9a764b660a074b7d00ae2ccb32079115af576425d6604fdaa34a634e55fed76a560ff1abb00b8495f3de0e67cdfa9e5fb1970426e0b7b486a5d141e174923390599c65cacd3d224f7d0acea217606c8f163dd5f5b32c28f3bcdff5213ef7d3deddd9cfd7bafbd7b152fc47b8847bd209c3f4724e917569a4f704d82f61fb2c8363ff41d59613e133d12b7afa883d42cad3a819c0d15289d18f9c96a3fcf50c10a7fa321d379e55ab0ba3dcd16d842b8316204c9665cd53e6656d",
  "dcId": 1,
  "nextApiId": 2040,
  "dateUpdated": {
    "$date": "2025-04-21T13:32:27.890Z"
  },
  "banned": false,
  "firstName": "Anfisa",
  "id": "7847263907",
  "lastName": "Lazareva",
  "messageCount": 15,
  "twoFa": false,
  "twoFaDate": {
    "$date": "2025-04-20T20:22:21.119Z"
  },
  "automaticCheckDate": {
    "$date": "2025-04-21T13:32:27.889Z"
  },
  "remainingTime": {
    "$date": "2025-04-21T07:44:03.906Z"
  },
  "personalChannel": "gehqqvoz5yihIhMD",
  "personalChannelDate": {
    "$date": "2025-03-29T15:23:53.127Z"
  },
  "lazyCheckDate": {
    "$date": "2025-04-20T21:21:51.048Z"
  },
  "username": "lazareva_bored"
},
{
  "_id": {
    "$oid": "67dd2b0df5fa1dc49466c921"
  },
  "accountId": "1954891288-prefix-female-casino",
  "dc1": "10b2613bfbcf55aed02eaa1d04909f7414a36044f7bc8fc30fbeef9d66bd9372fd246cd99893f1fca3aa842445f5370c28dcc2ccefb28c3c4b33a5324ce69858298b26f520be5661b1a1fbc915f847e2274b7dcc1b15e12f9e1a743e1b3bd1fd739f0c576d3737cfcf043ef18194730eba0d1e311ce4dcc4a760dba407293d3db3bfaba0f0cace24198db4bbb90aa851cc122b8fe997bdca14e809533f59fed011da97010881e94fc4acfc101a9bebe516201477ee0f9feba6db0f9dc7fa8585f09987f5d0ea1e3381b30292ea592cef2c3efb395109fc7353eb72a8253cd87e0e9656ad9e5b63e717af1f8d8a751949b6ed356b16b00f36a5a637c6bd139df7",
  "dcId": 1,
  "nextApiId": 2040,
  "dateUpdated": {
    "$date": "2025-04-21T21:53:56.355Z"
  },
  "banned": false,
  "firstName": "Anastasia",
  "id": "1954891288",
  "lastName": "Naumova",
  "messageCount": 18,
  "twoFa": false,
  "twoFaDate": {
    "$date": "2025-04-20T16:06:45.395Z"
  },
  "automaticCheckDate": {
    "$date": "2025-04-21T21:53:56.355Z"
  },
  "remainingTime": {
    "$date": "2025-04-21T07:03:36.375Z"
  },
  "personalChannel": "uBeQPSKkaDxt5LeZ",
  "personalChannelDate": {
    "$date": "2025-03-29T15:25:23.610Z"
  },
  "lazyCheckDate": {
    "$date": "2025-04-21T21:53:56.069Z"
  },
  "username": "naumova_precise"
},
{
  "_id": {
    "$oid": "67dd2b0df5fa1dc49466c923"
  },
  "accountId": "7807154577-prefix-female-casino",
  "dc1": "51e6a2243dc55db808a52816eaa447811e72fa7f92b2f025b909416428400f0e8d6500d898c109e1b036d790630ff7ea93e2cd3433729dead10a9a4b7ebac39d600e52ac4c1d408ea8f5a7f3ba7890bb451423efe6e6613d7615d14bae8196657c2a24c8c2350818f2c2f988e855619f73bbcaefc4a596f8a7fd3077b78621810e6df3d3fe3a1e26c6d574ae8ac85a44c9483b115c941f165657a63188e9ccad27d1fd98993011007f75c4930cbe62270a464ce9033b7a63205296696afbac79d25d07cdf9a866a886c0e371f3d05fa6bce5931987238e464c7b807e5372e851eb72b02511105459c7cfe468b8d7924a307909a513e1e68bfe23eefc25ea24d5",
  "dcId": 1,
  "nextApiId": 2040,
  "dateUpdated": {
    "$date": "2025-04-21T21:49:58.065Z"
  },
  "banned": false,
  "firstName": "Albina",
  "id": "7807154577",
  "lastName": "Suvorova",
  "messageCount": 17,
  "twoFa": false,
  "twoFaDate": {
    "$date": "2025-04-20T16:06:47.300Z"
  },
  "automaticCheckDate": {
    "$date": "2025-04-21T21:49:58.065Z"
  },
  "remainingTime": {
    "$date": "2025-04-21T07:06:45.218Z"
  },
  "personalChannel": "UayBhUPCO9usVOAa",
  "personalChannelDate": {
    "$date": "2025-03-29T15:24:37.281Z"
  },
  "lazyCheckDate": {
    "$date": "2025-04-21T21:49:57.773Z"
  },
  "username": "suvorova_capitalist"
},
{
  "_id": {
    "$oid": "67dd2b0ef5fa1dc49466c925"
  },
  "accountId": "6802964083-prefix-female-casino",
  "dc1": "41e55b1675def26d91a0055721ffa3e1b8a13429dab293ea925bdd2d4e075f76f4a949eb25c8fc4f66843a8ee39038b337a131c00f3920d1b838c3edd3534ecbe90229992dd58c671f703e7b5ed4cb0a5edc32eb7fac85632bc8ce63e1582446eda91a2ad3da384cad74bbc0b9bb08235f075127012f1bf882119b8e328822b144114d137e11ed43c9776e81b0fc7bf2dbbb5e6a2e3685d278ad0979f179e2d717c141da160729e0e1cc1f6bad5f0b4ef575a3b3fa9f95e8275d87f51e439cf048b120a0557e347fcd920cf32b664bc7c503c48352fd54ac6a105915af45a83bfe9c35331aef61f1521b47a618a9b33ef43bbaaad258062de4cc5ed7677231fe",
  "dcId": 1,
  "nextApiId": 2040,
  "dateUpdated": {
    "$date": "2025-04-21T21:53:02.960Z"
  },
  "banned": false,
  "firstName": "Raisa",
  "id": "6802964083",
  "lastName": "Novikova",
  "messageCount": 18,
  "twoFa": false,
  "twoFaDate": {
    "$date": "2025-04-20T20:22:26.598Z"
  },
  "automaticCheckDate": {
    "$date": "2025-04-21T21:53:02.960Z"
  },
  "remainingTime": {
    "$date": "2025-04-21T07:58:43.725Z"
  },
  "personalChannel": "DJphdk5mysTzmQmA",
  "personalChannelDate": {
    "$date": "2025-03-29T15:23:31.172Z"
  },
  "lazyCheckDate": {
    "$date": "2025-04-21T21:53:02.417Z"
  },
  "username": "novikova_good"
},
{
  "_id": {
    "$oid": "67dd2b0ef5fa1dc49466c928"
  },
  "accountId": "1608573851-prefix-female-casino",
  "dc1": "760321b52f2362e9b51f0a1cde690bffedaf965a46847134832eff1f7f268772045ad5232a3f24693e5a771c275d30cc4cf75692319ff17230478b90a8d378741d2b168c2e2233e005c9e8b98d48169467ee772eeab5457b5543a4a75dbb7265b0578074a22cfb7627190f617d13383f269e69b6743b9d82643bcae7212f8cc77ee449a4c702e58a56995d1f607578f679dc0a794bd135cbb0aacff87044aca9fe6caa4da4d4bc524ba41e0352b4ed28f0f624a7ce4df1a8338743586419b77285f68826f327dd1a8d6ae108bfdb0beaad59f95821c164af95f5a473660fd2a89a33eb8145aee8dee3df2832f9d1d0b3fdea9cf30dbc4485b914ed78546cc035",
  "dcId": 1,
  "nextApiId": 2040,
  "dateUpdated": {
    "$date": "2025-04-21T13:19:30.200Z"
  },
  "banned": false,
  "firstName": "Anna",
  "id": "1608573851",
  "lastName": "Antonova",
  "messageCount": 30,
  "twoFa": false,
  "twoFaDate": {
    "$date": "2025-04-20T16:06:46.244Z"
  },
  "automaticCheckDate": {
    "$date": "2025-04-21T13:19:30.200Z"
  },
  "remainingTime": {
    "$date": "2025-04-21T14:48:20.171Z"
  },
  "personalChannel": "Dt8BQTrgyKjEzSDq",
  "personalChannelDate": {
    "$date": "2025-03-29T15:25:09.703Z"
  },
  "historySpamBlocks": [
    {
      "spamBlockDate": {
        "$date": "2025-04-05T12:04:00.000Z"
      },
      "spamBlockDays": 1
    }
  ],
  "lazyCheckDate": {
    "$date": "2025-04-20T20:59:48.926Z"
  },
  "username": "antonova_clinical"
},
{
  "_id": {
    "$oid": "67dd2b0ef5fa1dc49466c92b"
  },
  "accountId": "5285480492-prefix-female-casino",
  "dc1": "84da340012ffefef85cdb97138dc3ce376d969c82e87389b8975f6a67e29dd466249c288177e5f90b75c1d585552c946c3459143991667657c947015514fb53454a82479e5851766b5f98e0aa37079ef890dbd3389baa84513fadd1ad372163c91f546c5a8e771289f13495d807a992533c38991eed207c49fa662ebf1a3a054078030e67555e40dd1b40feb2555650715129cea139a08a15ad7f0392d746d3d8370af5b9a4b8b9a23a913b3353e11c7cef7f67094f25651faad5254bd904c83eabc6d43e7dc5d9333ab5af856e707676d493e6765eb8062fb9e0819dc5e22aa1e49bf280a8e40db93a8d9f80b0a3ca5b699a22364420e5cd6b4356201ed5043",
  "dcId": 1,
  "nextApiId": 2040,
  "dateUpdated": {
    "$date": "2025-04-21T21:54:58.074Z"
  },
  "banned": false,
  "firstName": "Inna",
  "id": "5285480492",
  "lastName": "Eroshkina",
  "messageCount": 33,
  "twoFa": false,
  "twoFaDate": {
    "$date": "2025-04-20T20:22:24.927Z"
  },
  "automaticCheckDate": {
    "$date": "2025-04-21T21:54:58.074Z"
  },
  "remainingTime": {
    "$date": "2025-04-20T14:40:37.201Z"
  },
  "personalChannel": "XqcpGyg1LahCtDMz",
  "personalChannelDate": {
    "$date": "2025-03-29T15:23:41.483Z"
  },
  "historySpamBlocks": [
    {
      "spamBlockDate": {
        "$date": "2025-04-04T07:53:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-04-21T20:36:00.000Z"
      },
      "spamBlockDays": 1
    }
  ],
  "lazyCheckDate": {
    "$date": "2025-04-21T21:54:57.765Z"
  },
  "username": "eroshkina_outdoor"
},
{
  "_id": {
    "$oid": "67dd2b0ef5fa1dc49466c92d"
  },
  "accountId": "7652394153-prefix-female-casino",
  "dc1": "10b425367f5db2bdaf136a5757118fe22e3e83fc9e91d31755f5b365cfcb42f3c4316248922ca5981a29b9046ea87390d715433e1255e0089fea831ab550d7d08fc0689256b378d4e453f4f89e73577ec7b6a1858bd3d3730cf8515ac86879958adaf5d84056adea3a1838124273b881a08bc04325c92581697a1cfe69835713e2dc5c46e2e398620912cbb3db9de7085b09c557e18fd9d91450834bd4212f12e16f034abe344c7c02dd2b57a95ce98a90fb4dad39a62c7ea37da52757a5021985a3def88fb22d3c190f34bf7f2782ec48ec5edd5df9d2b5456993b84259f911226db81e225a95a531f5d172e84604620ba965c50e152ca5a67193246b76dd2b",
  "dcId": 1,
  "nextApiId": 2040,
  "dateUpdated": {
    "$date": "2025-04-21T21:52:59.682Z"
  },
  "banned": false,
  "firstName": "Mira",
  "id": "7652394153",
  "lastName": "Panfilova",
  "messageCount": 34,
  "twoFa": false,
  "twoFaDate": {
    "$date": "2025-04-20T16:06:46.246Z"
  },
  "automaticCheckDate": {
    "$date": "2025-04-21T21:52:59.682Z"
  },
  "remainingTime": {
    "$date": "2025-04-21T09:16:02.870Z"
  },
  "historySpamBlocks": [
    {
      "spamBlockDate": {
        "$date": "2025-03-29T21:02:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-04-05T12:48:00.000Z"
      },
      "spamBlockDays": 1
    }
  ],
  "personalChannelDate": {
    "$date": "2025-03-29T21:32:55.232Z"
  },
  "personalChannel": "Aoumsn9unyuIPUxi",
  "lazyCheckDate": {
    "$date": "2025-04-21T21:52:59.471Z"
  },
  "username": "panfilova_technical"
},
{
  "_id": {
    "$oid": "67dd2b0ff5fa1dc49466c92f"
  },
  "accountId": "6847097930-prefix-female-casino",
  "dc1": "45f930d9c560904b810dd30fc8d36b6f479f518d948117f587025ceaf60bcf4dcd329a0fc9f499638b4514284f1097135ec4f10c17d6ab7cb59e6cdac665412c3c76dd202fc43413107d45f23e1c0b7820e4cf03bed402333e680e0b1dafcdd20cfbf6a30248155489a5f1bd64329c53ce0a03ce552b9a83ac6e2fb0464d462daa315c357d7c1e89afe63f7c40f6dea439945670f4e4e2e292bd3b61b5f56f51bd14e15929089aa9462e7e28134229a1f9580c9b3c81413b938e06f439fdcff58f14eadf20b88ce92eb36e06d7b553b771406aaf9f0c41214e59c802f9be375c810b2d7c939f7e16aeedcbd0315b8e86544df7fd507159c5009ae268685bfe8c",
  "dcId": 1,
  "nextApiId": 2040,
  "dateUpdated": {
    "$date": "2025-04-21T13:20:28.947Z"
  },
  "banned": false,
  "firstName": "Liza",
  "id": "6847097930",
  "lastName": "Frolova",
  "messageCount": 26,
  "twoFa": false,
  "twoFaDate": {
    "$date": "2025-04-20T20:22:21.276Z"
  },
  "automaticCheckDate": {
    "$date": "2025-04-21T13:20:28.947Z"
  },
  "remainingTime": {
    "$date": "2025-04-20T14:34:14.081Z"
  },
  "historySpamBlocks": [
    {
      "spamBlockDate": {
        "$date": "2025-04-05T07:53:00.000Z"
      },
      "spamBlockDays": 7
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-31T10:10:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-04-01T20:43:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-04-11T05:23:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-04-10T10:22:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-04-23T12:52:00.000Z"
      },
      "spamBlockDays": 3
    }
  ],
  "personalChannel": "WCDaRfPnFgyhHX3R",
  "personalChannelDate": {
    "$date": "2025-03-29T15:24:48.864Z"
  },
  "lazyCheckDate": {
    "$date": "2025-04-20T20:34:29.892Z"
  },
  "username": "frolova_nutritious",
  "spamBlockReasons": [
    {
      "reason": "I recently experienced an issue with my Telegram account. I believe theres been a mistake as Im unable to message some contacts due to apparent restrictions. I would like to resolve this and resume full messaging access.",
      "date": {
        "$date": "2025-04-20T16:42:34.070Z"
      }
    }
  ],
  "spamBlockDate": {
    "$date": "2025-04-23T12:52:00.000Z"
  },
  "spamBlockDays": 3,
  "spamBlockInitDate": {
    "$date": "2025-04-20T16:42:34.075Z"
  }
},
{
  "_id": {
    "$oid": "67dd2b0ff5fa1dc49466c932"
  },
  "accountId": "6263977681-prefix-female-casino",
  "dc1": "a052ff40feb73722fb85d167ae0184b0197f19a66db21b958a04de622cd8d7f41e71670490c0f6da70581b1abe486416ab88080415ac26cba30c83dac086ea4be31a9b7743fdc414ccd6605ba8ab4403e7658a57a88642d5ae854f2867afc88e68247c19b735b5dc207c36c99dda7cdf91f79efe10ae5309d32be9d2cbae2c1a04026f7e53ce36006527d97e78bc8f689cdb8a35b3bafa42f42199096850341777596759c43d1f9485b7d639f4ef2a53b83c67abb378d11ffd1574f7985d36660412a99a1c2607cf90eb183078a454ed6921d6287e4f8485d61727dc7b931ece809cd864aa82976bf0bc7a4b7a64a60394c06c7223502ff5202f4fb149321398",
  "dcId": 1,
  "nextApiId": 2040,
  "dateUpdated": {
    "$date": "2025-04-21T21:52:59.836Z"
  },
  "banned": false,
  "firstName": "Raisa",
  "id": "6263977681",
  "lastName": "Zhdanova",
  "messageCount": 35,
  "twoFa": false,
  "twoFaDate": {
    "$date": "2025-04-20T20:22:22.957Z"
  },
  "automaticCheckDate": {
    "$date": "2025-04-21T21:52:59.836Z"
  },
  "remainingTime": {
    "$date": "2025-04-21T13:54:19.504Z"
  },
  "personalChannel": "vABglbBFy3FPLEkV",
  "personalChannelDate": {
    "$date": "2025-03-29T15:23:26.687Z"
  },
  "lazyCheckDate": {
    "$date": "2025-04-21T21:52:59.574Z"
  },
  "username": "zhdanova_olive"
},
{
  "_id": {
    "$oid": "67dd2b0ff5fa1dc49466c938"
  },
  "accountId": "1571404771-prefix-female-casino",
  "dc1": "33905e3eb886d76ac038f29026867252952035afec35e6f9e6339a7181d81f32eca96c8cdc5bf878fe4a12800ee1d1ae5924f56e664a75151cf1cbb198cd6254009ca981ef7a5fe32534ed289df507e1d54837ad56b2a7d8128c7437cab4688575948c4a96ca4d5b571898e126943ece93fa2f930b6ed806fc7e24463265ed0680f44c919962ea2867963e0b4a55f9fdbd9935e8dd14bdb135ebab7a9528d6615f2503f546a962d6bd3e9ae4acbe1c696553fcc029f1a95bcb100dfa999a2e8fe068be441e20f698ace415b6e922d4cb14b42cbffab2ddf1ba27ef6ce0b13d1fc347ebc1beb73e8691ed70c25eeca9665c2dbe56f461a3dd88b815f72089240e",
  "dcId": 1,
  "nextApiId": 2040,
  "dateUpdated": {
    "$date": "2025-04-21T13:17:28.336Z"
  },
  "banned": false,
  "firstName": "Marina",
  "id": "1571404771",
  "lastName": "Makarova",
  "messageCount": 36,
  "twoFa": false,
  "twoFaDate": {
    "$date": "2025-04-20T16:06:45.268Z"
  },
  "automaticCheckDate": {
    "$date": "2025-04-21T13:17:28.336Z"
  },
  "remainingTime": {
    "$date": "2025-04-21T11:47:58.508Z"
  },
  "personalChannel": "yXnwNo1lBXItozKp",
  "personalChannelDate": {
    "$date": "2025-03-29T15:25:46.971Z"
  },
  "lazyCheckDate": {
    "$date": "2025-04-20T21:20:48.283Z"
  },
  "username": "makarova_curious"
},
{
  "_id": {
    "$oid": "67dd2b10f5fa1dc49466c93b"
  },
  "accountId": "6775843741-prefix-female-casino",
  "dc1": "020ee5172a4e15ae92c33bef0d1d61c0d8bcbcca5cea9da6b410e6eb9888024ba035c7cd62ec4e31a6fcfa22306d5637f85e06eedd3561e9a820e1ef5d1f9b9c649f076bf8e69fcfff86d8dde2c77e4c0dab06703c392e7292a28514533a749cac8ac49040514181038e3b84f870d92f9b742bfed48200265bc40312f47e06961b1de9dc4156edcd317dce7fc3a6e2294f7df1595ead6efce347b953596f27d737149f82f29fd38dfa466c0c609228a172ff5805436a16b783d3d7c3933153e890c434aa4a9d4346ffb05b61dbe5b069bb53b9c0432481a78055953f9bb1acc1107cde58974d42f457c1883a5e29b571663d99a447606342a0fe064968918343",
  "dcId": 1,
  "nextApiId": 2040,
  "dateUpdated": {
    "$date": "2025-04-21T13:13:30.346Z"
  },
  "banned": false,
  "firstName": "Daria",
  "id": "6775843741",
  "lastName": "Anisimova",
  "messageCount": 31,
  "twoFa": false,
  "twoFaDate": {
    "$date": "2025-04-20T20:22:21.010Z"
  },
  "automaticCheckDate": {
    "$date": "2025-04-21T13:13:30.346Z"
  },
  "remainingTime": {
    "$date": "2025-04-21T11:53:44.362Z"
  },
  "personalChannel": "drpOdkDbM5gCjjuW",
  "personalChannelDate": {
    "$date": "2025-03-29T15:27:21.641Z"
  },
  "historySpamBlocks": [
    {
      "spamBlockDate": {
        "$date": "2025-04-06T05:57:00.000Z"
      },
      "spamBlockDays": 1
    }
  ],
  "lazyCheckDate": {
    "$date": "2025-04-20T21:04:49.870Z"
  },
  "username": "anisimova_armed"
},
{
  "_id": {
    "$oid": "67dd2b10f5fa1dc49466c93d"
  },
  "accountId": "5881461381-prefix-female-casino",
  "dc1": "34e29e45c3892f06fa58f91754e3696ef61914a6304e5d0f6add9873985960ac21dcbbf6aafa772acfc4d043b54f630f0d862d50647c1e9a8cf862fac79416d7ae671a5952ab6c1c0f76938fff7f703ecc620c0999142acfdc414d852c4ccce506b76f57a38770bd7e572717e5974244136de3d629678d34aa6d05fb2978ae449312349734cb52d3b10a4da89a9cf7f4b7cc9197b469d4c93953638d3282eedf9c2fc9ad60555d51f1d48831e07b7c9a0f6b47807d7dd08b7ea5acdcdce6c7293214798e11a3b9b108d70c6cbadd46fcb16aaa5d114d5187821001a55025455610499edab2fcc39c8ff7deabddead759ba16f0ffafe245e644e04a5b33972c17",
  "dcId": 1,
  "nextApiId": 2040,
  "dateUpdated": {
    "$date": "2025-04-21T13:32:28.393Z"
  },
  "banned": false,
  "firstName": "Kira",
  "id": "5881461381",
  "lastName": "Shubina",
  "messageCount": 41,
  "twoFa": false,
  "twoFaDate": {
    "$date": "2025-04-20T20:22:21.009Z"
  },
  "automaticCheckDate": {
    "$date": "2025-04-21T13:32:28.393Z"
  },
  "remainingTime": {
    "$date": "2025-04-21T12:14:25.622Z"
  },
  "personalChannel": "Rva8FKMTFmYotPrk",
  "personalChannelDate": {
    "$date": "2025-03-29T15:24:12.308Z"
  },
  "lazyCheckDate": {
    "$date": "2025-04-20T20:14:31.482Z"
  },
  "username": "shubina_lexical"
},
{
  "_id": {
    "$oid": "67dd2b11f5fa1dc49466c944"
  },
  "accountId": "5604277372-prefix-female-casino",
  "dc1": "460ecd6ba20ea32e1043d522af336a67f9f13f5b1978a6c0c21fe8f952f57e22778567c12db021b05ea557cf980a9a75f7b682365b55aa3b1d7e482cbbf0581d77bab16edd337ec85e78e1be649150a69a2e8bf9b3ee14efa0268fbd39585a887ae0df8212d6212b89b81eb257459add35c400bd153eb05c9c5e23e76bccceec799948915f9e93e81fee57c021efb1bbb9a62ca1603482eb95ee7782222d95268873990e6440dfe84bf05f43a4d74316e33ddde3ecd573dbdc2f93c3c090a6bcfda2fb0bea0715eca54c425889e9900f02f9d880fa7254b74bb003b21e89f4b712e174518e019646044542d2014c38e3a88f87ca83495b1db2173c8bfe612aae",
  "dcId": 1,
  "nextApiId": 2040,
  "dateUpdated": {
    "$date": "2025-04-21T13:22:42.167Z"
  },
  "banned": false,
  "firstName": "Polina",
  "id": "5604277372",
  "lastName": "Loginova",
  "messageCount": 29,
  "twoFa": false,
  "twoFaDate": {
    "$date": "2025-04-20T20:22:21.879Z"
  },
  "automaticCheckDate": {
    "$date": "2025-04-21T13:22:42.167Z"
  },
  "remainingTime": {
    "$date": "2025-04-21T14:50:11.175Z"
  },
  "historySpamBlocks": [
    {
      "spamBlockDate": {
        "$date": "2025-04-04T16:03:00.000Z"
      },
      "spamBlockDays": 7
    },
    {
      "spamBlockDate": {
        "$date": "2025-04-08T05:11:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-04-12T10:16:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-04-21T12:30:00.000Z"
      },
      "spamBlockDays": 1
    }
  ],
  "personalChannel": "x5DvobbAuachVrhe",
  "personalChannelDate": {
    "$date": "2025-03-29T15:24:15.332Z"
  },
  "lazyCheckDate": {
    "$date": "2025-04-20T20:39:30.376Z"
  },
  "username": "loginova_purple"
},
{
  "_id": {
    "$oid": "67dd2b11f5fa1dc49466c951"
  },
  "accountId": "1208884634-prefix-female-casino",
  "dc1": "07c8cafa8af952457d6a9c8e001b0c9f1fc6afbcce32f4435abd23c596de07bd08aeb3999ca14e6e36b351a607f4c3ee9996762ba592fa53baa7aacb20c98f1c2af1328ef89861ff6047775ebd9bf5f90c9304c16d0afa8381892275560ab703856456b064f7db1e48326f6828e563b6b96940b4b7b3ff30fbe875d731dad25db1e6327e1c27ede16e8e8532f7bd2beb13a27af0eb1fec4c26fb1713fe73cc9dac312e64cff1249b26601937b9fed5c1e91b4fd8e7bdae510adfcdff9bc486417aa6f7ffa00722c6965d362294a1a84c572d289e9c6d1d3638e6f3d71cb0f46eab2b5d2098d441072e2bb42dae902e2e037aac5bcf8b920e0fc9a7cf7b829257",
  "dcId": 1,
  "nextApiId": 2040,
  "dateUpdated": {
    "$date": "2025-04-21T13:08:28.744Z"
  },
  "banned": false,
  "firstName": "Olga",
  "id": "1208884634",
  "lastName": "Antonova",
  "messageCount": 17,
  "twoFa": false,
  "twoFaDate": {
    "$date": "2025-04-20T20:22:24.950Z"
  },
  "automaticCheckDate": {
    "$date": "2025-04-21T13:08:28.744Z"
  },
  "remainingTime": {
    "$date": "2025-04-21T07:02:37.400Z"
  },
  "personalChannel": "ddpJd4tOqcIWJdUQ",
  "personalChannelDate": {
    "$date": "2025-03-29T15:27:00.225Z"
  },
  "lazyCheckDate": {
    "$date": "2025-04-20T20:48:31.111Z"
  },
  "username": "antonova_comfortable"
},
{
  "_id": {
    "$oid": "67dd2b11f5fa1dc49466c954"
  },
  "accountId": "6038701039-prefix-female-casino",
  "dc1": "3a604c32ff8832e759e2fd30b714daefe86b63660589e8742234b5cf3c9b14472b8b34318e1695c9932599bcf2a97bbd4eb4562174cd6f7551e1590ee5b3eb6ac497ebcca551f7d3e7770239865400a57a22d8b957278020d6845abcafb1920f1245cbf2c1c48ea3d34a4a604c02323205882c1f4e7a78c273dd96fbacac632c940fc99ac2193868a5ef84f5c3a9bb3e0fafbbb84a67718bcadeda4bb954620a54330a289ee1fa51ef6c2995677848118fdfc214b97050f7b2133e95f1bb6c3de136d244fedc43d293cc8ecb73cfb9e16508a224e82e4a251d5fa3c9a0b797985b478a822d72dd5bc273f05ea1af0e68974319b2f645ddc0c28a0159a782a389",
  "dcId": 1,
  "nextApiId": 2040,
  "dateUpdated": {
    "$date": "2025-04-21T13:24:29.364Z"
  },
  "banned": false,
  "firstName": "Mira",
  "id": "6038701039",
  "lastName": "Shirokova",
  "messageCount": 17,
  "twoFa": false,
  "twoFaDate": {
    "$date": "2025-04-20T16:06:47.304Z"
  },
  "automaticCheckDate": {
    "$date": "2025-04-21T13:24:29.364Z"
  },
  "remainingTime": {
    "$date": "2025-04-21T07:42:59.762Z"
  },
  "personalChannel": "VEVyt6MhdGukvjrp",
  "personalChannelDate": {
    "$date": "2025-03-29T15:23:38.481Z"
  },
  "lazyCheckDate": {
    "$date": "2025-04-20T21:19:48.915Z"
  },
  "username": "shirokova_subtle"
},
{
  "_id": {
    "$oid": "67dd2b12f5fa1dc49466c95a"
  },
  "accountId": "8126726461-prefix-female-casino",
  "dc2": "71c0f066891476d99a0ac6b388fab472b9cb08e5198dd7ae22ebd6d1a8b72f199346b444ff393c31e271b71f13a4f8ceb283db701d2cae53dcab0ca5875cc59005c73e0074ff5c310b4c88465de733e639a42505cbe82a2495cfd38061f7f2a63888c6ff748e86eef87b486f5177a330713b587e545394d96efce6a293b2b24e570a6f50b19b1a7d32ead5f1735d497642069a62173f2ec57d392e8a6ba29ddc80576f5c707956714095eea1ce9fdae415d4ca0c0771be1973740a33e216ef547c7905276d05cf308b277bc24c2bdac9f750fe3b66c2c648098176117433fbfe33725f0e5d397e7fc32e007998b6b8ccad67d5124d3a55824f603a795fdad299",
  "dcId": 2,
  "nextApiId": 2040,
  "dateUpdated": {
    "$date": "2025-04-21T21:52:07.697Z"
  },
  "banned": false,
  "firstName": "Irina",
  "id": "8126726461",
  "lastName": "Nechayeva",
  "messageCount": 59,
  "twoFa": false,
  "twoFaDate": {
    "$date": "2025-03-27T10:23:45.314Z"
  },
  "automaticCheckDate": {
    "$date": "2025-04-21T21:52:07.697Z"
  },
  "remainingTime": {
    "$date": "2025-04-21T13:59:46.184Z"
  },
  "historySpamBlocks": [
    {
      "spamBlockDate": {
        "$date": "2025-03-29T06:53:00.000Z"
      },
      "spamBlockDays": 1
    }
  ],
  "personalChannel": "xlp1iVQMGObmUKQD",
  "personalChannelDate": {
    "$date": "2025-03-29T15:27:06.116Z"
  },
  "lazyCheckDate": {
    "$date": "2025-04-21T21:52:07.211Z"
  },
  "username": "nechayeva_imperial"
},
{
  "_id": {
    "$oid": "67dd2b12f5fa1dc49466c95c"
  },
  "accountId": "7944361133-prefix-female-casino",
  "dc1": "9618994e0a4106714d23b55e4aae6fbe73b15b5df8c2c6399e67a077af103bbb61723b11b2934b55c32b3786bc83411cef59d536633bb9afa77dc5b6d149f54d8e527f6be92dca1c8248890c2636bd5036c7515ad48fa5db420b9b6113f299536c0a8173fae27cb0a76dbe94f9670cad8342881cac9e23109b91f08b2c34ba99c9de7e2177480a146b591e490e94a8e01074ad9a2c25aaff380df0b5d78b650d0a1175d0b1093f17f2b0342eec75d049d70bcb8ccc77c4811eb45e1a3d4baabb9537bcad7c287080d3e7595e57669135d9ee57b28864dc811ea566574dda793f79f78e13d124e090c25c085ff5ed990cff9c6dd7bba20ecc06ecd9249e5e08f5",
  "dcId": 1,
  "nextApiId": 2040,
  "dateUpdated": {
    "$date": "2025-04-21T13:30:30.323Z"
  },
  "banned": false,
  "firstName": "Yana",
  "id": "7944361133",
  "lastName": "Pavlova",
  "messageCount": 29,
  "twoFa": false,
  "twoFaDate": {
    "$date": "2025-04-20T20:22:24.931Z"
  },
  "automaticCheckDate": {
    "$date": "2025-04-21T13:30:30.323Z"
  },
  "remainingTime": {
    "$date": "2025-04-21T12:37:24.283Z"
  },
  "personalChannel": "BLW0BaspReuIdNgV",
  "personalChannelDate": {
    "$date": "2025-03-29T15:23:09.581Z"
  },
  "historySpamBlocks": [
    {
      "spamBlockDate": {
        "$date": "2025-04-02T03:19:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-04-04T12:03:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-04-07T05:14:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-04-07T15:05:00.000Z"
      },
      "spamBlockDays": 1
    }
  ],
  "lazyCheckDate": {
    "$date": "2025-04-20T21:47:48.585Z"
  },
  "username": "pavlova_striped"
},
{
  "_id": {
    "$oid": "67dd2b12f5fa1dc49466c95f"
  },
  "accountId": "5807705874-prefix-female-casino",
  "dc1": "656009b9c6a0765b8e099e5ecc54993d1459e57e893c46edfa1681a4d8b884c5064c2cd1e49b198d90142f93b8b9cda913e0e5e0a5c84c69a5894fdfe798439d5d529797cc0823733b3eb1f78a8eb29725880e3804bd80a86da5b08b3d59b72cb14660f0f9d91abab451c0dcd6e9603e507fa1ff3b2768c7a1e450aa6bcf04ea1124b1a5ec3eedd2c828116b613bcbcbb3714862d916e480a4767da27422f8645e710349e7a956e45104a40120be6fec9e7d2e3df6f157d2a23d3210a959fbb38eb155f41c68345e412c10dc2982ba8c0f017e2143e767c94ceb19a0579c065405ac90c47986a97278a7a06a847beae89707c7682a0f827a99395ff41da594f1",
  "dcId": 1,
  "nextApiId": 2040,
  "dateUpdated": {
    "$date": "2025-04-21T21:54:03.373Z"
  },
  "banned": false,
  "firstName": "Arina",
  "id": "5807705874",
  "lastName": "Maksimova",
  "messageCount": 34,
  "twoFa": false,
  "twoFaDate": {
    "$date": "2025-04-20T20:22:24.934Z"
  },
  "automaticCheckDate": {
    "$date": "2025-04-21T21:54:03.373Z"
  },
  "remainingTime": {
    "$date": "2025-04-21T13:46:29.059Z"
  },
  "personalChannel": "YobpHEBys5KwEVpy",
  "personalChannelDate": {
    "$date": "2025-03-29T15:24:01.453Z"
  },
  "historySpamBlocks": [
    {
      "spamBlockDate": {
        "$date": "2025-04-01T06:12:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-04-02T19:01:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-04-10T10:53:00.000Z"
      },
      "spamBlockDays": 1
    }
  ],
  "lazyCheckDate": {
    "$date": "2025-04-21T21:54:02.947Z"
  },
  "username": "maksimova_burning"
},
{
  "_id": {
    "$oid": "67dd2b13f5fa1dc49466c963"
  },
  "accountId": "6492905066-prefix-female-casino",
  "dc1": "7b0bdaaacd280bca5dfb7f47826b051e8784ce11ffcfa2c6d285047bde5312725a57b5b58f454e609f694057a3cf6322fe44c4e0137ba94684c163329feb05990313233c72a9a09885ccd51de7a01b62a7b40f983878a77e1d71ca12aa63067c0f4b834da0e092758e80c26858c91c9086eaa74e410f5703d0baa3ffc4b06da77807699d9e84f37206308999bf27dbcc945463bf592c49bdb91908483130998667306aa6ac046112964351af8596c171f4e2371114ace8a63ded28123190f0bdcdb3c15fdaba724588c35e9d988e8cb44b757474214c34e0b81a5f47c8cc2153937311603e42c19ec5d61ac57b7d6c8f89255417bcb79414751a67f54262e2ee",
  "dcId": 1,
  "nextApiId": 2040,
  "dateUpdated": {
    "$date": "2025-04-21T13:15:28.683Z"
  },
  "banned": false,
  "firstName": "Rita",
  "id": "6492905066",
  "lastName": "Anisimova",
  "messageCount": 19,
  "twoFa": false,
  "twoFaDate": {
    "$date": "2025-04-20T20:22:24.880Z"
  },
  "automaticCheckDate": {
    "$date": "2025-04-21T13:15:28.683Z"
  },
  "remainingTime": {
    "$date": "2025-04-21T07:01:42.672Z"
  },
  "personalChannel": "CgWhhzfT7CUJmfFE",
  "personalChannelDate": {
    "$date": "2025-03-29T15:26:34.122Z"
  },
  "lazyCheckDate": {
    "$date": "2025-04-20T21:35:48.445Z"
  },
  "username": "anisimova_specific"
},
{
  "_id": {
    "$oid": "67dd2b13f5fa1dc49466c968"
  },
  "accountId": "6702709164-prefix-female-casino",
  "dc1": "621e29e05d4f69b7961806e9ff6b1b72dd1b6ef9903131a308be5f4dcd5edae9142288e6b2e4a874545917a04186bc5493ba176b34ea87dd2a6530d9d4427116854548a1916b230e3ab57f398f423b0c26dc4f8149185aa4b27dee6a7bad92282b9c93aea97c725255bceb995ab82e4bcd4cccda63b260eb52e7e343f7dadad80e83c1a8640664c54748cde42a08002ef3be451348462ab2b46eb18ff353548a1970e5ee67db6b67f8d583278c74aabe2abcb79aa4ea26ae364f1f9eb7224fba8ffe2dd50d59f6beaae497cba563238dc660647727b2dd51d34dff0cf1fd7cf21dfc3f5726df40e9e213bc7a3c7c29a8d1218a4cdcf633f594a4601dab27da00",
  "dcId": 1,
  "nextApiId": 2040,
  "dateUpdated": {
    "$date": "2025-04-21T13:13:28.783Z"
  },
  "banned": false,
  "firstName": "Vera",
  "id": "6702709164",
  "lastName": "Golubeva",
  "messageCount": 18,
  "twoFa": false,
  "twoFaDate": {
    "$date": "2025-04-20T20:22:24.595Z"
  },
  "automaticCheckDate": {
    "$date": "2025-04-21T13:13:28.783Z"
  },
  "remainingTime": {
    "$date": "2025-04-21T07:03:50.398Z"
  },
  "historySpamBlocks": [
    {
      "spamBlockDate": {
        "$date": "2025-04-04T05:45:00.000Z"
      },
      "spamBlockDays": 7
    },
    {
      "spamBlockDate": {
        "$date": "2025-04-08T06:49:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-04-09T05:21:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-04-24T05:04:00.000Z"
      },
      "spamBlockDays": 3
    }
  ],
  "personalChannel": "b3HewawbsMPlSXWW",
  "personalChannelDate": {
    "$date": "2025-03-29T15:25:48.316Z"
  },
  "lazyCheckDate": {
    "$date": "2025-04-20T20:50:30.777Z"
  },
  "username": "golubeva_realistic",
  "spamBlockReasons": [
    {
      "reason": "Im unable to message anyone outside my contacts, despite following all guidelines. I request the issue be resolved, as it seems to be a mistake. Please review my accounts status.",
      "date": {
        "$date": "2025-04-21T05:37:34.348Z"
      }
    },
    {
      "reason": "Ive been falsely flagged for spam and lost the ability to message people freely, despite never engaging in any suspicious activities. Kindly review my case and restore my messaging function.",
      "date": {
        "$date": "2025-04-21T12:11:47.362Z"
      }
    }
  ],
  "spamBlockDate": {
    "$date": "2025-04-24T05:04:00.000Z"
  },
  "spamBlockDays": 3,
  "spamBlockInitDate": {
    "$date": "2025-04-21T05:37:34.352Z"
  }
},
{
  "_id": {
    "$oid": "67dd2b13f5fa1dc49466c96e"
  },
  "accountId": "1522690699-prefix-female-casino",
  "dc1": "1ad76d4e7482d90b3c7ac9f1c377d8b7d44e7ad12bae73394e244ec765747689bfd33860605967a325abea027d8042f50561253be4ccde415704700377f1c6e007abd7fe723ecb581346c789a3de454154f9ea652098d18a9283ac69e6e18ebae2eea6533d6f0ab86d93ff60ed7d141f7688ef7ccef8773582fcd499bdbf02f4d4db90b5a3165000f8952b8c3c481209008cc010d22cddaea9421897d091e99655652670dd49cfc566b4332780971c128588f81fee5eeb2fed122f06f37c785094194abaa5b26c630566f60057171b36f7af277abeb58259ba0e49a5f45bdff7702cd696911200c27783fd9d418b7eeee4e5adcd14c3d2a36ec74af9fd0a5f27",
  "dcId": 1,
  "nextApiId": 2040,
  "dateUpdated": {
    "$date": "2025-04-21T13:31:30.979Z"
  },
  "banned": false,
  "firstName": "Ekaterina",
  "id": "1522690699",
  "lastName": "Mironova",
  "messageCount": 20,
  "twoFa": false,
  "twoFaDate": {
    "$date": "2025-04-20T16:06:47.317Z"
  },
  "automaticCheckDate": {
    "$date": "2025-04-21T13:31:30.979Z"
  },
  "remainingTime": {
    "$date": "2025-04-21T07:02:20.263Z"
  },
  "personalChannel": "QEaPQUVLEEmpCIR6",
  "personalChannelDate": {
    "$date": "2025-03-29T15:27:23.974Z"
  },
  "lazyCheckDate": {
    "$date": "2025-04-20T20:49:30.387Z"
  },
  "username": "mironova_distinct"
},
{
  "_id": {
    "$oid": "67dd2b14f5fa1dc49466c974"
  },
  "accountId": "6479683208-prefix-female-casino",
  "dc1": "58c448c81d686f5b557035002d02a0d0252d1f80919fe1cfe025c91de6f53531587838e65f86d1d85ef52a4b8e6c09a48eac8ba711856b8eb42aabc59d793ba86d4bc5178a5f196a19b8fb1d38991a05a32f7a021385702267c08f05bf21c7407bf64d0653f134403a89fd974633dd3eecc303fdb88b74249cfef1d66bedb1ddf6d600d53200a03ad60874bce91aeec19a1b670fde8dd177692f90e088cac4d5d5561e24082b567075d8cb45cbf5f8b3f2de8e3f082e4996d3f27db91a994a80a2ad501b74ee45e2af845af5f8bf4e3a64f27bee1c5011c4144f0adbccaf1d17190af158b385adaf8f6d89f1f3d07b85b8aac570a39edd6fe0c54d335c3f8483",
  "dcId": 1,
  "nextApiId": 2040,
  "dateUpdated": {
    "$date": "2025-04-21T14:04:30.281Z"
  },
  "banned": false,
  "firstName": "Valeria",
  "id": "6479683208",
  "lastName": "Medvedeva",
  "messageCount": 18,
  "twoFa": false,
  "twoFaDate": {
    "$date": "2025-04-20T20:22:24.933Z"
  },
  "automaticCheckDate": {
    "$date": "2025-04-21T14:04:30.281Z"
  },
  "remainingTime": {
    "$date": "2025-04-21T07:03:37.969Z"
  },
  "personalChannel": "fTeVOgxVC7eogccY",
  "personalChannelDate": {
    "$date": "2025-03-29T15:25:12.700Z"
  },
  "lazyCheckDate": {
    "$date": "2025-04-20T20:36:31.103Z"
  },
  "username": "medvedeva_vital"
},
{
  "_id": {
    "$oid": "67dd2b15f5fa1dc49466c97a"
  },
  "accountId": "6460324361-prefix-female-casino",
  "dc1": "2bf1577d8a0ae8e11869d6d75cd74ac8c1bd0aaf1ce5f09ac837639fafcf532090e5ee8a1323bcd73a83910878f17d43dbf25c643a177984a66439be8ce4c16ae20e16f18f72c157e2ec11015414de68d669c25c348db7d5d6d3b236d8bdf1b38efc66f0777c637cdd8b73f75d749f130a29e5b3362fb7792ec76b6cdecbcb06990eb601ba59152f6b204a743b766cc7144b8799dde57b125e6f7d1d36203210f36335b013012f34ae81a2d7b1dfffdb032e2be80be98ea5b4a51e02214d7f481a99f183f6a99e2305f1d470c501748a0b36b91a86974cf35fe16977f16a88a9c0e3ef685df0c096d11669f95aa2981ad4f408707d702157337ac15468e6cfe8",
  "dcId": 1,
  "nextApiId": 2040,
  "dateUpdated": {
    "$date": "2025-04-21T13:25:30.231Z"
  },
  "banned": false,
  "firstName": "Darina",
  "id": "6460324361",
  "lastName": "Tkacheva",
  "messageCount": 34,
  "twoFa": false,
  "twoFaDate": {
    "$date": "2025-04-20T20:22:26.582Z"
  },
  "automaticCheckDate": {
    "$date": "2025-04-21T13:25:30.231Z"
  },
  "remainingTime": {
    "$date": "2025-04-21T11:53:18.017Z"
  },
  "personalChannelDate": {
    "$date": "2025-03-29T21:33:57.955Z"
  },
  "personalChannel": "jFWtd2NscUZfxhfe",
  "historySpamBlocks": [
    {
      "spamBlockDate": {
        "$date": "2025-03-31T07:45:00.000Z"
      },
      "spamBlockDays": 1
    }
  ],
  "lazyCheckDate": {
    "$date": "2025-04-20T21:38:52.119Z"
  },
  "username": "tkacheva_sad"
},
{
  "_id": {
    "$oid": "67dd2b15f5fa1dc49466c97d"
  },
  "accountId": "5327984063-prefix-female-casino",
  "dc1": "74d8a13dd5bef9390fe17eb15ab8a43e2589e66aa5c64ecc359d65babf2857296aa14a4ae6f23ede1a6940b1580cfb07e631cc0f5f4c81962fda71ccd7d1ba11fdc3c7098b77e497695b3a47e46b89b51bafe8e3164b6a6e7713afbfebd4c0dadcf46b9dd619bf2b7935efd585bd73d43055a778fdc91b39450789ebb585e207a3f9a812003b0375a758c937fe7540c8d3705c8113635ef7c8a18f3c238ea6c241a9f1df28f508d1a6b28482aba8734bb56bfd3f1630ccbc2134f1c0a6cfdeb43715d42d691d46b04b13e6b58f1b90eaff44dd5a11ac8f7abc25734d2ebfb9f96dbcda8d07e6de4bc830e203442c39912cbaa9d8edf32ae0eeabf13c87571681",
  "dcId": 1,
  "nextApiId": 2040,
  "dateUpdated": {
    "$date": "2025-04-21T13:28:28.635Z"
  },
  "banned": false,
  "firstName": "Arina",
  "id": "5327984063",
  "lastName": "Savina",
  "messageCount": 32,
  "twoFa": false,
  "twoFaDate": {
    "$date": "2025-04-20T16:06:51.005Z"
  },
  "automaticCheckDate": {
    "$date": "2025-04-21T13:28:28.635Z"
  },
  "remainingTime": {
    "$date": "2025-04-21T07:05:40.769Z"
  },
  "historySpamBlocks": [
    {
      "spamBlockDate": {
        "$date": "2025-04-05T08:36:00.000Z"
      },
      "spamBlockDays": 7
    },
    {
      "spamBlockDate": {
        "$date": "2025-04-01T08:33:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-04-20T14:32:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-04-22T05:08:00.000Z"
      },
      "spamBlockDays": 1
    }
  ],
  "personalChannel": "rRCAjPjhGkCK5eWf",
  "personalChannelDate": {
    "$date": "2025-03-29T15:22:52.989Z"
  },
  "lazyCheckDate": {
    "$date": "2025-04-20T21:03:48.335Z"
  },
  "username": "savina_content",
  "spamBlockReasons": [
    {
      "reason": "My account has been mistakenly limited. I need to message important contacts, so please restore full functionality. I didnt break any rules.",
      "date": {
        "$date": "2025-04-21T05:52:21.479Z"
      }
    }
  ],
  "spamBlockDate": {
    "$date": "2025-04-22T05:08:00.000Z"
  },
  "spamBlockDays": 1,
  "spamBlockInitDate": {
    "$date": "2025-04-21T05:52:21.484Z"
  }
},
{
  "_id": {
    "$oid": "67dd2b15f5fa1dc49466c97f"
  },
  "accountId": "6434357261-prefix-female-casino",
  "dc1": "33cb38af3b5b1fb1a3bf87ae822569a981635bf00e6c2af2e295f5bf12b3c9bd9b2d5e563d08b3c35e4e7d9b45fc29ad6811a9a434c30aa94649e6f2f79caa938b5c7fda1e5feee52357297a510ee72bc0bff868983ec2e46f7d5dd39214c2055f45d7264996189b36d85251fce3d6ad810749dfc62c79a6f8f7d3877119860c35199fc872744ff845238dc04046cc94caf3a3ef67968deed584b0588e2c9585d5e805c2a8dd4729490768e7096e05f85472038906599e9f6eca5967e6d294a1a94431f8170b30de00b4fccbdee6abaa93d88ab28c3a059c9cc0e6a0753761fca422478b5c36a3ae0c33b94683a1b80ed7172ac65a6fece60e8e1667dc03561a",
  "dcId": 1,
  "nextApiId": 2040,
  "dateUpdated": {
    "$date": "2025-04-21T21:49:02.573Z"
  },
  "banned": false,
  "firstName": "Ekaterina",
  "id": "6434357261",
  "lastName": "Suvorova",
  "messageCount": 32,
  "twoFa": false,
  "twoFaDate": {
    "$date": "2025-04-20T20:22:24.922Z"
  },
  "automaticCheckDate": {
    "$date": "2025-04-21T21:49:02.573Z"
  },
  "remainingTime": {
    "$date": "2025-04-21T12:04:12.156Z"
  },
  "personalChannel": "PsfsuIClNjy9EldB",
  "personalChannelDate": {
    "$date": "2025-03-29T15:26:54.342Z"
  },
  "lazyCheckDate": {
    "$date": "2025-04-21T21:49:02.259Z"
  },
  "historySpamBlocks": [
    {
      "spamBlockDate": {
        "$date": "2025-04-12T00:28:00.000Z"
      },
      "spamBlockDays": 3
    }
  ],
  "username": "suvorova_mere"
},
{
  "_id": {
    "$oid": "67dd2b15f5fa1dc49466c982"
  },
  "accountId": "7026541463-prefix-female-casino",
  "dc1": "41bbd5190aaf66281ab5bd79888bbc9e378ce02d980967ef71e6634bc8e8ce2d44681c0bbb21ec243454abd744de7e65aca62c7fd862f3471b957ebde67a70efc34e16a2841581450e3a20fbfaa8f55138a6bb5daa94ff39945f43026d1824ead71fb823a7fa0235ba93c1408c525781e51df6e63fad8c4ba2c6f18a9ba25ad79232c08f5d1d24df9ca96832c949e1bd36f32b854795185b5f34c099bed2d90183054b761dfe1d9542dd63d7d50fb9c94f66cf1039ef037a82a532da347216cbec82bdb0c943a993d73202e2760e481788ba045fa7ca3291bed2dfbfe7c28263356688c776d62265557b81e9271ccdfd02db1cea5a53f980b298bdb57cc6eef9",
  "dcId": 1,
  "nextApiId": 2040,
  "dateUpdated": {
    "$date": "2025-04-21T21:52:04.118Z"
  },
  "banned": false,
  "firstName": "Vera",
  "id": "7026541463",
  "lastName": "Tsyganova",
  "messageCount": 34,
  "twoFa": false,
  "twoFaDate": {
    "$date": "2025-04-20T20:22:24.924Z"
  },
  "automaticCheckDate": {
    "$date": "2025-04-21T21:52:04.118Z"
  },
  "remainingTime": {
    "$date": "2025-04-21T11:57:08.913Z"
  },
  "personalChannel": "rlryhgxXefQs6FEg",
  "personalChannelDate": {
    "$date": "2025-03-29T15:23:24.050Z"
  },
  "lazyCheckDate": {
    "$date": "2025-04-21T21:52:02.900Z"
  },
  "historySpamBlocks": [
    {
      "spamBlockDate": {
        "$date": "2025-04-06T10:32:00.000Z"
      },
      "spamBlockDays": 1
    }
  ],
  "username": "tsyganova_fatal"
},
{
  "_id": {
    "$oid": "67dd2b16f5fa1dc49466c984"
  },
  "accountId": "7848717515-prefix-female-casino",
  "dc2": "9f0cef29f1e4c99542cc1c435f286ba009d2e6aad3da7324925d40ed0ffb624d435b50026b807627264ffe00683ff31a5a08d7fb320ef7a373182d61e4a4b9dc0202765704d4c8d21f0b81171f5df1c32a594bbe7ef691121cc7c9bb5e6a02b9e4bda669f12da140743744c7babead699d281ba1211e9d7dac537c75101f83145eae5e4156aa3d09185e75dba6faab1e973fdfb7b697a12ba53f8c0c87b1f28f10d8354188113e51bac14c4b697361b74386ff9b466ac9e731da0c9e8ab5c32ae13a10f0fd68d4bc0e5c3ff2081836e9c24b48ced67bc8980e9d05dd0ad2b265f5ba40658f51f0a3700d301c877c8df6591faa490ec1818f02dd382470b94f27",
  "dcId": 2,
  "nextApiId": 2496,
  "dateUpdated": {
    "$date": "2025-04-21T21:51:03.521Z"
  },
  "banned": false,
  "firstName": "Alla",
  "id": "7848717515",
  "lastName": "Solovieva",
  "messageCount": 63,
  "twoFa": false,
  "twoFaDate": {
    "$date": "2025-04-20T20:22:24.549Z"
  },
  "automaticCheckDate": {
    "$date": "2025-04-21T21:51:03.521Z"
  },
  "remainingTime": {
    "$date": "2025-04-21T14:48:35.618Z"
  },
  "personalChannel": "jpLewW1HbAmbGCvp",
  "personalChannelDate": {
    "$date": "2025-03-29T15:24:25.469Z"
  },
  "lazyCheckDate": {
    "$date": "2025-04-21T21:51:03.120Z"
  },
  "username": "solovieva_final"
},
{
  "_id": {
    "$oid": "67dd2b17f5fa1dc49466c992"
  },
  "accountId": "7167465922-prefix-female-casino",
  "dc1": "8a45ea4120e7ec51250b64625e46601389d8ede9e4b359cde27911a3e7a607e737f520f1fe24861053580d41683629d9223538d9fbecf6462a21f17c5e8da9aa044e2980018a5edbe951793b4be0628291d83b5ec4d0a1dcfbe8797e2a34effcbe62c19eeafcd477e1c2b4031475b3a55081be30456e9727ff41cd10168a7844770bcdd0f1ad5c28570ed8de0bd973c8ad12137ee8d4401f15dd4199d8b4d2f370922f525258cb89c8fa4b1a7ef1ea063fe91bcac5baf6ef15ed52465bb289220f67047c30050bb6554303d00ed582fba3739838402c0e2bbbf54557dc0f0a3e766ae4414ad8c2494111a6893e69ae6b0f6b13deb81e1da6b01227b7ec445e72",
  "dcId": 1,
  "nextApiId": 2040,
  "dateUpdated": {
    "$date": "2025-04-21T13:30:28.595Z"
  },
  "banned": false,
  "firstName": "Alisa",
  "id": "7167465922",
  "lastName": "Karpova",
  "messageCount": 19,
  "twoFa": false,
  "twoFaDate": {
    "$date": "2025-04-20T20:22:24.532Z"
  },
  "automaticCheckDate": {
    "$date": "2025-04-21T13:29:30.170Z"
  },
  "remainingTime": {
    "$date": "2025-04-21T15:30:28.595Z"
  },
  "personalChannel": "KBpnuIsl2hFDYBen",
  "personalChannelDate": {
    "$date": "2025-03-29T15:27:19.173Z"
  },
  "lazyCheckDate": {
    "$date": "2025-04-20T21:11:53.504Z"
  },
  "username": "karpova_flaky",
  "historySpamBlocks": [
    {
      "spamBlockDate": {
        "$date": "2025-04-21T13:08:00.000Z"
      },
      "spamBlockDays": 1
    }
  ]
},
{
  "_id": {
    "$oid": "67dd2b18f5fa1dc49466c995"
  },
  "accountId": "7160851835-prefix-female-casino",
  "dc1": "3f24c017d44090f43b1ec59f30dd48fdf559c6a12f648813b16546f5b2e8ba593e1264a31f3facb3613099778719c8d0475bb54ee0f496be1c74cbe51cff158e9c037c8d9d24e242b8eb8d85313d8d80439a799adfbe345a61d4997ee61000d8f1f2c9fdbbbe20403b5654bc197f00d1ae014d6dc031a7c7103c9459e63e51505e3c0bc48f7e3c07d775632f878eca9ceab041b375bf6534d30b90b8e8adfd972021251f81fd14d34666501332d37f581771882ec48083e37a05aa94c26e4204f30c0df17125e42258e38ac47c6f2993e1fe12b434b0a60e1dc4c2cc0f858d3af44379d0f6ee4cb0350ed29f09be47042d13bfc56f52f796859c1fb51b4a9103",
  "dcId": 1,
  "nextApiId": 611335,
  "dateUpdated": {
    "$date": "2025-04-21T13:08:31.046Z"
  },
  "banned": false,
  "firstName": "Irina",
  "id": "7160851835",
  "lastName": "Malakhova",
  "messageCount": 35,
  "twoFa": false,
  "twoFaDate": {
    "$date": "2025-04-20T20:22:26.550Z"
  },
  "automaticCheckDate": {
    "$date": "2025-04-21T13:08:31.046Z"
  },
  "remainingTime": {
    "$date": "2025-04-21T11:22:35.280Z"
  },
  "personalChannel": "rtqITwdjUzzTJm6W",
  "personalChannelDate": {
    "$date": "2025-03-29T15:24:18.369Z"
  },
  "historySpamBlocks": [
    {
      "spamBlockDate": {
        "$date": "2025-04-02T06:27:00.000Z"
      },
      "spamBlockDays": 1
    }
  ],
  "lazyCheckDate": {
    "$date": "2025-04-20T20:39:31.423Z"
  },
  "username": "malakhova_alone"
},
{
  "_id": {
    "$oid": "67dd2b18f5fa1dc49466c99a"
  },
  "accountId": "6005394117-prefix-female-casino",
  "dc1": "87c3b52df9eabe0d890ebeaf41e9cc4e1ff701d856d30d6e04642a93f28c1aa5f1e649591fc50fb0f633982c4b639507c2703991bec34784ebaad4020abd2c4b2f20ff9f8afd8f015be767cd2467ba9823aad2de0072762170a94a141ed6abf0f261b0041698458e850eb7aa2c860180bb00509692f7b943283192dd8a240a637087d74d222b0ad2861c4ee991811fc3b3d921b35ab003a5ab7d542096f8efd7fab9d78240691449ca794cb5dcdccd4172ba567f088c7f520d8afe725a0aa29fa7f3e80405eac67405143845ad7a4ecfd2d4588699c33f06e475442158aff98be624152adeb6ee83e664f7965db7c84bd49a8189187e619fe74fadfc24f48fa2",
  "dcId": 1,
  "nextApiId": 2040,
  "dateUpdated": {
    "$date": "2025-04-21T13:05:30.432Z"
  },
  "banned": false,
  "firstName": "Raisa",
  "id": "6005394117",
  "lastName": "Rostova",
  "messageCount": 16,
  "twoFa": false,
  "twoFaDate": {
    "$date": "2025-04-20T16:06:51.004Z"
  },
  "automaticCheckDate": {
    "$date": "2025-04-21T13:05:30.432Z"
  },
  "remainingTime": {
    "$date": "2025-04-21T07:05:18.121Z"
  },
  "personalChannel": "za9RVeaMESPXtSdo",
  "personalChannelDate": {
    "$date": "2025-03-29T15:24:20.575Z"
  },
  "lazyCheckDate": {
    "$date": "2025-04-20T21:22:50.924Z"
  },
  "username": "rostova_harsh"
},
{
  "_id": {
    "$oid": "67dd2b19f5fa1dc49466c99e"
  },
  "accountId": "5566747011-prefix-female-casino",
  "dc1": "6d032f54573d04076ac205c6b21b83e8e1103248dbac2e2b8a409dd376745f1040d5f37f4b3b129766ff280c476ecc0d5f0d30a5ddb9b18b1ee71378dd7a7246617daa4163ee7d2b68315db67acdc16680c431bf796eb222c69697712c0384f5989e0896c4d7f47f838ca38ae6c5ad6a9be05d839afe75a8a1692a213299af843b5c3591497865db18682d6864d9a3faa344836c373ef3632258015eea66d501babc607f987ac9362f2c2bed4c247844b1b7f035464bfc39de229a11c1c1a3c6f993e3631d9d9ff8cd4935c010a806319e39b788b26254ea7662165ae1c541fbe40b4f5576732b9e0f013733c2e5c07a3500bd932e5fa6dbe35dfabcdd445f2c",
  "dcId": 1,
  "nextApiId": 2040,
  "dateUpdated": {
    "$date": "2025-04-21T13:29:30.389Z"
  },
  "banned": false,
  "firstName": "Alisa",
  "id": "5566747011",
  "lastName": "Korneyeva",
  "messageCount": 16,
  "twoFa": false,
  "twoFaDate": {
    "$date": "2025-04-20T16:06:45.196Z"
  },
  "automaticCheckDate": {
    "$date": "2025-04-21T13:29:30.389Z"
  },
  "remainingTime": {
    "$date": "2025-04-21T07:48:21.426Z"
  },
  "personalChannel": "PvBrrgGvH0dFvNZC",
  "personalChannelDate": {
    "$date": "2025-03-29T15:24:49.393Z"
  },
  "lazyCheckDate": {
    "$date": "2025-04-20T21:00:53.664Z"
  },
  "username": "korneyeva_square"
},
{
  "_id": {
    "$oid": "67dd2b19f5fa1dc49466c9a1"
  },
  "accountId": "7840919186-prefix-female-casino",
  "dc1": "b8196441ebc952ab65a9b32ca876acfc7423ca2703e4d180eac83f31713293d8184966a8b63272528f7f5d7b0786a153e5c781fb1d8ca82354a61a98d13ca97443de7fb64692fdb6dfa500562b55f92328a8226cf29f7d4a0deadf5bb1731772854352f7f839933e248652bb21db22753d8bc4bdfc227d6c79ad9a74382170b0269cdcab0aba3b41fd33f4589d0df2fa04d605850801e1f9961d031e0e39c3545ee780f3a39ae155a90aa9e23c91cd34161e7791540dc128f547cc1721aa31754f4fccdd0dad9b8b240f26b60860ca9f7b82e7050853f12d82bbd2c7b9eef1b90ccf9105e563fd43c9cac4a8ab88fe922f0337f2702aa9f781b64f78dc578397",
  "dcId": 1,
  "nextApiId": 2040,
  "dateUpdated": {
    "$date": "2025-04-21T13:26:31.048Z"
  },
  "banned": false,
  "firstName": "Sofia",
  "id": "7840919186",
  "lastName": "Shevchukova",
  "messageCount": 39,
  "twoFa": false,
  "twoFaDate": {
    "$date": "2025-04-20T20:22:24.511Z"
  },
  "automaticCheckDate": {
    "$date": "2025-04-21T13:26:31.048Z"
  },
  "remainingTime": {
    "$date": "2025-04-21T12:11:55.586Z"
  },
  "personalChannel": "UIWJbW7dsBZrpsjl",
  "personalChannelDate": {
    "$date": "2025-03-29T15:25:49.796Z"
  },
  "lazyCheckDate": {
    "$date": "2025-04-20T21:04:52.765Z"
  },
  "username": "shevchukova_amused"
},
{
  "_id": {
    "$oid": "67dd2b19f5fa1dc49466c9a4"
  },
  "accountId": "6310570147-prefix-female-casino",
  "dc1": "61c87139e277a9db2ba24e91a50ca9c57eaaa37ea6a4e0cec4b714efa6302d22d2079d804eee71bc775bdbc9cdb2365d7c6546db5b89b995dd8911c9e0fac1a8124d4721dbfc294865486f5601f63a54d48e469612e636545b25d6787395445968a2b2b43fc5079c7e794a6b02cd10323ca817259b2144720315ff0730d65c2ff7e81926662e96e4e5719a8665f55ceab0001c6c180b56c4cb3c90fc98f10fea77aa55782f8b2b44ca8e05a7341271cd4876d979a224a39ffc6f9ea21440b7198fab04fbebcb76309a714dec9f759aa208341e0b10e83c8e26829b4169007419032ea1e98acae7dc5dbc56cdff6e89d1798475ca49ec6f0bb5f2a60b1ac9b9c5",
  "dcId": 1,
  "nextApiId": 2040,
  "dateUpdated": {
    "$date": "2025-04-21T13:08:30.956Z"
  },
  "banned": false,
  "firstName": "Lubov",
  "id": "6310570147",
  "lastName": "Shishkina",
  "messageCount": 39,
  "twoFa": false,
  "twoFaDate": {
    "$date": "2025-04-20T20:22:27.268Z"
  },
  "automaticCheckDate": {
    "$date": "2025-04-21T13:08:30.956Z"
  },
  "remainingTime": {
    "$date": "2025-04-21T14:02:31.972Z"
  },
  "personalChannel": "u6MMXIeBDwWyVwET",
  "personalChannelDate": {
    "$date": "2025-03-29T15:24:55.571Z"
  },
  "lazyCheckDate": {
    "$date": "2025-04-20T20:41:31.570Z"
  },
  "username": "shishkina_evident"
},
{
  "_id": {
    "$oid": "67dd2b1af5fa1dc49466c9ac"
  },
  "accountId": "7609949703-prefix-female-casino",
  "dc1": "ba90beb41082aa1d3ebf1b01f9ee62017d7e88a7483382c66a5e1ad9052fa0f715b3306fd75244c437d20154aa28be16fa9dc5d10d6c34c411fd3de2570c3a9648ed9837a89b38de38a6a26de2b4ef611c155fa0a88564f506efb21c0e5cc788c19fbc1aecb973a2874b35e0923693fafd09b98700fdf7f6b685b05bb977abc5571442dfa8d0cc86ceef9859c7a966fa89c2a017572aa89050aa7b33151682f1681e7f8ca61ec65f31301a75b42a8631d55df5661b0471ba9675800b5d23444c5d13c1a6b673d5c818aa9832e831ad3b741d82c67bb93c9771dbaacbd9860811905dfee7dfcedf7281b58477ca5a9f27de48189178253cba57ad9d30bdf52632",
  "dcId": 1,
  "nextApiId": 2040,
  "dateUpdated": {
    "$date": "2025-04-21T21:53:03.823Z"
  },
  "banned": false,
  "firstName": "Arina",
  "id": "7609949703",
  "lastName": "Bogdanova",
  "messageCount": 30,
  "twoFa": false,
  "twoFaDate": {
    "$date": "2025-04-20T20:22:27.558Z"
  },
  "automaticCheckDate": {
    "$date": "2025-04-21T21:53:03.823Z"
  },
  "remainingTime": {
    "$date": "2025-04-21T12:09:36.243Z"
  },
  "historySpamBlocks": [
    {
      "spamBlockDate": {
        "$date": "2025-03-29T11:13:00.000Z"
      },
      "spamBlockDays": 1
    }
  ],
  "personalChannel": "cZKcNZskFSbzBEV2",
  "personalChannelDate": {
    "$date": "2025-03-29T15:23:07.325Z"
  },
  "lazyCheckDate": {
    "$date": "2025-04-21T21:53:03.512Z"
  },
  "username": "bogdanova_keen"
},
{
  "_id": {
    "$oid": "67dd2b1af5fa1dc49466c9af"
  },
  "accountId": "1479612353-prefix-female-casino",
  "dc1": "37f14a62ac7af2a560138e3a959b0c59a17f7c7e24a43ce1e1e1c3b884e7356744d35a964479de03f88701aec976edb338da5b0f072973705a6bc93cc1dfcec62c626e9f008e6f44334fc990982d124989a2e3c1e6f69fff7c7155efd248ae197b3a3766d954fb1bfc94fe007bf7af940c8fddb1f2935f0f7318fbff911cb2c0ca0e59f01a5bb3401c8dfc7733485bfd83daff672f59cbd352fc3733a24275377571a1abc9d6602ce471742ece8e4ed62f20ea8e851587df9f74f8f47bb2559d8852c1bead374192c90d4bfddf3102e9fd3f8fd5ffb8b7deefde94e5b55f3579ca529524b1c6a7c7208ee289d6c1b3d7051b62cc9deda2749e7a616260fb7429",
  "dcId": 1,
  "nextApiId": 2040,
  "dateUpdated": {
    "$date": "2025-04-21T13:25:30.118Z"
  },
  "banned": false,
  "firstName": "Liza",
  "id": "1479612353",
  "lastName": "Samoylova",
  "messageCount": 34,
  "twoFa": false,
  "twoFaDate": {
    "$date": "2025-04-20T16:06:53.938Z"
  },
  "automaticCheckDate": {
    "$date": "2025-04-21T13:25:30.118Z"
  },
  "remainingTime": {
    "$date": "2025-04-21T09:38:51.770Z"
  },
  "personalChannel": "zLZuh3pwIoXSPhiy",
  "personalChannelDate": {
    "$date": "2025-03-29T15:26:00.965Z"
  },
  "lazyCheckDate": {
    "$date": "2025-04-20T20:44:29.400Z"
  },
  "username": "samoylova_solar"
},
{
  "_id": {
    "$oid": "67dd2b1bf5fa1dc49466c9b1"
  },
  "accountId": "7026989467-prefix-female-casino",
  "dc1": "2149fc2c09acedadca98d5960cbd3c043994d53f84ac59aa50f8d2553b34ddd9fdc1ea5ff244a3c134fbb2e3af5e6c6903c8ddae9f4f29000b6e4ab56cbf978b01e99364899f1209f9441a13d12838bf03d683b22871ba30a16df311300a7ec94b4f95510afdb64546e75cf1c76ec7b8f99bce57f76f86de40b8c9f26b99614358dd3bfa32734abe357fbd0f1c638b40edad66cd0b68ce328651e528176b9f16ecbaefed93cce43268c4cd7ef895eae4bb1d79e2f467e930ac1ecf961462c6c84ad06d074740a524c13616c226341dbb4e5cddab83cc525dd420303d008b0099e952b2d364d7299ebd6fcfef2c0d605f8ca02921718974cc4e0554a9826bcfd7",
  "dcId": 1,
  "nextApiId": 2040,
  "dateUpdated": {
    "$date": "2025-04-21T13:22:30.102Z"
  },
  "banned": false,
  "firstName": "Sofia",
  "id": "7026989467",
  "lastName": "Kalinina",
  "messageCount": 34,
  "twoFa": false,
  "twoFaDate": {
    "$date": "2025-04-20T16:06:52.507Z"
  },
  "automaticCheckDate": {
    "$date": "2025-04-21T13:22:30.102Z"
  },
  "remainingTime": {
    "$date": "2025-04-21T09:55:30.113Z"
  },
  "personalChannel": "BFTZceIM1PpmvSTX",
  "personalChannelDate": {
    "$date": "2025-03-29T15:26:16.131Z"
  },
  "lazyCheckDate": {
    "$date": "2025-04-20T20:48:29.975Z"
  },
  "username": "kalinina_electric"
},
{
  "_id": {
    "$oid": "67dd2b1bf5fa1dc49466c9bc"
  },
  "accountId": "5962085646-prefix-female-casino",
  "dc1": "13cdf51011c60dcfec0958eb8b8b7853c53af1dc196b236a5c3a54dba4667515b055130687d1091e51a3517ec50fcfc25630bb25aabe602bab2a1100e433f331672820f8bd42ed58d56a67b04639aadc97a107b022b799363bb16a200abfd84a8ad8fdf853af5f00a9322023354a1bd4e85769e0cc292650678732d780908603103f7aebfabbd46debc7930c8c06a24d83215c498a0dd1e43e147c0a568f2237a497bb7baa9a3c7623fd738f5a05852aadf51082bf3d1940607cf6a67f38aa06fe5b7b998c475910850971b9a9654757da9a77f8bb6d3c00b4a77ba8147e9ccd08d6848d0e5e0a847b8719b0940af6b23a006f48cb6c5a8e2ee6bdae5f099355",
  "dcId": 1,
  "nextApiId": 2040,
  "dateUpdated": {
    "$date": "2025-04-21T21:52:03.685Z"
  },
  "banned": false,
  "firstName": "Rita",
  "id": "5962085646",
  "lastName": "Maksimova",
  "messageCount": 16,
  "twoFa": false,
  "twoFaDate": {
    "$date": "2025-04-20T20:22:26.548Z"
  },
  "automaticCheckDate": {
    "$date": "2025-04-21T21:52:03.684Z"
  },
  "remainingTime": {
    "$date": "2025-04-21T07:01:20.059Z"
  },
  "personalChannel": "PibIBKTFCmZWQIr6",
  "personalChannelDate": {
    "$date": "2025-03-29T15:23:41.554Z"
  },
  "lazyCheckDate": {
    "$date": "2025-04-21T21:52:03.373Z"
  },
  "username": "maksimova_continuous"
},
{
  "_id": {
    "$oid": "67dd2b1bf5fa1dc49466c9c0"
  },
  "accountId": "7469772180-prefix-female-casino",
  "dc1": "69ed854bd8626d5ec331d4843569454ce81aeef3550949381faacf5cddebd69e052e1014abc99f9f5d4d4a3694e8261f2086d3cec3b0db718ba1064aa61933bb0ae2fbcf538a75bf28bc1a58468a81ae0c08b4378022aaead17dfaaccd8624b512aaf3e36c9aaaba357f10668aaec0bf13f39ef03249111a4f02f58ec367b8c2a8a70fe044acca48f384b0135698b2fe0854620740657a7dd491ce0b640f38bf8f2238d557556eb2f79e5e1ea39a5d05a6701a116336a356235d4952d69f56fad773aa3a5eae5adb13d18c7cd755eb0650355076d8f87cde61a3feb568b90509e80cc2bfd625a7af77f72c7b321f21bb6ce4f4e21bbec21a7b6863bae6072250",
  "dcId": 1,
  "nextApiId": 2040,
  "dateUpdated": {
    "$date": "2025-04-21T13:20:30.937Z"
  },
  "banned": false,
  "firstName": "Anna",
  "id": "7469772180",
  "lastName": "Sidorova",
  "messageCount": 33,
  "twoFa": false,
  "twoFaDate": {
    "$date": "2025-04-20T20:22:26.580Z"
  },
  "automaticCheckDate": {
    "$date": "2025-04-21T13:20:30.937Z"
  },
  "remainingTime": {
    "$date": "2025-04-21T11:23:18.773Z"
  },
  "personalChannel": "jYIUdpb1ZxZlSPkg",
  "personalChannelDate": {
    "$date": "2025-03-29T15:26:26.100Z"
  },
  "historySpamBlocks": [
    {
      "spamBlockDate": {
        "$date": "2025-04-03T18:25:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-04-09T11:14:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-04-09T05:13:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-04-14T16:19:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-04-21T12:50:00.000Z"
      },
      "spamBlockDays": 1
    }
  ],
  "lazyCheckDate": {
    "$date": "2025-04-20T21:23:52.113Z"
  },
  "username": "sidorova_smiling"
},
{
  "_id": {
    "$oid": "67dd2b1cf5fa1dc49466c9c3"
  },
  "accountId": "6273386777-prefix-female-casino",
  "dc1": "0f5a4b11e750eb6f0a084c766dd2935e0a84cb31d549de7c915cbeb0ae57f84161f2eb7e4e4e39a30c964345e62f9219fb2558f05735c92fa0b77c101254848f8c87784f7d782c2d9d2061cf96f4aaf3251b077faa40a1b45e21748620a32132f6b3462bd76c1aeefd64b458deae62cfa8d86f79ea52de4056500b0f49b2a2261788fccafab9bb695db36f50375a4151e3f5a863462ebfcc6ea91283a075c5f40d65548e850cf1a7b6704f95a118db19ccd20c8476ba17033e8fa63d3e954a42b1194d8afe23752ee1df6fd9f6c0d501713bab093bceca91d6607e00263ecf2c554c0824bf6a1416e973d060318f6aca3a59f9a73ad6ba990ba2aa517cd03e2f",
  "dcId": 1,
  "nextApiId": 2040,
  "dateUpdated": {
    "$date": "2025-04-21T13:14:30.090Z"
  },
  "banned": false,
  "firstName": "Daria",
  "id": "6273386777",
  "lastName": "Shevchukova",
  "messageCount": 18,
  "twoFa": false,
  "twoFaDate": {
    "$date": "2025-04-20T20:22:28.194Z"
  },
  "automaticCheckDate": {
    "$date": "2025-04-21T13:14:30.090Z"
  },
  "remainingTime": {
    "$date": "2025-04-21T07:09:54.166Z"
  },
  "personalChannelDate": {
    "$date": "2025-03-29T21:35:17.485Z"
  },
  "personalChannel": "k1dzcWBZSgyiwLKP",
  "lazyCheckDate": {
    "$date": "2025-04-20T21:09:52.474Z"
  },
  "historySpamBlocks": [
    {
      "spamBlockDate": {
        "$date": "2025-04-09T13:03:00.000Z"
      },
      "spamBlockDays": 1
    }
  ],
  "username": "shevchukova_chubby"
},
{
  "_id": {
    "$oid": "67dd2b1cf5fa1dc49466c9c5"
  },
  "accountId": "6087139307-prefix-female-casino",
  "dc2": "c3561748da867f8200e73ed5c30df2ff30ef3f2af40a8dbbd03bb39ef4058058999e47b056f136afc5ebe9d52ebaa2761529085734cc8d126885bc59ae1751a20b2e1d7da8a440dd81bb82ebba353ecff3891d14a3c7087d1be3c2517e414a2aed38952533a6ff5921347cc787241c61b2a28a88db0e20a5e7f97d0cf69b35a4dff8409775d0e32954eee34f7ef10a9f3fbefcd4b0dddb6c9023dd3cec358346f8b1438ec185d3891adbd2e3da2eff9220b1043c6d77d53dee6661a64a0dab3e8b0d37ef82dbdd0780a2a8f3dbfef6d2b655f1c84baebe773f581c93a94e9b0e6ee6e2cf412fee6a40af0e151a04e5c9300ce559a52488cfcc2c2ba57dd51114",
  "dcId": 2,
  "nextApiId": 611335,
  "dateUpdated": {
    "$date": "2025-04-21T13:30:30.246Z"
  },
  "banned": false,
  "firstName": "Yulia",
  "id": "6087139307",
  "lastName": "Zaitseva",
  "messageCount": 58,
  "twoFa": false,
  "twoFaDate": {
    "$date": "2025-04-20T16:06:53.936Z"
  },
  "automaticCheckDate": {
    "$date": "2025-04-21T13:30:30.246Z"
  },
  "historySpamBlocks": [
    {
      "spamBlockDate": "INFINITY",
      "spamBlockDays": 0
    },
    {
      "spamBlockDate": {
        "$date": "2025-04-08T08:43:00.000Z"
      },
      "spamBlockDays": 1
    }
  ],
  "remainingTime": {
    "$date": "2025-04-21T13:46:02.158Z"
  },
  "personalChannel": "QGefXxTAuplnFm1Q",
  "personalChannelDate": {
    "$date": "2025-03-29T15:23:03.739Z"
  },
  "lazyCheckDate": {
    "$date": "2025-04-20T20:38:28.602Z"
  },
  "username": "zaitseva_dependent"
},
{
  "_id": {
    "$oid": "67dd2b1cf5fa1dc49466c9c9"
  },
  "accountId": "7098039343-prefix-female-casino",
  "dc1": "037bf0cbc39f1bd7f78e430581e1c89e4932275d876ba254f2494b3df88aee22063116ab125c9d8cc1d414eb6da5489eaceb1c265aa6174fb8050fcfbea41f6d9ef28f284d4cd2bb8264f7d8227bad798f19941517e304bdd2c4c09a868d27b356d0327b1bdd60dd0693f580ea4d13a0b7609aac16999af1f8a57bbf6ce224c165b482f37c16285de4228cf6372398d7e9468a5ec7ee60f1e9f225f5b1646ff8dd50cb961418d958f1afc544011307ad331314e348f64cbc118195a487bac36bda243d914e167a600c90f50e3f0dcbf88dfb924721b3154c301a049336d9cc88ac487b2b09e9cd424ea087781a7cbe168e4c71d28fd7eaac100d2733eca7df9e",
  "dcId": 1,
  "nextApiId": 2040,
  "dateUpdated": {
    "$date": "2025-04-21T13:23:30.937Z"
  },
  "banned": false,
  "firstName": "Yulia",
  "id": "7098039343",
  "lastName": "Sorokina",
  "messageCount": 14,
  "twoFa": false,
  "twoFaDate": {
    "$date": "2025-04-20T20:22:25.609Z"
  },
  "automaticCheckDate": {
    "$date": "2025-04-21T13:23:30.937Z"
  },
  "remainingTime": {
    "$date": "2025-04-21T07:14:42.618Z"
  },
  "historySpamBlocks": [
    {
      "spamBlockDate": {
        "$date": "2025-04-04T10:32:00.000Z"
      },
      "spamBlockDays": 7
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-30T09:24:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-04-03T05:37:00.000Z"
      },
      "spamBlockDays": 3
    }
  ],
  "personalChannel": "juOzaJEriz5iLCbD",
  "personalChannelDate": {
    "$date": "2025-03-29T15:25:49.411Z"
  },
  "lazyCheckDate": {
    "$date": "2025-04-20T21:17:53.441Z"
  },
  "username": "sorokina_nearby"
},
{
  "_id": {
    "$oid": "67dd2b1cf5fa1dc49466c9cc"
  },
  "accountId": "5545846356-prefix-female-casino",
  "dc1": "4af1b0391c63460b6293c1677e8495017f6ee9eb78ea4e2160ffae56517228ea474259f4bb813778eb24427ff5cccd7b13ed2177b93a661191eaa0976e59aea4eb385049f2f99e6cf284ad34f39e908cb768ba21b313f0564c4ba2f40878fe098bb015be865a012908311a15452caa1a1970e9a6e7aa398cad77aeee80f047740b8ef1b0168be1150f3fedb43589daea1d5dbfbd190030d522e396aa09193341c7556e952697c747c3bf983a6489d456e1b69bc002f517940c466477caafc49a61547b679358239ce7f533230ffac491234f8e4247806dc34473f9fd82dae7e78725e6defc0e7fa1a6e488ff0c9863e855db009fad780cea1004ed2d09d390ce",
  "dcId": 1,
  "nextApiId": 2040,
  "dateUpdated": {
    "$date": "2025-04-21T13:23:30.535Z"
  },
  "banned": false,
  "firstName": "Irina",
  "id": "5545846356",
  "lastName": "Denisova",
  "messageCount": 16,
  "twoFa": false,
  "twoFaDate": {
    "$date": "2025-04-20T20:22:27.269Z"
  },
  "automaticCheckDate": {
    "$date": "2025-04-21T13:23:30.535Z"
  },
  "remainingTime": {
    "$date": "2025-04-21T07:12:25.294Z"
  },
  "personalChannel": "KtCmEHEQxcoS3hZW",
  "personalChannelDate": {
    "$date": "2025-03-29T15:27:00.505Z"
  },
  "lazyCheckDate": {
    "$date": "2025-04-20T21:00:52.866Z"
  },
  "historySpamBlocks": [
    {
      "spamBlockDate": {
        "$date": "2025-04-08T18:45:00.000Z"
      },
      "spamBlockDays": 1
    }
  ],
  "username": "denisova_widespread"
},
{
  "_id": {
    "$oid": "67dd2b1df5fa1dc49466c9d0"
  },
  "accountId": "7104861969-prefix-female-casino",
  "dc1": "b5b8ad710ccba68c80cce9b29780d2769cb480fa07121e8cf63c1809be861b8c98d695332e30d375f70e6e71567aa5a49df44f85ba65a62b4d075ce7b9ad7aa7092f5179907e01dd562a9d57474330c2794b49662fa0791f5f59ab35b488fdb36fed3196abfe7cd6967d1a073f11b2365a5c0cbe7b2f44240d77d1fb084ec09915740330713823cded5a99f833f7def3cb287e4c362bcec9065ae1a0648ab93b609547555c96ffa828099fb0ca8efbaae014aeac8206db507106cc9cfecb7f479dfdc833863a089ac6d1a673b0d335b0585cd5fae62e03163a1b7b0ea59ff1050c9a2fb3f4ed68d301e5fc4385239797d7a8963f99652ace21b0fecf70607387",
  "dcId": 1,
  "nextApiId": 2040,
  "dateUpdated": {
    "$date": "2025-04-21T21:51:01.834Z"
  },
  "banned": false,
  "firstName": "Alla",
  "id": "7104861969",
  "lastName": "Vikhrova",
  "messageCount": 33,
  "twoFa": false,
  "twoFaDate": {
    "$date": "2025-04-20T16:06:47.274Z"
  },
  "automaticCheckDate": {
    "$date": "2025-04-21T21:51:01.834Z"
  },
  "remainingTime": {
    "$date": "2025-04-21T09:11:57.149Z"
  },
  "personalChannel": "JovOPxtwfullwm3H",
  "personalChannelDate": {
    "$date": "2025-03-29T15:24:56.335Z"
  },
  "lazyCheckDate": {
    "$date": "2025-04-21T21:51:01.600Z"
  },
  "username": "vikhrova_lazy"
},
{
  "_id": {
    "$oid": "67dd2b1df5fa1dc49466c9d4"
  },
  "accountId": "8156928523-prefix-female-casino",
  "dc1": "4cbb1931709a29dde7a5070f8ca629f6fa98f9d0b4ac030c5ea42e3d169991ec687138bc04899faa973e3f801babb4a62144a9ee77723b7367047c63a735312ea45f156fa62bfb4aa50fd2eaebc08de11ab139e6746ddbc5a3324ebc62b7ca378f0437d12c83c9352a7af12b79a16888afcbfef857a9b1edd69b79028dd9140edefbab30e9b1b841636f054fbe1b2b11bdd42a66feca4bfc6e2653091a4313ffcf5dbd3d960b7d70161cc241986ed74f35a20bde16150a20fed3f11686a0c4f6261cbb61c2401f1a0dfc167bdc1bb770a0eb613e8c40528d5f2c64465fc9b559812b80de90a5d30205c7cfa89d8c60c20e0b182e252734294612ed2171d32a88",
  "dcId": 1,
  "nextApiId": 2040,
  "dateUpdated": {
    "$date": "2025-04-21T13:21:30.114Z"
  },
  "banned": false,
  "firstName": "Rita",
  "id": "8156928523",
  "lastName": "Sinitsyna",
  "messageCount": 34,
  "twoFa": false,
  "twoFaDate": {
    "$date": "2025-04-20T16:06:52.150Z"
  },
  "automaticCheckDate": {
    "$date": "2025-04-21T13:21:30.114Z"
  },
  "remainingTime": {
    "$date": "2025-04-21T11:57:13.076Z"
  },
  "personalChannel": "LaIKnwjFrCqkc0JH",
  "personalChannelDate": {
    "$date": "2025-03-29T15:24:00.625Z"
  },
  "lazyCheckDate": {
    "$date": "2025-04-20T20:28:31.009Z"
  },
  "username": "sinitsyna_verbal"
},
{
  "_id": {
    "$oid": "67dd2b1df5fa1dc49466c9da"
  },
  "accountId": "7074363717-prefix-female-casino",
  "dc1": "9642e71dc4880f5795fa9818b472fcb580f01c0fb4845d951420572d5a6d4f41e50e3c271d860a9d28efcfb8c3a7e4b1e4176c790ec0b7df484b92041bc2221628debc8f961d62a12391ca6d2af9377e726e96b0bfedca8a68c7e5332de7fab68347f449a105054b8a5cf5dec7755e277eb2bfb1de172f1e3d4412b1880a8c2531ce7eb9bbcdf2e31c376d4111c38121b5258948d5bba5148beed45f9feecebebead2e256d372df210b0835624f9d56e1b2202fe088dc61d1550a10a383c62a6226d64070c8708ed949a887a84f66b1942e8fa1236c0cea4c78ba5a0c42444e2e75916282459cc6924fb23be572e4b83a120be280fd086ce3c344b04d9b6482e",
  "dcId": 1,
  "nextApiId": 2040,
  "dateUpdated": {
    "$date": "2025-04-21T13:29:28.621Z"
  },
  "banned": false,
  "firstName": "Alisa",
  "id": "7074363717",
  "lastName": "Antonova",
  "messageCount": 35,
  "twoFa": false,
  "twoFaDate": {
    "$date": "2025-04-20T16:06:52.152Z"
  },
  "automaticCheckDate": {
    "$date": "2025-04-21T13:29:28.621Z"
  },
  "historySpamBlocks": [
    {
      "spamBlockDate": "INFINITY",
      "spamBlockDays": 0
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-29T06:36:00.000Z"
      },
      "spamBlockDays": 1
    }
  ],
  "remainingTime": {
    "$date": "2025-04-21T11:32:43.148Z"
  },
  "personalChannel": "aBnkSj2pzepKOdmC",
  "personalChannelDate": {
    "$date": "2025-03-29T15:27:26.683Z"
  },
  "lazyCheckDate": {
    "$date": "2025-04-20T20:38:30.771Z"
  },
  "username": "antonova_disgusted"
},
{
  "_id": {
    "$oid": "67dd2b1ef5fa1dc49466c9e4"
  },
  "accountId": "6964423032-prefix-female-casino",
  "dc1": "48bc7976298d44e89349b13cc43e287cd2e51e586126d68ed783fae8b1366e1360e162523b322f5cee60b3aa16889e245226e7cfa9227dcb20e23e8d51d9e1127dbfd65184bec34de138efadb0976ee44beab8f27cbd03687d48312439b5cc41186d45d4ff7f738942694922606cc42b695bfad083eeedd2e5a744a5433a3c8aa28085c52a3b73adcac48ffc76ddef54afde99025ffad9085a5a3dc7e6cf3aa4fe037055612e825749f7a51ca7b034d76978a2f26a89773813f854c9977320234eff83ad7dbc1c5e193bd8d566d512ff3787853a04dd3e0977bd8af243b451860a4a12afb79b8d70fe1622378921208367c7c73a8405cc4dd378f10afddd8170",
  "dcId": 1,
  "nextApiId": 2040,
  "dateUpdated": {
    "$date": "2025-04-21T13:30:30.334Z"
  },
  "banned": false,
  "firstName": "Arina",
  "id": "6964423032",
  "lastName": "Gromova",
  "messageCount": 18,
  "twoFa": false,
  "twoFaDate": {
    "$date": "2025-04-20T16:06:47.287Z"
  },
  "automaticCheckDate": {
    "$date": "2025-04-21T13:30:30.334Z"
  },
  "remainingTime": {
    "$date": "2025-04-21T07:16:28.729Z"
  },
  "personalChannel": "i7LZIkPzvRjHQNSe",
  "personalChannelDate": {
    "$date": "2025-03-29T15:25:33.069Z"
  },
  "lazyCheckDate": {
    "$date": "2025-04-20T21:19:52.202Z"
  },
  "username": "gromova_open"
},
{
  "_id": {
    "$oid": "67dd2b1ff5fa1dc49466c9e9"
  },
  "accountId": "6241208718-prefix-female-casino",
  "dc1": "afb8d6f8997a2a0b7b2f1c0032371372f0a580f27d68d20cb45b182cb78d31ab6c50a94ec1235ea5496eab56b35134bb243d1a109217c89d7d8fd0bb7805f56448aeb136d3d222197fbc43669553598571d1d2bd523e7fa1ba127573edd2b459a32abe040320dbb3a269c1c5badaa85a98678a33d5cc27ddcb8ed256c19cdf38a470ca7095c2980998855bfa835c49619203c52a97136865a6d0b213dafb413d94495cc30850b7e1d9aa995c98a6b055d6c6bd7c9c6cf1bc9407b79220d5e923333373abf514d29ddd50fc0d4b60f0c42ff6fc075836e101a33bb7b992252c254ec1b5d9a91c221038dd4c4f5259fc32c2cbb0a3406736bff84b6d1312bf91c7",
  "dcId": 1,
  "nextApiId": 2040,
  "dateUpdated": {
    "$date": "2025-04-21T13:16:30.864Z"
  },
  "banned": false,
  "firstName": "Evgenia",
  "id": "6241208718",
  "lastName": "Eroshkina",
  "messageCount": 32,
  "twoFa": false,
  "twoFaDate": {
    "$date": "2025-04-20T20:22:25.247Z"
  },
  "automaticCheckDate": {
    "$date": "2025-04-21T13:16:30.864Z"
  },
  "remainingTime": {
    "$date": "2025-04-21T10:30:23.042Z"
  },
  "personalChannel": "aGAkKfSOCJcnih3Q",
  "personalChannelDate": {
    "$date": "2025-03-29T15:23:37.228Z"
  },
  "lazyCheckDate": {
    "$date": "2025-04-20T21:42:51.224Z"
  },
  "username": "eroshkina_foolish"
},
{
  "_id": {
    "$oid": "67dd2b1ff5fa1dc49466c9ee"
  },
  "accountId": "6245417411-prefix-female-casino",
  "dc1": "53e674afcf2b7ed7b7878f9c6e187b6697e7d52ecf128ecc002a09a1bd7d6ce34dc2afcc509725e7553264af36c96c48b8b7ea16cc0453cd8b1860877d8d8275965d6e18db15740180f24a5a684359ee5e0c57788e5cbbb5e41b026ad1bc4e1fb01ad0a2ce49076b4ba8045df4a197e89a8dd27f81524e2744fba16982f66c481c1c2fa5e130c014992c2466e9a52aa23b787fbd83a41a7626da69d291355c0198959a3d072326cafda73c7ba109a78f330c1cce864b1f04c060246543c7f82288b3ea40213c73e105d089d9d0fd858756f308be5c77f55cb7e01c7513ec4036c18013687b9c427dc05825eb51be013c7f430c12cd7e90403597adce519347fc",
  "dcId": 1,
  "nextApiId": 2040,
  "dateUpdated": {
    "$date": "2025-04-21T13:12:30.354Z"
  },
  "banned": false,
  "firstName": "Elena",
  "id": "6245417411",
  "lastName": "Ustinova",
  "messageCount": 35,
  "twoFa": false,
  "twoFaDate": {
    "$date": "2025-04-20T20:22:27.263Z"
  },
  "automaticCheckDate": {
    "$date": "2025-04-21T13:12:30.354Z"
  },
  "remainingTime": {
    "$date": "2025-04-21T09:49:10.565Z"
  },
  "historySpamBlocks": [
    {
      "spamBlockDate": {
        "$date": "2025-03-29T08:36:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-04-01T11:34:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-31T05:30:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-04-08T13:58:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-04-22T07:49:00.000Z"
      },
      "spamBlockDays": 1
    }
  ],
  "personalChannel": "oatFC7ahYGVyvjCv",
  "personalChannelDate": {
    "$date": "2025-03-29T15:27:25.708Z"
  },
  "lazyCheckDate": {
    "$date": "2025-04-20T21:14:50.673Z"
  },
  "username": "ustinova_satisfied",
  "spamBlockReasons": [
    {
      "reason": "Im unable to message non-mutual contacts due to an error, impacting my ability to reach essential connections. Please restore full messaging functionality, considering my clean record and absence of suspicious activity. Thanks for understanding.",
      "date": {
        "$date": "2025-04-21T08:35:53.716Z"
      }
    },
    {
      "reason": "Im reaching out about my accounts recent issue. I cant send messages to non-mutual contacts, which is a mistake as Ive followed all guidelines. Please review and restore my full messaging capabilities.",
      "date": {
        "$date": "2025-04-21T12:00:51.367Z"
      }
    }
  ],
  "spamBlockDate": {
    "$date": "2025-04-22T07:49:00.000Z"
  },
  "spamBlockDays": 1,
  "spamBlockInitDate": {
    "$date": "2025-04-21T08:35:53.720Z"
  }
},
{
  "_id": {
    "$oid": "67dd2b20f5fa1dc49466c9f1"
  },
  "accountId": "5863249534-prefix-female-casino",
  "dc1": "a9924afe3a07d30914a15bb508f9a3d4e2a3b12d08250a100c29a5d5a7a7675024af852c284e3e36a05b25eb5716b5563f9bb844b10ed2b2f776d21af06b70a6addbf87c652e5a86d7d95b3520de57ff148dd8d78fa695d66265056fd74c61401ba4d63e7337eb26043ae0e28ab16098e65480d69b21d6842500073b71c2728baab0a0af2eb4bfb4931c8f5f0ec1a5b9cefa77bdac51095b3fc49aeb1c876067e7ac35cc624b2e13986dad83f1f00cadc53a770e830006d48242a49edd14f65caad6e57a1ca61731a8d6b417a4c916e8683d800d439eac7bae1ab2a1b0994667ccf666b2b7627238a5093a4b19809de9f22afebc5bf60f56fa474708d4319ab0",
  "dcId": 1,
  "nextApiId": 2040,
  "dateUpdated": {
    "$date": "2025-04-21T13:16:30.950Z"
  },
  "banned": false,
  "firstName": "Vera",
  "id": "5863249534",
  "lastName": "Potapova",
  "messageCount": 17,
  "twoFa": false,
  "twoFaDate": {
    "$date": "2025-04-20T20:22:27.260Z"
  },
  "automaticCheckDate": {
    "$date": "2025-04-21T13:16:30.950Z"
  },
  "remainingTime": {
    "$date": "2025-04-21T09:57:08.028Z"
  },
  "personalChannel": "LNJByL4WezUIbGVC",
  "personalChannelDate": {
    "$date": "2025-03-29T15:23:26.074Z"
  },
  "historySpamBlocks": [
    {
      "spamBlockDate": {
        "$date": "2025-04-06T05:45:00.000Z"
      },
      "spamBlockDays": 7
    },
    {
      "spamBlockDate": {
        "$date": "2025-04-09T06:43:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-04-24T07:57:00.000Z"
      },
      "spamBlockDays": 3
    }
  ],
  "lazyCheckDate": {
    "$date": "2025-04-20T20:58:52.289Z"
  },
  "username": "potapova_relative",
  "spamBlockReasons": [
    {
      "reason": "My account has been unfairly limited, preventing me from messaging essential contacts. I believe this was a mistake, as I havent done anything wrong or suspicious. Please restore my full messaging capabilities.",
      "date": {
        "$date": "2025-04-21T08:46:29.012Z"
      }
    }
  ],
  "spamBlockDate": {
    "$date": "2025-04-24T07:57:00.000Z"
  },
  "spamBlockDays": 3,
  "spamBlockInitDate": {
    "$date": "2025-04-21T08:46:29.016Z"
  }
},
{
  "_id": {
    "$oid": "67dd2b20f5fa1dc49466c9f5"
  },
  "accountId": "6999963516-prefix-female-casino",
  "dc1": "b528ca63511be1a12b3b0a20799acb5c6d4d2bbaad0e49162bdd3a58201b3ca455c22a215bc1c6e48282e95d57635a6de640a7bf9652aca1bf550a4b3830559c37b93bfec5ebfc9a85c77246ed86813e51b8bb54137246f7caedc7fa0d4d0bea0fb55bb5ac47f14a6d660e835df328792c597fa17c59667c0a5693068449616039c2fd330c9c079c683b4997f20428d1416492a779791bd32e44d9b66fbe1737abb17e5338f61b0aae8cd10f916aaf01c5876b81d3d9523d73cc0d866c95d2b58417ce6d83c750c407cba77f9b9bf811904cc5758fe20e5ff451c6f588356082b24484e3bf3ffc645ba6209cd75b59ac6dd349b7c3582b9caa33b491893fcc14",
  "dcId": 1,
  "nextApiId": 2040,
  "dateUpdated": {
    "$date": "2025-04-21T13:09:46.931Z"
  },
  "banned": false,
  "firstName": "Sofia",
  "id": "6999963516",
  "lastName": "Borisova",
  "messageCount": 16,
  "twoFa": false,
  "twoFaDate": {
    "$date": "2025-04-20T20:22:25.081Z"
  },
  "automaticCheckDate": {
    "$date": "2025-04-21T13:09:30.308Z"
  },
  "remainingTime": {
    "$date": "2025-04-21T15:09:46.931Z"
  },
  "historySpamBlocks": [
    {
      "spamBlockDate": {
        "$date": "2025-04-04T06:24:00.000Z"
      },
      "spamBlockDays": 7
    },
    {
      "spamBlockDate": {
        "$date": "2025-04-21T13:07:00.000Z"
      },
      "spamBlockDays": 1
    }
  ],
  "personalChannel": "AVRapifurkMp8JOS",
  "personalChannelDate": {
    "$date": "2025-03-29T15:22:53.126Z"
  },
  "lazyCheckDate": {
    "$date": "2025-04-20T20:44:30.149Z"
  },
  "username": "borisova_dark"
},
{
  "_id": {
    "$oid": "67dd2b21f5fa1dc49466c9fa"
  },
  "accountId": "8015730949-prefix-female-casino",
  "dc1": "7f7c56523696921eb1908114f7c97428497c98f50f173647409bab8b5a3e01a8410045f558b1444f0ecebe49e10b9fffa725ea24d4d4ee1c76503f79d7a95dd14d4bb0f9205dec7cc4b5c907fd862099023847a9d86e78daa40e7f586b6e07bdb351609aa57023e0aac65226d2588c500ce8cc1fd1c3901e0c5c3f7680c988577c02ba0d57b2774480050f65fd1dbdeb4e5e076343fd535e6ad769798a5a744cae730e17f759ca4d4f2857a8353e703146b253027ac7bac09b1ff52f75bc69133699e51a030954d0869bbfa340559491f3de666d368eb89296efda6368165e21137e750c919791289723aa8a7aff8fb26477c66189ba88efc77702657587b62d",
  "dcId": 1,
  "nextApiId": 2040,
  "dateUpdated": {
    "$date": "2025-04-21T13:17:30.357Z"
  },
  "banned": false,
  "firstName": "Ekaterina",
  "id": "8015730949",
  "lastName": "Potapova",
  "messageCount": 43,
  "twoFa": false,
  "twoFaDate": {
    "$date": "2025-04-20T16:06:52.151Z"
  },
  "automaticCheckDate": {
    "$date": "2025-04-21T13:17:30.357Z"
  },
  "remainingTime": {
    "$date": "2025-04-21T09:53:43.811Z"
  },
  "historySpamBlocks": [
    {
      "spamBlockDate": {
        "$date": "2025-03-29T06:44:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-04-22T09:18:00.000Z"
      },
      "spamBlockDays": 1
    }
  ],
  "personalChannel": "BPDj8iBnjbVbLpUT",
  "personalChannelDate": {
    "$date": "2025-03-29T15:24:31.257Z"
  },
  "lazyCheckDate": {
    "$date": "2025-04-20T21:32:49.745Z"
  },
  "username": "potapova_universal",
  "spamBlockReasons": [
    {
      "reason": "I believe my accounts message function was restricted by mistake. I havent broken any rules, and I need to reach non-mutual contacts for essential communication. Please review and restore my full messaging access.",
      "date": {
        "$date": "2025-04-21T09:28:03.200Z"
      }
    },
    {
      "reason": "I need to restore my messaging function ASAP for work reasons. My account has been incorrectly flagged as Ive never broken any rules or acted suspiciously. Please review and take action, as this is affecting my job.",
      "date": {
        "$date": "2025-04-21T12:05:48.481Z"
      }
    }
  ],
  "spamBlockDate": {
    "$date": "2025-04-22T09:18:00.000Z"
  },
  "spamBlockDays": 1,
  "spamBlockInitDate": {
    "$date": "2025-04-21T09:28:03.205Z"
  }
},
{
  "_id": {
    "$oid": "67dd2b21f5fa1dc49466c9fc"
  },
  "accountId": "1214637919-prefix-female-casino",
  "dc1": "92bc8b4f861466b86010c44019e82bb2f805f6c2def08bb3c9b73ff18b027ff354bf5fab9ee93046ea61dce1ebe568a073bce26cadaa7757f176be5bd674097cd22e54415b5012434d5199ea9fadfe38a9e1588cbe26b1172cbe151a8436513b2fcb1d5b198cf4e922874c927404d1f1421410b522669d6f60ce9345f632e0c6f91d8cf70390575915e67ab8c133ee1d23aee336cb38749b1ae21a99f3d92a6c2cad0a02e61c6114c62033aad8f92e8addb8e25d00b1ef0652f4fee2d4bb80835652cc1c892db0863a108e41e16f146f53d24222f74151adce424c6ea25a064ebb826a9ed0665adfe882524fc58639254d0c6f56db79a1ad290edc362e6164a5",
  "dcId": 1,
  "nextApiId": 2040,
  "dateUpdated": {
    "$date": "2025-04-21T21:49:04.109Z"
  },
  "banned": false,
  "firstName": "Raisa",
  "id": "1214637919",
  "lastName": "Volkova",
  "messageCount": 15,
  "twoFa": false,
  "twoFaDate": {
    "$date": "2025-04-20T20:22:27.267Z"
  },
  "automaticCheckDate": {
    "$date": "2025-04-21T21:49:04.109Z"
  },
  "remainingTime": {
    "$date": "2025-04-21T07:00:28.209Z"
  },
  "personalChannel": "mLNlq4GtvPvbHalm",
  "personalChannelDate": {
    "$date": "2025-03-29T15:26:06.542Z"
  },
  "lazyCheckDate": {
    "$date": "2025-04-21T21:49:03.790Z"
  },
  "username": "volkova_red"
},
{
  "_id": {
    "$oid": "67dd2b21f5fa1dc49466c9ff"
  },
  "accountId": "1734489025-prefix-female-casino",
  "dc1": "6db5350bc04269a6fcae9f64a8686f1a5519926409737099a932fe384a33be5517295d9c473d27bbe4cde447537f6b96117934fa2666c707354a8f630a3bb8a80f69d527344549a7a8d7b2f372698bca13664e7ccadbe421e0e605c3789357c928b16719887736b7cabf4aae523401d3fa4191b3031a736f3e00b296d80dfc54f06d9a7bf32dce160970ef44284c83a7c3e1f5f65a886ddc4a4e39943342b7efa8920f3b362b720c10f01f75058a8beb5adaf30ca81aeeae3a3aaecc3701dda275a5d094cc1f393c256f9446e690c1236b4d6e463a1aed2c6e0de36ce970cf35f73534bcbaae2ce63221d9139d6993eb4ba1e0e7eef0ec6f442a200c68b25134",
  "dcId": 1,
  "nextApiId": 2040,
  "dateUpdated": {
    "$date": "2025-04-21T21:50:20.364Z"
  },
  "banned": false,
  "firstName": "Daria",
  "id": "1734489025",
  "lastName": "Kiseleva",
  "messageCount": 36,
  "twoFa": false,
  "twoFaDate": {
    "$date": "2025-04-20T16:06:41.708Z"
  },
  "automaticCheckDate": {
    "$date": "2025-04-21T21:50:20.364Z"
  },
  "remainingTime": {
    "$date": "2025-04-21T11:30:48.558Z"
  },
  "personalChannel": "dDJIxtj3AcxEltkh",
  "personalChannelDate": {
    "$date": "2025-03-29T15:23:00.710Z"
  },
  "lazyCheckDate": {
    "$date": "2025-04-21T21:50:20.036Z"
  },
  "username": "kiseleva_notable"
},
{
  "_id": {
    "$oid": "67dd2b21f5fa1dc49466ca01"
  },
  "accountId": "6435102922-prefix-female-casino",
  "dc1": "047e024bcf1a4d588f1ca7a65d25684cf95ae00d181d028ae613bb9e5620969742a4136966e0473d999993c135aee21836f1dfb6e2f3e14d526d26256a7bad81315ae86bd883110db5d1384431d42485e5ef2b4c8ab6d13c28b3121cdf5cc619c7a1cae7a5ce0dc3082666ae3796338f92dfe152f004592a192887a8869759fcfee73c88af7b179879d28ce6d4a97a21653efdcc4c0bbe97b1d9173176b33f17a5a2ef9326c66196b7c313bc4ab3697a41d3b60a85b017f9b7824d9c3284c7390a9b6f56f32ab95460d11cc8e6cf5e72abcb0c5953f32a2c8ee30674732e7bbb3b1db6cfe7b5c4e07404e475d232d8f6da08e2f8f6278be22a71b174abe799d7",
  "dcId": 1,
  "nextApiId": 2040,
  "dateUpdated": {
    "$date": "2025-04-21T13:32:32.233Z"
  },
  "banned": false,
  "firstName": "Maria",
  "id": "6435102922",
  "lastName": "Tkacheva",
  "messageCount": 28,
  "twoFa": false,
  "twoFaDate": {
    "$date": "2025-03-24T09:44:28.685Z"
  },
  "automaticCheckDate": {
    "$date": "2025-04-21T13:32:32.233Z"
  },
  "remainingTime": {
    "$date": "2025-04-21T10:29:09.369Z"
  },
  "historySpamBlocks": [
    {
      "spamBlockDate": {
        "$date": "2025-04-04T09:58:00.000Z"
      },
      "spamBlockDays": 7
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-31T05:33:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-04-07T10:08:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-04-24T08:34:00.000Z"
      },
      "spamBlockDays": 3
    }
  ],
  "personalChannel": "luUgJznOb4iFUwIr",
  "personalChannelDate": {
    "$date": "2025-03-29T15:26:07.644Z"
  },
  "lazyCheckDate": {
    "$date": "2025-04-20T21:06:50.718Z"
  },
  "username": "tkacheva_far",
  "spamBlockReasons": [
    {
      "reason": "I cant message new contacts due to an apparent mistake. My account is clean, with no violations. Please restore full messaging access.",
      "date": {
        "$date": "2025-04-21T09:10:11.461Z"
      }
    }
  ],
  "spamBlockDate": {
    "$date": "2025-04-24T08:34:00.000Z"
  },
  "spamBlockDays": 3,
  "spamBlockInitDate": {
    "$date": "2025-04-21T09:10:11.465Z"
  }
},
{
  "_id": {
    "$oid": "67dd2b22f5fa1dc49466ca04"
  },
  "accountId": "7675857854-prefix-female-casino",
  "dc1": "24dfd43962bcbcfb524bc209f87b8ab11069a605b8aed03deb88be9f7c515b047adadbd4352b78da95c265d9ae359b8db6717d716e6ce6e976114f3a3160d214b0a0c4c4990e05c57340432fd7728c73a29c1cc8a902d8aa9a16f59a0f98a97067c1d87118802b0b4424c1c4bf7e22d0e356455581c707f082064f60381ca0ce1aadb588bf7aeb1a0013a52275f42810c4aae277438564a13f427af966310e7acf80aa0aebc3d44f383a26143cb9764dea99b46c7879dc0dad4e33255731fc5c334901566b7bf5954dc5ef2a6b3c32c38c5d0d49cb68b1efa155ede8167d4fcbbeedc469f208a37925484ab6865c24e537dbb7a6eafe6b238be0a4aab2fd71d1",
  "dcId": 1,
  "nextApiId": 2040,
  "dateUpdated": {
    "$date": "2025-04-21T13:09:28.386Z"
  },
  "banned": false,
  "firstName": "Galina",
  "id": "7675857854",
  "lastName": "Shishkina",
  "messageCount": 35,
  "twoFa": false,
  "twoFaDate": {
    "$date": "2025-04-20T20:22:21.414Z"
  },
  "automaticCheckDate": {
    "$date": "2025-04-21T13:09:28.385Z"
  },
  "remainingTime": {
    "$date": "2025-04-21T12:32:40.408Z"
  },
  "personalChannelDate": {
    "$date": "2025-03-30T04:05:52.952Z"
  },
  "personalChannel": "FHhPMeyGqRvqw1DN",
  "historySpamBlocks": [
    {
      "spamBlockDate": {
        "$date": "2025-04-01T05:44:00.000Z"
      },
      "spamBlockDays": 1
    }
  ],
  "lazyCheckDate": {
    "$date": "2025-04-20T21:13:47.602Z"
  },
  "username": "shishkina_civilian"
},
{
  "_id": {
    "$oid": "67dd2b22f5fa1dc49466ca06"
  },
  "accountId": "7847170506-prefix-female-casino",
  "dc2": "636f5698f6977240f5a4c3c1d9b5b0c98bb1f0182e2337546141c803606edbc919f01c844dee5e760def7b769c4d2560624645d1514d8929a0af49f48fbc5b50b5fbf3b3d17754de4954cfc09d2686271877920b22f4ccfe8afc9e8f39edafab8f67273b07feeac662d74c63d0d98724e48f3fb51d9231e8e9d6f8eedee59f5846fe2453278753ea719f0f70e2ca438913ec567d00b9da515940c67608037fb46fa178f547b0fc91fe97d1ee14b679d08745b410ae911c83de0737664c72e094504c837095eb2687fe64124cafb3f8772596daca7531bd9935dfd823d47eb3fbb76d9e65a0896be8117207289e9bf7561f5f507d5b630a06035980cb3fffb880",
  "dcId": 2,
  "nextApiId": 2496,
  "dateUpdated": {
    "$date": "2025-04-21T13:11:29.742Z"
  },
  "banned": false,
  "firstName": "Olga",
  "id": "7847170506",
  "lastName": "Makarova",
  "messageCount": 60,
  "twoFa": false,
  "twoFaDate": {
    "$date": "2025-04-20T20:22:25.461Z"
  },
  "automaticCheckDate": {
    "$date": "2025-04-21T13:11:29.742Z"
  },
  "historySpamBlocks": [
    {
      "spamBlockDate": "INFINITY",
      "spamBlockDays": 0
    }
  ],
  "remainingTime": {
    "$date": "2025-04-21T14:47:43.244Z"
  },
  "personalChannel": "hGcNRM5bbumImHFh",
  "personalChannelDate": {
    "$date": "2025-03-29T15:24:32.930Z"
  },
  "lazyCheckDate": {
    "$date": "2025-04-20T21:22:33.692Z"
  },
  "username": "makarova_parallel"
},
{
  "_id": {
    "$oid": "67dd2b22f5fa1dc49466ca09"
  },
  "accountId": "8082094505-prefix-female-casino",
  "dc2": "87485b14f1723b26e5c0b6a5d1d0a96563f657a0162ebb6c427b585482d3ca575f037daff68723972c23393740d1fb70a4566218c7162ac3263d0cf38630f3caff7f999491ecd3409fdd6b08625d18f421d409a19271e602f8bda54beea0029dad38e9db3b08dcf11644542845dbfa90a275da252f30c802e385705ca2865df80d741110396f156aeb3b8da2466c902d6add7dbb3832fbf8388d37c4a5a862fe67d47e709cf41183748c1e42625002dbf7df74663cd63a53697361833d9d630397d9e446e70b6ae556796436712388913866e353f8b87f47ebd421e7be4dab5a3cc7ff75fe1257df2bccf4eee11cdae9bb9b3e827328661d7b4d7a144dd13b69",
  "dcId": 2,
  "nextApiId": 611335,
  "dateUpdated": {
    "$date": "2025-04-21T13:09:23.433Z"
  },
  "banned": false,
  "firstName": "Sofia",
  "id": "8082094505",
  "lastName": "Potapova",
  "messageCount": 30,
  "twoFa": false,
  "twoFaDate": {
    "$date": "2025-04-20T20:22:21.453Z"
  },
  "automaticCheckDate": {
    "$date": "2025-04-21T13:09:23.433Z"
  },
  "historySpamBlocks": [
    {
      "spamBlockDate": "INFINITY",
      "spamBlockDays": 0
    }
  ],
  "personalChannelDate": {
    "$date": "2025-04-03T22:03:40.120Z"
  },
  "personalChannel": "YIecPTDzDQmM1AIn",
  "remainingTime": {
    "$date": "2025-04-21T13:51:05.562Z"
  },
  "lazyCheckDate": {
    "$date": "2025-04-20T21:02:43.960Z"
  },
  "username": "potapova_rose"
},
{
  "_id": {
    "$oid": "67dd2b22f5fa1dc49466ca0b"
  },
  "accountId": "5264933803-prefix-female-casino",
  "dc1": "224850177fead995626e0cd3faf8612f25dfdc70902d7e1c89112d456960e7fb13d7291a90bebf3e2d01319af88627091a0d3af8f81d0ac458f3222868b636ac8fc7627c82d144f07eb2618ba3d80f3e38f6c13b8fc2342be3c63b8730a94fcc897ad832d3574612d1e9de2e0e08d8ec78661bf085cb4dd3ea0b85e5075359f46f924ed808a190a6cc5c2e16dc4af083b4d02a096337cecd5940c3bf8ee646bf319da90e2102bcf42a2c7cafa240e4abcfe7e9c3b976d9837b73fd4fd44d25ed440087218d9fd67e1fb29fd691f5e92f5c6b6b997a13a4d8c137b261b0fea52dfe9380f4f3f28a30783874e1bb2f6d9e1790d0bf90b590eef574820140ce6afc",
  "dcId": 1,
  "nextApiId": 2040,
  "dateUpdated": {
    "$date": "2025-04-21T21:52:53.793Z"
  },
  "banned": false,
  "firstName": "Raisa",
  "id": "5264933803",
  "lastName": "Eroshkina",
  "messageCount": 35,
  "twoFa": false,
  "twoFaDate": {
    "$date": "2025-04-20T20:22:22.804Z"
  },
  "automaticCheckDate": {
    "$date": "2025-04-21T21:52:53.793Z"
  },
  "remainingTime": {
    "$date": "2025-04-21T11:52:38.175Z"
  },
  "personalChannel": "ZkoXGjHdZ5DoohID",
  "personalChannelDate": {
    "$date": "2025-03-29T15:25:13.712Z"
  },
  "historySpamBlocks": [
    {
      "spamBlockDate": {
        "$date": "2025-03-31T09:19:00.000Z"
      },
      "spamBlockDays": 1
    }
  ],
  "lazyCheckDate": {
    "$date": "2025-04-21T21:52:52.828Z"
  },
  "username": "eroshkina_marxist"
},
{
  "_id": {
    "$oid": "67dd2b23f5fa1dc49466ca0d"
  },
  "accountId": "5102565973-prefix-female-casino",
  "dc1": "3c6a10b2c8fea43ff482fb6b68c5fed4b931b3a889a19762f89f8305e4840190a665c310b357a908cf4c4f6257c01d2dd8be8a5e877adfc9820e491129a429f2d5d265914e64b00f105e9741d7cfcb8fc262894c150d032eb4b871f864435aaadaa7e63636fc5c2759a579b853a49d300b51781355e36282b1754ab421f9be11b908b681b1c58a2bba650e048a6358302f1c1f82a63f1475c381fa53791a8a4dc4b25e40ddac95a9024b9f385dee59580eedfeba40aa7b0e90a431544a2f4967b267d7b0dbac34a4a6221ce494fae4719993f6ab3d31f8fa7e63953700bd52709e51f86715db304b219affa08e2c8aa8c8d513ef3305df9a8dd8abf5ef90985c",
  "dcId": 1,
  "nextApiId": 2040,
  "dateUpdated": {
    "$date": "2025-04-21T13:17:28.352Z"
  },
  "banned": false,
  "firstName": "Kira",
  "id": "5102565973",
  "lastName": "Golubeva",
  "messageCount": 33,
  "twoFa": false,
  "twoFaDate": {
    "$date": "2025-04-20T20:22:21.411Z"
  },
  "automaticCheckDate": {
    "$date": "2025-04-21T13:17:28.352Z"
  },
  "remainingTime": {
    "$date": "2025-04-21T10:31:32.278Z"
  },
  "personalChannel": "MqcEcJKxIvzjMjF2",
  "personalChannelDate": {
    "$date": "2025-03-29T15:24:30.245Z"
  },
  "historySpamBlocks": [
    {
      "spamBlockDate": {
        "$date": "2025-04-01T02:47:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-04-06T09:48:00.000Z"
      },
      "spamBlockDays": 1
    }
  ],
  "lazyCheckDate": {
    "$date": "2025-04-20T20:42:29.393Z"
  },
  "username": "golubeva_tomato"
},
{
  "_id": {
    "$oid": "67dd2b24f5fa1dc49466ca1b"
  },
  "accountId": "1642775690-prefix-female-casino",
  "dc1": "ab15e0c8bd90b99f18c6fef50f5a0fde0d6817eb872731801a3e3cbb519953f04dbf7220d0821961a86e23455ba92bdc9ea00173c114f4186a834a5fb1280b2883c490f81b25703eb64e9663851cf3ce3080dc96df6886c68842d956cfa87e3c4e5689d924e9b1a150cd2bce873849071ef256f5326b5fe755d2d98e97f38e97c99e7e4fe245646d47656b911db361aa37829114497554ca9de708bb830b4f5fc67259fd2c836cf0f558e03b442975894e30736eb30d859fd57619aed6213d522278838c2d2fe3578c28f58e331af0bd2b3d4a1ffdfb95f572b85b30f16f41c9231e14d210bc55aaebdad5c6349c679cc7c0908417eba80b9b5dc986fcc64a26",
  "dcId": 1,
  "nextApiId": 2040,
  "dateUpdated": {
    "$date": "2025-04-21T13:27:27.141Z"
  },
  "banned": false,
  "firstName": "Polina",
  "id": "1642775690",
  "lastName": "Shevchukova",
  "messageCount": 34,
  "twoFa": false,
  "twoFaDate": {
    "$date": "2025-04-20T20:22:21.406Z"
  },
  "automaticCheckDate": {
    "$date": "2025-04-21T13:27:27.141Z"
  },
  "remainingTime": {
    "$date": "2025-04-21T12:34:04.797Z"
  },
  "personalChannel": "RLzl8BZZiTsgIBeh",
  "personalChannelDate": {
    "$date": "2025-03-29T15:25:50.161Z"
  },
  "lazyCheckDate": {
    "$date": "2025-04-20T21:17:44.173Z"
  },
  "username": "shevchukova_whispering",
  "spamBlockReasons": [
    {
      "reason": "I recently lost access to messaging all users, limiting me to only mutual contacts. This sudden change is surprising, as I havent engaged in any rule-breaking activity. Please restore my messaging functionality so I can contact new connections for work.",
      "date": {
        "$date": "2025-04-21T11:49:01.631Z"
      }
    }
  ],
  "historySpamBlocks": [
    {
      "spamBlockDate": {
        "$date": "2025-04-22T10:41:00.000Z"
      },
      "spamBlockDays": 1
    }
  ],
  "spamBlockDate": {
    "$date": "2025-04-22T10:41:00.000Z"
  },
  "spamBlockDays": 1,
  "spamBlockInitDate": {
    "$date": "2025-04-21T11:49:01.636Z"
  }
},
{
  "_id": {
    "$oid": "67dd2b25f5fa1dc49466ca20"
  },
  "accountId": "6621682789-prefix-female-casino",
  "dc1": "115bb11b32b4023e9c310c272439e924ad2c2611f3f48c4d36b95cdac18a39e80396d94cfb18e0ab204489605bc3956cacf213bf3bbd6007756301cefa133896c71ff1647ece3b51cd8f65f0a4e5bf8e2566334369197c5606b2ca70341ede9fd41212309495434d2fe9e2bbfdbdb72301ea2a44e5205e348b458294469c3c2eb76cbc4e09fd356c4eb6d3cc2de3023403b83c3611622b18cb851e9154b2917d6100b8cca10f81b5608d77029e10e56b86e992f8db530e081d19c4e502ce2a6ced1f45c17fc8f3de76453c0909fb2a4f8d31be0439ff7e132ed6f4941dee5978e9cb04d1effad50e1d0bca08fe416a32060695d248a2a48636ea4e60e60f600d",
  "dcId": 1,
  "nextApiId": 2040,
  "dateUpdated": {
    "$date": "2025-04-21T13:19:24.314Z"
  },
  "banned": false,
  "firstName": "Marina",
  "id": "6621682789",
  "lastName": "Shevchukova",
  "messageCount": 38,
  "twoFa": false,
  "twoFaDate": {
    "$date": "2025-04-20T20:22:25.069Z"
  },
  "automaticCheckDate": {
    "$date": "2025-04-21T13:19:24.314Z"
  },
  "remainingTime": {
    "$date": "2025-04-21T11:32:26.075Z"
  },
  "personalChannel": "kpwPv1lqhozvuAbQ",
  "personalChannelDate": {
    "$date": "2025-03-29T15:23:40.667Z"
  },
  "lazyCheckDate": {
    "$date": "2025-04-20T21:17:47.643Z"
  },
  "username": "shevchukova_main"
},
{
  "_id": {
    "$oid": "67dd2b25f5fa1dc49466ca2d"
  },
  "accountId": "7024979438-prefix-female-casino",
  "dc1": "bc296f396ad14428f9255b7095f684a74eb6178985abd369287aba30b6abd55ae2cc7430ca9af6d7c14831ee73215336676ecaa6a371d275a5215ba69eb9e5d6962e841e0f48ba59106f320658fb412b2fa5589be0613c5333a68f2ff7125f287f5d41cb41f9f5ba6b0a75d9fb768924289ca78daa891fd2d1991923c7a5dddea7296054956b70f1dc326d2a7963784f6be5811353e08d9aa6428018b2d5134f8052fe5a8ed705413dea5ff0aed2813d5a10020b94a99427b28821b3f6796409dfaf507b7923a7eef762c2dabcc1c3d663a1b64b75e62e2fca0ca4f12c49c69d70055fca6ee9c48e2a6759d103b55b52d047a0f70e8d63dbe75c465f783f0921",
  "dcId": 1,
  "nextApiId": 2040,
  "dateUpdated": {
    "$date": "2025-04-21T13:17:32.457Z"
  },
  "banned": false,
  "firstName": "Galina",
  "id": "7024979438",
  "lastName": "Ivanova",
  "messageCount": 15,
  "twoFa": false,
  "twoFaDate": {
    "$date": "2025-04-17T12:43:22.467Z"
  },
  "automaticCheckDate": {
    "$date": "2025-04-21T13:17:32.457Z"
  },
  "historySpamBlocks": [
    {
      "spamBlockDate": "INFINITY",
      "spamBlockDays": 0
    }
  ],
  "remainingTime": {
    "$date": "2025-04-21T07:08:24.320Z"
  },
  "personalChannel": "M4JshCQvSVLpfwYx",
  "personalChannelDate": {
    "$date": "2025-03-29T15:25:35.873Z"
  },
  "lazyCheckDate": {
    "$date": "2025-04-20T21:00:50.778Z"
  },
  "username": "ivanova_flexible"
},
{
  "_id": {
    "$oid": "67dd2b28f5fa1dc49466ca4c"
  },
  "accountId": "1426591406-prefix-female-casino",
  "dc1": "0a99cae34b4cf0ff3f57552e9f6de362027416fb126b1464f1852b8ef4ad1016b41e958d2b60396ffa17c98da11a4b6393b0bc67920aad179531dabb761e90f77cbf0b335be3096e5fcaa7cbea43a6a2a62a79bff3735eda2660f9412fd3c1edfab7e27973cd6390c3bc76de19313ec15eda40a0806d884467c62977e18e3c15a64e9203e0e1ca6d6a2c628432261e5ea89b748fcfcaa02a8d28e1c9c4ff2a34cf8218ce723a892ffb289215c17c7f58da22c61794fbcadecadd82001edf76c860b1848a0fa59dc862d4fea1a6045055649e1ec5877404dc94e251431cd0d57e31d5c609bc2b49ccd9766c5658ce949e853af9d9d8bf6508cb19bed8ca0e8d5f",
  "dcId": 1,
  "nextApiId": 2040,
  "dateUpdated": {
    "$date": "2025-04-21T13:24:31.556Z"
  },
  "banned": false,
  "firstName": "Tatiana",
  "id": "1426591406",
  "lastName": "Kozlova",
  "messageCount": 18,
  "twoFa": false,
  "twoFaDate": {
    "$date": "2025-03-21T09:28:09.031Z"
  },
  "automaticCheckDate": {
    "$date": "2025-04-21T13:24:31.556Z"
  },
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
        "$date": "2025-04-22T06:05:00.000Z"
      },
      "spamBlockDays": 1
    }
  ],
  "remainingTime": {
    "$date": "2025-04-21T07:15:37.449Z"
  },
  "personalChannel": "kMKQHZeYaadnKan8",
  "personalChannelDate": {
    "$date": "2025-03-29T15:23:23.169Z"
  },
  "lazyCheckDate": {
    "$date": "2025-04-20T21:07:50.660Z"
  },
  "username": "kozlova_spatial",
  "spamBlockReasons": [
    {
      "reason": "Ive been blocked from messaging non-mutual contacts, which affects my work. This seems like an error, as I havent done anything wrong or suspicious. Please review and restore my full messaging capabilities ASAP.",
      "date": {
        "$date": "2025-04-21T06:36:02.055Z"
      }
    }
  ],
  "spamBlockDate": {
    "$date": "2025-04-22T06:05:00.000Z"
  },
  "spamBlockDays": 1,
  "spamBlockInitDate": {
    "$date": "2025-04-21T06:36:02.060Z"
  }
},
{
  "_id": {
    "$oid": "67dd2b28f5fa1dc49466ca54"
  },
  "accountId": "6995163203-prefix-female-casino",
  "dc1": "2b16f1bf90cfdf0f57575b1bae476324eaa1558ab9dc88d32c4d3f393d49c9c3e2e96599dc5f961fcaa00ea876bdd69a5b4bdc5fa437897e2fdebfc89edea6490853c7da81f0686bd377b7d1f72087b70c874881d88eddc9e405e1450f5964c68b76216ee11f637d9ea9ef2d113d05340281a2d8966a24d97d6c91ad23e70d528cd28663f0e1be1bdc43ae1331b2cc4aac50b1ca45b702d28aa6174a85b1cd4aae39b51a62aea201e2d27247c973745b60630b64a8a58493feec17ae3cefbeab43f362a43a386a7777893a91fd140ce922e66f04f67f9cf48d48127ac7a027b71789a3bb2d6425d9ec90957110216d64f3edd3e754aca4ce1d85f92b41f96650",
  "dcId": 1,
  "nextApiId": 2040,
  "dateUpdated": {
    "$date": "2025-04-21T13:11:24.454Z"
  },
  "banned": false,
  "firstName": "Yulia",
  "id": "6995163203",
  "lastName": "Vasilyeva",
  "messageCount": 35,
  "twoFa": false,
  "twoFaDate": {
    "$date": "2025-04-20T20:22:22.174Z"
  },
  "automaticCheckDate": {
    "$date": "2025-04-21T13:11:24.454Z"
  },
  "remainingTime": {
    "$date": "2025-04-21T12:52:07.869Z"
  },
  "personalChannel": "RvFgD7HlsUHUzkjv",
  "personalChannelDate": {
    "$date": "2025-03-29T15:27:34.424Z"
  },
  "lazyCheckDate": {
    "$date": "2025-04-20T21:11:44.882Z"
  },
  "historySpamBlocks": [
    {
      "spamBlockDate": {
        "$date": "2025-04-09T05:50:00.000Z"
      },
      "spamBlockDays": 1
    }
  ],
  "username": "vasilyeva_difficult"
},
{
  "_id": {
    "$oid": "67dd2b29f5fa1dc49466ca56"
  },
  "accountId": "6613832480-prefix-female-casino",
  "dc1": "83a6411b22ee3dac29f116ae33512dfb871d2bbdcb35696714fdaa073def4e04c741a80fa7440dc1dee557e2346ffda45c9b1bfe3756754402f78dfd6021236369a6be3d1967521f9a9e77d8af5f15e51e9853a548050056a505b6f9a322707df10ff709a4c4a33bf515b48e2851f48309a4dbe07e31f7678b06b65eb3c2452f3636c407788ca19b36c2210a1655807fe39b6d3ccb1bacc5cc6a752b3b30ba9cbeaf8b77c4997a40eebeffc1ee454081fefb7ca2c97eacc05c01a8e476a087106b68b1b44400a8b4077bcd39da2801de7f94e38d751468ae5704ac06139d7e70a4cfbc5d31e987a9571a558031ba6ecf4f4572ac1024f861dda0957223b52e42",
  "dcId": 1,
  "nextApiId": 2040,
  "dateUpdated": {
    "$date": "2025-04-21T13:21:27.120Z"
  },
  "banned": false,
  "firstName": "Elena",
  "id": "6613832480",
  "lastName": "Smirnova",
  "messageCount": 42,
  "twoFa": false,
  "twoFaDate": {
    "$date": "2025-04-20T20:22:21.452Z"
  },
  "automaticCheckDate": {
    "$date": "2025-04-21T13:21:27.120Z"
  },
  "remainingTime": {
    "$date": "2025-04-21T12:43:55.678Z"
  },
  "historySpamBlocks": [
    {
      "spamBlockDate": {
        "$date": "2025-03-29T08:13:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-30T16:08:00.000Z"
      },
      "spamBlockDays": 1
    }
  ],
  "personalChannel": "PrSyQdRfwGz1AGAl",
  "personalChannelDate": {
    "$date": "2025-03-29T15:23:45.816Z"
  },
  "lazyCheckDate": {
    "$date": "2025-04-20T21:14:44.765Z"
  },
  "username": "smirnova_miniature"
},
{
  "_id": {
    "$oid": "67dd2b29f5fa1dc49466ca59"
  },
  "accountId": "7544946357-prefix-female-casino",
  "dc1": "24d528efaf426393e31f6bd3f3493c869de4c74ddcda583b77b0f84217123e9315dc1b08777bb23e2113bb431a69893c7623f88c2dfcd6b10a8d73e1cbfee9352cad5c5b57c5927c58f3ee467daf24b1510e27cc48c7b6258ba13f5268dd30c9a21672b9baf4761df3101dfc9856fa63d57c5edfa0b95768a9da22f770775481716b6e711d27096b2078a105a9ac367cc748974378f7f1d16e73c27edb10745bd59d10e741bfdaad314737614161b6f3860bbebb948639086acd8163c1c6733e9703a3fde590421048387173cfaf2313d61a6028d4d2aa3a93b8824e582cb43c4452eaa39268adc6bce489cc05decdbd93a80662c66215660d41be1234d2a70c",
  "dcId": 1,
  "nextApiId": 2040,
  "dateUpdated": {
    "$date": "2025-04-21T21:53:01.934Z"
  },
  "banned": false,
  "firstName": "Anastasia",
  "id": "7544946357",
  "lastName": "Mozharova",
  "messageCount": 18,
  "twoFa": false,
  "twoFaDate": {
    "$date": "2025-04-20T20:22:22.176Z"
  },
  "automaticCheckDate": {
    "$date": "2025-04-21T21:53:01.934Z"
  },
  "remainingTime": {
    "$date": "2025-04-21T07:35:31.481Z"
  },
  "historySpamBlocks": [
    {
      "spamBlockDate": {
        "$date": "2025-03-29T09:06:00.000Z"
      },
      "spamBlockDays": 1
    }
  ],
  "personalChannel": "oxfsCgWfpcZfbj1F",
  "personalChannelDate": {
    "$date": "2025-03-29T15:24:29.644Z"
  },
  "lazyCheckDate": {
    "$date": "2025-04-21T21:53:01.622Z"
  },
  "username": "mozharova_angry"
},
{
  "_id": {
    "$oid": "67dd2b29f5fa1dc49466ca5b"
  },
  "accountId": "7877982236-prefix-female-casino",
  "dc1": "0cb61eba5992f1ce46e6c12c2f5a7a276c8d8bd12ead494bf17b6bb63a241874473c03d462eac1a1a6610a8ddb1250f2c74ebbe16bddbcdf75c29d187b0cab6038eef565e9074eed0e6f0e56e22525422c2db812693f49e6ad5b15510860f9eac69938c3ee25f5b07fd3315261b64d31bc1a141374f0db3fe370cf1cba04d3f4a475bbd21c971718b94b2597b4e71d961b1604ff4e4bd4a290c95f634da39c0f8a5e726b42929b5ebd670a958e82e66647b36c2590c1a08cf7ff130f69eb081bf220ccb78815faf6a5146afe638b8e10190ea4ea61b19011121d21f1782d46b513d4985558cf15571805721626537f8de1214f852ba6c7e4484bb04e13c2a4a1",
  "dcId": 1,
  "nextApiId": 2496,
  "dateUpdated": {
    "$date": "2025-04-21T13:16:28.424Z"
  },
  "banned": false,
  "firstName": "Vera",
  "id": "7877982236",
  "lastName": "Voronina",
  "messageCount": 35,
  "twoFa": false,
  "twoFaDate": {
    "$date": "2025-04-20T20:22:21.908Z"
  },
  "automaticCheckDate": {
    "$date": "2025-04-21T13:16:28.424Z"
  },
  "remainingTime": {
    "$date": "2025-04-21T12:00:37.471Z"
  },
  "personalChannel": "T2uvklZpRHjkthuc",
  "personalChannelDate": {
    "$date": "2025-03-29T15:26:08.960Z"
  },
  "historySpamBlocks": [
    {
      "spamBlockDate": {
        "$date": "2025-04-01T11:21:00.000Z"
      },
      "spamBlockDays": 1
    }
  ],
  "lazyCheckDate": {
    "$date": "2025-04-20T20:24:29.458Z"
  },
  "username": "voronina_zestful"
},
{
  "_id": {
    "$oid": "67dd2b2af5fa1dc49466ca60"
  },
  "accountId": "6722665416-prefix-female-casino",
  "dc1": "066b2b5d088ca8ae0f348bda69eefb4466b0f8ebc3cf30f202334ab74e554a30aeb4563ffe72f3d49cfa63e2ae5e2bff248d6d0b4187d68fa7a39bef890c8aa4258e9cefc2aa2d7c84b3e4b3fcb99ba9dab2dd37ef19bfe60e1e483174ca893464e16ca87bbb9d443bfdcce253896c3ae599112196e04b7db687b1b7ff2beb06a72f3108ef0f5c5fd2f9f0f613b344a763a3df5773936377496136dbfac3be877ac8e16bb7bd44f6ba6c55433a2f9a3502a2b09ac9b4c71f2c125d0aef35e886fe411eb646e69efc0b94c43593706491e279e71d26c390e3b46373a94b268d8201f6b8764b4a262b740619dd2deb64fb79deb28f95b5a466f7cf1b56355b2003",
  "dcId": 1,
  "nextApiId": 2040,
  "dateUpdated": {
    "$date": "2025-04-21T13:30:27.022Z"
  },
  "banned": false,
  "firstName": "Mira",
  "id": "6722665416",
  "lastName": "Loginova",
  "messageCount": 19,
  "twoFa": false,
  "twoFaDate": {
    "$date": "2025-04-20T16:06:41.662Z"
  },
  "automaticCheckDate": {
    "$date": "2025-04-21T13:30:27.022Z"
  },
  "remainingTime": {
    "$date": "2025-04-21T07:56:59.721Z"
  },
  "historySpamBlocks": [
    {
      "spamBlockDate": {
        "$date": "2025-03-29T07:04:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-04-09T10:41:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-04-10T05:05:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-04-24T06:02:00.000Z"
      },
      "spamBlockDays": 3
    }
  ],
  "personalChannel": "gkUjyOuvlSnSm8cV",
  "personalChannelDate": {
    "$date": "2025-03-29T15:22:50.222Z"
  },
  "lazyCheckDate": {
    "$date": "2025-04-20T21:23:44.652Z"
  },
  "username": "loginova_convinced",
  "spamBlockReasons": [
    {
      "reason": "I believe my accounts functionality was limited due to a mistake. I havent violated any rules, and I need to message people who arent mutual contacts. Kindly restore my messaging access.",
      "date": {
        "$date": "2025-04-21T06:38:56.125Z"
      }
    }
  ],
  "spamBlockDate": {
    "$date": "2025-04-24T06:02:00.000Z"
  },
  "spamBlockDays": 3,
  "spamBlockInitDate": {
    "$date": "2025-04-21T06:38:56.128Z"
  }
},
{
  "_id": {
    "$oid": "67dd2b2af5fa1dc49466ca62"
  },
  "accountId": "5769518942-prefix-female-casino",
  "dc1": "66c82b1c7fdfffebc8c1dc8c5f346fe291853aa2a3d9858ccc2aa1b1c5e7ead7613c3d2ff0889e47d42a3ee238c2a360faae6be35f1cf3f226c14652fc5f5e21e6af31942ac9ca782653ea7d7286317b10ec8893ff8e5f1951569607758c62e852e4f53db7fe559824f9af6b257db679b6f366bd4cffaca9bbca1ff4da948be4499163d465a1bbbd2af8d8ef0140301a751f3295e19c74c4362d8e95272b2d36d495bd63d0bad5db2e764a19880d3c29d8dfdee3c1f3983bfd99e51b284223a0bcd142ef12f6234487ed14f17456a3c7648bdd8b92a456e473f888bbbbfd6ad1a61fdb5f7b35083bebadf322a5ca7c974d67b39d758b2185c9264e37ffc8fe27",
  "dcId": 1,
  "nextApiId": 2040,
  "dateUpdated": {
    "$date": "2025-04-21T13:19:29.777Z"
  },
  "banned": false,
  "firstName": "Vera",
  "id": "5769518942",
  "lastName": "Grishina",
  "messageCount": 17,
  "twoFa": false,
  "twoFaDate": {
    "$date": "2025-04-20T20:22:25.007Z"
  },
  "automaticCheckDate": {
    "$date": "2025-04-21T13:19:29.777Z"
  },
  "remainingTime": {
    "$date": "2025-04-21T07:53:19.989Z"
  },
  "personalChannel": "OEpZKplQ3aGzRhjZ",
  "personalChannelDate": {
    "$date": "2025-03-29T15:24:41.463Z"
  },
  "historySpamBlocks": [
    {
      "spamBlockDate": {
        "$date": "2025-04-05T07:08:00.000Z"
      },
      "spamBlockDays": 1
    }
  ],
  "lazyCheckDate": {
    "$date": "2025-04-20T20:36:31.087Z"
  },
  "username": "grishina_relieved"
},
{
  "_id": {
    "$oid": "67dd2b2bf5fa1dc49466ca69"
  },
  "accountId": "7929238876-prefix-female-casino",
  "dc1": "40142c034b99202f430916b30f51c958692417a03a293079c86af06351d0947a1114a08250a0b283180a8246cd80c77806989f37ffec46c71234dd13c2ea0676bccde0a702c86804de0e6d360859ee69c5596e210c19ba4e4b863833462be394995e92b0182d22d497ce3298d124b22952b2dd17f03f20376bbc4ce545f89c73cbf00dbc7587c07a0f26e81bf2d8294cfca9e9e6931300abc5df93d0bb2d2e18967a8e044cd855fd1fa81416ece12d08afbf8257dd7e15f5089675b788aaf24527e99f0c75b8a168c3f62e4f1852b49893b31ccca3a7f25e871f1c9f5ac5977f1e5c69b61fd4fe6f3a609c68491c441ea8beba953faf7ba90c9e4877becdcfb8",
  "dcId": 1,
  "nextApiId": 2040,
  "dateUpdated": {
    "$date": "2025-04-21T21:55:57.822Z"
  },
  "banned": false,
  "firstName": "Yulia",
  "id": "7929238876",
  "lastName": "Nesterova",
  "messageCount": 32,
  "twoFa": false,
  "twoFaDate": {
    "$date": "2025-04-20T20:22:21.911Z"
  },
  "automaticCheckDate": {
    "$date": "2025-04-21T21:55:57.822Z"
  },
  "remainingTime": {
    "$date": "2025-04-21T09:41:49.911Z"
  },
  "historySpamBlocks": [
    {
      "spamBlockDate": {
        "$date": "2025-03-29T10:09:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-30T10:17:00.000Z"
      },
      "spamBlockDays": 1
    }
  ],
  "personalChannel": "HmagLQ8ZBhOsOFXF",
  "personalChannelDate": {
    "$date": "2025-03-29T15:25:15.881Z"
  },
  "lazyCheckDate": {
    "$date": "2025-04-21T21:55:57.491Z"
  },
  "username": "nesterova_wonderful"
},
{
  "_id": {
    "$oid": "67dd2b2cf5fa1dc49466ca74"
  },
  "accountId": "7860879455-prefix-female-casino",
  "dc1": "97563e71d09d3582882dd367a833902594b47b3c6ace7e5aad371e0fe18000798ca848ff9a1e9e05e6a6f3049902f17eb9e533e86dada60220ecf68686570be75e69880232b7cf8e3c1d85458ac34fd053c7c635075eb0b91d11e4eaa486272012c56ea03eb7a553941c6e5aa5e2d4bde741217db8b47469a19698ce1cce68e892c9f0f21acc353d2aa869b8050faa94a32ee808149f6273480ba607909da9e56f6682e51f977d4da487e0336775bc8d74b967949375d6f0d505b3eb0955962792136409cf1008e5145060243b09471ed650e28b32c55ea5498a7948ab0fd554f375bd18d834437eae141014a4d6d32c75f5e5e4dcfe817d89ac99807459cddb",
  "dcId": 1,
  "nextApiId": 2040,
  "dateUpdated": {
    "$date": "2025-04-21T13:14:29.838Z"
  },
  "banned": false,
  "firstName": "Svetlana",
  "id": "7860879455",
  "lastName": "Orlova",
  "messageCount": 36,
  "twoFa": false,
  "twoFaDate": {
    "$date": "2025-04-20T16:06:44.879Z"
  },
  "automaticCheckDate": {
    "$date": "2025-04-21T13:14:29.838Z"
  },
  "remainingTime": {
    "$date": "2025-04-21T09:45:05.396Z"
  },
  "personalChannel": "dVTdOUFR7DrwYoPV",
  "personalChannelDate": {
    "$date": "2025-03-29T15:24:45.050Z"
  },
  "lazyCheckDate": {
    "$date": "2025-04-20T20:50:30.582Z"
  },
  "username": "orlova_casual",
  "spamBlockReasons": [
    {
      "reason": "I believe my recent messaging restrictions were a mistake. My account has been unfairly limited without engaging in any suspicious activity. Please review and restore my messaging capabilities.",
      "date": {
        "$date": "2025-04-21T08:36:02.949Z"
      }
    }
  ],
  "historySpamBlocks": [
    {
      "spamBlockDate": {
        "$date": "2025-04-22T07:58:00.000Z"
      },
      "spamBlockDays": 1
    }
  ],
  "spamBlockDate": {
    "$date": "2025-04-22T07:58:00.000Z"
  },
  "spamBlockDays": 1,
  "spamBlockInitDate": {
    "$date": "2025-04-21T08:36:02.953Z"
  }
},
{
  "_id": {
    "$oid": "67dd2b2df5fa1dc49466ca76"
  },
  "accountId": "8112148386-prefix-female-casino",
  "dc2": "4a4e4733a65133c93c69e1e72cce129d50b1e687d1e081efafe6c429788769dac60b3129b726268a6b4e26ddb32b68f7479e66ba86bad9cda13402fe1437a381f0cc3144701ccf4f31367b27eda10b78c806b8a63187775a12ed14b167ae5d3a0eb7039762706ece1c62d737effd9127e1762c2263278d77d3e6d717198cd37907571c01d8cc8fb1b243cc7513e21979fa337e514bc55072cf87b5ea1b741c7941fa25656a43f709b452ddcb75dffc14d3003dcfefbb39c4a5dac3181657e9ce9ae60dc36020479c4b7cd84153f7a9f2fa06e7cceaa7027a4899d5f1c94d2f7ab5591d455c4f31f4eb5b641b801c28d974d181415676af15c627b68d2311a7e4",
  "dcId": 2,
  "nextApiId": 2496,
  "dateUpdated": {
    "$date": "2025-04-21T13:16:30.471Z"
  },
  "banned": false,
  "firstName": "Kira",
  "id": "8112148386",
  "lastName": "Galitsyna",
  "messageCount": 59,
  "twoFa": false,
  "twoFaDate": {
    "$date": "2025-04-20T20:22:25.896Z"
  },
  "automaticCheckDate": {
    "$date": "2025-04-21T13:16:30.471Z"
  },
  "remainingTime": {
    "$date": "2025-04-21T14:51:45.321Z"
  },
  "personalChannel": "gGeYYmOJCRg4Nrkv",
  "personalChannelDate": {
    "$date": "2025-03-29T15:25:21.035Z"
  },
  "historySpamBlocks": [
    {
      "spamBlockDate": {
        "$date": "2025-04-05T05:09:00.000Z"
      },
      "spamBlockDays": 1
    }
  ],
  "lazyCheckDate": {
    "$date": "2025-04-20T20:35:32.255Z"
  },
  "username": "galitsyna_blind"
},
{
  "_id": {
    "$oid": "67dd2b2df5fa1dc49466ca79"
  },
  "accountId": "6530443053-prefix-female-casino",
  "dc1": "37ef57c3580f3a203999f72f844747ef432f4be232e814e43a9ee8347da74da732bf0d8a3424f0c8fbab4e7fc5796105b577e7ce0d01a821d03e35d5e73c028dff25517a8cf0c66af3b433dc878171e3d3ac7540f0d347f86bf1ad1acf0195249f9a226ee3feae4564f3995942fd63b5a3bcc551e83175960c1edfb27e0731f2dfd512827b1ab258ccd9448e5cfd41b993cea3d32bb92485cd6fdad6760c5c1d89e9490fb3abaf45e37def41634d28989803b28a4fc5e9043062459de00585e2b365bde0c34cfa51d053c249788f09b50d3de8df8c18a68bcdcb475843c5fdc30358103d35677486e0788d62e738bc6f874d0631b9e50ad9f94c8a12c29d5af5",
  "dcId": 1,
  "nextApiId": 2040,
  "dateUpdated": {
    "$date": "2025-04-21T13:16:28.427Z"
  },
  "banned": false,
  "firstName": "Anastasia",
  "id": "6530443053",
  "lastName": "Malyutina",
  "messageCount": 17,
  "twoFa": false,
  "twoFaDate": {
    "$date": "2025-04-20T20:22:25.070Z"
  },
  "automaticCheckDate": {
    "$date": "2025-04-21T13:16:28.427Z"
  },
  "remainingTime": {
    "$date": "2025-04-21T07:37:04.486Z"
  },
  "personalChannelDate": {
    "$date": "2025-03-29T21:32:29.459Z"
  },
  "personalChannel": "iUCsyYFFAtuK2dYW",
  "lazyCheckDate": {
    "$date": "2025-04-20T21:07:43.404Z"
  },
  "username": "malyutina_nutritious"
},
{
  "_id": {
    "$oid": "67dd2b2df5fa1dc49466ca7b"
  },
  "accountId": "6697502592-prefix-female-casino",
  "dc1": "1916a101a026e5619e3598efc25e2b02b72d9602df5e9afd24bb58f08f405c58588b45cc9cf7edeff16179495a1388488d19218cdf801a1afdd5c142bb5d8fa45181e2068dc87dcd8e365319ec4a21e4c3950386bb51b7089274acbc7a7854a1f1633e9452fb98d1dd492745639b602248c70dde1faacaf325d5eb3b92ecd26fc473845d5bfb497eb5b9fd83ad77bce4143bc68cbdf1dd5e2f43811b45d8ce639ce135c0f641e990573adec86a37829a2233ddf92a26db20f354cb80edc1824015b53f7876b77766dd9618375c9d30fbc7a6b6a44d15e25d94523f2990a302d15a1c8b6f3f0c92636ef3da9b9ecb7e633dc95b9a02f76cce9cad9029c7743d3c",
  "dcId": 1,
  "nextApiId": 2040,
  "dateUpdated": {
    "$date": "2025-04-21T13:30:27.712Z"
  },
  "banned": false,
  "firstName": "Anna",
  "id": "6697502592",
  "lastName": "Bogdanova",
  "messageCount": 13,
  "twoFa": false,
  "twoFaDate": {
    "$date": "2025-04-20T20:22:25.068Z"
  },
  "automaticCheckDate": {
    "$date": "2025-04-21T13:30:27.712Z"
  },
  "remainingTime": {
    "$date": "2025-04-21T07:06:45.941Z"
  },
  "historySpamBlocks": [
    {
      "spamBlockDate": {
        "$date": "2025-04-04T08:11:00.000Z"
      },
      "spamBlockDays": 7
    },
    {
      "spamBlockDate": {
        "$date": "2025-04-05T02:10:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-04-09T05:07:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-04-28T05:10:00.000Z"
      },
      "spamBlockDays": 7
    }
  ],
  "personalChannel": "VbY3JeGdqGNineqe",
  "personalChannelDate": {
    "$date": "2025-03-29T15:24:36.415Z"
  },
  "lazyCheckDate": {
    "$date": "2025-04-20T20:46:31.069Z"
  },
  "username": "bogdanova_electronic",
  "spamBlockReasons": [
    {
      "reason": "Id like to regain full access to messaging features, as my account seems to be incorrectly flagged. I havent violated any rules and would appreciate a review.",
      "date": {
        "$date": "2025-04-21T05:49:54.857Z"
      }
    }
  ],
  "spamBlockDate": {
    "$date": "2025-04-28T05:10:00.000Z"
  },
  "spamBlockDays": 7,
  "spamBlockInitDate": {
    "$date": "2025-04-21T05:49:54.862Z"
  }
},
{
  "_id": {
    "$oid": "67dd2b2df5fa1dc49466ca7f"
  },
  "accountId": "6771329695-prefix-female-casino",
  "dc2": "a62b1b604b69cdc3308ff5a5fc968c32fce9a1cdf38f6458fa17cc9545e09af8cc07ba5977a9cbdfd87d5522692a8587b132346bc44faaddefe59aea1e42245fe2b396058f273b62da62ed0d88b103b56c9bdaa7f4ccb221cd0f342f1277adfdd2d0a9d68f72fd6e27af7d04d06adf847229e38dd87e14242bd11809194afd8dde039b29d2dcc8f1e4f5bddbc93b1a3238da1b1bb18c1398397f616a0b0ce5aaadf1d03104aaec3c198b58af44db266f9aa60c9f29f02f9e4f01ddfdcaae768ef9ce6864199c01031a2f95e7da9d63b5d21ff1af8543184c008a992313f8619a7ea2365aa516130e2e6e97e5ef67f20e6ce1f687db35ae0488ef407f290e4f8e",
  "dcId": 2,
  "nextApiId": 2040,
  "dateUpdated": {
    "$date": "2025-04-21T21:54:56.302Z"
  },
  "banned": false,
  "firstName": "Irina",
  "id": "6771329695",
  "lastName": "Glazunova",
  "messageCount": 55,
  "twoFa": false,
  "twoFaDate": {
    "$date": "2025-04-20T16:06:47.424Z"
  },
  "automaticCheckDate": {
    "$date": "2025-04-21T21:54:56.302Z"
  },
  "remainingTime": {
    "$date": "2025-04-21T14:51:33.253Z"
  },
  "historySpamBlocks": [
    {
      "spamBlockDate": {
        "$date": "2025-03-30T13:00:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-04-01T23:15:00.000Z"
      },
      "spamBlockDays": 1
    }
  ],
  "personalChannel": "bRMrm8VAhOSkSIcM",
  "personalChannelDate": {
    "$date": "2025-03-29T15:23:32.723Z"
  },
  "lazyCheckDate": {
    "$date": "2025-04-21T21:54:56.036Z"
  },
  "username": "glazunova_correct"
},
{
  "_id": {
    "$oid": "67dd2b2ef5fa1dc49466ca87"
  },
  "accountId": "6276972110-prefix-female-casino",
  "dc1": "a100496aec1bc8aeed03a8cf7bb009a3f28fba5f123c86d1cf077e68d07415f0764a45c231095b8297c7823e543e98c39bc8ad5c83412a68ef88c2f9169304f5795a457fb3161216bbd50c73c989dd61065ae4bf46c4db11941e00b15be6445beb6942c02f8a51079c14e464daa8fa96124418f5bb5f668af8a7840be9e88f86065608729abf93087991c4182db698b242473d6df801c6debeeab656115199fa7975213cbb1eeeb4dbc7bd54c27f3732736c522694650c2489ff1583cb408351b80b6f00af37c3ac7e1e1e8ae459690125210ca5cbac95da3a27132526130e75790c959c767e03c814e99726bbef784d18011b089b6d786da69e01f1e427dc06",
  "dcId": 1,
  "nextApiId": 2040,
  "dateUpdated": {
    "$date": "2025-04-21T13:21:30.887Z"
  },
  "banned": false,
  "firstName": "Albina",
  "id": "6276972110",
  "lastName": "Ivanova",
  "messageCount": 34,
  "twoFa": false,
  "twoFaDate": {
    "$date": "2025-04-20T16:06:45.089Z"
  },
  "automaticCheckDate": {
    "$date": "2025-04-21T13:21:30.887Z"
  },
  "remainingTime": {
    "$date": "2025-04-21T14:02:21.805Z"
  },
  "personalChannel": "aQV9tXAvpSaAJthM",
  "personalChannelDate": {
    "$date": "2025-03-29T15:25:14.439Z"
  },
  "lazyCheckDate": {
    "$date": "2025-04-20T20:32:28.011Z"
  },
  "username": "ivanova_mechanical"
},
{
  "_id": {
    "$oid": "67dd2b2ff5fa1dc49466ca89"
  },
  "accountId": "6647776089-prefix-female-casino",
  "dc2": "8ce913fee2cd4d9462751ca68a26cc9829f3f294b177f9e8651fd83f8123cf0006316eaf59182b6b10f3050be32071e17ba0cf64108caf54f82c6148cb4673db83b91d9c02af461e617226aac50e7fc32051be41b7de79776f5f735aae2f33d9addaad46cef267ed54495d030c4887eadd70bc80bf2c0be746645dd78636e0a8129b346f26a83d446843c263887f955c2efacd8b31d5767fcaf7245a983a46c880e5ab4ba177a5e04585948a5495ae1a0680c4d6e31434edad8f2229fde04fbc6aafab7f568aaa1de39829f6e10860fd121ed4e747a89bff9106c8daa9afd21e12aa0c6d6ccfc166c90f580a545cd83573ed808bf24f4e11c519e474ab7120f1",
  "dcId": 2,
  "nextApiId": 611335,
  "dateUpdated": {
    "$date": "2025-04-21T21:53:02.764Z"
  },
  "banned": false,
  "firstName": "Irina",
  "id": "6647776089",
  "lastName": "Tomilova",
  "messageCount": 57,
  "twoFa": false,
  "twoFaDate": {
    "$date": "2025-04-20T16:06:44.041Z"
  },
  "automaticCheckDate": {
    "$date": "2025-04-21T21:53:02.764Z"
  },
  "remainingTime": {
    "$date": "2025-04-21T14:51:01.082Z"
  },
  "historySpamBlocks": [
    {
      "spamBlockDate": {
        "$date": "2025-03-30T10:44:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-04-09T00:19:00.000Z"
      },
      "spamBlockDays": 1
    }
  ],
  "personalChannel": "GhqtdXfzoTjXQ8tV",
  "personalChannelDate": {
    "$date": "2025-03-29T15:26:18.344Z"
  },
  "lazyCheckDate": {
    "$date": "2025-04-21T21:53:02.372Z"
  },
  "username": "tomilova_smoggy"
},
{
  "_id": {
    "$oid": "67dd2b2ff5fa1dc49466ca8e"
  },
  "accountId": "7069613799-prefix-female-casino",
  "dc1": "038c79779bc5749ca9883ac50be45b15f668e6ae71a85803d7a06edfebf54b534f734ff69186484c9e5aa99f6695fb9f54edbca1f5a21b8b36e368058aa6b4ae7d8358398caec539c016fb4d423b9f45198ec62ba2afe942182fa4d4fcf856658a5da860e7971d202da0b18d734d95e6b7fda9f2b990d115f9818c181104558c890f677306e7026f012ab1fa5ecd29564e456aa14947c5fcaccfe755322e0ddeaa93d4f2cc5286441df2fd0b4a1255ab530bcb3236eac9e4367bd554564c0cf39e1a59c36113630cc13aa560c11e011454c6f4b30b4f1fc79cbdda2232f27428d4670ff8336359776a62879aeec89b6ae8cee16e438e88d891203c7d6177bcc7",
  "dcId": 1,
  "nextApiId": 2040,
  "dateUpdated": {
    "$date": "2025-04-21T13:12:28.380Z"
  },
  "banned": false,
  "firstName": "Margarita",
  "id": "7069613799",
  "lastName": "Soboleva",
  "messageCount": 15,
  "twoFa": false,
  "twoFaDate": {
    "$date": "2025-04-20T20:22:25.919Z"
  },
  "automaticCheckDate": {
    "$date": "2025-04-21T13:12:28.380Z"
  },
  "remainingTime": {
    "$date": "2025-04-21T07:10:52.659Z"
  },
  "personalChannel": "tZyh0JdHnCHKaWWJ",
  "personalChannelDate": {
    "$date": "2025-03-29T15:23:29.354Z"
  },
  "lazyCheckDate": {
    "$date": "2025-04-20T20:45:31.143Z"
  },
  "historySpamBlocks": [
    {
      "spamBlockDate": {
        "$date": "2025-04-08T06:29:00.000Z"
      },
      "spamBlockDays": 1
    }
  ],
  "username": "soboleva_fiscal"
},
{
  "_id": {
    "$oid": "67dd2b2ff5fa1dc49466ca96"
  },
  "accountId": "7229859526-prefix-female-casino",
  "dc1": "5b57252551277f515d08fe2315c318bbe6d3c026fa3fcb1a49ac4955f9c2512f6eca94397f66a713d9c9b9668aea8e58b32cfd075623c40d08d35efcf9fdb8a4c6e75132a5320b6466d930bbdc51f1cf7ebbb0741634d32d957d0f9d1071df26bd24663332e5ed18614d1e8852fbcc94133f689a89b6b4140cafc845ba511e2c9993edc63dbe5848be3eaf0dc1a617a487d9eddbad1960e335958649d2c8c5854b995076d6704064426a2c5f1e9504f565c26503b2f4538cbbff4e4cc03cd2546de1b8200d8bc48b820a77a9debb1c0a6b739c5f82123751a31365735bbaa6130d47a69ecd4de568fc08173dc89fba2ba03b2839bb28615e86c9e59a8e9e657b",
  "dcId": 1,
  "nextApiId": 2040,
  "dateUpdated": {
    "$date": "2025-04-21T13:27:29.895Z"
  },
  "banned": false,
  "firstName": "Raisa",
  "id": "7229859526",
  "lastName": "Osipova",
  "messageCount": 17,
  "twoFa": false,
  "twoFaDate": {
    "$date": "2025-04-20T16:06:44.886Z"
  },
  "automaticCheckDate": {
    "$date": "2025-04-21T13:27:29.895Z"
  },
  "remainingTime": {
    "$date": "2025-04-21T07:07:42.453Z"
  },
  "personalChannel": "VIfuqJtWNGtdY4Gs",
  "personalChannelDate": {
    "$date": "2025-03-29T15:22:35.318Z"
  },
  "lazyCheckDate": {
    "$date": "2025-04-20T21:07:43.320Z"
  },
  "historySpamBlocks": [
    {
      "spamBlockDate": {
        "$date": "2025-04-09T05:35:00.000Z"
      },
      "spamBlockDays": 1
    }
  ],
  "username": "osipova_frequent"
},
{
  "_id": {
    "$oid": "67dd2b2ff5fa1dc49466ca99"
  },
  "accountId": "6508474813-prefix-female-casino",
  "dc4": "53ddb0248b02dc519f157d59b83219b87a14e37067362ec99519bde773621bc87f94c851cf55d796984447e8267196cec379249e5c22776b47cdfef95e8ec38a5bd87637863b3c9160dd126d2493d95baa0c9f4edc053c8da7f0e2e0d90cda7c0b176475ad708f49f331879e042af5d6ac2346a0f9a6528c5975655939a8de1966c9e87e2d790f5fe5174533322e972c8863776e0623566082a7a5d9949aa2078bb2865ab4422ec00cc13722dd30a3967e74daf3a9c72727f41c9549ab702241e8e886e53ef9e9e488101cb52ffdde208f17f1e779ff5b7b855891e7c4725cb2a2ad313c189d374485824a12712c629a9e0c307e27eea4e7316eabb808553137",
  "dcId": 4,
  "nextApiId": 2040,
  "dateUpdated": {
    "$date": "2025-04-21T13:13:32.362Z"
  },
  "banned": false,
  "firstName": "Anna",
  "id": "6508474813",
  "lastName": "Tsyganova",
  "messageCount": 61,
  "twoFa": false,
  "twoFaDate": {
    "$date": "2025-04-20T20:22:25.951Z"
  },
  "automaticCheckDate": {
    "$date": "2025-04-21T13:13:32.361Z"
  },
  "remainingTime": {
    "$date": "2025-04-21T14:04:29.122Z"
  },
  "personalChannel": "aqLFiH6IbaxxISya",
  "personalChannelDate": {
    "$date": "2025-03-29T15:24:55.528Z"
  },
  "lazyCheckDate": {
    "$date": "2025-04-20T20:45:30.264Z"
  },
  "historySpamBlocks": [
    {
      "spamBlockDate": {
        "$date": "2025-04-12T10:17:00.000Z"
      },
      "spamBlockDays": 3
    }
  ],
  "username": "tsyganova_entire"
},
{
  "_id": {
    "$oid": "67dd2b30f5fa1dc49466ca9e"
  },
  "accountId": "7675321643-prefix-female-casino",
  "dc4": "1931e1cfb6bd21d89fb69cbb34955940fb5d3b1c60e13db4d57489654ed366b340443cf1996c40971aa9a3a5486d1e6c832176bd7b728cc0cb50a7dc22f0b993d316d4487665dfcdf36712be5e090f4181245f068c44e4c229c125bc0d368b769406815adf5804b11996a30afc97ba6592c92af1f9be62761d24e6ae4e98ca9698c2670a4f15cafc9d721db1050d4deea241142a098ff2444bdb708f2b23fba4166d98af96ed043c523faac5f370938c5e19b52652ee89bbbf0bf89c4514d2ea8140fc1823997f59d559a46f04d39fa09601cdcdc3e3e0005f8902c84cf0dc8be6e2b83f93f4fad1ac4f19d97cda7834740b5e6cd4de8e553d0705d49d179f53",
  "dcId": 4,
  "nextApiId": 2496,
  "dateUpdated": {
    "$date": "2025-04-21T13:09:30.961Z"
  },
  "banned": false,
  "firstName": "Daria",
  "id": "7675321643",
  "lastName": "Vasilyeva",
  "messageCount": 62,
  "twoFa": false,
  "twoFaDate": {
    "$date": "2025-04-20T20:22:25.474Z"
  },
  "automaticCheckDate": {
    "$date": "2025-04-21T13:09:30.961Z"
  },
  "remainingTime": {
    "$date": "2025-04-21T14:51:32.647Z"
  },
  "personalChannel": "WJdSOgUoHwSSn1vc",
  "personalChannelDate": {
    "$date": "2025-03-29T15:23:22.036Z"
  },
  "lazyCheckDate": {
    "$date": "2025-04-20T21:02:47.495Z"
  },
  "username": "vasilyeva_accessible"
},
{
  "_id": {
    "$oid": "67dd2b31f5fa1dc49466caa8"
  },
  "accountId": "7655059088-prefix-female-casino",
  "dc1": "ab7abb70596a4ecbb3df90ad4d417ab3e3525b287ac67b60e5cca2d232f080ca0cd2998911f03496f0522f605419d1c9f2cef37a7669320d0aaadf4b73d82715a346b6d594ed4618c018a977aae59994ca020a79263d9bfd09a9518189e6d30e5255058aeb60f99bd1a013273826be74738611df1a72561871f7e965029799d9b5267d7e6e5dd46620ad09207698956a6f27778e893f3d85e4b8ad59bcc4efa1ca6c4e7691d878e8faea6834ec6836cd6d8915d1d8cf412899761a8b08182a72fc379a768f84859dc4186589f80355b4afed4b6f1d45aff6b2a889797940a4fc5e1f68265f6538057f14a8f40a738dd8eab05257ba407149bfa0d54302d2a8ee",
  "dcId": 1,
  "nextApiId": 2040,
  "dateUpdated": {
    "$date": "2025-04-21T13:12:29.846Z"
  },
  "banned": false,
  "firstName": "Evgenia",
  "id": "7655059088",
  "lastName": "Tkacheva",
  "messageCount": 17,
  "twoFa": false,
  "twoFaDate": {
    "$date": "2025-04-20T16:06:52.974Z"
  },
  "automaticCheckDate": {
    "$date": "2025-04-21T13:12:29.846Z"
  },
  "remainingTime": {
    "$date": "2025-04-21T07:01:42.908Z"
  },
  "historySpamBlocks": [
    {
      "spamBlockDate": {
        "$date": "2025-04-04T06:30:00.000Z"
      },
      "spamBlockDays": 7
    },
    {
      "spamBlockDate": {
        "$date": "2025-04-02T07:14:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-04-09T03:36:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-04-18T14:16:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-04-22T05:09:00.000Z"
      },
      "spamBlockDays": 1
    }
  ],
  "personalChannel": "NgyhN5ptOwSPLSak",
  "personalChannelDate": {
    "$date": "2025-03-29T15:23:01.399Z"
  },
  "lazyCheckDate": {
    "$date": "2025-04-20T21:10:44.681Z"
  },
  "username": "tkacheva_unable",
  "spamBlockReasons": [
    {
      "reason": "Id like my messaging feature back. The current restriction prevents me from contacting important people who dont know about my account yet. Ive caused no trouble to warrant this.",
      "date": {
        "$date": "2025-04-21T05:47:14.937Z"
      }
    }
  ],
  "spamBlockDate": {
    "$date": "2025-04-22T05:09:00.000Z"
  },
  "spamBlockDays": 1,
  "spamBlockInitDate": {
    "$date": "2025-04-21T05:47:14.942Z"
  }
},
{
  "_id": {
    "$oid": "67dd2b31f5fa1dc49466caac"
  },
  "accountId": "1516126916-prefix-female-casino",
  "dc4": "2ba84b0a1b09891f2028f63073fdc156102ef48663ad92505a113b569b00f421e0befdb97a95b80b0bbb28acda16ab44f82dfea8f37ec5c3ebb9e9c30cebaca0650544777042c65014b1d9005adf393c2698d3cfe357dc6732683ac9039577516c1105aaef2645f2203f26bca4a319d92db8d84c42a9793aadc555e3aac669ce2d97c96750020abcec412d7d2fb5994c1182f58cef7ed17eb1a37cb85d380a390063ee61c205fd99c167a1695743f33b5f727e6a913507eefb1df3954e3d50e781ebebf1da85406df753d7bd0d0a173d54d76cae6f9d3af62d63ddcff9cec2ba10709d5c9a825b1799f190a98d6ebe2e6b3db143bc59bb9a06bfef65a3d924dd",
  "dcId": 4,
  "nextApiId": 2496,
  "dateUpdated": {
    "$date": "2025-04-21T21:50:25.707Z"
  },
  "banned": false,
  "firstName": "Tatiana",
  "id": "1516126916",
  "lastName": "Melnikova",
  "messageCount": 65,
  "twoFa": false,
  "twoFaDate": {
    "$date": "2025-04-20T16:06:42.015Z"
  },
  "automaticCheckDate": {
    "$date": "2025-04-21T21:49:04.062Z"
  },
  "remainingTime": {
    "$date": "2025-04-21T15:33:25.866Z"
  },
  "personalChannel": "fWR4EPVGZcTLqFuK",
  "personalChannelDate": {
    "$date": "2025-03-29T15:27:34.407Z"
  },
  "lazyCheckDate": {
    "$date": "2025-04-21T21:49:02.856Z"
  },
  "username": "melnikova_mammoth",
  "spamBlockReasons": [
    {
      "reason": "Im unable to send messages to non-mutual contacts, which is affecting my work. My accounts limitation is likely an error, as I havent violated any rules. Please restore full messaging functionality.",
      "date": {
        "$date": "2025-04-21T21:50:25.690Z"
      }
    }
  ],
  "historySpamBlocks": [
    {
      "spamBlockDate": {
        "$date": "2025-04-22T13:50:00.000Z"
      },
      "spamBlockDays": 1
    }
  ],
  "spamBlockDate": {
    "$date": "2025-04-22T13:50:00.000Z"
  },
  "spamBlockDays": 1,
  "spamBlockInitDate": {
    "$date": "2025-04-21T21:50:25.707Z"
  }
},
{
  "_id": {
    "$oid": "67dd2b31f5fa1dc49466cab3"
  },
  "accountId": "1477364384-prefix-female-casino",
  "dc4": "106cb4b9cf356366378f84f858010c9d9e76f421b62fae905c8ed104787715a5697b98030436c0bb7a7dfaddfa9b6b287f7ec35615865876ae5cfe1bc69faf6affc17c0d3b7e3d0303407da50bd9fa4eea286819fd144a410a00506c8c27a65638041a051a78d95eaffbdbcb308a12d0b5e446752877be7c619cf009cb3ac2748169c3283040984e01ae378d66cc3a29e35392ae265cafb421351a43b23b6bc71c8dd030b000d4d4219cbd7f32584f916b13c4b2a3ed22716320d13e7edaabf06cdb2bd4f8a8a972aac3a3419fea7ad2dd8e31c709b167ed8263c555305fa0c53cdcdf7d5014cf287d4eec4c7f0db34b84bef52f938ea9f876a3332fdd75bff9",
  "dcId": 4,
  "nextApiId": 2040,
  "dateUpdated": {
    "$date": "2025-04-21T13:13:32.510Z"
  },
  "banned": false,
  "firstName": "Lubov",
  "id": "1477364384",
  "lastName": "Romanova",
  "messageCount": 53,
  "twoFa": false,
  "twoFaDate": {
    "$date": "2025-03-30T10:50:55.871Z"
  },
  "automaticCheckDate": {
    "$date": "2025-04-21T13:13:32.510Z"
  },
  "remainingTime": {
    "$date": "2025-04-21T14:08:04.881Z"
  },
  "personalChannel": "js2maVOUDfuVPWHd",
  "personalChannelDate": {
    "$date": "2025-03-29T15:26:19.485Z"
  },
  "historySpamBlocks": [
    {
      "spamBlockDate": {
        "$date": "2025-04-02T17:38:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-04-05T12:17:00.000Z"
      },
      "spamBlockDays": 1
    }
  ],
  "lazyCheckDate": {
    "$date": "2025-04-20T20:50:29.893Z"
  },
  "username": "romanova_grim"
},
{
  "_id": {
    "$oid": "67dd2b32f5fa1dc49466cab9"
  },
  "accountId": "7719885799-prefix-female-casino",
  "dc4": "a791e1cde5fb68c4e27a728d9d843757d7cf0b757ddcc5c980e1e6030baad773ad83b735daf95476cecb21641b6b780832851fb1f32844164332c9ddb55b12b09d2e8c91c38179397f7b9170ae4b823053606fddf9ecaddafa49406c679feb9336a725bb26db0dd499a1cd26685e45819bc9cbec9b67410043d07807a4a0047dcb6569005ca5ee3c72fa18221d8209fb1dcfadf43db278407caa82d78b05ec213d13d49817be30538b3f471c263ffd76ce495cad11926a820b1e5100b9f6244e85f5afb53f11bd1b3de8b9dca2d641837c3481482844172f96e41598032623936372dc586e9874e5d5b8fe03e077aff156f769363e2b2424e3ec0035291f55de",
  "dcId": 4,
  "nextApiId": 2496,
  "dateUpdated": {
    "$date": "2025-04-21T21:53:50.137Z"
  },
  "banned": false,
  "firstName": "Inna",
  "id": "7719885799",
  "lastName": "Ilyina",
  "messageCount": 42,
  "twoFa": false,
  "twoFaDate": {
    "$date": "2025-04-20T16:06:47.466Z"
  },
  "automaticCheckDate": {
    "$date": "2025-04-21T21:53:50.137Z"
  },
  "remainingTime": {
    "$date": "2025-04-21T12:35:27.234Z"
  },
  "personalChannel": "OYmuceUGa1PoWonI",
  "personalChannelDate": {
    "$date": "2025-03-29T15:25:10.004Z"
  },
  "historySpamBlocks": [
    {
      "spamBlockDate": {
        "$date": "2025-04-05T18:54:00.000Z"
      },
      "spamBlockDays": 1
    }
  ],
  "lazyCheckDate": {
    "$date": "2025-04-21T21:53:50.017Z"
  },
  "username": "ilyina_technical"
},
{
  "_id": {
    "$oid": "67dd2b33f5fa1dc49466cac1"
  },
  "accountId": "7658922151-prefix-female-casino",
  "dc1": "c0886e419defd9e28fc89cd2f118a6ee716147003d5997ccc627d1d86895596cf850b2da08f324abdad8b98ab3c0eea508d2180dfe49425bf2912a2691321e558c25f752f88328638902fab7a52fcdba8b470425af54a912ef7a9bd0e5c50640adf6b11c90a822ebe43cc602d0b02f4a061c30260ea9f5727e01055b460ab4261d3395885f9624be9ac329df09f7f35332d71450b08bc84e0996f666d4a75d35a0c00fe88b48ebc7d09fe2784f12ce82d313f89b70cb32a5271495823eb73903b2fd95ab4787110aafd0987a9046c6615f59b5f26856c612de93f9c08582f5f332b1bd97b9dc71bb5464f5cc3c7b8bdc0ef5eb2f7531f19d3213965010ddeab8",
  "dcId": 1,
  "nextApiId": 2040,
  "dateUpdated": {
    "$date": "2025-04-21T21:55:59.770Z"
  },
  "banned": false,
  "firstName": "Alisa",
  "id": "7658922151",
  "lastName": "Kuzmina",
  "messageCount": 15,
  "twoFa": false,
  "twoFaDate": {
    "$date": "2025-04-20T20:22:23.001Z"
  },
  "automaticCheckDate": {
    "$date": "2025-04-21T21:55:59.770Z"
  },
  "remainingTime": {
    "$date": "2025-04-21T07:54:53.297Z"
  },
  "personalChannel": "FAD9aZjSkPAniyiQ",
  "personalChannelDate": {
    "$date": "2025-03-29T15:26:51.598Z"
  },
  "lazyCheckDate": {
    "$date": "2025-04-21T21:55:59.522Z"
  },
  "username": "kuzmina_evident"
},
{
  "_id": {
    "$oid": "67dd2b33f5fa1dc49466cac6"
  },
  "accountId": "5561077179-prefix-female-casino",
  "dc1": "603c39196505e041bc082a3c1bb00273605ef21167655e76b9bf31f7f92fb9a4e8f4eb4bbe51ff362198831c995d914b3717f10b7b95179fa90bcd8e92cea2a6619bfeabdf8f86cfe40bbad4cdd6c8b4132c65c9d18062d440ac21be2cb1eb200fdefc2dd072482dfb10a0ba3dbbce2dd516d13e9804db08ec632ac6cf943163ee0c50a9d1f422244dd7e25be2405a520e4ea65aeebff08a650c89dbd66b559aa1809fe74f4e573b2de10382f4a5af8d5ba496161a2238f42e0ebc9eb95ba80158769b914fd7035c4144cbafd8bd1d3b9262c24580d9bd3b4011aeb67a1582cf7839260b8bc0fa5561e416b0bbeded30a572c3081b2eeea9583b7b997874fd07",
  "dcId": 1,
  "nextApiId": 2040,
  "dateUpdated": {
    "$date": "2025-04-21T13:15:30.888Z"
  },
  "banned": false,
  "firstName": "Tatiana",
  "id": "5561077179",
  "lastName": "Gorshkova",
  "messageCount": 11,
  "twoFa": false,
  "twoFaDate": {
    "$date": "2025-04-20T20:22:26.654Z"
  },
  "automaticCheckDate": {
    "$date": "2025-04-21T13:15:30.888Z"
  },
  "remainingTime": {
    "$date": "2025-04-21T07:35:36.319Z"
  },
  "historySpamBlocks": [
    {
      "spamBlockDate": {
        "$date": "2025-04-05T10:29:00.000Z"
      },
      "spamBlockDays": 7
    },
    {
      "spamBlockDate": {
        "$date": "2025-04-01T03:47:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-04-06T05:12:00.000Z"
      },
      "spamBlockDays": 3
    }
  ],
  "personalChannelDate": {
    "$date": "2025-03-29T21:34:17.427Z"
  },
  "personalChannel": "UdJMUjtdQpN5OjeK",
  "lazyCheckDate": {
    "$date": "2025-04-20T21:03:45.077Z"
  },
  "username": "gorshkova_salty"
},
{
  "_id": {
    "$oid": "67dd2b35f5fa1dc49466caff"
  },
  "accountId": "6274942962-prefix-female-casino",
  "dc1": "4e3e229f847137712ac6df5e2c0df6183b9ba881d4da0dc2c475fc42fd2ae423191419ded4325eb46f70fcbb44301c2fc042ff45346d3ed03087a2ee89f3e36debb22ea8aba576b1591d3f48d25f03e7220a7830c320a2101d8f59c30df4df51e0ea0faabefcf849a6fce1274eb0fa0c0d3d753c243b897bf6873a34823e8e713a3c48e765e6c4a7550e030374cff5cdcff9f32de54bea221c62c32833b86a45e343c1929b7f3bf2f5d8e5ce20c96a49447ff752490265bd0770b4d064d84067affb62f331ae2afc72c01ef587f42cc2205d7aab2a100cb0952b5e07c7a72502eae819580866bf6e12fc8aa8199348858ba8b713a41a9dce875a77292e1af482",
  "dcId": 1,
  "nextApiId": 2040,
  "dateUpdated": {
    "$date": "2025-04-21T13:16:30.880Z"
  },
  "banned": false,
  "firstName": "Anna",
  "id": "6274942962",
  "lastName": "Galitsyna",
  "messageCount": 14,
  "twoFa": false,
  "twoFaDate": {
    "$date": "2025-04-20T16:06:44.076Z"
  },
  "automaticCheckDate": {
    "$date": "2025-04-21T13:16:30.880Z"
  },
  "remainingTime": {
    "$date": "2025-04-21T07:06:16.982Z"
  },
  "personalChannel": "LuiSfWGouX5mdNtz",
  "personalChannelDate": {
    "$date": "2025-03-29T15:26:30.670Z"
  },
  "historySpamBlocks": [
    {
      "spamBlockDate": {
        "$date": "2025-04-06T08:00:00.000Z"
      },
      "spamBlockDays": 7
    },
    {
      "spamBlockDate": {
        "$date": "2025-04-04T06:26:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-04-11T11:56:00.000Z"
      },
      "spamBlockDays": 3
    }
  ],
  "lazyCheckDate": {
    "$date": "2025-04-20T21:16:47.687Z"
  },
  "username": "galitsyna_welcome"
},
{
  "_id": {
    "$oid": "67dd2b35f5fa1dc49466cb01"
  },
  "accountId": "5906433408-prefix-female-casino",
  "dc1": "6f73f1ac566125a8dfbbf9b167e3a0f48a54527cba9cef84cefbb8a8959e6545adb69b4de59034eb754f6c8fd2cc9e51e063374e0b9d20e4c4bef4a7309322b91f299baeb3d716ff772f1195548a1dbdad804af0a66ff1cb1ffea82d272cc45a54d49401f10c48e30739b367e819ece13e8dd6c15280df9847a7e2ffa398fddc2977eaf473485b7f7935018b42a93aee9403c3ab4786fd22d8aa4c40f6b4484cc55dcc9238c48a7feec50a6befa4a72de48477f1e3b41a3fbf1c0ac58d91340e361526386ab680ceeccc245cc1855af0dc319c35d296fa5837af746a24d3f1e8893f10736d5276b489ffbe4f7a909a13a37729b8eb547a77552661fb95378593",
  "dcId": 1,
  "nextApiId": 2040,
  "dateUpdated": {
    "$date": "2025-04-21T21:55:59.439Z"
  },
  "banned": false,
  "firstName": "Anastasia",
  "id": "5906433408",
  "lastName": "Vasilyeva",
  "messageCount": 17,
  "twoFa": false,
  "twoFaDate": {
    "$date": "2025-04-20T16:06:45.077Z"
  },
  "automaticCheckDate": {
    "$date": "2025-04-21T21:55:59.439Z"
  },
  "remainingTime": {
    "$date": "2025-04-21T07:37:00.027Z"
  },
  "historySpamBlocks": [
    {
      "spamBlockDate": {
        "$date": "2025-04-05T06:00:00.000Z"
      },
      "spamBlockDays": 7
    },
    {
      "spamBlockDate": {
        "$date": "2025-04-02T12:57:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-04-03T13:33:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-04-08T03:43:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-04-10T09:21:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-04-22T06:03:00.000Z"
      },
      "spamBlockDays": 1
    }
  ],
  "personalChannelDate": {
    "$date": "2025-03-29T21:33:03.637Z"
  },
  "personalChannel": "yFtQtSWwA6hPPjoP",
  "lazyCheckDate": {
    "$date": "2025-04-21T21:55:59.111Z"
  },
  "username": "vasilyeva_external",
  "spamBlockReasons": [
    {
      "reason": "My account has been unfairly blocked from messaging, despite no violations. I have not engaged in any suspicious activity and believe this action was taken in error. Please review my case.",
      "date": {
        "$date": "2025-04-21T06:22:37.846Z"
      }
    }
  ],
  "spamBlockDate": {
    "$date": "2025-04-22T06:03:00.000Z"
  },
  "spamBlockDays": 1,
  "spamBlockInitDate": {
    "$date": "2025-04-21T06:22:37.851Z"
  }
},
{
  "_id": {
    "$oid": "67dd2b36f5fa1dc49466cb05"
  },
  "accountId": "6391318242-prefix-female-casino",
  "dc4": "480dd14899a1a8529ae447106ea2e5ec7df6c9dfea8f8448527feca49490f59fa0da9f5ef7f3dfbc7d22e127bba9442a91fbfea174983a5bf24f3b6f6004fc06b197df7c72f31f679353dc9fbfe806a41a53f32f4c3c54b73f800673285effaaf0247b8f1302cec9f3a87a39944ecba055582d052ea39fc8b42c800434aa8e8dbdaadb9c9f917cce9fa0bec7e61cccbea9dca933b2a77c6920d3fd4b603abdc4cb3e6b9c7dce9e6242ba8e0bd86dea61baa70782245b70b4be808ff0ad1e6ce073cef59b7a2e09fbb4922878c4118ed866ef340f26fa845bb9e562713a53ceb0c048c3956d85000a4c79d85af7ad19d9ad462592a4e0f58340f58c38ab7c4c10",
  "dcId": 4,
  "nextApiId": 2496,
  "dateUpdated": {
    "$date": "2025-04-21T21:50:01.031Z"
  },
  "banned": false,
  "firstName": "Maria",
  "id": "6391318242",
  "lastName": "Shubina",
  "messageCount": 10,
  "twoFa": false,
  "twoFaDate": {
    "$date": "2025-04-20T16:06:47.465Z"
  },
  "automaticCheckDate": {
    "$date": "2025-04-21T21:49:04.478Z"
  },
  "historySpamBlocks": [
    {
      "spamBlockDate": {
        "$date": "2025-04-11T14:52:00.000Z"
      },
      "spamBlockDays": 22
    },
    {
      "spamBlockDate": {
        "$date": "2025-04-22T14:42:00.000Z"
      },
      "spamBlockDays": 1
    }
  ],
  "personalChannel": "KxRxTMGApgnNbDV7",
  "personalChannelDate": {
    "$date": "2025-03-29T15:24:38.427Z"
  },
  "lazyCheckDate": {
    "$date": "2025-04-21T21:49:03.277Z"
  },
  "remainingTime": {
    "$date": "2025-04-21T14:46:41.078Z"
  },
  "username": "shubina_slimy",
  "spamBlockReasons": [
    {
      "reason": "I believe theres been a mistake. I havent done anything wrong, but I cant send messages to non-mutual contacts. I need this fixed ASAP for work.",
      "date": {
        "$date": "2025-04-21T21:50:01.026Z"
      }
    }
  ],
  "spamBlockDate": {
    "$date": "2025-04-22T14:42:00.000Z"
  },
  "spamBlockDays": 1,
  "spamBlockInitDate": {
    "$date": "2025-04-21T21:50:01.031Z"
  }
},
{
  "_id": {
    "$oid": "67dd2b36f5fa1dc49466cb07"
  },
  "accountId": "6723329394-prefix-female-casino",
  "dc1": "7d42a848e85965e03bdf9f41035084d9a13f8569e9bc690da198036655efa90be4b337acfc5ec5ca4ba2955c6201981d384e893133992deaa7be06deebd9d3a89b3d3cc41aaad57d8a04719849f9b380ed7f065d164469dcc199fe0d52da65fecf0f7c4ab853c999ef05db0ab5df53287dbb2015437dac23d3c681359765a991cc405de8e36df025cde8c0d8f70ac986494d8f85b127e55ab50e2ba66293f325977a2c6cb0b778d9951bbbafede78df10629fed5d2e14f8be9567eb6efc3b68c7acfde5af72c62bd46254e0eae89a8c5c8fb4eaae9b8d5fa1728ee165180e32ba1f75da6a4c5957dd9cde435f4d0f24787b26247ffaafb8f72c2114e6042b6bc",
  "dcId": 1,
  "nextApiId": 2040,
  "dateUpdated": {
    "$date": "2025-04-21T13:22:52.803Z"
  },
  "banned": false,
  "firstName": "Lubov",
  "id": "6723329394",
  "lastName": "Galitsyna",
  "messageCount": 25,
  "automaticCheckDate": {
    "$date": "2025-04-21T13:22:32.176Z"
  },
  "remainingTime": {
    "$date": "2025-04-21T15:22:52.803Z"
  },
  "personalChannel": "ZEodxcsgeTBQ3fUz",
  "personalChannelDate": {
    "$date": "2025-03-29T15:25:27.744Z"
  },
  "historySpamBlocks": [
    {
      "spamBlockDate": {
        "$date": "2025-04-12T05:50:00.000Z"
      },
      "spamBlockDays": 7
    },
    {
      "spamBlockDate": {
        "$date": "2025-05-20T12:46:00.000Z"
      },
      "spamBlockDays": 30
    }
  ],
  "lazyCheckDate": {
    "$date": "2025-04-20T21:10:49.735Z"
  },
  "username": "galitsyna_guilty"
},
{
  "_id": {
    "$oid": "67dd2b37f5fa1dc49466cb11"
  },
  "accountId": "5785554817-prefix-female-casino",
  "dc1": "910d8346d70ed0b5264ba188ec3e6c40b3da6d6bc3566e7a69022464eed911c31959ed428e20cd2e1ca7fb9821ca7a7292478f8481d53d3efaa001cf00774d5ca05ef63f706e35e369f452ba9fa9aab3f73379144c61dfdc84b2ae99354830e318cb952d15c2690e65598c936c907505ffd57037bca9813180fa089dbee72514ef7d95b0c32304d21a52c7720cd04ec21e78ffc0320b342590a4d89d0a1f5d634514a8e18952b0df600c2800f252f390550fb8906401fbe9cb408ab349ea6ab6007e29702bac740f60203f6bc9669c4e9924b8334c465cc251fbb12885a9364a7bd31b8ab50943148f2c0b124b3230630913c7eb84554e27001c46eaff3f537b",
  "dcId": 1,
  "nextApiId": 2040,
  "dateUpdated": {
    "$date": "2025-04-21T21:55:02.187Z"
  },
  "banned": false,
  "firstName": "Tatiana",
  "id": "5785554817",
  "lastName": "Eroshkina",
  "messageCount": 16,
  "twoFa": false,
  "twoFaDate": {
    "$date": "2025-04-20T16:06:44.889Z"
  },
  "automaticCheckDate": {
    "$date": "2025-04-21T21:55:02.187Z"
  },
  "remainingTime": {
    "$date": "2025-04-21T07:15:49.425Z"
  },
  "personalChannel": "oKGTVOmC9NIvANDA",
  "personalChannelDate": {
    "$date": "2025-03-29T15:26:18.025Z"
  },
  "lazyCheckDate": {
    "$date": "2025-04-21T21:55:01.858Z"
  },
  "username": "eroshkina_conservation"
},
{
  "_id": {
    "$oid": "67dd2b37f5fa1dc49466cb14"
  },
  "accountId": "6937147419-prefix-female-casino",
  "dc1": "72966ddde147c1e9ede0c5c15a0a97ba4febb6582afb47748600b092c6462ac9fd82531e7a8a9a6f369463652b63e6a6d1305e7d70fe0bb174286c365bdb9072d252bfcd5f78bd85972dcd0c1283d9eba6570e66f375bc24e0a41cd31604e2ec95176f03732f9b978c7df17a8c04192538cacd022c70f644f8ace10149cdada7b11bc4fdd7a3edb7538a97b773cd695b50158111a112a0b19f61f58cade7537a5923f36bc27950d295401e142a73d27ebfc6f61a3389a3df02afcc55cc8d2846936f3df012d3d38a16633ac2a2931b89f01109cde1dc8fb3b2b2fa84472623f92806028512e9eab7bc23c2d4fddd62d6e89c86c094ba4610caf20f1e2b7bf94a",
  "dcId": 1,
  "nextApiId": 2040,
  "dateUpdated": {
    "$date": "2025-04-21T21:49:03.949Z"
  },
  "banned": false,
  "firstName": "Svetlana",
  "id": "6937147419",
  "lastName": "Zakharova",
  "messageCount": 18,
  "twoFa": false,
  "twoFaDate": {
    "$date": "2025-04-20T20:22:23.424Z"
  },
  "automaticCheckDate": {
    "$date": "2025-04-21T21:49:03.949Z"
  },
  "remainingTime": {
    "$date": "2025-04-21T07:14:21.962Z"
  },
  "personalChannel": "wtej3WgJWBLWCizN",
  "personalChannelDate": {
    "$date": "2025-03-29T15:25:49.607Z"
  },
  "lazyCheckDate": {
    "$date": "2025-04-21T21:49:03.563Z"
  },
  "username": "zakharova_complete"
},
{
  "_id": {
    "$oid": "67dd2b38f5fa1dc49466cb17"
  },
  "accountId": "6554751265-prefix-female-casino",
  "dc1": "8eb7d591992c288bbf19420d3fe7c16628b4270068a5f645162dad246f9945f10f903722164bf07bb89f7066d72c1fbf7226bacee00a1e8dc7e410cfc1835079d6db392c0cc066dda56d936f85b3b0b84892ed26c7485a1c1ed49b2208061a8ba1ce158b894f275da7ffedb4916251e9a39c3254be12e22f828a04be074382c8df323900eed435cf5375020defcc07a489a36e9a27d3b9fe6c27de80f37378155674c8af8c3bd02fb99851fb90be1522557aa7b42ea3c678660b297ae9147a9352e1e120a1b673f1923b1a61021999e57a123984033a249600d459f2ab7b28c692b5b2ba8c3177bc6d1a69698270ccba5b781d479a05ff8dd33f843b0645ecb8",
  "dcId": 1,
  "nextApiId": 2040,
  "dateUpdated": {
    "$date": "2025-04-21T13:05:30.902Z"
  },
  "banned": false,
  "firstName": "Evgenia",
  "id": "6554751265",
  "lastName": "Gavrilova",
  "messageCount": 34,
  "twoFa": false,
  "twoFaDate": {
    "$date": "2025-04-20T20:22:23.413Z"
  },
  "automaticCheckDate": {
    "$date": "2025-04-21T13:05:30.902Z"
  },
  "remainingTime": {
    "$date": "2025-04-21T13:59:16.908Z"
  },
  "personalChannel": "UdKJxHAQIH5aAIxQ",
  "personalChannelDate": {
    "$date": "2025-03-29T15:23:47.378Z"
  },
  "lazyCheckDate": {
    "$date": "2025-04-20T21:19:51.513Z"
  },
  "historySpamBlocks": [
    {
      "spamBlockDate": {
        "$date": "2025-04-10T08:11:00.000Z"
      },
      "spamBlockDays": 1
    }
  ],
  "username": "gavrilova_international"
},
{
  "_id": {
    "$oid": "67dd2b39f5fa1dc49466cb21"
  },
  "accountId": "5331023881-prefix-female-casino",
  "dc1": "07f666849d9738889f77e5901598537d862f9ba5a9c76e0fedef613e9bc1c40a12414a08f231c92cfb6136f5696fa37eb0875cd1de916fcf8002f9fd3f25b6abaf062a5545fedd935b8f043ee37919e20067dfb6220e5e85de3cec6a7c430f281f3fee1a80a25fc43d2bcae65e39d1fee4b35e184c7758e0a776c52eca7609eb5e67884634bfad98ea9cd9bc8841bc2342249cd039419d8636c8355ec13fa2c2f323ca98f3e7ab421235efa19774352316eddb9ca579df6e2587ddd9a1e5b2a8437cd4aba1d2ab6139d037b136d0a18ac66c36377e28f6af79cd72c8eb8df4813dd05d9855ac1bd224d9adef3aea7fb36ab651fd5335f47e4392946ab309cf07",
  "dcId": 1,
  "nextApiId": 2040,
  "dateUpdated": {
    "$date": "2025-04-21T21:50:02.382Z"
  },
  "banned": false,
  "firstName": "Galina",
  "id": "5331023881",
  "lastName": "Sysoeva",
  "messageCount": 32,
  "twoFa": false,
  "twoFaDate": {
    "$date": "2025-04-20T20:22:25.074Z"
  },
  "automaticCheckDate": {
    "$date": "2025-04-21T21:50:02.382Z"
  },
  "remainingTime": {
    "$date": "2025-04-21T10:51:20.384Z"
  },
  "historySpamBlocks": [
    {
      "spamBlockDate": {
        "$date": "2025-03-29T09:42:00.000Z"
      },
      "spamBlockDays": 1
    }
  ],
  "personalChannel": "VdIzlDoBZmhplbt2",
  "personalChannelDate": {
    "$date": "2025-03-29T15:27:18.255Z"
  },
  "lazyCheckDate": {
    "$date": "2025-04-21T21:50:02.053Z"
  },
  "username": "sysoeva_insufficient"
},
{
  "_id": {
    "$oid": "67dd2b3af5fa1dc49466cb34"
  },
  "accountId": "6857872685-prefix-female-casino",
  "dc1": "6c486cff132810035d6cfed627156afcbf451746e3308d835794e3009151f18d01d401602bf3407a03cc3c9cf6d374214cf49bd13f3d1b75c87bd43d94481ff5f2d49153a734aca17c56576450f74351a42780649dd25b24c19a458b34ba5f144f1e830687280952d2c0950557632029141ad198131a8c1047ba8ca1bb3658c526d97536a71ad021ea21bc90a8eac4aec0884cd3633611d85560203a868114f43296b03a9aabf8e68e8a91cdcc656a9d53d3a646105999fe4025620bf1fb68140b84e48d8c7a40dcec86cbaf33b1c9c0481bda5fcbaf2848a993cd1db8645449a4cf65c2f4691f732d8147760e13dc845b016a1ce9d05355b849937586233287",
  "dcId": 1,
  "nextApiId": 2040,
  "dateUpdated": {
    "$date": "2025-04-21T13:05:29.801Z"
  },
  "banned": false,
  "firstName": "Lubov",
  "id": "6857872685",
  "lastName": "Timofeeva",
  "messageCount": 16,
  "twoFa": false,
  "twoFaDate": {
    "$date": "2025-04-20T20:22:25.421Z"
  },
  "automaticCheckDate": {
    "$date": "2025-04-21T13:05:29.801Z"
  },
  "historySpamBlocks": [
    {
      "spamBlockDate": "INFINITY",
      "spamBlockDays": 0
    }
  ],
  "remainingTime": {
    "$date": "2025-04-21T07:14:06.565Z"
  },
  "personalChannel": "JHwhTr5HKhnWHGdx",
  "personalChannelDate": {
    "$date": "2025-03-29T15:25:01.746Z"
  },
  "lazyCheckDate": {
    "$date": "2025-04-20T20:42:31.510Z"
  },
  "username": "timofeeva_smiling"
},
{
  "_id": {
    "$oid": "67dd2b3af5fa1dc49466cb38"
  },
  "accountId": "1575078878-prefix-female-casino",
  "dc1": "4cfec4b7fa47dbaea21110c642060ebab0c63c67fa1da0fb53ea470733e16dc509dc0fb36f9c6011730ede7f0c190df24c424d0256249138b5457f44a42d25fa93dc61b5bcc23aeee59c8ebae6f2561896aa1056f915db5053c3060e794a8a237e896abe19e057634f60832a72d51c838e5380815f4d39406b8282b7b4ab5717ec67b2570b101733259688a00acf90b677cfe0a05d64e1813617a4029e90503e3b23943837b053ce1d9a45912ea8b921f8621effdd4253df7a70dde75cb4cc3610fdad8bf8856fb2a3ed42f72c793f4efc1d68fc5fa87a87585397f6ef751fa9198e94bbb7f004fdd848b80055a0966bb523d5a1e7ab834aa8a6c8c343eeff4d",
  "dcId": 1,
  "nextApiId": 2496,
  "dateUpdated": {
    "$date": "2025-04-21T13:25:31.009Z"
  },
  "banned": false,
  "firstName": "Irina",
  "id": "1575078878",
  "lastName": "Soboleva",
  "messageCount": 19,
  "twoFa": false,
  "twoFaDate": {
    "$date": "2025-04-20T16:06:44.081Z"
  },
  "automaticCheckDate": {
    "$date": "2025-04-21T13:25:31.009Z"
  },
  "remainingTime": {
    "$date": "2025-04-21T07:43:11.421Z"
  },
  "personalChannel": "VptjPqqJicGn6tJq",
  "personalChannelDate": {
    "$date": "2025-03-29T15:25:00.565Z"
  },
  "lazyCheckDate": {
    "$date": "2025-04-20T20:37:29.657Z"
  },
  "username": "soboleva_excessive"
},
{
  "_id": {
    "$oid": "67dd2b3bf5fa1dc49466cb3b"
  },
  "accountId": "5260092638-prefix-female-casino",
  "dc1": "67e7f37e2a6dacd2ab713c40e663fbcbe8a37f2e53f23e1c494db0afa1d08d2a22085900193ed7d1f54646067caa86f33b6362a018ffefa846aafc3b4b46748b0f7e63e43a7bba4dd5e53b6effc5dd67f84f9ff6bb03b1e175bfb3bd8a2b3c048f968c8445f142ffd1af76e7fb8de0f31778d7346a49386158bee74491d9234d2c8dca8d935e3bd350c94b9fe59c502a30756e3ae300c0261229a58254ab289495f3d0a6e6e90da53b3809c78c7d3d047b443f4d0f38122f91188476786ba9ca20063270ae799ebfc4acdc735efea6d757d464e8a2d0f843a69cfb408144eaa847baaf612f7980aecc9f966bc640689842299a5f87d9222ee6c123d298c3b59c",
  "dcId": 1,
  "nextApiId": 2496,
  "dateUpdated": {
    "$date": "2025-04-21T21:56:00.528Z"
  },
  "banned": false,
  "firstName": "Inna",
  "id": "5260092638",
  "lastName": "Egorova",
  "messageCount": 15,
  "twoFa": false,
  "twoFaDate": {
    "$date": "2025-04-20T20:22:25.422Z"
  },
  "automaticCheckDate": {
    "$date": "2025-04-21T21:56:00.528Z"
  },
  "remainingTime": {
    "$date": "2025-04-20T14:37:49.847Z"
  },
  "personalChannel": "GLYxRESF3JJCfeCF",
  "personalChannelDate": {
    "$date": "2025-03-29T15:23:09.019Z"
  },
  "historySpamBlocks": [
    {
      "spamBlockDate": "INFINITY",
      "spamBlockDays": 0
    },
    {
      "spamBlockDate": {
        "$date": "2025-04-21T16:15:00.000Z"
      },
      "spamBlockDays": 1
    }
  ],
  "lazyCheckDate": {
    "$date": "2025-04-21T21:56:00.227Z"
  },
  "username": "egorova_scornful",
  "spamBlockReasons": [
    {
      "reason": "I believe my accounts message function was mistakenly limited. I havent done anything suspicious, so please restore my full messaging capabilities ASAP. I need to contact people urgently.",
      "date": {
        "$date": "2025-04-20T16:40:39.182Z"
      }
    }
  ],
  "spamBlockDate": {
    "$date": "2025-04-21T16:15:00.000Z"
  },
  "spamBlockDays": 1,
  "spamBlockInitDate": {
    "$date": "2025-04-20T16:40:39.188Z"
  }
},
{
  "_id": {
    "$oid": "67dd2b3bf5fa1dc49466cb3e"
  },
  "accountId": "6749079036-prefix-female-casino",
  "dc1": "879bc0f914e9c697e272cb2cbbdf0f0df21ea80366e25e23db0bb79e1f70551e0b3fecca087bd9b5952a6baa7a0d752403f426e66695f6afce17ca7be515e5bdee29155ea167c83e78067cc666cdd2c24568a996cf8bfa5b2664b4f4816200d6ddc8e3ec4f9706a8b9168c7cf8a4083b2a41481c60c5e6c1b33c3882f0ca8272e17f22968b547a49718fe3eee1ae017602c808536126bd24a1a9a82d13c4b8dfd63a95a348784c8c27094fb21d53ba06b037b23e30e52a0f0a2df6b3db9a6e05133dc08ed96d4afe62881f1d81d42756b63b4f937c180c8434e6da9eb0367bce7033e10591c07d775c30a58197128385eb5322568923cb54391e8790296c1be4",
  "dcId": 1,
  "nextApiId": 2040,
  "dateUpdated": {
    "$date": "2025-04-21T13:28:30.038Z"
  },
  "banned": false,
  "firstName": "Polina",
  "id": "6749079036",
  "lastName": "Orlova",
  "messageCount": 21,
  "twoFa": false,
  "twoFaDate": {
    "$date": "2025-04-20T20:22:24.999Z"
  },
  "automaticCheckDate": {
    "$date": "2025-04-21T13:28:30.038Z"
  },
  "remainingTime": {
    "$date": "2025-04-21T07:04:34.703Z"
  },
  "personalChannel": "xiATACaVP3BDHrWO",
  "personalChannelDate": {
    "$date": "2025-03-29T15:26:49.792Z"
  },
  "historySpamBlocks": [
    {
      "spamBlockDate": {
        "$date": "2025-04-03T05:43:00.000Z"
      },
      "spamBlockDays": 1
    }
  ],
  "lazyCheckDate": {
    "$date": "2025-04-20T21:09:48.593Z"
  },
  "username": "orlova_cruel"
},
{
  "_id": {
    "$oid": "67dd2b3bf5fa1dc49466cb44"
  },
  "accountId": "7174856673-prefix-female-casino",
  "dc1": "8001dcedf96be1f1d1de5365fe107d0fa06d3263a969c9d5b16c4003df434c86959d12bbe6cb60375c554069ee49e5960bded209d31d14f425a113d2ef422e910db607659222d309fb9bfd9ba8e98f787134ffebdcce90f1abebae7b5abc073e4de3b86d33f526d80c22243a8f0d54caf9d3c047007ca8c28d4946bd0808ccbbef8bd8855e56b95eed0727cdf8450061527fba8b5b109c79dc415eae63a5d045ea1c6dfe311fc72f06e2232d1169ffbc628b751b699da9875b2126f2c2fa39a26651fbd8e19aa1492e504a29ed047c8bc2c132cd8dd38d1552d10b4e97af19eb5151da7765c1cfeadaf472cf2536d0f0d7833488df2afe75ab5ace91153b0466",
  "dcId": 1,
  "nextApiId": 2040,
  "dateUpdated": {
    "$date": "2025-04-21T13:13:30.988Z"
  },
  "banned": false,
  "firstName": "Ekaterina",
  "id": "7174856673",
  "lastName": "Antonova",
  "messageCount": 17,
  "twoFa": false,
  "twoFaDate": {
    "$date": "2025-04-20T16:06:44.044Z"
  },
  "automaticCheckDate": {
    "$date": "2025-04-21T13:13:30.988Z"
  },
  "remainingTime": {
    "$date": "2025-04-21T07:05:07.703Z"
  },
  "personalChannel": "ANg1SrgWbmocSBfd",
  "personalChannelDate": {
    "$date": "2025-03-29T15:23:37.905Z"
  },
  "lazyCheckDate": {
    "$date": "2025-04-20T21:05:48.534Z"
  },
  "username": "antonova_poor"
},
{
  "_id": {
    "$oid": "67dd2b3bf5fa1dc49466cb49"
  },
  "accountId": "5117156138-prefix-female-casino",
  "dc1": "ae620a470967c8850032487344b607660284ad6b3d611d767c743e93da457312f079b22b56b72cdcc56ff009c55d6ae96d8eb5ed791fabda760d1070b70da24e910ca8352dea153324bf8c9dbc5cfbc026e056925fed6c327eb739426312d5aba3419bf280587640c2d65d7bd80a5b965b702451460b4884bbc16e1e0e339b0091b06fc4e0f4c5d20936fbb5149ae818465cc0e0c6769244af89189372357a805943c56d77d0fa67ad3ce62e2a561a12e94aab566b88f37d75f98b415f89a9e3d2da1a854b22bd2b640fb54e526e9947533301b3cdb6eca60e16a2eb3226f1c6f023caa0dac18df3b225ded990267c501622ba409ec151857eb2cb846f5a62af",
  "dcId": 1,
  "nextApiId": 2040,
  "dateUpdated": {
    "$date": "2025-04-21T21:51:02.419Z"
  },
  "banned": false,
  "firstName": "Inna",
  "id": "5117156138",
  "lastName": "Koroleva",
  "messageCount": 19,
  "twoFa": false,
  "twoFaDate": {
    "$date": "2025-04-20T20:22:25.918Z"
  },
  "automaticCheckDate": {
    "$date": "2025-04-21T21:51:02.419Z"
  },
  "remainingTime": {
    "$date": "2025-04-21T15:12:52.336Z"
  },
  "personalChannel": "UmgAemJkNGZeY0ds",
  "personalChannelDate": {
    "$date": "2025-03-29T15:25:14.760Z"
  },
  "lazyCheckDate": {
    "$date": "2025-04-21T21:51:02.101Z"
  },
  "username": "koroleva_unfortunate",
  "historySpamBlocks": [
    {
      "spamBlockDate": {
        "$date": "2025-04-27T12:57:00.000Z"
      },
      "spamBlockDays": 7
    }
  ]
},
{
  "_id": {
    "$oid": "67dd2b3cf5fa1dc49466cb4d"
  },
  "accountId": "7292988374-prefix-female-casino",
  "dc1": "5cd5c5e7586ffb35fa75e19af20db813d755f5481b8c81e8f422b34f538c43fc4dcbbeb6debfda3f0fbf9814ee80c0e8b2a2f641a0ab2213ec0d465b548b73eef5b3d2762e08b4eccc9ad544eefb74f843792566e53faf21d462c0f356f9eeaff36e97087c0ea7459ce53f4567708755dfa662ba835a8180b5c8cce11e95d4720976724aa5589f085fdd638fdf7ad13ad89506ef0e25c49b8214ac6d08c860032960812dc52686e72484ec2cf3d72d9d7b19211f90d14fc71a1bfabff4c5f800e83dd43ee7bcaf13ceb54b32dc9c74901f9d31c041fa5969d2f0d762e0ab4c1c0d3edc5fc814b2cce327874ecf9669796a08b30cb8d1125b058a6e7a76da97d8",
  "dcId": 1,
  "nextApiId": 2040,
  "dateUpdated": {
    "$date": "2025-04-21T13:20:30.995Z"
  },
  "banned": false,
  "firstName": "Mira",
  "id": "7292988374",
  "lastName": "Loginova",
  "messageCount": 33,
  "twoFa": false,
  "twoFaDate": {
    "$date": "2025-04-20T16:06:44.043Z"
  },
  "automaticCheckDate": {
    "$date": "2025-04-21T13:20:30.995Z"
  },
  "remainingTime": {
    "$date": "2025-04-21T11:49:52.241Z"
  },
  "historySpamBlocks": [
    {
      "spamBlockDate": {
        "$date": "2025-03-30T13:14:00.000Z"
      },
      "spamBlockDays": 1
    }
  ],
  "personalChannel": "EagxITPxitYxrJ6J",
  "personalChannelDate": {
    "$date": "2025-03-29T15:26:51.521Z"
  },
  "lazyCheckDate": {
    "$date": "2025-04-20T21:00:49.118Z"
  },
  "username": "loginova_smoggy"
},
{
  "_id": {
    "$oid": "67dd2b3cf5fa1dc49466cb55"
  },
  "accountId": "6483068744-prefix-female-casino",
  "dc1": "6a837c7e9b938b8989d3f078f3dd3326d365399dbfdce4564ce7c6005841de5f868a352b7719661ea485cdd6b1057a2af9ae9d186daac446cf0e05e4cbff6e3b1d0a54ac5c3680339e3c1e3ed295ce97501f30115c8954e33632a39423d29d7d90880554da84486d6d610a6abe04693451f8c340c43521e3c257bbe6f080281388f5ec16ca599827cbb90210f0ee2799038e51059ad0df6b84a3467dd290537b71cb5ed36eadb41f0558890657e0265a6436e117224b2b93eba9abfafb5e9642d4b2c5a8bffcd43553adc8c883c8f93283284173ecc4762ee0af55712c9192785c3831317a2e9cd2f8044a08de4c9345230d836c792126fd19b7fe20a7c60026",
  "dcId": 1,
  "nextApiId": 2040,
  "dateUpdated": {
    "$date": "2025-04-21T13:05:31.130Z"
  },
  "banned": false,
  "firstName": "Vera",
  "id": "6483068744",
  "lastName": "Fedorova",
  "messageCount": 17,
  "twoFa": false,
  "twoFaDate": {
    "$date": "2025-04-20T16:06:47.453Z"
  },
  "automaticCheckDate": {
    "$date": "2025-04-21T13:05:31.130Z"
  },
  "remainingTime": {
    "$date": "2025-04-21T07:05:49.606Z"
  },
  "personalChannel": "zxtccVFJDzz1nZIt",
  "personalChannelDate": {
    "$date": "2025-03-29T15:22:52.516Z"
  },
  "lazyCheckDate": {
    "$date": "2025-04-20T20:36:31.085Z"
  },
  "username": "fedorova_zany"
},
{
  "_id": {
    "$oid": "67dd2b3df5fa1dc49466cb57"
  },
  "accountId": "1179881198-prefix-female-casino",
  "dc1": "067b1c986e0cd332c6cee559b4ddc6535edca551a135a6855a548baf087fd7fc44477ea7c664d59a6f3196ff96ab602d6a7b3777190399a1f5e2eb989866f49336af85c174897616eef0b51956ec2e7847a1c28684054ad268b090a88a9e262741217b231111286961c38d56449864ee44f8a6d3cf8eceb7096131489a9df362d7acdd689031e0449b7fe0374c5722fdd9126348fd136d0993008042e231bdcd32669581cc8e2cce9d677f1cc1ed771028adcb2bc75c695d8f98795df2c20fb9e4b4fc47ccdb0f5ac6995087d85ba69b2adaadd0992ad4d3c1d8a64d6b70fc340c108c7082c9abaa65949d083edad85ac65ff5ceed438e07d8f355e6282e210a",
  "dcId": 1,
  "nextApiId": 2040,
  "dateUpdated": {
    "$date": "2025-04-21T13:26:32.198Z"
  },
  "banned": false,
  "firstName": "Irina",
  "id": "1179881198",
  "lastName": "Samoylova",
  "messageCount": 18,
  "twoFa": false,
  "twoFaDate": {
    "$date": "2025-04-05T13:14:32.181Z"
  },
  "automaticCheckDate": {
    "$date": "2025-04-21T13:26:32.198Z"
  },
  "remainingTime": {
    "$date": "2025-04-21T07:04:52.650Z"
  },
  "personalChannel": "VOYb6IFBEAvvIcKL",
  "personalChannelDate": {
    "$date": "2025-03-29T15:27:22.197Z"
  },
  "lazyCheckDate": {
    "$date": "2025-04-20T20:44:32.161Z"
  },
  "username": "samoylova_increasing"
},
{
  "_id": {
    "$oid": "67dd2b3df5fa1dc49466cb5a"
  },
  "accountId": "6748472862-prefix-female-casino",
  "dc1": "84b1bb2bc85324dcca1364eaef407b22fa7a9786a706a4f3b39eaf5a2de6f5b6e2f532e88416aafcb99eff3a7f2ef6a38ac97596c46f0de9e11b8cd1bdd5bb5c05853852b2aab9358c50107491aa0f85f6f82bdf770f8324ee387894d3ef9e7ef8d707b5e8e671808c46789fd01f585579bec6341a9d31cd7b2e32b2fbc2e27438cdd92a4b2c3b7888c668d3970c9b4d9f46f66e00f9c8bd82b69720b477c53121026038ce39ef1fd301b35bca27bb54237976e5f1dc91ada23119fc7ed179a514a5e840d70be944235446280f948f67eaf46eb4df1cb4b164af898d290025ee6f51ee9087e5f1c9ce4c67401ce5a42f4f2a16644530600d9354618111129d28",
  "dcId": 1,
  "nextApiId": 2040,
  "dateUpdated": {
    "$date": "2025-04-21T21:53:03.485Z"
  },
  "banned": false,
  "firstName": "Nina",
  "id": "6748472862",
  "lastName": "Tomilova",
  "messageCount": 15,
  "twoFa": false,
  "twoFaDate": {
    "$date": "2025-04-20T20:22:24.986Z"
  },
  "automaticCheckDate": {
    "$date": "2025-04-21T21:53:03.485Z"
  },
  "remainingTime": {
    "$date": "2025-04-21T07:12:03.069Z"
  },
  "personalChannel": "woNIUbJVffqZLs8T",
  "personalChannelDate": {
    "$date": "2025-03-29T15:24:14.334Z"
  },
  "lazyCheckDate": {
    "$date": "2025-04-21T21:53:03.068Z"
  },
  "username": "tomilova_wilful"
},
{
  "_id": {
    "$oid": "67dd2b3ef5fa1dc49466cb61"
  },
  "accountId": "6768515510-prefix-female-casino",
  "dc1": "1b44baa29c500afe816951fc50d51ae5c15befd067e49b2b70e9d69d0ed76ffe7db0c7f0b69809072069fa150b58b4e65dddf315009f92f2836948d1ad6a45a0b3ea2fabaed9233c80f4d55c1df9aa31195816d0203eaa0345986f3aa7804909dd53b7b2abd23163242bc0c91af903205d9559165c9fa0b6f2e394d6f36743c2367a91dba1bf214f67240a931a3eafc39d866dc02a8309b93fa634fb162148898393bcc461afb0ef2f7e4c7efab4601b22f6f82af61be07d218f249b972a47af54df4694639c3dc8d05957d66282901a90b65e3a96ff09a7b584eacaf1ac4c896121a1664a7239793fc7685025d339039676d23847cbb847c950eae008cbf83f",
  "dcId": 1,
  "nextApiId": 2040,
  "dateUpdated": {
    "$date": "2025-04-21T13:12:31.829Z"
  },
  "banned": false,
  "firstName": "Irina",
  "id": "6768515510",
  "lastName": "Kozlova",
  "messageCount": 20,
  "twoFa": false,
  "twoFaDate": {
    "$date": "2025-04-20T20:22:26.584Z"
  },
  "automaticCheckDate": {
    "$date": "2025-04-21T13:12:31.829Z"
  },
  "remainingTime": {
    "$date": "2025-04-21T07:09:39.561Z"
  },
  "personalChannel": "mQeQ9azJjhgSnetc",
  "personalChannelDate": {
    "$date": "2025-03-29T15:24:11.251Z"
  },
  "lazyCheckDate": {
    "$date": "2025-04-20T21:03:49.256Z"
  },
  "username": "kozlova_shallow"
},
{
  "_id": {
    "$oid": "67dd2b3ef5fa1dc49466cb63"
  },
  "accountId": "5973687518-prefix-female-casino",
  "dc1": "b4defc03be93d3e0416f395dc3c8a73788c5e54204b802684d4eb888426ed2b87a1cdf68b5ddf1df8708b894928e0ec30aeee273e6b89ebb96248eb7f3ca4916948a511eea042c71b22982581d51f40d2cbcec81f9abde2a185fe9883e66268264bfc776d12f75fac35805d2b31b82f7dbd5662529724c1cc6f40e029e2e5efefe659ec6c1870b973a6d84ebf3f5f34cf96a17a699c331373d416cefda5dcc9bc5d63f20d2f0071b88ce10c079a15bf0a4eb019729be042d26b4736702ee5ad5fcfa720d44ccba675849fe98a37989e0b8cfb16e4a0b924fa0e98446c97bca937bed42ee85dbd791052a6d4db35d33c16eecd7c476cd959b21217b892beb6077",
  "dcId": 1,
  "nextApiId": 2040,
  "dateUpdated": {
    "$date": "2025-04-21T13:16:30.014Z"
  },
  "banned": false,
  "firstName": "Rita",
  "id": "5973687518",
  "lastName": "Tomilova",
  "messageCount": 19,
  "twoFa": false,
  "twoFaDate": {
    "$date": "2025-04-20T20:22:24.260Z"
  },
  "automaticCheckDate": {
    "$date": "2025-04-21T13:16:30.014Z"
  },
  "remainingTime": {
    "$date": "2025-04-21T07:07:41.139Z"
  },
  "personalChannel": "WiaVHqw5FTHRcNsF",
  "personalChannelDate": {
    "$date": "2025-03-29T15:26:05.440Z"
  },
  "lazyCheckDate": {
    "$date": "2025-04-20T20:58:46.438Z"
  },
  "username": "tomilova_zeroth"
},
{
  "_id": {
    "$oid": "67dd2b3ff5fa1dc49466cb65"
  },
  "accountId": "6369276062-prefix-female-casino",
  "dc1": "593b5bfa4c56885a9b4e7c1c6686df33225a8ae6d632e68d24ce1d10453f0a4917d85d1ed51f63263156cdc46f735a46c3f3594307333ad8bae9174343be5f7706c8da4d5b9568ae0398db9daecaaa94e07e97ef8b614422b9acdd398bec624c1d9abe4453ff44c0833dc66672f025b732d86c52229eb61d430f1eca0e1c22ebb0af2b0e6943d35f079e96b41c9872eaa27b9b67fc123aff070546a73adf7d74c6981a653071715c7d5baa3137ac508c083b082c6bd9faf4dd9901ed945ccbed5c232d9d2a518fb18f0bef514a5fe8955aeffe30029d994c6baeb54d51ac430e020667d0d9a4cd77b990e20aa50210f61033546a3741d0a9e75f9bbe1ccdabd5",
  "dcId": 1,
  "nextApiId": 2496,
  "dateUpdated": {
    "$date": "2025-04-21T21:55:01.392Z"
  },
  "banned": false,
  "firstName": "Svetlana",
  "id": "6369276062",
  "lastName": "Fedorova",
  "messageCount": 19,
  "twoFa": false,
  "twoFaDate": {
    "$date": "2025-04-20T20:22:27.911Z"
  },
  "automaticCheckDate": {
    "$date": "2025-04-21T21:55:01.392Z"
  },
  "remainingTime": {
    "$date": "2025-04-21T07:16:10.436Z"
  },
  "personalChannel": "pyExUDdYaQXPy5oe",
  "personalChannelDate": {
    "$date": "2025-03-29T15:25:18.722Z"
  },
  "historySpamBlocks": [
    {
      "spamBlockDate": {
        "$date": "2025-04-03T06:17:00.000Z"
      },
      "spamBlockDays": 1
    }
  ],
  "lazyCheckDate": {
    "$date": "2025-04-21T21:55:00.743Z"
  },
  "username": "fedorova_ancient"
},
{
  "_id": {
    "$oid": "67dd2b3ff5fa1dc49466cb68"
  },
  "accountId": "5782586496-prefix-female-casino",
  "dc1": "1f74061e17ed015c9a2e240c1edf349074cea07e380ddc735639cbfaed42c55fb161cac5a764f03e2f70c1bffbb3a372cbdc95fb46f7b1a89e8c1a7f81cceebd8e2f160b8caf1cbbfef8ee021914b9af53d244b1e908670cd2738878c6a6e2f32319d7bcd1f68e6cfaa4fedf7c884799b57b5713453047fd02378f259d009ffbbaf3ed5a03a12a2710417bd54b16e218c84a01efe68d3be382ef050cb0ec24cad8aec340c3dee75d5ba998e482aebdfc6e0ba57198ebc725eaea661e2a31aff9da333cadd718b23db2175a6aad6ed801cefb1dcfc05170ac9650adedc4019d1fc19f120ca8d238dca75a6365c481df453a79b65a7d9de9ebadcbd370a48e5c08",
  "dcId": 1,
  "nextApiId": 2496,
  "dateUpdated": {
    "$date": "2025-04-21T13:28:30.906Z"
  },
  "banned": false,
  "firstName": "Tatiana",
  "id": "5782586496",
  "lastName": "Filatova",
  "messageCount": 16,
  "twoFa": false,
  "twoFaDate": {
    "$date": "2025-04-20T20:22:26.583Z"
  },
  "automaticCheckDate": {
    "$date": "2025-04-21T13:28:30.906Z"
  },
  "remainingTime": {
    "$date": "2025-04-21T07:55:32.032Z"
  },
  "personalChannel": "p7WpGQpbBXpWIYHK",
  "personalChannelDate": {
    "$date": "2025-03-29T15:25:54.255Z"
  },
  "lazyCheckDate": {
    "$date": "2025-04-20T21:11:48.750Z"
  },
  "historySpamBlocks": [
    {
      "spamBlockDate": {
        "$date": "2025-04-06T06:38:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-04-10T05:08:00.000Z"
      },
      "spamBlockDays": 3
    }
  ],
  "username": "filatova_coloured"
},
{
  "_id": {
    "$oid": "67dd2b3ff5fa1dc49466cb6a"
  },
  "accountId": "7606915054-prefix-female-casino",
  "dc1": "558c01fade70b3cea0b932b7280057cb24a6bc7630b5a8f50e917b487d0c2a10106f36f27d075cc9c7b37eb04cd55299831d8a84dda9ffb0d1723637f19abdc04e1710e92809de979ff34a3e9228e1f780fc79ac60e48f16bd9c6be4f041b39fe1faa77ed62d0f25f243a073d9cfd3f0689fc0f649f12a87d5f56b248d5aa2934529243bf3acca7495520d99214b107804d9b1b9fe3dd26fbf4e812c1f2efa2a01b8b6340f17037752e23837a0b2d5044b5dd19cc6751074fab4fa581cd092a3364e4151f24c4cda56874af577c12413dca7e0c80d9efaf47962cba1b870377571e7f516fba657d378201687f27d28a8ec2774dd5207be3ba6caa908583545cc",
  "dcId": 1,
  "nextApiId": 2040,
  "dateUpdated": {
    "$date": "2025-04-21T13:13:29.959Z"
  },
  "banned": false,
  "firstName": "Vera",
  "id": "7606915054",
  "lastName": "Glazunova",
  "messageCount": 19,
  "twoFa": false,
  "twoFaDate": {
    "$date": "2025-04-20T16:06:51.103Z"
  },
  "automaticCheckDate": {
    "$date": "2025-04-21T13:13:29.959Z"
  },
  "remainingTime": {
    "$date": "2025-04-21T07:16:36.157Z"
  },
  "personalChannel": "AkwhAdR7LmCkrwkQ",
  "personalChannelDate": {
    "$date": "2025-03-29T15:27:20.814Z"
  },
  "lazyCheckDate": {
    "$date": "2025-04-20T21:12:45.098Z"
  },
  "username": "glazunova_square"
},
{
  "_id": {
    "$oid": "67dd2b3ff5fa1dc49466cb6c"
  },
  "accountId": "1500303832-prefix-female-casino",
  "dc1": "943b832a7d074e8384f714128f25747289386a7db8d171382eaa0f0d0735f52055f626a0b0f9b2d1809274e2c8d61a1a3fc15486e8b15e6962c7a76a8369ca4b93e6777c43738319796774c6c66da18ad5fbf9c55b54aec6f70774cb05de655c75850c4e061fe32bf388801b4354e8fb512551bd7ae9f760afa3a962d64bc42dd0241f6182127af42b1a13831f87bed8b711caa293d22b0937335891fb5e29bda54db883c8f661a7cb90dc5a6c13a42bd688b2fee2ec2b1bbd1497c61c25db4670977a884c1cbbd7bbc38414d68e95e775418edd3990ce6410a6a1c3a45de91cc8f9e3a44cffacaef903f2de8a3c4a200a814b3ebd580a815970252e76fa79c5",
  "dcId": 1,
  "nextApiId": 2040,
  "dateUpdated": {
    "$date": "2025-04-21T13:25:30.000Z"
  },
  "banned": false,
  "firstName": "Inna",
  "id": "1500303832",
  "lastName": "Shishkina",
  "messageCount": 14,
  "twoFa": false,
  "twoFaDate": {
    "$date": "2025-04-20T20:22:25.000Z"
  },
  "automaticCheckDate": {
    "$date": "2025-04-21T13:25:30.000Z"
  },
  "remainingTime": {
    "$date": "2025-04-21T07:42:45.089Z"
  },
  "personalChannel": "HRZxUwYJt2DdumYu",
  "personalChannelDate": {
    "$date": "2025-03-29T15:26:51.334Z"
  },
  "historySpamBlocks": [
    {
      "spamBlockDate": {
        "$date": "2025-03-31T10:56:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-04-03T11:52:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-04-11T05:40:00.000Z"
      },
      "spamBlockDays": 7
    },
    {
      "spamBlockDate": {
        "$date": "2025-04-09T08:20:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-04-24T05:44:00.000Z"
      },
      "spamBlockDays": 3
    }
  ],
  "lazyCheckDate": {
    "$date": "2025-04-20T21:07:48.710Z"
  },
  "username": "shishkina_appropriate",
  "spamBlockReasons": [
    {
      "reason": "I cant message anyone outside of my contact list due to an apparent mistake. Please lift this messaging restriction, as I havent violated any rules.",
      "date": {
        "$date": "2025-04-21T06:35:02.678Z"
      }
    },
    {
      "reason": "Im unable to communicate with non-mutual contacts due to an unexpected issue with my account. I believe this is an error, as Ive never violated any rules. Please restore my messaging functionality.",
      "date": {
        "$date": "2025-04-21T11:53:09.326Z"
      }
    }
  ],
  "spamBlockDate": {
    "$date": "2025-04-24T05:44:00.000Z"
  },
  "spamBlockDays": 3,
  "spamBlockInitDate": {
    "$date": "2025-04-21T06:35:02.683Z"
  }
},
{
  "_id": {
    "$oid": "67dd2b40f5fa1dc49466cb6f"
  },
  "accountId": "7321701111-prefix-female-casino",
  "dc1": "2537972b61b2dc1e12532ef16b6d92b152035bf6716081bfda5d2e90d85b11615ef0e24efa07073f4f263caba62610887265c0a12e502061154eba8dfdb1b799b0c3ce6389c174eb6989a301f3731a0afb1e532ce8322ee784490f059688333b6d981b7141e0fdcf084492931f751f52998dc14976176fd4f3dc3291a47a2d9d0792788b7fc4f0dfe250952392d55322474600e7113f4faedf0c1591fe6c999d636f6215725d087509eddb29728d13c4a20d0ecf3829d39e0ec3a83bc26849c8ae1df1020ee78cac5c740888b35b7376a8fc4f9c94b9b81adc4e092eff88b59441d1dc86ea570c2cdbc1f4fc134989a8c58ec0b94201a08214ae1596d2518cbe",
  "dcId": 1,
  "nextApiId": 2040,
  "dateUpdated": {
    "$date": "2025-04-21T13:11:30.985Z"
  },
  "banned": false,
  "firstName": "Vera",
  "id": "7321701111",
  "lastName": "Medvedeva",
  "messageCount": 18,
  "twoFa": false,
  "twoFaDate": {
    "$date": "2025-04-20T20:22:26.491Z"
  },
  "automaticCheckDate": {
    "$date": "2025-04-21T13:11:30.985Z"
  },
  "remainingTime": {
    "$date": "2025-04-21T07:04:43.512Z"
  },
  "personalChannel": "VQUMun5WuwMJRjaX",
  "personalChannelDate": {
    "$date": "2025-03-29T15:27:04.944Z"
  },
  "lazyCheckDate": {
    "$date": "2025-04-20T20:38:31.353Z"
  },
  "username": "medvedeva_united"
},
{
  "_id": {
    "$oid": "67dd2b40f5fa1dc49466cb72"
  },
  "accountId": "7575788680-prefix-female-casino",
  "dc1": "77ce0e16e6f601cd8988aaf419fcf901e96c50ff5ec74068a18c632e67767becdc08605174aed99669fc7daa227051d68e528f7fecdd8e389b6676282b0bfe9c17e2e9bdb259011f2fb5bd5b6b082968cbc79bb32aae08796377b75acb57ea2d54bbfe7b4c7daf65952400d83e8c574460fd347b19c4d9622117087653bf23be9df074aa3566b1566e39033ce32b18308e187a7c6a5729c254decc6d7cf5d9aab55149eea061a827296fb456bb36151aa148e8137ac8685e6e26602278373022fbf16ae0ad35dcf8a4c5aa0c647a86b6221bcd0b1836cba0f814843964a3694b57596a31fc7ae41f1b92795027c202a018316e2e3ac912837050a94bb5e3fd4b",
  "dcId": 1,
  "nextApiId": 2496,
  "dateUpdated": {
    "$date": "2025-04-21T21:54:02.215Z"
  },
  "banned": false,
  "firstName": "Olga",
  "id": "7575788680",
  "lastName": "Nechayeva",
  "messageCount": 16,
  "twoFa": false,
  "twoFaDate": {
    "$date": "2025-04-20T16:06:47.419Z"
  },
  "automaticCheckDate": {
    "$date": "2025-04-21T21:54:02.215Z"
  },
  "remainingTime": {
    "$date": "2025-04-21T07:55:32.493Z"
  },
  "personalChannel": "CcgQ8efXljKfcfmZ",
  "personalChannelDate": {
    "$date": "2025-03-29T15:24:45.901Z"
  },
  "lazyCheckDate": {
    "$date": "2025-04-21T21:54:01.913Z"
  },
  "username": "nechayeva_top"
},
{
  "_id": {
    "$oid": "67dd2b40f5fa1dc49466cb75"
  },
  "accountId": "1586117558-prefix-female-casino",
  "dc1": "895513f8ac8db9ac21f03761a4d66c962bd83e0746dffd58b3b6d2aa666a7be89fef50dbfe33cff44914bef32305e49b0689ef069f1a4bbdcdffa00ea195b7479273937c339702311c402262dd0fdb48bb7864add545a57c43da597d8548d3dfe01390f2aae94393c0cf53b5190ce33fc5279184a0c9127923f9c718230a9835068993cae86a2a95ca04628c8945d1adc33cf287a00e12b12a7c337a8d2ba08be60235c6d66615a534077b0856f2b2f6d54230581ea6c5eaff44e74af842697e417fcb7bb1bf42dea06346a465a6bed25f9d200786bf68b8fba80ed3eabbb3f504982170fd5a5ce184a5c4f17ed2aa1abbfd5868a050178b60957d67e5d5992d",
  "dcId": 1,
  "nextApiId": 2040,
  "dateUpdated": {
    "$date": "2025-04-21T13:31:30.901Z"
  },
  "banned": false,
  "firstName": "Liza",
  "id": "1586117558",
  "lastName": "Trifonova",
  "messageCount": 20,
  "twoFa": false,
  "twoFaDate": {
    "$date": "2025-04-20T16:06:47.404Z"
  },
  "automaticCheckDate": {
    "$date": "2025-04-21T13:31:30.901Z"
  },
  "remainingTime": {
    "$date": "2025-04-21T07:51:49.244Z"
  },
  "personalChannel": "JfzGXqLOM2MjMPLu",
  "personalChannelDate": {
    "$date": "2025-03-29T15:27:22.042Z"
  },
  "lazyCheckDate": {
    "$date": "2025-04-20T21:22:49.372Z"
  },
  "username": "trifonova_radical"
},
{
  "_id": {
    "$oid": "67dd2b40f5fa1dc49466cb77"
  },
  "accountId": "6395064154-prefix-female-casino",
  "dc1": "2ee85618ca7380a19957ab989052692101f2e1a0a98f7ddd93c5b1b8dc883db98fa548866d66e0f146f26bf0cc266a8447842c36c31033b954bde960156c1b034a615b74a1f9a0f9002a9918f48d939c97075c781e9fce9fd8c3ad07948ec1daaff1c08ac63168d51f6a7ff3c0159f1346fa8d742f8ff9b9daeee4adcadacf5b0c7cbbafad4319b507d1e0836cc87e480f63a02457aad09b2ab8640e4c9235da66c2d0e644e429e4aaf5580adfa0cccd39315424a2cb73a98b8c287a7cd1758b6e669289b88d321910e88a7b2119eb30a7aadfeb448584e272fc5ed296fb759d518aa07784e86d20552af1bdf7b4aa5a7744fb4823878a464ede976a42a9435f",
  "dcId": 1,
  "nextApiId": 2040,
  "dateUpdated": {
    "$date": "2025-04-21T13:30:30.997Z"
  },
  "banned": false,
  "firstName": "Arina",
  "id": "6395064154",
  "lastName": "Abramova",
  "messageCount": 18,
  "twoFa": false,
  "twoFaDate": {
    "$date": "2025-04-20T20:22:26.663Z"
  },
  "automaticCheckDate": {
    "$date": "2025-04-21T13:30:30.997Z"
  },
  "remainingTime": {
    "$date": "2025-04-21T07:08:56.700Z"
  },
  "personalChannel": "kOZMvdUNptRPIHr1",
  "personalChannelDate": {
    "$date": "2025-03-29T15:26:14.721Z"
  },
  "historySpamBlocks": [
    {
      "spamBlockDate": {
        "$date": "2025-04-11T05:56:00.000Z"
      },
      "spamBlockDays": 7
    },
    {
      "spamBlockDate": {
        "$date": "2025-04-07T09:32:00.000Z"
      },
      "spamBlockDays": 1
    }
  ],
  "lazyCheckDate": {
    "$date": "2025-04-20T20:41:31.346Z"
  },
  "username": "abramova_distinct"
},
{
  "_id": {
    "$oid": "67dd2b41f5fa1dc49466cb79"
  },
  "accountId": "7569770310-prefix-female-casino",
  "dc1": "a553de1d5ec611a42fc4a5bc2e7a7b2898f877e3b2cafdd4719b94dd64076c7308184ae5f599050dc81d9edbfb70d01568b7b8b10d43a8c09ebed80d3926154543a32c3272c451e3d87ccf503cb45975055c7d1eca2f0b74151cfd5213472533d184e3175de94e9f0ba6d8340d2de858ee641ce58cd66a0bb05fe8b8c3cfc061ddec07da8e4bbf5a44b1600288cf4f57c83c138fae0704bcd4bff238b97cbce345979b771711ef3f48256bafe04f941bb3711756ce520e1bbf75c623a67a09ffb262a415f6fdfaf32f6d6faf1f1fa0676cc3766a7e885d8ca34fc7d0a21cb9ccfa54168ad72ddcfc5fe0b5c5a03fccd1ec9d9f412c1d2804e96ea689b4e669ac",
  "dcId": 1,
  "nextApiId": 2040,
  "dateUpdated": {
    "$date": "2025-04-21T13:16:31.860Z"
  },
  "banned": false,
  "firstName": "Valeria",
  "id": "7569770310",
  "lastName": "Anisimova",
  "messageCount": 16,
  "twoFa": false,
  "twoFaDate": {
    "$date": "2025-04-20T16:06:50.637Z"
  },
  "automaticCheckDate": {
    "$date": "2025-04-21T13:16:31.860Z"
  },
  "remainingTime": {
    "$date": "2025-04-21T07:34:48.704Z"
  },
  "personalChannel": "lHJHIIojpjMWx0BX",
  "personalChannelDate": {
    "$date": "2025-03-29T15:23:52.177Z"
  },
  "historySpamBlocks": [
    {
      "spamBlockDate": {
        "$date": "2025-04-10T05:49:00.000Z"
      },
      "spamBlockDays": 7
    },
    {
      "spamBlockDate": {
        "$date": "2025-04-05T05:10:00.000Z"
      },
      "spamBlockDays": 1
    }
  ],
  "lazyCheckDate": {
    "$date": "2025-04-20T21:10:50.524Z"
  },
  "username": "anisimova_valuable"
},
{
  "_id": {
    "$oid": "67dd2b41f5fa1dc49466cb7c"
  },
  "accountId": "6525065979-prefix-female-casino",
  "dc1": "505ea582d88b5cb386ab3dc799546fd404c010172f31ee7e8b62afcd932a71e128de78c443c1e3dc5568a801ba07ae9808f665a2cd46c74844241f8babb23d768160d4aac73e4b0d03fcf6b0674db596d162f30a107160ff1ea989b4b8d4cbe0799b55cf8dc92e1826fa7fc01ff10d59274fcbea7f9c2718d5f1cd4293f6d289c455a3c5f4108912dfcedbae09cf70a1e4b5c64dc1ced33403179529d755f08bb9c252aacc2fbaca2288bfb89399d77bbd6d07939c9a4c5046274aae564b4d97939ed61d00b4a215dc6d0332ec150144a0585897215ed3a7f96ad82b731b4f914e619d2835612e75f59b50ffbc73d85459db1a393782168d6df64a3d6a38cc23",
  "dcId": 1,
  "nextApiId": 2040,
  "dateUpdated": {
    "$date": "2025-04-21T13:29:30.990Z"
  },
  "banned": false,
  "firstName": "Alisa",
  "id": "6525065979",
  "lastName": "Sysoeva",
  "messageCount": 18,
  "twoFa": false,
  "twoFaDate": {
    "$date": "2025-04-20T20:22:26.587Z"
  },
  "automaticCheckDate": {
    "$date": "2025-04-21T13:29:30.990Z"
  },
  "remainingTime": {
    "$date": "2025-04-21T07:16:24.206Z"
  },
  "personalChannel": "XXDL9vcKKwKfJNYY",
  "personalChannelDate": {
    "$date": "2025-03-29T15:27:00.230Z"
  },
  "historySpamBlocks": [
    {
      "spamBlockDate": {
        "$date": "2025-04-01T10:29:00.000Z"
      },
      "spamBlockDays": 1
    }
  ],
  "lazyCheckDate": {
    "$date": "2025-04-20T21:20:46.810Z"
  },
  "username": "sysoeva_minor"
},
{
  "_id": {
    "$oid": "67dd2b41f5fa1dc49466cb7e"
  },
  "accountId": "1015628896-prefix-female-casino",
  "dc1": "b098326e96e3d556d59471ff07707a6cd1235c7d3077d19668949f512d8940a16608b2f02903062b367869e4f18f55860236a2bf369d8d275cc241bd5df61b7e82a9abdc9b6d06fef8c7602ab41ccfc1806d88a16e1c84864ca9682fd047cde988299a82c51481a8290311e4ae776704ae7590b947e42942e07f8f7d43394ee1dc590cb24fef306a229b24417a22615e13049804967dc23ebb749cfcacb0882a711fc334fcf546d756ededd47b1408476de0b29f44a9d99a7889a3129ad48ac2502a2ece51f4253714a9407be42d440585029be3bb411f269083efb6de160d45a0adb8abf666120354d66399ae1c6d834d5f87a86032fe7afc5c6606c65a2da8",
  "dcId": 1,
  "nextApiId": 2040,
  "dateUpdated": {
    "$date": "2025-04-21T21:52:11.125Z"
  },
  "banned": false,
  "firstName": "Nina",
  "id": "1015628896",
  "lastName": "Smirnova",
  "messageCount": 14,
  "twoFa": false,
  "twoFaDate": {
    "$date": "2025-03-24T09:57:02.592Z"
  },
  "automaticCheckDate": {
    "$date": "2025-04-21T21:52:11.125Z"
  },
  "remainingTime": {
    "$date": "2025-04-21T07:08:28.692Z"
  },
  "personalChannel": "nMGXSQuJvOQ0VNuF",
  "personalChannelDate": {
    "$date": "2025-03-29T15:23:03.468Z"
  },
  "lazyCheckDate": {
    "$date": "2025-04-21T21:52:10.826Z"
  },
  "username": "smirnova_youthful"
},
{
  "_id": {
    "$oid": "67dd2b41f5fa1dc49466cb82"
  },
  "accountId": "5873671637-prefix-female-casino",
  "dc1": "9a8dc5e6c5d6dc5d773240e1a9c301e55a4d960470d4c65eb1999cde8c1c8cd3a1c6f02cec1d7e2709ee1c17f9fbf14f2622a4a760099348f982433771ceb414fbb9ca3a9dba7e55b5d9fb6b9fadf14fcfb2d40398418fba0a24c282a8560c751e9015462e8cce8c164033f784dc56fad9e75fe8ef1ff7ac2affefda7e37656e6e94a12e31d83cb6042fa86c6e7c38923b2818664eae680842c4a78592201cfbd0ee98a16c056dc9752a37515850010a7eb524037e469a4181e0c29dc9f3cc76070d4fcc2af92aa25566fc27059b532f3033775076d08ed5dea8fba88efb354bafeb71d3ea8eafec5304cfc32945120ba2e99d5aa4dfd695674fab7b019b33ba",
  "dcId": 1,
  "nextApiId": 2040,
  "dateUpdated": {
    "$date": "2025-04-21T13:09:31.578Z"
  },
  "banned": false,
  "firstName": "Inna",
  "id": "5873671637",
  "lastName": "Zaitseva",
  "messageCount": 19,
  "twoFa": false,
  "twoFaDate": {
    "$date": "2025-04-20T20:22:26.582Z"
  },
  "automaticCheckDate": {
    "$date": "2025-04-21T13:09:31.578Z"
  },
  "remainingTime": {
    "$date": "2025-04-21T07:05:02.453Z"
  },
  "personalChannel": "grgNLegYmNSS2gvC",
  "personalChannelDate": {
    "$date": "2025-03-29T15:23:46.698Z"
  },
  "lazyCheckDate": {
    "$date": "2025-04-20T21:04:49.637Z"
  },
  "historySpamBlocks": [
    {
      "spamBlockDate": {
        "$date": "2025-04-09T18:32:00.000Z"
      },
      "spamBlockDays": 1
    }
  ],
  "username": "zaitseva_ltd"
},
{
  "_id": {
    "$oid": "67dd2b42f5fa1dc49466cb87"
  },
  "accountId": "7755905269-prefix-female-casino",
  "dc1": "773a0fa6074f726e22c3b8abd5ab9731d56aa646fa5ccec0961a970c50422ff65d65431c40591631da4d5b8d48933f4bb5b5e2f2f448cdd52f49157a566f6fa8b1c14bcf5f4023672bee7e8e7d147b93bd52fd14bfce73e271931bfc9694e883364b00b3bdcfdb67f25c1b0ceadb673b1f6c976696661496cbd5856427650f1545e017951ca5bca762bbcb3115fb79df4c0f74d9d021206c2e8540b8d9c9b0cde318e6b199673eebd8ec64c6dab461643a58a3b56042543c4a794e655917b7e8c11507387dee7c0248c22163ab880aeee513f55ffd2698dfb77e69c221615b012addbf0b1327bc78efad91b15623bd976b6c57820fe62c8c6744b62e69243d9d",
  "dcId": 1,
  "nextApiId": 2496,
  "dateUpdated": {
    "$date": "2025-04-21T14:04:28.647Z"
  },
  "banned": false,
  "firstName": "Polina",
  "id": "7755905269",
  "lastName": "Tkacheva",
  "messageCount": 18,
  "twoFa": false,
  "twoFaDate": {
    "$date": "2025-04-20T16:06:56.441Z"
  },
  "automaticCheckDate": {
    "$date": "2025-04-21T14:04:28.647Z"
  },
  "remainingTime": {
    "$date": "2025-04-21T07:14:09.094Z"
  },
  "personalChannel": "YvfQQPbq3ccncpRL",
  "personalChannelDate": {
    "$date": "2025-03-29T15:26:48.429Z"
  },
  "lazyCheckDate": {
    "$date": "2025-04-20T21:06:49.472Z"
  },
  "username": "tkacheva_particular"
},
{
  "_id": {
    "$oid": "67dd2b42f5fa1dc49466cb89"
  },
  "accountId": "7106768602-prefix-female-casino",
  "dc1": "6d155cbd0dbaeb340cc2df83eaa85cb1beaeab0326ce1996143481631bd0740273fb5fc698793c1bcfe5f42da2399a8a752c40438d06d13d221f03c83416f72de8ae0bbdfd46d244f7fbdf9fa4940686f6cd1ab44c027cd4b69d02a2527311b39ddcab2f97a059cad546788c04d47a5858c2be88d38ac96ebaad70c41e3a86034a30553e2cb0070d733ce656ebb7cd509b7302ca5c4ff0e7b63e832c833c45f0abfe603ebab0d5274155434196ff504239d18bb1e77852e325209cb981a8b64b9a9eda7e116e49ae5b8bf02de805a926de6c1144da2f85356b346c6a70a3fda0d5f9ad113536680d86c628590425d8562680425a9e4a1fa6251a48294df20927",
  "dcId": 1,
  "nextApiId": 2040,
  "dateUpdated": {
    "$date": "2025-04-21T13:21:31.130Z"
  },
  "banned": false,
  "firstName": "Polina",
  "id": "7106768602",
  "lastName": "Golubeva",
  "messageCount": 17,
  "twoFa": false,
  "twoFaDate": {
    "$date": "2025-04-20T16:06:56.442Z"
  },
  "automaticCheckDate": {
    "$date": "2025-04-21T13:21:31.130Z"
  },
  "remainingTime": {
    "$date": "2025-04-21T07:55:25.951Z"
  },
  "personalChannel": "tUnvulmG4ywtEmep",
  "personalChannelDate": {
    "$date": "2025-03-29T15:22:50.602Z"
  },
  "lazyCheckDate": {
    "$date": "2025-04-20T20:42:29.701Z"
  },
  "historySpamBlocks": [
    {
      "spamBlockDate": {
        "$date": "2025-04-11T05:49:00.000Z"
      },
      "spamBlockDays": 1
    }
  ],
  "username": "golubeva_emotional"
},
{
  "_id": {
    "$oid": "67dd2b43f5fa1dc49466cb93"
  },
  "accountId": "7845114050-prefix-female-casino",
  "dc1": "10cb10117dae94f1ccbcc7eaaba9ab62683b7f3305c6e9a4150b81b4668c5d7af7e84e61de3877e966e87d685cd30a15f64b6422e01aeeaae2d4b65aebc66d9d6b21f0162763ee7dd08dc48585935a3d277fe43108922baafeed99c1a8c43eaa09056791f33de2c60792456ad1892fc239ebcb477edf61d9b3c335864d6f7cc4f24a3ec35ad7e6587c3d21291cba5aeeec3be268bfd018f9ba28f9bcd242b62d3583cf51984d188568b698fcec67bfa36d70f7417b9ab8ca7e513e7a8b2c2823c9ac1ec3230683ce3c72dd647bcd4bb19f9c3e23cd5c0b609ab672986511e47c5baedf39588c39a2437dac4e2efff8ae8ebb53ee6b7b65bca9920c14318db640",
  "dcId": 1,
  "nextApiId": 2496,
  "dateUpdated": {
    "$date": "2025-04-21T21:50:46.221Z"
  },
  "banned": false,
  "firstName": "Rita",
  "id": "7845114050",
  "lastName": "Bogdanova",
  "messageCount": 18,
  "twoFa": false,
  "twoFaDate": {
    "$date": "2025-04-20T20:22:26.493Z"
  },
  "automaticCheckDate": {
    "$date": "2025-04-21T21:50:00.562Z"
  },
  "remainingTime": {
    "$date": "2025-04-21T07:10:59.293Z"
  },
  "personalChannel": "gPiPJ4FvjrRocWHp",
  "personalChannelDate": {
    "$date": "2025-03-29T15:24:57.077Z"
  },
  "lazyCheckDate": {
    "$date": "2025-04-21T13:26:33.515Z"
  },
  "username": "bogdanova_wealthy",
  "spamBlockReasons": [
    {
      "reason": "My account was unfairly limited. I didnt break any rules, so I want to know why I cant text people without mutual contacts. Please review my case.",
      "date": {
        "$date": "2025-04-21T06:42:10.795Z"
      }
    },
    {
      "reason": "I cant message new contacts, despite following all guidelines. I believe this is an error, as Ive never violated any rules or engaged in spam. Please review my account status.",
      "date": {
        "$date": "2025-04-21T21:50:46.221Z"
      }
    }
  ],
  "historySpamBlocks": [
    {
      "spamBlockDate": {
        "$date": "2025-04-22T06:32:00.000Z"
      },
      "spamBlockDays": 1
    }
  ],
  "spamBlockDate": {
    "$date": "2025-04-22T06:32:00.000Z"
  },
  "spamBlockDays": 1,
  "spamBlockInitDate": {
    "$date": "2025-04-21T06:42:10.800Z"
  }
},
{
  "_id": {
    "$oid": "67dd2b43f5fa1dc49466cb9b"
  },
  "accountId": "7147548815-prefix-female-casino",
  "dc1": "bd98ef7906c7be97bdc85a89a934845dc80c42570f68b98fde5b7b1f8085e1b7e615e678abcb6fd6298b0c8cf2c3e9cdf02f17f9e366657ee2cc502c3528393a594aff8524f795436aa49e33d74dcaaa4bb54873d2587f022f0e7ffd8871645ffa2c923743cc626565683777ab6b3bd68bf71b18ede477cb7a6ecfec1d271e6c0b284d078de606db074de0a228ccdde1200d9ba5a7068a63f5341c90a090ec20c460cc886607251caecfd4605f027b00743dbf5e3bb28ff56558d3f55bf3e21db5033bbe48aff60b9d663eac089a17bb987804f6c029982a2b17de1c6db1e571b9086adae946f3bbdaf8f8f0cc2d0aca296d79c93b87745a3804cf4d0a230434",
  "dcId": 1,
  "nextApiId": 2496,
  "dateUpdated": {
    "$date": "2025-04-21T13:12:32.112Z"
  },
  "banned": false,
  "firstName": "Arina",
  "id": "7147548815",
  "lastName": "Nesterova",
  "messageCount": 17,
  "twoFa": false,
  "twoFaDate": {
    "$date": "2025-04-20T16:06:52.924Z"
  },
  "automaticCheckDate": {
    "$date": "2025-04-21T13:12:32.112Z"
  },
  "remainingTime": {
    "$date": "2025-04-21T07:10:24.126Z"
  },
  "personalChannel": "rvpXJaTiVFepcR4t",
  "personalChannelDate": {
    "$date": "2025-03-29T15:27:04.586Z"
  },
  "historySpamBlocks": [
    {
      "spamBlockDate": {
        "$date": "2025-04-01T13:19:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-04-03T07:01:00.000Z"
      },
      "spamBlockDays": 1
    }
  ],
  "lazyCheckDate": {
    "$date": "2025-04-20T20:34:30.746Z"
  },
  "username": "nesterova_reduced"
},
{
  "_id": {
    "$oid": "67dd2b44f5fa1dc49466cb9e"
  },
  "accountId": "7307167269-prefix-female-casino",
  "dc1": "610b7382cbb3ca87d5f64ed8f9848b71b707d8a2357d165dbd9d01df9f73f8df0c343a7a1e4c4c2e31098a6bc2a4ae47a4c3ac17d76beaef2109ca77df4dcbaf740d7290da7dd7b748ad2814110e48f201e64f55bb78d7867daaf8e8760da3b6640e2e8e8bb700f981dc16e289a011f93cf507fe6b1d89788112c3ced85381702ebdef30e82c616632d400e584ec57f0dfac27d574574066ef57efb1bedbbcfc0295d180f8dfebddc45a7513b41647ddbaf8bb8ec0c44e7ea1bdebc1c0f9ef3158f04dbc67b88eae2a51b7fcaf05b5e829b46aea8d595244a2cbe7f083011df59cd58728e7b8fb2467b959f4efe29a05e70ecb0858c4b604b28048eac33f201e",
  "dcId": 1,
  "nextApiId": 2496,
  "dateUpdated": {
    "$date": "2025-04-21T13:24:30.907Z"
  },
  "banned": false,
  "firstName": "Elena",
  "id": "7307167269",
  "lastName": "Shishkina",
  "messageCount": 19,
  "twoFa": false,
  "twoFaDate": {
    "$date": "2025-04-20T20:22:26.492Z"
  },
  "automaticCheckDate": {
    "$date": "2025-04-21T13:24:30.907Z"
  },
  "remainingTime": {
    "$date": "2025-04-21T07:05:34.263Z"
  },
  "personalChannel": "aYd5xblyJSZpqOsQ",
  "personalChannelDate": {
    "$date": "2025-03-29T15:23:39.126Z"
  },
  "lazyCheckDate": {
    "$date": "2025-04-20T20:44:31.298Z"
  },
  "username": "shishkina_competitive"
},
{
  "_id": {
    "$oid": "67dd2b44f5fa1dc49466cba0"
  },
  "accountId": "7443444272-prefix-female-casino",
  "dc1": "1b639bed907184a5f6fa21231c4d5379e0302ef2798617b29e4f59dc77606ccd2f058b3f428d33058cc6ff079c9d9a324e953cb62668a94ffc33f98d3fd23348d9f8875c6b40899c9aec11d28eadb5eb9f9a9728184a436096c5dec33f0c01ba90da2c02fddf176a767a1f3b34b801a2213b23629587e366b6984fc21d0144b4e94183dc9bd9b303d37671d55483490c38697fc0058b5240943c0d752d9bf5def356ab1cd3a5fa574e34ab9413ba7056fd413eb1ee9e7e248eb3c0a66f6f0ba2e3b1eea2330fcbf2a2af6c242c0c7cabeb8896f9f564a9676ab5f17a9c60764ff27cb66f7a6bca902c17869fea73e3f99d0cf4fdd16958d109214da4dba0e40b",
  "dcId": 1,
  "nextApiId": 2040,
  "dateUpdated": {
    "$date": "2025-04-21T21:52:01.795Z"
  },
  "banned": false,
  "firstName": "Elena",
  "id": "7443444272",
  "lastName": "Lebedeva",
  "messageCount": 16,
  "twoFa": false,
  "twoFaDate": {
    "$date": "2025-04-20T20:22:26.421Z"
  },
  "automaticCheckDate": {
    "$date": "2025-04-21T21:52:01.795Z"
  },
  "remainingTime": {
    "$date": "2025-04-21T07:41:12.395Z"
  },
  "personalChannel": "y4EkOtALaLKfIAYH",
  "personalChannelDate": {
    "$date": "2025-03-29T15:23:23.952Z"
  },
  "lazyCheckDate": {
    "$date": "2025-04-21T21:52:01.519Z"
  },
  "username": "lebedeva_red"
},
{
  "_id": {
    "$oid": "67dd2b45f5fa1dc49466cba9"
  },
  "accountId": "6969424664-prefix-female-casino",
  "dc2": "1920043ff79415e549231797dc1494fde8f854d19a9ea537b6bdbac642a718fa89cfb7dff83b5ed052bbf6f909416417bf3fe9e144cd95c1c44ffba5294183630b70cd559f2f53587923dcbe0f6a1f1f8d4e0144b08de1e0af575ed94bc5bb3d3fd68876be185b604fab23dbe19bce3f0f77529df710ab5f5aa1fae36a1c0e8703ef5a945be1826447df661110016e3d09ce246762afca0916893d1a9b2783e8666d6cb8d08caae768a7b066c54b412c63a6e437ce10cfd4609f9d2f98217da5c49db1aa1202b0b6873717cf7021ca4e9b905f9c32fc1dae0554f736579655d455efaaeb4bb28d022ab71940f04b4feaf19e4c8d81c9e941ca4e6b0e6be3f03e",
  "dcId": 2,
  "nextApiId": 2496,
  "dateUpdated": {
    "$date": "2025-04-21T13:16:30.899Z"
  },
  "banned": false,
  "firstName": "Galina",
  "id": "6969424664",
  "lastName": "Stepanova",
  "messageCount": 51,
  "twoFa": false,
  "twoFaDate": {
    "$date": "2025-04-20T20:22:27.909Z"
  },
  "automaticCheckDate": {
    "$date": "2025-04-21T13:16:30.899Z"
  },
  "remainingTime": {
    "$date": "2025-04-21T13:57:03.495Z"
  },
  "personalChannel": "pVVWGRbdLOLMXBs1",
  "personalChannelDate": {
    "$date": "2025-03-29T15:25:12.747Z"
  },
  "historySpamBlocks": [
    {
      "spamBlockDate": {
        "$date": "2025-04-01T09:36:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-04-05T15:22:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-04-10T11:48:00.000Z"
      },
      "spamBlockDays": 1
    }
  ],
  "lazyCheckDate": {
    "$date": "2025-04-20T20:57:49.846Z"
  },
  "username": "stepanova_vague"
},
{
  "_id": {
    "$oid": "67dd2b46f5fa1dc49466cbbe"
  },
  "accountId": "6277218675-prefix-female-casino",
  "dc2": "03076166d671f51daf0f29c04b6568f3eabcf5b38dc4cced1004a67c2181b994038a8970ec0385904ad801fc01769b436511d3c78acd7ac6e8c5d68a1a3c0d55e82f6226a8f91e8b63bed3b443d97f13381535bb3ffe6406a67d527a2ca034cf88c0814e8331d9e1be8fd4d7a10a2b74db17119b09749188baca8bdd9bf174c94fb1f48f49cc4b2fdd75d066d43522738c754f17b9b3232a7a8d5b057c123f8882eedd51c4b76964ff02fb21518cc31b4d2bd8846bf36a890b2fc4dae9df5f9c9360845b7a1ee832282c03425cd7dd7be231c6ec707f2feece231a430e07cf31ed086fc216a6ff0e4e531cb521d0a36b661ceb9192bb46bba8e841fa3f91eeeb",
  "dcId": 2,
  "nextApiId": 2496,
  "dateUpdated": {
    "$date": "2025-04-21T21:54:05.070Z"
  },
  "banned": false,
  "firstName": "Darina",
  "id": "6277218675",
  "lastName": "Larionova",
  "messageCount": 51,
  "twoFa": false,
  "twoFaDate": {
    "$date": "2025-04-20T20:22:27.789Z"
  },
  "automaticCheckDate": {
    "$date": "2025-04-21T21:54:05.070Z"
  },
  "remainingTime": {
    "$date": "2025-04-21T14:40:01.277Z"
  },
  "personalChannel": "l9fdSWdRZbtFurAo",
  "personalChannelDate": {
    "$date": "2025-03-29T15:26:49.865Z"
  },
  "historySpamBlocks": [
    {
      "spamBlockDate": {
        "$date": "2025-04-01T09:50:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-04-07T10:24:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-04-12T14:57:00.000Z"
      },
      "spamBlockDays": 3
    }
  ],
  "lazyCheckDate": {
    "$date": "2025-04-21T21:54:04.637Z"
  },
  "username": "larionova_sweet"
},
{
  "_id": {
    "$oid": "67dd2b46f5fa1dc49466cbc3"
  },
  "accountId": "2146015811-prefix-female-casino",
  "dc2": "75faff4098ede1232b8a21d9823096a7fe2379b79087b04e3c242680a226f5594a5e603d4c017287a3ce86a36f9add38f873bad91699547e9babe8ec9473fbe8da9fc01c992a9547620a6a7ee5f45bb5171e1fcc6aefbc1b02b5fdcc3a7c44838fbb6e923e54601102a17f685cfe1d94d21f67b30dc2271783fe2660066adb5284dfaf51524c2830e7e3195d81e11f5e060b1ddb1a93f6db93a8f8e071c1c586a2f10cd4e209d760d69c05ecd33225c619e5d3f25bf3adf4a60172707546d7158d2879dd9a2ec059bc0aa211feba196f54503cb7aa071cb81dcf9e6ab2f4d8529b5c0432d421b121eef45c6c6795c5f6cd1a0e09a2de854fefdc42ad36faebb9",
  "dcId": 2,
  "nextApiId": 2496,
  "dateUpdated": {
    "$date": "2025-04-21T21:49:05.238Z"
  },
  "banned": false,
  "firstName": "Tatiana",
  "id": "2146015811",
  "lastName": "Shumilova",
  "messageCount": 54,
  "twoFa": false,
  "twoFaDate": {
    "$date": "2025-04-20T20:22:27.784Z"
  },
  "automaticCheckDate": {
    "$date": "2025-04-21T21:49:05.238Z"
  },
  "remainingTime": {
    "$date": "2025-04-21T13:50:54.512Z"
  },
  "personalChannel": "wCHjuF8AcPOuvyQL",
  "personalChannelDate": {
    "$date": "2025-03-29T15:26:31.072Z"
  },
  "lazyCheckDate": {
    "$date": "2025-04-21T21:49:04.803Z"
  },
  "historySpamBlocks": [
    {
      "spamBlockDate": {
        "$date": "2025-04-11T19:30:00.000Z"
      },
      "spamBlockDays": 3
    }
  ],
  "username": "shumilova_global"
},
{
  "_id": {
    "$oid": "67dd2b47f5fa1dc49466cbc6"
  },
  "accountId": "7873144465-prefix-female-casino",
  "dc2": "1755902833db7ae8176f4f1e2c98c0cf913a317b43d1f7f5e221db45a1731eceee3ff790a672101d054e6f099b145135391bfb6c1df767e918072f588b237a374d5e0f11c9d629908ef575d988be3d1cf573bbb747bc355ab1f576d41d4e27ddd8273498bddae0726418c27005d5211901710d789b1def19eb9e762fe5252158e4ec332afbdf7527a174b5a66f1ff4c57da85ee3b6d64fea184dd410952b8dbee6ba692faa33eb3f0097e71253f003ec757bc2580b51f28832efb6bb2788ddf08b301bf66c0ee33e94827fe063ac0dc000deeb174304a8a36ca4a7c959cd2b85b83eb6e66af0d291c35b38035314020cb141db68d540da8b8b64248ad07b9202",
  "dcId": 2,
  "nextApiId": 2496,
  "dateUpdated": {
    "$date": "2025-04-21T13:17:31.661Z"
  },
  "banned": false,
  "firstName": "Lubov",
  "id": "7873144465",
  "lastName": "Galitsyna",
  "messageCount": 53,
  "twoFa": false,
  "twoFaDate": {
    "$date": "2025-04-20T20:22:27.879Z"
  },
  "automaticCheckDate": {
    "$date": "2025-04-21T13:17:31.661Z"
  },
  "remainingTime": {
    "$date": "2025-04-21T14:30:08.709Z"
  },
  "personalChannel": "VOUb0XpCOiKFFOIW",
  "personalChannelDate": {
    "$date": "2025-03-29T15:24:29.717Z"
  },
  "historySpamBlocks": [
    {
      "spamBlockDate": {
        "$date": "2025-04-01T05:53:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-04-10T08:43:00.000Z"
      },
      "spamBlockDays": 1
    }
  ],
  "lazyCheckDate": {
    "$date": "2025-04-20T20:46:30.734Z"
  },
  "username": "galitsyna_roasted"
},
{
  "_id": {
    "$oid": "67dd2adbf5fa1dc49466c6c3"
  },
  "accountId": "1734468802-prefix-female-casino",
  "dc1": "2aec071499571c8bc8cb85dbc2b9b8df3b46b57a3228c38fec10f3fd95a36637bb3991535c513309990642082f3401ab2955e4d0a5d0a4090f2eb9de567f5da5ebef95430f3e36796d849b9b2ca68d61f755ea2800fede3cdf717a7edba2fef0ba5ab2d1c563f766fea8afd15e99eb63406322beb9d73ae873b9df2e7728c7a23b711f639225fb32f1b2534169ab710a6f125052482812196f25d6e69740985cac39ff705e3c6de7cbeeaeb1329bcfb77e549cfc5a31be00e04acdf51cb1701019beb78a327a41b70512174474d1d60540b36c7d11cc4366a81de9b6d096c0e54786ec8cb94937a7347025d5b9d8945bee8f043cbc2af24da7c1190f899d39d5",
  "dcId": 1,
  "nextApiId": 2040,
  "dateUpdated": {
    "$date": "2025-04-21T13:05:20.246Z"
  },
  "banned": false,
  "firstName": "Tatiana",
  "id": "1734468802",
  "lastName": "Grishina",
  "messageCount": 32,
  "twoFa": false,
  "twoFaDate": {
    "$date": "2025-04-20T20:22:18.986Z"
  },
  "automaticCheckDate": {
    "$date": "2025-04-21T13:05:20.246Z"
  },
  "remainingTime": {
    "$date": "2025-04-21T12:02:40.434Z"
  },
  "historySpamBlocks": [
    {
      "spamBlockDate": {
        "$date": "2025-03-29T09:37:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-04-05T09:05:00.000Z"
      },
      "spamBlockDays": 1
    }
  ],
  "personalChannel": "Y4eZiPxxUNiTawHj",
  "personalChannelDate": {
    "$date": "2025-03-29T15:24:21.955Z"
  },
  "lazyCheckDate": {
    "$date": "2025-04-20T21:00:59.171Z"
  },
  "stopped": false,
  "username": "grishina_capable"
},
{
  "_id": {
    "$oid": "67dd2ae3f5fa1dc49466c723"
  },
  "accountId": "7789743793-prefix-female-casino",
  "dc1": "484981aaac5e1f2a4e16893e55ae66d5da085d95563dcda1050d016d2ad011dc0f3557040b9ba79a9cbc2390d5cabe3151237b358c0a1926f7ecbaea2b54796d7e37906c61f4b7c4466a70143ee743f961ff449b4cc3154e4f889f363c64510679288dfaa6143e1f54d98a7df460bbb2bb1be53bc9f25cb6c4a2c4599b0005be0d450c6bcc330f958095275c216cbca271e9831bf2d8f2438b4b2911d8e83f48b07dc3c4ee8019f4cfc7def1da7608cae30d97a707c39881b505c004e78bf20167bb45d1a6620473e0d37394f72f68b3ddeb0305221ef362d247481ced035d38b97bc8dca7c0f1254bc32db7b8de0b9ad86a891720c9bb055e6fc05e362b1ccb",
  "dcId": 1,
  "nextApiId": 2496,
  "dateUpdated": {
    "$date": "2025-04-21T13:32:24.454Z"
  },
  "banned": false,
  "firstName": "Albina",
  "id": "7789743793",
  "lastName": "Gavrilova",
  "messageCount": 31,
  "twoFa": false,
  "twoFaDate": {
    "$date": "2025-04-20T20:22:26.655Z"
  },
  "automaticCheckDate": {
    "$date": "2025-04-21T13:32:24.454Z"
  },
  "remainingTime": {
    "$date": "2025-04-21T12:05:00.037Z"
  },
  "personalChannel": "CluwGUQhxDn5PwOn",
  "personalChannelDate": {
    "$date": "2025-03-29T15:26:47.606Z"
  },
  "historySpamBlocks": [
    {
      "spamBlockDate": {
        "$date": "2025-03-31T12:57:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-04-06T18:43:00.000Z"
      },
      "spamBlockDays": 1
    }
  ],
  "stopped": false,
  "lazyCheckDate": {
    "$date": "2025-04-20T21:22:49.551Z"
  },
  "username": "gavrilova_horrible"
},
{
  "_id": {
    "$oid": "67dd2ae6f5fa1dc49466c743"
  },
  "accountId": "6860484344-prefix-female-casino",
  "dc4": "9a9c42f51a3cbce128b188762cf2b3d4673399679c3cfa704a29c5b0564b85d696b3e9cd2b9718a9e445b85349e0d331696fdf5968340e7be1573ae48723851e60d5e29063a917a66182f86e67164dd0205d4d98e06dc433ecdea9fe6620fc3e8c46f76d36d15ffb2d0be3995e4aa42a899b3286589f32e870eb2a829f59f4a44eb85c1b7b7af499c56e26b0fda734a00f98193e1e3e24074747deae465c87ad7fea31e6ecc83e988a9bb272a410dc37ee53986d01dcf3ce57df867028e22eb2e29bc7ed8ec2f9c0852f9bfa2c4425513ffa318093ee45176e1bbf140be8d9d20f290aaef5c1dc857ccd6a3d304125123f3ecbf1c5cf83fd436b36c9bb23c054",
  "dcId": 4,
  "nextApiId": 2040,
  "dateUpdated": {
    "$date": "2025-04-21T13:15:23.261Z"
  },
  "banned": false,
  "firstName": "Darina",
  "id": "6860484344",
  "lastName": "Smirnova",
  "messageCount": 56,
  "twoFa": false,
  "twoFaDate": {
    "$date": "2025-04-20T20:22:27.096Z"
  },
  "automaticCheckDate": {
    "$date": "2025-04-21T13:15:23.261Z"
  },
  "remainingTime": {
    "$date": "2025-04-21T11:56:27.467Z"
  },
  "personalChannel": "PgNtcIOIsM0XSGqw",
  "personalChannelDate": {
    "$date": "2025-03-29T15:26:14.784Z"
  },
  "historySpamBlocks": [
    {
      "spamBlockDate": {
        "$date": "2025-04-02T10:09:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-04-22T10:03:00.000Z"
      },
      "spamBlockDays": 1
    }
  ],
  "lazyCheckDate": {
    "$date": "2025-04-20T21:56:42.553Z"
  },
  "stopped": false,
  "username": "smirnova_systematic",
  "spamBlockReasons": [
    {
      "reason": "Ive been unfairly blocked from messaging non-mutual contacts. I believe this is an error, as Ive not broken any rules. Please review my account status and restore full messaging access.",
      "date": {
        "$date": "2025-04-21T10:43:14.366Z"
      }
    },
    {
      "reason": "My account has been incorrectly limited in its messaging functionality, preventing me from reaching non-mutual contacts. I havent done anything against the rules and need to contact someone for work ASAP. Please restore my messaging abilities.",
      "date": {
        "$date": "2025-04-21T12:12:06.355Z"
      }
    }
  ],
  "spamBlockDate": {
    "$date": "2025-04-22T10:03:00.000Z"
  },
  "spamBlockDays": 1,
  "spamBlockInitDate": {
    "$date": "2025-04-21T10:43:14.370Z"
  }
},
{
  "_id": {
    "$oid": "67dd2ae8f5fa1dc49466c759"
  },
  "accountId": "7442450563-prefix-female-casino",
  "dc1": "170793c403aafe451eb405a23eeabdf84eee2ac58f6d3197b9e187cbcf936170f2095c9d25b642bb76605bbee968894fe109daaf49eab00a453f11a8ecb53ebf94e069d718632efa5a17c18f83307509b0df9965885f785c36c17bd1ead2d75d2b6eff4b0e0d72c5cafe77351cbdd3611d3cb1260de7023662b4524375ad367c14605c6a02cd6d62de2980ea1a9f83f22d0668b5209867a5b29312f39bc599c6c8b2d0820abd463579dfd9179722dc395b3987eaae07ab59b513a5cb6ca87d07560316f3aa01196e6dd619321c524baf938b388fe739d82581c651bac6098836af4c73ce5bcadbde05bd37400aa77c70442b285dc81da1205d610b2e26896698",
  "dcId": 1,
  "nextApiId": 2040,
  "dateUpdated": {
    "$date": "2025-04-21T13:26:43.188Z"
  },
  "banned": false,
  "firstName": "Anfisa",
  "id": "7442450563",
  "lastName": "Martynova",
  "messageCount": 30,
  "twoFa": false,
  "twoFaDate": {
    "$date": "2025-04-20T12:18:23.332Z"
  },
  "automaticCheckDate": {
    "$date": "2025-04-21T13:26:43.188Z"
  },
  "remainingTime": {
    "$date": "2025-04-21T12:42:04.199Z"
  },
  "personalChannel": "PAVUmPOMVCA1xIzR",
  "personalChannelDate": {
    "$date": "2025-03-29T15:25:59.863Z"
  },
  "lazyCheckDate": {
    "$date": "2025-04-20T16:15:54.943Z"
  },
  "stopped": false,
  "username": "martynova_immense"
},
{
  "_id": {
    "$oid": "67dd2aebf5fa1dc49466c786"
  },
  "accountId": "6765459264-prefix-female-casino",
  "dc1": "273614d6ff5463c20a1708afd3d502f8fd3b440286c77499f9c4a1f3dcd7723c12ae320d5d3ee2e53c10c785ff8ec8488b1b73bcffc459c27e0af774f6085d027308edbc2e74e58566bb4217993b62e7d91ff56fd6178c7470ff2bd4973f6fc6356cfb8c966dd128cb742c7d679cb7629bdc751cf5a69ec91d743b265a1fc6bcf5e56f64ec276156f600c3c02243b77e89257dbe432fd4dcc3e911b619cec79d0d2fb2ffcf9bfba2e23ad2ced21e56218e7e1199cd6cbb20f0c2fc4a39f67b51dfd108531136a7a1aa31793a2e85f353e28fde80d6958752a0c7c459c906adc96baa79b84453300d8ce5e7fdb6dff9fa1bd6a212f54e5eb90b0483db25d4aabd",
  "dcId": 1,
  "nextApiId": 2040,
  "dateUpdated": {
    "$date": "2025-04-21T21:55:54.788Z"
  },
  "banned": false,
  "firstName": "Yulia",
  "id": "6765459264",
  "lastName": "Denisova",
  "messageCount": 43,
  "twoFa": false,
  "twoFaDate": {
    "$date": "2025-04-20T16:06:57.508Z"
  },
  "automaticCheckDate": {
    "$date": "2025-04-21T21:55:54.788Z"
  },
  "remainingTime": {
    "$date": "2025-04-21T11:26:50.347Z"
  },
  "personalChannel": "WptljTAZ2SCgiaRL",
  "personalChannelDate": {
    "$date": "2025-03-29T15:24:39.220Z"
  },
  "stopped": false,
  "lazyCheckDate": {
    "$date": "2025-04-21T21:55:54.416Z"
  },
  "historySpamBlocks": [
    {
      "spamBlockDate": "INFINITY",
      "spamBlockDays": 0
    }
  ],
  "username": "denisova_civic"
},
{
  "_id": {
    "$oid": "67dd2aecf5fa1dc49466c796"
  },
  "accountId": "6449840146-prefix-female-casino",
  "dc1": "140eb3e4276a31dd8651c3de8e6657276acf7d169ce8ddc073eeffc4364687123c32bff150040f931e45bd238628f238f912fdadb13086346a1f6fc2e8cfb84fe66c62b4167b2b835039fa60420959b0e196756b41dd97aff99d6f53cd8192e9847a55a438fc20075e8790377f55755ba0c826573bf200548d44020472eb445003ec178a030fef4dfc562327e3091191b2d17030f3d8b70282e2eaa922b63e9c7dd26458c0d4077cfe95ee16c9a73ad15cb419e06fb22433dcf5fece529bb5cc883d37a32aed98ad78859a97ee101f8a8a4f7713d02ea8585f79756c2dbd2cca92ed91764f45ae1e5f5076e63586709b3dd895154bc694be8f9132df95aa2b75",
  "dcId": 1,
  "nextApiId": 2496,
  "dateUpdated": {
    "$date": "2025-04-21T13:08:24.991Z"
  },
  "banned": false,
  "firstName": "Arina",
  "id": "6449840146",
  "lastName": "Loginova",
  "messageCount": 38,
  "twoFa": false,
  "twoFaDate": {
    "$date": "2025-04-20T20:22:25.493Z"
  },
  "automaticCheckDate": {
    "$date": "2025-04-21T13:08:24.991Z"
  },
  "remainingTime": {
    "$date": "2025-04-21T12:06:59.230Z"
  },
  "personalChannel": "QRvUQOVoQuNse4FO",
  "personalChannelDate": {
    "$date": "2025-03-29T15:24:28.835Z"
  },
  "stopped": false,
  "lazyCheckDate": {
    "$date": "2025-04-20T21:21:51.040Z"
  },
  "username": "loginova_colossal"
},
{
  "_id": {
    "$oid": "67dd2aedf5fa1dc49466c79e"
  },
  "accountId": "1727163594-prefix-female-casino",
  "dc1": "019db86f8b8e22e95d690e544a92828cc53d83b315200d08cc1731246f87ba20ef39c90b01d56d66e32ea3cc47d74c67912e8b8633c142d5b39cf61bfa145ba528aa0e703e69ca12cf56d59a6d5ed8e90b96060ee69ad2a449caadb4719a68ad96320effb75238952ba3a9e10bb6c4c3dc210cc551fe1abcbabf80224bcc5fb13cbec951cc5665cb650e639282487379bce6d8588cb126ea2139b344ad9b09d0107a9b8ab766614466c5a2d655994d14529224e4a4ef8004b65355c34f08af7bc9ac83615dbd32f99f0523976cc114c03156af2111b03d6d0bf6e5f92b5d16b41b2f3803cea55d03949fa2ff83428e69b10559273d652b6cbe9d1120e465265a",
  "dcId": 1,
  "nextApiId": 2040,
  "dateUpdated": {
    "$date": "2025-04-21T13:21:25.568Z"
  },
  "banned": false,
  "firstName": "Vera",
  "id": "1727163594",
  "lastName": "Bulanova",
  "messageCount": 34,
  "twoFa": false,
  "twoFaDate": {
    "$date": "2025-04-20T16:06:57.513Z"
  },
  "automaticCheckDate": {
    "$date": "2025-04-21T13:21:25.568Z"
  },
  "remainingTime": {
    "$date": "2025-04-21T11:30:32.775Z"
  },
  "personalChannel": "V1JiijCOLhNFAibU",
  "personalChannelDate": {
    "$date": "2025-03-29T15:24:22.565Z"
  },
  "historySpamBlocks": [
    {
      "spamBlockDate": {
        "$date": "2025-04-01T05:38:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-04-10T08:18:00.000Z"
      },
      "spamBlockDays": 1
    }
  ],
  "lazyCheckDate": {
    "$date": "2025-04-20T21:19:51.649Z"
  },
  "stopped": false,
  "username": "bulanova_delicious"
},
{
  "_id": {
    "$oid": "67dd2aeef5fa1dc49466c7aa"
  },
  "accountId": "1889327598-prefix-female-casino",
  "dc1": "23a21e62b88e4d3c2d126249f50966213b6998e5a257d832b04a372c12641fc2e4154a70fbad6d77b0645fdfb3a70ff6bf54d055325520657dff5ecc085b66f18457946304e14812e9a780b254d917f87e8c9ade084328c1a83c8c333b22cabfa0e1ebb59e518918179717e6f0009d7f4c48b04b46ecfe00f508738e04b210de3e2e4d81e7aee61e4ce92b659c4525f71c38db080de11e86dd65db67bb024905178d66d2cf831f3b5df6ac44ac20e3daa5cae512aac7149ed9237f4921e3134007bd01dc0df924cda7294df919e2e258edb94d72e9d2030033e8baeecdf6a8f4f9b371033c548b8c6d52c7e759b23689fde340a9e861304ef4cd566c97e92176",
  "dcId": 1,
  "nextApiId": 2496,
  "dateUpdated": {
    "$date": "2025-04-21T13:29:26.567Z"
  },
  "banned": false,
  "firstName": "Galina",
  "id": "1889327598",
  "lastName": "Agapova",
  "messageCount": 38,
  "twoFa": false,
  "twoFaDate": {
    "$date": "2025-04-20T20:22:24.270Z"
  },
  "automaticCheckDate": {
    "$date": "2025-04-21T13:29:26.567Z"
  },
  "remainingTime": {
    "$date": "2025-04-21T12:39:06.242Z"
  },
  "historySpamBlocks": [
    {
      "spamBlockDate": {
        "$date": "2025-03-29T06:16:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": "INFINITY",
      "spamBlockDays": 0
    }
  ],
  "personalChannel": "RdjE9fgSohnsKDrz",
  "personalChannelDate": {
    "$date": "2025-03-29T15:24:35.970Z"
  },
  "stopped": false,
  "lazyCheckDate": {
    "$date": "2025-04-20T20:31:30.348Z"
  },
  "username": "agapova_urban"
},
{
  "_id": {
    "$oid": "67dd2aeff5fa1dc49466c7ac"
  },
  "accountId": "5850042617-prefix-female-casino",
  "dc1": "693d61b60f3b1e7d84740fc615e8f35628367efa4416d29d1d7137325a557d054f6e0f2bb0b7820a8fd085cabda0bcccb2d2be13c0b5ddb7b865eecf5a84254013fbca357ed969847720d9a9ba3fe3a067da3b4951f7c02796865030a91b06c16438195b486b1e0228e9bbd803f1900d027620337059094dafb19e7b41f367c15d805a7293a6aa028fd2e5d392608504532f4ac3486170a30e7659039f9e7f573b57d2079cf939c04d2bf1455bf3f9196f93ca1e1e1154d361eb9d103a5fa1f133ed05585f6e010494a7ca47bbac55a43b617240177b142e9d775ed77d9f53275b2fff524cc394cfb087cef307bcc79a8319000e963ee03a8d8063d73b0ff512",
  "dcId": 1,
  "nextApiId": 2496,
  "dateUpdated": {
    "$date": "2025-04-21T13:32:41.098Z"
  },
  "banned": false,
  "firstName": "Ekaterina",
  "id": "5850042617",
  "lastName": "Fedorova",
  "messageCount": 34,
  "twoFa": false,
  "twoFaDate": {
    "$date": "2025-04-20T20:22:25.406Z"
  },
  "automaticCheckDate": {
    "$date": "2025-04-21T13:32:41.098Z"
  },
  "remainingTime": {
    "$date": "2025-04-21T13:53:53.076Z"
  },
  "historySpamBlocks": [
    {
      "spamBlockDate": {
        "$date": "2025-03-29T13:25:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-04-04T06:56:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-04-09T07:02:00.000Z"
      },
      "spamBlockDays": 1
    }
  ],
  "personalChannel": "RJNfLUuxgAqXrH0b",
  "personalChannelDate": {
    "$date": "2025-03-29T15:23:48.273Z"
  },
  "stopped": false,
  "lazyCheckDate": {
    "$date": "2025-04-20T20:42:31.314Z"
  },
  "username": "fedorova_copper"
},
{
  "_id": {
    "$oid": "67dd2aeff5fa1dc49466c7af"
  },
  "accountId": "7797929671-prefix-female-casino",
  "dc1": "11432faea7c5ebc0d19bc4c73e3d06ba17a992503381d1dca1cddaccc490614f1b13060119387a433b1b39486f922e8001eb369f1f26e81f71d1793ebd61e5fcfae77b8018f5270f958177cea9a50d56389972f410cb94fe0cd80f9240bc985032d09f5c48a4945cc831073d7f28e024c93b68373d43901f36f539b5e6091e6bdc50a1ec0b43eaaf854ae8f2b1a3f4eaf46980cc0f2b469ab9c368bf3b1db1584d5f0f2bf7f81279489232d75f327801655aae345676da1cfd2223c8328aeceaa21dafe36068c975aa60a016f01aa8236a15f05f8331eec0d873372172611e8d0b475d968c299da6650210740b4dbdbe4765c07387affa5b234f51758c848bc4",
  "dcId": 1,
  "nextApiId": 2040,
  "dateUpdated": {
    "$date": "2025-04-21T13:13:23.848Z"
  },
  "banned": false,
  "firstName": "Darina",
  "id": "7797929671",
  "lastName": "Malyutina",
  "messageCount": 34,
  "twoFa": false,
  "twoFaDate": {
    "$date": "2025-04-20T16:06:59.333Z"
  },
  "automaticCheckDate": {
    "$date": "2025-04-21T13:13:23.848Z"
  },
  "remainingTime": {
    "$date": "2025-04-21T11:11:38.008Z"
  },
  "personalChannel": "F4ZLNllcUkOfSiHG",
  "personalChannelDate": {
    "$date": "2025-03-29T15:24:47.278Z"
  },
  "lazyCheckDate": {
    "$date": "2025-04-20T16:08:42.681Z"
  },
  "stopped": false,
  "username": "malyutina_federal"
},
{
  "_id": {
    "$oid": "67dd2af3f5fa1dc49466c7d8"
  },
  "accountId": "7660906955-prefix-female-casino",
  "dc1": "2542f0138942c3a97d0eb841deeafdd5a48e6186e98af78c7eb3c34f80efdeebc247e0e7097c427e6ec6d7faafb6986f525844320e6863dbb6530af60a784c7720ce6167bdabd5a87840b302dca9f60cf39aec9b4e879ebd5cc8552caeb60fe2db8cf1c72df7918705b09f023f9d4b84a1033a038eca86b02207b717fc6029f1cdd3457d29047ce2390b15ae0bb7ca493c8fe28de6b5c4f652d4d9f731461596745abcc5b258014f2ce5389279d0e00e5dc45b38f2119693fca11e0bf9b64150d9574b81bb2e701ae57eb99d6d34c030189845f9702350fc1360f00656cab90e9fbb9cfcd5e9ec07bd6f50bffe0cd4c1ed1748a7ab7b998c0aca1beba7b70ecc",
  "dcId": 1,
  "nextApiId": 2040,
  "dateUpdated": {
    "$date": "2025-04-21T21:55:54.569Z"
  },
  "banned": false,
  "firstName": "Arina",
  "id": "7660906955",
  "lastName": "Zaitseva",
  "messageCount": 35,
  "twoFa": false,
  "twoFaDate": {
    "$date": "2025-04-20T20:22:26.310Z"
  },
  "automaticCheckDate": {
    "$date": "2025-04-21T21:55:54.569Z"
  },
  "remainingTime": {
    "$date": "2025-04-21T11:28:42.468Z"
  },
  "historySpamBlocks": [
    {
      "spamBlockDate": {
        "$date": "2025-03-30T11:23:00.000Z"
      },
      "spamBlockDays": 1
    }
  ],
  "personalChannel": "BlCgHJkTld6mxFgm",
  "personalChannelDate": {
    "$date": "2025-03-29T15:23:30.667Z"
  },
  "stopped": false,
  "lazyCheckDate": {
    "$date": "2025-04-21T21:55:54.266Z"
  },
  "username": "zaitseva_full"
},
{
  "_id": {
    "$oid": "67dd2af6f5fa1dc49466c805"
  },
  "accountId": "5713562689-prefix-female-casino",
  "dc1": "591b29851a0769306755d848b42ccf490d1e5dafb1a9c6124ed42e00125a21f4278d38f7d5c62bd6835769d8bdb165080d8cb6cfdb6eb8d27deb7d2b066572a160c6878bf5957e1c476ed5cf7108ada6c3c45886c492eec4899e42b5aa454ceb8a6982650e2019f77acbe54c07001ffa19113a1c9102ff8bbd9bb82f6e82529727cd9b6224a37548cadda8f8bd826ec95d232ea6fc259ea44700d901727b8ab8cfcea1602210313e72577ea85823cde8dd7071504665de7a7e06690003a8b5163ee4134c997cec1662566ee297d83a9a902009639db774791f7a406efb03d2d5899df708fd337f2c8f66831f452f3da7241e4974ad3795cccbe677336b2cad91",
  "dcId": 1,
  "nextApiId": 2496,
  "dateUpdated": {
    "$date": "2025-04-21T13:28:25.395Z"
  },
  "banned": false,
  "firstName": "Raisa",
  "id": "5713562689",
  "lastName": "Chugunova",
  "messageCount": 46,
  "twoFa": false,
  "twoFaDate": {
    "$date": "2025-04-20T20:22:26.150Z"
  },
  "automaticCheckDate": {
    "$date": "2025-04-21T13:28:25.395Z"
  },
  "remainingTime": {
    "$date": "2025-04-21T11:55:42.763Z"
  },
  "personalChannel": "exuG9HJtGQJKjNMv",
  "personalChannelDate": {
    "$date": "2025-03-29T15:26:50.250Z"
  },
  "lazyCheckDate": {
    "$date": "2025-04-20T21:15:51.069Z"
  },
  "stopped": false,
  "username": "chugunova_awful"
},
{
  "_id": {
    "$oid": "67dd2af8f5fa1dc49466c819"
  },
  "accountId": "7604039644-prefix-female-casino",
  "dc1": "6d28e0f3264f45a9ff650d476da9c0e8c1b33b7d23eb2e76c6d46932012140a377f2dae163d9eea03427c0e77a4522f7b834ffac161cec67ee3f3da6faddfe1b61a68d8995910c1151827061d0e425183cd32fc766465088649b2497b07eaa2db085021c0969d33ad41850db2772c72762095387d17666739a22c2b5727f8c4b5f52ca40a7a07640e852d81bb5de9d91597d85e377aa8c1b00e425a0b1926d01e3e5d17f43647c2058dbd3fb71bfeae0fb98751eff58c0444a16525152b89a8c281d660ab3d88f2b83fbe4f4a3e8810fdc654abe099fa81d4767905fca584024cb443ef784f51ab7c0b93b304d817f236a8d0f10f35c9a0ce79516870fef9ed8",
  "dcId": 1,
  "nextApiId": 2496,
  "dateUpdated": {
    "$date": "2025-04-21T21:53:54.218Z"
  },
  "banned": false,
  "firstName": "Raisa",
  "id": "7604039644",
  "lastName": "Dubrovina",
  "messageCount": 33,
  "twoFa": false,
  "twoFaDate": {
    "$date": "2025-04-20T20:22:26.138Z"
  },
  "automaticCheckDate": {
    "$date": "2025-04-21T21:53:54.218Z"
  },
  "remainingTime": {
    "$date": "2025-04-21T12:51:02.266Z"
  },
  "personalChannel": "Jazxl2UAmSqoiPdI",
  "personalChannelDate": {
    "$date": "2025-03-29T15:23:22.829Z"
  },
  "historySpamBlocks": [
    {
      "spamBlockDate": {
        "$date": "2025-04-02T11:56:00.000Z"
      },
      "spamBlockDays": 1
    }
  ],
  "stopped": false,
  "lazyCheckDate": {
    "$date": "2025-04-21T21:53:53.986Z"
  },
  "username": "dubrovina_christian"
},
{
  "_id": {
    "$oid": "67dd2afff5fa1dc49466c887"
  },
  "accountId": "6462840843-prefix-female-casino",
  "dc4": "7a159c87959ccf0f4b6e8955c8eee6791fbf205a145bae44b3d911058a0a930e4c4a45b20f85b7eadf04a3178b68f3c6e12e753434ebb95d51bd5e81da61ed9fc7e9d425d64557e460959cdecfc3cfd927eda4ce202fc4fcea9c19aa07ba0b9081715b7a33e46e0e962f78c7f3edbe369ebfa9d1807f12c6b048edae4c2ad54875ae2eb1e36fd4dc2bcccabf64b1fd79eff049dac918129d35d700fa34568bb6f74dc8385d91a6b81b7071d539ad40b9e4cc4e1a531e6da549f305aad192f36bab05ae6a9d2e70892a00090013db2020f98d95fb365e3eb820aad5a6890290f29d2c9cb70ad0000f9689284cdca8ea142c1b5096ba64f9a0025c8cbdcb4a04fd",
  "dcId": 4,
  "nextApiId": 2496,
  "dateUpdated": {
    "$date": "2025-04-21T13:13:27.707Z"
  },
  "banned": false,
  "firstName": "Olga",
  "id": "6462840843",
  "lastName": "Pakhomova",
  "messageCount": 40,
  "twoFa": false,
  "twoFaDate": {
    "$date": "2025-04-20T16:06:44.421Z"
  },
  "automaticCheckDate": {
    "$date": "2025-04-21T13:13:27.707Z"
  },
  "remainingTime": {
    "$date": "2025-04-21T11:20:13.437Z"
  },
  "historySpamBlocks": [
    {
      "spamBlockDate": {
        "$date": "2025-03-30T05:55:00.000Z"
      },
      "spamBlockDays": 1
    }
  ],
  "personalChannel": "YkhlnuVLIj6MbXGn",
  "personalChannelDate": {
    "$date": "2025-03-29T15:26:29.343Z"
  },
  "stopped": false,
  "lazyCheckDate": {
    "$date": "2025-04-20T20:59:50.950Z"
  },
  "username": "pakhomova_practical"
},
{
  "_id": {
    "$oid": "67dd2b04f5fa1dc49466c8bc"
  },
  "accountId": "6551765583-prefix-female-casino",
  "dc1": "0bb6ef9a02306f86b615d5c2476a2d944dd887a7e7063915519dcee6b9c4ae9985a122ed0065bb2b70076dca910dd1ce54fc0a26c06d1576b1528de003fa33836f9f2a60d55269b40b9076533aa17683222f3ad1153328e044b4014bc430c4a89432b9d664d39fb4798354daeea5e1db6d74dd766b6e428e4883e908d88e502b5115a1ab085b07f799782702d55d85c7ca3976a7fea1eb20487678a5d0a6a54ad1be965f6b9adeb7ee8651ce32dc44d7003621c4144a1e7a93ab7143478d4284d3ffb1ea027d3eb01b1ab16959efd46b453ee4062c6b0a3deb94a9ff9a801938016b515c3ff7c1e3ef6c4b712ad165345d8abf6576077a356af5e83610d1bf74",
  "dcId": 1,
  "nextApiId": 2496,
  "dateUpdated": {
    "$date": "2025-04-21T21:48:51.839Z"
  },
  "banned": false,
  "firstName": "Raisa",
  "id": "6551765583",
  "lastName": "Petrova",
  "messageCount": 20,
  "twoFa": false,
  "twoFaDate": {
    "$date": "2025-04-20T20:22:22.132Z"
  },
  "automaticCheckDate": {
    "$date": "2025-04-21T21:48:51.839Z"
  },
  "remainingTime": {
    "$date": "2025-04-21T07:53:31.845Z"
  },
  "personalChannel": "BFFuTVYrEkJMDT9X",
  "personalChannelDate": {
    "$date": "2025-03-29T15:24:18.144Z"
  },
  "lazyCheckDate": {
    "$date": "2025-04-21T21:48:51.626Z"
  },
  "historySpamBlocks": [
    {
      "spamBlockDate": {
        "$date": "2025-04-11T06:20:00.000Z"
      },
      "spamBlockDays": 1
    }
  ],
  "stopped": false,
  "username": "petrova_constant"
},
{
  "_id": {
    "$oid": "67dd2b05f5fa1dc49466c8c9"
  },
  "accountId": "7656382239-prefix-female-casino",
  "dc1": "42561f3e097ae55afdfd1e25be3efa8898e7f382f91835c393df8d4d0e5d3835c1bf1aa7e4b8ebe066fe1243888d3bc2a99d0bb20f4a5a9107fcdacd8f9582a7764db649c857abae9bd0c101d3f2c87af96ca4b338c0beb3fddb77f7f23559e0340d94bb844a391fb903bf45a2739e18da0aa5f7fbf037fab5f5c87f4b8353b77e749850c07adc5f55600e886173bf36bbe85a5c0103cbde5a0e99fc2eea81c9dc16c1b2e4f2b71fa9a9ad43fd96330a665bf8746409bf86132050730761953f7b9d3809ffca3c826caecd03553d443593141f4c320d6fc11c9bb1a75dd7d0447ad29945f79fb9b904dbed95b7be772414891b23efa005fe53f57dd82ed7ff8a",
  "dcId": 1,
  "nextApiId": 2496,
  "dateUpdated": {
    "$date": "2025-04-21T13:23:28.016Z"
  },
  "banned": false,
  "firstName": "Yana",
  "id": "7656382239",
  "lastName": "Gorshkova",
  "messageCount": 36,
  "twoFa": false,
  "twoFaDate": {
    "$date": "2025-04-20T20:22:21.620Z"
  },
  "automaticCheckDate": {
    "$date": "2025-04-21T13:23:28.016Z"
  },
  "remainingTime": {
    "$date": "2025-04-21T11:21:57.171Z"
  },
  "personalChannel": "IlHN0nZpbSPbKDay",
  "personalChannelDate": {
    "$date": "2025-03-29T15:22:36.703Z"
  },
  "stopped": false,
  "lazyCheckDate": {
    "$date": "2025-04-20T21:23:48.815Z"
  },
  "username": "gorshkova_conservative"
},
{
  "_id": {
    "$oid": "67dd2b06f5fa1dc49466c8d0"
  },
  "accountId": "6830266691-prefix-female-casino",
  "dc1": "976f834b5be8d4e32edf8275fe0556067a0ccadd2dba80bf188ae27281b0855d082c7e8789bf6372ea3035b0544100be4bcc4a10bb3fb7364039d6f7cfc1e910a6606d9c8af6571a7a68b93aa08158d07ee7ba4f631b7ce6baf9dffc6c51b0fcd87ad31f173a4af065424f430834d5a7da41f8c8dd8e60ac64f30b50545aaa5df49f150001e98b5247df485f6ec30ccc832e394c81101e7f1512f1b12458407688c9010014a72b6ef5d5250abf2e6b3e5d001d417c3a3d7123b3b6dc726af20ea6fd08e0cf118eafb04744bf78a5496bf5f975ff0d3a4f28e2e07b542889e49f6c976e38e1edbb0c3dfe0716abe42eb60ce934aaf4aeeec9c814fac96ab78d01",
  "dcId": 1,
  "nextApiId": 2496,
  "dateUpdated": {
    "$date": "2025-04-21T21:50:54.743Z"
  },
  "banned": false,
  "firstName": "Galina",
  "id": "6830266691",
  "lastName": "Malakhova",
  "messageCount": 16,
  "twoFa": false,
  "twoFaDate": {
    "$date": "2025-04-20T16:06:46.245Z"
  },
  "automaticCheckDate": {
    "$date": "2025-04-21T21:50:54.743Z"
  },
  "remainingTime": {
    "$date": "2025-04-21T07:00:44.838Z"
  },
  "personalChannel": "aIKn2PvTsRfsgCRp",
  "personalChannelDate": {
    "$date": "2025-03-29T15:27:29.545Z"
  },
  "lazyCheckDate": {
    "$date": "2025-04-21T21:50:54.508Z"
  },
  "stopped": false,
  "username": "malakhova_wandering"
},
{
  "_id": {
    "$oid": "67dd2b0df5fa1dc49466c91f"
  },
  "accountId": "7504238276-prefix-female-casino",
  "dc1": "8d9bd66394c8a617493349b4007ba3b7e2e6bc440b4e6f2585e77358e2957ba1960a9614fcaeac8f9b4091e9174f252e2b0a4b599be9b2e548956f883d1e5d8544ee69cdd14c2a173e2a74fdea6961bf4906b8e3bbbb198f2cff2772d71ff530ac61bf7e01b3ff8acd6b6cc909b18b10f15d58f31011b9da33b54fbce2c2ccf12a55ad110253d381c035a4d262e81e36680edba8ba079ac6709e5e2a492af17a26bec270fdd7d420be544a175d053d34998ba58e37a8e47c0e67f844fd434a40e6b7c6510d33912960aea9f78ba46393f6ae2697bce4f47ef8611a3d508e49eb47fd1806e6585a34189a7c6e0c30113bc38f7f6d0010c29bfa0b98ef4ba439ad",
  "dcId": 1,
  "nextApiId": 2040,
  "dateUpdated": {
    "$date": "2025-04-21T13:08:30.129Z"
  },
  "banned": false,
  "firstName": "Inna",
  "id": "7504238276",
  "lastName": "Rudakova",
  "messageCount": 36,
  "twoFa": false,
  "twoFaDate": {
    "$date": "2025-04-20T12:18:28.777Z"
  },
  "automaticCheckDate": {
    "$date": "2025-04-21T13:08:30.129Z"
  },
  "remainingTime": {
    "$date": "2025-04-21T13:56:28.486Z"
  },
  "personalChannel": "skvHx2vfURueNKzA",
  "personalChannelDate": {
    "$date": "2025-03-29T15:22:55.579Z"
  },
  "historySpamBlocks": [
    {
      "spamBlockDate": {
        "$date": "2025-03-31T08:45:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-04-24T12:02:00.000Z"
      },
      "spamBlockDays": 3
    }
  ],
  "lazyCheckDate": {
    "$date": "2025-04-20T16:32:53.410Z"
  },
  "stopped": false,
  "username": "rudakova_clever",
  "spamBlockDate": {
    "$date": "2025-04-24T12:02:00.000Z"
  },
  "spamBlockDays": 3,
  "spamBlockInitDate": {
    "$date": "2025-04-21T12:37:16.729Z"
  }
},
{
  "_id": {
    "$oid": "67dd2b14f5fa1dc49466c972"
  },
  "accountId": "5254793801-prefix-female-casino",
  "dc1": "74a3bbb8e6a26450b35f6cff2b94e2c21b093c72dbdd4b66d87861652831170a1625550e4f6c6bdb0fcfe2bd9430e8b5abf844bd141070ffe89ae3548bbf11e9e48aab083ae8a00e4543a6b45a5781824e63fa7bac5d30d898dad2ebcf9e144c2f8170da87ce5632bda553acbbe3396818e9a624d0e9d5f5bccb010637f0b3a056e238c1ba32cf9a4ec987b5711a70acedbe40ef47d51f673609f1b3b6bc7ec7a3f71b6755955b3fa662c2a3eceb8a78e06b3cb0ba26f5a74a538cf40a24cb962759aeaf67db6464eac726f797728bd5692e12f7bf852c17a7f96f813704a40c325e70789117059b6af7eda19d76190fb17fe1c876f717f4d7151f937b191a94",
  "dcId": 1,
  "nextApiId": 2040,
  "dateUpdated": {
    "$date": "2025-04-21T13:29:31.972Z"
  },
  "banned": false,
  "firstName": "Vera",
  "id": "5254793801",
  "lastName": "Loginova",
  "messageCount": 35,
  "twoFa": false,
  "twoFaDate": {
    "$date": "2025-03-24T09:27:53.467Z"
  },
  "automaticCheckDate": {
    "$date": "2025-04-21T13:29:31.972Z"
  },
  "remainingTime": {
    "$date": "2025-04-21T14:08:30.249Z"
  },
  "personalChannel": "vNwfuRxBYrHsJo1H",
  "personalChannelDate": {
    "$date": "2025-03-29T15:24:48.075Z"
  },
  "lazyCheckDate": {
    "$date": "2025-04-20T20:41:31.770Z"
  },
  "stopped": false,
  "username": "loginova_combative"
},
{
  "_id": {
    "$oid": "67dd2b17f5fa1dc49466c98b"
  },
  "accountId": "6643610264-prefix-female-casino",
  "dc1": "6d2a008411a2ba46608184cdff24467b97c4245b866e54e0d5f3e881c2d2f84298a561d6ace73013a95d50c788bd91ac7bb3557614f0536aea72bbf97bf55e4fdb69f87898904c8d719854b28176ad69909a6a59120c82ac56181b0c8a1173315ca3cf2a7e8750d410b0a4d6856bc8177512690ad6e55d6bfbae8d92e4040573453720a6a0a8a57f6d419e272e54d13974dcee701c86a3a76468ee5070210c05d3c4a66af6027736c3e1f43f9e16164ed3c0eb81ff67badb46b5911ddd06d24dee54dbd9be166f2f3c9d09361e960fa9380dcf79adde669225f2a81f39a14a62599b258b2a97df22fdb8c37f4a47b83afa25125ce7986e31861c4bc0c48f2d64",
  "dcId": 1,
  "nextApiId": 2040,
  "dateUpdated": {
    "$date": "2025-04-21T21:49:59.933Z"
  },
  "banned": false,
  "firstName": "Darina",
  "id": "6643610264",
  "lastName": "Antonova",
  "messageCount": 29,
  "twoFa": false,
  "twoFaDate": {
    "$date": "2025-04-20T20:22:26.547Z"
  },
  "automaticCheckDate": {
    "$date": "2025-04-21T21:49:59.933Z"
  },
  "remainingTime": {
    "$date": "2025-04-21T11:28:04.474Z"
  },
  "personalChannelDate": {
    "$date": "2025-03-29T21:33:52.716Z"
  },
  "personalChannel": "sniueHqVTY6ciAtL",
  "historySpamBlocks": [
    {
      "spamBlockDate": {
        "$date": "2025-04-03T10:19:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-04-07T10:27:00.000Z"
      },
      "spamBlockDays": 3
    }
  ],
  "lazyCheckDate": {
    "$date": "2025-04-20T22:18:43.144Z"
  },
  "stopped": false,
  "username": "antonova_melodic"
},
{
  "_id": {
    "$oid": "67dd2b17f5fa1dc49466c98e"
  },
  "accountId": "6673199830-prefix-female-casino",
  "dc1": "20a5c84ad01c39deb3acedfdf9a26393557ff0b492ed81e27631215880a1c7dd62303640e84701b870f669e481fce35598dca7780ca8dc1498b5e44b46df1ca1598b2dc212c7c31678c42aa20eb7e9e70a8e9f2d99f0f18a049a32c07d732493906fb74468e0da9f50f700f8112ec30bfbc45860faa762a02b99d27a7bed167812cfe7263eb41fb3934c35c14fa719f8c91d1902b95afcc51ca5370fb4cc5ae7f729c8a420b5eaae78a833287385884f4ab664ab4915185a4694c1d64440508b19280267529ead2c8a216740cca1fa308b73800703f216febc91894f16f65b326001b4a217a2dccd434f7b1056112cadcdc1abfa18546b7cbd7fe72f5ea44a7c",
  "dcId": 1,
  "nextApiId": 2040,
  "dateUpdated": {
    "$date": "2025-04-21T21:50:00.200Z"
  },
  "banned": false,
  "firstName": "Olga",
  "id": "6673199830",
  "lastName": "Mishina",
  "messageCount": 26,
  "twoFa": false,
  "twoFaDate": {
    "$date": "2025-04-20T20:22:26.511Z"
  },
  "automaticCheckDate": {
    "$date": "2025-04-21T21:50:00.200Z"
  },
  "remainingTime": {
    "$date": "2025-04-21T12:05:44.922Z"
  },
  "historySpamBlocks": [
    {
      "spamBlockDate": {
        "$date": "2025-04-04T08:58:00.000Z"
      },
      "spamBlockDays": 7
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-30T07:22:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-03-30T17:30:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-04-05T08:00:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-04-05T12:40:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-04-09T07:42:00.000Z"
      },
      "spamBlockDays": 1
    }
  ],
  "personalChannel": "uJD5FQkDGTVbkcBM",
  "personalChannelDate": {
    "$date": "2025-03-29T15:23:27.146Z"
  },
  "stopped": false,
  "lazyCheckDate": {
    "$date": "2025-04-21T21:49:59.986Z"
  },
  "username": "mishina_tricky"
},
{
  "_id": {
    "$oid": "67dd2b17f5fa1dc49466c990"
  },
  "accountId": "5302008305-prefix-female-casino",
  "dc1": "b6c3cb920a33fb8d8b1fb793cc0666593052059585bbb2d56f03653c91464551a17f514020be8d79c69425b08e9948ead1a6e33a1ed0cf8fd87888917f67e00f2c7f617e6ce0088aed8c13bf32f714b5f6fd4b943eaaf89b3cc732ec9ce1aeb188b752d6079d2f6e44d892664e4d3e9c048e6eddadf05da7b7869ea00dedc4e4e0861692e8a0eb6cf8e7704dfdbaeacd42950002c7e8b06916fc6f6010749c2414ecc344eae073cbcf7540f1efe16f24d6cd2dd276fc436305addddb38c6b8cbeaa7236862e5284b3f9fe0244f896a0450acabbfe9fc3c75e31cf0093ec9a0a79edbf1e952cb060b70289f63dfdcf24ad3f598df3a19a84c0ae42526d73a9e22",
  "dcId": 1,
  "nextApiId": 2040,
  "dateUpdated": {
    "$date": "2025-04-21T14:04:29.400Z"
  },
  "banned": false,
  "firstName": "Galina",
  "id": "5302008305",
  "lastName": "Petrova",
  "messageCount": 39,
  "twoFa": false,
  "twoFaDate": {
    "$date": "2025-04-20T20:22:24.534Z"
  },
  "automaticCheckDate": {
    "$date": "2025-04-21T14:04:29.400Z"
  },
  "remainingTime": {
    "$date": "2025-04-21T11:28:02.090Z"
  },
  "personalChannel": "V3DAosoRYJeLzvvJ",
  "personalChannelDate": {
    "$date": "2025-03-29T15:25:29.511Z"
  },
  "historySpamBlocks": [
    {
      "spamBlockDate": {
        "$date": "2025-04-04T06:07:00.000Z"
      },
      "spamBlockDays": 1
    }
  ],
  "stopped": false,
  "lazyCheckDate": {
    "$date": "2025-04-20T21:20:52.946Z"
  },
  "username": "petrova_open"
},
{
  "_id": {
    "$oid": "67dd2b1ef5fa1dc49466c9e1"
  },
  "accountId": "6991426627-prefix-female-casino",
  "dc1": "82f636b36daadb8301c16bfe21c1b7cb46a6db8c5b3c5c5027f975c1185c77a915060115b7c2da96b0e30389dd0a9ca6d015b4492c9734b7bfa7ee5072ecc486378038b70b05f4f85fd190ad206b0101eb0d57b9080738033c9b18b1ae05f50da1ac33505174fec1d70f779bb557fc480cd39fec228ea7b532ab5694e71402f8c246082e67359d5e1cbe6f11208d5891f523769e0dba2ad3314d35090d2cc75169169b071863134db56c2cc132c5eb60eb52964df7a6c7117ab3892cd494915ce807a11bfbd4c45e518d6b78438b12818ab2ed435e217f6f284ec7339ece0cd9ad8b1b6aa3a44b98d1917060e5ff69303dd9ae44c4f62bdaf99eaad153edfe22",
  "dcId": 1,
  "nextApiId": 2040,
  "dateUpdated": {
    "$date": "2025-04-21T13:25:32.173Z"
  },
  "banned": false,
  "firstName": "Yana",
  "id": "6991426627",
  "lastName": "Shirokova",
  "messageCount": 29,
  "twoFa": false,
  "twoFaDate": {
    "$date": "2025-03-27T11:30:12.684Z"
  },
  "automaticCheckDate": {
    "$date": "2025-04-21T13:25:32.173Z"
  },
  "remainingTime": {
    "$date": "2025-04-21T07:51:37.811Z"
  },
  "personalChannel": "jwCFucOH3YSFrmcB",
  "personalChannelDate": {
    "$date": "2025-03-29T15:23:23.367Z"
  },
  "historySpamBlocks": [
    {
      "spamBlockDate": {
        "$date": "2025-04-04T05:16:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-04-11T07:37:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-04-22T05:52:00.000Z"
      },
      "spamBlockDays": 1
    }
  ],
  "stopped": false,
  "lazyCheckDate": {
    "$date": "2025-04-20T20:49:30.804Z"
  },
  "username": "shirokova_screeching",
  "spamBlockReasons": [
    {
      "reason": "Im unable to message non-mutual contacts, despite having no history of misconduct. Could you please review this limitation? I need full access to connect with important contacts immediately.",
      "date": {
        "$date": "2025-04-21T06:18:19.950Z"
      }
    },
    {
      "reason": "I cant message non-mutual contacts due to a recent restriction. Ive not been involved in any suspicious activity and believe this is an error. Please restore my full messaging access.",
      "date": {
        "$date": "2025-04-21T12:10:46.427Z"
      }
    }
  ],
  "spamBlockDate": {
    "$date": "2025-04-22T05:52:00.000Z"
  },
  "spamBlockDays": 1,
  "spamBlockInitDate": {
    "$date": "2025-04-21T06:18:19.955Z"
  }
},
{
  "_id": {
    "$oid": "67dd2b1ef5fa1dc49466c9e7"
  },
  "accountId": "7901499869-prefix-female-casino",
  "dc1": "0a295c6e8c9da7f7d86d1afb1df722dec50bc0b99bdde10e9011f868f6af29f69c0bc107cced2d831e7ade7ae3f18813fff365b0bcb9718b98a31e718133acac6d1b602332f44adf63df3c3d9766b4bff67b1babb1b8c67cd7d6882ef5273817dea3e7dbd299fe2b91b1baf50da2f7c4ad570bbb5d9bd62a700dedc2021a9233acb65f15ab90715739e84f9327d6bb265c80aa04967b2fe10dd80e9adef9012fca7dd62a7aa11e58e22b0f5d35e87b5a06db1f5493a3145ebb1513081b14b40252d660cb94b2f577396b8615f567f983ef351f1d3c48bab682bc5d2ef6b68c44fb4e64eabc34159f624772c5b398d3c09ff9eeb527451065cdcef1fc48c02cf9",
  "dcId": 1,
  "nextApiId": 2040,
  "dateUpdated": {
    "$date": "2025-04-21T13:27:31.053Z"
  },
  "banned": false,
  "firstName": "Polina",
  "id": "7901499869",
  "lastName": "Chugunova",
  "messageCount": 31,
  "twoFa": false,
  "twoFaDate": {
    "$date": "2025-04-20T16:06:47.275Z"
  },
  "automaticCheckDate": {
    "$date": "2025-04-21T13:27:31.053Z"
  },
  "remainingTime": {
    "$date": "2025-04-21T11:57:04.898Z"
  },
  "personalChannel": "dUiLfyEpNNqp5cLk",
  "personalChannelDate": {
    "$date": "2025-03-29T15:24:08.902Z"
  },
  "historySpamBlocks": [
    {
      "spamBlockDate": {
        "$date": "2025-04-03T13:00:00.000Z"
      },
      "spamBlockDays": 1
    }
  ],
  "stopped": false,
  "lazyCheckDate": {
    "$date": "2025-04-20T20:59:50.656Z"
  },
  "username": "chugunova_grotesque"
},
{
  "_id": {
    "$oid": "67dd2b26f5fa1dc49466ca33"
  },
  "accountId": "7664222800-prefix-female-casino",
  "dc1": "b2c3e8de63c8ec3ff9ce1a2dde4d82e533d7cfa666a65eddadd9a6daceb44d38201ef92cc90b8ddb991eede759d42bfb332f9904979ee37d395444fac70429ca1317474dc8fe7fdf334561d92382b190634f6742679855406fa3db4ef43a98ce6594eb271f792dda783fac9b5aff630f1397006baf0215d6011dc911620c545ef8c847dff5048366e90dc272c94e83a27b4bd2b11334860cf37cdac6690215e721095444a624ae3c0c6487071e77ba85a579bbc65624cb45616c282758c86bb6d3656664b698e4fde501b0921e72cfbb14adedb45cebe39c709d8835a8a9ffb216a3388c156d87771081219f1e4e2b5d266125c79d89f6f90770262230603c81",
  "dcId": 1,
  "nextApiId": 2040,
  "dateUpdated": {
    "$date": "2025-04-21T14:04:27.862Z"
  },
  "banned": false,
  "firstName": "Lubov",
  "id": "7664222800",
  "lastName": "Medvedeva",
  "messageCount": 16,
  "twoFa": false,
  "twoFaDate": {
    "$date": "2025-04-20T20:22:21.409Z"
  },
  "automaticCheckDate": {
    "$date": "2025-04-21T14:04:27.862Z"
  },
  "historySpamBlocks": [
    {
      "spamBlockDate": "INFINITY",
      "spamBlockDays": 0
    },
    {
      "spamBlockDate": {
        "$date": "2025-04-04T08:23:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-04-20T17:02:00.000Z"
      },
      "spamBlockDays": 3
    },
    {
      "spamBlockDate": {
        "$date": "2025-04-21T15:45:00.000Z"
      },
      "spamBlockDays": 1
    }
  ],
  "remainingTime": {
    "$date": "2025-04-20T14:46:07.761Z"
  },
  "personalChannel": "tdN8LdOwJiQmzPdH",
  "personalChannelDate": {
    "$date": "2025-03-29T15:25:27.721Z"
  },
  "lazyCheckDate": {
    "$date": "2025-04-20T20:29:29.419Z"
  },
  "stopped": false,
  "username": "medvedeva_progressive",
  "spamBlockReasons": [
    {
      "reason": "Ive been unfairly blocked from messaging new contacts, despite following all rules. My account hasnt sent spam, and Id like my full messaging access restored. Please review my case and consider removing this error.",
      "date": {
        "$date": "2025-04-20T16:11:06.421Z"
      }
    },
    {
      "reason": "Im unable to message new contacts, despite following guidelines. I havent engaged in any spamming or violations, so I believe this restriction is a mistake. Please review my accounts messaging status.",
      "date": {
        "$date": "2025-04-21T11:58:25.934Z"
      }
    }
  ],
  "spamBlockDate": {
    "$date": "2025-04-21T15:45:00.000Z"
  },
  "spamBlockDays": 1,
  "spamBlockInitDate": {
    "$date": "2025-04-20T16:11:06.425Z"
  }
},
{
  "_id": {
    "$oid": "67dd2b28f5fa1dc49466ca4e"
  },
  "accountId": "7870706836-prefix-female-casino",
  "dc1": "0e098e0133ce019bd515704d5125a00d79207c12bae77f7e9b3f37f28725a62425807f8c1f861f32ef52d74dc4559a69922a288d07b812d4381ca5e311028c4c7a16deeea8032b1088ad160282eba9bf3f81fd328269821f793c3b0d04d1b5997b29726ed8f55305fd34ee47ef0f622822f2a9a756b7442446100ebe5071a98a834c1499a331b50b6513cc104880871e99a8dc699d33b28d4ab5dd54b49602d6dcd41b603c535fc82dbd5315c012e4129839c5e52fd81cfe21e3b4a2d8f967aa3bf922ebef8cf9c4af26878ab6431e4ce867a920ca0c6812453735df2b5b43ec9a275f4387a6d619d03dc8d9004f531b4d37765d441f7f399cfd8875e3a5b4b6",
  "dcId": 1,
  "nextApiId": 2040,
  "dateUpdated": {
    "$date": "2025-04-21T21:48:00.438Z"
  },
  "banned": false,
  "firstName": "Daria",
  "id": "7870706836",
  "lastName": "Shumilova",
  "messageCount": 0,
  "twoFa": false,
  "twoFaDate": {
    "$date": "2025-04-20T20:22:22.837Z"
  },
  "automaticCheckDate": {
    "$date": "2025-04-21T13:07:32.702Z"
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
    "$date": "2025-03-21T09:22:52.054Z"
  },
  "spamBlockReasons": [
    {
      "reason": "I cant message non-mutual contacts, which is affecting my important communications. I believe this restriction is a mistake as Ive not been involved in any questionable activity. Please review and restore full messaging functionality.",
      "date": {
        "$date": "2025-03-22T10:12:52.197Z"
      }
    },
    {
      "reason": "Ive been wrongly limited in messaging all users, even though I havent broken any rules. Please restore my full access ASAP so I can contact people for work.",
      "date": {
        "$date": "2025-03-26T06:25:01.495Z"
      }
    },
    {
      "reason": "My accounts messaging function has been limited, preventing me from contacting essential connections. Ive done nothing wrong and request the full restoration of my messaging capabilities. Please review my case and resolve this issue promptly.",
      "date": {
        "$date": "2025-03-27T18:50:34.896Z"
      }
    },
    {
      "reason": "Im reaching out to request that my messaging feature be reactivated ASAP. I can assure you that my actions did not violate any rules, and this error is affecting my work.",
      "date": {
        "$date": "2025-04-03T18:03:03.167Z"
      }
    },
    {
      "reason": "I cant message anyone outside my mutuals due to a sudden restriction. There must be a mistake as I havent broken any rules. Please fix this ASAP as its affecting my work.",
      "date": {
        "$date": "2025-04-04T19:18:58.109Z"
      }
    },
    {
      "reason": "I believe my message functionality was wrongly limited, as I havent violated any rules. Id like to be able to contact all my friends again, as this feature is crucial for my Telegram experience. Thanks for your prompt attention to this matter.",
      "date": {
        "$date": "2025-04-06T16:39:39.538Z"
      }
    },
    {
      "reason": "I recently encountered an issue with my account, where Im unable to message new contacts. This seems like an error, as Ive followed all guidelines and havent been involved in any suspicious activity. Please restore my full messaging functionality.",
      "date": {
        "$date": "2025-04-08T17:23:26.193Z"
      }
    },
    {
      "reason": "I recently experienced a message-sending issue, preventing me from contacting some important connections. Ive been a law-abiding user, so I believe this happened by mistake. Please restore full messaging functionality.",
      "date": {
        "$date": "2025-04-09T08:08:53.253Z"
      }
    },
    {
      "reason": "My accounts message function needs to be restored. I cant reach essential contacts due to this issue, which seems like an error. I havent done anything shady to trigger this.",
      "date": {
        "$date": "2025-04-09T12:16:34.372Z"
      }
    },
    {
      "reason": "Id like to regain full messaging access on my account. I believe my recent messaging restrictions were applied mistakenly, as I havent violated any policies. Kindly review my case.",
      "date": {
        "$date": "2025-04-10T16:18:14.812Z"
      }
    },
    {
      "reason": "I believe my account has been incorrectly flagged, preventing me from messaging new contacts. Ive never spammed or violated any rules, so this seems like an error. Please restore my full messaging capabilities.",
      "date": {
        "$date": "2025-04-14T11:01:10.787Z"
      }
    },
    {
      "reason": "I cant message anyone outside my contacts due to an apparent error. I need to reach a client now, so please restore my full messaging capabilities ASAP. No policy violations occurred on my part.",
      "date": {
        "$date": "2025-04-16T07:02:54.758Z"
      }
    },
    {
      "reason": "Ive been blocked from messaging non-mutual contacts, which prevents me from reaching essential connections. I havent broken any rules, so Im sure this is a mistake. Please restore my full messaging capabilities.",
      "date": {
        "$date": "2025-04-16T10:38:25.711Z"
      }
    },
    {
      "reason": "My accounts messaging functionality needs restoring. Im certain my account was restricted by mistake as Ive followed all guidelines. Please review and fix this error.",
      "date": {
        "$date": "2025-04-16T13:17:16.133Z"
      }
    },
    {
      "reason": "Ive been unfairly limited to messaging mutual contacts only, which hinders my communication with important connections. This restriction seems like a mistake, as I havent violated any rules. Kindly restore my full messaging access.",
      "date": {
        "$date": "2025-04-17T20:19:24.662Z"
      }
    },
    {
      "reason": "My account is experiencing an issue: I cant message non-mutual contacts. I believe this is a mistake, as Ive followed all guidelines. Could you please fix this?",
      "date": {
        "$date": "2025-04-19T09:54:20.751Z"
      }
    },
    {
      "reason": "I recently encountered a messaging issue with my account. Despite following all guidelines, I can only message mutual contacts. Id like this function restored.",
      "date": {
        "$date": "2025-04-20T16:11:56.989Z"
      }
    }
  ],
  "personalChannelDate": {
    "$date": "2025-04-21T21:48:00.426Z"
  },
  "personalChannelError": "USER_RESTRICTED",
  "lazyCheckDate": {
    "$date": "2025-04-20T21:40:40.562Z"
  },
  "stopped": false,
  "username": "shumilova_dangerous"
},
{
  "_id": {
    "$oid": "67dd2b32f5fa1dc49466cabc"
  },
  "accountId": "5632848972-prefix-female-casino",
  "dc2": "6c23570525589efc05c22462f8fe17c570a78e28c02c60df6478fe9cca2b1028ff5a8f9c282f75fb9fab48515477a98a456049c37f49ed11bae44e7a5fc1c2514532f0315a2c84bd37e3a379862ec5454108463205889923128ea2deb6fc39227ca459b070fff9eae28b60c950139f66c2365c956ff29cadcc75d056d7cbf16161fee11a932b98d3fbe655a8f97fe289bf56f075ab62da97af6048fe7674a8b1b176d685520205565c99b0fb6cf7bd5d4162b154d80afba27200e9c32e87a9e0b830bd98993ef97ea8f5739cd6c86dc8b7333b6756319a233ddb9dfc54ad9264a5921a6de5a50dcbc41b3ed27bd22e0b251b082fa0f0e3a9ba456f2c9b26ec34",
  "dcId": 2,
  "nextApiId": 611335,
  "dateUpdated": {
    "$date": "2025-04-21T13:20:31.944Z"
  },
  "banned": false,
  "firstName": "Lubov",
  "id": "5632848972",
  "lastName": "Koroleva",
  "messageCount": 4,
  "twoFa": false,
  "twoFaDate": {
    "$date": "2025-04-20T20:22:21.327Z"
  },
  "automaticCheckDate": {
    "$date": "2025-04-21T13:20:31.944Z"
  },
  "historySpamBlocks": [
    {
      "spamBlockDate": "INFINITY",
      "spamBlockDays": 0
    }
  ],
  "personalChannelDate": {
    "$date": "2025-04-14T17:37:59.184Z"
  },
  "lazyCheckDate": {
    "$date": "2025-04-20T20:24:27.162Z"
  },
  "stopped": false,
  "personalChannel": "wtK8VABvELFPwDkY",
  "username": "koroleva_legal",
  "remainingTime": {
    "$date": "2025-04-21T14:43:16.920Z"
  }
},
{
  "_id": {
    "$oid": "67dd2b33f5fa1dc49466cac9"
  },
  "accountId": "7185286316-prefix-female-casino",
  "dc1": "82792be02d2fb7620b2506de5ad12f903c66b347383d9b38bf85f813fae3564c2b360c993fd35531ce0d1296026dc92edf9c1e0f8103be95f2e3c3d9253b9f6e483091e8aa7d5018c62a0935e3301b4737c00341f3cd0755633ee644953877c1f159677800370f1cf67e2b46eaad6273959900abb992d7f3115d17fcb0c76de11a15cf553938892fb55260a79d82d3ade58af3c95846a61714097eb3ae9da739b3864f125215ac1b5447c10a26c8001fb81d7e11e8a1360d1dfce03caf980531d0b7d0040157d0edc1b2b4f15202d0b1af3e915efb9bc9dd92ccded360f1a63e66b4eed599125bcb26ff7693d4136b584d2d28dc058482b6edf1841cf5f1a51a",
  "dcId": 1,
  "nextApiId": 2496,
  "dateUpdated": {
    "$date": "2025-04-21T21:48:01.620Z"
  },
  "banned": false,
  "firstName": "Svetlana",
  "id": "7185286316",
  "lastName": "Lebedeva",
  "messageCount": 0,
  "twoFa": false,
  "twoFaDate": {
    "$date": "2025-04-20T20:22:26.584Z"
  },
  "automaticCheckDate": {
    "$date": "2025-04-21T13:13:32.074Z"
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
    "$date": "2025-03-21T09:41:05.308Z"
  },
  "spamBlockReasons": [
    {
      "reason": "Id like to request the restoration of my messaging functionality on Telegram. I believe my account was wrongly limited, as Ive never violated any platform rules. Please review my case, considering my positive history.",
      "date": {
        "$date": "2025-03-24T14:17:17.784Z"
      }
    },
    {
      "reason": "I recently experienced a sudden limitation in messaging functionality. I never violated any rules, so this issue may have occurred by mistake. Please review my case.",
      "date": {
        "$date": "2025-03-26T06:28:59.938Z"
      }
    },
    {
      "reason": "My accounts functionality is impaired due to an apparent error. I havent done anything wrong, so please remove this limitation so I can message anyone. Thanks for looking into it.",
      "date": {
        "$date": "2025-03-27T13:18:06.977Z"
      }
    },
    {
      "reason": "I recently noticed that I can only message mutual contacts, despite never engaging in any rule-breaking behavior. Please review this situation and restore my full messaging capabilities, as I believe this restriction is an error.",
      "date": {
        "$date": "2025-03-27T18:41:58.378Z"
      }
    },
    {
      "reason": "Im unable to message new contacts due to an apparent error, even though my account remains active. Kindly restore full messaging functionality as soon as possible, as I need it for work.",
      "date": {
        "$date": "2025-04-03T17:14:04.517Z"
      }
    },
    {
      "reason": "Ive been incorrectly flagged for restrictions, unable to message anyone beyond mutual contacts. I havent violated any rules and need full messaging access restored ASAP. Please consider my request, thanks.",
      "date": {
        "$date": "2025-04-08T17:25:25.886Z"
      }
    },
    {
      "reason": "I need my messaging function restored. I havent violated any rules or engaged in spamming activities, so this restriction seems like a mistake. Please review my account activity and consider reversing this action.",
      "date": {
        "$date": "2025-04-08T18:37:49.319Z"
      }
    },
    {
      "reason": "Ive been mistakenly limited in messaging non-mutual contacts, despite no rule-breaking activity. Kindly restore my full messaging access for vital outreach.",
      "date": {
        "$date": "2025-04-09T12:28:07.436Z"
      }
    },
    {
      "reason": "Id like my messaging function fully restored. The limitation was likely an error as Ive not broken any rules. My contacts are waiting for urgent updates.",
      "date": {
        "$date": "2025-04-12T15:18:02.056Z"
      }
    },
    {
      "reason": "Ive recently lost access to messaging non-mutual contacts. This issue is hindering my ability to communicate with those unaware of my account, which is essential at the moment. Please review and resolve this problem.",
      "date": {
        "$date": "2025-04-14T10:55:28.779Z"
      }
    },
    {
      "reason": "I recently lost the ability to message non-mutual contacts, despite never breaking any rules. I need this fixed ASAP for work. Please restore my full messaging access.",
      "date": {
        "$date": "2025-04-16T07:00:12.539Z"
      }
    },
    {
      "reason": "Id like to report an issue with my Telegram account. Recently, Ive been unable to message anyone outside of mutual contacts, which is affecting my communication. I havent broken any rules and request my full messaging functionality be restored.",
      "date": {
        "$date": "2025-04-16T10:16:42.495Z"
      }
    },
    {
      "reason": "Id like to request the full restoration of my messaging function. I cant send messages to non-mutual contacts, which limits my work communication. I havent done anything wrong, so this may be an error.",
      "date": {
        "$date": "2025-04-16T13:12:57.479Z"
      }
    },
    {
      "reason": "I cant contact some of my friends because of an apparent error. My account hasnt been involved in any malicious activity, so I think the block on messaging happened by mistake. Please restore my full access.",
      "date": {
        "$date": "2025-04-17T20:09:11.582Z"
      }
    },
    {
      "reason": "I believe my accounts messaging function has been restricted due to an error. I havent done anything against the rules, and I need to send urgent work messages. Please restore my full messaging access.",
      "date": {
        "$date": "2025-04-19T10:39:24.385Z"
      }
    },
    {
      "reason": "Ive been falsely flagged, and my messaging function is limited. I need to reach non-mutual contacts ASAP. Please review my account status.",
      "date": {
        "$date": "2025-04-20T12:31:39.674Z"
      }
    },
    {
      "reason": "I believe my account has been unfairly limited. Ive done nothing wrong and would like to resume full messaging capabilities ASAP, especially since I urgently need to contact some work colleagues. Could you please fix this?",
      "date": {
        "$date": "2025-04-20T16:27:05.850Z"
      }
    }
  ],
  "personalChannelDate": {
    "$date": "2025-04-21T21:48:01.620Z"
  },
  "personalChannelError": "USER_RESTRICTED",
  "lazyCheckDate": {
    "$date": "2025-04-20T20:49:31.540Z"
  },
  "stopped": false,
  "username": "lebedeva_abstract"
},
{
  "_id": {
    "$oid": "67dd2b34f5fa1dc49466cacd"
  },
  "accountId": "7816722564-prefix-female-casino",
  "dc1": "5d6b1d7615eb9c7bbeae1ae1b5834e4a3681c6cd85a747e837e333f1b18b5032cc1650605bc315103a22553e198c18abdf51b5cf83fead9cd417bb5308e05ea518f0c06ab8548d5402d4782df94722a3fa80fc96f9c34ef8e2481f2647219efdc70ad643b759d5a02b1966d658fe43eb6e43cd36c0471f5d6d321b5612857bd9ff01c5d2f0c504e12070a512fdb7f6a941a567d127ca9ee1e8835eced94ceb340b5b6c473c2549c29f223118465cb2b09adc1d3fe0eaa4e98d8c830077129450977889985c0b748242278dd566c38e5e888217ce5c9876c0fbd2db86d6c3d5062dfbfb173b93a6958f7e511493881ff2aef126251236d9bf6349a44c5891e242",
  "dcId": 1,
  "nextApiId": 2040,
  "dateUpdated": {
    "$date": "2025-04-21T21:55:59.882Z"
  },
  "banned": false,
  "firstName": "Marina",
  "id": "7816722564",
  "lastName": "Zhdanova",
  "messageCount": 44,
  "twoFa": false,
  "twoFaDate": {
    "$date": "2025-04-20T16:06:45.101Z"
  },
  "automaticCheckDate": {
    "$date": "2025-04-21T21:55:59.882Z"
  },
  "remainingTime": {
    "$date": "2025-04-21T13:59:46.359Z"
  },
  "personalChannel": "KdpqXbf2lPGwIIlu",
  "personalChannelDate": {
    "$date": "2025-03-29T15:26:29.328Z"
  },
  "historySpamBlocks": [
    {
      "spamBlockDate": {
        "$date": "2025-04-04T03:02:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-04-22T12:14:00.000Z"
      },
      "spamBlockDays": 1
    }
  ],
  "stopped": false,
  "lazyCheckDate": {
    "$date": "2025-04-21T21:55:59.616Z"
  },
  "username": "zhdanova_teal",
  "spamBlockReasons": [
    {
      "reason": "I believe my account has been mistakenly flagged, preventing me from messaging important contacts. Please review this decision as I havent violated any policies.",
      "date": {
        "$date": "2025-04-21T12:42:48.194Z"
      }
    }
  ],
  "spamBlockDate": {
    "$date": "2025-04-22T12:14:00.000Z"
  },
  "spamBlockDays": 1,
  "spamBlockInitDate": {
    "$date": "2025-04-21T12:42:48.199Z"
  }
},
{
  "_id": {
    "$oid": "67dd2b37f5fa1dc49466cb0e"
  },
  "accountId": "7906531937-prefix-female-casino",
  "dc2": "82346204cc77bad85f5b3d9132844a0717ddf7500dfda5b5695f58df1437f1f0cc3c072c8a31d23481aa0eded59699269b03509028608e04c2a13a22e2ca5d3be91de57d6c303ff0a5c9c1fcc2002e8fe7a84b97ca62998cf9b3e180a3ed437c389f894e5771f98d4c2adb0efec49bb0013ea3dd753aa99f440183b714d0ef299df3fe185dd4daba5e105e2c12e074ceb8b5733df1c5e9f59150d02b8dec41ac90fc74b7ec694659ea7bcbb63485ffbe0ab88515880df0668cf02508b0f0daa9bc5fba78d897867d90186ed8ff8658ee6c7debe5f37157f0a315e8439a5d54ddacab95f05e7b01ddf6ba11feff0ccef7d65f42cd6fb02440f56a5a4dd234a89f",
  "dcId": 2,
  "nextApiId": 2496,
  "dateUpdated": {
    "$date": "2025-04-21T21:48:05.522Z"
  },
  "banned": false,
  "firstName": "Yulia",
  "id": "7906531937",
  "lastName": "Nikolaeva",
  "messageCount": 0,
  "twoFa": false,
  "twoFaDate": {
    "$date": "2025-04-20T16:06:45.107Z"
  },
  "automaticCheckDate": {
    "$date": "2025-04-21T13:16:33.287Z"
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
    "$date": "2025-03-21T09:27:50.003Z"
  },
  "spamBlockReasons": [
    {
      "reason": "I believe my messaging feature has been mistakenly limited, as I havent violated any rules. Id appreciate a review of my account, as this issue persists despite my clean messaging history. Thanks for your help.",
      "date": {
        "$date": "2025-03-22T09:31:15.680Z"
      }
    },
    {
      "reason": "Im unable to message all my contacts, which is affecting my urgent communication needs. I havent broken any rules and believe this restriction is an error. Please restore full messaging functionality to my account.",
      "date": {
        "$date": "2025-03-26T06:42:18.964Z"
      }
    },
    {
      "reason": "My account is unable to message some of my contacts, limiting my communication. This issue needs urgent attention since I need to reach these people immediately. Please review this as soon as possible, as I believe its an error.",
      "date": {
        "$date": "2025-03-27T13:18:02.527Z"
      }
    },
    {
      "reason": "I recently noticed an issue with my accounts messaging function. Im unable to message some of my contacts, which is impacting my communication. Ive not been involved in any suspicious activity and believe this restriction is a mistake.",
      "date": {
        "$date": "2025-03-27T18:45:43.021Z"
      }
    },
    {
      "reason": "I recently experienced an issue with my accounts messaging functionality. My belief is that this was an error since I didnt break any rules. I kindly ask you to restore my full messaging access.",
      "date": {
        "$date": "2025-04-03T17:28:48.775Z"
      }
    },
    {
      "reason": "Id like to request the removal of the recent limitation on my account. Ive not participated in any inappropriate activities, and I believe this restriction was applied incorrectly. Please restore my full messaging capabilities.",
      "date": {
        "$date": "2025-04-08T17:41:26.609Z"
      }
    },
    {
      "reason": "My messaging function has been unfairly disabled, preventing me from contacting essential connections. I havent done anything wrong, so please review this error.",
      "date": {
        "$date": "2025-04-09T12:40:29.497Z"
      }
    },
    {
      "reason": "Ive been wrongly flagged for message restrictions. I havent violated any rules, so please restore my full messaging access. I need to reach important contacts without mutual connections.",
      "date": {
        "$date": "2025-04-10T16:18:33.641Z"
      }
    },
    {
      "reason": "My account needs to regain full messaging capabilities to contact important non-mutual connections. I believe this limitation was a mistake as I havent broken any rules. Please review and restore my access.",
      "date": {
        "$date": "2025-04-12T15:11:11.966Z"
      }
    },
    {
      "reason": "I want to clarify that my accounts recent changes were likely a mistake. Ive never broken any rules, so please restore my messaging. Thanks for considering my request.",
      "date": {
        "$date": "2025-04-14T10:58:47.302Z"
      }
    },
    {
      "reason": "I need to communicate with non-mutual contacts for work, but my accounts messaging is currently limited. Ive done nothing wrong, so please review this decision. Thanks.",
      "date": {
        "$date": "2025-04-16T06:40:54.994Z"
      }
    },
    {
      "reason": "Id like to appeal the message-sending restriction on my account. Theres been a mistake; I havent violated any rules or spammed. Please review and restore full functionality.",
      "date": {
        "$date": "2025-04-16T13:01:50.887Z"
      }
    },
    {
      "reason": "My account has been incorrectly flagged, preventing me from reaching all my contacts. I havent done anything wrong, and I need full messaging access restored ASAP. Please review and fix this error.",
      "date": {
        "$date": "2025-04-17T20:16:48.566Z"
      }
    },
    {
      "reason": "I believe my accounts messaging function has been unfairly disabled due to a mistake. I need to regain full access to send work-related messages, which is currently not possible. Please restore my messaging capabilities.",
      "date": {
        "$date": "2025-04-19T10:35:39.420Z"
      }
    },
    {
      "reason": "Ive been unfairly barred from messaging, which is hindering urgent communication. Please review my case, as Ive caused no harm and have acted in good faith.",
      "date": {
        "$date": "2025-04-20T16:43:17.250Z"
      }
    }
  ],
  "personalChannelDate": {
    "$date": "2025-04-21T21:48:05.522Z"
  },
  "personalChannelError": "USER_RESTRICTED",
  "lazyCheckDate": {
    "$date": "2025-04-20T20:43:29.972Z"
  },
  "stopped": false,
  "username": "nikolaeva_useful"
},
{
  "_id": {
    "$oid": "67dd2b39f5fa1dc49466cb2a"
  },
  "accountId": "7665649248-prefix-female-casino",
  "dc4": "3fd9820639bf9a0b325c65bcc1e265c03dbb2cdd5314318dc34237ccea0ccef4fd9a774489d8aa3d4b67e5f943fe4999888ab9cafd8d06b2ae456721d96fb0447ac19f07a943bcbd128945cb568203089b5a18b79a84a31da7deee7f4b7a671ea43ce43ad488df549380c8347762cda1c7833e34308b2254d6f92627dc8ad11f65f075a2408894ee010a580e9b287437a437f94a1ed85cab74b2174a3d526340d250a1f2ee638994cbb6a27ad7c8780e8bb6c2934cdeb30ad0eed2d50bf8ac334571f7e75931cc0abcb18dd634eebcc861e03d1f4ce15bd68e586a25ace9aa2d4d5625ebc6f24fa561aef0122ec098d5fb96c76fe285903a75144b88ec3438c2",
  "dcId": 4,
  "nextApiId": 2040,
  "dateUpdated": {
    "$date": "2025-04-21T13:23:31.915Z"
  },
  "banned": false,
  "firstName": "Daria",
  "id": "7665649248",
  "lastName": "Denisova",
  "messageCount": 54,
  "twoFa": false,
  "twoFaDate": {
    "$date": "2025-04-20T20:22:27.789Z"
  },
  "automaticCheckDate": {
    "$date": "2025-04-21T13:23:31.915Z"
  },
  "remainingTime": {
    "$date": "2025-04-21T14:29:25.402Z"
  },
  "personalChannel": "qWySBQ3kVTcanvTA",
  "personalChannelDate": {
    "$date": "2025-03-29T15:26:35.392Z"
  },
  "stopped": false,
  "historySpamBlocks": [
    {
      "spamBlockDate": {
        "$date": "2025-04-05T05:37:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-04-08T05:48:00.000Z"
      },
      "spamBlockDays": 1
    }
  ],
  "lazyCheckDate": {
    "$date": "2025-04-20T21:12:49.930Z"
  },
  "username": "denisova_preferred"
},
{
  "_id": {
    "$oid": "67dd2b39f5fa1dc49466cb2e"
  },
  "accountId": "5452825473-prefix-female-casino",
  "dc1": "a6a89160e954fc77a8f6fc76c51bbb8fabf1d789cd179fb3e56896f24914c59bc79d8e295e90092264e6dbf8cde5f5cba8a0d8dfb9c9f4da5eb4cc6832dc69b868ec3d82e55ceeb94c313b99948e894d02b08dd3244dcecc5809b92686301afc69ad9fe15a63c220e45a36d2d26d68c1824a51f550956cfb04ed9e3aca8a68e5d49a3d77588c4c4b4d8f59573762a167d08e00876c9c90de44922242e788b23af0a12a0bd0f11dcd6f2fcae1a1de0a937f316e289d811fb1f888e62b2f70edb0e14eed083cb510b7b4838ef41417771104a6c0b6cdc5d2d4ab16f9a87bf5867f5a5adaa370ec44f55161b543c95626e721fe45436ae530becf3e7eb5d6a143b1",
  "dcId": 1,
  "nextApiId": 2040,
  "dateUpdated": {
    "$date": "2025-04-21T13:14:31.295Z"
  },
  "banned": false,
  "firstName": "Evgenia",
  "id": "5452825473",
  "lastName": "Nikitina",
  "messageCount": 33,
  "twoFa": false,
  "twoFaDate": {
    "$date": "2025-04-20T20:22:23.072Z"
  },
  "automaticCheckDate": {
    "$date": "2025-04-21T13:14:31.295Z"
  },
  "remainingTime": {
    "$date": "2025-04-21T12:00:18.077Z"
  },
  "personalChannel": "EIsJAyDGANQ9OVUV",
  "personalChannelDate": {
    "$date": "2025-03-29T15:22:52.951Z"
  },
  "lazyCheckDate": {
    "$date": "2025-04-20T20:57:47.085Z"
  },
  "historySpamBlocks": [
    {
      "spamBlockDate": {
        "$date": "2025-04-06T16:07:00.000Z"
      },
      "spamBlockDays": 1
    }
  ],
  "stopped": false,
  "username": "nikitina_essential"
},
{
  "_id": {
    "$oid": "67dd2b3af5fa1dc49466cb31"
  },
  "accountId": "7312625133-prefix-female-casino",
  "dc1": "80113679545fe19fd57dda089cdfcadb2bc0187d30b1f677c4122da6ad26b5936055c7797eab8bed8eb6a81d119633343e6575c0ae26c322cbc084d74674a1f193fee33fe0a0ab5a08530598715ba5402f12d2137f2fb0473ad8ae3e00ad19854e533d9f53f964ce9d059c9af01e0adef3d9c56cbc9ed8b8cead3f146d65ffbd21058d3cd82e0308972012989e8cbd2d0361b92649aba8f025819d98f0386b02e8796a5ebf147e476e40b903434be9d565d6f5145e5a2059751d59194be5a749ac2047279f5da913de9fee9042527bc424d8b7148ed1c1455e183981a836b9127ed01e16217ce70f20f99adee9733a4baa6404492c5939d578fc5ab3e7a82513",
  "dcId": 1,
  "nextApiId": 2040,
  "dateUpdated": {
    "$date": "2025-04-21T13:27:31.872Z"
  },
  "banned": false,
  "firstName": "Darina",
  "id": "7312625133",
  "lastName": "Lapshina",
  "messageCount": 17,
  "twoFa": false,
  "twoFaDate": {
    "$date": "2025-04-02T12:02:09.260Z"
  },
  "automaticCheckDate": {
    "$date": "2025-04-21T13:27:31.872Z"
  },
  "remainingTime": {
    "$date": "2025-04-21T07:09:02.022Z"
  },
  "personalChannel": "FSXq0lHvQtLthMIb",
  "personalChannelDate": {
    "$date": "2025-03-29T15:23:28.940Z"
  },
  "historySpamBlocks": [
    {
      "spamBlockDate": {
        "$date": "2025-04-01T08:53:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-04-14T17:34:00.000Z"
      },
      "spamBlockDays": 1
    }
  ],
  "lazyCheckDate": {
    "$date": "2025-04-20T20:39:31.789Z"
  },
  "stopped": false,
  "username": "lapshina_only"
},
{
  "_id": {
    "$oid": "67dd2b44f5fa1dc49466cba7"
  },
  "accountId": "5900620022-prefix-female-casino",
  "dc2": "7b3c8a7629886cf5e7fea570db7414473c03ef7deb453508dd4d6f089188fa544d08e014a2eae2fab2ea9218cd326404685fae38b7c7ce4f230c322dfc60c9b67f67ecdcd7d018a2c214bae5f3cd8d6f94b5d62963563c1b0b9b57b1575bc6411f8acda5c839633c62e3449ea26360ac43454c94fdad6207360c9be2182d39a65730f48191f17abb1d4448697475f5a851d4918c46cfb2c0ff13e19e2cda31269354661b7e30c2fde42d891b1222c74c1ed695b3a4e3e61eb34c966f9d4bdc746dbef6a845b64b89f91f6bd2832dbb3b505345dfaae5e628731b8fff4fd69ffe9a2e62fb00cd9b5222ec1f2429e039515a3705d10f46cec3c33d516143caa716",
  "dcId": 2,
  "nextApiId": 611335,
  "dateUpdated": {
    "$date": "2025-04-21T21:48:06.312Z"
  },
  "banned": false,
  "firstName": "Arina",
  "id": "5900620022",
  "lastName": "Golubeva",
  "messageCount": 0,
  "twoFa": false,
  "twoFaDate": {
    "$date": "2025-04-20T16:06:55.827Z"
  },
  "automaticCheckDate": {
    "$date": "2025-04-21T13:09:33.683Z"
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
    "$date": "2025-03-21T09:25:52.795Z"
  },
  "spamBlockReasons": [
    {
      "reason": "I believe my accounts message function was restricted by mistake. I havent broken any rules, and I need to contact some important people who arent mutuals. Kindly restore my full messaging capabilities.",
      "date": {
        "$date": "2025-03-22T09:54:47.495Z"
      }
    },
    {
      "reason": "Im unable to message some of my contacts due to a possible error. I havent done anything suspicious and believe this action is unwarranted. Please restore my full messaging functionality.",
      "date": {
        "$date": "2025-03-25T18:06:48.730Z"
      }
    },
    {
      "reason": "I believe my messaging capabilities were mistakenly limited. I havent been involved in any malicious activity, so I kindly request you restore my access.",
      "date": {
        "$date": "2025-03-26T06:35:57.566Z"
      }
    },
    {
      "reason": "My account has been mistakenly limited from messaging other users. Ive never violated any rules and would like my messaging feature restored. Please review my case.",
      "date": {
        "$date": "2025-03-27T12:56:14.798Z"
      }
    },
    {
      "reason": "I want to clarify that my recent inability to send messages via my account was likely an error. Ive not broken any rules, so I kindly request that you restore my full messaging capabilities ASAP for important work communications.",
      "date": {
        "$date": "2025-03-27T18:30:18.073Z"
      }
    },
    {
      "reason": "Im unable to message new contacts, although I havent violated any rules. Kindly review my account activity and restore full messaging functionality.",
      "date": {
        "$date": "2025-03-29T14:31:53.915Z"
      }
    },
    {
      "reason": "Ive been mistakenly limited from messaging on Telegram. I need to reach non-mutual contacts for important communication. Please restore full messaging access, as theres been no violation.",
      "date": {
        "$date": "2025-04-03T18:56:04.621Z"
      }
    },
    {
      "reason": "Im reaching out regarding my accounts messaging function. I cant contact important non-mutual connections due to an unexpected block. Please review this issue, as I havent done anything wrong.",
      "date": {
        "$date": "2025-04-04T19:04:39.337Z"
      }
    },
    {
      "reason": "I need to message all my contacts, especially those important to my work. I believe this restriction is a mistake, as I havent done anything wrong. Please review and restore my messaging function.",
      "date": {
        "$date": "2025-04-08T17:30:21.118Z"
      }
    },
    {
      "reason": "Im unable to message new contacts, although I havent violated any rules or spammed anyone. Please restore my messaging permissions, as I believe this restriction is an error.",
      "date": {
        "$date": "2025-04-08T18:37:29.628Z"
      }
    },
    {
      "reason": "My accounts messaging function is limited to mutual contacts, preventing me from reaching key individuals. I believe this is a mistake as I havent violated any rules. Please review and restore my full messaging capabilities.",
      "date": {
        "$date": "2025-04-09T09:52:01.614Z"
      }
    },
    {
      "reason": "Im unable to send messages to non-mutual contacts, impacting my communication. This restriction seems like an error, as I havent violated any rules. Please restore my full messaging capabilities.",
      "date": {
        "$date": "2025-04-09T12:32:25.714Z"
      }
    },
    {
      "reason": "I recently noticed an unexpected change in my account functionality. I can no longer message all my contacts, limiting my ability to communicate. Id appreciate some help fixing this issue, thanks.",
      "date": {
        "$date": "2025-04-09T19:57:26.296Z"
      }
    },
    {
      "reason": "Im unable to message anyone outside my mutual contacts, limiting my communication. I believe this restriction is a mistake, as I havent violated any rules. Please restore my full messaging capabilities.",
      "date": {
        "$date": "2025-04-10T15:53:17.090Z"
      }
    },
    {
      "reason": "My accounts messaging functionality is currently limited, preventing me from contacting important non-mutual connections. I believe this restriction is a mistake, as I havent done anything wrong or suspicious. Please restore full access.",
      "date": {
        "$date": "2025-04-12T15:03:49.260Z"
      }
    },
    {
      "reason": "My account has been mistakenly limited, preventing me from reaching key contacts. I havent done anything wrong and would like to resume normal messaging. Please review and restore my full access.",
      "date": {
        "$date": "2025-04-12T16:23:58.368Z"
      }
    },
    {
      "reason": "I recently noticed a change in my accounts functionality. I believe my messaging capabilities were mistakenly limited, as Ive not engaged in any suspicious behavior. Please restore my full access to messaging.",
      "date": {
        "$date": "2025-04-14T11:06:55.658Z"
      }
    },
    {
      "reason": "I recently lost the ability to message some contacts, which is affecting my communication. I believe this is an error, as I havent violated any rules. Please restore full messaging access.",
      "date": {
        "$date": "2025-04-14T12:29:26.906Z"
      }
    },
    {
      "reason": "My account has been incorrectly limited. I need to message important contacts, but I cant due to this error. Please restore my full messaging capabilities ASAP.",
      "date": {
        "$date": "2025-04-14T18:33:18.475Z"
      }
    },
    {
      "reason": "Ive been unfairly limited in my messaging capabilities, despite being an honest and responsible user. Kindly review my case and restore my full access, considering my clean track record.",
      "date": {
        "$date": "2025-04-15T12:54:00.231Z"
      }
    },
    {
      "reason": "Ive lost the ability to send messages to non-mutual contacts, which I need for work communication. I havent broken any rules, so this must be a mistake. Please restore my messaging functionality ASAP.",
      "date": {
        "$date": "2025-04-16T06:45:00.822Z"
      }
    },
    {
      "reason": "Ive recently experienced an issue with my accounts messaging function, preventing me from contacting non-mutuals, which is crucial for my work. Could you review the restrictions and consider adjusting them? Im certain theres been a mistake.",
      "date": {
        "$date": "2025-04-16T10:22:55.667Z"
      }
    },
    {
      "reason": "Ive been unable to message anyone outside of my mutual contacts, which is affecting my ability to communicate. I havent broken any rules and would like my messaging function restored. Kindly review my account activity to verify this.",
      "date": {
        "$date": "2025-04-16T13:17:38.982Z"
      }
    },
    {
      "reason": "I recently encountered an issue with my Telegram accounts messaging function. Im unable to send messages to new contacts, which seems like an error as Ive followed all community guidelines. Please review my account status.",
      "date": {
        "$date": "2025-04-16T16:50:40.929Z"
      }
    },
    {
      "reason": "Ive recently lost access to messaging outside of my contact list. This was likely an error as Ive not broken any rules. Please restore my full messaging capabilities ASAP.",
      "date": {
        "$date": "2025-04-17T20:04:28.237Z"
      }
    },
    {
      "reason": "My account seems to have been incorrectly flagged. I cannot message essential contacts, hindering my communication. I believe this is a mistake and ask for a review.",
      "date": {
        "$date": "2025-04-19T09:54:21.546Z"
      }
    },
    {
      "reason": "I recently experienced a messaging issue, unable to reach non-mutual contacts. I believe this was a mistake, as Ive not acted suspiciously. Please restore full messaging access.",
      "date": {
        "$date": "2025-04-20T12:45:16.214Z"
      }
    },
    {
      "reason": "I need to communicate with non-mutual contacts for work, but the current restrictions prevent me from doing so. Ive done nothing wrong and request my messaging functionality be restored. I hope you can understand and fix this issue.",
      "date": {
        "$date": "2025-04-20T16:20:49.033Z"
      }
    },
    {
      "reason": "Im unable to message new contacts, despite following the rules. This restriction seems unfair, given my clean messaging record. Please restore my full messaging capabilities.",
      "date": {
        "$date": "2025-04-20T17:46:20.218Z"
      }
    },
    {
      "reason": "I need my messaging function back ASAP. I cant reach essential contacts due to an error; I havent done anything wrong. Please review and restore my accounts full functionality.",
      "date": {
        "$date": "2025-04-21T12:09:59.995Z"
      }
    }
  ],
  "personalChannelDate": {
    "$date": "2025-04-21T21:48:06.312Z"
  },
  "personalChannelError": "USER_RESTRICTED",
  "stopped": false,
  "lazyCheckDate": {
    "$date": "2025-04-20T21:17:48.314Z"
  },
  "username": "golubeva_melodic"
},
{
  "_id": {
    "$oid": "67dd2b45f5fa1dc49466cbaf"
  },
  "accountId": "7268417922-prefix-female-casino",
  "dc2": "89ba420ec26be0d9d7bf3072543e32c8c342f029b832e552456f9bf01b39bcd169ee7478fcca6993e5f16692dc52a8ac14510d4c2663051eaeba396376459b0a7ade09ddcbcaa76bab2631cd2cbabf8fa4785af83a160d220a65d71cca75acc1fd37795ffd3e5a37a1c3363b06c7260d146b8dbb6f6d664162d3773752ff0f406b9aa3673fa050a344858663cfc85b9c9ba14864b17c5063987669bb8ece828af178988b635937cce996b6a74a6e05d32e325ebe6da799064925bf437771c92194d90df37247f1f72bd52d43afcb57e00719584134bc806d84aaffc2deba4330607396a0061cab31d0885fd399efb105395d9bcb094555fe01d87f0b58dda6ce",
  "dcId": 2,
  "nextApiId": 611335,
  "dateUpdated": {
    "$date": "2025-04-21T13:07:31.665Z"
  },
  "banned": false,
  "firstName": "Yulia",
  "id": "7268417922",
  "lastName": "Vasilyeva",
  "messageCount": 58,
  "twoFa": false,
  "twoFaDate": {
    "$date": "2025-04-20T20:22:26.652Z"
  },
  "automaticCheckDate": {
    "$date": "2025-04-21T13:07:31.665Z"
  },
  "remainingTime": {
    "$date": "2025-04-21T14:44:10.302Z"
  },
  "personalChannel": "ihFfxjw7FrpUNNhJ",
  "personalChannelDate": {
    "$date": "2025-03-29T15:26:45.007Z"
  },
  "stopped": false,
  "lazyCheckDate": {
    "$date": "2025-04-20T21:10:49.700Z"
  },
  "historySpamBlocks": [
    {
      "spamBlockDate": {
        "$date": "2025-04-07T14:04:00.000Z"
      },
      "spamBlockDays": 1
    }
  ],
  "username": "vasilyeva_mild"
},
{
  "_id": {
    "$oid": "67dd2b45f5fa1dc49466cbb6"
  },
  "accountId": "7599723757-prefix-female-casino",
  "dc2": "38c22aff893c79173205ae4c854055f72e8ec5693cd28aba6be4be37cc615c420f3e29d0267ed0635a1c876517f55dfebe2c4280ad3c46a378129496be07e7a14ce7240fc7b50a820cd8e678c8326c0eb71073237ba9b1d26beffb8c4b4b48c84fa37edc960f5e6c80d44820bf56a60e875cc1d9bb28ebbf66e72dce92379b4cf1b95597b9092c572debb3bc3fc17d3a6a3bad9e24aab87ae44a30c0eb087114e611784d5fb36c2ac929e862bf3375f0975e5be3a8f007c95bdd097e1ea79640aa537f04efb03aec20c1c486ec727078f650b0098c54debd1e9ff7d92c17b38a34546f5194fd50931d05623988054a6b1b4fb628dee247c911d77e3bb3f65ae5",
  "dcId": 2,
  "nextApiId": 2496,
  "dateUpdated": {
    "$date": "2025-04-21T21:51:05.772Z"
  },
  "banned": false,
  "firstName": "Anna",
  "id": "7599723757",
  "lastName": "Pakhomova",
  "messageCount": 48,
  "twoFa": false,
  "twoFaDate": {
    "$date": "2025-04-20T20:22:27.788Z"
  },
  "automaticCheckDate": {
    "$date": "2025-04-21T21:51:05.772Z"
  },
  "remainingTime": {
    "$date": "2025-04-21T14:34:40.092Z"
  },
  "personalChannel": "RJLMazKrpJJJ9HDe",
  "personalChannelDate": {
    "$date": "2025-03-29T15:23:29.900Z"
  },
  "historySpamBlocks": [
    {
      "spamBlockDate": {
        "$date": "2025-04-02T12:34:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-04-02T14:04:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-04-05T17:48:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-04-10T08:26:00.000Z"
      },
      "spamBlockDays": 1
    }
  ],
  "lazyCheckDate": {
    "$date": "2025-04-21T21:51:04.950Z"
  },
  "stopped": false,
  "username": "pakhomova_brainy"
},
{
  "_id": {
    "$oid": "67dd2b46f5fa1dc49466cbbb"
  },
  "accountId": "6386042328-prefix-female-casino",
  "dc2": "0664132ff56b1d0340e7ae7572c924ffc69b8b605674353fd8fe0265014662b419b4df1ed64aa84a70bfd64d98190118518fc54fe4e7f5ecc739e47580140a70c05264fb0c1c5d4a3cb3c6319784d3497df947938a47343b8ab06721df3c92820ee64b085abe4f5b9cf9dc227053a8b477390102179b741c69ccd83ece3d33b48d84a486c6377756c21c446cd00624b6f29d1e47eaa629c1115d1f7cb109b0dbebe0eca8fce2a2c538d39617e86c14d551f2abb444b1ab095c943cf66ae50587ed6f31621f882a4a59951a21989ee4b5805dc6eed5f5d2c14ff822afa9cdaa8a3f5452114f5581d9368619f1bb5a40121f5a5a1bbabb96d2ebbbfc57972dca18",
  "dcId": 2,
  "nextApiId": 2496,
  "dateUpdated": {
    "$date": "2025-04-21T13:05:31.404Z"
  },
  "banned": false,
  "firstName": "Darina",
  "id": "6386042328",
  "lastName": "Morozova",
  "messageCount": 9,
  "twoFa": false,
  "twoFaDate": {
    "$date": "2025-04-20T16:06:50.563Z"
  },
  "automaticCheckDate": {
    "$date": "2025-04-21T13:05:31.404Z"
  },
  "historySpamBlocks": [
    {
      "spamBlockDate": "INFINITY",
      "spamBlockDays": 0
    },
    {
      "spamBlockDate": {
        "$date": "2025-04-11T05:14:00.000Z"
      },
      "spamBlockDays": 1
    }
  ],
  "personalChannelDate": {
    "$date": "2025-04-09T00:18:02.111Z"
  },
  "stopped": false,
  "lazyCheckDate": {
    "$date": "2025-04-20T21:17:49.839Z"
  },
  "personalChannel": "AHxY8wPcfrgIXkHT",
  "remainingTime": {
    "$date": "2025-04-21T13:52:49.242Z"
  },
  "username": "morozova_electric"
},
{
  "_id": {
    "$oid": "67dd2b03f5fa1dc49466c8b4"
  },
  "accountId": "5705572681-prefix-female-casino",
  "dc1": "a6c5df0631dfda797c694b02f20e213cbaef6ba646a1b84814a0d20dd729423806d988fe3a163d1616330dee4bf65637ffd3789dc7aeed000c23b5bfa0b781c20124a1ab5e485182af9ed56235ec29f8825bb91d2974f05d0b98062d7db90a152ca92878c9c42f4d9ff0758684a471f53321e08449aba9889ae22a514a6ba433b5c4bebd1e1793c6a5a1be07c8ce3f06b0cb182f92fc805f064dca199d0dfd2cc0573c30ff71efabaaa9291b180b2b8042870286af6595b6e0900d00e385d1aa43d58ff190e52f6bbfc7da32c1644da94b06355a4c0721f884f3d025fa9f1fd11fff7df36173abca33310916fbfc03afa4367a38c60bb10b1dbff186b2e4f5c4",
  "dcId": 1,
  "nextApiId": 2496,
  "dateUpdated": {
    "$date": "2025-04-17T19:49:59.161Z"
  },
  "banned": false,
  "firstName": "Olga",
  "id": "5705572681",
  "lastName": "Ilyina",
  "messageCount": 31,
  "twoFa": false,
  "twoFaDate": {
    "$date": "2025-04-17T19:49:59.160Z"
  },
  "automaticCheckDate": {
    "$date": "2025-04-17T14:41:34.783Z"
  },
  "remainingTime": {
    "$date": "2025-04-09T10:06:47.421Z"
  },
  "personalChannel": "zzyEiMY4ZzjiJmSE",
  "personalChannelDate": {
    "$date": "2025-03-29T15:26:05.410Z"
  },
  "lazyCheckDate": {
    "$date": "2025-04-16T17:36:56.425Z"
  },
  "stopped": true
},
{
  "_id": {
    "$oid": "67dd2b04f5fa1dc49466c8b6"
  },
  "accountId": "7884978649-prefix-female-casino",
  "dc1": "110bbc4bffb57b7b0871c0ba69fc846c59d537cc374b3adb3dbdbe2ee7a02e0346633a6b87b3964c3a0f35924017619f7bffb7fc921e408c8b5d315a6451ce85856077f8424add1dc29ae32dbc92929ea456035f380f2710ed997c67a5a0155de9b340e77614a537bcce0e34fbc20cc4dcd5652ccfc398cb2ba59ec5c62f516e6cd121786b4cb1ce52cd7123dbe215a777268ec0bb1d9adaa1eb69f50c15e48dcde5e2fb4ea8dfaf70ba674f520c2eaf19f9f6c826d060d6130932bab03a853ddd162eeac4bef8ab5016fc371b26065bebaa056a44d56dcd84f83c25744b7f921c8a2fef83bea5487d5ece86ad9b2bebd1344545d9625a1e5591c6ead586fdb6",
  "dcId": 1,
  "nextApiId": 2496,
  "dateUpdated": {
    "$date": "2025-04-17T19:49:59.172Z"
  },
  "banned": false,
  "firstName": "Alisa",
  "id": "7884978649",
  "lastName": "Erokhina",
  "messageCount": 27,
  "twoFa": false,
  "twoFaDate": {
    "$date": "2025-04-17T19:49:59.172Z"
  },
  "automaticCheckDate": {
    "$date": "2025-04-17T14:41:33.898Z"
  },
  "remainingTime": {
    "$date": "2025-04-10T07:02:56.084Z"
  },
  "historySpamBlocks": [
    {
      "spamBlockDate": {
        "$date": "2025-03-29T08:38:00.000Z"
      },
      "spamBlockDays": 1
    },
    {
      "spamBlockDate": {
        "$date": "2025-04-05T06:19:00.000Z"
      },
      "spamBlockDays": 1
    }
  ],
  "personalChannel": "lJElZyLApntK0Pjw",
  "personalChannelDate": {
    "$date": "2025-03-29T15:24:46.479Z"
  },
  "lazyCheckDate": {
    "$date": "2025-04-16T16:37:59.437Z"
  },
  "stopped": true
},
{
  "_id": {
    "$oid": "67dd2b11f5fa1dc49466c94c"
  },
  "accountId": "5098362632-prefix-female-casino",
  "dc1": "42887efd08104f96e33da8cc7d404e2c1dc450f9bca1dca233d811f73e4e989ac8a3e44b93e5ea30ba5eb22620e3100951e803e9d30aabf028651fb3deeed6a65f0926ccdeb59f40cf989c679211f0542c343cfc80506d0fceadc63a1a9fbde44a7a2128b1695d74938a26689dcda8a316e4d5216efd88e7f9fe3c69b473e43158a2907c024cfe6835ccea12d040f1d1ecce2bfdb6ebcc38ff8c3d9c353aeeb667744cf8544ac2e0ea5fda91697f04904fc80785e477149388a42ffce97ee9a65134fdc1d5efe159128be9158aa465b73a21a6fd03000b70a455cd55838d4ae5226d0b12a15132429e215873d38ce45b335ffa71f8915aceeb4a8ec1f0dd0d93",
  "dcId": 1,
  "nextApiId": 2040,
  "dateUpdated": {
    "$date": "2025-04-17T19:50:01.616Z"
  },
  "banned": false,
  "firstName": "Albina",
  "id": "5098362632",
  "lastName": "Glazunova",
  "messageCount": 37,
  "twoFa": false,
  "twoFaDate": {
    "$date": "2025-04-17T19:50:01.616Z"
  },
  "automaticCheckDate": {
    "$date": "2025-04-17T14:41:33.114Z"
  },
  "remainingTime": {
    "$date": "2025-04-10T07:11:55.766Z"
  },
  "personalChannelDate": {
    "$date": "2025-03-29T21:35:21.248Z"
  },
  "personalChannel": "dKkDXsitjOmfB9DX",
  "historySpamBlocks": [
    {
      "spamBlockDate": {
        "$date": "2025-04-01T08:07:00.000Z"
      },
      "spamBlockDays": 1
    }
  ],
  "lazyCheckDate": {
    "$date": "2025-04-16T17:28:00.197Z"
  },
  "stopped": true
},
{
  "_id": {
    "$oid": "67dd2b3df5fa1dc49466cb5c"
  },
  "accountId": "1544861921-prefix-female-casino",
  "dc1": "63cb6f1d1d0b44ad9d9ff4ee0e756e51c81201f199d38f4f8ff9e83d49f0d64819ad066c230ddb4eabd3a2db22e46abac00edc46072a8d34c13f34939a9cd075a12ad8a2eef882daaa0b938c637119bee8eacb2ad01af4330ccfddba6f094df7721c846d52000f86f108f42cf2ff23d73aaa7e3679838ac8c5c3dca6dfa9b0365ff672af4a58ae245b31bb83dfe14c1684de437eb8e7db1b367ccfb0e547032cee5970979d05d153e09e1e495957495be84b7a7795d328cd15ed45ea1db243a9f2f73b8dac1d981ca8687b63b4e3337a001a7f92264d6d7de03954cdab985427ba789146a12114b5a61ad6234aa16dcaf8a235bc55a0acfc76d98d25dc74aa15",
  "dcId": 1,
  "nextApiId": 2040,
  "dateUpdated": {
    "$date": "2025-04-17T14:41:37.006Z"
  },
  "banned": false,
  "firstName": "Ekaterina",
  "id": "1544861921",
  "lastName": "Melnikova",
  "messageCount": 21,
  "twoFa": false,
  "twoFaDate": {
    "$date": "2025-04-08T17:09:49.509Z"
  },
  "automaticCheckDate": {
    "$date": "2025-04-17T14:41:37.006Z"
  },
  "remainingTime": {
    "$date": "2025-04-17T16:19:28.051Z"
  },
  "personalChannel": "WAwcEWSxIdjPqf7B",
  "personalChannelDate": {
    "$date": "2025-03-29T15:24:32.928Z"
  },
  "lazyCheckDate": {
    "$date": "2025-04-16T17:30:05.075Z"
  },
  "stopped": true
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
        accountId: `${id}-prefix-female-stomcenter`,
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
