import { invokeRequest } from '../../common/gramjs';
import TelegramClient from '../../common/gramjs/client/TelegramClient';
import GramJs from '../../common/gramjs/tl/api';

export const leaveChannel = async (
  client: TelegramClient,
  channel: GramJs.TypeInputChannel
) => {
  await invokeRequest(client, new GramJs.channels.LeaveChannel({ channel }));
};
