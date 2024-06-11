import GramJs from "../gramjs/tl/api";

export const clearAuthorizations = async (client: any) => {
  const { authorizations } = await client.invoke(
    new GramJs.account.GetAuthorizations()
  );

  for (const authorization of authorizations) {
    try {
      if (!authorization.current && authorization.deviceModel !== "Desktop") {
        await client.invoke(
          new GramJs.account.ResetAuthorization({
            hash: authorization.hash,
          })
        );
      }
    } catch {}
  }
};
