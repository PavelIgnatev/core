import BigInt from 'big-integer';

import GramJs from '../../common/gramjs/tl/api';
import { sendToBot } from '../../helpers/sendToBot';
import { rmSpLc } from '../../helpers/removeSpacesAndLowerCase';
import { getAccountById } from '../../db/accounts';
import { getDialogue } from '../../db/dialogues';
import { sleep } from '../../helpers/sleep';

function formatDateToUTC(date: Date) {
  const utcDate = new Date(date);
  return `${utcDate.getUTCFullYear()}-${String(utcDate.getUTCMonth() + 1).padStart(2, '0')}-${String(
    utcDate.getUTCDate()
  ).padStart(
    2,
    '0'
  )} ${String(utcDate.getUTCHours()).padStart(2, '0')}:${String(
    utcDate.getUTCMinutes()
  ).padStart(2, '0')}`;
}

function reduceSpaces(string: string) {
  return string.replace(/\s+/g, ' ').trim();
}

function capitalizeFirstLetter(string: string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

function removeNonAlphaPrefix(string: string) {
  if (string === '/start') {
    return string;
  }

  return string.replace(/^[^a-zA-Zа-яА-Я]+/, '');
}

export const sendMessage = async (
  client: any,
  userId: string,
  accessHash: string,
  message: string,
  accountId: string,
  withTyping: boolean
) => {
  let sentMessage = null;
  try {
    if (withTyping) {
      const iterations = Math.ceil(((message.length / 250) * 60 * 1000) / 5000);

      for (let i = 0; i < iterations; i++) {
        await client.invoke(
          new GramJs.messages.SetTyping({
            peer: new GramJs.InputPeerUser({
              userId: BigInt(userId),
              accessHash: BigInt(accessHash),
            }),
            action: new GramJs.SendMessageTypingAction(),
          })
        );

        await sleep(5000);
      }
    }

    sentMessage = await client.invoke(
      new GramJs.messages.SendMessage({
        message: removeNonAlphaPrefix(
          capitalizeFirstLetter(reduceSpaces(message))
        ),
        clearDraft: true,
        peer: new GramJs.InputPeerUser({
          userId: BigInt(userId),
          accessHash: BigInt(accessHash),
        }),
        randomId: BigInt(Math.floor(Math.random() * 10 ** 10) + 10 ** 10),
      })
    );

    if (sentMessage.updates) {
      sentMessage = sentMessage.updates.find(
        (update: any) =>
          rmSpLc(update?.message?.message || '') === rmSpLc(message)
      )?.message;
    }

    if (message !== '/start') {
      if (!sentMessage?.id) {
        throw new Error('MESSAGE_ERROR');
      }

      await client.invoke(
        new GramJs.messages.ReadHistory({
          peer: new GramJs.InputPeerUser({
            userId: BigInt(userId),
            accessHash: BigInt(accessHash),
          }),
          maxId: sentMessage.id,
        })
      );
    }

    return sentMessage;
  } catch (e: any) {
    if (e.message === 'PEER_FLOOD') {
      if (message.length > 30) {
        const fullAccount = await getAccountById(accountId);
        const dialog = await getDialogue(accountId, String(userId));
        const createdDateFormatted = dialog?.dateCreated
          ? formatDateToUTC(dialog.dateCreated)
          : 'N/A';
        const updatedDateFormatted = dialog?.dateUpdated
          ? formatDateToUTC(dialog.dateUpdated)
          : 'N/A';
        const spamBlockDateFormatted =
          fullAccount?.spamBlockDate && fullAccount.spamBlockDate !== 'INFINITY'
            ? formatDateToUTC(fullAccount.spamBlockDate)
            : fullAccount?.spamBlockDate &&
                fullAccount.spamBlockDate === 'INFINITY'
              ? 'INFINITY'
              : 'N/A';

        await sendToBot(
          `*** ${e.message} ***
QUERY: { accountId: "${accountId}", recipientId: "${userId}" }
MESSAGE: ${message}

SPAMBLOCK DATE: ${spamBlockDateFormatted}
DIALOG CREATED DATE: ${createdDateFormatted}
DIALOG UPDATED DATE: ${updatedDateFormatted}`
        );
      }
    } else {
      await sendToBot(
        `*** ${e.message} ***
AccountId: ${accountId}
UserId: ${userId}
Message: ${message}`
      );
    }

    throw new Error(e.message);
  }
};
