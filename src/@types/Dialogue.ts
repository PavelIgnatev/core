export interface Dialogue {
  _id?: string;

  groupId: number;
  accountId: string;
  recipientId: string;
  recipientUsername: string;
  recipientTitle: string;
  recipientBio: string | null;
  recipientPhone: string | null;
  messages: Array<string>;

  viewed?: boolean;
  blocked?: boolean;

  dateCreated: Date;
}
