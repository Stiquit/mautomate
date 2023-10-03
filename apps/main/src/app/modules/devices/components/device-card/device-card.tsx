import styles from './device-card.module.scss';
import { IDevice, DeviceState, DeviceType } from '@mautomate/api-interfaces';

export interface DeviceCardProps {
  device: IDevice;
}

export function DeviceCard(props: DeviceCardProps) {
  const { device } = props;
  const { type, name, state } = device;
  return (
    <div className={styles['container']}>
      <div className={styles['type']}>{type}</div>
      <div className={styles['name']}>{name}</div>
      <div className={styles['action']}>
        {state === DeviceState.On && 'turn off'}
        {state === DeviceState.Off && 'turn on'}
      </div>
    </div>
  );
}
