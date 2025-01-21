import BigInt from 'big-integer';

import { invokeRequest } from '../../modules/invokeRequest';
import TelegramClient from '../../common/gramjs/client/TelegramClient';
import GramJs from '../../common/gramjs/tl/api';

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
