import { Outlet } from 'react-router-dom';
import styles from './app.module.scss';
import { NavBar } from './modules/shared/components/nav-bar/nav-bar';
import { useNavBar } from './modules/shared/hooks/use-nav-bar';
import cn from 'classnames';

export function App() {
  const { collapsed } = useNavBar();
  return (
    <div className={styles['container']}>
      <NavBar />
      <div
        className={cn(styles['content'], {
          [styles['collapsed']]: collapsed,
        })}
      >
        <Outlet />
      </div>
    </div>
  );
}
