import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserName, UserSchema } from './schemas/user.schema';
import { UserService } from './services/user.service';
import { AuthService } from './services/auth.service';
import { JwtService, JwtModule } from '@nestjs/jwt';
import { TokenGeneratorService } from './services/token-generator.service';
import { AuthController } from './controllers/auth.controller';
import { UserController } from './controllers/user.controller';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: UserName, schema: UserSchema }]),
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: {
        expiresIn: process.env.JWT_EXPIRE_TIME,
      },
    }),
  ],
  providers: [UserService, AuthService, JwtService, TokenGeneratorService],
  exports: [UserService, JwtService],
  controllers: [AuthController, UserController],
})
export class UserModule {}
