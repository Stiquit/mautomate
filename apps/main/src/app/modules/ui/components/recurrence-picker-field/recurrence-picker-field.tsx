import { TextFieldProps } from '@mui/material';
import {
  BaseControllerProps,
  FormBaseField,
} from '../form-base-field/form-base-field';
import { ControllerProps, FieldValues } from 'react-hook-form';
import { useRef } from 'react';
import Cron from 'react-js-cron';
import construe from 'cronstrue';
import 'react-js-cron/dist/styles.css';

export type FormTextFieldProps<T extends FieldValues> = Omit<
  TextFieldProps,
  'variant'
> & {
  variant?: TextFieldProps['variant'];
} & BaseControllerProps<T>;

export function RecurrencePickerField<T extends FieldValues>(
  props: FormTextFieldProps<T>
) {
  const { name, control, validators } = props;
  const scrollRef = useRef<Element>();

  const render: ControllerProps['render'] = ({ field, fieldState }) => (
    <>
      <Cron
        value={field.value ?? ''}
        setValue={field.onChange}
        defaultPeriod="week"
        humanizeLabels
        humanizeValue
        displayError
        allowedDropdowns={['week-days', 'minutes', 'period', 'hours']}
        allowedPeriods={['day', 'hour', 'week']}
      />
      <div className={props.className}>
        {field.value && construe.toString(field.value)}
      </div>
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
