import TelegramClient from '../../gramjs/client/TelegramClient';
import GramJs from '../../gramjs/tl/api';
import { Account } from '../@types/Account';
import { Dialogue } from '../@types/Dialogue';
import { updateAccountById } from '../db/accounts';
import {
  getAccountDialogs,
  updateAutomaticDialogue,
  updateDateCheckedIds,
  updateSimpleDialogue,
} from '../db/dialogues';
import { sendToMainBot } from '../helpers/sendToMainBot';
import { leaveChannel } from '../methods/channels/leaveChannel';
import { blockContact } from '../methods/contacts/blockContact';
import { deleteContacts } from '../methods/contacts/deleteContacts';
import { getContacts } from '../methods/contacts/getContacts';
import { editFolders } from '../methods/folders/editFolders';
import { clearAllTrash } from '../methods/messages/clearAllTrash';
import { deleteChatUser } from '../methods/messages/deleteChatUser';
import { deleteHistory } from '../methods/messages/deleteHistory';
import { deleteMessages } from '../methods/messages/deleteMessages';
import { togglePin } from '../methods/messages/togglePin';
import { buildInputPeer } from '../methods/peer/buildInputPeer';
import { getIdByPeer } from '../methods/peer/getIdByPeer';
import { getDialogs } from '../methods/users/getDialogs';
import { getFullUser } from '../methods/users/getFullUser';

export const automaticCheck = async (
  client: TelegramClient,
  accountId: string
) => {
  try {
    const accountDialogs = await getAccountDialogs(accountId);
    const dialogsIds = accountDialogs.map((d) => d.recipientId);
    const dialogsWithoutReasonIds = accountDialogs
      .filter((d) => !d.automaticReason)
      .map((d) => d.recipientId);
    const dialogsWithReasonIds = accountDialogs
      .filter((d) => d.automaticReason)
      .map((d) => d.recipientId);
    const blockedIds = accountDialogs
      .filter((d) => d.blocked || d.reason)
      .map((d) => d.recipientId);
    const readIds = accountDialogs
      .filter((d) => d.read)
      .map((d) => d.recipientId);

    await clearAllTrash(client);

    const dialogs = await getDialogs(client, accountId, 0);
    for (const dialog of dialogs) {
      const { type } = dialog;

      const peer = buildInputPeer(dialog);
      if (type === 'channel') {
        await leaveChannel(client, peer, true);
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
          await leaveChannel(client, peer, true);
        }
      } else if (type === 'user') {
        const { user } = dialog;

        if (user instanceof GramJs.User && user.bot) {
          await deleteHistory(client, peer, false);
          await blockContact(client, peer);
        } else if (!dialogsIds.includes(String(user.id))) {
          await deleteHistory(client, peer, true);
          await blockContact(client, peer);
        }
      }
    }

    const folderPeers = [];
    const archiveDialogs = await getDialogs(client, accountId, 1);
    for (const archiveDialog of archiveDialogs) {
      const { dialog } = archiveDialog;

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

    for (const userId of dialogsWithoutReasonIds) {
      const isBlocked = blockedIds.includes(userId);
      const dialog = dialogs.find(
        ({ dialog }) => getIdByPeer(dialog.peer) === userId
      );
      const {
        recipientId: id,
        recipientAccessHash: accessHash,
        dateLastOnline,
      } = accountDialogs.find((d) => d.recipientId === userId) as Dialogue;

      if (!dialog) {
        const fullUser = await getFullUser(client, id, accessHash);
        if (
          !fullUser ||
          !fullUser.users.length ||
          fullUser.users[0] instanceof GramJs.UserEmpty
        ) {
          continue;
        }

        const user = fullUser.users[0];
        if (user.deleted) {
          await updateAutomaticDialogue(
            accountId,
            userId,
            'automatic:account-deleted'
          );
        } else if (
          !user.status ||
          user.status instanceof GramJs.UserStatusEmpty
        ) {
          await updateAutomaticDialogue(
            accountId,
            userId,
            'automatic:blocked',
            { read: true, withDialog: false }
          );
        } else if (isBlocked) {
          await updateAutomaticDialogue(
            accountId,
            userId,
            'automatic:artificial-blocked'
          );
        } else {
          await updateAutomaticDialogue(
            accountId,
            userId,
            'automatic:messages-deleted',
            { read: true, withDialog: false }
          );
        }
        dialogsWithReasonIds.push(userId);
      } else {
        const { user, type, message } = dialog;
        if (type !== 'user') {
          await sendToMainBot(
            `** AUTOMATIC: TYPE NOT USER **
ACCOUNT_ID: ${accountId}
DIALOG: ${JSON.stringify(dialog)}`
          );
          continue;
        }

        if (user.deleted) {
          await updateAutomaticDialogue(
            accountId,
            userId,
            'automatic:account-deleted'
          );
          dialogsWithReasonIds.push(userId);
        } else if (
          !user.status ||
          user.status instanceof GramJs.UserStatusEmpty
        ) {
          await updateAutomaticDialogue(
            accountId,
            userId,
            'automatic:blocked',
            { read: true, withDialog: true }
          );
          dialogsWithReasonIds.push(userId);
        } else if (isBlocked) {
          await updateAutomaticDialogue(
            accountId,
            userId,
            'automatic:artificial-blocked'
          );
          dialogsWithReasonIds.push(userId);
        } else if (!(message instanceof GramJs.Message)) {
          if (message instanceof GramJs.MessageEmpty) {
            await deleteMessages(client, [message.id], true);
          } else {
            if (message.action instanceof GramJs.MessageActionHistoryClear) {
              await updateAutomaticDialogue(
                accountId,
                userId,
                'automatic:messages-deleted',
                { read: true, withDialog: true }
              );
              dialogsWithReasonIds.push(userId);
            } else {
              await deleteMessages(client, [message.id], true);
            }
          }
        }

        const lastOnline =
          user.status instanceof GramJs.UserStatusOffline
            ? user.status.wasOnline
            : user.status instanceof GramJs.UserStatusOnline
              ? user.status.expires
              : null;

        if (
          lastOnline &&
          lastOnline !== Math.floor((dateLastOnline?.getTime() || 0) / 1000)
        ) {
          await updateSimpleDialogue(accountId, userId, {
            dateLastOnline: new Date(Number(`${lastOnline}000`)),
          });
        }

        if (
          (dialog.dialog.topMessage <= dialog.dialog.readOutboxMaxId ||
            dialog.dialog.topMessage <= dialog.dialog.readInboxMaxId ||
            (message instanceof GramJs.Message ? !message.out : false)) &&
          !readIds.includes(userId)
        ) {
          await updateSimpleDialogue(accountId, userId, {
            read: true,
            dateLastRead: new Date(),
          });
        }
      }
    }

    for (const userId of dialogsWithReasonIds) {
      const dialog = dialogs.find(
        ({ dialog }) => getIdByPeer(dialog.peer) === userId
      );

      if (dialog) {
        const { deletedAndBlocked } = accountDialogs.find(
          (d) => d.recipientId === userId
        )!;
        const peer = buildInputPeer(dialog);

        if (deletedAndBlocked) {
          continue;
        }

        await deleteHistory(client, peer, false);
        await blockContact(client, peer);
        await updateSimpleDialogue(accountId, userId, {
          deletedAndBlocked: true,
        });
      }
    }

    await updateDateCheckedIds(accountId, dialogsWithoutReasonIds);
  } catch (e: any) {
    await sendToMainBot(`** AUTOMATIC CHECK ERROR **
ACCOUNT ID: ${accountId}
ERROR: ${e.message}`);
  }

  await updateAccountById(accountId, {
    automaticCheckDate: new Date(),
  });
};
