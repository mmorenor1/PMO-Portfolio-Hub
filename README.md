# PMO Portfolio Hub

**Portal integral de gestión de portafolio de proyectos con visibilidad ejecutiva, control presupuestario y seguimiento de capacidad en tiempo real.**

---

## 📋 Descripción General

PMO Portfolio Hub es una plataforma moderna desarrollada con React y TypeScript que proporciona a los equipos de Project Management Office (PMO) las herramientas necesarias para:

- **Monitorear** el estado del portafolio en tiempo real
- **Controlar** presupuestos y forecast
- **Optimizar** la asignación de capacidad de Project Managers
- **Colaborar** en la gestión de proyectos
- **Analizar** tendencias y tomar decisiones basadas en datos

---

## 🚀 Características Principales

### 📊 Dashboard Ejecutivo
- KPIs en tiempo real (proyectos verdes/amarillos/rojos)
- Visualización de presupuesto aprobado vs ejecutado
- Gráficos de capacidad y utilización
- Tendencias por país y UDN

### 📁 Portafolio de Proyectos
- Tabla completa y filtrable de 30+ proyectos
- Filtrado por país y estado
- Ordenamiento dinámico de columnas
- Indicadores de avance y riesgo
- Análisis de variación presupuestaria

### 💰 Presupuesto y Financiero
- Análisis de presupuestos aprobados, ejecutados y forecast
- Distribución por tipo de gasto
- Desglose por país
- Drill-down a líneas de presupuesto por proyecto
- Tasa de ejecución y proyecciones

### 👥 Gestión de Capacity
- Seguimiento de utilización de PMs
- Detección de over-allocation
- Gráficos de tendencia (últimos 6 meses)
- Tarjetas de PM con detalles de capacidad
- Filtrado por país

### 📤 Espacio PM
- Carga y gestión de documentos
- Drag & drop support
- Historial de actualizaciones
- Compartir archivos entre equipos

### 🔍 Explorador PMO
- Búsqueda avanzada de PMs y proyectos
- Filtrado por UDN
- Agrupación flexible (por país o UDN)
- Vista integrada de recursos y proyectos

### ℹ️ Acerca del Portal
- Información general del sistema
- Módulos disponibles
- Stack tecnológico
- Contacto y soporte

---

## 🛠️ Stack Tecnológico

### Frontend
- **React 18** - UI framework
- **TypeScript** - Type safety
- **Vite** - Build tool
- **React Router** - Navigation
- **Recharts** - Data visualization
- **Lucide Icons** - Icon library
- **CSS Modules** - Component styling

### Características
- Tema oscuro profesional
- Diseño completamente responsive
- Mobile-first approach
- Optimizado para performance
- Accesibilidad mejorada

---

## 📊 Datos Mock

El portal incluye datos simulados realistas:
- **30+ Proyectos** distribuidos en 5 países (Colombia, Perú, Ecuador, Argentina, Chile)
- **8 Project Managers** activos con asignaciones variadas
- **Datos financieros** con presupuestos, ejecución y forecast
- **Registros históricos** de capacidad (últimos 6 meses)
- **Líneas de presupuesto** detalladas por tipo de gasto

---

## 🚀 Cómo Empezar

### Requisitos Previos
- Node.js >= 16.x
- npm o yarn

### Instalación

```bash
# Clonar el repositorio
git clone https://github.com/mmorenor1/PMO-Portfolio-Hub.git
cd PMO-Portfolio-Hub

# Instalar dependencias
npm install

# Iniciar servidor de desarrollo
npm run dev
```

### Comandos Disponibles

```bash
# Desarrollo
npm run dev          # Inicia servidor de desarrollo

# Build
npm run build        # Compila para producción

# Preview
npm run preview      # Vista previa de build de producción

# Linting
npm run lint         # Ejecuta ESLint
```

---

## 📁 Estructura del Proyecto

```
src/
├── components/          # Componentes reutilizables
│   ├── Card.tsx
│   ├── KPIWidget.tsx
│   ├── ChartCard.tsx
│   ├── StatusBadge.tsx
│   ├── ProgressBar.tsx
│   ├── PageHeader.tsx
│   ├── Layout.tsx
│   ├── Sidebar.tsx
│   └── index.ts
├── pages/              # Páginas principales
│   ├── Dashboard.tsx
│   ├── Portfolio.tsx
│   ├── Budget.tsx
│   ├── Capacity.tsx
│   ├── PMSpace.tsx
│   ├── Explorer.tsx
│   ├── About.tsx
│   └── index.ts
├── data/               # Datos mock
│   └── index.ts
├── models/             # Tipos TypeScript
│   └── index.ts
├── App.tsx             # Componente principal
├── App.css             # Estilos globales
├── main.tsx            # Entry point
└── index.css           # CSS global
```

---

## 🎨 Diseño y Estilos

### Paleta de Colores
- **Fondo Principal**: #0f172a (Navy oscuro)
- **Fondo Secundario**: #1a202c (Navy claro)
- **Bordes**: #475569 (Slate)
- **Texto Principal**: #f1f5f9 (Blanco)
- **Texto Secundario**: #cbd5e1 (Slate claro)
- **Acentos**: 
  - Azul: #3b82f6
  - Verde: #10b981
  - Rojo: #ef4444
  - Ámbar: #f59e0b

### Componentes Visuales
- Cards con efecto hover
- Badges de estado (Verde/Amarillo/Rojo)
- Progress bars con indicadores
- Gráficos interactivos con Recharts
- Tablas con sorteo y filtrado
- Formularios responsivos

---

## 📈 KPIs y Métricas

El dashboard ejecutivo monitorea:
- Total de proyectos por estado
- Presupuesto aprobado y ejecutado
- Forecast y liberación potencial
- Tasa de ejecución de presupuesto
- Utilización de capacidad de PMs
- Proyectos over-allocated
- Tendencias por país y UDN

---

## 🔐 Seguridad y Acceso

**Nota:** Este es un portal demo. En producción, se debe implementar:
- Autenticación (OAuth, SAML, LDAP)
- Autorización basada en roles (RBAC)
- Encriptación de datos
- Auditoría de cambios
- Backup y recovery

---

## 📞 Contacto y Soporte

**Email:** pmo@credicorpcapital.com

**Equipo PMO:**
- Juan García - Director PMO
- María López - Coordinadora de Portafolio
- Carlos Rodríguez - Analista Financiero

---

## 📄 Licencia

Este proyecto es propiedad de Credicorp Capital. Todos los derechos reservados.

---

## 🙏 Agradecimientos

Desarrollado con ❤️ para optimizar la gestión de portafolios de proyectos.

**Versión:** 1.0.0  
**Fecha:** Septiembre 2026  
**Estado:** ✅ Producción
