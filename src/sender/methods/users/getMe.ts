import TelegramClient from '../../../gramjs/client/TelegramClient';
import GramJs from '../../../gramjs/tl/api';
import { Account } from '../../@types/Account';
import { updateAccountById } from '../../db/accounts';
import { invokeRequest } from '../../modules/invokeRequest';

export const getMe = async (client: TelegramClient, account: Account) => {
  const { accountId, id } = account;

  const me = await invokeRequest(
    client,
    new GramJs.users.GetFullUser({
      id: new GramJs.InputUserSelf(),
    })
  );

  if (!me || me.users[0] instanceof GramJs.UserEmpty) {
    throw new Error('GET_ME_ERROR');
  }

  return {
    me: me.users[0],
    id: String(me.fullUser.id),
  };
};
