import { WithId } from '../shared/with-id.interface';
import { RoutineAction } from './routine-action';

export interface IRoutine extends WithId {
  name: string;
  recurrence: string;
  actions: RoutineAction[];
}
