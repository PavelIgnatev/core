import BigInt from 'big-integer';

import { invokeRequest } from '../../common/gramjs';
import TelegramClient from '../../common/gramjs/client/TelegramClient';
import GramJs from '../../common/gramjs/tl/api';
import { sendToMainBot } from '../../helpers/sendToMainBot';

export const resolvePhone = async (client: TelegramClient, phone: string) => {
  const stableResult = await invokeRequest(
    client,
    new GramJs.contacts.ResolvePhone({
      phone: '+79375958906',
    }),
    { shouldIgnoreErrors: true }
  );

  if (!stableResult) {
    throw new Error('STABLE_RESULT_NOT_FOUND');
  }

  const userByPhone = await invokeRequest(
    client,
    new GramJs.contacts.ResolvePhone({
      phone,
    }),
    { shouldIgnoreErrors: true }
  );

  if (userByPhone) {
    return userByPhone;
  }

  return null;
};
