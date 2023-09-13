import { Module } from '@nestjs/common';
import { ActionName, ActionSchema } from './schemas/action.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { ActionService } from './services/action.service';
import { UserModule } from '../user/user.module';
import { DeviceModule } from '../device/device.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: ActionName, schema: ActionSchema }]),
    UserModule,
    DeviceModule,
  ],
  providers: [ActionService],
})
export class ActionModule {}
