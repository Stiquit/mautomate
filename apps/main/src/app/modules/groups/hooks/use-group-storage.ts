import { IGroup } from '@mautomate/api-interfaces';
import { atom, useAtom } from 'jotai';
import { useCallback } from 'react';

const groupsAtom = atom<IGroup[]>([]);
export function useGroupStorage() {
  const [groups, setGroups] = useAtom(groupsAtom);

  function removeGroup(groupToDelete: IGroup) {
    setGroups((previousGroups) =>
      previousGroups.filter(
        (group) => String(group._id) !== String(groupToDelete._id)
      )
    );
  }

  function updateGroup(group: IGroup) {
    setGroups((previousGroups) =>
      previousGroups.map((previousGroup) =>
        String(previousGroup._id) === String(group._id) ? group : previousGroup
      )
    );
  }

  return {
    groups,
    setGroups,
    removeGroup: useCallback(removeGroup, [setGroups]),
    updateGroup: useCallback(updateGroup, [setGroups]),
  };
}
