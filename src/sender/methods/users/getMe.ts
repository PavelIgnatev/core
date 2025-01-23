import TelegramClient from '../../../gramjs/client/TelegramClient';
import GramJs from '../../../gramjs/tl/api';
import { invokeRequest } from '../../modules/invokeRequest';
import { updateAccountById } from '../../db/accounts';

export const getMe = async (
  client: TelegramClient,
  accountId: string,
  tgAccountId?: string
) => {
  if (!tgAccountId) {
    const me = await invokeRequest(
      client,
      new GramJs.users.GetFullUser({
        id: new GramJs.InputUserSelf(),
      })
    );

    if (!me) {
      throw new Error('GET_ME_ERROR');
    }

    await updateAccountById(accountId, {
      id: String(me.fullUser.id),
    });

    return String(me.fullUser.id);
  }

  return tgAccountId;
};
