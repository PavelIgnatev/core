import BigInt from 'big-integer';

import GramJs from '../common/gramjs/tl/api';

import { yellow } from 'colors/safe';
import { getDialogue } from '../db/dialogues';

export const handleUpdate = async (
  accountId: string,
  update: any,

  newResponseUpdate: () => void
) => {
    console.log(update)
//   if (
//     update instanceof GramJs.UpdateNewMessage ||
//     update instanceof GramJs.UpdateShortMessage
//   ) {
//     const {
//       userId: varUserId,
//       message: { peerId: { userId: peerUserId } = {} as any } = {},
//     } = update as any;
//     const userId = varUserId || peerUserId;
//     const isDialogInDb = await getDialogue(accountId, String(userId));

//     if (isDialogInDb && userId instanceof BigInt) {
//       console.log(
//         `[${accountId}]`,
//         yellow(
//           `New message "${update.message}" from user by id#${String(userId)}`
//         )
//       );

//       newResponseUpdate();
//     } else if (update.className !== 'UpdateConnectionState') {
//       console.log(`[${accountId}]`, update);
//     }
//   } else if (update.className !== 'UpdateConnectionState') {
//     console.log(`[${accountId}]`, update);
//   }
};
