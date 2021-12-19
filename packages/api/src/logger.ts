import pino from 'pino';

export default process.env.API_LOG_PRETTY
  ? pino({
    level: process.env.API_LOG_LEVEL,
    transport: {
      target: 'pino-pretty',
    },
  })
  : pino({
    level: process.env.API_LOG_LEVEL,
  });
