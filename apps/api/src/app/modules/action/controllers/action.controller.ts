import { Controller, Get } from '@nestjs/common';
import { ActionService } from '../services/action.service';
import { AuthPayload } from '../../user/decorators/auth-payload.decorator';
import { JwtPayload } from '@mautomate/api-interfaces';

@Controller('action')
export class ActionController {
  constructor(private actionService: ActionService) {}

  @Get()
  async getUserActions(@AuthPayload() payload: JwtPayload) {
    const { id } = payload;
    return this.actionService.findByUserId(id);
  }

  @Get('all')
  async getAllActions() {
    return this.actionService.findAll();
  }
}
