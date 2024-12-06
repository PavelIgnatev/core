export interface Dialogue {
  groupId: string;
  accountId: string;
  recipientId: string;
  recipientUsername: string;
  recipientTitle: string;
  recipientBio: string | null;
  recipientPhone: string | null;
  messages: Array<{ id: number; text: string; fromId: string; date: number }>;

  aiName?: string;
  aiGender?: string;

  reason?: string;
  automaticReason?: string;

  viewed?: boolean;
  blocked?: boolean;

  dateCreated?: Date;
  dateUpdated?: Date;
}
