import { RgbaColor } from 'react-colorful';

export function rgbaColorToString(color: RgbaColor) {
  return `rgba(${color.r}, ${color.g}, ${color.b}, ${color.a})`;
}
