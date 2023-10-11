import { DeviceType } from './device-type.enum';
import { TurnDeviceBase } from './turn-device-base';

export interface TurnLightDevice extends TurnDeviceBase {
  type: DeviceType.Light;
  red: number;
  green: number;
  blue: number;
  brightness: number;
}
