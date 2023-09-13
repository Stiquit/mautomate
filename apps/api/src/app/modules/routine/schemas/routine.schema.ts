import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Schema as MongooseSchema } from 'mongoose';
import { Action } from '../../action/schemas/action.schema';

@Schema()
export class Routine {
  @Prop()
  name: string;

  @Prop()
  repeat: string;

  @Prop({ type: [{ type: MongooseSchema.Types.ObjectId, ref: 'Action' }] })
  actions: Action[];
}

export const RoutineName = 'Routine';
export type RoutineDocument = HydratedDocument<Routine>;
export const RoutineSchema = SchemaFactory.createForClass(Routine);
