import styles from './ambiences.module.scss';

/* eslint-disable-next-line */
export interface AmbiencesProps {}

export function Ambiences(props: AmbiencesProps) {
  return (
    <div className={styles['container']}>
      <h1>Welcome to Ambiences!</h1>
    </div>
  );
}

export default Ambiences;
