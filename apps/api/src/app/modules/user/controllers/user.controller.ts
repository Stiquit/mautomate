import { Body, Controller, Get, Post } from '@nestjs/common';
import { UserService } from '../services/user.service';
import {
  AddDevicesRequest,
  GetProfileResponse,
  JwtPayload,
} from '@mautomate/api-interfaces';
import { Payload } from '../decorators/payload.decorator';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Get('profile')
  async findUser(@Payload() payload: JwtPayload): Promise<GetProfileResponse> {
    const { id } = payload;
    const user = await this.userService.findById(id);
    return {
      profile: user,
    };
  }

  @Post('devices')
  async addUserDevice(
    @Payload() payload: JwtPayload,
    @Body() body: AddDevicesRequest
  ) {
    const { id } = payload;
    const { newDevices } = body;
    return await this.userService.addDevices(id, newDevices);
  }
}
