import styles from './routines.module.scss';
import { useRoutineApi } from '../../../routines/hooks/use-routine-api';
import { useRoutineStorage } from '../../../routines/hooks/use-routine-storage';
import { useOnInit } from '../../../shared/hooks/use-on-init';
import { Loader } from '../../../ui/components/loader/loader';
import { useRouter } from '../../../routing/hooks/use-router';
import { Button } from '../../../ui/components/button/button';
import { RoutineCard } from '../../../routines/components/routine-card/routine-card';

export function Routines() {
  const { getUserRoutines, loadingRequest } = useRoutineApi();
  const { routines } = useRoutineStorage();
  const { goToRoutines } = useRouter();
  useOnInit(() => {
    getUserRoutines();
  });

  if (loadingRequest) {
    return (
      <div className={styles['loader']}>
        <Loader />
      </div>
    );
  }

  return (
    <div className={styles['container']}>
      <div className={styles['title']}>Your routines</div>
      <div className={styles['routines']}>
        {routines.slice(0, 3).map((routine) => (
          <div className={styles['routine']} key={String(routine._id)}>
            <RoutineCard routine={routine} displayActions={false} />
          </div>
        ))}
      </div>
      <div className={styles['btn']}>
        <Button onClick={goToRoutines}>routines</Button>
      </div>
    </div>
  );
}
