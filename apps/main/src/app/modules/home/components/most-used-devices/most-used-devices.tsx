import styles from './most-used-devices.module.scss';
import cn from 'classnames';
import { DeviceState } from '@mautomate/api-interfaces';
import { useDeviceStorage } from '../../../devices/hooks/use-device-storage';
import { useActionApi } from '../../../shared/hooks/use-action-api';
import { useOnInit } from '../../../shared/hooks/use-on-init';
import { DeviceTypeToIcon } from '../../../shared/utilities/device-type-parser';
import { Loader } from '../../../ui/components/loader/loader';
import { Button } from '../../../ui/components/button/button';
import { useRouter } from '../../../routing/hooks/use-router';

export function MostUsedDevices() {
  const { getMostUsedDevices, loadingRequest } = useActionApi();
  const { mostUsedDevices } = useDeviceStorage();
  const { goToDevices } = useRouter();
  useOnInit(() => {
    getMostUsedDevices();
  });

  if (loadingRequest) {
    return <Loader />;
  }

  return (
    <div className={styles['container']}>
      <div className={styles['title']}>Frequently used devices:</div>
      <div className={styles['devices']}>
        {mostUsedDevices.map(({ name, state, type, _id }) => (
          <div className={styles['device']} key={`most-used-${_id}`}>
            <div className={styles['name']}>{name}</div>
            <div
              className={cn(styles['icon'], {
                [styles['off']]: state === DeviceState.Off,
              })}
            >
              {DeviceTypeToIcon[type]}
            </div>
          </div>
        ))}
      </div>
      <div className={styles['btn']}>
        <Button onClick={goToDevices}>go to devices</Button>
      </div>
    </div>
  );
}
