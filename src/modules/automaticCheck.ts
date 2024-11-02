import BigInt from 'big-integer';

import GramJs from '../common/gramjs/tl/api';
import TelegramClient from '../common/gramjs/client/TelegramClient';

import { getUserByDialogue } from './getUserByDialogue';
import {
  getDialogsAutomationCheck,
  updateBlockedDialogue,
} from '../db/dialogues';

export const automaticCheck = async (
  client: TelegramClient,
  accountId: string
) => {
  const dialogs = await getDialogsAutomationCheck(accountId);

  for (const dialog of dialogs) {
    const dialogsDB = await getUserByDialogue(client, dialog);
    if (!dialogsDB) {
      continue;
    }

    for (const dialogDB of dialogsDB) {
      const history = (await client.invoke(
        new GramJs.messages.GetHistory({
          peer: new GramJs.InputPeerUser({
            userId: BigInt(dialogDB.id),
            accessHash: BigInt(dialogDB.accessHash),
          }),
        })
      )) as any;

      const messages = (history?.messages || []).filter(
        (m: GramJs.Message) => m.className === 'Message'
      );

      console.log(messages);

      if (
        !dialogDB.status ||
        dialogDB.status instanceof GramJs.UserStatusEmpty
      ) {
        await updateBlockedDialogue(
          accountId,
          String(dialogDB.id),
          'blocked-automatic'
        );
      }
    }
  }
};
