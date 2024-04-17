import util from "util";
import { exec as childExec } from "child_process";

import { Account } from "../@types/Account";

import { init } from "../telegram";

import { updateAiAccount } from "../methods/accounts/updateAiAccount";

const exec = util.promisify(childExec);

export const initClient = async (account: Account, onUpdate: any) => {
  try {
    const client = await init(account, onUpdate);

    return client;
  } catch (e: any) {
    console.log(e.message);

    if (
      [
        "USER_DEACTIVATED_BAN",
        "AUTH_KEY_UNREGISTERED",
        "AUTH_KEY_INVALID",
        "USER_DEACTIVATED",
        "SESSION_REVOKED",
        "SESSION_EXPIRED",
        "AUTH_KEY_PERM_EMPTY",
        "AUTH_KEY_DUPLICATED",
      ].includes(e.message)
    ) {
      await updateAiAccount(account.accountId, { banned: true });
      await exec(`pm2 stop ${account.accountId}`);
    }
  }
};
