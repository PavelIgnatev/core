import { exec } from 'child_process';
import TelegramClient from '../gramjs/client/TelegramClient';

export function main(
  accountId: string,
  accountsInWork: Record<string, number>,
  exec: typeof exec
): Promise<TelegramClient | null>;
