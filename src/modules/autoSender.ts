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
import { getDialogueByGidRid } from '../db/dialogues';

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

  // if (!accountId.includes('-prefix-')) {
  //   const weekday = new Intl.DateTimeFormat('en-GB', {
  //     weekday: 'short',
  //     timeZone: 'UTC',
  //   }).format(new Date());

  //   if (weekday === 'Sat' || weekday === 'Sun') {
  //     return;
  //   }
  // }

  const remainingTime = new Date(accountByID.remainingTime || currentTime);

  if (currentTime >= remainingTime) {
    const recipient = await getRecipient(accountId);

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
      const secondMessage = generateRandomString(recipient.secondMessagePrompt);

      if (recipient.language && recipient.smartGreeting) {
        const greeting = getGreeting(recipient.language);
        if (greeting) {
          const userInformation = await getUserInformation(
            `${firstName || ''} ${lastName || ''} ${username || ''}`,
            recipient.language
          );

          if (userInformation.name) {
            firstMessage = `${greeting}, ${userInformation.name}!`;
          } else {
            firstMessage = `${greeting}!`;
          }
        }
      }

      await new Promise((res) => setTimeout(res, 60000));
      const dialog = await getDialogueByGidRid(
        String(id),
        String(recipient.username)
      );

      if (dialog) {
        await sendToBot(`** ПРЕДОТВРАЩЕНИЕ ПОВТОРНОЙ ОТПРАВКИ **
RID: ${id}
GID: ${recipient.groupId}`);
        return;
      }

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
