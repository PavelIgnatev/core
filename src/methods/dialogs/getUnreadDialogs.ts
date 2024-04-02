import BigInt from "big-integer";

import GramJs from "../../telegram/tl/api";
import { invokeRequest } from "../../telegram";

export const getUnreadDialogs = async () => {
  const allDialogs = await invokeRequest(
    new GramJs.messages.GetDialogs({
      offsetPeer: new GramJs.InputPeerEmpty(),
      folderId: 1,
      limit: 30,
    })
  );

  if (!allDialogs?.users?.length) {
    return [];
  }

  const unreadDialogs = [];
  const unansweredMessages = allDialogs.messages.filter(
    (message: GramJs.Message) => !message.out
  );

  for (const message of unansweredMessages) {
    const user = allDialogs.users.find(
      (user: GramJs.User) => String(user.id) === String(message.peerId.userId)
    );
    if (user && !user.deleted && !user.bot && !user.support) {
      const allMessages = await invokeRequest(
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

      const dialogMessages = allMessages.messages.map(
        (message: GramJs.Message) => {
          const {
            photo = false,
            voice = false,
            round = false,
            video = false,
            document = false,
            spoiler = false,
          } = message?.media || ({} as any);
          const fromId = message?.fromId as any;

          let text;
          if (message.fwdFrom) {
            text = "[FORWARDED MESSAGE]";
          } else if (message.message) {
            text = message.message;
          } else if (photo) {
            text = "[PHOTO]";
          } else if (video) {
            text = "[VIDEO]";
          } else if (voice) {
            text = "[VOICE MESSAGE]";
          } else if (round) {
            text = "[VIDEO-VOICE MESSAGE]";
          } else if (document) {
            text = "[DOCUMENT]";
          } else if (spoiler) {
            text = "[SPOILER MESSAGE]";
          } else {
            text = "[UNKNOWN MESSAGE]";
          }

          return {
            id: message.id,
            text: text,
            fromId: String(fromId?.userId || user.id),
            date: message.date,
          };
        }
      );

      if (!dialogMessages?.length) {
        continue;
      }

      unreadDialogs.push({ ...user, messages: dialogMessages.reverse() });
    }
  }

  return unreadDialogs;
};
