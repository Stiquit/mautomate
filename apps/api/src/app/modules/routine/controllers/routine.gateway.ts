import { Logger } from '@nestjs/common';
import { SubscribeMessage, WebSocketGateway } from '@nestjs/websockets';
import { ROUTINES_CHANNEL } from '@mautomate/api-interfaces';
import { RoutineService } from '../services/routine.service';

@WebSocketGateway()
export class RoutineGateway {
  private logger = new Logger(RoutineGateway.name);
  constructor(private routineService: RoutineService) {}

  @SubscribeMessage(ROUTINES_CHANNEL)
  handleMessage(client: any, payload: { userId: string; routineId: string }) {
    const { userId, routineId } = payload;
    this.logger.log(`Activating routine: ${routineId}`);
    this.routineService.activateRoutine(userId, routineId);
  }
}
