import BigInt from "big-integer";

import { Account } from "../@types/Account";

import GramJs from "../telegram/tl/api";

import { updateProfile } from "../methods/profile/updateProfile";
import { generateUser } from "../helpers/generateUser";
import { getProfileFiles } from "../methods/files/getProfileFiles";

import { updateAiAccount } from "../methods/accounts/updateAiAccount";
import { uploadFile } from "../telegram/client/uploadFile";

export const accountSetup = async (client: any, account: Account) => {
  if (account.setuped) {
    console.log("ACCOUNT SETUP: account is fully packaged and ready to go");
    return;
  }

  let user;

  while (true) {
    try {
      const genUser = generateUser();
      const { firstName, lastName, username } = genUser;
      console.log(
        `Generated data to populate profile: ${JSON.stringify(genUser)}`
      );

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

  await updateAiAccount(account.accountId, {
    ...user,
    setuped: true,
    messageCount: 0,
    banned: false,
    lastProcessedBy: new Date(),
  });

  console.log("ACCOUNT SETUP: account is fully packaged and ready to go");
};
