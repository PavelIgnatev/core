import GramJs from "../gramjs/tl/api";

import { Account } from "../@types/Account";
import { updateAiAccount } from "../methods/accounts/updateAiAccount";

export const updateAuthorizations = async (client: any, account: Account) => {
  const { authorizations } = await client.invoke(
    new GramJs.account.GetAuthorizations()
  );

  await updateAiAccount(account.accountId, {
    authorizations,
    banned: false,
    reason: null,
    stopped: false,
  });

  for (const authorization of authorizations) {
    try {
      if (!authorization.current && authorization.deviceModel !== "Desktop") {
        await client.invoke(
          new GramJs.account.ResetAuthorization({
            hash: authorization.hash,
          })
        );
      }
    } catch {}
  }

  console.log(
    "UPDATE AUTHORIZATIONS: authorization in the account was successful, authorization data is saved in the database"
  );
};
