import "dotenv/config";
import util from "util";
import { exec as childExec } from "child_process";
import { getAccountData } from "./methods/accounts/getAccountData";
import { initClient } from "./helpers/initClient";
import { autoSender } from "./modules/autoSender";
import { accountSetup } from "./modules/accountSetup";
import { updateAuthorizations } from "./modules/updateAuthorizations";
import { addAiContact } from "./modules/addAiContact";
const exec = util.promisify(childExec);
const main = async () => {
  const { ID } = process.env;
  if (!ID)
    throw new Error("ID not defined");
  let isAutoResponse = true;
  const accountData = await getAccountData(ID);
  const { dcId, platform, userAgent, accountId } = accountData;
  if (![dcId, platform, userAgent, accountId].every(Boolean)) {
    throw new Error("Insufficient number of parameters to start");
  }
  await initClient(accountData, () => isAutoResponse = true);
  await updateAuthorizations(accountData);
  await accountSetup(accountData);
  for (let i = 0; i < 60; i++) {
    const accountData2 = await getAccountData(ID);
    if (isAutoResponse) {
      isAutoResponse = false;
    }
    await addAiContact(accountData2);
    await autoSender(accountData2);
    await new Promise((res) => setTimeout(res, 6e4));
  }
  await exec(`pm2 restart ${accountId}`);
};
main();
