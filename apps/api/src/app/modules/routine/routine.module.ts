import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { RoutineName, RoutineSchema } from './schemas/routine.schema';
import { RoutineService } from './services/routine.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: RoutineName, schema: RoutineSchema }]),
  ],
  exports: [RoutineService],
  providers: [RoutineService],
})
export class RoutineModule {}
