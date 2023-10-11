import { Module } from '@nestjs/common';

import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from './modules/user/user.module';
import { DeviceModule } from './modules/device/device.module';
import { ActionModule } from './modules/action/action.module';
import { RoutineModule } from './modules/routine/routine.module';
import { APP_GUARD } from '@nestjs/core';
import { AuthorizationGuard } from './modules/user/guards/authorization.guard';
import { JwtService } from '@nestjs/jwt';
import { MqttModule } from './modules/mqtt/mqtt.module';

export const MONGO_URL = process.env.DATABASE_URL;

@Module({
  imports: [
    MongooseModule.forRoot(MONGO_URL, {
      authSource: 'mautomate',
      authMechanism: 'DEFAULT',
    }),
    UserModule,
    DeviceModule,
    ActionModule,
    RoutineModule,
    MqttModule,
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: AuthorizationGuard,
    },
    JwtService,
  ],
})
export class AppModule {}
