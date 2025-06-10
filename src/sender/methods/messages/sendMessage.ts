import BigInt from 'big-integer';

import TelegramClient from '../../../gramjs/client/TelegramClient';
import GramJs from '../../../gramjs/tl/api';
import { getAccountById } from '../../db/accounts';
import { getDialogue } from '../../db/dialogues';
import {
  capitalizeFirstLetter,
  formatDateToUTC,
  removeNonAlphaPrefix,
  sleep,
  smartFilterMessage,
} from '../../helpers/helpers';
import { sendToMainBot } from '../../helpers/sendToMainBot';
import { invokeRequest } from '../../modules/invokeRequest';

const logPeerFloodError = async (
  message: string,
  accountId: string,
  userId: string
) => {
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
      : fullAccount?.spamBlockDate === 'INFINITY'
        ? 'INFINITY'
        : 'N/A';

  await sendToMainBot(
    `*** PEER_FLOOD ***
QUERY: { accountId: "${accountId}", recipientId: "${userId}" }
MESSAGE: ${message}

SPAMBLOCK DATE: ${spamBlockDateFormatted}
DIALOG CREATED DATE: ${createdDateFormatted}
DIALOG UPDATED DATE: ${updatedDateFormatted}`
  );
};

const logGeneralError = async (
  error: Error,
  accountId: string,
  userId: string,
  message: string
) => {
  await sendToMainBot(
    `*** ${error.message} ***
AccountId: ${accountId}
UserId: ${userId}
Message: ${message}`
  );
};

export const sendMessage = async (
  client: TelegramClient,
  userId: string,
  accessHash: string,
  message: string,
  accountId: string,
  withTyping: boolean,
  withReadHistory: boolean,
  withFilter: boolean = true,
  entities: GramJs.TypeMessageEntity[] = []
) => {
  let messageUpdate;
  try {
    if (withTyping) {
      const iterations = Math.ceil(((message.length / 250) * 60 * 1000) / 5000);

      for (let i = 0; i < iterations; i++) {
        await invokeRequest(
          client,
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

    const filtredMessage = withFilter
      ? removeNonAlphaPrefix(capitalizeFirstLetter(smartFilterMessage(message)))
      : message;

    const update = await invokeRequest(
      client,
      new GramJs.messages.SendMessage({
        message: filtredMessage,
        clearDraft: true,
        peer: new GramJs.InputPeerUser({
          userId: BigInt(userId),
          accessHash: BigInt(accessHash),
        }),
        entities: entities.length > 0 ? entities : undefined,
        randomId: BigInt(Math.floor(Math.random() * 10 ** 10) + 10 ** 10),
      })
    );

    if (!update) {
      messageUpdate = null;
    } else if (
      update instanceof GramJs.UpdateShortSentMessage ||
      update instanceof GramJs.UpdateMessageID
    ) {
      messageUpdate = update;
    } else if ('updates' in update) {
      messageUpdate = update.updates.find(
        (u) => u instanceof GramJs.UpdateMessageID
      );
    }

    if (!messageUpdate?.id) {
      throw new Error('MESSAGE_NOT_SENT');
    }

    if (withReadHistory) {
      await invokeRequest(
        client,
        new GramJs.messages.ReadHistory({
          peer: new GramJs.InputPeerUser({
            userId: BigInt(userId),
            accessHash: BigInt(accessHash),
          }),
          maxId: messageUpdate.id,
        })
      );
    }

    return messageUpdate;
  } catch (error: any) {
    if (error.message.includes('ALLOW_PAYMENT_REQUIRED')) {
      throw new Error('ALLOW_PAYMENT_REQUIRED');
    }

    if (error.message === 'PEER_FLOOD') {
      if (message.length > 30) {
        await logPeerFloodError(message, accountId, userId);
      }
    } else {
      await logGeneralError(error, accountId, userId, message);
    }

    throw error;
  }
};
