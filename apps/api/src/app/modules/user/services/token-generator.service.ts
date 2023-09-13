import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserDocument } from '../schemas/user.schema';
import { JwtPayload } from '@mautomate/api-interfaces';

@Injectable()
export class TokenGeneratorService {
  constructor(private jwtService: JwtService) {}

  private generatePayload(user: UserDocument): JwtPayload {
    return {
      id: user.id,
    };
  }

  async getAccessToken(user: UserDocument) {
    const payload = this.generatePayload(user);
    const access_token = await this.jwtService.signAsync(payload);
    return {
      access_token,
    };
  }
}
