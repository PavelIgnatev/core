import "dotenv/config";
import util from "util";

import { exec as childExec } from "child_process";

import { initClient } from "./helpers/initClient";
import { sendToBot } from "./helpers/sendToBot";

import { getFullAccount } from "./methods/accounts/getFullAccount";
import { usersMe } from "./methods/users/usersMe";
import { getAccountsIds } from "./methods/accounts/getAccountsIds";
import { setOffline } from "./methods/accounts/setOffline";
import { updateAiAccount } from "./methods/accounts/updateAiAccount";

import { autoResponse } from "./modules/autoResponse";
import { autoSender } from "./modules/autoSender";
import { accountSetup } from "./modules/accountSetup";

const exec = util.promisify(childExec);
const promises: Promise<any>[] = [];

const main = async (ID: string) => {
  while (true) {
    try {
      let isAutoResponse = true;
      const account = await getFullAccount(ID);
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

      const client = await initClient(
        account,
        ID,
        () => (isAutoResponse = true)
      );

      const tgFirstName = await accountSetup(
        client,
        accountId,
        setuped,
        firstName
      );
      const tgAccountId = await usersMe(client, accountId, id);

      for (let i = 0; i < 30; i++) {
        if (i % 5 === 0) {
          await setOffline(client, false);
        }

        const account = await getFullAccount(ID);

        if (isAutoResponse) {
          isAutoResponse = false;
          await autoResponse(client, accountId, tgAccountId, tgFirstName);
        }

        await autoSender(client, accountId, tgAccountId, account.remainingTime);
        await new Promise((res) => setTimeout(res, 60000));
      }
      return;
    } catch (e: any) {
      console.error(`MAIN ERROR (${ID}): ${e.message}; ${new Date()}`);

      if (e.message.includes("AUTH_KEY_DUPLICATED")) {
        await updateAiAccount(ID, {
          banned: true,
          reason: "AUTH_KEY_DUPLICATED",
        });
        await sendToBot(`!!!AUTH_KEY_DUPLICATED!!! ID: ${ID}`);
        await exec("pm2 kill");
      } else if (e.message.includes("Global Error")) {
        break;
      } else if (e.message.includes("Stopped")) {
        await updateAiAccount(ID, {
          stopped: true,
        });
        break;
      } else {
        await sendToBot(
          `!!!НЕИЗВЕСТНАЯ ОШИБКА!!! ID: ${ID}; Error: ${e.message}`
        );
      }

      await new Promise((res) => setTimeout(res, 5000));
    }
  }
};

getAccountsIds().then((accounts) => {
  accounts.forEach((account: any) => {
    if (!account.banned && !account.stopped) {
      promises.push(main(account.accountId));
    }
  });

  Promise.all(promises).then(async () => {
    await sendToBot(`____________________________
all proccess done
____________________________`);
    process.exit(1);
  });
});
