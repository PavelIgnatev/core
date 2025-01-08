import { invokeRequest } from '../../common/gramjs';
import TelegramClient from '../../common/gramjs/client/TelegramClient';
import GramJs from '../../common/gramjs/tl/api';

export const clearAllDrafts = async (client: TelegramClient) => {
  await invokeRequest(client, new GramJs.messages.ClearAllDrafts());
};
