export interface GroupId {
  groupId: string;
  addedInformation: string;
  addedQuestion: string;
  aiRole: string;
  goal: string;
  companyDescription: string;

  currentCount: number;
  target: number;

  part?: string;
  language?: 'RUSSIAN' | 'ENGLISH' | 'UKRAINIAN';
  flowHandling?: string;
  messagesCount?: number;
  firstMessagePrompt?: string;
  secondMessagePrompt?: string;

  dateUpdated: Date;
}
