import { Outlet } from 'react-router-dom';
import styles from './app.module.scss';

export function App() {
  return (
    <div className={styles['container']}>
      <Outlet />
    </div>
  );
}
