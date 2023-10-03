import { AxiosError } from 'axios';
import { atom, useAtom } from 'jotai';
import { useCallback } from 'react';

const errorMessageAtom = atom<string | null>(null);
export function useRequestError() {
  const [errorMessage, setErrorMessage] = useAtom(errorMessageAtom);

  const handleError = useCallback(
    (error: unknown) => {
      console.error(error);
      const requestErr = error as AxiosError<{ message: string }>;
      if (requestErr.response) {
        const { data } = requestErr.response;
        return setErrorMessage(data.message);
      }
      setErrorMessage(requestErr.message);
    },
    [setErrorMessage]
  );

  const clearError = () => setErrorMessage(null);
  return {
    handleError,
    errorMessage,
    clearError,
  };
}
