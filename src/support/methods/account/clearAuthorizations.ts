import TelegramClient from '../../../gramjs/client/TelegramClient';
import GramJs from '../../../gramjs/tl/api';
import { updateAccountById } from '../../db/accounts';
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
        console.log({
          accountId: client._accountId,
          prefix: client._prefix,
          message: '[CURRENT_SESSION]',
          payload: authorization,
        });
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

  await updateAccountById(client._accountId, {
    isMainSession: Boolean(authorizations.length),
  });
}
