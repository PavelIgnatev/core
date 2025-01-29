import TelegramClient from '../../../gramjs/client/TelegramClient';
import GramJs from '../../../gramjs/tl/api';
import { invokeRequest } from '../../modules/invokeRequest';

export async function clearAuthorizations(client: TelegramClient) {
  const invokedAuthorizations = await invokeRequest(
    client,
    new GramJs.account.GetAuthorizations()
  );
  const authorizations = invokedAuthorizations?.authorizations || [];

  for (const authorization of authorizations) {
    try {
      if (authorization.current) {
        console.warn({
          accountId: client._accountId,
          message: '[SELF_SESSION]',
          payload: authorization,
        });
      }

      if (!authorization.current) {
        console.warn({
          accountId: client._accountId,
          message: '[UNKNOWN_SESSION]',
          payload: authorizations,
        });

        await invokeRequest(
          client,
          new GramJs.account.ResetAuthorization({
            hash: authorization.hash,
          }),
          { shouldIgnoreErrors: true }
        );
      }
    } catch {}
  }
}
