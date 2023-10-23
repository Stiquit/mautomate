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
  const goToAddRoutine = () => navigate('/routines/create');
  const goToEditRoutine = (id: string) => navigate(`/routines/edit/${id}`);

  return {
    goToHome: useCallback(goToHome, [navigate]),
    goToLogin: useCallback(goToLogin, [navigate]),
    goToDevices: useCallback(goToDevices, [navigate]),
    goToRoutines: useCallback(goToRoutines, [navigate]),
    goToGroups: useCallback(goToGroups, [navigate]),
    goToProfile: useCallback(goToProfile, [navigate]),
    goToAddRoutine: useCallback(goToAddRoutine, [navigate]),
    goToEditRoutine: useCallback(goToEditRoutine, [navigate]),
    currentRoute: useMemo(() => location.pathname, [location.pathname]),
  };
}
