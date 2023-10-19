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
import { GroupModule } from './modules/group/group.module';
import { SharedModule } from './modules/shared/shared.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

export const MONGO_URL = process.env.DATABASE_URL;

@Module({
  imports: [
    MongooseModule.forRoot(MONGO_URL, {
      dbName: 'mautomate',
    }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'main'),
      exclude: ['/api'],
    }),
    UserModule,
    DeviceModule,
    ActionModule,
    RoutineModule,
    MqttModule,
    GroupModule,
    SharedModule,
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
