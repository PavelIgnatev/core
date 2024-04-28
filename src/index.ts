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

const promises: Promise<any>[] = [];

const main = async (ID: string) => {
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

      await new Promise((res) => setTimeout(res, 5000));
    }
  }
};

// getAccountsIds().then((ids) => {
[
  "+447529621062",
  "+447529621063",
  "+447529621089",
  "0e495973-2537-4d5d-9e8f-530d5e428591-25906032-uk-test-50",
  "112829314-rus-support",
  "112834951-rus-support",
].forEach((id: string) => promises.push(main(id)));

Promise.all(promises).then(() => process.exit(1));
// });
