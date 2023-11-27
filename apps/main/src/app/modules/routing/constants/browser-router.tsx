import { Navigate, createBrowserRouter } from 'react-router-dom';
import { App } from '../../../app';
import { HomeScreen } from '../../home/components/home-screen/home-screen';
import { AuthScreen } from '../../auth/components/auth-screen/auth-screen';
import { DevicesScreen } from '../../devices/components/devices-screen/devices-screen';
import { RoutinesScreen } from '../../routines/components/routines-screen/routines-screen';
import { GroupScreen } from '../../groups/components/group-screen/group-screen';
import { ProfileScreen } from '../../user/components/profile-screen/profile-screen';
import { RoutineForm } from '../../routines/components/routine-form/routine-form';

export const browserRouter = createBrowserRouter([
  { path: '/', element: <Navigate to="/login" /> },
  {
    path: '/',
    element: <App />,
    children: [
      { path: '/home', element: <HomeScreen /> },
      { path: '/devices', element: <DevicesScreen /> },
      { path: '/routines', element: <RoutinesScreen /> },
      { path: '/routines/create', element: <RoutineForm type={'create'} /> },
      { path: '/routines/edit/:id', element: <RoutineForm type={'edit'} /> },
      { path: '/groups', element: <GroupScreen /> },
      { path: '/profile', element: <ProfileScreen /> },
    ],
  },
  { path: '/login', element: <AuthScreen /> },
  { path: '*', element: <Navigate to="/login" /> },
]);
