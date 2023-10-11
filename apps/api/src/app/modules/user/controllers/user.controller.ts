import { Controller, Get } from '@nestjs/common';
import { UserService } from '../services/user.service';
import { GetProfileResponse, JwtPayload } from '@mautomate/api-interfaces';
import { AuthPayload } from '../decorators/auth-payload.decorator';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Get('profile')
  async findUser(
    @AuthPayload() payload: JwtPayload
  ): Promise<GetProfileResponse> {
    const { id } = payload;
    const profile = await this.userService.getUserProfile(id);
    return {
      profile,
    };
  }
}
