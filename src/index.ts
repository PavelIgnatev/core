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
import { addAiContact } from "./modules/addAiContact";

const exec = util.promisify(childExec);

const main = async () => {
  const { ID } = process.env;
  if (!ID) throw new Error("ID not defined");

  let isAutoResponse = true;
  const accountData = await getAccountData(ID);
  const { dcId, platform, userAgent, accountId } = accountData;

  if (![dcId, platform, userAgent, accountId].every(Boolean)) {
    throw new Error("Insufficient number of parameters to start");
  }

  const client = await initClient(accountData, () => (isAutoResponse = true));

  await updateAuthorizations(client, accountData);
  await accountSetup(client, accountData);

  const {
    fullUser: { id: meFullUserId },
    users,
  } = await usersMe(client);
  const meFullUser = users[0];

  for (let i = 0; i < 60; i++) {
    const accountData = await getAccountData(ID);

    if (isAutoResponse) {
      isAutoResponse = false;
      await autoResponse(client, accountData, meFullUser);
    }

    await addAiContact(client, accountData);
    await autoSender(client, accountData, String(meFullUserId));
    await new Promise((res) => setTimeout(res, 60000));
  }

  await exec(`pm2 restart ${accountId}`);
};

main()
