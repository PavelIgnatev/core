import "dotenv/config";

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
