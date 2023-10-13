import { IDevice } from '../devices';
import { WithId } from '../shared/with-id.interface';

export interface IGroup extends WithId {
  name: string;
  devices: IDevice[];
}
