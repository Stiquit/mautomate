import styles from './empty-screen.module.scss';

export interface EmptyScreenProps {
  message: string;
}

export function EmptyScreen(props: EmptyScreenProps) {
  const { message } = props;
  return (
    <div className={styles['container']}>
      <div className={styles['message']}>{message}</div>
    </div>
  );
}
