import BigInt from 'big-integer';

import GramJs from '../common/gramjs/tl/api';

import { yellow } from 'colors/safe';
import { getDialogue } from '../db/dialogues';
import { sendToBot } from '../helpers/sendToBot';

export const handleUpdate = async (
  accountId: string,
  update: any,

  newResponseUpdate: () => void
) => {
  if (
    update instanceof GramJs.UpdateNewMessage ||
    update instanceof GramJs.UpdateShortMessage
  ) {
    const {
      userId: varUserId,
      message: { peerId: { userId: peerUserId } = {} as any } = {},
    } = update as any;
    const userId = varUserId || peerUserId;

    if (!userId || !(userId instanceof BigInt)) {
      await sendToBot(
        `Не найден userId для UpdateNewMessage или UpdateShortMessage ${userId instanceof BigInt}|${JSON.stringify(update)}`
      );
      return;
    }

    const isDialogInDb = await getDialogue(accountId, String(userId));
    if (isDialogInDb) {
      console.log(
        `[${accountId}]`,
        yellow(
          `New message "${update.message}" from user by id#${String(userId)}`
        )
      );

      newResponseUpdate();
    } else if (String(userId) !== '178220800') {
      await sendToBot(`Не найден диалог в дб для: ${JSON.stringify(update)}`);
    }
  } else if (update.className !== 'UpdateConnectionState') {
    console.log(
      `[${accountId}]`,
      yellow(`Update handler 2: "${update.className}"`)
    );
  }
};
