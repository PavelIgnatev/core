import { blue } from "colors/safe";

import GramJs from "../../common/gramjs/tl/api";

export const resolvePhone = async (
  client: any,
  accountId: string,
  phone: string
) => {
  console.log(`[${accountId}] Initialize resolve phone number:`, blue(phone));

  const userByUsername = await client.invoke(
    new GramJs.contacts.ResolvePhone({
      phone,
    })
  );

  return userByUsername;
};
