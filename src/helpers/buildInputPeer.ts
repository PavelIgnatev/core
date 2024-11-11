import BigInt from 'big-integer';
import GramJs from '../common/gramjs/tl/api';

export const CHANNEL_ID_LENGTH = 14;

function checkIfChannelId(id: string) {
  return id.length === CHANNEL_ID_LENGTH && id.startsWith('-1');
}

export function getEntityTypeById(chatOrUserId: string) {
  if (!chatOrUserId.startsWith('-')) {
    return 'user';
  } else if (checkIfChannelId(chatOrUserId)) {
    return 'channel';
  } else {
    return 'chat';
  }
}
export function buildMtpPeerId(id: string, type: 'user' | 'chat' | 'channel') {
  if (type === 'user') {
    return BigInt(id);
  }

  if (type === 'channel') {
    return BigInt(id.slice(2));
  }

  return BigInt(id.slice(1));
}

export function buildInputPeer(
  chatOrUserId: string,
  accessHash?: string
): GramJs.TypeInputPeer {
  const type = getEntityTypeById(chatOrUserId);

  if (type === 'user') {
    return new GramJs.InputPeerUser({
      userId: buildMtpPeerId(chatOrUserId, 'user'),
      accessHash: BigInt(accessHash!),
    });
  } else if (type === 'channel') {
    return new GramJs.InputPeerChannel({
      channelId: buildMtpPeerId(chatOrUserId, 'channel'),
      accessHash: BigInt(accessHash!),
    });
  } else {
    return new GramJs.InputPeerChat({
      chatId: buildMtpPeerId(chatOrUserId, 'chat'),
    });
  }
}
