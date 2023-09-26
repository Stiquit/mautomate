import { IDevice } from '../devices/device.interface';
import { IRoutine } from '../routine/routine.interface';

export interface IUser {
  firstName: string;
  lastName: string;
  username: string;
  password: string;
  devices: IDevice[];
  routines: IRoutine[];
}
