import BigInt from 'big-integer';

import GramJs from '../common/gramjs/tl/api';
import TelegramClient from '../common/gramjs/client/TelegramClient';

import { sendToBot } from '../helpers/sendToBot';
import {
  getBlockedIds,
  getDialogs,
  getDialogsIds,
  getRecipientUsernameAndPhone,
  updateAutomaticDialogue,
  updateAutomaticDialogueWithoutReason,
  updateDateCheckedIds,
} from '../db/dialogues';
import { editFolder } from '../methods/folders/editFolder';

import { getUserByDialogue } from './getUserByDialogue';

const sleep10 = async () => {
  await new Promise((res) => setTimeout(res, 10000));
};

const getMessages = async (
  client: TelegramClient,
  dialogTG: any
): Promise<
  {
    id: string;
    text: string;
    fromId: string;
    date: string;
  }[]
> => {
  const dialogMessages: {
    id: string;
    text: string;
    fromId: string;
    date: string;
  }[] = [];

  const history = (await client.invoke(
    new GramJs.messages.GetHistory({
      peer: new GramJs.InputPeerUser({
        userId: BigInt(dialogTG.id),
        accessHash: BigInt(dialogTG.accessHash),
      }),
    })
  )) as any;

  const messages = (history?.messages || [])
    .filter((m: GramJs.Message) => m.className === 'Message')
    .reverse();

  for (const message of messages) {
    const {
      photo = false,
      voice = false,
      round = false,
      video = false,
      document = false,
      spoiler = false,
    } = message?.media || ({} as any);

    let text;
    if (message.fwdFrom) {
      text = '[FORWARDED MESSAGE]';
    } else if (message.message) {
      text = message.message;
    } else if (voice || round) {
      await client.invoke(
        new GramJs.messages.ReadMessageContents({
          id: [message.id],
        })
      );
      text = '[VOICE MESSAGE]';
    } else if (photo) {
      text = '[PHOTO]';
    } else if (video) {
      text = '[VIDEO]';
    } else if (document) {
      text = '[DOCUMENT]';
    } else if (spoiler) {
      text = '[SPOILER MESSAGE]';
    } else {
      text = '[UNKNOWN MESSAGE]';
    }

    dialogMessages.push({
      id: message.id,
      text,
      fromId: String(message?.fromId?.userId || dialogTG.id),
      date: message.date,
    });
  }

  return messages;
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
      .filter((d) => d.blocked)
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
          (user) => String(user.id) !== '136817688'
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
        if (!missingDialog) {
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
        } else if (isBlocked) {
          await updateAutomaticDialogue(
            accountId,
            userId,
            'automatic:manual-blocked',
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
        } else {
          const messages = await getMessages(client, dialogTG);

          if (messages.length > 0) {
            await sendToBot(`** ПЕРЕКИНУЛ В АРХИВ **
ACCOUNT ID: ${accountId}
ID: ${userId}`);
            await editFolder(
              client,
              String(dialogTG.id),
              String(dialogTG.accessHash),
              1
            );
          } else {
            await updateAutomaticDialogue(
              accountId,
              userId,
              'automatic:messages-deleted',
              { read: true }
            );
          }
        }
      } else {
        const { user, dialog } = users[userId];

        if (isBlocked) {
          await sleep10();
          await editFolder(client, String(user.id), String(user.accessHash), 0);
          await updateAutomaticDialogue(
            accountId,
            userId,
            'automatic:manual-blocked'
          );
        } else if (user.deleted) {
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
        }

        if (
          dialog &&
          dialog instanceof GramJs.Dialog &&
          dialog.topMessage === dialog.readOutboxMaxId &&
          !readIds.includes(userId)
        ) {
          await updateAutomaticDialogueWithoutReason(accountId, userId, {
            read: true,
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
