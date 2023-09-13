import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Schema as MongooseSchema } from 'mongoose';
import { Device, DeviceName } from '../../device/schemas/device.schema';
import { Routine, RoutineName } from '../../routine/schemas/routine.schema';

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

  @Prop({ type: [{ type: MongooseSchema.Types.ObjectId, ref: DeviceName }] })
  devices: Device[];

  @Prop({ type: [{ type: MongooseSchema.Types.ObjectId, ref: RoutineName }] })
  routines: Routine[];
}

export const UserName = 'User';
export type UserDocument = HydratedDocument<User>;
export const UserSchema = SchemaFactory.createForClass(User);
