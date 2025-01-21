import { invokeRequest } from '../../modules/invokeRequest';
import TelegramClient from '../../common/gramjs/client/TelegramClient';
import GramJs from '../../common/gramjs/tl/api';

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
