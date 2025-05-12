export const allTimings: Array<number> = [];

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
