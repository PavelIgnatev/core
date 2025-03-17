export interface Account {
  accountId: string;

  dcId: number;
  dc1: string;
  dc2: string;
  dc3: string;
  dc4: string;
  dc5: string;

  id?: string;
  username?: string;

  banned?: boolean;
  setuped?: boolean;

  nextApiId?: number;

  prefix?: string;

  twoFa?: boolean;
  unknownTwoFa?: boolean;

  spamBlockDate?: Date | 'INFINITY';
  checkDate?: Date;

  spamBlockReasons?: {
    reason: string;
    date: Date;
  }[];

  remainingTime?: string;
}
