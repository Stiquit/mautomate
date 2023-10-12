import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { GroupName, GroupDocument } from '../schemas/group.schema';
import { CreateGroupDto } from '@mautomate/api-interfaces';
import { DeviceService } from '../../device/services/device.service';
import { UserService } from '../../user/services/user.service';

@Injectable()
export class GroupService {
  constructor(
    @InjectModel(GroupName) private groupModel: Model<GroupDocument>,
    private deviceService: DeviceService,
    private userService: UserService
  ) {}

  async create(data: CreateGroupDto) {
    const { name, deviceIds } = data;
    const group = await this.groupModel.create({
      name,
    });

    const devices = await this.deviceService.findByIds(deviceIds);
    group.devices = devices;
    return group.save();
  }

  async findById(id: string) {
    const group = await this.groupModel.findById(id).exec();
    if (!group) {
      throw new NotFoundException('Group not found');
    }

    return group;
  }

  async findAll() {
    return await this.groupModel.find();
  }

  async findUserGroups(userId: string) {
    const user = await this.userService.findById(userId);
    return user.groups;
  }

  async addGroupToUser(userId: string, newGroup: CreateGroupDto) {
    const group = await this.create(newGroup);
    return await this.userService.addGroup(userId, group);
  }
}
