import TelegramClient from '../common/gramjs/client/TelegramClient';
import GramJs from '../common/gramjs/tl/api';
import { getAccountById } from '../db/accounts';
import { getDialogueByGidRid } from '../db/dialogues';
import { updateFailedMessage, updateSendMessage } from '../db/groupIdUsers';
import { getUserInformation } from '../helpers/getUserInformation';
import {
  endSender,
  errorSender,
  getWeekday,
  peerFloods,
  sleep,
  startSender,
} from '../helpers/helpers';
import { sendToMainBot } from '../helpers/sendToMainBot';
import { resolveContact } from '../methods/contacts/resolveContact';
import { deleteHistory } from '../methods/messages/deleteHistory';
import { sendMessage } from '../methods/messages/sendMessage';
import { getRecipient } from '../methods/recipient/getRecipient';
import { saveRecipient } from '../methods/recipient/saveRecipient';
import { checkSpamBlock } from './checkSpamBlock';

export const autoSender = async (
  client: TelegramClient,
  accountId: string,
  telegramId: string
) => {
  const account = await getAccountById(accountId);
  const spamBlockDate = await checkSpamBlock(client, account);
  if (spamBlockDate) {
    return;
  }

  const currentTime = new Date();
  const currentUTCHours = currentTime.getUTCHours();

  if (currentUTCHours < 5 || currentUTCHours > 14) {
    return;
  }

  if (!accountId.includes('-prefix-')) {
    const weekday = getWeekday();
    // if (weekday === 'Sat' || weekday === 'Sun') { 
      return;
    // }
  }

  if (currentTime >= new Date(account.remainingTime || currentTime)) {
    startSender[accountId] = 1;

    while (true) {
      const recipient = await getRecipient(accountId);
      if (!recipient) {
        return;
      }

      try {
        const { fullContact, contact } = await resolveContact(
          client,
          recipient.username
        );

        const {
          id,
          bot,
          self,
          scam,
          fake,
          support,
          deleted,
          lastName,
          username,
          firstName,
          accessHash,
          restricted,
          botBusiness,
          contactRequirePremium,
        } = contact;

        if (
          bot ||
          self ||
          scam ||
          fake ||
          support ||
          deleted ||
          restricted ||
          botBusiness ||
          contactRequirePremium
        ) {
          throw new Error('USER_SPECIAL_PARAMS');
        }

        const dialog = await getDialogueByGidRid(String(id), recipient.groupId);
        if (dialog) {
          throw new Error('DIALOG_DUPLICATE');
        }

        await deleteHistory(
          client,
          new GramJs.InputPeerUser({
            userId: id,
            accessHash,
          }),
          true
        );

        const { user, firstMessage, secondMessage } = await getUserInformation(
          recipient.firstMessagePrompt,
          recipient.secondMessagePrompt,
          recipient.language || 'RUSSIAN',
          firstName || '',
          lastName || '',
          username || ''
        );

        await sleep(5000);
        const sentFirstMessage = await sendMessage(
          client,
          String(id),
          String(accessHash),
          firstMessage,
          accountId,
          false
        );
        const sentSecondMessage = await sendMessage(
          client,
          String(id),
          String(accessHash),
          secondMessage,
          accountId,
          false
        );

        await saveRecipient(
          accountId,
          String(id),
          String(accessHash),
          fullContact,
          { ...recipient, ...(user || {}) },
          [
            {
              id: sentFirstMessage.id,
              text: firstMessage,
              fromId: String(telegramId),
              date: Math.round(Date.now() / 1000),
            },
            {
              id: sentSecondMessage.id,
              text: secondMessage,
              fromId: String(telegramId),
              date: Math.round(Date.now() / 1000),
            },
          ],
          'create',
          {},
          account
        );
        endSender[accountId] = 1;
        break;
      } catch (e: any) {
        if (
          [
            'PHONE_NOT_OCCUPIED',
            'USERNAME_NOT_OCCUPIED',
            'USERNAME_INVALID',
            'USER_SPECIAL_PARAMS',
            'DIALOG_DUPLICATE',
          ].includes(e.message)
        ) {
          await updateFailedMessage(recipient.username, recipient.groupId);
          continue;
        }
        errorSender[accountId] = 1;

        if (e.message.includes('PEER_FLOOD')) {
          peerFloods[accountId] = 1;
          await updateSendMessage(recipient.username, recipient.groupId, {
            p: null,
          });
        }

        if (!['PEER_FLOOD', 'MESSAGE_ERROR'].includes(e.message)) {
          await sendToMainBot(`** AUTO SENDER ERROR **
USER_DATA: ${recipient.username}
GROUP_ID: ${recipient.groupId}
ERROR: ${e.message}`);
        }

        return;
      }
    }
  }
};
