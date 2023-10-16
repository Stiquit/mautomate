import { IGroup } from '@mautomate/api-interfaces';
import {
  BaseDialogProps,
  Dialog,
  DialogActions,
  DialogCloseIcon,
  DialogContent,
  DialogTitle,
} from '../../../ui/components/dialog/dialog';
import styles from './delete-group-dialog.module.scss';
import { GroupCard } from '../group-card/group-card';
import { Button } from '../../../ui/components/button/button';
import { useGroupApi } from '../../hooks/use-group-api';

export interface DeleteGroupDialogProps extends BaseDialogProps {
  group: IGroup;
}

export function DeleteGroupDialog(props: DeleteGroupDialogProps) {
  const { group, isOpen, close } = props;
  const { deleteGroup } = useGroupApi();
  function onDeleteHandler() {
    deleteGroup(String(group._id));
    close();
  }

  return (
    <Dialog isOpen={isOpen} close={close}>
      <DialogCloseIcon onClose={close} />
      <DialogTitle>
        Delete <span className={styles['name']}>{group.name}</span> ?
      </DialogTitle>
      <DialogContent>
        <div className={styles['container']}>
          <div className={styles['hint']}>
            Please confirm that you want to delete this group from your
            SmartHome
          </div>
        </div>
        <div className={styles['group']}>
          <GroupCard group={group} actionsEnabled={false} />
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
