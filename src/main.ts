import { WinstonModule } from 'nest-winston';
import { winstonFactory } from './logger/winston.config';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    bufferLogs: true,
  });

  const configService = app.get(ConfigService);

  app.useLogger(WinstonModule.createLogger(winstonFactory(configService)));

  await app.listen(process.env.PORT ?? 3000);
}

bootstrap();
