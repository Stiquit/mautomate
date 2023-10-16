import { Autocomplete, TextField } from '@mui/material';

import { ReactNode } from 'react';
import {
  BaseControllerProps,
  FormBaseField,
} from '../form-base-field/form-base-field';
import { ControllerProps } from 'react-hook-form';

export interface SelectFieldProps<T> extends BaseControllerProps<T> {
  size?: 'small' | 'medium';
  label?: string;
  multiple?: boolean;
  options: T[];
  getOptionLabel: (element: T) => string;
  renderOption?: (element: T) => ReactNode;
  isOptionEqualToValue: (elementA: T, elementB: T) => boolean;
}

export function FormSelectField<T>(props: SelectFieldProps<T>) {
  const {
    name,
    control,
    validators,
    size,
    label,
    options,
    getOptionLabel,
    renderOption,
    multiple = false,
    isOptionEqualToValue,
  } = props;

  const render: ControllerProps['render'] = ({ field, fieldState }) => (
    <Autocomplete
      size={size}
      value={field.value}
      onChange={(_, value) => {
        field.onChange(value);
      }}
      options={options}
      multiple={multiple}
      autoHighlight
      getOptionLabel={getOptionLabel}
      isOptionEqualToValue={isOptionEqualToValue}
      renderOption={
        renderOption
          ? (props, option) => <li {...props}>{renderOption(option)}</li>
          : undefined
      }
      renderInput={(params) => (
        <TextField
          {...params}
          label={label}
          error={!!fieldState.error}
          helperText={fieldState.error?.message}
          inputProps={{
            ...params.inputProps,
            autoComplete: 'off',
          }}
        />
      )}
    />
  );

  return (
    <FormBaseField
      name={name}
      control={control}
      validators={validators}
      render={render}
    />
  );
}
