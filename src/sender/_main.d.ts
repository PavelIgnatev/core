import TelegramClient from '../gramjs/client/TelegramClient';

export function main(
  accountId: string[],
): Promise<TelegramClient | null>;
