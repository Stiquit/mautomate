import styles from './color-picker-dialog.module.scss';
import {
  BaseDialogProps,
  Dialog,
  DialogCloseIcon,
} from '../../../ui/components/dialog/dialog';
import { RgbaColor, RgbaColorPicker } from 'react-colorful';
import { Button } from '../../../ui/components/button/button';
import { rgbaColorToString } from '../../utilities/color-parser';

export interface ColorPickerDialogProps extends BaseDialogProps {
  color: RgbaColor;
  onChange: (color: RgbaColor) => void;
}

export function ColorPickerDialog(props: ColorPickerDialogProps) {
  const { isOpen, close, onChange, color } = props;
  return (
    <Dialog isOpen={isOpen} close={close}>
      <DialogCloseIcon onClose={close} />
      <div className={styles['container']}>
        <RgbaColorPicker onChange={onChange} color={color} />
        <Button onClick={close} color={rgbaColorToString(color)}>
          Pick
        </Button>
      </div>
    </Dialog>
  );
}
