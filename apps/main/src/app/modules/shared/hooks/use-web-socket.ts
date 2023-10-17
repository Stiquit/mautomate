import {
  DEVICE_LIGHT_CHANNEL,
  DEVICE_RESPONSE_CHANNEL,
  DEVICE_SWITCH_CHANNEL,
  DeviceMQTTResponse,
  ROUTINES_CHANNEL,
  TurnLightDevice,
  TurnSwitchDevice,
} from '@mautomate/api-interfaces';
import { socket } from '../../../../socket';
import { atom, useAtom } from 'jotai';
import { useEffect } from 'react';
import { Socket } from 'socket.io-client';
import { useUserStorage } from '../../user/hooks/use-user-storage';
import { useDeviceStorage } from '../../devices/hooks/use-device-storage';

const webSocketAtom = atom<Socket | undefined>(undefined);

export function useWebSocket() {
  const [webSocket, setWebSocket] = useAtom(webSocketAtom);
  const { id } = useUserStorage();
  const { checkForDeviceInteraction, setLoadingDevice } = useDeviceStorage();

  function connect() {
    socket.connect();
  }

  useEffect(() => {
    function onSocketConnect() {
      setWebSocket(socket);
    }
    function onSocketDisconnect() {
      setWebSocket(undefined);
      socket.disconnect();
    }

    function onDeviceResponse(data: DeviceMQTTResponse) {
      const { deviceId, state } = data;
      checkForDeviceInteraction(deviceId, state);
    }
    socket.on('connect', onSocketConnect);
    socket.on('disconnect', onSocketDisconnect);
    socket.on(DEVICE_RESPONSE_CHANNEL, onDeviceResponse);
    return () => {
      socket.off('connect', onSocketConnect);
      socket.off('disconnect', onSocketDisconnect);
      socket.off(DEVICE_RESPONSE_CHANNEL, onDeviceResponse);
    };
  }, [checkForDeviceInteraction, id, setWebSocket]);

  useEffect(() => {
    if (!socket.connected) {
      socket.connect();
    }
    return () => {
      socket.disconnect();
    };
  }, []);

  function onSwitchTurn(payload: TurnSwitchDevice) {
    onDeviceTurn(payload);
    webSocket?.emit(DEVICE_SWITCH_CHANNEL, payload);
  }

  function onLightTurn(payload: TurnLightDevice) {
    onDeviceTurn(payload);
    webSocket?.emit(DEVICE_LIGHT_CHANNEL, payload);
  }

  function onDeviceTurn(payload: TurnLightDevice | TurnSwitchDevice) {
    const { deviceId } = payload;
    setLoadingDevice(deviceId);
  }

  function onRoutineActivate(routineId: string) {
    webSocket?.emit(ROUTINES_CHANNEL, {
      userId: id,
      routineId,
    });
  }

  return {
    webSocket,
    connect,
    onLightTurn,
    onSwitchTurn,
    onRoutineActivate,
  };
}
