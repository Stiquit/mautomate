import styles from './dialog.module.scss';
import { DialogProps as MuiDialogProps } from '@mui/material';
import MUIDialog from '@mui/material/Dialog';
import MUIDialogTitle from '@mui/material/DialogTitle';
import MUIDialogContent from '@mui/material/DialogContent';
import MUIDialogActions from '@mui/material/DialogActions';
import { FaXmark } from 'react-icons/fa6';

export interface BaseDialogProps {
  isOpen: boolean;
  close: (event?: object, reason?: 'escapeKeyDown' | 'backdropClick') => void;
}

export interface DialogProps
  extends BaseDialogProps,
    Omit<MuiDialogProps, 'open' | 'onClose'> {
  children: React.ReactNode;
}

export function Dialog(props: DialogProps) {
  const { isOpen, close, children, maxWidth = 'md', ...otherProps } = props;

  return (
    <MUIDialog
      className={styles['dialog']}
      open={isOpen}
      onClose={close}
      maxWidth={maxWidth}
      {...otherProps}
    >
      {children}
    </MUIDialog>
  );
}

export interface DialogTitleProps {
  children: React.ReactNode;
}

export function DialogTitle(props: DialogTitleProps) {
  const { children } = props;

  return (
    <MUIDialogTitle className={styles['title']}>{children}</MUIDialogTitle>
  );
}

export interface DialogContentProps {
  children: React.ReactNode;
}

export function DialogContent(props: DialogContentProps) {
  const { children } = props;

  return (
    <MUIDialogContent className={styles['content']}>
      {children}
    </MUIDialogContent>
  );
}

export interface DialogActionsProps {
  children: React.ReactNode;
}

export function DialogActions(props: DialogActionsProps) {
  const { children } = props;

  return (
    <MUIDialogActions className={styles['actions']}>
      {children}
    </MUIDialogActions>
  );
}

export interface DialogCloseIconProps {
  onClose: () => void;
}

export function DialogCloseIcon(props: DialogCloseIconProps) {
  const { onClose } = props;
  return (
    <FaXmark
      onClick={onClose}
      width={14}
      height={14}
      className={styles['close-icon']}
    />
  );
}
