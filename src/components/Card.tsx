import styles from './Card.module.css';
import { ReactNode } from 'react';

interface CardProps {
  children: ReactNode;
  className?: string;
}

export default function Card({ children, className }: CardProps) {
  return (
    <div className={`${styles.card} ${className || ''}`}>
      {children}
    </div>
  );
}
