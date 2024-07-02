import "dotenv/config";
import util from "util";

import { exec as childExec } from "child_process";

import { getAccountById, getAccounts, updateAccountById } from "./db/accounts";

import { initClient } from "./helpers/initClient";
import { sendToBot } from "./helpers/sendToBot";

import { usersMe } from "./methods/users/usersMe";
import { setOffline } from "./methods/account/setOffline";

import { autoResponse } from "./modules/autoResponse";
import { autoSender } from "./modules/autoSender";
import { accountSetup } from "./modules/accountSetup";

const exec = util.promisify(childExec);
const promises: Promise<any>[] = [];

const main = async (ID: string) => {
  while (true) {
    try {
      let isAutoResponse = true;
      const account = await getAccountById(ID);

      if (!account) {
        await sendToBot(`Account from getAccountById by id ${ID} not defined`);

        return;
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

      const client = await initClient(
        account,
        ID,
        () => (isAutoResponse = true)
      );

      // const tgFirstName = await accountSetup(
      //   client,
      //   accountId,
      //   setuped,
      //   firstName
      // );
      // const tgAccountId = await usersMe(client, accountId, id);

      for (let i = 0; i < 30; i++) {
        // if (i % 5 === 0) {
          await setOffline(client, false);
        // }

        // const account = await getAccountById(ID);
        // if (!account) {
        //   await sendToBot(
        //     `Account from getAccountById by id ${ID} not defined`
        //   );

        //   return;
        // }

        // if (isAutoResponse) {
        //   isAutoResponse = false;
        //   await autoResponse(client, accountId, tgAccountId, tgFirstName);
        // }

        // await autoSender(client, accountId, tgAccountId, account.remainingTime);
        await new Promise((res) => setTimeout(res, 60000));
      }
      return;
    } catch (e: any) {
      console.error(`MAIN ERROR (${ID}): ${e.message}; ${new Date()}`);

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
      break;
    }
  }
};
getAccounts().then((accounts) => {
  accounts.forEach((accountId: string) => {
    promises.push(main(accountId));
  });

  Promise.all(promises).then(async () => {
    await sendToBot(`____________________________
all proccess done
____________________________`);
    process.exit(1);
  });
});
