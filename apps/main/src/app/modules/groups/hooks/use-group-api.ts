import { CreateGroupDto, IGroup } from '@mautomate/api-interfaces';
import { useAccessToken } from '../../auth/hooks/use-access-token';
import axios from 'axios';
import { atom, useAtom } from 'jotai';
import { useRequestError } from '../../error-handler/hooks/use-request-error';
import { useGroupStorage } from './use-group-storage';
import { useCallback } from 'react';

const loadingRequestAtom = atom(false);
export function useGroupApi() {
  const { getToken } = useAccessToken();
  const { setGroups, removeGroup, updateGroup } = useGroupStorage();
  const [loadingRequest, setLoadingRequest] = useAtom(loadingRequestAtom);
  const { handleError } = useRequestError();

  const getUserGroups = useCallback(async () => {
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
  }, [getToken, handleError, setGroups, setLoadingRequest]);

  const createGroup = async (data: CreateGroupDto) => {
    setLoadingRequest(true);
    try {
      const response = await axios.post<IGroup[]>('api/group', data, {
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
      getUserGroups();
    }
  };

  const deleteGroup = async (id: string) => {
    setLoadingRequest(true);
    try {
      const response = await axios.delete<IGroup>(`api/group/${id}`, {
        headers: {
          Authorization: `Bearer ${getToken()}`,
        },
      });
      const deletedGroup = response.data;
      removeGroup(deletedGroup);
    } catch (err) {
      handleError(err);
      console.error(err);
    } finally {
      setLoadingRequest(false);
      getUserGroups();
    }
  };

  const updateGroupInformation = async (id: string, data: CreateGroupDto) => {
    setLoadingRequest(true);
    try {
      const response = await axios.put<IGroup>(`api/group/${id}`, data, {
        headers: {
          Authorization: `Bearer ${getToken()}`,
        },
      });
      const updatedGroup = response.data;
      updateGroup(updatedGroup);
    } catch (err) {
      handleError(err);
      console.error(err);
    } finally {
      setLoadingRequest(false);
      getUserGroups();
    }
  };

  return {
    getUserGroups,
    updateGroupInformation: useCallback(updateGroupInformation, [
      getToken,
      getUserGroups,
      handleError,
      setLoadingRequest,
      updateGroup,
    ]),
    deleteGroup: useCallback(deleteGroup, [
      getToken,
      getUserGroups,
      handleError,
      removeGroup,
      setLoadingRequest,
    ]),
    createGroup: useCallback(createGroup, [
      getToken,
      getUserGroups,
      handleError,
      setGroups,
      setLoadingRequest,
    ]),
    loadingRequest,
  };
}
