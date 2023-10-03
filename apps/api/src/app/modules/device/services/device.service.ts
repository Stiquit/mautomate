import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Device, DeviceDocument, DeviceName } from '../schemas/device.schema';
import { Model } from 'mongoose';
import { CreateDeviceDTO } from '@mautomate/api-interfaces';

@Injectable()
export class DeviceService {
  constructor(@InjectModel(DeviceName) private deviceModel: Model<Device>) {}

  async findById(id: string): Promise<DeviceDocument> {
    return this.deviceModel.findById(id).exec();
  }

  async findAll(): Promise<DeviceDocument[]> {
    return this.deviceModel.find();
  }

  async create(devices: CreateDeviceDTO[]): Promise<DeviceDocument[]> {
    return await this.deviceModel.create(devices);
  }
}
