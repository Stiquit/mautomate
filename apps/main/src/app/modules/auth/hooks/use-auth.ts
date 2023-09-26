import axios, { AxiosError } from 'axios';
import {
  AuthenticationRequest,
  VerifyUserResponse,
} from '@mautomate/api-interfaces';
import { atom, useAtom } from 'jotai';
import { useAccessToken } from './use-access-token';
import { useCallback } from 'react';

const errorMessageAtom = atom<string | null>(null);

export function useAuth() {
  const { saveToken, removeToken } = useAccessToken();

  const [errorMessage, setErrorMessage] = useAtom(errorMessageAtom);
  const httpClient = axios.create({
    baseURL: '/auth',
  });

  const handleError = useCallback(
    (error: unknown) => {
      const requestErr = error as AxiosError;
      setErrorMessage(requestErr.message);
    },
    [setErrorMessage]
  );

  const login = async (data: AuthenticationRequest) => {
    try {
      const response = await httpClient.post<VerifyUserResponse>('/auth', data);
      const { access_token } = response.data;
      saveToken(access_token);
    } catch (err) {
      handleError(err);
    }
  };

  const register = async (data: AuthenticationRequest) => {
    try {
      const response = await httpClient.post<VerifyUserResponse>('/auth', data);
      const { access_token } = response.data;
      saveToken(access_token);
    } catch (err) {
      handleError(err);
    }
  };

  const signOut = () => removeToken();

  return {
    errorMessage,
    login: useCallback(login, [handleError, httpClient, saveToken]),
    register: useCallback(register, [handleError, httpClient, saveToken]),
    signOut: useCallback(signOut, [removeToken]),
  };
}
