export interface Dialogue {
  groupId: string;
  accountId: string;
  recipientId: string;
  recipientUsername: string;
  recipientTitle: string;
  recipientBio: string | null;
  recipientPhone: string | null;
  messages: Array<{ id: number; text: string; fromId: string; date: number }>;

  viewed?: boolean;
  blocked?: boolean;

  dateCreated?: Date;
  dateUpdated?: Date;
}
