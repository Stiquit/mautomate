import styles from './routine-card.module.scss';
import { IRoutine } from '@mautomate/api-interfaces';
import { Button } from '../../../ui/components/button/button';
import { Card } from '../../../ui/components/card/card';
import { FaPen, FaTrashCan } from 'react-icons/fa6';
import construe from 'cronstrue';
import { RoutineActionContainer } from '../routine-action-container/routine-action-container';
import { useDialog } from '../../../ui/hook/use-dialog';
import { DeleteRoutineDialog } from '../delete-routine/delete-routine';
import { useRouter } from '../../../routing/hooks/use-router';

export interface RoutineCardProps {
  routine: IRoutine;
  onRoutineActivate?: (id: string) => void;
  displayActions?: boolean;
}

export function RoutineCard(props: RoutineCardProps) {
  const { routine, displayActions = true, onRoutineActivate } = props;
  const { actions, name, recurrence, _id } = routine;
  const {
    isOpen: isOpenDeleteGroup,
    close: closeDeleteGroup,
    open: openDeleteGroup,
  } = useDialog();
  const { goToEditRoutine } = useRouter();
  return (
    <Card>
      <div className={styles['container']}>
        <div className={styles['name']}>{name}</div>
        <div className={styles['recurrence']}>
          {construe.toString(recurrence)}
        </div>
        <div className={styles['routine-actions']}>
          {actions.map((action, i) => (
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
              <Button
                onClick={() => {
                  onRoutineActivate?.(String(_id));
                }}
              >
                Initiate
              </Button>
            </div>
            <div className={styles['actions']}>
              <div className={styles['action']}>
                <FaTrashCan onClick={openDeleteGroup} />
              </div>
              <div className={styles['action']}>
                <FaPen onClick={() => goToEditRoutine(String(_id))} />
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
