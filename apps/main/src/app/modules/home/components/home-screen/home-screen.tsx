import styles from './home-screen.module.scss';

/* eslint-disable-next-line */
export interface HomeScreenProps {}

export function HomeScreen(props: HomeScreenProps) {
  return (
    <div className={styles['container']}>
      <h1>Welcome to HomeScreen!</h1>
    </div>
  );
}