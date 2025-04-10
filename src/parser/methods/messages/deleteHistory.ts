import TelegramClient from '../../../gramjs/client/TelegramClient';
import GramJs from '../../../gramjs/tl/api';
import { invokeRequest } from '../../modules/invokeRequest';

export async function deleteHistory(
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
    await deleteHistory(client, peer, shouldDeleteForAll);
    return;
  }
}
