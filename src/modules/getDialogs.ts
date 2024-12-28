import BigInt from 'big-integer';

import { Dialogue } from '../@types/Dialogue';
import GramJs from '../common/gramjs/tl/api';
import {
  getDialogue,
  getManualControlDialogues,
  getPingDialogues,
  updateAutomaticDialogue,
} from '../db/dialogues';
import { getCombinedMessages } from '../helpers/getCombinedMessages';
import { editFolder } from '../methods/folders/editFolder';
import { getAccountById } from '../db/accounts';
import { sendToBot } from '../helpers/sendToBot';

type Message = GramJs.Message & { peerId: GramJs.PeerUser };
type Dialog = GramJs.Dialog & { peer: GramJs.PeerUser };

export const getDialogs = async (client: any, accountId: string) => {
  const clientDialogs = await client.invoke(
    new GramJs.messages.GetDialogs({
      offsetPeer: new GramJs.InputPeerEmpty(),
      folderId: 1,
      limit: 100,
    })
  );

  if (!clientDialogs?.users?.length) {
    return [[], [], []];
  }
  const account = await getAccountById(accountId);
  if (!account) {
    throw new Error('Account not defined');
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
      const dialogDb = await getDialogue(accountId, String(user.id));
      const {
        messages: dialogMessages = [],
        groupId,
        blocked = false,
        reason = null,
        automaticReason = null,
      } = dialogDb || {};

      if (!dialogDb || !groupId || blocked || reason || automaticReason) {
        await sendToBot(`** GET DIALOGS ERROR **
ID: ${accountId}
RID: ${String(user.id)}
STATUS: ${dialogDb}:${groupId}:${blocked}:${reason}:${automaticReason}`);
        await editFolder(client, String(user.id), String(user.accessHash), 0);
        continue;
      }

      const allHistory = await client.invoke(
        new GramJs.messages.GetHistory({
          peer: new GramJs.InputPeerUser({
            userId: BigInt(user.id),
            accessHash: BigInt(user.accessHash),
          }),
          limit: 30,
        })
      );
      const dialogsMessages = (allHistory?.messages || [])
        .filter((m: GramJs.Message) => m.className === 'Message')
        .reverse();
      if (!dialogsMessages.length) {
        continue;
      }
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
        await editFolder(client, String(user.id), String(user.accessHash), 0);
        await updateAutomaticDialogue(
          accountId,
          String(user.id),
          'automatic:max-stage-25'
        );
        continue;
      }

      const dialogData = {
        ...user,
        ...dialogDb,
        stage,
        groupId,
        messages: dialogMessages,
      };

      await client.invoke(
        new GramJs.messages.ReadHistory({
          peer: new GramJs.InputPeerUser({
            userId: BigInt(user.id),
            accessHash: BigInt(user.accessHash),
          }),
          maxId: 1000000,
        })
      );

      if (dialogData.stopped || manualControlDialogIds.includes(dialogId)) {
        if (!account.spamBlockDate) {
          manualDialogs.push(dialogData);
        }
      } else if (dialogIds.includes(dialogId)) {
        dialogs.push(dialogData);
      } else {
        pingDialogs.push(dialogData);
      }
    }
  }

  return [dialogs, pingDialogs, manualDialogs];
};
