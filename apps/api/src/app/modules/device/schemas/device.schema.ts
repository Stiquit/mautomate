import { DeviceState, DeviceType } from '@mautomate/api-interfaces';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

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

export const DeviceName = 'Device';
export type DeviceDocument = HydratedDocument<Device>;
export const DeviceSchema = SchemaFactory.createForClass(Device);
