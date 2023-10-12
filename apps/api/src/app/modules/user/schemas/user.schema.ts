import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { Device, DeviceSchema } from '../../device/schemas/device.schema';
import { Routine, RoutineSchema } from '../../routine/schemas/routine.schema';
import { Group, GroupSchema } from '../../group/schemas/group.schema';

@Schema()
export class User {
  @Prop()
  firstName: string;

  @Prop()
  lastName: string;

  @Prop()
  username: string;

  @Prop()
  password: string;

  @Prop({ type: [DeviceSchema] })
  devices: Device[];

  @Prop({ type: [RoutineSchema] })
  routines: Routine[];

  @Prop({ type: [GroupSchema] })
  groups: Group[];
}

export const UserName = 'User';
export type UserDocument = HydratedDocument<User>;
export const UserSchema = SchemaFactory.createForClass(User);
