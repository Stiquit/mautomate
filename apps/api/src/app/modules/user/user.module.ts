import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserName, UserSchema } from './schemas/user.schema';
import { GroupName, GroupSchema } from './schemas/group.schema';
import { UserService } from './services/user.service';
import { GroupService } from './services/group.service';
import { AuthService } from './services/auth.service';
import { JwtService, JwtModule } from '@nestjs/jwt';
import { TokenGeneratorService } from './services/token-generator.service';
import { AuthController } from './controllers/auth.controller';
import { RoutineModule } from '../routine/routine.module';
import { UserController } from './controllers/user.controller';
import { DeviceModule } from '../device/device.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: UserName, schema: UserSchema },
      { name: GroupName, schema: GroupSchema },
    ]),
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: {
        expiresIn: process.env.JWT_EXPIRE_TIME,
      },
    }),
    RoutineModule,
    DeviceModule,
  ],
  providers: [
    UserService,
    GroupService,
    AuthService,
    JwtService,
    TokenGeneratorService,
  ],
  exports: [UserService],
  controllers: [AuthController, UserController],
})
export class UserModule {}
