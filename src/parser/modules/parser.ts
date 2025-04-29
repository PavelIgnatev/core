import * as fs from 'fs';
import * as path from 'path';

import { TelegramClient } from '../../gramjs';
import GramJs from '../../gramjs/tl/api';
import { fetchTelegramChatLink } from '../helpers/linkFetcher';
import { sendToMainBot } from '../helpers/sendToMainBot';
import { resolveUsername } from '../methods/contacts/resolveUsername';
import { getPeer } from '../methods/peer/getPeer';
import { invokeRequest } from './invokeRequest';

export const parser = async (accountId: string, client: TelegramClient) => {
  const chatLink = await fetchTelegramChatLink();
  if (!chatLink) {
    return;
  }

  const chatUsername = chatLink.split('/').pop()!;
  const resolvedChat = await resolveUsername(client, chatUsername);

  if (!resolvedChat) {
    await sendToMainBot(`** CHAT_NOT_DEFINED **
ACCOUNT_ID: ${accountId}
LINK: ${chatLink}
USERNAME: ${chatUsername}`);
    return;
  }

  const peer = await getPeer(
    accountId,
    resolvedChat.peer,
    resolvedChat.chats,
    resolvedChat.users
  );

  if (!peer) {
    await sendToMainBot(`** PEER_NOT_DEFINED **
ID: ${accountId}
LINK: ${chatLink}
USERNAME: ${chatUsername}`);
    return;
  }

  if (peer instanceof GramJs.InputPeerUser) {
    await sendToMainBot(`** PEER_INSTANCEOF_USER **
ID: ${accountId}
LINK: ${chatLink}
USERNAME: ${chatUsername}`);
    return;
  }

  if (peer instanceof GramJs.InputPeerChat) {
    await sendToMainBot(`** PEER_INSTANCEOF_CHAT **
ID: ${accountId}
LINK: ${chatLink}
USERNAME: ${chatUsername}`);
    return;
  }

  if (peer instanceof GramJs.InputPeerChannel) {
    const fullChannel = await invokeRequest(
      client,
      new GramJs.channels.GetFullChannel({
        channel: peer,
      })
    );

    if (!fullChannel) {
      await sendToMainBot(`** FULL_CHANNEL_NOT_DEFINED **
ID: ${accountId}
LINK: ${chatLink}
USERNAME: ${chatUsername}`);
      return;
    }

    const chats = fullChannel.chats.filter(
      (chat) => chat instanceof GramJs.Channel && chat.megagroup
    );

    for (const chat of chats) {
      if (!(chat instanceof GramJs.Channel) || !chat.accessHash) {
        await sendToMainBot(`** SUB_CHAT_NOT_INSTANCEOF_CHANNEL **
  ID: ${accountId}
  LINK: ${chatLink}
  USERNAME: ${chatUsername}`);
        return;
      }

      const participants = await invokeRequest(
        client,
        new GramJs.channels.GetParticipants({
          channel: new GramJs.InputPeerChannel({
            channelId: chat.id,
            accessHash: chat.accessHash,
          }),
          filter: new GramJs.ChannelParticipantsSearch({ q: '' }),
          limit: 400,
          offset: 0,
        })
      );

      if (
        !participants ||
        participants instanceof GramJs.channels.ChannelParticipantsNotModified
      ) {
        await sendToMainBot(`** PARTICIPANTS_NOT_DEFINED **
ID: ${accountId}
LINK: ${chatLink}
USERNAME: ${chatUsername}
IS_P: ${Boolean(participants)}`);
        return;
      }

      const { users } = participants;

      console.log(users.length, participants.count);
    }
  }
};
