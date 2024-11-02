import TelegramClient from '../common/gramjs/client/TelegramClient';

import { resolvePhone } from '../methods/contacts/resolvePhone';
import { resolveUsername } from '../methods/contacts/resolveUsername';

import { Dialogue } from '../@types/Dialogue';

export const getUserByDialogue = async (
  client: TelegramClient,
  dialog: Dialogue
) => {
  if (!dialog.recipientUsername && !dialog.recipientPhone) {
    return;
  }

  const dialogues = [];

  if (dialog.recipientPhone) {
    const phone = await resolvePhone(client, `+${dialog.recipientPhone}`);
    const dialogue = phone?.users?.[0];
    if (dialogue) {
      dialogues.push(dialogue);
    }
  }

  if (dialog.recipientUsername) {
    const username = await resolveUsername(client, dialog.recipientUsername);
    const dialgue = username?.users?.[0];
    if (dialgue) {
      dialogues.push(dialgue);
    }
  }

  return dialogues;
};
