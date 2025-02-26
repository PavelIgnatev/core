export const startSender: Record<string, number> = {};
export const phoneSearchError: Record<string, number> = {};
export const endSender: Record<string, number> = {};
export const errorSender: Record<string, number> = {};
export const withoutRecipientError: Record<string, number> = {};
export const aiReqest: Record<string, number> = {};
export const aiRetryError: Record<string, number> = {};
export const peerFloods: Record<string, number> = {};
export const allTimings: Array<number> = [];

export function reduceSpaces(string: string) {
  return string.replace(/\s+/g, ' ').trim();
}

export function capitalizeFirstLetter(string: string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

export function removeNonAlphaPrefix(string: string) {
  if (string[0] === '/' || string[0] === '@') {
    return string;
  }

  return string.replace(/^[^a-zA-Zа-яА-Я]+/, '');
}

export const rmSpLc = (str: string) => {
  return str.replace(/\s+/g, '').toLowerCase();
};

export const sleep = (delay: number) => {
  return new Promise((res) => {
    setTimeout(res, delay);
  });
};

export const getTimeString = (startTime: number) => {
  const time = Math.round((performance.now() - startTime) / 1000);
  const minutes = Math.floor(time / 60);
  const seconds = time % 60;

  let timeString;
  if (minutes > 0) {
    timeString = `${minutes}m ${seconds}s`;
  } else {
    timeString = `${seconds}s`;
  }

  return timeString;
};

export const getTimeStringByTime = (timeDate: number) => {
  const time = Math.round(timeDate / 1000);
  const minutes = Math.floor(time / 60);
  const seconds = time % 60;

  let timeString;
  if (minutes > 0) {
    timeString = `${minutes}m ${seconds}s`;
  } else {
    timeString = `${seconds}s`;
  }

  return timeString;
};

export const generateRandomTime = (minTime: number, maxTime: number) => {
  return new Date(
    new Date().getTime() +
      Math.floor(Math.random() * (maxTime - minTime + 1)) +
      minTime
  );
};
export const getWeekday = () => {
  return new Intl.DateTimeFormat('en-GB', {
    weekday: 'short',
    timeZone: 'UTC',
  }).format(new Date());
};

export function formatDateToUTC(date: Date) {
  const utcDate = new Date(date);
  return `${utcDate.getUTCFullYear()}-${String(utcDate.getUTCMonth() + 1).padStart(2, '0')}-${String(
    utcDate.getUTCDate()
  ).padStart(
    2,
    '0'
  )} ${String(utcDate.getUTCHours()).padStart(2, '0')}:${String(
    utcDate.getUTCMinutes()
  ).padStart(2, '0')}`;
}

export const getDateNow = () => {
  const now = new Date();

  return `${new Intl.DateTimeFormat('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(now)} ${now.toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false,
  })}`;
};
