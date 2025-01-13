import { invokeRequest } from '../../common/gramjs';
import TelegramClient from '../../common/gramjs/client/TelegramClient';
import GramJs from '../../common/gramjs/tl/api';
import { getRandomPhone } from '../../db/dialogues';

export const resolvePhone = async (client: TelegramClient, phone: string) => {
  let isStable = false;

  for (let i = 0; i < 3; i++) {
    const randomPhone = await getRandomPhone();
    if (!randomPhone) {
      throw new Error('RANDOM_PHONE_NOT_FOUND');
    }

    const stableResult = await invokeRequest(
      client,
      new GramJs.contacts.ResolvePhone({
        phone: `+${randomPhone}`,
      }),
      { shouldIgnoreErrors: true }
    );

    if (stableResult) {
      isStable = true;
    }
  }

  if (!isStable) {
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
