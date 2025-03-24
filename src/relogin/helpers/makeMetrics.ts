import {
  allTimings,
  getTimeString,
  getTimeStringByTime,
} from '../helpers/helpers';
import { sendToMainBot } from '../helpers/sendToMainBot';

export const makeMetrics = async (
  clients: any[],
  startCheckerTime: number,
  type: 'RELOGIN' | 'RECHECK'
) => {
  if (!clients.filter(Boolean).length) {
    console.log({
      message: `💥 ${type} ITERATION DONE (${getTimeString(startCheckerTime)}) 💥`,
      prefix: 'GLOBAL_METRICS',
      accountId: `GLOBAL_METRICS_${type}`,
      initTimings: [],
      endTimings: [],
      connectCounts: [],
      reconnectCounts: [],
      disconnectCounts: [],
      connectErrorCounts: [],
    });

    await sendToMainBot(`💥 ${type} ITERATION DONE (${getTimeString(startCheckerTime)}) 💥

* АККАУНТЫ * 
В РАБОТЕ: 0
СРЕДНЕЕ ВРЕМЯ ЗАПУСКА: 0s (max: 0s)
СРЕДНЕЕ ВРЕМЯ РАБОТЫ: 0s (max: 0s)

* СТАБИЛЬНОСТЬ *
REQUEST_COUNT: 0
RESPONSE_TIME: 0ms
CONNECT: 0 (mid: 0, max: 0)
RECONNECT: 0 (mid: 0, max: 0)
DISCONNECT: 0 (mid: 0, max: 0)
NETWORK_ERRORS: 0 (mid: 0, max: 0)`);
    return;
  }

  const ps = clients.filter(Boolean);
  const senders = ps.map((p) => p._sender);
  const initTimings = ps.map((p) => ({
    id: p._accountId,
    value: Number(p._initTime),
  }));
  const endTimings = ps.map((p) => ({
    id: p._accountId,
    value: Number(p._endTime),
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

  // Получаем статистику соединений для всех клиентов
  const clientStats = ps.map((p) => ({
    id: p._accountId,
    stats: p.getConnectionStats()
  }));

  const connectCounts = clientStats.map((item) => ({
    id: item.id,
    value: item.stats.connectCounts,
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

  const reconnectCounts = clientStats.map((item) => ({
    id: item.id,
    value: item.stats.reconnectCounts,
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

  const disconnectCounts = clientStats.map((item) => ({
    id: item.id,
    value: item.stats.disconnectCounts,
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

  const connectErrorCounts = clientStats.map((item) => ({
    id: item.id,
    value: item.stats.connectErrorCounts,
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

  console.log({
    message: `💥 ${type} ITERATION DONE (${getTimeString(startCheckerTime)}) 💥`,
    prefix: 'GLOBAL_METRICS',
    accountId: `GLOBAL_METRICS_${type}`,
    initTimings,
    endTimings,
    connectCounts,
    reconnectCounts,
    disconnectCounts,
    connectErrorCounts,
  });

  await sendToMainBot(`💥 ${type} ITERATION DONE (${getTimeString(startCheckerTime)}) 💥
  
* АККАУНТЫ * 
В РАБОТЕ: ${clients.length}
СРЕДНЕЕ ВРЕМЯ ЗАПУСКА: ${getTimeStringByTime(midInitTimings)} (max: ${getTimeStringByTime(maxInitTiming.value)})
СРЕДНЕЕ ВРЕМЯ РАБОТЫ: ${getTimeStringByTime(midEndTimings)} (max: ${getTimeStringByTime(maxEndTiming.value)})

* СТАБИЛЬНОСТЬ *
REQUEST_COUNT: ${allTimings.length}
RESPONSE_TIME: ${Number(
    (
      allTimings.reduce((acc, num) => acc + num, 0) /
      allTimings.length /
      1000
    ).toFixed(2)
  )}ms
CONNECT: ${totalConnectCounts} (mid: ${midConnectCounts}, max: ${maxConnectCounts.value})
RECONNECT: ${totalReconnectCounts} (mid: ${midReconnectCounts}, max: ${maxReconnectCounts.value})
DISCONNECT: ${totalDisconnectCounts} (mid: ${midDisconnectCounts}, max: ${maxDisconnectCounts.value})
NETWORK_ERRORS: ${totalConnectErrorCounts} (mid: ${midConnectErrorCounts}, max: ${maxConnectErrorCounts.value})`);
};
