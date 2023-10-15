import { DeviceType } from '@mautomate/api-interfaces';
import { TbCircuitPushbutton, TbCoffee, TbLamp } from 'react-icons/tb';
import { FaLightbulb, FaTv } from 'react-icons/fa6';
// import { FaTv } from 'react-icons/fa';

export const DeviceTypeToIcon: Record<DeviceType, React.ReactNode> = {
  [DeviceType.Switch]: <TbCircuitPushbutton />,
  [DeviceType.Light]: <FaLightbulb />,
  [DeviceType.CoffeeMachine]: <TbCoffee />,
  [DeviceType.Lamp]: <TbLamp />,
  [DeviceType.Tv]: <FaTv />,
};

export const DeviceTypes = [
  DeviceType.Light,
  DeviceType.Lamp,
  DeviceType.CoffeeMachine,
  DeviceType.Switch,
  DeviceType.Tv,
];
