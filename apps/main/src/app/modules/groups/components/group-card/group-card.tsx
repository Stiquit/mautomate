import styles from './group-card.module.scss';
import { IGroup } from '@mautomate/api-interfaces';
import { DeviceContainer } from '../../../devices/components/device-container/device-container';
import { Card } from '../../../ui/components/card/card';
import { Button } from '../../../ui/components/button/button';
import { FaTrashCan, FaPen } from 'react-icons/fa6';
import { useDialog } from '../../../ui/hook/use-dialog';
import { DeleteGroupDialog } from '../delete-group-dialog/delete-group-dialog';
import { GroupForm } from '../group-form/group-form';
import { useFormDialog } from '../../../ui/hook/use-form-dialog';

export interface GroupCardProps {
  group: IGroup;
  actionsEnabled?: boolean;
}

export function GroupCard(props: GroupCardProps) {
  const { group, actionsEnabled = true } = props;
  const { name, devices } = group;
  const {
    isOpen: isOpenDeleteGroup,
    close: closeDeleteGroup,
    open: openDeleteGroup,
  } = useDialog();
  const { closeForm, isOpenForm, openEditForm, formType } = useFormDialog();

  return (
    <Card>
      <div className={styles['container']}>
        <div className={styles['name']}>{name}</div>
        <div className={styles['devices']}>
          {devices.map((device) => (
            <DeviceContainer device={device} key={`device-${device._id}`} />
          ))}
        </div>

        {actionsEnabled && (
          <>
            <div className={styles['buttons']}>
              <Button>Turn On</Button>
              <Button variant="secondary">Turn Off</Button>
              <Button>View</Button>
            </div>
            <div className={styles['actions']}>
              <div className={styles['action']}>
                <FaTrashCan onClick={openDeleteGroup} />
              </div>
              <div className={styles['action']}>
                <FaPen onClick={openEditForm} />
              </div>
            </div>
          </>
        )}
      </div>
      <DeleteGroupDialog
        close={closeDeleteGroup}
        group={group}
        isOpen={isOpenDeleteGroup}
      />
      <GroupForm
        close={closeForm}
        isOpen={isOpenForm}
        type={formType}
        group={group}
      />
    </Card>
  );
}
