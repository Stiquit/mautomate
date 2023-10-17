import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { DeviceDocument, DeviceName } from '../schemas/device.schema';
import { Model } from 'mongoose';
import {
  CreateDeviceDTO,
  DeviceState,
  IDevice,
} from '@mautomate/api-interfaces';
import { UserService } from '../../user/services/user.service';
import { UtilitiesService } from '../../shared/services/utilites.service';

@Injectable()
export class DeviceService {
  constructor(
    @InjectModel(DeviceName) private deviceModel: Model<DeviceDocument>,
    private userService: UserService,
    private utilitiesService: UtilitiesService
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
    return await this.deviceModel
      .find({
        _id: {
          $in: ids,
        },
      })
      .exec();
  }

  async create(devices: CreateDeviceDTO[]): Promise<DeviceDocument[]> {
    return await this.deviceModel.create(devices);
  }

  async deleteById(id: string, userId: string) {
    await this.validateDeviceOwnership(userId, id);
    return await this.deviceModel.findByIdAndDelete(id);
  }

  async addDevicesToUser(userId: string, newDevices: CreateDeviceDTO[]) {
    const devices = await this.create(newDevices);
    const userDevices = await this.findUserDevices(userId);
    userDevices.push(...devices);
    return await this.userService.setDevices(userId, userDevices);
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

  async validateDeviceOwnership(userId: string, deviceId: string) {
    const userDevices = await this.findUserDevices(userId);
    const device = await this.findById(deviceId);

    if (!this.utilitiesService.isInDocumentArray(userDevices, device)) {
      throw new UnauthorizedException('Not owner of device');
    }
  }

  async findUserDevices(userId: string): Promise<DeviceDocument[]> {
    const user = await this.userService.findById(userId);
    const deviceIds = this.utilitiesService.parseDocumentToIdArray(
      user.devices as IDevice[]
    );
    return await this.findByIds(deviceIds);
  }

  async updateDevice(id: string, userId: string, body: CreateDeviceDTO) {
    await this.validateDeviceOwnership(userId, id);
    return await this.deviceModel.findByIdAndUpdate(id, body, {
      new: true,
    });
  }
}
