import BigInt from 'big-integer';
import { blue, yellow } from 'colors/safe';

import { checkSpamBlock } from './checkSpamBlock';
import { saveRecipient } from './saveRecipient';
import GramJs from '../common/gramjs/tl/api';
import { updateAccountById } from '../db/accounts';
import { updateFailedMessage } from '../db/messages';
import { generateRandomString } from '../helpers/generateRandomString';
import { generateRandomTime } from '../helpers/generateRandomTime';
import { rmSpLc } from '../helpers/removeSpacesAndLowerCase';
import { sendToBot } from '../helpers/sendToBot';
import { muteNotification } from '../methods/account/muteNotification';
import { resolveContact } from '../methods/contacts/resolveContact';
import { editFolder } from '../methods/folders/editFolder';
import { sendMessage } from '../methods/messages/sendMessage';
import { getRecipient } from '../methods/recipients/getRecipient';
import { getMessages } from '../methods/messages/getMessages';

export const autoSender = async (
  client: any,
  accountId: string,
  tgAccountId: string,
  tgRmainingTime: string | null
) => {
  console.log(`[${accountId}] Initialize module`, yellow('AUTO SENDER'));

  if (!tgRmainingTime) {
    const remainingTime = generateRandomTime(360000, 3600000);
    await updateAccountById(accountId, {
      remainingTime,
    });

    console.log(
      `[${accountId}] Remaining time not defined, new remaining time:`,
      blue(String(remainingTime))
    );

    return;
  }

  const currentTime = new Date();
  const remainingTime = new Date(tgRmainingTime || currentTime);

  if (currentTime >= remainingTime) {
    const spamBlockDate = await checkSpamBlock(client, accountId);
    if (spamBlockDate) {
      return;
    }

    const recipient = await getRecipient(accountId);

    try {
      const recipientFull = await resolveContact(
        client,
        accountId,
        recipient.username
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
      } = recipientFull.users[0];
      if (self) {
        return;
      }
      if (deleted || bot || support || contactRequirePremium || botBusiness) {
        await updateFailedMessage(recipient.username);

        return;
      }

      const firstMessage = generateRandomString(recipient.firstMessagePrompt);
      const secondMessage = generateRandomString(recipient.secondMessagePrompt);
      await sendMessage(client, id, accessHash, firstMessage, accountId);
      await sendMessage(client, id, accessHash, secondMessage, accountId);
      const gettedMessages = await getMessages(
        client,
        accountId,
        id,
        accessHash
      );
      await editFolder(client, accountId, id, accessHash, 1);
      await muteNotification(client, accountId, id, accessHash, 2147483647);
      const fullRecipient = await resolveContact(
        client,
        accountId,
        recipient.username
      );

      const messages = gettedMessages.reverse();
      const fullUser = fullRecipient.users[0];
      const sentFirstMessage = messages.find(
        ({ message }: GramJs.Message) =>
          rmSpLc(message) === rmSpLc(firstMessage)
      );
      const sentSecondMessage = messages.find(
        ({ message }: GramJs.Message) =>
          rmSpLc(message) === rmSpLc(secondMessage)
      );
      const isBlocked =
        !fullUser.status || fullUser.status instanceof GramJs.UserStatusEmpty;

      if (!isBlocked && (!sentFirstMessage || !sentSecondMessage)) {
        await sendToBot(`!!!НЕКОРРЕКТНАЯ ОТПРАВКА!!!
Group ID: ${recipient.groupId}
Account ID: ${accountId}
User ID: ${id}
First Message: ${firstMessage}
Real first message (#${sentFirstMessage?.id}): ${sentFirstMessage?.message}
Second Message: ${secondMessage}
Real second message (#${sentSecondMessage?.id}): ${sentSecondMessage?.message}
Messages: ${JSON.stringify(messages.map((m: GramJs.Message) => ({ id: m.id, message: m.message })))}
`);
      }

      await saveRecipient(
        accountId,
        recipientFull,
        recipient,
        [
          {
            id: sentFirstMessage?.id || Math.floor(Math.random() * 9e5),
            text: firstMessage,
            fromId: String(tgAccountId),
            date: Math.round(Date.now() / 1000),
          },
          {
            id: sentSecondMessage?.id || Math.floor(Math.random() * 9e9),
            text: secondMessage,
            fromId: String(tgAccountId),
            date: Math.round(Date.now() / 1000),
          },
        ],
        'create'
      );
    } catch (e: any) {
      if (
        ![
          'PEER_FLOOD',
          'PHONE_NOT_OCCUPIED',
          'USERNAME_NOT_OCCUPIED',
          'USERNAME_INVALID',
        ].includes(e.message)
      ) {
        await sendToBot(`Username: ${recipient.username}; Error: ${e.message}`);
      }

      if (!e.message.includes('PEER_FLOOD')) {
        await updateFailedMessage(recipient.username);
      }

      throw new Error('Global Error');
    }
  } else {
    console.log(
      `[${accountId}] Next message can be sent after`,
      blue(String(remainingTime.toLocaleString()))
    );
  }
};
