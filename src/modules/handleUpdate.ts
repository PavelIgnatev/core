import GramJs from '../common/gramjs/tl/api';

import {
  getDialogue,
  getDialogueByMessageId,
  updateMessagesViewedStatusById,
} from '../db/dialogues';
import { sendToBot } from '../helpers/sendToBot';
import { sleep } from '../helpers/sleep';
import { resolvePhone } from '../methods/contacts/resolvePhone';
import { resolveUsername } from '../methods/contacts/resolveUsername';
import { getUserByDialogue } from './getUserByDialogue';

function findValue(obj: Record<string, any>, valueKey: string) {
  return (
    obj[valueKey] ||
    obj.peer?.[valueKey] ||
    obj.message?.[valueKey] ||
    obj.message?.fromId?.[valueKey] ||
    obj.message?.peer?.[valueKey] ||
    obj.message?.peerId?.[valueKey]
  );
}

export const handleUpdate = async (
  client: any,
  accountId: string,
  update: any,

  onNewMessage: () => void
) => {
  if (!update) {
    return;
  }

  if (
    update.className === 'UpdateConnectionState' ||
    update.className === 'UpdateUserStatus'
  ) {
    if (process.env.DEV !== 'true') {
      return;
    }
  }

  console.log({
    accountId,
    message: `<${update.className}>`,
    payload: JSON.parse(JSON.stringify(update)),
  });

  const userId = findValue(update, 'userId');

  if (
    update instanceof GramJs.UpdateNewMessage ||
    update instanceof GramJs.UpdateShortMessage
  ) {
    if (userId) {
      const dialog = await getDialogue(accountId, String(userId));
      if (dialog) {
        onNewMessage();
      } else if (String(userId) !== '178220800') {
        await sendToBot(
          `Не найден диалог в дб для: ${accountId}:${JSON.stringify(update)}`
        );
      }
    }
  }
  //   } else if (
  //     update instanceof GramJs.UpdateReadHistoryOutbox ||
  //     update instanceof GramJs.UpdateReadHistoryInbox
  //   ) {
  //     if (userId || !update.maxId) {
  //       await updateMessagesViewedStatusById(
  //         accountId,
  //         String(userId),
  //         update.maxId
  //       );

  //       await sleep(60000);
  //       const dialog = await getDialogue(accountId, String(userId));
  //       if (!dialog) {
  //         await sendToBot(
  //           `** DIALOG NOT DEFINED **
  // AccountID: ${accountId}
  // UPDATE: ${JSON.stringify(update)}`
  //         );
  //         return;
  //       }

  //       const users = await getUserByDialogue(client, dialog);

  //       if (!users) {
  //         await sendToBot(`** NOT RESOLVED USERS **
  // DIALOG: ${JSON.stringify(dialog)}`);
  //         return;
  //       }

  //       for (const user of users) {
  //         if (!user.status || user.status instanceof GramJs.UserStatusEmpty) {
  //           await sendToBot(`ЮЗЕР БЛОКНУЛ НАС`);
  //           return;
  //         }
  //       }
  //     }
  //   } else if (update instanceof GramJs.UpdateDeleteMessages) {
  //     const messages = update.messages;
  //     if (messages.length === 1) {
  //       return;
  //     }

  //     const dialog = await getDialogueByMessageId(accountId, messages);
  //     if (!dialog) {
  //       await sendToBot(
  //         `Не найден диалог в DB2 для ${accountId}:${JSON.stringify(update)}`
  //       );
  //       return;
  //     }

  //     if (!dialog.recipientUsername && !dialog.recipientPhone) {
  //       await sendToBot(
  //         `У аккаунта нет ни username, ни phone ${accountId}:${JSON.stringify(update)}`
  //       );
  //       return;
  //     }

  //     let dialogue;
  //     if (dialog.recipientPhone) {
  //       dialogue = await resolvePhone(client, `+${dialog.recipientPhone}`);
  //       if (dialogue?.users?.[0]) {
  //         const status = dialogue.users[0].status;
  //         if (!status || status instanceof GramJs.UserStatusEmpty) {
  //           await sendToBot(`чел вьебал нас ${JSON.stringify(dialogue)}`);
  //         } else {
  //           await sendToBot(`чел не вьебал нас ${JSON.stringify(dialogue)}`);
  //         }
  //       }
  //     }
  //     if (dialog.recipientUsername) {
  //       dialogue = await resolveUsername(client, dialog.recipientUsername);
  //       if (dialogue?.users?.[0]) {
  //         const status = dialogue.users[0].status;
  //         if (!status || status instanceof GramJs.UserStatusEmpty) {
  //           await sendToBot(`чел вьебал нас ${JSON.stringify(dialogue)}`);
  //         } else {
  //           await sendToBot(`чел не вьебал нас ${JSON.stringify(dialogue)}`);
  //         }
  //       }
  //     }

  //     if (!dialogue) {
  //       await sendToBot(
  //         `Диалог не разрезолвлен ${accountId}:${JSON.stringify(update)}`
  //       );
  //     }
  //   }
};
