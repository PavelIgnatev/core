import BigInt from 'big-integer';

import { invokeRequest } from '../common/gramjs';
import TelegramClient from '../common/gramjs/client/TelegramClient';
import { uploadFile } from '../common/gramjs/client/uploadFile';
import GramJs from '../common/gramjs/tl/api';
import { updateAccountById } from '../db/accounts';
import { generateRandomString } from '../helpers/generateRandomString';
import { generateUser } from '../helpers/generateUser';
import { getProfileFiles } from '../helpers/getProfileFiles';
import { sleep } from '../helpers/helpers';
import { sendToMainBot } from '../helpers/sendToMainBot';
import { updateProfile } from '../methods/account/updateProfile';

const settings = {
  muteUntil: 2147483647,
  showPreviews: false,
  silent: true,
};

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

export const accountSetup = async (
  client: TelegramClient,
  accountId: string,
  setuped: boolean,
  firstName?: string
) => {
  if (setuped) {
    return firstName as string;
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

  const files = getProfileFiles();

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
      const genUser = generateUser();
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
        lastName: `${lastName} ${emojis[Math.floor(Math.random() * emojis.length)]}`,
        about: generateRandomString(`{tw|inst|fb}: @${randomElseUsername}`),
      });

      user = genUser;

      break;
    } catch (error: any) {
      console.error({
        accountId,
        message: new Error(`Error when updating user data: ${error.message}`),
      });

      await sleep(3000);
    }
  }

  const { randomElseUsername, ...fullUser } = user;

  await updateAccountById(accountId, {
    ...fullUser,
    setuped: true,
    banned: false,
    messageCount: 0,
  });

  return firstName as string;
};
