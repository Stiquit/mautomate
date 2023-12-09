import { atom, useAtom } from 'jotai';
import { useRoutineStorage } from './use-routine-storage';
import { useAccessToken } from '../../auth/hooks/use-access-token';
import { useRequestError } from '../../error-handler/hooks/use-request-error';
import { CreateRoutineDto, IRoutine } from '@mautomate/api-interfaces';
import axios from 'axios';
import { useCallback } from 'react';

const loadingRequestAtom = atom(false);
export function useRoutineApi() {
  const { getToken } = useAccessToken();
  const { setRoutines, updateRoutine, removeRoutine } = useRoutineStorage();
  const { handleError } = useRequestError();

  const [loadingRequest, setLoadingRequest] = useAtom(loadingRequestAtom);

  const getUserRoutines = useCallback(async () => {
    setLoadingRequest(true);
    try {
      const response = await axios.get<IRoutine[]>('api/routine/user', {
        headers: {
          Authorization: `Bearer ${getToken()}`,
        },
      });
      const routines = response.data;
      setRoutines(routines);
    } catch (err) {
      handleError(err);
      console.error(err);
    } finally {
      setLoadingRequest(false);
    }
  }, [getToken, handleError, setLoadingRequest, setRoutines]);

  async function createRoutine(data: CreateRoutineDto) {
    setLoadingRequest(true);
    try {
      const response = await axios.post<IRoutine[]>('api/routine', data, {
        headers: {
          Authorization: `Bearer ${getToken()}`,
        },
      });
      const routines = response.data;
      setRoutines(routines);
    } catch (err) {
      handleError(err);
      console.error(err);
    } finally {
      setLoadingRequest(false);
      getUserRoutines();
    }
  }

  async function deleteRoutine(id: string) {
    setLoadingRequest(true);
    try {
      const response = await axios.delete<IRoutine>(`api/routine/${id}`, {
        headers: {
          Authorization: `Bearer ${getToken()}`,
        },
      });
      const deletedRoutine = response.data;
      removeRoutine(deletedRoutine);
    } catch (err) {
      handleError(err);
      console.error(err);
    } finally {
      setLoadingRequest(false);
      getUserRoutines();
    }
  }

  async function updateRoutineInformation(id: string, data: CreateRoutineDto) {
    setLoadingRequest(true);
    try {
      const response = await axios.put<IRoutine>(`api/routine/${id}`, data, {
        headers: {
          Authorization: `Bearer ${getToken()}`,
        },
      });
      const updatedRoutine = response.data;
      updateRoutine(updatedRoutine);
    } catch (err) {
      handleError(err);
      console.error(err);
    } finally {
      setLoadingRequest(false);
      getUserRoutines();
    }
  }

  return {
    getUserRoutines,
    createRoutine: useCallback(createRoutine, [
      getToken,
      getUserRoutines,
      handleError,
      setLoadingRequest,
      setRoutines,
    ]),
    deleteRoutine: useCallback(deleteRoutine, [
      getToken,
      getUserRoutines,
      handleError,
      removeRoutine,
      setLoadingRequest,
    ]),
    updateRoutineInformation: useCallback(updateRoutineInformation, [
      getToken,
      getUserRoutines,
      handleError,
      setLoadingRequest,
      updateRoutine,
    ]),
    loadingRequest,
  };
}
