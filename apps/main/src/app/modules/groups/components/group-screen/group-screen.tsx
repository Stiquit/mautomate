import styles from './group-screen.module.scss';
import { MainLayout } from '../../../shared/components/main-layout/main-layout';
import { useGroupApi } from '../../hooks/use-group-api';
import { Loader } from '../../../ui/components/loader/loader';
import { Button } from '../../../ui/components/button/button';
import { useGroupStorage } from '../../hooks/use-group-storage';
import { GroupCard } from '../group-card/group-card';

export function GroupScreen() {
  const { loadingRequest } = useGroupApi();
  const { groups } = useGroupStorage();

  if (loadingRequest) {
    return (
      <MainLayout>
        <div className={styles['loader']}>
          <Loader />
        </div>
      </MainLayout>
    );
  }

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
              <Button>Add</Button>
            </div>
          </div>
        </div>
        <div className={styles['content']}>
          {groups.map((group) => (
            <GroupCard group={group} key={`group-${group._id}`} />
          ))}
        </div>
      </div>
    </MainLayout>
  );
}
