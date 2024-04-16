import type { Api } from "..";

import type { BotAuthParams, UserAuthParams } from "./auth";
import type { uploadFile, UploadFileParams } from "./uploadFile";
import type { TwoFaParams, TmpPasswordResult } from "./2fa";

declare class TelegramClient {
  constructor(...args: any);

  async start(authParams: UserAuthParams | BotAuthParams);

  async invoke<R extends Api.AnyRequest>(request: R): Promise<R["__response"]>;

  async uploadFile(
    uploadParams: UploadFileParams
  ): ReturnType<typeof uploadFile>;

  // Untyped methods.
  [prop: string]: any;
}

export default TelegramClient;
