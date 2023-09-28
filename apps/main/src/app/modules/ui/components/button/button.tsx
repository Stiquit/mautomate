import styles from './button.module.scss';

import cn from 'classnames';
export interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: 'primary' | 'secondary';
  type?: 'button' | 'submit';
}

export function Button(props: ButtonProps) {
  const { onClick, children, variant = 'primary', type = 'button' } = props;
  return (
    <button
      className={cn(styles['button'], styles[variant])}
      onClick={onClick}
      type={type}
    >
      {children}
    </button>
  );
}
