import { blue } from 'colors/safe';

import GramJs from '../../common/gramjs/tl/api';
import { updateAccountById } from '../../db/accounts';

export const usersMe = async (
  client: any,
  accountId: string,
  tgAccountId?: string
) => {
  if (!tgAccountId) {
    console.log(
      `[${accountId}] Get full ${blue('InputUserSelf')} user information`
    );

    const usersMeResponse = await client.invoke(
      new GramJs.users.GetFullUser({
        id: new GramJs.InputUserSelf(),
      })
    );

    await updateAccountById(accountId, {
      id: String(usersMeResponse.fullUser.id),
    });

    return String(usersMeResponse.fullUser.id);
  }

  return tgAccountId;
};
