import { DeviceType } from './device-type.enum';
import { TurnDeviceBase } from './turn-device-base';

export interface TurnSwitchDevice extends TurnDeviceBase {
  type: DeviceType;
}
