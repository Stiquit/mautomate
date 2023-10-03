import { IDevice } from '@mautomate/api-interfaces';
import { atom, useAtom } from 'jotai';

const devicesAtom = atom<IDevice[]>([]);
export function useDeviceStorage() {
  const [devices, setDevices] = useAtom(devicesAtom);

  return {
    devices,
    setDevices,
  };
}
