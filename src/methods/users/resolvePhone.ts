import GramJs from "../../telegram/tl/api";
import { invokeRequest } from "../../telegram";

export const resolvePhone = async (phone: string) => {
  const userByUsername = await invokeRequest(
    new GramJs.contacts.ResolvePhone({
      phone,
    })
  );

  return userByUsername;
};
