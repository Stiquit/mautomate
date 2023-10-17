import { GridLayout } from '../../../shared/components/grid-layout/grid-layout';
import { MainLayout } from '../../../shared/components/main-layout/main-layout';
import { useOnInit } from '../../../shared/hooks/use-on-init';
import { Button } from '../../../ui/components/button/button';
import { useRoutineApi } from '../../hooks/use-routine-api';
import { useRoutineStorage } from '../../hooks/use-routine-storage';
import { RoutineCard } from '../routine-card/routine-card';
import styles from './routines-screen.module.scss';

export function RoutinesScreen() {
  const { loadingRequest, getUserRoutines } = useRoutineApi();
  const { routines } = useRoutineStorage();

  useOnInit(() => {
    getUserRoutines();
  });

  return (
    <MainLayout>
      <div className={styles['container']}>
        <div className={styles['top-content']}>
          <div className={styles['title']}>Routines</div>
          <div className={styles['top-container']}>
            <div className={styles['text']}>
              Add, edit, and delete your routines here
            </div>
            <div className={styles['add-btn']}>
              <Button>Add</Button>
            </div>
          </div>
        </div>
        <GridLayout loading={loadingRequest} size="big">
          {routines.map((routine) => (
            <RoutineCard routine={routine} key={`routine-${routine._id}`} />
          ))}
        </GridLayout>
      </div>
    </MainLayout>
  );
}
