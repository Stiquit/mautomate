import { DefaultValues, FieldValues, useForm } from 'react-hook-form';

export function useFormControl<T extends FieldValues>(
  defaultValues?: DefaultValues<T>
) {
  const formMethods = useForm<T>({
    defaultValues,
  });
  const { handleSubmit, control, getValues, watch } = formMethods;

  return {
    watch,
    handleSubmit,
    control,
    getValues,
    formMethods,
  };
}
