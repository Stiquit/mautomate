import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Device, DeviceDocument, DeviceName } from '../schemas/device.schema';
import { Model } from 'mongoose';

@Injectable()
export class DeviceService {
  constructor(@InjectModel(DeviceName) private deviceModel: Model<Device>) {}

  async findById(id: string): Promise<DeviceDocument> {
    return this.deviceModel.findById(id).exec();
  }
}
