import BigInt from 'big-integer';

import TelegramClient from '../../../gramjs/client/TelegramClient';
import GramJs from '../../../gramjs/tl/api';
import {
  capitalizeFirstLetter,
  reduceSpaces,
  removeNonAlphaPrefix,
  sleep,
} from '../../helpers/helpers';
import { invokeRequest } from '../../modules/invokeRequest';

export const sendMessage = async (
  client: TelegramClient,
  userId: string,
  accessHash: string,
  message: string,
  accountId: string,
  withTyping: boolean,
  withReadHistory: boolean
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

    const update = await invokeRequest(
      client,
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
    throw error;
  }
};
