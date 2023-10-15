import {
  BaseDialogProps,
  Dialog,
  DialogActions,
  DialogCloseIcon,
  DialogContent,
  DialogTitle,
} from '../../../ui/components/dialog/dialog';
import styles from './delete-device-dialog.module.scss';
import { IDevice } from '@mautomate/api-interfaces';
import { DeviceContainer } from '../device-container/device-container';
import { Button } from '../../../ui/components/button/button';
import { useDeviceApi } from '../../hooks/use-device-api';

export interface DeleteDeviceDialogProps extends BaseDialogProps {
  device: IDevice;
}

export function DeleteDeviceDialog(props: DeleteDeviceDialogProps) {
  const { device, close, isOpen } = props;
  const { name } = device;
  const { deleteDevice } = useDeviceApi();

  function onDeleteHandler() {
    deleteDevice(String(device._id));
    close();
  }
  return (
    <Dialog isOpen={isOpen} close={close}>
      <DialogCloseIcon onClose={close} />
      <DialogTitle>
        Delete <span className={styles['name']}>{name}</span> ?
      </DialogTitle>
      <DialogContent>
        <div className={styles['container']}>
          <div className={styles['hint']}>
            Please confirm that you want to delete this device from your
            SmartHome
          </div>
          <div className={styles['device']}>
            <DeviceContainer device={device} />
          </div>
        </div>
      </DialogContent>
      <DialogActions>
        <Button onClick={onDeleteHandler}>Delete</Button>
        <Button variant="secondary" onClick={close}>
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
}
