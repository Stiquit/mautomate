import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { GroupName, GroupSchema } from './schemas/group.schema';
import { GroupService } from './services/group.service';
import { UserModule } from '../user/user.module';
import { DeviceModule } from '../device/device.module';
import { GroupController } from './controllers/group.controller';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: GroupName, schema: GroupSchema }]),
    UserModule,
    DeviceModule,
  ],
  providers: [GroupService],
  exports: [GroupService],
  controllers: [GroupController],
})
export class GroupModule {}
