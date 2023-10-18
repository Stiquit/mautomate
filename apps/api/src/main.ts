/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import mongoose from 'mongoose';
import { AppModule } from './app/app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import {
  MQTT_MICROSERVICE_CLIENT,
  MQTT_PASSWORD,
  MQTT_URL,
  MQTT_USER,
} from '@mautomate/api-interfaces';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const globalPrefix = 'api';
  app.setGlobalPrefix(globalPrefix);
  const port = process.env.PORT || 3000;
  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.MQTT,
    options: {
      url: MQTT_URL,
      password: MQTT_PASSWORD,
      username: MQTT_USER,
      clientId: MQTT_MICROSERVICE_CLIENT,
    },
  });
  await app.startAllMicroservices();
  await app.listen(port);
  Logger.log(
    `🚀 Application is running on: http://localhost:${port}/${globalPrefix}`
  );
}

bootstrap();
