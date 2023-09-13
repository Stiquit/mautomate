import * as bcrypt from 'bcrypt';
import {
  ConflictException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { UserService } from './user.service';
import {
  RegistrationRequest,
  LoginRequest,
  VerifyUserResponse,
} from '@mautomate/api-interfaces';
import { TokenGeneratorService } from './token-generator.service';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private tokenGeneratorService: TokenGeneratorService
  ) {}

  async register(request: RegistrationRequest) {
    const { username, password } = request;
    const registeredUser = await this.userService.findByUsername(username);

    if (registeredUser) {
      throw new ConflictException(
        `Username: ${username} is already registered`
      );
    }

    return await this.userService.create(username, password);
  }

  async verify(request: LoginRequest): Promise<VerifyUserResponse> {
    const { id, password } = request;
    const user = await this.userService.findById(id);

    if (!user) {
      throw new NotFoundException(`Username: ${id} not registered`);
    }

    if (!bcrypt.compare(password, user.password)) {
      throw new UnauthorizedException('Wrong credentials');
    }

    return await this.tokenGeneratorService.getAccessToken(user);
  }
}
