import {
  DEVICE_RESPONSE_CHANNEL,
  DeviceMQTTResponse,
  DeviceState,
} from '@mautomate/api-interfaces';
import { socket } from '../../../../socket';
import { atom, useAtom } from 'jotai';
import { useEffect } from 'react';
import { Socket } from 'socket.io-client';
import { useUserStorage } from './use-user-storage';
import { useDeviceStorage } from '../../devices/hooks/use-device-storage';

const webSocketAtom = atom<Socket | undefined>(undefined);

export function useWebSocket() {
  const [webSocket, setWebSocket] = useAtom(webSocketAtom);
  const { id } = useUserStorage();
  const { setDevices } = useDeviceStorage();

  function connect() {
    socket.connect();
  }

  useEffect(() => {
    function onSocketConnect() {
      setWebSocket(socket);
    }
    function onSocketDisconnect(args: any) {
      setWebSocket(undefined);
      socket.disconnect();
    }

    function onDeviceResponse(data: DeviceMQTTResponse) {
      const { deviceId, state } = data;
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
    socket.on('connect', onSocketConnect);
    socket.on('disconnect', onSocketDisconnect);
    socket.on(DEVICE_RESPONSE_CHANNEL, onDeviceResponse);
    return () => {
      socket.off('connect', onSocketConnect);
      socket.off('disconnect', onSocketDisconnect);
      socket.off(DEVICE_RESPONSE_CHANNEL, onDeviceResponse);
    };
  }, [id, setDevices, setWebSocket]);

  useEffect(() => {
    if (!socket.connected) {
      socket.connect();
    }
    return () => {
      socket.disconnect();
    };
  }, []);

  return {
    webSocket,
    connect,
  };
}
