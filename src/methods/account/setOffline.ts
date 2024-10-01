import GramJs from '../../common/gramjs/tl/api';

export const setOffline = async (
  client: any,
  offline: boolean
) => {
  const result = await client.invoke(
    new GramJs.account.UpdateStatus({
      offline,
    })
  );

  return result;
};
