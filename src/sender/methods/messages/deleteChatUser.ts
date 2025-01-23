import BigInt from 'big-integer';

import TelegramClient from '../../../gramjs/client/TelegramClient';
import GramJs from '../../../gramjs/tl/api';
import { invokeRequest } from '../../modules/invokeRequest';

export const deleteChatUser = async (
  client: TelegramClient,
  chatId: string,
  userId: GramJs.TypeInputUser
) => {
  await invokeRequest(
    client,
    new GramJs.messages.DeleteChatUser({
      chatId: BigInt(chatId),
      userId,
    })
  );
};
