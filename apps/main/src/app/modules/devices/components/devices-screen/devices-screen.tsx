import { MainLayout } from '../../../shared/components/main-layout/main-layout';
import { useWebSocket } from '../../../shared/hooks/use-web-socket';
import { Button } from '../../../ui/components/button/button';
import { useDeviceStorage } from '../../hooks/use-device-storage';
import { DeviceCard } from '../device-card/device-card';
import styles from './devices-screen.module.scss';
import { useDeviceApi } from '../../hooks/use-device-api';
import { useOnInit } from '../../../shared/hooks/use-on-init';
import { GridLayout } from '../../../shared/components/grid-layout/grid-layout';
import { DeviceForm } from '../device-form/device-form';
import { useFormDialog } from '../../../ui/hook/use-form-dialog';

export function DevicesScreen() {
  const { getUserDevices, loadingRequest } = useDeviceApi();
  const { devices } = useDeviceStorage();
  const { webSocket, connect, onSwitchTurn, onLightTurn } = useWebSocket();
  const { closeForm, isOpenForm, openCreateForm, formType } = useFormDialog();

  useOnInit(() => {
    getUserDevices();
  });

  return (
    <MainLayout>
      <div className={styles['container']}>
        <div className={styles['top-content']}>
          <div className={styles['title']}>Devices</div>
          <div className={styles['top-container']}>
            <div className={styles['text']}>
              Add, edit, and delete your devices here
            </div>
            <div className={styles['add-btn']}>
              <Button onClick={openCreateForm}>Add</Button>
            </div>
          </div>
        </div>
        <GridLayout loading={loadingRequest} size="small">
          {webSocket &&
            devices.map((device) => (
              <DeviceCard
                device={device}
                key={`device-${device._id}`}
                onSwitchTurn={onSwitchTurn}
                onLightTurn={onLightTurn}
              />
            ))}
          {!webSocket && (
            <div className={styles['connect-btn']}>
              <Button onClick={connect}> Connect </Button>
            </div>
          )}
        </GridLayout>
      </div>
      <DeviceForm close={closeForm} isOpen={isOpenForm} type={formType} />
    </MainLayout>
  );
}
