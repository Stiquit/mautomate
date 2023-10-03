import { Loader } from '../../../ui/components/loader/loader';
import { useOnInit } from '../../hooks/use-on-init';
import { useUserApi } from '../../hooks/use-user-api';

export interface MainLayoutProps {
  children: React.ReactNode;
}
export function MainLayout(props: MainLayoutProps) {
  const { children } = props;
  const { fetched, getUserProfile, loadingRequest } = useUserApi();
  useOnInit(() => {
    if (!fetched) {
      getUserProfile();
    }
  });

  if (loadingRequest) {
    return <Loader />;
  }

  return <div>{children}</div>;
}
