import { Project, ProjectManager, BudgetLine, CapacityRecord } from '@models';
import { Country, ProjectStatus, RiskLevel, ProjectPhase } from '@models';

const countries: Country[] = ['Chile', 'Perú', 'Colombia', 'Panamá', 'USA', 'Regional'];
const statuses: ProjectStatus[] = ['green', 'amber', 'red'];
const risks: RiskLevel[] = ['Low', 'Medium', 'High'];
const phases: ProjectPhase[] = ['Planning', 'Execution', 'Monitoring', 'Closing'];
const udns = ['Technology', 'Finance', 'Operations', 'Marketing', 'HR', 'Risk'];
const sponsors = ['CEO', 'CFO', 'COO', 'CTO', 'CMO', 'CHRO'];

const pmNames = ['Juan García', 'María López', 'Carlos Rodríguez', 'Ana Martínez', 'Roberto Silva', 'Diana Flores', 'Luis Gómez', 'Sofia Ruiz'];

function generateDate(daysOffset: number): Date {
  const date = new Date();
  date.setDate(date.getDate() + daysOffset);
  return date;
}

function getRandomItem<T>(array: T[]): T {
  return array[Math.floor(Math.random() * array.length)];
}

function getRandomInt(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export const mockPMs: ProjectManager[] = pmNames.map((nombre, index) => ({
  id: `PM-${index + 1}`,
  nombre,
  email: `${nombre.toLowerCase().replace(' ', '.')}@corp.com`,
  pais: getRandomItem(countries),
  capacidadTotal: 100,
  capacidadAsignada: getRandomInt(60, 120),
  proyectos: [],
}));

export const mockProjects: Project[] = [
  {
    id: 'PROJ-001',
    nombre: 'Transformación Digital Chile',
    pais: 'Chile',
    udn: 'Technology',
    sponsor: 'CTO',
    pm: 'Juan García',
    estado: 'green',
    riesgo: 'Low',
    fase: 'Execution',
    avance: 75,
    fechaInicio: generateDate(-90),
    fechaFin: generateDate(60),
    presupuestoAprobado: 500000,
    presupuestoEjecutado: 375000,
    forecast: 480000,
    descripcion: 'Implementación de infraestructura cloud y modernización de sistemas',
  },
  {
    id: 'PROJ-002',
    nombre: 'Integración Operativa Perú',
    pais: 'Perú',
    udn: 'Operations',
    sponsor: 'COO',
    pm: 'María López',
    estado: 'amber',
    riesgo: 'Medium',
    fase: 'Execution',
    avance: 65,
    fechaInicio: generateDate(-60),
    fechaFin: generateDate(90),
    presupuestoAprobado: 350000,
    presupuestoEjecutado: 220000,
    forecast: 360000,
    descripcion: 'Consolidación de procesos operativos entre sedes',
  },
  {
    id: 'PROJ-003',
    nombre: 'Portal Financiero Colombia',
    pais: 'Colombia',
    udn: 'Finance',
    sponsor: 'CFO',
    pm: 'Carlos Rodríguez',
    estado: 'red',
    riesgo: 'High',
    fase: 'Planning',
    avance: 30,
    fechaInicio: generateDate(-30),
    fechaFin: generateDate(120),
    presupuestoAprobado: 600000,
    presupuestoEjecutado: 180000,
    forecast: 650000,
    descripcion: 'Desarrollo de plataforma de gestión financiera',
  },
  {
    id: 'PROJ-004',
    nombre: 'Sistema CRM Panamá',
    pais: 'Panamá',
    udn: 'Marketing',
    sponsor: 'CMO',
    pm: 'Ana Martínez',
    estado: 'green',
    riesgo: 'Low',
    fase: 'Monitoring',
    avance: 85,
    fechaInicio: generateDate(-120),
    fechaFin: generateDate(30),
    presupuestoAprobado: 280000,
    presupuestoEjecutado: 238000,
    forecast: 275000,
    descripcion: 'Implementación de nuevo CRM para gestión comercial',
  },
  {
    id: 'PROJ-005',
    nombre: 'Modernización RRHH USA',
    pais: 'USA',
    udn: 'HR',
    sponsor: 'CHRO',
    pm: 'Roberto Silva',
    estado: 'amber',
    riesgo: 'Medium',
    fase: 'Execution',
    avance: 55,
    fechaInicio: generateDate(-45),
    fechaFin: generateDate(75),
    presupuestoAprobado: 420000,
    presupuestoEjecutado: 231000,
    forecast: 430000,
    descripcion: 'Implementación de plataforma de gestión de talento',
  },
  {
    id: 'PROJ-006',
    nombre: 'Ciberseguridad Regional',
    pais: 'Regional',
    udn: 'Risk',
    sponsor: 'CEO',
    pm: 'Diana Flores',
    estado: 'green',
    riesgo: 'Low',
    fase: 'Execution',
    avance: 70,
    fechaInicio: generateDate(-75),
    fechaFin: generateDate(45),
    presupuestoAprobado: 550000,
    presupuestoEjecutado: 385000,
    forecast: 540000,
    descripcion: 'Fortalecimiento de infraestructura de seguridad',
  },
  {
    id: 'PROJ-007',
    nombre: 'Migración Licencias Chile',
    pais: 'Chile',
    udn: 'Technology',
    sponsor: 'CTO',
    pm: 'Luis Gómez',
    estado: 'green',
    riesgo: 'Low',
    fase: 'Monitoring',
    avance: 90,
    fechaInicio: generateDate(-150),
    fechaFin: generateDate(15),
    presupuestoAprobado: 180000,
    presupuestoEjecutado: 162000,
    forecast: 175000,
    descripcion: 'Migración de licencias de software a modelo cloud',
  },
  {
    id: 'PROJ-008',
    nombre: 'Automatización Procesos Perú',
    pais: 'Perú',
    udn: 'Operations',
    sponsor: 'COO',
    pm: 'Sofia Ruiz',
    estado: 'amber',
    riesgo: 'Medium',
    fase: 'Execution',
    avance: 60,
    fechaInicio: generateDate(-50),
    fechaFin: generateDate(80),
    presupuestoAprobado: 320000,
    presupuestoEjecutado: 192000,
    forecast: 330000,
    descripcion: 'Automatización de procesos operacionales clave',
  },
  {
    id: 'PROJ-009',
    nombre: 'Análisis de Datos Colombia',
    pais: 'Colombia',
    udn: 'Finance',
    sponsor: 'CFO',
    pm: 'Juan García',
    estado: 'green',
    riesgo: 'Low',
    fase: 'Execution',
    avance: 72,
    fechaInicio: generateDate(-80),
    fechaFin: generateDate(50),
    presupuestoAprobado: 290000,
    presupuestoEjecutado: 208800,
    forecast: 295000,
    descripcion: 'Implementación de plataforma de business intelligence',
  },
  {
    id: 'PROJ-010',
    nombre: 'Centro de Contacto Panamá',
    pais: 'Panamá',
    udn: 'Marketing',
    sponsor: 'CMO',
    pm: 'María López',
    estado: 'red',
    riesgo: 'High',
    fase: 'Planning',
    avance: 25,
    fechaInicio: generateDate(-20),
    fechaFin: generateDate(140),
    presupuestoAprobado: 450000,
    presupuestoEjecutado: 112500,
    forecast: 480000,
    descripcion: 'Establecimiento de nuevo centro de contacto',
  },
];

// Agregar más proyectos para llegar a 25+
for (let i = 11; i <= 30; i++) {
  const status = getRandomItem(statuses);
  mockProjects.push({
    id: `PROJ-${String(i).padStart(3, '0')}`,
    nombre: `Proyecto ${i} - ${getRandomItem(['Transformación', 'Modernización', 'Optimización', 'Integración'])}`,
    pais: getRandomItem(countries),
    udn: getRandomItem(udns),
    sponsor: getRandomItem(sponsors),
    pm: getRandomItem(pmNames),
    estado: status,
    riesgo: status === 'green' ? 'Low' : status === 'amber' ? 'Medium' : 'High',
    fase: getRandomItem(phases),
    avance: getRandomInt(20, 95),
    fechaInicio: generateDate(getRandomInt(-150, -10)),
    fechaFin: generateDate(getRandomInt(10, 150)),
    presupuestoAprobado: getRandomInt(150000, 800000),
    presupuestoEjecutado: getRandomInt(50000, 500000),
    forecast: getRandomInt(100000, 700000),
    descripcion: 'Descripción del proyecto',
  });
}

export const mockBudgetLines: BudgetLine[] = mockProjects.flatMap((project) => [
  {
    id: `BL-${project.id}-001`,
    projectId: project.id,
    tipo: 'Consultoría',
    aprobado: Math.floor(project.presupuestoAprobado * 0.3),
    comprometido: Math.floor(project.presupuestoAprobado * 0.25),
    ejecutado: Math.floor(project.presupuestoEjecutado * 0.35),
    forecast: Math.floor(project.forecast * 0.3),
  },
  {
    id: `BL-${project.id}-002`,
    projectId: project.id,
    tipo: 'Desarrollo',
    aprobado: Math.floor(project.presupuestoAprobado * 0.35),
    comprometido: Math.floor(project.presupuestoAprobado * 0.3),
    ejecutado: Math.floor(project.presupuestoEjecutado * 0.4),
    forecast: Math.floor(project.forecast * 0.35),
  },
  {
    id: `BL-${project.id}-003`,
    projectId: project.id,
    tipo: 'Licencias',
    aprobado: Math.floor(project.presupuestoAprobado * 0.2),
    comprometido: Math.floor(project.presupuestoAprobado * 0.18),
    ejecutado: Math.floor(project.presupuestoEjecutado * 0.15),
    forecast: Math.floor(project.forecast * 0.2),
  },
  {
    id: `BL-${project.id}-004`,
    projectId: project.id,
    tipo: 'Cloud',
    aprobado: Math.floor(project.presupuestoAprobado * 0.1),
    comprometido: Math.floor(project.presupuestoAprobado * 0.09),
    ejecutado: Math.floor(project.presupuestoEjecutado * 0.08),
    forecast: Math.floor(project.forecast * 0.1),
  },
  {
    id: `BL-${project.id}-005`,
    projectId: project.id,
    tipo: 'Infraestructura',
    aprobado: Math.floor(project.presupuestoAprobado * 0.04),
    comprometido: Math.floor(project.presupuestoAprobado * 0.03),
    ejecutado: Math.floor(project.presupuestoEjecutado * 0.02),
    forecast: Math.floor(project.forecast * 0.04),
  },
]);

export const mockCapacityRecords: CapacityRecord[] = mockPMs.flatMap((pm) => {
  const records: CapacityRecord[] = [];
  for (let i = 0; i < 6; i++) {
    const date = new Date();
    date.setMonth(date.getMonth() - i);
    records.push({
      id: `CAP-${pm.id}-${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`,
      pmId: pm.id,
      mes: date,
      capacidadTotal: 100,
      capacidadAsignada: getRandomInt(70, 130),
    });
  }
  return records;
});
