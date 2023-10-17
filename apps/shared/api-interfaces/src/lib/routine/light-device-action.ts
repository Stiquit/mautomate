import { BaseDeviceAction } from './base-device-action';

export interface LightDeviceAction extends BaseDeviceAction {
  red: number;
  green: number;
  blue: number;
  brightness: number;
}
