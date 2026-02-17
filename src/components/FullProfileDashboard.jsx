import { useState, useMemo } from "react";
import {
  RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar,
  ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid,
  Tooltip, Cell, Legend, PieChart, Pie,
} from "recharts";

const T = {
  bg: "linear-gradient(135deg, #0a1f0a 0%, #172b52 50%, #282d38 100%)",
  card: "rgba(40, 45, 56, 0.6)",
  cardAlt: "rgba(40, 45, 56, 0.8)",
  accent: "#4a9d4a",           // forest-400 — nivel alto
  accentDim: "rgba(74, 157, 74, 0.14)",
  accentAlt: "#3b99f1",        // sky-500
  purple: "#f97316",           // lava-500 — highlight principal
  purpleDim: "rgba(249, 115, 22, 0.14)",
  warning: "#f97316",          // lava-500 — nivel medio
  warningDim: "rgba(249, 115, 22, 0.14)",
  danger: "#ef4444",
  dangerDim: "rgba(239, 68, 68, 0.14)",
  text: "#eef1f5",             // mountain-100
  textDim: "#8593ad",          // mountain-500
  border: "rgba(255, 255, 255, 0.1)",
  gold: "#f97316",
  goldDim: "rgba(249, 115, 22, 0.14)",
};

const PROFILES = [
  {
    id: "bim-mgmt",
    name: "BIM Management",
    icon: "🏗️",
    color: T.accent,
    description: "ISO 19650, BEP, CDE, coordinación multidisciplinaria",
    skills: [
      { name: "ISO 19650-1/2/3", level: 88, target: 95 },
      { name: "BEP / MIDP / TIDP", level: 85, target: 92 },
      { name: "CDE Management", level: 80, target: 90 },
      { name: "Clash Detection / BCF", level: 82, target: 90 },
      { name: "LOD/LOI Specifications", level: 78, target: 88 },
      { name: "Stakeholder Coordination", level: 85, target: 90 },
      { name: "Model Federation (IFC)", level: 75, target: 88 },
      { name: "QA/QC BIM Audits", level: 72, target: 85 },
    ],
    strengths: ["Visión ISO 19650 end-to-end", "Diseño de BEPs completos", "Workflows CDE multi-plataforma"],
    gaps: ["Auditoría formal ISO certificada", "IFC avanzado (MVD, validación)", "COBie para FM"],
    nextSteps: [
      "Certificación buildingSMART Professional",
      "Implementar TIDP automatizado con n8n",
      "Crear template QA/QC auditoría BIM reusable",
    ],
  },
  {
    id: "revit-dev",
    name: "Revit API & Automation",
    icon: "⚙️",
    color: T.accentAlt,
    description: "C# Add-ins, PyRevit, Dynamo, MCP Revit server",
    skills: [
      { name: "PyRevit Extensions", level: 75, target: 88 },
      { name: "C# .NET Revit API", level: 65, target: 85 },
      { name: "Dynamo Visual Prog.", level: 70, target: 82 },
      { name: "MCP Revit Server", level: 78, target: 90 },
      { name: "Family Creation (API)", level: 60, target: 80 },
      { name: "Revit ↔ External Data", level: 80, target: 90 },
      { name: "Schedules & Parameters", level: 82, target: 88 },
      { name: "View/Sheet Automation", level: 68, target: 82 },
    ],
    strengths: ["Conexión Revit-Claude vía MCP", "PyRevit scripting operativo", "Data export a Airtable/APIs"],
    gaps: ["C# avanzado (External Events, Updaters)", "Familias adaptivas por API", "Add-in packaging/distribución"],
    nextSteps: [
      "Completar plugin C# distribuible con UI WPF",
      "Dominar External DB Events para sync tiempo real",
      "Crear library PyRevit reutilizable por proyecto",
    ],
  },
  {
    id: "construction",
    name: "Dirección de Obra",
    icon: "🔨",
    color: T.warning,
    description: "EPC, supervisión, control de avance, Metro L4/L6",
    skills: [
      { name: "Supervisión de Obra", level: 85, target: 92 },
      { name: "Control de Avance/Calidad", level: 80, target: 90 },
      { name: "Gestión de Riesgos", level: 75, target: 88 },
      { name: "Valor Ganado (EVM)", level: 65, target: 82 },
      { name: "Planeación (Primavera/MSP)", level: 60, target: 80 },
      { name: "Normativa MX (NOM/NMX)", level: 78, target: 88 },
      { name: "Seguridad Industrial", level: 70, target: 85 },
      { name: "Contratos y Estimaciones", level: 72, target: 85 },
    ],
    strengths: ["Experiencia en mega-proyectos (Metro)", "Integración BIM-obra real", "Coordinación multidisciplinaria en campo"],
    gaps: ["EVM formal con curva S avanzada", "Lean Construction (Last Planner)", "4D/5D simulation (Synchro/Navisworks)"],
    nextSteps: [
      "Implementar Lean/Last Planner en proyecto piloto",
      "Dashboard Power BI con métricas EVM en tiempo real",
      "Automatizar reportes de supervisión con IA + fotos",
    ],
  },
  {
    id: "automation",
    name: "Workflow & Automation",
    icon: "🔄",
    color: T.purple,
    description: "n8n, Airtable, webhooks, integración de sistemas",
    skills: [
      { name: "n8n Workflow Design", level: 82, target: 90 },
      { name: "Airtable (CRUD, Views)", level: 80, target: 88 },
      { name: "Webhook Architecture", level: 78, target: 88 },
      { name: "API Integration", level: 75, target: 88 },
      { name: "Error Handling / Retry", level: 60, target: 82 },
      { name: "Google Workspace APIs", level: 72, target: 82 },
      { name: "MCP Server Config", level: 85, target: 92 },
      { name: "Batch Processing", level: 65, target: 80 },
    ],
    strengths: ["13+ MCP servers configurados", "n8n CRUD funcional para Airtable", "Claude como orquestador vía MCP"],
    gaps: ["Manejo robusto de errores en cascada", "Testing automatizado de workflows", "Monitoreo/alertas (Grafana/alertmanager)"],
    nextSteps: [
      "Implementar circuit breaker en workflows n8n",
      "Crear test suite para endpoints CRUD",
      "Dashboard de monitoreo de workflows activos",
    ],
  },
  {
    id: "ai-ml",
    name: "IA & Machine Learning",
    icon: "🤖",
    color: "#06d6a0",
    description: "Vertex AI, RAG, agentes, neural networks, ONNX",
    skills: [
      { name: "Claude AI (MCP/API)", level: 88, target: 95 },
      { name: "RAG for BIM Docs", level: 65, target: 85 },
      { name: "Vertex AI / Gemini", level: 55, target: 80 },
      { name: "Neural Networks (PyTorch)", level: 40, target: 70 },
      { name: "Document AI / OCR", level: 50, target: 78 },
      { name: "Computer Vision (Obra)", level: 45, target: 75 },
      { name: "LangGraph / Agents", level: 35, target: 72 },
      { name: "Vector Search / Embeddings", level: 45, target: 78 },
    ],
    strengths: ["Integración Claude-BIM única en el mercado", "Visión clara de IA aplicada a AEC", "Prototipado rápido con Flowise/n8n"],
    gaps: ["Fine-tuning de modelos propios", "MLOps/pipeline productivo", "Computer Vision para inspección de obra"],
    nextSteps: [
      "PoC: RAG con documentos ISO 19650 + normas NOM",
      "Pipeline CV para fotos de obra → detección de progreso",
      "Curso DeepLearning.AI: AI Agents in LangGraph",
    ],
  },
  {
    id: "devops",
    name: "DevOps & Infraestructura",
    icon: "🐳",
    color: "#4ecdc4",
    description: "Docker, CI/CD, servidores, Hostinger, contenedores",
    skills: [
      { name: "Docker / Compose", level: 75, target: 85 },
      { name: "Linux Server Admin", level: 65, target: 80 },
      { name: "CI/CD (GitHub Actions)", level: 50, target: 78 },
      { name: "Hosting / DNS / SSL", level: 70, target: 80 },
      { name: "Networking Basics", level: 60, target: 75 },
      { name: "Monitoring (Grafana)", level: 30, target: 70 },
      { name: "Security (SSH, certs)", level: 55, target: 78 },
      { name: "Kubernetes Basics", level: 20, target: 55 },
    ],
    strengths: ["Docker Compose multi-servicio funcional", "MCP servers en producción", "Hostinger VPS configurado"],
    gaps: ["Observabilidad (OpenTelemetry, Grafana)", "CI/CD automatizado para add-ins", "Kubernetes para escalar"],
    nextSteps: [
      "Implementar stack de monitoreo (Grafana + Loki)",
      "CI/CD pipeline para PyRevit + Revit add-ins",
      "Securizar n8n con reverse proxy + auth",
    ],
  },
  {
    id: "sustainability",
    name: "Sustentabilidad",
    icon: "🌱",
    color: "#2ecc71",
    description: "LEED, EDGE, WELL, BOMA BEST, simulación energética",
    skills: [
      { name: "LEED v4.1 (BD+C)", level: 78, target: 88 },
      { name: "EDGE Certification", level: 75, target: 85 },
      { name: "WELL v2 Standard", level: 65, target: 80 },
      { name: "Energy Modeling", level: 55, target: 78 },
      { name: "LCA / Materials", level: 50, target: 72 },
      { name: "Passive Strategies", level: 72, target: 85 },
      { name: "Daylighting Analysis", level: 60, target: 78 },
      { name: "Water Efficiency", level: 55, target: 72 },
    ],
    strengths: ["Conocimiento multi-certificación", "Integración BIM-sustentabilidad", "Estrategias pasivas en diseño"],
    gaps: ["Simulación energética avanzada (IES-VE)", "WELL AP certificación", "LCA con herramientas digitales (Tally)"],
    nextSteps: [
      "Obtener LEED Green Associate credential",
      "Integrar Insight/Sefaira en workflow Revit",
      "Template Airtable para tracking créditos LEED",
    ],
  },
  {
    id: "parametric",
    name: "Diseño Paramétrico",
    icon: "🔷",
    color: "#e056a0",
    description: "Grasshopper, Dynamo, Rhino.Inside, diseño generativo",
    skills: [
      { name: "Grasshopper (GH)", level: 65, target: 82 },
      { name: "Rhino.Inside.Revit", level: 60, target: 80 },
      { name: "Dynamo for Revit", level: 70, target: 82 },
      { name: "Galapagos/Wallacei", level: 40, target: 68 },
      { name: "Karamba3D (Structural)", level: 35, target: 62 },
      { name: "Ladybug Tools", level: 55, target: 75 },
      { name: "Kangaroo Physics", level: 30, target: 58 },
      { name: "nTopology", level: 25, target: 50 },
    ],
    strengths: ["Rhino.Inside para museo conceptual", "Dynamo-Revit operativo", "Conocimiento de plugins clave"],
    gaps: ["Optimización multi-objetivo (Wallacei)", "Análisis estructural paramétrico", "Fabricación digital (nTopology)"],
    nextSteps: [
      "Proyecto piloto: Fachada paramétrica con GH→Revit",
      "Curso Wallacei para optimización evolutiva",
      "Integrar Ladybug con workflow ambiental",
    ],
  },
  {
    id: "software-dev",
    name: "Desarrollo de Software",
    icon: "💻",
    color: "#ff6b6b",
    description: "Python, C#, TypeScript, React, FastAPI, fullstack",
    skills: [
      { name: "Python (Scripts/Auto)", level: 78, target: 88 },
      { name: "C# / .NET", level: 60, target: 80 },
      { name: "TypeScript / React", level: 55, target: 75 },
      { name: "HTML/CSS/Frontend", level: 58, target: 72 },
      { name: "REST API Design", level: 70, target: 85 },
      { name: "SQL / NoSQL", level: 55, target: 75 },
      { name: "Git / Version Control", level: 72, target: 82 },
      { name: "Testing / QA", level: 35, target: 65 },
    ],
    strengths: ["Python para automatización BIM", "Integración multi-lenguaje", "Prototipado rápido funcional"],
    gaps: ["Testing/TDD disciplinado", "TypeScript avanzado", "Arquitectura de software patterns"],
    nextSteps: [
      "Adoptar pytest para scripts Python críticos",
      "Proyecto React completo con TypeScript strict",
      "Estudiar Clean Architecture para add-ins Revit",
    ],
  },
  {
    id: "business",
    name: "Negocio & Consultoría",
    icon: "📊",
    color: T.gold,
    description: "CEO BAC, propuestas, productización, posicionamiento",
    skills: [
      { name: "Propuestas Técnicas", level: 82, target: 90 },
      { name: "Productización BIM", level: 70, target: 85 },
      { name: "Pricing / Revenue Model", level: 65, target: 82 },
      { name: "Marketing Digital", level: 50, target: 72 },
      { name: "Networking AEC", level: 72, target: 85 },
      { name: "Gestión de Clientes", level: 78, target: 88 },
      { name: "WordPress / Web", level: 55, target: 70 },
      { name: "Thought Leadership", level: 45, target: 75 },
    ],
    strengths: ["Propuestas ganadoras (SGS/Metro)", "Visión clara de servicio BIM+IA", "10+ años experiencia AEC"],
    gaps: ["Contenido/posicionamiento digital", "Escalabilidad de servicios", "Delegación y equipo"],
    nextSteps: [
      "Publicar 2 artículos técnicos LinkedIn/blog BAC",
      "Crear paquete productizado: 'BIM Starter Kit'",
      "Automatizar onboarding de clientes con n8n",
    ],
  },
];

const GARDNER = [
  {
    id: "espacial",
    name: "Espacial-Visual",
    icon: "🧊",
    color: "#00b4d8",
    level: 88,
    description: "Visualización 3D, orientación espacial, diseño, mapas mentales",
    indicators: [
      { name: "Modela en 3D con fluidez (Revit, Rhino)", present: true },
      { name: "Piensa en planos y secciones naturalmente", present: true },
      { name: "Diseño paramétrico y generativo", present: true },
      { name: "Lectura rápida de planos complejos", present: true },
      { name: "Orientación espacial en obra", present: true },
      { name: "Dibujo a mano alzada expresivo", present: false },
    ],
    strengths: ["Dominio de herramientas BIM 3D", "Coordinación espacial multi-disciplina", "Pensamiento volumétrico innato de arquitecto"],
    development: ["Sketching rápido conceptual", "Realidad virtual/aumentada inmersiva", "Diseño generativo con IA"],
  },
  {
    id: "logico-matematica",
    name: "Lógico-Matemática",
    icon: "🧮",
    color: "#a78bfa",
    level: 82,
    description: "Razonamiento abstracto, patrones, resolución de problemas, código",
    indicators: [
      { name: "Programa en múltiples lenguajes", present: true },
      { name: "Diseña workflows lógicos complejos", present: true },
      { name: "Automatiza procesos repetitivos", present: true },
      { name: "Resuelve problemas de integración API", present: true },
      { name: "Análisis de datos estructurados", present: true },
      { name: "Matemática avanzada / estadística", present: false },
    ],
    strengths: ["Automatización Python/C#/n8n", "Arquitectura de integraciones MCP", "Pensamiento algorítmico para BIM"],
    development: ["Estadística y ML formal", "Optimización matemática", "Análisis numérico avanzado"],
  },
  {
    id: "interpersonal",
    name: "Interpersonal",
    icon: "🤝",
    color: "#00e5a0",
    level: 78,
    description: "Empatía, liderazgo, trabajo en equipo, persuasión, negociación",
    indicators: [
      { name: "Coordina equipos multidisciplinarios", present: true },
      { name: "Negocia con clientes y stakeholders", present: true },
      { name: "Presenta propuestas técnicas ganadoras", present: true },
      { name: "Facilita reuniones de coordinación BIM", present: true },
      { name: "Delega efectivamente en equipo", present: false },
      { name: "Mentoría formal a juniors", present: false },
    ],
    strengths: ["Coordinación BIM multi-stakeholder", "Propuestas ganadoras (SGS/Metro)", "Comunicación técnica clara"],
    development: ["Delegación y formación de equipo", "Mentoría estructurada", "Liderazgo en comunidades AEC"],
  },
  {
    id: "linguistica",
    name: "Lingüística-Verbal",
    icon: "📝",
    color: "#f59e0b",
    level: 75,
    description: "Habilidad con palabras, escritura técnica, argumentación, documentación",
    indicators: [
      { name: "Redacta BEPs y documentos ISO", present: true },
      { name: "Escribe propuestas técnicas claras", present: true },
      { name: "Documenta procesos y workflows", present: true },
      { name: "Argumenta decisiones técnicas", present: true },
      { name: "Publica artículos técnicos", present: false },
      { name: "Oratoria / conferencias en público", present: false },
    ],
    strengths: ["Documentación BEP/ISO profesional", "Propuestas técnicas estructuradas", "Prompts precisos para IA"],
    development: ["Thought leadership / publicaciones", "Presentaciones en conferencias AEC", "Contenido educativo (blog/video)"],
  },
  {
    id: "intrapersonal",
    name: "Intrapersonal",
    icon: "🧠",
    color: "#e056a0",
    level: 72,
    description: "Autoconocimiento, disciplina, reflexión, regulación emocional",
    indicators: [
      { name: "Autodidacta consistente (25h/sem)", present: true },
      { name: "Planifica desarrollo profesional propio", present: true },
      { name: "Reconoce fortalezas y brechas", present: true },
      { name: "Gestiona múltiples proyectos simultáneos", present: true },
      { name: "Práctica de mindfulness/reflexión", present: false },
      { name: "Journaling / revisión periódica formal", present: false },
    ],
    strengths: ["Disciplina autodidacta excepcional", "Autoevaluación honesta de competencias", "Capacidad de aprendizaje multi-dominio"],
    development: ["Reflexión estructurada (journaling)", "Balance vida-trabajo consciente", "Gestión del estrés y energía"],
  },
  {
    id: "naturalista",
    name: "Naturalista",
    icon: "🌿",
    color: "#2ecc71",
    level: 68,
    description: "Conexión con el entorno, clasificación, observación, sustentabilidad",
    indicators: [
      { name: "Conocimiento LEED/EDGE/WELL", present: true },
      { name: "Aplica estrategias pasivas en diseño", present: true },
      { name: "Clasifica y organiza información compleja", present: true },
      { name: "Sensibilidad al contexto ambiental", present: true },
      { name: "Simulación energética avanzada", present: false },
      { name: "Experiencia en campo / ecología", present: false },
    ],
    strengths: ["Multi-certificación sustentable", "Integración BIM-sustentabilidad", "Estrategias pasivas en diseño arquitectónico"],
    development: ["Simulación energética profunda", "LCA con herramientas digitales", "Bioclimática avanzada"],
  },
  {
    id: "corporal",
    name: "Corporal-Kinestésica",
    icon: "🏃",
    color: "#4ecdc4",
    level: 55,
    description: "Coordinación física, manualidad, expresión corporal, presencia en obra",
    indicators: [
      { name: "Supervisión activa en campo/obra", present: true },
      { name: "Manejo de herramientas y equipos", present: true },
      { name: "Resistencia en recorridos de obra", present: true },
      { name: "Actividad física regular", present: false },
      { name: "Deporte competitivo", present: false },
      { name: "Expresión corporal / danza", present: false },
    ],
    strengths: ["Presencia efectiva en obra", "Inspección visual de campo", "Resistencia en mega-proyectos"],
    development: ["Rutina de actividad física", "Ergonomía en trabajo de oficina", "Mindfulness corporal"],
  },
  {
    id: "musical",
    name: "Musical-Rítmica",
    icon: "🎵",
    color: "#ff6b6b",
    level: 35,
    description: "Percepción de ritmo, tono, armonía, sensibilidad sonora",
    indicators: [
      { name: "Sensibilidad a acústica arquitectónica", present: true },
      { name: "Usa música para concentración", present: true },
      { name: "Toca un instrumento musical", present: false },
      { name: "Compone o produce música", present: false },
      { name: "Canta afinado", present: false },
      { name: "Reconoce patrones rítmicos complejos", present: false },
    ],
    strengths: ["Conciencia acústica en diseño", "Uso de música como herramienta de productividad"],
    development: ["Explorar instrumento musical", "Acústica arquitectónica formal", "Diseño sonoro de espacios"],
  },
];

const getAvg = (skills) => Math.round(skills.reduce((s, sk) => s + sk.level, 0) / skills.length);
const getTargetAvg = (skills) => Math.round(skills.reduce((s, sk) => s + sk.target, 0) / skills.length);
const getGap = (skills) => getTargetAvg(skills) - getAvg(skills);
const getLevelColor = (v) => v >= 75 ? T.accent : v >= 55 ? T.warning : T.danger;
const getLevelLabel = (v) => v >= 80 ? "Avanzado" : v >= 65 ? "Intermedio+" : v >= 50 ? "Intermedio" : v >= 35 ? "Básico+" : "Inicial";

const Pill = ({ children, bg, color }) => (
  <span style={{
    display: "inline-block", padding: "2px 8px", borderRadius: 6,
    fontSize: 10, fontWeight: 600, background: bg, color,
  }}>{children}</span>
);

const SkillBar = ({ skill, maxWidth = 200 }) => (
  <div style={{ marginBottom: 6 }}>
    <div style={{ display: "flex", justifyContent: "space-between", fontSize: 11, marginBottom: 2 }}>
      <span style={{ color: T.textDim }}>{skill.name}</span>
      <span style={{ color: getLevelColor(skill.level), fontWeight: 600 }}>{skill.level}%</span>
    </div>
    <div style={{ height: 6, background: T.border, borderRadius: 3, position: "relative" }}>
      <div style={{
        height: "100%", borderRadius: 3, width: `${skill.level}%`,
        background: `linear-gradient(90deg, ${getLevelColor(skill.level)}88, ${getLevelColor(skill.level)})`,
        transition: "width 0.6s ease",
      }} />
      <div style={{
        position: "absolute", top: -2, left: `${skill.target}%`, width: 2, height: 10,
        background: T.textDim, borderRadius: 1, opacity: 0.6,
      }} />
    </div>
  </div>
);

export default function FullProfileDashboard() {
  const [view, setView] = useState("perfil");
  const [selectedProfile, setSelectedProfile] = useState(null);
  const [sortBy, setSortBy] = useState("level");
  const [promptEdits, setPromptEdits] = useState({});
  const [copiedId, setCopiedId] = useState(null);
  const [promptFilter, setPromptFilter] = useState("all");

  const overviewData = useMemo(() =>
    PROFILES.map(p => ({
      name: p.name.length > 14 ? p.name.slice(0, 12) + "…" : p.name,
      fullName: p.name,
      level: getAvg(p.skills),
      gap: getGap(p.skills),
      color: p.color,
      icon: p.icon,
    })), []
  );

  const radarData = useMemo(() =>
    PROFILES.map(p => ({
      subject: p.icon + " " + (p.name.length > 12 ? p.name.slice(0, 10) + "…" : p.name),
      actual: getAvg(p.skills),
      objetivo: getTargetAvg(p.skills),
    })), []
  );

  const globalAvg = Math.round(overviewData.reduce((s, d) => s + d.level, 0) / overviewData.length);
  const topProfile = overviewData.reduce((a, b) => a.level > b.level ? a : b);
  const biggestGap = overviewData.reduce((a, b) => a.gap > b.gap ? a : b);

  const sortedOverview = useMemo(() => {
    const arr = [...overviewData];
    if (sortBy === "level") arr.sort((a, b) => b.level - a.level);
    else if (sortBy === "gap") arr.sort((a, b) => b.gap - a.gap);
    else arr.sort((a, b) => a.fullName.localeCompare(b.fullName));
    return arr;
  }, [sortBy, overviewData]);

  const pieData = useMemo(() => {
    const adv = overviewData.filter(d => d.level >= 75).length;
    const mid = overviewData.filter(d => d.level >= 55 && d.level < 75).length;
    const bas = overviewData.filter(d => d.level < 55).length;
    return [
      { name: "Avanzado (≥75%)", value: adv, color: T.accent },
      { name: "Intermedio (55-74%)", value: mid, color: T.warning },
      { name: "En desarrollo (<55%)", value: bas, color: T.danger },
    ].filter(d => d.value > 0);
  }, [overviewData]);

  const generatePrompt = (source, gapTitle, context) => {
    return `Eres un tutor experto en ${context.domain}. Tu alumno es Daniel, arquitecto mexicano con 10+ años en AEC, CEO de BAC (consultoría BIM+IA). Actualmente tiene nivel ${context.currentLevel} en esta área.

## BRECHA A CERRAR
"${gapTitle}"

## CONTEXTO DEL ALUMNO
- Perfil: ${context.profileName} (${context.profileDesc})
- Nivel actual promedio del perfil: ${context.avgLevel}%
- Fortalezas relacionadas: ${context.strengths}
- Estilo de aprendizaje: autodidacta intensivo (25h/semana), aprende mejor con ejemplos prácticos y proyectos reales
- Herramientas que ya domina: ${context.tools}

## FORMATO DE RESPUESTA OBLIGATORIO
Usa TODOS estos formatos para maximizar la comprensión y retención:
- **Tablas** comparativas y de resumen (markdown tables) para organizar información
- **Diagramas** en texto (flowcharts, árboles, mapas mentales usando ASCII/markdown o descripciones para Mermaid)
- **Líneas del tiempo** cuando haya evolución histórica o secuencias de aprendizaje
- **Fórmulas y cálculos** cuando aplique (notación matemática clara con explicación paso a paso)
- **Gráficas descriptivas** (describe ejes, datos y tendencias para que pueda visualizar o recrear)
- **Glosario técnico** al final de cada sección mayor con términos clave EN→ES
- **Código de ejemplo** cuando sea relevante (Python, C#, pseudocódigo) con comentarios explicativos
- **Analogías y metáforas** conectadas al mundo AEC/arquitectura para anclar conceptos abstractos

## LO QUE NECESITO QUE HAGAS

### 1. GLOSARIO FUNDACIONAL
Antes de comenzar, presenta una **tabla de glosario** con los 10-15 términos clave de este tema:
| Término (EN) | Término (ES) | Definición | Relevancia AEC |
|---|---|---|---|
Incluye acrónimos, estándares y conceptos que aparecerán en toda la lección.

### 2. MAPA CONCEPTUAL CON DIAGRAMA
Explica los conceptos clave organizados de fundamental → avanzado.
- Presenta un **diagrama de árbol o mapa mental** (en formato texto/ASCII) mostrando las relaciones entre conceptos
- Para cada concepto incluye: definición, relevancia AEC/BIM, conexión con lo que ya sé
- Usa una **tabla resumen** al final:
| Concepto | Nivel | Prerequisito | Conexión con mi perfil |
|---|---|---|---|

### 3. LÍNEA DEL TIEMPO Y CONTEXTO HISTÓRICO
- **Timeline** de cómo evolucionó este tema/tecnología/estándar
- Marca los hitos clave y dónde estamos hoy
- Formato: año → evento → impacto en AEC
- Incluye hacia dónde va la tendencia (futuro próximo)

### 4. PLAN DE ESTUDIO ESTRUCTURADO
Diseña un plan de 4 semanas (5h/semana) presentado como **tabla**:
| Semana | Tema | Actividad | Entregable | Horas |
|---|---|---|---|---|
- Semana 1: Fundamentos, vocabulario y contexto histórico
- Semana 2: Conceptos intermedios, fórmulas clave y primeros ejercicios
- Semana 3: Aplicación práctica en proyecto real AEC
- Semana 4: Consolidación, caso integrador y autoevaluación

### 5. FÓRMULAS, CÁLCULOS Y LÓGICA
Si aplican fórmulas o cálculos en este tema:
- Presenta cada fórmula con **notación clara**
- Incluye un **ejemplo resuelto paso a paso** con datos reales de un proyecto AEC
- Muestra una **tabla de variables** con unidades y rangos típicos
- Si no aplican fórmulas matemáticas, incluye **frameworks lógicos**, diagramas de decisión o matrices de evaluación relevantes

### 6. RECURSOS RECOMENDADOS
Presenta como **tabla comparativa**:
| Recurso | Tipo | Nivel | Idioma | Costo | URL/Referencia |
|---|---|---|---|---|---|
- 3 artículos/papers fundamentales
- 2 cursos o tutoriales específicos
- 1 libro de referencia
- Canales/comunidades relevantes
- Herramientas/software para practicar

### 7. EJERCICIOS PROGRESIVOS CON RÚBRICA
Diseña 5 ejercicios ordenados por dificultad. Para cada uno incluye:
- **Enunciado** claro y contextualizado en AEC
- **Datos de entrada** (si aplica, con tablas o valores específicos)
- **Criterios de evaluación** (rúbrica en tabla)
- **Pista** si me atoro

| Ejercicio | Nivel | Tipo | Competencia evaluada |
|---|---|---|---|
| 1 | Básico | Definir/explicar con glosario propio | Comprensión |
| 2 | Intermedio | Aplicación con cálculo o diagrama | Aplicación |
| 3 | Intermedio+ | Análisis de caso real AEC con tabla comparativa | Análisis |
| 4 | Avanzado | Problema complejo con múltiples variables | Síntesis |
| 5 | Integrador | Proyecto conectado a BIM/AEC con entregable | Evaluación |

### 8. PRUEBA DE AUTOEVALUACIÓN
15 preguntas organizadas en tabla:
| # | Pregunta | Tipo | Dificultad |
|---|---|---|---|
- 5 opción múltiple (conceptos clave)
- 5 verdadero/falso con justificación
- 3 respuesta corta (aplicación)
- 2 resolución de problema (con cálculos o diagramas)
Incluye **tabla de respuestas** con explicación al final.

### 9. DIAGRAMA DE FLUJO: APLICACIÓN PRÁCTICA
Presenta un **diagrama de flujo** (en texto/Mermaid) de cómo aplicar este conocimiento en un proyecto real:
- Desde: recibir un requerimiento del cliente
- Hasta: entregable completado
- Incluye: puntos de decisión, herramientas a usar, validaciones

### 10. CONEXIONES ESTRATÉGICAS
Presenta como **matriz de impacto**:
| Competencia conectada | Tipo de sinergia | Impacto en BAC | Prioridad |
|---|---|---|---|
- Cómo potencia mis otras competencias
- Oportunidades de negocio para BAC
- Diferenciación en el mercado AEC mexicano
- ROI estimado de dominar este tema

### 11. SIGUIENTE ITERACIÓN (BUCLE DE MEJORA)
Basándote en el contenido entregado:
- **Diagrama de ruta** de aprendizaje: este tema → siguiente tema → meta
- **Tabla de autoevaluación** para que llene después de completar los ejercicios:
| Concepto | Lo entendí (1-5) | Lo puedo aplicar (1-5) | Necesito reforzar |
|---|---|---|---|
- Qué profundizar más según mis respuestas
- Qué brecha atacar después y por qué
- Prompt sugerido para la siguiente iteración (que yo copie y pegue de vuelta)

Responde en español. Sé directo, práctico y orientado a resultados. Usa formato markdown rico con tablas, diagramas y estructura visual clara.`;
  };

  const allGaps = useMemo(() => {
    const gaps = [];
    PROFILES.forEach(p => {
      const avg = getAvg(p.skills);
      p.gaps.forEach((g, i) => {
        const key = `profile-${p.id}-gap-${i}`;
        gaps.push({
          key,
          type: "profile",
          source: p.name,
          sourceIcon: p.icon,
          sourceColor: p.color,
          title: g,
          prompt: generatePrompt("profile", g, {
            domain: p.description,
            profileName: p.name,
            profileDesc: p.description,
            currentLevel: getLevelLabel(avg),
            avgLevel: avg,
            strengths: p.strengths.join("; "),
            tools: p.skills.filter(s => s.level >= 70).map(s => s.name).join(", ") || "en desarrollo",
          }),
        });
      });
      const sortedSkills = [...p.skills].sort((a, b) => (b.target - b.level) - (a.target - a.level));
      sortedSkills.slice(0, 2).forEach((sk, i) => {
        const gap = sk.target - sk.level;
        if (gap >= 15) {
          const key = `profile-${p.id}-skill-${i}`;
          gaps.push({
            key,
            type: "skill",
            source: p.name,
            sourceIcon: p.icon,
            sourceColor: p.color,
            title: `${sk.name} (${sk.level}% → ${sk.target}%, gap: ${gap}pts)`,
            prompt: generatePrompt("skill", sk.name, {
              domain: p.description,
              profileName: p.name,
              profileDesc: p.description,
              currentLevel: `${sk.level}% (objetivo: ${sk.target}%)`,
              avgLevel: avg,
              strengths: p.strengths.join("; "),
              tools: p.skills.filter(s => s.level >= 70).map(s => s.name).join(", ") || "en desarrollo",
            }),
          });
        }
      });
    });
    GARDNER.forEach((g, gi) => {
      g.development.forEach((d, i) => {
        const key = `gardner-${g.id}-dev-${i}`;
        gaps.push({
          key,
          type: "gardner",
          source: g.name,
          sourceIcon: g.icon,
          sourceColor: g.color,
          title: d,
          prompt: generatePrompt("gardner", d, {
            domain: `inteligencia ${g.name.toLowerCase()} (Gardner)`,
            profileName: `Inteligencia ${g.name}`,
            profileDesc: g.description,
            currentLevel: `${g.level}% - ${getLevelLabel(g.level)}`,
            avgLevel: g.level,
            strengths: g.strengths.join("; "),
            tools: g.indicators.filter(ind => ind.present).map(ind => ind.name).join(", "),
          }),
        });
      });
    });
    return gaps;
  }, []);

  const filteredGaps = useMemo(() => {
    if (promptFilter === "all") return allGaps;
    if (promptFilter === "gardner") return allGaps.filter(g => g.type === "gardner");
    return allGaps.filter(g => g.type !== "gardner" && g.source === promptFilter);
  }, [allGaps, promptFilter]);

  const copyToClipboard = (key, text) => {
    navigator.clipboard.writeText(text).then(() => {
      setCopiedId(key);
      setTimeout(() => setCopiedId(null), 2000);
    });
  };

  const sp = selectedProfile ? PROFILES.find(p => p.id === selectedProfile) : null;

  const CustomTooltip = ({ active, payload }) => {
    if (!active || !payload?.length) return null;
    return (
      <div style={{ background: T.cardAlt, backdropFilter: "blur(16px)", WebkitBackdropFilter: "blur(16px)", border: `1px solid ${T.border}`, borderRadius: 10, padding: "8px 12px", fontSize: 12, color: T.text, boxShadow: "0 8px 32px rgba(0,0,0,0.4)" }}>
        {payload.map((p, i) => (
          <div key={i} style={{ color: p.color || p.fill, margin: "2px 0" }}>
            {p.name}: <strong>{p.value}%</strong>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div style={{ fontFamily: "'Outfit', 'Inter', 'Segoe UI', system-ui, sans-serif", background: T.bg, backgroundAttachment: "fixed", color: T.text, minHeight: "100vh", padding: "20px 12px" }}>

      {/* Header */}
      <div style={{ textAlign: "center", marginBottom: 24 }}>
        <div style={{ display: "inline-block", padding: "4px 14px", background: T.purpleDim, borderRadius: 999, fontSize: 10, color: T.purple, letterSpacing: 2, textTransform: "uppercase", fontWeight: 700, marginBottom: 10, border: `1px solid rgba(249,115,22,0.25)`, boxShadow: `0 0 12px rgba(var(--lava-glow), 0.2)` }}>
          BAC · Evaluación Integral de Perfiles
        </div>
        <h1 style={{ fontSize: 24, fontWeight: 800, margin: "6px 0", background: `linear-gradient(135deg, ${T.accent}, ${T.accentAlt}, ${T.purple})`, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
          Daniel — Arquitecto AEC / CEO BAC
        </h1>
        <p style={{ color: T.textDim, fontSize: 12, margin: 0 }}>
          {PROFILES.length} perfiles profesionales · {PROFILES.reduce((s, p) => s + p.skills.length, 0)} competencias evaluadas · Feb 2026
        </p>
      </div>

      {/* Summary Cards */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))", gap: 10, maxWidth: 750, margin: "0 auto 20px" }}>
        {[
          { label: "Promedio Global", value: globalAvg + "%", sub: getLevelLabel(globalAvg), color: getLevelColor(globalAvg) },
          { label: "Perfil más fuerte", value: topProfile.icon, sub: topProfile.fullName, color: T.accent },
          { label: "Mayor brecha", value: biggestGap.gap + "pts", sub: biggestGap.fullName, color: T.danger },
          { label: "Perfiles", value: PROFILES.length.toString(), sub: "evaluados", color: T.accentAlt },
        ].map((c, i) => (
          <div key={i} style={{ background: T.card, backdropFilter: "blur(12px)", WebkitBackdropFilter: "blur(12px)", borderRadius: 14, padding: "14px 12px", border: `1px solid ${T.border}`, textAlign: "center", boxShadow: "0 4px 24px rgba(0,0,0,0.25)" }}>
            <div style={{ fontSize: 24, fontWeight: 800, color: c.color }}>{c.value}</div>
            <div style={{ fontSize: 11, fontWeight: 600, marginTop: 2 }}>{c.label}</div>
            <div style={{ fontSize: 10, color: T.textDim, marginTop: 1 }}>{c.sub}</div>
          </div>
        ))}
      </div>

      {/* Navigation */}
      <div style={{ display: "flex", justifyContent: "center", gap: 6, marginBottom: 18, flexWrap: "wrap" }}>
        {[
          { id: "perfil", label: "👤 Perfil" },
          { id: "overview", label: "Vista General" },
          { id: "radar", label: "Radar" },
          { id: "gaps", label: "Brechas" },
          { id: "detail", label: "Detalle por Perfil" },
          { id: "roadmap", label: "Roadmap" },
          { id: "gardner", label: "Gardner" },
          { id: "prompts", label: "⚡ Prompts" },
        ].map(tab => (
          <button key={tab.id} onClick={() => { setView(tab.id); if (tab.id !== "detail") setSelectedProfile(null); }}
            style={{
              padding: "7px 16px", borderRadius: 999, fontSize: 11, fontWeight: 600,
              border: view === tab.id ? `1px solid rgba(249,115,22,0.5)` : `1px solid ${T.border}`,
              background: view === tab.id ? T.purpleDim : "rgba(255,255,255,0.04)",
              color: view === tab.id ? T.purple : T.textDim,
              cursor: "pointer", fontFamily: "inherit", transition: "all 0.2s",
              boxShadow: view === tab.id ? `0 0 14px rgba(var(--lava-glow), 0.25)` : "none",
            }}
          >{tab.label}</button>
        ))}
      </div>

      {/* PERFIL PERSONAL */}
      {view === "perfil" && (
        <div style={{ maxWidth: 750, margin: "0 auto" }}>

          {/* Hero */}
          <div style={{ textAlign: "center", marginBottom: 28 }}>
            <div style={{ width: 80, height: 80, borderRadius: "50%", margin: "0 auto 16px", background: "linear-gradient(135deg, #4a9d4a, #3b99f1)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 36, boxShadow: "0 0 32px rgba(74,157,74,0.4), 0 0 64px rgba(59,153,241,0.2)" }}>
              🏛️
            </div>
            <h1 style={{ fontSize: 28, fontWeight: 800, margin: "0 0 6px", background: "linear-gradient(135deg, #4a9d4a, #3b99f1, #f97316)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
              Daniel Yanez
            </h1>
            <div style={{ display: "flex", gap: 8, justifyContent: "center", flexWrap: "wrap", marginBottom: 12 }}>
              {["Arquitecto AEC", "CEO · BAC Consulting", "BIM Manager", "Developer"].map((badge, i) => {
                const colors = [T.accent, T.purple, T.accentAlt, "rgba(255,255,255,0.5)"];
                const bgs = [T.accentDim, T.purpleDim, "rgba(59,153,241,0.14)", "rgba(255,255,255,0.07)"];
                return (
                  <span key={i} style={{ padding: "3px 12px", borderRadius: 999, fontSize: 10, fontWeight: 700, letterSpacing: 1, textTransform: "uppercase", background: bgs[i], color: colors[i], border: `1px solid ${colors[i]}44` }}>
                    {badge}
                  </span>
                );
              })}
            </div>
            <p style={{ fontSize: 12, color: T.textDim, margin: 0 }}>
              Ciudad de México · Feb 2026
            </p>
          </div>

          {/* Bio + Misión */}
          <div style={{ background: T.card, backdropFilter: "blur(12px)", WebkitBackdropFilter: "blur(12px)", borderRadius: 18, border: `1px solid ${T.border}`, padding: "20px 22px", marginBottom: 14, boxShadow: "0 4px 32px rgba(0,0,0,0.3)" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 12 }}>
              <span style={{ fontSize: 16 }}>🎯</span>
              <span style={{ fontSize: 12, fontWeight: 700, color: T.purple, letterSpacing: 1, textTransform: "uppercase" }}>Misión</span>
            </div>
            <p style={{ fontSize: 13, color: T.text, lineHeight: 1.7, margin: "0 0 14px" }}>
              Arquitecto con enfoque en la convergencia de <strong style={{ color: T.accent }}>BIM, automatización e inteligencia artificial</strong> aplicada al sector AEC. Diseño y ejecuto workflows que reducen fricción operativa, conectan disciplinas y generan valor medible en proyectos de construcción complejos.
            </p>
            <div style={{ width: "100%", height: 1, background: T.border, marginBottom: 14 }} />
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 10 }}>
              <span style={{ fontSize: 16 }}>📖</span>
              <span style={{ fontSize: 12, fontWeight: 700, color: T.accentAlt, letterSpacing: 1, textTransform: "uppercase" }}>Bio</span>
            </div>
            <p style={{ fontSize: 12, color: T.textDim, lineHeight: 1.75, margin: 0 }}>
              Formación en arquitectura con especialización progresiva en tecnología AEC: certificaciones BIM (ISO 19650), desarrollo de add-ins en C# y Python para Revit, implementación de pipelines de automatización con n8n, y exploración activa de modelos de IA para visión computacional y NLP en contextos de obra y diseño. Actualmente dirijo <strong style={{ color: T.text }}>BAC Consulting</strong>, estudio en 11 plataformas simultáneas (~25h/semana) y desarrollo herramientas propias que integran mi stack completo.
            </p>
          </div>

          {/* BAC Consulting */}
          <div style={{ background: T.card, backdropFilter: "blur(12px)", WebkitBackdropFilter: "blur(12px)", borderRadius: 18, border: `1px solid rgba(249,115,22,0.25)`, padding: "20px 22px", marginBottom: 14, boxShadow: "0 4px 32px rgba(0,0,0,0.3), 0 0 0 1px rgba(249,115,22,0.08)" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 14 }}>
              <div style={{ width: 36, height: 36, borderRadius: 10, background: T.purpleDim, border: `1px solid rgba(249,115,22,0.3)`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18 }}>🏢</div>
              <div>
                <div style={{ fontSize: 14, fontWeight: 800, color: T.purple }}>BAC Consulting</div>
                <div style={{ fontSize: 10, color: T.textDim }}>BIM · Automatización · Consultoría AEC</div>
              </div>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: 10 }}>
              {[
                { icon: "🏗️", label: "BIM Management", desc: "Implementación ISO 19650, BEP, coordinación multidisciplinaria" },
                { icon: "⚙️", label: "Automatización AEC", desc: "n8n workflows, integración Revit API, pipelines de datos" },
                { icon: "🤖", label: "IA Aplicada", desc: "Visión computacional en obra, NLP para docs técnicos, RAG" },
                { icon: "📊", label: "Consultoría Técnica", desc: "Auditorías BIM, entrenamiento de equipos, estrategia digital" },
              ].map((s, i) => (
                <div key={i} style={{ background: "rgba(255,255,255,0.04)", borderRadius: 12, padding: "12px 14px", border: `1px solid ${T.border}` }}>
                  <div style={{ fontSize: 20, marginBottom: 6 }}>{s.icon}</div>
                  <div style={{ fontSize: 11, fontWeight: 700, color: T.text, marginBottom: 4 }}>{s.label}</div>
                  <div style={{ fontSize: 10, color: T.textDim, lineHeight: 1.5 }}>{s.desc}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Stack Tecnológico */}
          <div style={{ background: T.card, backdropFilter: "blur(12px)", WebkitBackdropFilter: "blur(12px)", borderRadius: 18, border: `1px solid ${T.border}`, padding: "20px 22px", marginBottom: 14, boxShadow: "0 4px 32px rgba(0,0,0,0.3)" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 14 }}>
              <span style={{ fontSize: 16 }}>🛠️</span>
              <span style={{ fontSize: 12, fontWeight: 700, color: T.accentAlt, letterSpacing: 1, textTransform: "uppercase" }}>Stack Tecnológico</span>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              {[
                { cat: "BIM & Modelado", color: T.accent, items: ["Revit", "Navisworks", "BIM 360", "IFC/OpenBIM", "Dynamo", "Grasshopper"] },
                { cat: "Desarrollo", color: T.accentAlt, items: ["Python", "C# / .NET", "PyRevit", "Revit API", "JavaScript", "React"] },
                { cat: "Automatización & DevOps", color: T.purple, items: ["n8n", "Docker", "GitHub Actions", "PostgreSQL", "Grafana", "Loki"] },
                { cat: "IA & Data", color: "#a78bfa", items: ["OpenCV", "YOLO", "LangChain", "RAG", "Power BI", "Pandas"] },
              ].map((group, i) => (
                <div key={i}>
                  <div style={{ fontSize: 10, fontWeight: 600, color: group.color, marginBottom: 6, textTransform: "uppercase", letterSpacing: 1 }}>{group.cat}</div>
                  <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
                    {group.items.map((item, j) => (
                      <span key={j} style={{ padding: "3px 10px", borderRadius: 999, fontSize: 10, fontWeight: 600, background: group.color + "14", color: group.color, border: `1px solid ${group.color}33` }}>
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Stats de la evaluación + CTA */}
          <div style={{ background: T.card, backdropFilter: "blur(12px)", WebkitBackdropFilter: "blur(12px)", borderRadius: 18, border: `1px solid rgba(59,153,241,0.2)`, padding: "20px 22px", boxShadow: "0 4px 32px rgba(0,0,0,0.3)" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 14 }}>
              <span style={{ fontSize: 16 }}>📈</span>
              <span style={{ fontSize: 12, fontWeight: 700, color: T.accentAlt, letterSpacing: 1, textTransform: "uppercase" }}>Evaluación Integral · Feb 2026</span>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(130px, 1fr))", gap: 10, marginBottom: 18 }}>
              {[
                { label: "Promedio Global", value: globalAvg + "%", sub: getLevelLabel(globalAvg), color: getLevelColor(globalAvg) },
                { label: "Perfiles evaluados", value: PROFILES.length.toString(), sub: "áreas profesionales", color: T.accentAlt },
                { label: "Competencias", value: PROFILES.reduce((s, p) => s + p.skills.length, 0).toString(), sub: "habilidades medidas", color: T.purple },
                { label: "Perfil dominante", value: topProfile.icon, sub: topProfile.fullName, color: T.accent },
              ].map((c, i) => (
                <div key={i} style={{ background: "rgba(255,255,255,0.04)", borderRadius: 12, padding: "12px 10px", border: `1px solid ${T.border}`, textAlign: "center" }}>
                  <div style={{ fontSize: 22, fontWeight: 800, color: c.color }}>{c.value}</div>
                  <div style={{ fontSize: 10, fontWeight: 600, marginTop: 2, color: T.text }}>{c.label}</div>
                  <div style={{ fontSize: 9, color: T.textDim, marginTop: 1 }}>{c.sub}</div>
                </div>
              ))}
            </div>
            <button onClick={() => setView("overview")}
              style={{
                width: "100%", padding: "12px", borderRadius: 12, fontSize: 13, fontWeight: 700,
                background: "linear-gradient(135deg, rgba(249,115,22,0.8), rgba(234,88,12,0.9))",
                border: "1px solid rgba(249,115,22,0.5)", color: "#fff",
                cursor: "pointer", fontFamily: "inherit", transition: "all 0.2s",
                boxShadow: "0 4px 20px rgba(249,115,22,0.35)",
                letterSpacing: 0.5,
              }}
              onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-2px)"; e.currentTarget.style.boxShadow = "0 8px 28px rgba(249,115,22,0.45)"; }}
              onMouseLeave={e => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "0 4px 20px rgba(249,115,22,0.35)"; }}
            >
              Ver Evaluación Completa →
            </button>
          </div>

        </div>
      )}

      {/* OVERVIEW */}
      {view === "overview" && (
        <div style={{ maxWidth: 750, margin: "0 auto" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
            <h2 style={{ fontSize: 14, fontWeight: 700, margin: 0 }}>Todos los Perfiles</h2>
            <div style={{ display: "flex", gap: 4 }}>
              {[{ k: "level", l: "Nivel" }, { k: "gap", l: "Brecha" }, { k: "name", l: "A-Z" }].map(s => (
                <button key={s.k} onClick={() => setSortBy(s.k)}
                  style={{
                    padding: "4px 12px", borderRadius: 999, fontSize: 10, fontWeight: 600,
                    border: sortBy === s.k ? `1px solid rgba(59,153,241,0.5)` : `1px solid ${T.border}`,
                    background: sortBy === s.k ? "rgba(59,153,241,0.12)" : "rgba(255,255,255,0.04)",
                    color: sortBy === s.k ? T.accentAlt : T.textDim,
                    cursor: "pointer", fontFamily: "inherit", transition: "all 0.2s",
                  }}
                >{s.l}</button>
              ))}
            </div>
          </div>

          <div style={{ display: "grid", gap: 8 }}>
            {sortedOverview.map((d, i) => {
              const profile = PROFILES.find(p => p.name === d.fullName);
              return (
                <div key={i} onClick={() => { setSelectedProfile(profile.id); setView("detail"); }}
                  style={{
                    background: T.card, backdropFilter: "blur(12px)", WebkitBackdropFilter: "blur(12px)",
                    borderRadius: 14, padding: "12px 14px",
                    border: `1px solid ${T.border}`, cursor: "pointer",
                    transition: "all 0.2s", boxShadow: "0 2px 16px rgba(0,0,0,0.2)",
                  }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = d.color + "66"; e.currentTarget.style.transform = "translateY(-2px)"; e.currentTarget.style.boxShadow = `0 8px 28px rgba(0,0,0,0.3), 0 0 0 1px ${d.color}22`; }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = T.border; e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "0 2px 16px rgba(0,0,0,0.2)"; }}
                >
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                      <span style={{ fontSize: 20 }}>{d.icon}</span>
                      <div>
                        <div style={{ fontSize: 13, fontWeight: 700 }}>{d.fullName}</div>
                        <div style={{ fontSize: 10, color: T.textDim }}>{profile.description}</div>
                      </div>
                    </div>
                    <div style={{ textAlign: "right", flexShrink: 0 }}>
                      <div style={{ fontSize: 18, fontWeight: 800, color: getLevelColor(d.level) }}>{d.level}%</div>
                      <Pill bg={d.gap >= 20 ? T.dangerDim : d.gap >= 12 ? T.warningDim : T.accentDim}
                        color={d.gap >= 20 ? T.danger : d.gap >= 12 ? T.warning : T.accent}>
                        gap: {d.gap}pts
                      </Pill>
                    </div>
                  </div>
                  <div style={{ marginTop: 8, height: 5, background: T.border, borderRadius: 3 }}>
                    <div style={{
                      height: "100%", borderRadius: 3, width: `${d.level}%`,
                      background: `linear-gradient(90deg, ${d.color}88, ${d.color})`,
                    }} />
                  </div>
                </div>
              );
            })}
          </div>

          {/* Pie Chart Distribution */}
          <div style={{ background: T.card, backdropFilter: "blur(12px)", WebkitBackdropFilter: "blur(12px)", borderRadius: 16, border: `1px solid ${T.border}`, padding: 16, marginTop: 16, boxShadow: "0 4px 24px rgba(0,0,0,0.25)" }}>
            <h3 style={{ fontSize: 13, fontWeight: 700, marginBottom: 8, textAlign: "center" }}>Distribución de Madurez</h3>
            <ResponsiveContainer width="100%" height={180}>
              <PieChart>
                <Pie data={pieData} cx="50%" cy="50%" outerRadius={65} innerRadius={35} dataKey="value" paddingAngle={3} strokeWidth={0}>
                  {pieData.map((d, i) => <Cell key={i} fill={d.color} fillOpacity={0.8} />)}
                </Pie>
                <Tooltip content={({ active, payload }) =>
                  active && payload?.[0] ? (
                    <div style={{ background: T.cardAlt, backdropFilter: "blur(16px)", WebkitBackdropFilter: "blur(16px)", border: `1px solid ${T.border}`, borderRadius: 10, padding: "6px 10px", fontSize: 11, color: T.text, boxShadow: "0 8px 32px rgba(0,0,0,0.4)" }}>
                      {payload[0].name}: <strong>{payload[0].value}</strong> perfiles
                    </div>
                  ) : null
                } />
              </PieChart>
            </ResponsiveContainer>
            <div style={{ display: "flex", justifyContent: "center", gap: 14, flexWrap: "wrap" }}>
              {pieData.map((d, i) => (
                <div key={i} style={{ display: "flex", alignItems: "center", gap: 5, fontSize: 10 }}>
                  <div style={{ width: 8, height: 8, borderRadius: 2, background: d.color }} />
                  <span style={{ color: T.textDim }}>{d.name}: {d.value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* RADAR */}
      {view === "radar" && (
        <div style={{ background: T.card, backdropFilter: "blur(12px)", WebkitBackdropFilter: "blur(12px)", borderRadius: 18, border: `1px solid ${T.border}`, padding: "16px 4px", maxWidth: 720, margin: "0 auto", boxShadow: "0 4px 32px rgba(0,0,0,0.3)" }}>
          <h2 style={{ textAlign: "center", fontSize: 14, fontWeight: 700, marginBottom: 2 }}>Radar Multi-Perfil</h2>
          <p style={{ textAlign: "center", fontSize: 10, color: T.textDim, marginBottom: 8 }}>Promedio actual vs. objetivo por perfil</p>
          <ResponsiveContainer width="100%" height={440}>
            <RadarChart data={radarData} cx="50%" cy="50%" outerRadius="68%">
              <PolarGrid stroke={T.border} strokeWidth={0.5} />
              <PolarAngleAxis dataKey="subject" tick={{ fill: T.textDim, fontSize: 9 }} tickLine={false} />
              <PolarRadiusAxis angle={90} domain={[0, 100]} tick={{ fill: T.textDim, fontSize: 8 }} tickCount={5} axisLine={false} />
              <Radar name="Objetivo" dataKey="objetivo" stroke={T.warning} fill={T.warning} fillOpacity={0.08} strokeWidth={1.5} strokeDasharray="5 3" />
              <Radar name="Actual" dataKey="actual" stroke={T.accent} fill={T.accent} fillOpacity={0.15} strokeWidth={2} />
              <Legend wrapperStyle={{ fontSize: 10, color: T.textDim }} iconType="line" />
              <Tooltip content={<CustomTooltip />} />
            </RadarChart>
          </ResponsiveContainer>
        </div>
      )}

      {/* GAPS */}
      {view === "gaps" && (
        <div style={{ background: T.card, backdropFilter: "blur(12px)", WebkitBackdropFilter: "blur(12px)", borderRadius: 18, border: `1px solid ${T.border}`, padding: "16px 8px", maxWidth: 720, margin: "0 auto", boxShadow: "0 4px 32px rgba(0,0,0,0.3)" }}>
          <h2 style={{ textAlign: "center", fontSize: 14, fontWeight: 700, marginBottom: 2 }}>Análisis de Brechas por Perfil</h2>
          <p style={{ textAlign: "center", fontSize: 10, color: T.textDim, marginBottom: 12 }}>Puntos entre nivel actual y objetivo</p>
          <ResponsiveContainer width="100%" height={380}>
            <BarChart data={[...overviewData].sort((a, b) => b.gap - a.gap)} layout="vertical" margin={{ left: 10, right: 16 }}>
              <CartesianGrid strokeDasharray="3 3" stroke={T.border} horizontal={false} />
              <XAxis type="number" domain={[0, 30]} tick={{ fill: T.textDim, fontSize: 10 }} tickLine={false} axisLine={false} />
              <YAxis dataKey="name" type="category" width={110} tick={{ fill: T.textDim, fontSize: 10 }} tickLine={false} axisLine={false} />
              <Tooltip content={({ active, payload, label }) =>
                active && payload?.[0] ? (
                  <div style={{ background: T.cardAlt, backdropFilter: "blur(16px)", WebkitBackdropFilter: "blur(16px)", border: `1px solid ${T.border}`, borderRadius: 10, padding: "6px 10px", fontSize: 11, color: T.text, boxShadow: "0 8px 32px rgba(0,0,0,0.4)" }}>
                    <div style={{ fontWeight: 700 }}>{label}</div>
                    <div style={{ color: T.warning }}>Brecha: {payload[0].value} pts</div>
                    <div style={{ color: T.accent }}>Nivel actual: {payload[0].payload.level}%</div>
                  </div>
                ) : null
              } cursor={{ fill: T.accentDim }} />
              <Bar dataKey="gap" radius={[0, 5, 5, 0]} barSize={16}>
                {overviewData.sort((a, b) => b.gap - a.gap).map((d, i) => (
                  <Cell key={i} fill={d.gap >= 18 ? T.danger : d.gap >= 12 ? T.warning : T.accent} fillOpacity={0.75} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      )}

      {/* DETAIL */}
      {view === "detail" && (
        <div style={{ maxWidth: 750, margin: "0 auto" }}>
          {/* Profile selector */}
          <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginBottom: 16, justifyContent: "center" }}>
            {PROFILES.map(p => (
              <button key={p.id} onClick={() => setSelectedProfile(p.id)}
                style={{
                  padding: "6px 14px", borderRadius: 999, fontSize: 11, fontWeight: 600,
                  border: selectedProfile === p.id ? `1px solid ${p.color}66` : `1px solid ${T.border}`,
                  background: selectedProfile === p.id ? p.color + "18" : "rgba(255,255,255,0.04)",
                  color: selectedProfile === p.id ? p.color : T.textDim,
                  cursor: "pointer", fontFamily: "inherit", transition: "all 0.2s",
                  boxShadow: selectedProfile === p.id ? `0 0 12px ${p.color}33` : "none",
                }}
              >{p.icon} {p.name.split(" ")[0]}</button>
            ))}
          </div>

          {sp && (
            <div style={{ background: T.card, backdropFilter: "blur(12px)", WebkitBackdropFilter: "blur(12px)", borderRadius: 18, border: `1px solid ${sp.color}33`, padding: 18, boxShadow: `0 4px 32px rgba(0,0,0,0.3), 0 0 0 1px ${sp.color}11` }}>
              <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 14 }}>
                <span style={{ fontSize: 32 }}>{sp.icon}</span>
                <div>
                  <h2 style={{ fontSize: 16, fontWeight: 800, margin: 0, color: sp.color }}>{sp.name}</h2>
                  <p style={{ fontSize: 11, color: T.textDim, margin: "2px 0 0" }}>{sp.description}</p>
                </div>
                <div style={{ marginLeft: "auto", textAlign: "right" }}>
                  <div style={{ fontSize: 28, fontWeight: 800, color: getLevelColor(getAvg(sp.skills)) }}>
                    {getAvg(sp.skills)}%
                  </div>
                  <Pill bg={getLevelColor(getAvg(sp.skills)) + "20"} color={getLevelColor(getAvg(sp.skills))}>
                    {getLevelLabel(getAvg(sp.skills))}
                  </Pill>
                </div>
              </div>

              {/* Skills breakdown */}
              <div style={{ marginBottom: 16 }}>
                <h3 style={{ fontSize: 12, fontWeight: 700, marginBottom: 8, color: T.text }}>
                  Competencias ({sp.skills.length})
                  <span style={{ fontWeight: 400, color: T.textDim, marginLeft: 8, fontSize: 10 }}>
                    ▸ línea punteada = objetivo
                  </span>
                </h3>
                {sp.skills.sort((a, b) => b.level - a.level).map((sk, i) => (
                  <SkillBar key={i} skill={sk} />
                ))}
              </div>

              {/* 3-column insights */}
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 10 }}>
                <div style={{ background: "rgba(255,255,255,0.04)", borderRadius: 12, padding: 12, border: `1px solid ${T.border}` }}>
                  <div style={{ fontSize: 11, fontWeight: 700, color: T.accent, marginBottom: 6 }}>✓ Fortalezas</div>
                  {sp.strengths.map((s, i) => (
                    <div key={i} style={{ fontSize: 11, color: T.textDim, marginBottom: 4, display: "flex", gap: 6 }}>
                      <span style={{ color: T.accent, fontSize: 7, marginTop: 4, flexShrink: 0 }}>●</span>
                      <span>{s}</span>
                    </div>
                  ))}
                </div>
                <div style={{ background: "rgba(255,255,255,0.04)", borderRadius: 12, padding: 12, border: `1px solid ${T.border}` }}>
                  <div style={{ fontSize: 11, fontWeight: 700, color: T.warning, marginBottom: 6 }}>⚠ Brechas</div>
                  {sp.gaps.map((g, i) => (
                    <div key={i} style={{ fontSize: 11, color: T.textDim, marginBottom: 4, display: "flex", gap: 6 }}>
                      <span style={{ color: T.warning, fontSize: 7, marginTop: 4, flexShrink: 0 }}>●</span>
                      <span>{g}</span>
                    </div>
                  ))}
                </div>
                <div style={{ background: "rgba(255,255,255,0.04)", borderRadius: 12, padding: 12, border: `1px solid ${T.border}` }}>
                  <div style={{ fontSize: 11, fontWeight: 700, color: T.accentAlt, marginBottom: 6 }}>→ Próximos pasos</div>
                  {sp.nextSteps.map((n, i) => (
                    <div key={i} style={{ fontSize: 11, color: T.textDim, marginBottom: 4, display: "flex", gap: 6 }}>
                      <span style={{ color: T.accentAlt, fontSize: 10, flexShrink: 0 }}>{i + 1}.</span>
                      <span>{n}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {!sp && (
            <div style={{ textAlign: "center", padding: 40, color: T.textDim, fontSize: 13 }}>
              ↑ Selecciona un perfil para ver el detalle completo
            </div>
          )}
        </div>
      )}

      {/* ROADMAP */}
      {view === "roadmap" && (
        <div style={{ maxWidth: 750, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 16 }}>
            <h2 style={{ fontSize: 14, fontWeight: 700, marginBottom: 2 }}>Roadmap de Desarrollo Profesional</h2>
            <p style={{ fontSize: 10, color: T.textDim }}>Prioridades ordenadas por impacto en tu carrera y negocio BAC</p>
          </div>

          {[
            {
              phase: "Q1 2026 — Consolidar Core",
              color: T.accent,
              items: [
                { profile: "🏗️ BIM Mgmt", action: "Certificación buildingSMART Professional", impact: "Alto", hours: 40 },
                { profile: "⚙️ Revit API", action: "Plugin C# distribuible con UI WPF", impact: "Alto", hours: 50 },
                { profile: "🔄 Automation", action: "Circuit breaker + test suite para n8n CRUD", impact: "Medio", hours: 25 },
                { profile: "📊 Negocio", action: "2 artículos técnicos + paquete BIM Starter Kit", impact: "Alto", hours: 20 },
              ],
            },
            {
              phase: "Q2 2026 — Expandir IA & Data",
              color: T.accentAlt,
              items: [
                { profile: "🤖 IA/ML", action: "RAG con docs ISO 19650 + normas NOM", impact: "Alto", hours: 45 },
                { profile: "🤖 IA/ML", action: "Pipeline CV: fotos obra → progreso automático", impact: "Alto", hours: 40 },
                { profile: "🐳 DevOps", action: "Stack monitoreo (Grafana + Loki + alertas)", impact: "Medio", hours: 30 },
                { profile: "🔨 Obra", action: "Dashboard EVM en Power BI tiempo real", impact: "Medio", hours: 25 },
              ],
            },
            {
              phase: "Q3 2026 — Diferenciación",
              color: T.purple,
              items: [
                { profile: "🔷 Paramétrico", action: "Fachada paramétrica GH→Revit + Ladybug", impact: "Medio", hours: 35 },
                { profile: "🌱 Sustentabilidad", action: "LEED GA credential + template tracking Airtable", impact: "Alto", hours: 40 },
                { profile: "💻 Software", action: "Clean Architecture para Revit add-ins + pytest", impact: "Medio", hours: 30 },
                { profile: "📊 Negocio", action: "Automatizar onboarding clientes BAC con n8n", impact: "Alto", hours: 20 },
              ],
            },
          ].map((phase, pi) => (
            <div key={pi} style={{ marginBottom: 14 }}>
              <div style={{
                padding: "10px 14px", background: phase.color + "12",
                borderRadius: "14px 14px 0 0", borderBottom: `2px solid ${phase.color}`,
              }}>
                <span style={{ fontSize: 13, fontWeight: 700, color: phase.color }}>{phase.phase}</span>
                <span style={{ fontSize: 10, color: T.textDim, marginLeft: 10 }}>
                  {phase.items.reduce((s, i) => s + i.hours, 0)}h totales
                </span>
              </div>
              <div style={{ background: T.card, backdropFilter: "blur(12px)", WebkitBackdropFilter: "blur(12px)", borderRadius: "0 0 14px 14px", border: `1px solid ${T.border}`, borderTop: 0 }}>
                {phase.items.map((item, ii) => (
                  <div key={ii} style={{
                    padding: "10px 14px", display: "flex", justifyContent: "space-between",
                    alignItems: "center", borderBottom: ii < phase.items.length - 1 ? `1px solid ${T.border}` : "none",
                    gap: 8, flexWrap: "wrap",
                  }}>
                    <div style={{ flex: 1, minWidth: 200 }}>
                      <span style={{ fontSize: 11, marginRight: 8 }}>{item.profile}</span>
                      <span style={{ fontSize: 11, color: T.text }}>{item.action}</span>
                    </div>
                    <div style={{ display: "flex", gap: 6, flexShrink: 0 }}>
                      <Pill bg={item.impact === "Alto" ? T.accentDim : T.warningDim}
                        color={item.impact === "Alto" ? T.accent : T.warning}>
                        {item.impact}
                      </Pill>
                      <Pill bg={T.purpleDim} color={T.purple}>{item.hours}h</Pill>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}

          {/* Summary */}
          <div style={{
            background: T.card, backdropFilter: "blur(12px)", WebkitBackdropFilter: "blur(12px)",
            borderRadius: 14, border: `1px solid ${T.border}`,
            padding: 14, marginTop: 8, textAlign: "center", boxShadow: "0 4px 24px rgba(0,0,0,0.25)",
          }}>
            <div style={{ fontSize: 12, fontWeight: 700, color: T.accent, marginBottom: 6 }}>
              Inversión Total: ~400h en 9 meses · ~10h/semana
            </div>
            <div style={{ fontSize: 11, color: T.textDim }}>
              Compatible con tu ritmo actual de 25h/semana de estudio en 11 plataformas
            </div>
          </div>
        </div>
      )}

      {/* GARDNER */}
      {view === "gardner" && (() => {
        const gardnerAvg = Math.round(GARDNER.reduce((s, g) => s + g.level, 0) / GARDNER.length);
        const gardnerRadar = GARDNER.map(g => ({
          subject: g.icon + " " + (g.name.length > 12 ? g.name.slice(0, 10) + "…" : g.name),
          nivel: g.level,
        }));
        const gardnerSorted = [...GARDNER].sort((a, b) => b.level - a.level);
        const dominant = gardnerSorted[0];
        const weakest = gardnerSorted[gardnerSorted.length - 1];

        return (
          <div style={{ maxWidth: 750, margin: "0 auto" }}>
            {/* Gardner Header */}
            <div style={{ textAlign: "center", marginBottom: 16 }}>
              <h2 style={{ fontSize: 16, fontWeight: 800, margin: "0 0 4px" }}>
                🧠 Inteligencias Múltiples de Gardner
              </h2>
              <p style={{ fontSize: 11, color: T.textDim, margin: 0 }}>
                Teoría de Howard Gardner — 8 inteligencias evaluadas
              </p>
            </div>

            {/* Gardner Summary Cards */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))", gap: 10, marginBottom: 16 }}>
              {[
                { label: "Promedio General", value: gardnerAvg + "%", sub: getLevelLabel(gardnerAvg), color: getLevelColor(gardnerAvg) },
                { label: "Dominante", value: dominant.icon, sub: dominant.name, color: dominant.color },
                { label: "En desarrollo", value: weakest.icon, sub: weakest.name, color: weakest.color },
                { label: "Inteligencias", value: "8", sub: "evaluadas", color: T.accentAlt },
              ].map((c, i) => (
                <div key={i} style={{ background: T.card, backdropFilter: "blur(12px)", WebkitBackdropFilter: "blur(12px)", borderRadius: 14, padding: "14px 12px", border: `1px solid ${T.border}`, textAlign: "center", boxShadow: "0 4px 24px rgba(0,0,0,0.25)" }}>
                  <div style={{ fontSize: 24, fontWeight: 800, color: c.color }}>{c.value}</div>
                  <div style={{ fontSize: 11, fontWeight: 600, marginTop: 2 }}>{c.label}</div>
                  <div style={{ fontSize: 10, color: T.textDim, marginTop: 1 }}>{c.sub}</div>
                </div>
              ))}
            </div>

            {/* Gardner Radar Chart */}
            <div style={{ background: T.card, backdropFilter: "blur(12px)", WebkitBackdropFilter: "blur(12px)", borderRadius: 18, border: `1px solid ${T.border}`, padding: "16px 4px", marginBottom: 16, boxShadow: "0 4px 32px rgba(0,0,0,0.3)" }}>
              <h3 style={{ textAlign: "center", fontSize: 13, fontWeight: 700, marginBottom: 2 }}>Perfil de Inteligencias</h3>
              <p style={{ textAlign: "center", fontSize: 10, color: T.textDim, marginBottom: 8 }}>Distribución de las 8 inteligencias múltiples</p>
              <ResponsiveContainer width="100%" height={380}>
                <RadarChart data={gardnerRadar} cx="50%" cy="50%" outerRadius="68%">
                  <PolarGrid stroke={T.border} strokeWidth={0.5} />
                  <PolarAngleAxis dataKey="subject" tick={{ fill: T.textDim, fontSize: 9 }} tickLine={false} />
                  <PolarRadiusAxis angle={90} domain={[0, 100]} tick={{ fill: T.textDim, fontSize: 8 }} tickCount={5} axisLine={false} />
                  <Radar name="Nivel" dataKey="nivel" stroke={T.accentAlt} fill={T.accentAlt} fillOpacity={0.2} strokeWidth={2} />
                  <Tooltip content={({ active, payload }) => {
                    if (!active || !payload?.length) return null;
                    return (
                      <div style={{ background: T.cardAlt, backdropFilter: "blur(16px)", WebkitBackdropFilter: "blur(16px)", border: `1px solid ${T.border}`, borderRadius: 10, padding: "8px 12px", fontSize: 12, color: T.text, boxShadow: "0 8px 32px rgba(0,0,0,0.4)" }}>
                        {payload.map((p, i) => (
                          <div key={i} style={{ color: p.color || p.fill, margin: "2px 0" }}>
                            {p.name}: <strong>{p.value}%</strong>
                          </div>
                        ))}
                      </div>
                    );
                  }} />
                </RadarChart>
              </ResponsiveContainer>
            </div>

            {/* Gardner Bar Chart */}
            <div style={{ background: T.card, backdropFilter: "blur(12px)", WebkitBackdropFilter: "blur(12px)", borderRadius: 18, border: `1px solid ${T.border}`, padding: "16px 8px", marginBottom: 16, boxShadow: "0 4px 32px rgba(0,0,0,0.3)" }}>
              <h3 style={{ textAlign: "center", fontSize: 13, fontWeight: 700, marginBottom: 2 }}>Ranking de Inteligencias</h3>
              <p style={{ textAlign: "center", fontSize: 10, color: T.textDim, marginBottom: 12 }}>Ordenado de mayor a menor nivel</p>
              <ResponsiveContainer width="100%" height={320}>
                <BarChart data={gardnerSorted} layout="vertical" margin={{ left: 10, right: 16 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke={T.border} horizontal={false} />
                  <XAxis type="number" domain={[0, 100]} tick={{ fill: T.textDim, fontSize: 10 }} tickLine={false} axisLine={false} />
                  <YAxis dataKey="name" type="category" width={130} tick={{ fill: T.textDim, fontSize: 10 }} tickLine={false} axisLine={false} />
                  <Tooltip content={({ active, payload, label }) =>
                    active && payload?.[0] ? (
                      <div style={{ background: T.cardAlt, backdropFilter: "blur(16px)", WebkitBackdropFilter: "blur(16px)", border: `1px solid ${T.border}`, borderRadius: 10, padding: "6px 10px", fontSize: 11, color: T.text, boxShadow: "0 8px 32px rgba(0,0,0,0.4)" }}>
                        <div style={{ fontWeight: 700 }}>{label}</div>
                        <div style={{ color: getLevelColor(payload[0].value) }}>Nivel: {payload[0].value}%</div>
                        <div style={{ color: T.textDim }}>{getLevelLabel(payload[0].value)}</div>
                      </div>
                    ) : null
                  } cursor={{ fill: T.accentDim }} />
                  <Bar dataKey="level" radius={[0, 5, 5, 0]} barSize={18}>
                    {gardnerSorted.map((g, i) => (
                      <Cell key={i} fill={g.color} fillOpacity={0.75} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>

            {/* Gardner Individual Cards */}
            <h3 style={{ fontSize: 13, fontWeight: 700, marginBottom: 10 }}>Detalle por Inteligencia</h3>
            <div style={{ display: "grid", gap: 10 }}>
              {gardnerSorted.map((g) => {
                const presentCount = g.indicators.filter(ind => ind.present).length;
                return (
                  <div key={g.id} style={{ background: T.card, backdropFilter: "blur(12px)", WebkitBackdropFilter: "blur(12px)", borderRadius: 16, border: `1px solid ${g.color}33`, padding: 16, boxShadow: `0 2px 20px rgba(0,0,0,0.25)`, transition: "box-shadow 0.2s" }}>
                    {/* Card Header */}
                    <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 12 }}>
                      <span style={{ fontSize: 28 }}>{g.icon}</span>
                      <div style={{ flex: 1 }}>
                        <div style={{ fontSize: 14, fontWeight: 700, color: g.color }}>{g.name}</div>
                        <div style={{ fontSize: 10, color: T.textDim }}>{g.description}</div>
                      </div>
                      <div style={{ textAlign: "right", flexShrink: 0 }}>
                        <div style={{ fontSize: 24, fontWeight: 800, color: getLevelColor(g.level) }}>{g.level}%</div>
                        <Pill bg={getLevelColor(g.level) + "20"} color={getLevelColor(g.level)}>
                          {getLevelLabel(g.level)}
                        </Pill>
                      </div>
                    </div>

                    {/* Progress Bar */}
                    <div style={{ height: 6, background: T.border, borderRadius: 3, marginBottom: 12 }}>
                      <div style={{
                        height: "100%", borderRadius: 3, width: `${g.level}%`,
                        background: `linear-gradient(90deg, ${g.color}88, ${g.color})`,
                        transition: "width 0.6s ease",
                      }} />
                    </div>

                    {/* Indicators */}
                    <div style={{ marginBottom: 12 }}>
                      <div style={{ fontSize: 11, fontWeight: 600, marginBottom: 6, color: T.text }}>
                        Indicadores ({presentCount}/{g.indicators.length} presentes)
                      </div>
                      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 3 }}>
                        {g.indicators.map((ind, j) => (
                          <div key={j} style={{ fontSize: 11, color: ind.present ? T.text : T.textDim, display: "flex", gap: 6, alignItems: "center" }}>
                            <span style={{ fontSize: 10, color: ind.present ? T.accent : T.danger, flexShrink: 0 }}>
                              {ind.present ? "✓" : "✗"}
                            </span>
                            <span style={{ textDecoration: ind.present ? "none" : "line-through", opacity: ind.present ? 1 : 0.6 }}>
                              {ind.name}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Strengths & Development */}
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
                      <div style={{ background: "rgba(255,255,255,0.04)", borderRadius: 10, padding: 10, border: `1px solid ${T.border}` }}>
                        <div style={{ fontSize: 10, fontWeight: 700, color: T.accent, marginBottom: 5 }}>✓ Manifestaciones</div>
                        {g.strengths.map((s, i) => (
                          <div key={i} style={{ fontSize: 10, color: T.textDim, marginBottom: 3, display: "flex", gap: 5 }}>
                            <span style={{ color: T.accent, fontSize: 6, marginTop: 4, flexShrink: 0 }}>●</span>
                            <span>{s}</span>
                          </div>
                        ))}
                      </div>
                      <div style={{ background: "rgba(255,255,255,0.04)", borderRadius: 10, padding: 10, border: `1px solid ${T.border}` }}>
                        <div style={{ fontSize: 10, fontWeight: 700, color: T.warning, marginBottom: 5 }}>→ Desarrollo</div>
                        {g.development.map((d, i) => (
                          <div key={i} style={{ fontSize: 10, color: T.textDim, marginBottom: 3, display: "flex", gap: 5 }}>
                            <span style={{ color: T.warning, fontSize: 6, marginTop: 4, flexShrink: 0 }}>●</span>
                            <span>{d}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        );
      })()}

      {/* PROMPTS */}
      {view === "prompts" && (
        <div style={{ maxWidth: 850, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 16 }}>
            <h2 style={{ fontSize: 16, fontWeight: 800, margin: "0 0 4px" }}>
              ⚡ System Prompts Maestros por Brecha
            </h2>
            <p style={{ fontSize: 11, color: T.textDim, margin: "0 0 4px" }}>
              Prompts editables para Perplexity / Claude — ciclo de mejora continua
            </p>
            <p style={{ fontSize: 10, color: T.textDim, margin: 0 }}>
              {allGaps.length} brechas identificadas · Copia → Pega en tu IA → Aprende → Repite
            </p>
          </div>

          {/* Filter bar */}
          <div style={{ display: "flex", gap: 5, flexWrap: "wrap", marginBottom: 14, justifyContent: "center" }}>
            <button onClick={() => setPromptFilter("all")}
              style={{
                padding: "5px 14px", borderRadius: 999, fontSize: 10, fontWeight: 600,
                border: promptFilter === "all" ? `1px solid rgba(74,157,74,0.5)` : `1px solid ${T.border}`,
                background: promptFilter === "all" ? T.accentDim : "rgba(255,255,255,0.04)",
                color: promptFilter === "all" ? T.accent : T.textDim,
                cursor: "pointer", fontFamily: "inherit", transition: "all 0.2s",
              }}>Todas ({allGaps.length})</button>
            {PROFILES.map(p => {
              const count = allGaps.filter(g => g.type !== "gardner" && g.source === p.name).length;
              return (
                <button key={p.id} onClick={() => setPromptFilter(p.name)}
                  style={{
                    padding: "5px 10px", borderRadius: 999, fontSize: 10, fontWeight: 600,
                    border: promptFilter === p.name ? `1px solid ${p.color}66` : `1px solid ${T.border}`,
                    background: promptFilter === p.name ? p.color + "18" : "rgba(255,255,255,0.04)",
                    color: promptFilter === p.name ? p.color : T.textDim,
                    cursor: "pointer", fontFamily: "inherit", transition: "all 0.2s",
                  }}>{p.icon} {count}</button>
              );
            })}
            <button onClick={() => setPromptFilter("gardner")}
              style={{
                padding: "5px 12px", borderRadius: 999, fontSize: 10, fontWeight: 600,
                border: promptFilter === "gardner" ? `1px solid rgba(59,153,241,0.5)` : `1px solid ${T.border}`,
                background: promptFilter === "gardner" ? "rgba(59,153,241,0.12)" : "rgba(255,255,255,0.04)",
                color: promptFilter === "gardner" ? T.accentAlt : T.textDim,
                cursor: "pointer", fontFamily: "inherit", transition: "all 0.2s",
              }}>🧠 Gardner ({allGaps.filter(g => g.type === "gardner").length})</button>
          </div>

          {/* Prompt Cards */}
          <div style={{ display: "grid", gap: 10 }}>
            {filteredGaps.map((gap) => {
              const isEdited = promptEdits[gap.key] !== undefined;
              const currentPrompt = isEdited ? promptEdits[gap.key] : gap.prompt;
              return (
                <div key={gap.key} style={{
                  background: T.card, backdropFilter: "blur(12px)", WebkitBackdropFilter: "blur(12px)",
                  borderRadius: 16, border: `1px solid ${gap.sourceColor}33`, overflow: "hidden",
                  boxShadow: "0 2px 20px rgba(0,0,0,0.25)",
                }}>
                  {/* Card Header */}
                  <div style={{
                    padding: "10px 14px", display: "flex", justifyContent: "space-between",
                    alignItems: "center", borderBottom: `1px solid ${T.border}`,
                    background: gap.sourceColor + "08",
                  }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 8, flex: 1, minWidth: 0 }}>
                      <span style={{ fontSize: 16, flexShrink: 0 }}>{gap.sourceIcon}</span>
                      <div style={{ minWidth: 0 }}>
                        <div style={{ fontSize: 12, fontWeight: 700, color: T.text, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                          {gap.title}
                        </div>
                        <div style={{ fontSize: 10, color: T.textDim }}>
                          {gap.source} · {gap.type === "gardner" ? "Gardner" : gap.type === "skill" ? "Skill gap" : "Brecha"}
                        </div>
                      </div>
                    </div>
                    <div style={{ display: "flex", gap: 6, flexShrink: 0 }}>
                      {isEdited && (
                        <button onClick={() => {
                          const next = { ...promptEdits };
                          delete next[gap.key];
                          setPromptEdits(next);
                        }}
                          style={{
                            padding: "4px 8px", borderRadius: 5, fontSize: 9, fontWeight: 600,
                            border: `1px solid ${T.border}`, background: "transparent",
                            color: T.textDim, cursor: "pointer", fontFamily: "inherit",
                          }}>Reset</button>
                      )}
                      <button onClick={() => copyToClipboard(gap.key, currentPrompt)}
                        style={{
                          padding: "4px 10px", borderRadius: 5, fontSize: 10, fontWeight: 700,
                          border: copiedId === gap.key ? `1px solid ${T.accent}` : `1px solid ${gap.sourceColor}66`,
                          background: copiedId === gap.key ? T.accentDim : gap.sourceColor + "18",
                          color: copiedId === gap.key ? T.accent : gap.sourceColor,
                          cursor: "pointer", fontFamily: "inherit", transition: "all 0.15s",
                        }}>{copiedId === gap.key ? "✓ Copiado" : "Copiar"}</button>
                    </div>
                  </div>

                  {/* Editable Prompt */}
                  <textarea
                    value={currentPrompt}
                    onChange={(e) => setPromptEdits({ ...promptEdits, [gap.key]: e.target.value })}
                    spellCheck={false}
                    style={{
                      width: "100%", minHeight: 120, maxHeight: 400, padding: "12px 14px",
                      background: "rgba(10, 15, 20, 0.6)", color: T.text, border: "none", resize: "vertical",
                      fontSize: 11, lineHeight: 1.6, fontFamily: "'JetBrains Mono', 'Fira Code', 'Consolas', monospace",
                      outline: "none",
                    }}
                    onFocus={(e) => { e.target.style.minHeight = "300px"; }}
                    onBlur={(e) => { e.target.style.minHeight = "120px"; }}
                  />
                </div>
              );
            })}
          </div>

          {/* Instructions */}
          <div style={{
            background: T.card, backdropFilter: "blur(12px)", WebkitBackdropFilter: "blur(12px)",
            borderRadius: 16, border: `1px solid ${T.border}`,
            padding: 14, marginTop: 14, boxShadow: "0 4px 24px rgba(0,0,0,0.25)",
          }}>
            <div style={{ fontSize: 12, fontWeight: 700, color: T.accent, marginBottom: 8 }}>
              ⚡ Ciclo de Mejora Continua
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: 10 }}>
              {[
                { step: "1", title: "Selecciona brecha", desc: "Filtra por perfil o Gardner, elige la brecha que más te interesa cerrar" },
                { step: "2", title: "Edita el prompt", desc: "Personaliza el system prompt según tu contexto actual y lo que ya sabes" },
                { step: "3", title: "Copia y ejecuta", desc: "Pega en Perplexity/Claude, obtén plan de estudio, recursos y ejercicios" },
                { step: "4", title: "Aprende y practica", desc: "Sigue el plan, resuelve ejercicios, toma el quiz de autoevaluación" },
                { step: "5", title: "Itera", desc: "Actualiza tu nivel, ajusta el prompt y repite con la siguiente brecha" },
              ].map((s) => (
                <div key={s.step} style={{ background: "rgba(255,255,255,0.05)", borderRadius: 10, padding: 10, border: `1px solid ${T.border}` }}>
                  <div style={{ fontSize: 16, fontWeight: 800, color: T.accent, marginBottom: 4 }}>{s.step}</div>
                  <div style={{ fontSize: 11, fontWeight: 700, color: T.text, marginBottom: 2 }}>{s.title}</div>
                  <div style={{ fontSize: 10, color: T.textDim }}>{s.desc}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <div style={{ textAlign: "center", marginTop: 24, fontSize: 9, color: T.textDim, opacity: 0.5 }}>
        BAC · BIMAC · Evaluación Integral Multi-Perfil · {new Date().toLocaleDateString("es-MX")}
      </div>
    </div>
  );
}
