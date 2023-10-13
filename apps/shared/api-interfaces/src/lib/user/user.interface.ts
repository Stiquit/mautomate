import { IDevice } from '../devices/device.interface';
import { IGroup } from '../groups';
import { IRoutine } from '../routine/routine.interface';
import { WithId } from '../shared/with-id.interface';

export interface IUser extends WithId {
  firstName: string;
  lastName: string;
  username: string;
  password: string;
  devices: IDevice[];
  groups: IGroup[];
  routines: IRoutine[];
}
