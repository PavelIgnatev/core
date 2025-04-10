export interface Account {
  accountId: string;

  dcId: number;
  dc1: string;
  dc2: string;
  dc3: string;
  dc4: string;
  dc5: string;

  banned?: boolean;
  nextApiId?: number;

  id?: string;
  firstName?: string;
  lastName?: string;
  username?: string;

  checkDate?: Date;
}
