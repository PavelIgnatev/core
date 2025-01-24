import TelegramClient from '../../../gramjs/client/TelegramClient';
import GramJs from '../../../gramjs/tl/api';
import { invokeRequest } from '../../modules/invokeRequest';

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
