import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { RoutineName, RoutineSchema } from './schemas/routine.schema';
import { RoutineService } from './services/routine.service';
import { RoutineController } from './controllers/routine.controller';
import { UserModule } from '../user/user.module';
import { SharedModule } from '../shared/shared.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: RoutineName, schema: RoutineSchema }]),
    UserModule,
    SharedModule,
  ],
  exports: [RoutineService],
  providers: [RoutineService],
  controllers: [RoutineController],
})
export class RoutineModule {}
