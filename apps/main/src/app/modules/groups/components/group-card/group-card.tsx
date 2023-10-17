import styles from './group-card.module.scss';
import { DeviceType, IGroup } from '@mautomate/api-interfaces';
import { DeviceContainer } from '../../../devices/components/device-container/device-container';
import { Card } from '../../../ui/components/card/card';
import { Button } from '../../../ui/components/button/button';
import { FaTrashCan, FaPen } from 'react-icons/fa6';
import { useDialog } from '../../../ui/hook/use-dialog';
import { DeleteGroupDialog } from '../delete-group-dialog/delete-group-dialog';
import { GroupForm } from '../group-form/group-form';
import { useFormDialog } from '../../../ui/hook/use-form-dialog';
import { useWebSocket } from '../../../shared/hooks/use-web-socket';
import { useUserStorage } from '../../../user/hooks/use-user-storage';
import { delay, parseToId } from '../../../shared/utilities/utilites';
import { useDeviceStorage } from '../../../devices/hooks/use-device-storage';
import { useMemo } from 'react';

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
  const { getDevices } = useDeviceStorage();
  const { closeForm, isOpenForm, openEditForm, formType } = useFormDialog();
  const { onLightTurn, onSwitchTurn } = useWebSocket();
  const { id: userId } = useUserStorage();
  const groupDevices = useMemo(
    () => getDevices(parseToId(devices)),
    [devices, getDevices]
  );

  async function handleTurnDevices(state: boolean) {
    for (const device of devices) {
      await delay(100);
      const { type, _id, pin } = device;
      const payload = {
        deviceId: String(_id),
        userId,
        pin: pin,
        state,
        type,
      };

      if (type === DeviceType.Light) {
        const lightPayload = {
          ...payload,
          red: 223,
          green: 223,
          blue: 223,
          brightness: 1,
          type,
        };
        onLightTurn(lightPayload);
        continue;
      }
      onSwitchTurn(payload);
      continue;
    }
  }

  return (
    <Card>
      <div className={styles['container']}>
        <div className={styles['name']}>{name}</div>
        <div className={styles['devices']}>
          {groupDevices.map((device) => (
            <div className={styles['device']} key={`device-${device._id}`}>
              <DeviceContainer device={device} />
            </div>
          ))}
        </div>

        {actionsEnabled && (
          <>
            <div className={styles['buttons']}>
              <Button onClick={() => handleTurnDevices(true)}>Turn On</Button>
              <Button
                variant="secondary"
                onClick={() => handleTurnDevices(false)}
              >
                Turn Off
              </Button>
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
