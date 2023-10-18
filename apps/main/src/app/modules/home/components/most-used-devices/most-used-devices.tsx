import styles from './most-used-devices.module.scss';
import { useDeviceStorage } from '../../../devices/hooks/use-device-storage';
import { useActionApi } from '../../../shared/hooks/use-action-api';
import { useOnInit } from '../../../shared/hooks/use-on-init';
import { Loader } from '../../../ui/components/loader/loader';
import { Button } from '../../../ui/components/button/button';
import { useRouter } from '../../../routing/hooks/use-router';
import { DeviceContainer } from '../../../devices/components/device-container/device-container';
import { EmptyScreen } from '../../../shared/components/empty-screen/empty-screen';

export function MostUsedDevices() {
  const { getMostUsedDevices, loadingRequest } = useActionApi();
  const { mostUsedDevices } = useDeviceStorage();
  const { goToDevices } = useRouter();
  useOnInit(() => {
    getMostUsedDevices();
  });

  if (loadingRequest) {
    return (
      <div className={styles['loader']}>
        <Loader />
      </div>
    );
  }

  return (
    <div className={styles['container']}>
      <div className={styles['title']}>Frequently used devices</div>
      <div className={styles['devices']}>
        {mostUsedDevices.length > 0 &&
          mostUsedDevices.map((device) => (
            <DeviceContainer device={device} key={`most-used-${device._id}`} />
          ))}
        {mostUsedDevices.length === 0 && (
          <EmptyScreen message="You have not used any devices yet" />
        )}
      </div>
      <div className={styles['btn']}>
        <Button onClick={goToDevices}>devices</Button>
      </div>
    </div>
  );
}
