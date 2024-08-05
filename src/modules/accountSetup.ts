import BigInt from 'big-integer';
import { red, yellow } from 'colors/safe';

import { uploadFile } from '../common/gramjs/client/uploadFile';
import GramJs from '../common/gramjs/tl/api';
import { updateAccountById } from '../db/accounts';
import { generateRandomString } from '../helpers/generateRandomString';
import { generateUser } from '../helpers/generateUser';
import { getProfileFiles } from '../helpers/getProfileFiles';
import { sleep } from '../helpers/sleep';
import { updateProfile } from '../methods/account/updateProfile';

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
  client: any,
  accountId: string,
  setupped: boolean,
  firstName?: string
) => {
  if (setupped) {
    return firstName as string;
  }

  console.log(`[${accountId}] Initialize module`, yellow('ACCOUNT SETUP'));

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

      await client.invoke(
        new GramJs.account.UpdateUsername({
          username,
        })
      );

      await updateProfile(client, accountId, {
        firstName: genFirstName,
        lastName: `${lastName} ${emojis[Math.floor(Math.random() * emojis.length)]}`,
        about: generateRandomString(`{tw|inst|fb}: @${randomElseUsername}`),
      });

      user = genUser;

      break;
    } catch (error: any) {
      console.log(
        red(`[${accountId}] Error when updating user data: ${error.message}`)
      );

      await sleep(3000);
    }
  }
  const { photos: profilePhotos } = await client.invoke(
    new GramJs.photos.GetUserPhotos({
      userId: new GramJs.InputUserSelf(),
      limit: 40,
      offset: 0,
      maxId: BigInt('0'),
    })
  );

  if (profilePhotos.length) {
    await client.invoke(
      new GramJs.photos.DeletePhotos({
        id: profilePhotos.map(
          (photo: GramJs.Photo) =>
            new GramJs.InputPhoto({
              id: photo.id,
              accessHash: photo.accessHash,
              fileReference: Buffer.alloc(0),
            })
        ),
      })
    );
  }

  const files = getProfileFiles();

  for (const file of files) {
    await client.invoke(
      new GramJs.photos.UploadProfilePhoto({
        file: await uploadFile(client, file),
      })
    );
  }

  await client.invoke(
    new GramJs.account.SetPrivacy({
      key: new GramJs.InputPrivacyKeyAbout(),
      rules: [new GramJs.InputPrivacyValueAllowAll()],
    })
  );

  await client.invoke(
    new GramJs.account.SetPrivacy({
      key: new GramJs.InputPrivacyKeyStatusTimestamp(),
      rules: [new GramJs.InputPrivacyValueAllowAll()],
    })
  );

  await client.invoke(
    new GramJs.account.SetPrivacy({
      key: new GramJs.InputPrivacyKeyProfilePhoto(),
      rules: [new GramJs.InputPrivacyValueAllowAll()],
    })
  );

  await client.invoke(
    new GramJs.account.SetPrivacy({
      key: new GramJs.InputPrivacyKeyPhoneNumber(),
      rules: [new GramJs.InputPrivacyValueDisallowAll()],
    })
  );

  await client.invoke(
    new GramJs.account.SetPrivacy({
      key: new GramJs.InputPrivacyKeyPhoneP2P(),
      rules: [new GramJs.InputPrivacyValueDisallowAll()],
    })
  );

  await client.invoke(
    new GramJs.account.SetPrivacy({
      key: new GramJs.InputPrivacyKeyChatInvite(),
      rules: [new GramJs.InputPrivacyValueDisallowAll()],
    })
  );

  await client.invoke(
    new GramJs.account.SetPrivacy({
      key: new GramJs.InputPrivacyKeyForwards(),
      rules: [new GramJs.InputPrivacyValueDisallowAll()],
    })
  );

  await client.invoke(
    new GramJs.account.SetPrivacy({
      key: new GramJs.InputPrivacyKeyPhoneCall(),
      rules: [new GramJs.InputPrivacyValueDisallowAll()],
    })
  );

  await updateAccountById(accountId, {
    ...user,
    setuped: true,
    banned: false,
    messageCount: 0,
    lastProcessedBy: new Date(),
  });

  return user.firstName;
};
