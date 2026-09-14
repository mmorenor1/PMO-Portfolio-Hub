import { ReactNode } from 'react';
import styles from './ChartCard.module.css';
import Card from './Card';

interface ChartCardProps {
  title: string;
  children: ReactNode;
}

export default function ChartCard({ title, children }: ChartCardProps) {
  return (
    <Card className={styles.chartCard}>
      <h3 className={styles.title}>{title}</h3>
      <div className={styles.chartContainer}>
        {children}
      </div>
    </Card>
  );
}
