import axios from 'axios';
import { useAccessToken } from '../../auth/hooks/use-access-token';
import { useRequestError } from '../../error-handler/hooks/use-request-error';
import { GetProfileResponse } from '@mautomate/api-interfaces';
import { useCallback } from 'react';
import { useDeviceStorage } from '../../devices/hooks/use-device-storage';
import { atom, useAtom } from 'jotai';

export interface UserIdentification {
  username: string;
  firstName: string;
  lastName: string;
}

const userIdentificationAtom = atom<UserIdentification | undefined>(undefined);
const loadingRequestAtom = atom(false);

export function useUserApi() {
  const { getToken } = useAccessToken();
  const { setDevices } = useDeviceStorage();
  const { handleError, errorMessage: userError } = useRequestError();
  const [userIdentification, setUserIdentification] = useAtom(
    userIdentificationAtom
  );
  const [loadingRequest, setLoadingRequest] = useAtom(loadingRequestAtom);

  const getUserProfile = async () => {
    setLoadingRequest(true);
    try {
      const response = await axios.get<GetProfileResponse>('api/user/profile', {
        headers: {
          Authorization: `Bearer ${getToken()}`,
        },
      });
      const { profile } = response.data;
      const { devices, username, firstName, lastName } = profile;
      setDevices(devices);
      setUserIdentification({
        username,
        firstName,
        lastName,
      });
    } catch (err) {
      handleError(err);
    } finally {
      setLoadingRequest(false);
    }
  };

  return {
    userError,
    getUserProfile: useCallback(getUserProfile, [
      getToken,
      handleError,
      setDevices,
      setLoadingRequest,
      setUserIdentification,
    ]),
    loadingRequest,
    userIdentification,
  };
}
