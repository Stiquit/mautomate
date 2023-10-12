import styles from './group-screen.module.scss';

/* eslint-disable-next-line */
export interface GroupScreenProps {}

export function GroupScreen(props: GroupScreenProps) {
  return (
    <div className={styles['container']}>
      <h1>Welcome to GroupScreen!</h1>
    </div>
  );
}
