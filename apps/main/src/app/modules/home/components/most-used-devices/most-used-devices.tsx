import styles from './most-used-devices.module.scss';

/* eslint-disable-next-line */
export interface MostUsedDevicesProps {}

export function MostUsedDevices(props: MostUsedDevicesProps) {
  return (
    <div className={styles['container']}>
      <h1>Welcome to MostUsedDevices!</h1>
    </div>
  );
}
