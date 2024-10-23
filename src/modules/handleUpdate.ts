import BigInt from 'big-integer';

import GramJs from '../common/gramjs/tl/api';

import { yellow } from 'colors/safe';
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

  console.log(
    `[${accountId}]`,
    yellow(`Update handler: "${update.className}"`)
  );

  if (
    update.className === 'UpdateConnectionState' ||
    update.className === 'UpdateUserStatus'
  ) {
    return;
  }

  const userId = findValue(update, 'userId');

  if (userId) {
    if (
      update instanceof GramJs.UpdateNewMessage ||
      update instanceof GramJs.UpdateShortMessage
    ) {
      const isDialogInDb = await getDialogue(accountId, String(userId));
      if (isDialogInDb) {
        console.log(
          `[${accountId}]`,
          yellow(
            `New message "${update.message}" from user by id#${String(userId)}`
          )
        );

        onNewMessage();
      } else if (String(userId) !== '178220800') {
        await sendToBot(`Не найден диалог в дб для: ${JSON.stringify(update)}`);
      }
    }
  }
};
