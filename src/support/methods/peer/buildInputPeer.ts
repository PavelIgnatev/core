import BigInt from 'big-integer';

import GramJs from '../../../gramjs/tl/api';
import { Dialog } from '../../@types/Dialog';

export function buildInputPeer(dialog: Dialog): GramJs.TypeInputPeer {
  const { type } = dialog;

  if (type === 'user') {
    const { user } = dialog;

    return new GramJs.InputPeerUser({
      userId: user.id,
      accessHash: BigInt(user.accessHash),
    });
  } else if (type === 'channel') {
    const { chat } = dialog;

    if (
      chat instanceof GramJs.ChatEmpty ||
      chat instanceof GramJs.Chat ||
      chat instanceof GramJs.ChatForbidden
    ) {
      return new GramJs.InputPeerChat({
        chatId: chat.id,
      });
    }

    return new GramJs.InputPeerChannel({
      channelId: chat.id,
      accessHash: BigInt(chat.accessHash),
    });
  }

  return new GramJs.InputPeerChat({
    chatId: dialog.chat.id,
  });
}
