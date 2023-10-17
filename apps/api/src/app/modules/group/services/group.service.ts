import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { GroupName, GroupDocument } from '../schemas/group.schema';
import { CreateGroupDto, IGroup } from '@mautomate/api-interfaces';
import { DeviceService } from '../../device/services/device.service';
import { UserService } from '../../user/services/user.service';
import { UtilitiesService } from '../../shared/services/utilites.service';

@Injectable()
export class GroupService {
  constructor(
    @InjectModel(GroupName) private groupModel: Model<GroupDocument>,
    private deviceService: DeviceService,
    private userService: UserService,
    private utilitiesService: UtilitiesService
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

  async findByIds(ids: string[]): Promise<IGroup[]> {
    return await this.groupModel
      .find({
        _id: {
          $in: ids,
        },
      })
      .exec();
  }

  async findAll() {
    return await this.groupModel.find();
  }

  async findUserGroups(userId: string) {
    const user = await this.userService.findById(userId);
    const groupsIds = this.utilitiesService.parseDocumentToIdArray(
      user.groups as IGroup[]
    );

    return this.findByIds(groupsIds);
  }

  async addGroupToUser(userId: string, newGroup: CreateGroupDto) {
    const group = await this.create(newGroup);
    const userGroups = await this.findUserGroups(userId);
    userGroups.push(group);
    return await this.userService.setGroups(userId, userGroups);
  }

  async deleteById(id: string, userId: string) {
    await this.validateGroupOwnership(userId, id);
    const userGroups = await this.findUserGroups(userId);
    const filteredGroups = this.utilitiesService.removeFromDocumentArray(
      id,
      userGroups
    );
    await this.userService.setGroups(userId, filteredGroups);
    return await this.groupModel.findByIdAndDelete(id);
  }

  async updateGroup(id: string, userId: string, body: CreateGroupDto) {
    await this.validateGroupOwnership(userId, id);
    const { deviceIds } = body;
    const devices = await this.deviceService.findByIds(deviceIds);
    for (const device of devices) {
      await this.deviceService.validateDeviceOwnership(
        userId,
        String(device._id)
      );
    }

    const updatedGroup: IGroup = await this.groupModel.findByIdAndUpdate(
      id,
      {
        name: body.name,
        devices,
      },
      {
        new: true,
      }
    );
    const userGroups = await this.findUserGroups(userId);
    const updatedGroups = this.utilitiesService.updateDocumentInArray(
      updatedGroup,
      userGroups
    );
    await this.userService.setGroups(userId, updatedGroups);
    return updatedGroup;
  }

  async validateGroupOwnership(userId: string, id: string) {
    const group = await this.findById(id);
    const userGroups = await this.findUserGroups(userId);

    if (!this.utilitiesService.isInDocumentArray(userGroups, group)) {
      throw new UnauthorizedException('Not owner of group');
    }
  }
}
