import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { DeviceName, DeviceSchema } from './schemas/device.schema';
import { DeviceService } from './services/device.service';
import { DeviceController } from './controllers/device.controller';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: DeviceName, schema: DeviceSchema }]),
  ],
  controllers: [DeviceController],
  exports: [DeviceService],
  providers: [DeviceService],
})
export class DeviceModule {}
