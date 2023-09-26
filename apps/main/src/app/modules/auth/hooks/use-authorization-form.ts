import { AuthenticationRequest } from '@mautomate/api-interfaces';
import { useFormControl } from '../../ui/hook/use-form-control';
import { useAuth } from './use-auth';
import { useAtom, atom } from 'jotai';
import { useAccessToken } from './use-access-token';
import { useRouter } from '../../routing/hooks/use-router';

const loadingAtom = atom(false);

export function useAuthorizationForm() {
  const [loading, setLoading] = useAtom(loadingAtom);
  const { register, login } = useAuth();
  const { goToHome } = useRouter();
  const { formMethods } = useFormControl<AuthenticationRequest>({
    password: '',
    username: '',
  });

  const submitRegistration = async (data: AuthenticationRequest) => {
    const { username, password } = data;
    setLoading(true);
    await register({
      username,
      password,
    });
    setLoading(false);
    goToHome();
  };

  const submitLogin = async (data: AuthenticationRequest) => {
    const { username, password } = data;
    setLoading(true);
    await login({
      username,
      password,
    });
    setLoading(false);
    goToHome();
  };

  return {
    submitRegistration,
    submitLogin,
  };
}
