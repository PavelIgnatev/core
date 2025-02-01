export interface Account {
  accountId: string;
  prefix: string;

  dcId: number;
  dc1: string;
  dc2: string;
  dc3: string;
  dc4: string;
  dc5: string;

  id?: string;
  username?: string;

  banned?: boolean;

  twoFa?: boolean;
  unknownTwoFa?: boolean;
  remainingTime?: string;

  spamBlockDate?: Date | 'INFINITY';

  recheckDates?: Date[];
  stable?: boolean;
}
