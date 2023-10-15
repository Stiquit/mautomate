import styles from './loader.module.scss';
import cn from 'classnames';
import { CircularProgress } from '@mui/material';

export function Loader(props: { dialog?: boolean }) {
  const { dialog = false } = props;
  return (
    <div
      className={cn(styles['loader'], {
        [styles['dialog']]: dialog,
      })}
    >
      <CircularProgress color="inherit" />
    </div>
  );
}
