import styles from './ProgressBar.module.css';

interface ProgressBarProps {
  value: number;
  max?: number;
  showLabel?: boolean;
}

export default function ProgressBar({ value, max = 100, showLabel = true }: ProgressBarProps) {
  const percentage = (value / max) * 100;
  const getColor = () => {
    if (percentage >= 90) return 'green';
    if (percentage >= 70) return 'amber';
    return 'red';
  };

  return (
    <div className={styles.container}>
      <div className={styles.barContainer}>
        <div
          className={`${styles.bar} ${styles[getColor()]}`}
          style={{ width: `${Math.min(percentage, 100)}%` }}
        />
      </div>
      {showLabel && <span className={styles.label}>{value}%</span>}
    </div>
  );
}
