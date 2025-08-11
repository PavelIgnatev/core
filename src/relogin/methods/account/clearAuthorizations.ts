import TelegramClient from '../../../gramjs/client/TelegramClient';
import GramJs from '../../../gramjs/tl/api';
import { invokeRequest } from '../../modules/invokeRequest';

export async function clearAuthorizations(client: TelegramClient) {
  const invokedAuthorizations = await invokeRequest(
    client,
    new GramJs.account.GetAuthorizations()
  );

  const authorizations = invokedAuthorizations?.authorizations || [];
  let currentApiId;

  for (const authorization of authorizations) {
    try {
      if (authorization.current) {
        console.log({
          accountId: client._accountId,
          prefix: client._prefix,
          message: '[CURRENT_SESSION]',
          payload: authorization,
        });
        currentApiId = authorization.apiId;
      }

      if (!authorization.current) {
        console.error({
          accountId: client._accountId,
          prefix: client._prefix,
          message: '[UNKNOWN_SESSION]',
          payload: authorization,
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

  if (authorizations.length > 1) {
    await invokeRequest(client, new GramJs.auth.ResetAuthorizations(), {
      shouldIgnoreErrors: true,
    });
  }

  return currentApiId;
}
