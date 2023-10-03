import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { Action, ActionSchema } from '../../action/schemas/action.schema';

@Schema()
export class Routine {
  @Prop()
  name: string;

  @Prop()
  repeat: string;

  @Prop({ type: [ActionSchema] })
  actions: Action[];
}

export const RoutineName = 'Routine';
export type RoutineDocument = HydratedDocument<Routine>;
export const RoutineSchema = SchemaFactory.createForClass(Routine);
