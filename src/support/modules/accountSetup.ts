import BigInt from 'big-integer';

import TelegramClient from '../../gramjs/client/TelegramClient';
import GramJs from '../../gramjs/tl/api';
import { Account } from '../@types/Account';
import { updateAccountById } from '../db/accounts';
import { sendToMainBot } from '../helpers/sendToMainBot';
import { updateProfile } from '../methods/account/updateProfile';
import { clearAllDrafts } from '../methods/messages/clearAllDrafts';
import { getMe } from '../methods/users/getMe';
import { invokeRequest } from './invokeRequest';

const settings = {
  muteUntil: 2147483647,
  showPreviews: false,
  silent: true,
};

export const accountSetup = async (
  client: TelegramClient,
  account: Account,
  setuped: boolean
) => {
  const { accountId } = account;
  const { me } = await getMe(client, account.accountId);

  if (me.username !== undefined && me.username !== '') {
    await invokeRequest(
      client,
      new GramJs.account.UpdateUsername({
        username: '',
      })
    );
  }

  if (me.firstName !== 'Telegram') {
    await updateProfile(client, {
      firstName: 'Telegram',
    });
  }

  if (setuped) {
    return;
  }

  await clearAllDrafts(client);

  await invokeRequest(client, new GramJs.account.ResetWebAuthorizations());

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
    throw new Error('USER_PHOTOS_ERROR');
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

  await updateAccountById(accountId, {
    setuped: true,
    banned: false,
  });
};
