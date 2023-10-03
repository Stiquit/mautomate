import { MainLayout } from '../../../shared/components/main-layout/main-layout';
import { useDeviceStorage } from '../../hooks/use-device-storage';
import { DeviceCard } from '../device-card/device-card';
import styles from './devices-screen.module.scss';

export function DevicesScreen() {
  const { devices } = useDeviceStorage();

  return (
    <MainLayout>
      <div className={styles['container']}>
        {devices.map((device) => (
          <DeviceCard device={device} key={`device-${device._id}`} />
        ))}
      </div>
    </MainLayout>
  );
}
