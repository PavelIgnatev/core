import { getTimeStringByTime } from './helpers';
import { sendToMainBot } from './sendToMainBot';

type ClientData = {
  accountId: string;
  initTime: number;
  endTime: number;
  connectCounts: number;
  connectErrorCounts: number;
  disconnectCounts: number;
  reconnectCounts: number;
};

type ClientsData = {
  aiReqest: Record<string, number>;
  aiRetryError: Record<string, number>;
  allTimings: Array<number>;
  endSender: Record<string, number>;
  errorSender: Record<string, number>;
  peerFloods: Record<string, number>;
  phoneSearchError: Record<string, number>;
  startSender: Record<string, number>;
  withoutRecipientError: Record<string, number>;
};

type WorkerSuccessData = {
  chunkId: number;
  clients: ClientData[];
  clientsData: ClientsData;
  endTime: string;
};

export const makeMetricsAll = async (promises: WorkerSuccessData[]) => {
  const globalMetrics = {
    clients: [] as ClientData[],
    clientsData: {
      aiReqest: {},
      aiRetryError: {},
      allTimings: [] as number[],
      endSender: {},
      errorSender: {},
      peerFloods: {},
      phoneSearchError: {},
      startSender: {},
      withoutRecipientError: {},
    } as ClientsData,
  };

  // Объединяем все данные из промисов
  for (const promise of promises) {
    const { clients, clientsData } = promise;

    // Добавляем клиентов в общий массив
    globalMetrics.clients.push(...clients);

    // Объединяем данные клиентов
    for (const key in clientsData) {
      if (key === 'allTimings') {
        globalMetrics.clientsData.allTimings.push(...clientsData.allTimings);
      } else {
        const target = globalMetrics.clientsData[key as keyof Omit<ClientsData, 'allTimings'>];
        const source = clientsData[key as keyof Omit<ClientsData, 'allTimings'>];
        if (typeof target === 'object' && target !== null) {
          for (const k in source) {
            (target as Record<string, number>)[k] = ((target as Record<string, number>)[k] || 0) + (source as Record<string, number>)[k];
          }
        }
      }
    }
  }

  // Вычисляем общие метрики
  const initTimings = globalMetrics.clients.map((p) => ({
    id: p.accountId,
    value: Number(p.initTime),
  }));
  const endTimings = globalMetrics.clients.map((p) => ({
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

  const connectCounts = globalMetrics.clients.map((s) => ({
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

  const disconnectCounts = globalMetrics.clients.map((s) => ({
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

  const connectErrorCounts = globalMetrics.clients.map((s) => ({
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

  const reconnectCounts = globalMetrics.clients.map((s) => ({
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

  // Формируем статистику по времени выполнения чанков
  const chunkTimesStats = promises
    .sort((a, b) => a.chunkId - b.chunkId)
    .map(({ chunkId, endTime }) => `${chunkId}: ${endTime}`)
    .join('\n');

  console.log({
    message: '💥 ALL CHUNKS DONE 💥',
    totalChunks: promises.length,
    totalClients: globalMetrics.clients.length,
  });

  await sendToMainBot(`💥 ALL CHUNKS DONE 💥

* ВРЕМЯ ВЫПОЛНЕНИЯ ЧАНКОВ *
${chunkTimesStats}

* АККАУНТЫ * 
ВСЕГО ЧАНКОВ: ${promises.length}
В РАБОТЕ: ${globalMetrics.clients.length}
СРЕДНЕЕ ВРЕМЯ ЗАПУСКА: ${getTimeStringByTime(midInitTimings)} (max: ${getTimeStringByTime(maxInitTiming.value)})
СРЕДНЕЕ ВРЕМЯ РАБОТЫ: ${getTimeStringByTime(midEndTimings)} (max: ${getTimeStringByTime(maxEndTiming.value)})

* СТАБИЛЬНОСТЬ *
REQUEST_COUNT: ${globalMetrics.clientsData.allTimings.length}
RESPONSE_TIME: ${Number(
    (
      globalMetrics.clientsData.allTimings.reduce((acc, num) => acc + Number(num), 0) /
      globalMetrics.clientsData.allTimings.length /
      1000
    ).toFixed(2)
  )}ms
CONNECT: ${totalConnectCounts} (mid: ${midConnectCounts}, max: ${maxConnectCounts.value})
RECONNECT: ${totalReconnectCounts} (mid: ${midReconnectCounts}, max: ${maxReconnectCounts.value})
DISCONNECT: ${totalDisconnectCounts} (mid: ${midDisconnectCounts}, max: ${maxDisconnectCounts.value})
NETWORK_ERRORS: ${totalConnectErrorCounts} (mid: ${midConnectErrorCounts}, max: ${maxConnectErrorCounts.value})

* ОТПРАВКИ *
ИНИЦИИРОВАНО: ${Object.keys(globalMetrics.clientsData.startSender).length}
ПОДТВЕРЖДЕНО: ${Object.keys(globalMetrics.clientsData.endSender).length}
ОШИБОК: ${Object.keys(globalMetrics.clientsData.errorSender).length} ${Object.keys(globalMetrics.clientsData.peerFloods).length > 0 ? `(PEER_FLOOD: ${Object.keys(globalMetrics.clientsData.peerFloods).length}, WITHOUT_RECIPIENT: ${Object.keys(globalMetrics.clientsData.withoutRecipientError).length})` : ''}
БЛОКИРОВКА ПОИСКА ПО НОМЕРУ: ${Object.keys(globalMetrics.clientsData.phoneSearchError).length}${
    Object.keys(globalMetrics.clientsData.aiReqest).length > 0
      ? `\n\n* ИИ *
${Object.keys(globalMetrics.clientsData.aiReqest)
  .map((r) => `${r}: ${globalMetrics.clientsData.aiReqest[r]} requests, ${globalMetrics.clientsData.aiRetryError[r] || 0} errors`)
  .join('\n')}`
      : ''
  }`);
};
