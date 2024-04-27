import { Account } from "../@types/Account";

import { init } from "../gramjs";

import { updateAiAccount } from "../methods/accounts/updateAiAccount";

export const initClient = async (account: Account, onUpdate: any) => {
  try {
    const client = await init(account, onUpdate);

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
        "AUTH_KEY_DUPLICATED",
        // TODO: пофиксить как-то
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
