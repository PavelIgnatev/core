import BigInt from "big-integer";

import GramJs from "../../gramjs/tl/api";
import { getDialogFromDb } from "./getDialogFromDb";
import { Account } from "../../@types/Account";

export const getDialogs = async (client: any, account: Account) => {
  const allDialogs = await client.invoke(
    new GramJs.messages.GetDialogs({
      offsetPeer: new GramJs.InputPeerEmpty(),
      folderId: 1,
      limit: 100,
    })
  );

  if (!allDialogs?.users?.length) {
    return [];
  }

  const unreadDialogs = [];
  const pingedDialogs = [];
  const unansweredMessagesIds = allDialogs.messages
    .filter((message: GramJs.Message) => !message.out)
    .map((message: GramJs.Message & { peerId: GramJs.PeerUser }) =>
      String(message.peerId.userId)
    );
  const unansweredDialogsIds = allDialogs.dialogs
    .filter((dialog: GramJs.Dialog) => dialog.unreadCount !== 0)
    .map((dialog: GramJs.Dialog & { peer: GramJs.PeerUser }) =>
      String(dialog.peer.userId)
    );
  const allUnansweredDialogsIds = [
    ...new Set([...unansweredMessagesIds, ...unansweredDialogsIds]),
  ];
  // const pingedDialogsIds = allDialogs.messages
  //   .filter((message: GramJs.Message & { peerId: GramJs.PeerUser }) => {
  //     if (
  //       message.out &&
  //       Math.round(Date.now() / 1000) - message.date > 0 &&
  //       // Math.round(Date.now() / 1000) - message.date < 3600 * 24 &&
  //       !allUnansweredDialogsIds.includes(String(message.peerId.userId))
  //     ) {
  //       return true;
  //     }

  //     return false;
  //   })
  //   .map((message: GramJs.Message & { peerId: GramJs.PeerUser }) =>
  //     String(message.peerId.userId)
  //   );

  for (const unansweredDialogId of [
    ...allUnansweredDialogsIds,
    // ...pingedDialogsIds,
  ]) {
    const user = allDialogs.users.find(
      (user: GramJs.User) => String(user.id) === unansweredDialogId
    );

    if (
      user &&
      !user.deleted &&
      !user.bot &&
      !user.support &&
      !user.self &&
      !user.scam &&
      !user.fake
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
        continue;
      }

      const dialogDb = await getDialogFromDb(
        account.accountId,
        String(user.id)
      );

      const { messages: dialogMessages = [], groupId = 12343207729 } =
        dialogDb || {};

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
          text = "[FORWARDED MESSAGE]";
        } else if (dialogMessage.message) {
          text = dialogMessage.message;
        } else if (photo) {
          text = "[PHOTO]";
        } else if (video) {
          text = "[VIDEO]";
        } else if (voice) {
          await client.invoke(
            new GramJs.messages.ReadMessageContents({
              id: [dialogMessage.id],
            })
          );
          text = "[VOICE MESSAGE]";
        } else if (round) {
          await client.invoke(
            new GramJs.messages.ReadMessageContents({
              id: [dialogMessage.id],
            })
          );
          text = "[VIDEO-VOICE MESSAGE]";
        } else if (document) {
          text = "[DOCUMENT]";
        } else if (spoiler) {
          text = "[SPOILER MESSAGE]";
        } else {
          text = "[UNKNOWN MESSAGE]";
        }

        dialogMessages.push({
          id: dialogMessage.id,
          text: text,
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

      if (allUnansweredDialogsIds.includes(unansweredDialogId)) {
        unreadDialogs.push(dialogData);
      } else {
        pingedDialogs.push(dialogData);
      }
    }
  }

  return [unreadDialogs, pingedDialogs];
};
