import TelegramClient from '../../gramjs/client/TelegramClient';
import GramJs from '../../gramjs/tl/api';
import { Account } from '../@types/Account';
import { sendToMainBot } from '../helpers/sendToMainBot';
import { leaveChannel } from '../methods/channels/leaveChannel';
import { blockContact } from '../methods/contacts/blockContact';
import { deleteContacts } from '../methods/contacts/deleteContacts';
import { getContacts } from '../methods/contacts/getContacts';
import { deleteChatUser } from '../methods/messages/deleteChatUser';
import { deleteHistory } from '../methods/messages/deleteHistory';
import { buildInputPeer } from '../methods/peer/buildInputPeer';
import { getDialogs } from '../methods/users/getDialogs';

export const automaticCheck = async (
  client: TelegramClient,
  account: Account
) => {
  const { accountId } = account;
  try {
    const dialogs = await getDialogs(client, accountId, 0);
    for (const dialog of dialogs) {
      const { type } = dialog;

      const peer = buildInputPeer(dialog);
      if (type === 'channel') {
        await leaveChannel(client, peer);
      } else if (type === 'chat') {
        const { chat } = dialog;

        if (
          chat instanceof GramJs.Chat ||
          chat instanceof GramJs.ChatForbidden ||
          chat instanceof GramJs.ChatEmpty
        ) {
          await deleteChatUser(
            client,
            String(chat.id),
            new GramJs.InputUserSelf()
          );
          await deleteHistory(client, peer, false);
        } else {
          await leaveChannel(client, peer);
        }
      } else if (type === 'user') {
        const { user } = dialog;

        if (user instanceof GramJs.User && user.bot) {
          await deleteHistory(client, peer, false);
          await blockContact(client, peer);
        } else {
          await deleteHistory(client, peer, true);
        }
      }
    }

    const archiveDialogs = await getDialogs(client, accountId, 1);
    for (const archiveDialog of archiveDialogs) {
      const { type } = archiveDialog;

      const peer = buildInputPeer(archiveDialog);
      if (type === 'channel') {
        await leaveChannel(client, peer, true);
      } else if (type === 'chat') {
        const { chat } = archiveDialog;

        if (
          chat instanceof GramJs.Chat ||
          chat instanceof GramJs.ChatForbidden ||
          chat instanceof GramJs.ChatEmpty
        ) {
          await deleteChatUser(
            client,
            String(chat.id),
            new GramJs.InputUserSelf()
          );
          await deleteHistory(client, peer, false);
        } else {
          await leaveChannel(client, peer, true);
        }
      } else if (type === 'user') {
        const { user } = archiveDialog;

        if (user instanceof GramJs.User && user.bot) {
          await deleteHistory(client, peer, false);
          await blockContact(client, peer);
        } else {
          await deleteHistory(client, peer, true);
        }
      }
    }

    const contacts = await getContacts(client);
    if (contacts && contacts.users.length > 0) {
      const users = [];
      for (const user of contacts.users) {
        if (user instanceof GramJs.User && user.accessHash) {
          users.push(
            new GramJs.InputPeerUser({
              userId: user.id,
              accessHash: user.accessHash,
            })
          );
        }
      }

      if (users.length > 0) {
        await deleteContacts(client, users);
      }
    }
  } catch (e: any) {
    await sendToMainBot(`** AUTOMATIC CHECK ERROR **
ACCOUNT ID: ${accountId}
ERROR: ${e.message}`);
  }
};
