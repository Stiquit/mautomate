import { IRoutine, RoutineAction } from '@mautomate/api-interfaces';
import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { SchedulerRegistry } from '@nestjs/schedule';
import { CronJob } from 'cron';
import { RoutineIoTService } from './routine-iot.service';
import { CronDocument, CronName } from '../schemas/cron.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import construe from 'cronstrue';

@Injectable()
export class RoutineSchedulerService implements OnModuleInit {
  private logger = new Logger(RoutineSchedulerService.name);
  constructor(
    @InjectModel(CronName) private cronModel: Model<CronDocument>,
    private schedulerRegistry: SchedulerRegistry,
    private routineIotService: RoutineIoTService
  ) {}

  async onModuleInit() {
    const createdCrons = await this.findAllCrons();
    for (const cron of createdCrons) {
      const { name, actions, recurrence, userId } = cron;

      this.logger.log(
        `Create routine : ${name} - ${construe.toString(recurrence)}`
      );
      const job = new CronJob(
        recurrence,
        this.routineIotService.handleRoutineActions(userId, actions)
      );
      this.schedulerRegistry.addCronJob(name, job);
      job.start();
    }
  }

  async createCronJob(userId: string, routine: IRoutine) {
    const { recurrence, name, actions, _id } = routine;
    const routineName = `${String(_id)}-${name}`;

    const job = new CronJob(
      recurrence,
      this.routineIotService.handleRoutineActions(userId, actions)
    );
    this.schedulerRegistry.addCronJob(routineName, job);
    this.logger.log(
      `Create routine : ${routineName} ${construe.toString(recurrence)}`
    );
    await this.saveCron(userId, routineName, recurrence, routine.actions);
    job.start();
  }

  async deleteCronJob(routine: IRoutine) {
    const { _id, name } = routine;
    const routineName = `${String(_id)}-${name}`;
    this.logger.log(`Deleting routine : ${routineName}`);

    if (this.schedulerRegistry.doesExist('cron', routineName)) {
      this.schedulerRegistry.deleteCronJob(routineName);
    }
    await this.removeCron(routineName);
    this.logger.log(`Deleted routine : ${routineName}`);
  }

  async saveCron(
    userId: string,
    name: string,
    recurrence: string,
    actions: RoutineAction[]
  ) {
    const cronModel = new this.cronModel();
    cronModel.recurrence = recurrence;
    cronModel.name = name;
    cronModel.actions = actions;
    cronModel.userId = userId;
    return cronModel.save();
  }

  async removeCron(name: string) {
    return await this.cronModel.findOneAndDelete({ name }).exec();
  }

  async findAllCrons() {
    return await this.cronModel.find().exec();
  }
}
