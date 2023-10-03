import { Outlet } from 'react-router-dom';
import styles from './app.module.scss';
import { NavBar } from './modules/shared/components/nav-bar/nav-bar';

export function App() {
  return (
    <div className={styles['container']}>
      <NavBar />
      <Outlet />
    </div>
  );
}
