import { useDeviceStorage } from '../../../devices/hooks/use-device-storage';
import { Loader } from '../../../ui/components/loader/loader';
import { useOnInit } from '../../../shared/hooks/use-on-init';
import { useUserApi } from '../../../shared/hooks/use-user-api';
import styles from './home-screen.module.scss';

export function HomeScreen() {
  const { getUserProfile, loadingRequest } = useUserApi();
  const { devices } = useDeviceStorage();

  useOnInit(() => {
    getUserProfile();
  });

  if (loadingRequest) {
    return <Loader />;
  }
  return (
    <div className={styles['container']}>
      <h1>Welcome to HomeScreen!</h1>
    </div>
  );
}
