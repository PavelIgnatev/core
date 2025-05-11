import type {
  TmpPasswordResult,
  TwoFaParams,
  updateTwoFaSettings,
} from './2fa';
import type { BotAuthParams } from './auth';
import type { uploadFile, UploadFileParams } from './uploadFile';

import type { Api } from '..';

declare class TelegramClient {
  constructor(session: any,
    apiId: number,
    deviceMode: string,
    systemVersion: string,
    appVersion: string,
    langCode: string,
    langPack: string,
    systemLangCode: string,
    acountId: string,
    prefix: string,
    specialDcId: number | null,
    proxy: string | null,
    onError: (error: any) => void,
    onTraffic?: (type: 'sent' | 'received', bytes: number, timestamp: number) => void)
  async start();

  async invoke<R extends Api.AnyRequest>(request: R): Promise<R['__response']>;

  async uploadFile(
    uploadParams: UploadFileParams
  ): ReturnType<typeof uploadFile>;

  async updateTwoFaSettings(
    Params: TwoFaParams
  ): ReturnType<typeof updateTwoFaSettings>;

  async getTmpPassword(
    currentPassword: string,
    ttl?: number
  ): Promise<TmpPasswordResult>;

  // Untyped methods.
  [prop: string]: any;
}

export default TelegramClient;
