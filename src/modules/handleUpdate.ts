import GramJs from '../common/gramjs/tl/api';

import { getDialogue } from '../db/dialogues';
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

  if (update.className === 'UpdateConnectionState') {
    console.warn({
      accountId,
      message: `<${update.className}>`,
      payload: JSON.parse(JSON.stringify(update)),
    });
    return;
  }

  console.log({
    accountId,
    message: `<${update.className}>`,
    payload: JSON.parse(JSON.stringify(update)),
  });

  if (update.className === 'UpdateUserStatus') {
    return;
  }

  const userId = findValue(update, 'userId');

  if (userId) {
    if (
      update instanceof GramJs.UpdateNewMessage ||
      update instanceof GramJs.UpdateShortMessage
    ) {
      const dialog = await getDialogue(accountId, String(userId));
      if (dialog) {
        onNewMessage();
      } else if (String(userId) !== '178220800') {
        await sendToBot(`Не найден диалог в дб для: ${JSON.stringify(update)}
AccountId: ${accountId}`);
      }
    } else if (update instanceof GramJs.UpdateReadHistoryOutbox) {
      // const dialog = await getDialogue(accountId, String(userId));
      // console.log(dialog, update);
    }
  }
};
