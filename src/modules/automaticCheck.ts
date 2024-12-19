import BigInt from 'big-integer';

import GramJs from '../common/gramjs/tl/api';
import TelegramClient from '../common/gramjs/client/TelegramClient';

import { sendToBot } from '../helpers/sendToBot';
import {
  getDialogs,
  getRecipientUsernameAndPhone,
  updateAutomaticDialogue,
  updateSingleDialogue,
  updateDateCheckedIds,
} from '../db/dialogues';
import { editFolder } from '../methods/folders/editFolder';

import { getUserByDialogue } from './getUserByDialogue';

const sleep10 = async () => {
  await new Promise((res) => setTimeout(res, 10000));
};

export const automaticCheck = async (
  client: TelegramClient,
  accountId: string
) => {
  try {
    const users: Record<
      string,
      {
        user: GramJs.User;
        dialog?: GramJs.TypeDialog;
        message?: GramJs.TypeMessage;
      }
    > = {};
    let offsetDate = 0;

    const dialogs = await getDialogs(accountId);
    const dialogsWithoutReasonIds = dialogs
      .filter((d) => !d.automaticReason)
      .map((d) => d.recipientId);
    const dialogsWithReasonIds = dialogs
      .filter((d) => d.automaticReason)
      .map((d) => d.recipientId);
    const blockedIds = dialogs
      .filter((d) => d.blocked || d.reason)
      .map((d) => d.recipientId);
    const readIds = dialogs.filter((d) => d.read).map((d) => d.recipientId);

    while (true) {
      const dialogs = (await client.invoke(
        new GramJs.messages.GetDialogs({
          offsetPeer: new GramJs.InputPeerEmpty(),
          folderId: 1,
          limit: 100,
          offsetDate,
        })
      )) as GramJs.messages.Dialogs;

      const clientMessages = dialogs?.messages || [];
      const clientUsers = dialogs?.users || [];
      const clientDialogs = dialogs?.dialogs || [];
      const clientChats = dialogs?.chats || [];

      for (const chat of clientChats) {
        if (
          chat instanceof GramJs.Channel &&
          chat.username === 'HiddenSender'
        ) {
          continue;
        }

        await sleep10();
        await client.invoke(
          new GramJs.channels.LeaveChannel({
            channel: new GramJs.InputPeerChannel({
              channelId: BigInt(chat.id),
              // @ts-ignore
              accessHash: BigInt(chat.accessHash),
            }),
          })
        );
      }

      for (const user of clientUsers) {
        if (
          !(user instanceof GramJs.User) ||
          user.self ||
          user.bot ||
          user.support
        ) {
          continue;
        }
        if (
          !dialogsWithoutReasonIds.includes(String(user.id)) &&
          !dialogsWithReasonIds.includes(String(user.id))
        ) {
          continue;
        }

        const dialog = clientDialogs.find(
          (d) =>
            d.peer instanceof GramJs.PeerUser &&
            String(d.peer.userId) === String(user.id)
        );
        const message = clientMessages.find(
          (m) =>
            m.peerId instanceof GramJs.PeerUser &&
            String(m.peerId.userId) === String(user.id)
        );

        if (!dialog || !message) {
          await sendToBot(`** DIALOG OR MESSAGE NOT DEFINED **
ACCOUNT ID: ${accountId}
ID: ${String(user.id)}`);
          return;
        }

        users[String(user.id)] = { user, dialog, message };
      }

      if (clientUsers.length < 100) {
        break;
      } else {
        const filtredUsers = clientUsers.filter(
          (user) =>
            String(user.id) !== '136817688' &&
            (user instanceof GramJs.User ? !user.bot : true)
        );
        const lastUser = filtredUsers[filtredUsers.length - 2];

        if (!lastUser) {
          await sendToBot(`** LAST USER NOT DEFINED **
ACCOUNT ID: ${accountId}
OFFSET DATE: ${offsetDate}`);
          return;
        }
        // @ts-ignore
        const lastMessage = clientMessages.find(
          // @ts-ignore
          (message) => String(message.peerId?.userId) === String(lastUser.id)
        );
        if (!lastMessage || lastMessage instanceof GramJs.MessageEmpty) {
          await sendToBot(`** LAST MESSAGE NOT INSTANCEOF MESSAGE **
ACCOUNT ID: ${accountId}
MESSAGE: ${JSON.stringify(lastMessage)}
OFFSET DATE: ${offsetDate}`);
          return;
        }

        offsetDate = lastMessage.date;
      }
    }

    for (const userId of dialogsWithoutReasonIds) {
      const isMissing = !Object.keys(users).includes(userId);
      const isBlocked = blockedIds.includes(userId);

      if (isMissing) {
        await sleep10();
        const missingDialog = await getRecipientUsernameAndPhone(
          accountId,
          userId
        );
        if (
          !missingDialog ||
          (!missingDialog.recipientPhone && !missingDialog.recipientUsername)
        ) {
          await sendToBot(`** RECIPIENT USERNAME OR PHONE NOT DEFINED **
ACCOUNT ID: ${accountId}
RECIPIENT ID: ${userId}`);
          continue;
        }

        const dialogTG = await getUserByDialogue(client, missingDialog);
        if (!dialogTG) {
          await updateAutomaticDialogue(
            accountId,
            userId,
            'automatic:data-not-actual',
            { read: true }
          );
        } else if (
          (!dialogTG.status ||
            dialogTG.status instanceof GramJs.UserStatusEmpty) &&
          !dialogTG.photo
        ) {
          await updateAutomaticDialogue(
            accountId,
            userId,
            'automatic:blocked',
            { read: true }
          );
        } else if (isBlocked) {
          await updateAutomaticDialogue(
            accountId,
            userId,
            'automatic:manual-blocked',
            { read: true }
          );
        } else {
          await updateAutomaticDialogue(
            accountId,
            userId,
            'automatic:messages-deleted',
            { read: true }
          );
        }
      } else {
        const { user, dialog } = users[userId];

        if (user.deleted) {
          await sleep10();
          await editFolder(client, String(user.id), String(user.accessHash), 0);
          await updateAutomaticDialogue(
            accountId,
            userId,
            'automatic:account-deleted'
          );
        } else if (
          (!user.status || user.status instanceof GramJs.UserStatusEmpty) &&
          !user.photo
        ) {
          await sleep10();
          await editFolder(client, String(user.id), String(user.accessHash), 0);
          await updateAutomaticDialogue(
            accountId,
            userId,
            'automatic:blocked',
            { read: true }
          );
        } else if (isBlocked) {
          await sleep10();
          await editFolder(client, String(user.id), String(user.accessHash), 0);
          await updateAutomaticDialogue(
            accountId,
            userId,
            'automatic:manual-blocked'
          );
        } else {
          const dialogDB = dialogs.find(
            (d) => String(d.recipientId) === String(userId)
          );
          const lastOnline =
            !user.status ||
            user.status instanceof GramJs.UserStatusRecently ||
            user.status instanceof GramJs.UserStatusEmpty ||
            user.status instanceof GramJs.UserStatusLastMonth ||
            user.status instanceof GramJs.UserStatusLastWeek
              ? null
              : user.status instanceof GramJs.UserStatusOffline
                ? user.status.wasOnline
                : user.status.expires;

          if (lastOnline !== dialogDB?.lastOnline) {
            await updateSingleDialogue(accountId, userId, {
              lastOnline,
            });
          }
        }

        if (
          dialog &&
          dialog instanceof GramJs.Dialog &&
          (dialog.topMessage <= dialog.readOutboxMaxId ||
            dialog.topMessage <= dialog.readInboxMaxId) &&
          !readIds.includes(userId)
        ) {
          await updateSingleDialogue(accountId, userId, {
            read: true,
            dateUpdated: new Date(),
          });
        }
      }
    }

    await updateDateCheckedIds(accountId, dialogsWithoutReasonIds);
  } catch (e: any) {
    await sendToBot(`** AUTOMATIC CHECK ERROR **
ACCOUNT ID: ${accountId}
ERROR: ${e.message}`);
  }
};
