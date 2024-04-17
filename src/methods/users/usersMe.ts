import GramJs from "../../telegram/tl/api";

export const usersMe = async (client: any) => {
  const usersMe = await client.invoke(
    new GramJs.users.GetFullUser({
      id: new GramJs.InputUserSelf(),
    })
  );

  return usersMe;
};
