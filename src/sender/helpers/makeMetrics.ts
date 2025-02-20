import { getTimeStringByTime } from './helpers';
import { sendToMainBot } from './sendToMainBot';

export const makeMetrics = async (
  chunkId: number,
  clients: {
    accountId: string;
    initTime: number;
    endTime: number;
    connectCounts: number;
    connectErrorCounts: number;
    disconnectCounts: number;
    reconnectCounts: number;
  }[],
  clientsData: {
    aiReqest: Record<string, number>;
    aiRetryError: Record<string, number>;
    allTimings: Array<number>;
    endSender: Record<string, number>;
    errorSender: Record<string, number>;
    peerFloods: Record<string, number>;
    phoneSearchError: Record<string, number>;
    startSender: Record<string, number>;
    withoutRecipientError: Record<string, number>;
  },
  endTime: string
) => {
  const {
    aiReqest,
    aiRetryError,
    allTimings,
    endSender,
    errorSender,
    peerFloods,
    phoneSearchError,
    startSender,
    withoutRecipientError,
  } = clientsData;

  const initTimings = clients.map((p) => ({
    id: p.accountId,
    value: Number(p.initTime),
  }));
  const endTimings = clients.map((p) => ({
    id: p.accountId,
    value: Number(p.endTime),
  }));

  const midInitTimings = Math.floor(
    initTimings.reduce((acc, num) => acc + num.value, 0) / initTimings.length
  );
  const maxInitTiming = initTimings.reduce((max, current) =>
    current.value > max.value ? current : max
  );

  const midEndTimings = Math.floor(
    endTimings.reduce((acc, num) => acc + num.value, 0) / endTimings.length
  );
  const maxEndTiming = endTimings.reduce((max, current) =>
    current.value > max.value ? current : max
  );

  const connectCounts = clients.map((s) => ({
    id: s.accountId,
    value: Number(s.connectCounts),
  }));
  const totalConnectCounts = connectCounts.reduce(
    (acc, num) => acc + num.value,
    0
  );
  const midConnectCounts = (totalConnectCounts / connectCounts.length).toFixed(
    2
  );
  const maxConnectCounts = connectCounts.reduce((max, current) =>
    current.value > max.value ? current : max
  );

  const disconnectCounts = clients.map((s) => ({
    id: s.accountId,
    value: Number(s.disconnectCounts),
  }));

  const totalDisconnectCounts = disconnectCounts.reduce(
    (acc, num) => acc + num.value,
    0
  );
  const midDisconnectCounts = (
    totalDisconnectCounts / disconnectCounts.length
  ).toFixed(2);
  const maxDisconnectCounts = disconnectCounts.reduce((max, current) =>
    current.value > max.value ? current : max
  );

  const connectErrorCounts = clients.map((s) => ({
    id: s.accountId,
    value: Number(s.connectErrorCounts),
  }));

  const totalConnectErrorCounts = connectErrorCounts.reduce(
    (acc, num) => acc + num.value,
    0
  );
  const midConnectErrorCounts = (
    totalConnectErrorCounts / connectErrorCounts.length
  ).toFixed(2);
  const maxConnectErrorCounts = connectErrorCounts.reduce((max, current) =>
    current.value > max.value ? current : max
  );

  const reconnectCounts = clients.map((s) => ({
    id: s.accountId,
    value: Number(s.reconnectCounts),
  }));

  const totalReconnectCounts = reconnectCounts.reduce(
    (acc, num) => acc + num.value,
    0
  );
  const midReconnectCounts = (
    totalReconnectCounts / reconnectCounts.length
  ).toFixed(2);
  const maxReconnectCounts = reconnectCounts.reduce((max, current) =>
    current.value > max.value ? current : max
  );

  console.log({
    message: `💥 CHUNK #${chunkId} DONE (${endTime}) 💥`,
    initTimings,
    endTimings,
    connectCounts,
    reconnectCounts,
    disconnectCounts,
    connectErrorCounts,
  });

  await sendToMainBot(`💥 CHUNK #${chunkId} DONE (${endTime}) 💥

* АККАУНТЫ * 
В РАБОТЕ: ${clients.length}
СРЕДНЕЕ ВРЕМЯ ЗАПУСКА: ${getTimeStringByTime(midInitTimings)} (max: ${getTimeStringByTime(maxInitTiming.value)})
СРЕДНЕЕ ВРЕМЯ РАБОТЫ: ${getTimeStringByTime(midEndTimings)} (max: ${getTimeStringByTime(maxEndTiming.value)})

* СТАБИЛЬНОСТЬ *
REQUEST_COUNT: ${allTimings.length}
RESPONSE_TIME: ${Number(
    (
      allTimings.reduce((acc, num) => acc + Number(num), 0) /
      allTimings.length /
      1000
    ).toFixed(2)
  )}ms
CONNECT: ${totalConnectCounts} (mid: ${midConnectCounts}, max: ${maxConnectCounts.value})
RECONNECT: ${totalReconnectCounts} (mid: ${midReconnectCounts}, max: ${maxReconnectCounts.value})
DISCONNECT: ${totalDisconnectCounts} (mid: ${midDisconnectCounts}, max: ${maxDisconnectCounts.value})
NETWORK_ERRORS: ${totalConnectErrorCounts} (mid: ${midConnectErrorCounts}, max: ${maxConnectErrorCounts.value})

* ОТПРАВКИ *
ИНИЦИИРОВАНО: ${Object.keys(startSender).length}
ПОДТВЕРЖДЕНО: ${Object.keys(endSender).length}
ОШИБОК: ${Object.keys(errorSender).length} ${Object.keys(peerFloods).length > 0 ? `(PEER_FLOOD: ${Object.keys(peerFloods).length}, WITHOUT_RECIPIENT: ${Object.keys(withoutRecipientError).length})` : ''}
БЛОКИРОВКА ПОИСКА ПО НОМЕРУ: ${Object.keys(phoneSearchError).length}${
    Object.keys(aiReqest).length > 0
      ? `\n\n* ИИ *
${Object.keys(aiReqest)
  .map((r) => `${r}: ${aiReqest[r]} requests, ${aiRetryError[r] || 0} errors`)
  .join('\n')}`
      : ''
  }`);
};
