import BigInt from "big-integer";
import GramJs from "./tl/api";
import CallbackSession from "./sessions/CallbackSession";
import TelegramClient from "./client/TelegramClient";

import { Logger as GramJsLogger } from "./extensions/index";
import { Account } from "../@types/Account";
import { getDialogFromDb } from "../methods/dialogs/getDialogFromDb";

const DEFAULT_USER_AGENT = "Unknown UserAgent";
const DEFAULT_PLATFORM = "Unknown platform";

GramJsLogger.setLevel("warn");

export const getProxy = async (accountId: string) => {
  while (true) {
    try {
      const response = await fetch(
        `${process.env.BACKEND_URL}/proxy/${accountId}`
      );
      const proxy = await response.json();

      if (
        proxy &&
        proxy?.server &&
        proxy?.port &&
        proxy?.login &&
        proxy?.password
      ) {
        return proxy;
      } else {
        console.log("Proxy for account not found");
        await new Promise((res) => setTimeout(res, 10000));
      }
    } catch (error) {
      console.log(`Proxy Error: ${error}`);
      await new Promise((res) => setTimeout(res, 1500));
    }
  }
};

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
  const { server, port, login, password } = await getProxy(
    accountData.accountId
  );
  if (!server || !port || !login || !password) {
    throw new Error("ОШИБКА ПРОКСИ!");
  }
  const proxy = `http://${login}:${password}@${server}:${port}`;
  console.log(accountData.accountId, proxy);

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
      proxy,
    }
  );

  if (!client) {
    throw new Error("Client not inited");
  }

  await client.start();

  client.addEventHandler(
    (update: any) => {
      if (update instanceof GramJs.UpdatesTooLong) {
        throw new Error("Updates too long");
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
