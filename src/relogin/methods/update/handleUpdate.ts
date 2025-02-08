import BigInt from 'big-integer';

import { TelegramClient } from '../../../gramjs';
import GramJs from '../../../gramjs/tl/api';
import { updateAccountById } from '../../db/accounts';
import { deleteHistory } from '../messages/deleteHistory';

export const handleUpdate = async (
  client: TelegramClient | null,
  accountId: string,
  update: any
) => {
  if (!update || !client) {
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
      prefix: client._prefix,
      message: '[TELEGRAM_SERVICE_NOTIFICATION]',
      payload: JSON.parse(JSON.stringify(update)),
    });

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

    await updateAccountById(accountId, {
      lastServiceNotification: new Date(),
    });

    return;
  }

  console.log({
    accountId,
    prefix: client._prefix,
    message: `<${update.className}>`,
    payload: JSON.parse(JSON.stringify(update)),
  });
};
