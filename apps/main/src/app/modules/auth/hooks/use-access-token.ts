import { atom, useAtom } from 'jotai';
import { useCallback } from 'react';

const accessTokenAtom = atom('');
const ACCESS_TOKEN_KEY = 'ACCESS_TOKEN';
export function useAccessToken() {
  const [accessToken, setAccessToken] = useAtom(accessTokenAtom);

  const saveToken = (token: string) => {
    localStorage.setItem(ACCESS_TOKEN_KEY, token);
    setAccessToken(token);
  };

  const getToken = () => {
    const tokenFromStorage = localStorage.getItem(ACCESS_TOKEN_KEY);
    if (tokenFromStorage) {
      return tokenFromStorage;
    }
    return accessToken;
  };

  const removeToken = () => {
    localStorage.removeItem(ACCESS_TOKEN_KEY);
    setAccessToken('');
  };

  return {
    getToken: useCallback(getToken, [accessToken]),
    saveToken: useCallback(saveToken, [setAccessToken]),
    removeToken: useCallback(removeToken, [setAccessToken]),
  };
}
