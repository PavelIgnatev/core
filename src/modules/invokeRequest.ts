import TelegramClient from '../common/gramjs/client/TelegramClient';
import GramJs from '../common/gramjs/tl/api';
import { updateAccountById } from '../db/accounts';
import { allTimings } from '../helpers/helpers';
import { sendToMainBot } from '../helpers/sendToMainBot';

type InvokeRequestParams = {
  shouldIgnoreErrors?: boolean;
};

export async function invokeRequest<T extends GramJs.AnyRequest>(
  client: TelegramClient,
  request: T,
  params: InvokeRequestParams = {}
) {
  const { shouldIgnoreErrors } = params;
  const startTime = performance.now(); // Начало измерения времени

  try {
    const response = await client.invoke(request);

    allTimings.push(Number(Number(performance.now() - startTime).toFixed(2)));
    if (request.className !== 'account.UpdateStatus') {
      console.log({
        accountId: client._accountId,
        message: `[${request.className}]`,
        payload: {
          request: JSON.parse(JSON.stringify(request)),
        },
      });
    }

    return response;
  } catch (err: any) {
    allTimings.push(Number(Number(performance.now() - startTime).toFixed(2)));
    console.error({
      accountId: client._accountId,
      message: `[${request.className}]`,
      payload: {
        request: JSON.parse(JSON.stringify(request)),
        error: err.message,
      },
    });

    if (err.message === 'No workers running') {
      throw new Error(err.message);
    }
    if (
      [
        'USER_DEACTIVATED_BAN',
        'AUTH_KEY_UNREGISTERED',
        'AUTH_KEY_INVALID',
        'USER_DEACTIVATED',
        'SESSION_REVOKED',
        'SESSION_EXPIRED',
        'AUTH_KEY_DUPLICATED',
        'AUTH_KEY_PERM_EMPTY',
        'SESSION_PASSWORD_NEEDED',
      ].includes(err.message)
    ) {
      await updateAccountById(client._accountId, {
        banned: true,
        reason: err.message,
      });
      throw new Error(err.message);
    }

    if (shouldIgnoreErrors) return undefined;

    if (
      err.message !== 'PEER_FLOOD' &&
      request.className !== 'contacts.Block' &&
      request.className !== 'contacts.Unblock'
    ) {
      await sendToMainBot(`💀 REQUEST ERROR (${request.className}) 💀
ID: ${client._accountId}
ERROR: ${err.message}
REQUEST: ${JSON.stringify(request)}`);
    }

    throw new Error(err.message);
  }
}
