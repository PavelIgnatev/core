import { Dialog } from '../../@types/Dialog';
import { invokeRequest } from '../../common/gramjs';
import TelegramClient from '../../common/gramjs/client/TelegramClient';
import GramJs from '../../common/gramjs/tl/api';
import { sendToMainBot } from '../../helpers/sendToMainBot';
import { getIdByPeer } from '../peer/getIdByPeer';

export const getDialogs = async (
  client: TelegramClient,
  accountId: string,
  folderId: 0 | 1,
  notAll: boolean = false
) => {
  const dialogs: Dialog[] = [];
  let offsetDate = 0;
  while (true) {
    const d = await invokeRequest(
      client,
      new GramJs.messages.GetDialogs({
        offsetPeer: new GramJs.InputPeerEmpty(),
        folderId,
        limit: 100,
        offsetDate,
      })
    );

    if (!d || d instanceof GramJs.messages.DialogsNotModified) {
      return [];
    }

    for (const dialog of d.dialogs) {
      if (
        !(dialog instanceof GramJs.Dialog) ||
        dialogs.find(
          ({ dialog: dl }) => getIdByPeer(dl.peer) === getIdByPeer(dialog.peer)
        )
      ) {
        continue;
      }

      const id = getIdByPeer(dialog.peer);
      if (
        [
          '178220800',
          '1271266957',
          '1087968824',
          '136817688',
          '5434988373',
          '777000',
          '2282583322',
        ].includes(id)
      ) {
        continue;
      }

      const message = d.messages.find((m) => getIdByPeer(m.peerId) === id);
      if (!message) {
        await sendToMainBot(`** GET USERS: MESSAGE ERROR **
ACCOUNT ID: ${accountId}
DIALOG: ${JSON.stringify(dialog)}`);
        return [];
      }

      if (dialog.peer instanceof GramJs.PeerUser) {
        const user = d.users.find((m) => String(m.id) === id);
        if (!user || user instanceof GramJs.UserEmpty || !user.accessHash) {
          await sendToMainBot(`** GET USERS: USER ERROR **
ACCOUNT_ID: ${accountId}
DIALOG: ${JSON.stringify(dialog)}
EMPTY_USER: ${user instanceof GramJs.UserEmpty} 
USER_ACCESS_HASH: ${
            user instanceof GramJs.UserEmpty
              ? 'false'
              : Boolean(user?.accessHash)
          }`);
          return [];
        }

        dialogs.push({
          type: 'user',
          user: user as GramJs.User & { accessHash: BigInteger },
          dialog,
          message,
          chat: null,
        });
      } else if (dialog.peer instanceof GramJs.PeerChat) {
        const chat = d.chats.find((d) => String(d.id) === id);
        if (
          !chat ||
          ((chat instanceof GramJs.ChannelForbidden ||
            chat instanceof GramJs.Channel) &&
            !chat.accessHash)
        ) {
          await sendToMainBot(`** GET USERS: CHAT ERROR **
ACCOUNT ID: ${accountId}
DIALOG: ${JSON.stringify(dialog)}
IS_CHANNEL: ${
            chat instanceof GramJs.ChannelForbidden ||
            chat instanceof GramJs.Channel
          }
ACCESS_HASH: ${Boolean(chat?.accessHash)}`);
          return [];
        }

        dialogs.push({
          type: 'chat',
          chat,
          dialog,
          message,
          user: null,
        });
      } else if (dialog.peer instanceof GramJs.PeerChannel) {
        const chat = d.chats.find((d) => String(d.id) === id);
        if (
          !chat ||
          ((chat instanceof GramJs.ChannelForbidden ||
            chat instanceof GramJs.Channel) &&
            !chat.accessHash)
        ) {
          await sendToMainBot(`** GET USERS: CHANNEL ERROR **
ACCOUNT ID: ${accountId}
DIALOG: ${JSON.stringify(dialog)}
IS_CHANNEL: ${
            chat instanceof GramJs.ChannelForbidden ||
            chat instanceof GramJs.Channel
          }
ACCESS_HASH: ${Boolean(chat?.accessHash)}`);
          return [];
        }

        dialogs.push({
          type: 'channel',
          chat,
          dialog,
          message,
          user: null,
        });
      }
    }

    if (d.dialogs.length < 100 || notAll) {
      break;
    } else {
      const lastDialog = dialogs[dialogs.length - 1].dialog;
      const lastMessage = d.messages.find(
        (m) => getIdByPeer(m.peerId) === getIdByPeer(lastDialog.peer)
      );
      if (!lastMessage || lastMessage instanceof GramJs.MessageEmpty) {
        await sendToMainBot(`** LAST MESSAGE NOT DEFINED **
ACCOUNT ID: ${accountId}
MESSAGE: ${JSON.stringify(lastMessage)}
MESSAGE_EMPTY: ${lastMessage instanceof GramJs.MessageEmpty}
OFFSET DATE: ${offsetDate}`);
        return [];
      }

      offsetDate = lastMessage.date;
    }
  }
  return dialogs;
};
