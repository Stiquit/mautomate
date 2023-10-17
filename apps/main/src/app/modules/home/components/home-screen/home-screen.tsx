import { MainLayout } from '../../../shared/components/main-layout/main-layout';
import { Card } from '../../../ui/components/card/card';
import { Groups } from '../groups/groups';
import { LatestActions } from '../latest-actions/latest-actions';
import { MostUsedDevices } from '../most-used-devices/most-used-devices';
import { Routines } from '../routines/routines';
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
          <div className={styles['routines']}>
            <Card>
              <Routines />
            </Card>
          </div>
          <div className={styles['groups']}>
            <Card>
              <Groups />
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
