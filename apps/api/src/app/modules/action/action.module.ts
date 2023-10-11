import { Module } from '@nestjs/common';
import { ActionName, ActionSchema } from './schemas/action.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { ActionService } from './services/action.service';
import { UserModule } from '../user/user.module';
import { DeviceModule } from '../device/device.module';
import { ActionIotController } from './controllers/action-iot.controller';
import { ActionController } from './controllers/action.controller';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: ActionName, schema: ActionSchema }]),
    UserModule,
    DeviceModule,
  ],
  providers: [ActionService],
  controllers: [ActionIotController, ActionController],
})
export class ActionModule {}
