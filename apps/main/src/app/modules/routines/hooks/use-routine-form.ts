import { RoutineAction } from '@mautomate/api-interfaces';
import { useFormControl } from '../../ui/hook/use-form-control';
import construe from 'cronstrue';

export interface RoutineFormType {
  name: string;
  recurrence: string;
  actions: RoutineAction[];
}

export function useRoutineForm() {
  const { formMethods, control, handleSubmit, watch } =
    useFormControl<RoutineFormType>({
      name: '',
      recurrence: '',
      actions: [],
    });

  function onSubmit(data: RoutineFormType) {
    console.log(data);
    console.log(construe.toString(data.recurrence));
  }

  const actions = watch('actions');

  return {
    formMethods,
    control,
    handleSubmit,
    onSubmit,
    actions,
  };
}
