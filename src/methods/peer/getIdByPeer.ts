import GramJs from '../../common/gramjs/tl/api';

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
