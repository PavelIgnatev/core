import TelegramClient from '../../../gramjs/client/TelegramClient';
import GramJs from '../../../gramjs/tl/api';
import { invokeRequest } from '../../modules/invokeRequest';

export const deleteMessages = async (
  client: TelegramClient,
  messageIds: number[],
  revoke: true | undefined
) => {
  await invokeRequest(
    client,
    new GramJs.messages.DeleteMessages({
      id: messageIds,
      revoke,
    })
  );
};
