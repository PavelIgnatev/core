import GramJs from '../common/gramjs/tl/api';

import { getDialogue, updateDialogue } from '../db/dialogues';

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

  if (
    update.className === 'UpdateConnectionState' ||
    update.className === 'UpdateUserStatus'
  ) {
    if (process.env.DEV !== 'true') {
      return;
    }
  }

  console.log({
    accountId,
    message: `<${update.className}>`,
    payload: JSON.parse(JSON.stringify(update)),
  });

  const userId = findValue(update, 'userId');

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
