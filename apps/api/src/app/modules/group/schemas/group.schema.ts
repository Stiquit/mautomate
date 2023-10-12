import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { Device, DeviceSchema } from '../../device/schemas/device.schema';

@Schema()
export class Group {
  @Prop()
  name: string;

  @Prop({ type: [DeviceSchema] })
  devices: Device[];
}

export const GroupName = 'Group';
export type GroupDocument = HydratedDocument<Group>;
export const GroupSchema = SchemaFactory.createForClass(Group);
