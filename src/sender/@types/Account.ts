import { ObjectId } from 'mongodb';

export interface Account {
  _id: ObjectId;
  accountId: string;

  dcId: number;
  dc1: string;
  dc2: string;
  dc3: string;
  dc4: string;
  dc5: string;

  userAgent: string;
  platform: string;

  id?: string;

  firstName?: string;
  lastName?: string;
  username?: string;
  messageCount?: number;
  aiContactCount?: number;

  nextApiId?: number;

  spamBlockDate?: Date | 'INFINITY';
  spamBlockInitDate?: Date;
  spamBlockDays?: number;

  historySpamBlocks?: Array<{
    spamBlockDate: Date | 'INFINITY';
    spamBlockDays: number;
    historySpamBlocks?: Array<{
      spamBlockDate: string | Date;
      spamBlockDays: number;
    }>;
    spamBlockInitDate?: Date;
  }>;

  banned?: boolean;
  setuped?: boolean;

  twoFa?: boolean;
  unknownTwoFa?: boolean;

  remainingTime?: string;
}
