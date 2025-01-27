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

  console.log({ accountId, message: '[GET_ME]', payload: me });

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
