import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Action, ActionName } from '../schemas/action.schema';
import { Model } from 'mongoose';
import { ActionType } from '../types/action-type.enum';
import { UserService } from '../../user/services/user.service';
import { DeviceService } from '../../device/services/device.service';

@Injectable()
export class ActionService {
  constructor(
    @InjectModel(ActionName) private actionModel: Model<Action>,
    private userService: UserService,
    private deviceService: DeviceService
  ) {}

  async create(userId: string, deviceId: string, type: ActionType) {
    const now = new Date();
    const action = new this.actionModel({
      date: now.valueOf(),
      type,
    });

    const user = await this.userService.findById(userId);

    if (!user) {
      throw new NotFoundException("User not found, action can't be created");
    }

    const device = await this.deviceService.findById(deviceId);

    if (!device) {
      throw new NotFoundException("Device doesn't exist");
    }

    action.device = device;
    action.user = user;

    return action.save();
  }

  async findByUserId(userId: string) {
    return this.actionModel.find({ user: userId }).populate('device').exec();
  }
}
