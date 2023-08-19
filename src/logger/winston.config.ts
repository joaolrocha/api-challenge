import { format, transports } from 'winston';

export const winstonConfig = {
  level: 'info',
  format: format.combine(
    format.timestamp(),
    format.printf(({ timestamp, level, message }) => {
      return `${timestamp} ${level.toUpperCase()}: ${message}`;
    }),
  ),
  transports: [
    new transports.Console(),
  ],
};
