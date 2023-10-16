import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { DeviceName, DeviceSchema } from './schemas/device.schema';
import { DeviceService } from './services/device.service';
import { DeviceController } from './controllers/device.controller';
import { DeviceGateway } from './controllers/device.gateway';
import { MqttModule } from '../mqtt/mqtt.module';
import { DeviceIoTService } from './services/device-iot.service';
import { DeviceIotController } from './controllers/device-iot.controller';
import { UserModule } from '../user/user.module';
import { SharedModule } from '../shared/shared.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: DeviceName, schema: DeviceSchema }]),
    MqttModule,
    UserModule,
    SharedModule,
  ],
  controllers: [DeviceController, DeviceIotController],
  exports: [DeviceService, DeviceGateway],
  providers: [DeviceService, DeviceGateway, DeviceIoTService],
})
export class DeviceModule {}
