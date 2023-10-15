import { Validator } from '../types/validator';

export function stringLengthValidator<T>(
  min: number,
  errorMessage = `This field must be at least ${min} character long`
): Validator<T> {
  return (value: T | undefined | null) => {
    if (value && String(value).length > min) return null;
    return errorMessage;
  };
}
