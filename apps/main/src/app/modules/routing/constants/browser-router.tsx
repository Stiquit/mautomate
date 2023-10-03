import { Navigate, createBrowserRouter } from 'react-router-dom';
import { App } from '../../../app';
import { HomeScreen } from '../../home/components/home-screen/home-screen';
import { AuthScreen } from '../../auth/components/auth-screen/auth-screen';
import { DevicesScreen } from '../../devices/components/devices-screen/devices-screen';

export const browserRouter = createBrowserRouter([
  { path: '/', element: <Navigate to="/login" /> },
  {
    path: '/',
    element: <App />,
    children: [
      { path: '/home', element: <HomeScreen /> },
      { path: '/devices', element: <DevicesScreen /> },
    ],
  },
  { path: '/login', element: <AuthScreen /> },
  { path: '*', element: <Navigate to="/login" /> },
]);
