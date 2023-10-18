import { TextField, TextFieldProps } from '@mui/material';
import {
  BaseControllerProps,
  FormBaseField,
} from '../form-base-field/form-base-field';
import { ControllerProps, FieldValues } from 'react-hook-form';
import { useRef } from 'react';
import Cron, { HEADER } from 'react-cron-generator';

export type FormTextFieldProps<T extends FieldValues> = Omit<
  TextFieldProps,
  'variant'
> & {
  variant?: TextFieldProps['variant'];
} & BaseControllerProps<T>;

export function RecurrencePickerField<T extends FieldValues>(
  props: FormTextFieldProps<T>
) {
  const { name, control, validators, ...rest } = props;
  const scrollRef = useRef<Element>();
  const cronHeaderOptions = {
    headers: [HEADER.WEEKLY],
  };
  const render: ControllerProps['render'] = ({ field }) => (
    <Cron
      {...rest}
      value={field.value ?? ''}
      onChange={field.onChange}
      showResultCron={false}
      showResultText={false}
      options={cronHeaderOptions}
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
