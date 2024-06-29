import type {
    TmpPasswordResult,
    TwoFaParams,
    updateTwoFaSettings,
} from "./2fa";
import type { BotAuthParams } from "./auth";
import type { uploadFile, UploadFileParams } from "./uploadFile";

import type { Api } from "..";

declare class TelegramClient {
    constructor(...args: any);

    async start();

    async invoke<R extends Api.AnyRequest>(
        request: R
    ): Promise<R["__response"]>;

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

    setPingCallback(callback: () => Promise<void>);

    setForceHttpTransport: (forceHttpTransport: boolean) => void;

    setAllowHttpTransport: (allowHttpTransport: boolean) => void;

    // Untyped methods.
    [prop: string]: any;
}

export default TelegramClient;
