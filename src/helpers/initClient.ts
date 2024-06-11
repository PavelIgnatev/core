import { Account } from "../@types/Account";

import { init } from "../gramjs";

import { updateAiAccount } from "../methods/accounts/updateAiAccount";

export const initClient = async (
  account: Account,
  accountId: string,
  onUpdate: any
) => {
  try {
    const timeoutPromise = new Promise((_, reject) => {
      setTimeout(() => {
        reject(new Error("Global Error (timeout)"));
      }, 90000);
    });

    const client = await Promise.race([
      init(account, accountId, onUpdate),
      timeoutPromise,
    ]);

    if (!client) {
      throw new Error("Global Error (client not inited)");
    }

    return client;
  } catch (e: any) {
    if (
      [
        "USER_DEACTIVATED_BAN",
        "AUTH_KEY_UNREGISTERED",
        "AUTH_KEY_INVALID",
        "USER_DEACTIVATED",
        "SESSION_REVOKED",
        "SESSION_EXPIRED",
        "AUTH_KEY_PERM_EMPTY",
        "SESSION_PASSWORD_NEEDED",
      ].includes(e.message)
    ) {
      console.error(account.accountId, e.message);
      await updateAiAccount(account.accountId, {
        banned: true,
        reason: e.message,
      });
      throw new Error("Global Error");
    }

    throw new Error(e.message);
  }
};
