import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { RoutineName, RoutineDocument } from '../schemas/routine.schema';
import { ActionDocument } from '../../action/schemas/action.schema';

@Injectable()
export class RoutineService {
  constructor(
    @InjectModel(RoutineName) private routineModel: Model<RoutineDocument>
  ) {}

  async findById(id: string) {
    return await this.routineModel.findById(id).exec();
  }

  async create(name: string, repeat: string, actions: ActionDocument) {
    const routine = new this.routineModel({
      name,
      actions,
      repeat,
    });
    return await routine.save();
  }
}
