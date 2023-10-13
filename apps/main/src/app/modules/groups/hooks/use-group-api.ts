import { IGroup } from '@mautomate/api-interfaces';
import { useAccessToken } from '../../auth/hooks/use-access-token';
import axios from 'axios';
import { atom, useAtom } from 'jotai';
import { useRequestError } from '../../error-handler/hooks/use-request-error';
import { useGroupStorage } from './use-group-storage';
import { useCallback } from 'react';

const loadingRequestAtom = atom(false);
export function useGroupApi() {
  const { getToken } = useAccessToken();
  const { setGroups } = useGroupStorage();
  const [loadingRequest, setLoadingRequest] = useAtom(loadingRequestAtom);
  const { handleError } = useRequestError();

  const getUserGroups = async () => {
    setLoadingRequest(true);
    try {
      const response = await axios.get<IGroup[]>('api/group/user', {
        headers: {
          Authorization: `Bearer ${getToken()}`,
        },
      });
      const groups = response.data;
      setGroups(groups);
    } catch (err) {
      handleError(err);
      console.error(err);
    } finally {
      setLoadingRequest(false);
    }
  };

  return {
    getUserGroups: useCallback(getUserGroups, [
      getToken,
      handleError,
      setGroups,
      setLoadingRequest,
    ]),
    loadingRequest,
  };
}
