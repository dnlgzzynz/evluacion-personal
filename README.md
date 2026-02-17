# Evaluación Personal — Daniel Yanez · BAC Consulting

Dashboard de evaluación profesional integral construido con React + Vite. Visualiza competencias en 10 perfiles de carrera, rastrea brechas de habilidades y genera system prompts de aprendizaje e investigación personalizados basados en la teoría de Inteligencias Múltiples de Gardner.

---

## Características

- **8 vistas** — Perfil personal, Vista general, Radar, Brechas, Detalle por perfil, Roadmap, Gardner, Prompts
- **10 perfiles profesionales** — BIM Management, Revit API, Obra/Construcción, Automatización, IA/ML, DevOps, Sustentabilidad, Diseño Paramétrico, Software Dev, Negocio
- **8 inteligencias Gardner** — evaluadas con indicadores, fortalezas y áreas de desarrollo
- **Sistema de prompts dual** — modo Aprendizaje (cerrar brechas) y modo Investigación (estado del arte + herramientas emergentes)
- **Prompts editables** — cada prompt es editable en el browser; los cambios se mantienen durante la sesión
- **Visual style** — paleta nature de BAC-app (forest green / lava orange / sky blue), glassmorphism, gradiente animado

---

## Stack

| Capa | Tecnología |
|---|---|
| Framework | React 19 + Vite 7 |
| Charts | Recharts |
| Tipografía | Outfit + Inter (Google Fonts) |
| Estilos | Inline styles + CSS custom properties |
| Linting | ESLint con react-hooks |

---

## Desarrollo

```bash
# Instalar dependencias
npm install

# Servidor de desarrollo (por defecto http://localhost:5173)
npm run dev

# Build de producción
npm run build

# Preview del build
npm run preview

# Linting
npm run lint
```

---

## Arquitectura

```
src/
├── main.jsx                          # Entry point (StrictMode)
├── App.jsx                           # Renderiza FullProfileDashboard
├── index.css                         # Reset global + fuentes + scrollbar + gradiente body
└── components/
    └── FullProfileDashboard.jsx      # Componente único (~1700 líneas)
        ├── const T                   # Tema de colores (paleta BAC-app)
        ├── const PROFILES[]          # 10 perfiles profesionales con skills
        ├── const GARDNER[]           # 8 inteligencias múltiples
        ├── generatePrompt()          # System prompts de aprendizaje (12 secciones)
        ├── generateResearchPrompt()  # System prompts de investigación (12 secciones)
        └── FullProfileDashboard()    # Componente principal con 8 vistas
```

### Vistas

| View state | Descripción |
|---|---|
| `perfil` | Landing con bio, BAC Consulting, stack tecnológico y stats |
| `overview` | Todos los perfiles ordenables por nivel / brecha / nombre |
| `radar` | RadarChart multi-perfil (actual vs objetivo) |
| `gaps` | BarChart horizontal de brechas por perfil |
| `detail` | Detalle completo de un perfil: skills, fortalezas, próximos pasos |
| `roadmap` | Plan de desarrollo Q1-Q3 2026 por fases |
| `gardner` | Radar + ranking + cards detalladas de inteligencias Gardner |
| `prompts` | System prompts editables — 4 modos: Aprendizaje, Investigación, Analista de Datos, Diagramas |

---

## Sistema de Prompts

Cada brecha identificada genera **4 prompts independientes**, uno por modo. Los edits de cada modo se guardan por separado durante la sesión.

| Modo | Icono | Color | Rol IA | Edit key prefix |
|---|---|---|---|---|
| Aprendizaje | 📚 | Forest green | Especialista técnico world-class | _(sin prefijo)_ |
| Investigación | 🔬 | Lava orange | Analista de tendencias / consultor innovación | `r-` |
| Analista de Datos | 📊 | Sky blue | Arquitecto de datos senior | `d-` |
| Diagramas | 📐 | Violeta | Arquitecto visual / documentación técnica | `dg-` |

---

### 📚 Aprendizaje
Objetivo: cerrar la brecha, dominar el skill con entregables concretos esta semana.

| # | Sección |
|---|---|
| 0 | Quick Win — tarea en 20-45 min con artefacto real |
| 1 | Glosario fundacional (tabla EN/ES + nivel) |
| 2 | Mapa conceptual (Mermaid graph) |
| 3 | Timeline histórico + tendencias 2025-2030 |
| 4 | Plan de estudio 4 semanas con checkpoints |
| 5 | Núcleo técnico / mecanismos cognitivos (Gardner) |
| 6 | Código funcional y herramientas (Python / C#) |
| 7 | Recursos seleccionados priorizados |
| 8 | Ejercicios progresivos con rúbrica (5 niveles) |
| 9 | Autoevaluación — 15 preguntas con respuestas |
| 10 | Flujo de aplicación en proyecto real (Mermaid flowchart) |
| 11 | Matriz de impacto estratégico BAC + ROI |
| 12 | Tablero de seguimiento post-sesión |

---

### 🔬 Investigación
Objetivo: ventaja informacional asimétrica — saber lo que la competencia no sabe todavía.

| # | Sección |
|---|---|
| 0 | Radar ahora mismo — señal más caliente últimos 6 meses |
| 1 | Estado del arte con métricas (TRL, adopción MX, tendencia) |
| 2 | Timeline 2023-2026 + desarrollos esperados |
| 3 | Herramientas emergentes vs establecidas — comparativa con veredicto |
| 4 | Papers, estándares y publicaciones clave priorizadas |
| 5 | Líderes, referentes, comunidades + top 3 cuentas a seguir |
| 6 | Casos pioneros en AEC (énfasis LATAM) |
| 7 | Gaps en el mercado mexicano + propuesta de posicionamiento BAC |
| 8 | Análisis adopción — costo/beneficio/riesgo + veredicto |
| 9 | Riesgos, obsolescencia y señales de alerta |
| 10 | Hoja de ruta de adopción BAC (Mermaid gantt) |
| 11 | Propuesta de investigación propia (nicho, hipótesis, output) |
| 12 | Sistema de monitoreo continuo — setup en 15 min |

---

### 📊 Analista de Datos
Objetivo: convertir el conocimiento del dominio en estructuras de datos precisas, normalizadas y relacionables con los otros 9 perfiles.

| # | Sección |
|---|---|
| 0 | Quick Schema — esqueleto SQL mínimo viable en 5 min |
| 1 | Inventario de entidades (maestro / transaccional / catálogo) |
| 2 | Atributos y tipos de datos con tabla completa + constraints |
| 3 | Relaciones y cardinalidades (Mermaid erDiagram) |
| 4 | Esquema normalizado 3NF completo con índices y FKs |
| 5 | Estándares de nomenclatura BAC (snake_case, UUID, soft-delete) |
| 6 | Tablas de catálogo y lookup con valores de ejemplo |
| 7 | Métricas y KPIs con queries SQL completas |
| 8 | Pipeline de datos (Mermaid flowchart: fuente → producción → consumo) |
| 9 | Conexiones inter-perfil + propuesta de esquema maestro BAC |
| 10 | Implementación en producción (PostgreSQL / Airtable / n8n) |
| 11 | 10 queries clave listas para usar |
| 12 | Mantenimiento y evolución del esquema (versioning, migraciones) |

---

### 📐 Diagramas
Objetivo: el diagrama perfecto para cada audiencia — todos en Mermaid (diagrams-as-code), exportables y mantenibles en el repositorio.

| # | Sección |
|---|---|
| 0 | Diagrama mínimo viable — máx 12 nodos, esencia del sistema |
| 1 | ER completo (Mermaid erDiagram + DBML para dbdiagram.io) |
| 2 | Diagrama de clases UML / diagrama de módulos |
| 3 | DFD nivel 0 (contexto) + nivel 1 (procesos internos) |
| 4 | Diagramas de secuencia — flujos principales |
| 5 | Arquitectura C4 nivel 1 (contexto) + nivel 2 (contenedores) |
| 6 | Diagrama de estados — ciclo de vida de objetos clave |
| 7 | Gantt de implementación (Mermaid gantt) |
| 8 | Mapa de dependencias inter-perfil BAC |
| 9 | Mapa mental del dominio (Mermaid mindmap) |
| 10 | Guía de exportación (Excalidraw / Notion / GitHub README) |
| 11 | Estructura diagrams-as-code en el repo de BAC |

---

## Modificar datos

### Añadir o editar un perfil
En `PROFILES` (línea ~18 de `FullProfileDashboard.jsx`):
```js
{
  id: "mi-perfil",
  name: "Nombre del Perfil",
  icon: "🔧",
  color: T.accent,           // o un hex directo
  description: "descripción corta",
  skills: [
    { name: "Habilidad", level: 70, target: 90 },
  ],
  strengths: ["fortaleza 1"],
  gaps: ["brecha 1"],
  nextSteps: ["paso 1"],
}
```

### Cambiar el tema de colores
Editar el objeto `T` al inicio del componente:
```js
const T = {
  bg: "linear-gradient(...)",
  card: "rgba(40, 45, 56, 0.6)",
  accent: "#4a9d4a",   // forest green — nivel alto
  purple: "#f97316",   // lava orange — highlight
  accentAlt: "#3b99f1", // sky blue — secundario
  // ...
};
```

---

## Decisiones de diseño

- **Monolítico intencional** — todo en `FullProfileDashboard.jsx` para editar datos en un solo lugar
- **Sin routing** — navegación por estado interno (`view`)
- **Sin base de datos** — datos estáticos hardcodeados, dashboard personal
- **Sin API calls** — carga instantánea, sin estados de loading
- **Inline styles** — 100% estilos inline referenciando el objeto `T`; no hay Tailwind ni CSS modules

---

## Licencia

Uso personal — Daniel Yanez / BAC Consulting · 2026