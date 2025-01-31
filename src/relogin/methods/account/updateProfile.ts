import TelegramClient from '../../../gramjs/client/TelegramClient';
import GramJs from '../../../gramjs/tl/api';
import { invokeRequest } from '../../modules/invokeRequest';

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
