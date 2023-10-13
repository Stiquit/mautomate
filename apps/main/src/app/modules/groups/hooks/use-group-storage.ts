import { IGroup } from '@mautomate/api-interfaces';
import { atom, useAtom } from 'jotai';

const groupsAtom = atom<IGroup[]>([]);
export function useGroupStorage() {
  const [groups, setGroups] = useAtom(groupsAtom);

  return {
    groups,
    setGroups,
  };
}
