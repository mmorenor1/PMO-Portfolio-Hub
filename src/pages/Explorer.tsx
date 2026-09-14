import { useMemo, useState } from 'react';
import { PageHeader, Card } from '@components';
import { mockPMs, mockProjects } from '@data';
import styles from './Explorer.module.css';
import { Search } from 'lucide-react';

export default function Explorer() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedUDN, setSelectedUDN] = useState('');
  const [groupBy, setGroupBy] = useState<'pais' | 'udn'>('pais');

  const udns = useMemo(() => ['', ...new Set(mockProjects.map(p => p.udn))], []);

  const filteredPMs = useMemo(() => {
    return mockPMs.filter(pm => {
      const matchesSearch = pm.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           pm.email.toLowerCase().includes(searchTerm.toLowerCase());
      return matchesSearch;
    });
  }, [searchTerm]);

  const filteredProjects = useMemo(() => {
    let result = [...mockProjects];
    if (selectedUDN) result = result.filter(p => p.udn === selectedUDN);
    if (searchTerm) result = result.filter(p => p.nombre.toLowerCase().includes(searchTerm.toLowerCase()));
    return result;
  }, [searchTerm, selectedUDN]);

  const groupedData = useMemo(() => {
    const grouped: Record<string, typeof filteredPMs> = {};
    filteredPMs.forEach(pm => {
      const key = pm[groupBy];
      if (!grouped[key]) grouped[key] = [];
      grouped[key].push(pm);
    });
    return grouped;
  }, [filteredPMs, groupBy]);

  return (
    <div className={styles.explorer}>
      <PageHeader
        title="Explorador PMO"
        subtitle="Búsqueda y exploración avanzada de PMs, proyectos y recursos"
      />

      <Card className={styles.searchCard}>
        <div className={styles.searchContainer}>
          <Search size={20} className={styles.searchIcon} />
          <input
            type="text"
            placeholder="Buscar por nombre, email o proyecto..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className={styles.searchInput}
          />
        </div>

        <div className={styles.filters}>
          <div className={styles.filterGroup}>
            <label>UDN:</label>
            <select value={selectedUDN} onChange={(e) => setSelectedUDN(e.target.value)}>
              <option value="">Todas</option>
              {udns.slice(1).map(u => (
                <option key={u} value={u}>{u}</option>
              ))}
            </select>
          </div>
          <div className={styles.filterGroup}>
            <label>Agrupar por:</label>
            <select value={groupBy} onChange={(e) => setGroupBy(e.target.value as 'pais' | 'udn')}>
              <option value="pais">País</option>
              <option value="udn">UDN</option>
            </select>
          </div>
        </div>
      </Card>

      <div className={styles.content}>
        <div className={styles.pmsSection}>
          <h2>Project Managers ({filteredPMs.length})</h2>
          <div className={styles.groupedContainer}>
            {Object.entries(groupedData).map(([group, pms]) => (
              <Card key={group} className={styles.groupCard}>
                <h3 className={styles.groupTitle}>{group}</h3>
                <div className={styles.pmList}>
                  {pms.map(pm => (
                    <div key={pm.id} className={styles.pmListItem}>
                      <div className={styles.pmName}>{pm.nombre}</div>
                      <div className={styles.pmMeta}>
                        <span className={styles.badge}>{pm.id}</span>
                        <span className={styles.email}>{pm.email}</span>
                      </div>
                      <div className={styles.pmStats}>
                        <span>{pm.proyectos.length} proyectos</span>
                        <span className={Math.min(pm.capacidadAsignada, pm.capacidadTotal) > 100 ? styles.overallocated : ''}>
                          {Math.round((Math.min(pm.capacidadAsignada, pm.capacidadTotal) / pm.capacidadTotal) * 100)}% utilizado
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            ))}
          </div>
        </div>

        <div className={styles.projectsSection}>
          <h2>Proyectos ({filteredProjects.length})</h2>
          <div className={styles.projectsGrid}>
            {filteredProjects.map(project => (
              <Card key={project.id} className={styles.projectCard}>
                <div className={styles.projectHeader}>
                  <h4>{project.nombre}</h4>
                  <span className={`${styles.statusBadge} ${styles[project.estado]}`}>
                    {project.estado}
                  </span>
                </div>
                <div className={styles.projectMeta}>
                  <div>
                    <label>ID:</label>
                    <span>{project.id}</span>
                  </div>
                  <div>
                    <label>PM:</label>
                    <span>{project.pm}</span>
                  </div>
                  <div>
                    <label>UDN:</label>
                    <span>{project.udn}</span>
                  </div>
                  <div>
                    <label>País:</label>
                    <span>{project.pais}</span>
                  </div>
                </div>
                <div className={styles.projectProgress}>
                  <div className={styles.progressLabel}>Avance</div>
                  <div className={styles.progressBar}>
                    <div
                      className={styles.progressFill}
                      style={{ width: `${project.avance}%` }}
                    />
                  </div>
                  <span>{project.avance}%</span>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
