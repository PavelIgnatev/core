import TelegramClient from '../../../gramjs/client/TelegramClient';
import GramJs from '../../../gramjs/tl/api';
import { updateAccountById } from '../../db/accounts';
import { invokeRequest } from '../../modules/invokeRequest';

export const getMe = async (client: TelegramClient, accountId: string) => {
  const me = await invokeRequest(
    client,
    new GramJs.users.GetFullUser({
      id: new GramJs.InputUserSelf(),
    })
  );

  if (!me || me.users[0] instanceof GramJs.UserEmpty || !me.users[0].phone) {
    throw new Error('GET_ME_ERROR');
  }

  await updateAccountById(accountId, {
    id: String(me.fullUser.id),
    phone: me.users[0].phone,
  });

  return {
    me: me.users[0],
    id: String(me.fullUser.id),
    phone: me.users[0].phone,
  };
};

export const getMeFromUsers = async (
  client: TelegramClient,
  accountId: string
) => {
  const users = await invokeRequest(
    client,
    new GramJs.users.GetUsers({
      id: [new GramJs.InputUserSelf()],
    })
  );

  const me = users && Array.isArray(users) ? users[0] : undefined;
  if (!me || me instanceof GramJs.UserEmpty || !me.phone) {
    throw new Error('GET_ME_ERROR');
  }

  await updateAccountById(accountId, {
    id: String(me.id),
    phone: me.phone,
  });

  return {
    me,
    id: String(me.id),
    phone: me.phone,
  };
};
