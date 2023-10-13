import { IGroup } from '@mautomate/api-interfaces';
import styles from './group-container.module.scss';
import { Button } from '../../../ui/components/button/button';

export interface GroupContainerProps {
  group: IGroup;
}

export function GroupContainer(props: GroupContainerProps) {
  const { group } = props;
  return (
    <div className={styles['group']}>
      <div className={styles['name']}>{group.name}</div>
      <div className={styles['quantity']}># {group.devices.length} devices</div>
      <div className={styles['btn']}>
        <Button>view</Button>
      </div>
    </div>
  );
}
