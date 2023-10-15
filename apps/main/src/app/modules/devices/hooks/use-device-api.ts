import { atom, useAtom } from 'jotai';
import { useDeviceStorage } from './use-device-storage';
import { useAccessToken } from '../../auth/hooks/use-access-token';
import axios, { AxiosResponse } from 'axios';
import {
  AddDevicesRequest,
  CreateDeviceDTO,
  IDevice,
} from '@mautomate/api-interfaces';
import { useRequestError } from '../../error-handler/hooks/use-request-error';
import { useCallback } from 'react';

const loadingRequestAtom = atom(false);

export function useDeviceApi() {
  const { getToken } = useAccessToken();
  const { setDevices, removeDevice, updateDevice } = useDeviceStorage();
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

  const postDevice = async (data: CreateDeviceDTO) => {
    setLoadingRequest(true);
    try {
      const response = await axios.post<
        IDevice[],
        AxiosResponse<IDevice[]>,
        AddDevicesRequest
      >(
        'api/device',
        {
          newDevices: [data],
        },
        {
          headers: {
            Authorization: `Bearer ${getToken()}`,
          },
        }
      );
      const devices = response.data;
      setDevices(devices);
    } catch (err) {
      handleError(err);
      console.error(err);
    } finally {
      setLoadingRequest(false);
    }
  };

  const updateDeviceInformation = async (
    deviceId: string,
    data: CreateDeviceDTO
  ) => {
    setLoadingRequest(true);
    try {
      const response = await axios.put<IDevice>(
        `api/device/${deviceId}`,
        data,
        {
          headers: {
            Authorization: `Bearer ${getToken()}`,
          },
        }
      );
      const deviceToUpdate = response.data;
      updateDevice(deviceToUpdate);
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
    postDevice: useCallback(postDevice, [
      getToken,
      handleError,
      setDevices,
      setLoadingRequest,
    ]),
    updateDeviceInformation: useCallback(updateDeviceInformation, [
      getToken,
      handleError,
      setLoadingRequest,
      updateDevice,
    ]),
    setLoadingRequest,
    loadingRequest,
  };
}
