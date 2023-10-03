import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { ActionType } from '@mautomate/api-interfaces';
import { Device, DeviceSchema } from '../../device/schemas/device.schema';
import { User, UserSchema } from '../../user/schemas/user.schema';

@Schema()
export class Action {
  @Prop({
    type: String,
    enum: ActionType,
  })
  type: ActionType;

  @Prop({ type: [UserSchema] })
  user: User;

  @Prop({ type: [DeviceSchema] })
  device: Device;

  @Prop()
  date: number;
}

export const ActionName = 'Action';
export type ActionDocument = HydratedDocument<Action>;
export const ActionSchema = SchemaFactory.createForClass(Action);
