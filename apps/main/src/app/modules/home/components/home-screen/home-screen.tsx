import { MainLayout } from '../../../shared/components/main-layout/main-layout';
import { Card } from '../../../ui/components/card/card';
import Ambiences from '../ambiences/ambiences';
import LatestActions from '../latest-actions/latest-actions';
import { MostUsedDevices } from '../most-used-devices/most-used-devices';
import styles from './home-screen.module.scss';

export function HomeScreen() {
  return (
    <MainLayout>
      <div className={styles['container']}>
        <div className={styles['top-content']}>
          <div className={styles['title']}>Welcome to your SmartHome</div>
          <div className={styles['text']}>
            Here you can access your most frequent devices, routines and
            ambiences
          </div>
        </div>
        <div className={styles['main-grid']}>
          <div className={styles['most-used']}>
            <Card>
              <MostUsedDevices />
            </Card>
          </div>
          <div className={styles['ambiences']}>
            <Card>
              <Ambiences />
            </Card>
          </div>
          <div className={styles['routines']}>
            <Card>
              <div>Routines container</div>
            </Card>
          </div>
          <div className={styles['groups']}>
            <Card>
              <div>Groups container</div>
            </Card>
          </div>
          <div className={styles['latest-actions']}>
            <Card>
              <LatestActions />
            </Card>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
