export type ProjectStatus = 'green' | 'amber' | 'red';
export type ProjectPhase = 'Planning' | 'Execution' | 'Monitoring' | 'Closing';
export type RiskLevel = 'Low' | 'Medium' | 'High';
export type Country = 'Chile' | 'Perú' | 'Colombia' | 'Panamá' | 'USA' | 'Regional';

export interface Project {
  id: string;
  nombre: string;
  pais: Country;
  udn: string;
  sponsor: string;
  pm: string;
  estado: ProjectStatus;
  riesgo: RiskLevel;
  fase: ProjectPhase;
  avance: number;
  fechaInicio: Date;
  fechaFin: Date;
  presupuestoAprobado: number;
  presupuestoEjecutado: number;
  forecast: number;
  descripcion: string;
}

export interface ProjectManager {
  id: string;
  nombre: string;
  email: string;
  pais: Country;
  capacidadTotal: number;
  capacidadAsignada: number;
  proyectos: string[]; // project ids
}

export interface BudgetLine {
  id: string;
  projectId: string;
  tipo: 'Consultoría' | 'Desarrollo' | 'Licencias' | 'Cloud' | 'Infraestructura' | 'Testing' | 'Otros';
  aprobado: number;
  comprometido: number;
  ejecutado: number;
  forecast: number;
}

export interface CapacityRecord {
  id: string;
  pmId: string;
  mes: Date;
  capacidadTotal: number;
  capacidadAsignada: number;
}

export interface PortfolioKPI {
  totalProyectos: number;
  proyectosVerdes: number;
  proyectosAmarillos: number;
  proyectosRojos: number;
  presupuestoAprobado: number;
  presupuestoEjecutado: number;
  forecast: number;
  liberacionPotencial: number;
  capacidadUtilizada: number;
  capacidadDisponible: number;
}

export interface FileUpload {
  id: string;
  nombre: string;
  tipo: 'StatusMensual' | 'CapacidadMensual';
  fechaSubida: Date;
  pmId: string;
  mes: Date;
}
