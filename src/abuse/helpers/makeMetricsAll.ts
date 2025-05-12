import { sendToMainBot } from './sendToMainBot';

type ClientData = {
  accountId: string;
  endTime: string;
  connectCounts?: number;
  connectErrorCounts?: number;
  disconnectCounts?: number;
  reconnectCounts?: number;
  metrics?: {
    sent: number;
    received: number;
    sentSize: number;
    receivedSize: number;
  };
  timings?: {
    allTimings: number[];
  };
};

type WorkerSuccessData = {
  type?: 'success';
  chunkId: number;
  endTime: string;
  clients?: ClientData[];
  timings?: {
    allTimings: number[];
  };
  clientsData?: any;
};

export const makeMetricsAll = async (
  promises: WorkerSuccessData[],
  startTime: number = Date.now()
) => {
  // Собираем все метрики
  const globalMetrics = {
    allTimings: [] as number[],
    clients: [] as ClientData[]
  };

  // Обрабатываем данные из всех воркеров
  for (const data of promises) {
    // Добавляем таймлайны из timings, если они есть
    if (data.timings?.allTimings) {
      globalMetrics.allTimings.push(...data.timings.allTimings);
    }
    
    // Обрабатываем данные клиентов
    if (data.clients && Array.isArray(data.clients)) {
      for (const client of data.clients) {
        const existingClientIndex = globalMetrics.clients.findIndex(c => c.accountId === client.accountId);
        
        if (existingClientIndex === -1) {
          // Если клиента еще нет в списке, добавляем
          globalMetrics.clients.push({
            accountId: client.accountId,
            endTime: client.endTime,
            connectCounts: client.connectCounts || 0,
            connectErrorCounts: client.connectErrorCounts || 0,
            disconnectCounts: client.disconnectCounts || 0,
            reconnectCounts: client.reconnectCounts || 0,
            metrics: client.metrics,
            timings: client.timings
          });
        } else {
          // Если клиент уже есть, обновляем его данные
          const existingClient = globalMetrics.clients[existingClientIndex];
          
          existingClient.connectCounts = (existingClient.connectCounts || 0) + (client.connectCounts || 0);
          existingClient.connectErrorCounts = (existingClient.connectErrorCounts || 0) + (client.connectErrorCounts || 0);
          existingClient.disconnectCounts = (existingClient.disconnectCounts || 0) + (client.disconnectCounts || 0);
          existingClient.reconnectCounts = (existingClient.reconnectCounts || 0) + (client.reconnectCounts || 0);
          
          if (client.timings?.allTimings) {
            globalMetrics.allTimings.push(...client.timings.allTimings);
          }
        }
      }
    }
    
    // Проверяем данные из clientsData, если есть
    if (data.clientsData) {
      // Если есть таймлайны в clientsData, добавляем их
      if (data.clientsData.allTimings && Array.isArray(data.clientsData.allTimings)) {
        globalMetrics.allTimings.push(...data.clientsData.allTimings);
      }
    }
  }

  const sortedPromises = [...promises].sort((a, b) => a.chunkId - b.chunkId);
  
  const totalTime = ((Date.now() - startTime) / 1000 / 60).toFixed(2);
  const averageTimeString = calculateAverageTime(promises);

  // Конвертируем строковые endTime (формат "Xm Ys") в числа
  const endTimings = globalMetrics.clients.map((client) => {
    let totalSeconds = 0;
    const endTimeStr = client.endTime;
    const minutesMatch = endTimeStr.match(/(\d+)m/);
    const secondsMatch = endTimeStr.match(/(\d+)s/);
    
    if (minutesMatch) totalSeconds += parseInt(minutesMatch[1]) * 60;
    if (secondsMatch) totalSeconds += parseInt(secondsMatch[1]);
    
    return {
      id: client.accountId,
      value: totalSeconds,
    };
  });

  const midEndTimings = endTimings.length > 0
    ? Math.floor(
        endTimings.reduce((acc, num) => acc + num.value, 0) / endTimings.length
      )
    : 0;

  const maxEndTiming = endTimings.length > 0
    ? endTimings.reduce((max, current) =>
        current.value > max.value ? current : max,
        { id: '', value: 0 }
      )
    : { value: 0 };

  // Метрики стабильности
  const connectCounts = globalMetrics.clients.map((client) => ({
    id: client.accountId,
    value: Number(client.connectCounts || 0),
  }));
  
  const totalConnectCounts = connectCounts.reduce(
    (acc, num) => acc + num.value,
    0
  );
  
  const midConnectCounts = connectCounts.length > 0 
    ? (totalConnectCounts / connectCounts.length).toFixed(2) 
    : '0';
    
  const maxConnectCounts = connectCounts.length > 0 
    ? connectCounts.reduce((max, current) => current.value > max.value ? current : max, { id: '', value: 0 })
    : { value: 0 };

  const disconnectCounts = globalMetrics.clients.map((client) => ({
    id: client.accountId,
    value: Number(client.disconnectCounts || 0),
  }));

  const totalDisconnectCounts = disconnectCounts.reduce(
    (acc, num) => acc + num.value,
    0
  );
  
  const midDisconnectCounts = disconnectCounts.length > 0
    ? (totalDisconnectCounts / disconnectCounts.length).toFixed(2)
    : '0';
    
  const maxDisconnectCounts = disconnectCounts.length > 0
    ? disconnectCounts.reduce((max, current) => current.value > max.value ? current : max, { id: '', value: 0 })
    : { value: 0 };

  const connectErrorCounts = globalMetrics.clients.map((client) => ({
    id: client.accountId,
    value: Number(client.connectErrorCounts || 0),
  }));

  const totalConnectErrorCounts = connectErrorCounts.reduce(
    (acc, num) => acc + num.value,
    0
  );
  
  const midConnectErrorCounts = connectErrorCounts.length > 0
    ? (totalConnectErrorCounts / connectErrorCounts.length).toFixed(2)
    : '0';
    
  const maxConnectErrorCounts = connectErrorCounts.length > 0
    ? connectErrorCounts.reduce((max, current) => current.value > max.value ? current : max, { id: '', value: 0 })
    : { value: 0 };

  const reconnectCounts = globalMetrics.clients.map((client) => ({
    id: client.accountId,
    value: Number(client.reconnectCounts || 0),
  }));

  const totalReconnectCounts = reconnectCounts.reduce(
    (acc, num) => acc + num.value,
    0
  );
  
  const midReconnectCounts = reconnectCounts.length > 0
    ? (totalReconnectCounts / reconnectCounts.length).toFixed(2)
    : '0';
    
  const maxReconnectCounts = reconnectCounts.length > 0
    ? reconnectCounts.reduce((max, current) => current.value > max.value ? current : max, { id: '', value: 0 })
    : { value: 0 };

  // Вычисление среднего времени ответа
  const avgResponseTime = globalMetrics.allTimings.length > 0
    ? Number(
        (
          globalMetrics.allTimings.reduce(
            (acc, num) => acc + Number(num),
            0
          ) /
          globalMetrics.allTimings.length /
          1000
        ).toFixed(2)
      )
    : 0;

  // Функция для форматирования времени в строку формата "Xm Ys"
  const formatTime = (seconds: number): string => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);
    
    if (minutes > 0) {
      return `${minutes}m ${remainingSeconds}s`;
    } else {
      return `${remainingSeconds}s`;
    }
  };

  await sendToMainBot(`💥 ABUSE LOGIN COMPLETE 💥

* АККАУНТЫ * 
ВСЕГО ЧАНКОВ: ${sortedPromises.length}
В РАБОТЕ: ${globalMetrics.clients.length}
СРЕДНЕЕ ВРЕМЯ РАБОТЫ: ${formatTime(midEndTimings)} (max: ${formatTime(maxEndTiming.value)})

* СТАБИЛЬНОСТЬ *
REQUEST_COUNT: ${globalMetrics.allTimings.length}
RESPONSE_TIME: ${avgResponseTime}ms
CONNECT: ${totalConnectCounts} (mid: ${midConnectCounts}, max: ${maxConnectCounts.value})
RECONNECT: ${totalReconnectCounts} (mid: ${midReconnectCounts}, max: ${maxReconnectCounts.value})
DISCONNECT: ${totalDisconnectCounts} (mid: ${midDisconnectCounts}, max: ${maxDisconnectCounts.value})
NETWORK_ERRORS: ${totalConnectErrorCounts} (mid: ${midConnectErrorCounts}, max: ${maxConnectErrorCounts.value})`);
};

function calculateAverageTime(promises: WorkerSuccessData[]): string {
  if (promises.length === 0) return "0s";
  
  // Получаем все времена endTime из clients всех промисов
  const timeValues: number[] = [];
  
  for (const promise of promises) {
    // Если есть clients, берем время из них
    if (promise.clients && promise.clients.length > 0) {
      for (const client of promise.clients) {
        const timeStr = client.endTime;
        const minutesMatch = timeStr.match(/(\d+)m/);
        const secondsMatch = timeStr.match(/(\d+)s/);
        
        const minutes = minutesMatch ? parseInt(minutesMatch[1]) : 0;
        const seconds = secondsMatch ? parseInt(secondsMatch[1]) : 0;
        
        timeValues.push(minutes * 60 + seconds);
      }
    } else {
      // Иначе используем время самого промиса
      const timeStr = promise.endTime;
      const minutesMatch = timeStr.match(/(\d+)m/);
      const secondsMatch = timeStr.match(/(\d+)s/);
      
      const minutes = minutesMatch ? parseInt(minutesMatch[1]) : 0;
      const seconds = secondsMatch ? parseInt(secondsMatch[1]) : 0;
      
      timeValues.push(minutes * 60 + seconds);
    }
  }
  
  if (timeValues.length === 0) return "0s";
  
  const averageTotalSeconds = timeValues.reduce((sum, time) => sum + time, 0) / timeValues.length;
  const averageMinutes = Math.floor(averageTotalSeconds / 60);
  const averageSeconds = Math.floor(averageTotalSeconds % 60);
  
  if (averageMinutes > 0) {
    return `${averageMinutes}m ${averageSeconds}s`;
  } else {
    return `${averageSeconds}s`;
  }
} 