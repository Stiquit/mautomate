import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserName, User, UserDocument } from '../schemas/user.schema';
import { IDevice, IGroup } from '@mautomate/api-interfaces';

@Injectable()
export class UserService {
  relations = ['devices', 'routines'];
  constructor(@InjectModel(UserName) private userModel: Model<User>) {}

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
    return this.userModel.findById(id).exec();
  }

  async getUserProfile(id: string) {
    return this.userModel.findById(id).populate(this.relations).exec();
  }
  async setDevices(id: string, devices: IDevice[]) {
    const user = await this.findById(id);
    user.devices = devices;
    await user.save();
    return user.devices;
  }

  async removeDevice(userId: string, deletedDevice: IDevice) {
    const user = await this.findById(userId);
    user.devices = user.devices.filter(
      (device) =>
        device.name !== deletedDevice.name &&
        device.type !== deletedDevice.type &&
        device.pin !== deletedDevice.pin
    );
    await user.save();
    return user.devices;
  }
  async addGroup(id: string, group: IGroup) {
    const user = await this.findById(id);
    user.groups.push(group);
    await user.save();
    return user.groups;
  }
}
