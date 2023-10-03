import axios from 'axios';
import {
  AuthenticationRequest,
  VerifyUserResponse,
} from '@mautomate/api-interfaces';

import { useAccessToken } from './use-access-token';
import { useCallback } from 'react';
import { useRouter } from '../../routing/hooks/use-router';
import { useRequestError } from '../../error-handler/hooks/use-request-error';

export function useAuthApi() {
  const { saveToken, removeToken } = useAccessToken();
  const { goToHome } = useRouter();
  const { errorMessage: authorizationError, handleError } = useRequestError();
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
    authorizationError,
    login: useCallback(login, [goToHome, handleError, saveToken]),
    register: useCallback(register, [goToHome, handleError, saveToken]),
    signOut: useCallback(signOut, [removeToken]),
  };
}
