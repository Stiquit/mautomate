import { IRoutine } from '@mautomate/api-interfaces';
import {
  BaseDialogProps,
  Dialog,
  DialogActions,
  DialogCloseIcon,
  DialogContent,
  DialogTitle,
} from '../../../ui/components/dialog/dialog';
import styles from './delete-routine.module.scss';
import { useRoutineApi } from '../../hooks/use-routine-api';
import { RoutineCard } from '../routine-card/routine-card';
import { Button } from '../../../ui/components/button/button';

export interface DeleteRoutineDialogProps extends BaseDialogProps {
  routine: IRoutine;
}

export function DeleteRoutineDialog(props: DeleteRoutineDialogProps) {
  const { close, isOpen, routine } = props;
  const { deleteRoutine } = useRoutineApi();
  const { name } = routine;
  function onDeleteHandler() {
    deleteRoutine(String(routine._id));
    close();
  }
  return (
    <Dialog isOpen={isOpen} close={close}>
      <DialogCloseIcon onClose={close} />
      <DialogTitle>
        Delete <span className={styles['name']}>{name}</span> ?
      </DialogTitle>
      <DialogContent>
        <div className={styles['container']}>
          <div className={styles['hint']}>
            Please confirm that you want to delete this routine from your
            SmartHome
          </div>
        </div>
        <div className={styles['group']}>
          <RoutineCard routine={routine} displayActions={false} />
        </div>
      </DialogContent>
      <DialogActions>
        <Button onClick={onDeleteHandler}>Delete</Button>
        <Button variant="secondary" onClick={close}>
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
}
