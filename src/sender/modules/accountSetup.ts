import BigInt from 'big-integer';

import TelegramClient from '../../gramjs/client/TelegramClient';
import { uploadFile } from '../../gramjs/client/uploadFile';
import GramJs from '../../gramjs/tl/api';
import { Account } from '../@types/Account';
import { updateAccountById } from '../db/accounts';
import { generateRandomString } from '../helpers/generateRandomString';
import { generateUser } from '../helpers/generateUser';
import { getProfileFiles } from '../helpers/getProfileFiles';
import { sleep } from '../helpers/helpers';
import { sendToMainBot } from '../helpers/sendToMainBot';
import { updateProfile } from '../methods/account/updateProfile';
import { getMe } from '../methods/users/getMe';
import { invokeRequest } from './invokeRequest';

const settings = {
  muteUntil: 2147483647,
  showPreviews: false,
  silent: true,
};

const adultEmojis = ['❤️', '💖'];
const defaultEmojis = [
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

export const accountSetup = async (
  client: TelegramClient,
  account: Account
) => {
  const {
    accountId,
    id,
    firstName,
    lastName,
    username,
    messageCount = 0,
  } = account;

  const { me, id: meId } = await getMe(client, account);

  if (
    id &&
    me.username === username &&
    me.firstName === firstName &&
    (!lastName ? true : me.lastName?.split(' ')[0] === lastName)
  ) {
    return [firstName!, meId];
  }

  const dialogFilters = await invokeRequest(
    client,
    new GramJs.messages.GetDialogFilters()
  );

  for (const filter of dialogFilters?.filters || []) {
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
      await sendToMainBot(`** ACCOUNT SETUP: DELETE DIALOG FILTER ERROR **
ID: ${accountId}
FID: ${filter.id}`);
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
    await sendToMainBot(`** ACCOUNT SETUP: UPDATE NOTIFY SETTINGS ERROR **
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
    await sendToMainBot(`** ACCOUNT SETUP: SIGN UP NOTIFICATION ERROR **
ID: ${accountId}`);
    throw new Error('GLOBAL_ERROR');
  }

  await invokeRequest(
    client,
    new GramJs.account.SetPrivacy({
      key: new GramJs.InputPrivacyKeyAbout(),
      rules: [new GramJs.InputPrivacyValueAllowAll()],
    })
  );

  await invokeRequest(
    client,
    new GramJs.account.SetPrivacy({
      key: new GramJs.InputPrivacyKeyStatusTimestamp(),
      rules: [new GramJs.InputPrivacyValueAllowAll()],
    })
  );

  await invokeRequest(
    client,
    new GramJs.account.SetPrivacy({
      key: new GramJs.InputPrivacyKeyProfilePhoto(),
      rules: [new GramJs.InputPrivacyValueAllowAll()],
    })
  );

  await invokeRequest(
    client,
    new GramJs.account.SetPrivacy({
      key: new GramJs.InputPrivacyKeyPhoneNumber(),
      rules: [new GramJs.InputPrivacyValueDisallowAll()],
    })
  );

  await invokeRequest(
    client,
    new GramJs.account.SetPrivacy({
      key: new GramJs.InputPrivacyKeyPhoneP2P(),
      rules: [new GramJs.InputPrivacyValueDisallowAll()],
    })
  );

  await invokeRequest(
    client,
    new GramJs.account.SetPrivacy({
      key: new GramJs.InputPrivacyKeyChatInvite(),
      rules: [new GramJs.InputPrivacyValueDisallowAll()],
    })
  );

  await invokeRequest(
    client,
    new GramJs.account.SetPrivacy({
      key: new GramJs.InputPrivacyKeyForwards(),
      rules: [new GramJs.InputPrivacyValueDisallowAll()],
    })
  );

  await invokeRequest(
    client,
    new GramJs.account.SetPrivacy({
      key: new GramJs.InputPrivacyKeyPhoneCall(),
      rules: [new GramJs.InputPrivacyValueDisallowAll()],
    })
  );

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
    await sendToMainBot(`** ACCOUNT SETUP: GET USER PHOTOS ERROR **
ID: ${accountId}`);
    throw new Error('GLOBAL_ERROR');
  }
  const photoIds = [];
  for (const photo of photos.photos) {
    if (photo instanceof GramJs.PhotoEmpty) {
      continue;
    }

    photoIds.push(
      new GramJs.InputPhoto({
        id: photo.id,
        accessHash: photo.accessHash,
        fileReference: Buffer.alloc(0),
      })
    );
  }

  if (photoIds.length) {
    await invokeRequest(
      client,
      new GramJs.photos.DeletePhotos({
        id: photoIds,
      })
    );
  }

  const gender = accountId.includes('female') ? 'female' : 'male';
  const isAdult = accountId.includes('adult');
  const isVasilisa = accountId.includes('vasilisa');
  const isCasino = accountId.includes('casino');
  const isOnlik = accountId.includes('onlik');

  const files = await getProfileFiles(
    isAdult
      ? 'adult'
      : isVasilisa
        ? 'vasilisa'
        : isCasino
          ? 'casino'
          : isOnlik
            ? 'onlik'
            : gender
  );
  for (const file of files) {
    const isUF = await invokeRequest(
      client,
      new GramJs.photos.UploadProfilePhoto({
        file: await uploadFile(client, file),
      })
    );

    if (!isUF) {
      await sendToMainBot(`** ACCOUNT SETUP: UPLOAD PROFILE PHOTO ERROR **
ID: ${accountId}
FILE_NAME: ${file.name}`);
      throw new Error('GLOBAL_ERROR');
    }
  }

  let user;
  while (true) {
    try {
      if (accountId.includes('adult')) {
        const username = `magicblow${Math.floor(Math.random() * 10000)}`;
        await invokeRequest(
          client,
          new GramJs.account.UpdateUsername({
            username,
          })
        );

        await updateProfile(client, {
          firstName: 'Александра',
          lastName: `${adultEmojis[Math.floor(Math.random() * adultEmojis.length)]}`,
          about: '',
        });

        user = {
          firstName: 'Александра',
          lastName: '',
          username,
          randomElseUsername: '',
        };
      } else if (accountId.includes('vasilisa')) {
        const username = `iamvasilisa${Math.floor(Math.random() * 10000)}`;
        await invokeRequest(
          client,
          new GramJs.account.UpdateUsername({
            username,
          })
        );

        await updateProfile(client, {
          firstName: 'Василиса',
          lastName: `${adultEmojis[Math.floor(Math.random() * adultEmojis.length)]}`,
          about: '',
        });

        user = {
          firstName: 'Василиса',
          lastName: '',
          username,
          randomElseUsername: '',
        };
      } else if (accountId.includes('onlik')) {
        const username = `anastangle${Math.floor(Math.random() * 10000)}`;
        await invokeRequest(
          client,
          new GramJs.account.UpdateUsername({
            username,
          })
        );

        await updateProfile(client, {
          firstName: 'Anastangle',
          lastName: `${adultEmojis[Math.floor(Math.random() * adultEmojis.length)]}`,
          about: '',
        });

        user = {
          firstName: 'Anastangle',
          lastName: '',
          username,
          randomElseUsername: '',
        };
      } else {
        const genUser = generateUser(gender);
        const {
          firstName: genFirstName,
          lastName,
          username,
          randomElseUsername,
        } = genUser;

        await invokeRequest(
          client,
          new GramJs.account.UpdateUsername({
            username,
          })
        );

        await updateProfile(client, {
          firstName: genFirstName,
          lastName: `${lastName} ${defaultEmojis[Math.floor(Math.random() * defaultEmojis.length)]}`,
          about: generateRandomString(`{tw|inst|fb}: @${randomElseUsername}`),
        });
        user = genUser;
      }

      break;
    } catch (error: any) {
      await sleep(3000);
    }
  }

  const { randomElseUsername, ...fullUser } = user;

  await updateAccountById(accountId, {
    ...fullUser,
    id: meId,
    banned: false,
    messageCount: messageCount || 0,
  });

  return [fullUser.firstName, meId];
};
