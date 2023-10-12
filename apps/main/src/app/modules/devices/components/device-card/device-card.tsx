import styles from './device-card.module.scss';
import cn from 'classnames';
import { Card } from '../../../ui/components/card/card';
import {
  IDevice,
  DeviceState,
  TurnSwitchDevice,
  TurnLightDevice,
  DeviceType,
} from '@mautomate/api-interfaces';
import { Button } from '../../../ui/components/button/button';
import { DeviceTypeToIcon } from '../../../shared/utilities/device-type-parser';
import { FaTrashCan, FaPen } from 'react-icons/fa6';
import { useUserStorage } from '../../../user/hooks/use-user-storage';
import { Loader } from '../../../ui/components/loader/loader';
export interface DeviceCardProps {
  device: IDevice;
  onSwitchTurn: (payload: TurnSwitchDevice) => void;
  onLightTurn: (payload: TurnLightDevice) => void;
}

export function DeviceCard(props: DeviceCardProps) {
  const { device, onSwitchTurn, onLightTurn } = props;
  const { user } = useUserStorage();
  const { type, name, state, _id } = device;

  function handleTurn(state: boolean) {
    const payload = {
      deviceId: String(_id),
      userId: String(user._id),
      pin: device.pin,
      state,
    };

    if (type === DeviceType.Light) {
      return onLightTurn({
        ...payload,
        red: 0,
        green: 0,
        blue: 0,
        brightness: 0,
        type,
      });
    }

    return onSwitchTurn({ ...payload, type });
  }

  return (
    <Card>
      <div className={styles['container']}>
        <div className={styles['name']}>{name}</div>
        <div className={styles['type']}>
          <div
            className={cn(styles['icon'], {
              [styles['off']]: state === DeviceState.Off,
            })}
          >
            {DeviceTypeToIcon[type]}
          </div>
        </div>
        <div className={styles['edit']}>
          <div className={styles['icon']}>
            <FaTrashCan />
          </div>
          <div className={styles['icon']}>
            <FaPen />
          </div>
        </div>
        <div className={styles['action']}>
          {state === DeviceState.Off && (
            <Button onClick={() => handleTurn(true)}>Turn on</Button>
          )}
          {state === DeviceState.On && (
            <Button variant="secondary" onClick={() => handleTurn(false)}>
              Turn off
            </Button>
          )}
          {/* {loadingInteraction && <Loader />} */}
        </div>
      </div>
    </Card>
  );
}
