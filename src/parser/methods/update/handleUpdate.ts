import { TelegramClient } from '../../../gramjs';
import GramJs from '../../../gramjs/tl/api';
import { updateAccountById } from '../../db/accounts';
import { clearAuthorizations } from '../account/clearAuthorizations';

export const handleUpdate = async (
  client: TelegramClient | null,
  accountId: string,
  forceClearAuth: boolean,
  update: any
) => {
  if (!update || !client) {
    return;
  }

  if (
    update.className === 'UpdateConnectionState' ||
    update.className === 'UpdateUserStatus' ||
    update.className === 'UpdateUserTyping' ||
    update.className === 'Pong'
  ) {
    if (process.env.DEV !== 'true') {
      return;
    }
  }

  if (
    update instanceof GramJs.UpdateShortMessage &&
    String(update.userId) === '777000'
  ) {
    console.warn({
      accountId,
      prefix: client._prefix,
      message: '[TELEGRAM_SERVICE_NOTIFICATION]',
      payload: JSON.parse(JSON.stringify(update)),
    });

    if (forceClearAuth && client) {
      [0.05, 0.15, 0.25, 0.5, 1, 1.5, 2.5, 5].forEach((minutes) => {
        setTimeout(
          async () => {
            try {
              await clearAuthorizations(client);
            } catch {}
          },
          minutes * 60 * 1000
        );
      });

      await updateAccountById(accountId, {
        lastServiceNotification: new Date(),
      });
    }

    return;
  }

  console.log({
    accountId,
    prefix: client._prefix,
    message: `<${update.className}>`,
    payload: JSON.parse(JSON.stringify(update)),
  });
};
