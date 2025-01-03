import BigInt from 'big-integer';
import GramJs from '../common/gramjs/tl/api';

export const getIdByPeer = (peer?: GramJs.TypePeer) => {
  if (!peer) {
    return '-1';
  }

  if (peer instanceof GramJs.PeerUser) {
    return String(peer.userId);
  } else if (peer instanceof GramJs.PeerChannel) {
    return String(peer.channelId);
  }
  return String(peer.chatId);
};

export function buildInputPeer(
  peer: GramJs.TypePeer,
  chat: GramJs.TypeChat | null,
  user: GramJs.TypeUser | null
): GramJs.TypeInputPeer {
  if (peer instanceof GramJs.PeerUser) {
    if (!user || user instanceof GramJs.UserEmpty || !user.accessHash) {
      return new GramJs.InputPeerUser({
        userId: BigInt(getIdByPeer(peer)),
        accessHash: BigInt(0),
      });
    }

    return new GramJs.InputPeerUser({
      userId: BigInt(getIdByPeer(peer)),
      accessHash: BigInt(user.accessHash),
    });
  } else if (peer instanceof GramJs.PeerChannel) {
    if (
      !chat ||
      chat instanceof GramJs.ChatEmpty ||
      chat instanceof GramJs.Chat ||
      chat instanceof GramJs.ChatForbidden ||
      !chat.accessHash
    ) {
      return new GramJs.InputPeerUser({
        userId: BigInt(getIdByPeer(peer)),
        accessHash: BigInt(0),
      });
    }

    return new GramJs.InputPeerChannel({
      channelId: BigInt(getIdByPeer(peer)),
      accessHash: BigInt(chat.accessHash),
    });
  }
  return new GramJs.InputPeerChat({
    chatId: BigInt(getIdByPeer(peer)),
  });
}
