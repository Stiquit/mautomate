import { IAction } from '@mautomate/api-interfaces';
import { atom, useAtom } from 'jotai';

const latestActionsAtom = atom<IAction[]>([]);
export function useActionStorage() {
  const [latestActions, setLatestActions] = useAtom(latestActionsAtom);

  return {
    latestActions,
    setLatestActions,
  };
}
