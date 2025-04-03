import BigInt, { BigInteger } from 'big-integer';

import TelegramClient from '../../../gramjs/client/TelegramClient';
import GramJs from '../../../gramjs/tl/api';
import { invokeRequest } from '../../modules/invokeRequest';
import { resolveUsername } from '../contacts/resolveUsername';

export const sendVideoMessage = async (
  client: TelegramClient,
  channelUsername: string,
  userId: BigInteger,
  accessHash: BigInteger
) => {
  const videoChannel = await resolveUsername(client, channelUsername);

  if (!videoChannel) {
    throw new Error('VIDEO_CHANNEL_NOT_FOUND');
  }

  const videoChannelChat = videoChannel.chats?.[0];
  if (
    !videoChannelChat ||
    !(videoChannelChat instanceof GramJs.Channel) ||
    !videoChannelChat.accessHash
  ) {
    throw new Error('VIDEO_CHANNEL_ID_NOT_FOUND');
  }

  const videoChannelHistory = await invokeRequest(
    client,
    new GramJs.messages.GetHistory({
      peer: new GramJs.InputPeerChannel({
        channelId: videoChannelChat.id,
        accessHash: videoChannelChat.accessHash,
      }),
      addOffset: -1,
      minId: 0,
    })
  );

  if (
    !videoChannelHistory ||
    videoChannelHistory instanceof GramJs.messages.MessagesNotModified
  ) {
    throw new Error('PARENT_CHANNEL_HISTORY_NOT_FOUND');
  }

  const videoChannelMessages = videoChannelHistory.messages.filter(
    (m) => m instanceof GramJs.Message
  );

  console.log(videoChannelMessages, 'messages');
  

  if (!videoChannelMessages.length) {
    throw new Error('MINIMAL_MESSAGES_NOT_FOUND');
  }

  const forwardedMessages = await invokeRequest(
    client,
    new GramJs.messages.ForwardMessages({
      fromPeer: new GramJs.InputPeerChannel({
        channelId: videoChannelChat.id,
        accessHash: videoChannelChat.accessHash,
      }),
      toPeer: new GramJs.InputPeerUser({
        userId,
        accessHash,
      }),
      randomId: videoChannelMessages.map(() =>
        BigInt(Math.floor(Math.random() * 10 ** 10) + 10 ** 10)
      ),
      id: videoChannelMessages.map((m) => m.id),
      dropAuthor: true,
    })
  );
};
