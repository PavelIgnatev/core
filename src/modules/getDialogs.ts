import BigInt from 'big-integer';
import { yellow } from 'colors/safe';

import { Dialogue } from '../@types/Dialogue';
import GramJs from '../common/gramjs/tl/api';
import {
  getDialogue,
  getManualControlDialogues,
  getPingDialogues,
  updateBlockedDialogue,
} from '../db/dialogues';

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
      !(user.status instanceof GramJs.UserStatusEmpty)
    ) {
      const allMessages = await client.invoke(
        new GramJs.messages.GetHistory({
          peer: new GramJs.InputPeerUser({
            userId: BigInt(user.id),
            accessHash: BigInt(user.accessHash),
          }),
          limit: 30,
        })
      );

      if (!allMessages?.messages?.length) {
        await updateBlockedDialogue(accountId, dialogId, 'messages-length');
        continue;
      }

      const dialogDb = await getDialogue(accountId, String(user.id));
      const {
        messages: dialogMessages = [],
        groupId = 13228671259,
        blocked = false,
      } = dialogDb || {};

      // if not group id

      if (blocked) {
        await client.invoke(
          new GramJs.contacts.Block({
            id: new GramJs.InputPeerUser({
              userId: BigInt(user.id),
              accessHash: BigInt(user.accessHash),
            }),
          })
        );
        await client.invoke(
          new GramJs.messages.DeleteHistory({
            peer: new GramJs.InputPeerUser({
              userId: BigInt(user.id),
              accessHash: BigInt(user.accessHash),
            }),
            revoke: true,
          })
        );
        continue;
      }

      for (const dialogMessage of allMessages.messages.reverse()) {
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

      await client.invoke(
        new GramJs.messages.ReadHistory({
          peer: new GramJs.InputPeerUser({
            userId: user.id,
            accessHash: user.accessHash,
          }),
        })
      );
      const dialogData = {
        ...user,
        ...dialogDb,
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

      if (
        user &&
        user.id &&
        user.accessHash &&
        (user.deleted || user.bot || user.support || user.self)
      ) {
        await client.invoke(
          new GramJs.messages.DeleteHistory({
            peer: new GramJs.InputPeerUser({
              userId: BigInt(user.id),
              accessHash: BigInt(user.accessHash),
            }),
            revoke: true,
          })
        );
      }
    }
  }

  return [dialogs, pingDialogs, manualDialogs];
};
