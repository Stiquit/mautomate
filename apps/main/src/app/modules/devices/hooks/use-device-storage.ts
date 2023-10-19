import { DeviceState, DeviceType, IDevice } from '@mautomate/api-interfaces';
import { atom, useAtom } from 'jotai';
import { useCallback, useMemo } from 'react';

const devicesAtom = atom<IDevice[]>([]);
const mostUsedDevicesAtom = atom<IDevice[]>([]);
export function useDeviceStorage() {
  const [devices, setDevices] = useAtom(devicesAtom);
  const [mostUsedDevices, setMostUsedDevices] = useAtom(mostUsedDevicesAtom);

  const lightDevices = useMemo(
    () => devices.filter((device) => device.type === DeviceType.Light),
    [devices]
  );

  const switchDevices = useMemo(
    () => devices.filter((device) => device.type !== DeviceType.Light),
    [devices]
  );

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

  function updateDevice(newDevice: IDevice) {
    setDevices((previousDevices) =>
      previousDevices.map((device) =>
        String(device._id) === String(newDevice._id) ? newDevice : device
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

  function getDevice(deviceId: string) {
    return devices.find((device) => String(device._id) === deviceId);
  }

  function getDevices(ids: string[]) {
    return devices.filter((device) => ids.includes(String(device._id)));
  }

  return {
    devices,
    lightDevices,
    switchDevices,
    mostUsedDevices,
    setMostUsedDevices,
    setDevices,
    setLoadingDevice: useCallback(setLoadingDevice, [setDevices]),
    checkForDeviceInteraction: useCallback(checkForDeviceInteraction, [
      setDevices,
    ]),
    removeDevice: useCallback(removeDevice, [setDevices]),
    getDevice: useCallback(getDevice, [devices]),
    updateDevice: useCallback(updateDevice, [setDevices]),
    getDevices: useCallback(getDevices, [devices]),
  };
}
