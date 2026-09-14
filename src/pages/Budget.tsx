import { useMemo, useState } from 'react';
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { PageHeader, Card, ChartCard } from '@components';
import { mockProjects, mockBudgetLines } from '@data';
import styles from './Budget.module.css';

const COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6', '#ec4899'];

export default function Budget() {
  const [selectedProject, setSelectedProject] = useState<string>('');

  const projects = useMemo(() => mockProjects.map(p => p.id), []);

  const budgetSummary = useMemo(() => {
    const total = mockProjects.reduce((sum, p) => ({
      aprobado: sum.aprobado + p.presupuestoAprobado,
      ejecutado: sum.ejecutado + p.presupuestoEjecutado,
      forecast: sum.forecast + p.forecast,
    }), { aprobado: 0, ejecutado: 0, forecast: 0 });

    return [
      { name: 'Aprobado', value: Math.round(total.aprobado / 1000000) },
      { name: 'Ejecutado', value: Math.round(total.ejecutado / 1000000) },
      { name: 'Forecast', value: Math.round(total.forecast / 1000000) },
    ];
  }, []);

  const budgetByType = useMemo(() => {
    const data: Record<string, any> = {};
    mockBudgetLines.forEach(line => {
      if (!data[line.tipo]) {
        data[line.tipo] = { name: line.tipo, aprobado: 0, ejecutado: 0, forecast: 0 };
      }
      data[line.tipo].aprobado += line.aprobado;
      data[line.tipo].ejecutado += line.ejecutado;
      data[line.tipo].forecast += line.forecast;
    });
    return Object.values(data);
  }, []);

  const budgetByCountry = useMemo(() => {
    const data: Record<string, any> = {};
    mockProjects.forEach(p => {
      if (!data[p.pais]) {
        data[p.pais] = { name: p.pais, aprobado: 0, ejecutado: 0 };
      }
      data[p.pais].aprobado += p.presupuestoAprobado;
      data[p.pais].ejecutado += p.presupuestoEjecutado;
    });
    return Object.values(data).map(d => ({
      ...d,
      aprobado: Math.round(d.aprobado / 1000),
      ejecutado: Math.round(d.ejecutado / 1000),
    }));
  }, []);

  const executionRate = useMemo(() => {
    const total = mockProjects.reduce((sum, p) => ({
      aprobado: sum.aprobado + p.presupuestoAprobado,
      ejecutado: sum.ejecutado + p.presupuestoEjecutado,
    }), { aprobado: 0, ejecutado: 0 });
    return ((total.ejecutado / total.aprobado) * 100).toFixed(1);
  }, []);

  const selectedProjectData = useMemo(() => {
    if (!selectedProject) return null;
    return mockProjects.find(p => p.id === selectedProject);
  }, [selectedProject]);

  const selectedProjectBudgetLines = useMemo(() => {
    if (!selectedProject) return [];
    return mockBudgetLines.filter(b => b.projectId === selectedProject);
  }, [selectedProject]);

  const formatCurrency = (value: number) => `$${(value / 1000000).toFixed(1)}M`;
  const formatCurrencyK = (value: number) => `$${(value / 1000).toFixed(0)}K`;

  return (
    <div className={styles.budget}>
      <PageHeader
        title="Presupuesto y Financiero"
        subtitle="Análisis detallado de presupuestos por proyecto y tipo"
      />

      <div className={styles.summaryGrid}>
        <Card className={styles.summaryCard}>
          <h3>Presupuesto Total Aprobado</h3>
          <p className={styles.amount}>{formatCurrency(mockProjects.reduce((sum, p) => sum + p.presupuestoAprobado, 0))}</p>
        </Card>
        <Card className={styles.summaryCard}>
          <h3>Presupuesto Ejecutado</h3>
          <p className={styles.amount}>{formatCurrency(mockProjects.reduce((sum, p) => sum + p.presupuestoEjecutado, 0))}</p>
        </Card>
        <Card className={styles.summaryCard}>
          <h3>Forecast Total</h3>
          <p className={styles.amount}>{formatCurrency(mockProjects.reduce((sum, p) => sum + p.forecast, 0))}</p>
        </Card>
        <Card className={styles.summaryCard}>
          <h3>Tasa de Ejecución</h3>
          <p className={styles.amount}>{executionRate}%</p>
        </Card>
      </div>

      <div className={styles.chartsGrid}>
        <ChartCard title="Presupuesto: Aprobado vs Ejecutado vs Forecast">
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={budgetSummary}>
              <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
              <XAxis dataKey="name" stroke="#cbd5e1" />
              <YAxis stroke="#cbd5e1" label={{ value: 'Millones USD', angle: -90, position: 'insideLeft' }} />
              <Tooltip contentStyle={{ backgroundColor: '#1a202c', border: '1px solid #334155' }} />
              <Bar dataKey="value" fill="#3b82f6" />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard title="Presupuesto por País (Miles)">
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={budgetByCountry}>
              <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
              <XAxis dataKey="name" stroke="#cbd5e1" />
              <YAxis stroke="#cbd5e1" />
              <Tooltip contentStyle={{ backgroundColor: '#1a202c', border: '1px solid #334155' }} />
              <Legend />
              <Bar dataKey="aprobado" stackId="a" fill="#3b82f6" />
              <Bar dataKey="ejecutado" stackId="a" fill="#10b981" />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard title="Presupuesto por Tipo de Gasto">
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={budgetByType}>
              <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
              <XAxis dataKey="name" stroke="#cbd5e1" angle={-45} textAnchor="end" />
              <YAxis stroke="#cbd5e1" />
              <Tooltip contentStyle={{ backgroundColor: '#1a202c', border: '1px solid #334155' }} />
              <Legend />
              <Bar dataKey="aprobado" stackId="a" fill="#3b82f6" />
              <Bar dataKey="ejecutado" stackId="a" fill="#10b981" />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard title="Distribución de Gasto por Tipo">
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={budgetByType}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, ejecutado }) => `${name}: $${(ejecutado / 1000000).toFixed(1)}M`}
                outerRadius={100}
                fill="#8884d8"
                dataKey="ejecutado"
              >
                {budgetByType.map((_, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip contentStyle={{ backgroundColor: '#1a202c', border: '1px solid #334155' }} />
            </PieChart>
          </ResponsiveContainer>
        </ChartCard>
      </div>

      <Card className={styles.detailCard}>
        <h3>Análisis Detallado por Proyecto</h3>
        <div className={styles.filterGroup}>
          <label>Seleccionar Proyecto:</label>
          <select value={selectedProject} onChange={(e) => setSelectedProject(e.target.value)}>
            <option value="">-- Seleccionar --</option>
            {projects.map(p => {
              const project = mockProjects.find(mp => mp.id === p);
              return <option key={p} value={p}>{p} - {project?.nombre}</option>;
            })}
          </select>
        </div>

        {selectedProjectData && (
          <div className={styles.projectDetail}>
            <h4>{selectedProjectData.nombre}</h4>
            <div className={styles.detailGrid}>
              <div>
                <strong>Presupuesto Aprobado:</strong>
                <p>{formatCurrency(selectedProjectData.presupuestoAprobado)}</p>
              </div>
              <div>
                <strong>Ejecutado:</strong>
                <p>{formatCurrency(selectedProjectData.presupuestoEjecutado)}</p>
              </div>
              <div>
                <strong>Forecast:</strong>
                <p>{formatCurrency(selectedProjectData.forecast)}</p>
              </div>
              <div>
                <strong>Variación:</strong>
                <p className={selectedProjectData.forecast > selectedProjectData.presupuestoAprobado ? styles.negative : styles.positive}>
                  {((selectedProjectData.forecast - selectedProjectData.presupuestoAprobado) / selectedProjectData.presupuestoAprobado * 100).toFixed(1)}%
                </p>
              </div>
            </div>

            <h5>Líneas de Presupuesto</h5>
            <table className={styles.linesTable}>
              <thead>
                <tr>
                  <th>Tipo</th>
                  <th>Aprobado</th>
                  <th>Comprometido</th>
                  <th>Ejecutado</th>
                  <th>Forecast</th>
                </tr>
              </thead>
              <tbody>
                {selectedProjectBudgetLines.map(line => (
                  <tr key={line.id}>
                    <td>{line.tipo}</td>
                    <td>{formatCurrencyK(line.aprobado)}</td>
                    <td>{formatCurrencyK(line.comprometido)}</td>
                    <td>{formatCurrencyK(line.ejecutado)}</td>
                    <td>{formatCurrencyK(line.forecast)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </Card>
    </div>
  );
}
