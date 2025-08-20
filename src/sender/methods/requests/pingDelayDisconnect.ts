import BigInt from 'big-integer';

import { TelegramClient } from '../../../gramjs';
import { getRandomInt } from '../../../gramjs/Helpers';
import GramJs from '../../../gramjs/tl/api';
import { invokeRequest } from '../../modules/invokeRequest';

export const pingDelayDisconnect = async (client: TelegramClient) => {
  const pingResponse = await invokeRequest(
    client,
    new GramJs.PingDelayDisconnect({
      pingId: BigInt(
        getRandomInt(Number.MIN_SAFE_INTEGER, Number.MAX_SAFE_INTEGER)
      ),
      disconnectDelay: 210,
    })
  );

  return pingResponse;
};
