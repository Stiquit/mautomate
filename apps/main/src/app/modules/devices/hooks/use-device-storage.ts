import { DeviceState, IDevice } from '@mautomate/api-interfaces';
import { atom, useAtom } from 'jotai';
import { useCallback } from 'react';

const devicesAtom = atom<IDevice[]>([]);
const mostUsedDevicesAtom = atom<IDevice[]>([]);
export function useDeviceStorage() {
  const [devices, setDevices] = useAtom(devicesAtom);
  const [mostUsedDevices, setMostUsedDevices] = useAtom(mostUsedDevicesAtom);

  function setLoadingDevice(deviceId: string) {
    setDevices((previousDevices) =>
      previousDevices.map((device) =>
        String(device._id) === deviceId
          ? {
              ...device,
              state: DeviceState.Loading,
            }
          : device
      )
    );
  }

  function checkForDeviceInteraction(deviceId: string, state: number) {
    setDevices((previousDevices) =>
      previousDevices.map((device) => {
        if (String(device._id) === deviceId) {
          return {
            ...device,
            state: state ? DeviceState.On : DeviceState.Off,
          };
        }
        return device;
      })
    );
  }

  function removeDevice(deviceId: string) {
    setDevices((previousDevices) =>
      previousDevices.filter((device) => String(device._id) !== deviceId)
    );
  }

  return {
    devices,
    mostUsedDevices,
    setMostUsedDevices,
    setDevices,
    setLoadingDevice: useCallback(setLoadingDevice, [setDevices]),
    checkForDeviceInteraction: useCallback(checkForDeviceInteraction, [
      setDevices,
    ]),
    removeDevice: useCallback(removeDevice, [setDevices]),
  };
}
