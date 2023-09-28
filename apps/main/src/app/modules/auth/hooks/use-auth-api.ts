import axios, { AxiosError } from 'axios';
import {
  AuthenticationRequest,
  VerifyUserResponse,
} from '@mautomate/api-interfaces';
import { atom, useAtom } from 'jotai';
import { useAccessToken } from './use-access-token';
import { useCallback } from 'react';
import { useRouter } from '../../routing/hooks/use-router';

const errorMessageAtom = atom<string | null>(null);

export function useAuthApi() {
  const { saveToken, removeToken } = useAccessToken();
  const { goToHome } = useRouter();
  const [errorMessage, setErrorMessage] = useAtom(errorMessageAtom);

  const handleError = useCallback(
    (error: unknown) => {
      const requestErr = error as AxiosError<{ message: string }>;
      if (requestErr.response) {
        const { data } = requestErr.response;
        return setErrorMessage(data.message);
      }
      setErrorMessage(requestErr.message);
    },
    [setErrorMessage]
  );

  const login = async (data: AuthenticationRequest) => {
    try {
      const response = await axios.post<VerifyUserResponse>(
        'api/auth/login',
        data
      );
      const { access_token } = response.data;
      saveToken(access_token);
      goToHome();
    } catch (err) {
      handleError(err);
    }
  };

  const register = async (data: AuthenticationRequest) => {
    try {
      const response = await axios.post<VerifyUserResponse>(
        'api/auth/register',
        data
      );
      const { access_token } = response.data;
      saveToken(access_token);
      goToHome();
    } catch (err) {
      handleError(err);
    }
  };

  const signOut = () => removeToken();

  return {
    errorMessage,
    setErrorMessage,
    login: useCallback(login, [goToHome, handleError, saveToken]),
    register: useCallback(register, [goToHome, handleError, saveToken]),
    signOut: useCallback(signOut, [removeToken]),
  };
}
