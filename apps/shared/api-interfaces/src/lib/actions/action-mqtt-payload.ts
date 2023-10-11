import { ActionType } from './action-type.enum';

export interface ActionMqttPayload {
  userId: string;
  deviceId: string;
  type: ActionType;
}
