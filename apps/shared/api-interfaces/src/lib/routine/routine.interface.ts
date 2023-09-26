import { IAction } from '../actions/action.interface';

export interface IRoutine {
  name: string;
  repeat: string;
  actions: IAction[];
}
