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

  prefix?: string;

  twoFa?: boolean;
  unknownTwoFa?: boolean;

  spamBlockDate?: Date | 'INFINITY';

  remainingTime?: string;
}
