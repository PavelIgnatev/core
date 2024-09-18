import BigInt from 'big-integer';
import { red, yellow } from 'colors/safe';

import { Dialogue } from '../@types/Dialogue';
import GramJs from '../common/gramjs/tl/api';
import {
  getDialogue,
  getManualControlDialogues,
  getPingDialogues,
  updateBlockedDialogue,
} from '../db/dialogues';
import { deleteMessages } from '../methods/messages/deleteHistory';
import { getCombinedMessages } from '../helpers/getCombinedMessages';
import { sendToBot } from '../helpers/sendToBot';

type Message = GramJs.Message & { peerId: GramJs.PeerUser };
type Dialog = GramJs.Dialog & { peer: GramJs.PeerUser };

export const getDialogs = async (client: any, accountId: string) => {
  console.log(`[${accountId}] Initialize sub module`, yellow('GET DIALOGS'));

  const clientDialogs = await client.invoke(
    new GramJs.messages.GetDialogs({
      offsetPeer: new GramJs.InputPeerEmpty(),
      folderId: 1,
      limit: 100,
    })
  );

  if (!clientDialogs?.users?.length) {
    return [];
  }

  const pingDialogsDB = await getPingDialogues(accountId);
  const manualControlDialogsDB = await getManualControlDialogues(accountId);

  const clientMessagesIds = clientDialogs.messages
    .filter((m: Message) => !m.out)
    .map((m: Message) => String(m.peerId.userId));
  const clientDialogsIds = clientDialogs.dialogs
    .filter((d: Dialog) => d.unreadCount !== 0)
    .map((d: Dialog) => String(d.peer.userId));

  const dialogs = [];
  const pingDialogs = [];
  const manualDialogs = [];
  const dialogIds = [...new Set([...clientMessagesIds, ...clientDialogsIds])];
  const pingDialogIds = pingDialogsDB
    .map((d: Dialogue) => String(d.recipientId))
    .filter((d: string) => !dialogIds.includes(d));
  const manualControlDialogIds = manualControlDialogsDB
    .map((d: Dialogue) => String(d.recipientId))
    .filter((d: string) => !dialogIds.includes(d));

  for (const dialogId of [
    ...dialogIds,
    ...pingDialogIds,
    ...manualControlDialogIds,
  ]) {
    if (!dialogId || dialogId === 'undefined') {
      continue;
    }

    const user = clientDialogs.users.find(
      (u: GramJs.User) => String(u.id) === dialogId
    );

    if (
      user &&
      !user.deleted &&
      !user.bot &&
      !user.support &&
      !user.self &&
      !(!user.status || user.status instanceof GramJs.UserStatusEmpty)
    ) {
      const allHistory = await client.invoke(
        new GramJs.messages.GetHistory({
          peer: new GramJs.InputPeerUser({
            userId: BigInt(user.id),
            accessHash: BigInt(user.accessHash),
          }),
          limit: 30,
        })
      );

      if (!allHistory?.messages?.length) {
        await updateBlockedDialogue(accountId, dialogId, 'messages-length');
        continue;
      }

      const dialogDb = await getDialogue(accountId, String(user.id));

      const {
        messages: dialogMessages = [],
        groupId,
        blocked = false,
      } = dialogDb || {};

      if (!groupId) {
        await sendToBot(`~GROUP ID NOT DEFINED~
AccountId: ${accountId}`);
        return [];
      }

      if (blocked) {
        await deleteMessages(client, accountId, user.id, user.accessHash);
        continue;
      }

      const dialogsMessages = (allHistory.messages || [])
        .filter((m: GramJs.Message) => m.className === 'Message')
        .reverse();
      for (const dialogMessage of dialogsMessages) {
        if (dialogMessages.find((m: any) => m.id === dialogMessage.id)) {
          continue;
        }

        const {
          photo = false,
          voice = false,
          round = false,
          video = false,
          document = false,
          spoiler = false,
        } = dialogMessage?.media || ({} as any);
        const fromId = dialogMessage?.fromId as any;

        let text;
        if (dialogMessage.fwdFrom) {
          text = '[FORWARDED MESSAGE]';
        } else if (dialogMessage.message) {
          text = dialogMessage.message;
        } else if (voice || round) {
          await client.invoke(
            new GramJs.messages.ReadMessageContents({
              id: [dialogMessage.id],
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
          id: dialogMessage.id,
          text,
          fromId: String(fromId?.userId || user.id),
          date: dialogMessage.date,
        });
      }

      const combinedMessages = getCombinedMessages(dialogMessages);
      const stage = combinedMessages.filter(
        (m) => m.fromId === String(user.id)
      ).length;
      if (stage > 25) {
        await updateBlockedDialogue(accountId, dialogId, 'dialogs-max-stage');
        await deleteMessages(client, accountId, user.id, user.accessHash);
        continue;
      }

      const dialogData = {
        ...user,
        ...dialogDb,
        stage,
        groupId,
        messages: dialogMessages,
      };

      if (dialogData.stopped || manualControlDialogIds.includes(dialogId)) {
        manualDialogs.push(dialogData);
      } else if (dialogIds.includes(dialogId)) {
        dialogs.push(dialogData);
      } else {
        pingDialogs.push(dialogData);
      }
    } else {
      await updateBlockedDialogue(accountId, dialogId, `user-not-resolved`);

      if (user && user.id && user.accessHash) {
        await deleteMessages(client, accountId, user.id, user.accessHash);
      }
    }
  }

  return [dialogs, pingDialogs, manualDialogs];
};
