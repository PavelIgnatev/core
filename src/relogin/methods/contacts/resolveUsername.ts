import TelegramClient from '../../../gramjs/client/TelegramClient';
import GramJs from '../../../gramjs/tl/api';
import { invokeRequest } from '../../modules/invokeRequest';

export const resolveUsername = async (
  client: TelegramClient,
  username: string
) => {
  const userByUsername = await invokeRequest(
    client,
    new GramJs.contacts.ResolveUsername({
      username,
    }),
    { shouldIgnoreErrors: true }
  );

  return userByUsername;
};
