import { Validator } from '../types/validator';

export function minValidator<T>(
  min: number,
  errorMessage = `This field must be greater than ${min} `
): Validator<T> {
  return (value: T | undefined | null) => {
    if (Number(value) >= min) return null;
    return errorMessage;
  };
}
