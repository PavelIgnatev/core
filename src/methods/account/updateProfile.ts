import GramJs from '../../common/gramjs/tl/api';

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
  const newProfile = {
    firstName: firstName || '',
    lastName: lastName || '',
    about: about || '',
  };

  return client.invoke(new GramJs.account.UpdateProfile(newProfile));
};
