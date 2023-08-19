import { Injectable, Scope, LoggerService } from '@nestjs/common';
import { createLogger, format, transports } from 'winston';
const { combine, timestamp, printf } = format;

@Injectable({ scope: Scope.TRANSIENT })
export class WinstonLogger implements LoggerService {
  private context?: string;
  private readonly logger = createLogger({
    format: combine(
      timestamp(),
      printf(({ context, level, message, timestamp }) => {
        return `${timestamp} [${context || 'Context not set'}] ${level}: ${message}`;
      }),
    ),
    transports: [new transports.Console()],
  });

  setContext(context: string) {
    this.context = context;
  }

  log(message: string) {
    this.logger.log('info', message, { context: this.context });
  }

  error(message: string, trace?: string) {
    this.logger.log('error', message, { context: this.context, trace });
  }

  warn(message: string) {
    this.logger.log('warn', message, { context: this.context });
  }

  debug?(message: string) {
    this.logger.log('debug', message, { context: this.context });
  }

  verbose?(message: string) {
    this.logger.log('verbose', message, { context: this.context });
  }

  info(message: string) {
    this.logger.info(message);
  }
}

