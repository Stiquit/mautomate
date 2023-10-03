import { IAction } from '../actions/action.interface';
import { WithId } from '../shared/with-id.interface';

export interface IRoutine extends WithId {
  name: string;
  repeat: string;
  actions: IAction[];
}
