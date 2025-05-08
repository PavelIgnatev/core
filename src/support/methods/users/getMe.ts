import TelegramClient from '../../../gramjs/client/TelegramClient';
import GramJs from '../../../gramjs/tl/api';
import { updateAccountById } from '../../db/accounts';
import { invokeRequest } from '../../modules/invokeRequest';

export const getMe = async (client: TelegramClient, accountId: string) => {
  const appConfig = await invokeRequest(
    client,
    new GramJs.help.GetAppConfig({})
  );

  if (
    !appConfig ||
    appConfig instanceof GramJs.help.AppConfigNotModified ||
    appConfig.config instanceof GramJs.JsonNull
  ) {
    throw new Error('APP_CONFIG_NOT_DEFINED');
  }

  const {
    config: { value },
  } = appConfig;

  const isFrozen = Boolean(
    value.find((k: any) => ({ ...k }).key === 'freeze_until_date')
  );

  if (isFrozen) {
    throw new Error('ACCOUNT_FROZEN');
  }

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
