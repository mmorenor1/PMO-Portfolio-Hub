import Card from './Card';
import styles from './StatusBadge.module.css';
import { ProjectStatus, RiskLevel } from '@models';

interface StatusBadgeProps {
  status: ProjectStatus | RiskLevel;
  type?: 'status' | 'risk';
}

export default function StatusBadge({ status, type = 'status' }: StatusBadgeProps) {
  const getStatusColor = (s: ProjectStatus | RiskLevel, t: string) => {
    if (t === 'status') {
      switch (s) {
        case 'green':
          return styles.green;
        case 'amber':
          return styles.amber;
        case 'red':
          return styles.red;
      }
    } else {
      switch (s) {
        case 'Low':
          return styles.low;
        case 'Medium':
          return styles.medium;
        case 'High':
          return styles.high;
      }
    }
  };

  return <span className={`${styles.badge} ${getStatusColor(status, type)}`}>{status}</span>;
}
