import "dotenv/config";
import util from "util";
import { exec as childExec } from "child_process";

import { initClient } from "./helpers/initClient";

import { getAccountData } from "./methods/accounts/getAccountData";
import { usersMe } from "./methods/users/usersMe";

import { autoResponse } from "./modules/autoResponse";
import { autoSender } from "./modules/autoSender";
import { accountSetup } from "./modules/accountSetup";
import { updateAuthorizations } from "./modules/updateAuthorizations";
import { getAccountsIds } from "./methods/accounts/getAccountsIds";
import { setOffline } from "./methods/accounts/setOffline";
import { updateAiAccount } from "./methods/accounts/updateAiAccount";
import { sendToBot } from "./helpers/sendToBot";

const exec = util.promisify(childExec);
const promises: Promise<any>[] = [];

const main = async (ID: string, proxyIndex: number) => {
  while (true) {
    try {
      let isAutoResponse = true;
      const accountData = await getAccountData(ID);
      const { dcId, platform, userAgent, accountId } = accountData;

      if (![dcId, platform, userAgent, accountId].every(Boolean)) {
        throw new Error("Insufficient number of parameters to start");
      }

      const client = await initClient(
        accountData,
        proxyIndex,
        () => (isAutoResponse = true)
      );

      await updateAuthorizations(client, accountData);
      await accountSetup(client, accountData);

      const {
        fullUser: { id: meFullUserId },
        users,
      } = await usersMe(client);
      const meFullUser = users[0];

      for (let i = 0; i < 30; i++) {
        if (i % 5 === 0) {
          await setOffline(client, false);
        }

        const accountData = await getAccountData(ID);

        if (isAutoResponse) {
          isAutoResponse = false;
          await autoResponse(client, accountData, meFullUser);
        }

        await autoSender(client, accountData, String(meFullUserId));
        await new Promise((res) => setTimeout(res, 60000));
      }
      return;
    } catch (e: any) {
      console.error(`MAIN ERROR (${ID}): ${e.message}`);

      if (e.message.includes("AUTH_KEY_DUPLICATED")) {
        await updateAiAccount(ID, {
          banned: true,
          reason: "AUTH_KEY_DUPLICATED",
        });
        await sendToBot(`!!!AUTH_KEY_DUPLICATED!!!
ID: ${ID}
ВСЕ ПРОЦЕССЫ ОСТАНОВЛЕНЫ НАХУЙ! `);
        await exec("pm2 kill");
      }

      if (e.message.includes("Global Error")) {
        break;
      }

      if (e.message.includes("Stopped")) {
        await updateAiAccount(ID, {
          stopped: true,
        });
        break;
      }

      await new Promise((res) => setTimeout(res, 5000));
    }
  }
};

getAccountsIds().then((accounts) => {
  accounts.forEach((account: any, index: number) => {
    if (!account.banned && !account.stopped) {
      promises.push(main(account.accountId, index + 1));
    }
  });

  Promise.all(promises).then(() => process.exit(1));
});
