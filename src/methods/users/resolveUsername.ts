import GramJs from "../../telegram/tl/api";

export const resolveUsername = async (client: any, username: string) => {
  const userByUsername = await client.invoke(
    new GramJs.contacts.ResolveUsername({
      username,
    })
  );

  return userByUsername;
};
