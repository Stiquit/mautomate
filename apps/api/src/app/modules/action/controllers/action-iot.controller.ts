import { ACTIONS_TOPIC, ActionMqttPayload } from '@mautomate/api-interfaces';
import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { ActionService } from '../services/action.service';

@Controller('action-iot')
export class ActionIotController {
  constructor(private actionService: ActionService) {}

  @MessagePattern(ACTIONS_TOPIC)
  serverActions(@Payload() payload: ActionMqttPayload) {
    const { userId, deviceId, type } = payload;
    return this.actionService.create(userId, deviceId, type);
  }
}
