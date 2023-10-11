import {
  DEVICE_LIGHT_CHANNEL,
  DEVICE_SWITCH_CHANNEL,
  TurnLightDevice,
  TurnSwitchDevice,
} from '@mautomate/api-interfaces';
import { MainLayout } from '../../../shared/components/main-layout/main-layout';
import { useWebSocket } from '../../../shared/hooks/use-web-socket';
import { Button } from '../../../ui/components/button/button';
import { useDeviceStorage } from '../../hooks/use-device-storage';
import { DeviceCard } from '../device-card/device-card';
import styles from './devices-screen.module.scss';
import { useDeviceApi } from '../../hooks/use-device-api';
import { useOnInit } from '../../../shared/hooks/use-on-init';
import { Loader } from '../../../ui/components/loader/loader';

export function DevicesScreen() {
  const { getUserDevices, loadingRequest } = useDeviceApi();
  const { devices } = useDeviceStorage();
  const { webSocket, connect } = useWebSocket();

  function onSwitchTurn(payload: TurnSwitchDevice) {
    webSocket?.emit(DEVICE_SWITCH_CHANNEL, payload);
  }

  function onLightTurn(payload: TurnLightDevice) {
    webSocket?.emit(DEVICE_LIGHT_CHANNEL, payload);
  }

  useOnInit(() => {
    getUserDevices();
  });

  return (
    <MainLayout>
      <div className={styles['container']}>
        <div className={styles['top-content']}>
          <div className={styles['title']}>Devices</div>
          <div className={styles['text']}>
            Add, edit, turn on or off your devices here
          </div>
        </div>
        <div className={styles['content']}>
          {loadingRequest && <Loader />}
          {!loadingRequest && (
            <>
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
            </>
          )}
        </div>
      </div>
    </MainLayout>
  );
}
