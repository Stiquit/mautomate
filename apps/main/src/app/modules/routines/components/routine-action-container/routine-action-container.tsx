import styles from './routine-action-container.module.scss';
import { ActionType, RoutineAction } from '@mautomate/api-interfaces';
import {
  HumanizeDurationLanguage,
  HumanizeDuration,
} from 'humanize-duration-ts';
import { useRoutineStorage } from '../../hooks/use-routine-storage';
import { useDeviceStorage } from '../../../devices/hooks/use-device-storage';
import { ActionTypeParser } from '../../../shared/utilities/action-type-parser';
import { DeviceTypeToIcon } from '../../../shared/utilities/device-type-parser';
import { rgbaColorToString } from '../../../shared/utilities/color-parser';
import { FaRegClock } from 'react-icons/fa6';

export interface RoutineActionContainerProps {
  action: RoutineAction;
}

export function RoutineActionContainer(props: RoutineActionContainerProps) {
  const { action } = props;
  const { isDeviceAction, isLightAction } = useRoutineStorage();
  const { getDevice } = useDeviceStorage();

  function getActionContent() {
    if (isDeviceAction(action)) {
      const { deviceId, state } = action;
      const device = getDevice(deviceId);

      if (!device) {
        return <div className={styles['not-found']}>Device not found</div>;
      }
      const { type } = device;
      const deviceActionStyles: Record<string, string> = {};
      if (isLightAction(action)) {
        const { red, green, blue, brightness } = action;
        deviceActionStyles.color = rgbaColorToString({
          r: red,
          g: green,
          b: blue,
          a: brightness,
        });
      }
      return (
        <div className={styles['action']}>
          <div className={styles['type']}>
            {ActionTypeParser[state ? ActionType.TurnOn : ActionType.TurnOff]}
          </div>
          <div
            className={styles['icon']}
            style={state ? deviceActionStyles : undefined}
          >
            {DeviceTypeToIcon[type]}
          </div>
        </div>
      );
    }
    const langService = new HumanizeDurationLanguage();
    const humanizer = new HumanizeDuration(langService);
    const { waitFor } = action;
    return (
      <div className={styles['action']}>
        <div className={styles['type']}>{humanizer.humanize(waitFor)}</div>
        <div className={styles['icon']}>
          <FaRegClock />
        </div>
      </div>
    );
  }

  return getActionContent();
}
