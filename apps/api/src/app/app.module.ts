import { Module } from '@nestjs/common';

import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from './modules/user/user.module';
import { DeviceModule } from './modules/device/device.module';
import { ActionModule } from './modules/action/action.module';
import { RoutineModule } from './modules/routine/routine.module';

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
  ],
})
export class AppModule {}
