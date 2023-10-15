import { atom, useAtom } from 'jotai';
import { useDeviceStorage } from './use-device-storage';
import { useAccessToken } from '../../auth/hooks/use-access-token';
import axios from 'axios';
import { IDevice } from '@mautomate/api-interfaces';
import { useRequestError } from '../../error-handler/hooks/use-request-error';
import { useCallback } from 'react';

const loadingRequestAtom = atom(false);

export function useDeviceApi() {
  const { getToken } = useAccessToken();
  const { setDevices, removeDevice } = useDeviceStorage();
  const [loadingRequest, setLoadingRequest] = useAtom(loadingRequestAtom);
  const { handleError } = useRequestError();

  const getUserDevices = async () => {
    setLoadingRequest(true);
    try {
      const response = await axios.get<IDevice[]>('api/device/user', {
        headers: {
          Authorization: `Bearer ${getToken()}`,
        },
      });
      const devices = response.data;
      setDevices(devices);
    } catch (err) {
      handleError(err);
      console.error(err);
    } finally {
      setLoadingRequest(false);
    }
  };

  const deleteDevice = async (id: string) => {
    setLoadingRequest(true);
    try {
      const response = await axios.delete<IDevice>(`api/device/${id}`, {
        headers: {
          Authorization: `Bearer ${getToken()}`,
        },
      });
      const device = response.data;
      removeDevice(String(device._id));
    } catch (err) {
      handleError(err);
      console.error(err);
    } finally {
      setLoadingRequest(false);
    }
  };

  return {
    getUserDevices: useCallback(getUserDevices, [
      getToken,
      handleError,
      setDevices,
      setLoadingRequest,
    ]),
    deleteDevice: useCallback(deleteDevice, [
      getToken,
      handleError,
      removeDevice,
      setLoadingRequest,
    ]),
    loadingRequest,
  };
}
