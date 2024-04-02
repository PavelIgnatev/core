import GramJs from "../telegram/tl/api";

import { invokeRequest } from "../telegram";
import { Account } from "../@types/Account";
import { updateAiAccount } from "../methods/accounts/updateAiAccount";

export const updateAuthorizations = async (account: Account) => {
  const { authorizations } = await invokeRequest(
    new GramJs.account.GetAuthorizations()
  );

  await updateAiAccount(account.accountId, {
    authorizations,
  });

  for (const authorization of authorizations) {
    try {
      if (!authorization.current && authorization.deviceModel !== "Desktop") {
        await invokeRequest(
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
