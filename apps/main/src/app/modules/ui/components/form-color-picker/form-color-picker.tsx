import { TextFieldProps } from '@mui/material';
import {
  BaseControllerProps,
  FormBaseField,
} from '../form-base-field/form-base-field';
import { ControllerProps, FieldValues } from 'react-hook-form';
import { useRef } from 'react';
import { RgbaColorPicker } from 'react-colorful';

export type FormTextFieldProps<T extends FieldValues> = Omit<
  TextFieldProps,
  'variant'
> & {
  variant?: TextFieldProps['variant'];
} & BaseControllerProps<T>;

export function FormColorPicker<T extends FieldValues>(
  props: FormTextFieldProps<T>
) {
  const { name, control, validators } = props;
  const scrollRef = useRef<Element>();

  const render: ControllerProps['render'] = ({ field, fieldState }) => (
    <>
      <RgbaColorPicker
        onChange={field.onChange}
        color={
          field.value || {
            r: 223,
            g: 223,
            b: 223,
            a: 1,
          }
        }
      />
      {fieldState.error && (
        <div className="Mui-error">{fieldState.error.message}</div>
      )}
    </>
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
