import { useMemo, useState } from 'react';
import { PageHeader, Card, StatusBadge, ProgressBar } from '@components';
import { mockProjects } from '@data';
import { Project } from '@models';
import styles from './Portfolio.module.css';
import { ChevronUp, ChevronDown } from 'lucide-react';

type SortKey = keyof Project | 'capacidadUtilizada';
type SortDir = 'asc' | 'desc';

export default function Portfolio() {
  const [sortKey, setSortKey] = useState<SortKey>('nombre');
  const [sortDir, setSortDir] = useState<SortDir>('asc');
  const [filterCountry, setFilterCountry] = useState<string>('');
  const [filterStatus, setFilterStatus] = useState<string>('');

  const countries = useMemo(() => ['', ...new Set(mockProjects.map(p => p.pais))], []);
  const statuses = useMemo(() => ['', ...new Set(mockProjects.map(p => p.estado))], []);

  const filteredProjects = useMemo(() => {
    let result = [...mockProjects];
    if (filterCountry) result = result.filter(p => p.pais === filterCountry);
    if (filterStatus) result = result.filter(p => p.estado === filterStatus);
    return result;
  }, [filterCountry, filterStatus]);

  const sortedProjects = useMemo(() => {
    const sorted = [...filteredProjects];
    sorted.sort((a, b) => {
      let aVal: any = a[sortKey as keyof Project];
      let bVal: any = b[sortKey as keyof Project];
      if (aVal < bVal) return sortDir === 'asc' ? -1 : 1;
      if (aVal > bVal) return sortDir === 'asc' ? 1 : -1;
      return 0;
    });
    return sorted;
  }, [filteredProjects, sortKey, sortDir]);

  const handleSort = (key: SortKey) => {
    if (sortKey === key) {
      setSortDir(sortDir === 'asc' ? 'desc' : 'asc');
    } else {
      setSortKey(key);
      setSortDir('asc');
    }
  };

  const SortIcon = ({ active }: { active: boolean }) => {
    if (!active) return null;
    return sortDir === 'asc' ? <ChevronUp size={16} /> : <ChevronDown size={16} />;
  };

  const formatCurrency = (value: number) => `$${(value / 1000).toFixed(0)}K`;

  return (
    <div className={styles.portfolio}>
      <PageHeader
        title="Portafolio de Proyectos"
        subtitle={`${sortedProjects.length} proyectos`}
      />

      <Card className={styles.filters}>
        <div className={styles.filterRow}>
          <div className={styles.filterGroup}>
            <label>País:</label>
            <select value={filterCountry} onChange={(e) => setFilterCountry(e.target.value)}>
              <option value="">Todos</option>
              {countries.slice(1).map(c => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </div>
          <div className={styles.filterGroup}>
            <label>Estado:</label>
            <select value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)}>
              <option value="">Todos</option>
              {statuses.slice(1).map(s => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>
          </div>
          <button className={styles.resetBtn} onClick={() => {
            setFilterCountry('');
            setFilterStatus('');
          }}>
            Limpiar Filtros
          </button>
        </div>
      </Card>

      <div className={styles.tableContainer}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th onClick={() => handleSort('id')}>
                <div className={styles.headerCell}>
                  ID {<SortIcon active={sortKey === 'id'} />}
                </div>
              </th>
              <th onClick={() => handleSort('nombre')}>
                <div className={styles.headerCell}>
                  Nombre {<SortIcon active={sortKey === 'nombre'} />}
                </div>
              </th>
              <th onClick={() => handleSort('pais')}>
                <div className={styles.headerCell}>
                  País {<SortIcon active={sortKey === 'pais'} />}
                </div>
              </th>
              <th onClick={() => handleSort('pm')}>
                <div className={styles.headerCell}>
                  PM {<SortIcon active={sortKey === 'pm'} />}
                </div>
              </th>
              <th onClick={() => handleSort('estado')}>
                <div className={styles.headerCell}>
                  Estado {<SortIcon active={sortKey === 'estado'} />}
                </div>
              </th>
              <th onClick={() => handleSort('fase')}>
                <div className={styles.headerCell}>
                  Fase {<SortIcon active={sortKey === 'fase'} />}
                </div>
              </th>
              <th onClick={() => handleSort('avance')}>
                <div className={styles.headerCell}>
                  Avance {<SortIcon active={sortKey === 'avance'} />}
                </div>
              </th>
              <th onClick={() => handleSort('riesgo')}>
                <div className={styles.headerCell}>
                  Riesgo {<SortIcon active={sortKey === 'riesgo'} />}
                </div>
              </th>
              <th onClick={() => handleSort('presupuestoAprobado')}>
                <div className={styles.headerCell}>
                  Aprobado {<SortIcon active={sortKey === 'presupuestoAprobado'} />}
                </div>
              </th>
              <th onClick={() => handleSort('presupuestoEjecutado')}>
                <div className={styles.headerCell}>
                  Ejecutado {<SortIcon active={sortKey === 'presupuestoEjecutado'} />}
                </div>
              </th>
              <th onClick={() => handleSort('forecast')}>
                <div className={styles.headerCell}>
                  Forecast {<SortIcon active={sortKey === 'forecast'} />}
                </div>
              </th>
              <th>Variación</th>
            </tr>
          </thead>
          <tbody>
            {sortedProjects.map((project) => {
              const variance = project.forecast - project.presupuestoAprobado;
              const variancePercent = ((variance / project.presupuestoAprobado) * 100).toFixed(1);
              return (
                <tr key={project.id}>
                  <td><strong>{project.id}</strong></td>
                  <td>{project.nombre}</td>
                  <td>{project.pais}</td>
                  <td>{project.pm}</td>
                  <td><StatusBadge status={project.estado} type="status" /></td>
                  <td>{project.fase}</td>
                  <td>
                    <ProgressBar value={project.avance} showLabel={true} />
                  </td>
                  <td><StatusBadge status={project.riesgo} type="risk" /></td>
                  <td>{formatCurrency(project.presupuestoAprobado)}</td>
                  <td>{formatCurrency(project.presupuestoEjecutado)}</td>
                  <td>{formatCurrency(project.forecast)}</td>
                  <td className={variance > 0 ? styles.negative : styles.positive}>
                    {variance > 0 ? '+' : ''}{variancePercent}%
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
