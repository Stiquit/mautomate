import { Validator } from '../types/validator';

export function requiredValidator<T>(
  errorMessage = 'This field is required'
): Validator<T> {
  return (value: T | undefined | null) => {
    if (Array.isArray(value) && value.length > 0) return null;
    if (value) return null;
    return errorMessage;
  };
}
