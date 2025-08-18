import TelegramClient from '../../../gramjs/client/TelegramClient';
import GramJs from '../../../gramjs/tl/api';
import { getRandomPhone } from '../../db/dialogues';
import { invokeRequest } from '../../modules/invokeRequest';

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

  for (let i = 0; i < 3; i++) {
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

    if (randomContact) {
      return null;
    }
  }

  throw new Error('PHONE_SEARCH_ERROR');
};
