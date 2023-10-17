import styles from './routine-card.module.scss';
import { IRoutine } from '@mautomate/api-interfaces';
import { Button } from '../../../ui/components/button/button';
import { Card } from '../../../ui/components/card/card';
import { FaPen, FaTrashCan } from 'react-icons/fa6';
import construe from 'cronstrue';
import { RoutineActionContainer } from '../routine-action-container/routine-action-container';
import { useDialog } from '../../../ui/hook/use-dialog';
import { DeleteRoutineDialog } from '../delete-routine/delete-routine';

export interface RoutineCardProps {
  routine: IRoutine;
  displayActions?: boolean;
}

export function RoutineCard(props: RoutineCardProps) {
  const { routine, displayActions = true } = props;
  const { actions, name, recurrence, _id } = routine;
  const {
    isOpen: isOpenDeleteGroup,
    close: closeDeleteGroup,
    open: openDeleteGroup,
  } = useDialog();
  return (
    <Card>
      <div className={styles['container']}>
        <div className={styles['name']}>{name}</div>
        <div className={styles['recurrence']}>
          {construe.toString(recurrence)}
        </div>
        <div className={styles['routine-actions']}>
          {[...actions, ...actions].map((action, i) => (
            <div
              className={styles['action']}
              key={`routine-${_id}-action-${i}`}
            >
              <RoutineActionContainer action={action} />
            </div>
          ))}
        </div>

        {displayActions && (
          <>
            <div className={styles['buttons']}>
              <Button>Initiate</Button>
            </div>
            <div className={styles['actions']}>
              <div className={styles['action']}>
                <FaTrashCan onClick={openDeleteGroup} />
              </div>
              <div className={styles['action']}>
                <FaPen />
              </div>
            </div>
          </>
        )}
      </div>
      <DeleteRoutineDialog
        close={closeDeleteGroup}
        routine={routine}
        isOpen={isOpenDeleteGroup}
      />
    </Card>
  );
}
