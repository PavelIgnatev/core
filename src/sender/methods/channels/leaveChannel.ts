import TelegramClient from '../../../gramjs/client/TelegramClient';
import GramJs from '../../../gramjs/tl/api';
import { invokeRequest } from '../../modules/invokeRequest';

export const leaveChannel = async (
  client: TelegramClient,
  channel: GramJs.TypeInputChannel
) => {
  await invokeRequest(client, new GramJs.channels.LeaveChannel({ channel }));
};
