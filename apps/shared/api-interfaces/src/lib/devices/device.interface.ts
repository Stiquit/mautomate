import { Types } from 'mongoose';
import { DeviceState } from './device-state.enum';
import { DeviceType } from './device-type.enum';
import { WithId } from '../shared/with-id.interface';

export interface IDevice extends WithId {
  name: string;
  type: DeviceType;
  state: DeviceState;
  pin: number;
}
