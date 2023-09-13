import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { GroupName, Group } from '../schemas/group.schema';

@Injectable()
export class GroupService {
  constructor(@InjectModel(GroupName) private groupModel: Model<Group>) {}
}
