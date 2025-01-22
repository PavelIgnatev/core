import TelegramClient from '../../common/gramjs/client/TelegramClient';
import GramJs from '../../common/gramjs/tl/api';
import { sleep } from '../../helpers/helpers';
import { invokeRequest } from '../../modules/invokeRequest';

export async function clearAuthorizations(client: TelegramClient) {
  const invokedAuthorizations = await invokeRequest(
    client,
    new GramJs.account.GetAuthorizations()
  );
  const authorizations = invokedAuthorizations?.authorizations || [];

  await sleep(100);
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
}
