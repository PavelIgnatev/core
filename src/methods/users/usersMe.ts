import { blue } from "colors/safe";
import GramJs from "../../common/gramjs/tl/api";

import { updateAccountById } from "../../db/accounts";

export const usersMe = async (
  client: any,
  accountId: string,
  tgAccountId?: string
) => {
  if (!tgAccountId) {
    console.log(
      `[${accountId}] Get full ${blue("InputUserSelf")} user information`
    );

    const usersMe = await client.invoke(
      new GramJs.users.GetFullUser({
        id: new GramJs.InputUserSelf(),
      })
    );

    await updateAccountById(accountId, {
      id: String(usersMe.fullUser.id),
    });

    return String(usersMe.fullUser.id);
  }

  return tgAccountId;
};
