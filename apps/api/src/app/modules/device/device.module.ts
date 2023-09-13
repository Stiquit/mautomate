import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { DeviceName, DeviceSchema } from './schemas/device.schema';
import { DeviceService } from './services/device.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: DeviceName, schema: DeviceSchema }]),
  ],
  exports: [DeviceService],
  providers: [DeviceService],
})
export class DeviceModule {}
