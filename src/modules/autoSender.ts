import { checkSpamBlock } from './checkSpamBlock';
import { saveRecipient } from './saveRecipient';
import { updateFailedMessage, updateSendMessage } from '../db/groupIdUsers';
import { generateRandomString } from '../helpers/generateRandomString';
import { sendToBot } from '../helpers/sendToBot';
import { muteNotification } from '../methods/account/muteNotification';
import { resolveContact } from '../methods/contacts/resolveContact';
import { editFolder } from '../methods/folders/editFolder';
import { sendMessage } from '../methods/messages/sendMessage';
import { getRecipient } from '../methods/recipients/getRecipient';
import { deleteMessages } from '../methods/messages/deleteHistory';
import { getAccountById } from '../db/accounts';
import { getUserInformation } from '../helpers/getUserInformation';
import { getGreeting } from '../helpers/getGreetings';
import { getDialogueByGidRid } from '../db/dialogues';
import {
  endSender,
  startSender,
  errorSender,
  peerFloods,
} from '../helpers/global';

export const autoSender = async (
  client: any,
  accountId: string,
  tgAccountId: string
) => {
  const accountByID = await getAccountById(accountId);
  if (!accountByID) {
    throw new Error('Account not defined');
  }

  const spamBlockDate = await checkSpamBlock(client, accountByID);
  if (spamBlockDate) {
    return;
  }

  const currentTime = new Date();
  const currentUTCHours = currentTime.getUTCHours();

  if (currentUTCHours < 5 || currentUTCHours > 14) {
    return;
  }

  if (!accountId.includes('-prefix-')) {
    const weekday = new Intl.DateTimeFormat('en-GB', {
      weekday: 'short',
      timeZone: 'UTC',
    }).format(new Date());

    if (weekday === 'Sat' || weekday === 'Sun') {
      return;
    }
  }

  const remainingTime = new Date(accountByID.remainingTime || currentTime);

  if (currentTime >= remainingTime) {
    startSender[accountId] = 1;
    while (true) {
      const recipient = await getRecipient(accountId);
      if (!recipient) {
        return;
      }

      try {
        const recipientFull = await resolveContact(
          client,
          recipient.username,
          String(recipient.groupId)
        );

        const {
          id,
          accessHash,
          self,
          deleted,
          bot,
          support,
          contactRequirePremium,
          botBusiness,
          firstName,
          lastName,
        } = recipientFull.users[0];
        if (self) {
          throw new Error('SELF_ERROR');
        }

        if (deleted || bot || support || contactRequirePremium || botBusiness) {
          throw new Error('USER_SPECIAL_PARAMS');
        }

        const dialog = await getDialogueByGidRid(
          String(id),
          String(recipient.groupId)
        );

        if (dialog) {
          throw new Error('DIALOG_DUPLICATE');
        }

        await deleteMessages(client, id, accessHash);

        let user = null;
        let firstMessage = generateRandomString(recipient.firstMessagePrompt);
        const secondMessage = generateRandomString(
          recipient.secondMessagePrompt
        );

        const greeting = getGreeting(recipient?.language || 'RUSSIAN');
        if (greeting) {
          const userInformation = await getUserInformation(
            `${firstName || ''} ${lastName || ''}`,
            recipient.language
          );

          if (userInformation.aiName) {
            user = userInformation;
            firstMessage = `${greeting}, ${userInformation.aiName}!`;
          } else {
            firstMessage = `${greeting}!`;
          }
        }

        await new Promise((res) => setTimeout(res, 5000));
        const sentFirstMessage = await sendMessage(
          client,
          id,
          accessHash,
          firstMessage,
          accountId,
          false
        );
        const sentSecondMessage = await sendMessage(
          client,
          id,
          accessHash,
          secondMessage,
          accountId,
          false
        );
        await editFolder(client, String(id), String(accessHash), 1);
        await muteNotification(client, id, accessHash, 2147483647);
        await saveRecipient(
          accountId,
          recipientFull,
          { ...recipient, ...user },
          [
            {
              id: sentFirstMessage.id,
              text: firstMessage,
              fromId: String(tgAccountId),
              date: Math.round(Date.now() / 1000),
            },
            {
              id: sentSecondMessage.id,
              text: secondMessage,
              fromId: String(tgAccountId),
              date: Math.round(Date.now() / 1000),
            },
          ],
          'create',
          {},
          accountByID
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
          await updateFailedMessage(
            recipient.username,
            String(recipient.groupId)
          );
          continue;
        }
        errorSender[accountId] = 1;

        if (e.message.includes('PEER_FLOOD')) {
          await updateSendMessage(
            recipient.username,
            String(recipient.groupId),
            {
              p: null,
            }
          );
          peerFloods[accountId] = 1;
        }

        // if (!['PEER_FLOOD', 'MESSAGE_ERROR'].includes(e.message)) {
          await sendToBot(`** AUTO SENDER ERROR **
USER DATA: ${recipient.username};
ERROR: ${e.message}`);
        // }

        return;
      }
    }
  }
};
