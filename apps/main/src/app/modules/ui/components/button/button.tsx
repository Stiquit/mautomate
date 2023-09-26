import { Button as MUIButton } from '@mui/material';
import styles from './button.module.scss';

export interface ButtonProps {
  onClick: () => void;
  children: React.ReactNode;
}

export function Button(props: ButtonProps) {
  const { onClick, children } = props;
  return (
    <MUIButton className={styles['button']} onClick={onClick}>
      {children}
    </MUIButton>
  );
}
