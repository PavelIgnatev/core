import { invokeRequest } from '../../modules/invokeRequest';
import TelegramClient from '../../common/gramjs/client/TelegramClient';
import GramJs from '../../common/gramjs/tl/api';

export const updateStatus = async (
  client: TelegramClient,
  offline: boolean
) => {
  const result = await invokeRequest(
    client,
    new GramJs.account.UpdateStatus({
      offline,
    })
  );

  return result;
};
