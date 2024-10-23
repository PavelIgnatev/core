import BigInt from 'big-integer';

import GramJs from '../common/gramjs/tl/api';

import { yellow } from 'colors/safe';
import { getDialogue } from '../db/dialogues';
import { sendToBot } from '../helpers/sendToBot';

function findValue(obj: Record<string, any>, valueKey: string) {
  return (
    obj[valueKey] ||
    obj.peer?.[valueKey] ||
    obj.message?.[valueKey] ||
    obj.message?.fromId?.[valueKey] ||
    obj.message?.peer?.[valueKey] ||
    obj.message?.peerId?.[valueKey]
  );
}

export const handleUpdate = async (
  client: any,
  accountId: string,
  update: any,

  onNewMessage: () => void
) => {
  if (!update) {
    return;
  }

  console.log(
    `[${accountId}]`,
    yellow(`Update handler: "${update.className}"`)
  );

  if (
    update.className === 'UpdateConnectionState' ||
    update.className === 'UpdateUserStatus'
  ) {
    return;
  }

  const channelId = findValue(update, 'channelId');
  const chatId = findValue(update, 'chatId');
  const userId = findValue(update, 'userId');

  if (chatId) {
    await sendToBot(`** ЕСТЬ CHAT ID (ДА НУ НАХУЙ БЛЯТЬ?????? ГДЕЕЕЕ???) **
${JSON.stringify(update)}
AccountID: ${accountId}`);
    await sendToBot(`** ЕСТЬ CHAT ID **
${JSON.stringify(update)}
AccountID: ${accountId}
${JSON.stringify(update)}`);
  } else if (channelId) {
    try {
      const channel = await client.invoke(
        new GramJs.channels.GetChannels({
          id: [
            new GramJs.InputChannel({
              channelId: BigInt(Number(channelId)),
              accessHash: BigInt(0),
            }),
          ],
        })
      );

      const chat = channel?.chats?.[0];
      if (!chat || !chat.id || !chat.accessHash) {
        await sendToBot(`
** СОБЫТИЕ НА ЧАТ/КАНАЛ ПРИШЛО, НО ЧАТ/КАНАЛ НЕ НАЙДЕН**
ACCOUNTID: ${accountId}
CHATID: ${chat?.id}
ACCESSHASH: ${chat?.accessHash}
ChannelId; ${channelId}`);
        await sendToBot(`
** СОБЫТИЕ НА ЧАТ ПРИШЛО, НО ЧАТ НЕ НАЙДЕН**
ACCOUNTID: ${accountId}
ChannelId; ${channelId}
${JSON.stringify(update)}`);
      }

      await client.invoke(
        new GramJs.channels.LeaveChannel({
          channel: new GramJs.InputChannel({
            channelId: BigInt(Number(chat.id)),
            accessHash: BigInt(chat.accessHash),
          }),
        })
      );
    } catch (e: any) {
      await sendToBot(`** ОШИБКА ПРИ ВЫХОДЕ С КАНАЛА/ЧАТА ${e.message} **
ACCOUNTID: ${accountId}
ChannelId: ${channelId}
${JSON.stringify(update)}`);
    }
  } else if (userId) {
    if (
      update instanceof GramJs.UpdateNewMessage ||
      update instanceof GramJs.UpdateShortMessage
    ) {
      const isDialogInDb = await getDialogue(accountId, String(userId));
      if (isDialogInDb) {
        console.log(
          `[${accountId}]`,
          yellow(
            `New message "${update.message}" from user by id#${String(userId)}`
          )
        );

        onNewMessage();
      } else if (String(userId) !== '178220800') {
        await sendToBot(`Не найден диалог в дб для: ${JSON.stringify(update)}`);
      }
    }
  }
};
