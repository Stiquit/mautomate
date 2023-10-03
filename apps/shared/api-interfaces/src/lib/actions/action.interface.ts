import { IDevice } from '../devices/device.interface';
import { WithId } from '../shared/with-id.interface';
import { IUser } from '../user/user.interface';
import { ActionType } from './action-type.enum';

export interface IAction extends WithId {
  type: ActionType;
  user: IUser;
  device: IDevice;
  date: number;
}
