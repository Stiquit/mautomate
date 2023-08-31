import { Module } from '@nestjs/common';
import { ActionSchema } from './schemas/action.schema';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Action', schema: ActionSchema }]),
  ],
})
export class ActionModule {}
