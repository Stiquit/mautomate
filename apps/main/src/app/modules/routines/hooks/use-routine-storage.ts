import {
  DeviceAction,
  IRoutine,
  LightDeviceAction,
  RoutineAction,
} from '@mautomate/api-interfaces';
import { atom, useAtom } from 'jotai';
import { useCallback } from 'react';

const routinesAtom = atom<IRoutine[]>([]);
export function useRoutineStorage() {
  const [routines, setRoutines] = useAtom(routinesAtom);

  function removeRoutine(routineToDelete: IRoutine) {
    setRoutines((previousRoutines) =>
      previousRoutines.filter(
        (routine) => String(routine._id) !== String(routineToDelete._id)
      )
    );
  }

  function updateRoutine(routine: IRoutine) {
    setRoutines((previousRoutines) =>
      previousRoutines.map((previousRoutine) =>
        String(previousRoutine._id) === String(routine._id)
          ? routine
          : previousRoutine
      )
    );
  }

  function isDeviceAction(action: RoutineAction): action is DeviceAction {
    return 'deviceId' in action;
  }

  function isLightAction(action: DeviceAction): action is LightDeviceAction {
    return 'red' in action;
  }

  return {
    routines,
    setRoutines,
    removeRoutine: useCallback(removeRoutine, [setRoutines]),
    updateRoutine: useCallback(updateRoutine, [setRoutines]),
    isDeviceAction,
    isLightAction,
  };
}
