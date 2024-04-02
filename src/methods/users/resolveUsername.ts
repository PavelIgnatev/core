import GramJs from "../../telegram/tl/api";
import { invokeRequest } from "../../telegram";

export const resolveUsername = async (username: string) => {
  const userByUsername = await invokeRequest(
    new GramJs.contacts.ResolveUsername({
      username,
    })
  );

  return userByUsername;
};
