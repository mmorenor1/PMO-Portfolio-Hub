import { useMemo, useState } from 'react';
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { PageHeader, Card, ChartCard } from '@components';
import { mockPMs, mockCapacityRecords } from '@data';
import styles from './Capacity.module.css';

export default function Capacity() {
  const [selectedCountry, setSelectedCountry] = useState<string>('');

  const countries = useMemo(() => ['', ...new Set(mockPMs.map(pm => pm.pais))], []);

  const filteredPMs = useMemo(() => {
    if (!selectedCountry) return mockPMs;
    return mockPMs.filter(pm => pm.pais === selectedCountry);
  }, [selectedCountry]);

  const capacitySummary = useMemo(() => {
    const total = mockPMs.reduce((sum, pm) => ({
      total: sum.total + pm.capacidadTotal,
      asignada: sum.asignada + Math.min(pm.capacidadAsignada, pm.capacidadTotal),
    }), { total: 0, asignada: 0 });

    return [
      {
        name: 'Capacity',
        Total: total.total,
        Asignada: total.asignada,
        Disponible: Math.max(0, total.total - total.asignada),
      },
    ];
  }, []);

  const capacityByCountry = useMemo(() => {
    const data: Record<string, any> = {};
    mockPMs.forEach(pm => {
      if (!data[pm.pais]) {
        data[pm.pais] = { name: pm.pais, Total: 0, Asignada: 0, Disponible: 0 };
      }
      data[pm.pais].Total += pm.capacidadTotal;
      const asignada = Math.min(pm.capacidadAsignada, pm.capacidadTotal);
      data[pm.pais].Asignada += asignada;
      data[pm.pais].Disponible += Math.max(0, pm.capacidadTotal - asignada);
    });
    return Object.values(data);
  }, []);

  const pmCapacityChart = useMemo(() => {
    return filteredPMs.map(pm => ({
      name: pm.nombre.split(' ')[0],
      Total: pm.capacidadTotal,
      Asignada: Math.min(pm.capacidadAsignada, pm.capacidadTotal),
      Disponible: Math.max(0, pm.capacidadTotal - pm.capacidadAsignada),
    }));
  }, [filteredPMs]);

  const capacityTrend = useMemo(() => {
    const months = new Map<string, { total: number; asignada: number; count: number }>();
    mockCapacityRecords.forEach(record => {
      const key = `${record.mes.getFullYear()}-${String(record.mes.getMonth() + 1).padStart(2, '0')}`;
      if (!months.has(key)) months.set(key, { total: 0, asignada: 0, count: 0 });
      const data = months.get(key)!;
      data.total += record.capacidadTotal;
      data.asignada += record.capacidadAsignada;
      data.count += 1;
    });

    return Array.from(months.entries())
      .sort()
      .slice(-6)
      .map(([month, data]) => ({
        month,
        Promedio: Math.round((data.asignada / data.total) * 100),
      }));
  }, []);

  const utilizationRate = useMemo(() => {
    const total = mockPMs.reduce((sum, pm) => ({
      total: sum.total + pm.capacidadTotal,
      asignada: sum.asignada + Math.min(pm.capacidadAsignada, pm.capacidadTotal),
    }), { total: 0, asignada: 0 });
    return ((total.asignada / total.total) * 100).toFixed(1);
  }, []);

  const overallocated = useMemo(() => {
    return filteredPMs.filter(pm => pm.capacidadAsignada > pm.capacidadTotal).length;
  }, [filteredPMs]);

  return (
    <div className={styles.capacity}>
      <PageHeader
        title="Gestión de Capacity"
        subtitle="Análisis de disponibilidad y asignación de Project Managers"
      />

      <div className={styles.summaryGrid}>
        <Card className={styles.summaryCard}>
          <h3>Capacity Total</h3>
          <p className={styles.amount}>{mockPMs.reduce((sum, pm) => sum + pm.capacidadTotal, 0)}</p>
        </Card>
        <Card className={styles.summaryCard}>
          <h3>Capacity Asignada</h3>
          <p className={styles.amount}>
            {mockPMs.reduce((sum, pm) => sum + Math.min(pm.capacidadAsignada, pm.capacidadTotal), 0)}
          </p>
        </Card>
        <Card className={styles.summaryCard}>
          <h3>Tasa de Utilización</h3>
          <p className={styles.amount}>{utilizationRate}%</p>
        </Card>
        <Card className={`${styles.summaryCard} ${overallocated > 0 ? styles.warning : ''}`}>
          <h3>PMs Over-allocated</h3>
          <p className={styles.amount}>{overallocated}</p>
        </Card>
      </div>

      <div className={styles.chartsGrid}>
        <ChartCard title="Resumen Global de Capacity">
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={capacitySummary}>
              <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
              <XAxis dataKey="name" stroke="#cbd5e1" />
              <YAxis stroke="#cbd5e1" />
              <Tooltip contentStyle={{ backgroundColor: '#1a202c', border: '1px solid #334155' }} />
              <Legend />
              <Bar dataKey="Total" fill="#3b82f6" />
              <Bar dataKey="Asignada" fill="#f59e0b" />
              <Bar dataKey="Disponible" fill="#10b981" />
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
              <Bar dataKey="Asignada" stackId="a" fill="#f59e0b" />
              <Bar dataKey="Disponible" stackId="a" fill="#10b981" />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard title="Capacity por PM">
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={pmCapacityChart}>
              <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
              <XAxis dataKey="name" stroke="#cbd5e1" angle={-45} textAnchor="end" />
              <YAxis stroke="#cbd5e1" />
              <Tooltip contentStyle={{ backgroundColor: '#1a202c', border: '1px solid #334155' }} />
              <Legend />
              <Bar dataKey="Asignada" stackId="a" fill="#f59e0b" />
              <Bar dataKey="Disponible" stackId="a" fill="#10b981" />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard title="Tendencia de Utilización (últimos 6 meses)">
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={capacityTrend}>
              <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
              <XAxis dataKey="month" stroke="#cbd5e1" />
              <YAxis stroke="#cbd5e1" domain={[0, 100]} />
              <Tooltip contentStyle={{ backgroundColor: '#1a202c', border: '1px solid #334155' }} />
              <Line type="monotone" dataKey="Promedio" stroke="#3b82f6" strokeWidth={2} dot={{ r: 5 }} />
            </LineChart>
          </ResponsiveContainer>
        </ChartCard>
      </div>

      <Card className={styles.detailCard}>
        <div className={styles.filterGroup}>
          <label>Filtrar por País:</label>
          <select value={selectedCountry} onChange={(e) => setSelectedCountry(e.target.value)}>
            <option value="">Todos</option>
            {countries.slice(1).map(c => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
        </div>

        <h3>Detalle de Project Managers</h3>
        <div className={styles.pmGrid}>
          {filteredPMs.map(pm => {
            const utilizacion = (Math.min(pm.capacidadAsignada, pm.capacidadTotal) / pm.capacidadTotal) * 100;
            const isOverallocated = pm.capacidadAsignada > pm.capacidadTotal;
            return (
              <Card key={pm.id} className={`${styles.pmCard} ${isOverallocated ? styles.warning : ''}`}>
                <div className={styles.pmHeader}>
                  <h4>{pm.nombre}</h4>
                  <span className={styles.badge}>{pm.id}</span>
                </div>
                <div className={styles.pmInfo}>
                  <div>
                    <label>País:</label>
                    <p>{pm.pais}</p>
                  </div>
                  <div>
                    <label>Email:</label>
                    <p>{pm.email}</p>
                  </div>
                  <div>
                    <label>Proyectos:</label>
                    <p>{pm.proyectos.length}</p>
                  </div>
                  <div>
                    <label>Capacity Total:</label>
                    <p>{pm.capacidadTotal}%</p>
                  </div>
                  <div>
                    <label>Capacity Asignada:</label>
                    <p className={isOverallocated ? styles.negative : ''}>{Math.min(pm.capacidadAsignada, pm.capacidadTotal)}%</p>
                  </div>
                  <div>
                    <label>Utilización:</label>
                    <p>{Math.round(utilizacion)}%</p>
                  </div>
                </div>
                {isOverallocated && (
                  <div className={styles.alert}>
                    ⚠️ Over-allocated por {pm.capacidadAsignada - pm.capacidadTotal}%
                  </div>
                )}
              </Card>
            );
          })}
        </div>
      </Card>
    </div>
  );
}
