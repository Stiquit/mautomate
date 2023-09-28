import { TextField, TextFieldProps } from '@mui/material';
import {
  BaseControllerProps,
  FormBaseField,
} from '../form-base-field/form-base-field';
import { ControllerProps, FieldValues } from 'react-hook-form';
import { useRef } from 'react';

export type FormTextFieldProps<T extends FieldValues> = Omit<
  TextFieldProps,
  'variant'
> & {
  variant?: TextFieldProps['variant'];
} & BaseControllerProps<T>;

export function FormTextField<T extends FieldValues>(
  props: FormTextFieldProps<T>
) {
  const { name, control, validators, ...rest } = props;
  const scrollRef = useRef<Element>();

  const render: ControllerProps['render'] = ({ field, fieldState }) => (
    <TextField
      variant={rest.disabled ? 'standard' : 'outlined'}
      {...rest}
      error={!!fieldState.error}
      helperText={fieldState.error ? fieldState.error.message : rest.helperText}
      value={field.value ?? ''}
      onChange={field.onChange}
      inputRef={scrollRef}
    />
  );

  return (
    <FormBaseField
      name={name}
      control={control}
      validators={validators}
      scrollRef={scrollRef}
      render={render}
    />
  );
}
