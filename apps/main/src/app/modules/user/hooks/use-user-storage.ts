import { IUser } from '@mautomate/api-interfaces';
import { atom, useAtom } from 'jotai';
import { useCallback } from 'react';

export interface UserIdentification {
  username: string;
  firstName: string;
  lastName: string;
}

const userAtom = atom<IUser>({} as IUser);
const userIdentificationAtom = atom<UserIdentification | undefined>(undefined);

export function useUserStorage() {
  const [user, setUser] = useAtom(userAtom);
  const [userIdentification, setUserIdentification] = useAtom(
    userIdentificationAtom
  );

  function updateUser(user: IUser) {
    setUser(user);
  }

  function updateUserIdentification(identification: UserIdentification) {
    setUserIdentification(identification);
  }

  return {
    user,
    userIdentification,
    updateUser: useCallback(updateUser, [setUser]),
    updateUserIdentification: useCallback(updateUserIdentification, [
      setUserIdentification,
    ]),
    id: String(user._id) || '',
  };
}
