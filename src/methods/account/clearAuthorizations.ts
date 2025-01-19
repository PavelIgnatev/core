import { invokeRequest } from '../../common/gramjs';
import TelegramClient from '../../common/gramjs/client/TelegramClient';
import GramJs from '../../common/gramjs/tl/api';

export async function clearAuthorizations(client: TelegramClient) {
  const invokedAuthorizations = await invokeRequest(
    client,
    new GramJs.account.GetAuthorizations()
  );
  const authorizations = invokedAuthorizations?.authorizations || [];

  if (authorizations.length > 1) {
    console.warn({
      accountId: client._accountId,
      message: 'MULTIPLE_AUTHORIZATIONS',
      payload: { authorizations },
    });
  }

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
}
