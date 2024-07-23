import GramJs from "../../common/gramjs/tl/api";

export const updateProfile = (
  client: any,
  accountId: string,
  {
    firstName,
    lastName,
    about,
  }: {
    firstName?: string;
    lastName?: string;
    about?: string;
  }
) => {
  const newProfile = {
    firstName: firstName || "",
    lastName: lastName || "",
    about: about || "",
  };
  console.log(`[${accountId}] Update me, new profile data:`, newProfile);

  return client.invoke(new GramJs.account.UpdateProfile(newProfile));
};
