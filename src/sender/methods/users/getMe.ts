import TelegramClient from '../../../gramjs/client/TelegramClient';
import GramJs from '../../../gramjs/tl/api';
import { invokeRequest } from '../../modules/invokeRequest';

export const getMe = async (client: TelegramClient) => {
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

  if (!me || me.users[0] instanceof GramJs.UserEmpty) {
    throw new Error('GET_ME_ERROR');
  }

  return {
    me: me.users[0],
    fullMe: me.fullUser,
    id: String(me.fullUser.id),
  };
};
