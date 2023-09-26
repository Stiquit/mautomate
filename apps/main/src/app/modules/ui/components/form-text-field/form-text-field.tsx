import { TextField, TextFieldProps } from '@mui/material';
import {
  FormBaseControllerProps,
  FormBaseField,
} from '../form-base-field/form-base-field';
import { ControllerProps } from 'react-hook-form';
import { useRef } from 'react';

export type FormTextFieldProps = Omit<TextFieldProps, 'variant'> & {
  variant?: TextFieldProps['variant'];
} & FormBaseControllerProps<string>;

export function FormTextField(props: FormTextFieldProps) {
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
