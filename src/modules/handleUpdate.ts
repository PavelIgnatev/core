import GramJs from '../common/gramjs/tl/api';

import {
  getDialogue,
  updateDialogue,
  updateSingleDialogue,
} from '../db/dialogues';
import { sendToBot } from '../helpers/sendToBot';

function findValue(obj: Record<string, any>, valueKey: string) {
  return (
    obj[valueKey] ||
    obj.peer?.[valueKey] ||
    obj.message?.[valueKey] ||
    obj.message?.fromId?.[valueKey] ||
    obj.message?.peer?.[valueKey] ||
    obj.message?.peerId?.[valueKey]
  );
}

export const handleUpdate = async (
  client: any,
  accountId: string,
  update: any,

  onNewMessage: () => void
) => {
  if (!update) {
    return;
  }

  const userId = findValue(update, 'userId');
  if (userId && update instanceof GramJs.UpdateUserStatus) {
    if (update.status instanceof GramJs.UserStatusOffline) {
      await updateSingleDialogue(accountId, String(userId), {
        lastOnline: update.status.wasOnline,
      });
    }
    if (update.status instanceof GramJs.UserStatusOnline) {
      await updateSingleDialogue(accountId, String(userId), {
        lastOnline: update.status.expires,
      });
    }
  }

  if (
    update.className === 'UpdateConnectionState'
    // update.className === 'UpdateUserStatus' ||
    // update.className === 'UpdateUserTyping' ||
    // update.className === 'UpdateConfig' ||
    // update.className === 'UpdateUser' ||
    // update.className === 'UpdatePrivacy' ||
    // update.className === 'UpdateUserName' ||
    // update.className.toLowerCase().includes('channel') ||
    // update.className.toLowerCase().includes('chat') ||
    // update.className.toLowerCase().includes('group')
  ) {
    if (process.env.DEV !== 'true') {
      return;
    }
  }

  //     await sendToBot(`<${update.className}>
  // ID: ${accountId}
  // PAYLOAD: ${JSON.stringify(update)}`);

  console.log({
    accountId,
    message: `<${update.className}>`,
    payload: JSON.parse(JSON.stringify(update)),
  });

  if (
    update instanceof GramJs.UpdateNewMessage ||
    update instanceof GramJs.UpdateShortMessage
  ) {
    if (userId) {
      const dialog = await getDialogue(accountId, String(userId));
      if (dialog && !dialog.reason && !dialog.automaticReason) {
        onNewMessage();
      }
    }
  } else if (
    update instanceof GramJs.UpdateReadHistoryOutbox ||
    update instanceof GramJs.UpdateReadHistoryInbox
  ) {
    if (userId && update.maxId) {
      const dialog = await getDialogue(accountId, String(userId));

      if (
        !dialog ||
        !dialog.messages ||
        !Array.isArray(dialog.messages) ||
        !dialog.messages.length
      ) {
        return;
      }

      if (dialog.messages[dialog.messages.length - 1].id === update.maxId) {
        await updateDialogue({
          accountId,
          recipientId: String(userId),
          read: true,
        } as any);
      }
    }
  }
};
