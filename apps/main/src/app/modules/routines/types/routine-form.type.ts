import {
  BaseDeviceAction,
  IDevice,
  LightDeviceAction,
  RoutineAction,
  WaitAction,
} from '@mautomate/api-interfaces';
import { RgbaColor } from 'react-colorful';

export enum RoutineActionType {
  Wait = 'Wait',
  Light = 'Light',
  Device = 'Device',
}

export const ActionStateOptions: { label: string; value: number }[] = [
  {
    label: 'On',
    value: 1,
  },
  {
    label: 'Off',
    value: 0,
  },
];

export interface RoutineDeviceAction extends Omit<BaseDeviceAction, 'state'> {
  device: IDevice;
  state: {
    label: string;
    value: number;
  };
}

export interface RoutineLightAction extends Omit<LightDeviceAction, 'state'> {
  device: IDevice;
  color: RgbaColor;
  state: {
    label: string;
    value: number;
  };
}

export type RoutineActionConfig =
  | WaitAction
  | RoutineDeviceAction
  | RoutineLightAction;

export type RoutineForm = {
  name: string;
  recurrence: string;
  actions: RoutineAction[];
  routineActionType: RoutineActionType;
  actionConfig: RoutineActionConfig;
};
