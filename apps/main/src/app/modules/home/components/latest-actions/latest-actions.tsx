import styles from './latest-actions.module.scss';
import { ActionType } from '@mautomate/api-interfaces';
import { useActionApi } from '../../../shared/hooks/use-action-api';
import { useActionStorage } from '../../../shared/hooks/use-action-storage';
import { Loader } from '../../../ui/components/loader/loader';
import { ActionTypeParser } from '../../../shared/utilities/action-type-parser';
import { DeviceTypeToIcon } from '../../../shared/utilities/device-type-parser';
import { format } from 'date-fns';

export function LatestActions() {
  const { latestActions } = useActionStorage();
  const { loadingRequest } = useActionApi();

  if (loadingRequest) {
    return <Loader />;
  }
  return (
    <div className={styles['container']}>
      <div className={styles['title']}>Latest actions</div>
      <div className={styles['actions']}>
        {latestActions.map(({ date, device, type, _id }) => (
          <div className={styles['action']} key={`action-${_id}`}>
            <div className={styles['type']}>{ActionTypeParser[type]}</div>

            <div className={styles['content']}>
              {type === ActionType.Routine && (
                <div className={styles['routine']}></div>
              )}
              {type !== ActionType.Routine && device && (
                <div className={styles['device']}>
                  <div className={styles['icon']}>
                    {DeviceTypeToIcon[device.type]}
                  </div>
                  <div className={styles['name']}>{device.name}</div>
                </div>
              )}
            </div>
            <div className={styles['date']}>
              {format(new Date(date), 'eee , HH:mm')}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
