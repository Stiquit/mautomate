import { Loader } from '../../../ui/components/loader/loader';
import styles from './grid-layout.module.scss';
import cn from 'classnames';

export interface GridLayoutProps {
  children: React.ReactNode;
  size?: 'regular' | 'small' | 'big';
  loading?: boolean;
}
export function GridLayout(props: GridLayoutProps) {
  const { children, size = 'regular', loading = false } = props;
  return (
    <div
      className={cn(styles['container'], styles[size], {
        [styles['loading']]: loading,
      })}
    >
      {loading && <Loader />}
      {!loading && children}
    </div>
  );
}
