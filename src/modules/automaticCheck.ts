import BigInt from 'big-integer';

import GramJs from '../common/gramjs/tl/api';
import TelegramClient from '../common/gramjs/client/TelegramClient';

import { getUserByDialogue } from './getUserByDialogue';
import {
  getDialogsAutomationCheck,
  updateAutomaticDialogue,
  updateBlockedDialogue,
} from '../db/dialogues';
import { getFullUser } from '../methods/users/getFullUser';

export const automaticCheck = async (
  client: TelegramClient,
  accountId: string
) => {
  const dialogs = await getDialogsAutomationCheck(accountId);

  for (const dialog of dialogs) {
    const dialogsTG = await getUserByDialogue(client, dialog);
    if (!dialogsTG) {
      continue;
    }

    const { messages: dialogMessages = [] } = dialog || {};

    for (const dialogTG of dialogsTG) {

      const history = (await client.invoke(
        new GramJs.messages.GetHistory({
          peer: new GramJs.InputPeerUser({
            userId: BigInt(dialogTG.id),
            accessHash: BigInt(dialogTG.accessHash),
          }),
        })
      )) as any;

      const messages = (history?.messages || [])
        .filter((m: GramJs.Message) => m.className === 'Message')
        .reverse();

      for (const message of messages) {
        if (dialogMessages.find((m) => m.id === message.id)) {
          continue;
        }

        const {
          photo = false,
          voice = false,
          round = false,
          video = false,
          document = false,
          spoiler = false,
        } = message?.media || ({} as any);

        let text;
        if (message.fwdFrom) {
          text = '[FORWARDED MESSAGE]';
        } else if (message.message) {
          text = message.message;
        } else if (voice || round) {
          await client.invoke(
            new GramJs.messages.ReadMessageContents({
              id: [message.id],
            })
          );
          text = '[VOICE MESSAGE]';
        } else if (photo) {
          text = '[PHOTO]';
        } else if (video) {
          text = '[VIDEO]';
        } else if (document) {
          text = '[DOCUMENT]';
        } else if (spoiler) {
          text = '[SPOILER MESSAGE]';
        } else {
          text = '[UNKNOWN MESSAGE]';
        }

        dialogMessages.push({
          id: message.id,
          text,
          fromId: String(message?.fromId?.userId || dialogTG.id),
          date: message.date,
        });
      }

      if (
        !dialogTG.status ||
        dialogTG.status instanceof GramJs.UserStatusEmpty
      ) {
        await updateAutomaticDialogue(accountId, String(dialogTG.id), {
          messages,
          reason: 'blocked-automatic',
        });
      } else if (messages.length === 0) {
        await updateAutomaticDialogue(accountId, String(dialogTG.id), {
          messages,
          reason: 'messages-deleted-automatic',
        });
      }
    }
  }
};
