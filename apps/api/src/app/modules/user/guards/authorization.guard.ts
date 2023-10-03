import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../services/user.service';
import { Request } from 'express';
import { JwtPayload } from '@mautomate/api-interfaces';
import { Reflector } from '@nestjs/core';
import { IS_PUBLIC_KEY } from '../constants/is-public-key';

@Injectable()
export class AuthorizationGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
    private userService: UserService,
    private jwtService: JwtService
  ) {}

  async canActivate(context: ExecutionContext) {
    const isPublic: boolean = this.reflector.get(
      IS_PUBLIC_KEY,
      context.getClass()
    );

    if (isPublic) {
      return true;
    }
    const request = context.switchToHttp().getRequest<Request>();
    const token = this.extractTokenFromHeader(request);

    if (!token) {
      throw new UnauthorizedException();
    }

    try {
      const payload = this.jwtService.verify<JwtPayload>(token, {
        secret: process.env.JWT_SECRET,
      });
      request['payload'] = payload;

      const user = await this.userService.findById(payload.id);

      return !!user;
    } catch (error) {
      throw new UnauthorizedException();
    }
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}
