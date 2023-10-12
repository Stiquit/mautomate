import styles from './profile-screen.module.scss';

/* eslint-disable-next-line */
export interface ProfileScreenProps {}

export function ProfileScreen(props: ProfileScreenProps) {
  return (
    <div className={styles['container']}>
      <h1>Welcome to ProfileScreen!</h1>
    </div>
  );
}
