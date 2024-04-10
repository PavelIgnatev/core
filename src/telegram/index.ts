import BigInt from "big-integer";
import util from "util";
import { exec as childExec } from "child_process";

import GramJs from "./tl/api";
import CallbackSession from "./sessions/CallbackSession";
import TelegramClient from "./client/TelegramClient";

import { Logger as GramJsLogger } from "./extensions/index";
import { CustomFile } from "./CustomFile";
import { Account } from "../@types/Account";
import { getDialogFromDb } from "../methods/dialogs/getDialogFromDb";

const DEFAULT_USER_AGENT = "Unknown UserAgent";
const DEFAULT_PLATFORM = "Unknown platform";
const exec = util.promisify(childExec);

GramJsLogger.setLevel("warn");

let accountId: string;
let client: TelegramClient;
let onUpdate: any;

export function handleGramJsUpdate(update: any) {
  if (update instanceof GramJs.UpdatesTooLong) {
    exec(`pm2 restart ${accountId}`);
  } else {
    const updates = "updates" in update ? update.updates : [update];
    updates.forEach(async (update: any) => {
      if (
        update instanceof GramJs.UpdateNewMessage ||
        update instanceof GramJs.UpdateShortMessage
      ) {
        const {
          userId: varUserId,
          message: { peerId: { userId: peerUserId } = {} as any } = {},
        } = update as any;
        const userId = varUserId || peerUserId;

        const isDialogInDb = await getDialogFromDb(accountId, String(userId));

        if (isDialogInDb && userId instanceof BigInt) {
          onUpdate(userId);
        }
      }
    });
  }
}

export async function init(accountData: Account, _onUpdate: any) {
  const { dcId, dc1, dc2, dc3, dc4, dc5, platform, userAgent } = accountData;

  const keys: Record<string, string> = {};
  onUpdate = _onUpdate;

  accountId = accountData.accountId;

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

  client = new TelegramClient(
    session,
    2496,
    "8da85b0d5bfe62527e5b244c209159c3",
    {
      deviceModel: userAgent || DEFAULT_USER_AGENT,
      systemVersion: platform || DEFAULT_PLATFORM,
      appVersion: `10.14.9 A`,
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

  await client.start({
    phoneNumber: () => Promise.reject(),
    phoneCode: () => Promise.reject(),
    password: () => Promise.reject(),
    firstAndLastNames: () => Promise.reject(),
    qrCode: () => Promise.reject(),
    onError: () => {},
    webAuthTokenFailed: () => {},
    initialMethod: "qrCode",
    shouldThrowIfUnauthorized: Boolean(sessionData),
    webAuthToken: undefined,
    mockScenario: undefined,
  });

  client.addEventHandler(handleGramJsUpdate, {
    build: (update: object) => update,
  });
}

export async function invokeRequest(request: any) {
  try {
    const randomDelay = Math.floor(Math.random() * 500) + 2000;
    console.log(
      `Random delay ${randomDelay}ms before action execution: ${request.className}`
    );
    await new Promise((r) => setTimeout(r, randomDelay));

    const result = await client.invoke(request);
    return result;
  } catch (err: any) {
    throw err;
  }
}

export function uploadFile(file: CustomFile) {
  return client.uploadFile({ file });
}
