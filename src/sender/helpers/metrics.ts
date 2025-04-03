interface TrafficMetrics {
  sent: number;
  received: number;
  sentSize: number;
  receivedSize: number;
}

interface ClientMetrics {
  accountId: string;
  traffic: TrafficMetrics;
}

const metrics: Record<string, ClientMetrics> = {};

export const updateTrafficMetrics = (accountId: string, type: 'sent' | 'received', size: number) => {
  if (!metrics[accountId]) {
    metrics[accountId] = {
      accountId,
      traffic: {
        sent: 0,
        received: 0,
        sentSize: 0,
        receivedSize: 0
      }
    };
  }
  
  metrics[accountId].traffic[type]++;
  metrics[accountId].traffic[`${type}Size`] += size;
};

export const getMetricsAll = () => {
  return Object.values(metrics);
};

export const getMetricsByAccountId = (accountId: string) => {
  return metrics[accountId];
}; 