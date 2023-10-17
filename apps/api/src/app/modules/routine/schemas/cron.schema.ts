import { RoutineAction } from '@mautomate/api-interfaces';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Schema as MongooseSchema } from 'mongoose';
@Schema()
export class Cron {
  @Prop()
  userId: string;

  @Prop()
  name: string;

  @Prop()
  recurrence: string;

  @Prop({ type: [MongooseSchema.Types.Mixed] })
  actions: RoutineAction[];
}

export const CronName = Cron.name;
export type CronDocument = HydratedDocument<Cron>;
export const CronSchema = SchemaFactory.createForClass(Cron);
