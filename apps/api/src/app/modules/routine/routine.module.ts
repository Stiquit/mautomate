import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { RoutineName, RoutineSchema } from './schemas/routine.schema';
import { RoutineService } from './services/routine.service';
import { RoutineController } from './controllers/routine.controller';
import { UserModule } from '../user/user.module';
import { SharedModule } from '../shared/shared.module';
import { RoutineSchedulerService } from './services/routine-scheduler.service';
import { ScheduleModule } from '@nestjs/schedule';
import { MqttModule } from '../mqtt/mqtt.module';
import { RoutineIoTService } from './services/routine-iot.service';
import { CronName, CronSchema } from './schemas/cron.schema';
import { DeviceModule } from '../device/device.module';
import { RoutineGateway } from './controllers/routine.gateway';
@Module({
  imports: [
    MongooseModule.forFeature([
      { name: RoutineName, schema: RoutineSchema },
      { name: CronName, schema: CronSchema },
    ]),
    UserModule,
    SharedModule,
    ScheduleModule.forRoot(),
    MqttModule,
    DeviceModule,
  ],
  exports: [RoutineService, RoutineSchedulerService, RoutineIoTService],
  providers: [
    RoutineService,
    RoutineSchedulerService,
    RoutineIoTService,
    RoutineGateway,
  ],
  controllers: [RoutineController],
})
export class RoutineModule {}
