import { Validator } from '../../types/validator';
import { Controller, ControllerProps, useFormContext } from 'react-hook-form';
import { atom, useAtom } from 'jotai';
import { MutableRefObject, useEffect } from 'react';
import { scrollIntoView } from 'seamless-scroll-polyfill';

export interface FormBaseControllerProps<T> {
  name: ControllerProps['name'];
  control: ControllerProps['control'];
  render: ControllerProps['render'];
  validators?: Validator<T>[];
  scrollRef?: MutableRefObject<Element | undefined>;
}

const errorElementAtom = atom<Element | null>(null);

export function FormBaseField<T>(props: FormBaseControllerProps<T>) {
  const [errorElement, setErrorElement] = useAtom(errorElementAtom);
  const { name, control, validators, render, scrollRef } = props;
  const { formState } = useFormContext();

  useEffect(() => {
    setErrorElement(null);
  }, [formState.submitCount, setErrorElement]);

  const errorValidation = (value: T) => {
    if (!validators) {
      return undefined;
    }
    for (const validator of validators) {
      const validationResult = validator(value);
      if (validationResult) {
        if (scrollRef && scrollRef.current && !errorElement) {
          setErrorElement(scrollRef.current);
          scrollIntoView(scrollRef.current, {
            behavior: 'smooth',
            block: 'center',
          });
        }
        return validationResult;
      }
    }
    return undefined;
  };
  return (
    <Controller
      name={name}
      control={control}
      rules={{ validate: errorValidation }}
      render={render}
    />
  );
}
