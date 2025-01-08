import TelegramClient from '../common/gramjs/client/TelegramClient';
import GramJs from '../common/gramjs/tl/api';
import { getAccountById } from '../db/accounts';
import {
  getDialogue,
  getManualControlDialogsIds,
  getPingDialogsIds,
  updateAutomaticDialogue,
} from '../db/dialogues';
import { getCombinedMessages } from '../helpers/getCombinedMessages';
import { sendToMainBot } from '../helpers/sendToMainBot';
import { getHistory } from '../methods/messages/getHistory';
import { readHistory } from '../methods/messages/readHistory';
import { readMessageContents } from '../methods/messages/readMessageContents';
import { getDialogs } from '../methods/users/getDialogs';

export const getClassifiedDialogs = async (
  client: TelegramClient,
  accountId: string,
  meId: string
) => {
  const dialogs = await getDialogs(client, accountId, 0, true);
  if (!dialogs.length) {
    return [[], [], []];
  }

  const pingDialogsIds = await getPingDialogsIds(accountId);
  const manualControlDialogsIds = await getManualControlDialogsIds(accountId);

  const stableDialogs = [];
  const pingDialogs = [];
  const manualDialogs = [];

  for (const dialog of dialogs) {
    const { type, message, user } = dialog;

    if (
      type !== 'user' ||
      !(message instanceof GramJs.Message) ||
      !user.status ||
      user.deleted ||
      user.self ||
      user.status instanceof GramJs.UserStatusEmpty ||
      (message.out &&
        !pingDialogsIds.includes(String(user.id)) &&
        !manualControlDialogsIds.includes(String(user.id)))
    ) {
      continue;
    }

    const dialogDb = await getDialogue(accountId, String(user.id));
    if (!dialogDb || !dialogDb.groupId) {
      await sendToMainBot(
        `** CLASSIFIED DIALOG: DIALOG NOT FOUND **
ACCOUNT_ID: ${accountId}
ID: ${user.id}
ACCESS_HASH: ${user.accessHash}`
      );
      continue;
    }

    const {
      groupId,
      recipientId,
      recipientAccessHash,
      blocked = false,
      reason = null,
      messages = [],
      automaticReason = null,
    } = dialogDb;

    // TODO: remove this after testing
    if (
      recipientId !== String(user.id) ||
      recipientAccessHash !== String(user.accessHash)
    ) {
      await sendToMainBot(
        `** CLASSIFIED DIALOG: NOT SAME ERROR **
ACCOUNT_ID: ${accountId}
GROUP_ID: ${groupId}
ID: ${recipientId}
USER_ID: ${user.id}
ACCESS_HASH: ${recipientAccessHash}
USER_ACCESS_HASH: ${user.accessHash}`
      );
      continue;
    }

    if (blocked || reason || automaticReason) {
      continue;
    }

    const history = await getHistory(client, recipientId, recipientAccessHash);
    if (!history.length) {
      continue;
    }

    await readHistory(client, recipientId, recipientAccessHash, 1000000);

    for (const msg of history.reverse()) {
      if (messages.find((m) => m.id === msg.id)) {
        continue;
      }

      const {
        photo = false,
        voice = false,
        round = false,
        video = false,
        document = false,
        spoiler = false,
      } = msg.media || ({} as any);

      let text;
      if (msg.fwdFrom) {
        text = '[FORWARDED MESSAGE]';
      } else if (msg.message) {
        text = msg.message;
      } else if (voice || round) {
        await readMessageContents(client, msg.id);
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

      messages.push({
        id: msg.id,
        text,
        fromId: msg.out ? meId : recipientId,
        date: msg.date,
      });
    }

    const step = getCombinedMessages(messages).length;
    if (step > 50) {
      await updateAutomaticDialogue(
        accountId,
        recipientId,
        'automatic:max-step-50'
      );
      continue;
    }

    const dialogData = {
      ...user,
      ...dialogDb,
      step,
      groupId,
      messages,
    };

    if (dialogData.stopped || manualControlDialogsIds.includes(recipientId)) {
      const account = await getAccountById(accountId);

      if (!account.spamBlockDate) {
        manualDialogs.push(dialogData);
      }
    } else if (pingDialogsIds.includes(recipientId)) {
      pingDialogs.push(dialogData);
    } else {
      stableDialogs.push(dialogData);
    }
  }

  return [stableDialogs, pingDialogs, manualDialogs];
};
