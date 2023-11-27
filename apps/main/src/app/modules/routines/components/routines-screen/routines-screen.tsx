import { useRouter } from '../../../routing/hooks/use-router';
import { EmptyScreen } from '../../../shared/components/empty-screen/empty-screen';
import { GridLayout } from '../../../shared/components/grid-layout/grid-layout';
import { MainLayout } from '../../../shared/components/main-layout/main-layout';
import { useOnInit } from '../../../shared/hooks/use-on-init';
import { useWebSocket } from '../../../shared/hooks/use-web-socket';
import { Button } from '../../../ui/components/button/button';
import { useRoutineApi } from '../../hooks/use-routine-api';
import { useRoutineStorage } from '../../hooks/use-routine-storage';
import { RoutineCard } from '../routine-card/routine-card';
import styles from './routines-screen.module.scss';

export function RoutinesScreen() {
  const { loadingRequest, getUserRoutines } = useRoutineApi();
  const { routines } = useRoutineStorage();
  const { goToAddRoutine } = useRouter();
  const { onRoutineActivate } = useWebSocket();

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
              <Button onClick={goToAddRoutine}>Add</Button>
            </div>
          </div>
        </div>
        <GridLayout loading={loadingRequest} size="big">
          {routines.length > 0 &&
            routines.map((routine) => (
              <RoutineCard
                routine={routine}
                key={`routine-${routine._id}`}
                onRoutineActivate={onRoutineActivate}
              />
            ))}
          {routines.length === 0 && (
            <EmptyScreen message="You have no routines, try creating one" />
          )}
        </GridLayout>
      </div>
    </MainLayout>
  );
}
