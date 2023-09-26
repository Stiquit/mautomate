import { DeviceState } from './device-state.enum';
import { DeviceType } from './device-type.enum';

export interface IDevice {
  name: string;
  type: DeviceType;
  state: DeviceState;
  pin: number;
}
