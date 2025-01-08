import { invokeRequest } from '../../common/gramjs';
import TelegramClient from '../../common/gramjs/client/TelegramClient';
import GramJs from '../../common/gramjs/tl/api';

export const updateProfile = (
  client: TelegramClient,
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

  return invokeRequest(client, new GramJs.account.UpdateProfile(newProfile));
};
