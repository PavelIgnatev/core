import GramJs from "../../gramjs/tl/api";

export const updateProfile = (
  client: any,
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
  return client.invoke(
    new GramJs.account.UpdateProfile({
      firstName: firstName || "",
      lastName: lastName || "",
      about: about || "",
    })
  );
};
