import type { Api } from "..";

import type { uploadFile, UploadFileParams } from "./uploadFile";
import type { TwoFaParams, TmpPasswordResult } from "./2fa";

declare class TelegramClient {
  constructor(...args: any);

  async start();

  async invoke<R extends Api.AnyRequest>(request: R): Promise<R["__response"]>;

  async uploadFile(
    uploadParams: UploadFileParams
  ): ReturnType<typeof uploadFile>;

  // Untyped methods.
  [prop: string]: any;
}

export default TelegramClient;
