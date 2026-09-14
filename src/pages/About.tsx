import { PageHeader, Card } from '@components';
import styles from './About.module.css';
import { Info, Users, Target, Zap } from 'lucide-react';

export default function About() {
  return (
    <div className={styles.about}>
      <PageHeader
        title="Acerca del Portal PMO"
        subtitle="Portal de Gestión integral de Portafolio de Proyectos"
      />

      <div className={styles.grid}>
        <Card className={styles.card}>
          <Info size={32} className={styles.icon} />
          <h3>Qué es PMO Portal</h3>
          <p>
            El Portal PMO Hub es una plataforma integral de gestión de portafolio de proyectos diseñada para proporcionar
            visibilidad ejecutiva, control presupuestario y seguimiento de capacidad en tiempo real.
          </p>
        </Card>

        <Card className={styles.card}>
          <Target size={32} className={styles.icon} />
          <h3>Objetivos Principales</h3>
          <p>
            • Proporcionar visibility total del portafolio<br />
            • Facilitar toma de decisiones basada en datos<br />
            • Optimizar gestión de presupuestos<br />
            • Maximizar utilización de recursos
          </p>
        </Card>

        <Card className={styles.card}>
          <Users size={32} className={styles.icon} />
          <h3>Usuarios Objetivo</h3>
          <p>
            • Ejecutivos y Directores de PMO<br />
            • Project Managers<br />
            • Coordinadores de Portafolio<br />
            • Analistas Financieros
          </p>
        </Card>

        <Card className={styles.card}>
          <Zap size={32} className={styles.icon} />
          <h3>Capacidades Principales</h3>
          <p>
            • Dashboard ejecutivo con KPIs<br />
            • Portafolio de proyectos filtrable<br />
            • Análisis presupuestario<br />
            • Gestión de capacidad de PMs
          </p>
        </Card>
      </div>

      <Card className={styles.section}>
        <h2>Módulos Disponibles</h2>
        <div className={styles.modules}>
          <div className={styles.module}>
            <h4>Dashboard Ejecutivo</h4>
            <p>Visualización de KPIs clave, estado del portafolio y gráficos analíticos en tiempo real.</p>
          </div>
          <div className={styles.module}>
            <h4>Portafolio de Proyectos</h4>
            <p>Tabla completa de proyectos con filtrado, búsqueda avanzada y columnas personalizables.</p>
          </div>
          <div className={styles.module}>
            <h4>Presupuesto y Financiero</h4>
            <p>Análisis de presupuestos aprobados, ejecutados y forecast con drill-downs por proyecto.</p>
          </div>
          <div className={styles.module}>
            <h4>Gestión de Capacity</h4>
            <p>Seguimiento de utilización de Project Managers y detección de over-allocation.</p>
          </div>
          <div className={styles.module}>
            <h4>Espacio PM</h4>
            <p>Compartir documentos, actualizaciones de proyectos y colaboración entre equipos.</p>
          </div>
          <div className={styles.module}>
            <h4>Explorador PMO</h4>
            <p>Búsqueda avanzada de PMs y proyectos con filtrado y agrupación flexible.</p>
          </div>
        </div>
      </Card>

      <Card className={styles.section}>
        <h2>Información Técnica</h2>
        <div className={styles.techInfo}>
          <div className={styles.techItem}>
            <strong>Stack Tecnológico</strong>
            <p>React 18 + TypeScript + Vite + Recharts + Lucide Icons</p>
          </div>
          <div className={styles.techItem}>
            <strong>Diseño</strong>
            <p>Tema oscuro profesional con colores corporativos. Totalmente responsive y mobile-friendly.</p>
          </div>
          <div className={styles.techItem}>
            <strong>Datos</strong>
            <p>30+ proyectos mock distribuidos en 5 países, 8 PMs activos con datos financieros simulados.</p>
          </div>
          <div className={styles.techItem}>
            <strong>Versión</strong>
            <p>1.0.0 - Septiembre 2026</p>
          </div>
        </div>
      </Card>

      <Card className={styles.section}>
        <h2>Contacto y Soporte</h2>
        <div className={styles.contact}>
          <p>
            Para consultas, reportar problemas o sugerencias de mejora, contactar al equipo de PMO.
          </p>
          <div className={styles.contactInfo}>
            <div>
              <strong>Email:</strong> pmo@credicorpcapital.com
            </div>
            <div>
              <strong>Equipo PMO:</strong> Juan García, María López, Carlos Rodríguez
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}
