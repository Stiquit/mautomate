import { GroupContainer } from '../../../groups/components/group-container/group-container';
import { useGroupApi } from '../../../groups/hooks/use-group-api';
import { useGroupStorage } from '../../../groups/hooks/use-group-storage';
import { EmptyScreen } from '../../../shared/components/empty-screen/empty-screen';
import { useOnInit } from '../../../shared/hooks/use-on-init';
import { Loader } from '../../../ui/components/loader/loader';
import styles from './groups.module.scss';

export function Groups() {
  const { getUserGroups, loadingRequest } = useGroupApi();
  const { groups } = useGroupStorage();

  useOnInit(() => {
    getUserGroups();
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
      <div className={styles['title']}>Your groups</div>
      <div className={styles['groups']}>
        {groups.length > 0 &&
          groups.map((group) => (
            <GroupContainer group={group} key={`group-${group._id}`} />
          ))}
        {groups.length === 0 && <EmptyScreen message="You have no groups" />}
      </div>
    </div>
  );
}
