import BigInt from 'big-integer';
import { blue, gray } from 'colors/safe';

import GramJs from '../../common/gramjs/tl/api';
import { sendToBot } from '../../helpers/sendToBot';

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
  accountId: string
) => {
  let sentMessage = null;
  try {
    console.log(
      `[${accountId}] Send ${gray(message)} to ${blue(
        `${userId}:${accessHash}`
      )}`
    );

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

    if (message !== '/start') {
      if (!sentMessage?.id) {
        throw new Error('MESSAGE ERROR');
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
    await sendToBot(
      `*** ERRPR: ${e.message} ***
AccountId: ${accountId}
UserId: ${userId}
Message: ${message}
Sent message: ${JSON.stringify(sentMessage)}`
    );

    throw new Error(e.message);
  }
};
