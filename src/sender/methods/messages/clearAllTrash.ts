import TelegramClient from '../../../gramjs/client/TelegramClient';
import GramJs from '../../../gramjs/tl/api';
import { invokeRequest } from '../../modules/invokeRequest';

export const clearAllTrash = async (client: TelegramClient) => {
  await invokeRequest(client, new GramJs.messages.ClearAllDrafts());

  await invokeRequest(client, new GramJs.account.ResetWebAuthorizations());

  await invokeRequest(
    client,
    new GramJs.messages.SetDefaultHistoryTTL({ period: 0 })
  );
};
