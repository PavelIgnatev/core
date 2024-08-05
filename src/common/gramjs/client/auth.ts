import Api from '../tl/api';
import type TelegramClient from './TelegramClient';

export async function clearAuthorizations(client: TelegramClient) {
  console.log(`[${client._accountId}] Check all account authorizations`);

  const { authorizations } = await client.invoke(
    new Api.account.GetAuthorizations()
  );

  for (const authorization of authorizations) {
    try {
      if (!authorization.current && authorization.deviceModel !== 'Desktop') {
        console.log(
          `[${client._accountId}] Delete unknown account authorization:`,
          authorization
        );

        await client.invoke(
          new Api.account.ResetAuthorization({
            hash: authorization.hash,
          })
        );
      }
    } catch {}
  }
}
