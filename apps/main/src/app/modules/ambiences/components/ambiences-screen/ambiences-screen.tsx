import styles from './ambiences-screen.module.scss';

/* eslint-disable-next-line */
export interface AmbiencesScreenProps {}

export function AmbiencesScreen(props: AmbiencesScreenProps) {
  return (
    <div className={styles['container']}>
      <h1>Welcome to AmbiencesScreen!</h1>
    </div>
  );
}
