import BigInt from "big-integer";

import { Account } from "../@types/Account";

import GramJs from "../telegram/tl/api";

import { updateProfile } from "../methods/profile/updateProfile";
import { generateUser } from "../helpers/generateUser";
import { getProfileFile } from "../methods/files/getProfileFile";

import { invokeRequest, uploadFile } from "../telegram";
import { updateAiAccount } from "../methods/accounts/updateAiAccount";

export const accountSetup = async (account: Account) => {
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

      await invokeRequest(
        new GramJs.account.UpdateUsername({
          username,
        })
      );

      await updateProfile({
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

  const { photos: profilePhotos } = await invokeRequest(
    new GramJs.photos.GetUserPhotos({
      userId: new GramJs.InputUserSelf(),
      limit: 40,
      offset: 0,
      maxId: BigInt("0"),
    })
  );

  if (profilePhotos.length) {
    await invokeRequest(
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

  await invokeRequest(
    new GramJs.photos.UploadProfilePhoto({
      file: await uploadFile(getProfileFile()),
    })
  );

  await invokeRequest(
    new GramJs.account.SetPrivacy({
      key: new GramJs.InputPrivacyKeyStatusTimestamp(),
      rules: [new GramJs.InputPrivacyValueAllowAll()],
    })
  );

  await invokeRequest(
    new GramJs.account.SetPrivacy({
      key: new GramJs.InputPrivacyKeyProfilePhoto(),
      rules: [new GramJs.InputPrivacyValueAllowAll()],
    })
  );

  await invokeRequest(
    new GramJs.account.SetPrivacy({
      key: new GramJs.InputPrivacyKeyPhoneNumber(),
      rules: [new GramJs.InputPrivacyValueAllowAll()],
    })
  );

  await invokeRequest(
    new GramJs.account.SetPrivacy({
      key: new GramJs.InputPrivacyKeyChatInvite(),
      rules: [new GramJs.InputPrivacyValueDisallowAll()],
    })
  );

  await invokeRequest(
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
    lastProcessedBy: String(new Date()),
    remainingTime: String(new Date()),
  });

  console.log("ACCOUNT SETUP: account is fully packaged and ready to go");
};
