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
  reconnectHistory?: Array<{
    timestamp: Date;
    accountId: string;
  }>;
  metrics?: {
    sent: number;
    received: number;
    sentSize: number;
    receivedSize: number;
  };
};

type ClientsData = {
  aiReqest: Record<string, number>;
  aiRetryError: Record<string, number>;
  allTimings: Array<number>;
  errorSender: Record<string, number>;
  peerFloods: Record<string, number>;
  phoneSearchError: Record<string, number>;
  startSender: Record<string, number>;
  withoutRecipientError: Record<string, number>;
  messageStats?: Record<string, { single: boolean; double: boolean }>;
};

type WorkerSuccessData = {
  chunkId: number;
  clients: ClientData[];
  clientsData: ClientsData;
  endTime: string;
  isFrozen: boolean;
};

export const makeMetricsAll = async (
  promises: WorkerSuccessData[],
  startTime: number = Date.now()
) => {
  // Разделяем пачки на frozen и regular
  const frozenPromises = promises.filter(p => p.isFrozen);
  const regularPromises = promises.filter(p => !p.isFrozen);

  // Функция для создания глобальных метрик
  const createGlobalMetrics = () => ({
    clients: [] as ClientData[],
    clientsData: {
      aiReqest: {},
      aiRetryError: {},
      allTimings: [] as number[],
      errorSender: {},
      peerFloods: {},
      phoneSearchError: {},
      startSender: {},
      withoutRecipientError: {},
      messageStats: {},
    } as ClientsData,
  });

  const globalMetrics = createGlobalMetrics();
  const frozenMetrics = createGlobalMetrics();
  const regularMetrics = createGlobalMetrics();

  // Функция для объединения данных из промисов
  const mergeMetrics = (targetMetrics: ReturnType<typeof createGlobalMetrics>, sourcePromises: WorkerSuccessData[]) => {
    for (const promise of sourcePromises) {
      const { clients, clientsData } = promise;

      // Добавляем клиентов в общий массив
      targetMetrics.clients.push(...clients);

      // Объединяем данные клиентов
      for (const key in clientsData) {
        if (key === 'allTimings') {
          targetMetrics.clientsData.allTimings.push(...clientsData.allTimings);
        } else {
          const target =
            targetMetrics.clientsData[
              key as keyof Omit<ClientsData, 'allTimings'>
            ];
          const source =
            clientsData[key as keyof Omit<ClientsData, 'allTimings'>];
          if (typeof target === 'object' && target !== null) {
            for (const k in source) {
              (target as Record<string, number>)[k] =
                ((target as Record<string, number>)[k] || 0) +
                (source as Record<string, number>)[k];
            }
          }
        }
      }
    }
  };

  // Объединяем данные для всех типов метрик
  mergeMetrics(globalMetrics, promises);
  mergeMetrics(frozenMetrics, frozenPromises);
  mergeMetrics(regularMetrics, regularPromises);

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
    frozenChunks: frozenPromises.length,
    frozenClients: frozenMetrics.clients.length,
    regularChunks: regularPromises.length,
    regularClients: regularMetrics.clients.length,
  });

  const reconnectDistribution: Record<string, number> = {};

  for (const client of globalMetrics.clients) {
    const count = client.reconnectCounts;
    const key = count.toString();
    reconnectDistribution[key] = (reconnectDistribution[key] || 0) + 1;
  }

  const sortedKeys = Object.keys(reconnectDistribution)
    .map(Number)
    .sort((a, b) => a - b);

  function getWordForm(number: number, wordForms: string[]): string {
    const cases = [2, 0, 1, 1, 1, 2];
    return wordForms[
      number % 100 > 4 && number % 100 < 20
        ? 2
        : cases[Math.min(number % 10, 5)]
    ];
  }

  let reconnectStats = '';
  if (sortedKeys.length > 0) {
    const statsLines = sortedKeys.map((key) => {
      const count = reconnectDistribution[key.toString()];
      const accountWord = getWordForm(count, [
        'аккаунт',
        'аккаунта',
        'аккаунтов',
      ]);
      const reconnectSuffix = getWordForm(key, ['', 'А', 'ОВ']);

      return `▪️ ${key === 0 ? 'БЕЗ РЕКОННЕКТОВ' : `${key} РЕКОННЕКТ${reconnectSuffix}`}: ${count} ${accountWord}`;
    });

    reconnectStats = statsLines.join('\n');
  } else {
    reconnectStats = 'Нет данных о реконнектах';
  }

  let totalSingleSends = 0;
  let totalDoubleSends = 0;
  let totalCompletedSends = 0;
  
  const mergedMessageStats: Record<string, { single: boolean; double: boolean }> = {};
  
  for (const promise of promises) {
    const { clientsData } = promise;
    
    if (clientsData.messageStats) {
      for (const accountId in clientsData.messageStats) {
        const metrics = clientsData.messageStats[accountId];
        
        if (!mergedMessageStats[accountId]) {
          mergedMessageStats[accountId] = { single: false, double: false };
        }
        
        if (metrics?.single) {
          mergedMessageStats[accountId].single = true;
          totalSingleSends++;
        }
        
        if (metrics?.double) {
          mergedMessageStats[accountId].double = true;
          totalDoubleSends++;
          if (metrics?.single) {
            totalSingleSends--;
          }
        }
        
        if (metrics?.single || metrics?.double) {
          totalCompletedSends++;
        }
      }
    }
  }
  
  globalMetrics.clientsData.messageStats = mergedMessageStats;

  await sendToMainBot(`💥 ALL CHUNKS DONE 💥

* ВРЕМЯ ВЫПОЛНЕНИЯ ЧАНКОВ *
${chunkTimesStats}

* АККАУНТЫ *
ВСЕГО ЧАНКОВ: ${promises.length} (FROZEN: ${frozenPromises.length}, REGULAR: ${regularPromises.length})
В РАБОТЕ: ${globalMetrics.clients.length} (FROZEN: ${frozenMetrics.clients.length}, REGULAR: ${regularMetrics.clients.length})
СРЕДНЕЕ ВРЕМЯ ЗАПУСКА: ${getTimeStringByTime(midInitTimings)} (max: ${getTimeStringByTime(maxInitTiming.value)})
СРЕДНЕЕ ВРЕМЯ РАБОТЫ: ${getTimeStringByTime(midEndTimings)} (max: ${getTimeStringByTime(maxEndTiming.value)})

* СТАБИЛЬНОСТЬ *
REQUEST_COUNT: ${globalMetrics.clientsData.allTimings.length}
RESPONSE_TIME: ${Number(
    (
      globalMetrics.clientsData.allTimings.reduce(
        (acc, num) => acc + Number(num),
        0
      ) /
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
ПОДТВЕРЖДЕНО (ВСЕГО): ${totalCompletedSends}
ПОДТВЕРЖДЕНО (ОДИНАРНЫХ): ${totalSingleSends}
ПОДТВЕРЖДЕНО (ДВОЙНЫХ): ${totalDoubleSends}
ОШИБОК: ${Object.keys(globalMetrics.clientsData.errorSender).length} ${Object.keys(globalMetrics.clientsData.peerFloods).length > 0 ? `(PEER_FLOOD: ${Object.keys(globalMetrics.clientsData.peerFloods).length}, WITHOUT_RECIPIENT: ${Object.keys(globalMetrics.clientsData.withoutRecipientError).length})` : ''}
БЛОКИРОВКА ПОИСКА ПО НОМЕРУ: ${Object.keys(globalMetrics.clientsData.phoneSearchError).length}${
    Object.keys(globalMetrics.clientsData.aiReqest).length > 0
      ? `\n\n* ИИ *
${Object.keys(globalMetrics.clientsData.aiReqest)
  .map(
    (r) =>
      `${r}: ${globalMetrics.clientsData.aiReqest[r]} requests, ${globalMetrics.clientsData.aiRetryError[r] || 0} errors`
  )
  .join('\n')}`
      : ''
  }`);

  const allReconnectHistory: Array<{
    timestamp: Date;
    accountId: string;
  }> = [];

  for (const client of globalMetrics.clients) {
    if (client.reconnectHistory && client.reconnectHistory.length > 0) {
      allReconnectHistory.push(...client.reconnectHistory);
    }
  }

  let minuteStatsText = '';
  let startDate: Date | null = null;

  if (allReconnectHistory.length > 0) {
    startDate = new Date(startTime);

    const minuteDistribution: Record<number, number> = {};

    for (const reconnect of allReconnectHistory) {
      const diffMinutes = Math.floor(
        (reconnect.timestamp.getTime() - startDate.getTime()) / (1000 * 60)
      );
      minuteDistribution[diffMinutes] =
        (minuteDistribution[diffMinutes] || 0) + 1;
    }

    const normalizedMinutes: Record<number, number> = {};
    const sortedMinutes = Object.keys(minuteDistribution)
      .map(Number)
      .sort((a, b) => a - b);

    sortedMinutes.forEach((originalMinute, index) => {
      const normalizedMinute = index + 1;
      normalizedMinutes[normalizedMinute] = minuteDistribution[originalMinute];
    });

    const minuteStats = Object.keys(normalizedMinutes)
      .map(Number)
      .sort((a, b) => a - b)
      .map((minute) => {
        const count = normalizedMinutes[minute];
        const reconnectWord = getWordForm(count, [
          'аккаунт  ',
          'аккаунта',
          'аккаунтов',
        ]);

        return `▫️ ${minute}-АЯ МИНУТА: ${count} ${reconnectWord}`;
      });

    if (minuteStats.length > 0) {
      minuteStatsText = minuteStats.join('\n');
    }
  }

  await sendToMainBot(`📊 СТАТИСТИКА РЕКОННЕКТОВ 📊

РАСПРЕДЕЛЕНИЕ ПО РЕКОННЕКТАМ
${reconnectStats}
${minuteStatsText ? `\nРАСПРЕДЕЛЕНИЕ ПО МИНУТАМ\n${minuteStatsText}` : ''}`);

  // Отправляем отдельное сообщение с метриками трафика
  await sendToMainBot(`📊 СТАТИСТИКА СЕТЕВОГО ТРАФИКА 📊

${getTrafficReport(globalMetrics.clients)}`);
};

function getTrafficReport(clients: ClientData[]): string {
  // Фильтруем клиентов с метриками
  const clientsWithMetrics = clients.filter((client) => client.metrics);
  
  if (clientsWithMetrics.length === 0) {
    return 'Нет данных о трафике';
  }

  // Рассчитываем общее количество и размер
  const totalSent = clientsWithMetrics.reduce((acc, client) => acc + (client.metrics?.sent || 0), 0);
  const totalReceived = clientsWithMetrics.reduce((acc, client) => acc + (client.metrics?.received || 0), 0);
  const totalSentSize = clientsWithMetrics.reduce((acc, client) => acc + (client.metrics?.sentSize || 0), 0);
  const totalReceivedSize = clientsWithMetrics.reduce((acc, client) => acc + (client.metrics?.receivedSize || 0), 0);

  // Рассчитываем средние значения
  const avgSent = totalSent / clientsWithMetrics.length;
  const avgReceived = totalReceived / clientsWithMetrics.length;
  const avgSentSize = totalSentSize / clientsWithMetrics.length;
  const avgReceivedSize = totalReceivedSize / clientsWithMetrics.length;

  // Форматируем байты в более читабельный формат
  const formatBytes = (bytes: number): string => {
    if (bytes === 0) return '0 Б';
    const sizes = ['Б', 'КБ', 'МБ', 'ГБ'];
    const i = Math.floor(Math.log(bytes) / Math.log(1024));
    return `${(bytes / Math.pow(1024, i)).toFixed(2)} ${sizes[i]}`;
  };

  // Создаем функцию для форматирования топов
  const formatTop = (list: Array<{ id: string; value: number }>, isByteSize = false): string => {
    return list
      .map((item, index) => {
        const value = isByteSize ? formatBytes(item.value) : item.value.toFixed(0);
        return `${index + 1}. ${item.id}: ${value}`;
      })
      .join('\n');
  };

  // Топ 5 по количеству отправленных пакетов
  const topBySentPackets = clientsWithMetrics
    .map((client) => ({
      id: client.accountId,
      value: client.metrics?.sent || 0,
    }))
    .sort((a, b) => b.value - a.value)
    .slice(0, 5);

  // Топ 5 по количеству полученных пакетов
  const topByReceivedPackets = clientsWithMetrics
    .map((client) => ({
      id: client.accountId,
      value: client.metrics?.received || 0,
    }))
    .sort((a, b) => b.value - a.value)
    .slice(0, 5);

  // Топ 5 по размеру отправленных данных
  const topBySentSize = clientsWithMetrics
    .map((client) => ({
      id: client.accountId,
      value: client.metrics?.sentSize || 0,
    }))
    .sort((a, b) => b.value - a.value)
    .slice(0, 5);

  // Топ 5 по размеру полученных данных
  const topByReceivedSize = clientsWithMetrics
    .map((client) => ({
      id: client.accountId,
      value: client.metrics?.receivedSize || 0,
    }))
    .sort((a, b) => b.value - a.value)
    .slice(0, 5);

  // Топ 5 по среднему размеру отправленного пакета
  const topByAvgSentPacketSize = clientsWithMetrics
    .map((client) => ({
      id: client.accountId,
      value: (client.metrics?.sent || 0) > 0 
        ? (client.metrics?.sentSize || 0) / (client.metrics?.sent || 1) 
        : 0,
    }))
    .sort((a, b) => b.value - a.value)
    .slice(0, 5);

  // Топ 5 по среднему размеру полученного пакета
  const topByAvgReceivedPacketSize = clientsWithMetrics
    .map((client) => ({
      id: client.accountId,
      value: (client.metrics?.received || 0) > 0 
        ? (client.metrics?.receivedSize || 0) / (client.metrics?.received || 1) 
        : 0,
    }))
    .sort((a, b) => b.value - a.value)
    .slice(0, 5);

  // Топ 5 с наименьшим средним размером отправленного пакета
  const bottomByAvgSentPacketSize = clientsWithMetrics
    .filter((client) => (client.metrics?.sent || 0) > 0)
    .map((client) => ({
      id: client.accountId,
      value: (client.metrics?.sentSize || 0) / (client.metrics?.sent || 1),
    }))
    .sort((a, b) => a.value - b.value)
    .slice(0, 5);

  // Топ 5 с наименьшим средним размером полученного пакета
  const bottomByAvgReceivedPacketSize = clientsWithMetrics
    .filter((client) => (client.metrics?.received || 0) > 0)
    .map((client) => ({
      id: client.accountId,
      value: (client.metrics?.receivedSize || 0) / (client.metrics?.received || 1),
    }))
    .sort((a, b) => a.value - b.value)
    .slice(0, 5);

  return `ВСЕГО ОТПРАВЛЕНО ПАКЕТОВ: ${totalSent} (${formatBytes(totalSentSize)})
ВСЕГО ПОЛУЧЕНО ПАКЕТОВ: ${totalReceived} (${formatBytes(totalReceivedSize)})
ВСЕГО ТРАФИКА: ${formatBytes(totalSentSize + totalReceivedSize)}

СРЕДНЕЕ ОТПРАВЛЕНО: ${avgSent.toFixed(2)} пакетов (${formatBytes(avgSentSize)})
СРЕДНЕЕ ПОЛУЧЕНО: ${avgReceived.toFixed(2)} пакетов (${formatBytes(avgReceivedSize)})
СРЕДНИЙ ТРАФИК НА АККАУНТ: ${formatBytes(avgSentSize + avgReceivedSize)}

СРЕДНИЙ РАЗМЕР ПАКЕТА (ОТПРАВКА): ${formatBytes(totalSent > 0 ? totalSentSize / totalSent : 0)}
СРЕДНИЙ РАЗМЕР ПАКЕТА (ПОЛУЧЕНИЕ): ${formatBytes(totalReceived > 0 ? totalReceivedSize / totalReceived : 0)}

* ТОП ПО КОЛИЧЕСТВУ ПАКЕТОВ *
ОТПРАВЛЕНО:
${formatTop(topBySentPackets)}

ПОЛУЧЕНО:
${formatTop(topByReceivedPackets)}

* ТОП ПО ОБЪЕМУ ДАННЫХ *
ОТПРАВЛЕНО:
${formatTop(topBySentSize, true)}

ПОЛУЧЕНО:
${formatTop(topByReceivedSize, true)}

* ТОП ПО СРЕДНЕМУ РАЗМЕРУ ПАКЕТА *
САМЫЕ БОЛЬШИЕ (ОТПРАВКА):
${formatTop(topByAvgSentPacketSize, true)}

САМЫЕ БОЛЬШИЕ (ПОЛУЧЕНИЕ):
${formatTop(topByAvgReceivedPacketSize, true)}

САМЫЕ МАЛЕНЬКИЕ (ОТПРАВКА):
${formatTop(bottomByAvgSentPacketSize, true)}

САМЫЕ МАЛЕНЬКИЕ (ПОЛУЧЕНИЕ):
${formatTop(bottomByAvgReceivedPacketSize, true)}`;
}
