import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { RoutineSchema } from './schemas/routine.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Routine', schema: RoutineSchema }]),
  ],
})
export class RoutineModule {}
