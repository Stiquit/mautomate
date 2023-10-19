import { useFormControl } from '../../ui/hook/use-form-control';
import {
  RoutineActionConfig,
  RoutineActionType,
  RoutineForm,
  RoutineLightAction,
} from '../types/routine-form.type';
import {
  BaseDeviceAction,
  CreateRoutineDto,
  LightDeviceAction,
  RoutineAction,
  WaitAction,
} from '@mautomate/api-interfaces';
import { useRoutineApi } from './use-routine-api';
import { useRouter } from '../../routing/hooks/use-router';

export function useRoutineForm() {
  const { goToRoutines } = useRouter();
  const { createRoutine } = useRoutineApi();
  const { formMethods, control, handleSubmit, watch, getValues } =
    useFormControl<RoutineForm>({
      actionConfig: {} as RoutineActionConfig,
      name: '',
      recurrence: '',
      actions: [],
      routineActionType: RoutineActionType.Device,
    });
  const { setValue } = formMethods;
  const actions = watch('actions');
  const routineActionType = watch('routineActionType');

  function onSubmit(data: RoutineForm) {
    const { actions, recurrence, name } = data;
    const payload: CreateRoutineDto = {
      name,
      actions,
      recurrence,
    };
    createRoutine(payload);
    goToRoutines();
  }

  function submitAction() {
    const { actionConfig } = getValues();
    if (isWaitActionConfig(actionConfig)) {
      const { waitFor } = actionConfig;
      const action: WaitAction = {
        waitFor: waitFor * 60 * 1000,
      };
      return addActionAndRestartConfig(action);
    }
    const { state, device } = actionConfig;
    const selectedState: { label: string; value: number } =
      state as unknown as {
        label: string;
        value: number;
      };
    const deviceState = selectedState.value === 1 ? true : false;
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

  function addActionAndRestartConfig(action: RoutineAction) {
    const { actions } = getValues();
    setValue('actionConfig', {} as RoutineActionConfig);
    setValue('routineActionType', RoutineActionType.Device);
    return setValue('actions', [...actions, action]);
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
  };
}
