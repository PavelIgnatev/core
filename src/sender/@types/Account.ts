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

  id: string;
  firstName: string;
  username: string;

  lastName?: string;
  messageCount?: number;
  aiContactCount?: number;
  phone?: string

  nextApiId?: number;

  spamBlockDate?: Date | 'INFINITY';
  spamBlockInitDate?: Date;
  spamBlockDays?: number;

  status?: 'sender' | 'commenting';

  historySpamBlocks?: Array<{
    spamBlockDate: Date | 'INFINITY';
    spamBlockDays: number;
    historySpamBlocks?: Array<{
      spamBlockDate: string | Date;
      spamBlockDays: number;
    }>;
    spamBlockInitDate?: Date;
  }>;

  spamBlockReasons?: Array<{
    reason: string;
    date: Date;
  }>;

  personalChannel?: string;
  banned?: boolean;
  setuped?: boolean;

  twoFa?: boolean;
  unknownTwoFa?: boolean;
  twoFaDate?: Date;
  personalChannelDate?: Date;
  automaticCheckDate?: Date;
  lazyCheckDate?: Date;

  remainingTime?: string;

  frozenAppealDates?: Date[];
}
