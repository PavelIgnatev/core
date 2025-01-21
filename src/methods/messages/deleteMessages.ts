import { invokeRequest } from '../../modules/invokeRequest';
import TelegramClient from '../../common/gramjs/client/TelegramClient';
import GramJs from '../../common/gramjs/tl/api';

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
