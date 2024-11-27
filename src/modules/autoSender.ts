import BigInt from 'big-integer';

import { checkSpamBlock } from './checkSpamBlock';
import { saveRecipient } from './saveRecipient';
import { updateFailedMessage } from '../db/groupIdUsers';
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

export const autoSender = async (
  client: any,
  accountId: string,
  tgAccountId: string
) => {
  const currentTime = new Date();
  const currentUTCHours = currentTime.getUTCHours();

  // if (currentUTCHours < 5 || currentUTCHours > 14) {
  //   return;
  // }

  // if (!accountId.includes('-prefix-')) {
  //   const weekday = new Intl.DateTimeFormat('en-GB', {
  //     weekday: 'short',
  //     timeZone: 'UTC',
  //   }).format(new Date());

  //   if (weekday === 'Sat' || weekday === 'Sun') {
  //     return;
  //   }
  // }

  const accountByID = await getAccountById(accountId);
  if (!accountByID) {
    throw new Error('Account not defined');
  }

  const remainingTime = new Date(accountByID.remainingTime || currentTime);

  if (currentTime >= remainingTime || true) {
    const spamBlockDate = await checkSpamBlock(client, accountId);
    if (spamBlockDate) {
      return;
    }

    const recipient = await getRecipient(accountId);

    try {
      const recipientFull = await resolveContact(
        client,
        recipient.username,
        recipient.groupId
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
        username,
      } = recipientFull.users[0];
      if (self) {
        return;
      }

      if (deleted || bot || support || contactRequirePremium || botBusiness) {
        await updateFailedMessage(
          recipient.username,
          String(recipient.groupId)
        );

        return;
      }

      await deleteMessages(client, id, accessHash);

      let firstMessage = generateRandomString(recipient.firstMessagePrompt);
      //&& recipient.smartGreeting
      //&& recipient.smartQuestion
      if (recipient.language === 'RUSSIAN' && recipient.smartGreeting) {
        const greeting = getGreeting();
        const userInformation = await getUserInformation(
          `${username || ''} ${firstName || ''} ${lastName || ''}`.trim()
        );

        if (userInformation.name) {
          firstMessage = `${greeting}, ${userInformation.name}!`;
        } else {
          firstMessage = `${greeting}!`;
        }
      }

      const secondMessage = generateRandomString(recipient.secondMessagePrompt);
      await new Promise((res) => setTimeout(res, 5000));
      const sentFirstMessage = await sendMessage(
        client,
        id,
        accessHash,
        firstMessage,
        accountId
      );
      const sentSecondMessage = await sendMessage(
        client,
        id,
        accessHash,
        secondMessage,
        accountId
      );
      await editFolder(client, String(id), String(accessHash), 1);
      await muteNotification(client, id, accessHash, 2147483647);
      await saveRecipient(
        accountId,
        recipientFull,
        recipient,
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
    } catch (e: any) {
      if (
        ![
          'PEER_FLOOD',
          'PHONE_NOT_OCCUPIED',
          'USERNAME_NOT_OCCUPIED',
          'USERNAME_INVALID',
          'MESSAGE_ERROR',
        ].includes(e.message)
      ) {
        await sendToBot(`Username: ${recipient.username}; Error: ${e.message}`);
      }

      if (
        !e.message.includes('PEER_FLOOD') &&
        !e.message.includes('MESSAGE_ERROR')
      ) {
        await updateFailedMessage(
          recipient.username,
          String(recipient.groupId)
        );
      }

      throw new Error('Global Error');
    }
  }
};
