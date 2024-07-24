import "dotenv/config";
import util from "util";

import { exec as childExec } from "child_process";
import { black, red, yellow } from "colors/safe";

import { getAccountById, getAccounts, updateAccountById } from "./db/accounts";

import { initClient } from "./helpers/initClient";
import { sendToBot } from "./helpers/sendToBot";

import { usersMe } from "./methods/users/usersMe";
import { setOffline } from "./methods/account/setOffline";

import { autoResponse } from "./modules/autoResponse";
import { autoSender } from "./modules/autoSender";
import { accountSetup } from "./modules/accountSetup";

import TelegramClient from "./common/gramjs/client/TelegramClient";

import "./helpers/setConsole.log";

const exec = util.promisify(childExec);
const promises: Promise<any>[] = [];
const accountsInWork: Record<string, number> = {};

const main = async (ID: string) => {
  let isAutoResponse = true;
  let client: TelegramClient | null = null;
  let setOnlineInterval: any = null;

  try {
    const account = await getAccountById(ID);
    if (!account) {
      throw new Error("Account not defined");
    }

    const {
      accountId,
      dcId,
      platform,
      userAgent,
      setuped = false,
      id,
      firstName,
    } = account;

    if (![accountId, dcId, platform, userAgent].every(Boolean)) {
      throw new Error("Insufficient number of parameters to start");
    }

    client = await initClient(account, ID, () => (isAutoResponse = true));

    const tgFirstName = await accountSetup(
      client,
      accountId,
      setuped,
      firstName
    );
    const tgAccountId = await usersMe(client, accountId, id);

    setOnlineInterval = setInterval(() => {
      setOffline(client, accountId, false);
    }, 60000);

    for (let i = 0; i < 30; i++) {
      accountsInWork[ID] = i + 1;

      console.log(`[${accountId}]`, yellow(`Init iteration [${i + 1}]`));

      let timer;
      const startTime = performance.now();
      const timeout = new Promise(
        (_, rej) =>
          (timer = setTimeout(
            () =>
              rej(
                new Error(`Iteration [${i + 1}] took longer than 10 minutes.`)
              ),
            600000
          ))
      );

      await Promise.race([
        (async () => {
          const account = await getAccountById(ID);
          if (!account) {
            throw new Error("Account not defined");
          }

          if (isAutoResponse) {
            isAutoResponse = false;
            await autoResponse(client, accountId, tgAccountId, tgFirstName);
          }

          await autoSender(
            client,
            accountId,
            tgAccountId,
            account.remainingTime || null
          );

          await new Promise((res) => setTimeout(res, 60000));

          const endTime = performance.now();
          const diffTime = Math.floor((endTime - startTime) / 1000);
          console.log(
            `[${accountId}]`,
            yellow(`End iteration [${i + 1}][${diffTime}s]`)
          );
        })(),
        timeout,
      ]);

      clearTimeout(timer);
    }
  } catch (e: any) {
    console.log(red(`[${ID}] Main error: ${e.message}`));

    if (e.message.includes("AUTH_KEY_DUPLICATED")) {
      await updateAccountById(ID, {
        banned: true,
        reason: "AUTH_KEY_DUPLICATED",
      });
      await sendToBot(`!!!AUTH_KEY_DUPLICATED!!! ID: ${ID}`);
      await exec("pm2 kill");
    } else if (e.message.includes("Global Error")) {
    } else if (e.message.includes("Stopped")) {
      await updateAccountById(ID, {
        stopped: true,
      });
    } else {
      await sendToBot(
        `!!!НЕИЗВЕСТНАЯ ОШИБКА!!! ID: ${ID}; Error: ${e.message}`
      );
    }
  }

  delete accountsInWork[ID];

  if (setOnlineInterval) {
    clearInterval(setOnlineInterval);
  }

  if (client) {
    await client.destroy();
  }

  return;
};

getAccounts().then((accounts) => {
  // accounts.forEach((accountId: string) => {
  promises.push(
    main("dfcc64c9-23d3-4cf3-8577-09d404af8d82-25906101-uk-test-50")
  );
  // });

  Promise.all(promises).then(async () => {
    await sendToBot(`____________________________
all proccess done
____________________________`);
    process.exit(1);
  });

  setInterval(() => {
    console.log(
      black(JSON.stringify(accountsInWork)),
      yellow(String(Object.keys(accountsInWork).length))
    );
  }, 60000);
});
