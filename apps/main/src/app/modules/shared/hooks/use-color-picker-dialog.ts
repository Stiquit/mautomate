import { useState } from 'react';
import { useDialog } from '../../ui/hook/use-dialog';
import { RgbaColor } from 'react-colorful';

export function useColorPickerDialog() {
  const { close, isOpen, open } = useDialog();
  const [color, setColor] = useState<RgbaColor>({
    r: 223,
    g: 223,
    b: 223,
    a: 1,
  });

  function handleColorChange(color: RgbaColor) {
    setColor(color);
  }

  return {
    handleColorChange,
    isOpenColorPicker: isOpen,
    openColorPicker: open,
    closeColorPicker: close,
    color,
  };
}
