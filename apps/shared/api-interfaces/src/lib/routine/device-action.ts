import { BaseDeviceAction } from './base-device-action';
import { LightDeviceAction } from './light-device-action';

export type DeviceAction = BaseDeviceAction | LightDeviceAction;
