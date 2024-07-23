import { blue } from "colors/safe";

import GramJs from "../../common/gramjs/tl/api";

export const resolveUsername = async (
  client: any,
  accountId: string,
  username: string
) => {
  console.log(`[${accountId}] Initialize resolve username:`, blue(username));

  const userByUsername = await client.invoke(
    new GramJs.contacts.ResolveUsername({
      username,
    })
  );

  return userByUsername;
};
