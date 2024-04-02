import GramJs from "../../telegram/tl/api";
import { invokeRequest } from "../../telegram";

export const me = async () => {
  const { fullUser } = await invokeRequest(
    new GramJs.users.GetFullUser({
      id: new GramJs.InputUserSelf(),
    })
  );

  return fullUser;
};
