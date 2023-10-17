import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { ActionDocument, ActionName } from '../schemas/action.schema';
import { Model, Schema } from 'mongoose';
import * as mongoose from 'mongoose';
import { UserService } from '../../user/services/user.service';
import { DeviceService } from '../../device/services/device.service';
import { ActionType, IAction, IDevice } from '@mautomate/api-interfaces';

@Injectable()
export class ActionService {
  constructor(
    @InjectModel(ActionName) private actionModel: Model<ActionDocument>,
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
    action.user = user;

    if (type === ActionType.Routine) {
      return action.save();
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
    return await this.actionModel
      .find({ user: userId })
      .sort({
        _id: -1,
      })
      .limit(5)
      .exec();
  }

  async findUserMostUsedDevices(id: string) {
    const sortedActions = await this.actionModel
      .aggregate<{
        _id: string;
        count: number;
      }>([
        {
          $match: { user: new mongoose.Types.ObjectId(id) },
        },
        {
          $group: { _id: '$device', count: { $sum: 1 } },
        },
        {
          $sort: { count: -1 },
        },
        {
          $limit: 8,
        },
      ])
      .exec();
    const sortedDevicesIds = sortedActions.map(
      (sortedAction) => sortedAction._id
    );
    return await this.deviceService.findByIds(sortedDevicesIds);
  }

  async findAll(): Promise<IAction[]> {
    return this.actionModel.find().exec();
  }
}
