export type TelegramLoginUpdate = {
  className: 'UpdateShortMessage' | 'UpdateNewMessage';
  userId: string | number;
  message?: string;
};

export interface LoginCodeHandler {
  promise: Promise<string>;
  handleUpdate: (update: TelegramLoginUpdate) => void;
}

export interface LoginCodeResult {
  code?: string;
  error?: string;
  phoneCodeHash?: string;
  usedApiId?: number;
}
