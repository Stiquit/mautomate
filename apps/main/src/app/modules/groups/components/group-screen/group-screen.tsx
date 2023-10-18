import styles from './group-screen.module.scss';
import { MainLayout } from '../../../shared/components/main-layout/main-layout';
import { useGroupApi } from '../../hooks/use-group-api';
import { Button } from '../../../ui/components/button/button';
import { useGroupStorage } from '../../hooks/use-group-storage';
import { GroupCard } from '../group-card/group-card';
import { GridLayout } from '../../../shared/components/grid-layout/grid-layout';
import { useOnInit } from '../../../shared/hooks/use-on-init';
import { GroupForm } from '../group-form/group-form';
import { useFormDialog } from '../../../ui/hook/use-form-dialog';
import { EmptyScreen } from '../../../shared/components/empty-screen/empty-screen';

export function GroupScreen() {
  const { loadingRequest, getUserGroups } = useGroupApi();
  const { groups } = useGroupStorage();
  const { closeForm, isOpenForm, openCreateForm, formType } = useFormDialog();

  useOnInit(() => {
    getUserGroups();
  });

  return (
    <MainLayout>
      <div className={styles['container']}>
        <div className={styles['top-content']}>
          <div className={styles['title']}>Groups</div>
          <div className={styles['top-container']}>
            <div className={styles['text']}>
              Add, edit, and delete your groups here
            </div>
            <div className={styles['add-btn']}>
              <Button onClick={openCreateForm}>Add</Button>
            </div>
          </div>
        </div>
        <GridLayout loading={loadingRequest}>
          {groups.length > 0 &&
            groups.map((group) => (
              <GroupCard group={group} key={`group-${group._id}`} />
            ))}
          {groups.length === 0 && (
            <EmptyScreen message="You have no groups, try creating one" />
          )}
        </GridLayout>
      </div>
      <GroupForm close={closeForm} isOpen={isOpenForm} type={formType} />
    </MainLayout>
  );
}
