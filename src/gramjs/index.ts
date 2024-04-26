import BigInt from "big-integer";
import GramJs from "./tl/api";
import CallbackSession from "./sessions/CallbackSession";
import TelegramClient from "./client/TelegramClient";

import { Logger } from "./extensions/index";
import { Account } from "../@types/Account";
import { getDialogFromDb } from "../methods/dialogs/getDialogFromDb";

const DEFAULT_USER_AGENT = "Unknown UserAgent";
const DEFAULT_PLATFORM = "Unknown platform";

Logger.setLevel("warn");

export async function init(accountData: Account, onUpdate: any) {
    const { dcId, dc1, dc2, dc3, dc4, dc5, platform, userAgent } = accountData;
    const keys: Record<string, string> = {};

    if (dc1) {
        keys["1"] = dc1;
    }
    if (dc2) {
        keys["2"] = dc2;
    }
    if (dc3) {
        keys["3"] = dc3;
    }
    if (dc4) {
        keys["4"] = dc4;
    }
    if (dc5) {
        keys["5"] = dc5;
    }

    const sessionData = {
        mainDcId: Number(dcId),
        keys,
        hashes: {},
    };
    const session = new CallbackSession(sessionData, () => {});

    const client = new TelegramClient(
        session,
        2496,
        "8da85b0d5bfe62527e5b244c209159c3",
        {
            deviceModel: userAgent || DEFAULT_USER_AGENT,
            systemVersion: platform || DEFAULT_PLATFORM,
            appVersion: `${Math.floor(Math.random() * 10)}.${Math.floor(
                Math.random() * 10
            )}.${Math.floor(Math.random() * 10)} A`,
            useWSS: true,
            additionalDcsDisabled: false,
            shouldDebugExportedSenders: undefined,
            shouldForceHttpTransport: undefined,
            shouldAllowHttpTransport: true,
            testServers: false,
            dcId: undefined,
            langCode: "en",
        }
    );

    if (!client) {
        throw new Error("Client not inited");
    }

    await client.start({
        initialMethod: "qrCode",
        shouldThrowIfUnauthorized: true,
        webAuthToken: undefined,
        mockScenario: undefined,

        phoneNumber: () => Promise.resolve(""),
        phoneCode: () => Promise.resolve(""),
        password: () => Promise.resolve(""),
        firstAndLastNames: () => Promise.resolve() as any,
        qrCode: () => Promise.resolve(),
        onError: (e) =>
            console.log(
                `Start ${accountData.accountId} account error: ${e.message}`
            ),
        webAuthTokenFailed: () =>
            console.log(`Web Auth Token Failed ${accountData.accountId}`),
    });

    client.addEventHandler(
        (update: any) => {
            if (!(update instanceof GramJs.UpdatesTooLong)) {
                const updates = "updates" in update ? update.updates : [update];
                updates.forEach(async (update: any) => {
                    if (
                        update instanceof GramJs.UpdateNewMessage ||
                        update instanceof GramJs.UpdateShortMessage
                    ) {
                        const {
                            userId: varUserId,
                            message: {
                                peerId: { userId: peerUserId } = {} as any,
                            } = {},
                        } = update as any;
                        const userId = varUserId || peerUserId;

                        const isDialogInDb = await getDialogFromDb(
                            accountData.accountId,
                            String(userId)
                        );

                        if (isDialogInDb && userId instanceof BigInt) {
                            onUpdate(userId);
                        }
                    }
                });
            }
        },
        {
            build: (update: object) => update,
        }
    );

    return client;
}
