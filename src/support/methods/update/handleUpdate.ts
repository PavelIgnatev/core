import GramJs from '../../../gramjs/tl/api';
import { sendToMainBot } from '../../helpers/sendToMainBot';

export const handleUpdate = async (accountId: string, update: any) => {
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
    }
  }
};
