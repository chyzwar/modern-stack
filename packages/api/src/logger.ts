import pino from 'pino';

const logger = pino({
  prettyPrint: process.env.NODE_ENV === 'development',
});

export default logger;
