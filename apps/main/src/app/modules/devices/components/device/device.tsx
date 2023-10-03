import styles from './device.module.scss';

/* eslint-disable-next-line */
export interface DeviceProps {}

export function Device(props: DeviceProps) {
  return (
    <div className={styles['container']}>
      <h1>Welcome to Device!</h1>
    </div>
  );
}

export default Device;
