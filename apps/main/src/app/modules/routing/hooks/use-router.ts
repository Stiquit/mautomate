import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
export interface MAutomateRouter {
  goToLogin: () => void;
  goToHome: () => void;
}
export function useRouter(): MAutomateRouter {
  const navigate = useNavigate();

  const goToLogin = () => navigate('/login');
  const goToHome = () => navigate('/home');

  return {
    goToHome: useCallback(goToHome, [navigate]),
    goToLogin: useCallback(goToLogin, [navigate]),
  };
}
