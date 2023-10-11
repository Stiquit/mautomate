import styles from './latest-actions.module.scss';

/* eslint-disable-next-line */
export interface LatestActionsProps {}

export function LatestActions(props: LatestActionsProps) {
  return (
    <div className={styles['container']}>
      <h1>Welcome to LatestActions!</h1>
    </div>
  );
}

export default LatestActions;
