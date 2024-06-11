import GramJs from "../../gramjs/tl/api";
import { updateAiAccount } from "../accounts/updateAiAccount";

export const usersMe = async (
  client: any,
  accountId: string,
  tgAccountId?: string
) => {
  if (!tgAccountId) {
    const usersMe = await client.invoke(
      new GramJs.users.GetFullUser({
        id: new GramJs.InputUserSelf(),
      })
    );

    await updateAiAccount(accountId, {
      id: String(usersMe.fullUser.id),
    });

    return String(usersMe.fullUser.id);
  }

  return tgAccountId;
};
