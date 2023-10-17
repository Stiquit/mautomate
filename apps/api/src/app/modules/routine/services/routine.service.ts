import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { RoutineName, RoutineDocument } from '../schemas/routine.schema';
import { CreateRoutineDto, IRoutine } from '@mautomate/api-interfaces';
import { UserService } from '../../user/services/user.service';
import { UtilitiesService } from '../../shared/services/utilites.service';

@Injectable()
export class RoutineService {
  constructor(
    @InjectModel(RoutineName) private routineModel: Model<RoutineDocument>,
    private userService: UserService,
    private utilitiesService: UtilitiesService
  ) {}

  async create(data: CreateRoutineDto) {
    const routine = new this.routineModel(data);
    return await routine.save();
  }

  async findById(id: string) {
    return await this.routineModel.findById(id).exec();
  }

  async findByIds(ids: string[]): Promise<IRoutine[]> {
    return await this.routineModel
      .find({
        _id: {
          $in: ids,
        },
      })
      .exec();
  }

  async addRoutineToUser(userId: string, newRoutine: CreateRoutineDto) {
    const routine = await this.create(newRoutine);
    const userRoutines = await this.findUserRoutines(userId);
    userRoutines.push(routine);
    return await this.userService.setRoutines(userId, userRoutines);
  }

  async findUserRoutines(userId: string) {
    const user = await this.userService.findById(userId);
    const routinesIds = this.utilitiesService.parseDocumentToIdArray(
      user.routines as IRoutine[]
    );

    return this.findByIds(routinesIds);
  }

  async deleteById(id: string, userId: string) {
    await this.validateOwnership(userId, id);
    const userRoutines = await this.findUserRoutines(userId);
    const filteredRoutines = this.utilitiesService.removeFromDocumentArray(
      id,
      userRoutines
    );
    await this.userService.setRoutines(userId, filteredRoutines);
    return await this.routineModel.findByIdAndDelete(id);
  }

  async updateRoutine(id: string, userId: string, body: CreateRoutineDto) {
    await this.validateOwnership(userId, id);
    const updatedRoutine = await this.routineModel.findByIdAndUpdate(id, body, {
      new: true,
    });
    const userRoutines = await this.findUserRoutines(userId);
    const updatedRoutines = this.utilitiesService.updateDocumentInArray(
      updatedRoutine,
      userRoutines
    );
    await this.userService.setRoutines(userId, updatedRoutines);
    return updatedRoutine;
  }

  async findAll() {
    return await this.routineModel.find().exec();
  }

  async validateOwnership(userId: string, id: string) {
    const routine = await this.findById(id);
    const userRoutines = await this.findUserRoutines(userId);

    if (!this.utilitiesService.isInDocumentArray(userRoutines, routine)) {
      throw new UnauthorizedException('Not owner of routine');
    }
  }
}
