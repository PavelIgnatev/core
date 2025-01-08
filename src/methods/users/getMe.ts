import { invokeRequest } from '../../common/gramjs';
import TelegramClient from '../../common/gramjs/client/TelegramClient';
import GramJs from '../../common/gramjs/tl/api';
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
