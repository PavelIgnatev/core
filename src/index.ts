import "dotenv/config";

import { initClient } from "./helpers/initClient";

import { getAccountData } from "./methods/accounts/getAccountData";
import { usersMe } from "./methods/users/usersMe";

import { autoResponse } from "./modules/autoResponse";
import { autoSender } from "./modules/autoSender";
import { accountSetup } from "./modules/accountSetup";
import { updateAuthorizations } from "./modules/updateAuthorizations";
import { addAiContact } from "./modules/addAiContact";
import { getAccountsIds } from "./methods/accounts/getAccountsIds";

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
        const accountData = await getAccountData(ID);

        if (isAutoResponse) {
          isAutoResponse = false;
          await autoResponse(client, accountData, meFullUser);
        }

        await addAiContact(client, accountData);
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

// ['+79582326098','+79582326119','+79582326127',].map((ids) => {
  ['+79582326098','+79582326119','+79582326127',].forEach((id: string) => promises.push(main(id)));

  Promise.all(promises).then(() => process.exit(1));
// });
