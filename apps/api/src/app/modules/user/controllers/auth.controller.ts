import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from '../services/auth.service';
import { AuthenticationRequest } from '@mautomate/api-interfaces';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('register')
  async registerUser(@Body() body: AuthenticationRequest) {
    return await this.authService.register(body);
  }

  @Post('login')
  async login(@Body() body: AuthenticationRequest) {
    return await this.authService.verify(body);
  }
}
