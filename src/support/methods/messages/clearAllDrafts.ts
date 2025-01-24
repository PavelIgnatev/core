import TelegramClient from '../../../gramjs/client/TelegramClient';
import GramJs from '../../../gramjs/tl/api';
import { invokeRequest } from '../../modules/invokeRequest';

export const clearAllDrafts = async (client: TelegramClient) => {
  await invokeRequest(client, new GramJs.messages.ClearAllDrafts());
};
