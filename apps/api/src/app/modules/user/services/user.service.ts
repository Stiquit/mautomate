import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserName, User, UserDocument } from '../schemas/user.schema';
import { CreateDeviceDTO } from '@mautomate/api-interfaces';
import { DeviceService } from '../../device/services/device.service';

@Injectable()
export class UserService {
  relations = ['devices', 'routines'];
  constructor(
    @InjectModel(UserName) private userModel: Model<User>,
    private deviceService: DeviceService
  ) {}

  async create(username: string, password: string) {
    const user = new this.userModel({
      username,
      password,
    });
    return user.save();
  }

  async findByUsername(username: string): Promise<UserDocument> {
    return this.userModel.findOne({ username }).exec();
  }

  async findById(id: string): Promise<UserDocument> {
    return this.userModel.findById(id).populate(this.relations).exec();
  }

  async addDevices(id: string, newDevices: CreateDeviceDTO[]) {
    const user = await this.findById(id);

    if (!user) {
      throw new NotFoundException('User not found');
    }

    const devices = await this.deviceService.create(newDevices);
    user.devices.push(...devices);
    await user.save();
    return user.populate(this.relations);
  }
}
