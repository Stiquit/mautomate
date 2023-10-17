import { DeviceAction } from './device-action';
import { WaitAction } from './wait-action';

export type RoutineAction = WaitAction | DeviceAction;
