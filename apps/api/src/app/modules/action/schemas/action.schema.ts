import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Schema as MongooseSchema } from 'mongoose';
import { ActionType } from '../types/action-type.enum';
import { Device } from '../../device/schemas/device.schema';

@Schema()
export class Action {
  @Prop()
  name: string;

  @Prop({
    type: String,
    enum: ActionType,
  })
  type: ActionType;

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'Device' })
  device: Device;

  @Prop()
  date: Date;
}

export type ActionDocument = HydratedDocument<Action>;
export const ActionSchema = SchemaFactory.createForClass(Action);
