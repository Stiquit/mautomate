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
import { FaTrashCan, FaPen, FaPalette } from 'react-icons/fa6';
import { useUserStorage } from '../../../user/hooks/use-user-storage';
import { Loader } from '../../../ui/components/loader/loader';
import { useDialog } from '../../../ui/hook/use-dialog';
import { DeleteDeviceDialog } from '../delete-device-dialog/delete-device-dialog';
import { useFormDialog } from '../../../ui/hook/use-form-dialog';
import { DeviceForm } from '../device-form/device-form';
import { useColorPickerDialog } from '../../../shared/hooks/use-color-picker-dialog';
import { ColorPickerDialog } from '../../../shared/components/color-picker-dialog/color-picker-dialog';
import { rgbaColorToString } from '../../../shared/utilities/color-parser';
export interface DeviceCardProps {
  device: IDevice;
  onSwitchTurn: (payload: TurnSwitchDevice) => void;
  onLightTurn: (payload: TurnLightDevice) => void;
}

export function DeviceCard(props: DeviceCardProps) {
  const { device, onSwitchTurn, onLightTurn } = props;
  const { user } = useUserStorage();
  const { type, name, state, _id } = device;
  const {
    close: closeDeleteDialog,
    isOpen: isOpenDeleteDialog,
    open: openDeleteDialog,
  } = useDialog();
  const {
    closeColorPicker,
    handleColorChange,
    color,
    isOpenColorPicker,
    openColorPicker,
  } = useColorPickerDialog();
  const { closeForm, isOpenForm, openEditForm, formType } = useFormDialog();

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
        red: color.r,
        green: color.g,
        blue: color.b,
        brightness: color.g,
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
          {state !== DeviceState.Loading && (
            <div
              className={cn(styles['icon'], {
                [styles['off']]: state === DeviceState.Off,
              })}
              style={
                state === DeviceState.On && type === DeviceType.Light
                  ? {
                      color: rgbaColorToString(color),
                    }
                  : undefined
              }
            >
              {DeviceTypeToIcon[type]}
            </div>
          )}
          {state === DeviceState.Loading && <Loader />}
        </div>
        <div className={styles['edit']}>
          {type === DeviceType.Light && (
            <div className={styles['icon']}>
              <FaPalette onClick={openColorPicker} />
            </div>
          )}
          <div className={styles['icon']}>
            <FaTrashCan onClick={openDeleteDialog} />
          </div>
          <div className={styles['icon']}>
            <FaPen onClick={openEditForm} />
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
        </div>
      </div>
      <DeleteDeviceDialog
        device={device}
        close={closeDeleteDialog}
        isOpen={isOpenDeleteDialog}
      />
      <DeviceForm
        close={closeForm}
        isOpen={isOpenForm}
        type={formType}
        device={device}
      />
      {type === DeviceType.Light && (
        <ColorPickerDialog
          isOpen={isOpenColorPicker}
          close={() => {
            closeColorPicker();
            if (state === DeviceState.On) {
              handleTurn(true);
            }
          }}
          onChange={handleColorChange}
          color={color}
        />
      )}
    </Card>
  );
}
