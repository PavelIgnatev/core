import BigInt from 'big-integer';

import GramJs from '../../../gramjs/tl/api';
import { sendToMainBot } from '../../helpers/sendToMainBot';
import { getIdByPeer } from './getIdByPeer';

export const getPeer = async (
  accountId: string,
  peer: GramJs.TypePeer,
  chats: GramJs.TypeChat[],
  users: GramJs.TypeUser[]
) => {
  const id = getIdByPeer(peer);

  if (peer instanceof GramJs.PeerUser) {
    const user = users.find((m) => String(m.id) === id);

    if (!user || user instanceof GramJs.UserEmpty) {
      await sendToMainBot(`** GET USERS: USER ERROR **
ACCOUNT_ID: ${accountId}
PEER: ${JSON.stringify(peer)}
EMPTY_USER: ${user instanceof GramJs.UserEmpty}`);
      return null;
    }

    if (!user.accessHash) {
      await sendToMainBot(`** GET USERS: USER ACCESS HASH ERROR **
ACCOUNT_ID: ${accountId}
PEER: ${JSON.stringify(peer)}
USER_ID: ${user.id}`);
      return null;
    }

    return new GramJs.InputPeerUser({
      userId: user.id,
      accessHash: user.accessHash,
    });
  }

  if (peer instanceof GramJs.PeerChat) {
    const chat = chats.find((d) => String(d.id) === id);

    if (!chat) {
      await sendToMainBot(`** GET USERS: CHAT NOT FOUND **
ACCOUNT_ID: ${accountId}
PEER: ${JSON.stringify(peer)}`);
      return null;
    }

    if (
      chat instanceof GramJs.ChatEmpty ||
      chat instanceof GramJs.ChatForbidden
    ) {
      await sendToMainBot(`** GET USERS: INVALID CHAT **
ACCOUNT_ID: ${accountId}
PEER: ${JSON.stringify(peer)}
CHAT_TYPE: ${chat.className}`);
      return null;
    }

    return new GramJs.InputPeerChat({
      chatId: chat.id,
    });
  }

  if (peer instanceof GramJs.PeerChannel) {
    const chat = chats.find((d) => String(d.id) === id);

    if (!chat) {
      await sendToMainBot(`** GET USERS: CHANNEL NOT FOUND **
ACCOUNT_ID: ${accountId}
PEER: ${JSON.stringify(peer)}`);
      return null;
    }

    if (!(chat instanceof GramJs.Channel)) {
      await sendToMainBot(`** GET USERS: INVALID CHANNEL **
ACCOUNT_ID: ${accountId}
PEER: ${JSON.stringify(peer)}
CHAT_TYPE: ${chat.className}`);
      return null;
    }

    if (!chat.accessHash) {
      await sendToMainBot(`** GET USERS: CHANNEL ACCESS HASH ERROR **
ACCOUNT_ID: ${accountId}
PEER: ${JSON.stringify(peer)}
CHANNEL_ID: ${chat.id}`);
      return null;
    }

    return new GramJs.InputPeerChannel({
      channelId: chat.id,
      accessHash: chat.accessHash,
    });
  }

  await sendToMainBot(`** GET USERS: UNKNOWN PEER TYPE **
ACCOUNT_ID: ${accountId}
PEER: ${JSON.stringify(peer)}`);
  return null;
};
