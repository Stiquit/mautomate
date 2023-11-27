import { DeviceType } from './device-type.enum';

export interface DeviceMQTTResponse {
  type: DeviceType;
  deviceId: string;
  state: number;
  userId: string;
}
