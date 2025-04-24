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

const accounts = [
  {
    _id: {
      $oid: '680a1479461801f59998471f',
    },
    accountId: '7943613185-prefix-ukraine-documents',
    dc1: '56567ab97fd7e11ae9e89b0b3cfdf360718c53f1c30246c3e59af54bb1c4402aa6e24fabdc213b356ea219b049fb67794653be7efe7dddfeaba788178e1334cf24d933da700404c58f96e33f63860acc977a2b04af9a21304239da8487d5d03603be178cfdf51b8566ef38a648d45c7036bdbd9ca7559a8db7b216d6ac0e3031095fdd7ce7fc0ba3c494ad8994f2ae28f56cb8e3494c4a5b419037b474b00dca1aca9aa21fbb27df0ed01d7be1373474ae1ffe04cfff16cab728e0f2ea5df3d820d2016ee4c0960bc19a1e5ca63fb3df6b1c5465556cbe82abe33bb88499253ce3d07876f35f8337a983c13aa17f400743ce278e6f07e13040a644002839680a',
    dcId: 1,
    nextApiId: 2496,
    dateUpdated: {
      $date: '2025-04-24T11:07:09.612Z',
    },
    twoFa: false,
    twoFaDate: {
      $date: '2025-04-24T11:06:29.404Z',
    },
    phone: '+526675723801',
    banned: false,
    firstName: 'Artem',
    id: '7943613185',
    lastName: 'Sidorov',
    messageCount: 0,
    username: 'documents_in_Ukraine_2720',
    personalChannelDate: {
      $date: '2025-04-24T11:07:09.611Z',
    },
    personalChannelError: 'CHANNEL_NOT_FOUND',
  },
  {
    _id: {
      $oid: '680a1479461801f599984722',
    },
    accountId: '7093002056-prefix-ukraine-documents',
    dc1: '71b435df57f995b9fc4b98ef1eabcaa3f86cd5a66d8546b048d605f547ccd2a857135a3510bfe1d6d8ab4471a53bbd5bb96b7da6df94d2919a175328b5be8d2dc31a1c56596b149af223d04041be1cd87af4b934cb79d1e35b5f3309ae655c00598ddb88ca465230246ec294058b10fc2b7e38290bc363aaa02ecb382404c0f6c34918b705e491021ef6236b5905f95f3a5c379cad96919ca09d95f31b138cc95343813b873963f904239460fbc0eab0300ba83173d4347f4a351f18abb25057ae52adbcd592f9efa2b1d3247675d44df5b9cfa56574d96999318e44b8cf6852e66960403dae6d009bbea836ad1ddf716659194dccb0a1584e585e15cc40e7db',
    dcId: 1,
    nextApiId: 2496,
    dateUpdated: {
      $date: '2025-04-24T11:07:11.776Z',
    },
    twoFa: false,
    twoFaDate: {
      $date: '2025-04-24T11:06:31.209Z',
    },
    phone: '+527291528380',
    banned: false,
    firstName: 'Grigory',
    id: '7093002056',
    lastName: 'Kozlov',
    messageCount: 0,
    username: 'documents_in_Ukraine_4702',
    personalChannelDate: {
      $date: '2025-04-24T11:07:11.776Z',
    },
    personalChannelError: 'CHANNEL_NOT_FOUND',
  },
  {
    _id: {
      $oid: '680a1479461801f59998472b',
    },
    accountId: '7409571709-prefix-ukraine-documents',
    dc1: '546a1c19ddc96e58acd09cb2506334e0e912097f8bb7786614d646beda5228cc255f0a598df05fb0b641d6e770d6a131c466a4f41b1f32afbdba61ab7a9675d7f130c64d30302921378d2f8418293011780b0ba1d2185abb4cb9bb1d0241d0f2233660a49ef76ceaca6c92775ef6b708322e500e08ee80e9b1678b1f3656932c8a1f2309b79d4adcfa797ea59ea387ea880c8a24531d9e4312fbeb253e855a9dc19b7603acb669b5c7e60501eef9ac54496229853f9fa22b59cb731fa9cce6b43d23f5fe17432d9fb1244d8dcd1f77ae00d8fabfde0cae26dda2d5dd2b18142f28891443eabd16974ebf93366c531b148981180a383d0da461a4dfaff591077e',
    dcId: 1,
    nextApiId: 2496,
    dateUpdated: {
      $date: '2025-04-24T11:07:11.721Z',
    },
    twoFa: false,
    twoFaDate: {
      $date: '2025-04-24T11:06:30.930Z',
    },
    phone: '+543804919322',
    banned: false,
    firstName: 'Timofey',
    id: '7409571709',
    lastName: 'Voronin',
    messageCount: 0,
    username: 'documents_in_Ukraine_3880',
    personalChannelDate: {
      $date: '2025-04-24T11:07:11.721Z',
    },
    personalChannelError: 'CHANNEL_NOT_FOUND',
  },
  {
    _id: {
      $oid: '680a1479461801f59998472e',
    },
    accountId: '5429901707-prefix-ukraine-documents',
    dc1: '44e6860b3c36cf384a609c01e035d60008016a404ff45ea0e44055c640a7c2e929bc96b6d4bfe7a420cabc8edbd6b20f89e34c6c0a358e942b54022623ff9ce8ccfbfc13cc596f4edfbfe0c543c8d3bf2236c290c30d168dd6212c741fceff781c7f3d6be12bd9272166a3ecd96af42885c70c58b81ec16eecd3f8a673929c22099344a40d0743d16647a332c182c7050be5d9c32154e70fff7f54ec1b9d9d2624dca6c9c6c21a716b1b7a2040638c6d9a0754e67f767b6c4ba2e4dc57fd5eab179d1c644bf5947eaf05da00ea4466fca641c2f23accd00c82757b64ab5eb6470a794f29cfee3b6be365a40a237e6d6f32d6995278a4c7880b96c6643847bce5',
    dcId: 1,
    nextApiId: 2496,
    dateUpdated: {
      $date: '2025-04-24T11:12:15.313Z',
    },
    twoFa: false,
    twoFaDate: {
      $date: '2025-04-24T11:06:31.503Z',
    },
    phone: '+543804209490',
    banned: false,
    firstName: 'Ivan',
    id: '5429901707',
    lastName: 'Karpov',
    messageCount: 0,
    username: 'documents_in_Ukraine_4504',
    personalChannelDate: {
      $date: '2025-04-24T11:07:12.156Z',
    },
    personalChannelError: 'CHANNEL_NOT_FOUND',
    lazyCheckDate: {
      $date: '2025-04-24T11:12:15.018Z',
    },
    automaticCheckDate: {
      $date: '2025-04-24T11:12:15.313Z',
    },
  },
  {
    _id: {
      $oid: '680a1479461801f599984730',
    },
    accountId: '7788995591-prefix-ukraine-documents',
    dc1: 'c54d77516ae6b8b3db47b8139dbc62bbefdd71eac34414f2fd0bfeb8b908fc1e6c3722af5ba1546d9b0a7bd429c68fdae2c01dfc5e166d7f04728bbf849b5bf45c48304bfe8f3c2bebb052bd186b189e8635b41f4e3788aa291e92d92de235be848aa8bab9c04cc2c692e106656dd793ea13359da0071a9cf806e00149cce3698baddd7554c66a7ec3bebb5d05d420b4813bd02c9bd89c6fe13d6cb12ffde986b673138f73e77cf48bb643f63f5b2d6e00592a1510c19b464d9c802f57ec5e74420b4aef13cd9dd6bd68994f9ca88bf1ef3f1a3bc590723d9bb6bb54499ed0b89c0fba1777e53b795dffafc68d68926eb6b4ebde05a4d7afb2e9d3a99281d337',
    dcId: 1,
    nextApiId: 2496,
    dateUpdated: {
      $date: '2025-04-24T11:07:13.057Z',
    },
    twoFa: false,
    twoFaDate: {
      $date: '2025-04-24T11:06:31.206Z',
    },
    phone: '+525539138074',
    banned: false,
    firstName: 'Pavel',
    id: '7788995591',
    lastName: 'Stepanov',
    messageCount: 0,
    username: 'documents_in_Ukraine_6381',
    personalChannelDate: {
      $date: '2025-04-24T11:07:13.057Z',
    },
    personalChannelError: 'CHANNEL_NOT_FOUND',
  },
  {
    _id: {
      $oid: '680a147b461801f5999847cb',
    },
    accountId: '7077661045-prefix-ukraine-documents',
    dc4: '72951c4de3c00c29f2554e4686ca5bc8eb436a3d3e31ca49d0e1926994d9e2374b3e157bb6239fa5fecb7278b917152bb874d2e875382f7580674c050b71de2ee01541f2f7ef5be1fd2b5c8b0380a21b4119ab5f99e9e8310dd994b99594d61e8ed658c92c7e1a02bcc472fc0e8e502de77d417a4b66e38ec918aeb24c9044ec10cf51da25e2fa86cb524c98ee957e652291a4a4481344c72f1ddf79671b1533a99d09bdc35e9cc115f171d60c503754498636a094b76edbf715d500fd4e29a7dbecfe9940aceb4b530fec737cbfdbfce480ec16212a0a6f088984ed5131f86a70556348d2a45ff9e2424c2087c8420bddfe1439f3d662994eaf6cf7386ede46',
    dcId: 4,
    nextApiId: 2040,
    dateUpdated: {
      $date: '2025-04-24T11:07:10.395Z',
    },
    twoFa: false,
    twoFaDate: {
      $date: '2025-04-24T11:06:14.654Z',
    },
    phone: '+966538088067',
    banned: false,
    firstName: 'Vadim',
    id: '7077661045',
    lastName: 'Maksimov',
    messageCount: 0,
    username: 'documents_in_Ukraine_3579',
    personalChannelDate: {
      $date: '2025-04-24T11:07:10.395Z',
    },
    personalChannelError: 'CHANNEL_NOT_FOUND',
  },
  {
    _id: {
      $oid: '680a147b461801f5999847d0',
    },
    accountId: '1080722476-prefix-ukraine-documents',
    dc4: '6f748cbbaa915a21d15cb79425e0331259ec2d9b19f7b81657af7df6ab584a1e71e6d0beb1ea10e902d97f6dcba1805c8449c28ab5f8cac7b4c7a847193ca007d9f20c0bdbff2687f9b987ff9b416fc90ac62e0eeec16e34f2d54b1f1718fd70f11d778dce490ac16156eb715f44778928398cb4c14e1652dc91871852a8676100204ebe38b1d17f57edd8dd971f59f582b00bc56c80c3933b3f69dd94d4636583fbf04930ec975bece35bacd8afaf309d8b5b78a68aac2e48ef6ae62d33ab03f871e21edbb4eab523775595445a8746c0345b563363e6fcc03b80c8f5ba5c8d8328cc699119675aeac9dadb56ec190fe096dfe2dc55b4e3352bd9b080f419b8',
    dcId: 4,
    nextApiId: 2040,
    dateUpdated: {
      $date: '2025-04-24T11:07:20.972Z',
    },
    twoFa: false,
    twoFaDate: {
      $date: '2025-04-24T11:06:17.728Z',
    },
    phone: '+201002738092',
    banned: false,
    firstName: 'Aleksey',
    id: '1080722476',
    lastName: 'Ziminov',
    messageCount: 0,
    username: 'documents_in_Ukraine_47',
    personalChannelDate: {
      $date: '2025-04-24T11:07:20.972Z',
    },
    personalChannelError: 'CHANNEL_NOT_FOUND',
  },
  {
    _id: {
      $oid: '680a147c461801f5999847d3',
    },
    accountId: '1174083228-prefix-ukraine-documents',
    dc4: '4cf7cfab9e21d0caf5a6af7cdcae51f90138bce1bb9bc4f4b84389bd34678f7cb3eecd73965adf29591c912ac357e1bf401fd2a4fc6a1c85b36036e7626969a571c61e748705203988bf67d0eb50dab3a98a56df2110f3b0fc51b0ec14ec98c54b4706562a325c91409d66e9d43b3a8ee3ee5303ba45ab3335deb04bdb8e13f0849a31100deeae2cf8b37d25fd3b1ff77ef0bdbca0899c5b6491c3a10bbdfde1609247736631c183e44e039926cc2ccea644307f8bbf5363f9480e391784ac94ccea52c82d0f05cfe4f030956e728ca32684775599121a2af4a5e39ff287df90568e6bfc8cadda98b9234e4e2b3d03858ddd0a3db613a33bc04d19aff4a27ad8',
    dcId: 4,
    nextApiId: 2040,
    dateUpdated: {
      $date: '2025-04-24T11:07:10.396Z',
    },
    twoFa: false,
    twoFaDate: {
      $date: '2025-04-24T11:06:15.942Z',
    },
    phone: '+966554733380',
    banned: false,
    firstName: 'Alexey',
    id: '1174083228',
    lastName: 'Vlasov',
    messageCount: 0,
    username: 'documents_in_Ukraine_9772',
    personalChannelDate: {
      $date: '2025-04-24T11:07:10.396Z',
    },
    personalChannelError: 'CHANNEL_NOT_FOUND',
  },
  {
    _id: {
      $oid: '680a147c461801f5999847dd',
    },
    accountId: '7504166730-prefix-ukraine-documents',
    dc2: '3cc2e0c4059150c84f7eeef697e10c49aabb0f6436aa5c6133468040af4e3411b2efce80a61fd007c30193470b02d6b98543431e8373da2589737d1846127d3e1224e3964f549fe3facfef25050ef1f3a1ad090d3262e0c1b66b14e031de004912132dcf62d848c0a5eb4d230fc4f04c63292b076dc92d09cfe917f9f32be6cbe52ad303d701b41334468f1399b4b118c5cecbd7b61bc19f518597142f1562ffe1ee38de4641a293dd74c1301db57da33ecb699333344cbed85a0ec73c3df8880294cfc3abedc8546810d530b2ca7cd81cf98dd1ae776172393e59263a8033322b0957f98dc9af91398da8321dd76349844f270dc463bb26de7a37deeffb1283',
    dcId: 2,
    nextApiId: 2496,
    dateUpdated: {
      $date: '2025-04-24T11:07:20.634Z',
    },
    twoFa: false,
    twoFaDate: {
      $date: '2025-04-24T11:06:19.788Z',
    },
    phone: '+79223808718',
    banned: false,
    firstName: 'Matvey',
    id: '7504166730',
    lastName: 'Shishkin',
    messageCount: 0,
    username: 'documents_in_Ukraine_7792',
    personalChannelDate: {
      $date: '2025-04-24T11:07:20.634Z',
    },
    personalChannelError: 'CHANNEL_NOT_FOUND',
  },
  {
    _id: {
      $oid: '680a147c461801f5999847e8',
    },
    accountId: '6685253656-prefix-ukraine-documents',
    dc1: '3ebf329e8e4763bce4607fe6fa3bcd38692a6d3347eec961939a4be461c27a3185653147486afe4f7a22fd06e51595fdb04d42d4f9464576ad67bc832bf3f9511069012fe0364e0a7d41f03d56144e055c48e5d95606d808ee8c3190f922efcf2385696185c280c699bd079949621798d27f7a3f8ced9987a570ad8c594795c0f03323cc4f4ee08d3d3589d146a7a0fe6e76f975005957ef115c14ddef66ff24b9cc84b9a66dc08d59a76f54ef15321db14f6d535a17bfa527648031c7bdc7e1444720efac49dff2d56e2ccfeba586186aeeccc11479cf99d247bafb6cf04743b6aa99e647dd2cd1c8e740d5463c575d448118287e0cc6fe34b3c7041567ad1d',
    dcId: 1,
    nextApiId: 2496,
    dateUpdated: {
      $date: '2025-04-24T11:10:13.696Z',
    },
    twoFa: false,
    twoFaDate: {
      $date: '2025-04-24T11:06:15.956Z',
    },
    phone: '+543804694062',
    banned: false,
    firstName: 'Vitaliy',
    id: '6685253656',
    lastName: 'Ilin',
    messageCount: 0,
    username: 'documents_in_Ukraine_7659',
    personalChannelDate: {
      $date: '2025-04-24T11:07:11.366Z',
    },
    personalChannelError: 'CHANNEL_NOT_FOUND',
    lazyCheckDate: {
      $date: '2025-04-24T11:10:13.477Z',
    },
    automaticCheckDate: {
      $date: '2025-04-24T11:10:13.696Z',
    },
  },
  {
    _id: {
      $oid: '680a147c461801f5999847eb',
    },
    accountId: '7649871375-prefix-ukraine-documents',
    dc1: '11ee3dd1303d4cb6fa4a3134142d11bc18f068e9e9c5013e40486d6d83c9e4c8c1e12c26106e3cc7fac30bc13f755361158485f08f85262e947f309f103a025dceb9573af21da8d647fb1106b2e1cfd8507ac060ee9104026943cd9fc75fd12d21ded48401522753d07283d240b7be156cb140615bd9c75605dcfe2098a4dc1ba7a7b20f85664ea181dae8b6d571b8e594c63153dd366bcb14d640d867dffdf41130eca6bdc9a4a8fcce57db5ce796b12cdd9b633eafbcad3f7e8c93cdbe5db307e51e98d813a8e0a747af4e408032106bc9016b06a042545334909f969678a3fdd77b32f3d5d2f6aaedc314b6a7c6dbb2b3c9a3019dbe263edbc97f1b488730',
    dcId: 1,
    nextApiId: 2496,
    dateUpdated: {
      $date: '2025-04-24T11:07:13.896Z',
    },
    twoFa: false,
    twoFaDate: {
      $date: '2025-04-24T11:06:17.154Z',
    },
    phone: '+543804172217',
    banned: false,
    firstName: 'Nikolai',
    id: '7649871375',
    lastName: 'Ivanov',
    messageCount: 0,
    username: 'documents_in_Ukraine_6087',
    personalChannelDate: {
      $date: '2025-04-24T11:07:13.896Z',
    },
    personalChannelError: 'CHANNEL_NOT_FOUND',
  },
  {
    _id: {
      $oid: '680a147c461801f5999847ed',
    },
    accountId: '5594642635-prefix-ukraine-documents',
    dc1: '35adac9f8dee2bb904855b0178e4194b211b5ac03bfd319badb235de607c3f9e05012d0fdd8c26224ed6919f230aea4e7f85b3e843cda65e204cff3e8ef56395990f92b776fd73f3e4244011b56c0c5142a25ded08b60b66729a1a0b8da4b5ca38e81386a2e20336bd8b20305d4f10b98fb9f166c8538633ee908030105ed5523bc2975150c4df592aabaf4412e9dd9121be3f60350503af4267a13da1c1c4bad433ef5be680648379f3b579583cbf9372f7dc1dd90918e53fa8b98c84d686c84379df33b1f509e651f5899082bbe1d6fdc0a8ea6951527f90a740586d9b68412851e6b95fe375898b46e1489d45d088b4686873576d5eb7d298a8a4404b3656',
    dcId: 1,
    nextApiId: 2496,
    dateUpdated: {
      $date: '2025-04-24T11:13:20.991Z',
    },
    twoFa: false,
    twoFaDate: {
      $date: '2025-04-24T11:06:18.705Z',
    },
    phone: '+541139438094',
    banned: false,
    firstName: 'Dmitriy',
    id: '5594642635',
    lastName: 'Zubarev',
    messageCount: 0,
    username: 'documents_in_Ukraine_8895',
    personalChannelDate: {
      $date: '2025-04-24T11:07:17.901Z',
    },
    personalChannelError: 'CHANNEL_NOT_FOUND',
    lazyCheckDate: {
      $date: '2025-04-24T11:13:20.699Z',
    },
    automaticCheckDate: {
      $date: '2025-04-24T11:13:20.991Z',
    },
  },
  {
    _id: {
      $oid: '680a147c461801f5999847ef',
    },
    accountId: '7652394153-prefix-ukraine-documents',
    dc1: '10b425367f5db2bdaf136a5757118fe22e3e83fc9e91d31755f5b365cfcb42f3c4316248922ca5981a29b9046ea87390d715433e1255e0089fea831ab550d7d08fc0689256b378d4e453f4f89e73577ec7b6a1858bd3d3730cf8515ac86879958adaf5d84056adea3a1838124273b881a08bc04325c92581697a1cfe69835713e2dc5c46e2e398620912cbb3db9de7085b09c557e18fd9d91450834bd4212f12e16f034abe344c7c02dd2b57a95ce98a90fb4dad39a62c7ea37da52757a5021985a3def88fb22d3c190f34bf7f2782ec48ec5edd5df9d2b5456993b84259f911226db81e225a95a531f5d172e84604620ba965c50e152ca5a67193246b76dd2b',
    dcId: 1,
    nextApiId: 2040,
    dateUpdated: {
      $date: '2025-04-24T11:07:15.046Z',
    },
    twoFa: false,
    twoFaDate: {
      $date: '2025-04-24T11:06:18.702Z',
    },
    phone: '+528441338050',
    banned: false,
    firstName: 'Victor',
    id: '7652394153',
    lastName: 'Zyuzin',
    messageCount: 0,
    username: 'documents_in_Ukraine_2549',
    personalChannelDate: {
      $date: '2025-04-24T11:07:15.046Z',
    },
    personalChannelError: 'CHANNEL_NOT_FOUND',
  },
  {
    _id: {
      $oid: '680a147c461801f599984806',
    },
    accountId: '5713562689-prefix-ukraine-documents',
    dc1: '591b29851a0769306755d848b42ccf490d1e5dafb1a9c6124ed42e00125a21f4278d38f7d5c62bd6835769d8bdb165080d8cb6cfdb6eb8d27deb7d2b066572a160c6878bf5957e1c476ed5cf7108ada6c3c45886c492eec4899e42b5aa454ceb8a6982650e2019f77acbe54c07001ffa19113a1c9102ff8bbd9bb82f6e82529727cd9b6224a37548cadda8f8bd826ec95d232ea6fc259ea44700d901727b8ab8cfcea1602210313e72577ea85823cde8dd7071504665de7a7e06690003a8b5163ee4134c997cec1662566ee297d83a9a902009639db774791f7a406efb03d2d5899df708fd337f2c8f66831f452f3da7241e4974ad3795cccbe677336b2cad91',
    dcId: 1,
    nextApiId: 2496,
    dateUpdated: {
      $date: '2025-04-24T11:07:17.831Z',
    },
    twoFa: false,
    twoFaDate: {
      $date: '2025-04-24T11:06:16.513Z',
    },
    phone: '+541125380865',
    banned: false,
    firstName: 'Vadim',
    id: '5713562689',
    lastName: 'Melnikov',
    messageCount: 0,
    username: 'documents_in_Ukraine_2681',
    personalChannelDate: {
      $date: '2025-04-24T11:07:17.831Z',
    },
    personalChannelError: 'CHANNEL_NOT_FOUND',
  },
  {
    _id: {
      $oid: '680a147c461801f599984814',
    },
    accountId: '7226658755-prefix-ukraine-documents',
    dc2: '7ecd9431ef01d9d478a41916a86d4d1fd92b1c5d76787c5d2bfbb2a1d3c17101b80ca565fbd04d45ac934b405694530519c907620794091a933c53a1d283891f8b3d478f7e2375c8a8cb87d45ce47d2d80b3543c228332bb326b8de424eaee176e16a6a24bd47ca18fe9c83dda44d8044eedccf2937a3b3d37006ad9756f7708a5018512cbd3bb831c7ab430a983c9f2b6142c90cc887bc040e1f5eb795dae2a0b5c75878f0f621443faf757172386c063b0a3c54ebb12ce0827110b18dccdfd8069b697468725e760fe1453050285332682f692f8239f0cfeaa2d3f21829aba87ea9479f15928b825855ec281880c37eccc49b577e54bc8f188e3002ae6e3ab',
    dcId: 2,
    nextApiId: 2496,
    dateUpdated: {
      $date: '2025-04-24T11:07:22.908Z',
    },
    twoFa: false,
    twoFaDate: {
      $date: '2025-04-24T11:06:22.107Z',
    },
    phone: '+79526730380',
    banned: false,
    firstName: 'Fedor',
    id: '7226658755',
    lastName: 'Volkov',
    messageCount: 0,
    username: 'documents_in_Ukraine_4083',
    personalChannelDate: {
      $date: '2025-04-24T11:07:22.908Z',
    },
    personalChannelError: 'CHANNEL_NOT_FOUND',
  },
  {
    _id: {
      $oid: '680a147d461801f599984826',
    },
    accountId: '6795662329-prefix-ukraine-documents',
    dc1: '1c7d61f2ab772554300c09a19f20632b793402031ab9cf0756383d3f277286e3955e4acea45242e8d0594c9bd20710737f70d0d08ad1591ea11ae3e87032987cd209ab01e0d67bb56338e5bf337e16c6d94dd9271213ebbc0a39226d7b2262fb50a735f89fca57f865b2821f1dd9640bcb94928dd5f0118f6b11fe49e14670db24a3591d697676ce8ec913d7c6065d300c3dcc8e28f18421c192819a57cd162fdc3b8c2897a7d18bcaf842489df6c613d3d713d2004a5128b0bb4436a36a39d0e086f3dfbad44901cdf70311c9d298a47e66f1285bd79214afe9f388a029cad0f1c324b22e9421f4f11f858d309829a5971880d214e31adea4694707a9c36046',
    dcId: 1,
    nextApiId: 2040,
    dateUpdated: {
      $date: '2025-04-24T11:07:19.832Z',
    },
    twoFa: false,
    twoFaDate: {
      $date: '2025-04-24T11:06:19.786Z',
    },
    phone: '+50493380470',
    banned: false,
    firstName: 'Vitaliy',
    id: '6795662329',
    lastName: 'Erokhin',
    messageCount: 0,
    username: 'documents_in_Ukraine_9705',
    personalChannelDate: {
      $date: '2025-04-24T11:07:19.832Z',
    },
    personalChannelError: 'CHANNEL_NOT_FOUND',
  },
  {
    _id: {
      $oid: '680a147d461801f59998484e',
    },
    accountId: '7701519640-prefix-ukraine-documents',
    dc1: 'b583dedbe2248527ae243974df8451c3558514bc1f10407d36ad202d6da5e5a10d0428ed75974e10a1cfbaa89cc3b9750b9fc2343de6aeeeee295219bbbf9e78b34e5dcb0324b0c8cb3460ce80ff9662cd03ddbff852207ee978055152787143aa37d2b3d62b903f114b1b9040b321d1dfbdfbae358f66f3b6a45ededf2865d3c13f7d450a51bc431aa59368ed24d9923f64f5e95d778461058150e185942823576dd0a057ceeca79b0752c898b893d2be4405c2adc4c74733fce35f39b93f141c0f74cf499e1cab5fa4e3bc631314ca1112f6efe1a05c0842bc748ab23bcedb1c94dd83d0044b34b9a80a86db3397263bad7f2b3fff2d67f23c723a3eaa5a98',
    dcId: 1,
    nextApiId: 2496,
    dateUpdated: {
      $date: '2025-04-24T11:14:23.445Z',
    },
    twoFa: false,
    twoFaDate: {
      $date: '2025-04-24T11:06:18.703Z',
    },
    phone: '+541140380487',
    banned: false,
    firstName: 'Ilya',
    id: '7701519640',
    lastName: 'Sobolev',
    messageCount: 0,
    username: 'documents_in_Ukraine_4337',
    personalChannelDate: {
      $date: '2025-04-24T11:07:15.792Z',
    },
    personalChannelError: 'CHANNEL_NOT_FOUND',
    lazyCheckDate: {
      $date: '2025-04-24T11:14:18.705Z',
    },
    automaticCheckDate: {
      $date: '2025-04-24T11:14:23.445Z',
    },
  },
  {
    _id: {
      $oid: '680a147e461801f599984884',
    },
    accountId: '7698300283-prefix-ukraine-documents',
    dc1: '389764200882e0cc5fa859d5c107e321c418e23d7cce0428ff7980df6a879c0923ce509a6f354ce82fe772cbec339ba83b1c2d0a99d7e11c4988579c05fcbf22cbdf8c9aa23e92ee6b9e79766e5cdcbd3b0f01ed4da3d205f5c2178ecb31e5ecde6489fb7a9d8cff77eaf9cdd4490d6861420eb65d6029ad31296d222903f05b29504467b0b68d93b8354eb59a9946c3fa44ab393a4597040678178af6127874edbafd60df454bfce96ba6a47023ff1bb09ee9c5c7a1ded7c02c3bcd879165c12695fc2d6ee2b0d67a08aa5747e65fc4879c0f200578d5069df77e88217a4a7e7f110458f2f827475eff9fa6471439cfaa8aa21a19b5c7458ec1e4c128a09a7a',
    dcId: 1,
    nextApiId: 2496,
    dateUpdated: {
      $date: '2025-04-24T11:11:54.164Z',
    },
    twoFa: false,
    twoFaDate: {
      $date: '2025-04-24T11:06:18.704Z',
    },
    phone: '+525638052164',
    banned: false,
    firstName: 'Nikolai',
    id: '7698300283',
    lastName: 'Potapov',
    messageCount: 0,
    username: 'documents_in_Ukraine_7670',
    personalChannelDate: {
      $date: '2025-04-24T11:07:19.198Z',
    },
    personalChannelError: 'CHANNEL_NOT_FOUND',
    lazyCheckDate: {
      $date: '2025-04-24T11:11:22.048Z',
    },
    automaticCheckDate: {
      $date: '2025-04-24T11:11:23.468Z',
    },
    historySpamBlocks: [
      {
        spamBlockDate: {
          $date: '2025-04-25T12:29:00.000Z',
        },
        spamBlockDays: 2,
      },
    ],
    spamBlockDate: {
      $date: '2025-04-25T12:29:00.000Z',
    },
    spamBlockDays: 2,
    spamBlockInitDate: {
      $date: '2025-04-24T11:11:54.163Z',
    },
  },
  {
    _id: {
      $oid: '680a147e461801f5999848c0',
    },
    accountId: '1717567217-prefix-ukraine-documents',
    dc4: 'bc7ff10132ee60df760ad5f70151cbf9748b68335e358beaa5dcc6506f59c0b41e7a9374e07cb52e747dbfbfe8da3e553569773a5f3e712307486b29a2ee6c28b2ee8f5e21546446cfa9611df79c97057dc188e9cc3a982ff3efb74d582c90cb78a23ae1d4531ea258ae596b2205027c7d6541f2205c8808c22b1f68dfedc04e9a3f0bb386bb02b3f78175d153ce858d372c9c897a27dc3e9f4d4bfb64e093bf51a11d308d324bbb288a6386c12715f75af86f4f665af672d18fd9e26047065d756f36be41b3d08e6d1ae89a186b236ae51fea2ac186c9970d87f9839658fb91fccdd4748125adaad49822fe08ddb5dfd793e0853d4f0721da4df718a825af2f',
    dcId: 4,
    nextApiId: 2040,
    dateUpdated: {
      $date: '2025-04-24T11:10:33.922Z',
    },
    twoFa: false,
    twoFaDate: {
      $date: '2025-04-24T11:06:22.108Z',
    },
    phone: '+381603380036',
    banned: false,
    firstName: 'Mikhail',
    id: '1717567217',
    lastName: 'Nikolaev',
    messageCount: 0,
    username: 'documents_in_Ukraine_2918',
    personalChannelDate: {
      $date: '2025-04-24T11:07:23.439Z',
    },
    personalChannelError: 'CHANNEL_NOT_FOUND',
    lazyCheckDate: {
      $date: '2025-04-24T11:10:27.296Z',
    },
    automaticCheckDate: {
      $date: '2025-04-24T11:10:33.922Z',
    },
  },
  {
    _id: {
      $oid: '680a147e461801f5999848c4',
    },
    accountId: '7755065690-prefix-ukraine-documents',
    dc2: '3b05e3914cb396b96ad3c9e8c0b3ad06bc36e736de7c37b50ab99fa2c49649b2461fb0b46246b4c7db828f22a24018672edeee2c2a03c8ff87bf70e6c76d0a228b483586aedc0834762101e0e46b16343554d33d4cf3affe17c4428da61fb75cda579e7fd6585bfafb3367b00afc4a9aeb5cf3ab360407e0b572e33d0e1f949d1138b1d1bec624b6c9d43025945136460185a543e5a3a8310241f0569398e03a7fe6294925cf7175cf5c4529791d668cdb65f322bcfe4a320b4df57a62df2b2765333c9d8ab9d1820abd8d34b12ba6d74aea353018483e8b63b8f89f75d4cec6b620c4dcd2dd886e246a712bdf4482426135e74f555e7fa1da27ee47ef0310b0',
    dcId: 2,
    nextApiId: 611335,
    dateUpdated: {
      $date: '2025-04-24T11:12:26.543Z',
    },
    twoFa: false,
    twoFaDate: {
      $date: '2025-04-24T11:06:22.129Z',
    },
    phone: '+79538030316',
    banned: false,
    firstName: 'Boris',
    id: '7755065690',
    lastName: 'Agapov',
    messageCount: 0,
    username: 'documents_in_Ukraine_2506',
    personalChannelDate: {
      $date: '2025-04-24T11:07:23.875Z',
    },
    personalChannelError: 'CHANNEL_NOT_FOUND',
    lazyCheckDate: {
      $date: '2025-04-24T11:11:28.364Z',
    },
    automaticCheckDate: {
      $date: '2025-04-24T11:11:28.901Z',
    },
    historySpamBlocks: [
      {
        spamBlockDate: 'INFINITY',
        spamBlockDays: 0,
      },
    ],
    spamBlockDate: 'INFINITY',
    spamBlockDays: 0,
    spamBlockInitDate: {
      $date: '2025-04-24T11:12:26.543Z',
    },
  },
  {
    _id: {
      $oid: '680a147e461801f5999848c9',
    },
    accountId: '6239700861-prefix-ukraine-documents',
    dc4: '39af8a421401620c7b5ab946abfea1162431fc12b765b94ba6e9c54482f51dc70ac0a37194ed8e50f1fd2ba4e5388e63254876a4a2e03f993c304ea185253327e88f021391c7face9cc47efce6b0754d34def3502d81af82e992675268bd5954aa9844170ec7568caa8387577698b25d86d75590a23b05cfc9c846e89264511757ccedd16eaa263a899e51aef24a651e753a56eea3b7e90c796fbd9f682dacb8c40c343df7b6838a50f59bf3ae5bb2bcd83c4226486191c8a47f7c0cb3c04fe88f960f5e63fb208698ebe2364f0dbbf912058e6b6350789590916b355236bbf61bc9d83d4abad5a17d9484cf212713065f814a1d0235dbbe78a7efe7c6e8b0ac',
    dcId: 4,
    nextApiId: 2040,
    dateUpdated: {
      $date: '2025-04-24T11:07:20.125Z',
    },
    twoFa: false,
    twoFaDate: {
      $date: '2025-04-24T10:58:29.216Z',
    },
    phone: '+23057338083',
    banned: false,
    firstName: 'Ivan',
    id: '6239700861',
    lastName: 'Potapov',
    messageCount: 0,
    personalChannelDate: {
      $date: '2025-04-24T10:58:46.621Z',
    },
    personalChannelError: 'CHANNEL_NOT_FOUND',
    username: 'documents_in_Ukraine_9616',
  },
];

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
        accountId: id,
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
