import { RoutineAction } from './routine-action';

export interface CreateRoutineDto {
  name: string;
  recurrence: string;
  actions: RoutineAction[];
}
