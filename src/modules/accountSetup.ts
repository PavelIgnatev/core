import BigInt from 'big-integer';

import GramJs from '../common/gramjs/tl/api';

import { uploadFile } from '../common/gramjs/client/uploadFile';
import { updateAccountById } from '../db/accounts';
import { generateRandomString } from '../helpers/generateRandomString';
import { generateUser } from '../helpers/generateUser';
import { getProfileFiles } from '../helpers/getProfileFiles';
import { sleep } from '../helpers/sleep';
import { updateProfile } from '../methods/account/updateProfile';
import { sendToBot } from '../helpers/sendToBot';
import { invokeRequest } from '../common/gramjs';

const emojis = [
  '🌎',
  '🌍',
  '🌏',
  '🪐',
  '♻️',
  '🌿',
  '🧩',
  '☘️',
  '🍀',
  '🦕',
  '🍃',
  '🧳',
  '💼',
  '🚀',
  '🌊',
  '📌',
  '🎯',
  '👋',
  '🤝',
  '👨‍💻',
  '🌳',
  '🐢',
  '🦖',
  '🌵',
  '🌀',
  '⛰️',
  '🍁',
  '🍂',
  '🦔',
  '🥑',
  '🏆',
  '🐌',
  '🧬',
  '🐊',
  '🌔',
];

const settings = {
  muteUntil: 2147483647,
  showPreviews: false,
  silent: true,
};

const defaultDialogFilter = {
  contacts: undefined,
  bots: undefined,
  broadcasts: undefined,
  emoticon: undefined,
  excludeArchived: undefined,
  excludeMuted: undefined,
  excludeRead: undefined,
  groups: undefined,
  nonContacts: undefined,
  includePeers: [],
  excludePeers: [],
  pinnedPeers: [],
};

export const accountSetup = async (
  client: any,
  accountId: string,
  setupped: boolean,
  firstName?: string
) => {
  // if (setupped) {
  //   return firstName as string;
  // }

  const contacts = await invokeRequest(
    client,
    new GramJs.contacts.GetContacts({ hash: BigInt('0') })
  );

  if (!contacts || contacts instanceof GramJs.contacts.ContactsNotModified) {
    await sendToBot(`** ACCOUNT SETUP: GET CONTACTS ERROR **
ID: ${accountId}
CONTACTS: ${Boolean(contacts)}
NOT_MODIFIED: ${contacts instanceof GramJs.contacts.ContactsNotModified}`);
    throw new Error('GLOBAL_ERROR');
  }

  const users = contacts.users.map(
    (user: any) =>
      new GramJs.InputPeerUser({
        userId: BigInt(user.id),
        accessHash: BigInt(user.accessHash),
      })
  );

  if (users.length > 0) {
    const isDC = await invokeRequest(
      client,
      new GramJs.contacts.DeleteContacts({ id: users })
    );

    if (!isDC) {
      await sendToBot(`** ACCOUNT SETUP: DELETED CONTACTS ERROR **
ID: ${accountId}
USERS: ${JSON.stringify(contacts.users.map((user: any) => ({ id: user.id, accessHash: user.accessHash })))}`);
      throw new Error('GLOBAL_ERROR');
    }
  }

  const isNC = await invokeRequest(
    client,
    new GramJs.account.UpdateNotifySettings({
      peer: new GramJs.InputNotifyChats(),
      settings: new GramJs.InputPeerNotifySettings(settings),
    })
  );
  const isNB = await invokeRequest(
    client,
    new GramJs.account.UpdateNotifySettings({
      peer: new GramJs.InputNotifyBroadcasts(),
      settings: new GramJs.InputPeerNotifySettings(settings),
    })
  );
  const isNU = await invokeRequest(
    client,
    new GramJs.account.UpdateNotifySettings({
      peer: new GramJs.InputNotifyUsers(),
      settings: new GramJs.InputPeerNotifySettings(settings),
    })
  );

  if (!isNC || !isNB || !isNU) {
    await sendToBot(`** ACCOUNT SETUP: UPDATE NOTIFY SETTINGS ERROR **
ID: ${accountId}
CHATS: ${isNC}
BROADCASTS: ${isNB}
USERS: ${isNU}`);
    throw new Error('GLOBAL_ERROR');
  }

  const isSN = await invokeRequest(
    client,
    new GramJs.account.SetContactSignUpNotification({ silent: true })
  );
  if (!isSN) {
    await sendToBot(`** ACCOUNT SETUP: SIGN UP NOTIFICATION ERROR **
ID: ${accountId}`);
    throw new Error('GLOBAL_ERROR');
  }

  const isCS = await invokeRequest(
    client,
    new GramJs.account.SetContentSettings({
      sensitiveEnabled: true,
    })
  );
  if (!isCS) {
    await sendToBot(`** ACCOUNT SETUP: CONTENT SETTINGS ERROR **
ID: ${accountId}`);
    throw new Error('GLOBAL_ERROR');
  }

  const dialogFilters = await invokeRequest(
    client,
    new GramJs.messages.GetDialogFilters()
  );

  if (!dialogFilters) {
    await sendToBot(`** ACCOUNT SETUP: GET DIALOG FILTERS ERROR **
ID: ${accountId}
CONTACTS: ${Boolean(contacts)}
NOT_MODIFIED: ${contacts instanceof GramJs.contacts.ContactsNotModified}`);
    throw new Error('GLOBAL_ERROR');
  }

  for (const filter of dialogFilters.filters) {
    if (filter instanceof GramJs.DialogFilterDefault) {
      continue;
    }

    const isDeleted = await invokeRequest(
      client,
      new GramJs.messages.UpdateDialogFilter({
        id: filter.id,
        filter: undefined,
      })
    );

    if (!isDeleted) {
      await sendToBot(`** ACCOUNT SETUP: DELETE DIALOG FILTER ERROR **
ID: ${accountId}
FID: ${filter.id}`);
      throw new Error('GLOBAL_ERROR');
    }
  }

  const isC = await invokeRequest(
    client,
    new GramJs.messages.UpdateDialogFilter({
      id: 2,
      filter: new GramJs.DialogFilter({
        ...defaultDialogFilter,
        id: 2,
        contacts: true,
        title: 'Main',
      }),
    })
  );
  const isBO = await invokeRequest(
    client,
    new GramJs.messages.UpdateDialogFilter({
      id: 3,
      filter: new GramJs.DialogFilter({
        ...defaultDialogFilter,
        id: 3,
        bots: true,
        title: 'Bots',
      }),
    })
  );
  const isBR = await invokeRequest(
    client,
    new GramJs.messages.UpdateDialogFilter({
      id: 4,
      filter: new GramJs.DialogFilter({
        ...defaultDialogFilter,
        id: 4,
        broadcasts: true,
        title: 'Channels',
      }),
    })
  );
  const isG = await invokeRequest(
    client,
    new GramJs.messages.UpdateDialogFilter({
      id: 5,
      filter: new GramJs.DialogFilter({
        ...defaultDialogFilter,
        id: 5,
        groups: true,
        title: 'Groups',
      }),
    })
  );
  if (!isC || !isBO || !isBR || !isG) {
    await sendToBot(`** ACCOUNT SETUP: CREATE DIALOG FILTER ERROR **
ID: ${accountId}
BOTS: ${isBO}
GROUPS: ${isG}
CONTACTS: ${isC}
BROADCASTS: ${isBR}`);
    throw new Error('GLOBAL_ERROR');
  }

  const photos = await invokeRequest(
    client,
    new GramJs.photos.GetUserPhotos({
      userId: new GramJs.InputUserSelf(),
      limit: 40,
      offset: 0,
      maxId: BigInt('0'),
    })
  );
  if (!photos) {
    await sendToBot(`** ACCOUNT SETUP: GET USER PHOTOS ERROR **
ID: ${accountId}`);
    throw new Error('GLOBAL_ERROR');
  }

  const isPKA = await invokeRequest(
    client,
    new GramJs.account.SetPrivacy({
      key: new GramJs.InputPrivacyKeyAbout(),
      rules: [new GramJs.InputPrivacyValueAllowAll()],
    })
  );

  const isPKS = await invokeRequest(
    client,
    new GramJs.account.SetPrivacy({
      key: new GramJs.InputPrivacyKeyStatusTimestamp(),
      rules: [new GramJs.InputPrivacyValueAllowAll()],
    })
  );

  const isPKPR = await invokeRequest(
    client,
    new GramJs.account.SetPrivacy({
      key: new GramJs.InputPrivacyKeyProfilePhoto(),
      rules: [new GramJs.InputPrivacyValueAllowAll()],
    })
  );

  const isPKPH = await invokeRequest(
    client,
    new GramJs.account.SetPrivacy({
      key: new GramJs.InputPrivacyKeyPhoneNumber(),
      rules: [new GramJs.InputPrivacyValueDisallowAll()],
    })
  );

  const isPKPH2P2 = await invokeRequest(
    client,
    new GramJs.account.SetPrivacy({
      key: new GramJs.InputPrivacyKeyPhoneP2P(),
      rules: [new GramJs.InputPrivacyValueDisallowAll()],
    })
  );

  const isPKC = await invokeRequest(
    client,
    new GramJs.account.SetPrivacy({
      key: new GramJs.InputPrivacyKeyChatInvite(),
      rules: [new GramJs.InputPrivacyValueDisallowAll()],
    })
  );

  const isPKF = await invokeRequest(
    client,
    new GramJs.account.SetPrivacy({
      key: new GramJs.InputPrivacyKeyForwards(),
      rules: [new GramJs.InputPrivacyValueDisallowAll()],
    })
  );

  const isPKPHC = await invokeRequest(
    client,
    new GramJs.account.SetPrivacy({
      key: new GramJs.InputPrivacyKeyPhoneCall(),
      rules: [new GramJs.InputPrivacyValueDisallowAll()],
    })
  );

  if (
    !isPKA ||
    !isPKS ||
    !isPKPR ||
    !isPKPH ||
    !isPKPH2P2 ||
    !isPKC ||
    !isPKF ||
    !isPKPHC
  ) {
    await sendToBot(`** ACCOUNT SETUP: SET PRIVACY ERROR **
ID: ${accountId}
ABOUT: ${isPKA}
STATUS: ${isPKS}
PROFILE_PHOTO: ${isPKPR}
PHONE_NUMBER: ${isPKPH}
PHONE_P2P: ${isPKPH2P2}
CHAT_INVITE: ${isPKC}
FORWARDS: ${isPKF}
PHONE_CALL: ${isPKPHC}`);
    throw new Error('GLOBAL_ERROR');
  }

  //   const photoIds = [];
  //   for (const photo of photos.photos) {
  //     if (photo instanceof GramJs.PhotoEmpty) {
  //       continue;
  //     }

  //     photoIds.push(
  //       new GramJs.InputPhoto({
  //         id: photo.id,
  //         accessHash: photo.accessHash,
  //         fileReference: Buffer.alloc(0),
  //       })
  //     );
  //   }

  //   if (photoIds.length) {
  //     await invokeRequest(
  //       client,
  //       new GramJs.photos.DeletePhotos({
  //         id: photoIds,
  //       })
  //     );
  //   }

  //   const files = getProfileFiles();

  //   for (const file of files) {
  //     const isUF = await invokeRequest(
  //       client,
  //       new GramJs.photos.UploadProfilePhoto({
  //         file: await uploadFile(client, file),
  //       })
  //     );

  //     if (!isUF) {
  //       await sendToBot(`** ACCOUNT SETUP: UPLOAD PROFILE PHOTO ERROR **
  // ID: ${accountId}
  // FILE_NAME: ${file.name}`);
  //       throw new Error('GLOBAL_ERROR');
  //     }
  //   }

  //   let user;
  //   while (true) {
  //     try {
  //       const genUser = generateUser();
  //       const {
  //         firstName: genFirstName,
  //         lastName,
  //         username,
  //         randomElseUsername,
  //       } = genUser;

  //       await invokeRequest(
  //         client,
  //         new GramJs.account.UpdateUsername({
  //           username,
  //         })
  //       );

  //       await updateProfile(client, {
  //         firstName: genFirstName,
  //         lastName: `${lastName} ${emojis[Math.floor(Math.random() * emojis.length)]}`,
  //         about: generateRandomString(`{tw|inst|fb}: @${randomElseUsername}`),
  //       });

  //       user = genUser;

  //       break;
  //     } catch (error: any) {
  //       console.error({
  //         accountId,
  //         message: new Error(`Error when updating user data: ${error.message}`),
  //       });

  //       await sleep(3000);
  //     }
  //   }

  // const { randomElseUsername, ...fullUser } = user;

  // await updateAccountById(accountId, {
  //   ...fullUser,
  //   setuped: true,
  //   banned: false,
  //   messageCount: 0,
  // });

  return firstName as string;
};
