export interface Account {
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

  banned?: boolean;
  setuped?: boolean;

  remainingTime?: string;
}
