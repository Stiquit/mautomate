import styles from './routines-screen.module.scss';

/* eslint-disable-next-line */
export interface RoutinesScreenProps {}

export function RoutinesScreen(props: RoutinesScreenProps) {
  return (
    <div className={styles['container']}>
      <h1>Welcome to RoutinesScreen!</h1>
    </div>
  );
}
