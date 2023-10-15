import { GridLayout } from '../../../shared/components/grid-layout/grid-layout';
import { MainLayout } from '../../../shared/components/main-layout/main-layout';
import { Button } from '../../../ui/components/button/button';
import styles from './routines-screen.module.scss';

export function RoutinesScreen() {
  return (
    <MainLayout>
      <div className={styles['container']}>
        <div className={styles['top-content']}>
          <div className={styles['title']}>Groups</div>
          <div className={styles['top-container']}>
            <div className={styles['text']}>
              Add, edit, and delete your routines here
            </div>
            <div className={styles['add-btn']}>
              <Button>Add</Button>
            </div>
          </div>
        </div>
        <GridLayout>{}</GridLayout>
      </div>
    </MainLayout>
  );
}
