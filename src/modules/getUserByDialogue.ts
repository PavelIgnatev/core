import TelegramClient from '../common/gramjs/client/TelegramClient';

import { resolvePhone } from '../methods/contacts/resolvePhone';
import { resolveUsername } from '../methods/contacts/resolveUsername';

import { sendToBot } from '../helpers/sendToBot';

export const getUserByDialogue = async (
  client: TelegramClient,
  dialog: { recipientPhone?: string; recipientUsername?: string }
) => {
  if (!dialog.recipientUsername && !dialog.recipientPhone) {
    throw new Error('Dialog recipientUsername and recipientPhone not defined');
  }

  try {
    if (dialog.recipientUsername?.includes('+')) {
      const username = await resolvePhone(client, dialog.recipientUsername);
      const dialogue = username?.users?.[0];
      if (dialogue) {
        return dialogue;
      }
    }
  } catch (e: any) {
    if (
      ![
        'PHONE_NOT_OCCUPIED',
        'USERNAME_NOT_OCCUPIED',
        'USERNAME_INVALID',
      ].includes(e.message)
    ) {
      await sendToBot(`** RESOLVE PHONE FROM USERNAME ERROR **
USERNAME: ${dialog.recipientUsername};
Error: ${e.message}`);
      throw new Error(e.message);
    }
  }

  try {
    if (dialog.recipientPhone) {
      const phone = await resolvePhone(client, `+${dialog.recipientPhone}`);
      const dialogue = phone?.users?.[0];
      if (dialogue) {
        return dialogue;
      }
    }
  } catch (e: any) {
    if (
      ![
        'PHONE_NOT_OCCUPIED',
        'USERNAME_NOT_OCCUPIED',
        'USERNAME_INVALID',
      ].includes(e.message)
    ) {
      await sendToBot(`** RESOLVE PHONE ERROR **
PHONE: ${dialog.recipientPhone};
Error: ${e.message}`);
      throw new Error(e.message);
    }
  }

  try {
    if (dialog.recipientUsername) {
      const username = await resolveUsername(client, dialog.recipientUsername);
      const dialogue = username?.users?.[0];
      if (dialogue) {
        return dialogue;
      }
    }
  } catch (e: any) {
    if (
      ![
        'PHONE_NOT_OCCUPIED',
        'USERNAME_NOT_OCCUPIED',
        'USERNAME_INVALID',
      ].includes(e.message)
    ) {
      await sendToBot(`** RESOLVE USERNAME ERROR **
USERNAME: ${dialog.recipientUsername};
Error: ${e.message}`);
      throw new Error(e.message);
    }
  }

  return null;
};
