import styles from './card.module.scss';

export interface CardProps {
  children: React.ReactNode;
}

export function Card(props: CardProps) {
  const { children } = props;
  return <div className={styles['container']}>{children}</div>;
}

