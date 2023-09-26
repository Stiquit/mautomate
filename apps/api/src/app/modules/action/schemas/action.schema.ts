import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Schema as MongooseSchema } from 'mongoose';
import { ActionType } from '@mautomate/api-interfaces';
import { Device } from '../../device/schemas/device.schema';
import { User } from '../../user/schemas/user.schema';

@Schema()
export class Action {
  @Prop({
    type: String,
    enum: ActionType,
  })
  type: ActionType;

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'User' })
  user: User;

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'Device' })
  device: Device;

  @Prop()
  date: number;
}

export const ActionName = 'Action';
export type ActionDocument = HydratedDocument<Action>;
export const ActionSchema = SchemaFactory.createForClass(Action);
