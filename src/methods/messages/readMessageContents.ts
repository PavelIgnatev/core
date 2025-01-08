import { invokeRequest } from '../../common/gramjs';
import TelegramClient from '../../common/gramjs/client/TelegramClient';
import GramJs from '../../common/gramjs/tl/api';

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
