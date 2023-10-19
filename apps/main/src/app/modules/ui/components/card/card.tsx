import styles from './card.module.scss';
import cn from 'classnames';
export interface CardProps {
  children: React.ReactNode;
  color?: 'primary' | 'secondary';
}

export function Card(props: CardProps) {
  const { children, color = 'primary' } = props;
  return (
    <div className={cn(styles['container'], styles[color])}>{children}</div>
  );
}
