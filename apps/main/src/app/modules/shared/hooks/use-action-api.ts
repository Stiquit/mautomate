import {
  IAction,
  IDevice,
  NotPopulatedAction,
} from '@mautomate/api-interfaces';
import axios from 'axios';
import { atom, useAtom } from 'jotai';
import { useAccessToken } from '../../auth/hooks/use-access-token';
import { useRouter } from '../../routing/hooks/use-router';
import { useDeviceStorage } from '../../devices/hooks/use-device-storage';
import { useCallback } from 'react';
import { useActionStorage } from './use-action-storage';
import { useUserStorage } from '../../user/hooks/use-user-storage';

const loadingRequestAtom = atom(false);

export function useActionApi() {
  const { getToken } = useAccessToken();
  const { goToLogin } = useRouter();
  const { setMostUsedDevices, devices } = useDeviceStorage();
  const { user } = useUserStorage();
  const { setLatestActions } = useActionStorage();
  const [loadingRequest, setLoadingRequest] = useAtom(loadingRequestAtom);

  const getMostUsedDevices = async () => {
    setLoadingRequest(true);
    try {
      const response = await axios.get<IDevice[]>('api/action/devices', {
        headers: {
          Authorization: `Bearer ${getToken()}`,
        },
      });
      const mostUsedDevices = response.data;
      setMostUsedDevices(mostUsedDevices);
    } catch (err) {
      console.error(err);
      goToLogin();
    } finally {
      setLoadingRequest(false);
    }
  };

  const getLatestActions = async () => {
    setLoadingRequest(true);
    try {
      const response = await axios.get<NotPopulatedAction[]>('api/action', {
        headers: {
          Authorization: `Bearer ${getToken()}`,
        },
      });

      const latestActions: IAction[] = response.data.map((action) => {
        const device = devices.find(
          (device) => String(device._id) === action.device
        );
        if (!device) {
          return {
            ...action,
            device: devices[0],
            user,
          };
        }
        return {
          ...action,
          device,
          user,
        };
      });
      setLatestActions(latestActions);
    } catch (err) {
      console.error(err);
      goToLogin();
    } finally {
      setLoadingRequest(false);
    }
  };

  return {
    getMostUsedDevices: useCallback(getMostUsedDevices, [
      getToken,
      goToLogin,
      setLoadingRequest,
      setMostUsedDevices,
    ]),
    getLatestActions: useCallback(getLatestActions, [
      devices,
      getToken,
      goToLogin,
      setLatestActions,
      setLoadingRequest,
      user,
    ]),
    loadingRequest,
  };
}
