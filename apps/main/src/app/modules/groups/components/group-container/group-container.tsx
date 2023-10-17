import styles from './group-container.module.scss';
import { IGroup } from '@mautomate/api-interfaces';
import { DeviceContainer } from '../../../devices/components/device-container/device-container';

export interface GroupContainerProps {
  group: IGroup;
}

export function GroupContainer(props: GroupContainerProps) {
  const { group } = props;
  const { name, devices, _id } = group;
  return (
    <div className={styles['group']}>
      <div className={styles['name']}>{name}</div>
      <div className={styles['quantity']}>
        {devices.map((device) => (
          <DeviceContainer
            device={device}
            key={`group-${_id}-dev-${device._id}`}
          />
        ))}
      </div>
    </div>
  );
}
