import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { DeviceType } from '../types/device-type.enum';
import { DeviceState } from '../types/device-state.enum';

@Schema()
export class Device {
  @Prop()
  name: string;

  @Prop({
    type: String,
    enum: DeviceType,
    default: DeviceType.Switch,
  })
  type: DeviceType;

  @Prop({
    type: String,
    enum: DeviceState,
    default: DeviceState.Idle,
  })
  state: DeviceState;

  @Prop()
  pin: number;
}

export type DeviceDocument = HydratedDocument<Device>;
export const DeviceSchema = SchemaFactory.createForClass(Device);
