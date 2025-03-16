import TelegramClient from '../../../gramjs/client/TelegramClient';
import GramJs from '../../../gramjs/tl/api';
import { invokeRequest } from '../../modules/invokeRequest';

export async function clearAuthorizations(client: TelegramClient) {
  const invokedAuthorizations = await invokeRequest(
    client,
    new GramJs.account.GetAuthorizations()
  );
  const authorizations = invokedAuthorizations?.authorizations || [];

  console.warn({
    accountId: client._accountId,
    message: '[AUTHORIZATION_SESSIONS]',
    payload: authorizations,
  });

  for (const authorization of authorizations) {
    try {
      if (!authorization.current) {
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

  if (authorizations.length > 1) {
    await invokeRequest(client, new GramJs.auth.ResetAuthorizations(), {
      shouldIgnoreErrors: true,
    });
  }
}
