import BigInt from 'big-integer';

import GramJs from '../common/gramjs/tl/api';
import TelegramClient from '../common/gramjs/client/TelegramClient';

import { getUserByDialogue } from './getUserByDialogue';
import {
  getDialogsAutomationCheck,
  updateAutomaticDialogue,
} from '../db/dialogues';

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

    const dialogMessages: {
      id: string;
      text: string;
      fromId: string;
      date: string;
    }[] = [];

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
          automaticMessages: messages,
          automaticCheck: true,
          automaticReason: 'blocked',
        });
      } else if (messages.length === 0) {
        await updateAutomaticDialogue(accountId, String(dialogTG.id), {
          automaticMessages: messages,
          automaticCheck: true,
          automaticReason: 'messages-deleted',
        });
      } else {
        await updateAutomaticDialogue(accountId, String(dialogTG.id), {
          automaticMessages: messages,
          automaticCheck: true,
        });
      }
    }
  }
};
