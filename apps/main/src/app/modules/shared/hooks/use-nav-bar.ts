import { atom, useAtom } from 'jotai';

const collapsedAtom = atom(true);
export function useNavBar() {
  const [collapsed, setCollapsed] = useAtom(collapsedAtom);

  return {
    collapsed,
    setCollapsed,
  };
}
