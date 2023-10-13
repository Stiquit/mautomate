import axios from 'axios';
import { useAccessToken } from '../../auth/hooks/use-access-token';
import { useRequestError } from '../../error-handler/hooks/use-request-error';
import { GetProfileResponse } from '@mautomate/api-interfaces';
import { useCallback } from 'react';
import { useDeviceStorage } from '../../devices/hooks/use-device-storage';
import { atom, useAtom } from 'jotai';
import { useUserStorage } from './use-user-storage';
import { useGroupStorage } from '../../groups/hooks/use-group-storage';

const loadingRequestAtom = atom(false);
const fetchedAtom = atom(false);

export function useUserApi() {
  const { getToken } = useAccessToken();
  const { setDevices } = useDeviceStorage();
  const { setGroups } = useGroupStorage();
  const { handleError, errorMessage: userError } = useRequestError();
  const [loadingRequest, setLoadingRequest] = useAtom(loadingRequestAtom);
  const [fetched, setFetched] = useAtom(fetchedAtom);
  const { updateUser, updateUserIdentification } = useUserStorage();

  const getUserProfile = async () => {
    setLoadingRequest(true);
    try {
      const response = await axios.get<GetProfileResponse>('api/user/profile', {
        headers: {
          Authorization: `Bearer ${getToken()}`,
        },
      });
      const { profile } = response.data;
      const { devices, username, firstName, lastName, groups } = profile;
      setDevices(devices);
      setGroups(groups);
      updateUser(profile);
      updateUserIdentification({
        username,
        firstName,
        lastName,
      });
      setFetched(true);
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
      setFetched,
      setGroups,
      setLoadingRequest,
      updateUser,
      updateUserIdentification,
    ]),
    fetched,
    loadingRequest,
  };
}
