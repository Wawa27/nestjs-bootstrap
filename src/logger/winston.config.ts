import { WinstonModuleOptions } from 'nest-winston';
import { ConfigService } from '@nestjs/config';
import * as winston from 'winston';
import LokiTransport from 'winston-loki';
import { utilities as nestWinstonModuleUtilities } from 'nest-winston';

export const winstonFactory = (config: ConfigService): WinstonModuleOptions => {
  const level = config.getOrThrow<string>('LOG_LEVEL');
  const isJson = config.getOrThrow<boolean>('LOG_JSON');
  const lokiEnabled = config.getOrThrow<boolean>('LOG_LOKI_ENABLED');
  const serviceName = config.getOrThrow<string>('LOG_SERVICE_NAME');

  const baseFormat = winston.format.combine(
    winston.format.timestamp(),
    winston.format.errors({ stack: true }),
  );

  const consoleFormat = isJson
    ? winston.format.combine(baseFormat, winston.format.json())
    : winston.format.combine(
        winston.format.timestamp(),
        winston.format.ms(),
        nestWinstonModuleUtilities.format.nestLike(serviceName, {
          colors: true,
          prettyPrint: true,
          processId: true,
          appName: true,
        }),
      );

  const transports: winston.transport[] = [
    new winston.transports.Console({
      level,
      format: consoleFormat,
    }),
  ];

  if (lokiEnabled) {
    transports.push(
      new LokiTransport({
        host: config.getOrThrow<string>('LOG_LOKI_HOST'),
        labels: {
          app: config.getOrThrow<string>('LOG_SERVICE_NAME'),
        },
        json: true,
        replaceTimestamp: true,
      }),
    );
  }

  return {
    level,
    transports,
  };
};
