import GramJs from '../../common/gramjs/tl/api';

import { invokeRequest } from '../../common/gramjs';
import TelegramClient from '../../common/gramjs/client/TelegramClient';

export async function deleteHistoryByPeer(
  client: TelegramClient,
  peer: GramJs.TypeInputPeer,
  shouldDeleteForAll: boolean
) {
  const result = await invokeRequest(
    client,
    new GramJs.messages.DeleteHistory({
      peer: peer,
      ...(shouldDeleteForAll && { revoke: true }),
      ...(!shouldDeleteForAll && { just_clear: true }),
    })
  );

  if (!result) {
    return;
  }

  if (result.offset) {
    await deleteHistoryByPeer(client, peer, shouldDeleteForAll);
    return;
  }
}
