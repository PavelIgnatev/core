import { invokeRequest } from '../../modules/invokeRequest';
import TelegramClient from '../../common/gramjs/client/TelegramClient';
import GramJs from '../../common/gramjs/tl/api';
import { getRandomPhone } from '../../db/dialogues';

export const resolvePhone = async (client: TelegramClient, phone: string) => {
  const contact = await invokeRequest(
    client,
    new GramJs.contacts.ResolvePhone({
      phone,
    }),
    { shouldIgnoreErrors: true }
  );
  if (contact) {
    return contact;
  }

  const randomPhone = await getRandomPhone();
  if (!randomPhone) {
    throw new Error('RANDOM_PHONE_NOT_FOUND');
  }

  const randomContact = await invokeRequest(
    client,
    new GramJs.contacts.ResolvePhone({
      phone: `+${randomPhone}`,
    }),
    { shouldIgnoreErrors: true }
  );
  if (!randomContact) {
    throw new Error('STABLE_RESULT_ERROR');
  }

  return null;
};
