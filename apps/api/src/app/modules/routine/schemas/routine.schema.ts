import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Schema as MongooseSchema } from 'mongoose';
import { RoutineAction } from '@mautomate/api-interfaces';

@Schema()
export class Routine {
  @Prop()
  name: string;

  @Prop()
  recurrence: string;

  @Prop({ type: [MongooseSchema.Types.Mixed] })
  actions: RoutineAction[];
}

export const RoutineName = 'Routine';
export type RoutineDocument = HydratedDocument<Routine>;
export const RoutineSchema = SchemaFactory.createForClass(Routine);
