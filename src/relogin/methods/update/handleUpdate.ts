import { TelegramClient } from '../../../gramjs';

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

  console.log({
    accountId,
    prefix: client._prefix,
    message: `<${update.className}>`,
    payload: JSON.parse(JSON.stringify(update)),
  });
};
