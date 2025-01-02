import winston from 'winston';
import winstonMongoDB from 'winston-mongodb';

const { combine, timestamp, json, errors } = winston.format;
const logger = winston.createLogger({
  level: 'http',
  format: combine(
    errors(),
    timestamp({
      format: () => new Date().toISOString(),
    }),
    json()
  ),
  transports: [
    new winston.transports.Console(),
    new winstonMongoDB.MongoDB({
      db: 'mongodb://gen_user:%5C%7Dc%3C%24q%3C3j8O_%26g@193.108.115.154:27017/winston?authSource=admin&directConnection=true',
      collection: 'winston',
    }),
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
