import TelegramClient from '../../../gramjs/client/TelegramClient';
import GramJs from '../../../gramjs/tl/api';
import { invokeRequest } from '../../modules/invokeRequest';

export const readMessageContents = async (
  client: TelegramClient,
  id: number
) => {
  await invokeRequest(
    client,
    new GramJs.messages.ReadMessageContents({
      id: [id],
    })
  );
};
