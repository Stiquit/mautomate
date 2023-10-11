import { useCallback, useMemo } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

export function useRouter() {
  const navigate = useNavigate();
  const location = useLocation();

  const goToLogin = () => navigate('/login');
  const goToHome = () => navigate('/home');
  const goToDevices = () => navigate('/devices');
  const goToRoutines = () => navigate('/routines');
  const goToGroups = () => navigate('/groups');
  const goToProfile = () => navigate('/profile');
  const goToAmbiences = () => navigate('/ambiences');
  return {
    goToHome: useCallback(goToHome, [navigate]),
    goToLogin: useCallback(goToLogin, [navigate]),
    goToDevices: useCallback(goToDevices, [navigate]),
    goToRoutines: useCallback(goToRoutines, [navigate]),
    goToGroups: useCallback(goToGroups, [navigate]),
    goToProfile: useCallback(goToProfile, [navigate]),
    goToAmbiences: useCallback(goToAmbiences, [navigate]),
    currentRoute: useMemo(() => location.pathname, [location.pathname]),
  };
}
