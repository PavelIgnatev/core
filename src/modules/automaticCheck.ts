import GramJs from '../common/gramjs/tl/api';
import TelegramClient from '../common/gramjs/client/TelegramClient';

import { sendToBot } from '../helpers/sendToBot';
import { getDialogsIds } from '../db/dialogues';

export const automaticCheck = async (
  client: TelegramClient,
  accountId: string
) => {
  const usersIds = new Set();
  let offsetDate = 0;

  while (true) {
    const clientDialogs = (await client.invoke(
      new GramJs.messages.GetDialogs({
        offsetPeer: new GramJs.InputPeerEmpty(),
        folderId: 1,
        limit: 1020,
        offsetDate,
      })
    )) as GramJs.messages.Dialogs;

    const messages = (clientDialogs || {}).messages || [];
    for (const message of messages) {
      if (
        !message.peerId ||
        !(message.peerId instanceof GramJs.PeerUser) ||
        !message.peerId.userId
      ) {
        continue;
      }

      usersIds.add(String(message.peerId.userId));
    }

    if (messages.length < 100) {
      break;
    } else {
      const lastMessage = messages[messages.length - 1];

      if (!(lastMessage instanceof GramJs.Message)) {
        await sendToBot(`** LAST MESSAGE NOT INSTACEOF MESSAGE **
MESSAGE: ${JSON.stringify(lastMessage)}
OFFSET DATE: ${offsetDate}
`);
        return;
      }

      offsetDate = lastMessage.date;
    }
  }

  const usersIdsDB = await getDialogsIds(accountId);

  console.log([...usersIds], usersIdsDB);
};
