export const generateRandomTime = (minTime: number, maxTime: number) => {
  return new Date(
    new Date().getTime() +
      Math.floor(Math.random() * (maxTime - minTime + 1)) +
      minTime
  );
};
