import winston from 'winston';

const { combine, timestamp, json, errors } = winston.format;
const logger = winston.createLogger({
  level: 'http',
  format: combine(
    errors({ stack: true }),
    timestamp({
      format: 'YYYY-MM-DD hh:mm:ss.SSS A',
    }),
    json()
  ),
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({ filename: 'combined.log' }),
  ],
});

console.log = (...args) => {
  logger.info(...args);
};

console.error = (...args) => {
  logger.error(...args);
};

console.warn = (...args) => {
  logger.warn(...args);
};
