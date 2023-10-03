import { MainLayout } from '../../../shared/components/main-layout/main-layout';
import styles from './home-screen.module.scss';

export function HomeScreen() {
  return (
    <MainLayout>
      <div className={styles['container']}>
        <h1>Welcome to HomeScreen!</h1>
      </div>
    </MainLayout>
  );
}
