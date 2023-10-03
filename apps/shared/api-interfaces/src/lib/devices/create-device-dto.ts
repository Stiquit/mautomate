import { DeviceType } from './device-type.enum';

export interface CreateDeviceDTO {
  name: string;
  type: DeviceType;
  pin: number;
}
