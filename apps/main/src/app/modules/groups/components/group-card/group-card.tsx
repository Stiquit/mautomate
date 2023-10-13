import styles from './group-card.module.scss';
import { IGroup } from '@mautomate/api-interfaces';
import { DeviceContainer } from '../../../devices/components/device-container/device-container';
import { Card } from '../../../ui/components/card/card';
import { Button } from '../../../ui/components/button/button';
import { FaTrashCan, FaPen } from 'react-icons/fa6';

export interface GroupCardProps {
  group: IGroup;
}

export function GroupCard(props: GroupCardProps) {
  const { group } = props;
  const { name, devices } = group;
  return (
    <Card>
      <div className={styles['container']}>
        <div className={styles['name']}>{name}</div>
        <div className={styles['devices']}>
          {devices.map((device) => (
            <DeviceContainer device={device} key={`device-${device._id}`} />
          ))}
        </div>
        <div className={styles['buttons']}>
          <Button>Turn On</Button>
          <Button variant="secondary">Turn Off</Button>
          <Button>View</Button>
        </div>
        <div className={styles['actions']}>
          <div className={styles['action']}>
            <FaTrashCan />
          </div>
          <div className={styles['action']}>
            <FaPen />
          </div>
        </div>
      </div>
    </Card>
  );
}
