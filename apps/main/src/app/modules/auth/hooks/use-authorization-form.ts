import { AuthenticationRequest } from '@mautomate/api-interfaces';
import { useAuthApi } from './use-auth-api';
import { useAtom, atom } from 'jotai';

const loadingAtom = atom(false);

export function useAuthorizationForm() {
  const [loading, setLoading] = useAtom(loadingAtom);
  const { register, login, authorizationError } = useAuthApi();

  const submitRegistration = async (data: AuthenticationRequest) => {
    const { username, password } = data;
    setLoading(true);
    await register({
      username,
      password,
    });
    setLoading(false);
  };

  const submitLogin = async (data: AuthenticationRequest) => {
    const { username, password } = data;
    setLoading(true);
    await login({
      username,
      password,
    });
    setLoading(false);
  };

  return {
    submitRegistration,
    submitLogin,
    loading,
    authorizationError,
  };
}
