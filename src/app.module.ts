import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { configurationSchema } from './configuration/configuration.schema';

@Module({
  imports: [
    ConfigModule.forRoot({
      validationSchema: configurationSchema,
      isGlobal: true,
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
