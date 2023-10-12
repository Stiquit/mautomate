import { IDevice } from '../devices';

export interface IGroup {
  name: string;
  devices: IDevice[];
}
