import { useMemo } from 'react';
import { BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { PageHeader, Card, KPIWidget, ChartCard } from '@components';
import { mockProjects, mockPMs } from '@data';
import styles from './Dashboard.module.css';

const COLORS = ['#10b981', '#f59e0b', '#ef4444', '#3b82f6', '#8b5cf6', '#ec4899'];

export default function Dashboard() {
  const kpis = useMemo(() => {
    const green = mockProjects.filter(p => p.estado === 'green').length;
    const amber = mockProjects.filter(p => p.estado === 'amber').length;
    const red = mockProjects.filter(p => p.estado === 'red').length;
    const approvedBudget = mockProjects.reduce((sum, p) => sum + p.presupuestoAprobado, 0);
    const executedBudget = mockProjects.reduce((sum, p) => sum + p.presupuestoEjecutado, 0);
    const forecast = mockProjects.reduce((sum, p) => sum + p.forecast, 0);
    const potential = approvedBudget - executedBudget;
    const totalCapacity = mockPMs.reduce((sum, pm) => sum + pm.capacidadTotal, 0);
    const usedCapacity = mockPMs.reduce((sum, pm) => sum + Math.min(pm.capacidadAsignada, pm.capacidadTotal), 0);
    const availableCapacity = totalCapacity - usedCapacity;

    return {
      totalProjects: mockProjects.length,
      green,
      amber,
      red,
      approvedBudget,
      executedBudget,
      forecast,
      potential: Math.max(0, potential),
      usedCapacity,
      availableCapacity: Math.max(0, availableCapacity),
    };
  }, []);

  const projectsByCountry = useMemo(() => {
    const data: Record<string, number> = {};
    mockProjects.forEach(p => {
      data[p.pais] = (data[p.pais] || 0) + 1;
    });
    return Object.entries(data).map(([country, count]) => ({ name: country, value: count }));
  }, []);

  const portfolioStatus = useMemo(() => [
    { name: 'Verde', value: kpis.green, fill: '#10b981' },
    { name: 'Amarillo', value: kpis.amber, fill: '#f59e0b' },
    { name: 'Rojo', value: kpis.red, fill: '#ef4444' },
  ], [kpis]);

  const portfolioByUDN = useMemo(() => {
    const data: Record<string, number> = {};
    mockProjects.forEach(p => {
      data[p.udn] = (data[p.udn] || 0) + 1;
    });
    return Object.entries(data).map(([udn, count]) => ({ name: udn, value: count }));
  }, []);

  const budgetByCountry = useMemo(() => {
    const data: Record<string, number> = {};
    mockProjects.forEach(p => {
      data[p.pais] = (data[p.pais] || 0) + p.presupuestoEjecutado;
    });
    return Object.entries(data)
      .map(([country, budget]) => ({ name: country, budget: Math.round(budget / 1000) }))
      .sort((a, b) => b.budget - a.budget);
  }, []);

  const capacityByCountry = useMemo(() => {
    const data: Record<string, { total: number; used: number }> = {};
    mockPMs.forEach(pm => {
      if (!data[pm.pais]) data[pm.pais] = { total: 0, used: 0 };
      data[pm.pais].total += pm.capacidadTotal;
      data[pm.pais].used += Math.min(pm.capacidadAsignada, pm.capacidadTotal);
    });
    return Object.entries(data).map(([country, { total, used }]) => ({
      name: country,
      Usado: used,
      Disponible: Math.max(0, total - used),
    }));
  }, []);

  const formatCurrency = (value: number) => {
    return `$${(value / 1000000).toFixed(1)}M`;
  };

  return (
    <div className={styles.dashboard}>
      <PageHeader
        title="Dashboard Ejecutivo"
        subtitle="Resumen general del portafolio PMO"
      />

      <div className={styles.kpiGrid}>
        <KPIWidget label="Total Proyectos" value={kpis.totalProjects} />
        <KPIWidget label="Proyectos Verdes" value={kpis.green} trend="up" trendValue="+2" />
        <KPIWidget label="Proyectos Amarillos" value={kpis.amber} trend="neutral" trendValue="-1" />
        <KPIWidget label="Proyectos Rojos" value={kpis.red} trend="down" trendValue="+1" />
        <KPIWidget label="Presupuesto Aprobado" value={formatCurrency(kpis.approvedBudget)} />
        <KPIWidget label="Presupuesto Ejecutado" value={formatCurrency(kpis.executedBudget)} />
        <KPIWidget label="Forecast" value={formatCurrency(kpis.forecast)} />
        <KPIWidget label="Liberación Potencial" value={formatCurrency(kpis.potential)} />
        <KPIWidget label="Capacity Utilizada" value={`${Math.round((kpis.usedCapacity / (kpis.usedCapacity + kpis.availableCapacity)) * 100)}%`} />
        <KPIWidget label="Capacity Disponible" value={`${Math.round((kpis.availableCapacity / (kpis.usedCapacity + kpis.availableCapacity)) * 100)}%`} />
      </div>

      <div className={styles.chartsGrid}>
        <ChartCard title="Proyectos por País">
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={projectsByCountry}>
              <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
              <XAxis dataKey="name" stroke="#cbd5e1" />
              <YAxis stroke="#cbd5e1" />
              <Tooltip contentStyle={{ backgroundColor: '#1a202c', border: '1px solid #334155' }} />
              <Bar dataKey="value" fill="#3b82f6" />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard title="Portafolio por UDN">
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={portfolioByUDN}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, value }) => `${name}: ${value}`}
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
              >
                {portfolioByUDN.map((_, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip contentStyle={{ backgroundColor: '#1a202c', border: '1px solid #334155' }} />
            </PieChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard title="Estado del Portafolio">
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={portfolioStatus}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, value }) => `${name}: ${value}`}
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
              >
                {portfolioStatus.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.fill} />
                ))}
              </Pie>
              <Tooltip contentStyle={{ backgroundColor: '#1a202c', border: '1px solid #334155' }} />
            </PieChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard title="Presupuesto por País (Miles)">
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={budgetByCountry}>
              <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
              <XAxis dataKey="name" stroke="#cbd5e1" />
              <YAxis stroke="#cbd5e1" />
              <Tooltip contentStyle={{ backgroundColor: '#1a202c', border: '1px solid #334155' }} />
              <Bar dataKey="budget" fill="#10b981" />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard title="Capacity por País">
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={capacityByCountry}>
              <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
              <XAxis dataKey="name" stroke="#cbd5e1" />
              <YAxis stroke="#cbd5e1" />
              <Tooltip contentStyle={{ backgroundColor: '#1a202c', border: '1px solid #334155' }} />
              <Legend />
              <Bar dataKey="Usado" stackId="a" fill="#3b82f6" />
              <Bar dataKey="Disponible" stackId="a" fill="#10b981" />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>
      </div>
    </div>
  );
}
