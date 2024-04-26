import GramJs from "../../gramjs/tl/api";

export const resolveUsername = async (client: any, username: string) => {
  const userByUsername = await client.invoke(
    new GramJs.contacts.ResolveUsername({
      username,
    })
  );

  return userByUsername;
};
