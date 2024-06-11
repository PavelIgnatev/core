import BigInt from "big-integer";

import GramJs from "../gramjs/tl/api";
import { uploadFile } from "../gramjs/client/uploadFile";

import { generateUser } from "../helpers/generateUser";

import { updateProfile } from "../methods/profile/updateProfile";
import { getProfileFiles } from "../methods/files/getProfileFiles";
import { updateAiAccount } from "../methods/accounts/updateAiAccount";

export const accountSetup = async (
  client: any,
  accountId: string,
  setupped: boolean
) => {
  if (setupped) {
    return;
  }

  let user;

  while (true) {
    try {
      const genUser = generateUser();
      const { firstName, lastName, username } = genUser;

      await client.invoke(
        new GramJs.account.UpdateUsername({
          username,
        })
      );

      await updateProfile(client, {
        firstName,
        lastName,
        about: "",
      });

      user = genUser;

      break;
    } catch (error: any) {
      console.log(`Error when updating user data: ${error.message}`);
    }
  }

  const { photos: profilePhotos } = await client.invoke(
    new GramJs.photos.GetUserPhotos({
      userId: new GramJs.InputUserSelf(),
      limit: 40,
      offset: 0,
      maxId: BigInt("0"),
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
      rules: [new GramJs.InputPrivacyValueAllowAll()],
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
      key: new GramJs.InputPrivacyKeyPhoneCall(),
      rules: [new GramJs.InputPrivacyValueDisallowAll()],
    })
  );

  await updateAiAccount(accountId, {
    ...user,
    setuped: true,
    banned: false,
    messageCount: 0,
    lastProcessedBy: new Date(),
  });
};
