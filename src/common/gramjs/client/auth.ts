import { invokeRequest } from '..';
import Api from '../tl/api';
import TelegramClient from './TelegramClient';

export async function clearAuthorizations(client: TelegramClient) {
  const authorizations = await invokeRequest(
    client,
    new Api.account.GetAuthorizations()
  );

  for (const authorization of authorizations?.authorizations || []) {
    try {
      if (!authorization.current) {
        await invokeRequest(
          client,
          new Api.account.ResetAuthorization({
            hash: authorization.hash,
          }),
          { shouldIgnoreErrors: true }
        );
      }
    } catch {}
  }
}
