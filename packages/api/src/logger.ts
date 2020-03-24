import pino from 'pino';

const logger = pino({
  level: process.env.API_LOG_LEVEL,
  prettyPrint: Boolean(process.env.API_LOG_PRETTY),
});

export default logger;
