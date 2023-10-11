import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const AuthPayload = createParamDecorator(
  (data: string, context: ExecutionContext) => {
    return context.switchToHttp().getRequest().payload;
  }
);
