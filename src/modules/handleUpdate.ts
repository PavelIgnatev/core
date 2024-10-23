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
    const isDialogInDb = await getDialogue(accountId, String(userId));

    if (isDialogInDb && userId instanceof BigInt) {
      console.log(
        `[${accountId}]`,
        yellow(
          `New message "${update.message}" from user by id#${String(userId)}`
        )
      );

      newResponseUpdate();
    } else if (update.className !== 'UpdateConnectionState') {
      await sendToBot(
        `Событие ${update instanceof GramJs.UpdateNewMessage}:${update instanceof GramJs.UpdateShortMessage}:${update.className}`
      );

      if (
        update.className === 'UpdateNewMessage' ||
        update.className === 'UpdateShortMessage'
      ) {
        await sendToBot(`Событие ${JSON.stringify(update)}`);
      }
    }
  } else if (update.className !== 'UpdateConnectionState') {
    console.log(
      `[${accountId}]`,
      yellow(`Update handler 2: "${update.className}"`)
    );
  }
};
