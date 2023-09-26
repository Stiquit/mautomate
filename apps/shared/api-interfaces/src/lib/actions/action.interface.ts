import { IDevice } from '../devices/device.interface';
import { IUser } from '../user/user.interface';
import { ActionType } from './action-type.enum';

export interface IAction {
  type: ActionType;
  user: IUser;
  device: IDevice;
  date: number;
}
