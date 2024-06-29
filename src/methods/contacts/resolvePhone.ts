import GramJs from "../../common/gramjs/tl/api";

export const resolvePhone = async (client: any, phone: string) => {
  const userByUsername = await client.invoke(
    new GramJs.contacts.ResolvePhone({
      phone,
    })
  );

  return userByUsername;
};
