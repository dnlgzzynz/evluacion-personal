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
| `prompts` | System prompts editables en modo Aprendizaje o Investigación |

---

## Sistema de Prompts

Cada brecha identificada genera **dos prompts independientes**:

### Aprendizaje (`📚`)
12 secciones orientadas a cerrar la brecha:
- Quick Win (tarea en 20-45 min)
- Glosario fundacional
- Mapa conceptual (Mermaid)
- Timeline histórico
- Plan de estudio 4 semanas
- Núcleo técnico / mecanismos cognitivos
- Código y herramientas
- Recursos seleccionados
- Ejercicios progresivos con rúbrica
- Autoevaluación 15 preguntas
- Flujo de aplicación en proyecto real (Mermaid)
- Matriz de impacto estratégico BAC
- Tablero de seguimiento post-sesión

### Investigación (`🔬`)
12 secciones orientadas al estado del arte y oportunidades:
- Radar ahora mismo (señal más caliente 2025-2026)
- Estado del arte con métricas
- Timeline de desarrollos recientes
- Herramientas y plataformas emergentes
- Papers, estándares y publicaciones clave
- Líderes, referentes y comunidades
- Casos pioneros en AEC
- Gaps en el mercado mexicano
- Análisis de adopción (costo/beneficio/riesgo)
- Riesgos y obsolescencia
- Hoja de ruta de adopción para BAC (Mermaid gantt)
- Propuesta de investigación propia
- Sistema de monitoreo continuo

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