import { useFormControl } from '../../ui/hook/use-form-control';
import {
  ActionStateOptions,
  RoutineActionConfig,
  RoutineActionType,
  RoutineForm,
  RoutineLightAction,
} from '../types/routine-form.type';
import {
  BaseDeviceAction,
  CreateRoutineDto,
  IRoutine,
  LightDeviceAction,
  RoutineAction,
  WaitAction,
} from '@mautomate/api-interfaces';
import { useRoutineApi } from './use-routine-api';
import { useRouter } from '../../routing/hooks/use-router';
import { useCallback } from 'react';
import { FormType } from '../../ui/types/form-type';

export function useRoutineForm() {
  const { goToRoutines } = useRouter();
  const { createRoutine, updateRoutineInformation } = useRoutineApi();
  const {
    formMethods,
    control,
    handleSubmit,
    watch,
    getValues,
    reset,
    setError,
    clearErrors,
  } = useFormControl<RoutineForm>({
    actionConfig: {} as RoutineActionConfig,
    name: '',
    recurrence: '',
    actions: [],
    routineActionType: RoutineActionType.Device,
  });
  const { setValue } = formMethods;
  const actions = watch('actions');
  const routineActionType = watch('routineActionType');

  function onSubmit(data: RoutineForm, type: FormType, id: string) {
    const { actions, recurrence, name } = data;
    const payload: CreateRoutineDto = {
      name,
      actions,
      recurrence,
    };
    if (type === 'create') {
      createRoutine(payload);
    } else {
      updateRoutineInformation(id, payload);
    }
    reset();
    goToRoutines();
  }

  function submitAction() {
    const { actionConfig } = getValues();

    clearErrors('actionConfig.state');
    if (isWaitActionConfig(actionConfig)) {
      const { waitFor } = actionConfig;
      const action: WaitAction = {
        waitFor: waitFor * 60 * 1000,
      };
      return addActionAndRestartConfig(action);
    }
    const { state, device } = actionConfig;
    if (!state) {
      return setError('actionConfig.state', {
        type: 'custom',
        message: 'Choose the state to apply',
      });
    }

    const deviceState = state.value === 1 ? true : false;
    const deviceId = String(device._id);
    if (isLightActionConfig(actionConfig)) {
      const { blue, brightness, green, red } = actionConfig;
      const action: LightDeviceAction = {
        state: deviceState,
        deviceId,
        red,
        green,
        blue,
        brightness,
      };
      return addActionAndRestartConfig(action);
    }

    const action: BaseDeviceAction = {
      state: deviceState,
      deviceId,
    };

    return addActionAndRestartConfig(action);
  }

  function removeAction(index: number) {
    return setValue(
      'actions',
      actions.filter((_, id) => {
        return id !== index;
      })
    );
  }

  function addActionAndRestartConfig(action: RoutineAction) {
    const { actions } = getValues();
    setValue('actionConfig', {} as RoutineActionConfig);
    setValue('actionConfig.state', ActionStateOptions[0]);
    setValue('routineActionType', RoutineActionType.Device);
    return setValue('actions', [...actions, action]);
  }

  function setRoutineValues(routineValues: IRoutine) {
    const { actions, name, recurrence } = routineValues;
    setValue('name', name);
    setValue('actions', actions);
    setValue('recurrence', recurrence);
  }

  function isWaitActionConfig(
    actionConfig: RoutineActionConfig
  ): actionConfig is WaitAction {
    return 'waitFor' in actionConfig;
  }

  function isLightActionConfig(
    actionConfig: RoutineActionConfig
  ): actionConfig is RoutineLightAction {
    return 'red' in actionConfig;
  }

  return {
    formMethods,
    control,
    handleSubmit,
    onSubmit,
    actions,
    routineActionType,
    submitAction,
    removeAction: useCallback(removeAction, [actions, setValue]),
    setRoutineValues: useCallback(setRoutineValues, [setValue]),
  };
}
