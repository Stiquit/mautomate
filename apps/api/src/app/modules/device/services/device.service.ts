import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Device, DeviceDocument, DeviceName } from '../schemas/device.schema';
import { Model } from 'mongoose';
import {
  CreateDeviceDTO,
  DeviceState,
  IDevice,
} from '@mautomate/api-interfaces';
import { UserService } from '../../user/services/user.service';

@Injectable()
export class DeviceService {
  constructor(
    @InjectModel(DeviceName) private deviceModel: Model<DeviceDocument>,
    private userService: UserService
  ) {}

  async findById(id: string): Promise<DeviceDocument> {
    const device = await this.deviceModel.findById(id).exec();
    if (!device) {
      throw new NotFoundException('Device not found');
    }
    return device;
  }

  async findAll(): Promise<DeviceDocument[]> {
    return this.deviceModel.find();
  }

  async findByIds(ids: string[]): Promise<DeviceDocument[]> {
    return await this.deviceModel.find({
      _id: {
        $in: ids,
      },
    });
  }

  async create(devices: CreateDeviceDTO[]): Promise<DeviceDocument[]> {
    return await this.deviceModel.create(devices);
  }

  async addDevices(id: string, newDevices: CreateDeviceDTO[]) {
    const devices = await this.create(newDevices);
    await this.userService.addDevices(id, devices);
  }

  async updateState(id: string, state: DeviceState) {
    return await this.deviceModel.findByIdAndUpdate(
      id,
      {
        $set: {
          state,
        },
      },
      {
        new: true,
      }
    );
  }

  async findUserDevices(userId: string): Promise<DeviceDocument[]> {
    const user = await this.userService.findById(userId);
    const deviceIds = user.devices.map((device) =>
      String((device as IDevice)._id)
    );
    return await this.findByIds(deviceIds);
  }
}
