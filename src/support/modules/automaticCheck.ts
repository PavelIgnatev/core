import TelegramClient from '../../gramjs/client/TelegramClient';
import GramJs from '../../gramjs/tl/api';
import { Account } from '../@types/Account';
import { sendToMainBot } from '../helpers/sendToMainBot';
import { leaveChannel } from '../methods/channels/leaveChannel';
import { blockContact } from '../methods/contacts/blockContact';
import { deleteContacts } from '../methods/contacts/deleteContacts';
import { getContacts } from '../methods/contacts/getContacts';
import { editFolders } from '../methods/folders/editFolders';
import { clearAllDrafts } from '../methods/messages/clearAllDrafts';
import { deleteChatUser } from '../methods/messages/deleteChatUser';
import { deleteHistory } from '../methods/messages/deleteHistory';
import { togglePin } from '../methods/messages/togglePin';
import { buildInputPeer } from '../methods/peer/buildInputPeer';
import { getDialogs } from '../methods/users/getDialogs';

export const automaticCheck = async (
  client: TelegramClient,
  account: Account
) => {
  const { accountId } = account;
  try {
    await clearAllDrafts(client);

    const folderPeers = [];
    const archiveDialogs = await getDialogs(client, accountId, 1);
    for (const archiveDialog of archiveDialogs) {
      const { dialog, message } = archiveDialog;

      if (message instanceof GramJs.Message && !Boolean(message.noforwards)) {
        continue;
      }

      const peer = buildInputPeer(archiveDialog);
      if (dialog.pinned) {
        await togglePin(
          client,
          new GramJs.InputDialogPeer({
            peer,
          }),
          undefined
        );
      }

      folderPeers.push(
        new GramJs.InputFolderPeer({
          peer,
          folderId: 0,
        })
      );
    }

    if (folderPeers.length) {
      for (let i = 0; i < folderPeers.length; i += 100) {
        const chunk = folderPeers.slice(i, i + 100);
        await editFolders(client, chunk);
      }
    }

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
