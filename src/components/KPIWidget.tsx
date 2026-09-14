import styles from './KPIWidget.module.css';
import Card from './Card';

interface KPIWidgetProps {
  label: string;
  value: string | number;
  icon?: React.ReactNode;
  trend?: 'up' | 'down' | 'neutral';
  trendValue?: string;
}

export default function KPIWidget({ label, value, icon, trend, trendValue }: KPIWidgetProps) {
  return (
    <Card className={styles.kpiWidget}>
      <div className={styles.header}>
        {icon && <div className={styles.icon}>{icon}</div>}
        <div>
          <p className={styles.label}>{label}</p>
          <h3 className={styles.value}>{value}</h3>
        </div>
      </div>
      {trend && trendValue && (
        <div className={`${styles.trend} ${styles[trend]}`}>
          {trend === 'up' ? '↑' : trend === 'down' ? '↓' : '→'} {trendValue}
        </div>
      )}
    </Card>
  );
}
