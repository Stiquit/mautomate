import { DeviceState, IDevice } from '@mautomate/api-interfaces';
import styles from './device-container.module.scss';
import cn from 'classnames';
import { DeviceTypeToIcon } from '../../../shared/utilities/device-type-parser';
import { Loader } from '../../../ui/components/loader/loader';

export interface DeviceContainerProps {
  device: IDevice;
  transparent?: boolean;
}

export function DeviceContainer(props: DeviceContainerProps) {
  const { device, transparent } = props;
  const { name, state, type } = device;
  return (
    <div
      className={styles['device']}
      style={transparent ? { backgroundColor: 'transparent' } : undefined}
    >
      <div className={styles['name']}>{name}</div>
      <div
        className={cn(styles['icon'], {
          [styles['off']]: state === DeviceState.Off,
        })}
      >
        {state === DeviceState.Loading && <Loader />}
        {state !== DeviceState.Loading && DeviceTypeToIcon[type]}
      </div>
    </div>
  );
}
