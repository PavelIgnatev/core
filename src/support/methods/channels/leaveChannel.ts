import TelegramClient from '../../../gramjs/client/TelegramClient';
import GramJs from '../../../gramjs/tl/api';
import { invokeRequest } from '../../modules/invokeRequest';

export const leaveChannel = async (
  client: TelegramClient,
  channel: GramJs.TypeInputChannel,
  shouldIgnoreErrors: boolean = false
) => {
  await invokeRequest(client, new GramJs.channels.LeaveChannel({ channel }), {
    shouldIgnoreErrors,
  });
};
