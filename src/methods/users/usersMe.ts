import GramJs from "../../telegram/tl/api";
import { invokeRequest } from "../../telegram";

export const usersMe = async () => {
  const usersMe = await invokeRequest(
    new GramJs.users.GetFullUser({
      id: new GramJs.InputUserSelf(),
    })
  );

  return usersMe;
};
