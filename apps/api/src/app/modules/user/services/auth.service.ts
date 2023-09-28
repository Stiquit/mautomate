import * as bcrypt from 'bcrypt';
import {
  ConflictException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { UserService } from './user.service';
import {
  AuthenticationRequest,
  VerifyUserResponse,
  IUser,
} from '@mautomate/api-interfaces';
import { TokenGeneratorService } from './token-generator.service';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private tokenGeneratorService: TokenGeneratorService
  ) {}

  async register(request: AuthenticationRequest): Promise<VerifyUserResponse> {
    const { username, password } = request;
    const registeredUser = await this.userService.findByUsername(username);

    if (registeredUser) {
      throw new ConflictException(
        `Username: ${username} is already registered`
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await this.userService.create(username, hashedPassword);
    return await this.tokenGeneratorService.generateAccessToken(user);
  }

  async verify(request: AuthenticationRequest): Promise<VerifyUserResponse> {
    const { username, password } = request;
    const user = await this.userService.findByUsername(username);

    if (!user) {
      throw new NotFoundException(`Username: ${username} not registered`);
    }

    if (!bcrypt.compare(password, user.password)) {
      throw new UnauthorizedException('Wrong credentials');
    }

    return await this.tokenGeneratorService.generateAccessToken(user);
  }
}
