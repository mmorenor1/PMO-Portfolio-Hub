# PMO Portfolio Hub - Instrucciones de Instalación y Uso

## 🚀 Quick Start

### Instalación

```bash
# 1. Clonar el repositorio
git clone https://github.com/mmorenor1/PMO-Portfolio-Hub.git
cd PMO-Portfolio-Hub

# 2. Instalar dependencias
npm install

# 3. Iniciar servidor de desarrollo
npm run dev
```

La aplicación estará disponible en `http://localhost:5173`

### Build para Producción

```bash
# Compilar
npm run build

# Vista previa
npm run preview
```

---

## 📋 Descripción General

**PMO Portfolio Hub** es un portal integral de gestión de portafolio de proyectos que proporciona:

✅ **Dashboard Ejecutivo** - KPIs en tiempo real, estado del portafolio  
✅ **Portafolio de Proyectos** - Tabla completa filtrable y ordenable  
✅ **Presupuesto y Financiero** - Análisis de budgets con drill-down  
✅ **Gestión de Capacity** - Seguimiento de utilización de PMs  
✅ **Espacio PM** - Compartir documentos y actualizaciones  
✅ **Explorador PMO** - Búsqueda avanzada y agrupación flexible  
✅ **Acerca del Portal** - Información y documentación  

---

## 🎨 Características Técnicas

### Stack
- **React 18** - Framework UI
- **TypeScript** - Type safety
- **Vite** - Build tool ultrarrápido
- **React Router v6** - Navigation
- **Recharts** - Visualización de datos
- **Lucide Icons** - Iconografía
- **CSS Modules** - Estilos componentes

### Diseño
- Tema oscuro profesional (Navy + Blue accent)
- Completamente responsive (mobile, tablet, desktop)
- Accesibilidad mejorada
- Animaciones fluidas

---

## 📊 Datos Mock

El portal incluye datos simulados realistas:
- **30+ Proyectos** en 5 países
- **8 Project Managers** activos
- **Presupuestos** con aprobado, ejecutado y forecast
- **Registros históricos** de capacity (6 meses)
- **Líneas de presupuesto** por tipo de gasto

---

## 🗂️ Estructura del Proyecto

```
src/
├── components/           # Componentes reutilizables
│   ├── Card.tsx
│   ├── KPIWidget.tsx
│   ├── ChartCard.tsx
│   ├── StatusBadge.tsx
│   ├── ProgressBar.tsx
│   ├── PageHeader.tsx
│   ├── Layout.tsx
│   ├── Sidebar.tsx
│   └── index.ts
├── pages/               # Páginas principales
│   ├── Dashboard.tsx
│   ├── Portfolio.tsx
│   ├── Budget.tsx
│   ├── Capacity.tsx
│   ├── PMSpace.tsx
│   ├── Explorer.tsx
│   ├── About.tsx
│   └── index.ts
├── data/                # Datos mock
│   ├── mockData.ts
│   └── index.ts
├── models/              # Tipos TypeScript
│   ├── types.ts
│   └── index.ts
├── App.tsx              # Router principal
├── App.css              # Estilos globales
├── main.tsx             # Entry point
└── index.css            # CSS global
```

---

## 🔑 Rutas Disponibles

| Ruta | Página |
|------|--------|
| `/` | Dashboard Ejecutivo |
| `/portfolio` | Portafolio de Proyectos |
| `/budget` | Presupuesto y Financiero |
| `/capacity` | Gestión de Capacity |
| `/pm-space` | Espacio PM |
| `/explorer` | Explorador PMO |
| `/about` | Acerca del Portal |

---

## 📈 KPIs Principales

El Dashboard muestra:
- Total de proyectos (Verde/Amarillo/Rojo)
- Presupuesto aprobado vs ejecutado
- Forecast y liberación potencial
- Utilización de capacidad de PMs
- Distribución por país y UDN

---

## ⚙️ Configuración

### Variables de Entorno
Actualmente no requiere variables de entorno. Usa datos mock locales.

### Personalización de Estilos
Los colores están definidos en `App.css`:
```css
--color-navy: #0f172a
--color-blue: #3b82f6
--color-green: #10b981
--color-red: #ef4444
--color-amber: #f59e0b
```

---

## 🛠️ Comandos Disponibles

```bash
npm run dev      # Inicia servidor de desarrollo
npm run build    # Compila para producción
npm run preview  # Vista previa del build
npm run lint     # Ejecuta ESLint
```

---

## 📝 Próximos Pasos (Futuros)

- [ ] Integración con backend API real
- [ ] Autenticación (OAuth/LDAP/SAML)
- [ ] Exportación a Excel/PDF
- [ ] Notificaciones en tiempo real
- [ ] Gráficos interactivos mejorados
- [ ] Dark/Light mode switcher
- [ ] Soporte multi-idioma
- [ ] Progressive Web App (PWA)

---

## 💡 Notas de Desarrollo

### Agregar Nueva Página
1. Crear archivo en `src/pages/NuevaPage.tsx`
2. Exportar en `src/pages/index.ts`
3. Agregar ruta en `src/App.tsx`
4. Agregar enlace en `src/components/Sidebar.tsx`

### Agregar Nuevo Componente
1. Crear archivo en `src/components/NuevoComponent.tsx`
2. Crear archivo de estilos `NuevoComponent.module.css`
3. Exportar en `src/components/index.ts`

### Agregar Datos Mock
1. Actualizar tipos en `src/models/types.ts`
2. Agregar datos en `src/data/mockData.ts`
3. Exportar en `src/data/index.ts`

---

## 🤝 Contacto y Soporte

**Email:** pmo@credicorpcapital.com

**Equipo PMO:**
- Juan García - Director
- María López - Coordinadora
- Carlos Rodríguez - Analista

---

## 📄 Licencia

Propiedad de Credicorp Capital. Todos los derechos reservados.

---

**Versión:** 1.0.0  
**Estado:** ✅ Listo para Producción  
**Última actualización:** Septiembre 2026
